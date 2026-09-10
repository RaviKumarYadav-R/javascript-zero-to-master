# Functions in JavaScript

## 1. Definition
A function is a reusable block of JavaScript behavior that can receive input, perform work, and optionally return a result.

```js
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
```

## 2. Why Functions Exist
Functions reduce duplication, isolate behavior, create reusable APIs, improve testing, and make large programs easier to reason about.

## 3. Mental Model

```text
Input arguments
      ↓
Parameter bindings
      ↓
Function body executes
      ↓
return value
      ↓
Caller receives result
```

## 4. Function Declaration

```js
function greet(name) {
  return `Hello ${name}`;
}
```

The function has a name and can be called by that name.

## 5. Calling a Function

```js
const message = greet("Ravi");
console.log(message);
```

Calling executes the function body with the supplied arguments.

## 6. Parameters vs Arguments
Parameters are variables declared by the function.

Arguments are values supplied during a call.

```js
function add(a, b) {} // a and b are parameters
add(10, 20);           // 10 and 20 are arguments
```

## 7. Return
`return` sends a value back to the caller and immediately exits the current function.

```js
function square(n) {
  return n * n;
  console.log("unreachable");
}
```

## 8. Missing Return
A function with no returned value produces `undefined`.

```js
function logName(name) {
  console.log(name);
}

const result = logName("Ravi");
console.log(result); // undefined
```

## 9. Return vs Console.log
`console.log()` displays a value. `return` gives a value back to the caller.

```js
function add(a, b) {
  return a + b;
}

const total = add(2, 3);
```

Returning makes the result reusable.

## 10. Function Declaration Hoisting
Function declarations can be called before their declaration is evaluated.

```js
sayHello();

function sayHello() {
  console.log("Hello");
}
```

This is a specific behavior of function declarations.

## 11. Function Expression
A function can be stored in a variable.

```js
const add = function (a, b) {
  return a + b;
};
```

The function expression is created as part of evaluating the assignment.

## 12. Named Function Expression

```js
const factorial = function calculate(n) {
  if (n <= 1) return 1;
  return n * calculate(n - 1);
};
```

The internal name can be useful for recursion and debugging.

## 13. Anonymous Function
A function expression may have no function name.

```js
const greet = function (name) {
  return `Hi ${name}`;
};
```

The variable provides the normal way to access it.

## 14. Arrow Function

```js
const add = (a, b) => a + b;
```

Arrow functions provide concise function syntax and lexical `this` behavior.

## 15. Arrow Function With Block

```js
const add = (a, b) => {
  const result = a + b;
  return result;
};
```

When braces are used, an explicit `return` is required for a returned value.

## 16. Implicit Return

```js
const double = n => n * 2;
```

The expression body is implicitly returned.

## 17. Parentheses Around One Parameter
These are both valid:

```js
const square = n => n * n;
const cube = (n) => n * n * n;
```

Parentheses are required for multiple parameters.

## 18. Default Parameters

```js
function greet(name = "Guest") {
  return `Hello ${name}`;
}
```

The default is used when the corresponding argument is `undefined`.

## 19. `undefined` vs `null` With Defaults

```js
function test(value = 10) {
  return value;
}

test();          // 10
test(undefined); // 10
test(null);      // null
```

A default parameter does not replace explicit `null`.

## 20. Multiple Default Parameters

```js
function createUser(name = "Guest", age = 0) {
  return { name, age };
}
```

Defaults can appear on any parameter, although later parameters may depend on earlier ones.

## 21. Rest Parameters
Rest parameters collect remaining arguments into an array.

```js
function sum(...numbers) {
  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total;
}
```

`numbers` is a real array.

## 22. Rest Must Be Last
This is valid:

```js
function fn(first, ...rest) {}
```

A rest parameter must be the final parameter.

## 23. Spread in Function Calls
Spread expands an iterable into individual arguments.

```js
const numbers = [10, 20, 30];
console.log(Math.max(...numbers));
```

Rest collects; spread expands.

## 24. Rest vs Spread

```text
Rest:
arguments → array

Spread:
iterable → individual values
```

The same `...` syntax has different roles depending on context.

## 25. Arbitrary Arguments
Modern JavaScript normally uses rest instead of the old `arguments` object when an actual array is desired.

```js
function sum(...values) {
  return values.reduce((total, value) => total + value, 0);
}
```

## 26. `arguments`
Normal non-arrow functions have an `arguments` object-like parameter collection.

```js
function show() {
  console.log(arguments.length);
}
```

Arrow functions do not have their own `arguments` binding.

## 27. First-Class Functions
JavaScript functions are values.

They can be:

- assigned to variables
- stored in arrays
- stored in objects
- passed to functions
- returned from functions

## 28. Functions as Arguments

```js
function execute(operation, a, b) {
  return operation(a, b);
}

const result = execute((x, y) => x + y, 2, 3);
```

This is a foundation of functional programming and callbacks.

## 29. Callback
A callback is a function supplied to another function to be invoked by that function.

```js
function processUser(user, callback) {
  callback(user);
}
```

The word describes a role, not a special JavaScript type.

## 30. Higher-Order Function
A higher-order function accepts functions, returns functions, or both.

```js
function createMultiplier(multiplier) {
  return function (value) {
    return value * multiplier;
  };
}
```

## 31. Function Returning Function

```js
const double = createMultiplier(2);
console.log(double(5)); // 10
```

This pattern connects functions with closures.

## 32. Closure Preview
An inner function can retain access to variables from its surrounding lexical scope.

```js
function createCounter() {
  let count = 0;

  return () => ++count;
}
```

The returned function retains access to `count`.

## 33. Closure Lifetime
The outer function can finish executing while the inner function still accesses its variables.

This is possible because the relevant lexical environment remains reachable.

## 34. Factory Function
A factory function creates and returns values, often objects or functions.

```js
function createUser(name) {
  return {
    name,
    greet() {
      return `Hi ${name}`;
    },
  };
}
```

## 35. Pure Function
A pure function produces the same output for the same inputs and does not cause observable side effects.

```js
function add(a, b) {
  return a + b;
}
```

Pure functions are easy to test and reason about.

## 36. Impure Function

```js
let total = 0;

function addToTotal(value) {
  total += value;
}
```

This depends on and modifies external state, so it is not pure.

## 37. Side Effects
Examples include:

- modifying external variables
- DOM changes
- network requests
- logging
- writing files
- database operations

Side effects are not inherently bad; they should be controlled and intentional.

## 38. Function Scope
Parameters and local variables belong to the function's lexical scope.

```js
function test() {
  const secret = 123;
}

// secret is unavailable here
```

## 39. Parameter Scope
Parameters behave as local bindings.

```js
function greet(name) {
  console.log(name);
}
```

`name` exists during calls to this function and is not automatically global.

## 40. Shadowing

```js
const name = "Outer";

function show() {
  const name = "Inner";
  console.log(name);
}
```

The inner binding shadows the outer binding.

## 41. Function Declaration vs Expression

```text
Declaration:
function add() {}

Expression:
const add = function () {};
```

They differ in syntax, hoisting behavior, and how they are created during evaluation.

## 42. Function Name and Binding
A function declaration creates a binding for its name.

A function expression can be assigned to any suitable binding.

```js
const operation = function add(a, b) {
  return a + b;
};
```

## 43. Function Objects
Functions are objects with callable behavior.

They can have properties:

```js
function greet() {}
greet.description = "Greeting function";
```

Avoid unnecessary custom function properties when ordinary objects are clearer.

## 44. `length` Property
A function's `length` generally indicates the number of parameters before the first parameter with a default value, excluding the rest parameter.

```js
function example(a, b, c = 1, ...rest) {}
console.log(example.length); // 2
```

## 45. `name` Property
Functions generally have a `name` property.

```js
const greet = function () {};
console.log(greet.name);
```

The exact inferred name can depend on how a function is defined.

## 46. Function `this` Preview
For ordinary functions, `this` is determined by the call site in non-arrow functions.

```js
const user = {
  name: "Ravi",
  greet() {
    console.log(this.name);
  },
};

user.greet();
```

Do not explain `this` as simply “the object where the function was created.”

## 47. Arrow `this`
Arrow functions do not create their own `this` binding.

```js
const user = {
  name: "Ravi",
  greet: () => console.log(this.name),
};
```

This is generally not a correct way to create an object method that needs the object as `this`.

## 48. Arrow Functions and Constructors
Arrow functions cannot be used with `new` as constructors.

```js
const Person = () => {};
// new Person(); // TypeError
```

This is an important distinction from constructable functions.

## 49. IIFE
An Immediately Invoked Function Expression is created and invoked immediately.

```js
(function () {
  console.log("runs now");
})();
```

IIFEs were historically useful for creating isolated scope before modern modules became common.

## 50. Recursion
A recursive function calls itself.

```js
function countdown(n) {
  if (n <= 0) return;
  console.log(n);
  countdown(n - 1);
}
```

## 51. Base Case
Every useful recursion needs a termination condition.

```js
if (n <= 0) return;
```

Without a reachable base case, recursive calls can continue until the call stack limit is exceeded.

## 52. Recursive Factorial

```js
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
```

For `5`, the conceptual chain is `5 * 4 * 3 * 2 * 1`.

## 53. Call Stack
Each active function call has an execution context represented conceptually by a stack frame.

```text
factorial(5)
  ↓
factorial(4)
  ↓
factorial(3)
  ↓
factorial(2)
  ↓
factorial(1)
```

Calls return in reverse order.

## 54. Stack Overflow
Unbounded recursion can produce a `RangeError` in typical JavaScript engines when the call stack limit is exceeded.

```js
function forever() {
  forever();
}
```

Never use uncontrolled recursion.

## 55. Tail Position
A call is in tail position when its result is directly returned without additional work.

```js
return factorial(n - 1);
```

JavaScript implementations should not be assumed to provide general proper tail-call optimization in common environments.

## 56. Currying
Currying transforms a function of multiple arguments into a sequence of one-argument functions.

```js
const add = a => b => a + b;

console.log(add(2)(3)); // 5
```

## 57. Partial Application
Partial application fixes some arguments and produces a function for the remaining arguments.

```js
function multiply(a, b) {
  return a * b;
}

const double = (value) => multiply(2, value);
```

Currying and partial application are related but not identical.

## 58. Function Composition
Composition combines functions so the output of one becomes the input of another.

```js
const double = n => n * 2;
const addOne = n => n + 1;

const result = addOne(double(5));
```

## 59. Predicate
A predicate is a function that answers a condition, usually returning a boolean.

```js
const isEven = n => n % 2 === 0;
```

Predicates work naturally with filtering and validation.

## 60. Method vs Function
A function stored as an object property is commonly called a method when invoked through that object.

```js
const user = {
  greet() {
    console.log("Hi");
  },
};
```

The call expression affects `this` for ordinary functions.

## 61. Method Extraction

```js
const greet = user.greet;
greet();
```

Extracting an ordinary method can change its `this` value.

If a method depends on `this`, preserve its call context or use `bind` when appropriate.

## 62. `call`
`call` invokes a function with an explicitly supplied `this` value and individual arguments.

```js
function greet(message) {
  console.log(message, this.name);
}

greet.call({ name: "Ravi" }, "Hello");
```

## 63. `apply`
`apply` is similar to `call`, but receives arguments as an array-like value.

```js
greet.apply({ name: "Ravi" }, ["Hello"]);
```

## 64. `bind`
`bind` creates a new function with a bound `this` value and optionally preset arguments.

```js
const boundGreet = greet.bind({ name: "Ravi" }, "Hello");
boundGreet();
```

`bind` does not invoke the original function immediately.

## 65. Default Function Parameters and Evaluation
Default expressions are evaluated when needed during the call.

```js
function getValue(value = createValue()) {
  return value;
}
```

`createValue()` is not called when an actual non-`undefined` argument is supplied.

## 66. Parameter Destructuring
Functions can destructure object arguments.

```js
function showUser({ name, age }) {
  console.log(name, age);
}

showUser({ name: "Ravi", age: 21 });
```

This can make APIs expressive.

## 67. Default Object Parameter
Protect destructuring from a missing argument:

```js
function showUser({ name } = {}) {
  console.log(name);
}
```

Without the default, calling `showUser()` would fail because `undefined` cannot be destructured as an object.

## 68. Rest With Destructuring

```js
function logFirst(first, ...remaining) {
  console.log(first);
  console.log(remaining);
}
```

Rest provides a real array of remaining arguments.

## 69. Callback Example

```js
function calculate(a, b, operation) {
  return operation(a, b);
}

const result = calculate(10, 5, (x, y) => x - y);
```

The caller chooses the operation.

## 70. Callback Error Handling
Callbacks may need an explicit error convention in APIs.

Modern promise-based APIs often provide clearer error propagation for asynchronous workflows, but callback APIs remain common in JavaScript ecosystems.

## 71. Functions and Array Methods
Methods such as `map`, `filter`, `find`, and `reduce` accept callback functions.

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
```

Understanding functions is required to understand these methods deeply.

## 72. Function as Configuration
A function can represent customizable behavior.

```js
function sortUsers(users, getScore) {
  return [...users].sort((a, b) => getScore(b) - getScore(a));
}
```

This separates the algorithm from the policy used to calculate a score.

## 73. Dependency Injection Preview
Instead of hard-coding a dependency, pass it into a function.

```js
function createReport(fetchData) {
  return async function () {
    const data = await fetchData();
    return data;
  };
}
```

This improves testing and modularity.

## 74. Small Functions
A function should have a clear responsibility.

Bad:

```js
function processEverything() {
  // validate
  // fetch
  // transform
  // save
  // send email
}
```

Prefer meaningful boundaries when the workflow becomes large.

## 75. Function Naming
Use verbs for behavior:

```text
getUser
createPost
validateEmail
calculateTotal
formatDate
isEligible
```

A good name reduces the need for comments.

## 76. Boolean Functions
Boolean-returning functions should read naturally:

```js
if (isValidPassword(password)) {
  // ...
}
```

Avoid vague names such as `check()` when the exact rule matters.

## 77. Avoid Hidden Side Effects
A function named `calculateTotal()` should not unexpectedly modify global state or send a network request.

Names and behavior should align.

## 78. Function Length
There is no universal line limit, but a function that is difficult to explain in one sentence is often a candidate for decomposition.

Do not split code mechanically; split along meaningful responsibilities.

## 79. Pure Core, Impure Boundary
A useful architecture is:

```text
Input / I/O
   ↓
Pure transformation
   ↓
Pure decision
   ↓
Output / I/O
```

Keeping domain logic pure can simplify testing.

## 80. Real-World Validation

```js
function validateAge(age) {
  return Number.isInteger(age) && age >= 18;
}
```

The function is small, explicit, and easy to test.

## 81. Browser Example

```js
const button = document.querySelector("#save");

function handleSave() {
  console.log("Saved");
}

button.addEventListener("click", handleSave);
```

The function is passed as a callback and invoked later by the browser.

## 82. Node.js Example

```js
function formatUser(user) {
  return {
    id: user.id,
    name: user.name.trim(),
  };
}

function handleUser(user) {
  const formatted = formatUser(user);
  console.log(formatted);
}
```

Functions create clear boundaries between application operations.

## 83. Async Function Preview
An `async` function always returns a Promise.

```js
async function getUser() {
  return { id: 1 };
}
```

`async` functions belong to the asynchronous JavaScript section, but the function concept starts here.

## 84. Function Errors
A thrown error exits the current function unless caught by an appropriate surrounding `try...catch`.

```js
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}
```

## 85. Validate at Boundaries
Functions that receive external data should validate assumptions at the appropriate boundary.

```js
function calculatePrice(price) {
  if (!Number.isFinite(price)) {
    throw new TypeError("price must be a finite number");
  }

  return price * 1.18;
}
```

## 86. Performance
Calling a function has some runtime overhead, but normal function calls are rarely a meaningful bottleneck by themselves.

Prefer clear abstractions first; optimize only after profiling identifies a real problem.

## 87. Recursion vs Iteration
Recursion can make tree and divide-and-conquer algorithms elegant.

Iteration is often simpler for straightforward repetition and avoids call-stack growth.

Choose based on clarity, algorithmic structure, and constraints.

## 88. Security
Do not dynamically execute untrusted strings as JavaScript.

Avoid APIs such as `eval()` for ordinary application logic.

Passing functions as controlled program behavior is safer and more explicit than interpreting arbitrary source text.

## 89. Common Mistake: Forgetting Return

Wrong:

```js
function add(a, b) {
  a + b;
}
```

Correct:

```js
function add(a, b) {
  return a + b;
}
```

## 90. Common Mistake: Block Arrow Return

Wrong:

```js
const double = n => {
  n * 2;
};
```

Correct:

```js
const double = n => {
  return n * 2;
};
```

Or use an expression body:

```js
const double = n => n * 2;
```

## 91. Common Mistake: Calling Instead of Passing
Wrong:

```js
button.addEventListener("click", handleSave());
```

This calls `handleSave` immediately and passes its return value.

Correct:

```js
button.addEventListener("click", handleSave);
```

## 92. Common Mistake: Wrong `this`

```js
const user = {
  name: "Ravi",
  greet: () => console.log(this.name),
};
```

Arrow functions do not receive `this` from `user.greet()`.

Use a normal method when object-call `this` is intended.

## 93. Common Mistake: Mutating External State
Hidden mutation makes functions harder to reason about.

Prefer returning results when practical:

```js
function addItem(items, item) {
  return [...items, item];
}
```

Whether immutability is appropriate depends on the application and performance requirements.

## 94. Common Mistake: Overusing Callbacks
Callbacks are useful, but deeply nested callback structures can reduce readability.

Promises and `async/await` are generally clearer for modern asynchronous control flow.

## 95. Debugging Function Calls
When a function gives a surprising result, inspect:

1. arguments
2. parameter bindings
3. branch conditions
4. return paths
5. external state
6. `this` when relevant
7. thrown errors

## 96. Output Prediction
Predict before running:

```js
function test(value = 10) {
  return value * 2;
}

console.log(test());
console.log(test(undefined));
console.log(test(null));
```

Then explain why the three results differ.

## 97. Output Prediction — Closure

```js
function createCounter() {
  let count = 0;
  return () => ++count;
}

const a = createCounter();
const b = createCounter();

console.log(a());
console.log(a());
console.log(b());
```

Explain why `a` and `b` do not share the same `count` binding.

## 98. Output Prediction — Method Extraction

```js
const user = {
  name: "Ravi",
  greet() {
    return this.name;
  },
};

console.log(user.greet());
const greet = user.greet;
console.log(greet());
```

Predict the second result under strict-mode/module semantics and explain the lost receiver.

## 99. Practice — Beginner
Write functions for:

1. add two numbers
2. subtract two numbers
3. multiply two numbers
4. divide two numbers
5. square a number
6. check even/odd
7. find maximum of two values
8. convert Celsius to Fahrenheit
9. calculate rectangle area
10. greet a user

## 100. Practice — Intermediate
Write functions for:

1. factorial
2. Fibonacci
3. prime check
4. reverse string
5. count vowels
6. frequency counter
7. array sum
8. array maximum
9. array filtering
10. object validation

## 101. Practice — Advanced
Implement:

1. function composition
2. curry helper
3. partial application helper
4. memoization helper
5. retry wrapper
6. debounce helper
7. throttle helper
8. once helper
9. pipe helper
10. function that accepts injected dependencies

## 102. Debugging Challenge
Fix all problems in this code:

```js
const calculate = (a, b, operation()) => {
  if (operation === "add") {
    a + b;
  }
};
```

Correct the parameter design, invocation, comparison, and return behavior.

## 103. Mini Project — Calculator Engine
Build a calculator using functions:

```text
Input
 ↓
validateInput()
 ↓
selectOperation()
 ↓
calculate()
 ↓
formatResult()
 ↓
Output
```

Support `+`, `-`, `*`, `/`, validation, and division-by-zero handling.

## 104. Mini Project — Function Utilities
Build a small utility library containing:

- `once`
- `memoize`
- `compose`
- `pipe`
- `curry`
- `debounce`
- `throttle`

Write tests for each utility.

## 105. Interview Questions

- What is a function?
- Parameters vs arguments?
- Declaration vs expression?
- What is hoisting for function declarations?
- What is an arrow function?
- How is arrow `this` different?
- What is a callback?
- What is a higher-order function?
- What is a closure?
- What is recursion?
- Why does recursion need a base case?
- What is the call stack?
- What are rest parameters?
- Rest vs spread?
- What is `arguments`?
- Why don't arrow functions have their own `arguments`?
- What is an IIFE?
- What is a pure function?
- What is a side effect?
- What is currying?
- What is partial application?
- Difference between `call`, `apply`, and `bind`?
- What does `return` do?
- Why can a function return `undefined`?
- Why can method extraction change `this`?

## 106. Teach-Back Questions
Teach these without reading the notes:

1. Explain function parameters and arguments.
2. Explain return vs console.log.
3. Explain declaration vs expression.
4. Explain arrow functions.
5. Explain rest vs spread.
6. Explain callbacks.
7. Explain higher-order functions.
8. Explain closures with a counter.
9. Explain recursion and the call stack.
10. Explain `this` in ordinary and arrow functions.
11. Explain `call`, `apply`, and `bind`.
12. Explain pure vs impure functions.
13. Explain currying vs partial application.

## 107. Refactoring Checklist
When reviewing a function, ask:

- Does its name describe its behavior?
- Does it have one clear responsibility?
- Are inputs explicit?
- Are outputs explicit?
- Are side effects intentional?
- Are error cases handled?
- Is external state minimized?
- Can the core logic be tested independently?
- Is the function unnecessarily large?
- Would a named helper improve readability?

## 108. Best Practices

- Prefer clear names.
- Keep responsibilities focused.
- Return useful values.
- Avoid hidden side effects.
- Use strict comparisons where appropriate.
- Use default parameters deliberately.
- Prefer rest parameters for variadic APIs.
- Use arrows when lexical `this` is desired.
- Use normal functions/methods when dynamic `this` is desired.
- Avoid unnecessary recursion.
- Validate external inputs.
- Keep business rules testable.
- Prefer dependency injection for replaceable dependencies.

## 109. When to Use Functions
Use functions whenever behavior is repeated, logically isolated, testable, configurable, or meaningful enough to name.

Functions are the basic unit of reusable behavior in JavaScript programs.

## 110. When Not to Over-Abstract
Do not create a helper for every two-line expression merely to increase function count.

Abstraction should improve understanding, reuse, testing, or changeability.

## 111. Memory Trick

```text
Function = Input → Work → Output

Parameter = named input
Argument  = supplied input
Return    = output to caller
Callback  = function passed in
HOF       = function using functions
Closure   = function + remembered lexical environment
```

## 112. Final Mental Model

```text
Define behavior
     ↓
Create function
     ↓
Call with arguments
     ↓
Parameters receive values
     ↓
Body executes
     ↓
Return / throw
     ↓
Caller continues
```

## 113. Mastery Checklist

- [ ] Define a function precisely.
- [ ] Write function declarations.
- [ ] Write function expressions.
- [ ] Write arrow functions.
- [ ] Explain hoisting differences.
- [ ] Use parameters and arguments correctly.
- [ ] Return values correctly.
- [ ] Use default parameters.
- [ ] Use rest parameters.
- [ ] Use spread in calls.
- [ ] Explain `arguments`.
- [ ] Pass callbacks.
- [ ] Write higher-order functions.
- [ ] Explain closures.
- [ ] Build factory functions.
- [ ] Distinguish pure and impure functions.
- [ ] Explain side effects.
- [ ] Implement recursion safely.
- [ ] Explain call-stack behavior.
- [ ] Use currying and partial application.
- [ ] Compose functions.
- [ ] Understand method `this`.
- [ ] Understand arrow `this`.
- [ ] Use call/apply/bind correctly.
- [ ] Debug function execution.
- [ ] Design testable functions.
- [ ] Teach functions to another beginner confidently.
