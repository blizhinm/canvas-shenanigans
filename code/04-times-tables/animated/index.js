import { degreesToRadians, drawLine, drawPoint } from '../../helpers';

let noLoop;
let noText;
let timeoutInterval;

let canvas, ctx;
let bgcol;
let width, height, pixelRatio;
let framerate = 120;

let pointsAmount;
let points;
let r;

let timerId = null;

let changeFramerate, jumpToNumber, reset;

const init = () => {
  noLoop = false;
  noText = false;
  timeoutInterval = 3000;
  pointsAmount = 360;

  pixelRatio = window.devicePixelRatio;
  width = window.innerWidth * pixelRatio;
  height = window.innerHeight * pixelRatio;

  canvas = document.getElementById('canvas');
  canvas.width = width;
  canvas.height = height;

  bgcol = '#222';
  ctx = canvas.getContext('2d');
  ctx.fillStyle = bgcol;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${11 * pixelRatio}px Arial`;

  points = [];

  const fitScale = 2.25;
  const widthFit = width / fitScale;
  const heightFit = height / fitScale;

  r = heightFit < widthFit ? heightFit : widthFit;

  create();
  render();
};

const create = () => {
  const angle = 360 / pointsAmount;
  let degrees = -180;

  points = [];

  for (let i = 0; i < pointsAmount; i += 1) {
    const x = Math.cos(degreesToRadians(degrees)) * r;
    const y = -(Math.sin(degreesToRadians(degrees)) * r);
    const p = { x: width / 2 + x, y: height / 2 + y };

    points.push(p);

    degrees -= angle;
  }
};

const render = () => {
  const CURRENT_MULT_INCREMENT = 1;
  let currentNumber = 0;
  let currentMult = 0;
  let [currentPoint] = points;
  let isForwards = true;

  let timeoutId = null;

  const start = () => {
    ctx.fillStyle = bgcol;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';

    drawPoint(ctx, width / 2, height / 2, r, 'stroke');

    currentNumber = isForwards ? 0 : pointsAmount;
    [currentPoint] = points;

    for (let i = 0; i < points.length; i += 1) {
      drawPoint(ctx, points[i].x, points[i].y, 1);
    }

    if (noText) {
      return;
    }

    const { width: textWidth, fontBoundingBoxAscent } =
      ctx.measureText(currentMult);

    ctx.fillText(
      currentMult,
      width / 2 - textWidth / 2,
      height / 2 + r + fontBoundingBoxAscent + 25 * pixelRatio
    );
  };

  const loop = () => {
    if (noLoop || timeoutId) {
      return;
    }

    if (
      (isForwards && currentNumber > 0 && currentNumber % pointsAmount === 0) ||
      (!isForwards && currentNumber < 360 && currentNumber % pointsAmount === 0)
    ) {
      timeoutId = setTimeout(() => {
        isForwards = !isForwards;
        [currentPoint] = points;
        timeoutId = null;

        start();
      }, timeoutInterval);
    }

    const nextPoint = points[(currentNumber * currentMult) % pointsAmount];

    drawLine(ctx, currentPoint.x, currentPoint.y, nextPoint.x, nextPoint.y);

    if (isForwards) {
      currentNumber += 1;
    } else {
      currentNumber -= 1;
    }

    currentPoint = points[currentNumber % pointsAmount];
  };

  start();
  timerId = setInterval(loop, 1000 / framerate);

  reset = () => {
    clearTimeout(timeoutId);
    timeoutId = null;
    isForwards = true;

    start();
  };

  document.addEventListener('mousedown', (event) => {
    const { clientX } = event;

    if (clientX >= window.innerWidth / 2) {
      currentMult += CURRENT_MULT_INCREMENT;
    } else {
      if (currentMult <= 0) {
        return;
      }

      currentMult -= CURRENT_MULT_INCREMENT;
    }

    reset();
  });

  window.addEventListener('keydown', (event) => {
    const { code } = event;

    if (code !== 'ArrowRight' && code !== 'ArrowLeft') {
      return;
    }

    if (code === 'ArrowRight') {
      currentMult += CURRENT_MULT_INCREMENT;
    } else if (code === 'ArrowLeft') {
      if (currentMult <= 0) {
        return;
      }

      currentMult -= CURRENT_MULT_INCREMENT;
    }

    reset();
  });

  changeFramerate = (rate) => {
    // reset();
    clearInterval(timerId);
    framerate = rate;
    timerId = setInterval(loop, 1000 / framerate);
  };

  jumpToNumber = (num) => {
    currentMult = num;
  };
};

window.addEventListener('load', init);
