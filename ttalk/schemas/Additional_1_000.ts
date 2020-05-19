// Generated from totvs-ttalk-standard-message/Additional_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'
import { date } from '../custom-types'

export const AdditionalInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyCode: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Matricula */
        employeeId: t.string
    }),
    t.partial({
        /** Código identificador do Adicional do Funcionario na Folha de Pagamento */
        id: t.string,
        /** Grau de Insalubridade */
        unhealthyDegree: t.string,
        /** Periculosidade */
        dangerousness: t.string,
        /** Data de entrada do adicional da folha de pagamento */
        entryDate: date
    })
])
export type AdditionalInfo = t.TypeOf<typeof AdditionalInfo>

export const PagedAdditional = t.intersection([
    Paging,
    t.type({
        items: t.array(AdditionalInfo)
    })
])
export type PagedAdditional = t.TypeOf<typeof PagedAdditional>
