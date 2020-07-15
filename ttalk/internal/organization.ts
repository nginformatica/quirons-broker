import * as t from 'io-ts'

/**
 * Our internal model for organization.
 */
export const Organization = t.partial({
    erpId: t.string,
    socialName: t.string,
    documentNumber: t.string,
    email: t.string,
    cnae: t.string
})
export type Organization = t.TypeOf<typeof Organization>
