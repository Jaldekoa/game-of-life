class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isAlive = false;
    };
};

class Board {
    constructor(ctx, nx, ny, color = { alive: '#e6e6e6', dead: '#191919' }, size = 20) {
        this.nx = nx;
        this.ny = ny;
        this.ctx = ctx;
        this.board = [];
        this.size = size;
        this.color = color;
        this.lastUpdate = 0;
        this.animationId = null;
        this.updateInterval = 250;

        this.initializeCells();
        this.drawBoard();
    };

    initializeCells() {
        this.board = [];

        for (let yi = 0; yi < this.ny; yi++) {
            const row = [];

            for (let xi = 0; xi < this.nx; xi++) {
                const cell = new Cell(xi * this.size, yi * this.size);
                row.push(cell);
            };

            this.board.push(row);
        };
    };

    drawBoard() {
        this.ctx.clearRect(0, 0, this.nx * this.size, this.ny * this.size);

        for (let yi = 0; yi < this.ny; yi++) {
            for (let xi = 0; xi < this.nx; xi++) {
                const cell = this.board[yi][xi];
                this.ctx.fillStyle = cell.isAlive ? this.color.alive : this.color.dead;

                if (cell.isAlive) this.ctx.fillRect(cell.x, cell.y, this.size, this.size);
            };
        };
    };

    getNeighbors(cell) {
        const neighbors = [];
        const [i, j] = [cell.x / this.size, cell.y / this.size];

        for (let yj = j - 1; yj <= j + 1; yj++) {
            if (!this.board[yj]) continue;

            for (let xi = i - 1; xi <= i + 1; xi++) {
                if (xi === i && yj === j) continue;

                let neighborCell = this.board[yj][xi];
                if (neighborCell) neighbors.push(neighborCell);
            };
        };

        return neighbors;
    };

    countAliveNeighbors(neighbors) {
        return neighbors.reduce((acc, val) => { return val.isAlive ? acc + 1 : acc }, 0);
    }

    step(cell) {
        const neighbors = this.getNeighbors(cell);
        const aliveNeighbors = this.countAliveNeighbors(neighbors);

        if (cell.isAlive) {
            if (aliveNeighbors < 2 || aliveNeighbors > 3) return false;
            return true;
        } else {
            if (aliveNeighbors === 3) return true;
            return false;
        };
    };

    update() {
        const nextState = [];

        for (let yi = 0; yi < this.ny; yi++) {
            const nextRow = [];

            for (let xi = 0; xi < this.nx; xi++) {
                const cell = this.board[yi][xi];
                nextRow.push(this.step(cell));
            };

            nextState.push(nextRow);
        };

        for (let yi = 0; yi < this.ny; yi++) {
            for (let xi = 0; xi < this.nx; xi++) {
                this.board[yi][xi].isAlive = nextState[yi][xi];
            };
        };
    };

    start = (timestamp) => {
        if (timestamp - this.lastUpdate > this.updateInterval) {
            this.update();
            this.drawBoard();
            this.lastUpdate = timestamp;
        };

        this.animationId = window.requestAnimationFrame(this.start);
    };

    stop() {
        if (this.animationId) {
            window.cancelAnimationFrame(this.animationId);
            this.animationId = null;
        };
    };
};

export { Board };