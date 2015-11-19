'use strict';

/* render.js
 * Build CSS from a tree.
 */

const Selector = require('./selector'),
      Property = require('./property'),
      Value = require('./value');

module.exports = exports = Build;

exports.value = function(value){
  if (!(value instanceof Value))
    throw new TypeError('value must be a Value object');

  return value.val + (value.unit || '');
};

exports.property = function(prop){
  if (!(prop instanceof Property))
    throw new TypeError('prop must be a Property object');

  let values = '';
  for (let value of prop.values) {
    values += this.value(value) + ' ';
  }

  return prop.name + ':' + values + ';';
};

exports.selector = function(selector, indent){
  if (!(selector instanceof Selector))
    throw new TypeError('prop must be a Property object');

  if (typeof indent === 'undefined') indent = 2;

  indent = indent? new Array(indent).join(' ') + '\n' : '';

  let props = '';
  for (let prop of selector.properties) {
    props += (this.property(prop) + indent);
  }

  return selector.name + ' {\n' + props + '}';
};

function Build(tree){
  if (!Array.isArray(tree))
    throw new TypeError('tree must be an array of Selector objects');

  let globalStyles = new Selector('*');

  let rendered = '';
  for (let item of tree) {
    if (item instanceof Selector)
      rendered += exports.selector(item);

    if (item instanceof Property)
      globalStyles.add(item);
  }
  rendered += exports.selector(globalStyles);

  return rendered;
}
