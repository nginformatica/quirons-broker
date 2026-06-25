// Generated from totvs-ttalk-standard-message/SpecialRetirement_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'
import { date } from '../../custom-types'

export const SpecialRetirementInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyId: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Matricula */
        employeeId: t.string
    }),
    t.partial({
        /** Código identificador do registro de aposentadoria especial */
        id: t.string,
        /** Data de entrada na exposição (igual ao additional) */
        entryDate: date,
        /** Indicador de aposentadoria especial: 'S' ativo / 'N' inativo */
        specialRetirement: t.string
    })
])
export type SpecialRetirementInfo = t.TypeOf<typeof SpecialRetirementInfo>

export const PagedSpecialRetirement = t.intersection([
    Paging,
    t.type({
        items: t.array(SpecialRetirementInfo)
    })
])
export type PagedSpecialRetirement = t.TypeOf<typeof PagedSpecialRetirement>
