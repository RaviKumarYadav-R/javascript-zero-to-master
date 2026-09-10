# 23 — Design Patterns

> A JavaScript-first guide to recognizing, understanding, implementing, testing, and choosing software design patterns. Learn patterns as reusable design ideas—not copy-paste recipes.

## Learning Goal

Design patterns are recurring solutions to recurring design problems. A pattern describes a useful structure, its trade-offs, and when it fits. It does **not** mean every problem needs a pattern.

---

## 1. What Is a Design Pattern?

A design pattern is a named, reusable design idea for solving a recurring software-design problem.

```text
Problem
  ↓
Context + Constraints
  ↓
Recognize recurring shape
  ↓
Choose a suitable pattern
  ↓
Adapt it to the codebase
  ↓
Measure trade-offs
```

A pattern is not a library, framework, algorithm, or finished implementation.

---

## 2. Why Patterns Matter

Patterns can provide:

- shared vocabulary
- predictable structure
- easier communication
- reusable design heuristics
- safer extension points
- clearer responsibilities

But patterns can also introduce unnecessary abstraction.

> **Rule:** solve the problem first; name the pattern second.

---

## 3. Pattern vs Algorithm vs Architecture

| Concept | Main question |
|---|---|
| Algorithm | How do we compute this? |
| Data structure | How do we organize data? |
| Design pattern | How do objects/modules collaborate? |
| Architecture | How is the whole system organized? |
| Framework | What structure/tools does the platform provide? |

---

## 4. Pattern Families

This chapter groups patterns into:

1. Creational
2. Structural
3. Behavioral
4. Functional/compositional
5. Application patterns
6. Architectural patterns
7. JavaScript/browser patterns
8. Anti-patterns and refactoring patterns

---

# PART A — FOUNDATIONS

## 5. Composition Before Inheritance

Prefer assembling small behaviors when inheritance would create rigid coupling.

```js
const canLog = (obj) => ({
  log(message) {
    console.log(`[${obj.name}]`, message);
  }
});

const user = { name: "Ravi" };
Object.assign(user, canLog(user));

user.log("Hello");
```

---

## 6. Coupling

Coupling describes how strongly one part depends on another.

```text
High coupling:
A ───────► B ───────► C

Lower coupling:
A ─► Interface ◄─ B
```

Lower coupling usually makes replacement and testing easier.

---

## 7. Cohesion

Cohesion describes how closely related the responsibilities inside a module are.

High cohesion is usually desirable.

```text
Bad module
User + PDF + Email + Database + Payments

Better
UserService
EmailService
PdfService
PaymentService
```

---

## 8. Encapsulation

Encapsulation keeps implementation details behind a controlled interface.

```js
function createCounter() {
  let value = 0;

  return {
    increment() {
      value++;
    },
    getValue() {
      return value;
    }
  };
}
```

---

## 9. Abstraction

Abstraction exposes what a caller needs while hiding unnecessary implementation details.

```js
class PaymentService {
  pay(amount) {
    return this.gateway.charge(amount);
  }
}
```

The caller does not need to know how the gateway communicates with the provider.

---

## 10. Dependency Inversion

High-level logic should depend on stable abstractions/contracts rather than concrete infrastructure.

```js
function createUserService(userRepository) {
  return {
    getUser(id) {
      return userRepository.findById(id);
    }
  };
}
```

This is especially useful for testing.

---

## 11. Dependency Injection

Instead of constructing dependencies internally, provide them from outside.

```js
const service = createUserService(realRepository);

const testService = createUserService(fakeRepository);
```

---

## 12. Open for Extension

Good designs make common extensions possible without repeatedly rewriting stable logic.

```text
Core logic
   │
   ├── Email notifier
   ├── SMS notifier
   └── Push notifier
```

---

# PART B — CREATIONAL PATTERNS

## 13. Factory Pattern

A factory centralizes object creation.

```js
function createUser(type, name) {
  if (type === "admin") {
    return { name, role: "admin" };
  }

  return { name, role: "user" };
}
```

---

## 14. Why Use a Factory?

Use a factory when creation logic is conditional, complex, or likely to change.

```text
Caller
  ↓
Factory
  ├── Admin
  ├── Editor
  └── Viewer
```

---

## 15. Factory Function vs Factory Class

JavaScript often uses factory functions because objects do not require a class hierarchy.

```js
const createLogger = (prefix) => ({
  info(message) {
    console.log(prefix, message);
  }
});
```

---

## 16. Factory Method Concept

A base workflow can delegate creation to a specialized implementation.

```js
class ReportService {
  createFormatter() {
    throw new Error("Implement createFormatter");
  }

  generate(data) {
    const formatter = this.createFormatter();
    return formatter.format(data);
  }
}
```

---

## 17. Abstract Factory Concept

An abstract factory creates related objects that should work together.

```text
UI Factory
 ├── Button
 └── Modal

Dark UI Factory
 ├── DarkButton
 └── DarkModal
```

JavaScript does not require a formal abstract-class mechanism to express this idea.

---

## 18. Builder Pattern

Builder separates construction of a complex object from its final representation.

```js
class RequestBuilder {
  constructor() {
    this.options = {};
  }

  method(value) {
    this.options.method = value;
    return this;
  }

  header(name, value) {
    this.options.headers ??= {};
    this.options.headers[name] = value;
    return this;
  }

  build() {
    return { ...this.options };
  }
}
```

---

## 19. Fluent Builder

Returning `this` allows chaining.

```js
const request = new RequestBuilder()
  .method("POST")
  .header("Content-Type", "application/json")
  .build();
```

---

## 20. Builder Trade-off

Builders help when configuration is genuinely complex. For three simple properties, a plain object may be clearer.

---

## 21. Singleton Pattern

A singleton intends to provide one shared instance.

```js
const config = Object.freeze({
  environment: "production"
});
```

JavaScript modules already provide module-level singleton-like sharing through their module cache/instantiation semantics.

---

## 22. Singleton Warning

Global mutable state can create hidden coupling and test-order problems.

```text
Test A changes global state
        ↓
Test B unexpectedly observes it
```

Prefer explicit dependencies when practical.

---

## 23. Prototype Pattern

Objects can delegate property lookup through their prototype chain.

```js
const userMethods = {
  greet() {
    return `Hello ${this.name}`;
  }
};

const user = Object.create(userMethods);
user.name = "Ravi";
```

---

## 24. Prototype Under the Hood

Property lookup approximately follows:

```text
object
  ↓
its prototype
  ↓
prototype's prototype
  ↓
null
```

The exact engine implementation is an optimization detail; reason from ECMAScript semantics rather than assuming a particular memory layout.

---

# PART C — STRUCTURAL PATTERNS

## 25. Adapter Pattern

Adapter converts one interface into another expected interface.

```js
function createPaymentAdapter(oldGateway) {
  return {
    pay(amount) {
      return oldGateway.charge(amount);
    }
  };
}
```

---

## 26. Adapter Use Cases

Common examples:

- old API → new service interface
- third-party SDK → application interface
- browser API → internal abstraction
- legacy module → modern module

---

## 27. Facade Pattern

Facade provides a simpler interface over multiple subsystems.

```js
function createCheckoutFacade({ inventory, payment, email }) {
  return {
    async checkout(order) {
      await inventory.reserve(order);
      await payment.charge(order);
      await email.sendConfirmation(order);
    }
  };
}
```

---

## 28. Facade Benefit

The caller sees:

```js
checkout.checkout(order);
```

instead of coordinating several internal services directly.

---

## 29. Decorator Pattern

Decorator adds behavior without changing the original object/function.

```js
function withLogging(fn) {
  return (...args) => {
    console.log("Calling function");
    const result = fn(...args);
    console.log("Finished");
    return result;
  };
}
```

---

## 30. Decorator Composition

```js
const enhanced = withLogging(withTiming(doWork));
```

Each wrapper can remain focused.

---

## 31. Decorator Caveat: `this`

Wrapping methods can accidentally change the receiver.

```js
const wrapped = (...args) => original(...args);
```

If `original` relies on `this`, preserve or intentionally bind the receiver.

---

## 32. Proxy Pattern

A Proxy intercepts operations on an object.

```js
const user = new Proxy({}, {
  get(target, property) {
    console.log("Reading", property);
    return target[property];
  }
});
```

Use carefully because interception can make control flow harder to reason about.

---

## 33. Composite Pattern

Composite lets individual objects and groups be treated through a common interface.

```text
File
Folder
 ├── File
 ├── File
 └── Folder
      └── File
```

A filesystem-like tree is a natural example.

---

## 34. Bridge Pattern

Bridge separates an abstraction from its implementation so both can vary independently.

```text
Remote abstraction
       ↓
Device interface
   ↙       ↘
TV        Speaker
```

---

## 35. Flyweight Pattern

Flyweight shares reusable intrinsic state to reduce duplicated memory.

Example: thousands of text characters can share font metadata while each character stores its position separately.

---

## 36. Flyweight Trade-off

Sharing can save memory but increases indirection and complexity. Measure before optimizing.

---

# PART D — BEHAVIORAL PATTERNS

## 37. Strategy Pattern

Strategy replaces conditional behavior with interchangeable algorithms.

```js
const pricingStrategies = {
  regular: (price) => price,
  student: (price) => price * 0.9,
  premium: (price) => price * 0.8
};

function calculatePrice(price, type) {
  return pricingStrategies[type](price);
}
```

---

## 38. Strategy vs Large `if`

Before:

```js
if (type === "student") { /* ... */ }
else if (type === "premium") { /* ... */ }
```

After:

```js
const strategy = pricingStrategies[type];
```

Strategy is valuable when behavior varies independently and grows over time.

---

## 39. Command Pattern

Command represents an action as an object/value.

```js
const command = {
  execute() {
    editor.deleteSelection();
  }
};
```

This enables queues, logs, undo systems, and deferred execution.

---

## 40. Command Queue

```text
User action
   ↓
Command
   ↓
Queue
   ↓
Executor
```

---

## 41. Undo with Commands

Commands can carry inverse operations.

```js
const command = {
  execute() { /* change */ },
  undo() { /* reverse change */ }
};
```

Not every operation has a simple inverse.

---

## 42. Observer Pattern

Observers subscribe to state/events and react when a subject publishes changes.

```js
function createEmitter() {
  const listeners = new Set();

  return {
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    emit(value) {
      listeners.forEach((fn) => fn(value));
    }
  };
}
```

---

## 43. Observer Memory Leak

Always provide an unsubscribe mechanism when subscriptions have a lifecycle.

```js
const unsubscribe = store.subscribe(render);
unsubscribe();
```

---

## 44. Pub/Sub Pattern

Publisher and subscribers communicate through a broker/channel rather than directly referencing each other.

```text
Publisher
   ↓
 Event Bus
 ↙   ↓   ↘
A    B    C
```

---

## 45. Observer vs Pub/Sub

Observer often models direct subject→observer relationships. Pub/Sub introduces an intermediary channel/broker and can decouple publishers from subscribers further.

---

## 46. Mediator Pattern

A mediator coordinates communication among components.

```text
Component A ─┐
Component B ─┼─► Mediator
Component C ─┘
```

Useful when direct component-to-component communication becomes tangled.

---

## 47. Chain of Responsibility

A request passes through handlers until one handles it or the chain ends.

```js
const handlers = [auth, validation, rateLimit, controller];
```

This idea appears naturally in Express middleware.

---

## 48. Middleware as Chain

```text
Request
  ↓
Auth
  ↓
Validation
  ↓
Rate limit
  ↓
Controller
  ↓
Response
```

---

## 49. State Pattern

State-specific behavior is represented explicitly rather than scattered across conditionals.

```js
const states = {
  idle: { start: () => "running" },
  running: { stop: () => "idle" }
};
```

---

## 50. State Machine

A state machine makes states and transitions explicit.

```text
IDLE ──start──► RUNNING
RUNNING ──stop──► IDLE
RUNNING ──pause──► PAUSED
PAUSED ──resume──► RUNNING
```

---

## 51. Template Method

A fixed high-level workflow calls customizable steps.

```js
class Importer {
  run(input) {
    const raw = this.read(input);
    const data = this.parse(raw);
    return this.save(data);
  }
}
```

JavaScript can express this through classes or composition.

---

## 52. Iterator Pattern

Iterator provides sequential access without exposing the collection's internal representation.

JavaScript's iterable/iterator protocols implement this idea natively.

```js
const iterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
  }
};
```

---

## 53. Visitor Pattern

Visitor separates operations from object structures.

It can be useful for stable structures with many operations, but can be awkward when the object structure changes frequently.

---

## 54. Memento Pattern

Memento captures state so it can later be restored.

```js
const snapshot = structuredClone(editorState);
```

Memory cost and clone semantics must be considered.

---

# PART E — FUNCTIONAL AND COMPOSITIONAL PATTERNS

## 55. Higher-Order Function

A function that accepts or returns another function.

```js
const withPrefix = (prefix) => (message) =>
  `${prefix}: ${message}`;
```

---

## 56. Function Composition

Small functions can be combined into a pipeline.

```js
const trim = (s) => s.trim();
const lower = (s) => s.toLowerCase();
const normalize = (s) => lower(trim(s));
```

---

## 57. Partial Application

Pre-fill some arguments and return a function waiting for the rest.

```js
const multiply = (a, b) => a * b;
const double = (b) => multiply(2, b);
```

---

## 58. Currying

Transform a multi-argument function into a sequence of one-argument functions.

```js
const add = (a) => (b) => a + b;

add(2)(3); // 5
```

---

## 59. Memoization

Cache function results when repeated inputs are expensive and the function is safe to cache.

```js
function memoize(fn) {
  const cache = new Map();

  return (input) => {
    if (cache.has(input)) return cache.get(input);
    const result = fn(input);
    cache.set(input, result);
    return result;
  };
}
```

Memoization requires a suitable cache key and bounded/appropriate cache lifecycle.

---

## 60. Pure Function as a Design Pattern

Pure functions isolate deterministic business rules from side effects.

```text
Input
  ↓
Pure domain logic
  ↓
Output
  ↓
Effect boundary
```

---

# PART F — JAVASCRIPT-SPECIFIC PATTERNS

## 61. Module Pattern

ES modules naturally provide encapsulation.

```js
const secret = "hidden";

export function getSecret() {
  return secret;
}
```

---

## 62. Revealing Module Concept

Older JavaScript commonly used closures to expose selected functions while keeping state private.

```js
const counter = (() => {
  let value = 0;

  return {
    increment: () => ++value,
    value: () => value
  };
})();
```

ES modules are generally the modern default.

---

## 63. Namespace Pattern

A namespace groups related functionality under one object/module.

```js
const MathTools = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b
};
```

Prefer modules for modern code rather than creating large global namespaces.

---

## 64. Factory + Closure

Factories and closures work well together for encapsulated state.

```js
function createBankAccount(balance = 0) {
  return {
    deposit(amount) {
      balance += amount;
    },
    getBalance() {
      return balance;
    }
  };
}
```

---

## 65. Event Emitter Pattern

An emitter stores listeners and invokes them for named events.

```js
class EventEmitter {
  #events = new Map();

  on(name, listener) {
    const listeners = this.#events.get(name) ?? new Set();
    listeners.add(listener);
    this.#events.set(name, listeners);
    return () => listeners.delete(listener);
  }

  emit(name, value) {
    this.#events.get(name)?.forEach((listener) => listener(value));
  }
}
```

---

## 66. Repository Pattern

Repository isolates persistence operations from domain/application logic.

```js
function createUserService(userRepository) {
  return {
    async register(input) {
      const existing = await userRepository.findByEmail(input.email);
      if (existing) throw new Error("User exists");
      return userRepository.create(input);
    }
  };
}
```

---

## 67. Service Layer

A service layer coordinates application use cases and domain operations.

```text
Route
 ↓
Controller
 ↓
Service / Use Case
 ↓
Repository
 ↓
Database
```

---

## 68. Controller Pattern

Controllers translate transport-level input into application calls and transport-level responses.

Avoid putting every business rule inside the controller.

---

## 69. DTO Pattern

A Data Transfer Object defines data crossing a boundary.

```js
const response = {
  id: user.id,
  name: user.name
};
```

Do not automatically expose the persistence model directly to clients.

---

## 70. Mapper Pattern

Mapper converts one representation to another.

```js
function toUserResponse(user) {
  return {
    id: user.id,
    name: user.name
  };
}
```

---

## 71. Unit of Work Concept

Unit of Work groups related persistence operations into one logical operation, often using a transaction where supported.

```text
Use case
  ↓
Begin transaction
  ↓
Multiple changes
  ↓
Commit / Rollback
```

---

## 72. Specification Pattern

Specification represents a business rule as a composable object/function.

```js
const isAdult = (user) => user.age >= 18;
const isActive = (user) => user.active;

const canEnter = (user) => isAdult(user) && isActive(user);
```

---

## 73. Null Object Pattern

Provide a safe object implementing the expected interface instead of repeatedly checking for absence.

```js
const nullLogger = {
  info() {},
  error() {}
};
```

Use only when silent behavior is actually appropriate.

---

## 74. Result Pattern

Represent success and failure explicitly rather than relying only on thrown exceptions.

```js
const ok = (value) => ({ ok: true, value });
const fail = (error) => ({ ok: false, error });
```

---

# PART G — FRONTEND PATTERNS

## 75. Component Composition

Prefer composing components when behavior and layout vary.

```jsx
<Card>
  <CardHeader />
  <CardBody />
</Card>
```

---

## 76. Container/Presentational Concept

A container can coordinate data and state while presentational components focus on rendering.

Modern React often favors hooks and composition instead of rigid container classes.

---

## 77. Compound Components

Related components share implicit state/context.

```jsx
<Tabs>
  <Tabs.List />
  <Tabs.Panel />
</Tabs>
```

Useful for flexible APIs.

---

## 78. Render Props Concept

A component receives a function describing how to render a value.

```jsx
<DataLoader render={(data) => <List data={data} />} />
```

Hooks often provide a simpler alternative in modern React.

---

## 79. Custom Hook Pattern

Encapsulate reusable stateful behavior.

```js
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  return [value, () => setValue((v) => !v)];
}
```

---

## 80. Provider Pattern

A provider exposes shared context to descendants.

```text
Provider
 ├── Header
 ├── Main
 │    ├── Editor
 │    └── Sidebar
 └── Footer
```

Avoid using context as a substitute for every form of state management.

---

## 81. State Reducer Pattern

A reducer centralizes state transitions.

```js
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
```

---

## 82. State Machine in UI

Explicit states can prevent impossible UI combinations.

```text
idle
 ↓
loading
 ↙     ↘
success  error
```

---

## 83. Optimistic UI Pattern

Update the UI before the server confirms success, then reconcile or roll back on failure.

```text
User action
 ↓
Optimistic state
 ↓
Server request
 ↙       ↘
success   failure
confirm   rollback/reconcile
```

Requires careful handling of concurrent changes.

---

## 84. Selector Pattern

Selectors derive focused data from application state.

```js
const selectPinnedNotes = (state) =>
  state.notes.filter((note) => note.isPinned);
```

---

# PART H — BACKEND PATTERNS

## 85. Middleware Pattern

Middleware wraps or participates in request processing.

```js
app.use(authMiddleware);
app.use(validationMiddleware);
app.use(controller);
```

---

## 86. Dependency Injection Container

A container can construct and connect application dependencies.

```text
Container
 ├── Repository
 ├── Service
 ├── Controller
 └── Router
```

Small applications often need only manual dependency injection.

---

## 87. Ports and Adapters

Application logic depends on ports; infrastructure provides adapters.

```text
          Domain/Application
          /             \
      Port               Port
       ↓                   ↓
 Mongo Adapter       Email Adapter
```

This is closely related to Hexagonal Architecture.

---

## 88. Hexagonal Architecture

Keep business logic at the center and infrastructure at the edges.

```text
        HTTP Adapter
             ↓
   ┌───────────────────┐
   │ Application Core  │
   │ Domain + UseCases │
   └───────────────────┘
      ↑             ↑
 DB Adapter      Email Adapter
```

---

## 89. Clean Architecture Concept

Dependencies should generally point toward stable business rules rather than infrastructure details.

```text
Frameworks / DB
      ↓
Adapters
      ↓
Application
      ↓
Domain
```

Exact layer names vary by implementation.

---

## 90. CQRS Concept

Command Query Responsibility Segregation separates models or pathways for changing state from reading state.

```text
Command → Write Model
Query   → Read Model
```

Do not use CQRS merely because it sounds advanced.

---

## 91. Event-Driven Architecture

Components communicate through events describing something that happened.

```text
OrderCreated
   ↓
Event Bus
 ↙   ↓    ↘
Email Audit Analytics
```

---

## 92. Outbox Pattern

Persist an application change and an outgoing event reliably in the same database transaction, then publish the event asynchronously.

```text
Transaction
 ├── Business change
 └── Outbox event
        ↓
Worker
        ↓
Message broker
```

This helps reduce dual-write inconsistency.

---

## 93. Idempotency Key Pattern

A client-provided idempotency key lets a server recognize repeated requests and avoid duplicate effects where the operation supports this model.

```text
POST + key ABC
   ↓
Process once
   ↓
Store result

POST + key ABC
   ↓
Return prior result
```

---

# PART I — TESTING AND PATTERNS

## 94. Testable Architecture

Patterns should improve testability rather than create layers that are difficult to test.

```text
Pure domain logic → easy unit tests
Effect adapters   → focused integration tests
Critical flows    → E2E tests
```

---

## 95. Test Double Pattern

Dependencies can be replaced with controlled implementations during tests.

```js
const fakeRepository = {
  findById: async () => ({ id: "1", name: "Ravi" })
};
```

---

## 96. Seam

A seam is a place where behavior can be changed without modifying the code being tested.

Dependency injection creates useful seams.

---

## 97. Testing a Strategy

Each strategy should be testable independently.

```js
expect(pricingStrategies.student(100)).toBe(90);
```

---

## 98. Testing a Factory

Test that the factory selects the intended implementation and rejects unsupported variants.

---

## 99. Testing an Adapter

Test both:

1. input translation
2. output/error translation

Do not merely test that the wrapper function was called.

---

# PART J — PATTERN SELECTION

## 100. Start with the Problem

Ask:

1. What is changing?
2. What is stable?
3. Who owns the behavior?
4. Where is coupling occurring?
5. What must be tested independently?
6. What complexity is actually present?

---

## 101. Decision: Factory

Use a factory when object creation varies or is complex.

```text
Many creation variants?
       ↓ yes
    Factory
```

---

## 102. Decision: Strategy

Use Strategy when one behavior has multiple interchangeable algorithms.

```text
Same task + different algorithms → Strategy
```

---

## 103. Decision: Adapter

Use Adapter when an existing interface does not match what your application expects.

---

## 104. Decision: Facade

Use Facade when callers need a simpler interface over a complicated subsystem.

---

## 105. Decision: Decorator

Use Decorator when behavior should be added around an object/function without modifying its core implementation.

---

## 106. Decision: Observer

Use Observer/Event subscription when multiple consumers need to react to changes.

---

## 107. Decision: State Machine

Use an explicit state model when states, transitions, and invalid combinations are becoming difficult to manage.

---

## 108. Decision: Repository

Use a repository when isolating persistence details improves the application boundary.

Do not create repositories for every trivial function automatically.

---

## 109. Decision Matrix

| Problem | Candidate |
|---|---|
| Variable creation | Factory |
| Complex construction | Builder |
| Incompatible interface | Adapter |
| Complex subsystem | Facade |
| Add behavior around function | Decorator |
| Interchangeable algorithm | Strategy |
| Event subscribers | Observer/Pub-Sub |
| Request pipeline | Chain/Middleware |
| Explicit state transitions | State Machine |
| Persistence boundary | Repository |
| Coordinate components | Mediator |
| Action as data | Command |

---

# PART K — ANTI-PATTERNS

## 110. Pattern Fever

Applying a pattern because it has a famous name instead of because a design problem exists.

```text
Simple problem
   ↓
10 classes
   ↓
Pattern fever
```

---

## 111. Golden Hammer

Using the same tool for every problem.

> If every problem looks like Strategy, you may be looking for Strategy too aggressively.

---

## 112. God Object

One object/module knows and controls too much.

Refactor by identifying cohesive responsibilities and explicit boundaries.

---

## 113. God Service

A service containing authentication, billing, email, reports, files, and database logic becomes difficult to change and test.

---

## 114. Singleton Abuse

A singleton that stores mutable application state can become hidden global state.

Prefer explicit dependencies when possible.

---

## 115. Over-Abstraction

Creating interfaces, factories, and adapters before variation exists can make simple code harder to understand.

---

## 116. Deep Inheritance

Deep hierarchies increase coupling and make behavior difficult to trace.

Prefer composition when it better represents the domain.

---

## 117. Leaky Abstraction

An abstraction is leaky when callers still need to understand the hidden implementation details to use it correctly.

---

## 118. Service Locator

A global registry from which services are pulled can hide dependencies.

```js
const service = container.get("UserService");
```

Explicit constructor/function parameters are often easier to reason about.

---

## 119. Anemic Domain Model

A model containing only data while all meaningful rules live elsewhere may be appropriate for some architectures, but can become problematic when domain behavior is fragmented.

---

# PART L — REFACTORING TO PATTERNS

## 120. Refactor Conditional Creation

Before:

```js
function createReport(type) {
  if (type === "pdf") return new PdfReport();
  if (type === "csv") return new CsvReport();
  throw new Error("Unsupported");
}
```

A factory is a natural extraction when this logic is repeated or growing.

---

## 121. Refactor Conditional Behavior

Before:

```js
if (paymentType === "card") {}
else if (paymentType === "upi") {}
else if (paymentType === "cash") {}
```

Consider Strategy when each branch represents a stable, independently testable behavior.

---

## 122. Refactor Repeated Wrappers

If logging, metrics, authorization, or caching surrounds many functions, a decorator/middleware abstraction may remove duplication.

---

## 123. Refactor Complex Controller

Before:

```text
Controller
 ├── validation
 ├── business rules
 ├── database queries
 ├── email
 └── response formatting
```

Move responsibilities behind focused boundaries.

---

## 124. Safe Refactoring Process

```text
Existing behavior
      ↓
Add characterization tests
      ↓
Extract small seam
      ↓
Move behavior
      ↓
Run tests
      ↓
Repeat
```

---

# PART M — UNDER THE HOOD

## 125. Why Patterns Work

Most patterns manage one or more forms of change:

- algorithm variation
- object creation
- dependency variation
- communication
- lifecycle
- state transitions
- representation conversion

---

## 126. Indirection

Many patterns introduce one extra layer.

```text
Direct:
A → B

Pattern:
A → abstraction → B
```

The extra indirection is useful only when it buys flexibility, isolation, or clarity.

---

## 127. Abstraction Has a Cost

Every abstraction adds concepts to learn.

```text
Benefit = flexibility + isolation + reuse
Cost = indirection + code + cognitive load
```

Choose based on the trade-off.

---

## 128. Runtime Dispatch

Strategy and polymorphism often move the choice from a large conditional to runtime object/function selection.

---

## 129. Data vs Behavior

Some patterns move behavior into values.

```js
const commands = {
  save: () => saveDocument(),
  delete: () => deleteDocument()
};
```

This can make behavior composable and testable.

---

## 130. Composition Graph

A mature application can be viewed as a graph of dependencies.

```text
HTTP
 ↓
Controller → Service → Repository → DB
              ↓
           Notifier
```

Patterns often reshape this graph to make change safer.

---

# PART N — SECURITY CONSIDERATIONS

## 131. Security Is Not a Pattern Name

A pattern does not automatically make code secure.

Validate inputs, authorize actions, protect secrets, and enforce security at the correct boundary.

---

## 132. Decorator Security Trap

A security decorator is not useful if sensitive code can bypass it through another entry point.

Security controls should be placed at enforceable boundaries.

---

## 133. Repository Security

Repositories should not automatically trust caller input.

Authorization belongs to an appropriate application/domain boundary and must not rely solely on hidden UI restrictions.

---

## 134. Event Security

Treat event payloads as untrusted across trust boundaries.

Do not put secrets into logs/events merely because they are convenient carriers.

---

## 135. Singleton Secret Trap

A singleton configuration object containing secrets does not make secrets safe. Secret storage and access policies are separate concerns.

---

# PART O — PERFORMANCE

## 136. Pattern Performance Is Contextual

A pattern can improve performance or reduce it depending on workload.

Do not claim “patterns are faster” or “patterns are slower” universally.

---

## 137. Observer Cost

Large numbers of subscriptions can increase notification work.

Measure event frequency and listener count.

---

## 138. Decorator Cost

Many wrappers add call indirection and can complicate stack traces.

Use them when the behavior benefit outweighs the cost.

---

## 139. Flyweight and Memory

Flyweight can reduce duplicated shared state but may add lookup and lifecycle complexity.

---

## 140. Memoization Cost

Caching trades computation for memory and cache-management complexity.

---

# PART P — PRACTICAL JAVASCRIPT EXAMPLES

## 141. Logger Factory

```js
function createLogger(scope) {
  return {
    info(message) {
      console.log(`[${scope}] ${message}`);
    }
  };
}
```

Pattern: Factory + closure.

---

## 142. Validation Chain

```js
const validators = [
  (data) => data.name ? null : "Name required",
  (data) => data.email ? null : "Email required"
];

function validate(data) {
  for (const validator of validators) {
    const error = validator(data);
    if (error) return error;
  }
  return null;
}
```

Pattern: Chain of Responsibility.

---

## 143. Cache Decorator

```js
function withCache(fn) {
  const cache = new Map();

  return (key) => {
    if (cache.has(key)) return cache.get(key);
    const value = fn(key);
    cache.set(key, value);
    return value;
  };
}
```

---

## 144. Retry Wrapper

A retry decorator can encapsulate bounded retry policy, but only transient failures should normally be retried and mutations may require idempotency.

---

## 145. Feature Strategy

```js
const features = {
  compact: (items) => items.slice(0, 5),
  full: (items) => items
};
```

---

## 146. Command Object

```js
const saveCommand = {
  execute() {
    return saveDocument();
  }
};
```

---

## 147. Event Bus

```js
function createEventBus() {
  const listeners = new Map();

  return {
    on(type, fn) {
      const set = listeners.get(type) ?? new Set();
      set.add(fn);
      listeners.set(type, set);
      return () => set.delete(fn);
    },
    emit(type, payload) {
      listeners.get(type)?.forEach((fn) => fn(payload));
    }
  };
}
```

---

## 148. Repository Interface by Convention

JavaScript does not require an interface declaration for every dependency.

```js
const repository = {
  findById,
  create,
  update,
  remove
};
```

The application can define the expected contract through documentation, tests, TypeScript, runtime validation, or a combination.

---

# PART Q — NOTES APP APPLICATION

## 149. Notes App Architecture

For a full-stack Notes application:

```text
React UI
   ↓
API Client
   ↓
Controller
   ↓
Use Case / Service
   ↓
Repository
   ↓
MongoDB
```

---

## 150. Notes Factory

Create note objects through a factory when defaults and normalization become non-trivial.

```js
function createNote(input) {
  return {
    title: input.title.trim(),
    content: input.content ?? "",
    isPinned: false,
    isArchived: false
  };
}
```

---

## 151. Notes Strategy

Search can support interchangeable strategies:

```text
Search
 ├── Exact title
 ├── Prefix
 ├── Full text
 └── Tag-based
```

---

## 152. Notes Repository

```js
function createNoteRepository(model) {
  return {
    findByOwner(ownerId) {
      return model.find({ ownerId });
    },
    create(data) {
      return model.create(data);
    }
  };
}
```

---

## 153. Notes Facade

A notes facade can coordinate:

- note validation
- folder checks
- permission checks
- persistence
- event publishing
- response mapping

---

## 154. Notes State Machine

```text
ACTIVE
 ├── archive → ARCHIVED
 └── trash → TRASHED

ARCHIVED
 └── restore → ACTIVE

TRASHED
 └── restore → ACTIVE
```

Real domain rules may allow or forbid some transitions.

---

## 155. Notes Observer

Useful events could include:

```text
note.created
note.updated
note.archived
note.trashed
note.shared
```

Use events only where asynchronous or decoupled reactions are genuinely useful.

---

## 156. Notes Decorators

Possible cross-cutting wrappers:

```text
Controller
  ↓
Auth
  ↓
Authorization
  ↓
Validation
  ↓
Metrics
  ↓
Service
```

---

# PART R — PRACTICE LADDER

## 157. Beginner Challenge 1

Build a `createUser()` factory with `admin`, `editor`, and `viewer` variants.

---

## 158. Beginner Challenge 2

Create three pricing strategies and select one by name.

---

## 159. Beginner Challenge 3

Write an adapter around a function whose argument order does not match your application.

---

## 160. Beginner Challenge 4

Create a logger decorator that records function calls.

---

## 161. Beginner Challenge 5

Build an event emitter with `on`, `emit`, and unsubscribe.

---

## 162. Beginner Challenge 6

Create a command queue with `execute()` methods.

---

## 163. Beginner Challenge 7

Implement a small state machine for a traffic light.

---

## 164. Beginner Challenge 8

Build a facade for a fake checkout system.

---

## 165. Beginner Challenge 9

Create a repository around an in-memory array.

---

## 166. Beginner Challenge 10

Write a memoization wrapper and test cache hits.

---

## 167. Intermediate Challenge 1

Build an authentication middleware chain.

---

## 168. Intermediate Challenge 2

Create a notification strategy for email, SMS, and push.

---

## 169. Intermediate Challenge 3

Build an undoable text editor using commands.

---

## 170. Intermediate Challenge 4

Create a pub/sub event bus and prevent listener leaks.

---

## 171. Intermediate Challenge 5

Build a repository/service/controller architecture for users.

---

## 172. Intermediate Challenge 6

Create a facade that coordinates inventory, payment, and email services.

---

## 173. Intermediate Challenge 7

Refactor a large `if/else` pricing function into Strategy.

---

## 174. Intermediate Challenge 8

Create an adapter around a legacy payment API.

---

## 175. Intermediate Challenge 9

Build a configurable HTTP request builder.

---

## 176. Intermediate Challenge 10

Create a state machine for a file upload UI.

---

## 177. Advanced Challenge 1

Build a plugin architecture using a registry and explicit plugin contract.

---

## 178. Advanced Challenge 2

Build an event-driven order system with an outbox-like in-memory simulation.

---

## 179. Advanced Challenge 3

Implement a command system with undo/redo.

---

## 180. Advanced Challenge 4

Design a hexagonal architecture for a small REST API.

---

## 181. Advanced Challenge 5

Build an idempotent command processor.

---

## 182. Advanced Challenge 6

Create a cache decorator with TTL and bounded size.

---

## 183. Advanced Challenge 7

Design a multi-provider notification system with Strategy + Factory + Adapter.

---

## 184. Advanced Challenge 8

Create a typed service/repository architecture using TypeScript.

---

## 185. Advanced Challenge 9

Refactor a legacy module into pure core logic plus effect adapters.

---

## 186. Advanced Challenge 10

Analyze an existing application and identify unnecessary patterns before changing code.

---

# PART S — PATTERN COMBINATION

## 187. Factory + Strategy

Factory chooses the appropriate strategy implementation.

```text
Request
 ↓
Factory
 ↓
Strategy
 ↓
Algorithm
```

---

## 188. Strategy + Decorator

Choose an algorithm, then add logging/metrics/caching around it.

---

## 189. Adapter + Facade

Adapter normalizes external APIs; facade exposes a simpler application API.

---

## 190. Repository + Service

Repository handles persistence; service coordinates application rules.

---

## 191. Command + Observer

Commands perform actions; observers can react to completed events.

---

## 192. State + Strategy

State selects which strategies/actions are valid in the current lifecycle state.

---

## 193. Middleware + Decorator

Both can wrap behavior, but middleware usually participates in a defined pipeline/context while a decorator often wraps an individual abstraction.

---

## 194. Factory + Adapter

A factory can create the correct adapter for different providers.

---

# PART T — INTERVIEW QUESTIONS

## 195. What Is a Design Pattern?

Explain it as a reusable design solution to a recurring problem, including context and trade-offs.

---

## 196. Factory vs Builder?

Factory chooses/creates an object; Builder emphasizes step-by-step construction of a complex configuration.

---

## 197. Adapter vs Facade?

Adapter changes an interface; Facade simplifies an interface over multiple operations.

---

## 198. Strategy vs State?

Strategy usually selects interchangeable algorithms; State changes behavior according to the object's current lifecycle state.

---

## 199. Observer vs Pub/Sub?

Observer often has direct subject/subscriber relationships; Pub/Sub typically inserts a broker/channel.

---

## 200. Why Can Singletons Be Dangerous?

They can introduce hidden global mutable state, coupling, and difficult test isolation.

---

## 201. Why Prefer Composition?

Composition often reduces rigid hierarchy coupling and allows behavior to be assembled more flexibly.

---

## 202. What Is Dependency Injection?

Providing dependencies from outside rather than constructing them internally.

---

## 203. What Is a Repository?

A persistence boundary that provides application-facing operations without exposing storage details unnecessarily.

---

## 204. What Is a Facade?

A simplified interface over a more complex subsystem.

---

## 205. What Is a Decorator?

A wrapper that adds behavior while preserving the underlying abstraction's role.

---

## 206. What Is Chain of Responsibility?

A request passes through a sequence of handlers.

---

## 207. What Is a State Machine?

An explicit set of states and permitted transitions.

---

## 208. When Should You Not Use a Pattern?

When the abstraction adds more complexity than the problem requires.

---

## 209. Is MVC a Design Pattern?

MVC is commonly described as an architectural pattern/family of patterns rather than a single GoF object-creation/behavior pattern.

---

## 210. Are Patterns Language-Specific?

The underlying design ideas are often transferable, but implementation details depend strongly on language features and runtime models.

---

# PART U — TEACH-BACK

## 211. Teach Factory in 60 Seconds

Explain:

```text
Problem → multiple creation choices → Factory
```

Then give one JavaScript example.

---

## 212. Teach Strategy

Explain how replacing a growing conditional with interchangeable functions can reduce branching and improve independent testing.

---

## 213. Teach Adapter

Use a real-world analogy such as a plug adapter, then map it to a software interface conversion.

---

## 214. Teach Facade

Compare a restaurant waiter taking one order with directly coordinating kitchen subsystems.

---

## 215. Teach Observer

Explain subscriptions and unsubscribe lifecycle.

---

## 216. Teach Dependency Injection

Explain:

```text
Don't build dependency inside.
Receive dependency from outside.
```

---

## 217. Teach Composition

Explain why “has-a” relationships can be more flexible than deeply nested “is-a” hierarchies.

---

## 218. Teach Anti-Patterns

Explain why an apparently clean pattern can become harmful when used without a real design problem.

---

# PART V — DEBUGGING PATTERN-BASED CODE

## 219. Symptom: Too Many Files

Ask whether the pattern caused fragmentation without providing meaningful boundaries.

---

## 220. Symptom: Circular Dependencies

Inspect dependency direction and identify whether abstractions or module boundaries are wrong.

---

## 221. Symptom: Hidden Global State

Search for singleton registries, mutable module state, and service locators.

---

## 222. Symptom: Impossible State

Consider replacing scattered booleans with an explicit state machine.

---

## 223. Symptom: Giant Switch

Determine whether cases represent independent strategies, states, commands, or genuinely simple logic.

---

## 224. Symptom: Tests Need Huge Mocks

The production design may have excessive coupling or an abstraction that is too broad.

---

## 225. Symptom: Wrapper Stack Is Huge

Reduce unnecessary decorators/middleware and preserve meaningful boundaries.

---

# PART W — DESIGN REVIEW CHECKLIST

## 226. Problem Clarity

- What problem exists?
- What changes frequently?
- What must remain stable?

---

## 227. Responsibility

- Does each module have a coherent responsibility?
- Is ownership clear?

---

## 228. Dependencies

- Are dependencies explicit?
- Can infrastructure be replaced in tests?

---

## 229. Complexity

- Does the pattern reduce complexity?
- Or merely move complexity into more files?

---

## 230. Testability

- Can core behavior be tested independently?
- Are tests coupled to implementation details?

---

## 231. Runtime Behavior

- Are subscriptions cleaned up?
- Are caches bounded?
- Are async failures handled?
- Are resources released?

---

## 232. Security

- Where is authorization enforced?
- Are trust boundaries explicit?
- Are secrets excluded from events/logs?

---

## 233. Performance

- Is added indirection acceptable?
- Are event frequencies and cache behavior understood?
- Was the optimization measured?

---

# PART X — PROJECTS

## 234. Project 1 — Notification Engine

Build:

- Email strategy
- SMS strategy
- Push strategy
- Provider adapters
- Notification factory
- Logging decorator
- Tests

---

## 235. Project 2 — Shopping Checkout

Use:

- Facade
- Strategy
- Adapter
- Repository
- Command

Implement validation and failure handling.

---

## 236. Project 3 — Task Workflow Engine

Use:

- State machine
- Command
- Observer
- Repository

Support task transitions and audit events.

---

## 237. Project 4 — Plugin System

Implement:

- plugin contract
- registry
- lifecycle
- event hooks
- dependency injection
- isolation rules

---

## 238. Project 5 — API Architecture

Build a REST API using:

```text
Router
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Database adapter
```

Add tests at appropriate levels.

---

# PART Y — FINAL MASTERY PROJECT

## 239. Testing + Patterns Notes Application

Build a production-style Notes application using patterns only where justified.

### Required Features

- authentication
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

## 240. Required Design

```text
React
  ↓
API Client
  ↓
HTTP Controller
  ↓
Use Cases
  ↓
Domain Rules
  ↓
Repository Port
  ↓
Mongo Adapter
```

---

## 241. Required Patterns

Use at least:

- Factory
- Strategy
- Adapter
- Facade
- Decorator/middleware
- Observer/event bus
- Repository
- State machine
- Dependency Injection

For every pattern, document **why it exists**.

---

## 242. Required Anti-Pattern Review

Create a document containing:

```text
Pattern used
Problem solved
Alternative considered
Trade-off
Why this is not over-engineering
```

---

## 243. Required Tests

Include:

- unit tests for pure domain rules
- integration tests for repositories/API boundaries
- component tests for important UI behavior
- E2E tests for critical user journeys
- authorization tests
- validation tests
- error-path tests

---

## 244. Required Architecture Diagram

```text
                ┌──────────────┐
                │   React UI   │
                └──────┬───────┘
                       ↓
                ┌──────────────┐
                │  API Client  │
                └──────┬───────┘
                       ↓
                ┌──────────────┐
                │ Controllers  │
                └──────┬───────┘
                       ↓
             ┌──────────────────┐
             │ Application Core │
             └───────┬──────────┘
                     ↓
             ┌──────────────────┐
             │ Repository Port  │
             └───────┬──────────┘
                     ↓
             ┌──────────────────┐
             │  Mongo Adapter   │
             └──────────────────┘
```

---

# PART Z — REVISION SYSTEM

## 245. One-Line Memory Map

```text
Create → Factory / Builder
Structure → Adapter / Facade / Decorator
Behavior → Strategy / Command / Observer / State
Persistence → Repository
Communication → Observer / PubSub / Mediator
Pipeline → Chain / Middleware
Architecture → Ports & Adapters / Clean Architecture
```

---

## 246. Pattern Recognition Rule

When code becomes difficult, identify the **source of variation** before selecting a pattern.

---

## 247. Five Questions

```text
What changes?
Who owns it?
Who depends on it?
How will I test it?
Is the abstraction worth its cost?
```

---

## 248. Pattern Learning Rule

For every pattern learn:

1. intent
2. problem
3. structure
4. participants
5. JavaScript implementation
6. trade-offs
7. alternatives
8. testing strategy
9. real-world use
10. failure modes

---

## 249. Mastery Checklist — Foundations

- [ ] coupling
- [ ] cohesion
- [ ] encapsulation
- [ ] abstraction
- [ ] composition
- [ ] dependency injection
- [ ] dependency inversion

---

## 250. Mastery Checklist — Creational

- [ ] Factory
- [ ] Factory Method
- [ ] Abstract Factory
- [ ] Builder
- [ ] Singleton
- [ ] Prototype

---

## 251. Mastery Checklist — Structural

- [ ] Adapter
- [ ] Facade
- [ ] Decorator
- [ ] Proxy
- [ ] Composite
- [ ] Bridge
- [ ] Flyweight

---

## 252. Mastery Checklist — Behavioral

- [ ] Strategy
- [ ] Command
- [ ] Observer
- [ ] Pub/Sub
- [ ] Mediator
- [ ] Chain of Responsibility
- [ ] State
- [ ] Template Method
- [ ] Iterator
- [ ] Visitor
- [ ] Memento

---

## 253. Mastery Checklist — Application

- [ ] Repository
- [ ] Service Layer
- [ ] DTO
- [ ] Mapper
- [ ] Unit of Work
- [ ] Specification
- [ ] Null Object
- [ ] Result
- [ ] Middleware
- [ ] Ports and Adapters
- [ ] Event-driven design
- [ ] Outbox
- [ ] Idempotency

---

## 254. Mastery Checklist — Frontend

- [ ] composition
- [ ] compound components
- [ ] custom hooks
- [ ] provider
- [ ] reducer
- [ ] selectors
- [ ] state machine
- [ ] optimistic UI

---

## 255. Mastery Checklist — Judgment

- [ ] recognize a real problem before applying a pattern
- [ ] explain alternatives
- [ ] explain trade-offs
- [ ] test the design
- [ ] avoid pattern fever
- [ ] refactor incrementally
- [ ] measure performance when relevant
- [ ] preserve security boundaries

---

# FINAL RULE

> **Do not memorize patterns as code templates. Learn to recognize forces, boundaries, variation, coupling, and trade-offs. Then choose the smallest design that solves the real problem.**

## Chapter Completion Challenge

Without looking at the chapter, design the architecture for a Notes application and answer:

1. Where does note creation belong?
2. Where should persistence live?
3. How would you support multiple search algorithms?
4. How would you integrate different notification providers?
5. How would you model note lifecycle states?
6. Which operations should become events?
7. Where would you use adapters?
8. Which parts should be pure functions?
9. Which dependencies should be injected?
10. Which patterns would you deliberately **not** use, and why?

If you can answer these with concrete JavaScript code and explain the trade-offs, you are beginning to think in **design patterns**, not merely memorize them.
