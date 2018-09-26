import * as t from 'io-ts'

type AddPlayer = t.TypeOf<typeof AddPlayer>
const AddPlayer = t.type({
    command: t.literal('addPlayer'),
    clientId: t.string,
    name: t.string
})

type RemovePlayer = t.TypeOf<typeof RemovePlayer>
const RemovePlayer = t.type({
    command: t.literal('removePlayer'),
    clientId: t.string
})

type Start = t.TypeOf<typeof Start>
const Start = t.type({
    command: t.literal('start'),
    clientId: t.string
})

type Move = t.TypeOf<typeof Move>
const Move = t.type({
    command: t.literal('move'),
    clientId: t.string
})

// Tagged Unions give us slightly better performance
type Command = t.TypeOf<typeof Command>
const Command = t.taggedUnion('command', [AddPlayer, RemovePlayer, Start, Move])

export { Start, AddPlayer, RemovePlayer, Move, Command }
