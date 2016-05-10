var context = require('./context');

module.exports = exports = function procedure(minimum, prepare, stuck) {
  if (typeof minimum === 'function') {
    minimum = [minimum];
  }
  prepare = prepare || function noop() {};
  stuck = stuck || function noop() {};

  var proceed = function proceed(ctx, opts) {
    ctx = context(ctx);
    ctx = prepare(ctx) || ctx;
    var rules = minimum;
    if (opts) {
      rules = rules.concat(opts);
    }
    var max = rules.length;

    while (ctx.pos < ctx.src.length) {
      var start = ctx.pos;
      for (var i = 0; i < max; i++) {
        var success = rules[i](ctx);
        if (success) {
          break;
        }
      }

      if (ctx.pos === start) {
        var end = stuck(ctx);
        if (end) {
          return end;
        }
      }
    }

    return ctx;
  };

  var mmax = minimum.length;
  for (var i = 0; i < mmax; i++) {
    var rule = minimum[i];
    proceed[rule.name] = rule;
  }

  return proceed;
};
