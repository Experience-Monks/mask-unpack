var ops = require('ndarray-ops')
var zeros = require('zeros')

module.exports = unpack

function unpack (data) {
  var color = zeros(data.shape)
  var alpha = zeros(data.shape)

  ops.assign(rgb(color), rgb(data))
  ops.assigns(channel(color, 3), 255)

  ops.assign(channel(alpha, 0), channel(data, 3))
  ops.assign(channel(alpha, 1), channel(data, 3))
  ops.assign(channel(alpha, 2), channel(data, 3))
  ops.assigns(channel(alpha, 3), 255)

  return {
    color: color,
    alpha: alpha
  }
}

function rgb (data) {
  return data.hi(data.shape[0], data.shape[1], 3)
}

function channel (data, i) {
  return data.pick(null, null, i)
}
