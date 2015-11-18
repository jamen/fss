'use strict';
jest.dontMock('../lib/unit');

describe('unit object', function(){
  const Unit = require('../lib/unit');

  // Operations
  it('handles math operations between two units', function(){
    // Addition between same units
    expect(
      new Unit(10, 'px').plus(new Unit(13, 'px'))
    ).toEqual(
      new Unit(23, 'px')
    );

    // Subtaction
    expect(
      new Unit(23, 'px').minus(new Unit(10, 'px'))
    ).toEqual(
      new Unit(13, 'px')
    );

    // Multiplication
    expect(
      new Unit(5, 'em').times(new Unit(4, 'em'))
    ).toEqual(
      new Unit(20, 'em')
    );

    // Division
    expect(
      new Unit(20, 'em').divide(new Unit(5, 'em'))
    ).toEqual(
      new Unit(4, 'em')
    );

    // Equality
    expect(
      new Unit(20, 'em').equals(new Unit(20, 'em'))
    ).toBe(true);
  });

  // Cross-unit operation error
  it('makes sure units are the same type', function(){
    expect(function(){
      return new Unit(5, 'em').plus(new Unit(5, 'px'));
    }).toThrow('units must be the same type');
  });
});
