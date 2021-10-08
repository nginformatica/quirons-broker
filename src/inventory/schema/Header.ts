import * as t from 'io-ts'
import { datetime } from '../../custom-types'

export function getHeader(message: string) {
    return t.intersection([
        t.type({
            UUID: t.string,
            Type: t.string,
            Transaction: t.literal(message),
            StandardVersion: t.string,
            SourceApplication: t.string,
            ProductName: t.string,
            ProductVersion: t.string,
            CompanyId: t.string,
            BranchId: t.string,
            GeneratedOn: datetime,
            DeliveryType: t.string,
            Event: t.string
        }),
        t.partial({
            SubType: t.string,
            Version: t.string,
            CompanySharingMode: t.string,
            BusinessUnitySharingMode: t.string,
            BranchSharingMode: t.string
        })
    ])
}