// Generated from totvs-ttalk-standard-message/Sick_Note_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'
import { datetime } from '../../custom-types'

export const DeficienciesInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyId: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Chave única */
        erpId: t.string,
        /** Chave do Funcionário */
        employeeId: t.string,
        /** Tipo de Deficiência */
        type: t.union([
            t.literal(0),
            t.literal(1),
            t.literal(2),
            t.literal(3),
            t.literal(4),
            t.literal(5),
            t.literal(6),
            t.literal(7),
        ]),
        /** Data de Início da Deficiência */
        date: datetime,
        /** Data de Recuperação da Deficiência */
        recoveryDate: datetime,
    }),
    t.partial({
        /** C.I.D. */
        icd: t.string,
        /** Observações */
        observation: t.string,
    })
])
export type DeficienciesInfo = t.TypeOf<typeof DeficienciesInfo>

export const PagedDeficiencies = t.intersection([
    Paging,
    t.type({
        items: t.array(DeficienciesInfo)
    })
])
export type PagedDeficiencies = t.TypeOf<typeof PagedDeficiencies>
