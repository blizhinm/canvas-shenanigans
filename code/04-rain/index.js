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

let MAX_WIDTH = 3;
let MAX_HEIGHT = 25;
let MAX_SPEED = 50;

/** @type {CanvasRenderingContext2D} */
const ctx2d = canvas.getContext('2d');
ctx2d.translate(SCREEN_HALF_WIDTH, SCREEN_HALF_HEIGHT);
ctx2d.fillStyle = BACKGROUND_COLOR;
ctx2d.fillRect(-SCREEN_HALF_WIDTH, -SCREEN_HALF_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT);
ctx2d.fillStyle = MAIN_COLOR;
ctx2d.strokeStyle = MAIN_COLOR;

class Drop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.z = getRandomInt(1, SCREEN_HEIGHT);
    this.width = mapBetweenRanges(this.z, 0, SCREEN_WIDTH, 0, MAX_WIDTH);
    this.height = mapBetweenRanges(this.z, 0, SCREEN_HEIGHT, 0, MAX_HEIGHT);
    this.speed = mapBetweenRanges(this.z, 0, SCREEN_WIDTH, 0, MAX_SPEED);
  }

  draw(/** @type {CanvasRenderingContext2D} */ ctx2d) {
    ctx2d.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.width = mapBetweenRanges(this.z, 0, SCREEN_WIDTH, 0, MAX_WIDTH);
    this.height = mapBetweenRanges(this.z, 0, SCREEN_HEIGHT, 0, MAX_HEIGHT);
    this.speed = mapBetweenRanges(this.z, 0, SCREEN_WIDTH, 0, MAX_SPEED);

    this.y += this.speed;

    if (this.y >= SCREEN_HALF_HEIGHT) {
      this.y = -SCREEN_HALF_HEIGHT - this.height;
    }
  }
}

let drops = [];

for (let i = 0; i < 1000; i += 1) {
  drops.push(
    new Drop(
      getRandomInt(-SCREEN_HALF_WIDTH, SCREEN_HALF_WIDTH),
      getRandomInt(-SCREEN_HALF_HEIGHT, SCREEN_HALF_HEIGHT)
    )
  );
}

(function render() {
  ctx2d.fillStyle = BACKGROUND_COLOR;
  ctx2d.fillRect(-SCREEN_HALF_WIDTH, -SCREEN_HALF_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT);
  ctx2d.fillStyle = MAIN_COLOR;

  for (let i = 0; i < drops.length; i += 1) {
    drops[i].update();
    drops[i].draw(ctx2d);
  }

  requestAnimationFrame(render);
})();

function setDropsAmount(amount = 500) {
  drops = [];

  for (let i = 0; i < amount; i += 1) {
    drops.push(
      new Drop(
        getRandomInt(-SCREEN_HALF_WIDTH, SCREEN_HALF_WIDTH),
        getRandomInt(-SCREEN_HALF_HEIGHT, SCREEN_HALF_HEIGHT)
      )
    );
  }
}
