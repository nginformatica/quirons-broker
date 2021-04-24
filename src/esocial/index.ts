import * as t from 'io-ts'

import { eSocial as evtCAT } from './schemas/evtCAT'
import { eSocial as evtMonit } from './schemas/evtMonit'
import { eSocial as evtExpRisco } from './schemas/evtExpRisco'
import { eSocial as evtExclusao } from './schemas/evtExclusao'
import { eSocial as evtInfoEmpregador } from './schemas/evtInfoEmpregador'

export {
    evtCAT,
    evtMonit,
    evtExpRisco,
    evtExclusao,
    evtInfoEmpregador
}

export type evtCAT = t.TypeOf<typeof evtCAT>

export type evtMonit = t.TypeOf<typeof evtMonit>

export type evtExpRisco = t.TypeOf<typeof evtExpRisco>

export type evtExclusao = t.TypeOf<typeof evtExclusao>

export type evtInfoEmpregador = t.TypeOf<typeof evtInfoEmpregador>

export type eSocialObject =
    | t.TypeOf<typeof evtCAT>
    | t.TypeOf<typeof evtMonit>
    | t.TypeOf<typeof evtExpRisco>
    | t.TypeOf<typeof evtExclusao>
    | t.TypeOf<typeof evtInfoEmpregador>

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
