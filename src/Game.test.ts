import assert from 'assert'
import Game from './Game'
import Player from './Player'

describe('Game', () => {
    it('exists', () => {
        assert(Game)
    })

    it('can be constructed when passed a board', () => {
        const board = [0, 1, 2, 3, 4, 5]
        new Game(board)
    })

    describe('addPlayer()', () => {
        let game: Game

        beforeEach(() => {
            const board = [0, 1, 2, 3, 4, 5]
            game = new Game(board)
        })

        it('exists', () => {
            assert(game.addPlayer)
        })

        it('can be passed player', () => {
            const anna = new Player('Anna')
            game.addPlayer(anna)
        })

        it('throws receiving same player twice', () => {
            const anna = new Player('Anna')
            game.addPlayer(anna)
            assert.throws(() => game.addPlayer(anna), /Cannot add same player multiple times/)
        })

        it('throws error if addPlayer called more than 4 times', () => {
            const daria = new Player('Daria')
            const edward = new Player('Edward')
            const frances = new Player('Frances')
            const graham = new Player('Graham')
            const harris = new Player('Harris')

            game.addPlayer(daria)
            game.addPlayer(edward)
            game.addPlayer(frances)
            game.addPlayer(graham)

            assert.throws(() => game.addPlayer(harris), /Cannot exceed maximum number of players/)
        })
    })
})
