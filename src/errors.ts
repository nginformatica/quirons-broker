import { Either } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'

export const Language = t.union([
    t.literal('en-US'),
    t.literal('pt-BR')
])
export type Language = t.TypeOf<typeof Language>

// Recomendation of io-ts docs to create an union of literal strings
const ErrorCodeKey = t.keyof({
    ENTITY_ALREADY_EXIST: null,
    ENTITY_DOES_NOT_EXIST: null,
    VALIDATION_ERROR: null,
    INTERNAL_SERVER_ERROR: null,
    UNAUTHENTICATED: null,
    REQUIRED_BRANCH_ID: null,
    REQUIRED_ID_PARAMETER: null,
    BAD_REQUEST: null,
    DECODED_ERROR: null,
    TOO_MANY_REQUESTS: null
})

type ErrorCode = t.TypeOf<typeof ErrorCodeKey>

interface ErrorInfo {
    status: number
    detailedMessage: string
    message: string
}

const englishMessages: Record<ErrorCode, string> = {
    ENTITY_ALREADY_EXIST: `The provided entity already exists`,
    ENTITY_DOES_NOT_EXIST: 'The provided entity doesn\'t exist',
    BAD_REQUEST: 'An error has occurred in the request data processing.',
    VALIDATION_ERROR: 'The provided body data has an invalid format.',
    INTERNAL_SERVER_ERROR: 'Unexpected error',
    UNAUTHENTICATED: 'You must provide the correct credentials and branchId to access this resource',
    REQUIRED_BRANCH_ID: 'You must provide a branchId as query parameter (?branchId=...)',
    REQUIRED_ID_PARAMETER: 'The id parameter is required for the specified method',
    DECODED_ERROR: 'The message sent is outside the established format',
    TOO_MANY_REQUESTS: 'You have exceeded the request limits, please wait and try again later.'
}

const brazilianPortugueseMessages: Record<ErrorCode, string> = {
    ENTITY_ALREADY_EXIST: `A entidade fornecida já existe`,
    ENTITY_DOES_NOT_EXIST: 'A entidade fornecida não existe',
    BAD_REQUEST: 'Ocorreu um erro ao processar as informações da requisição.',
    VALIDATION_ERROR: 'As informações do corpo da mensagem possuem um formato inválido.',
    INTERNAL_SERVER_ERROR: 'Erro inesperado.',
    UNAUTHENTICATED: 'Você deve informar as credenciais corretas de acesso (usuário e senha) e possuir acesso a filial desejada',
    REQUIRED_BRANCH_ID: 'Você deve informar o branchId como parâmetro de busca (?branchId=...)',
    REQUIRED_ID_PARAMETER: 'O id é um parâmetro obrigatório neste método específico',
    DECODED_ERROR: 'A mensagem enviada está fora dos padrões estabelecidos',
    TOO_MANY_REQUESTS: 'Você excedeu o limite de requisições, por favor aguarde e tente novamente mais tarde.'
}

const getMessage = (language: Language) => {
    if (language === 'pt-BR') {
        return brazilianPortugueseMessages
    }

    return englishMessages
}
const getDetailedMessage = (payload: string, language: Language) => {
    const englisDetailedhMessages: Record<ErrorCode, string> = {
        ENTITY_ALREADY_EXIST:  `Already exists an entity (${payload}) with the provided id`,
        ENTITY_DOES_NOT_EXIST:  `Doesn't exist the entity (${payload}) with the specified id`,
        BAD_REQUEST:  `It was returned the following message: "${payload}"`,
        VALIDATION_ERROR:  `${payload || 'A Validation error has occurred, verify the body data format'}`,
        INTERNAL_SERVER_ERROR:  englishMessages['INTERNAL_SERVER_ERROR'],
        UNAUTHENTICATED:  englishMessages['UNAUTHENTICATED'],
        REQUIRED_BRANCH_ID:  englishMessages['REQUIRED_BRANCH_ID'],
        REQUIRED_ID_PARAMETER:  englishMessages['REQUIRED_ID_PARAMETER'],
        DECODED_ERROR:  englishMessages['DECODED_ERROR'],
        TOO_MANY_REQUESTS:  englishMessages['TOO_MANY_REQUESTS']
    }
    
    const brazilianPortugueseDetailedMessages: Record<ErrorCode, string> = {
        ENTITY_ALREADY_EXIST:  `Já existe uma entidade (${payload}) com o id informado`,
        ENTITY_DOES_NOT_EXIST:  `Não existe a entidade (${payload}) com o id informado`,
        BAD_REQUEST:  `Foi retornada a seguinte mensagem: "${payload}"`,
        VALIDATION_ERROR:  `${payload || 'Ocorreu um erro de validação, verifique o formato das informações do corpo da mensagem'}`,
        INTERNAL_SERVER_ERROR: brazilianPortugueseMessages['INTERNAL_SERVER_ERROR'],
        UNAUTHENTICATED: brazilianPortugueseMessages['UNAUTHENTICATED'],
        REQUIRED_BRANCH_ID: brazilianPortugueseMessages['REQUIRED_BRANCH_ID'],
        REQUIRED_ID_PARAMETER: brazilianPortugueseMessages['REQUIRED_ID_PARAMETER'],
        DECODED_ERROR: brazilianPortugueseMessages['DECODED_ERROR'],
        TOO_MANY_REQUESTS: brazilianPortugueseMessages['TOO_MANY_REQUESTS']
    }

    if (language === 'pt-BR') {
        return brazilianPortugueseDetailedMessages
    }

    return englisDetailedhMessages
}

const errorInfoWith = (payload = '', language: Language = 'en-US'): Record<ErrorCode, ErrorInfo> => ({
    ENTITY_ALREADY_EXIST: {
        status: 400,
        message: getMessage(language)['ENTITY_ALREADY_EXIST'],
        detailedMessage: getDetailedMessage(payload, language)['ENTITY_ALREADY_EXIST']
    },
    ENTITY_DOES_NOT_EXIST: {
        status: 404,
        message: getMessage(language)['ENTITY_DOES_NOT_EXIST'],
        detailedMessage: getDetailedMessage(payload, language)['ENTITY_DOES_NOT_EXIST']
    },
    BAD_REQUEST: {
        status: 400,
        message: getMessage(language)['BAD_REQUEST'],
        detailedMessage: getDetailedMessage(payload, language)['BAD_REQUEST']
    },
    VALIDATION_ERROR: {
        status: 400,
        message: getMessage(language)['VALIDATION_ERROR'],
        detailedMessage: getDetailedMessage(payload, language)['VALIDATION_ERROR']
    },
    INTERNAL_SERVER_ERROR: {
        status: 500,
        message: getMessage(language)['INTERNAL_SERVER_ERROR'],
        detailedMessage: getDetailedMessage(payload, language)['INTERNAL_SERVER_ERROR']
    },
    UNAUTHENTICATED: {
        status: 401,
        message: getMessage(language)['UNAUTHENTICATED'],
        detailedMessage: getDetailedMessage(payload, language)['UNAUTHENTICATED']
    },
    REQUIRED_BRANCH_ID: {
        status: 400,
        message: getMessage(language)['REQUIRED_BRANCH_ID'],
        detailedMessage: getDetailedMessage(payload, language)['REQUIRED_BRANCH_ID']
    },
    REQUIRED_ID_PARAMETER: {
        status: 400,
        message: getMessage(language)['REQUIRED_ID_PARAMETER'],
        detailedMessage: getDetailedMessage(payload, language)['REQUIRED_ID_PARAMETER']
    },
    DECODED_ERROR: {
        status: 400,
        message: getMessage(language)['DECODED_ERROR'],
        detailedMessage: getDetailedMessage(payload, language)['DECODED_ERROR']
    },
    TOO_MANY_REQUESTS: {
        status: 429,
        message: getMessage(language)['TOO_MANY_REQUESTS'],
        detailedMessage: getDetailedMessage(payload, language)['TOO_MANY_REQUESTS']
    }
})

class APIError extends Error {

    readonly code: ErrorCode
    readonly statusCode: number
    readonly helpUrl: string
    readonly detailedMessage: string
    readonly usedPayload?: string

    constructor(errorCode: ErrorCode, payload = '', language: Language = 'en-US') {
        const { status, message, detailedMessage } =
            errorInfoWith(payload, language)[errorCode]

        super(message)
        this.code = errorCode
        this.detailedMessage = detailedMessage
        this.statusCode = status
        this.usedPayload = payload
        // TODO: change this when create the errors doc
        this.helpUrl = 'https://app.swaggerhub.com/apis/jacksjm/quirons/1.0.0'

        // Recomendation for Built-ins, see the TypeScript Wiki
        // tslint:disable-next-line: max-line-length
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md
        Object.setPrototypeOf(this, APIError.prototype)
    }

}

class APIValidationError extends APIError {

    constructor(payload?: string, language: Language = 'en-US') {
        super('VALIDATION_ERROR', payload, language)
    }

}

class APIBadRequestError extends APIError {

    constructor(payload?: string, language: Language = 'en-US') {
        super('BAD_REQUEST', payload, language)
    }

}

const raiseErrorFromDecode = <T>(
    result: Either<t.Errors, T>,
    language: Language = 'en-US'
) => {
    const errors = PathReporter.report(result)
    const left = result._tag === 'Left' ? result.left : []
    const attributes: string[] = []

    
    for (let index = 0; index < errors.length; index++) {
        const error = errors[index]
        const message = left.length >= index ? left[index].message : undefined
        const value = left.length >= index ? left[index].value : undefined
        // 'Invalid value undefined supplied to... /id: string'
        // It will match 'id' and 'string'

        if (message) {
            attributes.push(
                value
                    ? `${message} - ${value}`
                    : message
            )
        } else {
            const [, attribute, type] =
                error.match(/.+\/(.+): (.+)$/) || []
    
            if (
                (!attribute && !type) 
                || attribute === 'null' || type === 'null'
                || attribute === 'undefined' || type === 'undefined'
            ) {
                continue
            }
    
            attributes.push(
                value
                    ? `(${attribute}: ${type}) - ${value}`
                    : `(${attribute}: ${type})`
            )
        }
    }

    if (!attributes.length) {
        // Default message
        throw new APIValidationError()
    }

    const attributesDetails = attributes.join(', ')

    const s = attributes.length > 1 ? 's' : ''
    const es = attributes.length > 1 ? 'es' : ''

    const message = language == 'pt-BR' 
        ? `Valor${es} inválido${s} ou faltante${s} para o${s} atributo${s}:`
        + `${attributesDetails}`
        : `Invalid or missing value${s} for the attribute${s}: `
        + `${attributesDetails}`

    throw new APIValidationError(message)
}

export {
    APIError,
    APIValidationError,
    APIBadRequestError,
    ErrorCode,
    ErrorCodeKey,
    raiseErrorFromDecode
}
