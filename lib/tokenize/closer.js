var symbols = [')', ']', '}'];

module.exports = exports = function closer(ctx) {
  var symbol = null;
  for (var i = 0; i < symbols.length; i++) {
    if (!(ctx.src.indexOf(symbols[i], ctx.pos) - ctx.pos)) {
      symbol = symbols[i];
    }
  }
  if (!symbol) {
    return false;
  }

  ctx.out.push({
    name: 'closer',
    value: symbol,
    pos: ctx.pos,
    line: ctx.line,
    col: ctx.col
  });

  ctx.pos += symbol.length;
  return true;
};
