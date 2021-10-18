import * as t from 'io-ts'

import * as inventoryUM from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for Item.
 */
export const Seller = t.intersection([
    t.type({
        id: t.string,
        personId: t.string,
        name: t.string,
        erpId: t.string
    }),
    t.partial({
        erpCompany: nullable(t.string),
        erpBranch: t.union([t.string, t.null, t.literal(false)]),
        created_at: nullable(datetime),
        updated_at: nullable(datetime),
        operation: t.union([t.literal('upsert'), t.literal('delete')])
    })
])
export type Seller = t.TypeOf<typeof Seller>


export const Converter = {
    fromInventoryUM(data: inventoryUM.SellerInfo): Seller {
        const { Header, Content } = data

        return {
            /** required */
            id: '',
            personId: Content.EmployeeInternalId,
            name: Content.Name,
            erpId: Content.InternalId,
            /** not required */
            erpCompany: Content.CompanyId,
            erpBranch: Content.BranchId,
            operation: Header.Event
        }
    }
}