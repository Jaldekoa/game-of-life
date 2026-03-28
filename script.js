import { Board } from './src/Cell.js'

let isDrawing = false;
const CELL_SIZE = 20;
const CELL_COLOR = '#e6e6e6';
const BACKGROUND_COLOR = '#191919';
const [HEIGHT, WIDTH] = [1280, 720];
const [nX, nY] = [HEIGHT / CELL_SIZE, WIDTH / CELL_SIZE];

const $canvas = document.querySelector('canvas');
const ctx = $canvas.getContext('2d');

const $run = document.getElementById('run');
const $stop = document.getElementById('stop');

const board = new Board(ctx, nX, nY, { alive: CELL_COLOR, dead: BACKGROUND_COLOR }, CELL_SIZE);

// Canvas management
$canvas.addEventListener('DOMContentLoaded', (event) => { });
$canvas.addEventListener('mousedown', startDrawing);
$canvas.addEventListener('mousemove', draw);
$canvas.addEventListener('mouseup', stopDrawing);
$canvas.addEventListener('mouseleave', stopDrawing);

// Game manegement
$run.addEventListener('click', (event) => {
    event.preventDefault();
    $run.setAttribute('disabled', '');
    board.start();
});

$stop.addEventListener('click', (event) => { });

function startDrawing() { isDrawing = true };
function stopDrawing() { isDrawing = false };
function draw(event) {
    if (!isDrawing) return;

    const { offsetX, offsetY } = event;
    let x = Math.floor(offsetX / CELL_SIZE);
    let y = Math.floor(offsetY / CELL_SIZE);

    x = Math.max(0, Math.min(x, board.nx - 1));
    y = Math.max(0, Math.min(y, board.ny - 1));

    board.board[y][x].isAlive = !board.board[y][x].isAlive;
    board.drawBoard();
}

