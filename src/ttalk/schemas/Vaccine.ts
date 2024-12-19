// Generated from totvs-ttalk-standard-message/Sick_Note_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'

const Info = t.intersection([
    t.type({
        description: t.string,
        gender: t.union([t.literal(0), t.literal(1), t.literal(2)]),
        fromAge: t.number,
        toAge: t.number,
        reinforcementInterval: t.number,
    }),
    t.partial({
        secondDoseInterval: t.number,
        thirdDoseInterval: t.number,
        reinforcement: t.union([t.literal(0), t.literal(1), t.literal(2), t.null]),
    })

])

export const VaccineInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyId: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Chave única */
        erpId: t.string,
        /** Chave única do funcionário */
        employeeId: t.string,
        /** Vacina */
        vaccine: Info,
        /** Data de Aplicação */
        date: t.string,
        /** Dose */
        dose: t.number
    }),
    t.partial({
        /** Lote */
        batch: t.string,
        /** Dose Atual */
        currentDose: t.union([t.literal(0), t.literal(1), t.literal(2), t.literal(3), t.null]),
        /** Status */
        status: t.union([t.literal(0), t.literal(1), t.literal(2), t.null]),
    })
])
export type VaccineInfo = t.TypeOf<typeof VaccineInfo>

export const PagedVaccine = t.intersection([
    Paging,
    t.type({
        items: t.array(VaccineInfo)
    })
])
export type PagedVaccine = t.TypeOf<typeof PagedVaccine>
