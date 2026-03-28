import { Board } from './src/Cell.js'

let isDrawing = false;
const CELL_SIZE = 20;
const CELL_COLOR = '#e6e6e6';
const BACKGROUND_COLOR = '#191919';
const [HEIGHT, WIDTH] = [1280, 720];
const [nX, nY] = [HEIGHT / CELL_SIZE, WIDTH / CELL_SIZE];

const $canvas = document.querySelector('canvas');
const ctx = $canvas.getContext('2d');

$canvas.width = HEIGHT;
$canvas.height = WIDTH;

const $slider = document.getElementById('slider');
const $run = document.getElementById('run');
const $stop = document.getElementById('stop');

const $dialog = document.getElementById('welcome-dialog');
const $closeBtn = document.getElementById('close-dialog');

const board = new Board(ctx, nX, nY, { alive: CELL_COLOR, dead: BACKGROUND_COLOR }, CELL_SIZE);
board.updateInterval = Number($slider.value);

// Dialog management
window.addEventListener('DOMContentLoaded', (event) => {
    $dialog.showModal();
});

closeBtn.addEventListener('click', (event) => {
    $dialog.close();
})


// Canvas management
$canvas.addEventListener('mousedown', () => { isDrawing = true });
$canvas.addEventListener('mouseup', () => { isDrawing = false });
$canvas.addEventListener('mouseleave', () => { isDrawing = false });
$canvas.addEventListener('mousemove', draw);

// Slider management
$slider.addEventListener('change', (event) => {
    board.updateInterval = Number(event.target.value);
});

// Game manegement
$run.addEventListener('click', (event) => {
    event.preventDefault();
    $run.setAttribute('disabled', '');
    board.start();
});

$stop.addEventListener('click', (event) => {
    event.preventDefault();
    $run.removeAttribute('disabled');
    board.stop();
});

function draw(event) {
    if (!isDrawing) return;

    const { offsetX, offsetY } = event;
    let x = Math.floor(offsetX / CELL_SIZE);
    let y = Math.floor(offsetY / CELL_SIZE);

    x = Math.max(0, Math.min(x, board.nx - 1));
    y = Math.max(0, Math.min(y, board.ny - 1));

    board.board[y][x].isAlive = true;
    board.drawBoard();
}

