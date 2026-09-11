//* ============================================================
//* COMMENTS, ASI, IDENTIFIERS & LITERALS
//* ============================================================

//* This file is the practical companion to README.md.
//* These concepts look small, but they are part of JavaScript's
//* syntax and help you read, write, and debug code correctly.


//* ------------------------------------------------------------
//* 1. COMMENTS
//* ------------------------------------------------------------

//* Definition:
//* A comment is text written in source code for humans that the
//* JavaScript engine does not execute as JavaScript code.

//* Single-line comment:
const name = "Ravi"; // This comment explains the variable.

//* Multi-line comment:
/*
  This is a multi-line comment.
  It can contain several lines of explanation.
*/

console.log(name);


//* ------------------------------------------------------------
//* 2. WHY COMMENTS ARE USEFUL
//* ------------------------------------------------------------

//* Good comments explain WHY something is necessary when the
//* reason is not obvious from the code itself.

const MAX_LOGIN_ATTEMPTS = 5;

//* Keep this limit aligned with the backend security policy.
console.log(MAX_LOGIN_ATTEMPTS);

//* Avoid comments that merely repeat obvious code:
//* const age = 21; // Create a variable called age and assign 21.


//* ------------------------------------------------------------
//* 3. COMMENTS DO NOT CHANGE RUNTIME BEHAVIOR
//* ------------------------------------------------------------

//* Removing a normal comment should not change what this code does.
const price = 500;
const quantity = 2;
const total = price * quantity;

console.log(total); // 1000


//* ------------------------------------------------------------
//* 4. IDENTIFIER
//* ------------------------------------------------------------

//* Definition:
//* An identifier is a name used in JavaScript source code to refer
//* to something such as a variable, function, class, or parameter.

const userName = "Ravi";

function greetUser(user) {
  return `Hello ${user}`;
}

console.log(greetUser(userName));

//* `userName`, `greetUser`, and `user` are identifiers.


//* ------------------------------------------------------------
//* 5. IDENTIFIER RULES
//* ------------------------------------------------------------

//* An identifier can contain letters, digits, `_`, and `$`, but it
//* cannot begin with a digit.

const user1 = "Aman";
const _privateValue = 100;
const $price = 999;

console.log(user1, _privateValue, $price);

//* Invalid examples (do NOT run):
//* const 1user = "Aman";
//* const user-name = "Aman";


//* ------------------------------------------------------------
//* 6. IDENTIFIERS ARE CASE-SENSITIVE
//* ------------------------------------------------------------

const age = 21;
const Age = 30;

console.log(age); // 21
console.log(Age); // 30

//* `age` and `Age` are different identifiers.


//* ------------------------------------------------------------
//* 7. RESERVED WORDS CANNOT NORMALLY BE USED AS IDENTIFIERS
//* ------------------------------------------------------------

//* JavaScript reserves words for language syntax.
//* Examples include:
//* if, else, for, while, function, return, class, const, let, switch

//* Invalid examples:
//* const class = "Frontend";
//* const return = 10;


//* ------------------------------------------------------------
//* 8. NAMING CONVENTIONS
//* ------------------------------------------------------------

//* JavaScript commonly uses camelCase for variables/functions.
const firstName = "Ravi";
const totalPrice = 1500;

function calculateTotal() {
  return totalPrice;
}

console.log(firstName, calculateTotal());

//* Constants representing configuration or fixed values are often
//* written in UPPER_SNAKE_CASE.
const API_TIMEOUT_MS = 5000;
console.log(API_TIMEOUT_MS);


//* ------------------------------------------------------------
//* 9. LITERAL
//* ------------------------------------------------------------

//* Definition:
//* A literal is a value written directly in JavaScript source code.

const stringLiteral = "Hello";
const numberLiteral = 42;
const booleanLiteral = true;
const nullLiteral = null;
const arrayLiteral = [1, 2, 3];
const objectLiteral = { name: "Ravi" };

console.log(
  stringLiteral,
  numberLiteral,
  booleanLiteral,
  nullLiteral,
  arrayLiteral,
  objectLiteral
);


//* ------------------------------------------------------------
//* 10. COMMON LITERAL TYPES
//* ------------------------------------------------------------

//* String literals
const singleQuoted = 'Hello';
const doubleQuoted = "Hello";
const templateLiteral = `Hello, ${name}`;

//* Number literals
const integer = 100;
const decimal = 12.5;
const scientific = 1e3; // 1000

//* Boolean literals
const isActive = true;
const isDeleted = false;

//* Null literal
const emptyValue = null;

//* Array literal
const scores = [90, 80, 70];

//* Object literal
const user = {
  id: 1,
  name: "Ravi",
};

console.log(singleQuoted, doubleQuoted, templateLiteral);
console.log(integer, decimal, scientific);
console.log(isActive, isDeleted, emptyValue);
console.log(scores, user);


//* ------------------------------------------------------------
//* 11. REGULAR EXPRESSION LITERAL
//* ------------------------------------------------------------

//* JavaScript also supports regular expression literals.
const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

console.log(emailPattern.test("ravi@example.com")); // true
console.log(emailPattern.test("not-an-email")); // false


//* ------------------------------------------------------------
//* 12. BIGINT LITERAL
//* ------------------------------------------------------------

//* Add `n` to an integer literal to create a BigInt literal.
const bigNumber = 9007199254740993n;

console.log(bigNumber);
console.log(typeof bigNumber); // bigint


//* ------------------------------------------------------------
//* 13. NUMERIC LITERAL FORMS
//* ------------------------------------------------------------

const decimalNumber = 255;
const binaryNumber = 0b11111111;
const octalNumber = 0o377;
const hexadecimalNumber = 0xff;

console.log(decimalNumber);      // 255
console.log(binaryNumber);       // 255
console.log(octalNumber);        // 255
console.log(hexadecimalNumber);  // 255


//* ------------------------------------------------------------
//* 14. WHAT IS ASI?
//* ------------------------------------------------------------

//* Definition:
//* ASI means Automatic Semicolon Insertion.
//* JavaScript's grammar has rules that allow certain line breaks
//* to be treated as statement termination in appropriate places.

const a = 10
const b = 20
console.log(a + b)

//* This is valid JavaScript.


//* ------------------------------------------------------------
//* 15. EXPLICIT SEMICOLONS
//* ------------------------------------------------------------

//* Many codebases use semicolons explicitly for consistency.
const x = 10;
const y = 20;
console.log(x + y);

//* ASI exists whether or not your style uses semicolons.


//* ------------------------------------------------------------
//* 16. ASI IS NOT SIMPLY "EVERY NEW LINE MEANS ;"
//* ------------------------------------------------------------

//* JavaScript allows line breaks inside many expressions.
const total =
  100 +
  200 +
  300;

console.log(total); // 600

//* Therefore, a newline does not automatically mean that the
//* current statement has ended.


//* ------------------------------------------------------------
//* 17. CLASSIC ASI HAZARD: RETURN
//* ------------------------------------------------------------

function getUser() {
  return {
    name: "Ravi",
  };
}

console.log(getUser());

//* Dangerous formatting:
//* function getUser() {
//*   return
//*   {
//*     name: "Ravi"
//*   };
//* }
//*
//* A line terminator immediately after `return` can cause the
//* return statement to end before the object expression.


//* ------------------------------------------------------------
//* 18. RETURN WITH EXPRESSION
//* ------------------------------------------------------------

function add() {
  return 10 + 20;
}

console.log(add()); // 30


//* ------------------------------------------------------------
//* 19. CLASSIC ASI HAZARD: STARTING A LINE WITH [
//* ------------------------------------------------------------

const first = 10;

//* Be careful when a new statement starts with `[` or `(` and the
//* previous statement could legally continue.

//* A defensive semicolon can make the intended boundary explicit:
const second = 20;

["a", "b", "c"].forEach((item) => {
  console.log(item);
});

console.log(first, second);


//* ------------------------------------------------------------
//* 20. CLASSIC ASI HAZARD: STARTING A LINE WITH (
//* ------------------------------------------------------------

const message = "Hello";

//* This is clearer with an explicit semicolon before a new
//* parenthesized expression when the surrounding code style allows
//* ambiguity.
console.log(message);
(function () {
  console.log("Separate expression");
})();


//* ------------------------------------------------------------
//* 21. DEFENSIVE SEMICOLON
//* ------------------------------------------------------------

//* Some semicolon-free projects place a leading semicolon before
//* expressions that begin with characters such as `(` or `[`.

const value = 10;

;[1, 2, 3].forEach((number) => {
  console.log(number * value);
});


//* ------------------------------------------------------------
//* 22. ASI AND for LOOP
//* ------------------------------------------------------------

//* Do not think of ASI as an excuse to ignore syntax.
//* `for` syntax still requires its separators.

for (let i = 0; i < 3; i++) {
  console.log(i);
}


//* ------------------------------------------------------------
//* 23. WHITESPACE
//* ------------------------------------------------------------

//* Spaces, tabs, and many line breaks can separate tokens without
//* changing the meaning of otherwise valid code.

const firstValue = 10;
const secondValue = 20;

console.log(firstValue + secondValue);


//* ------------------------------------------------------------
//* 24. TEMPLATE LITERALS
//* ------------------------------------------------------------

//* Backticks create template literals.
//* They support interpolation using ${...}.

const developer = "Ravi";
const topic = "JavaScript";

const sentence = `${developer} is learning ${topic}.`;

console.log(sentence);


//* ------------------------------------------------------------
//* 25. LITERAL VS VARIABLE
//* ------------------------------------------------------------

const city = "Dhanbad";

//* "Dhanbad" is a string literal.
//* `city` is an identifier referring to a binding.

console.log(city);


//* ------------------------------------------------------------
//* 26. OBJECT PROPERTY KEYS CAN BE IDENTIFIERS OR LITERALS
//* ------------------------------------------------------------

const profile = {
  name: "Ravi",
  "account-status": "active",
};

console.log(profile.name);
console.log(profile["account-status"]);

//* `name` is a normal property key.
//* "account-status" is a string literal used as a property key.


//* ------------------------------------------------------------
//* 27. COMMON MISTAKE: INVALID IDENTIFIER
//* ------------------------------------------------------------

//* Wrong:
//* const user-name = "Ravi";
//* `-` is an operator, so this is not a valid identifier.

//* Correct:
const userNameCorrect = "Ravi";
console.log(userNameCorrect);


//* ------------------------------------------------------------
//* 28. COMMON MISTAKE: RESERVED WORD
//* ------------------------------------------------------------

//* Wrong:
//* const function = "hello";

//* Correct:
const functionName = "hello";
console.log(functionName);


//* ------------------------------------------------------------
//* 29. COMMON MISTAKE: CONFUSING COMMENTS WITH DOCUMENTATION
//* ------------------------------------------------------------

//* Comments help humans understand source code, but comments do
//* not automatically validate behavior or keep documentation in sync.

function multiply(a, b) {
  return a * b;
}

console.log(multiply(4, 5)); // 20


//* ------------------------------------------------------------
//* 30. PRACTICAL NAMING EXAMPLE
//* ------------------------------------------------------------

function calculateCartTotal(items) {
  let cartTotal = 0;

  for (const item of items) {
    cartTotal += item.price * item.quantity;
  }

  return cartTotal;
}

const cartItems = [
  { price: 100, quantity: 2 },
  { price: 250, quantity: 1 },
];

console.log(calculateCartTotal(cartItems)); // 450

//* Good names communicate intent better than vague names such as
//* `x`, `data`, or `thing` when a more meaningful name is available.


//* ------------------------------------------------------------
//* 31. OUTPUT PREDICTION
//* ------------------------------------------------------------

const outputValue = 10;

function showValue() {
  return outputValue;
}

console.log(showValue()); // 10

//* Question: Which names are identifiers here?
//* Answer: outputValue and showValue.


//* ------------------------------------------------------------
//* 32. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1:
//* Write five valid identifiers using camelCase.

//* Challenge 2:
//* Find five invalid identifiers and explain why they are invalid.

//* Challenge 3:
//* Create examples of string, number, boolean, null, array, and
//* object literals.

//* Challenge 4:
//* Create a BigInt literal and print its type.

//* Challenge 5:
//* Write a function that demonstrates the return + newline ASI hazard
//* and then fix it.

//* Challenge 6:
//* Write the same three statements with and without semicolons.

//* Challenge 7:
//* Create an object with a property key containing a hyphen and
//* access it correctly.

//* Challenge 8:
//* Rename five poorly named variables into descriptive identifiers.


//* ------------------------------------------------------------
//* 33. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1:
//* Why is this not a valid identifier?
//* const user-name = "Ravi";

//* Debug 2:
//* Predict the result:
//* function test() {
//*   return
//*   { value: 10 };
//* }
//* console.log(test());

//* Debug 3:
//* Explain why starting a statement with `[` or `(` can be relevant
//* when using a semicolon-free coding style.


//* ------------------------------------------------------------
//* 34. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is a comment?
//* 2. What is the difference between // and /* ... */?
//* 3. What is an identifier?
//* 4. Which characters can be used in an identifier?
//* 5. Are JavaScript identifiers case-sensitive?
//* 6. What are reserved words?
//* 7. What is a literal?
//* 8. Give five examples of JavaScript literals.
//* 9. What does ASI stand for?
//* 10. Does every newline automatically become a semicolon?
//* 11. Why can `return` followed by a newline be dangerous?
//* 12. Why can a line beginning with `(` or `[` be relevant to ASI?
//* 13. Why are meaningful identifiers important?


//* ============================================================
//* END OF COMMENTS, ASI, IDENTIFIERS & LITERALS
//* ============================================================
