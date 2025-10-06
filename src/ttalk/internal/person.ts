import * as t from 'io-ts'

import * as ttalk from '../'
import { datetime, nullable } from '../../custom-types'

/**
 * Our internal model for people.
 */
export const Person = t.intersection([
    t.type({
        erpId: t.string,
        name: t.string,
        birth: datetime,
        gender: t.number,
        cpf: t.string
    }),
    t.partial({
        erpCompany: nullable(t.string),
        erpBranch: t.union([t.string, t.null, t.literal(false)]),
        companyId: nullable(t.string),
        branchId: t.union([t.string, t.null, t.literal(false)]),
        socialName: nullable(t.string),
        registration: nullable(t.string),
        rg: nullable(t.string),
        email: nullable(t.string),
        street: nullable(t.string),
        number: nullable(t.union([t.string, t.number])),
        district: nullable(t.string),
        city: nullable(t.string),
        zipCode: nullable(t.string),
        phone: nullable(t.string),
        created_at: nullable(datetime),
        updated_at: nullable(datetime),
        erpWorkshift: nullable(t.string),
        workshiftDescription: nullable(t.string),
        erpCostCenter: nullable(t.string),
        costCenterDescription: nullable(t.string),
        erpOccupation: nullable(t.string),
        occupationDescription: nullable(t.string),
        erpDepartment: nullable(t.string),
        departmentDescription: nullable(t.string),
        external: nullable(t.boolean),
        situation: nullable(t.number),
        admissionDate: nullable(datetime),
        dismissalDate: nullable(datetime),
        lastExamDate: nullable(datetime)

    })
])
export type Person = t.TypeOf<typeof Person>

/**
 * Standard message converter.
 */
export const Converter = {
    fromTTalk(data: ttalk.Person): Person {
        return {
            erpId: data.id,
            name: data.name,
            socialName: data.socialName,
            birth: data.birth,
            gender: data.gender,
            rg: data.rg,
            cpf: data.cpf,
            email: data.email,
            street: data.street,
            number: data.number,
            district: data.district,
            city: data.city,
            zipCode: data.zipCode,
            phone: data.phone,
            erpWorkshift: data.workshift,
            workshiftDescription: data.workshiftDescription,
            erpCostCenter: data.costCenter,
            costCenterDescription: data.costCenterDescription,
            erpOccupation: data.occupation,
            occupationDescription: data.occupationDescription,
            erpDepartment: data.department,
            departmentDescription: data.departmentDescription,
            external: data.external,
            situation: data.situation,
            registration: data.registration,
            admissionDate: data.admissionDate,
            dismissalDate: data.dismissalDate ? data.dismissalDate : undefined,
            lastExamDate: data.lastExamDate
        }
    },
    toTTalk(data: Person): ttalk.Person {
        return {
            id: data.erpId,
            name: data.name,
            birth: data.birth,
            gender: data.gender,
            cpf: data.cpf,
            socialName: data.socialName ?? undefined,
            rg: data.rg ?? undefined,
            email: data.email ?? undefined,
            street: data.street ?? undefined,
            number: data.number ?? undefined,
            district: data.district ?? undefined,
            city: data.city ?? undefined,
            zipCode: data.zipCode ?? undefined,
            phone: data.phone ?? undefined,
            workshift: data.erpWorkshift,
            workshiftDescription: data.workshiftDescription ?? undefined,
            costCenter: data.erpCostCenter,
            costCenterDescription: data.costCenterDescription ?? undefined,
            occupation: data.erpOccupation,
            occupationDescription: data.occupationDescription ?? undefined,
            department: data.erpDepartment ?? undefined,
            departmentDescription: data.departmentDescription ?? undefined,
            external: data.external ?? undefined,
            situation: data.situation ?? undefined,
            registration: data.registration ?? undefined,
            admissionDate: data.admissionDate ?? undefined,
            dismissalDate: data.dismissalDate ?? undefined,
            lastExamDate: data.lastExamDate ?? undefined
        }
    }
}
