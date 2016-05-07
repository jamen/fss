## Procedure
A procedure in Craze is a parent-function used to guide the _orchestration_ of multiple [rules](./rule.md).

Because Craze is functional, procedures uses mix of [contexts](./context.md), rules, and recursion to perform a given task.  In the most typical scenario, a procedure inside of Craze will do the following:
  1. If no context in this procedure call, create a default context from the input.
  1. Check whether the context position is more than or equal to the context source length. (Indicates that the procedure is done)
    1. If true, return the context. (Ends the recursion and finishes the call)
  1. Put the context through several rules, which manipulate it, changing the context (i.e. the position and output), where a rule returns true if it advanced.
    1. If returnedfalse, no more advancements will happen, prevent infinite recursion and throw an error. (Ends the recursion and finishes the procedure)
    1. If true, recursively call self with the same context. (Continue the procedure)

With this, we can safely perform a _functional loop_ that ends on certain conditions, to perform a procedure.
