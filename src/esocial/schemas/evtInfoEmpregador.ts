/*
    This file was initially machine-generated by recycle/GENERATE.js, using
    eSocial's evtCAT.xsd schema, and includes corresponding io-ts types.

    EDIT WITH CARE.
*/
import * as t from 'io-ts'

import * as tipos from './tipos'

/// Período de validade das informações.
/// CHAVE_GRUPO: {iniValid}, {fimValid}
export const T_idePeriodo = t.intersection([
    t.type({
        iniValid: tipos.TS_iniValid
    }),
    t.partial({
        fimValid: tipos.TS_fimValid
    })
])

/// Detalhamento das informações do empregador.
export const T_infoCadastro = t.intersection([
    t.type({
        /// Preencher com o código correspondente à classificação tributária do contribuinte.
        /// Validação: Deve ser um código válido e existente na Tabela 08. Os códigos [21] e [22] somente podem ser utilizados se {tpInsc}(1000_ideEmpregador_tpInsc) for igual a [2]. Para os demais códigos, {tpInsc}(1000_ideEmpregador_tpInsc) deve ser igual a [1].
        classTrib: t.string,
        /// Indicativo de desoneração da folha.
        /// Validação: Pode ser igual a [1] apenas se {classTrib}(./classTrib) = [02, 03, 99]. Nos demais casos, deve ser igual a [0].
        indDesFolha: t.union([
            /// Não aplicável
            t.literal(0),
            /// Empresa enquadrada nos arts. 7º a 9º da Lei 12.546/2011
            t.literal(1)
        ]),
        /// Indica se houve opção pelo registro eletrônico de empregados.
        indOptRegEletron: t.union([
            /// Não optou pelo registro eletrônico de empregados
            t.literal(0),
            /// Optou pelo registro eletrônico de empregados
            t.literal(1)
        ])
    }),
    t.partial({
        /// Indicativo de cooperativa.
        /// Validação: O preenchimento do campo é exclusivo e obrigatório para PJ. Somente pode ser diferente de [0] se a natureza jurídica do declarante for igual a 214-3.
        indCoop: tipos.TS_indCoop,
        /// Indicativo de construtora.
        /// Validação: O preenchimento do campo é exclusivo e obrigatório para PJ.
        indConstr: tipos.TS_indConstr,
        /// Indicativo da opção pelo produtor rural pela forma de tributação da contribuição previdenciária, nos termos do art. 25, § 13, da Lei 8.212/1991 e do art. 25, § 7°, da Lei 8.870/1994. O não preenchimento deste campo por parte do produtor rural implica opção pela comercialização da sua produção.
        /// Validação: Não preencher se {classTrib}(./classTrib) for diferente de [07, 21].
        indOpcCP: t.union([
            /// Sobre a comercialização da sua produção
            t.literal(1),
            /// Sobre a folha de pagamento
            t.literal(2)
        ]),
        /// Indicativo de microempresa - ME ou empresa de pequeno porte - EPP para permissão de acesso ao módulo simplificado. Não preencher caso o empregador não se enquadre como micro ou pequena empresa.
        /// Validação: Não preencher se {classTrib}(./classTrib) = [21, 22].
        indPorte: /// Sim
        t.literal('S'),
        /// CNPJ do Ente Federativo Responsável - EFR.
        /// Validação: Preenchimento obrigatório e exclusivo se a natureza jurídica do declarante for Administração Pública (grupo [1]). Nesse caso, informar o campo com 14 (catorze) algarismos.
        /// Informação validada no cadastro do CNPJ da RFB.
        cnpjEFR: tipos.TS_cnpj,
        /// Informações complementares - Empresas isentas - Dados da isenção.
        /// CONDICAO_GRUPO: OC (se {classTrib}(1000_infoEmpregador_inclusao_infoCadastro_classTrib) = [80]); N (nos demais casos)
        dadosIsencao: t.intersection([
            t.type({
                /// Sigla e nome do Ministério ou lei que concedeu o certificado.
                ideMinLei: t.string,
                /// Número do Certificado de Entidade Beneficente de Assistência Social - CEBAS, número da portaria de concessão do certificado, ou, no caso de concessão através de lei específica, o número da lei.
                nrCertif: t.string,
                /// Data de emissão do certificado/publicação da lei.
                dtEmisCertif: t.string,
                /// Data de vencimento do certificado.
                /// Validação: Não pode ser anterior a {dtEmisCertif}(./dtEmisCertif).
                dtVencCertif: t.string
            }),
            t.partial({
                /// Número do protocolo do pedido de renovação.
                nrProtRenov: t.string,
                /// Data do protocolo de renovação.
                dtProtRenov: t.string,
                /// Data de publicação no Diário Oficial da União - DOU.
                dtDou: t.string,
                /// Número da página no DOU referente à publicação do documento de concessão do certificado.
                pagDou: t.number
            })
        ]),
        /// Informações exclusivas de organismos internacionais e outras instituições extraterritoriais.
        /// CONDICAO_GRUPO: O (se a natureza jurídica pertencer ao grupo [5]); N (nos demais casos)
        infoOrgInternacional: t.type({
            /// Indicativo da existência de acordo internacional para isenção de multa.
            indAcordoIsenMulta: t.union([
                /// Sem acordo
                t.literal(0),
                /// Com acordo
                t.literal(1)
            ])
        })
    })
])

/// S-1000 - Informações do Empregador/Contribuinte/Órgão Público
export const eSocial = t.type({
    /// Evento Informações do Empregador.
    /// CHAVE_GRUPO: {Id}
    /// REGRA:REGRA_ENVIO_PROC_FECHAMENTO
    /// REGRA:REGRA_INFO_EMP_PERIODO_CONFLITANTE
    /// REGRA:REGRA_INFO_EMP_VALIDA_CLASSTRIB_NATJURID
    /// REGRA:REGRA_INFO_EMP_VALIDA_DTINICIAL
    /// REGRA:REGRA_TAB_PERMITE_EXCLUSAO
    /// REGRA:REGRA_VALIDA_DT_FUTURA
    /// REGRA:REGRA_VALIDA_EMPREGADOR
    evtInfoEmpregador: t.type({
        $: t.type({
            Id: tipos.TS_Id
        }),
        ideEvento: tipos.T_ideEvento_evtTab,
        /// Informações de identificação do empregador.
        /// CHAVE_GRUPO: {tpInsc}, {nrInsc}
        ideEmpregador: t.type({
            tpInsc: tipos.TS_tpInsc_1_2,
            /// Informar o número de inscrição do contribuinte de acordo com o tipo de inscrição indicado no campo {tpInsc}(./tpInsc).
            /// Validação: Se {tpInsc}(./tpInsc) for igual a [1], deve ser um número de CNPJ válido. Neste caso, deve ser informada apenas a raiz/base (8 posições), exceto se natureza jurídica do declarante for igual a 101-5, 104-0, 107-4, 110-4, 113-9, 116-3, 119-8, 125-2, 128-7, 131-7 ou 134-1, situação em que o campo deve ser preenchido com o CNPJ completo (14 posições).
            /// Se {tpInsc}(./tpInsc) for igual a [2], deve ser um CPF válido.
            nrInsc: tipos.TS_nrInsc_8_11_14
        }),
        /// Informações do empregador.
        /// DESCRICAO_COMPLETA:Identificação da operação (inclusão, alteração ou exclusão) e das respectivas informações do empregador.
        infoEmpregador: t.union([
            t.type({
                /// Inclusão de novas informações.
                /// CONDICAO_GRUPO: OC
                inclusao: t.type({
                    idePeriodo: T_idePeriodo,
                    infoCadastro: T_infoCadastro
                })
            }),
            t.type({
                /// Alteração das informações.
                /// CONDICAO_GRUPO: OC
                alteracao: t.intersection([
                    t.type({
                        idePeriodo: T_idePeriodo,
                        infoCadastro: T_infoCadastro
                    }),
                    t.partial({
                        /// Novo período de validade das informações.
                        /// DESCRICAO_COMPLETA:Informação preenchida exclusivamente em caso de alteração do período de validade das informações, apresentando o novo período de validade.
                        /// CONDICAO_GRUPO: OC
                        novaValidade: T_idePeriodo
                    })
                ])
            }),
            t.type({
                /// Exclusão das informações.
                /// CONDICAO_GRUPO: OC
                exclusao: t.type({
                    idePeriodo: T_idePeriodo
                })
            })
        ])
    })
})