var fixOrientation = require('..');

var input = document.createElement('input');
input.type = 'file';
input.accept = 'image/*';
input.capture = 'camera';

window.onload = function () {
  document.body.appendChild(input);
};

input.onchange = function (ev) {
  var file = ev.target.files[0];
  var reader = new FileReader();

  reader.onload = function (ev) {
    var url = ev.target.result;
    fixOrientation(url, { image: true }, function (fixed, image) {
      var img = new Image();
      img.src = fixed;
      document.body.appendChild(img);
      document.body.appendChild(image);
    });
  }

  reader.readAsDataURL(file);
};
