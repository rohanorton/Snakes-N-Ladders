import { types } from 'mobx-state-tree'
import { Player } from './PlayerStore'

export const Game = types
    .model('Game', {
        players: types.array(Player),
        current: types.number
    })
    .views(self => ({}))
    .actions(self => ({
        addPlayer() {},
        removePlayer() {},
        start() {},
        move() {
            // Random roll functionality for testing
            const i = self.current
            self.current = (self.current + 1) % self.players.length
            const player = self.players[i]
            if (player) player.move()
        }
    }))
