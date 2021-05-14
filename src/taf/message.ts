import * as t from 'io-ts'

/**
 * Our internal model for Message.
 */
export const PostMessage = t.type({
    verb: t.literal('post'),
    // Atributo raiz
    ticketCode: t.string,
    lote: t.array(
        t.intersection([
            t.type({
                // Código Identificador da filial do ERP emissor.
                sourceBranch: t.string,
                // Determina se o arquivo enviado em TAFMSG é .txt  (1)ou .Xml(2).
                messageType: t.union([t.literal('1'), t.literal('2')]),
                // Sequência do arquivo; A Mensagem em TAFMSG pode ser enviada em mais de 1 registro, para isso deve-se repetir as informações dos demais campos e alterar a sequencia de acordo com a ordem das informações enviadas.
                messageSequential: t.string,
                // Código do Evento
                registryType: t.union([t.literal('S-2210'), t.literal('S-2220'), t.literal('S-2240'), t.literal('S-3000')]),
                // Chave do Registro.
                registryKey: t.string,
                // Arquivo/Evento a ser integrado, a mensagem deve ser enviada com criptografia BASE64.
                integrationMessage: t.string,
            }),
            t.partial({
                // Data da Integração.
                integrationDate: t.string,
                // Hora da Integração.
                integrationTime: t.string,
                // Prioridade de processamento do registro.
                registryPriority: t.string,
                // Registro será considerado na fila de integração. '1' - Enable ou '0' - Disable.
                integrationQueue: t.union([t.literal('1'), t.literal('2')]),
                // Identificação do dono do XML a ser integrado
                erpowner: t.string,
                // Identificador com o TAFKEY do registro predecessor, caso exista algum registro que o preceda.
                registryPredecessor: t.string,
                // Identificador da Filial original do trabalhador a ser transferido.
                transferBranch: t.string,
                // Campo aberto na TAFST2, onde para os eventos S-1200 e S-1210, quando informado o conteúdo MV será utilizado a regra de gravação de eventos de múltiplos vínculos (gravação aberta).
                complement: t.string
            })
        ])
    )
})

export type PostMessage = t.TypeOf<typeof PostMessage>

export const PostResponseMessage = t.type({
    verb: t.literal('post'),
    // Atributo raiz
    ticketCode: t.string,
    // Array contendo os TAFKEY requisitados.
    registryKey: t.array(t.intersection([
        t.type({
            // Código do TAFKEY
            key: t.string,
            // Informa se o TAFKEY foi integrado ou não.
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
    // Código de erro que impediu a integração do lote
    coderr: t.number,
    // Descrição do erro que impossibilitou a integração do lote. 
    description: t.string,
    // Número de registros enviados no POST.
    keyAmount: t.number
})

export type PostResponseMessage = t.TypeOf<typeof PostResponseMessage>

export const GetMessage = t.type({
    verb: t.literal('get'),
    // Código do TAFTICKET, Obrigatório caso registryKey não seja informado.
    ticketCode: t.string,
    // Código do TAFKEY, Obrigatório caso ticketCode não seja informado.
    registryKey: t.string,
    // Numero do RecNo Inicial a ser considerado na consulta.
    startRecNo: t.number,
    // Modo de pesquisa, quando não informado o response retorna todos os TAFKEYs relacionados a busca, quando igual a 1 retorna a última ocorrência do TAFKEY, quando igual a 2 retorna a última ocorrência válida do TAFKEY. Este parâmetro é útil quando o mesmo TAFKEY é enviado em vários TAFTICKET diferentes.
    searchMode: t.union([t.literal('1'), t.literal('2')]),
    // Código Identificador da filial do ERP emissor - *Não há uma validação de obrigatoriedade no retorno da requisição por conta do legado.
    sourceBranch: t.string,
    // Determina se o método deve retornar os erros dos registros com statusCode igual a 3 (Erros retornados pelo RET e gravados no TSS), o retorno será atribuído no grupo streamingErrors. Quando a tag não é informada os erros são retornados por Default. Valores validos: 0 - Desabilita, 1 - Habilita.
    queryElements: t.union([t.literal('0'), t.literal('1')]),
    // Limita a quantidade de registros a serem retornados na requisição. O tamanho da mensagem não poderá ultrapassar 850Kb, caso isto aconteça será realizado um retorno contendo os registros que já foram incrementados na resposta.
    lotQuantity: t.number 
})

export type GetMessage = t.TypeOf<typeof GetMessage>

export const GetResponseMessage = t.type({
    verb: t.literal('get'),
    // Determina o agrupamento do retorno que pode ser por ticketCode (TAFTICKET) ou registryKey (TAFKEY), o agrupamento depende dos parâmetros enviados no request, quando o registryKey é informado e o ticketCode omitido, o  retorno será por registryKey caso contrário por ticketCode.
    type: t.string,
    // Código do registro indicado no atributo type.
    code: t.string,
    // Itens do response.
    items: t.array(t.intersection([
        t.type({
            // informa que o envio do registro pelo método POST  foi realizado com sucesso.
            success: t.boolean,
            // Informa se o registro foi processado (Job2) e integrado com sucesso no seu respectivo cadastro.
            proccessed: t.boolean,
            // Descrição do status atual do registro.
            description: t.string,
        }),
        t.partial({
            // código do TAFKEY, esse atributo somente é exibido quando type for igual a ticketCode.
            registryKey: t.string,
            // código do TAFTICKET, esse atributo somente é exibido quando type for igual a registryKey.,
            ticketCode: t.string,
            // Código do erro contido no campo TAFCODERR na tabela TAFXERP, atributo exibido somente quando proccessed for igual a false.,
            errorCode: t.string,
            // Descrição do errorCode, atributo exibido somente quando proccessed for igual a false.
            errorDescription: t.string,
            // Detalhes do erro, alguns tipos de erros possuem detalhes e são armazenados no campo TAFERR na tabela TAFXERP, atributo exibido somente quando proccessed for igual a false.tion,
            errorDetail: t.string,
            // Status do registro no TAF, atributo exibido somente quando proccessed for igual a true.,
            statusCode: t.string,
            // Descrição do status no TAF, atributo exibido somente quando proccessed for igual a true.
            statusDescription: t.string,
            // Informa se o registro está ativo no TAF, atributo exibido somente quando proccessed for igual a true.escription,
            active: t.boolean,
            // Recibo de autorização do registro no governo.
            receiptNumber: t.string,
            // Retornar a prioridade definida para o registro, atributo exibido somente quando proccessed for igual a false.
            registryPriority: t.string,
            // Retorna o status de fila do registro. Retorna branco quando o registro não foi definido para integração utilizando fila de processamento (atributo integrationQueue do método POST), retorna 'F' quando o registro foi retornado para a fila de processamento ou 'R' quando o erro da integração é impeditivo e o registro foi rejeitado pelo TAF. Atributo exibido somente quando proccessed for igual a false.
            integrationQueue: t.string,
            // Agrupa todos os erros de transmissão retornados do Governo para o TAF. Os erros são listados por streamingErrorCode e streamingErrorDetail.
            streamingErrors: t.array(t.partial({
                // Código do erro retornado pelo Governo para o TAF, após transmissão do registro.
                streamingErrorCode: t.string,
                // Descrição do erro retornado pelo Governo para o TAF, após transmissão do registro.
                streamingErrorDetail: t.string
            }))
        })
    ])),
    // Numero do RecNo do ultimo registro retornado na requisição.nQueue,
    lastRecNo: t.number,
    // Informa o numero do RecNo do ultimo registro relacionado a consulta, deve ser utilizado juntamente com o lastRecNo para controlar a paginação e garantir o retorno de todos os registros.,
    maxRecNo: t.number
})

export type GetResponseMessage = t.TypeOf<typeof GetResponseMessage>

export const DeleteMessage = t.type({
    verb: t.literal('delete'),
    deleteTicket: t.array(t.type({
        ticketCode: t.string
    }))
})

export type DeleteMessage = t.TypeOf<typeof DeleteMessage>

export const DeleteResponseMessage = t.type({
    verb: t.literal('delete'),
    sucess: t.boolean
})

export type DeleteResponseMessage = t.TypeOf<typeof DeleteResponseMessage>
