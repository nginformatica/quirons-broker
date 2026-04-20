import * as t from 'io-ts'

export const VoteInfo = t.intersection([
    t.type({
        mandateId: t.string,
        candidateId: t.string,
        employeeId: t.string
    }),
    t.partial({
        companyId: t.string,
        branchId: t.string
    })
])

export type Vote = t.TypeOf<typeof VoteInfo>
