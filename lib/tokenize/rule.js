var EOL = require('os').EOL;

module.exports = exports = function rule(name, symbols, check) {
  symbols = symbols || [];
  check = check || function noop() {
    return true;
  };

  // Create fast checkers.
  var max = symbols.length;
  var create = function create(ctx) {
    if (!symbols) {
      return false;
    }

    var token = {
      name: name,
      pos: ctx.pos
    };

    for (var i = 0; i < max; i++) {
      var symbol = symbols[i];
      if (symbol.constructor === Array) {
        token.type = symbol[1];
        token.symbol = symbol = symbol[0];
      }

      if (!(ctx.src.indexOf(symbol, ctx.pos) - ctx.pos)) {
        token.line = ctx.line;
        token.col = ctx.pos - ctx.src.lastIndexOf(EOL, ctx.pos);
        return token;
      }
    }
  };

  return function rule(ctx) {
    var token = create(ctx);
    if (!token) {
      return false;
    }

    if (token.symbol) {
      ctx.pos += token.symbol.length;
    }
    check(ctx, token, symbols);
    ctx.children.push(token);
    return true;
  };
};
