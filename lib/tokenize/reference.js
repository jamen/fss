var chars = ['-', '_', '.', '$', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
'z'];

module.exports = exports = function declaration(ctx) {
  if (chars.indexOf(ctx.src[ctx.pos].toLowerCase()) > 3) {
    return false;
  }

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

  ctx.out.push({
    name: 'reference',
    value: name,
    pos: pos,
    line: line,
    col: col
  });
  return true;
};
