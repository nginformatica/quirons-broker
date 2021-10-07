import * as t from 'io-ts'
import { Header } from './Header'

const Warehouse = t.intersection([
    t.type({
        InternalId: t.string,
        CompanyId: t.string,
        Code: t.string,
        Description: t.string,
    }),
    t.partial({
        CompanyInternalId: t.string,
        BranchId: t.string,
        Active: t.boolean
    })
])

export const WarehouseInfo = t.type({
    Header,
    Content: Warehouse
})
export const ListWarehouseInfo = t.type({
    Header,
    Content: t.array(Warehouse)
})

export type WarehouseInfo = t.TypeOf<typeof WarehouseInfo>
export type ListWarehouseInfo = t.TypeOf<typeof ListWarehouseInfo>