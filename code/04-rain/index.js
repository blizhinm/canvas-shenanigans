import { getRandomInt } from '../helpers';
import Drop from './Drop';

const SCREEN_WIDTH = window.innerWidth * window.devicePixelRatio;
const SCREEN_HEIGHT = window.innerHeight * window.devicePixelRatio;
const SCREEN_HALF_WIDTH = (window.innerWidth * window.devicePixelRatio) / 2;
const SCREEN_HALF_HEIGHT = (window.innerHeight * window.devicePixelRatio) / 2;

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;

const BACKGROUND_COLOR = 'rgba(0,0,0,1)';
const MAIN_COLOR = 'rgba(255,255,255,1)';

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

let drops = [];

for (let i = 0; i < 1000; i += 1) {
  drops.push(
    new Drop(
      SCREEN_WIDTH,
      SCREEN_HEIGHT,
      getRandomInt(-SCREEN_HALF_WIDTH, SCREEN_HALF_WIDTH),
      getRandomInt(-SCREEN_HALF_HEIGHT, SCREEN_HALF_HEIGHT)
    )
  );
}

(function render() {
  ctx2d.fillStyle = BACKGROUND_COLOR;
  ctx2d.fillRect(
    -SCREEN_HALF_WIDTH,
    -SCREEN_HALF_HEIGHT,
    SCREEN_WIDTH,
    SCREEN_HEIGHT
  );
  ctx2d.fillStyle = MAIN_COLOR;

  for (let i = 0; i < drops.length; i += 1) {
    drops[i].update(SCREEN_WIDTH, SCREEN_HEIGHT);
    drops[i].draw(ctx2d);
  }

  requestAnimationFrame(render);
})();
