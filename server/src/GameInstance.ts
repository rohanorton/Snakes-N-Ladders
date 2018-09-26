import Game from './Game/Game'
import { board } from './Game/Board'
import Player from './Game/Player'
import { ReplaySubject } from 'rxjs'
import { Event } from './Event'
import { shuffle } from 'lodash'

class GameInstance {
    readonly id: string
    private players: Map<string, Player> = new Map()
    private game: Game
    public events: ReplaySubject<Event> = new ReplaySubject()
    private colors: Array<string>

    constructor(id: string) {
        this.game = new Game(board)
        this.id = id
        this.events.next({ event: 'gameCreated', gameId: id })
        this.colors = shuffle(['red', 'green', 'yellow', 'blue', 'hotpink', 'purple', 'orange'])
    }

    public start() {
        this.game.start()
        this.events.next({ event: 'started', nextMove: this.game.currentPlayer })
    }

    public move(clientId: string) {
        const player = this.players.get(clientId)
        if (!player) {
            throw new Error('Client has no player to move')
        }
        const amount = Math.ceil(Math.random() * 6)
        this.game.move(player, amount)
        this.events.next({
            event: 'moved',
            player: player,
            moveAmount: amount,
            nextMove: this.game.currentPlayer
        })
        this.sendWinningEvent()
    }

    public addPlayer(clientId: string, name: string) {
        if (this.players.has(clientId)) {
            throw new Error('Client already has a player')
        }
        const player = new Player(name)
        player.color = this.colors.pop() || 'black'
        this.game.addPlayer(player)
        this.players.set(clientId, player)
        this.events.next({ event: 'playerAdded', player: player })
    }

    public removePlayer(clientId: string) {
        const player = this.players.get(clientId)
        if (!player) {
            throw new Error('Client has no player to remove')
        }
        this.game.removePlayer(player)
        this.players.delete(clientId)
        this.events.next({ event: 'playerRemoved', player: player })
        this.sendWinningEvent()
    }

    private sendWinningEvent() {
        if (this.game.winner) {
            this.events.next({
                event: 'gameWon',
                winner: this.game.winner
            })
        }
    }

    public get isEmpty() {
        return this.players.size === 0
    }
}

export default GameInstance
