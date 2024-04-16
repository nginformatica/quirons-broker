// Generated from totvs-ttalk-standard-message/Sick_Note_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'
import { datetime } from '../../custom-types'

const ExamInfo = t.intersection([
    t.type({
        /** Nome do Exame */
        name: t.string,
        /** Preço do Exame */
        price: t.number,
    }),
    t.partial({
        /** Código do eSocial */
        eSocialCode: t.string,
    })
])

export const AccreditedInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyId: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Chave única */
        erpId: t.string,
        /** Nome do Credenciado */
        name: t.string,
        /** CNPJ do Credenciado */
        documentNumber: t.string,
        /** Data de Início do Contrato */
        contractStart: datetime
    }),
    t.partial({
        /** Exames */
        exams: t.array(ExamInfo),
    })
])
export type AccreditedInfo = t.TypeOf<typeof AccreditedInfo>

export const PagedAccredited = t.intersection([
    Paging,
    t.type({
        items: t.array(AccreditedInfo)
    })
])
export type PagedAccredited = t.TypeOf<typeof PagedAccredited>
