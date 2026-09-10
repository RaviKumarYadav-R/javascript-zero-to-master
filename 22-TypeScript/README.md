# 22 — TypeScript

> A JavaScript-first TypeScript guide from absolute beginner to advanced: types, inference, functions, objects, unions, narrowing, generics, utility types, modules, classes, async code, DOM/React/Node patterns, declaration files, compiler configuration, type design, runtime validation, testing, architecture, and production practices.

## Learning Goal

TypeScript adds a static type system to JavaScript. The goal is not to make JavaScript disappear; it is to make JavaScript programs easier to understand, refactor, validate during development, and maintain at scale.

## 1. What Is TypeScript?

TypeScript is a language and toolchain that adds static type-checking and other development features to JavaScript.

## 2. TypeScript and JavaScript

TypeScript is designed to be compatible with JavaScript and is transformed into JavaScript for environments that execute JavaScript.

## 3. Static Type Checking

TypeScript can detect many incorrect assumptions before the program runs.

## 4. Runtime Reality

Type annotations are not runtime validation. External input can still violate a TypeScript type.

## 5. First Example

```ts
function add(a: number, b: number): number {
  return a + b;
}

const total = add(2, 3);
```

## 6. Type Annotation

A type annotation explicitly states the intended type of a value, parameter, property, or return value.

## 7. Type Inference

TypeScript often infers types without requiring explicit annotations.

```ts
const name = "Ravi"; // string
const age = 21;       // number
```

## 8. Annotation vs Inference

Prefer inference when the type is obvious; annotate public contracts, complex values, and important boundaries when it improves clarity.

## 9. Primitive Types

Important primitive types include `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, and `undefined`.

## 10. `string`

```ts
let username: string = "Ravi";
```

## 11. `number`

```ts
let score: number = 95;
```

## 12. `boolean`

```ts
let isLoggedIn: boolean = true;
```

## 13. `bigint`

```ts
const huge: bigint = 9007199254740993n;
```

## 14. `symbol`

```ts
const token: symbol = Symbol("token");
```

## 15. `null`

`null` represents an intentional absence of a value.

## 16. `undefined`

`undefined` commonly represents an unassigned or missing value.

## 17. `strictNullChecks`

With strict null checking enabled, `null` and `undefined` are not silently assignable to unrelated types.

## 18. Arrays

```ts
const scores: number[] = [10, 20, 30];
const names: Array<string> = ["A", "B"];
```

## 19. Array Generic Syntax

`Array<T>` and `T[]` commonly express arrays of `T`.

## 20. Readonly Arrays

```ts
const values: readonly number[] = [1, 2, 3];
```

## 21. Tuple

A tuple represents a fixed positional structure.

```ts
const point: [number, number] = [10, 20];
```

## 22. Tuple Labels

```ts
type Point = [x: number, y: number];
```

## 23. Optional Tuple Element

```ts
type Response = [status: number, body?: string];
```

## 24. Rest Tuple

```ts
type RGB = [number, number, number, ...number[]];
```

## 25. Object Type

```ts
type User = {
  id: string;
  name: string;
};
```

## 26. Optional Property

```ts
type User = {
  id: string;
  nickname?: string;
};
```

## 27. Optional Means Possibly Undefined

With appropriate compiler settings, reading an optional property requires handling the possibility of `undefined`.

## 28. Readonly Property

```ts
type Config = {
  readonly apiUrl: string;
};
```

## 29. Readonly Is Type-Level

`readonly` prevents assignment through the typed property; it does not freeze an object at runtime.

## 30. Index Signature

```ts
type Scores = {
  [player: string]: number;
};
```

## 31. Property Key Types

Object property keys are commonly represented by `string`, `number`, or `symbol` in TypeScript's type system.

## 32. Function Type

```ts
type Operation = (a: number, b: number) => number;
```

## 33. Function Parameter Annotation

```ts
function greet(name: string) {
  return `Hello ${name}`;
}
```

## 34. Return Type Annotation

```ts
function square(n: number): number {
  return n * n;
}
```

## 35. Return Type Inference

TypeScript can infer `number` for `square` without an explicit return annotation.

## 36. `void`

`void` commonly describes functions whose useful result is absent.

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

## 37. `never`

`never` describes values that cannot occur, such as a function that always throws or an impossible narrowed branch.

## 38. `any`

`any` disables much of TypeScript's checking for a value and should be used deliberately.

## 39. `unknown`

`unknown` is the safe top type for values whose type is not yet known.

## 40. `unknown` Requires Narrowing

```ts
function print(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

## 41. `any` vs `unknown`

Prefer `unknown` for untrusted or dynamic values because it forces validation before unsafe operations.

## 42. `object`

The `object` type represents non-primitive values, but a specific object shape is usually more useful.

## 43. `{}`

`{}` is not a synonym for an empty object literal shape; it has broader assignability semantics. Avoid using it when you mean `{}` as a runtime object.

## 44. `Object`

Avoid using the broad `Object` type for ordinary application data; define the required shape instead.

## 45. Literal Types

```ts
let direction: "left" | "right" = "left";
```

## 46. String Literal Union

Literal unions are useful for finite sets of allowed values.

## 47. Numeric Literal

```ts
type HttpStatus = 200 | 201 | 400 | 404 | 500;
```

## 48. Boolean Literal

Boolean literals can participate in discriminated unions and precise control-flow types.

## 49. Union Types

A union means a value may be one of several types.

```ts
type ID = string | number;
```

## 50. Union Mental Model

```text
string
   \ 
    → string | number
   /
number
```

## 51. Union Property Access

You can only directly use members common to all union alternatives until the value is narrowed.

## 52. Narrowing

Narrowing reduces a broad type to a more specific type using runtime-observable checks.

## 53. `typeof` Narrowing

```ts
function format(value: string | number) {
  if (typeof value === "string") return value.toUpperCase();
  return value.toFixed(2);
}
```

## 54. Equality Narrowing

Comparing values can narrow unions when TypeScript can reason about the relationship.

## 55. Truthiness Narrowing

Truthiness checks can narrow nullable values, but remember that valid falsy values such as `0` and `""` also exist.

## 56. `in` Narrowing

```ts
function area(shape: { radius: number } | { side: number }) {
  if ("radius" in shape) return Math.PI * shape.radius ** 2;
  return shape.side ** 2;
}
```

## 57. `instanceof` Narrowing

`instanceof` can narrow class instances when runtime prototypes provide the relevant relationship.

## 58. User-Defined Type Guard

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}
```

## 59. Type Predicate

The `value is Type` return syntax tells TypeScript that a successful boolean result narrows the value.

## 60. Assertion Function

Assertion functions can tell TypeScript that execution continuing past a check satisfies a type condition.

## 61. Discriminated Union

A shared literal property can identify variants safely.

```ts
type Result =
  | { ok: true; value: string }
  | { ok: false; error: string };
```

## 62. Exhaustive Checking

Use `never` in a default branch to detect unhandled discriminated-union variants during compilation.

## 63. Exhaustive Example

```ts
function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${String(value)}`);
}
```

## 64. Intersection Types

An intersection combines requirements from multiple types.

```ts
type Timestamped = { createdAt: Date };
type Entity = { id: string };
type RecordItem = Timestamped & Entity;
```

## 65. Union vs Intersection

`A | B` means A or B; `A & B` means a value must satisfy both.

## 66. Type Alias

```ts
type UserId = string;
```

## 67. Interface

```ts
interface User {
  id: string;
  name: string;
}
```

## 68. Type Alias vs Interface

Both can describe object shapes. Interfaces support declaration merging and are commonly used for extensible object contracts; type aliases are more flexible for unions, intersections, tuples, and aliases of arbitrary type expressions.

## 69. Interface Extension

```ts
interface Admin extends User {
  permissions: string[];
}
```

## 70. Interface Multiple Extension

An interface can extend multiple compatible interfaces.

## 71. Type Intersection Alternative

```ts
type Admin = User & { permissions: string[] };
```

## 72. Declaration Merging

Multiple interface declarations with the same name can merge when permitted by TypeScript's rules.

## 73. Structural Typing

TypeScript primarily checks compatibility by structure rather than nominal class identity.

## 74. Structural Typing Example

```ts
type Point = { x: number; y: number };
const location = { x: 1, y: 2, label: "origin" };
const point: Point = location;
```

## 75. Excess Property Checking

Fresh object literals receive additional checks that can catch unexpected properties when assigned to a target type.

## 76. Assignability

Type compatibility is about whether a value can safely be used where another type is expected.

## 77. Function Parameter Variance

Function compatibility has special rules around parameter positions; strict compiler settings help catch unsafe assignments.

## 78. `strictFunctionTypes`

This strictness option improves checking of function parameter compatibility, with specific historical behavior around methods.

## 79. Optional Parameters

```ts
function greet(name?: string) {}
```

## 80. Default Parameters

```ts
function greet(name = "Guest") {
  return name;
}
```

## 81. Rest Parameters

```ts
function sum(...values: number[]) {
  return values.reduce((a, b) => a + b, 0);
}
```

## 82. Optional Callback

Optional callbacks require checking before invocation unless the syntax/type structure already guarantees presence.

## 83. Function Overloads

Overloads describe multiple call signatures for one implementation.

## 84. Overload Example

```ts
function parse(value: string): number;
function parse(value: number): number;
function parse(value: string | number): number {
  return typeof value === "string" ? Number(value) : value;
}
```

## 85. Overload Implementation Signature

The implementation signature must be compatible with all overload signatures and is not itself the public overload list.

## 86. Overload vs Union

Use overloads when input/output relationships differ by call signature; use unions when one signature naturally describes the relationship.

## 87. Generic

Generics let code preserve relationships between types without hard-coding one concrete type.

## 88. Generic Identity

```ts
function identity<T>(value: T): T {
  return value;
}
```

## 89. Generic Inference

TypeScript can infer `T` from the argument in many calls.

## 90. Explicit Generic Argument

```ts
identity<string>("Ravi");
```

## 91. Generic Array Function

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}
```

## 92. Generic Constraint

```ts
function getId<T extends { id: string }>(value: T) {
  return value.id;
}
```

## 93. `extends` in Generics

A generic constraint says what capabilities the type parameter must provide; it does not mean classical inheritance in every generic use.

## 94. Multiple Generic Parameters

```ts
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}
```

## 95. Generic Interface

```ts
interface ApiResponse<T> {
  data: T;
  status: number;
}
```

## 96. Generic Type Alias

```ts
type Page<T> = {
  items: T[];
  total: number;
};
```

## 97. Generic Default

```ts
type Result<T = unknown> = { value: T };
```

## 98. `keyof`

`keyof T` produces a union of known property keys of `T`.

## 99. Generic Key Access

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

## 100. Indexed Access Type

`T[K]` obtains the type of a property selected by key type `K`.

## 101. `typeof` in Type Positions

TypeScript's type-level `typeof` can obtain the static type of an existing value.

## 102. `ReturnType`

`ReturnType<typeof fn>` extracts a function's return type.

## 103. `Parameters`

`Parameters<typeof fn>` extracts a function's parameter tuple type.

## 104. `InstanceType`

`InstanceType<typeof Class>` extracts the instance type produced by a construct signature.

## 105. Conditional Types

Conditional types choose a type based on a type relationship.

```ts
type IsString<T> = T extends string ? true : false;
```

## 106. Conditional Type Mental Model

```text
T extends X?
  ├─ yes → A
  └─ no  → B
```

## 107. Distributive Conditional Types

A conditional type using a naked type parameter can distribute over union members.

## 108. Prevent Distribution

Wrapping the type parameter in a tuple, such as `[T] extends [X]`, can prevent distributive behavior.

## 109. Mapped Types

Mapped types transform properties of an existing type.

```ts
type Optional<T> = {
  [K in keyof T]?: T[K];
};
```

## 110. Key Remapping

Mapped types can rename keys with `as` in supported TypeScript versions.

## 111. Template Literal Types

Template literal types build string unions from other string-like types.

```ts
type EventName = `user:${"created" | "deleted"}`;
```

## 112. Utility: `Partial`

`Partial<T>` makes properties optional.

## 113. Utility: `Required`

`Required<T>` makes optional properties required.

## 114. Utility: `Readonly`

`Readonly<T>` marks properties readonly at the type level.

## 115. Utility: `Pick`

`Pick<T, K>` selects properties from a type.

## 116. Utility: `Omit`

`Omit<T, K>` removes selected properties from a type.

## 117. Utility: `Record`

`Record<K, V>` constructs a type with keys `K` and values `V`.

## 118. Utility: `Exclude`

`Exclude<T, U>` removes from `T` members assignable to `U`.

## 119. Utility: `Extract`

`Extract<T, U>` keeps from `T` members assignable to `U`.

## 120. Utility: `NonNullable`

`NonNullable<T>` removes `null` and `undefined` from a type.

## 121. Utility: `Awaited`

`Awaited<T>` models recursively unwrapped Promise-like values.

## 122. Utility: `Uppercase`

String manipulation utilities can transform literal string types at compile time.

## 123. Utility: `Lowercase`

`Lowercase<T>` transforms string literal types to lowercase forms.

## 124. Utility: `Capitalize`

`Capitalize<T>` changes the first character of a string literal type to uppercase.

## 125. Utility: `Uncapitalize`

`Uncapitalize<T>` changes the first character to lowercase.

## 126. `as const`

`as const` preserves literal types and readonly characteristics for the expression it applies to.

## 127. Const Assertion Example

```ts
const config = {
  mode: "dark",
  retries: 3,
} as const;
```

## 128. `satisfies`

The `satisfies` operator checks that an expression conforms to a type while generally preserving the expression's more specific inferred type.

## 129. `satisfies` Example

```ts
type Theme = Record<string, string>;
const theme = {
  primary: "orange",
} satisfies Theme;
```

## 130. Type Assertion

```ts
const value = input as string;
```

## 131. Assertion Does Not Convert

`as string` changes TypeScript's static view; it does not convert a runtime value into a string.

## 132. Dangerous Assertion

Do not assert a value is valid merely to silence a compiler error when runtime data has not been checked.

## 133. Non-Null Assertion

```ts
const element = document.querySelector("#app")!;
```

## 134. Non-Null Assertion Risk

`!` tells the compiler to trust you; if the value is actually nullish, runtime failure remains possible.

## 135. Type Assertion vs Validation

```text
Assertion: "Trust me."
Validation: "I checked it."
```

## 136. `unknown` at Boundaries

Use `unknown` for parsed JSON, external API data, message payloads, and other values whose runtime shape has not yet been established.

## 137. JSON and TypeScript

`JSON.parse()` does not magically validate the resulting object against your TypeScript type.

## 138. Runtime Validation

Use explicit validation, schema libraries, or custom guards when runtime correctness depends on external input.

## 139. Schema Boundary

```text
External data
    ↓
unknown
    ↓
Runtime validation
    ↓
Trusted application type
```

## 140. Type Predicate Validation

Small custom type guards can validate simple shapes without a schema library.

## 141. Branded Type Concept

A branded type can distinguish values with the same runtime representation but different domain meanings.

## 142. Brand Example

```ts
type UserId = string & { readonly __brand: "UserId" };
```

## 143. Brand Caveat

Brands are compile-time conventions; they do not create runtime validation by themselves.

## 144. Nominal Modeling

Brands can approximate nominal distinctions when structural typing would otherwise allow accidental interchange.

## 145. `unique symbol`

`unique symbol` can represent distinct symbol types useful for advanced branding and library APIs.

## 146. Enums

Enums provide a TypeScript-specific runtime/type feature for named constants.

## 147. String Enums

```ts
enum Role {
  Admin = "admin",
  User = "user",
}
```

## 148. Enum Alternatives

Literal unions plus `as const` objects often provide simpler JavaScript output and tighter control over runtime representation.

## 149. Const Object Pattern

```ts
const ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;
type Role = typeof ROLES[keyof typeof ROLES];
```

## 150. Optional Chaining

TypeScript supports JavaScript optional chaining; TypeScript checks the resulting types.

## 151. Nullish Coalescing

`??` provides a fallback only for `null` or `undefined`, unlike `||`, which also treats other falsy values as fallback triggers.

## 152. Type Narrowing with `??`

TypeScript can use control-flow analysis around nullish checks to refine values.

## 153. Control-Flow Analysis

TypeScript tracks assignments, branches, returns, and checks to refine types through code paths.

## 154. Reachability

Control-flow analysis can identify unreachable branches and influence narrowing.

## 155. Definite Assignment

Strict property initialization can require class fields to be initialized before use.

## 156. Definite Assignment Assertion

`!` on a declaration can suppress definite-assignment checking, but should only be used when initialization is guaranteed by the design.

## 157. `noImplicitAny`

This compiler option reports locations where TypeScript would otherwise infer an implicit `any` in relevant cases.

## 158. `strict`

The `strict` compiler option enables a family of stronger type-checking options and is recommended for most new projects.

## 159. Strict Mode Is Not JavaScript Strict Mode

TypeScript `strict` is a compiler type-checking setting; JavaScript strict mode is a runtime language-mode concept.

## 160. `strictNullChecks`

This option makes nullability explicit and prevents many common null/undefined errors.

## 161. `noImplicitReturns`

This option helps detect functions where not all code paths return a value when a return value is expected.

## 162. `noUncheckedIndexedAccess`

This option can make indexed access more precise by accounting for possibly missing elements/properties.

## 163. `exactOptionalPropertyTypes`

This option distinguishes absence of an optional property from explicitly assigning `undefined` in relevant contexts.

## 164. `noImplicitOverride`

This option requires explicit `override` on overriding class members.

## 165. `useUnknownInCatchVariables`

This setting treats caught error values as `unknown`, encouraging explicit narrowing.

## 166. `noFallthroughCasesInSwitch`

This option helps detect accidental fallthrough in switch cases.

## 167. `noUnusedLocals`

This option can detect unused local declarations during type checking.

## 168. `noUnusedParameters`

This option can report unused parameters according to compiler rules.

## 169. `noEmit`

`noEmit` checks types without writing compiled output, useful when another tool handles transformation.

## 170. `target`

`target` controls the JavaScript language level TypeScript emits when TypeScript performs the transformation.

## 171. `module`

`module` controls the module system TypeScript uses or models for emitted/compiled output and resolution behavior.

## 172. `moduleResolution`

Module resolution determines how TypeScript finds imported modules and type declarations.

## 173. `lib`

`lib` selects ambient library declarations such as DOM or modern ECMAScript APIs.

## 174. DOM Types

Browser projects often include DOM types such as `document`, `HTMLElement`, and `fetch` through appropriate library configuration.

## 175. Node Types

Node.js projects commonly install appropriate Node type declarations when they need typed Node APIs.

## 176. `types`

The `types` compiler option can control which ambient type packages are included automatically.

## 177. `include`

`include` controls which source files are included in a TypeScript project configuration.

## 178. `exclude`

`exclude` can omit paths from project inclusion, subject to TypeScript's configuration behavior.

## 179. `rootDir`

`rootDir` describes the expected common source root for emitted source structure.

## 180. `outDir`

`outDir` specifies where emitted JavaScript and declaration output can be written.

## 181. `baseUrl`

`baseUrl` affects non-relative module resolution and should be configured with a clear understanding of the runtime bundler/resolver.

## 182. Path Aliases

`paths` can define compile-time module aliases, but the runtime/bundler must also understand the same aliases.

## 183. Source Maps

Source maps allow debugging generated JavaScript using original TypeScript source positions.

## 184. Declaration Files

`.d.ts` files describe types without containing the corresponding implementation runtime code.

## 185. Ambient Declaration

Ambient declarations tell TypeScript that a value/type exists elsewhere.

## 186. Declare Variable

```ts
declare const VERSION: string;
```

## 187. Module Declaration

```ts
declare module "legacy-package" {
  export function parse(value: string): unknown;
}
```

## 188. Third-Party Types

Packages can ship their own declarations or rely on separately installed type packages.

## 189. `@types`

The DefinitelyTyped ecosystem provides community-maintained declarations for many JavaScript packages.

## 190. Declaration Quality

A type declaration can be incorrect even when the compiler accepts it; declarations are part of an API contract and deserve testing/review.

## 191. Module Syntax

TypeScript supports standard JavaScript module syntax such as `import` and `export`.

## 192. Type-Only Import

```ts
import type { User } from "./types.js";
```

## 193. Type-Only Export

```ts
export type { User };
```

## 194. Why Type-Only Imports?

They clarify that a dependency is needed only for types and can help avoid unwanted runtime imports.

## 195. Type Erasure

Most TypeScript type syntax is removed from emitted JavaScript; runtime behavior comes from JavaScript constructs and emitted code.

## 196. TypeScript Does Not Exist at Runtime

Types such as `interface` and most aliases do not create runtime objects.

## 197. Interface Runtime Fact

```ts
interface User { id: string }
```

This interface has no runtime representation by itself.

## 198. Type Alias Runtime Fact

A type alias also does not create a runtime value.

## 199. Class Runtime Value

Classes do produce runtime JavaScript values, so they can be used with `instanceof` and other runtime operations.

## 200. Namespaces

Namespaces are a legacy TypeScript organization mechanism; modern ES modules are generally preferred for application code.

## 201. Modules vs Global Script

A file containing top-level `import` or `export` is treated as a module rather than a classic global script.

## 202. `export default`

Default exports provide one primary exported value per module, though teams should choose a consistent convention.

## 203. Named Exports

Named exports make exported identifiers explicit and are often easier to refactor at scale.

## 204. Re-Exports

```ts
export { createUser } from "./users.js";
export type { User } from "./types.js";
```

## 205. Module Boundaries

Expose stable public types and functions while keeping implementation details private.

## 206. Generic Repository

```ts
interface Repository<T extends { id: string }> {
  findById(id: string): Promise<T | null>;
  save(value: T): Promise<T>;
}
```

## 207. Repository Benefit

Generics can reuse repository infrastructure while preserving entity-specific types.

## 208. API Result

```ts
type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; code: string; message: string };
```

## 209. Result Narrowing

The `ok` discriminant lets callers safely access either `data` or error properties.

## 210. Option Concept

A union such as `{ kind: "some"; value: T } | { kind: "none" }` can model absence without relying only on null.

## 211. Async Types

An async function usually returns `Promise<T>` for an inferred or explicit `T`.

## 212. Promise Generic

```ts
async function loadUser(): Promise<User> {
  return { id: "1", name: "Ravi" };
}
```

## 213. Async Error Type

TypeScript does not encode the thrown error type in `Promise<T>` by default.

## 214. `await` Type

The type of an awaited Promise is modeled through TypeScript's Promise/thenable type system.

## 215. `Awaited`

```ts
type UserValue = Awaited<ReturnType<typeof loadUser>>;
```

## 216. Fetch Response

`fetch()` returns a `Promise<Response>`, but response JSON remains runtime data requiring validation when its shape matters.

## 217. Typed Fetch Helper

```ts
async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return (await response.json()) as T;
}
```

## 218. Typed Fetch Warning

The generic `T` in a helper like `fetchJson<T>` does not validate the JSON. Use runtime validation for untrusted responses.

## 219. Safe Fetch Pattern

```text
fetch → unknown → validate → domain type
```

## 220. DOM Element Type

```ts
const button = document.querySelector("button");
```

The result can be `HTMLButtonElement | null` depending on the selector/type information.

## 221. Null Check DOM

```ts
const button = document.querySelector("button");
if (button) button.disabled = true;
```

## 222. Generic DOM Query

TypeScript DOM declarations can provide generic overloads for some APIs when the element type can be inferred from the selector.

## 223. Event Types

Use appropriate DOM event types such as `MouseEvent`, `KeyboardEvent`, or `SubmitEvent` when handler contracts require them.

## 224. Event Target Caveat

`event.target` is broadly typed because events can originate from different nodes; narrow it before accessing element-specific properties.

## 225. Current Target

`event.currentTarget` represents the element whose listener is currently handling the event, though its static typing depends on the API/context.

## 226. Form Event

```ts
function handleSubmit(event: SubmitEvent) {
  event.preventDefault();
}
```

## 227. HTMLElement Narrowing

Use `instanceof HTMLElement` or appropriate guards when runtime element identity matters.

## 228. React and TypeScript

TypeScript can type React props, state, event handlers, refs, context, reducers, hooks, and component APIs.

## 229. React Props

```ts
type ButtonProps = {
  label: string;
  disabled?: boolean;
};
```

## 230. React Component

```tsx
function Button({ label, disabled = false }: ButtonProps) {
  return <button disabled={disabled}>{label}</button>;
}
```

## 231. React Children

Choose a children type based on what the component actually accepts rather than assuming every component needs arbitrary children.

## 232. React Event

```tsx
function SearchBox() {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  return <input onChange={handleChange} />;
}
```

## 233. React State

```ts
const [count, setCount] = useState<number>(0);
```

Inference often makes the explicit generic unnecessary when the initial value clearly determines the state type.

## 234. Nullable State

```ts
const [user, setUser] = useState<User | null>(null);
```

## 235. React Ref

Refs often need explicit nullability because the DOM node does not exist before mounting.

## 236. React Reducer

Reducer actions are well modeled with discriminated unions.

## 237. React Context

Use a context type that reflects the actual value and handle the missing-provider case deliberately.

## 238. React Component Testing

TypeScript helps test helpers and fixtures, but runtime tests remain necessary for UI behavior.

## 239. Node.js and TypeScript

Node projects can use TypeScript with a compiler, runtime transpiler, bundler, or build pipeline depending on deployment requirements.

## 240. Node Module Types

Use appropriate Node type declarations and module configuration for the chosen Node execution model.

## 241. Express Request Typing

Application-specific request data should be modeled explicitly rather than treating every request property as trusted.

## 242. Express Validation Boundary

```text
HTTP request
 ↓
unknown/untrusted data
 ↓
validation
 ↓
typed service input
```

## 243. Service Layer

Keep domain services typed independently from HTTP-specific request/response objects where practical.

## 244. Controller Layer

Controllers translate transport-level data into application-level calls and map results back into HTTP responses.

## 245. Database Types

Database model types should not automatically be treated as API response types; map them when public contracts differ.

## 246. DTO

A Data Transfer Object represents data crossing an application boundary.

## 247. Domain Type

A domain type represents business concepts and invariants within the application.

## 248. Persistence Type

A persistence type represents how data is stored. Keeping these concepts separate can reduce accidental coupling.

## 249. Type Mapping

```text
DB record → mapper → domain model → DTO → JSON
```

## 250. API Error Type

Prefer stable machine-readable error codes in application contracts rather than forcing clients to parse human messages.

## 251. Type-Safe Error Codes

```ts
type ErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND";
```

## 252. Custom Error Class

```ts
class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "AppError";
  }
}
```

## 253. `ErrorOptions`

Modern JavaScript/TypeScript can type the `cause` option on `Error` where the configured library definitions support it.

## 254. Catch Unknown

```ts
try {
  riskyOperation();
} catch (error: unknown) {
  if (error instanceof Error) console.error(error.message);
}
```

## 255. Generic Error Helper

A helper can normalize unknown thrown values into a consistent application error without pretending every thrown value is already an `Error`.

## 256. Type-Safe Event Maps

Mapped types can connect event names to payload types.

```ts
type Events = {
  created: { id: string };
  deleted: { id: string };
};
```

## 257. Event Emitter API

A generic emitter can ensure that the payload for each event matches its event key.

## 258. Generic Event Listener

```ts
type ListenerMap<E> = {
  [K in keyof E]?: Array<(payload: E[K]) => void>;
};
```

## 259. Dependency Injection

Type interfaces can define dependencies while constructors receive concrete implementations.

## 260. Interface-Based Dependency

```ts
interface Mailer {
  send(to: string, body: string): Promise<void>;
}
```

## 261. Service Injection

```ts
class UserService {
  constructor(private readonly mailer: Mailer) {}
}
```

## 262. Test Fake

```ts
class FakeMailer implements Mailer {
  messages: string[] = [];
  async send(_to: string, body: string) {
    this.messages.push(body);
  }
}
```

## 263. Type-Safe Fakes

Interfaces can make fake implementations conform to the dependency contract at compile time.

## 264. Generics and Variance

Generic types can have complex variance behavior depending on how their type parameters are used.

## 265. Covariance Concept

A type is covariant in a parameter when substituting a more specific type can safely substitute where a more general type is expected.

## 266. Contravariance Concept

A function accepting a broader input can often safely stand in for one accepting a narrower input; function parameter variance therefore requires care.

## 267. Invariance Concept

Some type constructions require exact compatibility because both reading and writing would otherwise be unsafe.

## 268. Array Variance Caveat

TypeScript permits some assignments that arise from JavaScript's mutable array model; readonly collections can reduce unsafe mutation paths.

## 269. Readonly Parameters

Accept `readonly T[]` when a function only reads an array and should accept both mutable and readonly arrays.

## 270. Generic Readonly Collection

```ts
function total(values: readonly number[]) {
  return values.reduce((sum, value) => sum + value, 0);
}
```

## 271. Type-Level Immutability

Readonly types prevent certain writes through the type system but do not freeze runtime objects.

## 272. Recursive Types

Types can refer to themselves for trees, nested configuration, JSON-like structures, and linked data.

## 273. Recursive JSON Type

```ts
type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };
```

## 274. Recursive Tree

```ts
type TreeNode<T> = {
  value: T;
  children: TreeNode<T>[];
};
```

## 275. Recursive Type Caution

Very complex recursive type computations can slow the compiler and reduce readability.

## 276. Variadic Tuple Types

Variadic tuples can model functions that preserve parameter sequences through composition.

## 277. Function Composition Types

Advanced generic types can preserve input/output relationships through `pipe` and `compose` utilities.

## 278. Generic Currying

Currying utilities require careful tuple and conditional-type design to preserve parameter types.

## 279. `this` Parameter

TypeScript supports a fake first `this` parameter in function declarations for statically describing expected `this` context.

## 280. `ThisType`

`ThisType<T>` can provide contextual typing for `this` in object literal methods in supported patterns.

## 281. Abstract Class

Abstract classes can define shared implementation plus abstract members that subclasses must implement.

## 282. Abstract Method

```ts
abstract class Repository<T> {
  abstract find(id: string): Promise<T | null>;
}
```

## 283. Class Access Modifiers

TypeScript supports `public`, `protected`, and `private` access modifiers.

## 284. TypeScript `private`

TypeScript's `private` is primarily a compile-time access restriction; JavaScript `#private` fields provide runtime-enforced private fields.

## 285. ECMAScript Private Field

```ts
class Counter {
  #value = 0;
  increment() { this.#value++; }
}
```

## 286. `protected`

`protected` allows access inside the class and subclasses at the TypeScript type level.

## 287. Parameter Properties

```ts
class User {
  constructor(public readonly id: string) {}
}
```

## 288. `override`

Use `override` when intentionally replacing an inherited class member, especially with `noImplicitOverride` enabled.

## 289. Static Members

Static members belong to the class constructor rather than individual instances.

## 290. `implements`

`implements` checks that a class satisfies an interface/type contract; it does not change runtime behavior.

## 291. `extends`

Class `extends` creates runtime inheritance while also participating in TypeScript's type relationships.

## 292. Abstract vs Interface

Interfaces describe contracts; abstract classes can also provide shared runtime implementation.

## 293. Decorators

Decorator support depends on the TypeScript/JavaScript decorator model and project configuration; do not assume all decorator syntax has identical semantics across versions.

## 294. Avoid Magical Types

Advanced type tricks should solve real API/design problems, not merely demonstrate compiler cleverness.

## 295. Type Naming

Use names that communicate domain meaning: `UserId`, `Note`, `CreateNoteInput`, `NoteRepository`.

## 296. Type Duplication

Repeated types may indicate a missing shared domain contract, but premature global types can also create unwanted coupling.

## 297. Local vs Shared Types

Keep a type local when its meaning is local; share it when multiple boundaries genuinely depend on the same contract.

## 298. Domain Types First

Model important business concepts before allowing framework-specific types to spread across the entire codebase.

## 299. Avoid `any`

Treat `any` as an escape hatch. Track and reduce it in important application boundaries.

## 300. Prefer `unknown`

Use `unknown` when the program has a value but cannot yet trust its type.

## 301. Avoid Type Assertions as Fixes

If an assertion appears only to silence an error, ask whether the code needs narrowing, validation, or a better type design.

## 302. Avoid Over-Annotation

Annotating every local variable can add noise when inference is already obvious.

## 303. Public API Annotations

Explicit public function return types can document and stabilize important module contracts.

## 304. Inference as Documentation

Good inference can make code concise while preserving precise types.

## 305. Type Complexity Budget

A type should be no more complicated than necessary to express the useful contract.

## 306. Compiler Performance

Huge unions, deeply recursive conditional types, and excessive type-level computation can increase compiler work.

## 307. Project References

Large TypeScript codebases can split projects into referenced compilation units for build and dependency management.

## 308. Incremental Compilation

Incremental builds can reuse compiler information to speed up subsequent checks.

## 309. `tsbuildinfo`

Incremental/project-reference builds may use build information files; decide whether these generated artifacts belong in version control according to project policy.

## 310. Build vs Type Check

A build can transform source; a type-check command can validate types without necessarily emitting JavaScript.

## 311. Bundler Integration

Tools such as Vite, webpack, esbuild, SWC, or other pipelines may transform TypeScript while a separate checker validates types.

## 312. Transpile-Only Risk

A fast transpiler may remove types without performing full TypeScript type checking, so CI should run a proper type-check step.

## 313. Source Maps in Production

Source-map exposure should be considered from both debugging and source-disclosure perspectives.

## 314. Declaration Output

Libraries can emit `.d.ts` files so consumers receive static type information.

## 315. Library API Design

A library's type declarations are part of its public API and should be versioned carefully.

## 316. Breaking Type Changes

A change can be source-compatible at runtime but breaking to TypeScript consumers if public types become narrower or incompatible.

## 317. Semantic Versioning

Treat public type-contract changes as part of compatibility analysis when publishing libraries.

## 318. Module Resolution Reality

TypeScript's resolver, Node's resolver, and bundler resolution can differ; align configuration with the actual runtime.

## 319. ESM vs CommonJS

TypeScript can model both ecosystems, but the chosen module strategy must match the runtime and package configuration.

## 320. Package `exports`

Modern package `exports` can define public entry points and influence module/type resolution.

## 321. Package `types`

A package can point consumers to declaration entry points through package metadata.

## 322. Declaration Maps

Declaration maps can connect generated declaration files back to source definitions for library development.

## 323. Ambient Globals

Global declarations should be used carefully because they create project-wide names and potential collisions.

## 324. Module Augmentation

Module augmentation can extend existing declarations for libraries when the runtime really provides the additional behavior.

## 325. Global Augmentation

Global augmentation can extend global declarations but should be rare and carefully scoped.

## 326. Type Testing

Public type APIs can be tested with compile-time test patterns that intentionally verify valid and invalid usage.

## 327. Runtime Tests Still Needed

Compile-time type tests cannot prove runtime validation, network behavior, DOM behavior, or database correctness.

## 328. TypeScript + Testing

A strong project tests both static contracts and runtime behavior.

## 329. Type-Safe Test Factory

Factories should return values that satisfy the real domain type rather than relying on broad assertions.

## 330. Mock Type Trap

A mocked dependency can satisfy a TypeScript interface while still violating runtime semantics.

## 331. Type Contract vs Behavior Contract

```text
Type system → shape/relationship assumptions
Tests       → runtime behavior
```

## 332. API Schema Validation

Use runtime schema validation when an API response must satisfy a type before entering trusted business logic.

## 333. Zod-Style Concept

Schema libraries can define runtime parsers whose successful results also expose useful static types.

## 334. Parse vs Cast

Parsing/validation checks data; casting/asserting merely changes the compiler's interpretation.

## 335. Input Boundary

Treat HTTP bodies, query strings, cookies, localStorage, files, messages, and database rows as data requiring the appropriate trust assumptions.

## 336. Security Boundary

TypeScript cannot prevent XSS, SQL injection, broken authorization, CSRF, or SSRF merely through static types.

## 337. Type-Safe Authorization

Literal unions can reduce accidental role-name typos, but authorization must still be enforced at runtime.

## 338. Branded IDs

Separate `UserId`, `NoteId`, and `FolderId` types can reduce accidental identifier mixing in large systems.

## 339. Domain Invariants

Types can express some invariants, but complex runtime invariants may require constructors, parsers, or validation functions.

## 340. Smart Constructor

A smart constructor validates input and returns only a valid domain representation.

## 341. Example Smart Constructor

```ts
type PositiveInt = number & { readonly __brand: "PositiveInt" };

function positiveInt(value: number): PositiveInt {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error("Expected positive integer");
  }
  return value as PositiveInt;
}
```

## 342. Smart Constructor Caveat

The brand alone is not validation; the constructor is what establishes the runtime invariant.

## 343. State Modeling

Discriminated unions can model loading, success, and error states without invalid combinations.

## 344. UI State Example

```ts
type State<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };
```

## 345. Impossible States

Good type design can make invalid combinations difficult or impossible to represent.

## 346. State Machine

Model valid transitions explicitly when a workflow has meaningful states and transitions.

## 347. Reducer Action Union

```ts
type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset"; value: number };
```

## 348. Exhaustive Reducer

Use discriminated action unions plus exhaustive handling to detect missing actions.

## 349. Type-Safe Configuration

Literal unions and `satisfies` can validate configuration while preserving useful literals.

## 350. Environment Variables

Environment variables are runtime strings and should be parsed/validated before treating them as numbers, booleans, URLs, or secrets.

## 351. Environment Schema

```text
process.env
 ↓
unknown/string values
 ↓
validate + parse
 ↓
AppConfig
```

## 352. Configuration Type

```ts
type AppConfig = {
  port: number;
  databaseUrl: string;
};
```

## 353. Configuration Safety

Do not commit real secrets merely because TypeScript has a `string` type for the secret field.

## 354. Generic API Client

A generic client can preserve static response relationships but should pair with runtime validation at trust boundaries.

## 355. Pagination Type

```ts
type Paginated<T> = {
  items: T[];
  page: number;
  totalPages: number;
};
```

## 356. Nullable API Data

Model whether `data` can actually be null rather than adding nullability everywhere without evidence.

## 357. Partial Updates

`Partial<T>` is convenient but may be too permissive for business-specific patch operations.

## 358. Better Patch Type

Define exact patch fields when different properties have different update rules.

## 359. Read Model vs Write Model

Separate read and write shapes when the API's contracts genuinely differ.

## 360. Serialization

Dates, Maps, Sets, BigInts, class instances, and custom types require explicit consideration when serialized to JSON.

## 361. JSON Cannot Represent BigInt Directly

`JSON.stringify()` throws for a bare BigInt value unless serialization is customized.

## 362. Date Serialization

Dates are commonly serialized as strings and therefore must be parsed back into `Date` values explicitly if date methods are required.

## 363. Type-Level Date

A field typed `Date` does not mean JSON received from a server is already a `Date` object.

## 364. Serialization Boundary

```text
Domain object
 ↓ serialize
JSON text
 ↓ parse
unknown
 ↓ validate/transform
Domain object
```

## 365. Advanced Generic Constraint

Use constraints to express the minimum capability required by a generic algorithm rather than over-constraining every type.

## 366. Generic Defaults and APIs

Defaults can make generic APIs easier to call while retaining explicit customization.

## 367. Generic Factory

Factories can infer domain types from their input and return precisely typed objects.

## 368. Mapped Event API

Advanced mapped types can connect event names, payloads, and handlers without manually repeating every signature.

## 369. Conditional API Types

Conditional types can model relationships such as extracting data from success states or filtering union variants.

## 370. `infer`

`infer` introduces a type variable inside conditional types to extract part of another type.

## 371. Infer Example

```ts
type ElementType<T> = T extends readonly (infer U)[] ? U : never;
```

## 372. Infer Function Return

```ts
type AsyncValue<T> = T extends Promise<infer U> ? U : T;
```

## 373. Distributive Filtering

Conditional types can filter union members by producing `never` for members that do not match.

## 374. Union-to-Intersection Concepts

Advanced type transformations can convert unions into intersections, but such techniques should be used sparingly because readability can suffer.

## 375. Recursive Conditional Types

Modern TypeScript supports recursive type patterns, but depth and compiler complexity should be considered.

## 376. Template Literal Parsing

Template literal types can model structured strings such as route names, event keys, and CSS-like token patterns.

## 377. Type-Safe Routes

```ts
type Route = `/users/${string}` | `/notes/${string}`;
```

## 378. Route Types Are Not Runtime Validation

A string received from a request still needs runtime validation even if a variable is asserted as a route type.

## 379. Generic Middleware

Middleware types should preserve request/response relationships without hiding framework behavior behind excessive generic abstractions.

## 380. Framework Types

Framework-provided types are useful, but application-specific types should represent application contracts rather than leaking framework internals everywhere.

## 381. Type-Driven Architecture

Use types to clarify boundaries, data flow, and invariants, not to replace architecture.

## 382. Type Ownership

Every shared type should have a clear owner and reason for being shared.

## 383. Type Dependency Graph

```text
Domain types
   ↓
Application types
   ↓
Transport / persistence adapters
```

## 384. Avoid Circular Type Dependencies

Circular imports or type dependencies can complicate module architecture even when TypeScript can resolve the types.

## 385. Layered Types

Keep domain, application, infrastructure, and presentation concerns separate when that separation reduces coupling.

## 386. DTO Mapping

Explicit mapping can prevent database-only fields or internal implementation details from accidentally entering public responses.

## 387. Type-Safe SQL Caveat

A typed query builder can improve static safety, but database behavior and authorization still require runtime/integration testing.

## 388. TypeScript and MongoDB

Document types can model expected shapes, but stored documents may still contain legacy or malformed data; validate important boundaries.

## 389. TypeScript and Mongoose

ODM types can describe models, but schema/runtime behavior and database constraints should not be assumed from TypeScript types alone.

## 390. TypeScript and Zod

A schema can provide runtime parsing while its inferred TypeScript type reduces duplication between validation and static types.

## 391. Schema-First vs Type-First

Choose whether runtime schema or TypeScript type is the source of truth based on project constraints; avoid maintaining contradictory definitions manually.

## 392. Type Generation

Generated API/database types can reduce duplication, but generated files should be treated as build artifacts with a clear source of truth.

## 393. OpenAPI Types

OpenAPI-based generation can provide client/server types from an API contract, while runtime behavior still needs tests.

## 394. GraphQL Types

Generated GraphQL types can improve client safety, but server authorization and runtime schema behavior remain separate concerns.

## 395. Testing Types

Use compile-time tests for exported generic utilities and public type contracts when type compatibility is itself a product requirement.

## 396. Type Regression

A seemingly harmless refactor can change inference and break consumers, so public library types deserve regression checks.

## 397. Error Diagnostics

Read the innermost mismatch and trace the expected/actual type relationship rather than immediately adding `as any`.

## 398. Error Debugging Strategy

```text
What type did I expect?
        ↓
What type did I get?
        ↓
Where did it become broader/narrower?
        ↓
Can I narrow/validate/model it better?
```

## 399. Common Error: `string | undefined`

Handle the missing case, provide a justified default, validate it, or redesign the API. Do not silence it blindly.

## 400. Common Error: `possibly null`

Narrow the value with a check or use a safe API design rather than assuming the element exists.

## 401. Common Error: Property Does Not Exist on Union

Narrow the discriminated union or shared shape before accessing variant-specific properties.

## 402. Common Error: `never`

Unexpected `never` often means TypeScript narrowed a value more aggressively than intended or a generic/conditional type produced an impossible branch.

## 403. Common Error: Excess Property

Check whether the object literal contains an accidental key or whether the target type is too narrow for the intended contract.

## 404. Common Error: Incompatible Function

Inspect parameter and return variance rather than forcing an assertion.

## 405. Common Error: `any` Spread

One `any` can weaken type information downstream. Find the first point where `any` entered the data flow.

## 406. Common Error: JSON Cast

Casting parsed JSON to a type is not validation.

## 407. Common Error: DOM Nullability

A selector can fail at runtime. Handle null unless the application invariant genuinely guarantees existence.

## 408. Common Error: Wrong Module

If an import works in TypeScript but fails at runtime, inspect module resolution, package exports, file extensions, and runtime/bundler configuration.

## 409. Common Error: Path Alias Runtime Failure

A `paths` alias may satisfy TypeScript while the runtime cannot resolve it. Configure the runtime/bundler consistently.

## 410. Common Error: Type-Only Import Runtime

If a symbol is used only as a type, use `import type` where appropriate to make intent explicit.

## 411. Common Error: Missing Node Types

Install/configure the appropriate Node declarations instead of creating inaccurate global declarations.

## 412. Common Error: Missing DOM Types

Configure the correct library environment rather than manually declaring standard browser APIs incorrectly.

## 413. Common Error: Compiler Version Mismatch

Language features and library types depend on the TypeScript version and configured libraries. Align local and CI tool versions.

## 414. Common Error: Library Type Mismatch

A package's declarations can differ from the installed runtime version; keep package versions aligned and verify the actual API.

## 415. Common Error: Overly Broad Type

A type like `Record<string, unknown>` may be useful at a boundary but can lose domain-specific guarantees inside business logic.

## 416. Common Error: Overly Narrow Type

If valid runtime data cannot be represented without repeated assertions, the model may be incorrectly narrow.

## 417. Common Error: Boolean Flag Explosion

Many independent booleans can represent invalid combinations; discriminated unions can model state more safely.

## 418. Boolean State Problem

```ts
type State = {
  loading: boolean;
  error: boolean;
  data?: string;
};
```

This can represent contradictory states unless additional rules are enforced.

## 419. Discriminated State Improvement

```ts
type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: string };
```

## 420. Type Design Principle

Model valid states explicitly instead of adding comments that describe combinations the type system could represent.

## 421. TypeScript Best Practice

Start with simple types, add precision where it reduces real bugs, and avoid type-level complexity that the team cannot maintain.

## 422. TypeScript Security Principle

Static types improve developer correctness but are never a substitute for runtime authorization, validation, output encoding, or secure protocols.

## 423. TypeScript Performance Principle

Optimize runtime JavaScript based on measurement; do not assume a sophisticated static type makes code faster at runtime.

## 424. Compiler Performance Principle

Keep type computations understandable and avoid unnecessary deeply recursive generic machinery.

## 425. API Design Principle

Design types around stable consumer behavior, not internal implementation details.

## 426. Migration from JavaScript

Start by enabling TypeScript gradually, converting low-risk modules first, then strengthening strictness and boundaries.

## 427. `allowJs`

Projects can include JavaScript files during gradual migration when configured appropriately.

## 428. `checkJs`

TypeScript can check JavaScript files using JSDoc and compiler configuration.

## 429. JSDoc Types

```js
/** @param {number} value */
function double(value) {
  return value * 2;
}
```

## 430. JSDoc Migration

JSDoc can provide an incremental path for projects that are not ready to rename all JavaScript files.

## 431. Rename Strategy

Convert leaf utilities, domain modules, and tests progressively while keeping build/deployment working.

## 432. Strictness Migration

Track errors by category and fix underlying modeling problems rather than turning strict options off permanently.

## 433. `@ts-expect-error`

Use `@ts-expect-error` only when an intentional compile-time error is expected and explain why when the case is non-obvious.

## 434. `@ts-ignore`

`@ts-ignore` suppresses errors without requiring one to exist on the following line, so it can hide accidental regressions; prefer narrower alternatives.

## 435. `@ts-expect-error` vs `@ts-ignore`

`@ts-expect-error` can fail if the expected error disappears, making it safer for intentional type-test cases.

## 436. Type Suppression Budget

Treat repeated suppressions as signals to improve the underlying type or boundary.

## 437. ESLint and TypeScript

Lint rules can complement the compiler by enforcing project conventions and detecting patterns outside TypeScript's type system.

## 438. Formatter

A formatter such as Prettier can standardize TypeScript formatting; formatting and type checking solve different problems.

## 439. Testing TypeScript Code

Use runtime tests plus compile-time checks where type behavior matters.

## 440. TypeScript Build Pipeline

```text
.ts/.tsx source
      ↓
Type checking
      ↓
Transformation/bundling
      ↓
JavaScript
      ↓
Runtime tests
      ↓
Production
```

## 441. TypeScript and CI

CI should run type checking consistently rather than trusting editor diagnostics alone.

## 442. Typecheck Command

A common pattern is `tsc --noEmit` when another tool handles JavaScript transformation.

## 443. Build Verification

A successful type check does not guarantee that bundling, module resolution, environment variables, or runtime behavior are correct.

## 444. Full-Stack Type Flow

```text
Request
 ↓
Runtime validation
 ↓
Typed DTO
 ↓
Service
 ↓
Domain model
 ↓
Repository
 ↓
Database
```

## 445. Notes App Domain Types

A Notes application may define `UserId`, `FolderId`, `NoteId`, `CreateNoteInput`, `UpdateNoteInput`, `Note`, `Folder`, and API result types.

## 446. Notes Ownership Type

Ownership should be enforced at runtime by authorization/database queries; a `ownerId: UserId` type alone cannot enforce access control.

## 447. Notes Folder Type

Model nullable `parentFolderId` explicitly when root folders have no parent.

## 448. Notes Sharing Type

A share model can use literal roles such as `"viewer" | "editor"`, while authorization remains a runtime concern.

## 449. Notes API Result

Use discriminated results for predictable service-level success/failure handling.

## 450. Notes Validation

Validate title, content, IDs, pagination, and query parameters at the HTTP boundary before entering domain logic.

## 451. Notes Type Mapping

Do not expose database-only metadata accidentally through public API response types.

## 452. Notes Test Types

Create typed test builders for users, folders, notes, tags, and shares while keeping scenario-specific overrides explicit.

## 453. Mini Challenge: Typed Calculator

Create a TypeScript calculator with precise input/output types and tests for valid and invalid operations.

## 454. Mini Challenge: Typed User Model

Model `User`, `CreateUserInput`, `UpdateUserInput`, and a repository interface without using `any`.

## 455. Mini Challenge: Result Type

Implement a generic `Result<T, E>` with success/failure constructors and exhaustive handling.

## 456. Mini Challenge: Safe JSON

Write a function that parses JSON as `unknown` and validates a small user shape without a type assertion shortcut.

## 457. Mini Challenge: Generic Collection

Implement typed `first`, `last`, `map`, `filter`, and `groupBy` utilities with readonly inputs where appropriate.

## 458. Mini Challenge: Event Emitter

Build a generic event emitter where each event key requires the correct payload type.

## 459. Mini Challenge: State Machine

Model authentication states as a discriminated union and write an exhaustive reducer.

## 460. Mini Challenge: Branded IDs

Create separate branded `UserId`, `NoteId`, and `FolderId` constructors and demonstrate that accidental mixing fails at compile time.

## 461. Mini Challenge: Typed API Client

Create a client with typed request functions and runtime validation of responses.

## 462. Mini Challenge: Typed Form

Build a React form with typed values, validation state, submission state, and server errors.

## 463. Mini Challenge: Typed Express Service

Create controller, service, repository, DTO, and error types with explicit boundaries.

## 464. Intermediate Project: Type-Safe Notes API

Build the Notes backend in TypeScript with strict mode, runtime request validation, typed services, typed repository interfaces, stable errors, and integration tests.

## 465. Intermediate Project: Typed React Notes UI

Build a React/TypeScript Notes interface with typed props, reducer actions, context, API client, loading/error/success states, and accessible interactions.

## 466. Advanced Project: Full-Stack Type Boundary

Create a full-stack application where HTTP input is runtime-validated, domain models are typed, repository boundaries are explicit, and public DTOs are separated from persistence models.

## 467. Advanced Project: Type-Safe API Contract

Define a single source of truth for an API contract or generate types from an API specification, then verify runtime behavior with integration/contract tests.

## 468. Advanced Project: Generic Data Layer

Build a reusable typed repository abstraction without losing domain-specific constraints or hiding database-specific behavior.

## 469. Advanced Project: Type-Level Challenge

Implement `DeepReadonly`, `DeepPartial`, selected-key transformations, and a typed `pipe` while keeping the implementation understandable.

## 470. Advanced Project: Type Regression Suite

Create compile-time tests for public types and runtime tests for their behavior. Verify that a refactor does not silently weaken the API contract.

## 471. Interview: What Is TypeScript?

A statically typed superset/layer around JavaScript tooling that adds compile-time type checking and language features while targeting JavaScript execution.

## 472. Interview: TypeScript vs JavaScript

JavaScript is the runtime language; TypeScript adds static analysis and syntax that is generally transformed into JavaScript.

## 473. Interview: `any` vs `unknown`

`any` permits operations with minimal checking; `unknown` requires narrowing before most operations.

## 474. Interview: `never`

`never` represents an impossible value and is useful for functions that never return and exhaustive checks.

## 475. Interview: `void` vs `never`

`void` describes a function whose caller should not use a meaningful returned value; `never` means execution cannot produce a normal return value.

## 476. Interview: Union vs Intersection

Union means one of several alternatives; intersection requires compatibility with all combined members.

## 477. Interview: Interface vs Type

Both describe types; interfaces support declaration merging and extension, while type aliases can express unions, tuples, intersections, and other type expressions directly.

## 478. Interview: Structural Typing

Compatibility is primarily based on structure rather than explicit nominal declarations.

## 479. Interview: Generic

Generics preserve relationships between inputs and outputs while allowing reusable code across types.

## 480. Interview: `extends` Generic

A generic constraint limits a type parameter to values satisfying a required shape/capability.

## 481. Interview: `keyof`

`keyof T` produces a union of keys known for `T`.

## 482. Interview: `typeof` Type Query

In a type position, `typeof value` obtains the static type of an existing value.

## 483. Interview: `infer`

`infer` lets conditional types capture and reuse a type discovered inside another type expression.

## 484. Interview: Utility Types

Utility types transform or extract existing types, such as `Partial`, `Pick`, `Omit`, `Record`, `Exclude`, and `ReturnType`.

## 485. Interview: Type Assertion

A type assertion changes the compiler's static interpretation and does not perform runtime conversion or validation.

## 486. Interview: Runtime Validation

External data should be validated at runtime because TypeScript types are erased and cannot inspect actual values after compilation.

## 487. Interview: `satisfies`

`satisfies` checks assignability while generally preserving the expression's inferred type more precisely than a broad annotation.

## 488. Interview: `as const`

`as const` preserves literal values and readonly properties/tuples in the asserted expression.

## 489. Interview: `readonly`

Readonly is a static restriction on writes through a type; it is not the same as runtime freezing.

## 490. Interview: Type Erasure

Most TypeScript-only syntax disappears during transformation, so runtime behavior comes from emitted JavaScript.

## 491. Interview: TypeScript and Security

TypeScript reduces certain developer errors but cannot replace runtime validation, authorization, secure encoding, or protocol-level security.

## 492. Interview: TypeScript and Performance

Static types do not inherently make emitted JavaScript faster. Runtime performance depends on generated code and execution behavior.

## 493. Interview: `interface` Runtime

Interfaces do not create runtime objects.

## 494. Interview: `enum` Runtime

Traditional enums can generate runtime JavaScript, unlike interfaces and type aliases.

## 495. Interview: `private` vs `#private`

TypeScript `private` is primarily a compile-time restriction; ECMAScript `#private` fields have runtime privacy semantics.

## 496. Interview: Type Check vs Build

Type checking validates static relationships; building/transformation produces runnable artifacts and can involve bundling/module resolution.

## 497. Teach-Back: Types

Explain primitive types, arrays, tuples, objects, literals, unions, intersections, `any`, `unknown`, `void`, and `never` with examples.

## 498. Teach-Back: Narrowing

Explain `typeof`, equality, `in`, `instanceof`, type predicates, discriminated unions, and exhaustive checks.

## 499. Teach-Back: Generics

Explain generic parameters, inference, constraints, `keyof`, indexed access, defaults, and generic interfaces.

## 500. Teach-Back: Advanced Types

Explain conditional types, mapped types, template literal types, `infer`, distributive behavior, and why excessive type complexity is harmful.

## 501. Teach-Back: Runtime Boundary

Explain why TypeScript cannot validate JSON, HTTP bodies, environment variables, localStorage, or database data at runtime.

## 502. Teach-Back: Architecture

Explain DTOs, domain models, persistence models, mapping, dependency injection, and typed service/repository boundaries.

## 503. Teach-Back: Compiler

Explain `strict`, `target`, `module`, `moduleResolution`, `lib`, `rootDir`, `outDir`, `paths`, source maps, and declaration files.

## 504. Teach-Back: JavaScript Migration

Explain `allowJs`, `checkJs`, JSDoc, gradual conversion, strictness migration, and suppression comments.

## 505. Mastery: Fundamentals

- [ ] I understand inference and annotations.
- [ ] I can model objects, arrays, tuples, unions, and intersections.
- [ ] I can explain `any`, `unknown`, `void`, and `never`.

## 506. Mastery: Narrowing

- [ ] I can narrow unknown values safely.
- [ ] I can write type guards.
- [ ] I can model discriminated unions.
- [ ] I can perform exhaustive checks.

## 507. Mastery: Generics

- [ ] I can write generic functions.
- [ ] I understand constraints.
- [ ] I can use `keyof` and indexed access.
- [ ] I can design generic APIs without over-engineering.

## 508. Mastery: Advanced Types

- [ ] I understand mapped types.
- [ ] I understand conditional types.
- [ ] I can use `infer` when justified.
- [ ] I understand template literal types.

## 509. Mastery: Runtime Safety

- [ ] I know that TypeScript does not validate runtime data.
- [ ] I can validate external input.
- [ ] I can separate casting from validation.
- [ ] I can model trust boundaries.

## 510. Mastery: Full Stack

- [ ] I can type React components and events.
- [ ] I can type Node services and repositories.
- [ ] I can model API DTOs and errors.
- [ ] I can integrate database/runtime validation safely.

## 511. Mastery: Tooling

- [ ] I can configure a strict TypeScript project.
- [ ] I understand module resolution.
- [ ] I can use declaration files.
- [ ] I can debug compiler errors without reaching for `any`.

## 512. Mastery: Production

- [ ] CI runs type checking.
- [ ] Runtime tests complement static types.
- [ ] Public type APIs are treated as contracts.
- [ ] Type complexity is kept maintainable.

## 513. Final TypeScript Mental Model

```text
JavaScript runtime
       ↑
   emitted code
       ↑
TypeScript source
       ↓
static analysis
       ↓
compile-time feedback
```

## 514. Final Type-Safety Model

```text
Unknown external data
        ↓
Runtime validation
        ↓
Trusted domain type
        ↓
Typed business logic
        ↓
Typed boundaries
        ↓
Runtime tests
```

## 515. Final TypeScript Principle

**Types describe assumptions; runtime code enforces behavior.** Strong TypeScript combines precise modeling, safe narrowing, runtime validation, good architecture, and tests.

## 516. Final TypeScript Mastery Project

Build a **fully typed Notes application** using React + TypeScript on the frontend and Node/Express + TypeScript on the backend.

Requirements:

1. Enable strict TypeScript checking.
2. Define domain types for users, folders, notes, tags, and shares.
3. Create distinct create/update/read DTOs.
4. Use branded IDs where they reduce accidental mixing.
5. Model authentication and authorization states explicitly.
6. Model API success/error responses with discriminated unions.
7. Validate every untrusted HTTP input at runtime.
8. Parse environment variables into a typed configuration object.
9. Never treat `JSON.parse()` output as automatically trusted.
10. Separate persistence models from public API DTOs where appropriate.
11. Type repository interfaces.
12. Type service dependencies with interfaces.
13. Use dependency injection for important external effects.
14. Type React props and important event handlers.
15. Model loading/error/success UI state as a discriminated union.
16. Type reducers with exhaustive action handling.
17. Use `readonly` where mutation is not part of the contract.
18. Avoid `any`; use `unknown` at untrusted boundaries.
19. Minimize unsafe assertions.
20. Use `satisfies` and literal types where they improve configuration safety.
21. Add compile-time tests for important public types.
22. Add runtime tests for business behavior.
23. Add API integration tests.
24. Add database integration tests.
25. Add browser E2E tests for critical workflows.
26. Verify authorization independently from TypeScript typing.
27. Verify that malformed API responses are rejected safely.
28. Verify that dates and IDs are transformed correctly across JSON boundaries.
29. Configure module resolution to match the actual runtime.
30. Run `tsc --noEmit` in CI when another tool performs transformation.
31. Keep source maps and production source disclosure intentional.
32. Document the type architecture.
33. Track and eliminate unnecessary suppression comments.
34. Review advanced generic types for readability and compiler cost.
35. Explain where static types stop and runtime guarantees begin.

**Mastery standard:** You are not finished when you can add `: string` to a variable. You are finished when you can design **precise domain types, safely narrow unknown data, build generic abstractions, model impossible states, configure a strict project, type React and Node boundaries, publish stable type APIs, validate runtime data, debug compiler errors systematically, and combine TypeScript with tests and architecture to build maintainable full-stack software.**