import * as t from 'io-ts'
import { nullable } from '../../custom-types'

export const CandidateInfo = t.intersection([
    t.type({
        mandateId: t.string,
        employeeId: t.string
    }),
    t.partial({
        id: t.string,
        status: t.string,
        createdAt: t.string,
        companyId: t.string,
        branchId: t.string,
        name: nullable(t.string)
    })
])

export type Candidate = t.TypeOf<typeof CandidateInfo>

export const CandidateListInfo = t.intersection([
    t.type({
        mandateId: t.string,
        items: t.array(CandidateInfo)
    }),
    t.partial({
        mandateYear: t.number,
        companyId: t.string,
        branchId: t.string
    })
])
export type CandidateList = t.TypeOf<typeof CandidateListInfo>
