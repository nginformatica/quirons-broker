// Automatically generated from jsonschema/apis/types/totvsApiTypesBase.json
import * as t from 'io-ts'

export const ErrorModelBase = t.intersection([
  t.type({
    /** Código identificador do erro. */
    code: t.string,
    /** Literal no idioma da requisição descrevendo o erro para o usuário. */
    message: t.string,
    /** Mensagem técnica e mais detalhada do erro. */
    detailedMessage: t.string
  }),
  t.partial({
    /** URI para documentação do erro. */
    helpUrl: t.string
  })
])
export type ErrorModelBase = t.TypeOf<typeof ErrorModelBase>

export const ErrorDetail = t.partial({
  details: t.array(ErrorModelBase)
})
export type ErrorDetail = t.TypeOf<typeof ErrorDetail>

export const ErrorModel = t.intersection([
  ErrorModelBase,
  ErrorDetail
])
export type ErrorModel = t.TypeOf<typeof ErrorModel>

export const ExpandablesType = t.partial({
  _expandables: t.array(t.string)
})
export type ExpandablesType = t.TypeOf<typeof ExpandablesType>

export const Paging = t.intersection([
  t.type({
    hasNext: t.boolean
  }),
  t.partial({
    totalAmount: t.number,
    amount: t.number,
  })
])

export type Paging = t.TypeOf<typeof Paging>

