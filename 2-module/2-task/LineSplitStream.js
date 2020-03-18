const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    let data = chunk.toString();

    if (this._lastLine) {
      data = this._lastLine + data;
    }

    const list = data.split(/\n/);

    this._lastLine = list.splice(list.length-1,1)[0];

    list.forEach((item, i) => {
      this.push(list[i]);
    });

    callback();
  }

  _flush(callback) {
    if (this._lastLine) {
      this.push(this._lastLine);
    }

    callback();
  }
}

module.exports = LineSplitStream;
