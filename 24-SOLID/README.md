# 24 — SOLID Principles

> A JavaScript-first, practical guide to SOLID: designing code that is easier to understand, change, test, and extend without turning every small problem into an abstraction.

## Learning Goal

SOLID is a set of five object-oriented design principles. They are not five mandatory rules or a checklist that every function must satisfy literally. They are heuristics for managing responsibility, dependencies, extension, and change.

```text
S → Single Responsibility Principle
O → Open/Closed Principle
L → Liskov Substitution Principle
I → Interface Segregation Principle
D → Dependency Inversion Principle
```

---

# PART A — SOLID FOUNDATIONS

## 1. What Is SOLID?

SOLID is an acronym introduced to summarize five influential object-oriented design principles.

The goal is not “more classes.” The goal is better boundaries and lower-cost change.

---

## 2. Why SOLID Exists

Poorly designed code often has:

- too many responsibilities in one module
- fragile dependencies
- difficult testing
- surprising inheritance behavior
- interfaces that force unused behavior
- changes that ripple through unrelated code

SOLID provides vocabulary for diagnosing these problems.

---

## 3. SOLID Is Not a Framework

SOLID does not require:

- React
- TypeScript
- classes
- dependency-injection containers
- a particular architecture

The principles can also be expressed with functions, modules, closures, and composition.

---

## 4. SOLID and JavaScript

JavaScript is multi-paradigm. You can apply SOLID using:

```text
Functions
Modules
Objects
Classes
Closures
Higher-order functions
Dependency injection
Composition
```

Do not force class-heavy design onto code that is clearer as functions.

---

## 5. The Core Question

For every design decision ask:

> **What kind of change am I trying to make cheap?**

That question connects all five principles.

---

## 6. Coupling

Coupling describes dependencies between parts of a system.

```text
High coupling
A ───► B ───► C
 │      │
 └──────┘

Lower coupling
A ─► contract ◄─ B
```

SOLID often attempts to control coupling rather than eliminate it.

---

## 7. Cohesion

Cohesion describes how strongly related the responsibilities inside one unit are.

High cohesion usually means a module's contents belong together.

---

## 8. Abstraction

An abstraction exposes a useful boundary while hiding implementation details that callers do not need.

```js
function saveNote(noteRepository, note) {
  return noteRepository.save(note);
}
```

The service depends on a capability rather than knowing database internals.

---

## 9. Composition

Composition combines smaller pieces of behavior.

```js
const service = createService({
  repository,
  logger,
  clock
});
```

This is frequently more flexible than deep inheritance in JavaScript.

---

# PART B — S: SINGLE RESPONSIBILITY PRINCIPLE

## 10. SRP Definition

> A module should have a single, coherent responsibility and therefore a focused reason for change.

A common shorthand is “one reason to change,” but that phrase should be interpreted in terms of cohesive responsibility, not literally one line of code.

---

## 11. SRP Does Not Mean One Function Per File

This is not automatically good:

```text
addUser.js
validateUser.js
formatUser.js
```

If these functions form one cohesive concept, keeping them together may be clearer.

---

## 12. SRP Example — Bad

```js
class UserService {
  validate(user) {}
  saveToDatabase(user) {}
  sendWelcomeEmail(user) {}
  generatePdf(user) {}
}
```

This class mixes validation, persistence, communication, and presentation.

---

## 13. SRP Example — Better

```text
UserValidator
UserRepository
WelcomeMailer
UserReportGenerator
```

Each boundary owns a cohesive responsibility.

---

## 14. SRP With Functions

```js
const validateUser = (user) => {
  if (!user.email) throw new Error("Email required");
};

const toUserRecord = (user) => ({
  email: user.email.trim().toLowerCase()
});
```

Functions can satisfy SRP without classes.

---

## 15. SRP and Reasons to Change

Imagine a user module changes because:

```text
Database schema changes
Email provider changes
Validation rules change
PDF format changes
```

If all changes hit one class, the class has weak responsibility boundaries.

---

## 16. SRP and Cohesion

Ask whether the functions inside a module answer the same conceptual question.

```text
Good cohesion:
Note creation + note validation + note-specific domain rules

Poor cohesion:
Note creation + email sending + image resizing + database migrations
```

---

## 17. SRP Refactoring

Before:

```js
async function registerUser(input) {
  // validate
  // hash password
  // insert database row
  // send email
  // format HTTP response
}
```

After:

```text
Controller → Use Case → Repository
                     ↘ Mailer
```

---

## 18. SRP Trade-off

Too little separation creates large responsibilities. Too much separation creates fragmented code.

```text
Too coupled ←── balanced cohesion ──→ too fragmented
```

SRP is a judgment principle, not a file-count rule.

---

## 19. SRP Smell: Giant Controller

A controller that validates input, executes business rules, queries the database, sends email, and builds complex responses likely contains too many responsibilities.

---

## 20. SRP Smell: Giant React Component

A component responsible for data fetching, business calculations, form validation, API mutation, analytics, and a large UI tree may benefit from extraction.

Extraction should follow actual responsibility boundaries rather than arbitrary line counts.

---

## 21. SRP Smell: Utility Dump

A file named `utils.js` containing unrelated helpers is not highly cohesive simply because everything is called “utility.”

---

## 22. SRP Checklist

- [ ] Is the module cohesive?
- [ ] Are its responsibilities related?
- [ ] Can one business concern change without unrelated changes?
- [ ] Are boundaries understandable?
- [ ] Did refactoring actually improve the design?

---

# PART C — O: OPEN/CLOSED PRINCIPLE

## 23. OCP Definition

> Software entities should generally be open for extension and closed for modification.

This means existing stable behavior should not require repeated edits every time a supported variation is added.

---

## 24. OCP Is Not “Never Modify Code”

Requirements change. Existing code sometimes must be modified.

OCP means identifying variation points where extension is cheaper and safer than repeatedly changing stable logic.

---

## 25. OCP Example — Conditional Explosion

```js
function calculateShipping(order, type) {
  if (type === "standard") return 50;
  if (type === "express") return 100;
  if (type === "overnight") return 200;
  throw new Error("Unsupported");
}
```

If shipping strategies grow continuously, the branching function becomes a change hotspot.

---

## 26. OCP With Strategy

```js
const shippingStrategies = {
  standard: () => 50,
  express: () => 100,
  overnight: () => 200
};

function calculateShipping(order, type) {
  const strategy = shippingStrategies[type];
  if (!strategy) throw new Error("Unsupported shipping type");
  return strategy(order);
}
```

New strategies can often be added without changing the calculation workflow.

---

## 27. OCP Through Functions

```js
function checkout(order, calculateTax) {
  return order.total + calculateTax(order);
}
```

The behavior can be extended through an injected function.

---

## 28. OCP Through Composition

```text
Stable workflow
     ↓
Injected behavior
     ↓
Implementation A / B / C
```

Composition is frequently enough; a class hierarchy is not required.

---

## 29. OCP and Plugin Systems

A plugin architecture can provide an extension point:

```js
registerPlugin(plugin);
```

The core system can remain stable while plugins provide new capabilities.

---

## 30. OCP and Event Handlers

An event system can allow new reactions without changing the publisher.

```text
OrderCreated
   ↓
Event bus
 ↙  ↓  ↘
Email Audit Analytics
```

---

## 31. OCP Warning

Do not create an abstraction merely because something might change someday.

Predicting every future variation usually creates unnecessary complexity.

---

## 32. OCP and Configuration

Sometimes variation is data rather than code.

```js
const limits = {
  free: 5,
  pro: 100,
  enterprise: 10000
};
```

A configuration table may be better than a Strategy hierarchy.

---

## 33. OCP Checklist

- [ ] Is there a recurring variation?
- [ ] Is it isolated?
- [ ] Can new variants be added safely?
- [ ] Is the extension mechanism simpler than repeated branching?
- [ ] Did I avoid speculative abstraction?

---

# PART D — L: LISKOV SUBSTITUTION PRINCIPLE

## 34. LSP Definition

> Subtypes should be usable wherever their base type is expected without violating the expectations of that contract.

LSP is about behavioral substitutability, not merely matching method names.

---

## 35. Simple LSP Example

If a function expects:

```js
function printReport(reporter) {
  return reporter.report();
}
```

Every supplied reporter must honor the expected `report()` behavior.

---

## 36. LSP Violation — Unsupported Method

```js
class Bird {
  fly() {}
}

class Penguin extends Bird {
  fly() {
    throw new Error("Penguins cannot fly");
  }
}
```

The base abstraction promises behavior that the subtype cannot honor.

---

## 37. Better Bird Model

```text
Bird
 ├── Penguin
 └── FlyingBird
      ├── Eagle
      └── Sparrow
```

Or use capability-based composition instead of inheritance.

---

## 38. LSP Is About Contracts

A contract includes more than method signatures:

- valid inputs
- output meaning
- error behavior
- side effects
- timing expectations where relevant
- invariants
- state transitions

---

## 39. Preconditions

A subtype should not unexpectedly require stricter inputs than callers were promised.

```text
Base accepts A or B
Subtype accepts only A
→ potential substitutability violation
```

---

## 40. Postconditions

A subtype should preserve promised results and guarantees.

```text
Base: save() returns persisted record
Subtype: save() silently discards record
→ contract violation
```

---

## 41. Invariants

An invariant is a property that must remain true across valid operations.

Example:

```text
Account balance cannot become negative
```

If a subtype breaks an expected invariant, substitution may be unsafe.

---

## 42. LSP With TypeScript

Type compatibility does not prove behavioral compatibility.

```ts
interface Storage {
  save(data: string): Promise<void>;
}
```

A class can satisfy the interface syntactically and still violate the application's semantic expectations.

---

## 43. LSP and Exceptions

If callers expect a recoverable error contract but one implementation throws an unrelated fatal error, the implementation may violate substitutability.

Document and test error contracts.

---

## 44. LSP and Collections

If a function accepts a collection and assumes it can append values, supplying a read-only implementation violates the behavioral contract even if some surface methods appear compatible.

---

## 45. LSP and HTTP Clients

Suppose a client abstraction promises:

```text
request() → Response-like result
```

An implementation that returns cached stale data without documenting that semantic change may surprise callers.

Substitutability includes meaningful behavior.

---

## 46. LSP Refactoring Rule

If a subtype repeatedly throws “not supported,” reconsider the abstraction.

Often the base contract is too broad.

---

## 47. LSP Checklist

- [ ] Does the subtype honor the same contract?
- [ ] Are valid inputs compatible?
- [ ] Are outputs compatible?
- [ ] Are invariants preserved?
- [ ] Are errors compatible?
- [ ] Can callers remain unaware of the concrete subtype?

---

# PART E — I: INTERFACE SEGREGATION PRINCIPLE

## 48. ISP Definition

> Clients should not be forced to depend on methods they do not need.

JavaScript does not require formal interfaces for this principle to matter.

---

## 49. ISP — Fat Interface

```text
UserService
 ├── create
 ├── delete
 ├── exportPdf
 ├── sendEmail
 ├── generateInvoice
 ├── uploadAvatar
 └── resetPassword
```

A consumer needing only `create` should not need to understand the entire surface.

---

## 50. Smaller Interfaces

Conceptually split capabilities:

```text
UserCreator
UserDeleter
UserExporter
EmailSender
InvoiceGenerator
```

A consumer depends only on what it uses.

---

## 51. ISP With JavaScript Objects

Instead of passing a huge service:

```js
function registerUser({ createUser }) {
  return createUser();
}
```

Pass the smallest capability needed by the function.

---

## 52. ISP With TypeScript

```ts
interface UserCreator {
  create(input: CreateUserInput): Promise<User>;
}
```

A registration service can depend on `UserCreator` rather than a giant `UserService` interface.

---

## 53. Capability-Based Dependencies

A dependency should expose the capability the consumer needs.

```text
Consumer
   ↓
Small capability
   ↓
Concrete implementation
```

---

## 54. ISP and React Props

A component with dozens of unrelated props may indicate a broad interface.

Composition can sometimes produce a cleaner API.

---

## 55. ISP and Context

A React context containing an enormous application object can make consumers depend conceptually on unrelated state.

Smaller contexts or selectors can improve boundaries where justified.

---

## 56. ISP and Testing

Smaller dependencies are often easier to fake.

```js
const fakeMailer = {
  send: async () => {}
};
```

No need to implement unrelated methods.

---

## 57. ISP Warning

Do not split every interface into one-method objects automatically.

The goal is meaningful client-focused contracts, not maximum fragmentation.

---

## 58. ISP Checklist

- [ ] Does the consumer use most of the dependency?
- [ ] Can unrelated capabilities be separated?
- [ ] Is the smaller interface meaningful?
- [ ] Does splitting reduce coupling?

---

# PART F — D: DEPENDENCY INVERSION PRINCIPLE

## 59. DIP Definition

> High-level policy should not depend directly on low-level details; both should depend on abstractions. Details should depend on policies where appropriate.

The important idea is **dependency direction**.

---

## 60. Bad Dependency Direction

```text
UserService
    ↓
MongoUserRepository
    ↓
MongoDB
```

If the service directly constructs and controls Mongo-specific details, replacement and testing become harder.

---

## 61. Better Dependency Direction

```text
UserService
    ↓
UserRepository capability
    ↑
MongoUserRepository
```

The application core defines what it needs; infrastructure supplies the implementation.

---

## 62. DIP Is Not the Same as Dependency Injection

Dependency Injection is a technique.

Dependency Inversion is a design principle about dependency direction.

DI can help implement DIP, but they are not synonyms.

---

## 63. Manual Dependency Injection

```js
function createUserService(repository, logger) {
  return {
    async register(input) {
      logger.info("registering");
      return repository.create(input);
    }
  };
}
```

No container is required.

---

## 64. DIP and Interfaces

In TypeScript:

```ts
interface UserRepository {
  findById(id: string): Promise<User | null>;
  create(input: CreateUser): Promise<User>;
}
```

The service depends on the capability contract.

---

## 65. DIP and Functions

A function parameter can be an abstraction.

```js
function sendWelcome(user, sendEmail) {
  return sendEmail(user.email);
}
```

The function does not need a concrete email SDK.

---

## 66. DIP and Database Independence

DIP does not promise that changing MongoDB to PostgreSQL is free.

It reduces direct coupling so the change can be localized when the abstraction is appropriate.

---

## 67. DIP and External APIs

```text
Application Core
      ↓
Payment Port
      ↑
Stripe Adapter
      ↑
Stripe SDK
```

The application does not need to model every SDK detail.

---

## 68. DIP and Testing

```text
Production → real repository
Test       → fake repository
```

The same application service can run against either implementation.

---

## 69. DIP Warning

Do not create abstractions solely to satisfy a slogan.

If a dependency is stable, local, and easy to replace in tests, direct usage may be perfectly reasonable.

---

## 70. DIP Checklist

- [ ] Does high-level policy know infrastructure details?
- [ ] Can the dependency be injected?
- [ ] Is the abstraction owned by the correct side?
- [ ] Does the abstraction represent a useful capability?
- [ ] Is the abstraction worth its complexity?

---

# PART G — SOLID TOGETHER

## 71. SOLID Relationship

The principles reinforce one another.

```text
SRP → focused responsibilities
OCP → controlled extension
LSP → safe substitution
ISP → focused contracts
DIP → controlled dependency direction
```

---

## 72. Example Architecture

```text
HTTP Controller
      ↓
CreateUserUseCase
      ↓
UserRepository Port ← MongoUserRepository
      ↓
Mailer Port          ← EmailAdapter
```

Possible principle mapping:

- SRP: focused components
- OCP: interchangeable adapters
- LSP: adapters honor contracts
- ISP: small ports
- DIP: use case depends on ports

---

## 73. SOLID Is Not Independent Boxes

A refactoring may improve several principles simultaneously.

For example, extracting a repository can improve SRP, ISP, DIP, and testability at once.

---

## 74. SOLID vs Overengineering

A design can technically contain all five principles and still be terrible.

```text
10-line problem
   ↓
20 classes
   ↓
100 interfaces
   ↓
SOLID ceremony
```

Principles should reduce change cost, not create ceremony.

---

# PART H — SRP DEEP DIVE

## 75. Responsibility Is Contextual

A “responsibility” can be defined at different levels.

```text
Function
Module
Service
Subsystem
Application
```

Choose a boundary that matches the problem.

---

## 76. SRP and Business Rules

Business rules should not become accidental side effects of database code.

```js
function calculateDiscount(order) {
  if (order.total > 1000) return order.total * 0.1;
  return 0;
}
```

This rule can remain independent from persistence.

---

## 77. SRP and Side Effects

A pure calculation can often be separated from external effects.

```text
Input → Pure decision → Effect
```

This improves testability without requiring classes.

---

## 78. SRP and Logging

Logging can be a cross-cutting concern. Avoid scattering complex logging policy through every business function.

Middleware, decorators, or centralized instrumentation may be appropriate depending on context.

---

## 79. SRP and Validation

Separate transport validation from domain invariants when they represent different responsibilities.

```text
HTTP shape validation
        ↓
Domain validation
```

Not every project needs two separate modules.

---

## 80. SRP and DTO Mapping

Mapping persistence entities to API DTOs can be separated when representation changes independently.

---

# PART I — OCP DEEP DIVE

## 81. Variation Points

Find where change is expected:

```text
Payment provider
Tax calculation
Notification channel
File format
Search algorithm
```

These are potential extension points.

---

## 82. Stable Core

A good extension design protects stable business logic from volatile infrastructure details.

---

## 83. OCP With Registries

```js
const handlers = new Map();

function register(type, handler) {
  handlers.set(type, handler);
}
```

Plugins can register new handlers without editing dispatch logic.

---

## 84. Registry Trade-off

Registries introduce indirection and lifecycle concerns. They are useful when dynamic extension is real.

---

## 85. OCP With Configuration

Use data-driven design when behavior differences are simple values.

```js
const plans = {
  free: { maxNotes: 10 },
  pro: { maxNotes: 1000 }
};
```

---

## 86. OCP With Polymorphism

```js
function exportReport(exporter, data) {
  return exporter.export(data);
}
```

Any implementation honoring the contract can participate.

---

# PART J — LSP DEEP DIVE

## 87. Behavioral Contract

Think beyond types:

```text
Input domain
Output domain
State changes
Errors
Invariants
Side effects
```

---

## 88. LSP and Mutable State

A subtype that changes lifecycle semantics can violate caller expectations even when methods exist.

---

## 89. LSP and Read-Only Objects

Do not promise mutability in a base abstraction and provide an implementation that rejects mutation.

Split capabilities if necessary.

---

## 90. LSP and Error Types

If callers rely on a documented error category, replacement implementations should preserve a compatible error contract or provide a documented translation layer.

---

## 91. LSP and Timing

For some systems, timing is part of the contract.

Example: replacing a local synchronous capability with a remote asynchronous one may require changing the abstraction rather than pretending they are identical.

---

## 92. LSP Test Strategy

Write contract tests for multiple implementations.

```text
Repository contract
      ↓
Mongo implementation
Memory implementation
Test implementation
```

Each should satisfy the same behavioral expectations.

---

# PART K — ISP DEEP DIVE

## 93. Consumer-Driven Interfaces

Define dependencies around what the consumer actually needs.

```js
function publishReport({ save, notify }) {}
```

The function does not need an entire application service.

---

## 94. ISP and TypeScript Structural Typing

TypeScript's structural typing makes small object contracts natural.

```ts
type Logger = {
  info(message: string): void;
};
```

Any compatible object can be supplied.

---

## 95. ISP and Mock Complexity

If a test fake needs to implement 30 irrelevant methods, the dependency may be too broad.

---

## 96. ISP and React

Instead of a component receiving an enormous object:

```jsx
<UserCard user={user} permissions={permissions} analytics={analytics} theme={theme} ... />
```

consider whether composition or smaller props better represent the component's actual needs.

---

# PART L — DIP DEEP DIVE

## 97. Policy vs Detail

Policy answers:

```text
What should happen?
```

Detail answers:

```text
How does infrastructure make it happen?
```

---

## 98. Dependency Direction Diagram

```text
                 ┌──────────────┐
                 │ Application  │
                 │    Policy    │
                 └──────┬───────┘
                        ↓
                 ┌──────────────┐
                 │    Port      │
                 └──────▲───────┘
                        │
              ┌─────────┴─────────┐
              │                   │
        Mongo Adapter       Email Adapter
```

---

## 99. DIP and Constructor Injection

```js
class UserService {
  constructor(repository) {
    this.repository = repository;
  }
}
```

This makes dependencies explicit.

---

## 100. DIP and Factory Functions

```js
function createUserService({ repository, logger }) {
  return { /* ... */ };
}
```

Factory functions are often natural DI containers for small modules.

---

## 101. DIP and Environment Configuration

Do not scatter environment-variable access across domain logic.

```text
process.env
   ↓
configuration adapter
   ↓
application dependency
```

---

# PART M — COMMON VIOLATIONS

## 102. SRP Violation

One class handles authentication, payments, email, reports, and persistence.

Refactor around cohesive responsibilities.

---

## 103. OCP Violation

Every new provider requires editing a giant switch across multiple modules.

Centralize provider selection and isolate provider behavior where justified.

---

## 104. LSP Violation

A subtype throws `NotSupportedError` for a required base method.

Reconsider the abstraction or split capabilities.

---

## 105. ISP Violation

A small consumer depends on a huge service interface.

Extract the consumer's required capability.

---

## 106. DIP Violation

Business logic imports and constructs a concrete database client directly throughout the domain.

Move infrastructure behind a suitable boundary.

---

# PART N — REFACTORING WORKFLOW

## 107. Step 1 — Find Change Hotspots

Search for modules frequently modified for unrelated features.

---

## 108. Step 2 — Find Responsibility Clusters

Group code by the reason it changes rather than by arbitrary file size.

---

## 109. Step 3 — Find Volatile Dependencies

Identify:

- databases
- HTTP clients
- clocks
- randomness
- filesystem
- email providers
- payment providers

These often make useful boundaries.

---

## 110. Step 4 — Extract Capability

Instead of:

```js
service.stripeClient.charges.create(...)
```

consider:

```js
paymentGateway.charge(...)
```

when the application genuinely needs provider independence.

---

## 111. Step 5 — Inject Dependency

```js
const service = createPaymentService({ paymentGateway });
```

---

## 112. Step 6 — Add Tests

Test the behavior before and after refactoring.

---

## 113. Step 7 — Remove Unnecessary Abstraction

If the abstraction does not improve clarity, change isolation, or testability, delete it.

---

# PART O — SOLID AND DESIGN PATTERNS

## 114. SRP + Factory

A factory can own object-creation responsibility instead of spreading creation conditions through business code.

---

## 115. OCP + Strategy

Strategy provides interchangeable algorithms that can extend behavior without changing stable orchestration.

---

## 116. LSP + Polymorphism

Polymorphism is useful only when implementations genuinely satisfy the same behavioral contract.

---

## 117. ISP + Adapter

An adapter can expose only the capability a consumer needs.

---

## 118. DIP + Repository

A repository port can isolate application logic from persistence infrastructure.

---

## 119. SOLID + Decorator

Decorators can isolate cross-cutting behavior such as metrics or logging, supporting focused core responsibilities.

---

## 120. SOLID + State Machine

A state machine can make lifecycle responsibilities and valid transitions explicit, reducing scattered conditional logic.

---

# PART P — JAVASCRIPT PRACTICAL ARCHITECTURE

## 121. Notes App Before Refactoring

```text
notesController.js
 ├── validation
 ├── Mongo queries
 ├── permission logic
 ├── event publishing
 ├── response formatting
 └── email
```

This is a change hotspot.

---

## 122. Notes App After Refactoring

```text
Controller
   ↓
CreateNoteUseCase
   ├── NoteRepository
   ├── PermissionChecker
   └── EventPublisher
```

---

## 123. Repository Contract

```ts
interface NoteRepository {
  findById(id: string): Promise<Note | null>;
  create(input: CreateNote): Promise<Note>;
  update(id: string, input: UpdateNote): Promise<Note>;
}
```

This is an application capability rather than a MongoDB API.

---

## 124. Repository Implementation

```js
function createMongoNoteRepository(NoteModel) {
  return {
    findById(id) {
      return NoteModel.findById(id);
    },
    create(input) {
      return NoteModel.create(input);
    }
  };
}
```

---

## 125. Use Case

```js
function createNoteUseCase({ repository, permissionChecker }) {
  return async function createNote(user, input) {
    await permissionChecker.assertCanCreate(user);
    return repository.create(input);
  };
}
```

---

## 126. Controller

```js
async function createNoteController(req, res) {
  const note = await createNote(req.user, req.body);
  res.status(201).json(note);
}
```

The controller remains transport-focused.

---

## 127. Testing the Use Case

```js
const repository = {
  create: async (input) => ({ id: "1", ...input })
};

const permissionChecker = {
  assertCanCreate: async () => {}
};
```

The use case can be tested without MongoDB.

---

# PART Q — REACT AND SOLID

## 128. SRP in React

A component should have a coherent UI responsibility. Extracting components is useful when it improves ownership, readability, reuse, or testing—not merely because a component exceeds an arbitrary line count.

---

## 129. OCP in React

Composition can provide extension points.

```jsx
<Card>
  <Card.Header />
  <Card.Body />
</Card>
```

---

## 130. LSP in Components

If a component API promises a prop behavior, alternative implementations should preserve that contract.

---

## 131. ISP in Props

Avoid passing unrelated application state into a component that needs only one small capability.

---

## 132. DIP in React

A component can receive a callback instead of directly importing a concrete service.

```jsx
<SaveButton onSave={saveNote} />
```

---

## 133. SOLID and Hooks

Custom hooks can isolate stateful behavior while components focus on rendering.

---

## 134. SOLID and Context

Context can provide stable capabilities such as authentication or configuration, but huge mutable contexts can increase coupling.

---

## 135. SOLID and State Management

Selectors and focused stores can reduce unnecessary dependency on unrelated state.

---

# PART R — NODE/EXPRESS AND SOLID

## 136. Route Layer

```text
Route
 ↓
Controller
 ↓
Use Case
 ↓
Repository
```

Each boundary has a focused reason to exist.

---

## 137. Middleware

Authentication and validation middleware can handle cross-cutting transport concerns.

---

## 138. Error Boundary

Centralized HTTP error translation can prevent every controller from duplicating response formatting.

---

## 139. Configuration Boundary

Read environment variables in configuration code and pass typed/validated configuration inward.

---

## 140. External Provider Adapter

```text
Payment Port
   ↑
Stripe Adapter
   ↑
Stripe SDK
```

The application should not spread provider-specific SDK calls everywhere.

---

# PART S — TESTING SOLID DESIGNS

## 141. SRP and Unit Tests

Focused modules tend to have smaller, clearer tests.

---

## 142. OCP and Contract Tests

If multiple implementations share a contract, contract tests can verify each implementation.

---

## 143. LSP and Substitutability Tests

Run the same behavior suite against every implementation.

---

## 144. ISP and Test Doubles

Smaller capabilities usually require smaller fakes.

---

## 145. DIP and Integration Tests

Use fakes for unit tests and real adapters in focused integration tests.

---

## 146. Avoid Mock-Heavy Design

If every test needs dozens of mocks, the abstraction graph may be too coupled.

SOLID should make behavior easier to isolate, not encourage unrealistic mock networks.

---

# PART T — PERFORMANCE AND SOLID

## 147. SOLID Does Not Guarantee Performance

Extra abstraction can add indirection.

The principles primarily address maintainability and design quality.

---

## 148. Measure Before Optimizing

```text
Hypothesis
 ↓
Profile / measure
 ↓
Identify bottleneck
 ↓
Optimize
 ↓
Measure again
```

---

## 149. Excessive Abstraction Cost

Thousands of tiny objects/functions can increase cognitive overhead and sometimes runtime overhead.

The appropriate boundary depends on workload and architecture.

---

## 150. Caching and DIP

Injecting a cache can make caching policy replaceable:

```js
createUserService({ repository, cache });
```

But do not introduce caching without understanding invalidation and consistency.

---

# PART U — SECURITY AND SOLID

## 151. SOLID Is Not Security

Good architecture does not replace:

- authentication
- authorization
- input validation
- output encoding
- CSRF protection where applicable
- secure secret handling
- rate limiting

---

## 152. SRP and Authorization

Do not hide authorization inside UI-only components. Enforce access at trusted application/server boundaries.

---

## 153. DIP and Security Services

A security capability can be injected, but the concrete implementation must enforce the real security policy.

---

## 154. ISP and Privilege

A narrow capability interface can reduce accidental access to unrelated operations.

This is a design benefit, not a complete security boundary by itself.

---

# PART V — COMMON MISUNDERSTANDINGS

## 155. “SRP Means One Function”

False.

SRP is about cohesive responsibility, not literal function count.

---

## 156. “OCP Means Never Modify Code”

False.

Modification is sometimes correct. OCP focuses on isolating recurring variation.

---

## 157. “LSP Means Same Methods”

False.

Behavioral contracts matter.

---

## 158. “ISP Means One Method Per Interface”

False.

Interfaces should be sized around meaningful client needs.

---

## 159. “DIP Means Dependency Injection Container”

False.

Manual dependency injection can implement dependency inversion.

---

## 160. “SOLID Requires Classes”

False.

JavaScript modules and functions can express all five ideas.

---

## 161. “More Abstractions Means More SOLID”

False.

Unnecessary abstractions increase complexity.

---

## 162. “SOLID Means No Coupling”

False.

Every useful system has dependencies. The goal is intentional, manageable coupling.

---

# PART W — PRACTICE: BEGINNER

## 163. Challenge 1 — SRP

Find three unrelated responsibilities in a giant `UserService` and split them conceptually.

---

## 164. Challenge 2 — OCP

Refactor a shipping `if/else` into a strategy map.

---

## 165. Challenge 3 — LSP

Design a notification interface where email, SMS, and push implementations can safely substitute for one another.

---

## 166. Challenge 4 — ISP

Split a ten-method `Printer` interface into consumer-focused capabilities.

---

## 167. Challenge 5 — DIP

Inject a repository into a user service instead of constructing it internally.

---

## 168. Challenge 6 — SRP

Separate a function that validates, formats, saves, and logs a note.

---

## 169. Challenge 7 — OCP

Create a discount strategy registry.

---

## 170. Challenge 8 — LSP

Find and repair a subtype that throws `NotSupportedError` for a base method.

---

## 171. Challenge 9 — ISP

Create a minimal `Logger` capability used by a service.

---

## 172. Challenge 10 — DIP

Inject a clock into code that calculates expiration times.

---

# PART X — PRACTICE: INTERMEDIATE

## 173. Challenge 11

Refactor a controller that directly accesses MongoDB.

---

## 174. Challenge 12

Create a payment port and two provider adapters.

---

## 175. Challenge 13

Build contract tests shared by two repository implementations.

---

## 176. Challenge 14

Refactor a React component with data fetching, validation, and rendering into focused units.

---

## 177. Challenge 15

Build a plugin-based notification system.

---

## 178. Challenge 16

Create a configuration object validated at the application boundary.

---

## 179. Challenge 17

Replace a large switch statement with a strategy only if the variations are independently evolving.

---

## 180. Challenge 18

Design a file-storage port with local and cloud adapters.

---

## 181. Challenge 19

Build an authorization capability that can be tested independently from the database.

---

## 182. Challenge 20

Refactor a service locator into explicit dependency injection.

---

# PART Y — PRACTICE: ADVANCED

## 183. Challenge 21

Design a full notes application using SOLID and explain every boundary.

---

## 184. Challenge 22

Build a payment workflow with Strategy + Factory + Adapter + DIP.

---

## 185. Challenge 23

Build a multi-tenant repository boundary and test tenant isolation.

---

## 186. Challenge 24

Design a state-machine-based document workflow.

---

## 187. Challenge 25

Build an event-driven notification system with retry and idempotency handling.

---

## 188. Challenge 26

Create a plugin architecture and document its extension contract.

---

## 189. Challenge 27

Refactor a legacy Express application without changing externally observable behavior.

---

## 190. Challenge 28

Write contract tests for three interchangeable storage adapters.

---

## 191. Challenge 29

Create a React feature using composition instead of inheritance.

---

## 192. Challenge 30

Perform a SOLID design review on an existing project and record trade-offs rather than simply listing violations.

---

# PART Z — OUTPUT AND DESIGN-PREDICTION EXERCISES

## 193. Predict 1

What dependency is hidden here?

```js
function createService() {
  const db = new MongoClient(process.env.DB_URL);
  return {
    save(data) {
      return db.insert(data);
    }
  };
}
```

Expected concept: DIP/testability problem.

---

## 194. Predict 2

What principle is likely affected?

```js
class Report {
  calculate() {}
  saveToDb() {}
  sendEmail() {}
  renderPdf() {}
}
```

Expected concept: SRP.

---

## 195. Predict 3

Which principle is relevant?

```js
function notify(channel, user) {
  if (channel === "email") {}
  if (channel === "sms") {}
  if (channel === "push") {}
}
```

Expected concept: potentially OCP/Strategy, depending on how the variation evolves.

---

## 196. Predict 4

What is suspicious?

```js
class ReadOnlyFile {
  read() {}
  write() {
    throw new Error("Not supported");
  }
}
```

Expected concept: possible LSP violation if the base contract requires `write`.

---

## 197. Predict 5

What is the likely ISP issue?

```js
function showUser(userService) {
  return userService.findById("1");
}
```

If `userService` exposes 30 unrelated capabilities, the consumer may depend on an overly broad contract.

---

# PART AA — INTERVIEW QUESTIONS

## 198. What Does SOLID Stand For?

Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.

---

## 199. Explain SRP

A module should have a focused, cohesive responsibility and a clear reason for change.

---

## 200. Explain OCP

Design stable areas so recurring variations can often be introduced through extension rather than repeatedly modifying core logic.

---

## 201. Explain LSP

A subtype should preserve the behavioral expectations of the abstraction it substitutes for.

---

## 202. Explain ISP

Consumers should depend on focused contracts containing the capabilities they actually need.

---

## 203. Explain DIP

High-level policy should not be tightly coupled to low-level implementation details; both should depend on appropriate abstractions.

---

## 204. DIP vs DI?

DIP is a design principle. DI is a technique for supplying dependencies.

---

## 205. SRP vs Separation of Concerns?

Separation of concerns is the broader design idea. SRP applies focused responsibility to modules/classes and their reasons for change.

---

## 206. OCP vs YAGNI?

OCP encourages extension around known variation. YAGNI warns against building unused future functionality. Good design balances both.

---

## 207. Does LSP Require Inheritance?

No. Substitutability can apply to interfaces, protocols, object shapes, and other abstractions.

---

## 208. Why Is LSP Hard?

Because type compatibility can be checked mechanically while semantic contracts involve behavior, invariants, errors, and side effects.

---

## 209. Why Is ISP Useful in JavaScript?

Small object/function contracts reduce unnecessary coupling and make dependencies easier to fake and understand.

---

## 210. Why Is DIP Useful for Testing?

External dependencies can be replaced with controlled implementations, allowing core behavior to be tested independently.

---

## 211. Does SOLID Always Improve Performance?

No. SOLID primarily targets maintainability and changeability. Extra indirection can have costs.

---

## 212. Can a Function Follow SOLID?

Yes. SOLID ideas can be expressed through functions, modules, composition, and dependency injection.

---

## 213. Can SOLID Be Overused?

Yes. Excessive abstractions can increase cognitive load and make simple systems harder to change.

---

# PART AB — TEACH-BACK

## 214. Teach SRP in 60 Seconds

Explain “focused responsibility” using a notes application.

---

## 215. Teach OCP in 60 Seconds

Explain a shipping strategy and why repeatedly modifying a large conditional can become expensive.

---

## 216. Teach LSP in 60 Seconds

Explain behavioral substitutability using a notification or storage abstraction.

---

## 217. Teach ISP in 60 Seconds

Explain why a consumer should not depend on 30 capabilities when it needs one.

---

## 218. Teach DIP in 60 Seconds

Explain why business logic should receive a repository capability instead of constructing MongoDB directly.

---

## 219. Teach DIP vs DI

Use this memory trick:

```text
DIP = direction of dependency
DI  = delivery of dependency
```

---

## 220. Teach All Five

```text
S → Keep responsibility focused
O → Isolate recurring variation
L → Preserve behavioral contracts
I → Keep client contracts focused
D → Control dependency direction
```

---

# PART AC — DEBUGGING SOLID DESIGNS

## 221. Symptom: Giant Class

Investigate SRP violations and mixed responsibilities.

---

## 222. Symptom: Giant Switch

Investigate OCP and whether the branches represent genuine independent strategies.

---

## 223. Symptom: Subclass Exceptions

Investigate LSP and whether the parent contract is too broad.

---

## 224. Symptom: Huge Interface

Investigate ISP and consumer-specific capabilities.

---

## 225. Symptom: Hard-to-Test Service

Investigate DIP and hidden construction of infrastructure dependencies.

---

## 226. Symptom: Too Many Interfaces

Investigate whether abstractions are providing real value or merely adding ceremony.

---

## 227. Symptom: Too Many Mocks

Investigate whether boundaries are too granular or dependencies too broad.

---

## 228. Symptom: Circular Dependencies

Inspect dependency direction and module ownership.

---

## 229. Symptom: Business Logic in Controller

Move cohesive application/domain rules behind a use-case/service boundary where it improves clarity and testing.

---

# PART AD — DESIGN REVIEW

## 230. Responsibility Review

Ask:

- What does this module own?
- What does it not own?
- What causes it to change?

---

## 231. Extension Review

Ask:

- Where does variation occur?
- Is extension actually needed?
- Would configuration be simpler?

---

## 232. Substitution Review

Ask:

- Can another implementation replace this one?
- Are the semantic guarantees identical?
- Are errors and invariants compatible?

---

## 233. Interface Review

Ask:

- What does each consumer need?
- Is the contract broader than necessary?

---

## 234. Dependency Review

Ask:

- Who owns the abstraction?
- Does core code know infrastructure details?
- Can dependencies be replaced in tests?

---

## 235. Complexity Review

Ask:

- Did this abstraction remove complexity or move it?
- Is the new vocabulary worth learning?

---

# PART AE — MASTER NOTES

## 236. SRP Memory Trick

```text
One cohesive responsibility.
One clear ownership boundary.
```

---

## 237. OCP Memory Trick

```text
Stable core + controlled extension points.
```

---

## 238. LSP Memory Trick

```text
If I swap it, the caller should still be correct.
```

---

## 239. ISP Memory Trick

```text
Depend on what you need, not everything available.
```

---

## 240. DIP Memory Trick

```text
Policy → abstraction ← detail
```

---

## 241. Five-Question Diagnostic

```text
S → Is this responsibility focused?
O → Where does variation live?
L → Can implementations safely substitute?
I → Is the contract too broad?
D → Who depends on whom?
```

---

## 242. SOLID in One Diagram

```text
                 ┌─────────────────┐
                 │  Business Policy│
                 └────────┬────────┘
                          ↓
                    ┌───────────┐
                    │ Contracts │
                    └─────▲─────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
       Database         Email          Payment
       Adapter          Adapter         Adapter

SRP → focused units
OCP → extensible variation
LSP → safe implementations
ISP → focused contracts
DIP → dependency direction
```

---

# PART AF — FINAL MASTERY PROJECT

## 243. Project: SOLID Notes Platform

Build a production-style full-stack Notes application and explicitly document every SOLID decision.

Required features:

- authentication
- authorization
- users
- folders
- nested folders
- notes
- tags
- archive
- trash
- favourites
- sharing
- search
- pagination
- validation
- error handling
- audit events

---

## 244. Project Architecture

```text
React
 ↓
API Client
 ↓
Controllers
 ↓
Use Cases
 ↓
Domain Rules
 ↓
Ports / Capabilities
 ↓
Adapters
 ↓
MongoDB / External APIs
```

---

## 245. Project SRP Requirement

Identify separate responsibilities for:

- HTTP handling
- validation
- note lifecycle rules
- authorization
- persistence
- notifications
- mapping
- event publishing

---

## 246. Project OCP Requirement

Create extension points for at least:

- search strategy
- notification provider
- file storage provider

Document why each variation is expected.

---

## 247. Project LSP Requirement

Create at least two implementations for one capability and write shared contract tests.

Example:

```text
NoteRepository
 ├── MemoryNoteRepository
 └── MongoNoteRepository
```

---

## 248. Project ISP Requirement

Use focused capabilities such as:

```text
NoteReader
NoteWriter
NoteDeleter
```

Only where these boundaries represent genuine consumer needs.

---

## 249. Project DIP Requirement

The use cases must not directly construct MongoDB clients, email SDKs, or payment/provider SDKs.

---

## 250. Project Testing Requirement

Include:

- unit tests for pure rules
- contract tests for interchangeable adapters
- integration tests for persistence/API boundaries
- component tests for important UI behavior
- E2E tests for critical journeys
- authorization tests
- failure-path tests

---

## 251. Project Documentation Requirement

For every major abstraction document:

```text
Problem
Responsibility
Consumers
Contract
Implementation(s)
Pattern used
SOLID principles involved
Alternative considered
Trade-offs
Testing strategy
```

---

## 252. Project Anti-Overengineering Review

At the end, delete at least one abstraction that does not justify its complexity.

Explain why removing it improved the design.

---

# FINAL MASTERY CHECKLIST

## 253. Fundamentals

- [ ] Explain coupling
- [ ] Explain cohesion
- [ ] Explain abstraction
- [ ] Explain composition
- [ ] Explain dependency direction

---

## 254. SRP

- [ ] Define SRP
- [ ] Find mixed responsibilities
- [ ] Refactor a giant service
- [ ] Explain why file count is not SRP

---

## 255. OCP

- [ ] Identify variation points
- [ ] Use Strategy when justified
- [ ] Use composition for extension
- [ ] Recognize speculative abstraction

---

## 256. LSP

- [ ] Explain behavioral substitutability
- [ ] Identify contract violations
- [ ] Explain preconditions/postconditions
- [ ] Write implementation contract tests

---

## 257. ISP

- [ ] Identify fat contracts
- [ ] Extract consumer-focused capabilities
- [ ] Explain ISP in JavaScript without formal interfaces
- [ ] Explain ISP in TypeScript

---

## 258. DIP

- [ ] Explain policy vs detail
- [ ] Inject dependencies manually
- [ ] Design repository ports
- [ ] Separate DIP from DI

---

## 259. Architecture

- [ ] Controller/use-case/repository boundary
- [ ] Ports and adapters
- [ ] External provider adapters
- [ ] Configuration boundary
- [ ] Testing boundaries

---

## 260. Judgment

- [ ] Know when not to use SOLID
- [ ] Explain trade-offs
- [ ] Remove unnecessary abstractions
- [ ] Prefer composition where appropriate
- [ ] Measure performance when relevant
- [ ] Preserve security boundaries

---

# FINAL RULE

> **SOLID is not about making code look sophisticated. It is about making change safer, dependencies clearer, responsibilities more coherent, and behavior easier to substitute and test.**

Before adding an interface, class, factory, adapter, or abstraction, ask:

```text
What problem does this solve?
What change does it isolate?
Who owns the contract?
How will I test it?
What complexity does it add?
Can the simpler design work?
```

If you can answer those questions clearly, you are using SOLID as a design tool rather than treating it as a memorization exercise.
