/*
    This file was initially machine-generated by recycle/GENERATE.js, using
    eSocial's evtCAT.xsd schema, and includes corresponding io-ts types.

    EDIT WITH CARE.
*/
import * as t from 'io-ts'

import * as tipos from './tipos'

/// S-2210 - Comunicação de Acidente de Trabalho
export const eSocial = t.type({
    /// Evento Comunicação de Acidente de Trabalho.
    /// CHAVE_GRUPO: {Id}
    /// REGRA:REGRA_EMPREGADO_DOMESTICO
    /// REGRA:REGRA_ENVIO_PROC_FECHAMENTO
    /// REGRA:REGRA_EVENTOS_EXTEMP
    /// REGRA:REGRA_EVENTO_EXT_SEM_IMPACTO_FOPAG
    /// REGRA:REGRA_EVENTO_POSTERIOR_CAT_OBITO
    /// REGRA:REGRA_EXCLUI_EVENTO_CAT
    /// REGRA:REGRA_EXISTE_CAT_ORIGEM
    /// REGRA:REGRA_EXISTE_INFO_EMPREGADOR
    /// REGRA:REGRA_EXTEMP_REINTEGRACAO
    /// REGRA:REGRA_GERAL_VALIDA_DADOS_TABCONTRIB
    /// REGRA:REGRA_MESMO_PROCEMI
    /// REGRA:REGRA_RETIFICA_DT_ACIDENTE
    /// REGRA:REGRA_RETIFICA_MESMO_VINCULO
    /// REGRA:REGRA_TSV_ATIVO_NA_DTEVENTO
    /// REGRA:REGRA_VINCULO_ATIVO_NA_DTEVENTO
    evtCAT: t.type({
        $: t.type({
            Id: tipos.TS_Id
        }),
        ideEvento: tipos.T_ideEvento_trab,
        ideEmpregador: tipos.T_ideEmpregador,
        ideVinculo: tipos.T_ideVinculo_sst,
        /// CAT
        /// DESCRICAO_COMPLETA:Comunicação de Acidente de Trabalho - CAT.
        /// CHAVE_GRUPO: {dtAcid}, {hrAcid}, {tpCat}
        cat: t.intersection([
            t.type({
                /// Data do acidente.
                /// Validação: Deve ser uma data válida, igual ou anterior à data atual e igual ou posterior à data de admissão do trabalhador e à data de início da obrigatoriedade deste evento para o empregador no eSocial.
                /// Se {tpCat}(./tpCat) = [2, 3], deve ser informado valor igual ao preenchido no evento de CAT anterior, quando informado em {nrRecCatOrig}(./catOrigem_nrRecCatOrig).
                dtAcid: tipos.date,
                /// Tipo de acidente de trabalho.
                tpAcid: t.union([
                    /// Típico
                    t.literal(1),
                    /// Doença
                    t.literal(2),
                    /// Trajeto
                    t.literal(3)
                ]),
                /// Tipo de CAT.
                tpCat: t.union([
                    /// Inicial
                    t.literal(1),
                    /// Reabertura
                    t.literal(2),
                    /// Comunicação de óbito
                    t.literal(3)
                ]),
                /// Houve óbito?
                /// Validação: Se o {tpCat}(./tpCat) for igual a [3], o campo deverá sempre ser preenchido com [S]. Se o {tpCat}(./tpCat) for igual a [2], o campo deverá sempre ser preenchido com [N].
                indCatObito: tipos.TS_sim_nao,
                /// Houve comunicação à autoridade policial?
                indComunPolicia: tipos.TS_sim_nao,
                /// Preencher com o código da situação geradora do acidente ou da doença profissional.
                /// Validação: Deve ser um código válido e existente na Tabela 15 ou na Tabela 16.
                codSitGeradora: t.string,
                /// Iniciativa da CAT.
                iniciatCAT: t.union([
                    /// Empregador
                    t.literal(1),
                    /// Ordem judicial
                    t.literal(2),
                    /// Determinação de órgão fiscalizador
                    t.literal(3)
                ]),
                /// Local do acidente.
                localAcidente: t.intersection([
                    t.type({
                        /// Tipo de local do acidente.
                        tpLocal: t.union([
                            /// Estabelecimento do empregador no Brasil
                            t.literal(1),
                            /// Estabelecimento do empregador no exterior
                            t.literal(2),
                            /// Estabelecimento de terceiros onde o empregador presta serviços
                            t.literal(3),
                            /// Via pública
                            t.literal(4),
                            /// Área rural
                            t.literal(5),
                            /// Embarcação
                            t.literal(6),
                            /// Outros
                            t.literal(9)
                        ]),
                        dscLograd: tipos.TS_dscLograd,
                        nrLograd: tipos.TS_nrLograd
                    }),
                    t.partial({
                        /// Especificação do local do acidente (pátio, rampa de acesso, posto de trabalho, etc.).
                        dscLocal: tipos.TS_texto_255,
                        tpLograd: tipos.TS_tpLograd,
                        complemento: tipos.TS_complemento,
                        bairro: tipos.TS_bairro,
                        /// Código de Endereçamento Postal - CEP.
                        /// Validação: Preenchimento obrigatório se {tpLocal}(./tpLocal) = [1, 3, 5]. Não preencher se {tpLocal}(./tpLocal) = [2].
                        /// Se preenchido, deve ser informado apenas com números, com 8 (oito) posições.
                        cep: tipos.TS_cep,
                        /// Preencher com o código do município, conforme tabela do IBGE.
                        /// Validação: Preenchimento obrigatório se {tpLocal}(./tpLocal) = [1, 3, 4, 5]. Não preencher se {tpLocal}(./tpLocal) = [2].
                        /// Se informado, deve ser um código válido e existente na tabela do IBGE.
                        codMunic: tipos.TS_codMunic,
                        /// Preencher com a sigla da Unidade da Federação - UF.
                        /// Validação: Preenchimento obrigatório se {tpLocal}(./tpLocal) = [1, 3, 4, 5]. Não preencher se {tpLocal}(./tpLocal) = [2].
                        uf: tipos.TS_uf,
                        /// Preencher com o código do país.
                        /// Validação: Deve ser um código de país válido e existente na Tabela 06.
                        /// Preenchimento obrigatório se {tpLocal}(./tpLocal) = [2]. Não preencher nos demais casos.
                        pais: t.string,
                        /// Código de Endereçamento Postal.
                        /// Validação: Preenchimento obrigatório se {tpLocal}(./tpLocal) = [2]. Não preencher nos demais casos.
                        codPostal: tipos.TS_codPostal,
                        /// Identificação do local onde ocorreu o acidente.
                        /// CONDICAO_GRUPO: O (se {ideEmpregador/tpInsc}(2210_ideEmpregador_tpInsc) = [1] e {tpLocal}(../tpLocal) = [1, 3]); OC (nos demais casos)
                        ideLocalAcid: t.type({
                            /// Preencher com o código correspondente ao tipo de inscrição do local onde ocorreu o acidente ou a doença ocupacional, conforme Tabela 05.
                            tpInsc: tipos.TS_tpInsc_1_3_4,
                            /// Informar o número de inscrição do estabelecimento, de acordo com o tipo de inscrição indicado no campo {ideLocalAcid/tpInsc}(./tpInsc). Se o acidente ou a doença ocupacional ocorreu em local onde o trabalhador presta serviços, deve ser um número de inscrição pertencente à contratante dos serviços.
                            /// Validação: Deve ser compatível com o conteúdo do campo {ideLocalAcid/tpInsc}(./tpInsc). Deve ser um identificador válido, constante das bases da RFB, e:
                            /// a) Se {tpLocal}(../tpLocal) = [1], deve ser válido e existente na Tabela de Estabelecimentos (S-1005);
                            /// b) Se {tpLocal}(../tpLocal) = [3], deve ser diferente dos estabelecimentos informados na Tabela S-1005 e, se {ideLocalAcid/tpInsc}(./tpInsc) = [1], diferente do CNPJ base indicado em S-1000.
                            nrInsc: tipos.TS_nrInsc_12_14
                        })
                    })
                ]),
                /// Parte do corpo atingida.
                /// DESCRICAO_COMPLETA:Detalhamento da parte atingida pelo acidente de trabalho.
                parteAtingida: t.type({
                    /// Preencher com o código correspondente à parte atingida.
                    /// Validação: Deve ser um código válido e existente na Tabela 13.
                    codParteAting: t.string,
                    /// Lateralidade da(s) parte(s) atingida(s).
                    /// Nos casos de órgãos bilaterais, ou seja, que se situam dos lados do corpo, assinalar o lado (direito ou esquerdo). Ex.: Caso o órgão atingido seja perna, apontar qual foi a atingida (perna direita, perna esquerda ou ambas). Se o órgão atingido é único (como, por exemplo, a cabeça), assinalar este campo como não aplicável.
                    lateralidade: t.union([
                        /// Não aplicável
                        t.literal(0),
                        /// Esquerda
                        t.literal(1),
                        /// Direita
                        t.literal(2),
                        /// Ambas
                        t.literal(3)
                    ])
                }),
                /// Agente causador.
                /// DESCRICAO_COMPLETA:Detalhamento do agente causador do acidente de trabalho.
                agenteCausador: t.type({
                    /// Preencher com o código correspondente ao agente causador do acidente.
                    /// Validação: Deve ser um código válido e existente na Tabela 14 ou na Tabela 15.
                    codAgntCausador: t.string
                })
            }),
            t.partial({
                /// Hora do acidente, no formato HHMM.
                /// Validação: Preenchimento obrigatório e exclusivo se {tpAcid}(./tpAcid) = [1]. Se informada, deve estar no intervalo entre [0000] e [2359], criticando inclusive a segunda parte do número, que indica os minutos, que deve ser menor ou igual a 59.
                /// Se {tpCat}(./tpCat) = [2, 3], deve ser informado valor igual ao preenchido no evento de CAT anterior, quando informado em {nrRecCatOrig}(./catOrigem_nrRecCatOrig).
                hrAcid: tipos.TS_hora,
                /// Horas trabalhadas antes da ocorrência do acidente, no formato HHMM.
                /// Validação: Preenchimento obrigatório e exclusivo se {tpAcid}(./tpAcid) = [1]. Se informada, deve estar no intervalo entre [0000] e [9959], criticando inclusive a segunda parte do número, que indica os minutos, que deve ser menor ou igual a 59.
                hrsTrabAntesAcid: t.string,
                /// Data do óbito.
                /// Validação: Deve ser uma data válida, igual ou posterior a {dtAcid}(./dtAcid) e igual ou anterior à data atual.
                /// Preenchimento obrigatório e exclusivo se {indCatObito}(./indCatObito) = [S].
                dtObito: tipos.date,
                /// Observação.
                obsCAT: tipos.TS_texto_999,
                /// Atestado médico.
                /// CONDICAO_GRUPO: OC
                atestado: t.intersection([
                    t.type({
                        /// Data do atendimento.
                        /// Validação: Deve ser uma data válida, igual ou anterior à data atual.
                        dtAtendimento: tipos.date,
                        /// Hora do atendimento, no formato HHMM.
                        /// Validação: Deve estar no intervalo entre [0000] e [2359], criticando inclusive a segunda parte do número, que indica os minutos, que deve ser menor ou igual a 59.
                        hrAtendimento: tipos.TS_hora,
                        /// Indicativo de internação.
                        indInternacao: tipos.TS_sim_nao,
                        /// Duração estimada do tratamento, em dias.
                        durTrat: t.number,
                        /// Indicativo de afastamento do trabalho durante o tratamento.
                        /// Validação: Se o campo {indCatObito}(../indCatObito) for igual a [S], o campo deve sempre ser preenchido com [N].
                        indAfast: tipos.TS_sim_nao,
                        /// Preencher com a descrição da natureza da lesão.
                        /// Validação: Deve ser um código válido e existente na Tabela 17.
                        dscLesao: t.string,
                        /// Informar o código da tabela de Classificação Internacional de Doenças - CID.
                        /// Validação: Deve ser preenchido com caracteres alfanuméricos, conforme opções constantes na tabela CID.
                        codCID: t.string,
                        /// Médico/Dentista que emitiu o atestado.
                        emitente: t.type({
                            /// Nome do médico/dentista que emitiu o atestado.
                            nmEmit: tipos.TS_nome,
                            /// Órgão de classe.
                            ideOC: t.union([
                                /// Conselho Regional de Medicina - CRM
                                t.literal(1),
                                /// Conselho Regional de Odontologia - CRO
                                t.literal(2),
                                /// Registro do Ministério da Saúde - RMS
                                t.literal(3)
                            ]),
                            /// Número de inscrição no órgão de classe.
                            nrOC: t.string,
                            /// Sigla da UF do órgão de classe.
                            ufOC: tipos.TS_uf
                        })
                    }),
                    t.partial({
                        /// Descrição complementar da lesão.
                        dscCompLesao: t.string,
                        /// Diagnóstico provável.
                        diagProvavel: tipos.TS_texto_100,
                        observacao: tipos.TS_observacao
                    })
                ]),
                /// CAT de origem
                /// DESCRICAO_COMPLETA:Grupo que indica a CAT anterior, no caso de CAT de reabertura ou de comunicação de óbito.
                /// CHAVE_GRUPO: {nrRecCatOrig}
                /// CONDICAO_GRUPO: O (se {tpCat}(../tpCat) for igual a [2, 3]); N (nos demais casos)
                catOrigem: t.type({
                    /// Informar o número do recibo da última CAT referente ao mesmo acidente/doença relacionada ao trabalho, nos casos:
                    /// a) de CAT de reabertura;
                    /// b) de óbito, quando houver CAT anterior.
                    /// Validação: Deve corresponder ao número do recibo do arquivo relativo à última CAT informada anteriormente, pertencente ao mesmo contrato, desde que {indCatObito}(../indCatObito) da última CAT informada seja igual a [N]. O sistema não efetuará a conferência da informação se {dtAcid}(../dtAcid) for anterior a {sucessaoVinc/dtTransf}(2200_vinculo_sucessaoVinc_dtTransf), {transfDom/dtTransf}(2200_vinculo_transfDom_dtTransf) ou {dtAltCPF}(2200_vinculo_mudancaCPF_dtAltCPF) do evento S-2200.
                    /// OBS.: Quando a data do acidente for anterior à data de obrigatoriedade do empregador ao envio deste evento, a CAT de reabertura e/ou de óbito não devem ser informadas ao eSocial, mantendo-se o procedimento realizado na emissão da CAT original.
                    nrRecCatOrig: tipos.TS_nrRecibo
                })
            })
        ])
    })
})

export type eSocial = t.TypeOf<typeof eSocial>
