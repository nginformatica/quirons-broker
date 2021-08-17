import * as t from 'io-ts'

import { Message as TtalkMessage} from './ttalk/messages'
import { Message as ESocialMessage } from './esocial/messages'
import { Message as InternalMessage } from './internal/index'
import { Message as TAFMessage } from './taf/index'
import { Message as MiddlewareMessage } from './middleware-totvs/index'

export { Message as TtalkMessage} from './ttalk/messages'
export { Message as ESocialMessage } from './esocial/messages'
export { Message as InternalMessage } from './internal/index'
export { Message as TAFMessage } from './taf/index'
export { Message as MiddlewareMessage } from './middleware-totvs/index'

export const Message = t.union([
    TtalkMessage,
    ESocialMessage,
    InternalMessage,
    TAFMessage,
    MiddlewareMessage
])

export type Message = t.TypeOf<typeof Message>
