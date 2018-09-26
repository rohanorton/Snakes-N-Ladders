import GameServer from './GameServer'
import Connection from './Connection'
import { Server } from 'http'
import socketIO = require('socket.io')

class SocketHandler {
    private io: SocketIO.Server
    private gameServer: GameServer = new GameServer()

    constructor(server: Server) {
        this.io = socketIO(server)
        this.io.on('connection', (socket: SocketIO.Socket) => {
            new Connection(socket, this.gameServer)
        })
    }
}

export default SocketHandler
