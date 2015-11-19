'use strict';

/* selector.js
 * Object to represent CSS selectors.
 */

const Property = require('./property');

module.exports = exports = Selector;

function Selector(sel, properties) {
  if (!(this instanceof Selector)) return new Selector(sel, properties);

  // Type checking
  if (typeof sel !== 'string')
    throw new TypeError('sel must be a string');
  if (Array.isArray(properties))
    properties.forEach((x) => {
      if (!(x instanceof Property))
        throw new TypeError('properties must only contain Property objects');
    });
  else if (typeof properties === 'undefined');
  else
    throw new TypeError('properties must be an array of Property objects');

  this.sel = sel;
  this.properties = Array.isArray(properties) ? properties : [];
}

Selector.prototype.add = function(prop){
  if (!(prop instanceof Property))
    throw new TypeError('prop must be a Property object');

  this.properties.push(prop);
};

Selector.prototype.set = function(index, property){
  if (typeof index !== 'number')
    throw new TypeError('index must be a number');
  if (!(property instanceof Property))
    throw new TypeError('property must be a Property object');

  this.properties[index] = property;
};

Selector.prototype.remove = function(index){
  this.properties.splice(index, 1);
};
