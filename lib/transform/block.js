var context = require('../context');

module.exports = exports = function block(ctx) {
  var token = ctx.src[ctx.pos];
  if (token.name !== 'whitespace' || token.value !== 'linebreak') {
    return false;
  }

  ctx.pos++;

  var indents = 0;
  while (ctx.src[ctx.pos] && ctx.src[ctx.pos].value === 'indent') {
    indents++;
    ctx.pos++;
  }

  if (!indents || indents === ctx.level) {
    return false;
  }

  var direction = indents > ctx.level ? 1 : -1;
  var amount = Math.abs(indents - ctx.level);
  while (amount--) {
    if (direction === 1) {
      var block = context({
        type: 'block',
        parent: ctx,
        children: []
      });
      block.out = block.children;
      ctx.children.push(block);
      ctx.children = block.children;
    } else {
      ctx.children = ctx.parent.children;
    }
    ctx.level += direction;
  }

  return true;
};
