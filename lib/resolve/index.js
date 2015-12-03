'use strict';

const rpv = require('rpv'),
      Tree = rpv.Tree,

resolve = {
  definitions: require('./definitions'),
  variables: require('./variables'),
};

module.exports = function(tree, pass){
  pass = pass || {};

  if (!(tree instanceof Tree))
    tree = new Tree(tree);

  resolve.definitions(tree, pass);
  resolve.variables(tree, pass);

  return tree;
};
