import GameInstance from './GameInstance'
import { Command } from './Command'
import uuid from 'uuid'

class GameServer {
    private games: Map<string, GameInstance> = new Map()
    private userGameMap: Map<string, GameInstance> = new Map()

    public handleCommand(clientId: string, gameId: string, cmd: Command) {
        if (clientId !== cmd.clientId) {
            throw new Error('Client ID does not match')
        }
        const game = this.games.get(gameId)
        if (!game) {
            throw new Error('Game ID does not have corresponding game')
        }
        switch (cmd.command) {
            case 'addPlayer':
                return game.addPlayer(clientId, cmd.name)
            case 'removePlayer':
                return game.removePlayer(clientId)
            case 'start':
                return game.start()
            case 'move':
                return game.move(clientId)
            default:
                // Prove that our switch statement is exhaustive
                assertNever(cmd)
        }
    }

    public createGame(userId: string) {
        const gameId = uuid.v4()
        const game = new GameInstance(gameId)
        this.games.set(gameId, game)
        this.userGameMap.set(userId, game)
        return game
    }

    public joinGame(userId: string, gameId: string) {
        const game = this.games.get(gameId)
        if (!game) throw new Error(`No game matching ID: ${gameId}`)
        this.userGameMap.set(userId, game)
        return game
    }

    public disconnect(clientId: string) {
        const game = this.userGameMap.get(clientId)
        if (game) {
            game.removePlayer(clientId)
            if (game.isEmpty) {
                this.games.delete(game.id)
            }
            this.userGameMap.delete(clientId)
        }
    }
}

function assertNever(x: never): never {
    throw new Error('This code should be unreachable!')
}

export default GameServer
