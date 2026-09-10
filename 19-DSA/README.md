# 19 — Data Structures & Algorithms (DSA)

> A JavaScript-first path from problem-solving fundamentals to advanced data structures, algorithms, complexity analysis, patterns, debugging, interviews, and real-world engineering.

## Learning Goal

By the end of this chapter, you should be able to analyze a problem, choose an appropriate data structure, design an algorithm, prove basic correctness, estimate time and space complexity, implement it cleanly in JavaScript, test edge cases, optimize it, and explain your reasoning to another developer.

## 1. What Is DSA?

Data Structures organize data; Algorithms describe procedures for solving problems using that data.

## 2. Why DSA Matters

DSA develops computational thinking and helps you choose solutions that remain efficient as input grows.

## 3. DSA Is Not Just Interview Coding

Indexes, maps, queues, caching, graphs, scheduling, searching, and sorting appear throughout real software systems.

## 4. Problem-Solving Pipeline

```text
Understand
   ↓
Model
   ↓
Examples
   ↓
Brute force
   ↓
Complexity
   ↓
Optimize
   ↓
Implement
   ↓
Test
   ↓
Explain
```

## 5. Input Constraints

Constraints often determine which algorithm is feasible. Always inspect `n`, value ranges, ordering, duplicates, and memory limits.

## 6. Correctness First

A fast algorithm that returns the wrong result is still wrong. Establish the intended behavior before optimizing.

## 7. Brute Force

Start with the simplest correct solution when it helps reveal the problem structure.

## 8. Optimize From Evidence

Compare complexity and actual constraints before replacing a clear solution with a more complicated one.

## 9. Time Complexity

Time complexity describes how the amount of computational work scales with input size under a chosen model.

## 10. Space Complexity

Space complexity describes how additional memory requirements scale with input size.

## 11. Big-O

Big-O describes an asymptotic upper-growth class. It is not a stopwatch measurement.

## 12. Big-Theta

Theta notation describes a tight asymptotic bound when both upper and lower growth match.

## 13. Big-Omega

Omega notation describes an asymptotic lower bound.

## 14. Constants

Big-O hides constant factors, so `2n` and `100n` are both O(n), even though real runtimes can differ greatly.

## 15. Common Complexities

```text
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)
```

## 16. Constant Time

An operation is O(1) when its asymptotic work does not grow with input size under the chosen model.

## 17. Logarithmic Time

Binary search is a classic O(log n) algorithm because it repeatedly halves the remaining search space.

## 18. Linear Time

A single full scan of `n` elements is typically O(n).

## 19. Quadratic Time

Two independent loops over the same `n` elements can produce O(n²) work.

## 20. Exponential Time

Brute-force subset generation can require O(2ⁿ) possibilities.

## 21. Factorial Time

Generating every permutation can require O(n!) possibilities.

## 22. Best, Average, Worst Case

Complexity may differ depending on the input. State which case you are analyzing.

## 23. Amortized Complexity

An operation may occasionally be expensive but inexpensive on average across a sequence of operations, such as dynamic-array growth.

## 24. Recursion

Recursion solves a problem by reducing it to smaller instances of the same problem.

## 25. Base Case

Every terminating recursive algorithm needs a condition that stops further recursive calls.

## 26. Recursive Case

The recursive case must make measurable progress toward the base case.

## 27. Call Stack

Each active recursive call consumes stack space. Deep recursion can cause stack overflow.

## 28. Recursion Example

```js
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
```

## 29. Iteration vs Recursion

Iteration often uses less call-stack space, while recursion can express tree and divide-and-conquer problems naturally.

## 30. Tail Calls

Do not assume JavaScript environments provide general proper-tail-call optimization in practice. Deep recursion may still overflow.

## 31. Arrays

Arrays provide indexed access and are one of the most important structures for DSA in JavaScript.

## 32. Array Access

Reading `arr[i]` is generally O(1) for ordinary dense arrays under the usual algorithmic model.

## 33. Array Search

`includes`, `indexOf`, and linear scans are generally O(n).

## 34. Array Push

Appending with `push()` is amortized O(1) for typical dynamic-array implementations, though resizing can occasionally cost more.

## 35. Array Pop

Removing the final element with `pop()` is generally O(1).

## 36. Array Shift

Removing the first element with `shift()` can require moving/reindexing remaining elements and is generally O(n).

## 37. Array Unshift

Adding to the beginning with `unshift()` is generally O(n).

## 38. Array Splice

`splice()` can require shifting many elements, so complexity depends on where and how many elements are inserted or removed.

## 39. Array Slice

`slice()` creates a shallow copy of a range, generally O(k) for copied length `k`.

## 40. Two-Pointer Pattern

Two pointers move through a sequence while maintaining an invariant, often reducing nested scans to O(n).

## 41. Opposite Pointers

A common pattern starts one pointer at the left and another at the right.

```js
let left = 0;
let right = arr.length - 1;
while (left < right) {
  // inspect arr[left] and arr[right]
  left++;
  right--;
}
```

## 42. Fast and Slow Pointers

Two pointers moving at different speeds are useful for linked lists and cycle detection.

## 43. Sliding Window

A sliding window maintains a contiguous range while expanding and shrinking it as conditions change.

## 44. Fixed Window

A fixed-size window is useful for maximum/minimum/sum problems over every subarray of size `k`.

## 45. Variable Window

A variable-size window grows until a constraint is violated and then shrinks until the condition is restored.

## 46. Prefix Sum

Prefix sums preprocess cumulative values so many range-sum queries can be answered efficiently.

## 47. Prefix Sum Example

```js
const prefix = [0];
for (const value of arr) {
  prefix.push(prefix.at(-1) + value);
}
```

## 48. Range Sum

With a prefix array, a range sum from `l` through `r` can be computed as `prefix[r + 1] - prefix[l]`.

## 49. Difference Array

A difference array can represent range additions efficiently when many interval updates must be applied before reconstructing final values.

## 50. Frequency Counter

A frequency map counts occurrences and often converts repeated searching into O(n) preprocessing plus O(1)-average lookups.

## 51. Frequency Map Example

```js
const freq = new Map();
for (const value of arr) {
  freq.set(value, (freq.get(value) ?? 0) + 1);
}
```

## 52. Set for Membership

Use `Set` when the primary requirement is unique values or membership testing.

## 53. Map for Key Lookup

Use `Map` when arbitrary keys need associated values and explicit key-value semantics are useful.

## 54. Hashing Concept

Hash tables use a hash function and buckets to support efficient average-case lookup, insertion, and deletion.

## 55. Hash Collision

Different keys can map to the same bucket. Hash-table implementations resolve collisions internally.

## 56. Average vs Worst Hash Lookup

Hash lookup is commonly treated as O(1) average-case, but worst-case behavior depends on implementation and collision handling.

## 57. JavaScript Map

JavaScript `Map` provides key-value storage with insertion-order iteration and object-identity semantics for object keys.

## 58. JavaScript Set

JavaScript `Set` stores unique values using SameValueZero equality semantics.

## 59. Stack

A stack follows LIFO: Last In, First Out.

## 60. Stack Operations

The core operations are push, pop, and peek/top.

## 61. Stack with Array

```js
const stack = [];
stack.push("A");
stack.push("B");
console.log(stack.pop()); // B
```

## 62. Stack Applications

Stacks appear in undo systems, expression evaluation, browser-like history models, DFS, and parsing.

## 63. Balanced Brackets

A stack can validate matching `()`, `[]`, and `{}` by pushing opening symbols and matching closing symbols.

## 64. Queue

A queue follows FIFO: First In, First Out.

## 65. Queue Operations

The core operations are enqueue, dequeue, and front/peek.

## 66. Avoid shift for Large Queues

Repeated `shift()` can be O(n). Use a head index or a dedicated queue structure for large workloads.

## 67. Queue with Head Index

```js
const queue = [];
let head = 0;
queue.push("A", "B");
const first = queue[head++];
```

## 68. Deque

A deque supports insertion and removal at both ends.

## 69. Priority Queue

A priority queue removes elements according to priority rather than insertion order.

## 70. Heap

A heap is a tree-based structure commonly implemented in an array and used for priority queues.

## 71. Min Heap

In a min heap, the smallest value is at the root.

## 72. Max Heap

In a max heap, the largest value is at the root.

## 73. Heap Indexing

For a zero-based binary heap, children of index `i` are commonly `2i + 1` and `2i + 2`; parent is `Math.floor((i - 1) / 2)` for `i > 0`.

## 74. Heapify Up

After insertion, move the new value toward the root while its priority violates the heap property.

## 75. Heapify Down

After removing the root, move the replacement downward until the heap property is restored.

## 76. Heap Complexity

Binary-heap insertion and removal are O(log n); inspecting the root is O(1).

## 77. Linked List

A linked list stores nodes connected by references rather than requiring contiguous indexed storage.

## 78. Singly Linked List Node

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
```

## 79. Singly Linked List

Each node points to the next node, and the final node points to `null`.

## 80. Linked List Traversal

Traversing a linked list is O(n) because nodes must generally be visited sequentially.

## 81. Linked List Head

The head is the first node. Some implementations also track a tail for efficient append.

## 82. Insert at Head

Inserting at the head is O(1) when the head reference is available.

## 83. Delete at Head

Removing the head is O(1).

## 84. Search Linked List

Searching by value is O(n) in the worst case.

## 85. Doubly Linked List

A doubly linked list stores both `next` and `prev` references.

## 86. Doubly Linked List Trade-Off

Backward traversal and some removals become easier, but each node requires additional reference storage.

## 87. Circular Linked List

A circular list connects the final node back to a node such as the head.

## 88. Linked List vs Array

Arrays provide efficient indexed access; linked lists provide efficient local insertion/removal when the relevant node/reference is already known.

## 89. Tree

A tree is a hierarchical graph with parent-child relationships and no cycles in its usual rooted-tree definition.

## 90. Root

The root is the top node of a rooted tree.

## 91. Leaf

A leaf is a node with no children.

## 92. Depth

Depth describes the number of edges from a chosen root to a node.

## 93. Height

Height describes the longest downward path from a node to a leaf under a chosen convention.

## 94. Binary Tree

A binary tree allows each node to have at most two children.

## 95. Binary Search Tree

A BST maintains an ordering rule so values in the left subtree are ordered before the node and values in the right subtree after it, subject to duplicate policy.

## 96. BST Search

Search can be O(log n) in a balanced BST but can degrade to O(n) in a highly skewed tree.

## 97. Balanced Tree

A balanced tree controls height so operations remain logarithmic under its balancing rules.

## 98. Tree Node

```js
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
```

## 99. Preorder Traversal

Preorder visits node, left subtree, then right subtree.

## 100. Inorder Traversal

Inorder visits left subtree, node, then right subtree. In a BST, it produces values in sorted order when the BST invariant is valid.

## 101. Postorder Traversal

Postorder visits left subtree, right subtree, then node.

## 102. Level-Order Traversal

Level-order traversal visits nodes breadth-first, usually with a queue.

## 103. Recursive Tree Traversal

```js
function inorder(node, result = []) {
  if (!node) return result;
  inorder(node.left, result);
  result.push(node.value);
  inorder(node.right, result);
  return result;
}
```

## 104. Iterative Tree Traversal

Use an explicit stack when you want to replace recursive call-stack usage with application-managed state.

## 105. Binary Tree DFS

Depth-first search explores one branch deeply before moving to another.

## 106. Binary Tree BFS

Breadth-first search explores nodes by distance/level from the root.

## 107. Tree Serialization

Serialization converts a tree structure into a transferable representation and requires a clear representation for missing children.

## 108. Lowest Common Ancestor

The lowest common ancestor is the deepest node that is an ancestor of two target nodes under the problem's tree assumptions.

## 109. Trie

A trie stores strings by shared prefixes and is useful for prefix lookup.

## 110. Trie Complexity

Operations often depend on key length rather than the total number of stored keys, making tries useful for autocomplete-style workloads.

## 111. Graph

A graph contains vertices/nodes and edges representing relationships.

## 112. Directed Graph

Edges have direction, such as `A → B`.

## 113. Undirected Graph

An edge connects two vertices symmetrically.

## 114. Weighted Graph

Edges carry values such as distance, cost, or time.

## 115. Unweighted Graph

Edges represent connectivity without a numeric edge weight for the algorithm being considered.

## 116. Adjacency List

An adjacency list stores neighbors for each vertex and is usually memory-efficient for sparse graphs.

## 117. Adjacency Matrix

An adjacency matrix stores edge relationships in a 2D table and provides O(1) direct edge lookup at O(V²) storage.

## 118. Sparse Graph

A sparse graph has relatively few edges compared with the maximum possible number.

## 119. Dense Graph

A dense graph has many edges relative to the maximum possible number.

## 120. BFS

Breadth-first search explores a graph layer by layer and finds shortest path length in an unweighted graph when edges have equal cost.

## 121. BFS Queue

BFS commonly uses a queue and a visited structure.

## 122. BFS Complexity

With an adjacency-list graph, BFS is typically O(V + E).

## 123. DFS

Depth-first search explores one path deeply before backtracking.

## 124. DFS Complexity

With an adjacency-list graph, DFS is typically O(V + E).

## 125. Visited Set

Graphs can contain cycles, so traversal usually needs a visited structure to avoid repeated processing.

## 126. Connected Components

Repeated BFS/DFS can identify connected components in an undirected graph.

## 127. Cycle Detection

Cycle detection depends on graph type; directed and undirected graphs require different reasoning.

## 128. Topological Sort

Topological sorting orders vertices of a directed acyclic graph so every directed edge points forward in the ordering.

## 129. DAG

A directed acyclic graph contains directed edges but no directed cycles.

## 130. Kahn's Algorithm

Kahn's topological-sort algorithm repeatedly processes zero-indegree vertices.

## 131. DFS Topological Sort

A DFS-based approach can add nodes after exploring dependencies, then reverse the finishing order.

## 132. Union-Find

Disjoint Set Union maintains partitions and supports efficient union and connectivity queries.

## 133. Path Compression

Path compression shortens parent chains during Union-Find `find` operations.

## 134. Union by Rank/Size

Attaching smaller trees beneath larger ones helps keep Union-Find trees shallow.

## 135. Union-Find Complexity

With path compression and union by rank/size, operations are effectively near-constant amortized time, commonly expressed using inverse Ackermann complexity.

## 136. Sorting

Sorting rearranges values according to an ordering rule.

## 137. JavaScript sort

`Array.prototype.sort()` mutates the array and compares elements lexicographically by default unless a comparator is provided.

## 138. Numeric Sort

```js
numbers.sort((a, b) => a - b);
```

## 139. Stable Sorting

Modern ECMAScript specifies stable sorting for `Array.prototype.sort`, so equal-key elements retain their relative order.

## 140. Bubble Sort

Bubble sort repeatedly swaps adjacent out-of-order values. Typical worst-case complexity is O(n²).

## 141. Selection Sort

Selection sort repeatedly selects the smallest remaining value and places it into position. Typical complexity is O(n²).

## 142. Insertion Sort

Insertion sort builds a sorted prefix by inserting each new value into its proper position. Worst-case complexity is O(n²).

## 143. Insertion Sort Strength

Insertion sort can perform well on small or nearly sorted inputs.

## 144. Merge Sort

Merge sort divides the array, sorts subarrays, and merges them. Typical complexity is O(n log n) with O(n) auxiliary space for a standard implementation.

## 145. Merge Step

The merge operation compares the fronts of two sorted arrays and emits the smaller value.

## 146. Quick Sort

Quicksort partitions around a pivot and recursively sorts the partitions.

## 147. Quick Sort Complexity

Average-case complexity is commonly O(n log n), while poor pivot choices can produce O(n²) worst-case behavior.

## 148. Heap Sort

Heap sort uses a heap to repeatedly select the next extreme value and has O(n log n) worst-case time.

## 149. Counting Sort

Counting sort can be efficient when integer keys lie in a manageable range; its complexity depends on input size and key range.

## 150. Radix Sort

Radix sort processes digits/characters by position and can be efficient for suitable fixed-format keys.

## 151. Comparison Sorting Lower Bound

For general comparison-based sorting, the decision-tree model gives an Ω(n log n) lower bound in the worst case.

## 152. Searching

Searching locates a target value or position within data.

## 153. Linear Search

Linear search checks values sequentially and has O(n) worst-case time.

## 154. Binary Search

Binary search repeatedly halves a sorted search space.

## 155. Binary Search Requirement

The search space must satisfy an appropriate ordering/monotonic predicate for binary search to be valid.

## 156. Binary Search Template

```js
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
```

## 157. Binary Search Boundaries

Most binary-search bugs come from unclear inclusive/exclusive boundaries. Decide the invariant before coding.

## 158. Lower Bound

A lower-bound search finds the first position satisfying a condition such as `arr[i] >= target`.

## 159. Upper Bound

An upper-bound search finds the first position satisfying a condition such as `arr[i] > target`.

## 160. Binary Search on Answer

Some optimization problems can be solved by binary-searching a candidate answer when feasibility is monotonic.

## 161. Monotonic Predicate

A predicate is monotonic over an ordered search space when once it becomes true it remains true, or vice versa, enabling answer-space binary search.

## 162. Divide and Conquer

Divide-and-conquer algorithms split a problem, solve subproblems, and combine results.

## 163. Merge Sort as Divide and Conquer

Merge sort is a classic example because it divides recursively and combines with merging.

## 164. Recurrence

A recurrence expresses the cost of a recursive algorithm in terms of smaller inputs.

## 165. Master-Theorem Intuition

For many divide-and-conquer recurrences of the form `T(n) = aT(n/b) + f(n)`, the Master Theorem helps derive asymptotic complexity under its conditions.

## 166. Greedy Algorithm

A greedy algorithm repeatedly chooses a locally attractive option according to a rule intended to lead to a globally optimal solution.

## 167. Greedy Is Not Automatically Correct

A locally optimal choice does not guarantee global optimality. A proof or established property is required.

## 168. Activity Selection

Selecting the maximum number of non-overlapping activities is a classic problem where an appropriate greedy strategy works.

## 169. Exchange Argument

An exchange argument can prove a greedy choice is safe by transforming an optimal solution to include the greedy choice without worsening the result.

## 170. Dynamic Programming

Dynamic programming solves overlapping subproblems while storing results so they are not repeatedly recomputed.

## 171. Overlapping Subproblems

If the same subproblems occur repeatedly, memoization or tabulation can reduce duplicate computation.

## 172. Optimal Substructure

A problem has optimal substructure when an optimal solution can be constructed from optimal solutions to relevant subproblems.

## 173. Memoization

Memoization is top-down dynamic programming: recursively solve and cache each subproblem.

## 174. Tabulation

Tabulation is bottom-up dynamic programming: compute states iteratively from base cases.

## 175. Fibonacci Naive

Naive recursive Fibonacci repeats the same subproblems and has exponential growth.

## 176. Fibonacci Memoized

Memoization reduces Fibonacci to O(n) time and O(n) auxiliary space for the straightforward recursive version.

## 177. Fibonacci Tabulation

An iterative two-variable Fibonacci implementation can use O(1) auxiliary space.

## 178. DP State

A DP state should contain exactly the information needed to determine the remaining subproblem.

## 179. State Transition

A transition defines how one state derives from one or more previous states.

## 180. Base State

Base states define known answers that start the DP computation.

## 181. DP Table Dimensions

Choose dimensions based on independent state variables such as index, capacity, remaining amount, or position.

## 182. 0/1 Knapsack

Each item can be selected at most once. A common DP state tracks items considered and remaining capacity.

## 183. Unbounded Knapsack

Items can be selected repeatedly, changing the transition and iteration strategy.

## 184. Coin Change

Coin-change problems illustrate the difference between minimizing number of coins and counting combinations/ways.

## 185. Longest Common Subsequence

LCS finds the longest sequence appearing in two strings while preserving relative order.

## 186. Longest Increasing Subsequence

LIS can be solved in O(n²) with classic DP or approximately O(n log n) using a tails/binary-search strategy.

## 187. Grid DP

Grid problems often define a state by row and column and combine results from valid neighboring states.

## 188. Backtracking

Backtracking builds a candidate incrementally and abandons branches that cannot produce valid solutions.

## 189. Decision Tree

Backtracking explores a decision tree of possible choices.

## 190. Permutations

Generating all permutations requires O(n!) outputs, so no algorithm can avoid output-size growth when every permutation must be produced.

## 191. Combinations

Generating all k-element combinations produces `C(n, k)` outputs.

## 192. Subsets

A set of `n` elements has `2ⁿ` subsets, including the empty set.

## 193. Backtracking Template

```js
function backtrack(start, path) {
  // record or evaluate path
  for (let i = start; i < choices.length; i++) {
    path.push(choices[i]);
    backtrack(i + 1, path);
    path.pop();
  }
}
```

## 194. Pruning

Pruning prevents exploration of branches that cannot lead to valid or better solutions.

## 195. Constraint Propagation

Use known constraints early to reduce the search space in backtracking and constraint problems.

## 196. Bit Manipulation

Bitwise operators operate on the 32-bit signed integer representation used by JavaScript bitwise operations.

## 197. Bitwise Caveat

JavaScript `Number` is not generally a 32-bit integer type, but bitwise operators convert operands to 32-bit integer representations.

## 198. AND

`a & b` keeps bits set in both operands.

## 199. OR

`a | b` sets bits present in either operand.

## 200. XOR

`a ^ b` sets bits that differ between operands.

## 201. NOT

`~a` flips the bits of the 32-bit signed representation.

## 202. Left Shift

`a << b` shifts the 32-bit representation left by `b` positions.

## 203. Right Shift

`a >> b` performs sign-propagating right shift.

## 204. Unsigned Right Shift

`a >>> b` performs zero-fill right shift and produces a non-negative 32-bit unsigned result.

## 205. Power of Two

For suitable non-negative integer ranges, bit techniques can test powers of two, but remember JavaScript bitwise operations are 32-bit.

## 206. BigInt in DSA

Use `BigInt` when exact integer arithmetic exceeds the safe integer range of `Number` and the algorithm requires larger integers.

## 207. Number Safe Range

`Number.MAX_SAFE_INTEGER` is `9007199254740991`.

## 208. Modular Arithmetic

Many algorithms use remainder arithmetic to keep values bounded, especially counting and combinatorial problems.

## 209. GCD

The Euclidean algorithm computes greatest common divisor efficiently by repeatedly replacing `(a, b)` with `(b, a % b)`.

## 210. LCM

For suitable nonzero integers, `lcm(a,b) = |a / gcd(a,b) * b|`, with multiplication order chosen to reduce unnecessary overflow in fixed-width integer languages.

## 211. Prime Checking

Trial division only needs to test divisors through `sqrt(n)` for a positive integer greater than one.

## 212. Sieve of Eratosthenes

The sieve marks composite numbers and can find all primes up to `n` efficiently in roughly O(n log log n) time.

## 213. Recursion Tree

A recursion tree visualizes calls and helps estimate repeated work.

## 214. Invariants

A loop invariant is a statement that remains true at each iteration and can help prove correctness.

## 215. Loop Invariant Example

In a sorted-prefix insertion sort, the invariant can be that the processed prefix is sorted before each next insertion.

## 216. Proof by Induction

Recursive algorithms can often be reasoned about using mathematical induction: base case plus a correct inductive step.

## 217. Edge Cases

Always test empty input, one item, duplicates, negative values, extreme values, already sorted input, reverse order, and invalid inputs where relevant.

## 218. Off-by-One Errors

Boundary mistakes commonly occur in loops, binary search, ranges, and substring/subarray logic.

## 219. Inclusive vs Exclusive

Write down whether each boundary is included before implementing range logic.

## 220. Mutation Awareness

Know whether your algorithm mutates the input. Hidden mutation can cause test failures and difficult debugging.

## 221. Stable Output

If order matters, do not use a data structure or algorithm that discards or changes ordering unless the problem permits it.

## 222. Determinism

For repeatable tests, avoid relying on unspecified ordering or randomness unless randomness is part of the algorithm.

## 223. Testing DSA

Test examples, edge cases, randomized cases, and invariants where practical.

## 224. Property-Based Thinking

Instead of checking only exact outputs, test properties such as sortedness, permutation preservation, bounds, or graph reachability.

## 225. Brute-Force Oracle

For small random inputs, compare an optimized algorithm against a simple brute-force implementation to discover subtle bugs.

## 226. Differential Testing

Run two independent implementations on the same inputs and compare results.

## 227. Fuzz Testing

Generate many varied inputs automatically to expose unexpected edge cases.

## 228. DSA Debugging

When output is wrong, inspect input assumptions, state transitions, loop boundaries, mutation, and invariant violations before rewriting everything.

## 229. Dry Run

A dry run manually tracks variables on a small example to understand algorithm state.

## 230. Trace Table

Create columns such as index, value, pointers, accumulator, stack, queue, or DP state.

## 231. Complexity Annotation

Write expected time and space complexity next to important implementations.

## 232. Code Clarity

Use descriptive names for pointers, boundaries, states, and accumulators.

## 233. Avoid Cleverness

Readable O(n) code is usually better than mysterious micro-optimized code that has the same asymptotic complexity.

## 234. Sorting + Two Pointers

Sorting can expose ordering that enables two-pointer or greedy solutions, typically adding O(n log n) sorting cost.

## 235. Hash Map + Array

A common optimization is to scan an array once while using a map for previously seen values.

## 236. Two Sum

Two Sum demonstrates how a hash map can reduce a nested O(n²) search to O(n) average-case time.

## 237. Two Sum Pattern

For each value `x`, check whether `target - x` has already been seen before inserting `x`.

## 238. Three Sum

A common approach sorts the array and uses two pointers inside an outer loop, typically O(n²) after sorting.

## 239. Four Sum

Four Sum can be approached with sorting plus nested loops and two pointers, with complexity depending on the exact implementation.

## 240. Subarray vs Subsequence

A subarray is contiguous; a subsequence preserves order but can skip elements.

## 241. Substring vs Subsequence

A substring is contiguous characters; a subsequence may omit characters while preserving order.

## 242. Kadane's Algorithm

Kadane's algorithm finds a maximum-sum contiguous subarray in O(n) time.

## 243. Kadane State

At each position, decide whether the best subarray ending here starts fresh or extends the previous one.

## 244. Maximum Product Subarray

Track both maximum and minimum ending products because multiplying by a negative can swap their roles.

## 245. Prefix/Suffix Technique

Prefix and suffix computations can eliminate repeated range work in problems such as product-except-self.

## 246. Monotonic Stack

A monotonic stack maintains increasing or decreasing order and is useful for next-greater/smaller-element problems.

## 247. Next Greater Element

Scan while removing stack values that have found their next greater element.

## 248. Histogram Largest Rectangle

A monotonic stack can find the largest rectangle in a histogram in O(n).

## 249. Monotonic Queue

A monotonic deque can maintain extrema over a sliding window efficiently.

## 250. Sliding Window Maximum

A deque can solve maximum-over-each-window problems in O(n).

## 251. Interval Problems

Intervals are often solved by sorting endpoints and then scanning with a maintained current range.

## 252. Merge Intervals

Sort intervals by start and merge overlaps while maintaining the current interval.

## 253. Meeting Rooms

Meeting-room problems can be modeled as interval overlap or event-counting problems.

## 254. Sweep Line

A sweep-line algorithm processes sorted events from left to right while maintaining active state.

## 255. Prefix Frequency

Prefix counts can answer repeated frequency queries over ranges efficiently.

## 256. Coordinate Compression

Map large sparse values to compact ranks while preserving ordering, useful for indexed structures.

## 257. Binary Indexed Tree

A Fenwick tree supports prefix sums and point updates in O(log n) with O(n) storage.

## 258. Fenwick Tree Idea

Each index stores a partial range whose size is determined by its least significant set bit.

## 259. Segment Tree

A segment tree supports range queries and updates in O(log n) for many associative operations with an appropriate implementation.

## 260. Segment Tree Trade-Off

Segment trees are powerful but more complex than prefix sums or Fenwick trees. Use them only when dynamic range operations require them.

## 261. Sparse Table

A sparse table preprocesses static range queries and can provide O(1) queries for suitable idempotent operations after O(n log n) preprocessing.

## 262. Disjoint Set Applications

Union-Find is useful for connectivity, cycle detection in undirected graphs, and Kruskal's minimum spanning tree algorithm.

## 263. Shortest Path

Shortest-path algorithms depend on whether edges are weighted, whether weights can be negative, and whether the graph is directed.

## 264. Unweighted Shortest Path

BFS finds shortest edge-count distance in an unweighted graph.

## 265. Dijkstra

Dijkstra's algorithm finds shortest paths from a source when edge weights are non-negative.

## 266. Dijkstra Data Structure

A priority queue efficiently selects the currently smallest tentative distance.

## 267. Dijkstra Complexity

With a binary heap and adjacency list, a common implementation is O((V + E) log V), depending on heap strategy.

## 268. Negative Edges

Dijkstra is not valid when negative edge weights can affect shortest paths.

## 269. Bellman-Ford

Bellman-Ford handles negative edge weights and can detect reachable negative cycles, typically in O(VE).

## 270. Floyd-Warshall

Floyd-Warshall computes all-pairs shortest paths in O(V³) time and O(V²) space in its standard form.

## 271. Minimum Spanning Tree

An MST connects all vertices of a connected weighted undirected graph with minimum total edge weight.

## 272. Kruskal

Kruskal sorts edges by weight and adds them when they connect different components, using Union-Find.

## 273. Prim

Prim grows an MST from a starting vertex by repeatedly adding the cheapest edge connecting the current tree to a new vertex.

## 274. Topological Dependencies

Build systems, course prerequisites, and task scheduling can be modeled as DAGs.

## 275. Critical Path

Dependency graphs can identify paths that determine completion time when task durations are modeled appropriately.

## 276. Graph Representation in JavaScript

```js
const graph = new Map();
graph.set("A", ["B", "C"]);
graph.set("B", ["D"]);
```

## 277. Queue Implementation

A production-quality queue should avoid repeated O(n) front removal for large workloads.

## 278. Stack Implementation

An array is usually sufficient for a stack because `push` and `pop` operate at the same end.

## 279. Heap Implementation

Keep heap operations isolated and test them independently because indexing bugs can corrupt every higher-level algorithm.

## 280. Generic Priority Queue

Parameterize priority comparison when building a reusable heap-based priority queue.

## 281. Comparator Contract

Sorting comparators should return negative, zero, or positive values according to relative ordering; they should behave consistently with the intended ordering.

## 282. Stable Priority Handling

If equal priorities must preserve insertion order, include a monotonic sequence number in the priority key.

## 283. Randomized Algorithms

Some algorithms use randomness to improve expected performance or simplify selection, but correctness and reproducibility need careful handling.

## 284. Fisher-Yates Shuffle

Fisher-Yates generates an unbiased random permutation when the random source is uniform over the required choices.

## 285. Randomness in JavaScript

`Math.random()` is not a cryptographic random source. Use Web Crypto for security-sensitive randomness.

## 286. Reservoir Sampling

Reservoir sampling selects a uniform sample of fixed size from a stream when the total size is unknown in advance.

## 287. String Algorithms

String problems often combine frequency maps, two pointers, sliding windows, stacks, or dynamic programming.

## 288. Character Frequency

A frequency map can solve anagram and duplicate-character problems efficiently.

## 289. Anagram

Two strings are anagrams when they contain the same character counts under the chosen character model.

## 290. Unicode Caveat

JavaScript string indexing uses UTF-16 code units, so “character” is not always equivalent to one `string[i]`. Unicode-aware algorithms may need code points or grapheme segmentation.

## 291. Palindrome

A palindrome reads the same under the problem's normalization rules. Clarify case, punctuation, whitespace, and Unicode expectations.

## 292. Longest Palindromic Substring

Possible strategies include expand-around-center O(n²), dynamic programming O(n²), and specialized linear-time algorithms such as Manacher's algorithm.

## 293. KMP

Knuth-Morris-Pratt preprocesses a pattern to avoid redundant comparisons during substring search.

## 294. Prefix Function

The KMP prefix function describes the longest proper prefix that is also a suffix for each pattern prefix.

## 295. Z Algorithm

The Z algorithm computes, for each position, the length of the substring matching the prefix and supports linear-time pattern techniques.

## 296. Trie vs Hash Map

A hash map is excellent for exact-key lookup; a trie naturally supports prefix queries.

## 297. LRU Cache

An LRU cache evicts the least recently used entry when capacity is exceeded.

## 298. LRU Design

A common O(1)-average design combines a hash map with a doubly linked list.

## 299. LFU Concept

Least Frequently Used eviction removes entries based on usage frequency, usually requiring additional frequency tracking.

## 300. Cache Correctness

Cache algorithms must define key identity, capacity, expiration, invalidation, and behavior after misses/errors.

## 301. Complexity of LRU

A well-designed map + doubly linked list LRU supports get and put in O(1) average time.

## 302. String Builder Pattern

Repeated string concatenation can be acceptable in modern JavaScript engines, but for huge incremental workloads, consider data representation and measure rather than assuming concatenation is always slow.

## 303. Matrix Representation

2D arrays can represent grids, but flattening into a one-dimensional array can simplify indexing and sometimes reduce overhead.

## 304. Grid Indexing

For a grid with `cols`, cell `(r, c)` can be mapped to `r * cols + c` in a flattened representation.

## 305. BFS Grid

Grid BFS often treats each cell as a graph vertex and checks valid neighboring coordinates.

## 306. Grid DFS

DFS can explore connected regions such as islands or flood-fill components.

## 307. Flood Fill

Flood fill replaces or explores a connected region sharing a chosen property.

## 308. Multi-Source BFS

Initialize a BFS queue with multiple starting nodes to compute minimum distance from any source.

## 309. Topological DP

Dynamic programming over a DAG can process vertices in topological order so dependencies are already solved.

## 310. DAG Shortest Path

Shortest paths in a DAG can be solved by relaxing edges in topological order, including cases with negative edge weights as long as no directed cycle exists.

## 311. State Compression

Reduce DP memory when each state depends only on a small previous layer.

## 312. Rolling Array

A 2D DP table can sometimes be compressed to one or two rows when transitions permit it.

## 313. Knapsack Space Optimization

For 0/1 knapsack with a 1D table, iterate capacity in descending order to avoid reusing an item within the same iteration.

## 314. DP Order Matters

Changing loop direction can change whether a state represents the previous iteration or a value already updated in the current iteration.

## 315. Greedy Counterexample

When unsure about greedy correctness, search for a small counterexample or derive a proof before trusting the strategy.

## 316. Exchange Argument Practice

Try replacing the first choice of an optimal solution with the greedy choice and check whether feasibility and objective value are preserved.

## 317. Divide-and-Conquer Trade-Off

Recursive splitting can improve time complexity but may add stack or temporary-memory costs.

## 318. Iterative DFS

Use an explicit stack when recursion depth may exceed safe call-stack limits.

## 319. BFS Memory

BFS can require O(V) queue/visited memory in the worst case.

## 320. DFS Memory

DFS requires O(V) visited plus recursion/stack space in the worst case.

## 321. Graph Input Parsing

For competitive-style input, parse carefully and avoid repeated expensive transformations inside inner loops.

## 322. Fast Input Mindset

JavaScript input performance depends on the environment. Parse once into suitable structures instead of repeatedly splitting or converting the same data.

## 323. Output Size

If a problem requires printing O(n) or O(n²) output, output size itself establishes a lower bound on work.

## 324. Impossible Optimization

You cannot generally output `n` distinct values in o(n) time because producing the output already takes Ω(n) work.

## 325. Memory Limits

An O(n) algorithm may still fail if `n` is huge and each stored object has significant overhead.

## 326. Primitive vs Object Overhead

Object-heavy structures can consume more memory than compact typed representations. Measure before choosing complex memory optimizations.

## 327. Typed Arrays in DSA

Typed arrays can be useful for large numeric arrays with known element types and bounded integer/float representations.

## 328. BigInt Performance

BigInt enables exact arbitrary-size integers but is not a drop-in performance replacement for Number. Use it only when required.

## 329. Numerical Precision

Algorithms involving exact large integers, floating-point tolerances, or geometry must account for JavaScript numeric semantics.

## 330. Floating-Point Comparison

Do not assume two independently calculated floating-point values should be compared with exact `===` when rounding error is expected.

## 331. Epsilon

For appropriate numerical problems, compare values within a justified tolerance rather than using an arbitrary epsilon blindly.

## 332. Geometry Basics

Common DSA geometry tools include orientation/cross products, distances, line intersections, and convex hull concepts.

## 333. Cross Product

For 2D vectors `(ax, ay)` and `(bx, by)`, the scalar cross product is `ax * by - ay * bx`.

## 334. Orientation

The sign of a 2D cross product can determine whether three points make a left turn, right turn, or are collinear, subject to numerical precision considerations.

## 335. Convex Hull

A convex hull is the smallest convex boundary containing a set of points. Monotonic chain is a common O(n log n) approach after sorting.

## 336. Coordinate Compression Use

Compression is useful when values are large but only relative order and indexed positions matter.

## 337. Offline Queries

Some problems become easier when queries can be sorted and processed together rather than answered independently online.

## 338. Sweep-Line Queries

Sort events and process them in order while maintaining active intervals or values.

## 339. Mo's Algorithm

Mo's algorithm reorders offline range queries to reduce pointer movement for some problems, commonly around O((n + q)√n) under suitable assumptions.

## 340. Advanced Data Structures

Fenwick trees, segment trees, tries, heaps, Union-Find, sparse tables, and monotonic structures are tools selected for specific query/update patterns.

## 341. Choose Structure by Operation

Ask which operations dominate: lookup, insertion, deletion, ordering, prefix search, range query, connectivity, or priority extraction.

## 342. Operation Table

```text
Need indexed access     → Array
Need unique membership   → Set
Need key/value lookup    → Map
Need LIFO                → Stack
Need FIFO                → Queue
Need priority            → Heap
Need hierarchy           → Tree
Need relationships       → Graph
Need prefix search       → Trie
Need dynamic connectivity→ Union-Find
```

## 343. Data Structure Trade-Off

No structure is universally best. Every choice trades memory, ordering, operation complexity, implementation complexity, and access patterns.

## 344. Algorithm Selection

Choose algorithms from constraints and structure rather than memorized names.

## 345. Pattern Recognition

Recognize signals such as “contiguous,” “sorted,” “frequency,” “shortest,” “all combinations,” “dependencies,” and “range queries.”

## 346. Keyword: Contiguous

Contiguous subarray/substring often suggests sliding window, prefix sums, or Kadane-style reasoning.

## 347. Keyword: Pair Sum

Pair-sum problems often suggest hashing, sorting + two pointers, or binary search.

## 348. Keyword: Sorted

Sorted data often enables binary search, two pointers, merging, or greedy reasoning.

## 349. Keyword: Top K

Top-K problems often suggest a heap, sorting, counting, or selection depending on constraints.

## 350. Keyword: Dependencies

Dependency problems often suggest a directed graph and topological sorting.

## 351. Keyword: Shortest Path

Identify whether the graph is unweighted, non-negative weighted, negative weighted, or a DAG before choosing BFS, Dijkstra, Bellman-Ford, or DAG DP.

## 352. Keyword: All Possibilities

“All combinations/permutations/subsets” often indicates backtracking, bitmasking, or DP depending on output and constraints.

## 353. Keyword: Repeated Subproblem

Repeated subproblems suggest memoization or dynamic programming.

## 354. Keyword: Locally Best

A greedy approach may be appropriate, but establish why the local choice is safe.

## 355. Keyword: Range Updates

Range updates and queries may suggest difference arrays, Fenwick trees, or segment trees depending on operations.

## 356. Interview Communication

State the brute-force idea, bottleneck, optimized idea, invariant, complexity, and edge cases before presenting code.

## 357. Explain Complexity

Do not merely say “O(n).” Explain what each major loop or operation contributes.

## 358. Explain Space

Distinguish input storage from auxiliary space when the interviewer or specification requires it.

## 359. Interview Clarification

Ask whether input is sorted, whether duplicates exist, whether mutation is allowed, and what constraints apply.

## 360. Interview Example

For Two Sum: brute force is O(n²); a map stores previous values, producing O(n) average time and O(n) auxiliary space.

## 361. Interview Mistake

Do not jump into code before confirming what the function should return and what constraints apply.

## 362. Coding Under Pressure

Write a correct simple version first when time permits, then improve it while preserving tests.

## 363. Refactoring DSA Code

After correctness, extract reusable helpers only when they improve clarity without hiding the algorithm.

## 364. DSA Module Structure

A practical repository structure can separate `arrays`, `strings`, `linked-lists`, `trees`, `graphs`, `sorting`, `searching`, `dp`, and `patterns`.

## 365. Test Runner

Each algorithm should have small deterministic examples plus edge-case tests.

## 366. Complexity Notes

Document expected time and auxiliary-space complexity beside nontrivial solutions.

## 367. Visualization

Visualizing pointers, stacks, queues, tree rotations, graph traversal, and DP tables can accelerate understanding.

## 368. Teach-Back Method

After solving a problem, explain it without looking at the code. If you cannot explain the invariant, revisit the reasoning.

## 369. Beginner Challenge 1

Reverse an array in place using two pointers.

## 370. Beginner Challenge 2

Find the maximum and minimum values in one pass.

## 371. Beginner Challenge 3

Count frequencies of values using a Map.

## 372. Beginner Challenge 4

Check whether a string is a palindrome.

## 373. Beginner Challenge 5

Implement a stack using an array.

## 374. Beginner Challenge 6

Implement a queue using an array and head index.

## 375. Beginner Challenge 7

Implement linear search.

## 376. Beginner Challenge 8

Implement binary search.

## 377. Intermediate Challenge 1

Solve Two Sum in O(n) average time.

## 378. Intermediate Challenge 2

Solve longest substring without repeating characters using a sliding window.

## 379. Intermediate Challenge 3

Merge overlapping intervals.

## 380. Intermediate Challenge 4

Find the maximum subarray sum with Kadane's algorithm.

## 381. Intermediate Challenge 5

Implement a singly linked list with insert, delete, search, and reverse.

## 382. Intermediate Challenge 6

Implement a min heap.

## 383. Intermediate Challenge 7

Implement BFS and DFS for an adjacency-list graph.

## 384. Intermediate Challenge 8

Detect a cycle in an undirected graph using DFS and Union-Find.

## 385. Advanced Challenge 1

Implement Dijkstra with a binary heap priority queue.

## 386. Advanced Challenge 2

Implement Union-Find with path compression and union by size.

## 387. Advanced Challenge 3

Implement a Trie with insert, search, and prefix queries.

## 388. Advanced Challenge 4

Implement an LRU cache with O(1)-average get and put.

## 389. Advanced Challenge 5

Solve a 0/1 knapsack problem using 1D dynamic programming.

## 390. Advanced Challenge 6

Implement a segment tree supporting range sum queries and point updates.

## 391. Advanced Challenge 7

Find a longest increasing subsequence using the O(n log n) tails method.

## 392. Advanced Challenge 8

Build a dependency scheduler using topological sorting and cycle detection.

## 393. Debugging Challenge

Intentionally introduce off-by-one, duplicate handling, and boundary errors into binary search and repair them using explicit invariants.

## 394. Debugging Challenge

Compare an optimized solution with brute force on 10,000 random small inputs and investigate every mismatch.

## 395. Project: DSA Playground

Build a browser playground that visualizes arrays, stacks, queues, linked lists, heaps, trees, and graph traversals step by step.

## 396. Project: Algorithm Visualizer

Build controls for algorithm selection, input generation, speed, pause/resume, and complexity explanation.

## 397. Project: Pathfinding Visualizer

Implement BFS, DFS, Dijkstra, and A* on a grid and visualize visited cells and the final path.

## 398. Project: Autocomplete Engine

Build a Trie-based autocomplete system with prefix suggestions and usage ranking.

## 399. Project: Cache Simulator

Implement FIFO, LRU, and TTL cache policies and compare hit rate and memory behavior.

## 400. Project: Task Scheduler

Build a dependency-aware scheduler using a DAG, topological sorting, priorities, and bounded concurrency.

## 401. Project: Search Engine Mini-Lab

Index documents using token frequencies and inverted indexes, then support simple keyword search and ranking.

## 402. Project: Social Graph

Model users as a graph and implement friends-of-friends, connected components, shortest paths, and recommendations.

## 403. Project: Route Planner

Represent locations and weighted roads as a graph and implement shortest-path queries with Dijkstra.

## 404. Project: Notes Search

Extend your Notes application with indexing, prefix search, ranking, pagination, and efficient lookup structures.

## 405. DSA Study Routine

For every problem: understand → write examples → brute force → identify pattern → optimize → code → test → analyze complexity → explain.

## 406. Daily Practice Rule

Solve fewer problems deeply rather than collecting large numbers of copied solutions.

## 407. Repetition

Re-solve previously solved problems after several days without looking at the solution to test actual retention.

## 408. Spaced Revision

Maintain a list of patterns and revisit weak areas using progressively harder problems.

## 409. Pattern Notebook

For each pattern record: trigger, idea, invariant, template, complexity, edge cases, and one representative problem.

## 410. Solution Notebook

Keep failed approaches too. Understanding why an approach failed is part of algorithmic skill.

## 411. Brute Force Notebook

Record the simplest correct solution before optimization. It becomes a testing oracle for small inputs.

## 412. Complexity Notebook

Practice estimating complexity before running code.

## 413. Edge-Case Notebook

Track recurring traps such as empty arrays, duplicate values, negative numbers, overflow, cycles, disconnected graphs, and boundary indexes.

## 414. Mastery Check: Arrays

- [ ] I can explain array operation complexity.
- [ ] I can use two pointers.
- [ ] I can use sliding windows.
- [ ] I can use prefix sums.
- [ ] I can avoid accidental O(n²) work.

## 415. Mastery Check: Hashing

- [ ] I know when to use Map.
- [ ] I know when to use Set.
- [ ] I understand average-case hashing complexity.
- [ ] I can build frequency counters.

## 416. Mastery Check: Linked Lists

- [ ] I can implement a singly linked list.
- [ ] I can reverse a list.
- [ ] I can detect a cycle.
- [ ] I understand fast/slow pointers.

## 417. Mastery Check: Stack/Queue

- [ ] I can implement both.
- [ ] I understand LIFO/FIFO.
- [ ] I can recognize bracket/parser problems.
- [ ] I understand queue performance pitfalls.

## 418. Mastery Check: Trees

- [ ] I can implement DFS traversals.
- [ ] I can implement BFS.
- [ ] I understand BST invariants.
- [ ] I can reason about tree height.

## 419. Mastery Check: Graphs

- [ ] I can represent graphs.
- [ ] I can implement BFS/DFS.
- [ ] I understand cycles and visited state.
- [ ] I can topologically sort a DAG.

## 420. Mastery Check: Sorting/Search

- [ ] I can explain common sorting algorithms.
- [ ] I can implement binary search correctly.
- [ ] I understand comparator behavior.
- [ ] I can choose sorting + two pointers when appropriate.

## 421. Mastery Check: DP

- [ ] I can identify overlapping subproblems.
- [ ] I can define states.
- [ ] I can write transitions.
- [ ] I can optimize DP space when valid.

## 422. Mastery Check: Greedy

- [ ] I know that greedy requires justification.
- [ ] I can use exchange-argument intuition.
- [ ] I can search for counterexamples.

## 423. Mastery Check: Backtracking

- [ ] I can build a decision tree.
- [ ] I can undo choices.
- [ ] I can prune invalid branches.
- [ ] I understand output-size lower bounds.

## 424. Mastery Check: Advanced Structures

- [ ] I can explain heaps.
- [ ] I can explain Union-Find.
- [ ] I can explain Trie.
- [ ] I understand Fenwick and segment-tree use cases.

## 425. Mastery Check: Problem Solving

- [ ] I clarify constraints.
- [ ] I create examples.
- [ ] I derive brute force.
- [ ] I identify the bottleneck.
- [ ] I choose a pattern from evidence.
- [ ] I prove or justify the key invariant.
- [ ] I test edge cases.
- [ ] I analyze time and space.

## 426. Teach-Back Challenge

Teach a friend the difference between an array, Map, Set, stack, queue, linked list, tree, heap, and graph without showing code first.

## 427. Teach-Back Challenge

Take one sliding-window problem and explain exactly why the left pointer never needs to move backward.

## 428. Teach-Back Challenge

Explain binary search using its invariant and prove why the discarded half cannot contain the answer.

## 429. Teach-Back Challenge

Explain BFS shortest path in an unweighted graph and why first discovery gives the minimum edge distance.

## 430. Teach-Back Challenge

Explain Dijkstra and why a negative edge can invalidate its greedy assumption.

## 431. Teach-Back Challenge

Explain dynamic programming using state, transition, base case, evaluation order, and complexity.

## 432. Teach-Back Challenge

Explain why memoization can change an exponential recursive algorithm into polynomial or linear complexity for problems with overlapping subproblems.

## 433. Teach-Back Challenge

Explain the difference between a greedy proof and a greedy guess.

## 434. Final Mental Model

```text
Problem
 ↓
Constraints
 ↓
Data representation
 ↓
Brute force
 ↓
Pattern / invariant
 ↓
Algorithm
 ↓
Correctness
 ↓
Complexity
 ↓
Implementation
 ↓
Testing
 ↓
Optimization
```

# Final DSA Challenge

Build a **JavaScript DSA Laboratory** with the following requirements:

1. Implement dynamic arrays conceptually.
2. Implement stack.
3. Implement queue with head index.
4. Implement deque.
5. Implement singly linked list.
6. Implement doubly linked list.
7. Implement min heap.
8. Implement max heap.
9. Implement priority queue.
10. Implement BST.
11. Implement preorder/inorder/postorder traversal.
12. Implement BFS and DFS.
13. Implement adjacency-list and adjacency-matrix graphs.
14. Implement cycle detection.
15. Implement topological sorting.
16. Implement Union-Find.
17. Implement merge sort.
18. Implement quicksort.
19. Implement heap sort.
20. Implement binary search and lower/upper bounds.
21. Implement sliding-window utilities.
22. Implement prefix-sum utilities.
23. Implement monotonic stack.
24. Implement monotonic deque.
25. Implement Trie.
26. Implement Dijkstra.
27. Implement Bellman-Ford.
28. Implement Kruskal.
29. Implement Prim.
30. Implement Fenwick tree.
31. Implement segment tree.
32. Implement memoization utilities.
33. Solve representative dynamic-programming problems.
34. Solve representative backtracking problems.
35. Add randomized differential testing against brute-force solutions.
36. Display time and auxiliary-space complexity for each algorithm.
37. Visualize pointer movement where applicable.
38. Visualize graph traversal.
39. Visualize heap operations.
40. Visualize DP state transitions.
41. Add an interview mode that requires explanation before code.
42. Add an edge-case test suite.
43. Add a benchmark suite using representative inputs.
44. Document trade-offs for each data structure.
45. Write a final teaching guide explaining every implemented structure and algorithm.

**Mastery standard:** You are finished with this chapter when you can look at an unfamiliar problem, extract its constraints, choose a representation, derive a correct algorithm, explain its invariant, estimate complexity, implement it in JavaScript, test it against edge cases and brute force, and teach the solution without memorizing a code template.