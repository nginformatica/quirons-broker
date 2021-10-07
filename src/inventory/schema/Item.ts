import * as t from 'io-ts'
import { datetime } from '../../custom-types'
import { Header } from './Header'

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
        Values: t.type({
            CostPrice: t.number,
            SalesPrice: t.number,
            AverageCostPrice: t.number,
            StandardCostPrice: t.number,
            BaseDate: datetime
        })
    }),
    t.partial({
        CompanyInternalId: t.string,
        BranchId: t.string,
        ShortName: t.string,
        Active: t.boolean
    })
])

export const ItemInfo = t.type({
    Header,
    Content: Item
})
export const ListItemInfo = t.type({
    Header,
    Content: t.array(Item)
})

export type ItemInfo = t.TypeOf<typeof ItemInfo>
export type ListItemInfo = t.TypeOf<typeof ListItemInfo>