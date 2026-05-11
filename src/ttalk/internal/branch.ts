import * as t from 'io-ts'

import { nullable } from '../../custom-types'

/**
 * TTalk schema OFICIAL TOTVS — Branch_v1_000.
 *
 * Endpoint: `GET /Branches` (com paginação `page`/`pageSize`).
 * Fonte canônica:
 *   https://github.com/totvs/ttalk-standard-message — apis/Branch_v1_000.json
 *   https://github.com/totvs/ttalk-standard-message — schemas/Branch_2_003.json
 *
 * Quírons usa esses tipos no broker para validar a resposta do ERP e mapear
 * para o shape interno camelCase (ver `broker/src/adapters/ttalk.ts`).
 */
export const BranchType = t.intersection([
    t.type({
        BranchInternalId: t.string,
        Code: t.string
    }),
    t.partial({
        CompanyCode: nullable(t.string),
        UnitOfBusiness: nullable(t.string),
        ParentCode: nullable(t.string),
        Description: nullable(t.string),
        EnterpriseGroup: nullable(t.string),
        Title: nullable(t.string),
        CGC: nullable(t.string),
        StateRegistration: nullable(t.string),
        DDD: nullable(t.string),
        Phone: nullable(t.string),
        Street: nullable(t.string),
        Complement: nullable(t.string),
        Neighborhood: nullable(t.string),
        State: nullable(t.string),
        City: nullable(t.string),
        ZipCode: nullable(t.string),
        CityCode: nullable(t.string),
        CNAECode: nullable(t.string),
        NatureCode: nullable(t.string),
        SubscriptionType: nullable(t.string)
    })
])
export type BranchType = t.TypeOf<typeof BranchType>

export const PagedBranches = t.intersection([
    t.type({
        items: t.array(BranchType)
    }),
    t.partial({
        hasNext: t.boolean
    })
])
export type PagedBranches = t.TypeOf<typeof PagedBranches>

/**
 * Shape interno do Quírons (camelCase) usado no protocolo de mensagens
 * entre broker e backend. O broker é responsável por mapear `BranchType`
 * (TOTVS PascalCase) para `ErpBranchInfo` antes de devolver o reply.
 */
export const ErpBranchInfo = t.intersection([
    t.type({
        id: t.string,
        code: t.string,
        companyId: t.string,
        name: t.string
    }),
    t.partial({
        companyName: nullable(t.string),
        cnpj: nullable(t.string),
        city: nullable(t.string),
        state: nullable(t.string)
    })
])
export type ErpBranchInfo = t.TypeOf<typeof ErpBranchInfo>

// Aliases legados mantidos pra retrocompat de imports em outros pacotes.
export const BranchInfo = ErpBranchInfo
export type BranchInfo = ErpBranchInfo
export const BranchListInfo = PagedBranches
export type BranchListInfo = PagedBranches
