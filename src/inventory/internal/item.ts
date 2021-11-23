import * as t from 'io-ts'

import * as inventoryUM from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for Item.
 */
export const Item = t.intersection([
    t.type({
        erpCompany: t.string,
        erpBranch: t.string,
        id: t.string,
        description: t.string,
        erpId: t.string,
        erpWarehouse: t.string,
        erpUnitOfMeasure: t.string,
        unitaryCost: t.number,
        dangerous: t.boolean,
        quantity: t.number,
        originMessageId: t.string,
        originEvent: t.string,
        sentBy: t.string
    }),
    t.partial({
        warehouseDescription: nullable(t.string),
        unitOfMeasureDescription: nullable(t.string),
        created_at: nullable(datetime),
        updated_at: nullable(datetime),
        operation: t.union([t.literal('upsert'), t.literal('delete')])
    })
])
export type Item = t.TypeOf<typeof Item>

export const Converter = {
    fromInventoryUM(data: inventoryUM.ItemInfo): Item {
        const { Header, Content } = data

        return {
            /** required */
            erpCompany: Header.CompanyId,
            erpBranch: Header.BranchId,
            id: '',
            description: Content.Name,
            erpId: Content.InternalId,
            erpWarehouse: '',
            erpUnitOfMeasure: Content.UnitOfMeasureInternalId,
            unitaryCost: Number(Content.Values.CostPrice),
            dangerous: false,
            quantity: 0,
            originMessageId: Header.UUID,
            originEvent: Header.Event,
            sentBy: Header.ProductName,
            /** not required */
            unitOfMeasureDescription: Content.UnitOfMeasureCode,
            operation: Header.Event
        }
    }
}