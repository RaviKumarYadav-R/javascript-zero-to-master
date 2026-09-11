//* ============================================================
//* JAVASCRIPT OPERATORS
//* ============================================================

//* This file is the practical companion to README.md.
//* An operator is a syntax element that performs an operation
//* on one or more values (operands) and, for many operators,
//* produces a value.


//* ------------------------------------------------------------
//* 1. ARITHMETIC OPERATORS
//* ------------------------------------------------------------

//* Definition:
//* Arithmetic operators perform mathematical operations on
//* numeric values.

const a = 20;
const b = 6;

console.log(a + b); // 26  addition
console.log(a - b); // 14  subtraction
console.log(a * b); // 120 multiplication
console.log(a / b); // 3.333... division
console.log(a % b); // 2   remainder
console.log(a ** b); // 64000000 exponentiation


//* ------------------------------------------------------------
//* 2. ADDITION AND STRING CONCATENATION
//* ------------------------------------------------------------

//* The `+` operator can add numbers or concatenate strings.

console.log(10 + 5); // 15
console.log("Hello " + "Ravi"); // Hello Ravi
console.log("Age: " + 21); // Age: 21

//* If a string is involved, the operation can become
//* string concatenation.


//* ------------------------------------------------------------
//* 3. COMPARISON OPERATORS
//* ------------------------------------------------------------

//* Definition:
//* Comparison operators compare values and produce a boolean.

console.log(10 > 5);  // true
console.log(10 < 5);  // false
console.log(10 >= 10); // true
console.log(10 <= 9);  // false

console.log(10 === 10); // true
console.log(10 !== 5);  // true


//* ------------------------------------------------------------
//* 4. STRICT EQUALITY ===
//* ------------------------------------------------------------

//* Definition:
//* `===` checks whether two values are equal without performing
//* the type coercion associated with loose equality.

console.log(5 === 5);     // true
console.log(5 === "5");   // false
console.log(true === 1);  // false

//* In most application code, prefer `===` when you mean strict
//* equality.


//* ------------------------------------------------------------
//* 5. STRICT INEQUALITY !==
//* ------------------------------------------------------------

//* Definition:
//* `!==` returns true when values are not strictly equal.

console.log(5 !== 10);   // true
console.log(5 !== "5"); // true
console.log(5 !== 5);    // false


//* ------------------------------------------------------------
//* 6. LOOSE EQUALITY ==
//* ------------------------------------------------------------

//* Definition:
//* `==` compares values using JavaScript's abstract equality
//* comparison, which can perform type coercion.

console.log(5 == "5"); // true
console.log(0 == false); // true
console.log(null == undefined); // true

//* Because coercion can be surprising, use `===` unless you
//* intentionally need loose equality semantics.


//* ------------------------------------------------------------
//* 7. LOGICAL AND &&
//* ------------------------------------------------------------

//* Definition:
//* `&&` evaluates operands from left to right and returns the
//* first falsy operand, or the last operand if all are truthy.

console.log(true && true); // true
console.log(true && false); // false

const username = "Ravi";
const hasPassword = true;

if (username && hasPassword) {
  console.log("Login data is present.");
}

//* Important: && does not always return a boolean.
console.log("Hello" && 123); // 123
console.log("" && 123);      // ""


//* ------------------------------------------------------------
//* 8. LOGICAL OR ||
//* ------------------------------------------------------------

//* Definition:
//* `||` evaluates operands from left to right and returns the
//* first truthy operand, or the last operand if all are falsy.

console.log(false || true); // true

const displayName = "" || "Guest";
console.log(displayName); // Guest

console.log("Ravi" || "Guest"); // Ravi

//* Important: || is often used for fallback values, but it treats
//* all falsy values (0, "", false, null, undefined, NaN) as absent.


//* ------------------------------------------------------------
//* 9. NULLISH COALESCING ??
//* ------------------------------------------------------------

//* Definition:
//* `??` returns the right operand only when the left operand is
//* null or undefined.

const count = 0;
const safeCount = count ?? 10;

console.log(safeCount); // 0

//* Compare with ||:
console.log(count || 10); // 10
console.log(count ?? 10); // 0


//* ------------------------------------------------------------
//* 10. LOGICAL NOT !
//* ------------------------------------------------------------

//* Definition:
//* `!` converts its operand to a boolean and negates it.

console.log(!true);  // false
console.log(!false); // true
console.log(!0);     // true
console.log(!"Ravi"); // false

const isLoggedIn = false;

if (!isLoggedIn) {
  console.log("User is not logged in.");
}


//* ------------------------------------------------------------
//* 11. ASSIGNMENT OPERATORS
//* ------------------------------------------------------------

//* Definition:
//* Assignment operators assign or update the value associated
//* with a variable binding.

let score = 10;

score = 20;
console.log(score); // 20

score += 5;
console.log(score); // 25

score -= 5;
console.log(score); // 20

score *= 2;
console.log(score); // 40

score /= 4;
console.log(score); // 10

score %= 3;
console.log(score); // 1

score **= 3;
console.log(score); // 1


//* ------------------------------------------------------------
//* 12. INCREMENT ++
//* ------------------------------------------------------------

//* Definition:
//* `++` adds 1 to a numeric value.

let counter = 5;

counter++;
console.log(counter); // 6

++counter;
console.log(counter); // 7


//* ------------------------------------------------------------
//* 13. PREFIX VS POSTFIX INCREMENT
//* ------------------------------------------------------------

let number = 5;

console.log(number++); // 5
console.log(number);   // 6

number = 5;
console.log(++number); // 6
console.log(number);   // 6

//* Postfix returns the old value before incrementing.
//* Prefix increments first and returns the new value.


//* ------------------------------------------------------------
//* 14. DECREMENT --
//* ------------------------------------------------------------

let lives = 3;

lives--;
console.log(lives); // 2

--lives;
console.log(lives); // 1


//* ------------------------------------------------------------
//* 15. TERNARY OPERATOR
//* ------------------------------------------------------------

//* Definition:
//* The conditional (ternary) operator is an expression that
//* chooses one of two values based on a condition.

const userAge = 21;
const status = userAge >= 18 ? "Adult" : "Minor";

console.log(status); // Adult

//* Syntax:
//* condition ? valueIfTrue : valueIfFalse


//* ------------------------------------------------------------
//* 16. TYPEOF OPERATOR
//* ------------------------------------------------------------

//* Definition:
//* `typeof` returns a string describing the runtime type category
//* of its operand according to JavaScript's typeof rules.

console.log(typeof "Ravi"); // string
console.log(typeof 21);      // number
console.log(typeof true);    // boolean
console.log(typeof undefined); // undefined
console.log(typeof null);    // object (historical quirk)


//* ------------------------------------------------------------
//* 17. IN OPERATOR
//* ------------------------------------------------------------

//* Definition:
//* `in` checks whether a property key exists on an object or
//* anywhere in its prototype chain.

const user = {
  name: "Ravi",
};

console.log("name" in user); // true
console.log("age" in user);  // false


//* ------------------------------------------------------------
//* 18. INSTANCEOF OPERATOR
//* ------------------------------------------------------------

//* Definition:
//* `instanceof` tests whether an object's prototype chain
//* contains the prototype property of a constructor.

const items = [];

console.log(items instanceof Array); // true
console.log(items instanceof Object); // true


//* ------------------------------------------------------------
//* 19. OPTIONAL CHAINING ?.
//* ------------------------------------------------------------

//* Definition:
//* Optional chaining safely accesses a property, method, or
//* element when the value on the left is nullish.

const account = {
  profile: {
    name: "Ravi",
  },
};

console.log(account.profile?.name); // Ravi
console.log(account.settings?.theme); // undefined


//* ------------------------------------------------------------
//* 20. OPERATOR PRECEDENCE
//* ------------------------------------------------------------

//* Definition:
//* Operator precedence determines which operators are evaluated
//* first when an expression contains multiple operators.

const result1 = 2 + 3 * 4;
console.log(result1); // 14

const result2 = (2 + 3) * 4;
console.log(result2); // 20

//* Parentheses make intended grouping explicit.


//* ------------------------------------------------------------
//* 21. SHORT-CIRCUIT EVALUATION
//* ------------------------------------------------------------

//* `&&` stops when it finds a falsy value.
//* `||` stops when it finds a truthy value.
//* `??` stops when the left side is not null/undefined.

const value1 = false && console.log("This will not run");
const value2 = true || console.log("This will not run");

console.log(value1); // false
console.log(value2); // true


//* ------------------------------------------------------------
//* 22. REAL-WORLD EXAMPLE: ACCESS CONTROL
//* ------------------------------------------------------------

function canAccessDashboard(user) {
  return Boolean(user && user.isLoggedIn && user.role === "admin");
}

console.log(
  canAccessDashboard({ isLoggedIn: true, role: "admin" })
); // true

console.log(
  canAccessDashboard({ isLoggedIn: true, role: "user" })
); // false


//* ------------------------------------------------------------
//* 23. REAL-WORLD EXAMPLE: DEFAULT VALUE
//* ------------------------------------------------------------

function getPageSize(size) {
  return size ?? 20;
}

console.log(getPageSize(50)); // 50
console.log(getPageSize(0));  // 0
console.log(getPageSize(null)); // 20


//* ------------------------------------------------------------
//* 24. COMMON MISTAKES
//* ------------------------------------------------------------

//* Mistake 1: confusing assignment with comparison

let points = 10;

// if (points = 20) { ... } // assigns 20; usually a bug

if (points === 20) {
  console.log("Points are exactly 20.");
}

//* Mistake 2: using <= when array indexing should stop at length - 1

const colors = ["red", "green", "blue"];

for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}

//* Mistake 3: assuming && and || always return booleans

console.log("Ravi" && 100); // 100
console.log("" || "Guest"); // Guest


//* ------------------------------------------------------------
//* 25. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1:
//* Calculate the area of a rectangle using arithmetic operators.

//* Challenge 2:
//* Check whether a number is even using `%`.

//* Challenge 3:
//* Create a login condition using &&.

//* Challenge 4:
//* Provide a default username using ?? and compare it with ||.

//* Challenge 5:
//* Use the ternary operator to return "Pass" or "Fail".

//* Challenge 6:
//* Predict the output:
//* console.log(2 + 3 * 4);
//* console.log((2 + 3) * 4);


//* ------------------------------------------------------------
//* 26. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is an operator?
//* 2. What is the difference between == and ===?
//* 3. What does % return?
//* 4. What is the difference between ++value and value++?
//* 5. What does && return?
//* 6. What does || return?
//* 7. How is ?? different from ||?
//* 8. What is a ternary operator?
//* 9. What does typeof do?
//* 10. Why are parentheses useful when using multiple operators?


//* ============================================================
//* END OF OPERATORS
//* ============================================================
