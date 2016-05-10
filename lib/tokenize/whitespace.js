var symbols = [
  ['\r\n', 'linebreak'],
  ['\n', 'linebreak'],
  ['\r', 'linebreak'],
  ['\t', 'indent'],
  [' ', 'space'],
  ['  ', 'indent']
];

module.exports = exports = function whitespace(ctx) {
  var symbol = null;
  var raw = null;
  for (var i = 0; i < symbols.length; i++) {
    var name = symbols[i][0];
    if (!(ctx.src.indexOf(name, ctx.pos) - ctx.pos)) {
      raw = name;
      symbol = symbols[i][1];
    }
  }
  if (!symbol || !raw) {
    return false;
  }

  ctx.out.push({
    name: 'whitespace',
    value: symbol,
    pos: ctx.pos,
    line: ctx.line,
    col: ctx.col
  });

  ctx.pos += raw.length;
  return true;
};
