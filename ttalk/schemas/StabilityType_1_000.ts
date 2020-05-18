// Generated from jsonschema/schemas/StabilityType_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'

export const StabilityTypeInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyId: t.string,
        /** Nome do Tipo de Estabilidade */
        name: t.string
    }),
    t.partial({
        /** Codigo idetificador do tipo de Estabilidade */
        id: t.string,
           /** Codigo da Filial */
        branchId: t.string,
        /** Código do Tipo de Estabilidade */
        stabilityCode: t.string,
    })
])
export type StabilityTypeInfo = t.TypeOf<typeof StabilityTypeInfo>

export const StabilityTypes = t.partial({
    items: t.array(StabilityTypeInfo)
})
export type StabilityTypes = t.TypeOf<typeof StabilityTypes>

export const PagedStabilityTypes = t.intersection([
    Paging,
    StabilityTypes
])
export type PagedStabilityTypes = t.TypeOf<typeof PagedStabilityTypes>

