//* ============================================================
//* JAVASCRIPT VARIABLES
//* ============================================================

//* Definition:
//* A variable is a named binding used to store or reference
//* a value so that the program can use that value later.


//* ------------------------------------------------------------
//* 1. DECLARING VARIABLES
//* ------------------------------------------------------------

//* JavaScript provides `let`, `const`, and `var` declarations.
//* Prefer `const` by default and use `let` when reassignment is
//* required. `var` is mainly encountered in legacy code.

let age = 21;
const name = "Ravi";
var city = "Nawada";

console.log(name); // Ravi
console.log(age);  // 21
console.log(city); // Nawada


//* ------------------------------------------------------------
//* 2. CONST
//* ------------------------------------------------------------

//* Definition:
//* `const` creates a binding that cannot be reassigned after
//* initialization.

const country = "India";

console.log(country); // India

// country = "Japan";
// TypeError: Assignment to a constant variable.

//* Important:
//* `const` does not make referenced objects or arrays immutable.

const user = {
  name: "Ravi",
};

user.name = "Rahul";

console.log(user.name); // Rahul


//* ------------------------------------------------------------
//* 3. LET
//* ------------------------------------------------------------

//* Definition:
//* `let` creates a block-scoped binding that can be reassigned.

let score = 10;

console.log(score); // 10

score = 20;

console.log(score); // 20


//* ------------------------------------------------------------
//* 4. VAR
//* ------------------------------------------------------------

//* Definition:
//* `var` creates a function-scoped binding and has older
//* declaration semantics, including hoisting behavior.
//* Modern code generally prefers `let` and `const`.

var username = "Ravi";
username = "Rahul";

console.log(username); // Rahul


//* ------------------------------------------------------------
//* 5. REASSIGNMENT VS REDECLARATION
//* ------------------------------------------------------------

let points = 100;
points = 150; // Reassignment is allowed.

console.log(points); // 150

const level = 5;

// level = 6; // Not allowed.

//* A `let` binding cannot be redeclared in the same scope:

let language = "JavaScript";
// let language = "TypeScript"; // SyntaxError

//* A `const` binding also cannot be redeclared in the same scope.


//* ------------------------------------------------------------
//* 6. INITIALIZATION
//* ------------------------------------------------------------

//* Initialization means giving a variable its first value.

let message = "Hello";

console.log(message); // Hello

//* `const` must be initialized when declared:

// const gravity; // SyntaxError

const gravity = 9.8;
console.log(gravity); // 9.8


//* ------------------------------------------------------------
//* 7. DECLARATION WITHOUT INITIALIZATION
//* ------------------------------------------------------------

//* `let` and `var` can be declared without an initial value.

let result;
var total;

console.log(result); // undefined
console.log(total);  // undefined

result = 50;
console.log(result); // 50


//* ------------------------------------------------------------
//* 8. BLOCK SCOPE
//* ------------------------------------------------------------

//* Definition:
//* A block is code enclosed by `{}`. `let` and `const` are
//* block-scoped, meaning their bindings are limited to that block.

if (true) {
  let insideBlock = "visible here";
  const anotherValue = 123;

  console.log(insideBlock);   // visible here
  console.log(anotherValue);  // 123
}

// console.log(insideBlock); // ReferenceError
// console.log(anotherValue); // ReferenceError


//* ------------------------------------------------------------
//* 9. FUNCTION SCOPE OF VAR
//* ------------------------------------------------------------

//* `var` is function-scoped rather than block-scoped.

function demonstrateVar() {
  if (true) {
    var value = "available in the function";
  }

  console.log(value); // available in the function
}

demonstrateVar();


//* ------------------------------------------------------------
//* 10. SHADOWING
//* ------------------------------------------------------------

//* Definition:
//* Shadowing occurs when a declaration in an inner scope uses
//* the same name as a declaration in an outer scope.

const role = "student";

{
  const role = "teacher";
  console.log(role); // teacher
}

console.log(role); // student


//* ------------------------------------------------------------
//* 11. HOISTING
//* ------------------------------------------------------------

//* Definition:
//* Hoisting describes how declarations are processed before
//* execution of their surrounding code. The exact behavior
//* differs between `var`, `let`, and `const`.

console.log(legacyValue); // undefined
var legacyValue = 10;

//* `let` and `const` declarations are also created during scope
//* setup, but accessing them before initialization throws because
//* they are in the Temporal Dead Zone (TDZ).

// console.log(modernValue); // ReferenceError
let modernValue = 20;

// console.log(constValue); // ReferenceError
const constValue = 30;


//* ------------------------------------------------------------
//* 12. TEMPORAL DEAD ZONE (TDZ)
//* ------------------------------------------------------------

//* Definition:
//* The Temporal Dead Zone is the portion of a scope from the
//* start of that scope until a `let` or `const` declaration is
//* initialized, during which accessing that binding throws.

{
  // console.log(languageName); // ReferenceError
  const languageName = "JavaScript";
  console.log(languageName); // JavaScript
}


//* ------------------------------------------------------------
//* 13. VARIABLES CAN REFER TO DIFFERENT TYPES OF VALUES
//* ------------------------------------------------------------

//* JavaScript is dynamically typed: a binding can later refer
//* to a value with a different type.

let value = 100;
console.log(typeof value); // number

value = "100";
console.log(typeof value); // string

value = true;
console.log(typeof value); // boolean


//* ------------------------------------------------------------
//* 14. PRIMITIVE VALUE VS OBJECT REFERENCE
//* ------------------------------------------------------------

//* Primitive values are immutable values such as strings and
//* numbers. Objects are mutable values and variables hold a
//* reference to the object value.

let firstNumber = 10;
let secondNumber = firstNumber;

secondNumber = 20;

console.log(firstNumber);  // 10
console.log(secondNumber); // 20

const firstUser = { name: "Ravi" };
const secondUser = firstUser;

secondUser.name = "Rahul";

console.log(firstUser.name);  // Rahul
console.log(secondUser.name); // Rahul


//* ------------------------------------------------------------
//* 15. MULTIPLE VARIABLES
//* ------------------------------------------------------------

const firstName = "Ravi";
const lastName = "Kumar";
const ageValue = 21;

console.log(firstName, lastName, ageValue);


//* ------------------------------------------------------------
//* 16. VARIABLE NAMING RULES
//* ------------------------------------------------------------

//* Valid examples:

const userName = "Ravi";
const user_age = 21;
const $price = 499;
const item2 = "Book";

console.log(userName, user_age, $price, item2);

//* Invalid examples (do not run):

// const 2items = 10;       // Cannot start with a digit.
// const user-name = "R";   // `-` is not valid in an identifier.
// const let = 10;          // Reserved keyword.

//* JavaScript identifiers are case-sensitive:

const userNameValue = "Ravi";
const usernameValue = "Rahul";

console.log(userNameValue);  // Ravi
console.log(usernameValue);  // Rahul


//* ------------------------------------------------------------
//* 17. USE MEANINGFUL NAMES
//* ------------------------------------------------------------

//* Avoid unclear names:

const x = 499;

//* Prefer names that communicate intent:

const productPrice = 499;

console.log(productPrice); // 499


//* ------------------------------------------------------------
//* 18. REAL-WORLD EXAMPLE: SHOPPING CART
//* ------------------------------------------------------------

const productName = "Keyboard";
const productPriceValue = 1200;
let quantity = 2;

const cartTotal = productPriceValue * quantity;

console.log(productName); // Keyboard
console.log(cartTotal);   // 2400

quantity = 3;

console.log(productPriceValue * quantity); // 3600


//* ------------------------------------------------------------
//* 19. REAL-WORLD EXAMPLE: USER PROFILE
//* ------------------------------------------------------------

const profile = {
  name: "Ravi",
  age: 21,
  role: "Web Developer",
};

console.log(profile.name); // Ravi
console.log(profile.age);  // 21
console.log(profile.role); // Web Developer


//* ------------------------------------------------------------
//* 20. COMMON MISTAKE: USING CONST FOR REASSIGNMENT
//* ------------------------------------------------------------

// const count = 1;
// count = count + 1; // TypeError

//* If the binding must change, use `let`:

let count = 1;
count = count + 1;

console.log(count); // 2


//* ------------------------------------------------------------
//* 21. COMMON MISTAKE: THINKING CONST MAKES OBJECTS IMMUTABLE
//* ------------------------------------------------------------

const settings = {
  theme: "dark",
};

settings.theme = "light";

console.log(settings.theme); // light

//* The binding still refers to the same object.
//* Reassigning the binding would fail:

// settings = {}; // TypeError


//* ------------------------------------------------------------
//* 22. BEST PRACTICE
//* ------------------------------------------------------------

//* Start with `const`.
//* Change to `let` only when reassignment is required.
//* Avoid `var` in new code unless you specifically need its
//* legacy function-scoping behavior.

const appName = "JavaScript Learning System";
let currentLesson = 1;

currentLesson = currentLesson + 1;

console.log(appName);       // JavaScript Learning System
console.log(currentLesson); // 2


//* ------------------------------------------------------------
//* 23. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1:
//* Create variables for name, age, city, and profession.

//* Challenge 2:
//* Store a product price and quantity, then calculate the total.

//* Challenge 3:
//* Create a `let` variable and demonstrate reassignment.

//* Challenge 4:
//* Create a `const` object and change one of its properties.

//* Challenge 5:
//* Demonstrate block scope with `let` and `const`.

//* Challenge 6:
//* Explain why `const value;` is invalid.


//* ------------------------------------------------------------
//* 24. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is a variable?
//* 2. What is the difference between `let` and `const`?
//* 3. What is `var` and why is it usually avoided in new code?
//* 4. What is reassignment?
//* 5. What is initialization?
//* 6. What does block scope mean?
//* 7. What is hoisting?
//* 8. What is the Temporal Dead Zone?
//* 9. Does `const` make an object immutable?
//* 10. Why should variable names communicate intent?


//* ============================================================
//* END OF VARIABLES
//* ============================================================
