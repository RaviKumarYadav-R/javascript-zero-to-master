# Scope and Execution in JavaScript

## 1. Definition
Scope determines where a binding can be accessed. Execution explains how JavaScript creates bindings, evaluates code, enters and leaves function calls, and resolves identifiers.

## 2. Why This Topic Matters
Many JavaScript bugs that look mysterious are scope or execution problems: `ReferenceError`, unexpected shadowing, stale closures, surprising `this`, hoisting behavior, and lost method receivers.

## 3. Core Mental Model

```text
Source code
   ↓
Lexical structure / scopes
   ↓
Bindings become available
   ↓
Code executes
   ↓
Identifier lookup follows scope chain
   ↓
Function calls create new execution contexts
   ↓
Contexts return / unwind
```

## 4. Lexical Scope
JavaScript uses lexical scoping: the source-code location where a function or block is written determines which outer bindings it can access.

```js
const outer = "A";

function show() {
  console.log(outer);
}
```

`show` can resolve `outer` because of where `show` is defined.

## 5. Global Scope
Top-level code can create bindings available to other code according to the execution environment and source type.

Do not assume every top-level declaration becomes a property of the global object.

## 6. Function Scope
A function creates a function-level lexical environment for its parameters and local declarations.

```js
function test() {
  const secret = 42;
}
```

`secret` is not accessible outside the function.

## 7. Block Scope
`let` and `const` are block scoped.

```js
{
  const message = "inside";
}

// message is unavailable here
```

Blocks include bodies of `if`, loops, and standalone `{}` blocks.

## 8. `var` and Function Scope
`var` is function scoped rather than block scoped.

```js
function test() {
  if (true) {
    var value = 10;
  }

  console.log(value); // 10
}
```

This is one reason modern code generally prefers `let` and `const`.

## 9. Scope Chain
When JavaScript resolves an identifier, it checks the current lexical environment and then relevant outer environments.

```text
Current scope
     ↓
Outer scope
     ↓
Outer scope
     ↓
Global environment
```

If no binding is found, a `ReferenceError` occurs for an unresolved identifier.

## 10. Identifier Resolution

```js
const name = "global";

function outer() {
  const name = "outer";

  function inner() {
    console.log(name);
  }

  inner();
}
```

`inner` resolves `name` to the nearest matching lexical binding: `outer`.

## 11. Shadowing
A nested binding with the same name shadows an outer binding.

```js
const value = "A";

{
  const value = "B";
  console.log(value); // B
}

console.log(value); // A
```

Shadowing is legal, but excessive shadowing can reduce readability.

## 12. Shadowing Does Not Mutate the Outer Binding
The inner and outer bindings are distinct.

```js
let count = 10;

function test() {
  let count = 20;
  count++;
}

test();
console.log(count); // 10
```

## 13. Illegal Shadowing
Some declaration combinations are invalid because lexical declarations cannot conflict with certain declarations in the same lexical environment.

```js
let value = 1;
// var value = 2; // SyntaxError in the same scope
```

Understand the actual environment boundaries rather than memorizing isolated rules.

## 14. Nested Scope
Scopes can be nested.

```js
function outer() {
  const a = 1;

  if (true) {
    const b = 2;
    console.log(a, b);
  }
}
```

Inner code can generally access outer lexical bindings, but outer code cannot access inner-only bindings.

## 15. Direction of Access

```text
Outer → cannot see inner-only bindings
Inner → can resolve outer bindings
```

This one-way lexical visibility is fundamental to closures.

## 16. Closures
A closure is a function together with access to the lexical environment in which it was created.

```js
function createCounter() {
  let count = 0;

  return function () {
    count += 1;
    return count;
  };
}
```

The returned function retains access to `count`.

## 17. Closure Is Not Just “Inner Function”
An inner function becomes practically interesting as a closure when it retains access to bindings from an enclosing lexical scope after that enclosing function has returned.

## 18. Closure Lifetime

```js
const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
```

The outer invocation has finished, but `count` remains reachable through the returned function.

## 19. Separate Closure Instances

```js
const a = createCounter();
const b = createCounter();

console.log(a()); // 1
console.log(a()); // 2
console.log(b()); // 1
```

Each call to `createCounter()` creates its own lexical environment.

## 20. Closure as Private State
Closures can hide state behind a controlled function API.

```js
function createBankAccount() {
  let balance = 0;

  return {
    deposit(amount) {
      balance += amount;
    },
    getBalance() {
      return balance;
    },
  };
}
```

The returned object exposes behavior without exposing `balance` directly.

## 21. Hoisting — Precise Meaning
“Hoisting” is a teaching term for declaration instantiation behavior that makes certain bindings or declarations available before their source position is reached during execution.

It does not mean JavaScript literally moves source code to the top.

## 22. Function Declaration Hoisting

```js
sayHello();

function sayHello() {
  console.log("Hello");
}
```

The function declaration is available when execution reaches the call.

## 23. `var` Hoisting
A `var` binding is initialized to `undefined` during environment setup.

```js
console.log(value); // undefined
var value = 10;
```

Conceptually, do not interpret this as the assignment moving upward.

## 24. `let` and `const` Hoisting
`let` and `const` bindings are created before their declaration is executed, but they are not initialized for access until evaluation reaches the declaration.

```js
// console.log(value); // ReferenceError
let value = 10;
```

## 25. Temporal Dead Zone
The Temporal Dead Zone (TDZ) is the interval from entering the relevant lexical environment until a `let`, `const`, or class binding is initialized.

```js
{
  // TDZ for value
  const value = 10;
}
```

Accessing the binding during the TDZ throws `ReferenceError`.

## 26. TDZ Is About the Binding
Do not describe TDZ as simply “the variable does not exist.” The binding has been established but is not initialized for normal access yet.

## 27. `typeof` and TDZ
`typeof` is not a universal escape hatch for undeclared or uninitialized lexical bindings.

```js
// console.log(typeof value); // ReferenceError
let value = 10;
```

For a truly undeclared identifier, `typeof undeclaredName` has historically returned `"undefined"`.

## 28. Class TDZ
Class declarations also have TDZ behavior.

```js
// new Person(); // ReferenceError
class Person {}
```

Classes are not callable before their declaration is evaluated like hoisted function declarations.

## 29. Declaration vs Initialization

```js
let score;     // declaration
score = 100;   // assignment / initialization after declaration
```

For `const`, declaration and initialization must occur together:

```js
const score = 100;
```

## 30. Execution Context
An execution context is the conceptual specification-level structure associated with evaluating JavaScript code.

Common categories discussed in JavaScript include global, function, and module execution contexts.

## 31. Global Execution Context
Before top-level JavaScript begins executing, the runtime establishes the structures needed for global code.

Exact details vary by source type and host environment, so avoid treating “global execution context” as one universal browser memory diagram.

## 32. Function Execution Context
When a function is called, a new function execution context is created for that invocation.

```js
function add(a, b) {
  return a + b;
}

add(2, 3);
```

The call needs its own parameter bindings and execution state.

## 33. Every Call Gets Its Own Parameters

```js
function greet(name) {
  console.log(name);
}

greet("Ravi");
greet("Aman");
```

Each invocation has its own parameter binding for `name`.

## 34. Call Stack
The call stack tracks active execution contexts/calls conceptually.

```text
main / top-level
      ↓
  function A()
      ↓
  function B()
      ↓
  function C()
```

The most recent active call is handled first.

## 35. Stack Unwinding
When a function returns or terminates by an uncaught exception, its active execution is removed from the call stack and control continues according to the surrounding program flow.

## 36. Nested Calls

```js
function first() {
  second();
}

function second() {
  third();
}

function third() {
  console.log("done");
}

first();
```

The conceptual stack grows and then unwinds.

## 37. Recursion and Stack
Recursive calls create multiple active calls.

```js
function countDown(n) {
  if (n === 0) return;
  countDown(n - 1);
}
```

Too many active calls can exceed the engine's stack limit.

## 38. Stack Overflow

```js
function loop() {
  loop();
}

// loop(); // typically causes RangeError after stack exhaustion
```

A stack overflow is an execution-resource failure, not an ordinary logical return.

## 39. Creation and Execution Phases
A useful teaching model separates environment setup from statement evaluation.

```text
Environment setup
      ↓
Bindings/declarations prepared
      ↓
Statements evaluated in order
      ↓
Functions called
      ↓
Contexts return
```

The exact ECMAScript algorithms are more detailed than this model.

## 40. Environment Records
ECMAScript specifies environment records as structures used to associate identifiers with values and other binding information.

You can think of them as the specification's model for lexical bindings rather than as literal JavaScript objects you can inspect.

## 41. Declarative Environment Records
Lexical declarations such as `let`, `const`, and many function-local bindings are modeled through declarative environment records.

Do not assume they are ordinary objects with enumerable properties.

## 42. Object Environment Records
Some environments are modeled around objects, such as certain global-environment behavior involving object-backed bindings.

This is why simplistic “all variables are properties on an object” explanations are incorrect.

## 43. Global Environment
The global environment has specialized behavior that connects global code with the host's global object while maintaining lexical declarations separately.

This distinction explains why top-level `var`, `let`, and `const` can behave differently in scripts.

## 44. Script Top-Level `var`
In a browser classic script, top-level `var` commonly creates a property on the global object.

```js
var score = 10;
console.log(globalThis.score); // 10 in a classic browser script
```

This behavior is source-type and host dependent; modules differ.

## 45. Script Top-Level `let`
Top-level `let` in a classic browser script does not create a corresponding global-object property.

```js
let score = 10;
console.log(globalThis.score); // undefined
```

The lexical global binding still exists in the script's global environment.

## 46. Modules Have Their Own Top-Level Scope
ES modules have module-level lexical scope.

```js
const secret = 123;
```

That binding is not automatically a property of `globalThis`.

## 47. Module Strictness
Code in ES modules is strict mode code by default.

This affects behavior such as ordinary function `this`, assignment errors, and restricted syntax.

## 48. Identifier Lookup Example

```js
const x = "global";

function outer() {
  const x = "outer";

  function inner() {
    console.log(x);
  }

  inner();
}

outer();
```

Lookup inside `inner` finds `x` in `outer` before reaching the global binding.

## 49. Lexical vs Dynamic Scoping
JavaScript is lexically scoped, not dynamically scoped.

The caller of a function does not determine which outer variables the function can see.

## 50. Lexical Scope Example

```js
const value = "A";

function read() {
  return value;
}

function caller() {
  const value = "B";
  return read();
}

console.log(caller()); // A
```

`read` was defined where the global `value` was visible.

## 51. Why Dynamic Scope Would Differ
Under dynamic scoping, `read()` could potentially resolve `value` from its caller. JavaScript does not work that way.

This distinction is essential for understanding closures.

## 52. Closure and Callback

```js
function createGreeting(name) {
  return function () {
    return `Hello ${name}`;
  };
}

const greetRavi = createGreeting("Ravi");
console.log(greetRavi());
```

The callback retains lexical access to `name`.

## 53. Loop Closure Trap With `var`

```js
var callbacks = [];

for (var i = 0; i < 3; i++) {
  callbacks.push(() => console.log(i));
}

callbacks[0]();
callbacks[1]();
callbacks[2]();
```

All callbacks observe the same function-scoped `i`, whose final value is `3`.

## 54. `let` Fixes Per-Iteration Binding

```js
const callbacks = [];

for (let i = 0; i < 3; i++) {
  callbacks.push(() => console.log(i));
}

callbacks[0](); // 0
callbacks[1](); // 1
callbacks[2](); // 2
```

`let` loop semantics provide per-iteration bindings suitable for closures.

## 55. Closure With Mutable State
Closures can observe later mutations of captured bindings.

```js
let message = "A";

function show() {
  console.log(message);
}

message = "B";
show(); // B
```

Closures capture access to bindings, not frozen snapshots of primitive values.

## 56. Closure With Objects

```js
const state = { count: 0 };

function read() {
  return state.count;
}

state.count = 5;
console.log(read()); // 5
```

The closure retains access to the binding referring to the object.

## 57. Memory and Closures
A closure can keep referenced state alive while the closure remains reachable.

Therefore, large objects captured unnecessarily by long-lived callbacks can contribute to memory retention.

## 58. Event Listener Closure

```js
function setup(button) {
  const message = "Saved";

  button.addEventListener("click", () => {
    console.log(message);
  });
}
```

The event callback closes over `message`.

## 59. Closure Does Not Mean Memory Leak
Closures are normal language behavior and are not inherently leaks.

A leak occurs when objects remain reachable longer than intended, often through unnecessary listeners, caches, timers, or retained references.

## 60. `this` Is Not Lexical Scope
A critical distinction:

```text
Lexical variables → determined by where function is defined
`this` in ordinary functions → determined by how function is called
```

Arrow functions are different because they capture `this` lexically from their surrounding context.

## 61. Method Call `this`

```js
const user = {
  name: "Ravi",
  greet() {
    return this.name;
  },
};

console.log(user.greet()); // Ravi
```

The method call provides `user` as the receiver for ordinary method-call semantics.

## 62. Method Extraction

```js
const greet = user.greet;
```

The function value has been extracted from the property access. Calling `greet()` is no longer the same as `user.greet()`.

## 63. Strict Function `this`
In strict mode, a plain call of an ordinary function has `this === undefined` unless another call mechanism supplies a receiver.

```js
"use strict";

function showThis() {
  return this;
}

console.log(showThis()); // undefined
```

## 64. `call` Controls `this`

```js
function greet() {
  return this.name;
}

console.log(greet.call({ name: "Ravi" }));
```

`call` explicitly supplies the receiver value.

## 65. `bind` Controls Future Calls

```js
const boundGreet = greet.bind({ name: "Ravi" });
console.log(boundGreet());
```

The returned function remembers the bound `this` value.

## 66. Arrow Functions Capture `this`
Arrow functions do not have their own `this` binding.

```js
const user = {
  name: "Ravi",
  createLogger() {
    return () => this.name;
  },
};
```

The returned arrow can access the `this` from `createLogger`.

## 67. Arrow Function Cannot Be Rebound With `call`
`call`, `apply`, and `bind` do not replace an arrow function's lexical `this`.

This is one reason arrows are useful for callbacks that should retain surrounding `this`.

## 68. Constructor `this` Preview
When a constructable function is invoked with `new`, the new instance becomes the relevant `this` during the constructor call.

Classes use the same underlying object/prototype model with additional language syntax.

## 69. `new` and Scope Are Different Concepts
`new` affects construction and `this`; lexical scope still follows where functions and blocks are defined.

Do not mix “prototype chain,” “scope chain,” and “call stack.” They solve different problems.

## 70. Scope Chain vs Prototype Chain

```text
Scope chain:
identifier → lexical environments

Prototype chain:
property lookup → object prototypes

Call stack:
active execution → function calls
```

Keeping these three models separate prevents many conceptual errors.

## 71. Scope Chain vs Call Stack
A function's lexical scope does not change merely because a different function calls it.

The call stack describes current execution; the scope chain describes lexical name resolution.

## 72. Execution Context vs Scope
Scope answers “where can this identifier be resolved?”

Execution context describes the state associated with evaluating code.

They are related but not interchangeable terms.

## 73. Global `this`
The value of top-level `this` depends on source type and host semantics.

In browser classic scripts, top-level `this` is commonly the global object. In ES modules, top-level `this` is `undefined`.

## 74. `globalThis`
`globalThis` is the standard cross-environment reference to the global object/value.

```js
console.log(globalThis);
```

It is preferable to environment-specific names when you genuinely need the global object.

## 75. Browser vs Node Global Names
Browser code commonly exposes `window`; Node.js has its own global environment and does not provide `window` by default.

Modern Node and browsers both support `globalThis`.

## 76. Function Invocation Types
For ordinary functions, `this` behavior depends on invocation form, including:

- plain call
- method call
- `call`
- `apply`
- `bind`
- constructor call with `new`

Understanding the call expression is often more useful than memorizing a single rule.

## 77. `arguments` and Execution
Normal functions receive their own `arguments` binding.

```js
function inspect(a, b) {
  console.log(arguments.length);
}

inspect(1, 2, 3); // 3
```

Arrow functions do not create their own `arguments` binding.

## 78. Default Parameter Scope
Default parameter expressions are evaluated in a parameter environment before the function body executes.

```js
function test(a = 10, b = a + 5) {
  return b;
}
```

Here `b` can use the earlier parameter `a`.

## 79. Parameter Name Resolution
Parameters are local bindings for the function call and can shadow outer names.

```js
const name = "outer";

function greet(name) {
  return name;
}
```

The parameter `name` wins inside the function body.

## 80. Block Scope Inside Function

```js
function test() {
  const outside = 1;

  {
    const inside = 2;
    console.log(outside, inside);
  }
}
```

The function can contain multiple nested lexical environments.

## 81. `for` Scope
A `let` declaration in a `for` loop has block/iteration semantics that are especially important when callbacks capture the loop variable.

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

This prints `0`, `1`, and `2` in typical browser/Node timer behavior.

## 82. Timer Does Not Change Lexical Scope
`setTimeout` schedules a callback for later; it does not make the callback dynamically inherit the caller's scope.

The callback still uses the lexical environment determined when it was created.

## 83. Asynchronous Closures Preview

```js
function greetLater(name) {
  setTimeout(() => {
    console.log(`Hello ${name}`);
  }, 100);
}
```

The callback later accesses `name` through its closure.

Detailed event-loop behavior belongs to asynchronous JavaScript.

## 84. Execution Order Example

```js
console.log("A");

function test() {
  console.log("B");
}

test();
console.log("C");
```

Output:

```text
A
B
C
```

Declarations being instantiated does not mean every function body executes immediately.

## 85. Function Declaration Does Not Execute Itself

```js
function greet() {
  console.log("Hello");
}

console.log("Start");
```

Defining a function does not run its body. The body executes when the function is invoked.

## 86. Nested Function Definition

```js
function outer() {
  function inner() {
    console.log("inner");
  }

  inner();
}
```

`inner` is created/available as part of evaluating the surrounding function according to declaration instantiation semantics, but its body runs only when called.

## 87. Function Expression Timing

```js
// add(1, 2); // ReferenceError because the const binding is in TDZ
const add = function (a, b) {
  return a + b;
};
```

Do not confuse a function expression assigned to `const` with a function declaration.

## 88. `var` Function Expression Timing

```js
// add(1, 2); // TypeError: add is not a function
var add = function (a, b) {
  return a + b;
};
```

The `var` binding is `undefined` before assignment, so calling it as a function fails.

## 89. Scope Debugging Workflow
When a variable is unexpectedly unavailable or has the wrong value:

1. Find its declaration.
2. Identify the nearest lexical scope.
3. Check for shadowing.
4. Check declaration kind.
5. Check whether execution has reached initialization.
6. Inspect closures.
7. Inspect the call site for `this` issues.

## 90. Output Prediction Challenge
Predict:

```js
let value = "A";

function outer() {
  let value = "B";

  function inner() {
    return value;
  }

  return inner;
}

const read = outer();
value = "C";
console.log(read());
```

Expected reasoning: `inner` closes over `outer`'s `value`, not the global `value`.

## 91. Output Prediction — TDZ
Predict the result:

```js
console.log(typeof value);
let value = 10;
```

Answer: `ReferenceError`, because the lexical binding is in the TDZ.

## 92. Output Prediction — `var`

```js
console.log(value);
var value = 10;
```

Answer: `undefined`.

The binding exists and is initialized to `undefined` before the assignment executes.

## 93. Output Prediction — Shadowing

```js
const x = 1;

function test() {
  const x = 2;
  {
    const x = 3;
    console.log(x);
  }
}

test();
```

Answer: `3`, because lookup starts in the innermost block.

## 94. Output Prediction — Closure

```js
function make() {
  let x = 1;

  return () => x;
}

const fn = make();
console.log(fn());
```

Answer: `1`. The returned function retains lexical access to `x`.

## 95. Common Mistake: “Hoisting Moves Code”
Wrong mental model:

```text
JavaScript physically moves every declaration to the top.
```

Better model:

```text
The runtime establishes bindings/declarations according to language rules,
then evaluates executable code in order.
```

## 96. Common Mistake: “Closure Stores a Copy”
Wrong:

```text
A closure freezes the current value.
```

Better:

```text
A closure retains access to the relevant lexical binding.
```

That binding can later hold a different value.

## 97. Common Mistake: “Scope = Call Stack”
The call stack changes as functions call and return.

Lexical scope is determined by source structure.

A caller does not rewrite the callee's lexical scope.

## 98. Common Mistake: “Arrow Functions Have No `this`”
More precise:

Arrow functions do not define their own `this` binding. They resolve `this` from the surrounding lexical context.

## 99. Common Mistake: “`let` Is Not Hoisted”
Better:

`let` bindings are established before execution reaches their declaration, but they remain uninitialized and inaccessible during the TDZ.

## 100. Common Mistake: Confusing `undefined` With Unresolvable
These are different:

```js
let value;
console.log(value); // undefined
```

versus:

```js
// console.log(missing); // ReferenceError
```

An initialized binding containing `undefined` is not the same as an unresolved identifier.

## 101. Browser Example

```html
<script>
  var classicVar = 1;
  let lexicalValue = 2;

  console.log(globalThis.classicVar); // 1
  console.log(globalThis.lexicalValue); // undefined
</script>
```

This illustrates classic-script global environment behavior in browsers.

## 102. Module Example

```js
// app.js
const secret = "module-only";

export function getSecret() {
  return secret;
}
```

`secret` is module-scoped and is not automatically a global property.

## 103. Node.js Example

```js
function createLogger(prefix) {
  return (message) => {
    console.log(`[${prefix}] ${message}`);
  };
}

const info = createLogger("INFO");
info("Server started");
```

The returned callback closes over `prefix`.

## 104. Performance
Scope lookup is heavily optimized by modern JavaScript engines, so do not perform manual micro-optimizations such as copying every outer variable into locals without profiling evidence.

Optimize actual hot paths based on measurements.

## 105. Memory
Long-lived closures can retain reachable values.

If a callback captures a large object unnecessarily and remains registered for a long time, that object may remain reachable.

Use appropriate cleanup for event listeners, timers, subscriptions, and caches.

## 106. Security
Scope provides useful encapsulation, but it is not an authorization boundary by itself.

Client-side lexical privacy cannot protect secrets from a user who controls the runtime.

Never put server secrets into browser JavaScript merely because a value is hidden inside a closure.

## 107. Advanced Mental Model
Think in three separate dimensions:

```text
1. Lexical environments
   → where names resolve

2. Execution contexts / call stack
   → what code is currently executing

3. Object prototypes
   → where properties are inherited from
```

A strong JavaScript developer can reason about all three independently.

## 108. Practice — Beginner

1. Create a function-local variable.
2. Create a block-local `let` variable.
3. Demonstrate `var` function scope.
4. Demonstrate shadowing.
5. Predict a `var` hoisting example.
6. Predict a TDZ example.
7. Explain lexical scope.
8. Trace a three-level scope chain.
9. Create a simple closure.
10. Explain why an outer scope cannot access an inner `const`.

## 109. Practice — Intermediate

1. Build a counter closure.
2. Build a private settings factory.
3. Fix a `var` loop closure bug.
4. Compare function declaration and function expression timing.
5. Trace nested function calls.
6. Explain method extraction.
7. Use `bind` to preserve `this`.
8. Compare module and script top-level bindings.
9. Trace shadowing across three blocks.
10. Explain closure retention.

## 110. Practice — Advanced

1. Implement a closure-based cache.
2. Implement a private-state module.
3. Build a callback registry with cleanup.
4. Explain a closure memory-retention case.
5. Predict a complex TDZ example.
6. Trace nested recursion with the call stack.
7. Compare lexical scope and prototype lookup.
8. Build a method-binding utility.
9. Analyze an event-listener closure.
10. Refactor a scope-heavy module into clear boundaries.

## 111. Debugging Challenge
Fix the following conceptually:

```js
var handlers = [];

for (var i = 0; i < 3; i++) {
  handlers.push(() => console.log(i));
}
```

Produce `0`, `1`, `2` when the handlers are called. Use `let`, a factory function, or another deliberate binding strategy.

## 112. Mini Project — Closure Counter
Build:

```text
createCounter()
      ↓
private count
      ↓
 increment()
 decrement()
 reset()
 getValue()
```

The `count` variable must not be directly accessible from outside.

## 113. Mini Project — Scope Visualizer
Create a small page that accepts nested JavaScript examples and visually documents:

```text
Global
 └── Function
      └── Block
           └── Inner Function
```

For each identifier, display the nearest lexical scope that supplies its binding.

## 114. Interview Questions

- What is lexical scope?
- What is the scope chain?
- What is function scope?
- What is block scope?
- How does `var` differ from `let` and `const`?
- What is hoisting?
- Are `let` and `const` hoisted?
- What is the TDZ?
- What is an execution context?
- What is the call stack?
- What is an environment record?
- What is a closure?
- Does a closure capture values or bindings?
- Why does `var` create the classic loop closure bug?
- Why does `let` fix it?
- What is lexical vs dynamic scoping?
- How is scope different from the prototype chain?
- How is scope different from the call stack?
- How does `this` differ from lexical variables?
- Why does method extraction affect `this`?
- Why don't arrow functions have their own `this`?
- Why is `typeof` not safe against TDZ access?

## 115. Teach-Back Questions

Explain without notes:

1. Scope in one minute.
2. Scope chain with a diagram.
3. `var` vs `let` vs `const` scope.
4. Hoisting without saying “code moves upward.”
5. TDZ precisely.
6. Execution context.
7. Call stack.
8. Closure with a counter.
9. Why closures can retain memory.
10. Lexical scope vs dynamic scope.
11. Scope chain vs prototype chain.
12. `this` vs lexical scope.

## 116. Refactoring Checklist

- Is every binding declared in the narrowest sensible scope?
- Is shadowing necessary and clear?
- Could a global variable become module-local?
- Are closures intentionally retaining state?
- Are callbacks cleaned up when necessary?
- Is `this` dependence explicit?
- Would dependency injection remove hidden outer-state dependencies?
- Are `var` declarations necessary?
- Are function expressions being called before initialization?
- Can the execution flow be explained from the call stack?

## 117. Best Practices

- Prefer `const` by default.
- Use `let` when reassignment is required.
- Avoid `var` in new code unless its function-scoping semantics are intentional.
- Keep bindings in the narrowest useful scope.
- Avoid unnecessary globals.
- Use modules for boundaries.
- Use closures deliberately for state and factories.
- Clean up long-lived callbacks and subscriptions.
- Do not rely on simplistic hoisting diagrams.
- Keep `this` behavior explicit.
- Separate scope, call-stack, and prototype reasoning.

## 118. When to Use Closures
Closures are excellent for:

- private state
- factories
- callbacks
- configuration
- memoization
- event handlers
- function generators

## 119. When Not to Use Closures Excessively
Do not capture large mutable state unnecessarily just because a closure is convenient.

For complex shared state, modules, classes, or explicit state-management structures may communicate the design better.

## 120. Memory Trick

```text
Scope      = Where can I access this name?
Hoisting   = When is the binding/declaration established?
TDZ        = Binding exists, but lexical access is not initialized yet.
Closure    = Function + retained lexical access.
Stack      = Which calls are currently active?
`this`     = What receiver/context does this call provide?
Prototype  = Where does this property come from?
```

## 121. Final Mastery Checklist

- [ ] Explain lexical scope.
- [ ] Explain global scope.
- [ ] Explain function scope.
- [ ] Explain block scope.
- [ ] Explain `var` function scope.
- [ ] Explain the scope chain.
- [ ] Trace identifier resolution.
- [ ] Explain shadowing.
- [ ] Explain hoisting precisely.
- [ ] Explain `var` hoisting.
- [ ] Explain `let`/`const` initialization.
- [ ] Explain TDZ.
- [ ] Explain class TDZ.
- [ ] Explain execution contexts.
- [ ] Explain environment records conceptually.
- [ ] Trace the call stack.
- [ ] Explain stack unwinding.
- [ ] Explain recursion and stack growth.
- [ ] Create closures.
- [ ] Explain closure lifetime.
- [ ] Explain closure memory retention.
- [ ] Fix the `var` loop closure problem.
- [ ] Explain lexical vs dynamic scope.
- [ ] Separate scope chain from prototype chain.
- [ ] Separate scope from call stack.
- [ ] Explain ordinary-function `this`.
- [ ] Explain arrow-function `this`.
- [ ] Use `call`, `apply`, and `bind` appropriately.
- [ ] Explain script vs module scope.
- [ ] Explain `globalThis`.
- [ ] Debug scope and execution bugs.
- [ ] Teach scope and execution confidently.
