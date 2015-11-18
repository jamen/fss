'use strict';

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
  if (this.type === null || otherUnit.type === null) return 0;
  let check = this.compareTypes(otherUnit);
  if (check) return new Unit(callback(), this.type || otherUnit.type || null);
  else
    throw new TypeError('units must be the same type');
};

Unit.prototype.plus =
Unit.prototype.add = function(otherUnit){
  return this._operation(otherUnit, () => this.val + otherUnit.val);
};

Unit.prototype.minus =
Unit.prototype.subtract = function(otherUnit){
  return this._operation(otherUnit, () => this.val - otherUnit.val);
};

Unit.prototype.times =
Unit.prototype.multiply = function(otherUnit) {
  return this._operation(otherUnit, () => this.val * otherUnit.val);
};

Unit.prototype.divide = function(otherUnit){
  return this._operation(otherUnit, () => this.val / otherUnit.val);
};

Unit.prototype.equals =
Unit.prototype.compare = function(otherUnit){
  return this.compareTypes(otherUnit) && (this.val === otherUnit.val);
};
