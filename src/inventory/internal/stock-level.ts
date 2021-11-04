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
        const stockLevel: StockLevel[] = []

        Content.ListOfReturnItem.forEach(item => {
            const { ReturnItem } = item

            ReturnItem.ListOfWarehouseStock.forEach(warehouse => {
                const { WarehouseStock } = warehouse
                stockLevel.push({
                    id: '',
                    erpId: '',
                    erpItem: ReturnItem.ItemInternalId,
                    erpWarehouse: WarehouseStock.WarehouseInternalId,
                    amoutBooked: Number(
                        WarehouseStock.BookedStockAmount
                    ),
                    physicalBalance: Number(
                        WarehouseStock.ValueOfCurrentStockAmount
                    ),
                    erpBranch: Header.BranchId,
                    erpCompany: Header.CompanyId,
                    operation: Header.Event
                })
            })

        })

        return stockLevel
    }
}