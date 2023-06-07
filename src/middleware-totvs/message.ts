import * as t from 'io-ts'

/**
 * Our internal model for Message.
 */
export const PostMessage = t.type({
    // Atributo raiz
    ticketCode: t.string,
    // Código Identificador da entidade TSS (retornado na configuração do certificado)
    sourceBranch: t.string,
    // Tipo do Ambiente
    tpAmb: t.string,
    // URL serviço do TSS
    urlTSS: t.string,
    // Estrutura dos itens
    lote: t.array(
        t.type({
            // Código do Evento
            registryType: t.union([t.literal('S-2210'), t.literal('S-2220'), t.literal('S-2240'), t.literal('S-3000')]),
            // Chave do Registro.
            registryKey: t.string,
            // Arquivo/Evento a ser integrado, a mensagem deve ser enviada com criptografia BASE64.
            integrationMessage: t.string,
            // XX_XX_XX
            schemaVersion: t.string
        })
    )
})

export type PostMessage = t.TypeOf<typeof PostMessage>

export const PostResponseMessage = t.type({
    // Atributo raiz
    ticketCode: t.string,
    // Array contendo os TAFKEY requisitados.
    registryKey: t.array(t.intersection([
        t.type({
            // Código do Registro
            key: t.string,
            // Informa se o registro foi integrado com sucesso. (entrou no TSS)
            success: t.boolean
        }),
        t.partial({
            // Array contendo os erros que impediram a integração do registro. Atributo gerado somente quando success for igual a false.
            error: t.array(t.type({
                // Código do erro que impossibilitou a integração.
                coderr: t.string,
                // Descrição do erro que impossibilitou a integração. 
                description: t.string
            }))
        })
    ])),
    // Número de registros enviados no POST.
    keyAmount: t.union([t.number, t.string])
})

export type PostResponseMessage = t.TypeOf<typeof PostResponseMessage>

export const GetMessage = t.type({
    // Código Identificador da entidade TSS (retornado na configuração do certificado)
    sourceBranch: t.string,
    // Tipo do Ambiente
    tpAmb: t.string,
    // URL serviço do TSS
    urlTSS: t.string,
    // Estrutura dos itens (1-50)
    lote: t.array(t.type({
        // Código do Evento
        registryType: t.union([t.literal('S-2210'), t.literal('S-2220'), t.literal('S-2240'), t.literal('S-3000')]),
        // Código do TAFTICKET, Obrigatório caso registryKey não seja informado.
        ticketCode: t.string,
        // Código do TAFKEY, Obrigatório caso ticketCode não seja informado.
        registryKey: t.string,
        // Define se deverá ser retornado o XML de retorno do RET
        returnRetResponse: t.boolean
    }))
})

export type GetMessage = t.TypeOf<typeof GetMessage>

export const GetResponseMessage = t.type({
    // Itens do response.
    items: t.array(t.intersection([
        t.type({
            // Informa que o envio do registro pelo método POST  foi realizado com sucesso.
            success: t.boolean,
            // Informa se o registro foi processado (Job2) e integrado com sucesso no seu respectivo cadastro.
            processed: t.boolean,
            // Código do Evento
            registryType: t.string,
        }),
        t.partial({
            // código do TAFKEY, esse atributo somente é exibido quando type for igual a ticketCode.
            registryKey: t.string,
            // código do TAFTICKET, esse atributo somente é exibido quando type for igual a registryKey.,
            ticketCode: t.string,
            // Status do registro no TAF, atributo exibido somente quando proccessed for igual a true.,
            statusCode: t.string,
            // Descrição do status no TAF, atributo exibido somente quando proccessed for igual a true.
            statusDescription: t.string,
            // Agrupa todos os erros de transmissão retornados do Governo para o TAF. Os erros são listados por streamingErrorCode e streamingErrorDetail.
            streamingErrors: t.array(t.partial({
                // Código do erro retornado pelo Governo para o TAF, após transmissão do registro.
                streamingErrorCode: t.string,
                // Descrição do erro retornado pelo Governo para o TAF, após transmissão do registro.
                streamingErrorDetail: t.string
            })),
            // Recibo de autorização do registro no governo.
            receiptNumber: t.string,
            // Retorno resposta do governo quando o parâmetro returnRetResponse na solicitação for = true (ex.: totalizadores) 
            xmlRetResponse: t.string
        })
    ]))
})

export type GetResponseMessage = t.TypeOf<typeof GetResponseMessage>

export const GetCompanyMessage = t.intersection([
    t.type({
        // Tipo de Inscrição (1 – CNPJ , 2 – CPF)
        registrationType: t.string,
        // Número da inscrição.
        // Se registrationType for 1, então deverá ser enviado o CNPJ
        // Se registrationType for 2, então deverá ser enviado o CPF
        registrationNumber: t.string,
        // Sigla da Unidade Federativa
        uf: t.string,
        // Nome da Pessoa/ Razão Social da Companhia
        companyName: t.string,
        // Código do município conforme tabela do IBGE
        countyCode: t.string,
        // URL do TSS (TOTVS Service SOA)
        url: t.string
    }),
    t.partial({
        // Inscrição Estadual 
        ie: t.string,
        // Nome Fantasia
        branchName: t.string,
        // Número de Inscrição do Transmissor.
        grantNumber: t.string
    })
])

export type GetCompanyMessage = t.TypeOf<typeof GetCompanyMessage>

export const GetCompanyResponseMessage = t.type({
    // ID do registro de empresa do TSS
    idCompany: t.string,
    // Mensagem de retorno da solicitação
    returnMessage: t.string
})

export type GetCompanyResponseMessage = t.TypeOf<typeof GetCompanyResponseMessage>
