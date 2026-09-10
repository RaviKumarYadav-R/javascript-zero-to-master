# 07 — Collections in JavaScript

> Collections are structures used to store, retrieve, iterate, and organize multiple values. JavaScript's most important built-in collections are `Map`, `Set`, `WeakMap`, and `WeakSet`.

---

## 1. What Is a Collection?

A collection is a data structure that manages multiple values as one logical unit.

Examples:

```text
Array   → ordered values
Object  → named properties
Map     → key/value entries
Set     → unique values
```

---

## 2. Why Collections Matter

Real applications constantly manage groups of data: users, IDs, permissions, cached values, selected items, and lookup tables.

Choosing the right collection can make code simpler and more efficient.

---

## 3. Collection Mental Model

```text
                 COLLECTIONS
                      │
       ┌──────────────┼──────────────┐
       ↓              ↓              ↓
     Array          Map/Set       WeakMap/WeakSet
   ordered        key/value       object-keyed
```

---

## 4. Array vs Collection APIs

An Array is itself a collection, but JavaScript documentation often uses "keyed collections" for `Map`, `Set`, `WeakMap`, and `WeakSet`.

This chapter focuses especially on those keyed collections.

---

## 5. `Map` Definition

A `Map` stores key-value pairs.

```js
const users = new Map();
```

Unlike ordinary object property keys, Map keys can be values of any JavaScript type.

---

## 6. Creating a Map

```js
const scores = new Map();
```

The map initially contains no entries.

---

## 7. Map With Initial Entries

```js
const scores = new Map([
  ["Ravi", 95],
  ["Aman", 88]
]);
```

The input is an iterable of key-value pairs.

---

## 8. `Map.set()`

Add or update an entry with `set()`.

```js
const scores = new Map();
scores.set("Ravi", 95);
```

`set()` returns the Map itself, enabling chaining.

---

## 9. Map Chaining

```js
scores
  .set("Aman", 88)
  .set("Neha", 91);
```

Each `set()` returns the same Map object.

---

## 10. `Map.get()`

Retrieve a value using its key.

```js
console.log(scores.get("Ravi")); // 95
```

---

## 11. Missing Map Key

```js
console.log(scores.get("Unknown")); // undefined
```

A missing key returns `undefined`.

If `undefined` can itself be a stored value, use `has()` to distinguish presence from absence.

---

## 12. `Map.has()`

```js
scores.has("Ravi"); // true
scores.has("Unknown"); // false
```

It checks whether the key exists.

---

## 13. `Map.delete()`

```js
scores.delete("Ravi");
```

It returns `true` when an entry was removed and `false` when the key was absent.

---

## 14. `Map.clear()`

```js
scores.clear();
```

This removes all entries from the Map.

---

## 15. `Map.size`

Use the `size` property.

```js
console.log(scores.size);
```

Unlike arrays, a Map does not use `.length` for its entry count.

---

## 16. Map Keys Can Be Objects

```js
const user = { id: 1 };
const data = new Map();

data.set(user, "Admin");
```

Object identity determines the key.

---

## 17. Object Key Identity in Map

```js
const a = { id: 1 };
const b = { id: 1 };

const map = new Map();
map.set(a, "A");

console.log(map.get(b)); // undefined
```

`a` and `b` are different object identities.

---

## 18. Same Object as Map Key

```js
map.set(a, "Admin");
console.log(map.get(a)); // Admin
```

The exact object identity must be used.

---

## 19. Primitive Map Keys

Maps can use strings, numbers, booleans, symbols, `null`, `undefined`, BigInts, and objects as keys.

```js
const map = new Map();
map.set(1, "number");
map.set("1", "string");
```

These are different keys.

---

## 20. Map Key Equality

Map key matching uses **SameValueZero** semantics.

This means `NaN` can match `NaN`, and `0` and `-0` are treated as the same key.

---

## 21. `NaN` as a Map Key

```js
const map = new Map();
map.set(NaN, "not a number");

console.log(map.get(NaN)); // not a number
```

This differs from the surprising behavior of `NaN === NaN`.

---

## 22. Map Iteration

Maps are iterable.

```js
for (const entry of map) {
  console.log(entry);
}
```

Each entry is a two-element array: `[key, value]`.

---

## 23. Map `entries()`

```js
for (const [key, value] of map.entries()) {
  console.log(key, value);
}
```

This explicitly requests key-value entries.

---

## 24. Map `keys()`

```js
for (const key of map.keys()) {
  console.log(key);
}
```

It returns an iterator over keys.

---

## 25. Map `values()`

```js
for (const value of map.values()) {
  console.log(value);
}
```

It returns an iterator over values.

---

## 26. Map `forEach()`

```js
map.forEach((value, key) => {
  console.log(key, value);
});
```

Notice the callback order: `value, key, map`.

---

## 27. Map Insertion Order

Map iteration follows insertion order for entries.

This makes iteration predictable for many application use cases.

---

## 28. Updating Does Not Move a Key to the End

```js
const map = new Map([
  ["a", 1],
  ["b", 2]
]);

map.set("a", 10);
```

Updating an existing key does not create a second entry or move it as a new key.

---

## 29. Map Constructor Requires Iterable Entries

```js
new Map([
  ["a", 1],
  ["b", 2]
]);
```

Each element must provide a key and value pair.

---

## 30. Converting Map to Array

```js
const entries = [...map];
```

The result is an array of `[key, value]` pairs.

---

## 31. Map to Object

For string/symbol-compatible keys, you can deliberately convert entries.

```js
const obj = Object.fromEntries(map);
```

Be careful: converting to an object changes the key model.

---

## 32. Object to Map

```js
const user = { name: "Ravi", age: 21 };
const map = new Map(Object.entries(user));
```

Now each object property becomes a Map entry.

---

## 33. Map vs Object

| Feature | Map | Object |
|---|---|---|
| Key types | Any value | String/Symbol |
| Size | `size` | manual/keys |
| Iteration | built in | explicit helpers |
| Prototype | Map prototype | object prototype normally |
| Record shape | Less natural | Excellent |

---

## 34. When Map Is Better

Use Map when the primary abstraction is a dynamic key-value collection, especially when keys are not naturally strings.

---

## 35. When Object Is Better

Use an object for structured records.

```js
const user = {
  id: 1,
  name: "Ravi"
};
```

This expresses a known shape clearly.

---

## 36. Map for Frequency Counting

```js
const counts = new Map();

for (const value of ["a", "b", "a"]) {
  counts.set(value, (counts.get(value) ?? 0) + 1);
}
```

This is a useful DSA pattern.

---

## 37. Map for Caching

```js
const cache = new Map();

function getResult(input) {
  if (cache.has(input)) return cache.get(input);
  const result = expensiveOperation(input);
  cache.set(input, result);
  return result;
}
```

Caching should still consider memory limits and invalidation.

---

## 38. `Set` Definition

A Set is a collection of unique values.

```js
const ids = new Set();
```

Duplicate values are not stored as separate entries.

---

## 39. Creating a Set

```js
const numbers = new Set([1, 2, 3]);
```

The constructor accepts an iterable.

---

## 40. Duplicate Values in Set

```js
const numbers = new Set([1, 1, 2, 2, 3]);
console.log(numbers.size); // 3
```

Uniqueness is automatic.

---

## 41. `Set.add()`

```js
const tags = new Set();
tags.add("javascript");
tags.add("web");
```

`add()` returns the Set, so chaining is possible.

---

## 42. Adding the Same Value

```js
tags.add("javascript");
```

The Set remains unchanged in terms of unique values.

---

## 43. `Set.has()`

```js
tags.has("javascript"); // true
```

Use it for membership checks.

---

## 44. `Set.delete()`

```js
tags.delete("web");
```

It returns whether an entry was actually removed.

---

## 45. `Set.clear()`

```js
tags.clear();
```

This removes every value.

---

## 46. `Set.size`

```js
console.log(tags.size);
```

`size` reports the number of unique values.

---

## 47. Set Uses SameValueZero

Set membership uses SameValueZero semantics.

Therefore:

```js
new Set([NaN]).has(NaN); // true
```

---

## 48. Object Identity in Set

```js
const a = {};
const b = {};
const set = new Set([a]);

console.log(set.has(b)); // false
```

Objects are unique by identity.

---

## 49. Same Object in Set

```js
set.add(a);
console.log(set.size); // 1
```

Adding the same object identity again does not create another entry.

---

## 50. Set Iteration

```js
for (const value of set) {
  console.log(value);
}
```

Sets are iterable and iterate values in insertion order.

---

## 51. Set `values()`

```js
set.values();
```

It returns an iterator over values.

---

## 52. Set `keys()`

A Set has a `keys()` method for API symmetry.

For Sets, its iterator yields the same values as `values()`.

---

## 53. Set `entries()`

Set entries are pairs containing the value twice.

```js
for (const [value1, value2] of set.entries()) {
  console.log(value1, value2);
}
```

This supports generic collection APIs.

---

## 54. Set `forEach()`

```js
set.forEach((value) => {
  console.log(value);
});
```

The callback receives the value and, for compatibility, the value again as the second argument.

---

## 55. Remove Duplicates From an Array

A classic pattern is:

```js
const values = [1, 2, 2, 3, 3];
const unique = [...new Set(values)];
```

The result is `[1, 2, 3]`.

---

## 56. Set Is Not an Indexed Array

This does not work like array indexing:

```js
set[0];
```

Use iteration or convert to an array when positional access is required.

---

## 57. Set vs Array

Use an Array when order and indexed access are central.

Use a Set when uniqueness and membership are central.

---

## 58. Set Membership

```js
const permissions = new Set(["read", "write"]);

if (permissions.has("write")) {
  console.log("Allowed");
}
```

This makes intent explicit.

---

## 59. Set for Selected UI Items

A UI can maintain selected IDs as a Set.

```js
const selected = new Set([101, 104]);
```

Adding/removing membership becomes straightforward.

---

## 60. `WeakMap` Definition

A WeakMap stores key-value pairs where keys must be objects or non-registered symbols.

Its key references are weakly held, allowing eligible keys to become garbage-collectable when no strong references remain elsewhere.

---

## 61. Creating a WeakMap

```js
const metadata = new WeakMap();
```

It starts empty.

---

## 62. WeakMap Keys

```js
const element = {};
metadata.set(element, { created: Date.now() });
```

The object can be used as a key.

---

## 63. WeakMap Primitive Key Error

This is invalid:

```js
metadata.set("id", 123);
```

WeakMap keys must satisfy its key-type rules; ordinary primitive strings cannot be keys.

---

## 64. WeakMap `get()`

```js
metadata.get(element);
```

It retrieves the associated value when the key is present.

---

## 65. WeakMap `has()`

```js
metadata.has(element);
```

Checks whether the object key is present.

---

## 66. WeakMap `delete()`

```js
metadata.delete(element);
```

Removes the key-value association.

---

## 67. WeakMap Has No `size`

WeakMap intentionally does not expose a `size` property.

Its weak references and non-enumerable design prevent reliable counting/iteration semantics.

---

## 68. WeakMap Is Not Iterable

You cannot use:

```js
for (const entry of weakMap) {}
```

WeakMap deliberately has no general enumeration API.

---

## 69. Why WeakMap Is Not Iterable

If keys could be enumerated strongly, the collection could expose information about which objects remain alive.

Weak collections are designed around garbage-collection-friendly associations rather than enumeration.

---

## 70. WeakMap and Garbage Collection

Conceptually:

```text
strong reference → object ← WeakMap key
                    ↓
             no strong references
                    ↓
             eligible for GC
```

A WeakMap entry does not by itself keep the object alive.

---

## 71. WeakMap Is Useful for Metadata

WeakMap can associate private-ish metadata with objects without requiring the metadata system to own those objects' lifetimes.

---

## 72. WeakMap Example With DOM Nodes

```js
const metadata = new WeakMap();
const button = document.querySelector("button");

if (button) {
  metadata.set(button, { clicks: 0 });
}
```

When the button becomes otherwise unreachable, its WeakMap association can become collectible too.

---

## 73. WeakMap for Object Caches

WeakMap can cache information keyed by objects.

This is useful when cached data should not necessarily keep the key object alive.

---

## 74. WeakSet Definition

A WeakSet stores objects or non-registered symbols as weakly held unique members.

```js
const visited = new WeakSet();
```

---

## 75. WeakSet `add()`

```js
const object = {};
visited.add(object);
```

The object becomes a member.

---

## 76. WeakSet `has()`

```js
visited.has(object); // true
```

Use it for membership checks.

---

## 77. WeakSet `delete()`

```js
visited.delete(object);
```

This removes the object from the WeakSet.

---

## 78. WeakSet Has No Size

WeakSet does not expose a reliable `size` because its membership is weak and non-enumerable.

---

## 79. WeakSet Is Not Iterable

You cannot enumerate WeakSet members.

This is a deliberate design property, not a missing convenience feature.

---

## 80. WeakSet for Visited Objects

```js
const visited = new WeakSet();

function visit(node) {
  if (visited.has(node)) return;
  visited.add(node);
  // process node
}
```

This can prevent repeated processing without keeping objects alive solely because of the tracking set.

---

## 81. Map vs WeakMap

| Feature | Map | WeakMap |
|---|---|---|
| Key | Any value | Object/non-registered symbol keys |
| Iterable | Yes | No |
| Size | Yes | No |
| Enumeration | Yes | No |
| Weak key retention | No | Yes |
|

---

## 82. Set vs WeakSet

| Feature | Set | WeakSet |
|---|---|---|
| Values | Any value | Objects/non-registered symbols |
| Iterable | Yes | No |
| Size | Yes | No |
| Weak retention | No | Yes |

---

## 83. Choosing Map or Object

Ask:

```text
Is this a record with named fields? → Object
Is this a dynamic key/value collection? → Map
```

This simple question solves many design decisions.

---

## 84. Choosing Set or Array

Ask:

```text
Do I need unique membership? → Set
Do I need indexes/duplicates? → Array
```

---

## 85. Choosing WeakMap

Ask whether you need object-keyed metadata/cache entries whose keys should not be kept alive by the collection itself.

If you need enumeration, use Map instead.

---

## 86. Choosing WeakSet

Use WeakSet when you need weak membership tracking for objects and do not need enumeration or a count.

---

## 87. Collection Iterators

`Map`, `Set`, and their weak variants have different iteration capabilities.

```text
Map      → iterable
Set      → iterable
WeakMap  → not iterable
WeakSet  → not iterable
```

---

## 88. `for...of` With Map

```js
for (const [key, value] of map) {
  console.log(key, value);
}
```

The default Map iterator yields entries.

---

## 89. `for...of` With Set

```js
for (const value of set) {
  console.log(value);
}
```

The default Set iterator yields values.

---

## 90. Spread With Map

```js
const entries = [...map];
```

Because Map is iterable, spread can consume it.

---

## 91. Spread With Set

```js
const values = [...set];
```

This produces an array of unique values.

---

## 92. Map and Set Are Iterable Protocol Users

Their iteration behavior follows JavaScript's iterable/iterator protocols.

This connects collections to `for...of`, spread, destructuring, and `Array.from()`.

---

## 93. `Array.from()` With Set

```js
const array = Array.from(set);
```

The Set's iterable values become array elements.

---

## 94. `Array.from()` With Map

```js
const entries = Array.from(map);
```

The result contains `[key, value]` arrays.

---

## 95. Set Transformation

A Set can be transformed with array tools after conversion.

```js
const doubled = [...set].map((value) => value * 2);
```

Remember that the result is an Array.

---

## 96. Map Transformation

```js
const names = [...map.values()].map((name) => name.toUpperCase());
```

Map itself does not provide Array's `map()` method.

---

## 97. Common Mistake: `map.map()`

This is wrong:

```js
map.map(fn);
```

A Map is not an Array. Convert its keys, values, or entries when Array methods are needed.

---

## 98. Common Mistake: `set[0]`

A Set does not support indexed access.

Use iteration or convert it to an Array.

---

## 99. Common Mistake: Map `.length`

Wrong:

```js
map.length;
```

Correct:

```js
map.size;
```

---

## 100. Common Mistake: Set `.length`

Wrong:

```js
set.length;
```

Correct:

```js
set.size;
```

---

## 101. Common Mistake: Assuming Map Keys Are Strings

```js
const key = { id: 1 };
map.set(key, "data");
```

Map supports object keys; an object is not automatically converted to `"[object Object]"` as a Map key.

---

## 102. Common Mistake: Recreating an Object Key

```js
map.set({ id: 1 }, "data");
map.get({ id: 1 }); // undefined
```

The two literals create different objects.

---

## 103. Common Mistake: `has()` vs `get()`

If a Map can store `undefined`:

```js
map.set("x", undefined);
```

then:

```js
map.get("x"); // undefined
map.has("x"); // true
```

Use `has()` when presence matters.

---

## 104. Common Mistake: Expecting WeakMap Iteration

WeakMap is intentionally not enumerable.

If your design requires listing keys, WeakMap is the wrong abstraction.

---

## 105. Common Mistake: Assuming Weak Collections Prevent All Memory Problems

Weak references can help with lifetime management, but they do not automatically fix every memory leak.

Strong references elsewhere can still keep objects alive.

---

## 106. Garbage Collection Is Not Manual

JavaScript does not provide a standard API to force garbage collection in normal application code.

Weak collections communicate that a key/member does not need to be kept alive solely because of that weak association.

---

## 107. Collection Performance

`Map` and `Set` are designed for collection operations such as lookup and membership.

Do not interpret this as a guarantee that every operation is always faster than every object or array operation; actual performance depends on the engine, data, and workload.

---

## 108. Measure Before Optimizing

If collection performance matters:

1. identify the bottleneck
2. choose an appropriate data structure
3. benchmark realistic workloads
4. verify memory behavior
5. keep the simpler correct design when performance is already sufficient

---

## 109. DSA Pattern: Frequency Map

```js
function frequency(values) {
  const map = new Map();

  for (const value of values) {
    map.set(value, (map.get(value) ?? 0) + 1);
  }

  return map;
}
```

This is one of the most useful Map patterns in DSA.

---

## 110. DSA Pattern: Duplicate Detection

```js
function hasDuplicate(values) {
  return new Set(values).size !== values.length;
}
```

A Set tracks unique values.

---

## 111. DSA Pattern: Membership Filter

```js
const allowed = new Set(["admin", "editor"]);
const roles = ["admin", "guest", "editor"];

const valid = roles.filter((role) => allowed.has(role));
```

Set membership makes the intent obvious.

---

## 112. DSA Pattern: Grouping

Use a Map when a key can point to a collection of values.

```js
const groups = new Map();

function addToGroup(key, value) {
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(value);
}
```

---

## 113. Cache Design

A cache often needs:

- key generation
- lookup
- insertion
- invalidation
- size limits
- expiration policy

`Map` provides the storage primitive, not the complete cache policy.

---

## 114. Browser Example: Selected Elements

```js
const selected = new Set();

function select(id) {
  selected.add(id);
}

function unselect(id) {
  selected.delete(id);
}
```

This models membership directly.

---

## 115. Browser Example: Element Metadata

```js
const metadata = new WeakMap();

function remember(element, data) {
  metadata.set(element, data);
}
```

WeakMap can associate data with DOM objects without requiring enumeration.

---

## 116. Node.js Example: Request Tracking

A Map can track active request IDs and metadata.

```js
const activeRequests = new Map();

activeRequests.set(requestId, {
  startedAt: Date.now()
});
```

The application should still remove completed entries.

---

## 117. Security: Collection Keys From Users

Never assume a user-provided key is trustworthy merely because it is stored in a collection.

Validate authorization and business meaning separately from data storage.

---

## 118. Security: Map Does Not Replace Authorization

A Set of allowed roles is useful:

```js
const allowedRoles = new Set(["admin"]);
```

But checking membership is only one part of an authorization system. The authenticated identity and server-side policy still matter.

---

## 119. Debugging Collections

Inspect type, size, and entries deliberately.

```js
console.log(map instanceof Map);
console.log(map.size);
console.log([...map]);
```

For Set:

```js
console.log([...set]);
```

---

## 120. Output Prediction Challenge

Predict:

```js
const map = new Map();
const a = { id: 1 };
const b = { id: 1 };

map.set(a, "A");

console.log(map.get(a));
console.log(map.get(b));
```

Answer: `"A"`, then `undefined`.

---

## 121. Output Prediction Challenge

Predict:

```js
const set = new Set([1, 1, 2, 3, 3]);
console.log(set.size);
console.log([...set]);
```

Answer: `3` and `[1, 2, 3]`.

---

## 122. Output Prediction Challenge

Predict:

```js
const map = new Map();
map.set("x", undefined);

console.log(map.get("x"));
console.log(map.has("x"));
```

Answer: `undefined`, then `true`.

---

## 123. Beginner Practice

Build:

1. a student score Map
2. a unique tags Set
3. a frequency counter
4. a duplicate detector
5. a membership checker
6. Map iteration examples
7. Set iteration examples
8. Map-to-array conversion
9. Set-to-array conversion
10. Object-to-Map conversion

---

## 124. Intermediate Practice

Build:

1. contact lookup with Map
2. unique username validator with Set
3. category grouping with Map
4. memoization cache
5. selected-item tracker
6. role membership checker
7. object metadata store with WeakMap
8. visited-object tracker with WeakSet
9. collection debugging utility
10. frequency-based analytics utility

---

## 125. Advanced Practice

Build:

1. LRU-style cache using Map
2. graph adjacency Map
3. object metadata manager using WeakMap
4. duplicate-reference detector
5. collection-backed event registry
6. grouping utility preserving insertion order
7. custom collection iterator
8. memory-aware cache experiment
9. Set-based permission engine
10. benchmark Object vs Map for a realistic workload

---

## 126. Mini Project: Contact Manager

Requirements:

- store contacts by ID
- add
- update
- remove
- find
- list
- prevent duplicate IDs

Use Map as the primary storage structure.

---

## 127. Mini Project: Unique Tag Manager

Requirements:

- add tag
- remove tag
- check tag
- count tags
- list tags
- normalize case

Use Set.

---

## 128. Mini Project: Cache

Implement:

- `get(key)`
- `set(key, value)`
- `has(key)`
- `delete(key)`
- `clear()`
- optional maximum size

Start with Map and then reason about eviction.

---

## 129. Interview Questions

1. What is a Map?
2. How is Map different from Object?
3. What types can Map keys have?
4. What equality algorithm does Map use for keys?
5. What is a Set?
6. How does Set handle duplicates?
7. Why are objects unique by identity in Map and Set?
8. What is WeakMap?
9. Why is WeakMap not iterable?
10. Why does WeakMap not have `size`?
11. What is WeakSet?
12. When should you use Map instead of Object?
13. When should you use Set instead of Array?
14. What is a weak reference conceptually?
15. How do Maps and Sets interact with the iterable protocol?

---

## 130. Teach-Back Questions

Explain without notes:

- Map vs Object
- Set vs Array
- Map key identity
- SameValueZero
- Map iteration
- Set uniqueness
- WeakMap's purpose
- why weak collections cannot be enumerated
- garbage-collection relationship
- when each collection should be selected

---

## 131. Collection Decision Flowchart

```text
Need multiple values?
        │
        ├── Ordered/indexed values → Array
        │
        ├── Named record fields → Object
        │
        ├── Dynamic key/value lookup → Map
        │
        ├── Unique membership → Set
        │
        ├── Object-keyed weak metadata → WeakMap
        │
        └── Weak object membership → WeakSet
```

Use the simplest structure that expresses the real requirement.

---

## 132. Best Practices

- Choose collections based on semantics, not hype.
- Use Map for dynamic key-value collections.
- Use Set for uniqueness and membership.
- Use objects for structured records.
- Remember Map and Set use value identity/equality rules.
- Use `has()` when presence must be distinguished from an `undefined` value.
- Do not expect weak collections to be iterable.
- Measure performance rather than guessing.
- Keep cache invalidation explicit.
- Validate untrusted data independently of collection choice.

---

## 133. Memory Trick

Remember:

```text
Array   = ORDER
Object  = RECORD
Map     = LOOKUP
Set     = UNIQUE
WeakMap = OBJECT → METADATA
WeakSet = OBJECT → MEMBERSHIP
```

---

## 134. Final Mastery Checklist

- [ ] Explain what a collection is.
- [ ] Create a Map.
- [ ] Use `set`, `get`, `has`, `delete`, `clear`.
- [ ] Use `size`.
- [ ] Explain Map key identity.
- [ ] Explain SameValueZero.
- [ ] Iterate Maps.
- [ ] Convert Maps to arrays.
- [ ] Convert objects to Maps deliberately.
- [ ] Create a Set.
- [ ] Use `add`, `has`, `delete`, `clear`.
- [ ] Explain Set uniqueness.
- [ ] Iterate Sets.
- [ ] Remove duplicates with Set.
- [ ] Explain WeakMap.
- [ ] Explain weak references conceptually.
- [ ] Explain why WeakMap has no iteration/size.
- [ ] Explain WeakSet.
- [ ] Choose Object vs Map correctly.
- [ ] Choose Array vs Set correctly.
- [ ] Use collection patterns in DSA.
- [ ] Debug collection behavior.
- [ ] Design a collection-backed mini project.
- [ ] Teach the topic to another beginner.

---

## One Sentence to Remember

> **Choose Array for order, Object for records, Map for key-value lookup, Set for uniqueness, and weak collections when object lifetime should not be kept alive by the collection itself.**
