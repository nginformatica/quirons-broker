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

const WarehouseStock = t.type({
    WarehouseInternalId: t.string,
    CurrentStockAmount: t.union([t.string, t.number]),
    BookedStockAmount: t.union([t.string, t.number]),
})

const ReturnItem = t.intersection([
    t.type({
        CompanyId: t.string,
        ItemInternalId: t.string,
        ListOfWarehouseStock: t.array(WarehouseStock)
    }),
    t.partial({
        UnitItemCost: t.union([t.string, t.number]),
        WarehouseInternalId: t.string,
        BranchId: nullable(t.string),
    })
])

const StockLevel = t.type({
    ListOfReturnItem: t.array(ReturnItem)
})
    

export const StockLevelReturn = t.type({
    Header: HeaderReturn,
    Content: t.type({
        ReturnContent: t.type({
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

export const StockLevelError = t.type({
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