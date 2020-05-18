// Generated from totvs-ttalk-standard-message/Classes_2_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'

export const ClassInfo = t.intersection([
    t.type({
        /** Código da Empresa */
        companyId: t.string,
        /** Nome da Turma */
        name: t.string
    }),
    t.partial({
        /** Chave única do registro dentro da entidade */
        id: t.string,
              /** Código da Filial */
        branchId: t.string,
        /** Código da turma */
        classCode: t.string,
        /** Código eSocial */
        esocialTrainingCode: t.string
    })
])
export type ClassInfo = t.TypeOf<typeof ClassInfo>

export const Classes = t.partial({
  items: t.array(ClassInfo)
})
export type Classes = t.TypeOf<typeof Classes>

export const PagedClasses = t.intersection([
  Paging,
  Classes
])
export type PagedClasses = t.TypeOf<typeof PagedClasses>

