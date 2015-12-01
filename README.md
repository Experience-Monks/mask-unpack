# mask-unpack

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Takes a transparent image and splits its RGB and alpha components into two separate images. Works both in-browser and in node.

## Usage

[![NPM](https://nodei.co/npm/mask-unpack.png)](https://www.npmjs.com/package/mask-unpack)

### `{color, alpha} = unpack(data)`

Takes `data`, an image encoded as an [ndarray](http://github.com/scijs/ndarray), and returns two separate `color` and `alpha` ndarray images.

For example, you can use this to generate separate color and alpha images in different formats which can be recombined later:

``` javascript
const unpack = require('mask-unpack')
const save = require('save-pixels')
const load = require('get-pixels')
const fs = require('fs')

load('transparent-image.png', function (err, data) {
  if (err) throw err

  const split = unpack(data)

  save(split.color, 'jpg').pipe(fs.createWriteStream('color.jpg'))
  save(split.alpha, 'png').pipe(fs.createWriteStream('alpha.png'))
})
```

Why? JPG and PNG have different tradeoffs. The former is better at compressing photographic images, but is lossy and doesn't support transparency. Meanwhile the latter is great when there's a limited color palette, e.g. for UI elements, but grows in size significantly as the total number of colors increases.

## License

MIT, see [LICENSE.md](http://github.com/hughsk/mask-unpack/blob/master/LICENSE.md) for details.
