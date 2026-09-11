/*
 * JavaScript Zero to Master
 * Chapter 22 — TypeScript
 * Companion JavaScript File
 *
 * TypeScript is a statically typed superset of JavaScript that adds a type
 * system and compile-time tooling. This file uses JavaScript to demonstrate
 * the runtime concepts behind TypeScript. Type annotations themselves are
 * intentionally shown in comments because this file must remain runnable by
 * plain JavaScript runtimes.
 *
 * TypeScript types are primarily checked before runtime and are erased from
 * emitted JavaScript. Runtime validation is still necessary for untrusted data.
 */

console.log("=== 22. TypeScript ===");

// ============================================================
// 1. WHAT IS TYPESCRIPT?
// ============================================================
// Definition:
// TypeScript is a language built on JavaScript that adds static type checking,
// richer tooling, and language features that compile to JavaScript.
//
// Example TypeScript syntax:
// const age: number = 21;
// const name: string = "Ravi";
//
// The type annotations are not JavaScript runtime values. The compiler checks
// them and removes them from emitted JavaScript.

const age = 21;
const name = "Ravi";

console.log("Runtime values:", age, name);

// ============================================================
// 2. STATIC VS DYNAMIC TYPING
// ============================================================
// JavaScript is dynamically typed: values have types at runtime.
// TypeScript can report many type mistakes before the program runs.

let dynamicValue = 10;
dynamicValue = "hello"; // Valid JavaScript: the variable now holds a string.

console.log("JavaScript dynamic value:", dynamicValue);

// TypeScript example (conceptual):
// let count: number = 10;
// count = "hello"; // TypeScript error

// ============================================================
// 3. TYPE ANNOTATIONS
// ============================================================
// TypeScript syntax examples:
// let username: string = "Ravi";
// let score: number = 100;
// let active: boolean = true;
// let nothing: null = null;
// let missing: undefined = undefined;
//
// The JavaScript runtime receives ordinary values.

// ============================================================
// 4. TYPE INFERENCE
// ============================================================
// TypeScript often infers a type from the initial value.
//
// const language = "JavaScript";
// // inferred as string
//
// let points = 100;
// // inferred as number

const language = "JavaScript";
let points = 100;
points += 50;

console.log(language, points);

// ============================================================
// 5. PRIMITIVE TYPES
// ============================================================
// Common TypeScript primitive types:
// string, number, boolean, bigint, symbol, null, undefined.

const text = "hello";
const number = 42;
const flag = true;
const big = 123n;
const unique = Symbol("id");
const empty = null;
const missing = undefined;

console.log(typeof text, typeof number, typeof flag, typeof big);
console.log(typeof unique, typeof empty, typeof missing);

// ============================================================
// 6. ANY
// ============================================================
// `any` disables much of TypeScript's static checking for that value.
//
// let value: any = 10;
// value = "hello";
// value.notRealMethod(); // compiler cannot protect you here
//
// Prefer specific types or unknown when the value is genuinely uncertain.

// ============================================================
// 7. UNKNOWN
// ============================================================
// `unknown` represents a value whose type is not known yet.
// Unlike any, it requires narrowing before unsafe operations.
//
// let input: unknown = getExternalData();
// if (typeof input === "string") {
//   console.log(input.toUpperCase());
// }

function describeUnknown(value) {
  if (typeof value === "string") return `string: ${value}`;
  if (typeof value === "number") return `number: ${value}`;
  if (typeof value === "boolean") return `boolean: ${value}`;
  return `other: ${String(value)}`;
}

console.log(describeUnknown("hello"));
console.log(describeUnknown(42));

// ============================================================
// 8. NEVER
// ============================================================
// `never` describes values that cannot occur, such as a function that always
// throws or a branch that is unreachable after exhaustive narrowing.

function fail(message) {
  throw new Error(message);
}

try {
  fail("Example failure");
} catch (error) {
  console.log("never-like function threw:", error.message);
}

// ============================================================
// 9. VOID
// ============================================================
// `void` is commonly used for functions whose return value should not be used.
//
// function logMessage(message: string): void {
//   console.log(message);
// }

function logMessage(message) {
  console.log(message);
}

logMessage("TypeScript separates useful type information from runtime JS.");

// ============================================================
// 10. ARRAYS
// ============================================================
// TypeScript array syntax:
// const scores: number[] = [10, 20, 30];
// const names: Array<string> = ["Ravi", "Amit"];

const scores = [10, 20, 30];
const names = ["Ravi", "Amit"];

console.log(scores, names);

// ============================================================
// 11. TUPLES
// ============================================================
// A tuple describes a fixed positional structure.
//
// const userRecord: [number, string] = [1, "Ravi"];
//
// Position 0 is a number and position 1 is a string.

const userRecord = [1, "Ravi"];
console.log("Tuple-like runtime value:", userRecord);

// ============================================================
// 12. OBJECT TYPES
// ============================================================
// TypeScript object type:
//
// type User = {
//   id: number;
//   name: string;
//   active: boolean;
// };

const user = {
  id: 1,
  name: "Ravi",
  active: true,
};

console.log(user);

// ============================================================
// 13. TYPE ALIASES
// ============================================================
// A type alias gives a reusable name to a type.
//
// type ID = string | number;
// type User = {
//   id: ID;
//   name: string;
// };
//
// Type aliases disappear from emitted JavaScript.

// ============================================================
// 14. INTERFACES
// ============================================================
// Interfaces describe object contracts.
//
// interface User {
//   id: number;
//   name: string;
// }
//
// Type aliases and interfaces overlap heavily for object shapes. Interfaces
// also support declaration merging, while type aliases can express unions,
// intersections, tuples, mapped types, and more.

// ============================================================
// 15. OPTIONAL PROPERTIES
// ============================================================
// `?` makes a property optional.
//
// type Profile = {
//   name: string;
//   bio?: string;
// };

const profile = { name: "Ravi" };
console.log("Optional property at runtime:", profile.bio); // undefined

// ============================================================
// 16. READONLY
// ============================================================
// TypeScript can prevent assignments through a readonly property at compile
// time.
//
// type Config = {
//   readonly apiUrl: string;
// };
//
// This is not runtime immutability. Object.freeze() is a runtime mechanism.

const config = Object.freeze({ apiUrl: "/api" });
console.log(config.apiUrl);

// ============================================================
// 17. UNION TYPES
// ============================================================
// A union means a value may be one of several types.
//
// let id: string | number;
// id = 1;
// id = "user-1";

function formatId(id) {
  return String(id);
}

console.log(formatId(123));
console.log(formatId("user-123"));

// ============================================================
// 18. NARROWING
// ============================================================
// Narrowing turns a broad type into a more specific type using runtime checks.
//
// function printId(id: string | number) {
//   if (typeof id === "string") {
//     return id.toUpperCase();
//   }
//   return id.toFixed(0);
// }

function printId(id) {
  if (typeof id === "string") return id.toUpperCase();
  return id.toFixed(0);
}

console.log(printId("abc"));
console.log(printId(42));

// ============================================================
// 19. DISCRIMINATED UNIONS
// ============================================================
// A shared literal property lets TypeScript narrow object variants.
//
// type Result =
//   | { status: "success"; data: string }
//   | { status: "error"; message: string };

function renderResult(result) {
  if (result.status === "success") {
    return `Data: ${result.data}`;
  }

  return `Error: ${result.message}`;
}

console.log(renderResult({ status: "success", data: "Loaded" }));
console.log(renderResult({ status: "error", message: "Failed" }));

// ============================================================
// 20. LITERAL TYPES
// ============================================================
// Literal types restrict values to exact literals.
//
// type Theme = "light" | "dark";
// type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function setTheme(theme) {
  if (theme !== "light" && theme !== "dark") {
    throw new Error("Invalid theme");
  }
  return theme;
}

console.log(setTheme("dark"));

// ============================================================
// 21. ENUMS — KNOW THE TRADE-OFFS
// ============================================================
// TypeScript supports enums, but many modern codebases prefer literal unions
// because they are simpler and emit less runtime machinery.
//
// enum Status {
//   Pending = "pending",
//   Paid = "paid",
// }
//
// Alternative:
// type Status = "pending" | "paid";

// ============================================================
// 22. FUNCTIONS: PARAMETER AND RETURN TYPES
// ============================================================
// TypeScript syntax:
// function add(a: number, b: number): number {
//   return a + b;
// }

function add(a, b) {
  return a + b;
}

console.log(add(10, 20));

// ============================================================
// 23. OPTIONAL PARAMETERS
// ============================================================
// function greet(name: string, title?: string): string { ... }
//
// An optional parameter can be omitted and is typically treated as possibly
// undefined by TypeScript.

function greet(name, title) {
  return title ? `${title} ${name}` : name;
}

console.log(greet("Ravi"));
console.log(greet("Ravi", "Developer"));

// ============================================================
// 24. DEFAULT PARAMETERS
// ============================================================
// Defaults are JavaScript runtime behavior and TypeScript understands them.

function createPageSize(size = 20) {
  return size;
}

console.log(createPageSize(), createPageSize(50));

// ============================================================
// 25. REST PARAMETERS
// ============================================================
// TypeScript syntax:
// function sum(...numbers: number[]): number { ... }

function sum(...numbers) {
  return numbers.reduce((total, value) => total + value, 0);
}

console.log(sum(1, 2, 3, 4));

// ============================================================
// 26. FUNCTION TYPES
// ============================================================
// A function type can describe parameters and return value.
//
// type MathOperation = (a: number, b: number) => number;

function calculate(a, b, operation) {
  return operation(a, b);
}

console.log(calculate(5, 3, (a, b) => a + b));
console.log(calculate(5, 3, (a, b) => a * b));

// ============================================================
// 27. CALLBACK TYPES
// ============================================================
// TypeScript can check callback parameter and return types.
//
// function process(numbers: number[], callback: (n: number) => number): number[]
// {
//   return numbers.map(callback);
// }

function process(numbers, callback) {
  return numbers.map(callback);
}

console.log(process([1, 2, 3], (n) => n * 10));

// ============================================================
// 28. GENERICS — THE CORE IDEA
// ============================================================
// Generics let you preserve relationships between input and output types.
//
// function identity<T>(value: T): T {
//   return value;
// }
//
// identity<string>("hello");
// identity<number>(42);

function identity(value) {
  return value;
}

console.log(identity("hello"));
console.log(identity(42));

// ============================================================
// 29. GENERIC COLLECTIONS
// ============================================================
// Example TypeScript:
// function first<T>(items: T[]): T | undefined {
//   return items[0];
// }
//
// This preserves the element type instead of returning `any`.

function first(items) {
  return items[0];
}

console.log(first(["a", "b"]));
console.log(first([10, 20]));

// ============================================================
// 30. GENERIC CONSTRAINTS
// ============================================================
// Sometimes a generic needs a capability.
//
// function getLength<T extends { length: number }>(value: T): number {
//   return value.length;
// }
//
// The constraint says T must have a length property.

function getLength(value) {
  if (typeof value?.length !== "number") {
    throw new TypeError("Value must have a numeric length");
  }
  return value.length;
}

console.log(getLength("TypeScript"));
console.log(getLength([1, 2, 3]));

// ============================================================
// 31. GENERIC KEYOF PATTERN
// ============================================================
// TypeScript can constrain a key to keys of an object.
//
// function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
//   return object[key];
// }

function getProperty(object, key) {
  return object[key];
}

const product = { id: 1, title: "Keyboard", price: 1500 };
console.log(getProperty(product, "title"));

// ============================================================
// 32. INTERSECTION TYPES
// ============================================================
// `A & B` combines requirements from both types.
//
// type Timestamped = { createdAt: Date };
// type Entity = { id: number };
// type TimestampedEntity = Timestamped & Entity;

const timestampedEntity = {
  id: 1,
  createdAt: new Date(),
};

console.log(timestampedEntity.id, timestampedEntity.createdAt instanceof Date);

// ============================================================
// 33. TYPE ASSERTIONS
// ============================================================
// Type assertion tells TypeScript how you want to treat a value.
//
// const value = someElement as HTMLInputElement;
//
// A type assertion does NOT validate or convert the runtime value.
// Wrong assertions can create runtime bugs.

// ============================================================
// 34. NON-NULL ASSERTION
// ============================================================
// `value!` tells TypeScript that a value is not null/undefined.
//
// const element = document.querySelector("#app")!;
//
// Use carefully: the runtime can still produce null if your assumption is
// wrong.

// ============================================================
// 35. TYPE GUARDS
// ============================================================
// A type guard is a runtime check whose result helps TypeScript narrow a type.
//
// function isString(value: unknown): value is string {
//   return typeof value === "string";
// }

function isString(value) {
  return typeof value === "string";
}

console.log(isString("hello"));
console.log(isString(10));

// ============================================================
// 36. `in` NARROWING
// ============================================================

function describeResponse(response) {
  if ("data" in response) {
    return `Success: ${response.data}`;
  }

  return `Failure: ${response.message}`;
}

console.log(describeResponse({ data: "OK" }));
console.log(describeResponse({ message: "Bad request" }));

// ============================================================
// 37. `instanceof` NARROWING
// ============================================================

function describeError(value) {
  if (value instanceof Error) {
    return value.message;
  }

  return String(value);
}

console.log(describeError(new Error("Something failed")));
console.log(describeError("unknown failure"));

// ============================================================
// 38. NULLISH VALUES
// ============================================================
// strictNullChecks is one of TypeScript's most valuable safety options.
// With it enabled, null and undefined are treated explicitly rather than being
// silently assignable to most other types.

function displayName(value) {
  return value ?? "Anonymous";
}

console.log(displayName("Ravi"));
console.log(displayName(null));
console.log(displayName(undefined));

// ============================================================
// 39. TYPE ASSERTION VS RUNTIME VALIDATION
// ============================================================
// This is a critical full-stack concept:
//
// Type assertion:
//   tells the compiler what you believe.
//
// Runtime validation:
//   checks what actually arrived.
//
// Data from APIs, localStorage, files, users, and databases can violate your
// compile-time assumptions.

function isUser(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.id === "number" &&
    typeof value.name === "string"
  );
}

console.log(isUser({ id: 1, name: "Ravi" }));
console.log(isUser({ id: "1", name: "Ravi" }));

// ============================================================
// 40. TYPE PREDICATES AND VALIDATION
// ============================================================
// In TypeScript, a function can return `value is User` to tell the compiler
// that a successful check narrows the value to User.
//
// function isUser(value: unknown): value is User { ... }
//
// The runtime implementation still has to perform the actual checks.

// ============================================================
// 41. `as const`
// ============================================================
// `as const` narrows literals and makes properties readonly in the type system.
//
// const config = {
//   mode: "dark",
//   version: 1,
// } as const;
//
// Runtime values are still ordinary JavaScript objects unless separately
// frozen.

const constantConfig = Object.freeze({ mode: "dark", version: 1 });
console.log(constantConfig);

// ============================================================
// 42. `satisfies`
// ============================================================
// TypeScript's `satisfies` operator checks that an expression conforms to a
// type while generally preserving the expression's more specific inferred
// information.
//
// const routes = {
//   home: "/",
//   profile: "/profile",
// } satisfies Record<string, string>;
//
// It is compile-time tooling only; it emits no runtime check.

// ============================================================
// 43. UTILITY TYPES
// ============================================================
// TypeScript includes reusable type transformations such as:
// - Partial<T>
// - Required<T>
// - Readonly<T>
// - Pick<T, K>
// - Omit<T, K>
// - Record<K, T>
// - Exclude<T, U>
// - Extract<T, U>
// - NonNullable<T>
// - ReturnType<T>
// - Parameters<T>
//
// Example:
// type User = { id: number; name: string; email: string };
// type UserUpdate = Partial<User>;
// type PublicUser = Omit<User, "email">;

function updateUser(user, changes) {
  return { ...user, ...changes };
}

const updatedUser = updateUser(
  { id: 1, name: "Ravi", email: "ravi@example.com" },
  { name: "Ravi Kumar" },
);

console.log(updatedUser);

// ============================================================
// 44. MAPPED TYPES — CONCEPT
// ============================================================
// Mapped types transform keys of another type.
//
// type Optional<T> = {
//   [K in keyof T]?: T[K];
// };
//
// They are a major part of advanced TypeScript API design.

// ============================================================
// 45. CONDITIONAL TYPES — CONCEPT
// ============================================================
// Conditional types choose a type based on another type.
//
// type IsString<T> = T extends string ? true : false;
//
// They are evaluated by the TypeScript type system, not at runtime.

// ============================================================
// 46. `infer` — CONCEPT
// ============================================================
// `infer` lets conditional types extract a type from another type.
//
// type ElementType<T> = T extends Array<infer U> ? U : never;
//
// This is compile-time metaprogramming, not runtime JavaScript.

// ============================================================
// 47. TEMPLATE LITERAL TYPES — CONCEPT
// ============================================================
// TypeScript can build string literal types.
//
// type EventName = `user:${"created" | "deleted"}`;
// // "user:created" | "user:deleted"

function makeEventName(action) {
  return `user:${action}`;
}

console.log(makeEventName("created"));

// ============================================================
// 48. INDEX SIGNATURES
// ============================================================
// Useful when keys are not known ahead of time.
//
// type Scores = {
//   [username: string]: number;
// };

const scoresByUser = {
  Ravi: 95,
  Amit: 88,
};

console.log(scoresByUser);

// ============================================================
// 49. RECORD
// ============================================================
// Record<K, V> describes an object mapping keys to values.
//
// type Scores = Record<string, number>;

// ============================================================
// 50. FUNCTION OVERLOADS — CONCEPT
// ============================================================
// TypeScript overloads allow multiple call signatures for one implementation.
//
// function parseValue(value: string): string[];
// function parseValue(value: string[]): string[];
// function parseValue(value: string | string[]) {
//   return Array.isArray(value) ? value : value.split(",");
// }

function parseValue(value) {
  return Array.isArray(value) ? value : value.split(",");
}

console.log(parseValue("a,b,c"));
console.log(parseValue(["a", "b"]));

// ============================================================
// 51. CLASSES IN TYPESCRIPT
// ============================================================
// TypeScript adds type annotations and access modifiers to JavaScript classes.
//
// class UserService {
//   private prefix: string;
//   constructor(prefix: string) {
//     this.prefix = prefix;
//   }
// }
//
// Important distinction:
// TypeScript `private` is a compile-time restriction.
// JavaScript `#private` is runtime-enforced private state.

class UserService {
  constructor(prefix) {
    this.prefix = prefix;
  }

  getLabel(name) {
    return `${this.prefix}: ${name}`;
  }
}

const service = new UserService("User");
console.log(service.getLabel("Ravi"));

// ============================================================
// 52. `private` VS `#private`
// ============================================================
// TypeScript:
//   private value: string;
//   -> compiler-enforced access restriction
//
// JavaScript:
//   #value;
//   -> runtime private field

class Counter {
  #value = 0;

  increment() {
    this.#value += 1;
    return this.#value;
  }
}

const counter = new Counter();
console.log(counter.increment(), counter.increment());

// ============================================================
// 53. ABSTRACT CLASSES — CONCEPT
// ============================================================
// TypeScript can define abstract classes and abstract methods.
//
// abstract class Repository {
//   abstract findById(id: number): unknown;
// }
//
// An abstract class is a compile-time design constraint; emitted JavaScript
// does not enforce the abstract keyword in the same way.

// ============================================================
// 54. IMPLEMENTS
// ============================================================
// `implements` checks that a class conforms to an interface/type.
//
// interface Logger {
//   log(message: string): void;
// }
//
// class ConsoleLogger implements Logger {
//   log(message: string) {
//     console.log(message);
//   }
// }

class ConsoleLogger {
  log(message) {
    console.log("LOG:", message);
  }
}

new ConsoleLogger().log("implements-like runtime behavior");

// ============================================================
// 55. DECLARATION MERGING — CONCEPT
// ============================================================
// Interfaces with the same name can merge in TypeScript.
//
// interface User { id: number; }
// interface User { name: string; }
//
// The resulting interface requires both properties.
// Type aliases do not support the same declaration merging behavior.

// ============================================================
// 56. MODULE TYPES
// ============================================================
// TypeScript supports ES modules:
//
// export type User = { id: number; name: string };
// export function createUser(...) { ... }
//
// import { createUser } from "./users";
//
// Type-only imports can be written with `import type` when appropriate.

// ============================================================
// 57. TYPE-ONLY IMPORTS/EXPORTS
// ============================================================
// Example:
// import type { User } from "./types";
// export type { User };
//
// These communicate that the imported/exported item is only needed by the
// type system and should not become a runtime dependency.

// ============================================================
// 58. MODULE RESOLUTION — CONCEPT
// ============================================================
// TypeScript must determine what an import refers to. Configuration such as
// `module`, `moduleResolution`, package exports, path aliases, and Node/browser
// conventions affects this process.
//
// Keep runtime module resolution and TypeScript type resolution conceptually
// separate: a path that type-checks still needs to resolve at runtime.

// ============================================================
// 59. `tsconfig.json`
// ============================================================
// A typical project config controls compiler behavior:
//
// {
//   "compilerOptions": {
//     "target": "ES2022",
//     "module": "NodeNext",
//     "moduleResolution": "NodeNext",
//     "strict": true,
//     "noUncheckedIndexedAccess": true,
//     "exactOptionalPropertyTypes": true,
//     "noEmitOnError": true
//   }
// }
//
// Exact options depend on the project and runtime.

// ============================================================
// 60. STRICT MODE
// ============================================================
// `strict: true` enables a family of stronger checks.
// Important checks include strictNullChecks, noImplicitAny, strictFunctionTypes,
// and others.
//
// Strong defaults catch more mistakes but require more deliberate typing.

// ============================================================
// 61. `noImplicitAny`
// ============================================================
// Without enough type information, TypeScript may infer or report `any` in
// places. noImplicitAny helps prevent accidental untyped values.
//
// function add(a, b) { ... }
//
// In a strict TypeScript project, annotate or infer the parameters properly.

// ============================================================
// 62. STRICT NULL CHECKS
// ============================================================
// With strictNullChecks:
//
// let name: string = null; // error
//
// You must represent optionality explicitly:
//
// let name: string | null = null;

function getFirstName(user) {
  return user?.name ?? "Unknown";
}

console.log(getFirstName(null));
console.log(getFirstName({ name: "Ravi" }));

// ============================================================
// 63. NOUNSAFE INDEXING MINDSET
// ============================================================
// noUncheckedIndexedAccess can make array/object indexed access include
// undefined when the compiler cannot prove the key exists.
//
// const item = names[100];
// // potentially undefined

const maybeName = names[100];
console.log("Missing array item:", maybeName);

// ============================================================
// 64. TYPE INFERENCE WITH ARRAYS
// ============================================================
// TypeScript may infer an array's element type from its values.
//
// const numbers = [1, 2, 3]; // number[]
// const mixed = [1, "two"]; // (number | string)[]

const mixed = [1, "two"];
console.log(mixed);

// ============================================================
// 65. READONLY ARRAYS
// ============================================================
// TypeScript:
// const values: readonly number[] = [1, 2, 3];
// values.push(4); // compiler error
//
// Readonly is a type-system restriction, not automatic deep freezing.

const readonlyLike = Object.freeze([1, 2, 3]);
console.log(readonlyLike);

// ============================================================
// 66. `unknown` FOR API DATA
// ============================================================
// A strong pattern for external data:
//
// const raw: unknown = await response.json();
// if (!isUser(raw)) throw new Error("Invalid API response");
//
// After validation, TypeScript can safely treat raw as User.

function parseApiUser(raw) {
  if (!isUser(raw)) {
    throw new TypeError("Invalid user payload");
  }
  return raw;
}

console.log(parseApiUser({ id: 10, name: "Ravi" }));

// ============================================================
// 67. ZOD / RUNTIME SCHEMAS — CONCEPT
// ============================================================
// Libraries such as Zod can define runtime schemas and derive TypeScript
// types. The key lesson is that compile-time types alone cannot validate JSON.
//
// Conceptual example:
// const UserSchema = z.object({
//   id: z.number(),
//   name: z.string(),
// });
// type User = z.infer<typeof UserSchema>;
//
// This combines runtime validation with static type information.

// ============================================================
// 68. TYPE ASSERTION IS NOT CONVERSION
// ============================================================
// `value as number` does not convert "42" into 42.
// Runtime conversion requires Number(value).

const stringNumber = "42";
const convertedNumber = Number(stringNumber);

console.log(typeof stringNumber, typeof convertedNumber, convertedNumber);

// ============================================================
// 69. `unknown` VS `any`
// ============================================================
// unknown:
//   safe boundary; narrow before use.
//
// any:
//   escape hatch; compiler largely stops checking that value.
//
// Prefer unknown for external/untrusted data.

// ============================================================
// 70. `object` VS `Record`
// ============================================================
// `object` means a non-primitive value, but says little about its properties.
// `Record<string, unknown>` communicates a string-keyed object more explicitly.
//
// type Payload = Record<string, unknown>;

// ============================================================
// 71. GENERIC API RESPONSE
// ============================================================
// A common full-stack pattern:
//
// type ApiResponse<T> = {
//   success: boolean;
//   data: T;
//   message?: string;
// };
//
// Then ApiResponse<User> and ApiResponse<Note> share the same structure while
// preserving their data types.

function createApiResponse(data, message) {
  return {
    success: true,
    data,
    ...(message ? { message } : {}),
  };
}

console.log(createApiResponse({ id: 1, name: "Ravi" }, "User loaded"));

// ============================================================
// 72. GENERIC REPOSITORY — CONCEPT
// ============================================================
// TypeScript can model reusable repository contracts:
//
// interface Repository<T> {
//   findById(id: string): Promise<T | null>;
//   save(value: T): Promise<T>;
// }
//
// This allows UserRepository and NoteRepository to share a generic contract.

// ============================================================
// 73. GENERIC DEFAULTS
// ============================================================
// Type parameters can have defaults.
//
// type ApiResponse<T = unknown> = {
//   data: T;
// };
//
// ApiResponse defaults to unknown when no specific type is supplied.

// ============================================================
// 74. GENERIC FACTORY
// ============================================================
// TypeScript can preserve relationships through generic factory functions.

function createBox(value) {
  return { value };
}

const stringBox = createBox("hello");
const numberBox = createBox(123);

console.log(stringBox, numberBox);

// ============================================================
// 75. TYPE-SAFE EVENT MAP — CONCEPT
// ============================================================
// Advanced TypeScript can map event names to their payload types:
//
// type Events = {
//   userCreated: { id: number };
//   userDeleted: { id: number };
// };
//
// A generic event emitter can then require the correct payload for each event.

// ============================================================
// 76. TYPE-SAFE ROUTES — CONCEPT
// ============================================================
// Template literal types can help model route strings, but runtime routing
// still depends on the router and actual input.
//
// type UserRoute = `/users/${number}`;

function userRoute(id) {
  return `/users/${id}`;
}

console.log(userRoute(42));

// ============================================================
// 77. DOM TYPES — CONCEPT
// ============================================================
// In a browser TypeScript project, DOM libraries provide types such as:
// HTMLInputElement, HTMLButtonElement, MouseEvent, KeyboardEvent, etc.
//
// const input = document.querySelector("#email");
//
// TypeScript may infer Element | null, so you often narrow or use a generic:
// const input = document.querySelector<HTMLInputElement>("#email");
//
// Always account for null when an element may not exist.

// ============================================================
// 78. EVENT HANDLER TYPES — CONCEPT
// ============================================================
// TypeScript can distinguish event types:
//
// input.addEventListener("input", (event) => {
//   const target = event.currentTarget as HTMLInputElement;
//   console.log(target.value);
// });
//
// Avoid unsafe assertions when a better narrowing strategy is available.

// ============================================================
// 79. NODE TYPES — CONCEPT
// ============================================================
// Node projects can use type definitions for Node APIs and packages.
//
// Example configuration may include:
//   "types": ["node"]
//
// Do not assume browser globals such as window exist in a Node runtime.

// ============================================================
// 80. DECLARATION FILES
// ============================================================
// `.d.ts` files describe types without containing the normal emitted runtime
// implementation.
//
// Example:
// declare function legacyApi(input: string): number;
//
// Declaration files are useful when consuming untyped JavaScript libraries or
// describing global/module APIs.

// ============================================================
// 81. AMBIENT DECLARATIONS
// ============================================================
// `declare` tells TypeScript that something exists elsewhere.
// It does not create that runtime value.
//
// declare const API_URL: string;
//
// If API_URL is actually missing at runtime, the program still fails.

// ============================================================
// 82. JAVASCRIPT CHECKING
// ============================================================
// TypeScript can also type-check JavaScript with options such as:
//   // @ts-check
//
// and JSDoc annotations:
//   /** @type {number} */
//   const count = 10;
//
// This is useful for gradual migration from JavaScript.

// ============================================================
// 83. `@ts-ignore` — USE SPARINGLY
// ============================================================
// `@ts-ignore` suppresses a TypeScript diagnostic on the following line.
// It can hide real problems and should not become the default solution.
//
// Prefer fixing the type model, narrowing correctly, or using a precise
// assertion when the runtime fact is genuinely known.

// ============================================================
// 84. `@ts-expect-error`
// ============================================================
// `@ts-expect-error` documents that an error is intentionally expected. If the
// expected error disappears, TypeScript can report that the directive is no
// longer necessary.
//
// This is useful for testing compiler behavior.

// ============================================================
// 85. TYPE-LEVEL VS RUNTIME CODE
// ============================================================
// Type-level:
//   interface, type, generic parameters, conditional types, mapped types.
//
// Runtime:
//   functions, objects, classes, validation, HTTP requests, database calls.
//
// Keeping this distinction clear prevents a common TypeScript misconception:
// types do not automatically exist at runtime.

// ============================================================
// 86. TYPE ERASURE
// ============================================================
// Example TypeScript:
//
// function add(a: number, b: number): number {
//   return a + b;
// }
//
// Emitted JavaScript is conceptually:
//
// function add(a, b) {
//   return a + b;
// }
//
// The runtime does not know that a and b were declared as number.

// ============================================================
// 87. COMPILE-TIME ERROR VS RUNTIME ERROR
// ============================================================
// Compile-time/type error:
//   TypeScript rejects invalid type relationships before execution.
//
// Runtime error:
//   JavaScript executes and encounters an invalid operation.
//
// TypeScript reduces many categories of mistakes but cannot eliminate runtime
// failures caused by data, environment, logic, I/O, or incorrect assumptions.

// ============================================================
// 88. TYPE SAFETY DOES NOT EQUAL BUSINESS CORRECTNESS
// ============================================================
// This can be perfectly typed but logically wrong:

function calculateTotal(price, quantity) {
  return price - quantity; // Type-correct shape, incorrect business rule.
}

console.log("Typed-but-wrong logic example:", calculateTotal(100, 2));

// A type system verifies types, not whether your formula matches the product
// requirements.

// ============================================================
// 89. TYPE NARROWING WITH ARRAY METHODS
// ============================================================
// TypeScript understands many JavaScript control-flow patterns and built-ins.

const values = [1, "two", 3, "four"];
const onlyStrings = values.filter(isString);

console.log(onlyStrings);

// ============================================================
// 90. GENERIC FILTERING — CONCEPT
// ============================================================
// Advanced TypeScript can use type predicates with Array.filter to narrow the
// resulting array type.
//
// function isString(value: unknown): value is string { ... }
// const strings = values.filter(isString); // string[]

// ============================================================
// 91. EXHAUSTIVENESS CHECKING
// ============================================================
// A `never` helper can catch missing union cases at compile time.
//
// function assertNever(value: never): never {
//   throw new Error(`Unexpected value: ${value}`);
// }
//
// switch (result.status) {
//   case "success": ...
//   case "error": ...
//   default: return assertNever(result);
// }

function assertNeverLike(value) {
  throw new Error(`Unexpected value: ${String(value)}`);
}

// ============================================================
// 92. TYPE-SAFE STATE MACHINES — CONCEPT
// ============================================================
// Discriminated unions are excellent for UI/network states:
//
// type State =
//   | { status: "idle" }
//   | { status: "loading" }
//   | { status: "success"; data: User }
//   | { status: "error"; message: string };
//
// This makes impossible state combinations harder to represent.

function stateLabel(state) {
  switch (state.status) {
    case "idle":
      return "Idle";
    case "loading":
      return "Loading";
    case "success":
      return `Loaded ${state.data.name}`;
    case "error":
      return `Error: ${state.message}`;
    default:
      return assertNeverLike(state.status);
  }
}

console.log(stateLabel({ status: "idle" }));
console.log(stateLabel({ status: "success", data: { name: "Ravi" } }));

// ============================================================
// 93. BRANDED TYPES — CONCEPT
// ============================================================
// TypeScript can simulate nominal distinctions using intersections with unique
// markers even though ordinary string/number types are structurally typed.
//
// type UserId = string & { readonly __brand: "UserId" };
// type OrderId = string & { readonly __brand: "OrderId" };
//
// This helps prevent accidentally passing one identifier where another is
// expected. The brand itself is erased at runtime, so runtime validation may
// still be needed for external data.

// ============================================================
// 94. STRUCTURAL TYPING
// ============================================================
// TypeScript is primarily structurally typed: compatibility is based on the
// shape members have, rather than only on nominal class names.
//
// type Point = { x: number; y: number };
// const point3D = { x: 1, y: 2, z: 3 };
// A Point requirement can accept point3D because it has x and y.

const point3D = { x: 1, y: 2, z: 3 };
function printPoint(point) {
  return `(${point.x}, ${point.y})`;
}

console.log(printPoint(point3D));

// ============================================================
// 95. EXCESS PROPERTY CHECKING — CONCEPT
// ============================================================
// Object literals can receive stricter excess-property checking when assigned
// directly to a target type. Variables can behave differently because the
// compiler reasons about their inferred structural type.
//
// This is one reason TypeScript's structural type system needs to be understood
// rather than treated as simple class-based typing.

// ============================================================
// 96. TYPE COMPATIBILITY
// ============================================================
// The compiler determines whether values can safely be assigned based on their
// types. Function parameter variance has additional rules and deserves careful
// attention when designing callbacks and APIs.

// ============================================================
// 97. FUNCTION RETURN INFERENCE
// ============================================================
// TypeScript can infer many return types.
//
// function multiply(a: number, b: number) {
//   return a * b;
// }
// // inferred return type: number
//
// Explicit return annotations can still improve public API clarity and catch
// accidental changes.

// ============================================================
// 98. PUBLIC API TYPE ANNOTATIONS
// ============================================================
// For reusable libraries/services, explicit public signatures can document the
// contract while implementation details remain inferred internally.

// ============================================================
// 99. TYPE-DRIVEN DEVELOPMENT
// ============================================================
// A useful workflow:
// 1. Define the domain model.
// 2. Define valid states and transitions.
// 3. Define function/API contracts.
// 4. Implement behavior.
// 5. Validate external data at runtime.
// 6. Test behavior.
//
// Types become design documentation and compiler-enforced constraints.

// ============================================================
// 100. TYPES FOR A NOTES APP
// ============================================================
// Example domain types:
//
// type Note = {
//   id: string;
//   title: string;
//   content: string;
//   ownerId: string;
//   folderId: string | null;
//   isPinned: boolean;
//   isArchived: boolean;
// };
//
// type CreateNoteInput = Pick<Note, "title" | "content" | "folderId">;
// type UpdateNoteInput = Partial<CreateNoteInput>;
//
// This is especially useful for frontend/backend contracts.

function createNote(input) {
  return {
    id: `note-${Date.now()}`,
    title: input.title,
    content: input.content,
    folderId: input.folderId ?? null,
    isPinned: false,
    isArchived: false,
  };
}

console.log(
  createNote({
    title: "Learn TypeScript",
    content: "Study generics and narrowing.",
    folderId: null,
  }),
);

// ============================================================
// 101. TYPE-SAFE REDUCERS — CONCEPT
// ============================================================
// Discriminated action unions work well with reducers:
//
// type Action =
//   | { type: "increment" }
//   | { type: "add"; amount: number }
//   | { type: "reset" };
//
// The reducer can narrow action based on action.type.

function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "add":
      return state + action.amount;
    case "reset":
      return 0;
    default:
      return assertNeverLike(action.type);
  }
}

console.log(counterReducer(0, { type: "increment" }));
console.log(counterReducer(1, { type: "add", amount: 4 }));
console.log(counterReducer(99, { type: "reset" }));

// ============================================================
// 102. TYPE-SAFE ERROR MODEL
// ============================================================
// Expected failures can be represented explicitly:
//
// type Result<T, E> =
//   | { ok: true; value: T }
//   | { ok: false; error: E };
//
// This can make error handling explicit without relying on exceptions for every
// expected branch.

function success(value) {
  return { ok: true, value };
}

function failure(error) {
  return { ok: false, error };
}

function parseNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? success(number) : failure("Invalid number");
}

console.log(parseNumber("42"));
console.log(parseNumber("abc"));

// ============================================================
// 103. TYPESCRIPT + TESTING
// ============================================================
// TypeScript catches many compile-time mismatches; tests check runtime
// behavior. You need both.
//
// Type checking cannot prove that a discount is calculated correctly.
// A test can verify that business rule.

function discountPrice(price, percentage) {
  return price - price * (percentage / 100);
}

if (discountPrice(1000, 10) !== 900) {
  throw new Error("Business-rule test failed");
}

// ============================================================
// 104. TYPESCRIPT + API CLIENTS
// ============================================================
// Types can describe expected response shapes, but fetch() does not guarantee
// the server actually returned that shape.
//
// Correct architecture:
// HTTP response -> runtime validation -> trusted typed domain object
//
// Not:
// HTTP response -> `as User` -> assume it is correct

// ============================================================
// 105. TYPESCRIPT + DATABASES
// ============================================================
// Database records are runtime data. Generated ORM types can improve developer
// experience, but database constraints and runtime validation still matter.
//
// Keep domain models, persistence models, and API DTOs distinct when their
// responsibilities differ.

// ============================================================
// 106. DTOs
// ============================================================
// DTO = Data Transfer Object.
//
// A DTO defines the shape crossing an application boundary, such as an HTTP
// request/response. Do not automatically expose your database model as your API
// contract.

function toUserDto(user) {
  return {
    id: user.id,
    name: user.name,
  };
}

console.log(toUserDto({ id: 1, name: "Ravi", passwordHash: "secret" }));

// ============================================================
// 107. TYPESCRIPT AND SECURITY
// ============================================================
// TypeScript does not sanitize HTML, authorize users, hash passwords, or stop
// attackers from sending malicious data.
//
// Security controls remain runtime/server responsibilities.

// ============================================================
// 108. COMMON TYPESCRIPT MISTAKES
// ============================================================
// 1. Using any everywhere.
// 2. Believing type assertions validate data.
// 3. Disabling strict mode to silence errors.
// 4. Ignoring null/undefined.
// 5. Exposing database models directly as public API types.
// 6. Overusing enums when literal unions are simpler.
// 7. Creating huge complicated generic types without need.
// 8. Assuming third-party type definitions guarantee runtime behavior.
// 9. Using @ts-ignore instead of fixing the underlying problem.
// 10. Treating TypeScript as a replacement for tests.
// 11. Forgetting that types disappear at runtime.
// 12. Using a broad object type when a precise domain shape is needed.

// ============================================================
// 109. DEBUGGING TYPESCRIPT
// ============================================================
// When TypeScript reports an error:
// 1. Read the full diagnostic.
// 2. Identify the source type.
// 3. Identify the expected type.
// 4. Ask why the types differ.
// 5. Fix the model or the implementation.
// 6. Narrow unknown values correctly.
// 7. Use assertions only when a runtime fact is genuinely guaranteed.
// 8. Avoid suppressing errors before understanding them.

// ============================================================
// 110. OUTPUT PREDICTION
// ============================================================
// Predict first:

const outputPrediction = [1, 2, 3]
  .map((n) => n * 2)
  .filter((n) => n > 2);

console.log("Output prediction:", outputPrediction); // [4, 6]

// ============================================================
// 111. MINI CHALLENGES — BEGINNER
// ============================================================
// 1. Convert a JS user object into a TypeScript User type.
// 2. Add parameter and return types to five functions.
// 3. Create a type alias for a product.
// 4. Create an interface for a note.
// 5. Practice optional properties.
// 6. Practice readonly properties.
// 7. Create a string | number union.
// 8. Write a typeof-based narrowing function.
// 9. Create a literal union for themes.
// 10. Explain any vs unknown.

// ============================================================
// 112. MINI CHALLENGES — INTERMEDIATE
// ============================================================
// 11. Create a generic identity function.
// 12. Create a generic first() function.
// 13. Add a generic constraint using extends.
// 14. Create an ApiResponse<T> type.
// 15. Model loading/success/error UI state as a discriminated union.
// 16. Create a Result<T, E> type.
// 17. Use Pick/Omit/Partial for DTOs.
// 18. Write a type guard for a User.
// 19. Create a generic repository interface.
// 20. Model a Notes application's CreateNoteInput and UpdateNoteInput.

// ============================================================
// 113. MINI CHALLENGES — ADVANCED
// ============================================================
// 21. Create a generic event emitter type map.
// 22. Build an exhaustive switch with assertNever().
// 23. Create a branded UserId type.
// 24. Create a type-safe route template.
// 25. Write a conditional type that extracts array element types.
// 26. Write a mapped type that makes every property nullable.
// 27. Build a generic API client contract.
// 28. Model a state machine for authentication.
// 29. Separate API DTOs from domain entities and persistence models.
// 30. Add runtime schema validation to an external API response.

// ============================================================
// 114. DEBUGGING CHALLENGES
// ============================================================
// Debug this conceptual TypeScript code:
//
// const user: User = JSON.parse(responseText);
//
// Problem:
// JSON.parse() returns runtime data; the declared type does not validate it.
// Solution:
// Parse as unknown, validate the structure, then use the validated value.
//
// Debug:
//
// const id = input as number;
// console.log(id.toFixed(2));
//
// Problem:
// The assertion does not convert a string into a number.
// Solution:
// const id = Number(input);
// Then validate Number.isFinite(id) if required.
//
// Debug:
//
// function getName(user: User) {
//   return user.profile.name;
// }
//
// Problem:
// The type may incorrectly claim profile always exists when runtime data can
// omit it. Model optionality correctly and validate external data.

// ============================================================
// 115. INTERVIEW QUESTIONS
// ============================================================
// Beginner:
// - What is TypeScript?
// - Why use TypeScript with JavaScript?
// - Static vs dynamic typing?
// - What is type inference?
// - What is any?
// - unknown vs any?
// - What is a union type?
// - What is an interface?
//
// Intermediate:
// - What is type narrowing?
// - What are generics?
// - What is a type guard?
// - Type alias vs interface?
// - What is structural typing?
// - What are utility types?
// - What is a discriminated union?
// - Why is strictNullChecks useful?
// - What is a declaration file?
//
// Advanced:
// - What is type erasure?
// - What are conditional and mapped types?
// - What does infer do?
// - How do branded types simulate nominal distinctions?
// - How would you type a generic API client?
// - Why do compile-time types not replace runtime validation?
// - How would you design types for a full-stack Notes application?
// - How do you avoid overengineering the type system?

// ============================================================
// 116. TEACH-BACK QUESTIONS
// ============================================================
// Explain without notes:
// 1. What problem does TypeScript solve?
// 2. What happens to types after compilation?
// 3. Type inference vs annotation?
// 4. any vs unknown?
// 5. What is narrowing?
// 6. What is a generic?
// 7. What is a type guard?
// 8. What is structural typing?
// 9. What is a discriminated union?
// 10. What is a type assertion?
// 11. Why does `as User` not validate API JSON?
// 12. What are utility types?
// 13. Why use strict mode?
// 14. What is a `.d.ts` file?
// 15. How would you combine TypeScript with runtime validation?

// ============================================================
// 117. MASTER MENTAL MODEL
// ============================================================
// Think of TypeScript as a development-time safety and design layer:
//
//       JAVASCRIPT CODE
//             |
//             v
//     +-----------------+
//     | TypeScript types |
//     | inference        |
//     | control-flow     |
//     | generics         |
//     +-----------------+
//             |
//             v
//       COMPILER CHECKS
//             |
//             v
//       JAVASCRIPT OUTPUT
//             |
//             v
//        RUNTIME DATA
//             |
//             v
//     VALIDATE EXTERNAL INPUT
//             |
//             v
//       BUSINESS LOGIC
//             |
//             v
//            TESTS
//
// Final rules:
// 1. TypeScript improves developer-time correctness.
// 2. Types are not runtime validation.
// 3. Prefer unknown at untrusted boundaries.
// 4. Narrow before operating on uncertain values.
// 5. Use generics to preserve relationships, not to show off complexity.
// 6. Model valid states explicitly with unions when useful.
// 7. Keep public contracts precise.
// 8. Use strict compiler settings for serious projects.
// 9. Keep runtime security and validation separate from compile-time typing.
// 10. Use tests to verify behavior that the type system cannot prove.

console.log("=== TypeScript chapter loaded ===");
