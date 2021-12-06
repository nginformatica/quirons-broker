import * as t from 'io-ts'

import * as inventoryUM from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for Item.
 */
export const Seller = t.intersection([
    t.type({
        erpCompany: t.string,
        erpBranch: t.string,
        version: t.string,
        id: t.string,
        personId: t.string,
        name: t.string,
        erpId: t.string,
        originMessageId: t.string,
        sentBy: t.string
    }),
    t.partial({
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
            erpCompany: Header.CompanyId,
            erpBranch: Header.BranchId,
            version: Header.Version || '1.000',
            id: '',
            personId: Content.EmployeeInternalId,
            name: Content.Name,
            erpId: Content.InternalId,
            originMessageId: Header.UUID,
            sentBy: Header.ProductName,
            /** not required */
            operation: Header.Event
        }
    }
}