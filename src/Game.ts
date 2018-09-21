import Player from './Player'

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
        if (this.players.length >= this.MAX_PLAYERS) {
            throw new Error('Cannot exceed maximum number of players')
        }
        if (this.players.includes(player)) {
            throw new Error('Cannot add same player multiple times')
        }
        this.players.push(player)
    }

    public start() {
        if (this.players.length < this.MIN_PLAYERS) {
            throw new Error('More players required to start game')
        }
    }

    public move(player: Player, distance: number) {
        if (player !== this.currentPlayer) {
            throw new Error('Cannot move player: not their turn')
        }
        if (isNaN(distance)) {
            throw new Error()
        }
        if (distance < this.DICE_MIN) {
            throw new Error()
        }
        if (distance > this.DICE_MAX) {
            throw new Error()
        }
        const newPosition = this.board[player.position + distance]
        if (newPosition) {
            player.position = newPosition
        }
        if (distance !== this.DICE_MAX) {
            this.incrementPlayerIndex()
        }
    }

    private get currentPlayer(): Player {
        return this.players[this.currentPlayerIndex]
    }

    private incrementPlayerIndex() {
        this.currentPlayerIndex += 1
    }
}

export default Game
