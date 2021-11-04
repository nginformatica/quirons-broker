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
        updated_at: nullable(datetime),
        operation: t.union([t.literal('upsert'), t.literal('delete')])
    })
])
export type Warehouse = t.TypeOf<typeof Warehouse>

export const Converter = {
    fromInventoryUM(data: inventoryUM.WarehouseInfo): Warehouse {
        const { Header, Content } = data

        return {
            /** required */
            id: '',
            description: Content.Description,
            erpId: Content.InternalId,
            /** not required */
            erpCompany: Header.CompanyId,
            erpBranch: Header.BranchId,
            operation: Header.Event
        }
    }
}