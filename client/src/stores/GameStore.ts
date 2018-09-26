import { types, getParent } from 'mobx-state-tree'
import { Player } from './PlayerStore'
import { Root } from './RootStore'

interface IPlayer {
    name: string
    position: number
    color: string
}

export const Game = types
    .model('Game', {
        gameId: types.string,
        clientId: types.string,
        isStarted: false,
        currentPlayer: types.maybe(types.string),
        players: types.array(Player),
        rolled: types.maybe(types.number),
        isFull: false
    })
    .views(self => ({
        get yourTurn() {
            return self.currentPlayer === self.clientId
        },
        get youWin() {
            return this.winner && this.winner.id === self.clientId
        },
        get youLose() {
            return this.winner && this.winner.id !== self.clientId
        },
        get winner() {
            return self.players.find(x => x.position == 100)
        }
    }))
    .actions(self => ({
        start() {
            const root: any = getParent(self)
            root.startGame()
        },

        move() {
            const root: any = getParent(self)
            root.move()
        },

        setGameFull() {
            self.isFull = true
        },
        // Events

        playerAdded(player: IPlayer) {
            const p = Player.create({
                id: player.name,
                position: player.position,
                color: player.color
            })
            self.players.push(p)
        },

        playerRemoved(player: IPlayer) {
            const p = self.players.find(p => p.id === player.name)
            if (p) {
                self.players.splice(self.players.indexOf(p), 1)
            }
        },

        started(player: IPlayer) {
            self.currentPlayer = player.name
            console.log('current player set:', self.currentPlayer)
            self.isStarted = true
            console.log('is started set:', self.isStarted)
        },

        gameWon(player: IPlayer) {
            self.currentPlayer = undefined
            self.isStarted = false
        },

        moved(player: IPlayer, amount: number, nextMove: IPlayer) {
            self.rolled = amount
            const p = self.players.find(p => p.id === player.name)
            if (p) {
                p.move(p.position + amount, player.position)
            }
            self.currentPlayer = nextMove.name
        }
    }))
