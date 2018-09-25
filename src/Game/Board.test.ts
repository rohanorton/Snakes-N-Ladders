import assert from 'assert'
import Board from './Board'

describe('Board', () => {
    it('exists', () => {
        assert(Board)
    })

    describe('addSnake', () => {
        it('is not possible to add snake that starts beyond board', () => {
            const board = new Board(5)
            assert.throws(() => board.addSnake(6, 4), /Snake start out of bounds/)
        })

        it('is not possible to add snake that goes to same tile', () => {
            const board = new Board(5)
            assert.throws(() => board.addSnake(3, 3), /Snake start value not after end value/)
        })

        it('is not possible to add snake that ends before beginning of board', () => {
            const board = new Board(5)
            assert.throws(() => board.addSnake(3, -4), /Snake end out of bounds/)
        })

        it('affects getPosition result', () => {
            const board = new Board(5)
            board.addSnake(3, 1)
            const actual = board.getPosition(3)
            const expected = 1
            assert.equal(actual, expected)
        })
    })

    describe('addLadder', () => {
        it('is not possible to add ladder that starts before beginning of board', () => {
            const board = new Board(5)
            assert.throws(() => board.addLadder(-1, 4), /Ladder start out of bounds/)
        })

        it('is not possible to add ladder that goes to same tile', () => {
            const board = new Board(5)
            assert.throws(() => board.addLadder(3, 3), /Ladder start value not before end value/)
        })

        it('is not possible to add ladder that ends after end of board', () => {
            const board = new Board(5)
            assert.throws(() => board.addLadder(3, 6), /Ladder end out of bounds/)
        })

        it('affects getPosition result', () => {
            const board = new Board(5)
            board.addLadder(2, 4)
            const actual = board.getPosition(2)
            const expected = 4
            assert.equal(actual, expected)
        })
    })
})
