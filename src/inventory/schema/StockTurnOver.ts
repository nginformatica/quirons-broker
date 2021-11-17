import * as t from 'io-ts'
import { date, datetime, nullable } from '../../custom-types'

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

const StockTurnoverItem = t.intersection([
    t.type({
        InternalId: t.string,
        ItemInternalId: t.string,
        UnitPrice: t.number,
        TotalPrice: t.number,
        Quantity: t.number,
        UnitOfMeasureInternalId: t.string,
        WarehouseInternalId: t.string,
        RequestItemInternalId: t.string
    }),
    t.partial({
        Code: t.string,
    })
])

const StockTurnOver = t.intersection([
    t.type({
        InternalId: t.string,
        CompanyId: t.string,
        BranchId: t.string,
        MovementTypeCode: t.union([t.literal('399'), t.literal('599')]),
        RegisterDateTime: t.union([datetime, date]),
        ListofStockTurnoverItem: t.array(t.type({
            StockTurnoverItem: StockTurnoverItem
        }))
    }),
    t.partial({
        Code: t.string,
        CompanyInternalId: t.string,
        Observation: t.string,
        Number: t.string,
        Series: t.string,
        Type: t.string
    })
])

export const StockTurnOverReturn = t.type({
    Header,
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
            Event: t.string,
            SentBy: t.string
        })
    })
})

export const StockTurnOverError = t.type({
    Header,
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
            Event: t.string,
            SentBy: t.string
        })
    })
})

export const StockTurnOverInfo = t.type({
    Header,
    Content: StockTurnOver
})
export const ListStockTurnOverInfo = t.type({
    Header,
    Content: t.array(StockTurnOver)
})

export type StockTurnOverReturn = t.TypeOf<typeof StockTurnOverReturn>
export type StockTurnOverError = t.TypeOf<typeof StockTurnOverError>
export type StockTurnOverInfo = t.TypeOf<typeof StockTurnOverInfo>
export type ListStockTurnOverInfo = t.TypeOf<typeof ListStockTurnOverInfo>