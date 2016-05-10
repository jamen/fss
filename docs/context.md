## Context
A context in Craze is a plain object used to hold information about a procedure.  These contexts are created and passed down from a [procedure](./procedure.md) that controls and manages the context into smaller sub-functions who manipulate the it (called [rules](./rule.md)).

Contexts can store any information the given procedure/call wants, in addition to the defaults:
  1. Source (`ctx.src`): The source of a context
  1. Position (`ctx.pos`): The position the context is at.
  1. Output (`ctx.out`): The output of a context.
  1. Valid (`ctx.valid`): Used to confirm whether the context passed in is valid or not.
