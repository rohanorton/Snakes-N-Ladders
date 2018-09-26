import * as t from 'io-ts'

const Player = t.any

type GameCreated = t.TypeOf<typeof GameCreated>
const GameCreated = t.type({
    event: t.literal('gameCreated'),
    gameId: t.string
})
type PlayerAdded = t.TypeOf<typeof PlayerAdded>
const PlayerAdded = t.type({
    event: t.literal('playerAdded'),
    player: Player
})

type PlayerRemoved = t.TypeOf<typeof PlayerRemoved>
const PlayerRemoved = t.type({
    event: t.literal('playerRemoved'),
    player: Player
})

type Started = t.TypeOf<typeof Started>
const Started = t.type({
    event: t.literal('started'),
    nextMove: Player
})

type Moved = t.TypeOf<typeof Moved>
const Moved = t.type({
    event: t.literal('moved'),
    // clientId: t.string,
    player: Player,
    moveAmount: t.number,
    nextMove: Player
})

type GameWon = t.TypeOf<typeof GameWon>
const GameWon = t.type({
    event: t.literal('gameWon'),
    winner: Player
})

type Event = t.TypeOf<typeof Event>
const Event = t.taggedUnion('event', [
    GameCreated,
    PlayerAdded,
    PlayerRemoved,
    Started,
    Moved,
    GameWon
])

export { GameCreated, Started, PlayerAdded, PlayerRemoved, Moved, GameWon, Event }
