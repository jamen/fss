'use strict';

const rpv = require('rpv'), search = rpv.search;

module.exports = function(tree, pass){
  search(tree, [ 'variable' ]).forEach(item => {
    item.replace(pass.stack[item.name]);
  });

  return tree;
};
