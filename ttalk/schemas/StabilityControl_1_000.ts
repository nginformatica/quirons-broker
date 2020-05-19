// Generated from jsonschema/schemas/StabilityControl_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'
import { datetime } from '../custom-types'

export const StabilityControlInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyId: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Codigo Identificador do Funcionario */
        employeeId: t.string,
        /** Data de Início */
        startDate: datetime,
        /** Codigo do Abono */
        stabilityCode: t.string
    }),
    t.partial({
        /** Chave única do registro de Período de Estabilidade */
        id: t.string,
        /** Data de Termino */
        endDate: datetime
    })
])
export type StabilityControlInfo = t.TypeOf<typeof StabilityControlInfo>

export const PagedStabilityControl = t.intersection([
    Paging,
    t.type({
        items: t.array(StabilityControlInfo)
    })
])
export type PagedStabilityControl = t.TypeOf<typeof PagedStabilityControl>
