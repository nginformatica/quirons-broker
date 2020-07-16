import * as t from 'io-ts'

import { datetime } from '../custom-types'

/**
 * Our internal model for payment.
 */
export const Payment = t.partial({
    erpId: t.string,
    organizationId: t.string,
    date: datetime,
    value: t.number
})
export type Payment = t.TypeOf<typeof Payment>
