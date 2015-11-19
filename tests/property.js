// jshint ignore: start
'use strict';
jest.dontMock('../lib/property');
jest.dontMock('../lib/value')

describe('Property object', function(){
  const Property = require('../lib/property'),
        Value = require('../lib/value');

  let foo = new Property('x-test', [
    new Value(0),
    new Value(1, 'px')
  ]);

  it('holds values', () => {
    expect(
      foo.values[0]
    ).toEqual(new Value(0));
  });

  it('adds values', () => {
    foo.add(new Value(1, 'em'));
    expect(
      foo.values[2]
    ).toEqual(new Value(1, 'em'))
  });

  it('removes values', () => {
    foo.remove(0);
    expect(
      foo.values[0]
    ).toEqual(new Value(1, 'px'));
  });

  it('sets values', () => {
    foo.set(1, new Value(1, 'px'));
    expect(
      foo.values[1]
    ).toEqual(new Value(1, 'px'));
  });
});
