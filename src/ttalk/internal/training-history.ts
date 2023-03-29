import * as t from 'io-ts'

import * as ttalk from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for an employee's occupation history.
 */
export const TrainingHistory = t.intersection([
    t.type({
        erpId: t.string,
        erpEmployee: t.string,
        expectedDate: datetime,
        erpTraining: t.string
    }),
    t.partial({
        erpCompany: nullable(t.string),
        erpBranch: t.union([t.string, t.null, t.literal(false)]),
        companyId: nullable(t.string),
        branchId: t.union([t.string, t.null, t.literal(false)]),
        trainingDescription: nullable(t.string),
        approval: nullable(t.number),
        completionDate: nullable(datetime),
        expirationDate: nullable(datetime),
        created_at: nullable(datetime),
        updated_at: nullable(datetime)
    })
])
export type TrainingHistory = t.TypeOf<typeof TrainingHistory>

/**
 * Standard message converter.
 */
export const Converter = {
    fromTTalk(data: ttalk.TrainingHistory): TrainingHistory {
        return {
            erpId: data.id,
            erpEmployee: data.employee,
            expectedDate: data.expectedDate,
            erpTraining: data.training,
            trainingDescription: data.trainingDescription,
            approval: data.approval,
            completionDate: data.completionDate,
            expirationDate: data.expirationDate
        }
    },
    toTTalk(data: TrainingHistory): ttalk.TrainingHistory {
        return {
            id: data.erpId,
            employee: data.erpEmployee,
            expectedDate: data.expectedDate,
            training: data.erpTraining,
            trainingDescription: data.trainingDescription ?? undefined,
            approval: data.approval ?? undefined,
            completionDate: data.completionDate ?? undefined,
            expirationDate: data.expirationDate ?? undefined
        }
    }
}
