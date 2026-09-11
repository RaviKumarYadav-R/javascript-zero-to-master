//* ============================================================
//* JAVASCRIPT DATA TYPES
//* ============================================================

//* This file is the practical companion to README.md.
//* Run each example and change the values to understand them.


//* ------------------------------------------------------------
//* 1. WHAT IS A DATA TYPE?
//* ------------------------------------------------------------

//* Definition:
//* A data type describes the kind of value a JavaScript value is
//* and determines which operations and behavior apply to it.

//* JavaScript has primitive types and the object type.


//* ------------------------------------------------------------
//* 2. PRIMITIVE DATA TYPES
//* ------------------------------------------------------------

//* The seven primitive types are:
//* 1. string
//* 2. number
//* 3. bigint
//* 4. boolean
//* 5. undefined
//* 6. symbol
//* 7. null


//* ------------------------------------------------------------
//* 3. STRING
//* ------------------------------------------------------------

//* Definition:
//* A string is a primitive value representing text.

const firstName = "Ravi";
const language = 'JavaScript';
const message = `Hello, ${firstName}!`;

console.log(firstName); // Ravi
console.log(language);  // JavaScript
console.log(message);   // Hello, Ravi!
console.log(typeof firstName); // "string"

//* Strings are immutable: string methods create new strings
//* instead of changing the original string value.

const original = "javascript";
const upper = original.toUpperCase();

console.log(original); // javascript
console.log(upper);    // JAVASCRIPT


//* ------------------------------------------------------------
//* 4. NUMBER
//* ------------------------------------------------------------

//* Definition:
//* `number` represents both integer and floating-point numeric
//* values, including special values such as NaN and Infinity.

const age = 21;
const price = 499.99;
const temperature = -5;

console.log(age);         // 21
console.log(price);       // 499.99
console.log(temperature); // -5
console.log(typeof age);  // "number"

console.log(10 + 5); // 15
console.log(10 / 4); // 2.5


//* ------------------------------------------------------------
//* 5. SPECIAL NUMBER VALUES
//* ------------------------------------------------------------

console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
console.log(0 / 0); // NaN

//* NaN means "Not-a-Number" and has type number.
console.log(typeof NaN); // "number"

console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN("hello")); // false


//* ------------------------------------------------------------
//* 6. BIGINT
//* ------------------------------------------------------------

//* Definition:
//* BigInt is a primitive type for integers larger than the range
//* where Number can safely represent every integer exactly.

const bigNumber = 9007199254740993n;

console.log(bigNumber);
console.log(typeof bigNumber); // "bigint"

//* BigInt and Number cannot normally be mixed directly in
//* arithmetic operations.

const bigValue = 10n;
const anotherBigValue = 20n;

console.log(bigValue + anotherBigValue); // 30n

// console.log(bigValue + 10); // TypeError


//* ------------------------------------------------------------
//* 7. BOOLEAN
//* ------------------------------------------------------------

//* Definition:
//* A boolean represents one of two logical values: true or false.

const isLoggedIn = true;
const hasPermission = false;

console.log(isLoggedIn);    // true
console.log(hasPermission); // false
console.log(typeof isLoggedIn); // "boolean"

const isAdult = age >= 18;
console.log(isAdult); // true


//* ------------------------------------------------------------
//* 8. UNDEFINED
//* ------------------------------------------------------------

//* Definition:
//* `undefined` commonly represents the absence of an assigned
//* value, such as an uninitialized `let` variable or a missing
//* object property.

let score;

console.log(score); // undefined
console.log(typeof score); // "undefined"

const user = {};
console.log(user.email); // undefined

function doNothing() {}
console.log(doNothing()); // undefined


//* ------------------------------------------------------------
//* 9. NULL
//* ------------------------------------------------------------

//* Definition:
//* `null` is a primitive value that represents an intentional
//* absence of an object/value.

let selectedUser = null;

console.log(selectedUser); // null

//* Historical JavaScript behavior:
console.log(typeof null); // "object"

//* This is a long-standing language quirk. `null` is not an object.


//* ------------------------------------------------------------
//* 10. SYMBOL
//* ------------------------------------------------------------

//* Definition:
//* A Symbol is a primitive value that is unique and can be used
//* as an object property key.

const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 === id2); // false
console.log(typeof id1);  // "symbol"

const account = {
  name: "Ravi",
  [id1]: 12345,
};

console.log(account.name); // Ravi
console.log(account[id1]); // 12345


//* ------------------------------------------------------------
//* 11. OBJECT
//* ------------------------------------------------------------

//* Definition:
//* An object is a non-primitive value that can hold collections
//* of properties and behavior.

const student = {
  name: "Ravi",
  age: 21,
  isLearning: true,
};

console.log(student);
console.log(typeof student); // "object"

//* Arrays, functions, dates, maps, sets, and many other values
//* are objects or object-based values, even though `typeof` has
//* special results for some of them.


//* ------------------------------------------------------------
//* 12. ARRAY
//* ------------------------------------------------------------

//* Definition:
//* An array is an indexed, ordered collection and is an object
//* in JavaScript.

const skills = ["HTML", "CSS", "JavaScript"];

console.log(skills[0]); // HTML
console.log(skills.length); // 3
console.log(typeof skills); // "object"

console.log(Array.isArray(skills)); // true


//* ------------------------------------------------------------
//* 13. FUNCTION
//* ------------------------------------------------------------

//* Definition:
//* A function is callable behavior. Functions are objects in
//* JavaScript and can be stored in variables, passed as values,
//* and returned from other functions.

function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Ravi")); // Hello, Ravi!
console.log(typeof greet); // "function"


//* ------------------------------------------------------------
//* 14. typeof OPERATOR
//* ------------------------------------------------------------

//* Definition:
//* `typeof` returns a string indicating the type category of a
//* value according to JavaScript's `typeof` operator rules.

console.log(typeof "Ravi");       // string
console.log(typeof 21);            // number
console.log(typeof 21n);           // bigint
console.log(typeof true);          // boolean
console.log(typeof undefined);     // undefined
console.log(typeof Symbol("id")); // symbol
console.log(typeof null);          // object (historical quirk)
console.log(typeof {});            // object
console.log(typeof function () {}); // function


//* ------------------------------------------------------------
//* 15. PRIMITIVE VS OBJECT
//* ------------------------------------------------------------

//* Primitive values are immutable values.
//* Objects are mutable collections of properties.

let text = "hello";
// text[0] = "H"; // Does not change the string.

const profile = {
  name: "Ravi",
};

profile.name = "Rahul";
console.log(profile.name); // Rahul


//* ------------------------------------------------------------
//* 16. VALUE COMPARISON
//* ------------------------------------------------------------

//* Primitive values are compared by their values in equality
//* comparisons.

console.log(10 === 10); // true
console.log("Ravi" === "Ravi"); // true

//* Objects are compared by reference identity.

const userA = { name: "Ravi" };
const userB = { name: "Ravi" };

console.log(userA === userB); // false

const userC = userA;
console.log(userA === userC); // true


//* ------------------------------------------------------------
//* 17. TYPE CHECKING IN REAL CODE
//* ------------------------------------------------------------

function describeValue(value) {
  if (value === null) {
    return "null";
  }

  if (Array.isArray(value)) {
    return "array";
  }

  return typeof value;
}

console.log(describeValue("hello")); // string
console.log(describeValue(42));      // number
console.log(describeValue(true));    // boolean
console.log(describeValue(null));    // null
console.log(describeValue([]));      // array
console.log(describeValue({}));      // object


//* ------------------------------------------------------------
//* 18. COMMON MISTAKE: NULL IS NOT OBJECT
//* ------------------------------------------------------------

//* `typeof null` returns "object", but null itself is a
//* primitive value.

const value = null;

if (value === null) {
  console.log("The value is null.");
}


//* ------------------------------------------------------------
//* 19. COMMON MISTAKE: ARRAY IS NOT A SPECIAL typeof RESULT
//* ------------------------------------------------------------

const numbers = [1, 2, 3];

console.log(typeof numbers); // "object"
console.log(Array.isArray(numbers)); // true


//* ------------------------------------------------------------
//* 20. COMMON MISTAKE: NUMBER DOES NOT MEAN ONLY INTEGER
//* ------------------------------------------------------------

const integer = 10;
const decimal = 10.5;

console.log(typeof integer); // number
console.log(typeof decimal); // number


//* ------------------------------------------------------------
//* 21. REAL-WORLD EXAMPLE
//* ------------------------------------------------------------

function formatUser(user) {
  if (typeof user !== "object" || user === null) {
    return "Invalid user";
  }

  return `${user.name} is ${user.age} years old.`;
}

console.log(formatUser({ name: "Ravi", age: 21 }));
// Ravi is 21 years old.

console.log(formatUser(null));
// Invalid user


//* ------------------------------------------------------------
//* 22. QUICK TYPE PRACTICE
//* ------------------------------------------------------------

const values = [
  "JavaScript",
  100,
  99.5,
  true,
  undefined,
  null,
  123n,
  Symbol("id"),
  {},
  [],
  function () {},
];

for (const item of values) {
  console.log(item, "=>", typeof item);
}


//* ------------------------------------------------------------
//* 23. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1:
//* Create one example of every primitive data type.

//* Challenge 2:
//* Write a function that returns the type of a value.
//* Handle null and arrays correctly.

//* Challenge 3:
//* Create an object containing a string, number, boolean,
//* array, and null value.

//* Challenge 4:
//* Predict the result of typeof for 10 different values
//* before running the code.

//* Challenge 5:
//* Explain why these two results differ:
//* typeof null
//* Array.isArray([])


//* ------------------------------------------------------------
//* 24. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is a data type?
//* 2. What are JavaScript's seven primitive types?
//* 3. What is the difference between primitive values and objects?
//* 4. Why does typeof null return "object"?
//* 5. How do you correctly check whether a value is an array?
//* 6. What is the difference between Number and BigInt?
//* 7. What does undefined commonly represent?
//* 8. What does null represent?
//* 9. Why are two separately created objects not === each other?
//* 10. What does dynamically typed mean in JavaScript?


//* ============================================================
//* END OF DATA TYPES
//* ============================================================
