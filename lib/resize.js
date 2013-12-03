module.exports = resize;

function resize (canvas, o) {
  var ctx = canvas.getContext('2d');
  var imgData = ctx.getImageData(0, 0, o.width, o.height);
  canvas.width = o.width;
  canvas.height = o.height;
  ctx.putImageData(imgData, 0, 0);
}
