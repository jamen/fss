var advance = require('../advance');

module.exports = exports = function string(ctx, token, symbols) {
  var start = advance(ctx, exports.validate, symbols);
  token.value = ctx.src.slice(start, ctx.pos);
  token.value = parseFloat(token.value);
  if (isNaN(token.value)) {
    return false;
  }
};

exports.validate = function validate(ctx, symbols) {
  return symbols.indexOf(ctx.src[ctx.pos]) !== -1;
};
