import * as t from 'io-ts'
import { date, datetime, nullable } from '../../custom-types'

const MESSAGE = 'STOCKLEVEL'

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

export const HeaderReturn = t.intersection([
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
        DeliveryType: t.string
    }),
    t.partial({
        Event: t.union([t.literal('upsert'), t.literal('delete')]),
        SubType: nullable(t.string),
        Version: nullable(t.string),
        CompanySharingMode: nullable(t.string),
        BusinessUnitySharingMode: nullable(t.string),
        BranchSharingMode: nullable(t.string)
    })
])

const WarehouseStock = t.type({
    WarehouseInternalId: t.string,
    CurrentStockAmount: t.string,
    TransitStockAmount: t.string,
    FutureStockAmount: t.string,
    UnitItemCost: t.string,
    ValueOfCurrentStockAmount: t.string,
    AvailableStockAmount: t.string,
    BookedStockAmount: t.string,
    AverageUnitItemCost: t.string,
    SalesOrderQuantity: t.string,
    Amountcommittedstock: t.string
})

const ReturnItem = t.intersection([
    t.type({
        ItemInternalId: t.string,
        ListOfWarehouseStock: t.array(t.type({
            WarehouseStock: WarehouseStock
        }))
    }),
    t.partial({
        UnitItemCost: t.string,
        WarehouseInternalId: t.string        
    })
])

const StockLevel = t.intersection([
    t.type({
        ListOfReturnItem: t.array(t.type({
            ReturnItem: ReturnItem
        }))
    }),
    t.partial({
        CompanyId: t.string,
        BranchId: t.string,
        CompanyInternalId: t.string,
        Active: t.string,
        Entity: t.string,
        Event: t.union([t.literal('upsert'), t.literal('delete')])
    })
])
    

export const StockLevelReturn = t.type({
    Header: HeaderReturn,
    Content: t.type({
        ReturnContent: t.type({
            ListOfInternalID: t.array(t.type({
                Destination: t.string,
                Name: t.string,
                Origin: t.string
            }))
        }),
        ProcessingInformation: t.type({
            Status: t.string,
            ProcessedOn: t.union([datetime, date])
        }),
        ReceivedMessage: t.type({
            UUID: t.string,
            Event: t.union([t.literal('upsert'), t.literal('delete')]),
            SentBy: t.string
        })
    })
})

export const StockLevelError = t.type({
    Header: HeaderReturn,
    Content: t.type({
        ReturnContent: t.type({
            Error: t.string
        }),
        ProcessingInformation: t.type({
            Status: t.string,
            ProcessedOn: t.union([datetime, date]),
            Details: t.array(t.type({
                Code: t.string,
                Message: t.string,
                DetailedMessage: t.string,
                HelpUrl: t.string
            }))
        }),
        ReceivedMessage: t.type({
            UUID: t.string,
            Event: t.union([t.literal('upsert'), t.literal('delete')]),
            SentBy: t.string
        })
    })
})

export const StockLevelInfo = t.type({
    Header,
    Content: StockLevel
})
export const ListStockLevelInfo = t.type({
    Header,
    Content: t.array(StockLevel)
})

export type StockLevelReturn = t.TypeOf<typeof StockLevelReturn>
export type StockLevelError = t.TypeOf<typeof StockLevelError>
export type StockLevelInfo = t.TypeOf<typeof StockLevelInfo>
export type ListStockLevelInfo = t.TypeOf<typeof ListStockLevelInfo>