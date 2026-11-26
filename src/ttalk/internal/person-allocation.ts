import * as t from 'io-ts'

import { date } from '../../custom-types'

/** A single codec instead of a union, so a decode error names the field. */
const nullableDate = new t.Type<string | null, string | null, unknown>(
    'Date | null',
    (u): u is string | null => u === null || date.is(u),
    (u, c) => (u === null ? t.success(null) : date.validate(u, c)),
    a => a
)

const mutableFields = {
    /** Section code: the `costCenter` of the employee message. */
    costCenter: t.string,
    /** Only used when the cost center has to be created. */
    costCenterDescription: t.string,
    /** 0 to 100, up to two decimal places. */
    percentage: t.number,
    startDate: date
}

const endDate = {
    /** Null or absent = still in force. Must be >= startDate. */
    endDate: nullableDate
}

/**
 * Allocation (rateio) of an employee to a section of a service taker, pushed
 * by the ERP. It belongs to the branch of the request.
 */
export const PersonAllocation = t.intersection([
    t.type({
        /** Record id in the ERP. Unique per branch. Immutable. */
        id: t.string,
        /** Employee id (TTalk Employee.id). Immutable. */
        employeeId: t.string,
        /** Service taker id in the ERP, same branch. Immutable. */
        serviceTakerId: t.string,
        ...mutableFields
    }),
    t.partial(endDate)
])
export type PersonAllocation = t.TypeOf<typeof PersonAllocation>

/**
 * Partial update: only the mutable fields; `id` comes from the route.
 */
export const PersonAllocationUpdate = t.intersection([
    t.type({
        id: t.string
    }),
    t.partial({
        ...mutableFields,
        ...endDate
    })
])
export type PersonAllocationUpdate = t.TypeOf<typeof PersonAllocationUpdate>

/**
 * Stored record as answered by the backend.
 */
export const PersonAllocationRecord = t.intersection([
    PersonAllocation,
    t.partial({
        /** True when the upsert inserted the record (POST answers 201). */
        created: t.boolean
    })
])
export type PersonAllocationRecord = t.TypeOf<typeof PersonAllocationRecord>
