import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'
import { nullable } from '../../custom-types'

export const ElectionProcessInfo = t.intersection([
    t.type({
        id: t.string,
        mandateId: t.string,
        status: t.string,
        startDate: t.string,
        endDate: t.string
    }),
    t.partial({
        companyId: t.string,
        branchId: t.string,
        mandateYear: nullable(t.number),
        description: nullable(t.string)
    })
])

export type ElectionProcess = t.TypeOf<typeof ElectionProcessInfo>

export const PagedElectionProcess = t.intersection([
    Paging,
    t.type({
        items: t.array(ElectionProcessInfo)
    })
])
export type PagedElectionProcess = t.TypeOf<typeof PagedElectionProcess>
