import { types } from 'mobx-state-tree'

export const Player = types
    .model('Player', {
        id: types.identifier,
        position: types.integer,
        color: types.string
    })
    .views(self => ({}))
    .actions(self => ({
        move(moveTo: number, final: number) {
            if (self.position < moveTo) {
                self.position += 1
                setTimeout(() => {
                    this.move(moveTo, final)
                }, 500)
            } else {
                self.position = final
            }
        }
    }))
