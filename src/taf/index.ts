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
import { userMessage } from '../constructors'

export const Message = t.union([
    userMessage('postMessage', PostMessage),
    userMessage('getMessage', GetMessage),
    userMessage('deleteMessage', DeleteMessage),
    userMessage('postResponseMessage', PostResponseMessage),
    userMessage('getResponseMessage', GetResponseMessage),
    userMessage('deleteResponseMessage', DeleteResponseMessage)
])

export type Message = t.TypeOf<typeof Message>
