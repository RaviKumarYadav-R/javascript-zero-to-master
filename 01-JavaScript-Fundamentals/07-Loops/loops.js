//* ============================================================
//* JAVASCRIPT LOOPS
//* ============================================================

//* This file is the practical companion to README.md.
//* A loop repeats a block of code while a condition or collection
//* says that more work remains.


//* ------------------------------------------------------------
//* 1. WHAT IS A LOOP?
//* ------------------------------------------------------------

//* Definition:
//* A loop is a control-flow structure used to execute code
//* repeatedly without writing the same code again and again.

for (let i = 1; i <= 5; i++) {
  console.log(i);
}

//* Output:
//* 1
//* 2
//* 3
//* 4
//* 5


//* ------------------------------------------------------------
//* 2. FOR LOOP
//* ------------------------------------------------------------

//* Syntax:
//* for (initialization; condition; update) {
//*   // repeated code
//* }

//* How it works:
//* 1. Initialization runs once.
//* 2. Condition is checked.
//* 3. Body runs if condition is truthy.
//* 4. Update runs.
//* 5. Steps 2-4 repeat.

for (let count = 0; count < 3; count++) {
  console.log("Count:", count);
}


//* ------------------------------------------------------------
//* 3. WHY i < length, NOT i <= length?
//* ------------------------------------------------------------

const fruits = ["Apple", "Banana", "Mango"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

//* Valid indexes are 0, 1, 2.
//* `i <= fruits.length` would eventually access index 3,
//* which is outside the array and produces undefined.


//* ------------------------------------------------------------
//* 4. LOOP THROUGH ARRAY WITH INDEX
//* ------------------------------------------------------------

const prices = [100, 250, 75, 500];

for (let i = 0; i < prices.length; i++) {
  console.log(`Price ${i + 1}: ₹${prices[i]}`);
}


//* ------------------------------------------------------------
//* 5. SUM VALUES WITH A LOOP
//* ------------------------------------------------------------

const numbers = [10, 20, 30, 40];
let total = 0;

for (let i = 0; i < numbers.length; i++) {
  total += numbers[i];
}

console.log("Total:", total); // 100


//* ------------------------------------------------------------
//* 6. FIND THE LARGEST NUMBER
//* ------------------------------------------------------------

const values = [12, 45, 7, 89, 23];
let largest = values[0];

for (let i = 1; i < values.length; i++) {
  if (values[i] > largest) {
    largest = values[i];
  }
}

console.log("Largest:", largest); // 89


//* ------------------------------------------------------------
//* 7. WHILE LOOP
//* ------------------------------------------------------------

//* Definition:
//* A `while` loop checks its condition before every iteration.
//* If the condition is initially false, it may run zero times.

let count = 1;

while (count <= 3) {
  console.log("while:", count);
  count++;
}


//* ------------------------------------------------------------
//* 8. IMPORTANT: UPDATE THE WHILE LOOP
//* ------------------------------------------------------------

//* The loop variable must eventually change so the condition can
//* become false. Otherwise, you can create an infinite loop.

let step = 1;

while (step <= 5) {
  console.log(step);
  step++; // moves toward the stopping condition
}


//* ------------------------------------------------------------
//* 9. DO...WHILE LOOP
//* ------------------------------------------------------------

//* Definition:
//* `do...while` executes its body first and checks the condition
//* afterward. Therefore, the body always runs at least once.

let attempt = 1;

do {
  console.log("Attempt:", attempt);
  attempt++;
} while (attempt <= 3);


//* Even a false initial condition runs once:
let value = 10;

do {
  console.log("Runs once:", value);
} while (value < 5);


//* ------------------------------------------------------------
//* 10. FOR...OF
//* ------------------------------------------------------------

//* Definition:
//* `for...of` iterates over values produced by an iterable.
//* Arrays, strings, Maps, and Sets are common examples.

const names = ["Ravi", "Aman", "Neha"];

for (const name of names) {
  console.log(name);
}


//* ------------------------------------------------------------
//* 11. FOR...OF WITH A STRING
//* ------------------------------------------------------------

const word = "JavaScript";

for (const character of word) {
  console.log(character);
}


//* ------------------------------------------------------------
//* 12. FOR...IN
//* ------------------------------------------------------------

//* Definition:
//* `for...in` iterates over enumerable property keys.
//* It is commonly used with objects, but remember that inherited
//* enumerable properties can also be observed.

const person = {
  name: "Ravi",
  age: 21,
  role: "Developer",
};

for (const key in person) {
  console.log(key, "=", person[key]);
}


//* ------------------------------------------------------------
//* 13. FOR...IN VS FOR...OF
//* ------------------------------------------------------------

const colors = ["red", "green", "blue"];

//* for...in -> keys/indexes
for (const index in colors) {
  console.log("index:", index);
}

//* for...of -> values
for (const color of colors) {
  console.log("value:", color);
}

//* Rule of thumb:
//* - Object properties -> often for...in (with ownership awareness)
//* - Iterable values -> for...of
//* - Need index + array control -> traditional for


//* ------------------------------------------------------------
//* 14. NESTED LOOPS
//* ------------------------------------------------------------

//* Definition:
//* A nested loop is a loop inside another loop.

for (let row = 1; row <= 3; row++) {
  for (let column = 1; column <= 3; column++) {
    console.log(`row=${row}, column=${column}`);
  }
}


//* ------------------------------------------------------------
//* 15. MULTIPLICATION TABLE
//* ------------------------------------------------------------

const tableNumber = 5;

for (let i = 1; i <= 10; i++) {
  console.log(`${tableNumber} x ${i} = ${tableNumber * i}`);
}


//* ------------------------------------------------------------
//* 16. BREAK
//* ------------------------------------------------------------

//* Definition:
//* `break` immediately exits the nearest loop or switch.

for (let i = 1; i <= 10; i++) {
  if (i === 6) {
    break;
  }

  console.log(i);
}

//* Output: 1 2 3 4 5


//* ------------------------------------------------------------
//* 17. SEARCH USING BREAK
//* ------------------------------------------------------------

const users = ["Aman", "Ravi", "Neha", "Priya"];
const target = "Neha";
let found = false;

for (const user of users) {
  if (user === target) {
    found = true;
    break;
  }
}

console.log("Found:", found); // true


//* ------------------------------------------------------------
//* 18. CONTINUE
//* ------------------------------------------------------------

//* Definition:
//* `continue` skips the rest of the current iteration and moves
//* to the next iteration of the nearest loop.

for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }

  console.log(i);
}

//* Output: 1 2 4 5


//* ------------------------------------------------------------
//* 19. EVEN NUMBERS
//* ------------------------------------------------------------

for (let i = 1; i <= 20; i++) {
  if (i % 2 !== 0) {
    continue;
  }

  console.log(i);
}


//* ------------------------------------------------------------
//* 20. ODD NUMBERS
//* ------------------------------------------------------------

for (let i = 1; i <= 20; i++) {
  if (i % 2 === 0) {
    continue;
  }

  console.log(i);
}


//* ------------------------------------------------------------
//* 21. COMMON CONTINUE MISTAKE IN WHILE
//* ------------------------------------------------------------

//* Dangerous pattern:
//* while (condition) {
//*   if (someCondition) continue;
//*   counter++;
//* }
//*
//* If `someCondition` is true, counter++ is skipped and the loop
//* may never make progress.

//* Safer structure:
let n = 0;

while (n < 5) {
  n++; // update happens before a possible continue

  if (n === 3) {
    continue;
  }

  console.log("n:", n);
}


//* ------------------------------------------------------------
//* 22. LOOP WITH CONDITIONAL LOGIC
//* ------------------------------------------------------------

const scores = [45, 78, 92, 33, 88];

for (const score of scores) {
  if (score >= 90) {
    console.log(score, "Excellent");
  } else if (score >= 50) {
    console.log(score, "Passed");
  } else {
    console.log(score, "Failed");
  }
}


//* ------------------------------------------------------------
//* 23. LOOP OVER OBJECT KEYS
//* ------------------------------------------------------------

const product = {
  name: "Keyboard",
  price: 1200,
  stock: 15,
};

for (const key of Object.keys(product)) {
  console.log(`${key}:`, product[key]);
}

//* This is often clearer than relying directly on for...in when
//* you explicitly want the object's own enumerable keys.


//* ------------------------------------------------------------
//* 24. LOOP OVER OBJECT VALUES
//* ------------------------------------------------------------

for (const value of Object.values(product)) {
  console.log(value);
}


//* ------------------------------------------------------------
//* 25. LOOP OVER OBJECT ENTRIES
//* ------------------------------------------------------------

for (const [key, value] of Object.entries(product)) {
  console.log(`${key}: ${value}`);
}


//* ------------------------------------------------------------
//* 26. LABELLED BREAK
//* ------------------------------------------------------------

//* A labelled break can exit an outer loop from inside a nested loop.
//* Use it sparingly because ordinary functions or extracted logic
//* are often easier to understand.

let foundPair = false;

outerLoop: for (let a = 1; a <= 3; a++) {
  for (let b = 1; b <= 3; b++) {
    if (a * b === 4) {
      foundPair = true;
      break outerLoop;
    }
  }
}

console.log("Pair found:", foundPair); // true


//* ------------------------------------------------------------
//* 27. INFINITE LOOP - UNDERSTAND IT, DON'T RUN IT
//* ------------------------------------------------------------

//* This would never stop:
//* while (true) {
//*   console.log("Forever");
//* }
//*
//* Infinite loops are sometimes intentional in servers/event loops,
//* but a beginner should always know what causes the exit condition.


//* ------------------------------------------------------------
//* 28. OFF-BY-ONE ERROR
//* ------------------------------------------------------------

const items = ["A", "B", "C"];

//* Correct:
for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}

//* Common mistake:
//* for (let i = 0; i <= items.length; i++) { ... }
//* The last iteration reads items[3], which is undefined.


//* ------------------------------------------------------------
//* 29. REAL-WORLD CART TOTAL
//* ------------------------------------------------------------

const cart = [
  { name: "Mouse", price: 700, quantity: 2 },
  { name: "Keyboard", price: 1200, quantity: 1 },
  { name: "Pad", price: 300, quantity: 3 },
];

let cartTotal = 0;

for (const item of cart) {
  cartTotal += item.price * item.quantity;
}

console.log("Cart total:", cartTotal); // 4000


//* ------------------------------------------------------------
//* 30. REAL-WORLD VALIDATION LOOP
//* ------------------------------------------------------------

const requiredFields = ["username", "email", "password"];
const formData = {
  username: "ravi",
  email: "ravi@example.com",
  password: "secret123",
};

let formIsValid = true;

for (const field of requiredFields) {
  if (!formData[field]) {
    formIsValid = false;
    break;
  }
}

console.log("Form valid:", formIsValid); // true


//* ------------------------------------------------------------
//* 31. WHEN TO USE WHICH LOOP
//* ------------------------------------------------------------

//* `for`
//* Use when you need an explicit counter/index or known iteration flow.

//* `while`
//* Use when repetition depends on a condition and the number of
//* iterations is not necessarily known beforehand.

//* `do...while`
//* Use when the body must execute at least once before checking.

//* `for...of`
//* Use when you want values from an iterable.

//* `for...in`
//* Use for enumerable property keys, especially when working with
//* object-like data and when inheritance behavior is understood.


//* ------------------------------------------------------------
//* 32. LOOP CONTROL SUMMARY
//* ------------------------------------------------------------

//* break    -> exit the nearest loop immediately
//* continue -> skip current iteration and continue the loop
//* return   -> leave the current function entirely

function findFirstEven(numbers) {
  for (const number of numbers) {
    if (number % 2 === 0) {
      return number;
    }
  }

  return null;
}

console.log(findFirstEven([3, 7, 10, 12])); // 10


//* ------------------------------------------------------------
//* 33. OUTPUT PREDICTION
//* ------------------------------------------------------------

for (let i = 1; i <= 5; i++) {
  if (i === 2) {
    continue;
  }

  if (i === 4) {
    break;
  }

  console.log(i);
}

//* Output:
//* 1
//* 3
//*
//* At 2 -> continue skips printing.
//* At 4 -> break exits the loop.


//* ------------------------------------------------------------
//* 34. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1:
//* Print numbers from 1 to 100.

//* Challenge 2:
//* Print numbers from 100 down to 1.

//* Challenge 3:
//* Print all even numbers from 1 to 100.

//* Challenge 4:
//* Print all odd numbers from 1 to 100.

//* Challenge 5:
//* Calculate the sum from 1 to n.

//* Challenge 6:
//* Print a multiplication table for any number.

//* Challenge 7:
//* Count how many positive numbers are in an array.

//* Challenge 8:
//* Find the smallest number in an array.

//* Challenge 9:
//* Find the first number greater than 100 and stop searching.

//* Challenge 10:
//* Print an array while skipping negative numbers.

//* Challenge 11:
//* Reverse an array using a loop without reverse().

//* Challenge 12:
//* Create a nested loop that prints a 5 x 5 star pattern.

//* Challenge 13:
//* Check whether an array contains a target value using break.

//* Challenge 14:
//* Count vowels in a string using for...of.

//* Challenge 15:
//* Calculate a shopping-cart total from an array of objects.


//* ------------------------------------------------------------
//* 35. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1:
//* Why does this print undefined once?
//* const a = [10, 20, 30];
//* for (let i = 0; i <= a.length; i++) {
//*   console.log(a[i]);
//* }

//* Debug 2:
//* Find the infinite-loop problem:
//* let i = 0;
//* while (i < 5) {
//*   if (i === 2) continue;
//*   i++;
//* }

//* Debug 3:
//* Why does this skip values?
//* for (let i = 0; i < 10; i += 2) {
//*   console.log(i);
//* }
//* Is that actually a bug, or intentional behavior?


//* ------------------------------------------------------------
//* 36. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What problem do loops solve?
//* 2. Explain the three parts of a for loop.
//* 3. Why does a while loop need progress toward its exit condition?
//* 4. What is the main difference between while and do...while?
//* 5. What does for...of return?
//* 6. What does for...in iterate over?
//* 7. Why is for...in usually not the first choice for array values?
//* 8. What does break do?
//* 9. What does continue do?
//* 10. What is an off-by-one error?
//* 11. When would you use a nested loop?
//* 12. What can cause an infinite loop?
//* 13. What is the difference between break and return?


//* ============================================================
//* END OF LOOPS
//* ============================================================
