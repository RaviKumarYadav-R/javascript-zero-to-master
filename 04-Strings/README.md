# Strings in JavaScript

> Beginner-to-master notes for text, Unicode, UTF-16, searching, slicing, replacement, templates, regex interaction, debugging, and string algorithms.

## 1. Definition
A JavaScript string is a primitive value representing a sequence of UTF-16 code units.

```js
const name = "Ravi";
console.log(name);
```

A string is not an array, although it supports indexed access and iteration.

## 2. Why Strings Exist
Strings represent names, messages, labels, URLs, JSON text, identifiers, user input, and other textual data.

## 3. Mental Model
```text
String value
    ↓
UTF-16 code units
    ↓
indexed access / iteration / methods
    ↓
new string/result
```
Strings are immutable.

## 4. String Literals
```js
const a = "hello";
const b = 'hello';
const c = `hello`;
```

## 5. Quote Choice
Single and double quotes both create strings. Choose a consistent style and escape embedded delimiters when necessary.

```js
const message = "It's useful";
const quote = 'He said "hello"';
```

## 6. Escape Sequences
```js
console.log("line1\nline2");
console.log("tab\tvalue");
console.log("backslash: \\");
```
Common escapes include `\n`, `\t`, `\r`, `\\`, `\'`, and `\"`.

## 7. Unicode Escapes
```js
const heart = "\u2764";
const emoji = "\u{1F600}";
```
The braced form represents a Unicode code point and can represent values beyond U+FFFF.

## 8. Template Literals
```js
const message = `Hello JavaScript`;
```
Backticks support interpolation and multiline strings.

## 9. Interpolation
```js
const name = "Ravi";
const age = 21;
const message = `My name is ${name} and I am ${age}.`;
```
Expressions inside `${...}` are evaluated and converted to text.

## 10. Multiline Strings
```js
const text = `line one
line two
line three`;
```
Template literals preserve the line breaks represented in the literal.

## 11. Explicit Conversion
```js
const value = String(123);
console.log(typeof value); // string
```
Prefer `String(value)` over wrapper objects for ordinary conversion.

## 12. Wrapper Object Warning
```js
console.log(typeof "hello"); // string
console.log(typeof new String("hello")); // object
```
Avoid `new String()`, `new Number()`, and `new Boolean()` in normal application code.

## 13. `typeof`
```js
console.log(typeof "Ravi"); // "string"
```
A primitive string has `typeof` equal to `"string"`.

## 14. Length
```js
const word = "JavaScript";
console.log(word.length);
```
`length` counts UTF-16 code units, not necessarily user-perceived characters.

## 15. Empty String
```js
const value = "";
console.log(value.length); // 0
```

## 16. Indexing
```js
const word = "Hello";
console.log(word[0]); // H
console.log(word[4]); // o
```
Indexes begin at zero.

## 17. Out-of-Range Access
```js
console.log("Hello"[99]); // undefined
```

## 18. `at()`
```js
console.log("Hello".at(0));  // H
console.log("Hello".at(-1)); // o
```
Negative indexes count from the end.

## 19. Bracket Access vs `at`
```js
word[word.length - 1];
word.at(-1);
```
`at(-1)` is concise for the last code unit/code point according to the method's string indexing semantics.

## 20. Immutability
String methods do not modify the original string.

```js
let name = "ravi";
name.toUpperCase();
console.log(name); // ravi
```

## 21. Reassignment
```js
let name = "ravi";
name = name.toUpperCase();
console.log(name); // RAVI
```
The binding is reassigned to a resulting string.

## 22. Indexed Mutation
```js
const word = "hello";
// word[0] = "H";
```
Strings do not support array-style element mutation.

## 23. Concatenation
```js
const first = "Hello";
const second = "World";
console.log(first + " " + second);
```
The `+` operator concatenates when string conversion rules apply.

## 24. `concat()`
```js
const result = "Hello".concat(" ", "World");
```
It returns a new string. `+` and templates are often clearer for ordinary concatenation.

## 25. String Coercion
```js
console.log("Age: " + 21); // Age: 21
console.log(`Age: ${21}`); // Age: 21
```
The number is converted to text.

## 26. `charAt()`
```js
console.log("Hello".charAt(1)); // e
```
It returns a string containing the UTF-16 code unit at the requested index, or an empty string for an invalid index.

## 27. `charCodeAt()`
```js
console.log("A".charCodeAt(0)); // 65
```
It returns the numeric UTF-16 code unit.

## 28. `codePointAt()`
```js
console.log("😀".codePointAt(0)); // 128512
```
It reads a Unicode code point and can combine a surrogate pair.

## 29. UTF-16
JavaScript strings are specified using UTF-16 code units. Common characters often use one code unit; some Unicode code points require two.

## 30. Basic Multilingual Plane
U+0000 through U+FFFF form the Basic Multilingual Plane. Many BMP characters use one UTF-16 code unit.

## 31. Surrogate Pairs
Code points above U+FFFF commonly use two UTF-16 code units.

```js
console.log("😀".length); // 2
```

## 32. Code Unit vs Code Point
```text
Code unit  = UTF-16 unit
Code point = Unicode scalar/code-point value
Grapheme   = user-perceived character
```
These are different concepts.

## 33. Grapheme Clusters
A visible character can consist of multiple code points, such as a base letter plus a combining mark or a joined emoji sequence.

## 34. String Iteration
`for...of` uses the string iterator and handles surrogate pairs as Unicode code points.

```js
for (const character of "😀A") {
  console.log(character);
}
```

## 35. Spread Over Strings
```js
console.log([..."😀A"]); // ["😀", "A"]
```
Spread consumes the string iterator.

## 36. `Array.from()`
```js
const characters = Array.from("😀A");
console.log(characters);
```
It also follows string iteration semantics.

## 37. `includes()`
```js
console.log("JavaScript".includes("Script")); // true
```
Use it when a boolean containment answer is required.

## 38. Case Sensitivity
```js
console.log("JavaScript".includes("javascript")); // false
```
String search methods are normally case-sensitive.

## 39. `startsWith()`
```js
console.log("https://example.com".startsWith("https://")); // true
```
Useful for prefix checks.

## 40. `endsWith()`
```js
console.log("photo.png".endsWith(".png")); // true
```
Useful for suffix checks.

## 41. `indexOf()`
```js
console.log("banana".indexOf("na")); // 2
```
It returns the first matching index or `-1`.

## 42. `lastIndexOf()`
```js
console.log("banana".lastIndexOf("na")); // 4
```
It returns the last matching index or `-1`.

## 43. The `indexOf()` Truthiness Trap
Wrong:
```js
if (text.indexOf("a")) {}
```
Index `0` is falsy.

Correct:
```js
if (text.indexOf("a") !== -1) {}
```
Or use `includes()` when only existence matters.

## 44. `search()`
```js
console.log("hello123".search(/\d/)); // 5
```
It searches using a regular expression and returns the first match index or `-1`.

## 45. `match()`
```js
console.log("cat dog cat".match(/cat/g)); // ["cat", "cat"]
```
Its result depends on the regular expression and flags.

## 46. `matchAll()`
```js
const matches = "a1 b2".matchAll(/([a-z])(\d)/g);
for (const match of matches) {
  console.log(match[0], match[1], match[2]);
}
```
It returns an iterator with detailed match records.

## 47. `slice()`
```js
console.log("JavaScript".slice(0, 4)); // Java
```
The start is inclusive and the end is exclusive.

## 48. Negative `slice()`
```js
console.log("JavaScript".slice(-6)); // cript
```
Negative positions count from the end.

## 49. Slice Mental Model
```text
JavaScript
0123456789

slice(0, 4)
^^^^
Java
```
The boundary at `4` is excluded.

## 50. `substring()`
```js
console.log("JavaScript".substring(0, 4)); // Java
```
It has different rules from `slice()` for negative and reversed indexes.

## 51. Negative `substring()`
```js
console.log("Hello".substring(-2, 3)); // Hel
```
Negative arguments are treated as zero.

## 52. `substr()`
`substr()` is legacy/deprecated and should not be used in new code. Prefer `slice()` or `substring()` based on required semantics.

## 53. Case Conversion
```js
console.log("Hello".toUpperCase()); // HELLO
console.log("Hello".toLowerCase()); // hello
```
Both return new strings.

## 54. Locale-Aware Case Conversion
```js
console.log("I".toLocaleLowerCase("tr"));
```
Locale-sensitive case behavior matters in internationalized applications.

## 55. `trim()`
```js
console.log("   hello   ".trim()); // hello
```
It removes recognized whitespace from both ends.

## 56. `trimStart()` and `trimEnd()`
```js
console.log("   hello".trimStart());
console.log("hello   ".trimEnd());
```

## 57. `padStart()`
```js
console.log("7".padStart(3, "0")); // 007
```
The first argument is the final target length.

## 58. `padEnd()`
```js
console.log("7".padEnd(3, "0")); // 700
```

## 59. Padding Rules
The padding string can be truncated to reach the target length. It is not necessarily repeated in full.

## 60. `repeat()`
```js
console.log("ha".repeat(3)); // hahaha
```
Invalid or excessive counts can throw `RangeError`.

## 61. `replace()`
```js
console.log("hello world".replace("world", "JavaScript"));
```
With a string search value, `replace()` replaces the first matching occurrence.

## 62. `replaceAll()`
```js
console.log("a-a-a".replaceAll("-", ":")); // a:a:a
```
Use it when every literal occurrence should be replaced.

## 63. Global Regex Replacement
```js
console.log("a-a-a".replace(/-/g, ":")); // a:a:a
```
The `g` flag requests global matching.

## 64. Replacement Function
```js
const result = "1 2 3".replace(/\d/g, digit => String(Number(digit) * 2));
console.log(result); // 2 4 6
```
A replacement function can compute replacement text from match information.

## 65. `split()`
```js
const parts = "red,green,blue".split(",");
console.log(parts); // ["red", "green", "blue"]
```
String → array.

## 66. `split("")`
```js
console.log("abc".split("")); // ["a", "b", "c"]
```
For arbitrary Unicode, use string iteration when code-point behavior matters.

## 67. Split Limit
```js
console.log("a,b,c,d".split(",", 2)); // ["a", "b"]
```
The second argument limits returned elements.

## 68. `join()`
```js
console.log(["a", "b", "c"].join("-")); // a-b-c
```
Array → string.

## 69. Split/Join Memory Trick
```text
"a-b-c".split("-") → ["a", "b", "c"]
["a", "b", "c"].join("-") → "a-b-c"
```

## 70. Search Decision Tree
```text
Need boolean? → includes / startsWith / endsWith
Need index?   → indexOf / lastIndexOf / search
Need regex data? → match / matchAll
```
Choose the simplest API that expresses the requirement.

## 71. Extraction Decision Tree
```text
Fixed range → slice()
Legacy code → understand substr(), then replace it
Alternative semantics → substring()
From end → slice(-n) / at(-1)
```

## 72. Normalization Pipeline
```js
const normalized = input.trim().toLowerCase();
```
Do not normalize blindly if whitespace or case has semantic meaning.

## 73. Username Validation
```js
function isValidUsername(username) {
  const value = username.trim();
  return value.length >= 3 && value.length <= 20;
}
```
Explicit rules are easier to test.

## 74. Basic Email Shape
```js
function hasBasicEmailShape(value) {
  const text = value.trim();
  return text.includes("@") && !text.startsWith("@");
}
```
This is only a basic shape check, not complete email validation.

## 75. URL Processing
Use `URL` for URL structure instead of fragile manual string splitting.

```js
const url = new URL("https://example.com/users?page=2");
console.log(url.pathname); // /users
```

## 76. File Extension Example
```js
function getExtension(filename) {
  const index = filename.lastIndexOf(".");
  return index === -1 ? "" : filename.slice(index + 1);
}
```
Production path handling must consider directories, hidden files, and multiple dots.

## 77. Reverse Simple Text
```js
function reverseString(text) {
  return text.split("").reverse().join("");
}
```
This is suitable for simple ASCII-like input, not all Unicode text.

## 78. Unicode Code-Point Reversal
```js
function reverseByCodePoint(text) {
  return [...text].reverse().join("");
}
```
This avoids splitting surrogate pairs, but does not guarantee grapheme-cluster safety.

## 79. Character Counting
```js
console.log("😀".length);      // 2 code units
console.log([...["😀"].join("")].length); // 1 code point
```
More directly, `[..."😀"].length` is `1`. Neither number is universally the count of human-perceived characters.

## 80. `Intl.Segmenter`
Where supported, `Intl.Segmenter` can segment graphemes or words.

```js
const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
console.log([...segmenter.segment("👨‍👩‍👧")].length);
```
This is useful when user-perceived characters matter.

## 81. Word Segmentation
```js
const segmenter = new Intl.Segmenter("en", { granularity: "word" });
for (const item of segmenter.segment("Hello JavaScript")) {
  console.log(item.segment, item.isWordLike);
}
```
This is more sophisticated than `split(" ")` for internationalized text.

## 82. Tagged Templates
```js
function tag(strings, value) {
  return `${strings[0]}${value}`;
}

const name = "Ravi";
console.log(tag`Hello ${name}`);
```
A tag receives template parts and evaluated substitutions.

## 83. Tagged Template Uses
Tagged templates can support formatting, localization, DSLs, and controlled transformations. They do not automatically sanitize untrusted content.

## 84. `String.raw`
```js
console.log(`\n`);           // newline
console.log(String.raw`\n`); // backslash + n
```
`String.raw` is useful when raw-looking backslashes need to be represented.

## 85. Template Security
```js
const userInput = "<img src=x onerror=alert(1)>";
const html = `<p>${userInput}</p>`;
```
Interpolation does not HTML-escape input.

## 86. XSS
When inserting untrusted plain text into the DOM, prefer `textContent` over `innerHTML`. If HTML is genuinely required, use a trusted sanitization strategy appropriate to the application.

## 87. Injection Risks
Never blindly concatenate untrusted strings into shell commands, SQL statements, or other executable/query languages. Prefer parameterized APIs and structured interfaces.

## 88. Case-Insensitive Search
```js
function includesIgnoreCase(text, query) {
  return text.toLowerCase().includes(query.toLowerCase());
}
```
For internationalized requirements, locale-aware rules may be needed.

## 89. `localeCompare()`
```js
console.log("é".localeCompare("e"));
```
Use it when language-aware comparison is required. Exact ordering depends on locale and options.

## 90. `Intl.Collator`
```js
const collator = new Intl.Collator("en", { sensitivity: "base" });
console.log(collator.compare("resume", "résumé"));
```
A reusable collator is useful for many locale-aware comparisons.

## 91. Unicode Normalization
Visually equivalent text can have different underlying code-point sequences.

```js
const a = "é";
const b = "e\u0301";
console.log(a === b); // false
console.log(a.normalize() === b.normalize()); // true
```

## 92. Normalization Forms
Common forms are NFC, NFD, NFKC, and NFKD. Compatibility normalization can change distinctions, so choose based on the domain.

## 93. Whitespace
Whitespace is not limited to ASCII space. JavaScript's string whitespace operations recognize a broader set of characters.

## 94. Newlines
Text can contain `\n`, `\r\n`, or `\r`. Normalize line endings when a canonical representation is required.

## 95. String Equality
```js
console.log("abc" === "abc"); // true
console.log("10" === 10);      // false
```
Strict equality checks both type and value.

## 96. Lexicographic Comparison
```js
console.log("apple" < "banana"); // true
```
String relational comparison is not numeric comparison.

## 97. Numeric-Looking Strings
```js
console.log("10" < "2"); // true
```
Both operands are strings, so the comparison is lexicographic.

## 98. Explicit Numeric Comparison
```js
console.log(Number("10") < Number("2")); // false
```
Convert explicitly when numeric semantics are intended.

## 99. String Memory Model
Do not teach strings as if a variable is simply a raw memory address. JavaScript semantics describe bindings and values; engine storage is an implementation detail.

## 100. Performance
Modern engines optimize many string operations. Do not rely on folklore such as “`+` is always slow.” Benchmark realistic workloads before optimizing.

## 101. Avoid Unnecessary Conversion
```js
const name = String(user.name).trim();
```
Conversion at an input boundary can be useful; repeated conversion of known strings is unnecessary noise.

## 102. Avoid Regex for Simple Search
Prefer:
```js
text.includes("cat");
```
when no pattern matching is needed.

## 103. Prefer Structured APIs
Use `URL`/`URLSearchParams` for URLs and appropriate date/time APIs for dates instead of manually parsing structured data as arbitrary strings.

## 104. Common Mistake — Immutability
Wrong:
```js
let text = "hello";
text.toUpperCase();
```
Correct:
```js
text = text.toUpperCase();
```

## 105. Common Mistake — `length` Means Characters
```js
console.log("😀".length); // 2
```
Remember that `.length` counts UTF-16 code units.

## 106. Common Mistake — `split("")` Is Unicode-Safe
It is not generally safe for arbitrary Unicode. Surrogate pairs and grapheme clusters can be split.

## 107. Common Mistake — `replace()` Replaces Everything
```js
console.log("a-a-a".replace("-", ":")); // a:a-a
```
Use `replaceAll()` or a global regex when all occurrences are required.

## 108. Common Mistake — `indexOf()` as Boolean
Index `0` is falsy. Compare with `-1`, or use `includes()`.

## 109. Common Mistake — Slice End Inclusive
```js
"hello".slice(1, 4); // "ell"
```
The end index is excluded.

## 110. Common Mistake — Split vs Join
```text
string.split(separator) → array
array.join(separator)   → string
```

## 111. Common Mistake — Unsafe HTML
```js
container.innerHTML = `<p>${userInput}</p>`;
```
Do not treat this as sanitization. Use safe text insertion for plain text.

## 112. Debugging String Values
Inspect:
1. actual value
2. `typeof`
3. `.length`
4. whitespace
5. case
6. Unicode representation
7. source encoding
8. coercion
9. regex flags
10. whether the result was captured

## 113. Debugging Invisible Characters
```js
console.log(JSON.stringify(text));
```
This makes many newlines, quotes, and escapes visible.

## 114. Debugging Unicode
```js
for (const char of text) {
  console.log(char, char.codePointAt(0).toString(16));
}
```
This helps diagnose unexpected Unicode values.

## 115. Output Prediction
Predict:
```js
const value = "  JavaScript  ";
console.log(value.length);
console.log(value.trim().length);
console.log(value.toUpperCase());
console.log(value);
```
Explain why the original `value` is unchanged.

## 116. Output Prediction — Unicode
Predict:
```js
const text = "A😀B";
console.log(text.length);
console.log([...text].length);
console.log(text.at(1));
console.log(text.codePointAt(1));
```
Explain code units versus code points.

## 117. Output Prediction — Search
Predict:
```js
const text = "banana";
console.log(text.indexOf("na"));
console.log(text.lastIndexOf("na"));
console.log(text.includes("ban"));
console.log(text.startsWith("ban"));
console.log(text.endsWith("na"));
```

## 118. Beginner Practice
Write functions to:
1. return a greeting
2. uppercase text
3. lowercase text
4. trim input
5. count length
6. get first character
7. get last character
8. check containment
9. check prefix
10. check suffix

## 119. Intermediate Practice
Write functions to:
1. reverse text
2. count vowels
3. count words
4. capitalize a sentence
5. remove extra spaces
6. replace all occurrences
7. count a substring
8. extract a simple domain
9. convert kebab-case to camelCase
10. convert camelCase to kebab-case

## 120. Advanced Practice
Implement:
1. Unicode code-point counter
2. grapheme counter using `Intl.Segmenter`
3. slug generator
4. text normalizer
5. case-insensitive search
6. locale-aware sort helper
7. HTML-escaping template tag
8. word-frequency counter
9. normalized palindrome checker
10. text-diff preparation utility

## 121. Mini Project — Text Analyzer
Report:
```text
code units
code points
words
lines
digits
letters
whitespace
most frequent word
most frequent code point
```
Document exactly what each metric means.

## 122. Mini Project — Slug Generator
```text
Input
 ↓
trim
 ↓
Unicode normalization
 ↓
case normalization
 ↓
replace separators
 ↓
collapse separators
 ↓
slug
```
Test punctuation, repeated spaces, Unicode, and empty input.

## 123. Mini Project — Search Utility
Build a utility supporting exact, case-insensitive, prefix, suffix, substring, regex, and index-based search. Document when each mode is appropriate.

## 124. Browser Example
```js
const input = document.querySelector("#name");
const output = document.querySelector("#output");

output.textContent = input.value.trim();
```
For untrusted plain text, `textContent` avoids interpreting the value as HTML.

## 125. Node.js Example
```js
function formatUser(user) {
  return {
    name: user.name.trim(),
    email: user.email.trim().toLowerCase(),
  };
}
```
String processing is commonly used at application input boundaries.

## 126. Algorithm Pattern — Frequency Counter
```js
function countCharacters(text) {
  const counts = new Map();

  for (const char of text) {
    counts.set(char, (counts.get(char) ?? 0) + 1);
  }

  return counts;
}
```
This counts code points according to string iteration, not grapheme clusters.

## 127. Algorithm Pattern — Palindrome
```js
function isPalindrome(text) {
  const value = text.toLowerCase();
  return value === [...value].reverse().join("");
}
```
For production Unicode-aware requirements, define normalization and grapheme semantics explicitly.

## 128. Algorithm Pattern — Word Frequency
```js
function wordFrequency(text) {
  const words = text.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const counts = new Map();

  for (const word of words) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }

  return counts;
}
```
Real applications may need locale-aware segmentation and punctuation handling.

## 129. Interview Questions
- What is a JavaScript string?
- Are strings mutable?
- What does `.length` count?
- What is UTF-16?
- What is a code unit?
- What is a code point?
- What is a surrogate pair?
- Why is `"😀".length` 2?
- Difference between `charAt`, `charCodeAt`, and `codePointAt`?
- Difference between `slice` and `substring`?
- Why avoid `substr()`?
- Difference between `includes` and `indexOf`?
- Difference between `replace` and `replaceAll`?
- Difference between `split` and `join`?
- What are template literals?
- What are tagged templates?
- What is `String.raw`?
- What is Unicode normalization?
- What does `Intl.Segmenter` solve?
- Why can `split("")` break Unicode text?
- How can strings contribute to XSS?
- Why use `URL` for URL parsing?

## 130. Teach-Back Questions
Explain without notes:
1. String immutability.
2. `.length` versus human characters.
3. UTF-16 code units versus Unicode code points.
4. Code points versus grapheme clusters.
5. `slice()` boundaries.
6. `split()` versus `join()`.
7. `replace()` versus `replaceAll()`.
8. `includes()` versus `indexOf()`.
9. Template literals.
10. Tagged templates.
11. Unicode normalization.
12. Safe handling of untrusted text.

## 131. Refactoring Checklist
- [ ] Is the simplest string API being used?
- [ ] Is Unicode behavior relevant?
- [ ] Is case sensitivity intentional?
- [ ] Is whitespace normalization intentional?
- [ ] Is regex actually necessary?
- [ ] Is input validated?
- [ ] Is the returned string captured?
- [ ] Is untrusted text safely inserted?
- [ ] Would a structured API be safer?
- [ ] Are locale requirements documented?

## 132. Best Practices
- Treat strings as immutable values.
- Prefer clear APIs over clever regex.
- Use template literals for readable interpolation.
- Use `includes()` for boolean containment.
- Remember `slice()` end is exclusive.
- Use `replaceAll()` when all literal occurrences should change.
- Use `for...of` for code-point iteration.
- Use `Intl.Segmenter` when grapheme/word segmentation matters.
- Normalize Unicode when the domain requires canonical comparison.
- Use structured APIs for URLs and other structured data.
- Never trust user-controlled text as HTML.

## 133. When to Use Strings
Use strings for textual data, identifiers, labels, messages, serialized text, and text-processing operations.

## 134. When Not to Use Strings
Do not represent structured data as arbitrary strings when a structured representation exists.

```text
URL → URL
structured data → objects/arrays
binary data → ArrayBuffer/TypedArray
```

## 135. Memory Trick
```text
String
 ↓
immutable text
 ↓
UTF-16 code units
 ↓
methods return results

Search:
includes → boolean
indexOf → index
match → matches

Transform:
trim → edges
slice → range
replace → replacement
split → array
join → string
```

## 136. Final Mental Model
```text
Text input
   ↓
String value
   ↓
Choose operation
   ├── Search → includes / indexOf / regex
   ├── Extract → slice / substring
   ├── Transform → case / trim / replace
   ├── Split → array
   ├── Combine → + / concat / template
   └── Unicode → codePointAt / for-of / Segmenter
   ↓
Result
```

## 137. Mastery Checklist
- [ ] Explain what a JavaScript string is.
- [ ] Explain string immutability.
- [ ] Create string literals correctly.
- [ ] Use escapes and Unicode escapes.
- [ ] Use template literals and interpolation.
- [ ] Understand `.length`.
- [ ] Use indexing and `at()`.
- [ ] Use `charAt()`.
- [ ] Use `charCodeAt()`.
- [ ] Use `codePointAt()`.
- [ ] Explain UTF-16.
- [ ] Explain surrogate pairs.
- [ ] Explain code units vs code points.
- [ ] Explain grapheme clusters.
- [ ] Use `for...of` for code-point iteration.
- [ ] Search with `includes`, `indexOf`, and regex APIs.
- [ ] Extract with `slice` and `substring`.
- [ ] Trim, pad, and repeat strings.
- [ ] Replace text correctly.
- [ ] Split and join correctly.
- [ ] Understand tagged templates.
- [ ] Understand Unicode normalization.
- [ ] Understand locale-aware comparison.
- [ ] Avoid unsafe HTML interpolation.
- [ ] Debug invisible and Unicode characters.
- [ ] Build string-processing utilities.
- [ ] Teach string behavior confidently.
