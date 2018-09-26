import WebServer from './WebServer'

const srv = new WebServer()
const app = srv.app
srv.listen()

export { app }
