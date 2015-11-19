# Craze
Next generation CSS.

Instead of transpiling directly to CSS like most preprocessors, Craze compiles to a SPV (Selector, Property, Value) tree, which can then be compiled to CSS.

This allows more opportunities for middleware to interact with the CSS directly through a easy interface.

## Installation
```
$ npm install -g craze
```

## Example
Programmatic usage:
```javascript
Selector('.foo, .bar', [
  Property('background-color', new Value('#000')),
  Property('border', [
    Value(1, 'px'),
    Value('solid'),
    Value('#FFF')
  ])
]);
```

Compiled:

```css
.foo, .bar {
  background-color:#000;
  border:1px solid #FFF;
}
```
