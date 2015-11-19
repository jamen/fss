'use strict';

/* value.js
 * Object to represent CSS Values.
 */

module.exports = exports = Value;

function Value(value, unit){
  if (!(this instanceof Value)) return new Value(value, unit);

  if (typeof value !== 'number' && typeof value !== 'string')
    throw new TypeError('value can only be a number or string');
  if (typeof unit !== 'undefined' && typeof unit !== 'string')
    throw new TypeError('unit must be a string');

  this.value = value;
  this.unit = unit || null;
  this.options = {};
}

Value.prototype.compareUnits = function(otherValue){
  if (!(otherValue instanceof Value)) {
    return new TypeError('otherValue must be a Value');
  }

  // Used for cases where there is no unit
  // e.g. "100% * 3" or "(10 * 5)px"
  if (otherValue.unit === null) otherValue.unit = this.unit;

  return otherValue.unit === this.unit;
};

Value.prototype._operation = function(otherValue, callback){
  if (typeof otherValue === 'number') otherValue = new Value(otherValue, this.unit);
  let check = this.compareUnits(otherValue);
  if (this.unit === null || otherValue.unit === null) return new Value(0);
  if (check) return new Value(callback(otherValue), this.unit);
  else try {
    otherValue = otherValue.convert(this.unit);
    return new Value(callback(otherValue), this.unit);
  } catch (e) {
    throw new TypeError('values must be have same or convertable types');
  }
};

Value.prototype.plus =
Value.prototype.add = function(otherValue){
  return this._operation(otherValue, (otherValue) => this.value + otherValue.value);
};

Value.prototype.minus =
Value.prototype.subtract = function(otherValue){
  return this._operation(otherValue, (otherValue) => this.value - otherValue.value);
};

Value.prototype.times =
Value.prototype.multiply = function(otherValue) {
  return this._operation(otherValue, (otherValue) => this.value * otherValue.value);
};

Value.prototype.divide = function(otherValue){
  return this._operation(otherValue, (otherValue) => this.value / otherValue.value);
};

Value.prototype.equals =
Value.prototype.compare = function(otherValue){
  return this.compareUnits(otherValue) && (this.value === otherValue.value);
};

Value.prototype.convert = function(unit, options){
  options = this.options;
  if (options) options = options;
  let dpi = options.dpi || 96;

  // Pixels to inches
  if (
    this.unit === 'px' &&
    unit === 'in'
  ) return new Value(this.value / dpi, 'in');

  // Inches to Pixels
  else if (
    this.unit === 'in' &&
    unit === 'px'
  ) return new Value(this.value * dpi, 'px');

  else {
    throw new TypeError('invalid value conversion');
  }
};
