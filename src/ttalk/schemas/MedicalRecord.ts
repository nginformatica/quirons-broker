// Generated from totvs-ttalk-standard-message/Sick_Note_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'
import { datetime } from '../../custom-types'

export const MedicalRecordInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyId: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Chave única */
        erpId: t.string,
        /** Chave do Funcionário */
        employeeId: t.string,
        /** Indica se é candidato */
        candidate: t.boolean,
        /** Nome do Prontuário */
        name: t.string,
        /** CPF do candidato */
        individualRegistration: t.string,
        /** Indica se é doardo de sangue */
        bloodDonator: t.boolean,
        /** Indica o tipo sanguíneo */
        bloodType: t.union([
            t.literal(0),
            t.literal(1),
            t.literal(2),
            t.literal(3),
            t.literal(4),
            t.literal(5),
            t.literal(6),
            t.literal(7),
            t.literal(8),
        ]),
        /** Data de Nascimento */
        birthday: datetime,
        /** Sexo */
        gender: t.union([
            t.literal(0),
            t.literal(1),
        ]),
        /** Peso */
        weight: t.number,
        /** Altura */
        height: t.number,
        /** Indica se é fumante */
        smoker: t.boolean,
    }),
    t.partial({
        /** Altura dos olhos */
        eyeHeight: t.number,
        /** Linha mamilar */
        nippleLine: t.number,
        /** Altura da pubis */
        pubicHeight: t.number,
        /** Altura do joelho */
        kneeHeight: t.number,
        /** Altura do cotovelo */
        elbowHeight: t.number,
        /** Tamanho do Braço */
        armSize: t.number,
        /** Tamanho do Antebraço */
        forearmSize: t.number,
        /** Tamanho da Mão */
        handSize: t.number,
        /** Tamanho da Perna */
        legSize: t.number,
        /** Tamanho do Sapato */
        shoesSize: t.number,
        /** Gênero */
        genderEnum: t.union([
            t.literal(0),
            t.literal(1),
            t.literal(2),
            t.literal(3),
            t.literal(4),
            t.literal(5),
        ]),
        /** Cor dos Olhos */
        eyeColor: t.union([
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
            t.literal(10),
            t.null
        ]),
        /** Cor dos Cabelos */
        hairColor: t.union([
            t.literal(0),
            t.literal(1),
            t.literal(2),
            t.literal(3),
            t.literal(4),
            t.literal(5),
            t.literal(6),
            t.literal(7),
            t.null
        ]),
        /** Cor da Pele */
        skinColor: t.union([
            t.literal(0),
            t.literal(1),
            t.literal(2),
            t.literal(3),
            t.literal(4),
            t.null
        ]),
        /** Tempo tabagista */
        tamagistPeriod: t.number,
        /** Quantidade de cigarros por dia */
        amountConsumed: t.number,
        /** Histórico */
        historic: t.union([t.string, t.null]),
        /** Última medição sistólica */
        systolicPressure: t.number,
        /** Última medição diastólica */
        diastolicPressure: t.number,
        /** Última medição temperatura */
        temperature: t.number,
        /** Última medição pulso */
        pulse: t.number,
    })
])
export type MedicalRecordInfo = t.TypeOf<typeof MedicalRecordInfo>

export const PagedMedicalRecord = t.intersection([
    Paging,
    t.type({
        items: t.array(MedicalRecordInfo)
    })
])
export type PagedMedicalRecord = t.TypeOf<typeof PagedMedicalRecord>
