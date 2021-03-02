let noLoop;
let noText;
let timeoutInterval;

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
  timeoutInterval = 3000;
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
  let [currentPoint] = points;

  let timeoutId = null;

  const start = () => {
    ctx.fillStyle = bgcol;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';

    drawCircle(ctx, width / 2, height / 2, r);

    for (let i = 0; i < points.length; i += 1) {
      drawPoint(ctx, points[i].x, points[i].y, 1);

      // draw immediately
      const nextPoint = points[Math.floor((currentNumber * currentMult)) % pointsAmount];

      drawLine(ctx, currentPoint.x, currentPoint.y, nextPoint.x, nextPoint.y);

      currentNumber += 1;
      currentPoint = points[currentNumber % pointsAmount];
      //
    }

    if (noText) {
      return;
    }

    const { width: textWidth, fontBoundingBoxAscent } = ctx.measureText(currentMult);

    ctx.fillText(
      currentMult,
      (width / 2) - (textWidth / 2),
      (((height / 2) + r) + fontBoundingBoxAscent) + (25 * pixelRatio),
    );
  };

  // draw each line by iteration
  const loop = () => {
    if (noLoop || timeoutId) {
      return;
    }

    if (currentNumber % pointsAmount === 0) {
      timeoutId = setTimeout(() => {
        currentMult += 1;
        currentNumber = 1;
        [currentPoint] = points;
        timeoutId = null;

        start();
      }, timeoutInterval);
    }

    const nextPoint = points[Math.floor((currentNumber * currentMult)) % pointsAmount];

    drawLine(ctx, currentPoint.x, currentPoint.y, nextPoint.x, nextPoint.y);

    currentNumber += 1;
    currentPoint = points[currentNumber % pointsAmount];
  };

  start();
  // setInterval(loop, 1000 / framerate);

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