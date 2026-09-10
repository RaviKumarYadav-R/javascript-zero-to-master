# 21 — Testing

> A JavaScript-first guide to testing from absolute beginner to advanced: test thinking, assertions, unit/integration/end-to-end tests, mocks, spies, stubs, fixtures, async testing, DOM testing, React testing, API testing, Node.js testing, property-based thinking, coverage, debugging, test architecture, CI, performance, security, and a complete testing project.

## Learning Goal

Learn to prove behavior instead of merely checking implementation details. Build tests that are deterministic, readable, isolated where appropriate, realistic at boundaries, fast enough for development, and valuable enough to catch regressions.

## 1. What Is Software Testing?

Testing is the systematic evaluation of software behavior against expected outcomes.

## 2. Why Test?

Tests provide fast feedback about correctness, regressions, contracts, and design assumptions.

## 3. Testing Is Not Proof of Perfection

Passing tests show that tested scenarios passed; they do not prove that every possible behavior is correct.

## 4. Test Pyramid

A common model uses many fast unit tests, fewer integration tests, and a smaller number of end-to-end tests.

## 5. Testing Trophy

Another model emphasizes integration tests heavily, especially for user-visible behavior. No single diagram is universally correct.

## 6. Test Strategy

Choose test levels based on risk, boundaries, feedback speed, and maintainability rather than following a slogan mechanically.

## 7. Test Case

A test case defines inputs, setup, action, and expected behavior.

## 8. Assertion

An assertion checks that an observed value or behavior satisfies an expected condition.

## 9. Arrange-Act-Assert

```text
Arrange → Act → Assert
```

## 10. Arrange

Prepare the state and dependencies required by the scenario.

## 11. Act

Execute the behavior being tested.

## 12. Assert

Verify the observable result or interaction that matters.

## 13. Cleanup

Release resources such as timers, servers, subscriptions, database connections, and temporary files.

## 14. Test Subject

The test subject is the code whose behavior is under evaluation.

## 15. System Under Test

SUT means the system or component being tested in a particular scenario.

## 16. Expected Result

Define what correct behavior means before writing the assertion.

## 17. Observable Behavior

Prefer assertions about outputs, state transitions, user-visible behavior, or meaningful interactions.

## 18. Implementation Detail

An implementation detail is an internal mechanism that can change without changing the intended behavior.

## 19. Test Behavior, Not Internals

Tests tightly coupled to implementation details often break during harmless refactoring.

## 20. Regression

A regression occurs when previously working behavior becomes incorrect after a change.

## 21. Test Suite

A test suite is a collection of related tests.

## 22. Test Runner

A test runner discovers tests, executes them, reports results, and commonly handles lifecycle hooks.

## 23. Test Framework

A framework typically provides assertions, lifecycle APIs, mocking utilities, or other testing infrastructure.

## 24. JavaScript Test Tools

Common ecosystems include Node's built-in test runner, Vitest, Jest, Mocha, Playwright, and browser-oriented tools. Choose based on project needs and current support.

## 25. Node Built-In Test Runner

Modern Node.js provides the `node:test` module and related assertion tooling without requiring a third-party runner.

## 26. Assertion Libraries

Node provides `node:assert`; other frameworks provide their own matcher APIs.

## 27. Test File Naming

Common conventions include `*.test.js`, `*.spec.js`, or dedicated test directories.

## 28. Test Discovery

Keep naming and placement consistent so the runner can discover tests predictably.

## 29. First Test

```js
import assert from "node:assert/strict";
import test from "node:test";

test("adds numbers", () => {
  assert.equal(2 + 3, 5);
});
```

## 30. Assertion Failure

A failed assertion should clearly identify expected and actual behavior.

## 31. Test Name

Test names should describe behavior, not merely implementation steps.

## 32. Good Name

`rejects an expired access token` communicates intent better than `calls function 2`.

## 33. One Concept per Test

A test can contain multiple assertions when they collectively verify one coherent behavior.

## 34. Too Many Assertions

A test with unrelated assertions becomes difficult to diagnose when one part fails.

## 35. Test Independence

Tests should generally be able to run in any order without depending on state left by another test.

## 36. Shared Mutable State

Global mutable fixtures can create order-dependent and flaky tests.

## 37. Test Isolation

Isolation means controlling state and dependencies so one scenario does not accidentally affect another.

## 38. Determinism

A deterministic test gives the same result when the relevant code and environment have not changed.

## 39. Flaky Test

A flaky test sometimes passes and sometimes fails without an intentional code change.

## 40. Common Flaky Causes

Timing assumptions, race conditions, shared state, real network calls, random data, timezone differences, and external services are common causes.

## 41. Unit Test

A unit test evaluates a small unit with controlled dependencies and a narrow behavioral scope.

## 42. Unit Boundary

A unit is a practical testing boundary, not a universal fixed definition.

## 43. Pure Function Unit Test

Pure functions are excellent unit-test targets because inputs and outputs are explicit.

## 44. Example Pure Test

```js
const add = (a, b) => a + b;
assert.equal(add(2, 4), 6);
```

## 45. Edge Cases

Test boundaries such as zero, empty input, maximum values, missing values, and invalid values where the contract defines behavior.

## 46. Equivalence Classes

Group inputs expected to behave similarly and select representative cases from each class.

## 47. Boundary Value Analysis

Errors often occur around boundaries, so test just below, at, and just above meaningful limits.

## 48. Happy Path

The happy path is the expected successful scenario.

## 49. Failure Path

Failure-path tests verify validation, errors, retries, authorization, unavailable resources, and other expected failures.

## 50. Negative Testing

Negative tests intentionally supply invalid or unsupported inputs to verify safe behavior.

## 51. Error Testing

Verify error type, stable error code, useful message when part of the contract, and side effects as appropriate.

## 52. Throw Assertion

A test should explicitly assert when a synchronous operation is expected to throw.

## 53. Async Rejection

For Promise-based code, assert rejection rather than expecting a synchronous `try/catch` around a call that returns a Promise.

## 54. Error Cause

When code wraps errors with `cause`, tests can verify that important diagnostic relationships are preserved.

## 55. Integration Test

An integration test checks multiple components working together across a meaningful boundary.

## 56. Integration Example

A service plus a real test database repository can form an integration test boundary.

## 57. End-to-End Test

An E2E test exercises a complete user workflow through realistic application boundaries.

## 58. E2E Example

A browser test can open the application, authenticate a test user, create a note, and verify it appears in the UI.

## 59. Contract Test

A contract test verifies that two systems agree on an API or interaction contract.

## 60. API Contract

Requests, response shapes, status codes, headers, authentication behavior, and error envelopes can form an API contract.

## 61. Smoke Test

A smoke test quickly verifies that critical functionality is basically operational.

## 62. Regression Test

Add a regression test when a bug is fixed so the same failure is less likely to return.

## 63. Acceptance Test

Acceptance tests verify behavior against business or user requirements.

## 64. Exploratory Testing

Exploratory testing combines learning, test design, and execution rather than following only predefined cases.

## 65. Manual vs Automated

Automation is valuable for repeatable checks; manual exploration remains useful for usability, discovery, and scenarios difficult to encode economically.

## 66. Test Double

A test double replaces or represents a dependency during testing.

## 67. Stub

A stub supplies controlled responses to calls made by the system under test.

## 68. Spy

A spy records interactions such as calls, arguments, or invocation count.

## 69. Mock

Mock can mean a configured test double that verifies interactions; terminology varies by framework and team.

## 70. Fake

A fake is a lightweight working implementation used instead of a production dependency, such as an in-memory repository.

## 71. Dummy

A dummy is a value supplied only because an argument is required and is not meaningfully used.

## 72. Stub Example

```js
const repository = {
  findById: async () => ({ id: "1", name: "Ravi" })
};
```

## 73. Fake Repository

An in-memory repository can provide realistic CRUD behavior without requiring an external database.

## 74. Mocking Principle

Mock boundaries that are expensive, nondeterministic, unavailable, or unsafe to invoke in the current test.

## 75. Over-Mocking

Mocking every dependency can produce tests that verify wiring rather than useful behavior.

## 76. Interaction Testing

Verify an interaction when the interaction itself is part of the contract, such as sending a notification after a successful transaction.

## 77. State Testing

Prefer final state or output assertions when interaction details are not important.

## 78. Dependency Injection

Injecting dependencies makes replacement with stubs or fakes straightforward.

## 79. Hidden Dependencies

Direct imports of mutable singletons can make isolation harder, though module mocking can sometimes control them.

## 80. Clock Dependency

Inject a clock when business rules depend on current time and deterministic testing matters.

## 81. Random Dependency

Inject a random generator when reproducible randomness is needed for tests.

## 82. Network Dependency

Avoid relying on uncontrolled production APIs in ordinary automated tests.

## 83. HTTP Mocking

Intercept or replace HTTP boundaries when testing code that should not contact external systems.

## 84. Database Test Strategy

Use a test database, transaction isolation, containers, or a suitable fake depending on the behavior being verified.

## 85. Fake Database Caveat

A fake can miss database-specific behavior such as constraints, query semantics, transactions, indexes, or isolation.

## 86. Real Database Integration

Use a real compatible database for tests that need confidence in database behavior.

## 87. Fixture

A fixture is predefined data or setup used by tests.

## 88. Fixture Problem

Large shared fixtures can hide the important inputs and create coupling.

## 89. Factory

A test factory generates scenario-specific data with sensible defaults.

## 90. Builder

A builder offers fluent or structured configuration for complex test objects.

## 91. Random Test Data

Random data can reveal edge cases but should be reproducible when a failure occurs.

## 92. Seeded Randomness

A seeded generator can reproduce generated cases, provided the generator and algorithm remain compatible.

## 93. Snapshot Testing

Snapshot tests compare current serialized output against a stored representation.

## 94. Snapshot Strength

Snapshots can be useful for stable structured output but can become noisy when large and indiscriminate.

## 95. Snapshot Weakness

A snapshot passing does not guarantee meaningful behavior; reviewers must understand what changed.

## 96. Golden File

A golden file stores expected output for comparison, useful for parsers, formatters, and generated artifacts.

## 97. Test Data Privacy

Never place real secrets, production credentials, personal data, or sensitive customer data into test fixtures unnecessarily.

## 98. Secret Scanning

CI should prevent accidental test credentials and secrets from entering the repository.

## 99. Arrange Carefully

Keep setup close enough to the test that a reader can understand the scenario.

## 100. AAA Example

```js
test("calculates discount", () => {
  // Arrange
  const price = 100;
  // Act
  const result = price * 0.9;
  // Assert
  assert.equal(result, 90);
});
```

## 101. Given-When-Then

BDD-style tests often express `Given` setup, `When` action, and `Then` outcome.

## 102. Test Readability

A test should be readable as documentation of a behavior.

## 103. Domain Language

Use business vocabulary in test names and fixtures when possible.

## 104. Test Comments

Comments should explain non-obvious setup, not narrate every obvious line.

## 105. Test Duplication

Some duplication can improve test readability by keeping scenarios explicit.

## 106. DRY in Tests

Over-abstraction can make tests harder to understand than small repeated setup.

## 107. Test Helper

Extract helpers when repeated setup has stable meaning and improves clarity.

## 108. Helper Trap

A generic helper with many flags can hide the scenario and make failures difficult to understand.

## 109. Custom Matcher

A custom matcher can encode a domain assertion when repeated comparison logic is meaningful.

## 110. Assertion Precision

Prefer precise assertions over vague truthiness checks when the contract is specific.

## 111. Equality

Distinguish strict identity/equality, deep structural equality, and domain-specific equivalence.

## 112. Deep Equality

Deep equality compares nested structure rather than requiring identical object references.

## 113. Reference Equality

Two separate objects with identical properties are still different object identities.

## 114. Array Equality

Compare array contents when order/content is the behavior under test, not merely the array reference.

## 115. Floating-Point Tests

Avoid asserting exact equality for calculations where floating-point representation makes exact results inappropriate.

## 116. Approximate Equality

Use an appropriate tolerance when testing floating-point computations.

## 117. Date Tests

Control the clock/time zone assumptions when date behavior matters.

## 118. Time Zone Tests

Explicitly test important time-zone boundaries rather than relying on the machine's local zone.

## 119. Locale Tests

Formatting behavior can depend on locale, so tests should specify locale when the output contract requires it.

## 120. Async Test

```js
test("loads user", async () => {
  const user = await loadUser("1");
  assert.equal(user.id, "1");
});
```

## 121. Await the Promise

Always await or otherwise observe the Promise in an asynchronous test.

## 122. Forgotten Await

A test can incorrectly pass if an asynchronous assertion or operation is started but the test finishes before its failure is observed.

## 123. Promise Rejection

Test rejected Promises explicitly rather than relying on accidental unhandled-rejection behavior.

## 124. Async Timeout

Tests should fail within a bounded time when an asynchronous operation hangs.

## 125. Fake Timers

Fake timers can control timer-based code, but they must be used carefully with Promises and APIs that depend on real time.

## 126. Timer Cleanup

Restore fake timers after tests so later tests do not inherit altered timing behavior.

## 127. Date Mocking

If time is a dependency, prefer an injectable clock when possible rather than globally replacing time APIs everywhere.

## 128. Polling Tests

Avoid arbitrary sleeps. Prefer deterministic synchronization on a condition or event.

## 129. Race Conditions

Concurrent operations should be tested in ways that deliberately exercise ordering and cancellation risks.

## 130. Abort Testing

Verify that cancellation stops or ignores work according to the API contract.

## 131. Fetch Testing

Test both successful responses and ordinary HTTP error statuses.

## 132. Fetch Important Fact

`fetch()` does not reject merely because the server returned HTTP 404 or 500; application code should inspect `response.ok` or `response.status`.

## 133. Network Failure

A real network failure can reject a fetch Promise, unlike a normal HTTP error response.

## 134. Response Body

When testing response parsing, verify behavior when JSON is valid, invalid, empty, or has an unexpected shape.

## 135. Request Contract

Verify method, URL, headers, body, authentication, and cancellation when these are part of the client contract.

## 136. API Integration

An API integration test should verify the real request/response boundary without requiring production infrastructure.

## 137. HTTP Status

Test meaningful status categories such as success, validation failure, unauthorized, forbidden, not found, conflict, rate limit, and server failure according to the API contract.

## 138. CORS Tests

Browser CORS behavior is partly enforced by the browser, so server tests should verify emitted headers while browser E2E tests can verify actual browser behavior.

## 139. Cookie Tests

Verify security attributes and intended behavior for authentication cookies where applicable.

## 140. CSRF Tests

Test anti-CSRF protections when the application uses ambient credentials such as cookies and performs state-changing operations.

## 141. Authorization Test

Test that users can perform allowed operations and cannot perform forbidden operations.

## 142. Authentication vs Authorization

Authentication establishes identity; authorization determines permissions. Test them separately.

## 143. IDOR Test

Verify that changing an object identifier does not allow access to another user's resource.

## 144. Input Validation Test

Test boundary, malformed, missing, extra, and invalid values at trust boundaries.

## 145. Schema Test

If a schema library is used, test both accepted and rejected shapes important to the contract.

## 146. Error Envelope

API tests should verify stable error structure without exposing internal stack traces or secrets.

## 147. Database Transaction Test

Test commit behavior, rollback behavior, and partial-failure handling where transactions are part of correctness.

## 148. Unique Constraint Test

Integration tests should verify database-level uniqueness when application correctness depends on it.

## 149. Concurrency Test

Important concurrent operations should be tested against race conditions and uniqueness/locking assumptions.

## 150. Node.js Unit Testing

Keep business rules independent of filesystem, network, database, and process-global state when practical.

## 151. File System Test

Use temporary directories or controlled fixtures for filesystem integration tests.

## 152. Process Environment

Avoid leaking test environment variables across tests and restore modified process state.

## 153. Environment Configuration

Make test configuration explicit and separate from production credentials.

## 154. Process Exit

Do not let tests call process termination casually; it can hide cleanup failures and interrupt the suite.

## 155. Open Handles

Hanging servers, sockets, timers, database pools, and workers can prevent test processes from exiting.

## 156. Resource Cleanup

Close every resource created by a test or suite according to its lifecycle.

## 157. HTTP Server Testing

Start a test server on a controlled port or use an in-process request mechanism when supported by the stack.

## 158. Service Test

Service tests should focus on business behavior and use controlled repository/API dependencies where external behavior is not the subject.

## 159. Repository Test

Repository tests should verify persistence behavior, including query conditions and mapping between storage and domain representations.

## 160. Controller Test

Controller tests verify input mapping, service invocation, response mapping, and error translation at the controller boundary.

## 161. Layer Test

Do not duplicate the exact same assertion across every layer unless each layer has a distinct contract worth verifying.

## 162. DOM Testing

DOM tests should verify what users can observe and interact with rather than internal component implementation.

## 163. DOM Query

Prefer accessible queries when testing user-facing UI behavior.

## 164. Role Query

Testing-library-style tools commonly encourage querying by semantic roles and accessible names.

## 165. Label Query

Form controls should be testable through their accessible labels when the UI is correctly associated.

## 166. Text Query

Text queries can be useful, but avoid depending on incidental implementation text when a semantic query exists.

## 167. Test Accessibility

Good accessibility semantics often make UI tests more robust and closer to real user interaction.

## 168. Click Test

Verify the user-visible consequence of a click rather than only checking that an internal handler function was called.

## 169. Form Test

Test valid submission, invalid input, disabled/loading states, and server-side failure handling where relevant.

## 170. Keyboard Test

Test keyboard interaction for controls that must support keyboard users.

## 171. Focus Test

Important dialogs, menus, and form flows should have tests for expected focus behavior.

## 172. Async UI Test

Wait for observable UI changes rather than inserting arbitrary delays.

## 173. Loading State

Test that asynchronous UI shows an appropriate loading state when required.

## 174. Empty State

Test empty data separately from error state.

## 175. Error State

Test visible error behavior and recovery actions.

## 176. Optimistic UI

Test both successful confirmation and rollback/recovery when optimistic updates are used.

## 177. React Testing

React tests should focus on rendered behavior, state transitions, interactions, and integration with important dependencies.

## 178. React Render

A test should not assume every render is an implementation detail worth asserting.

## 179. React State

Test state through observable output or interaction rather than directly inspecting private component state.

## 180. React Context

Test consumers through the provider configuration relevant to the behavior.

## 181. React Hook Testing

Test custom hooks through their observable behavior and the component/context environment they require.

## 182. React Router

Test route behavior at an integration level when navigation is part of the feature.

## 183. Redux Testing

Reducers can be unit tested as state-transition functions; connected UI should also receive integration-level coverage.

## 184. Zustand Testing

Test store behavior through public APIs and observable state, resetting state between scenarios.

## 185. Component Mocking

Mock child components only when their complexity or boundary makes the test more focused; do not mock everything by default.

## 186. Network Mocking in UI

Intercept API requests so UI tests can deterministically exercise success and failure states.

## 187. Browser E2E

Playwright and similar tools can exercise a real browser against the application.

## 188. E2E User Flow

```text
Open app
 ↓
Login
 ↓
Create note
 ↓
Save
 ↓
Refresh
 ↓
Verify note
```

## 189. E2E Scope

Keep E2E tests focused on high-value critical workflows because they are usually slower and more operationally complex.

## 190. E2E Isolation

Use dedicated test users/data and reliable cleanup strategies.

## 191. E2E Parallelism

Parallel E2E tests require independent data and careful resource management.

## 192. Browser Context

Isolated browser contexts can provide separate cookies/storage for independent scenarios.

## 193. Selector Stability

Prefer semantic/accessibility selectors over brittle CSS chains or generated class names.

## 194. Test IDs

Stable test IDs can be useful when no meaningful semantic selector exists.

## 195. Screenshot Testing

Visual regression testing compares rendered images and can catch styling changes that behavioral tests miss.

## 196. Visual Test Noise

Fonts, rendering engines, device scale, animation, and environment differences can create false visual diffs.

## 197. Disable Animation

For deterministic visual tests, reduce or disable nonessential animations.

## 198. Responsive Testing

Test important layouts at representative viewport sizes rather than assuming desktop behavior covers mobile.

## 199. Network Conditions

E2E tests can simulate slower network conditions to exercise loading and failure behavior.

## 200. Accessibility Automation

Automated accessibility checks can catch many issues but cannot replace manual accessibility evaluation.

## 201. Unit Test Coverage

Coverage measures which code or branches were exercised by tests; it is a signal, not a correctness score.

## 202. Statement Coverage

Measures executed statements.

## 203. Branch Coverage

Measures exercised decision branches.

## 204. Function Coverage

Measures functions invoked during tests.

## 205. Line Coverage

Measures executed source lines, depending on tooling and source-map behavior.

## 206. Coverage Thresholds

Thresholds can protect against large regressions but should not encourage meaningless tests solely to increase percentages.

## 207. 100% Coverage

100% coverage does not guarantee correct requirements, good assertions, or absence of bugs.

## 208. Mutation Testing

Mutation testing changes code artificially and checks whether tests detect the introduced defects.

## 209. Mutation Score

A high mutation score can indicate stronger assertions, but mutation testing costs additional computation.

## 210. Property-Based Testing

Property-based testing generates many inputs and checks general invariants or laws.

## 211. Example Property

For supported numeric inputs, `sortAscending` should return values in nondecreasing order.

## 212. Property Test Benefit

Generated cases can expose combinations humans did not think to write manually.

## 213. Property Test Shrinking

Good property-testing libraries attempt to reduce a failing generated case to a smaller reproducible counterexample.

## 214. Fuzz Testing

Fuzzing supplies unexpected or malformed inputs to discover crashes, hangs, security issues, and edge cases.

## 215. Parser Testing

Parsers are strong fuzz targets because their input space can be large and adversarial.

## 216. Invariant Testing

Define conditions that must remain true across many operations, such as collection size or state-machine validity.

## 217. Metamorphic Testing

When exact expected output is difficult to specify, test relationships between multiple related executions.

## 218. Example Metamorphic Relation

If an operation is permutation-invariant, reordering the input should not change the resulting aggregate.

## 219. Differential Testing

Compare two independent implementations or a new implementation against a trusted reference for the same inputs.

## 220. Golden Master

Capture known behavior before refactoring and compare outputs to detect unintended changes.

## 221. Test Doubles and TypeScript

Type definitions can improve test-double contracts, but runtime behavior still needs testing.

## 222. `unknown` in Errors

TypeScript catch values should be treated as unknown and narrowed before accessing custom properties.

## 223. Runtime Types

TypeScript types disappear at runtime, so external input still requires runtime validation when safety depends on it.

## 224. Generic Test Helper

A generic helper should preserve useful type information without hiding scenario meaning.

## 225. Compile-Time vs Runtime Testing

Type checking and tests provide different guarantees and should complement one another.

## 226. Type-Level Tests

Libraries and projects can test type relationships separately from runtime behavior when TypeScript API compatibility matters.

## 227. Contract Compatibility

Tests should detect breaking changes to exported function behavior, HTTP contracts, schemas, and important module interfaces.

## 228. Module Boundary

Test public module behavior rather than private helper implementation unless the helper itself is a meaningful unit.

## 229. Test Architecture

Organize tests around domain boundaries and behavior, not only source-file mirrors.

## 230. Colocation

Colocating tests with implementation can improve discoverability for component/unit tests.

## 231. Dedicated Integration Folder

Integration tests often benefit from separate organization because they have different setup and runtime requirements.

## 232. E2E Folder

Keep browser E2E tests and their fixtures/configuration distinct from fast unit tests.

## 233. Test Tags

Tags or naming conventions can separate smoke, integration, E2E, slow, or database-dependent suites.

## 234. Fast Feedback

Run the fastest relevant tests during development before the full suite.

## 235. Watch Mode

Watch mode reruns affected tests as files change and can shorten the feedback loop.

## 236. Test Selection

Targeted test execution is useful during debugging, but always run broader suites before merging.

## 237. Full Suite

The full suite is the final automated safety net for the repository's supported behavior.

## 238. CI Testing

Continuous integration should run automated checks on every meaningful change.

## 239. CI Stages

```text
Install
 ↓
Lint/type-check
 ↓
Unit tests
 ↓
Integration tests
 ↓
Build
 ↓
E2E/smoke
```

## 240. Test Environment

CI should use deterministic configuration and isolated credentials/resources.

## 241. Parallel CI

Independent test jobs can run concurrently to reduce total feedback time.

## 242. Sharding

Large suites can be divided across workers or machines when the tooling supports reliable distribution.

## 243. Test Artifacts

CI can preserve screenshots, traces, logs, coverage, and reports for failed runs.

## 244. Failure Diagnostics

A failed test should provide enough context to reproduce the failure without rerunning blindly.

## 245. Test Retries

Retries can hide flaky tests if used indiscriminately. Use them as a diagnostic or carefully bounded mitigation, not as proof that a test is healthy.

## 246. Flake Tracking

Track recurring flaky tests and fix their underlying nondeterminism.

## 247. Quarantining

Temporarily isolating a flaky test may protect CI, but it should have an owner and a removal plan.

## 248. Test Debt

Untested critical behavior and unreliable tests both create testing debt.

## 249. Test Maintenance

Delete obsolete tests, update changed contracts, simplify brittle fixtures, and preserve valuable coverage.

## 250. Refactoring Safety

A strong behavioral test suite allows implementation changes while protecting externally important behavior.

## 251. Testing Legacy Code

Start with characterization tests that capture important existing behavior before making risky changes.

## 252. Characterization Test

A characterization test records what the system currently does; it does not automatically prove that the current behavior is desirable.

## 253. Legacy Seams

Introduce seams around difficult dependencies so behavior can be tested without rewriting everything first.

## 254. Approval Testing

Approval-style workflows compare generated output with reviewed expected output and can be useful for complex serialized results.

## 255. Parser Regression

Keep representative malformed and valid examples when maintaining parsers.

## 256. Security Testing

Security tests should target authorization, input validation, injection resistance, session behavior, and sensitive-data handling according to the threat model.

## 257. XSS Test

Verify that untrusted input is rendered as text or safely sanitized rather than interpreted as executable markup.

## 258. Injection Test

Use malicious-looking inputs to verify parameterization and validation at database, shell, template, or command boundaries.

## 259. Authentication Test

Test missing, invalid, expired, revoked, and valid credentials as applicable.

## 260. Authorization Matrix

Test each important role against each protected operation rather than checking only one happy-path role.

## 261. Rate-Limit Test

Verify rate-limit behavior without making tests depend on real production limits.

## 262. Secret Leakage Test

Ensure logs and error responses do not expose tokens, passwords, private keys, or internal sensitive data.

## 263. Dependency Vulnerability

Dependency scanners complement tests; tests cannot detect every vulnerable dependency.

## 264. Performance Test

Performance tests evaluate latency, throughput, memory, CPU, or rendering behavior under defined workloads.

## 265. Benchmark

A benchmark measures a controlled operation under a specified environment and workload.

## 266. Benchmark Warm-Up

JIT compilation and runtime optimization can affect early measurements, so benchmark methodology should account for warm-up.

## 267. Measurement Noise

System load, garbage collection, CPU frequency, scheduling, and background activity can affect timing.

## 268. Statistical Thinking

Compare distributions or repeated measurements rather than trusting a single timing number.

## 269. Regression Budget

Define acceptable performance limits for important operations or user-facing metrics.

## 270. Load Testing

Load tests examine behavior under expected traffic or concurrency.

## 271. Stress Testing

Stress testing pushes beyond normal load to identify limits and failure behavior.

## 272. Soak Testing

Soak tests run for long periods to expose memory leaks, resource leaks, or gradual degradation.

## 273. Memory Leak Test

Repeatedly perform an operation and observe memory/resource behavior over time rather than assuming a single snapshot proves a leak.

## 274. Accessibility Testing

Combine automated checks, semantic assertions, keyboard testing, screen-reader evaluation, and manual review as appropriate.

## 275. Usability Testing

Automated tests cannot fully determine whether an interface is understandable or pleasant to use.

## 276. Test Review

Review tests as production code: clarity, correctness, isolation, diagnostics, and maintenance cost matter.

## 277. Test Smell: Brittle

A brittle test fails for irrelevant implementation changes.

## 278. Test Smell: Slow

A slow test reduces feedback and can discourage frequent execution.

## 279. Test Smell: Flaky

A flaky test weakens trust in the suite.

## 280. Test Smell: Overspecified

An overspecified test asserts details that are not part of the behavior contract.

## 281. Test Smell: Giant Setup

Huge setup blocks often indicate unclear boundaries or excessive coupling.

## 282. Test Smell: Mystery Guest

Hidden fixture data makes it difficult to understand why a scenario behaves as it does.

## 283. Test Smell: Test Interdependence

Tests that require another test to run first are dangerous and difficult to parallelize.

## 284. Test Smell: Mock Explosion

Too many mocks can make tests describe implementation wiring rather than behavior.

## 285. Test Smell: Assertion Roulette

Many unrelated assertions make it difficult to identify the cause of failure.

## 286. Test Smell: Copy-Paste

Repeated test code can drift and create inconsistent scenarios; extract only meaningful shared abstractions.

## 287. Test Smell: Conditional Test

Complex branching inside tests can make the expected behavior ambiguous.

## 288. Test Smell: Sleep

Arbitrary sleeps are usually a sign that synchronization should be based on a deterministic condition or event.

## 289. Debugging Failed Tests

Read the first meaningful failure, inspect actual/expected values, identify the boundary, and reproduce with the smallest relevant test.

## 290. Debugging Flakes

Run the test repeatedly, randomize order if supported, inspect timers/network/parallelism/shared state, and remove nondeterminism.

## 291. Debugging Async

Check missing awaits, unresolved Promises, leaked handles, incorrect fake-timer assumptions, and race conditions.

## 292. Debugging Mocks

Verify that the mock matches the real dependency contract and that the test is not asserting an accidental call sequence.

## 293. Debugging E2E

Use browser traces, screenshots, console logs, network records, and video where supported by the test tool.

## 294. Minimal Reproduction

Reduce a failing scenario to the smallest reproducible test before changing production code.

## 295. Test-Driven Development

TDD commonly cycles through failing test, minimal implementation, and refactoring.

## 296. Red

Write a test that expresses the desired behavior and fails for the right reason.

## 297. Green

Implement the smallest correct behavior that makes the test pass.

## 298. Refactor

Improve design while keeping the tests passing.

## 299. TDD Is Not Mandatory

TDD is one development workflow, not a requirement for every task or developer.

## 300. Outside-In TDD

Start from a user-facing behavior and drive lower-level implementation through integration boundaries.

## 301. Inside-Out TDD

Build lower-level units first and then integrate them into larger behavior.

## 302. Test-First Design Benefit

Writing tests early can expose awkward APIs, hidden dependencies, and unclear responsibilities.

## 303. Testability

Testability is influenced by dependency boundaries, determinism, observability, and complexity.

## 304. Pure Core

A pure domain core is often highly testable because it needs little infrastructure.

## 305. Effect Shell

Test the effect shell with focused integration tests around actual boundaries.

## 306. Functional Core Testing

```text
Input → pure domain logic → expected result
```

This is usually fast and deterministic.

## 307. Integration Boundary Testing

```text
Application → repository/API → controlled infrastructure
```

This verifies collaboration and real boundary behavior.

## 308. E2E Boundary Testing

```text
Browser → application → API → database
```

Use selectively for critical workflows.

## 309. Contract-Driven Development

Define important external behavior before implementation changes so tests can protect compatibility.

## 310. Consumer Contract

A consumer contract describes what a client depends on from a provider.

## 311. Provider Contract

A provider contract describes what a service promises to consumers.

## 312. Contract Failure

Breaking a response field, status code, or error structure can be a contract failure even when internal unit tests pass.

## 313. Schema Evolution

Test backward/forward compatibility when clients and servers deploy independently.

## 314. Database Migration Tests

Verify important migrations against realistic schema versions and rollback/forward assumptions where supported.

## 315. Seed Data

Keep database seed data minimal, deterministic, and representative.

## 316. Test Transactions

Transactions can isolate database tests, but transaction behavior differs across database engines and test architecture.

## 317. Parallel Database Tests

Parallel tests need isolated schemas, databases, transactions, or uniquely namespaced data to avoid collisions.

## 318. Cleanup Strategy

Choose deletion, truncation, rollback, disposable database, or isolated schema according to the test environment.

## 319. Browser Storage Tests

Clear or isolate localStorage, sessionStorage, IndexedDB, cookies, and service-worker state between scenarios where necessary.

## 320. Service Worker Tests

Service-worker behavior often needs specialized lifecycle/control testing and should not be assumed equivalent to ordinary page JavaScript.

## 321. WebSocket Tests

Test connection, message, close, error, reconnection, and cancellation behavior with a controlled server.

## 322. SSE Tests

Test event parsing, reconnect behavior, close handling, and server error scenarios where the application depends on them.

## 323. Worker Tests

Test worker logic independently and test message boundaries separately.

## 324. File Upload Tests

Test file type/size validation, successful upload, cancellation, retry behavior, and server rejection as appropriate.

## 325. Time-Dependent Tests

Avoid relying on wall-clock passage. Control time or inject a clock where practical.

## 326. Randomized Tests

Make failures reproducible by recording seeds or generated inputs.

## 327. Locale-Dependent Tests

Set locale explicitly for deterministic formatting tests.

## 328. Environment-Dependent Tests

Do not silently assume a developer's OS, timezone, filesystem path, or browser version.

## 329. Cross-Browser Tests

Run critical browser behavior across supported engines rather than assuming one engine represents all browsers.

## 330. Compatibility Matrix

Document which environments are supported and test the highest-risk differences.

## 331. Polyfill Tests

Verify feature detection and fallback behavior when supporting older environments.

## 332. Feature Detection

Tests should verify behavior under both supported feature-present and fallback conditions when the application provides both.

## 333. Test Accessibility Tree

Semantic roles and names provide a useful user-facing testing surface for accessible interfaces.

## 334. Focus Regression

Add regression tests for important focus traps, dialog restoration, and keyboard navigation bugs.

## 335. Performance Regression

Use stable benchmarks or production metrics for performance regressions rather than fragile microbenchmarks alone.

## 336. Core Web Vitals Testing

For web applications, monitor LCP, INP, and CLS as user-facing performance signals; lab tests complement real-user data.

## 337. Visual Regression

Use visual tests for high-value stable layouts and components where appearance is part of the contract.

## 338. Test Documentation

Document how to run unit, integration, E2E, database, and specialized suites.

## 339. Test Command Design

Provide clear commands such as `test`, `test:watch`, `test:unit`, `test:integration`, and `test:e2e` when the project benefits from them.

## 340. CI Cache

Dependency caching can reduce CI duration but should never compromise reproducibility.

## 341. Reproducible Builds

Pin or lock dependencies appropriately and keep test environments explicit.

## 342. Test Reports

Use machine-readable and human-readable reports where CI tooling requires them.

## 343. Coverage Reports

Review coverage trends and uncovered critical paths rather than focusing only on one percentage.

## 344. Risk-Based Testing

Prioritize testing by impact × likelihood × uncertainty.

## 345. Critical Path

Authentication, payments, authorization, data integrity, and destructive operations usually deserve stronger coverage.

## 346. Cheap Tests

Fast deterministic tests are valuable because developers can run them frequently.

## 347. Expensive Tests

Slow environment-dependent tests should be targeted at boundaries where they provide unique confidence.

## 348. Confidence Model

Ask: what failure would this test catch, and what failure would it miss?

## 349. Testing Trade-Off

More tests are not automatically better. Optimize for useful confidence, maintainability, speed, and risk reduction.

## 350. Mini Challenge: Calculator

Test add, subtract, multiply, divide, zero, negative numbers, and division-by-zero behavior.

## 351. Mini Challenge: String Utilities

Test trimming, capitalization, slugification, empty strings, Unicode examples, and invalid input contracts.

## 352. Mini Challenge: Array Utilities

Test mapping, filtering, grouping, sorting, duplicates, empty arrays, and immutability guarantees.

## 353. Mini Challenge: Validation

Build validation tests for required fields, length limits, formats, and multiple simultaneous errors.

## 354. Mini Challenge: Password Rules

Test boundary lengths and invalid character combinations according to a clearly defined policy.

## 355. Mini Challenge: Date Rules

Test expiry, future/past boundaries, leap-day behavior, and explicit timezone assumptions.

## 356. Mini Challenge: Reducer

Test every action, unknown actions, initial state, and state immutability.

## 357. Mini Challenge: State Machine

Test every valid transition and invalid transition for a login workflow.

## 358. Mini Challenge: Result Type

Test success mapping, failure mapping, error propagation, and default extraction.

## 359. Mini Challenge: Memoization

Test cache hits, cache misses, correct keys, and bounded eviction.

## 360. Mini Challenge: Async Service

Test success, validation failure, dependency failure, timeout, and cancellation.

## 361. Mini Challenge: API Client

Test request method, URL, headers, JSON parsing, HTTP errors, malformed responses, and network failures.

## 362. Mini Challenge: Express Controller

Test request validation, service result mapping, authentication, authorization, and error response shape.

## 363. Mini Challenge: Repository

Test CRUD operations, missing records, duplicate constraints, and mapping behavior against a real test database.

## 364. Mini Challenge: React Form

Test rendering, validation, submission, loading, success, server error, and keyboard interaction.

## 365. Mini Challenge: React List

Test loading, empty, success, error, filtering, selection, and deletion behavior.

## 366. Mini Challenge: E2E Login

Automate a complete login flow using a dedicated test account and verify protected navigation.

## 367. Mini Challenge: E2E Notes

Create, edit, archive, trash, restore, and delete a note through the UI.

## 368. Mini Challenge: Regression

Take five bugs from previous projects and create regression tests before fixing or refactoring them.

## 369. Mini Project: Tested Quiz Engine

Build a pure quiz engine with question validation, answer evaluation, scoring, progress, and result calculation. Achieve strong unit coverage and property-style tests.

## 370. Mini Project: Tested Expense Tracker

Test pure calculations, reducer transitions, persistence integration, API errors, and critical UI workflows.

## 371. Intermediate Project: Tested Notes API

Build a Node/Express Notes API with validation, authentication, authorization, repository integration, structured errors, and automated unit/integration/contract tests.

## 372. Intermediate Project: Tested React Notes UI

Build a React Notes UI with semantic queries, mocked network boundaries, loading/error/empty states, keyboard behavior, and route tests.

## 373. Advanced Project: Full-Stack Test System

Combine unit, integration, API contract, database, browser E2E, accessibility, visual regression, and performance checks for a realistic Notes application.

## 374. Advanced Project: CI Quality Gate

Create a CI pipeline that runs formatting/linting, type checking, unit tests, integration tests, build verification, smoke E2E tests, and produces useful failure artifacts.

## 375. Advanced Project: Mutation Testing

Run mutation testing against a core domain module and improve weak assertions revealed by surviving mutants.

## 376. Advanced Project: Property Testing

Use generated inputs to verify invariants for your collection utilities, reducers, parser, or business rules.

## 377. Advanced Project: Flake Laboratory

Intentionally create flaky timing/shared-state tests, diagnose them, and refactor them into deterministic tests.

## 378. Interview: What Is Testing?

Testing evaluates software behavior against expectations. It increases confidence but cannot prove absence of all defects.

## 379. Interview: Unit vs Integration

Unit tests focus on a narrow component with controlled dependencies; integration tests verify meaningful collaboration across boundaries.

## 380. Interview: E2E

E2E tests exercise complete user workflows through realistic system boundaries.

## 381. Interview: Mock vs Stub

A stub supplies controlled responses; a mock commonly verifies configured interactions. Terminology varies by ecosystem.

## 382. Interview: Fake

A fake is a lightweight working substitute, such as an in-memory repository.

## 383. Interview: Flaky Test

A flaky test has nondeterministic outcomes without an intended code change and should be investigated rather than simply retried forever.

## 384. Interview: Coverage

Coverage measures exercised code structures; it does not measure whether assertions are meaningful or requirements are complete.

## 385. Interview: 100% Coverage

100% coverage does not guarantee correctness, because tests can execute code without asserting meaningful behavior.

## 386. Interview: TDD

TDD cycles through failing test, minimal implementation, and refactoring.

## 387. Interview: Testing Async Code

Await asynchronous work and explicitly assert fulfillment/rejection. Avoid arbitrary sleeps.

## 388. Interview: Fetch Errors

Fetch normally resolves for HTTP 4xx/5xx responses; check `response.ok` or status, while network failures can reject.

## 389. Interview: Test Isolation

Tests should not depend on order or mutable state left by other tests.

## 390. Interview: Test Pyramid

It is a heuristic for balancing fast lower-level tests with slower broader tests, not a rigid law.

## 391. Interview: Mock Everything?

No. Mock boundaries when useful; excessive mocking can create brittle tests coupled to implementation.

## 392. Interview: E2E Quantity

Use E2E tests for critical workflows because they provide strong confidence but usually cost more time and maintenance.

## 393. Interview: Property-Based Testing

It verifies general properties over many generated inputs rather than only hand-written examples.

## 394. Interview: Mutation Testing

It introduces artificial defects and checks whether the test suite detects them.

## 395. Interview: Testability

Good testability comes from explicit dependencies, deterministic logic, meaningful boundaries, and observable behavior.

## 396. Teach-Back: Assertions

Explain assertions, expected/actual values, equality, deep equality, errors, floating-point tolerances, and domain-specific assertions.

## 397. Teach-Back: Test Levels

Explain unit, integration, contract, E2E, smoke, regression, exploratory, and acceptance testing with practical examples.

## 398. Teach-Back: Test Doubles

Explain dummy, stub, spy, mock, fake, their differences, and when each is appropriate.

## 399. Teach-Back: Async

Explain Promises, rejection assertions, missing awaits, timers, cancellation, races, and deterministic synchronization.

## 400. Teach-Back: UI

Explain behavior-focused DOM/React testing, semantic selectors, accessibility, loading/error/empty states, and E2E workflows.

## 401. Teach-Back: Coverage

Explain line/statement/function/branch coverage and why high coverage does not equal high-quality tests.

## 402. Teach-Back: Flakiness

Explain common causes of flaky tests and how to replace timing guesses with deterministic synchronization.

## 403. Teach-Back: TDD

Explain Red-Green-Refactor and when TDD is useful or unnecessary.

## 404. Teach-Back: CI

Explain how tests fit into a CI quality gate and how artifacts help diagnose failures.

## 405. Mastery: Fundamentals

- [ ] I can write an assertion-based test.
- [ ] I understand Arrange-Act-Assert.
- [ ] I can identify expected behavior.
- [ ] I understand deterministic testing.

## 406. Mastery: Unit Testing

- [ ] I can test pure functions.
- [ ] I can test edge cases.
- [ ] I can test thrown errors and rejected Promises.
- [ ] I can avoid hidden shared state.

## 407. Mastery: Test Doubles

- [ ] I understand dummy/stub/spy/mock/fake.
- [ ] I know when not to mock.
- [ ] I can inject dependencies.

## 408. Mastery: Integration

- [ ] I can test repository behavior.
- [ ] I can test API boundaries.
- [ ] I can test authentication/authorization.
- [ ] I can isolate external infrastructure safely.

## 409. Mastery: UI

- [ ] I can test DOM behavior.
- [ ] I can use semantic selectors.
- [ ] I can test loading/error/empty states.
- [ ] I can write critical E2E flows.

## 410. Mastery: Advanced Testing

- [ ] I understand property-based testing.
- [ ] I understand mutation testing.
- [ ] I can diagnose flaky tests.
- [ ] I can reason about performance testing.

## 411. Mastery: CI

- [ ] I can build a test pipeline.
- [ ] I can collect coverage.
- [ ] I can preserve failure artifacts.
- [ ] I can run suites selectively and fully.

## 412. Mastery: Test Architecture

- [ ] I can choose appropriate test levels.
- [ ] I can avoid overspecified tests.
- [ ] I can separate functional core from effectful shell.
- [ ] I can prioritize by risk.

## 413. Final Testing Mental Model

```text
Requirement
   ↓
Observable behavior
   ↓
Test scenario
   ↓
Arrange
   ↓
Act
   ↓
Assert
   ↓
Fast feedback
   ↓
Regression protection
```

## 414. Final Testing Strategy

```text
Pure rules → unit tests
Collaborations → integration tests
External contracts → contract tests
Critical user journeys → E2E tests
Quality risks → security/performance/accessibility tests
```

## 415. Final Testing Challenge

Build a **production-style tested Notes application** using the concepts from this chapter.

Requirements:

1. Define test strategy before implementation.
2. Test pure domain rules extensively.
3. Test immutable reducers/state transitions.
4. Test validation boundaries.
5. Test authentication behavior.
6. Test authorization for every important role/resource combination.
7. Test ownership/IDOR protections.
8. Test repository behavior against a real compatible test database.
9. Test transactions where required.
10. Test API request/response contracts.
11. Test HTTP success and error statuses.
12. Test network failures separately from HTTP errors.
13. Test structured error responses without sensitive details.
14. Test React UI through user-visible behavior.
15. Use semantic/accessibility queries.
16. Test keyboard interactions.
17. Test loading, empty, success, and error states.
18. Test optimistic update rollback if implemented.
19. Test route protection.
20. Write critical browser E2E workflows.
21. Use isolated test users/data.
22. Avoid arbitrary sleeps.
23. Control time for expiry-related tests.
24. Make random failures reproducible.
25. Test cancellation and race conditions where applicable.
26. Add coverage reporting.
27. Identify untested critical paths rather than chasing 100% coverage blindly.
28. Add at least one property-based test suite.
29. Add at least one mutation-testing exercise.
30. Add accessibility checks.
31. Add one visual regression workflow if useful.
32. Add performance smoke/benchmark checks for a meaningful hot path.
33. Run the full suite in CI.
34. Preserve screenshots/traces/logs for E2E failures.
35. Track flaky tests and fix root causes.
36. Separate fast tests from slow tests.
37. Document every test command.
38. Review tests for behavior focus and implementation coupling.
39. Delete tests that protect obsolete behavior.
40. Explain what each test layer catches and what it cannot catch.

**Mastery standard:** You are not finished when you know how to write `expect(...).toBe(...)`. You are finished when you can design a **risk-based testing strategy, write deterministic unit tests, verify real integrations, protect API/UI contracts, diagnose flaky failures, test asynchronous behavior, use test doubles intelligently, measure meaningful coverage, automate quality in CI, and explain why every test exists.**