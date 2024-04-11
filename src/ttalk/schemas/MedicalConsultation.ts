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
        referentialExam: t.string
    }),
    t.partial({
        /** Indicativo de Anormalidade */
        abnormality: t.string,
        /** Detalhes do Exame */
        details: t.string,
        /** Observações do Exame */
        examObservation: t.string,
        /** Resultado */
        result: t.string,
        /** Tivo de Alteração */
        alterationType: t.string,
        /** Alteração Ocupacioanl */
        occupationalActivity: t.string
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
        type: t.string,
        /** Data Prevista da Consulta */
        expectedDate: datetime
    }),
    t.partial({
        /** Data de Cancelamento */
        cancelDate: datetime,
        /** Data de Emissão */
        issueDate: datetime,
        /** Parecer do ASO */
        situation: t.string,
        /** Observações */
        observation: t.string,
        /** Lista de Exames */
        examList: t.array(ExamInfo),
        /** Chave única do registro */
        erpId: t.string
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
