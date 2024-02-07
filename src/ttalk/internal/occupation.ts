import * as t from 'io-ts'

import * as ttalk from '../'
import { cbo, datetime, nullable } from '../../custom-types'
import { raiseErrorFromDecode, Language } from '../../errors'

/**
 * Our internal model for occupations.
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
        companyId: nullable(t.string),
        branchId: t.union([t.string, t.null, t.literal(false)]),
        cbo: nullable(cbo),
        activityDetails: nullable(t.string),
        created_at: nullable(datetime),
        updated_at: nullable(datetime),
        observation: nullable(t.string)
    })
])
export type Positions = t.TypeOf<typeof Positions>

/**
 * Standard message converter.
 */
export const Converter = {
    fromTTalk(
        data: ttalk.PositionInfo,
        language: Language = 'en-US'
    ): Positions {
        const result = ttalk.PositionInfo.decode(data)

        if (result._tag === 'Left') {
            throw raiseErrorFromDecode(result, language)
        }

        return {
            id: data.id || '',
            erpCompany: data.companyId.toString(),
            erpBranch: data.branchId || false,
            erpId: data.positionCode,
            description: data.name,
            cbo: data.cbo?.replace('-', '') || undefined,
            activityDetails: data.activityDetails || undefined
        }
    }
}
