const noLoop = true;

let canvas, ctx;
let bgcol;
let width, height;
let framerate;

let points;

const init = () => {
  width = window.innerWidth;
  height = window.innerHeight;
  framerate = 1; // 60

  canvas = document.getElementById('canvas');
  canvas.width = width;
  canvas.height = height;

  bgcol = '#222';
  ctx = canvas.getContext('2d');
  ctx.fillStyle = bgcol;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  points = [];
  
  create();
  render();
};

const create = () => {
  // const parts = 100; // width / parts = (parts - 1) points => 5 parts = 4 points
  // const partLength = width / parts;
  // const fst = { x: width / parts, y: getRndm(0, height) };
  // const snd = { x: width - partLength, y: getRndm(0, height) };

  // points[0] = fst;
  // points[parts - 2] = snd;

  // for (let i = 1; i < parts - 2; i += 1) {
  //     const p = { x: ((width / parts) * i) + points[0].x, y: getRndm(points[0].y, points[parts - 2].y) };
  //     points[i] = p;
  // }

  const parts = 50; // width / parts = (parts - 1) points => 5 parts = 4 points

  for (let i = 1; i < parts; i += 1) {
      const p = { x: (width / parts) * i, y: getRndm(0, height) };
      points.push(p);
  }
};

const render = () => {
  const start = () => {
    ctx.fillStyle = bgcol;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff';

    for (let i = 0; i < points.length - 1; i += 1) {
      drawLine(ctx, points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
      drawPoint(ctx, points[i].x, points[i].y, 5);

      if (i < points.length - 1) {
        drawPoint(ctx, points[i + 1].x, points[i + 1].y, 5);
      }
    }
  };

  start();

  if (noLoop) {
    return;
  }

  setInterval(() => start, 1000 / framerate);
};


window.addEventListener('load', init);