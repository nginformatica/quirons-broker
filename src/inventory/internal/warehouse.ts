import * as t from 'io-ts'

import * as inventoryUM from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for Item.
 */
export const Warehouse = t.intersection([
    t.type({
        headerErpCompany: t.string,
        headerErpBranch: t.string,
        erpCompany: t.string,
        erpBranch: t.string,
        version: t.string,
        id: t.string,
        description: t.string,
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
            t.literal('DELETE'),
            t.literal('LocalEstoque.Incluido'),
            t.literal('LocalEstoque.Alterado'),
            t.literal('LocalEstoque.Excluido')
        ])
    })
])
export type Warehouse = t.TypeOf<typeof Warehouse>

export const Converter = {
    fromInventoryUM(data: inventoryUM.WarehouseInfo): Warehouse {
        const { Header, Content } = data

        return {
            /** required */
            headerErpCompany: Header.CompanyId,
            headerErpBranch: Header.BranchId,
            erpCompany: Content.CompanyId,
            erpBranch: Content.BranchId || '',
            version: Header.Version || '1.000',
            id: '',
            description: Content.Description,
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