'use strict';

const rpv = require('rpv'), create = rpv.create,
                            render = rpv.render,
                            Value = rpv.Value;

let tokens = module.exports = {};

tokens.Variable = create(function(name, value){
  this.name = name;
  if (typeof this.name !== 'string')
    throw new TypeError('name nust be a string');

  this.value = value;
  if (!(this.value instanceof Value))
    throw new TypeError('value must be a RPV Value object.');

}, {

  resolve: function(){ return render(this.value); }

});
