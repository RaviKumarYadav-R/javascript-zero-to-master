//* ============================================================
//* JAVASCRIPT MEMORY & PERFORMANCE — PRACTICAL COMPANION
//* ============================================================

//* Definition:
//* Memory management is the process of creating, retaining, using, and eventually
//* releasing program data. Performance engineering is the process of measuring and
//* improving useful work, responsiveness, throughput, latency, and resource usage.
//*
//* Important rule:
//* JavaScript engine memory layout, garbage-collector algorithms, and optimization
//* strategies are implementation-dependent. Avoid simplistic rules such as
//* "objects always live on the heap" or "primitives always live on the stack".


//* ------------------------------------------------------------
//* 1. VALUES, VARIABLES AND REFERENCES
//* ------------------------------------------------------------

let score = 10;
let copy = score;
copy = 20;

console.log(score); // 10
console.log(copy); // 20

const userA = { name: "Ravi" };
const userB = userA;
userB.name = "Alex";

console.log(userA.name); // Alex

//* Objects are reference values: two variables can refer to the same object.


//* ------------------------------------------------------------
//* 2. MUTATION VS REASSIGNMENT
//* ------------------------------------------------------------

const cart = { items: [] };
cart.items.push("keyboard"); // mutation is allowed

//* cart = {} would be a reassignment and is not allowed because cart is const.

console.log(cart);


//* ------------------------------------------------------------
//* 3. OBJECT IDENTITY
//* ------------------------------------------------------------

const a = { value: 1 };
const b = { value: 1 };
const c = a;

console.log(a === b); // false
console.log(a === c); // true

//* Objects are compared by identity, not by structural equality.


//* ------------------------------------------------------------
//* 4. SHALLOW COPY
//* ------------------------------------------------------------

const original = {
  name: "Ravi",
  settings: { theme: "dark" },
};

const shallow = { ...original };
shallow.name = "Alex";
shallow.settings.theme = "light";

console.log(original.name); // Ravi
console.log(original.settings.theme); // light

//* Spread copies the outer object only. Nested objects remain shared.


//* ------------------------------------------------------------
//* 5. DEEP COPY WITH structuredClone
//* ------------------------------------------------------------

const source = {
  profile: { name: "Ravi" },
  tags: ["js", "web"],
};

const deepCopy = structuredClone(source);
deepCopy.profile.name = "Alex";

console.log(source.profile.name); // Ravi
console.log(deepCopy.profile.name); // Alex

//* structuredClone creates a structured clone for supported values.
//* It is not a universal clone for every JavaScript object/resource.


//* ------------------------------------------------------------
//* 6. GARBAGE COLLECTION
//* ------------------------------------------------------------

function createTemporaryData() {
  const data = { large: new Array(1000).fill("data") };
  return data.length;
}

console.log(createTemporaryData());

//* JavaScript engines use garbage collection to reclaim memory that is no longer
//* reachable. The exact collector and timing are implementation-dependent.


//* ------------------------------------------------------------
//* 7. REACHABILITY MENTAL MODEL
//* ------------------------------------------------------------

let activeUser = { name: "Ravi" };

console.log(activeUser.name);

activeUser = null;

//* After the reference is removed, the former object may become unreachable and
//* eligible for garbage collection if no other references exist.


//* ------------------------------------------------------------
//* 8. MULTIPLE REFERENCES KEEP DATA ALIVE
//* ------------------------------------------------------------

let first = { value: 42 };
let second = first;

first = null;
console.log(second.value); // 42

second = null;
//* Now there are no references from these variables to the object.


//* ------------------------------------------------------------
//* 9. MEMORY LEAK DEFINITION
//* ------------------------------------------------------------

//* A practical JavaScript memory leak occurs when data is retained longer than
//* necessary, preventing memory reclamation and causing memory usage to grow.


//* ------------------------------------------------------------
//* 10. LEAK: GLOBAL COLLECTION
//* ------------------------------------------------------------

const accidentalCache = [];

function retainData(data) {
  accidentalCache.push(data);
}

for (let i = 0; i < 100; i++) {
  retainData({ id: i, payload: new Array(100).fill(i) });
}

console.log(accidentalCache.length);

//* If this collection grows forever without a business reason, it can retain memory indefinitely.


//* ------------------------------------------------------------
//* 11. LEAK: EVENT LISTENER
//* ------------------------------------------------------------

function attachHandler(button) {
  const handler = () => console.log("clicked");
  button.addEventListener("click", handler);

  return () => button.removeEventListener("click", handler);
}

//* Keep the cleanup function when the listener should have a bounded lifetime.


//* ------------------------------------------------------------
//* 12. LEAK: TIMER
//* ------------------------------------------------------------

function startPolling() {
  const timerId = setInterval(() => {
    console.log("poll");
  }, 5000);

  return () => clearInterval(timerId);
}

//* An interval that is no longer needed should be cleared.


//* ------------------------------------------------------------
//* 13. LEAK: OBSERVERS
//* ------------------------------------------------------------

function observeElement(element) {
  const observer = new MutationObserver(() => {
    console.log("changed");
  });

  observer.observe(element, { childList: true });
  return () => observer.disconnect();
}

//* Observers have explicit lifecycle methods. Disconnect them when their owner is destroyed.


//* ------------------------------------------------------------
//* 14. LEAK: DETACHED DOM
//* ------------------------------------------------------------

//* A removed DOM node can still consume memory if application code keeps a reference
//* to it or to objects that retain it. Removing a node from the document does not
//* automatically mean every reference to it disappears.


//* ------------------------------------------------------------
//* 15. WEAKMAP FOR EPHEMERAL METADATA
//* ------------------------------------------------------------

const metadata = new WeakMap();

function attachMetadata(object, value) {
  metadata.set(object, value);
}

const elementLike = {};
attachMetadata(elementLike, { measured: true });
console.log(metadata.get(elementLike));

//* WeakMap keys do not by themselves keep their object keys alive.
//* Weak collections cannot be iterated to observe garbage collection.


//* ------------------------------------------------------------
//* 16. WEAKSET
//* ------------------------------------------------------------

const processedObjects = new WeakSet();
const item = {};

processedObjects.add(item);
console.log(processedObjects.has(item)); // true


//* ------------------------------------------------------------
//* 17. CLOSURES CAN RETAIN STATE
//* ------------------------------------------------------------

function createCounter() {
  let count = 0;

  return () => ++count;
}

const counter = createCounter();
console.log(counter());
console.log(counter());

//* The closure keeps the lexical state reachable as long as counter remains reachable.


//* ------------------------------------------------------------
//* 18. CLOSURE RETENTION
//* ------------------------------------------------------------

function createLargeClosure() {
  const largeData = new Array(100000).fill("data");

  return () => largeData.length;
}

const reader = createLargeClosure();
console.log(reader());

//* A closure does not automatically mean a leak. It becomes a retention problem when
//* long-lived closures unnecessarily keep large objects alive.


//* ------------------------------------------------------------
//* 19. BREAKING A RETENTION CHAIN
//* ------------------------------------------------------------

function createState() {
  let data = new Array(10000).fill("x");

  return {
    read: () => data.length,
    clear: () => {
      data = null;
    },
  };
}

const state = createState();
console.log(state.read());
state.clear();

//* Explicitly releasing references can be useful when a long-lived object no longer needs data.


//* ------------------------------------------------------------
//* 20. PERFORMANCE DEFINITION
//* ------------------------------------------------------------

//* Performance is not simply "code runs fast".
//* For web applications, useful dimensions include:
//* - latency: time for an operation to complete
//* - throughput: work completed per unit time
//* - responsiveness: how quickly input is handled
//* - memory usage
//* - CPU usage
//* - network cost
//* - rendering cost


//* ------------------------------------------------------------
//* 21. MEASURE BEFORE OPTIMIZING
//* ------------------------------------------------------------

function sumNumbers(numbers) {
  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total;
}

const numbers = Array.from({ length: 100000 }, (_, index) => index);

console.time("sum");
sumNumbers(numbers);
console.timeEnd("sum");

//* console.time is useful for rough measurements. Benchmark methodology matters:
//* warm-up, input size, variance, environment and representative workloads all matter.


//* ------------------------------------------------------------
//* 22. performance.now()
//* ------------------------------------------------------------

const start = performance.now();
sumNumbers(numbers);
const end = performance.now();

console.log(`Elapsed: ${(end - start).toFixed(2)} ms`);

//* performance.now() is designed for measuring elapsed time and is monotonic within its context.


//* ------------------------------------------------------------
//* 23. DATE VS performance.now
//* ------------------------------------------------------------

const dateStart = Date.now();
const performanceStart = performance.now();

console.log(dateStart, performanceStart);

//* Date.now() represents wall-clock time. performance.now() is generally better for duration measurement.


//* ------------------------------------------------------------
//* 24. BIG-O: CONSTANT
//* ------------------------------------------------------------

function firstItem(array) {
  return array[0];
}

//* Accessing one known index is O(1) in the algorithmic model.


//* ------------------------------------------------------------
//* 25. BIG-O: LINEAR
//* ------------------------------------------------------------

function findUser(users, id) {
  for (const user of users) {
    if (user.id === id) return user;
  }

  return null;
}

//* A linear scan is O(n) in the number of users.


//* ------------------------------------------------------------
//* 26. BIG-O: QUADRATIC
//* ------------------------------------------------------------

function findDuplicates(numbers) {
  const duplicates = [];

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] === numbers[j]) {
        duplicates.push(numbers[i]);
      }
    }
  }

  return duplicates;
}

//* The nested comparison pattern is O(n²) in the worst case.


//* ------------------------------------------------------------
//* 27. IMPROVE O(n²) WITH SET
//* ------------------------------------------------------------

function findDuplicateValues(numbers) {
  const seen = new Set();
  const duplicates = new Set();

  for (const number of numbers) {
    if (seen.has(number)) duplicates.add(number);
    seen.add(number);
  }

  return [...duplicates];
}

console.log(findDuplicateValues([1, 2, 3, 2, 4, 3]));

//* A Set often turns repeated membership checks into expected O(1), giving O(n) overall.


//* ------------------------------------------------------------
//* 28. SPACE COMPLEXITY
//* ------------------------------------------------------------

function copyNumbers(numbers) {
  return [...numbers];
}

//* The returned copy requires additional storage proportional to input size: O(n) auxiliary/result space.


//* ------------------------------------------------------------
//* 29. AVOID UNNECESSARY COPIES
//* ------------------------------------------------------------

function process(numbers) {
  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total;
}

//* If a full copy is not needed, avoid creating one merely out of habit.


//* ------------------------------------------------------------
//* 30. MAP VS OBJECT — PERFORMANCE CONCEPT
//* ------------------------------------------------------------

const map = new Map();
map.set("user:1", { name: "Ravi" });

console.log(map.get("user:1"));

//* Choose data structures based on semantics and workload, not vague claims that one is always faster.


//* ------------------------------------------------------------
//* 31. ARRAY PUSH PATTERN
//* ------------------------------------------------------------

const result = [];
for (let i = 0; i < 1000; i++) {
  result.push(i);
}

console.log(result.length);

//* Build arrays with appropriate operations rather than repeatedly recreating large arrays unnecessarily.


//* ------------------------------------------------------------
//* 32. EXPENSIVE STRING CONCATENATION
//* ------------------------------------------------------------

const parts = [];
for (let i = 0; i < 1000; i++) {
  parts.push(`item-${i}`);
}

const output = parts.join(",");
console.log(output.length);

//* For large generated text, collecting pieces and joining can be clearer and may reduce
//* repeated intermediate-string work. Measure before claiming a universal performance win.


//* ------------------------------------------------------------
//* 33. FUNCTION CALLS
//* ------------------------------------------------------------

function square(value) {
  return value * value;
}

let total = 0;
for (let i = 0; i < 100000; i++) {
  total += square(i);
}

console.log(total > 0);

//* Function calls have overhead, but readability and correctness usually matter more than
//* speculative micro-optimizations. Optimize measured hot paths.


//* ------------------------------------------------------------
//* 34. JIT COMPILATION CONCEPT
//* ------------------------------------------------------------

//* Modern JavaScript engines can interpret/compile code and use runtime feedback to optimize
//* frequently executed paths. Exact strategies differ by engine and version.


//* ------------------------------------------------------------
//* 35. HOT PATH
//* ------------------------------------------------------------

function normalizeScore(score) {
  return Math.max(0, Math.min(100, score));
}

for (let i = 0; i < 100000; i++) {
  normalizeScore(i % 120);
}

//* A frequently executed section is often called a hot path. Profile before optimizing it.


//* ------------------------------------------------------------
//* 36. DEOPTIMIZATION CONCEPT
//* ------------------------------------------------------------

//* Runtime optimizations can be invalidated when assumptions about code/data stop holding.
//* Avoid relying on engine-specific folklore; use profilers and benchmarks for evidence.


//* ------------------------------------------------------------
//* 37. OBJECT SHAPE CONCEPT
//* ------------------------------------------------------------

function makeUser(name, age) {
  return { name, age };
}

const user1 = makeUser("A", 20);
const user2 = makeUser("B", 21);

console.log(user1, user2);

//* Engines may optimize objects with similar property layouts. This is implementation detail,
//* not a language guarantee. Prefer consistent object construction for clarity first.


//* ------------------------------------------------------------
//* 38. DON'T DELETE RANDOM PROPERTIES FOR SPEED
//* ------------------------------------------------------------

const config = { debug: true, retries: 3 };
delete config.debug;
console.log(config);

//* Do not use engine-internal optimization assumptions as a reason to distort application design.


//* ------------------------------------------------------------
//* 39. DOM PERFORMANCE: BATCH UPDATES
//* ------------------------------------------------------------

function renderItems(items, container) {
  const fragment = document.createDocumentFragment();

  for (const item of items) {
    const element = document.createElement("li");
    element.textContent = item;
    fragment.append(element);
  }

  container.replaceChildren(fragment);
}

//* Build a batch before committing it to the DOM when that makes the rendering path simpler.


//* ------------------------------------------------------------
//* 40. LAYOUT THRASHING
//* ------------------------------------------------------------

function badLayoutLoop(elements) {
  for (const element of elements) {
    element.style.width = "100px";
    console.log(element.offsetWidth);
  }
}

//* Mixing layout-affecting writes and synchronous layout reads repeatedly can cause forced
//* layout work. Batch reads and writes where practical.


//* ------------------------------------------------------------
//* 41. REQUESTANIMATIONFRAME
//* ------------------------------------------------------------

function animate(element) {
  let x = 0;

  function frame() {
    x += 1;
    element.style.transform = `translateX(${x}px)`;

    if (x < 100) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

//* requestAnimationFrame schedules visual updates around the browser's rendering cycle.


//* ------------------------------------------------------------
//* 42. DEBOUNCE
//* ------------------------------------------------------------

function debounce(fn, delay) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const search = debounce((query) => {
  console.log("Search:", query);
}, 300);

search("jav");
search("java");
search("javascript");

//* Debounce waits until calls stop for the specified delay.


//* ------------------------------------------------------------
//* 43. THROTTLE
//* ------------------------------------------------------------

function throttle(fn, interval) {
  let lastTime = 0;

  return (...args) => {
    const now = Date.now();

    if (now - lastTime >= interval) {
      lastTime = now;
      fn(...args);
    }
  };
}

const handleScroll = throttle(() => {
  console.log("Scroll update");
}, 200);

//* Throttle limits execution frequency.


//* ------------------------------------------------------------
//* 44. REQUEST CANCELLATION
//* ------------------------------------------------------------

async function fetchUser(id, signal) {
  const response = await fetch(`/api/users/${id}`, { signal });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

//* Cancellation prevents obsolete work from continuing when the underlying API supports it.


//* ------------------------------------------------------------
//* 45. RACE CONDITIONS
//* ------------------------------------------------------------

let requestVersion = 0;

async function searchUsers(query) {
  const version = ++requestVersion;
  const data = await requestJson(`/api/search?q=${encodeURIComponent(query)}`);

  if (version !== requestVersion) return;

  console.log("Render latest result", data);
}

async function requestJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

//* Versioning is one strategy for preventing stale asynchronous results from overwriting newer state.


//* ------------------------------------------------------------
//* 46. CACHING
//* ------------------------------------------------------------

const cache = new Map();

function getCached(key) {
  return cache.get(key);
}

function setCached(key, value) {
  cache.set(key, value);
}

setCached("user:1", { name: "Ravi" });
console.log(getCached("user:1"));

//* Caching trades memory/storage for reduced repeated work. Every cache needs an invalidation/expiry strategy.


//* ------------------------------------------------------------
//* 47. TTL CACHE
//* ------------------------------------------------------------

const ttlCache = new Map();

function setWithTTL(key, value, ttl) {
  ttlCache.set(key, {
    value,
    expiresAt: Date.now() + ttl,
  });
}

function getWithTTL(key) {
  const entry = ttlCache.get(key);

  if (!entry) return undefined;

  if (Date.now() >= entry.expiresAt) {
    ttlCache.delete(key);
    return undefined;
  }

  return entry.value;
}

setWithTTL("token", "demo", 1000);
console.log(getWithTTL("token"));


//* ------------------------------------------------------------
//* 48. LRU CACHE CONCEPT
//* ------------------------------------------------------------

//* An LRU cache evicts the least recently used entries when capacity is exceeded.
//* It bounds memory while keeping frequently used entries.


//* ------------------------------------------------------------
//* 49. INFINITE CACHE PROBLEM
//* ------------------------------------------------------------

const unboundedCache = new Map();

function dangerousCache(key, value) {
  unboundedCache.set(key, value);
}

//* A cache with no size/TTL/invalidation policy can become a memory-retention problem.


//* ------------------------------------------------------------
//* 50. LAZY INITIALIZATION
//* ------------------------------------------------------------

let expensiveResource;

function getResource() {
  if (!expensiveResource) {
    expensiveResource = createResource();
  }

  return expensiveResource;
}

function createResource() {
  return { createdAt: Date.now() };
}

console.log(getResource());

//* Lazy initialization creates work only when it is needed.


//* ------------------------------------------------------------
//* 51. CODE SPLITTING CONCEPT
//* ------------------------------------------------------------

//* Dynamic import can load code only when a feature is needed:
//*
//* import("./editor.js").then((module) => module.openEditor());
//*
//* Bundlers can use this boundary for code splitting.


//* ------------------------------------------------------------
//* 52. TREE SHAKING CONCEPT
//* ------------------------------------------------------------

//* Tree shaking is a build-tool optimization that removes statically unused module exports
//* when the module graph and build configuration permit it. It is not a JavaScript runtime feature.


//* ------------------------------------------------------------
//* 53. NETWORK PERFORMANCE
//* ------------------------------------------------------------

async function requestData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

//* Network performance involves latency, payload size, connection behavior, caching,
//* compression, server processing and concurrency—not only JavaScript execution time.


//* ------------------------------------------------------------
//* 54. AVOID WATERFALL REQUESTS WHEN INDEPENDENT
//* ------------------------------------------------------------

async function loadDashboard() {
  const [profile, settings] = await Promise.all([
    requestData("/api/profile"),
    requestData("/api/settings"),
  ]);

  return { profile, settings };
}

//* Independent requests can often run concurrently instead of waiting sequentially.


//* ------------------------------------------------------------
//* 55. PARALLELISM VS CONCURRENCY
//* ------------------------------------------------------------

//* Concurrency means multiple operations are in progress during overlapping periods.
//* Parallelism means work executes simultaneously on multiple execution resources.
//* JavaScript async I/O can provide concurrency without JavaScript code running in parallel
//* on the main thread.


//* ------------------------------------------------------------
//* 56. CONCURRENCY LIMIT
//* ------------------------------------------------------------

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function run() {
    while (true) {
      const index = nextIndex++;
      if (index >= items.length) return;

      results[index] = await worker(items[index], index);
    }
  }

  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    () => run(),
  );

  await Promise.all(workers);
  return results;
}

//* Limiting concurrency can protect servers, memory and browser resources.


//* ------------------------------------------------------------
//* 57. WEB WORKER CONCEPT
//* ------------------------------------------------------------

//* CPU-heavy JavaScript can block the main thread. A Web Worker can move suitable computation
//* off the main thread and communicate with postMessage().
//*
//* worker.js:
//* self.onmessage = (event) => self.postMessage(expensiveCalculation(event.data));


//* ------------------------------------------------------------
//* 58. WORKER TRANSFERABLES
//* ------------------------------------------------------------

const buffer = new ArrayBuffer(1024);

//* Example concept:
//* worker.postMessage(buffer, [buffer]);
//*
//* Transferable ownership can avoid copying some data. After transfer, the original ArrayBuffer
//* is detached and cannot be used normally as before.


//* ------------------------------------------------------------
//* 59. STRUCTURED CLONE COST
//* ------------------------------------------------------------

const message = {
  users: Array.from({ length: 1000 }, (_, id) => ({ id })),
};

const clone = structuredClone(message);
console.log(clone.users.length);

//* Cloning large structures has CPU and memory costs. Avoid unnecessary copies across boundaries.


//* ------------------------------------------------------------
//* 60. EVENT LOOP AND RESPONSIVENESS
//* ------------------------------------------------------------

console.log("start");

setTimeout(() => console.log("timer"), 0);

Promise.resolve().then(() => console.log("microtask"));

console.log("end");

//* Typical browser/Node ordering for this simple case:
//* start
//* end
//* microtask
//* timer
//*
//* Long synchronous JavaScript prevents the event loop from processing other work promptly.


//* ------------------------------------------------------------
//* 61. LONG TASK
//* ------------------------------------------------------------

function expensiveLoop() {
  let total = 0;

  for (let i = 0; i < 50_000_000; i++) {
    total += i;
  }

  return total;
}

//* Running large synchronous work on the main thread can make the page unresponsive.
//* Don't execute this casually in a browser UI.


//* ------------------------------------------------------------
//* 62. CHUNKING WORK
//* ------------------------------------------------------------

function processInChunks(items, processChunk, chunkSize = 100) {
  let index = 0;

  function next() {
    const chunk = items.slice(index, index + chunkSize);
    index += chunkSize;

    processChunk(chunk);

    if (index < items.length) {
      setTimeout(next, 0);
    }
  }

  next();
}

//* Chunking can yield between batches so other tasks get opportunities to run.


//* ------------------------------------------------------------
//* 63. requestIdleCallback CONCEPT
//* ------------------------------------------------------------

if (typeof requestIdleCallback === "function") {
  requestIdleCallback(() => {
    console.log("Optional background work");
  });
}

//* This API is useful for lower-priority work where supported. It is not a guarantee of unlimited idle time.


//* ------------------------------------------------------------
//* 64. PERFORMANCE OBSERVER
//* ------------------------------------------------------------

if (typeof PerformanceObserver === "function") {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log(entry.name, entry.duration);
    }
  });

  //* Exact entry types depend on browser/runtime support.
  observer.observe({ entryTypes: ["measure"] });

  performance.mark("work-start");
  sumNumbers(numbers);
  performance.mark("work-end");
  performance.measure("sum-work", "work-start", "work-end");

  setTimeout(() => observer.disconnect(), 1000);
}


//* ------------------------------------------------------------
//* 65. PERFORMANCE MARKS
//* ------------------------------------------------------------

performance.mark("feature-start");
sumNumbers(numbers);
performance.mark("feature-end");
performance.measure("feature", "feature-start", "feature-end");

console.log(performance.getEntriesByName("feature").at(-1)?.duration);


//* ------------------------------------------------------------
//* 66. MEMORY MEASUREMENT CAVEAT
//* ------------------------------------------------------------

//* Browser memory measurement APIs are not uniformly available. A single memory number
//* does not prove a leak; compare trends, snapshots and retaining paths over time.


//* ------------------------------------------------------------
//* 67. DEVTOOLS HEAP SNAPSHOT CONCEPT
//* ------------------------------------------------------------

//* A heap snapshot can help identify retained objects and retaining paths.
//* Useful workflow:
//* 1. take baseline snapshot
//* 2. perform operation
//* 3. repeat operation
//* 4. force/allow collection where tooling permits
//* 5. take another snapshot
//* 6. compare retained objects


//* ------------------------------------------------------------
//* 68. RETAINING PATH
//* ------------------------------------------------------------

//* A retaining path explains why an object remains reachable from a GC root.
//* Find the owner that should have released the reference rather than merely deleting
//* the object property at random.


//* ------------------------------------------------------------
//* 69. PERFORMANCE PROFILE
//* ------------------------------------------------------------

//* CPU profiling helps identify where execution time is spent.
//* Look for:
//* - hot functions
//* - repeated expensive work
//* - unnecessary rendering
//* - long synchronous tasks
//* - serialization/parsing overhead


//* ------------------------------------------------------------
//* 70. NETWORK PROFILE
//* ------------------------------------------------------------

//* Network tooling helps inspect:
//* - request count
//* - request duration
//* - payload sizes
//* - caching
//* - blocked/queued time
//* - failed requests
//* - waterfalls


//* ------------------------------------------------------------
//* 71. RENDER PERFORMANCE
//* ------------------------------------------------------------

//* Browser rendering broadly involves style calculation, layout, paint and compositing.
//* Exact pipeline details vary. Expensive DOM/layout work can reduce responsiveness.


//* ------------------------------------------------------------
//* 72. AVOID UNNECESSARY RENDERS
//* ------------------------------------------------------------

//* Frameworks such as React have their own rendering models. General principle:
//* keep state minimal, avoid unnecessary updates, and measure actual render bottlenecks.


//* ------------------------------------------------------------
//* 73. MEMOIZATION
//* ------------------------------------------------------------

function memoize(fn) {
  const cache = new Map();

  return (value) => {
    if (cache.has(value)) return cache.get(value);

    const result = fn(value);
    cache.set(value, result);
    return result;
  };
}

const expensiveSquare = memoize((n) => n * n);
console.log(expensiveSquare(10));
console.log(expensiveSquare(10));

//* Memoization trades memory for repeated computation savings. Cache size/invalidation matters.


//* ------------------------------------------------------------
//* 74. MEMOIZATION WITH UNBOUNDED KEYS
//* ------------------------------------------------------------

//* A memoization Map can grow forever if called with unbounded unique inputs.
//* Use bounded/TTL/LRU strategies when the workload requires it.


//* ------------------------------------------------------------
//* 75. PURE FUNCTION PERFORMANCE
//* ------------------------------------------------------------

function calculateTotal(prices) {
  return prices.reduce((total, price) => total + price, 0);
}

console.log(calculateTotal([10, 20, 30]));

//* Pure functions are easier to benchmark, cache and test because output depends on explicit input.


//* ------------------------------------------------------------
//* 76. SERIALIZATION COST
//* ------------------------------------------------------------

const largeObject = {
  users: Array.from({ length: 10000 }, (_, id) => ({ id, name: `User ${id}` })),
};

console.time("stringify");
const json = JSON.stringify(largeObject);
console.timeEnd("stringify");
console.log(json.length);

//* Serialization can become CPU and memory work for large payloads.


//* ------------------------------------------------------------
//* 77. PARSING COST
//* ------------------------------------------------------------

console.time("parse");
const parsed = JSON.parse(json);
console.timeEnd("parse");
console.log(parsed.users.length);


//* ------------------------------------------------------------
//* 78. PAYLOAD SIZE
//* ------------------------------------------------------------

function selectUserFields(user) {
  return {
    id: user.id,
    name: user.name,
  };
}

console.log(selectUserFields({ id: 1, name: "Ravi", secret: "do-not-send" }));

//* Sending only required fields can reduce network and serialization costs and improve data minimization.


//* ------------------------------------------------------------
//* 79. PAGINATION
//* ------------------------------------------------------------

function paginate(items, page, pageSize) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

console.log(paginate([1, 2, 3, 4, 5], 2, 2));

//* Pagination limits the amount of data processed/rendered at once.


//* ------------------------------------------------------------
//* 80. VIRTUALIZATION CONCEPT
//* ------------------------------------------------------------

//* List virtualization renders only the visible/near-visible portion of a very large list.
//* It can reduce DOM size and rendering work dramatically for large datasets.


//* ------------------------------------------------------------
//* 81. LAZY IMAGE LOADING CONCEPT
//* ------------------------------------------------------------

//* For images outside the initial viewport, native lazy loading can defer work:
//* <img src="image.jpg" loading="lazy" alt="...">
//* Exact loading behavior remains browser-controlled.


//* ------------------------------------------------------------
//* 82. CODE EXECUTION COST VS USER EXPERIENCE
//* ------------------------------------------------------------

//* A 50 ms CPU optimization may be irrelevant if a request takes 2 seconds.
//* Prioritize bottlenecks that affect the actual user journey.


//* ------------------------------------------------------------
//* 83. PERFORMANCE BUDGET
//* ------------------------------------------------------------

const performanceBudget = {
  maxRequests: 50,
  maxPayloadKB: 500,
  maxLongTaskMs: 50,
};

console.log(performanceBudget);

//* A performance budget is a team-level target for resource and responsiveness constraints.


//* ------------------------------------------------------------
//* 84. MICRO-OPTIMIZATION WARNING
//* ------------------------------------------------------------

function readableCode(value) {
  return value * 2;
}

//* Prefer readable code. Do not replace clear code with obscure tricks without measurement.


//* ------------------------------------------------------------
//* 85. MEMORY VS SPEED TRADE-OFF
//* ------------------------------------------------------------

const fastLookup = new Map([
  ["a", 1],
  ["b", 2],
]);

console.log(fastLookup.get("a"));

//* Additional indexing/caching can speed reads while consuming more memory and adding invalidation complexity.


//* ------------------------------------------------------------
//* 86. CPU VS MEMORY TRADE-OFF
//* ------------------------------------------------------------

//* Recomputing data may use CPU repeatedly but little memory.
//* Caching results may reduce CPU but retain more memory.
//* The correct choice depends on workload and constraints.


//* ------------------------------------------------------------
//* 87. OBJECT POOLING CONCEPT
//* ------------------------------------------------------------

//* Object pooling reuses objects to reduce allocation pressure in some specialized workloads.
//* Do not add pools blindly: modern engines optimize allocation well, and pooling can increase
//* complexity and retention. Measure first.


//* ------------------------------------------------------------
//* 88. GC PAUSES CONCEPT
//* ------------------------------------------------------------

//* Garbage collection requires CPU work and can affect responsiveness depending on workload and
//* collector behavior. Avoid assuming every allocation immediately causes a visible GC pause.


//* ------------------------------------------------------------
//* 89. ALLOCATION PRESSURE
//* ------------------------------------------------------------

function createManyObjects(count) {
  const items = [];

  for (let i = 0; i < count; i++) {
    items.push({ id: i, value: i * 2 });
  }

  return items;
}

console.log(createManyObjects(1000).length);

//* Large temporary allocations can increase CPU/memory pressure. Optimize only when profiling shows it matters.


//* ------------------------------------------------------------
//* 90. GENERATOR FOR LAZY VALUES
//* ------------------------------------------------------------

function* numbersGenerator(limit) {
  for (let i = 0; i < limit; i++) {
    yield i;
  }
}

for (const number of numbersGenerator(3)) {
  console.log(number);
}

//* Generators can produce values lazily instead of constructing the entire sequence at once.


//* ------------------------------------------------------------
//* 91. LAZY ITERATION
//* ------------------------------------------------------------

function* mapLazy(iterable, fn) {
  for (const value of iterable) {
    yield fn(value);
  }
}

const lazyValues = mapLazy(numbersGenerator(1_000_000), (n) => n * 2);
console.log(lazyValues.next().value);

//* Lazy pipelines can avoid storing every intermediate result, although each operation still has execution cost.


//* ------------------------------------------------------------
//* 92. STREAMING CONCEPT
//* ------------------------------------------------------------

//* Streams process data incrementally instead of requiring the complete payload in memory at once.
//* This can improve memory behavior for large data, but introduces backpressure and lifecycle concerns.


//* ------------------------------------------------------------
//* 93. BACKPRESSURE CONCEPT
//* ------------------------------------------------------------

//* Backpressure occurs when a producer can generate data faster than a consumer can process it.
//* A well-designed pipeline limits buffering instead of allowing unbounded memory growth.


//* ------------------------------------------------------------
//* 94. ABORT OBSOLETE WORK
//* ------------------------------------------------------------

async function loadLatest(url, controller) {
  try {
    const response = await fetch(url, { signal: controller.signal });
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") return null;
    throw error;
  }
}

//* Cancellation is especially useful for search-as-you-type, route changes and component teardown.


//* ------------------------------------------------------------
//* 95. CLEANUP FUNCTION PATTERN
//* ------------------------------------------------------------

function createSubscription() {
  const timer = setInterval(() => console.log("update"), 1000);

  return () => {
    clearInterval(timer);
  };
}

const unsubscribe = createSubscription();

//* Call unsubscribe when ownership ends.


//* ------------------------------------------------------------
//* 96. OWNERSHIP MENTAL MODEL
//* ------------------------------------------------------------

//* For every long-lived resource ask:
//* - Who created it?
//* - Who owns it?
//* - How long should it live?
//* - What event ends its lifetime?
//* - Where is cleanup performed?


//* ------------------------------------------------------------
//* 97. PERFORMANCE DEBUGGING CHECKLIST
//* ------------------------------------------------------------

//* 1. Reproduce the slow behavior.
//* 2. Measure it.
//* 3. Identify CPU/network/render/memory bottleneck.
//* 4. Form one hypothesis.
//* 5. Change one important thing.
//* 6. Measure again.
//* 7. Test correctness.
//* 8. Keep the optimization only if it helps the real workload.


//* ------------------------------------------------------------
//* 98. MEMORY DEBUGGING CHECKLIST
//* ------------------------------------------------------------

//* 1. Observe memory growth over repeated operations.
//* 2. Take heap snapshots where supported.
//* 3. Compare retained object types.
//* 4. Inspect retaining paths.
//* 5. Look for listeners, timers, observers, caches and closures.
//* 6. Verify cleanup.
//* 7. Repeat after the fix.


//* ------------------------------------------------------------
//* 99. COMMON MISTAKE — "MORE GC = BETTER"
//* ------------------------------------------------------------

//* You generally should not try to manually force garbage collection in application code.
//* Focus on reachability, ownership and unnecessary retention.


//* ------------------------------------------------------------
//* 100. COMMON MISTAKE — DELETE EVERYTHING
//* ------------------------------------------------------------

//* Randomly deleting references can break application behavior.
//* Identify the ownership/lifetime bug instead.


//* ------------------------------------------------------------
//* 101. COMMON MISTAKE — PREMATURE OPTIMIZATION
//* ------------------------------------------------------------

function readableCalculation(a, b) {
  return a + b;
}

//* First make the code correct and measurable. Optimize bottlenecks backed by evidence.


//* ------------------------------------------------------------
//* 102. COMMON MISTAKE — BENCHMARKING ONCE
//* ------------------------------------------------------------

console.time("tiny-test");
for (let i = 0; i < 10000; i++) {
  Math.sqrt(i);
}
console.timeEnd("tiny-test");

//* A single run is not a reliable benchmark. Timing varies with machine load, JIT warm-up,
//* garbage collection, input distribution and environment.


//* ------------------------------------------------------------
//* 103. COMMON MISTAKE — OPTIMIZING THE WRONG LAYER
//* ------------------------------------------------------------

//* If an API call dominates latency, shaving microseconds from a local loop may have no user-visible impact.


//* ------------------------------------------------------------
//* 104. COMMON MISTAKE — IGNORING MEMORY COST
//* ------------------------------------------------------------

function createIndexedData(items) {
  const index = new Map();

  for (const item of items) {
    index.set(item.id, item);
  }

  return index;
}

//* Indexes speed lookup but consume additional memory.


//* ------------------------------------------------------------
//* 105. MINI PROJECT: BOUNDED CACHE
//* ------------------------------------------------------------

class BoundedCache {
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
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }
}

const boundedCache = new BoundedCache(2);
boundedCache.set("a", 1);
boundedCache.set("b", 2);
boundedCache.set("c", 3);
console.log(boundedCache.get("a")); // undefined


//* ------------------------------------------------------------
//* 106. MINI PROJECT: MEMOIZATION WITH LIMIT
//* ------------------------------------------------------------

function memoizeWithLimit(fn, limit = 100) {
  const cache = new Map();

  return (key) => {
    if (cache.has(key)) return cache.get(key);

    const value = fn(key);
    cache.set(key, value);

    if (cache.size > limit) {
      cache.delete(cache.keys().next().value);
    }

    return value;
  };
}


//* ------------------------------------------------------------
//* 107. MINI PROJECT: RESOURCE LIFECYCLE
//* ------------------------------------------------------------

function createPoller(task, interval) {
  const timer = setInterval(task, interval);

  return {
    stop() {
      clearInterval(timer);
    },
  };
}

const poller = createPoller(() => console.log("polling"), 5000);
//* Call poller.stop() when the owner is destroyed.


//* ------------------------------------------------------------
//* 108. MINI PROJECT: PERFORMANCE TIMER
//* ------------------------------------------------------------

function measure(name, fn) {
  const startTime = performance.now();
  const result = fn();
  const duration = performance.now() - startTime;

  console.log(`${name}: ${duration.toFixed(2)}ms`);
  return result;
}

measure("sum", () => sumNumbers(numbers));


//* ------------------------------------------------------------
//* 109. MINI PROJECT: LAZY DATA PROCESSOR
//* ------------------------------------------------------------

function* filterLazy(iterable, predicate) {
  for (const value of iterable) {
    if (predicate(value)) yield value;
  }
}

const evens = filterLazy(numbersGenerator(10), (n) => n % 2 === 0);
console.log([...evens]);


//* ------------------------------------------------------------
//* 110. MINI PROJECT: CONCURRENCY + MEMORY
//* ------------------------------------------------------------

async function processUrls(urls, limit = 3) {
  return mapWithConcurrency(urls, limit, async (url) => requestJson(url));
}

//* Limiting concurrency can prevent thousands of simultaneous operations from creating
//* excessive resource pressure.


//* ------------------------------------------------------------
//* 111. MINI PROJECT: CLEANUP REGISTRY
//* ------------------------------------------------------------

class CleanupRegistry {
  constructor() {
    this.cleanups = new Set();
  }

  add(cleanup) {
    this.cleanups.add(cleanup);
    return () => this.cleanups.delete(cleanup);
  }

  run() {
    for (const cleanup of this.cleanups) {
      cleanup();
    }
    this.cleanups.clear();
  }
}

const registry = new CleanupRegistry();
registry.add(() => console.log("cleanup A"));
registry.add(() => console.log("cleanup B"));
registry.run();


//* ------------------------------------------------------------
//* 112. OUTPUT PREDICTION
//* ------------------------------------------------------------

const object1 = { value: 1 };
const object2 = object1;
object2.value = 2;

console.log(object1.value);

//* Answer: 2 — both variables reference the same object.


//* ------------------------------------------------------------
//* 113. OUTPUT PREDICTION — SHALLOW COPY
//* ------------------------------------------------------------

const x = { nested: { value: 1 } };
const y = { ...x };
y.nested.value = 99;

console.log(x.nested.value);

//* Answer: 99 — the nested object was shared.


//* ------------------------------------------------------------
//* 114. OUTPUT PREDICTION — CLOSURE
//* ------------------------------------------------------------

function makeCounter() {
  let count = 0;
  return () => ++count;
}

const countA = makeCounter();
const countB = makeCounter();

console.log(countA());
console.log(countA());
console.log(countB());

//* Answer: 1, 2, 1 — each invocation of makeCounter creates independent lexical state.


//* ------------------------------------------------------------
//* 115. OUTPUT PREDICTION — ASYNC
//* ------------------------------------------------------------

console.log("A");

setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));

console.log("D");

//* Typical answer: A, D, C, B.


//* ------------------------------------------------------------
//* 116. CODING CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1: Find a memory leak caused by an event listener and fix its lifecycle.
//* Challenge 2: Build an LRU cache.
//* Challenge 3: Add TTL expiration to the cache.
//* Challenge 4: Write a bounded memoize function.
//* Challenge 5: Implement a concurrency limiter.
//* Challenge 6: Build a lazy generator pipeline.
//* Challenge 7: Measure a function using performance.now().
//* Challenge 8: Compare two algorithms on increasing input sizes.
//* Challenge 9: Build a search box with debounce + AbortController.
//* Challenge 10: Build a large-list renderer with pagination/virtualization.
//* Challenge 11: Create a Web Worker for CPU-heavy computation.
//* Challenge 12: Implement cleanup for timers, observers and event listeners.
//* Challenge 13: Build a streaming-style producer/consumer queue with bounded buffering.
//* Challenge 14: Detect and fix stale async request results.
//* Challenge 15: Profile and optimize a deliberately slow dashboard.


//* ------------------------------------------------------------
//* 117. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1: A Map cache grows without limit.
//* Debug 2: An interval continues after a page/component is destroyed.
//* Debug 3: An event listener is added repeatedly and never removed.
//* Debug 4: A closure retains a huge dataset unnecessarily.
//* Debug 5: Search requests race and old results overwrite new results.
//* Debug 6: A dashboard performs independent requests sequentially.
//* Debug 7: A nested DOM loop forces repeated layout work.
//* Debug 8: A large synchronous loop freezes the UI.
//* Debug 9: A benchmark reports inconsistent numbers.
//* Debug 10: A memoization cache consumes unbounded memory.


//* ------------------------------------------------------------
//* 118. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What does garbage collection mean?
//* 2. What is reachability?
//* 3. What is a memory leak?
//* 4. Why can closures retain memory?
//* 5. Why can event listeners cause leaks?
//* 6. Why are WeakMap and WeakSet useful?
//* 7. What is shallow copying?
//* 8. What does structuredClone do?
//* 9. What is Big-O?
//* 10. What is the difference between time and space complexity?
//* 11. Why measure before optimizing?
//* 12. What is a hot path?
//* 13. What is JIT optimization?
//* 14. What is layout thrashing?
//* 15. What is debounce vs throttle?
//* 16. Why use requestAnimationFrame for visual updates?
//* 17. What is caching's trade-off?
//* 18. Why can memoization leak memory?
//* 19. What is concurrency limiting?
//* 20. Why do long tasks hurt UI responsiveness?


//* ------------------------------------------------------------
//* 119. INTERVIEW QUESTIONS
//* ------------------------------------------------------------

//* Q1. Explain JavaScript garbage collection.
//* Q2. What is reachability and why does it matter?
//* Q3. How would you diagnose a browser memory leak?
//* Q4. Can closures cause memory leaks?
//* Q5. WeakMap vs Map?
//* Q6. Shallow copy vs deep clone?
//* Q7. Why is object spread shallow?
//* Q8. What is time complexity?
//* Q9. Explain O(1), O(n), O(n²).
//* Q10. How would you optimize an O(n²) lookup problem?
//* Q11. What is a performance bottleneck?
//* Q12. Why should you benchmark multiple times?
//* Q13. What is JIT compilation?
//* Q14. What is deoptimization?
//* Q15. How can JavaScript block the main thread?
//* Q16. How does requestAnimationFrame help rendering?
//* Q17. Debounce vs throttle?
//* Q18. How does memoization trade memory for CPU?
//* Q19. How would you design a bounded cache?
//* Q20. How do you prevent stale network responses from updating UI state?
//* Q21. When would you use a Web Worker?
//* Q22. What are transferable objects?
//* Q23. What is backpressure?
//* Q24. How would you improve a slow web dashboard?
//* Q25. How would you prove that your optimization actually helped?


//* ============================================================
//* FINAL MENTAL MODEL
//* ============================================================

//* Memory:
//* value -> reference -> reachability -> lifetime -> cleanup
//*
//* Performance:
//* measure -> identify bottleneck -> form hypothesis -> optimize -> measure again
//*
//* For every long-lived object/resource, ask:
//* "Why is this still reachable?"
//*
//* For every optimization, ask:
//* "What measurement proves this is better?"
//*
//* Master these two questions and you move from guessing about JavaScript performance
//* to reasoning about real application behavior.

//* END OF MEMORY & PERFORMANCE
