// Generated from totvs-ttalk-standard-message/AllowanceTypes_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'

export const AllowanceTypesInfo = t.intersection([
    t.type({
        /** Descrição do Tipo de Abono */
        name: t.string,
        /** Código da Empresa */
        companyId: t.string
    }),
    t.partial({
        /** Código do tipo abono */
        code: t.string,
        /** Identificador do tipo de abono */
        id: t.string,
        /** Código da Filial */
        branchId: t.string
    })
])
export type AllowanceTypesInfo = t.TypeOf<typeof AllowanceTypesInfo>

export const PagedAllowanceTypes = t.intersection([
    Paging,
    t.partial({
        items: t.array(AllowanceTypesInfo)
    })
])
export type PagedAllowanceTypes = t.TypeOf<typeof PagedAllowanceTypes>

