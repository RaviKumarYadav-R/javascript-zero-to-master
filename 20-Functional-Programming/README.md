# 20 — Functional Programming

> A JavaScript-first guide to functions as values, pure functions, immutability, composition, higher-order functions, closures, recursion, declarative data transformation, algebraic thinking, functional error handling, async functional patterns, testing, and practical application architecture.

## Learning Goal

By the end of this chapter, you should be able to model problems with small predictable functions, distinguish pure from impure code, transform data declaratively, compose reusable operations, control side effects, reason about immutability, and apply functional techniques without blindly forcing everything into a functional style.

## 1. What Is Functional Programming?

Functional programming (FP) is a programming paradigm that treats computation through functions and emphasizes predictable transformations, composition, and controlled side effects.

## 2. FP Is a Paradigm

FP is not a separate JavaScript language. JavaScript supports multiple paradigms, including imperative, object-oriented, procedural, and functional programming.

## 3. Why Functional Programming Matters

Functional techniques can make data transformations easier to test, reason about, reuse, and compose.

## 4. JavaScript Is Multi-Paradigm

Do not force every problem into FP. Use the style that makes the design clear and maintainable.

## 5. Function as a Value

Functions can be assigned to variables, stored in objects, placed in arrays, passed as arguments, and returned from other functions.

## 6. First-Class Functions

JavaScript treats functions as first-class values.

```js
const greet = name => `Hello, ${name}`;
const fn = greet;
console.log(fn("Ravi"));
```

## 7. Higher-Order Function

A higher-order function receives a function, returns a function, or both.

## 8. Callback

A callback is a function supplied to another operation so it can be invoked according to that operation's logic.

## 9. Pure Function

A pure function produces the same result for the same relevant inputs and has no observable side effects outside its return value.

## 10. Pure Example

```js
const add = (a, b) => a + b;
```

## 11. Impure Example

```js
let total = 0;
const addToTotal = value => (total += value);
```

The function changes external state, so it is impure.

## 12. Referential Transparency

An expression is referentially transparent when it can be replaced by its resulting value without changing program behavior in the relevant context.

## 13. Why Purity Helps

Pure functions are easier to test because their result does not depend on hidden mutable state or timing.

## 14. Determinism

A deterministic function has predictable output for the same inputs and relevant environment.

## 15. Hidden Inputs

Reading the current time, random values, global state, or environment variables introduces dependencies that are not represented by ordinary function parameters.

## 16. Explicit Dependencies

Passing required data as parameters makes dependencies visible.

## 17. Side Effect

A side effect is observable interaction beyond calculating and returning a value, such as mutation, I/O, logging, DOM changes, network requests, or changing external state.

## 18. Side Effects Are Not Evil

Real applications must perform side effects. Functional design aims to isolate and control them rather than pretend they do not exist.

## 19. Effect Boundary

A useful architecture keeps deterministic transformations separate from code that interacts with the outside world.

## 20. Functional Core

The functional core performs predictable calculations from explicit inputs.

## 21. Imperative Shell

The imperative shell handles I/O, events, timers, DOM operations, persistence, and other effects.

## 22. Core/Shell Model

```text
External world
     ↓
Imperative shell
     ↓
Functional core
     ↓
Result
     ↓
Imperative shell
     ↓
External world
```

## 23. Immutability

Immutability means treating a value as not being changed after creation and producing new values for updates.

## 24. const Is Not Immutability

`const` prevents reassignment of a binding. It does not freeze an object or array.

## 25. Mutable Example

```js
const user = { name: "Ravi" };
user.name = "A"; // allowed
```

## 26. Immutable Update

```js
const user = { name: "Ravi" };
const updated = { ...user, name: "A" };
```

## 27. Object.freeze

`Object.freeze()` prevents direct mutation of an object at that level, but it is shallow and does not recursively freeze nested objects.

## 28. Shallow Immutability

```js
const state = Object.freeze({ nested: { count: 1 } });
state.nested.count = 2; // nested object is not frozen
```

## 29. Deep Immutability

Deep immutability requires recursively freezing or using data structures and APIs designed around immutable updates.

## 30. Structural Sharing

Immutable update strategies can reuse unchanged nested references instead of copying every value.

## 31. Structural Sharing Example

```js
const next = { ...state, user: { ...state.user, name: "A" } };
```

Unchanged properties can continue sharing references.

## 32. Copy-on-Write Idea

Instead of modifying shared data directly, create a changed version while reusing unaffected parts.

## 33. Mutation Risk

Unexpected mutation can create action-at-a-distance bugs where code changes data another part of the application is using.

## 34. Mutation Boundary

If mutation is useful internally for performance, keep it local and do not expose accidental shared mutable state.

## 35. Data Transformation

Functional programming often expresses a pipeline of transformations from input to output.

## 36. Declarative Style

Declarative code describes what result is wanted rather than spelling out every control-flow step.

## 37. Imperative Style

Imperative code explicitly describes commands and state changes.

## 38. Imperative Example

```js
const result = [];
for (const n of numbers) {
  if (n > 10) result.push(n * 2);
}
```

## 39. Declarative Example

```js
const result = numbers.filter(n => n > 10).map(n => n * 2);
```

## 40. Declarative Does Not Mean Automatically Faster

Readable functional pipelines can create intermediate arrays and callbacks. Measure when performance matters.

## 41. map

`map()` transforms each element and returns a new array with the callback results.

## 42. map Contract

The callback should return the transformed value for each processed element.

## 43. map Mistake

```js
const doubled = numbers.map(n => { n * 2; });
```

This produces an array of `undefined` because the block body has no return.

## 44. Correct map

```js
const doubled = numbers.map(n => n * 2);
```

## 45. filter

`filter()` returns a new array containing elements whose callback result is truthy.

## 46. filter Contract

The callback answers whether each element should be included.

## 47. reduce

`reduce()` combines elements into an accumulator and can return any result type, not only an array.

## 48. Reduce Mental Model

```text
initial accumulator
       ↓
item 1 → accumulator
       ↓
item 2 → accumulator
       ↓
item 3 → final result
```

## 49. Reduce Sum

```js
const sum = numbers.reduce((total, n) => total + n, 0);
```

## 50. Reduce to Object

```js
const byId = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});
```

## 51. Reduce Readability

Do not use `reduce()` merely because it is shorter. A loop can be clearer for complex stateful accumulation.

## 52. find

`find()` returns the first element satisfying a predicate or `undefined` when none does.

## 53. some

`some()` tests whether at least one element satisfies a predicate.

## 54. every

`every()` tests whether all processed elements satisfy a predicate.

## 55. includes

`includes()` tests membership using SameValueZero semantics.

## 56. forEach

`forEach()` is useful for side effects and does not build a transformed result.

## 57. map vs forEach

Use `map()` when you need a transformed array; use `forEach()` when the purpose is side effects.

## 58. map vs filter

`map()` changes values; `filter()` selects existing values.

## 59. filter vs find

`filter()` can return many matches; `find()` returns the first matching element.

## 60. Chaining

Array methods can be chained to express a transformation pipeline.

## 61. Pipeline Example

```js
const names = users
  .filter(user => user.active)
  .map(user => user.name)
  .sort();
```

## 62. Pipeline Readability

Break long pipelines into named steps when each stage has meaningful business logic.

## 63. Intermediate Arrays

Each non-mutating array transformation can create another array, increasing allocation and traversal work.

## 64. Loop Fusion

A single loop can sometimes combine multiple transformations to reduce intermediate allocations, but readability should remain acceptable.

## 65. Lazy Evaluation

Lazy evaluation delays computation until a result is actually requested.

## 66. JavaScript Arrays Are Eager

Methods such as `map()` and `filter()` eagerly produce arrays rather than lazy sequences.

## 67. Generator-Based Laziness

Generators can provide lazy iteration over potentially large or infinite sequences.

## 68. Lazy Range

```js
function* range(start, end) {
  for (let i = start; i < end; i++) yield i;
}
```

## 69. Consuming a Generator

```js
for (const n of range(0, 3)) console.log(n);
```

## 70. Lazy Transformation

A generator can yield transformed values only as the consumer requests them.

## 71. Lazy Filter

```js
function* filter(iterable, predicate) {
  for (const value of iterable) if (predicate(value)) yield value;
}
```

## 72. Lazy Map

```js
function* map(iterable, fn) {
  for (const value of iterable) yield fn(value);
}
```

## 73. Infinite Sequences

Lazy generators can represent sequences that would be impossible or wasteful to materialize fully.

## 74. Iterator Protocol

An iterator provides a `next()` method returning objects shaped like `{ value, done }`.

## 75. Iterable Protocol

An iterable exposes `[Symbol.iterator]()` that returns an iterator.

## 76. Function Composition

Composition combines smaller functions so the output of one becomes the input of another.

## 77. Compose Direction

A common mathematical convention is right-to-left composition.

## 78. Pipe Direction

A `pipe()` utility commonly applies functions left-to-right, matching the visual flow of data.

## 79. compose Example

```js
const compose = (f, g) => x => f(g(x));
```

## 80. pipe Example

```js
const pipe = (...fns) => value => fns.reduce((v, fn) => fn(v), value);
```

## 81. Pipeline Example

```js
const normalize = pipe(
  value => value.trim(),
  value => value.toLowerCase(),
  value => value.replaceAll(" ", "-")
);
```

## 82. Composition Benefit

Small functions can be independently tested and then assembled into larger behavior.

## 83. Composition Risk

Deeply nested composition can become difficult to read when function names and types are unclear.

## 84. Function Arity

Arity commonly refers to the number of arguments a function expects, though JavaScript's runtime function invocation is flexible.

## 85. Unary Function

A unary function conceptually accepts one input.

## 86. Binary Function

A binary function conceptually accepts two inputs.

## 87. Variadic Function

A variadic function can accept a variable number of arguments, often through rest parameters.

## 88. Currying

Currying transforms a multi-argument function into a sequence of unary function applications.

## 89. Curried Example

```js
const add = a => b => a + b;
console.log(add(2)(3)); // 5
```

## 90. Currying vs Partial Application

Currying changes function shape into one-argument stages; partial application pre-fills some arguments of a function.

## 91. Partial Application

```js
const multiply = (a, b) => a * b;
const double = b => multiply(2, b);
```

## 92. Bind as Partial Application

`Function.prototype.bind()` can pre-bind `this` and leading arguments, although it has additional semantics beyond a pure FP helper.

## 93. Point-Free Style

Point-free code defines transformations without explicitly naming the data argument.

## 94. Point-Free Risk

Overusing point-free style can make code cryptic, especially when debugging or teaching beginners.

## 95. Predicate

A predicate is a function that answers a boolean-like condition, such as `isAdult(user)`.

## 96. Transformer

A transformer function converts one representation into another.

## 97. Consumer

A consumer performs an operation using a value, often for a side effect.

## 98. Factory Function

A factory function returns a newly created value, often an object configured from inputs.

## 99. Higher-Order Factory

A higher-order function can create specialized functions from configuration.

## 100. Function Factory Example

```js
const greaterThan = limit => value => value > limit;
const greaterThan10 = greaterThan(10);
```

## 101. Closure Connection

The returned function remembers the `limit` binding through closure.

## 102. Closure

A closure is a function together with access to lexical bindings from its surrounding scope.

## 103. Closure for Configuration

Closures are useful for creating specialized functions without global configuration.

## 104. Closure for Private State

A closure can hide state behind functions without exposing the binding directly.

## 105. Counter Factory

```js
const createCounter = () => {
  let count = 0;
  return () => ++count;
};
```

## 106. Closure Memory

A closure can keep referenced bindings alive while the closure remains reachable. This can be useful or can contribute to unintended retention.

## 107. Recursion

Recursion solves a problem by having a function call itself on a smaller or simpler problem.

## 108. Base Case

Every terminating recursive algorithm needs a base case or another guaranteed termination condition.

## 109. Recursive Factorial

```js
const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);
```

## 110. Recursive Stack

Each recursive call creates another execution frame until the base case is reached.

## 111. Stack Overflow

Deep recursion can exceed the JavaScript engine's call-stack limits. JavaScript does not generally provide guaranteed proper tail-call optimization across mainstream engines.

## 112. Iteration vs Recursion

Use the approach that makes the algorithm clear and safe for expected input sizes.

## 113. Tail Position

A call is in tail position when its result can be returned directly without additional work by the caller.

## 114. Tail Recursion Caveat

Do not assume tail-recursive JavaScript will avoid stack growth in common production runtimes.

## 115. Algebraic Thinking

Functional design benefits from thinking about inputs, transformations, identities, and composition laws.

## 116. Identity Function

The identity function returns its input unchanged.

```js
const identity = value => value;
```

## 117. Identity in Composition

Composing a function with identity should preserve the function's behavior.

## 118. Associativity

Composition is commonly reasoned about associatively: grouping compositions differently does not change the mathematical result when functions and composition satisfy the expected laws.

## 119. Practical Laws

Algebraic laws are reasoning tools. They are useful only when the functions involved actually satisfy the assumptions.

## 120. Function Equality Caveat

JavaScript functions are objects; two separately created functions with identical source are not generally `===` equal.

## 121. Referential Equality

Object and function equality compares identity, not deep structural content.

## 122. Pure Function Test

A practical test for purity is to call a function repeatedly with equivalent explicit inputs and verify that it does not modify observable external state.

## 123. Hidden Mutation

A function that mutates an input object is not pure if that mutation is observable outside the function.

## 124. Bad Transformer

```js
function rename(user) {
  user.name = user.name.trim();
  return user;
}
```

## 125. Pure Transformer

```js
function rename(user) {
  return { ...user, name: user.name.trim() };
}
```

## 126. Deep Mutation

Copying only the outer object does not prevent mutation of nested objects shared with the original.

## 127. Immutable Array Update

```js
const next = items.map(item =>
  item.id === id ? { ...item, done: true } : item
);
```

## 128. Immutable Remove

```js
const next = items.filter(item => item.id !== id);
```

## 129. Immutable Insert

```js
const next = [...items, newItem];
```

## 130. Immutable Reorder

Use copying methods such as `toSorted()` where available, or copy before mutating sorting operations.

## 131. toSorted

`toSorted()` returns a sorted copy and leaves the original array unchanged.

## 132. toReversed

`toReversed()` returns a reversed copy instead of mutating the original array.

## 133. toSpliced

`toSpliced()` returns a modified copy instead of mutating the original array.

## 134. with

`Array.prototype.with()` returns a copy with one index replaced.

## 135. Immutable Data Is Not Free

Copying large structures can cost time and memory. Structural sharing and suitable data models reduce unnecessary copying.

## 136. Persistent Data Structures

Persistent data structures preserve previous versions while sharing internal structure between versions.

## 137. JavaScript Native Support

JavaScript does not provide a complete persistent-data-structure library in the language core; libraries can provide specialized implementations.

## 138. Transducers Concept

Transducers combine transformations without requiring an intermediate collection for each stage. This is an advanced abstraction and is not always necessary.

## 139. Generator Alternative

Generators can express lazy transformation pipelines with standard iteration protocols.

## 140. Functional Error Handling

Functional code can represent expected failure as data instead of throwing exceptions, especially in domain logic.

## 141. Result Type

A Result-like value commonly represents either success or failure explicitly.

## 142. Simple Result

```js
const ok = value => ({ ok: true, value });
const err = error => ({ ok: false, error });
```

## 143. Result Narrowing

```js
if (result.ok) console.log(result.value);
else console.error(result.error);
```

## 144. Result vs Exception

Exceptions are useful for exceptional control flow and infrastructure failures; explicit Result values can make expected domain failure visible in function types and data flow.

## 145. Option Concept

An Option-like representation models presence or absence without using `null`/`undefined` as an implicit protocol.

## 146. Maybe-Style Data

A simple representation might use `{ kind: "some", value }` and `{ kind: "none" }`.

## 147. Nullish Values

`null` and `undefined` are valid JavaScript values, but mixing them as undocumented conventions can make APIs harder to reason about.

## 148. Validation as Data

Validation functions can return structured success/failure information rather than immediately throwing.

## 149. Validation Example

```js
const validateName = name =>
  typeof name === "string" && name.trim()
    ? { ok: true, value: name.trim() }
    : { ok: false, error: "Name is required" };
```

## 150. Applicative-Style Validation

Independent validations can sometimes be combined to collect multiple errors instead of stopping at the first failure.

## 151. Short-Circuit Validation

Sequential validation may stop at the first failure when later checks depend on earlier success.

## 152. Functional Async

Promises are values representing eventual completion and fit naturally into compositional asynchronous workflows.

## 153. Promise Purity Caveat

Creating a Promise often starts an effect immediately. A Promise is not the same thing as a lazy description of an effect.

## 154. Async Transformation

`Promise.then()` transforms eventual values without blocking the current JavaScript execution thread.

## 155. then as map-Like Operation

For fulfilled Promises, `.then(fn)` conceptually maps a value into a new Promise, while Promise resolution also flattens returned thenables.

## 156. Promise Chaining

```js
fetchUser(id)
  .then(normalizeUser)
  .then(buildViewModel)
  .then(renderUser)
  .catch(handleError);
```

The final `renderUser` is an effectful boundary.

## 157. Promise Composition

`Promise.all()` combines independent asynchronous operations and fails when one input rejects.

## 158. Promise.allSettled

`Promise.allSettled()` preserves individual outcomes and is useful when every operation should be observed.

## 159. Promise.race

`Promise.race()` settles when the first input settles; it does not automatically cancel the other operations.

## 160. Promise.any

`Promise.any()` fulfills when the first input fulfills and rejects with `AggregateError` when all inputs reject.

## 161. Async Function

An `async` function returns a Promise even when its body returns a plain value.

## 162. Async Error

Throwing inside an `async` function produces a rejected returned Promise.

## 163. Cancellation

Functional async workflows should model cancellation explicitly when stale or unnecessary work should stop.

## 164. AbortSignal

`AbortSignal` provides a standard cancellation signal for APIs that support it, including many fetch-based workflows.

## 165. Async Pipeline

```js
const loadView = id =>
  fetchUser(id)
    .then(normalizeUser)
    .then(buildViewModel);
```

## 166. Async Composition Caveat

Not every Promise-returning function is referentially transparent because creating it can trigger network, timers, or other effects.

## 167. Lazy Effect Concept

A function that returns an effect description can delay starting the effect until explicitly invoked.

## 168. Effect Factory

```js
const loadUserEffect = id => () => fetchUser(id);
```

The outer function describes/configures the effect; calling the returned function starts it.

## 169. Dependency Injection

Pass dependencies such as clients, clocks, and repositories into functions instead of importing hidden mutable state everywhere.

## 170. Injectable Clock

```js
const isExpired = (now, expiresAt) => now >= expiresAt;
```

Testing becomes easier because time is explicit.

## 171. Injectable Randomness

For deterministic tests, pass a random-value generator instead of directly depending on `Math.random()` inside domain logic.

## 172. Functional Core with I/O

```text
HTTP request
 ↓
parse/validate
 ↓
pure domain function
 ↓
result
 ↓
HTTP response
```

## 173. Functional Domain Logic

Business rules are often strong candidates for pure functions because they can be tested without browsers, databases, or network calls.

## 174. Pure Price Calculation

```js
const subtotal = items =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);
```

## 175. Pure Tax Calculation

```js
const addTax = (amount, rate) => amount + amount * rate;
```

## 176. Pure Discount Calculation

```js
const applyDiscount = (amount, rate) => amount * (1 - rate);
```

## 177. Pipeline Business Logic

```js
const total = pipe(
  subtotal,
  amount => applyDiscount(amount, 0.1),
  amount => addTax(amount, 0.18)
);
```

## 178. Separate Formatting

Formatting currency or UI labels can remain separate from financial calculation rules.

## 179. Avoid Floating-Point Assumptions

Financial applications often require integer minor units or decimal arithmetic rather than relying blindly on binary floating-point calculations.

## 180. Functional UI Thinking

A UI can be modeled as a function of state: `UI = render(state)`, while events and effects update state outside the pure rendering calculation.

## 181. React Connection

React encourages pure rendering concepts, immutable state updates, and explicit side-effect boundaries, though React applications are not automatically purely functional.

## 182. Derived State

Prefer calculating simple derived values from existing state rather than storing redundant state that can become inconsistent.

## 183. Selector

A selector is a function that derives a particular value from application state.

## 184. Pure Selector

```js
const selectCompleted = state =>
  state.todos.filter(todo => todo.completed);
```

## 185. Memoized Selector

Memoization can avoid repeated expensive derivation when inputs and access patterns justify it.

## 186. Referential Stability

Memoized systems often depend on stable references. Creating new objects/functions unnecessarily can invalidate reference-based optimizations.

## 187. Referential Stability Is Not Purity

A function can be pure while returning a new object every time; purity and object identity are different concepts.

## 188. Function Composition in React

Small event/data transformation functions can be composed without turning component code into a deeply nested abstraction.

## 189. State Reducer

A reducer is commonly a function of the form `(state, action) => nextState`.

## 190. Reducer Purity

A reducer should generally be deterministic and avoid side effects, especially in state-management architectures that rely on predictable state transitions.

## 191. Reducer Example

```js
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
```

## 192. Reducer Mutation Trap

Mutating the existing state and returning it can break systems that rely on reference changes to detect updates.

## 193. Action as Data

An action describes what happened rather than directly performing the state mutation.

## 194. Event vs Command

An event records something that happened; a command requests an operation. Clear terminology helps state architecture remain understandable.

## 195. Function Composition in Backend Code

Middleware, validation, normalization, authorization checks, and response transformation can often be expressed as composable stages.

## 196. Middleware

Middleware is a function that participates in a request-processing pipeline and can often be composed around a shared protocol.

## 197. Middleware Composition

```text
request
 ↓
auth
 ↓
validation
 ↓
controller
 ↓
response
```

## 198. Function Decorator

A decorator-like higher-order function can wrap another function to add behavior such as logging, timing, caching, or authorization.

## 199. Wrapper Example

```js
const withTiming = fn => async (...args) => {
  const start = performance.now();
  try {
    return await fn(...args);
  } finally {
    console.log(performance.now() - start);
  }
};
```

## 200. Wrapper Trade-Off

Wrappers can add useful cross-cutting behavior but may complicate stack traces, types, debugging, and identity-sensitive APIs.

## 201. Memoization Utility

```js
const memoize = fn => {
  const cache = new Map();
  return value => {
    if (cache.has(value)) return cache.get(value);
    const result = fn(value);
    cache.set(value, result);
    return result;
  };
};
```

## 202. Memoization Caveat

This simple implementation keys by one value and can grow without bound. Production memoization requires an appropriate key and retention policy.

## 203. Memoizing Objects

Using object identity as a cache key means two structurally equal objects are different keys unless they are the same object.

## 204. Serialization Cache Keys

Serializing objects to make structural cache keys can be expensive and can have correctness problems around ordering and unsupported values.

## 205. Function Decorators and this

A wrapper using rest arguments can accidentally change `this` behavior if it calls the original function without preserving the receiver.

## 206. Preserve this

```js
function wrap(fn) {
  return function (...args) {
    return fn.apply(this, args);
  };
}
```

## 207. Functional Style and this

Pure functional code often avoids `this` by passing required data explicitly, but JavaScript APIs and object-oriented code still use `this` extensively.

## 208. Partial Application Utility

```js
const partial = (fn, ...preset) => (...rest) => fn(...preset, ...rest);
```

## 209. Currying Utility

Generic currying utilities become complicated around optional arguments, rest parameters, default parameters, and function metadata. Prefer explicit curried functions when clarity matters.

## 210. Function Composition with Async

A composition helper for Promise-returning functions can chain stages while preserving asynchronous flow.

## 211. Async Pipe

```js
const pipeAsync = (...fns) => input =>
  fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(input));
```

## 212. Async Pipe Error Flow

A rejection skips later fulfillment handlers until an appropriate rejection handler is encountered.

## 213. Concurrency in Functional Pipelines

Functional composition does not imply sequential execution. Start independent operations concurrently when appropriate.

## 214. map + Promise.all

```js
const results = await Promise.all(items.map(loadItem));
```

## 215. Concurrency Limit

For large collections, combine functional transformation with a bounded concurrency mechanism instead of launching unlimited operations.

## 216. Side-Effectful map

Using `map()` solely to trigger side effects is misleading because the returned array is usually ignored.

## 217. Better Side Effects

Use `for...of`, `forEach()`, or an explicit effect-processing abstraction when the intent is side effects.

## 218. for...of and Async

`for...of` with `await` gives sequential asynchronous control and is often easier to reason about than a large unbounded Promise batch.

## 219. Functional Sequence

A sequence abstraction can represent ordered operations while hiding iteration mechanics, but plain JavaScript loops are often sufficient.

## 220. Transforms vs Effects

Separate pure transformations from effectful operations so that each can be tested at the appropriate level.

## 221. Test Pure Functions

Pure functions usually need simple input/output assertions and many edge cases.

## 222. Property-Based Testing

Property-based testing generates many inputs and checks general properties instead of relying only on hand-picked examples.

## 223. Property Example

For a correct `reverse`, reversing twice should produce the original sequence for supported inputs.

## 224. Invariant

An invariant is a condition that should remain true throughout an operation or across valid state transitions.

## 225. Example Invariant

For a cart, quantities should never become negative if the domain rule forbids negative quantities.

## 226. Algebraic Tests

When a function has known mathematical laws, those laws can become powerful tests.

## 227. Referential Test

For a pure function, calling it twice with equivalent inputs should not mutate shared input or produce contradictory results.

## 228. Snapshot Caution

Snapshots can detect output changes but do not prove purity, performance, correctness of side effects, or good architecture.

## 229. Dependency Injection for Tests

Injecting clocks, random generators, repositories, and API clients makes functional core logic easier to test deterministically.

## 230. Test Boundary

Test pure business rules heavily with unit tests, then test integration boundaries where real I/O behavior matters.

## 231. Debugging Pure Functions

When a pure function is wrong, inspect input, transformation logic, and output. Hidden global state is less likely to obscure the cause.

## 232. Debugging Pipelines

Name intermediate transformations when a long pipeline becomes difficult to inspect.

## 233. Debugging Composition

```js
const normalized = normalize(input);
const validated = validate(normalized);
const result = transform(validated);
```

Explicit intermediate variables can improve debugging without changing the logic.

## 234. Logging Is an Effect

Logging changes observable behavior and should be treated as a side effect, especially when reasoning about strict purity.

## 235. Randomness Is an Effect Dependency

A function using `Math.random()` is not deterministic solely from its explicit parameters.

## 236. Time Is an Effect Dependency

A function using `Date.now()` depends on ambient time. Pass a timestamp or clock when deterministic behavior matters.

## 237. Environment Is an Effect Dependency

Reading browser globals, process environment, local storage, or configuration files introduces external dependencies.

## 238. Pure Browser Logic

DOM-independent validation, formatting, parsing, calculations, reducers, and state transitions are strong candidates for pure functions.

## 239. Impure Browser Logic

DOM updates, storage access, clipboard operations, network requests, timers, and event registration are effects.

## 240. Pure Node Logic

Parsing, validation, business rules, transformations, and calculations can often be isolated from filesystem, database, and network effects.

## 241. Impure Node Logic

Filesystem access, environment access, database calls, network requests, process signals, and logging are external effects.

## 242. Functional Architecture

A useful architecture can separate `domain`, `application`, `infrastructure`, and interface layers so core logic depends on explicit data rather than concrete I/O mechanisms.

## 243. Dependency Direction

Prefer dependencies pointing toward stable business rules rather than letting domain logic depend directly on infrastructure details.

## 244. Functional Domain Service

A domain service can be a pure function receiving all data required to compute a business decision.

## 245. Repository Boundary

A repository interface can isolate persistence effects from pure domain transformations.

## 246. Command Handler

A command handler coordinates effects and invokes pure domain functions rather than embedding all business rules inside database calls.

## 247. Functional Core Example

```js
const canPublish = post =>
  post.title.trim() !== "" && post.content.trim() !== "";
```

## 248. Imperative Shell Example

```js
const publish = async post => {
  if (!canPublish(post)) throw new Error("Invalid post");
  await repository.save(post);
};
```

## 249. Pure/Impure Testability

The pure rule can be tested without a database; the shell needs integration tests around persistence behavior.

## 250. Functional Programming and Security

Pure functions cannot eliminate security vulnerabilities, but explicit data flow and isolated effects can make validation and authorization rules easier to reason about.

## 251. Validate at Boundaries

Treat external input as untrusted and normalize/validate it before passing it into domain functions.

## 252. Pure Authorization Rule

```js
const canEdit = (user, post) => user.id === post.ownerId;
```

The rule itself can be pure even though the data used to call it came from an external system.

## 253. Do Not Trust Client Purity

A pure frontend authorization function is not a security boundary. Server-side authorization remains necessary for protected operations.

## 254. Functional Programming and Performance

Functional abstractions can improve clarity but may introduce allocations, callbacks, closures, or intermediate collections. Measure important paths.

## 255. Allocation from map/filter

Repeated `map()` and `filter()` stages can allocate intermediate arrays.

## 256. When a Loop Wins

For a hot path over a very large collection, one explicit loop may be faster and use less temporary memory than several chained transformations.

## 257. When Clarity Wins

For ordinary application data sizes, readable transformations can be preferable to micro-optimized loops.

## 258. Functional Programming Is Not “No Loops”

Loops are implementation mechanisms. FP is about reasoning style, function composition, immutability, and side-effect management, not banning syntax.

## 259. Functional Programming Is Not “No Classes”

JavaScript supports objects and classes alongside functional techniques. Use the model that fits the domain.

## 260. Functional Programming Is Not “No Mutation Anywhere”

Local mutation can be a practical implementation technique when it does not escape the intended boundary and improves performance or clarity.

## 261. Functional Programming Is Not “Everything Is a One-Liner”

Short code is not automatically functional, readable, or maintainable.

## 262. Functional Naming

Name functions after transformations or domain rules: `normalizeEmail`, `calculateTotal`, `selectActiveUsers`.

## 263. Single Responsibility

A small function should have a focused reason to change, but avoid splitting code into meaningless one-line wrappers.

## 264. Function Size

There is no universal ideal function length. Optimize for cohesive responsibility and readability.

## 265. Input Contracts

Document expected input shape, output shape, error behavior, and side effects when they are not obvious.

## 266. TypeScript Connection

TypeScript can make functional APIs easier to understand by describing input/output types, discriminated unions, generic transformations, and Result-like structures.

## 267. Generic Mapper

```ts
const mapValue = <T, U>(value: T, fn: (value: T) => U): U => fn(value);
```

## 268. Generic Predicate

```ts
const filterValue = <T>(value: T, predicate: (value: T) => boolean) =>
  predicate(value) ? value : undefined;
```

## 269. Discriminated Result

TypeScript can model success and failure with a discriminated union, allowing safe narrowing by a property such as `ok`.

## 270. Algebraic Data Type Concept

JavaScript does not have native algebraic data types as a core feature, but tagged objects and TypeScript unions can model many ADT-like designs.

## 271. Sum Type

A sum type represents one of several alternatives, commonly modeled with a discriminant property.

## 272. Product Type

A product type combines multiple values, such as an object containing several required properties.

## 273. Pattern Matching

JavaScript currently uses constructs such as `switch`, discriminant checks, and object destructuring for many pattern-matching-like tasks.

## 274. Exhaustiveness

When modeling finite states, make sure every valid case is handled and unknown cases fail safely.

## 275. State Machine

A state machine can represent state transitions as pure functions from `(state, event)` to `nextState`.

## 276. State Transition Example

```js
const transition = (state, event) => {
  if (state === "idle" && event === "START") return "running";
  if (state === "running" && event === "STOP") return "idle";
  return state;
};
```

## 277. State Machine Benefit

Explicit transitions make complex UI and workflow behavior easier to test than scattered boolean flags.

## 278. Boolean Explosion

Many independent booleans can create impossible or ambiguous states. A discriminated state model can make valid states explicit.

## 279. Functional Event Handling

Treat events as data and use pure transition functions to calculate the next state.

## 280. Effect Mapping

After calculating the next state, an effect layer can perform network calls, navigation, persistence, or notifications.

## 281. Functional Reactive Idea

Reactive systems can model changing values and events as streams transformed through operators. JavaScript libraries may provide this abstraction.

## 282. Observable vs Promise

A Promise represents one eventual settlement; an Observable-like abstraction can represent multiple values over time.

## 283. Stream Transformation

Map, filter, combine, debounce, and switch-like operators are functional transformations commonly used in reactive libraries.

## 284. Cancellation in Streams

Reactive pipelines need lifecycle-aware cancellation so subscriptions do not continue after their consumer is gone.

## 285. Functional Event Streams

DOM events can be converted into stream-like data and transformed, but native event listeners are often sufficient for simple applications.

## 286. Backpressure

Stream processing must consider producer/consumer speed differences to prevent unbounded memory growth.

## 287. Functional Data Processing

Generators and streams are useful when datasets are large enough that eager materialization would be expensive.

## 288. Map/Filter/Reduce Limitation

For complex workflows, forcing everything into map/filter/reduce can reduce clarity. Use domain-specific functions and loops when they communicate intent better.

## 289. Fold Concept

A fold is a general idea of consuming a sequence into one result; JavaScript's `reduce()` is a common form of fold.

## 290. Left Fold

`reduce()` processes an array from left to right by default.

## 291. Right Fold

`reduceRight()` processes an array from right to left.

## 292. Associativity and Reduce

Parallel reduction is safest when the operation combines values associatively and the accumulator design supports the execution model.

## 293. Reduce Mutation

Mutating an accumulator object inside `reduce()` is not automatically non-functional. The key question is whether mutation is local and whether the abstraction remains clear.

## 294. Accumulator Design

Choose an accumulator representation that makes invariants obvious and avoids accidental shared state.

## 295. Function Composition and Types

Composition becomes easier to reason about when each function's input and output contracts align.

## 296. Type Mismatch

```js
const pipeline = pipe(
  value => value.trim(),
  value => value.length,
  value => value.toUpperCase()
);
```

The final function receives a number, so the pipeline is logically invalid.

## 297. Contract Alignment

Every adjacent stage in a pipeline should accept the type/shape produced by the previous stage.

## 298. Debugging Type Flow

Write the intermediate types or values down when a composed pipeline behaves unexpectedly.

## 299. Composition Diagram

```text
Input
 ↓
f1
 ↓
f2
 ↓
f3
 ↓
Output
```

## 300. Function Pipeline Design

A good pipeline has meaningful stages, explicit contracts, predictable errors, and a clear final result.

## 301. Naming Pipelines

Name domain pipelines such as `prepareCheckout`, `normalizeRequest`, or `buildNoteViewModel` instead of exposing generic composition machinery everywhere.

## 302. Functional Refactoring

Start with working imperative code, identify pure transformations, extract them, then compose them where it improves clarity.

## 303. Refactor Step 1

Identify external effects and mark them as boundaries.

## 304. Refactor Step 2

Extract calculations that depend only on explicit inputs.

## 305. Refactor Step 3

Remove hidden global dependencies from extracted functions.

## 306. Refactor Step 4

Replace accidental mutation with explicit immutable updates where shared-state correctness requires it.

## 307. Refactor Step 5

Compose transformations only when the resulting flow is easier to read.

## 308. Refactor Step 6

Add unit tests around pure functions before making larger architectural changes.

## 309. Refactor Step 7

Measure performance after refactoring if the code is on a meaningful hot path.

## 310. Common Mistake: Nested Ternaries

Deeply nested ternaries are not functional-programming mastery. They can reduce readability and should usually be replaced with named logic.

## 311. Common Mistake: Reduce Everything

Using `reduce()` for every transformation can hide intent and create difficult accumulator logic.

## 312. Common Mistake: Mutating map Input

A `map()` callback that mutates each source object is not an immutable transformation merely because `map()` was used.

## 313. Common Mistake: Hidden Side Effects

A function named like a calculation should not secretly write to storage, mutate global state, or perform network requests without making that behavior clear.

## 314. Common Mistake: Unbounded Memoization

Memoization without eviction or bounded inputs can grow memory indefinitely.

## 315. Common Mistake: Over-Abstraction

A custom `compose`, `pipe`, `Maybe`, `Result`, or curry library is not automatically better than straightforward JavaScript.

## 316. Common Mistake: Clever Point-Free Code

Prefer explicit arguments when they make the business rule easier to understand.

## 317. Common Mistake: Ignoring Mutation Semantics

Copying an object with spread does not make nested data independent.

## 318. Common Mistake: Treating Promise as Lazy

A Promise generally starts its underlying operation when constructed; wrapping an effect in a function is one way to delay invocation.

## 319. Common Mistake: Ignoring Cancellation

Composing asynchronous operations without cancellation can waste resources and produce stale updates.

## 320. Common Mistake: Side Effects in Reducers

Reducers should not perform network requests, mutate external systems, or depend on nondeterministic ambient state.

## 321. Common Mistake: Mutating React State

Mutating existing state objects can prevent expected reference-based update detection and make state transitions difficult to reason about.

## 322. Common Mistake: Functional Does Not Mean Immutable DOM

The DOM is inherently mutable. Functional UI architecture isolates DOM effects; it does not require pretending the browser DOM is immutable.

## 323. Common Mistake: Performance Folklore

Do not assume functional code is always slower or faster. Profile the actual workload.

## 324. Common Mistake: Premature Optimization

Optimize after identifying a meaningful bottleneck, not because a functional abstraction looks expensive.

## 325. Practical Challenge: Pure Utilities

Write pure functions for slug generation, email normalization, price calculation, date formatting input preparation, and validation.

## 326. Practical Challenge: Array Pipeline

Given an array of products, filter active products, transform names, calculate prices, and produce a final summary without mutating the input.

## 327. Practical Challenge: Immutable Cart

Implement add, remove, update quantity, and clear operations as pure functions returning new cart state.

## 328. Practical Challenge: Reducer

Build a shopping-cart reducer supporting `ADD`, `REMOVE`, `INCREMENT`, `DECREMENT`, and `CLEAR` actions.

## 329. Practical Challenge: Function Factory

Build configurable validators such as `minLength(8)`, `maxLength(30)`, and `matches(pattern)`.

## 330. Practical Challenge: Compose

Implement `compose()` and `pipe()` and test them with three or more transformations.

## 331. Practical Challenge: Curry

Implement a simple curry helper for fixed-arity functions and document its limitations.

## 332. Practical Challenge: Memoization

Implement memoization for a pure single-argument function and add a bounded cache.

## 333. Practical Challenge: Lazy Pipeline

Use generators to lazily map and filter a large sequence without creating intermediate arrays.

## 334. Practical Challenge: Result

Create a Result utility with `ok`, `err`, `map`, `mapError`, and `unwrapOr` operations.

## 335. Practical Challenge: Validation

Build a validation pipeline that can return multiple field errors rather than only the first error.

## 336. Practical Challenge: Async Pipeline

Create a `pipeAsync()` utility and use it to normalize and validate asynchronously loaded data.

## 337. Practical Challenge: Cancellation

Build a search pipeline where a new query cancels or ignores the previous request.

## 338. Practical Challenge: State Machine

Implement a login state machine with idle, loading, success, and error states.

## 339. Practical Challenge: Effect Boundary

Build a notes workflow where pure functions calculate the next state and a shell performs API/storage effects.

## 340. Mini Project: Functional Expense Calculator

Create a pure calculation engine for income, expenses, categories, totals, percentages, and monthly summaries.

## 341. Mini Project: Functional Quiz Engine

Build question validation, answer evaluation, score calculation, progress calculation, and result generation as pure functions.

## 342. Mini Project: Todo Reducer

Create a reducer-driven todo application with pure state transitions and effectful persistence outside the reducer.

## 343. Mini Project: Data Pipeline

Build a dataset processing tool using normalization, filtering, mapping, grouping, sorting, and aggregation.

## 344. Intermediate Project: Notes Domain

Extract your Notes application's title validation, slug creation, permissions, folder calculations, tag transformations, and view-model generation into pure domain functions.

## 345. Intermediate Project: Functional API Layer

Create a request pipeline that parses, validates, normalizes, authorizes, executes a repository effect, and maps the result into a response.

## 346. Advanced Project: Result-Based Service Layer

Implement a service layer where expected domain failures are represented explicitly and infrastructure exceptions are translated at boundaries.

## 347. Advanced Project: Lazy Data Processor

Process a very large dataset with generators, bounded memory, filtering, mapping, and incremental output.

## 348. Advanced Project: Functional State Machine

Build a complete multi-step checkout state machine with validation, asynchronous effects, cancellation, retry, and deterministic transition tests.

## 349. Advanced Project: Functional Full-Stack Feature

Build a Notes feature with a pure domain core, dependency-injected repositories, functional request validation, immutable state transitions, explicit effect boundaries, and comprehensive tests.

## 350. Beginner Practice

1. Define pure function.
2. Define side effect.
3. Explain higher-order function.
4. Explain immutability.
5. Explain `map()`.
6. Explain `filter()`.
7. Explain `reduce()`.
8. Explain composition.
9. Explain closure.
10. Explain why `const` is not deep immutability.

## 351. Intermediate Practice

1. Refactor a mutating function into an immutable update.
2. Build a function factory.
3. Implement `pipe()`.
4. Implement `compose()`.
5. Build a reducer.
6. Build a Result type.
7. Build a generator pipeline.
8. Add memoization.
9. Add cancellation to async work.
10. Separate pure domain logic from I/O.

## 352. Advanced Practice

1. Design a functional architecture for a full-stack feature.
2. Explain structural sharing.
3. Compare eager and lazy pipelines.
4. Analyze allocation costs of chained transformations.
5. Design bounded memoization.
6. Model a workflow as a state machine.
7. Build property-based tests.
8. Design explicit effect boundaries.
9. Compose asynchronous stages with controlled concurrency.
10. Refactor a real feature without sacrificing readability.

## 353. Interview: Functional Programming

**Question:** What is functional programming?

**Answer:** A programming paradigm emphasizing functions, transformations, composition, predictable data flow, and controlled side effects.

## 354. Interview: Pure Function

**Question:** What makes a function pure?

**Answer:** Its result depends only on relevant inputs and it has no observable side effects.

## 355. Interview: Immutability

**Question:** Does `const` make an object immutable?

**Answer:** No. It prevents reassignment of the binding but does not prevent mutation of the object's properties.

## 356. Interview: Higher-Order Function

**Question:** What is a higher-order function?

**Answer:** A function that receives functions, returns functions, or both.

## 357. Interview: map vs forEach

**Question:** When should you use `map()` instead of `forEach()`?

**Answer:** Use `map()` when producing a transformed array; use `forEach()` when intentionally performing side effects.

## 358. Interview: reduce

**Question:** Can `reduce()` return an object or string?

**Answer:** Yes. The accumulator/result can be any type suitable for the algorithm.

## 359. Interview: Currying

**Question:** What is currying?

**Answer:** Transforming a multi-argument function into a sequence of function applications, commonly one argument at a time.

## 360. Interview: Composition

**Question:** Why compose functions?

**Answer:** To build larger transformations from small independently understandable and testable functions.

## 361. Interview: Memoization

**Question:** What is the main trade-off of memoization?

**Answer:** It uses memory and cache-management complexity to reduce repeated computation.

## 362. Interview: Closure

**Question:** How does closure help functional programming?

**Answer:** It allows functions to retain access to lexical configuration and private state after the outer function has returned.

## 363. Interview: Pure Async

**Question:** Is a Promise automatically a pure value?

**Answer:** No. Constructing a Promise commonly starts an effect, so a Promise should not be confused with a lazy effect description.

## 364. Interview: Reducer

**Question:** What is a reducer?

**Answer:** A function that calculates the next accumulated/state value from the current value and an input such as an action.

## 365. Interview: Functional Performance

**Question:** Is functional code always slower?

**Answer:** No. It can be highly efficient, but abstractions such as intermediate arrays and closures can have costs. Measure real workloads.

## 366. Teach-Back: Purity

Explain pure functions, determinism, referential transparency, hidden dependencies, side effects, and effect boundaries to a beginner using practical examples.

## 367. Teach-Back: Immutability

Explain `const`, mutation, shallow copy, deep copy, structural sharing, `Object.freeze()`, and immutable array methods.

## 368. Teach-Back: Collection Transformation

Explain `map`, `filter`, `reduce`, `find`, `some`, `every`, chaining, eager evaluation, and lazy generators.

## 369. Teach-Back: Composition

Explain higher-order functions, closures, composition, pipe, currying, partial application, and function factories.

## 370. Teach-Back: Effects

Explain why network calls, timers, DOM updates, storage, randomness, and current time are effect dependencies.

## 371. Teach-Back: Architecture

Explain functional core/imperative shell and how pure domain logic can be isolated from databases, APIs, and browser effects.

## 372. Teach-Back: Async

Explain Promise composition, async pipelines, cancellation, concurrency, and why a Promise is not necessarily lazy.

## 373. Teach-Back: Performance

Explain why functional abstractions should be measured rather than optimized by folklore, including intermediate allocations and hot loops.

## 374. Mastery: Fundamentals

- [ ] I can define functional programming.
- [ ] I understand first-class and higher-order functions.
- [ ] I can identify pure and impure functions.
- [ ] I understand side effects.

## 375. Mastery: Immutability

- [ ] I know why `const` is not immutability.
- [ ] I can update objects/arrays without unintended mutation.
- [ ] I understand shallow copying and structural sharing.

## 376. Mastery: Transformations

- [ ] I can use map/filter/reduce appropriately.
- [ ] I know when a loop is clearer.
- [ ] I understand eager vs lazy processing.

## 377. Mastery: Composition

- [ ] I can compose functions.
- [ ] I can implement pipe.
- [ ] I understand currying and partial application.
- [ ] I can create function factories.

## 378. Mastery: Async

- [ ] I can compose Promise-based operations.
- [ ] I can model cancellation.
- [ ] I can control concurrency.
- [ ] I understand effect boundaries.

## 379. Mastery: Architecture

- [ ] I can isolate pure domain logic.
- [ ] I can inject external dependencies.
- [ ] I can model state transitions as pure functions.
- [ ] I can separate calculation from I/O.

## 380. Mastery: Testing

- [ ] I can unit-test pure functions.
- [ ] I understand invariants.
- [ ] I can use property-based thinking.
- [ ] I can test effectful boundaries separately.

## 381. Final Functional Mental Model

```text
Explicit input
     ↓
Pure transformation
     ↓
Pure transformation
     ↓
Result / next state
     ↓
Effect boundary
     ↓
External world
```

## 382. Final Refactoring Mental Model

```text
Messy feature
   ↓
Find hidden dependencies
   ↓
Separate effects
   ↓
Extract pure rules
   ↓
Make data flow explicit
   ↓
Compose where useful
   ↓
Test pure core
   ↓
Test integration boundary
   ↓
Measure real performance
```

## 383. Final Functional Programming Challenge

Build a **Functional Notes Domain Engine** around your full-stack Notes application.

Requirements:

1. Define explicit domain input/output contracts.
2. Create pure note-title validation.
3. Create pure content validation.
4. Create pure slug generation.
5. Create pure tag normalization.
6. Create pure folder/path transformation.
7. Create pure ownership checks.
8. Create pure sharing-permission rules.
9. Create pure archive/trash/pin state transitions.
10. Implement an immutable notes reducer.
11. Model important workflows as explicit states.
12. Create selectors for derived note data.
13. Implement a `pipe()` utility.
14. Implement a `compose()` utility.
15. Create configurable validation factories.
16. Create a bounded memoization utility.
17. Create a Result-like representation for expected domain failures.
18. Keep database operations outside the pure domain layer.
19. Inject repositories into application services.
20. Inject time for deterministic expiry tests.
21. Inject randomness where deterministic behavior is required.
22. Implement an async transformation pipeline.
23. Add request cancellation.
24. Add bounded concurrency for batch operations.
25. Avoid unbounded caches.
26. Add unit tests for pure functions.
27. Add invariant/property-style tests.
28. Add integration tests for repository boundaries.
29. Measure large-data transformation performance.
30. Compare a chained pipeline against a single-loop implementation on a representative workload.
31. Document where mutation is intentionally used internally.
32. Document every effect boundary.
33. Demonstrate that reducers do not perform I/O.
34. Demonstrate that authorization rules are independently testable.
35. Explain why frontend functional authorization is not a security boundary.
36. Explain where functional abstractions improve maintainability.
37. Explain where a simple imperative loop is better.
38. Explain eager vs lazy processing.
39. Explain closure and memoization memory implications.
40. Present the architecture to another developer without relying on library-specific jargon.

**Mastery standard:** You are not finished when you can use `map()` and `reduce()`. You are finished when you can design **predictable data flow, isolate side effects, compose functions, control mutation, model state, test domain rules, handle asynchronous effects, reason about performance, and choose functional techniques pragmatically in a real JavaScript application.**