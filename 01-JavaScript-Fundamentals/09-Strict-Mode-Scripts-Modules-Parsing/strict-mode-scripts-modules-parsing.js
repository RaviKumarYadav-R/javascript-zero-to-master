//* ============================================================
//* STRICT MODE, SCRIPTS, MODULES & PARSING
//* ============================================================

//* This file is the practical companion to README.md.
//* These concepts explain how JavaScript source is interpreted,
//* how scripts differ from modules, and what strict mode changes.


//* ------------------------------------------------------------
//* 1. WHAT IS JAVASCRIPT PARSING?
//* ------------------------------------------------------------

//* Definition:
//* Parsing is the process in which a JavaScript engine reads source
//* text and analyzes its syntax so it can understand the program.

//* Simplified pipeline:
//* Source code -> tokenize -> parse -> compile/interpret -> execute
//*
//* Real engines perform many optimization and execution steps, so
//* this is a learning model rather than a complete engine pipeline.

const message = "JavaScript source code";
console.log(message);


//* ------------------------------------------------------------
//* 2. SYNTAX ERROR
//* ------------------------------------------------------------

//* A syntax error means the source cannot be parsed as valid
//* JavaScript in that context.

//* Invalid example (do NOT run):
//* const = 10;

//* Because this is a syntax error, the containing script/module
//* cannot execute normally.


//* ------------------------------------------------------------
//* 3. RUNTIME ERROR
//* ------------------------------------------------------------

//* A runtime error happens after valid source has begun executing.

function readName(user) {
  return user.name;
}

//* Calling this with null would throw at runtime:
//* readName(null);

console.log(readName({ name: "Ravi" }));


//* ------------------------------------------------------------
//* 4. SCRIPT VS MODULE
//* ------------------------------------------------------------

//* A classic browser script is loaded with:
//* <script src="app.js"></script>

//* A module is loaded with:
//* <script type="module" src="app.js"></script>

//* Modules have their own module scope and support import/export.
//* Modules are automatically strict mode.


//* ------------------------------------------------------------
//* 5. MODULE EXAMPLE
//* ------------------------------------------------------------

//* In a real module file:
//* export const appName = "Notes App";
//* export function add(a, b) {
//*   return a + b;
//* }
//*
//* Another module can use:
//* import { appName, add } from "./app.js";

//* The examples above are intentionally comments so this companion
//* file can also be executed directly as a normal script.


//* ------------------------------------------------------------
//* 6. MODULE SCOPE
//* ------------------------------------------------------------

//* Top-level variables in a JavaScript module are scoped to that
//* module rather than becoming properties of the browser's window.

//* Example concept:
//* // module-a.js
//* const secret = "module value";
//*
//* // module-b.js
//* console.log(secret); // ReferenceError: not directly available


//* ------------------------------------------------------------
//* 7. IMPORT / EXPORT ARE MODULE-ONLY SYNTAX
//* ------------------------------------------------------------

//* `import` and `export` are part of JavaScript's module syntax.
//* They cannot be used as ordinary statements in a classic script.

//* Example:
//* export const version = "1.0.0";


//* ------------------------------------------------------------
//* 8. STRICT MODE
//* ------------------------------------------------------------

//* Definition:
//* Strict mode is a restricted JavaScript execution mode that
//* changes certain language behaviors and makes some mistakes
//* throw errors instead of silently doing something surprising.

"use strict";

console.log("Strict mode is active for this script.");


//* ------------------------------------------------------------
//* 9. STRICT MODE AND UNDECLARED VARIABLES
//* ------------------------------------------------------------

//* In strict mode, assigning to an undeclared identifier throws.

//* Wrong:
//* accidentalGlobal = 100;

//* Correct:
let declaredValue = 100;
console.log(declaredValue);


//* ------------------------------------------------------------
//* 10. STRICT MODE CATCHES TYPO-STYLE ASSIGNMENTS
//* ------------------------------------------------------------

function updateScore() {
  let score = 10;

  //* Without strict mode, accidental assignments to undeclared
  //* names historically could create global properties in some
  //* non-module contexts.
  //* Strict mode prevents this behavior.

  score = 20;
  return score;
}

console.log(updateScore()); // 20


//* ------------------------------------------------------------
//* 11. STRICT MODE AND THIS IN A PLAIN FUNCTION
//* ------------------------------------------------------------

//* In a strict-mode plain function call, `this` is undefined.

function showThis() {
  return this;
}

console.log(showThis()); // undefined

//* In non-strict classic script code, a plain function's `this` can
//* be the global object depending on how it is called/context.


//* ------------------------------------------------------------
//* 12. STRICT MODE AND READ-ONLY PROPERTIES
//* ------------------------------------------------------------

const settings = Object.freeze({ theme: "dark" });

//* This assignment throws in strict mode:
//* settings.theme = "light";

console.log(settings.theme); // dark


//* ------------------------------------------------------------
//* 13. STRICT MODE AND DELETING IDENTIFIERS
//* ------------------------------------------------------------

//* Deleting a variable identifier is a syntax error in strict mode.

//* Invalid example (do NOT run):
//* let username = "Ravi";
//* delete username;


//* ------------------------------------------------------------
//* 14. STRICT MODE AND DUPLICATE PARAMETERS
//* ------------------------------------------------------------

//* Strict mode disallows duplicate parameter names.

//* Invalid example (do NOT run):
//* function add(a, a) {
//*   return a + a;
//* }

//* Use unique parameter names instead.
function addNumbers(first, second) {
  return first + second;
}

console.log(addNumbers(10, 20)); // 30


//* ------------------------------------------------------------
//* 15. STRICT MODE IS AUTOMATIC IN MODULES
//* ------------------------------------------------------------

//* You do not need to write "use strict" inside an ES module.
//* Module code is strict mode by definition.


//* ------------------------------------------------------------
//* 16. "use strict" PLACEMENT
//* ------------------------------------------------------------

//* A directive prologue is a sequence of string-literal expression
//* statements at the beginning of a script/function body.

function strictFunction() {
  "use strict";
  return "strict function";
}

console.log(strictFunction());

//* Putting "use strict" after ordinary statements does not make the
//* entire surrounding script strict mode.


//* ------------------------------------------------------------
//* 17. FUNCTION-LEVEL STRICT MODE
//* ------------------------------------------------------------

//* Strict mode can be enabled for an individual function body in a
//* classic script by placing the directive at the beginning.

function strictOnlyHere() {
  "use strict";
  return this;
}

console.log(strictOnlyHere()); // undefined


//* ------------------------------------------------------------
//* 18. SCRIPT-GLOBAL SCOPE VS MODULE SCOPE
//* ------------------------------------------------------------

//* In browsers, classic scripts and modules have different top-level
//* semantics. A top-level `var` in a classic script can interact with
//* the global object; module top-level bindings do not become global
//* object properties merely because they are top-level.

var classicLikeValue = 123;
console.log(classicLikeValue);

//* Do not assume every top-level declaration becomes `window.foo`.
//* Exact global behavior depends on the declaration and execution
//* context.


//* ------------------------------------------------------------
//* 19. TOP-LEVEL LET / CONST
//* ------------------------------------------------------------

let topLevelLet = "hello";
const topLevelConst = "world";

console.log(topLevelLet, topLevelConst);

//* In browser scripts, top-level `let` and `const` do not create
//* properties on the global object in the same way classic `var` can.


//* ------------------------------------------------------------
//* 20. PARSE-TIME VS RUNTIME
//* ------------------------------------------------------------

//* Syntax is checked before normal execution can proceed.
//* Runtime behavior happens when executable code runs.

//* Syntax error example:
//* if (true {
//*   console.log("broken");
//* }

//* Runtime error example:
//* const user = null;
//* console.log(user.name);


//* ------------------------------------------------------------
//* 21. EARLY ERRORS
//* ------------------------------------------------------------

//* JavaScript has syntax/early-error rules where code is rejected
//* before normal execution. Examples include certain duplicate
//* declarations or invalid module syntax.

//* Example:
//* let value = 1;
//* let value = 2;
//*
//* This is an early error in the same lexical scope.


//* ------------------------------------------------------------
//* 22. PARSING DOES NOT MEAN EXECUTING
//* ------------------------------------------------------------

//* Reading/parsing source is different from executing its statements.

function expensiveCalculation() {
  console.log("This function executes only when called.");
  return 42;
}

console.log("Function declaration has been processed.");
console.log(expensiveCalculation());


//* ------------------------------------------------------------
//* 23. SCRIPT LOADING ORDER
//* ------------------------------------------------------------

//* Classic scripts can execute according to their placement/loading
//* attributes. `defer` and `async` change loading/execution behavior.

//* Examples:
//* <script src="app.js"></script>
//* <script defer src="app.js"></script>
//* <script async src="analytics.js"></script>

//* General idea:
//* - defer: download while parsing; execute after parsing, preserving
//*   order among deferred scripts.
//* - async: download while parsing; execute when ready, so order among
//*   async scripts should not be relied upon.


//* ------------------------------------------------------------
//* 24. MODULE SCRIPT LOADING
//* ------------------------------------------------------------

//* Browser module scripts are deferred by default.
//* Module dependency loading follows the module graph.

//* Example HTML:
//* <script type="module" src="main.js"></script>


//* ------------------------------------------------------------
//* 25. MODULE DEPENDENCY GRAPH
//* ------------------------------------------------------------

//* Imagine:
//*
//* main.js
//*   -> auth.js
//*   -> api.js
//*        -> config.js
//*
//* The module system resolves dependencies and evaluates modules
//* according to the module graph and language/runtime rules.


//* ------------------------------------------------------------
//* 26. LIVE IMPORT BINDINGS
//* ------------------------------------------------------------

//* ES module imports are bindings to exported values, rather than
//* ordinary copied local variables.

//* Example concept:
//* // counter.js
//* export let count = 0;
//* export function increment() {
//*   count++;
//* }
//*
//* // main.js
//* import { count, increment } from "./counter.js";
//* console.log(count); // 0
//* increment();
//* console.log(count); // 1


//* ------------------------------------------------------------
//* 27. DEFAULT EXPORT
//* ------------------------------------------------------------

//* A module can have one default export.

//* Example:
//* // user.js
//* export default function createUser(name) {
//*   return { name };
//* }
//*
//* // main.js
//* import createUser from "./user.js";


//* ------------------------------------------------------------
//* 28. NAMED EXPORT
//* ------------------------------------------------------------

//* A module can have multiple named exports.

//* Example:
//* export const API_URL = "https://example.com";
//* export function fetchUsers() {}


//* ------------------------------------------------------------
//* 29. RE-EXPORTING
//* ------------------------------------------------------------

//* A module can re-export members from another module.

//* Example:
//* export { createUser } from "./user.js";
//* export { API_URL } from "./config.js";

//* This is often used to create a clean public API for a folder/package.


//* ------------------------------------------------------------
//* 30. DYNAMIC IMPORT
//* ------------------------------------------------------------

//* `import()` loads a module dynamically and returns a Promise.

async function loadFeature() {
  //* Uncomment in a suitable module/project environment:
  //* const module = await import("./feature.js");
  //* console.log(module);

  return "Dynamic import returns a Promise for a module namespace.";
}

loadFeature().then(console.log);


//* ------------------------------------------------------------
//* 31. MODULE FILE EXTENSIONS AND RUNTIME
//* ------------------------------------------------------------

//* Whether `.js` is treated as ESM or CommonJS can depend on the
//* runtime/project configuration. In Node.js, package.json's `type`,
//* file extensions such as `.mjs`/`.cjs`, and loader rules matter.

//* Do not assume a `.js` file has one universal module meaning in every
//* JavaScript environment.


//* ------------------------------------------------------------
//* 32. COMMONJS VS ES MODULES
//* ------------------------------------------------------------

//* CommonJS example:
//* const math = require("./math.js");
//* module.exports = { add };

//* ES module example:
//* import { add } from "./math.js";
//* export { add };

//* They are different module systems. Interoperability depends on
//* the runtime and configuration.


//* ------------------------------------------------------------
//* 33. STRICT MODE + CLASS
//* ------------------------------------------------------------

//* Class bodies are strict mode code.

class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello ${this.name}`;
  }
}

const user = new User("Ravi");
console.log(user.greet());


//* ------------------------------------------------------------
//* 34. PARSING AND COMMENTS
//* ------------------------------------------------------------

//* Comments are ignored as executable code during parsing, although
//* source text still has to be lexically valid around them.

const beforeComment = 10;
/* explanation */
const afterComment = 20;

console.log(beforeComment + afterComment); // 30


//* ------------------------------------------------------------
//* 35. PRACTICAL PROJECT STRUCTURE
//* ------------------------------------------------------------

//* Example ES module project:
//*
//* src/
//*   main.js
//*   api.js
//*   utils.js
//*   config.js
//*
//* main.js
//*   imports functions from api.js and utils.js
//* api.js
//*   handles network/data logic
//* utils.js
//*   contains reusable pure helpers
//* config.js
//*   exports configuration values


//* ------------------------------------------------------------
//* 36. COMMON MISTAKE: USING IMPORT IN A CLASSIC SCRIPT
//* ------------------------------------------------------------

//* Wrong HTML:
//* <script src="main.js"></script>
//*
//* main.js:
//* import { add } from "./math.js";
//*
//* If you intend browser ES modules, use:
//* <script type="module" src="main.js"></script>


//* ------------------------------------------------------------
//* 37. COMMON MISTAKE: ASSUMING STRICT MODE IS AUTOMATIC EVERYWHERE
//* ------------------------------------------------------------

//* Modules and classes are strict, but ordinary classic script code
//* is not automatically strict just because it is JavaScript.
//* You can opt a classic script/function into strict mode with
//* "use strict".


//* ------------------------------------------------------------
//* 38. COMMON MISTAKE: CONFUSING SYNTAX AND RUNTIME ERRORS
//* ------------------------------------------------------------

//* Syntax/parse problem:
//* const = 10;
//*
//* Runtime problem:
//* const data = null;
//* console.log(data.name);

//* The debugging strategy differs: first make the source valid,
//* then inspect execution behavior.


//* ------------------------------------------------------------
//* 39. OUTPUT PREDICTION
//* ------------------------------------------------------------

"use strict";

function getStatus() {
  return "Ready";
}

console.log(getStatus());

//* Output: Ready
//* Question: Does "use strict" itself print anything?
//* Answer: No. It changes language behavior; it is not a console call.


//* ------------------------------------------------------------
//* 40. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1:
//* Explain the difference between parsing and execution.

//* Challenge 2:
//* Create a strict-mode function and demonstrate its `this` value.

//* Challenge 3:
//* Create a small three-file ES module project using named exports.

//* Challenge 4:
//* Create a module with one default export and one named export.

//* Challenge 5:
//* Explain the difference between a classic script and a module script.

//* Challenge 6:
//* Identify whether five sample errors are syntax/early errors or
//* runtime errors.

//* Challenge 7:
//* Explain why `import` cannot simply be placed inside a classic script.


//* ------------------------------------------------------------
//* 41. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1:
//* Why does this fail in strict mode?
//* "use strict";
//* accidentalName = "Ravi";

//* Debug 2:
//* Why might this fail in a browser?
//* <script src="main.js"></script>
//* // main.js
//* import { add } from "./math.js";

//* Debug 3:
//* Classify this:
//* const user = null;
//* console.log(user.name);

//* Debug 4:
//* Classify this:
//* function test( {
//*   return 10;
//* }


//* ------------------------------------------------------------
//* 42. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What does parsing mean?
//* 2. What is the difference between a syntax error and a runtime error?
//* 3. What is strict mode?
//* 4. Why is strict mode useful?
//* 5. What happens when an undeclared variable is assigned in strict mode?
//* 6. What is special about `this` in a strict-mode plain function call?
//* 7. Are ES modules automatically strict?
//* 8. Are class bodies strict mode code?
//* 9. What is the difference between a classic script and a module?
//* 10. What do import and export do?
//* 11. What is a default export?
//* 12. What is a named export?
//* 13. What does dynamic import() return?
//* 14. Why can module behavior differ between Node.js configurations?
//* 15. What is the difference between CommonJS and ES modules?


//* ============================================================
//* END OF STRICT MODE, SCRIPTS, MODULES & PARSING
//* ============================================================
