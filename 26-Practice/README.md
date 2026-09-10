# 26 — Practice

> The practice chapter: a structured path from beginner repetition to advanced problem solving, debugging, interviews, and project-level JavaScript thinking.

## How to Use This Chapter

Practice is not just solving many questions. The goal is to build a loop:

```text
Understand → Predict → Code → Run → Debug → Explain → Refactor → Repeat
```

Do not immediately read a solution. First write your own hypothesis, test it, and identify exactly where your reasoning failed.

---

# PART A — PRACTICE SYSTEM

## 1. What Makes Practice Effective?

Good practice forces retrieval, reasoning, implementation, debugging, and explanation.

---

## 2. The Five-Step Attempt Rule

For every problem:

1. Read the requirement.
2. Write examples.
3. Describe the algorithm in plain English.
4. Implement it.
5. Test edge cases.

---

## 3. Predict Before Running

Before executing code, predict:

```text
output
value types
mutations
errors
side effects
```

Then compare your prediction with reality.

---

## 4. Explain Your Failure

A wrong answer is valuable when you can state:

```text
I expected X because...
The program produced Y because...
The rule I misunderstood was...
```

---

## 5. Difficulty Levels

```text
Level 1 → syntax
Level 2 → logic
Level 3 → composition
Level 4 → debugging
Level 5 → design
Level 6 → system/project
```

---

## 6. Do Not Memorize Solutions

If you remember a solution, change the inputs, constraints, or required output and solve again.

---

## 7. Practice Without Tutorials

Use documentation for syntax or APIs, not as a replacement for reasoning.

---

## 8. Timeboxing

Suggested limits:

```text
Easy: 10–20 min
Medium: 20–45 min
Hard: 45–90 min
```

The goal is learning, not racing.

---

## 9. When Stuck

Use this ladder:

```text
Restate problem
 ↓
Create tiny example
 ↓
Identify inputs/outputs
 ↓
Write pseudocode
 ↓
Trace manually
 ↓
Try implementation
 ↓
Inspect error
```

---

## 10. Solution Rule

If you need a solution, study it actively, close it, then recreate it from understanding.

---

# PART B — BEGINNER FUNDAMENTALS

## 11. Print a Message

Write a function that prints a greeting.

## 12. Return a Value

Write a function that returns a greeting instead of printing it.

## 13. Add Two Numbers

Return the sum of two numeric arguments.

## 14. Subtract Two Numbers

Return the difference.

## 15. Multiply Two Numbers

Return the product.

## 16. Divide Safely

Handle division by zero deliberately.

## 17. Calculate Rectangle Area

Use width × height.

## 18. Calculate Circle Area

Use the appropriate mathematical constant.

## 19. Convert Celsius

Convert Celsius to Fahrenheit.

## 20. Convert Minutes

Convert minutes into hours and remaining minutes.

## 21. Even or Odd

Return whether an integer is even or odd.

## 22. Positive, Negative, or Zero

Classify a number.

## 23. Largest of Two

Return the larger value.

## 24. Largest of Three

Solve without sorting the input.

## 25. Voting Eligibility

Return eligibility from an age value.

## 26. Grade Calculator

Convert a score into a grade using explicit boundaries.

## 27. Leap Year

Implement the Gregorian leap-year rule.

## 28. FizzBuzz

Print or return Fizz, Buzz, FizzBuzz, or the number.

## 29. Sum 1 to N

Calculate the sum from 1 through N.

## 30. Factorial

Implement factorial iteratively.

## 31. Reverse a Number

Return the reversed integer representation.

## 32. Count Digits

Count decimal digits without converting to a string first.

## 33. Sum Digits

Return the sum of all decimal digits.

## 34. Palindrome Number

Determine whether a number reads the same backward.

## 35. Prime Check

Test whether a positive integer is prime.

## 36. Print Primes

Print primes from 2 through N.

## 37. Power Function

Implement integer exponentiation without using `Math.pow`.

## 38. Maximum of Array

Return the largest number without using `Math.max(...array)`.

## 39. Minimum of Array

Return the smallest number using a loop.

## 40. Array Sum

Return the sum of numeric elements.

## 41. Array Average

Return the arithmetic mean.

## 42. Count Even Numbers

Count how many array elements are even.

## 43. Count Odd Numbers

Count odd elements.

## 44. Search Array

Return the index of a target using a linear search.

## 45. Reverse Array

Create a reversed copy without mutating the original.

## 46. Copy Array

Create a shallow copy and prove that the original remains structurally unchanged.

## 47. Remove Duplicates

Return unique primitive values.

## 48. Find Second Largest

Handle duplicates and arrays with fewer than two distinct values.

## 49. Count Frequency

Return an object containing element frequencies.

## 50. Character Frequency

Count characters in a string.

---

# PART C — CONDITIONAL PRACTICE

## 51. Login Decision

Given username, password, verification, and blocked status, decide whether login succeeds.

## 52. Shipping Cost

Calculate shipping based on order amount and destination rules.

## 53. Discount Calculator

Apply tiered discounts.

## 54. Temperature Advice

Return advice for cold, mild, warm, and hot ranges.

## 55. Traffic Light

Map red/yellow/green to actions.

## 56. Month Days

Return the number of days for a month and year.

## 57. Triangle Validity

Check whether three lengths can form a triangle.

## 58. Triangle Type

Classify equilateral, isosceles, or scalene triangles.

## 59. Password Strength

Classify a password according to supplied rules.

## 60. Access Control

Combine role, verification, and account state.

## 61. Ticket Price

Calculate price from age and membership.

## 62. Electricity Bill

Calculate progressive charges by consumption slabs.

## 63. BMI Category

Classify BMI according to supplied thresholds.

## 64. Coordinate Quadrant

Identify the quadrant of a point.

## 65. Calculator

Implement `+`, `-`, `*`, and `/` with explicit invalid-operation handling.

## 66. Safe Ternary

Rewrite a nested conditional into readable logic without losing behavior.

## 67. Switch Practice

Implement a menu using `switch` and verify strict case matching.

## 68. Truthiness Test

Predict which values enter an `if` block.

## 69. Nullish Test

Compare `||` and `??` for empty strings, zero, false, null, and undefined.

## 70. Equality Test

Predict results for `==` and `===` and explain coercion where relevant.

---

# PART D — LOOP PRACTICE

## 71. Print 1–100

Use a `for` loop.

## 72. Print Even Numbers

Print even numbers from 1 to N.

## 73. Print Odd Numbers

Print odd numbers from 1 to N.

## 74. Multiplication Table

Generate a table for a number.

## 75. Reverse Countdown

Print N down to 1.

## 76. Sum Evens

Sum even integers through N.

## 77. Sum Odds

Sum odd integers through N.

## 78. Factorial Loop

Calculate factorial using iteration.

## 79. Fibonacci Loop

Generate the first N Fibonacci numbers.

## 80. Digit Loop

Process every digit of an integer.

## 81. Reverse Digits

Reverse digits using arithmetic.

## 82. Armstrong Number

Check an Armstrong/narcissistic number for the chosen digit definition.

## 83. Perfect Number

Check whether a number equals the sum of its proper divisors.

## 84. GCD

Implement Euclid's algorithm.

## 85. LCM

Calculate LCM using GCD.

## 86. Prime Range

Generate all primes up to N.

## 87. Nested Loop Pattern

Print a triangle of stars.

## 88. Number Pattern

Print increasing numeric rows.

## 89. Multiplication Grid

Create a two-dimensional multiplication table.

## 90. Break Practice

Stop a search at the first matching value.

## 91. Continue Practice

Skip invalid values while processing a range.

## 92. While Loop

Repeat until a condition becomes false.

## 93. Do-While Loop

Demonstrate guaranteed first execution.

## 94. Infinite Loop Diagnosis

Find and fix a loop whose update expression is skipped by `continue`.

## 95. Nested Break

Determine which loop a `break` exits.

## 96. Loop Complexity

Estimate the time complexity of a single and nested loop.

## 97. Early Exit

Compare a full scan with a search that exits early.

## 98. Loop Invariant

State what remains true after every iteration of a simple accumulation loop.

## 99. Off-by-One

Fix a loop using `<=` where `<` is required.

## 100. Reverse Without Mutation

Reverse an array using a loop into a new array.

---

# PART E — FUNCTION PRACTICE

## 101. Function Declaration

Create a reusable function with parameters.

## 102. Function Expression

Rewrite the function as an expression.

## 103. Arrow Function

Rewrite a simple transformation using an arrow function.

## 104. Default Parameter

Use a default value when an argument is omitted or undefined.

## 105. Rest Parameters

Create a function accepting any number of numeric arguments.

## 106. Spread Arguments

Call a function using an array of arguments.

## 107. Return Early

Refactor nested conditionals using guard clauses.

## 108. Pure Function

Write a function whose result depends only on its inputs.

## 109. Side Effect Detection

Identify which lines mutate external state.

## 110. Higher-Order Function

Write a function that accepts another function.

## 111. Callback

Pass a function into a processor function.

## 112. Closure

Create a counter that retains private state.

## 113. Factory Function

Return an object with behavior from a factory.

## 114. Recursion

Implement factorial recursively.

## 115. Recursive Sum

Sum numbers from 1 through N recursively.

## 116. Recursive Array Traversal

Process an array recursively.

## 117. Function Composition

Compose two transformations.

## 118. Currying

Convert a two-argument function into curried form.

## 119. Partial Application

Pre-fill one argument and return a new function.

## 120. Memoization

Cache deterministic function results and define the cache's correctness constraints.

---

# PART F — STRING PRACTICE

## 121. Reverse String

Return a reversed string.

## 122. Palindrome String

Ignore case according to the stated requirement.

## 123. Count Vowels

Count vowels using iteration.

## 124. Count Words

Define whitespace handling before implementing.

## 125. Capitalize Words

Convert a sentence to title-like capitalization.

## 126. Remove Spaces

Remove whitespace according to an explicit requirement.

## 127. Character Frequency

Return a frequency map.

## 128. First Non-Repeating Character

Return the first character with frequency one.

## 129. Anagram Check

Determine whether two strings contain the same character multiset.

## 130. Longest Word

Return the longest token and define tie behavior.

## 131. Truncate Text

Create a maximum-length display string.

## 132. Slug Generator

Convert a title into a URL-friendly slug.

## 133. Mask Email

Mask part of an email while preserving the required visible portion.

## 134. Run-Length Encoding

Compress repeated characters using counts.

## 135. Run-Length Decoding

Reverse the encoding.

## 136. Remove Duplicate Characters

Keep first occurrence order.

## 137. Rotate String

Rotate a string by K positions.

## 138. Longest Common Prefix

Find the longest shared prefix among strings.

## 139. String Search

Implement naive substring search without `includes`.

## 140. Balanced Parentheses String

Check bracket balance using a stack.

---

# PART G — ARRAY PRACTICE

## 141. Map Manually

Implement a simplified map operation.

## 142. Filter Manually

Implement a simplified filter operation.

## 143. Reduce Manually

Implement a simplified reduce operation with an explicit initial accumulator.

## 144. Find Manually

Return the first matching element.

## 145. Some Manually

Return whether any element satisfies a predicate.

## 146. Every Manually

Return whether all elements satisfy a predicate.

## 147. Flatten One Level

Flatten nested arrays by one level.

## 148. Flatten Completely

Implement recursive array flattening.

## 149. Chunk Array

Split an array into fixed-size groups.

## 150. Rotate Array

Rotate an array by K positions.

## 151. Move Zeros

Move zeros to the end while preserving non-zero order.

## 152. Two Sum

Return indices of two values adding to a target.

## 153. Three Sum

Find unique triplets according to the specified target.

## 154. Intersection

Find common values between arrays.

## 155. Union

Return unique values from multiple arrays.

## 156. Difference

Return values appearing in one collection but not another.

## 157. Missing Number

Find the missing integer in a known range.

## 158. Duplicate Number

Find a duplicate under stated constraints.

## 159. Majority Element

Find an element occurring more than half the time when guaranteed.

## 160. Sliding Window Sum

Find maximum sum for a fixed-size window.

## 161. Longest Unique Subarray

Use a sliding-window approach.

## 162. Merge Sorted Arrays

Merge two sorted arrays in linear time.

## 163. Binary Search

Search a sorted array in O(log n).

## 164. Search Insertion Point

Return where a target belongs in sorted order.

## 165. Sort 0, 1, 2

Solve using a linear-time partitioning strategy.

## 166. Product Except Self

Solve without division and target linear time.

## 167. Prefix Sum

Build prefix sums and answer range-sum queries.

## 168. Interval Merge

Merge overlapping intervals.

## 169. Meeting Conflicts

Determine whether intervals overlap.

## 170. Top K Elements

Solve with an appropriate frequency/heap strategy depending on constraints.

---

# PART H — OBJECT PRACTICE

## 171. Create User Object

Build an object from input values.

## 172. Read Nested Property

Safely access a nested value.

## 173. Add Property

Add a property dynamically.

## 174. Delete Property

Delete a property and explain the trade-offs.

## 175. Object Keys

Return an object's own enumerable keys.

## 176. Object Values

Return its own enumerable values.

## 177. Object Entries

Convert entries into a useful representation.

## 178. Group By

Group records by a chosen property.

## 179. Index By ID

Convert an array of entities into an ID-keyed object/map.

## 180. Deep Property Getter

Implement a safe path lookup.

## 181. Object Clone

Create a shallow clone and explain its limits.

## 182. Deep Clone Discussion

Compare structured cloning, serialization, and custom cloning.

## 183. Object Diff

Report changed top-level properties between two objects.

## 184. Pick Properties

Return only selected keys.

## 185. Omit Properties

Return an object without selected keys.

## 186. Immutable Update

Update nested state without mutating the original references.

## 187. Own Property Test

Compare `Object.hasOwn()` with `in`.

## 188. Prototype Investigation

Determine whether a property is own or inherited.

## 189. Descriptor Investigation

Inspect property descriptors and explain writable/enumerable/configurable.

## 190. Freeze Investigation

Demonstrate that `Object.freeze()` is shallow.

---

# PART I — COLLECTIONS

## 191. Set Deduplication

Remove duplicate primitive values with `Set`.

## 192. Set Intersection

Find common set members.

## 193. Set Difference

Find values present only in the first set.

## 194. Map Frequency

Count frequencies using `Map`.

## 195. Map Grouping

Group records with a `Map`.

## 196. Map vs Object

Explain when `Map` provides clearer semantics.

## 197. WeakMap Experiment

Create metadata associated with objects without preventing their collection in principle; explain that garbage collection is not directly observable as a correctness mechanism.

## 198. WeakSet Experiment

Store object membership without using it as an iterable collection.

## 199. Iterable Practice

Write a custom iterable with `Symbol.iterator`.

## 200. Generator Practice

Create a generator that yields a sequence lazily.

---

# PART J — ASYNC PRACTICE

## 201. Promise Creation

Create a Promise that resolves after a delay.

## 202. Promise Chaining

Chain dependent asynchronous operations.

## 203. Promise Rejection

Handle an expected rejection with `catch`.

## 204. Async/Await

Rewrite promise chaining using `async`/`await`.

## 205. Sequential Requests

Run requests one after another when order matters.

## 206. Parallel Requests

Use `Promise.all` when tasks are independent.

## 207. Partial Success

Use `Promise.allSettled` when every result matters even if some fail.

## 208. Race

Use `Promise.race` for a first-settling strategy and explain why it does not cancel the other operations automatically.

## 209. Any

Use `Promise.any` when the first fulfilled result is acceptable.

## 210. Timeout Wrapper

Build a timeout helper around a Promise using cancellation when the underlying operation supports it.

## 211. Retry Helper

Implement bounded retries with exponential backoff and jitter.

## 212. Abort Fetch

Cancel a fetch with `AbortController`.

## 213. Async Error Propagation

Trace an error through multiple `await` layers.

## 214. Concurrency Limit

Implement a worker pool that limits concurrent tasks.

## 215. Async Queue

Create a simple FIFO task queue.

## 216. Debounce Async Work

Design a debounced search workflow and handle stale responses.

## 217. Polling

Poll an endpoint with timeout, cancellation, and bounded retry semantics.

## 218. Sequential Dependency

Fetch a user, then fetch data requiring the user's ID.

## 219. Parallel Dependency

Fetch independent profile data concurrently.

## 220. Async Iterator

Consume an async iterable with `for await...of`.

---

# PART K — DOM PRACTICE

## 221. Select an Element

Use `getElementById` and `querySelector` correctly.

## 222. Create an Element

Create and append a new DOM node.

## 223. Text Update

Update visible text using `textContent`.

## 224. Class Toggle

Toggle a CSS class.

## 225. Attribute Update

Set and read an attribute.

## 226. Event Listener

Respond to a button click.

## 227. Event Delegation

Handle clicks from a dynamic list using one ancestor listener.

## 228. Form Validation

Validate a form and display accessible errors.

## 229. Todo List

Build add, toggle, delete, and filter behavior.

## 230. Search UI

Filter records from user input.

## 231. Modal

Build open, close, Escape, and backdrop behavior.

## 232. Tabs

Implement keyboard-aware tab switching.

## 233. Accordion

Build expandable sections with accessible state.

## 234. Debounced Search UI

Reduce unnecessary search calls while preserving correct results.

## 235. Local Storage Notes

Persist notes using string serialization and handle malformed stored data.

## 236. Pagination UI

Render pages from a paginated API response.

## 237. Infinite Scroll

Use `IntersectionObserver` and prevent duplicate loading.

## 238. Drag and Drop

Build a simple reorder interaction and define keyboard alternatives.

## 239. Theme Toggle

Persist a light/dark preference and avoid unnecessary flashes where possible.

## 240. Accessible Toast

Build a notification region appropriate for dynamic status messages.

---

# PART L — NETWORKING PRACTICE

## 241. GET Request

Fetch JSON and handle non-OK HTTP responses explicitly.

## 242. POST Request

Send JSON with the correct content type.

## 243. PATCH Request

Update selected fields.

## 244. DELETE Request

Handle successful and error responses.

## 245. HTTP Error Handling

Remember: `fetch()` does not reject merely because the server returns 4xx/5xx.

## 246. JSON Error Handling

Handle invalid JSON separately from network failure.

## 247. Loading State

Design loading, success, empty, and error states.

## 248. Cancellable Search

Abort obsolete requests.

## 249. Optimistic Update

Update UI first, then roll back safely if the server rejects the operation.

## 250. Pagination API

Implement cursor or offset pagination according to an explicit contract.

## 251. Authentication Header

Attach a bearer token where the API contract requires it; never log tokens.

## 252. Cookie Request

Understand when browser credentials are included and how server CORS policy affects cross-origin requests.

## 253. CORS Diagnosis

Use browser Network/Console information to distinguish CORS enforcement from server-side failures.

## 254. ETag Practice

Implement conditional requests conceptually using `If-None-Match` and `ETag`.

## 255. WebSocket Client

Connect, receive messages, handle close/error, and clean up listeners.

## 256. SSE Client

Consume server-sent events and handle reconnection semantics.

## 257. Upload Progress Design

Research appropriate browser upload APIs and distinguish progress from completion.

## 258. API Client Wrapper

Create one reusable request abstraction without hiding important error semantics.

## 259. Request ID

Send or propagate a correlation/request ID where the API supports it.

## 260. Rate-Limit Handling

Handle `429` responses with server-provided retry guidance when available.

---

# PART M — DEBUGGING PRACTICE

## 261. Syntax Error

Given broken syntax, identify the parser's first meaningful complaint.

## 262. ReferenceError

Find an identifier that is not available in the current scope.

## 263. TypeError

Find an invalid operation on a value.

## 264. Logic Bug

Find code that runs successfully but returns the wrong result.

## 265. Off-by-One Bug

Find an incorrect loop boundary.

## 266. Mutation Bug

Find an unintended array/object mutation.

## 267. Async Race

Find a stale response overwriting newer state.

## 268. Missing Await

Find a Promise accidentally passed where a resolved value was expected.

## 269. Unhandled Rejection

Trace an asynchronous failure without an appropriate consumer.

## 270. Event Listener Leak

Find a listener added repeatedly without cleanup.

## 271. Timer Leak

Find timers that survive longer than intended.

## 272. Detached DOM

Explain how references can keep removed DOM structures reachable.

## 273. Closure Leak

Identify a long-lived closure retaining unnecessarily large state.

## 274. Infinite Loop

Identify which condition never becomes false.

## 275. Stack Overflow

Trace recursive calls without a valid base case.

## 276. Wrong `this`

Determine the `this` behavior of regular versus arrow functions.

## 277. Prototype Bug

Determine why an inherited property is unexpectedly visible.

## 278. `sort()` Bug

Fix numeric sorting when default lexicographic behavior was used accidentally.

## 279. `map()` Bug

Find a callback that forgets to return its transformed value.

## 280. `forEach()` Async Bug

Explain why `await array.forEach(async ...)` does not await all operations.

---

# PART N — OUTPUT PREDICTION

## 281. Scope Prediction

Predict output involving `let`, `const`, and block scope.

## 282. Hoisting Prediction

Predict declarations and temporal-dead-zone behavior.

## 283. Closure Prediction

Predict values captured by nested functions.

## 284. Reference Prediction

Predict behavior when two variables reference the same object.

## 285. Shallow Copy Prediction

Predict which nested values are shared after object spread.

## 286. Array Mutation Prediction

Predict results after `push`, `splice`, `sort`, and `reverse`.

## 287. Equality Prediction

Predict strict and loose equality results.

## 288. Coercion Prediction

Predict explicit and implicit conversion.

## 289. Logical Operator Prediction

Predict values returned by `&&`, `||`, and `??`.

## 290. Ternary Prediction

Predict the value returned by nested conditional expressions.

## 291. `switch` Prediction

Predict the selected case and fall-through.

## 292. Loop Prediction

Trace `break`, `continue`, and loop updates.

## 293. Promise Prediction

Predict microtask ordering for simple Promise chains.

## 294. Timer Prediction

Predict relative ordering of timers and Promise callbacks without assuming exact timer delays.

## 295. Event Loop Prediction

Trace synchronous code, microtasks, and task callbacks at a conceptual level.

## 296. `this` Prediction

Predict `this` in method, detached-function, constructor, and arrow-function contexts.

## 297. Prototype Prediction

Predict property lookup through the prototype chain.

## 298. Class Prediction

Predict constructor, method, inheritance, and override behavior.

## 299. Generator Prediction

Trace `next()` results and yielded values.

## 300. Async Prediction

Predict when an async function returns a Promise and when `await` resumes.

---

# PART O — INTERMEDIATE ALGORITHMS

## 301. Linear Search

Implement and analyze O(n) search.

## 302. Binary Search

Implement O(log n) search over sorted data.

## 303. Selection Sort

Implement and analyze its quadratic behavior.

## 304. Insertion Sort

Implement and understand best-case behavior on nearly sorted data.

## 305. Merge Sort

Implement divide-and-conquer sorting.

## 306. Quick Sort

Implement partition-based sorting and discuss worst-case behavior.

## 307. Stack

Implement a stack using an array.

## 308. Queue

Implement a queue with appropriate front-removal considerations.

## 309. Deque

Implement double-ended operations.

## 310. Linked List

Create append, prepend, search, and delete operations.

## 311. Reverse Linked List

Reverse pointers iteratively.

## 312. Detect Cycle

Use fast/slow pointers.

## 313. Hash Table

Implement a simplified hash table and discuss collisions.

## 314. Frequency Counter

Use a map to reduce repeated searches.

## 315. Sliding Window

Solve a fixed-size and variable-size window problem.

## 316. Two Pointers

Solve a sorted-array pair problem.

## 317. Recursion Tree

Draw the call tree for a recursive algorithm.

## 318. Backtracking

Generate permutations of a small array.

## 319. Subsets

Generate the power set.

## 320. Binary Tree Traversal

Implement preorder, inorder, and postorder traversal.

## 321. Breadth-First Search

Traverse a graph level by level.

## 322. Depth-First Search

Traverse a graph recursively and iteratively.

## 323. Shortest Unweighted Path

Use BFS to find shortest edge count.

## 324. Topological Sort

Order a directed acyclic graph.

## 325. Dijkstra

Implement shortest paths for graphs with nonnegative edge weights.

## 326. Dynamic Programming

Solve Fibonacci with memoization and tabulation.

## 327. Coin Change

Solve a coin-change variant and define whether the goal is minimum coins or number of combinations.

## 328. Knapsack

Solve a 0/1 knapsack variant.

## 329. Interval Scheduling

Select maximum compatible intervals.

## 330. Complexity Review

Give time and space complexity for ten algorithms you implemented.

---

# PART P — ADVANCED JAVASCRIPT CHALLENGES

## 331. Implement Debounce

Support cancellation and preserve the intended call context/arguments.

## 332. Implement Throttle

Define leading/trailing behavior before coding.

## 333. Implement Memoize

Define cache key semantics before implementation.

## 334. Implement Once

Ensure a function executes at most once.

## 335. Implement Compose

Compose functions right-to-left or define your own order explicitly.

## 336. Implement Pipe

Compose functions left-to-right.

## 337. Implement Curry

Support partial argument accumulation.

## 338. Implement Deep Equal

Compare supported data structures recursively and document unsupported cases.

## 339. Implement Deep Clone

Use `structuredClone` where supported, or define the supported subset for a custom implementation.

## 340. Implement Event Emitter

Support `on`, `off`, and `emit` with clear listener semantics.

## 341. Implement Pub/Sub

Use an intermediary channel abstraction.

## 342. Implement Retry

Support bounded attempts and delay policy.

## 343. Implement Concurrency Limiter

Limit active asynchronous tasks.

## 344. Implement Promise Pool

Run a large task list with a maximum concurrency.

## 345. Implement Async Queue

Support producers and consumers safely.

## 346. Implement LRU Cache

Define eviction and recency semantics.

## 347. Implement TTL Cache

Define expiration and cleanup behavior.

## 348. Implement Rate Limiter

Implement a simple in-memory token-bucket or sliding-window model and state its single-process limitation.

## 349. Implement Result Type

Represent success and failure explicitly without relying only on exceptions.

## 350. Implement Validation Pipeline

Compose reusable validation functions.

## 351. Implement Middleware Chain

Build a Koa-like or Express-like conceptual middleware pipeline.

## 352. Implement Dependency Injection

Build a small manual dependency composition root.

## 353. Implement Repository Fake

Create an in-memory repository for tests.

## 354. Implement State Machine

Model a finite workflow with explicit states and transitions.

## 355. Implement Command Queue

Queue commands and process them sequentially.

## 356. Implement Observer

Notify subscribers on state changes.

## 357. Implement Adapter

Wrap an incompatible API behind your own interface.

## 358. Implement Strategy

Swap algorithms through a common capability contract.

## 359. Implement Factory

Create objects based on configuration.

## 360. Implement Circuit Breaker

Model closed, open, and half-open states with bounded recovery behavior.

---

# PART Q — TESTING PRACTICE

## 361. Unit Test a Pure Function

Test normal, boundary, and invalid inputs.

## 362. Table-Driven Tests

Represent multiple input/output cases as data.

## 363. Test a Reducer

Verify state transitions without depending on UI rendering.

## 364. Test Async Success

Test resolved asynchronous behavior.

## 365. Test Async Failure

Test rejection and error handling.

## 366. Test Timeout

Use controlled time facilities appropriate to your test framework and restore them afterward.

## 367. Test API Integration

Verify request, validation, database behavior, and response contract together.

## 368. Test Repository

Verify persistence behavior against an appropriate test database or isolated fake.

## 369. Test React Behavior

Test user-visible behavior rather than private implementation details.

## 370. Test Form Validation

Verify accessible error presentation and submission behavior.

## 371. Test Network Failure

Simulate realistic server failure behavior.

## 372. Test Race Conditions

Create controlled competing requests and verify stale results cannot overwrite newer state.

## 373. Property-Based Thinking

Write general properties that must remain true across many generated inputs.

## 374. Mutation Testing

Intentionally change code and check whether tests detect the defect.

## 375. Coverage Interpretation

Explain why coverage measures execution, not correctness.

## 376. Flaky Test Investigation

Identify timing, shared state, randomness, environment, or ordering causes instead of blindly retrying.

## 377. Test Isolation

Ensure parallel tests do not corrupt shared resources.

## 378. Security Test Boundary

Test authorized security behavior without using destructive or unauthorized actions.

## 379. Performance Test

Define workload, environment, metric, warm-up, and acceptance criteria.

## 380. Contract Test

Verify an API consumer and provider agree on important contract behavior.

---

# PART R — CODE REVIEW PRACTICE

## 381. Naming Review

Can every important variable and function be understood without guessing?

## 382. Responsibility Review

Does each function have a coherent reason to change?

## 383. Mutation Review

Identify hidden mutations of shared state.

## 384. Error Review

Check whether errors are handled at the correct boundary.

## 385. Async Review

Look for missing awaits, unhandled rejections, and accidental serial execution.

## 386. Security Review

Look for unsafe HTML, exposed secrets, authorization gaps, and untrusted input misuse.

## 387. Performance Review

Look for unnecessary repeated work, large allocations, excessive rendering, and inefficient queries.

## 388. API Review

Check validation, status codes, response contracts, authentication, and authorization.

## 389. Architecture Review

Check dependency direction and module boundaries.

## 390. Readability Review

Ask whether a future developer can modify the code without reconstructing hidden assumptions.

---

# PART S — PROJECT CHALLENGES

## 391. Beginner: Counter

Build increment, decrement, reset, and persisted state.

## 392. Beginner: Calculator

Support operations, clear, error states, and keyboard input.

## 393. Beginner: Quiz App

Use four options, score tracking, explanations, and restart behavior.

## 394. Beginner: Todo App

Add, edit, complete, delete, filter, and persist tasks.

## 395. Beginner: Password Generator

Generate configurable passwords and explain randomness limitations.

## 396. Beginner: Color Generator

Generate RGB/HSL/HEX colors and display conversions.

## 397. Beginner: Expense Tracker

Add transactions, calculate totals, filter categories, and persist data.

## 398. Beginner: Notes App

Create, edit, delete, search, pin, and persist notes.

## 399. Intermediate: Weather Dashboard

Consume an API with loading/error/empty states and caching considerations.

## 400. Intermediate: GitHub Profile Viewer

Search profiles and repositories through an API.

## 401. Intermediate: Markdown Editor

Build editing and preview with safe rendering considerations.

## 402. Intermediate: Kanban Board

Support columns, drag/drop, persistence, and filtering.

## 403. Intermediate: URL Shortener UI

Build a frontend against a backend API and handle failures.

## 404. Intermediate: Chat UI

Build message state, optimistic sending, reconnect handling, and pagination.

## 405. Intermediate: E-Commerce Cart

Model products, cart state, pricing, and checkout boundaries.

## 406. Intermediate: Auth Dashboard

Implement protected routes and server-enforced authorization.

## 407. Intermediate: File Manager

Implement folders, upload UI, search, pagination, and permissions.

## 408. Advanced: Real-Time Notes

Synchronize edits and explicitly design conflict behavior.

## 409. Advanced: Offline Notes

Use IndexedDB and a synchronization strategy with conflict handling.

## 410. Advanced: Collaborative Editor

Research OT/CRDT approaches and implement a deliberately scoped prototype.

## 411. Advanced: Search Engine

Build indexing, tokenization, ranking, and pagination for a small dataset.

## 412. Advanced: Job Queue

Build producer, worker, retry, dead-letter, and observability behavior.

## 413. Advanced: API Gateway Prototype

Route requests, add request IDs, enforce limits, and preserve downstream errors safely.

## 414. Advanced: Feature Flag System

Build configuration, targeting, evaluation, and audit behavior.

## 415. Advanced: Notification Platform

Support email, in-app, and push adapters behind a common application boundary.

## 416. Full-Stack: Notes Platform

Build the complete Notes system with authentication, folders, tags, sharing, search, trash, archive, and tests.

## 417. Full-Stack: Notes Architecture

Apply the Architecture chapter: module boundaries, use cases, ports, adapters, DTOs, validation, observability, and ADRs.

## 418. Full-Stack: Notes Reliability

Add timeouts, idempotency, retries for suitable transient failures, and graceful degradation.

## 419. Full-Stack: Notes Events

Implement selected domain/application events and an outbox where transactional support and product requirements justify it.

## 420. Full-Stack: Notes Testing

Build unit, integration, contract, and critical E2E coverage with realistic boundaries.

---

# PART T — INTERVIEW PRACTICE

## 421. Explain `let`, `const`, and `var`.

Focus on scope, reassignment, redeclaration, hoisting behavior, and modern usage.

## 422. Explain Primitive Immutability.

Explain that changing a string creates a new value rather than mutating the existing string value.

## 423. Explain Closures.

A closure retains access to lexical variables from its defining environment.

## 424. Explain the Event Loop.

Explain synchronous execution, task scheduling, and microtask behavior without claiming a single universal queue model for every host.

## 425. Explain Promises.

Explain pending, fulfilled, rejected, chaining, and error propagation.

## 426. Explain `async`/`await`.

An async function returns a Promise; `await` suspends that async function until the awaited value settles.

## 427. Explain Prototypes.

Property lookup can continue through an object's prototype chain.

## 428. Explain `this`.

For ordinary functions, `this` depends on call context; arrow functions capture lexical `this`.

## 429. Explain Shallow Copy.

Top-level properties are copied, but nested object references can remain shared.

## 430. Explain Deep Clone.

A deep clone recursively separates nested references according to supported data types and semantics.

## 431. Explain Map vs Object.

Compare key semantics, iteration, prototypes, API clarity, and intended use.

## 432. Explain Set.

A collection of unique values using SameValueZero equality semantics.

## 433. Explain `map` vs `forEach`.

`map` creates a transformed array; `forEach` is primarily for side effects and returns undefined.

## 434. Explain `reduce`.

It folds an array into an accumulator that can have any chosen result type.

## 435. Explain `sort`.

Default sorting compares string representations; numeric sorting requires an appropriate comparator.

## 436. Explain Fetch Errors.

HTTP error status does not automatically reject `fetch`; inspect `response.ok` or `status`.

## 437. Explain CORS.

CORS is a browser-enforced cross-origin access mechanism controlled by server response headers; it is not authentication or authorization.

## 438. Explain Cookies.

Cookies are browser-managed state sent according to cookie rules; `HttpOnly` prevents JavaScript access but does not prevent network transmission.

## 439. Explain CSRF.

CSRF exploits ambient credentials such as cookies; defenses depend on authentication design and request validation.

## 440. Explain XSS.

XSS occurs when attacker-controlled content executes as script in a trusted origin context; output encoding and safe DOM APIs are important defenses.

## 441. Explain Dependency Injection.

Dependencies are supplied from outside rather than constructed invisibly inside the consumer.

## 442. Explain SOLID.

Describe SRP, OCP, LSP, ISP, and DIP as design heuristics rather than absolute laws.

## 443. Explain Repository.

A repository is a persistence boundary; it is useful when that boundary provides meaningful isolation or abstraction.

## 444. Explain Clean Architecture.

Explain dependency direction toward stable application/domain policy.

## 445. Explain Modular Monolith.

One deployable system with explicit internal module boundaries.

## 446. Explain Microservices.

Independently deployable services with distributed-system and operational costs.

## 447. Explain Idempotency.

An operation is idempotent when repeating it produces the same intended final effect; server-side semantics are required.

## 448. Explain Outbox.

Persist state change and event record atomically where supported, then publish asynchronously.

## 449. Explain Testing Levels.

Unit, integration, contract, and E2E tests answer different questions; no universal ratio applies.

## 450. Explain Test Coverage.

Coverage indicates executed code paths, not absence of defects.

---

# PART U — TEACH-BACK CHALLENGES

## 451. Teach Variables

Explain declarations, initialization, reassignment, and scope to a complete beginner.

## 452. Teach Data Types

Explain primitives and objects with practical examples.

## 453. Teach Conditionals

Explain how a program chooses between branches.

## 454. Teach Loops

Explain repetition, termination, and off-by-one errors.

## 455. Teach Functions

Explain parameters, arguments, return values, and reusable behavior.

## 456. Teach Scope

Draw lexical scope with nested functions.

## 457. Teach Closures

Build a private counter and explain why state remains available.

## 458. Teach Arrays

Explain indexing, mutation, iteration, and transformation.

## 459. Teach Objects

Explain properties, references, prototypes, and methods.

## 460. Teach Async JavaScript

Draw the flow from initiating an operation to consuming its Promise result.

## 461. Teach Fetch

Explain request, response, status, body parsing, and failure handling.

## 462. Teach DOM

Explain how JavaScript reads and changes document nodes.

## 463. Teach Event Delegation

Explain bubbling and why one ancestor listener can handle dynamic children.

## 464. Teach Modules

Explain imports, exports, module boundaries, and dependency direction.

## 465. Teach OOP

Explain classes, prototypes, composition, and inheritance.

## 466. Teach Functional Programming

Explain pure functions, immutability, composition, and higher-order functions.

## 467. Teach DSA

Explain why data structures and algorithms affect time and space complexity.

## 468. Teach Testing

Explain evidence, isolation, integration, and user behavior.

## 469. Teach TypeScript

Explain compile-time type checking versus runtime validation.

## 470. Teach Architecture

Explain boundaries, dependencies, trade-offs, and change isolation.

---

# PART V — FINAL MASTER CHALLENGES

## 471. Build Without a Tutorial

Choose a small application and build it from requirements only.

## 472. Write Requirements First

Define users, inputs, outputs, constraints, and failure cases.

## 473. Design Before Coding

Draw the UI/data-flow diagram before implementation.

## 474. Define Data Model

Write entities and relationships.

## 475. Define API Contract

Write request/response/error contracts before frontend integration.

## 476. Implement Happy Path

Make the simplest valid workflow work end-to-end.

## 477. Add Validation

Reject invalid input at appropriate trust boundaries.

## 478. Add Error Handling

Define expected failures and safe user-facing behavior.

## 479. Add Tests

Protect core behavior with focused tests.

## 480. Add Accessibility

Keyboard navigation, labels, focus management, semantic HTML, and status announcements where appropriate.

## 481. Add Performance Measurement

Measure before optimizing.

## 482. Add Security Review

Review authentication, authorization, input handling, output handling, secrets, and abuse controls.

## 483. Add Observability

Add safe structured logs and useful metrics.

## 484. Refactor

Reduce duplication, clarify names, and strengthen boundaries.

## 485. Write ADR

Record one major architecture decision and its consequences.

## 486. Teach the Project

Explain the complete system without opening the source code.

## 487. Rebuild a Feature

Delete one non-critical feature and rebuild it from memory.

## 488. Change the Requirement

Add a new rule and observe whether your architecture isolates the change.

## 489. Break the Dependency

Replace one external implementation with a fake or adapter.

## 490. Debug Production-Like Failure

Inject timeout, malformed data, duplicate request, and dependency failure scenarios.

## 491. Optimize a Bottleneck

Profile first, then optimize the measured bottleneck.

## 492. Reduce Complexity

Remove an abstraction or layer and compare the result.

## 493. Review Another Solution

Explain its strengths, weaknesses, complexity, and edge cases.

## 494. Implement From Pseudocode

Turn a plain-English algorithm into tested JavaScript.

## 495. Implement From Tests

Write tests first for a small pure function, then implement the minimum behavior.

## 496. Implement From API Contract

Build a client against a written contract without seeing server internals.

## 497. Refactor Legacy Code

Add characterization tests, identify seams, then incrementally improve structure.

## 498. Build Under Constraints

Solve a problem with an explicit memory or time constraint.

## 499. Explain Complexity

Defend your algorithm's time and space complexity.

## 500. Final Master Challenge

Build the full-stack Notes platform without following a tutorial step-by-step.

Required loop:

```text
Requirements
 ↓
Architecture
 ↓
Data model
 ↓
API contract
 ↓
Implementation
 ↓
Tests
 ↓
Debugging
 ↓
Security review
 ↓
Performance measurement
 ↓
Refactoring
 ↓
Documentation
 ↓
Teach-back
```

---

# PRACTICE TRACKER

## Beginner

- [ ] 11–50
- [ ] 51–70
- [ ] 71–100

## Intermediate

- [ ] 101–170
- [ ] 171–220
- [ ] 221–260

## Debugging + Reasoning

- [ ] 261–300
- [ ] 381–390

## Algorithms

- [ ] 301–330

## Advanced JavaScript

- [ ] 331–360

## Testing

- [ ] 361–380

## Projects

- [ ] 391–420

## Interviews

- [ ] 421–450

## Teaching

- [ ] 451–470

## Mastery

- [ ] 471–500

---

# THE PRACTICE RULE

> **Do not measure mastery by how many solutions you have seen. Measure it by how many problems you can solve, debug, explain, modify, and rebuild without the tutorial.**
