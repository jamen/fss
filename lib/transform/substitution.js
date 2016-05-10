module.exports = exports = function substitution(ctx) {
  var token = ctx.src[ctx.pos];
  if (
    token.name !== 'reference' ||
    typeof ctx.stack[token.value] === 'undefined'
  ) {
    return false;
  }

  ctx.out.push(ctx.stack[token.value]);
  ctx.pos++;
  return true;
};
