// Generated from jsonschema/schemas/Positions_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'

export const PositionInfo = t.intersection([
    t.type({
        /** Código da Empresa */
        companyId: t.string,
        /** Nome da Função */
        name: t.string
    }),
    t.partial({
        /** Chave única do registro dentro da entidade */
        id: t.string,
        /** Código da Filial */
        branchId: t.string,
        /** Código da Função */
        positionCode: t.string,
        /** CBO da Função */
        cbo: t.string,
        /** Detalhamento das Atividades da Função */
        activityDetails: t.string
    })
])
export type PositionInfo = t.TypeOf<typeof PositionInfo>

export const Positions = t.partial({
    items: t.array(PositionInfo)
})
export type Positions = t.TypeOf<typeof Positions>

export const PagedPositions = t.intersection([
    Paging,
    Positions
])
export type PagedPositions = t.TypeOf<typeof PagedPositions>

