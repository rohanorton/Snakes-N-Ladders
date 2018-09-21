import Player from './Player'
import assert from 'assert'

type Board = Array<number>

class Game {
    readonly DICE_MIN = 1
    readonly DICE_MAX = 6
    readonly MAX_PLAYERS = 4
    readonly MIN_PLAYERS = 2

    private players: Array<Player> = []
    private currentPlayerIndex: number = 0

    constructor(private board: Board) {}

    public addPlayer(player: Player) {
        assert(this.players.length < this.MAX_PLAYERS, 'Cannot exceed maximum number of players')
        assert(!this.players.includes(player), 'Cannot add same player multiple times')

        this.players.push(player)
    }

    public start() {
        assert(this.players.length >= this.MIN_PLAYERS, 'More players required to start game')
    }

    public move(player: Player, distance: number) {
        assert(player === this.currentPlayer, 'Cannot move player: not their turn')
        assert(!isNaN(distance), 'Distance cannot be NaN')
        assert(distance >= this.DICE_MIN, `Distance must be bigger than ${this.DICE_MIN}`)
        assert(distance <= this.DICE_MAX, `Distance must be smaller than ${this.DICE_MAX}`)

        const newPosition = this.board[player.position + distance]
        if (newPosition) {
            player.position = newPosition
        }
        if (distance !== this.DICE_MAX) {
            this.incrementPlayerIndex()
        }
    }

    public get currentPlayer(): Player {
        return this.players[this.currentPlayerIndex]
    }

    private incrementPlayerIndex() {
        const next = (this.currentPlayerIndex += 1)
        this.currentPlayerIndex = next % this.players.length
    }
}

export default Game
