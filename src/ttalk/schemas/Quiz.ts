// Generated from totvs-ttalk-standard-message/Sick_Note_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'

const Answer = t.type({
    description: t.string
})

const Group = t.type({
    question: t.string,
    answers: t.array(Answer)
})

export const QuizInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyId: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Chave única */
        erpId: t.string,
        /** Descrição */
        description: t.string,
        /** Tipo de Deficiência */
        questionsGroup: t.array(Group),
    }),
    t.partial({
    })
])
export type QuizInfo = t.TypeOf<typeof QuizInfo>

export const PagedQuiz = t.intersection([
    Paging,
    t.type({
        items: t.array(QuizInfo)
    })
])
export type PagedQuiz = t.TypeOf<typeof PagedQuiz>
