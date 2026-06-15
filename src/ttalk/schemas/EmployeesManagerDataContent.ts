// TOTVS RH — EmployeesManagerDataContent (líderes diretos dos subordinados).
// DRHHCM-15184 / DT "Integração RM X Afferolab - HIERARQUIA".
import * as t from 'io-ts'
import { nullable } from '../../custom-types'

export const EmployeesManagerInfo = t.intersection([
    t.type({
        /** Filial do empregado (PFUNC.CODFILIAL) */
        employeeBranch: t.string,
        /** Matrícula do empregado (PFUNC.CHAPA) */
        employeeCode: t.string
    }),
    t.partial({
        /** Filial do líder (PSECAO.CODFILIAL) */
        managerBranch: nullable(t.string),
        /** Matrícula do líder */
        managerCode: nullable(t.string),
        /** Indica se o líder é externo à estrutura */
        managerExternal: nullable(t.boolean)
    })
])
export type EmployeesManagerInfo = t.TypeOf<typeof EmployeesManagerInfo>
