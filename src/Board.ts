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
    }

    public addLadder(start: number, end: number) {
        assert(end < this.SIZE, 'Ladder end out of bounds')
        assert(start >= this.START, 'Ladder start out of bounds')
        assert(start < end, 'Ladder start value not before end value')

        this.mappings.set(start, end)
    }

    public getPosition(index: number) {
        return index > this.SIZE ? null : this.mappings.get(index) || index
    }

    public get last() {
        return this.SIZE
    }
}

export default Board
