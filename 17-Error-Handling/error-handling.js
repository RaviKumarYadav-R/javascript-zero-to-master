//* ============================================================
//* JAVASCRIPT ERROR HANDLING — PRACTICAL COMPANION
//* ============================================================

//* Definition:
//* Error handling is the practice of detecting, communicating, recovering from,
//* and debugging failures in a program without allowing unexpected failures to
//* silently corrupt application state.
//*
//* Mental model:
//*
//* Operation -> failure? -> detect -> classify -> handle/recover -> report/debug
//*
//* Not every error should be "caught". Catch an error when the current layer can
//* meaningfully recover, translate, add context, or present a useful outcome.


//* ------------------------------------------------------------
//* 1. SYNTAX ERROR
//* ------------------------------------------------------------

//* A syntax error means the JavaScript source cannot be parsed as valid JavaScript.
//* Example (intentionally invalid):
//* const user = ;
//*
//* The engine cannot execute that source normally because parsing fails first.


//* ------------------------------------------------------------
//* 2. RUNTIME ERROR
//* ------------------------------------------------------------

//* A runtime error happens while valid JavaScript is executing.

function runtimeErrorExample() {
  const user = null;

  try {
    return user.name;
  } catch (error) {
    return "Recovered from runtime error";
  }
}

console.log(runtimeErrorExample());


//* ------------------------------------------------------------
//* 3. LOGICAL ERROR
//* ------------------------------------------------------------

//* A logical error produces an incorrect result even though JavaScript may report
//* no exception at all.

function calculateDiscount(price) {
  //* Bug: this returns 10 instead of 10% of price.
  return price - 10;
}

console.log(calculateDiscount(100));

//* Tests, assertions and careful debugging are needed to detect many logical errors.


//* ------------------------------------------------------------
//* 4. ERROR OBJECT
//* ------------------------------------------------------------

const error = new Error("Something went wrong");

console.log(error.name);
console.log(error.message);
console.log(error.stack);


//* ------------------------------------------------------------
//* 5. THROW
//* ------------------------------------------------------------

function withdraw(balance, amount) {
  if (amount > balance) {
    throw new Error("Insufficient balance");
  }

  return balance - amount;
}

try {
  console.log(withdraw(100, 150));
} catch (error) {
  console.log("Withdrawal failed:", error.message);
}

//* throw transfers control to the nearest matching catch handler up the call stack.


//* ------------------------------------------------------------
//* 6. WHAT CAN BE THROWN?
//* ------------------------------------------------------------

function badThrow() {
  throw "Something failed";
}

//* JavaScript technically allows any value to be thrown.
//* Prefer throwing Error objects because they provide name/message/stack semantics.


//* ------------------------------------------------------------
//* 7. TRY / CATCH
//* ------------------------------------------------------------

function parseUser(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error("Invalid JSON:", error.message);
    return null;
  }
}

console.log(parseUser('{"name":"Ravi"}'));
console.log(parseUser("not json"));


//* ------------------------------------------------------------
//* 8. FINALLY
//* ------------------------------------------------------------

function withCleanup() {
  try {
    console.log("Start operation");
    return "success";
  } finally {
    console.log("Cleanup runs before function completion");
  }
}

console.log(withCleanup());

//* finally is useful for cleanup that must happen whether the operation succeeds or fails.


//* ------------------------------------------------------------
//* 9. FINALLY WITH ERROR
//* ------------------------------------------------------------

function cleanupAfterFailure() {
  try {
    throw new Error("Database failed");
  } catch (error) {
    console.log("Handled:", error.message);
  } finally {
    console.log("Close resource / release state");
  }
}

cleanupAfterFailure();


//* ------------------------------------------------------------
//* 10. FINALLY CAN OVERRIDE A RETURN
//* ------------------------------------------------------------

function dangerousFinally() {
  try {
    return "try value";
  } finally {
    return "finally value";
  }
}

console.log(dangerousFinally());

//* Avoid return/throw inside finally unless you deliberately want to replace the
//* pending completion. It can hide the original result/error.


//* ------------------------------------------------------------
//* 11. CATCH BINDING
//* ------------------------------------------------------------

try {
  JSON.parse("invalid");
} catch {
  console.log("Parsing failed");
}

//* If the error object is not needed, omit the catch binding.


//* ------------------------------------------------------------
//* 12. ERROR TYPE
//* ------------------------------------------------------------

const typeErrors = [
  new TypeError("Wrong value type"),
  new RangeError("Value outside allowed range"),
  new ReferenceError("Unknown variable reference"),
  new SyntaxError("Invalid syntax representation"),
  new URIError("Invalid URI encoding"),
  new EvalError("Legacy eval-related error type"),
];

for (const item of typeErrors) {
  console.log(item.name, item.message);
}

//* These built-in subclasses communicate categories of failures.
//* They do not automatically fix or validate anything.


//* ------------------------------------------------------------
//* 13. TYPEERROR
//* ------------------------------------------------------------

function requireString(value) {
  if (typeof value !== "string") {
    throw new TypeError("Expected a string");
  }

  return value.trim();
}

try {
  requireString(42);
} catch (error) {
  console.log(error.name, error.message);
}


//* ------------------------------------------------------------
//* 14. RANGEERROR
//* ------------------------------------------------------------

function setPercentage(value) {
  if (value < 0 || value > 100) {
    throw new RangeError("Percentage must be between 0 and 100");
  }

  return value;
}


//* ------------------------------------------------------------
//* 15. CUSTOM ERROR
//* ------------------------------------------------------------

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function validateEmail(email) {
  if (!email.includes("@")) {
    throw new ValidationError("Invalid email", "email");
  }

  return true;
}

try {
  validateEmail("hello");
} catch (error) {
  console.log(error.name, error.field, error.message);
}


//* ------------------------------------------------------------
//* 16. CUSTOM ERROR WITH CAUSE
//* ------------------------------------------------------------

class DatabaseError extends Error {
  constructor(message, options = {}) {
    super(message, options);
    this.name = "DatabaseError";
  }
}

function loadUserFromDatabase() {
  try {
    throw new Error("Connection refused");
  } catch (error) {
    throw new DatabaseError("Could not load user", { cause: error });
  }
}

try {
  loadUserFromDatabase();
} catch (error) {
  console.log(error.message);
  console.log("Original cause:", error.cause?.message);
}

//* Error.cause preserves the lower-level error as context while exposing a higher-level message.


//* ------------------------------------------------------------
//* 17. ERROR CHAINING
//* ------------------------------------------------------------

function serviceLayer() {
  try {
    throw new Error("Low-level failure");
  } catch (error) {
    throw new Error("Service operation failed", { cause: error });
  }
}


//* ------------------------------------------------------------
//* 18. ERROR TYPE CHECKING
//* ------------------------------------------------------------

try {
  requireString(10);
} catch (error) {
  if (error instanceof TypeError) {
    console.log("Handle type problem");
  } else {
    throw error;
  }
}

//* Catch narrowly when different error types require different actions.


//* ------------------------------------------------------------
//* 19. DON'T CATCH AND IGNORE
//* ------------------------------------------------------------

function badHandler() {
  try {
    JSON.parse("bad");
  } catch {
    //* Bad: failure disappears completely.
  }
}

//* An empty catch can be valid only when ignoring the failure is deliberate and safe.


//* ------------------------------------------------------------
//* 20. CATCH, ADD CONTEXT, RETHROW
//* ------------------------------------------------------------

function loadSettings(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    throw new Error("Failed to load settings", { cause: error });
  }
}


//* ------------------------------------------------------------
//* 21. ERROR BOUNDARIES — CONCEPT
//* ------------------------------------------------------------

//* A boundary is a layer responsible for turning failures into a meaningful outcome.
//* Examples:
//* UI boundary -> friendly error state
//* service layer -> domain-specific error
//* API layer -> HTTP response
//* process boundary -> logging + controlled shutdown


//* ------------------------------------------------------------
//* 22. ASYNC TRY / CATCH
//* ------------------------------------------------------------

async function loadData() {
  try {
    const response = await fetch("/api/data");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Loading failed:", error);
    throw error;
  }
}

//* await rejections can be handled with try/catch around the await expression.


//* ------------------------------------------------------------
//* 23. PROMISE CATCH
//* ------------------------------------------------------------

function loadDataWithThen() {
  return fetch("/api/data")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Request failed:", error);
      throw error;
    });
}


//* ------------------------------------------------------------
//* 24. FINALLY ON PROMISES
//* ------------------------------------------------------------

function requestWithPromiseCleanup() {
  return fetch("/api/data")
    .finally(() => {
      console.log("Hide spinner / cleanup state");
    });
}


//* ------------------------------------------------------------
//* 25. UNHANDLED PROMISE REJECTION
//* ------------------------------------------------------------

Promise.reject(new Error("Unhandled example"));

//* In real application code, do not intentionally leave a rejection unhandled.
//* Attach appropriate handling to promises whose failures matter.


//* ------------------------------------------------------------
//* 26. PROMISE ERROR PROPAGATION
//* ------------------------------------------------------------

Promise.resolve()
  .then(() => {
    throw new Error("Failure inside then");
  })
  .then(() => {
    console.log("Skipped");
  })
  .catch((error) => {
    console.log("Caught:", error.message);
  });


//* ------------------------------------------------------------
//* 27. ASYNC FUNCTION REJECTIONS
//* ------------------------------------------------------------

async function alwaysFails() {
  throw new Error("Async failure");
}

alwaysFails().catch((error) => {
  console.log("Handled async error:", error.message);
});

//* An async function returns a Promise. Throwing inside it causes that Promise to reject.


//* ------------------------------------------------------------
//* 28. ERROR IN setTimeout
//* ------------------------------------------------------------

setTimeout(() => {
  try {
    throw new Error("Timer callback failed");
  } catch (error) {
    console.log("Handled timer error:", error.message);
  }
}, 0);

//* A try/catch around the setTimeout call itself does not catch an exception thrown later
//* inside the timer callback. The callback executes in a later task.


//* ------------------------------------------------------------
//* 29. CALLBACK ERROR-FIRST STYLE
//* ------------------------------------------------------------

function legacyOperation(callback) {
  setTimeout(() => {
    const error = null;
    const value = "done";
    callback(error, value);
  }, 0);
}

legacyOperation((error, value) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(value);
});

//* Node-style callback APIs traditionally use (error, value).


//* ------------------------------------------------------------
//* 30. CALLBACK THROW CAVEAT
//* ------------------------------------------------------------

function callbackCaveat() {
  try {
    setTimeout(() => {
      throw new Error("Not caught by outer try");
    }, 0);
  } catch (error) {
    console.log("This will not run for the timer's throw");
  }
}

//* The important idea: asynchronous callbacks run after the surrounding synchronous
//* try/catch has already finished.


//* ------------------------------------------------------------
//* 31. OPTIONAL CHAINING IS NOT ERROR HANDLING
//* ------------------------------------------------------------

const profile = null;
console.log(profile?.address?.city);

//* Optional chaining prevents a TypeError for a nullish receiver in this access chain.
//* It does not mean the operation succeeded or that all failures are handled.


//* ------------------------------------------------------------
//* 32. NULLISH DEFAULTING
//* ------------------------------------------------------------

function getDisplayName(user) {
  return user.name ?? "Anonymous";
}

console.log(getDisplayName({ name: "Ravi" }));
console.log(getDisplayName({ name: null }));

//* ?? handles null/undefined defaults. It does not catch exceptions.


//* ------------------------------------------------------------
//* 33. VALIDATION ERROR
//* ------------------------------------------------------------

function createUser(input) {
  if (!input || typeof input.email !== "string") {
    throw new ValidationError("Email is required", "email");
  }

  return {
    id: crypto.randomUUID(),
    email: input.email.trim(),
  };
}


//* ------------------------------------------------------------
//* 34. DOMAIN ERROR
//* ------------------------------------------------------------

class InsufficientBalanceError extends Error {
  constructor(balance, requested) {
    super("Insufficient balance");
    this.name = "InsufficientBalanceError";
    this.balance = balance;
    this.requested = requested;
  }
}


//* ------------------------------------------------------------
//* 35. AUTHORIZATION ERROR
//* ------------------------------------------------------------

class AuthorizationError extends Error {
  constructor(message = "Not authorized") {
    super(message);
    this.name = "AuthorizationError";
  }
}

function requireAdmin(user) {
  if (user?.role !== "admin") {
    throw new AuthorizationError();
  }
}


//* ------------------------------------------------------------
//* 36. NOT FOUND ERROR
//* ------------------------------------------------------------

class NotFoundError extends Error {
  constructor(resource) {
    super(`${resource} not found`);
    this.name = "NotFoundError";
  }
}


//* ------------------------------------------------------------
//* 37. ERROR TO HTTP RESPONSE — SERVER CONCEPT
//* ------------------------------------------------------------

function toHttpStatus(error) {
  if (error instanceof ValidationError) return 400;
  if (error instanceof AuthorizationError) return 403;
  if (error instanceof NotFoundError) return 404;
  if (error instanceof DatabaseError) return 500;
  return 500;
}

//* In a backend, map domain errors to safe HTTP responses at the API boundary.
//* Do not expose internal stack traces or secrets to clients.


//* ------------------------------------------------------------
//* 38. SAFE ERROR RESPONSE
//* ------------------------------------------------------------

function publicError(error) {
  return {
    code: error.name || "InternalError",
    message: error instanceof ValidationError
      ? error.message
      : "Something went wrong",
  };
}

//* Internal logs can contain diagnostic detail; public responses should expose only
//* information that clients are allowed to know.


//* ------------------------------------------------------------
//* 39. ERROR CODES
//* ------------------------------------------------------------

const ERROR_CODES = Object.freeze({
  VALIDATION: "VALIDATION_ERROR",
  NOT_FOUND: "NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  CONFLICT: "CONFLICT",
  INTERNAL: "INTERNAL_ERROR",
});


//* ------------------------------------------------------------
//* 40. ERROR CODE VS MESSAGE
//* ------------------------------------------------------------

//* Code -> stable machine-readable identifier.
//* Message -> human-readable explanation.
//*
//* Clients should generally avoid branching on fragile prose such as:
//* "User does not exist!"
//* Prefer stable codes such as USER_NOT_FOUND.


//* ------------------------------------------------------------
//* 41. ASSERTION
//* ------------------------------------------------------------

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(2 + 2 === 4, "Math is broken");

//* Assertions turn assumptions into explicit checks during development/testing.


//* ------------------------------------------------------------
//* 42. ASSERTION WITH TYPE
//* ------------------------------------------------------------

function assertString(value, name = "value") {
  if (typeof value !== "string") {
    throw new TypeError(`${name} must be a string`);
  }
}


//* ------------------------------------------------------------
//* 43. DEFENSIVE PROGRAMMING
//* ------------------------------------------------------------

function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Both values must be numbers");
  }

  if (b === 0) {
    throw new RangeError("Cannot divide by zero");
  }

  return a / b;
}


//* ------------------------------------------------------------
//* 44. ERROR RECOVERY
//* ------------------------------------------------------------

async function getUserOrFallback(id) {
  try {
    return await requestUser(id);
  } catch (error) {
    console.error("Using fallback:", error.message);
    return { id, name: "Offline user" };
  }
}

async function requestUser(id) {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

//* Recovery is appropriate when the fallback is valid and the caller can continue safely.


//* ------------------------------------------------------------
//* 45. FALLBACK CAN BE DANGEROUS
//* ------------------------------------------------------------

function badFallback() {
  try {
    return JSON.parse("invalid");
  } catch {
    return {};
  }
}

//* Returning an empty object can hide corrupted state if callers assume it is valid data.
//* A fallback should preserve application invariants.


//* ------------------------------------------------------------
//* 46. RETRYABLE ERRORS
//* ------------------------------------------------------------

function isRetryableHttpStatus(status) {
  return status === 408 || status === 429 || status >= 500;
}

//* This is only a simplified policy. API semantics, method idempotency and Retry-After
//* should influence real retry decisions.


//* ------------------------------------------------------------
//* 47. NON-RETRYABLE VALIDATION ERROR
//* ------------------------------------------------------------

function submitEmail(email) {
  if (!email.includes("@")) {
    throw new ValidationError("Invalid email", "email");
  }

  return "submitted";
}

//* Retrying invalid input without changing the input normally cannot solve the problem.


//* ------------------------------------------------------------
//* 48. ABORTED OPERATION
//* ------------------------------------------------------------

async function abortableRequest(url, signal) {
  try {
    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request cancelled intentionally");
      return null;
    }

    throw error;
  }
}

//* Cancellation is often a control-flow event rather than an application failure.
//* Whether you log it as an error depends on your application's needs.


//* ------------------------------------------------------------
//* 49. ERROR CLASSIFICATION
//* ------------------------------------------------------------

function classifyError(error) {
  if (error?.name === "AbortError") return "cancelled";
  if (error instanceof ValidationError) return "validation";
  if (error instanceof AuthorizationError) return "authorization";
  if (error instanceof NotFoundError) return "not-found";
  if (error instanceof TypeError) return "type";
  return "unknown";
}


//* ------------------------------------------------------------
//* 50. LOGGING LEVELS — CONCEPT
//* ------------------------------------------------------------

//* Common conceptual levels:
//* debug -> detailed developer diagnostics
//* info  -> normal operational events
//* warn  -> unusual but recoverable situation
//* error -> failure requiring attention
//*
//* Exact logging APIs and levels depend on the runtime/framework.


//* ------------------------------------------------------------
//* 51. STRUCTURED LOGGING
//* ------------------------------------------------------------

const logEvent = {
  level: "error",
  event: "user_load_failed",
  userId: "user-123",
  code: "DATABASE_ERROR",
};

console.log(JSON.stringify(logEvent));

//* Structured logs are easier for systems to search, aggregate and analyze.


//* ------------------------------------------------------------
//* 52. NEVER LOG SECRETS
//* ------------------------------------------------------------

const safeLog = {
  userId: "user-123",
  operation: "login",
  success: false,
};

console.log(safeLog);

//* Avoid logging passwords, access tokens, refresh tokens, private keys and sensitive data.


//* ------------------------------------------------------------
//* 53. STACK TRACE
//* ------------------------------------------------------------

function levelOne() {
  return levelTwo();
}

function levelTwo() {
  throw new Error("Trace me");
}

try {
  levelOne();
} catch (error) {
  console.log(error.stack);
}

//* Stack traces show useful execution context for debugging, though exact formatting varies by runtime.


//* ------------------------------------------------------------
//* 54. ERROR STACK IS DIAGNOSTIC DATA
//* ------------------------------------------------------------

//* Do not assume stack strings have a universal format.
//* Treat stack traces as diagnostic information rather than an API contract.


//* ------------------------------------------------------------
//* 55. RE-THROW UNKNOWN ERRORS
//* ------------------------------------------------------------

function parseConfig(value) {
  try {
    return JSON.parse(value);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return null;
    }

    throw error;
  }
}

//* Handle only the errors you understand. Rethrow unexpected failures.


//* ------------------------------------------------------------
//* 56. NESTED TRY / CATCH
//* ------------------------------------------------------------

function nestedHandling() {
  try {
    try {
      throw new ValidationError("Bad username", "username");
    } catch (error) {
      console.log("Inner handler:", error.message);
      throw error;
    }
  } catch (error) {
    console.log("Outer handler:", error.name);
  }
}

nestedHandling();


//* ------------------------------------------------------------
//* 57. ERROR BOUNDARY DESIGN
//* ------------------------------------------------------------

function controller(input) {
  try {
    return service(input);
  } catch (error) {
    console.error("Controller received:", error);
    return { ok: false, error: publicError(error) };
  }
}

function service(input) {
  if (!input) throw new ValidationError("Input required", "input");
  return { ok: true, value: input };
}

//* One layer translates errors while lower layers retain meaningful error types.


//* ------------------------------------------------------------
//* 58. ERROR HANDLING IN MODULES
//* ------------------------------------------------------------

//* A module should generally expose errors that its callers can meaningfully understand.
//* Avoid forcing every caller to know low-level implementation details.


//* ------------------------------------------------------------
//* 59. ERROR HANDLING IN CLASSES
//* ------------------------------------------------------------

class UserService {
  getUser(id) {
    if (!id) throw new ValidationError("User ID required", "id");
    throw new NotFoundError("User");
  }
}

try {
  new UserService().getUser("42");
} catch (error) {
  console.log(error.name, error.message);
}


//* ------------------------------------------------------------
//* 60. ERROR HANDLING IN EVENT LISTENERS
//* ------------------------------------------------------------

function attachSafeClick(button) {
  button.addEventListener("click", () => {
    try {
      performAction();
    } catch (error) {
      console.error("Click action failed:", error);
    }
  });
}

function performAction() {
  console.log("Action");
}

//* Event handlers are independent execution boundaries. Handle failures where appropriate.


//* ------------------------------------------------------------
//* 61. ERROR HANDLING AND UI STATE
//* ------------------------------------------------------------

const uiState = {
  status: "idle",
  data: null,
  error: null,
};

function setLoading() {
  uiState.status = "loading";
  uiState.error = null;
}

function setSuccess(data) {
  uiState.status = "success";
  uiState.data = data;
  uiState.error = null;
}

function setError(error) {
  uiState.status = "error";
  uiState.error = error.message;
}

//* A clear UI state model prevents errors from being represented by scattered booleans.


//* ------------------------------------------------------------
//* 62. LOADING / SUCCESS / ERROR
//* ------------------------------------------------------------

async function loadProfileUI() {
  setLoading();

  try {
    const data = await requestUser("42");
    setSuccess(data);
  } catch (error) {
    setError(error);
  }
}


//* ------------------------------------------------------------
//* 63. ERROR + CONCURRENCY
//* ------------------------------------------------------------

async function loadMany() {
  const results = await Promise.allSettled([
    requestUser("1"),
    requestUser("2"),
    requestUser("3"),
  ]);

  return results.map((result) =>
    result.status === "fulfilled"
      ? { ok: true, value: result.value }
      : { ok: false, error: result.reason },
  );
}

//* allSettled is useful when independent failures should not cancel successful operations.


//* ------------------------------------------------------------
//* 64. ERROR + Promise.all
//* ------------------------------------------------------------

async function loadRequiredData() {
  const [user, settings] = await Promise.all([
    requestUser("42"),
    requestJson("/api/settings"),
  ]);

  return { user, settings };
}

//* Promise.all rejects when one member rejects; use it when all results are required.


//* ------------------------------------------------------------
//* 65. ERROR + Promise.any
//* ------------------------------------------------------------

async function loadFromMirrors(urls) {
  try {
    return await Promise.any(urls.map((url) => requestJson(url)));
  } catch (error) {
    //* If every promise rejects, error is an AggregateError.
    console.log(error.name);
    console.log(error.errors);
    throw error;
  }
}


//* ------------------------------------------------------------
//* 66. AGGREGATEERROR
//* ------------------------------------------------------------

const aggregate = new AggregateError(
  [new Error("A failed"), new Error("B failed")],
  "All operations failed",
);

console.log(aggregate.name);
console.log(aggregate.errors.length);


//* ------------------------------------------------------------
//* 67. ERROR HANDLING IN RETRIES
//* ------------------------------------------------------------

async function retry(operation, attempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt === attempts) break;
      await new Promise((resolve) => setTimeout(resolve, 200 * 2 ** (attempt - 1)));
    }
  }

  throw lastError;
}

//* Never silently discard the final failure after all retries are exhausted.


//* ------------------------------------------------------------
//* 68. RETRY + IDEMPOTENCY
//* ------------------------------------------------------------

//* Retrying a GET is often safer than blindly retrying a state-changing operation.
//* For POST/payment/order operations, use an API-supported idempotency strategy when needed.


//* ------------------------------------------------------------
//* 69. ERROR TIMEOUT
//* ------------------------------------------------------------

async function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Operation timed out")), ms);
  });

  return Promise.race([promise, timeout]);
}

//* Promise.race does not automatically cancel the original operation.
//* AbortController is preferable when the underlying API supports cancellation.


//* ------------------------------------------------------------
//* 70. ABORT VS TIMEOUT
//* ------------------------------------------------------------

//* Timeout = a policy saying "stop waiting after this duration".
//* Abort = a cancellation signal sent to an abort-aware operation.
//* They can be combined.


//* ------------------------------------------------------------
//* 71. ERROR HANDLING WITH RESOURCE CLEANUP
//* ------------------------------------------------------------

async function useResource(resource) {
  try {
    return await resource.read();
  } finally {
    await resource.close();
  }
}

//* finally is especially useful for releasing locks, listeners, connections or other resources.


//* ------------------------------------------------------------
//* 72. DISPOSABLE RESOURCE CONCEPT
//* ------------------------------------------------------------

class Resource {
  close() {
    console.log("Resource closed");
  }

  read() {
    return "data";
  }
}

async function processResource() {
  const resource = new Resource();

  try {
    return resource.read();
  } finally {
    resource.close();
  }
}

console.log(processResource());


//* ------------------------------------------------------------
//* 73. CLEANUP ORDER
//* ------------------------------------------------------------

function cleanupOrder() {
  try {
    console.log("work");
  } finally {
    console.log("cleanup");
  }
}

cleanupOrder();

//* Cleanup should restore invariants rather than accidentally introduce new failures.


//* ------------------------------------------------------------
//* 74. CLEANUP ERROR POLICY
//* ------------------------------------------------------------

async function cleanupPolicy(resource) {
  try {
    await resource.use();
  } finally {
    try {
      await resource.close();
    } catch (cleanupError) {
      console.error("Cleanup failed:", cleanupError);
    }
  }
}

//* Whether cleanup failure should replace the original failure depends on the resource's semantics.


//* ------------------------------------------------------------
//* 75. ERROR WRAPPING
//* ------------------------------------------------------------

function wrapError(operation, error) {
  return new Error(`${operation} failed`, { cause: error });
}

try {
  throw wrapError("Payment", new Error("Gateway timeout"));
} catch (error) {
  console.log(error.message);
  console.log(error.cause.message);
}


//* ------------------------------------------------------------
//* 76. PRESERVE ERROR CONTEXT
//* ------------------------------------------------------------

function repositoryLayer() {
  throw new Error("MongoDB connection failed");
}

function serviceLayerWithContext() {
  try {
    return repositoryLayer();
  } catch (error) {
    throw new Error("Could not create user", { cause: error });
  }
}


//* ------------------------------------------------------------
//* 77. DOMAIN VS INFRASTRUCTURE ERRORS
//* ------------------------------------------------------------

//* Domain error:
//* "Cannot transfer more than available balance."
//*
//* Infrastructure error:
//* "Database connection timed out."
//*
//* Separating them helps the application decide whether to show a user-facing
//* message, retry, return a specific HTTP status, or alert an operator.


//* ------------------------------------------------------------
//* 78. ERROR TRANSLATION
//* ------------------------------------------------------------

function translateRepositoryError(error) {
  if (error.code === "ECONNREFUSED") {
    return new DatabaseError("Database unavailable", { cause: error });
  }

  return error;
}


//* ------------------------------------------------------------
//* 79. ERROR CODES FROM DATABASES/APIS
//* ------------------------------------------------------------

function isDuplicateKey(error) {
  return error?.code === "DUPLICATE_KEY";
}

//* Infrastructure-specific codes should normally be translated at an appropriate boundary
//* instead of leaking implementation details throughout the application.


//* ------------------------------------------------------------
//* 80. USER-FACING ERROR MESSAGES
//* ------------------------------------------------------------

function userMessage(error) {
  if (error instanceof ValidationError) {
    return error.message;
  }

  if (error instanceof AuthorizationError) {
    return "You do not have permission to perform this action.";
  }

  return "Something went wrong. Please try again.";
}


//* ------------------------------------------------------------
//* 81. ERROR HANDLING SHOULD PRESERVE UX
//* ------------------------------------------------------------

//* Good UI error handling should answer:
//* - What failed?
//* - Can the user fix it?
//* - Can they retry?
//* - Was the operation cancelled intentionally?
//* - Is data still safe/consistent?


//* ------------------------------------------------------------
//* 82. VALIDATION AT BOUNDARIES
//* ------------------------------------------------------------

function parsePositiveInteger(value) {
  const number = Number(value);

  if (!Number.isInteger(number) || number <= 0) {
    throw new ValidationError("Expected a positive integer", "value");
  }

  return number;
}


//* ------------------------------------------------------------
//* 83. JSON PARSE ERROR
//* ------------------------------------------------------------

function parseConfigSafely(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new ValidationError("Configuration is not valid JSON", "config");
    }

    throw error;
  }
}


//* ------------------------------------------------------------
//* 84. JSON STRINGIFY CAN FAIL
//* ------------------------------------------------------------

function safeStringify(value) {
  try {
    return JSON.stringify(value);
  } catch (error) {
    console.error("Serialization failed:", error.message);
    return null;
  }
}

//* Circular structures can cause JSON.stringify to throw.


//* ------------------------------------------------------------
//* 85. CIRCULAR DATA
//* ------------------------------------------------------------

const circular = {};
circular.self = circular;

console.log(safeStringify(circular));


//* ------------------------------------------------------------
//* 86. JSON SERIALIZATION LOSS
//* ------------------------------------------------------------

const serialized = JSON.stringify({
  date: new Date("2026-01-01T00:00:00Z"),
  value: undefined,
});

console.log(serialized);

//* JSON serialization can transform or omit values. Do not assume round-tripping
//* preserves every JavaScript value/type.


//* ------------------------------------------------------------
//* 87. REGEX ERROR
//* ------------------------------------------------------------

function createRegex(pattern) {
  try {
    return new RegExp(pattern);
  } catch (error) {
    throw new ValidationError("Invalid regular expression", "pattern");
  }
}


//* ------------------------------------------------------------
//* 88. URL ERROR
//* ------------------------------------------------------------

function parseUrl(value) {
  try {
    return new URL(value);
  } catch {
    throw new ValidationError("Invalid URL", "url");
  }
}


//* ------------------------------------------------------------
//* 89. BROWSER API AVAILABILITY
//* ------------------------------------------------------------

function useOptionalApi() {
  if (!navigator.clipboard) {
    throw new Error("Clipboard API unavailable");
  }

  return navigator.clipboard;
}

//* Feature detection is different from permission and successful operation.


//* ------------------------------------------------------------
//* 90. PERMISSION ERROR CONCEPT
//* ------------------------------------------------------------

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Clipboard operation failed:", error);
    throw error;
  }
}

//* Browser APIs may fail because of permission, user-activation, secure-context or platform rules.


//* ------------------------------------------------------------
//* 91. NETWORK ERROR
//* ------------------------------------------------------------

async function fetchWithNetworkHandling(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  } catch (error) {
    console.log("Could be network/abort/HTTP handling failure:", error.message);
    throw error;
  }
}

//* fetch normally rejects for network/abort-type failures, not simply because the server
//* returned an HTTP error status.


//* ------------------------------------------------------------
//* 92. ERROR NORMALIZATION
//* ------------------------------------------------------------

function normalizeError(error) {
  if (error instanceof Error) return error;

  return new Error(String(error));
}

console.log(normalizeError("legacy failure").message);

//* Useful at boundaries where third-party/legacy code may throw arbitrary values.


//* ------------------------------------------------------------
//* 93. ERROR HANDLING THIRD-PARTY CODE
//* ------------------------------------------------------------

function callUntrustedLibrary(libraryFn) {
  try {
    return libraryFn();
  } catch (error) {
    const normalized = normalizeError(error);
    throw new Error("Third-party operation failed", { cause: normalized });
  }
}


//* ------------------------------------------------------------
//* 94. DON'T USE try/catch FOR NORMAL CONTROL FLOW
//* ------------------------------------------------------------

function badLookup(map, key) {
  try {
    return map.get(key).name;
  } catch {
    return "missing";
  }
}

function betterLookup(map, key) {
  const value = map.get(key);
  return value?.name ?? "missing";
}

//* Prefer ordinary conditionals for expected branches. Exceptions are for exceptional failures.


//* ------------------------------------------------------------
//* 95. ERROR HANDLING COST / CLARITY
//* ------------------------------------------------------------

//* The biggest concern is usually not "try/catch is slow" but whether exceptions are
//* being used clearly and whether error paths preserve correctness and observability.


//* ------------------------------------------------------------
//* 96. FAIL FAST
//* ------------------------------------------------------------

function createConfig(config) {
  if (!config) throw new ValidationError("Config required", "config");
  if (!config.apiUrl) throw new ValidationError("API URL required", "apiUrl");

  return config;
}

//* Fail fast when an invalid invariant would make continuing unsafe or meaningless.


//* ------------------------------------------------------------
//* 97. FAIL SAFE
//* ------------------------------------------------------------

function readFeatureFlag(flags, name) {
  try {
    return Boolean(flags[name]);
  } catch {
    return false;
  }
}

//* A safe default is appropriate only if it does not create a security or correctness problem.


//* ------------------------------------------------------------
//* 98. SECURITY: DON'T HIDE AUTHORIZATION FAILURES
//* ------------------------------------------------------------

function checkPermission(user, action) {
  if (!user) throw new AuthorizationError("Authentication required");
  if (!user.permissions?.includes(action)) {
    throw new AuthorizationError("Permission denied");
  }
}

//* Never convert an authorization failure into successful behavior merely to make the UI continue.


//* ------------------------------------------------------------
//* 99. SECURITY: DON'T TRUST ERROR INPUT
//* ------------------------------------------------------------

function safeDisplayError(error) {
  const message = error instanceof Error
    ? error.message
    : "Unknown error";

  return String(message);
}

//* Error messages can contain attacker-controlled input. Escape them appropriately for the
//* output context; don't inject them into innerHTML as raw HTML.


//* ------------------------------------------------------------
//* 100. GLOBAL ERROR EVENTS — BROWSER
//* ------------------------------------------------------------

window.addEventListener("error", (event) => {
  console.error("Global error event:", event.error || event.message);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled rejection:", event.reason);
});

//* These are observability/fallback boundaries, not a replacement for local error handling.


//* ------------------------------------------------------------
//* 101. GLOBAL ERROR EVENTS — NODE CONCEPT
//* ------------------------------------------------------------

//* Node.js provides process-level mechanisms such as uncaughtException and
//* unhandledRejection. Treat them as last-resort process boundaries, not normal control flow.
//* After an uncaught exception, application state may be unsafe; blindly continuing can be dangerous.


//* ------------------------------------------------------------
//* 102. GRACEFUL SHUTDOWN CONCEPT
//* ------------------------------------------------------------

//* On process termination/shutdown:
//* 1. stop accepting new work
//* 2. finish/cancel important in-flight work where appropriate
//* 3. close servers/connections
//* 4. flush important telemetry/logs
//* 5. exit within a bounded time


//* ------------------------------------------------------------
//* 103. PROCESS-LEVEL FAILURE
//* ------------------------------------------------------------

//* A process-level crash is different from a recoverable request-level error.
//* Design the application so one bad request does not normally terminate the whole service.


//* ------------------------------------------------------------
//* 104. OBSERVABILITY
//* ------------------------------------------------------------

const telemetryEvent = {
  event: "request_failed",
  route: "/api/users",
  status: 500,
  requestId: "req-123",
};

console.log(telemetryEvent);

//* Production systems commonly correlate errors with request/trace IDs, timestamps,
//* service names and safe contextual metadata.


//* ------------------------------------------------------------
//* 105. REQUEST ID
//* ------------------------------------------------------------

function makeRequestId() {
  return crypto.randomUUID();
}

console.log(makeRequestId());

//* Request IDs help correlate frontend, gateway and backend logs.


//* ------------------------------------------------------------
//* 106. ERROR MONITORING CONCEPT
//* ------------------------------------------------------------

//* Error monitoring tools aggregate exceptions, stack traces, environment metadata,
//* releases and frequency so teams can identify regressions and high-impact failures.


//* ------------------------------------------------------------
//* 107. SOURCE MAP CONCEPT
//* ------------------------------------------------------------

//* Source maps can map transformed/minified code locations back to source files,
//* making production stack traces easier to debug.
//* Treat source maps as potentially sensitive deployment artifacts.


//* ------------------------------------------------------------
//* 108. TEST ERROR PATHS
//* ------------------------------------------------------------

function mustFail() {
  throw new ValidationError("Expected failure", "field");
}

try {
  mustFail();
} catch (error) {
  console.log(error instanceof ValidationError); // true
}

//* Error paths are part of application behavior and should be tested deliberately.


//* ------------------------------------------------------------
//* 109. OUTPUT PREDICTION
//* ------------------------------------------------------------

try {
  console.log("A");
  throw new Error("B");
  console.log("C");
} catch (error) {
  console.log(error.message);
} finally {
  console.log("D");
}

//* Output:
//* A
//* B
//* D


//* ------------------------------------------------------------
//* 110. OUTPUT PREDICTION — ASYNC
//* ------------------------------------------------------------

console.log("1");

Promise.resolve()
  .then(() => {
    console.log("2");
    throw new Error("3");
  })
  .catch((error) => {
    console.log(error.message);
  });

console.log("4");

//* Typical output:
//* 1
//* 4
//* 2
//* 3


//* ------------------------------------------------------------
//* 111. DEBUGGING METHOD
//* ------------------------------------------------------------

//* When debugging an error, ask:
//* 1. What exact operation failed?
//* 2. What was the input?
//* 3. What type/value did the program actually receive?
//* 4. Where was the error created?
//* 5. Where was it caught?
//* 6. Was it handled, rethrown or swallowed?
//* 7. Is the error expected or unexpected?
//* 8. Can the operation be safely retried?
//* 9. Did cleanup run?
//* 10. Did the UI/backend preserve a valid state?


//* ------------------------------------------------------------
//* 112. DEBUGGING WITH BREAKPOINTS
//* ------------------------------------------------------------

function debugMe(value) {
  debugger;
  return value * 2;
}

//* With developer tools open, debugger can pause execution at this statement.


//* ------------------------------------------------------------
//* 113. DEBUGGING VARIABLES
//* ------------------------------------------------------------

function inspectInput(input) {
  console.log({
    input,
    type: typeof input,
    isArray: Array.isArray(input),
  });
}

inspectInput([1, 2, 3]);


//* ------------------------------------------------------------
//* 114. DEBUGGING STACKS
//* ------------------------------------------------------------

function a() { return b(); }
function b() { return c(); }
function c() { throw new Error("Trace call stack"); }

try {
  a();
} catch (error) {
  console.log(error.stack);
}


//* ------------------------------------------------------------
//* 115. COMMON MISTAKE — WRONG CATCH LOCATION
//* ------------------------------------------------------------

function wrongAsyncCatch() {
  try {
    Promise.reject(new Error("Later rejection"));
  } catch {
    console.log("Not reached");
  }
}

//* Correct idea:
Promise.reject(new Error("Handled rejection"))
  .catch((error) => console.log(error.message));


//* ------------------------------------------------------------
//* 116. COMMON MISTAKE — SWALLOWING
//* ------------------------------------------------------------

function swallowedError() {
  try {
    throw new Error("Important failure");
  } catch (error) {
    console.log("Do not silently discard:", error.message);
  }
}

swallowedError();


//* ------------------------------------------------------------
//* 117. COMMON MISTAKE — THROWING STRING
//* ------------------------------------------------------------

function preferError() {
  //* Avoid:
  //* throw "failed";
  //* Prefer:
  throw new Error("failed");
}


//* ------------------------------------------------------------
//* 118. COMMON MISTAKE — CATCH EVERYTHING
//* ------------------------------------------------------------

function catchEverything() {
  try {
    return JSON.parse("bad");
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    return null;
  }
}

//* Broad catches are acceptable at real boundaries, but lower layers should avoid hiding
//* errors they cannot meaningfully handle.


//* ------------------------------------------------------------
//* 119. COMMON MISTAKE — RETURN IN FINALLY
//* ------------------------------------------------------------

function neverDoThisWithout Intent() {
  try {
    throw new Error("Original failure");
  } finally {
    //* A return here would suppress the original exception.
  }
}


//* ------------------------------------------------------------
//* 120. COMMON MISTAKE — ERROR MESSAGE AS TYPE
//* ------------------------------------------------------------

function badErrorCheck(error) {
  if (error.message === "User not found") {
    console.log("Fragile string-based branching");
  }
}

//* Prefer custom error classes/codes for stable programmatic decisions.


//* ------------------------------------------------------------
//* 121. MINI PROJECT: SAFE JSON PARSER
//* ------------------------------------------------------------

function safeJsonParse(text) {
  try {
    return {
      ok: true,
      value: JSON.parse(text),
    };
  } catch (error) {
    return {
      ok: false,
      error: new ValidationError("Invalid JSON", "text"),
      cause: error,
    };
  }
}

console.log(safeJsonParse('{"ok":true}'));
console.log(safeJsonParse("broken"));


//* ------------------------------------------------------------
//* 122. MINI PROJECT: RESULT PATTERN
//* ------------------------------------------------------------

function ok(value) {
  return { ok: true, value };
}

function fail(error) {
  return { ok: false, error };
}

function divideResult(a, b) {
  if (b === 0) return fail(new RangeError("Division by zero"));
  return ok(a / b);
}

console.log(divideResult(10, 2));
console.log(divideResult(10, 0));

//* Result-style APIs represent expected failure as data rather than exceptions.
//* Choose this pattern when it improves clarity; it is not a universal replacement for throw.


//* ------------------------------------------------------------
//* 123. RESULT CONSUMPTION
//* ------------------------------------------------------------

function useResult(result) {
  if (!result.ok) {
    console.log("Failed:", result.error.message);
    return;
  }

  console.log("Value:", result.value);
}

useResult(divideResult(10, 0));
useResult(divideResult(10, 2));


//* ------------------------------------------------------------
//* 124. MINI PROJECT: API ERROR NORMALIZER
//* ------------------------------------------------------------

function normalizeApiFailure(response, body) {
  return {
    status: response.status,
    code: body?.code ?? "HTTP_ERROR",
    message: body?.message ?? `HTTP ${response.status}`,
  };
}

console.log(normalizeApiFailure(
  { status: 404 },
  { code: "USER_NOT_FOUND", message: "User not found" },
));


//* ------------------------------------------------------------
//* 125. MINI PROJECT: RETRY POLICY
//* ------------------------------------------------------------

function retryPolicy(error, attempt) {
  if (error instanceof ValidationError) return false;
  if (error instanceof AuthorizationError) return false;
  if (attempt >= 3) return false;

  return true;
}

console.log(retryPolicy(new Error("Server unavailable"), 1));


//* ------------------------------------------------------------
//* 126. MINI PROJECT: SAFE OPERATION WRAPPER
//* ------------------------------------------------------------

async function safeOperation(operation) {
  try {
    return { ok: true, value: await operation() };
  } catch (error) {
    return { ok: false, error: normalizeError(error) };
  }
}


//* ------------------------------------------------------------
//* 127. MINI PROJECT: ERROR REPORTER
//* ------------------------------------------------------------

function reportError(error, context = {}) {
  const normalized = normalizeError(error);

  console.error({
    name: normalized.name,
    message: normalized.message,
    context,
  });
}

reportError(new Error("Example"), { feature: "profile" });


//* ------------------------------------------------------------
//* 128. MINI PROJECT: VALIDATION PIPELINE
//* ------------------------------------------------------------

function validateUserInput(input) {
  assert(input && typeof input === "object", "Input must be an object");
  assertString(input.name, "name");
  assertString(input.email, "email");

  if (!input.email.includes("@")) {
    throw new ValidationError("Invalid email", "email");
  }

  return true;
}


//* ------------------------------------------------------------
//* 129. MINI PROJECT: ERROR-AWARE FETCH WRAPPER
//* ------------------------------------------------------------

async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`API request failed: ${url}`, { cause: error });
  }
}


//* ------------------------------------------------------------
//* 130. CODING CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1: Create a custom ValidationError.
//* Challenge 2: Write a safe JSON parser.
//* Challenge 3: Build an Error -> HTTP status mapper.
//* Challenge 4: Create an error normalization utility.
//* Challenge 5: Implement retry with retryable/non-retryable classification.
//* Challenge 6: Build a timeout + AbortController utility.
//* Challenge 7: Build a Result<T>-style success/failure helper in JavaScript.
//* Challenge 8: Create an API error response formatter.
//* Challenge 9: Build a request error logger with request IDs.
//* Challenge 10: Build a resource wrapper that always cleans up.
//* Challenge 11: Handle Promise.allSettled results and show partial failures.
//* Challenge 12: Build a domain error hierarchy for an e-commerce API.
//* Challenge 13: Add error causes while preserving the original failure.
//* Challenge 14: Build a frontend loading/success/error state machine.
//* Challenge 15: Debug ten intentionally broken async error handlers.


//* ------------------------------------------------------------
//* 131. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1: try/catch does not catch a timer callback error.
//* Debug 2: fetch 404 is treated as success.
//* Debug 3: a catch block hides every failure.
//* Debug 4: finally suppresses the original exception.
//* Debug 5: an async function rejection is never handled.
//* Debug 6: retry loops duplicate a payment operation.
//* Debug 7: cleanup does not run after an early return.
//* Debug 8: UI shows success after a stale request fails.
//* Debug 9: backend returns stack traces to users.
//* Debug 10: authorization failure is converted into an empty successful response.


//* ------------------------------------------------------------
//* 132. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is the difference between syntax, runtime and logical errors?
//* 2. What does throw do?
//* 3. Why prefer Error objects?
//* 4. How does try/catch work?
//* 5. When does finally run?
//* 6. Why can return in finally be dangerous?
//* 7. What is Error.cause?
//* 8. Why create custom error classes?
//* 9. How do async errors differ from synchronous errors?
//* 10. Why doesn't an outer try/catch catch a later timer throw?
//* 11. What is an unhandled rejection?
//* 12. When should an error be rethrown?
//* 13. What makes an error retryable?
//* 14. Why does idempotency matter for retries?
//* 15. What is graceful degradation?
//* 16. What is fail fast?
//* 17. What is a domain error?
//* 18. What belongs in a public API error response?
//* 19. Why should secrets never be logged?
//* 20. Why is global error handling not enough?


//* ------------------------------------------------------------
//* 133. INTERVIEW QUESTIONS
//* ------------------------------------------------------------

//* Q1. Explain JavaScript's exception mechanism.
//* Q2. Explain try/catch/finally execution.
//* Q3. What happens when an exception is not caught?
//* Q4. What is the difference between throw and return?
//* Q5. Why use custom Error subclasses?
//* Q6. Explain Error.cause.
//* Q7. How do Promise rejections propagate?
//* Q8. Why does async throw become Promise rejection?
//* Q9. Why doesn't try/catch around setTimeout catch its callback exception?
//* Q10. How should fetch errors be handled?
//* Q11. What is the difference between network errors and HTTP errors?
//* Q12. How do you design retry policies?
//* Q13. What is idempotency and why does it matter?
//* Q14. How do you prevent stale async errors from corrupting UI state?
//* Q15. What is an error boundary?
//* Q16. What information should be logged?
//* Q17. Why should production responses hide stack traces?
//* Q18. How would you implement graceful shutdown?
//* Q19. Result pattern vs exceptions?
//* Q20. How do you test failure paths?


//* ============================================================
//* FINAL MENTAL MODEL
//* ============================================================

//* Good error handling is NOT:
//* "Put try/catch everywhere."
//*
//* Good error handling is:
//*
//* 1. Validate important inputs and invariants.
//* 2. Detect failures at the operation that can observe them.
//* 3. Classify expected vs unexpected failures.
//* 4. Recover only when a safe recovery exists.
//* 5. Add context when translating/rethrowing.
//* 6. Preserve the original cause.
//* 7. Clean up resources reliably.
//* 8. Avoid swallowing failures.
//* 9. Protect users from internal/sensitive details.
//* 10. Log enough context to debug production failures.
//* 11. Test error paths, not only happy paths.
//* 12. Treat cancellation, validation and authorization according to their semantics.
//*
//* Master this chapter and you should be able to explain not only "how to catch an error",
//* but how failures move through a real JavaScript application from low-level operation to UI/API boundary.

//* END OF ERROR HANDLING
