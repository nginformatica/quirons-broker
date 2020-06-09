import * as t from 'io-ts'

import * as ttalk from '../'
import { datetime, nullable } from '../custom-types'

/**
 * Our internal model for cost centers.
 */
export const LeaveOfAbsenceType = t.intersection([
    t.type({
        id: t.string,
        description: t.string
    }),
    t.partial({
        erpId: nullable(t.string),
        erpBranch: t.union([t.string, t.null, t.literal(false)]),
        erpCompany: nullable(t.string),
        eSocialCode: nullable(t.string),
        created_at: nullable(datetime),
        updated_at: nullable(datetime)
    })
])
export type LeaveOfAbsenceType = t.TypeOf<typeof LeaveOfAbsenceType>

/**
 * Standard message converter.
 */
export const Converter = {
    fromTTalk(data: ttalk.LeaveOfAbsenceTypeInfo): LeaveOfAbsenceType {
        return {
            id: data.id || '',
            erpCompany: data.companyId.toString(),
            erpBranch: data.branchId || false,
            erpId: data.leaveOfAbsenceCode,
            description: data.name,
            eSocialCode: data.esocialLeaveCode
        }
    }
}
