const CELL_SIZE = 20;
const BKG_COLOR = '#00FF00'
const [HEIGHT, WIDTH] = [1280, 720];
const [nX, nY] = [HEIGHT % CELL_SIZE, WIDTH % CELL_SIZE];

const $canvas = document.querySelector('canvas');

const $run = document.getElementById('run');
const $stop = document.getElementById('stop');

$canvas.addEventListener('DOMContentLoaded', (event) => { });
$run.addEventListener('click', (event) => { });
$stop.addEventListener('click', (event) => { });