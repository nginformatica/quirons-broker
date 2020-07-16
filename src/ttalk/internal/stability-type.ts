import * as t from 'io-ts'

import * as ttalk from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for cost centers.
 */
export const StabilityType = t.intersection([
    t.type({
        id: t.string,
        description: t.string
    }),
    t.partial({
        erpId: nullable(t.string),
        erpBranch: t.union([t.string, t.null, t.literal(false)]),
        erpCompany: nullable(t.string),
        created_at: nullable(datetime),
        updated_at: nullable(datetime)
    })
])
export type StabilityType = t.TypeOf<typeof StabilityType>

/**
 * Standard message converter.
 */
export const Converter = {
    fromTTalk(data: ttalk.StabilityTypeInfo): StabilityType {
        return {
            id: data.id || '',
            erpCompany: data.companyId.toString(),
            erpBranch: data.branchId || false,
            erpId: data.stabilityCode?.toString(),
            description: data.name
        }
    }
}
