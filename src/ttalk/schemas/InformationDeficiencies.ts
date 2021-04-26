// Generated from totvs-ttalk-standard-message/InformationDeficiencies_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'

export const InformationDeficienciesInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyId: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Matricula */
        employeeId: t.string
    }),
    t.partial({
        /** Código identificador do Adicional do Funcionario na Folha de Pagamento */
        id: t.string,
        /** Identificador de Deficiência Física */
        DefFisica: t.string,
        /** Identificador de Deficiência Visual */
        DefVisual: t.string,
        /** Identificador de Deficiência Auditiva */
        DefAuditiva: t.string,
        /** Identificador de Deficiência de Fala */
        DefFala: t.string,
        /** Identificador de Deficiência Mental */
        DefMental: t.string,
        /** Identificador de Deficiência Intelectual */
        DefIntelectual: t.string,
        /** Identificador de Reabilitação */
        ReabReadap: t.string
    })
])
export type InformationDeficienciesInfo = t.TypeOf<typeof InformationDeficienciesInfo>

export const PagedInformationDeficiencies = t.intersection([
    Paging,
    t.type({
        items: t.array(InformationDeficienciesInfo)
    })
])
export type PagedInformationDeficiencies = t.TypeOf<typeof PagedInformationDeficiencies>
