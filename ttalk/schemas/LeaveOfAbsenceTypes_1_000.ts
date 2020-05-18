// Generated from totvs-ttalk-standard-message/LeaveOfAbsenceTypes_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'

export const LeaveOfAbsenceTypeInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyId: t.string,
        /** Nome do Tipo de Afastamento */
        name: t.string
    }),
    t.partial({
        /** Codigo idetificador do tipo de afastamento */
        id: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Codigo do Tipo de Afastamento */
        leaveOfAbsenceCode: t.string,
        /** Codigo de Afastamento do Esocial */
        esocialLeaveCode: t.string
    })
])
export type LeaveOfAbsenceTypeInfo = t.TypeOf<typeof LeaveOfAbsenceTypeInfo>

export const LeaveOfAbsenceTypes = t.partial({
    items: t.array(LeaveOfAbsenceTypeInfo)
})
export type LeaveOfAbsenceTypes = t.TypeOf<typeof LeaveOfAbsenceTypes>

export const PagedLeaveOfAbsenceTypes = t.intersection([
    Paging,
    LeaveOfAbsenceTypes
])
export type PagedLeaveOfAbsenceTypes = t.TypeOf<typeof PagedLeaveOfAbsenceTypes>

