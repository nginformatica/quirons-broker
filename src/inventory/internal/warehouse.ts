import * as t from 'io-ts'

import * as inventoryUM from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for Item.
 */
export const Warehouse = t.intersection([
    t.type({
        id: t.string,
        description: t.string,
        erpId: t.string
    }),
    t.partial({
        erpCompany: nullable(t.string),
        erpBranch: t.union([t.string, t.null, t.literal(false)]),
        created_at: nullable(datetime),
        updated_at: nullable(datetime)
    })
])
export type Warehouse = t.TypeOf<typeof Warehouse>

export const Converter = {
    fromTTalk(data: inventoryUM.WarehouseInfo): Warehouse {
        const { Content } = data

        return {
            /** required */
            id: '',
            description: Content.Description,
            erpId: Content.InternalId,
            /** not required */
            erpCompany: Content.CompanyId,
            erpBranch: Content.BranchId
        }
    }
}