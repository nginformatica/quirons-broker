import * as t from 'io-ts'
import { 
    PostMessage,
    GetMessage,
    DeleteMessage,
    PostResponseMessage,
    GetResponseMessage,
    DeleteResponseMessage  
} from './message'
import { userMessage } from '../constructors'

export { 
    PostMessage,
    GetMessage,
    DeleteMessage,
    PostResponseMessage,
    GetResponseMessage,
    DeleteResponseMessage
} from './message'

export const SenderMessage = userMessage('sendTAF', t.union([
    PostMessage,
    GetMessage,
    DeleteMessage
]))

export type SenderMessage = t.TypeOf<typeof SenderMessage>

export const SenderResponseMessage = t.intersection([
    userMessage('responseTAF', t.union([
        PostResponseMessage,
        GetResponseMessage,
        DeleteResponseMessage
    ])),
    t.partial({
        errorMessage: t.string
    })
])

export type SenderResponseMessage = t.TypeOf<typeof SenderResponseMessage>

export const Message = t.union([
    SenderMessage,
    SenderResponseMessage
])

export type Message = t.TypeOf<typeof Message>
