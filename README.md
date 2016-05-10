# craze
> Next gen CSS

Craze is a functional CSS preprocessing library.

## Installation
```shell
$ npm install craze
```

## Usage
```javascript
import craze from 'craze';
```

### What is a "context"?
A "context" is something you might see frequently in Craze's code, but you shouldn't ever need to create them yourself unless you are using a rule.  If you are using `tokenize` or `transform` respectively, they create them for you.

Contexts are objects created to store a process's information.  More specifically, some of the information they hold is: the source, the position on the source, the length, and the output.

These objects are typically passed down from `tokenize` and `transform` into smaller sub-functions (called "rules") that manipulate the context, and then `tokenize` and `transform` recusively call, until a certain condition is met (i.e. the context position is more than the source length) and the context is returned.

See [docs/context](docs/context.md) for more information.

### What is a "rule"?
A rule is a plain JavaScript function that receives a context, which it manipulates, then returns `true` or `false` to indicate whether it was successful or not.

Example:
```javascript
function foo(ctx) {
  // Move context pos forward 3.
  ctx.pos += 3;
  return true;
}
```
See [docs/rule](docs/rule.md) for more information.

### What is a "procedure"?
A procedure is a recursively-calling function that holds a context and passes it into several rules.  When a rule is true, the context is changed and the procedure is recursively continued.  When a rule is false, the next rule is done...  If all rules are false, the procedure errors to prevent an infinite loop.  Then, if the context position is more than the context source length, the context is returned since this indicates that it is finished.

See [docs/procedure](docs/procedure.md) for more information.

## Credits
| ![jamen][avatar] |
|:---:|
| [Jamen Marzonie][github] |

 [avatar]: https://avatars.githubusercontent.com/u/6251703?v=3&s=125
 [github]: https://github.com/jamen
