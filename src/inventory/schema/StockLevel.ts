import * as t from 'io-ts'
import { getHeader } from './Header'

const MESSAGE = 'STOCKLEVEL'

const StockLevel = t.intersection([
    t.type({
        ItemInternalId: t.string,
        ListOfWarehouseStock: t.array(t.type({
            ValueOfCurrentStockAmount: t.number,
            CurrentStockAmount: t.number,
            AvailableStockAmout: t.number,
            UnitItemCost: t.number,
            WarehouseInternalId: t.string,
            AverageUnitItemCost: t.number,
            TransitStockAmount: t.number,
            BookedStockAmount: t.number,
            FutureStockAmount: t.number
        }))
    }),
    t.partial({
        BranchId: t.string,
        CompanyId: t.string,
        UnitItemCost: t.string,
        WarehouseInternalId: t.string,
        CompanyInternalId: t.string
    })
])

export const StockLevelInfo = t.type({
    Header: getHeader(MESSAGE),
    Content: StockLevel
})
export const ListStockLevelInfo = t.type({
    Header: getHeader(MESSAGE),
    Content: t.array(StockLevel)
})

export type StockLevelInfo = t.TypeOf<typeof StockLevelInfo>
export type ListStockLevelInfo = t.TypeOf<typeof ListStockLevelInfo>