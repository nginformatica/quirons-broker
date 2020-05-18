// Generated from totvs-ttalk-standard-message/Allowance_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'
import { datetime } from '../custom-types'

export const AllowanceInfo = t.intersection([
    t.type({
        /** Chave unica do registro de abono */
        id: t.string,
        /** Codigo da Empresa */
        companyId: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Codigo Identificador do Funcionario */
        employeeId: t.string,
        /** Data inicial do abono. */
        startDate: datetime,
        /** Horario inicial do abono. */
        startTime: t.string,
        /** Data final do abono. */
        endDate: datetime,
        /** Horario final do abono. */
        endTime: t.string
    }),
    t.partial({
        /** Codigo do Abono */
        code: t.string,
        /** Justificativa do Abono */
        justification: t.string
    })
])
export type AllowanceInfo = t.TypeOf<typeof AllowanceInfo>

export const PagedAllowance = t.intersection([
    Paging,
    t.type({
        items: t.array(AllowanceInfo)
    })
])
export type PagedAllowance = t.TypeOf<typeof PagedAllowance>
