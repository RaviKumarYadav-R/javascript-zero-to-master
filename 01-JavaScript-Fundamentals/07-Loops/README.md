# Loops in JavaScript

## 1. Definition
A loop repeatedly executes a block of code while a condition or iteration rule allows it to continue.

Loops are fundamental for processing collections, repeating calculations, searching data, generating output, and implementing algorithms.

## 2. Why Loops Exist
Without loops, repeated work would require duplicated statements.

```js
console.log(1);
console.log(2);
console.log(3);
```

A loop expresses the repeated structure once:

```js
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
```

## 3. Loop Mental Model

```text
Initialize
   ↓
Check condition
   ↓
Run body
   ↓
Update
   ↓
Check again
```

Different loop forms change which parts are explicit, but the repeated execution model remains.

## 4. `while`
A `while` loop checks its condition before each iteration.

```js
let count = 1;

while (count <= 5) {
  console.log(count);
  count++;
}
```

If the condition is false initially, the body never executes.

## 5. `do...while`
A `do...while` executes the body before checking the condition.

```js
let count = 1;

do {
  console.log(count);
  count++;
} while (count <= 5);
```

Therefore the body executes at least once.

## 6. `while` vs `do...while`

```text
while:
check → body → update → check

do...while:
body → update → check
```

Use `do...while` when one execution is guaranteed conceptually, such as a menu that must display at least once.

## 7. `for`
The `for` loop puts initialization, condition, and update in one header.

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

Structure:

```text
for (initialization; condition; update)
```

## 8. `for` Execution Order
For:

```js
for (let i = 0; i < 3; i++) {
  console.log(i);
}
```

The flow is:

```text
initialize i
check i < 3
run body
run i++
check again
```

Initialization happens once.

Condition and update repeat.

## 9. Correct Array Indexing
Use:

```js
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

Do not use `i <= arr.length` for ordinary array indexing.

The final valid index is `arr.length - 1`.

## 10. The `<=` Trap

```js
const arr = [10, 20, 30];

for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]);
}
```

The last iteration accesses `arr[3]`, which is `undefined`.

Correct:

```js
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

## 11. Counting Up

```js
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
```

This pattern starts at one and increments by one until the condition becomes false.

## 12. Counting Down

```js
for (let i = 10; i >= 1; i--) {
  console.log(i);
}
```

The update can move in either direction.

## 13. Step Size

```js
for (let i = 0; i <= 20; i += 2) {
  console.log(i);
}
```

This prints even numbers from `0` through `20`.

## 14. Reverse Array Traversal

```js
for (let i = arr.length - 1; i >= 0; i--) {
  console.log(arr[i]);
}
```

Start at the last valid index.

## 15. Infinite Loop
A loop becomes infinite when its exit condition can never become false.

```js
let i = 0;

while (i < 5) {
  console.log(i);
}
```

`i` never changes, so the loop never terminates.

## 16. Fixing an Infinite Loop

```js
let i = 0;

while (i < 5) {
  console.log(i);
  i++;
}
```

Always identify what changes the loop toward termination.

## 17. `break`
`break` immediately terminates the nearest loop.

```js
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i);
}
```

Output:

```text
0
1
2
3
4
```

## 18. `continue`
`continue` skips the remainder of the current iteration and moves to the next iteration.

```js
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i);
}
```

Output:

```text
0
1
3
4
```

## 19. `continue` in `while`
Be careful when using `continue` in a `while` loop.

Wrong:

```js
let i = 0;
while (i < 5) {
  if (i === 2) continue;
  i++;
}
```

When `i` becomes `2`, the update is skipped forever.

## 20. Correct `continue` Pattern
Update the loop variable before the possible `continue`, or structure the logic so progress is guaranteed.

```js
let i = 0;
while (i < 5) {
  i++;
  if (i === 2) continue;
  console.log(i);
}
```

## 21. Nested Loops
A loop can contain another loop.

```js
for (let row = 1; row <= 3; row++) {
  for (let col = 1; col <= 3; col++) {
    console.log(row, col);
  }
}
```

The inner loop completes for every outer-loop iteration.

## 22. Nested Loop Complexity
If both loops run approximately `n` times, the combined work can be `O(n²)`.

This matters for performance and DSA.

Do not assume every nested loop is automatically `O(n²)`; complexity depends on the actual iteration relationships.

## 23. `for...of`
`for...of` iterates over values from an iterable.

```js
const names = ["Ravi", "Aman", "Priya"];

for (const name of names) {
  console.log(name);
}
```

It is usually cleaner than index-based loops when you only need values.

## 24. What Is Iterable?
Common iterables include:

- arrays
- strings
- maps
- sets
- typed arrays
- generators

An iterable provides an iterator through the iteration protocol.

## 25. `for...of` With Strings

```js
for (const char of "Ravi") {
  console.log(char);
}
```

String iteration follows the string's iterable semantics and is Unicode-aware at the code-point level for ordinary `for...of` iteration.

## 26. `for...of` With Set

```js
const numbers = new Set([1, 2, 2, 3]);

for (const number of numbers) {
  console.log(number);
}
```

The set contains unique values, so `2` appears once.

## 27. `for...of` With Map
Map iteration produces entries by default.

```js
const users = new Map([
  ["id1", "Ravi"],
  ["id2", "Aman"],
]);

for (const [id, name] of users) {
  console.log(id, name);
}
```

Destructuring makes the key/value structure explicit.

## 28. `for...in`
`for...in` iterates over enumerable property keys.

```js
const user = {
  name: "Ravi",
  age: 21,
};

for (const key in user) {
  console.log(key, user[key]);
}
```

It is intended for object property enumeration, not ordinary array value iteration.

## 29. `for...in` and Inherited Properties
`for...in` can include enumerable inherited properties.

For safer own-property enumeration, use:

```js
for (const key in obj) {
  if (Object.hasOwn(obj, key)) {
    console.log(key, obj[key]);
  }
}
```

Or use `Object.keys()` when appropriate.

## 30. Why Not `for...in` for Arrays?
An array's enumerable keys are property keys, not necessarily the values you want.

Arrays can also have extra enumerable properties.

Use:

```js
for (const value of array) {
  console.log(value);
}
```

when you want array values.

## 31. Plain Objects and `for...of`
This does not work by default:

```js
for (const value of {}) {
  // TypeError: object is not iterable
}
```

Use:

```js
for (const [key, value] of Object.entries(obj)) {
  console.log(key, value);
}
```

## 32. `Object.keys()`

```js
const keys = Object.keys(user);

for (const key of keys) {
  console.log(key);
}
```

This gives an array of the object's own enumerable string keys.

## 33. `Object.values()`

```js
for (const value of Object.values(user)) {
  console.log(value);
}
```

Use it when keys are irrelevant.

## 34. `Object.entries()`

```js
for (const [key, value] of Object.entries(user)) {
  console.log(key, value);
}
```

This is often the cleanest approach for iterating over object key/value pairs.

## 35. Loop Variable Scope
Variables declared with `let` or `const` in a `for` loop are block-scoped.

```js
for (let i = 0; i < 3; i++) {
  console.log(i);
}

// i is not available here
```

This avoids many accidental global or outer-scope variables.

## 36. `var` in Loops
`var` is function-scoped rather than block-scoped.

This can create surprising behavior when asynchronous callbacks capture the loop variable.

Prefer `let` for loop counters in modern JavaScript.

## 37. Loop Closures
With `let`, each iteration has the appropriate per-iteration binding semantics.

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

The output is:

```text
0
1
2
```

This is an important connection between loops and closures.

## 38. `var` Closure Trap

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

The callbacks observe the shared function-scoped `i`, which reaches `3` before the timers execute.

The output is typically:

```text
3
3
3
```

This is a classic event-loop and closure question.

## 39. Loop and Mutation
Changing a collection while iterating can make behavior difficult to reason about.

```js
const numbers = [1, 2, 3, 4];

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    numbers.splice(i, 1);
  }
}
```

Removing elements changes indexes, so elements can be skipped.

## 40. Safer Filtering
When the goal is to remove elements based on a condition, create the desired result with `filter()` when appropriate.

```js
const oddNumbers = numbers.filter((n) => n % 2 !== 0);
```

This separates transformation from traversal.

## 41. Looping With `forEach`
`forEach()` is an array method rather than a loop statement.

```js
numbers.forEach((number) => {
  console.log(number);
});
```

It is useful for side effects but does not support ordinary `break` and `continue` semantics.

## 42. `for` vs `forEach`
Use `for` when you need:

- `break`
- `continue`
- precise index control
- custom stepping
- certain performance-sensitive traversal patterns

Use `forEach` when simple side-effect iteration is clear.

## 43. `map` Is Not a Replacement for Every Loop
Use `map()` when transforming every element into a new array.

```js
const doubled = numbers.map((n) => n * 2);
```

Do not use `map()` only for side effects and ignore its returned array.

## 44. Search With a Loop

```js
function findUser(users, targetId) {
  for (const user of users) {
    if (user.id === targetId) {
      return user;
    }
  }

  return undefined;
}
```

`return` exits the entire function, which also terminates the loop.

## 45. `break` vs `return`
`break` exits the nearest loop or switch.

`return` exits the entire function.

```js
function find(numbers, target) {
  for (const number of numbers) {
    if (number === target) return number;
  }
  return -1;
}
```

## 46. Accumulator Pattern
Loops often build a result.

```js
let total = 0;

for (const price of prices) {
  total += price;
}
```

This is the basic accumulator pattern behind many algorithms and `reduce()` operations.

## 47. Counter Pattern

```js
let count = 0;

for (const number of numbers) {
  if (number > 10) count++;
}
```

Counters answer questions such as “how many elements satisfy this condition?”

## 48. Maximum Pattern

```js
let max = numbers[0];

for (const number of numbers) {
  if (number > max) {
    max = number;
  }
}
```

Always consider the empty-array case in production code.

## 49. Minimum Pattern

```js
let min = numbers[0];

for (const number of numbers) {
  if (number < min) {
    min = number;
  }
}
```

Again, define behavior for empty input.

## 50. Frequency Counter

```js
const frequency = {};

for (const char of "banana") {
  frequency[char] = (frequency[char] ?? 0) + 1;
}
```

This is a foundational DSA pattern.

## 51. Nested Loop Example
Generate pairs:

```js
for (let i = 0; i < 3; i++) {
  for (let j = i + 1; j < 3; j++) {
    console.log(i, j);
  }
}
```

Notice that the inner loop starts from `i + 1`, reducing duplicate pairs.

## 52. Labels
JavaScript supports labels for statements.

```js
outer:
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break outer;
  }
}
```

The labeled `break` exits the specified outer loop.

Use labels sparingly because they can make control flow harder to read.

## 53. `continue` With Labels

```js
outer:
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) continue outer;
    console.log(i, j);
  }
}
```

This skips to the next iteration of the labeled outer loop.

## 54. Loop Termination
Every potentially unbounded loop should have a clear termination strategy.

Ask:

```text
What starts the loop?
What keeps it running?
What changes state?
What eventually makes the condition false?
```

This mental checklist prevents many infinite-loop bugs.

## 55. Off-by-One Errors
An off-by-one error occurs when a loop runs one time too many or too few.

Typical array pattern:

```js
for (let i = 0; i < arr.length; i++) {
```

Carefully decide whether your endpoint is inclusive or exclusive.

## 56. Inclusive vs Exclusive

```text
i < end   → end excluded
 i <= end → end included
```

JavaScript APIs such as `slice(start, end)` also commonly use an exclusive end.

## 57. Loop Invariants
A loop invariant is a property that remains true at important points of each iteration.

For a sum loop:

```js
let sum = 0;
for (const n of numbers) {
  sum += n;
}
```

After each iteration, `sum` represents the sum of all processed elements.

Thinking in invariants is useful for proving algorithm correctness.

## 58. Performance and Big-O
A single traversal is commonly `O(n)`.

A loop that does constant work for every element is generally linear.

Two independent loops can still be `O(n)` when each traverses the same input once.

Nested loops may be `O(n²)`, but only after analyzing their actual bounds.

## 59. Early Exit Optimization
If you only need to know whether a value exists, stop when found.

```js
for (const value of values) {
  if (value === target) {
    return true;
  }
}

return false;
```

There is no reason to scan the remaining elements after the answer is known.

## 60. Avoid Repeated Expensive Work
If a loop repeatedly performs an expensive calculation that does not change, move it outside when safe.

Bad pattern:

```js
for (const item of items) {
  const limit = calculateLimit();
  // ...
}
```

If `calculateLimit()` is invariant, compute it once before the loop.

## 61. Browser Example

```js
const buttons = document.querySelectorAll("button");

for (const button of buttons) {
  button.addEventListener("click", () => {
    console.log(button.textContent);
  });
}
```

Loops are common when wiring multiple DOM elements.

## 62. Node.js Example

```js
const files = ["a.txt", "b.txt", "c.txt"];

for (const file of files) {
  console.log(`Processing ${file}`);
}
```

The same language-level iteration works in Node.js.

## 63. Async Loops
For asynchronous work, be careful about the desired concurrency.

Sequential:

```js
for (const user of users) {
  await saveUser(user);
}
```

This waits for each operation before starting the next.

## 64. Parallel Async Work
If operations are independent, parallel scheduling may be appropriate:

```js
await Promise.all(
  users.map((user) => saveUser(user))
);
```

This is a major distinction between loop syntax and concurrency strategy.

## 65. `for await...of`
`for await...of` consumes async iterables and can also consume ordinary iterables by awaiting yielded values as appropriate.

```js
for await (const chunk of stream) {
  console.log(chunk);
}
```

It is useful for streams and async generators.

## 66. Async `forEach` Trap
This does not wait for asynchronous callbacks:

```js
items.forEach(async (item) => {
  await process(item);
});
```

The surrounding function does not automatically wait for all callbacks.

For sequential work, use `for...of` with `await`.

## 67. Async Error Handling

```js
for (const item of items) {
  try {
    await process(item);
  } catch (error) {
    console.error(error);
  }
}
```

Decide whether one failure should stop the entire process or be collected and reported.

## 68. Security Perspective
Loops processing external input should have bounded work where practical.

Unbounded input combined with expensive nested processing can contribute to denial-of-service conditions.

Validate collection sizes and avoid unnecessary quadratic work on attacker-controlled data.

## 69. Debugging Loops
When a loop is wrong, inspect:

```text
initial value
condition
body
update
termination
```

Log the iteration variable when necessary:

```js
console.log({ i, value: arr[i] });
```

For complex loops, use debugger breakpoints and watch expressions.

## 70. Common Loop Bugs

- wrong initial value
- wrong termination condition
- wrong update direction
- forgetting the update
- using `<=` instead of `<`
- modifying a collection during traversal
- incorrect nested-loop bounds
- accidental infinite loop
- misuse of `continue`
- using `for...in` for array values
- using `forEach` when `break` is required
- incorrect async iteration

## 71. Practice — Recall

1. What is a loop?
2. What is a `while` loop?
3. What is a `do...while` loop?
4. What is a `for` loop?
5. What does `break` do?
6. What does `continue` do?
7. What is `for...of`?
8. What is `for...in`?
9. What is an iterable?
10. What is an off-by-one error?

## 72. Practice — Understand

11. Why does `do...while` run at least once?
12. Why should array loops use `< arr.length`?
13. Why is `for...of` preferred for array values?
14. Why can `for...in` include inherited enumerable properties?
15. Why can `continue` create an infinite `while` loop?
16. Why does `break` stop only the nearest loop?
17. Why can nested loops become `O(n²)`?
18. Why is `forEach(async () => {})` often misunderstood?
19. Why can mutating an array during traversal skip elements?
20. Why are guard conditions important for termination?

## 73. Practice — Predict
Predict the output:

```js
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  if (i === 4) break;
  console.log(i);
}
```

Explain exactly when `continue` and `break` execute.

## 74. Practice — Debug
Fix:

```js
let i = 0;

while (i < 10) {
  if (i % 2 === 0) continue;
  console.log(i);
  i++;
}
```

The code can stop making progress when `i` is even.

## 75. Practice — Apply
Write functions to:

```js
sum(numbers)
countEven(numbers)
findMax(numbers)
findMin(numbers)
findValue(numbers, target)
reverseArray(numbers)
```

Implement each first with a basic loop.

## 76. Practice — Design
Build a loop-based data-processing function that:

1. validates input,
2. traverses a collection,
3. counts valid items,
4. ignores invalid items,
5. stops early when a target is found,
6. returns a structured result.

## 77. Interview Questions

- Difference between `while` and `do...while`?
- Explain the three parts of a `for` loop.
- What causes an infinite loop?
- Difference between `break` and `continue`?
- Difference between `for...of` and `for...in`?
- Why should `for...in` generally not be used for arrays?
- What is an iterable?
- What is an iterator?
- What is an off-by-one error?
- How do closures interact with loops?
- Why does `var` behave differently from `let` in loops?
- Why does `forEach` not support ordinary `break`?
- How do you process async operations sequentially?
- How do you process independent async operations concurrently?
- How can nested loops be optimized?

## 78. Teach-Back Challenge
Explain this to a beginner:

```text
for loop
  ↓
initialize
  ↓
condition
  ↓
body
  ↓
update
  ↓
condition again
```

Then demonstrate:

- counting
- array traversal
- search
- accumulator
- nested loops
- `break`
- `continue`
- `for...of`
- `for...in`

## 79. Mini Project
Build a **Loop-Based Data Analyzer**.

Input an array of numbers and calculate:

- count
- sum
- average
- minimum
- maximum
- even count
- odd count
- positive count
- negative count
- first matching target

First implement everything with basic loops. Then refactor selected operations using array methods and compare readability and complexity.

## 80. Mastery Checklist

- [ ] Explain loop purpose.
- [ ] Use `while`.
- [ ] Use `do...while`.
- [ ] Use `for`.
- [ ] Explain initialization, condition, and update.
- [ ] Traverse arrays safely.
- [ ] Avoid off-by-one errors.
- [ ] Use `break` correctly.
- [ ] Use `continue` correctly.
- [ ] Explain infinite loops.
- [ ] Use nested loops.
- [ ] Explain basic loop complexity.
- [ ] Use `for...of` for iterable values.
- [ ] Use `for...in` correctly for enumerable keys.
- [ ] Understand inherited enumerable properties.
- [ ] Use `Object.keys/values/entries`.
- [ ] Understand loop scope.
- [ ] Explain `var` vs `let` loop closures.
- [ ] Avoid unsafe collection mutation.
- [ ] Handle async loops correctly.
- [ ] Debug termination problems.
- [ ] Design loop-based algorithms.
- [ ] Teach loops confidently.

## Final Mental Model

```text
START
  ↓
Initialize state
  ↓
Check whether another iteration is allowed
  ↓
Execute body
  ↓
Update state
  ↓
Repeat
  ↓
Stop when termination condition is reached
```

A loop is fundamentally a controlled repetition mechanism. Master the state, condition, update, and termination, and the different loop syntaxes become variations of the same underlying idea.
