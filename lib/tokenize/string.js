var single = "'";
var double = '"';

module.exports = exports = function string(ctx) {
  var isSingle = !(ctx.src.indexOf(single, ctx.pos) - ctx.pos);
  var isDouble = !(ctx.src.indexOf(double, ctx.pos) - ctx.pos);
  if (!isSingle && !isDouble) {
    return false;
  }

  var quote = isSingle ? single : double;
  ctx.pos += quote.length;

  // var { pos, line, col } = ctx;
  var pos = ctx.pos;
  var line = ctx.line;
  var col = ctx.col;

  var content = '';
  while (
    ctx.src.indexOf(quote, ctx.pos) - ctx.pos &&
    ctx.src[ctx.pos - 1] !== '\\'
  ) {
    content += ctx.src[ctx.pos];
    ctx.pos++;
  }

  ctx.pos += quote.length;

  ctx.out.push({
    name: 'string',
    value: content,
    pos: pos,
    line: line,
    col: col
  });
  return true;
};
