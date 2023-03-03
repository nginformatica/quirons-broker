import * as t from 'io-ts'

import * as inventoryUM from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for Item.
 */
export const StockTurnOver = t.intersection([
    t.type({
        headerErpCompany: t.string,
        headerErpBranch: t.string,
        erpCompany: t.string,
        erpBranch: t.string,
        version: t.string,
        id: t.string,
        erpId: t.string,
        erpItemInternalId: t.string,
        erpItem: t.string,
        originMessageId: t.string,
        sentBy: t.string,
        quantity: t.number
    }),
    t.partial({
        created_at: nullable(datetime),
        updated_at: nullable(datetime),
        operation: t.union([
            t.literal('upsert'),
            t.literal('delete'),
            t.literal('Upsert'),
            t.literal('Delete'),
            t.literal('UPSERT'),
            t.literal('DELETE')
        ])
    })
])
export type StockTurnOver = t.TypeOf<typeof StockTurnOver>

export const Converter = {
    fromInventoryUM(data: inventoryUM.StockTurnOverInfo): Array<StockTurnOver> {
        const { Header, Content } = data
        const stockTurnOver: StockTurnOver[] = []
        
        Content.ListOfStockTurnoverItem.forEach(item => {
            stockTurnOver.push({
                headerErpCompany: Header.CompanyId,
                headerErpBranch: Header.BranchId,
                erpCompany: Content.CompanyId,
                erpBranch: Content.BranchId || '',
                version: Header.Version || '1.000',
                id: '',
                erpId: Content.InternalId, 
                erpItemInternalId: item.InternalId,
                erpItem: item.RequestItemInternalId,
                operation: Header.Event,
                originMessageId: Header.UUID,
                sentBy: Header.ProductName,
                quantity: item.Quantity
            })
        })

        return stockTurnOver
    }
}