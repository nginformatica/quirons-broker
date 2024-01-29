import * as t from 'io-ts'

import { eSocial as evtCAT } from './schemas/evtCAT'
import { eSocial as evtMonit } from './schemas/evtMonit'
import { eSocial as evtExclusao } from './schemas/evtExclusao'
import { eSocial as evtExpRisco } from './schemas/evtExpRisco'
import { eSocial as evtInfoEmpregador } from './schemas/evtInfoEmpregador'

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

export const ESocialVersion = t.union([
    t.literal('1.0.0'),
    t.literal('1.1.0'),
    t.literal('1.2.0'),
])

export const ESocialRequest = t.intersection([
    t.type({
        action: t.union([
            t.literal('build'),
            t.literal('validate')
        ]),
        message: t.union([
            dataMessage('evtCAT',            evtCAT),
            dataMessage('evtMonit',          evtMonit),
            dataMessage('evtExclusao',       evtExclusao),
            dataMessage('evtExpRisco',       evtExpRisco),
            dataMessage('evtInfoEmpregador', evtInfoEmpregador)
        ])
    }),
    t.partial({
        version: ESocialVersion
    })
])

export const ESocialSend = t.type({
    message: t.string
})

export const ESocialQuery = t.type({
    protocol: t.string
})

export type ESocialRequest = t.TypeOf<typeof ESocialRequest>

export type ESocialVersion = t.TypeOf<typeof ESocialVersion>

export type ESocialSend = t.TypeOf<typeof ESocialSend>

export type ESocialQuery = t.TypeOf<typeof ESocialQuery>

export const Message = t.union([
    Response,
    userMessage('eSocial', ESocialRequest),
    userMessage('sendGov', ESocialSend),
    userMessage('getGov', ESocialQuery)
])

export type Message = t.TypeOf<typeof Message>
