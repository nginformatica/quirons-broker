import * as t from 'io-ts'

import * as inventoryUM from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for Item.
 */
export const UnitOfMeasure = t.intersection([
    t.type({
        erpCompany: t.string,
        erpBranch: t.string,
        version: t.string,
        id: t.string,
        name: t.string,
        acronym: t.string,
        erpId: t.string,
        originMessageId: t.string,
        sentBy: t.string
    }),
    t.partial({
        isActive: t.boolean,
        description: nullable(t.string),
        created_at: nullable(datetime),
        updated_at: nullable(datetime),
        operation: t.union([
            t.literal('upsert'),
            t.literal('delete'),
            t.literal('Upsert'),
            t.literal('Delete'),
            t.literal('UPSERT'),
            t.literal('DELETE')
        ])
    })
])
export type UnitOfMeasure = t.TypeOf<typeof UnitOfMeasure>


export const Converter = {
    fromInventoryUM(data: inventoryUM.UnitOfMeasureInfo): UnitOfMeasure {
        const { Header, Content } = data

        return {
            /** required */
            erpCompany: Content.CompanyId || '',
            erpBranch: Content.BranchId || '',
            version: Header.Version || '1.000',
            id: '',
            name: Content.ShortName,
            description: Content.Description,
            acronym: Content.Code,
            erpId: Content.InternalId,
            originMessageId: Header.UUID,
            sentBy: Header.ProductName,
            /** not required */
            operation: Header.Event,
            isActive: typeof Content.Active == 'string'
                ? Content.Active == 'true'
                : Content.Active
        }
    }
}