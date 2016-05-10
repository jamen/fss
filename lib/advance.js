module.exports = exports = function advance(ctx, condition, use) {
  var start = ctx.pos;
  while (condition(ctx, use)) {
    ctx.pos++;
  }
  return start;
};

exports.whitespace = function whitespace(ctx) {
  if (
    ctx.src[ctx.pos].name === 'whitespace' &&
    ctx.src[ctx.pos].type === 'space'
  ) {
    return true;
  }
};
