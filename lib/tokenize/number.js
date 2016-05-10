var chars = ['.', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

module.exports = exports = function number(ctx) {
  if (chars.indexOf(ctx.src[ctx.pos].toLowerCase()) === -1) {
    return false;
  }

  // var { pos, line, col } = ctx;
  var pos = ctx.pos;
  var line = ctx.line;
  var col = ctx.col;

  var name = '';
  while (
    ctx.src[ctx.pos] &&
    chars.indexOf(ctx.src[ctx.pos].toLowerCase()) !== -1
  ) {
    name += ctx.src[ctx.pos];
    ctx.pos++;
  }

  var number = parseFloat(name);
  if (isNaN(number)) {
    ctx.pos -= name.length;
    return false;
  }

  ctx.out.push({
    name: 'number',
    value: number,
    pos: pos,
    line: line,
    col: col
  });
  return true;
};
