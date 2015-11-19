'use strict';

/* property.js
 * Object to represent CSS properties.
 */

const Value = require('./value');

module.exports = exports = Selector;

function Selector(sel, props) {
  this.sel = sel;
  this.props = Array.isArray(props) ? props : [];
}

Selector.prototype.prop = function(input){
  if (input instanceof Property) this.props.push(input);
};
