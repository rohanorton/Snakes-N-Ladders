import Player from '../Player'

interface IGameState {
    start(): void
    addPlayer(player: Player): void
    move(player: Player, distance: number): void
    currentPlayer?: Player
    winner?: Player
}

export default IGameState
