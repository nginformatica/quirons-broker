import * as t from 'io-ts'
import { datetime } from '../../custom-types'

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
        Event: t.string
    }),
    t.partial({
        SubType: t.string,
        Version: t.string,
        CompanySharingMode: t.string,
        BusinessUnitySharingMode: t.string,
        BranchSharingMode: t.string
    })
])

const Request = t.intersection([
    t.type({
        InternalId: t.string,
        CompanyId: t.string,
        Code: t.string,
        Number: t.string,
        UserRequesterCode: t.string,
        UserRequesterInternalId: t.string,
        RegisterDateTime: datetime,
        ListOfRequestItem: t.array(t.type({
            Event: t.string,
            Code: t.string,
            InternalId: t.string,
            ItemInternalid: t.string,
            TotalPrice: t.number,
            Quantity: t.number,
            UnitOfMeasureInternalId: t.string,
            WarehouseInternalId: t.string,
            DeliveryDateTime: datetime
        }))
    }),
    t.partial({
        CompanyInternalId: t.string,
        BranchId: t.string,
        DeliveryDateTime: datetime
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