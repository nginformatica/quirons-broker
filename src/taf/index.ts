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

export const SendMessage = userMessage('sendTAF', t.intersection([
    t.union([
        PostMessage,
        GetMessage,
        DeleteMessage
    ]),
    // Responses may optionally contain an error message attached to the content
    t.type({
        content: t.partial({
            errorMessage: t.string
        })
    })
]))

export type SendMessage = t.TypeOf<typeof SendMessage>

export const ResponseMessage = userMessage('responseTAF', t.union([
    PostResponseMessage,
    GetResponseMessage,
    DeleteResponseMessage
]))

export type ResponseMessage = t.TypeOf<typeof ResponseMessage>

export const Message = t.union([
    SendMessage,
    ResponseMessage
])

export type Message = t.TypeOf<typeof Message>
