import * as t from 'io-ts'
import { date, datetime, nullable } from '../../custom-types'

const MESSAGE = 'REQUEST'

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

const RequestItem = t.type({
    Event: t.union([t.literal('upsert'), t.literal('delete')]),
    Code: t.string,
    InternalId: t.string,
    ItemInternalid: t.string,
    TotalPrice: t.string,
    Quantity: t.string,
    UnitOfMeasureInternalId: t.string,
    WarehouseInternalId: t.string,
    DeliveryDateTime: t.union([datetime, date])
})

const Request = t.intersection([
    t.type({
        InternalId: t.string,
        Number: t.string,
        UserRequesterCode: t.string,
        UserRequesterInternalId: t.string,
        RegisterDateTime: t.union([datetime, date]),
        ListOfRequestItem: t.array(t.type({
            RequestItem: RequestItem
        }))
    }),
    t.partial({
        CompanyId: t.string,
        Code: t.string,
        CompanyInternalId: t.string,
        BranchId: t.string,
        DeliveryDateTime: t.union([datetime, date])
    })
])

export const RequestInfo = t.type({
    Header,
    Content: Request
})
export const ListRequestInfo = t.type({
    Header,
    Content: t.array(Request)
})

export type RequestInfo = t.TypeOf<typeof RequestInfo>
export type ListRequestInfo = t.TypeOf<typeof ListRequestInfo>