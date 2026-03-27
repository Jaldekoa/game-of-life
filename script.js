import { Board } from './src/Cell.js'

const CELL_SIZE = 20;
const CELL_COLOR = '#e6e6e6';
const BACKGROUND_COLOR = '#191919';
const [HEIGHT, WIDTH] = [1280, 720];
const [nX, nY] = [HEIGHT / CELL_SIZE, WIDTH / CELL_SIZE];

const $canvas = document.querySelector('canvas');
const ctx = $canvas.getContext('2d');

const $run = document.getElementById('run');
const $stop = document.getElementById('stop');

$canvas.addEventListener('DOMContentLoaded', (event) => { });
$run.addEventListener('click', (event) => { });
$stop.addEventListener('click', (event) => { });

const board = new Board(ctx, nX, nY, { alive: CELL_COLOR, dead: BACKGROUND_COLOR }, CELL_SIZE);