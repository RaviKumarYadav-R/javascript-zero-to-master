//* ============================================================
//* ASYNCHRONOUS JAVASCRIPT — PRACTICAL COMPANION
//* ============================================================

//* Core idea:
//* Synchronous code waits for the current operation to finish.
//* Asynchronous code lets JavaScript start work and continue, with a callback,
//* Promise, or async function handling the result later.

//* IMPORTANT:
//* Async does not automatically mean parallel.
//* JavaScript can coordinate many waiting operations while executing JS work
//* on its main thread; the host runtime decides how external work is handled.


//* ------------------------------------------------------------
//* 1. SYNCHRONOUS EXECUTION
//* ------------------------------------------------------------

console.log("first");
console.log("second");
console.log("third");

//* Output:
//* first
//* second
//* third

//* Each statement runs before the next statement starts.


//* ------------------------------------------------------------
//* 2. WHY ASYNC WORK IS NEEDED
//* ------------------------------------------------------------

//* Network requests, timers, file operations and other external operations
//* can take time. Waiting synchronously for all of them would make an
//* interactive program feel blocked.


//* ------------------------------------------------------------
//* 3. setTimeout()
//* ------------------------------------------------------------

console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");

//* Typical output:
//* A
//* C
//* B

//* A zero-millisecond timer does NOT mean "run immediately".
//* It schedules a task after the current synchronous work and according to
//* the host event-loop rules.


//* ------------------------------------------------------------
//* 4. CALLBACK — DEFINITION
//* ------------------------------------------------------------

//* A callback is a function passed to another function so it can be called later
//* or when an operation reaches a particular point.

function processUser(name, callback) {
  const message = `Hello ${name}`;
  callback(message);
}

processUser("Ravi", (message) => {
  console.log(message); // Hello Ravi
});


//* ------------------------------------------------------------
//* 5. CALLBACK WITH TIMER
//* ------------------------------------------------------------

function delayedGreeting(name, callback) {
  setTimeout(() => {
    callback(`Hello ${name}`);
  }, 10);
}

delayedGreeting("Ravi", console.log);


//* ------------------------------------------------------------
//* 6. CALLBACK HELL
//* ------------------------------------------------------------

//* Nested callbacks can become difficult to read and maintain:
//* getUser((user) => {
//*   getOrders(user, (orders) => {
//*     getPayment(orders, (payment) => {
//*       // deeply nested logic
//*     });
//*   });
//* });

//* Promises and async/await provide clearer composition for many workflows.


//* ------------------------------------------------------------
//* 7. PROMISE — DEFINITION
//* ------------------------------------------------------------

//* A Promise is an object representing the eventual completion or failure of
//* an asynchronous operation.
//* States: pending -> fulfilled OR rejected.

const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Operation completed");
  } else {
    reject(new Error("Operation failed"));
  }
});

promise.then(console.log).catch(console.error);


//* ------------------------------------------------------------
//* 8. PROMISE STATES
//* ------------------------------------------------------------

//* pending    = operation has not settled
//* fulfilled  = operation completed successfully
//* rejected   = operation failed
//* A settled Promise cannot switch to another settled state.


//* ------------------------------------------------------------
//* 9. resolve() AND reject()
//* ------------------------------------------------------------

function checkAge(age) {
  return new Promise((resolve, reject) => {
    if (age >= 18) {
      resolve("Allowed");
    } else {
      reject(new Error("Too young"));
    }
  });
}

checkAge(21)
  .then((message) => console.log(message))
  .catch((error) => console.log(error.message));


//* ------------------------------------------------------------
//* 10. THEN()
//* ------------------------------------------------------------

Promise.resolve(5)
  .then((value) => value * 2)
  .then((value) => console.log(value)); // 10

//* then() returns another Promise, which makes chaining possible.


//* ------------------------------------------------------------
//* 11. CHAINING
//* ------------------------------------------------------------

Promise.resolve(2)
  .then((value) => value + 3)
  .then((value) => value * 10)
  .then((value) => console.log(value)); // 50

//* Return the next value/Promise from each then callback to build a chain.


//* ------------------------------------------------------------
//* 12. RETURNING A PROMISE FROM THEN
//* ------------------------------------------------------------

Promise.resolve("user")
  .then((user) => Promise.resolve(`${user}-profile`))
  .then(console.log); // user-profile

//* Promise resolution adopts the returned Promise's eventual state.


//* ------------------------------------------------------------
//* 13. ERROR PROPAGATION IN A CHAIN
//* ------------------------------------------------------------

Promise.resolve()
  .then(() => {
    throw new Error("Something failed");
  })
  .then(() => console.log("not reached"))
  .catch((error) => console.log(error.message)); // Something failed


//* ------------------------------------------------------------
//* 14. FINALLY()
//* ------------------------------------------------------------

Promise.resolve("done")
  .finally(() => {
    console.log("cleanup");
  })
  .then(console.log); // done

//* finally() is useful for cleanup that should happen after fulfillment or rejection.


//* ------------------------------------------------------------
//* 15. Promise.resolve()
//* ------------------------------------------------------------

Promise.resolve(42).then(console.log); // 42

//* Promise.resolve(value) creates/adopts a fulfilled Promise for ordinary values.


//* ------------------------------------------------------------
//* 16. THENABLE CONCEPT
//* ------------------------------------------------------------

const thenable = {
  then(resolve) {
    resolve("thenable value");
  },
};

Promise.resolve(thenable).then(console.log); // thenable value

//* Promise resolution can assimilate objects with a callable then property.


//* ------------------------------------------------------------
//* 17. Promise.reject()
//* ------------------------------------------------------------

Promise.reject(new Error("failed"))
  .catch((error) => console.log(error.message));


//* ------------------------------------------------------------
//* 18. Promise.all()
//* ------------------------------------------------------------

Promise.all([
  Promise.resolve("profile"),
  Promise.resolve("settings"),
  Promise.resolve("notifications"),
]).then((results) => {
  console.log(results); // ["profile", "settings", "notifications"]
});

//* all() fulfills when every input fulfills.
//* It rejects as soon as one input rejects.


//* ------------------------------------------------------------
//* 19. Promise.allSettled()
//* ------------------------------------------------------------

Promise.allSettled([
  Promise.resolve("success"),
  Promise.reject(new Error("failed")),
]).then(console.log);

//* allSettled() waits for every input and reports each outcome.


//* ------------------------------------------------------------
//* 20. Promise.race()
//* ------------------------------------------------------------

Promise.race([
  new Promise((resolve) => setTimeout(() => resolve("slow"), 30)),
  new Promise((resolve) => setTimeout(() => resolve("fast"), 10)),
]).then(console.log); // fast

//* race() settles when the first input Promise settles, whether fulfilled or rejected.


//* ------------------------------------------------------------
//* 21. Promise.any()
//* ------------------------------------------------------------

Promise.any([
  Promise.reject(new Error("A failed")),
  Promise.resolve("B succeeded"),
]).then(console.log); // B succeeded

//* any() fulfills when the first input fulfills.
//* It rejects with AggregateError if all inputs reject.


//* ------------------------------------------------------------
//* 22. AggregateError
//* ------------------------------------------------------------

Promise.any([
  Promise.reject(new Error("A")),
  Promise.reject(new Error("B")),
]).catch((error) => {
  console.log(error instanceof AggregateError); // true
  console.log(error.errors.length); // 2
});


//* ------------------------------------------------------------
//* 23. ASYNC FUNCTION
//* ------------------------------------------------------------

async function getMessage() {
  return "Hello from async";
}

getMessage().then(console.log);

//* Every async function returns a Promise.


//* ------------------------------------------------------------
//* 24. AWAIT
//* ------------------------------------------------------------

async function readValue() {
  const value = await Promise.resolve(100);
  console.log(value); // 100
}

readValue();

//* await pauses this async function until the awaited Promise settles.
//* It does not block the entire JavaScript runtime from doing other work.


//* ------------------------------------------------------------
//* 25. AWAIT REJECTION
//* ------------------------------------------------------------

async function failingOperation() {
  try {
    await Promise.reject(new Error("Network failed"));
  } catch (error) {
    console.log(error.message); // Network failed
  }
}

failingOperation();


//* ------------------------------------------------------------
//* 26. ASYNC FUNCTION REJECTION
//* ------------------------------------------------------------

async function alwaysFails() {
  throw new Error("Failed");
}

alwaysFails().catch((error) => console.log(error.message));

//* throw inside an async function becomes a rejected Promise.


//* ------------------------------------------------------------
//* 27. SEQUENTIAL ASYNC WORK
//* ------------------------------------------------------------

async function sequentialWork() {
  const first = await Promise.resolve("first");
  const second = await Promise.resolve("second");
  return [first, second];
}

sequentialWork().then(console.log);

//* Use sequential awaits when the second operation depends on the first.


//* ------------------------------------------------------------
//* 28. CONCURRENT ASYNC WORK
//* ------------------------------------------------------------

async function concurrentWork() {
  const firstPromise = Promise.resolve("first");
  const secondPromise = Promise.resolve("second");

  const [first, second] = await Promise.all([firstPromise, secondPromise]);
  return [first, second];
}

concurrentWork().then(console.log);

//* Start independent operations before awaiting them when concurrency is desired.


//* ------------------------------------------------------------
//* 29. COMMON PERFORMANCE MISTAKE
//* ------------------------------------------------------------

async function loadBad() {
  const a = await Promise.resolve("A");
  const b = await Promise.resolve("B");
  return [a, b];
}

async function loadBetter() {
  const aPromise = Promise.resolve("A");
  const bPromise = Promise.resolve("B");
  return Promise.all([aPromise, bPromise]);
}

//* The better pattern is only better when A and B are actually independent.


//* ------------------------------------------------------------
//* 30. EVENT LOOP — BIG PICTURE
//* ------------------------------------------------------------

//* Simplified mental model:
//* 1. Run current synchronous JavaScript job.
//* 2. Process queued microtasks.
//* 3. Host proceeds with its event-loop/task/rendering behavior.
//* 4. Run later tasks such as eligible timers/events.

//* Exact host scheduling details differ between browsers and Node.js.


//* ------------------------------------------------------------
//* 31. MICROTASK
//* ------------------------------------------------------------

queueMicrotask(() => console.log("microtask"));
console.log("sync");

//* Typical output:
//* sync
//* microtask


//* ------------------------------------------------------------
//* 32. PROMISE CALLBACKS ARE MICROTASKS
//* ------------------------------------------------------------

console.log("1");
Promise.resolve().then(() => console.log("2"));
console.log("3");

//* Output:
//* 1
//* 3
//* 2


//* ------------------------------------------------------------
//* 33. TIMER VS PROMISE
//* ------------------------------------------------------------

console.log("start");

setTimeout(() => console.log("timer"), 0);
Promise.resolve().then(() => console.log("promise"));

console.log("end");

//* Typical browser/Node output:
//* start
//* end
//* promise
//* timer

//* Promise reaction microtasks normally run before the next timer task.


//* ------------------------------------------------------------
//* 34. MICROTASK STARVATION
//* ------------------------------------------------------------

//* If code continuously schedules more microtasks, the runtime can delay
//* ordinary tasks such as timers. Avoid unbounded microtask chains.


//* ------------------------------------------------------------
//* 35. process.nextTick() NOTE — NODE.JS
//* ------------------------------------------------------------

//* Node.js has process.nextTick(), which is a Node-specific scheduling mechanism.
//* Its ordering and priority differ from browser queueMicrotask()/timers.
//* Do not use Node-specific behavior as a universal browser event-loop rule.


//* ------------------------------------------------------------
//* 36. FETCH — NETWORK PROMISE
//* ------------------------------------------------------------

//* fetch() returns a Promise for a Response.
//* Example:
//* fetch("https://example.com/data")
//*   .then((response) => {
//*     if (!response.ok) throw new Error(`HTTP ${response.status}`);
//*     return response.json();
//*   })
//*   .then((data) => console.log(data))
//*   .catch(console.error);

//* Important: fetch() does NOT reject merely because HTTP status is 404/500.
//* Check response.ok/status yourself.


//* ------------------------------------------------------------
//* 37. RESPONSE.JSON()
//* ------------------------------------------------------------

//* response.json() is asynchronous and returns a Promise.
//* The response body is consumed by reading it.


//* ------------------------------------------------------------
//* 38. FETCH WITH ASYNC/AWAIT
//* ------------------------------------------------------------

async function loadData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}

//* loadData("https://example.com/api").then(console.log).catch(console.error);


//* ------------------------------------------------------------
//* 39. ABORTCONTROLLER — DEFINITION
//* ------------------------------------------------------------

//* AbortController provides a signal that supported asynchronous operations can
//* listen to so the caller can request cancellation.

async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

//* fetchWithTimeout("https://example.com/api").catch(console.error);

//* Cancellation is cooperative: the operation must support the provided signal.


//* ------------------------------------------------------------
//* 40. ABORT ERROR
//* ------------------------------------------------------------

async function cancellationExample() {
  const controller = new AbortController();
  controller.abort();

  try {
    await fetch("https://example.com", { signal: controller.signal });
  } catch (error) {
    console.log(error.name); // commonly AbortError
  }
}

//* cancellationExample();


//* ------------------------------------------------------------
//* 41. CALLBACK ERROR-FIRST CONVENTION
//* ------------------------------------------------------------

//* Node.js historically uses callbacks shaped like:
//* callback(error, result)

function fakeRead(callback) {
  setTimeout(() => callback(null, "file contents"), 10);
}

fakeRead((error, data) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(data);
});


//* ------------------------------------------------------------
//* 42. PROMISE WRAPPER
//* ------------------------------------------------------------

function readAsPromise() {
  return new Promise((resolve, reject) => {
    fakeRead((error, data) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(data);
    });
  });
}

readAsPromise().then(console.log).catch(console.error);

//* Promise wrappers can adapt callback APIs, though modern APIs often already return Promises.


//* ------------------------------------------------------------
//* 43. RETRY PATTERN
//* ------------------------------------------------------------

async function retry(task, attempts) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

let tries = 0;

retry(async () => {
  tries += 1;
  if (tries < 3) throw new Error("temporary failure");
  return "success";
}, 3).then(console.log).catch(console.error);

//* Real retry systems should consider backoff, jitter and which errors are retryable.


//* ------------------------------------------------------------
//* 44. EXPONENTIAL BACKOFF SHAPE
//* ------------------------------------------------------------

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retryWithBackoff(task, attempts) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      if (attempt === attempts) throw error;
      await delay(2 ** attempt * 100);
    }
  }
}

//* In production, add jitter and enforce maximum delay.


//* ------------------------------------------------------------
//* 45. CONCURRENCY LIMIT
//* ------------------------------------------------------------

async function mapWithConcurrency(items, worker, limit) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function runWorker() {
    while (true) {
      const index = nextIndex;
      nextIndex += 1;

      if (index >= items.length) return;
      results[index] = await worker(items[index], index);
    }
  }

  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    () => runWorker(),
  );

  await Promise.all(workers);
  return results;
}

mapWithConcurrency(
  [1, 2, 3, 4],
  async (value) => {
    await delay(5);
    return value * 2;
  },
  2,
).then(console.log);

//* A concurrency limiter prevents launching too many operations at once.


//* ------------------------------------------------------------
//* 46. ASYNC QUEUE CONCEPT
//* ------------------------------------------------------------

//* An async queue stores pending work and lets a fixed number of consumers
//* process that work. This pattern is useful for uploads, jobs and API limits.


//* ------------------------------------------------------------
//* 47. FOR AWAIT...OF
//* ------------------------------------------------------------

async function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

async function consume() {
  for await (const value of numbers()) {
    console.log(value);
  }
}

consume();

//* for await...of consumes async iterables and can also consume ordinary iterables.


//* ------------------------------------------------------------
//* 48. ASYNC GENERATOR
//* ------------------------------------------------------------

async function* delayedNumbers() {
  for (let i = 1; i <= 3; i += 1) {
    await delay(10);
    yield i;
  }
}

async function consumeDelayedNumbers() {
  for await (const value of delayedNumbers()) {
    console.log(value);
  }
}

consumeDelayedNumbers();


//* ------------------------------------------------------------
//* 49. EVENT EMITTER SHAPE
//* ------------------------------------------------------------

function createEmitter() {
  const listeners = new Map();

  return {
    on(event, listener) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event).add(listener);
      return () => listeners.get(event)?.delete(listener);
    },

    emit(event, value) {
      for (const listener of listeners.get(event) ?? []) {
        listener(value);
      }
    },
  };
}

const emitter = createEmitter();
const unsubscribe = emitter.on("message", (message) => console.log(message));
emitter.emit("message", "Hello");
unsubscribe();
emitter.emit("message", "This is not printed");

//* This demonstrates a basic event/pub-sub pattern using closures and Set.


//* ------------------------------------------------------------
//* 50. ASYNC EVENT HANDLER ERROR
//* ------------------------------------------------------------

//* Be careful with async callbacks passed to APIs that do not await them.
//* Example shape:
//* emitter.on("event", async () => {
//*   throw new Error("failure");
//* });
//*
//* The emitter must define how Promise rejections are handled; otherwise the
//* rejection may become an unhandled rejection.


//* ------------------------------------------------------------
//* 51. UNHANDLED REJECTION
//* ------------------------------------------------------------

//* Always design a deliberate error path for Promises.
//* Example:
//* doWork().catch((error) => logError(error));

//* In Node.js, unhandled Promise rejections can terminate or otherwise affect
//* the process depending on runtime behavior/version/configuration.


//* ------------------------------------------------------------
//* 52. PROMISE FINALLY CLEANUP
//* ------------------------------------------------------------

async function useResource() {
  let resource;

  try {
    resource = "opened";
    return "result";
  } finally {
    resource = null;
    console.log("resource cleaned up");
  }
}

useResource().then(console.log);


//* ------------------------------------------------------------
//* 53. ASYNC FUNCTION RETURNING A VALUE
//* ------------------------------------------------------------

async function valueFunction() {
  return 10;
}

valueFunction().then((value) => console.log(value + 5)); // 15


//* ------------------------------------------------------------
//* 54. AWAIT NON-PROMISE VALUE
//* ------------------------------------------------------------

async function awaitValue() {
  const value = await 10;
  console.log(value); // 10
}

awaitValue();

//* await can accept non-Promise values; they are treated as an already fulfilled value.


//* ------------------------------------------------------------
//* 55. AWAIT AND MICROTASK BOUNDARY
//* ------------------------------------------------------------

async function boundary() {
  console.log("before");
  await Promise.resolve();
  console.log("after");
}

boundary();
console.log("outside");

//* Typical output:
//* before
//* outside
//* after

//* Even an already fulfilled Promise introduces an asynchronous continuation.


//* ------------------------------------------------------------
//* 56. PROMISE EXECUTOR IS SYNCHRONOUS
//* ------------------------------------------------------------

console.log("before executor");

new Promise((resolve) => {
  console.log("inside executor");
  resolve();
}).then(() => console.log("then callback"));

console.log("after executor");

//* Output:
//* before executor
//* inside executor
//* after executor
//* then callback

//* The Promise constructor executor runs immediately.
//* .then() reactions run asynchronously as microtasks.


//* ------------------------------------------------------------
//* 57. DO NOT CREATE UNNECESSARY PROMISE WRAPPERS
//* ------------------------------------------------------------

async function unnecessary() {
  return new Promise((resolve) => resolve(42));
}

async function simpler() {
  return 42;
}

//* Prefer the simpler form unless the Promise constructor is actually adapting
//* a callback/event API or controlling settlement manually.


//* ------------------------------------------------------------
//* 58. PROMISE CHAINING VS NESTING
//* ------------------------------------------------------------

function getUserPromise() {
  return Promise.resolve({ id: 1 });
}

function getOrdersPromise(user) {
  return Promise.resolve([{ userId: user.id, total: 500 }]);
}

getUserPromise()
  .then(getOrdersPromise)
  .then((orders) => console.log(orders));

//* Return the next Promise to keep the chain flat.


//* ------------------------------------------------------------
//* 59. ASYNC/AWAIT VERSION
//* ------------------------------------------------------------

async function loadOrders() {
  const user = await getUserPromise();
  const orders = await getOrdersPromise(user);
  return orders;
}

loadOrders().then(console.log);


//* ------------------------------------------------------------
//* 60. ERROR BOUNDARY WITH ASYNC/AWAIT
//* ------------------------------------------------------------

async function safeLoad() {
  try {
    return await loadOrders();
  } catch (error) {
    console.error("Loading failed:", error);
    return [];
  }
}

safeLoad().then(console.log);


//* ------------------------------------------------------------
//* 61. PARALLEL RESULTS WITH DIFFERENT INPUT TYPES
//* ------------------------------------------------------------

Promise.all([
  10,
  Promise.resolve(20),
  Promise.resolve(30),
]).then(console.log); // [10, 20, 30]

//* Promise combinators accept values as well as Promises; values are treated as
//* already fulfilled inputs.


//* ------------------------------------------------------------
//* 62. Promise.all REJECTION
//* ------------------------------------------------------------

Promise.all([
  Promise.resolve("A"),
  Promise.reject(new Error("B failed")),
  Promise.resolve("C"),
]).catch((error) => console.log(error.message)); // B failed

//* all() rejects on the first observed rejection; other operations are not
//* automatically cancelled just because all() has rejected.


//* ------------------------------------------------------------
//* 63. CANCELLATION IS NOT THE SAME AS REJECTION
//* ------------------------------------------------------------

//* A Promise itself has no general cancel() method.
//* Cancellation is an application/operation protocol, commonly implemented
//* with AbortController for APIs that support AbortSignal.


//* ------------------------------------------------------------
//* 64. TIMEOUT AS A RACE PATTERN
//* ------------------------------------------------------------

function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Timed out")), ms);
  });
}

//* Promise.race([operation(), timeout(5000)]) is a timeout decision pattern,
//* but racing does not automatically cancel operation(). Pair it with
//* AbortController when the underlying operation supports cancellation.


//* ------------------------------------------------------------
//* 65. ASYNC ITERATOR PAGINATION SHAPE
//* ------------------------------------------------------------

async function* pagesFromArray(pages) {
  for (const page of pages) {
    await delay(1);
    yield page;
  }
}

async function readPages() {
  for await (const page of pagesFromArray(["page-1", "page-2", "page-3"])) {
    console.log(page);
  }
}

readPages();

//* Real pagination generators can fetch one page, yield it, then fetch the next.


//* ------------------------------------------------------------
//* 66. BACKPRESSURE CONCEPT
//* ------------------------------------------------------------

//* Backpressure means the producer slows down or limits production when the
//* consumer cannot keep up. Async iterators, streams and queues can represent
//* this relationship more safely than creating unlimited pending work.


//* ------------------------------------------------------------
//* 67. ASYNC RESOURCE CLEANUP
//* ------------------------------------------------------------

async function* resourceStream() {
  try {
    yield "data";
  } finally {
    console.log("stream cleanup");
  }
}

async function useStream() {
  for await (const item of resourceStream()) {
    console.log(item);
    break;
  }
}

useStream();


//* ------------------------------------------------------------
//* 68. COMMON MISTAKE — FORGETTING RETURN
//* ------------------------------------------------------------

function badChain() {
  return Promise.resolve(2)
    .then((value) => {
      value * 2; // forgot return
    })
    .then((value) => console.log(value)); // undefined
}

badChain();

//* Correct:
function goodChain() {
  return Promise.resolve(2)
    .then((value) => value * 2)
    .then((value) => console.log(value)); // 4
}

goodChain();


//* ------------------------------------------------------------
//* 69. COMMON MISTAKE — ARRAY.FOREACH WITH ASYNC
//* ------------------------------------------------------------

async function exampleForEach() {
  const values = [1, 2, 3];

  values.forEach(async (value) => {
    await delay(5);
    console.log(value);
  });

  console.log("forEach finished scheduling");
}

exampleForEach();

//* forEach() does not await async callbacks.
//* Use for...of for sequential work, or map() + Promise.all() for concurrent work.


//* ------------------------------------------------------------
//* 70. CORRECT SEQUENTIAL LOOP
//* ------------------------------------------------------------

async function sequentialLoop() {
  for (const value of [1, 2, 3]) {
    await delay(5);
    console.log(value);
  }
}

sequentialLoop();


//* ------------------------------------------------------------
//* 71. CORRECT CONCURRENT MAP
//* ------------------------------------------------------------

async function concurrentMap() {
  const results = await Promise.all(
    [1, 2, 3].map(async (value) => {
      await delay(5);
      return value * 2;
    }),
  );

  console.log(results); // [2, 4, 6]
}

concurrentMap();


//* ------------------------------------------------------------
//* 72. COMMON MISTAKE — ASSUMING TIMER IS EXACT
//* ------------------------------------------------------------

setTimeout(() => console.log("not necessarily exactly 100ms"), 100);

//* A timer expresses a minimum scheduling delay, not a guaranteed exact execution time.


//* ------------------------------------------------------------
//* 73. COMMON MISTAKE — FETCH 404
//* ------------------------------------------------------------

//* fetch(url)
//*   .then((response) => response.json())
//*
//* This may parse a 404 response body successfully.
//* Correct pattern:
//* if (!response.ok) throw new Error(`HTTP ${response.status}`);


//* ------------------------------------------------------------
//* 74. COMMON MISTAKE — DOUBLE JSON PARSE
//* ------------------------------------------------------------

//* const data = await response.json();
//* const again = await response.json(); // body already consumed -> error

//* Read the body once and reuse the parsed value.


//* ------------------------------------------------------------
//* 75. COMMON MISTAKE — MISSING ERROR HANDLING
//* ------------------------------------------------------------

//* riskyTask();
//*
//* Better:
//* riskyTask().catch(handleError);
//*
//* Or:
//* try {
//*   await riskyTask();
//* } catch (error) {
//*   handleError(error);
//* }


//* ------------------------------------------------------------
//* 76. OUTPUT PREDICTION
//* ------------------------------------------------------------

console.log("X");
setTimeout(() => console.log("Y"), 0);
Promise.resolve().then(() => console.log("Z"));
console.log("W");

//* Typical answer:
//* X
//* W
//* Z
//* Y


//* ------------------------------------------------------------
//* 77. OUTPUT PREDICTION
//* ------------------------------------------------------------

async function outputPrediction() {
  console.log("A");
  await null;
  console.log("B");
}

outputPrediction();
console.log("C");

//* Answer:
//* A
//* C
//* B


//* ------------------------------------------------------------
//* 78. OUTPUT PREDICTION
//* ------------------------------------------------------------

Promise.resolve(1)
  .then((value) => value + 1)
  .then((value) => console.log(value));

console.log("done");

//* Answer:
//* done
//* 2


//* ------------------------------------------------------------
//* 79. OUTPUT PREDICTION
//* ------------------------------------------------------------

Promise.all([
  Promise.resolve("A"),
  Promise.resolve("B"),
]).then(console.log);

console.log("C");

//* Answer:
//* C
//* ["A", "B"]


//* ------------------------------------------------------------
//* 80. OUTPUT PREDICTION
//* ------------------------------------------------------------

async function prediction() {
  const first = await Promise.resolve(1);
  return first + 1;
}

console.log(prediction());

//* The first console.log prints a Promise object, not the final number 2.
//* Use prediction().then(console.log) or await prediction() inside async code.


//* ------------------------------------------------------------
//* 81. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1: Create a delay(ms) function that returns a Promise.
//* Challenge 2: Convert a callback-style function into a Promise API.
//* Challenge 3: Write a Promise chain that loads user -> orders -> payment.
//* Challenge 4: Rewrite that chain using async/await.
//* Challenge 5: Build a retry() utility with maximum attempts.
//* Challenge 6: Add exponential backoff and jitter to retry().
//* Challenge 7: Build a timeout wrapper using AbortController.
//* Challenge 8: Implement concurrency-limited Promise processing.
//* Challenge 9: Build an async queue with three workers.
//* Challenge 10: Implement a tiny event emitter with unsubscribe support.
//* Challenge 11: Create an async generator for paginated data.
//* Challenge 12: Consume an async generator with for await...of.
//* Challenge 13: Explain why forEach() does not await async callbacks.
//* Challenge 14: Implement your own Promise.all-like utility for learning.
//* Challenge 15: Build a dashboard loader using Promise.all().
//* Challenge 16: Build a dashboard loader that reports partial failures using
//* Promise.allSettled().
//* Challenge 17: Build a "first successful server" utility using Promise.any().
//* Challenge 18: Build a timeout race and then improve it with cancellation.
//* Challenge 19: Build a rate-limited API client.
//* Challenge 20: Build a producer/consumer system with backpressure.


//* ------------------------------------------------------------
//* 82. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1:
//* async function test() { return 10; }
//* console.log(test());
//* Why is the output a Promise instead of 10?

//* Debug 2:
//* Promise.resolve(5).then((x) => { x * 2; }).then(console.log)
//* Why is the result undefined?

//* Debug 3:
//* [1,2,3].forEach(async x => await save(x));
//* Why can the caller continue before all saves finish?

//* Debug 4:
//* fetch(url).then(r => r.json())
//* Why might a 500 response still reach the JSON parser?

//* Debug 5:
//* Promise.race([request(), timeout(5000)])
//* Why does the request continue after the timeout wins?

//* Debug 6:
//* A retry loop retries a permanent 400 error.
//* What should be classified as retryable?

//* Debug 7:
//* Thousands of requests are launched with Promise.all(items.map(...)).
//* What resource problem can this create?

//* Debug 8:
//* An async event listener throws and nobody catches the rejection.
//* Where should the error be handled?

//* Debug 9:
//* A timer is expected to execute exactly after 10ms.
//* Why is that assumption incorrect?

//* Debug 10:
//* An async generator produces data faster than its consumer processes it.
//* What backpressure strategy could you introduce?


//* ------------------------------------------------------------
//* 83. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What does asynchronous mean in JavaScript?
//* 2. What is a callback?
//* 3. What problem does a Promise solve?
//* 4. What are the three main Promise states?
//* 5. Why does then() return a Promise?
//* 6. What happens when a then callback throws?
//* 7. What does finally() do?
//* 8. Difference between Promise.all(), allSettled(), race() and any()?
//* 9. What does async guarantee about a function's return value?
//* 10. What does await pause?
//* 11. Why does await not block the entire runtime?
//* 12. What is a microtask?
//* 13. Why does a Promise callback usually run before a timer callback?
//* 14. Why is setTimeout(fn, 0) not immediate?
//* 15. Why should fetch code inspect response.ok?
//* 16. Why is response.json() asynchronous?
//* 17. What is AbortController?
//* 18. Why is cancellation separate from Promise rejection?
//* 19. Why is forEach() problematic with async callbacks?
//* 20. When should work be sequential versus concurrent?
//* 21. What is an async generator?
//* 22. What is for await...of?
//* 23. What is backpressure?
//* 24. What is an unhandled rejection?
//* 25. Why can unlimited Promise concurrency hurt an application?


//* ------------------------------------------------------------
//* 84. INTERVIEW QUESTIONS
//* ------------------------------------------------------------

//* Q1. Explain the JavaScript event loop.
//* Q2. Microtask vs task/macrotask?
//* Q3. Why does Promise.then() run asynchronously even for an already fulfilled Promise?
//* Q4. Explain Promise resolution and thenable assimilation.
//* Q5. Promise.all() vs Promise.allSettled()?
//* Q6. Promise.race() vs Promise.any()?
//* Q7. Does Promise.all() cancel remaining operations after one rejects?
//* Q8. Does JavaScript Promise have built-in cancellation?
//* Q9. How does AbortController provide cancellation?
//* Q10. Why can fetch() resolve for HTTP 404?
//* Q11. What happens when an async function throws?
//* Q12. What happens when an async function returns a normal value?
//* Q13. Why is await inside a loop sometimes slow?
//* Q14. When is sequential await actually correct?
//* Q15. Why does forEach() not await async callbacks?
//* Q16. How would you limit concurrency to 5 requests?
//* Q17. What is an async iterator?
//* Q18. Generator vs async generator?
//* Q19. What is backpressure?
//* Q20. How would you design a retry system safely?
//* Q21. Why are timers not exact?
//* Q22. Explain Promise executor timing.
//* Q23. What causes an unhandled rejection?
//* Q24. How would you prevent a microtask starvation problem?
//* Q25. How do browser and Node.js scheduling details differ?


//* ------------------------------------------------------------
//* 85. MASTERY CHECKLIST
//* ------------------------------------------------------------

//* [ ] I can explain synchronous vs asynchronous execution.
//* [ ] I can write and consume callbacks.
//* [ ] I understand callback hell and its trade-offs.
//* [ ] I can create and chain Promises.
//* [ ] I can handle Promise errors correctly.
//* [ ] I understand finally().
//* [ ] I can choose between all/allSettled/race/any.
//* [ ] I understand async functions and await.
//* [ ] I can reason about event-loop ordering.
//* [ ] I understand microtasks vs timer tasks.
//* [ ] I can use fetch correctly with HTTP error checking.
//* [ ] I can parse Response bodies correctly.
//* [ ] I can cancel supported work with AbortController.
//* [ ] I can implement retry with sensible limits.
//* [ ] I understand concurrency vs sequential execution.
//* [ ] I can limit concurrency.
//* [ ] I understand async iterators and async generators.
//* [ ] I understand backpressure conceptually.
//* [ ] I can debug async timing problems.
//* [ ] I can explain asynchronous JavaScript to another beginner.


//* ============================================================
//* FINAL RULE
//* ============================================================

//* Async mastery is not memorizing Promise syntax.
//* It is being able to answer:
//* "When does this code run?"
//* "What happens if it fails?"
//* "Are these operations dependent or independent?"
//* "Can this work be cancelled?"
//* "How much concurrency is safe?"
//* "Who owns cleanup?"
//* "Where does the error go?"

//* END OF ASYNCHRONOUS JAVASCRIPT
