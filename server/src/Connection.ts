import uuid from 'uuid'
import socketIO = require('socket.io')
import GameServer from './GameServer'
import GameInstance from './GameInstance'
import { Command } from './Command'
import { Event } from './Event'
import { Subscription } from 'rxjs'

class Connection {
    private clientId: string
    private gameId?: string
    private subscription?: Subscription

    constructor(private socket: SocketIO.Socket, private gameServer: GameServer) {
        // Assign User ID
        this.clientId = uuid.v4()
        this.socket.emit('handshake', this.clientId)

        this.socket.on('createGame', () => {
            const game = this.gameServer.createGame(this.clientId)
            this.handleGame(game)
        })

        this.socket.on('joinGame', (gameId: string) => {
            try {
                const game = this.gameServer.joinGame(this.clientId, gameId)
                this.handleGame(game)
            } catch (err) {
                this.socket.emit('serverError', err.message)
            }
        })

        socket.on('command', (msg: any) => {
            console.log(msg)
            try {
                const decoded = Command.decode(msg)
                if (!this.gameId) {
                    throw new Error('No game associated with connection')
                }
                const gameId = this.gameId

                decoded.map(cmd => this.gameServer.handleCommand(this.clientId, gameId, cmd))

                if (decoded.isLeft()) {
                    console.log('Unknown command:', msg)
                    throw new Error(`Unknown command ${msg}`)
                }
            } catch (err) {
                this.socket.emit('serverError', err.message)
            }
        })

        socket.on('disconnect', () => {
            try {
                if (this.subscription) {
                    this.subscription.unsubscribe()
                }
                this.gameServer.disconnect(this.clientId)
            } catch (e) {}
        })
    }

    private handleGame(game: GameInstance) {
        this.gameId = game.id
        // Just to be on the safe-side, unsubscribe from any existing subscriptions
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
        this.subscription = game.events.subscribe(ev => {
            console.log('Event:', ev)
            this.socket.emit('event', ev)
        })
    }
}

export default Connection
