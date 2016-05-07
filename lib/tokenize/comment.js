var EOL = require('os').EOL;
var single = ['//', EOL];
var multi = ['/*', '*/'];

module.exports = exports = function ncomment(ctx) {
  var isSingle = !(ctx.src.indexOf(single[0], ctx.pos) - ctx.pos);
  var isMulti = !(ctx.src.indexOf(multi[0], ctx.pos) - ctx.pos);
  if (!isSingle && !isMulti) {
    return false;
  }

  var close = single[1];
  var open = single[0];
  if (isMulti) {
    close = multi[1];
    open = multi[0];
  }

  ctx.pos += open.length;

  // var { pos, line, col } = ctx;
  var pos = ctx.pos;
  var line = ctx.line;
  var col = ctx.col;

  var content = '';
  while (ctx.src.indexOf(close, ctx.pos) - ctx.pos) {
    content += ctx.src[ctx.pos];
    ctx.pos++;
  }

  ctx.out.push({
    name: 'comment',
    value: content,
    pos: pos,
    line: line,
    col: col
  });

  ctx.pos += close.length;
  return true;
};
