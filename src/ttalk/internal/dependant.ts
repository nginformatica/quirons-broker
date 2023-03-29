import * as t from 'io-ts'

import * as ttalk from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for employees' dependants.
 */
export const Dependant = t.intersection([
    t.type({
        erpEmployee: t.string,
        erpId: t.string,
        name: t.string,
        birth: datetime,
        gender: t.number,
        cpf: t.string
    }),
    t.partial({
        erpCompany: nullable(t.string),
        erpBranch: t.union([t.string, t.null, t.literal(false)]),
        companyId: nullable(t.string),
        branchId: t.union([t.string, t.null, t.literal(false)]),
        rg: nullable(t.string),
        created_at: nullable(datetime),
        updated_at: nullable(datetime)
    })
])
export type Dependant = t.TypeOf<typeof Dependant>

/**
 * Standard message converter.
 */
export const Converter = {
    fromTTalk(data: ttalk.Dependant): Dependant {
        return {
            erpId: data.id,
            erpEmployee: data.employee,
            name: data.name,
            birth: data.birth,
            gender: data.gender,
            rg: data.rg,
            cpf: data.cpf
        }
    },
    toTTalk(data: Dependant): ttalk.Dependant {
        return {
            id: data.erpId,
            employee: data.erpEmployee,
            name: data.name,
            birth: data.birth,
            gender: data.gender,
            rg: data.rg ?? undefined,
            cpf: data.cpf
        }
    }
}
