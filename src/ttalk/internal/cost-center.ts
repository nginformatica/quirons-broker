import * as t from 'io-ts'

import * as ttalk from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for cost centers.
 */
export const PayRollCostCenter = t.intersection([
    t.type({
        id: t.string,
        description: t.string
    }),
    t.partial({
        class: nullable(t.string),
        costCenterCode: nullable(t.string),
        erpCompany: nullable(t.string),
        erpBranch: t.union([t.string, t.null, t.literal(false)]),
        companyId: nullable(t.string),
        branchId: t.union([t.string, t.null, t.literal(false)]),
        erpId: nullable(t.string),
        created_at: nullable(datetime),
        updated_at: nullable(datetime)
    })
])
export type PayRollCostCenter = t.TypeOf<typeof PayRollCostCenter>

/**
 * Standard message converter.
 */
export const Converter = {
    fromTTalk(data: ttalk.PayRollCostCenterInfo): PayRollCostCenter {
        return {
            id: data.id || '',
            erpCompany: data.companyId.toString(),
            erpBranch: data.branchId || false,
            erpId: data.code,
            description: data.name,
            costCenterCode: data.costCenterCode
        }
    }
}
