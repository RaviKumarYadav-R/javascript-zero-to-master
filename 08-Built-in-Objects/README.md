# 08 — Built-in Objects in JavaScript

> Built-in objects are standard JavaScript objects and functions provided by the language/runtime. They give us tools for numbers, dates, text, JSON, errors, reflection, and more.

---

## 1. What Are Built-in Objects?

JavaScript provides standard constructors, namespaces, and objects for common programming tasks.

Examples:

```js
Object
Array
String
Number
Boolean
Math
Date
RegExp
JSON
Reflect
Proxy
Error
Map
Set
```

---

## 2. Why Built-in Objects Exist

They prevent developers from rebuilding common functionality from scratch.

```text
Language value
     ↓
Standard API
     ↓
Reusable operation
```

---

## 3. Core vs Host APIs

Some APIs are standardized by ECMAScript itself. Others come from the host environment.

```text
ECMAScript → Object, Array, Math, JSON, Date
Browser    → document, window, localStorage
Node.js    → process, fs, Buffer
```

Do not confuse JavaScript's language standard with browser or Node APIs.

---

## 4. `Object`

`Object` is the fundamental object constructor and namespace for many object operations.

```js
const user = { name: "Ravi" };
console.log(Object.keys(user));
```

---

## 5. `Object.keys()`

Returns an array containing an object's own enumerable string-keyed properties.

```js
Object.keys({ a: 1, b: 2 }); // ["a", "b"]
```

---

## 6. `Object.values()`

Returns own enumerable string-keyed property values.

```js
Object.values({ a: 1, b: 2 }); // [1, 2]
```

---

## 7. `Object.entries()`

Returns key-value pairs.

```js
Object.entries({ a: 1 }); // [["a", 1]]
```

This is useful for iteration and conversion.

---

## 8. `Object.fromEntries()`

Converts iterable key-value pairs into an object.

```js
Object.fromEntries([["name", "Ravi"]]);
```

---

## 9. `Object.hasOwn()`

Checks whether a property belongs directly to an object.

```js
Object.hasOwn(user, "name"); // true
```

It does not count inherited properties.

---

## 10. `Object.assign()`

Copies enumerable own properties from sources into a target.

```js
const target = {};
Object.assign(target, { a: 1 });
```

Important: the target object is mutated.

---

## 11. Object Spread

Object spread creates a new object and copies enumerable own properties.

```js
const copy = { ...user };
```

It is shallow.

---

## 12. `Object.create()`

Creates an object with a specified prototype.

```js
const child = Object.create(parent);
```

This is a direct way to work with prototype relationships.

---

## 13. `Object.getPrototypeOf()`

Returns an object's prototype.

```js
Object.getPrototypeOf(user);
```

Use it when investigating prototype relationships.

---

## 14. `Object.setPrototypeOf()`

Changes an object's prototype.

```js
Object.setPrototypeOf(child, parent);
```

Avoid doing this repeatedly in performance-sensitive code; prefer defining the desired prototype at creation time.

---

## 15. `Object.freeze()`

Prevents adding, deleting, or changing own data properties according to the object's property descriptor restrictions.

```js
const config = Object.freeze({ debug: false });
```

Freeze is shallow.

---

## 16. `Object.seal()`

Prevents adding or deleting properties while existing properties can still be changed when writable.

```js
Object.seal(user);
```

---

## 17. `Object.preventExtensions()`

Prevents new properties from being added.

Existing properties may still be modified or deleted depending on their descriptors.

---

## 18. Property Descriptors

A property descriptor describes attributes such as:

- value
- writable
- enumerable
- configurable
- get
- set

---

## 19. `Object.getOwnPropertyDescriptor()`

```js
Object.getOwnPropertyDescriptor(user, "name");
```

This is useful for inspecting property behavior.

---

## 20. `Object.defineProperty()`

Defines or modifies a property descriptor.

```js
Object.defineProperty(user, "id", {
  value: 1,
  writable: false
});
```

---

## 21. `Object.getOwnPropertyNames()`

Returns own string-keyed property names, including non-enumerable properties.

```js
Object.getOwnPropertyNames(obj);
```

---

## 22. `Object.getOwnPropertySymbols()`

Returns an object's own Symbol-keyed properties.

```js
Object.getOwnPropertySymbols(obj);
```

---

## 23. `Reflect.ownKeys()`

Returns own string and Symbol keys, including non-enumerable keys.

```js
Reflect.ownKeys(obj);
```

---

## 24. `Array`

`Array` is the standard constructor and namespace for arrays.

```js
const numbers = [1, 2, 3];
```

Array methods are covered deeply in the Arrays chapter.

---

## 25. `Array.isArray()`

Reliably checks whether a value is an Array.

```js
Array.isArray([]); // true
Array.isArray({}); // false
```

---

## 26. `Array.from()`

Creates an array from an iterable or array-like object.

```js
Array.from("hello");
```

It can also accept a mapping function.

---

## 27. `Array.of()`

Creates an Array from its arguments.

```js
Array.of(3); // [3]
```

This avoids the special behavior of `new Array(3)`.

---

## 28. `String`

`String` converts values to strings and provides string-related static behavior.

```js
String(123); // "123"
```

Prefer primitive strings over `new String()` wrapper objects.

---

## 29. String Wrapper Objects

Avoid:

```js
const value = new String("hello");
```

This creates an object, not a primitive string.

---

## 30. `String.raw()`

Useful with tagged template literals when raw escape sequences are desired.

```js
String.raw`a\nb`;
```

It does not interpret the escape in the normal template way.

---

## 31. `Number`

`Number` converts values to JavaScript's numeric type.

```js
Number("42"); // 42
```

JavaScript `Number` uses IEEE 754 double-precision floating point.

---

## 32. `Number.isNaN()`

Checks whether the value is the actual `NaN` numeric value without coercion.

```js
Number.isNaN(NaN); // true
Number.isNaN("NaN"); // false
```

---

## 33. `Number.isFinite()`

Checks whether a value is a finite Number without coercion.

```js
Number.isFinite(10); // true
Number.isFinite("10"); // false
```

---

## 34. Global `isNaN()` vs `Number.isNaN()`

Global `isNaN()` coerces its argument before testing.

`Number.isNaN()` does not coerce.

Prefer `Number.isNaN()` for predictable numeric validation.

---

## 35. Global `isFinite()` vs `Number.isFinite()`

Global `isFinite()` coerces values.

```js
isFinite("10"); // true
Number.isFinite("10"); // false
```

---

## 36. `Number.isInteger()`

Checks whether a value is a Number whose mathematical value is an integer.

```js
Number.isInteger(10); // true
Number.isInteger(10.5); // false
```

---

## 37. `Number.isSafeInteger()`

Checks whether an integer can be represented safely within JavaScript's safe integer range.

```js
Number.isSafeInteger(9007199254740991); // true
```

---

## 38. `Number.MAX_SAFE_INTEGER`

```js
Number.MAX_SAFE_INTEGER;
// 9007199254740991
```

Integers beyond this range can lose exact integer precision.

---

## 39. `Number.MIN_SAFE_INTEGER`

```js
Number.MIN_SAFE_INTEGER;
// -9007199254740991
```

This is the negative boundary of the safe integer range.

---

## 40. `Number.MAX_VALUE`

Represents the largest finite Number value approximately.

It is not the largest safe integer.

---

## 41. `Number.MIN_VALUE`

`Number.MIN_VALUE` is the smallest positive nonzero Number, not the most negative Number.

This distinction is a common interview trap.

---

## 42. `Number.EPSILON`

Represents the difference between 1 and the next representable Number greater than 1.

It can help reason about floating-point comparisons, but it is not a universal tolerance for every magnitude.

---

## 43. `Number.parseInt()`

Parses an integer from a string.

```js
Number.parseInt("42px", 10); // 42
```

Always specify the radix when parsing integer strings.

---

## 44. `Number.parseFloat()`

Parses a floating-point number.

```js
Number.parseFloat("3.14px"); // 3.14
```

---

## 45. `parseInt()` Is Not a Decimal Converter

`parseInt("12.9", 10)` returns `12`.

It parses an integer prefix; it does not round a decimal value.

---

## 46. `BigInt`

BigInt represents integers beyond Number's safe integer range.

```js
const big = 9007199254740993n;
```

The `n` suffix creates a BigInt literal.

---

## 47. BigInt and Number Cannot Be Mixed Directly

```js
1n + 1; // TypeError
```

Convert deliberately before combining numeric domains.

---

## 48. `BigInt()` Conversion

```js
BigInt("9007199254740993");
```

Only values that can be converted according to BigInt's rules are accepted.

---

## 49. BigInt Division

```js
5n / 2n; // 2n
```

BigInt division truncates toward zero because the result is an integer.

---

## 50. `Math`

`Math` is a namespace object containing mathematical constants and functions.

It is not a constructor.

---

## 51. `Math.PI`

```js
Math.PI;
```

Provides the mathematical constant π to the precision represented by JavaScript Number.

---

## 52. `Math.E`

```js
Math.E;
```

Provides Euler's number.

---

## 53. `Math.abs()`

Returns absolute value.

```js
Math.abs(-10); // 10
```

---

## 54. `Math.floor()`

Rounds toward negative infinity.

```js
Math.floor(4.9); // 4
Math.floor(-4.1); // -5
```

The negative case is important.

---

## 55. `Math.ceil()`

Rounds toward positive infinity.

```js
Math.ceil(4.1); // 5
Math.ceil(-4.1); // -4
```

---

## 56. `Math.round()`

Rounds according to JavaScript's specified rounding behavior.

Be especially careful around negative half values when predicting output.

---

## 57. `Math.trunc()`

Removes the fractional part by rounding toward zero.

```js
Math.trunc(-4.9); // -4
```

This differs from `Math.floor(-4.9)`.

---

## 58. `Math.min()`

Returns the smallest argument.

```js
Math.min(4, 2, 9); // 2
```

---

## 59. `Math.max()`

Returns the largest argument.

```js
Math.max(4, 2, 9); // 9
```

---

## 60. `Math.pow()`

Raises a number to a power.

```js
Math.pow(2, 3); // 8
```

The exponentiation operator `**` is usually more concise.

---

## 61. `Math.sqrt()`

Returns a square root.

```js
Math.sqrt(25); // 5
```

---

## 62. `Math.random()`

Returns a pseudo-random Number in the interval `[0, 1)`.

It can return `0`, but not `1`.

---

## 63. Random Integer Pattern

For an integer from `min` to `max`, inclusive:

```js
const value = Math.floor(Math.random() * (max - min + 1)) + min;
```

This is useful for ordinary non-security-sensitive random selection.

---

## 64. `Math.random()` Is Not Cryptographic

Do not use `Math.random()` for passwords, security tokens, authentication secrets, or cryptographic keys.

Use a cryptographically secure API such as Web Crypto where appropriate.

---

## 65. `Date`

`Date` represents a point in time as a timestamp and provides methods for date/time manipulation and formatting.

---

## 66. Current Date

```js
const now = new Date();
```

It captures the current time according to the environment clock.

---

## 67. Date Timestamp

```js
Date.now();
```

Returns the current timestamp in milliseconds since the Unix epoch.

---

## 68. Date From Timestamp

```js
const date = new Date(0);
```

This represents the Unix epoch instant.

---

## 69. Date Constructor Month Trap

For numeric date constructor arguments, months are zero-based.

```js
new Date(2026, 0, 1); // January
```

January is `0`, December is `11`.

---

## 70. `getDate()` vs `getDay()`

`getDate()` returns day of the month.

`getDay()` returns day of the week, where Sunday is `0`.

---

## 71. Date Getters

Common local-time getters include:

```js
getFullYear()
getMonth()
getDate()
getDay()
getHours()
getMinutes()
getSeconds()
getMilliseconds()
```

---

## 72. Date UTC Getters

UTC equivalents include:

```js
getUTCFullYear()
getUTCMonth()
getUTCDate()
getUTCHours()
```

Choose local or UTC intentionally.

---

## 73. Date Mutability

Date objects are mutable.

```js
const date = new Date();
date.setFullYear(2030);
```

If immutable-style logic is desired, create new Date objects rather than mutating shared instances.

---

## 74. ISO Date Strings

```js
new Date().toISOString();
```

ISO 8601-style output is useful for machine-readable timestamps.

---

## 75. Date Parsing Warning

Date parsing of arbitrary human-formatted strings can be environment-sensitive or surprising.

Prefer well-defined ISO formats and explicit parsing rules for application data.

---

## 76. Time Zones

A Date represents an instant, while display methods can interpret that instant in local time or UTC.

Do not treat a Date object as a complete time-zone database.

---

## 77. `RegExp`

Regular expressions describe text-matching patterns.

```js
const pattern = /hello/i;
```

They are useful for searching, validation, extraction, and replacement.

---

## 78. RegExp Constructor

```js
const pattern = new RegExp("hello", "i");
```

Use the constructor when the pattern must be built dynamically.

---

## 79. `RegExp.test()`

Returns whether a match exists.

```js
/hello/i.test("Hello"); // true
```

---

## 80. `RegExp.exec()`

Returns detailed match information or `null`.

```js
const match = /a(\d)/.exec("a7");
```

---

## 81. Common RegExp Flags

Important flags include:

```text
g → global
 i → case-insensitive
 m → multiline
 s → dotAll
 u → Unicode-aware
 y → sticky
 d → match indices
```

---

## 82. Global RegExp State

A global RegExp can maintain `lastIndex` state when used with certain methods.

This can surprise developers who reuse the same regex object.

---

## 83. JSON

`JSON` is a namespace for converting between JavaScript values and JSON text.

JSON itself is a data format, not a JavaScript object serialization of every possible value.

---

## 84. `JSON.stringify()`

Converts supported JavaScript values into a JSON string.

```js
const text = JSON.stringify({ name: "Ravi" });
```

---

## 85. `JSON.parse()`

Converts valid JSON text into a JavaScript value.

```js
const data = JSON.parse('{"name":"Ravi"}');
```

---

## 86. JSON Is Text

```text
JavaScript value
      ↓ stringify
JSON string
      ↓ parse
JavaScript value
```

Do not confuse a JSON string with an already-created JavaScript object.

---

## 87. JSON Cannot Represent Everything

JSON has no direct representations for values such as `undefined`, functions, and Symbols.

Some values are omitted or transformed depending on context.

---

## 88. JSON and `undefined`

```js
JSON.stringify({ a: undefined }); // "{}"
JSON.stringify(undefined); // undefined
```

Object properties and top-level values have different serialization behavior.

---

## 89. JSON and Dates

Date objects normally serialize through their `toJSON()` behavior into ISO-like strings.

Parsing that string does not automatically recreate a Date object.

---

## 90. JSON and Deep Copy

The pattern `JSON.parse(JSON.stringify(value))` is not a general deep-cloning solution.

It loses or changes values that JSON cannot represent faithfully and fails for some structures such as cyclic references.

---

## 91. `structuredClone()`

`structuredClone()` provides a standardized structured-cloning mechanism for many JavaScript values.

```js
const copy = structuredClone(original);
```

It supports substantially more types than JSON serialization.

---

## 92. `Error`

`Error` represents an error condition.

```js
throw new Error("Something went wrong");
```

Errors carry useful debugging information such as a message and stack in typical environments.

---

## 93. Error Subclasses

Common built-in error constructors include:

```text
TypeError
ReferenceError
SyntaxError
RangeError
URIError
EvalError
AggregateError
```

---

## 94. `TypeError`

Usually indicates an operation was applied to a value of an inappropriate type.

```js
null.toString(); // TypeError
```

---

## 95. `ReferenceError`

Occurs when code references an identifier that cannot be resolved.

```js
console.log(notDeclared); // ReferenceError
```

---

## 96. `SyntaxError`

Indicates invalid JavaScript syntax.

```js
// Example: malformed syntax can produce SyntaxError
```

Some syntax errors happen before normal execution begins.

---

## 97. `RangeError`

Indicates a value is outside an allowed range for an operation.

```js
new Array(-1); // RangeError
```

---

## 98. `AggregateError`

Represents multiple errors as one error object.

It is useful for APIs such as `Promise.any()` when all candidate promises reject.

---

## 99. Custom Error Classes

You can create domain-specific errors.

```js
class ValidationError extends Error {}
```

Custom errors improve error handling semantics in larger applications.

---

## 100. `Symbol`

`Symbol()` creates unique primitive values.

```js
const id = Symbol("id");
```

Two separately created Symbols are not equal.

---

## 101. Symbol Keys

Symbols can be used as object property keys.

```js
const id = Symbol("id");
const user = { [id]: 123 };
```

---

## 102. Global Symbol Registry

`Symbol.for()` retrieves or creates a Symbol in the global symbol registry.

```js
const a = Symbol.for("app.id");
const b = Symbol.for("app.id");
console.log(a === b); // true
```

This differs from ordinary `Symbol()` creation.

---

## 103. `Symbol.keyFor()`

```js
Symbol.keyFor(Symbol.for("app.id"));
```

It retrieves the registry key for a registry Symbol.

---

## 104. Well-Known Symbols

JavaScript defines Symbols that customize language protocols.

Examples include:

```text
Symbol.iterator
Symbol.asyncIterator
Symbol.toPrimitive
Symbol.toStringTag
Symbol.species
```

---

## 105. `Symbol.iterator`

Objects can implement `Symbol.iterator` to become iterable.

```js
const obj = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
  }
};
```

Then `for...of` can consume the object.

---

## 106. `Symbol.toPrimitive`

An object can customize how it converts to primitive values.

This participates in coercion operations.

---

## 107. `Boolean`

`Boolean(value)` converts a value to a boolean.

```js
Boolean("hello"); // true
Boolean(0); // false
```

Prefer primitive booleans.

---

## 108. Boolean Wrapper Trap

```js
const value = new Boolean(false);
console.log(Boolean(value)); // true
```

The wrapper is an object, and objects are truthy.

Avoid wrapper objects in normal application code.

---

## 109. `Proxy`

A Proxy can intercept operations performed on another object.

```js
const proxy = new Proxy(target, handler);
```

It can customize behavior for property access, assignment, calls, construction, and more.

---

## 110. Proxy `get` Trap

```js
const proxy = new Proxy(user, {
  get(target, property) {
    return target[property];
  }
});
```

The `get` trap intercepts property reads.

---

## 111. Proxy `set` Trap

A `set` trap can validate or transform assignments.

```js
const proxy = new Proxy({}, {
  set(target, key, value) {
    if (typeof value !== "number") return false;
    target[key] = value;
    return true;
  }
});
```

Trap invariants still apply.

---

## 112. Proxy Use Cases

Possible uses include:

- validation
- reactive systems
- logging
- virtualization
- API wrappers
- access control

Use Proxy deliberately because it can make control flow harder to reason about.

---

## 113. `Reflect`

`Reflect` provides methods corresponding to many internal object operations.

```js
Reflect.get(obj, "name");
Reflect.set(obj, "name", "Ravi");
```

---

## 114. Reflect vs Object APIs

`Reflect` is often useful inside Proxy traps because its methods return operation results in a consistent way and preserve receiver semantics when used correctly.

---

## 115. `Reflect.get()`

```js
Reflect.get(user, "name");
```

It performs a property get operation.

---

## 116. `Reflect.set()`

```js
Reflect.set(user, "name", "Ravi");
```

It returns a boolean indicating whether the assignment succeeded according to the operation's semantics.

---

## 117. `Reflect.has()`

```js
Reflect.has(user, "name");
```

Conceptually similar to the `in` operator for property existence.

---

## 118. `Reflect.deleteProperty()`

```js
Reflect.deleteProperty(user, "name");
```

It performs a property deletion operation and returns a boolean result.

---

## 119. `Reflect.construct()`

Can perform a constructor call equivalent to `new` semantics through an API.

```js
Reflect.construct(Person, ["Ravi"]);
```

It is especially relevant to metaprogramming.

---

## 120. `WeakRef`

`WeakRef` provides a weak reference to an object.

```js
const ref = new WeakRef(object);
```

It is an advanced memory-management feature and should not be used as ordinary application state.

---

## 121. `WeakRef.deref()`

```js
const value = ref.deref();
```

It returns the target if it is still reachable, otherwise `undefined`.

Garbage collection timing must never be treated as deterministic application logic.

---

## 122. `FinalizationRegistry`

Allows registration of cleanup callbacks associated with objects that become garbage-collectable.

Cleanup timing is not deterministic.

Do not use it for correctness-critical resource management.

---

## 123. `Intl`

`Intl` provides internationalization functionality.

Examples include:

```text
Intl.NumberFormat
Intl.DateTimeFormat
Intl.Collator
Intl.PluralRules
Intl.RelativeTimeFormat
Intl.Segmenter
```

---

## 124. `Intl.NumberFormat`

Formats numbers according to locale and options.

```js
const formatter = new Intl.NumberFormat("en-IN");
formatter.format(1234567.89);
```

This is preferable to manually inserting separators for localized output.

---

## 125. `Intl.DateTimeFormat`

Formats dates according to locale and options.

```js
const formatter = new Intl.DateTimeFormat("en-IN");
formatter.format(new Date());
```

---

## 126. `Intl.Collator`

Provides locale-sensitive string comparison.

```js
const collator = new Intl.Collator("en");
collator.compare("a", "b");
```

It is useful for locale-aware sorting.

---

## 127. `Intl.PluralRules`

Determines plural categories for a locale.

```js
const rules = new Intl.PluralRules("en");
rules.select(2); // "other"
```

This helps internationalized UI text.

---

## 128. `Intl.RelativeTimeFormat`

Formats relative time such as "in 2 days" or "3 hours ago" according to locale.

---

## 129. `Intl.Segmenter`

Segments text according to locale-sensitive rules.

It can be useful for words, sentences, and grapheme-related processing.

---

## 130. `Intl` vs Manual Formatting

Prefer `Intl` when output depends on locale, currency, dates, collation, pluralization, or segmentation.

Manual string formatting often fails for international users.

---

## 131. Built-in Object Classification

```text
Data/records → Object, Array, Map, Set
Numbers      → Number, BigInt, Math
Text         → String, RegExp
Time         → Date, Intl
Serialization→ JSON, structuredClone
Metaprogram. → Reflect, Proxy
Identity     → Symbol
Errors       → Error family
Memory       → WeakRef, WeakMap, WeakSet
```

---

## 132. Constructor vs Namespace

Not every capitalized built-in is meant to be called with `new`.

```text
new Date()       → constructor
Math.max(...)    → namespace function
JSON.parse(...)  → namespace function
```

Always check the API's intended usage.

---

## 133. Primitive vs Wrapper

Primitive values:

```js
"hello"
42
true
```

Wrapper objects:

```js
new String("hello")
new Number(42)
new Boolean(true)
```

Prefer primitives in normal code.

---

## 134. Static Methods vs Instance Methods

Static:

```js
Number.isNaN(value);
```

Instance:

```js
value.toString();
```

Static methods belong to the constructor/namespace; instance methods operate through values/objects.

---

## 135. Common Mistake: `Number.MIN_VALUE`

Wrong mental model:

```text
MIN_VALUE = most negative Number
```

Correct:

```text
MIN_VALUE = smallest positive nonzero Number
```

---

## 136. Common Mistake: `Math.floor()` for Truncation

```js
Math.floor(-1.8); // -2
Math.trunc(-1.8); // -1
```

Use `trunc` when the requirement is removal of the fractional part toward zero.

---

## 137. Common Mistake: Date Month Index

```js
new Date(2026, 0, 1); // January 1
```

Do not write `1` expecting January in the numeric constructor.

---

## 138. Common Mistake: `getDay()`

`getDay()` is not day-of-month.

```text
getDate() → 1–31-ish day of month
getDay()  → 0–6 day of week
```

---

## 139. Common Mistake: JSON Equals JavaScript

JSON is a restricted text data format.

A JSON string is not the same thing as a JavaScript object.

---

## 140. Common Mistake: JSON Deep Clone

Do not automatically use JSON stringify/parse as a universal cloning mechanism.

Choose `structuredClone()` or a domain-specific clone strategy when appropriate.

---

## 141. Common Mistake: `Math.random()` for Security

Never use `Math.random()` to generate security-sensitive secrets.

Use an appropriate cryptographically secure random API.

---

## 142. Common Mistake: Wrapper Booleans

```js
if (new Boolean(false)) {
  // runs
}
```

The object is truthy even though it wraps `false`.

---

## 143. Common Mistake: Mutating Date Objects

If multiple parts of an application share a Date object, calling setters changes the shared object.

Prefer creating new values when shared mutation would be confusing.

---

## 144. Common Mistake: Global Parsing Without Thought

`parseInt()` and `parseFloat()` parse prefixes and can accept strings that are not fully numeric.

For strict validation, parse deliberately and validate the complete input.

---

## 145. Debugging Built-ins

When an API behaves unexpectedly, inspect:

1. value type
2. primitive vs object
3. constructor/prototype
4. coercion
5. mutation
6. locale/time zone
7. API return type
8. error type

---

## 146. Output Prediction

Predict:

```js
console.log(Number.MIN_VALUE > 0);
console.log(Math.floor(-1.2));
console.log(Math.trunc(-1.2));
```

Expected:

```text
true
-2
-1
```

---

## 147. Output Prediction

Predict:

```js
const a = Symbol("id");
const b = Symbol("id");
console.log(a === b);
```

Answer: `false`.

---

## 148. Output Prediction

Predict:

```js
const a = Symbol.for("id");
const b = Symbol.for("id");
console.log(a === b);
```

Answer: `true`.

---

## 149. Output Prediction

Predict:

```js
console.log(Number.isNaN("NaN"));
console.log(isNaN("NaN"));
```

Answer: `false`, then `true`.

---

## 150. Output Prediction

Predict:

```js
console.log(new Boolean(false) ? "yes" : "no");
```

Answer: `yes`, because the wrapper is an object.

---

## 151. Browser Example: Currency Formatting

```js
const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR"
});

console.log(formatter.format(12500));
```

Use `Intl` instead of manually constructing currency strings.

---

## 152. Browser Example: Date Formatting

```js
const formatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium"
});

console.log(formatter.format(new Date()));
```

---

## 153. Browser Example: Random UI Choice

```js
const colors = ["red", "blue", "green"];
const index = Math.floor(Math.random() * colors.length);
console.log(colors[index]);
```

This is fine for ordinary UI randomness, not security.

---

## 154. Node.js Example: JSON Configuration

```js
const configText = '{"port":3000}';
const config = JSON.parse(configText);
console.log(config.port);
```

Real applications should validate configuration after parsing.

---

## 155. Node.js Example: Custom Error

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
```

Domain-specific errors make error handling clearer.

---

## 156. Performance Principle

Built-ins are generally optimized and battle-tested, but abstraction does not remove algorithmic cost.

For example, formatting thousands of values can still be expensive.

---

## 157. Reuse Formatters

When formatting many values, reuse an `Intl.NumberFormat` or `Intl.DateTimeFormat` instance rather than recreating it unnecessarily in a tight loop.

---

## 158. Avoid Unnecessary Proxies

Proxy interception can complicate debugging and performance characteristics.

Use it when its semantic benefits justify the complexity.

---

## 159. Security Principle

Built-ins do not automatically make input safe.

Parsing JSON, constructing RegExp objects, evaluating dynamic data, and formatting user-controlled values still require appropriate validation and design.

---

## 160. RegExp and User Input

If a user can provide a regex pattern, consider denial-of-service risks from pathological regular expressions and avoid blindly executing untrusted patterns.

---

## 161. JSON Security

`JSON.parse()` parses data; it does not execute JavaScript code.

However, applications must still validate the resulting object before trusting its contents.

---

## 162. Object Prototype Security

When processing untrusted keys, understand prototype-related risks and prefer safe ownership checks such as `Object.hasOwn()` where appropriate.

---

## 163. Practice — Beginner

Build:

1. number validator
2. safe integer checker
3. random integer utility
4. date information printer
5. JSON parse/stringify demo
6. error type demo
7. Symbol identity demo
8. object key inspector
9. array conversion utility
10. locale number formatter

---

## 164. Practice — Intermediate

Build:

1. currency formatter
2. date formatter
3. input parser
4. custom error hierarchy
5. regex validator
6. object descriptor inspector
7. JSON configuration loader
8. safe numeric utility
9. Symbol-based metadata example
10. Proxy validation object

---

## 165. Practice — Advanced

Build:

1. locale-aware sorting utility
2. structured clone comparison experiment
3. Proxy-based validation layer
4. custom iterable using Symbol.iterator
5. date/time formatting service
6. configurable error hierarchy
7. reflection utility
8. safe parser abstraction
9. performance benchmark for formatters
10. memory behavior experiment with WeakRef

---

## 166. Mini Project: Utility Toolkit

Create a reusable module containing:

- number helpers
- date helpers
- JSON helpers
- object helpers
- validation helpers
- formatting helpers

Document every function and its edge cases.

---

## 167. Mini Project: Internationalized Dashboard

Build a small dashboard that formats:

- currency
- percentages
- dates
- relative times
- pluralized labels

Support at least two locales.

---

## 168. Mini Project: Configuration Validator

Build a configuration system that:

- parses JSON
- validates fields
- throws custom errors
- checks numeric ranges
- reports useful error messages

---

## 169. Interview Questions

1. What are built-in objects?
2. What is the difference between ECMAScript APIs and browser APIs?
3. Why is `Number.MIN_VALUE` surprising?
4. Difference between `Math.floor()` and `Math.trunc()`?
5. Difference between `Number.isNaN()` and global `isNaN()`?
6. What is a BigInt?
7. Why cannot BigInt and Number be mixed directly?
8. Why are Date months zero-based in numeric constructors?
9. Difference between `getDate()` and `getDay()`?
10. What does JSON represent?
11. Why is JSON deep cloning limited?
12. What is structured cloning?
13. What is a Symbol?
14. Difference between `Symbol()` and `Symbol.for()`?
15. What is Proxy?
16. What is Reflect?
17. Why is `Math.random()` unsuitable for security?
18. Why should wrapper objects be avoided?
19. What is Intl used for?
20. Why can weak references not be used for deterministic cleanup?

---

## 170. Teach-Back Questions

Explain without notes:

- built-in object vs host API
- constructor vs namespace
- primitive vs wrapper
- Number precision
- BigInt
- Math rounding
- Date timestamps and time zones
- RegExp
- JSON
- Error hierarchy
- Symbol
- Proxy
- Reflect
- Intl
- WeakRef

---

## 171. Decision Flowchart

```text
Need a standard utility?
        │
        ├── Object/records → Object
        ├── Arrays          → Array
        ├── Number math     → Number / Math
        ├── Large integers  → BigInt
        ├── Text patterns   → String / RegExp
        ├── Time            → Date / Intl
        ├── Data text       → JSON
        ├── Unique identity → Symbol
        ├── Metaprogramming → Reflect / Proxy
        └── Errors          → Error subclasses
```

---

## 172. Best Practices

- Read the API contract before using a built-in.
- Distinguish primitives from wrapper objects.
- Validate parsed data.
- Use `Number.isNaN()` and `Number.isFinite()` for predictable numeric checks.
- Specify radix with `parseInt()`.
- Treat Date/time-zone behavior deliberately.
- Prefer ISO formats for machine-readable timestamps.
- Use `Intl` for localization.
- Never use `Math.random()` for secrets.
- Use Proxy and weak-reference APIs only when their semantics are actually needed.

---

## 173. Memory Trick

```text
Object → records
Array  → indexed collections
Number → numeric values
Math   → calculations
Date   → time instants
RegExp → patterns
JSON   → data text
Error  → failure information
Symbol → unique identity
Reflect→ object operations
Proxy  → intercepted operations
Intl   → localization
```

---

## 174. Final Mastery Checklist

- [ ] Explain built-in objects.
- [ ] Distinguish ECMAScript APIs from host APIs.
- [ ] Use Object utilities.
- [ ] Understand descriptors.
- [ ] Use Array static methods.
- [ ] Convert strings and numbers safely.
- [ ] Explain Number precision and safe integers.
- [ ] Use BigInt correctly.
- [ ] Use Math rounding functions correctly.
- [ ] Generate ordinary random values correctly.
- [ ] Explain Date timestamps and month indexing.
- [ ] Distinguish local and UTC getters.
- [ ] Use RegExp deliberately.
- [ ] Parse and stringify JSON.
- [ ] Explain JSON limitations.
- [ ] Use structuredClone appropriately.
- [ ] Create and handle custom Errors.
- [ ] Explain Symbols and the global registry.
- [ ] Explain Proxy and Reflect.
- [ ] Use Intl for localization.
- [ ] Explain WeakRef at a conceptual level.
- [ ] Apply security and performance principles.
- [ ] Complete the practice ladder.
- [ ] Build the mini projects.
- [ ] Teach the chapter without notes.

---

## One Sentence to Remember

> **Built-in objects are JavaScript's standard toolbox: use the right API for the data, operation, environment, and correctness requirements instead of reinventing common behavior.**
