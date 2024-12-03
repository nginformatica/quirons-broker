// Generated from totvs-ttalk-standard-message/Sick_Note_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'
import { datetime } from '../../custom-types'

export const IpeDeliveryInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyId: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Chave única */
        erpId: t.string,
        /** Chave do Funcionário */
        employeeId: t.string,
        /** Código de Aprovação */
        ca: t.string,
        /** Data de Entrega */
        deliveryDate: datetime,
        /** Vencimento do CA */
        caExpirationDate: t.union([datetime, t.null]),
        /** Quantidade Entregue */
        deliveryAmount: t.number,
    }),
    t.partial({
        /** Indica se é efetivo */
        effective: t.boolean,
        /** Data de Devolução */
        returnDate: t.union([datetime, t.null]),
        /** Quantidade Devolvida */
        amountReturned: t.number,
        /** Motivo da Devolução */
        returnReason: t.union([
            t.literal(0),
            t.literal(1),
            t.literal(2),
            t.literal(3),
            t.literal(4),
            t.null
        ]),
        /** Observações */
        observation: t.string,
        /** Data de Assinatura */
        issueDate: datetime,
        /** Data da Última Manutenção */
        lastMaintenanceDate: t.union([datetime, t.null]),
        /** Custo */
        cost: t.number,
        /** Motivo */
        reason: t.union([
            t.literal(0),
            t.literal(1),
            t.literal(2),
            t.literal(3),
            t.literal(4),
            t.literal(5),
            t.literal(6),
            t.literal(7),
            t.literal(8),
            t.literal(9),
            t.null
        ]),
    })
])
export type IpeDeliveryInfo = t.TypeOf<typeof IpeDeliveryInfo>

export const PagedIpeDelivery = t.intersection([
    Paging,
    t.type({
        items: t.array(IpeDeliveryInfo)
    })
])
export type PagedIpeDelivery = t.TypeOf<typeof PagedIpeDelivery>
