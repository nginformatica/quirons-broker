import * as t from 'io-ts'
import { 
    PostMessage,
    GetMessage,
    DeleteMessage,
    PostResponseMessage,
    GetResponseMessage,
    DeleteResponseMessage  
} from './message'
import { Identification, userMessage } from '../constructors'
import { nullable } from '../custom-types'

export { 
    PostMessage,
    GetMessage,
    DeleteMessage,
    PostResponseMessage,
    GetResponseMessage,
    DeleteResponseMessage
} from './message'

export const SenderMessageContent = t.union([
    PostMessage,
    GetMessage,
    DeleteMessage
])

export type SenderMessageContent = t.TypeOf<typeof SenderMessageContent>

export const SenderMessage = userMessage('sendTAF', SenderMessageContent)

export type SenderMessage = t.TypeOf<typeof SenderMessage>

export const SenderResponseMessage = t.union([
    // This should match the tag below
    userMessage('responseTAF', nullable(t.union([
        PostResponseMessage,
        GetResponseMessage,
        DeleteResponseMessage
    ]))),
    t.type({
        // This should match the tag above
        kind: t.literal('responseTAF'),
        identification: Identification,
        errorMessage: t.string
    })
])

export type SenderResponseMessage = t.TypeOf<typeof SenderResponseMessage>

export const Message = t.union([
    SenderMessage,
    SenderResponseMessage
])

export type Message = t.TypeOf<typeof Message>
