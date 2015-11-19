// jshint ignore: start
'use strict';
jest.dontMock('../lib/build');
jest.dontMock('../lib/value');
jest.dontMock('../lib/property');
jest.dontMock('../lib/selector');

describe('build function', function(){
  const build = require('../lib/build'),
        Value = require('../lib/value'),
        Property = require('../lib/property'),
        Selector = require('../lib/selector');

  it('turns trees into CSS', () => {
    expect(build([
      Selector('html, body', [
        Property('margin', [Value(0)]),
        Property('padding', [Value(0)]),
        Property('font-family', [
          Value('Helvetica', 'font'),
          Value('Arial', 'font'),
          Value('sans-serif', 'font')
        ])
      ])
    ])).toBe(`html, body {
  margin:0;
  padding:0;
  font-family:Helvetica,  Arial,  sans-serif;
}

`)
  });
});
