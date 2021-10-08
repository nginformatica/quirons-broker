import * as t from 'io-ts'
import { getHeader } from './Header'

const MESSAGE = 'UNITOFMEASURE'

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
    Header: getHeader(MESSAGE),
    Content: UnitOfMeasure
})
export const ListUnitOfMeasureInfo = t.type({
    Header: getHeader(MESSAGE),
    Content: t.array(UnitOfMeasure)
})

export type UnitOfMeasureInfo = t.TypeOf<typeof UnitOfMeasureInfo>
export type ListUnitOfMeasureInfo = t.TypeOf<typeof ListUnitOfMeasureInfo>