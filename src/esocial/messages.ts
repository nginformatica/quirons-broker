import * as t from 'io-ts'

import * as evtCAT from './schemas/evtCAT'
import * as evtMonit from './schemas/evtMonit'
import * as evtExpRisco from './schemas/evtExpRisco'

import { dataMessage, userMessage } from '../constructors'

export const Response = userMessage('eSocialResponse', t.union([
    t.type({
        error: t.string
    }),
    t.type({
        response: t.string
    })
]))

export type Response = t.TypeOf<typeof Response>

export const BuildMessage = t.type({
    action: t.union([
        t.literal('build'),
        t.literal('validate')
    ]),
    message: t.union([
        dataMessage('evtCAT',      evtCAT.eSocial),
        dataMessage('evtMonit',    evtMonit.eSocial),
        dataMessage('evtExpRisco', evtExpRisco.eSocial)
    ])
})

export type BuildMessage = t.TypeOf<typeof BuildMessage>

export const Message = t.union([
    Response,
    userMessage('eSocial', BuildMessage)
])

export type Message = t.TypeOf<typeof Message>
