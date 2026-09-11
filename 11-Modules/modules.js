//* ============================================================
//* JAVASCRIPT MODULES — PRACTICAL COMPANION
//* ============================================================

//* Definition:
//* A JavaScript module is a file whose code has its own module scope and can
//* explicitly expose values with export and consume values with import.
//* Modules help split large programs into focused, reusable units.


//* ------------------------------------------------------------
//* 1. WHY MODULES?
//* ------------------------------------------------------------

//* Without modules, a large application can become one huge file with unclear
//* dependencies and accidental global variables.
//* Modules make dependencies explicit:
//*
//*   user-service.js -> exports functions
//*   auth.js         -> imports those functions
//*   app.js          -> composes the application


//* ------------------------------------------------------------
//* 2. ESM FILE EXAMPLE
//* ------------------------------------------------------------

//* math.js
//* export const PI = 3.14159;
//* export function add(a, b) {
//*   return a + b;
//* }

//* app.js
//* import { PI, add } from "./math.js";
//* console.log(add(2, 3));

//* In browser ESM, use:
//* <script type="module" src="./app.js"></script>


//* ------------------------------------------------------------
//* 3. NAMED EXPORT
//* ------------------------------------------------------------

//* Named exports are identified by their exported names.

//* export const taxRate = 0.18;
//* export function calculateTax(price) {
//*   return price * taxRate;
//* }


//* ------------------------------------------------------------
//* 4. NAMED IMPORT
//* ------------------------------------------------------------

//* import { taxRate, calculateTax } from "./tax.js";

//* The imported names must correspond to the module's named exports unless
//* aliases are used.


//* ------------------------------------------------------------
//* 5. IMPORT ALIAS
//* ------------------------------------------------------------

//* import { calculateTax as tax } from "./tax.js";
//* console.log(tax(100));


//* ------------------------------------------------------------
//* 6. EXPORT ALIAS
//* ------------------------------------------------------------

//* const add = (a, b) => a + b;
//* export { add as sum };


//* ------------------------------------------------------------
//* 7. DEFAULT EXPORT
//* ------------------------------------------------------------

//* A module can have one default export.

//* export default function createUser(name) {
//*   return { name };
//* }


//* ------------------------------------------------------------
//* 8. DEFAULT IMPORT
//* ------------------------------------------------------------

//* import createUser from "./user.js";

//* The local name is chosen by the importing module.


//* ------------------------------------------------------------
//* 9. DEFAULT + NAMED EXPORTS
//* ------------------------------------------------------------

//* export default function createUser() {}
//* export const role = "user";

//* Import:
//* import createUser, { role } from "./user.js";


//* ------------------------------------------------------------
//* 10. NAMESPACE IMPORT
//* ------------------------------------------------------------

//* import * as math from "./math.js";
//* console.log(math.add(2, 3));

//* This creates a module namespace object containing the module's exports.


//* ------------------------------------------------------------
//* 11. RE-EXPORT
//* ------------------------------------------------------------

//* export { add, subtract } from "./math.js";

//* A barrel module can expose selected APIs from other modules.


//* ------------------------------------------------------------
//* 12. RE-EXPORT DEFAULT
//* ------------------------------------------------------------

//* export { default as createUser } from "./user.js";


//* ------------------------------------------------------------
//* 13. EXPORT *
//* ------------------------------------------------------------

//* export * from "./math.js";

//* This re-exports eligible named exports, but does not re-export a module's
//* default export automatically.


//* ------------------------------------------------------------
//* 14. MODULE SCOPE
//* ------------------------------------------------------------

//* Top-level variables in an ESM module are module-scoped.
//* They do not automatically become properties of the browser's window object.

//* Example:
//* const secret = "private";
//*
//* Another module cannot access secret unless this module exports it.


//* ------------------------------------------------------------
//* 15. MODULES ARE STRICT MODE
//* ------------------------------------------------------------

//* ESM code runs in strict mode automatically.
//* You do not need to write "use strict" for an ESM module.


//* ------------------------------------------------------------
//* 16. STRICT MODE EXAMPLE
//* ------------------------------------------------------------

//* This is invalid in an ESM module:
//* accidentalGlobal = 123;
//*
//* It throws because undeclared assignment is not allowed in strict mode.


//* ------------------------------------------------------------
//* 17. IMPORTS ARE STATIC DECLARATIONS
//* ------------------------------------------------------------

//* Static import syntax is normally placed at module top level:
//* import { add } from "./math.js";

//* The module dependency graph can therefore be analyzed before normal module
//* evaluation proceeds.


//* ------------------------------------------------------------
//* 18. IMPORTS ARE READ-ONLY BINDINGS
//* ------------------------------------------------------------

//* If another module exports:
//* export let count = 0;
//*
//* An importer can read count, but cannot assign to its imported binding:
//* import { count } from "./counter.js";
//* count = 10; // TypeError

//* The exporting module can change its own binding, and importers observe the
//* current exported binding. This is called a live binding.


//* ------------------------------------------------------------
//* 19. LIVE BINDING CONCEPT
//* ------------------------------------------------------------

//* counter.js
//* export let count = 0;
//* export function increment() {
//*   count += 1;
//* }

//* app.js
//* import { count, increment } from "./counter.js";
//* console.log(count); // 0
//* increment();
//* console.log(count); // 1

//* The importer sees the updated exported binding.


//* ------------------------------------------------------------
//* 20. MODULE EVALUATION
//* ------------------------------------------------------------

//* A module's top-level code executes when that module is evaluated.
//* Imported dependencies are evaluated as part of the module graph according
//* to the ECMAScript module loading/evaluation rules.


//* ------------------------------------------------------------
//* 21. SIDE-EFFECT MODULE
//* ------------------------------------------------------------

//* import "./analytics.js";

//* This imports the module for its side effects without binding any exports.


//* ------------------------------------------------------------
//* 22. SIDE EFFECTS SHOULD BE INTENTIONAL
//* ------------------------------------------------------------

//* Avoid modules that silently change unrelated global state when imported.
//* Prefer explicit functions where practical:
//*
//* import { initializeAnalytics } from "./analytics.js";
//* initializeAnalytics();


//* ------------------------------------------------------------
//* 23. DYNAMIC IMPORT
//* ------------------------------------------------------------

//* Dynamic import loads a module at runtime and returns a Promise.

//* async function loadEditor() {
//*   const module = await import("./editor.js");
//*   module.openEditor();
//* }

//* Useful for conditional features and lazy loading.


//* ------------------------------------------------------------
//* 24. DYNAMIC IMPORT WITH THEN
//* ------------------------------------------------------------

//* import("./math.js")
//*   .then((math) => console.log(math.add(2, 3)))
//*   .catch(console.error);


//* ------------------------------------------------------------
//* 25. CONDITIONAL MODULE LOADING
//* ------------------------------------------------------------

//* async function loadFeature(enabled) {
//*   if (!enabled) return;
//*
//*   const { start } = await import("./feature.js");
//*   start();
//* }


//* ------------------------------------------------------------
//* 26. DYNAMIC IMPORT IS NOT THE SAME AS require()
//* ------------------------------------------------------------

//* ESM:
//* const module = await import("./feature.js");
//*
//* CommonJS:
//* const module = require("./feature.cjs");

//* They belong to different module systems and have different loading semantics.


//* ------------------------------------------------------------
//* 27. BROWSER ESM
//* ------------------------------------------------------------

//* HTML:
//* <script type="module" src="./app.js"></script>

//* Browser module scripts are deferred by default relative to document parsing.
//* Module scripts are also strict-mode code.


//* ------------------------------------------------------------
//* 28. MODULE SCRIPT + CORS
//* ------------------------------------------------------------

//* Browser module loading follows browser security rules, including CORS for
//* cross-origin module resources.


//* ------------------------------------------------------------
//* 29. MODULE URL RESOLUTION
//* ------------------------------------------------------------

//* Browser imports normally need a resolvable module specifier such as:
//* import { add } from "./math.js";
//*
//* Bare specifiers such as "react" require an environment/tooling mechanism
//* such as an import map or bundler/package resolution system.


//* ------------------------------------------------------------
//* 30. FILE EXTENSIONS
//* ------------------------------------------------------------

//* In many browser ESM setups, explicitly writing "./math.js" is important.
//* Node.js ESM also has precise module-resolution rules; do not assume browser
//* and Node resolution are identical.


//* ------------------------------------------------------------
//* 31. NODE.JS ESM
//* ------------------------------------------------------------

//* Node can run ESM using .mjs files or package configuration such as:
//* {
//*   "type": "module"
//* }

//* With "type": "module", .js files in that package scope are interpreted as ESM.


//* ------------------------------------------------------------
//* 32. NODE.JS COMMONJS
//* ------------------------------------------------------------

//* CommonJS traditionally uses:
//* const fs = require("node:fs");
//* module.exports = something;

//* It is still important in existing Node.js applications and packages.


//* ------------------------------------------------------------
//* 33. COMMONJS EXPORT
//* ------------------------------------------------------------

//* module.exports = {
//*   add,
//*   subtract,
//* };


//* ------------------------------------------------------------
//* 34. COMMONJS IMPORT
//* ------------------------------------------------------------

//* const { add } = require("./math.cjs");


//* ------------------------------------------------------------
//* 35. ESM VS COMMONJS
//* ------------------------------------------------------------

//* ESM:
//* - import/export syntax
//* - static module declarations
//* - live bindings
//* - native browser module system
//* - supports dynamic import()
//*
//* CommonJS:
//* - require/module.exports
//* - historically central to Node.js
//* - synchronous require() loading model
//*
//* Modern Node.js supports both, but interoperability has rules and edge cases.


//* ------------------------------------------------------------
//* 36. PACKAGE TYPE
//* ------------------------------------------------------------

//* package.json:
//* {
//*   "type": "module"
//* }

//* This changes how .js files in that package scope are interpreted by Node.js.


//* ------------------------------------------------------------
//* 37. .MJS AND .CJS
//* ------------------------------------------------------------

//* .mjs -> explicit ESM
//* .cjs -> explicit CommonJS
//*
//* These extensions are useful when a project needs both systems clearly separated.


//* ------------------------------------------------------------
//* 38. IMPORTING COMMONJS FROM ESM
//* ------------------------------------------------------------

//* Node.js provides interoperability mechanisms, but CommonJS exports do not
//* map perfectly to ESM named exports in every situation.
//* Prefer checking the specific runtime/package behavior rather than assuming
//* every property is a reliable named ESM export.


//* ------------------------------------------------------------
//* 39. IMPORTING ESM FROM COMMONJS
//* ------------------------------------------------------------

//* CommonJS can use dynamic import() to load ESM asynchronously in supported
//* Node.js environments.
//*
//* async function load() {
//*   const module = await import("./math.mjs");
//*   console.log(module.add(1, 2));
//* }


//* ------------------------------------------------------------
//* 40. CIRCULAR DEPENDENCY
//* ------------------------------------------------------------

//* A circular dependency happens when:
//* A imports B
//* B imports A

//* Example:
//* a.js -> import "./b.js"
//* b.js -> import "./a.js"

//* ESM supports cycles, but initialization order and live bindings matter.
//* Avoid cycles when possible because they make module initialization harder to reason about.


//* ------------------------------------------------------------
//* 41. TEMPORAL DEAD ZONE IN MODULES
//* ------------------------------------------------------------

//* Exported/imported bindings still obey initialization timing.
//* Accessing an uninitialized lexical binding can cause a ReferenceError.
//* Circular dependencies can expose this problem unexpectedly.


//* ------------------------------------------------------------
//* 42. BARREL FILES
//* ------------------------------------------------------------

//* Example index.js:
//* export { createUser } from "./user.js";
//* export { createOrder } from "./order.js";

//* Consumers can then import from one public entry point.

//* Barrel files can improve API organization, but excessive barrels can also
//* make dependency graphs harder to understand and may affect bundling/tree-shaking.


//* ------------------------------------------------------------
//* 43. PUBLIC VS PRIVATE MODULE API
//* ------------------------------------------------------------

//* Keep implementation details unexported:
//*
//* const SECRET_KEY = "...";
//*
//* function hashPassword(password) {
//*   // internal implementation
//* }
//*
//* export function registerUser(user) {
//*   return hashPassword(user.password);
//* }

//* Consumers depend on registerUser, not the internal helper.


//* ------------------------------------------------------------
//* 44. MODULE BOUNDARY
//* ------------------------------------------------------------

//* A good module usually has a focused responsibility and a small public API.
//* Example:
//*
//* auth/
//*   password.js
//*   token.js
//*   session.js
//*
//* Avoid putting unrelated business logic into one "utils.js" file just because
//* it is easy to import everywhere.


//* ------------------------------------------------------------
//* 45. DEPENDENCY DIRECTION
//* ------------------------------------------------------------

//* Prefer clear dependency direction:
//* UI -> application/service -> domain -> infrastructure
//*
//* The exact architecture depends on the application, but module boundaries
//* should make dependencies understandable.


//* ------------------------------------------------------------
//* 46. DEFAULT EXPORT TRADE-OFF
//* ------------------------------------------------------------

//* Default exports are convenient when a module has one primary concept.
//* Named exports make exported API names explicit and can be easier to refactor.
//* Neither style is universally mandatory.


//* ------------------------------------------------------------
//* 47. NAMESPACE OBJECTS ARE READ-ONLY FROM CONSUMER CODE
//* ------------------------------------------------------------

//* import * as math from "./math.js";
//* math = {}; // cannot reassign the imported namespace binding
//*
//* The namespace object's exported properties are not ordinary writable consumer bindings.


//* ------------------------------------------------------------
//* 48. TOP-LEVEL AWAIT
//* ------------------------------------------------------------

//* Modern ESM supports top-level await in modules.

//* Example:
//* const config = await loadConfig();
//* export { config };

//* Top-level await can make dependent module evaluation wait, so use it deliberately.


//* ------------------------------------------------------------
//* 49. TOP-LEVEL AWAIT IS NOT COMMONJS SYNTAX
//* ------------------------------------------------------------

//* Do not assume:
//* const value = await something();
//*
//* works at top level in every JavaScript file.
//* Top-level await is an ESM feature in environments that support it.


//* ------------------------------------------------------------
//* 50. MODULE GRAPH
//* ------------------------------------------------------------

//* Think of modules as a graph:
//*
//*             app.js
//*            /     \
//*       auth.js   ui.js
//*          |         |
//*      token.js   format.js
//*
//* Imports are edges between modules.
//* A clear graph improves maintainability.


//* ------------------------------------------------------------
//* 51. TREE SHAKING CONCEPT
//* ------------------------------------------------------------

//* Bundlers can analyze ESM's static structure and potentially remove unused
//* exports from production bundles. This optimization is commonly called tree shaking.
//* It is not a guarantee that every unused-looking module side effect disappears.


//* ------------------------------------------------------------
//* 52. SIDE EFFECTS AND TREE SHAKING
//* ------------------------------------------------------------

//* A module may execute code simply by being imported:
//* console.log("module initialized");
//*
//* Such side effects affect whether tooling can safely remove imports.


//* ------------------------------------------------------------
//* 53. LAZY LOADING
//* ------------------------------------------------------------

//* Dynamic import can defer a feature until it is needed:
//*
//* button.addEventListener("click", async () => {
//*   const { openEditor } = await import("./editor.js");
//*   openEditor();
//* });


//* ------------------------------------------------------------
//* 54. FEATURE DETECTION
//* ------------------------------------------------------------

//* Module systems are separate from feature detection.
//* Example:
//* if ("geolocation" in navigator) {
//*   // host API exists
//* }

//* Do not confuse ECMAScript language features with browser/Node host APIs.


//* ------------------------------------------------------------
//* 55. MODULES AND GLOBAL VARIABLES
//* ------------------------------------------------------------

//* Bad old-style pattern:
//* var appState = {};
//*
//* Many unrelated scripts can accidentally share or overwrite global names.
//* Modules provide lexical isolation by default.


//* ------------------------------------------------------------
//* 56. IIFE VS MODULE
//* ------------------------------------------------------------

//* Before native modules, developers often used IIFEs to create private scopes:
//*
//* (() => {
//*   const privateValue = 10;
//* })();

//* Modules provide built-in file-level scope and explicit imports/exports,
//* making dependency management clearer.


//* ------------------------------------------------------------
//* 57. MODULES AND CLOSURES
//* ------------------------------------------------------------

//* Module-level variables can behave like private state when they are not exported.
//* Exported functions can close over that private state.

//* counter.js
//* let count = 0;
//* export function increment() {
//*   count += 1;
//*   return count;
//* }

//* Consumers cannot directly access count unless it is exported.


//* ------------------------------------------------------------
//* 58. MODULE API DESIGN
//* ------------------------------------------------------------

//* Prefer:
//* export function createUser(data) {}
//* export function findUser(id) {}
//*
//* over exporting every helper used internally.


//* ------------------------------------------------------------
//* 59. MODULE NAMING
//* ------------------------------------------------------------

//* Choose names that communicate responsibility:
//*
//* user-service.js
//* auth-controller.js
//* validate-email.js
//*
//* Avoid vague names such as everything.js or random.js.


//* ------------------------------------------------------------
//* 60. DEPENDENCY INJECTION WITH MODULES
//* ------------------------------------------------------------

//* A module can accept dependencies rather than importing every concrete
//* implementation itself:

function createUserService(repository) {
  return {
    async findUser(id) {
      return repository.findById(id);
    },
  };
}

//* This function is executable in any JS environment and demonstrates a useful
//* module-design technique without requiring an actual database.

const fakeRepository = {
  async findById(id) {
    return { id, name: "Ravi" };
  },
};

const userService = createUserService(fakeRepository);
userService.findUser(1).then(console.log);


//* ------------------------------------------------------------
//* 61. TESTABLE MODULE DESIGN
//* ------------------------------------------------------------

//* Export small deterministic functions where practical.
//* A consumer/test can then import the public API and verify behavior.

//* math.js
//* export function add(a, b) {
//*   return a + b;
//* }

//* math.test.js
//* import { add } from "./math.js";
//* console.assert(add(2, 3) === 5);


//* ------------------------------------------------------------
//* 62. MODULE-LOCAL CONSTANTS
//* ------------------------------------------------------------

//* const API_BASE_URL = "https://example.com/api";
//*
//* export async function getUsers() {
//*   return fetch(`${API_BASE_URL}/users`);
//* }

//* API_BASE_URL remains an implementation detail.


//* ------------------------------------------------------------
//* 63. MODULE-LOCAL CACHE
//* ------------------------------------------------------------

const cache = new Map();

function getCached(key) {
  return cache.get(key);
}

function setCached(key, value) {
  cache.set(key, value);
}

setCached("user:1", { id: 1 });
console.log(getCached("user:1"));

//* In a real module, these helpers could stay private while only a safe public
//* function is exported.


//* ------------------------------------------------------------
//* 64. MODULE INITIALIZATION ORDER — MENTAL MODEL
//* ------------------------------------------------------------

//* Do not think of imports as simple text copy/paste.
//* The runtime creates module records, resolves dependencies, links bindings,
//* and evaluates the dependency graph.


//* ------------------------------------------------------------
//* 65. IMPORTS DO NOT COPY VALUES LIKE OBJECT SPREAD
//* ------------------------------------------------------------

//* An imported binding is connected to an export binding.
//* It is not equivalent to:
//* const local = { ...otherModule };


//* ------------------------------------------------------------
//* 66. IMPORT ONCE / MODULE CACHING
//* ------------------------------------------------------------

//* In normal module loading, a module is instantiated/evaluated as part of the
//* module graph and its module record is reused for subsequent imports within
//* that graph/environment.
//*
//* Therefore multiple imports of the same resolved module generally share its
//* module-level state.


//* ------------------------------------------------------------
//* 67. SHARED MODULE STATE
//* ------------------------------------------------------------

//* counter.js
//* let count = 0;
//* export const increment = () => ++count;
//* export const getCount = () => count;
//*
//* Two consumers importing this module interact with the same module-level
//* count for that module instance.


//* ------------------------------------------------------------
//* 68. MODULE SINGLETON PATTERN — CAUTION
//* ------------------------------------------------------------

//* Module caching naturally makes module-local state shared within the relevant
//* module instance. This can be useful for configuration/cache state but can
//* also create hidden global-like state. Use it deliberately.


//* ------------------------------------------------------------
//* 69. ENVIRONMENT VARIABLES
//* ------------------------------------------------------------

//* Browser and Node applications expose environment/configuration differently.
//* Do not assume process.env exists in a browser without a build/runtime layer.


//* ------------------------------------------------------------
//* 70. NODE: SPECIFIER
//* ------------------------------------------------------------

//* Node-specific built-ins can use explicit specifiers:
//* import fs from "node:fs";
//*
//* This clearly identifies a Node built-in module.


//* ------------------------------------------------------------
//* 71. PACKAGE IMPORTS
//* ------------------------------------------------------------

//* Modern Node/package tooling can define package-level import/export mappings.
//* These are configuration-level resolution features, not JavaScript syntax itself.


//* ------------------------------------------------------------
//* 72. MODULE SECURITY
//* ------------------------------------------------------------

//* An import does not magically make third-party code trustworthy.
//* Imported code executes with the capabilities provided by its environment.
//* Audit dependencies and keep secrets out of client-side modules.


//* ------------------------------------------------------------
//* 73. NEVER PUT SECRETS IN FRONTEND MODULES
//* ------------------------------------------------------------

//* Bad:
//* const SECRET_API_KEY = "real-secret";
//* export function callPrivateAPI() {}
//*
//* Any secret shipped to browser code can be inspected by the user.
//* Use a trusted backend for credentials that must remain secret.


//* ------------------------------------------------------------
//* 74. MODULES AND CODE SPLITTING
//* ------------------------------------------------------------

//* Static imports describe the normal dependency graph.
//* Dynamic imports can create natural code-splitting boundaries in bundler-based
//* applications.


//* ------------------------------------------------------------
//* 75. MODULES AND ROUTES
//* ------------------------------------------------------------

//* A frontend router can lazy-load route components:
//*
//* const SettingsPage = () => import("./pages/SettingsPage.js");
//*
//* Framework-specific APIs may wrap this pattern, but dynamic import is the
//* underlying language mechanism.


//* ------------------------------------------------------------
//* 76. MODULES AND PLUGINS
//* ------------------------------------------------------------

async function loadPlugin(path) {
  const plugin = await import(path);

  if (typeof plugin.setup !== "function") {
    throw new TypeError("Plugin must export setup()");
  }

  return plugin;
}

//* loadPlugin("./my-plugin.js").then((plugin) => plugin.setup());

//* This is a basic plugin-loading boundary. Real applications also validate
//* versions, permissions and lifecycle behavior.


//* ------------------------------------------------------------
//* 77. MODULES AND FACTORY FUNCTIONS
//* ------------------------------------------------------------

function createLogger(prefix) {
  return {
    info(message) {
      console.log(`[${prefix}] ${message}`);
    },
  };
}

const logger = createLogger("APP");
logger.info("started");

//* A module can export a factory instead of a mutable singleton.


//* ------------------------------------------------------------
//* 78. COMMON MISTAKE — FORGETTING EXPORT
//* ------------------------------------------------------------

//* math.js
//* function add(a, b) {
//*   return a + b;
//* }
//*
//* app.js
//* import { add } from "./math.js";
//*
//* If add was never exported, the import cannot provide that named export.


//* ------------------------------------------------------------
//* 79. COMMON MISTAKE — DEFAULT VS NAMED IMPORT
//* ------------------------------------------------------------

//* export default function add() {}
//*
//* Correct:
//* import add from "./math.js";
//*
//* Not the same as:
//* import { add } from "./math.js";


//* ------------------------------------------------------------
//* 80. COMMON MISTAKE — WRONG FILE PATH
//* ------------------------------------------------------------

//* import { add } from "./Math.js";
//*
//* File systems can be case-sensitive. "Math.js" and "math.js" are not always
//* the same path.


//* ------------------------------------------------------------
//* 81. COMMON MISTAKE — ASSUMING require() EXISTS EVERYWHERE
//* ------------------------------------------------------------

//* require("./file") is CommonJS/Node-oriented syntax.
//* Browser ESM uses import/export.


//* ------------------------------------------------------------
//* 82. COMMON MISTAKE — EXPORTING EVERYTHING
//* ------------------------------------------------------------

//* Exporting every helper creates a large public API and makes future refactoring
//* harder. Export the smallest useful public surface.


//* ------------------------------------------------------------
//* 83. COMMON MISTAKE — CIRCULAR DEPENDENCY
//* ------------------------------------------------------------

//* If A and B import each other, initialization can become difficult to reason about.
//* Fix by extracting shared logic or reversing dependency direction when appropriate.


//* ------------------------------------------------------------
//* 84. COMMON MISTAKE — TOP-LEVEL SIDE EFFECTS
//* ------------------------------------------------------------

//* A module that performs a network request immediately on import can surprise
//* consumers and complicate testing.
//* Prefer explicit initialization unless eager execution is intentional.


//* ------------------------------------------------------------
//* 85. COMMON MISTAKE — CONFUSING HOST APIS WITH MODULES
//* ------------------------------------------------------------

//* fetch(), document and localStorage are host/browser APIs.
//* import/export is the ECMAScript module system.
//* Node adds its own modules and APIs.


//* ------------------------------------------------------------
//* 86. COMMON MISTAKE — ASSUMING MODULES ARE PRIVATE SECURITY BOUNDARIES
//* ------------------------------------------------------------

//* Non-exported module variables are inaccessible through normal module imports,
//* but module scope is not a security boundary against code that already has
//* execution access to the same environment.


//* ------------------------------------------------------------
//* 87. COMMON MISTAKE — TOP-LEVEL AWAIT EVERYWHERE
//* ------------------------------------------------------------

//* Top-level await can delay module evaluation for dependents.
//* Use it when module initialization genuinely needs asynchronous work.


//* ------------------------------------------------------------
//* 88. OUTPUT / BEHAVIOR PREDICTION
//* ------------------------------------------------------------

//* module-a.js
//* console.log("A");
//* export const value = 10;
//*
//* app.js
//* import { value } from "./module-a.js";
//* console.log("B", value);
//*
//* Predict:
//* A
//* B 10


//* ------------------------------------------------------------
//* 89. OUTPUT / BEHAVIOR PREDICTION
//* ------------------------------------------------------------

//* counter.js
//* export let count = 0;
//* export function inc() { count += 1; }
//*
//* app.js
//* import { count, inc } from "./counter.js";
//* console.log(count); // 0
//* inc();
//* console.log(count); // 1

//* Why?
//* Because imported exports are live bindings.


//* ------------------------------------------------------------
//* 90. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1: Create a math.js module with add, subtract, multiply and divide.
//* Challenge 2: Import those functions from app.js.
//* Challenge 3: Add a default export for a Calculator class.
//* Challenge 4: Create a barrel index.js that re-exports public APIs.
//* Challenge 5: Build a user-service module with private validation helpers.
//* Challenge 6: Create a module-level cache and expose get/set functions.
//* Challenge 7: Create a counter module with live exported state.
//* Challenge 8: Build a lazy-loaded feature with dynamic import().
//* Challenge 9: Build a plugin loader that validates exported setup().
//* Challenge 10: Create a circular dependency intentionally and explain its risk.
//* Challenge 11: Convert a small CommonJS project to ESM.
//* Challenge 12: Create a project using both .mjs and .cjs files.
//* Challenge 13: Build a route-based dynamic import example.
//* Challenge 14: Design a module API with the smallest useful public surface.
//* Challenge 15: Create a module that exposes a factory instead of mutable state.


//* ------------------------------------------------------------
//* 91. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1: "The requested module does not provide an export named 'add'."
//* Check named vs default export and spelling.

//* Debug 2: Browser says the server returned the wrong MIME type for a module.
//* Check server configuration and module resource delivery.

//* Debug 3: import "./math" fails in a browser.
//* Check whether the environment requires the explicit .js extension.

//* Debug 4: require is not defined.
//* Check whether the file is running as ESM rather than CommonJS.

//* Debug 5: Cannot use import statement outside a module.
//* Check browser script type or Node package/file module configuration.

//* Debug 6: A circular import causes ReferenceError during startup.
//* Inspect initialization order and remove/restructure the cycle.

//* Debug 7: A dynamic import feature never loads.
//* Check the path, runtime support, Promise rejection and network request.

//* Debug 8: A secret API key appears in frontend source.
//* Move the secret to trusted server-side code.

//* Debug 9: A barrel file creates unexpected dependency behavior.
//* Inspect the re-export graph and direct-import critical modules where appropriate.

//* Debug 10: Top-level await makes startup slow.
//* Identify whether dependent modules are waiting on unnecessary initialization work.


//* ------------------------------------------------------------
//* 92. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is a JavaScript module?
//* 2. Why do modules help large applications?
//* 3. What is a named export?
//* 4. What is a default export?
//* 5. Difference between named and default import?
//* 6. What does import * as do?
//* 7. What is a re-export?
//* 8. What is module scope?
//* 9. Why are ESM modules strict mode automatically?
//* 10. What is a live binding?
//* 11. Why can't an importer assign to an imported binding?
//* 12. What is dynamic import()?
//* 13. Why is dynamic import useful for lazy loading?
//* 14. What is top-level await?
//* 15. What is a module graph?
//* 16. What is a circular dependency?
//* 17. What is a barrel file?
//* 18. What is tree shaking?
//* 19. Why do module side effects matter for bundling?
//* 20. ESM vs CommonJS?
//* 21. What do .mjs and .cjs mean in Node.js?
//* 22. Why shouldn't frontend modules contain secrets?
//* 23. How can modules provide private state?
//* 24. How would you design a small public module API?
//* 25. How would you lazy-load a plugin?


//* ------------------------------------------------------------
//* 93. INTERVIEW QUESTIONS
//* ------------------------------------------------------------

//* Q1. Explain ESM from import to evaluation.
//* Q2. What is the difference between static import and dynamic import()?
//* Q3. Explain live bindings.
//* Q4. Why does ESM support circular dependencies?
//* Q5. What can go wrong with circular dependency initialization?
//* Q6. Explain default vs named exports.
//* Q7. What is a module namespace object?
//* Q8. Why are ESM modules strict mode?
//* Q9. What is top-level await and what is its trade-off?
//* Q10. How does ESM differ from CommonJS?
//* Q11. How does Node determine whether .js is ESM or CommonJS?
//* Q12. What are .mjs and .cjs?
//* Q13. How does dynamic import help code splitting?
//* Q14. What is tree shaking and why does ESM help it?
//* Q15. Why can side effects prevent safe removal of imports?
//* Q16. What is a barrel module?
//* Q17. When can barrel files become harmful?
//* Q18. How would you structure modules in a full-stack application?
//* Q19. How would you keep secrets out of frontend modules?
//* Q20. How would you test a module with private implementation details?


//* ------------------------------------------------------------
//* 94. MASTERY CHECKLIST
//* ------------------------------------------------------------

//* [ ] I can explain what a module is.
//* [ ] I can write named exports/imports.
//* [ ] I can write default exports/imports.
//* [ ] I can use aliases and namespace imports.
//* [ ] I can re-export APIs.
//* [ ] I understand module scope.
//* [ ] I understand live bindings.
//* [ ] I can use dynamic import().
//* [ ] I understand top-level await.
//* [ ] I can explain the module graph.
//* [ ] I can identify circular dependencies.
//* [ ] I understand browser ESM basics.
//* [ ] I understand Node ESM configuration.
//* [ ] I understand CommonJS basics.
//* [ ] I can distinguish ESM from CommonJS.
//* [ ] I can design a small public module API.
//* [ ] I can use modules for private state.
//* [ ] I understand lazy loading/code splitting conceptually.
//* [ ] I understand tree shaking conceptually.
//* [ ] I can debug import/export errors.
//* [ ] I can teach modules to another beginner.


//* ============================================================
//* FINAL RULE
//* ============================================================

//* A module is not just "another JS file".
//* The important ideas are:
//*
//* 1. Scope — what is private?
//* 2. API — what is exported?
//* 3. Dependency — what is imported?
//* 4. Direction — who depends on whom?
//* 5. Initialization — when does module code run?
//* 6. Loading — static or dynamic?
//* 7. Environment — browser ESM, Node ESM, or CommonJS?
//*
//* Master these and modules become an architecture tool rather than just syntax.

//* END OF JAVASCRIPT MODULES
