import assert from 'assert'

class Board {
    private mappings: Map<number, number> = new Map()
    private readonly START = 1

    constructor(public readonly SIZE: number) {}

    public addSnake(start: number, end: number) {
        assert(start < this.SIZE, 'Snake start out of bounds')
        assert(end >= this.START, 'Snake end out of bounds')
        assert(start > end, 'Snake start value not after end value')

        this.mappings.set(start, end)
        return this
    }

    public addLadder(start: number, end: number) {
        assert(end < this.SIZE, 'Ladder end out of bounds')
        assert(start >= this.START, 'Ladder start out of bounds')
        assert(start < end, 'Ladder start value not before end value')

        this.mappings.set(start, end)
        return this
    }

    public getPosition(index: number) {
        return index > this.SIZE ? null : this.mappings.get(index) || index
    }

    public get last() {
        return this.SIZE
    }
}

export default Board

const board = new Board(100)
    .addSnake(16, 6)
    .addSnake(46, 25)
    .addSnake(49, 11)
    .addSnake(62, 19)
    .addSnake(64, 60)
    .addSnake(76, 53)
    .addSnake(92, 88)
    .addSnake(99, 80)
    .addLadder(2, 38)
    .addLadder(7, 14)
    .addLadder(8, 31)
    .addLadder(15, 26)
    .addLadder(21, 42)
    .addLadder(28, 84)
    .addLadder(36, 44)
    .addLadder(51, 67)
    .addLadder(71, 91)
    .addLadder(78, 98)
    .addLadder(87, 94)

export { board }
