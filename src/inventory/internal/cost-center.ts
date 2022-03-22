import * as t from 'io-ts'

import * as inventoryUM from '../'
import { datetime, nullable } from '../../custom-types'
import { Event } from '../schema/Header'

/**
 * Our internal model for Item.
 */
export const CostCenter = t.intersection([
    t.type({
        erpCompany: t.string,
        erpBranch: t.string,
        version: t.string,
        id: t.string,
        name: t.string,
        code: t.string,
        erpId: t.string,
        originMessageId: t.string,
        sentBy: t.string
    }),
    t.partial({
        isActive: t.boolean,
        created_at: nullable(datetime),
        updated_at: nullable(datetime),
        operation: Event
    })
])
export type CostCenter = t.TypeOf<typeof CostCenter>


export const Converter = {
    fromInventoryUM(data: inventoryUM.CostCenterInfo): CostCenter {
        const { Header, Content } = data

        return {
            /** required */
            erpCompany: Content.CompanyId,
            erpBranch: Content.BranchId || '',
            version: Header.Version || '1.000',
            id: '',
            name: Content.Name,
            code: Content.Code,
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