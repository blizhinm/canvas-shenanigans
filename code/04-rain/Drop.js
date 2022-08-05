import { getRandomInt, mapBetweenRanges } from '../helpers';

const MAX_WIDTH = 2;
const MAX_HEIGHT = 25;
const MAX_SPEED = 40;

export default class Drop {
  constructor(screenWidth, screenHeight, x, y) {
    this.x = x;
    this.y = y;
    this.z = getRandomInt(1, screenHeight);
    this.width = mapBetweenRanges(this.z, 0, screenWidth, 0, MAX_WIDTH);
    this.height = mapBetweenRanges(this.z, 0, screenHeight, 0, MAX_HEIGHT);
    this.speed = mapBetweenRanges(this.z, 0, screenWidth, 0, MAX_SPEED);
  }

  draw(/** @type {CanvasRenderingContext2D} */ ctx2d) {
    ctx2d.fillRect(this.x, this.y, this.width, this.height);
  }

  update(screenWidth, screenHeight) {
    this.width = mapBetweenRanges(this.z, 0, screenWidth, 0, MAX_WIDTH);
    this.height = mapBetweenRanges(this.z, 0, screenHeight, 0, MAX_HEIGHT);
    this.speed = mapBetweenRanges(this.z, 0, screenWidth, 0, MAX_SPEED);

    this.y += this.speed;

    const halfScreenWidth = screenWidth / 2;
    const halfScreenHeight = screenHeight / 2;

    if (this.y >= halfScreenHeight) {
      this.y = -halfScreenHeight - this.height;
      this.x = getRandomInt(-halfScreenWidth, halfScreenWidth);
    }
  }
}
