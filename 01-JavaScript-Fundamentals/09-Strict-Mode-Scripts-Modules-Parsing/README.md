# Strict Mode, Scripts, Modules, and the JavaScript Execution Pipeline

## 1. Purpose
This chapter connects the source-code fundamentals to the runtime.

You will learn how JavaScript source is interpreted as a script or module, how strict mode affects semantics, and what happens between source text and execution.

## 2. Script vs Module
JavaScript source can be evaluated as a classic script or as an ECMAScript module.

Classic script:

```html
<script src="app.js"></script>
```

Module:

```html
<script type="module" src="app.js"></script>
```

Modules have their own module scope and are strict by default.

## 3. Module Syntax
A module can export:

```js
export const answer = 42;
```

and import:

```js
import { answer } from "./answer.js";
```

Import/export syntax is valid module syntax, not ordinary classic-script syntax.

## 4. Module Scope
Top-level declarations in a module do not become properties of the global object merely because they are top-level.

This provides stronger boundaries between files.

## 5. Strict Mode
Strict mode is enabled with a directive:

```js
"use strict";
```

It changes selected language semantics and turns certain formerly tolerated mistakes into errors.

## 6. Modules Are Strict
You do not need to write:

```js
"use strict";
```

inside an ECMAScript module to activate strict mode.

Modules are strict code automatically.

## 7. Accidental Globals
In sloppy script code, assigning to an undeclared identifier historically could create a global property.

Strict mode rejects this:

```js
"use strict";

count = 10; // ReferenceError
```

Declare the binding explicitly:

```js
let count = 10;
```

## 8. `this` in Strict Functions
Strict mode changes the `this` value supplied to ordinary function calls.

```js
"use strict";

function showThis() {
  return this;
}

console.log(showThis()); // undefined
```

In non-strict ordinary function calls, `this` historically gets different handling depending on the environment.

## 9. Strict `this` Prevents Silent Substitution
Strict mode avoids automatically substituting a global object for an absent `this` value in ordinary function calls.

This helps expose mistakes rather than silently redirecting them to global state.

## 10. Assignment to Read-Only Properties
Strict mode can turn certain property-write failures into errors.

For example, attempting to assign to a non-writable property can throw instead of silently failing.

This is one reason strict mode improves error detection.

## 11. Deleting Unqualified Identifiers
Strict mode rejects certain invalid `delete` operations.

```js
"use strict";

let value = 10;
delete value; // SyntaxError
```

The exact legality depends on the syntactic form.

## 12. Duplicate Parameter Names
Strict-mode functions reject duplicate parameter names.

```js
"use strict";

function add(a, a) {}
```

This produces a syntax error.

Clear parameter lists make functions easier to reason about anyway.

## 13. Strict Mode and `eval`
Strict mode changes the behavior and scope effects of `eval`.

Direct `eval` in strict code executes in a restricted environment rather than introducing bindings into the surrounding variable environment in the same way as sloppy code.

Avoid dynamic `eval` in ordinary application code unless you have a strong reason.

## 14. Why Avoid `eval`?
Dynamic evaluation can:

- make code difficult to analyze
- complicate security review
- prevent optimization
- create injection risks when input is untrusted

Prefer structured data and explicit dispatch mechanisms.

## 15. Parsing
Before JavaScript can execute a program, the source must be recognized according to its grammar.

A simplified pipeline is:

```text
Source text
   ↓
Lexical analysis
   ↓
Parsing
   ↓
Program structure
   ↓
Execution / compilation
```

Actual engines implement sophisticated internal pipelines.

## 16. Lexical Analysis
The lexical grammar identifies tokens and other lexical elements.

Examples include:

- identifiers
- keywords
- numeric literals
- string literals
- punctuators
- regular-expression literals in appropriate grammar contexts

Whitespace and comments also participate in lexical processing.

## 17. Parsing
Parsing determines whether tokens form valid JavaScript according to the grammar and constructs the program's syntactic structure.

If the grammar is violated, a syntax error occurs.

## 18. Syntax Error

```js
const = 10;
```

This source cannot be parsed as a valid declaration.

The program fails before normal execution of that invalid source.

## 19. Runtime Error

```js
const user = null;
user.name;
```

The source is syntactically valid, but execution attempts an invalid property access.

This produces a runtime `TypeError`.

## 20. Logical Error

```js
function add(a, b) {
  return a - b;
}
```

The code can parse and run but may implement the wrong business rule.

Logical errors require reasoning and testing rather than merely syntax correction.

## 21. Compilation
JavaScript engines may compile source into internal executable representations or machine code.

The simplistic statement “JavaScript is interpreted” is incomplete.

Modern engines use parsing, interpretation, baseline compilation, optimization, deoptimization, and other techniques depending on engine and execution state.

## 22. JIT Compilation
Just-in-time compilation can optimize frequently executed code while the program is running.

The engine observes execution and may produce optimized machine code for hot paths.

Optimization is an engine implementation detail, not something application code should usually control directly.

## 23. Deoptimization
Optimized code may be discarded or changed when runtime assumptions no longer hold.

For example, an engine may optimize a code path based on observed types and later encounter different behavior.

This is one reason simplistic “JavaScript compiles once” explanations are inaccurate.

## 24. Runtime Environment
JavaScript itself defines the language.

A runtime environment provides additional host capabilities.

Examples:

```text
Browser → DOM, fetch, timers, storage, Web APIs
Node.js → filesystem, process, streams, server APIs
```

These host APIs are not all part of ECMAScript itself.

## 25. ECMAScript vs JavaScript
ECMAScript is the standardized language specification.

JavaScript is the widely used language implementation/ecosystem based on ECMAScript plus host/runtime APIs.

The distinction matters when deciding whether a feature is language-level or environment-provided.

## 26. TC39
TC39 is the technical committee responsible for evolving ECMAScript.

It develops and standardizes language proposals through stages.

Developers should understand that proposed features are not automatically stable language features.

## 27. Proposal Stages
ECMAScript proposals traditionally move through stages such as:

```text
Stage 0 → Stage 1 → Stage 2 → Stage 3 → Stage 4
```

Stage 4 indicates readiness for inclusion in the ECMAScript standard under the current process.

Tooling may support proposals before final standardization, but production use should consider compatibility and stability.

## 28. Engine Examples
Popular JavaScript engines include:

- V8
- SpiderMonkey
- JavaScriptCore
- Chakra historically

Browsers and server runtimes embed engines and add host capabilities.

## 29. V8 Context
V8 powers environments such as Chromium-based browsers and Node.js.

It parses JavaScript, executes it, and uses multiple internal optimization mechanisms.

Knowing the engine name is less important than understanding that the language specification and engine implementation are different layers.

## 30. Browser Pipeline
A browser may process a page approximately as:

```text
HTML
 ↓
Parse HTML
 ↓
Discover resources
 ↓
Parse JavaScript
 ↓
Execute JavaScript
 ↓
Interact with DOM / Web APIs
 ↓
Render updates
```

Real browser pipelines are concurrent and significantly more complex.

## 31. Node.js Pipeline
A simplified Node execution path is:

```text
JavaScript source
 ↓
Node module loading
 ↓
JavaScript engine
 ↓
Node runtime APIs
 ↓
Event loop / asynchronous operations
```

Node does not provide browser globals such as `window` and `document` by default.

## 32. `globalThis`
`globalThis` is the standard way to access the global object across JavaScript environments.

In browsers:

```js
globalThis === window; // true
```

In Node.js, `globalThis` refers to the Node global object rather than a browser `window`.

## 33. Global Object vs Global Scope
The global object and global lexical environment are related but not identical concepts.

Do not assume every top-level declaration becomes a property of the global object.

Script and module semantics differ significantly here.

## 34. Classic Script Top-Level `var`
In classic browser scripts, top-level `var` declarations have special interaction with the global object.

For example:

```js
var count = 10;
```

can create a global object property in a browser classic-script context.

Top-level `let` and `const` behave differently.

## 35. Top-Level `let` and `const`

```js
let count = 10;
const limit = 20;
```

These are global lexical bindings in a classic script, not ordinary properties of the global object.

This distinction is important when studying global scope.

## 36. Module Top-Level Bindings
Module top-level declarations are scoped to the module.

They are not automatically global variables.

This is one of the major architectural benefits of modules.

## 37. Module Evaluation
A module has dependencies.

The runtime determines the module dependency structure, loads/evaluates dependencies according to module semantics, and then evaluates module code.

This enables static dependency analysis for normal `import` declarations.

## 38. Static Imports

```js
import { add } from "./math.js";
```

Static imports are part of module syntax and are analyzed as module dependencies.

They cannot normally appear inside arbitrary runtime blocks.

## 39. Dynamic Import
Dynamic import uses an expression:

```js
const module = await import("./feature.js");
```

It returns a Promise and allows loading a module at runtime.

This is useful for lazy loading and code splitting.

## 40. Module Live Bindings
ES module imports are live bindings rather than simple copies of exported variable values.

An importing module observes updates to an exported binding according to module semantics.

This is different from copying a primitive into an unrelated variable.

## 41. Circular Dependencies
Modules can depend on each other:

```text
A → B
↑   ↓
└── C
```

Circular dependencies are legal, but initialization order and access timing matter.

Poorly designed cycles can produce difficult-to-understand behavior.

## 42. Module Design
Good modules usually expose a small public API and keep implementation details private.

Think:

```text
Private implementation
        ↓
Public exports
        ↓
Consumers
```

This is an important foundation for architecture.

## 43. CommonJS
Node.js historically used CommonJS extensively.

Example:

```js
const fs = require("node:fs");

module.exports = {
  readFile,
};
```

CommonJS and ESM have different loading and evaluation models.

## 44. ESM vs CommonJS

```text
ESM:
import / export
static module syntax
live bindings
module scope

CommonJS:
require()
module.exports / exports
historically synchronous loading model
```

Modern Node.js supports both under appropriate configuration.

## 45. Package Configuration
Node.js package behavior can depend on `package.json`, including the `type` field and file extensions.

For example, projects can configure `.js` files to be interpreted as ESM or CommonJS according to package settings.

Always follow the project's actual module configuration rather than assuming from file extension alone.

## 46. `.mjs` and `.cjs`
Node.js provides explicit extensions:

```text
.mjs → ECMAScript module
.cjs → CommonJS
```

These can make module intent explicit regardless of some package-level configuration.

## 47. Browser Modules
Browser modules support:

```html
<script type="module" src="main.js"></script>
```

They use ESM syntax and strict semantics.

Module scripts also have different loading behavior from classic scripts.

## 48. Module CORS
Browser module loading follows fetch and CORS rules for cross-origin resources.

A module cannot simply bypass browser origin security because it uses `import`.

Configure servers and origins correctly.

## 49. `defer` and Module Scripts
Module scripts are deferred by default in important respects: they are fetched without blocking HTML parsing in the same way as classic blocking scripts and execute after parsing, subject to module dependency/loading semantics.

Do not treat classic scripts and module scripts as identical loading mechanisms.

## 50. Top-Level `await`
ES modules can use top-level `await` in supported environments.

```js
const data = await fetchData();
```

This can make module evaluation asynchronous.

Dependent modules may wait according to module evaluation semantics.

## 51. REPL
A REPL means:

```text
Read
Evaluate
Print
Loop
```

Node.js provides a REPL for interactive JavaScript experimentation.

It is useful for testing language behavior quickly.

## 52. Console
Browser and Node environments provide console facilities.

```js
console.log("Hello");
console.error("Something failed");
console.table([{ id: 1, name: "Ravi" }]);
```

Console behavior is host-provided, not a core ECMAScript language statement.

## 53. Source Maps
Production code may be transformed or bundled.

Source maps help developer tools map generated code back to original source.

They are valuable for debugging but can also expose source information if published carelessly.

## 54. Bundlers
Tools such as bundlers transform module graphs into deployable assets.

They can perform:

- bundling
- tree shaking
- code splitting
- minification
- asset processing

These are tooling steps, not ECMAScript language semantics.

## 55. Transpilation
A transpiler converts source code from one syntax/language level to another.

For example, TypeScript can be transformed into JavaScript.

A transpiler does not change the fundamental ECMAScript specification; it generates code that can run in a target environment.

## 56. Polyfills
A polyfill provides runtime behavior for APIs missing from an environment.

A syntax transform and a polyfill are different concepts.

```text
Transpilation → changes source syntax
Polyfill       → supplies runtime API behavior
```

## 57. Feature Detection
Instead of assuming an API exists:

```js
if ("geolocation" in navigator) {
  // supported
}
```

Use appropriate feature detection and compatibility strategies.

## 58. Environment Detection
Avoid brittle user-agent assumptions when capability detection is available.

Ask what the environment can do rather than what you think it is based on a string.

## 59. Parsing vs Execution
Keep these concepts separate:

```text
Parsing asks:
“Is this valid according to grammar, and what structure does it have?”

Execution asks:
“What does this valid program do?”
```

This distinction is fundamental to debugging.

## 60. Compile-Time-Like Failures vs Runtime
JavaScript does not have one universal “compile-time” category matching statically compiled languages.

Some syntax/early errors prevent evaluation, while many type/value problems are discovered only during runtime.

Use precise terms such as syntax error, early error, runtime error, and logical error where appropriate.

## 61. Early Errors
Some invalid program forms are rejected during parsing or early validation before normal execution.

Duplicate declarations in certain scopes and invalid module syntax are examples of situations where errors can be detected before runtime evaluation.

## 62. Execution Context Preview
When code begins evaluating, JavaScript operates through execution contexts.

Later chapters will study:

- global execution context
- function execution contexts
- module execution context
- lexical environments
- environment records
- execution stack

This chapter only establishes the pipeline.

## 63. Call Stack Preview
Function calls create execution state that is tracked by the runtime.

A simplified model is:

```text
main
 ↓
functionA
 ↓
functionB
```

When `functionB` returns, execution resumes in `functionA`.

## 64. Host APIs
Browser JavaScript can call host APIs such as:

```js
fetch(...)
document.querySelector(...)
setTimeout(...)
```

These are not all ECMAScript language features.

The host provides them around the JavaScript engine.

## 65. Event Loop Preview
Asynchronous environments use mechanisms that allow callbacks and promise reactions to be scheduled around JavaScript execution.

A simplified model:

```text
JavaScript execution
       ↓
host operation
       ↓
completion / scheduling
       ↓
queue
       ↓
event-loop processing
       ↓
JavaScript callback
```

The full event loop model belongs to the asynchronous JavaScript chapter.

## 66. Why Environment Matters
This works in a browser:

```js
document.body;
```

but not in normal Node.js:

```js
document.body; // ReferenceError
```

The JavaScript language is the same, but the host environment differs.

## 67. Strict Mode and Modules
A useful summary:

```text
Classic script → may be sloppy or strict
Module        → strict automatically
```

This affects semantics such as `this`, assignment errors, and some syntax restrictions.

## 68. Best Practices

- Prefer modules for modern application architecture.
- Avoid accidental globals.
- Use strict semantics.
- Understand your runtime environment.
- Avoid dynamic `eval` unless necessary.
- Know whether code is ESM or CommonJS in Node.
- Use feature detection where appropriate.
- Treat syntax, runtime, and logical errors differently.
- Use tooling without confusing tooling behavior with language semantics.

## 69. Practice — Recall

1. What is ECMAScript?
2. What is JavaScript?
3. What is a JavaScript engine?
4. What is strict mode?
5. Why are modules strict?
6. What is a classic script?
7. What is an ESM module?
8. What is CommonJS?
9. What is parsing?
10. What is JIT compilation?

## 70. Practice — Understand

11. Why does Node.js not provide `window` by default?
12. Why is `globalThis` useful?
13. Why do modules improve scope boundaries?
14. Why is `eval` discouraged?
15. Why is “JavaScript is interpreted” incomplete?
16. Why are syntax and runtime errors different?
17. What does a bundler do?
18. What is a polyfill?
19. What is a source map?
20. Why does module loading involve the host environment in browsers?

## 71. Practice — Predict
What happens?

```js
"use strict";

function test() {
  return this;
}

console.log(test());
```

Explain why strict mode changes the ordinary function-call `this` behavior.

## 72. Practice — Debug
Explain why this fails as a module but may look valid as a classic script:

```js
export const value = 10;
```

Then explain how to load it correctly in a browser.

## 73. Practice — Design
Design a small project with:

```text
src/
  main.js
  math.js
  users.js
```

Use ESM imports/exports and keep each module focused on one responsibility.

## 74. Interview Questions

- What is ECMAScript?
- What does TC39 do?
- What is a JavaScript engine?
- What is JIT compilation?
- What is strict mode?
- Why are modules strict?
- Script vs module?
- ESM vs CommonJS?
- What is `globalThis`?
- Why is `window` unavailable in Node.js?
- What is parsing?
- Syntax vs runtime vs logical error?
- What is a source map?
- What is a bundler?
- What is a polyfill?
- What is dynamic import?
- What are live bindings?
- What are circular dependencies?
- What is top-level `await`?

## 75. Teach-Back Challenge
Explain this layered model:

```text
ECMAScript language
       ↓
JavaScript engine
       ↓
Runtime / host environment
       ↓
Browser or Node.js APIs
       ↓
Your application
```

Then explain which layer provides `Promise`, `document`, `fetch`, `process`, and `setTimeout` in common environments.

## 76. Mini Project
Build a **Runtime Inspector** that displays:

- whether code is running in a browser or Node environment
- availability of `globalThis`
- availability of `window`
- availability of `document`
- availability of `fetch`
- module type used by the project

Do not use user-agent strings when direct capability checks are possible.

## 77. Debugging Checklist

When JavaScript behaves unexpectedly:

1. Is the source syntactically valid?
2. Is it a script or module?
3. Is strict mode active?
4. Which runtime is executing it?
5. Which host APIs are available?
6. Is the error syntax, runtime, or logical?
7. Has tooling transformed the source?
8. Is a source map available?
9. What does the actual stack trace say?
10. Can the behavior be reproduced in a small example?

## 78. Mastery Checklist

- [ ] Explain ECMAScript vs JavaScript.
- [ ] Explain engines.
- [ ] Explain parsing.
- [ ] Explain compilation and JIT at a high level.
- [ ] Explain strict mode.
- [ ] Explain script vs module.
- [ ] Explain ESM.
- [ ] Explain CommonJS.
- [ ] Explain module scope.
- [ ] Explain `globalThis`.
- [ ] Explain host APIs.
- [ ] Explain browser vs Node runtime differences.
- [ ] Explain syntax/runtime/logical errors.
- [ ] Explain bundlers and transpilers.
- [ ] Explain polyfills.
- [ ] Explain source maps.
- [ ] Explain dynamic import.
- [ ] Explain live bindings.
- [ ] Recognize circular dependencies.
- [ ] Explain the execution pipeline at a high level.

## Final Mental Model

```text
SOURCE CODE
    ↓
LEXICAL GRAMMAR
    ↓
PARSER
    ↓
PROGRAM STRUCTURE
    ↓
JAVASCRIPT ENGINE
    ↓
RUNTIME / HOST ENVIRONMENT
    ↓
EXECUTION
    ↓
VALUES + SIDE EFFECTS
```

Mastering this layered model prevents a common beginner mistake: treating every API, engine optimization, browser feature, and language rule as if they were the same thing.
