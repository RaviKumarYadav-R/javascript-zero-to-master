/*
 * JavaScript Zero to Master
 * Chapter 26 — Practice
 * Companion JavaScript File
 *
 * Goal: turn knowledge into problem-solving ability.
 *
 * Practice loop:
 * Understand -> Predict -> Implement -> Test -> Debug -> Refactor -> Explain
 *
 * Try each challenge yourself before looking at the reference solution.
 */

console.log("=== 26. JavaScript Practice ===");

// ============================================================
// 1. HOW TO PRACTICE
// ============================================================
// A good practice problem should make you think before you type.
//
// For every problem ask:
// 1. What is the input?
// 2. What is the output?
// 3. What are the constraints?
// 4. What edge cases exist?
// 5. What is the simplest correct algorithm?
// 6. What is its time/space complexity?
// 7. Can I explain it without reading the code?

// ============================================================
// 2. BASIC OUTPUT PREDICTION
// ============================================================

console.log("Prediction 1:", 2 + 3 * 4); // 14
console.log("Prediction 2:", "5" + 2); // "52"
console.log("Prediction 3:", Number("5") + 2); // 7
console.log("Prediction 4:", Boolean("")); // false

// ============================================================
// 3. VARIABLES
// ============================================================

let score = 10;
score += 5;
const maxScore = 20;
console.log("Score:", score, "Max:", maxScore);

// Challenge: explain why this fails conceptually:
// const user = { name: "Ravi" };
// user = { name: "New" }; // reassignment error
//
// But this is allowed:
const user = { name: "Ravi" };
user.name = "New";
console.log("Mutable object:", user);

// ============================================================
// 4. FUNCTIONS
// ============================================================

function add(a, b) {
  return a + b;
}

console.log("Add:", add(10, 20));

// Challenge:
// Write functions for subtract, multiply, divide, and remainder.

// ============================================================
// 5. CONDITION: EVEN OR ODD
// ============================================================

function isEven(number) {
  return number % 2 === 0;
}

console.log("Even:", isEven(8));
console.log("Odd:", isEven(7));

// ============================================================
// 6. CONDITION: POSITIVE / NEGATIVE / ZERO
// ============================================================

function classifyNumber(number) {
  if (number > 0) return "positive";
  if (number < 0) return "negative";
  return "zero";
}

console.log("Classify:", classifyNumber(-4));

// ============================================================
// 7. GRADING
// ============================================================

function getGrade(score) {
  if (score < 0 || score > 100) return "invalid";
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

console.log("Grade:", getGrade(87));

// ============================================================
// 8. SWITCH
// ============================================================

function getDayName(day) {
  switch (day) {
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
    case 7: return "Sunday";
    default: return "Invalid day";
  }
}

console.log("Day:", getDayName(3));

// ============================================================
// 9. LOOP: SUM 1..N
// ============================================================

function sumToN(n) {
  let total = 0;
  for (let i = 1; i <= n; i += 1) {
    total += i;
  }
  return total;
}

console.log("Sum to N:", sumToN(5)); // 15

// ============================================================
// 10. FACTORIAL
// ============================================================

function factorial(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError("n must be a non-negative integer");
  }

  let result = 1;
  for (let i = 2; i <= n; i += 1) result *= i;
  return result;
}

console.log("Factorial:", factorial(5)); // 120

// ============================================================
// 11. REVERSE A STRING
// ============================================================

function reverseString(value) {
  return [...value].reverse().join("");
}

console.log("Reverse:", reverseString("javascript"));

// ============================================================
// 12. PALINDROME
// ============================================================

function isPalindrome(value) {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]/g, "");
  return normalized === reverseString(normalized);
}

console.log("Palindrome:", isPalindrome("Madam"));

// ============================================================
// 13. COUNT VOWELS
// ============================================================

function countVowels(value) {
  let count = 0;
  for (const char of value.toLowerCase()) {
    if ("aeiou".includes(char)) count += 1;
  }
  return count;
}

console.log("Vowels:", countVowels("JavaScript"));

// ============================================================
// 14. CHARACTER FREQUENCY
// ============================================================

function characterFrequency(value) {
  const frequency = {};

  for (const char of value) {
    frequency[char] = (frequency[char] ?? 0) + 1;
  }

  return frequency;
}

console.log("Frequency:", characterFrequency("banana"));

// ============================================================
// 15. ANAGRAM
// ============================================================

function areAnagrams(a, b) {
  const normalize = (value) =>
    value.toLowerCase().replace(/[^a-z0-9]/g, "").split("").sort().join("");

  return normalize(a) === normalize(b);
}

console.log("Anagram:", areAnagrams("listen", "silent"));

// ============================================================
// 16. ARRAY SUM
// ============================================================

function arraySum(numbers) {
  let total = 0;
  for (const number of numbers) total += number;
  return total;
}

console.log("Array sum:", arraySum([10, 20, 30]));

// ============================================================
// 17. MAXIMUM VALUE
// ============================================================

function maxValue(numbers) {
  if (numbers.length === 0) return undefined;

  let max = numbers[0];
  for (const number of numbers) {
    if (number > max) max = number;
  }
  return max;
}

console.log("Maximum:", maxValue([4, 9, 2, 15, 3]));

// ============================================================
// 18. MINIMUM VALUE
// ============================================================

function minValue(numbers) {
  if (numbers.length === 0) return undefined;

  let min = numbers[0];
  for (const number of numbers) {
    if (number < min) min = number;
  }
  return min;
}

console.log("Minimum:", minValue([4, 9, 2, 15, 3]));

// ============================================================
// 19. REMOVE DUPLICATES
// ============================================================

function uniqueValues(values) {
  return [...new Set(values)];
}

console.log("Unique:", uniqueValues([1, 2, 2, 3, 3, 3]));

// ============================================================
// 20. SECOND LARGEST DISTINCT VALUE
// ============================================================

function secondLargest(numbers) {
  const unique = [...new Set(numbers)].sort((a, b) => b - a);
  return unique[1];
}

console.log("Second largest:", secondLargest([10, 4, 10, 8, 7]));

// ============================================================
// 21. MOVE ZEROS TO END
// ============================================================

function moveZerosToEnd(numbers) {
  const result = numbers.filter((number) => number !== 0);
  while (result.length < numbers.length) result.push(0);
  return result;
}

console.log("Move zeros:", moveZerosToEnd([0, 1, 0, 3, 12]));

// ============================================================
// 22. TWO SUM — BRUTE FORCE
// ============================================================

function twoSumBruteForce(numbers, target) {
  for (let i = 0; i < numbers.length; i += 1) {
    for (let j = i + 1; j < numbers.length; j += 1) {
      if (numbers[i] + numbers[j] === target) return [i, j];
    }
  }
  return [];
}

console.log("Two sum brute:", twoSumBruteForce([2, 7, 11, 15], 9));

// ============================================================
// 23. TWO SUM — HASH MAP
// ============================================================

function twoSum(numbers, target) {
  const seen = new Map();

  for (let i = 0; i < numbers.length; i += 1) {
    const needed = target - numbers[i];
    if (seen.has(needed)) return [seen.get(needed), i];
    seen.set(numbers[i], i);
  }

  return [];
}

console.log("Two sum map:", twoSum([2, 7, 11, 15], 9));

// ============================================================
// 24. FREQUENCY MAP
// ============================================================

function frequencyMap(values) {
  const map = new Map();

  for (const value of values) {
    map.set(value, (map.get(value) ?? 0) + 1);
  }

  return map;
}

console.log("Frequency map:", [...frequencyMap([1, 1, 2, 3, 3, 3])]);

// ============================================================
// 25. FIRST NON-REPEATING CHARACTER
// ============================================================

function firstUniqueCharacter(value) {
  const frequency = characterFrequency(value);

  for (const char of value) {
    if (frequency[char] === 1) return char;
  }

  return undefined;
}

console.log("First unique:", firstUniqueCharacter("swiss"));

// ============================================================
// 26. MAP / FILTER / REDUCE
// ============================================================

const prices = [100, 250, 80, 400];
const discounted = prices.map((price) => price * 0.9);
const expensive = prices.filter((price) => price >= 200);
const totalPrice = prices.reduce((sum, price) => sum + price, 0);

console.log("Discounted:", discounted);
console.log("Expensive:", expensive);
console.log("Total:", totalPrice);

// ============================================================
// 27. SORTING NUMBERS
// ============================================================
// Common mistake:
// [10, 2, 30].sort() -> [10, 2, 30] lexicographically.
// Use a numeric comparator.

const numbersToSort = [10, 2, 30, 4];
console.log("Numeric sort:", [...numbersToSort].sort((a, b) => a - b));

// ============================================================
// 28. OBJECT GROUPING
// ============================================================

function groupByCategory(items) {
  return items.reduce((groups, item) => {
    const key = item.category;
    (groups[key] ??= []).push(item);
    return groups;
  }, {});
}

console.log(
  "Grouped:",
  groupByCategory([
    { name: "Pen", category: "stationery" },
    { name: "Apple", category: "food" },
    { name: "Book", category: "stationery" },
  ]),
);

// ============================================================
// 29. DESTRUCTURING
// ============================================================

const product = { name: "Keyboard", price: 999, stock: 4 };
const { name: productName, price } = product;
console.log("Destructured:", productName, price);

// ============================================================
// 30. OBJECT TRANSFORMATION
// ============================================================

function toPublicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

console.log(
  "Public user:",
  toPublicUser({ id: "u1", name: "Ravi", email: "r@example.com", password: "secret" }),
);

// ============================================================
// 31. SHALLOW COPY CHALLENGE
// ============================================================

const original = { profile: { name: "Ravi" } };
const shallow = { ...original };
shallow.profile.name = "Changed";
console.log("Shallow copy shares nested object:", original.profile.name);

// Challenge: fix the nested-copy problem with structuredClone where supported.

// ============================================================
// 32. STACK
// ============================================================

class Stack {
  #items = [];

  push(value) {
    this.#items.push(value);
  }

  pop() {
    return this.#items.pop();
  }

  peek() {
    return this.#items.at(-1);
  }

  get size() {
    return this.#items.length;
  }
}

const stack = new Stack();
stack.push(10);
stack.push(20);
console.log("Stack:", stack.peek(), stack.pop(), stack.size);

// ============================================================
// 33. QUEUE
// ============================================================

class Queue {
  #items = [];
  #head = 0;

  enqueue(value) {
    this.#items.push(value);
  }

  dequeue() {
    if (this.#head >= this.#items.length) return undefined;
    const value = this.#items[this.#head];
    this.#head += 1;
    return value;
  }

  get size() {
    return this.#items.length - this.#head;
  }
}

const queue = new Queue();
queue.enqueue("A");
queue.enqueue("B");
console.log("Queue:", queue.dequeue(), queue.size);

// ============================================================
// 34. BINARY SEARCH
// ============================================================
// Requirement: input must be sorted.

function binarySearch(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (numbers[middle] === target) return middle;
    if (numbers[middle] < target) left = middle + 1;
    else right = middle - 1;
  }

  return -1;
}

console.log("Binary search:", binarySearch([1, 3, 5, 7, 9], 7));

// ============================================================
// 35. TWO POINTERS
// ============================================================
// Example: determine whether a sorted array contains a pair with target sum.

function hasPairWithSumSorted(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return true;
    if (sum < target) left += 1;
    else right -= 1;
  }

  return false;
}

console.log("Two pointers:", hasPairWithSumSorted([1, 2, 4, 7, 11], 9));

// ============================================================
// 36. SLIDING WINDOW — MAX SUM
// ============================================================

function maxWindowSum(numbers, windowSize) {
  if (windowSize <= 0 || windowSize > numbers.length) return undefined;

  let windowSum = 0;
  for (let i = 0; i < windowSize; i += 1) windowSum += numbers[i];

  let best = windowSum;

  for (let right = windowSize; right < numbers.length; right += 1) {
    windowSum += numbers[right] - numbers[right - windowSize];
    best = Math.max(best, windowSum);
  }

  return best;
}

console.log("Sliding window:", maxWindowSum([2, 1, 5, 1, 3, 2], 3));

// ============================================================
// 37. PREFIX SUM
// ============================================================

function buildPrefixSums(numbers) {
  const prefix = [0];
  for (const number of numbers) {
    prefix.push(prefix.at(-1) + number);
  }
  return prefix;
}

function rangeSum(prefix, left, right) {
  return prefix[right + 1] - prefix[left];
}

const prefix = buildPrefixSums([2, 4, 6, 8]);
console.log("Range sum:", rangeSum(prefix, 1, 3)); // 18

// ============================================================
// 38. RECURSION
// ============================================================

function recursiveCountdown(n) {
  if (n <= 0) return;
  console.log(n);
  recursiveCountdown(n - 1);
}

recursiveCountdown(3);

// Every recursive solution needs a base case and progress toward that base case.

// ============================================================
// 39. FIBONACCI — MEMOIZATION
// ============================================================

function fibonacciMemoized(n, memo = new Map([[0, 0], [1, 1]])) {
  if (memo.has(n)) return memo.get(n);

  const result = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
  memo.set(n, result);
  return result;
}

console.log("Fibonacci:", fibonacciMemoized(10));

// ============================================================
// 40. MERGE SORT
// ============================================================

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }

  return result.concat(left.slice(i), right.slice(j));
}

function mergeSort(numbers) {
  if (numbers.length <= 1) return numbers;

  const middle = Math.floor(numbers.length / 2);
  const left = mergeSort(numbers.slice(0, middle));
  const right = mergeSort(numbers.slice(middle));
  return merge(left, right);
}

console.log("Merge sort:", mergeSort([5, 1, 4, 2, 8]));

// ============================================================
// 41. VALID PARENTHESES
// ============================================================

function isValidParentheses(value) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];

  for (const char of value) {
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else if (pairs[char]) {
      if (stack.pop() !== pairs[char]) return false;
    }
  }

  return stack.length === 0;
}

console.log("Valid parentheses:", isValidParentheses("{[()] }".replace(" ", "")));

// ============================================================
// 42. LINKED LIST
// ============================================================

class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

function reverseLinkedList(head) {
  let previous = null;
  let current = head;

  while (current) {
    const next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }

  return previous;
}

const list = new ListNode(1, new ListNode(2, new ListNode(3)));
console.log("Reversed list head:", reverseLinkedList(list).value);

// ============================================================
// 43. TREE DFS
// ============================================================

function treeDFS(node, visit) {
  if (!node) return;
  visit(node);
  treeDFS(node.left, visit);
  treeDFS(node.right, visit);
}

const tree = {
  value: 1,
  left: { value: 2, left: null, right: null },
  right: { value: 3, left: null, right: null },
};

const treeValues = [];
treeDFS(tree, (node) => treeValues.push(node.value));
console.log("Tree DFS:", treeValues);

// ============================================================
// 44. GRAPH BFS
// ============================================================

function graphBFS(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const result = [];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];
    result.push(node);

    for (const neighbor of graph.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}

const graph = new Map([
  ["A", ["B", "C"]],
  ["B", ["D"]],
  ["C", ["D"]],
  ["D", []],
]);

console.log("Graph BFS:", graphBFS(graph, "A"));

// ============================================================
// 45. GREEDY PRACTICE
// ============================================================
// Activity selection: select the maximum number of non-overlapping activities
// by repeatedly choosing the activity with the earliest finish time.

function selectActivities(activities) {
  const sorted = [...activities].sort((a, b) => a.end - b.end);
  const selected = [];
  let lastEnd = -Infinity;

  for (const activity of sorted) {
    if (activity.start >= lastEnd) {
      selected.push(activity);
      lastEnd = activity.end;
    }
  }

  return selected;
}

console.log(
  "Greedy activities:",
  selectActivities([
    { start: 1, end: 3 },
    { start: 2, end: 4 },
    { start: 3, end: 5 },
    { start: 5, end: 7 },
  ]),
);

// ============================================================
// 46. DYNAMIC PROGRAMMING — CLIMBING STAIRS
// ============================================================

function climbingStairs(n) {
  if (n <= 1) return 1;

  let previous = 1;
  let current = 1;

  for (let step = 2; step <= n; step += 1) {
    [previous, current] = [current, previous + current];
  }

  return current;
}

console.log("Climbing stairs:", climbingStairs(5));

// ============================================================
// 47. BACKTRACKING — PERMUTATIONS
// ============================================================

function permutations(values) {
  const result = [];
  const path = [];
  const used = new Array(values.length).fill(false);

  function backtrack() {
    if (path.length === values.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < values.length; i += 1) {
      if (used[i]) continue;

      used[i] = true;
      path.push(values[i]);
      backtrack();
      path.pop();
      used[i] = false;
    }
  }

  backtrack();
  return result;
}

console.log("Permutations:", permutations([1, 2, 3]));

// ============================================================
// 48. CLOSURE PRACTICE
// ============================================================

function createCounter(start = 0) {
  let count = start;

  return {
    increment() {
      count += 1;
      return count;
    },
    get value() {
      return count;
    },
  };
}

const counter = createCounter(10);
console.log("Closure counter:", counter.increment(), counter.increment());

// ============================================================
// 49. HIGHER-ORDER FUNCTION
// ============================================================

function applyTwice(fn, value) {
  return fn(fn(value));
}

console.log("Higher-order:", applyTwice((number) => number * 2, 3));

// ============================================================
// 50. FUNCTION COMPOSITION
// ============================================================

const compose = (...functions) => (value) =>
  functions.reduceRight((current, fn) => fn(current), value);

const pipeline = compose(
  (value) => `Result: ${value}`,
  (value) => value * 2,
  (value) => value + 3,
);

console.log("Composition:", pipeline(5)); // Result: 16

// ============================================================
// 51. DEBOUNCE CONCEPT
// ============================================================

function debounce(fn, delay) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const debouncedSearch = debounce((query) => {
  console.log("Search executed:", query);
}, 50);

debouncedSearch("j");
debouncedSearch("ja");
debouncedSearch("javascript");

// ============================================================
// 52. THROTTLE CONCEPT
// ============================================================

function throttle(fn, delay) {
  let lastRun = -Infinity;

  return (...args) => {
    const now = Date.now();
    if (now - lastRun < delay) return;
    lastRun = now;
    fn(...args);
  };
}

const throttledLog = throttle((value) => {
  console.log("Throttled:", value);
}, 50);

throttledLog("first");
throttledLog("second");

// ============================================================
// 53. PROMISE PRACTICE
// ============================================================

function fakeFetch(value, delay = 20) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });
}

console.log(
  "Promise:",
  await fakeFetch("loaded"),
);

// ============================================================
// 54. ASYNC CONCURRENCY
// ============================================================

async function fetchAll(values) {
  return Promise.all(values.map((value) => fakeFetch(value)));
}

console.log("Promise.all:", await fetchAll(["A", "B", "C"]));

// ============================================================
// 55. ERROR HANDLING
// ============================================================

function parseJSON(value) {
  try {
    return { ok: true, value: JSON.parse(value) };
  } catch (error) {
    return { ok: false, error };
  }
}

console.log("Parse valid:", parseJSON('{"ok":true}'));
console.log("Parse invalid:", parseJSON("not json").ok);

// ============================================================
// 56. RESULT PATTERN
// ============================================================

function divide(a, b) {
  if (b === 0) {
    return { ok: false, error: "Cannot divide by zero" };
  }
  return { ok: true, value: a / b };
}

console.log("Result success:", divide(10, 2));
console.log("Result failure:", divide(10, 0));

// ============================================================
// 57. API RESPONSE MAPPING
// ============================================================

function mapNoteResponse(note) {
  return {
    id: note.id,
    title: note.title,
    content: note.content,
  };
}

console.log(
  "API mapping:",
  mapNoteResponse({ id: "n1", title: "Note", content: "Hello", secret: "x" }),
);

// ============================================================
// 58. VALIDATION
// ============================================================

function validateCreateNote(input) {
  const errors = {};

  if (typeof input?.title !== "string" || !input.title.trim()) {
    errors.title = "Title is required";
  }

  if (input?.content !== undefined && typeof input.content !== "string") {
    errors.content = "Content must be a string";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

console.log("Validation:", validateCreateNote({ title: "  Note  " }));

// ============================================================
// 59. AUTHORIZATION
// ============================================================

function canEdit(user, resource) {
  return user.id === resource.ownerId || user.roles?.includes("admin");
}

console.log(
  "Authorization:",
  canEdit({ id: "u1", roles: [] }, { ownerId: "u1" }),
);

// Client-side permission checks improve UX; server-side authorization is the
// actual security boundary for protected backend resources.

// ============================================================
// 60. IMMUTABLE UPDATE
// ============================================================

function updateUserName(user, name) {
  return {
    ...user,
    profile: {
      ...user.profile,
      name,
    },
  };
}

const before = { id: "u1", profile: { name: "Old" } };
const after = updateUserName(before, "New");
console.log("Immutable update:", before, after);

// ============================================================
// 61. CACHE PRACTICE
// ============================================================

function memoize(fn) {
  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const square = memoize((number) => {
  console.log("Calculating square");
  return number * number;
});

console.log("Memo 1:", square(8));
console.log("Memo 2:", square(8));

// Memoization is safest when the function is deterministic and the cache key
// correctly represents its inputs.

// ============================================================
// 62. EVENT BUS PRACTICE
// ============================================================

function createSimpleEventBus() {
  const listeners = new Map();

  return {
    on(type, listener) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(listener);
      return () => listeners.get(type)?.delete(listener);
    },
    emit(type, data) {
      for (const listener of listeners.get(type) ?? []) listener(data);
    },
  };
}

const bus = createSimpleEventBus();
bus.on("created", (data) => console.log("Event received:", data));
bus.emit("created", { id: "n1" });

// ============================================================
// 63. ARCHITECTURE PRACTICE
// ============================================================
// Design this flow:
//
// HTTP request
//   -> controller
//   -> use case
//   -> repository
//   -> database
//
// Add:
// - validation
// - authorization
// - transaction where required
// - logging
// - metrics
// - error mapping
// - cache where justified
//
// Do not put every responsibility into one function.

// ============================================================
// 64. DEBUGGING CHALLENGE 1
// ============================================================

function buggySum(numbers) {
  let total = 0;
  for (let i = 0; i <= numbers.length; i += 1) {
    total += numbers[i];
  }
  return total;
}

// Question: Why can buggySum([1, 2, 3]) become NaN?
// Fix: use i < numbers.length.

// ============================================================
// 65. DEBUGGING CHALLENGE 2
// ============================================================

function buggyMap(numbers) {
  return numbers.map((number) => {
    number * 2;
  });
}

// Question: Why does this return [undefined, undefined, ...]?
// Fix: return number * 2, or use an expression-body arrow function.

// ============================================================
// 66. DEBUGGING CHALLENGE 3
// ============================================================

function buggyFindUser(users, id) {
  for (const user of users) {
    if (user.id = id) return user;
  }
}

// Question: What operator is wrong?
// Fix: user.id === id.

// ============================================================
// 67. DEBUGGING CHALLENGE 4
// ============================================================

function buggyCounter() {
  let count = 0;
  return () => {
    count;
  };
}

// Question: Why does calling the returned function not increment anything?
// Fix the mutation and return the updated value.

// ============================================================
// 68. DEBUGGING CHALLENGE 5
// ============================================================

function buggyAsync() {
  setTimeout(() => {
    throw new Error("Timer failure");
  }, 0);
}

// Question: Why will an outer synchronous try/catch not catch this timer error?
// Answer: the callback runs later, outside the synchronous try/catch execution.

// ============================================================
// 69. DEBUGGING CHALLENGE 6
// ============================================================

function buggySort(numbers) {
  return numbers.sort();
}

// Question: Why is buggySort([2, 10, 1]) surprising?
// Answer: default sort compares values as strings.

// ============================================================
// 70. DEBUGGING CHALLENGE 7
// ============================================================

function buggySharedState() {
  const state = { count: 0 };
  const first = { state };
  const second = { state };
  second.state.count += 1;
  return first.state.count;
}

console.log("Shared reference result:", buggySharedState());
// Question: Why is the result 1?
// Both wrappers reference the same state object.

// ============================================================
// 71. OUTPUT PREDICTION CHALLENGES
// ============================================================
// Predict before running.

function predictionChallenges() {
  console.log("A:", typeof null);
  console.log("B:", [] == false);
  console.log("C:", [1, 2].map((n) => n * 2));

  const obj = { value: 1 };
  const copy = obj;
  copy.value = 2;
  console.log("D:", obj.value);
}

predictionChallenges();

// ============================================================
// 72. BEGINNER CHALLENGE SET
// ============================================================
// Solve without searching:
// 1. Print numbers 1..100.
// 2. Print only multiples of 3.
// 3. Sum even numbers in an array.
// 4. Count positive values.
// 5. Find the longest string.
// 6. Count words in a sentence.
// 7. Capitalize every word.
// 8. Remove falsy values.
// 9. Find duplicate values.
// 10. Merge two arrays without duplicates.
// 11. Check whether an array is sorted.
// 12. Rotate an array right by k.
// 13. Find the missing number from 1..n.
// 14. Find intersection of two arrays.
// 15. Flatten an array one level.
// 16. Convert Celsius to Fahrenheit.
// 17. Calculate compound interest.
// 18. Validate a password shape.
// 19. Build a simple calculator.
// 20. Build a menu-driven CLI concept.

// ============================================================
// 73. INTERMEDIATE CHALLENGE SET
// ============================================================
// 21. Longest substring without repeating characters.
// 22. Maximum subarray sum.
// 23. Product of array except self.
// 24. Merge overlapping intervals.
// 25. Top K frequent values.
// 26. Implement a stack with getMin().
// 27. Implement a queue with two stacks.
// 28. Detect linked-list cycle.
// 29. Find middle of linked list.
// 30. Merge two sorted linked lists.
// 31. Binary tree level-order traversal.
// 32. Tree maximum depth.
// 33. Lowest common ancestor in a BST.
// 34. Graph connected components.
// 35. Shortest path in an unweighted graph.
// 36. Implement a min heap.
// 37. Implement an LRU cache.
// 38. Implement a trie.
// 39. Implement debounce.
// 40. Implement throttle.

// ============================================================
// 74. ADVANCED CHALLENGE SET
// ============================================================
// 41. Implement Dijkstra's algorithm.
// 42. Implement Union-Find.
// 43. Topological sort with cycle detection.
// 44. 0/1 knapsack.
// 45. Coin change.
// 46. Word-break dynamic programming.
// 47. N-Queens backtracking.
// 48. Trie autocomplete.
// 49. Streaming line processor with async generators.
// 50. Bounded-concurrency promise pool.
// 51. Retry with exponential backoff and jitter.
// 52. Abortable async operation.
// 53. Event emitter with once/removeListener.
// 54. Observable-style subscription model.
// 55. Memoization with a robust key strategy.
// 56. Immutable nested update helper.
// 57. Result/Option utility types in JavaScript.
// 58. Dependency-injected repository/use-case architecture.
// 59. API request cache with invalidation.
// 60. Full-stack Notes feature with validation, authorization, repository, service,
//     error mapping, tests, and observability.

// ============================================================
// 75. MINI PROJECTS
// ============================================================
// Project 1: CLI calculator
// Project 2: Number guessing game
// Project 3: Quiz engine
// Project 4: Expense tracker logic
// Project 5: Todo engine
// Project 6: Inventory manager
// Project 7: Shopping cart engine
// Project 8: URL shortener simulation
// Project 9: In-memory notes API
// Project 10: Rate limiter
// Project 11: LRU cache
// Project 12: Job queue
// Project 13: Search autocomplete
// Project 14: Log analyzer
// Project 15: Notes backend architecture

// ============================================================
// 76. HOW TO REVIEW A SOLUTION
// ============================================================
// Check in this order:
// 1. Correctness
// 2. Edge cases
// 3. Readability
// 4. Complexity
// 5. Mutation/reference behavior
// 6. Error handling
// 7. Security boundaries
// 8. Testability
// 9. Maintainability
// 10. Whether a simpler solution exists

// ============================================================
// 77. PRACTICE SCORECARD
// ============================================================
// Give yourself 0/1/2 for each:
//
// Problem understanding: 0-2
// Algorithm selection:    0-2
// Implementation:         0-2
// Edge cases:             0-2
// Debugging:              0-2
// Complexity analysis:    0-2
// Explanation:            0-2
//
// 12+ = strong understanding
// 8-11 = needs more practice
// <8 = revisit the concept and solve a smaller problem
//
// The score is a learning tool, not an objective measure of programming skill.

// ============================================================
// 78. TEACH-BACK
// ============================================================
// For every solved problem, explain:
// - What was the input?
// - What was the output?
// - What invariant did you maintain?
// - Why does the algorithm work?
// - What are the edge cases?
// - What is the time complexity?
// - What is the space complexity?
// - How would you test it?
// - What would break if the constraints changed?

// ============================================================
// 79. INTERVIEW PRACTICE
// ============================================================
// Never answer only with code.
//
// Strong interview flow:
// 1. Restate problem.
// 2. Clarify assumptions.
// 3. Give brute-force idea.
// 4. Analyze complexity.
// 5. Improve algorithm.
// 6. Explain chosen approach.
// 7. Code.
// 8. Test normal case.
// 9. Test edge cases.
// 10. State final complexity.

// ============================================================
// 80. FINAL MENTAL MODEL
// ============================================================
// Practice is not "solve 500 questions and memorize patterns."
//
// The real goal is:
//
// Problem -> Model -> Algorithm -> Code -> Test -> Debug -> Analyze -> Explain
//
// Repeat this loop until you can solve unfamiliar problems without depending
// on tutorials.

console.log("=== Practice chapter loaded ===");
