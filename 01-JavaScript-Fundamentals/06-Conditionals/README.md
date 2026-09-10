# Conditionals in JavaScript

## 1. Definition
Conditionals allow a program to choose different execution paths based on a condition.

```js
if (age >= 18) {
  console.log("Adult");
}
```

The condition is evaluated for truthiness, and the block runs only when the condition is truthy.

## 2. Why Conditionals Exist
Programs need decisions: authentication, validation, permissions, UI states, pricing, game rules, and error handling all depend on conditions.

## 3. `if`

```js
if (condition) {
  // runs when condition is truthy
}
```

The parentheses contain an expression. The braces contain a statement block.

## 4. Boolean Evaluation
The condition does not have to literally be a boolean.

```js
if ("Ravi") console.log("yes");
if (0) console.log("no");
```

JavaScript applies ToBoolean to the condition.

## 5. `if...else`

```js
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
```

Exactly one branch executes in this two-way structure.

## 6. `else if`
Use `else if` when several mutually exclusive conditions must be checked.

```js
if (score >= 90) {
  grade = "A";
} else if (score >= 75) {
  grade = "B";
} else {
  grade = "C";
}
```

Conditions are evaluated from top to bottom. The first matching branch wins.

## 7. Order Matters

```js
if (score >= 50) {
  console.log("Pass");
} else if (score >= 90) {
  console.log("Excellent");
}
```

The second condition is unreachable for scores `90+` because the first condition already matched.

Put more specific conditions before broader conditions when necessary.

## 8. Nested `if`
An `if` can appear inside another `if`.

```js
if (isLoggedIn) {
  if (isAdmin) {
    console.log("Admin panel");
  }
}
```

Nested conditions are useful but excessive nesting can make control flow difficult to read.

## 9. Compound Conditions
Use logical operators to combine conditions.

```js
if (age >= 18 && hasId) {
  console.log("Allowed");
}
```

`&&` requires both sides to be truthy.

## 10. OR Conditions

```js
if (role === "admin" || role === "owner") {
  console.log("Privileged");
}
```

`||` succeeds when at least one operand is truthy.

## 11. NOT

```js
if (!isBlocked) {
  console.log("Continue");
}
```

`!` converts its operand to boolean and negates it.

## 12. Strict Comparison
Prefer explicit strict comparisons for predictable logic.

```js
if (status === "active") {
  // ...
}
```

Avoid relying on loose equality in important business rules.

## 13. Relational Operators

```js
age >= 18
price < 100
score > 0
count <= 10
```

These expressions produce booleans and can directly control branches.

## 14. Equality

```js
if (userId === requestedId) {
  // same value and type
}
```

Remember that `===` does not perform the loose-equality coercion associated with `==`.

## 15. Ternary Operator
A ternary is an expression with three parts.

```js
const message = age >= 18 ? "Adult" : "Minor";
```

Structure:

```text
condition ? valueIfTrue : valueIfFalse
```

## 16. Ternary Returns a Value
Unlike an `if` statement, a ternary can directly produce a value.

```js
const max = a > b ? a : b;
```

This is useful for short value-selection logic.

## 17. Avoid Deep Ternaries
This is hard to read:

```js
const x = a ? b : c ? d : e ? f : g;
```

Use `if...else` or a clearer strategy when multiple decisions are involved.

## 18. `switch`
Use `switch` when comparing one expression against several fixed cases.

```js
switch (role) {
  case "admin":
    console.log("Admin");
    break;
  case "user":
    console.log("User");
    break;
  default:
    console.log("Unknown");
}
```

## 19. `case` Matching
`switch` case matching uses strict-equality semantics.

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

The string case matches.

## 20. `break`
Without `break`, execution can continue into later cases.

```js
switch (day) {
  case "Sat":
  case "Sun":
    console.log("Weekend");
    break;
  default:
    console.log("Weekday");
}
```

Intentional fallthrough can combine cases.

## 21. `default`
`default` runs when no case matches.

```js
switch (command) {
  case "start":
    start();
    break;
  default:
    showHelp();
}
```

It is optional but useful for unexpected values.

## 22. Truthy/Falsy in Conditions
Falsy values include `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`.

Everything else is truthy, including `[]` and `{}`.

## 23. Common Validation Pattern

```js
if (!username) {
  console.log("Username required");
}
```

This checks falsiness, not specifically whether a value is missing.

If `0` or `false` are valid values, use a more precise condition.

## 24. Nullish Checks

```js
if (value == null) {
  // null or undefined
}
```

This is one case where intentional `==` can be useful because it groups only `null` and `undefined`.

Alternatively, be explicit:

```js
if (value === null || value === undefined) {
  // ...
}
```

## 25. Short-Circuiting
Conditions can stop evaluating once the result is known.

```js
if (user && user.isAdmin) {
  // ...
}
```

If `user` is falsy, the second operand is not evaluated.

## 26. Optional Chaining in Conditions

```js
if (user?.profile?.isPublic) {
  console.log("Public profile");
}
```

Optional chaining prevents property-access errors when an intermediate value is nullish.

## 27. `??` in Decision Logic

```js
const limit = userLimit ?? 10;
```

Unlike `||`, it preserves valid falsy values such as `0`.

## 28. Multiple Independent `if`s
These are different from an `if...else if` chain.

```js
if (isAdmin) console.log("admin");
if (isLoggedIn) console.log("logged in");
```

Both can execute.

With `else if`, only the first matching branch executes.

## 29. Guard Clauses
A guard clause exits early when a requirement is not met.

```js
function createPost(user) {
  if (!user) return;
  if (!user.canPost) return;

  console.log("Create post");
}
```

Guard clauses can reduce nested indentation.

## 30. Positive Conditions
Prefer conditions whose meaning is immediately clear.

```js
if (isActive) {
  // ...
}
```

A long chain of negations can make logic harder to verify.

## 31. De Morgan's Laws
These equivalent forms are useful:

```js
!(a && b)
```

is equivalent to:

```js
!a || !b
```

And:

```js
!(a || b)
```

is equivalent to:

```js
!a && !b
```

## 32. Parentheses Improve Logic
Even when operator precedence is known, parentheses can communicate intent.

```js
if ((isAdmin || isOwner) && isActive) {
  // allowed
}
```

Do not rely on readers remembering every precedence rule.

## 33. Assignment Mistake
This is usually a bug:

```js
if (status = "active") {
  // assignment happened
}
```

Use:

```js
if (status === "active") {
  // comparison
}
```

Linting can catch many accidental assignments in conditions.

## 34. Comparison Mistake
Do not confuse:

```js
if (age = 18)
```

with:

```js
if (age === 18)
```

The first assigns; the second compares.

## 35. Dangling `else`
Braces prevent ambiguity and accidental association.

Prefer:

```js
if (loggedIn) {
  if (admin) {
    showAdmin();
  }
} else {
  showLogin();
}
```

Always using braces is a strong maintainability practice.

## 36. Conditions Are Expressions
A condition can contain function calls and calculations.

```js
if (isValidEmail(email)) {
  submit();
}
```

Keep complex logic in named functions when that improves readability.

## 37. Extract Complex Conditions
Instead of:

```js
if (age >= 18 && verified && !blocked && plan === "pro") {
  // ...
}
```

consider:

```js
const canAccess = age >= 18 && verified && !blocked && plan === "pro";

if (canAccess) {
  // ...
}
```

A well-named boolean can explain intent.

## 38. Boolean Naming
Useful names often start with:

```text
is...
has...
can...
should...
```

Examples:

```js
const isActive = true;
const hasPermission = false;
const canEdit = true;
```

## 39. Numeric Range

```js
if (score >= 0 && score <= 100) {
  console.log("Valid score");
}
```

This expresses both boundaries explicitly.

## 40. Exclusive Range
For an exclusive upper bound:

```js
if (index >= 0 && index < array.length) {
  // valid index
}
```

This pattern is fundamental for array indexing.

## 41. Menu Example

```js
if (choice === 1) {
  startGame();
} else if (choice === 2) {
  showRules();
} else if (choice === 3) {
  exitGame();
} else {
  console.log("Invalid choice");
}
```

This is straightforward for a small number of branches.

## 42. When `switch` Is Better
When many cases compare the same value against constants, `switch` can be easier to scan.

When conditions involve ranges or unrelated expressions, `if...else` is usually more natural.

## 43. When a Lookup Is Better
Large fixed mappings can often be represented as data:

```js
const prices = {
  basic: 10,
  pro: 20,
  premium: 30,
};

const price = prices[plan];
```

Not every decision needs a giant conditional.

## 44. Conditional Logic vs Data
Ask:

> Is this really a decision, or is it a lookup table?

This question can simplify code dramatically.

## 45. Early Return

```js
function save(data) {
  if (!data) return;
  if (!isValid(data)) return;

  persist(data);
}
```

This keeps the main path less nested.

## 46. Error Conditions First
For validation-heavy functions, reject invalid states early.

```js
if (!email) return "Email required";
if (!email.includes("@")) return "Invalid email";
```

Then perform the successful operation.

## 47. Business Rules
Conditions should represent domain rules clearly.

```js
const canRefund = order.paid && !order.refunded && withinRefundWindow;
```

Naming business rules improves readability and testing.

## 48. Avoid Magic Numbers
Instead of:

```js
if (age >= 18) {
```

consider:

```js
const MINIMUM_ADULT_AGE = 18;

if (age >= MINIMUM_ADULT_AGE) {
```

This is particularly useful when rules are reused.

## 49. Nested Ternary Alternative
Instead of nested ternaries, use a function:

```js
function getLabel(score) {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  return "C";
}
```

The control flow is much easier to debug.

## 50. `switch(true)` Awareness
You may encounter:

```js
switch (true) {
  case score >= 90:
    grade = "A";
    break;
  case score >= 75:
    grade = "B";
    break;
}
```

It works because each case expression is compared against `true`.

However, ordinary `if...else` is usually clearer for range conditions.

## 51. Common Mistake: `if (x === 1 || 2)`
This is wrong:

```js
if (x === 1 || 2) {
```

The `2` is truthy, so the condition is effectively always truthy.

Correct:

```js
if (x === 1 || x === 2) {
```

## 52. Common Mistake: `if (x === (1 || 2))`
This does not mean “x equals 1 or 2.”

`(1 || 2)` evaluates to `1`.

Correctly repeat the comparison:

```js
x === 1 || x === 2
```

## 53. Common Mistake: Array Membership
Do not write:

```js
if (role === "admin" || "owner") {
```

Use:

```js
if (role === "admin" || role === "owner") {
```

Or:

```js
if (["admin", "owner"].includes(role)) {
```

## 54. Common Mistake: Truthiness for Numbers

```js
if (count) {
```

This treats `0` as false.

If zero is a valid state and you mean “defined,” use a precise condition such as:

```js
if (count !== undefined) {
```

## 55. Common Mistake: Truthiness for Objects

```js
if (items) {
```

An empty array is truthy.

To test contents:

```js
if (items.length > 0) {
```

## 56. Common Mistake: `else` Without Braces
Although JavaScript permits one statement without braces, braces are safer:

```js
if (loggedIn) {
  showDashboard();
}
```

They prevent later indentation changes from changing which statement belongs to the branch.

## 57. Common Mistake: Accidental Fallthrough

```js
switch (role) {
  case "admin":
    showAdmin();
  case "user":
    showUser();
}
```

Admin users reach the user case too.

Add `break` unless fallthrough is intentional.

## 58. Debugging Conditional Logic
When a branch behaves unexpectedly, log the actual inputs and subconditions.

```js
console.log({ age, verified, blocked });
console.log(age >= 18, verified, !blocked);
```

Break a compound condition into named variables when necessary.

## 59. Truth Table Thinking
For:

```js
A && B
```

both must be truthy.

For:

```js
A || B
```

at least one must be truthy.

For:

```js
!A
```

truthiness is inverted.

Truth tables are valuable when debugging complex boolean expressions.

## 60. Execution Flow

```text
Start
  ↓
Evaluate condition
  ↓
Truthy?
 ┌───────┴───────┐
Yes             No
 ↓                ↓
Run if block    Skip / else
 ↓                ↓
Continue         Continue
```

For `else if`, JavaScript tests each condition until one matches.

## 61. Condition Evaluation Is Sequential
For:

```js
if (a) {}
else if (b) {}
else if (c) {}
else {}
```

`a` is checked first, then `b`, then `c` only when previous conditions were falsy.

This matters when conditions contain function calls or other side effects.

## 62. Avoid Side Effects in Conditions
This is confusing:

```js
if (items.pop()) {
  // array was mutated during the check
}
```

Prefer separating mutation from decision logic when possible.

## 63. Function Calls in Conditions
A predicate function can make business logic readable:

```js
if (isEligible(user)) {
  approve(user);
}
```

A predicate conventionally answers a yes/no question.

## 64. Predicate Functions
Examples:

```js
function isAdult(age) {
  return age >= 18;
}

function hasAccess(user) {
  return user?.role === "admin";
}
```

This makes rules reusable and testable.

## 65. Browser Example

```js
const button = document.querySelector("#submit");

button.addEventListener("click", () => {
  const email = document.querySelector("#email").value;

  if (!email) {
    console.log("Email required");
    return;
  }

  console.log("Submit");
});
```

Conditional logic controls the UI flow.

## 66. Node.js Example

```js
function authorize(user) {
  if (!user) return false;
  if (user.role !== "admin") return false;
  return true;
}
```

The same JavaScript conditional semantics apply in Node.js.

## 67. Security
Authorization should use explicit server-side conditions.

Never rely on a browser-only condition to protect a privileged API.

For example:

```js
if (user.role !== "admin") {
  throw new Error("Forbidden");
}
```

The backend must enforce the rule.

## 68. Performance
Most simple conditionals are extremely cheap.

Do not optimize an `if` statement before profiling.

Optimize expensive work performed inside branches, not the syntax itself.

## 69. Maintainability
Good conditional code has:

- clear names
- simple predicates
- shallow nesting
- explicit comparisons
- grouped business rules
- predictable fallthrough behavior

## 70. Refactoring Example
Before:

```js
if (user) {
  if (user.active) {
    if (user.role === "admin") {
      showPanel();
    }
  }
}
```

After:

```js
if (!user) return;
if (!user.active) return;
if (user.role !== "admin") return;

showPanel();
```

Guard clauses flatten the control flow.

## 71. Practice — Recall

1. What is a conditional?
2. What does `if` do?
3. What does `else` do?
4. What does `else if` do?
5. What is a nested condition?
6. What is a ternary?
7. What is `switch`?
8. What does `break` do in a switch?
9. What does `default` do?
10. What are truthy and falsy values?

## 72. Practice — Understand

11. Why is `if ([])` true?
12. Why does `else if` stop after the first match?
13. Why does `switch` use strict case matching?
14. Why can multiple independent `if`s all execute?
15. Why is `x === 1 || 2` wrong?
16. Why does `0` cause `if (0)` to skip the branch?
17. Why does `??` differ from `||`?
18. Why do guard clauses reduce nesting?
19. When is `switch` clearer than `if`?
20. When is a lookup object better than conditionals?

## 73. Practice — Predict
Predict the output:

```js
const score = 80;

if (score >= 90) {
  console.log("A");
} else if (score >= 75) {
  console.log("B");
} else {
  console.log("C");
}
```

Then explain why only one branch runs.

## 74. Practice — Debug
Fix:

```js
function checkRole(role) {
  if (role === "admin" || "owner") {
    return "allowed";
  }
  return "denied";
}
```

Expected behavior: only `admin` and `owner` should be allowed.

## 75. Practice — Apply
Build:

```js
function getGrade(score) {
  // A: 90-100
  // B: 80-89
  // C: 70-79
  // D: 60-69
  // F: below 60
}
```

Also reject scores outside `0..100`.

## 76. Practice — Design
Design an authorization decision with:

- logged-in state
- account active state
- role
- permission
- resource ownership

Keep the decision readable and testable.

## 77. Interview Questions

- What is truthiness?
- List all falsy values.
- Difference between `if` and ternary?
- Difference between independent `if`s and `else if`?
- How does `switch` match cases?
- What is fallthrough?
- Why is `break` important?
- What is a guard clause?
- What are De Morgan's laws?
- Why is `if (x === 1 || 2)` wrong?
- Why are empty arrays truthy?
- When should you use `switch`?
- When should you use a lookup object?
- Why avoid deeply nested conditions?

## 78. Teach-Back Challenge
Teach another beginner this flow without looking at notes:

```text
Input
 ↓
Condition
 ↓
Truthiness / comparison
 ↓
Choose branch
 ↓
Execute statements
 ↓
Continue program
```

Then explain `if`, `else if`, `else`, ternary, and `switch` using one real-world example.

## 79. Mini Project
Build a **Rule-Based Access Checker**.

Inputs:

- username
- age
- login state
- account state
- role
- verification state
- resource ownership

Output:

- allowed/denied
- exact reason

Implement the rules first with `if...else`, then refactor repeated predicates into named functions.

## 80. Mastery Checklist

- [ ] Explain `if`.
- [ ] Explain `else`.
- [ ] Explain `else if`.
- [ ] Explain nested conditions.
- [ ] Use `&&`, `||`, and `!` correctly.
- [ ] Explain truthy/falsy conditions.
- [ ] Use strict equality.
- [ ] Explain ternary expressions.
- [ ] Use `switch` correctly.
- [ ] Explain fallthrough.
- [ ] Use `break` correctly.
- [ ] Explain `default`.
- [ ] Write guard clauses.
- [ ] Apply De Morgan's laws.
- [ ] Avoid common boolean-expression mistakes.
- [ ] Debug compound conditions.
- [ ] Extract complex predicates.
- [ ] Choose between conditional, switch, and lookup data.
- [ ] Implement real business rules.
- [ ] Teach the topic confidently.

## Final Mental Model

```text
Condition
   ↓
Evaluate expression
   ↓
Determine truthiness / comparison result
   ↓
Choose execution path
   ↓
Run selected statements
   ↓
Continue program
```

Conditionals are not just syntax. They are the control-flow decisions that turn raw values into program behavior.
