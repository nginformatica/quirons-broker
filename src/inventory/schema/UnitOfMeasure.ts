import * as t from 'io-ts'
import { datetime, nullable } from '../../custom-types'

const MESSAGE = 'UNITOFMEASURE'

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

const UnitOfMeasure = t.intersection([
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

export const UnitOfMeasureInfo = t.type({
    Header,
    Content: UnitOfMeasure
})
export const ListUnitOfMeasureInfo = t.type({
    Header,
    Content: t.array(UnitOfMeasure)
})

export type UnitOfMeasureInfo = t.TypeOf<typeof UnitOfMeasureInfo>
export type ListUnitOfMeasureInfo = t.TypeOf<typeof ListUnitOfMeasureInfo>