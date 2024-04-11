// Generated from totvs-ttalk-standard-message/Sick_Note_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'
import { datetime } from '../../custom-types'

const Response = t.intersection([
    t.type({
        order: t.number,
        option: t.number,
    }),
    t.partial({
        description: t.string,
    })
])

export const ClinicalQuizInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyId: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Chave única */
        erpId: t.string,
        /** Data de Realização */
        realizationDate: datetime,
        /** Descrição do Questionário */
        quiz: t.string,
        /** Tipo de Deficiência */
        response: t.array(Response),
    }),
    t.partial({
    })
])
export type ClinicalQuizInfo = t.TypeOf<typeof ClinicalQuizInfo>

export const PagedClinicalQuiz = t.intersection([
    Paging,
    t.type({
        items: t.array(ClinicalQuizInfo)
    })
])
export type PagedClinicalQuiz = t.TypeOf<typeof PagedClinicalQuiz>
