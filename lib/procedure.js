module.exports = function(baserules, Context, end) {
  var procedure = function(input, alt) {
    var rules = alt ? alt.concat(baserules) : baserules;
    var context = new Context(input);

    var max = rules.length;
    while (!context.end) {
      for (var i = 0; i < max; i++) {
        if (rules[i](context)) break;
      }
    }

    return end(context);
  };

  // Bind named rules to procedure for access.
  for (var i = 0, max = baserules.length; i < max; i++) {
    var rule = baserules[i];
    if (rule.name) procedure[rule.name] = rule;
  }

  return procedure;
};
