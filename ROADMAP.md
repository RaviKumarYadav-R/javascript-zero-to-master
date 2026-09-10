# JavaScript Zero to Master — Complete Topic Map

This is the master syllabus. Every bullet is a real study topic. Major topics must eventually have a dedicated teacher-ready chapter with a minimum of 100 meaningful educational lines.

## 00 — Learning System

- How JavaScript is learned
- Reading documentation
- MDN navigation
- Console-driven learning
- REPL practice
- Code tracing
- Output prediction
- Debugging workflow
- Error-first learning
- Spaced revision
- Teach-back method
- Project decomposition
- Tutorial-loop escape system
- Git and GitHub workflow
- JavaScript coding standards
- Naming conventions
- Comments and documentation
- Problem-solving workflow
- How to read unfamiliar code
- How to ask better technical questions

## 01 — JavaScript Fundamentals

### JavaScript itself
- What JavaScript is
- JavaScript history
- ECMAScript vs JavaScript
- ECMAScript specifications
- TC39
- JavaScript engines
- Parsing
- Compilation and interpretation
- JIT compilation
- Runtime environments
- Browser runtime
- Node.js runtime
- JavaScript shell/REPL
- Strict mode
- Scripts vs modules
- Source text and syntax
- Statements vs expressions
- Comments
- Semicolons and ASI
- Identifiers
- Keywords
- Literals
- Reserved words

### Variables and bindings
- Variables
- Bindings
- `let`
- `const`
- `var`
- Declaration
- Initialization
- Assignment
- Reassignment
- Mutation
- Naming rules
- Multiple declarations
- Destructuring declarations
- Temporal Dead Zone preview
- Global declarations

### Values and types
- Primitive values
- Object values
- Undefined
- Null
- Boolean
- Number
- BigInt
- String
- Symbol
- Object
- Functions as objects
- `typeof`
- `instanceof` preview
- Value identity
- Immutability of primitives
- Mutable object contents

### Operators
- Assignment operators
- Arithmetic operators
- Unary operators
- Increment/decrement
- Comparison operators
- Strict equality
- Strict inequality
- Loose equality
- Relational operators
- Logical AND
- Logical OR
- Logical NOT
- Nullish coalescing
- Optional chaining
- Ternary operator
- `typeof`
- `delete`
- `void`
- `in`
- `instanceof`
- Bitwise operators
- Shift operators
- Precedence
- Associativity
- Short-circuit evaluation
- Evaluation order

### Type coercion
- Explicit conversion
- Implicit coercion
- ToBoolean
- ToNumber
- ToString
- ToPrimitive
- String concatenation
- Numeric conversion
- Equality coercion
- Truthy values
- Falsy values
- `null` vs `undefined`
- `NaN`
- `Object.is`
- Common coercion traps

### Control flow
- `if`
- `else`
- `else if`
- Nested conditionals
- Ternary expressions
- `switch`
- `case`
- `default`
- Fall-through
- `break`
- `while`
- `do...while`
- `for`
- `for...of`
- `for...in`
- Nested loops
- `continue`
- Labeled statements
- Infinite loops
- Loop termination

## 02 — Functions

- Function concept
- Function declaration
- Function expression
- Named function expression
- Anonymous functions
- Parameters
- Arguments
- Return values
- `return`
- Default parameters
- Rest parameters
- Spread syntax in calls
- Function arity
- First-class functions
- Functions as values
- Functions as arguments
- Functions as return values
- Callback functions
- Higher-order functions
- Arrow functions
- Arrow syntax variations
- Arrow lexical `this`
- Function `this` preview
- `arguments`
- `arguments` vs rest
- IIFE
- Recursion
- Base case
- Recursive call
- Stack depth
- Tail-call concepts
- Closures preview
- Function factories
- Currying preview
- Composition preview
- Pure function preview
- Side effects preview

## 03 — Scope and Execution

- Global scope
- Module scope
- Function scope
- Block scope
- Lexical scope
- Lexical environment
- Environment records
- Scope chain
- Identifier resolution
- Shadowing
- Variable lookup
- Hoisting
- `var` hoisting
- Function declaration hoisting
- `let` hoisting behavior
- `const` hoisting behavior
- Temporal Dead Zone
- Execution context
- Global execution context
- Function execution context
- Module execution context
- Call stack
- Stack frames
- Creation phase
- Execution phase
- Return from function
- Closures
- Closure creation
- Closure lifetime
- Private state with closures
- `this`
- Global `this`
- Function-call `this`
- Method-call `this`
- Constructor `this`
- Arrow-function `this`
- Explicit binding
- `call`
- `apply`
- `bind`

## 04 — Strings

- String values
- String literals
- Single quotes
- Double quotes
- Template literals
- String indexing
- String length
- Immutability
- Character access
- `at`
- `charAt`
- `charCodeAt`
- `codePointAt`
- Unicode
- UTF-16
- Surrogate pairs
- Search methods
- `includes`
- `startsWith`
- `endsWith`
- `indexOf`
- `lastIndexOf`
- Extraction
- `slice`
- `substring`
- `substr` legacy awareness
- Case conversion
- `toUpperCase`
- `toLowerCase`
- Locale-aware case
- Trimming
- `trim`
- `trimStart`
- `trimEnd`
- Padding
- `padStart`
- `padEnd`
- Replacement
- `replace`
- `replaceAll`
- Regular-expression replacement
- Splitting
- `split`
- Joining with arrays
- Concatenation
- Template interpolation
- Tagged templates
- Escape sequences
- Raw strings

## 05 — Arrays

- Array concept
- Array literals
- `Array` constructor
- Indexing
- Length
- Sparse arrays
- Array-like values
- Mutation
- Non-mutating methods
- References
- Copying
- Shallow copy
- Deep-copy concepts
- Spread copy
- `Array.from`
- `Array.of`
- `push`
- `pop`
- `shift`
- `unshift`
- `splice`
- `slice`
- `concat`
- `fill`
- `copyWithin`
- `map`
- `filter`
- `reduce`
- `reduceRight`
- `forEach`
- `find`
- `findIndex`
- `findLast`
- `findLastIndex`
- `some`
- `every`
- `includes`
- `indexOf`
- `lastIndexOf`
- `sort`
- Numeric sorting
- Stable sorting
- `toSorted`
- `reverse`
- `toReversed`
- `flat`
- `flatMap`
- `join`
- `entries`
- `keys`
- `values`
- `for...of`
- Array destructuring
- Rest and spread
- Array iteration semantics

## 06 — Objects

- Object concept
- Object literals
- Properties
- Keys and values
- Dot notation
- Bracket notation
- Computed property names
- Property shorthand
- Method shorthand
- Nested objects
- Optional chaining
- Nullish coalescing
- Property existence
- `Object.hasOwn`
- `in`
- `Object.keys`
- `Object.values`
- `Object.entries`
- `Object.fromEntries`
- Destructuring
- Nested destructuring
- Default values
- Rest properties
- Spread properties
- `Object.assign`
- Shallow copying
- References
- Equality and identity
- Property descriptors
- Data descriptors
- Accessor descriptors
- `get`
- `set`
- Enumerability
- Writability
- Configurability
- `Object.defineProperty`
- `Object.defineProperties`
- `Object.getOwnPropertyDescriptor`
- `Object.freeze`
- `Object.seal`
- `Object.preventExtensions`
- Extensibility
- Prototype preview

## 07 — Collections and Iteration

- Collection choice
- Map
- Map keys
- Map methods
- Map iteration
- Set
- Set uniqueness
- Set methods
- WeakMap
- WeakMap use cases
- WeakSet
- Weak collections limitations
- Iterable protocol
- Iterator protocol
- `Symbol.iterator`
- Iterator result objects
- `next()`
- Custom iterables
- `for...of`
- Array iterables
- String iterables
- Map iterables
- Set iterables
- Non-iterable objects
- Generator preview

## 08 — Built-in Objects

### Number and numeric utilities
- Number object
- IEEE 754 double precision
- `NaN`
- Infinity
- `Number.isNaN`
- `Number.isFinite`
- Global `isNaN`
- Global `isFinite`
- Safe integers
- `Number.MAX_SAFE_INTEGER`
- `Number.MIN_SAFE_INTEGER`
- `Number.MIN_VALUE`
- `Number.EPSILON`
- `parseInt`
- `parseFloat`
- `Number`
- `toFixed`
- `toPrecision`
- Floating-point precision

### Math
- `Math.abs`
- `Math.floor`
- `Math.ceil`
- `Math.round`
- `Math.trunc`
- `Math.max`
- `Math.min`
- `Math.pow`
- `Math.sqrt`
- `Math.cbrt`
- `Math.random`
- Random integer generation
- Trigonometric functions
- Logarithms and exponentials

### Date and time
- Date concept
- Date construction
- Timestamps
- Epoch time
- Numeric constructor month indexing
- Parsing dates
- Getters
- Setters
- `getDate` vs `getDay`
- UTC methods
- Time zones
- Date arithmetic
- Mutability
- ISO strings
- `Intl.DateTimeFormat`

### JSON
- JSON format
- JSON data types
- `JSON.stringify`
- `JSON.parse`
- Serialization
- Deserialization
- Replacer
- Reviver
- Unsupported values
- JSON limitations

### Regular expressions
- Regex literals
- Constructor
- Character classes
- Quantifiers
- Groups
- Capturing
- Non-capturing groups
- Alternation
- Anchors
- Flags
- `g`, `i`, `m`, `s`, `u`, `y`, `d`
- `test`
- `exec`
- String regex methods
- Backreferences
- Lookahead
- Lookbehind
- Regex pitfalls

### Other built-ins
- Boolean wrapper awareness
- Symbol
- Well-known symbols
- BigInt
- Intl
- Locale
- Collation
- Number formatting
- List formatting
- Relative time formatting

## 09 — Advanced JavaScript

- Prototype objects
- Prototype chain
- `Object.getPrototypeOf`
- `Object.setPrototypeOf`
- `Object.create`
- Constructor functions
- `.prototype`
- `.constructor`
- `instanceof`
- Property lookup through prototype chain
- Own vs inherited properties
- Prototype pollution awareness
- Classes as syntax over prototypes
- Descriptors
- Symbols
- Custom iterators
- Generators
- `function*`
- `yield`
- Generator delegation
- Proxy
- Proxy traps
- Reflect
- Typed arrays
- ArrayBuffer
- DataView
- Endianness
- Binary data
- SharedArrayBuffer concepts
- Atomics concepts

## 10 — Asynchronous JavaScript

- Synchronous execution
- Asynchronous work
- Concurrency vs parallelism
- Callback pattern
- Callback hell
- Promise motivation
- Promise states
- Promise creation
- Promise resolution
- Thenables
- `then`
- `catch`
- `finally`
- Promise chaining
- Error propagation
- Promise combinators
- `Promise.all`
- `Promise.allSettled`
- `Promise.race`
- `Promise.any`
- Async functions
- `await`
- Async return values
- Async error handling
- Event loop
- Task queues
- Microtask queue
- Rendering opportunities
- Timers
- Network callbacks
- Concurrency limiting
- Sequential vs parallel awaits
- Cancellation
- AbortController
- AbortSignal
- Async iteration
- `for await...of`
- Async generators

## 11 — Modules

- Why modules exist
- Module boundaries
- ESM
- `export`
- Named exports
- Default exports
- `import`
- Import aliases
- Re-exporting
- Namespace imports
- Side-effect imports
- Dynamic `import()`
- Module evaluation
- Module scope
- Live bindings
- Circular dependencies
- Browser modules
- Module scripts
- CommonJS concepts
- `require`
- `module.exports`
- ESM vs CommonJS
- Package boundaries

## 12 — Object-Oriented JavaScript

- Objects and behavior
- Encapsulation
- Abstraction
- Inheritance
- Polymorphism
- Constructor functions
- `new`
- Prototypes
- Class declarations
- Class expressions
- Constructors
- Instance properties
- Instance methods
- Static properties
- Static methods
- `this` in static methods
- Getters
- Setters
- Private fields
- Private methods
- Static private fields
- Static initialization blocks
- `extends`
- `super()`
- `super.method()`
- Method overriding
- Prototype inheritance
- Static inheritance
- `instanceof`
- Duck typing
- Composition
- Association
- Aggregation
- Composition relationship
- Inheritance vs composition
- Method dispatch
- Abstraction patterns
- Abstract-like classes in JavaScript
- Function overloading limitations
- Manual overload-like APIs

## 13 — DOM

- Browser document
- DOM concept
- DOM tree
- Node types
- Element nodes
- Text nodes
- Document node
- Window/document relationship
- Element selection
- `getElementById`
- `querySelector`
- `querySelectorAll`
- `getElementsByClassName`
- `getElementsByTagName`
- Live vs static collections
- Traversal
- Parent/child/sibling relationships
- `closest`
- `matches`
- Creating elements
- `createElement`
- `createTextNode`
- `append`
- `appendChild`
- `prepend`
- `before`
- `after`
- `remove`
- `replaceWith`
- `textContent`
- `innerHTML`
- `outerHTML`
- Attributes
- Properties
- `classList`
- Inline styles
- Dataset
- Events
- Event listeners
- Event object
- Event target/currentTarget
- Bubbling
- Capturing
- Propagation control
- Delegation
- Forms
- Form controls
- Validation
- Submit handling
- MutationObserver
- IntersectionObserver
- ResizeObserver

## 14 — BOM

- Browser Object Model
- `window`
- Global browser environment
- `globalThis`
- `document`
- `location`
- URL navigation
- History
- `history.back`
- `history.forward`
- `history.go`
- Navigator
- User-agent concepts
- Online/offline status
- Screen
- Viewport vs screen
- `innerWidth`
- `innerHeight`
- Browser dialogs
- `alert`
- `confirm`
- `prompt`
- Timers
- `setTimeout`
- `setInterval`
- `clearTimeout`
- `clearInterval`

## 15 — Browser APIs

- Web Storage
- localStorage
- sessionStorage
- Storage strings
- Storage limits/concepts
- Cookies concepts
- Cookie attributes
- URL API
- URLSearchParams
- Clipboard API
- Notifications API
- Geolocation API
- File API
- Blob
- FileReader
- Drag and drop
- Web Workers
- Service Workers
- Cache API
- IndexedDB concepts
- BroadcastChannel
- WebSocket concepts
- Server-Sent Events concepts
- Structured clone
- AbortController
- Page visibility
- Online/offline events

## 16 — Networking and HTTP

- Client/server model
- DNS concepts
- TCP/TLS concepts
- HTTP
- Request
- Response
- URL
- Methods
- GET
- POST
- PUT
- PATCH
- DELETE
- Status codes
- 2xx
- 3xx
- 4xx
- 5xx
- Headers
- Content-Type
- Accept
- Authorization
- Cookies
- Request body
- JSON payloads
- Fetch API
- Fetch lifecycle
- `response.ok`
- `response.json()`
- Request errors vs HTTP errors
- REST principles
- Resource modeling
- Query parameters
- Path parameters
- Pagination
- Filtering
- Sorting
- Caching concepts
- CORS
- Preflight
- Credentials
- Authentication concepts
- Authorization concepts
- Bearer tokens
- Sessions
- CSRF concepts
- Rate limiting concepts

## 17 — Error Handling and Debugging

- Syntax errors
- Runtime errors
- Logic errors
- Error objects
- `Error`
- `TypeError`
- `ReferenceError`
- `RangeError`
- `SyntaxError`
- `URIError`
- Custom errors
- `throw`
- `try`
- `catch`
- `finally`
- Error propagation
- Stack traces
- Error boundaries concept
- Logging
- Console methods
- Breakpoints
- Watch expressions
- Call stack inspection
- Network debugging
- DOM debugging
- Defensive programming
- Validation
- Fail-fast design
- Error messages
- Recoverable vs unrecoverable errors

## 18 — Memory and Performance

- Values and references
- Reachability
- Garbage collection
- Mark-and-sweep concepts
- Memory retention
- Accidental global references
- Closures and retention
- Event-listener leaks
- Detached DOM nodes
- Cache growth
- Big-O connection
- Algorithmic cost
- DOM performance
- Layout
- Paint
- Compositing
- Forced synchronous layout
- Rendering pipeline
- Main thread
- Long tasks
- Debounce
- Throttle
- Memoization
- Lazy loading
- Code splitting
- Performance measurement
- Performance API
- Core Web Vitals
- LCP
- INP
- CLS
- Profiling

## 19 — DSA with JavaScript

- Big-O
- Time complexity
- Space complexity
- Arrays
- Strings
- Hash tables
- Frequency counters
- Two pointers
- Sliding window
- Prefix sums
- Recursion
- Backtracking
- Linked lists
- Singly linked list
- Doubly linked list
- Stack
- Queue
- Deque
- Hash map
- Hash set
- Binary search
- Sorting
- Bubble sort
- Selection sort
- Insertion sort
- Merge sort
- Quick sort
- Heap
- Priority queue
- Binary tree
- BST
- Tree traversal
- BFS
- DFS
- Graph representation
- Graph traversal
- Topological sorting
- Greedy algorithms
- Dynamic programming
- Memoization
- Tabulation
- Bit manipulation
- Problem-solving patterns

## 20 — Functional Programming

- First-class functions
- Higher-order functions
- Pure functions
- Side effects
- Referential transparency
- Immutability
- Declarative programming
- Function composition
- Pipeline concepts
- `map`
- `filter`
- `reduce`
- Currying
- Partial application
- Closures
- Recursion
- Predicate functions
- Function factories
- Data transformation
- Functional error handling concepts
- Functional architecture
- When FP helps
- When FP hurts

## 21 — Testing

- Why testing matters
- Test pyramid
- Assertions
- Unit tests
- Integration tests
- End-to-end concepts
- Test cases
- Arrange/Act/Assert
- Edge cases
- Boundary testing
- Mocks
- Stubs
- Fakes
- Spies
- Dependency isolation
- Async testing
- Error-path testing
- DOM testing concepts
- API testing concepts
- Testable design
- Coverage
- Coverage limitations
- Regression testing
- Property-based testing concepts

## 22 — TypeScript for JavaScript Developers

- Why TypeScript
- Type inference
- Primitive types
- Arrays
- Tuples
- Object types
- Type aliases
- Interfaces
- Optional properties
- Readonly properties
- Union types
- Intersection types
- Literal types
- Enums awareness
- Function types
- Optional parameters
- Rest parameters
- Generic functions
- Generic types
- Constraints
- `keyof`
- `typeof` in type positions
- Indexed access types
- Type narrowing
- Type guards
- Discriminated unions
- Utility types
- `Partial`
- `Required`
- `Pick`
- `Omit`
- `Record`
- `ReturnType`
- `Parameters`
- Classes
- Access modifiers
- Modules
- Declaration files
- `any`
- `unknown`
- `never`
- `void`
- Strict mode
- JS-to-TS migration

## 23 — Design Patterns

- What patterns are
- Pattern trade-offs
- Factory
- Abstract Factory awareness
- Builder
- Module
- Singleton cautions
- Strategy
- Observer
- Pub/Sub
- Adapter
- Decorator
- Facade
- Command
- Chain of Responsibility
- State
- Template Method
- Dependency Injection
- Composition patterns
- Anti-patterns

## 24 — SOLID

- Why SOLID exists
- Single Responsibility Principle
- Open/Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion Principle
- Coupling
- Cohesion
- Dependency direction
- Abstractions
- Refactoring toward SOLID
- SOLID trade-offs

## 25 — JavaScript Architecture

- Architecture vs folder structure
- Separation of concerns
- Layered architecture
- Presentation layer
- Application layer
- Domain layer
- Infrastructure layer
- Dependency injection
- Composition roots
- Validation boundaries
- DTO concepts
- Service boundaries
- Repository pattern
- Error boundaries
- Configuration management
- Environment variables
- Feature-based organization
- Module boundaries
- Testability
- API contracts
- Security boundaries
- Scaling codebases
- Refactoring legacy code

## 26 — Practice System

- 100 conditional problems
- 100 loop problems
- 100 mixed-control-flow problems
- Functions practice
- Scope prediction
- Hoisting prediction
- Closure challenges
- String challenges
- Array challenges
- Object challenges
- Async output prediction
- Promise ordering
- Event-loop puzzles
- DOM challenges
- Fetch/API challenges
- Debugging challenges
- Refactoring challenges
- Interview problems
- DSA problems
- Teach-back exercises

## 27 — Projects

### Beginner
- Calculator
- Number guessing game
- Counter
- Todo list
- Quiz app
- Color generator
- Gradient generator
- Password generator
- Digital clock
- Stopwatch
- Expense calculator
- Tip calculator
- Form validator

### Intermediate
- Notes app
- Expense tracker
- Weather dashboard
- GitHub profile/search app
- Movie search app
- Quiz platform
- Markdown previewer
- Kanban board
- URL utility
- Snippet manager

### Advanced
- Authenticated notes platform
- Real-time chat
- LMS
- E-commerce frontend
- Dashboard with analytics
- Offline-first app
- PWA
- Collaborative editor
- Streaming dashboard

### Full-stack
- Requirements analysis
- User stories
- Data modeling
- API contract
- Authentication
- Authorization
- Validation
- Database integration
- Error handling
- Logging
- Testing
- Performance
- Security
- Deployment
- Documentation
- Monitoring
- Refactoring

## Mastery Definition

You are not finished when you can repeat syntax. You are finished when you can:

1. Explain the concept without notes.
2. Predict code execution before running it.
3. Debug unfamiliar code systematically.
4. Compare alternative approaches and justify the choice.
5. Implement the concept from a blank file.
6. Recognize edge cases and failure modes.
7. Use the concept in a real project.
8. Refactor a working solution.
9. Teach the concept to another person.
10. Solve a new problem where the concept is not explicitly named.
