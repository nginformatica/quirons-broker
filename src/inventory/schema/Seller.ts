import * as t from 'io-ts'
import { datetime, nullable } from '../../custom-types'

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

const Seller = t.intersection([
    t.type({
        InternalId: t.string,
        CompanyId: t.string,
        Code: t.string,
        Name: t.string,
        EmployeeInternalId: t.string
    }),
    t.partial({
        CompanyInternalId: t.string,
        BranchId: t.string
    })
])

export const SellerInfo = t.type({
    Header,
    Content: Seller
})
export const ListSellerInfo = t.type({
    Header,
    Content: t.array(Seller)
})

export type SellerInfo = t.TypeOf<typeof SellerInfo>
export type ListSellerInfo = t.TypeOf<typeof ListSellerInfo>