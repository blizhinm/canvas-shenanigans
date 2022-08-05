import { getRandomInt } from '../helpers';
import Point from './Point';

const SCREEN_WIDTH = window.innerWidth * window.devicePixelRatio;
const SCREEN_HEIGHT = window.innerHeight * window.devicePixelRatio;
const SCREEN_HALF_WIDTH = (window.innerWidth * window.devicePixelRatio) / 2;
const SCREEN_HALF_HEIGHT = (window.innerHeight * window.devicePixelRatio) / 2;

let MOUSE_X = (window.innerWidth * window.devicePixelRatio) / 2;

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;

const BACKGROUND_COLOR_SOLID = 'rgba(0,0,0,1)';
const BACKGROUND_COLOR = 'rgba(0,0,0,0.1)';
const MAIN_COLOR_SOLID = 'rgba(255,255,255,1)';
const MAIN_COLOR = 'rgba(255,255,255,0.5)';
let isSolidColor = false;

/** @type {CanvasRenderingContext2D} */
const ctx2d = canvas.getContext('2d');
ctx2d.translate(SCREEN_HALF_WIDTH, SCREEN_HALF_HEIGHT);
ctx2d.fillStyle = BACKGROUND_COLOR;
ctx2d.fillRect(
  -SCREEN_HALF_WIDTH,
  -SCREEN_HALF_HEIGHT,
  SCREEN_WIDTH,
  SCREEN_HEIGHT
);
ctx2d.fillStyle = MAIN_COLOR;
ctx2d.strokeStyle = MAIN_COLOR;

const points = [];

for (let i = 0; i < 10000; i += 1) {
  points.push(
    new Point(
      getRandomInt(-SCREEN_HALF_WIDTH, SCREEN_HALF_WIDTH),
      getRandomInt(-SCREEN_HALF_HEIGHT, SCREEN_HALF_HEIGHT),
      3,
      SCREEN_HEIGHT
    )
  );
}

(function render() {
  if (MOUSE_X <= SCREEN_WIDTH * 0.05 || isSolidColor) {
    ctx2d.fillStyle = BACKGROUND_COLOR_SOLID;
    ctx2d.fillRect(
      -SCREEN_HALF_WIDTH,
      -SCREEN_HALF_HEIGHT,
      SCREEN_WIDTH,
      SCREEN_HEIGHT
    );
    ctx2d.fillStyle = MAIN_COLOR_SOLID;
  } else {
    ctx2d.fillStyle = BACKGROUND_COLOR;
    ctx2d.fillRect(
      -SCREEN_HALF_WIDTH,
      -SCREEN_HALF_HEIGHT,
      SCREEN_WIDTH,
      SCREEN_HEIGHT
    );
    ctx2d.fillStyle = MAIN_COLOR;
  }

  for (let i = 0; i < points.length; i += 1) {
    points[i].draw(ctx2d, SCREEN_WIDTH, SCREEN_HEIGHT);
    points[i].update(MOUSE_X, SCREEN_WIDTH, SCREEN_HEIGHT);
  }

  requestAnimationFrame(render);
})();

document.addEventListener('mousemove', ({ clientX }) => {
  MOUSE_X = clientX * window.devicePixelRatio;
});

document.addEventListener('keypress', ({ code }) => {
  if (code !== 'Space') {
    return;
  }

  isSolidColor = !isSolidColor;
});

document.addEventListener('dblclick', () => (isSolidColor = !isSolidColor));
