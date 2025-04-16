import * as t from 'io-ts'

import * as inventoryUM from '../'
import { datetime, nullable } from '../../custom-types'
import { parseBoolean } from '../../fns/parse-boolean'

/**
 * Our internal model for Item.
 */
export const CostCenter = t.intersection([
    t.type({
        headerErpCompany: t.string,
        headerErpBranch: t.string,
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
export type CostCenter = t.TypeOf<typeof CostCenter>


export const Converter = {
    fromInventoryUM(data: inventoryUM.CostCenterInfo): CostCenter {
        const { Header, Content } = data

        return {
            /** required */
            headerErpCompany: Header.CompanyId,
            headerErpBranch: Header.BranchId,
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
            isActive: parseBoolean(Content.Active)
        }
    }
}