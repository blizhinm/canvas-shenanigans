const SCREEN_WIDTH = window.innerWidth * window.devicePixelRatio;
const SCREEN_HEIGHT = window.innerHeight * window.devicePixelRatio;
const SCREEN_HALF_WIDTH = (window.innerWidth * window.devicePixelRatio) / 2;
const SCREEN_HALF_HEIGHT = (window.innerHeight * window.devicePixelRatio) / 2;
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;
const BACKGROUND_COLOR_SOLID = 'rgba(0,0,0,1)';
const BACKGROUND_COLOR = 'rgba(0,0,0,0.1)';
const MAIN_COLOR_SOLID = 'rgba(255,255,255,1)';
const MAIN_COLOR = 'rgba(255,255,255,0.5)';
/** @type {CanvasRenderingContext2D} */
const ctx2d = canvas.getContext('2d');
ctx2d.translate(SCREEN_HALF_WIDTH, SCREEN_HALF_HEIGHT);
ctx2d.fillStyle = BACKGROUND_COLOR;
ctx2d.fillRect(-SCREEN_HALF_WIDTH, -SCREEN_HALF_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT);

ctx2d.fillStyle = MAIN_COLOR;
ctx2d.strokeStyle = MAIN_COLOR;

class Point {
  constructor(x, y, size = 3) {
    this.x = x;
    this.y = y;
    this.z = getRandomInt(0, SCREEN_HEIGHT * 3);
    this.size = size * window.devicePixelRatio;
  }

  draw(/** @type {CanvasRenderingContext2D} */ ctx2d) {
    const zx = mapBetweenRanges(this.x / this.z, -1, 1, -SCREEN_WIDTH, SCREEN_WIDTH);
    const zy = mapBetweenRanges(this.y / this.z, -1, 1, -SCREEN_HEIGHT, SCREEN_HEIGHT);
    const zsize = mapBetweenRanges(this.z, 1, SCREEN_HEIGHT * 3, this.size, 0);

    ctx2d.fillRect(zx, zy, zsize, zsize);
  }

  update() {
    this.z = this.z - mapBetweenRanges(MOUSE_X, SCREEN_WIDTH * 0.05, SCREEN_WIDTH, 0, 50);

    if (this.z < 1) {
      this.x = getRandomInt(-SCREEN_HALF_WIDTH, SCREEN_HALF_WIDTH);
      this.y = getRandomInt(-SCREEN_HALF_HEIGHT, SCREEN_HALF_HEIGHT);
      this.z = SCREEN_HEIGHT * 3;
    }
  }
}

const points = [];

for (let i = 0; i < 10000; i += 1) {
  points.push(
    new Point(
      getRandomInt(-SCREEN_HALF_WIDTH, SCREEN_HALF_WIDTH),
      getRandomInt(-SCREEN_HALF_HEIGHT, SCREEN_HALF_HEIGHT)
    )
  );
}

(function render() {
  if (MOUSE_X <= SCREEN_WIDTH * 0.05) {
    ctx2d.fillStyle = BACKGROUND_COLOR_SOLID;
    ctx2d.fillRect(-SCREEN_HALF_WIDTH, -SCREEN_HALF_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT);
    ctx2d.fillStyle = MAIN_COLOR_SOLID;
  } else {
    ctx2d.fillStyle = BACKGROUND_COLOR;
    ctx2d.fillRect(-SCREEN_HALF_WIDTH, -SCREEN_HALF_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT);
    ctx2d.fillStyle = MAIN_COLOR;
  }

  for (let i = 0; i < points.length; i += 1) {
    points[i].draw(ctx2d);
    points[i].update();
  }

  requestAnimationFrame(render);
})();
