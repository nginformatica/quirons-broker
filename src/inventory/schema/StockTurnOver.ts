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
        Event: t.union([
            t.literal('upsert'),
            t.literal('delete'),
            t.literal('Upsert'),
            t.literal('Delete'),
            t.literal('UPSERT'),
            t.literal('DELETE')
        ])
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
        Event: t.union([
            t.literal('upsert'),
            t.literal('delete'),
            t.literal('Upsert'),
            t.literal('Delete'),
            t.literal('UPSERT'),
            t.literal('DELETE')
        ]),
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
        Quantity: t.number,
        UnitOfMeasureInternalId: t.string,
        WarehouseInternalId: t.string,
        RequestItemInternalId: t.string
    }),
    t.partial({
        EmissionDate: t.union([datetime, date, t.null]),
        Code: nullable(t.string),
        CostCenterInternalId: nullable(t.string),
        CostCenterCode: nullable(t.string),
        UnitPrice: nullable(t.number),
        TotalPrice: nullable(t.number)
    })
])

const StockTurnOver = t.intersection([
    t.type({
        InternalId: t.string,
        CompanyId: t.string,
        BranchId: t.string,
        RegisterDateTime: t.union([datetime, date]),
        Type: t.string,
        ListOfStockTurnoverItem: t.array(StockTurnoverItem)
    }),
    t.partial({
        MovementTypeCode: nullable(t.string),
        Code: nullable(t.string),
        CompanyInternalId: nullable(t.string),
        Observation: nullable(t.string),
        Number: nullable(t.string),
        Series: nullable(t.string),
        SellerInternalId: nullable(t.string)
    })
])

export const StockTurnOverReturn = t.type({
    Header: HeaderReturn,
    Content: t.type({
        ReturnContent: t.partial({
            ListOfInternalId: t.array(t.type({
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
            Event: t.union([
                t.literal('upsert'),
                t.literal('delete'),
                t.literal('Upsert'),
                t.literal('Delete'),
                t.literal('UPSERT'),
                t.literal('DELETE')
            ]),
            SentBy: t.string
        })
    })
})

export const StockTurnOverError = t.type({
    Header: HeaderReturn,
    Content: t.intersection([
        t.type({
            ProcessingInformation: t.type({
                Status: t.union([
                    t.literal('Error'),
                    t.literal('ERROR'),
                    t.literal('error')
                ]),
                ProcessedOn: t.union([datetime, date]),
                Details: t.array(t.intersection([
                    t.type({
                        Code: t.string,
                        Message: t.string,
                    }),
                    t.partial({
                        DetailedMessage: nullable(t.string),
                        HelpUrl: nullable(t.string),
                        helpUrl: nullable(t.string)
                    })
                ]))
            }),
            ReceivedMessage: t.type({
                UUID: t.string,
                Event: t.union([
                    t.literal('upsert'),
                    t.literal('delete'),
                    t.literal('Upsert'),
                    t.literal('Delete'),
                    t.literal('UPSERT'),
                    t.literal('DELETE')
                ]),
                SentBy: t.string
            })
        }),
        t.partial({
            ReturnContent: t.union([
                t.string,
                t.type({
                    Error: t.string
                })
            ]),
        })
    ])
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