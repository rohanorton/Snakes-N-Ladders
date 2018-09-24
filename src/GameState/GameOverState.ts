import Player from '../Player'
import Game from '../Game'
import IGameState from './IGameState'

class GameOverState implements IGameState {
    constructor(private game: Game, public winner: Player) {}

    public addPlayer(player: Player) {
        throw new Error('Cannot add more players: game over')
    }

    public removePlayer(player: Player) {
        const index = this.game.players.indexOf(player)
        if (index > -1) {
            this.game.players.splice(index, 1)
        }
    }

    public start() {
        this.game.setStarted()
    }

    public move(player: Player, distance: number) {
        throw new Error('Cannot move: game over')
    }
}

export default GameOverState
