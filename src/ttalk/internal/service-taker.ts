import * as t from 'io-ts'

import { nullable } from '../../custom-types'

const optionalFields = {
    tradeName: nullable(t.string),
    street: nullable(t.string),
    number: nullable(t.string),
    complement: nullable(t.string),
    neighborhood: nullable(t.string),
    city: nullable(t.string),
    state: nullable(t.string),
    zipCode: nullable(t.string),
    country: nullable(t.string)
}

/**
 * Service taker (tomador de serviço) pushed by the ERP. It belongs to the
 * branch of the request.
 */
export const ServiceTaker = t.intersection([
    t.type({
        /** Record id in the ERP. Unique per branch. Immutable. */
        id: t.string,
        /** CNPJ without mask, 14 characters. Immutable. */
        documentNumber: t.string,
        name: t.string
    }),
    t.partial(optionalFields)
])
export type ServiceTaker = t.TypeOf<typeof ServiceTaker>

/**
 * Partial update: only the mutable fields; `id` comes from the route.
 */
export const ServiceTakerUpdate = t.intersection([
    t.type({
        id: t.string
    }),
    t.partial({
        name: t.string,
        ...optionalFields
    })
])
export type ServiceTakerUpdate = t.TypeOf<typeof ServiceTakerUpdate>

/**
 * Stored record as answered by the backend.
 */
export const ServiceTakerRecord = t.intersection([
    ServiceTaker,
    t.type({
        isActive: t.boolean
    }),
    t.partial({
        /** True when the upsert inserted the record (POST answers 201). */
        created: t.boolean
    })
])
export type ServiceTakerRecord = t.TypeOf<typeof ServiceTakerRecord>
