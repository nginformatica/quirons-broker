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
        type: t.union([
            t.literal(0),
            t.literal(1),
            t.literal(2),
            t.literal(3),
        ])
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
        typeOfAbsence: t.union([t.string, t.null]),
        /** Descrição do Tipo de Abono */
        typeOfAllowance: t.union([t.string, t.null]),
        /** Data de Início do Afastamento */
        absenceStartDate: t.union([datetime, t.null]),
        /** Data de Termino do Afastamento */
        absenceEndDate: t.union([datetime, t.null]),
        /** Data de Início do Abono */
        allowanceStartDate: t.union([datetime, t.null]),
        /** Data de Termino do Abono */
        allowanceEndDate: t.union([datetime, t.null]),
        /** Data da Perícia */
        reviewDate: datetime,
        /** Data de Previsão de Termino do Benefício */
        expectedEndDate: datetime,
        /** */
        numberOfBenefit: t.string,
        /** Chave única do registro */
        erpId: t.string
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
