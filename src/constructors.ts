import * as t from 'io-ts'

export const Identification = t.type({
    /** The userId used in the backend. */
    userId: t.string,
    /** The branch the user is currently using. */
    branchId: t.string
})
export type Identification = t.TypeOf<typeof Identification>

// Recomendation for enums, io-ts
export const Method = t.keyof({
  get: null,
  post: null,
  put: null,
  delete: null
})
export type Method = t.TypeOf<typeof Method>


// Type for a meta message (without identification)
export function metaMessage<N extends string, T extends t.Mixed>(kind: N, content: T) {
    return t.type({
        kind: t.literal(kind),
        content
    })
}

// Type for a user message (with identification)
export function userMessage<N extends string, T extends t.Mixed>(kind: N, content: T) {
    return t.type({
        kind: t.literal(kind),
        identification: Identification,
        content
    })
}

export function senderMessage<N extends string, T extends t.Mixed>(kind: N, data: T) {
    return t.type({
        kind: t.literal(kind),
        verb: Method,
        data
    })
}
