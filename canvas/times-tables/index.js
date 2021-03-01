let noLoop;
let noText;
let timeoutInterval;

let canvas, ctx;
let bgcol;
let width, height;
let framerate;

let pointsAmount;
let points;
let r;

const init = () => {
  noLoop = false;
  noText = true;
  timeoutInterval = 3000;
  pointsAmount = 360;

  width = window.innerWidth;
  height = window.innerHeight;
  framerate = 60;

  canvas = document.getElementById('canvas');
  canvas.width = width;
  canvas.height = height;

  bgcol = '#222';
  ctx = canvas.getContext('2d');
  ctx.fillStyle = bgcol;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '14px Arial';

  points = [];

  const fitScale = 3;
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
    const x = (Math.cos(toRadians(degrees)) * r);
    const y = -(Math.sin(toRadians(degrees)) * r);
    const p = { x: (width / 2) + x , y: (height / 2) + y };

    points.push(p);

    degrees -= angle;
  }
};

const render = () => {
  let currentNumber = 1;
  let currentMult = 2;
  let currentPoint = points[currentNumber];

  let timeoutId = null;

  const start = () => {
    ctx.fillStyle = bgcol;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.fillStyle = 'rgba(255,255,255,1)';

    drawCircle(ctx, width / 2, height / 2, r);

    for (let i = 0; i < points.length; i += 1) {
      drawPoint(ctx, points[i].x, points[i].y, 1);
    }

    if (noText) {
      return;
    }

    ctx.fillText(`x * ${currentMult}`, width / 2, ((height / 2) + r) + 50);
  };

  const loop = () => {
    if (noLoop) {
      return;
    }

    if (currentNumber % pointsAmount === 0) {
      if (timeoutId) {
        return;
      }

      timeoutId = setTimeout(() => {
        currentMult += 1;
        currentNumber = 1;
        currentPoint = points[0];
        timeoutId = null;

        start();
      }, timeoutInterval);

      return;
    }

    const nextPoint = points[Math.floor((currentNumber * currentMult)) % pointsAmount];

    drawLine(ctx, currentPoint.x, currentPoint.y, nextPoint.x, nextPoint.y);

    currentNumber += 1;
    currentPoint = points[currentNumber % pointsAmount];
  };

  start();
  setInterval(loop, 1000 / framerate);
};

window.addEventListener('load', init);