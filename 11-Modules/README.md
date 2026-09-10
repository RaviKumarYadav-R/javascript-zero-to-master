# 11 — Modules

> A deep, teaching-first chapter on JavaScript modules: ESM, CommonJS, module graphs, resolution, Node.js, browsers, bundlers, performance, architecture, security, and practice.

## Learning Goal

By the end of this chapter you should be able to design module boundaries, use ESM confidently, explain CommonJS, debug resolution and circular-dependency problems, and choose appropriate loading and packaging strategies.

## 1. What Are Modules?

**Definition:** What Are Modules? is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

**Why it matters:** It gives code a predictable dependency boundary, reduces accidental coupling, and makes larger applications easier to reason about.

**Example:**
```js
// math.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add } from "./math.js";
console.log(add(2, 3)); // 5
```

**Key rule:** Understand the module boundary, the binding being exposed, and the host's resolution rules before relying on the syntax.

## 2. Why Modules Exist

**Definition:** Why Modules Exist is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

**Why it matters:** It gives code a predictable dependency boundary, reduces accidental coupling, and makes larger applications easier to reason about.

**Example:**
```js
// math.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add } from "./math.js";
console.log(add(2, 3)); // 5
```

**Key rule:** Understand the module boundary, the binding being exposed, and the host's resolution rules before relying on the syntax.

## 3. Problem Without Modules

**Definition:** Problem Without Modules is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

**Why it matters:** It gives code a predictable dependency boundary, reduces accidental coupling, and makes larger applications easier to reason about.

**Example:**
```js
// math.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add } from "./math.js";
console.log(add(2, 3)); // 5
```

**Key rule:** Understand the module boundary, the binding being exposed, and the host's resolution rules before relying on the syntax.

## 4. Module Mental Model

**Definition:** Module Mental Model is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

**Why it matters:** It gives code a predictable dependency boundary, reduces accidental coupling, and makes larger applications easier to reason about.

**Example:**
```js
// math.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add } from "./math.js";
console.log(add(2, 3)); // 5
```

**Key rule:** Understand the module boundary, the binding being exposed, and the host's resolution rules before relying on the syntax.

## 5. Module Boundary

**Definition:** Module Boundary is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

**Why it matters:** It gives code a predictable dependency boundary, reduces accidental coupling, and makes larger applications easier to reason about.

**Example:**
```js
// math.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add } from "./math.js";
console.log(add(2, 3)); // 5
```

**Key rule:** Understand the module boundary, the binding being exposed, and the host's resolution rules before relying on the syntax.

## 6. Module Scope

**Definition:** Module Scope is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

**Why it matters:** It gives code a predictable dependency boundary, reduces accidental coupling, and makes larger applications easier to reason about.

**Example:**
```js
// math.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add } from "./math.js";
console.log(add(2, 3)); // 5
```

**Key rule:** Understand the module boundary, the binding being exposed, and the host's resolution rules before relying on the syntax.

## 7. Module Graph

**Definition:** Module Graph is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

**Why it matters:** It gives code a predictable dependency boundary, reduces accidental coupling, and makes larger applications easier to reason about.

**Example:**
```js
// math.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add } from "./math.js";
console.log(add(2, 3)); // 5
```

**Key rule:** Understand the module boundary, the binding being exposed, and the host's resolution rules before relying on the syntax.

## 8. Dependency Graph

**Definition:** Dependency Graph is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

**Why it matters:** It gives code a predictable dependency boundary, reduces accidental coupling, and makes larger applications easier to reason about.

**Example:**
```js
// math.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add } from "./math.js";
console.log(add(2, 3)); // 5
```

**Key rule:** Understand the module boundary, the binding being exposed, and the host's resolution rules before relying on the syntax.

## 9. Module vs Script

**Definition:** Module vs Script is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

**Why it matters:** It gives code a predictable dependency boundary, reduces accidental coupling, and makes larger applications easier to reason about.

**Example:**
```js
// math.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add } from "./math.js";
console.log(add(2, 3)); // 5
```

**Key rule:** Understand the module boundary, the binding being exposed, and the host's resolution rules before relying on the syntax.

## 10. ES Modules

**Definition:** ES Modules is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

**Why it matters:** It gives code a predictable dependency boundary, reduces accidental coupling, and makes larger applications easier to reason about.

**Example:**
```js
// math.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add } from "./math.js";
console.log(add(2, 3)); // 5
```

**Key rule:** Understand the module boundary, the binding being exposed, and the host's resolution rules before relying on the syntax.

## 11. CommonJS

**Definition:** CommonJS is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

In Node.js, behavior depends on package metadata and file extension. Test the smallest example in the same project configuration as the real application. Do not infer ESM behavior from CommonJS examples or vice versa.

## 12. ESM vs CommonJS

**Definition:** ESM vs CommonJS is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

**Why it matters:** ESM is statically structured around imports/exports, while CommonJS uses runtime-oriented `require()` and `module.exports`.

## 13. When To Use ESM

**Definition:** When To Use ESM is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

Prefer ESM for modern browser code and modern Node applications when the environment supports it. It provides standardized import/export syntax and a statically analyzable dependency structure.

## 14. When CommonJS Appears

**Definition:** When CommonJS Appears is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

You may still encounter CommonJS in older Node projects and packages. Learn it well enough to maintain and interoperate with existing systems.

## 15. Exporting Code

**Definition:** Exporting Code is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

An export makes a declaration or binding available through a module's public API. Anything not exported remains inaccessible through normal imports.

## 16. Importing Code

**Definition:** Importing Code is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

An import creates a local binding connected to an export from another module. The importer should match the target module's actual export contract.

## 17. Named Exports

**Definition:** Named Exports is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

Named exports expose specifically named bindings.

```js
export const apiUrl = "/api";
export function getUser(id) {
  return fetch(`${apiUrl}/users/${id}`);
}
```

## 18. Named Export Syntax

**Definition:** Named Export Syntax is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

You can write `export const`, `export function`, `export class`, or export existing bindings with an export list.

## 19. Export List

**Definition:** Export List is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

Use `export { add, subtract }` when declarations already exist locally. This is useful when the public API should be declared separately from implementation code.

## 20. Import Named Exports

**Definition:** Import Named Exports is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

```js
import { add, subtract } from "./math.js";
```

The names must correspond to the target module's named exports unless aliases are used.

## 21. Aliasing Imports

**Definition:** Aliasing Imports is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

```js
import { add as sum } from "./math.js";
```

The exported name remains `add`; only the local imported name becomes `sum`.

## 22. Aliasing Exports

**Definition:** Aliasing Exports is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

```js
const add = (a, b) => a + b;
export { add as sum };
```

Consumers import `sum`, not `add`.

## 23. Default Export

**Definition:** Default Export is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

A module can expose one default export. It is useful when a module has one primary value or abstraction.

## 24. Default Import

**Definition:** Default Import is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

```js
import calculate from "./calculator.js";
```

The local name does not have to match the declaration's original name.

## 25. Named vs Default

**Definition:** Named vs Default is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

Named exports communicate explicit API names. Default exports communicate one primary module value. Consistency within a project is often more important than ideology.

## 26. Multiple Named Exports

**Definition:** Multiple Named Exports is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

A module can export many named bindings. Keep the collection cohesive so the module represents one understandable responsibility.

## 27. One Default Export

**Definition:** One Default Export is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

A module has at most one default export. You cannot declare two separate default exports in the same module.

## 28. Default Function

**Definition:** Default Function is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

```js
export default function formatUser(user) {
  return user.name.trim();
}
```

## 29. Default Class

**Definition:** Default Class is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

```js
export default class UserService {
  find(id) {}
}
```

## 30. Default Binding Syntax

**Definition:** Default Binding Syntax is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

An existing binding can become default with `export { value as default }`. This is different from exporting a named binding under its original name.

## 31. Importing Both

**Definition:** Importing Both is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

```js
import formatter, { parse, validate } from "./data.js";
```

This combines one default import with named imports.

## 32. Namespace Import

**Definition:** Namespace Import is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

```js
import * as math from "./math.js";
console.log(math.add(2, 3));
```

## 33. Namespace Object

**Definition:** Namespace Object is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

A module namespace object provides access to the module's exported names. It is a special module-system object, not simply a normal copied object of values.

## 34. Namespace Import Use

**Definition:** Namespace Import Use is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

Namespace imports work well for cohesive APIs such as `math.add`, `math.round`, and `math.average`. Avoid them when they obscure which few dependencies a module actually needs.

## 35. Star Export

**Definition:** Star Export is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

```js
export * from "./math.js";
```

This re-exports eligible named exports, not the default export automatically.

## 36. Explicit Re-export

**Definition:** Explicit Re-export is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

```js
export { add, subtract } from "./math.js";
```

Explicit re-exports make the public surface easier to audit.

## 37. Default Re-export

**Definition:** Default Re-export is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

Default exports require explicit syntax when re-exporting. Keep default handling clear so readers know which public binding is being exposed.

## 38. Barrel Files

**Definition:** Barrel Files is a module-system concept that affects how JavaScript code is defined, resolved, loaded, evaluated, or exposed between files.

A barrel is commonly an `index.js` module that re-exports a feature's public API from internal modules.

## 39. Barrel Benefits

A barrel can provide a stable, convenient entry point such as `import { Button } from "./components"`. It can hide internal file layout from consumers.

## 40. Barrel Costs

Large barrels can hide real dependency relationships and may cause broader loading or tooling effects. Use them where the convenience outweighs the complexity.

## 41. Live Bindings

ESM imports are **live bindings**. An importer observes the current binding maintained by the exporting module rather than receiving an independent assignment copy.

## 42. Imported Binding Assignment

An imported binding cannot be reassigned by the importer. `count = 10` is invalid if `count` was imported. The exporting module controls that binding.

## 43. Mutation vs Reassignment

A binding and the value it refers to are different concepts. An imported object binding cannot be reassigned, but the object itself may be mutable if the exporting module exposes such an object.

## 44. Live Binding Example

```js
// counter.js
export let count = 0;
export function increment() { count++; }

// main.js
import { count, increment } from "./counter.js";
console.log(count); // 0
increment();
console.log(count); // 1
```

The importer observes the live exported binding.

## 45. Static Import Syntax

Static `import` declarations belong at module top level. They describe dependencies as part of the module's static structure.

## 46. Why Imports Are Static

Static structure lets hosts and build tools analyze dependency relationships without executing arbitrary application branches first. This supports linking, optimization, and tooling.

## 47. Dynamic Import

```js
const module = await import("./feature.js");
```

Dynamic `import()` is an expression that loads a module asynchronously and returns a Promise.

## 48. Dynamic Import Result

The Promise returned by `import()` fulfills with a module namespace object. Access its named exports through properties or destructure the result.

## 49. Dynamic Import Use

Use dynamic import for optional features, lazy-loaded routes, large editors, charts, or code that is not needed during initial startup.

## 50. Dynamic Import vs Require

`import()` is asynchronous and Promise-based. Traditional CommonJS `require()` is runtime-oriented and normally synchronous. Do not treat them as identical APIs.

## 51. Top-Level Await

ES modules can use `await` at top level in environments that support top-level await. This is useful when module initialization genuinely depends on asynchronous preparation.

## 52. Top-Level Await Effect

A module using top-level await can delay completion of its evaluation until the awaited operation settles. This can affect modules that depend on it.

## 53. TLA and Graphs

Top-level await interacts with the module graph. A dependent module may have to wait for an asynchronous dependency to finish evaluation, so use TLA deliberately.

## 54. Module Evaluation

Conceptually, module loading resolves dependencies, linking connects imports to exports, and evaluation executes module code. Understanding these phases makes initialization bugs easier to reason about.

## 55. Evaluation Order

Dependencies are evaluated according to the module graph before the dependent module can complete its own normal evaluation. Cycles require special care because bindings may exist before their values are initialized.

## 56. Side Effects

Top-level code in a module can execute simply because the module is imported. Examples include registering event handlers, modifying global configuration, or logging.

## 57. Side-Effect Import

```js
import "./setup.js";
```

This syntax intentionally imports a module for its side effects without binding an exported value locally.

## 58. Side Effects and Bundlers

A bundler cannot blindly remove every unused-looking module because importing it may perform required side effects. Package metadata and tool assumptions can influence tree shaking.

## 59. Module Singleton Concept

Within a given module graph and host/module cache model, a module is normally evaluated once and its resulting module instance can be shared by multiple importers. Exact cache identity is host-specific.

## 60. Shared Module State

A stateful module can expose functions that read or update private state. Multiple importers can interact with the same evaluated module instance.

## 61. Stateful Module

```js
let token = null;
export function setToken(value) { token = value; }
export function getToken() { return token; }
```

This is useful for controlled shared state, but global-like module state should be designed carefully.

## 62. Private by Default

Top-level declarations that are not exported are private to the module's normal import interface. This provides a natural encapsulation boundary.

## 63. Public API by Exports

The exported names form an important public API. Export only what consumers need so internal implementation can evolve without unnecessary coupling.

## 64. Module Initialization

Module initialization happens during evaluation. Do not assume an imported function's body runs merely because the module was loaded; top-level initialization and function execution are separate events.

## 65. Initialization Ordering

Initialization order matters when modules perform side effects or read shared state during evaluation. Prefer explicit initialization functions when ordering must be controlled.

## 66. Circular Dependencies

A circular dependency occurs when module A depends on B while B directly or indirectly depends on A.

## 67. Why Cycles Are Difficult

Cycles can expose bindings before expected initialization has completed. The resulting behavior can involve TDZ errors, undefined state, or surprising partially initialized modules depending on the exact graph.

## 68. Cycle Debugging

Draw the dependency graph, identify the cycle, and ask which responsibility created it. Then isolate shared contracts or move common functionality into a lower-level module.

## 69. Avoiding Cycles

Prefer one-way dependency direction. If two modules need each other, look for a shared abstraction, event boundary, dependency injection point, or better responsibility split.

## 70. Module TDZ

Lexical declarations in modules follow initialization rules such as the temporal dead zone. A binding that exists conceptually but has not been initialized cannot be read safely yet.

## 71. Module Strictness

ES modules are always interpreted in strict mode. You do not need to add a top-level `"use strict"` directive to an ESM file.

## 72. Strict Mode Consequence

Strict-mode semantics affect assignment errors, `this`, duplicate restrictions, and other behavior. Module code automatically receives these strict semantics.

## 73. Top-Level this

Top-level `this` in an ES module is `undefined`. Do not copy classic browser-script assumptions into module code.

## 74. Global Variables in Modules

A module's top-level variables do not normally become properties on the browser's global object. This reduces accidental global namespace pollution.

## 75. Browser Module Script

Use:
```html
<script type="module" src="./main.js"></script>
```

This tells the browser to parse the referenced file as an ES module.

## 76. Module Script Deferred

Module scripts are deferred by default. The browser can parse the document while module dependencies are fetched, subject to the details of loading and execution.

## 77. Module Script Execution

The browser resolves and fetches module dependencies before completing module evaluation. Errors in a dependency can prevent the dependent module from executing normally.

## 78. Module CORS

Browser module fetching follows web security and CORS rules. A URL that works as a classic script or resource in one context is not automatically valid as a module dependency.

## 79. Same-Origin Imports

Relative module imports resolve to URLs and are subject to browser origin and fetch policy. Server configuration matters when modules are served across origins.

## 80. Module Specifier

A module specifier is the string supplied to `import` or `export ... from` that identifies a dependency. Its interpretation depends on the host.

## 81. Relative Specifier

`./utils.js` and `../config.js` are relative specifiers. In browser-native ESM they resolve relative to the importing module's URL.

## 82. Absolute URL Specifier

Browsers can resolve absolute URL specifiers such as `https://example.com/lib.js`, subject to browser security, fetch, and CORS requirements.

## 83. Bare Specifier

A name such as `react` is a bare specifier. Native browser resolution does not automatically treat it as a filesystem package path; tooling or import maps can provide that mapping.

## 84. Browser Bare Specifiers

In browsers, import maps can map names to URLs. Bundlers and development servers can also implement package-style resolution.

## 85. Import Maps

Import maps provide browser-supported mappings from specifier names to URLs. They are useful when you want readable package-like imports without a bundler performing the mapping.

## 86. File Extensions

Native browser ESM commonly requires correctly resolved URLs, so explicit file extensions such as `.js` are often important. Node and bundlers may have different resolution rules.

## 87. Node ESM

Node.js supports native ESM with package and file-resolution rules that differ from browser URL resolution in important ways.

## 88. Node package type

In Node, a package-level `"type": "module"` makes `.js` files in that package scope ESM by default. Package boundaries therefore affect interpretation.

## 89. MJS

A `.mjs` file is treated as an ES module in Node. It is a useful explicit signal when a project contains mixed module formats.

## 90. CJS Extension

A `.cjs` file is treated as CommonJS in Node, even when the surrounding package defaults `.js` to ESM.

## 91. Package Boundary

Node determines module interpretation using package metadata, file extensions, and resolution rules. Inspect the nearest relevant `package.json` when debugging module-format errors.

## 92. Node require

CommonJS commonly loads dependencies with:
```js
const math = require("./math.cjs");
```

This is a CommonJS mechanism, not ESM static import syntax.

## 93. module.exports

CommonJS exposes a module's public value through `module.exports`.

```js
module.exports = { add, subtract };
```

## 94. exports Alias

At the beginning of a CommonJS module, `exports` references the same object as `module.exports`. This explains why `exports.add = add` works initially.

## 95. exports Property

```js
exports.add = (a, b) => a + b;
```

This adds a property to the object currently referenced by `module.exports`.

## 96. exports Assignment Trap

`exports = { add }` only reassigns the local `exports` variable. It does not replace `module.exports`.

## 97. Replacing module.exports

Use:
```js
module.exports = add;
```

when the complete CommonJS export value should be replaced by the function.

## 98. CommonJS Caching

Node CommonJS modules are cached after loading. Requiring the same resolved module again normally reuses the cached module instance.

## 99. CommonJS Runtime Loading

Because `require()` is an ordinary runtime-oriented function, CommonJS can load modules conditionally. This differs from the static structure of ESM imports.

## 100. ESM CommonJS Interop

ESM/CommonJS interoperability depends on Node's rules, package format, and the direction of the import. Do not assume every CommonJS export maps perfectly to an ESM named export.

## 101. Interop Is Not Symmetric

Loading CommonJS from ESM and loading ESM from CommonJS have different constraints. Check the host documentation and package format when mixing systems.

## 102. import.meta

`import.meta` provides host-defined metadata for the current ES module. It is available only in module contexts.

## 103. import.meta.url

In browsers and Node ESM, `import.meta.url` identifies the current module as a URL string. It is useful for resolving resources relative to the module.

## 104. Node __dirname

Native Node ESM does not provide the CommonJS `__dirname` global automatically. ESM code commonly derives paths from `import.meta.url` when needed.

## 105. Node __filename

Native Node ESM does not provide CommonJS `__filename` automatically. Use ESM-appropriate URL/path utilities when a filesystem path is required.

## 106. ESM File Paths

Node ESM treats module locations as URLs. When converting to filesystem paths, use Node's URL/path APIs rather than assuming CommonJS globals exist.

## 107. createRequire

Node provides `createRequire` for cases where ESM code needs controlled CommonJS-style requiring. Use it for genuine interoperability needs rather than mixing formats casually.

## 108. Package Exports

The `exports` field in `package.json` can define the public entry points consumers are allowed to import. It helps package authors protect internal files.

## 109. Package Imports

Node's `imports` field can define supported internal aliases for a package. It is useful for keeping internal paths stable and readable.

## 110. Encapsulation With Exports

A package can expose a small public surface while keeping implementation files internal. This reduces accidental consumer coupling to file layout.

## 111. Resolution Is Host-Specific

ECMAScript defines module syntax and semantics, but each host defines important resolution and loading behavior. Browser URLs, Node packages, and bundlers are not interchangeable.

## 112. Bundler Resolution

Bundlers can resolve aliases, packages, extensions, and virtual modules according to their configuration. Always distinguish bundler convenience from native language semantics.

## 113. Transpiler Role

A transpiler transforms source code syntax or constructs for a target environment. It is a build transformation tool, not the definition of the JavaScript module system.

## 114. Babel

Babel transforms JavaScript using plugins and presets. Depending on configuration, it can transform module syntax as part of a broader build process.

## 115. Vite

Vite provides a development server and production build pipeline. It uses modern module workflows during development and builds optimized assets for deployment.

## 116. Webpack

Webpack builds a dependency graph and emits bundles or chunks according to its configuration and loaders/plugins.

## 117. Rollup

Rollup focuses strongly on module-graph analysis and is widely used for library-oriented bundling and output optimization.

## 118. Bundling

Bundling combines module graph resources into deployable output assets. The goal can include fewer requests, optimized code, compatibility transformations, and better caching strategies.

## 119. Tree Shaking

Tree shaking removes statically provable unused exports or code in supporting build tools. ESM's static import/export structure makes this analysis easier.

## 120. Static Structure and Tree Shaking

Build tools can inspect static ESM imports and exports without executing arbitrary runtime branches. This enables stronger dead-code analysis than unconstrained dynamic loading.

## 121. Dead Code Elimination

Dead-code elimination removes code a tool can prove is unreachable or unused under its assumptions. It is a build optimization, not a runtime JavaScript feature.

## 122. Tree Shaking and Side Effects

Unused-looking code may still be necessary if importing it has side effects. Package metadata and bundler configuration can affect whether such code is retained.

## 123. Code Splitting

Code splitting divides build output into multiple chunks that can be loaded independently. It is especially useful for large applications.

## 124. Lazy Loading

Dynamic import is a common way to load optional functionality only when the user needs it. This can reduce initial JavaScript cost.

## 125. Route Splitting

Frontend routers can dynamically import route components so users download code for a route near the time it is needed.

## 126. Feature Splitting

Large editors, charts, admin tools, or media features can be placed in separate modules and dynamically imported on demand.

## 127. Preloading

Tooling or application code can preload a likely-needed module before the user explicitly requests it. Preloading is a performance strategy, not a requirement of modules.

## 128. Module Performance

More modules are not automatically slower. Good boundaries improve maintainability, caching, and optimization, but module loading, parsing, compilation, execution, and network transfer still have costs.

## 129. Network Cost

On the web, module requests consume network resources. HTTP/2 and HTTP/3 change the tradeoffs, while bundling and code splitting determine how much code is transferred initially.

## 130. Parse Compile Cost

Downloaded JavaScript also costs CPU time to parse, compile, and execute. Avoid shipping large amounts of code that the initial screen does not need.

## 131. Avoid Giant Entry Modules

A giant entry module can force unrelated features into the initial dependency graph. Keep the initial path focused on startup-critical behavior.

## 132. Meaningful Boundaries

Split code by responsibility rather than by arbitrary line count. A module should have a cohesive reason to change.

## 133. Dependency Inversion

Higher-level modules can depend on imported abstractions or factories rather than hard-coding low-level implementations. This improves testing and architectural flexibility.

## 134. Service Module

A service module can encapsulate API calls and expose focused operations such as `getUser()` or `createOrder()` without leaking transport details everywhere.

## 135. Controller Module

A controller module can coordinate input, application logic, and output. It should not become a dumping ground for database, UI, validation, and infrastructure code.

## 136. Domain Module

Domain modules contain business rules that should remain independent from transport or presentation details when practical.

## 137. Utility Module

Utilities should have narrow, predictable responsibilities. A file named `utils.js` containing every unrelated helper usually signals poor boundaries.

## 138. Configuration Module

A configuration module can centralize stable configuration values or validated environment-derived settings. Never place private secrets in browser-delivered configuration.

## 139. Feature Architecture

Feature-based architecture groups modules around user-facing capabilities such as authentication, notes, billing, or analytics. This can match how teams change the product.

## 140. Layer Architecture

Layer-based architecture groups code into concerns such as UI, application, domain, and infrastructure. Choose it when dependency direction and separation of concerns benefit from those layers.

## 141. Module Pattern

The classic module pattern uses closures to hide state and expose a public API. Modern ESM provides a native file-level encapsulation mechanism and explicit dependency syntax.

## 142. Closure vs Module Privacy

Closures hide variables inside function scopes; modules hide top-level declarations behind the module boundary. Both can implement encapsulation, but they solve different structural problems.

## 143. Testing Module Boundaries

Test public behavior through exported APIs whenever possible. Tests that depend heavily on private implementation details become fragile during refactoring.

## 144. Mocking Dependencies

Testing tools can replace or intercept imports, but exact APIs are tool-specific. Design modules with explicit dependencies so tests do not need to manipulate hidden globals.

## 145. Import Boundary Contract

An import is a dependency contract. When consumers rely on a small stable export surface, internal implementation can change with less breakage.

## 146. Circular Test Smell

If a module is extremely difficult to test without loading a large graph, its responsibilities or dependency direction may need refactoring.

## 147. Module Naming

Use names that communicate responsibility, such as `userService.js`, `formatCurrency.js`, or `authRepository.js`. Avoid vague names that conceal module purpose.

## 148. Single Responsibility

A module should have a cohesive reason to change. This does not mean every function requires a separate file; cohesion matters more than file count.

## 149. Avoid God Modules

Do not place unrelated API calls, UI logic, business rules, database access, and formatting in one giant module.

## 150. Avoid Utility Dumping Grounds

If a utility module contains unrelated validation, formatting, storage, network, and DOM helpers, split it into cohesive modules with clear dependency direction.

## 151. Explicit Dependencies

Prefer visible imports over hidden globals or side-channel dependencies. Readers should be able to inspect a module and understand its important external inputs.

## 152. Dependency Direction

Choose a dependency direction and preserve it. If low-level modules start importing high-level UI modules, architectural boundaries can collapse.

## 153. Public vs Internal Files

Not every file in an application or package should be part of the public API. Use entry points and package export maps to distinguish supported interfaces from implementation details.

## 154. Index Entry Point

An `index.js` entry point can expose a stable API while internal file organization changes. Keep its exports intentional rather than automatically re-exporting everything.

## 155. Barrel Performance Caveat

Large barrel files can make dependency relationships less obvious and can affect what tooling considers reachable. Measure and inspect build output before blaming barrels automatically.

## 156. Module Security

Imports execute code. Treat your dependency graph as part of the trusted computing base and review third-party packages accordingly.

## 157. Dependency Supply Chain

Third-party dependencies can introduce vulnerabilities or malicious behavior. Use trusted sources, review updates, maintain lockfiles, and minimize unnecessary dependencies.

## 158. Lockfiles

Lockfiles record resolved dependency versions so installations can be more reproducible. Keep them under version control for applications unless your package-management strategy explicitly says otherwise.

## 159. Dynamic Import Security

Do not build unrestricted dynamic import paths from untrusted input. Allow-list known modules or map user choices to fixed module specifiers.

## 160. Path Traversal

Server-side module loading must not turn user-controlled strings into arbitrary filesystem module paths. Validate and constrain any path-derived loading behavior.

## 161. Prototype Pollution via Dependencies

A dependency can introduce unsafe object manipulation or prototype-pollution vulnerabilities. Module boundaries do not automatically make imported code safe.

## 162. Secrets in Modules

Never hard-code credentials or private API secrets into frontend modules. Anything delivered to a browser should be considered observable by the user.

## 163. Browser Source Visibility

Frontend modules are delivered to clients and can be inspected. Use modules for organization and encapsulation, not as a mechanism for hiding secrets from users.

## 164. Debugging Missing Export

When an import fails, inspect the target file and confirm the requested binding is actually exported under that exact name. Check spelling and default-versus-named syntax first.

## 165. Debugging Default

If a default import fails, inspect whether the target module really has a default export. A named export called `formatter` is not automatically the default export.

## 166. Debugging Resolution

Check the exact specifier, extension, package metadata, current working context, host, and bundler configuration. Resolution errors are often environmental rather than syntax errors.

## 167. Debugging Cycle

Draw the dependency graph and identify the cycle. Determine whether a module reads an imported binding during initialization before the exporting module has initialized it.

## 168. Debugging Side Effects

Search for top-level function calls, registrations, mutations, and logging. Remember that these can execute simply because a module is imported.

## 169. Wrong Named Import

**Incorrect:**
```js
// math.js
export default function add(a, b) { return a + b; }

// main.js
import { add } from "./math.js";
```

The target has a default export, not a named export called `add`.

## 170. Correct Export Contract

**Correct:**
```js
// math.js
export function add(a, b) { return a + b; }
// main.js
import { add } from "./math.js";
```

Alternatively, keep the default export and use `import add from "./math.js"`.

## 171. Wrong Import Reassignment

**Incorrect:**
```js
import { count } from "./counter.js";
count = 10;
```

Imported bindings cannot be reassigned by the importer.

## 172. Correct State Update

**Correct:** export a function such as `setCount()` or `increment()` from the declaring module. The exporting module remains responsible for changing its binding.

## 173. Wrong Dynamic Import Assumption

**Incorrect:**
```js
const feature = import("./feature.js");
console.log(feature.run());
```

`feature` is a Promise, not the module namespace itself.

## 174. Correct Dynamic Import

**Correct:**
```js
const feature = await import("./feature.js");
feature.run();
```

The `await` can be used inside an async function or supported top-level-await context.

## 175. Wrong Browser Bare Import

**Incorrect assumption:** writing `import x from "some-package"` in a browser automatically means the browser will find an npm package. Native browser resolution does not work that way.

## 176. Correct Browser Import

Use a resolvable URL, a supported import map, or a development/build tool that intentionally implements package resolution.

## 177. Output Prediction

If `setup.js` contains `console.log("setup")` at top level and `main.js` imports it, the setup message can print during module evaluation even if `main.js` never calls an exported function.

## 178. Practice Named Exports

**Task:** Build a math module with five named functions and consume three from another module. Predict the output before running it, then rename one export and repair the consumer.

## 179. Practice Default

**Task:** Create a formatter module with one default formatter. Compare its import syntax with a version that uses a named export.

## 180. Practice Namespace

**Task:** Build a `validators` module with multiple named exports and consume it through `import * as validators`.

## 181. Practice Re-export

**Task:** Create a feature entry module that selectively re-exports functions from internal files. Make sure private helpers are not exposed.

## 182. Practice Live Binding

**Task:** Export a counter and an increment function. Import both and observe that the imported counter reflects updates made by the exporting module.

## 183. Practice Dynamic Import

**Task:** Build a page that dynamically imports a calculator feature only after the user clicks a button. Handle both successful loading and rejection.

## 184. Practice Top-Level Await

**Task:** Create a module that asynchronously prepares configuration before exporting a ready value. Observe how dependent module evaluation waits for it.

## 185. Practice Cycle

**Task:** Intentionally create two modules that import each other. Observe the initialization problem, draw the graph, then refactor to remove the cycle.

## 186. Practice CommonJS

**Task:** Create a `.cjs` module using both `exports.name = ...` and `module.exports = ...`. Predict which value consumers receive after each assignment.

## 187. Practice Node ESM

**Task:** Create a Node project with `"type": "module"`, use `.js` ESM files, and test named/default imports.

## 188. Practice CJS

**Task:** Create a `.cjs` module and consume it with `require()`. Compare its API shape with the equivalent ESM module.

## 189. Mini Project Math Library

Build a reusable math library with named exports, validation, tests, a public entry point, and a small consumer. Document which helpers are public and which remain internal.

## 190. Mini Project Feature Loader

Build a UI that dynamically imports separate calculator, notes, and chart features. Display loading and error states and explain why each feature is lazy-loaded.

## 191. Mini Project Service Architecture

Split a small application into API, service, domain, and UI modules. Draw the dependency direction before writing code and reject accidental reverse dependencies.

## 192. Mini Project Plugin System

Create a plugin registry where each plugin exports a known interface. Load plugins from a controlled list and validate that required functions exist.

## 193. Mini Project Cache Demo

Create a stateful cache module and import it from two consumers. Demonstrate shared state, then explain when shared module state becomes a design problem.

## 194. Refactor Large Script

Take one large script and split it into cohesive modules without changing behavior. Add tests before refactoring so regressions are visible.

## 195. Refactor Hidden Globals

Replace global variables with explicit imports and parameters. Make every important dependency visible in the module interface.

## 196. Refactor Cycles

Identify a dependency cycle, extract a shared abstraction or move a responsibility downward, then redraw the dependency graph to verify the cycle is gone.

## 197. Refactor Public API

Reduce a module's exports to the smallest stable interface consumers actually need. Keep implementation details private.

## 198. Best Practice Explicit Exports

Export intentionally rather than exposing every implementation detail. A smaller public surface is easier to understand, test, and maintain.

## 199. Best Practice Stable APIs

Treat public exports as contracts. Changes to names, behavior, or signatures can affect every consumer, so evolve them deliberately.

## 200. Best Practice Cohesion

Keep closely related behavior together. A cohesive module is easier to name, test, document, and replace.

## 201. Best Practice Dependency Clarity

Make important dependencies visible through imports. Avoid hidden globals and surprising side effects.

## 202. Best Practice Avoid Side Effects

Prefer explicit initialization functions over surprising top-level work when ordering matters. Side effects are sometimes necessary, but they should be deliberate.

## 203. Best Practice Dynamic Import

Use dynamic import for genuinely optional or heavy code. Do not make ordinary dependencies dynamic merely to appear advanced.

## 204. Best Practice Environment Awareness

Always know whether your code runs natively in a browser, Node, a bundler, or multiple environments. Resolution and loading behavior can differ substantially.

## 205. Best Practice Package Boundaries

When publishing a package, use supported package entry points and export maps where appropriate. Do not force consumers to depend on private file paths.

## 206. Interview ESM

**Question:** Why are ESM imports considered statically analyzable?

**Answer target:** Explain that static import/export declarations have fixed syntactic structure, allowing dependency analysis before normal application execution.

## 207. Interview Live Binding

**Question:** What is a live binding and why can an importer not reassign it?

**Answer target:** Explain that the import refers to an exported binding maintained by the exporting module, while assignment authority remains with that module.

## 208. Interview Default Export

**Question:** What is the practical difference between default and named exports?

**Answer target:** Explain that named imports refer to explicit exported names, while a default export represents one default binding and can be locally named differently.

## 209. Interview Dynamic Import

**Question:** What does dynamic `import()` return?

**Answer target:** A Promise that fulfills with a module namespace object. Explain lazy loading and code splitting as common use cases.

## 210. Interview TLA

**Question:** How can top-level await affect a module dependency graph?

**Answer target:** Explain that asynchronous module evaluation can delay dependents until the awaited initialization settles.

## 211. Interview CommonJS

**Question:** What is the difference between `exports` and `module.exports`?

**Answer target:** Explain the initial alias and why `exports.foo = foo` works while `exports = foo` does not replace the exported value.

## 212. Interview Node Resolution

**Question:** How do `.mjs`, `.cjs`, and package `"type"` influence Node behavior?

**Answer target:** Explain the package/file rules that determine whether `.js` is ESM or CommonJS and how explicit extensions override ambiguity.

## 213. Interview Tree Shaking

**Question:** Why does ESM generally help bundlers perform tree shaking?

**Answer target:** Explain that static import/export structure makes unused exports easier to identify without executing arbitrary runtime code.

## 214. Interview Circular Dependencies

**Question:** Why can circular dependencies produce initialization problems?

**Answer target:** Explain that modules can depend on each other before all lexical bindings have been initialized, producing TDZ errors or partially initialized state.

## 215. Interview Module Scope

**Question:** Why does a module's top-level variable not normally become a browser global property?

**Answer target:** Explain that modules have their own top-level lexical scope rather than classic-script global binding behavior.

## 216. Teach Modules

Explain modules to a beginner using a box-and-public-door analogy: code inside the box is private, exports are the public doors, and imports are connections to another box's public API.

## 217. Teach Exports

Explain that exporting is a deliberate API decision. Demonstrate a module with one private helper and one public function, then ask the learner why the helper does not need to be exported.

## 218. Teach Live Bindings

Explain live bindings without saying that ESM simply copies a value. Use a counter example and show that the importer observes the exporting module's current binding.

## 219. Teach Dynamic Import

Explain that dynamic import returns a Promise because module loading is asynchronous in the relevant host workflow. Show how `await import()` obtains the namespace after loading.

## 220. Teach CommonJS

Explain the `exports` alias trap with a tiny example. Emphasize that `exports` initially points at `module.exports`, but assigning a new value to `exports` does not replace `module.exports`.

## 221. Mastery Syntax

Write named, default, namespace, aliased, and re-export syntax from memory. Then create a producer and consumer for each form.

## 222. Mastery Semantics

Explain module scope, live bindings, evaluation order, top-level await, side effects, and circular dependencies without looking at notes.

## 223. Mastery Browser

Create a native browser ESM example using `<script type="module">`, relative imports, and correct serving. Diagnose one intentional resolution or CORS error.

## 224. Mastery Node

Create a Node project using ESM and another using CommonJS. Explain `.js`, `.mjs`, `.cjs`, and `package.json` `"type"` behavior.

## 225. Mastery Tooling

Explain what bundlers, transpilers, tree shaking, code splitting, and lazy loading do. Be able to separate language semantics from build-tool behavior.

## 226. Mastery Architecture

Design module boundaries for a real application. Identify public APIs, private implementation, dependency direction, and likely cycle points before writing code.

## 227. Mastery Security

Identify dependency supply-chain risk, unsafe dynamic imports, path traversal risk, prototype-pollution risk, and accidental frontend secret exposure.

## 228. Mastery Teaching

Teach ESM versus CommonJS to a beginner using runnable examples. Correctly explain live bindings, default/named exports, Node format selection, and interoperability limitations.

## 229. Final Mental Model

The complete flow is: **source files → resolve specifiers → build the module graph → link imports to exports → evaluate dependencies → initialize bindings → execute dependent modules → expose live bindings → runtime behavior**.

Keep this model in mind whenever you debug imports, exports, resolution, circular dependencies, dynamic loading, Node formats, or bundler behavior.

# Final Module Mastery Checklist

- [ ] I can explain what a module is and why modules exist.
- [ ] I can write named, default, namespace, aliased, and re-export syntax.
- [ ] I understand ESM live bindings and why imported bindings cannot be reassigned.
- [ ] I can explain static imports versus dynamic `import()`.
- [ ] I understand top-level await and its effect on module evaluation.
- [ ] I can reason about module graphs, evaluation order, and circular dependencies.
- [ ] I can use browser `<script type="module">` correctly.
- [ ] I understand Node `.js`, `.mjs`, `.cjs`, and `"type": "module"`.
- [ ] I can explain `exports` versus `module.exports`.
- [ ] I understand `import.meta.url` and the absence of CommonJS `__dirname`/`__filename` in native Node ESM.
- [ ] I can explain package `exports`/`imports` at a conceptual level.
- [ ] I understand what bundlers, transpilers, tree shaking, and code splitting do.
- [ ] I can design feature, domain, service, and controller boundaries.
- [ ] I can identify dependency-cycle, side-effect, security, and performance problems.
- [ ] I can refactor a large script into cohesive modules.
- [ ] I can teach ESM vs CommonJS without mixing their semantics.

# Final Teaching Challenge

Create a small application with at least 8 modules. Include named exports, one default export, a barrel entry point, one dynamic import, one stateful module, tests, and a documented public API. Draw its dependency graph. Then explain why every edge exists and where you would change the architecture if a circular dependency appeared.
