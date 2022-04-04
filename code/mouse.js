let MOUSE_X = (window.innerWidth * window.devicePixelRatio) / 2;
let MOUSE_Y = (window.innerHeight * window.devicePixelRatio) / 2;

document.addEventListener('mousemove', ({ clientX, clientY }) => {
  MOUSE_X = clientX * window.devicePixelRatio;
  MOUSE_Y = clientY * window.devicePixelRatio;
});
