// Generated from totvs-ttalk-standard-message/Sick_Note_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'

const Periodicity = t.type({
    description: t.string,
    fromAge: t.number,
    toAge: t.number,
    periodicity: t.number,
    postAdmission: t.number,
})

const Exam = t.intersection([
    t.type({
        type: t.union([
            t.literal(0),
            t.literal(1),
            t.literal(2),
            t.literal(3),
            t.literal(4),
            t.literal(5),
            t.literal(6),
            t.literal(7),
            t.literal(8),
            t.literal(9),
        ]),
        admission: t.boolean,
        periodic: t.boolean,
        backToWork: t.boolean,
        dismissal: t.boolean,
        changeOfFunction: t.boolean,
    }),
    t.partial({
        periodicity: Periodicity,
        description: t.string,
    })
])

export const OccupationInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyId: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Chave única */
        erpId: t.string,
    }),
    t.partial({
        /** EPIs */
        ipe: t.array(t.string),
        /** Exames */
        exams: t.array(Exam),
    })
])
export type OccupationInfo = t.TypeOf<typeof OccupationInfo>

export const PagedOccupation = t.intersection([
    Paging,
    t.type({
        items: t.array(OccupationInfo)
    })
])
export type PagedOccupation = t.TypeOf<typeof PagedOccupation>
