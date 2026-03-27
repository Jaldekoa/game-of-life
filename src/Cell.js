class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isAlive = true;
    };
};

class Board {
    constructor(ctx, nx, ny, color = { alive: '#0000FF', dead: '#FF0000' }, size = 20) {
        this.nx = nx;
        this.ny = ny;
        this.ctx = ctx;
        this.board = [];
        this.size = size;
        this.color = color;

        this.initializeCells();
        this.board[35][0].isAlive = false; //(filas, columnas)
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

        for (let yj of [j - 1, j, j + 1]) {
            for (let xi of [i - 1, i, i + 1]) {
                // Primero compruebo si `this.board[yj]` me da `undefined` o no para tratar de acceder a `this.board[yj][xi]`.
                let neighborCell = this.board[yj] ? this.board[yj][xi] : undefined;
                // Si `this.board[yj][xi]` (es decir `neighborCell`) no es undefined, lo añado al array de vecinos.
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

        // Nace: Si una célula muerta tiene exactamente 3 células vecinas vivas "nace" (es decir, al turno siguiente estará viva).
        if (!cell.isAlive && aliveNeighbors === 3) cell.isAlive = true;

        // Muere: una célula viva puede morir por uno de 2 casos:

        //Sobrepoblación: si tiene más de tres vecinos alrededor.
        if (cell.isAlive && aliveNeighbors > 3) cell.isAlive = false;
        // Aislamiento: si tiene solo un vecino alrededor o ninguno.
        if (cell.isAlive && aliveNeighbors <= 1) cell.isAlive = false;
    };

    update() {
        const boardClone = structuredClone(this.board);

        for (let yi = 0; yi < this.ny; yi++) {
            for (let xi = 0; xi < this.nx; xi++) {
                const cell = boardClone[yi][xi];
                this.step(cell);
            };
        };

        this.board = boardClone;
    };

    start() {
        console.log("Exec");
        window.requestAnimationFrame(this.start.bind(this));
        this.update();
        this.drawBoard();
    };
};

export { Board };