module.exports = exports = function skipSpace(ctx) {
  var start = ctx.pos;
  while (ctx.src[ctx.pos] && ctx.src[ctx.pos].value === 'space') {
    ctx.pos++;
  }

  return ctx.pos - start;
};
