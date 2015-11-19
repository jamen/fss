'use strict';

/* selector.js
 * Object to represent CSS selectors.
 */

const Property = require('./property');

module.exports = exports = Selector;

function Selector(sel, props) {
  this.sel = sel;
  this.props = Array.isArray(props) ? props : [];
}

Selector.prototype.prop = function(input){
  if (input instanceof Property) this.props.push(input);
};
