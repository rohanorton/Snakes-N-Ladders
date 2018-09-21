import Player from './Player'

type Board = Array<number>

class Game {
    private players: Array<Player> = []
    private currentPlayerIndex: number = 0

    constructor(private board: Board) {}

    public addPlayer(player: Player) {
        if (this.players.length >= 4) {
            throw new Error('Cannot exceed maximum number of players')
        }
        if (this.players.includes(player)) {
            throw new Error('Cannot add same player multiple times')
        }
        this.players.push(player)
    }

    public start() {
        if (this.players.length < 2) {
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
        if (distance < 1) {
            throw new Error()
        }
        if (distance > 6) {
            throw new Error()
        }
        const newPosition = this.board[player.position + distance]
        if (newPosition) {
            player.position = newPosition
        }
        if (distance !== 6) {
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
