import * as t from 'io-ts'

import { userMessage, senderMessage, Identification } from '../constructors'
import { Item } from './internal/item'
import { Seller } from './internal/seller'
import { StockLevel } from './internal/stock-level'
import { StockTurnOver } from './internal/stock-turn-over'
import { UnitOfMeasure } from './internal/unit-of-measure'
import { Warehouse } from './internal/warehouse'
import { ItemError, ItemReturn } from './schema/Item'
import { RequestError, RequestInfo, RequestReturn } from './schema/Request'
import { SellerError, SellerReturn } from './schema/Seller'
import { StockLevelError, StockLevelReturn } from './schema/StockLevel'
import { StockTurnOverError, StockTurnOverInfo, StockTurnOverReturn } from './schema/StockTurnOver'
import { UnitOfMeasureError, UnitOfMeasureReturn } from './schema/UnitOfMeasure'
import { WarehouseError, WarehouseReturn } from './schema/Warehouse'

/**
 * Possible business messages.
 */
 export const BusinessMessage = t.union([
    userMessage('item',          t.array(Item)),
    userMessage('unitofmeasure', t.array(UnitOfMeasure)),
    userMessage('warehouse',     t.array(Warehouse)),
    userMessage('stocklevel',    t.array(StockLevel)),
    userMessage('stockturnover', t.array(StockTurnOver)),
    userMessage('seller',        t.array(Seller)),
])
export type BusinessMessage = t.TypeOf<typeof BusinessMessage>

export const SenderMessageContent = t.union([
    senderMessage('request',       RequestInfo),
    senderMessage('stockturnover', StockTurnOverInfo)
])
export type SenderMessageContent = t.TypeOf<typeof SenderMessageContent>

export const SenderMessage = t.type({
    kind: t.literal('sendInventory'),
    identification: Identification,
    content: SenderMessageContent
})
export type SenderMessage = t.TypeOf<typeof SenderMessage>

export const SenderResponseMessage = t.union([
    userMessage('responseInventory', t.union([
        RequestError,
        RequestReturn,
        StockTurnOverError,
        StockTurnOverReturn,
        ItemError,
        ItemReturn,
        SellerError,
        SellerReturn,
        StockLevelError,
        StockLevelReturn,
        UnitOfMeasureError,
        UnitOfMeasureReturn,
        WarehouseError,
        WarehouseReturn
    ])),
    t.intersection([
        t.type({
            kind: t.literal('responseInventory')
        }),
        t.partial({
            errorMessage: t.string,
            bodyMessage: t.string
        })
    ])
])
export type SenderResponseMessage = t.TypeOf<typeof SenderResponseMessage>

/**
 * Message protocol used between the broker and the backend.
 */
 export const Message = t.union([
    BusinessMessage,
    SenderMessage,
    SenderResponseMessage
])
export type Message = t.TypeOf<typeof Message>