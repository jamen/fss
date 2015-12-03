'use strict';

const rpv = require('rpv'), search = rpv.search;

module.exports = function(tree, pass){
  pass.stack = pass.stack || {};
  search(tree, [ 'definition' ]).forEach(item => {
    pass.stack[item.name] = item.children[0];
    item.replace();
  });

  return tree;
};
