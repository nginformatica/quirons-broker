/*
    This file was initially machine-generated by recycle/GENERATE.js, using
    eSocial's evtCAT.xsd schema, and includes corresponding io-ts types.

    EDIT WITH CARE.
*/
import * as t from 'io-ts'

import * as tipos from './tipos'

/// S-3000 - Exclusão de Eventos
export const eSocial = t.type({
    /// Evento Exclusão
    /// DESCRICAO_COMPLETA:Evento Exclusão de Eventos.
    /// CHAVE_GRUPO: {Id}
    /// REGRA:REGRA_ENVIO_PROC_FECHAMENTO
    /// REGRA:REGRA_EVE_EXCLUSAO_VALIDA_NRRECIBO
    /// REGRA:REGRA_EXISTE_INFO_EMPREGADOR
    /// REGRA:REGRA_EXTEMP_DOMESTICO
    /// REGRA:REGRA_MESMO_PROCEMI
    /// REGRA:REGRA_VALIDA_EMPREGADOR
    evtExclusao: t.type({
        $: t.type({
            Id: tipos.TS_Id
        }),
        ideEvento: tipos.T_ideEvento_evtTab,
        ideEmpregador: tipos.T_ideEmpregador,
        /// Informação do evento que será excluído
        /// DESCRICAO_COMPLETA:Grupo que identifica o evento objeto da exclusão.
        infoExclusao: t.intersection([
            t.type({
                /// Preencher com o tipo de evento.
                /// Validação: Deve existir na Tabela 09. Podem ser excluídos apenas os eventos relacionados abaixo:
                /// a) Não periódicos (S-2190 a S-2420);
                /// b) Periódicos (S-1200 a S-1280).
                tpEvento: t.string,
                /// Preencher com o número do recibo do evento que será excluído.
                /// Validação: O recibo deve ser relativo ao mesmo tipo de evento indicado em {tpEvento}(./tpEvento) e o respectivo evento não deve constar como excluído ou retificado. Além disso, no caso de exclusão de eventos em que existe a identificação do trabalhador, o evento que está sendo excluído deve referir-se ao mesmo trabalhador identificado por {cpfTrab}(./ideTrabalhador_cpfTrab).
                nrRecEvt: tipos.TS_nrRecibo
            }),
            t.partial({
                /// Identificação do trabalhador a que se refere o evento a ser excluído
                /// DESCRICAO_COMPLETA:Grupo que identifica a qual trabalhador se refere o evento a ser excluído.
                /// CONDICAO_GRUPO: O (se {tpEvento}(../tpEvento) corresponder a um dos eventos não periódicos (S-2190 a S-2420) ou um dos eventos periódicos (S-1200 a S-1210); N (nos demais casos)
                ideTrabalhador: t.type({
                    /// Preencher com o número do CPF do trabalhador ou do beneficiário.
                    /// Validação: O CPF indicado deve existir na base de dados do RET.
                    cpfTrab: tipos.TS_cpf
                }),
                /// Identificação do período de apuração a que se refere o evento que será excluído
                /// DESCRICAO_COMPLETA:Grupo que identifica a qual período de apuração pertence o evento que será excluído.
                /// CONDICAO_GRUPO: O (se {tpEvento}(../tpEvento) corresponder a um dos eventos periódicos (S-1200 a S-1280)); N (nos demais casos)
                ideFolhaPagto: t.intersection([
                    t.type({
                        /// Informar o mês/ano (formato AAAA-MM) ou apenas o ano (formato AAAA) de referência das informações.
                        /// Validação: Deve ser um mês/ano ou ano válido, posterior à implementação do eSocial. Somente pode ser informado ano (formato AAAA) se {indApuracao}(./indApuracao) = [2].
                        perApur: tipos.TS_perApur
                    }),
                    t.partial({
                        /// Indicativo de período de apuração.
                        /// Validação: Preenchimento obrigatório e exclusivo se {tpEvento}(../tpEvento) = [S-1200, S-1202, S-1207, S-1280].
                        indApuracao: tipos.TS_indApuracao
                    })
                ])
            })
        ])
    })
})

export type eSocial = t.TypeOf<typeof eSocial>
