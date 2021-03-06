// Generated from totvs-ttalk-standard-message/Sick_Note_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'
import { datetime } from '../../custom-types'

export const SickNoteInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyId: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Matricula */
        employeeId: t.string,
        /** Data do Atestado */
        date: datetime,
        /** Dias de Tratamento */
        length: t.number,
        /** Tipo do Atestado */
        type: t.string
    }),
    t.partial({
        /** Origem do Atestado */
        origin: t.string,
        /** Nome do Médico */
        doctorName: t.string,
        /** Código do CRM */
        classEntityRegistrationCode: t.string,
        /** Estado do CRM */
        classEntityState: t.string,
        /** Código CID */
        internationalDiseaseClassification: t.string,
        /** Acidente */
        accident: t.string,
        /** Observações */
        observation: t.string,
        /** Descrição do Tipo de Afastamento */
        typeOfAbsence: t.string,
        /** Descrição do Tipo de Abono */
        typeOfAllowance: t.string,
        /** Data de Início do Afastamento */
        absenceStartDate: datetime,
        /** Data de Termino do Afastamento */
        absenceEndDate: datetime,
        /** Data de Início do Abono */
        allowanceStartDate: datetime,
        /** Data de Termino do Abono */
        allowanceEndDate: datetime,
        /** Data da Perícia */
        reviewDate: datetime,
        /** Data de Previsão de Termino do Benefício */
        expectedEndDate: datetime,
        /** */
        numberOfBenefit: t.string
    })
])
export type SickNoteInfo = t.TypeOf<typeof SickNoteInfo>

export const PagedSickNote = t.intersection([
    Paging,
    t.type({
        items: t.array(SickNoteInfo)
    })
])
export type PagedSickNote = t.TypeOf<typeof PagedSickNote>
