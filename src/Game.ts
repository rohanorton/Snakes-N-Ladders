import Player from './Player'

type Board = Array<number>

class Game {
    private players: Array<Player> = []

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
}

export default Game
