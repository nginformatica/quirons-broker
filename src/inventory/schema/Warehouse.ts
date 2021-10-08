import * as t from 'io-ts'
import { getHeader } from './Header'

const MESSAGE = 'WAREHOUSE'

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
    Header: getHeader(MESSAGE),
    Content: Warehouse
})
export const ListWarehouseInfo = t.type({
    Header: getHeader(MESSAGE),
    Content: t.array(Warehouse)
})

export type WarehouseInfo = t.TypeOf<typeof WarehouseInfo>
export type ListWarehouseInfo = t.TypeOf<typeof ListWarehouseInfo>