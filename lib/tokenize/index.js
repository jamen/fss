var procedure = require('../procedure');
var trackLines = require('./track-lines');
var serialize = require('./serialize');

var rules = [
  'comment', 'whitespace', 'string', 'number', 'unit', 'opener', 'closer',
  'operator', 'declaration'
].map(function resolveModules(name) {
  return require('./' + name);
});

module.exports = exports = procedure(rules, function prepare(ctx) {
  ctx.line = ctx.line || 1;
  ctx.col = ctx.col || 1;
  ctx._pos = ctx.pos;
  Object.defineProperty(ctx, 'pos', trackLines);
  ctx.toJSON = serialize;
}, function error(ctx) {
  return new Error('Cannot proceed (at ' + ctx.line + ':' + ctx.col + ')');
});
