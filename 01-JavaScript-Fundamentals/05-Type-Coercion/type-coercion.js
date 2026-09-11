//* ============================================================
//* JAVASCRIPT TYPE COERCION
//* ============================================================

//* This file is the practical companion to README.md.
//* Type coercion is the conversion of a value from one type to
//* another during JavaScript operations.


//* ------------------------------------------------------------
//* 1. WHAT IS TYPE COERCION?
//* ------------------------------------------------------------

//* Definition:
//* Type coercion happens when JavaScript converts a value from
//* one type to another so an operation can be performed.

const value = "10";
const result = value * 2;

console.log(result);        // 20
console.log(typeof result); // "number"

//* The string "10" was converted to a number for multiplication.


//* ------------------------------------------------------------
//* 2. EXPLICIT VS IMPLICIT CONVERSION
//* ------------------------------------------------------------

//* Explicit conversion:
//* You intentionally convert a value using a function or operator.

const textNumber = "42";
const explicitNumber = Number(textNumber);

console.log(explicitNumber);        // 42
console.log(typeof explicitNumber); // "number"

//* Implicit coercion:
//* JavaScript performs the conversion as part of an operation.

const implicitNumber = "42" * 1;

console.log(implicitNumber);        // 42
console.log(typeof implicitNumber); // "number"


//* ------------------------------------------------------------
//* 3. NUMBER() CONVERSION
//* ------------------------------------------------------------

//* Definition:
//* Number(value) explicitly attempts to convert a value to a number.

console.log(Number("123"));    // 123
console.log(Number("12.5"));   // 12.5
console.log(Number(""));       // 0
console.log(Number("   "));    // 0
console.log(Number(true));     // 1
console.log(Number(false));    // 0
console.log(Number(null));     // 0
console.log(Number(undefined)); // NaN
console.log(Number("hello"));  // NaN


//* ------------------------------------------------------------
//* 4. STRING() CONVERSION
//* ------------------------------------------------------------

//* Definition:
//* String(value) explicitly converts a value to a string.

console.log(String(123));       // "123"
console.log(String(true));      // "true"
console.log(String(false));     // "false"
console.log(String(null));      // "null"
console.log(String(undefined)); // "undefined"
console.log(String([1, 2, 3])); // "1,2,3"


//* ------------------------------------------------------------
//* 5. BOOLEAN() CONVERSION
//* ------------------------------------------------------------

//* Definition:
//* Boolean(value) explicitly converts a value to true or false
//* according to JavaScript's truthiness rules.

console.log(Boolean(1));       // true
console.log(Boolean(0));       // false
console.log(Boolean("hello")); // true
console.log(Boolean(""));      // false
console.log(Boolean(null));    // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));     // false

//* Important:
//* Objects, including empty arrays and empty objects, are truthy.

console.log(Boolean([])); // true
console.log(Boolean({})); // true


//* ------------------------------------------------------------
//* 6. TRUTHY AND FALSY VALUES
//* ------------------------------------------------------------

//* Definition:
//* A truthy value behaves like true when converted to boolean.
//* A falsy value behaves like false.

//* Common falsy values:
//* false
//* 0, -0, 0n
//* ""
//* null
//* undefined
//* NaN

const username = "Ravi";

if (username) {
  console.log("Username exists.");
}


//* ------------------------------------------------------------
//* 7. STRING + NUMBER
//* ------------------------------------------------------------

//* The + operator has special string-concatenation behavior.

console.log("10" + 5); // "105"
console.log(5 + "10"); // "510"
console.log("10" + "5"); // "105"
console.log(10 + 5); // 15

//* The presence of a string can make + perform concatenation.


//* ------------------------------------------------------------
//* 8. STRING - NUMBER
//* ------------------------------------------------------------

//* Unlike +, arithmetic operators such as - normally coerce
//* numeric strings to numbers.

console.log("10" - 5); // 5
console.log("10" * 2); // 20
console.log("10" / 2); // 5
console.log("10" % 3); // 1


//* ------------------------------------------------------------
//* 9. UNARY PLUS
//* ------------------------------------------------------------

//* Definition:
//* Unary + attempts to convert its operand to a number.

console.log(+"42"); // 42
console.log(+true);  // 1
console.log(+false); // 0
console.log(+null);  // 0
console.log(+undefined); // NaN


//* ------------------------------------------------------------
//* 10. BOOLEAN COERCION IN CONDITIONS
//* ------------------------------------------------------------

const items = [];

if (items) {
  console.log("The array is truthy.");
}

//* Even an empty array is truthy because it is an object.


//* ------------------------------------------------------------
//* 11. LOOSE EQUALITY ==
//* ------------------------------------------------------------

//* Definition:
//* == compares values using the abstract equality algorithm,
//* which can convert operands before comparison.

console.log(5 == "5"); // true
console.log(0 == false); // true
console.log(1 == true); // true
console.log(null == undefined); // true

//* Strict equality does not perform this coercion:

console.log(5 === "5"); // false
console.log(0 === false); // false


//* ------------------------------------------------------------
//* 12. THE null == undefined SPECIAL CASE
//* ------------------------------------------------------------

console.log(null == undefined);  // true
console.log(null === undefined); // false

//* With loose equality, null and undefined compare equal to each
//* other, but not to ordinary values such as 0 or "".

console.log(null == 0); // false
console.log(null == ""); // false
console.log(undefined == 0); // false


//* ------------------------------------------------------------
//* 13. OBJECT TO PRIMITIVE COERCION
//* ------------------------------------------------------------

//* Objects can be converted to primitive values when an operation
//* requires one. The exact process uses mechanisms such as
//* valueOf() and toString(), through the ToPrimitive operation.

const object = {
  valueOf() {
    return 10;
  },
};

console.log(object + 5); // 15


//* ------------------------------------------------------------
//* 14. ARRAY TO STRING COERCION
//* ------------------------------------------------------------

const numbers = [1, 2, 3];

console.log(String(numbers)); // "1,2,3"
console.log(numbers + "");     // "1,2,3"

//* This happens because the array is converted to a primitive
//* string representation for this operation.


//* ------------------------------------------------------------
//* 15. OBJECT TO STRING COERCION
//* ------------------------------------------------------------

const user = {};

console.log(String(user)); // "[object Object]"

//* This default result is usually not what you want for displaying
//* structured data. Use JSON.stringify() when JSON text is needed.

console.log(JSON.stringify({ name: "Ravi" })); // {"name":"Ravi"}


//* ------------------------------------------------------------
//* 16. NaN AND COERCION
//* ------------------------------------------------------------

const invalidNumber = Number("Ravi");

console.log(invalidNumber); // NaN
console.log(Number.isNaN(invalidNumber)); // true

//* NaN is a number value that represents an invalid numeric result.
//* Number.isNaN() checks for the actual NaN value without coercing.


//* ------------------------------------------------------------
//* 17. PARSING NUMBERS
//* ------------------------------------------------------------

//* parseInt() parses an integer from the beginning of a string.
//* parseFloat() parses a floating-point number from the beginning
//* of a string.

console.log(parseInt("42", 10)); // 42
console.log(parseInt("42px", 10)); // 42
console.log(parseFloat("12.5px")); // 12.5

//* Number() is stricter:

console.log(Number("42px")); // NaN

//* Always specify the radix when using parseInt() for clarity.


//* ------------------------------------------------------------
//* 18. COMMON MISTAKE: + CAN MEAN TWO THINGS
//* ------------------------------------------------------------

const input = "25";

console.log(input + 5);       // "255"
console.log(Number(input) + 5); // 30

//* If the input is user-provided text and you need arithmetic,
//* convert it explicitly first.


//* ------------------------------------------------------------
//* 19. COMMON MISTAKE: EMPTY ARRAY IS TRUTHY
//* ------------------------------------------------------------

const emptyArray = [];
const emptyObject = {};

console.log(Boolean(emptyArray));  // true
console.log(Boolean(emptyObject)); // true

if (emptyArray) {
  console.log("This runs.");
}

//* To check whether an array contains elements, use length.

if (emptyArray.length === 0) {
  console.log("Array has no elements.");
}


//* ------------------------------------------------------------
//* 20. COMMON MISTAKE: EMPTY STRING IS FALSY
//* ------------------------------------------------------------

const name = "";

if (!name) {
  console.log("Name is empty.");
}


//* ------------------------------------------------------------
//* 21. REAL-WORLD EXAMPLE: FORM INPUT
//* ------------------------------------------------------------

function calculatePrice(priceInput, quantityInput) {
  const price = Number(priceInput);
  const quantity = Number(quantityInput);

  if (!Number.isFinite(price) || !Number.isFinite(quantity)) {
    return "Enter valid numbers.";
  }

  return price * quantity;
}

console.log(calculatePrice("499", "2")); // 998
console.log(calculatePrice("abc", "2")); // Enter valid numbers.


//* ------------------------------------------------------------
//* 22. REAL-WORLD EXAMPLE: BOOLEAN CHECK
//* ------------------------------------------------------------

function getLoginMessage(isLoggedIn) {
  if (isLoggedIn) {
    return "Welcome back!";
  }

  return "Please log in.";
}

console.log(getLoginMessage(true));  // Welcome back!
console.log(getLoginMessage(false)); // Please log in.


//* ------------------------------------------------------------
//* 23. BETTER PRACTICE: EXPLICIT CONVERSION
//* ------------------------------------------------------------

const userInput = "100";
const amount = Number(userInput);

if (Number.isFinite(amount)) {
  console.log(amount + 50); // 150
}

//* Explicit conversion makes the programmer's intention clear
//* and reduces surprising behavior.


//* ------------------------------------------------------------
//* 24. OUTPUT PREDICTION
//* ------------------------------------------------------------

console.log("5" + 2); // "52"
console.log("5" - 2); // 3
console.log("5" * "2"); // 10
console.log(true + 1); // 2
console.log(false + 1); // 1
console.log(null + 1); // 1
console.log(undefined + 1); // NaN


//* ------------------------------------------------------------
//* 25. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1:
//* Convert a string containing a price into a number.

//* Challenge 2:
//* Check whether a user entered a valid numeric value.

//* Challenge 3:
//* Predict the output before running:
//* "10" + 10
//* "10" - 10
//* true + true
//* null + 5

//* Challenge 4:
//* Write a function that converts a form's age input into a
//* number and rejects invalid input.

//* Challenge 5:
//* Explain why [] is truthy while "" is falsy.


//* ------------------------------------------------------------
//* 26. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is type coercion?
//* 2. What is the difference between explicit and implicit conversion?
//* 3. What does Number("42") return?
//* 4. Why does "10" + 5 produce "105"?
//* 5. Why does "10" - 5 produce 5?
//* 6. What are falsy values?
//* 7. Why is [] truthy?
//* 8. What is the difference between == and ===?
//* 9. Why does null == undefined return true?
//* 10. When would you prefer explicit conversion?


//* ============================================================
//* END OF TYPE COERCION
//* ============================================================
