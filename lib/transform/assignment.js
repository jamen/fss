var skipSpace = require('./skip-space');

module.exports = exports = function assignment(ctx) {
  var token = ctx.src[ctx.pos];
  if (token.name !== 'operator' || token.type !== 'assignment') {
    return false;
  }

  // Siblings
  var left = ctx.src[ctx.pos - 1];
  ctx.children.pop();
  ctx.pos++;
  var spaces = skipSpace(ctx);
  var right = ctx.src[ctx.pos];

  // Check sibling token
  if (left.name !== 'reference' || left.value[0] !== '$') {
    ctx.pos -= 1 + spaces;
    ctx.children.push(left);
    return false;
  }

  // Assign token to stack.
  ctx.stack[left.value] = right;

  ctx.pos += 2 + spaces;
  return true;
};
