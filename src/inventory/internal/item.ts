import * as t from 'io-ts'

import * as inventoryUM from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for Item.
 */
export const Item = t.intersection([
    t.type({
        id: t.string,
        description: t.string,
        erpId: t.string,
        erpWarehouse: t.string,
        erpUnitOfMeasure: t.string,
        unitaryCost: t.number,
        dangerous: t.boolean,
        quantity: t.number
    }),
    t.partial({
        warehouseDescription: nullable(t.string),
        unitOfMeasureDescription: nullable(t.string),
        erpCompany: nullable(t.string),
        erpBranch: t.union([t.string, t.null, t.literal(false)]),
        created_at: nullable(datetime),
        updated_at: nullable(datetime)
    })
])
export type Item = t.TypeOf<typeof Item>

export const Converter = {
    fromTTalk(data: inventoryUM.ItemInfo): Item {
        const { Content } = data

        return {
            /** required */
            id: '',
            description: Content.Name,
            erpId: Content.InternalId,
            erpWarehouse: '',
            erpUnitOfMeasure: Content.UnitOfMeasureInternalId,
            unitaryCost: Content.Values.CostPrice,
            dangerous: false,
            quantity: 0,
            /** not required */
            unitOfMeasureDescription: Content.UnitOfMeasureCode,
            erpCompany: Content.CompanyId,
            erpBranch: Content.BranchId
        }
    }
}