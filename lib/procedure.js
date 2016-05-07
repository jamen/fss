var context = require('./context');

module.exports = exports = function procedure(rules, prepare, err) {
  prepare = prepare || function noop() {};
  err = err || function noop() {};
  var max = rules.length;

  var proceed = function proceed(ctx) {
    if (!ctx.valid) {
      ctx = context(ctx);
      ctx = prepare(ctx) || ctx;
    }

    while (ctx.pos < ctx.src.length) {
      var start = ctx.pos;
      for (var i = 0; i < max; i++) {
        var success = rules[i](ctx);
        if (success) {
          break;
        }
      }

      if (ctx.pos === start) {
        throw err(ctx);
      }
    }

    return ctx;
  };

  for (var i = 0; i < max; i++) {
    var rule = rules[i];
    proceed[rule.name] = rule;
  }

  return proceed;
};
