# Comments, Statements, Expressions, ASI, Identifiers, Keywords, and Literals

## 1. Why This Topic Matters
Before moving deeper into JavaScript, you need to understand the basic source-code vocabulary used by the language.

JavaScript code is not just a collection of lines. It contains tokens, expressions, statements, declarations, identifiers, literals, operators, and comments.

Understanding these concepts makes later topics such as parsing, execution, functions, modules, and debugging much easier.

## 2. Comments
Comments are source-code annotations ignored by normal JavaScript execution.

Single-line comment:

```js
// This is a comment
```

Multi-line comment:

```js
/*
  This is a
  multi-line comment.
*/
```

## 3. Why Comments Exist
Comments can explain intent, assumptions, constraints, algorithms, or non-obvious decisions.

Good comment:

```js
// API returns milliseconds, but the UI expects seconds.
const seconds = timestamp / 1000;
```

Weak comment:

```js
// Add 1 to count
count++;
```

The code already explains the operation.

## 4. Comments Are Not Documentation by Default
A comment is not automatically useful documentation.

Documentation should explain information that the code alone cannot communicate.

Public APIs, architecture decisions, invariants, and unusual constraints often deserve documentation.

## 5. TODO and FIXME
Developers commonly use markers such as:

```js
// TODO: add pagination
// FIXME: handle timeout
```

These are conventions, not JavaScript language features.

Your editor, linter, or issue tracker may search for them.

## 6. Comments and Security
Do not put secrets, passwords, tokens, API keys, or sensitive information in source comments.

Comments are part of source code and can be committed to repositories, shipped to clients, or exposed through source maps.

## 7. Statements
A statement is an instruction or declaration that participates in program execution.

Examples:

```js
let count = 0;
count++;
console.log(count);
```

JavaScript has many statement forms, including blocks, conditionals, loops, declarations, returns, throws, and expression statements.

## 8. Expressions
An expression produces a value.

Examples:

```js
2 + 3
user.name
isLoggedIn
getPrice()
```

Expressions can appear inside larger expressions.

## 9. Statement vs Expression
Consider:

```js
const total = price * quantity;
```

`price * quantity` is an expression.

The complete variable declaration is a statement.

This distinction becomes important with arrow functions, ternaries, callbacks, and APIs that expect expressions.

## 10. Expression Statements
An expression can be used as a statement:

```js
console.log("Hello");
```

The call expression is evaluated for its side effect.

Another example:

```js
x + 1;
```

This is syntactically an expression statement, although its result is discarded and therefore usually not useful.

## 11. Blocks
A block groups statements inside braces.

```js
{
  const a = 10;
  console.log(a);
}
```

Blocks are used by conditionals, loops, functions, classes, and standalone scopes.

## 12. Block Scope
`let` and `const` are block-scoped.

```js
{
  let value = 10;
}

// value is not accessible here
```

This connects source-code structure to lexical scope.

## 13. Identifiers
An identifier is a name used to identify a variable, function, class, parameter, or other binding/property-related language construct where naming is permitted.

Examples:

```js
const age = 21;
function greet() {}
class User {}
```

Here `age`, `greet`, and `User` are identifiers.

## 14. Identifier Rules
An identifier can generally contain letters, digits, `_`, and `$`, but it cannot start with a digit.

Valid:

```js
userName
_user
$count
user2
```

Invalid:

```js
2user
```

Unicode identifiers are also supported, although conventional ASCII names are usually preferred for maintainability.

## 15. Case Sensitivity
JavaScript is case-sensitive.

```js
const user = "Ravi";
const User = "Aman";
```

These are different identifiers.

Likewise:

```js
username
userName
UserName
```

are different names.

## 16. Naming Conventions
Common conventions include:

```js
const userName = "Ravi";
function getUser() {}
class UserAccount {}
```

Use camelCase for ordinary variables/functions and PascalCase for classes and constructor-like functions by convention.

## 17. Meaningful Names
Prefer:

```js
const totalPrice = 100;
```

over:

```js
const x = 100;
```

Meaningful identifiers reduce the amount of explanation required elsewhere.

## 18. Boolean Names
Boolean values are clearer with names such as:

```js
isActive
hasPermission
canEdit
shouldRetry
```

This makes conditional code read naturally.

## 19. Constants
A constant name can communicate a stable configuration value:

```js
const MAX_RETRIES = 3;
```

All-caps naming is a convention, not a JavaScript requirement.

## 20. Keywords
Keywords have special meaning in JavaScript syntax.

Examples include:

```text
const
let
var
if
else
for
while
function
return
class
extends
import
export
try
catch
throw
new
```

You cannot freely use reserved language words as binding names where the grammar prohibits them.

## 21. Reserved Words
JavaScript has words reserved for current or future language syntax in particular contexts.

Do not build naming conventions around reserved words.

Modern editors and parsers will usually provide immediate syntax feedback.

## 22. Literals
A literal is notation in source code that directly represents a value.

Examples:

```js
42
"hello"
true
null
[1, 2, 3]
{ name: "Ravi" }
```

The source notation itself represents the value or creates the corresponding literal structure.

## 23. Number Literals

```js
42
3.14
1_000_000
0xff
0b1010
0o755
```

JavaScript supports decimal, binary, octal, hexadecimal, and numeric separators.

## 24. String Literals

```js
"Hello"
'Hello'
`Hello`
```

Single and double quotes create string literals.

Template literals use backticks and support interpolation.

## 25. Template Literals

```js
const name = "Ravi";
const message = `Hello, ${name}!`;
```

`${...}` contains an expression whose result is inserted into the template string.

## 26. Boolean Literals

```js
true
false
```

These are primitive boolean values.

Do not confuse them with wrapper objects:

```js
new Boolean(false)
```

The latter creates an object and is truthy.

## 27. Null Literal

```js
null
```

`null` represents an intentional absence of an object-like value or a deliberately empty value in many APIs.

It is a primitive value even though `typeof null` historically returns `"object"`.

## 28. Undefined
`undefined` is a primitive value commonly observed when a value has not been provided.

```js
let value;
console.log(value); // undefined
```

It can also be produced by functions that return nothing explicitly.

## 29. Array Literals

```js
const numbers = [1, 2, 3];
```

This creates an Array object.

Array literal syntax can also represent sparse arrays:

```js
const sparse = [1, , 3];
```

Sparse arrays have missing elements and should not be confused with explicit `undefined` elements.

## 30. Object Literals

```js
const user = {
  name: "Ravi",
  age: 21,
};
```

Object literal syntax creates an object with specified properties.

## 31. Regular Expression Literals
JavaScript supports regex literal syntax:

```js
const pattern = /hello/i;
```

It creates a RegExp object.

Regex syntax is its own language embedded in JavaScript source.

## 32. BigInt Literals
BigInt literals use `n`:

```js
const value = 12345678901234567890n;
```

The `n` is part of the literal syntax and indicates a BigInt value.

## 33. Numeric Separators
Underscores improve readability:

```js
const budget = 1_000_000;
```

The separators do not change the numeric value.

## 34. Escape Sequences
Strings support escapes:

```js
const text = "Line 1\nLine 2";
```

Common examples include `\n`, `\t`, `\\`, `\"`, and `\'`.

## 35. Unicode Escapes
JavaScript strings support Unicode escape forms.

```js
const heart = "\u2764";
```

Code-point escape syntax is also available:

```js
const symbol = "\u{1F600}";
```

## 36. Semicolons
Semicolons can terminate statements.

```js
const name = "Ravi";
console.log(name);
```

JavaScript also has **Automatic Semicolon Insertion (ASI)**, so semicolons can often be omitted.

## 37. Automatic Semicolon Insertion
ASI is a set of grammar rules that allows certain line terminators or restricted productions to result in inserted semicolons during parsing.

It is not simply “JavaScript adds a semicolon at every newline.”

That simplified statement is inaccurate.

## 38. ASI Example

```js
const a = 10
const b = 20
```

This parses as separate declarations because the grammar permits statement termination here.

Many projects choose semicolons consistently through style conventions.

## 39. The `return` ASI Trap
This can surprise beginners:

```js
function getUser() {
  return
  {
    name: "Ravi"
  };
}
```

The line terminator after `return` causes the function to return `undefined`.

Prefer:

```js
function getUser() {
  return {
    name: "Ravi"
  };
}
```

## 40. `return` and Restricted Productions
The `return` statement has a grammar restriction involving line terminators.

Therefore formatting can affect the parsed meaning in this specific situation.

This is one reason consistent formatting matters.

## 41. `break` and `continue`
Similar restricted-production rules apply to certain statements such as `break` and `continue` when labels are involved.

Learn the grammar rule rather than assuming every newline means the same thing.

## 42. ASI and Leading Parentheses
Consider:

```js
const a = 1
(function () {
  console.log("called");
})();
```

Depending on parsing, the following expression can be interpreted as continuing the previous statement.

This can create unexpected behavior.

Using semicolons or defensive formatting avoids many such hazards.

## 43. Defensive Semicolon
Some JavaScript codebases begin certain lines with a semicolon to protect against accidental continuation:

```js
;(() => {
  console.log("safe boundary");
})();
```

Whether this is needed depends on the project's formatting conventions.

## 44. Statement Terminators Are Style Too
You can write:

```js
const a = 1;
```

or, under an ASI-compatible style:

```js
const a = 1
```

The important requirement is consistency and understanding where ASI can become dangerous.

## 45. Whitespace
Whitespace usually separates tokens and improves readability.

```js
const total = price * quantity;
```

Extra spaces normally do not change semantics.

Some whitespace characters, however, can interact with lexical grammar and should not be treated as universally interchangeable.

## 46. Line Terminators
Line terminators include newline-related characters recognized by JavaScript's lexical grammar.

Line terminators can matter in constructs such as `return`, `throw`, `break`, and `continue` because of restricted productions.

## 47. Tokens
The parser reads source code as lexical elements such as identifiers, keywords, punctuators, numeric literals, string literals, and comments/whitespace that participate in lexical grammar.

Thinking in tokens helps explain why spaces and newlines do not simply equal “execution boundaries.”

## 48. Punctuators
Examples include:

```text
{ } ( ) [ ]
. , ; :
? ??
=>
++ --
```

Punctuators help structure JavaScript syntax.

## 49. Operators
Operators perform operations or participate in expressions.

Examples:

```js
+
-
*
/
===
&&
||
??
=
```

Operators have precedence and associativity rules that affect expression parsing.

## 50. Operator Precedence
Consider:

```js
const result = 2 + 3 * 4;
```

Multiplication has higher precedence than addition, so the result is `14`.

Use parentheses when they improve clarity:

```js
const result = 2 + (3 * 4);
```

## 51. Parentheses
Parentheses can group expressions:

```js
const result = (2 + 3) * 4;
```

They can also create call expressions:

```js
fn();
```

Context determines their syntactic role.

## 52. Brackets
Square brackets can represent an array literal:

```js
const numbers = [1, 2, 3];
```

They can also perform computed property access:

```js
user["name"];
```

Same punctuation, different grammar role.

## 53. Braces
Braces can represent a block:

```js
if (ready) {
  start();
}
```

or an object literal:

```js
const user = { name: "Ravi" };
```

The surrounding syntactic context determines how braces are interpreted.

## 54. Property Names vs Identifiers
In:

```js
const user = { name: "Ravi" };
```

`name` is a property name in an object literal.

In:

```js
const name = "Ravi";
```

`name` is a binding identifier.

Do not treat every name token as the same language concept.

## 55. Computed Property Names

```js
const key = "name";

const user = {
  [key]: "Ravi",
};
```

The brackets tell JavaScript to evaluate the expression and use its result as the property key.

## 56. Reserved Words as Property Names
Property names have different grammar rules from binding identifiers.

For example, modern JavaScript allows many words that cannot be used as variable names to appear as property names.

```js
const obj = {
  class: "frontend",
};
```

The exact restriction depends on syntactic context.

## 57. Strict Mode
Strict mode changes certain JavaScript semantics and enables additional error checking.

```js
"use strict";
```

A strict-mode directive applies to the relevant script or function body.

Modules are always strict mode code.

## 58. Why Strict Mode Matters
Strict mode can prevent accidental global assignments and changes behavior of certain language features.

Example:

```js
"use strict";

x = 10; // ReferenceError
```

Without strict mode in some older script contexts, this could create an accidental global property.

## 59. Scripts vs Modules
JavaScript can execute as a classic script or as a module.

Modules have their own top-level scope and are strict by default.

Module syntax includes:

```js
export const value = 10;
import { value } from "./file.js";
```

## 60. Source Text Is Parsed Before Normal Execution
A simplified pipeline is:

```text
Source code
   ↓
Lexical analysis
   ↓
Parsing
   ↓
Executable program representation
   ↓
Execution by JavaScript runtime
```

Actual engines may perform additional compilation, interpretation, optimization, and deoptimization stages.

## 61. Syntax Errors
A syntax error means the source cannot be parsed according to the grammar.

Example:

```js
const = 10;
```

The parser cannot interpret this as a valid declaration.

Syntax errors generally prevent that script/module from successfully evaluating.

## 62. Runtime Errors
Code can parse successfully and still fail during execution.

```js
const user = null;
console.log(user.name);
```

This produces a runtime TypeError.

Syntax correctness and runtime correctness are different concerns.

## 63. Logical Errors
A program can parse and execute without throwing but still produce the wrong result.

```js
const total = price - quantity;
```

If addition was intended, this is a logical error.

## 64. Debugging Source Structure
When debugging syntax, ask:

```text
Are tokens valid?
Are delimiters balanced?
Is the keyword legal here?
Is the expression complete?
Is the statement allowed in this context?
```

This is more useful than randomly changing punctuation.

## 65. Common Delimiter Mistakes
Check matching:

```text
( )
[ ]
{ }
```

An unmatched delimiter often produces a syntax error at a location that appears unrelated to the real mistake.

## 66. Comments Can Hide Code
Commenting out part of an expression can accidentally change syntax.

Always check whether the remaining source still forms a valid statement or expression.

## 67. Comments and Template Literals
A comment marker inside a string is just string data:

```js
const url = "https://example.com";
```

The `//` does not start a comment inside the string literal.

Likewise, comment syntax inside a template literal is text unless interpreted through an embedded expression.

## 68. Literals vs Variables

```js
const age = 21;
```

`21` is a numeric literal.

`age` is an identifier referring to a binding.

The identifier does not itself contain the value `21`; it names the binding that currently holds that value.

## 69. Literal Evaluation
A literal in source code contributes a value according to JavaScript grammar.

```js
const name = "Ravi";
```

The string literal represents the string value `"Ravi"`.

Object and array literals create object values when evaluated.

## 70. `new` Is Not a Literal

```js
new Date()
```

is an expression involving a constructor call.

It is not a Date literal in the same sense that `42` is a numeric literal.

This distinction becomes useful when studying built-in objects and constructors.

## 71. Regular Expression Literal vs Constructor

```js
const a = /abc/;
const b = new RegExp("abc");
```

Both create RegExp objects, but one uses literal syntax and the other uses a constructor call.

## 72. Comments and Tooling
Linters, formatters, documentation generators, and IDEs can interpret comments according to their own conventions.

JSDoc-style comments are commonly used for tooling:

```js
/**
 * Adds two numbers.
 */
function add(a, b) {
  return a + b;
}
```

JSDoc is a documentation convention, not the JavaScript execution model itself.

## 73. Best Practices

- Use comments to explain intent.
- Keep names meaningful.
- Use consistent semicolon style.
- Use a formatter.
- Use a linter.
- Avoid unnecessary comments.
- Understand ASI even if your formatter adds semicolons.
- Use braces consistently.
- Learn the difference between statements and expressions.
- Recognize literals and identifiers quickly.

## 74. Practice — Recall

1. What is a comment?
2. What is a statement?
3. What is an expression?
4. What is an identifier?
5. What is a keyword?
6. What is a literal?
7. What is ASI?
8. What is strict mode?
9. What is a block?
10. What is a syntax error?

## 75. Practice — Understand

11. Why is `return` followed by a newline dangerous?
12. Why are meaningful names useful?
13. Why is `for...of` unrelated to identifier naming but related to syntax grammar?
14. Why can `{}` represent different things depending on context?
15. Why are comments ignored by normal execution?
16. Why is `new Date()` not a Date literal?
17. Why is `typeof null` historically `"object"`?
18. Why are modules strict by default?
19. Why does ASI not simply mean “newline equals semicolon”?
20. Why should comments avoid secrets?

## 76. Practice — Predict
Explain the result:

```js
function test() {
  return
  {
    value: 10
  };
}

console.log(test());
```

Then rewrite it correctly.

## 77. Practice — Debug
Find and fix the syntax problems:

```js
const user = {
  name: "Ravi",
  age: 21,

function greet() {
  console.log("Hello");
}
```

Identify missing delimiters and explain why the parser rejects the source.

## 78. Teach-Back Challenge
Teach a beginner the difference between:

```text
comment
keyword
identifier
literal
expression
statement
block
operator
punctuator
```

Use one short JavaScript program and label each part.

## 79. Mini Project
Create a **JavaScript Syntax Playground** containing examples of:

- identifiers
- literals
- expressions
- statements
- blocks
- comments
- operators
- ASI examples
- strict mode
- syntax errors

For each example, write one sentence explaining what the parser is expected to recognize.

## 80. Mastery Checklist

- [ ] Explain comments.
- [ ] Write single-line and multi-line comments.
- [ ] Explain statements.
- [ ] Explain expressions.
- [ ] Distinguish statements from expressions.
- [ ] Explain blocks.
- [ ] Explain identifiers.
- [ ] Apply identifier naming rules.
- [ ] Recognize keywords.
- [ ] Recognize literals.
- [ ] Explain number/string/object/array literals.
- [ ] Explain escape sequences.
- [ ] Explain semicolons.
- [ ] Explain ASI accurately.
- [ ] Explain the `return` newline trap.
- [ ] Explain tokens at a high level.
- [ ] Explain operators and punctuators.
- [ ] Explain syntax vs runtime vs logic errors.
- [ ] Explain strict mode.
- [ ] Understand script vs module basics.
- [ ] Debug syntax using source structure.
- [ ] Teach these concepts confidently.

## Final Mental Model

```text
Source Text
   ↓
Tokens / Lexical Grammar
   ↓
Parser
   ↓
Statements + Expressions
   ↓
Runtime Evaluation
   ↓
Values + Side Effects
```

JavaScript becomes much easier to reason about when you stop seeing source code as random lines and start seeing it as a structured language with a grammar, expressions, statements, bindings, values, and execution rules.
