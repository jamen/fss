var advance = require('../advance');

module.exports = exports = function string(ctx, token) {
  if (ctx.src[ctx.pos - 1] === '\\') {
    return false;
  }

  var start = advance(ctx, exports.validate, token);
  token.value = ctx.src.slice(start, ctx.pos);
  ctx.pos += token.symbol.length;
};

exports.validate = function validate(ctx, token) {
  return ctx.src[ctx.pos] !== token.symbol && ctx.src[ctx.pos - 1] !== '\\';
};
