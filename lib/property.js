'use strict';

/* property.js
 * Object to represent CSS properties.
 */

const Value = require('./value');

module.exports = exports = Property;

function Property(name, values) {
  if (!(this instanceof Property)) return new Property(name, values);

  // Type checking
  if (name instanceof Value) name = [name];
  if (typeof name !== 'string')
    throw new TypeError('name must be a string');
  if (Array.isArray(values))
    values.forEach((x) => {
      if (!(x instanceof Value))
        throw new TypeError('values must only contain Value objects');
    });
  else if (typeof values === 'undefined');
  else
    throw new TypeError('values must be an array of Value objects');

  // Set values
  this.name = name;
  this.values = Array.isArray(values) ? values : [];
}

Property.prototype.add = function(value){
  if (!(value instanceof Value))
    throw new TypeError('value must be a Value object');

  this.values.push(value);
};

Property.prototype.set = function(index, value){
  if (typeof index !== 'number')
    throw new TypeError('index must be a number');
  if (!(value instanceof Value))
    throw new TypeError('value must be a Value object');

  this.values[index] = value;
};

Property.prototype.remove = function(index){
  this.values.splice(index, 1);
};
