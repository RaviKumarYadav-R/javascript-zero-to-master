//* ============================================================
//* JAVASCRIPT FUNCTIONS — PRACTICAL COMPANION
//* ============================================================

//* Definition:
//* A function is a reusable block of code that can receive input,
//* perform work, and optionally return a result.

//* Basic idea:
//* input -> function -> processing -> output


//* ------------------------------------------------------------
//* 1. FUNCTION DECLARATION
//* ------------------------------------------------------------

function greet() {
  console.log("Hello, JavaScript!");
}

greet();

//* A function declaration defines a function with the `function`
//* keyword, a name, parameters, and a function body.


//* ------------------------------------------------------------
//* 2. FUNCTION CALL / INVOCATION
//* ------------------------------------------------------------

function sayHello() {
  console.log("Hello Ravi");
}

//* Defining a function does not execute its body.
sayHello(); // Calling/invoking the function executes it.


//* ------------------------------------------------------------
//* 3. PARAMETERS AND ARGUMENTS
//* ------------------------------------------------------------

//* Parameter = variable declared in the function definition.
//* Argument = actual value supplied when calling the function.

function greetUser(userName) {
  console.log(`Hello ${userName}`);
}

greetUser("Ravi");
greetUser("Aman");

//* `userName` is a parameter.
//* "Ravi" and "Aman" are arguments.


//* ------------------------------------------------------------
//* 4. MULTIPLE PARAMETERS
//* ------------------------------------------------------------

function addNumbers(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

console.log(addNumbers(10, 20)); // 30


//* ------------------------------------------------------------
//* 5. RETURN
//* ------------------------------------------------------------

//* `return` sends a value from the function back to its caller and
//* immediately ends that function invocation.

function multiply(a, b) {
  return a * b;
}

const result = multiply(5, 4);
console.log(result); // 20


//* ------------------------------------------------------------
//* 6. FUNCTION WITHOUT RETURN
//* ------------------------------------------------------------

function printMessage(message) {
  console.log(message);
}

const returnedValue = printMessage("Learning functions");
console.log(returnedValue); // undefined

//* If a function reaches the end without returning a value, its
//* result is `undefined`.


//* ------------------------------------------------------------
//* 7. RETURN ENDS EXECUTION
//* ------------------------------------------------------------

function checkNumber(number) {
  if (number > 0) {
    return "Positive";
  }

  return "Zero or negative";
}

console.log(checkNumber(10));
console.log(checkNumber(-5));

//* Code after an executed return in the same function invocation
//* cannot run.


//* ------------------------------------------------------------
//* 8. DEFAULT PARAMETERS
//* ------------------------------------------------------------

function welcome(name = "Guest") {
  return `Welcome, ${name}`;
}

console.log(welcome("Ravi"));
console.log(welcome()); // Welcome, Guest

//* The default is used when the corresponding argument is `undefined`.

console.log(welcome(undefined)); // Welcome, Guest
console.log(welcome(null)); // Welcome, null


//* ------------------------------------------------------------
//* 9. FUNCTION PARAMETERS ARE LOCAL BINDINGS
//* ------------------------------------------------------------

function showValue(value) {
  const doubled = value * 2;
  return doubled;
}

console.log(showValue(10));

//* `value` and `doubled` belong to this function's local scope.


//* ------------------------------------------------------------
//* 10. REST PARAMETERS
//* ------------------------------------------------------------

//* Rest parameters collect remaining arguments into an array.

function sumAll(...numbers) {
  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total;
}

console.log(sumAll(1, 2, 3)); // 6
console.log(sumAll(10, 20, 30, 40)); // 100


//* ------------------------------------------------------------
//* 11. REST PARAMETER RULE
//* ------------------------------------------------------------

//* The rest parameter must be the last parameter.

//* Invalid example:
//* function example(...numbers, last) {}


//* ------------------------------------------------------------
//* 12. FUNCTION EXPRESSIONS
//* ------------------------------------------------------------

//* A function expression creates a function value and stores it in
//* a variable.

const subtract = function (a, b) {
  return a - b;
};

console.log(subtract(20, 5)); // 15


//* ------------------------------------------------------------
//* 13. ANONYMOUS FUNCTION
//* ------------------------------------------------------------

//* A function expression can use an anonymous function (no function
//* name after the `function` keyword).

const divide = function (a, b) {
  return a / b;
};

console.log(divide(20, 4)); // 5


//* ------------------------------------------------------------
//* 14. NAMED FUNCTION EXPRESSION
//* ------------------------------------------------------------

const factorial = function calculateFactorial(number) {
  if (number <= 1) {
    return 1;
  }

  return number * calculateFactorial(number - 1);
};

console.log(factorial(5)); // 120

//* The internal function name can be useful for recursion and debugging.


//* ------------------------------------------------------------
//* 15. ARROW FUNCTIONS
//* ------------------------------------------------------------

const square = (number) => {
  return number * number;
};

console.log(square(6)); // 36


//* ------------------------------------------------------------
//* 16. ARROW FUNCTION IMPLICIT RETURN
//* ------------------------------------------------------------

//* If an arrow function has one expression without a block body,
//* that expression is returned automatically.

const cube = (number) => number ** 3;

console.log(cube(3)); // 27


//* Parentheses can be omitted for one parameter:
const double = number => number * 2;

console.log(double(8)); // 16

//* With zero parameters, parentheses are required:
const getVersion = () => "1.0.0";

console.log(getVersion());


//* ------------------------------------------------------------
//* 17. ARROW FUNCTION BLOCK BODY GOTCHA
//* ------------------------------------------------------------

const correctObject = () => ({
  name: "Ravi",
  role: "Developer",
});

console.log(correctObject());

//* If you use `{}` as the arrow body, it is a block body.
//* To implicitly return an object literal, wrap the object in `()`.

//* This does NOT return an object:
//* const wrongObject = () => {
//*   name: "Ravi"
//* };


//* ------------------------------------------------------------
//* 18. FIRST-CLASS FUNCTIONS
//* ------------------------------------------------------------

//* JavaScript functions are values. They can be stored in variables,
//* passed to functions, and returned from functions.

const operation = addNumbers;
console.log(operation(2, 3)); // 5


//* ------------------------------------------------------------
//* 19. PASSING A FUNCTION AS AN ARGUMENT
//* ------------------------------------------------------------

function calculate(a, b, operation) {
  return operation(a, b);
}

function add(a, b) {
  return a + b;
}

function multiplyValues(a, b) {
  return a * b;
}

console.log(calculate(5, 3, add)); // 8
console.log(calculate(5, 3, multiplyValues)); // 15


//* ------------------------------------------------------------
//* 20. CALLBACK FUNCTION
//* ------------------------------------------------------------

//* A callback is a function supplied to another function so that
//* the receiving function can call it at the appropriate time.

function processUser(name, callback) {
  const message = `User: ${name}`;
  callback(message);
}

processUser("Ravi", (message) => {
  console.log(message);
});


//* ------------------------------------------------------------
//* 21. FUNCTION RETURNING A FUNCTION
//* ------------------------------------------------------------

function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

const multiplyBy10 = createMultiplier(10);
console.log(multiplyBy10(7)); // 70

//* This example also introduces a closure: the returned function can
//* access `multiplier` from the surrounding function scope.


//* ------------------------------------------------------------
//* 22. HIGHER-ORDER FUNCTION
//* ------------------------------------------------------------

//* A higher-order function is a function that takes one or more
//* functions as arguments, returns a function, or both.

function applyTwice(fn, value) {
  return fn(fn(value));
}

const increment = (number) => number + 1;

console.log(applyTwice(increment, 5)); // 7


//* ------------------------------------------------------------
//* 23. PURE FUNCTION
//* ------------------------------------------------------------

//* A pure function, in the common functional-programming sense,
//* produces the same output for the same relevant inputs and does
//* not cause observable side effects.

function calculateArea(width, height) {
  return width * height;
}

console.log(calculateArea(10, 5)); // 50
console.log(calculateArea(10, 5)); // 50


//* ------------------------------------------------------------
//* 24. SIDE EFFECT
//* ------------------------------------------------------------

//* A side effect is an observable interaction outside simply
//* calculating and returning a value, such as logging, changing
//* external state, writing to a database, or modifying the DOM.

let loginCount = 0;

function recordLogin() {
  loginCount += 1;
}

recordLogin();
recordLogin();
console.log(loginCount); // 2


//* ------------------------------------------------------------
//* 25. FUNCTION DECLARATION HOISTING
//* ------------------------------------------------------------

//* Function declarations are available before their declaration in
//* their applicable scope because function declarations are hoisted.

console.log(squareBeforeDeclaration(4)); // 16

function squareBeforeDeclaration(number) {
  return number * number;
}


//* ------------------------------------------------------------
//* 26. FUNCTION EXPRESSION AND const
//* ------------------------------------------------------------

//* A function expression assigned to `const` is not callable before
//* its initialization.

//* Invalid at runtime:
//* console.log(addBeforeInitialization(2, 3));
//* const addBeforeInitialization = (a, b) => a + b;

const addAfterInitialization = (a, b) => a + b;
console.log(addAfterInitialization(2, 3));


//* ------------------------------------------------------------
//* 27. FUNCTION DECLARATION VS FUNCTION EXPRESSION
//* ------------------------------------------------------------

//* Declaration:
//* function greet() {}
//*
//* Expression:
//* const greet = function () {};

//* They are both functions, but their syntax and initialization/
//* hoisting behavior differ.


//* ------------------------------------------------------------
//* 28. SCOPE INSIDE FUNCTIONS
//* ------------------------------------------------------------

const globalMessage = "Outside";

function scopeExample() {
  const localMessage = "Inside";

  console.log(globalMessage); // accessible from outer scope
  console.log(localMessage); // local to this function
}

scopeExample();

//* `localMessage` cannot be accessed from here:
//* console.log(localMessage);


//* ------------------------------------------------------------
//* 29. CLOSURE BASICS
//* ------------------------------------------------------------

function createCounter() {
  let count = 0;

  return function () {
    count += 1;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

//* The returned function closes over the `count` binding.


//* ------------------------------------------------------------
//* 30. RECURSION
//* ------------------------------------------------------------

//* Recursion means a function calls itself to solve a problem by
//* reducing it toward a base case.

function countdown(number) {
  if (number <= 0) {
    return;
  }

  console.log(number);
  countdown(number - 1);
}

countdown(3);

//* Every useful recursive solution needs a termination/base condition.


//* ------------------------------------------------------------
//* 31. RECURSIVE FACTORIAL
//* ------------------------------------------------------------

function factorialNumber(number) {
  if (number < 0 || !Number.isInteger(number)) {
    return undefined;
  }

  if (number === 0 || number === 1) {
    return 1;
  }

  return number * factorialNumber(number - 1);
}

console.log(factorialNumber(5)); // 120


//* ------------------------------------------------------------
//* 32. ARGUMENTS OBJECT
//* ------------------------------------------------------------

//* Traditional non-arrow functions have an `arguments` object that
//* contains arguments passed to that invocation.

function showArguments() {
  console.log(arguments.length);
  console.log(arguments[0]);
  console.log(arguments[1]);
}

showArguments("A", "B", "C");

//* Arrow functions do not have their own `arguments` binding.
//* Prefer rest parameters when you need arbitrary arguments.


//* ------------------------------------------------------------
//* 33. REST PARAMETERS VS arguments
//* ------------------------------------------------------------

function sumWithRest(...numbers) {
  return numbers.reduce((total, number) => total + number, 0);
}

console.log(sumWithRest(1, 2, 3, 4)); // 10

//* Rest parameters are actual arrays and make the function's intent
//* explicit.


//* ------------------------------------------------------------
//* 34. THIS IN REGULAR FUNCTIONS
//* ------------------------------------------------------------

const userProfile = {
  name: "Ravi",
  greet() {
    return `Hello ${this.name}`;
  },
};

console.log(userProfile.greet()); // Hello Ravi

//* In a method call `userProfile.greet()`, `this` refers to the
//* receiver object (`userProfile`) for that call.


//* ------------------------------------------------------------
//* 35. ARROW FUNCTIONS DO NOT HAVE THEIR OWN THIS
//* ------------------------------------------------------------

const team = {
  name: "Frontend Team",
  regularMethod() {
    return this.name;
  },
  arrowMethod: () => this,
};

console.log(team.regularMethod());
console.log(team.arrowMethod());

//* Arrow functions capture `this` lexically from their surrounding
//* context. They do not get a new `this` from the object call syntax.


//* ------------------------------------------------------------
//* 36. FUNCTION LENGTH
//* ------------------------------------------------------------

function exampleLength(first, second, third = 3, ...rest) {
  return [first, second, third, rest];
}

console.log(exampleLength.length); // 2

//* Function `length` counts parameters before the first parameter
//* with a default value; rest parameters are not counted.


//* ------------------------------------------------------------
//* 37. FUNCTION NAME
//* ------------------------------------------------------------

const namedFunction = function doWork() {
  return "done";
};

console.log(namedFunction.name); // doWork


//* ------------------------------------------------------------
//* 38. METHOD SHORTHAND
//* ------------------------------------------------------------

const calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
};

console.log(calculator.add(10, 5));
console.log(calculator.subtract(10, 5));


//* ------------------------------------------------------------
//* 39. OPTIONAL PARAMETERS
//* ------------------------------------------------------------

function formatUser(name, role = "user") {
  return `${name} (${role})`;
}

console.log(formatUser("Ravi"));
console.log(formatUser("Ravi", "admin"));


//* ------------------------------------------------------------
//* 40. INPUT VALIDATION INSIDE A FUNCTION
//* ------------------------------------------------------------

function calculateDiscount(price, discountPercent) {
  if (!Number.isFinite(price) || !Number.isFinite(discountPercent)) {
    return undefined;
  }

  if (price < 0 || discountPercent < 0 || discountPercent > 100) {
    return undefined;
  }

  return price - (price * discountPercent) / 100;
}

console.log(calculateDiscount(1000, 20)); // 800
console.log(calculateDiscount(1000, 150)); // undefined


//* ------------------------------------------------------------
//* 41. EARLY RETURN
//* ------------------------------------------------------------

function canAccessDashboard(user) {
  if (!user) {
    return false;
  }

  if (!user.isVerified) {
    return false;
  }

  if (user.isBlocked) {
    return false;
  }

  return true;
}

console.log(
  canAccessDashboard({ isVerified: true, isBlocked: false })
); // true

console.log(canAccessDashboard(null)); // false

//* Early returns can reduce deeply nested conditionals.


//* ------------------------------------------------------------
//* 42. FUNCTION COMPOSITION
//* ------------------------------------------------------------

function addOne(number) {
  return number + 1;
}

function doubleNumber(number) {
  return number * 2;
}

const composedResult = doubleNumber(addOne(4));
console.log(composedResult); // 10

//* One function's output becomes another function's input.


//* ------------------------------------------------------------
//* 43. REAL-WORLD: LOGIN FUNCTION
//* ------------------------------------------------------------

function login(username, password, isVerified, isBlocked) {
  if (!username || !password) {
    return "Username and password are required";
  }

  if (isBlocked) {
    return "Account is blocked";
  }

  if (!isVerified) {
    return "Account is not verified";
  }

  return "Login successful";
}

console.log(login("ravi", "1234", true, false));
console.log(login("ravi", "1234", false, false));
console.log(login("ravi", "1234", true, true));


//* ------------------------------------------------------------
//* 44. REAL-WORLD: REUSABLE CART FUNCTION
//* ------------------------------------------------------------

function calculateCartTotal(items) {
  let total = 0;

  for (const item of items) {
    total += item.price * item.quantity;
  }

  return total;
}

const items = [
  { price: 100, quantity: 2 },
  { price: 250, quantity: 1 },
];

console.log(calculateCartTotal(items)); // 450


//* ------------------------------------------------------------
//* 45. COMMON MISTAKE: CALLING INSTEAD OF PASSING
//* ------------------------------------------------------------

function execute(fn) {
  return fn();
}

function sayDone() {
  return "Done";
}

console.log(execute(sayDone));

//* Pass the function itself: `sayDone`
//* Call the function immediately: `sayDone()`
//* Which one you need depends on when execution should happen.


//* ------------------------------------------------------------
//* 46. COMMON MISTAKE: FORGETTING RETURN
//* ------------------------------------------------------------

function wrongAdd(a, b) {
  a + b;
}

function correctAdd(a, b) {
  return a + b;
}

console.log(wrongAdd(2, 3)); // undefined
console.log(correctAdd(2, 3)); // 5


//* ------------------------------------------------------------
//* 47. COMMON MISTAKE: USING = INSTEAD OF ==/===
//* ------------------------------------------------------------

function isAdult(age) {
  return age >= 18;
}

console.log(isAdult(21)); // true

//* Assignment uses `=`.
//* Equality comparisons should normally use `===` when comparing
//* values without intentional coercion.


//* ------------------------------------------------------------
//* 48. COMMON MISTAKE: TOO MANY RESPONSIBILITIES
//* ------------------------------------------------------------

//* Avoid giant functions that validate input, access a database,
//* format HTML, send emails, and calculate business rules all at once.

//* Prefer focused functions when responsibilities are naturally separate.

function calculateSubtotal(price, quantity) {
  return price * quantity;
}

function calculateTax(subtotal, taxRate) {
  return subtotal * taxRate;
}

const subtotal = calculateSubtotal(100, 2);
const tax = calculateTax(subtotal, 0.18);

console.log(subtotal, tax, subtotal + tax);


//* ------------------------------------------------------------
//* 49. FUNCTION DESIGN CHECKLIST
//* ------------------------------------------------------------

//* Before creating a function, ask:
//* 1. What single job should it perform?
//* 2. What inputs does it need?
//* 3. What should it return?
//* 4. Can invalid input occur?
//* 5. Does it cause side effects?
//* 6. Is the name descriptive?
//* 7. Can the function be tested independently?


//* ------------------------------------------------------------
//* 50. OUTPUT PREDICTION
//* ------------------------------------------------------------

function mystery(number) {
  if (number > 10) {
    return number * 2;
  }

  return number + 2;
}

console.log(mystery(5)); // 7
console.log(mystery(20)); // 40

//* Predict the output before running the code.


//* ------------------------------------------------------------
//* 51. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1:
//* Create a function that converts Celsius to Fahrenheit.

//* Challenge 2:
//* Create a function that checks whether a number is even.

//* Challenge 3:
//* Create a function that accepts any number of values using rest
//* parameters and returns their average.

//* Challenge 4:
//* Create a function that returns the largest of three numbers.

//* Challenge 5:
//* Create a function that accepts another function and applies it
//* to every number in an array.

//* Challenge 6:
//* Create a closure-based counter with increment and reset methods.

//* Challenge 7:
//* Write a recursive function that calculates the sum from 1 to n.

//* Challenge 8:
//* Rewrite a nested conditional using early returns.


//* ------------------------------------------------------------
//* 52. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1:
//* Why does this return undefined?
//* function add(a, b) {
//*   a + b;
//* }

//* Debug 2:
//* Why does this not create the expected object?
//* const createUser = () => {
//*   name: "Ravi"
//* };

//* Debug 3:
//* What is the difference between:
//* execute(sayDone)
//* execute(sayDone())

//* Debug 4:
//* Why can an arrow function behave differently from a regular
//* function when `this` is involved?

//* Debug 5:
//* Find the base case in a recursive function. What happens if it is
//* missing or unreachable?


//* ------------------------------------------------------------
//* 53. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is a function?
//* 2. What is the difference between a parameter and an argument?
//* 3. What does `return` do?
//* 4. What does a function return when it reaches the end without return?
//* 5. What is a function declaration?
//* 6. What is a function expression?
//* 7. What is an arrow function?
//* 8. What is an implicit return?
//* 9. What is a callback?
//* 10. What is a higher-order function?
//* 11. What does it mean that functions are first-class values?
//* 12. What is a pure function?
//* 13. What is a side effect?
//* 14. What is a closure?
//* 15. What is recursion?
//* 16. Why does recursion need a base case?
//* 17. What are rest parameters?
//* 18. How are rest parameters different from `arguments`?
//* 19. How is `this` handled differently by arrow functions?
//* 20. What is the difference between passing `fn` and calling `fn()`?


//* ============================================================
//* END OF FUNCTIONS
//* ============================================================
