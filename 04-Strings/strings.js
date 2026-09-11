//* ============================================================
//* JAVASCRIPT STRINGS — PRACTICAL COMPANION
//* ============================================================

//* Definition:
//* A string is a primitive JavaScript value used to represent text.
//* JavaScript strings are immutable sequences of UTF-16 code units.


//* ------------------------------------------------------------
//* 1. CREATING STRINGS
//* ------------------------------------------------------------

const singleQuote = 'Hello';
const doubleQuote = "JavaScript";
const backtick = `Strings are useful`;

console.log(singleQuote);
console.log(doubleQuote);
console.log(backtick);


//* ------------------------------------------------------------
//* 2. STRING QUOTES
//* ------------------------------------------------------------

const message1 = "It's JavaScript";
const message2 = 'He said "Hello"';

console.log(message1);
console.log(message2);

//* Choose quotes that make the text easy to read, or use escaping.


//* ------------------------------------------------------------
//* 3. ESCAPE CHARACTERS
//* ------------------------------------------------------------

console.log("Line 1\nLine 2");
console.log("Column1\tColumn2");
console.log("He said \"Hello\"");
console.log('It\'s fine');
console.log("Backslash: \\");

//* Common escapes:
//* \n = newline
//* \t = tab
//* \\ = backslash
//* \" = double quote
//* \' = single quote


//* ------------------------------------------------------------
//* 4. TEMPLATE LITERALS
//* ------------------------------------------------------------

const userName = "Ravi";
const age = 21;

const profile = `My name is ${userName} and I am ${age} years old.`;
console.log(profile);

//* `${expression}` evaluates the expression and inserts its result.


//* ------------------------------------------------------------
//* 5. TEMPLATE LITERAL EXPRESSIONS
//* ------------------------------------------------------------

const price = 100;
const quantity = 3;

console.log(`Total: ${price * quantity}`);
console.log(`Adult: ${age >= 18}`);


//* ------------------------------------------------------------
//* 6. MULTILINE STRINGS
//* ------------------------------------------------------------

const paragraph = `Line one
Line two
Line three`;

console.log(paragraph);


//* ------------------------------------------------------------
//* 7. STRING LENGTH
//* ------------------------------------------------------------

const language = "JavaScript";
console.log(language.length); // 10

//* `length` counts UTF-16 code units, not necessarily human-perceived
//* characters (grapheme clusters).


//* ------------------------------------------------------------
//* 8. INDEXING
//* ------------------------------------------------------------

const word = "Hello";

console.log(word[0]); // H
console.log(word[1]); // e
console.log(word[4]); // o
console.log(word[10]); // undefined


//* ------------------------------------------------------------
//* 9. charAt()
//* ------------------------------------------------------------

console.log(word.charAt(0)); // H
console.log(word.charAt(10)); // ""

//* Difference:
//* word[10] -> undefined
//* word.charAt(10) -> empty string


//* ------------------------------------------------------------
//* 10. charCodeAt()
//* ------------------------------------------------------------

console.log("A".charCodeAt(0)); // 65
console.log("a".charCodeAt(0)); // 97

//* Returns the UTF-16 code unit at an index.


//* ------------------------------------------------------------
//* 11. CODE POINTS
//* ------------------------------------------------------------

const emoji = "😀";

console.log(emoji.length); // 2 UTF-16 code units
console.log(emoji.codePointAt(0)); // 128512

//* Some Unicode characters require a surrogate pair in UTF-16.


//* ------------------------------------------------------------
//* 12. STRING IMMUTABILITY
//* ------------------------------------------------------------

let text = "hello";

text.toUpperCase();
console.log(text); // hello

text = text.toUpperCase();
console.log(text); // HELLO

//* String methods return new strings; they do not mutate the original
//* string because primitive strings are immutable.


//* ------------------------------------------------------------
//* 13. CONCATENATION WITH +
//* ------------------------------------------------------------

const firstName = "Ravi";
const lastName = "Kumar";

console.log(firstName + " " + lastName);


//* ------------------------------------------------------------
//* 14. concat()
//* ------------------------------------------------------------

console.log("Hello".concat(" ", "Ravi", "!"));

//* `+` and template literals are usually more convenient for modern code.


//* ------------------------------------------------------------
//* 15. toUpperCase()
//* ------------------------------------------------------------

console.log("javascript".toUpperCase()); // JAVASCRIPT


//* ------------------------------------------------------------
//* 16. toLowerCase()
//* ------------------------------------------------------------

console.log("JAVASCRIPT".toLowerCase()); // javascript


//* ------------------------------------------------------------
//* 17. trim()
//* ------------------------------------------------------------

const input = "   Ravi Kumar   ";
console.log(input.trim()); // "Ravi Kumar"

//* Removes whitespace from both ends.


//* ------------------------------------------------------------
//* 18. trimStart() AND trimEnd()
//* ------------------------------------------------------------

const spaced = "   Hello   ";
console.log(spaced.trimStart());
console.log(spaced.trimEnd());


//* ------------------------------------------------------------
//* 19. includes()
//* ------------------------------------------------------------

const sentence = "JavaScript is powerful";

console.log(sentence.includes("JavaScript")); // true
console.log(sentence.includes("Python")); // false

//* Case-sensitive.
console.log(sentence.includes("javascript")); // false


//* ------------------------------------------------------------
//* 20. startsWith()
//* ------------------------------------------------------------

console.log(sentence.startsWith("JavaScript")); // true
console.log(sentence.startsWith("powerful")); // false


//* ------------------------------------------------------------
//* 21. endsWith()
//* ------------------------------------------------------------

console.log(sentence.endsWith("powerful")); // true
console.log(sentence.endsWith("JavaScript")); // false


//* ------------------------------------------------------------
//* 22. indexOf()
//* ------------------------------------------------------------

const repeated = "banana";

console.log(repeated.indexOf("a")); // 1
console.log(repeated.indexOf("na")); // 2
console.log(repeated.indexOf("x")); // -1

//* Returns the first matching index or -1 when not found.


//* ------------------------------------------------------------
//* 23. lastIndexOf()
//* ------------------------------------------------------------

console.log(repeated.lastIndexOf("a")); // 5


//* ------------------------------------------------------------
//* 24. search()
//* ------------------------------------------------------------

console.log("JavaScript 2026".search(/2026/)); // 11
console.log("Hello".search(/x/)); // -1

//* `search()` accepts a regular expression and returns its first match index.


//* ------------------------------------------------------------
//* 25. match()
//* ------------------------------------------------------------

const numbersText = "Order 123 and 456";

console.log(numbersText.match(/\d+/));
console.log(numbersText.match(/\d+/g));

//* Without `g`, match returns information about the first match.
//* With `g`, it returns all matched substrings.


//* ------------------------------------------------------------
//* 26. matchAll()
//* ------------------------------------------------------------

const matches = "a1 b2 c3".matchAll(/([a-z])(\d)/g);

for (const match of matches) {
  console.log(match[0], match[1], match[2]);
}

//* `matchAll()` returns an iterator of detailed match results and
//* requires a global regular expression.


//* ------------------------------------------------------------
//* 27. replace()
//* ------------------------------------------------------------

const title = "hello world";
console.log(title.replace("world", "JavaScript"));

//* By default, a string search replaces the first matching occurrence.


//* ------------------------------------------------------------
//* 28. replaceAll()
//* ------------------------------------------------------------

const repeatedWord = "JS JS JS";
console.log(repeatedWord.replaceAll("JS", "JavaScript"));


//* ------------------------------------------------------------
//* 29. REPLACE WITH REGULAR EXPRESSION
//* ------------------------------------------------------------

const messy = "one   two    three";
console.log(messy.replace(/\s+/g, " "));

//* The `g` flag is important when you want all matching occurrences.


//* ------------------------------------------------------------
//* 30. slice()
//* ------------------------------------------------------------

const value = "JavaScript";

console.log(value.slice(0, 4)); // Java
console.log(value.slice(4)); // Script
console.log(value.slice(-6)); // Script
console.log(value.slice(0, -6)); // Java

//* `slice(start, end)` includes start and excludes end.


//* ------------------------------------------------------------
//* 31. slice() DOES NOT MUTATE
//* ------------------------------------------------------------

const original = "Hello World";
const part = original.slice(0, 5);

console.log(part);     // Hello
console.log(original); // Hello World


//* ------------------------------------------------------------
//* 32. substring()
//* ------------------------------------------------------------

console.log("JavaScript".substring(0, 4)); // Java

//* `substring()` treats negative values as 0 and swaps the arguments
//* if start is greater than end. This differs from `slice()`.

console.log("JavaScript".substring(4, 0)); // Java
console.log("JavaScript".slice(4, 0)); // ""


//* ------------------------------------------------------------
//* 33. substr() — AVOID
//* ------------------------------------------------------------

//* `substr()` is legacy/deprecated functionality and should not be
//* chosen for new code. Prefer `slice()` or `substring()`.


//* ------------------------------------------------------------
//* 34. SPLIT
//* ------------------------------------------------------------

const csv = "HTML,CSS,JavaScript,React";
const technologies = csv.split(",");

console.log(technologies);
console.log(technologies.length);

//* `split()` converts a string into an array using a separator.


//* ------------------------------------------------------------
//* 35. split() WITH EMPTY STRING
//* ------------------------------------------------------------

console.log("Ravi".split("")); // ["R", "a", "v", "i"]

//* For Unicode-aware character iteration, `Array.from()` or `for...of`
//* may be more appropriate than splitting UTF-16 code units blindly.


//* ------------------------------------------------------------
//* 36. split() WITH LIMIT
//* ------------------------------------------------------------

console.log("a-b-c-d".split("-", 2)); // ["a", "b"]


//* ------------------------------------------------------------
//* 37. JOIN — REVERSE OF SPLIT IDEA
//* ------------------------------------------------------------

const parts = ["JavaScript", "is", "fun"];
console.log(parts.join(" ")); // JavaScript is fun


//* ------------------------------------------------------------
//* 38. PAD START
//* ------------------------------------------------------------

console.log("7".padStart(3, "0")); // 007

//* Useful for IDs, clocks, invoice numbers, etc.


//* ------------------------------------------------------------
//* 39. PAD END
//* ------------------------------------------------------------

console.log("JS".padEnd(5, ".")); // JS...


//* ------------------------------------------------------------
//* 40. REPEAT
//* ------------------------------------------------------------

console.log("-".repeat(10));
console.log("ha".repeat(3)); // hahaha


//* ------------------------------------------------------------
//* 41. STRING COMPARISON
//* ------------------------------------------------------------

console.log("apple" === "apple"); // true
console.log("apple" === "Apple"); // false

//* String equality is case-sensitive.


//* ------------------------------------------------------------
//* 42. STRING ORDER COMPARISON
//* ------------------------------------------------------------

console.log("apple" < "banana"); // true
console.log("cat" > "car"); // true

//* Relational string comparison uses JavaScript's string comparison
//* rules based on UTF-16 code unit values, not natural-language sorting.


//* ------------------------------------------------------------
//* 43. localeCompare()
//* ------------------------------------------------------------

console.log("apple".localeCompare("banana"));
console.log("banana".localeCompare("apple"));

//* `localeCompare()` is useful for locale-aware ordering and can be
//* configured with options.


//* ------------------------------------------------------------
//* 44. NORMALIZING USER INPUT
//* ------------------------------------------------------------

function normalizeName(name) {
  return name.trim().toLowerCase();
}

console.log(normalizeName("  RAVI  ")); // ravi

//* Normalization makes comparison of user input more consistent.


//* ------------------------------------------------------------
//* 45. CASE-INSENSITIVE COMPARISON
//* ------------------------------------------------------------

function sameIgnoreCase(a, b) {
  return a.toLowerCase() === b.toLowerCase();
}

console.log(sameIgnoreCase("JavaScript", "javascript")); // true

//* For language-sensitive applications, use locale-aware APIs when
//* simple lowercasing is not sufficient.


//* ------------------------------------------------------------
//* 46. NUMBER TO STRING
//* ------------------------------------------------------------

const number = 123;

console.log(String(number));
console.log(number.toString());
console.log(`${number}`);


//* ------------------------------------------------------------
//* 47. STRING TO NUMBER
//* ------------------------------------------------------------

console.log(Number("123")); // 123
console.log(Number("12.5")); // 12.5
console.log(Number("abc")); // NaN

//* A string from a form/input is still text until explicitly converted.


//* ------------------------------------------------------------
//* 48. parseInt()
//* ------------------------------------------------------------

console.log(parseInt("42px", 10)); // 42
console.log(parseInt("101", 2)); // 5

//* `parseInt()` parses an integer prefix using the specified radix.


//* ------------------------------------------------------------
//* 49. parseFloat()
//* ------------------------------------------------------------

console.log(parseFloat("12.50px")); // 12.5


//* ------------------------------------------------------------
//* 50. Number() VS parseInt()
//* ------------------------------------------------------------

console.log(Number("42px")); // NaN
console.log(parseInt("42px", 10)); // 42

//* Use `Number()` when you expect the entire string to represent a number.
//* Use `parseInt()` when parsing an integer prefix is intentionally desired.


//* ------------------------------------------------------------
//* 51. TRUTHINESS OF STRINGS
//* ------------------------------------------------------------

console.log(Boolean("hello")); // true
console.log(Boolean("")); // false

if ("JavaScript") {
  console.log("Non-empty string is truthy");
}

//* Empty string is falsy. Non-empty strings are truthy.


//* ------------------------------------------------------------
//* 52. STRING + NUMBER
//* ------------------------------------------------------------

console.log("Age: " + 21); // "Age: 21"
console.log("10" + 5);    // "105"

//* `+` performs string concatenation when one operand becomes a string.


//* ------------------------------------------------------------
//* 53. AVOID UNINTENTIONAL CONCATENATION
//* ------------------------------------------------------------

const quantityText = "2";
const priceNumber = 100;

console.log(Number(quantityText) * priceNumber); // 200
console.log(quantityText + priceNumber); // "2100"

//* Convert form/input text explicitly when arithmetic is intended.


//* ------------------------------------------------------------
//* 54. REGULAR EXPRESSIONS WITH STRINGS
//* ------------------------------------------------------------

const phoneText = "Call 9876543210";
const phone = phoneText.match(/\d{10}/);

console.log(phone?.[0]); // 9876543210

//* Regular expressions are patterns used for matching and transforming text.


//* ------------------------------------------------------------
//* 55. REGEX test()
//* ------------------------------------------------------------

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(emailPattern.test("ravi@example.com")); // true
console.log(emailPattern.test("not-an-email")); // false

//* This is a basic shape check, not a complete email specification.


//* ------------------------------------------------------------
//* 56. STRING ITERATION
//* ------------------------------------------------------------

for (const character of "Ravi") {
  console.log(character);
}

//* `for...of` iterates Unicode code points, making it generally better
//* than index-based UTF-16 code-unit iteration for many Unicode cases.


//* ------------------------------------------------------------
//* 57. Array.from() WITH STRINGS
//* ------------------------------------------------------------

console.log(Array.from("Ravi"));
console.log(Array.from("😀")); // ["😀"]

//* Array.from() uses the string's iterator, which works by code point.


//* ------------------------------------------------------------
//* 58. SPREAD STRING
//* ------------------------------------------------------------

console.log([..."Ravi"]);
console.log([..."😀"]);


//* ------------------------------------------------------------
//* 59. RAW TEMPLATE LITERALS — PREVIEW
//* ------------------------------------------------------------

const path = String.raw`C:\Users\Ravi\Projects`;
console.log(path);

//* String.raw() is useful when you want template literal text with
//* escape sequences represented more literally.


//* ------------------------------------------------------------
//* 60. UNICODE ESCAPES
//* ------------------------------------------------------------

console.log("\u0041"); // A
console.log("\u{1F600}"); // 😀

//* `\uXXXX` represents a UTF-16 code unit; `\u{...}` supports Unicode
//* code points when used with the appropriate syntax.


//* ------------------------------------------------------------
//* 61. SURROGATE PAIRS — WHY length CAN SURPRISE YOU
//* ------------------------------------------------------------

const smile = "😀";
console.log(smile.length); // 2
console.log([...smile].length); // 1

//* `length` is based on UTF-16 code units.
//* The spread iterator works by Unicode code points.


//* ------------------------------------------------------------
//* 62. GRAPHEME CLUSTERS — IMPORTANT ADVANCED NOTE
//* ------------------------------------------------------------

const familyEmoji = "👨‍👩‍👧‍👦";
console.log(familyEmoji.length);
console.log([...familyEmoji].length);

//* Even code-point counting does not always equal what a user sees as
//* one character. Grapheme clusters can contain multiple code points.
//* `Intl.Segmenter` can help with locale-aware text segmentation.

if (typeof Intl.Segmenter === "function") {
  const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  console.log([...segmenter.segment(familyEmoji)].length); // 1
}


//* ------------------------------------------------------------
//* 63. startsWith() / endsWith() WITH POSITION
//* ------------------------------------------------------------

const fileName = "report-2026.pdf";
console.log(fileName.startsWith("2026", 7)); // true
console.log(fileName.endsWith("2026", 11)); // true


//* ------------------------------------------------------------
//* 64. includes() WITH POSITION
//* ------------------------------------------------------------

console.log("JavaScript".includes("Script", 4)); // true


//* ------------------------------------------------------------
//* 65. slice() WITH NEGATIVE INDEX
//* ------------------------------------------------------------

const course = "JavaScript";
console.log(course.slice(-6)); // Script
console.log(course.slice(-6, -3)); // Scr


//* ------------------------------------------------------------
//* 66. SAFE FIRST/ LAST CHARACTER
//* ------------------------------------------------------------

function firstCharacter(value) {
  return value.at(0);
}

function lastCharacter(value) {
  return value.at(-1);
}

console.log(firstCharacter("Hello")); // H
console.log(lastCharacter("Hello")); // o

//* String.prototype.at() supports negative indexes.


//* ------------------------------------------------------------
//* 67. trim + validation
//* ------------------------------------------------------------

function validateUsername(username) {
  const cleaned = username.trim();

  if (cleaned.length < 3) {
    return false;
  }

  return /^[a-zA-Z0-9_]+$/.test(cleaned);
}

console.log(validateUsername(" Ravi_21 ")); // true
console.log(validateUsername("ab")); // false


//* ------------------------------------------------------------
//* 68. REAL-WORLD: SLUG CREATOR
//* ------------------------------------------------------------

function createSlug(title) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

console.log(createSlug("  Learn JavaScript Functions! "));
// learn-javascript-functions


//* ------------------------------------------------------------
//* 69. REAL-WORLD: FORMAT NAME
//* ------------------------------------------------------------

function formatName(firstName, lastName) {
  const first = firstName.trim();
  const last = lastName.trim();

  return `${first} ${last}`.trim();
}

console.log(formatName(" Ravi ", " Kumar "));


//* ------------------------------------------------------------
//* 70. REAL-WORLD: MASK EMAIL
//* ------------------------------------------------------------

function maskEmail(email) {
  const [localPart, domain] = email.trim().split("@");

  if (!localPart || !domain) {
    return undefined;
  }

  const visible = localPart.slice(0, 2);
  const masked = "*".repeat(Math.max(localPart.length - 2, 0));

  return `${visible}${masked}@${domain}`;
}

console.log(maskEmail("ravi@example.com"));


//* ------------------------------------------------------------
//* 71. REAL-WORLD: EXTRACT FILE EXTENSION
//* ------------------------------------------------------------

function getExtension(fileName) {
  const lastDot = fileName.lastIndexOf(".");

  if (lastDot <= 0 || lastDot === fileName.length - 1) {
    return "";
  }

  return fileName.slice(lastDot + 1).toLowerCase();
}

console.log(getExtension("photo.PNG")); // png
console.log(getExtension("README")); // ""


//* ------------------------------------------------------------
//* 72. REAL-WORLD: SEARCH QUERY NORMALIZATION
//* ------------------------------------------------------------

function normalizeSearchQuery(query) {
  return query.trim().replace(/\s+/g, " ");
}

console.log(normalizeSearchQuery("  javascript    functions   "));
// javascript functions


//* ------------------------------------------------------------
//* 73. COMMON MISTAKE: EXPECTING STRING MUTATION
//* ------------------------------------------------------------

let courseName = "javascript";
courseName.toUpperCase();
console.log(courseName); // javascript

courseName = courseName.toUpperCase();
console.log(courseName); // JAVASCRIPT


//* ------------------------------------------------------------
//* 74. COMMON MISTAKE: CASE SENSITIVITY
//* ------------------------------------------------------------

console.log("JavaScript" === "javascript"); // false

//* Normalize both values when case-insensitive comparison is intended.


//* ------------------------------------------------------------
//* 75. COMMON MISTAKE: indexOf() IN CONDITIONS
//* ------------------------------------------------------------

const searchText = "JavaScript";

if (searchText.indexOf("Java") !== -1) {
  console.log("Found");
}

//* Do not write `if (searchText.indexOf("Java"))` because index 0 is
//* falsy and would incorrectly behave like "not found".
//* Prefer `includes()` when you only need a yes/no answer.


//* ------------------------------------------------------------
//* 76. COMMON MISTAKE: split() VS join()
//* ------------------------------------------------------------

const sentenceParts = "Learn JavaScript".split(" ");
console.log(sentenceParts); // array
console.log(sentenceParts.join("-")); // string

//* split: string -> array
//* join: array -> string


//* ------------------------------------------------------------
//* 77. COMMON MISTAKE: parseInt WITHOUT RADIX
//* ------------------------------------------------------------

console.log(parseInt("101", 2)); // 5

//* Provide the radix when using parseInt so the intended number base is explicit.


//* ------------------------------------------------------------
//* 78. COMMON MISTAKE: UNTRUSTED HTML
//* ------------------------------------------------------------

//* A string containing `<script>` or HTML markup is still just text until
//* interpreted by an API such as innerHTML. Never inject untrusted text
//* into HTML without an appropriate security strategy.

const userInput = "<img src=x onerror=alert('xss')>";
console.log(userInput); // Safe as a plain console string.


//* ------------------------------------------------------------
//* 79. OUTPUT PREDICTION
//* ------------------------------------------------------------

const predictionText = "JavaScript";

console.log(predictionText.slice(0, 4)); // ?
console.log(predictionText.includes("Script")); // ?
console.log(predictionText[10]); // ?
console.log("10" + 5); // ?

//* Answers: Java, true, undefined, "105".


//* ------------------------------------------------------------
//* 80. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1:
//* Reverse a string without using reverse() directly on the string.

//* Challenge 2:
//* Count the number of vowels in a string.

//* Challenge 3:
//* Check whether a string is a palindrome.

//* Challenge 4:
//* Find the longest word in a sentence.

//* Challenge 5:
//* Count how many times a specific character occurs.

//* Challenge 6:
//* Capitalize the first letter of every word.

//* Challenge 7:
//* Create a slug generator.

//* Challenge 8:
//* Mask all but the last four characters of a phone number.

//* Challenge 9:
//* Remove duplicate whitespace from a sentence.

//* Challenge 10:
//* Build a basic email validation function.


//* ------------------------------------------------------------
//* 81. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1:
//* let name = " Ravi ";
//* name.trim();
//* console.log(name);
//* Question: Why are the spaces still present?

//* Debug 2:
//* if ("JavaScript".indexOf("Java")) {
//*   console.log("Found");
//* }
//* Question: Why does this fail when the match starts at index 0?

//* Debug 3:
//* const quantity = "2";
//* const price = "100";
//* console.log(quantity + price);
//* Question: Why is the result "2100" instead of 200?

//* Debug 4:
//* const word = "😀";
//* console.log(word.length);
//* Question: Why is the result 2?

//* Debug 5:
//* const words = "one,two,three";
//* console.log(words.join("-"));
//* Question: Why does this fail? What should you use first?


//* ------------------------------------------------------------
//* 82. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is a string?
//* 2. Are JavaScript strings mutable?
//* 3. What does string.length count?
//* 4. What is the difference between a code unit and a code point?
//* 5. What is a template literal?
//* 6. What does `${expression}` do?
//* 7. What does trim() return?
//* 8. What is the difference between includes() and indexOf()?
//* 9. What is the difference between slice() and substring()?
//* 10. Why should substr() not be used in new code?
//* 11. What does split() return?
//* 12. What does join() return?
//* 13. What is the difference between replace() and replaceAll()?
//* 14. What does a regular expression do?
//* 15. Why can `"😀".length` be 2?
//* 16. Why is `for...of` useful for Unicode strings?
//* 17. What is a grapheme cluster?
//* 18. Why should form/input strings often be explicitly converted to numbers?
//* 19. Why is `indexOf(...) !== -1` important when using indexOf for search?
//* 20. How would you safely handle untrusted text before displaying it in a web page?


//* ============================================================
//* END OF STRINGS
//* ============================================================
