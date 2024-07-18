// Generated from totvs-ttalk-standard-message/Sick_Note_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'
import { datetime } from '../../custom-types'

const CostCenter = t.type({
    erpId: t.string,
    description: t.string
})

const Department = t.type({
    erpId: t.string,
    description: t.string
})

const Occupation = t.type({
    erpId: t.string,
    description: t.string
})

const Task = t.type({
    description: t.string
})

const Person = t.type({
    erpId: t.string,
    name: t.string,
    individualRegistration: t.string,
    birthday: datetime,
    gender: t.union([t.literal(0), t.literal(1)]),
})

const Measurement = t.intersection([
    t.type({
        value: t.number,
        instrument: t.string,
    }),
    t.partial({
        date:datetime,
    })
])

const ControlMeasure = t.type({
    description: t.string,
    type: t.union([
        t.literal(0),
        t.literal(1),
        t.literal(2),
        t.literal(3),
        t.literal(4),
        t.literal(5),
    ])
})

const Training = t.type({
    erpId: t.string,
    description: t.string,
    urgency: t.union([
        t.literal(0),
        t.literal(1),
        t.literal(2),
    ])
})

const Periodicity = t.type({
    description: t.string,
    fromAge: t.number,
    toAge: t.number,
    periodicity: t.number,
    postAdmission: t.number,
})

const Exam = t.intersection([
    t.type({
        type: t.union([
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
        ]),
        admission: t.boolean,
        periodic: t.boolean,
        backToWork: t.boolean,
        dismissal: t.boolean,
        changeOfFunction: t.boolean,
    }),
    t.partial({
        periodicity: Periodicity,
        description: t.string,
    })
])

const RiskAgent = t.intersection([
    t.type({
        /** Descrição do Agente de Risco */
        description: t.string,
        /** Grupo do Agente */
        group: t.union([
            t.literal(0),
            t.literal(1),
            t.literal(2),
            t.literal(3),
            t.literal(4),
            t.literal(5),
            t.literal(6),
            t.literal(7),
        ])
    }),
    t.partial({
        /** Código do Agente de Risco no eSocial */
        eSocialCode: t.string,
        /** Avaliação */
        evaluation: t.union([
            t.literal(0),
            t.literal(1),
        ]),
    })
])

export const RiskInfo = t.intersection([
    t.type({
        /** Codigo da Empresa */
        companyId: t.string,
        /** Codigo da Filial */
        branchId: t.string,
        /** Chave única */
        erpId: t.string,
        /** Data de Reconhecimento */
        recognitionDate: datetime,
        /** Agente de Risco */
        riskAgent: RiskAgent,
        /** Descrição da Fonte Geradora */
        generatingSource: t.string,
        /** Descrição do Ambiente Físico */
        environment: t.string,
        /** Centros de Custo */
        costCenter: t.array(CostCenter),
        /** Departamentos */
        department: t.array(Department),
        /** Funções */
        occupation: t.array(Occupation),
        /** Tarefas */
        task: t.array(Task),
        /** Pessoas */
        person: t.array(Person),
        /** Medições */
        measurement: t.array(Measurement),
        /** Medidas de Controle */
        controlMeasure: t.array(ControlMeasure),
        ipe: t.array(t.string),
        training: t.array(Training),
        exam: t.array(Exam),
    }),
    t.partial({
        /** C.I.D. */
        icd: t.string,
        /** Observações */
        observation: t.string,
        /**Data de eliminação do risco */
        eliminationDate: datetime,
    })
])
export type RiskInfo = t.TypeOf<typeof RiskInfo>

export const PagedRisk = t.intersection([
    Paging,
    t.type({
        items: t.array(RiskInfo)
    })
])
export type PagedRisk = t.TypeOf<typeof PagedRisk>
