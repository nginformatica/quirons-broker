import * as t from 'io-ts'
export { 
    PostMessage,
    GetMessage,
    DeleteMessage,
    PostResponseMessage,
    GetResponseMessage,
    DeleteResponseMessage
} from './message'
import { 
    PostMessage,
    GetMessage,
    DeleteMessage,
    PostResponseMessage,
    GetResponseMessage,
    DeleteResponseMessage  
} from './message'
import { Identification, senderMessage, userMessage } from '../constructors'

export const SenderMessageContent = t.union([
    senderMessage('postMessage', PostMessage),
    senderMessage('getMessage', GetMessage),
    senderMessage('deleteMessage', DeleteMessage),
])
export type SenderMessageContent = t.TypeOf<typeof SenderMessageContent>

export const SenderMessage = t.type({
    kind: t.literal('sendTAF'),
    identification: Identification,
    content: SenderMessageContent
})
export type SenderMessage = t.TypeOf<typeof SenderMessage>

export const SenderResponseMessage = t.intersection([
    t.type({
        kind: t.literal('senderResponse')
    }),
    t.partial({
        errorMessage: t.string
    })
])
export type SenderResponseMessage = t.TypeOf<typeof SenderResponseMessage>

export const Message = t.union([
    userMessage('postMessage', PostMessage),
    userMessage('getMessage', GetMessage),
    userMessage('deleteMessage', DeleteMessage),
    userMessage('postResponseMessage', PostResponseMessage),
    userMessage('getResponseMessage', GetResponseMessage),
    userMessage('deleteResponseMessage', DeleteResponseMessage),
    SenderMessage,
    SenderResponseMessage
])

export type Message = t.TypeOf<typeof Message>