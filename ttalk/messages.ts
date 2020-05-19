import * as t from 'io-ts'

import { ErrorCodeKey } from './errors'
import { LeaveOfAbsenceType } from './internal/absence-type'
import { AllowanceType } from './internal/allowance-type'
import { PayRollCostCenter } from './internal/cost-center'
import { Dependant } from './internal/dependant'
import { Employee } from './internal/employee'
import { FunctionalHistory } from './internal/functional-history'
import { Positions } from './internal/occupation'
import { Person } from './internal/person'
import { StabilityType } from './internal/stability-type'
import { Classes } from './internal/training'
import { TrainingHistory } from './internal/training-history'
import { WorkingShifts } from './internal/workshift'
import { datetime, pick } from './custom-types'
import { AllowanceInfo } from './schemas/Allowance_1_000'
import { AdditionalInfo } from './schemas/Additional_1_000'
import { LeaveOfAbsenceInfo } from './schemas/LeaveOfAbsenceControl_1_000'
import { StabilityControlInfo } from './schemas/StabilityControl_1_000'
import { TrainingNecessityInfo } from './schemas/TrainingNecessity_1_000'

export const Identification = t.type({
    /** The userId used in the backend. */
    userId: t.string,
    /** The branch the user is currently using. */
    branchId: t.string
})
export type Identification = t.TypeOf<typeof Identification>

/**
 * Greeting message sent by the broker to the backend, specifiying how the
 * communication should be made and any possible needed parameters.
 */
export const Greeting = t.type({
    /** Queue the broker will be listening for answers from the backend. */
    queue: t.string,
    /** AMQP options for the answer queue, taken from amqplib. */
    options: t.partial({
        exclusive: t.boolean,
        durable: t.boolean,
        autoDelete: t.boolean,
        arguments: t.unknown,
        messageTtl: t.number,
        expires: t.number,
        deadLetterExchange: t.string,
        deadLetterRoutingKey: t.string,
        maxLength: t.number,
        maxPriority: t.number
    })
})
export type Greeting = t.TypeOf<typeof Greeting>

export const TError = t.intersection([
    t.type({ type: ErrorCodeKey }),
    t.partial({ payload: t.string })
])

export type TError = t.TypeOf<typeof TError>

/**
 * Possible business messages.
 */
export const BusinessMessage = t.union([
    userMessage('costcenter',        t.array(PayRollCostCenter)),
    userMessage('occupation',        t.array(Positions)),
    userMessage('workshift',         t.array(WorkingShifts)),
    userMessage('training',          t.array(Classes)),
    userMessage('absencetype',       t.array(LeaveOfAbsenceType)),
    userMessage('allowancetype',     t.array(AllowanceType)),
    userMessage('stabilitytype',     t.array(StabilityType)),
    userMessage('person',            t.array(Person)),
    userMessage('employee',          t.array(Employee)),
    userMessage('dependant',         t.array(Dependant)),
    userMessage('functionalhistory', t.array(FunctionalHistory)),
    userMessage('traininghistory',   t.array(TrainingHistory))
])
export type BusinessMessage = t.TypeOf<typeof BusinessMessage>

// Recomendation for enums, io-ts
export const Method = t.keyof({
  GET: null,
  POST: null,
  PUT: null,
  DELETE: null
})
export type Method = t.TypeOf<typeof Method>

export const SenderMessage = t.union([
    senderMessage('allowance', AllowanceInfo),
    senderMessage('additional', AdditionalInfo),
    senderMessage('leaveofabscence', LeaveOfAbsenceInfo),
    senderMessage('stability', StabilityControlInfo),
    senderMessage('trainingnecessity', TrainingNecessityInfo)
])
export type SenderMessage = t.TypeOf<typeof SenderMessage>

/**
 * Common content of a business message.
 */
export type BusinessObject = BusinessMessage['content'][number]

/**
 * A delete message.
 *
 * This requests external services do delete an object.
 */
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
/**
 * A consume request. Upon receiving this message, we should check any ERPs for
 * possible updates, and forward them back to the backend.
 *
 * Note that, according to TOTVS, requests are paginated, and should work as a
 * transaction.
 */
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
        pageSize: t.number
    })
])
export type BusinessRequest = t.TypeOf<typeof BusinessRequest>

/**
 * Message protocol used between the broker and the backend.
 */
export const Message = t.union([
    metaMessage('error',    TError),
    metaMessage('ping',     t.string),
    metaMessage('pong',     t.string),
    metaMessage('greeting', Greeting),
    userMessage('request',  BusinessRequest),
    userMessage('delete',   Delete),
    userMessage('deleted',  Deleted),
    BusinessMessage,
    SenderMessage
])
export type Message = t.TypeOf<typeof Message>

/**
 * Subset of messages that have an identification field.
 */
export type UserMessage = Subset<Message, { identification: any }>

// Subset of a type given a condition
type Subset<T extends Message, Cond> = T extends Cond ? T : never

// Type for a meta message (without identification)
function metaMessage<N extends string, T extends t.Mixed>(kind: N, content: T) {
    return t.type({
        kind: t.literal(kind),
        content
    })
}

// Type for a user message (with identification)
function userMessage<N extends string, T extends t.Mixed>(kind: N, content: T) {
    return t.type({
        kind: t.literal(kind),
        identification: Identification,
        content
    })
}

// Type for a sender message (with identification)
function senderMessage<N extends string, T extends t.Mixed>(kind: N, content: T) {
    return t.type({
        kind: t.literal(kind),
        identification: Identification,
        method: Method,
        content
    })
}
