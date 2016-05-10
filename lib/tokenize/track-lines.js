var EOL = require('os').EOL;

module.exports = exports = {
  set: function set(val) {
    this._pos = val;
    if (this.src[val] === EOL) {
      this.line++;
      this.col = 1;
    } else {
      this.col++;
    }
  },
  get: function get() {
    return this._pos;
  }
};
