import Player from '../Player'
import Game from '../Game'
import IGameState from './IGameState'

class GameOverState implements IGameState {
    constructor(private game: Game, public winner: Player) {}

    public addPlayer(player: Player) {
        throw new Error('Cannot add more players: game over')
    }

    public start() {
        // TODO: should restart game?
    }

    public move(player: Player, distance: number) {
        throw new Error('Cannot move: game over')
    }
}

export default GameOverState
