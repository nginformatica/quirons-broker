import * as t from 'io-ts'

import { Message as TtalkMessage} from './ttalk/messages'
import { Message as InternalMessage } from './internal/index'

export { Message as TtalkMessage} from './ttalk/messages'
export { Message as InternalMessage } from './internal/index'

export const Message = t.union([
    TtalkMessage,
    InternalMessage
])
export type Message = t.TypeOf<typeof Message>
