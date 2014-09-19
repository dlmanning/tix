var con = Tix;
var proto = con.prototype;

module.exports = con;

function Tix () {
  if (!(this instanceof Tix)) {
    return new Tix();
  }

  this.masks = [0, 0, 0, 0];
}

proto.take = function () {
  var i, n, num = 1;

  for (
    i = 0;
    i < this.masks.length && ~this.masks[i] === 0;
    i++
  );

  if (i === this.masks.length) {
    this.masks[i] = 0;
  }

  var maskShifted = this.masks[i];

  for (
    n = 0;
    n < 32 && (~maskShifted & 1) === 0;
    n++, maskShifted >>>= 1
  );

  num <<= n;
  this.masks[i] |= num;
  return n + 32 * i;
}

proto.has = function (id) {
  var i = ~~(id / 32);
  var n = id % 32;

  var num = 1 << n;
  return ((this.masks[i] & num) === num);
}

proto.release = function (id) {
  var i = ~~(id / 32);
  var n = id % 32;

  var num = 1 << n;
  this.masks[i] ^= num;
}

module.exports = con;
