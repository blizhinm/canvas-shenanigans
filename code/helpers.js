function drawPoint(ctx2d, x, y, radius = 5, method = 'fill') {
  ctx2d.beginPath();
  ctx2d.arc(x, y, radius, 0, Math.PI * 2);
  ctx2d[method]();
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getOneOf(values) {
  const index = getRandomInt(0, values.length);

  return values[index];
}

function constrainValue(value, from, to) {
  if (value > to) {
    value = to;
  } else if (value < from) {
    value = from;
  }

  return value;
}

const mapBetweenRanges = (value, fromMin, fromMax, toMin, toMax) => {
  value = constrainValue(value, fromMin, fromMax);

  return ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;
};
