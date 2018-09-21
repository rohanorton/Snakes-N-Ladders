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

    describe('start()', () => {
        let game: Game

        beforeEach(() => {
            const board = [0, 1, 2, 3, 4, 5]
            game = new Game(board)
        })

        it('exists', () => {
            assert(game.start)
        })

        it('throws error if attempting to start without adding two or more players', () => {
            const pam = new Player('Pam')
            game.addPlayer(pam)
            assert.throws(() => game.start(), /More players required to start game/)
        })

        it('succeeds if more than two players', () => {
            const ahmed = new Player('Ahmed')
            const bruno = new Player('Bruno')
            game.addPlayer(ahmed)
            game.addPlayer(bruno)
            game.start()
        })
    })

    describe('move()', () => {
        let game: Game
        let adam: Player
        let barb: Player
        let chris: Player

        beforeEach(() => {
            const board = [0, 1, 5, 3, 4, 5, 3, 7]

            adam = new Player('Adam')
            barb = new Player('Barb')
            chris = new Player('Chris')

            game = new Game(board)
            game.addPlayer(adam)
            game.addPlayer(barb)
            game.addPlayer(chris)

            game.start()
        })

        it('exists', () => {
            assert(game.move)
        })

        it('distance argument must be between 1 and 6', () => {
            assert.throws(() => game.move(adam, -1))
            assert.throws(() => game.move(adam, 0))
            assert.throws(() => game.move(adam, Infinity))
            assert.throws(() => game.move(adam, NaN))
            assert.throws(() => game.move(adam, 7))
            game.move(adam, 1)
            game.move(barb, 6)
        })

        it('cannot play same player twice in a row', () => {
            game.move(adam, 4)
            assert.throws(() => game.move(adam, 1), /Cannot move player: not their turn/)
        })

        it('sets player position', () => {
            game.move(adam, 4)
            assert.equal(adam.position, 4, 'Adam should have moved 4 squares forward')
        })

        it('gives extra turn if player rolls a 6', () => {
            game.move(adam, 6)
            game.move(adam, 6)
            game.move(adam, 6)
            game.move(adam, 6)
            game.move(adam, 6)
        })

        it('increments player position from current', () => {
            // change starting position
            adam.position = 4
            game.move(adam, 3)
            assert.equal(adam.position, 7, 'Adam should have moved 2 squares forward')
        })

        it('should not allow player to overshoot end of the board', () => {
            // change starting position
            adam.position = 5
            game.move(adam, 3)
            assert.equal(adam.position, 5, 'Adam should not have moved')
        })

        it('should take player up a ladder', () => {
            game.move(adam, 2)
            assert.equal(
                adam.position,
                5,
                'Adam should have moved 2 squares forwawrd and up a ladder to square 5'
            )
        })
    })

    describe('currentPlayer', () => {
        let game: Game
        let anna: Player
        let bree: Player
        let cara: Player

        beforeEach(() => {
            const board = [0, 1, 2, 3, 4, 5]

            anna = new Player('Anna')
            bree = new Player('Bree')
            cara = new Player('Cara')

            game = new Game(board)
            game.addPlayer(anna)
            game.addPlayer(bree)
            game.addPlayer(cara)

            game.start()
        })

        it('exists', () => {
            assert(game.currentPlayer)
        })

        it('has value of first added player', () => {
            assert.equal(game.currentPlayer, anna)
        })

        it('changes to next player after move', () => {
            game.move(anna, 1)
            assert.equal(game.currentPlayer, bree)
        })

        it('loops back to the first player after all players have moved', () => {
            game.move(anna, 1)
            game.move(bree, 1)
            game.move(cara, 1)
            assert.equal(game.currentPlayer, anna)
        })
    })

    describe('winner', () => {
        let game: Game
        let ellie: Player
        let xanthe: Player

        beforeEach(() => {
            const board = [0, 1, 2]

            ellie = new Player('Ellie')
            xanthe = new Player('Xanthe')

            game = new Game(board)
            game.addPlayer(ellie)
            game.addPlayer(xanthe)

            game.start()
        })

        it('is undefined if no winnner', () => {
            game.move(ellie, 1)
            game.move(xanthe, 1)
            assert.equal(game.winner, undefined)
        })

        it('contains winner after they reach end of game', () => {
            game.move(ellie, 2)
            assert.equal(game.winner, ellie)
        })
    })
})
