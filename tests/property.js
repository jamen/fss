// jshint ignore: start
'use strict';
jest.dontMock('../lib/property');
jest.dontMock('../lib/value')

describe('Property object', function(){
  const Property = require('../lib/property'),
        Value = require('../lib/value');

  it('holds values', function(){
    expect(
      new Property('x-example', [
        new Value(0)
      ]).values[0]
    ).toEqual(new Value(0));
  });
});
