var chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', '_', '.',
'"', "'", '(', ')', '[', ']', '=', '@', '#', '$'];

var string = require('./string');
var context = require('../context');

module.exports = exports = function declaration(ctx) {
  if (chars.indexOf(ctx.src[ctx.pos].toLowerCase()) === -1) {
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
    if (ctx.src[ctx.pos] === '"' || ctx.src[ctx.pos] === "'") {
      var sub = context(ctx.src.slice(ctx.pos));
      string(sub);
      if (sub.out[0]) {
        var content = ctx.src[ctx.pos] +
                      sub.out[0].value +
                      ctx.src[ctx.pos];

        name += content;
        ctx.pos += content.length;
      }
      continue;
    }
    name += ctx.src[ctx.pos];
    ctx.pos++;
  }

  ctx.out.push({
    name: 'declaration',
    value: name,
    pos: pos,
    line: line,
    col: col
  });
  return true;
};
