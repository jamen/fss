var procedure = require('../procedure');
var rule = require('./rule');
var EOL = require('os').EOL;

module.exports = exports = procedure([

  function lineTracker(ctx) {
    if (!(ctx.src.indexOf(EOL, ctx.pos) - ctx.pos)) {
      ctx.line++;
    }
  },

  rule('whitespace', [
    ['\r\n', 'linebreak'],
    ['\n', 'linebreak'],
    ['\r', 'linebreak'],
    ['\t', 'indent'],
    ['  ', 'indent'],
    [' ', 'space']
  ]),

  rule('comment', [
    ['/*', 'multi-line'],
    ['//', 'single-line']
  ], require('./comment')),

  rule('opener', [
    ['(', 'expression'],
    ['[', 'map'],
    ['{', 'interpolation']
  ]),

  rule('closer', [
    [')', 'expression'],
    [']', 'map'],
    ['}', 'interpolation']
  ]),

  rule('operator', [
    ['+', 'addition'],
    ['/', 'division'],
    ['*', 'multiplication'],
    ['-', 'subtraction'],
    [':', 'assignment'],
    ['=', 'assignment'],
    [';', 'terminator'],
    [',', 'separator']
  ]),

  rule('unit', [
    'px', 'em', '%'
  ]),

  rule('string', [
    ['"', 'double'],
    ["'", 'single']
  ], require('./string')),

  rule('number', [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
  ], require('./number')),

  rule('declaration', [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', '_', '.', '"',
    "'", '(', ')', '[', ']', '=', '@', '#', '$'
  ], require('./declaration'))

], function prepare(ctx) {
  ctx.line = ctx.line || 1;
}, function error(ctx) {
  throw new Error('Cannot proceed (at ' + ctx.pos + ')');
});
