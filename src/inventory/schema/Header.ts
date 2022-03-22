import * as t from 'io-ts'
import { Header as CostCenterHeader } from './Item'
import { Header as ItemHeader } from './Item'
import { Header as RequestHeader } from './Request'
import { Header as SellerHeader } from './Seller'
import { Header as StockLevelHeader } from './StockLevel'
import { Header as StockTurnOverHeader } from './StockTurnOver'
import { Header as UnitOfMeasureHeader } from './UnitOfMeasure'
import { Header as WarehouseHeader } from './Warehouse'

export const Header = t.union([
    CostCenterHeader,
    ItemHeader,
    RequestHeader,
    SellerHeader,
    StockLevelHeader,
    StockTurnOverHeader,
    UnitOfMeasureHeader,
    WarehouseHeader
])

export const Event = t.union([
    t.literal('upsert'),
    t.literal('delete'),
    t.literal('Upsert'),
    t.literal('Delete'),
    t.literal('UPSERT'),
    t.literal('DELETE')
])