//* ============================================================
//* JAVASCRIPT DSA — PRACTICAL COMPANION
//* ============================================================

//* DSA = Data Structures + Algorithms.
//* Data structure: a way to organize/store data so operations can be performed.
//* Algorithm: a finite, well-defined procedure for solving a problem.
//*
//* Goal: do not memorize solutions. Learn to reason about:
//* input -> constraints -> data structure -> algorithm -> correctness -> complexity.


//* ------------------------------------------------------------
//* 1. BIG-O NOTATION
//* ------------------------------------------------------------

//* Big-O describes how resource usage grows as input size n grows.
//* It focuses on growth, not exact milliseconds.

//* Common complexities:
//* O(1)       constant
//* O(log n)   logarithmic
//* O(n)       linear
//* O(n log n) common efficient sorting bound
//* O(n²)      quadratic
//* O(2^n)     exponential
//* O(n!)      factorial

function getFirst(array) {
  return array[0]; // O(1)
}

function findValue(array, target) {
  for (const value of array) {
    if (value === target) return true;
  }
  return false; // O(n)
}


//* ------------------------------------------------------------
//* 2. SPACE COMPLEXITY
//* ------------------------------------------------------------

function copyArray(array) {
  return [...array];
}

//* The result requires O(n) additional storage.


//* ------------------------------------------------------------
//* 3. ARRAY TRAVERSAL
//* ------------------------------------------------------------

function printArray(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
}

printArray([10, 20, 30]);


//* ------------------------------------------------------------
//* 4. LINEAR SEARCH
//* ------------------------------------------------------------

function linearSearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) return i;
  }

  return -1;
}

console.log(linearSearch([4, 8, 15, 16], 15)); // 2

//* Time: O(n), Space: O(1).


//* ------------------------------------------------------------
//* 5. BINARY SEARCH
//* ------------------------------------------------------------

function binarySearch(array, target) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (array[middle] === target) return middle;

    if (array[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}

console.log(binarySearch([1, 3, 5, 7, 9, 11], 7)); // 3

//* Requirement: sorted input.
//* Time: O(log n), Space: O(1).


//* ------------------------------------------------------------
//* 6. RECURSION
//* ------------------------------------------------------------

function countdown(n) {
  if (n <= 0) return;
  console.log(n);
  countdown(n - 1);
}

countdown(3);

//* A recursive solution needs a base case and progress toward that case.


//* ------------------------------------------------------------
//* 7. FACTORIAL
//* ------------------------------------------------------------

function factorial(n) {
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error("n must be a non-negative integer");
  }

  if (n === 0) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120


//* ------------------------------------------------------------
//* 8. FIBONACCI — NAIVE RECURSION
//* ------------------------------------------------------------

function fibonacciRecursive(n) {
  if (n <= 1) return n;
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

console.log(fibonacciRecursive(8)); // 21

//* This repeats many subproblems and has exponential growth.


//* ------------------------------------------------------------
//* 9. FIBONACCI — ITERATIVE
//* ------------------------------------------------------------

function fibonacciIterative(n) {
  if (n <= 1) return n;

  let previous = 0;
  let current = 1;

  for (let i = 2; i <= n; i++) {
    [previous, current] = [current, previous + current];
  }

  return current;
}

console.log(fibonacciIterative(10)); // 55

//* Time: O(n), Space: O(1).


//* ------------------------------------------------------------
//* 10. MEMOIZATION
//* ------------------------------------------------------------

function fibonacciMemoized(n, memo = new Map()) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);

  const value = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
  memo.set(n, value);
  return value;
}

console.log(fibonacciMemoized(20));

//* Memoization stores previous results to avoid repeated computation.


//* ------------------------------------------------------------
//* 11. TWO POINTERS
//* ------------------------------------------------------------

function hasPairWithSum(sortedArray, target) {
  let left = 0;
  let right = sortedArray.length - 1;

  while (left < right) {
    const sum = sortedArray[left] + sortedArray[right];

    if (sum === target) return true;
    if (sum < target) left++;
    else right--;
  }

  return false;
}

console.log(hasPairWithSum([1, 2, 4, 6, 8, 9], 10)); // true

//* Requirement: sorted input for this exact two-pointer strategy.
//* Time: O(n), Space: O(1).


//* ------------------------------------------------------------
//* 12. SLIDING WINDOW
//* ------------------------------------------------------------

function maxSumSubarray(array, windowSize) {
  if (windowSize <= 0 || windowSize > array.length) return null;

  let windowSum = 0;
  for (let i = 0; i < windowSize; i++) {
    windowSum += array[i];
  }

  let maximum = windowSum;

  for (let right = windowSize; right < array.length; right++) {
    windowSum += array[right];
    windowSum -= array[right - windowSize];
    maximum = Math.max(maximum, windowSum);
  }

  return maximum;
}

console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // 9

//* Time: O(n), rather than recalculating every window in O(nk).


//* ------------------------------------------------------------
//* 13. PREFIX SUM
//* ------------------------------------------------------------

function buildPrefixSum(array) {
  const prefix = new Array(array.length + 1).fill(0);

  for (let i = 0; i < array.length; i++) {
    prefix[i + 1] = prefix[i] + array[i];
  }

  return prefix;
}

function rangeSum(prefix, left, right) {
  return prefix[right + 1] - prefix[left];
}

const prefix = buildPrefixSum([2, 4, 6, 8]);
console.log(rangeSum(prefix, 1, 3)); // 18

//* Preprocessing: O(n). Each range query: O(1).


//* ------------------------------------------------------------
//* 14. FREQUENCY MAP
//* ------------------------------------------------------------

function frequencyCount(array) {
  const frequency = new Map();

  for (const value of array) {
    frequency.set(value, (frequency.get(value) ?? 0) + 1);
  }

  return frequency;
}

console.log([...frequencyCount(["a", "b", "a", "c", "a"])])


//* ------------------------------------------------------------
//* 15. TWO SUM
//* ------------------------------------------------------------

function twoSum(numbers, target) {
  const seen = new Map();

  for (let i = 0; i < numbers.length; i++) {
    const needed = target - numbers[i];

    if (seen.has(needed)) {
      return [seen.get(needed), i];
    }

    seen.set(numbers[i], i);
  }

  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]

//* Expected average time: O(n), extra space: O(n).


//* ------------------------------------------------------------
//* 16. VALID ANAGRAM
//* ------------------------------------------------------------

function isAnagram(first, second) {
  if (first.length !== second.length) return false;

  const counts = new Map();

  for (const char of first) {
    counts.set(char, (counts.get(char) ?? 0) + 1);
  }

  for (const char of second) {
    const count = counts.get(char) ?? 0;
    if (count === 0) return false;
    counts.set(char, count - 1);
  }

  return true;
}

console.log(isAnagram("listen", "silent")); // true


//* ------------------------------------------------------------
//* 17. ARRAY ROTATION
//* ------------------------------------------------------------

function rotateRight(array, k) {
  if (array.length === 0) return [];

  const shift = ((k % array.length) + array.length) % array.length;
  return array.slice(-shift).concat(array.slice(0, -shift));
}

console.log(rotateRight([1, 2, 3, 4, 5], 2)); // [4, 5, 1, 2, 3]

//* This version uses O(n) additional result space.


//* ------------------------------------------------------------
//* 18. REVERSE ARRAY IN PLACE
//* ------------------------------------------------------------

function reverseInPlace(array) {
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    [array[left], array[right]] = [array[right], array[left]];
    left++;
    right--;
  }

  return array;
}

console.log(reverseInPlace([1, 2, 3, 4]));

//* Time: O(n), extra space: O(1).


//* ------------------------------------------------------------
//* 19. MERGE SORT
//* ------------------------------------------------------------

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

function mergeSort(array) {
  if (array.length <= 1) return array;

  const middle = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, middle));
  const right = mergeSort(array.slice(middle));

  return merge(left, right);
}

console.log(mergeSort([5, 2, 8, 1, 3]));

//* Typical time: O(n log n). This implementation uses additional space.


//* ------------------------------------------------------------
//* 20. QUICK SORT
//* ------------------------------------------------------------

function quickSort(array) {
  if (array.length <= 1) return array;

  const pivot = array[array.length - 1];
  const smaller = [];
  const equal = [];
  const greater = [];

  for (const value of array) {
    if (value < pivot) smaller.push(value);
    else if (value > pivot) greater.push(value);
    else equal.push(value);
  }

  return [...quickSort(smaller), ...equal, ...quickSort(greater)];
}

console.log(quickSort([5, 2, 8, 1, 3, 3]));

//* This educational implementation is not in-place. Worst-case time can be O(n²)
//* depending on pivot behavior; average behavior is commonly O(n log n).


//* ------------------------------------------------------------
//* 21. STACK — LIFO
//* ------------------------------------------------------------

class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

const stack = new Stack();
stack.push("A");
stack.push("B");
console.log(stack.pop()); // B

//* Stack = Last In, First Out.
//* Use cases: undo, browser-history-style stacks, parsing, DFS.


//* ------------------------------------------------------------
//* 22. QUEUE — FIFO
//* ------------------------------------------------------------

class Queue {
  constructor() {
    this.items = [];
    this.front = 0;
  }

  enqueue(value) {
    this.items.push(value);
  }

  dequeue() {
    if (this.front >= this.items.length) return undefined;
    const value = this.items[this.front];
    this.front++;
    return value;
  }

  peek() {
    return this.items[this.front];
  }

  isEmpty() {
    return this.front >= this.items.length;
  }
}

const queue = new Queue();
queue.enqueue("A");
queue.enqueue("B");
console.log(queue.dequeue()); // A

//* Queue = First In, First Out.
//* Avoid Array.shift() repeatedly for performance-sensitive large queues because it may require moving elements.


//* ------------------------------------------------------------
//* 23. LINKED LIST NODE
//* ------------------------------------------------------------

class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

const node3 = new ListNode(30);
const node2 = new ListNode(20, node3);
const node1 = new ListNode(10, node2);

console.log(node1.next.next.value); // 30


//* ------------------------------------------------------------
//* 24. SINGLY LINKED LIST
//* ------------------------------------------------------------

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  prepend(value) {
    this.head = new ListNode(value, this.head);
    this.size++;
  }

  append(value) {
    const node = new ListNode(value);

    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) current = current.next;
      current.next = node;
    }

    this.size++;
  }

  find(value) {
    let current = this.head;

    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }

    return null;
  }

  toArray() {
    const values = [];
    let current = this.head;

    while (current) {
      values.push(current.value);
      current = current.next;
    }

    return values;
  }
}

const list = new SinglyLinkedList();
list.append(10);
list.append(20);
list.prepend(5);
console.log(list.toArray());


//* ------------------------------------------------------------
//* 25. DELETE FROM LINKED LIST
//* ------------------------------------------------------------

function deleteFirstValue(head, target) {
  if (!head) return null;

  if (head.value === target) return head.next;

  let current = head;

  while (current.next && current.next.value !== target) {
    current = current.next;
  }

  if (current.next) current.next = current.next.next;
  return head;
}

let linkedHead = new ListNode(1, new ListNode(2, new ListNode(3)));
linkedHead = deleteFirstValue(linkedHead, 2);


//* ------------------------------------------------------------
//* 26. DOUBLY LINKED LIST NODE
//* ------------------------------------------------------------

class DoublyNode {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

//* Doubly linked nodes maintain both previous and next references.
//* This supports movement in both directions but uses more memory.


//* ------------------------------------------------------------
//* 27. HASH TABLE MENTAL MODEL
//* ------------------------------------------------------------

const usersById = new Map();
usersById.set(101, { name: "Ravi" });

console.log(usersById.get(101));

//* Hash tables map keys to values and provide expected fast lookup under typical conditions.


//* ------------------------------------------------------------
//* 28. SET FOR DUPLICATE REMOVAL
//* ------------------------------------------------------------

function uniqueValues(array) {
  return [...new Set(array)];
}

console.log(uniqueValues([1, 1, 2, 3, 3]));


//* ------------------------------------------------------------
//* 29. HASH SET MEMBERSHIP
//* ------------------------------------------------------------

function containsAll(values, required) {
  const set = new Set(values);
  return required.every((value) => set.has(value));
}

console.log(containsAll([1, 2, 3, 4], [2, 4]));


//* ------------------------------------------------------------
//* 30. VALID PARENTHESES — STACK
//* ------------------------------------------------------------

function isValidParentheses(input) {
  const stack = [];
  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (const char of input) {
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else {
      if (stack.pop() !== pairs[char]) return false;
    }
  }

  return stack.length === 0;
}

console.log(isValidParentheses("{[()]}");


//* ------------------------------------------------------------
//* 31. MIN STACK CONCEPT
//* ------------------------------------------------------------

class MinStack {
  constructor() {
    this.values = [];
    this.minimums = [];
  }

  push(value) {
    this.values.push(value);

    const currentMinimum = this.minimums.length === 0
      ? value
      : Math.min(value, this.minimums.at(-1));

    this.minimums.push(currentMinimum);
  }

  pop() {
    this.minimums.pop();
    return this.values.pop();
  }

  min() {
    return this.minimums.at(-1);
  }
}


//* ------------------------------------------------------------
//* 32. BINARY TREE NODE
//* ------------------------------------------------------------

class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const tree = new TreeNode(
  10,
  new TreeNode(5),
  new TreeNode(15),
);

console.log(tree.left.value); // 5


//* ------------------------------------------------------------
//* 33. DFS — PREORDER
//* ------------------------------------------------------------

function preorder(root, result = []) {
  if (!root) return result;

  result.push(root.value);
  preorder(root.left, result);
  preorder(root.right, result);

  return result;
}

console.log(preorder(tree)); // [10, 5, 15]

//* Depth-first traversal follows a path before moving to another branch.


//* ------------------------------------------------------------
//* 34. INORDER
//* ------------------------------------------------------------

function inorder(root, result = []) {
  if (!root) return result;

  inorder(root.left, result);
  result.push(root.value);
  inorder(root.right, result);

  return result;
}

console.log(inorder(tree));

//* Inorder traversal of a Binary Search Tree produces sorted values.


//* ------------------------------------------------------------
//* 35. POSTORDER
//* ------------------------------------------------------------

function postorder(root, result = []) {
  if (!root) return result;

  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.value);

  return result;
}

console.log(postorder(tree));


//* ------------------------------------------------------------
//* 36. BFS — LEVEL ORDER
//* ------------------------------------------------------------

function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];
  let front = 0;

  while (front < queue.length) {
    const node = queue[front++];
    result.push(node.value);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return result;
}

console.log(levelOrder(tree));

//* Breadth-first search explores level by level.


//* ------------------------------------------------------------
//* 37. BINARY SEARCH TREE SEARCH
//* ------------------------------------------------------------

function bstSearch(root, target) {
  let current = root;

  while (current) {
    if (current.value === target) return current;
    current = target < current.value ? current.left : current.right;
  }

  return null;
}

console.log(bstSearch(tree, 15)?.value);

//* The O(log n) claim assumes a suitably balanced BST. A badly skewed BST can degrade to O(n).


//* ------------------------------------------------------------
//* 38. BST INSERT
//* ------------------------------------------------------------

function bstInsert(root, value) {
  if (!root) return new TreeNode(value);

  if (value < root.value) root.left = bstInsert(root.left, value);
  else if (value > root.value) root.right = bstInsert(root.right, value);

  return root;
}

let bst = null;
for (const value of [8, 3, 10, 1, 6]) {
  bst = bstInsert(bst, value);
}

console.log(inorder(bst));


//* ------------------------------------------------------------
//* 39. HEAP MENTAL MODEL
//* ------------------------------------------------------------

//* A binary heap is a complete-tree-based structure commonly used for priority queues.
//* Min-heap: parent <= children.
//* Max-heap: parent >= children.


//* ------------------------------------------------------------
//* 40. MIN HEAP IMPLEMENTATION
//* ------------------------------------------------------------

class MinHeap {
  constructor() {
    this.heap = [];
  }

  parent(index) {
    return Math.floor((index - 1) / 2);
  }

  left(index) {
    return index * 2 + 1;
  }

  right(index) {
    return index * 2 + 2;
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      const parent = this.parent(index);
      if (this.heap[parent] <= this.heap[index]) break;

      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
      index = parent;
    }
  }

  peek() {
    return this.heap[0];
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const minimum = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return minimum;
  }

  bubbleDown() {
    let index = 0;

    while (true) {
      const left = this.left(index);
      const right = this.right(index);
      let smallest = index;

      if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }

      if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}

const minHeap = new MinHeap();
[5, 2, 8, 1].forEach((value) => minHeap.push(value));
console.log(minHeap.pop()); // 1


//* ------------------------------------------------------------
//* 41. GRAPH — ADJACENCY LIST
//* ------------------------------------------------------------

const graph = new Map([
  ["A", ["B", "C"]],
  ["B", ["A", "D"]],
  ["C", ["A", "D"]],
  ["D", ["B", "C"]],
]);

console.log(graph.get("A"));

//* Adjacency lists are often space-efficient for sparse graphs.


//* ------------------------------------------------------------
//* 42. GRAPH DFS
//* ------------------------------------------------------------

function graphDFS(graph, start) {
  const visited = new Set();
  const result = [];

  function visit(node) {
    if (visited.has(node)) return;

    visited.add(node);
    result.push(node);

    for (const neighbor of graph.get(node) ?? []) {
      visit(neighbor);
    }
  }

  visit(start);
  return result;
}

console.log(graphDFS(graph, "A"));


//* ------------------------------------------------------------
//* 43. GRAPH BFS
//* ------------------------------------------------------------

function graphBFS(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const result = [];
  let front = 0;

  while (front < queue.length) {
    const node = queue[front++];
    result.push(node);

    for (const neighbor of graph.get(node) ?? []) {
      if (visited.has(neighbor)) continue;
      visited.add(neighbor);
      queue.push(neighbor);
    }
  }

  return result;
}

console.log(graphBFS(graph, "A"));


//* ------------------------------------------------------------
//* 44. SHORTEST PATH IN UNWEIGHTED GRAPH
//* ------------------------------------------------------------

function shortestPath(graph, start, target) {
  const queue = [start];
  let front = 0;
  const parent = new Map([[start, null]]);

  while (front < queue.length) {
    const node = queue[front++];

    if (node === target) break;

    for (const neighbor of graph.get(node) ?? []) {
      if (parent.has(neighbor)) continue;
      parent.set(neighbor, node);
      queue.push(neighbor);
    }
  }

  if (!parent.has(target)) return [];

  const path = [];
  let current = target;

  while (current !== null) {
    path.push(current);
    current = parent.get(current);
  }

  return path.reverse();
}

console.log(shortestPath(graph, "A", "D"));

//* BFS finds shortest edge-count paths in unweighted graphs.


//* ------------------------------------------------------------
//* 45. DYNAMIC PROGRAMMING — CLIMBING STAIRS
//* ------------------------------------------------------------

function climbStairs(n) {
  if (n <= 1) return 1;

  let oneStepBefore = 1;
  let twoStepsBefore = 1;

  for (let step = 2; step <= n; step++) {
    const current = oneStepBefore + twoStepsBefore;
    twoStepsBefore = oneStepBefore;
    oneStepBefore = current;
  }

  return oneStepBefore;
}

console.log(climbStairs(5)); // 8

//* DP often means identifying overlapping subproblems and storing/reusing results.


//* ------------------------------------------------------------
//* 46. 0/1 KNAPSACK — TABULATION
//* ------------------------------------------------------------

function knapsack(weights, values, capacity) {
  const dp = Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    for (let current = capacity; current >= weights[i]; current--) {
      dp[current] = Math.max(
        dp[current],
        values[i] + dp[current - weights[i]],
      );
    }
  }

  return dp[capacity];
}

console.log(knapsack([2, 3, 4], [4, 5, 7], 5));


//* ------------------------------------------------------------
//* 47. GREEDY ALGORITHM
//* ------------------------------------------------------------

function maximumNonOverlappingActivities(activities) {
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
  maximumNonOverlappingActivities([
    { start: 1, end: 3 },
    { start: 2, end: 5 },
    { start: 4, end: 7 },
    { start: 6, end: 8 },
  ]),
);

//* Greedy algorithms make locally optimal choices. They require proof that the strategy is valid
//* for the particular problem; greedy is not automatically correct.


//* ------------------------------------------------------------
//* 48. BACKTRACKING
//* ------------------------------------------------------------

function subsets(array) {
  const result = [];
  const current = [];

  function backtrack(index) {
    if (index === array.length) {
      result.push([...current]);
      return;
    }

    backtrack(index + 1);

    current.push(array[index]);
    backtrack(index + 1);
    current.pop();
  }

  backtrack(0);
  return result;
}

console.log(subsets([1, 2]));

//* Backtracking explores choices, and undoes a choice before exploring another branch.


//* ------------------------------------------------------------
//* 49. PERMUTATIONS
//* ------------------------------------------------------------

function permutations(array) {
  const result = [];

  function backtrack(start) {
    if (start === array.length) {
      result.push([...array]);
      return;
    }

    for (let i = start; i < array.length; i++) {
      [array[start], array[i]] = [array[i], array[start]];
      backtrack(start + 1);
      [array[start], array[i]] = [array[i], array[start]];
    }
  }

  backtrack(0);
  return result;
}

console.log(permutations([1, 2, 3]).length); // 6


//* ------------------------------------------------------------
//* 50. TRIE NODE
//* ------------------------------------------------------------

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;

    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }

    node.isWord = true;
  }

  has(word) {
    let node = this.root;

    for (const char of word) {
      node = node.children.get(char);
      if (!node) return false;
    }

    return node.isWord;
  }
}

const trie = new Trie();
trie.insert("javascript");
console.log(trie.has("javascript")); // true
console.log(trie.has("java")); // false

//* Trie operations are commonly O(L), where L is the word length, assuming Map operations are expected O(1).


//* ------------------------------------------------------------
//* 51. SORTING WITH JAVASCRIPT
//* ------------------------------------------------------------

const values = [10, 2, 5, 1];
console.log([...values].sort((a, b) => a - b));

//* Array.sort() mutates the array and needs a comparator for numeric ascending order.


//* ------------------------------------------------------------
//* 52. STABLE SORT CONCEPT
//* ------------------------------------------------------------

const students = [
  { name: "A", score: 90 },
  { name: "B", score: 80 },
  { name: "C", score: 90 },
];

console.log([...students].sort((a, b) => a.score - b.score));

//* Modern ECMAScript specifies stable Array.prototype.sort: equal comparison results retain relative order.


//* ------------------------------------------------------------
//* 53. CUSTOM COMPARATOR
//* ------------------------------------------------------------

function sortByScoreDescending(users) {
  return [...users].sort((a, b) => b.score - a.score);
}

console.log(sortByScoreDescending(students));


//* ------------------------------------------------------------
//* 54. INTERVAL MERGING
//* ------------------------------------------------------------

function mergeIntervals(intervals) {
  if (intervals.length <= 1) return [...intervals];

  const sorted = intervals
    .map(([start, end]) => [start, end])
    .sort((a, b) => a[0] - b[0]);

  const merged = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    const last = merged.at(-1);

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }

  return merged;
}

console.log(mergeIntervals([[1, 3], [2, 6], [8, 10], [9, 12]]));


//* ------------------------------------------------------------
//* 55. MONOTONIC STACK
//* ------------------------------------------------------------

function nextGreaterElements(array) {
  const result = new Array(array.length).fill(-1);
  const stack = [];

  for (let i = 0; i < array.length; i++) {
    while (stack.length && array[i] > array[stack.at(-1)]) {
      result[stack.pop()] = array[i];
    }
    stack.push(i);
  }

  return result;
}

console.log(nextGreaterElements([2, 1, 2, 4, 3]));

//* Monotonic stacks solve many next-greater/next-smaller style problems in O(n).


//* ------------------------------------------------------------
//* 56. BIT MANIPULATION
//* ------------------------------------------------------------

function isEven(number) {
  return (number & 1) === 0;
}

console.log(isEven(8)); // true

//* Bitwise operators operate on 32-bit signed integer representations for Number operands.
//* Be careful with values outside that domain and with BigInt, which uses separate bitwise semantics.


//* ------------------------------------------------------------
//* 57. XOR UNIQUE VALUE
//* ------------------------------------------------------------

function findUnique(numbers) {
  let result = 0;

  for (const number of numbers) {
    result ^= number;
  }

  return result;
}

console.log(findUnique([4, 1, 2, 1, 2])); // 4

//* Works when exactly one value occurs once and every other integer occurs exactly twice.


//* ------------------------------------------------------------
//* 58. GCD — EUCLIDEAN ALGORITHM
//* ------------------------------------------------------------

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b !== 0) {
    [a, b] = [b, a % b];
  }

  return a;
}

console.log(gcd(48, 18)); // 6


//* ------------------------------------------------------------
//* 59. LCM
//* ------------------------------------------------------------

function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

console.log(lcm(12, 18)); // 36


//* ------------------------------------------------------------
//* 60. PRIME CHECK
//* ------------------------------------------------------------

function isPrime(n) {
  if (n < 2 || !Number.isInteger(n)) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let divisor = 3; divisor * divisor <= n; divisor += 2) {
    if (n % divisor === 0) return false;
  }

  return true;
}

console.log(isPrime(29)); // true

//* Only divisors up to sqrt(n) need to be checked.


//* ------------------------------------------------------------
//* 61. SIEVE OF ERATOSTHENES
//* ------------------------------------------------------------

function primesUpTo(limit) {
  if (limit < 2) return [];

  const prime = new Array(limit + 1).fill(true);
  prime[0] = prime[1] = false;

  for (let p = 2; p * p <= limit; p++) {
    if (!prime[p]) continue;

    for (let multiple = p * p; multiple <= limit; multiple += p) {
      prime[multiple] = false;
    }
  }

  return prime
    .map((isPrimeValue, number) => isPrimeValue ? number : null)
    .filter((number) => number !== null);
}

console.log(primesUpTo(20));


//* ------------------------------------------------------------
//* 62. PREFIX / SUFFIX IDEA
//* ------------------------------------------------------------

function productExceptSelf(numbers) {
  const result = new Array(numbers.length).fill(1);

  let prefixProduct = 1;
  for (let i = 0; i < numbers.length; i++) {
    result[i] = prefixProduct;
    prefixProduct *= numbers[i];
  }

  let suffixProduct = 1;
  for (let i = numbers.length - 1; i >= 0; i--) {
    result[i] *= suffixProduct;
    suffixProduct *= numbers[i];
  }

  return result;
}

console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]


//* ------------------------------------------------------------
//* 63. KADANE'S ALGORITHM
//* ------------------------------------------------------------

function maxSubarraySum(numbers) {
  if (numbers.length === 0) return null;

  let current = numbers[0];
  let best = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    current = Math.max(numbers[i], current + numbers[i]);
    best = Math.max(best, current);
  }

  return best;
}

console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6


//* ------------------------------------------------------------
//* 64. DUTCH NATIONAL FLAG
//* ------------------------------------------------------------

function sortThreeValues(array) {
  let low = 0;
  let current = 0;
  let high = array.length - 1;

  while (current <= high) {
    if (array[current] === 0) {
      [array[low], array[current]] = [array[current], array[low]];
      low++;
      current++;
    } else if (array[current] === 2) {
      [array[current], array[high]] = [array[high], array[current]];
      high--;
    } else {
      current++;
    }
  }

  return array;
}

console.log(sortThreeValues([2, 0, 2, 1, 1, 0]));


//* ------------------------------------------------------------
//* 65. KTH LARGEST — MIN HEAP IDEA
//* ------------------------------------------------------------

function kthLargest(numbers, k) {
  if (k < 1 || k > numbers.length) return undefined;

  //* Educational shortcut: sorting is O(n log n).
  return [...numbers].sort((a, b) => b - a)[k - 1];
}

console.log(kthLargest([3, 2, 1, 5, 6, 4], 2)); // 5

//* A heap or selection algorithm can improve performance for some large-input variants.


//* ------------------------------------------------------------
//* 66. TOPOLOGICAL SORT — KAHN'S ALGORITHM
//* ------------------------------------------------------------

function topologicalSort(graph) {
  const indegree = new Map();

  for (const node of graph.keys()) indegree.set(node, 0);

  for (const neighbors of graph.values()) {
    for (const neighbor of neighbors) {
      indegree.set(neighbor, (indegree.get(neighbor) ?? 0) + 1);
    }
  }

  const queue = [];
  let front = 0;

  for (const [node, degree] of indegree) {
    if (degree === 0) queue.push(node);
  }

  const result = [];

  while (front < queue.length) {
    const node = queue[front++];
    result.push(node);

    for (const neighbor of graph.get(node) ?? []) {
      indegree.set(neighbor, indegree.get(neighbor) - 1);
      if (indegree.get(neighbor) === 0) queue.push(neighbor);
    }
  }

  return result.length === indegree.size ? result : [];
}

const dependencyGraph = new Map([
  ["HTML", ["CSS"]],
  ["CSS", ["JS"]],
  ["JS", []],
]);

console.log(topologicalSort(dependencyGraph));

//* A DAG can have a topological ordering. An empty result here signals a cycle for this implementation.


//* ------------------------------------------------------------
//* 67. DIJKSTRA'S ALGORITHM — CONCEPTUAL SIMPLE VERSION
//* ------------------------------------------------------------

function dijkstra(graph, start) {
  const distances = new Map();
  const visited = new Set();

  for (const node of graph.keys()) distances.set(node, Infinity);
  distances.set(start, 0);

  while (visited.size < distances.size) {
    let current = null;
    let bestDistance = Infinity;

    for (const [node, distance] of distances) {
      if (!visited.has(node) && distance < bestDistance) {
        current = node;
        bestDistance = distance;
      }
    }

    if (current === null) break;
    visited.add(current);

    for (const { to, weight } of graph.get(current) ?? []) {
      const candidate = bestDistance + weight;
      if (candidate < distances.get(to)) {
        distances.set(to, candidate);
      }
    }
  }

  return distances;
}

const weightedGraph = new Map([
  ["A", [{ to: "B", weight: 4 }, { to: "C", weight: 1 }]],
  ["B", [{ to: "D", weight: 1 }]],
  ["C", [{ to: "B", weight: 2 }, { to: "D", weight: 5 }]],
  ["D", []],
]);

console.log([...dijkstra(weightedGraph, "A")]);

//* Dijkstra requires non-negative edge weights. A priority queue gives the usual efficient implementation.


//* ------------------------------------------------------------
//* 68. UNION-FIND / DISJOINT SET
//* ------------------------------------------------------------

class DisjointSet {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, index) => index);
    this.rank = new Array(size).fill(0);
  }

  find(value) {
    if (this.parent[value] !== value) {
      this.parent[value] = this.find(this.parent[value]);
    }
    return this.parent[value];
  }

  union(a, b) {
    let rootA = this.find(a);
    let rootB = this.find(b);

    if (rootA === rootB) return false;

    if (this.rank[rootA] < this.rank[rootB]) [rootA, rootB] = [rootB, rootA];

    this.parent[rootB] = rootA;
    if (this.rank[rootA] === this.rank[rootB]) this.rank[rootA]++;
    return true;
  }
}

const dsu = new DisjointSet(5);
dsu.union(0, 1);
dsu.union(1, 2);
console.log(dsu.find(0) === dsu.find(2)); // true

//* Path compression + union by rank/size gives near-constant amortized operations.


//* ------------------------------------------------------------
//* 69. HASH COLLISION CONCEPT
//* ------------------------------------------------------------

//* Different keys can map to the same hash bucket. A hash-table implementation needs a
//* collision strategy such as chaining or probing. JavaScript Map hides these implementation details.


//* ------------------------------------------------------------
//* 70. AMORTIZED ANALYSIS
//* ------------------------------------------------------------

//* An operation can occasionally be expensive while the average cost over a sequence remains low.
//* Dynamic-array growth is a classic example: individual resize operations can be O(n), while
//* append is commonly analyzed as amortized O(1).


//* ------------------------------------------------------------
//* 71. DATA STRUCTURE CHOICE
//* ------------------------------------------------------------

//* Array  -> ordered indexed data, iteration
//* Set    -> unique values, membership
//* Map    -> key/value mapping
//* Stack  -> LIFO
//* Queue  -> FIFO
//* Linked list -> frequent local insertion/removal when node references are available
//* Heap   -> priority queue
//* Tree   -> hierarchical/ordered data
//* Graph  -> relationships/networks
//* Trie   -> prefix-based strings


//* ------------------------------------------------------------
//* 72. ALGORITHM CHOICE CHECKLIST
//* ------------------------------------------------------------

//* Ask:
//* 1. Is the input sorted?
//* 2. Do I need fast lookup?
//* 3. Do I need ordering?
//* 4. Are duplicates important?
//* 5. Is the problem local or global?
//* 6. Are there overlapping subproblems?
//* 7. Can I use two pointers?
//* 8. Can I use a sliding window?
//* 9. Is this a graph/tree?
//* 10. What are the input constraints?


//* ------------------------------------------------------------
//* 73. CONSTRAINTS DRIVE THE SOLUTION
//* ------------------------------------------------------------

//* n <= 20 might allow exponential/backtracking solutions.
//* n <= 10^3 may permit O(n²) in some settings.
//* n <= 10^5 usually pushes you toward O(n log n) or O(n).
//*
//* These are heuristics, not universal laws. Runtime limits and operation costs matter too.


//* ------------------------------------------------------------
//* 74. COMMON MISTAKE — WRONG BINARY SEARCH BOUNDARY
//* ------------------------------------------------------------

function correctBinarySearch(array, target) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const middle = left + Math.floor((right - left) / 2);

    if (array[middle] === target) return middle;
    if (array[middle] < target) left = middle + 1;
    else right = middle - 1;
  }

  return -1;
}


//* ------------------------------------------------------------
//* 75. COMMON MISTAKE — MUTATING INPUT
//* ------------------------------------------------------------

function sortedCopy(numbers) {
  return [...numbers].sort((a, b) => a - b);
}

const originalNumbers = [3, 1, 2];
const sortedNumbers = sortedCopy(originalNumbers);
console.log(originalNumbers); // [3, 1, 2]
console.log(sortedNumbers); // [1, 2, 3]


//* ------------------------------------------------------------
//* 76. COMMON MISTAKE — OFF-BY-ONE
//* ------------------------------------------------------------

function lastIndex(array) {
  return array.length - 1;
}

console.log(lastIndex(["a", "b", "c"])); // 2


//* ------------------------------------------------------------
//* 77. COMMON MISTAKE — RECURSION WITHOUT BASE CASE
//* ------------------------------------------------------------

//* Bad idea:
//* function broken(n) { return broken(n - 1); }
//*
//* It never reaches a stopping condition and eventually causes stack overflow.


//* ------------------------------------------------------------
//* 78. COMMON MISTAKE — WRONG DATA STRUCTURE
//* ------------------------------------------------------------

//* If you repeatedly ask "does this value exist?", a Set can be more appropriate than
//* scanning an array every time. But choose based on actual semantics and workload.


//* ------------------------------------------------------------
//* 79. COMMON MISTAKE — IGNORING INPUT CONSTRAINTS
//* ------------------------------------------------------------

//* An O(n²) algorithm may be perfectly reasonable for n=100 and completely inappropriate for n=1,000,000.


//* ------------------------------------------------------------
//* 80. COMMON MISTAKE — ASSUMING HASH LOOKUP IS ALWAYS O(1)
//* ------------------------------------------------------------

//* Hash-table lookup is commonly described as expected O(1), but worst-case behavior and
//* implementation details differ. Complexity claims should state their assumptions.


//* ------------------------------------------------------------
//* 81. OUTPUT PREDICTION
//* ------------------------------------------------------------

console.log(binarySearch([2, 4, 6, 8, 10], 8));
//* Answer: 3


//* ------------------------------------------------------------
//* 82. OUTPUT PREDICTION — STACK
//* ------------------------------------------------------------

const outputStack = [];
outputStack.push(1);
outputStack.push(2);
outputStack.pop();
console.log(outputStack);
//* Answer: [1]


//* ------------------------------------------------------------
//* 83. OUTPUT PREDICTION — QUEUE
//* ------------------------------------------------------------

const outputQueue = ["A", "B", "C"];
let queueIndex = 0;
console.log(outputQueue[queueIndex++]);
console.log(outputQueue[queueIndex++]);
//* Answer: A, B


//* ------------------------------------------------------------
//* 84. OUTPUT PREDICTION — TREE
//* ------------------------------------------------------------

const outputTree = new TreeNode(
  2,
  new TreeNode(1),
  new TreeNode(3),
);

console.log(inorder(outputTree));
//* Answer: [1, 2, 3]


//* ------------------------------------------------------------
//* 85. MINI PROJECT — URL DEDUPLICATOR
//* ------------------------------------------------------------

function deduplicateUrls(urls) {
  return [...new Set(urls)];
}

console.log(deduplicateUrls([
  "/home",
  "/about",
  "/home",
]));


//* ------------------------------------------------------------
//* 86. MINI PROJECT — TASK PRIORITY QUEUE
//* ------------------------------------------------------------

class TaskPriorityQueue {
  constructor() {
    this.heap = new MinHeap();
  }

  add(priority, task) {
    this.heap.push({ priority, task });
  }

  next() {
    return this.heap.pop();
  }
}

//* Note: the MinHeap above compares values directly, so an object comparator would be needed
//* for a production-ready priority queue. This is intentionally a design exercise.


//* ------------------------------------------------------------
//* 87. MINI PROJECT — LRU CACHE
//* ------------------------------------------------------------

class LRUCache {
  constructor(limit = 3) {
    this.limit = limit;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return undefined;

    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);

    if (this.cache.size > this.limit) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}


//* ------------------------------------------------------------
//* 88. MINI PROJECT — AUTOCOMPLETE
//* ------------------------------------------------------------

function collectWords(node, prefix, result) {
  if (node.isWord) result.push(prefix);

  for (const [char, child] of node.children) {
    collectWords(child, prefix + char, result);
  }
}

function autocomplete(trieInstance, prefix) {
  let node = trieInstance.root;

  for (const char of prefix) {
    node = node.children.get(char);
    if (!node) return [];
  }

  const result = [];
  collectWords(node, prefix, result);
  return result;
}

const wordsTrie = new Trie();
["java", "javascript", "jam"].forEach((word) => wordsTrie.insert(word));
console.log(autocomplete(wordsTrie, "jav"));


//* ------------------------------------------------------------
//* 89. MINI PROJECT — BREADTH-FIRST FILE SEARCH
//* ------------------------------------------------------------

function bfsTreeSearch(root, target) {
  if (!root) return null;

  const queue = [root];
  let front = 0;

  while (front < queue.length) {
    const node = queue[front++];

    if (node.value === target) return node;

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return null;
}


//* ------------------------------------------------------------
//* 90. MINI PROJECT — DEPENDENCY CHECKER
//* ------------------------------------------------------------

function hasDependencyCycle(graph) {
  const order = topologicalSort(graph);
  return order.length !== graph.size;
}

console.log(hasDependencyCycle(dependencyGraph)); // false


//* ------------------------------------------------------------
//* 91. MINI PROJECT — RATE LIMIT WINDOW
//* ------------------------------------------------------------

function canMakeRequest(timestamps, now, windowMs, limit) {
  const recent = timestamps.filter((time) => now - time < windowMs);
  return recent.length < limit;
}

console.log(canMakeRequest([100, 200, 300], 350, 300, 3));

//* For a high-throughput production system, a queue/deque strategy can avoid repeatedly filtering all timestamps.


//* ------------------------------------------------------------
//* 92. PRACTICE: ARRAY BASICS
//* ------------------------------------------------------------

//* 1. Find maximum value.
//* 2. Find minimum value.
//* 3. Reverse without Array.reverse().
//* 4. Remove duplicates.
//* 5. Find second largest.
//* 6. Move zeros to the end.
//* 7. Rotate by k.
//* 8. Merge two sorted arrays.
//* 9. Find missing number.
//* 10. Find intersection.


//* ------------------------------------------------------------
//* 93. PRACTICE: STRING PROBLEMS
//* ------------------------------------------------------------

//* 1. Reverse a string.
//* 2. Check palindrome.
//* 3. Count characters.
//* 4. First non-repeating character.
//* 5. Check anagram.
//* 6. Longest common prefix.
//* 7. Compress repeated characters.
//* 8. Valid parentheses.
//* 9. Longest substring without repeating characters.
//* 10. Find all occurrences of a pattern.


//* ------------------------------------------------------------
//* 94. PRACTICE: LINKED LIST
//* ------------------------------------------------------------

//* 1. Insert at head.
//* 2. Insert at tail.
//* 3. Delete by value.
//* 4. Search.
//* 5. Reverse a list.
//* 6. Find middle node.
//* 7. Detect cycle.
//* 8. Find cycle start.
//* 9. Merge sorted lists.
//* 10. Remove nth node from end.


//* ------------------------------------------------------------
//* 95. PRACTICE: STACK / QUEUE
//* ------------------------------------------------------------

//* 1. Implement stack with array.
//* 2. Implement queue with two stacks.
//* 3. Min stack.
//* 4. Evaluate postfix expression.
//* 5. Valid parentheses.
//* 6. Next greater element.
//* 7. Sliding-window maximum.
//* 8. Browser history simulation.
//* 9. Undo/redo system.
//* 10. Task scheduler.


//* ------------------------------------------------------------
//* 96. PRACTICE: TREES
//* ------------------------------------------------------------

//* 1. Preorder.
//* 2. Inorder.
//* 3. Postorder.
//* 4. Level order.
//* 5. Tree height.
//* 6. Count nodes.
//* 7. Search BST.
//* 8. Insert BST.
//* 9. Validate BST.
//* 10. Lowest common ancestor.


//* ------------------------------------------------------------
//* 97. PRACTICE: GRAPHS
//* ------------------------------------------------------------

//* 1. Build adjacency list.
//* 2. DFS.
//* 3. BFS.
//* 4. Detect cycle.
//* 5. Connected components.
//* 6. Shortest unweighted path.
//* 7. Topological sorting.
//* 8. Dijkstra.
//* 9. Minimum spanning tree.
//* 10. Bipartite graph check.


//* ------------------------------------------------------------
//* 98. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1: Binary search never terminates.
//* Debug 2: Linked-list traversal enters an infinite loop.
//* Debug 3: Queue becomes O(n²) because shift() is used repeatedly.
//* Debug 4: Recursive function has no valid base case.
//* Debug 5: DFS revisits nodes forever in a cyclic graph.
//* Debug 6: BFS marks nodes too late and enqueues duplicates.
//* Debug 7: Two-pointer solution is used on unsorted input.
//* Debug 8: Sliding-window code removes the wrong element.
//* Debug 9: DP state is initialized incorrectly.
//* Debug 10: Heap bubble-down chooses the wrong child.


//* ------------------------------------------------------------
//* 99. INTERVIEW QUESTIONS
//* ------------------------------------------------------------

//* Q1. Array vs linked list?
//* Q2. Stack vs queue?
//* Q3. What is Big-O?
//* Q4. O(1) vs O(n)?
//* Q5. Expected O(1) Map lookup means what?
//* Q6. When does binary search apply?
//* Q7. What are two pointers?
//* Q8. What is a sliding window?
//* Q9. What is recursion?
//* Q10. What is memoization?
//* Q11. What is dynamic programming?
//* Q12. Greedy vs DP?
//* Q13. DFS vs BFS?
//* Q14. What is a BST?
//* Q15. Why can a BST become O(n)?
//* Q16. What is a heap used for?
//* Q17. What is a graph adjacency list?
//* Q18. When does BFS find the shortest path?
//* Q19. What is topological sorting?
//* Q20. Why does Dijkstra require non-negative weights?
//* Q21. What is a trie?
//* Q22. What is backtracking?
//* Q23. What is amortized complexity?
//* Q24. How do constraints affect algorithm selection?
//* Q25. How do you prove an algorithm is correct?


//* ------------------------------------------------------------
//* 100. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. Explain Big-O using a real example.
//* 2. Explain why binary search is logarithmic.
//* 3. Explain stack LIFO and queue FIFO.
//* 4. Draw a linked list on paper.
//* 5. Explain a tree traversal.
//* 6. Explain BFS and DFS.
//* 7. Explain two pointers.
//* 8. Explain sliding window.
//* 9. Explain memoization.
//* 10. Explain dynamic programming.
//* 11. Explain greedy algorithms and why proof matters.
//* 12. Explain a graph using a real-world network.
//* 13. Explain a heap as a priority queue.
//* 14. Explain a trie using autocomplete.
//* 15. Explain how constraints determine algorithm choice.


//* ============================================================
//* FINAL DSA MENTAL MODEL
//* ============================================================

//* 1. Understand the problem.
//* 2. Write down constraints.
//* 3. Start with a brute-force solution.
//* 4. Measure time and space complexity.
//* 5. Look for patterns:
//*    - hashing
//*    - two pointers
//*    - sliding window
//*    - prefix sums
//*    - stack/queue
//*    - recursion/backtracking
//*    - binary search
//*    - greedy
//*    - dynamic programming
//*    - tree/graph traversal
//* 6. Choose the data structure that makes the required operation cheap.
//* 7. Prove correctness with invariants/cases.
//* 8. Test edge cases.
//* 9. Optimize only when the constraints require it.
//*
//* DSA mastery is not knowing 100 patterns by heart.
//* It is recognizing the structure of a new problem and building a correct solution.

//* END OF DSA
