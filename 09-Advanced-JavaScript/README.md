# 09 — Advanced JavaScript

> This chapter connects the JavaScript features that become important when you move from syntax-level coding to understanding how JavaScript actually behaves.

---

## 1. What Is Advanced JavaScript?

Advanced JavaScript means understanding behavior, language protocols, execution, metaprogramming, and patterns rather than memorizing syntax.

```text
Syntax → Semantics → Runtime behavior → Language protocols → Architecture
```

---

## 2. Why Advanced JavaScript Matters

It helps you debug code that looks correct but behaves unexpectedly.

It also makes frameworks, libraries, and Node.js internals easier to understand.

---

## 3. The Advanced Mental Model

Think about every operation through:

```text
Value
 ↓
Type
 ↓
Operation
 ↓
Coercion / protocol
 ↓
Result
```

---

## 4. Primitive Values

JavaScript primitives include:

- string
- number
- bigint
- boolean
- undefined
- null
- symbol

Primitives are immutable values.

---

## 5. Objects Are Reference Values

Objects can be mutated and are compared by identity.

```js
const a = {};
const b = a;
console.log(a === b); // true
```

---

## 6. Identity vs Equality

Equality asks whether values compare equal under a selected comparison algorithm.

Identity concerns whether two references point to the same object.

---

## 7. `Object.is()`

`Object.is()` uses SameValue semantics.

```js
Object.is(NaN, NaN); // true
Object.is(0, -0); // false
```

---

## 8. Strict Equality

`===` uses strict equality semantics.

```js
NaN === NaN; // false
0 === -0; // true
```

Do not treat `===` and `Object.is()` as identical.

---

## 9. SameValueZero

SameValueZero treats `NaN` as equal to `NaN` and treats `0` and `-0` as equal.

It is used by APIs such as `Set` and `Map` key matching.

---

## 10. Abstract Operations

ECMAScript defines internal abstract operations such as:

- ToPrimitive
- ToBoolean
- ToNumber
- ToString
- ToObject
- Get
- Set
- Call
- Construct

These explain many surprising behaviors.

---

## 11. `ToPrimitive`

When JavaScript needs a primitive from an object, it can invoke conversion protocols.

```js
const value = {
  valueOf() { return 10; }
};
```

The exact conversion depends on the operation and hints.

---

## 12. `Symbol.toPrimitive`

Objects can explicitly control primitive conversion.

```js
const money = {
  [Symbol.toPrimitive](hint) {
    return hint === "number" ? 100 : "$100";
  }
};
```

---

## 13. `valueOf()`

Objects can define `valueOf()` to participate in primitive conversion.

Do not assume every object conversion simply calls `valueOf()` first.

---

## 14. `toString()` in Conversion

`toString()` can participate in object-to-primitive conversion depending on the hint and available methods.

---

## 15. Addition Is Special

The `+` operator can perform numeric addition or string concatenation.

```js
1 + 2; // 3
"1" + 2; // "12"
```

Understand conversion before predicting the result.

---

## 16. `-` Forces Numeric Conversion

```js
"10" - 2; // 8
```

Unlike `+`, subtraction is numeric.

---

## 17. Logical Operators Return Operands

`&&`, `||`, and `??` do not necessarily return booleans.

```js
const name = user && user.name;
```

They return one of their operands according to their rules.

---

## 18. Short-Circuit Evaluation

The right-hand side may not execute.

```js
false && expensiveOperation();
```

This is both a language behavior and a useful optimization pattern.

---

## 19. Nullish Coalescing

`??` chooses the right operand only when the left operand is `null` or `undefined`.

```js
const port = value ?? 3000;
```

---

## 20. Optional Chaining

`?.` safely stops property access when the receiver is nullish.

```js
user?.profile?.name;
```

---

## 21. Nullish vs Falsy

```js
0 ?? 10; // 0
0 || 10; // 10
```

Use `??` when zero, empty string, or false are legitimate values.

---

## 22. Property Keys

Ordinary object property keys are strings or Symbols.

```js
const id = Symbol("id");
const obj = { [id]: 1 };
```

---

## 23. Numeric Property Keys

```js
const obj = { 1: "one" };
console.log(obj[1]);
console.log(obj["1"]);
```

The ordinary property key becomes the string `"1"`.

---

## 24. Property Lookup

A property read checks the object and then its prototype chain when necessary.

```text
object
 ↓ not found
prototype
 ↓ not found
prototype's prototype
 ↓
null
```

---

## 25. Own vs Inherited Properties

```js
Object.hasOwn(obj, "name");
```

checks own properties only.

`"name" in obj` also considers inherited properties.

---

## 26. Prototype Chain

Every ordinary object has a prototype relationship unless its prototype is explicitly `null`.

```js
const obj = {};
Object.getPrototypeOf(obj);
```

---

## 27. Method Lookup

When calling `obj.method()`, JavaScript must resolve the property before invoking the resulting function with an appropriate receiver.

---

## 28. `this` Is Call-Site Sensitive

For ordinary functions, `this` depends on how the function is called.

```js
obj.method();
```

Here the method call supplies `obj` as the receiver in normal non-arrow cases.

---

## 29. Arrow Functions and `this`

Arrow functions do not create their own `this` binding.

They capture `this` lexically from the surrounding context.

---

## 30. `call()`

Calls a function with an explicitly supplied `this` value and arguments.

```js
fn.call(user, "hello");
```

---

## 31. `apply()`

Similar to `call()`, but accepts arguments as an array-like value.

```js
fn.apply(user, ["hello"]);
```

---

## 32. `bind()`

Returns a new function with a bound `this` value and optionally preset arguments.

```js
const bound = fn.bind(user);
```

---

## 33. Bound Functions

A bound function is a new function object.

It can preserve a chosen receiver and partial arguments.

---

## 34. Closures

A closure is a function together with access to the lexical environment in which it was created.

```js
function counter() {
  let count = 0;
  return () => ++count;
}
```

---

## 35. Closure Lifetime

A captured variable can remain reachable after the outer function has returned.

```text
counter()
   ↓
creates environment
   ↓
returns function
   ↓
function keeps environment reachable
```

---

## 36. Closures as Private State

Closures can hide state from direct external access.

```js
function createUser() {
  let secret = "hidden";
  return { getSecret: () => secret };
}
```

---

## 37. Closure Memory

Closures are not automatically memory leaks.

Memory remains reachable while references keep the closure and its environment reachable.

---

## 38. Factory Functions

A factory function creates and returns objects without requiring a class.

```js
function createUser(name) {
  return { name };
}
```

---

## 39. Higher-Order Functions

A higher-order function accepts functions, returns functions, or both.

```js
function twice(fn) {
  return x => fn(fn(x));
}
```

---

## 40. First-Class Functions

Functions can be stored in variables, passed as arguments, and returned from other functions.

This enables callbacks, composition, and functional programming patterns.

---

## 41. Callback Functions

A callback is a function supplied to another operation to be invoked later or during that operation.

```js
[1, 2, 3].map(x => x * 2);
```

---

## 42. Pure Functions

A pure function produces the same result for the same inputs and does not cause observable side effects.

Purity makes reasoning and testing easier.

---

## 43. Side Effects

Examples include:

- modifying external state
- DOM changes
- network requests
- logging
- writing files

Side effects are not inherently bad; they should be controlled.

---

## 44. Referential Transparency

An expression is referentially transparent when it can be replaced by its result without changing program behavior.

This is a useful functional-programming reasoning tool.

---

## 45. Currying

Currying transforms a function with multiple parameters into a sequence of one-parameter functions.

```js
const add = a => b => a + b;
```

---

## 46. Partial Application

Partial application pre-fills some arguments and returns a function expecting the remaining arguments.

It is related to but not identical to currying.

---

## 47. Function Composition

Composition combines functions so the output of one becomes the input of another.

```js
const compose = (f, g) => x => f(g(x));
```

---

## 48. Recursion

A recursive function calls itself on a smaller or simpler problem.

Every useful recursive design needs a termination strategy.

---

## 49. Base Case

The base case stops recursion.

```js
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
```

---

## 50. Recursive Stack Growth

Each recursive call adds a stack frame.

Deep recursion can exhaust the call stack.

---

## 51. Tail Calls

Tail position means a function call is the final operation of the current function.

Do not assume JavaScript engines universally provide observable proper-tail-call optimization in ordinary environments.

---

## 52. Iteration vs Recursion

Use recursion when it naturally represents the problem, such as tree traversal.

Use iteration when simpler or when recursion depth could become a practical limitation.

---

## 53. Generators

Generator functions can pause and resume execution.

```js
function* ids() {
  yield 1;
  yield 2;
}
```

---

## 54. `yield`

`yield` pauses a generator and produces a value to its iterator consumer.

---

## 55. Generator Objects

Calling a generator function does not immediately execute its body to completion.

It returns a generator object implementing the iterator protocol.

---

## 56. Generator `next()`

```js
const iterator = ids();
iterator.next();
```

Each call advances the generator.

---

## 57. Iterator Protocol

An iterator provides a `next()` method that returns objects shaped like:

```js
{ value: something, done: false }
```

---

## 58. Iterable Protocol

An iterable provides a `[Symbol.iterator]()` method that returns an iterator.

Arrays, strings, Maps, and Sets are examples.

---

## 59. Iterable vs Iterator

```text
Iterable → can produce iterator
Iterator → produces next results
Generator → commonly provides both behavior
```

Do not use the terms interchangeably.

---

## 60. Custom Iterable

```js
const range = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
};
```

Now `for...of range` works.

---

## 61. `for...of` Uses Iteration Protocol

`for...of` requests an iterator and repeatedly calls `next()` until `done` becomes true.

This explains why plain object literals are not iterable by default.

---

## 62. Async Iteration

Async iterables use `Symbol.asyncIterator` and produce promises from `next()` operations.

They work with `for await...of`.

---

## 63. Async Generators

```js
async function* stream() {
  yield 1;
  yield 2;
}
```

They combine generator control flow with asynchronous values.

---

## 64. Destructuring Uses Iteration

Array destructuring can consume iterables.

```js
const [first, second] = new Set([10, 20]);
```

This is not limited to Array instances.

---

## 65. Spread and Iterables

Array spread consumes an iterable.

```js
const values = [...new Set([1, 2, 2])];
```

Object spread follows object property-copy semantics instead.

---

## 66. Tagged Templates

A tagged template passes template components to a function.

```js
function tag(strings, value) {
  return `${strings[0]}${value}`;
}
```

---

## 67. Template Literal Raw Data

`String.raw` and tagged templates can expose raw template text behavior.

This can be useful for DSLs and specialized formatting.

---

## 68. Property Descriptors

Properties have attributes such as writable, enumerable, and configurable.

Understanding descriptors explains many object behaviors.

---

## 69. Accessor Properties

Accessor properties use `get` and `set` functions instead of a normal stored `value` descriptor.

---

## 70. Data vs Accessor Descriptor

A descriptor is generally either a data descriptor or an accessor descriptor.

Do not incorrectly combine incompatible descriptor fields.

---

## 71. Enumerable Properties

Enumerable properties participate in operations such as `Object.keys()` and some enumeration mechanisms.

Not every own property is enumerable.

---

## 72. Writable Properties

Writable controls whether a data property's value can be changed through ordinary assignment.

It does not mean the whole object becomes immutable.

---

## 73. Configurable Properties

Configurable controls whether certain descriptor changes and deletion are permitted.

Once configurable is false, some changes become permanently restricted.

---

## 74. `Object.defineProperty()`

```js
Object.defineProperty(obj, "id", {
  value: 1,
  writable: false,
  enumerable: true
});
```

Use descriptors when property-level control is required.

---

## 75. Proxy Basics

A Proxy wraps a target and intercepts selected operations.

```js
const proxy = new Proxy(target, handler);
```

---

## 76. Proxy `get` Trap

The `get` trap can intercept property reads.

```js
new Proxy(obj, {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver);
  }
});
```

---

## 77. Proxy `set` Trap

The `set` trap can validate writes.

It should return a boolean indicating whether the assignment succeeded under Proxy semantics.

---

## 78. Proxy Invariants

Proxy traps cannot arbitrarily violate certain invariants of the target object's non-configurable properties.

The language enforces these restrictions to preserve semantic consistency.

---

## 79. Reflect With Proxy

A common pattern is:

```js
get(target, key, receiver) {
  return Reflect.get(target, key, receiver);
}
```

`Reflect` helps forward operations while preserving receiver semantics.

---

## 80. `Proxy` Is Not Transparent

A Proxy can change observable behavior.

Debugging and identity checks must account for the wrapper.

---

## 81. Metaprogramming

Metaprogramming means writing code that operates on or controls program structure and behavior.

Proxies, Reflect, descriptors, and Symbols are important tools.

---

## 82. `eval()`

`eval()` executes JavaScript source code dynamically.

Avoid it for ordinary application logic because it complicates security, optimization, and maintainability.

---

## 83. Direct vs Indirect `eval`

Direct and indirect `eval` have different scope semantics.

Understanding this is useful when reading legacy code, but new code should normally avoid dynamic evaluation.

---

## 84. `Function()` Constructor

`Function()` can dynamically construct executable functions from strings.

Like `eval`, it should not be used with untrusted input and is rarely appropriate in normal application code.

---

## 85. Symbols as Protocol Hooks

Well-known Symbols allow objects to participate in language operations.

Examples include iteration and primitive conversion.

---

## 86. `Symbol.iterator`

Implementing this protocol makes an object iterable.

It is consumed by `for...of`, spread, and related operations.

---

## 87. `Symbol.toStringTag`

Objects can customize the tag used by `Object.prototype.toString()`.

This is a protocol hook, not a replacement for reliable type validation.

---

## 88. `Symbol.hasInstance`

A constructor-like object can customize behavior of the `instanceof` operator through this well-known Symbol.

---

## 89. `instanceof`

`instanceof` tests whether a constructor's prototype appears in an object's prototype chain, subject to custom `@@hasInstance` behavior.

---

## 90. `instanceof` Is Not a Type System

`instanceof` can be affected by realms, prototype changes, and custom behavior.

Use it when prototype relationships are actually what you need to test.

---

## 91. Cross-Realm Objects

Objects created in different JavaScript realms can have different intrinsic constructors.

This is one reason `Array.isArray()` is generally preferable to `value instanceof Array` for array detection.

---

## 92. Realms

A realm provides a global environment and its own set of intrinsic objects.

Browser windows, iframes, and workers can involve different realms.

---

## 93. `globalThis`

`globalThis` provides a standard way to access the global object across JavaScript environments.

```js
console.log(globalThis);
```

---

## 94. Browser Global

In typical browser windows, `globalThis` refers to the Window global object.

The DOM and Window APIs are host-provided, not the ECMAScript core itself.

---

## 95. Node Global

Node.js provides its own host environment and does not provide `window` or the DOM by default.

Use Node's APIs rather than assuming browser globals exist.

---

## 96. Execution Contexts

JavaScript execution involves contexts such as global, function, and module execution contexts.

They help explain scope and execution state.

---

## 97. Call Stack

Synchronous function calls create stack frames.

```text
main()
 ↓
foo()
 ↓
bar()
```

Returning from `bar()` removes its frame first.

---

## 98. Stack Overflow

Excessive recursion can exhaust the call stack.

```js
function forever() {
  forever();
}
```

Do not run this casually in production code.

---

## 99. Heap Concept

Objects and other dynamically managed data are stored in engine-managed memory.

The exact internal memory layout is engine-specific and should not be reduced to a simplistic universal "heap address" model.

---

## 100. Garbage Collection

Garbage collection identifies objects that are no longer reachable and can reclaim their memory.

JavaScript does not expose deterministic manual memory freeing for ordinary objects.

---

## 101. Reachability

A useful mental model is:

```text
Roots
 ↓
reachable objects
 ↓
unreachable objects
 ↓
eligible for garbage collection
```

The exact collector algorithm is engine-specific.

---

## 102. Memory Leak Pattern

A memory leak occurs when data remains reachable even though the application no longer needs it.

Common causes include forgotten listeners, timers, caches, and accidental global references.

---

## 103. WeakMap

WeakMap allows object-keyed associations without preventing garbage collection of the keys when no strong references remain.

It is not iterable and has no public `size` property.

---

## 104. WeakSet

WeakSet tracks object membership without providing normal enumeration.

It is useful for object-oriented metadata and membership tracking where strong retention is undesirable.

---

## 105. WeakRef

WeakRef exposes a weak reference to an object.

Use it only for specialized memory-sensitive scenarios.

---

## 106. FinalizationRegistry

FinalizationRegistry can observe eventual cleanup notification opportunities.

Its timing is nondeterministic and must not be used for correctness-critical cleanup.

---

## 107. Microtasks

Promise reactions and other jobs are processed through the host's job/microtask mechanisms.

Microtasks generally run after the current synchronous task finishes and before the event loop proceeds to a later task, subject to host scheduling details.

---

## 108. Promise Reaction Queue

```js
console.log("A");
Promise.resolve().then(() => console.log("B"));
console.log("C");
```

Output:

```text
A
C
B
```

---

## 109. `queueMicrotask()`

Schedules a microtask.

```js
queueMicrotask(() => console.log("microtask"));
```

It is useful when you explicitly need microtask timing.

---

## 110. Tasks vs Microtasks

A simplified browser model is:

```text
Task
 ↓
Synchronous JS
 ↓
Microtasks
 ↓
Rendering opportunity
 ↓
Next task
```

Actual rendering and host scheduling involve additional details.

---

## 111. Promise States

A Promise starts pending and eventually becomes fulfilled or rejected.

Once settled, it cannot transition to another state.

---

## 112. Promise Resolution

"Resolved" and "fulfilled" are not exact synonyms.

A Promise can be resolved to another thenable and remain pending until that thenable settles.

---

## 113. Thenables

A thenable is an object with a callable `then` property.

Promise resolution assimilates thenables.

---

## 114. Promise Chaining

`.then()` returns a new Promise.

The returned Promise adopts the result of the callback, including returned thenables.

---

## 115. Throw Inside `.then()`

A synchronous throw inside a Promise reaction causes the returned Promise to reject.

```js
Promise.resolve().then(() => {
  throw new Error("fail");
});
```

---

## 116. `finally()`

`finally()` runs cleanup logic regardless of fulfillment or rejection, subject to Promise chaining semantics.

It does not receive the original fulfillment value as an argument.

---

## 117. Async Functions

An `async` function always returns a Promise.

```js
async function getValue() {
  return 42;
}
```

---

## 118. `await`

`await` pauses the async function's continuation until the awaited value is settled.

It does not block the JavaScript thread in the ordinary sense.

---

## 119. Async Error Handling

A rejection from an awaited Promise can be handled with `try...catch`.

```js
try {
  const data = await fetchData();
} catch (error) {
  console.error(error);
}
```

---

## 120. Top-Level Await

Modules can use top-level `await` where supported.

This can delay module evaluation and therefore affect dependency startup order.

---

## 121. Abort Signals

Modern asynchronous APIs can use `AbortController` and `AbortSignal` for cancellation.

Cancellation is cooperative: the underlying operation must support the signal.

---

## 122. Event Listener Cleanup

When using event listeners, retain the function reference if later removal is required.

```js
const handler = () => {};
element.addEventListener("click", handler);
element.removeEventListener("click", handler);
```

---

## 123. Debouncing

Debouncing delays execution until calls stop for a configured period.

Common uses include search input and resize handling.

---

## 124. Throttling

Throttling limits how frequently an operation executes during repeated events.

Common uses include scroll and pointer movement handling.

---

## 125. Memoization

Memoization caches function results based on inputs.

It works best for deterministic computations with appropriate cache lifetime.

---

## 126. Memoization Trap

Caching everything can increase memory usage and can become incorrect when a function depends on external mutable state.

---

## 127. Lazy Evaluation

Lazy evaluation delays work until its result is actually requested.

Generators are one practical JavaScript mechanism for building lazy sequences.

---

## 128. Eager vs Lazy

```text
Eager → compute now
Lazy  → compute when consumed
```

Lazy approaches can reduce unnecessary work and memory for large sequences.

---

## 129. Immutability

Immutability means treating values as unchangeable after creation.

JavaScript does not make ordinary objects immutable automatically.

---

## 130. Structural Sharing

Instead of deep-copying an entire structure, immutable data techniques can reuse unchanged portions and create new changed portions.

This is important in state-management architectures.

---

## 131. Shallow Copy

Spread, `slice()`, and similar APIs often create shallow copies.

Nested objects can still be shared.

---

## 132. Deep Copy

Deep copying recursively duplicates nested data according to a defined cloning algorithm.

`structuredClone()` supports many common structures, but not every JavaScript value or behavior.

---

## 133. Property Enumeration Order

Modern ECMAScript specifies ordering rules for own property keys in common reflective and enumeration operations.

Do not rely on vague historical statements that "object order is always random."

---

## 134. Integer-Index-Like Keys

Object key ordering gives integer-index-like string keys special ordering before other string keys, followed by Symbols.

This explains some surprising `Object.keys()` results.

---

## 135. `for...in` Caveat

`for...in` enumerates enumerable string keys, including inherited enumerable keys.

Use `Object.hasOwn()` when you need own-only filtering.

---

## 136. Private Class Fields

JavaScript classes support true private fields using `#`.

```js
class User {
  #token = "secret";
}
```

They are enforced by the language, unlike underscore conventions.

---

## 137. Private Methods

Classes can also define private methods.

```js
class User {
  #validate() {}
}
```

Only code with access to the class definition can use that private name.

---

## 138. Static Private Members

Private fields and methods can be static.

They belong to the class itself rather than each instance.

---

## 139. Static Initialization Blocks

Classes can contain `static {}` blocks for class-level initialization logic.

Use them when complex static setup genuinely benefits from class syntax.

---

## 140. Class Fields

Class fields are initialized as part of instance creation for instance fields or class initialization for static fields.

Do not confuse class fields with prototype methods.

---

## 141. Prototype Methods

Normal class methods are generally placed on the class prototype and shared among instances.

This avoids recreating the same method function for every instance.

---

## 142. Arrow Function Fields

An arrow function used as an instance field creates an own function per instance.

This can be useful for lexical `this`, but has different memory and prototype characteristics from shared methods.

---

## 143. Getters

A getter lets property-like syntax execute a function.

```js
get fullName() {
  return `${this.first} ${this.last}`;
}
```

---

## 144. Setters

A setter controls assignment to a property-like interface.

Use it to maintain invariants or transform assigned values when appropriate.

---

## 145. Private State Choices

JavaScript offers multiple encapsulation mechanisms:

```text
#private fields
closures
modules
WeakMap metadata
getters/setters
```

Choose based on API design rather than fashion.

---

## 146. Composition

Composition builds behavior by combining smaller pieces.

It often reduces rigid inheritance relationships.

---

## 147. Dependency Injection

Dependency injection supplies dependencies from outside instead of constructing them internally.

This improves testing and configurability.

---

## 148. Strategy Pattern

A strategy is interchangeable behavior supplied to an algorithm.

Functions make lightweight Strategy implementations natural in JavaScript.

---

## 149. Adapter Pattern

An adapter converts one interface into another expected interface.

It is useful when integrating incompatible APIs.

---

## 150. Factory Pattern

A factory centralizes creation logic.

It is useful when object construction varies by configuration or type.

---

## 151. Observer Pattern

Observers subscribe to changes and are notified when events occur.

DOM events and many application architectures follow observer-like ideas.

---

## 152. Event Emitter Concept

An event emitter maintains listeners and invokes them when named events occur.

Node.js applications frequently use event-driven designs.

---

## 153. Custom Event System

A minimal event system can use a Map of event names to Sets of listener functions.

This is a practical collection + function + closure exercise.

---

## 154. API Boundary Design

Advanced JavaScript is not only language tricks.

Good APIs define clear inputs, outputs, ownership, mutation rules, and error behavior.

---

## 155. Defensive Programming

Validate assumptions at boundaries.

Do not scatter redundant checks everywhere; validate where untrusted or uncertain data enters the system.

---

## 156. Type Narrowing

JavaScript can narrow runtime values through checks such as:

```js
typeof value === "string"
Array.isArray(value)
value === null
```

TypeScript later builds additional static analysis on top of these patterns.

---

## 157. `typeof null`

```js
typeof null; // "object"
```

This is a long-standing JavaScript language quirk.

Use `value === null` for a null check.

---

## 158. `typeof` Functions

```js
typeof function () {}; // "function"
```

`typeof` gives functions the special string `"function"`, even though functions are objects in the language model.

---

## 159. NaN Is a Number

```js
typeof NaN; // "number"
```

`NaN` represents an invalid numeric result within the Number type.

---

## 160. Negative Zero

JavaScript Numbers include both `0` and `-0`.

```js
Object.is(0, -0); // false
```

---

## 161. Floating-Point Precision

```js
0.1 + 0.2 === 0.3; // false
```

Binary floating-point representation cannot represent many decimal fractions exactly.

---

## 162. Safe Numeric Comparison

For approximate floating-point comparisons, define a tolerance appropriate to the scale and domain instead of assuming `Number.EPSILON` alone solves every problem.

---

## 163. BigInt Semantics

BigInt provides arbitrary-precision integers within its supported operations.

It is not a replacement for Number in every API.

---

## 164. BigInt and JSON

Standard JSON does not have a native BigInt representation.

`JSON.stringify()` throws when directly encountering a BigInt unless custom serialization handling is provided.

---

## 165. RegExp Backtracking

Some regular expressions can cause excessive backtracking on carefully constructed input.

For untrusted patterns or inputs, consider performance and denial-of-service risk.

---

## 166. Security: Prototype Pollution

Prototype pollution can occur when untrusted property paths or keys modify object prototypes.

Use safe data handling and avoid blindly merging untrusted structures.

---

## 167. Security: Dynamic Code

Avoid `eval()`, `Function()`, and similar dynamic execution with untrusted data.

Dynamic code creates serious injection and maintenance risks.

---

## 168. Security: XSS

DOM APIs that interpret HTML can execute attacker-controlled markup in dangerous contexts.

Prefer text APIs for untrusted plain text and sanitize HTML when HTML is genuinely required.

---

## 169. Security: Secrets

Do not place sensitive credentials in client-side JavaScript and do not treat frontend code as a secure secret boundary.

---

## 170. Performance: Measure First

Do not optimize based on folklore.

Measure realistic workloads with profiling and benchmarks before changing code for performance.

---

## 171. Performance: Allocation

Repeated creation of large temporary objects can increase allocation and garbage-collection pressure.

But premature object reuse can make code harder to reason about.

---

## 172. Performance: Hidden Engine Details

JavaScript engines use implementation strategies such as inline caches and object-shape optimizations.

These are engine internals, not language guarantees.

---

## 173. Avoid Premature Micro-Optimization

Prefer clear algorithms and appropriate data structures first.

Optimize measured bottlenecks second.

---

## 174. Debugging Strategy

When behavior is surprising, ask:

1. What is the exact value?
2. What is its type?
3. Is it primitive or object?
4. What protocol is involved?
5. Is coercion occurring?
6. Is mutation occurring?
7. What is the receiver for `this`?
8. Is execution synchronous or asynchronous?

---

## 175. Output Prediction Challenge

Predict:

```js
console.log([] == false);
console.log([] === false);
```

Do not guess. Trace coercion and equality algorithms.

---

## 176. Output Prediction Challenge

Predict:

```js
console.log(0 || 10);
console.log(0 ?? 10);
```

Answer:

```text
10
0
```

---

## 177. Output Prediction Challenge

Predict:

```js
const a = {};
const b = {};
console.log(a === b);
```

Answer: `false`, because the objects have different identities.

---

## 178. Output Prediction Challenge

Predict:

```js
const a = {};
const b = a;
console.log(a === b);
```

Answer: `true`.

---

## 179. Output Prediction Challenge

Predict:

```js
console.log(Object.is(NaN, NaN));
console.log(NaN === NaN);
```

Answer:

```text
true
false
```

---

## 180. Output Prediction Challenge

Predict:

```js
console.log(Math.floor(-1.1));
console.log(Math.trunc(-1.1));
```

Answer:

```text
-2
-1
```

---

## 181. Advanced Practice — Beginner

Build:

1. type inspector
2. equality comparison tool
3. closure counter
4. factory function
5. custom iterable
6. generator sequence
7. debounce utility
8. throttle utility
9. memoization utility
10. custom error classes

---

## 182. Advanced Practice — Intermediate

Build:

1. event emitter
2. dependency injection container
3. validation Proxy
4. lazy range generator
5. async generator consumer
6. retry utility
7. cancellation-aware request wrapper
8. object descriptor inspector
9. composition utility library
10. immutable update helper

---

## 183. Advanced Practice — Expert

Build:

1. observable system
2. reactive state prototype
3. Proxy-based model layer
4. custom iterator framework
5. async stream abstraction
6. memoization cache with eviction
7. plugin architecture
8. dependency injection container
9. event-driven task system
10. metaprogramming utility toolkit

---

## 184. Debugging Challenge

Find the bug:

```js
const user = {
  name: "Ravi",
  greet: () => `Hello ${this.name}`
};

console.log(user.greet());
```

Explain why the arrow function does not receive `user` as its `this` value.

---

## 185. Debugging Challenge

Find the memory issue:

```js
const handlers = [];

function register(element) {
  const handler = () => console.log(element.textContent);
  handlers.push(handler);
}
```

Explain how the retained handler can keep referenced data reachable.

---

## 186. Debugging Challenge

Find the iterator issue:

```js
const obj = { a: 1, b: 2 };
for (const value of obj) {
  console.log(value);
}
```

Explain why the object is not iterable by default.

---

## 187. Refactoring Exercise

Convert callback-heavy nested code into Promise-based composition.

Focus on preserving error propagation and sequencing semantics.

---

## 188. Refactoring Exercise

Replace repeated type checks with a clear validation boundary.

The goal is not fewer lines; the goal is a clearer contract.

---

## 189. Refactoring Exercise

Replace a rigid inheritance hierarchy with composition.

Identify which behaviors actually vary independently.

---

## 190. Real-World Challenge

Build a small state store using:

- closures
- subscriptions
- immutable updates
- selectors
- error handling

Then explain every runtime step.

---

## 191. Real-World Challenge

Build a request manager using:

- Promise chaining
- `async/await`
- AbortController
- custom errors
- retry policy
- timeout handling

Document cancellation behavior.

---

## 192. Real-World Challenge

Build a lazy data pipeline with generators.

Implement:

```text
source → map → filter → take → consume
```

Avoid creating unnecessary intermediate arrays.

---

## 193. Real-World Challenge

Build a small event emitter.

Required features:

- on
- once
- off
- emit
- listener cleanup

Use `Map` and `Set` deliberately.

---

## 194. Real-World Challenge

Build a validation Proxy for a user model.

Reject invalid assignments while preserving normal property access.

Use `Reflect` for forwarding operations.

---

## 195. Interview Questions — Runtime

1. What is a closure?
2. How does lexical scope work?
3. What is the prototype chain?
4. How does `this` differ in arrow functions?
5. What does `bind()` return?
6. What is an execution context?
7. What is a stack frame?
8. What is garbage collection?
9. What is reachability?
10. What is a microtask?

---

## 196. Interview Questions — Language Semantics

1. Difference between `===` and `Object.is()`?
2. What is SameValueZero?
3. Why does `typeof null` return `"object"`?
4. What is ToPrimitive?
5. Why is `+` special?
6. What is a thenable?
7. What is an iterable?
8. What is an iterator?
9. What is a Proxy invariant?
10. What are well-known Symbols?

---

## 197. Interview Questions — Async

1. Does `await` block the thread?
2. What happens when an async function throws?
3. What is Promise resolution?
4. What happens when `.then()` returns a Promise?
5. What is `finally()` for?
6. What is a microtask queue?
7. What is cancellation with AbortController?
8. Why can unhandled rejections matter?
9. What is an async iterable?
10. What is an async generator?

---

## 198. Interview Questions — Metaprogramming

1. What is a Proxy?
2. What is Reflect?
3. Why use Reflect inside Proxy traps?
4. What are property descriptors?
5. What is `Symbol.iterator`?
6. What is `Symbol.toPrimitive`?
7. What is `Symbol.hasInstance`?
8. What are private class fields?
9. What is a Realm?
10. Why can `instanceof` fail across realms?

---

## 199. Teach-Back Test

Without notes, explain:

```text
primitive
object identity
coercion
prototype chain
this
closure
iterator
iterable
generator
Promise resolution
microtask
Proxy
Reflect
Symbol protocols
garbage collection
composition
```

If you can explain these with code and diagrams, you have crossed an important JavaScript maturity level.

---

## 200. Final Mastery Checklist

- [ ] Explain primitive values and object identity.
- [ ] Explain equality algorithms.
- [ ] Trace coercion.
- [ ] Explain ToPrimitive conceptually.
- [ ] Explain `this` by call site.
- [ ] Explain lexical `this` in arrows.
- [ ] Use call/apply/bind correctly.
- [ ] Explain closures and lifetime.
- [ ] Build factory functions.
- [ ] Use higher-order functions.
- [ ] Explain purity and side effects.
- [ ] Use currying and composition appropriately.
- [ ] Explain recursion and stack depth.
- [ ] Build generators.
- [ ] Explain iterable vs iterator.
- [ ] Build custom iterables.
- [ ] Explain async iteration.
- [ ] Explain descriptors.
- [ ] Use Proxy and Reflect carefully.
- [ ] Explain Symbol protocols.
- [ ] Explain `instanceof` and realms.
- [ ] Explain execution contexts and call stack.
- [ ] Explain reachability and garbage collection.
- [ ] Recognize memory leak patterns.
- [ ] Explain Promise resolution and thenables.
- [ ] Explain microtasks.
- [ ] Use async/await correctly.
- [ ] Use cancellation patterns.
- [ ] Apply debounce/throttle/memoization appropriately.
- [ ] Understand immutability and structural sharing.
- [ ] Apply composition and dependency injection.
- [ ] Identify prototype pollution and dynamic-code risks.
- [ ] Measure performance instead of guessing.
- [ ] Complete all advanced challenges.
- [ ] Teach the chapter without notes.

---

## Master Mental Model

```text
                 JavaScript
                      │
        ┌─────────────┼─────────────┐
        ↓             ↓             ↓
     Values         Objects       Functions
        │             │             │
   coercion       prototypes      closures
        │             │             │
        └─────────────┼─────────────┘
                      ↓
                 Language Protocols
                      │
       ┌──────────────┼──────────────┐
       ↓              ↓              ↓
    Iteration       Coercion       Reflection
       │              │              │
   generators      Symbols        Proxy/Reflect
       │              │              │
       └──────────────┼──────────────┘
                      ↓
                Runtime Behavior
                      │
          ┌───────────┼───────────┐
          ↓           ↓           ↓
       Stack       Promises      Memory
          │           │           │
          └───────────┼───────────┘
                      ↓
                Real Applications
```

> **Mastery means you can predict behavior, explain why it happens, debug it, choose an appropriate abstraction, and teach the concept—not merely write syntax that happens to work.**
