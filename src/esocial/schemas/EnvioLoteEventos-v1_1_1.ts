/*
    This file was initially machine-generated by recycle/GENERATE.js, using
    eSocial's evtCAT.xsd schema, and includes corresponding io-ts types.

    EDIT WITH CARE.
*/
import * as t from 'io-ts'

// TODO: não deixa eu passar esse unknown no PR, por favor
/// Define os dados de um arquivo do eSocial (evento).
export const TArquivoEsocial = t.unknown

/// Define a identificação do transmissor.
export const TIdeTransmissor = t.type({
    tpInsc: t.union([
        t.literal(1),
        t.literal(2)
    ]),
    /// Número de Inscrição
    nrInsc: t.string
})

/// Define a identificação do empregador.
export const TIdeEmpregador = t.type({
    tpInsc: t.union([
        t.literal(1),
        t.literal(2)
    ]),
    /// Número de Inscrição
    nrInsc: t.string
})

/// Elemento raiz do eSocial.
export const eSocial = t.type({
    /// Representa um lote de eventos.
    envioLoteEventos: t.type({
        /// Identificação do empregador.
        ideEmpregador: TIdeEmpregador,
        /// Identificação do transmissor.
        ideTransmissor: TIdeTransmissor,
        /// Contém a relação de eventos que compõe o lote.
        eventos: t.type({
            evento: TArquivoEsocial
        })
    })
})

export type eSocial = t.TypeOf<typeof eSocial>
