//* ============================================================
//* JAVASCRIPT SCOPE & EXECUTION — PRACTICAL COMPANION
//* ============================================================

//* Goal:
//* Understand where variables are accessible, how JavaScript creates
//* execution contexts, how the scope chain works, and how closures,
//* hoisting, `this`, and the call stack connect to function execution.


//* ------------------------------------------------------------
//* 1. WHAT IS SCOPE?
//* ------------------------------------------------------------

//* Scope is the set of rules that determines where an identifier
//* (such as a variable or function name) can be accessed in code.

const globalValue = "Global";

function showScope() {
  const functionValue = "Function";
  console.log(globalValue);   // Global
  console.log(functionValue); // Function
}

showScope();

//* `functionValue` is not accessible outside its function.
//* console.log(functionValue); // ReferenceError


//* ------------------------------------------------------------
//* 2. GLOBAL SCOPE
//* ------------------------------------------------------------

//* A binding declared at the top level belongs to the relevant
//* top-level scope of the script/module.

const appName = "JS Mastery";

function printAppName() {
  console.log(appName);
}

printAppName();

//* Top-level behavior differs between classic scripts and ES modules.
//* Do not assume every top-level `let`/`const` becomes a browser
//* `window` property.


//* ------------------------------------------------------------
//* 3. FUNCTION SCOPE
//* ------------------------------------------------------------

function functionScopeExample() {
  var functionScoped = "I belong to this function";
  console.log(functionScoped);
}

functionScopeExample();

//* `var` is function-scoped.
//* console.log(functionScoped); // ReferenceError


//* ------------------------------------------------------------
//* 4. BLOCK SCOPE
//* ------------------------------------------------------------

if (true) {
  let blockValue = "inside block";
  const anotherBlockValue = 100;

  console.log(blockValue);
  console.log(anotherBlockValue);
}

//* `let` and `const` are block-scoped.
//* console.log(blockValue); // ReferenceError


//* ------------------------------------------------------------
//* 5. var VS let/const SCOPE
//* ------------------------------------------------------------

if (true) {
  var oldStyle = "var escapes this block";
  let modernStyle = "let stays in this block";
}

console.log(oldStyle); // var is function-scoped; here it is in the script scope.
//* console.log(modernStyle); // ReferenceError


//* ------------------------------------------------------------
//* 6. LEXICAL SCOPE
//* ------------------------------------------------------------

//* JavaScript uses lexical scope: the structure of the source code
//* determines which outer bindings a nested function can access.

const outerMessage = "Hello from outer scope";

function outerFunction() {
  const middleMessage = "Hello from middle scope";

  function innerFunction() {
    const innerMessage = "Hello from inner scope";

    console.log(outerMessage);
    console.log(middleMessage);
    console.log(innerMessage);
  }

  innerFunction();
}

outerFunction();


//* ------------------------------------------------------------
//* 7. SCOPE CHAIN
//* ------------------------------------------------------------

//* When JavaScript evaluates an identifier, it searches the current
//* lexical environment and then continues outward through enclosing
//* environments until it finds a matching binding or reaches the end.

const level1 = "one";

function levelTwo() {
  const level2 = "two";

  function levelThree() {
    const level3 = "three";
    console.log(level3, level2, level1);
  }

  levelThree();
}

levelTwo();


//* ------------------------------------------------------------
//* 8. SHADOWING
//* ------------------------------------------------------------

const message = "outer";

function shadowExample() {
  const message = "inner";
  console.log(message); // inner
}

shadowExample();
console.log(message); // outer

//* The inner `message` shadows the outer `message` within its scope.


//* ------------------------------------------------------------
//* 9. BLOCK SHADOWING
//* ------------------------------------------------------------

let score = 50;

{
  let score = 100;
  console.log(score); // 100
}

console.log(score); // 50


//* ------------------------------------------------------------
//* 10. ILLEGAL SHADOWING
//* ------------------------------------------------------------

//* Some combinations of lexical declarations and `var` declarations
//* are syntax errors because their scopes would conflict.

//* Example that must NOT be executed:
//* let value = 1;
//* {
//*   var value = 2;
//* }


//* ------------------------------------------------------------
//* 11. HOISTING — THE IMPORTANT IDEA
//* ------------------------------------------------------------

//* Hoisting is a useful model for understanding that JavaScript
//* establishes bindings before executing statements in a scope.
//* Different declarations have different initialization behavior.

console.log(hoistedVar); // undefined
var hoistedVar = 10;

//* This does NOT mean the assignment moved upward.
//* Conceptually, the binding exists before execution reaches the line.


//* ------------------------------------------------------------
//* 12. let/const AND THE TDZ
//* ------------------------------------------------------------

//* `let` and `const` bindings are created for their scope but remain
//* uninitialized until execution reaches their declaration.
//* Access before initialization is in the Temporal Dead Zone (TDZ).

//* Do not run this:
//* console.log(tdzValue); // ReferenceError
//* let tdzValue = 10;

const initializedValue = 20;
console.log(initializedValue);


//* ------------------------------------------------------------
//* 13. FUNCTION DECLARATION HOISTING
//* ------------------------------------------------------------

console.log(getGreeting()); // Works

function getGreeting() {
  return "Hello";
}

//* Function declarations are initialized so they can normally be
//* called before their source position in the same applicable scope.


//* ------------------------------------------------------------
//* 14. FUNCTION EXPRESSION INITIALIZATION
//* ------------------------------------------------------------

//* A function expression stored in a `const`/`let` binding follows
//* that binding's initialization rules.

//* Do not run this:
//* console.log(calculate(2, 3));
//* const calculate = (a, b) => a + b;

const calculate = (a, b) => a + b;
console.log(calculate(2, 3));


//* ------------------------------------------------------------
//* 15. EXECUTION CONTEXT — CONCEPT
//* ------------------------------------------------------------

//* An execution context is the specification-level machinery used
//* while JavaScript evaluates code. It provides the environment in
//* which code executes and tracks relevant execution state.

//* At a beginner level, think:
//* code to execute + lexical environment + execution state.


//* ------------------------------------------------------------
//* 16. GLOBAL EXECUTION
//* ------------------------------------------------------------

//* When a script starts, JavaScript establishes the necessary global
//* execution environment before evaluating the top-level code.

const language = "JavaScript";
console.log(language);


//* ------------------------------------------------------------
//* 17. FUNCTION EXECUTION
//* ------------------------------------------------------------

function calculatePrice(price, tax) {
  const total = price + tax;
  return total;
}

console.log(calculatePrice(100, 18));

//* Each invocation gets its own execution state and parameter bindings.


//* ------------------------------------------------------------
//* 18. EACH CALL HAS ITS OWN PARAMETERS/LOCALS
//* ------------------------------------------------------------

function createLabel(name) {
  const label = `User: ${name}`;
  return label;
}

console.log(createLabel("Ravi"));
console.log(createLabel("Aman"));

//* The two calls have separate `name` and `label` bindings.


//* ------------------------------------------------------------
//* 19. CALL STACK
//* ------------------------------------------------------------

//* The call stack tracks active synchronous function calls.

function first() {
  console.log("first start");
  second();
  console.log("first end");
}

function second() {
  console.log("second start");
  third();
  console.log("second end");
}

function third() {
  console.log("third");
}

first();

//* Conceptual stack while `third()` runs:
//* third()
//* second()
//* first()
//* global execution


//* ------------------------------------------------------------
//* 20. CALL STACK IS LIFO
//* ------------------------------------------------------------

//* LIFO = Last In, First Out.
//* The most recently entered active function completes first.


//* ------------------------------------------------------------
//* 21. STACK OVERFLOW
//* ------------------------------------------------------------

//* Unbounded recursion can keep adding calls to the call stack until
//* the runtime throws an error such as `RangeError: Maximum call stack size exceeded`.

//* Never run this intentionally:
//* function forever() {
//*   forever();
//* }
//* forever();


//* ------------------------------------------------------------
//* 22. CLOSURE — CORE IDEA
//* ------------------------------------------------------------

//* A closure occurs when a function retains access to lexical bindings
//* from its surrounding scope after that surrounding function has returned.

function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const counterA = createCounter();

console.log(counterA()); // 1
console.log(counterA()); // 2
console.log(counterA()); // 3

//* `increment` retains access to `count`.


//* ------------------------------------------------------------
//* 23. CLOSURES CREATE INDEPENDENT STATE
//* ------------------------------------------------------------

function makeCounter() {
  let count = 0;

  return () => ++count;
}

const counter1 = makeCounter();
const counter2 = makeCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1

//* Each invocation of `makeCounter()` creates a separate lexical state.


//* ------------------------------------------------------------
//* 24. CLOSURE REAL-WORLD EXAMPLE
//* ------------------------------------------------------------

function createUserSession(userId) {
  let active = true;

  return {
    getUserId() {
      return userId;
    },
    isActive() {
      return active;
    },
    logout() {
      active = false;
    },
  };
}

const session = createUserSession("user-101");
console.log(session.getUserId());
console.log(session.isActive());
session.logout();
console.log(session.isActive());

//* Closure lets us keep `userId` and `active` private from direct
//* outside access while exposing controlled operations.


//* ------------------------------------------------------------
//* 25. CLOSURE + LOOP
//* ------------------------------------------------------------

const functions = [];

for (let i = 0; i < 3; i += 1) {
  functions.push(() => i);
}

console.log(functions[0]()); // 0
console.log(functions[1]()); // 1
console.log(functions[2]()); // 2

//* `let` in the loop creates per-iteration bindings, which these
//* closures retain.


//* ------------------------------------------------------------
//* 26. var LOOP CLOSURE DIFFERENCE
//* ------------------------------------------------------------

const varFunctions = [];

for (var i = 0; i < 3; i += 1) {
  varFunctions.push(() => i);
}

console.log(varFunctions[0]()); // 3
console.log(varFunctions[1]()); // 3
console.log(varFunctions[2]()); // 3

//* `var` has function/global scope rather than per-iteration lexical
//* bindings, so all callbacks above close over the same `i` binding.


//* ------------------------------------------------------------
//* 27. IIFE
//* ------------------------------------------------------------

//* IIFE = Immediately Invoked Function Expression.
//* It creates a function expression and calls it immediately.

(function () {
  const privateMessage = "Only inside the IIFE";
  console.log(privateMessage);
})();

//* IIFEs were historically used to create isolated scope before
//* block-scoped declarations and modules became common.


//* ------------------------------------------------------------
//* 28. MODULE SCOPE
//* ------------------------------------------------------------

//* ES modules have their own top-level module scope.
//* Top-level declarations are not automatically properties of the
//* browser's `window` object.

//* Example module file:
//* const secret = "module-only";
//* export const publicValue = 123;


//* ------------------------------------------------------------
//* 29. LEXICAL ENVIRONMENT VS "SCOPE"
//* ------------------------------------------------------------

//* In specification terminology, a lexical environment is an internal
//* mechanism that associates identifiers with bindings and links to an
//* outer environment. "Scope" is the developer-friendly way to discuss
//* where those bindings are accessible.


//* ------------------------------------------------------------
//* 30. VARIABLE ENVIRONMENT — HISTORICAL/IMPLEMENTATION MODEL
//* ------------------------------------------------------------

//* Older teaching material often presents "Variable Environment" and
//* "Lexical Environment" as separate boxes in every execution context.
//* Modern ECMAScript is more nuanced; use the specification's actual
//* environment records rather than assuming a simple two-box diagram.


//* ------------------------------------------------------------
//* 31. THIS — BASIC EXECUTION CONTEXT PREVIEW
//* ------------------------------------------------------------

//* `this` is not simply "the current function". Its value depends on
//* how a function is invoked (with important differences for arrows,
//* methods, constructors, and explicit binding).

const profile = {
  name: "Ravi",
  getName() {
    return this.name;
  },
};

console.log(profile.getName()); // Ravi

//* Detailed `this`, call/apply/bind, constructors, and advanced
//* invocation rules should be studied separately.


//* ------------------------------------------------------------
//* 32. REGULAR FUNCTION THIS VS ARROW THIS
//* ------------------------------------------------------------

const objectExample = {
  value: 10,
  regular() {
    return this.value;
  },
  arrow: () => this,
};

console.log(objectExample.regular());
console.log(objectExample.arrow());

//* Arrow functions capture `this` lexically; they do not create their
//* own `this` binding.


//* ------------------------------------------------------------
//* 33. PARAMETER SHADOWING
//* ------------------------------------------------------------

const outerName = "Outer";

function showName(outerName) {
  console.log(outerName);
}

showName("Parameter"); // Parameter
console.log(outerName); // Outer

//* The parameter binding shadows the outer binding inside the function.


//* ------------------------------------------------------------
//* 34. NESTED BLOCK SCOPE
//* ------------------------------------------------------------

let status = "outside";

if (true) {
  let status = "inside";

  if (true) {
    let status = "deep inside";
    console.log(status);
  }

  console.log(status);
}

console.log(status);


//* ------------------------------------------------------------
//* 35. LOOKUP FAILS -> ReferenceError
//* ------------------------------------------------------------

function findValue() {
  const available = 42;
  console.log(available);
}

findValue();

//* This would fail because `missingValue` has no accessible binding:
//* console.log(missingValue); // ReferenceError


//* ------------------------------------------------------------
//* 36. TYPEOF SPECIAL CASE
//* ------------------------------------------------------------

//* `typeof` can safely return "undefined" for an undeclared identifier
//* in many cases, rather than throwing ReferenceError.

console.log(typeof definitelyNotDeclared); // "undefined"

//* This does NOT make the identifier usable:
//* console.log(definitelyNotDeclared); // ReferenceError


//* ------------------------------------------------------------
//* 37. BLOCK SCOPE WITH for
//* ------------------------------------------------------------

for (let index = 0; index < 3; index += 1) {
  console.log(index);
}

//* `index` is not accessible after the loop.
//* console.log(index); // ReferenceError


//* ------------------------------------------------------------
//* 38. FUNCTION DECLARATIONS INSIDE BLOCKS
//* ------------------------------------------------------------

//* Block-level function declaration behavior is standardized but can
//* still be confusing when comparing old environments and legacy code.
//* Prefer declaring functions clearly at the intended scope.

{
  function insideBlock() {
    return "block function";
  }

  console.log(insideBlock());
}


//* ------------------------------------------------------------
//* 39. MUTATION VS REASSIGNMENT IN CLOSURES
//* ------------------------------------------------------------

function createSettings() {
  const settings = { theme: "dark" };

  return {
    getSettings() {
      return settings;
    },
    changeTheme(theme) {
      settings.theme = theme;
    },
  };
}

const settingsManager = createSettings();
settingsManager.changeTheme("light");
console.log(settingsManager.getSettings());

//* The closure retains the binding to `settings`; the object's property
//* can still be mutated because the binding itself is not reassigned.


//* ------------------------------------------------------------
//* 40. SCOPE AND CALLBACKS
//* ------------------------------------------------------------

function createGreeter(prefix) {
  return function (name) {
    return `${prefix}, ${name}`;
  };
}

const sayHi = createGreeter("Hi");
console.log(sayHi("Ravi"));

//* Callback and higher-order patterns depend heavily on lexical scope
//* and closures.


//* ------------------------------------------------------------
//* 41. EXECUTION ORDER
//* ------------------------------------------------------------

function outer() {
  console.log("A");
  inner();
  console.log("C");
}

function inner() {
  console.log("B");
}

outer(); // A -> B -> C

//* Synchronous function calls pause the current function while the
//* called function runs, then continue when it returns.


//* ------------------------------------------------------------
//* 42. RECURSION AND EXECUTION CONTEXTS
//* ------------------------------------------------------------

function sumTo(number) {
  if (number === 1) {
    return 1;
  }

  return number + sumTo(number - 1);
}

console.log(sumTo(4)); // 10

//* Each recursive invocation has its own call frame/execution state.


//* ------------------------------------------------------------
//* 43. STRICT MODE AND this
//* ------------------------------------------------------------

function strictThisDemo() {
  "use strict";
  return this;
}

console.log(strictThisDemo());

//* In a strict regular function called as a plain function, `this` is
//* undefined. Exact `this` behavior depends on the call form.


//* ------------------------------------------------------------
//* 44. GLOBAL OBJECT IS NOT THE SAME AS GLOBAL SCOPE
//* ------------------------------------------------------------

//* In browsers, `window` is a host global object. In modern JavaScript,
//* `globalThis` provides a standard way to access the global object.
//* Global scope and global-object properties are related but are not
//* identical concepts for all declarations.

console.log(typeof globalThis);


//* ------------------------------------------------------------
//* 45. PRACTICAL: PRIVATE COUNTER
//* ------------------------------------------------------------

function createDownloadTracker() {
  let downloads = 0;

  return {
    record() {
      downloads += 1;
    },
    getCount() {
      return downloads;
    },
  };
}

const tracker = createDownloadTracker();
tracker.record();
tracker.record();
console.log(tracker.getCount()); // 2

//* Outside code cannot directly access the `downloads` binding.


//* ------------------------------------------------------------
//* 46. PRACTICAL: CONFIG FACTORY
//* ------------------------------------------------------------

function createApiClient(baseUrl) {
  return {
    getUrl(path) {
      return `${baseUrl}${path}`;
    },
  };
}

const apiClient = createApiClient("https://example.com");
console.log(apiClient.getUrl("/users"));

//* The returned method closes over `baseUrl`.


//* ------------------------------------------------------------
//* 47. COMMON MISTAKE: ASSUMING var IS BLOCK-SCOPED
//* ------------------------------------------------------------

if (true) {
  var userRole = "admin";
}

console.log(userRole); // admin

//* If block isolation is required, use `let` or `const`.


//* ------------------------------------------------------------
//* 48. COMMON MISTAKE: CONFUSING DECLARATION WITH ASSIGNMENT
//* ------------------------------------------------------------

var valueA = 10;
console.log(valueA);

//* `var valueA` establishes a binding; `= 10` performs assignment.
//* Hoisting does not move the assignment before earlier statements.


//* ------------------------------------------------------------
//* 49. COMMON MISTAKE: TDZ MISUNDERSTANDING
//* ------------------------------------------------------------

function tdzExample() {
  // `value` exists as a lexical binding for this scope but is not
  // initialized until execution reaches its declaration.
  const value = 10;
  return value;
}

console.log(tdzExample());


//* ------------------------------------------------------------
//* 50. COMMON MISTAKE: CLOSURE DOES NOT COPY A VALUE AUTOMATICALLY
//* ------------------------------------------------------------

function createReader() {
  let value = 1;

  const read = () => value;
  value = 2;

  return read;
}

const readValue = createReader();
console.log(readValue()); // 2

//* The closure accesses the retained binding, not necessarily a frozen
//* snapshot of the old value.


//* ------------------------------------------------------------
//* 51. COMMON MISTAKE: CLOSURE MEMORY ASSUMPTION
//* ------------------------------------------------------------

//* A closure can keep referenced state reachable, but this does not
//* mean every closure automatically causes a memory leak.
//* Leaks happen when objects remain reachable longer than intended,
//* often through long-lived listeners, timers, caches, or references.


//* ------------------------------------------------------------
//* 52. DEBUGGING: SCOPE CHECKLIST
//* ------------------------------------------------------------

//* When you get `ReferenceError: x is not defined`, ask:
//* 1. Is the identifier spelled correctly?
//* 2. Was it declared?
//* 3. Is it inside another block/function/module?
//* 4. Is execution before a `let`/`const` initialization (TDZ)?
//* 5. Is the file actually loaded as the expected script/module?


//* ------------------------------------------------------------
//* 53. OUTPUT PREDICTION
//* ------------------------------------------------------------

const prediction = "global";

function predict() {
  const prediction = "local";
  return prediction;
}

console.log(prediction); // ?
console.log(predict());  // ?

//* Answer: global, local.


//* ------------------------------------------------------------
//* 54. OUTPUT PREDICTION — CLOSURE
//* ------------------------------------------------------------

function makeNumber() {
  let number = 10;

  return () => {
    number += 5;
    return number;
  };
}

const getNumber = makeNumber();
console.log(getNumber()); // 15
console.log(getNumber()); // 20


//* ------------------------------------------------------------
//* 55. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1:
//* Create nested functions where the innermost function can access
//* variables from all three levels.

//* Challenge 2:
//* Build a closure-based counter with increment, decrement, and reset.

//* Challenge 3:
//* Create a function that returns a private API key reader without
//* exposing the original variable directly.

//* Challenge 4:
//* Predict the output of a `var` loop containing callbacks, then
//* rewrite it with `let` and explain the difference.

//* Challenge 5:
//* Write one example demonstrating shadowing and one demonstrating
//* block scope.

//* Challenge 6:
//* Explain why a function declaration can be called before its source
//* position while a `const` arrow function cannot.

//* Challenge 7:
//* Trace the call stack for a three-function synchronous call chain.


//* ------------------------------------------------------------
//* 56. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1:
//* function test() {
//*   console.log(name);
//*   const name = "Ravi";
//* }
//* test();
//* Question: Why is this a ReferenceError rather than undefined?

//* Debug 2:
//* if (true) {
//*   let secret = 123;
//* }
//* console.log(secret);
//* Question: Which scope rule is violated?

//* Debug 3:
//* function create() {
//*   let count = 0;
//*   return () => ++count;
//* }
//* const a = create();
//* const b = create();
//* Question: Why are `a()` and `b()` independent?

//* Debug 4:
//* const callbacks = [];
//* for (var i = 0; i < 3; i++) {
//*   callbacks.push(() => i);
//* }
//* Question: Why does every callback return 3?


//* ------------------------------------------------------------
//* 57. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is scope?
//* 2. What is lexical scope?
//* 3. What is the scope chain?
//* 4. What is the difference between function scope and block scope?
//* 5. Why is `var` different from `let` and `const`?
//* 6. What is shadowing?
//* 7. What is hoisting?
//* 8. What is the Temporal Dead Zone?
//* 9. Why can function declarations usually be called before declaration?
//* 10. Why can a `const` function expression not be called before initialization?
//* 11. What is an execution context?
//* 12. What is the call stack?
//* 13. Why can recursion cause stack overflow?
//* 14. What is a closure?
//* 15. Does a closure copy a variable's value or retain access to a binding?
//* 16. Why do two calls to a counter factory have independent state?
//* 17. Why does `var` in a loop often produce the classic closure problem?
//* 18. Why does `let` behave differently in a loop?
//* 19. How is `this` related to function invocation?
//* 20. Why does an arrow function not get its own `this`?


//* ============================================================
//* END OF SCOPE & EXECUTION
//* ============================================================
