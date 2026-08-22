#!/usr/bin/env node
/**
 * Scanner de strings hardcoded em português.
 *
 * Opera em modo ratchet: `.i18n-baseline.json` registra a dívida conhecida por
 * arquivo, e o scanner só reclama do que aumenta. Sem isso o alerta imprimiria
 * milhares de linhas pré-existentes e seria ignorado.
 *
 * Modos:
 *   --baseline   regrava o baseline com o estado atual
 *   --staged     confere apenas arquivos em stage (usado no pre-commit)
 *   --report     imprime o inventário completo agrupado por categoria
 *   --strict     sai com código 1 quando há regressão (desligado por padrão)
 *
 * Sai com 0 por padrão, mesmo havendo regressão: o gate é warning enquanto a
 * dívida existente não for zerada. Ligar --strict quando F-7/F-8 fecharem.
 */

import { execSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'

const ROOT = process.cwd()
const BASELINE = join(ROOT, '.i18n-baseline.json')

const SCAN_DIRS = ['src', '@core', 'lib', 'resources/templates', 'app']
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.hbs', '.dart'])
const IGNORED = new Set([
    'node_modules', 'dist', 'build', 'coverage', '.git', '.next',
    'generated', '__generated__', '.yarn'
])

const ACCENTED = /[áàâãäéèêëíìîïóòôõöúùûüçñÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ]/
const STOPWORDS = new RegExp(
    '\\b(de|do|da|dos|das|em|no|na|nos|nas|para|por|com|sem|que|nao|sim|ate|ou' +
    '|um|uma|ao|aos|pelo|pela|este|esta|isso|todos|todas|selecione|informe' +
    '|obrigatorio|cadastro|relatorio|situacao|salvar|excluir|editar|novo|nova' +
    '|pesquisar|filtrar|voltar|confirmar|cancelar|data|nome)\\b',
    'i'
)
const DOMAIN = new RegExp(
    '\\b(aso|ppp|pgr|ltcat|pcmso|cipa|ghe|epi|epc|cat|exame|atestado|afastamento' +
    '|treinamento|risco|acidente|colaborador|funcionario|filial|obra|setor|cargo)\\b',
    'i'
)

/** Contexto sintático -> categoria da taxonomia do discovery (ver DISCOVERY-I18N.md §5). */
const CATEGORIES = [
    [/@Field\s*\(|description\s*:/, 'C9'],
    [/throw\s+new\s+\w*Error/, 'C10'],
    [/\b(toast|snackbar|alert|confirm)\b/i, 'C4'],
    [/\b(label|title|placeholder|helperText|tooltip|caption|emptyMessage|header)\s*[:=]/, 'C2'],
    [/\bheaderName\b|\bcolumns\s*[:=]|\baccessor\b/, 'C6'],
    [/\blabel\s*:\s*['"]/, 'C3'],
    [/\b(dd\/MM|DD\/MM|pt-BR|toLocaleString|Intl\.)/, 'C7'],
    [/\bt\(\s*['"][^'"]+['"]\s*,\s*['"]/, 'C8'],
    [/>\s*[A-ZÁÉÍÓÚÂÊÔÃÕÇ]/, 'C1']
]

const REGULATORY = /\b(ASO|PPP|PGR|LTCAT|PCMSO|CIPA|GHE|SESMT|PPRA|NR-\d+)\b/

const looksLikeIdentifier = s =>
    !/\s/.test(s) && (/^[a-z]+([A-Z][a-z]*)+$/.test(s) || /^[A-Z][a-zA-Z]*$/.test(s))

const isNoise = s =>
    s.length < 3 ||
    /^https?:\/\//.test(s) ||
    /^[./~@]/.test(s) ||
    /^[A-Z0-9_]+$/.test(s) ||
    /^[\d\s\-/:.,%]+$/.test(s) ||
    (/:/.test(s) && !/\s/.test(s)) ||
    looksLikeIdentifier(s)

const isPortuguese = s =>
    !isNoise(s) && (ACCENTED.test(s) || STOPWORDS.test(s) || DOMAIN.test(s))

const categorize = line => {
    for (const [pattern, code] of CATEGORIES) if (pattern.test(line)) return code
    return 'C0'
}

const STRING_LITERAL = /'([^'\\\n]{2,})'|"([^"\\\n]{2,})"|`([^`\\\n$]{2,})`/g
const HBS_TEXT = /^[^<>{}\n]*[A-Za-zÀ-ÿ]{3,}[^<>{}\n]*$/

function scanContent(content, file) {
    const isTemplate = extname(file) === '.hbs'
    const findings = []

    content.split('\n').forEach((line, i) => {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('*')) return
        if (/^\s*import\s/.test(line) || /^\s*export\s+(\*|\{)/.test(line)) return
        if (/\bfrom\s+['"][^'"]+['"]/.test(line)) return

        if (isTemplate) {
            const text = trimmed.replace(/<[^>]*>/g, '').replace(/\{\{[^}]*\}\}/g, '').trim()
            if (text && HBS_TEXT.test(text) && isPortuguese(text)) {
                findings.push({ line: i + 1, category: 'C11', snippet: text.slice(0, 120) })
            }
            return
        }

        for (const match of line.matchAll(STRING_LITERAL)) {
            const value = match[1] ?? match[2] ?? match[3]
            if (!value || !isPortuguese(value)) continue
            const category = REGULATORY.test(value) ? 'C12' : categorize(line)
            findings.push({ line: i + 1, category, snippet: value.slice(0, 120) })
        }
    })

    return findings
}

async function walk(dir, acc = []) {
    let entries
    try {
        entries = await readdir(dir, { withFileTypes: true })
    } catch {
        return acc
    }
    for (const entry of entries) {
        if (IGNORED.has(entry.name)) continue
        const full = join(dir, entry.name)
        if (entry.isDirectory()) await walk(full, acc)
        else if (EXTENSIONS.has(extname(entry.name))) acc.push(full)
    }
    return acc
}

async function collect(files) {
    const perFile = {}
    const all = []
    for (const file of files) {
        const rel = relative(ROOT, file)
        const findings = scanContent(await readFile(file, 'utf8'), file)
        if (!findings.length) continue
        perFile[rel] = findings.length
        all.push(...findings.map(f => ({ ...f, file: rel })))
    }
    return { perFile, all }
}

const stagedFiles = () =>
    execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' })
        .split('\n')
        .filter(f => f && EXTENSIONS.has(extname(f)) && existsSync(join(ROOT, f)))
        .map(f => join(ROOT, f))

const loadBaseline = () =>
    existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : { files: {}, total: 0 }

async function main() {
    const args = new Set(process.argv.slice(2))
    const targets = args.has('--staged')
        ? stagedFiles()
        : (await Promise.all(SCAN_DIRS.map(d => walk(join(ROOT, d))))).flat()

    if (!targets.length) return 0

    const { perFile, all } = await collect(targets)
    const total = all.length

    if (args.has('--baseline')) {
        writeFileSync(BASELINE, JSON.stringify({ files: perFile, total }, null, 2) + '\n')
        console.log(`i18n: baseline gravado — ${total} ocorrências em ${Object.keys(perFile).length} arquivos`)
        return 0
    }

    if (args.has('--report')) {
        const byCategory = all.reduce((acc, f) => ({ ...acc, [f.category]: (acc[f.category] ?? 0) + 1 }), {})
        console.log(`i18n: ${total} ocorrências em ${Object.keys(perFile).length} arquivos\n`)
        Object.entries(byCategory).sort((a, b) => b[1] - a[1])
            .forEach(([c, n]) => console.log(`  ${c.padEnd(4)} ${String(n).padStart(6)}`))
        console.log('\nPiores arquivos:')
        Object.entries(perFile).sort((a, b) => b[1] - a[1]).slice(0, 20)
            .forEach(([f, n]) => console.log(`  ${String(n).padStart(5)}  ${f}`))
        return 0
    }

    const baseline = loadBaseline()
    const regressions = Object.entries(perFile)
        .map(([file, count]) => ({ file, count, was: baseline.files[file] ?? 0 }))
        .filter(r => r.count > r.was)

    if (!regressions.length) return 0

    const added = regressions.reduce((sum, r) => sum + (r.count - r.was), 0)
    console.warn(`\n⚠️  i18n: ${added} nova(s) string(s) hardcoded em português (${regressions.length} arquivo(s))`)
    for (const r of regressions.slice(0, 15)) {
        console.warn(`   ${r.file}  ${r.was} → ${r.count}`)
        all.filter(f => f.file === r.file).slice(0, 3)
            .forEach(f => console.warn(`      ${f.line}: [${f.category}] ${f.snippet}`))
    }
    if (regressions.length > 15) console.warn(`   … e mais ${regressions.length - 15} arquivo(s)`)
    console.warn('\n   Use uma chave de @nginformatica/quirons-i18n em vez do literal.')
    console.warn('   Dívida pré-existente é aceita; regrave o baseline com: yarn i18n:baseline\n')

    return args.has('--strict') ? 1 : 0
}

main().then(code => process.exit(code)).catch(err => {
    console.warn(`i18n: scanner falhou (${err.message}) — seguindo sem bloquear`)
    process.exit(0)
})
