import * as t from 'io-ts'
import { datetime } from '../../custom-types'
import { getHeader } from './Header'

const MESSAGE = 'STOCKTURNOVER'

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
    Header: getHeader(MESSAGE),
    Content: StockTurnOver
})
export const ListStockTurnOverInfo = t.type({
    Header: getHeader(MESSAGE),
    Content: t.array(StockTurnOver)
})

export type StockTurnOverInfo = t.TypeOf<typeof StockTurnOverInfo>
export type ListStockTurnOverInfo = t.TypeOf<typeof ListStockTurnOverInfo>