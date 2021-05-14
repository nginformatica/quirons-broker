import * as t from 'io-ts'

import { eSocial as evtCAT } from './schemas/evtCAT'
import { eSocial as evtMonit } from './schemas/evtMonit'
import { eSocial as evtExpRisco } from './schemas/evtExpRisco'
import { eSocial as evtExclusao } from './schemas/evtExclusao'
import { eSocial as evtInfoEmpregador } from './schemas/evtInfoEmpregador'
import { eSocial as EnvioLote } from './schemas/EnvioLoteEventos-v1_1_1'
import { T_ideEmpregador } from './schemas/tipos'

export {
    evtCAT,
    evtMonit,
    evtExpRisco,
    evtExclusao,
    evtInfoEmpregador,
    EnvioLote
}

export const IdeEmpregador = T_ideEmpregador

export type IdeEmpregador = t.TypeOf<typeof T_ideEmpregador>

export type eSocialObject =
    | evtCAT
    | evtMonit
    | evtExpRisco
    | evtExclusao
    | evtInfoEmpregador

export type eSocialKey = Keys<eSocialObject>

export type eSocialBody = Values<eSocialObject>

export type ProductionReady = {
    ideEvento: {
        tpAmb: 1
    }
}

export type ProductionRestricted = {
    ideEvento: {
        tpAmb: 2
    }
}

// Quick hack: conditionals work as a map over unions
type Keys<T> = T extends T ? keyof T : never;
type Values<T> = T extends T ? T[keyof T] : never

export function isProductionReady<T extends eSocialBody>(
    obj: T
): obj is T & ProductionReady {
    return obj.ideEvento.tpAmb === 1
}

export function isProductionRestricted<T extends eSocialBody>(
    obj: T
): obj is T & ProductionReady {
    return obj.ideEvento.tpAmb === 2
}
