import * as t from 'io-ts'
import { date, datetime, nullable } from '../../custom-types'

const MESSAGE = 'WAREHOUSE'

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

const Warehouse = t.intersection([
    t.type({
        InternalId: t.string,
        Code: t.string,
        Description: t.string,
        CompanyId: t.string,
    }),
    t.partial({
        CompanyInternalId: nullable(t.string),
        BranchId: t.string,
        Active: t.union([t.string, t.boolean])
    })
])


export const WarehouseReturn = t.type({
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

export const WarehouseError = t.type({
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

export const WarehouseInfo = t.type({
    Header,
    Content: Warehouse
})
export const ListWarehouseInfo = t.type({
    Header,
    Content: t.array(Warehouse)
})

export type WarehouseReturn = t.TypeOf<typeof WarehouseReturn>
export type WarehouseError = t.TypeOf<typeof WarehouseError>
export type WarehouseInfo = t.TypeOf<typeof WarehouseInfo>
export type ListWarehouseInfo = t.TypeOf<typeof ListWarehouseInfo>