import * as t from 'io-ts'

import * as ttalk from '../'
import { datetime, nullable } from '../custom-types'
import { APIValidationError } from '../errors'

/**
 * Our internal model for cost centers.
 */
export const Positions = t.intersection([
    t.type({
        id: t.string,
        description: t.string
    }),
    t.partial({
        erpId: nullable(t.string),
        erpBranch: t.union([t.string, t.null, t.literal(false)]),
        erpCompany: nullable(t.string),
        cbo: nullable(t.string),
        created_at: nullable(datetime),
        updated_at: nullable(datetime)
    })
])
export type Positions = t.TypeOf<typeof Positions>

/**
 * Standard message converter.
 */
export const Converter = {
    fromTTalk(data: ttalk.PositionInfo): Positions {
        // Validate CBO format (if any)
        if (data.cbo) {
            // TODO: move this to a io-ts validator
            const match = data.cbo.match(/(\d\d\d\d)-?(\d\.?\d)/)
            if (match) {
                data.cbo = match[1] + match[2]
            } else {
                throw new APIValidationError('Invalid CBO format on Positions')
            }
        }

        return {
            id: data.id || '',
            erpCompany: data.companyId.toString(),
            erpBranch: data.branchId || false,
            erpId: data.positionCode,
            description: data.name,
            cbo: data.cbo || undefined
        }
    }
}
