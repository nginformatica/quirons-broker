import * as t from 'io-ts'

import * as ttalk from '../'
import { datetime, nullable } from '../custom-types'

import { Person } from './person'

/**
 * Our internal model for employees.
 */
export const Employee = t.intersection([
    Person,
    t.type({
        registration: t.string,
        erpWorkshift: t.string,
        erpCostCenter: t.string,
        erpOccupation: t.string
    }),
    t.partial({
        workshiftDescription: nullable(t.string),
        costCenterDescription: nullable(t.string),
        occupationDescription: nullable(t.string),
        erpDepartment: nullable(t.string),
        departmentDescription: nullable(t.string),
        admissionDate: nullable(datetime),
        dismissalDate: nullable(datetime),
        pisCode: nullable(t.string),
        eSocialRoleId: nullable(t.string),
        eSocialId: nullable(t.string),
        sefipCategory: nullable(t.string),
        situation: nullable(t.number)
    })
])
export type Employee = t.TypeOf<typeof Employee>

/**
 * Standard message converter.
 */
export const Converter = {
    fromTTalk(data: ttalk.Employee): Employee {
        return {
            erpId: data.id,
            registration: data.registration,
            name: data.name,
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
            admissionDate: data.admissionDate,
            dismissalDate: data.dismissalDate,
            pisCode: data.pisCode,
            eSocialRoleId: data.eSocialRoleId,
            eSocialId: data.eSocialId,
            sefipCategory: data.sefipCategory,
            situation: data.situation
        }
    },
    toTTalk(data: Employee): ttalk.Employee {
        return {
            id: data.erpId,
            registration: data.registration,
            name: data.name,
            birth: data.birth,
            gender: data.gender,
            rg: data.rg ?? undefined,
            cpf: data.cpf,
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
            admissionDate: data.admissionDate ?? undefined,
            dismissalDate: data.dismissalDate ?? undefined,
            pisCode: data.pisCode ?? undefined,
            eSocialRoleId: data.eSocialRoleId ?? undefined,
            eSocialId: data.eSocialId ?? undefined,
            sefipCategory: data.sefipCategory ?? undefined,
            situation: data.situation ?? undefined
        }
    }
}
