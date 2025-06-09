// Generated from totvs-ttalk-standard-message/PagedPayRollCostCenter_1_000.json
import * as t from 'io-ts'
import { nullable } from '../../custom-types'
import { Paging } from '../apis/types/totvsApiTypesBase'
 
export const PayRollCostCenterInfo = t.intersection([
    t.type({
        /** Código da Empresa */
        companyId: t.string,
        /** Nome do Centro de Custo da Folha de Pagamento */
        name: t.string
    }),
    t.partial({
        /** Código Identificador do Centro de Custo da Folha de Pagamento */
        id: t.string,
        /** Código da Filial */
        branchId: t.string,
        /** Código do Centro de Custo da Folha de Pagamento */
        code: t.string,
        /** Código do Centro de Custo do Estoque */
        costCenterCode: nullable(t.string),
        /** Status do registro no ERP */
        active: t.union([t.string, t.boolean]),
    })
])
export type PayRollCostCenterInfo = t.TypeOf<typeof PayRollCostCenterInfo>
 
export const PayRollCostCenters = t.partial({
    items: t.array(PayRollCostCenterInfo)
})
export type PayRollCostCenters = t.TypeOf<typeof PayRollCostCenters>
 
export const PagedPayRollCostCenter = t.intersection([
    Paging,
    PayRollCostCenters
])
export type PagedPayRollCostCenter = t.TypeOf<typeof PagedPayRollCostCenter>