function sum(a, b) {
  if (!isNumber(a) || !isNumber(b)) {
    throw new TypeError('Not a number');
  }

  return a + b;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = sum;
