// Generated from jsonschema/schemas/TrainingNecessity_1_000.json
import * as t from 'io-ts'
import { Paging } from '../apis/types/totvsApiTypesBase'

export const TrainingNecessityInfo = t.intersection([
    t.type({
      /** Codigo da Empresa */
      companyId: t.string,
      /** Codigo Identificador do Funcionario */
      employeeId: t.string,
    }),
    t.partial({
      /** Chave unica do registro de treinamento */
      id: t.string,
      /** Codigo da Filial */
      branchId: t.string,
      /** Codigo da Necessidade de Treinamento */
      trainingNecessityCode: t.string,
      /** Motivo da necessidade de treinamento */
      reason: t.string,
      /** Urgência da Necessidade de Treinamento */
      urgency: t.string,
      /** Responsável pelo PPRA */
      hazardTechnicalResponsible: t.string
    })
])
export type TrainingNecessityInfo = t.TypeOf<typeof TrainingNecessityInfo>

export const PagedTrainingNecessity = t.intersection([
  Paging,
  t.type({
    items: t.array(TrainingNecessityInfo)
  })
])
export type PagedTrainingNecessity = t.TypeOf<typeof PagedTrainingNecessity>
