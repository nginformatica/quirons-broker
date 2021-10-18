import * as t from 'io-ts'

import * as inventoryUM from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for Item.
 */
export const StockLevel = t.intersection([
    t.type({
        id: t.string,
        erpItem: t.string,
        erpWarehouse: t.string,
        physicalBalance: t.number,
        amoutBooked: t.number,
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
export type StockLevel = t.TypeOf<typeof StockLevel>


export const Converter = {
    fromInventoryUM(data: inventoryUM.StockLevelInfo): Array<StockLevel> {
        const { Header, Content } = data

        return Content.ListOfWarehouseStock.map(item => ({
                id: '',
                erpId: '',
                erpItem: Content.ItemInternalId,
                erpWarehouse: item.WarehouseInternalId,
                amoutBooked: item.BookedStockAmount,
                physicalBalance: item.ValueOfCurrentStockAmount,
                erpBranch: Content.BranchId,
                erpCompany: Content.CompanyId,
                operation: Header.Event
            }))
    }
}