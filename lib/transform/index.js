var procedure = require('../procedure');

var rules = [
  'assignment', 'substitution', 'block'
].map(function(name) {
  return require('./' + name);
});

module.exports = exports = procedure(rules, function prepare(ctx) {
  ctx.children = ctx.out;
  ctx.level = 0;
  ctx.stack = {};
}, function error(ctx) {
  ctx.children.push(ctx.src[ctx.pos]);
  if (ctx.pos >= ctx.src.length) {
    return ctx;
  }
  ctx.pos++;
});
