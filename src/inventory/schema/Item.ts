import * as t from 'io-ts'
import { datetime } from '../../custom-types'

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