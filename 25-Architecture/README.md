# 25 — Architecture

> A JavaScript-first guide to application architecture: how to turn growing codebases into understandable systems with explicit boundaries, dependency direction, data flow, and deliberate trade-offs.

## Learning Goal

Architecture is not a folder structure. Architecture is the set of important decisions about **boundaries, responsibilities, dependencies, data flow, deployment, and change**.

```text
Architecture = boundaries + dependencies + responsibilities + decisions
```

Good architecture does not mean “more layers.” It means the system's structure helps the team change it safely.

---

# PART A — ARCHITECTURE FOUNDATIONS

## 1. What Is Software Architecture?

Architecture describes the high-level structure of a software system and the rules that govern relationships between its important parts.

---

## 2. Architecture vs Code

Code answers:

```text
How does this operation work?
```

Architecture answers:

```text
Where should this operation live?
Who may depend on it?
What can change independently?
```

---

## 3. Architecture Is About Decisions

Examples:

- monolith or distributed system
- SQL or document database
- synchronous or asynchronous communication
- server-rendered or client-rendered UI
- module boundaries
- dependency direction
- caching strategy

---

## 4. Architecture Is Not Permanent

Architecture evolves as:

```text
Requirements change
 ↓
Constraints change
 ↓
Architecture adapts
```

A small application should not be designed like a global distributed platform without a reason.

---

## 5. Functional vs Non-Functional Requirements

Functional:

```text
Create a note.
Share a note.
Search notes.
```

Non-functional:

```text
Latency
Availability
Security
Scalability
Maintainability
Accessibility
Observability
```

Architecture must address both.

---

## 6. Architecture Quality Attributes

Common quality attributes include:

- reliability
- performance
- scalability
- security
- maintainability
- testability
- deployability
- observability
- accessibility

These can conflict.

---

## 7. Trade-offs

```text
More caching
→ lower latency
→ more invalidation complexity
```

Architecture is largely the management of trade-offs.

---

## 8. Complexity

Two major forms:

```text
Essential complexity → problem itself
Accidental complexity → complexity created by our design/tools
```

Architecture should reduce accidental complexity without pretending essential complexity does not exist.

---

## 9. Coupling

Coupling describes dependency between parts.

```text
A → B → C
```

A change in C may affect A if dependencies are tightly coupled.

---

## 10. Cohesion

Cohesion measures how strongly related responsibilities are inside a boundary.

Good architecture generally seeks high cohesion and intentionally controlled coupling.

---

## 11. Dependency Direction

Dependency direction is one of the most important architectural decisions.

```text
UI → Application → Domain
                  ↑
              Adapters
```

The exact structure varies, but dependency direction should be deliberate.

---

# PART B — BOUNDARIES

## 12. What Is a Boundary?

A boundary separates responsibilities or technologies.

Examples:

```text
UI | Application | Database
API | Domain | Infrastructure
Service | External Provider
```

---

## 13. Why Boundaries Matter

A boundary can isolate change.

```text
Payment provider changes
        ↓
Payment adapter changes
        ↓
Core business logic remains stable
```

---

## 14. Boundary Types

Common boundaries include:

- module boundaries
- process boundaries
- network boundaries
- database boundaries
- team ownership boundaries
- package boundaries

---

## 15. Boundary Strength

Not every boundary needs a separate process.

```text
Function boundary < module boundary < package boundary < process boundary
```

Choose the cheapest boundary that provides the needed isolation.

---

## 16. Module Boundary

ES modules provide a useful language-level boundary.

```js
export function createNote() {}
```

Consumers depend on exported capabilities rather than private implementation details.

---

## 17. Process Boundary

A process boundary provides stronger isolation but adds operational and communication complexity.

---

## 18. Network Boundary

HTTP, WebSocket, and other protocols introduce:

- latency
- partial failure
- serialization
- authentication
- retries

Never treat a network call like a local function call.

---

## 19. Database Boundary

A database is an external stateful system from application code's perspective.

Database operations can fail, block, time out, or return stale/changed data.

---

## 20. External Provider Boundary

Examples:

```text
Stripe
S3-compatible storage
Email provider
OAuth provider
Maps API
```

Adapters can prevent provider-specific concepts from leaking through the application.

---

# PART C — ARCHITECTURAL STYLES

## 21. Layered Architecture

A common model:

```text
Presentation
    ↓
Application
    ↓
Domain
    ↓
Infrastructure
```

The exact dependency direction must be defined; simply naming layers does not enforce architecture.

---

## 22. Presentation Layer

Handles interaction with users or transport protocols.

Examples:

- React components
- Express controllers
- route handlers

---

## 23. Application Layer

Coordinates use cases.

Examples:

```text
CreateNote
DeleteNote
ShareNote
ArchiveNote
```

---

## 24. Domain Layer

Contains business concepts and rules where the project has enough domain complexity to justify the boundary.

---

## 25. Infrastructure Layer

Contains technical details:

- MongoDB
- Redis
- filesystem
- HTTP SDKs
- queues
- email providers

---

## 26. Clean Architecture

Clean Architecture emphasizes dependency direction toward policy/business rules.

```text
        Frameworks / Drivers
              ↓
        Interface Adapters
              ↓
        Application Rules
              ↓
        Enterprise Rules
```

Different implementations use different names and exact boundaries.

---

## 27. Hexagonal Architecture

Also called Ports and Adapters.

```text
          HTTP Adapter
               ↓
DB Adapter →  Core  ← Email Adapter
               ↑
         Test Adapter
```

The core communicates through ports.

---

## 28. Ports

A port is an abstraction describing a capability required or provided by the application.

```ts
interface NoteRepository {
  findById(id: string): Promise<Note | null>;
}
```

---

## 29. Adapters

An adapter implements or translates a port for a concrete technology.

```text
NoteRepository
     ↑
MongoNoteRepository
```

---

## 30. Onion Architecture

Onion Architecture organizes dependencies toward the center.

```text
Infrastructure
    ↓
Application
    ↓
Domain
```

It is related conceptually to Clean Architecture and Hexagonal Architecture.

---

## 31. MVC

MVC separates concerns around:

```text
Model
View
Controller
```

Modern applications often use MVC-inspired structures rather than one universal MVC implementation.

---

## 32. Modular Monolith

A modular monolith is one deployable application with explicit internal module boundaries.

```text
One process
├── Auth module
├── Notes module
├── Sharing module
└── Search module
```

This can be a strong default for many products.

---

## 33. Microservices

Microservices split a system into independently deployable services.

Benefits can include independent deployment and scaling.

Costs include distributed systems complexity.

---

## 34. Do Not Start With Microservices

If the product is small, a modular monolith often provides simpler development and operations.

Use service boundaries when organizational, scaling, reliability, or domain constraints justify them.

---

# PART D — DOMAIN-DRIVEN DESIGN CONCEPTS

## 35. Domain

The domain is the problem space the software exists to solve.

For a Notes application:

```text
Notes
Folders
Tags
Sharing
Permissions
Search
```

---

## 36. Domain Model

A domain model represents important concepts and rules of the problem.

Do not create domain classes merely because DDD terminology exists.

---

## 37. Entity

An entity has identity that remains meaningful across state changes.

```text
Note ID = identity
Title/content = state
```

---

## 38. Value Object

A value object is identified by its value rather than a unique identity.

Examples:

```text
EmailAddress
Money
DateRange
Coordinates
```

---

## 39. Aggregate

An aggregate is a consistency boundary around related domain objects.

Do not interpret “aggregate” as simply “a group of tables.”

---

## 40. Aggregate Root

The aggregate root is the entry point through which the aggregate's invariants are controlled.

---

## 41. Bounded Context

A bounded context defines a boundary within which a model and vocabulary have particular meaning.

---

## 42. Ubiquitous Language

Teams should use consistent domain vocabulary.

If “archived,” “deleted,” and “trashed” have different meanings, encode those distinctions clearly.

---

# PART E — MODULE DESIGN

## 43. Feature-Based Structure

Prefer organization around business capabilities when it improves discoverability.

```text
src/
├── auth/
├── notes/
├── folders/
├── tags/
└── sharing/
```

---

## 44. Layer-Based Structure

Another option:

```text
controllers/
services/
repositories/
models/
```

This can work well at smaller scales but may become difficult when every feature is spread across many global folders.

---

## 45. Feature + Layer Hybrid

```text
notes/
├── notes.controller.js
├── notes.service.js
├── notes.repository.js
├── notes.schema.js
└── notes.routes.js
```

This often provides a practical middle ground.

---

## 46. Module API

A module should expose a small public surface.

```js
// notes/index.js
export { createNote } from "./createNote.js";
```

Private implementation details stay private.

---

## 47. Dependency Graph

Think of modules as a directed graph:

```text
A → B → C
A → D
```

Good architecture makes the graph intentional.

---

## 48. Circular Dependency

```text
A → B
↑   ↓
└───┘
```

Circular dependencies can make initialization, testing, and reasoning harder.

---

## 49. Breaking Cycles

Possible techniques:

- extract shared abstraction
- invert dependency
- introduce event boundary
- move ownership
- merge modules if they are actually one concept

Do not automatically add a third module just to hide a conceptual cycle.

---

## 50. Stable Dependencies

Prefer dependencies that are stable and appropriately abstracted.

Volatile details should generally sit toward the outside of the core architecture.

---

# PART F — DATA FLOW

## 51. Request Flow

Typical backend flow:

```text
Client
 ↓
Router
 ↓
Middleware
 ↓
Controller
 ↓
Use Case
 ↓
Repository
 ↓
Database
```

---

## 52. Response Flow

```text
Database
 ↓
Repository
 ↓
Use Case
 ↓
DTO / Mapper
 ↓
Controller
 ↓
HTTP Response
```

---

## 53. DTO

A Data Transfer Object defines data crossing a boundary.

```ts
type NoteResponse = {
  id: string;
  title: string;
};
```

---

## 54. Why DTOs Matter

DTOs prevent internal representation from becoming accidental public API.

---

## 55. Mapper

A mapper translates between models.

```js
function toNoteResponse(note) {
  return {
    id: note.id,
    title: note.title
  };
}
```

---

## 56. Validation Boundary

Validate untrusted external data at the boundary.

```text
HTTP JSON
 ↓
Schema validation
 ↓
Trusted application input
```

TypeScript types alone do not validate runtime JSON.

---

## 57. Domain Validation

Transport validation checks shape and basic constraints.

Domain validation checks business invariants.

---

## 58. Transaction Boundary

A transaction should protect operations that must commit atomically according to the database's transaction semantics.

---

## 59. Distributed Transaction Warning

Once operations cross service boundaries, a normal local database transaction may not cover the entire workflow.

Use appropriate patterns such as orchestration, compensation, or transactional outbox where justified.

---

# PART G — DEPENDENCY MANAGEMENT

## 60. Dependency Injection

Provide dependencies from outside instead of constructing them everywhere.

```js
function createNoteService({ repository, logger }) {
  return { repository, logger };
}
```

---

## 61. Manual DI

Manual composition is often enough:

```js
const repository = createMongoRepository(models);
const service = createNoteService({ repository });
```

---

## 62. DI Container

A DI container automates dependency resolution.

It can be useful in large systems but can also hide dependency graphs.

---

## 63. Service Locator

A global service registry can hide dependencies:

```js
container.get("repository");
```

This can make code harder to reason about and test.

Explicit injection is often clearer.

---

## 64. Dependency Rule

Ask:

```text
Who needs this?
Who owns the abstraction?
Who should know the concrete implementation?
```

---

# PART H — APPLICATION ARCHITECTURE

## 65. Use Case

A use case represents an application action.

```text
CreateNote
UpdateNote
MoveNote
ShareNote
DeleteNote
```

---

## 66. Use Case Example

```js
function createNote({ repository, permissionChecker }) {
  return async function execute(user, input) {
    await permissionChecker.assertCanCreate(user);
    return repository.create(input);
  };
}
```

---

## 67. Controller Responsibility

A controller should translate transport concerns into application calls and application results back into transport responses.

---

## 68. Controller Anti-Pattern

Avoid controllers containing:

```text
SQL/Mongo queries
complex business rules
email provider calls
large transformations
```

unless the application is genuinely tiny and the code remains clear.

---

## 69. Service Layer

A service can coordinate business/application behavior.

Do not create empty services merely because every tutorial has a `service.js` file.

---

## 70. Repository Layer

A repository is a persistence boundary.

It is useful when persistence details should be isolated or when the domain/application needs a clear storage capability.

---

## 71. Repository Is Not Mandatory

For a tiny CRUD application, direct database access in a small service may be clearer.

Architecture should match complexity.

---

## 72. Unit of Work

A Unit of Work coordinates multiple changes that must be committed together where the persistence technology supports the required transaction semantics.

---

# PART I — FRONTEND ARCHITECTURE

## 73. Frontend Layers

A practical React system can separate:

```text
UI
 ↓
Feature logic
 ↓
API client
 ↓
Transport
```

---

## 74. Feature Modules

```text
features/
├── auth/
├── notes/
├── folders/
└── sharing/
```

Keep feature-specific code close when it improves ownership.

---

## 75. UI Components

Components should expose understandable APIs and avoid importing unrelated application infrastructure when unnecessary.

---

## 76. Custom Hooks

Hooks can encapsulate reusable stateful behavior.

```js
function useNotes() {
  // query/state behavior
}
```

---

## 77. API Client Boundary

```js
export async function createNote(input) {
  return request("/notes", {
    method: "POST",
    body: input
  });
}
```

Components should not need to know low-level fetch configuration everywhere.

---

## 78. State Ownership

Ask:

```text
Who needs this state?
How long should it live?
Is it server state or UI state?
```

---

## 79. Server State vs UI State

Server state:

```text
Notes
Users
Folders
```

UI state:

```text
Modal open
Selected tab
Input draft
```

Treating every state value the same often creates unnecessary complexity.

---

## 80. Global State Warning

Do not put every value into Redux, Zustand, Context, or another global store.

Local state is often the simplest correct choice.

---

# PART J — BACKEND ARCHITECTURE

## 81. Express Boundary

```text
app.js
 ↓
routes
 ↓
controllers
 ↓
application
 ↓
infrastructure
```

---

## 82. Middleware Boundary

Middleware is useful for cross-cutting HTTP concerns such as:

- authentication parsing
- request IDs
- logging
- rate limiting
- error translation

---

## 83. Authentication vs Authorization

Authentication:

```text
Who are you?
```

Authorization:

```text
What may you do?
```

Keep these concepts distinct.

---

## 84. Authorization Boundary

Authorization must be enforced on trusted server-side boundaries for protected operations.

UI hiding is not authorization.

---

## 85. Error Architecture

```text
Low-level error
 ↓
Application translation
 ↓
Safe API error
 ↓
Client handling
```

Never expose secrets, stack traces, SQL, or internal paths to clients by default.

---

## 86. Configuration Architecture

```text
Environment
 ↓
Config loader
 ↓
Validated config
 ↓
Application
```

Avoid reading `process.env` everywhere.

---

## 87. Logging Architecture

Use structured logs where appropriate.

Include safe context such as:

```text
requestId
operation
duration
status
```

Avoid secrets and unnecessary sensitive data.

---

## 88. Observability

Three common pillars:

```text
Logs
Metrics
Traces
```

They answer different operational questions.

---

# PART K — DATABASE ARCHITECTURE

## 89. Data Model vs Domain Model

A Mongo document or SQL row is a persistence representation.

It does not automatically equal the application's domain model.

---

## 90. Persistence Leakage

If Mongo-specific query objects spread through business logic, persistence details have leaked across the boundary.

---

## 91. Mapping Trade-off

Mapping adds code.

The benefit is independence between representations when that independence matters.

---

## 92. MongoDB Architecture

For a Notes application:

```text
Use Case
 ↓
NoteRepository
 ↓
Mongoose Adapter
 ↓
MongoDB
```

---

## 93. Transaction Design

Use transactions when multiple writes must satisfy an atomic consistency requirement and the database configuration supports it.

Do not wrap every operation in a transaction automatically.

---

## 94. Index Architecture

Indexes support specific query patterns.

```text
Query pattern
 ↓
Index design
 ↓
Measure query performance
```

Do not add indexes without considering write cost and storage.

---

## 95. Pagination

Architecture should define pagination semantics explicitly.

Offset pagination and cursor pagination have different trade-offs.

---

## 96. Soft Delete

Soft delete is a domain/persistence decision, not merely an `isDeleted` field.

Define visibility, uniqueness, retention, and restoration semantics.

---

# PART L — API ARCHITECTURE

## 97. Resource-Oriented API

A common REST style models resources:

```text
GET    /notes
POST   /notes
GET    /notes/:id
PATCH  /notes/:id
DELETE /notes/:id
```

---

## 98. API Contract

Define:

- request shape
- response shape
- status codes
- error format
- authentication
- authorization
- pagination
- versioning strategy

---

## 99. Versioning

Versioning may be done through URL, headers, or compatibility policies.

Do not add versions automatically without a compatibility requirement.

---

## 100. Idempotency

Mutating operations that may be retried should have deliberate idempotency semantics.

An idempotency key requires server-side handling; naming a header alone does not make an operation idempotent.

---

## 101. API Evolution

Prefer additive, backward-compatible changes where practical.

Breaking changes require migration or versioning strategy.

---

# PART M — EVENT-DRIVEN ARCHITECTURE

## 102. Event

An event describes something that happened.

```text
NoteCreated
NoteShared
NoteArchived
```

---

## 103. Event-Driven Flow

```text
Command
 ↓
State change
 ↓
Event
 ↓
Consumers
```

---

## 104. Event vs Command

Command:

```text
Please perform X.
```

Event:

```text
X happened.
```

---

## 105. Pub/Sub

```text
Publisher
   ↓
Broker/channel
 ↙  ↓  ↘
A   B   C
```

The intermediary reduces direct publisher-to-consumer coupling.

---

## 106. Eventual Consistency

Some distributed systems allow different components to converge rather than becoming immediately consistent.

This must be an explicit product/system trade-off.

---

## 107. Outbox Pattern

The outbox pattern stores a business change and an event record in the same database transaction where the database supports the needed atomicity.

A separate publisher later delivers the event.

---

## 108. Outbox Flow

```text
Transaction
 ├── Update business data
 └── Insert outbox event
          ↓
      Publisher
          ↓
       Broker
```

This reduces dual-write inconsistency.

---

## 109. Consumer Idempotency

Consumers may receive the same event more than once.

Use event IDs and durable processing semantics where needed.

---

# PART N — ASYNCHRONOUS ARCHITECTURE

## 110. Queue

A queue decouples producer and consumer timing.

```text
Producer → Queue → Worker
```

---

## 111. When to Use a Queue

Examples:

- email delivery
- image processing
- report generation
- long-running jobs
- burst smoothing

---

## 112. Queue Trade-offs

Queues add:

- operational infrastructure
- eventual consistency
- retry behavior
- duplicate delivery concerns
- observability requirements

---

## 113. Retry Policy

Retry only failures likely to be transient.

Use bounded exponential backoff and jitter.

---

## 114. Dead-Letter Queue

A dead-letter mechanism stores messages that cannot be successfully processed after the configured retry policy.

It is a recovery workflow, not a garbage bin.

---

# PART O — DISTRIBUTED SYSTEMS

## 115. Distributed Systems Reality

Once components communicate over a network, assume:

```text
Latency
Timeouts
Partial failure
Duplicates
Reordering
Unavailable dependencies
```

---

## 116. Timeout

Every external call should have an appropriate timeout policy.

An infinite wait can exhaust resources.

---

## 117. Retry Storm

Unbounded retries can amplify an outage.

```text
Failure
 ↓
Retry × many clients
 ↓
More load
 ↓
More failure
```

---

## 118. Circuit Breaker

A circuit breaker can temporarily stop calls to an unhealthy dependency after repeated failures.

Use it when its operational complexity is justified.

---

## 119. Bulkhead

Bulkheading isolates resource pools so one failing dependency or workload does not consume everything.

---

## 120. Backpressure

Backpressure prevents producers from overwhelming consumers.

---

## 121. Distributed Lock Warning

A local mutex does not coordinate independent processes.

Distributed coordination requires an appropriate distributed primitive and failure model.

---

# PART P — CACHING ARCHITECTURE

## 122. Why Cache?

Caching can reduce:

- latency
- database load
- repeated computation

But it introduces consistency and invalidation complexity.

---

## 123. Cache-Aside

```text
Read
 ↓
Cache hit? → return
 ↓ miss
Database
 ↓
Cache result
```

---

## 124. Cache Invalidation

A cache is only useful if its freshness semantics are acceptable.

“Cache invalidation is hard” is practical engineering reality, not a reason never to cache.

---

## 125. CDN

A CDN caches or serves content closer to users through edge infrastructure.

---

## 126. HTTP Cache Headers

Use explicit cache semantics:

```text
Cache-Control
ETag
Last-Modified
Vary
```

---

## 127. Cache-Control

`no-cache` generally means revalidation is required before reuse; it does not mean “never store.”

`no-store` means do not store the response.

---

# PART Q — SECURITY ARCHITECTURE

## 128. Security Boundary

Security decisions must happen at trusted boundaries.

---

## 129. Threat Modeling

Ask:

```text
What are we protecting?
Who can attack it?
What can go wrong?
What controls reduce the risk?
```

---

## 130. Authentication Architecture

Separate credential verification from application authorization decisions.

---

## 131. Session Architecture

Cookie-based sessions and bearer-token architectures have different threat models.

Choose storage and transport deliberately.

---

## 132. Secret Management

Secrets belong in secure configuration/secret-management systems, not source control.

---

## 133. SSRF

Server-side code that fetches attacker-controlled URLs needs SSRF defenses and network-level controls where applicable.

---

## 134. Rate Limiting

Rate limiting can protect expensive or abuse-prone endpoints.

Its architecture depends on whether the deployment is single-process or distributed.

---

## 135. Security Through Architecture

Examples:

```text
Least privilege
Explicit trust boundaries
Input validation
Output encoding
Secure defaults
Auditability
```

---

# PART R — PERFORMANCE ARCHITECTURE

## 136. Performance Budget

Define measurable goals:

```text
Page load
Interaction latency
API latency
Database query time
Memory usage
```

---

## 137. Browser Performance

Architecture affects:

- JavaScript bundle size
- rendering work
- network requests
- image delivery
- caching
- hydration/SSR strategy

---

## 138. Code Splitting

Load code when it is needed rather than shipping every feature immediately when that improves the product's loading profile.

---

## 139. Backend Performance

Profile the actual bottleneck.

```text
Request
 ↓
Measure
 ↓
CPU / DB / network / serialization
 ↓
Optimize bottleneck
```

---

## 140. N+1 Problem

Repeated database calls can create an N+1 query pattern.

Measure query behavior and use batching, joins/population, aggregation, or redesigned access patterns where appropriate.

---

# PART S — RELIABILITY

## 141. Reliability

Reliability is the ability of a system to perform correctly over time under expected and unexpected conditions.

---

## 142. Availability

Availability asks whether the system is usable when requested.

High availability can require redundancy and operational complexity.

---

## 143. Graceful Degradation

When a non-critical dependency fails, the system may continue with reduced functionality.

```text
Recommendations unavailable
        ↓
Notes still work
```

---

## 144. Fail Fast vs Fail Soft

Use fail-fast behavior when continuing would be unsafe.

Use graceful degradation when partial functionality is acceptable.

---

## 145. Health Checks

Differentiate:

```text
Liveness → should this process be restarted?
Readiness → can this instance receive traffic?
```

Exact semantics depend on deployment platform.

---

## 146. Disaster Recovery

Define:

```text
RPO → acceptable data loss window
RTO → acceptable recovery time
```

Architecture should match the actual business requirement.

---

# PART T — OBSERVABILITY

## 147. Logs

Logs record events and contextual information.

Use structured formats where possible.

---

## 148. Metrics

Metrics provide numerical signals such as:

```text
Request rate
Error rate
Latency
Queue depth
```

---

## 149. Traces

Distributed traces connect operations across service boundaries.

```text
HTTP request
 ↓
Service A
 ↓
Service B
 ↓
Database
```

---

## 150. Correlation IDs

A request/correlation ID can connect logs and traces belonging to the same operation.

Do not put secrets into IDs.

---

## 151. Observability Architecture

```text
Application
 ├── Logs
 ├── Metrics
 └── Traces
       ↓
Observability backend
```

---

# PART U — TEST ARCHITECTURE

## 152. Test Pyramid Is a Heuristic

Unit, integration, and E2E tests serve different purposes.

There is no universal numeric ratio that every project must follow.

---

## 153. Unit Boundary

Pure domain functions are excellent unit-test candidates.

---

## 154. Integration Boundary

Integration tests verify wiring between components such as application code and a real database.

---

## 155. Contract Tests

Contract tests verify that an implementation satisfies an agreed capability contract.

---

## 156. E2E Boundary

E2E tests verify important user journeys through the real application stack.

---

## 157. Architecture and Testability

If a core use case requires MongoDB, Redis, email, and HTTP for every unit test, examine the dependency boundary.

---

# PART V — DEPLOYMENT ARCHITECTURE

## 158. Build vs Runtime

Build-time concerns include:

```text
Bundling
Transpilation
Type checking
Asset optimization
```

Runtime concerns include:

```text
Processes
Ports
Environment
Database connections
Secrets
Scaling
```

---

## 159. Environment Separation

Typical environments:

```text
Development
Test
Staging
Production
```

Do not assume they have identical characteristics.

---

## 160. CI/CD

```text
Commit
 ↓
Lint/Test
 ↓
Build
 ↓
Security checks
 ↓
Deploy
 ↓
Verify
```

---

## 161. Deployment Strategy

Examples:

- rolling deployment
- blue/green
- canary

Choose based on risk and operational capability.

---

## 162. Database Migration

Schema/data migrations should be versioned and reversible where practical.

For zero-downtime systems, consider backward-compatible expand/contract migrations.

---

## 163. Expand/Contract

```text
Expand
 ↓
Deploy compatible code
 ↓
Migrate data
 ↓
Switch reads/writes
 ↓
Contract old schema
```

---

# PART W — ARCHITECTURE DECISION RECORDS

## 164. ADR

An Architecture Decision Record captures an important decision and its reasoning.

---

## 165. ADR Structure

```text
Title
Status
Context
Decision
Consequences
Alternatives
```

---

## 166. Why ADRs Matter

Future developers can understand why the system looks the way it does instead of rediscovering old constraints.

---

## 167. Example ADR

```text
Decision: Use modular monolith
Context: Small team, one product
Reason: Lower operational complexity
Consequence: Internal module boundaries must remain explicit
```

---

# PART X — REFACTORING ARCHITECTURE

## 168. Do Not Rewrite Automatically

A rewrite is expensive and risky.

Prefer incremental migration when the current system can be evolved safely.

---

## 169. Characterization Tests

Before changing legacy behavior, capture important existing behavior with tests.

---

## 170. Seams

A seam is a place where behavior can be altered without editing the code at the exact point being tested, often by injecting or replacing a dependency.

---

## 171. Strangler Pattern

Gradually route parts of a legacy system to a new implementation.

```text
Old system
   ↓
Facade/router
 ↙        ↘
Old       New
```

Over time, the new system can replace more behavior.

---

## 172. Extract Module

Start by extracting a cohesive capability with a clear API.

---

## 173. Invert Dependency

Move dependency direction toward the stable policy boundary.

---

## 174. Replace Adapter

Keep the port stable while replacing infrastructure implementations.

---

# PART Y — ARCHITECTURE SMELLS

## 175. God Module

One module knows everything and does everything.

---

## 176. Shared Mutable Global State

Global mutable state can create hidden coupling and order-dependent behavior.

---

## 177. Circular Dependencies

Cycles can signal unclear ownership or overly coupled modules.

---

## 178. Leaky Abstraction

An abstraction is leaky when callers must understand details it was supposed to hide.

---

## 179. Anemic Abstraction

An abstraction that adds no meaningful boundary or behavior can be unnecessary ceremony.

---

## 180. Service Locator Everywhere

Global lookup hides dependencies and makes architecture harder to visualize.

---

## 181. Distributed Monolith

Multiple services that must deploy together and make tightly coupled synchronous calls can behave like a monolith with distributed-system costs.

---

## 182. Shared Database Coupling

Independent services sharing tables directly can create hidden coupling and coordinated deployments.

---

## 183. Chatty Services

Many tiny network calls can create latency and failure amplification.

---

## 184. Premature Microservices

Splitting a simple application into services before a real boundary exists increases operational cost.

---

# PART Z — ARCHITECTURE + SOLID

## 185. SRP at Architecture Level

Modules should have coherent responsibilities, not merely classes.

---

## 186. OCP at Architecture Level

Architecture should isolate major variation points such as external providers and deployment-specific details.

---

## 187. LSP at Architecture Level

Adapters must honor the behavioral contracts of their ports.

---

## 188. ISP at Architecture Level

Modules should expose focused APIs rather than enormous public surfaces.

---

## 189. DIP at Architecture Level

Stable application/domain policy should not depend directly on volatile infrastructure details.

---

# PART AA — ARCHITECTURE + DESIGN PATTERNS

## 190. Factory

Useful when object creation varies or construction is complex.

---

## 191. Strategy

Useful when interchangeable algorithms vary independently.

---

## 192. Adapter

Useful for translating an external API into an internal capability.

---

## 193. Facade

Useful for presenting a simpler interface over a complex subsystem.

---

## 194. Repository

Useful as a persistence boundary when that boundary provides real value.

---

## 195. Observer/Pub-Sub

Useful for decoupling event producers from consumers.

---

## 196. Middleware

Useful for composable request/processing concerns.

---

# PART AB — JAVASCRIPT MONOREPO ARCHITECTURE

## 197. Monorepo

A monorepo stores multiple related packages/projects in one repository.

---

## 198. Package Boundaries

```text
packages/
├── ui
├── config
├── validation
└── domain
```

Explicit package dependencies can prevent accidental imports.

---

## 199. Shared Package Warning

A shared package becomes dangerous when unrelated features depend on a constantly changing “common” package.

---

## 200. Workspace Dependency Graph

Keep package dependency direction acyclic where possible.

---

## 201. Public API of a Package

Use package exports to control what consumers can import.

---

# PART AC — FULL-STACK NOTES ARCHITECTURE

## 202. Recommended Structure

```text
notes-platform/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   ├── validation/
│   ├── shared-types/
│   └── config/
└── docs/
```

Use shared packages only where sharing is genuinely beneficial.

---

## 203. Backend Modules

```text
api/src/
├── auth/
├── users/
├── notes/
├── folders/
├── tags/
├── sharing/
├── search/
└── infrastructure/
```

---

## 204. Notes Module

```text
notes/
├── domain/
├── application/
├── infrastructure/
└── presentation/
```

Use this depth when the domain complexity justifies it.

---

## 205. Note Domain

Potential rules:

```text
Owner controls private note
Archived note has defined behavior
Trashed note has defined visibility
Shared note has explicit permissions
```

---

## 206. Note Application Use Cases

```text
CreateNote
UpdateNote
GetNote
ListNotes
ArchiveNote
TrashNote
RestoreNote
ShareNote
UnshareNote
```

---

## 207. Note Ports

```text
NoteRepository
PermissionChecker
EventPublisher
Clock
IdGenerator
```

Inject only capabilities actually required.

---

## 208. Note Adapters

```text
MongoNoteRepository
JwtPermissionChecker
OutboxEventPublisher
SystemClock
CryptoIdGenerator
```

Names are illustrative; actual implementations depend on project choices.

---

## 209. Frontend Features

```text
web/src/features/
├── auth/
├── notes/
├── folders/
├── tags/
└── sharing/
```

---

## 210. Frontend API Boundary

```text
Component
 ↓
Feature hook
 ↓
API client
 ↓
HTTP
```

---

# PART AD — ARCHITECTURE EXERCISES

## 211. Challenge 1

Draw the dependency graph of your current JavaScript project.

---

## 212. Challenge 2

Identify three high-coupling areas.

---

## 213. Challenge 3

Identify three cohesive modules.

---

## 214. Challenge 4

Find one circular dependency and propose two solutions.

---

## 215. Challenge 5

Design a feature-based Express folder structure.

---

## 216. Challenge 6

Design a React feature module with UI, hook, API client, and tests.

---

## 217. Challenge 7

Create a repository port and Mongo adapter.

---

## 218. Challenge 8

Create an external email provider adapter.

---

## 219. Challenge 9

Design an outbox flow for `NoteShared`.

---

## 220. Challenge 10

Design a queue for asynchronous email delivery.

---

## 221. Challenge 11

Define an API contract for note pagination.

---

## 222. Challenge 12

Compare offset and cursor pagination for your Notes app.

---

## 223. Challenge 13

Define a caching strategy for popular public notes.

---

## 224. Challenge 14

Define RPO and RTO for a personal Notes application.

---

## 225. Challenge 15

Create an ADR explaining your database choice.

---

## 226. Challenge 16

Create an ADR explaining modular monolith vs microservices.

---

## 227. Challenge 17

Design authentication and authorization boundaries.

---

## 228. Challenge 18

Find persistence leakage in a hypothetical service.

---

## 229. Challenge 19

Design a graceful degradation strategy when email is unavailable.

---

## 230. Challenge 20

Create a structured logging plan with request IDs.

---

# PART AE — ADVANCED DESIGN CHALLENGES

## 231. Challenge 21

Design multi-tenant note isolation.

---

## 232. Challenge 22

Design optimistic concurrency for note editing.

---

## 233. Challenge 23

Design an idempotent note-sharing operation.

---

## 234. Challenge 24

Design a background search-indexing workflow.

---

## 235. Challenge 25

Design an event-driven audit trail.

---

## 236. Challenge 26

Design a notification system with email, push, and in-app adapters.

---

## 237. Challenge 27

Design a migration from a legacy notes controller to use cases.

---

## 238. Challenge 28

Design a modular monolith dependency rule and enforce it with tooling.

---

## 239. Challenge 29

Design an API gateway only if multiple services genuinely require one.

---

## 240. Challenge 30

Design a disaster-recovery plan for the Notes application.

---

# PART AF — INTERVIEW QUESTIONS

## 241. What Is Architecture?

The high-level organization of system responsibilities, boundaries, dependencies, data flows, and important technical decisions.

---

## 242. Architecture vs Design?

Architecture usually concerns larger structural decisions and boundaries. Design can operate at class, function, module, or subsystem level. The distinction is contextual rather than absolute.

---

## 243. What Is a Modular Monolith?

A single deployable application with intentionally separated internal modules and dependency boundaries.

---

## 244. Why Start With a Monolith?

It reduces distributed-system and operational complexity while allowing internal modularity.

---

## 245. What Is Hexagonal Architecture?

Ports and Adapters architecture that isolates core application behavior from external technologies through explicit boundaries.

---

## 246. What Is Clean Architecture?

An architecture family emphasizing dependency direction toward stable business/application rules.

---

## 247. What Is a Port?

An abstraction representing a capability at an architectural boundary.

---

## 248. What Is an Adapter?

A component that implements or translates a boundary contract for a concrete technology.

---

## 249. What Is a Bounded Context?

A boundary within which a domain model and vocabulary have a defined meaning.

---

## 250. What Is an Aggregate?

A consistency boundary around domain objects whose invariants are controlled through an aggregate root.

---

## 251. Why Are Network Calls Different From Function Calls?

They introduce latency, failure, serialization, authentication, timeouts, and potentially retries or duplication.

---

## 252. What Is an Outbox?

A pattern that stores a business change and an event record atomically in the same database transaction where supported, then publishes the event asynchronously.

---

## 253. What Is Eventual Consistency?

A model where replicas/components may temporarily disagree but converge according to the system's consistency mechanism.

---

## 254. What Is a Distributed Monolith?

A service architecture with distributed deployment but strong synchronous coupling that retains many monolithic coordination costs.

---

## 255. What Is an ADR?

A lightweight record of an important architecture decision, its context, reasoning, and consequences.

---

# PART AG — TEACH-BACK

## 256. Explain Architecture in 60 Seconds

Architecture is the structure that controls responsibilities, boundaries, dependencies, and important system decisions.

---

## 257. Explain Modular Monolith

One deployable application, many explicit internal modules.

---

## 258. Explain Hexagonal Architecture

Core policy communicates through ports; adapters connect those ports to external technologies.

---

## 259. Explain Clean Architecture

Dependencies should generally point toward stable application/domain policy rather than outward infrastructure details.

---

## 260. Explain Microservices

Independent deployable services with operational and distributed-system costs that should be justified by real constraints.

---

## 261. Explain Outbox

Persist business state and the outgoing event in one local transaction, then publish the event later.

---

## 262. Explain Architecture Trade-offs

Every architectural choice exchanges one cost for another:

```text
simplicity ↔ flexibility
latency ↔ consistency
independence ↔ operational cost
abstraction ↔ complexity
```

---

# PART AH — DEBUGGING ARCHITECTURE

## 263. Symptom: Everything Imports Everything

Likely problem: weak module boundaries.

Start by drawing the dependency graph.

---

## 264. Symptom: Every Change Breaks Five Features

Investigate coupling and shared mutable state.

---

## 265. Symptom: Tests Need the Whole System

Investigate hidden dependencies and missing boundaries.

---

## 266. Symptom: Provider Change Requires Global Rewrite

Investigate infrastructure leakage and missing adapters/ports.

---

## 267. Symptom: Microservices Deploy Together

Investigate whether the service boundaries provide real independence.

---

## 268. Symptom: Queue Messages Duplicate Work

Implement explicit idempotency semantics rather than assuming delivery is exactly once.

---

## 269. Symptom: Cache Returns Wrong Data

Investigate cache keys, invalidation, TTL, authorization scope, and consistency semantics.

---

## 270. Symptom: Production Failure Is Hard to Trace

Investigate structured logs, correlation IDs, metrics, and distributed traces.

---

# PART AI — ARCHITECTURE REVIEW CHECKLIST

## 271. Boundaries

- [ ] Are major responsibilities separated?
- [ ] Are external systems isolated?
- [ ] Are module APIs intentional?

---

## 272. Dependencies

- [ ] Is dependency direction clear?
- [ ] Are cycles avoided or justified?
- [ ] Are volatile details isolated?

---

## 273. Data

- [ ] Are DTO boundaries explicit?
- [ ] Is validation performed at trust boundaries?
- [ ] Are transaction requirements clear?

---

## 274. Reliability

- [ ] Are timeouts defined?
- [ ] Are retries bounded?
- [ ] Are mutations idempotent where necessary?
- [ ] Is graceful degradation intentional?

---

## 275. Security

- [ ] Authentication is separate from authorization
- [ ] Authorization is enforced at trusted boundaries
- [ ] Secrets are not committed
- [ ] External input is validated
- [ ] Sensitive logs are avoided

---

## 276. Performance

- [ ] Performance goals are measurable
- [ ] Database queries are profiled
- [ ] Caching has freshness semantics
- [ ] Frontend loading is measured

---

## 277. Operations

- [ ] Logs exist
- [ ] Metrics exist
- [ ] Critical paths are traceable
- [ ] Health/readiness semantics are clear
- [ ] Deployment rollback exists

---

# PART AJ — FINAL MASTERY PROJECT

## 278. Project: Architect the Full-Stack Notes Platform

Build the Notes application as a modular monolith first.

Required capabilities:

- authentication
- authorization
- users
- notes
- folders
- nested folders
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

## 279. Project Boundary Map

```text
Web App
   ↓ HTTP
API Presentation
   ↓
Application Use Cases
   ↓
Domain Rules
   ↓
Ports
   ↑
Infrastructure Adapters
   ↓
MongoDB / External Providers
```

---

## 280. Project Module Rules

Define allowed dependencies such as:

```text
presentation → application
application → domain
application → ports
infrastructure → ports
```

Prevent domain code from importing Express or Mongoose.

---

## 281. Project API Contract

Document every endpoint with:

```text
Method
Path
Auth
Authorization
Request
Response
Errors
Pagination
Idempotency
```

---

## 282. Project Data Architecture

Document:

- collections/tables
- indexes
- ownership
- relationships
- transaction boundaries
- retention
- soft-delete semantics

---

## 283. Project Event Architecture

Define events such as:

```text
NoteCreated
NoteUpdated
NoteShared
NoteArchived
NoteTrashed
```

Document producers, consumers, event IDs, retries, and idempotency.

---

## 284. Project Cache Architecture

Choose exactly what is cached, where, for how long, and how invalidation works.

---

## 285. Project Security Architecture

Document:

```text
Authentication
Authorization
Session/token handling
CSRF strategy where applicable
Rate limiting
Input validation
Audit logging
Secret management
```

---

## 286. Project Observability Architecture

Implement:

```text
Request ID
Structured logs
Error metrics
Latency metrics
Critical traces
```

---

## 287. Project Reliability Architecture

Define:

```text
Timeouts
Retries
Idempotency
Graceful degradation
Backup
RPO
RTO
```

---

## 288. Project ADR Set

Create ADRs for at least:

1. modular monolith
2. MongoDB
3. authentication approach
4. API contract
5. event/outbox decision
6. caching decision
7. deployment strategy

---

## 289. Project Architecture Tests

Add automated checks for important dependency rules.

Example concept:

```text
Domain → Express

FAIL
```

```text
Domain → external SDK

FAIL
```

---

## 290. Project Migration Exercise

Create a deliberately messy version first.

Then refactor it incrementally while keeping behavior stable.

Record each architecture decision.

---

# FINAL ARCHITECTURE MASTERY CHECKLIST

## 291. Foundations

- [ ] Explain architecture
- [ ] Explain boundaries
- [ ] Explain coupling/cohesion
- [ ] Explain trade-offs
- [ ] Draw dependency graphs

---

## 292. Styles

- [ ] Layered architecture
- [ ] Modular monolith
- [ ] MVC
- [ ] Clean Architecture
- [ ] Hexagonal Architecture
- [ ] Onion Architecture
- [ ] Microservices

---

## 293. Domain Design

- [ ] Entity
- [ ] Value object
- [ ] Aggregate
- [ ] Aggregate root
- [ ] Bounded context
- [ ] Ubiquitous language

---

## 294. Backend

- [ ] Controller
- [ ] Use case
- [ ] Repository
- [ ] DTO
- [ ] Mapper
- [ ] Ports/adapters
- [ ] Configuration boundary

---

## 295. Distributed Systems

- [ ] Timeout
- [ ] Retry
- [ ] Backoff/jitter
- [ ] Idempotency
- [ ] Queue
- [ ] Event
- [ ] Outbox
- [ ] Eventual consistency

---

## 296. Operations

- [ ] Logs
- [ ] Metrics
- [ ] Traces
- [ ] Health checks
- [ ] Deployment strategies
- [ ] Database migrations
- [ ] Disaster recovery

---

## 297. Security

- [ ] Trust boundaries
- [ ] Authentication
- [ ] Authorization
- [ ] Secret management
- [ ] SSRF awareness
- [ ] Rate limiting

---

## 298. Judgment

- [ ] Know when a monolith is better
- [ ] Know when a repository is unnecessary
- [ ] Know when a queue is unnecessary
- [ ] Know when an abstraction is harmful
- [ ] Know when distributed architecture is justified
- [ ] Explain trade-offs instead of memorizing patterns

---

# FINAL ARCHITECTURE RULE

> **Architecture is successful when the system's boundaries make important changes safer and its complexity remains proportional to the problem.**

Before adding a layer, service, abstraction, queue, cache, or database, ask:

```text
What problem does this solve?
What boundary does it create?
What dependency does it isolate?
What operational cost does it add?
How will failure behave?
How will I test it?
Can a simpler architecture satisfy the requirement?
```

That is the difference between **architecture by fashion** and **architecture by engineering judgment**.
