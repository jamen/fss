'use strict';

/* math.js
 * Math parser & resolver that supports CSS types.
 * */

module.exports = exports = CMath;

/*
 * Note: CMath so we don't overwrite the native Math.
 * */

function CMath(input){
  if (!(this instanceof Math)) return new CMath(input);

  if (!(input instanceof Buffer)) {
    throw new TypeError('input must be a buffer or string');
  } else if (typeof input === 'string') input = new Buffer(input);

  this.raw = input;
  this.tree = [];
  this.currentLevel = 0;
}
