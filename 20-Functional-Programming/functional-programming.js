/*
 * JavaScript Zero to Master
 * Chapter 20 — Functional Programming
 * Companion JavaScript File
 *
 * Goal:
 * Learn functional programming by reading definitions, running examples,
 * predicting output, debugging mistakes, and solving the challenges.
 *
 * Run with:
 *   node functional-programming.js
 */

console.log("=== 20. Functional Programming ===");

// ============================================================
// 1. WHAT IS FUNCTIONAL PROGRAMMING?
// ============================================================
// Definition:
// Functional programming (FP) is a programming style that treats functions
// as values and emphasizes predictable transformations of data.
//
// Important ideas:
// 1. Pure functions
// 2. Immutability
// 3. First-class and higher-order functions
// 4. Function composition
// 5. Declarative data transformation
//
// FP does NOT mean "never use loops" or "never mutate anything anywhere".
// It means we deliberately control side effects and make transformations
// easier to reason about.

// ============================================================
// 2. PURE FUNCTIONS
// ============================================================
// Definition:
// A pure function gives the same output for the same input and has no
// observable side effects.

function add(a, b) {
  return a + b;
}

console.log("Pure:", add(2, 3)); // 5
console.log("Pure again:", add(2, 3)); // 5

// Impure: depends on external mutable state.
let taxRate = 0.18;

function calculateTaxImpure(amount) {
  return amount * taxRate;
}

console.log("Impure because external state can change:", calculateTaxImpure(100));

// Better: make the dependency explicit.
function calculateTax(amount, rate) {
  return amount * rate;
}

console.log("Pure version:", calculateTax(100, 0.18)); // 18

// ============================================================
// 3. SIDE EFFECTS
// ============================================================
// Definition:
// A side effect is an observable interaction outside a function's returned
// value, such as modifying external state, logging, network requests, DOM
// changes, timers, or writing files.

function multiply(a, b) {
  return a * b; // no side effect
}

function saveUser(user) {
  // Imagine this writes to a database.
  console.log("Saving user:", user.name); // side effect
}

saveUser({ name: "Ravi" });

// A common architecture is:
// pure business logic -> side-effect boundary

function getDiscountedPrice(price, discountPercent) {
  return price - price * (discountPercent / 100);
}

function checkout(price, discountPercent) {
  const finalPrice = getDiscountedPrice(price, discountPercent);
  // Payment API call would happen here.
  return finalPrice;
}

console.log("Checkout price:", checkout(1000, 10)); // 900

// ============================================================
// 4. FIRST-CLASS FUNCTIONS
// ============================================================
// Definition:
// In JavaScript, functions are first-class values. They can be stored in
// variables, placed in arrays/objects, passed as arguments, and returned.

const greet = function (name) {
  return `Hello, ${name}`;
};

const operations = [
  (x) => x + 1,
  (x) => x * 2,
];

console.log(greet("Ravi"));
console.log(operations[0](10)); // 11
console.log(operations[1](10)); // 20

// ============================================================
// 5. HIGHER-ORDER FUNCTIONS
// ============================================================
// Definition:
// A higher-order function accepts a function, returns a function, or both.

function applyOperation(value, operation) {
  return operation(value);
}

console.log(applyOperation(5, (n) => n * 10)); // 50

function createMultiplier(multiplier) {
  return function (value) {
    return value * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(10)); // 20
console.log(triple(10)); // 30

// ============================================================
// 6. CALLBACKS
// ============================================================
// Definition:
// A callback is a function supplied to another function so that the receiving
// function can call it later or during its operation.

function processNumber(number, callback) {
  return callback(number);
}

console.log(processNumber(7, (n) => n ** 2)); // 49

// Array methods such as map/filter/reduce are callback-based APIs.

// ============================================================
// 7. MAP — TRANSFORM EVERY ELEMENT
// ============================================================
// Definition:
// map() creates a new array by transforming each element.

const prices = [100, 200, 300];
const pricesWithTax = prices.map((price) => price * 1.18);

console.log("Prices with tax:", pricesWithTax);
console.log("Original prices:", prices); // unchanged

// Common mistake:
// A block-bodied callback needs an explicit return.
const correctMap = [1, 2, 3].map((n) => {
  return n * 2;
});

const wrongMap = [1, 2, 3].map((n) => {
  n * 2;
});

console.log("Correct map:", correctMap); // [2, 4, 6]
console.log("Wrong map:", wrongMap); // [undefined, undefined, undefined]

// ============================================================
// 8. FILTER — KEEP ELEMENTS
// ============================================================
// Definition:
// filter() creates a new array containing elements for which the callback
// returns a truthy value.

const users = [
  { name: "A", active: true },
  { name: "B", active: false },
  { name: "C", active: true },
];

const activeUsers = users.filter((user) => user.active);
console.log("Active users:", activeUsers);

// ============================================================
// 9. REDUCE — ACCUMULATE A RESULT
// ============================================================
// Definition:
// reduce() processes an array into one accumulated result. The result can be
// a number, string, array, object, Map, or another structure.

const numbers = [1, 2, 3, 4];
const total = numbers.reduce((sum, number) => sum + number, 0);
console.log("Total:", total); // 10

const grouped = [
  { category: "fruit", name: "apple" },
  { category: "fruit", name: "banana" },
  { category: "drink", name: "tea" },
].reduce((groups, item) => {
  if (!groups[item.category]) groups[item.category] = [];
  groups[item.category].push(item.name);
  return groups;
}, {});

console.log("Grouped:", grouped);

// ============================================================
// 10. REFERENTIAL TRANSPARENCY
// ============================================================
// Definition:
// An expression is referentially transparent when it can be replaced by its
// resulting value without changing program behavior.

function square(n) {
  return n * n;
}

const result = square(5);
// Because square(5) is pure, replacing it with 25 preserves behavior.
console.log("Referentially transparent result:", result);

// ============================================================
// 11. IMMUTABILITY
// ============================================================
// Definition:
// Immutability means we avoid changing an existing value and instead create
// a new value representing the updated state.

const originalUser = { name: "Ravi", age: 21 };
const updatedUser = { ...originalUser, age: 22 };

console.log("Original:", originalUser);
console.log("Updated:", updatedUser);

// Arrays:
const originalNumbers = [1, 2, 3];
const addedNumber = [...originalNumbers, 4];
const withoutFirst = originalNumbers.slice(1);

console.log("Immutable array update:", addedNumber);
console.log("Immutable removal:", withoutFirst);

// Important: spread is shallow.
const state = {
  profile: { name: "Ravi" },
};

const shallowCopy = { ...state };
shallowCopy.profile.name = "New Name";

console.log("Shallow-copy nested mutation affects original:", state.profile.name);

// ============================================================
// 12. STRUCTURAL SHARING
// ============================================================
// Definition:
// Structural sharing means an immutable update reuses unchanged nested
// references while creating new references only for changed parts.

const appState = {
  user: { name: "Ravi" },
  settings: { theme: "dark" },
};

const nextState = {
  ...appState,
  settings: {
    ...appState.settings,
    theme: "light",
  },
};

console.log("User reference reused:", appState.user === nextState.user); // true
console.log("Settings reference replaced:", appState.settings === nextState.settings); // false

// ============================================================
// 13. FUNCTION COMPOSITION
// ============================================================
// Definition:
// Composition combines small functions so the output of one becomes the
// input of another.

const increment = (n) => n + 1;
const doubleNumber = (n) => n * 2;

const composed = (value) => increment(doubleNumber(value));
console.log("Composition:", composed(5)); // 11

function compose(...functions) {
  return (value) => functions.reduceRight((result, fn) => fn(result), value);
}

const transform = compose(
  (value) => value + 10,
  (value) => value * 2,
  (value) => value - 3,
);

console.log("compose result:", transform(5)); // 20

// Read right-to-left:
// 5 -> 2 -> 4 -> 14? Wait carefully:
// value - 3 => 2, *2 => 4, +10 => 14.
console.log("compose verification:", transform(5)); // 14

// ============================================================
// 14. PIPE
// ============================================================
// Definition:
// pipe() is similar to compose(), but functions execute left-to-right.

function pipe(...functions) {
  return (value) => functions.reduce((result, fn) => fn(result), value);
}

const pipeline = pipe(
  (value) => value - 3,
  (value) => value * 2,
  (value) => value + 10,
);

console.log("pipe result:", pipeline(5)); // 14

// ============================================================
// 15. DATA PIPELINES
// ============================================================
// Small transformations can be chained into a readable data flow.

const orders = [
  { id: 1, status: "paid", total: 500 },
  { id: 2, status: "pending", total: 800 },
  { id: 3, status: "paid", total: 300 },
];

const paidTotal = orders
  .filter((order) => order.status === "paid")
  .map((order) => order.total)
  .reduce((sum, totalValue) => sum + totalValue, 0);

console.log("Paid order total:", paidTotal); // 800

// ============================================================
// 16. CLOSURES AS FUNCTION FACTORIES
// ============================================================
// Definition:
// A closure allows a function to retain access to variables from its lexical
// scope after the outer function has returned.

function createCounter(start = 0) {
  let count = start;

  return () => {
    count += 1;
    return count;
  };
}

const counter = createCounter(10);
console.log(counter()); // 11
console.log(counter()); // 12
console.log(counter()); // 13

// ============================================================
// 17. CURRYING
// ============================================================
// Definition:
// Currying transforms a multi-argument function into a sequence of
// single-argument function calls.

function multiplyThree(a, b, c) {
  return a * b * c;
}

function curriedMultiplyThree(a) {
  return (b) => (c) => a * b * c;
}

console.log(curriedMultiplyThree(2)(3)(4)); // 24

// Generic curry helper for a fixed-arity function.
function curry(fn, arity = fn.length) {
  function collect(args) {
    return function curried(...nextArgs) {
      const allArgs = [...args, ...nextArgs];
      return allArgs.length >= arity ? fn(...allArgs) : collect(allArgs);
    };
  }

  return collect([]);
}

const addThree = (a, b, c) => a + b + c;
const curriedAddThree = curry(addThree);

console.log(curriedAddThree(1)(2)(3)); // 6
console.log(curriedAddThree(1, 2)(3)); // 6
console.log(curriedAddThree(1)(2, 3)); // 6

// ============================================================
// 18. PARTIAL APPLICATION
// ============================================================
// Definition:
// Partial application pre-fills some arguments and returns a function that
// accepts the remaining arguments.

function createRequest(method, baseUrl, path) {
  return `${method} ${baseUrl}${path}`;
}

function partialRequest(method, baseUrl) {
  return (path) => createRequest(method, baseUrl, path);
}

const getApiRequest = partialRequest("GET", "https://example.com");
console.log(getApiRequest("/users"));

// Currying and partial application are related but not identical concepts.

// ============================================================
// 19. REUSABLE PREDICATES
// ============================================================
// Definition:
// A predicate is a function that answers a yes/no question, usually by
// returning a boolean.

const isAdult = (user) => user.age >= 18;
const isAdmin = (user) => user.role === "admin";

const person = { name: "Ravi", age: 21, role: "admin" };
console.log("Adult:", isAdult(person));
console.log("Admin:", isAdmin(person));

function and(...predicates) {
  return (value) => predicates.every((predicate) => predicate(value));
}

function or(...predicates) {
  return (value) => predicates.some((predicate) => predicate(value));
}

const canManage = and(isAdult, isAdmin);
console.log("Can manage:", canManage(person)); // true

// ============================================================
// 20. VALIDATION PIPELINE
// ============================================================
// Keep individual validation rules small and composable.

const isNonEmpty = (value) => typeof value === "string" && value.trim() !== "";
const isLongEnough = (value) => value.length >= 8;
const hasNumber = (value) => /\d/.test(value);

function validatePassword(password) {
  return {
    nonEmpty: isNonEmpty(password),
    longEnough: isNonEmpty(password) && isLongEnough(password),
    hasNumber: isNonEmpty(password) && hasNumber(password),
  };
}

console.log("Password validation:", validatePassword("javascript123"));

// ============================================================
// 21. MEMOIZATION
// ============================================================
// Definition:
// Memoization caches results of a function so repeated calls with the same
// cache key can avoid repeating expensive work.

function memoize(fn) {
  const cache = new Map();

  return function memoized(value) {
    if (cache.has(value)) return cache.get(value);

    const result = fn(value);
    cache.set(value, result);
    return result;
  };
}

const expensiveSquare = memoize((n) => {
  console.log("Calculating square for:", n);
  return n * n;
});

console.log(expensiveSquare(10));
console.log(expensiveSquare(10)); // cached

// Caveat:
// Cache design must consider argument identity, object mutation, memory use,
// invalidation, and whether the function is actually pure.

// ============================================================
// 22. LAZY EVALUATION WITH GENERATORS
// ============================================================
// Definition:
// Lazy computation delays producing values until they are requested.

function* numbersFrom(start) {
  let current = start;
  while (true) {
    yield current;
    current += 1;
  }
}

const infiniteNumbers = numbersFrom(1);
console.log(infiniteNumbers.next().value); // 1
console.log(infiniteNumbers.next().value); // 2
console.log(infiniteNumbers.next().value); // 3

function* lazyMap(iterable, mapper) {
  for (const value of iterable) {
    yield mapper(value);
  }
}

const doubledLazy = lazyMap([1, 2, 3], (n) => n * 2);
console.log([...doubledLazy]); // [2, 4, 6]

// ============================================================
// 23. IMMUTABLE NESTED UPDATE
// ============================================================
// Correct approach: copy every object/array along the path being changed.

const profileState = {
  user: {
    name: "Ravi",
    address: {
      city: "Nawada",
    },
  },
};

const nextProfileState = {
  ...profileState,
  user: {
    ...profileState.user,
    address: {
      ...profileState.user.address,
      city: "Patna",
    },
  },
};

console.log("Old city:", profileState.user.address.city);
console.log("New city:", nextProfileState.user.address.city);

// ============================================================
// 24. PURE SORTING
// ============================================================
// sort() mutates the array. Copy first when immutable behavior is desired.

const scores = [30, 10, 20];
const sortedScores = [...scores].sort((a, b) => a - b);

console.log("Original scores:", scores);
console.log("Sorted copy:", sortedScores);

// ============================================================
// 25. RESULT-STYLE ERROR HANDLING
// ============================================================
// Expected failures can sometimes be represented as data instead of thrown
// exceptions. This can make a pipeline explicit.

function success(value) {
  return { ok: true, value };
}

function failure(error) {
  return { ok: false, error };
}

function parseAge(input) {
  const age = Number(input);

  if (!Number.isInteger(age) || age < 0) {
    return failure("Age must be a non-negative integer");
  }

  return success(age);
}

console.log("Result success:", parseAge("21"));
console.log("Result failure:", parseAge("abc"));

// ============================================================
// 26. ASYNC FUNCTIONAL PIPELINE
// ============================================================
// Functional ideas also apply to asynchronous transformations.

const asyncPipe = (...functions) => async (value) => {
  let result = value;

  for (const fn of functions) {
    result = await fn(result);
  }

  return result;
};

const asyncPipeline = asyncPipe(
  async (value) => value + 1,
  async (value) => value * 2,
  async (value) => value + 10,
);

asyncPipeline(5).then((value) => {
  console.log("Async pipeline:", value); // 22
});

// ============================================================
// 27. RETRY AS A FUNCTION FACTORY
// ============================================================
// This example is reusable infrastructure around an effectful operation.

function retry(operation, attempts = 3) {
  return async function runWithRetry(...args) {
    let lastError;

    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        return await operation(...args);
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError;
  };
}

let attempts = 0;
const unreliableOperation = async () => {
  attempts += 1;
  if (attempts < 3) throw new Error("Temporary failure");
  return "Success";
};

retry(unreliableOperation, 3)().then((value) => {
  console.log("Retry result:", value);
});

// ============================================================
// 28. DECORATORS / WRAPPERS
// ============================================================
// Definition:
// A decorator-like wrapper creates a new function that adds behavior around
// an existing function without changing the original function.

function withLogging(fn) {
  return (...args) => {
    console.log("Calling with:", args);
    const result = fn(...args);
    console.log("Returned:", result);
    return result;
  };
}

const loggedAdd = withLogging(add);
console.log(loggedAdd(4, 5));

// ============================================================
// 29. ONCE
// ============================================================
// Definition:
// once() creates a function that executes its wrapped function only once.

function once(fn) {
  let called = false;
  let result;

  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }

    return result;
  };
}

const initialize = once(() => "Application initialized");
console.log(initialize());
console.log(initialize());

// ============================================================
// 30. DEBOUNCE
// ============================================================
// Definition:
// Debouncing delays execution until calls stop arriving for a specified time.
// Useful for search inputs and resize handlers.

function debounce(fn, delay) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}

// Not executed here to keep this file quick and deterministic.
const debouncedSearch = debounce((query) => {
  console.log("Search:", query);
}, 300);

// ============================================================
// 31. THROTTLE
// ============================================================
// Definition:
// Throttling limits how frequently a function can execute during a period.
// Useful for scroll, mousemove, and high-frequency events.

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

const throttledScrollHandler = throttle(() => {
  console.log("Handling scroll");
}, 200);

// ============================================================
// 32. POINT-FREE STYLE
// ============================================================
// Definition:
// Point-free style defines transformations without explicitly naming the
// data value being passed through the pipeline.

const doubleAll = (numbers) => numbers.map((number) => number * 2);

// Equivalent reusable function reference:
const doubleValue = (number) => number * 2;
const doubleAllPointFree = (numbers) => numbers.map(doubleValue);

console.log(doubleAll([1, 2, 3]));
console.log(doubleAllPointFree([1, 2, 3]));

// Point-free style is optional. Prefer readability over cleverness.

// ============================================================
// 33. FUNCTION ARITY
// ============================================================
// Definition:
// Function arity is the number of declared parameters before the first
// parameter with a default value/rest parameter changes Function#length rules.

function threeArguments(a, b, c) {
  return a + b + c;
}

console.log("Function arity:", threeArguments.length); // 3

// ============================================================
// 34. PURE REDUCERS
// ============================================================
// A reducer is a function that receives current state and an action and
// returns the next state without mutating the current state.

function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: action.product.id, price: action.product.price },
      ];

    case "remove":
      return state.filter((item) => item.id !== action.id);

    default:
      return state;
  }
}

const cart = [];
const cartAfterAdd = cartReducer(cart, {
  type: "add",
  product: { id: 1, price: 499 },
});

console.log("Original cart:", cart);
console.log("Next cart:", cartAfterAdd);

// ============================================================
// 35. TRANSDUCER CONCEPT
// ============================================================
// Definition:
// A transducer is a composable transformation that can combine map/filter-like
// behavior without requiring an intermediate array for every step.
//
// The concept matters when building reusable high-performance pipelines.
// Most application code should first prefer clear map/filter/reduce chains.

const mapTransform = (mapper) => (reducer) => (accumulator, value) =>
  reducer(accumulator, mapper(value));

const filterTransform = (predicate) => (reducer) => (accumulator, value) =>
  predicate(value) ? reducer(accumulator, value) : accumulator;

const pushReducer = (accumulator, value) => {
  accumulator.push(value);
  return accumulator;
};

const transformation = filterTransform((n) => n % 2 === 0)(
  mapTransform((n) => n * 10)(pushReducer),
);

console.log(
  "Transducer-style result:",
  [1, 2, 3, 4].reduce(transformation, []),
); // [20, 40]

// ============================================================
// 36. LAZY PIPELINE
// ============================================================
// Generators can create pipelines that produce only the values requested.

function* filterLazy(iterable, predicate) {
  for (const value of iterable) {
    if (predicate(value)) yield value;
  }
}

function* take(iterable, count) {
  let taken = 0;

  for (const value of iterable) {
    if (taken >= count) return;
    yield value;
    taken += 1;
  }
}

const lazyPipeline = take(
  filterLazy(
    lazyMap(numbersFrom(1), (n) => n * 2),
    (n) => n % 4 === 0,
  ),
  3,
);

console.log("Lazy pipeline:", [...lazyPipeline]); // [4, 8, 12]

// ============================================================
// 37. OPTION / MAYBE-LIKE VALUE
// ============================================================
// Definition:
// An Option-like structure represents either a present value or no value.
// JavaScript does not require this pattern, but it is useful for teaching
// explicit absence and avoiding unsafe property access.

const Some = (value) => ({ tag: "some", value });
const None = () => ({ tag: "none" });

function mapOption(option, mapper) {
  return option.tag === "some" ? Some(mapper(option.value)) : option;
}

const maybeName = Some({ name: "Ravi" });
const maybeUpperName = mapOption(maybeName, (user) => user.name.toUpperCase());

console.log("Option-like result:", maybeUpperName);
console.log("Missing option:", mapOption(None(), (value) => value));

// ============================================================
// 38. PURE BUSINESS RULES
// ============================================================
// Keep domain rules pure whenever possible. This makes them easy to test.

function canPlaceOrder({ isAuthenticated, total, stockAvailable }) {
  return isAuthenticated && total > 0 && stockAvailable > 0;
}

console.log(
  "Can place order:",
  canPlaceOrder({ isAuthenticated: true, total: 500, stockAvailable: 4 }),
); // true

// The actual payment/database operation belongs outside this pure rule.

// ============================================================
// 39. FUNCTIONAL SHOPPING CART
// ============================================================

const products = [
  { id: 1, name: "Keyboard", price: 1200 },
  { id: 2, name: "Mouse", price: 700 },
  { id: 3, name: "Monitor", price: 9000 },
];

function addProduct(cartItems, product) {
  return [...cartItems, product];
}

function removeProduct(cartItems, productId) {
  return cartItems.filter((product) => product.id !== productId);
}

function cartTotal(cartItems) {
  return cartItems.reduce((sum, product) => sum + product.price, 0);
}

const cart1 = addProduct([], products[0]);
const cart2 = addProduct(cart1, products[1]);
const cart3 = removeProduct(cart2, 1);

console.log("Cart total:", cartTotal(cart2)); // 1900
console.log("Cart after removal:", cart3);

// ============================================================
// 40. PERMISSION / ROUTE GUARD LOGIC
// ============================================================
// Pure predicates are useful in frontend authorization decisions.
// Remember: client-side checks improve UX but are NOT server security.

const hasRole = (role) => (user) => user?.roles?.includes(role) === true;
const isAuthenticated = (user) => Boolean(user);

const canOpenAdmin = and(isAuthenticated, hasRole("admin"));

console.log(
  "Admin access:",
  canOpenAdmin({ roles: ["user", "admin"] }),
); // true

// ============================================================
// 41. COMMON MISTAKES
// ============================================================
// Mistake 1: Mutating input inside a function.
function badAddItem(items, item) {
  items.push(item);
  return items;
}

// Better when immutable behavior is intended:
function goodAddItem(items, item) {
  return [...items, item];
}

const itemList = ["A"];
console.log("Good add:", goodAddItem(itemList, "B"));
console.log("Original remains:", itemList);

// Mistake 2: Using reduce when map/filter is clearer.
// If the goal is transformation, use map(). If the goal is selection, use
// filter(). Use reduce when accumulating into a different result is clearer.

// Mistake 3: Memoizing impure functions.
// If a function reads time, random state, mutable globals, or external data,
// naive memoization may return stale or incorrect results.

// Mistake 4: Believing object spread is a deep clone.
// Spread only copies the first level.

// Mistake 5: Making code point-free just to look clever.
// Readability is more important than minimizing parameter names.

// Mistake 6: Blindly retrying non-idempotent side effects.
// A retry can accidentally create duplicate orders/payments.

// ============================================================
// 42. DEBUGGING CHECKLIST
// ============================================================
// When a functional pipeline gives a wrong result, ask:
// 1. What is the input at this stage?
// 2. What does the callback return?
// 3. Is the callback accidentally returning undefined?
// 4. Did any function mutate shared state?
// 5. Is the accumulator initialized correctly?
// 6. Is reduce accumulating the intended type?
// 7. Are references shared unexpectedly?
// 8. Is a memoization cache returning stale data?
// 9. Does a closure capture the intended value?
// 10. Is an async function returning/awaiting the Promise you expect?

// ============================================================
// 43. OUTPUT PREDICTION
// ============================================================

const outputData = [1, 2, 3]
  .map((n) => n * 2)
  .filter((n) => n > 2)
  .reduce((sum, n) => sum + n, 0);

console.log("Output prediction answer:", outputData); // 10

const makeAdder = (x) => (y) => x + y;
const addFive = makeAdder(5);
console.log("Closure prediction:", addFive(10)); // 15

// ============================================================
// 44. MINI CHALLENGES — BEGINNER
// ============================================================
// Challenge 1: Write a pure function that doubles a number.
// Challenge 2: Use map() to convert names to uppercase.
// Challenge 3: Use filter() to keep numbers greater than 10.
// Challenge 4: Use reduce() to calculate an array sum.
// Challenge 5: Create a function factory that multiplies by a fixed number.
// Challenge 6: Create a pure function that adds an item without mutation.
// Challenge 7: Create a predicate isEven(number).
// Challenge 8: Compose two functions manually.
// Challenge 9: Write a pipe() helper.
// Challenge 10: Create a once() helper.

// ============================================================
// 45. MINI CHALLENGES — INTERMEDIATE
// ============================================================
// Challenge 11: Group products by category using reduce().
// Challenge 12: Build a generic memoize() for multiple primitive arguments.
// Challenge 13: Curry a three-argument function.
// Challenge 14: Implement partial application.
// Challenge 15: Write immutable nested state updates.
// Challenge 16: Build a Result type with map() and mapError().
// Challenge 17: Create a lazy map generator.
// Challenge 18: Create lazy filter() and take() generators.
// Challenge 19: Build a validation combinator using and()/or().
// Challenge 20: Implement a pure shopping-cart reducer.

// ============================================================
// 46. MINI CHALLENGES — ADVANCED
// ============================================================
// Challenge 21: Implement curry() supporting grouped arguments.
// Challenge 22: Implement compose() and pipe() with multiple arguments at the
// first stage.
// Challenge 23: Build an asyncPipe() that stops on rejected Promises.
// Challenge 24: Build a concurrency-limited async mapper.
// Challenge 25: Implement memoization for JSON-safe argument lists and explain
// the cache-key trade-offs.
// Challenge 26: Build a lazy data pipeline over an infinite generator.
// Challenge 27: Implement a transducer-style map/filter composition.
// Challenge 28: Implement debounce() with cancel() and flush().
// Challenge 29: Implement throttle() with leading/trailing behavior.
// Challenge 30: Design a pure state reducer for a notes application.

// ============================================================
// 47. DEBUGGING CHALLENGES
// ============================================================
// Debug this:
//
// const doubled = [1, 2, 3].map((n) => {
//   n * 2;
// });
//
// Why is doubled [undefined, undefined, undefined]?
// Fix it by returning the expression.
//
// Debug this:
//
// function addItem(items, item) {
//   items.push(item);
//   return items;
// }
//
// Why might this violate an immutable-state expectation?
//
// Debug this:
//
// const result = [1, 2, 3].reduce((acc, value) => {
//   acc + value;
// }, 0);
//
// What is missing?
// Answer: return the new accumulator.
//
// Debug this:
//
// const cachedTime = memoize(() => Date.now());
//
// Why can caching this function produce surprising behavior?
// Answer: Date.now() changes, so the function is not referentially transparent.

// ============================================================
// 48. TEACH-BACK QUESTIONS
// ============================================================
// Explain in your own words:
// 1. What makes a function pure?
// 2. What is a side effect?
// 3. Why are functions first-class values in JavaScript?
// 4. What is a higher-order function?
// 5. map vs filter vs reduce?
// 6. What does immutability mean?
// 7. Why is object spread only a shallow copy?
// 8. What is structural sharing?
// 9. compose vs pipe?
// 10. What is a closure?
// 11. Currying vs partial application?
// 12. Why can memoization fail for impure functions?
// 13. What is lazy evaluation?
// 14. Why are pure reducers useful in state management?
// 15. Why should client-side permission logic not be treated as backend security?

// ============================================================
// 49. INTERVIEW QUESTIONS
// ============================================================
// Beginner:
// - What is functional programming?
// - What is a pure function?
// - What is a callback?
// - What is a higher-order function?
// - What does map() return?
// - What does filter() return?
// - What can reduce() return?
//
// Intermediate:
// - Explain immutability in JavaScript.
// - Why does Array#sort() matter in immutable programming?
// - Explain closure-based function factories.
// - Explain composition.
// - Explain currying and partial application.
// - What is memoization and what are its trade-offs?
// - How can generators support lazy computation?
//
// Advanced:
// - Explain referential transparency.
// - Explain structural sharing.
// - Design a pure reducer for application state.
// - How would you build an async functional pipeline?
// - How can functional transformations reduce shared mutable state?
// - When would a transducer or lazy pipeline be useful?
// - What are the trade-offs between functional purity and side-effectful
//   application boundaries?

// ============================================================
// 50. FINAL MENTAL MODEL
// ============================================================
// Think of functional JavaScript as:
//
// INPUT DATA
//     |
//     v
// PURE TRANSFORMATION
//     |
//     v
// PURE TRANSFORMATION
//     |
//     v
// FINAL VALUE
//     |
//     v
// SIDE EFFECT AT THE BOUNDARY
//
// Practical rules:
// 1. Make business rules pure when practical.
// 2. Pass dependencies as arguments instead of hiding them in globals.
// 3. Prefer creating new state when mutation would create shared-state bugs.
// 4. Use map/filter/reduce when they express the intent clearly.
// 5. Compose small functions instead of building giant functions.
// 6. Use closures for controlled private state and factories.
// 7. Memoize only when caching is correct and worth the complexity.
// 8. Use lazy techniques for genuinely large/infinite data flows.
// 9. Keep side effects at explicit boundaries.
// 10. Prefer readable functional code over clever functional code.

console.log("=== Functional Programming chapter loaded ===");
