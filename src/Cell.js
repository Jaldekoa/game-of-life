class Cell {
    constructor(x, y, color, size) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
    };

    drawCell(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    };
};

class Board {
    constructor(nx, ny, cellColor, cellSize) {
        this.board = [];

        for (let [i, row] = [0, []]; i < nx; i++) {
            for (let j = 0; j < ny; j++) {
                const newCell = new Cell(i * cellSize, j * cellSize, cellColor, cellSize);
                newCell.drawCell(ctx);
                row.push(newCell);

            };
            this.board.push(row);
        };

        console.log(this.board);
    };
};

export { Board };