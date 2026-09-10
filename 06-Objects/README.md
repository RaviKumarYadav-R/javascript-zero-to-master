# 06 — Objects in JavaScript

> Objects are one of the foundations of JavaScript. Learn them deeply and you will understand how real application data, methods, prototypes, classes, JSON, and many browser APIs work.

---

## 1. What Is an Object?

An **object** is a collection of properties.

A property connects a **key** with a value.

```js
const user = {
  name: "Ravi",
  age: 21
};
```

Mental model:

```text
user
 ├── name → "Ravi"
 └── age  → 21
```

---

## 2. Why Do Objects Exist?

Objects let us group related data and behavior together.

Instead of:

```js
const userName = "Ravi";
const userAge = 21;
const userCity = "Nawada";
```

we can write:

```js
const user = {
  name: "Ravi",
  age: 21,
  city: "Nawada"
};
```

This gives the data a clear structure.

---

## 3. Object Mental Model

Think of an object as a labeled collection of properties.

```text
        user
┌──────────────────┐
│ name  → "Ravi"   │
│ age   → 21       │
│ active → true    │
└──────────────────┘
```

The labels are property keys. The stored values can be any JavaScript value.

---

## 4. Creating an Object Literal

The most common way is an object literal.

```js
const product = {
  name: "Laptop",
  price: 50000
};
```

Object literals are concise and readable.

---

## 5. Empty Object

```js
const user = {};
```

Properties can be added later.

```js
user.name = "Ravi";
```

---

## 6. Property Keys

Object property keys are normally strings or symbols.

```js
const user = {
  name: "Ravi",
  age: 21
};
```

`name` and `age` are property keys.

Numeric-looking keys are converted to property keys when used with ordinary object property syntax.

---

## 7. String Property Keys

You can explicitly write a string key.

```js
const user = {
  "first-name": "Ravi"
};
```

Because the key contains `-`, bracket notation is convenient for access.

```js
console.log(user["first-name"]);
```

---

## 8. Dot Notation

Use dot notation for ordinary known property names.

```js
const user = { name: "Ravi" };
console.log(user.name); // Ravi
```

The part after `.` is interpreted as a property name, not as a variable lookup.

---

## 9. Bracket Notation

Bracket notation evaluates an expression to obtain the property key.

```js
const user = { name: "Ravi" };
console.log(user["name"]); // Ravi
```

---

## 10. Dot vs Bracket Notation

```js
const key = "name";

console.log(user[key]);  // Ravi
console.log(user.key);   // undefined
```

`user[key]` uses the value of `key`.

`user.key` literally asks for the property named `key`.

---

## 11. Computed Property Names

Property names can be calculated while creating an object.

```js
const key = "score";

const result = {
  [key]: 100
};

console.log(result.score); // 100
```

---

## 12. Reading a Missing Property

A missing ordinary property normally produces `undefined`.

```js
const user = { name: "Ravi" };
console.log(user.age); // undefined
```

This does not create the property.

---

## 13. Adding a Property

```js
const user = {};
user.name = "Ravi";
user.age = 21;
```

The object now has two own properties.

---

## 14. Updating a Property

```js
const user = { age: 20 };
user.age = 21;
```

Assignment replaces the previous value for that property.

---

## 15. Deleting a Property

Use `delete` to remove a property.

```js
const user = {
  name: "Ravi",
  age: 21
};

delete user.age;

console.log(user.age); // undefined
```

---

## 16. Checking Property Existence

Do not confuse a missing property with a property whose value is `undefined`.

```js
const user = { name: undefined };

console.log(user.name); // undefined
console.log("name" in user); // true
```

---

## 17. `in` Operator

`in` checks whether a property exists anywhere on the object's prototype chain.

```js
const user = { name: "Ravi" };

console.log("name" in user); // true
```

It is not limited to own properties.

---

## 18. `Object.hasOwn()`

Use `Object.hasOwn()` when you specifically want an own property.

```js
const user = { name: "Ravi" };

console.log(Object.hasOwn(user, "name")); // true
console.log(Object.hasOwn(user, "toString")); // false
```

---

## 19. `hasOwnProperty()`

Older code often uses:

```js
user.hasOwnProperty("name");
```

`Object.hasOwn(user, "name")` is generally safer and clearer because it does not depend on the object's own `hasOwnProperty` method.

---

## 20. Own vs Inherited Properties

```text
Object
 ├── own properties
 └── prototype
      └── inherited properties
```

Understanding this distinction becomes essential when learning prototypes.

---

## 21. Object Methods

A function stored as an object property is commonly called a **method**.

```js
const user = {
  name: "Ravi",
  greet() {
    return `Hello, ${this.name}`;
  }
};

console.log(user.greet());
```

---

## 22. `this` Inside a Method

When called as `user.greet()`, `this` refers to the object used as the receiver of that call.

```js
const user = {
  name: "Ravi",
  greet() {
    return this.name;
  }
};
```

The call form matters.

---

## 23. Method Extraction Trap

```js
const greet = user.greet;
```

Calling `greet()` is not the same call form as `user.greet()`.

The `this` value can therefore change depending on the invocation context.

---

## 24. Arrow Functions as Object Methods

Be careful with arrow functions.

```js
const user = {
  name: "Ravi",
  greet: () => this.name
};
```

An arrow function does not create its own dynamic `this`.

For object methods that need the receiver as `this`, normal method syntax is usually appropriate.

---

## 25. Shorthand Property Syntax

If a variable and property have the same name:

```js
const name = "Ravi";
const age = 21;

const user = { name, age };
```

This is equivalent to explicitly writing the properties.

---

## 26. Method Shorthand

Instead of:

```js
const user = {
  greet: function () {
    return "Hello";
  }
};
```

you can write:

```js
const user = {
  greet() {
    return "Hello";
  }
};
```

---

## 27. Nested Objects

Objects can contain other objects.

```js
const user = {
  name: "Ravi",
  address: {
    city: "Nawada",
    state: "Bihar"
  }
};
```

Access nested data with repeated property access.

---

## 28. Nested Property Access

```js
console.log(user.address.city); // Nawada
```

Read the expression from left to right: obtain `user`, then `address`, then `city`.

---

## 29. Optional Chaining

Optional chaining prevents an error when an intermediate value is `null` or `undefined`.

```js
console.log(user.profile?.social?.github);
```

If `profile` is missing, the expression evaluates to `undefined` instead of throwing for that chain.

---

## 30. Nullish Coalescing With Objects

Use `??` when you want a fallback only for `null` or `undefined`.

```js
const user = {};
const name = user.name ?? "Guest";
```

This preserves valid falsy values such as `0`, `false`, and `""`.

---

## 31. Object Destructuring

Destructuring extracts properties into variables.

```js
const user = {
  name: "Ravi",
  age: 21
};

const { name, age } = user;
```

---

## 32. Renaming During Destructuring

```js
const { name: userName } = user;

console.log(userName);
```

The syntax means: read property `name` and bind it to `userName`.

---

## 33. Default Values in Destructuring

```js
const { role = "student" } = user;
```

The default is used when the property value is `undefined`.

---

## 34. Rest Property

You can collect remaining properties.

```js
const user = {
  name: "Ravi",
  age: 21,
  city: "Nawada"
};

const { name, ...details } = user;
```

`details` becomes a new object containing the remaining own enumerable properties.

---

## 35. Destructuring Function Parameters

Objects are frequently destructured directly in function parameters.

```js
function greet({ name }) {
  return `Hello ${name}`;
}

console.log(greet({ name: "Ravi" }));
```

This makes the required input shape obvious.

---

## 36. Object Spread

Object spread copies own enumerable properties into a new object.

```js
const user = { name: "Ravi", age: 21 };
const copy = { ...user };
```

The copy is shallow.

---

## 37. Updating With Object Spread

A common immutable-update pattern is:

```js
const user = { name: "Ravi", age: 21 };
const updated = { ...user, age: 22 };
```

Later properties override earlier properties with the same key.

---

## 38. Spread Order Matters

```js
const result = {
  role: "user",
  role: "admin"
};
```

The later property wins.

The same principle applies to object spread:

```js
const result = {
  ...defaults,
  ...settings
};
```

---

## 39. Object Spread Is Shallow

```js
const original = {
  profile: { name: "Ravi" }
};

const copy = { ...original };
copy.profile.name = "Aman";

console.log(original.profile.name); // Aman
```

The nested object is shared.

---

## 40. Object Assignment

`Object.assign()` copies enumerable own properties from sources to a target.

```js
const target = {};
const source = { name: "Ravi" };

Object.assign(target, source);
```

The target object is mutated.

---

## 41. `Object.assign()` vs Spread

```js
const copy1 = { ...user };
const copy2 = Object.assign({}, user);
```

Both can make a shallow copy.

Important difference: `Object.assign(target, source)` writes into the existing target.

---

## 42. Object Keys

`Object.keys()` returns an array of an object's own enumerable string-keyed property names.

```js
const user = { name: "Ravi", age: 21 };
console.log(Object.keys(user));
// ["name", "age"]
```

---

## 43. Object Values

`Object.values()` returns an array of own enumerable string-keyed property values.

```js
console.log(Object.values(user));
// ["Ravi", 21]
```

---

## 44. Object Entries

`Object.entries()` returns key-value pairs.

```js
console.log(Object.entries(user));
// [["name", "Ravi"], ["age", 21]]
```

This is extremely useful for iteration.

---

## 45. Iterating With `Object.entries()`

```js
for (const [key, value] of Object.entries(user)) {
  console.log(key, value);
}
```

This gives both the property name and value directly.

---

## 46. `for...in` With Objects

`for...in` iterates enumerable property keys, including inherited enumerable properties.

```js
for (const key in user) {
  console.log(key);
}
```

If you only want own properties, use `Object.keys()`/`Object.entries()` or guard appropriately.

---

## 47. Property Enumeration Order

JavaScript defines ordering rules for own property keys. Integer-index-like keys are handled differently from other string keys, followed by symbols.

Do not build critical business logic around a vague assumption that objects are simply unordered bags.

---

## 48. Object Equality

Objects are compared by identity, not by structural contents.

```js
const a = { x: 1 };
const b = { x: 1 };

console.log(a === b); // false
```

They are two different objects.

---

## 49. Same Object Reference

```js
const a = { x: 1 };
const b = a;

console.log(a === b); // true
```

Both variables refer to the same object.

---

## 50. Mutating Through Another Reference

```js
const user = { name: "Ravi" };
const other = user;

other.name = "Aman";

console.log(user.name); // Aman
```

Changing the object through either reference changes the same object.

---

## 51. Copying vs Referencing

```text
b = a

b ─────┐
       ▼
     Object
       ▲
a ─────┘
```

With a shallow copy:

```text
copy ──→ New outer object
original → Original outer object
```

Nested objects can still be shared.

---

## 52. `Object.create()`

`Object.create()` creates a new object with a specified prototype.

```js
const parent = {
  greet() {
    return "Hello";
  }
};

const child = Object.create(parent);
console.log(child.greet());
```

The method is inherited through the prototype chain; it is not copied into `child` as an own property.

---

## 53. Prototype Chain Preview

When a property is not found directly on an object, JavaScript can continue searching its prototype.

```text
child
  ↓
parent
  ↓
Object.prototype
  ↓
null
```

This lookup process is fundamental to JavaScript objects.

---

## 54. `Object.getPrototypeOf()`

You can inspect an object's prototype.

```js
const child = Object.create(parent);
console.log(Object.getPrototypeOf(child) === parent); // true
```

---

## 55. `Object.setPrototypeOf()`

JavaScript can change an object's prototype with `Object.setPrototypeOf()`.

```js
Object.setPrototypeOf(child, anotherParent);
```

This is powerful but can have performance consequences in hot code. Prefer stable object designs when possible.

---

## 56. `Object.prototype`

Ordinary objects commonly inherit from `Object.prototype`.

It provides methods such as `toString()`.

```js
const user = {};
console.log(user.toString());
```

---

## 57. `Object.prototype` Is Not the Same as Every Object

Objects can have different prototypes.

```js
const dictionary = Object.create(null);
```

This object has no `Object.prototype` in its prototype chain.

---

## 58. Null-Prototype Objects

```js
const dictionary = Object.create(null);
dictionary.name = "Ravi";
```

Such objects can be useful for dictionary-like data where inherited properties are undesirable.

---

## 59. `Object.create(null)` Caveat

A null-prototype object does not inherit normal `Object.prototype` methods.

```js
const dictionary = Object.create(null);
console.log(dictionary.toString); // undefined
```

Choose it deliberately rather than automatically.

---

## 60. Object Property Descriptors

Every own property has descriptor information such as:

- `value`
- `writable`
- `enumerable`
- `configurable`

For accessor properties, descriptors use `get` and `set` instead of a data `value`.

---

## 61. `Object.getOwnPropertyDescriptor()`

```js
const user = { name: "Ravi" };

console.log(Object.getOwnPropertyDescriptor(user, "name"));
```

This lets you inspect the property's behavior.

---

## 62. Writable

A writable data property can normally be assigned a new value.

```js
const user = { name: "Ravi" };
user.name = "Aman";
```

`writable: false` prevents ordinary assignment from changing the property value.

---

## 63. Enumerable

Enumerable properties appear in common enumeration mechanisms such as `Object.keys()`.

```js
Object.keys(user);
```

Non-enumerable properties are hidden from those particular enumeration operations.

---

## 64. Configurable

`configurable` controls whether a property descriptor can generally be reconfigured and whether the property can be deleted.

Descriptor flags are lower-level object mechanics worth understanding before using advanced property APIs.

---

## 65. `Object.defineProperty()`

You can define a property with explicit descriptor settings.

```js
const user = {};

Object.defineProperty(user, "id", {
  value: 101,
  writable: false,
  enumerable: true,
  configurable: false
});
```

---

## 66. Getters

A getter runs when a property is read.

```js
const user = {
  firstName: "Ravi",
  lastName: "Kumar",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

console.log(user.fullName);
```

It is accessed like a property, not called like a function.

---

## 67. Setters

A setter controls assignment to a property.

```js
const user = {
  _name: "Ravi",
  set name(value) {
    this._name = value.trim();
  },
  get name() {
    return this._name;
  }
};
```

Getters and setters can enforce invariants or transform values.

---

## 68. Encapsulation With Objects

Encapsulation means controlling how state is accessed and changed while protecting invariants.

A setter can reject invalid data rather than allowing arbitrary mutation.

```js
const account = {
  balance: 0,
  deposit(amount) {
    if (amount <= 0) throw new Error("Invalid amount");
    this.balance += amount;
  }
};
```

---

## 69. Freezing an Object

`Object.freeze()` prevents many direct modifications to an object.

```js
const config = Object.freeze({
  mode: "production"
});
```

Attempted modifications are rejected or ignored depending on strictness.

---

## 70. Freeze Is Shallow

```js
const config = Object.freeze({
  nested: { enabled: true }
});

config.nested.enabled = false;
```

The nested object is not automatically frozen.

---

## 71. Sealing an Object

`Object.seal()` prevents adding or deleting properties and prevents certain descriptor changes, while existing writable properties may still change.

```js
const user = Object.seal({ name: "Ravi" });
user.name = "Aman"; // allowed
```

---

## 72. Prevent Extensions

`Object.preventExtensions()` prevents new own properties from being added.

Existing properties may remain writable or configurable depending on their descriptors.

---

## 73. Freeze vs Seal vs Prevent Extensions

| API | Add | Delete | Change writable value |
|---|---|---|---|
| `preventExtensions` | No | Yes | Usually yes |
| `seal` | No | No | Yes, if writable |
| `freeze` | No | No | No |

All three are shallow.

---

## 74. Checking Object State

JavaScript provides:

```js
Object.isExtensible(obj);
Object.isSealed(obj);
Object.isFrozen(obj);
```

These are useful when debugging descriptor-related behavior.

---

## 75. Object Constructor

You can create an object with `new Object()`.

```js
const user = new Object();
user.name = "Ravi";
```

Object literals are usually clearer for ordinary object creation.

---

## 76. `Object()` Conversion

`Object(value)` converts a value to an object wrapper or returns the object itself when appropriate.

Avoid using wrapper objects such as `new Number()` or `new Boolean()` for ordinary application values.

---

## 77. Property Keys and Symbols

Symbols provide unique primitive property keys.

```js
const id = Symbol("id");

const user = {
  name: "Ravi",
  [id]: 101
};
```

The symbol property does not collide with an unrelated string key named `id`.

---

## 78. Symbol-Keyed Properties

`Object.keys()` does not return symbol keys.

Use:

```js
Object.getOwnPropertySymbols(user);
```

for the object's own symbol properties.

---

## 79. Reflecting All Own Keys

`Reflect.ownKeys()` returns both string and symbol own keys.

```js
console.log(Reflect.ownKeys(user));
```

This is useful for lower-level object inspection.

---

## 80. JSON Is Not the Same as an Object

JSON is a **text data format**.

JavaScript object:

```js
const user = { name: "Ravi" };
```

JSON text:

```json
{"name":"Ravi"}
```

Do not confuse the in-memory object with its serialized text representation.

---

## 81. `JSON.stringify()`

It converts JavaScript data into a JSON string when representable.

```js
const user = { name: "Ravi", age: 21 };
const json = JSON.stringify(user);
```

---

## 82. `JSON.parse()`

It converts valid JSON text into JavaScript data.

```js
const json = '{"name":"Ravi"}';
const user = JSON.parse(json);
```

---

## 83. JSON Limitations

JSON does not preserve every JavaScript value or behavior.

Functions, symbols, `undefined`, prototypes, methods, and many special object types require careful handling.

Do not use JSON serialization as a universal deep-copy mechanism.

---

## 84. Objects From API Responses

Real applications frequently receive object-shaped data from APIs.

```js
const responseData = {
  id: 1,
  title: "Learn JavaScript",
  completed: false
};
```

The frontend can transform this data into UI state.

---

## 85. Object Transformation

A common operation is creating a new object with selected fields.

```js
const user = {
  id: 1,
  name: "Ravi",
  passwordHash: "secret"
};

const publicUser = {
  id: user.id,
  name: user.name
};
```

This is safer than accidentally exposing internal fields.

---

## 86. Security: Prototype Pollution Awareness

Dynamic object keys require care when processing untrusted input.

Do not blindly merge arbitrary user-controlled objects into sensitive configuration or application state.

Prototype-related attacks can become serious when unsafe merge patterns are used.

---

## 87. Security: Avoid Trusting Client Objects

An object received from the browser is data supplied by a client.

```js
const requestBody = req.body;
```

Validate it before trusting required fields, types, permissions, or business rules.

---

## 88. Objects and Maps Are Different

Use an object when modeling structured records with known fields.

Use `Map` when you primarily need a key-value collection with arbitrary keys and collection-oriented operations.

```text
Record → Object
Dictionary/collection → often Map
```

This distinction becomes important in larger applications.

---

## 89. Object as a Record

```js
const student = {
  id: 1,
  name: "Ravi",
  score: 95
};
```

The keys describe the shape of one entity.

---

## 90. Object as a Configuration

```js
const config = {
  port: 3000,
  debug: true,
  timeout: 5000
};
```

Configuration objects are common because named properties make arguments self-documenting.

---

## 91. Passing Objects to Functions

Objects make it possible to pass many named options without relying on argument position.

```js
function createUser({ name, age, city }) {
  return { name, age, city };
}
```

This can scale better than a long positional parameter list.

---

## 92. Object Mutation vs Replacement

Mutation:

```js
user.age = 22;
```

Replacement:

```js
user = { ...user, age: 22 };
```

The second requires a mutable binding such as `let` if reassigning the variable.

---

## 93. Immutability in Application State

Frameworks such as React commonly benefit from replacing objects instead of mutating state objects directly.

```js
const nextUser = {
  ...user,
  name: "Aman"
};
```

The important point is that this creates a new outer object.

---

## 94. Shallow Equality

A new object is not equal by `===` even if its contents are identical.

```js
const a = { count: 1 };
const b = { count: 1 };

console.log(a === b); // false
```

This matters for memoization and UI rendering decisions.

---

## 95. Deep Equality Is Different

There is no general built-in `===` deep comparison for arbitrary objects.

You need a deliberate strategy based on your data and requirements.

Possible strategies include structural comparison, domain-specific comparison, or specialized libraries.

---

## 96. Object Cloning Strategy

Before cloning an object, ask:

1. Is shallow copying enough?
2. Are nested references shared intentionally?
3. Are there Dates, Maps, Sets, functions, or class instances?
4. Do prototypes need to be preserved?
5. Is structured cloning appropriate?

Do not choose a cloning technique by habit.

---

## 97. `structuredClone()`

Modern JavaScript environments provide `structuredClone()` for supported structured data.

```js
const original = {
  user: { name: "Ravi" }
};

const copy = structuredClone(original);
```

It can clone many built-in data types and nested structures, but it has limitations and does not clone functions.

---

## 98. Object Memory Model

Avoid saying that an object variable simply "contains the memory address" as a complete explanation.

A better model is:

```text
binding → object value
```

The ECMAScript specification describes references and values abstractly; engine implementations may use pointers internally, but those implementation details are not the language model.

---

## 99. Property Lookup Flow

Conceptually:

```text
obj.key
   ↓
Check own property
   ↓
Found? ── yes → return value
   │
   no
   ↓
Check prototype
   ↓
Continue until null
```

This explains inherited methods and prototype-based behavior.

---

## 100. Object Lookup and `this` Are Different Ideas

Property lookup determines what `obj.method` resolves to.

The call expression `obj.method()` also provides a receiver that affects `this` for normal functions.

Do not merge these two concepts into one rule.

---

## 101. Common Mistake: `typeof null`

```js
console.log(typeof null); // "object"
```

This is a historical language quirk. It does not mean `null` is an ordinary object.

---

## 102. Common Mistake: `typeof []`

```js
console.log(typeof []); // "object"
```

Use `Array.isArray()` to distinguish arrays from ordinary objects.

---

## 103. Common Mistake: Comparing Objects by Contents

Wrong assumption:

```js
{ a: 1 } === { a: 1 }
```

This is `false` because two object literals create two distinct objects.

---

## 104. Common Mistake: Accidental Shared State

```js
const settings = { theme: { dark: true } };
const copy = { ...settings };
```

Changing `copy.theme.dark` also affects the nested object in `settings` because the copy is shallow.

---

## 105. Common Mistake: Using `for...in` Without Thinking

`for...in` gives keys and can include inherited enumerable properties.

For own key-value pairs, prefer:

```js
for (const [key, value] of Object.entries(obj)) {
  // ...
}
```

---

## 106. Common Mistake: Confusing `in` With Own Property

```js
"toString" in {} // true
Object.hasOwn({}, "toString") // false
```

The first searches the prototype chain; the second checks own properties.

---

## 107. Common Mistake: Mutating Function Inputs

This can create surprising side effects:

```js
function update(user) {
  user.name = "Aman";
}
```

Whether mutation is appropriate depends on the API contract. Make mutation intentional and documented.

---

## 108. Common Mistake: Long Nested Access

This can throw if an intermediate value is missing:

```js
user.profile.social.github
```

When absence is expected, optional chaining may be appropriate:

```js
user.profile?.social?.github
```

---

## 109. Debugging Object Values

When debugging, inspect both value and shape.

```js
console.log(user);
console.log(Object.keys(user));
console.log(Object.entries(user));
```

For deeper debugging, inspect prototypes and descriptors when necessary.

---

## 110. Output Prediction Challenge

Predict before running:

```js
const a = { count: 1 };
const b = a;
b.count++;

console.log(a.count);
console.log(a === b);
```

Answer: `2` and `true`.

Reason: both bindings refer to the same object.

---

## 111. Output Prediction Challenge

Predict:

```js
const a = { count: 1 };
const b = { ...a };
b.count++;

console.log(a.count);
console.log(b.count);
console.log(a === b);
```

Answer: `1`, `2`, `false`.

The outer object was copied.

---

## 112. Output Prediction Challenge

Predict:

```js
const obj = { name: "Ravi" };
const key = "name";

console.log(obj.key);
console.log(obj[key]);
```

Answer: `undefined`, then `Ravi`.

---

## 113. Beginner Practice

Build small exercises for:

1. Creating a student object.
2. Reading properties.
3. Updating properties.
4. Adding properties.
5. Deleting properties.
6. Checking properties.
7. Nested objects.
8. Destructuring.
9. Object spread.
10. Iterating with `Object.entries()`.

Do each problem without copying the solution first.

---

## 114. Intermediate Practice

Practice:

1. Convert an array of users into a lookup object.
2. Remove private fields from an object.
3. Merge configuration objects.
4. Count frequencies with an object.
5. Group records by category.
6. Safely read nested API data.
7. Detect missing required fields.
8. Build an immutable update function.
9. Compare selected object fields.
10. Write a property descriptor example.

---

## 115. Advanced Practice

Practice:

1. Build a small object-based state store.
2. Implement deep property access safely.
3. Implement a shallow equality helper.
4. Explore prototype inheritance with `Object.create()`.
5. Build a dictionary using a null prototype.
6. Inspect descriptors.
7. Create getters and setters.
8. Experiment with symbol keys.
9. Compare objects by selected domain fields.
10. Design a safe configuration merge.

---

## 116. Real-World Mini Project: Student Manager

Create an object-based student manager.

Required features:

- add student
- update student
- remove student
- find student
- calculate average score
- list top students
- print a clean summary

Start with objects and arrays. Avoid a framework.

---

## 117. Real-World Mini Project: Configuration Manager

Build a configuration object supporting:

- defaults
- environment overrides
- validation
- immutable snapshots
- safe access

This project teaches object composition, spread, validation, and controlled mutation.

---

## 118. Browser Example

DOM APIs return many object-shaped values.

```js
const button = document.querySelector("button");

if (button) {
  console.log(button.textContent);
}
```

Understanding object properties and methods makes browser APIs much easier to read.

---

## 119. Node.js Example

Node.js APIs heavily use objects for options and structured data.

```js
const options = {
  encoding: "utf8",
  flag: "r"
};
```

Named options are easier to extend than long positional arguments.

---

## 120. Performance: Stable Object Shapes

JavaScript engines optimize common object access patterns.

Consistent object structure can help engines optimize property access.

Prefer predictable object shapes in performance-sensitive code rather than repeatedly creating wildly different structures.

---

## 121. Performance: Avoid Premature Optimization

Do not redesign ordinary application objects solely because of theoretical engine behavior.

First write clear code, measure real bottlenecks, then optimize based on evidence.

---

## 122. Object Security Checklist

When handling untrusted objects:

- validate input
- avoid blindly merging arbitrary keys
- protect authorization fields
- avoid exposing secrets
- distinguish own and inherited properties
- treat API data as untrusted
- understand prototype-related risks

---

## 123. Interview Questions

1. What is an object?
2. What is the difference between dot and bracket notation?
3. Why are objects compared by reference/identity?
4. What is a shallow copy?
5. Why doesn't object spread deep-copy nested objects?
6. Difference between `in` and `Object.hasOwn()`?
7. Difference between `Object.keys()`, `values()`, and `entries()`?
8. What is a prototype?
9. What is the prototype chain?
10. What does `Object.freeze()` actually do?
11. What is a property descriptor?
12. What is a getter/setter?
13. What is a Symbol property?
14. What is JSON?
15. Why is JSON not a universal deep clone?

---

## 124. Teach-Back Questions

Before teaching someone else, explain without notes:

- object vs primitive
- property key and value
- dot vs bracket notation
- object identity
- mutation vs replacement
- shallow copy
- destructuring
- object spread
- `Object.keys()` / `values()` / `entries()`
- `in` vs `Object.hasOwn()`
- prototype chain
- descriptors
- freeze/seal/preventExtensions
- JSON serialization

If you cannot explain one clearly, revisit that section.

---

## 125. Refactoring Checklist

When reviewing object-heavy code, ask:

- Are property names clear?
- Is mutation intentional?
- Is a shallow copy sufficient?
- Are nested references shared accidentally?
- Is `for...in` actually appropriate?
- Are own properties distinguished from inherited properties?
- Are untrusted keys validated?
- Would a `Map` be a better collection?
- Is the object shape understandable?
- Are getters/setters actually useful?

---

## 126. Best Practices

- Prefer object literals for ordinary records.
- Use clear property names.
- Prefer dot notation for known identifiers.
- Use bracket notation for dynamic keys.
- Prefer `Object.hasOwn()` for own-property checks.
- Use `Object.entries()` for key-value iteration.
- Treat spread as shallow.
- Make mutation intentional.
- Validate external data.
- Use `Map` when it better models the problem.
- Avoid premature prototype manipulation.

---

## 127. When Should You Use Objects?

Use objects when modeling a thing with named properties.

Examples:

```text
User
Product
Order
Configuration
API response
Application state
```

---

## 128. When Should You Consider `Map`?

Consider `Map` when the primary requirement is a key-value collection with arbitrary key types, frequent additions/removals, and map-specific operations.

Do not force every dictionary-like problem into a plain object.

---

## 129. Memory Trick

Remember:

```text
Object = named properties
Array  = ordered indexed collection
Map    = key-value collection
```

And:

```text
.      → literal property name
[]     → computed property key
```

---

## 130. Final Mental Model

Keep this model in your head:

```text
                 OBJECT
                    │
       ┌────────────┴────────────┐
       ↓                         ↓
  Own properties             Prototype
       │                         │
       ↓                         ↓
 keys + values             inherited behavior
       │
       ├── read
       ├── write
       ├── delete
       └── enumerate
```

Objects are not just bags of data. They participate in property lookup, identity, prototypes, descriptors, methods, and application architecture.

---

## 131. Final Mastery Checklist

You are ready to move forward when you can confidently:

- [ ] Create objects.
- [ ] Explain properties and keys.
- [ ] Use dot notation.
- [ ] Use bracket notation.
- [ ] Use computed property names.
- [ ] Add/update/delete properties.
- [ ] Explain object identity.
- [ ] Explain references and shared mutation.
- [ ] Destructure objects.
- [ ] Use rest properties.
- [ ] Use object spread.
- [ ] Explain shallow copying.
- [ ] Use `Object.keys()`.
- [ ] Use `Object.values()`.
- [ ] Use `Object.entries()`.
- [ ] Explain `for...in`.
- [ ] Distinguish own vs inherited properties.
- [ ] Use `Object.hasOwn()`.
- [ ] Explain prototypes.
- [ ] Explain prototype chains.
- [ ] Explain `this` in object methods.
- [ ] Use getters/setters appropriately.
- [ ] Read property descriptors.
- [ ] Use `Object.freeze()` correctly.
- [ ] Explain why freeze is shallow.
- [ ] Understand symbol keys.
- [ ] Understand JSON serialization.
- [ ] Recognize object security risks.
- [ ] Choose between Object, Array, and Map.
- [ ] Teach the topic to another beginner.

---

## One Sentence to Remember

> **An object is a structured value made of properties, and understanding property lookup, identity, mutation, and prototypes is the key to understanding JavaScript's object system.**
