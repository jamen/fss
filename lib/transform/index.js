var procedure = require('../procedure');

var rules = [

].map(function(name) {
  return require('./' + name);
});

module.exports = exports = procedure(rules, function prepare(ctx) {
  ctx.out = {
    name: 'base',
    parent: null,
    children: []
  };
}, function error(ctx) {
  var t = ctx.src[ctx.pos];
  var n = t.name;
  var l = t.line;
  var c = t.col;
  return new Error('Unexpected token "' + n + '" (at ' + l + ':' + c + ')');
});
