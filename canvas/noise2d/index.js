let noLoop;

let canvas, ctx;
let bgcol;
let width, height;
let framerate;

const noise2d = new noise2D();

let pixels;
let time;
let freq;
let inc;
let nValues = {};

const init = () => {
  width = 300;
  height = 300;
  framerate = 60;
  inc = 0.025;

  canvas = document.getElementById('canvas');
  canvas.width = width;
  canvas.height = height;

  bgcol = '#222';
  ctx = canvas.getContext('2d');
  ctx.fillStyle = bgcol;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  pixels = ctx.getImageData(0, 0, width, height);

  time = 0;
  freq = 0.001;

  render();
};

const render = () => {
  const start = () => {
    if (noLoop) {
      return;
    }

    time += 0.05;
    let yoff = 0;

    for (let y = 0; y < pixels.height; y += 1) {
      let xoff = 0;

      for (let x = 0; x < pixels.width; x += 1) {
        const n = noise2d.noise(xoff + time, yoff);

        const index = (x + (y * width)) * 4; // current pixel index
        // const r = Math.round(getRndm(0, 255));
        // const g = Math.round(getRndm(0, 255));
        // const b = Math.round(getRndm(0, 255));
        const r = Math.round(map(n, -1, 1, 0, 255));
        const g = r;
        const b = r;
        nValues[r] = r;

        pixels.data[index + 0] = r; // pixel red value
				pixels.data[index + 1] = g; // pixel green value
				pixels.data[index + 2] = b; // pixel blue value
        // pixels.data[index + 3] = 255; // pixel alpha value

        xoff += inc;
      }

      yoff += inc;
    }

    freq += 0.0001;

    ctx.putImageData(pixels, 0, 0);
  };

  start();

  setInterval(start, 1000 / framerate);
};


window.addEventListener('load', init);