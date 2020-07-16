import * as t from 'io-ts'

import * as ttalk from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for an employee's occupation history.
 */
export const FunctionalHistory = t.intersection([
    t.type({
        erpId: t.string,
        erpEmployee: t.string,
        occurrenceDate: datetime,
        erpCostCenter: t.string,
        erpOccupation: t.string
    }),
    t.partial({
        erpCompany: nullable(t.string),
        erpBranch: t.union([t.string, t.null, t.literal(false)]),
        costCenterDescription: nullable(t.string),
        erpDepartment: nullable(t.string),
        departmentDescription: nullable(t.string),
        occupationDescription: nullable(t.string),
        erpEmployeePosition: nullable(t.string),
        sefipCategory: nullable(t.string),
        created_at: nullable(datetime),
        updated_at: nullable(datetime)
    })
])
export type FunctionalHistory = t.TypeOf<typeof FunctionalHistory>

/**
 * Standard message converter.
 */
export const Converter = {
    fromTTalk(data: ttalk.FunctionalHistory): FunctionalHistory {
        return {
            erpId: data.id,
            erpEmployee: data.employee,
            occurrenceDate: data.occurrenceDate,
            erpCostCenter: data.costCenter,
            costCenterDescription: data.costCenterDescription,
            erpDepartment: data.department,
            departmentDescription: data.departmentDescription,
            erpOccupation: data.occupation,
            occupationDescription: data.occupationDescription,
            erpEmployeePosition: data.employeePosition,
            sefipCategory: data.sefipCategory
        }
    },
    toTTalk(data: FunctionalHistory): ttalk.FunctionalHistory {
        return {
            id: data.erpId,
            employee: data.erpEmployee,
            occurrenceDate: data.occurrenceDate,
            costCenter: data.erpCostCenter,
            costCenterDescription: data.costCenterDescription ?? undefined,
            department: data.erpDepartment ?? undefined,
            departmentDescription: data.departmentDescription ?? undefined,
            occupation: data.erpOccupation,
            occupationDescription: data.occupationDescription ?? undefined,
            employeePosition: data.erpEmployeePosition ?? undefined,
            sefipCategory: data.sefipCategory ?? undefined
        }
    }
}
