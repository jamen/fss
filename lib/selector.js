'use strict';

/* selector.js
 * Object to represent CSS selectors.
 */

const Property = require('./property');

module.exports = exports = Selector;

function Selector(sel, properties) {
  this.sel = sel;
  this.properties = Array.isArray(properties) ? properties : [];
}

Selector.prototype.prop = function(input){
  if (input instanceof Property) this.properties.push(input);
};
