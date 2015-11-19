'use strict';

/* Value.js
 * Object to represent CSS Values.
 */

module.exports = exports = Value;

function Value(val, unit){
  if (!(this instanceof Value)) return new Value(val, unit);
  this.val = val;
  this.unit = unit || null;
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
    throw new TypeError('values must be have same or convertable units');
  }
};

Value.prototype.plus =
Value.prototype.add = function(otherValue){
  return this._operation(otherValue, (otherValue) => this.val + otherValue.val);
};

Value.prototype.minus =
Value.prototype.subtract = function(otherValue){
  return this._operation(otherValue, (otherValue) => this.val - otherValue.val);
};

Value.prototype.times =
Value.prototype.multiply = function(otherValue) {
  return this._operation(otherValue, (otherValue) => this.val * otherValue.val);
};

Value.prototype.divide = function(otherValue){
  return this._operation(otherValue, (otherValue) => this.val / otherValue.val);
};

Value.prototype.equals =
Value.prototype.compare = function(otherValue){
  return this.compareUnits(otherValue) && (this.val === otherValue.val);
};

Value.prototype.convert = function(unit, options){
  if (!options) options = {};
  let dpi = options.dpi || 96;

  // Pixels to inches
  if (
    this.unit === 'px' &&
    unit === 'in'
  ) return new Value(this.val / dpi, 'in');

  // Inches to Pixels
  else if (
    this.unit === 'in' &&
    unit === 'px'
  ) return new Value(this.val * dpi, 'px');

  else {
    throw new TypeError('invalid value conversion');
  }
};

Value.prototype.serialize = function(){
  return this.val + this.unit;
};
