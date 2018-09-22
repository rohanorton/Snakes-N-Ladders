import Player from './Player'
import Board from './Board'
import assert from 'assert'
import IGameState from './GameState/IGameState'
import NotStartedState from './GameState/NotStartedState'
import InplayState from './GameState/InplayState'
import GameOverState from './GameState/GameOverState'

class Game {
    readonly DICE_MIN = 1
    readonly DICE_MAX = 6
    readonly MAX_PLAYERS = 4
    readonly MIN_PLAYERS = 2

    private state: IGameState = new NotStartedState(this)

    public board: Board
    public players: Array<Player> = []

    constructor(board: Array<number>) {
        this.board = new Board(board)
    }

    public setStarted() {
        this.state = new InplayState(this)
    }

    public setWinner(winner: Player) {
        this.state = new GameOverState(this, winner)
    }

    public addPlayer(player: Player) {
        this.state.addPlayer(player)
    }

    public removePlayer(player: Player) {
        this.state.removePlayer(player)
    }

    public start() {
        this.state.start()
    }

    public move(player: Player, distance: number) {
        this.state.move(player, distance)
    }

    public get currentPlayer(): Player | undefined {
        return this.state.currentPlayer
    }

    public get winner(): Player | undefined {
        return this.state.winner
    }

    public get hasPlayers(): boolean {
        return this.players.length > 0
    }
}

export default Game
