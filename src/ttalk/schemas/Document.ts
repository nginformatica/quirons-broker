// Generated from totvs-ttalk-standard-message/Sick_Note_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'
import { datetime } from '../../custom-types'

const CostCenter = t.type({
    erpId: t.string,
    description: t.string
})

const Responsible = t.type({
    erpId: t.string,
    name: t.string,
    individualRegistration: t.string,
    birthday: datetime,
    gender: t.union([t.literal(0), t.literal(1)]),
})

export const DocumentInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyId: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Chave única */
        erpId: t.string,
        /** Objetivo */
        objective: t.string,
        /** Tipo */
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
        ]),
        /** Data de Início */
        startDate: datetime,
        /** Data de Fim */
        endDate: datetime,
        /** Data de Vencimento */
        expirationDate: datetime,
        /** Código da Versão */
        review: t.string,
        /** Tipo de Deficiência */
        responsible: Responsible,
        /** Número do documento */
        documentNumber: t.string,
        /** Sigla Estado */
        documentState: t.string,
        /** Entidade */
        entityType: t.union([
            t.literal(0),
            t.literal(1),
            t.literal(2),
        ]),
    }),
    t.partial({
        /** Centro de Custo */
        costCenter: CostCenter,
        /** Descrição da entidade */
        entityDescription: t.string,
        /** Finalidade */
        finality: t.union([
            t.literal(0),
            t.literal(1),
            t.literal(2),
        ]),
    })
])
export type DocumentInfo = t.TypeOf<typeof DocumentInfo>

export const PagedDocument = t.intersection([
    Paging,
    t.type({
        items: t.array(DocumentInfo)
    })
])
export type PagedDocument = t.TypeOf<typeof PagedDocument>
