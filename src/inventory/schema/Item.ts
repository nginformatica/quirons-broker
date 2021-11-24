import * as t from 'io-ts'
import { date, datetime, nullable } from '../../custom-types'

const MESSAGE = 'ITEM'

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

const Item = t.intersection([
    t.type({
        InternalId: t.string,
        CompanyId: t.string,
        Code: t.string,
        Name: t.string,
        NetWeight: t.string,
        GrossWeight: t.string,
        Origin: t.string,
        ProductType: t.string,
        UnitOfMeasureCode: t.string,
        UnitOfMeasureInternalId: t.string,
        Values: t.intersection([
            t.type({
                CostPrice: t.string,
                SalesPrice: t.string,
                AverageCostPrice: t.string,
                StandardCostPrice: t.string
            }),
            t.partial({
                BaseDate: datetime
            })
        ])
    }),
    t.partial({
        CompanyInternalId: t.string,
        BranchId: t.string,
        ShortName: t.string,
        Active: t.string
    })
])


export const ItemReturn = t.type({
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

export const ItemError = t.type({
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

export const ItemInfo = t.type({
    Header,
    Content: Item
})
export const ListItemInfo = t.type({
    Header,
    Content: t.array(Item)
})

export type ItemReturn = t.TypeOf<typeof ItemReturn>
export type ItemError = t.TypeOf<typeof ItemError>
export type ItemInfo = t.TypeOf<typeof ItemInfo>
export type ListItemInfo = t.TypeOf<typeof ListItemInfo>