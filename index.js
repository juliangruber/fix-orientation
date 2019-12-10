var process = require('process');
var EXIF = require('exif-js');
var toArray = require('data-uri-to-u8');
var rotate = require('rotate-component');
var resize = require('./lib/resize');
var urlToImage = require('./lib/url-to-image');
var size = {
  'image/png': require('png-size'),
  'image/jpeg': require('jpeg-size')
};

module.exports = fixOrientation;

function fixOrientation (url, opts, fn) {
  if (typeof opts == 'function') {
    fn = opts;
    opts = {};
  }

  var buf = toArray(url);
  var tags = {};
  
  try { tags = EXIF.readFromBinaryFile(buf.buffer) } catch (err) {}

  var supportedOrientations = [3,6,8];

  var toRotate = tags.Orientation
    && typeof tags.Orientation == 'number'
    && supportedOrientations.includes(tags.Orientation);

  if (!toRotate) {
    process.nextTick(function () {
      fn(url, opts.image && urlToImage(url));
    });
    return;
  }

  var s = size[buf.type](buf);
  var max = Math.max(s.width, s.height);
  var half = max / 2;
  var rotateDegrees = { 3: 180, 6: 90, 8: -90 }[tags.Orientation];

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = canvas.height = max;

  rotate(ctx, { x: half, y: half, degrees: rotateDegrees });

  urlToImage(url, function (img) {
    if (6 == tags.Orientation || (tags.Orientation == 3 && s.height < s.width)) {
      ctx.drawImage(img, 0, max - s.height);
    } else {
      ctx.drawImage(img, max - s.width, 0);
    }

    rotate(ctx, { x: half, y: half, degrees: -rotateDegrees });

    if(tags.Orientation == 3){
      resize(canvas, {
        width: s.width,
        height: s.height
      });
    }
    else{
      resize(canvas, {
        width: s.height,
        height: s.width
      });
    }

    var url = buf.type == 'image/png'
      ? canvas.toDataURL()
      : canvas.toDataURL('image/jpeg', 1);
    fn(url, opts.image && urlToImage(url));
  });
}

