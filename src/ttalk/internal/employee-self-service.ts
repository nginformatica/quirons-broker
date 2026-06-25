import * as t from 'io-ts'
import { nullable } from '../../custom-types'

export const EmployeeExamInfo = t.intersection([
    t.type({
        id: t.string,
        name: t.string,
        releasedToEmployee: t.boolean
    }),
    t.partial({
        resultType: nullable(t.string)
    })
])
export type EmployeeExam = t.TypeOf<typeof EmployeeExamInfo>

export const EmployeeConsultationInfo = t.intersection([
    t.type({
        id: t.string
    }),
    t.partial({
        doctorName: nullable(t.string),
        doctorCrm: nullable(t.string),
        doctorSpecialty: nullable(t.string),
        doctorPhotoUrl: nullable(t.string),
        reason: nullable(t.string),
        type: nullable(t.string),
        estimatedDate: nullable(t.string),
        nature: nullable(t.string),
        estimatedTime: nullable(t.number),
        startDate: nullable(t.string),
        endDate: nullable(t.string),
        accreditedName: nullable(t.string),
        occupationalHealthCertificateId: nullable(t.string),
        generalResultReleasedToEmployee: t.boolean,
        exams: t.array(EmployeeExamInfo)
    })
])
export type EmployeeConsultation = t.TypeOf<typeof EmployeeConsultationInfo>

export const EmployeeIpeInfo = t.intersection([
    t.type({
        equipmentId: t.string,
        equipmentDescription: t.string
    }),
    t.partial({
        nextChange: nullable(t.string),
        caCode: nullable(t.string),
        date: nullable(t.string),
        lastMaintenance: nullable(t.string),
        issueDate: nullable(t.string),
        reason: nullable(t.string),
        amount: nullable(t.number),
        effective: nullable(t.boolean),
        observation: nullable(t.string)
    })
])
export type EmployeeIpe = t.TypeOf<typeof EmployeeIpeInfo>

export const EmployeeRiskIpeInfo = t.type({
    description: t.string,
    change: t.number
})
export type EmployeeRiskIpe = t.TypeOf<typeof EmployeeRiskIpeInfo>

export const EmployeeControlMeasureInfo = t.intersection([
    t.type({
        description: t.string
    }),
    t.partial({
        effective: nullable(t.boolean)
    })
])
export type EmployeeControlMeasure = t.TypeOf<typeof EmployeeControlMeasureInfo>

export const EmployeeRiskInfo = t.intersection([
    t.type({
        riskAgent: t.string,
        ipes: t.array(EmployeeRiskIpeInfo),
        controlMeasures: t.array(EmployeeControlMeasureInfo)
    }),
    t.partial({
        recognitionDate: nullable(t.string),
        riskGroup: nullable(t.string),
        generationSource: nullable(t.string),
        physicalEnvironment: nullable(t.string),
        measureType: nullable(t.string),
        unitMeasurement: nullable(t.string),
        actionLevel: nullable(t.number),
        exposureTime: nullable(t.string),
        repetition: nullable(t.string),
        interval: nullable(t.string),
        riskDegree: nullable(t.string),
        riskMap: nullable(t.string),
        category: nullable(t.string),
        probability: nullable(t.string),
        severity: nullable(t.string),
        classification: nullable(t.string),
        needCpe: nullable(t.boolean),
        needIpe: nullable(t.boolean),
        protectionMeasure: nullable(t.boolean),
        workingCondition: nullable(t.boolean),
        uninterruptedUse: nullable(t.boolean),
        expirationDate: nullable(t.boolean),
        exchangePeriodicity: nullable(t.boolean),
        sanitation: nullable(t.boolean)
    })
])
export type EmployeeRisk = t.TypeOf<typeof EmployeeRiskInfo>
