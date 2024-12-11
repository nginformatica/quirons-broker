// Generated from totvs-ttalk-standard-message/Sick_Note_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'
import { nullable } from '../../custom-types'

export const PreMedicalCertificateInfo = t.intersection([
    t.type({
        id: t.string,
        employeeId: t.string,
        startDate: t.string,
        endDate: t.string,
        observation: nullable(t.string)
    }),
    t.partial({
        companyId: t.string,
        branchId: t.string,
        attachment: t.union([
            t.type({
                file: t.string,
                name: t.string,
                type: t.string,
                length: t.number
            }),
            t.null,
            t.string
        ]),
        status: t.string
    }),
])

export type PreMedicalCertificate = t.TypeOf<typeof PreMedicalCertificateInfo>

export const PagedPreMedicalCertificate = t.intersection([
    Paging,
    t.type({
        items: t.array(PreMedicalCertificateInfo)
    })
])
export type PagedPreMedicalCertificate = t.TypeOf<typeof PagedPreMedicalCertificate>

