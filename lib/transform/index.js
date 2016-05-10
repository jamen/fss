var procedure = require('../procedure');

var rules = [
  'assignment', 'substitution'
].map(function(name) {
  return require('./' + name);
});

module.exports = exports = procedure(rules, function prepare(ctx) {
  ctx.stack = {};
}, function error(ctx) {
  ctx.out.push(ctx.src[ctx.pos]);
  if (ctx.pos >= ctx.src.length) {
    return ctx;
  }
  ctx.pos++;
});

var tokenize = require('../tokenize');
var transform = exports;
console.log(transform(tokenize(`
foo: 'hello'
bar(foo)
`).out));
