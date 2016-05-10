module.exports = exports = function serialize() {
  return {
    src: this.src,
    lines: this.line,
    end: this.col,
    pos: this._pos,
    out: this.out
  };
};
