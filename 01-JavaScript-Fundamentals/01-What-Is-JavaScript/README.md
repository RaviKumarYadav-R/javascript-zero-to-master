# What Is JavaScript?

## 1. Precise Definition

JavaScript is a high-level, dynamically typed programming language standardized by ECMA International as ECMAScript.

It is designed around values, objects, functions, expressions, statements, and a runtime execution model.

JavaScript itself defines the language rules; environments such as browsers and Node.js provide additional host APIs.

That distinction is fundamental.

The language gives us things such as objects, functions, promises, arrays, operators, and control flow.

A browser gives us things such as `document`, `window`, DOM APIs, timers, and `fetch`.

Node.js gives us server-side APIs such as filesystem, networking, processes, and streams.

Therefore, JavaScript and a JavaScript runtime are related but are not the same thing.

## 2. Why Does JavaScript Exist?

The original goal of JavaScript was to make web pages interactive.

Static HTML could describe document structure.

CSS could describe presentation.

A scripting language could respond to user actions and change page behavior.

Modern JavaScript has grown far beyond that original browser role.

It can power browser applications, servers, command-line programs, desktop applications, mobile applications, automation, tooling, and more.

The core idea remains the same: execute instructions against values and interact with a host environment when APIs are available.

## 3. JavaScript vs ECMAScript

ECMAScript is the standardized language specification.

JavaScript is the name commonly used for implementations of that language plus surrounding platform behavior.

Think of ECMAScript as the language contract.

A JavaScript engine implements that contract.

Different engines can implement the same language specification.

Examples include V8, SpiderMonkey, and JavaScriptCore.

The specification does not define the DOM.

The specification does not define `document.querySelector()`.

Those belong to host/platform APIs.

This is why JavaScript can exist outside browsers.

## 4. JavaScript Engines

A JavaScript engine executes JavaScript source code.

V8 is used by Chrome and Node.js.

SpiderMonkey is used by Firefox.

JavaScriptCore is used by WebKit-based environments such as Safari.

An engine parses source code.

It determines whether the source is syntactically valid.

It creates internal representations needed for execution.

Modern engines also optimize frequently executed code.

JIT stands for Just-In-Time compilation.

JIT optimization can compile hot code into more efficient machine-level instructions.

The exact implementation strategy is engine-specific.

Do not reduce an engine to the inaccurate statement that JavaScript is simply interpreted line by line.

Modern engines use parsing, bytecode or intermediate representations, optimization, deoptimization, and machine-code execution.

## 5. Browser Runtime

A browser embeds a JavaScript engine.

The browser also provides host APIs.

For example, `document` represents the DOM interface exposed to JavaScript.

`window` represents the browser window/global environment in classic browser contexts.

`fetch()` provides a web networking API.

`setTimeout()` provides timer scheduling.

Event APIs allow JavaScript to react to user and browser events.

The engine executes JavaScript.

The browser coordinates JavaScript with rendering, networking, user input, storage, and other platform capabilities.

This is why saying “JavaScript is the browser” is incorrect.

## 6. Node.js Runtime

Node.js embeds the V8 JavaScript engine.

Node adds server and operating-system-oriented APIs.

For example, Node provides filesystem APIs.

Node provides networking APIs.

Node provides process information.

Node provides streams and other runtime facilities.

A Node program does not automatically have a browser `window` or DOM.

This is one reason browser JavaScript and Node.js JavaScript feel different even though both execute JavaScript.

## 7. First Program

```js
console.log("Hello, JavaScript!");
```

`console` is not the ECMAScript language itself.

It is a host-provided debugging/logging API.

The exact console implementation depends on the runtime.

The string literal is a JavaScript value.

The function call expression invokes `log`.

The statement asks the host environment to display the value.

## 8. Statements and Expressions

An expression produces a value.

Examples include `2 + 3`, `user.name`, and `add(2, 3)`.

A statement performs an action or controls execution.

Examples include declarations, `if` statements, loops, and `return` statements.

Some constructs can be understood as expressions even when they look like complete lines of code.

The distinction becomes important with functions, conditionals, arrow functions, and operators.

For example, the ternary operator is an expression.

```js
const message = age >= 18 ? "Adult" : "Minor";
```

The ternary produces a value that is assigned to `message`.

## 9. Source Code Execution

A simplified execution model is useful for learning.

```text
Source code
    ↓
Parse source
    ↓
Validate syntax
    ↓
Create executable representation
    ↓
Execute code
    ↓
Interact with runtime APIs
    ↓
Produce values / side effects
```

This is a teaching model rather than a complete engine implementation diagram.

Real engines perform many additional optimizations.

Syntax errors can prevent execution of a script or module before normal execution proceeds.

Runtime errors can occur while executing valid syntax.

Logic errors can produce incorrect results without throwing an exception.

Learning these three categories is essential for debugging.

## 10. JavaScript Is Dynamically Typed

JavaScript variables do not require a declared static type such as `int` or `string`.

The values themselves have types.

```js
let value = 10;
value = "hello";
```

The binding can later refer to a string value.

This does not mean JavaScript has no types.

JavaScript has a defined type system.

It includes primitive types and the Object type.

Dynamic typing means type checking of values occurs at runtime rather than requiring every variable declaration to specify a compile-time type.

## 11. JavaScript Is Prototype-Based

Objects can inherit behavior through prototype chains.

Classes exist in modern JavaScript.

However, JavaScript classes are built on the language's prototype-based object model.

```js
const user = {
  greet() {
    return "Hello";
  }
};
```

Objects can delegate property lookup through prototypes.

This topic is covered deeply later in the Advanced JavaScript and OOP phases.

## 12. Functions Are First-Class Values

A function can be stored in a variable.

A function can be passed to another function.

A function can be returned from another function.

```js
const add = (a, b) => a + b;
```

Here `add` refers to a function value.

This capability is the foundation for callbacks and higher-order functions.

It also enables functional programming techniques.

Closures make functions even more powerful because a function can retain access to its lexical environment.

## 13. JavaScript Is Single-Threaded at the Language Execution Level

A JavaScript execution context normally executes one piece of JavaScript at a time on a given agent.

This does not mean an entire runtime can perform only one operation.

Browsers and Node.js provide facilities for asynchronous operations.

Networking, timers, file operations, and other work can be coordinated by the host.

When their results are ready, callbacks and promise reactions can be scheduled for JavaScript execution.

The event loop is the major topic used to understand this behavior.

Do not confuse concurrency with parallel JavaScript execution on one main thread.

Workers can provide separate execution contexts when parallel computation is required.

## 14. JavaScript in the Browser

A browser can load JavaScript using a script element.

```html
<script src="app.js"></script>
```

The browser fetches the resource.

It parses the JavaScript.

The JavaScript executes according to script/module rules.

The program can interact with the DOM when the document and APIs are available.

For modern applications, modules are commonly used.

```html
<script type="module" src="app.js"></script>
```

Module code has module scope and uses `import` and `export`.

## 15. JavaScript Outside the Browser

JavaScript does not require HTML.

You can execute JavaScript with Node.js.

```js
console.log("Running outside a browser");
```

This program does not need a web page.

It uses a runtime that provides `console` and other host facilities.

This is why learning the core language before learning DOM APIs is valuable.

The core language transfers between environments.

## 16. Strict Mode

Strict mode enables stricter language behavior.

A script can opt into strict mode with:

```js
"use strict";
```

A function can also contain a strict-mode directive.

Modules are always strict mode code.

Strict mode helps expose certain programming mistakes.

For example, accidental assignment to an undeclared identifier throws rather than silently creating a global in non-strict legacy behavior.

```js
"use strict";

count = 10; // ReferenceError
```

Strict mode is not a security boundary.

It is a language semantics feature.

## 17. JavaScript Program Mental Model

Use this mental model while studying:

```text
JavaScript language
        │
        ├── values
        ├── expressions
        ├── statements
        ├── functions
        ├── objects
        ├── control flow
        └── execution semantics

Runtime environment
        │
        ├── browser APIs
        ├── Node.js APIs
        ├── timers
        ├── networking
        └── platform services
```

The language provides the computational rules.

The runtime provides capabilities outside the core language.

This distinction prevents many beginner misconceptions.

## 18. Common Misconceptions

**Misconception:** JavaScript is the same thing as ECMAScript.

**Correction:** ECMAScript specifies the language; JavaScript is the common name for implementations and the broader ecosystem around it.

**Misconception:** JavaScript only runs in browsers.

**Correction:** JavaScript runs in many environments, including Node.js and other engines/runtimes.

**Misconception:** JavaScript is interpreted line by line.

**Correction:** Modern engines use sophisticated parsing, execution, optimization, and compilation strategies.

**Misconception:** The DOM is part of JavaScript itself.

**Correction:** The DOM is a web platform API exposed by browsers.

**Misconception:** `console.log` is an ECMAScript keyword.

**Correction:** `console` is a host-provided object/API.

**Misconception:** Dynamic typing means values have no types.

**Correction:** Values have types; variable bindings do not require fixed declared types in JavaScript.

**Misconception:** `const` makes an object immutable.

**Correction:** `const` prevents reassignment of the binding; object contents can still be mutated.

## 19. Debugging Checklist

When JavaScript does not behave as expected, ask:

1. Is the source syntactically valid?
2. Did the correct file load?
3. Is the code actually executing?
4. What values enter the operation?
5. What are their types?
6. Is coercion occurring?
7. What branch was selected?
8. How many loop iterations occurred?
9. What function was called?
10. What does `this` refer to?
11. Is the value `undefined` or `null`?
12. Did an exception interrupt execution?
13. Is a promise rejection being handled?
14. Is the runtime API available in this environment?
15. Is the bug in JavaScript or in the host API usage?

## 20. Output Prediction Practice

Predict before running:

```js
const a = 10;
const b = "10";

console.log(typeof a);
console.log(typeof b);
console.log(a + b);
console.log(a === b);
```

The key lesson is not memorizing the output.

Explain why each result occurs using value types and operator semantics.

## 21. Real-World Example

Suppose a shopping application displays a cart total.

JavaScript can calculate the total.

It can validate user input.

It can respond to button clicks.

It can update the DOM.

It can request product data from an API.

It can handle asynchronous responses.

It can store preferences in browser storage.

It can manage application state.

It can also run backend code in Node.js.

The same language can therefore participate across multiple layers of an application.

## 22. What You Must Know Before Moving On

You should be able to define JavaScript in your own words.

You should distinguish ECMAScript from browser APIs.

You should explain what a JavaScript engine does.

You should explain why Node.js can run JavaScript without a browser page.

You should distinguish statements from expressions.

You should explain dynamic typing.

You should explain why modern JavaScript is not accurately described as simple line-by-line interpretation.

You should explain the difference between JavaScript and the DOM.

You should explain why runtime environments matter.

You should explain why strict mode exists.

## 23. Teach-Back Questions

- What is JavaScript?
- What is ECMAScript?
- What is a JavaScript engine?
- What is a runtime environment?
- Why can JavaScript run outside a browser?
- What does a browser add to JavaScript?
- What does Node.js add to JavaScript?
- Is the DOM part of ECMAScript?
- What is dynamic typing?
- What does first-class function mean?
- What is strict mode?
- Why is “JavaScript is interpreted line by line” an incomplete explanation?
- What is the difference between a statement and an expression?
- What is the difference between concurrency and parallelism?

## 24. Mini Challenge

Create a file called `environment.js` that:

1. Prints a greeting.
2. Prints the type of three different values.
3. Demonstrates an expression that produces a value.
4. Demonstrates a statement.
5. Demonstrates a function stored in a variable.
6. Runs once in Node.js.
7. Explains in comments which features come from JavaScript and which come from the host runtime.

## 25. Memory Trick

Remember:

> **JavaScript = language. Engine = executes language. Runtime = engine + host capabilities.**

And:

> **Browser is a JavaScript host, not JavaScript itself.**

## 26. Mastery Checklist

- [ ] Define JavaScript precisely.
- [ ] Explain ECMAScript.
- [ ] Explain JavaScript engines.
- [ ] Explain V8 at a high level.
- [ ] Distinguish language features from host APIs.
- [ ] Explain browser runtime.
- [ ] Explain Node.js runtime.
- [ ] Distinguish statements and expressions.
- [ ] Explain dynamic typing.
- [ ] Explain first-class functions.
- [ ] Explain strict mode.
- [ ] Explain why the DOM is not the language itself.
- [ ] Explain the basic source-to-execution pipeline.
- [ ] Correct the common “interpreted line by line” misconception.
- [ ] Teach the topic without reading these notes.
