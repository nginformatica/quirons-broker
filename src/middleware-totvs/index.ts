import * as t from 'io-ts'
import { 
    PostMessage,
    GetMessage,
    CompanyMessage,
    GetCompanyMessage,
    PostResponseMessage,
    GetResponseMessage,
    CompanyResponseMessage,
    GetCompanyResponseMessage
} from './message'
import { userMessage } from '../constructors'
import { nullable } from '../custom-types'

export { 
    PostMessage,
    GetMessage,
    CompanyMessage,
    GetCompanyMessage,
    PostResponseMessage,
    GetResponseMessage,
    CompanyResponseMessage,
    GetCompanyResponseMessage
} from './message'

export const SenderMessageContent = t.union([
    PostMessage,
    GetMessage,
    CompanyMessage,
    GetCompanyMessage
])

export type SenderMessageContent = t.TypeOf<typeof SenderMessageContent>

export const SenderMessage = userMessage('sendMiddleware', SenderMessageContent)

export type SenderMessage = t.TypeOf<typeof SenderMessage>

export const SenderResponseMessage = t.union([
    // This should match the tag below
    userMessage('responseMiddleware', nullable(t.union([
        PostResponseMessage,
        GetResponseMessage,
        CompanyResponseMessage,
        GetCompanyResponseMessage
    ]))),
    t.type({
        // This should match the tag above
        kind: t.literal('responseMiddleware'),
        errorMessage: t.string
    })
])

export type SenderResponseMessage = t.TypeOf<typeof SenderResponseMessage>

export const Message = t.union([
    SenderMessage,
    SenderResponseMessage
])

export type Message = t.TypeOf<typeof Message>
