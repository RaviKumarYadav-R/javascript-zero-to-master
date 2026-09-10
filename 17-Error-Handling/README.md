# 17 — Error Handling

> A deep JavaScript guide to failures, exceptions, `Error`, `throw`, `try/catch/finally`, async errors, Promise rejection, Fetch failures, custom errors, validation, debugging, recovery, logging, observability, security, testing, architecture, and production-grade error handling.

## Learning Goal

By the end of this chapter, you should be able to distinguish different classes of failure, detect them correctly, recover when recovery is meaningful, propagate failures when recovery is impossible, and design error handling that is useful without hiding bugs or leaking sensitive information.

## 1. What Is Error Handling?

Error handling is the practice of detecting, communicating, recovering from, logging, and testing failures in software.

## 2. Why Errors Exist

Programs interact with invalid input, missing resources, network failures, unexpected states, dependencies, users, operating systems, and external services. Failures are unavoidable.

## 3. Error Handling Is Not Error Prevention

Validation, types, tests, and defensive design reduce failures. Error handling deals with failures that still occur.

## 4. Mental Model

```text
Operation
   ↓
Success ─────────→ continue
   │
   └── Failure
         ↓
   Detect → classify → recover OR propagate
                    ↓
                 observe
                    ↓
                 improve
```

## 5. Failure vs Bug

A failure is an observable unsuccessful outcome. A bug is an implementation defect that may cause failures.

## 6. Expected Failure

Invalid user input, an unavailable API, or a missing optional resource may be expected operational failures.

## 7. Unexpected Failure

An impossible state, programmer mistake, or violated invariant may indicate a bug that should not simply be swallowed.

## 8. Recoverable Error

A recoverable error has a meaningful alternative such as retrying, asking for corrected input, using cached data, or showing a fallback.

## 9. Non-Recoverable Error

If the current operation cannot safely continue, propagate the error or terminate the affected operation rather than pretending it succeeded.

## 10. Error Taxonomy

A useful classification can include validation, authentication, authorization, network, dependency, conflict, timeout, cancellation, parsing, configuration, programming, and system failures.

## 11. JavaScript Error Objects

JavaScript provides the `Error` object and specialized built-in error types.

## 12. Basic Error

```js
const error = new Error("Something went wrong");
console.log(error.message);
```

## 13. Error Message

`message` describes the failure. It should be useful to developers and should not accidentally contain secrets.

## 14. Error Name

`name` identifies the general error category and defaults to `Error` for a normal Error instance.

## 15. Error Stack

`stack` commonly contains diagnostic information about where an error was created or propagated. Its exact formatting is implementation-dependent.

## 16. Throw

`throw` abruptly transfers control to an applicable exception handler.

## 17. Throw Example

```js
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}
```

## 18. Throw an Error Object

Prefer throwing `Error` instances or subclasses rather than arbitrary primitive values.

## 19. Bad Throw

```js
throw "Something failed";
```

This loses the standard Error structure and stack behavior expected by many tools.

## 20. Better Throw

```js
throw new Error("Something failed");
```

## 21. Throw Is Synchronous Control Flow

Throwing an exception immediately interrupts the current synchronous execution path until a handler is found.

## 22. Catch

`catch` receives a thrown exception when control reaches the corresponding `try` statement.

## 23. Try/Catch

```js
try {
  riskyOperation();
} catch (error) {
  console.error(error);
}
```

## 24. Finally

`finally` runs after the `try`/`catch` processing regardless of whether an exception occurred, subject to control-flow interruptions such as process termination.

## 25. Finally Example

```js
try {
  openResource();
} finally {
  closeResource();
}
```

## 26. Why Finally Matters

Use `finally` for cleanup that must occur whether an operation succeeds or fails.

## 27. Try/Catch Mental Model

```text
try
 ↓
operation
 ├─ success → finally → continue
 └─ throw → catch → finally → continue/throw
```

## 28. Catch Parameter

The catch parameter receives the thrown value. In modern JavaScript, optional catch binding allows omitting it when unused.

## 29. Optional Catch Binding

```js
try {
  doSomething();
} catch {
  showFallback();
}
```

## 30. Catch Only What You Can Handle

A catch block should add meaningful recovery, translation, logging, or context. Catching everything merely to hide failures is harmful.

## 31. Swallowing Errors

```js
try {
  saveData();
} catch {
  // nothing
}
```

This can make production failures invisible.

## 32. Better Error Handling

```js
try {
  saveData();
} catch (error) {
  report(error);
  throw error;
}
```

## 33. Rethrow

A catch block can rethrow an error when the current layer cannot recover.

## 34. Error Propagation

```text
low-level function
       ↓ throw
service layer
       ↓ throw
request handler
       ↓ translate
user-facing response
```

## 35. Error Boundary Concept

An error boundary is a layer that catches failures at an appropriate scope and converts them into controlled behavior.

## 36. Error Scope

Handle an error at the narrowest layer that has enough information to recover safely.

## 37. Do Not Catch Too Early

Catching an error in a low-level utility just to display a UI message mixes responsibilities.

## 38. Do Not Catch Too Late

Allowing errors to reach a global handler without useful context can make diagnosis difficult.

## 39. Built-in Error Types

Important built-in types include `Error`, `TypeError`, `RangeError`, `ReferenceError`, `SyntaxError`, `URIError`, `EvalError`, and `AggregateError`.

## 40. TypeError

A `TypeError` commonly occurs when an operation is performed on a value of an inappropriate type.

## 41. TypeError Example

```js
null.toString();
```

This attempts to access a property on `null` and results in a TypeError.

## 42. ReferenceError

A `ReferenceError` commonly occurs when code attempts to access an identifier that cannot be resolved.

## 43. ReferenceError Example

```js
console.log(notDeclared);
```

## 44. SyntaxError

A `SyntaxError` indicates invalid JavaScript syntax during parsing or compilation of the relevant code.

## 45. RangeError

A `RangeError` indicates a value is outside an allowed range for an operation.

## 46. URIError

A `URIError` can occur when URI encoding/decoding functions receive malformed input.

## 47. AggregateError

`AggregateError` represents multiple errors together and is useful with operations that can produce several failures.

## 48. Promise.any and AggregateError

`Promise.any()` rejects with an `AggregateError` when all supplied Promises reject.

## 49. Error instanceof

```js
if (error instanceof TypeError) {
  // handle type-related failure
}
```

Use it carefully across realms and package boundaries where prototype identity may differ.

## 50. Error Name Check

Checking `error.name` can be useful but is generally less structurally strong than using a known error class or stable application error code.

## 51. Error Cause

Modern JavaScript supports the `cause` option for preserving the underlying reason when wrapping an error.

## 52. Cause Example

```js
try {
  await loadUser();
} catch (error) {
  throw new Error("Unable to load profile", { cause: error });
}
```

## 53. Why Cause Matters

It preserves diagnostic context without forcing callers to parse message strings.

## 54. Custom Error Class

```js
class ValidationError extends Error {
  constructor(message, details) {
    super(message);
    this.name = "ValidationError";
    this.details = details;
  }
}
```

## 55. Custom Error Purpose

Custom errors represent meaningful application-level categories that callers can handle differently.

## 56. Error Codes

Stable machine-readable error codes are often better than parsing human-readable messages.

## 57. Error Code Example

```js
const error = new Error("Email already exists");
error.code = "EMAIL_EXISTS";
```

For larger systems, use a dedicated custom error class or structured object consistently.

## 58. Message Is for Humans

Do not make application logic depend on exact error message text when a stable code/type can express the condition.

## 59. Error Details

Validation errors can contain structured field information, but avoid putting sensitive data into error objects that may be logged or exposed.

## 60. Validation Error

A validation error means input violates an expected schema or business rule.

## 61. Authentication Error

An authentication failure means the system cannot establish a valid identity for the operation.

## 62. Authorization Error

An authorization failure means the identity is known or established but lacks permission for the operation.

## 63. Not Found Error

A resource may be missing, deleted, or intentionally undisclosed according to application security policy.

## 64. Conflict Error

A conflict indicates that an operation cannot safely apply because the resource state conflicts with the request.

## 65. Rate Limit Error

A rate-limit failure means the caller must slow down or wait before trying again.

## 66. Timeout Error

A timeout means an operation exceeded an application-defined or system-defined time limit.

## 67. Cancellation Error

Cancellation means the operation was intentionally stopped because its result is no longer needed or the user/system requested cancellation.

## 68. Error vs Cancellation

Cancellation is often not a “bug.” Treat it separately from unexpected failure so normal user actions do not become noisy errors.

## 69. Result vs Exception

Some APIs model expected outcomes as return values instead of exceptions. Choose based on whether failure is exceptional in the API's domain and whether callers benefit from explicit branching.

## 70. Result Pattern

```js
return { ok: true, value };
return { ok: false, error };
```

This can make expected domain outcomes explicit without using exceptions for ordinary branching.

## 71. Exception Pattern

```js
try {
  const value = riskyOperation();
} catch (error) {
  // recover
}
```

Exceptions are useful for failures that should interrupt the current flow.

## 72. Do Not Mix Randomly

Within one subsystem, use a consistent contract so callers know whether to branch on a result or catch an exception.

## 73. Synchronous Errors

Synchronous errors happen during the current call stack and can be caught by a surrounding synchronous `try/catch`.

## 74. Async Errors

Asynchronous failures happen after the current synchronous stack has returned and require handling through the relevant asynchronous abstraction.

## 75. Promise Rejection

A rejected Promise represents an asynchronous failure or explicit rejection.

## 76. Promise Catch

```js
fetchData()
  .then(render)
  .catch(showError);
```

## 77. Async/Await Catch

```js
try {
  const data = await fetchData();
  render(data);
} catch (error) {
  showError(error);
}
```

## 78. Async Throw

An `async` function that throws causes the returned Promise to reject.

## 79. Async Example

```js
async function getData() {
  throw new Error("Failed");
}
```

Calling `getData()` returns a rejected Promise; it does not throw synchronously to the caller in the ordinary sense.

## 80. Await Rejection

`await` rethrows a rejected Promise as an exception at the await expression, allowing ordinary `try/catch` syntax.

## 81. Unhandled Rejection

A rejected Promise without an appropriate rejection handler can trigger runtime-level unhandled rejection reporting.

## 82. Handle Rejections

```js
void doWork().catch(reportError);
```

This explicitly handles a deliberately fire-and-forget Promise.

## 83. Fire-and-Forget Risk

Starting asynchronous work without handling its rejection can create invisible failures and runtime warnings.

## 84. Promise.all Failure

`Promise.all()` rejects when any input Promise rejects.

## 85. Promise.allSettled

`Promise.allSettled()` waits for every operation and returns an outcome record for each one.

## 86. Promise.any Failure

`Promise.any()` fulfills when the first input fulfills and rejects with `AggregateError` when all inputs reject.

## 87. Promise.race

`Promise.race()` settles when the first supplied Promise settles, whether fulfilled or rejected.

## 88. Async Error Propagation

```text
async low-level function
        ↓ reject
service await
        ↓ catch/rethrow
handler
        ↓ translate
response/UI
```

## 89. Fetch and Errors

Fetch usually rejects for network-level failures, not for ordinary HTTP 4xx/5xx responses.

## 90. Correct Fetch Handling

```js
const response = await fetch("/api/users");
if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
const users = await response.json();
```

## 91. Parse Errors

A response can have a successful status but contain invalid JSON. Parsing must be handled separately from HTTP status checking.

## 92. Content-Type Error

If your client expects JSON, inspect the response content type when the API contract requires it before parsing.

## 93. Network Error

A failed DNS lookup, blocked connection, or similar transport failure can result in a rejected Fetch Promise.

## 94. Abort Error

Canceled Fetch operations can reject with an abort-related error. Treat cancellation separately when it is expected.

## 95. Timeout Error

Fetch itself historically had no universal simple timeout option; use AbortSignal timeout/cancellation mechanisms where supported or compose an AbortController-based timeout.

## 96. AbortSignal.timeout

```js
const response = await fetch(url, {
  signal: AbortSignal.timeout(5000)
});
```

Availability depends on the runtime; use feature detection when supporting older environments.

## 97. AbortController

```js
const controller = new AbortController();
fetch(url, { signal: controller.signal });
controller.abort();
```

## 98. Cancellation Is Not Failure

If cancellation is an expected user action, avoid showing “Something went wrong” for every abort.

## 99. Finally With Async Work

```js
setLoading(true);
try {
  await save();
} catch (error) {
  showError(error);
} finally {
  setLoading(false);
}
```

## 100. Loading State Rule

`finally` is often the safest place to stop a loading indicator after an asynchronous operation.

## 101. Error Propagation Through Layers

```text
Database
   ↓
Repository
   ↓
Service
   ↓
Controller
   ↓
HTTP response
```

Each layer should add only the context it owns.

## 102. Repository Errors

A repository should communicate storage failures without leaking database-specific internals into user-facing responses.

## 103. Service Errors

A service can translate low-level failures into domain-level errors such as `UserAlreadyExists` or `InsufficientBalance`.

## 104. Controller Errors

An HTTP controller translates domain outcomes into appropriate status codes and safe response bodies.

## 105. UI Errors

A frontend translates safe API errors into user-facing messages and recovery actions.

## 106. Error Translation

```text
Mongo duplicate key
      ↓
EMAIL_EXISTS
      ↓
HTTP 409
      ↓
“Email already registered”
```

## 107. Preserve Cause

When translating an error, preserve the original error as `cause` when it provides useful diagnostic context.

## 108. Do Not Leak Internals

Never expose SQL queries, stack traces, file paths, secret values, tokens, or internal infrastructure details to ordinary users.

## 109. Production Error Response

A production API can return a stable error code, safe message, request ID, and optional validation details.

## 110. Example Error Response

```json
{
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "An account already uses this email.",
    "requestId": "req_123"
  }
}
```

## 111. Request ID

A request ID helps connect a user's report with backend logs without exposing internal stack traces.

## 112. Logging

Logging records diagnostic information about failures and relevant context.

## 113. What to Log

Useful fields include timestamp, severity, operation, stable error code, request ID, route, duration, and safe contextual identifiers.

## 114. What Not to Log

Do not log passwords, authorization headers, session cookies, refresh tokens, private keys, or unnecessary sensitive payloads.

## 115. Log Levels

Common levels include debug, info, warn, error, and fatal/critical depending on the logging system.

## 116. Error Severity

Severity should reflect impact and urgency rather than simply whether an exception object exists.

## 117. Error Context

Context should help answer what operation failed, for whom or which safe entity, where, when, and why, without exposing sensitive information.

## 118. Stack Traces

Stack traces are excellent diagnostics for developers but may reveal sensitive implementation details if exposed to users.

## 119. Error Monitoring

Production monitoring tools can aggregate exceptions, stack traces, environments, releases, and occurrence counts.

## 120. Alerting

Alert on actionable reliability problems rather than every expected validation error.

## 121. Error Rate

Monitor error rates by endpoint, error class, release, and service to detect regressions.

## 122. Error Budget

An error budget represents the amount of unreliability permitted by a service-level objective.

## 123. Observability

Error handling works with logs, metrics, and traces to make failures diagnosable across distributed systems.

## 124. Correlation

Propagate request or trace identifiers so related operations can be connected across services.

## 125. User Experience

A good error message should explain what happened at the appropriate level and tell the user what they can do next.

## 126. Bad User Error

```text
TypeError: Cannot read properties of undefined...
```

This is useful to a developer, not usually to a normal user.

## 127. Better User Error

```text
We couldn't load your notes. Check your connection and try again.
```

## 128. Do Not Blame the User

Prefer neutral, actionable language such as “The email format is invalid” rather than “You entered the wrong thing.”

## 129. Error UI States

```text
idle
 ↓
loading
 ├── success → data / empty
 └── failure → message + recovery
```

## 130. Recovery Action

A failure state should offer an appropriate action such as retry, edit input, sign in again, go back, or contact support.

## 131. Retry Button

A retry button is useful for transient network failures but should not blindly repeat destructive operations.

## 132. Form Validation

Validate forms close to the user for fast feedback, then validate again on the server because client validation is not a security boundary.

## 133. Field Errors

Field-level validation errors should identify the relevant field and rule without exposing internal implementation details.

## 134. Schema Validation

Runtime schema validation can detect unexpected API data before it corrupts application state.

## 135. Defensive Parsing

Do not assume external data has the shape your TypeScript type or mental model claims it has. Runtime data is untrusted.

## 136. Configuration Errors

Missing environment variables, invalid URLs, and incompatible settings should fail clearly during startup or configuration validation.

## 137. Fail Fast

Fail fast when continuing with invalid configuration would produce unsafe or misleading behavior.

## 138. Fail Safe

When appropriate, choose behavior that protects data and users rather than continuing in a dangerous state.

## 139. Graceful Degradation

If an optional dependency fails, continue with reduced functionality when the product can safely do so.

## 140. Dependency Failure

External APIs, databases, queues, and payment services can fail independently from your application.

## 141. Timeout Dependency Calls

Every external dependency should have a sensible timeout so one stalled dependency does not consume resources indefinitely.

## 142. Retry Dependency Calls

Retry only transient failures and use bounded exponential backoff with jitter.

## 143. Circuit Breaker

A circuit breaker can stop repeated calls to a failing dependency and allow recovery.

## 144. Bulkhead

Bulkhead isolation prevents one failing dependency from consuming all worker threads, connections, or request capacity.

## 145. Fallback

A fallback can return cached, partial, or default data when safe and meaningful.

## 146. Idempotency

Important mutations should use idempotency strategies when clients may retry after uncertain outcomes.

## 147. Duplicate Request

A timeout does not prove that the server did nothing. A mutation may have succeeded even though its response was lost.

## 148. Payment Example

Never blindly retry a payment creation request just because the client timed out. Use a server-recognized idempotency key.

## 149. Error Classification Table

| Failure | Usually Retry? | Typical Action |
|---|---|---|
| Validation | No | Fix input |
| 401 | Usually no | Re-authenticate/refresh according to auth design |
| 403 | No | Deny/adjust permission |
| 404 | Usually no | Handle missing resource |
| 409 | Sometimes | Reconcile conflict |
| 429 | Maybe | Respect rate limit/backoff |
| 5xx | Sometimes | Bounded retry |
| Timeout | Sometimes | Retry if operation is safe/idempotent |
| Cancellation | No | Treat as expected cancellation |
| Programmer bug | No | Fix code |

## 150. Error Classification Is Contextual

The table above is a starting point, not an automatic retry algorithm. The operation's semantics and application state matter.

## 151. Error Handling in Event Handlers

Errors thrown inside event callbacks are not automatically caught by a `try/catch` surrounding the code that registered the callback.

## 152. Event Handler Example

```js
try {
  button.addEventListener("click", async () => {
    await save();
  });
} catch (error) {
  // does not catch a later async click failure
}
```

## 153. Correct Event Handling

```js
button.addEventListener("click", async () => {
  try {
    await save();
  } catch (error) {
    showError(error);
  }
});
```

## 154. Global Browser Error Event

Browsers expose global error reporting mechanisms such as `window.onerror` and `error` events, but global handlers should be a last safety net rather than the primary application architecture.

## 155. Unhandled Promise Rejection Event

Browsers expose `unhandledrejection` for observing rejected Promises that remain unhandled according to runtime rules.

## 156. Global Handlers

Use global handlers for reporting and controlled last-resort behavior, not for pretending every error can be safely recovered.

## 157. Node.js Uncaught Exception

Node.js exposes process-level events for uncaught exceptions and unhandled rejections. These are observability/last-resort mechanisms, not substitutes for local error handling.

## 158. Process Safety

After a truly fatal uncaught exception, continuing a long-running server process may leave application state uncertain. Production strategy should prioritize safe shutdown and supervised restart where appropriate.

## 159. Async Callback Errors

Errors in callback-style asynchronous APIs require handling inside the callback or through the API's provided error channel.

## 160. Error-First Callback

Node's traditional callback style commonly uses `(error, value)`.

## 161. Error-First Example

```js
readFile(path, (error, data) => {
  if (error) {
    return handle(error);
  }
  use(data);
});
```

## 162. Promisifying Callbacks

Modern Node APIs often expose Promise-based alternatives, which can simplify control flow and centralized `try/catch` handling.

## 163. Finally and Resource Cleanup

Use `finally` to release resources such as locks, loading state, temporary handles, or subscriptions when appropriate.

## 164. Resource Cleanup

```js
const resource = acquire();
try {
  await use(resource);
} finally {
  await release(resource);
}
```

## 165. Cleanup Failure

Cleanup itself can fail. Decide whether the cleanup error should replace the original error, be attached as context, or be reported separately.

## 166. Suppressed Error Concept

When multiple failures occur during cleanup, preserve as much diagnostic information as the runtime/API permits rather than silently losing the original failure.

## 167. Error Chaining

Use `cause` to preserve underlying failures when converting technical errors into domain-level errors.

## 168. Custom Error Hierarchy

```js
class AppError extends Error {
  constructor(message, options = {}) {
    super(message, options);
    this.name = "AppError";
  }
}

class NotFoundError extends AppError {}
class ValidationError extends AppError {}
```

## 169. Error Codes vs Classes

Classes are useful for programmatic categorization; stable codes are useful across process/language boundaries. Many production systems use both.

## 170. Serialization

Error objects do not automatically serialize all useful properties through JSON. Define an explicit safe error representation.

## 171. Error to JSON

```js
function serializeError(error) {
  return {
    name: error.name,
    message: error.message,
    code: error.code
  };
}
```

Do not serialize stacks or causes to untrusted clients by default.

## 172. Cause Serialization

A cause chain can contain internal details and should normally remain server-side diagnostics.

## 173. Error Object Mutation

Avoid randomly attaching unrelated properties to Error instances throughout a large codebase. Use consistent custom error types.

## 174. Error Metadata

Useful metadata can include stable code, HTTP status mapping, retryability, safe details, and original cause.

## 175. Retryable Flag

A structured error can communicate whether a specific layer believes retrying is appropriate, while the final policy remains context-dependent.

## 176. Error Contract

Document error codes, statuses, response shapes, retry behavior, and validation details as part of the API contract.

## 177. Error Versioning

Do not remove or redefine established error codes casually if clients depend on them.

## 178. Error Handling in React

React applications need component-level loading/error states and may use Error Boundaries for render-time failures. Async event-handler errors still need explicit handling.

## 179. Error Boundary Limitation

A React Error Boundary does not replace handling for every asynchronous failure or event-handler failure.

## 180. Network Error State

```js
try {
  const response = await fetch("/api/notes");
  if (!response.ok) throw new Error("Request failed");
  setNotes(await response.json());
} catch (error) {
  setError(error);
}
```

## 181. Loading/Error/Data State

Keep asynchronous UI state explicit rather than inferring it from unrelated variables.

## 182. Stale Data on Error

When refreshing existing data fails, it may be better to keep stale data visible and show a refresh error instead of replacing useful content with an empty screen.

## 183. Optimistic Update Error

If an optimistic mutation fails, reconcile or roll back the local state and tell the user what happened.

## 184. Error Recovery Workflow

```text
failure
 ↓
classify
 ↓
can recover?
 ├─ yes → recover → verify
 └─ no  → propagate
           ↓
        observe
```

## 185. Recovery Must Be Correct

A recovery action that hides the symptom but corrupts state is worse than exposing the original failure.

## 186. Validation vs Error Handling

Validation prevents invalid input from entering a deeper operation. Error handling manages failures that occur despite validation or outside its scope.

## 187. Defensive Programming

Defensive programming makes assumptions explicit and verifies boundaries without turning every line into unnecessary checks.

## 188. Invariants

An invariant is a condition that should remain true. Violated invariants often indicate programming bugs rather than user errors.

## 189. Assertion

Assertions can document and enforce assumptions that should be true during development or in controlled environments.

## 190. Assertion Example

```js
function assert(condition, message) {
  if (!condition) throw new Error(message);
}
```

## 191. Do Not Use Assertions as User Validation

User input should receive normal validation and controlled error responses rather than programmer-style invariant failures.

## 192. Error Handling and Security

Error behavior is part of the security boundary because messages, timing, status codes, and logs can reveal information.

## 193. Information Disclosure

Detailed errors can reveal whether an account exists, which database is used, or which internal route failed.

## 194. Authentication Enumeration

Avoid overly specific login errors when they would allow attackers to enumerate valid accounts.

## 195. Safe External Message

Return a message appropriate for the user's context while retaining detailed diagnostics internally.

## 196. Timing Considerations

Security-sensitive operations should avoid unnecessary observable timing differences when those differences reveal protected information.

## 197. Log Injection

Treat user-controlled strings carefully when writing structured logs so attackers cannot forge misleading log records.

## 198. Error-Based SQL Injection

Never construct database queries from untrusted error-related or user-controlled strings without parameterization and proper validation.

## 199. Stack Trace Exposure

Do not expose production stack traces to ordinary API clients.

## 200. Error Handling and Privacy

Error telemetry should collect enough information to debug failures without collecting unnecessary personal or sensitive data.

## 201. Error Handling and Performance

Exceptions are not inherently a performance disaster, but using exceptions for ordinary high-frequency control flow can make code harder to reason about and may have runtime costs.

## 202. Hot Path

In performance-critical hot paths, avoid designing normal expected outcomes as repeated exception throws when a simple result branch is clearer.

## 203. Error Object Creation

Creating an Error captures diagnostic information and can be more expensive than returning a normal value. Measure before optimizing.

## 204. Fail-Fast Startup

Validate critical configuration at startup so an application does not run partially broken and fail unpredictably later.

## 205. Environment Validation

```js
const required = ["DATABASE_URL", "JWT_SECRET"];
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required configuration: ${key}`);
  }
}
```

Never print secret values while validating configuration.

## 206. Error Handling in Modules

Modules should expose clear contracts for what they can throw/reject and what callers are expected to handle.

## 207. Error Handling in APIs

API clients should normalize transport, HTTP, parsing, and domain failures into predictable error structures.

## 208. Error Handling in Services

Service functions should preserve domain meaning rather than returning vague “failed” errors for every condition.

## 209. Error Handling in Controllers

Controllers should map known domain errors to safe HTTP responses and let unexpected errors reach centralized reporting/handling.

## 210. Centralized Error Middleware

Backend frameworks such as Express commonly support centralized error middleware to convert uncaught route errors into consistent responses.

## 211. Express Error Middleware Shape

```js
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "Something went wrong"
    }
  });
});
```

Do not expose the raw `error` object to clients.

## 212. Express next(error)

Passing an error to Express's error-handling flow lets centralized middleware process it.

## 213. Async Route Errors

Ensure rejected Promises from async route handlers reach the framework's error pipeline according to the Express version/pattern being used.

## 214. Error Middleware Ordering

Error middleware must be registered in the correct place in the middleware chain so it can receive propagated failures.

## 215. API Error Mapping

```text
ValidationError → 400/422
AuthError       → 401
ForbiddenError  → 403
NotFoundError   → 404
ConflictError   → 409
RateLimitError  → 429
Unknown         → 500
```

Exact status choice should follow the API contract.

## 216. Unknown Error

Unexpected errors should receive a generic external response and detailed internal diagnostics.

## 217. Error Handler Must Not Crash

Your error handler should itself be simple, defensive, and designed not to throw while trying to report another failure.

## 218. Logging Failure

If an external logging service fails, the application's primary error handling path should still remain safe.

## 219. Error Reporting Failure

Observability must be best-effort unless the system explicitly requires durable audit records.

## 220. Retry Storm

Poor error handling can turn an outage into a larger outage by causing every client to retry immediately.

## 221. Backoff

Use exponential backoff and jitter for appropriate transient operations.

## 222. Retry Budget

Limit total retries so recovery mechanisms cannot consume unlimited resources.

## 223. Dead Letter Concept

In queue systems, messages that repeatedly fail can be moved to a dead-letter queue for investigation rather than retried forever.

## 224. Poison Message

A poison message repeatedly fails processing because its data or required conditions are invalid. It needs isolation or correction rather than infinite retries.

## 225. Error Handling in Background Jobs

Jobs should record attempts, classify failures, apply bounded retries, and reach a terminal state when retrying is no longer useful.

## 226. Job State Machine

```text
queued
 ↓
running
 ├→ succeeded
 ├→ retry_wait → running
 └→ failed
```

## 227. Error Handling in Webhooks

Webhook handlers should validate signatures, parse safely, authorize actions, and return appropriate responses.

## 228. Webhook Idempotency

A webhook may be delivered more than once. Store an event ID or use another deduplication strategy when required.

## 229. Webhook Failure

Returning an appropriate non-success response can cause the sender to retry, so design retry semantics intentionally.

## 230. Error Handling in WebSockets

Handle `error` and `close`, validate incoming messages, and prevent malformed messages from crashing application logic.

## 231. Untrusted WebSocket Data

A WebSocket connection is not a trust boundary. Validate every message as untrusted input.

## 232. Error Handling in SSE

Handle connection errors, reconnection, stale state, and cleanup when the consuming page/component is destroyed.

## 233. Error Handling in Workers

Worker errors need explicit message/error handling and should not be assumed to behave exactly like errors on the main thread.

## 234. Error Handling in IndexedDB

IndexedDB uses asynchronous request/transaction events and errors. Understand transaction lifecycle and abort behavior when designing recovery.

## 235. Error Handling in File APIs

File operations can fail because of permissions, invalid data, unavailable files, user cancellation, or browser restrictions.

## 236. Error Handling in Clipboard

Clipboard operations can reject because of permission, user-activation, security-context, or browser-policy restrictions.

## 237. Error Handling in Geolocation

Geolocation reports structured errors such as permission denial, unavailable position, or timeout.

## 238. Error Handling in Notifications

Notification permission may be denied, and unsupported/policy-restricted environments need a fallback UX.

## 239. Error Handling in Storage

Storage operations can fail due to quota, browser policy, private-mode differences, disabled storage, or other environment constraints.

## 240. Feature Detection

Do not assume every browser supports every API. Detect capabilities before using optional platform features.

## 241. Fallback

```js
if ("clipboard" in navigator) {
  await navigator.clipboard.writeText(text);
} else {
  copyWithFallback(text);
}
```

## 242. Unsupported API

Unsupported features should produce a controlled fallback or an informative message rather than an unexplained exception.

## 243. Debugging Strategy

When an error occurs, reproduce it, classify it, inspect the stack and context, isolate the smallest failing operation, and verify the fix with a regression test.

## 244. Read the Stack

Start at the relevant application frame rather than blindly reading every runtime/internal frame.

## 245. Inspect Inputs

Check actual runtime values at the failure boundary rather than assuming they match types or documentation.

## 246. Check the First Error

Later failures can be consequences of an earlier failure. Find the earliest meaningful error in the chain.

## 247. Preserve Reproduction

Record the smallest input and environment that reproduces the failure so debugging can be repeated.

## 248. Binary Search Debugging

Disable or isolate halves of a system to quickly determine which subsystem contains the failure.

## 249. Logging for Debugging

Add targeted structured logs around boundaries rather than scattering `console.log` everywhere.

## 250. Breakpoints

Use debugger breakpoints to inspect call stacks, variables, scopes, and execution flow.

## 251. Conditional Breakpoints

Break only when a relevant condition occurs to avoid stopping on thousands of normal iterations.

## 252. Network Debugging

Inspect status, headers, payload, response body, timing, CORS, credentials, and cancellation in browser DevTools.

## 253. Source Maps

Source maps help map bundled/transpiled stack locations back to source code during development.

## 254. Production Source Maps

Decide carefully how production source maps are exposed because public maps can reveal source details.

## 255. Reproduction Environment

A bug may depend on browser, OS, runtime version, locale, network conditions, configuration, or data shape.

## 256. Error Reproduction Checklist

```text
What failed?
When?
Where?
With which input?
Which release?
Which environment?
What changed?
Can it be reproduced?
```

## 257. Testing Expected Errors

Tests should assert the error type/code/status and relevant behavior, not only that “something threw.”

## 258. Test Throw

```js
expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
```

The exact assertion syntax depends on the testing framework.

## 259. Test Async Rejection

```js
await expect(getData()).rejects.toThrow();
```

Again, the exact matcher depends on the testing framework.

## 260. Test Error Mapping

Test that domain errors map to the correct HTTP status and safe response shape.

## 261. Test Recovery

Test not only failure detection but also retry, rollback, fallback, cleanup, and user-visible recovery behavior.

## 262. Test Cancellation

Verify canceled operations do not update stale UI state or display misleading failure messages.

## 263. Test Race Conditions

Control completion order in tests so stale responses and duplicate mutations are reproducibly tested.

## 264. Test Retry Limits

Assert that a retry mechanism stops after its configured maximum rather than looping indefinitely.

## 265. Test Backoff

Use controllable clocks/timers where possible rather than making tests actually wait for long retry delays.

## 266. Test Error Serialization

Ensure sensitive stack traces, causes, tokens, and internal details are excluded from external error responses.

## 267. Test Logging

Verify important failures produce the expected structured diagnostic information without secrets.

## 268. Regression Test

Every fixed production bug should produce a regression test when practical so the same failure is not silently reintroduced.

## 269. Error Handling Anti-Pattern: Catch Everything

```js
try {
  await everything();
} catch {
  return null;
}
```

This destroys useful failure information.

## 270. Better: Handle Specifically

Catch only conditions that can be meaningfully recovered from, and propagate unknown failures.

## 271. Anti-Pattern: Error Message Parsing

```js
if (error.message === "Email exists") {
  // fragile
}
```

Messages change and may be localized.

## 272. Better: Error Code

```js
if (error.code === "EMAIL_EXISTS") {
  // stable contract
}
```

## 273. Anti-Pattern: Return null for Every Failure

`null` cannot distinguish missing data, failure, valid empty state, or programmer error.

## 274. Better: Explicit Result

Use a documented result type or exception contract that preserves the distinction between success and failure.

## 275. Anti-Pattern: Log and Continue

Logging a serious invariant violation and continuing can corrupt later state.

## 276. Better: Stop or Propagate

After recording useful diagnostics, propagate the failure if continuing is unsafe.

## 277. Anti-Pattern: Throw Primitive

```js
throw "bad";
```

Avoid it.

## 278. Better: Throw Error

```js
throw new Error("bad");
```

## 279. Anti-Pattern: Nested Try Everywhere

Excessive nested `try/catch` blocks can make control flow unreadable.

## 280. Better: Layered Handling

Handle at boundaries where the code has enough information to recover or translate the error.

## 281. Anti-Pattern: Global Handler as Architecture

A global error handler cannot know how to safely recover every operation.

## 282. Better: Local Recovery + Global Reporting

Recover locally where appropriate and use global handlers for last-resort reporting and containment.

## 283. Anti-Pattern: Retry Without Idempotency

Retrying state-changing operations without duplicate protection can create duplicate records, charges, or side effects.

## 284. Better: Idempotent Mutation Design

Use idempotency keys, unique constraints, state machines, or other server-side deduplication mechanisms.

## 285. Anti-Pattern: User Sees Stack Trace

Never expose raw production stack traces as normal user-facing API output.

## 286. Better: Safe Error Envelope

Return stable error codes, safe messages, and a request ID while retaining diagnostics internally.

## 287. Anti-Pattern: No Cleanup

A failure before cleanup can leave subscriptions, locks, timers, or resources active.

## 288. Better: Finally / Cleanup

Use `finally` or lifecycle cleanup mechanisms appropriate to the resource.

## 289. Anti-Pattern: Ignore Cancellation

Treating every cancellation as a server failure creates noisy logs and poor UX.

## 290. Better: Classify Cancellation

Recognize expected cancellation and avoid unnecessary error notifications.

## 291. Anti-Pattern: Infinite Retry

Infinite retries can create resource exhaustion and retry storms.

## 292. Better: Bounded Retry

Use maximum attempts, deadlines, backoff, jitter, and terminal failure handling.

## 293. Anti-Pattern: Client-Only Security

A frontend error check does not protect an API.

## 294. Better: Server Enforcement

Authentication, authorization, validation, and important business rules must be enforced server-side.

## 295. Error Design Checklist

For each error ask: Is it expected? Can we recover? Who can recover? What context is needed? What should the user see? What should logs contain? Should it be retried?

## 296. Error Decision Tree

```text
Failure
  ↓
Is it expected?
 ├─ yes → explicit outcome/recovery
 └─ no
     ↓
Can this layer recover?
 ├─ yes → recover + observe
 └─ no → add context + propagate
```

## 297. Error Handling Layers

```text
Input boundary → validate
Service         → domain errors
Transport       → HTTP/network handling
UI              → recovery UX
Global          → last-resort reporting
```

## 298. Error Handling Contract

Every public function should have an understandable success/failure contract, especially asynchronous APIs.

## 299. Documentation

Document which errors a function may throw/reject when callers need to distinguish them.

## 300. TypeScript and Errors

TypeScript can describe error-related result shapes, but it does not guarantee the runtime type of thrown values.

## 301. unknown in catch

TypeScript can treat caught values as `unknown`, encouraging code to narrow them before accessing properties.

## 302. Safe Error Narrowing

```ts
catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
```

## 303. Do Not Assume Error

JavaScript permits throwing arbitrary values, so runtime code should not blindly assume a caught value has `message`.

## 304. Normalize Unknown Errors

```js
function toError(value) {
  if (value instanceof Error) return value;
  return new Error(String(value));
}
```

This is useful at application boundaries, although the original thrown value may contain information worth preserving separately.

## 305. Error Normalization

Normalize low-level failures at system boundaries so higher layers have predictable contracts.

## 306. Error Serialization Boundary

Convert internal errors into a safe external representation exactly once at the boundary whenever practical.

## 307. Domain Error Example

```js
class EmailExistsError extends Error {
  constructor() {
    super("Email already exists");
    this.name = "EmailExistsError";
    this.code = "EMAIL_EXISTS";
  }
}
```

## 308. Service Example

```js
async function registerUser(input) {
  if (await userExists(input.email)) {
    throw new EmailExistsError();
  }
  return createUser(input);
}
```

## 309. Controller Example

```js
try {
  const user = await registerUser(req.body);
  res.status(201).json(user);
} catch (error) {
  if (error instanceof EmailExistsError) {
    return res.status(409).json({
      error: { code: error.code, message: "Email already registered" }
    });
  }
  throw error;
}
```

## 310. Unexpected Controller Error

Unexpected failures should reach centralized handling rather than being converted into misleading validation errors.

## 311. Error Mapping Table

Maintain one documented mapping between domain error categories and transport responses to avoid inconsistent endpoints.

## 312. Error Code Naming

Use stable, descriptive codes such as `EMAIL_EXISTS`, `NOTE_NOT_FOUND`, and `INVALID_CURSOR` rather than vague `FAILED` codes.

## 313. Error Code Granularity

Do not create hundreds of meaningless codes. A code should correspond to a behavior clients genuinely need to distinguish.

## 314. Localization

User-facing error messages may need localization. Machine-readable codes should remain language-neutral.

## 315. Support Workflow

A request ID and stable error code can help support teams investigate an issue without asking users for sensitive technical details.

## 316. Error UX for Forms

Show field-level errors where possible and preserve valid user input so a failure does not force the user to start over.

## 317. Error UX for Network

Distinguish offline, timeout, server failure, authentication expiry, and validation errors when different recovery actions are useful.

## 318. Error UX for Permissions

Explain the required permission or next step rather than showing a generic failure when safe to do so.

## 319. Error UX for Missing Data

A missing optional resource may be an empty state, not an error. Model the domain correctly.

## 320. Empty vs Error

```text
200 + []       → successful empty state
404            → missing resource
500            → server failure
```

Exact semantics depend on the API contract.

## 321. Error Handling and Caching

Do not replace valid cached data with a failed refresh result unless the product explicitly requires it.

## 322. Stale-While-Revalidate Failure

If background refresh fails, retain stale data when safe and expose a non-blocking refresh error.

## 323. Error Handling and Offline

Offline state can be a normal operating mode for offline-capable applications rather than a fatal error.

## 324. Error Handling and Service Workers

Service workers should handle cache misses, failed network requests, and versioning carefully so offline fallbacks do not mask real application bugs.

## 325. Error Handling and Web Crypto

Crypto API failures should not be silently ignored. Security-sensitive operations should fail closed when required.

## 326. Fail Closed

When continuing after a security-critical failure could grant unauthorized access, deny the operation rather than using an insecure fallback.

## 327. Fail Open

Fail-open behavior may be acceptable only when the security and product model explicitly permits it. Never use it accidentally for authorization.

## 328. Error Handling and Authorization

If authorization cannot be reliably established, protected operations should not proceed.

## 329. Error Handling and Transactions

When a multi-step operation fails, transactional mechanisms or compensating actions may be required to avoid partial state.

## 330. Partial Failure

Distributed operations can partially succeed. Design state transitions and recovery rather than assuming all-or-nothing behavior.

## 331. Saga Concept

A saga coordinates a sequence of distributed actions with compensating actions when later steps fail.

## 332. Compensation

A compensating action attempts to restore business consistency; it is not always a perfect rollback.

## 333. Error Handling and Queues

Queue consumers should acknowledge messages only according to successful processing semantics and should distinguish retryable from permanent failures.

## 334. Dead Letter Queue

Dead-letter queues isolate repeatedly failing messages so healthy work can continue.

## 335. Error Handling and Database Constraints

Database uniqueness and foreign-key constraints can produce errors that should be translated into domain-level conflicts rather than exposed raw.

## 336. Error Handling and Transactions

Use database transactions when several related writes must succeed or fail together and the database supports the required semantics.

## 337. Error Handling and External Side Effects

A database transaction cannot automatically roll back an email, payment, or external API call. Design idempotency and compensation explicitly.

## 338. Outbox Concept

An outbox pattern can store intended external events transactionally with local database changes, then publish them asynchronously.

## 339. Exactly-Once Reminder

Distributed systems rarely provide a simple universal exactly-once guarantee. Design for duplicates and retries.

## 340. Error Handling Review Questions

Before shipping, ask: Can this error be retried? Could retry duplicate side effects? Is cleanup guaranteed? Is the message safe? Is the error observable? Can the user recover?

## 341. Mini Challenge: Error Classifier

Build a function that accepts unknown errors and classifies them into validation, auth, network, timeout, cancellation, conflict, server, or unknown categories.

## 342. Mini Challenge: Safe Error Serializer

Create a serializer that returns only safe `code`, `message`, `status`, and request ID fields while excluding stacks, causes, and secrets.

## 343. Mini Challenge: Retry Helper

Build a retry helper supporting maximum attempts, exponential backoff, jitter, timeout, cancellation, and an explicit retry predicate.

## 344. Mini Challenge: Async Wrapper

Build a wrapper that standardizes loading, success, failure, and cancellation states for an asynchronous UI operation.

## 345. Mini Challenge: API Error Layer

Build an API client that converts Fetch/network/JSON/HTTP failures into one consistent custom error hierarchy.

## 346. Mini Project: Form Error System

Build a registration form with client validation, server validation, field-level errors, general errors, loading state, cancellation, and retry-safe submission.

## 347. Mini Project: Notes Error Architecture

Build a notes application that handles 401, 403, 404, 409, 422, 429, 500, network failure, timeout, cancellation, empty state, and stale-refresh errors correctly.

## 348. Advanced Project: Production Error Layer

Build a reusable backend error system with custom classes, error codes, causes, centralized middleware, safe serialization, request IDs, structured logging, metrics, and tests.

## 349. Advanced Project: Reliable Job Runner

Build a job runner with retryable/permanent error classification, exponential backoff, jitter, attempt limits, dead-letter handling, idempotency, and observability.

## 350. Advanced Project: Distributed Failure Simulator

Create a simulator for timeouts, duplicate requests, stale responses, partial failures, dependency outages, rate limits, and recovery strategies.

## 351. Beginner Practice

1. Explain `try/catch/finally`.
2. Explain `throw`.
3. Create a custom Error.
4. Compare TypeError and ReferenceError.
5. Catch a rejected Promise.
6. Explain why Fetch 404 does not normally reject.
7. Use `finally` for loading state.
8. Explain cancellation.
9. Build a validation error.
10. Write a safe user-facing error message.

## 352. Intermediate Practice

1. Build error-code classes.
2. Normalize unknown errors.
3. Implement API error mapping.
4. Add retry with backoff.
5. Add cancellation handling.
6. Test stale requests.
7. Build structured logging.
8. Build safe error serialization.
9. Implement optimistic rollback.
10. Design a centralized error middleware.

## 353. Advanced Practice

1. Design a payment retry strategy.
2. Design an idempotency-key system.
3. Design dependency circuit breaking.
4. Design a dead-letter workflow.
5. Design partial-failure recovery.
6. Design error contracts across services.
7. Threat-model error information leakage.
8. Build distributed tracing for errors.
9. Design a production error budget.
10. Build a failure-injection test environment.

## 354. Interview: Throw

**Question:** Why prefer `throw new Error()` over `throw "failed"`?

**Answer:** Error instances provide standard diagnostic structure such as `message` and commonly a stack, making failures easier to inspect and process consistently.

## 355. Interview: Fetch

**Question:** Does Fetch reject on HTTP 500?

**Answer:** Normally no. It resolves with a Response; code should inspect `ok`/`status`.

## 356. Interview: Async Errors

**Question:** Does a synchronous try/catch catch a later Promise rejection?

**Answer:** No. The asynchronous operation must be awaited inside the try/catch or have a rejection handler.

## 357. Interview: Finally

**Question:** Why use `finally`?

**Answer:** It is useful for cleanup that should occur after success or failure, such as resetting loading state or releasing resources.

## 358. Interview: Custom Errors

**Question:** Why create custom error classes?

**Answer:** To represent meaningful application categories that callers can distinguish without parsing message strings.

## 359. Interview: Error Cause

**Question:** Why preserve `cause`?

**Answer:** It lets a higher-level error add domain context while retaining the lower-level diagnostic reason.

## 360. Interview: Retry

**Question:** Why can retrying a POST be dangerous?

**Answer:** The first request may have succeeded even if its response was lost, so a retry can duplicate the side effect unless idempotency is designed.

## 361. Interview: Global Handler

**Question:** Should global error handlers recover everything?

**Answer:** No. They are primarily last-resort reporting/containment mechanisms; local code should recover where it has enough context.

## 362. Interview: Security

**Question:** Why not send stack traces to clients?

**Answer:** They can reveal internal implementation details, paths, dependencies, and other information useful to attackers.

## 363. Teach-Back: Error Taxonomy

Explain expected vs unexpected, recoverable vs non-recoverable, validation, auth, authorization, conflict, network, timeout, cancellation, and programmer errors.

## 364. Teach-Back: Propagation

Draw how an error travels from repository → service → controller → HTTP response → frontend → user.

## 365. Teach-Back: Async Errors

Explain synchronous throw, Promise rejection, `await`, `.catch()`, unhandled rejection, cancellation, and `finally`.

## 366. Teach-Back: Reliability

Explain timeout, retry, exponential backoff, jitter, idempotency, duplicate side effects, circuit breakers, and dead-letter queues.

## 367. Teach-Back: Security

Explain why error messages, status codes, logs, stack traces, and timing can become security-sensitive information.

## 368. Teach-Back: Production Design

Design an error architecture for a full-stack Notes application and explain every boundary.

## 369. Mastery: Core Exceptions

- [ ] I understand `throw`.
- [ ] I understand `try/catch/finally`.
- [ ] I know common built-in Error types.
- [ ] I can create custom Error classes.

## 370. Mastery: Async Errors

- [ ] I understand Promise rejection.
- [ ] I can handle `async/await` failures.
- [ ] I understand Fetch HTTP vs network failures.
- [ ] I can handle cancellation separately.

## 371. Mastery: Error Architecture

- [ ] I can propagate errors through layers.
- [ ] I can translate low-level errors into domain errors.
- [ ] I can use stable error codes.
- [ ] I can preserve causes.

## 372. Mastery: API Errors

- [ ] I can map errors to HTTP responses.
- [ ] I can design safe error envelopes.
- [ ] I can distinguish empty state from error.
- [ ] I can handle validation errors correctly.

## 373. Mastery: Reliability

- [ ] I can classify retryable failures.
- [ ] I can implement bounded retries.
- [ ] I understand backoff and jitter.
- [ ] I understand idempotency and duplicate effects.

## 374. Mastery: Security

- [ ] I do not expose stack traces.
- [ ] I do not log secrets.
- [ ] I understand error information disclosure.
- [ ] I enforce authorization server-side.

## 375. Mastery: Debugging

- [ ] I can read stack traces.
- [ ] I can isolate failures.
- [ ] I can reproduce bugs.
- [ ] I write regression tests.

## 376. Mastery: Production

- [ ] I understand centralized error handling.
- [ ] I understand structured logging.
- [ ] I understand metrics and traces.
- [ ] I can design graceful degradation.

## 377. Final Error-Handling Mental Model

```text
                 ┌──────────────┐
                 │   Operation  │
                 └──────┬───────┘
                        │
                  success/fail
                        │
              ┌─────────▼─────────┐
              │ Classify Failure  │
              └─────────┬─────────┘
                        │
             ┌──────────┴──────────┐
             ▼                     ▼
        Recoverable            Unexpected
             │                     │
       retry/fallback        add context
       validate/reconcile       propagate
             │                     │
             └──────────┬──────────┘
                        ▼
                 Observe safely
                        │
                        ▼
                 Improve system
```

# Final Error-Handling Challenge

Build a **production-grade error architecture** for your full-stack Notes application.

Requirements:

1. Create a base `AppError` class.
2. Create validation, authentication, authorization, not-found, conflict, rate-limit, timeout, and cancellation errors.
3. Give errors stable machine-readable codes.
4. Preserve low-level causes.
5. Normalize unknown thrown values.
6. Build centralized backend error middleware.
7. Map domain errors to safe HTTP responses.
8. Never expose production stack traces.
9. Add request/correlation IDs.
10. Build structured error logging without secrets.
11. Add frontend API error normalization.
12. Distinguish HTTP errors from network failures.
13. Distinguish cancellation from genuine failure.
14. Add timeout and bounded retry handling.
15. Add exponential backoff and jitter.
16. Protect important mutations with idempotency.
17. Handle stale requests and race conditions.
18. Add loading, refreshing, empty, success, and failure UI states.
19. Preserve stale data when safe during failed refreshes.
20. Add field-level and general form errors.
21. Test every important error class.
22. Test error-to-HTTP mapping.
23. Test retries and retry limits.
24. Test cancellation and stale responses.
25. Test that sensitive diagnostics never reach clients.
26. Add regression tests for fixed bugs.
27. Document the complete error contract.
28. Inject simulated failures into development/testing.
29. Explain when the system recovers and when it intentionally fails.
30. Teach the complete architecture to another developer without reading the notes.

**Mastery standard:** You are not finished when you know how to write `try/catch`. You are finished when you can design failure behavior across **JavaScript execution, Promises, browser APIs, HTTP, authentication, databases, queues, distributed services, UI state, security, observability, retries, cancellation, and production recovery** without hiding bugs or creating new ones.
