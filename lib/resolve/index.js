var procedure = require('../procedure');

var rules = [
  'assignment', 'substitution'
].map(function(name) {
  return require('./' + name);
});

module.exports = exports = procedure(function resolve() {

}, function prepare(ctx) {
  ctx.stack = {};
}, function error(ctx) {
  ctx.out.push(ctx.src[ctx.pos]);
  if (ctx.pos >= ctx.src.length) {
    return ctx;
  }
  ctx.pos++;
});
