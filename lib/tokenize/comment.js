var advance = require('../advance');
var EOL = require('os').EOL;

module.exports = exports = function comment(ctx, token) {
  var end = token.symbol === '/*' ? '*/' : EOL;
  var start = advance(ctx, exports.validate, end);
  token.value = ctx.src.slice(start, ctx.pos);
  ctx.pos += end.length;
};

exports.validate = function validate(ctx, end) {
  return ctx.src.indexOf(end, ctx.pos) - ctx.pos;
};
