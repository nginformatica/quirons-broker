import { either } from 'fp-ts/lib/Either'
import * as t from 'io-ts'

import { datetime } from '../../custom-types'

/**
 * ERPs send "" for an absence with no end (INSS leave still open) as often
 * as null; both decode to null.
 */
const blankAsNull = <A, O>(codec: t.Type<A, O, unknown>) =>
    new t.Type<A | null, O | null, unknown>(
        `${codec.name} | blank`,
        (u): u is A | null => u === null || codec.is(u),
        (u, c) =>
            // undefined stays undefined so t.partial leaves the key out
            u === undefined
                ? t.success(undefined as unknown as A | null)
                : u === null || (typeof u === 'string' && u.trim() === '')
                ? t.success(null)
                : either.map(codec.validate(u, c), (a: A): A | null => a),
        a => (a === null ? null : codec.encode(a))
    )

const optionalDatetime = blankAsNull(datetime)
const optionalText = blankAsNull(t.string)

/**
 * Absence (vacation / leave) history pushed by the ERP. The ERP owns the
 * record: the backend only stores and displays it, and never derives eSocial
 * events from it.
 */
export const EmployeeAbsence = t.intersection([
    t.type({
        /** Record id in the ERP. Unique per company + branch. Immutable. */
        id: t.string,
        companyId: t.string,
        branchId: t.string,
        /** Employee id (TTalk Employee.id) or registration number. Immutable. */
        employeeId: t.string,
        startDate: datetime,
        /** Free text, up to 50 characters. */
        type: t.string,
        /** Free text, up to 255 characters. */
        reason: t.string,
        /** Days. Integer > 0. */
        amount: t.number
    }),
    t.partial({
        /** Null (or blank) = still open. Must be >= startDate. */
        endDate: optionalDatetime,
        /** ICD code. Sensitive health data: never logged. */
        icdCode: optionalText
    })
])
export type EmployeeAbsence = t.TypeOf<typeof EmployeeAbsence>

/**
 * Partial update: only the mutable fields; `id` comes from the route.
 */
export const EmployeeAbsenceUpdate = t.intersection([
    t.type({
        id: t.string
    }),
    t.partial({
        startDate: datetime,
        endDate: optionalDatetime,
        type: t.string,
        reason: t.string,
        amount: t.number,
        icdCode: optionalText
    })
])
export type EmployeeAbsenceUpdate = t.TypeOf<typeof EmployeeAbsenceUpdate>

/**
 * Stored record as answered by the backend.
 */
export const EmployeeAbsenceRecord = t.intersection([
    EmployeeAbsence,
    t.type({
        source: t.string,
        createdAt: datetime,
        updatedAt: datetime
    }),
    t.partial({
        /** True when the upsert inserted the record (POST answers 201). */
        created: t.boolean
    })
])
export type EmployeeAbsenceRecord = t.TypeOf<typeof EmployeeAbsenceRecord>

export const EmployeeAbsencePage = t.type({
    items: t.array(EmployeeAbsenceRecord),
    page: t.number,
    pageSize: t.number,
    total: t.number,
    hasNext: t.boolean
})
export type EmployeeAbsencePage = t.TypeOf<typeof EmployeeAbsencePage>
