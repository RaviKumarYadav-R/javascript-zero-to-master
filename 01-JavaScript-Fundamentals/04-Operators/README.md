# Operators in JavaScript

## 1. What is an operator?

An operator is syntax that performs an operation on one or more operands.

An operand is the value an operator works with.

```js
10 + 20
```

`+` is the operator.

`10` and `20` are operands.

Operators can produce values, change bindings, compare values, or control evaluation.

## 2. Assignment operators

The basic assignment operator is `=`.

```js
let score = 10;
score = 20;
```

The right-hand side is evaluated first.

The resulting value is assigned to the left-hand binding.

Compound assignments include `+=`, `-=`, `*=`, `/=`, and `%=`.

```js
let count = 10;
count += 5;
```

This means approximately `count = count + 5`.

Other compound operators include `**=`, `&&=`, `||=`, and `??=`.

## 3. Arithmetic operators

Arithmetic operators perform numeric operations.

```js
10 + 5;
10 - 5;
10 * 5;
10 / 5;
10 % 3;
2 ** 3;
```

`%` gives the remainder.

`**` performs exponentiation.

Arithmetic may involve coercion when operands are not numbers.

The `+` operator has special string concatenation behavior.

## 4. Addition and concatenation

`+` can perform numeric addition or string concatenation.

```js
2 + 3; // 5
"2" + 3; // "23"
```

When string concatenation rules apply, operands can be converted to strings.

Do not assume `+` always means numeric addition.

This topic connects directly to type coercion.

## 5. Unary operators

Unary operators operate on one operand.

Examples include unary plus, unary minus, `typeof`, and `delete`.

```js
const value = "42";
+value; // 42
```

Unary plus converts its operand using numeric conversion rules.

```js
-10;
```

Unary minus produces the numeric negative of the converted value.

## 6. Increment and decrement

`++` increments a numeric value.

`--` decrements it.

Both have prefix and postfix forms.

```js
let count = 5;
count++;
++count;
```

The key difference is the value produced by the expression.

```js
let x = 5;
const a = x++;
```

`a` receives the old value while `x` becomes `6`.

```js
let y = 5;
const b = ++y;
```

`b` receives the incremented value `6`.

## 7. Comparison operators

Comparison operators produce booleans.

```js
10 > 5;
10 < 5;
10 >= 10;
5 <= 10;
```

They answer relational questions.

The result is either `true` or `false`.

## 8. Equality

JavaScript provides strict and loose equality.

Strict equality is `===`.

Loose equality is `==`.

```js
10 === 10; // true
10 === "10"; // false
```

Strict equality does not perform the same coercion behavior as loose equality.

```js
10 == "10"; // true
```

Loose equality follows a defined coercion algorithm.

For predictable application code, prefer `===` unless you intentionally need `==` semantics.

## 9. Inequality

Strict inequality is `!==`.

Loose inequality is `!=`.

```js
10 !== "10"; // true
10 != "10"; // false
```

Use strict inequality by default.

## 10. Logical AND

`&&` is logical AND.

It can return an operand rather than a boolean.

```js
const result = "hello" && 42;
```

The result is `42`.

JavaScript evaluates left to right and short-circuits when possible.

If the left operand is falsy, the right operand is not evaluated.

This makes `&&` useful for conditional evaluation.

## 11. Logical OR

`||` is logical OR.

It also returns an operand.

```js
const result = "" || "fallback";
```

The result is `"fallback"`.

If the left operand is truthy, JavaScript returns it without evaluating the right operand.

Do not confuse `||` with a Boolean-only operation.

## 12. Nullish coalescing

`??` returns the right operand only when the left operand is `null` or `undefined`.

```js
const name = null ?? "Guest";
```

The result is `"Guest"`.

Unlike `||`, values such as `0`, `false`, and `""` are not treated as missing.

```js
0 ?? 100; // 0
0 || 100; // 100
```

Use `??` when only nullish values should trigger a fallback.

## 13. Optional chaining

`?.` safely accesses a property or calls a method when the preceding value is nullish.

```js
const city = user?.address?.city;
```

If `user` or `address` is `null` or `undefined`, the expression produces `undefined` instead of throwing for that access chain.

Optional chaining is not a replacement for validating all application state.

## 14. Ternary operator

The conditional operator is written `condition ? valueIfTrue : valueIfFalse`.

```js
const status = age >= 18 ? "adult" : "minor";
```

It is an expression.

It produces a value.

Avoid deeply nested ternaries because readability can collapse quickly.

## 15. `typeof`

`typeof` returns a string describing the type category of its operand.

```js
typeof 42; // "number"
typeof "hello"; // "string"
typeof true; // "boolean"
```

Remember the historical special case:

```js
typeof null; // "object"
```

For arrays use `Array.isArray()`.

## 16. `delete`

`delete` attempts to remove an object property.

```js
const user = { name: "Ravi", age: 21 };
delete user.age;
```

It does not mean “free this object from memory”.

Garbage collection is a separate runtime concern.

Deleting properties can also have performance implications in some engines, so use it deliberately.

## 17. `in`

The `in` operator checks whether a property key exists in an object or anywhere in its prototype chain.

```js
const user = { name: "Ravi" };
"name" in user; // true
```

It is not the same as checking only own properties.

For own-property checks, `Object.hasOwn(object, key)` is often clearer.

## 18. `instanceof`

`instanceof` tests whether a constructor's prototype occurs in an object's prototype chain.

```js
[] instanceof Array; // true
```

It is not a general-purpose type test for every value.

Cross-realm objects can make naive `instanceof` assumptions fail.

## 19. Bitwise operators

JavaScript provides bitwise operators such as `&`, `|`, `^`, `~`, `<<`, `>>`, and `>>>`.

They operate using integer-oriented bit representations.

```js
5 & 1; // 1
```

Bitwise operations are useful for specific low-level algorithms, flags, and binary manipulation.

Do not use them merely because they look shorter than ordinary arithmetic or logical operations.

## 20. Precedence

Operator precedence determines grouping when expressions contain multiple operators.

```js
2 + 3 * 4;
```

Multiplication binds more tightly than addition, so the conceptual grouping is:

```js
2 + (3 * 4)
```

Use parentheses when they improve clarity.

Do not rely on memorizing every precedence level.

## 21. Associativity

Associativity determines how operators of similar precedence group.

Some operators associate left-to-right.

Some, such as exponentiation, have different grouping behavior.

When an expression is difficult to read, use explicit parentheses.

Readable code is preferable to clever precedence puzzles.

## 22. Short-circuit evaluation

Logical operators can stop evaluation early.

```js
false && doSomething();
```

`doSomething()` is not evaluated because the left operand is already falsy.

Similarly:

```js
true || doSomething();
```

The right side is skipped.

This is both a performance and control-flow concept.

## 23. Nullish assignment

`??=` assigns only when the current value is nullish.

```js
let name;
name ??= "Guest";
```

If `name` is already `"Ravi"`, it remains `"Ravi"`.

This differs from `||=` because falsy values are preserved by nullish logic.

## 24. Logical assignment

`&&=` and `||=` combine logical evaluation with assignment.

```js
let enabled = true;
enabled &&= false;
```

The assignment occurs according to the operator's short-circuit semantics.

Learn these after mastering ordinary logical operators.

## 25. Evaluation order

JavaScript generally evaluates expression operands according to defined evaluation rules, commonly left to right for many operators.

Side effects can make evaluation order observable.

```js
let x = 0;
function next() {
  x += 1;
  return x;
}

next() + next();
```

Do not write expressions with unnecessary side effects when a simple sequence of statements is clearer.

## 26. Common mistakes

Do not use `=` when you mean comparison.

Do not assume `==` and `===` are equivalent.

Do not assume `&&` and `||` return booleans.

Do not confuse `??` with `||`.

Do not forget that `typeof null` is `"object"`.

Do not use `delete` as a garbage-collection command.

Do not rely on obscure precedence when parentheses clarify intent.

Do not assume `in` checks only own properties.

Do not assume `instanceof` checks an object's complete semantic type.

## 27. Practice ladder

### Beginner

1. Calculate a total using `+`.
2. Calculate a remainder using `%`.
3. Compare two numbers.
4. Use `===`.
5. Write a ternary expression.

### Intermediate

6. Explain `0 || 100`.
7. Explain `0 ?? 100`.
8. Predict `false && fn()`.
9. Predict `true || fn()`.
10. Use optional chaining.

### Advanced

11. Trace a mixed-precedence expression.
12. Explain postfix vs prefix increment.
13. Explain `in` vs `Object.hasOwn()`.
14. Explain `instanceof` using prototype chains.
15. Refactor an unreadable expression using parentheses.

## 28. Teach-back questions

- What is an operand?
- What does an operator produce?
- Difference between `=` and `===`?
- Difference between `==` and `===`?
- Why can `&&` return an operand?
- Why can `||` return an operand?
- When should `??` be preferred over `||`?
- What does optional chaining do?
- Why is ternary an expression?
- What does `typeof` return?
- What does `delete` do?
- What does `in` check?
- What does `instanceof` check?
- What is short-circuit evaluation?
- What are precedence and associativity?

## 29. Mastery checklist

- [ ] Assignment operators.
- [ ] Arithmetic operators.
- [ ] Unary operators.
- [ ] Increment/decrement.
- [ ] Relational comparisons.
- [ ] Strict and loose equality.
- [ ] Logical operators.
- [ ] Nullish coalescing.
- [ ] Optional chaining.
- [ ] Ternary operator.
- [ ] `typeof`.
- [ ] `delete`.
- [ ] `in`.
- [ ] `instanceof`.
- [ ] Bitwise operators.
- [ ] Precedence.
- [ ] Associativity.
- [ ] Short-circuiting.
- [ ] Logical/nullish assignment.
- [ ] Output prediction.
- [ ] Teach the topic without notes.
