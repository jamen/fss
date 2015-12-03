import test from 'ava';
import { resolve, tokens } from '../lib';
const  { Variable, Definition } = tokens;
import { render, Tree, Rule, Property, Value } from 'rpv'

test('"resolve" function', ({is}) => {

  // Create tree
  let doc = new Tree([
    new Definition('foo', new Value('#000')),
    new Definition('bar', new Value('#FFF')),

    new Rule('.baz', [
      new Property('color', new Variable('foo')),
      new Property('background-color', new Variable('bar'))
    ])
  ]);

  resolve(doc);

  let mock = new Tree([
    new Rule('.baz', [
      new Property('color', new Value('#000')),
      new Property('background-color', new Value('#FFF'))
    ])
  ]);

  is(render(doc), render(mock));

});
