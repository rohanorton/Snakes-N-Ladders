import Player from '../Player'
import Game from '../Game'
import IGameState from './IGameState'
import assert from 'assert'

class InplayState implements IGameState {
    private currentPlayerIndex = 0

    constructor(private game: Game) {}

    public addPlayer(player: Player) {
        throw new Error('Cannot add player: game in play')
    }

    public removePlayer(player: Player) {
        const index = this.game.players.indexOf(player)
        if (index > -1) {
            this.game.players.splice(index, 1)
        }
        // If all but one player leaves the game, the final player is by
        // default the winner
        if (this.game.players.length === 1) {
            const winner = this.game.players[0]
            this.game.setWinner(winner)
        }
    }

    public start() {
        throw new Error('Cannot start game: game in play')
    }

    public move(player: Player, distance: number) {
        const { DICE_MAX, DICE_MIN } = this.game

        assert(player === this.currentPlayer, 'Cannot move player: not their turn')
        assert(!isNaN(distance), 'Distance cannot be NaN')
        assert(distance >= DICE_MIN, `Distance must be bigger than ${DICE_MIN}`)
        assert(distance <= DICE_MAX, `Distance must be smaller than ${DICE_MAX}`)

        const newPosition = this.game.board.getPosition(player.position + distance)
        if (newPosition) {
            player.position = newPosition
        }

        if (this.winner) {
            this.game.setWinner(this.winner)
        }

        if (distance !== DICE_MAX) {
            this.incrementPlayerIndex()
        }
    }

    public get currentPlayer(): Player {
        return this.game.players[this.currentPlayerIndex]
    }

    public get winner(): Player | undefined {
        return this.game.players.find(player => player.position === this.game.board.last)
    }

    private incrementPlayerIndex() {
        const next = (this.currentPlayerIndex += 1)
        this.currentPlayerIndex = next % this.game.players.length
    }
}

export default InplayState
