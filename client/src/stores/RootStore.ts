import { types } from 'mobx-state-tree'
import { Game } from './GameStore'

import socketIo from 'socket.io-client'
let io: SocketIOClient.Socket

export const Root = types
    .model('Root', {
        game: types.maybe(Game),
        clientId: types.maybe(types.string),
        code: ''
    })
    .views(self => ({}))
    .actions(self => ({
        handshake(clientId: string) {
            self.clientId = clientId
        },

        gameCreated(gameId: string) {
            if (!self.clientId) {
                throw new Error('Unable to create game without clientId')
            }
            self.game = Game.create({
                gameId: gameId,
                currentPlayer: undefined,
                clientId: self.clientId,
                players: []
            })
            io.emit('command', {
                command: 'addPlayer',
                name: self.clientId,
                clientId: self.clientId
            })
        },

        setGameFullMessage() {
            self.game && self.game.setGameFull()
        },

        init() {
            io = socketIo('ws://localhost:4000')
            io.on('connect', (socket: SocketIOClient.Socket) => {
                console.log('Connect')
            })

            io.on('error', console.warn)
            io.on('serverError', (err: string) => {
                if (err === 'Cannot exceed maximum number of players') {
                    this.setGameFullMessage()
                }
                console.warn(err)
            }),
                io.on('handshake', (clientId: string) => {
                    this.handshake(clientId)
                })

            io.on('event', (msg: any) => {
                this.handleEvent(msg)
            })
        },

        handleEvent(msg: any) {
            const game = self.game
            if (msg.event === 'gameCreated') {
                return this.gameCreated(msg.gameId)
            }
            if (!game) {
                throw new Error('Cannot handle event, no game')
            }
            switch (msg.event) {
                case 'playerAdded':
                    return game.playerAdded(msg.player)
                case 'playerRemoved':
                    return game.playerRemoved(msg.player)
                case 'moved':
                    return game.moved(msg.player, msg.moveAmount, msg.nextMove)
                case 'started':
                    return game.started(msg.nextMove)
                case 'gameCreated':
                    return // Don't really have anything to do here
                default:
                    console.log('Unknown event', msg)
            }
        },

        storeCode(e: any) {
            self.code = e.target.value
        },

        createGame() {
            io.emit('createGame')
        },

        joinGame() {
            io.emit('joinGame', self.code)
            self.code = ''
        },

        startGame() {
            io.emit('command', { command: 'start', clientId: self.clientId })
        },

        move() {
            io.emit('command', { command: 'move', clientId: self.clientId })
        }
    }))
