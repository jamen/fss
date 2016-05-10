module.exports = exports = function assignment(ctx) {
  var token = ctx.src[ctx.pos];
  if (token.name !== 'operator' || token.type !== 'assignment') {
    return false;
  }

  // Siblings involved
  var left = ctx.src[ctx.pos - 1];
  var right = ctx.src[ctx.pos + 1];

  // Check sibling token
  console.log(ctx.src, left, token, right);
  if (left.name !== 'reference') {
    return false;
  }

  ctx.out.pop();

  // Assign token to stack.
  ctx.stack[left.value] = right;

  ctx.pos += 2;
  return true;
};
