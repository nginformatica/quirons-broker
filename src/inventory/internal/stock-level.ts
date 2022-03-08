import * as t from 'io-ts'

import * as inventoryUM from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for Item.
 */
export const StockLevel = t.intersection([
    t.type({
        erpCompany: t.string,
        erpBranch: t.string,
        version: t.string,
        id: t.string,
        erpItem: t.string,
        erpWarehouse: t.string,
        physicalBalance: t.number,
        amoutBooked: t.number,
        erpId: t.string,
        originMessageId: t.string,
        sentBy: t.string
    }),
    t.partial({
        isActive: t.boolean,
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
                    erpCompany: Header.CompanyId,
                    erpBranch: Header.BranchId,
                    version: Header.Version || '1.000',
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
                    operation: Header.Event,
                    originMessageId: Header.UUID,
                    sentBy: Header.ProductName,
                    isActive: typeof Content.Active == 'string'
                        ? Content.Active == 'true'
                        : Content.Active
                })
            })

        })

        return stockLevel
    }
}