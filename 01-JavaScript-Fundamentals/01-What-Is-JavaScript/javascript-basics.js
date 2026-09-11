//* ============================================================
//* JAVASCRIPT BASICS
//* ============================================================

//* This file is the practical companion to the README.md.
//* Read the definition, run the example, then modify the code.


//* ------------------------------------------------------------
//* 1. WHAT IS JAVASCRIPT?
//* ------------------------------------------------------------

//* Definition:
//* JavaScript is a high-level, dynamically typed programming
//* language standardized by ECMAScript. It is widely used to
//* add behavior and logic to web applications and is also used
//* outside browsers, for example with Node.js.

//* Simple idea:
//* HTML      -> Structure
//* CSS       -> Presentation
//* JavaScript -> Behavior and logic

console.log("Hello, JavaScript!");


//* ------------------------------------------------------------
//* 2. JAVASCRIPT IS A PROGRAMMING LANGUAGE
//* ------------------------------------------------------------

//* A programming language lets us express instructions and
//* logic that a JavaScript runtime can execute.

const name = "Ravi";
const age = 21;

console.log(name);
console.log(age);


//* ------------------------------------------------------------
//* 3. JAVASCRIPT VS ECMASCRIPT
//* ------------------------------------------------------------

//* Definition:
//* ECMAScript is the language specification that defines the
//* core rules and features of JavaScript.
//* JavaScript is an implementation of that language standard
//* plus host-provided APIs such as the DOM in browsers.

//* Example of ECMAScript language features:

const numbers = [10, 20, 30];
const doubled = numbers.map((number) => number * 2);

console.log(doubled); // [20, 40, 60]


//* ------------------------------------------------------------
//* 4. JAVASCRIPT RUNTIME
//* ------------------------------------------------------------

//* Definition:
//* A JavaScript runtime provides an engine that executes
//* JavaScript and, depending on the host, additional APIs.

//* Browser example:
//* Browser runtime = JavaScript engine + Web APIs + event loop

//* Node.js example:
//* Node.js = JavaScript engine + Node.js APIs/runtime features

//* The following code uses only core JavaScript:

const firstNumber = 10;
const secondNumber = 20;

console.log(firstNumber + secondNumber); // 30


//* ------------------------------------------------------------
//* 5. JAVASCRIPT IN THE BROWSER
//* ------------------------------------------------------------

//* Browsers provide Web APIs in addition to JavaScript.
//* `document` is a browser DOM API, not an ECMAScript built-in.

//* Run this section in a browser console or an HTML page.

if (typeof document !== "undefined") {
  console.log(document.title);
}


//* ------------------------------------------------------------
//* 6. JAVASCRIPT IN NODE.JS
//* ------------------------------------------------------------

//* The same JavaScript language can run in Node.js.
//* Node.js does not provide the browser DOM by default.

console.log("This code can run in Node.js.");

if (typeof window === "undefined") {
  console.log("window is not available in this runtime.");
}


//* ------------------------------------------------------------
//* 7. JAVASCRIPT IS DYNAMICALLY TYPED
//* ------------------------------------------------------------

//* Definition:
//* JavaScript variables do not have a fixed type attached to
//* the variable itself. A value has a type, and a variable can
//* later refer to a value of another type.

let value = 100;
console.log(typeof value); // "number"

value = "one hundred";
console.log(typeof value); // "string"

value = true;
console.log(typeof value); // "boolean"


//* Important:
//* Dynamic typing does NOT mean JavaScript has no types.
//* JavaScript has types; values have those types at runtime.


//* ------------------------------------------------------------
//* 8. EXPRESSIONS
//* ------------------------------------------------------------

//* Definition:
//* An expression is code that evaluates to a value.

const sum = 10 + 20;
const isAdult = age >= 18;
const greeting = "Hello " + name;

console.log(sum);       // 30
console.log(isAdult);   // true
console.log(greeting);  // Hello Ravi


//* ------------------------------------------------------------
//* 9. STATEMENTS
//* ------------------------------------------------------------

//* Definition:
//* A statement is an instruction that performs an action or
//* controls execution. Some statements contain expressions.

let score = 0;
score = score + 10;

if (score >= 10) {
  console.log("Score reached 10.");
}


//* ------------------------------------------------------------
//* 10. COMMENTS
//* ------------------------------------------------------------

//* Single-line comment

/*
  Multi-line comment.
  Comments are ignored by the JavaScript runtime.
*/

console.log("Comments help humans understand code.");


//* ------------------------------------------------------------
//* 11. FUNCTIONS
//* ------------------------------------------------------------

//* Definition:
//* A function is a reusable piece of code that can receive
//* inputs (parameters), perform work, and optionally return a value.

function add(a, b) {
  return a + b;
}

console.log(add(5, 3)); // 8


//* ------------------------------------------------------------
//* 12. JAVASCRIPT CAN MAKE DECISIONS
//* ------------------------------------------------------------

const userAge = 21;

if (userAge >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}


//* ------------------------------------------------------------
//* 13. JAVASCRIPT CAN REPEAT WORK
//* ------------------------------------------------------------

for (let i = 1; i <= 3; i++) {
  console.log(`Iteration ${i}`);
}

// Output:
// Iteration 1
// Iteration 2
// Iteration 3


//* ------------------------------------------------------------
//* 14. JAVASCRIPT CAN WORK WITH DATA
//* ------------------------------------------------------------

const user = {
  name: "Ravi",
  role: "Web Developer",
};

console.log(user.name); // Ravi
console.log(user.role); // Web Developer


//* ------------------------------------------------------------
//* 15. REAL-WORLD EXAMPLE
//* ------------------------------------------------------------

function calculateTotal(price, quantity) {
  if (price < 0 || quantity < 0) {
    return "Price and quantity cannot be negative.";
  }

  return price * quantity;
}

const total = calculateTotal(499, 2);

console.log(`Total: ₹${total}`); // Total: ₹998


//* ------------------------------------------------------------
//* 16. COMMON MISTAKE: JAVASCRIPT IS NOT JAVA
//* ------------------------------------------------------------

//* JavaScript and Java are different programming languages.
//* Their names are similar, but they have different designs,
//* ecosystems, runtimes, and typical use cases.


//* ------------------------------------------------------------
//* 17. COMMON MISTAKE: console.log IS NOT THE LANGUAGE
//* ------------------------------------------------------------

//* `console.log()` is a host-provided console API commonly
//* available in browsers and Node.js. It is not JavaScript itself.

console.log("JavaScript language code");


//* ------------------------------------------------------------
//* 18. COMMON MISTAKE: JAVASCRIPT ONLY RUNS IN BROWSERS
//* ------------------------------------------------------------

//* False.
//* JavaScript can run in browsers and other environments such
//* as Node.js, Deno, Bun, embedded runtimes, and more.


//* ------------------------------------------------------------
//* 19. OUTPUT PREDICTION
//* ------------------------------------------------------------

const x = 10;
const y = "10";

console.log(x + x); // 20
console.log(y + y); // "1010"

//* Why?
//* `+` performs numeric addition when appropriate, but it can
//* also perform string concatenation when a string is involved.


//* ------------------------------------------------------------
//* 20. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1:
//* Create variables for your name, age, and profession.
//* Print all three values.

//* Challenge 2:
//* Create a function that accepts two numbers and returns
//* their product.

//* Challenge 3:
//* Write a program that checks whether a number is positive,
//* negative, or zero.

//* Challenge 4:
//* Print numbers from 1 to 10 using a loop.

//* Challenge 5:
//* Create a user object containing name, age, and city.
//* Print each property.


//* ------------------------------------------------------------
//* 21. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* Try answering these without opening the README:
//*
//* 1. What is JavaScript?
//* 2. What is ECMAScript?
//* 3. What is a JavaScript runtime?
//* 4. What does dynamically typed mean?
//* 5. What is an expression?
//* 6. What is a statement?
//* 7. What is a function?
//* 8. Is JavaScript limited to browsers?
//* 9. Is `console.log()` JavaScript itself?
//* 10. What is the difference between JavaScript and ECMAScript?


//* ============================================================
//* END OF JAVASCRIPT BASICS
//* ============================================================
