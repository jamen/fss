'use strict';

/* build.js
 * Build CSS from a tree.
 */

const Selector = require('./selector'),
      Property = require('./property'),
      Value = require('./value');

module.exports = exports = Build;

exports.value = function(value, last){
  if (!(value instanceof Value))
    throw new TypeError('value must be a Value object');

  let unit = exports.translator[value.unit];
  if (typeof unit === 'undefined') unit = value.unit;

  return value.value + (value.unit === 'font' ? (last ? '' : unit) : unit || '');
};

exports.property = function(prop, indent){
  if (!(prop instanceof Property))
    throw new TypeError('prop must be a Property object');

  let values = '', index = 0, last = false;
  for (let value of prop.values) {
    last = index === prop.values.length-1;
    values += (exports.value(value, last) + (last ? '' : ' '));
    index++;
  }

  if (typeof indent === 'undefined') indent = 2;

  indent = indent ? ' '.repeat(indent) : '';

  return indent + prop.name + ':' + values + ';\n';
};

exports.selector = function(selector, indent){
  if (!(selector instanceof Selector))
    throw new TypeError('prop must be a Property object');

  let props = '';
  for (let prop of selector.properties) {
    props += (this.property(prop, indent));
  }

  return selector.sel + ' {\n' + props + '}\n\n';
};

exports.translator = {
  'px': 'px ',
  'pixel': 'px ',
  'font': ', '
};

function Build(tree, indent){
  if (!Array.isArray(tree))
    throw new TypeError('tree must be an array of Selector objects');

  let globalStyles = new Selector('*');

  let rendered = '';
  for (let item of tree) {
    if (item instanceof Selector)
      rendered += exports.selector(item, indent);

    if (item instanceof Property)
      globalStyles.add(item);
  }
  if (globalStyles.properties.length) rendered += exports.selector(globalStyles, indent);

  return rendered;
}
