var procedure = require('../procedure');

var rules = [
  'assignment', 'substitution'
].map(function(name) {
  return require('./' + name);
});

module.exports = exports = procedure(rules, function prepare(ctx) {
  ctx.base = ctx.children;
  ctx.level = 0;
  ctx.stack = {};
}, function error(ctx) {
  ctx.children.push(ctx.src[ctx.pos]);
  if (ctx.pos >= ctx.src.length) {
    ctx.children = ctx.base;
    return ctx;
  }
  ctx.pos++;
});
