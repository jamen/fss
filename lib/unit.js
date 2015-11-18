'use strict';

/* unit.js
 * The Unit object to represent CSS units.
 * */

module.exports = exports = Unit;

function Unit(val, type){
  if (!(this instanceof Unit)) return new Unit(val, type);
  this.val = val;
  this.type = type || null;
}

Unit.prototype.compareTypes = function(otherUnit){
  if (!(otherUnit instanceof Unit)) {
    return new TypeError('otherUnit must be a Unit');
  }

  // Used for cases where there is no unit
  // e.g. "100% * 3" or "(10 * 5)px"
  if (otherUnit.type === null) otherUnit.type = this.type;

  return otherUnit.type === this.type;
};

Unit.prototype._operation = function(otherUnit, callback){
  console.log(this, otherUnit);
  if (typeof otherUnit === 'number') otherUnit = new Unit(otherUnit, this.type);
  let check = this.compareTypes(otherUnit);
  if (this.type === null || otherUnit.type === null) return new Unit(0);
  if (check) return new Unit(callback(otherUnit), this.type);
  else try {
    otherUnit = otherUnit.convert(this.type);
    return new Unit(callback(otherUnit), this.type);
  } catch (e) {
    throw new TypeError('units must be the same or convertable types');
  }
};

Unit.prototype.plus =
Unit.prototype.add = function(otherUnit){
  return this._operation(otherUnit, (otherUnit) => this.val + otherUnit.val);
};

Unit.prototype.minus =
Unit.prototype.subtract = function(otherUnit){
  return this._operation(otherUnit, (otherUnit) => this.val - otherUnit.val);
};

Unit.prototype.times =
Unit.prototype.multiply = function(otherUnit) {
  return this._operation(otherUnit, (otherUnit) => this.val * otherUnit.val);
};

Unit.prototype.divide = function(otherUnit){
  return this._operation(otherUnit, (otherUnit) => this.val / otherUnit.val);
};

Unit.prototype.equals =
Unit.prototype.compare = function(otherUnit){
  return this.compareTypes(otherUnit) && (this.val === otherUnit.val);
};

Unit.prototype.convert = function(type, options){
  if (!options) options = {};
  let dpi = options.dpi || 96;

  // Pixels to inches
  if (
    this.type === 'px' &&
    type === 'in'
  ) return new Unit(this.val / dpi, 'in');

  // Inches to Pixels
  else if (
    this.type === 'in' &&
    type === 'px'
  ) return new Unit(this.val * dpi, 'px');

  else {
    throw new TypeError('invalid unit conversion');
  }
};
