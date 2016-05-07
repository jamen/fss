var symbols = [
  ['+', 'addition'],
  ['/', 'division'],
  ['*', 'multiplication'],
  ['-', 'subtraction'],
  [':', 'assignment'],
  ['=', 'assignment'],
  [';', 'terminator'],
  [',', 'separator']
];

module.exports = exports = function operator(ctx) {
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
    name: 'operator',
    type: symbol,
    value: raw,
    pos: ctx.pos,
    line: ctx.line,
    col: ctx.col
  });

  ctx.pos += raw.length;
  return true;
};
