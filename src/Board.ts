class Board {
    constructor(private board: Array<number>) {}

    public getPosition(index: number) {
        return this.board[index]
    }

    public get last() {
        return this.board[this.board.length - 1]
    }
}

export default Board
