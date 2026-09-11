//* ============================================================
//* JAVASCRIPT ARRAYS — PRACTICAL COMPANION
//* ============================================================

//* Definition:
//* An Array is an ordered, zero-indexed JavaScript object used to
//* store a collection of values. Arrays can contain mixed value types.


//* ------------------------------------------------------------
//* 1. CREATING ARRAYS
//* ------------------------------------------------------------

const empty = [];
const numbers = [10, 20, 30, 40];
const mixed = ["Ravi", 21, true, null, { role: "developer" }];

console.log(empty);
console.log(numbers);
console.log(mixed);


//* ------------------------------------------------------------
//* 2. ARRAY INDEXING
//* ------------------------------------------------------------

console.log(numbers[0]); // 10
console.log(numbers[2]); // 30
console.log(numbers[10]); // undefined

//* Arrays are zero-indexed: the first element is index 0.


//* ------------------------------------------------------------
//* 3. ARRAY length
//* ------------------------------------------------------------

console.log(numbers.length); // 4
console.log(numbers[numbers.length - 1]); // 40

//* `length` is one greater than the highest array index in a normal
//* dense array, but arrays can also be sparse.


//* ------------------------------------------------------------
//* 4. ARRAYS ARE OBJECTS
//* ------------------------------------------------------------

console.log(typeof numbers); // object
console.log(Array.isArray(numbers)); // true

//* Use Array.isArray() when you specifically need to check for arrays.


//* ------------------------------------------------------------
//* 5. ARRAY MUTABILITY
//* ------------------------------------------------------------

const colors = ["red", "blue"];
colors[0] = "green";
colors.push("yellow");

console.log(colors); // ["green", "blue", "yellow"]

//* `const` prevents reassignment of the array binding, not mutation
//* of the array's contents.


//* ------------------------------------------------------------
//* 6. REASSIGNING const ARRAY IS NOT ALLOWED
//* ------------------------------------------------------------

const items = [1, 2, 3];

//* Do not run:
//* items = [4, 5, 6]; // TypeError


//* ------------------------------------------------------------
//* 7. Array() CONSTRUCTOR
//* ------------------------------------------------------------

const list = new Array(1, 2, 3);
console.log(list);

//* Prefer array literals (`[]`) for ordinary array creation.


//* ------------------------------------------------------------
//* 8. Array OF ONE NUMBER
//* ------------------------------------------------------------

const emptySlots = new Array(3);
console.log(emptySlots.length); // 3
console.log(emptySlots); // [ <3 empty items> ] in Node-style output

//* This creates a sparse array with three empty slots, not [3].


//* ------------------------------------------------------------
//* 9. Array.from()
//* ------------------------------------------------------------

const fromString = Array.from("Ravi");
console.log(fromString); // ["R", "a", "v", "i"]

const fromLength = Array.from({ length: 5 }, (_, index) => index + 1);
console.log(fromLength); // [1, 2, 3, 4, 5]


//* ------------------------------------------------------------
//* 10. Array.of()
//* ------------------------------------------------------------

console.log(Array.of(3)); // [3]
console.log(Array.of(1, 2, 3)); // [1, 2, 3]

//* Array.of() avoids the special `new Array(3)` behavior.


//* ------------------------------------------------------------
//* 11. ADD AT END — push()
//* ------------------------------------------------------------

const fruits = ["apple", "banana"];
const newLength = fruits.push("mango");

console.log(fruits); // ["apple", "banana", "mango"]
console.log(newLength); // 3

//* push() mutates the array and returns the new length.


//* ------------------------------------------------------------
//* 12. REMOVE FROM END — pop()
//* ------------------------------------------------------------

const stack = [10, 20, 30];
const removed = stack.pop();

console.log(removed); // 30
console.log(stack); // [10, 20]


//* ------------------------------------------------------------
//* 13. ADD AT START — unshift()
//* ------------------------------------------------------------

const queue = ["B", "C"];
queue.unshift("A");
console.log(queue); // ["A", "B", "C"]

//* unshift() mutates the array and generally requires shifting existing
//* indexes, so it is typically O(n).


//* ------------------------------------------------------------
//* 14. REMOVE FROM START — shift()
//* ------------------------------------------------------------

const tasks = ["task1", "task2", "task3"];
const firstTask = tasks.shift();

console.log(firstTask); // task1
console.log(tasks); // ["task2", "task3"]

//* shift() mutates the array and is generally O(n).


//* ------------------------------------------------------------
//* 15. splice() — INSERT
//* ------------------------------------------------------------

const users = ["A", "C"];
users.splice(1, 0, "B");
console.log(users); // ["A", "B", "C"]

//* splice(start, deleteCount, ...items)
//* It mutates the original array.


//* ------------------------------------------------------------
//* 16. splice() — DELETE
//* ------------------------------------------------------------

const values = [10, 20, 30, 40];
const deletedValues = values.splice(1, 2);

console.log(deletedValues); // [20, 30]
console.log(values); // [10, 40]


//* ------------------------------------------------------------
//* 17. splice() — REPLACE
//* ------------------------------------------------------------

const languages = ["HTML", "CSS", "PHP"];
languages.splice(2, 1, "JavaScript");
console.log(languages); // ["HTML", "CSS", "JavaScript"]


//* ------------------------------------------------------------
//* 18. slice() — COPY PART
//* ------------------------------------------------------------

const original = [10, 20, 30, 40, 50];

console.log(original.slice(1, 4)); // [20, 30, 40]
console.log(original.slice(2)); // [30, 40, 50]
console.log(original.slice(-2)); // [40, 50]
console.log(original); // unchanged

//* slice(start, end) includes start and excludes end.
//* slice() does not mutate the original array.


//* ------------------------------------------------------------
//* 19. COPY AN ARRAY
//* ------------------------------------------------------------

const source = [1, 2, 3];
const copy1 = source.slice();
const copy2 = [...source];
const copy3 = Array.from(source);

console.log(copy1, copy2, copy3);


//* ------------------------------------------------------------
//* 20. SHALLOW COPY WARNING
//* ------------------------------------------------------------

const originalUsers = [{ name: "Ravi" }];
const copiedUsers = [...originalUsers];

copiedUsers[0].name = "Aman";

console.log(originalUsers[0].name); // Aman

//* The array itself was copied, but the nested object reference was shared.


//* ------------------------------------------------------------
//* 21. concat()
//* ------------------------------------------------------------

const frontend = ["HTML", "CSS"];
const backend = ["Node", "MongoDB"];

const fullStack = frontend.concat(backend);
console.log(fullStack);
console.log(frontend); // unchanged


//* ------------------------------------------------------------
//* 22. includes()
//* ------------------------------------------------------------

const skills = ["HTML", "CSS", "JavaScript"];

console.log(skills.includes("JavaScript")); // true
console.log(skills.includes("Python")); // false

//* includes() uses SameValueZero comparison, so it can find NaN.

console.log([NaN].includes(NaN)); // true


//* ------------------------------------------------------------
//* 23. indexOf()
//* ------------------------------------------------------------

console.log(skills.indexOf("CSS")); // 1
console.log(skills.indexOf("Python")); // -1
console.log([NaN].indexOf(NaN)); // -1

//* indexOf() uses strict-equality-style comparison and cannot find NaN.


//* ------------------------------------------------------------
//* 24. lastIndexOf()
//* ------------------------------------------------------------

const repeated = [1, 2, 1, 3, 1];
console.log(repeated.lastIndexOf(1)); // 4


//* ------------------------------------------------------------
//* 25. find()
//* ------------------------------------------------------------

const products = [
  { id: 1, name: "Keyboard", price: 1200 },
  { id: 2, name: "Mouse", price: 700 },
  { id: 3, name: "Monitor", price: 9000 },
];

const product = products.find((item) => item.price > 1000);
console.log(product);

//* find() returns the first matching element, or undefined.


//* ------------------------------------------------------------
//* 26. findIndex()
//* ------------------------------------------------------------

const productIndex = products.findIndex((item) => item.name === "Mouse");
console.log(productIndex); // 1

//* findIndex() returns the first matching index, or -1.


//* ------------------------------------------------------------
//* 27. findLast()
//* ------------------------------------------------------------

const lastExpensive = products.findLast((item) => item.price > 1000);
console.log(lastExpensive);

//* findLast() returns the last matching element.


//* ------------------------------------------------------------
//* 28. findLastIndex()
//* ------------------------------------------------------------

const lastExpensiveIndex = products.findLastIndex((item) => item.price > 1000);
console.log(lastExpensiveIndex);


//* ------------------------------------------------------------
//* 29. filter()
//* ------------------------------------------------------------

const expensiveProducts = products.filter((item) => item.price > 1000);
console.log(expensiveProducts);

//* filter() returns a new array containing every matching element.


//* ------------------------------------------------------------
//* 30. map()
//* ------------------------------------------------------------

const prices = products.map((item) => item.price);
console.log(prices); // [1200, 700, 9000]

//* map() transforms every element and returns a new array of results.


//* ------------------------------------------------------------
//* 31. map() MUST RETURN A VALUE
//* ------------------------------------------------------------

const doubledWrong = [1, 2, 3].map((number) => {
  number * 2;
});

console.log(doubledWrong); // [undefined, undefined, undefined]

const doubledCorrect = [1, 2, 3].map((number) => {
  return number * 2;
});

console.log(doubledCorrect); // [2, 4, 6]


//* ------------------------------------------------------------
//* 32. ARROW IMPLICIT RETURN
//* ------------------------------------------------------------

const tripled = [1, 2, 3].map((number) => number * 3);
console.log(tripled); // [3, 6, 9]


//* ------------------------------------------------------------
//* 33. forEach()
//* ------------------------------------------------------------

const names = ["Ravi", "Aman", "Neha"];

names.forEach((name, index) => {
  console.log(index, name);
});

//* forEach() is useful for side effects.
//* It returns undefined; it is not a transformation method.


//* ------------------------------------------------------------
//* 34. forEach() RETURN VALUE MISTAKE
//* ------------------------------------------------------------

const result = [1, 2, 3].forEach((number) => number * 2);
console.log(result); // undefined

//* Use map() when you need a transformed array.


//* ------------------------------------------------------------
//* 35. some()
//* ------------------------------------------------------------

console.log(products.some((item) => item.price > 8000)); // true
console.log(products.some((item) => item.price > 20000)); // false

//* some() returns true if at least one element passes the test.


//* ------------------------------------------------------------
//* 36. every()
//* ------------------------------------------------------------

console.log(products.every((item) => item.price > 0)); // true
console.log(products.every((item) => item.price > 1000)); // false

//* every() returns true only if all elements pass the test.


//* ------------------------------------------------------------
//* 37. reduce() — SUM
//* ------------------------------------------------------------

const total = [10, 20, 30].reduce((sum, number) => sum + number, 0);
console.log(total); // 60

//* reduce() repeatedly updates an accumulator and can produce any result type.


//* ------------------------------------------------------------
//* 38. reduce() — PRODUCT
//* ------------------------------------------------------------

const productOfNumbers = [2, 3, 4].reduce((result, number) => result * number, 1);
console.log(productOfNumbers); // 24


//* ------------------------------------------------------------
//* 39. reduce() — OBJECT GROUPING
//* ------------------------------------------------------------

const people = [
  { name: "Ravi", role: "developer" },
  { name: "Aman", role: "designer" },
  { name: "Neha", role: "developer" },
];

const grouped = people.reduce((groups, person) => {
  if (!groups[person.role]) {
    groups[person.role] = [];
  }

  groups[person.role].push(person);
  return groups;
}, {});

console.log(grouped);


//* ------------------------------------------------------------
//* 40. SORT — DEFAULT BEHAVIOR
//* ------------------------------------------------------------

const defaultSorted = [10, 2, 30, 4].sort();
console.log(defaultSorted); // [10, 2, 30, 4] as strings in lexical order

//* sort() converts elements to strings by default and sorts lexicographically.


//* ------------------------------------------------------------
//* 41. NUMERIC SORT
//* ------------------------------------------------------------

const numericSorted = [10, 2, 30, 4].sort((a, b) => a - b);
console.log(numericSorted); // [2, 4, 10, 30]

const descending = [10, 2, 30, 4].sort((a, b) => b - a);
console.log(descending); // [30, 10, 4, 2]


//* ------------------------------------------------------------
//* 42. toSorted()
//* ------------------------------------------------------------

const originalNumbers = [10, 2, 30, 4];
const sortedCopy = originalNumbers.toSorted((a, b) => a - b);

console.log(sortedCopy); // [2, 4, 10, 30]
console.log(originalNumbers); // unchanged

//* toSorted() returns a sorted copy and does not mutate the original.


//* ------------------------------------------------------------
//* 43. reverse()
//* ------------------------------------------------------------

const order = [1, 2, 3];
order.reverse();
console.log(order); // [3, 2, 1]

//* reverse() mutates the array.


//* ------------------------------------------------------------
//* 44. toReversed()
//* ------------------------------------------------------------

const originalOrder = [1, 2, 3];
const reversedCopy = originalOrder.toReversed();

console.log(reversedCopy); // [3, 2, 1]
console.log(originalOrder); // [1, 2, 3]


//* ------------------------------------------------------------
//* 45. JOIN
//* ------------------------------------------------------------

console.log(["JavaScript", "is", "fun"].join(" "));
console.log(["2026", "09", "06"].join("-"));

//* join() returns a string.


//* ------------------------------------------------------------
//* 46. FLAT
//* ------------------------------------------------------------

const nested = [1, [2, 3], [4, [5]]];

console.log(nested.flat()); // [1, 2, 3, 4, [5]]
console.log(nested.flat(2)); // [1, 2, 3, 4, 5]

//* flat(depth) creates a new array and flattens nested arrays up to depth.


//* ------------------------------------------------------------
//* 47. flatMap()
//* ------------------------------------------------------------

const sentences = ["hello world", "javascript arrays"];
const words = sentences.flatMap((sentence) => sentence.split(" "));

console.log(words);

//* flatMap() maps and then flattens one level.


//* ------------------------------------------------------------
//* 48. EVERY ITERATION METHOD RECEIVES INDEX
//* ------------------------------------------------------------

["A", "B", "C"].map((value, index, array) => {
  console.log(value, index, array);
  return value.toLowerCase();
});

//* Callback parameters commonly are:
//* currentValue, index, array


//* ------------------------------------------------------------
//* 49. for...of
//* ------------------------------------------------------------

for (const value of [10, 20, 30]) {
  console.log(value);
}

//* for...of gives array values.


//* ------------------------------------------------------------
//* 50. for...in
//* ------------------------------------------------------------

const letters = ["a", "b", "c"];

for (const index in letters) {
  console.log(index, letters[index]);
}

//* for...in enumerates property keys. For arrays, prefer for...of or
//* array iteration methods when you want values.


//* ------------------------------------------------------------
//* 51. NESTED ARRAYS
//* ------------------------------------------------------------

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(matrix[0][1]); // 2
console.log(matrix[2][2]); // 9


//* ------------------------------------------------------------
//* 52. NESTED LOOP
//* ------------------------------------------------------------

for (let row = 0; row < matrix.length; row += 1) {
  for (let column = 0; column < matrix[row].length; column += 1) {
    console.log(matrix[row][column]);
  }
}


//* ------------------------------------------------------------
//* 53. SPARSE ARRAYS
//* ------------------------------------------------------------

const sparse = [];
sparse[2] = "third index";

console.log(sparse.length); // 3
console.log(sparse[0]); // undefined
console.log(0 in sparse); // false
console.log(2 in sparse); // true

//* A sparse array can have missing indexes. An absent slot is not
//* necessarily the same thing as an explicit element whose value is undefined.


//* ------------------------------------------------------------
//* 54. EMPTY SLOT VS undefined
//* ------------------------------------------------------------

const withUndefined = [undefined, undefined];
const withHole = new Array(2);

console.log(0 in withUndefined); // true
console.log(0 in withHole); // false


//* ------------------------------------------------------------
//* 55. Array.from() CAN FILL A RANGE
//* ------------------------------------------------------------

const range = Array.from({ length: 10 }, (_, index) => index);
console.log(range); // 0 through 9


//* ------------------------------------------------------------
//* 56. COPY THEN MUTATE
//* ------------------------------------------------------------

const base = [1, 2, 3];
const updated = [...base, 4];

console.log(base); // [1, 2, 3]
console.log(updated); // [1, 2, 3, 4]

//* This is a common immutable-update pattern.


//* ------------------------------------------------------------
//* 57. REMOVE ONE ITEM WITHOUT splice()
//* ------------------------------------------------------------

const numbersList = [10, 20, 30, 40];
const indexToRemove = 2;

const afterRemoval = numbersList.filter((_, index) => index !== indexToRemove);
console.log(afterRemoval); // [10, 20, 40]


//* ------------------------------------------------------------
//* 58. UPDATE AN OBJECT INSIDE AN ARRAY
//* ------------------------------------------------------------

const userList = [
  { id: 1, name: "Ravi" },
  { id: 2, name: "Aman" },
];

const updatedUsers = userList.map((user) =>
  user.id === 2 ? { ...user, name: "Aman Kumar" } : user
);

console.log(updatedUsers);
console.log(userList); // original unchanged at the array/object level


//* ------------------------------------------------------------
//* 59. FIND BY ID
//* ------------------------------------------------------------

function findUserById(users, id) {
  return users.find((user) => user.id === id);
}

console.log(findUserById(userList, 1));


//* ------------------------------------------------------------
//* 60. CART TOTAL
//* ------------------------------------------------------------

const cart = [
  { name: "Keyboard", price: 1200, quantity: 1 },
  { name: "Mouse", price: 700, quantity: 2 },
  { name: "Cable", price: 200, quantity: 3 },
];

const cartTotal = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

console.log(cartTotal); // 3000


//* ------------------------------------------------------------
//* 61. CHAINING METHODS
//* ------------------------------------------------------------

const activeExpensiveNames = products
  .filter((product) => product.price > 1000)
  .map((product) => product.name)
  .sort();

console.log(activeExpensiveNames);

//* Method chaining can make data transformations readable when each
//* step has a clear responsibility.


//* ------------------------------------------------------------
//* 62. CALLBACK EXECUTION ORDER
//* ------------------------------------------------------------

const output = [1, 2, 3].map((number) => {
  console.log("processing", number);
  return number * 2;
});

console.log(output);


//* ------------------------------------------------------------
//* 63. MUTATING WHILE ITERATING — WARNING
//* ------------------------------------------------------------

//* Mutating an array while iterating over it can make indexes and
//* expectations difficult to reason about. Prefer building a new result
//* with map/filter when mutation is not specifically required.


//* ------------------------------------------------------------
//* 64. SORT MUTATES
//* ------------------------------------------------------------

const sortExample = [3, 1, 2];
const sameReference = sortExample.sort((a, b) => a - b);

console.log(sameReference === sortExample); // true

//* sort() returns the same array reference after sorting it.


//* ------------------------------------------------------------
//* 65. toSorted() RETURNS NEW ARRAY
//* ------------------------------------------------------------

const sortSource = [3, 1, 2];
const sortedResult = sortSource.toSorted((a, b) => a - b);

console.log(sortedResult === sortSource); // false


//* ------------------------------------------------------------
//* 66. ARRAY DESTRUCTURING
//* ------------------------------------------------------------

const [first, second, third] = ["HTML", "CSS", "JS"];

console.log(first, second, third);


//* ------------------------------------------------------------
//* 67. SKIPPING ARRAY ELEMENTS
//* ------------------------------------------------------------

const [, , thirdSkill] = ["HTML", "CSS", "JavaScript"];
console.log(thirdSkill); // JavaScript


//* ------------------------------------------------------------
//* 68. REST DESTRUCTURING
//* ------------------------------------------------------------

const [head, ...tail] = [1, 2, 3, 4];

console.log(head); // 1
console.log(tail); // [2, 3, 4]


//* ------------------------------------------------------------
//* 69. SPREAD ARRAY
//* ------------------------------------------------------------

const firstBatch = [1, 2];
const secondBatch = [3, 4];

const combined = [...firstBatch, ...secondBatch];
console.log(combined); // [1, 2, 3, 4]


//* ------------------------------------------------------------
//* 70. SPREAD VS REST
//* ------------------------------------------------------------

//* Spread expands an iterable into individual elements.
const spreadExample = [0, ...[1, 2, 3]];
console.log(spreadExample);

//* Rest collects remaining elements into an array.
function collect(firstValue, ...remaining) {
  return [firstValue, remaining];
}

console.log(collect(1, 2, 3, 4));


//* ------------------------------------------------------------
//* 71. Array.isArray() PRACTICE
//* ------------------------------------------------------------

console.log(Array.isArray([])); // true
console.log(Array.isArray({})); // false
console.log(Array.isArray("hello")); // false


//* ------------------------------------------------------------
//* 72. ARRAY REFERENCES
//* ------------------------------------------------------------

const a = [1, 2, 3];
const b = a;

b.push(4);

console.log(a); // [1, 2, 3, 4]
console.log(b); // [1, 2, 3, 4]

//* Both variables refer to the same array object.


//* ------------------------------------------------------------
//* 73. ARRAY EQUALITY
//* ------------------------------------------------------------

console.log([1, 2] === [1, 2]); // false

const shared = [1, 2];
const same = shared;
console.log(shared === same); // true

//* Different array objects are different references even if contents match.


//* ------------------------------------------------------------
//* 74. DEEP COPY WARNING
//* ------------------------------------------------------------

const nestedData = [{ name: "Ravi", skills: ["JS"] }];
const shallowCopy = structuredClone(nestedData);

shallowCopy[0].skills.push("React");

console.log(nestedData); // original nested data unchanged
console.log(shallowCopy);

//* structuredClone() can make a deep structured copy of many supported
//* values. It is not equivalent to JSON serialization and does not clone
//* every possible JavaScript value.


//* ------------------------------------------------------------
//* 75. Array.from() VS SPREAD
//* ------------------------------------------------------------

const arrayLike = { 0: "A", 1: "B", length: 2 };
console.log(Array.from(arrayLike)); // ["A", "B"]

//* Array.from() can consume iterables and supported array-like objects.
//* Spread in an array literal requires an iterable.


//* ------------------------------------------------------------
//* 76. EMPTY ARRAY CHECK
//* ------------------------------------------------------------

function isEmpty(array) {
  return array.length === 0;
}

console.log(isEmpty([])); // true
console.log(isEmpty([1])); // false


//* ------------------------------------------------------------
//* 77. REMOVE DUPLICATES WITH SET
//* ------------------------------------------------------------

const duplicateNumbers = [1, 2, 2, 3, 3, 3];
const uniqueNumbers = [...new Set(duplicateNumbers)];

console.log(uniqueNumbers); // [1, 2, 3]

//* This preserves insertion order of the unique values.


//* ------------------------------------------------------------
//* 78. FLATTEN A MATRIX
//* ------------------------------------------------------------

const matrixData = [
  [1, 2],
  [3, 4],
  [5, 6],
];

console.log(matrixData.flat()); // [1, 2, 3, 4, 5, 6]


//* ------------------------------------------------------------
//* 79. REAL-WORLD: PAGINATION
//* ------------------------------------------------------------

function getPage(items, page, pageSize) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(getPage(posts, 2, 3)); // [4, 5, 6]

//* slice() is useful because it does not mutate the source array.


//* ------------------------------------------------------------
//* 80. REAL-WORLD: SEARCH PRODUCTS
//* ------------------------------------------------------------

function searchProducts(items, query) {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((item) =>
    item.name.toLowerCase().includes(normalizedQuery)
  );
}

console.log(searchProducts(products, "mouse"));


//* ------------------------------------------------------------
//* 81. REAL-WORLD: TOTAL PRICE
//* ------------------------------------------------------------

function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price, 0);
}

console.log(calculateTotal(products));


//* ------------------------------------------------------------
//* 82. REAL-WORLD: TRANSFORM API DATA
//* ------------------------------------------------------------

const apiUsers = [
  { id: 1, firstName: "Ravi", lastName: "Kumar" },
  { id: 2, firstName: "Aman", lastName: "Singh" },
];

const userCards = apiUsers.map((user) => ({
  id: user.id,
  displayName: `${user.firstName} ${user.lastName}`,
}));

console.log(userCards);


//* ------------------------------------------------------------
//* 83. REAL-WORLD: VALIDATION
//* ------------------------------------------------------------

const formFields = ["name", "email", "password"];
const submittedFields = ["name", "email", "password"];

const allFieldsPresent = formFields.every((field) => submittedFields.includes(field));
console.log(allFieldsPresent); // true


//* ------------------------------------------------------------
//* 84. COMMON MISTAKE: <= length
//* ------------------------------------------------------------

const demo = [10, 20, 30];

for (let i = 0; i < demo.length; i += 1) {
  console.log(demo[i]);
}

//* Prefer `i < array.length`.
//* `i <= array.length` performs one extra iteration and reads undefined.


//* ------------------------------------------------------------
//* 85. COMMON MISTAKE: map() WITHOUT RETURN
//* ------------------------------------------------------------

const wrongMap = [1, 2, 3].map((number) => {
  number + 10;
});

console.log(wrongMap); // [undefined, undefined, undefined]


//* ------------------------------------------------------------
//* 86. COMMON MISTAKE: forEach() FOR TRANSFORMATION
//* ------------------------------------------------------------

const doubled = [];

[1, 2, 3].forEach((number) => {
  doubled.push(number * 2);
});

console.log(doubled);

//* This works, but map() expresses the transformation more directly:
const doubledBetter = [1, 2, 3].map((number) => number * 2);
console.log(doubledBetter);


//* ------------------------------------------------------------
//* 87. COMMON MISTAKE: sort() NUMBERS
//* ------------------------------------------------------------

console.log([100, 20, 3].sort());
console.log([100, 20, 3].sort((a, b) => a - b));


//* ------------------------------------------------------------
//* 88. COMMON MISTAKE: COPYING NESTED ARRAYS
//* ------------------------------------------------------------

const nestedOriginal = [[1, 2], [3, 4]];
const nestedCopy = [...nestedOriginal];

nestedCopy[0].push(99);
console.log(nestedOriginal); // [[1, 2, 99], [3, 4]]

//* Spread is shallow.


//* ------------------------------------------------------------
//* 89. COMMON MISTAKE: indexOf() WITH OBJECTS
//* ------------------------------------------------------------

const objectArray = [{ id: 1 }, { id: 2 }];

console.log(objectArray.indexOf({ id: 1 })); // -1

//* The new object literal is a different object reference.
//* Use find()/some() with a property comparison.

console.log(objectArray.some((item) => item.id === 1)); // true


//* ------------------------------------------------------------
//* 90. COMMON MISTAKE: MUTATING ORIGINAL DATA
//* ------------------------------------------------------------

const originalList = [3, 1, 2];
const sortedList = originalList.toSorted((a, b) => a - b);

console.log(originalList); // [3, 1, 2]
console.log(sortedList); // [1, 2, 3]

//* Prefer non-mutating methods when preserving original state matters.


//* ------------------------------------------------------------
//* 91. OUTPUT PREDICTION
//* ------------------------------------------------------------

const prediction = [10, 20, 30];

console.log(prediction.slice(0, 2)); // ?
console.log(prediction.pop()); // ?
console.log(prediction); // ?
console.log([1, 2, 3].map((x) => x * 2)); // ?

//* Answers:
//* [10, 20]
//* 30
//* [10, 20]
//* [2, 4, 6]


//* ------------------------------------------------------------
//* 92. OUTPUT PREDICTION — REFERENCE
//* ------------------------------------------------------------

const firstArray = [1, 2];
const secondArray = firstArray;
secondArray.push(3);

console.log(firstArray); // ?
console.log(secondArray); // ?

//* Answer: both are [1, 2, 3].


//* ------------------------------------------------------------
//* 93. OUTPUT PREDICTION — FILTER
//* ------------------------------------------------------------

const filtered = [5, 10, 15, 20].filter((number) => number >= 10);
console.log(filtered); // [10, 15, 20]


//* ------------------------------------------------------------
//* 94. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1:
//* Find the largest number in an array.

//* Challenge 2:
//* Find the smallest number in an array.

//* Challenge 3:
//* Calculate the sum of all numbers.

//* Challenge 4:
//* Count even and odd numbers.

//* Challenge 5:
//* Remove duplicate values.

//* Challenge 6:
//* Reverse an array without using reverse().

//* Challenge 7:
//* Find the second-largest number.

//* Challenge 8:
//* Find a user by ID.

//* Challenge 9:
//* Group users by role.

//* Challenge 10:
//* Calculate a shopping cart total.

//* Challenge 11:
//* Implement pagination using slice().

//* Challenge 12:
//* Flatten a nested array.

//* Challenge 13:
//* Rotate an array by k positions.

//* Challenge 14:
//* Move all zeroes to the end.

//* Challenge 15:
//* Find the frequency of each element.


//* ------------------------------------------------------------
//* 95. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1:
//* const result = [1, 2, 3].map((n) => {
//*   n * 2;
//* });
//* Question: Why is result full of undefined values?

//* Debug 2:
//* const numbers = [10, 2, 30];
//* numbers.sort();
//* Question: Why is the order surprising?

//* Debug 3:
//* const users = [{ id: 1 }];
//* const copy = [...users];
//* copy[0].id = 99;
//* Question: Why did users[0].id also change?

//* Debug 4:
//* const values = [1, 2, 3];
//* for (let i = 0; i <= values.length; i++) {
//*   console.log(values[i]);
//* }
//* Question: What is the off-by-one mistake?

//* Debug 5:
//* const users = [{ id: 1 }, { id: 2 }];
//* users.indexOf({ id: 1 });
//* Question: Why is the result -1?


//* ------------------------------------------------------------
//* 96. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is an array?
//* 2. Why are arrays zero-indexed?
//* 3. Why does typeof [] return "object"?
//* 4. Why should Array.isArray() be used?
//* 5. What does push() return?
//* 6. What does pop() return?
//* 7. What is the difference between slice() and splice()?
//* 8. Which common array operations mutate the original array?
//* 9. What is the difference between map() and forEach()?
//* 10. What does filter() return?
//* 11. What does find() return when nothing matches?
//* 12. What does some() check?
//* 13. What does every() check?
//* 14. What is reduce()?
//* 15. Why does sort() need a numeric comparator?
//* 16. What is the difference between sort() and toSorted()?
//* 17. What is a shallow copy?
//* 18. Why can changing a nested object in a copied array affect the original?
//* 19. What is the difference between spread and rest?
//* 20. Why are two identical array literals not strictly equal?
//* 21. What is a sparse array?
//* 22. What is the difference between an empty slot and an explicit undefined value?
//* 23. When would you choose for...of over for...in?
//* 24. Why is array mutation important to understand in React/state management?
//* 25. How would you explain an array pipeline using filter -> map -> reduce?


//* ============================================================
//* END OF ARRAYS
//* ============================================================
