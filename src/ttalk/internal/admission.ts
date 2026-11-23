import * as t from 'io-ts'

import { date, datetime, nullable } from '../../custom-types'

/**
 * Digital admission and dismissal (TTALK-ADM-01). Candidates and employees are
 * addressed by the `id` sent on POST /ttalk/person and /ttalk/employee.
 */

/** Job parameters shared by the expected exam, exposure and training queries. */
export const VacancyQuery = t.intersection([
    t.type({
        /** Occupation ERP code. */
        occupation: t.string
    }),
    t.partial({
        /** Department ERP code. */
        department: t.string,
        /** Cost center ERP code. */
        costCenter: t.string,
        /** Task descriptions, compared case-insensitively. */
        tasks: t.array(t.string),
        /** Exam nature (admission, periodic...). Expected exams only. */
        nature: t.string,
        /** Candidate birth date (YYYY-MM-DD). Expected exams only. */
        birthDate: date,
        /** `male` or `female`. Expected exams only. */
        gender: t.string
    })
])
export type VacancyQuery = t.TypeOf<typeof VacancyQuery>

export const ScheduleQuery = t.type({
    startDate: datetime,
    slotLimit: t.number
})
export type ScheduleQuery = t.TypeOf<typeof ScheduleQuery>

const Professional = t.type({
    name: t.string,
    crm: nullable(t.string),
    state: nullable(t.string)
})

export const AsoDocument = t.type({
    url: t.string,
    expiresAt: datetime,
    signed: t.boolean,
    signatureType: nullable(t.string)
})
export type AsoDocument = t.TypeOf<typeof AsoDocument>

/** Emitted occupational health certificate, NR-07 minimum fields only. */
export const PersonAso = t.intersection([
    t.type({
        id: t.string,
        nature: t.string,
        recommendation: t.string,
        scheduleDate: nullable(datetime),
        emissionDate: datetime,
        examiner: nullable(Professional),
        coordinator: nullable(Professional),
        exams: t.array(
            t.type({ description: t.string, date: nullable(datetime) })
        ),
        risks: t.array(t.type({ group: t.string, description: t.string })),
        specificAptitudes: t.array(t.string)
    }),
    t.partial({
        document: nullable(AsoDocument)
    })
])
export type PersonAso = t.TypeOf<typeof PersonAso>

export const ExpectedExamSimulation = t.type({
    id: t.string,
    description: t.string,
    periodicityMonths: nullable(t.number),
    sources: t.array(t.string)
})
export type ExpectedExamSimulation = t.TypeOf<typeof ExpectedExamSimulation>

export const VacancyExposure = t.type({
    exposureGroups: t.array(
        t.type({
            id: t.string,
            erpId: nullable(t.string),
            description: t.string
        })
    ),
    risks: t.array(
        t.type({
            group: t.string,
            agent: t.string,
            description: t.string,
            exposureGroupId: nullable(t.string)
        })
    )
})
export type VacancyExposure = t.TypeOf<typeof VacancyExposure>

export const VacancyTraining = t.type({
    id: t.string,
    erpId: nullable(t.string),
    description: t.string,
    esocialCode: nullable(t.string),
    urgency: t.string,
    origins: t.array(t.string)
})
export type VacancyTraining = t.TypeOf<typeof VacancyTraining>

export const TimeSlot = t.type({
    start: datetime,
    end: datetime
})
export type TimeSlot = t.TypeOf<typeof TimeSlot>

export const SchedulingDoctor = t.intersection([
    t.type({
        id: t.string,
        name: t.string,
        crm: nullable(t.string),
        state: nullable(t.string)
    }),
    t.partial({
        /** Present only when the request asked for the schedule. */
        freeSlots: t.array(TimeSlot)
    })
])
export type SchedulingDoctor = t.TypeOf<typeof SchedulingDoctor>

export const AccreditedClinic = t.intersection([
    t.type({
        id: t.string,
        erpId: nullable(t.string),
        name: t.string,
        cnpj: nullable(t.string),
        city: nullable(t.string),
        address: nullable(t.string),
        telephone: nullable(t.string),
        exams: t.array(t.type({ id: t.string, description: t.string }))
    }),
    t.partial({
        /** Present only when the request asked for the schedule. */
        freeSlots: t.array(TimeSlot)
    })
])
export type AccreditedClinic = t.TypeOf<typeof AccreditedClinic>

export const AdmissionAppointmentInput = t.intersection([
    t.type({
        /** Candidate key (`id` of POST /ttalk/person). */
        personId: t.string,
        estimatedDate: datetime
    }),
    t.partial({
        doctorId: t.string,
        accreditedId: t.string,
        occupation: t.string,
        department: t.string,
        costCenter: t.string
    })
])
export type AdmissionAppointmentInput = t.TypeOf<
    typeof AdmissionAppointmentInput
>

export const AdmissionAppointmentUpdate = t.intersection([
    t.type({
        id: t.string,
        estimatedDate: datetime
    }),
    t.partial({
        doctorId: t.string,
        accreditedId: t.string
    })
])
export type AdmissionAppointmentUpdate = t.TypeOf<
    typeof AdmissionAppointmentUpdate
>

export const AdmissionAppointment = t.type({
    id: t.string,
    estimatedDate: datetime,
    estimatedTime: t.number,
    doctorId: nullable(t.string),
    accreditedId: nullable(t.string),
    exams: t.array(t.type({ id: t.string, description: t.string }))
})
export type AdmissionAppointment = t.TypeOf<typeof AdmissionAppointment>

export const EmployeeQualification = t.type({
    trainings: t.array(
        t.type({
            id: t.string,
            erpId: nullable(t.string),
            description: t.string,
            esocialCode: nullable(t.string),
            completionDate: date,
            expirationDate: nullable(date)
        })
    ),
    fireBrigade: nullable(
        t.type({
            brigade: t.string,
            specificFunction: nullable(t.string),
            inclusionDate: date
        })
    ),
    cipa: nullable(
        t.type({
            mandate: t.string,
            startDate: date,
            endDate: nullable(date)
        })
    ),
    specificAptitudes: t.array(t.string),
    asoEmissionDate: nullable(datetime)
})
export type EmployeeQualification = t.TypeOf<typeof EmployeeQualification>
