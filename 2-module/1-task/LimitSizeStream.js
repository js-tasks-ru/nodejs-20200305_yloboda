const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

let data = '';

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.options = options;
  }

  _transform(chunk, encoding, callback) {
    data += chunk;

    if (data.length <= this.options.limit) {
      this.push(chunk);
      callback();
    } else {
      callback(new LimitExceededError(), chunk);
    }
  }
}

module.exports = LimitSizeStream;
