'use strict';

const rpv = require('rpv'), create = rpv.create;

let tokens = module.exports = {};


const Variable = tokens.Variable = create(function(name, type){
  this.set('variable');

  if (typeof this.name === 'string')
    this.name = name;
  else
    throw new TypeError('name nust be a string');

  this.set(type === 'function' ? 'call' : 'substitute');
}, {});

const Definition = tokens.Definition = create(function(name, value){
  this.set('definition');

  if (name instanceof Variable)
    this.name = name.name;
  else if (typeof name === 'string')
    this.name = name;
  else
    throw new TypeError('name must be a string or Variable object');
}, {});
