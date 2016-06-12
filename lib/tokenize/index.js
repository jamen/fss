var procedure = require('../procedure');
var Lexer = require('./lexer');
var symbols = require('./symbols');
var EOL = require('os').EOL;

// Prep data
var simples = symbols.simple;
var simpleNames = Object.keys(simples);
var max = simpleNames.length;

/*! The "tokenize procedure" uses the lexer to turn a string into an array of
  * tokens.  These tokens are mainly used by the "transform procedure" to create
  * an AST which is easier to work with.
  */
module.exports = procedure([
  /*! "check" rule
    * Check if the lexer has advanced or if it is done.
    */
  function check(lexer) {
    if (lexer.pos >= lexer.source.length) {
      lexer.end = true;
      return true;
    }
    if (lexer._prev === lexer.pos) {
      throw new Error('Lexer has stopped advancing (at ' + lexer.pos + ')');
    }
    lexer._prev = lexer.pos;
  },

  /*! "comment" rule
    * Turn a comment into a token.
    */
  function comment(lexer) {
    var single = lexer.on('//');
    var double = lexer.on('/*');
    if (single || double) {
      lexer.snapshot().next(2);
      var close = single ? EOL : '*/';
      var body = lexer.until(close, single);
      lexer.next(close.length).token('comment', body);
      return true;
    }
  },

  /*! "simple" rule
    * Turn a simple symbol into a token.
    * See symbols.json
    */
  function simple(lexer) {
    for (var i = 0; i < max; i++) {
      var name = simpleNames[i];
      if (lexer.test(simples[name])) {
        lexer.token(name);
        return true;
      }
    }
  },

  /*! "number" rule
    * Turn a number into a token.
    */
  function number(lexer) {
    var test = lexer.capture(symbols.number);
    if (test) {
      lexer.token('number', test);
      return true;
    }
  }
], Lexer, function(lexer) {
  return lexer.tokens;
});

console.log(module.exports(`/* Hel
  lo */ + 1`));
