module.exports = exports = function context(custom) {
  var ctx = {
    valid: true,
    src: '',
    pos: 0,
    children: []
  };

  if (custom.constructor === Object) {
    if (custom.valid && custom.children.length) {
      ctx.src = custom.children;
      return ctx;
    }

    for (var prop in custom) {
      if (custom.hasOwnProperty(prop)) {
        ctx[prop] = custom[prop];
      }
    }
  } else if (Buffer && custom.constructor === Buffer) {
    ctx.src = custom.toString();
  } else {
    ctx.src = custom;
  }

  return ctx;
};
