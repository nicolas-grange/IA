const fillRect = (x, y, w, h, color, ctx)  => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

const strokeRect = (x, y, w, h, color, ctx)  => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.strokeRect(x, y, w, h);
};

const wait = (ms= 0) => new Promise(res => setTimeout(res, ms));

export {
  fillRect,
  strokeRect,
  wait
}
