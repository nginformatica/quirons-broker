import * as t from 'io-ts'
export { Payment } from './payment'
export { Organization, OrganizationConvert } from './organization'
import { Payment } from './payment'
import { Organization, OrganizationConvert } from './organization'
import { metaMessage, userMessage } from '../constructors'
import { pick, datetime } from '../custom-types'
import { TError } from '../ttalk/messages'

export const BusinessMessage = t.union([
    metaMessage('organization', Organization),
    metaMessage('payment', Payment)
])


export const BusinessRequest = t.intersection([
    t.type({
        /**
         * Which kind of message we're requesting.
         */
        kind: pick('kind', BusinessMessage)
    }),
    t.partial({
        /** Optional starting date, requesting only newer entries. */
        date: datetime,
        /** Optional page offset of the request. */
        page: t.number,
        /** Number of items per request page. */
        pageSize: t.number,
        /** Optional status of the request. */
        status: t.string
    })
])
export const BusinessRequestMessage = userMessage('requestInternal', BusinessRequest)


export const Delete = t.intersection([
    t.type({
        kind: pick('kind', BusinessMessage)
    }),
    t.union([
        t.type({
            id: t.string
        }),
        t.type({
            erpId: t.string
        })
    ])
])
export type Delete = t.TypeOf<typeof Delete>


export const Deleted = t.type({
    id: t.string
})
export type Deleted = t.TypeOf<typeof Deleted>


export const Message = t.union([
    BusinessMessage,
    BusinessRequestMessage,
    metaMessage('deleteInternal', Delete),
    metaMessage('deletedInternal', Deleted),
    metaMessage('error', TError),
    metaMessage('organizationConvert', OrganizationConvert)
])

export type Message = t.TypeOf<typeof Message>
