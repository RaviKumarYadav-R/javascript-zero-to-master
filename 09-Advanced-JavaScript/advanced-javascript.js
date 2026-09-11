//* ============================================================
//* JAVASCRIPT ADVANCED — PRACTICAL COMPANION
//* ============================================================

//* Goal:
//* Understand the language mechanisms that make modern JavaScript powerful:
//* closures, prototypes, this, property descriptors, iterators, generators,
//* symbols, proxies, metaprogramming, async foundations, private fields,
//* modules, tagged templates and advanced function/object behavior.

//* Rule for this chapter:
//* Do not memorize syntax first. Ask:
//* 1. What problem does this feature solve?
//* 2. What does JavaScript actually do underneath?
//* 3. When should I use it?


//* ------------------------------------------------------------
//* 1. CLOSURE — DEFINITION
//* ------------------------------------------------------------

//* A closure is a function together with access to the lexical environment
//* in which that function was created.
//* The inner function can keep using outer variables after the outer function
//* has finished executing.

function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2

//* The returned function closes over count.


//* ------------------------------------------------------------
//* 2. CLOSURE FOR PRIVATE STATE
//* ------------------------------------------------------------

function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      balance += amount;
    },
    getBalance() {
      return balance;
    },
  };
}

const account = createBankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500

//* balance cannot be directly accessed from outside.


//* ------------------------------------------------------------
//* 3. LOOP CLOSURES: LET VS VAR
//* ------------------------------------------------------------

const functions = [];

for (let i = 0; i < 3; i += 1) {
  functions.push(() => i);
}

console.log(functions[0]()); // 0
console.log(functions[1]()); // 1
console.log(functions[2]()); // 2

//* let creates the appropriate per-iteration binding for this loop pattern.


//* ------------------------------------------------------------
//* 4. THIS — CALL-SITE DEPENDENT
//* ------------------------------------------------------------

const user = {
  name: "Ravi",
  greet() {
    return `Hello ${this.name}`;
  },
};

console.log(user.greet()); // Hello Ravi

//* For a normal method call obj.method(), this is the receiver object.
//* Do not define this as simply "the object where the function was written".


//* ------------------------------------------------------------
//* 5. THIS CAN CHANGE
//* ------------------------------------------------------------

function greet() {
  return `Hello ${this.name}`;
}

const personA = { name: "Aman" };
const personB = { name: "Neha" };

console.log(greet.call(personA)); // Hello Aman
console.log(greet.call(personB)); // Hello Neha

//* call() invokes immediately with an explicit this value.


//* ------------------------------------------------------------
//* 6. APPLY()
//* ------------------------------------------------------------

function add(a, b) {
  return this.base + a + b;
}

console.log(add.apply({ base: 10 }, [2, 3])); // 15

//* apply() is like call(), but arguments are supplied as an array-like value.


//* ------------------------------------------------------------
//* 7. BIND()
//* ------------------------------------------------------------

const boundAdd = add.bind({ base: 10 }, 2);
console.log(boundAdd(3)); // 15

//* bind() creates a new function with this and optionally initial arguments fixed.


//* ------------------------------------------------------------
//* 8. ARROW FUNCTION THIS
//* ------------------------------------------------------------

const timerObject = {
  name: "Ravi",
  getArrow() {
    const arrow = () => this.name;
    return arrow();
  },
};

console.log(timerObject.getArrow()); // Ravi

//* Arrow functions do not create their own this.
//* They capture this from the surrounding lexical context.


//* ------------------------------------------------------------
//* 9. ARROW FUNCTION HAS NO OWN ARGUMENTS
//* ------------------------------------------------------------

function outerFunction() {
  const arrow = () => arguments[0];
  return arrow();
}

console.log(outerFunction("hello")); // hello

//* The arrow uses the enclosing function's arguments object.


//* ------------------------------------------------------------
//* 10. PROTOTYPES — DEFINITION
//* ------------------------------------------------------------

//* A prototype is an object from which another object can inherit properties
//* through the prototype chain.

const animal = {
  speak() {
    return "animal sound";
  },
};

const dog = Object.create(animal);
console.log(dog.speak()); // animal sound
console.log(Object.getPrototypeOf(dog) === animal); // true


//* ------------------------------------------------------------
//* 11. PROTOTYPE CHAIN LOOKUP
//* ------------------------------------------------------------

const base = { x: 10 };
const middle = Object.create(base);
const child = Object.create(middle);

console.log(child.x); // 10

//* JavaScript searches the object first, then its prototype, then the next
//* prototype until the property is found or the chain ends at null.


//* ------------------------------------------------------------
//* 12. OWN VS INHERITED PROPERTY
//* ------------------------------------------------------------

const inheritedBase = { role: "admin" };
const derived = Object.create(inheritedBase);
derived.name = "Ravi";

console.log(Object.hasOwn(derived, "role")); // false
console.log("role" in derived); // true

//* Object.hasOwn() checks own properties only.
//* in checks the object and its prototype chain.


//* ------------------------------------------------------------
//* 13. PROTOTYPE METHOD SHARING
//* ------------------------------------------------------------

function User(name) {
  this.name = name;
}

User.prototype.greet = function greet() {
  return `Hi ${this.name}`;
};

const user1 = new User("Ravi");
const user2 = new User("Aman");

console.log(user1.greet()); // Hi Ravi
console.log(user1.greet === user2.greet); // true

//* The method is stored once on User.prototype and shared by instances.


//* ------------------------------------------------------------
//* 14. NEW OPERATOR — CONCEPTUAL STEPS
//* ------------------------------------------------------------

function Product(name) {
  this.name = name;
}

Product.prototype.getName = function getName() {
  return this.name;
};

const laptop = new Product("Laptop");
console.log(laptop.getName()); // Laptop

//* Conceptually, new:
//* 1. Creates a new object.
//* 2. Links it to Product.prototype.
//* 3. Calls Product with this bound to that object.
//* 4. Returns the resulting object unless the constructor explicitly returns
//*    another suitable object.


//* ------------------------------------------------------------
//* 15. CLASS IS PROTOTYPE-BASED UNDERNEATH
//* ------------------------------------------------------------

class Developer {
  constructor(name) {
    this.name = name;
  }

  code() {
    return `${this.name} is coding`;
  }
}

const developer = new Developer("Ravi");
console.log(developer.code());
console.log(Object.getPrototypeOf(developer) === Developer.prototype); // true

//* class provides cleaner syntax over JavaScript's prototype-based object model.


//* ------------------------------------------------------------
//* 16. PRIVATE CLASS FIELD
//* ------------------------------------------------------------

class Wallet {
  #balance = 0;

  add(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const wallet = new Wallet();
wallet.add(500);
console.log(wallet.getBalance()); // 500
//* console.log(wallet.#balance); // SyntaxError

//* #private fields are enforced by the language and are not ordinary properties.


//* ------------------------------------------------------------
//* 17. STATIC CLASS MEMBER
//* ------------------------------------------------------------

class UserFactory {
  static createGuest() {
    return { role: "guest" };
  }
}

console.log(UserFactory.createGuest());

//* static members belong to the class itself, not instances.


//* ------------------------------------------------------------
//* 18. PRIVATE METHOD
//* ------------------------------------------------------------

class LoginService {
  #normalize(username) {
    return username.trim().toLowerCase();
  }

  login(username) {
    return this.#normalize(username);
  }
}

console.log(new LoginService().login("  RAVI "));


//* ------------------------------------------------------------
//* 19. PROPERTY DESCRIPTORS
//* ------------------------------------------------------------

const settings = {};

Object.defineProperty(settings, "version", {
  value: 1,
  writable: false,
  enumerable: true,
  configurable: false,
});

console.log(Object.getOwnPropertyDescriptor(settings, "version"));

//* Data properties have value, writable, enumerable and configurable attributes.


//* ------------------------------------------------------------
//* 20. ACCESSOR DESCRIPTORS
//* ------------------------------------------------------------

const profile = {
  firstName: "Ravi",
  lastName: "Kumar",
};

Object.defineProperty(profile, "fullName", {
  enumerable: true,
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
});

console.log(profile.fullName);

//* Accessor properties use get/set instead of a direct stored value.


//* ------------------------------------------------------------
//* 21. ITERABLE — DEFINITION
//* ------------------------------------------------------------

//* An iterable is a value that provides a [Symbol.iterator]() method returning
//* an iterator. for...of, spread and Array.from() can consume iterables.

const iterable = {
  values: [10, 20, 30],

  [Symbol.iterator]() {
    let index = 0;
    const values = this.values;

    return {
      next() {
        if (index < values.length) {
          return { value: values[index++], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

for (const value of iterable) {
  console.log(value);
}


//* ------------------------------------------------------------
//* 22. ITERATOR — DEFINITION
//* ------------------------------------------------------------

//* An iterator is an object with a next() method that returns an object like:
//* { value: ..., done: false }

const iterator = iterable[Symbol.iterator]();
console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: 30, done: false }
console.log(iterator.next()); // { value: undefined, done: true }


//* ------------------------------------------------------------
//* 23. GENERATOR FUNCTION
//* ------------------------------------------------------------

function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = numberGenerator();
console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { value: undefined, done: true }

//* A generator function can pause at yield and resume later.


//* ------------------------------------------------------------
//* 24. GENERATOR WITH FOR...OF
//* ------------------------------------------------------------

function* ids() {
  yield "user-1";
  yield "user-2";
  yield "user-3";
}

for (const id of ids()) {
  console.log(id);
}


//* ------------------------------------------------------------
//* 25. GENERATOR RETURN VALUE
//* ------------------------------------------------------------

function* exampleGenerator() {
  yield "visible";
  return "final";
}

const g = exampleGenerator();
console.log(g.next()); // visible
console.log(g.next()); // final, done true

//* A for...of loop consumes yielded values but does not normally expose the
//* generator's final return value.


//* ------------------------------------------------------------
//* 26. GENERATOR INPUT WITH NEXT(value)
//* ------------------------------------------------------------

function* conversation() {
  const name = yield "What is your name?";
  return `Hello ${name}`;
}

const conversationGenerator = conversation();
console.log(conversationGenerator.next()); // question
console.log(conversationGenerator.next("Ravi")); // Hello Ravi

//* The first next() starts execution until the first yield.
//* A later next(value) sends a value back into the paused yield expression.


//* ------------------------------------------------------------
//* 27. SYMBOL — UNIQUE PRIMITIVE
//* ------------------------------------------------------------

const id = Symbol("id");
const object = { [id]: 123 };

console.log(object[id]); // 123
console.log(typeof id); // symbol


//* ------------------------------------------------------------
//* 28. SYMBOL ITERATOR
//* ------------------------------------------------------------

const customCollection = {
  items: ["A", "B"],
  *[Symbol.iterator]() {
    yield* this.items;
  },
};

console.log([...customCollection]); // ["A", "B"]

//* Symbol.iterator is the protocol hook used by for...of and other consumers.


//* ------------------------------------------------------------
//* 29. WELL-KNOWN SYMBOL TOSTRINGTAG
//* ------------------------------------------------------------

const tagged = {
  [Symbol.toStringTag]: "MyObject",
};

console.log(Object.prototype.toString.call(tagged)); // [object MyObject]

//* Well-known symbols customize standardized language behaviors.


//* ------------------------------------------------------------
//* 30. PROXY — DEFINITION
//* ------------------------------------------------------------

//* Proxy creates an object that can intercept fundamental operations on a target.

const target = { name: "Ravi" };

const logged = new Proxy(target, {
  get(targetObject, property, receiver) {
    console.log(`GET ${String(property)}`);
    return Reflect.get(targetObject, property, receiver);
  },
});

console.log(logged.name); // logs GET name, then Ravi


//* ------------------------------------------------------------
//* 31. PROXY SET VALIDATION
//* ------------------------------------------------------------

const positiveOnly = new Proxy(
  {},
  {
    set(targetObject, property, value, receiver) {
      if (property === "age" && (!Number.isInteger(value) || value < 0)) {
        throw new TypeError("age must be a non-negative integer");
      }

      return Reflect.set(targetObject, property, value, receiver);
    },
  },
);

positiveOnly.age = 21;
console.log(positiveOnly.age); // 21

//* Proxy traps should generally use Reflect operations to preserve normal semantics.


//* ------------------------------------------------------------
//* 32. PROXY HAS TRAP
//* ------------------------------------------------------------

const hidden = new Proxy(
  { secret: "123", name: "Ravi" },
  {
    has(targetObject, property) {
      if (property === "secret") return false;
      return Reflect.has(targetObject, property);
    },
  },
);

console.log("secret" in hidden); // false
console.log("name" in hidden); // true

//* Proxies can alter behavior. Use them only when the abstraction is worth it.


//* ------------------------------------------------------------
//* 33. REFLECT VS OBJECT OPERATIONS
//* ------------------------------------------------------------

const data = { name: "Ravi" };

console.log(Reflect.get(data, "name")); // Ravi
console.log(Reflect.has(data, "name")); // true
Reflect.set(data, "age", 21);
console.log(data.age); // 21

//* Reflect exposes object internal operations as functions and works naturally
//* with Proxy traps.


//* ------------------------------------------------------------
//* 34. TAGGED TEMPLATE — BASIC
//* ------------------------------------------------------------

function highlight(strings, ...values) {
  return strings.reduce((result, string, index) => {
    const value = values[index - 1];
    return result + (index === 0 ? "" : `[${value}]`) + string;
  }, "");
}

const name = "Ravi";
console.log(highlight`Hello ${name}!`);

//* A tagged template passes the template strings and interpolated values to a
//* function instead of immediately producing only one final string.


//* ------------------------------------------------------------
//* 35. REST VS SPREAD — ADVANCED VIEW
//* ------------------------------------------------------------

function collect(first, ...rest) {
  return [first, rest];
}

console.log(collect(1, 2, 3)); // [1, [2, 3]]

const values = [2, 3];
console.log([1, ...values]); // [1, 2, 3]

//* Rest collects values into a new array.
//* Spread expands an iterable into another context.


//* ------------------------------------------------------------
//* 36. DESTRUCTURING DEFAULTS
//* ------------------------------------------------------------

const settingsObject = { theme: "dark" };
const { theme, language = "en" } = settingsObject;

console.log(theme); // dark
console.log(language); // en

//* Defaults apply when the extracted value is undefined.


//* ------------------------------------------------------------
//* 37. DESTRUCTURING DOES NOT DEEP CLONE
//* ------------------------------------------------------------

const source = { nested: { value: 1 } };
const { nested } = source;

nested.value = 2;
console.log(source.nested.value); // 2

//* Destructuring extracts the reference to the nested object; it does not clone it.


//* ------------------------------------------------------------
//* 38. OPTIONAL CHAINING
//* ------------------------------------------------------------

const response = {
  user: {
    profile: {
      name: "Ravi",
    },
  },
};

console.log(response.user?.profile?.name); // Ravi
console.log(response.user?.settings?.theme); // undefined

//* ?. stops a property/call access when the left side is null or undefined.


//* ------------------------------------------------------------
//* 39. NULLISH COALESCING
//* ------------------------------------------------------------

const savedLimit = 0;
const limit = savedLimit ?? 10;

console.log(limit); // 0

//* ?? uses the fallback only for null or undefined.
//* This differs from ||, which also treats other falsy values as absent.


//* ------------------------------------------------------------
//* 40. LOGICAL ASSIGNMENT
//* ------------------------------------------------------------

let username;
username ??= "guest";
console.log(username); // guest

let enabled = false;
enabled ||= true;
console.log(enabled); // true

let count = 1;
count += 2;
console.log(count); // 3

//* ||= assigns when the left side is falsy.
//* ??= assigns when the left side is nullish.


//* ------------------------------------------------------------
//* 41. SHORT-CIRCUIT AS CONTROL FLOW
//* ------------------------------------------------------------

function expensiveOperation() {
  console.log("running");
  return true;
}

const allowed = false;
allowed && expensiveOperation(); // does not call the function

//* && and || can skip evaluating their right-hand operand.


//* ------------------------------------------------------------
//* 42. EQUALITY: OBJECT IDENTITY
//* ------------------------------------------------------------

const firstObject = { value: 1 };
const secondObject = { value: 1 };
const sameReference = firstObject;

console.log(firstObject === secondObject); // false
console.log(firstObject === sameReference); // true

//* Objects are compared by identity/reference, not structural content.


//* ------------------------------------------------------------
//* 43. STRUCTURED CLONE VS REFERENCE
//* ------------------------------------------------------------

const original = { nested: { value: 1 } };
const cloned = structuredClone(original);

cloned.nested.value = 99;

console.log(original.nested.value); // 1
console.log(cloned.nested.value); // 99

//* structuredClone creates an independent structured copy for supported values.


//* ------------------------------------------------------------
//* 44. WEAKMAP PRIVATE METADATA
//* ------------------------------------------------------------

const privateData = new WeakMap();

function createUser(name) {
  const userObject = { name };
  privateData.set(userObject, { loginCount: 0 });
  return userObject;
}

const ravi = createUser("Ravi");
privateData.get(ravi).loginCount += 1;
console.log(privateData.get(ravi).loginCount); // 1

//* WeakMap can associate metadata with objects without adding an enumerable
//* property to those objects. The weak-key behavior is important for lifetime.


//* ------------------------------------------------------------
//* 45. WEAK COLLECTIONS CANNOT BE INSPECTED FOR SIZE
//* ------------------------------------------------------------

const weakMap = new WeakMap();
const keyObject = {};
weakMap.set(keyObject, "metadata");

console.log(weakMap.get(keyObject)); // metadata
//* weakMap.size does not exist.
//* for...of does not work on WeakMap.

//* This prevents observing the complete set of weakly-held keys.


//* ------------------------------------------------------------
//* 46. MAP WITH OBJECT KEYS
//* ------------------------------------------------------------

const metadataMap = new Map();
const key = {};
metadataMap.set(key, "value");

console.log(metadataMap.get(key)); // value
console.log(metadataMap.get({})); // undefined

//* Two separately-created objects are different keys even if their contents match.


//* ------------------------------------------------------------
//* 47. MAP WITH NaN KEY
//* ------------------------------------------------------------

const numbersMap = new Map();
numbersMap.set(NaN, "not-a-number");

console.log(numbersMap.get(NaN)); // not-a-number

//* Map key matching uses SameValueZero semantics, so NaN matches NaN.


//* ------------------------------------------------------------
//* 48. SET OBJECT IDENTITY
//* ------------------------------------------------------------

const set = new Set();
set.add({ id: 1 });
set.add({ id: 1 });

console.log(set.size); // 2

//* Set removes duplicate values according to its equality semantics.
//* Separate object literals are different object identities.


//* ------------------------------------------------------------
//* 49. SET DEDUPLICATION
//* ------------------------------------------------------------

const duplicateNumbers = [1, 1, 2, 2, 3, 3];
const uniqueNumbers = [...new Set(duplicateNumbers)];

console.log(uniqueNumbers); // [1, 2, 3]


//* ------------------------------------------------------------
//* 50. CUSTOM COMPARISON IS NOT BUILT INTO SET
//* ------------------------------------------------------------

const users = [
  { id: 1, name: "Ravi" },
  { id: 1, name: "Ravi" },
];

const uniqueById = [
  ...new Map(users.map((userObject) => [userObject.id, userObject])).values(),
];

console.log(uniqueById); // [{ id: 1, name: "Ravi" }]

//* For uniqueness by a property, define the key explicitly, often with Map.


//* ------------------------------------------------------------
//* 51. FUNCTION AS FIRST-CLASS VALUE
//* ------------------------------------------------------------

function square(value) {
  return value * value;
}

const operation = square;
console.log(operation(5)); // 25

//* Functions can be stored in variables, passed as arguments and returned.


//* ------------------------------------------------------------
//* 52. HIGHER-ORDER FUNCTION
//* ------------------------------------------------------------

function withLogging(fn) {
  return (...args) => {
    console.log("Calling function");
    const result = fn(...args);
    console.log("Result:", result);
    return result;
  };
}

const loggedSquare = withLogging(square);
console.log(loggedSquare(4));

//* A higher-order function receives or returns a function.


//* ------------------------------------------------------------
//* 53. FUNCTION COMPOSITION
//* ------------------------------------------------------------

const trim = (value) => value.trim();
const toLower = (value) => value.toLowerCase();
const addBang = (value) => `${value}!`;

const compose = (f, g, h) => (value) => h(g(f(value)));

console.log(compose(trim, toLower, addBang)("  HELLO  ")); // hello!


//* ------------------------------------------------------------
//* 54. CURRYING
//* ------------------------------------------------------------

function multiply(a) {
  return function multiplyBy(b) {
    return a * b;
  };
}

const double = multiply(2);
console.log(double(5)); // 10

//* Currying transforms a multi-argument operation into a sequence of functions
//* that each receive part of the arguments.


//* ------------------------------------------------------------
//* 55. MEMOIZATION
//* ------------------------------------------------------------

function memoize(fn) {
  const cache = new Map();

  return (value) => {
    if (cache.has(value)) {
      return cache.get(value);
    }

    const result = fn(value);
    cache.set(value, result);
    return result;
  };
}

const expensiveSquare = memoize((n) => {
  console.log("calculating...");
  return n * n;
});

console.log(expensiveSquare(10)); // calculates, then 100
console.log(expensiveSquare(10)); // cached, then 100

//* Memoization trades memory for repeated-computation savings.
//* The cache must have a sensible lifetime/size policy in real applications.


//* ------------------------------------------------------------
//* 56. PURE FUNCTION
//* ------------------------------------------------------------

function addPure(a, b) {
  return a + b;
}

console.log(addPure(2, 3)); // 5

//* A pure function produces the same output for the same relevant inputs and
//* does not cause observable side effects.


//* ------------------------------------------------------------
//* 57. IMPURE FUNCTION
//* ------------------------------------------------------------

let total = 0;

function addImpure(value) {
  total += value;
  return total;
}

console.log(addImpure(5)); // 5
console.log(addImpure(5)); // 10

//* The result depends on external mutable state.


//* ------------------------------------------------------------
//* 58. ASYNC FUNCTION RETURNS PROMISE
//* ------------------------------------------------------------

async function getUser() {
  return { id: 1, name: "Ravi" };
}

getUser().then(console.log);

//* An async function always returns a Promise.
//* Returning a normal value fulfills that Promise.


//* ------------------------------------------------------------
//* 59. AWAIT PAUSES THE ASYNC FUNCTION, NOT THE WHOLE RUNTIME
//* ------------------------------------------------------------

async function demoAwait() {
  const value = await Promise.resolve("done");
  return value;
}

demoAwait().then(console.log); // done

//* await pauses execution of the surrounding async function until the Promise
//* settles. It does not block the JavaScript thread in the usual sense.


//* ------------------------------------------------------------
//* 60. PROMISE MICROTASK PREVIEW
//* ------------------------------------------------------------

console.log("A");

Promise.resolve().then(() => console.log("B"));

console.log("C");

//* Typical output:
//* A
//* C
//* B

//* Promise reactions are scheduled as microtasks and run after the current
//* synchronous job completes, before the next ordinary task when the host model
//* permits.


//* ------------------------------------------------------------
//* 61. QUEUE MICROtask
//* ------------------------------------------------------------

queueMicrotask(() => console.log("microtask"));
console.log("sync");

//* Typical output:
//* sync
//* microtask

//* queueMicrotask() schedules a microtask directly.


//* ------------------------------------------------------------
//* 62. OPTIONAL CATCH BINDING
//* ------------------------------------------------------------

try {
  throw new Error("failed");
} catch {
  console.log("Handled without binding the error");
}

//* Use catch without a binding when the error value is not needed.


//* ------------------------------------------------------------
//* 63. ERROR.CAUSE
//* ------------------------------------------------------------

try {
  try {
    throw new Error("database timeout");
  } catch (error) {
    throw new Error("Could not load profile", { cause: error });
  }
} catch (error) {
  console.log(error.message); // Could not load profile
  console.log(error.cause.message); // database timeout
}


//* ------------------------------------------------------------
//* 64. ASYNC ERROR PROPAGATION
//* ------------------------------------------------------------

async function failingTask() {
  throw new Error("Task failed");
}

failingTask().catch((error) => {
  console.log(error.message); // Task failed
});

//* Throwing inside async functions creates a rejected Promise.


//* ------------------------------------------------------------
//* 65. PROMISE.ALL CONCURRENCY
//* ------------------------------------------------------------

async function loadDashboard() {
  const [profileData, settingsData] = await Promise.all([
    Promise.resolve("profile"),
    Promise.resolve("settings"),
  ]);

  return { profileData, settingsData };
}

loadDashboard().then(console.log);

//* Independent asynchronous operations can often be started together with
//* Promise.all() instead of awaiting them sequentially.


//* ------------------------------------------------------------
//* 66. SEQUENTIAL VS CONCURRENT SHAPE
//* ------------------------------------------------------------

async function sequential() {
  const first = await Promise.resolve("first");
  const second = await Promise.resolve("second");
  return [first, second];
}

async function concurrent() {
  const firstPromise = Promise.resolve("first");
  const secondPromise = Promise.resolve("second");
  return Promise.all([firstPromise, secondPromise]);
}

sequential().then(console.log);
concurrent().then(console.log);

//* Real network calls may have meaningful latency differences between these designs.
//* Choose based on dependencies, not blindly on "async is faster".


//* ------------------------------------------------------------
//* 67. ASYNC ITERATION
//* ------------------------------------------------------------

async function* asyncNumbers() {
  yield 1;
  yield 2;
  yield 3;
}

async function consumeAsyncNumbers() {
  for await (const value of asyncNumbers()) {
    console.log(value);
  }
}

consumeAsyncNumbers();

//* Async generators produce values over time and can be consumed with for await...of.


//* ------------------------------------------------------------
//* 68. ASYNC ITERABLE PROTOCOL
//* ------------------------------------------------------------

const asyncIterable = {
  async *[Symbol.asyncIterator]() {
    yield "A";
    yield "B";
  },
};

async function consume() {
  for await (const value of asyncIterable) {
    console.log(value);
  }
}

consume();

//* Symbol.asyncIterator defines the async iteration protocol.


//* ------------------------------------------------------------
//* 69. MAP / SET ITERATION
//* ------------------------------------------------------------

const map = new Map([
  ["name", "Ravi"],
  ["role", "developer"],
]);

for (const [key, value] of map) {
  console.log(key, value);
}

const setValues = new Set([1, 2, 3]);
for (const value of setValues) {
  console.log(value);
}

//* Map and Set preserve insertion order during standard iteration.


//* ------------------------------------------------------------
//* 70. MAP KEYS ARE NOT OBJECT PROPERTIES
//* ------------------------------------------------------------

const mapExample = new Map();
mapExample.set("name", "Ravi");

console.log(mapExample.get("name")); // Ravi
//* console.log(mapExample.name); // undefined

//* Use Map.get()/set()/has()/delete(), not property notation.


//* ------------------------------------------------------------
//* 71. OBJECT PROPERTY KEY COERCION VS MAP
//* ------------------------------------------------------------

const objectKeys = {};
objectKeys[1] = "number-like key";
objectKeys["1"] = "same property";

console.log(objectKeys[1]); // same property

const mapKeys = new Map();
mapKeys.set(1, "number key");
mapKeys.set("1", "string key");

console.log(mapKeys.get(1)); // number key
console.log(mapKeys.get("1")); // string key

//* Object property keys are strings or Symbols.
//* Map preserves the actual key value identity/type.


//* ------------------------------------------------------------
//* 72. PROPERTY KEY ORDER IS NOT "MAP ORDER"
//* ------------------------------------------------------------

const orderObject = {};
orderObject["2"] = "two";
orderObject["1"] = "one";
orderObject.b = "b";

console.log(Object.keys(orderObject));

//* Ordinary object property ordering has specific ECMAScript rules, including
//* special ordering for integer-index-like keys. Map has insertion-order semantics.


//* ------------------------------------------------------------
//* 73. SYMBOL AS NON-STRING KEY
//* ------------------------------------------------------------

const secretKey = Symbol("secret");
const recordWithSymbol = {
  name: "Ravi",
  [secretKey]: 123,
};

console.log(Object.keys(recordWithSymbol)); // ["name"]
console.log(Object.getOwnPropertySymbols(recordWithSymbol));

//* Object.keys() does not include Symbol keys.


//* ------------------------------------------------------------
//* 74. OBJECT.PROTOTYPE POLLUTION AWARENESS
//* ------------------------------------------------------------

const dictionary = Object.create(null);
dictionary.safe = "value";

console.log(dictionary.safe); // value
console.log(Object.getPrototypeOf(dictionary)); // null

//* A null-prototype dictionary has no inherited Object.prototype properties.
//* This can be useful for dictionary-like data, though Map is often clearer.


//* ------------------------------------------------------------
//* 75. HASOWNPROPERTY PITFALL
//* ------------------------------------------------------------

const safeObject = Object.create(null);
safeObject.name = "Ravi";

console.log(Object.hasOwn(safeObject, "name")); // true
//* safeObject.hasOwnProperty("name") would fail because the object has no prototype.

//* Object.hasOwn() is robust for arbitrary objects, including null-prototype objects.


//* ------------------------------------------------------------
//* 76. FUNCTION NAME AND LENGTH
//* ------------------------------------------------------------

function example(a, b = 10, ...rest) {
  return a + b + rest.length;
}

console.log(example.name); // example
console.log(example.length); // 1

//* Function.length counts parameters before the first parameter with a default,
//* excluding the rest parameter.


//* ------------------------------------------------------------
//* 77. NAMED FUNCTION EXPRESSION
//* ------------------------------------------------------------

const factorial = function factorialFunction(n) {
  if (n <= 1) return 1;
  return n * factorialFunction(n - 1);
};

console.log(factorial(5)); // 120

//* A named function expression gives the function a local name that is useful
//* for recursion and debugging.


//* ------------------------------------------------------------
//* 78. TAIL CALL NOTE
//* ------------------------------------------------------------

function sumRecursive(n, total = 0) {
  if (n === 0) return total;
  return sumRecursive(n - 1, total + n);
}

console.log(sumRecursive(5)); // 15

//* This has tail-recursive shape, but do not assume every JavaScript runtime
//* performs proper tail-call optimization. Deep recursion can still overflow.


//* ------------------------------------------------------------
//* 79. EVALUATION OF DEFAULT PARAMETERS
//* ------------------------------------------------------------

let defaultCounter = 0;

function makeValue(value = ++defaultCounter) {
  return value;
}

console.log(makeValue()); // 1
console.log(makeValue(100)); // 100
console.log(defaultCounter); // 1

//* Default parameter expressions run when the corresponding argument is undefined.


//* ------------------------------------------------------------
//* 80. PARAMETER SCOPE
//* ------------------------------------------------------------

function parameterScope(value, transformed = value * 2) {
  return transformed;
}

console.log(parameterScope(5)); // 10

//* Later default parameter expressions can reference earlier parameters.


//* ------------------------------------------------------------
//* 81. DESTRUCTURED PARAMETERS
//* ------------------------------------------------------------

function createSummary({ name, role = "developer" }) {
  return `${name} — ${role}`;
}

console.log(createSummary({ name: "Ravi" })); // Ravi — developer


//* ------------------------------------------------------------
//* 82. REST PARAMETERS ARE REAL ARRAYS
//* ------------------------------------------------------------

function collectNumbers(...values) {
  console.log(Array.isArray(values)); // true
  return values.reduce((sum, value) => sum + value, 0);
}

console.log(collectNumbers(1, 2, 3)); // 6

//* Unlike the legacy arguments object, rest parameters create a real Array.


//* ------------------------------------------------------------
//* 83. OPTIONAL CATCH + ERROR NARROWING IDEA
//* ------------------------------------------------------------

try {
  JSON.parse("not-json");
} catch (error) {
  if (error instanceof SyntaxError) {
    console.log("Invalid JSON");
  }
}

//* In JavaScript, instanceof can help distinguish Error subclasses when the
//* prototype relationship is reliable.


//* ------------------------------------------------------------
//* 84. OBJECT FREEZE IS SHALLOW
//* ------------------------------------------------------------

const frozen = Object.freeze({ nested: { value: 1 } });
frozen.nested.value = 2;
console.log(frozen.nested.value); // 2

//* Freeze protects the immediate object's properties, not recursively nested objects.


//* ------------------------------------------------------------
//* 85. RECURSIVE FREEZE CONCEPT
//* ------------------------------------------------------------

function deepFreeze(value) {
  if (value && typeof value === "object") {
    for (const key of Reflect.ownKeys(value)) {
      const child = value[key];
      if (child && typeof child === "object") {
        deepFreeze(child);
      }
    }
    Object.freeze(value);
  }

  return value;
}

const immutableConfig = deepFreeze({
  api: { baseUrl: "https://example.com" },
});

console.log(Object.isFrozen(immutableConfig)); // true
console.log(Object.isFrozen(immutableConfig.api)); // true

//* Deep freezing requires careful handling of cycles and special object types
//* in production. This example is for learning.


//* ------------------------------------------------------------
//* 86. PROXY INVARIANTS — IMPORTANT
//* ------------------------------------------------------------

const fixed = {};
Object.defineProperty(fixed, "id", {
  value: 1,
  writable: false,
  configurable: false,
});

const safeProxy = new Proxy(fixed, {
  get(targetObject, property, receiver) {
    return Reflect.get(targetObject, property, receiver);
  },
});

console.log(safeProxy.id); // 1

//* Proxy traps cannot arbitrarily violate certain invariants of the target.
//* Reflect helps keep ordinary semantics aligned with those invariants.


//* ------------------------------------------------------------
//* 87. PROXY REVOCATION
//* ------------------------------------------------------------

const revocable = Proxy.revocable({ value: 10 }, {});
console.log(revocable.proxy.value); // 10
revocable.revoke();

//* console.log(revocable.proxy.value); // TypeError after revoke

//* A revocable Proxy can be permanently disabled.


//* ------------------------------------------------------------
//* 88. PRIVATE FIELDS ARE NOT PROXY-TRANSPARENT
//* ------------------------------------------------------------

class SecretBox {
  #value = 42;

  getValue() {
    return this.#value;
  }
}

const secretBox = new SecretBox();
const proxiedSecretBox = new Proxy(secretBox, {});

console.log(secretBox.getValue()); // 42
//* proxiedSecretBox.getValue(); // TypeError: private field access checks identity

//* #private access requires the actual branded instance. A transparent-looking
//* Proxy does not automatically preserve that private-brand relationship.


//* ------------------------------------------------------------
//* 89. CUSTOM TOJSON
//* ------------------------------------------------------------

const session = {
  username: "Ravi",
  token: "secret-token",

  toJSON() {
    return { username: this.username };
  },
};

console.log(JSON.stringify(session)); // {"username":"Ravi"}

//* toJSON() lets an object control the value JSON.stringify serializes.
//* Never rely on serialization hooks alone as a security boundary.


//* ------------------------------------------------------------
//* 90. SYMBOL.TO PRIMITIVE
//* ------------------------------------------------------------

const money = {
  value: 100,

  [Symbol.toPrimitive](hint) {
    if (hint === "number") return this.value;
    return `$${this.value}`;
  },
};

console.log(Number(money)); // 100
console.log(String(money)); // $100

//* Symbol.toPrimitive customizes conversion to primitive values.


//* ------------------------------------------------------------
//* 91. VALUEOF / TOSTRING NOTE
//* ------------------------------------------------------------

const customValue = {
  value: 10,

  valueOf() {
    return this.value;
  },
};

console.log(Number(customValue)); // 10

//* valueOf() and toString() participate in object-to-primitive conversion when
//* Symbol.toPrimitive is not controlling the conversion.


//* ------------------------------------------------------------
//* 92. ITERATOR CLEANUP WITH RETURN()
//* ------------------------------------------------------------

const resourceIterable = {
  [Symbol.iterator]() {
    let index = 0;

    return {
      next() {
        if (index < 3) return { value: index++, done: false };
        return { value: undefined, done: true };
      },
      return() {
        console.log("Iterator cleanup");
        return { value: undefined, done: true };
      },
    };
  },
};

for (const value of resourceIterable) {
  console.log(value);
  if (value === 1) break;
}

//* for...of can call iterator.return() when iteration terminates early.


//* ------------------------------------------------------------
//* 93. GENERATOR FINALLY CLEANUP
//* ------------------------------------------------------------

function* resourceGenerator() {
  try {
    yield "resource opened";
    yield "using resource";
  } finally {
    console.log("resource cleaned up");
  }
}

for (const value of resourceGenerator()) {
  console.log(value);
  break;
}

//* Generator finally blocks are useful for cleanup when iteration ends early.


//* ------------------------------------------------------------
//* 94. ASYNC GENERATOR CLEANUP
//* ------------------------------------------------------------

async function* asyncResource() {
  try {
    yield "opened";
    yield "working";
  } finally {
    console.log("async cleanup");
  }
}

async function useAsyncResource() {
  for await (const value of asyncResource()) {
    console.log(value);
    break;
  }
}

useAsyncResource();


//* ------------------------------------------------------------
//* 95. MODULE LIVE BINDING CONCEPT
//* ------------------------------------------------------------

//* ES module imports are bindings to exported values, not simply copied snapshots.
//* If an exporting module changes an exported binding, importers can observe the
//* updated binding according to module semantics.


//* ------------------------------------------------------------
//* 96. DYNAMIC IMPORT CONCEPT
//* ------------------------------------------------------------

//* Dynamic import() returns a Promise for a module namespace object.
//* Example shape:
//* import("./math.js").then((module) => console.log(module.default));

//* It can be used for conditional/lazy loading.


//* ------------------------------------------------------------
//* 97. REAL-WORLD: DEBOUNCE WITH CLOSURE
//* ------------------------------------------------------------

function debounce(fn, delay) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}

const search = debounce((query) => {
  console.log("Search:", query);
}, 100);

search("jav");
search("java");
search("javascript");

//* Only the latest call within the delay window runs.
//* The timer ID is private closure state.


//* ------------------------------------------------------------
//* 98. REAL-WORLD: THROTTLE CONCEPT
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

const reportScroll = throttle(() => {
  console.log("Handling event");
}, 100);

reportScroll();
reportScroll();

//* Throttle limits how frequently a function executes.


//* ------------------------------------------------------------
//* 99. REAL-WORLD: LAZY VALUE WITH CLOSURE
//* ------------------------------------------------------------

function once(factory) {
  let initialized = false;
  let value;

  return () => {
    if (!initialized) {
      value = factory();
      initialized = true;
    }

    return value;
  };
}

const getConfig = once(() => ({ api: "https://example.com" }));
console.log(getConfig() === getConfig()); // true

//* once() initializes a value only on first access and remembers it via closure.


//* ------------------------------------------------------------
//* 100. REAL-WORLD: EVENT HANDLER FACTORY
//* ------------------------------------------------------------

function createClickHandler(id) {
  return () => {
    console.log(`Clicked item ${id}`);
  };
}

const clickHandler = createClickHandler(42);
clickHandler(); // Clicked item 42

//* Closures are common in UI event handlers because handlers need to remember
//* item-specific state.


//* ------------------------------------------------------------
//* 101. REAL-WORLD: MAP AS CACHE
//* ------------------------------------------------------------

function createCache() {
  const cache = new Map();

  return {
    get(key) {
      return cache.get(key);
    },
    set(key, value) {
      cache.set(key, value);
    },
    has(key) {
      return cache.has(key);
    },
  };
}

const cache = createCache();
cache.set("user:1", { name: "Ravi" });
console.log(cache.get("user:1"));

//* Combining closures with Map is a common way to encapsulate cache state.


//* ------------------------------------------------------------
//* 102. REAL-WORLD: PROXY CHANGE TRACKING
//* ------------------------------------------------------------

function createTrackedState(initialState) {
  const changes = [];

  const state = new Proxy(initialState, {
    set(targetObject, property, value, receiver) {
      changes.push({ property, value });
      return Reflect.set(targetObject, property, value, receiver);
    },
  });

  return { state, changes };
}

const trackedState = createTrackedState({ count: 0 });
trackedState.state.count = 1;
console.log(trackedState.changes);

//* Proxies can implement reactive/change-tracking systems, though production
//* frameworks usually require much more machinery around dependency tracking.


//* ------------------------------------------------------------
//* 103. REAL-WORLD: CUSTOM ITERABLE PAGINATION SHAPE
//* ------------------------------------------------------------

const pages = {
  data: ["page-1", "page-2", "page-3"],
  *[Symbol.iterator]() {
    for (const page of this.data) {
      yield page;
    }
  },
};

console.log([...pages]);

//* Custom iterables let your domain objects participate naturally in for...of,
//* spread and other iterable-consuming APIs.


//* ------------------------------------------------------------
//* 104. REAL-WORLD: UNIQUE OBJECT METADATA
//* ------------------------------------------------------------

const objectMetadata = new WeakMap();

function markProcessed(value) {
  objectMetadata.set(value, { processedAt: Date.now() });
}

const task = {};
markProcessed(task);
console.log(objectMetadata.get(task));

//* WeakMap is useful when metadata should not itself keep the key object alive.


//* ------------------------------------------------------------
//* 105. COMMON MISTAKE — ARROW THIS
//* ------------------------------------------------------------

const button = {
  name: "Save",
  regular() {
    return this.name;
  },
  arrow: () => this?.name,
};

console.log(button.regular()); // Save
console.log(button.arrow()); // usually undefined in this module/script context

//* An arrow function defined as an object property does not get this from the
//* object call. It captures lexical this from where it was created.


//* ------------------------------------------------------------
//* 106. COMMON MISTAKE — DETACHING A METHOD
//* ------------------------------------------------------------

const service = {
  name: "API",
  getName() {
    return this.name;
  },
};

const detached = service.getName;
//* detached(); // this depends on the call context and may be undefined in strict mode.

console.log(service.getName()); // API

//* If a method needs stable this, use bind(), an arrow wrapper, or redesign the API.


//* ------------------------------------------------------------
//* 107. COMMON MISTAKE — MAP BRACKET ACCESS
//* ------------------------------------------------------------

const settingsMap = new Map([["theme", "dark"]]);

console.log(settingsMap.get("theme")); // dark
//* console.log(settingsMap.theme); // undefined


//* ------------------------------------------------------------
//* 108. COMMON MISTAKE — SET DOES NOT SORT
//* ------------------------------------------------------------

const insertionSet = new Set([3, 1, 2]);
console.log([...insertionSet]); // [3, 1, 2]

//* Set preserves insertion order; it is not a sorting data structure.


//* ------------------------------------------------------------
//* 109. COMMON MISTAKE — WEAKMAP IS NOT ITERABLE
//* ------------------------------------------------------------

const wm = new WeakMap();
wm.set({}, "value");

//* for (const item of wm) {} // TypeError
//* WeakMap intentionally does not expose iteration or size.


//* ------------------------------------------------------------
//* 110. COMMON MISTAKE — CLOSURE LOOP WITH VAR
//* ------------------------------------------------------------

var callbacks = [];

for (var index = 0; index < 3; index += 1) {
  callbacks.push(() => index);
}

console.log(callbacks[0]()); // 3
console.log(callbacks[1]()); // 3
console.log(callbacks[2]()); // 3

//* var has function scope, so these callbacks share the same binding.


//* ------------------------------------------------------------
//* 111. COMMON MISTAKE — MUTATING SHARED STATE
//* ------------------------------------------------------------

const shared = { count: 0 };
const alias = shared;
alias.count += 1;

console.log(shared.count); // 1

//* Both variables refer to the same object.


//* ------------------------------------------------------------
//* 112. COMMON MISTAKE — PROMISE ALL SEQUENTIAL THINKING
//* ------------------------------------------------------------

async function independentTasks() {
  const firstPromise = Promise.resolve("first");
  const secondPromise = Promise.resolve("second");

  return Promise.all([firstPromise, secondPromise]);
}

independentTasks().then(console.log);

//* Start independent work before awaiting when concurrency is desired.


//* ------------------------------------------------------------
//* 113. OUTPUT PREDICTION
//* ------------------------------------------------------------

const closureCounter = (() => {
  let value = 0;
  return () => ++value;
})();

console.log(closureCounter()); // ?
console.log(closureCounter()); // ?

//* Answer: 1, then 2.


//* ------------------------------------------------------------
//* 114. OUTPUT PREDICTION
//* ------------------------------------------------------------

const baseObject = { value: 10 };
const childObject = Object.create(baseObject);
childObject.value = 20;

console.log(childObject.value); // ?
console.log(baseObject.value); // ?

//* Answer: 20, then 10.


//* ------------------------------------------------------------
//* 115. OUTPUT PREDICTION
//* ------------------------------------------------------------

const sameValue = NaN;
const nanMap = new Map([[NaN, "found"]]);

console.log(nanMap.get(sameValue)); // ?

//* Answer: "found".


//* ------------------------------------------------------------
//* 116. OUTPUT PREDICTION
//* ------------------------------------------------------------

const frozenObject = Object.freeze({ nested: { x: 1 } });
frozenObject.nested.x = 5;
console.log(frozenObject.nested.x); // ?

//* Answer: 5, because freeze() is shallow.


//* ------------------------------------------------------------
//* 117. OUTPUT PREDICTION
//* ------------------------------------------------------------

console.log("start");
Promise.resolve().then(() => console.log("promise"));
console.log("end");

//* Typical answer: start, end, promise.


//* ------------------------------------------------------------
//* 118. OUTPUT PREDICTION
//* ------------------------------------------------------------

const generatorTest = (function* () {
  yield 10;
  yield 20;
})();

console.log(generatorTest.next().value); // ?
console.log(generatorTest.next().value); // ?

//* Answer: 10, then 20.


//* ------------------------------------------------------------
//* 119. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1:
//* Build createCounter(start) with increment, decrement and reset methods.

//* Challenge 2:
//* Implement your own once(fn) utility.

//* Challenge 3:
//* Implement debounce(fn, delay).

//* Challenge 4:
//* Implement throttle(fn, interval).

//* Challenge 5:
//* Create an object with a custom Symbol.iterator.

//* Challenge 6:
//* Create a generator that yields numbers from start to end.

//* Challenge 7:
//* Create a Map-based memoize() function that supports multiple arguments.

//* Challenge 8:
//* Build a class with #private state and static factory method.

//* Challenge 9:
//* Build a Proxy that rejects unknown properties.

//* Challenge 10:
//* Build a Proxy that validates a user's age and name.

//* Challenge 11:
//* Create a WeakMap-based metadata system for objects.

//* Challenge 12:
//* Create a custom iterable that yields only active records.

//* Challenge 13:
//* Write compose() and pipe() utilities.

//* Challenge 14:
//* Implement a small currying helper.

//* Challenge 15:
//* Build a tagged template that safely formats a simple message.

//* Challenge 16:
//* Create an async generator that yields paginated results.

//* Challenge 17:
//* Implement a concurrency helper that runs at most N async tasks at once.

//* Challenge 18:
//* Create a small LRU cache using Map.

//* Challenge 19:
//* Explain why an object-key Map differs from an object dictionary.

//* Challenge 20:
//* Implement a deepFreeze learning utility that handles circular references.


//* ------------------------------------------------------------
//* 120. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1:
//* const obj = { value: 10, get: () => this.value };
//* Why does obj.get() not behave like a normal method?

//* Debug 2:
//* const map = new Map();
//* map["name"] = "Ravi";
//* Why does map.get("name") return undefined?

//* Debug 3:
//* const set = new Set([{ id: 1 }, { id: 1 }]);
//* Why is set.size 2?

//* Debug 4:
//* for (var i = 0; i < 3; i++) callbacks.push(() => i);
//* Why do all callbacks return 3?

//* Debug 5:
//* Object.freeze({ nested: {} }).nested.x = 1;
//* Why can the nested object still change?

//* Debug 6:
//* const detached = user.greet; detached();
//* Why can this become undefined?

//* Debug 7:
//* await taskA(); await taskB();
//* If taskA and taskB are independent, how could you run them concurrently?

//* Debug 8:
//* for (const item of weakMap) {}
//* Why is this invalid?

//* Debug 9:
//* const proxy = new Proxy(instance, {}); proxy.privateMethod();
//* Why can #private access fail through a Proxy?

//* Debug 10:
//* A memoization cache grows forever.
//* What memory/performance problem can this create, and how would you bound it?


//* ------------------------------------------------------------
//* 121. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What exactly is a closure?
//* 2. Why does a closure keep outer variables alive?
//* 3. How does this differ between normal and arrow functions?
//* 4. What is the prototype chain?
//* 5. What does new do conceptually?
//* 6. How are classes connected to prototypes?
//* 7. What are private # fields?
//* 8. What is an iterator?
//* 9. What makes an object iterable?
//* 10. What does yield do?
//* 11. What is a generator?
//* 12. What is Symbol.iterator?
//* 13. What is a Proxy?
//* 14. Why use Reflect inside Proxy traps?
//* 15. What is a property descriptor?
//* 16. Why is Object.freeze() shallow?
//* 17. Why is Map different from Object?
//* 18. Why can't WeakMap be iterated?
//* 19. What is memoization?
//* 20. What is currying?
//* 21. What is function composition?
//* 22. What does async function return?
//* 23. What does await actually pause?
//* 24. What is a microtask?
//* 25. What is an async iterator?


//* ------------------------------------------------------------
//* 122. INTERVIEW QUESTIONS
//* ------------------------------------------------------------

//* Q1. Explain lexical scoping and closures.
//* Q2. How does JavaScript resolve a variable through the scope chain?
//* Q3. Explain this binding rules with examples.
//* Q4. Why does an arrow function not have its own this?
//* Q5. Difference between call(), apply() and bind()?
//* Q6. Explain prototype inheritance without using the word "class".
//* Q7. What does new do internally?
//* Q8. Are JavaScript classes truly classical inheritance?
//* Q9. What are private class fields and how are they different from naming conventions?
//* Q10. What is the iterable protocol?
//* Q11. What is the iterator protocol?
//* Q12. Generator vs normal function?
//* Q13. Generator vs async generator?
//* Q14. What are well-known Symbols?
//* Q15. What are Proxy traps?
//* Q16. What are Proxy invariants?
//* Q17. Why can a Proxy break access to private fields?
//* Q18. What is Reflect and why is it useful with Proxy?
//* Q19. What is memoization and what are its trade-offs?
//* Q20. What is currying vs partial application?
//* Q21. What is a pure function?
//* Q22. Why can an unbounded cache become a memory leak?
//* Q23. Promise.all() vs sequential await?
//* Q24. What is a microtask queue?
//* Q25. Explain async iteration.
//* Q26. What is a tagged template?
//* Q27. What is Symbol.toPrimitive?
//* Q28. Why does Map support object keys while Object does not preserve object-key identity?
//* Q29. Why are WeakMap and WeakSet intentionally non-iterable?
//* Q30. When would you avoid Proxy even though it can solve the problem?


//* ============================================================
//* MASTER RULE
//* ============================================================

//* Advanced JavaScript mastery means you can:
//* Understand the mechanism -> predict behavior -> write it -> debug it ->
//* explain trade-offs -> decide when NOT to use it.

//* END OF ADVANCED JAVASCRIPT
