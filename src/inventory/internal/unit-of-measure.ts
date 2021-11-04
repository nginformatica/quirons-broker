import * as t from 'io-ts'

import * as inventoryUM from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for Item.
 */
export const UnitOfMeasure = t.intersection([
    t.type({
        id: t.string,
        name: t.string,
        acronym: t.string,
        erpId: t.string
    }),
    t.partial({
        erpCompany: nullable(t.string),
        erpBranch: t.union([t.string, t.null, t.literal(false)]),
        description: nullable(t.string),
        created_at: nullable(datetime),
        updated_at: nullable(datetime),
        operation: t.union([t.literal('upsert'), t.literal('delete')])
    })
])
export type UnitOfMeasure = t.TypeOf<typeof UnitOfMeasure>


export const Converter = {
    fromInventoryUM(data: inventoryUM.UnitOfMeasureInfo): UnitOfMeasure {
        const { Header, Content } = data

        return {
            /** required */
            id: '',
            name: Content.ShortName,
            description: Content.Description,
            acronym: Content.Code,
            erpId: Content.InternalId,
            /** not required */
            erpCompany: Header.CompanyId,
            erpBranch: Header.BranchId,
            operation: Header.Event
        }
    }
}