import { either } from 'fp-ts/lib/Either'
import * as t from 'io-ts'

/**
 * Validator for datetime expressions.
 * e.g: 2001-11-02T02:00:00.000Z
 */
export const datetime = new t.Type<Date, string>(
    'DateTime',
    (u): u is Date => u instanceof Date,
    (u, c) =>
        either.chain(t.string.validate(u, c), s => {
            const d = new Date(s)

            return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d)
        }),
    a => a.toISOString()
)

/**
 * Validator for date expressions.
 * e.g: 2001-11-02
 */
export const date = new t.Type<string, string>(
    'Date',
    // Type guard
    (u): u is string => /^\d{4}-\d{1,2}-\d{1,2}$/.test(u as string),
    // Validator: (input -> context) -> Either<Errors, string>
    (u, c) =>
        either.chain(t.string.validate(u, c), s => {
            const d = new Date(s)
            const isDateFormat = /^\d{4}-\d{1,2}-\d{1,2}$/.test(s)

            return !isDateFormat || isNaN(d.getTime())
                ? t.failure(u, c)
                : t.success(s)
        }),
    // Encoder: string -> string
    // Not good, it's a lib limitation, we don't validate the encode
    a => a
)

/**
 * Validator for time expressions.
 * e.g: 324:45
 */
export const time = new t.Type<string, string>(
    'Time',
    // Type guard
    (u): u is string => /^\d{1,}:\d{2}$/.test(u as string),
    // Validator: (input -> context) -> Either<Errors, string>
    (u, c) =>
        either.chain(t.string.validate(u, c), s => {
            const isDateFormat = /^\d{1,}:\d{2}$/.test(s)

            return !isDateFormat
                ? t.failure(u, c)
                : t.success(s)
        }),
    // Encoder: string -> string
    // Not good, it's a lib limitation, we don't validate the encode
    a => a
)

export const cbo = new t.Type<string, string>(
    'CBO',
    // Type guard
    (u): u is string => /(\d\d\d\d)-?(\d\.?\d)/.test(u as string),
    (u, c) => 
        either.chain(t.string.validate(u, c), s => {
            if (s.trim() === '') {
                return t.success(s)
            }

            const isValidCBO = /(\d\d\d\d)-?(\d\.?\d)/.test(s)
            return !isValidCBO
                ? t.failure(u, c, '(cbo: string)')
                : t.success(s)
        }),
    // Encoder: string -> string
    a => a
)

/**
 * Make a nullable type.
 */
export function nullable<T extends t.Any>(x: T) {
    return t.union([x, t.null])
}

/**
 * Given a union of io-ts object serializers, create a new serializer for the
 * union of a specific field.
 *
 * @param key A field that should be present in all objects.
 * @param objects Union of object serializers.
 */
export function pick<
    A extends t.Mixed,
    K extends string,
    T extends Array<t.InterfaceType<{ [key in K]: A }>>,
    R extends {
        [P in keyof T]: T[P] extends t.InterfaceType<{ [key in K]: A }>
            ? T[P]['props'][K]
            : never
    }
>(key: K, objects: t.UnionType<T>): MakeUnion<R> {
    // We use a cast here, but the return type checks the size already
    return t.union(objects.types.map(x =>
        x.props[key]) as any) as any
}

type MakeUnion<R> = R extends [t.Mixed, t.Mixed, ...t.Mixed[]]
    ? t.UnionC<R>
    : never
