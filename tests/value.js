// jshint ignore: start
'use strict';
jest.dontMock('../lib/value');

describe('Value object', function(){
  const Value = require('../lib/value');

  it('handles math operations between two units', function(){
    // Addition between same units
    expect(
      new Value(10, 'px').plus(new Value(13, 'px'))
    ).toEqual(new Value(23, 'px'));

    // Subtaction
    expect(
      new Value(23, 'px').minus(new Value(10, 'px'))
    ).toEqual(new Value(13, 'px'));

    // Multiplication
    expect(
      new Value(5, 'em').times(new Value(4, 'em'))
    ).toEqual(new Value(20, 'em'));

    // Division
    expect(
      new Value(20, 'em').divide(new Value(5, 'em'))
    ).toEqual(new Value(4, 'em'));

    // Equality
    expect(
      new Value(20, 'em').equals(new Value(20, 'em'))
    ).toBe(true);
  });

  it('makes sure units are the same type', function(){
    expect(function(){
      return new Value(5, 'em').plus(new Value(5, 'px'));
    }).toThrow('values must be have same or convertable types');
  });

  it('makes falsey and untyped values to be null', function(){
    expect(
      new Value('none').plus(new Value(20, 'px'))
    ).toEqual(new Value(0));
  });
});
