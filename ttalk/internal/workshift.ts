import * as t from 'io-ts'

import * as ttalk from '../'
import { datetime, nullable } from '../custom-types'

/**
 * Our internal model for cost centers.
 */
export const WorkingShifts = t.intersection([
    t.type({
        id: t.string,
        description: t.string
    }),
    t.partial({
        erpId: nullable(t.string),
        erpCompany: nullable(t.string),
        erpBranch: t.union([t.string, t.null, t.literal(false)]),
        productiveHours: nullable(t.number),
        created_at: nullable(datetime),
        updated_at: nullable(datetime)
    })
])
export type WorkingShifts = t.TypeOf<typeof WorkingShifts>

/**
 * Standard message converter.
 */
export const Converter = {
    fromTTalk(data: ttalk.WorkingShiftInfo): WorkingShifts {
        return {
            id: '',
            erpCompany: data.companyId.toString(),
            erpBranch: data.branchId || false,
            erpId: data.workShiftCode,
            description: data.name,
            productiveHours: data.monthlyWorkingHours
                // TODO: TOTVS gives us "hh:mm", properly convert that
                ? parseFloat(data.monthlyWorkingHours)
                : null
        }
    }
}
