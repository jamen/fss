'use strict';

/* render.js
 * Parse and transpile.
 */

const parse = require('./parse');

module.exports = exports = Render;

function Render(source){
  return build(parse(source));
}
