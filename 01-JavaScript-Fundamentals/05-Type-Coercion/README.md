# Type Coercion in JavaScript

> **Core idea:** Type coercion is the process of converting a value from one type to another. JavaScript performs some conversions explicitly because the programmer requests them and some implicitly because an operator or language operation requires them.

## 1. Precise Definition

Type coercion means converting a value from one JavaScript type to another.

Examples:

```js
Number("42");
String(42);
Boolean(1);
```

These are explicit conversions because the code clearly requests conversion.

JavaScript also performs implicit coercion:

```js
console.log("5" + 2); // "52"
```

The `+` operator sees a string involved in this operation and performs string concatenation rather than ordinary numeric addition.

Understanding coercion is essential because JavaScript is dynamically typed and many operations have defined conversion rules.

## 2. Why Does Coercion Exist?

Programs constantly receive values in different forms.

A form field commonly provides text.

An API may provide JSON numbers.

A URL query parameter is text.

A boolean condition needs a truth value.

Arithmetic needs numeric values.

JavaScript therefore defines rules for converting values when an operation requires another representation.

Without conversion rules, common operations would require manual conversion at every boundary.

The tradeoff is that implicit conversion can sometimes produce surprising results.

## 3. Explicit vs Implicit Conversion

Explicit conversion is visible in source code.

```js
const age = Number("21");
```

Implicit coercion happens as part of another operation.

```js
const result = "21" - 1;
console.log(result); // 20
```

The subtraction operator requires numeric conversion.

A strong JavaScript developer should understand both forms.

For application code, explicit conversion is often easier for humans to read.

## 4. The Main Conversion Families

Important abstract conversion operations include:

```text
ToPrimitive
ToBoolean
ToNumber
ToString
```

The ECMAScript specification defines these operations precisely.

You do not need to memorize the specification algorithms on day one.

You should understand the practical rules first and progressively learn the internal algorithms.

## 5. ToBoolean

ToBoolean converts a value into `true` or `false`.

Falsy values in JavaScript include:

```js
false
0
-0
0n
""
null
undefined
NaN
```

Everything else is truthy, including empty arrays and empty objects.

```js
Boolean([]); // true
Boolean({}); // true
```

This is one of the most important coercion rules in JavaScript.

## 6. Truthy and Falsy

A value is **falsy** when ToBoolean produces `false`.

A value is **truthy** when ToBoolean produces `true`.

Example:

```js
if (username) {
  console.log("Username exists");
}
```

If `username` is `"Ravi"`, the condition is truthy.

If `username` is `""`, the condition is falsy.

This does not mean the string is literally converted and stored as a boolean.

The condition performs boolean evaluation for control flow.

## 7. Empty Array Is Truthy

A common beginner mistake is assuming an empty array is falsy.

It is not.

```js
Boolean([]); // true
```

Therefore:

```js
if ([]) {
  console.log("Runs");
}
```

The message runs.

The reason is that arrays are objects, and ordinary objects are truthy.

## 8. Empty Object Is Truthy

Likewise:

```js
Boolean({}); // true
```

This surprises developers coming from languages where empty collections may be false-like.

In JavaScript, do not use `if (array)` to test whether an array contains elements.

Use:

```js
if (array.length > 0) {
  // has elements
}
```

## 9. ToNumber

ToNumber converts values to numeric values when an operation requires numbers.

Explicit examples:

```js
Number("42");   // 42
Number("3.14"); // 3.14
Number(true);    // 1
Number(false);   // 0
Number(null);    // 0
Number(undefined); // NaN
```

String conversion to number follows stricter rules than many beginners expect.

Whitespace around a numeric string is ignored.

```js
Number(" 42 "); // 42
```

An empty or whitespace-only string becomes `0` with `Number()`.

```js
Number(""); // 0
Number("   "); // 0
```

## 10. Invalid Numeric Conversion

When a string cannot represent a valid number for the requested conversion, `Number()` returns `NaN`.

```js
Number("hello"); // NaN
Number("12px");  // NaN
```

`NaN` means the numeric result is not a valid numeric value.

It is still a value of type `number`:

```js
typeof NaN; // "number"
```

Use:

```js
Number.isNaN(value)
```

to test for the actual `NaN` value without coercing the argument.

## 11. `Number()` vs `parseInt()`

These operations have different purposes.

```js
Number("42px");   // NaN
parseInt("42px"); // 42
```

`Number()` attempts to interpret the entire string as a number.

`parseInt()` parses an integer from the beginning of a string and stops when it reaches an invalid character.

Always provide a radix when using `parseInt()` for clarity:

```js
parseInt("42", 10); // 42
```

## 12. `parseFloat()`

`parseFloat()` parses a floating-point number from the beginning of a string.

```js
parseFloat("3.14px"); // 3.14
```

Again, this differs from `Number()`:

```js
Number("3.14px"); // NaN
```

Choose the conversion method based on the input contract, not habit.

## 13. ToString

`String(value)` explicitly converts a value to a string.

```js
String(42);       // "42"
String(true);     // "true"
String(false);    // "false"
String(null);     // "null"
String(undefined); // "undefined"
```

Objects have string conversion behavior too.

```js
String([]); // ""
String([1, 2, 3]); // "1,2,3"
String({}); // "[object Object]"
```

Do not assume object-to-string conversion produces JSON.

For JSON serialization, use `JSON.stringify()`.

## 14. String Concatenation with `+`

The `+` operator has both numeric addition and string concatenation behavior.

```js
2 + 3; // 5
"2" + "3"; // "23"
"2" + 3; // "23"
```

The presence of a string can lead to string concatenation after the relevant conversion process.

This is why:

```js
console.log("Total: " + 100);
```

produces:

```text
Total: 100
```

## 15. Subtraction, Multiplication, and Division

Unlike `+`, arithmetic operators such as `-`, `*`, and `/` require numeric conversion.

```js
"10" - 2; // 8
"10" * 2; // 20
"10" / 2; // 5
```

This difference is a major source of interview questions.

Remember:

```text
+  → addition OR concatenation
-  → numeric operation
*  → numeric operation
/  → numeric operation
```

## 16. Unary Plus

Unary `+` is a concise numeric conversion operator.

```js
+"42"; // 42
+true; // 1
+false; // 0
+null; // 0
+undefined; // NaN
```

It is useful when the conversion is obvious, but `Number(value)` can be clearer in teaching or application boundaries.

## 17. Unary Minus

Unary `-` also performs numeric conversion before applying negation.

```js
-"42"; // -42
-true; // -1
-null; // -0
```

The important lesson is that operators can trigger coercion as part of their semantics.

## 18. Relational Comparisons

The relational operators `<`, `>`, `<=`, and `>=` can perform numeric conversion when comparing suitable primitive values.

```js
"10" > 2; // true
"2" > 10; // false
```

But string-to-string comparisons use lexicographic ordering:

```js
"10" < "2"; // true
```

Both operands are strings here, so this is a string comparison rather than numeric comparison.

## 19. Loose Equality `==`

Loose equality allows coercion in many cases.

```js
"5" == 5; // true
```

The string and number are not the same type, but the abstract equality algorithm can convert values before comparison.

This is why `==` has a larger set of rules than `===`.

## 20. Strict Equality `===`

Strict equality does not perform the same type coercion used by loose equality.

```js
"5" === 5; // false
```

The types differ.

For primitive values of different types, strict equality is false.

In modern application code, `===` is generally preferred because its behavior is easier to reason about.

## 21. `==` Does Not Mean “Bad”

Loose equality is not simply a broken version of strict equality.

It is a defined language operation with deliberate coercion rules.

However, its implicit conversions can make code harder to audit.

If you use `==`, you should understand the exact coercion behavior of the operands.

Do not use it casually just because it is shorter.

## 22. Famous Equality Examples

Study these carefully:

```js
0 == false; // true
"" == false; // true
"0" == false; // true
null == undefined; // true
```

But:

```js
0 === false; // false
"" === false; // false
"0" === false; // false
null === undefined; // false
```

The first group demonstrates loose-equality coercion.

The second group demonstrates strict equality.

## 23. `null` and `undefined`

`null` and `undefined` have different meanings.

Yet loose equality gives them a special relationship:

```js
null == undefined; // true
```

But:

```js
null === undefined; // false
```

Do not generalize this rule to other falsy values.

For example:

```js
null == 0; // false
null == false; // false
```

## 24. Boolean Contexts

Conditions use boolean evaluation.

```js
const count = 0;

if (count) {
  console.log("non-zero");
} else {
  console.log("zero");
}
```

`count` is not permanently converted to `false`.

The control-flow operation applies ToBoolean to determine which branch executes.

## 25. Logical AND `&&`

`&&` is not simply a boolean-producing operator.

It returns one of its operands.

```js
const result = "Ravi" && 100;
console.log(result); // 100
```

The first operand is truthy, so evaluation continues and returns the second operand.

If the first operand is falsy:

```js
const result = "" && 100;
console.log(result); // ""
```

This is called **short-circuit evaluation**.

## 26. Logical OR `||`

`||` also returns an operand.

```js
const name = "Ravi" || "Unknown";
console.log(name); // Ravi
```

If the first operand is falsy:

```js
const name = "" || "Unknown";
console.log(name); // Unknown
```

This pattern is often used for fallback values.

But it treats every falsy value as a reason to use the fallback.

## 27. Nullish Coalescing `??`

`??` only falls back for `null` or `undefined`.

```js
const count = 0 ?? 100;
console.log(count); // 0
```

With `||`:

```js
const count = 0 || 100;
console.log(count); // 100
```

This difference is critical when `0`, `false`, or `""` are valid values.

## 28. `||` vs `??`

Use this mental model:

```text
||  → fallback when left side is falsy
??  → fallback when left side is null or undefined
```

Example:

```js
const username = "" || "Guest";
// Guest

const username2 = "" ?? "Guest";
// ""
```

Choose based on the business meaning of the value.

## 29. Optional Chaining

Optional chaining can produce `undefined` instead of throwing when a property access encounters `null` or `undefined`.

```js
const user = null;
console.log(user?.name); // undefined
```

It is related to nullish handling, but it is not a general type-conversion operator.

Its purpose is safe conditional property access/calls.

## 30. ToPrimitive

Objects may need to be converted to primitive values before certain operations continue.

This is called **ToPrimitive**.

For example:

```js
const obj = {
  valueOf() {
    return 10;
  }
};

console.log(obj + 5); // 15
```

The object can provide primitive conversion behavior through mechanisms such as `valueOf()` and `toString()`.

Modern JavaScript also supports `Symbol.toPrimitive` for explicit control.

## 31. `Symbol.toPrimitive`

An object can define:

```js
const user = {
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return 21;
    if (hint === "string") return "Ravi";
    return "User";
  }
};
```

The conversion hint can influence which primitive representation is returned.

This is an advanced feature.

Use it for specialized abstractions, not ordinary application objects.

## 32. Object-to-Primitive Mental Model

A useful simplified flow is:

```text
Object
  ↓
ToPrimitive
  ↓
Primitive value
  ↓
Required conversion
  ↓
Number / String / Boolean behavior
```

The exact specification algorithm depends on the operation and conversion hint.

Do not memorize a single universal “object conversion order” without understanding the hint involved.

## 33. `valueOf()` and `toString()`

Ordinary objects inherit conversion-related methods from `Object.prototype`.

```js
const user = {};

user.toString(); // "[object Object]"
```

Arrays override useful conversion behavior:

```js
String([1, 2, 3]); // "1,2,3"
```

Dates have specialized conversion behavior as well.

This is why object coercion should be learned from the operation's rules rather than from one simplistic slogan.

## 34. NaN Is Not Equal to Itself

A classic JavaScript rule:

```js
NaN === NaN; // false
```

Therefore:

```js
NaN == NaN; // false
```

Use:

```js
Number.isNaN(value);
```

for testing whether a value is `NaN`.

`Object.is(NaN, NaN)` is also true.

## 35. `Object.is()`

`Object.is()` is similar to strict equality but differs for some edge cases.

```js
Object.is(NaN, NaN); // true
Object.is(0, -0); // false
```

Compare:

```js
NaN === NaN; // false
0 === -0; // true
```

This makes `Object.is()` useful when exact identity semantics for these numeric edge cases matter.

## 36. Negative Zero

JavaScript numbers include `-0`.

```js
const value = -0;

console.log(Object.is(value, -0)); // true
console.log(Object.is(value, 0));  // false
```

Yet:

```js
value === 0; // true
```

This is an IEEE 754 floating-point consequence.

Most application code does not need special handling, but advanced JavaScript developers should recognize it.

## 37. BigInt and Coercion

BigInt represents arbitrary-precision integers.

```js
const large = 12345678901234567890n;
```

Do not freely mix BigInt and Number in arithmetic:

```js
1n + 1; // TypeError
```

Explicit conversion may be possible when the value is appropriate:

```js
BigInt(1); // 1n
Number(1n); // 1
```

Be careful because converting a large BigInt to Number can lose precision.

## 38. String + Object

Consider:

```js
const user = { name: "Ravi" };
console.log("User: " + user);
```

The object is converted toward a primitive representation for concatenation.

The default result commonly contains:

```text
[object Object]
```

Do not expect JavaScript to automatically serialize objects as JSON.

Use:

```js
JSON.stringify(user);
```

when JSON text is required.

## 39. Array Coercion

Arrays have special string conversion behavior inherited through their object methods.

```js
String([1, 2, 3]); // "1,2,3"
```

Conceptually this is closely related to array joining.

```js
[1, 2, 3].toString(); // "1,2,3"
```

This can create surprising expressions:

```js
[1] + [2]; // "12"
```

Both arrays are converted toward strings for the `+` operation.

## 40. Common Trap: `[] == false`

This expression is true:

```js
[] == false; // true
```

It happens because loose equality performs multiple conversions.

A useful learning exercise is to trace the abstract equality algorithm instead of memorizing the result.

Do not use these examples as a reason to write clever coercion-heavy code.

Use them to understand JavaScript semantics.

## 41. Common Trap: `{}` in Expressions

Object literals can interact with parsing context in surprising ways.

For example, at the beginning of a statement, `{}` can be parsed as a block rather than an object expression.

When studying coercion, always distinguish syntax parsing from runtime conversion.

Parentheses can force expression context:

```js
({}).toString();
```

This produces the object's string representation.

## 42. Explicit Conversion Is Often Better at Boundaries

Suppose a form provides:

```js
const quantity = input.value;
```

The value is commonly a string.

If arithmetic requires a number, make the boundary explicit:

```js
const quantity = Number(input.value);
```

Then validate the result.

```js
if (!Number.isFinite(quantity)) {
  throw new Error("Invalid quantity");
}
```

This makes the data contract easier to understand.

## 43. Coercion and User Input

Never assume a user-entered string is a valid number.

```js
const age = Number(input);
```

Then validate:

```js
if (!Number.isInteger(age) || age < 0) {
  console.log("Invalid age");
}
```

Conversion and validation are separate responsibilities.

`Number()` answering “what numeric value does this represent?” does not answer “is this acceptable for my application?”

## 44. Global `isNaN()` vs `Number.isNaN()`

Global `isNaN()` coerces its argument to a number.

```js
isNaN("hello"); // true
```

`Number.isNaN()` does not coerce.

```js
Number.isNaN("hello"); // false
Number.isNaN(NaN);      // true
```

For checking the actual `NaN` value, prefer `Number.isNaN()`.

## 45. Global `isFinite()` vs `Number.isFinite()`

Global `isFinite()` can coerce:

```js
isFinite("10"); // true
```

`Number.isFinite()` requires an actual finite number:

```js
Number.isFinite("10"); // false
Number.isFinite(10);    // true
```

This distinction is important when validating external data.

## 46. Boolean Conversion With `Boolean()`

Explicit boolean conversion is straightforward:

```js
Boolean(0); // false
Boolean(1); // true
Boolean("hello"); // true
Boolean(""); // false
Boolean(null); // false
Boolean(undefined); // false
```

For objects:

```js
Boolean([]); // true
Boolean({}); // true
```

The object being empty does not make it falsy.

## 47. Double Negation

Some code uses `!!value` to convert to boolean.

```js
!!"hello"; // true
!!0;       // false
```

The first `!` converts through boolean evaluation and negates it.

The second `!` negates again.

This is valid but `Boolean(value)` can be clearer for beginners.

## 48. Conditional Operator and Coercion

The condition of a ternary expression uses boolean evaluation:

```js
const status = count > 0 ? "has items" : "empty";
```

Likewise:

```js
const message = username ? "Welcome" : "Please log in";
```

The selected result is not automatically converted to boolean.

Only the condition is evaluated for truthiness.

## 49. `switch` Is Different

`switch` case matching uses strict equality semantics.

```js
const value = "1";

switch (value) {
  case 1:
    console.log("number");
    break;
  case "1":
    console.log("string");
    break;
}
```

The second case matches.

There is no loose-equality coercion between `"1"` and `1` in case matching.

## 50. Assignment Does Not Automatically Convert Types

JavaScript allows a binding to refer to values of different types.

```js
let value = 10;
value = "10";
```

The assignment itself does not mean “convert everything to the previous type.”

This is different from operators that explicitly require conversion.

## 51. Coercion vs Parsing

Conversion and parsing are related but not identical concepts.

`Number("42")` converts a numeric string to a number.

`parseInt("42px", 10)` parses an integer prefix from a string.

Parsing generally means interpreting structured text according to a grammar.

For JSON:

```js
JSON.parse('{"age":21}');
```

parses JSON text into JavaScript values.

Do not call every conversion “parsing.”

## 52. Coercion vs Serialization

Serialization converts data into a representation suitable for storage or transmission.

```js
const text = JSON.stringify({ age: 21 });
```

This is JSON serialization, not ordinary type coercion.

Likewise:

```js
JSON.parse(text);
```

is JSON parsing/deserialization.

Keeping these concepts separate improves API and backend reasoning.

## 53. Evaluation Flow

A useful general mental model is:

```text
Expression
   ↓
Determine operation
   ↓
Determine required operand types
   ↓
Apply relevant conversion rules
   ↓
Perform operation
   ↓
Return result
```

For `"10" - 2`:

```text
"10"
 ↓ ToNumber
10
 ↓ subtraction
8
```

For `"10" + 2`, the operation can instead produce string concatenation.

## 54. Coercion Debugging Method

When an expression surprises you:

1. Identify the operator.
2. Identify each operand's actual type.
3. Ask whether the operator performs coercion.
4. Determine which conversion is required.
5. Apply conversion rules step by step.
6. Perform the operation.
7. Check the resulting type.

Example:

```js
"5" - true
```

Trace:

```text
"5" → 5
true → 1
5 - 1 → 4
```

Therefore the result is `4`.

## 55. Output Prediction Practice

Predict:

```js
console.log("5" + 2);
console.log("5" - 2);
console.log("5" * 2);
console.log("5" / 2);
console.log(true + 1);
console.log(false + 1);
```

Then explain every line using the operator's semantics.

Do not memorize six outputs without understanding the conversion process.

## 56. Advanced Prediction

Predict:

```js
console.log([] + []);
console.log([] + {});
console.log({} + []);
```

The exact interpretation of `{}` depends on syntactic context, which is why this is an advanced parsing/coercion exercise.

The purpose is to force you to separate parsing from runtime conversion.

## 57. Wrong vs Better Code

Hard-to-read:

```js
if (value == 1) {
  // ...
}
```

Usually clearer:

```js
if (value === 1) {
  // ...
}
```

If input is text and the application expects a number, normalize first:

```js
const numericValue = Number(value);

if (numericValue === 1) {
  // ...
}
```

Now the conversion boundary is visible.

## 58. Do Not Over-Coerce

This is unnecessarily clever:

```js
const result = !!value + +input;
```

Prefer readable code:

```js
const isPresent = Boolean(value);
const amount = Number(input);
const result = Number(isPresent) + amount;
```

Or, even better, design the calculation so boolean-to-number conversion is unnecessary.

Code should communicate intent rather than showcase obscure coercion tricks.

## 59. Security Perspective

Implicit coercion itself is not a vulnerability.

However, unexpected type handling at security boundaries can contribute to authorization, validation, or business-logic bugs.

Validate external input explicitly.

Normalize data before comparing it.

Do not rely on surprising equality behavior for authentication or authorization decisions.

Use strict, explicit checks for security-sensitive conditions.

## 60. Performance Perspective

For ordinary application code, readability is more important than micro-optimizing coercion.

Modern engines optimize many common operations.

Do not replace clear `Number(value)` with obscure arithmetic tricks merely to avoid a function call.

Profile real performance problems instead of guessing.

## 61. Common Mistakes

### Mistake 1
Thinking `+` always performs addition.

```js
"2" + 2; // "22"
```

### Mistake 2
Thinking empty arrays are falsy.

```js
Boolean([]); // true
```

### Mistake 3
Using `isNaN()` without understanding coercion.

### Mistake 4
Assuming `null` and `undefined` are identical.

### Mistake 5
Assuming `==` behaves like `===`.

### Mistake 6
Assuming `Number("12px")` returns `12`.

### Mistake 7
Assuming JSON conversion is the same as ordinary string coercion.

### Mistake 8
Mixing BigInt and Number in arithmetic.

### Mistake 9
Using `||` when `0` or `false` is a valid value.

### Mistake 10
Memorizing strange coercion puzzles without learning the rules.

## 62. Best Practices

Prefer explicit conversion at input boundaries.

Prefer `===` and `!==` for ordinary comparisons.

Use `??` when only `null` and `undefined` should trigger a fallback.

Use `||` when all falsy values should trigger the fallback.

Use `Number.isNaN()` to test actual `NaN`.

Use `Number.isFinite()` to validate actual finite numbers.

Validate converted input according to business rules.

Do not depend on coercion puzzles for application logic.

Learn implicit coercion so you can read and debug existing JavaScript.

## 63. Real-World Example: Form Input

Suppose an HTML input contains:

```html
<input id="age" type="number" />
```

Its `.value` is still a string.

```js
const rawAge = document.querySelector("#age").value;
```

Normalize it:

```js
const age = Number(rawAge);
```

Validate it:

```js
if (!Number.isInteger(age) || age < 0) {
  throw new Error("Invalid age");
}
```

This is safer and easier to reason about than relying on accidental coercion throughout the program.

## 64. Real-World Example: API Query Parameters

A URL such as:

```text
/products?page=2
```

contains textual URL data.

A server might receive:

```js
const page = "2";
```

Convert explicitly:

```js
const pageNumber = Number(page);
```

Then validate range and integer requirements.

```js
if (!Number.isInteger(pageNumber) || pageNumber < 1) {
  throw new Error("Invalid page");
}
```

## 65. Real-World Example: Default Values

Suppose `0` is meaningful:

```js
const retries = userRetries || 3;
```

If `userRetries` is `0`, this produces `3`.

If zero means “disable retries,” that is incorrect.

Use:

```js
const retries = userRetries ?? 3;
```

Now only `null` or `undefined` use the default.

## 66. Mental Model: Coercion Is Context-Dependent

Do not ask:

> “What does JavaScript convert this value into?”

Ask:

> “What operation is JavaScript performing, and what type does that operation require?”

For example, the same string can behave differently:

```js
"10" + 2; // "102"
"10" - 2; // 8
```

The surrounding operation determines the conversion path.

## 67. Mental Model: Explicit Conversion

Use:

```text
Input value
   ↓
Explicit conversion
   ↓
Validation
   ↓
Business logic
```

For example:

```text
"42"
 ↓
Number("42")
 ↓
42
 ↓
validate integer/range
 ↓
calculate
```

This makes data flow predictable.

## 68. Mental Model: Implicit Conversion

Implicit coercion looks more like:

```text
Operands
   ↓
Operator semantics
   ↓
Required conversion
   ↓
Operation
   ↓
Result
```

Example:

```text
"10" - 2
   ↓
ToNumber operands
   ↓
10 - 2
   ↓
8
```

Learning this flow helps with output-prediction questions.

## 69. Practice Level 1 — Recall

1. Define type coercion.
2. Define explicit conversion.
3. Define implicit coercion.
4. List all falsy values.
5. Explain truthy values.
6. Explain ToBoolean.
7. Explain ToNumber.
8. Explain ToString.
9. Explain ToPrimitive.
10. Explain `NaN`.

## 70. Practice Level 2 — Understand

11. Why is `[]` truthy?
12. Why is `{}` truthy?
13. Why does `"5" - 2` produce `3`?
14. Why does `"5" + 2` produce `"52"`?
15. Why is `null == undefined` true?
16. Why is `null === undefined` false?
17. Why does `Number("hello")` produce `NaN`?
18. Why does `Number("")` produce `0`?
19. Why does `Number("12px")` produce `NaN`?
20. Why does `parseInt("12px", 10)` produce `12`?

## 71. Practice Level 3 — Predict

Predict the result and type:

```js
"10" + 5;
"10" - 5;
true + 2;
false * 10;
null + 1;
undefined + 1;
```

Then explain every conversion.

## 72. Practice Level 4 — Apply

Build a conversion utility:

```js
function normalizeAge(input) {
  // convert and validate
}
```

Requirements:

- Return a valid non-negative integer.
- Reject invalid text.
- Reject decimals.
- Reject `Infinity`.
- Clearly separate conversion from validation.

## 73. Practice Level 5 — Debug

Find the bug:

```js
const price = input.value;
const quantity = input.quantity;
const total = price + quantity;
```

If both values are strings, the result may be concatenation rather than numeric addition.

Fix the data boundary explicitly.

## 74. Practice Level 6 — Design

Design a function that receives unknown external data and safely produces a positive integer page number.

The function should:

1. Convert appropriately.
2. Reject invalid values.
3. Reject decimals.
4. Reject negative values.
5. Reject `Infinity`.
6. Return a predictable number.

## 75. Interview Questions

- What is type coercion?
- Explicit vs implicit conversion?
- What are JavaScript's falsy values?
- Why is `[]` truthy?
- Why is `{}` truthy?
- What does `Number()` do?
- What is the difference between `Number()` and `parseInt()`?
- What is the difference between `parseInt()` and `parseFloat()`?
- Why is `typeof NaN` equal to `"number"`?
- Difference between `isNaN()` and `Number.isNaN()`?
- Difference between `isFinite()` and `Number.isFinite()`?
- Difference between `==` and `===`?
- Why is `null == undefined` true?
- Why is `null === undefined` false?
- What does `??` do?
- Difference between `||` and `??`?
- What is ToPrimitive?
- What is `Symbol.toPrimitive`?
- Why should BigInt and Number not be mixed in arithmetic?
- Why is explicit conversion useful at application boundaries?

## 76. Teach-Back Challenge

Teach another beginner these expressions without saying only the final output:

```js
"10" + 2
"10" - 2
10 == "10"
10 === "10"
Boolean([])
Boolean({})
Number("")
Number("10px")
null == undefined
0 || 100
0 ?? 100
```

For every expression, explain:

1. Operand types.
2. Operator or function involved.
3. Whether coercion happens.
4. What conversion occurs.
5. Final result.
6. Final result type.

## 77. Mini Project

Build a **JavaScript Type Conversion Playground**.

The UI should accept a value and display:

- Original input.
- `typeof` result.
- `String(value)` result.
- `Number(value)` result.
- `Boolean(value)` result.
- Whether `Number.isNaN()` is true.
- Whether `Number.isFinite()` is true.
- Selected operator experiments.

Add an explanation beside each result so the application teaches the user instead of merely printing outputs.

## 78. Final Memory Tricks

Remember:

> **Coercion = conversion caused by context.**

> **Explicit conversion = you asked for it.**

> **Implicit coercion = the operation caused it.**

> **`+` can mean addition or string concatenation.**

> **`-`, `*`, `/` generally require numeric conversion.**

> **`===` avoids the coercion behavior of `==`.**

> **`||` checks falsiness; `??` checks only nullishness.**

> **Empty arrays and objects are truthy.**

> **`NaN` is a number value, but it is not equal to itself.**

## 79. Mastery Checklist

- [ ] Define type coercion precisely.
- [ ] Distinguish explicit conversion from implicit coercion.
- [ ] Explain ToBoolean.
- [ ] List every falsy value.
- [ ] Explain why arrays and objects are truthy.
- [ ] Explain ToNumber.
- [ ] Explain ToString.
- [ ] Explain ToPrimitive at a high level.
- [ ] Explain `+` coercion.
- [ ] Explain numeric operator coercion.
- [ ] Explain `==` vs `===`.
- [ ] Explain `null` vs `undefined` equality.
- [ ] Explain `NaN`.
- [ ] Use `Number.isNaN()` correctly.
- [ ] Use `Number.isFinite()` correctly.
- [ ] Explain `Number()` vs `parseInt()`.
- [ ] Explain `||` vs `??`.
- [ ] Explain BigInt/Number restrictions.
- [ ] Predict coercion-heavy expressions.
- [ ] Debug unexpected coercion.
- [ ] Normalize external input explicitly.
- [ ] Teach the topic without notes.

## 80. Final Rule

Never learn JavaScript coercion as a collection of strange outputs.

Learn the decision process:

```text
What operation is happening?
        ↓
What are the operand types?
        ↓
Does this operation coerce?
        ↓
Which abstract conversion applies?
        ↓
What values result?
        ↓
What operation happens next?
        ↓
What is the final value and type?
```

If you can trace that process, JavaScript coercion stops being magic and becomes predictable language semantics.
