// Generated from jsonschema/schemas/WorkingShift_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'

export const WorkingShiftInfo = t.intersection([
    t.type({
        /** Código da Empresa */
        companyId: t.string,
        /** Descrição do Horário */
        name: t.string,
        /** Carga de trabalho mensal */
        monthlyWorkingHours: t.string
    }),
    t.partial({
        /** Chave única do registro dentro da entidade */
        id: t.string,
        /** Código da Filial */
        branchId: t.string,
        /** Código do Turno de trabalho */
        workShiftCode: t.string,
        /** Regime de Revezamento*/
        relayScheme: t.string
    })
])
export type WorkingShiftInfo = t.TypeOf<typeof WorkingShiftInfo>

export const WorkingShifts = t.partial({
    items: t.array(WorkingShiftInfo)
})
export type WorkingShifts = t.TypeOf<typeof WorkingShifts>

export const PagedWorkingShifts = t.intersection([
    Paging,
    WorkingShifts
])
export type PagedWorkingShifts = t.TypeOf<typeof PagedWorkingShifts>

