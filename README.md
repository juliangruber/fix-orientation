
# fix-orientation

Rotate images if their exif data says so.

Images that were shot in portrait mode often are safed in landscape format, with
an [EXIF](https://en.wikipedia.org/wiki/Exchangeable_image_file_format) field
telling the real orientation. This module rotates those images to their correct
format.

## Usage

```js
var fixOrientation = require('fix-orientation');

var url = 'the data url you got from somewhere';

fixOrientation(url, { image: true }, function (fixed, image) {
  var img = new Image();
  img.src = fixed;
  document.body.appendChild(img);
  document.body.appendChild(image);
});
```

## API

### fixOrientation(dataUrl[, opts], fn)

Call `fn` with the orientation fixed version of `dataUrl`. If `opts.image` is
`true`, `fn` will get an `Image` object of the fixed data url as a second
argument. `dataUrl`'s file format will be preserved.

## Installation

With [npm](https://npmjs.org) do:

```bash
npm install fix-orientation
```

Then bundle for the browser with
[browserify](https://github.com/substack/node-browserify).

## Example

Run

```bash
npm start
```

to get a local server running, so you can test this with your images.

## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@wayla.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
