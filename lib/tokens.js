'use strict';

const rpv = require('rpv'),
      create = rpv.create,
      Value = rpv.Value;

let tokens = module.exports = {};


tokens.Variable = create(function(name, type){
  this.set('variable');

  if (typeof name === 'string')
    this.name = name;
  else
    throw new TypeError('name nust be a string');

  this.set(type === 'function' ? 'call' : 'substitute');
}, {});

tokens.Definition = create(function(name, value){
  this.set('definition');

  if (name instanceof tokens.Variable)
    this.name = name.name;
  else if (typeof name === 'string')
    this.name = name;
  else
    throw new TypeError('name must be a string or Variable object');

  if (value instanceof Value)
    this.children.push(value);
  else if (typeof name === 'string' || typeof name === 'number')
    this.children.push(new Value(value));
  else
    throw new TypeError('value must be a Value object, or a numer / string.');
}, {});
