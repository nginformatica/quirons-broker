import * as t from 'io-ts'

import * as inventoryUM from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for Item.
 */
export const StockTurnOver = t.intersection([
    t.type({
        erpCompany: t.string,
        erpBranch: t.string,
        version: t.string,
        id: t.string,
        erpId: t.string,
        erpItem: t.string,
        originMessageId: t.string,
        sentBy: t.string
    }),
    t.partial({
        created_at: nullable(datetime),
        updated_at: nullable(datetime),
        operation: t.union([t.literal('upsert'), t.literal('delete')])
    })
])
export type StockTurnOver = t.TypeOf<typeof StockTurnOver>

export const Converter = {
    fromInventoryUM(data: inventoryUM.StockTurnOverInfo): Array<StockTurnOver> {
        const { Header, Content } = data
        const stockTurnOver: StockTurnOver[] = []
        
        Content.ListOfStockTurnoverItem.forEach(item => {
            stockTurnOver.push({
                erpCompany: Content.CompanyId,
                erpBranch: Content.BranchId || '',
                version: Header.Version || '1.000',
                id: '',
                erpId: Content.InternalId, 
                erpItem: item.InternalId,
                operation: Header.Event,
                originMessageId: Header.UUID,
                sentBy: Header.ProductName,
            })
        })

        return stockTurnOver
    }
}