# 27 — Projects

> The final build chapter: turn JavaScript knowledge into real products, architecture decisions, debugging skill, and portfolio-ready projects.

## Project Philosophy

Projects are where isolated concepts become engineering skill.

```text
Learn → Plan → Build → Test → Debug → Refactor → Ship → Explain
```

Do not start by copying a tutorial. Start from requirements, define the smallest useful version, and expand it deliberately.

---

# PART A — HOW TO BUILD PROJECTS

## 1. A Project Is a System

A project combines UI, state, data, logic, networking, errors, security, testing, and deployment.

## 2. Start With the Problem

Write one sentence describing the user problem before choosing a technology.

## 3. Define the User

Identify who uses the product and what they are trying to accomplish.

## 4. Define the MVP

List the smallest feature set that proves the core idea.

## 5. Separate Must-Have and Nice-to-Have

Prevent feature creep from destroying the first milestone.

## 6. Write User Stories

Use a format such as:

```text
As a user, I want to ___ so that ___
```

## 7. Define Acceptance Criteria

A feature is complete only when its expected behavior is testable.

## 8. Identify Inputs

List user input, API data, URL parameters, storage data, and environment configuration.

## 9. Identify Outputs

Define UI state, API responses, stored records, files, and events.

## 10. Identify Failure Cases

Think about invalid input, network failure, authorization failure, empty data, duplicate requests, timeouts, and dependency failure.

## 11. Draw the User Flow

```text
User
 ↓
UI
 ↓
Action
 ↓
Application Logic
 ↓
Data/API
 ↓
Result
 ↓
UI State
```

## 12. Draw the Data Flow

Before coding, know where important data originates, changes, and ends.

## 13. Define the Data Model

Write entities, fields, relationships, constraints, and ownership rules.

## 14. Define the API Contract

Specify methods, paths, request shape, response shape, status codes, and errors.

## 15. Define Module Boundaries

Group code by responsibility rather than allowing every file to import everything.

## 16. Build the Happy Path First

Make one complete user journey work end-to-end before adding polish.

## 17. Add Validation

Validate untrusted data at trust boundaries.

## 18. Add Error States

Every asynchronous UI should deliberately consider loading, success, empty, and error states.

## 19. Add Tests Early

Protect important behavior before large refactors.

## 20. Refactor After Understanding

First make behavior correct; then improve structure without changing behavior.

## 21. Measure Before Optimizing

Use profiling and meaningful metrics instead of guessing.

## 22. Security Is a Requirement

Authentication, authorization, validation, safe rendering, secrets, and abuse controls belong in the architecture.

## 23. Accessibility Is a Requirement

Use semantic HTML, keyboard support, labels, focus management, and accessible status/error communication.

## 24. Documentation Is Part of the Product

A project should explain setup, architecture, decisions, API usage, and known limitations.

## 25. Ship Something Small

A deployed small project teaches more than an unfinished giant project.

---

# PART B — BEGINNER PROJECTS

## 26. Personal Profile Card

Build a responsive profile card using semantic HTML, CSS, and JavaScript enhancements.

Requirements:

- profile information
- social links
- responsive layout
- theme toggle
- accessible buttons

## 27. Digital Clock

Build a live clock using `Date` and a controlled timer.

Practice:

- dates
- functions
- DOM updates
- cleanup

## 28. Counter App

Implement increment, decrement, reset, and configurable step size.

## 29. Calculator

Support arithmetic operations, clear, decimal input, keyboard interaction, and error handling.

## 30. Number Guessing Game

Generate a secret number and provide bounded hints.

## 31. Random Quote App

Display local quotes and allow copying/sharing the current quote.

## 32. Color Generator

Generate random colors and display HEX, RGB, and HSL representations.

## 33. Gradient Generator

Choose colors, direction, and gradient type; generate copyable CSS.

## 34. BMI Calculator

Collect inputs, validate them, calculate BMI, and present results accessibly.

## 35. Tip Calculator

Calculate tip and split totals among people.

## 36. Age Calculator

Calculate age from a date and handle invalid/future dates.

## 37. Unit Converter

Support several units with explicit conversion formulas.

## 38. Stopwatch

Implement start, pause, reset, and lap behavior without assuming timer callbacks are exact clocks.

## 39. Countdown Timer

Build start, pause, reset, and completion behavior.

## 40. Password Generator

Generate configurable passwords using cryptographically appropriate browser randomness where security matters.

## 41. Character Counter

Count characters and optionally words with clearly defined Unicode/whitespace rules.

## 42. Text Analyzer

Calculate words, characters, lines, and reading statistics.

## 43. Quiz App

Build a four-option quiz with explanations, score, progress, and restart.

## 44. Flashcard App

Create cards, flip them, navigate, and track learning state.

## 45. Todo App

Add, edit, complete, delete, filter, and persist tasks.

## 46. Notes App

Create, edit, delete, search, pin, archive, and persist notes locally.

## 47. Bookmark Manager

Save links, categorize them, search them, and persist metadata.

## 48. Expense Tracker

Track income/expenses, categories, totals, filters, and persistence.

## 49. Habit Tracker

Track daily completion and calculate streaks.

## 50. Pomodoro Timer

Implement work/break cycles and configurable durations.

## 51. Form Validator

Build reusable validation rules and accessible error messages.

## 52. Modal Library

Create reusable modal behavior with Escape, focus handling, and cleanup.

## 53. Tabs Component

Implement accessible tab semantics and keyboard navigation.

## 54. Accordion Component

Build expandable content with explicit state.

## 55. Dropdown Component

Support keyboard navigation, selection, outside-click handling, and Escape.

---

# PART C — INTERMEDIATE FRONTEND PROJECTS

## 56. Weather Dashboard

Consume a weather API and implement loading, error, empty, retry, and caching-aware states.

## 57. GitHub Profile Viewer

Search users and display repositories with pagination or bounded loading.

## 58. Movie Search App

Search movies, display details, debounce input, and handle API failures.

## 59. Recipe Explorer

Search recipes, filter categories, and create a favorites system.

## 60. Markdown Editor

Build editor/preview behavior and treat rendered user content as untrusted.

## 61. Kanban Board

Support columns, cards, drag/drop, persistence, filtering, and keyboard alternatives.

## 62. Calendar App

Render month/week views, create events, edit events, and handle date boundaries.

## 63. Task Management Dashboard

Build projects, tasks, priorities, labels, filters, and a dashboard summary.

## 64. Personal Finance Dashboard

Display transactions, categories, summaries, and charts while separating derived data from source data.

## 65. Shopping Cart

Model products, quantities, pricing, discounts, cart persistence, and checkout boundaries.

## 66. Product Comparison

Select products and compare normalized attributes.

## 67. E-Commerce Product Page

Implement image gallery, variants, quantity, cart action, and responsive UI.

## 68. Admin Dashboard

Build navigation, tables, filters, pagination, forms, permissions-aware UI, and API states.

## 69. File Manager UI

Render folders/files, breadcrumbs, selection, search, upload UI, and permissions states.

## 70. Image Gallery

Implement responsive thumbnails, modal viewing, lazy loading, and keyboard navigation.

## 71. Infinite Feed

Use pagination plus `IntersectionObserver`, prevent duplicate requests, and handle end-of-feed state.

## 72. Real-Time Chat UI

Model conversations, messages, optimistic sending, reconnect behavior, and unread state.

## 73. Notification Center

Display read/unread notifications and synchronize changes.

## 74. Search Autocomplete

Debounce queries, cancel stale requests, and preserve keyboard navigation.

## 75. Drag-and-Drop Builder

Create draggable components and a persistent layout model.

## 76. Rich Text Editor Prototype

Model commands, selection state, serialization, and safe rendering boundaries.

## 77. URL Shortener Frontend

Build URL submission, result display, copy action, validation, and API error handling.

## 78. Authentication Dashboard

Build login, logout, protected UI, session state, and server-enforced authorization assumptions.

## 79. Multi-Step Form

Persist progress, validate each step, and prevent invalid submission.

## 80. Offline-First Todo App

Use IndexedDB and design a synchronization strategy instead of treating local storage as a database substitute.

---

# PART D — NODE.JS / BACKEND PROJECTS

## 81. CLI Calculator

Build a command-line calculator with argument parsing and validation.

## 82. CLI Todo Manager

Persist tasks to a local file and expose CRUD commands.

## 83. Static File Server

Serve files safely and understand path normalization and traversal risks.

## 84. HTTP JSON Server

Build a minimal Node HTTP server without Express to understand request/response fundamentals.

## 85. REST API

Create CRUD endpoints with validation and consistent errors.

## 86. Express Notes API

Implement users, notes, CRUD operations, validation, and error middleware.

## 87. Auth API

Implement registration, login, logout, password hashing, session/token design, and authorization.

## 88. Blog API

Build posts, comments, tags, pagination, moderation boundaries, and authorization.

## 89. URL Shortener API

Generate unique short IDs and redirect safely.

## 90. Expense API

Store transactions, categories, filters, summaries, and ownership checks.

## 91. File Upload API

Handle multipart uploads, size/type constraints, storage abstraction, and authorization.

## 92. Search API

Implement query validation, pagination, filtering, and indexing-aware access.

## 93. Notification API

Create notification records and read/unread operations.

## 94. WebSocket Chat Server

Track connections, rooms, messages, and disconnect behavior.

## 95. SSE Notification Server

Stream server events over HTTP and design reconnection behavior.

## 96. Job Queue Worker

Build a producer/worker system with retries and dead-letter handling.

## 97. Webhook Receiver

Validate requests, deduplicate deliveries, process asynchronously, and return appropriate acknowledgements.

## 98. Rate-Limited API

Implement bounded per-client limits and explain the limitations of an in-memory single-process limiter.

## 99. Audit Log API

Record security-sensitive actions with safe structured metadata.

## 100. Health Check Service

Expose liveness/readiness concepts without leaking internal secrets or dependency details.

---

# PART E — DATABASE PROJECTS

## 101. MongoDB Notes Database

Model users, folders, notes, tags, note-tag relations, and sharing.

## 102. Nested Folder System

Support parent folders while preventing invalid cycles and unauthorized access.

## 103. Tagging System

Implement many-to-many note/tag relationships.

## 104. Search Index Experiment

Compare application-side filtering with database-supported indexes.

## 105. Pagination Experiment

Compare offset and cursor approaches under realistic data assumptions.

## 106. Transaction Experiment

Identify a multi-write operation and determine whether transactional guarantees are required.

## 107. Soft Delete System

Implement trash/archive semantics without confusing them with physical deletion.

## 108. Audit History

Store important changes and identify the difference between audit history and application logs.

## 109. Optimistic Concurrency

Use a version or timestamp strategy to detect conflicting updates.

## 110. Database Migration Exercise

Design an expand-contract migration for a changing field.

---

# PART F — FULL-STACK PROJECTS

## 111. Full-Stack Todo

React frontend + Node API + database + authentication + tests.

## 112. Full-Stack Expense Tracker

Add dashboard analytics, categories, filters, exports, and authorization.

## 113. Full-Stack Blog

Add editor, comments, moderation, search, tags, and image uploads.

## 114. Full-Stack LMS

Build courses, lessons, progress, authentication, roles, and instructor/admin boundaries.

## 115. Full-Stack Issue Tracker

Model projects, issues, labels, assignments, comments, and status transitions.

## 116. Full-Stack Kanban

Build boards, columns, cards, ordering, collaboration, and permissions.

## 117. Full-Stack Bookmark Manager

Add folders, tags, search, sharing, and import/export.

## 118. Full-Stack File Manager

Build folders, uploads, downloads, permissions, metadata, and storage adapters.

## 119. Full-Stack Chat

Combine REST for durable data with WebSocket/SSE where appropriate for real-time behavior.

## 120. Full-Stack Notification Platform

Support multiple delivery adapters and asynchronous processing.

## 121. Full-Stack URL Shortener

Build creation, redirects, analytics, rate limiting, and abuse controls.

## 122. Full-Stack Project Management Tool

Combine projects, tasks, comments, activity logs, filters, and role-based permissions.

## 123. Full-Stack Search Platform

Build indexing, query processing, ranking, pagination, and caching.

## 124. Full-Stack Offline App

Implement local persistence, synchronization, conflict strategy, and recovery.

## 125. Full-Stack SaaS Starter

Create organization accounts, memberships, roles, billing boundary placeholders, settings, and audit logs.

---

# PART G — ADVANCED SYSTEM PROJECTS

## 126. Real-Time Collaborative Notes

Design concurrent editing and conflict resolution explicitly.

## 127. Event-Driven Order System

Use domain/application events, durable event handling, idempotency, and an outbox where justified.

## 128. Distributed Job Processing

Build producers, workers, retries, backoff, dead-letter handling, and observability.

## 129. API Gateway

Route requests, propagate request IDs, apply rate limits, and handle downstream failures safely.

## 130. Notification Infrastructure

Create email, push, and in-app adapters with queue-backed delivery.

## 131. Feature Flag Platform

Implement flag definitions, targeting, evaluation, rollout, and audit history.

## 132. Analytics Pipeline

Collect events, validate schemas, process batches, and expose aggregate metrics.

## 133. Audit Platform

Create immutable-style audit records with retention and access controls appropriate to the product.

## 134. Search Service

Build ingestion, tokenization, indexing, ranking, and query APIs.

## 135. CDN-Aware Media Platform

Design upload, storage, metadata, transformation, cache headers, and signed-access boundaries.

## 136. Multi-Tenant SaaS

Design tenant isolation, authorization, configuration, quotas, and operational boundaries.

## 137. Subscription Platform

Model plans, entitlements, subscription state, webhook processing, and idempotency.

## 138. Collaborative Kanban

Combine real-time updates, ordering, permissions, persistence, and conflict handling.

## 139. Offline Sync Engine

Design local changes, synchronization, retries, conflict resolution, and durable state.

## 140. Developer Platform

Build API keys, projects, usage tracking, rate limits, documentation, and audit logs.

---

# PART H — THE NOTES APP MASTER PROJECT

## 141. Project Goal

Build a production-style full-stack Notes platform that demonstrates the concepts from this entire repository.

## 142. Core Features

```text
Authentication
Users
Folders
Nested folders
Notes
Tags
Pin
Archive
Trash
Search
Sharing
Public/private visibility
```

## 143. Suggested Stack

```text
Frontend: React + TypeScript
Styling: Tailwind CSS
State: Context/Zustand/Redux where justified
Backend: Node.js + Express + TypeScript
Validation: Zod
Database: MongoDB + Mongoose
Testing: unit + integration + critical E2E
```

The architecture should remain technology-aware but not tightly coupled to one framework.

## 144. Repository Structure

```text
notes-platform/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   ├── contracts/
│   ├── validation/
│   └── config/
├── docs/
│   ├── architecture/
│   └── adr/
└── README.md
```

## 145. Backend Structure

```text
api/src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── folders/
│   ├── notes/
│   ├── tags/
│   ├── sharing/
│   └── search/
├── infrastructure/
├── middleware/
├── config/
├── app.ts
└── server.ts
```

## 146. Module Boundary Rule

A feature module owns its application behavior and should not reach arbitrarily into another module's internal implementation.

## 147. Request Flow

```text
HTTP Request
    ↓
Middleware
    ↓
Route
    ↓
Controller
    ↓
Application Use Case
    ↓
Domain Rules
    ↓
Repository / Adapter
    ↓
Database
```

## 148. Response Flow

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

## 149. Authentication Flow

```text
Login
 ↓
Validate credentials
 ↓
Verify password
 ↓
Create authenticated session/token
 ↓
Set secure transport/storage policy
 ↓
Authenticated request
 ↓
Authenticate
 ↓
Authorize
```

## 150. Authorization Rule

Never rely on frontend route guards alone. The server must enforce ownership and permissions.

## 151. Note Creation Flow

```text
POST /notes
 ↓
Authenticate
 ↓
Validate body
 ↓
Authorize folder access
 ↓
Create note
 ↓
Persist
 ↓
Return DTO
```

## 152. Folder Creation Flow

Validate parent ownership and prevent invalid hierarchy operations.

## 153. Nested Folder Rule

Do not permit cycles such as a folder becoming its own descendant.

## 154. Note Update Flow

Validate ownership/permission, validate fields, apply domain rules, persist, and return the updated representation.

## 155. Trash Flow

Define whether trash is soft deletion, archival state, or a separate lifecycle; do not mix these concepts accidentally.

## 156. Archive Flow

Treat archive as an explicit state with clear visibility and restoration behavior.

## 157. Pin Flow

Pinning should be an explicit state transition and should not silently modify unrelated fields.

## 158. Tag Flow

Define whether tags are global, user-owned, or scoped to another boundary.

## 159. Sharing Flow

```text
Owner
 ↓
Create share
 ↓
Permission validation
 ↓
Persist share
 ↓
Recipient access
 ↓
Authorization check
 ↓
Note access
```

## 160. Public Note Flow

Define exactly what information becomes public and avoid exposing private metadata by accident.

## 161. Search Flow

```text
Search input
 ↓
Validate query
 ↓
Normalize/search
 ↓
Database/index
 ↓
Rank/filter
 ↓
Paginate
 ↓
DTO
```

## 162. Realtime Updates

Use WebSocket or SSE only where the product actually benefits from server-pushed updates.

## 163. Notification Flow

Persist durable notification state separately from transient delivery mechanisms.

## 164. File Attachment Flow

```text
Upload
 ↓
Authenticate
 ↓
Validate size/type
 ↓
Store through adapter
 ↓
Persist metadata
 ↓
Return safe reference
```

## 165. Rate Limiting

Protect authentication, search, uploads, and other abuse-prone endpoints with appropriate policies.

## 166. Request IDs

Generate or propagate a request/correlation ID so logs for one request can be connected across layers.

## 167. Structured Logging

Log event name, request ID, relevant safe identifiers, duration, and outcome; never log passwords or raw tokens.

## 168. Error Architecture

Use stable error codes and safe public messages while keeping internal diagnostics separate.

## 169. Validation Architecture

Treat TypeScript types as compile-time guidance and validate runtime external input separately.

## 170. Testing Architecture

```text
Pure domain logic → unit tests
Module wiring → integration tests
API contract → contract tests where useful
Critical user journeys → E2E tests
```

## 171. Performance Plan

Measure database query cost, payload size, frontend rendering, cache behavior, and critical user journeys before optimizing.

## 172. Caching Plan

Define what can be cached, cache ownership, invalidation behavior, and acceptable staleness.

## 173. Database Index Plan

Create indexes from actual query patterns rather than indexing every field automatically.

## 174. Deployment Plan

```text
Browser
 ↓
CDN / Reverse Proxy
 ↓
Web Application
 ↓
API
 ↓
Database
 ↓
Object Storage / External Services
```

## 175. Configuration

Separate code from environment-specific configuration and validate required configuration at startup.

## 176. Secrets

Never commit secrets into the repository.

## 177. Migration Strategy

Use backward-compatible schema changes where rolling deployment requires old and new application versions to coexist.

## 178. Backup Strategy

Define backup frequency, retention, restoration testing, and recovery objectives.

## 179. Observability

Track logs, metrics, traces where justified, latency, errors, throughput, and important business events.

## 180. Architecture Decision Records

Document important choices such as authentication strategy, database design, realtime transport, and search architecture.

---

# PART I — PROJECT DEVELOPMENT PHASES

## 181. Phase 1 — Requirements

Write product requirements and explicit non-goals.

## 182. Phase 2 — UX Flow

Draw major screens and user journeys.

## 183. Phase 3 — Domain Model

Define entities, relationships, ownership, and lifecycle states.

## 184. Phase 4 — API Contract

Define endpoints before connecting frontend and backend.

## 185. Phase 5 — Repository Setup

Configure TypeScript, linting, formatting, testing, and environment validation.

## 186. Phase 6 — Authentication

Implement registration/login/session behavior and authorization middleware.

## 187. Phase 7 — Notes CRUD

Build create/read/update/delete with ownership checks.

## 188. Phase 8 — Folders

Add nested folder behavior and hierarchy validation.

## 189. Phase 9 — Tags

Add tag creation, association, filtering, and cleanup rules.

## 190. Phase 10 — Lifecycle

Add pin, archive, and trash behavior.

## 191. Phase 11 — Sharing

Add explicit permissions and access checks.

## 192. Phase 12 — Search

Implement query validation, indexing, pagination, and useful ranking/filtering.

## 193. Phase 13 — Frontend State

Separate local UI state from server state.

## 194. Phase 14 — Error UX

Design useful user-facing recovery states.

## 195. Phase 15 — Testing

Add unit and integration tests before major expansion.

## 196. Phase 16 — Performance

Profile and fix measured bottlenecks.

## 197. Phase 17 — Security Review

Threat-model important boundaries and test authorization assumptions.

## 198. Phase 18 — Observability

Add safe structured logs and meaningful metrics.

## 199. Phase 19 — Deployment

Deploy using a repeatable process and environment configuration.

## 200. Phase 20 — Documentation

Document setup, architecture, APIs, decisions, trade-offs, and known limitations.

---

# PART J — PROJECT DEBUGGING CHECKLIST

## 201. UI Does Not Update

Check state ownership, mutation, rendering conditions, and stale references.

## 202. API Returns Wrong Data

Trace request → validation → use case → repository → mapper → response.

## 203. Authentication Works Locally but Fails in Production

Inspect cookie policy, secure transport, origin, proxy behavior, environment configuration, and server logs.

## 204. CORS Error

Separate browser CORS enforcement from actual server/network failure.

## 205. Duplicate Requests

Inspect effects, event handlers, retries, and concurrency behavior.

## 206. Stale Search Results

Use cancellation or request sequencing so older responses cannot overwrite newer state.

## 207. Slow Query

Inspect query shape, indexes, result size, and database execution behavior.

## 208. Memory Growth

Look for retained listeners, timers, DOM references, closures, caches, and long-lived collections.

## 209. High CPU

Profile before changing algorithms or rendering logic.

## 210. Random Test Failures

Investigate timing, shared state, randomness, environment, and ordering.

## 211. Permission Bug

Reproduce with multiple identities and verify authorization at the server boundary.

## 212. Data Race

Define ownership/versioning and decide whether optimistic concurrency or another strategy is required.

## 213. Duplicate Webhook

Use idempotency/deduplication semantics instead of assuming exactly-once delivery.

## 214. Queue Retry Storm

Inspect retry policy, backoff, jitter, and downstream health.

## 215. Cache Stale Data

Define invalidation/revalidation semantics rather than blindly clearing every cache.

---

# PART K — PROJECT QUALITY CHECKLIST

## 216. Correctness

- [ ] Happy paths work
- [ ] Edge cases are defined
- [ ] Invalid input is handled
- [ ] Errors are predictable

## 217. Architecture

- [ ] Responsibilities are clear
- [ ] Dependencies have direction
- [ ] Boundaries are explicit
- [ ] Circular dependencies are avoided

## 218. Security

- [ ] Authentication is server-enforced
- [ ] Authorization is server-enforced
- [ ] Input is validated
- [ ] Output is safely handled
- [ ] Secrets are protected
- [ ] Abuse-sensitive endpoints are limited

## 219. Accessibility

- [ ] Semantic HTML
- [ ] Keyboard support
- [ ] Visible focus
- [ ] Labels
- [ ] Accessible errors/status
- [ ] Reasonable color contrast

## 220. Performance

- [ ] Critical paths measured
- [ ] Large data is paginated
- [ ] Expensive work is profiled
- [ ] Images/assets are appropriately optimized
- [ ] Unnecessary network calls are avoided

## 221. Testing

- [ ] Core logic covered
- [ ] Important integration boundaries tested
- [ ] Critical journeys tested
- [ ] Tests are isolated
- [ ] Flaky tests investigated

## 222. Observability

- [ ] Structured logs
- [ ] Request/correlation IDs
- [ ] Useful metrics
- [ ] Error monitoring
- [ ] No secrets in logs

## 223. Documentation

- [ ] README
- [ ] Setup guide
- [ ] Environment example
- [ ] Architecture diagram
- [ ] API documentation
- [ ] ADRs for important decisions

---

# PART L — PORTFOLIO PROJECT LADDER

## 224. Portfolio Level 1

Ship three small projects demonstrating DOM, events, state, and clean UI.

## 225. Portfolio Level 2

Ship two API-driven projects demonstrating async data and robust error handling.

## 226. Portfolio Level 3

Ship one full-stack CRUD project with authentication and tests.

## 227. Portfolio Level 4

Ship one architecture-heavy project with real-time or offline behavior.

## 228. Portfolio Level 5

Ship the Notes platform as the flagship project.

## 229. Portfolio Rule

A portfolio project should explain what problem it solves, what you designed, what went wrong, and what you learned.

## 230. README Rule

Every serious project README should answer:

```text
What is it?
Why does it exist?
How do I run it?
How does it work?
What are the major decisions?
What are the limitations?
What could be improved?
```

---

# PART M — PROJECT INTERVIEW QUESTIONS

## 231. Why Did You Choose This Architecture?

Explain constraints, alternatives, trade-offs, and expected change.

## 232. Why This Database?

Discuss data model, query patterns, consistency, operational cost, and team familiarity.

## 233. How Is Authentication Implemented?

Explain credential verification, session/token handling, transport/storage, expiration, and logout.

## 234. How Is Authorization Implemented?

Explain resource ownership and permission checks at server boundaries.

## 235. How Do You Handle Errors?

Explain validation errors, operational failures, unexpected failures, safe responses, and observability.

## 236. How Do You Handle Duplicate Requests?

Explain idempotency and deduplication where necessary.

## 237. How Would You Scale It?

Discuss bottlenecks before proposing horizontal scaling, caching, queues, or decomposition.

## 238. What Would You Cache?

Explain data volatility, ownership, invalidation, and acceptable staleness.

## 239. What Would You Test?

Prioritize business-critical logic, integration boundaries, and critical user journeys.

## 240. What Is Your Biggest Technical Debt?

Name a real compromise and explain its migration path.

## 241. What Happens When the Database Is Down?

Explain timeouts, safe failures, retries where appropriate, degraded behavior, and recovery.

## 242. What Happens When the Client Retries a Mutation?

Explain whether the operation is idempotent and how duplicate effects are prevented.

## 243. How Do You Observe Production?

Discuss logs, metrics, traces, alerts, dashboards, and correlation IDs.

## 244. How Do You Deploy Safely?

Explain migrations, backward compatibility, health checks, rollback, and progressive rollout where appropriate.

## 245. What Would You Redesign?

Show that you understand the difference between today's constraints and future requirements.

---

# PART N — FINAL BUILD CHALLENGES

## 246. Build a Project From a Screenshot

Infer components and interactions, but write your own implementation.

## 247. Build From a Written Specification

Do not use a tutorial; convert requirements into tasks.

## 248. Build From an API Contract

Implement the frontend without seeing the backend source.

## 249. Build From Tests

Use tests as executable requirements.

## 250. Build From a Bug Report

Reproduce first, diagnose second, fix third, regression-test fourth.

## 251. Rebuild From Memory

Recreate a previous project without opening its implementation.

## 252. Change the Database

Replace the persistence adapter while preserving application behavior.

## 253. Change the UI

Replace the presentation layer without rewriting domain logic.

## 254. Add a New Feature

Add a feature that should affect only one module; measure whether your architecture isolates the change.

## 255. Add Realtime

Introduce server-pushed updates without coupling every feature to a socket implementation.

## 256. Add Offline Support

Define local persistence, synchronization, conflicts, and recovery.

## 257. Add Observability

Add request IDs, structured logs, metrics, and error tracking.

## 258. Add Rate Limits

Protect sensitive endpoints and test expected behavior at the boundary.

## 259. Perform a Security Review

Threat-model assets, actors, trust boundaries, abuse cases, and mitigations.

## 260. Perform an Architecture Review

Draw dependencies and identify coupling, cohesion, failure domains, and scaling bottlenecks.

## 261. Perform a Performance Review

Profile the application and produce evidence for every major optimization.

## 262. Perform an Accessibility Review

Test keyboard-only operation, focus, semantics, labels, and status messages.

## 263. Perform a Reliability Review

Test timeout, retry, duplicate request, dependency failure, and partial failure scenarios.

## 264. Perform a Deployment Review

Verify configuration, migrations, health checks, rollback, logs, and backups.

## 265. Final Project Defense

Explain the system from browser to database without opening the source code.

---

# PROJECT TRACKER

## Beginner

- [ ] 26–55

## Intermediate Frontend

- [ ] 56–80

## Backend

- [ ] 81–100

## Database

- [ ] 101–110

## Full Stack

- [ ] 111–125

## Advanced Systems

- [ ] 126–140

## Notes Master Project

- [ ] 141–180
- [ ] 181–200

## Quality

- [ ] 201–223

## Portfolio

- [ ] 224–230

## Interview

- [ ] 231–245

## Final Challenges

- [ ] 246–265

---

# FINAL PROJECT MASTERY CHECKLIST

- [ ] I can start from requirements instead of a tutorial.
- [ ] I can break a large project into milestones.
- [ ] I can design UI and data flow before coding.
- [ ] I can define API contracts.
- [ ] I can design a useful data model.
- [ ] I can create meaningful module boundaries.
- [ ] I can build a frontend without putting all logic into components.
- [ ] I can build a backend with clear route/controller/service/repository responsibilities.
- [ ] I can validate runtime input.
- [ ] I can implement authentication and server-side authorization.
- [ ] I can handle loading, empty, success, and error states.
- [ ] I can write meaningful unit and integration tests.
- [ ] I can debug using evidence instead of guessing.
- [ ] I can profile before optimizing.
- [ ] I can identify security boundaries.
- [ ] I can design for failure and retries.
- [ ] I can document architecture decisions.
- [ ] I can deploy and observe a real application.
- [ ] I can explain trade-offs instead of claiming one technology is always best.
- [ ] I can rebuild a project without a tutorial.
- [ ] I can teach someone else how my project works.

# THE PROJECT RULE

> **A project is complete when you can build it, test it, debug it, explain it, change it, and defend its design decisions — not merely when the demo works.**
