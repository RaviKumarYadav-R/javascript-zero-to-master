//* ============================================================
//* JAVASCRIPT BUILT-IN OBJECTS — PRACTICAL COMPANION
//* ============================================================

//* Definition:
//* Built-in objects are standard objects, constructors, and namespaces
//* provided by the JavaScript language/runtime. They solve common problems
//* such as numbers, text, dates, collections, JSON, errors and reflection.

//* Important distinction:
//* ECMAScript provides language built-ins such as Object, Array, Map, Set,
//* Promise, Date, RegExp, Math, JSON and Reflect. Browser/Node APIs such as
//* document, fetch and process are runtime/host features, not ECMAScript
//* built-ins.


//* ------------------------------------------------------------
//* 1. OBJECT — BASE OBJECT OPERATIONS
//* ------------------------------------------------------------

const user = {
  name: "Ravi",
  age: 21,
};

console.log(Object.keys(user)); // ["name", "age"]
console.log(Object.values(user)); // ["Ravi", 21]
console.log(Object.entries(user)); // [["name", "Ravi"], ["age", 21]]

//* Object.keys() returns an array of own enumerable property names.
//* Object.values() returns corresponding values.
//* Object.entries() returns [key, value] pairs.


//* ------------------------------------------------------------
//* 2. Object.hasOwn()
//* ------------------------------------------------------------

console.log(Object.hasOwn(user, "name")); // true
console.log(Object.hasOwn(user, "toString")); // false

//* Object.hasOwn() checks only the object's own property.


//* ------------------------------------------------------------
//* 3. Object.fromEntries()
//* ------------------------------------------------------------

const entries = [
  ["name", "Ravi"],
  ["role", "developer"],
];

const profile = Object.fromEntries(entries);
console.log(profile);

//* Converts an iterable of [key, value] pairs into an object.


//* ------------------------------------------------------------
//* 4. OBJECT.ASSIGN()
//* ------------------------------------------------------------

const target = { a: 1 };
const source = { b: 2 };

Object.assign(target, source);

console.log(target); // { a: 1, b: 2 }

//* Object.assign() copies enumerable own properties into target.
//* It MUTATES the target object.


//* ------------------------------------------------------------
//* 5. OBJECT SPREAD VS ASSIGN
//* ------------------------------------------------------------

const original = { a: 1, b: 2 };
const copy = { ...original };
const anotherCopy = Object.assign({}, original);

console.log(copy);
console.log(anotherCopy);

//* Both create shallow copies in this example.


//* ------------------------------------------------------------
//* 6. OBJECT.FREEZE()
//* ------------------------------------------------------------

const config = Object.freeze({
  mode: "production",
});

//* config.mode = "development"; // ignored in non-strict code
console.log(config.mode); // production

//* Object.freeze() prevents changes to the object's own data properties.
//* It is SHALLOW: nested objects can still be mutable unless also frozen.


//* ------------------------------------------------------------
//* 7. OBJECT.SEAL()
//* ------------------------------------------------------------

const account = Object.seal({
  name: "Ravi",
});

account.name = "Aman"; // allowed
//* account.age = 21; // not allowed as a new property
//* delete account.name; // not allowed

console.log(account);

//* seal() prevents adding/removing properties but allows permitted value changes.


//* ------------------------------------------------------------
//* 8. OBJECT.CREATE()
//* ------------------------------------------------------------

const animalPrototype = {
  speak() {
    return "sound";
  },
};

const dog = Object.create(animalPrototype);
console.log(dog.speak()); // sound

//* Object.create(proto) creates an object whose prototype is proto.


//* ------------------------------------------------------------
//* 9. OBJECT.GETPROTOTYPEOF()
//* ------------------------------------------------------------

console.log(Object.getPrototypeOf(dog) === animalPrototype); // true

//* Retrieves the prototype of an object.


//* ------------------------------------------------------------
//* 10. OBJECT.SETPROTOTYPEOF() — KNOW, DON'T OVERUSE
//* ------------------------------------------------------------

const first = { type: "first" };
const second = { type: "second" };

Object.setPrototypeOf(first, second);
console.log(first.type); // first
console.log(Object.getPrototypeOf(first) === second); // true

//* Changing prototypes dynamically can hurt performance and make code harder
//* to reason about. Prefer Object.create(), classes or explicit composition.


//* ------------------------------------------------------------
//* 11. OBJECT PROPERTY DESCRIPTORS
//* ------------------------------------------------------------

const product = { name: "Laptop" };

console.log(Object.getOwnPropertyDescriptor(product, "name"));

//* A normal data property has value, writable, enumerable and configurable
//* descriptor attributes.


//* ------------------------------------------------------------
//* 12. DEFINEPROPERTY()
//* ------------------------------------------------------------

const settings = {};

Object.defineProperty(settings, "version", {
  value: 1,
  writable: false,
  enumerable: true,
  configurable: false,
});

console.log(settings.version); // 1

//* defineProperty() gives precise control over property descriptors.


//* ------------------------------------------------------------
//* 13. GETTER AND SETTER
//* ------------------------------------------------------------

const person = {
  firstName: "Ravi",
  lastName: "Kumar",

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  set fullName(value) {
    [this.firstName, this.lastName] = value.split(" ");
  },
};

console.log(person.fullName); // Ravi Kumar
person.fullName = "Aman Singh";
console.log(person.fullName); // Aman Singh

//* Getter is accessed like a property but executes a function.
//* Setter runs when a value is assigned to the property.


//* ------------------------------------------------------------
//* 14. ARRAY — BUILT-IN COLLECTION
//* ------------------------------------------------------------

const numbers = [1, 2, 3];

console.log(Array.isArray(numbers)); // true
console.log(Array.from("JS")); // ["J", "S"]
console.log(Array.of(1, 2, 3)); // [1, 2, 3]

//* Array.isArray() reliably checks whether a value is an Array.
//* Array.from() creates an Array from an iterable/array-like value.
//* Array.of() creates an Array from its arguments.


//* ------------------------------------------------------------
//* 15. ARRAY.FROM() WITH MAPPING
//* ------------------------------------------------------------

const doubled = Array.from([1, 2, 3], (value) => value * 2);
console.log(doubled); // [2, 4, 6]


//* ------------------------------------------------------------
//* 16. ARRAY BUFFER PREVIEW
//* ------------------------------------------------------------

const arrayLike = { 0: "a", 1: "b", length: 2 };
console.log(Array.from(arrayLike)); // ["a", "b"]

//* Array-like means indexed properties plus a length property.


//* ------------------------------------------------------------
//* 17. STRING — TEXT OBJECT / CONSTRUCTOR
//* ------------------------------------------------------------

const message = "JavaScript";

console.log(message.length); // 10
console.log(message.toUpperCase()); // JAVASCRIPT
console.log(message.includes("Script")); // true

//* Primitive strings can access String methods through temporary wrapper objects.
//* Strings themselves are immutable.


//* ------------------------------------------------------------
//* 18. STRING() CONVERSION
//* ------------------------------------------------------------

console.log(String(123)); // "123"
console.log(String(null)); // "null"
console.log(String(undefined)); // "undefined"
console.log(String(true)); // "true"

//* String(value) explicitly converts a value to a string.


//* ------------------------------------------------------------
//* 19. NUMBER — NUMERIC CONVERSION
//* ------------------------------------------------------------

console.log(Number("42")); // 42
console.log(Number("hello")); // NaN
console.log(Number("")); // 0

//* Number(value) performs numeric conversion.


//* ------------------------------------------------------------
//* 20. NUMBER.ISNAN()
//* ------------------------------------------------------------

console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN("hello")); // false

//* Number.isNaN() checks specifically for the numeric NaN value.
//* It does not coerce its argument.


//* ------------------------------------------------------------
//* 21. NUMBER.ISFINITE()
//* ------------------------------------------------------------

console.log(Number.isFinite(42)); // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite("42")); // false

//* Number.isFinite() also does not coerce.


//* ------------------------------------------------------------
//* 22. NUMBER.ISINTEGER()
//* ------------------------------------------------------------

console.log(Number.isInteger(10)); // true
console.log(Number.isInteger(10.5)); // false
console.log(Number.isInteger("10")); // false


//* ------------------------------------------------------------
//* 23. NUMBER SAFE INTEGER RANGE
//* ------------------------------------------------------------

console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991

//* Integers outside the safe integer range may not be represented exactly.
//* Use BigInt when integer precision beyond Number's safe range is required.


//* ------------------------------------------------------------
//* 24. NUMBER EPSILON
//* ------------------------------------------------------------

console.log(Number.EPSILON);

//* Number.EPSILON is the difference between 1 and the next representable
//* Number greater than 1. It is useful when discussing floating-point error,
//* but it is not a universal tolerance for every numeric comparison.


//* ------------------------------------------------------------
//* 25. NUMBER PARSEINT()
//* ------------------------------------------------------------

console.log(Number.parseInt("42px", 10)); // 42
console.log(Number.parseInt("101", 2)); // 5

//* parseInt() parses an integer prefix according to a radix.
//* Always provide the radix when parsing numeric strings intentionally.


//* ------------------------------------------------------------
//* 26. NUMBER PARSEFLOAT()
//* ------------------------------------------------------------

console.log(Number.parseFloat("12.5rem")); // 12.5

//* parseFloat() parses a floating-point prefix.


//* ------------------------------------------------------------
//* 27. BIGINT
//* ------------------------------------------------------------

const huge = 9007199254740993n;
console.log(huge);
console.log(typeof huge); // bigint

//* BigInt represents integers with arbitrary precision.
//* BigInt and Number should not be mixed directly in arithmetic.


//* ------------------------------------------------------------
//* 28. BIGINT CONVERSION
//* ------------------------------------------------------------

console.log(BigInt("9007199254740993"));
console.log(BigInt(42));

//* BigInt() can convert suitable values to BigInt.


//* ------------------------------------------------------------
//* 29. MATH — MATHEMATICAL NAMESPACE
//* ------------------------------------------------------------

console.log(Math.PI);
console.log(Math.E);
console.log(Math.sqrt(81)); // 9
console.log(Math.abs(-10)); // 10
console.log(Math.pow(2, 3)); // 8

//* Math is a namespace of mathematical constants and functions.
//* It is not a constructor; don't use new Math().


//* ------------------------------------------------------------
//* 30. MATH FLOOR / CEIL / TRUNC / ROUND
//* ------------------------------------------------------------

console.log(Math.floor(4.9)); // 4
console.log(Math.ceil(4.1)); // 5
console.log(Math.trunc(4.9)); // 4
console.log(Math.round(4.5)); // 5

console.log(Math.floor(-4.1)); // -5
console.log(Math.trunc(-4.1)); // -4

//* floor() moves toward negative infinity.
//* trunc() removes the fractional part toward zero.


//* ------------------------------------------------------------
//* 31. MATH MIN / MAX
//* ------------------------------------------------------------

console.log(Math.min(4, 2, 8)); // 2
console.log(Math.max(4, 2, 8)); // 8


//* ------------------------------------------------------------
//* 32. RANDOM NUMBER
//* ------------------------------------------------------------

const random = Math.random();
console.log(random); // >= 0 and < 1

//* Math.random() is not cryptographically secure.
//* Do not use it for passwords, tokens, security keys or security decisions.


//* ------------------------------------------------------------
//* 33. RANDOM INTEGER
//* ------------------------------------------------------------

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(randomInt(1, 6));

//* Produces an integer from min through max, assuming valid finite bounds.


//* ------------------------------------------------------------
//* 34. DATE — REPRESENTING A TIME POINT
//* ------------------------------------------------------------

const now = new Date();
console.log(now);
console.log(now.getFullYear());
console.log(now.getMonth());
console.log(now.getDate());
console.log(now.getDay());

//* Date represents a timestamp measured from the ECMAScript epoch.
//* Numeric getMonth() is zero-based: January = 0.
//* getDate() is day of month; getDay() is day of week.


//* ------------------------------------------------------------
//* 35. DATE FROM ISO STRING
//* ------------------------------------------------------------

const launchDate = new Date("2026-01-15T10:30:00Z");
console.log(launchDate.toISOString());

//* ISO-style date strings are generally preferable for unambiguous exchange.


//* ------------------------------------------------------------
//* 36. DATE TIMESTAMP
//* ------------------------------------------------------------

console.log(Date.now());
console.log(launchDate.getTime());

//* Date.now() returns the current Unix-like millisecond timestamp.
//* getTime() returns the timestamp represented by a Date.


//* ------------------------------------------------------------
//* 37. DATE ARITHMETIC
//* ------------------------------------------------------------

const start = new Date("2026-01-01T00:00:00Z");
const end = new Date("2026-01-03T00:00:00Z");

const differenceMs = end - start;
const differenceDays = differenceMs / (1000 * 60 * 60 * 24);

console.log(differenceDays); // 2


//* ------------------------------------------------------------
//* 38. REGEXP — PATTERN MATCHING
//* ------------------------------------------------------------

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(emailPattern.test("ravi@example.com")); // true
console.log(emailPattern.test("invalid-email")); // false

//* RegExp represents a regular expression pattern.
//* It is useful for searching/validating text patterns, but complex validation
//* often needs explicit parsing and business rules too.


//* ------------------------------------------------------------
//* 39. REGEXP MATCH()
//* ------------------------------------------------------------

const text = "Order 123, Order 456";
console.log(text.match(/\d+/g)); // ["123", "456"]


//* ------------------------------------------------------------
//* 40. REGEXP REPLACE()
//* ------------------------------------------------------------

console.log("hello   world".replace(/\s+/g, " ")); // hello world


//* ------------------------------------------------------------
//* 41. REGEXP FLAGS
//* ------------------------------------------------------------

const pattern = /javascript/gi;
console.log("JavaScript JAVASCRIPT".match(pattern));

//* i = case-insensitive
//* g = global matching
//* m = multiline
//* s = dotAll
//* u = Unicode-aware matching mode
//* y = sticky matching
//* d = match indices


//* ------------------------------------------------------------
//* 42. JSON — JAVASCRIPT OBJECT NOTATION
//* ------------------------------------------------------------

const data = {
  name: "Ravi",
  skills: ["JS", "React"],
};

const jsonText = JSON.stringify(data);
console.log(jsonText);

const parsedData = JSON.parse(jsonText);
console.log(parsedData.skills[0]); // JS

//* JSON.stringify(): JavaScript value -> JSON text string.
//* JSON.parse(): JSON text string -> JavaScript value.


//* ------------------------------------------------------------
//* 43. JSON IS TEXT
//* ------------------------------------------------------------

console.log(typeof jsonText); // string
console.log(typeof parsedData); // object

//* A JSON document/string is text. It is not the same thing as a JS object.


//* ------------------------------------------------------------
//* 44. JSON LIMITATIONS
//* ------------------------------------------------------------

const jsonExample = {
  date: new Date("2026-01-01T00:00:00Z"),
  missing: undefined,
};

console.log(JSON.stringify(jsonExample));

//* JSON has a limited data model. Undefined object properties are omitted;
//* Date is serialized through its JSON representation (an ISO string).


//* ------------------------------------------------------------
//* 45. JSON REVIVER / REPLACER PREVIEW
//* ------------------------------------------------------------

const json = '{"name":"Ravi","age":21}';

const revived = JSON.parse(json, (key, value) => {
  if (key === "age") return Number(value);
  return value;
});

console.log(revived);

const replaced = JSON.stringify({ secret: "123", name: "Ravi" }, (key, value) => {
  if (key === "secret") return undefined;
  return value;
});

console.log(replaced);


//* ------------------------------------------------------------
//* 46. SYMBOL — UNIQUE PROPERTY KEY
//* ------------------------------------------------------------

const id = Symbol("id");
const record = {
  [id]: 123,
  name: "Ravi",
};

console.log(record[id]); // 123
console.log(Object.getOwnPropertySymbols(record));

//* Symbol creates unique primitive values often used as non-string property keys.


//* ------------------------------------------------------------
//* 47. SYMBOLS ARE UNIQUE
//* ------------------------------------------------------------

const symbolA = Symbol("id");
const symbolB = Symbol("id");

console.log(symbolA === symbolB); // false


//* ------------------------------------------------------------
//* 48. SYMBOL.FOR() — GLOBAL SYMBOL REGISTRY
//* ------------------------------------------------------------

const globalSymbolA = Symbol.for("app.id");
const globalSymbolB = Symbol.for("app.id");

console.log(globalSymbolA === globalSymbolB); // true
console.log(Symbol.keyFor(globalSymbolA)); // app.id

//* Symbol.for() uses a shared global symbol registry.
//* It is different from creating Symbol("app.id") each time.


//* ------------------------------------------------------------
//* 49. PROMISE — ASYNCHRONOUS RESULT CONTAINER
//* ------------------------------------------------------------

const promise = Promise.resolve("done");

promise.then((value) => {
  console.log(value); // done
});

//* A Promise represents the eventual completion or failure of an asynchronous
//* operation. Its states are pending, fulfilled or rejected.


//* ------------------------------------------------------------
//* 50. PROMISE REJECTION
//* ------------------------------------------------------------

Promise.reject(new Error("Something failed"))
  .catch((error) => {
    console.log(error.message); // Something failed
  });


//* ------------------------------------------------------------
//* 51. PROMISE.ALL()
//* ------------------------------------------------------------

Promise.all([
  Promise.resolve("profile"),
  Promise.resolve("settings"),
]).then((results) => {
  console.log(results); // ["profile", "settings"]
});

//* Promise.all() fulfills when all fulfill; rejects when any input rejects.


//* ------------------------------------------------------------
//* 52. PROMISE.ALLSETTLED()
//* ------------------------------------------------------------

Promise.allSettled([
  Promise.resolve("ok"),
  Promise.reject(new Error("failed")),
]).then((results) => {
  console.log(results);
});

//* allSettled() waits for every input and reports each outcome.


//* ------------------------------------------------------------
//* 53. PROMISE.RACE()
//* ------------------------------------------------------------

Promise.race([
  new Promise((resolve) => setTimeout(() => resolve("fast"), 10)),
  new Promise((resolve) => setTimeout(() => resolve("slow"), 50)),
]).then(console.log);

//* race() settles when the first input settles, whether fulfilled or rejected.


//* ------------------------------------------------------------
//* 54. PROMISE.ANY()
//* ------------------------------------------------------------

Promise.any([
  Promise.reject(new Error("A")),
  Promise.resolve("success"),
]).then(console.log);

//* any() fulfills when the first input fulfills.
//* It rejects with AggregateError if all inputs reject.


//* ------------------------------------------------------------
//* 55. ERROR — STANDARD ERROR OBJECT
//* ------------------------------------------------------------

const error = new Error("Invalid input");

console.log(error.name); // Error
console.log(error.message); // Invalid input
console.log(error.stack); // environment-dependent stack information

//* Error objects represent failures with useful metadata such as name/message.


//* ------------------------------------------------------------
//* 56. CUSTOM ERROR
//* ------------------------------------------------------------

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

try {
  throw new ValidationError("Email is required");
} catch (error) {
  console.log(error.name, error.message);
}


//* ------------------------------------------------------------
//* 57. ERROR.CAUSE
//* ------------------------------------------------------------

const lowLevelError = new Error("Database unavailable");
const highLevelError = new Error("Could not load profile", {
  cause: lowLevelError,
});

console.log(highLevelError.cause.message);

//* cause preserves the lower-level reason while allowing a higher-level error
//* message appropriate to the current abstraction boundary.


//* ------------------------------------------------------------
//* 58. REFLECT — REFLECTION OPERATIONS
//* ------------------------------------------------------------

const accountData = { name: "Ravi" };

console.log(Reflect.get(accountData, "name")); // Ravi
Reflect.set(accountData, "age", 21);
console.log(accountData.age); // 21
console.log(Reflect.has(accountData, "name")); // true
Reflect.deleteProperty(accountData, "age");

//* Reflect provides methods corresponding to many internal object operations.
//* It is useful for meta-programming and Proxy implementations.


//* ------------------------------------------------------------
//* 59. REFLECT.OWNKEYS()
//* ------------------------------------------------------------

const key = Symbol("secret");
const obj = { a: 1, [key]: 2 };

console.log(Reflect.ownKeys(obj)); // ["a", Symbol(secret)]

//* ownKeys() includes string and Symbol own property keys.


//* ------------------------------------------------------------
//* 60. PROXY — META-PROGRAMMING
//* ------------------------------------------------------------

const targetObject = { name: "Ravi" };

const proxy = new Proxy(targetObject, {
  get(target, property, receiver) {
    console.log(`Reading: ${String(property)}`);
    return Reflect.get(target, property, receiver);
  },
});

console.log(proxy.name); // logs access, then Ravi

//* Proxy can intercept operations such as get, set, has and deleteProperty.
//* It is powerful but should be used carefully because it changes object behavior.


//* ------------------------------------------------------------
//* 61. WEAKMAP / WEAKSET — COLLECTION BUILT-INS
//* ------------------------------------------------------------

const metadata = new WeakMap();
const objectKey = {};
metadata.set(objectKey, { private: true });

const tracked = new WeakSet();
tracked.add(objectKey);

console.log(metadata.get(objectKey));
console.log(tracked.has(objectKey));

//* Weak collections are covered deeply in 07-Collections.


//* ------------------------------------------------------------
//* 62. TYPED ARRAYS PREVIEW
//* ------------------------------------------------------------

const bytes = new Uint8Array([10, 20, 255]);

console.log(bytes[0]); // 10
console.log(bytes.length); // 3

//* Typed arrays provide views over binary numeric data with a fixed element type.


//* ------------------------------------------------------------
//* 63. ARRAYBUFFER PREVIEW
//* ------------------------------------------------------------

const buffer = new ArrayBuffer(4);
console.log(buffer.byteLength); // 4

const view = new Uint8Array(buffer);
view[0] = 255;
console.log(view[0]); // 255

//* ArrayBuffer represents a raw fixed-length byte buffer.
//* A typed-array/DataView provides a view for reading/writing it.


//* ------------------------------------------------------------
//* 64. DATAVIEW PREVIEW
//* ------------------------------------------------------------

const dataBuffer = new ArrayBuffer(4);
const dataView = new DataView(dataBuffer);

dataView.setUint32(0, 500);
console.log(dataView.getUint32(0)); // 500

//* DataView allows explicit control over numeric interpretation and endianness.


//* ------------------------------------------------------------
//* 65. MAP / SET REFERENCE
//* ------------------------------------------------------------

//* Map and Set are built-in collection types, but the detailed collection
//* chapter is 07-Collections. Avoid learning the same API twice.


//* ------------------------------------------------------------
//* 66. URL-RELATED HOST API NOTE
//* ------------------------------------------------------------

//* URL is a standardized Web API provided by browser/Node runtimes, not a
//* core ECMAScript built-in. It is intentionally not demonstrated here as part
//* of the language built-in chapter.


//* ------------------------------------------------------------
//* 67. INTL — INTERNATIONALIZATION NAMESPACE
//* ------------------------------------------------------------

const numberFormatter = new Intl.NumberFormat("en-IN");
console.log(numberFormatter.format(1234567.89));

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
});
console.log(dateFormatter.format(new Date("2026-01-15T00:00:00Z")));

//* Intl provides locale-sensitive formatting and comparison capabilities.


//* ------------------------------------------------------------
//* 68. INTL.NUMBERFORMAT
//* ------------------------------------------------------------

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

console.log(currencyFormatter.format(49999));


//* ------------------------------------------------------------
//* 69. INTL.DATEFORMAT
//* ------------------------------------------------------------

const formatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

console.log(formatter.format(new Date("2026-01-15T00:00:00Z")));


//* ------------------------------------------------------------
//* 70. INTL.COLLATOR
//* ------------------------------------------------------------

const collator = new Intl.Collator("en", { sensitivity: "base" });

console.log(collator.compare("JavaScript", "javascript")); // 0

//* Collator provides locale-aware string comparison and can be used for sorting.


//* ------------------------------------------------------------
//* 71. INTL.LISTFORMAT
//* ------------------------------------------------------------

const listFormatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

console.log(listFormatter.format(["HTML", "CSS", "JavaScript"]));


//* ------------------------------------------------------------
//* 72. INTL.RELATIVETIMEFORMAT
//* ------------------------------------------------------------

const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
console.log(relative.format(-1, "day")); // yesterday


//* ------------------------------------------------------------
//* 73. BIGINT + NUMBER MISTAKE
//* ------------------------------------------------------------

const bigNumber = 10n;
const normalNumber = 2;

//* console.log(bigNumber + normalNumber); // TypeError
console.log(bigNumber + BigInt(normalNumber)); // 12n

//* Convert deliberately before mixing numeric domains.


//* ------------------------------------------------------------
//* 74. DATE MONTH MISTAKE
//* ------------------------------------------------------------

const january = new Date(2026, 0, 15);
console.log(january.getMonth()); // 0

//* Numeric Date month values are zero-based.


//* ------------------------------------------------------------
//* 75. NUMBER.MIN_VALUE MISTAKE
//* ------------------------------------------------------------

console.log(Number.MIN_VALUE > 0); // true

//* Number.MIN_VALUE is the smallest positive nonzero Number,
//* not the most negative Number.


//* ------------------------------------------------------------
//* 76. NaN IS A NUMBER TYPE
//* ------------------------------------------------------------

console.log(typeof NaN); // "number"
console.log(Number.isNaN(NaN)); // true

//* NaN means an invalid numeric result, but its ECMAScript type is Number.


//* ------------------------------------------------------------
//* 77. OBJECT WRAPPER MISTAKE
//* ------------------------------------------------------------

const primitiveFalse = false;
const wrappedFalse = new Boolean(false);

console.log(Boolean(primitiveFalse)); // false
console.log(Boolean(wrappedFalse)); // true

//* Boolean wrapper objects are objects and therefore truthy.
//* Prefer primitive booleans: true/false.


//* ------------------------------------------------------------
//* 78. STRING WRAPPER MISTAKE
//* ------------------------------------------------------------

const primitiveString = "hello";
const wrappedString = new String("hello");

console.log(typeof primitiveString); // string
console.log(typeof wrappedString); // object

//* Avoid wrapper constructors such as new String(), new Number() and
//* new Boolean() in normal application code.


//* ------------------------------------------------------------
//* 79. DATE INVALID VALUE
//* ------------------------------------------------------------

const invalidDate = new Date("not-a-real-date");
console.log(Number.isNaN(invalidDate.getTime())); // true

//* Invalid Date objects exist; validate their timestamp before using them.


//* ------------------------------------------------------------
//* 80. REGEXP STATEFUL GLOBAL FLAG
//* ------------------------------------------------------------

const globalPattern = /a/g;

console.log(globalPattern.test("a")); // true
console.log(globalPattern.test("a")); // false

//* A global RegExp can maintain lastIndex state across test() calls.
//* Be careful when reusing stateful regex instances.


//* ------------------------------------------------------------
//* 81. JSON DEEP CLONE WARNING
//* ------------------------------------------------------------

const sourceData = {
  name: "Ravi",
  nested: { score: 10 },
};

const jsonClone = JSON.parse(JSON.stringify(sourceData));
jsonClone.nested.score = 20;

console.log(sourceData.nested.score); // 10

//* JSON cloning can work for simple JSON-compatible data, but it loses or
//* changes values that JSON cannot faithfully represent. Prefer structuredClone
//* when its supported data model is appropriate.


//* ------------------------------------------------------------
//* 82. STRUCTUREDCLONE()
//* ------------------------------------------------------------

const originalData = {
  name: "Ravi",
  nested: { score: 10 },
};

const clonedData = structuredClone(originalData);
clonedData.nested.score = 99;

console.log(originalData.nested.score); // 10
console.log(clonedData.nested.score); // 99

//* structuredClone() performs a structured clone for supported values.
//* It is not a universal clone for every possible JavaScript object.


//* ------------------------------------------------------------
//* 83. REAL-WORLD: PRICE FORMATTING
//* ------------------------------------------------------------

function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

console.log(formatPrice(1599.5));


//* ------------------------------------------------------------
//* 84. REAL-WORLD: SAFE NUMBER INPUT
//* ------------------------------------------------------------

function parseAge(input) {
  const age = Number(input);

  if (!Number.isInteger(age) || age < 0) {
    return null;
  }

  return age;
}

console.log(parseAge("21")); // 21
console.log(parseAge("abc")); // null


//* ------------------------------------------------------------
//* 85. REAL-WORLD: ERROR TRANSLATION
//* ------------------------------------------------------------

function loadProfile() {
  try {
    throw new Error("database timeout");
  } catch (error) {
    throw new Error("Profile service unavailable", { cause: error });
  }
}

try {
  loadProfile();
} catch (error) {
  console.log(error.message);
  console.log(error.cause?.message);
}


//* ------------------------------------------------------------
//* 86. REAL-WORLD: UNIQUE REQUEST IDS
//* ------------------------------------------------------------

function createId() {
  return Symbol("request");
}

const requestId = createId();
console.log(typeof requestId); // symbol

//* Symbol is useful when you need a unique property key/value identity.
//* For externally transmitted IDs, use an appropriate serializable ID strategy.


//* ------------------------------------------------------------
//* 87. OUTPUT PREDICTION
//* ------------------------------------------------------------

console.log(Math.floor(-2.1)); // ?
console.log(Math.trunc(-2.1)); // ?

//* Answers: -3 and -2.


//* ------------------------------------------------------------
//* 88. OUTPUT PREDICTION
//* ------------------------------------------------------------

console.log(Number.isNaN("NaN")); // ?
console.log(Number.isNaN(NaN)); // ?

//* Answers: false and true.


//* ------------------------------------------------------------
//* 89. OUTPUT PREDICTION
//* ------------------------------------------------------------

const prediction = Object.freeze({ nested: { value: 1 } });
prediction.nested.value = 2;

console.log(prediction.nested.value); // ?

//* Answer: 2 in normal non-strict code because freeze() is shallow.


//* ------------------------------------------------------------
//* 90. OUTPUT PREDICTION
//* ------------------------------------------------------------

console.log(String(null)); // ?
console.log(Number("")); // ?
console.log(Boolean("0")); // ?

//* Answers: "null", 0, true.


//* ------------------------------------------------------------
//* 91. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1:
//* Build a function that formats Indian currency with Intl.NumberFormat.

//* Challenge 2:
//* Validate an input as a finite integer using Number built-ins.

//* Challenge 3:
//* Build a random dice roll from 1 to 6.

//* Challenge 4:
//* Calculate the number of full days between two Date values.

//* Challenge 5:
//* Extract all numbers from a string using RegExp.

//* Challenge 6:
//* Convert an object to JSON and restore it.

//* Challenge 7:
//* Create a custom Error class for invalid form input.

//* Challenge 8:
//* Use Object.fromEntries() to transform an array of pairs into an object.

//* Challenge 9:
//* Create a Proxy that logs property reads.

//* Challenge 10:
//* Create a typed array containing RGB channel values.

//* Challenge 11:
//* Use Intl.ListFormat to generate a readable skill list.

//* Challenge 12:
//* Compare two strings using Intl.Collator.


//* ------------------------------------------------------------
//* 92. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1:
//* const value = new Number(0);
//* if (value) console.log("truthy");
//* Question: Why does it print "truthy"?

//* Debug 2:
//* console.log(Number.isNaN("hello"));
//* Question: Why is this false instead of true?

//* Debug 3:
//* const date = new Date(2026, 1, 1);
//* Question: Which month is this?

//* Debug 4:
//* console.log(Math.floor(-1.2));
//* Question: Why is it -2 instead of -1?

//* Debug 5:
//* const map = JSON.stringify(new Map([["a", 1]]));
//* Question: Why doesn't normal JSON.stringify preserve a Map's entries?

//* Debug 6:
//* const a = { nested: { x: 1 } };
//* const b = { ...a };
//* b.nested.x = 2;
//* Question: Why did a.nested.x also change?


//* ------------------------------------------------------------
//* 93. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is a JavaScript built-in object?
//* 2. Which features are ECMAScript built-ins and which are host APIs?
//* 3. What does Object.keys() return?
//* 4. What is the difference between Object.hasOwn() and in?
//* 5. Why is Object.assign() considered mutating?
//* 6. What does Object.freeze() do and why is it shallow?
//* 7. What is a property descriptor?
//* 8. What is the difference between a getter and a normal property?
//* 9. What does Array.from() do?
//* 10. Why are strings immutable?
//* 11. What is NaN and how should it be checked?
//* 12. What is the safe integer limit for Number?
//* 13. Why use BigInt?
//* 14. Why should Math.random() not be used for security?
//* 15. What is the difference between Math.floor() and Math.trunc()?
//* 16. Why is Date.getMonth() zero-based?
//* 17. What does a RegExp represent?
//* 18. What is JSON.stringify() vs JSON.parse()?
//* 19. Why are Symbol values unique?
//* 20. What is Promise.all() vs allSettled()?
//* 21. What is Error.cause used for?
//* 22. What problem does Reflect solve?
//* 23. What is a Proxy?
//* 24. What are typed arrays?
//* 25. Why use Intl instead of manually formatting every locale?


//* ------------------------------------------------------------
//* 94. INTERVIEW QUESTIONS
//* ------------------------------------------------------------

//* Q1. Why is typeof null === "object"?
//* Q2. Difference between Number.isNaN() and global isNaN()?
//* Q3. Difference between parseInt() and Number()?
//* Q4. Why does 0.1 + 0.2 not exactly equal 0.3?
//* Q5. Number vs BigInt?
//* Q6. Date pitfalls in timezone handling?
//* Q7. What does the global RegExp flag change?
//* Q8. JSON limitations compared with arbitrary JavaScript values?
//* Q9. Symbol vs string property keys?
//* Q10. Promise.all() vs Promise.race() vs Promise.any() vs allSettled()?
//* Q11. Why are wrapper objects such as new Boolean(false) dangerous?
//* Q12. What does Object.freeze() not protect?
//* Q13. Why are Map and Set not plain Objects?
//* Q14. What is reflection in JavaScript?
//* Q15. What are Proxy traps?
//* Q16. ArrayBuffer vs TypedArray vs DataView?
//* Q17. Why are Intl APIs preferable to hand-written locale formatting?


//* ============================================================
//* END OF BUILT-IN OBJECTS
//* ============================================================
