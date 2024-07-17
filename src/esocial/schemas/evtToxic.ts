import * as t from 'io-ts';
import * as tipos from './tipos'

/// S-2221 - Exame Toxicológico do Motorista Profissional Empregado
export const eSocial = t.type({
    /// Evento Exame Toxicológico do Motorista Profissional Empregado
    /// CHAVE_GRUPO: {Id}
    /// REGRA:REGRA_ENVIO_PROC_FECHAMENTO
    /// REGRA:REGRA_EVENTOS_EXTEMP
    /// REGRA:REGRA_EVENTO_EXT_SEM_IMPACTO_FOPAG
    /// REGRA:REGRA_EVENTO_POSTERIOR_CAT_OBITO
    /// REGRA:REGRA_EXISTE_INFO_EMPREGADOR
    /// REGRA:REGRA_EXISTE_VINCULO
    /// REGRA:REGRA_EXTEMP_REINTEGRACAO
    /// REGRA:REGRA_MESMO_PROCEMI
    /// REGRA:REGRA_RETIFICA_MESMO_VINCULO
    evtToxic: t.type({
        $: t.type({
            Id: tipos.TS_Id
        }),
        ideEvento: tipos.T_ideEvento_trab,
        ideEmpregador: tipos.T_ideEmpregador,
        ideVinculo: tipos.T_ideVinculo_sst,
        /// Informações do exame toxicológico do motorista profissional.
        /// CHAVE_GRUPO: {dtExame*}
        toxicologico: t.intersection([
            t.type({
                /// Data da realização do exame toxicológico.
                /// Validação: Deve ser uma data válida, igual ou anterior à data atual e igual ou posterior à data de início da obrigatoriedade deste evento para o empregador no eSocial.
                dtExame: tipos.date,
                /// CNPJ do laboratório responsável pela realização do exame.
                /// Validação: Deve ser um CNPJ válido, com 14 (catorze) algarismos.
                cnpjLab: tipos.TS_cnpj, 
                /// Código do exame toxicológico.
                /// Validação: Deve possuir 11 (onze) caracteres, composto por duas letras (dois primeiros caracteres) e nove algarismos (últimos nove caracteres).
                codSeqExame: t.string, // Use um tipo string para o código do exame, já que ele possui letras e números
                /// Preencher com o nome do médico.
                nmMed: tipos.TS_nome,
            }),            
            t.partial({
                /// Número de inscrição do médico no Conselho Regional de Medicina - CRM.
                /// Validação: Preenchimento obrigatório, exceto se o endereço do trabalhador em S-2200 ou S-2205 vigente em {dtExame}(./dtExame) for no exterior.
                nrCRM: tipos.TS_crm, // CRM pode ser nulo se o endereço for no exterior
                /// Preencher com a sigla da Unidade da Federação - UF de expedição do CRM.
                /// Validação: Preenchimento obrigatório, exceto se o endereço do trabalhador em S-2200 ou S-2205 vigente em {dtExame}(./dtExame) for no exterior.
                ufCRM: tipos.TS_uf // UF do CRM pode ser nula se o endereço for no exterior
            })
        ])

    })
})

export type eSocial = t.TypeOf<typeof eSocial>

