import { createServer, Server } from 'http'
import express = require('express')
import SocketHandler from './SocketHandler'
import cors from 'cors'

class WebServer {
    public app: express.Application
    private server: Server
    private socketHandler: SocketHandler

    constructor(readonly port: number = 4000) {
        this.app = express()
        this.app.use(cors())
        this.app.options('*', cors())
        this.server = createServer(this.app)
        this.socketHandler = new SocketHandler(this.server)
    }

    public listen() {
        this.server.listen(this.port, () => {
            console.log(`Listening`)
        })
    }
}

export default WebServer
