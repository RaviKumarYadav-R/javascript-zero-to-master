# Variables & Bindings

> **Core idea:** A variable is a named binding used to access a value. In JavaScript, `let`, `const`, and `var` create bindings with different rules.

## 1. Declaration

A declaration introduces a binding.

```js
let age;
const name = "Ravi";
var score;
```

`let age` declares `age` without an initializer.

A `const` declaration must have an initializer.

```js
const age; // SyntaxError
```

## 2. Initialization

Initialization gives a binding its initial value.

```js
let age = 21;
```

The declaration introduces `age` and the initializer gives it `21`.

For a `let` declaration without an initializer, the value becomes `undefined` when execution reaches that declaration.

```js
let age;
console.log(age); // undefined
```

## 3. Assignment

Assignment changes what a mutable binding refers to.

```js
let score = 10;
score = 20;
score = 30;
```

The first value is the initialization.

The later values are assignments.

`const` prevents reassignment:

```js
const score = 10;
score = 20; // TypeError
```

## 4. Mutation vs Reassignment

These are different operations.

```js
const user = { name: "Ravi" };

user.name = "Aman"; // mutation: allowed
user = {};          // reassignment: not allowed
```

`const` protects the binding from reassignment.

It does not make the referenced object immutable.

Likewise:

```js
const numbers = [1, 2];
numbers.push(3); // allowed
```

The array changed, but `numbers` still refers to the same array.

> **Memory trick:** `const` means **no rebinding**, not **no mutation**.

## 5. `let`

`let` creates a block-scoped binding.

```js
let count = 0;
count = count + 1;
```

Use it when reassignment is intentional.

Typical examples include counters, accumulators, and changing state.

## 6. `const`

`const` creates a block-scoped binding that must be initialized.

```js
const language = "JavaScript";
```

Prefer `const` when the binding does not need reassignment.

```js
const taxRate = 0.18;
const appName = "Notes App";
```

This communicates intent to readers.

## 7. `var`

`var` is function-scoped.

```js
function demo() {
  if (true) {
    var value = 10;
  }

  console.log(value); // 10
}

demo();
```

The `if` block does not create a separate `var` scope.

Modern code generally prefers `let` and `const`, but understanding `var` is essential for reading older JavaScript.

## 8. Block Scope

A block is a pair of braces that creates a lexical scope for `let` and `const`.

```js
const outside = "A";

{
  const inside = "B";
  console.log(outside); // A
  console.log(inside);  // B
}

console.log(outside); // A
// console.log(inside); // ReferenceError
```

An inner scope can access appropriate outer bindings.

An outer scope cannot access bindings declared only inside an inner scope.

## 9. Function Scope

Functions create function scopes.

```js
function calculate() {
  const result = 42;
  return result;
}

console.log(calculate());
// console.log(result); // ReferenceError
```

The local binding belongs to the function's scope.

`var` uses function scope, while `let` and `const` also respect nested blocks.

## 10. Shadowing

Shadowing occurs when an inner scope has a binding with the same identifier as an outer scope.

```js
const message = "outer";

{
  const message = "inner";
  console.log(message); // inner
}

console.log(message); // outer
```

The inner declaration is selected while resolving `message` inside that block.

Avoid unnecessary shadowing because it can reduce readability.

## 11. Temporal Dead Zone

`let` and `const` bindings cannot be accessed before their declaration is evaluated.

The interval between entering the scope and evaluating the declaration is called the **Temporal Dead Zone (TDZ)**.

```js
console.log(value); // ReferenceError
let value = 10;
```

A precise explanation is better than saying “`let` is not hoisted.”

The binding exists as part of lexical environment setup, but it is uninitialized until evaluation reaches the declaration.

## 12. `var` Hoisting

A `var` binding is created during environment setup and initialized to `undefined` before normal statement execution reaches its declaration.

```js
console.log(value); // undefined
var value = 10;
```

A useful teaching model is:

```js
var value;
console.log(value);
value = 10;
```

This is a conceptual model, not literal source rewriting.

## 13. `let` and `const` Hoisting

It is technically inaccurate to say that `let` and `const` are simply “not hoisted.”

Their bindings are established during lexical environment creation.

However, they remain uninitialized until the declaration is evaluated.

Trying to access them during this period throws a `ReferenceError`.

```js
{
  // TDZ
  console.log(x); // ReferenceError
  let x = 10;
}
```

## 14. Declaration vs Initialization vs Assignment

Study this carefully:

```js
let score;     // declaration
score = 50;    // assignment
score = 75;    // assignment
```

For:

```js
const score = 50;
```

declaration and initialization happen as part of the same declaration statement.

Keeping these terms separate makes scope and execution questions much easier.

## 15. Multiple Declarations

JavaScript permits multiple bindings in one declaration.

```js
let a = 1, b = 2, c = 3;
```

The syntax is valid.

For unrelated values, separate declarations can improve readability.

```js
const userName = "Ravi";
const age = 21;
const city = "Dhanbad";
```

## 16. Identifier Naming Rules

An identifier may use letters, digits, `_`, and `$`, subject to JavaScript identifier rules.

It cannot begin with a digit.

```js
let user1 = "Ravi";
let _count = 10;
let $price = 100;
```

This is invalid:

```js
let 1user = "Ravi"; // SyntaxError
```

Reserved keywords cannot normally be used as variable names in prohibited contexts.

```js
let if = 10; // SyntaxError
```

## 17. Naming Conventions

Prefer descriptive names.

```js
const totalPrice = 999;
const userAge = 21;
const isLoggedIn = true;
```

Poor names hide intent:

```js
const x = 999;
const n = 21;
const flag = true;
```

Boolean names often use `is`, `has`, `can`, or `should`.

```js
const isActive = true;
const hasPermission = false;
const canEdit = true;
```

## 18. Case Sensitivity

JavaScript identifiers are case-sensitive.

```js
const name = "Ravi";
const Name = "Aman";
```

These are different bindings.

Do not depend on capitalization differences to distinguish concepts in production code.

## 19. Dynamic Typing

JavaScript bindings do not require a fixed declared value type.

```js
let value = 10;
value = "hello";
value = false;
```

This is valid.

The values have runtime types.

Dynamic typing does not mean JavaScript has no type system.

It means type information is associated with runtime values rather than requiring every variable declaration to specify a fixed static type.

## 20. Bindings and Values

Use this mental model:

```text
identifier
    ↓
binding
    ↓
current value
```

For:

```js
let score = 10;
```

`score` is the identifier used to refer to the binding.

The binding currently refers to the value `10`.

After:

```js
score = 20;
```

the same binding refers to `20`.

This model becomes extremely useful when learning closures and execution contexts.

## 21. Object References

Avoid teaching objects as if the variable literally contains a simple “memory address.”

A better beginner model is that the binding refers to an object value.

```js
const user = { name: "Ravi" };
```

Another binding can refer to the same object:

```js
const anotherUser = user;
anotherUser.name = "Aman";

console.log(user.name); // Aman
```

Both bindings refer to the same object.

## 22. Destructuring

Destructuring creates bindings by extracting values.

```js
const [first, second] = [10, 20];

console.log(first);  // 10
console.log(second); // 20
```

Object destructuring:

```js
const user = {
  name: "Ravi",
  age: 21
};

const { name, age } = user;
```

Now `name` and `age` are bindings containing the corresponding property values.

## 23. Destructuring Defaults

Defaults are used when the extracted value is `undefined`.

```js
const { name = "Unknown" } = {};
console.log(name); // Unknown
```

`null` does not trigger the default:

```js
const { name = "Unknown" } = { name: null };
console.log(name); // null
```

## 24. Rest in Destructuring

Rest collects remaining values.

```js
const [first, ...others] = [10, 20, 30, 40];

console.log(first);  // 10
console.log(others); // [20, 30, 40]
```

Object rest collects remaining own enumerable properties.

```js
const { id, ...details } = {
  id: 1,
  name: "Ravi",
  age: 21
};
```

## 25. Global Bindings

Top-level behavior depends on whether code is a script or a module and on the host environment.

Do not assume every top-level declaration becomes a property of `globalThis`.

In browsers, top-level lexical declarations in scripts have different global-object behavior from top-level `var` declarations.

Modules have their own top-level module scope.

These rules become important when working with modules and browser environments.

## 26. Script vs Module

Classic script:

```html
<script src="app.js"></script>
```

Module:

```html
<script type="module" src="app.js"></script>
```

Module code is strict mode code.

Module code has module scope.

Modules support `import` and `export`.

Do not treat script and module top-level declarations as identical.

## 27. `const` With Arrays

This is valid:

```js
const skills = ["HTML", "CSS"];
skills.push("JavaScript");
```

This is invalid:

```js
skills = ["React"];
```

The first changes the array.

The second attempts to reassign the binding.

## 28. `const` With Objects

This is valid:

```js
const profile = {
  name: "Ravi"
};

profile.name = "Aman";
```

To prevent mutation, additional techniques such as `Object.freeze()` or immutable data patterns are required.

Even `Object.freeze()` is shallow, so nested objects require separate consideration.

## 29. Common Mistake: `const` Means Immutable

Wrong:

> “A const object cannot change.”

Correct:

> “A const binding cannot be reassigned.”

Always ask whether the operation is changing the binding or changing the referenced object.

## 30. Common Mistake: `let` Is Not Hoisted

Avoid the oversimplified statement.

Correct explanation:

> `let` and `const` bindings are created during lexical environment setup but remain uninitialized until their declarations are evaluated.

The TDZ explains why early access throws.

## 31. Common Mistake: `var` Is Block Scoped

Wrong assumption:

```js
if (true) {
  var value = 10;
}

console.log(value); // 10
```

`var` is function-scoped.

With `let`:

```js
if (true) {
  let value = 10;
}

console.log(value); // ReferenceError
```

## 32. Common Mistake: Reusing Variables for Everything

Avoid:

```js
let data = 10;
data = "Ravi";
data = true;
data = { id: 1 };
```

Although valid, constantly changing the semantic meaning of a binding makes code harder to understand.

Prefer focused bindings:

```js
const userId = 1;
const userName = "Ravi";
const isActive = true;
```

## 33. Output Prediction

Predict before running:

```js
var a = 1;
let b = 2;
const c = 3;

{
  var a = 10;
  let b = 20;
  const c = 30;

  console.log(a, b, c);
}

console.log(a, b, c);
```

Trace each scope before thinking about the output.

The first log sees `10 20 30`.

The second sees `10 2 3`.

The `var` binding belongs to the surrounding function/global scope, while the `let` and `const` declarations belong to the block.

## 34. TDZ Prediction

```js
console.log(a);
var a = 10;
```

Output:

```text
undefined
```

But:

```js
console.log(b);
let b = 10;
```

throws:

```text
ReferenceError
```

Do not memorize only the outputs.

Explain the binding state in each case.

## 35. Real-World Example

A cart might use:

```js
const cart = [];
let total = 0;
let itemCount = 0;
```

`cart` continues referring to the same array while its contents change.

`total` changes as items are added or removed.

`itemCount` changes as the number of items changes.

The declarations communicate intended mutability.

## 36. Best Practices

Prefer `const` by default.

Use `let` when reassignment is genuinely required.

Avoid `var` in new code unless its specific behavior is intentional.

Keep scope as small as practical.

Use meaningful names.

Avoid unnecessary shadowing.

Avoid global state when possible.

Do not mutate shared objects without a clear reason.

Do not confuse binding immutability with object immutability.

## 37. Debugging Checklist

When a variable behaves unexpectedly, ask:

1. Where is it declared?
2. Which scope contains the declaration?
3. Is another binding shadowing it?
4. Is it `var`, `let`, or `const`?
5. Is this declaration, initialization, assignment, or mutation?
6. Is the access happening before declaration evaluation?
7. Could TDZ be involved?
8. Is an object being mutated?
9. Is destructuring involved?
10. Is the code a script or module?

## 38. Practice Ladder

### Level 1 — Recall

1. Define a binding.
2. Define declaration.
3. Define initialization.
4. Define assignment.
5. Define mutation.

### Level 2 — Understand

6. Explain `let`.
7. Explain `const`.
8. Explain `var`.
9. Explain block scope.
10. Explain function scope.

### Level 3 — Predict

11. Predict `var` inside a block.
12. Predict `let` inside a block.
13. Predict TDZ behavior.
14. Predict shadowing.
15. Predict mutation through two object bindings.

### Level 4 — Apply

16. Build a counter with `let`.
17. Build an immutable binding with `const`.
18. Use object destructuring.
19. Use array destructuring.
20. Use rest destructuring.

### Level 5 — Debug

21. Fix an accidental TDZ error.
22. Fix an unnecessary `var` declaration.
23. Fix a shadowing problem.
24. Explain a failed const reassignment.
25. Explain why a const object's property can change.

### Level 6 — Design

26. Choose declarations for a shopping cart.
27. Choose declarations for a game score.
28. Choose declarations for configuration.
29. Minimize global bindings.
30. Refactor confusing variable names.

## 39. Interview Questions

- What is a binding?
- What is the difference between declaration and initialization?
- What is the difference between initialization and assignment?
- What is the difference between mutation and reassignment?
- Difference between `let`, `const`, and `var`?
- What is block scope?
- What is function scope?
- What is shadowing?
- What is TDZ?
- Are `let` and `const` hoisted?
- Why does `var` return `undefined` before its declaration?
- Why does `let` throw before its declaration?
- Does `const` make objects immutable?
- What does object destructuring create?
- What is the difference between a script and module top-level scope?

## 40. Teach-Back Challenge

Explain this code without running it:

```js
const user = { name: "Ravi" };
let score = 10;

{
  const user = { name: "Aman" };
  let score = 20;
  score = 30;
  user.name = "Raj";
}

score = 40;
```

Your explanation must identify every binding, every scope, every initialization, every reassignment, every mutation, and every shadowed identifier.

## 41. Mini Challenge

Create a program that demonstrates all of these in one file:

- `var`
- `let`
- `const`
- block scope
- function scope
- shadowing
- TDZ
- mutation
- reassignment
- array destructuring
- object destructuring

Add comments explaining the result of every important line.

## 42. Final Mental Model

```text
Declaration
    ↓
creates binding
    ↓
Initialization
    ↓
first value
    ↓
Assignment
    ↓
new value for mutable binding

Object mutation is different:

binding ───────→ object
                   ↓
                property changes
```

Remember:

> **`const` = no reassignment.**
>
> **`let` = reassignment allowed.**
>
> **`var` = function-scoped legacy declaration.**
>
> **Mutation ≠ reassignment.**
>
> **TDZ = lexical binding exists but is not initialized yet.**

## 43. Mastery Checklist

- [ ] Define a variable precisely as a named binding.
- [ ] Explain declaration.
- [ ] Explain initialization.
- [ ] Explain assignment.
- [ ] Explain mutation.
- [ ] Use `const` correctly.
- [ ] Use `let` correctly.
- [ ] Explain `var` correctly.
- [ ] Explain block scope.
- [ ] Explain function scope.
- [ ] Explain shadowing.
- [ ] Explain TDZ.
- [ ] Explain hoisting precisely.
- [ ] Explain destructuring.
- [ ] Explain rest destructuring.
- [ ] Explain script vs module scope at a high level.
- [ ] Predict scope-related output.
- [ ] Debug variable-related errors.
- [ ] Teach this chapter without notes.
