## Rule
A rule in Craze is simply a plain JavaScript function that gets a context passed into it and then returns true or false.  More specifically, these rules can chose to manipulate the context, and then return `true` or `false` to signify whether the rule was successful or not.

In a procedure, if a rule is successful the recursion is continued; but if not, the recursion is broken (stopping the loop) and the context is returned.
