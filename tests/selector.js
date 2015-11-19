// jshint ignore: start
'use strict';
jest.dontMock('../lib/selector');
jest.dontMock('../lib/property');
jest.dontMock('../lib/value');

describe('Selector object', function(){
  const Selector = require('../lib/selector'),
        Property = require('../lib/property'),
        Value = require('../lib/value')

  let foo = new Selector('#foo', [
    new Property('x-foo'),
    new Property('x-bar', [ new Value(10, 'px') ])
  ]);

  console.log(foo.sel);

  it('holds properties', () => {
    expect(
      foo.properties[0]
    ).toEqual(new Property('x-foo'));
  });

  it('adds properties', () => {
    foo.add(new Property('x-baz', [ new Value(5, 'em') ]));
    expect(
      foo.properties[2]
    ).toEqual(new Property('x-baz', [ new Value(5, 'em') ]))
  });

  it('removes properties', () => {
    foo.remove(0);
    expect(
      foo.properties[0]
    ).toEqual(new Property('x-bar', [ new Value(10, 'px') ]));
  });

  it('sets properties', () => {
    foo.set(1, new Property('x-qux', [ new Value(20, '%') ]));
    expect(
      foo.properties[1]
    ).toEqual(new Property('x-qux', [ new Value(20, '%') ]));
  });
});
