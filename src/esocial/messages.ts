import * as t from 'io-ts'

import { eSocial as evtCAT } from './schemas/evtCAT'
import { eSocial as evtMonit } from './schemas/evtMonit'
import { eSocial as evtExpRisco } from './schemas/evtExpRisco'

import { dataMessage, metaMessage, userMessage } from '../constructors'

export const Response = metaMessage('eSocialResponse', t.union([
    t.type({
        error: t.array(t.string)
    }),
    t.type({
        response: t.string
    })
]))

export type Response = t.TypeOf<typeof Response>

export const ESocialRequest = t.type({
    action: t.union([
        t.literal('build'),
        t.literal('validate')
    ]),
    message: t.union([
        dataMessage('evtCAT',      evtCAT),
        dataMessage('evtMonit',    evtMonit),
        dataMessage('evtExpRisco', evtExpRisco)
    ])
})

export type ESocialRequest = t.TypeOf<typeof ESocialRequest>

export const Message = t.union([
    Response,
    userMessage('eSocial', ESocialRequest)
])

export type Message = t.TypeOf<typeof Message>
