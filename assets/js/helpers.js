const getRndm = (fst, snd) => {
  const min = fst && snd ? fst : 0;
  const max = snd || fst || 1;

  return Math.random() * (max - min) + min;
};

const map = (val, min1, max1, min2, max2) => {
  return (val - min1) / (max1 - min1) * (max2 - min2) + min2;
};

const drawPoint = (ctx, x, y, r) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
};

const drawLine = (ctx, x1, y1, x2, y2) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};
