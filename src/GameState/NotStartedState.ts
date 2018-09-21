import Player from '../Player'
import Game from '../Game'
import IGameState from './IGameState'
import assert from 'assert'

class NotStartedState implements IGameState {
    constructor(private game: Game) {}

    public addPlayer(player: Player) {
        const { MAX_PLAYERS } = this.game

        assert(this.game.players.length < MAX_PLAYERS, 'Cannot exceed maximum number of players')
        assert(!this.game.players.includes(player), 'Cannot add same player multiple times')

        this.game.players.push(player)
    }

    public start() {
        const { MIN_PLAYERS } = this.game

        assert(this.game.players.length >= MIN_PLAYERS, 'More players required to start game')

        this.game.setStarted()
    }

    public move(player: Player, distance: number) {
        throw new Error('Cannot move: game not started')
    }
}

export default NotStartedState
