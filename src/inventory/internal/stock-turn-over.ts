import * as t from 'io-ts'

import * as inventoryUM from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for Item.
 */
export const StockTurnOver = t.intersection([
    t.type({
        id: t.string,
        erpId: t.string,
        erpItem: t.string
    }),
    t.partial({
        erpCompany: nullable(t.string),
        erpBranch: t.union([t.string, t.null, t.literal(false)]),
        created_at: nullable(datetime),
        updated_at: nullable(datetime)
    })
])
export type StockTurnOver = t.TypeOf<typeof StockTurnOver>

export const Converter = {
    fromInventoryUM(data: inventoryUM.StockTurnOverInfo): Array<StockTurnOver> {
        const { Content } = data

        return Content.ListofStockTurnoverItem.map(item => ({
            id: '',
            erpId: Content.InternalId, 
            erpItem: item.ItemInternalId,
            erpBranch: Content.BranchId,
            erpCompany: Content.CompanyId
        }))
    }
}