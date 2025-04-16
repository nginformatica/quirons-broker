import * as t from 'io-ts'

import * as inventoryUM from '../'
import { datetime, nullable } from '../../custom-types'
import { parseBoolean } from '../../fns/parse-boolean'

/**
 * Our internal model for Item.
 */
export const Item = t.intersection([
    t.type({
        headerErpCompany: t.string,
        headerErpBranch: t.string,
        erpCompany: t.string,
        erpBranch: t.string,
        version: t.string,
        id: t.string,
        description: t.string,
        erpId: t.string,
        erpWarehouse: t.string,
        erpUnitOfMeasure: t.string,
        unitaryCost: t.number,
        dangerous: t.boolean,
        quantity: t.number,
        originMessageId: t.string,
        sentBy: t.string
    }),
    t.partial({
        isActive: t.boolean,
        warehouseDescription: nullable(t.string),
        unitOfMeasureDescription: nullable(t.string),
        created_at: nullable(datetime),
        updated_at: nullable(datetime),
        operation: t.union([
            t.literal('upsert'),
            t.literal('delete'),
            t.literal('Upsert'),
            t.literal('Delete'),
            t.literal('UPSERT'),
            t.literal('DELETE'),
            t.literal('Produto.Incluido'),
            t.literal('Produto.Alterado'),
            t.literal('Produto.Excluido')
        ])
    })
])
export type Item = t.TypeOf<typeof Item>

export const Converter = {
    fromInventoryUM(data: inventoryUM.ItemInfo): Item {
        const { Header, Content } = data

        return {
            /** required */
            headerErpCompany: Header.CompanyId,
            headerErpBranch: Header.BranchId,
            erpCompany: Content.CompanyId,
            erpBranch: Content.BranchId || '',
            version: Header.Version || '1.000',
            id: '',
            description: Content.ShortName || Content.Name || '',
            erpId: Content.InternalId,
            erpWarehouse: '',
            erpUnitOfMeasure: Content.UnitOfMeasureInternalId,
            unitaryCost: Number(Content.Values.CostPrice),
            dangerous: false,
            quantity: 0,
            originMessageId: Header.UUID,
            sentBy: Header.ProductName,
            /** not required */
            unitOfMeasureDescription: Content.UnitOfMeasureCode,
            operation: Header.Event,
            isActive: parseBoolean(Content.Active)
        }
    }
}