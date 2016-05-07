var symbols = ['px', 'em', '%'];

module.exports = exports = function whitespace(ctx) {
  var unit = null;
  for (var i = 0; i < symbols.length; i++) {
    if (!(ctx.src.indexOf(symbols[i], ctx.pos) - ctx.pos)) {
      unit = symbols[i];
    }
  }
  if (!unit) {
    return false;
  }

  ctx.out.push({
    name: 'unit',
    value: unit,
    pos: ctx.pos,
    line: ctx.line,
    col: ctx.col
  });

  ctx.pos += unit.length;
  return true;
};
