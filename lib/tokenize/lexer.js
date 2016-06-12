var EOL = require('os').EOL;

/** A Lexer navigates through a source and creates tokens.
  * @name Lexer
  * @class
  * @param {String} input - The source to lex.
  */
function Lexer(input) {
  this.source = input;
  this.tokens = [];

  // Position data
  this.spos = this.pos = 0;
  this.sline = this.line = 1;
  this.scol = this.col = 1;
}

Lexer.prototype.next = function next(amount) {
  amount = amount || 1;
  while (amount--) {
    this.pos++;
    var cur = this.source[this.pos];
    if (cur === EOL) {
      this.line++;
      this.col = 0;
    } else {
      this.col++;
    }
  }
  return this;
};

Lexer.prototype.snapshot = function() {
  this.spos = this.pos;
  this.sline = this.line;
  this.scol = this.col;
  return this;
};

Lexer.prototype.token = function(name, value) {
  this.tokens.push({
    type: name,
    value: value || null,
    pos: this.spos,
    line: this.sline,
    col: this.scol
  });
  return this;
};

Lexer.prototype.test = function test(symbols) {
  for (var i = 0, max = symbols.length; i < max; i++) {
    if (this.on(symbols[i])) {
      this.snapshot();
      this.next(symbols[i].length);
      return true;
    }
  }
  return false;
};

Lexer.prototype.on = function on(symbol, pos) {
  pos = pos || this.pos;
  if (this.source.indexOf(symbol, pos) === pos) return true;
  return false;
};

Lexer.prototype.until = function until(symbol, ending) {
  var body = '';
  var cap = this.pos;
  while (!this.on(symbol, cap) && this.source[cap - 1] !== '\\') {
    var cur = this.source[cap++];
    if (typeof cur === 'undefined') {
      if (ending) break;
      else throw new Error('Unexpected end of input.');
    }
    body += cur;
  }
  this.next(body.length);
  return body;
};

Lexer.prototype.capture = function capture(symbols) {
  var body = '';
  var cap = this.pos;
  while (symbols.indexOf(this.source[cap]) === -1) {
    var cur = this.source[cap];
    if (typeof cur === 'undefined') break;
    body += cur;
    cap++;
  }
  console.log(body);
  this.next(body.length);
  return body;
};

module.exports = Lexer;
