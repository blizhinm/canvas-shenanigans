export const drawPoint = (ctx2d, x, y, radius = 5, method = 'fill') => {
  ctx2d.beginPath();
  ctx2d.arc(x, y, radius, 0, Math.PI * 2);
  ctx2d[method]();
};

export const drawLine = (ctx, x1, y1, x2, y2) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};

export const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

export const radiansToDegrees = (radians) => {
  return radians * (180 / Math.PI);
};

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const getOneOf = (values) => {
  const index = getRandomInt(0, values.length);

  return values[index];
};

export const constrainValue = (value, from, to) => {
  if (value > to) {
    value = to;
  } else if (value < from) {
    value = from;
  }

  return value;
};

export const mapBetweenRanges = (value, fromMin, fromMax, toMin, toMax) => {
  value = constrainValue(value, fromMin, fromMax);

  return ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;
};

export const lerp = (start, end, percent) => {
  return start + (end - start) * percent;
};
