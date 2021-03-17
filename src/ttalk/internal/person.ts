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
        updated_at: nullable(datetime)
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
            phone: data.phone
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
            phone: data.phone ?? undefined
        }
    }
}
