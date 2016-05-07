var symbols = ['+', '-', '/', '*', ':', '=', ',', ';'];

module.exports = exports = function operator(ctx) {
  var operator = null;
  for (var i = 0; i < symbols.length; i++) {
    if (!(ctx.src.indexOf(symbols[i], ctx.pos) - ctx.pos)) {
      operator = symbols[i];
    }
  }
  if (!operator) {
    return false;
  }

  ctx.out.push({
    name: 'operator',
    value: operator,
    pos: ctx.pos,
    line: ctx.line,
    col: ctx.col
  });

  ctx.pos += operator.length;
  return true;
};
