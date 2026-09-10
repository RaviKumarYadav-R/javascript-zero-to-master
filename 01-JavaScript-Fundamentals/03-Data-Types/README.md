# Data Types in JavaScript

## Core idea

JavaScript values have types.

The language has **primitive types** and the **Object** type.

Primitive types are: `undefined`, `null`, `boolean`, `number`, `bigint`, `string`, and `symbol`.

Everything that is not a primitive is an object.

Functions are objects with callable behavior.

A variable does not permanently have a type; its current value has a type.

```js
let value = 10;
value = "hello";
```

The first value is a number.

The second value is a string.

Use `typeof` to inspect many value types.

```js
typeof 42; // "number"
typeof "hi"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
```

`typeof null` is the historical special case `"object"`.

That result is a language quirk, not evidence that `null` is an object.

```js
typeof null; // "object"
```

Arrays are objects.

```js
typeof []; // "object"
```

Dates are objects.

Regular expressions are objects.

Maps and Sets are objects.

Functions return `"function"` from `typeof` even though functions are objects in the language model.

```js
typeof function () {}; // "function"
```

### Primitive values

Primitives represent individual immutable values.

Strings are immutable.

Numbers are immutable values.

Booleans are immutable values.

BigInts are immutable values.

Symbols are unique primitive values.

`undefined` represents an undefined value.

`null` represents an intentional absence of an object value.

### Number

JavaScript uses the `Number` type for ordinary numeric values.

It is based on IEEE 754 double-precision floating-point representation.

That means integers and fractions use the same numeric type.

```js
const integer = 42;
const decimal = 3.14;
```

Special numeric values include `NaN`, `Infinity`, and `-Infinity`.

```js
Number("abc"); // NaN
1 / 0; // Infinity
```

`NaN` means the result is not a valid numeric value.

`NaN` is still of type number.

```js
typeof NaN; // "number"
```

Floating-point arithmetic has precision limitations.

```js
0.1 + 0.2 === 0.3; // false
```

### BigInt

`bigint` represents integers larger than the safe integer range of ordinary `Number` values.

```js
const big = 9007199254740993n;
```

The `n` suffix creates a BigInt literal.

Do not freely mix Number and BigInt arithmetic.

```js
1n + 1n; // 2n
// 1n + 1; // TypeError
```

### String

Strings contain sequences of UTF-16 code units.

```js
const name = "Ravi";
```

Strings are immutable.

Methods create new strings rather than modifying the original string.

```js
const text = "hello";
const upper = text.toUpperCase();
```

### Boolean

A boolean has exactly two values: `true` and `false`.

```js
const isLoggedIn = true;
```

Booleans are heavily used in conditions.

JavaScript also converts values to boolean in boolean contexts.

Falsy values include `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`.

Most other values are truthy.

### Undefined

`undefined` is a primitive value.

It commonly appears when a value has not been provided.

```js
let value;
console.log(value); // undefined
```

A function without an explicit return returns `undefined`.

```js
function test() {}
test(); // undefined
```

Missing object properties also produce `undefined`.

```js
const user = {};
user.name; // undefined
```

### Null

`null` is a primitive representing intentional absence of an object value.

```js
const selectedUser = null;
```

Use `null` when your program intentionally represents “no object/value here”.

Do not confuse it with an uninitialized binding.

### Symbol

A Symbol is a unique primitive value.

```js
const id1 = Symbol("id");
const id2 = Symbol("id");
id1 === id2; // false
```

Symbols are useful for unique property keys and language protocols.

Well-known symbols include `Symbol.iterator`.

### Objects

Objects are collections of properties.

```js
const user = {
  name: "Ravi",
  age: 21
};
```

Objects can be mutable.

```js
user.age = 22;
```

Object identity matters.

```js
const a = {};
const b = {};
a === b; // false
```

Two separately created objects are distinct objects even if they contain identical properties.

### Arrays

Arrays are specialized objects used for ordered collections.

```js
const numbers = [10, 20, 30];
```

Use `Array.isArray()` to test for arrays.

```js
Array.isArray([]); // true
```

### Type inspection

`typeof` is useful but has limitations.

```js
typeof []; // object
typeof null; // object
```

For arrays, use `Array.isArray()`.

For classes and object prototypes, `instanceof` can sometimes help.

For exact object identity, use `===` or `Object.is()` according to the required semantics.

### Memory model warning

Avoid teaching beginners that primitives always live on a “stack” and objects always live on a “heap”.

Real engine memory management is more complicated.

Instead, learn the language-level model of values, bindings, references, identity, and mutation.

### Common mistakes

Do not say `null` is a normal object because `typeof null` returns `"object"`.

Do not say arrays are a separate primitive type.

Do not say strings can be modified character-by-character.

Do not compare objects by their contents using `===`.

Do not use global `isNaN()` without understanding coercion.

Prefer `Number.isNaN()` when you want a strict NaN check.

Do not mix BigInt and Number arithmetic without explicit conversion.

### Practice

Predict each result before running:

```js
console.log(typeof 10);
console.log(typeof 10n);
console.log(typeof "10");
console.log(typeof false);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof []);
console.log(typeof {});
console.log(typeof function () {});
```

Then explain every answer.

### Teach-back

Explain primitive vs object values.

Explain why `typeof null` is `"object"`.

Explain why arrays are objects.

Explain why functions return `"function"` from `typeof`.

Explain mutation vs immutable primitive values.

Explain why object equality compares identity rather than structural content.

### Mastery checklist

- [ ] Name all JavaScript primitive types.
- [ ] Explain the Object type.
- [ ] Explain dynamic typing.
- [ ] Use `typeof` correctly.
- [ ] Explain `typeof null`.
- [ ] Explain `undefined`.
- [ ] Explain `null`.
- [ ] Explain Number and floating-point precision.
- [ ] Explain BigInt.
- [ ] Explain Symbol.
- [ ] Explain string immutability.
- [ ] Explain object identity.
- [ ] Distinguish arrays from ordinary objects.
- [ ] Predict `typeof` results.
- [ ] Teach this chapter without notes.
