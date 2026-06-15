import * as t from 'io-ts'
import * as ttalk from '../'
import { nullable } from '../../custom-types'

/**
 * Our internal model for the immediate-manager (superior imediato) relation.
 * Carries only the identity fields the backend needs to resolve employee and
 * manager by erpId; erpId composition (per ERP line) happens on the backend.
 */
export const EmployeesManager = t.intersection([
    t.type({
        employeeBranch: t.string,
        employeeCode: t.string
    }),
    t.partial({
        managerBranch: nullable(t.string),
        managerCode: nullable(t.string),
        managerExternal: nullable(t.boolean)
    })
])
export type EmployeesManager = t.TypeOf<typeof EmployeesManager>

/**
 * Standard message converter.
 */
export const Converter = {
    fromTTalk(data: ttalk.EmployeesManagerInfo): EmployeesManager {
        return {
            employeeBranch: data.employeeBranch,
            employeeCode: data.employeeCode,
            managerBranch: data.managerBranch,
            managerCode: data.managerCode,
            managerExternal: data.managerExternal
        }
    }
}
