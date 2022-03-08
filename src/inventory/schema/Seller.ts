import * as t from 'io-ts'
import { date, datetime, nullable } from '../../custom-types'

const MESSAGE = 'SELLER'

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

const Seller = t.intersection([
    t.type({
        InternalId: t.string,
        Code: t.string,
        Name: t.string,
        EmployeeInternalId: t.string,
        PersonalIdentification: t.string
    }),
    t.partial({
        CompanyId: t.string,
        CompanyInternalId: nullable(t.string),
        BranchId: t.string,
        Active: t.union([t.string, t.boolean])
    })
])


export const SellerReturn = t.type({
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

export const SellerError = t.type({
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

export const SellerInfo = t.type({
    Header,
    Content: Seller
})
export const ListSellerInfo = t.type({
    Header,
    Content: t.array(Seller)
})

export type SellerReturn = t.TypeOf<typeof SellerReturn>
export type SellerError = t.TypeOf<typeof SellerError>
export type SellerInfo = t.TypeOf<typeof SellerInfo>
export type ListSellerInfo = t.TypeOf<typeof ListSellerInfo>