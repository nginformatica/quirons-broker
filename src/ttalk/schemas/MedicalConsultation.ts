// Generated from totvs-ttalk-standard-message/Sick_Note_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'
import { datetime } from '../../custom-types'

const ExamInfo = t.intersection([
    t.type({
        /** Data do Exame */
        examDate: datetime,
        /** Descrição do Exame */
        examDescription: t.string,
        /** Indicativo de Referência */
        referentialExam: t.union([
            t.literal(0),
            t.literal(1),
        ]),
        /** Nome do Médico */
        doctor: t.string,
        /** CRM do Médico */
        crm: t.string,
        /** Estado do CRM */
        state: t.string,
    }),
    t.partial({
        /** Indicativo de Anormalidade */
        abnormality: t.string,
        /** Detalhes do Exame */
        details: t.string,
        /** Observações do Exame */
        examObservation: t.string,
        /** Resultado */
        result: t.union([
            t.literal(0),
            t.literal(1),
        ]),
        /** Tivo de Alteração */
        alterationType: t.string,
        /** Alteração Ocupacioanl */
        occupationalActivity: t.union([
            t.literal(0),
            t.literal(1),
        ]),
        /** Credenciado */
        accredited: t.string,
    })
])
export const MedicalConsultationInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyId: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Matricula */
        employeeId: t.string,
        /** Natureza do ASO */
        type: t.union([
            t.literal(0),
            t.literal(1),
            t.literal(2),
            t.literal(3),
            t.literal(4),
            t.literal(5),
        ]),
        /** Data Prevista da Consulta */
        expectedDate: datetime,
        /** Nome do Médico */
        doctor: t.string,
        /** CRM do Médico */
        crm: t.string,
        /** Estado do CRM */
        state: t.string,
    }),
    t.partial({
        /** ID interno */
        id: t.string,
        /** Data de Cancelamento */
        cancelDate: datetime,
        /** Data de Emissão */
        issueDate: datetime,
        /** Parecer do ASO */
        situation: t.union([
            t.literal(0),
            t.literal(1),
            t.literal(2),
        ]),
        /** Observações */
        observation: t.string,
        /** Lista de Exames */
        examList: t.union([t.array(ExamInfo), t.null]),
        /** Chave única do registro */
        erpId: t.string,
        /** Credenciado */
        accredited: t.string,
        /** Motivo da Consulta */
        reason: t.string
    })
])
export type MedicalConsultationInfo = t.TypeOf<typeof MedicalConsultationInfo>

export const PagedMedicalConsultation = t.intersection([
    Paging,
    t.type({
        items: t.array(MedicalConsultationInfo)
    })
])
export type PagedMedicalConsultation = t.TypeOf<typeof PagedMedicalConsultation>
