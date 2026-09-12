# 📝 Topic-Wise JavaScript Blog Challenges

This file is the **topic-by-topic writing curriculum** for the JavaScript Zero to Master roadmap.

The purpose is not to publish articles. The purpose is to force understanding.

After finishing a topic, the learner must write the assigned blog **before moving to the next topic**.

---

# How to Complete Every Challenge

For every challenge:

1. Learn the topic from the corresponding chapter.
2. Read the examples.
3. Write and run your own examples.
4. Close the notes.
5. Write the blog in your own words.
6. Verify every technical claim with code or documentation.
7. Add at least one wrong-vs-correct example.
8. Add output prediction.
9. Answer the teach-back questions.
10. Explain the topic verbally to the teacher.

## Required Blog Structure

Every article should contain, when relevant:

- Definition
- Why it exists / problem it solves
- Syntax
- Simple example
- Step-by-step execution
- Important rules
- Real-world use
- Wrong vs correct code
- Output prediction
- Comparison with related concepts
- Common mistakes
- Mini coding task
- What confused me
- What I learned
- Teach-back explanation
- Teach-back questions

Do not copy the chapter. **The learner must explain the concept from their own mental model.**

---

# 00 — Learning System

## 00.1 How JavaScript Is Learned

**Blog title:** `How I Am Learning JavaScript Instead of Memorizing It`

Explain:
- learning vs memorization
- active recall
- deliberate practice
- code tracing
- output prediction
- debugging
- project-based learning
- teach-back

**Challenge:** Describe your own learning workflow and demonstrate it with one JavaScript problem.

**Teach-back:** Why does writing code and explaining code produce different kinds of understanding?

## 00.2 Documentation and MDN

**Blog title:** `How to Read JavaScript Documentation`

Explain:
- what documentation is
- how to find an API
- syntax sections
- parameters
- return values
- exceptions
- examples
- browser compatibility
- specifications

**Challenge:** Pick one JavaScript method and explain how you verified its behavior using documentation.

## 00.3 Debugging and Code Tracing

**Blog title:** `How I Debug JavaScript Instead of Guessing`

Explain:
- reproduce
- isolate
- inspect values
- read the error
- form a hypothesis
- change one thing
- verify the fix
- prevent regression

**Challenge:** Take broken code, predict the failure, identify the error, fix it, and explain why it failed.

## 00.4 Problem-Solving Workflow

**Blog title:** `How to Turn a JavaScript Problem Into Code`

Explain:
- understand requirements
- identify inputs
- identify outputs
- examples
- edge cases
- decomposition
- algorithm/pseudocode
- implementation
- testing

**Challenge:** Convert one real-world requirement into pseudocode and JavaScript.

---

# 01 — JavaScript Fundamentals

## 01.1 What Is JavaScript?

**Blog title:** `What Is JavaScript and Where Does It Run?`

Must explain:
- JavaScript vs ECMAScript
- ECMAScript specification
- TC39
- JavaScript engines
- parsing
- compilation/JIT at a high level
- runtime environments
- browser runtime
- Node.js runtime
- REPL

**Code challenge:** Run the same basic JavaScript idea in a browser and Node.js and identify the environment-specific APIs.

**Teach-back:** Is JavaScript itself the browser? Is JavaScript itself Node.js?

## 01.2 Source Text, Statements, Expressions and Syntax

**Blog title:** `JavaScript Syntax: Statements vs Expressions`

Explain:
- source text
- tokens at a high level
- statements
- expressions
- declarations
- expression values
- syntax errors

**Challenge:** Label at least 15 JavaScript examples as statement, expression, or both where appropriate.

## 01.3 Comments, ASI, Identifiers, Keywords and Literals

**Blog title:** `JavaScript Syntax Rules Beginners Must Understand`

Explain:
- comments
- `//`
- `/* */`
- semicolons
- Automatic Semicolon Insertion
- identifiers
- naming rules
- keywords
- literals
- reserved words

**Challenge:** Provide three ASI examples where formatting changes behavior or produces a surprising result.

## 01.4 Strict Mode, Scripts and Modules

**Blog title:** `Strict Mode, Scripts and Modules in JavaScript`

Explain:
- strict mode
- `'use strict'`
- script code
- module code
- module scope
- why modules are strict by default
- important strict-mode behavior

**Challenge:** Show one behavior that is rejected or changed in strict mode.

---

## 01.5 Variables and Bindings

**Blog title:** `JavaScript Variables Are Bindings, Not Just Boxes`

Explain:
- variable/binding
- declaration
- initialization
- assignment
- reassignment
- mutation
- `let`
- `const`
- `var`
- naming rules
- multiple declarations
- destructuring declarations
- global declarations

**Mandatory comparison:** `let` vs `const` vs `var`.

**Code challenge:** Demonstrate why `const` prevents reassignment but does not make an object immutable.

## 01.6 Values and Data Types

**Blog title:** `JavaScript Data Types Explained From First Principles`

Explain:
- primitive values
- object values
- `undefined`
- `null`
- boolean
- number
- bigint
- string
- symbol
- object
- functions as objects
- `typeof`
- value identity
- primitive immutability
- mutable object contents

**Challenge:** Create examples for every primitive type and explain the surprising `typeof` cases.

## 01.7 Operators and Expressions

**Blog title:** `JavaScript Operators: How Expressions Produce Values`

Cover:
- assignment
- arithmetic
- unary operators
- increment/decrement
- comparison
- equality
- relational operators
- logical operators
- nullish coalescing
- optional chaining
- ternary
- `typeof`
- `delete`
- `void`
- `in`
- `instanceof`
- bitwise operators
- precedence
- associativity
- short-circuiting

**Challenge:** Predict at least 10 outputs involving precedence and short-circuit evaluation.

## 01.8 Type Coercion

**Blog title:** `JavaScript Type Coercion Without Memorizing Weird Tricks`

Explain:
- explicit conversion
- implicit coercion
- ToBoolean
- ToNumber
- ToString
- ToPrimitive
- string concatenation
- numeric conversion
- equality coercion
- truthy/falsy
- `null` vs `undefined`
- `NaN`
- `Object.is`

**Mandatory challenge:** Explain and prove with code why expressions such as `"5" + 2` and `"5" - 2` behave differently.

## 01.9 Conditionals

**Blog title:** `How JavaScript Makes Decisions`

Cover:
- `if`
- `else`
- `else if`
- nested conditionals
- ternary expressions
- `switch`
- `case`
- `default`
- fall-through
- `break`
- truthy/falsy
- logical conditions

**Coding challenge:** Build a grade/eligibility/menu system without copying a solution.

## 01.10 Loops

**Blog title:** `JavaScript Loops: Repeating Work Safely`

Cover:
- `for`
- `while`
- `do...while`
- `for...of`
- `for...in`
- nested loops
- `break`
- `continue`
- labeled statements
- infinite loops
- termination

**Mandatory comparisons:**
- `while` vs `do...while`
- `for...of` vs `for...in`

**Challenge:** Explain why `for...in` is generally not the right loop for array values.

---

# 02 — Functions

## 02.1 Function Fundamentals

**Blog title:** `What Is a Function and Why Is It So Important?`

Cover:
- function concept
- declaration
- expression
- named function expression
- anonymous function
- parameters
- arguments
- return
- default parameters
- rest parameters
- spread in calls
- function arity

**Challenge:** Implement the same operation using a declaration, expression, and arrow function.

## 02.2 Functions as Values

**Blog title:** `Functions Are Values in JavaScript`

Explain:
- first-class functions
- storing functions
- passing functions
- returning functions
- callback functions
- higher-order functions

**Challenge:** Write a function that accepts another function and another function that returns a function.

## 02.3 Arrow Functions

**Blog title:** `Arrow Functions: Syntax and the Important this Difference`

Cover:
- arrow syntax variations
- implicit return
- block body
- lexical `this`
- when arrows are useful
- when a normal function is more appropriate

## 02.4 IIFE and Recursion

**Blog title:** `IIFE and Recursion in JavaScript`

Cover:
- IIFE motivation
- recursion
- base case
- recursive call
- stack depth
- termination
- tail-call concept awareness

**Challenge:** Write factorial and a recursive countdown, then explain the call stack.

## 02.5 Closures Preview, Factories and Composition Preview

**Blog title:** `Functions That Remember: A First Look at Closures`

Explain:
- closure idea
- function factory
- captured variables
- pure functions preview
- side effects preview
- currying/composition preview

**Challenge:** Build a counter factory that keeps state private.

---

# 03 — Scope and Execution

## 03.1 Scope

**Blog title:** `JavaScript Scope and the Scope Chain`

Cover:
- global scope
- module scope
- function scope
- block scope
- lexical scope
- lexical environment
- environment records
- scope chain
- identifier resolution
- shadowing

**Challenge:** Trace where each variable is found in a nested program.

## 03.2 Hoisting and TDZ

**Blog title:** `JavaScript Hoisting and the Temporal Dead Zone`

Cover:
- `var` hoisting
- function declaration hoisting
- `let`/`const` hoisting behavior
- Temporal Dead Zone
- declaration vs initialization

**Mandatory:** Predict outputs before execution for at least 8 examples.

## 03.3 Execution Context and Call Stack

**Blog title:** `How JavaScript Executes a Function`

Cover:
- execution context
- global context
- function context
- module context
- call stack
- stack frames
- creation phase
- execution phase
- returning from functions

**Challenge:** Draw the call stack for a nested function program.

## 03.4 Closures

**Blog title:** `Closures: How Functions Keep Access to Outer Variables`

Cover:
- closure creation
- lexical environment
- closure lifetime
- private state
- common closure patterns

**Challenge:** Create a private counter and explain why the state remains accessible.

## 03.5 this and Explicit Binding

**Blog title:** `JavaScript this: A Call-Site Problem, Not a Function Property`

Cover:
- global `this`
- function-call `this`
- method-call `this`
- constructor `this`
- arrow-function `this`
- `call`
- `apply`
- `bind`

**Mandatory:** Predict `this` in at least 10 examples.

---

# 04 — Strings

## 04.1 String Fundamentals

**Blog title:** `JavaScript Strings Are Immutable Values`

Cover:
- literals
- single/double quotes
- template literals
- indexing
- length
- immutability
- character access
- `at`
- `charAt`

**Challenge:** Prove that string methods return new strings rather than modifying the original string.

## 04.2 Unicode

**Blog title:** `Unicode and UTF-16 in JavaScript`

Cover:
- Unicode
- UTF-16
- code units
- surrogate pairs
- `charCodeAt`
- `codePointAt`

**Challenge:** Use an emoji to demonstrate why code units and user-perceived characters are not always the same.

## 04.3 Searching, Extracting and Transforming

**Blog title:** `The JavaScript String Methods I Actually Need`

Cover:
- `includes`
- `startsWith`
- `endsWith`
- `indexOf`
- `lastIndexOf`
- `slice`
- `substring`
- `trim`
- `trimStart`
- `trimEnd`
- case conversion
- padding
- `replace`
- `replaceAll`
- `split`
- concatenation

**Mandatory comparison:** `slice()` vs `substring()`.

## 04.4 Template Literals and Tagged Templates

**Blog title:** `Template Literals, Escapes and Tagged Templates`

Cover:
- interpolation
- multiline strings
- escape sequences
- raw strings
- tagged templates

**Challenge:** Build a small tagged-template formatter.

---

# 05 — Arrays

## 05.1 Array Fundamentals

**Blog title:** `How JavaScript Arrays Work at the Language Level`

Cover:
- array literals
- constructor
- indexing
- length
- sparse arrays
- array-like values
- references
- mutation
- copying

## 05.2 Mutating vs Non-Mutating Methods

**Blog title:** `Which JavaScript Array Methods Mutate the Array?`

Cover:
- `push`
- `pop`
- `shift`
- `unshift`
- `splice`
- `sort`
- `reverse`
- `fill`
- `copyWithin`
- `slice`
- `concat`
- spread copying

**Challenge:** Create a table of common array methods and mark whether each mutates the receiver.

## 05.3 Iteration and Transformation

**Blog title:** `map, filter, reduce and forEach — When Should I Use Each?`

Cover:
- `map`
- `filter`
- `reduce`
- `reduceRight`
- `forEach`
- callbacks
- accumulator
- return values

**Mandatory:** Explain why forgetting `return` in a block-bodied `map` callback causes `undefined` results.

## 05.4 Searching and Testing Arrays

**Blog title:** `Finding, Searching and Testing Array Data`

Cover:
- `find`
- `findIndex`
- `findLast`
- `findLastIndex`
- `some`
- `every`
- `includes`
- `indexOf`
- `lastIndexOf`

## 05.5 Sorting, Flattening and Iteration

**Blog title:** `Sorting, Flattening and Iterating Arrays Correctly`

Cover:
- default lexicographic sort
- numeric comparator
- stable sorting
- `toSorted`
- `reverse`
- `toReversed`
- `flat`
- `flatMap`
- `join`
- `entries`
- `keys`
- `values`
- `for...of`

**Challenge:** Demonstrate why `sort()` needs a numeric comparator for numbers.

## 05.6 Array Construction and Destructuring

**Blog title:** `Array.from, Array.of, Spread, Rest and Destructuring`

Cover:
- `Array.from`
- `Array.of`
- destructuring
- rest
- spread
- array-like vs iterable

---

# 06 — Objects

## 06.1 Object Fundamentals

**Blog title:** `JavaScript Objects: Properties, Keys and Values`

Cover:
- object literals
- properties
- keys/values
- dot notation
- bracket notation
- computed properties
- shorthand
- method shorthand
- nested objects

## 06.2 Property Access and Existence

**Blog title:** `How to Safely Read and Check Object Properties`

Cover:
- optional chaining
- nullish coalescing
- `Object.hasOwn`
- `in`
- own vs inherited properties
- `Object.keys`
- `Object.values`
- `Object.entries`
- `Object.fromEntries`

**Challenge:** Explain the difference between `Object.hasOwn(obj, key)` and `key in obj`.

## 06.3 Destructuring, Spread and Assign

**Blog title:** `Copying and Extracting Data From JavaScript Objects`

Cover:
- destructuring
- nested destructuring
- defaults
- rest properties
- spread properties
- `Object.assign`
- shallow copies
- references

**Mandatory:** Explain why spread and `Object.assign` do not perform a deep clone.

## 06.4 Property Descriptors

**Blog title:** `JavaScript Property Descriptors Under the Hood`

Cover:
- data descriptors
- accessor descriptors
- `get`
- `set`
- enumerable
- writable
- configurable
- `defineProperty`
- `defineProperties`
- `getOwnPropertyDescriptor`

## 06.5 Object Integrity

**Blog title:** `freeze, seal and preventExtensions Explained`

Compare:
- `Object.freeze`
- `Object.seal`
- `Object.preventExtensions`
- extensibility
- shallow behavior

---

# 07 — Collections and Iteration

## 07.1 Map and Set

**Blog title:** `Map and Set: Choosing the Right Collection`

Cover:
- Map keys
- Map methods
- Map iteration
- Set uniqueness
- Set methods
- when Map is better than plain objects
- when Set is useful

**Challenge:** Build a frequency counter using `Map`.

## 07.2 WeakMap and WeakSet

**Blog title:** `WeakMap and WeakSet: What Weak Really Means`

Explain:
- object-key requirements
- garbage-collection relationship
- use cases
- limitations
- why weak collections are not normal iterable collections

## 07.3 Iterable and Iterator Protocols

**Blog title:** `How for...of Actually Works: Iterables and Iterators`

Cover:
- iterable protocol
- iterator protocol
- `Symbol.iterator`
- `next()`
- iterator result objects
- arrays/strings/maps/sets
- non-iterable objects

**Challenge:** Implement a custom iterable object.

## 07.4 Generators Preview

**Blog title:** `Generators: Functions That Pause and Resume`

Cover:
- `function*`
- `yield`
- generator object
- lazy iteration
- generator delegation preview

---

# 08 — Built-in Objects

## 08.1 Number

**Blog title:** `JavaScript Numbers and IEEE-754 Without the Mystery`

Cover:
- Number type
- IEEE-754 double precision
- `NaN`
- Infinity
- safe integers
- `MAX_SAFE_INTEGER`
- `MIN_SAFE_INTEGER`
- `MIN_VALUE`
- `EPSILON`
- floating-point precision

**Mandatory:** Explain why `0.1 + 0.2` is not exactly `0.3`.

## 08.2 Numeric Utilities

**Blog title:** `Number.isNaN, Number.isFinite, parseInt, parseFloat and Number`

Compare:
- strict numeric checks
- global coercing checks
- parsing
- conversion
- `toFixed`
- `toPrecision`

## 08.3 Math

**Blog title:** `JavaScript Math: Rounding, Randomness and Numeric Utilities`

Cover:
- `abs`
- `floor`
- `ceil`
- `round`
- `trunc`
- `max`
- `min`
- `pow`
- `sqrt`
- `cbrt`
- `random`
- trigonometry
- logarithms
- exponentials

**Challenge:** Generate a random integer in a specified inclusive range and explain the formula.

## 08.4 Date and Time

**Blog title:** `JavaScript Date, Timestamps, UTC and Time Zones`

Cover:
- Date construction
- epoch time
- timestamps
- parsing
- getters/setters
- zero-based numeric month
- `getDate` vs `getDay`
- UTC methods
- time zones
- ISO strings
- `Intl.DateTimeFormat`

## 08.5 JSON

**Blog title:** `JSON: Serialization and Deserialization in JavaScript`

Cover:
- JSON syntax
- supported JSON values
- `JSON.stringify`
- `JSON.parse`
- serialization
- deserialization
- replacer
- reviver
- unsupported values
- JSON limitations

**Challenge:** Show at least five JavaScript values and explain how JSON handles each.

## 08.6 Regular Expressions

**Blog title:** `Regular Expressions in JavaScript From Beginner to Practical`

Cover:
- literals
- constructor
- character classes
- quantifiers
- groups
- captures
- non-capturing groups
- alternation
- anchors
- flags
- `test`
- `exec`
- string regex methods
- backreferences
- lookahead/lookbehind
- pitfalls

**Challenge:** Validate/extract useful data such as usernames, IDs, or dates. Explain limitations rather than claiming regex can validate every real-world format perfectly.

## 08.7 Intl, BigInt and Symbol

**Blog title:** `BigInt, Symbol and Intl: The Built-ins Beginners Often Skip`

Explain:
- BigInt use cases and limitations
- Symbol identity
- well-known symbols
- locale-aware formatting
- number formatting
- collation
- list formatting
- relative time formatting

---

# 09 — Advanced JavaScript

## 09.1 Prototypes

**Blog title:** `JavaScript Prototypes and the Prototype Chain`

Cover:
- prototype object
- prototype chain
- property lookup
- own vs inherited properties
- `Object.getPrototypeOf`
- `Object.setPrototypeOf`
- `Object.create`
- constructor functions
- `.prototype`
- `.constructor`
- `instanceof`

**Mandatory:** Trace a property lookup through a prototype chain.

## 09.2 Classes vs Prototypes

**Blog title:** `JavaScript Classes Are Built on Prototype-Based Behavior`

Explain:
- class syntax
- constructor
- methods
- prototype methods
- inheritance
- `extends`
- `super`
- method overriding

## 09.3 Symbols and Metaprogramming

**Blog title:** `Symbols, Proxy and Reflect: JavaScript Metaprogramming`

Cover:
- Symbols
- custom protocol hooks
- Proxy
- traps
- Reflect
- use cases
- risks of overusing metaprogramming

## 09.4 Typed Arrays and Binary Data

**Blog title:** `Binary Data in JavaScript: ArrayBuffer, DataView and Typed Arrays`

Cover:
- ArrayBuffer
- typed arrays
- DataView
- byte representation
- endianness
- binary data
- SharedArrayBuffer concepts
- Atomics concepts

---

# 10 — Asynchronous JavaScript

## 10.1 Sync vs Async

**Blog title:** `Synchronous and Asynchronous JavaScript`

Explain:
- synchronous execution
- asynchronous work
- concurrency
- parallelism
- callback model
- why waiting for I/O should not block everything

## 10.2 Promises

**Blog title:** `Promises: A Better Model for Future Values`

Cover:
- pending/fulfilled/rejected
- promise creation
- resolution
- thenables
- `then`
- `catch`
- `finally`
- chaining
- error propagation

**Challenge:** Build a fake asynchronous operation and handle success/failure.

## 10.3 Promise Combinators

**Blog title:** `Promise.all, allSettled, race and any — The Real Differences`

Create a comparison table for:
- `Promise.all`
- `Promise.allSettled`
- `Promise.race`
- `Promise.any`

**Challenge:** Give one real-world use case for each.

## 10.4 async/await

**Blog title:** `async/await: Writing Promise-Based Code Clearly`

Cover:
- async functions
- return values
- `await`
- rejection
- `try/catch`
- sequential awaits
- parallel work with `Promise.all`

**Mandatory:** Explain why two independent awaits can be slower than starting both operations together.

## 10.5 Event Loop

**Blog title:** `The JavaScript Event Loop: Stack, Tasks and Microtasks`

Cover:
- call stack
- task/macrotask concepts
- microtask queue
- Promise callbacks
- timers
- rendering opportunities
- ordering

**Challenge:** Predict the output of at least 10 event-loop examples.

## 10.6 Timers and Cancellation

**Blog title:** `Timers and Cancellation in JavaScript`

Cover:
- `setTimeout`
- `setInterval`
- minimum-delay scheduling
- clearing timers
- AbortController
- AbortSignal
- cancellation vs stopping already-executing JavaScript

## 10.7 Async Iteration

**Blog title:** `Async Iteration and for await...of`

Cover:
- async iterables
- async iterators
- `for await...of`
- async generators
- practical streaming-like use cases

## 10.8 Concurrency Control

**Blog title:** `Sequential, Parallel and Bounded-Concurrency JavaScript`

Explain:
- sequential execution
- parallel start
- concurrency limit
- why unlimited concurrency can be harmful
- retries and cancellation awareness

**Challenge:** Implement a small concurrency limiter.

---

# 11 — Modules

## 11.1 Why Modules?

**Blog title:** `Why JavaScript Applications Need Modules`

Explain:
- global namespace problems
- boundaries
- maintainability
- dependency relationships
- module scope

## 11.2 ESM

**Blog title:** `JavaScript ES Modules: import and export`

Cover:
- named exports
- default exports
- aliases
- namespace imports
- re-exporting
- side-effect imports
- module scope
- live bindings
- module evaluation

## 11.3 Dynamic Imports and Circular Dependencies

**Blog title:** `Dynamic import() and Circular Dependencies`

Explain:
- dynamic `import()`
- lazy loading concept
- module evaluation order
- circular dependency problems
- design strategies

## 11.4 ESM vs CommonJS

**Blog title:** `ESM vs CommonJS: What Is Actually Different?`

Compare:
- `import/export`
- `require/module.exports`
- module scope
- evaluation/loading model
- interoperability concepts
- package boundaries

---

# 12 — Object-Oriented JavaScript

## 12.1 OOP Concepts

**Blog title:** `Object-Oriented Programming in JavaScript`

Explain:
- encapsulation
- abstraction
- inheritance
- polymorphism
- objects and behavior

## 12.2 Constructor Functions and new

**Blog title:** `What new Actually Does in JavaScript`

Cover:
- constructor functions
- `new`
- prototype connection
- `this`
- returned object behavior

## 12.3 Classes

**Blog title:** `JavaScript Classes From Constructor to Private Fields`

Cover:
- declarations
- expressions
- constructors
- instance properties
- instance methods
- static methods/properties
- getters/setters
- private fields
- private methods
- static initialization blocks

## 12.4 Inheritance and Composition

**Blog title:** `Inheritance vs Composition in JavaScript`

Compare:
- `extends`
- `super`
- overriding
- prototype inheritance
- duck typing
- composition
- association
- aggregation
- composition relationships

**Challenge:** Build the same small system once with inheritance and once with composition. Explain which is easier to change.

## 12.5 Polymorphism and Abstraction

**Blog title:** `Polymorphism and Abstraction Without Fake JavaScript Interfaces`

Explain:
- behavioral contracts
- duck typing
- abstract-like patterns
- method dispatch
- limitations of function overloading
- manual overload-like APIs

---

# 13 — DOM

## 13.1 DOM Fundamentals

**Blog title:** `What Is the DOM?`

Cover:
- browser document
- DOM tree
- node types
- document node
- element nodes
- text nodes
- window/document relationship

## 13.2 Selecting and Traversing

**Blog title:** `Finding and Traversing Elements With JavaScript`

Cover:
- `getElementById`
- `querySelector`
- `querySelectorAll`
- `getElementsByClassName`
- `getElementsByTagName`
- static vs live collections
- parent/child/sibling traversal
- `closest`
- `matches`

## 13.3 Creating and Modifying DOM

**Blog title:** `How JavaScript Creates and Changes Web Pages`

Cover:
- `createElement`
- `createTextNode`
- `append`
- `appendChild`
- `prepend`
- `before`
- `after`
- `remove`
- `replaceWith`
- `textContent`
- `innerHTML`
- `outerHTML`
- attributes
- properties
- `classList`
- styles
- dataset

**Mandatory:** Explain why untrusted data should not be inserted with `innerHTML`.

## 13.4 Events

**Blog title:** `DOM Events: From Click to Event Delegation`

Cover:
- event listeners
- event object
- target/currentTarget
- bubbling
- capturing
- propagation
- `stopPropagation`
- `preventDefault`
- delegation

**Challenge:** Build a dynamic list using event delegation.

## 13.5 Forms

**Blog title:** `Handling Forms With JavaScript`

Cover:
- form controls
- submit event
- values
- validation
- preventing default submission
- error messages
- form state

## 13.6 DOM Observers

**Blog title:** `MutationObserver, IntersectionObserver and ResizeObserver`

Compare:
- what each observes
- callback timing at a high level
- practical use cases
- limitations

---

# 14 — BOM

## 14.1 Window and globalThis

**Blog title:** `The Browser Window and globalThis`

Explain:
- `window`
- global browser environment
- `globalThis`
- browser-specific globals
- why Node.js does not provide the browser DOM by default

## 14.2 Location and History

**Blog title:** `Navigation, URL Location and Browser History`

Cover:
- `location`
- navigation
- `history.back`
- `history.forward`
- `history.go`
- browser navigation concepts

## 14.3 Navigator and Screen

**Blog title:** `Navigator, Online Status, Screen and Viewport`

Cover:
- navigator
- user-agent concepts
- online/offline hint
- screen dimensions
- viewport dimensions
- `innerWidth`
- `innerHeight`

## 14.4 Browser Dialogs and Timers

**Blog title:** `alert, confirm, prompt and Browser Timers`

Cover:
- `alert`
- `confirm`
- `prompt`
- return values
- `setTimeout`
- `setInterval`
- clearing timers
- scheduling vs exact timing

---

# 15 — Browser APIs

## 15.1 Web Storage

**Blog title:** `localStorage and sessionStorage: What They Actually Store`

Cover:
- storage API
- persistence
- session lifetime
- values are strings
- serialization
- limitations
- security considerations

## 15.2 Cookies

**Blog title:** `Browser Cookies and the Security Flags That Matter`

Cover:
- cookies
- `HttpOnly`
- `Secure`
- `SameSite`
- expiration
- ambient credentials
- why cookie storage is different from Web Storage

## 15.3 URL APIs

**Blog title:** `URL and URLSearchParams in JavaScript`

Cover:
- parsing URLs
- constructing URLs
- query parameters
- encoding
- modifying search parameters

## 15.4 Clipboard, Notifications and Geolocation

**Blog title:** `Permission-Based Browser APIs`

Cover:
- Clipboard API
- Notifications API
- Geolocation API
- permission model
- secure contexts
- user activation where applicable
- browser support differences

## 15.5 File, Blob and FileReader

**Blog title:** `Working With Files in the Browser`

Cover:
- File
- Blob
- FileReader
- file input
- reading files
- object URLs at a high level

## 15.6 Workers and Service Workers

**Blog title:** `Web Workers vs Service Workers`

Compare:
- execution context
- DOM access
- background computation
- caching/offline use
- lifecycle concepts

## 15.7 IndexedDB and Structured Clone

**Blog title:** `Browser Storage Beyond localStorage`

Cover:
- IndexedDB concept
- structured clone
- asynchronous storage
- appropriate use cases

## 15.8 WebSocket and Server-Sent Events

**Blog title:** `Real-Time Browser Communication Basics`

Compare:
- WebSocket
- Server-Sent Events
- direction of communication
- typical use cases
- connection lifecycle

---

# 16 — Networking and HTTP

## 16.1 Client/Server and DNS

**Blog title:** `What Happens When JavaScript Calls an API?`

Cover:
- client/server
- DNS concept
- TCP/TLS concept
- HTTP
- request
- response
- URL

## 16.2 HTTP Methods and Status Codes

**Blog title:** `HTTP Methods and Status Codes for JavaScript Developers`

Cover:
- GET
- POST
- PUT
- PATCH
- DELETE
- 2xx
- 3xx
- 4xx
- 5xx

**Challenge:** Explain what each common method means and give a realistic API example.

## 16.3 Headers and Bodies

**Blog title:** `HTTP Headers, Content Types and Request Bodies`

Cover:
- Content-Type
- Accept
- Authorization
- cookies
- request body
- JSON payloads

## 16.4 Fetch

**Blog title:** `fetch(): The Complete Mental Model`

Cover:
- request lifecycle
- Promise returned by fetch
- `response.ok`
- status
- `response.json()`
- body consumption
- HTTP errors vs network errors
- cancellation

**Mandatory:** Explain why a `404` does not automatically make `fetch()` reject.

## 16.5 REST API Design

**Blog title:** `How REST APIs Model Resources`

Cover:
- resources
- URLs
- methods
- path parameters
- query parameters
- pagination
- filtering
- sorting
- caching concepts

## 16.6 CORS

**Blog title:** `CORS Explained Without the Myths`

Cover:
- same-origin policy
- CORS
- browser enforcement
- preflight
- credentials
- why CORS is not API authentication or authorization

## 16.7 Authentication, Authorization and CSRF

**Blog title:** `Authentication vs Authorization in Web Applications`

Cover:
- authentication
- authorization
- bearer tokens
- sessions
- cookies
- ambient credentials
- CSRF concept
- why backend authorization is mandatory

## 16.8 Reliable API Calls

**Blog title:** `Retries, Timeouts, Idempotency and Stale Responses`

Cover:
- timeout
- retry
- backoff/jitter concept
- idempotency
- unsafe blind retries
- stale response protection
- bounded concurrency

---

# 17 — Error Handling and Debugging

## 17.1 Error Types

**Blog title:** `JavaScript Errors: Syntax, Runtime and Logic`

Cover:
- syntax errors
- runtime errors
- logic errors
- `Error`
- `TypeError`
- `ReferenceError`
- `RangeError`
- `SyntaxError`
- `URIError`

## 17.2 try/catch/finally and throw

**Blog title:** `How JavaScript Error Propagation Works`

Cover:
- `throw`
- `try`
- `catch`
- `finally`
- propagation
- custom errors
- `Error.cause`

**Challenge:** Create a custom error and preserve the original cause.

## 17.3 Async Error Handling

**Blog title:** `Why try/catch Does Not Catch Every JavaScript Error`

Explain:
- synchronous region
- async callbacks
- rejected promises
- async function throws
- fetch HTTP-status caveat

## 17.4 Debugging Tools

**Blog title:** `A Practical JavaScript Debugging Workflow`

Cover:
- console methods
- breakpoints
- watch expressions
- call stack
- network panel
- inspecting values
- minimal reproduction

## 17.5 Production Error Handling

**Blog title:** `How Production JavaScript Should Handle Errors`

Cover:
- user-safe messages
- logging
- not exposing secrets
- stack traces
- global handlers as last-resort mechanisms
- recovery vs crash

---

# 18 — Memory and Performance

## 18.1 Memory Model

**Blog title:** `How JavaScript Memory and Garbage Collection Work`

Cover:
- values and references
- reachability
- garbage collection
- implementation dependence
- memory leaks
- long-lived references

Avoid claiming that JavaScript variables are simply "stored in stack vs heap" as a universal language rule.

## 18.2 Memory Leaks

**Blog title:** `Common JavaScript Memory Leak Patterns`

Cover:
- accidental long-lived references
- event listeners
- timers
- caches
- closures
- detached DOM references
- cleanup

## 18.3 Weak Collections

**Blog title:** `When WeakMap Helps With Memory-Sensitive Data`

Explain:
- weak reachability
- metadata association
- limitations
- why weak collections cannot be inspected like normal collections

## 18.4 Performance

**Blog title:** `JavaScript Performance: Measure Before You Optimize`

Cover:
- algorithmic cost
- unnecessary work
- rendering cost
- main-thread work
- batching
- memoization
- profiling
- measurement

**Challenge:** Identify and improve one intentionally slow program, then measure the difference.

---

# 19 — DSA

This section belongs in the JavaScript roadmap, but it should be taught as **problem-solving with JavaScript**, not memorization of algorithms.

## 19.1 Complexity

**Blog title:** `Big O: How to Think About Algorithm Cost`

Cover:
- input size
- time complexity
- space complexity
- common complexity classes
- trade-offs

## 19.2 Core Data Structures

Write separate blogs for:

- Arrays
- Strings
- Stack
- Queue
- Linked List
- Hash Table / Map
- Set
- Tree
- Heap
- Graph

For each:
- what it is
- operations
- complexity
- implementation
- use cases
- trade-offs

## 19.3 Core Algorithms

Write separate blogs for:

- Linear search
- Binary search
- Two pointers
- Sliding window
- Recursion
- Sorting
- BFS
- DFS
- Dijkstra
- Greedy algorithms
- Backtracking

**Mandatory:** State the assumptions under which the algorithm is valid.

Example: binary search requires an appropriately sorted search space.

## 19.4 Problem-Solving Blog

**Blog title:** `How I Approach an Unknown DSA Problem`

Explain:
- constraints
- examples
- brute force
- bottleneck
- optimization
- correctness reasoning
- complexity
- implementation
- edge cases

---

# 20 — Functional Programming

## 20.1 Pure Functions

**Blog title:** `Pure Functions and Side Effects`

Explain:
- deterministic output
- observable side effects
- referential transparency at a practical level
- testing benefits

## 20.2 Immutability

**Blog title:** `Immutability in JavaScript: What It Really Means`

Cover:
- not mutating existing values
- new values
- shallow vs deep copying
- object/array references

## 20.3 Higher-Order Functions

**Blog title:** `Higher-Order Functions in Real JavaScript`

Cover:
- functions as inputs
- functions as outputs
- map/filter/reduce
- reusable behavior

## 20.4 Composition and Currying

**Blog title:** `Function Composition and Currying`

Explain:
- composition
- right-to-left composition
- pipe-style left-to-right flow
- currying
- practical use
- when abstraction becomes excessive

## 20.5 Memoization and Lazy Evaluation

**Blog title:** `Memoization, Generators and Lazy Work`

Cover:
- memoization
- cache-key correctness
- generators
- lazy iteration
- trade-offs

## 20.6 Debounce and Throttle

**Blog title:** `Debounce vs Throttle in Browser JavaScript`

Compare:
- debounce
- throttle
- search inputs
- scroll/resize handlers
- rate limiting UI work

---

# 21 — Testing

## 21.1 Testing Fundamentals

**Blog title:** `Why We Test JavaScript`

Cover:
- confidence
- regression prevention
- test cases
- test isolation
- tests as evidence rather than mathematical proof

## 21.2 Unit, Integration and End-to-End

**Blog title:** `JavaScript Testing Levels Explained`

Compare:
- unit tests
- integration tests
- end-to-end tests
- strengths
- limitations

## 21.3 Test Design

**Blog title:** `How to Write Useful Tests`

Cover:
- arrange/act/assert
- edge cases
- failure cases
- readable assertions
- deterministic tests

## 21.4 Mocking and Test Doubles

**Blog title:** `Mocks, Stubs and Fakes in JavaScript`

Explain:
- test doubles
- fake dependencies
- network mocking
- clock/randomness injection
- avoiding over-mocking

---

# 22 — TypeScript

## 22.1 TypeScript Mental Model

**Blog title:** `What TypeScript Adds to JavaScript`

Cover:
- superset relationship
- static checking
- compilation/transformation
- erased types
- runtime JavaScript

## 22.2 Types and Interfaces

**Blog title:** `TypeScript Types, Interfaces and Structural Typing`

Cover:
- primitive types
- object types
- unions
- intersections
- interfaces
- structural typing

## 22.3 Unknown, Any and Narrowing

**Blog title:** `unknown vs any and Why Runtime Validation Still Matters`

Cover:
- `any`
- `unknown`
- narrowing
- type guards
- external data
- runtime validation

## 22.4 Assertions and satisfies

**Blog title:** `Type Assertions Do Not Change Runtime Values`

Explain:
- assertions
- `as`
- non-null assertion
- `satisfies`
- compile-time only behavior

## 22.5 Classes and Access Modifiers

**Blog title:** `TypeScript Classes and Runtime vs Compile-Time Privacy`

Compare:
- `private`
- `protected`
- `public`
- `#private`
- `implements`

## 22.6 Declaration Files and Generics

**Blog title:** `How TypeScript Understands JavaScript Libraries`

Cover:
- `.d.ts`
- declaration files
- generics
- constraints
- type inference
- runtime does not appear because of declarations

---

# 23 — Design Patterns

Write one blog per pattern group.

## 23.1 Creational

- Factory
- Builder
- Singleton

**Blog title:** `When a Creational Pattern Solves a Real Problem`

## 23.2 Structural

- Adapter
- Decorator
- Facade
- Composite

**Blog title:** `Structural Patterns: Changing How Objects Fit Together`

## 23.3 Behavioral

- Strategy
- Observer
- Command
- State
- Iterator

**Blog title:** `Behavioral Patterns: Separating Decisions From Execution`

For every pattern:
- problem
- naive solution
- pattern solution
- trade-offs
- code
- when NOT to use it

---

# 24 — SOLID

Write one article per principle.

## 24.1 SRP

**Blog title:** `Single Responsibility Principle in JavaScript`

Explain one coherent responsibility/reason to change and show a before/after refactor.

## 24.2 OCP

**Blog title:** `Open/Closed Principle Without Overengineering`

Show extension-friendly design and explain the trade-off.

## 24.3 LSP

**Blog title:** `Liskov Substitution Principle With a JavaScript Example`

Focus on behavioral substitutability, not inheritance syntax alone.

## 24.4 ISP

**Blog title:** `Interface Segregation in JavaScript and TypeScript`

Explain smaller consumer-focused contracts/shapes.

## 24.5 DIP

**Blog title:** `Dependency Inversion and Dependency Injection`

Explain:
- high-level policy
- low-level details
- dependency direction
- injection
- testability

## 24.6 SOLID Trade-offs

**Blog title:** `Why SOLID Is Guidance, Not a Law`

Discuss:
- over-abstraction
- composition
- project size
- change frequency
- maintainability

---

# 25 — Architecture

## 25.1 Requirements and Quality Attributes

**Blog title:** `Architecture Starts With Requirements`

Cover:
- functional requirements
- quality attributes
- performance
- reliability
- security
- maintainability
- scalability

## 25.2 Modular Monolith

**Blog title:** `Why a Modular Monolith Is Often a Good Starting Point`

Explain:
- modules
- boundaries
- dependency direction
- deployment simplicity
- migration options

## 25.3 Clean / Hexagonal / Onion Architecture

**Blog title:** `Dependency Direction in Clean, Hexagonal and Onion Architecture`

Compare the terminology while focusing on the shared principle: domain/policy should not be tightly coupled to infrastructure details.

## 25.4 DDD and Bounded Contexts

**Blog title:** `Bounded Contexts and Domain Boundaries`

Explain:
- domain
- subdomain
- bounded context
- language boundaries
- why one giant model becomes difficult

## 25.5 Repositories and Services

**Blog title:** `What Should a Repository or Service Actually Do?`

Explain:
- repository responsibility
- service/application logic
- avoiding generic CRUD dumping grounds
- dependency direction

## 25.6 Transactions and Outbox

**Blog title:** `Transactions and the Outbox Pattern`

Explain:
- atomicity
- transaction boundaries
- database + event reliability
- outbox pattern
- eventual processing

## 25.7 Queues and Distributed Systems

**Blog title:** `Queues, Eventual Consistency and Distributed-System Trade-offs`

Cover:
- asynchronous processing
- eventual consistency
- retries
- duplicate messages
- idempotency
- failure modes

## 25.8 CAP and Reliability

**Blog title:** `CAP, Timeouts, Retries and Idempotency`

Explain the trade-offs without reducing CAP to an oversimplified slogan.

## 25.9 Observability

**Blog title:** `Logs, Metrics, Traces and SLOs`

Compare:
- logs
- metrics
- traces
- SLI
- SLO
- SLA

## 25.10 Architecture Decision Records

**Blog title:** `How to Record an Architecture Decision`

Include:
- context
- decision
- alternatives
- trade-offs
- consequences

---

# 26 — Practice

Every practice phase should include a blog after the learner solves a group of problems.

## 26.1 Debugging Blog

**Title:** `The Five JavaScript Bugs I Made and How I Fixed Them`

For each bug:
- original code
- symptom
- root cause
- debugging process
- fixed code
- lesson

## 26.2 Problem-Solving Blog

**Title:** `How I Solved a JavaScript Problem Without Looking at the Solution`

Include:
- problem
- first idea
- failed attempt
- improved approach
- final solution
- complexity
- edge cases

## 26.3 Output Prediction Blog

**Title:** `10 JavaScript Outputs That Tested My Mental Model`

For every example:
- code
- prediction
- actual output
- explanation

---

# 27 — Projects

Projects require **three writing stages**.

## 27.1 Before Coding — Design Blog

**Title:** `Planning My JavaScript Project Before Writing Code`

Include:
- problem statement
- target user
- features
- user stories
- inputs/outputs
- data model
- UI states if browser-based
- edge cases
- MVP
- future improvements

## 27.2 During Coding — Engineering Journal

**Title:** `What I Learned While Building My JavaScript Project`

Include:
- important decisions
- bugs
- debugging
- refactoring
- trade-offs
- APIs used
- architecture decisions

## 27.3 After Coding — Case Study

**Title:** `How I Built [Project Name] With JavaScript`

Include:
- problem
- solution
- architecture
- important code decisions
- challenges
- performance
- accessibility where relevant
- security considerations
- testing
- what would be improved next

## 27.4 Final Mastery Blog

**Title:** `My Journey From JavaScript Beginner to Confident Builder`

Include:
- what you knew before
- biggest concepts
- hardest concepts
- projects built
- bugs fixed
- concepts you can teach
- concepts still weak
- how your problem-solving changed
- next learning goal

---

# 🏆 Mastery Rule

A topic is **not complete** just because the learner watched a lesson or read the README.

Mark a topic complete only when all are true:

```text
[ ] I understand the definition.
[ ] I know why the concept exists.
[ ] I can write a basic example from memory.
[ ] I can modify the example.
[ ] I can predict an output.
[ ] I can debug a broken example.
[ ] I can explain a common mistake.
[ ] I can compare it with a related concept.
[ ] I wrote the blog in my own words.
[ ] I can teach it without reading the blog.
[ ] I can use it in a new problem.
```

## The golden rule

> **Learn → Code → Write → Debug → Teach → Build → Move on.**

The blog is not extra homework. **The blog is one of the learning mechanisms.**
