// Generated from totvs-ttalk-standard-message/LeaveOfAbsenceControl_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'
import { time, datetime, nullable } from '../../custom-types'

export const LeaveOfAbsenceInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyId: t.string,
        /** Codigo Identificador do Funcionario */
        employeeId: t.string,
        /** Data inicial do afastamento */
        startDate: datetime
    }),
    t.partial({
        /** Chave unica do registro de afastamentos */
        id: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Horário inicial do afastamento */
        startTime: time,
        /** Data final do afastamento */
        endDate: nullable(datetime),
        /** Horário final do afastamento. */
        endTime: nullable(time),
        /** Código do afastamento */
        leaveOfAbsenceCode: t.string,
        /** CID - Classificacao Internacional de Doencas e Problemas Relacionados a Saude */
        internationalDiseaseClassification: t.string,
        /** Numero Conselho de Classe */
        classEntityRegistrationCode: t.string,
        /** Nome Medico */
        doctorName: t.string,
        /** Codigo da UF do Conselho de Classe */
        classEntityState: t.string,
        /** Tipo Orgao de Classe */
        classEntity: t.string,
        /** Tipo de Acidente */
        accidentClassification: t.string,
        /** Origem da retificação */
        rectificationOrigin: t.union([t.literal('1'), t.literal('2'), t.literal('3')]),
        /** Tipo de Processo */
        typeOfProcess: t.union([t.literal('1'), t.literal('2'), t.literal('3')]),
        /** Número do Processo*/
        processNumber: t.string
    })
])
export type LeaveOfAbsenceInfo = t.TypeOf<typeof LeaveOfAbsenceInfo>

export const PagedLeaveOfAbsence = t.intersection([
    Paging,
    t.type({
        items: t.array(LeaveOfAbsenceInfo)
    })
])
export type PagedLeaveOfAbsence = t.TypeOf<typeof PagedLeaveOfAbsence>
