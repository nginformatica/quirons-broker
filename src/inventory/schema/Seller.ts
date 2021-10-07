import * as t from 'io-ts'
import { Header } from './Header'

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