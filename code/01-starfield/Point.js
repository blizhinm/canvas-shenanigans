import { getRandomInt, mapBetweenRanges } from '../helpers';

export default class Point {
  constructor(x, y, size = 3, screenHeight) {
    this.x = x;
    this.y = y;
    this.z = getRandomInt(0, screenHeight * 3);
    this.size = size * window.devicePixelRatio;
  }

  draw(
    /** @type {CanvasRenderingContext2D} */ ctx2d,
    screenWidth,
    screenHeight
  ) {
    const zx = mapBetweenRanges(
      this.x / this.z,
      -1,
      1,
      -screenWidth,
      screenWidth
    );
    const zy = mapBetweenRanges(
      this.y / this.z,
      -1,
      1,
      -screenHeight,
      screenHeight
    );
    const zsize = mapBetweenRanges(this.z, 1, screenHeight * 3, this.size, 0);

    ctx2d.fillRect(zx, zy, zsize, zsize);
  }

  update(mouseX, screenWidth, screenHeight) {
    const halfScreenWidth = screenWidth / 2;
    const halfScreenHeight = screenHeight / 2;

    this.z =
      this.z -
      mapBetweenRanges(mouseX, screenWidth * 0.05, screenHeight, 0, 50);

    if (this.z < 1) {
      this.x = getRandomInt(-halfScreenWidth, halfScreenWidth);
      this.y = getRandomInt(-halfScreenHeight, halfScreenHeight);
      this.z = screenHeight * 3;
    }
  }
}
