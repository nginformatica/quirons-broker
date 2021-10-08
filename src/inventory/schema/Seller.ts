import * as t from 'io-ts'
import { getHeader } from './Header'

const MESSAGE = 'SELLER'

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
    Header: getHeader(MESSAGE),
    Content: Seller
})
export const ListSellerInfo = t.type({
    Header: getHeader(MESSAGE),
    Content: t.array(Seller)
})

export type SellerInfo = t.TypeOf<typeof SellerInfo>
export type ListSellerInfo = t.TypeOf<typeof ListSellerInfo>