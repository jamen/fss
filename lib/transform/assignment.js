var advance = require('../advance');

module.exports = exports = function assignment(ctx) {
  var token = ctx.src[ctx.pos];
  if (token.name !== 'operator' || token.type !== 'assignment') {
    return false;
  }
  var start = ctx.pos;

  // Siblings involved
  var left = ctx.src[ctx.pos - 1];
  ctx.pos++;
  advance(ctx, advance.whitespace);
  var rightbegin = advance(ctx, exports.rightside);
  var right = ctx.src.slice(rightbegin, ctx.pos);

  if (
    right.length !== 1 ||
    left.name !== 'declaration' ||
    left.value[0] !== '$'
  ) {
    ctx.pos = start;
    return false;
  }
  ctx.children.pop();

  ctx.stack[left.value] = right[0];
  ctx.pos++;
  return true;
};

exports.rightside = function rightside(ctx) {
  return ctx.src[ctx.pos].type !== 'linebreak';
};
