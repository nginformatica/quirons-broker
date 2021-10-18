import * as t from 'io-ts'
import { datetime, nullable } from '../../custom-types'

const MESSAGE = 'STOCKTURNOVER'

export const Header = t.intersection([
    t.type({
        UUID: t.string,
        Type: t.string,
        Transaction: t.literal(MESSAGE),
        StandardVersion: t.string,
        SourceApplication: t.string,
        ProductName: t.string,
        ProductVersion: t.string,
        CompanyId: t.string,
        BranchId: t.string,
        GeneratedOn: datetime,
        DeliveryType: t.string,
        Event: t.union([t.literal('upsert'), t.literal('delete')])
    }),
    t.partial({
        SubType: nullable(t.string),
        Version: nullable(t.string),
        CompanySharingMode: nullable(t.string),
        BusinessUnitySharingMode: nullable(t.string),
        BranchSharingMode: nullable(t.string)
    })
])

const StockTurnOver = t.intersection([
    t.type({
        Code: t.string,
        InternalId: t.string,
        Number: t.string,
        Series: t.string,
        Type: t.string,
        CompanyId: t.string,
        BranchId: t.string,
        RegisterDateTime: datetime,
        ListofStockTurnoverItem: t.array(t.type({
            Code: t.string,
            InternalId: t.string,
            ItemInternalId: t.string,
            UnitPrice: t.number,
            TotalPrice: t.number,
            Quantity: t.number,
            UnitOfMeasureInternalId: t.string,
            WarehouseInternalId: t.string,
            RequestItemInternalId: t.string
        }))
    }),
    t.partial({
        CompanyInternalId: t.string,
        Observation: t.string
    })
])

export const StockTurnOverInfo = t.type({
    Header,
    Content: StockTurnOver
})
export const ListStockTurnOverInfo = t.type({
    Header,
    Content: t.array(StockTurnOver)
})

export type StockTurnOverInfo = t.TypeOf<typeof StockTurnOverInfo>
export type ListStockTurnOverInfo = t.TypeOf<typeof ListStockTurnOverInfo>