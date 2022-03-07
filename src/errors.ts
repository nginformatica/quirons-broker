import { Either } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'

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
    DECODED_ERROR: null
})

type ErrorCode = t.TypeOf<typeof ErrorCodeKey>

interface ErrorInfo {
    status: number
    detailedMessage: string
    message: string
}

const errorInfoWith = (payload = ''): Record<ErrorCode, ErrorInfo> => ({
    ENTITY_ALREADY_EXIST: {
        status: 400,
        detailedMessage: `Already exists an entity (${payload}) with the provided id`,
        message: `The provided entity already exists`
    },
    ENTITY_DOES_NOT_EXIST: {
        status: 404,
        detailedMessage: `Doesn't exist the entity (${payload}) with the specified id`,
        message: 'The provided entity doesn\'t exist'
    },
    BAD_REQUEST: {
        status: 400,
        detailedMessage: `It was returned the following message: "${payload}"`,
        message: 'An error has occurred in the request data processing.'
    },
    VALIDATION_ERROR: {
        status: 400,
        detailedMessage: `${payload || 'A Validation error has occurred, verify the body data format'}`,
        message: 'The provided body data has an invalid format.'
    },
    INTERNAL_SERVER_ERROR: {
        status: 500,
        message: 'An unexpected error has occurred in the request processing',
        detailedMessage: 'Unexpected error'
    },
    UNAUTHENTICATED: {
        status: 401,
        message: 'Unauthenticated',
        detailedMessage: 'You must provide the correct credentials and branchId to access this resource'
    },
    REQUIRED_BRANCH_ID: {
        status: 400,
        message: 'The branchId query parameter is required',
        detailedMessage: 'You must provide a branchId as query parameter (?branchId=...)'
    },
    REQUIRED_ID_PARAMETER: {
        status: 400,
        message: 'The id parameter is required',
        detailedMessage: 'The id parameter is required for the specified method'
    },
    DECODED_ERROR: {
        status: 400,
        message: 'Decoded error message',
        detailedMessage: 'The message sent is outside the established format'
    }
})

class APIError extends Error {

    readonly code: ErrorCode
    readonly statusCode: number
    readonly helpUrl: string
    readonly detailedMessage: string
    readonly usedPayload?: string

    constructor(errorCode: ErrorCode, payload = '') {
        const { status, message, detailedMessage } =
            errorInfoWith(payload)[errorCode]

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

    constructor(payload?: string) {
        super('VALIDATION_ERROR', payload)
    }

}

class APIBadRequestError extends APIError {

    constructor(payload?: string) {
        super('BAD_REQUEST', payload)
    }

}

const raiseErrorFromDecode = <T>(result: Either<t.Errors, T>) => {
    const errors = PathReporter.report(result)
    const attributes: string[] = []

    for (const error of errors) {
        // 'Invalid value undefined supplied to... /id: string'
        // It will match 'id' and 'string'
        const [, attribute, type] =
            error.match(/.+\/(.+): (.+)$/) || []

        if (!attribute && !type) {
            continue
        }

        attributes.push(`(${attribute}: ${type})`)
    }

    if (!attributes.length) {
        // Default message
        throw new APIValidationError()
    }

    const attributesDetails = attributes.join(', ')

    const s = attributes.length > 1 ? 's' : ''

    const message = `Invalid or missing value${s} for the attribute${s}: `
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
