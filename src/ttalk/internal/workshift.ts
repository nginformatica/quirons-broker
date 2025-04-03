import * as t from 'io-ts'

import * as ttalk from '../'
import { datetime, nullable } from '../../custom-types'
import { parseTime } from '../../fns/time-converter'

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
        companyId: nullable(t.string),
        branchId: t.union([t.string, t.null, t.literal(false)]),
        productiveHours: nullable(t.number),
        created_at: nullable(datetime),
        updated_at: nullable(datetime),
        relaySchema: t.string
    })
])
export type WorkingShifts = t.TypeOf<typeof WorkingShifts>

/**
 * Standard message converter.
 */
export const Converter = {
    fromTTalk(data: ttalk.WorkingShiftInfo): WorkingShifts {
        return {
            id: data.id || '',
            erpCompany: data.companyId.toString(),
            erpBranch: data.branchId || false,
            erpId: data.workShiftCode,
            description: data.name,
            productiveHours: data.monthlyWorkingHours
                ? parseTime(String(data.monthlyWorkingHours))
                : null,
            relaySchema: data.relaySchema
        }
    }
}