import { types } from 'mobx-state-tree'

export const Player = types
    .model('Player', {
        id: types.identifier,
        position: types.integer,
        color: types.string
    })
    .views(self => ({}))
    .actions(self => ({
        move() {
            const amount = Math.ceil(Math.random() * 6)
            self.position += amount
        }
    }))
