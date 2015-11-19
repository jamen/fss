'use strict';

/* index.js
 * Wrapper and accessor for library
 */

module.exports = exports = {};

let lib = require('./lib');

exports = lib.render;
exports.prototype = lib;
