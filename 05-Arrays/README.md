# 05 — Arrays in JavaScript

> Arrays are one of the most important data structures in JavaScript. Learn them well and a large part of everyday JavaScript becomes easier.

---

## 1. What Is an Array?

An **array** is an ordered collection of values.

```js
const fruits = ["apple", "banana", "mango"];
```

The values are stored in positions called **indexes**.

```text
index:   0        1         2
value: apple   banana    mango
```

JavaScript arrays are objects, but they have special behavior for indexed elements, `length`, and iteration.

---

## 2. Why Do We Need Arrays?

Without arrays, related values would often require separate variables.

```js
const student1 = "Aman";
const student2 = "Ravi";
const student3 = "Neha";
```

With an array:

```js
const students = ["Aman", "Ravi", "Neha"];
```

Now we can process the whole collection with loops and array methods.

---

## 3. Array Mental Model

Think of an array as an ordered collection with numeric indexes.

```text
          Array
┌─────┬─────┬─────┬─────┐
│  10 │  20 │  30 │  40 │
└─────┴─────┴─────┴─────┘
   0     1     2     3
```

JavaScript does not require every index to contain a value, which is why sparse arrays are possible.

---

## 4. Creating an Array With a Literal

The most common syntax is an array literal.

```js
const numbers = [10, 20, 30];
```

This is usually clearer than using the `Array` constructor.

---

## 5. Empty Array

An empty array contains no elements.

```js
const tasks = [];
console.log(tasks.length); // 0
```

It is common to create an empty array and add items later.

---

## 6. Mixed Values

JavaScript arrays can contain values of different types.

```js
const data = [42, "hello", true, null, { id: 1 }, [1, 2]];
```

This is legal, although a single array with unrelated types may make application code harder to reason about.

---

## 7. Arrays Can Contain Objects

This is extremely common in real applications.

```js
const users = [
  { id: 1, name: "Ravi" },
  { id: 2, name: "Aman" }
];
```

Now the array represents a collection of user records.

---

## 8. Arrays Can Contain Arrays

An array can contain other arrays.

```js
const matrix = [
  [1, 2],
  [3, 4]
];
```

This is useful for grids, tables, matrices, and nested data.

---

## 9. Indexing Starts at Zero

The first element is at index `0`.

```js
const colors = ["red", "green", "blue"];

console.log(colors[0]); // red
console.log(colors[1]); // green
console.log(colors[2]); // blue
```

Remember:

```text
first element  → index 0
second element → index 1
third element  → index 2
```

---

## 10. Reading an Element

Use bracket notation.

```js
const names = ["Aman", "Ravi", "Neha"];

console.log(names[1]); // Ravi
```

The expression `names[1]` reads the value at index `1`.

---

## 11. Changing an Element

Array elements can be reassigned.

```js
const names = ["Aman", "Ravi", "Neha"];
names[1] = "Priya";

console.log(names);
```

`const` prevents reassignment of the `names` binding; it does not make the array immutable.

---

## 12. `const` Array Mutation

This is valid:

```js
const numbers = [1, 2, 3];
numbers.push(4);
```

This is not valid:

```js
const numbers = [1, 2, 3];
numbers = [4, 5, 6]; // TypeError
```

The binding is constant; the array contents can still change.

---

## 13. Array `length`

The `length` property tells us the array's length boundary.

```js
const numbers = [10, 20, 30];
console.log(numbers.length); // 3
```

For a normal dense array, the length is one greater than the highest index.

---

## 14. Last Element

A common pattern is:

```js
const items = ["a", "b", "c"];
console.log(items[items.length - 1]); // c
```

Modern JavaScript also provides:

```js
console.log(items.at(-1)); // c
```

---

## 15. `.at()`

`at()` supports positive and negative indexes.

```js
const values = [10, 20, 30];

console.log(values.at(0));  // 10
console.log(values.at(-1)); // 30
```

Negative indexes count from the end.

---

## 16. Invalid Positive Index

Reading an index outside the array returns `undefined`.

```js
const values = [10, 20];
console.log(values[5]); // undefined
```

This does not automatically mean the array has five elements.

---

## 17. Arrays Are Objects

```js
const numbers = [1, 2, 3];
console.log(typeof numbers); // "object"
```

Use `Array.isArray()` when you need to test whether a value is an array.

---

## 18. `Array.isArray()`

```js
console.log(Array.isArray([1, 2])); // true
console.log(Array.isArray({}));     // false
```

Prefer this over `typeof value === "array"`, because `typeof` has no separate array result.

---

## 19. Array Constructor

You can create arrays with `new Array()`.

```js
const numbers = new Array(10, 20, 30);
console.log(numbers);
```

For normal code, array literals are usually easier to read.

---

## 20. The `new Array(3)` Trap

```js
const values = new Array(3);
console.log(values.length); // 3
```

This creates a sparse array with length `3`; it does not create `[3]`.

---

## 21. `Array.of()`

`Array.of()` creates an array from its arguments.

```js
console.log(Array.of(3)); // [3]
```

This avoids the special behavior of `new Array(3)`.

---

## 22. `Array.from()`

`Array.from()` creates an array from an iterable or array-like value.

```js
console.log(Array.from("hello"));
// ["h", "e", "l", "l", "o"]
```

It is especially useful when working with DOM collections and other array-like structures.

---

## 23. Array-Like Is Not Necessarily an Array

An array-like value may have numeric keys and a `length` property but still not be an actual array.

```js
const value = {
  0: "a",
  1: "b",
  length: 2
};

console.log(Array.isArray(value)); // false
```

---

## 24. `Array.from()` With Array-Like Data

```js
const value = {
  0: "a",
  1: "b",
  length: 2
};

console.log(Array.from(value)); // ["a", "b"]
```

---

## 25. Iterables

An iterable provides a mechanism for producing values during iteration.

Arrays are iterable.

```js
for (const value of [10, 20, 30]) {
  console.log(value);
}
```

---

## 26. `for...of` With Arrays

Use `for...of` when you want array values.

```js
const fruits = ["apple", "banana"];

for (const fruit of fruits) {
  console.log(fruit);
}
```

---

## 27. `for...in` Is Usually Wrong for Array Values

`for...in` iterates enumerable property keys.

```js
const fruits = ["apple", "banana"];

for (const index in fruits) {
  console.log(index);
}
```

The output is keys such as `0` and `1`, not the values themselves.

---

## 28. Prefer `for...of` for Array Values

```js
for (const fruit of fruits) {
  console.log(fruit);
}
```

This communicates your intention directly: iterate over the values.

---

## 29. Classic `for` Loop

A classic loop is useful when you need indexes or precise control.

```js
const numbers = [10, 20, 30];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
```

---

## 30. The `<= length` Mistake

Avoid:

```js
for (let i = 0; i <= numbers.length; i++) {
  console.log(numbers[i]);
}
```

The final iteration accesses `numbers[numbers.length]`, which is outside the normal index range.

Use:

```js
for (let i = 0; i < numbers.length; i++) {}
```

---

## 31. `push()`

`push()` adds one or more elements to the end and returns the new length.

```js
const numbers = [1, 2];
const result = numbers.push(3, 4);

console.log(numbers); // [1, 2, 3, 4]
console.log(result);  // 4
```

`push()` mutates the array.

---

## 32. `pop()`

`pop()` removes the last element and returns it.

```js
const numbers = [1, 2, 3];
const last = numbers.pop();

console.log(last);    // 3
console.log(numbers); // [1, 2]
```

---

## 33. `shift()`

`shift()` removes the first element and returns it.

```js
const queue = ["A", "B", "C"];
const first = queue.shift();

console.log(first); // A
console.log(queue); // ["B", "C"]
```

It mutates the array.

---

## 34. `unshift()`

`unshift()` adds elements to the beginning and returns the new length.

```js
const numbers = [2, 3];
numbers.unshift(0, 1);

console.log(numbers); // [0, 1, 2, 3]
```

---

## 35. `splice()`

`splice()` can remove, insert, and replace elements in the same array.

```js
const fruits = ["apple", "banana", "mango"];
fruits.splice(1, 1, "orange");

console.log(fruits); // ["apple", "orange", "mango"]
```

It mutates the original array.

---

## 36. `splice()` Syntax

The basic form is:

```js
array.splice(start, deleteCount, item1, item2, ...items);
```

`start` selects where the change begins.

`deleteCount` says how many elements to remove.

Remaining arguments are inserted.

---

## 37. `splice()` Remove

```js
const numbers = [10, 20, 30, 40];
const removed = numbers.splice(1, 2);

console.log(removed); // [20, 30]
console.log(numbers); // [10, 40]
```

---

## 38. `splice()` Insert

```js
const numbers = [10, 30];
numbers.splice(1, 0, 20);

console.log(numbers); // [10, 20, 30]
```

A delete count of `0` means nothing is removed.

---

## 39. `splice()` Replace

```js
const numbers = [10, 20, 30];
numbers.splice(1, 1, 200);

console.log(numbers); // [10, 200, 30]
```

---

## 40. `slice()`

`slice()` creates a shallow copy of a selected portion.

```js
const numbers = [10, 20, 30, 40];
const part = numbers.slice(1, 3);

console.log(part); // [20, 30]
```

The start is included and the end is excluded.

---

## 41. `slice()` Does Not Mutate

```js
const numbers = [1, 2, 3];
const copy = numbers.slice();

console.log(numbers); // [1, 2, 3]
console.log(copy);    // [1, 2, 3]
```

---

## 42. `slice()` vs `splice()`

| Method | Mutates? | Main purpose |
|---|---|---|
| `slice()` | No | Copy/extract |
| `splice()` | Yes | Remove/insert/replace |

Memory trick:

> `slice` = take a piece.
>
> `splice` = change the original.

---

## 43. `concat()`

`concat()` creates a new array containing combined values.

```js
const a = [1, 2];
const b = [3, 4];

const result = a.concat(b);
console.log(result); // [1, 2, 3, 4]
```

It does not mutate `a` or `b`.

---

## 44. Spread Syntax

Spread can also combine arrays.

```js
const a = [1, 2];
const b = [3, 4];

const result = [...a, ...b];
```

This is often convenient when constructing a new array.

---

## 45. Copying an Array With Spread

```js
const original = [1, 2, 3];
const copy = [...original];
```

This creates a new array, but the copy is shallow.

---

## 46. Shallow Copy

A shallow copy copies the outer array structure, not nested objects themselves.

```js
const original = [{ name: "Ravi" }];
const copy = [...original];

copy[0].name = "Aman";
console.log(original[0].name); // Aman
```

Both arrays refer to the same nested object.

---

## 47. Reference Identity

```js
const a = [1, 2];
const b = a;

console.log(a === b); // true
```

Both variables refer to the same array object.

---

## 48. Independent Array Copy

```js
const a = [1, 2];
const b = [...a];

console.log(a === b); // false
```

The outer arrays are different objects.

---

## 49. Nested Copy Limitation

```js
const a = [[1, 2]];
const b = [...a];

console.log(a === b);       // false
console.log(a[0] === b[0]); // true
```

Spread is shallow.

---

## 50. Deep Copy Is a Separate Problem

Deep copying nested data requires more care than using spread.

For structured cloneable data, modern environments provide:

```js
const copy = structuredClone(original);
```

Deep cloning has limitations and costs, so do not clone everything automatically.

---

## 51. `map()`

`map()` creates a new array by transforming each element.

```js
const numbers = [1, 2, 3];
const doubled = numbers.map((number) => number * 2);

console.log(doubled); // [2, 4, 6]
```

The original array remains unchanged.

---

## 52. `map()` Mental Model

Think:

```text
[1, 2, 3]
 ↓  ↓  ↓
×2 ×2 ×2
 ↓  ↓  ↓
[2, 4, 6]
```

One input element produces one output element.

---

## 53. `map()` Must Return a Value

Correct:

```js
const result = [1, 2, 3].map((n) => n * 2);
```

A block body needs an explicit return:

```js
const result = [1, 2, 3].map((n) => {
  return n * 2;
});
```

---

## 54. The `map()` No-Return Mistake

```js
const result = [1, 2, 3].map((n) => {
  n * 2;
});

console.log(result); // [undefined, undefined, undefined]
```

The callback returned `undefined` each time.

---

## 55. `map()` Callback Arguments

The callback can receive:

```js
array.map((value, index, array) => {});
```

Example:

```js
["a", "b"].map((value, index) => `${index}:${value}`);
```

---

## 56. `filter()`

`filter()` creates a new array containing elements for which the callback returns a truthy value.

```js
const numbers = [1, 2, 3, 4];
const even = numbers.filter((n) => n % 2 === 0);

console.log(even); // [2, 4]
```

---

## 57. `filter()` Mental Model

```text
1 → false → remove
2 → true  → keep
3 → false → remove
4 → true  → keep

Result: [2, 4]
```

Unlike `map()`, the result can have fewer elements.

---

## 58. `find()`

`find()` returns the first element satisfying a condition.

```js
const users = [
  { id: 1, name: "Aman" },
  { id: 2, name: "Ravi" }
];

const user = users.find((user) => user.id === 2);
console.log(user);
```

If no element matches, it returns `undefined`.

---

## 59. `findIndex()`

`findIndex()` returns the index of the first matching element.

```js
const numbers = [5, 10, 15];
const index = numbers.findIndex((n) => n > 8);

console.log(index); // 1
```

If nothing matches, it returns `-1`.

---

## 60. `findLast()`

`findLast()` searches from the end and returns the last matching element.

```js
const numbers = [10, 15, 20, 25];
const result = numbers.findLast((n) => n % 5 === 0);

console.log(result); // 25
```

---

## 61. `findLastIndex()`

`findLastIndex()` searches from the end and returns the matching index.

```js
const numbers = [10, 15, 20];
console.log(numbers.findLastIndex((n) => n > 10)); // 2
```

---

## 62. `forEach()`

`forEach()` runs a callback for each visited element.

```js
const numbers = [1, 2, 3];

numbers.forEach((number) => {
  console.log(number);
});
```

It returns `undefined`.

---

## 63. `forEach()` vs `map()`

Use `map()` when you want a transformed array.

Use `forEach()` when you want to perform side effects and do not need a returned transformed array.

```js
const doubled = numbers.map((n) => n * 2);

numbers.forEach((n) => console.log(n));
```

---

## 64. `forEach()` Cannot Be Broken Normally

You cannot use `break` or `continue` directly inside a `forEach()` callback to control the outer `forEach()` loop.

If early termination is needed, a regular loop or a suitable search method is often clearer.

---

## 65. `some()`

`some()` asks whether **at least one** element satisfies a condition.

```js
const numbers = [1, 3, 4];
console.log(numbers.some((n) => n % 2 === 0)); // true
```

It short-circuits when a match is found.

---

## 66. `every()`

`every()` asks whether **all** elements satisfy a condition.

```js
const numbers = [2, 4, 6];
console.log(numbers.every((n) => n % 2 === 0)); // true
```

It short-circuits when a failing element is found.

---

## 67. `some()` vs `every()`

```text
some  → Is at least one true?
every → Are all true?
```

These methods are excellent for validation and business rules.

---

## 68. `includes()`

`includes()` checks whether an array contains a value.

```js
const roles = ["admin", "editor", "user"];
console.log(roles.includes("admin")); // true
```

It returns a boolean.

---

## 69. `indexOf()`

`indexOf()` returns the first matching index or `-1`.

```js
const numbers = [10, 20, 10];

console.log(numbers.indexOf(10)); // 0
console.log(numbers.indexOf(99)); // -1
```

---

## 70. `lastIndexOf()`

`lastIndexOf()` searches from the end.

```js
const numbers = [10, 20, 10];
console.log(numbers.lastIndexOf(10)); // 2
```

---

## 71. `includes()` vs `indexOf()`

Use `includes()` when you only need yes/no.

Use `indexOf()` when you need the position.

```js
numbers.includes(20);
numbers.indexOf(20);
```

---

## 72. `NaN` and `includes()`

`includes()` can detect `NaN`.

```js
console.log([NaN].includes(NaN)); // true
```

This differs from the behavior of `indexOf()` for `NaN`.

---

## 73. `join()`

`join()` combines array elements into a string.

```js
const words = ["JavaScript", "is", "fun"];
console.log(words.join(" ")); // JavaScript is fun
```

It does not mutate the array.

---

## 74. `split()` and `join()`

These operations are often used together.

```js
const sentence = "hello world";
const words = sentence.split(" ");
const result = words.join("-");

console.log(result); // hello-world
```

Remember:

```text
split → string to array
join  → array to string
```

---

## 75. `reduce()`

`reduce()` processes array elements into an accumulated result.

```js
const numbers = [1, 2, 3, 4];
const total = numbers.reduce((sum, number) => sum + number, 0);

console.log(total); // 10
```

The result does not have to be an array.

---

## 76. `reduce()` Mental Model

```text
initial: 0

0 + 1 → 1
1 + 2 → 3
3 + 3 → 6
6 + 4 → 10

final result → 10
```

The accumulator carries information from one step to the next.

---

## 77. `reduce()` Without an Initial Value

```js
const numbers = [1, 2, 3];
const total = numbers.reduce((a, b) => a + b);
```

The first array element becomes the initial accumulator and iteration starts with the second element.

---

## 78. Empty Array and `reduce()`

This throws:

```js
[].reduce((a, b) => a + b);
```

Provide an initial value when an empty array is possible and your operation has a natural identity value.

---

## 79. `reduce()` Can Build Objects

```js
const users = [
  { id: 1, name: "Aman" },
  { id: 2, name: "Ravi" }
];

const byId = users.reduce((result, user) => {
  result[user.id] = user;
  return result;
}, {});
```

The accumulator can be any suitable type.

---

## 80. `reduceRight()`

`reduceRight()` performs reduction from right to left.

```js
const values = ["a", "b", "c"];
const result = values.reduceRight((acc, value) => acc + value, "");

console.log(result); // cba
```

---

## 81. `sort()`

`sort()` sorts an array **in place** and returns the same array.

```js
const names = ["Zoe", "Aman", "Ravi"];
names.sort();
```

It mutates the original array.

---

## 82. Default `sort()` Is Lexicographic

This surprises beginners:

```js
const numbers = [10, 2, 30, 4];
numbers.sort();

console.log(numbers);
```

Default sorting compares values as strings, producing lexicographic order rather than numeric order.

---

## 83. Numeric Sort

For ascending numeric order:

```js
const numbers = [10, 2, 30, 4];
numbers.sort((a, b) => a - b);
```

For descending order:

```js
numbers.sort((a, b) => b - a);
```

---

## 84. How a Sort Comparator Works

The comparator conceptually tells the sort operation:

```text
negative → a before b
positive → b before a
zero     → equivalent for ordering
```

Do not rely on exact comparator call order as if it were a simple left-to-right loop.

---

## 85. `toSorted()`

Modern JavaScript provides `toSorted()` for a non-mutating sorted copy.

```js
const numbers = [3, 1, 2];
const sorted = numbers.toSorted((a, b) => a - b);

console.log(numbers); // [3, 1, 2]
console.log(sorted);  // [1, 2, 3]
```

---

## 86. `reverse()`

`reverse()` reverses the array in place.

```js
const values = [1, 2, 3];
values.reverse();

console.log(values); // [3, 2, 1]
```

---

## 87. `toReversed()`

`toReversed()` creates a reversed copy.

```js
const values = [1, 2, 3];
const reversed = values.toReversed();

console.log(values);   // [1, 2, 3]
console.log(reversed); // [3, 2, 1]
```

---

## 88. `fill()`

`fill()` replaces elements with a value and mutates the array.

```js
const values = [1, 2, 3, 4];
values.fill(0, 1, 3);

console.log(values); // [1, 0, 0, 4]
```

The end index is excluded.

---

## 89. `copyWithin()`

`copyWithin()` copies part of an array to another position within the same array.

```js
const values = [1, 2, 3, 4];
values.copyWithin(1, 2);

console.log(values);
```

It mutates the array and does not change its length.

---

## 90. `flat()`

`flat()` creates a new array with nested arrays flattened to the requested depth.

```js
const values = [1, [2, 3], [4, [5]]];

console.log(values.flat());
console.log(values.flat(2));
```

The default depth is `1`.

---

## 91. `flat(Infinity)`

For arbitrary nesting:

```js
const values = [1, [2, [3, [4]]]];
console.log(values.flat(Infinity));
```

Use this intentionally; deeply nested data may have performance implications.

---

## 92. `flatMap()`

`flatMap()` maps each element and flattens one level of the result.

```js
const words = ["hello", "world"];
const letters = words.flatMap((word) => word.split(""));
```

It is useful when each input item can produce multiple output items.

---

## 93. `flatMap()` vs `map().flat()`

These are conceptually related:

```js
items.flatMap(transform);
```

and:

```js
items.map(transform).flat();
```

`flatMap()` performs one-level flattening as part of the operation.

---

## 94. Array Destructuring

Destructuring extracts values by position.

```js
const colors = ["red", "green", "blue"];
const [first, second] = colors;

console.log(first);  // red
console.log(second); // green
```

---

## 95. Skipping During Destructuring

```js
const values = [10, 20, 30];
const [first, , third] = values;

console.log(first); // 10
console.log(third); // 30
```

The empty slot skips one value during destructuring.

---

## 96. Rest in Destructuring

```js
const values = [10, 20, 30, 40];
const [first, ...remaining] = values;

console.log(first);     // 10
console.log(remaining); // [20, 30, 40]
```

The rest element collects remaining values into a new array.

---

## 97. Default Values in Destructuring

```js
const values = [10];
const [first, second = 20] = values;

console.log(second); // 20
```

The default applies when the extracted value is `undefined`.

---

## 98. Array Spread

Spread expands iterable elements into another array or function call.

```js
const a = [1, 2];
const b = [0, ...a, 3];

console.log(b); // [0, 1, 2, 3]
```

Spread is not the same thing as deep cloning.

---

## 99. Spread vs Rest

The syntax looks the same but the role is different.

```text
spread → expands values
rest   → collects values
```

Example:

```js
const copy = [...numbers]; // spread
const [first, ...rest] = numbers; // rest
```

---

## 100. Iterators: `keys()`

`keys()` returns an iterator over array indexes.

```js
const values = ["a", "b"];

for (const key of values.keys()) {
  console.log(key);
}
```

---

## 101. Iterators: `values()`

`values()` returns an iterator over values.

```js
for (const value of values.values()) {
  console.log(value);
}
```

Arrays are iterable by their values by default.

---

## 102. Iterators: `entries()`

`entries()` returns index-value pairs.

```js
for (const [index, value] of values.entries()) {
  console.log(index, value);
}
```

This is useful when you need both index and value with `for...of`.

---

## 103. Sparse Arrays

An array can have missing elements.

```js
const values = [];
values[2] = "hello";

console.log(values.length); // 3
```

Indexes `0` and `1` are holes, not ordinary stored `undefined` elements.

---

## 104. Hole vs Explicit `undefined`

These are observably different in some operations.

```js
const holes = new Array(3);
const undefinedValues = [undefined, undefined, undefined];
```

Both have length `3`, but the first has holes while the second has actual elements containing `undefined`.

---

## 105. Array Methods and Holes

Many array iteration methods skip empty slots rather than invoking callbacks for them.

Do not assume every method treats sparse arrays exactly like dense arrays.

When predictable data is important, avoid accidentally creating sparse arrays.

---

## 106. Setting `length` Smaller

You can truncate an array by assigning a smaller length.

```js
const values = [1, 2, 3, 4];
values.length = 2;

console.log(values); // [1, 2]
```

Elements beyond the new length are removed.

---

## 107. Setting `length` Larger

Increasing `length` creates holes.

```js
const values = [1, 2];
values.length = 5;

console.log(values.length); // 5
```

This does not fill the new positions with explicit `undefined` values.

---

## 108. Array Equality

Two separately created arrays are not equal just because their contents match.

```js
console.log([1, 2] === [1, 2]); // false
```

They are two different objects.

---

## 109. Correct Content Comparison

If you need to compare arrays by content, define the required equality semantics.

For simple primitive arrays, one option is:

```js
const same =
  a.length === b.length &&
  a.every((value, index) => value === b[index]);
```

For nested data, comparison becomes a deeper problem.

---

## 110. Mutation vs Non-Mutation

A critical array skill is knowing whether a method changes the original array.

Common mutators include:

```text
push
pop
shift
unshift
splice
sort
reverse
fill
copyWithin
```

Common non-mutating methods include:

```text
slice
concat
map
filter
reduce
find
some
every
toSorted
toReversed
```

---

## 111. Why Mutation Matters

Mutation can surprise other code holding the same array reference.

```js
const original = [1, 2, 3];
const reference = original;

original.push(4);

console.log(reference); // [1, 2, 3, 4]
```

Both variables refer to the same array.

---

## 112. Immutable Update Pattern

Instead of mutating:

```js
items.push(newItem);
```

you may create a new array:

```js
const nextItems = [...items, newItem];
```

This is especially useful in state-management systems where reference changes are meaningful.

---

## 113. Removing Immutably

Instead of mutating with `splice()`, you can use `filter()`.

```js
const nextItems = items.filter((item) => item.id !== idToRemove);
```

This creates a new array.

---

## 114. Updating One Object Immutably

```js
const nextUsers = users.map((user) =>
  user.id === id
    ? { ...user, name: "Updated" }
    : user
);
```

This creates a new array and a new object for the changed user.

---

## 115. Inserting Immutably

```js
const nextItems = [
  ...items.slice(0, index),
  newItem,
  ...items.slice(index)
];
```

This avoids modifying the original array.

---

## 116. Array Transformation Pipeline

Array methods can be chained.

```js
const result = numbers
  .filter((n) => n > 0)
  .map((n) => n * 2)
  .filter((n) => n < 20);
```

Read a pipeline from left to right and check the shape of data after each step.

---

## 117. Debugging a Pipeline

When a chain becomes confusing, split it.

```js
const positive = numbers.filter((n) => n > 0);
const doubled = positive.map((n) => n * 2);
const result = doubled.filter((n) => n < 20);
```

This makes intermediate values visible.

---

## 118. Avoid Overusing `reduce()`

`reduce()` is powerful, but not every problem needs it.

If `map()`, `filter()`, `find()`, or `some()` communicates the intent more clearly, prefer the clearer method.

Readable code is usually better than clever code.

---

## 119. Counting With `reduce()`

```js
const words = ["js", "css", "js", "html", "js"];

const counts = words.reduce((result, word) => {
  result[word] = (result[word] ?? 0) + 1;
  return result;
}, {});
```

This pattern is useful for frequency maps.

---

## 120. Maximum Value

For numeric arrays, one simple approach is:

```js
const max = Math.max(...numbers);
```

For very large arrays or when avoiding spread argument limits, a loop or reduction can be more appropriate.

---

## 121. Sum Pattern

```js
const total = numbers.reduce((sum, number) => sum + number, 0);
```

The initial value `0` makes the empty-array behavior predictable.

---

## 122. Average Pattern

```js
const average = numbers.length === 0
  ? 0
  : numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
```

Always define what an empty collection should mean in your application.

---

## 123. Grouping Data

Modern JavaScript environments provide grouping methods such as `Object.groupBy()`.

Conceptually:

```js
const grouped = Object.groupBy(users, (user) => user.role);
```

Use the grouping API available in your target runtime and understand the returned data structure.

---

## 124. Sorting Objects

```js
const users = [
  { name: "Ravi", age: 21 },
  { name: "Aman", age: 18 }
];

users.sort((a, b) => a.age - b.age);
```

The comparator should describe the ordering rule you need.

---

## 125. Sorting Without Mutation

```js
const sortedUsers = users.toSorted((a, b) => a.age - b.age);
```

This keeps the original array unchanged.

---

## 126. Stable Sorting

Modern JavaScript specifies stable `Array.prototype.sort()` behavior.

When two items compare as equal, their relative order is preserved.

This matters when sorting records by multiple criteria in stages.

---

## 127. Locale-Aware String Sorting

For human language text, plain `<` comparisons may not represent the desired locale rules.

For example:

```js
names.sort((a, b) => a.localeCompare(b));
```

For repeated large-scale comparisons, `Intl.Collator` can be useful.

---

## 128. Performance: `push()` vs Repeated Front Insertion

Appending with `push()` is generally a natural operation for arrays.

Repeated `unshift()` operations may require moving many elements and can be expensive for large arrays.

Choose data structures according to access patterns.

---

## 129. Performance: `shift()`

Removing from the beginning can require index movement for remaining elements.

If you need a high-throughput queue, consider a head index or a suitable queue/deque implementation instead of repeatedly shifting huge arrays.

---

## 130. Performance: Chained Methods

This:

```js
items.filter(fn).map(fn2).filter(fn3);
```

can create intermediate arrays.

For normal application data this is often perfectly acceptable and readable.

For performance-critical hot paths, measure before replacing clear code with manual loops.

---

## 131. Performance: Do Not Optimize Blindly

Do not assume a loop is always faster or that a functional chain is always slower.

Actual performance depends on data size, engine optimizations, callback overhead, allocation, and workload.

**Measure first.**

---

## 132. Security: Arrays Do Not Sanitize Data

An array can safely hold untrusted data, but using that data unsafely can create vulnerabilities.

For example, placing untrusted strings into `innerHTML` can create XSS regardless of whether the strings came from an array.

The security decision happens at the output boundary.

---

## 133. Security: Validate Array Input

Do not assume API input is an array just because your application expects one.

```js
if (!Array.isArray(input)) {
  throw new TypeError("Expected an array");
}
```

Then validate the elements as well.

---

## 134. Common Mistake: Forgetting Mutation

Wrong assumption:

```js
const sorted = numbers.sort();
```

The variable `sorted` and `numbers` refer to the same sorted array.

If you need the original preserved, use `toSorted()` or copy before sorting.

---

## 135. Common Mistake: Using `map()` for Side Effects

This is usually unclear:

```js
items.map((item) => console.log(item));
```

If no transformed array is needed, `forEach()` communicates the intent better.

---

## 136. Common Mistake: Forgetting `return`

```js
const result = numbers.map((n) => {
  n * 2;
});
```

The result contains `undefined` values because the block body does not return.

---

## 137. Common Mistake: Using `for...in`

Avoid treating:

```js
for (const value in array)
```

as an array-value loop.

Use `for...of` for values or a classic `for` loop when you need index control.

---

## 138. Common Mistake: `splice()` vs `slice()`

Remember:

```text
slice  → returns a piece, original stays unchanged
splice → changes the original
```

This single distinction prevents many bugs.

---

## 139. Common Mistake: Default Numeric Sort

Never assume:

```js
[10, 2, 5].sort();
```

means numeric sorting.

Use:

```js
[10, 2, 5].sort((a, b) => a - b);
```

---

## 140. Common Mistake: `const` Means Immutable

This is valid:

```js
const items = [];
items.push("new item");
```

`const` protects the binding from reassignment, not the object's internal state.

---

## 141. Common Mistake: Assuming Spread Is Deep Copy

```js
const copy = [...original];
```

Only the outer array is copied.

Nested objects and arrays remain shared references.

---

## 142. Common Mistake: Ignoring Empty Arrays

Always ask what your operation should do with `[]`.

Examples:

- `find()` → `undefined`
- `some()` → `false`
- `every()` → `true`
- `reduce()` without initial value → throws
- `reduce()` with an initial value → uses that initial value

These results are useful to understand, not memorize blindly.

---

## 143. Output Prediction #1

Predict before running:

```js
const numbers = [1, 2, 3];
const result = numbers.map((n) => n * 2);

console.log(numbers);
console.log(result);
```

Question: Which array changed?

---

## 144. Output Prediction #2

```js
const numbers = [10, 2, 5];
console.log(numbers.sort());
```

Question: Is the result numeric ascending order?

Explain why.

---

## 145. Output Prediction #3

```js
const values = [1, 2, 3];
const result = values.map((value) => {
  value * 2;
});

console.log(result);
```

Question: Why are the results not doubled?

---

## 146. Output Prediction #4

```js
const a = [1, 2];
const b = a;

b.push(3);
console.log(a);
```

Question: Why does `a` contain `3`?

---

## 147. Output Prediction #5

```js
const a = [1, 2];
const b = [...a];

b.push(3);
console.log(a);
console.log(b);
```

Question: Why are the arrays different this time?

---

## 148. Output Prediction #6

```js
const values = [1, 2, 3, 4];
console.log(values.slice(1, 3));
```

Question: Which indexes are included?

---

## 149. Output Prediction #7

```js
const values = [1, 2, 3, 4];
console.log(values.splice(1, 2));
console.log(values);
```

Predict both outputs.

---

## 150. Output Prediction #8

```js
const values = [1, 2, 3];
console.log(values.some((n) => n > 10));
console.log(values.every((n) => n > 0));
```

Explain why the results differ.

---

## 151. Beginner Exercise: Sum

Write a function:

```js
function sumArray(numbers) {
  // return total
}
```

Do not use `eval()` or convert the array into a string.

Test it with positive, negative, and empty arrays.

---

## 152. Beginner Exercise: Maximum

Write:

```js
function findMax(numbers) {
  // return maximum value
}
```

Decide what your function should do for an empty array and document that decision.

---

## 153. Beginner Exercise: Count Even Numbers

```js
function countEven(numbers) {
  // return how many values are even
}
```

Solve it once with a loop and once with `filter()`.

Compare readability.

---

## 154. Beginner Exercise: Reverse

Create a function that returns a reversed copy without changing the original array.

Test:

```js
const original = [1, 2, 3];
```

Verify that `original` remains unchanged.

---

## 155. Beginner Exercise: Remove Duplicates

Create:

```js
function uniqueValues(values) {}
```

Try solving it with `Set` first.

Then explain why a `Set` is appropriate for this problem.

---

## 156. Intermediate Exercise: Frequency Counter

Create:

```js
function frequency(values) {}
```

Input:

```js
["js", "css", "js", "html", "css"]
```

Expected shape:

```js
{
  js: 2,
  css: 2,
  html: 1
}
```

---

## 157. Intermediate Exercise: Group Students

Given:

```js
const students = [
  { name: "A", grade: "A" },
  { name: "B", grade: "B" },
  { name: "C", grade: "A" }
];
```

Group students by grade.

Explain your choice of data structure.

---

## 158. Intermediate Exercise: Transform API Data

Given user records:

```js
const users = [
  { id: 1, firstName: "Ravi", lastName: "Kumar" },
  { id: 2, firstName: "Aman", lastName: "Singh" }
];
```

Create an array containing display names.

Use `map()`.

---

## 159. Intermediate Exercise: Search User

Write:

```js
function findUserById(users, id) {}
```

Return the matching user or `undefined`.

Use `find()`.

---

## 160. Intermediate Exercise: Pagination

Write a function that returns a page of items.

Inputs:

```text
items
pageNumber
pageSize
```

Think carefully about zero-based indexes, invalid page numbers, and empty results.

---

## 161. Advanced Exercise: Immutable Update

Implement:

```js
function updateUser(users, id, changes) {}
```

Requirements:

- return a new array
- do not mutate the original array
- create a new object only for the changed user
- preserve all other user references where possible

---

## 162. Advanced Exercise: Immutable Delete

Implement:

```js
function removeUser(users, id) {}
```

Return a new array and leave the original unchanged.

Use `filter()`.

---

## 163. Advanced Exercise: Array Pipeline

Given transaction records, calculate:

1. successful transactions
2. transaction amounts
3. total amount
4. average amount
5. largest transaction

Write the solution once with array methods and once with a loop.

Compare the two designs.

---

## 164. DSA Pattern: Two Pointers

Two-pointer techniques often use indexes moving from opposite directions.

Example problems:

- reverse an array in place
- find a pair in a sorted array
- partition data

Do not memorize the pattern without understanding why each pointer moves.

---

## 165. DSA Pattern: Sliding Window

A sliding window maintains information about a moving range of an array.

Useful for:

- maximum sum of a fixed-size window
- longest substring-style problems
- contiguous sequence problems

The goal is often to avoid repeatedly recalculating the same range.

---

## 166. DSA Pattern: Frequency Map

When the question involves “how many times,” consider a frequency map.

```js
const counts = new Map();
```

Then update counts while scanning the array.

This often changes a nested-loop solution from roughly quadratic time to linear time.

---

## 167. DSA Pattern: Prefix Sum

A prefix-sum array stores cumulative totals.

```text
values:  2   4   1   3
prefix:  2   6   7  10
```

It can make repeated range-sum queries much faster after preprocessing.

---

## 168. DSA Pattern: Binary Search

Binary search works on appropriately ordered data by repeatedly eliminating half of the remaining search space.

Typical complexity:

```text
O(log n)
```

Sorting is not free, so include preprocessing cost when analyzing the complete solution.

---

## 169. DSA Pattern: Partitioning

Partitioning separates elements according to a condition.

For example:

```text
negative | zero | positive
```

Different partition requirements lead to different algorithms and mutation trade-offs.

---

## 170. Real-World Example: Shopping Cart

```js
const cart = [
  { id: 1, name: "Keyboard", price: 1200, quantity: 1 },
  { id: 2, name: "Mouse", price: 700, quantity: 2 }
];
```

Arrays are a natural representation for ordered cart items.

Use `reduce()` for totals, `find()` for lookup, `map()` for display transformations, and `filter()` for removal.

---

## 171. Real-World Example: Todo List

```js
const todos = [
  { id: 1, title: "Learn arrays", completed: true },
  { id: 2, title: "Practice reduce", completed: false }
];
```

Common operations map directly to array methods:

```text
find   → locate one todo
filter → remove/filter todos
map    → update/transform todos
some   → check whether any is incomplete
```

---

## 172. Real-World Example: API Response

An API often returns:

```js
const products = response.products;
```

Before using it, validate assumptions about the response shape.

Do not blindly call array methods on untrusted data.

---

## 173. Browser Example: Rendering a List

```js
const names = ["Ravi", "Aman", "Neha"];

const list = names
  .map((name) => `<li>${name}</li>`)
  .join("");
```

When values are untrusted, do not build unsafe HTML by interpolation. Prefer DOM APIs such as `textContent` when rendering plain text.

---

## 174. Node.js Example: Processing Files

Node.js applications commonly receive arrays of file paths, configuration entries, records, or command-line arguments.

Array methods can transform these collections before further processing.

```js
const files = ["a.js", "b.css", "c.js"];
const jsFiles = files.filter((file) => file.endsWith(".js"));
```

---

## 175. Reading Large Data

Do not assume that loading millions of records into one array is always appropriate.

For large datasets, streaming, pagination, database queries, generators, or other data-processing strategies may be better.

Array knowledge includes knowing when **not** to use one giant array.

---

## 176. Array-Like DOM Collections

Some browser APIs return array-like or iterable collection objects rather than real arrays.

If you need array methods, you may convert them:

```js
const items = Array.from(document.querySelectorAll(".item"));
```

Understand the specific collection type before assuming its behavior.

---

## 177. `Array.from()` With a Mapping Function

`Array.from()` can map while creating the array.

```js
const squares = Array.from([1, 2, 3], (n) => n * n);
```

This can be convenient when conversion and transformation belong together.

---

## 178. Array Iterator Consumption

Iterators are stateful objects.

```js
const iterator = [10, 20][Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

Each `next()` advances the iterator.

---

## 179. `[Symbol.iterator]`

Arrays expose an iterator through `Symbol.iterator`.

This is why constructs such as `for...of`, spread, and `Array.from()` can work with arrays.

Understanding this helps connect arrays to the broader JavaScript iteration protocol.

---

## 180. Why `for...of` Works

Conceptually:

```text
array
  ↓
Symbol.iterator
  ↓
iterator
  ↓
next()
  ↓
value
```

This is the bridge between arrays and JavaScript's iterable protocol.

---

## 181. Array Method Callback `thisArg`

Some older array callback APIs accept an optional `thisArg`.

Modern code often uses lexical closures or arrow functions instead, but knowing the callback signature helps when reading older JavaScript.

Do not confuse callback `this` with lexical variables captured by a closure.

---

## 182. Callback Side Effects

A callback can mutate external state:

```js
let total = 0;

numbers.forEach((n) => {
  total += n;
});
```

This works, but side effects make reasoning harder than a direct reduction when accumulation is the actual goal.

---

## 183. Pure Array Transformations

A transformation is easier to test when it does not modify external state.

```js
function double(numbers) {
  return numbers.map((n) => n * 2);
}
```

The function takes input and returns output without modifying the input array.

---

## 184. Referential Thinking

When working with arrays, always ask:

```text
Is this the same array?
Is this a new array?
Are nested values shared?
Did this method mutate?
```

These four questions prevent many state-related bugs.

---

## 185. Array Method Selection Guide

```text
Need transformed array? → map
Need selected subset?  → filter
Need one matching item? → find
Need matching index?   → findIndex
Need any match?        → some
Need all match?        → every
Need one final result? → reduce
Need side effects?     → forEach / loop
Need membership?       → includes
Need sorted copy?      → toSorted
```

Choose the method that communicates the operation.

---

## 186. Loop vs Array Method

Array methods are not automatically better than loops.

Use a loop when you need:

- `break`
- `continue`
- complex control flow
- multiple related accumulators
- very specific performance behavior

Use array methods when their semantics make the code clearer.

---

## 187. Debugging Checklist

When an array result is wrong, ask:

1. Is this really an array?
2. What is its length?
3. Are indexes correct?
4. Is it sparse?
5. Did a method mutate it?
6. Did I forget `return`?
7. Am I confusing `slice()` and `splice()`?
8. Is sorting numeric or lexicographic?
9. Are nested references shared?
10. What is the intermediate value after each operation?

---

## 188. Refactoring Example

Before:

```js
const result = [];
for (const user of users) {
  if (user.active) {
    result.push(user.name);
  }
}
```

Possible refactor:

```js
const result = users
  .filter((user) => user.active)
  .map((user) => user.name);
```

Choose the version that remains easiest for your team to understand.

---

## 189. Best Practice: Name Intermediate Data

This:

```js
const result = users.filter(...).map(...).filter(...);
```

can become difficult to inspect.

If the transformation is complex, use meaningful intermediate variables.

Readable code is easier to debug and teach.

---

## 190. Best Practice: Do Not Mutate Shared Data Accidentally

Before calling a mutating method, ask:

> “Who else might hold a reference to this array?”

This question is especially important in React state, caches, application stores, and shared module data.

---

## 191. Best Practice: Validate Assumptions

If a function expects an array, make that contract clear.

```js
function total(numbers) {
  if (!Array.isArray(numbers)) {
    throw new TypeError("numbers must be an array");
  }

  return numbers.reduce((sum, n) => sum + n, 0);
}
```

Validation should match the trust level and boundaries of the application.

---

## 192. Best Practice: Avoid Unnecessary Copies

Copies are useful for immutability, but copying large arrays has a cost.

Do not write:

```js
const copy1 = [...items];
const copy2 = [...copy1];
const copy3 = [...copy2];
```

without a reason.

Understand where new allocations are actually needed.

---

## 193. Best Practice: Keep Data Shape Consistent

Prefer:

```js
const users = [
  { id: 1, name: "A" },
  { id: 2, name: "B" }
];
```

rather than mixing unrelated shapes in one collection unless the design explicitly requires a union of types.

Consistent data is easier to process.

---

## 194. Best Practice: Avoid Sparse Arrays

Sparse arrays can make behavior harder to reason about.

Prefer explicit values or a clear initialization strategy when you need a fixed-size collection.

```js
const values = Array.from({ length: 5 }, () => 0);
```

---

## 195. Best Practice: Choose Data Structures by Operations

Arrays are excellent when you need ordered collections and indexed access.

They are not the answer to every problem.

Consider `Set` for unique membership and `Map` for key-value lookup when those semantics fit better.

---

## 196. Interview Question: Why Are Arrays Objects?

Answer in your own words.

A strong answer should mention that arrays are objects with special array-index and length behavior provided by the language.

---

## 197. Interview Question: `slice()` vs `splice()`?

Expected concepts:

- `slice()` does not mutate and returns a selected portion/copy.
- `splice()` mutates and can remove, insert, or replace elements.

---

## 198. Interview Question: Why Does `sort()` Give Unexpected Numeric Results?

Expected answer:

Default `sort()` compares elements as strings. Supply a numeric comparator such as `(a, b) => a - b` for numeric ordering.

---

## 199. Interview Question: Is Spread a Deep Copy?

No.

Array spread creates a shallow copy of the outer array. Nested objects and arrays remain shared references.

---

## 200. Interview Question: `map()` vs `forEach()`?

`map()` creates and returns a new array from callback results.

`forEach()` is intended for running a callback for side effects and returns `undefined`.

---

## 201. Interview Question: What Does `reduce()` Return?

It returns the final accumulator value.

That value can be a number, string, object, array, `Map`, or another value appropriate to the algorithm.

---

## 202. Interview Question: How Do You Remove Duplicates?

For values where `Set` equality semantics are appropriate:

```js
const unique = [...new Set(values)];
```

Explain the equality and ordering behavior if the question is advanced.

---

## 203. Interview Question: How Do You Check for an Array?

Use:

```js
Array.isArray(value)
```

Do not use `typeof value === "array"` because `typeof` returns `"object"` for arrays.

---

## 204. Teach-Back: Explain an Array in 30 Seconds

Try saying:

> “An array is an ordered collection of values. Each element can be accessed by an index starting at zero. Arrays are objects, but JavaScript gives them special indexed-element and length behavior. They are iterable and provide methods for transforming, filtering, searching, and reducing collections.”

Then explain it again in your own words.

---

## 205. Teach-Back: Explain Mutation

Explain this without using the word “magic”:

```js
const a = [1, 2];
const b = a;
b.push(3);
```

Your explanation should include shared object identity and mutation.

---

## 206. Teach-Back: Explain `map()`

Teach a beginner:

```js
[1, 2, 3].map((n) => n * 2);
```

You should explain input, callback, return value, output array, and why the original array remains unchanged.

---

## 207. Teach-Back: Explain `reduce()`

Use a real-world analogy such as collecting prices into one total.

Then connect the analogy back to accumulator, current value, and initial value.

Avoid teaching `reduce()` as merely “the complicated array method.”

---

## 208. Teach-Back: Explain `slice()` vs `splice()`

Draw this on paper:

```text
slice  → original ─────────────── unchanged
         result   ───── piece

splice → original ── changed ────
         result   ─ removed items
```

Then write one example of each without looking at the notes.

---

## 209. Mini Project: Array Explorer

Build a small browser page where a user can enter comma-separated values and perform:

- add
- remove
- search
- reverse
- sort
- filter
- map
- reduce

Display both the input array and resulting array.

Add a panel explaining whether each operation mutated the original.

---

## 210. Mini Project: Student Dashboard

Create a student dataset and implement:

- all students
- passed students
- failed students
- average marks
- highest marks
- search by ID
- sort by marks
- group by grade
- count students by grade

Use meaningful array methods rather than putting every operation into one giant function.

---

## 211. Mini Project: Shopping Cart Engine

Implement:

```text
addItem
removeItem
updateQuantity
findItem
calculateSubtotal
calculateTotal
clearCart
```

Then create an immutable version where each update returns a new cart array.

Compare the two designs.

---

## 212. Mini Project: Quiz Question Engine

Store questions as an array of objects.

Implement:

- random question selection
- answer validation
- score calculation
- filtering unanswered questions
- mapping questions into UI data
- finding a question by ID

This project connects arrays with real frontend logic.

---

## 213. Mini Project: Expense Analyzer

Create an array of expenses.

Calculate:

- total spending
- spending by category
- largest expense
- average expense
- expenses above a threshold
- sorted expenses
- monthly summaries

This is a strong `map` + `filter` + `reduce` practice project.

---

## 214. Refactoring Challenge

Start with a solution containing nested loops and duplicated logic.

Refactor it into clear helper functions and array operations.

Do not refactor only to use more methods.

The final code should be easier to read, test, and explain.

---

## 215. Debugging Challenge

Find the bugs:

```js
function getActiveNames(users) {
  return users
    .filter((user) => {
      user.active === true;
    })
    .map((user) => {
      user.name;
    });
}
```

There are two callback-return problems.

Fix them and explain why the original returned the wrong result.

---

## 216. Debugging Challenge: Mutation

```js
function sortUsers(users) {
  return users.sort((a, b) => a.age - b.age);
}
```

Question:

Does this function mutate its argument?

If the contract requires immutability, rewrite it.

---

## 217. Debugging Challenge: Empty Reduction

```js
function total(numbers) {
  return numbers.reduce((sum, n) => sum + n);
}
```

What happens for `[]`?

Fix the function if empty input should return `0`.

---

## 218. Debugging Challenge: Shared Nested Object

```js
const a = [{ count: 0 }];
const b = [...a];

b[0].count++;
```

Explain why `a[0].count` changed.

Then decide whether a shallow or deep copy is actually required.

---

## 219. Mastery Test: Fundamentals

Without notes, explain:

- array
- index
- length
- sparse array
- iterable
- array-like
- mutation
- shallow copy
- reference identity

---

## 220. Mastery Test: Methods

Without notes, explain the purpose and mutation behavior of:

```text
push
pop
shift
unshift
slice
splice
concat
map
filter
reduce
find
some
every
includes
sort
reverse
flat
flatMap
```

---

## 221. Mastery Test: Method Selection

For each problem, choose a method and explain why:

1. transform every item
2. remove inactive users
3. find one user
4. check whether any user is admin
5. check whether all prices are positive
6. calculate a total
7. create a sorted copy
8. reverse without mutation

---

## 222. Mastery Test: Mutation Audit

Take a real project file and mark every array operation as:

```text
M → mutates
N → does not mutate
```

Then check whether each mutation is intentional.

This is an excellent code-review exercise.

---

## 223. Mastery Test: Explain an Array Pipeline

Given:

```js
const result = products
  .filter((product) => product.inStock)
  .map((product) => product.price)
  .filter((price) => price > 1000)
  .reduce((total, price) => total + price, 0);
```

Explain the data shape after every step.

---

## 224. Mastery Test: Build Without a Tutorial

Build a small **Array Playground** from a blank editor.

Requirements:

- input data
- add item
- remove item
- search
- filter
- sort
- reverse
- transform
- reduce
- reset
- display original and current state

Do not watch a tutorial while building it.

---

## 225. Memory Trick

Remember the core operations like this:

```text
ADD       → push / unshift
REMOVE    → pop / shift / splice
COPY      → slice / spread
COMBINE   → concat / spread
TRANSFORM → map
SELECT    → filter
FIND      → find / findIndex
CHECK     → some / every / includes
REDUCE    → reduce
SORT      → sort / toSorted
REVERSE   → reverse / toReversed
FLATTEN   → flat / flatMap
```

---

## 226. Final Mental Model

When you see an array, think:

```text
ARRAY
 │
 ├── Ordered collection
 │
 ├── Numeric indexes
 │
 ├── length property
 │
 ├── Object identity
 │
 ├── Iterable
 │
 ├── Can be mutable
 │
 ├── Supports shallow copying
 │
 └── Provides collection operations
      │
      ├── transform
      ├── select
      ├── search
      ├── aggregate
      └── reorder
```

---

## 227. Final Mastery Checklist

Before moving to the next major topic, I should be able to say **yes** to these:

- [ ] I can create arrays confidently.
- [ ] I understand zero-based indexing.
- [ ] I understand `length`.
- [ ] I understand sparse arrays.
- [ ] I know how arrays differ from array-like values.
- [ ] I can use `Array.isArray()`.
- [ ] I understand mutation.
- [ ] I understand reference identity.
- [ ] I can make a shallow copy.
- [ ] I understand why spread is not deep cloning.
- [ ] I can add and remove elements.
- [ ] I understand `slice()` and `splice()`.
- [ ] I can transform with `map()`.
- [ ] I can filter with `filter()`.
- [ ] I can search with `find()`.
- [ ] I can validate with `some()` and `every()`.
- [ ] I can aggregate with `reduce()`.
- [ ] I understand the `reduce()` initial value.
- [ ] I can sort numbers correctly.
- [ ] I understand sorting mutation.
- [ ] I know `toSorted()` and `toReversed()`.
- [ ] I can flatten nested arrays.
- [ ] I can use destructuring.
- [ ] I understand spread vs rest.
- [ ] I can iterate with `for...of`.
- [ ] I understand why `for...in` is not an array-value loop.
- [ ] I can debug array pipelines.
- [ ] I can identify accidental mutation.
- [ ] I can choose between loops and array methods.
- [ ] I can solve basic array DSA problems.
- [ ] I can explain arrays to a beginner.
- [ ] I can build a small project using arrays without a tutorial.

---

## 228. The Teacher's Test

Close this README.

Open a blank editor.

Pick one real problem, such as a shopping cart, todo list, student list, or expense tracker.

Build it from scratch.

Then teach the solution to another person.

If you can explain:

```text
what you wrote
why you wrote it
what the data looks like
which method you selected
whether it mutates
what happens internally
what can go wrong
how you would debug it
```

then you are not merely remembering arrays.

You are learning how to **reason about arrays**.

---

## 229. One Last Rule

Do not memorize 30 array methods as isolated names.

Understand the **problem each method solves**.

When you know the problem, the method becomes easier to remember.

When you understand the behavior, you can choose the method even when the exact syntax is not immediately in your memory.

That is the level of understanding this repository is trying to build.

---

## Next Topic

**06 — Objects**

Arrays organize collections of values.

Next, we will study objects deeply: properties, keys, values, methods, references, copying, prototypes, descriptors, destructuring, object utilities, and the connection between objects and JavaScript's prototype system.
