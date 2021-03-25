import * as t from 'io-ts'
export { 
    PostMessage,
    GetMessage,
    DeleteMessage  
 } from './message'
import { 
    PostMessage,
    GetMessage,
    DeleteMessage    
} from './message'
import { userMessage } from '../constructors'

export const Message = t.union([
    userMessage('postMessage', PostMessage),
    userMessage('getMessage', GetMessage),
    userMessage('deleteMessage', DeleteMessage)
])

export type Message = t.TypeOf<typeof Message>
