module.exports = urlToImage;

function urlToImage (url, fn) {
  var img = new Image();
  if (fn) img.onload = fn.bind(null, img);
  img.src = url;
  return img;
}
