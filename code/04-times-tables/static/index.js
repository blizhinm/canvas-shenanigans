import { degreesToRadians, drawLine, drawPoint } from '../../helpers';

let noLoop;
let noText;

let canvas, ctx;
let bgcol;
let width, height, pixelRatio;
let framerate;

let pointsAmount;
let points;
let r;

const init = () => {
  noLoop = false;
  noText = false;
  pointsAmount = 360;

  pixelRatio = window.devicePixelRatio;
  width = window.innerWidth * pixelRatio;
  height = window.innerHeight * pixelRatio;
  framerate = 60;

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
  let currentNumber = 0;
  let currentMult = 0;
  let [currentPoint] = points;

  const start = () => {
    ctx.fillStyle = bgcol;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';

    drawPoint(ctx, width / 2, height / 2, r, 'stroke');

    currentNumber = 0;

    for (let i = 0; i < points.length; i += 1) {
      drawPoint(ctx, points[i].x, points[i].y, 1);

      const nextPoint =
        points[Math.floor(currentNumber * currentMult) % pointsAmount];

      drawLine(ctx, currentPoint.x, currentPoint.y, nextPoint.x, nextPoint.y);

      currentNumber += 1;
      currentPoint = points[currentNumber % pointsAmount];
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

  start();

  document.addEventListener('mousedown', (event) => {
    const { clientX } = event;

    if (clientX >= window.innerWidth / 2) {
      currentMult += 1;
    } else {
      if (currentMult <= 0) {
        return;
      }

      currentMult -= 1;
    }

    start();
  });

  window.addEventListener('keydown', (event) => {
    const { code } = event;

    if (code === 'ArrowRight') {
      currentMult += 1;
    } else if (code === 'ArrowLeft') {
      if (currentMult <= 0) {
        return;
      }

      currentMult -= 1;
    }

    start();
  });
};

window.addEventListener('load', init);
