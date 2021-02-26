let noLoop = true;

let canvas, ctx;
let bgcol;
let width, height;
let framerate;

let pointsAmount = 360;
let points;
let r;

const init = () => {
  width = window.innerWidth;
  height = window.innerHeight;
  framerate = 30; // 60

  canvas = document.getElementById('canvas');
  canvas.width = width;
  canvas.height = height;

  bgcol = '#222';
  ctx = canvas.getContext('2d');
  ctx.fillStyle = bgcol;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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
  const start = () => {
    ctx.fillStyle = bgcol;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.fillStyle = 'rgba(255,255,255,0.25)';

    drawCircle(ctx, width / 2, height / 2, r);

    for (let i = 0; i < points.length; i += 1) {
      drawPoint(ctx, points[i].x, points[i].y, 3);
    }
  };

  let currentNumber = 0;
  let currentPoint = points[currentNumber];

  const loop = () => {
    if (currentNumber > 0 && currentNumber % pointsAmount === 0) {
      // start();
      return;
    }
    // start();
    console.log('loop');
    const nextPoint = points[Math.floor((currentNumber * 1111)) % pointsAmount];

    drawLine(ctx, currentPoint.x, currentPoint.y, nextPoint.x, nextPoint.y);
    // console.log({ currentNumber, result: currentNumber * 2, index: (currentNumber * 2) % pointsAmount });

    currentNumber += 1;
    currentPoint = points[currentNumber % pointsAmount];
  };

  start();

  // if (noLoop) {
  //   return;
  // }

  // setInterval(start, 1000 / framerate);
  setInterval(loop, 1000 / framerate);
};


window.addEventListener('load', init);