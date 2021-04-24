/*
    This file was initially machine-generated by recycle/GENERATE.js, using
    eSocial's evtMonit.xsd schema, and includes corresponding io-ts types.

    EDIT WITH CARE.
*/
import * as t from 'io-ts'

import * as tipos from './tipos'

/// S-2220 - Monitoramento da Saúde do Trabalhador
export const eSocial = t.type({
    /// Evento Monitoramento da Saúde do Trabalhador.
    /// CHAVE_GRUPO: {Id}
    /// REGRA:REGRA_ENVIO_PROC_FECHAMENTO
    /// REGRA:REGRA_EVENTOS_EXTEMP
    /// REGRA:REGRA_EVENTO_EXT_SEM_IMPACTO_FOPAG
    /// REGRA:REGRA_EXISTE_EVENTO_TSV_INICIO
    /// REGRA:REGRA_EXISTE_INFO_EMPREGADOR
    /// REGRA:REGRA_EXISTE_VINCULO
    /// REGRA:REGRA_EXTEMP_REINTEGRACAO
    /// REGRA:REGRA_MESMO_PROCEMI
    /// REGRA:REGRA_RETIFICA_MESMO_VINCULO
    evtMonit: t.type({
        $: t.type({
            Id: tipos.TS_Id
        }),
        ideEvento: tipos.T_ideEvento_trab,
        ideEmpregador: tipos.T_ideEmpregador,
        ideVinculo: tipos.T_ideVinculo_sst,
        /// Informações do exame médico ocupacional.
        /// CHAVE_GRUPO: {tpExameOcup}
        exMedOcup: t.intersection([
            t.type({
                /// Tipo do exame médico ocupacional.
                /// Validação: Se informado [0], não pode existir outro evento S-2220 para o mesmo contrato com {dtAso}(./aso_dtAso) anterior.
                tpExameOcup: t.union([
                    /// Exame médico admissional
                    t.literal(0),
                    /// Exame médico periódico, conforme Norma Regulamentadora 07 - NR-07 e/ou planejamento do Programa de Controle Médico de Saúde Ocupacional - PCMSO
                    t.literal(1),
                    /// Exame médico de retorno ao trabalho
                    t.literal(2),
                    /// Exame médico de mudança de função
                    t.literal(3),
                    /// Exame médico de monitoração pontual, não enquadrado nos demais casos
                    t.literal(4),
                    /// Exame médico demissional
                    t.literal(9)
                ]),
                /// ASO
                /// DESCRICAO_COMPLETA:Detalhamento das informações do Atestado de Saúde Ocupacional - ASO.
                /// CHAVE_GRUPO: {dtAso}
                aso: t.type({
                    /// Data de emissão do ASO.
                    /// Validação: Deve ser uma data válida, igual ou anterior à data atual e igual ou posterior à data de início da obrigatoriedade deste evento para o empregador no eSocial.
                    dtAso: tipos.date,
                    /// Resultado do ASO.
                    resAso: t.union([
                        /// Apto
                        t.literal(1),
                        /// Inapto
                        t.literal(2)
                    ]),
                    /// Avaliações clínicas e exames complementares realizados
                    /// DESCRICAO_COMPLETA:Grupo que detalha as avaliações clínicas e os exames complementares porventura realizados pelo trabalhador em virtude do determinado nos Quadros I e II da NR-07, além de outros solicitados pelo médico e os referentes ao ASO.
                    /// CHAVE_GRUPO: {dtExm}, {procRealizado}
                    exame: t.array(t.intersection([
                        t.type({
                            /// Data do exame realizado.
                            /// Validação: Deve ser uma data válida, igual ou anterior à data do ASO informada em {dtAso}(../dtAso).
                            dtExm: tipos.date,
                            /// Código do procedimento diagnóstico.
                            /// Validação: Deve ser um código válido e existente na Tabela 27.
                            procRealizado: t.string,
                            /// Ordem do exame.
                            ordExame: t.union([
                                /// Inicial
                                t.literal(1),
                                /// Sequencial
                                t.literal(2)
                            ])
                        }),
                        t.partial({
                            /// Observação sobre o procedimento diagnóstico realizado.
                            obsProc: tipos.TS_texto_999,
                            /// Indicação dos resultados.
                            indResult: t.union([
                                /// Normal
                                t.literal(1),
                                /// Alterado
                                t.literal(2),
                                /// Estável
                                t.literal(3),
                                /// Agravamento
                                t.literal(4)
                            ])
                        })
                    ])),
                    /// Informações sobre o médico emitente do ASO.
                    medico: t.type({
                        /// Preencher com o nome do médico emitente do ASO.
                        nmMed: tipos.TS_nome,
                        /// Número de inscrição do médico emitente do ASO no Conselho Regional de Medicina - CRM.
                        nrCRM: tipos.TS_crm,
                        /// Preencher com a sigla da Unidade da Federação - UF de expedição do CRM.
                        ufCRM: tipos.TS_uf
                    })
                })
            }),
            t.partial({
                /// Informações sobre o médico responsável/coordenador do PCMSO.
                /// CONDICAO_GRUPO: OC
                respMonit: t.intersection([
                    t.type({
                        /// Preencher com o nome do médico responsável/coordenador do PCMSO.
                        nmResp: tipos.TS_nome,
                        /// Número de inscrição do médico responsável/coordenador do PCMSO no CRM.
                        nrCRM: tipos.TS_crm,
                        /// Preencher com a sigla da UF de expedição do CRM.
                        ufCRM: tipos.TS_uf
                    }),
                    t.partial({
                        /// Preencher com o CPF do médico responsável/coordenador do PCMSO.
                        /// Validação: Se informado, deve ser um CPF válido.
                        cpfResp: tipos.TS_cpf
                    })
                ])
            })
        ])
    })
})

export type eSocial = t.TypeOf<typeof eSocial>

