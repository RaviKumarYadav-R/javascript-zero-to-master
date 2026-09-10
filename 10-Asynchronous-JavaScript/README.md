# 10 — Asynchronous JavaScript

> Learn how JavaScript handles work that finishes later: callbacks, timers, Promises, `async/await`, event loops, microtasks, cancellation, concurrency, streams, retries, and production-grade async design.

---

## 1. What Is Asynchronous JavaScript?

Asynchronous JavaScript allows a program to start work and continue doing other work before that operation finishes.

```text
Start operation
      ↓
Continue JavaScript
      ↓
Operation finishes later
      ↓
Run continuation
```

---

## 2. Why Asynchronous JavaScript Exists

Network requests, timers, file operations, user events, and other external operations can take unpredictable amounts of time.

JavaScript needs a way to remain responsive while waiting.

---

## 3. Synchronous vs Asynchronous

Synchronous code executes in sequence and waits for each operation to finish.

Asynchronous code schedules continuation work so the current execution can continue.

---

## 4. Blocking vs Non-Blocking

Blocking means the current execution cannot proceed until an operation completes.

Non-blocking APIs allow other work to proceed while the operation is pending.

---

## 5. JavaScript Is Single-Threaded at the Language Execution Level

A typical JavaScript execution context processes synchronous JavaScript on one main thread.

Host environments can use additional threads or processes for underlying operations.

---

## 6. Asynchronous Does Not Mean Parallel

Asynchronous scheduling and parallel execution are different concepts.

```text
Async → work can complete later
Parallel → work can execute simultaneously
```

---

## 7. The Runtime Model

JavaScript works together with a host environment.

```text
JavaScript engine
       +
Host APIs
       +
Task / microtask scheduling
```

The exact event-loop model depends on the host.

---

## 8. Browser Host APIs

Browsers provide APIs such as:

- timers
- DOM events
- Fetch
- WebSocket
- Web APIs

These are host capabilities, not all ECMAScript language features.

---

## 9. Node.js Host APIs

Node.js provides APIs for:

- filesystem operations
- networking
- timers
- streams
- processes
- events

Node does not provide browser `window` and DOM APIs by default.

---

## 10. The Call Stack

Synchronous function calls create stack frames.

```text
main()
 ↓
foo()
 ↓
bar()
```

The currently executing function is at the top.

---

## 11. Why Long Synchronous Work Blocks

If the call stack remains busy with expensive JavaScript, other JavaScript tasks cannot run on that same execution thread.

This can make a browser interface feel frozen.

---

## 12. Event Loop Mental Model

A simplified model is:

```text
Task
 ↓
Run synchronous JS
 ↓
Drain microtasks
 ↓
Rendering opportunity / host work
 ↓
Next task
```

This is a teaching model, not a complete specification of every host scheduling detail.

---

## 13. Task

A task is a unit of work scheduled by the host's task/event mechanisms.

Examples can include timer callbacks and user-event dispatches.

---

## 14. Microtask

A microtask is scheduled work processed by the host's microtask/job mechanism.

Promise reactions and `queueMicrotask()` are common examples.

---

## 15. Microtasks Usually Run Before the Next Task

After the current synchronous execution completes, pending microtasks are generally processed before moving to a later task.

This explains many Promise ordering questions.

---

## 16. `queueMicrotask()`

```js
console.log("A");

queueMicrotask(() => {
  console.log("B");
});

console.log("C");
```

Output:

```text
A
C
B
```

---

## 17. `setTimeout()`

`setTimeout()` asks the host to schedule a callback after a minimum delay.

It does not guarantee execution exactly at that delay.

---

## 18. Timer Delay Is Not Execution Time

```js
setTimeout(() => console.log("later"), 0);
```

`0` means the callback is eligible after the required scheduling conditions, not "run immediately."

---

## 19. Why Zero-Millisecond Timers Wait

The current synchronous task must finish first.

Then the callback becomes eligible according to host scheduling rules.

---

## 20. `setInterval()`

`setInterval()` schedules repeated callbacks.

It should be cleared when the repeating work is no longer needed.

---

## 21. `clearTimeout()`

```js
const id = setTimeout(doWork, 1000);
clearTimeout(id);
```

Use it to cancel a pending timer when supported by the host.

---

## 22. `clearInterval()`

```js
const id = setInterval(check, 1000);
clearInterval(id);
```

This prevents future interval callbacks from that timer.

---

## 23. Callback Basics

A callback is a function passed to another API so it can be invoked later or during an operation.

```js
setTimeout(() => {
  console.log("done");
}, 1000);
```

---

## 24. Callback-Based Asynchrony

Older APIs often communicate completion through callbacks.

```js
readFile(path, (error, data) => {
  // handle result
});
```

---

## 25. Error-First Callback Convention

Many Node-style APIs historically use:

```js
callback(error, result);
```

`error` is usually null/undefined on success.

---

## 26. Callback Hell

Deep nesting can make control flow difficult to read.

```text
request
  └─ request
      └─ request
          └─ request
```

Promises provide a composable alternative.

---

## 27. Inversion of Control

When you give a callback to another system, that system controls when the callback runs.

This can make ownership and error handling harder to reason about.

---

## 28. Callback Error Trap

A throw occurring inside a later asynchronous callback is not caught by a surrounding synchronous `try...catch` that has already finished.

---

## 29. Promise Definition

A Promise is an object representing the eventual outcome of an asynchronous or future computation.

It can be pending, fulfilled, or rejected.

---

## 30. Promise States

```text
          ┌───────────┐
          │  pending  │
          └─────┬─────┘
          ┌─────┴─────┐
          ↓           ↓
      fulfilled    rejected
```

A settled Promise does not change to another state.

---

## 31. Promise Is Not the Result

A Promise represents a future result.

```js
const promise = fetchData();
```

`promise` is not the fetched data itself.

---

## 32. Creating a Promise

```js
const promise = new Promise((resolve, reject) => {
  resolve("done");
});
```

The executor runs synchronously when the Promise constructor is called.

---

## 33. Promise Executor Is Synchronous

```js
console.log("A");

new Promise(() => {
  console.log("B");
});

console.log("C");
```

Output:

```text
A
B
C
```

---

## 34. `resolve()`

Calling `resolve(value)` resolves the Promise.

If the value is a thenable or Promise, resolution adopts its eventual state.

---

## 35. `reject()`

Calling `reject(reason)` rejects the Promise.

The reason is commonly an `Error` object.

---

## 36. Settling Happens Once

Only the first effective settlement determines the Promise's eventual state.

```js
resolve(1);
resolve(2);
```

The second call does not change the already-settled result.

---

## 37. Resolved vs Fulfilled

A Promise can be resolved to another Promise or thenable without being fulfilled immediately.

This distinction matters when reasoning about Promise resolution.

---

## 38. Thenables

A thenable is an object with a callable `then` property.

Promise resolution can assimilate thenables.

---

## 39. `.then()`

`.then()` registers fulfillment and/or rejection handlers and returns a new Promise.

```js
promise.then(value => {
  console.log(value);
});
```

---

## 40. `.catch()`

`.catch()` registers rejection handling.

```js
promise.catch(error => {
  console.error(error);
});
```

Conceptually it is shorthand for a `.then()` with no fulfillment handler and a rejection handler.

---

## 41. `.finally()`

`.finally()` runs cleanup regardless of fulfillment or rejection.

```js
promise.finally(() => stopLoading());
```

---

## 42. Promise Chaining

Because `.then()` returns a new Promise, asynchronous operations can be composed.

```js
getUser()
  .then(getProfile)
  .then(renderProfile)
  .catch(handleError);
```

---

## 43. Returning a Value From `.then()`

```js
Promise.resolve(2)
  .then(value => value * 3)
  .then(console.log);
```

The returned value fulfills the next Promise.

---

## 44. Returning a Promise From `.then()`

If a `.then()` callback returns a Promise, the next Promise adopts that Promise's eventual state.

---

## 45. Throwing Inside `.then()`

A synchronous throw inside a reaction rejects the Promise returned by that `.then()`.

```js
Promise.resolve()
  .then(() => {
    throw new Error("fail");
  })
  .catch(console.error);
```

---

## 46. Rejection Propagation

A rejection travels through a chain until a rejection handler handles it or the chain remains unhandled.

---

## 47. Recovery From Rejection

A rejection handler can return a value and convert the chain back into fulfillment.

This is useful for fallback behavior.

---

## 48. Re-Throwing Errors

A catch handler can throw again when it cannot fully recover.

```js
.catch(error => {
  logError(error);
  throw error;
});
```

---

## 49. `Promise.resolve()`

`Promise.resolve(value)` creates/adopts a Promise representation of a value.

If given an appropriate Promise, it can return that Promise directly.

---

## 50. `Promise.reject()`

`Promise.reject(reason)` creates an already-rejected Promise.

It is useful in Promise-based control flow and tests.

---

## 51. `Promise.all()`

`Promise.all()` waits for all supplied values to fulfill.

If one rejects, the returned Promise rejects.

---

## 52. `Promise.all()` Order

Results preserve the order of the input iterable, not the order in which operations finish.

---

## 53. `Promise.all()` Fail-Fast Behavior

The aggregate Promise rejects when the first rejection is observed.

Other operations already started are not automatically cancelled.

---

## 54. `Promise.allSettled()`

`Promise.allSettled()` waits until every input settles.

It reports fulfillment or rejection for each input.

---

## 55. `Promise.race()`

`Promise.race()` settles when the first input settles, whether fulfilled or rejected.

---

## 56. `Promise.any()`

`Promise.any()` fulfills when the first input fulfills.

It rejects only when all inputs reject, with an `AggregateError`.

---

## 57. Promise Combinator Comparison

```text
all         → all must fulfill
allSettled  → wait for all outcomes
race        → first settled wins
any         → first fulfilled wins
```

---

## 58. Empty Promise Combinators

Edge cases for empty iterables differ:

```text
Promise.all([])        → fulfilled []
Promise.allSettled([]) → fulfilled []
Promise.any([])        → rejected AggregateError
Promise.race([])      → remains pending
```

---

## 59. Sequential vs Concurrent Starts

This starts operations one after another:

```js
const a = await getA();
const b = await getB();
```

If independent, this can be slower than starting both first.

---

## 60. Concurrent Independent Operations

```js
const aPromise = getA();
const bPromise = getB();

const [a, b] = await Promise.all([aPromise, bPromise]);
```

---

## 61. Concurrency Is Not Unlimited Parallelism

Promises coordinate asynchronous completion; they do not themselves create threads.

Actual concurrency depends on the host and underlying resources.

---

## 62. `async` Functions

An `async` function always returns a Promise.

```js
async function answer() {
  return 42;
}
```

---

## 63. Return Value of Async Function

```js
const result = answer();
console.log(result instanceof Promise); // true
```

The function's return value is wrapped into Promise semantics.

---

## 64. Throw in Async Function

A synchronous throw inside an async function becomes rejection of the returned Promise.

---

## 65. `await` Basic Meaning

`await` waits for a value's Promise-like completion before continuing the async function's continuation.

It does not block the JavaScript thread like a synchronous sleep.

---

## 66. `await` With Non-Promise Values

```js
const value = await 42;
```

The value can be treated as an already-fulfilled result for the async continuation.

---

## 67. `await` and Thenables

Await uses Promise resolution semantics, so thenables can affect when continuation resumes.

---

## 68. Async Function Execution

An async function executes synchronously until it reaches an `await` whose continuation must wait.

This is why the function can log before and after an `await` at different times.

---

## 69. `await` Example

```js
async function demo() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}

demo();
console.log("C");
```

Output:

```text
A
C
B
```

---

## 70. `await` and Error Handling

A rejected awaited Promise can be handled using `try...catch`.

```js
try {
  const data = await getData();
} catch (error) {
  handle(error);
}
```

---

## 71. `try...catch` Around `await`

The `catch` can handle errors from asynchronous operations represented by awaited Promises.

---

## 72. `finally` With Async Work

Use `finally` for cleanup that should occur whether the operation succeeds or fails.

```js
try {
  await save();
} finally {
  releaseLock();
}
```

---

## 73. Sequential `await` Trap

Unrelated operations awaited sequentially can unnecessarily increase total latency.

Identify independent work before deciding on sequencing.

---

## 74. Dependent Async Operations

Sequential `await` is correct when the second operation requires the first result.

```js
const user = await getUser();
const posts = await getPosts(user.id);
```

---

## 75. Top-Level Await

Modules can use top-level `await` where supported.

It can affect module evaluation and startup ordering.

---

## 76. Async IIFE

An async immediately invoked function expression can run async code in environments where top-level await is unavailable.

---

## 77. `for...of` With `await`

```js
for (const id of ids) {
  await process(id);
}
```

This processes sequentially.

---

## 78. Parallelizing a Collection

When operations are independent, create Promises and aggregate them.

```js
const results = await Promise.all(
  ids.map(id => process(id))
);
```

---

## 79. Controlled Concurrency

Launching thousands of operations at once can overload memory, sockets, servers, or APIs.

Use a concurrency limit when necessary.

---

## 80. Concurrency Limiter Mental Model

```text
Queue: 1 2 3 4 5 6 7
       ↓ ↓ ↓
     [workers]
       ↓
start next when one finishes
```

---

## 81. Building a Simple Concurrency Pool

Maintain a queue of jobs and start at most `N` active jobs.

When one settles, start the next queued job.

---

## 82. Backpressure

Backpressure means slowing producers when consumers cannot keep up.

It is critical in streams and high-volume asynchronous systems.

---

## 83. Race Conditions

A race condition occurs when correctness depends on the timing or ordering of competing operations.

Promises do not automatically prevent races.

---

## 84. Stale Response Race

A search UI can receive an older request's response after a newer request's response.

The UI must ensure stale results do not overwrite current state.

---

## 85. Request IDs for Race Protection

Assign increasing request IDs and apply a response only if it belongs to the latest request.

This is one practical race-control technique.

---

## 86. AbortController

`AbortController` provides a standard cancellation signal for APIs that support it.

```js
const controller = new AbortController();
fetch(url, { signal: controller.signal });
controller.abort();
```

---

## 87. Cancellation Is Cooperative

Calling `abort()` sends a signal.

The underlying API must support the signal for meaningful cancellation behavior.

---

## 88. AbortSignal State

A signal exposes whether it has been aborted and can dispatch abort-related behavior.

Modern APIs can also support abort reasons.

---

## 89. Timeout With AbortSignal

Modern environments can provide timeout helpers or you can combine a timer with a controller.

Always clean up timers when implementing manual timeout wrappers.

---

## 90. Retry Logic

Retries can improve resilience against transient failures.

Do not blindly retry every error.

---

## 91. Exponential Backoff

A common strategy increases the wait after repeated failures.

```text
attempt 1 → short delay
attempt 2 → longer delay
attempt 3 → longer again
```

---

## 92. Jitter

Randomized delay can prevent many clients from retrying simultaneously after a shared failure.

---

## 93. Retryable vs Non-Retryable Errors

Authentication failures, validation errors, and malformed requests often should not be retried automatically.

Transient network or server conditions may be retry candidates depending on the API contract.

---

## 94. Idempotency

Retries are safer when repeating an operation does not produce unintended duplicate effects.

HTTP methods and API design should be considered carefully.

---

## 95. Timeouts

A timeout limits how long your application is willing to wait.

A timeout is not necessarily the same as cancelling the underlying operation.

---

## 96. Promise Timeout Wrapper

A timeout wrapper can race an operation against a timer, but should also cancel the underlying operation when possible.

Otherwise the original work may continue in the background.

---

## 97. Error Taxonomy

Distinguish:

```text
Validation error
Network error
Timeout
Cancellation
Authentication
Authorization
Server failure
Programming bug
```

Different categories require different handling.

---

## 98. Custom Async Errors

Create meaningful error classes or error metadata for important application failure categories.

```js
class TimeoutError extends Error {}
```

---

## 99. Error Cause

Modern JavaScript supports `cause` for preserving the underlying failure context.

```js
throw new Error("Request failed", { cause: error });
```

---

## 100. Unhandled Promise Rejections

A rejected Promise without an appropriate rejection handler can produce an unhandled rejection event or process-level behavior depending on the host.

Treat unhandled rejections as bugs unless deliberately handled.

---

## 101. `Promise.all()` Error Trap

`Promise.all()` rejecting does not automatically stop every input operation.

Cancellation must be designed separately.

---

## 102. `Promise.race()` Timeout Trap

Racing an operation against a timeout only settles the race.

The original operation can continue unless it is separately cancelled.

---

## 103. `finally()` Return Behavior

Returning a normal value from `finally()` does not replace the original result in the usual case.

But throwing or returning a rejected Promise from `finally()` can override the chain's outcome.

---

## 104. Promise Job Ordering

Promise reactions are scheduled asynchronously even when the Promise is already fulfilled.

```js
Promise.resolve().then(() => console.log("later"));
```

The callback does not execute inline with the `.then()` call.

---

## 105. Output Prediction

Predict:

```js
console.log(1);
Promise.resolve().then(() => console.log(2));
console.log(3);
```

Answer:

```text
1
3
2
```

---

## 106. Output Prediction

Predict:

```js
setTimeout(() => console.log("timer"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("sync");
```

Typical browser/Node ordering:

```text
sync
promise
timer
```

Host scheduling details should still be understood rather than memorized blindly.

---

## 107. Output Prediction

Predict:

```js
async function test() {
  console.log("A");
  await null;
  console.log("B");
}

test();
console.log("C");
```

Output:

```text
A
C
B
```

---

## 108. Nested Microtasks

A microtask can schedule another microtask.

The host drains the microtask queue according to its scheduling rules before proceeding to a later task.

---

## 109. Microtask Starvation

An unbounded stream of microtasks can delay later tasks and rendering opportunities.

Do not create recursive microtask loops without a termination strategy.

---

## 110. Event Loop Is Not a Magic Queue

The event loop is a host/runtime scheduling model, not a single universal queue shared identically by every environment.

Browser and Node.js scheduling have important differences.

---

## 111. Browser Rendering

In browsers, long JavaScript tasks can delay rendering and user interaction.

Breaking expensive work into manageable chunks can improve responsiveness.

---

## 112. Long Task Problem

A large synchronous computation can monopolize the main thread.

Measure long tasks when diagnosing responsiveness problems.

---

## 113. Yielding to the Browser

For non-urgent work, scheduling chunks through appropriate browser mechanisms can give the browser opportunities to render and process input.

---

## 114. `setTimeout` as a Yield Technique

A zero-delay timer can move work to a later task.

It is not always the best scheduling mechanism, but it can split long work.

---

## 115. `requestAnimationFrame`

`requestAnimationFrame()` schedules a callback around a browser rendering opportunity.

It is appropriate for animation-related visual updates.

---

## 116. `requestIdleCallback`

Where supported, `requestIdleCallback()` can schedule lower-priority work during idle periods.

It should not be treated as a universal guarantee of timely execution.

---

## 117. Web Workers

Web Workers allow JavaScript to execute in another worker context.

They can move CPU-heavy work away from the main browser thread.

---

## 118. Worker Communication

Workers communicate through message passing rather than sharing ordinary JavaScript objects directly.

Structured cloning or transferable objects can be involved.

---

## 119. Worker vs Async I/O

Workers help with CPU-heavy JavaScript.

Async I/O helps avoid waiting synchronously for external operations.

They solve different problems.

---

## 120. SharedArrayBuffer Preview

Some environments support shared memory through `SharedArrayBuffer` and synchronization primitives such as `Atomics`.

These are advanced concurrency tools and require careful reasoning.

---

## 121. Atomics Preview

`Atomics` provides atomic operations for shared typed-array memory.

It is primarily relevant to shared-memory concurrency rather than ordinary Promise-based application code.

---

## 122. Async Iteration

Async iterables produce values asynchronously.

They use `Symbol.asyncIterator`.

---

## 123. `for await...of`

```js
for await (const chunk of stream) {
  process(chunk);
}
```

This consumes async iterables sequentially.

---

## 124. Async Generators

```js
async function* numbers() {
  yield await getNumber();
}
```

They combine asynchronous operations with generator-style lazy production.

---

## 125. Streaming Mental Model

```text
Producer
   ↓
chunk 1 → consumer
chunk 2 → consumer
chunk 3 → consumer
```

Streaming avoids requiring all data to exist before processing begins.

---

## 126. Backpressure in Streams

A fast producer can overwhelm a slow consumer.

A well-designed stream pipeline provides mechanisms to regulate flow.

---

## 127. Fetch Is Promise-Based

`fetch()` returns a Promise for a Response.

It does not reject merely because the HTTP status is 404 or 500.

---

## 128. Checking HTTP Status

```js
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
```

Handle HTTP failure according to the application contract.

---

## 129. `response.json()`

`response.json()` is asynchronous and returns a Promise.

```js
const data = await response.json();
```

---

## 130. Fetch Cancellation

Pass an `AbortSignal` to Fetch when cancellation is required.

```js
fetch(url, { signal: controller.signal });
```

---

## 131. Network Failure vs HTTP Failure

A network-level Fetch rejection is different from an HTTP response with a failure status.

Your error handling should distinguish them when useful.

---

## 132. JSON Parsing Failure

`response.json()` can reject if the response body cannot be parsed as valid JSON.

Do not assume a successful HTTP status guarantees valid JSON.

---

## 133. Loading State

A UI commonly needs explicit states:

```text
idle → loading → success
             ↘ error
             ↘ cancelled
```

Do not model loading as only a boolean when richer state is needed.

---

## 134. Preventing Duplicate Requests

Disable repeated actions, deduplicate requests, or maintain an in-flight Promise when duplicate work is undesirable.

---

## 135. Request Deduplication

A Map can associate a request key with an in-flight Promise.

When another request arrives for the same key, reuse the existing Promise.

---

## 136. Async Cache

Caching can store fulfilled data or in-flight Promises.

Define expiration, invalidation, and failure behavior explicitly.

---

## 137. Cache Stampede

If many callers discover an expired cache entry simultaneously, they may all trigger the same expensive operation.

In-flight Promise caching can reduce this duplication.

---

## 138. Stale-While-Revalidate Concept

Return cached data quickly while refreshing it in the background.

This balances latency and freshness.

---

## 139. Debouncing Async Search

For search inputs, debounce request initiation so rapid typing does not generate unnecessary requests.

Pair debounce with cancellation or stale-response protection.

---

## 140. Throttling Async Events

Throttle expensive asynchronous work triggered by high-frequency events.

Do not assume throttling automatically cancels previous work.

---

## 141. Async Debounce Pitfall

A debounced function may still have an earlier request running when a new request begins.

Debounce controls initiation frequency, not automatically the lifecycle of already-started operations.

---

## 142. Async Queue

An async queue stores jobs and processes them according to concurrency rules.

It is useful for uploads, background tasks, and API limits.

---

## 143. Priority Queue

A queue can assign priorities to jobs.

Be careful: always prioritizing new high-priority work can starve lower-priority jobs.

---

## 144. Fair Scheduling

Fair scheduling attempts to prevent one category of work from permanently dominating execution.

Round-robin or aging strategies can help.

---

## 145. Rate Limiting

Rate limiting restricts how frequently requests can be started.

This differs from concurrency limiting, which restricts how many operations are active at once.

---

## 146. Rate Limit vs Concurrency Limit

```text
Rate limit       → starts per time period
Concurrency      → active operations at one moment
```

A system may need both.

---

## 147. Async Resource Cleanup

Always consider cleanup for:

- timers
- event listeners
- sockets
- streams
- subscriptions
- workers

---

## 148. Abort on Component Unmount

UI code should cancel or ignore stale asynchronous work when the owning component is destroyed, depending on the framework and operation.

---

## 149. Async State Race

Two operations can update the same state in an unexpected order.

Define which result is authoritative before applying updates.

---

## 150. Last-Write-Wins

A simple strategy is to allow only the latest request's result to update state.

Use request IDs or cancellation to implement it safely.

---

## 151. Transaction-Like Async Logic

When several asynchronous steps change related state, consider what happens if step 3 fails after steps 1 and 2 succeed.

Design compensation or rollback where the domain requires it.

---

## 152. Async Critical Sections

If multiple operations modify shared application state, serialize or coordinate them when ordering matters.

---

## 153. Mutex Concept

A mutex allows only one operation at a time to enter a critical section.

JavaScript applications can implement Promise-based mutexes when needed.

---

## 154. Semaphore Concept

A semaphore allows up to `N` concurrent operations.

This is a foundation for concurrency-limit utilities.

---

## 155. Async Mutex Mental Model

```text
Task A → acquire → work → release
Task B → waits ───────────────→ acquire
```

---

## 156. Async Semaphore Mental Model

```text
capacity = 3

job 1 → running
job 2 → running
job 3 → running
job 4 → waiting
```

When one finishes, the next can start.

---

## 157. Promise Anti-Pattern: Floating Promise

Starting a Promise without intentionally handling or awaiting it can hide failures.

```js
saveData(); // Is this intentionally fire-and-forget?
```

Make the ownership explicit.

---

## 158. Fire-and-Forget

Fire-and-forget can be valid for telemetry or non-critical work, but errors and lifecycle behavior still need consideration.

---

## 159. Sequential Error Boundary

Wrap a meaningful group of operations in one error boundary rather than adding identical catch blocks everywhere.

---

## 160. Promise Error Boundary

A final `.catch()` can handle failures from a chain, while local catches can recover from specific expected failures.

---

## 161. Async Function Error Boundary

A `try...catch` around awaited work provides a clear boundary for async errors.

---

## 162. Avoid Empty Catch Blocks

```js
try {
  await work();
} catch {}
```

Silently swallowing failures makes production debugging difficult.

---

## 163. Logging Async Errors

Log enough context to diagnose the failure without leaking secrets or sensitive data.

---

## 164. Observability

Track useful signals such as:

- latency
- error rate
- retry count
- cancellation rate
- queue depth
- timeout rate

---

## 165. Performance: Measure Latency

Measure operation latency rather than assuming asynchronous code is fast.

Async code can still perform expensive work or create excessive requests.

---

## 166. Performance: Avoid Waterfalls

An async waterfall occurs when independent operations unnecessarily wait for one another.

Parallelize independent work when resource constraints allow.

---

## 167. Performance: Avoid Over-Concurrency

Too much concurrency can increase contention, memory usage, server load, and failure rates.

Controlled concurrency is often faster than unlimited concurrency.

---

## 168. Performance: Batch Work

When an API supports batching, combining multiple small requests can reduce network overhead.

Do not batch when it harms latency or semantics.

---

## 169. Performance: Cache Carefully

Caching can reduce latency and load but introduces invalidation, memory, and consistency problems.

---

## 170. Security: Do Not Trust Async Results

Asynchronous data from a server, worker, or user event is still untrusted input.

Validate at security-sensitive boundaries.

---

## 171. Security: Race-Safe Authorization

Do not rely on stale client-side state for authorization decisions.

The server must enforce authorization.

---

## 172. Security: Abort Is Not Authorization

Cancelling a client request does not guarantee the server stopped processing it.

Never use client cancellation as a security control.

---

## 173. Security: Retry Storms

Poor retry logic can amplify outages.

Use bounded retries, backoff, jitter, and sensible retry conditions.

---

## 174. Security: Resource Exhaustion

Unbounded async queues and concurrency can become denial-of-service vectors against your own service.

Apply limits to external and internal work.

---

## 175. Debugging Async Code

Use this checklist:

1. Where is the operation started?
2. What Promise represents it?
3. Who owns that Promise?
4. Who handles rejection?
5. Can it be cancelled?
6. Can multiple operations race?
7. What schedules the continuation?
8. Is there an unintended sequential wait?
9. Is cleanup guaranteed?

---

## 176. Debugging: Log Lifecycle

Use structured logs for:

```text
started
waiting
fulfilled
rejected
cancelled
cleaned up
```

This makes asynchronous control flow easier to trace.

---

## 177. Debugging: Preserve Error Context

Use `cause`, contextual messages, and structured metadata where appropriate.

Avoid replacing useful original errors with generic messages.

---

## 178. Debugging: Reproduce Timing

Race bugs can disappear when logs are added.

Use deterministic tests, controlled delays, fake timers where appropriate, and repeated stress scenarios.

---

## 179. Testing Async Functions

A test should await the Promise returned by the operation.

Otherwise the test may finish before the assertion runs.

---

## 180. Testing Rejections

Test both success and failure paths.

Explicitly assert rejected errors rather than merely printing them.

---

## 181. Testing Cancellation

Verify that cancellation produces the expected error/state and that resources are cleaned up.

---

## 182. Testing Race Conditions

Create controlled delays so completion order can be intentionally reversed.

Then verify the application remains correct.

---

## 183. Fake Timers

Testing libraries can provide fake timers to control timer-driven code.

Use them carefully with Promise microtasks because timers and microtasks are different scheduling mechanisms.

---

## 184. Async Architecture

Separate:

```text
UI / controller
      ↓
use-case / service
      ↓
async infrastructure
      ↓
network / database / filesystem
```

This makes ownership and testing clearer.

---

## 185. Service Functions

A service function should expose a clear Promise-based contract.

It should define what success and failure mean.

---

## 186. Async API Contract

Document:

- inputs
- resolved value
- rejection types
- cancellation support
- timeout behavior
- retry behavior

---

## 187. Avoid Hidden Async Behavior

A function that secretly starts background work without documenting it can surprise callers.

Make asynchronous side effects explicit.

---

## 188. Promise Ownership

Every important asynchronous operation should have a clear owner responsible for handling its completion, failure, cancellation, and cleanup.

---

## 189. Mini Project — Promise Playground

Build a UI that demonstrates:

- pending
- fulfilled
- rejected
- `all`
- `race`
- `any`
- `allSettled`

Show timing visually.

---

## 190. Mini Project — Search Autocomplete

Implement:

- debounce
- Fetch
- AbortController
- loading state
- stale-response protection
- error state

---

## 191. Mini Project — Retry Utility

Build a reusable retry function with:

- maximum attempts
- exponential backoff
- jitter
- retry predicate
- cancellation

---

## 192. Mini Project — Concurrency Limiter

Build a utility:

```js
limit(tasks, 3)
```

that runs at most three tasks concurrently.

---

## 193. Mini Project — Async Queue

Implement:

- enqueue
- dequeue processing
- concurrency limit
- errors
- cancellation
- queue size

---

## 194. Mini Project — Async Cache

Support:

- cache key
- TTL
- in-flight Promise deduplication
- invalidation
- error handling

---

## 195. Mini Project — File Processing Pipeline

For Node.js, process many files with controlled concurrency.

Avoid loading unnecessarily large files entirely into memory when streaming is more appropriate.

---

## 196. Mini Project — Streaming Data Reader

Consume chunks using async iteration.

Track progress and handle cancellation.

---

## 197. Beginner Practice

Write functions for:

1. delayed greeting
2. Promise resolve
3. Promise reject
4. async return
5. async throw
6. sequential operations
7. concurrent operations
8. timeout wrapper
9. retry once
10. simple debounce

---

## 198. Intermediate Practice

Build:

1. Promise pool
2. request deduplicator
3. cancellation wrapper
4. retry with backoff
5. async queue
6. semaphore
7. stale-result guard
8. async cache
9. rate limiter
10. event-driven loader

---

## 199. Advanced Practice

Build:

1. robust concurrency scheduler
2. priority queue
3. retry/circuit-breaker combination
4. async stream transformer
5. cancellation-aware pipeline
6. request cache with stale-while-revalidate
7. worker-based CPU task system
8. async mutex
9. async semaphore
10. observable data pipeline

---

## 200. Interview Questions — Fundamentals

1. What is asynchronous JavaScript?
2. Is JavaScript single-threaded?
3. What is the event loop?
4. What is a callback?
5. What is a Promise?
6. What are Promise states?
7. What is a thenable?
8. What does `async` return?
9. What does `await` do?
10. Why is `setTimeout(fn, 0)` not immediate?

---

## 201. Interview Questions — Promises

1. Difference between resolved and fulfilled?
2. What does `.then()` return?
3. What happens when `.then()` throws?
4. What happens when `.then()` returns a Promise?
5. Difference between `all`, `allSettled`, `race`, and `any`?
6. Does `Promise.all()` cancel remaining work?
7. Why can `finally()` affect the result?
8. What is an unhandled rejection?
9. What is Promise resolution?
10. What is Promise assimilation?

---

## 202. Interview Questions — Event Loop

1. What is a task?
2. What is a microtask?
3. Why do Promise callbacks usually run before timer callbacks?
4. Can microtasks starve tasks?
5. Does `await` block the thread?
6. Why can long synchronous JavaScript freeze a UI?
7. How do browser and Node scheduling differ?
8. What is `queueMicrotask()`?
9. What is a rendering opportunity?
10. What is a long task?

---

## 203. Interview Questions — Production Async

1. What is a race condition?
2. How do you prevent stale search results?
3. What is cancellation?
4. What is AbortController?
5. Difference between timeout and cancellation?
6. What is backpressure?
7. Difference between rate and concurrency limits?
8. Why use exponential backoff?
9. Why add jitter?
10. What is Promise deduplication?

---

## 204. Teach-Back Test

Explain these without notes:

```text
callback
Promise
thenable
Promise resolution
async/await
event loop
task
microtask
concurrency
parallelism
race condition
cancellation
backpressure
retry
backoff
jitter
rate limiting
concurrency limiting
async iteration
streaming
```

Then draw the runtime flow on paper.

---

## 205. Final Mastery Checklist

- [ ] Explain synchronous vs asynchronous execution.
- [ ] Explain blocking vs non-blocking.
- [ ] Explain the JavaScript runtime and host.
- [ ] Explain the call stack.
- [ ] Explain tasks and microtasks.
- [ ] Explain timer scheduling.
- [ ] Use callbacks correctly.
- [ ] Understand callback error handling.
- [ ] Create and consume Promises.
- [ ] Explain pending/fulfilled/rejected.
- [ ] Explain resolved vs fulfilled.
- [ ] Explain thenables.
- [ ] Chain Promises correctly.
- [ ] Handle rejection propagation.
- [ ] Use `finally()` correctly.
- [ ] Explain all Promise combinators.
- [ ] Distinguish sequential and concurrent work.
- [ ] Use `async/await` correctly.
- [ ] Handle async errors with `try...catch`.
- [ ] Avoid unnecessary async waterfalls.
- [ ] Control concurrency.
- [ ] Recognize race conditions.
- [ ] Implement stale-result protection.
- [ ] Use AbortController.
- [ ] Implement bounded retries.
- [ ] Understand exponential backoff and jitter.
- [ ] Design timeout behavior.
- [ ] Understand backpressure.
- [ ] Use async iterators.
- [ ] Understand streams.
- [ ] Handle Fetch correctly.
- [ ] Design async caches.
- [ ] Prevent duplicate requests.
- [ ] Clean up asynchronous resources.
- [ ] Test success, failure, timing, and cancellation.
- [ ] Explain async architecture.
- [ ] Build the mini projects.
- [ ] Teach the chapter from first principles.

---

## Master Mental Model

```text
                  ASYNCHRONOUS JAVASCRIPT
                           │
             ┌─────────────┼─────────────┐
             ↓             ↓             ↓
         Call Stack      Host APIs     Promises
             │             │             │
             │        timers/network    then/catch
             │             │             │
             └─────────────┼─────────────┘
                           ↓
                      Event Loop
                           │
                  ┌────────┴────────┐
                  ↓                 ↓
                Tasks           Microtasks
                  │                 │
                  └────────┬────────┘
                           ↓
                    Async Continuation
                           │
          ┌────────────────┼────────────────┐
          ↓                ↓                ↓
      Concurrency      Cancellation      Streaming
          │                │                │
     limits/queues      AbortSignal     async iterators
          │                │                │
          └────────────────┼────────────────┘
                           ↓
                    Production Systems
```

> **Mastery means you can predict when asynchronous work runs, explain why it runs then, control concurrency, handle failure, cancel when possible, prevent races, clean up resources, and design reliable async systems.**
