/*
 * JavaScript Zero to Master
 * Chapter 21 — Testing
 * Companion JavaScript File
 *
 * Goal:
 * Learn testing from first principles: what to test, how to structure tests,
 * assertions, test doubles, async tests, integration tests, browser testing,
 * property-based thinking, coverage, debugging, and test design.
 *
 * This file intentionally uses a tiny assertion helper so the examples can
 * run with plain modern Node.js without requiring a test framework.
 *
 * Run:
 *   node testing.js
 */

console.log("=== 21. Testing ===");

// ============================================================
// 1. WHAT IS SOFTWARE TESTING?
// ============================================================
// Definition:
// Software testing is the systematic process of checking whether software
// behaves as expected for selected inputs and conditions.
//
// A test usually has:
//   Arrange -> Act -> Assert
//
// Testing gives evidence about behavior. It does not mathematically prove
// that a program has no bugs.

// ============================================================
// 2. WHY DO WE TEST?
// ============================================================
// Tests help us:
// 1. Detect regressions.
// 2. Document expected behavior.
// 3. Refactor with confidence.
// 4. Find edge cases.
// 5. Make debugging faster.
// 6. Define a reliable contract for code.

// ============================================================
// 3. A TINY ASSERTION LIBRARY
// ============================================================
// An assertion checks an expected condition. Real projects commonly use
// frameworks such as Node's built-in node:test, Vitest, Jest, or other tools.

function assert(condition, message = "Assertion failed") {
  if (!condition) {
    throw new Error(message);
  }
}

function assertEqual(actual, expected, message = "Values are not equal") {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${expected}, received ${actual}`);
  }
}

function assertDeepEqual(actual, expected, message = "Values are not deeply equal") {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);

  if (actualJson !== expectedJson) {
    throw new Error(
      `${message}: expected ${expectedJson}, received ${actualJson}`,
    );
  }
}

function assertThrows(fn, message = "Expected function to throw") {
  let didThrow = false;

  try {
    fn();
  } catch {
    didThrow = true;
  }

  if (!didThrow) {
    throw new Error(message);
  }
}

// ============================================================
// 4. THE FUNCTION WE WANT TO TEST
// ============================================================
// Good tests become easier when business logic is small and deterministic.

function add(a, b) {
  return a + b;
}

// Arrange
const first = 10;
const second = 5;

// Act
const sum = add(first, second);

// Assert
assertEqual(sum, 15, "add() should add two numbers");

console.log("Basic assertion passed");

// ============================================================
// 5. TEST CASES
// ============================================================
// Definition:
// A test case is a specific scenario with an input, expected behavior, and
// usually an assertion.

function isEven(number) {
  return number % 2 === 0;
}

assertEqual(isEven(2), true);
assertEqual(isEven(3), false);
assertEqual(isEven(0), true);
assertEqual(isEven(-4), true);

console.log("isEven() tests passed");

// ============================================================
// 6. HAPPY PATH, EDGE CASE, ERROR CASE
// ============================================================
// Happy path: normal valid input.
// Edge case: boundary or unusual input.
// Error case: invalid input that should be rejected.

function divide(a, b) {
  if (b === 0) {
    throw new RangeError("Cannot divide by zero");
  }

  return a / b;
}

// Happy path
assertEqual(divide(10, 2), 5);

// Edge case
assertEqual(divide(0, 10), 0);

// Error case
assertThrows(() => divide(10, 0));

console.log("Happy/edge/error tests passed");

// ============================================================
// 7. TESTABLE FUNCTION DESIGN
// ============================================================
// A function is easier to test when it has:
// - explicit inputs
// - predictable outputs
// - small responsibility
// - minimal hidden state
// - controlled side effects

function calculateDiscount(price, percentage) {
  if (price < 0) throw new RangeError("Price cannot be negative");
  if (percentage < 0 || percentage > 100) {
    throw new RangeError("Discount must be between 0 and 100");
  }

  return price - price * (percentage / 100);
}

assertEqual(calculateDiscount(1000, 10), 900);
assertEqual(calculateDiscount(1000, 0), 1000);
assertEqual(calculateDiscount(1000, 100), 0);
assertThrows(() => calculateDiscount(-1, 10));
assertThrows(() => calculateDiscount(100, 101));

console.log("calculateDiscount() tests passed");

// ============================================================
// 8. TEST SUITES AND TEST NAMES
// ============================================================
// Real test frameworks group tests into suites and give each test a readable
// name. Good names describe behavior, not implementation details.
//
// Better:
//   "returns zero when cart is empty"
//
// Less useful:
//   "calls reduce twice"

// ============================================================
// 9. ARRANGE -> ACT -> ASSERT
// ============================================================
// This structure keeps tests easy to scan.

function getFullName(user) {
  return `${user.firstName} ${user.lastName}`;
}

// Arrange
const user = { firstName: "Ravi", lastName: "Kumar" };

// Act
const fullName = getFullName(user);

// Assert
assertEqual(fullName, "Ravi Kumar");

// ============================================================
// 10. EQUALITY ASSERTIONS
// ============================================================
// Strict equality is appropriate for primitive values in many tests.

assertEqual(2 + 2, 4);
assertEqual("js".toUpperCase(), "JS");
assertEqual(Boolean(1), true);

// ============================================================
// 11. DEEP EQUALITY
// ============================================================
// Objects and arrays are reference values, so === compares identity.

const actualUser = { id: 1, name: "Ravi" };
const expectedUser = { id: 1, name: "Ravi" };

assert(actualUser !== expectedUser, "Different objects have different identities");
assertDeepEqual(actualUser, expectedUser);

console.log("Deep equality example passed");

// Note: JSON.stringify comparison is a teaching helper, not a general-purpose
// deep-equality algorithm. It has limitations around undefined, functions,
// Maps, Sets, property ordering, cycles, and special object types.

// ============================================================
// 12. BOUNDARY TESTING
// ============================================================
// Test values around important boundaries.

function isAdultAge(age) {
  return age >= 18;
}

assertEqual(isAdultAge(17), false); // below boundary
assertEqual(isAdultAge(18), true);  // boundary
assertEqual(isAdultAge(19), true);  // above boundary

// ============================================================
// 13. TABLE-DRIVEN TESTING
// ============================================================
// Store related cases as data and execute the same test logic for each case.

function square(number) {
  return number * number;
}

const squareCases = [
  { input: 0, expected: 0 },
  { input: 1, expected: 1 },
  { input: 2, expected: 4 },
  { input: -3, expected: 9 },
  { input: 10, expected: 100 },
];

for (const testCase of squareCases) {
  assertEqual(
    square(testCase.input),
    testCase.expected,
    `square(${testCase.input}) failed`,
  );
}

console.log("Table-driven tests passed");

// ============================================================
// 14. TESTING STRINGS
// ============================================================

function normalizeUsername(username) {
  return username.trim().toLowerCase();
}

assertEqual(normalizeUsername("  Ravi  "), "ravi");
assertEqual(normalizeUsername("JAVASCRIPT"), "javascript");

// ============================================================
// 15. TESTING ARRAYS
// ============================================================

function uniqueNumbers(numbers) {
  return [...new Set(numbers)];
}

assertDeepEqual(uniqueNumbers([1, 2, 2, 3, 1]), [1, 2, 3]);
assertDeepEqual(uniqueNumbers([]), []);

// ============================================================
// 16. TESTING OBJECT TRANSFORMATIONS
// ============================================================

function summarizeUser(user) {
  return {
    id: user.id,
    displayName: `${user.firstName} ${user.lastName}`,
  };
}

assertDeepEqual(
  summarizeUser({ id: 7, firstName: "Ravi", lastName: "Kumar" }),
  { id: 7, displayName: "Ravi Kumar" },
);

// ============================================================
// 17. TESTING ERRORS PRECISELY
// ============================================================
// Do not only test that "something failed" when the error type/message is
// part of the contract.

function parsePositiveInteger(value) {
  const number = Number(value);

  if (!Number.isInteger(number) || number <= 0) {
    throw new TypeError("Expected a positive integer");
  }

  return number;
}

try {
  parsePositiveInteger("abc");
  throw new Error("Expected parsePositiveInteger() to throw");
} catch (error) {
  assert(error instanceof TypeError);
  assertEqual(error.message, "Expected a positive integer");
}

// ============================================================
// 18. TESTING SIDE EFFECTS
// ============================================================
// Side effects can be tested by observing the boundary around them.
// Example: rather than hard-coding console.log throughout business logic,
// inject a logger.

function createGreetingService(logger) {
  return {
    greet(name) {
      const message = `Hello, ${name}`;
      logger(message);
      return message;
    },
  };
}

const messages = [];
const fakeLogger = (message) => messages.push(message);
const greetingService = createGreetingService(fakeLogger);

assertEqual(greetingService.greet("Ravi"), "Hello, Ravi");
assertDeepEqual(messages, ["Hello, Ravi"]);

// ============================================================
// 19. TEST DOUBLES
// ============================================================
// Definition:
// A test double is a replacement used during testing to control or observe
// dependencies.
//
// Common categories:
// - Dummy: passed around but not meaningfully used.
// - Stub: supplies controlled responses.
// - Spy: records calls.
// - Mock: verifies expected interactions; the word is also used broadly for
//   configured test doubles.
// - Fake: simplified working implementation, such as an in-memory database.

// ============================================================
// 20. A SIMPLE SPY
// ============================================================

function createSpy(implementation = () => undefined) {
  const calls = [];

  const spy = (...args) => {
    calls.push(args);
    return implementation(...args);
  };

  spy.calls = calls;
  return spy;
}

const sendEmail = createSpy((address) => `sent to ${address}`);

assertEqual(sendEmail("ravi@example.com"), "sent to ravi@example.com");
assertEqual(sendEmail.calls.length, 1);
assertDeepEqual(sendEmail.calls[0], ["ravi@example.com"]);

// ============================================================
// 21. STUBS
// ============================================================
// A stub provides a controlled value instead of calling a real dependency.

function getUserDisplayName(userRepository, id) {
  const user = userRepository.findById(id);
  return user ? user.name : "Unknown user";
}

const userRepositoryStub = {
  findById(id) {
    if (id === 1) return { id: 1, name: "Ravi" };
    return null;
  },
};

assertEqual(getUserDisplayName(userRepositoryStub, 1), "Ravi");
assertEqual(getUserDisplayName(userRepositoryStub, 999), "Unknown user");

// ============================================================
// 22. FAKES
// ============================================================
// A fake behaves like a small working dependency but is simpler than the
// production implementation.

function createInMemoryUserRepository() {
  const users = new Map();

  return {
    save(user) {
      users.set(user.id, { ...user });
    },
    findById(id) {
      return users.get(id) ?? null;
    },
  };
}

const fakeRepository = createInMemoryUserRepository();
fakeRepository.save({ id: 1, name: "Ravi" });

assertDeepEqual(fakeRepository.findById(1), { id: 1, name: "Ravi" });
assertEqual(fakeRepository.findById(2), null);

// ============================================================
// 23. DEPENDENCY INJECTION
// ============================================================
// Definition:
// Dependency injection means supplying a dependency from outside instead of
// constructing/hiding it inside the unit being tested.

function createOrderService(paymentGateway) {
  return {
    async placeOrder(order) {
      if (order.total <= 0) {
        throw new RangeError("Order total must be positive");
      }

      return paymentGateway.charge(order.total);
    },
  };
}

const paymentGatewayStub = {
  charge(amount) {
    return { id: "payment-1", amount, status: "paid" };
  },
};

const orderService = createOrderService(paymentGatewayStub);

orderService.placeOrder({ total: 500 }).then((payment) => {
  assertEqual(payment.amount, 500);
  assertEqual(payment.status, "paid");
  console.log("Dependency-injection async test passed");
});

// ============================================================
// 24. ASYNC TESTING
// ============================================================
// Definition:
// Async tests must wait for the Promise representing the operation.

function fetchUserName() {
  return Promise.resolve({ name: "Ravi" });
}

async function testFetchUserName() {
  const user = await fetchUserName();
  assertEqual(user.name, "Ravi");
}

testFetchUserName()
  .then(() => console.log("Async test passed"))
  .catch((error) => console.error("Async test failed:", error));

// Common mistake:
// Calling an async function without awaiting/returning it can let a test finish
// before the assertion runs.

// ============================================================
// 25. TESTING ASYNC REJECTIONS
// ============================================================

async function loadRequiredUser() {
  throw new Error("User not found");
}

async function testAsyncError() {
  let error;

  try {
    await loadRequiredUser();
  } catch (caughtError) {
    error = caughtError;
  }

  assert(error instanceof Error);
  assertEqual(error.message, "User not found");
}

testAsyncError()
  .then(() => console.log("Async error test passed"))
  .catch((error) => console.error("Async error test failed:", error));

// ============================================================
// 26. TIMERS AND TESTING
// ============================================================
// Real timers can make tests slow or flaky. Test frameworks often provide
// fake timers so time can be advanced deterministically.

function createDelayedGreeting(setTimer = setTimeout) {
  return (name, callback) => {
    setTimer(() => callback(`Hello, ${name}`), 1000);
  };
}

const scheduled = [];
const fakeSetTimer = (callback, delay) => {
  scheduled.push({ callback, delay });
};

const delayedGreeting = createDelayedGreeting(fakeSetTimer);
let delayedResult;

delayedGreeting("Ravi", (message) => {
  delayedResult = message;
});

assertEqual(scheduled[0].delay, 1000);
assertEqual(delayedResult, undefined);
scheduled[0].callback();
assertEqual(delayedResult, "Hello, Ravi");

// ============================================================
// 27. MOCKING TOO MUCH
// ============================================================
// Over-mocking can make tests verify implementation details rather than user-
// visible behavior. Prefer testing meaningful contracts.
//
// Bad mindset:
//   "Did private helper A call helper B exactly twice?"
//
// Better mindset:
//   "Did the service return the correct result and handle the failure case?"

// ============================================================
// 28. UNIT TESTING
// ============================================================
// Definition:
// Unit tests isolate a small unit of behavior, usually a function/module.

function calculateShipping(total) {
  return total >= 1000 ? 0 : 100;
}

assertEqual(calculateShipping(1000), 0);
assertEqual(calculateShipping(999), 100);

// ============================================================
// 29. INTEGRATION TESTING
// ============================================================
// Definition:
// Integration tests verify that multiple components work together.
//
// Example architecture:
// route -> controller/service -> repository -> database
//
// A realistic integration test might use a test database or a controlled
// in-memory dependency instead of testing only one function.

function createUserService(repository) {
  return {
    register(user) {
      const existing = repository.findByEmail(user.email);
      if (existing) throw new Error("Email already registered");

      repository.save(user);
      return user;
    },
  };
}

const integrationRepository = {
  users: [],
  findByEmail(email) {
    return this.users.find((user) => user.email === email) ?? null;
  },
  save(user) {
    this.users.push(user);
  },
};

const userService = createUserService(integrationRepository);
userService.register({ id: 1, email: "ravi@example.com" });

assertEqual(integrationRepository.users.length, 1);
assertThrows(() =>
  userService.register({ id: 2, email: "ravi@example.com" }),
);

console.log("Integration-style service test passed");

// ============================================================
// 30. END-TO-END TESTING
// ============================================================
// Definition:
// End-to-end (E2E) tests exercise a user-facing flow through many real layers.
//
// Example:
// Open login page -> enter credentials -> submit -> backend -> database ->
// authenticated dashboard.
//
// E2E tests provide valuable confidence but are usually slower and more
// sensitive to environment problems than unit tests.

// ============================================================
// 31. TEST PYRAMID
// ============================================================
// A practical model:
//
//              /\\
//             /E2E\\       Few, slower, broad
//            /------\\
//           /Integration\\ Some, medium speed
//          /------------\\
//         /  Unit tests   \\ Many, fast, focused
//        /__________________\\
//
// This is a heuristic, not a law. The right mix depends on the system.

// ============================================================
// 32. REGRESSION TESTING
// ============================================================
// Definition:
// Regression testing checks that previously working behavior remains working
// after changes.

function formatPrice(price) {
  return `₹${price.toFixed(2)}`;
}

// Suppose a bug was found where 10 became "₹10.00" incorrectly in an old
// implementation. Keep a regression test for the expected contract.
assertEqual(formatPrice(10), "₹10.00");

// ============================================================
// 33. TEST-DRIVEN DEVELOPMENT (TDD)
// ============================================================
// TDD cycle:
//   RED -> GREEN -> REFACTOR
//
// RED:
//   Write a test for behavior that does not work yet.
// GREEN:
//   Write the smallest implementation that makes it pass.
// REFACTOR:
//   Improve design while keeping tests green.
//
// TDD is a workflow, not a requirement that every line of code must be written
// test-first.

// ============================================================
// 34. BEHAVIOR-DRIVEN THINKING
// ============================================================
// Describe behavior in domain language:
// "A blocked user cannot create a note."
//
// This keeps tests connected to requirements rather than implementation.

function canCreateNote(user) {
  return user?.isAuthenticated === true && user?.isBlocked !== true;
}

assertEqual(
  canCreateNote({ isAuthenticated: true, isBlocked: false }),
  true,
);
assertEqual(
  canCreateNote({ isAuthenticated: true, isBlocked: true }),
  false,
);
assertEqual(canCreateNote(null), false);

// ============================================================
// 35. PROPERTY-BASED THINKING
// ============================================================
// Instead of checking only selected examples, identify rules that should hold
// for many inputs.
//
// Example property for double(n): double(double(n)) === 4 * n.

function double(number) {
  return number * 2;
}

const propertyInputs = [-100, -1, 0, 1, 2, 10, 999];

for (const input of propertyInputs) {
  assertEqual(double(double(input)), 4 * input);
}

console.log("Property-style tests passed");

// ============================================================
// 36. RANDOMIZED TESTING
// ============================================================
// Randomized inputs can find surprising cases, but reproducibility matters.
// In real test systems, record the random seed when a failure occurs.

function absolute(number) {
  return number < 0 ? -number : number;
}

for (let i = 0; i < 100; i += 1) {
  const input = i - 50;
  assert(absolute(input) >= 0);
}

// ============================================================
// 37. FUZZ / ROBUSTNESS TESTING IDEA
// ============================================================
// Feed unexpected but valid-looking values and verify the program does not
// violate important invariants.

const weirdInputs = ["", " ", "0", 0, null, undefined, [], {}];

function safeString(value) {
  return String(value);
}

for (const input of weirdInputs) {
  assertEqual(typeof safeString(input), "string");
}

// ============================================================
// 38. CODE COVERAGE
// ============================================================
// Common coverage measurements:
// - Statement coverage
// - Branch coverage
// - Function coverage
// - Line coverage
//
// Coverage percentage answers "which code was executed by tests?" It does not
// answer "are the tests good?" A test suite can have high coverage and weak
// assertions.

// ============================================================
// 39. BRANCH COVERAGE MINDSET
// ============================================================

function classifyScore(score) {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 50) return "C";
  return "F";
}

// Cover each meaningful branch and boundaries.
assertEqual(classifyScore(95), "A");
assertEqual(classifyScore(80), "B");
assertEqual(classifyScore(60), "C");
assertEqual(classifyScore(20), "F");
assertEqual(classifyScore(90), "A");
assertEqual(classifyScore(75), "B");
assertEqual(classifyScore(50), "C");

// ============================================================
// 40. TEST FIXTURES
// ============================================================
// Definition:
// A fixture is predefined data/environment used by tests.

const validUserFixture = {
  id: 1,
  name: "Ravi",
  email: "ravi@example.com",
  roles: ["user"],
};

assert(validUserFixture.email.includes("@"));

// Keep fixtures small and intentional. Huge shared fixtures can make tests
// difficult to understand and may create accidental coupling.

// ============================================================
// 41. SETUP AND TEARDOWN
// ============================================================
// Test frameworks commonly support hooks such as:
// - before each test
// - after each test
// - before an entire suite
// - after an entire suite
//
// Purpose:
// Prepare isolated state and clean up resources.
//
// Avoid hidden setup that makes a test impossible to understand in isolation.

// ============================================================
// 42. TEST ISOLATION
// ============================================================
// Definition:
// Tests are isolated when one test does not unexpectedly change the result of
// another test.

function createCounterState() {
  return { count: 0 };
}

const testAState = createCounterState();
const testBState = createCounterState();

testAState.count += 1;

assertEqual(testAState.count, 1);
assertEqual(testBState.count, 0);

// ============================================================
// 43. FLAKY TESTS
// ============================================================
// Definition:
// A flaky test sometimes passes and sometimes fails without a relevant code
// change.
//
// Common causes:
// - timing assumptions
// - real network dependencies
// - shared mutable state
// - random data without controlled seeds
// - timezone/date assumptions
// - test-order dependence
// - resource contention
//
// Fix the cause instead of simply adding retries around the test.

// ============================================================
// 44. TESTING DATES
// ============================================================
// Dates can fail because of timezone and clock differences. Inject the clock
// when time itself is a dependency.

function createExpiryChecker(now = () => new Date()) {
  return {
    isExpired(expiresAt) {
      return expiresAt <= now();
    },
  };
}

const fixedNow = new Date("2026-01-01T00:00:00.000Z");
const expiryChecker = createExpiryChecker(() => fixedNow);

assertEqual(
  expiryChecker.isExpired(new Date("2025-12-31T23:59:59.000Z")),
  true,
);
assertEqual(
  expiryChecker.isExpired(new Date("2026-01-02T00:00:00.000Z")),
  false,
);

// ============================================================
// 45. TESTING RANDOMNESS
// ============================================================
// Randomness is another dependency that can be injected.

function createDice(random = Math.random) {
  return {
    roll() {
      return Math.floor(random() * 6) + 1;
    },
  };
}

const deterministicDice = createDice(() => 0.5);
assertEqual(deterministicDice.roll(), 4);

// ============================================================
// 46. TESTING NETWORK CODE
// ============================================================
// Keep network transport separate from business logic so the business logic
// can be tested without making real requests.

async function loadUserName(fetchUser) {
  const user = await fetchUser();
  return user.name;
}

const fakeFetchUser = async () => ({ id: 1, name: "Ravi" });

loadUserName(fakeFetchUser)
  .then((name) => {
    assertEqual(name, "Ravi");
    console.log("Network-boundary test passed");
  })
  .catch((error) => console.error("Network-boundary test failed:", error));

// ============================================================
// 47. TESTING FETCH HTTP ERRORS
// ============================================================
// fetch() resolves for HTTP error statuses. Application code normally checks
// response.ok/status before parsing the successful payload.

async function requestJson(fetchImpl, url) {
  const response = await fetchImpl(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

const fakeFetch = async () => ({
  ok: false,
  status: 404,
  async json() {
    return { message: "Not found" };
  },
});

requestJson(fakeFetch, "/users/999")
  .then(() => {
    throw new Error("Expected requestJson() to reject");
  })
  .catch((error) => {
    assertEqual(error.message, "HTTP 404");
    console.log("HTTP error handling test passed");
  });

// ============================================================
// 48. TESTING ABORT / CANCELLATION
// ============================================================
// Cancellation is part of asynchronous behavior and should be tested when it
// is part of the application's contract.

function createAbortAwareOperation(signal) {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new Error("Operation aborted"));
      return;
    }

    const onAbort = () => reject(new Error("Operation aborted"));
    signal.addEventListener("abort", onAbort, { once: true });

    // Teaching example: resolve immediately in the non-aborted path.
    resolve("done");
  });
}

const abortController = new AbortController();
abortController.abort();

createAbortAwareOperation(abortController.signal)
  .then(() => {
    throw new Error("Expected operation to reject after abort");
  })
  .catch((error) => {
    assertEqual(error.message, "Operation aborted");
    console.log("Abort test passed");
  });

// ============================================================
// 49. SNAPSHOT TESTING — CONCEPT
// ============================================================
// Snapshot testing stores a serialized representation of output and compares
// future output against it.
//
// Useful for stable structured output, but dangerous when snapshots become
// huge or are blindly updated without reviewing meaningful changes.

const snapshotLikeOutput = {
  title: "JavaScript",
  lessons: 21,
};

const expectedSnapshot = JSON.stringify(snapshotLikeOutput, null, 2);
assertEqual(
  JSON.stringify(snapshotLikeOutput, null, 2),
  expectedSnapshot,
);

// ============================================================
// 50. CONTRACT TESTING — CONCEPT
// ============================================================
// Definition:
// Contract testing verifies that interacting components agree on an interface.
//
// Example contract:
// GET /users/1 -> { id: number, name: string }
//
// This is especially useful between frontend and backend services.

function validateUserContract(user) {
  return (
    user &&
    typeof user.id === "number" &&
    typeof user.name === "string"
  );
}

assertEqual(validateUserContract({ id: 1, name: "Ravi" }), true);
assertEqual(validateUserContract({ id: "1", name: "Ravi" }), false);

// ============================================================
// 51. TESTING DATABASE LOGIC
// ============================================================
// Separate pure business rules from database operations.

function canDeleteNote(note, userId) {
  return note.ownerId === userId && note.deleted !== true;
}

assertEqual(canDeleteNote({ ownerId: 1, deleted: false }, 1), true);
assertEqual(canDeleteNote({ ownerId: 2, deleted: false }, 1), false);
assertEqual(canDeleteNote({ ownerId: 1, deleted: true }, 1), false);

// The real database query should be tested at an integration boundary.

// ============================================================
// 52. TESTING AUTHORIZATION
// ============================================================
// Authorization is a business/security rule and deserves explicit negative
// tests, not only happy-path tests.

function canEditDocument(user, document) {
  if (!user) return false;
  return user.id === document.ownerId || user.roles?.includes("admin") === true;
}

assertEqual(
  canEditDocument({ id: 1, roles: [] }, { ownerId: 1 }),
  true,
);
assertEqual(
  canEditDocument({ id: 2, roles: [] }, { ownerId: 1 }),
  false,
);
assertEqual(
  canEditDocument({ id: 2, roles: ["admin"] }, { ownerId: 1 }),
  true,
);

// ============================================================
// 53. SECURITY TESTING MINDSET
// ============================================================
// Test that untrusted input cannot bypass important application rules.
//
// Examples:
// - authorization bypass
// - invalid ownership checks
// - unsafe input handling
// - incorrect CORS assumptions
// - sensitive error leakage
//
// Tests support security work but do not replace security review and threat
// modeling.

// ============================================================
// 54. TESTING PURE FUNCTIONS VS SIDE EFFECTS
// ============================================================
// A useful architecture:
//
//                 INPUT
//                   |
//                   v
//          PURE BUSINESS RULE
//                   |
//                   v
//               RESULT
//                   |
//                   v
//            SIDE EFFECT
//
// Test the pure rule heavily and test the side-effect boundary with focused
// integration/contract tests.

// ============================================================
// 55. TESTING REACT / FRONTEND — CONCEPT
// ============================================================
// Frontend tests can operate at several levels:
// - pure utility tests
// - component tests
// - interaction tests
// - accessibility checks
// - end-to-end browser tests
//
// Prefer testing what the user can observe and do rather than internal state
// implementation details.

// Example pure UI rule:
function buttonLabel(isLoading) {
  return isLoading ? "Loading..." : "Save";
}

assertEqual(buttonLabel(false), "Save");
assertEqual(buttonLabel(true), "Loading...");

// ============================================================
// 56. ACCESSIBILITY TESTING MINDSET
// ============================================================
// Important checks include:
// - keyboard access
// - accessible names
// - labels for form controls
// - focus behavior
// - semantic HTML
// - color contrast
// - error messages connected to inputs
//
// Automated accessibility tools catch many issues but not every usability
// problem. Manual keyboard/screen-reader testing remains valuable.

// ============================================================
// 57. TESTING LOCAL STORAGE / BROWSER STORAGE — CONCEPT
// ============================================================
// Inject storage so business logic does not require a real browser.

function createPreferences(storage) {
  return {
    saveTheme(theme) {
      storage.setItem("theme", theme);
    },
    readTheme() {
      return storage.getItem("theme");
    },
  };
}

const fakeStorage = {
  data: new Map(),
  setItem(key, value) {
    this.data.set(key, String(value));
  },
  getItem(key) {
    return this.data.get(key) ?? null;
  },
};

const preferences = createPreferences(fakeStorage);
preferences.saveTheme("dark");
assertEqual(preferences.readTheme(), "dark");

// ============================================================
// 58. TESTING EVENTS — CONCEPT
// ============================================================
// For event-driven code, verify observable outcomes rather than implementation
// details such as exactly how many internal listeners exist.

function createEventCounter() {
  let count = 0;

  return {
    handle() {
      count += 1;
    },
    getCount() {
      return count;
    },
  };
}

const eventCounter = createEventCounter();
eventCounter.handle();
eventCounter.handle();
assertEqual(eventCounter.getCount(), 2);

// ============================================================
// 59. TESTING MODULE BOUNDARIES
// ============================================================
// Test public behavior of a module instead of reaching into private helpers.
// A module's exports form part of its API contract.

// ============================================================
// 60. TEST DOUBLES: WHEN TO USE THEM
// ============================================================
// Use a stub when you need deterministic input.
// Use a spy when you need to observe interaction.
// Use a fake when a lightweight working implementation is useful.
// Use real dependencies when integration behavior itself is what you need to
// verify.
//
// Do not mock everything automatically.

// ============================================================
// 61. TEST COUPLING
// ============================================================
// A test is tightly coupled when harmless implementation changes break it.
//
// Fragile:
//   assert internal helper call order.
//
// More resilient:
//   assert the public result and important observable effects.

// ============================================================
// 62. TEST DATA BUILDERS
// ============================================================
// Builders make complex test data easier to create while allowing overrides.

function buildUser(overrides = {}) {
  return {
    id: 1,
    name: "Ravi",
    email: "ravi@example.com",
    roles: ["user"],
    ...overrides,
  };
}

assertEqual(buildUser().name, "Ravi");
assertEqual(buildUser({ name: "Amit" }).name, "Amit");
assertDeepEqual(buildUser({ roles: ["admin"] }).roles, ["admin"]);

// ============================================================
// 63. TEST ORACLES
// ============================================================
// Definition:
// A test oracle determines whether the observed result is correct.
//
// Good oracles can come from:
// - requirements
// - mathematical properties
// - known examples
// - reference implementations
// - protocol contracts
// - invariants
//
// Weak oracle example:
// "The function returned something truthy."
// when the actual contract requires a precise value.

// ============================================================
// 64. INVARIANTS
// ============================================================
// Definition:
// An invariant is a property that should remain true throughout a process or
// across valid states.

function addToBalance(balance, amount) {
  if (amount < 0) throw new RangeError("Amount must be non-negative");
  return balance + amount;
}

assert(addToBalance(100, 50) >= 100);
assert(addToBalance(0, 0) === 0);

// ============================================================
// 65. TESTING STATE TRANSITIONS
// ============================================================

function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}

assertEqual(counterReducer(0, { type: "increment" }), 1);
assertEqual(counterReducer(1, { type: "decrement" }), 0);
assertEqual(counterReducer(5, { type: "unknown" }), 5);

// ============================================================
// 66. COMMON TESTING MISTAKES
// ============================================================
// Mistake 1: Testing only the happy path.
// Fix: include boundaries and expected failures.
//
// Mistake 2: Assertions that are too weak.
// Fix: assert the actual contract.
//
// Mistake 3: Testing implementation details.
// Fix: prefer observable behavior.
//
// Mistake 4: Shared mutable fixtures.
// Fix: create isolated test data.
//
// Mistake 5: Forgetting async await/return.
// Fix: make the test wait for the Promise.
//
// Mistake 6: Blindly increasing coverage.
// Fix: prioritize important behavior and risk.
//
// Mistake 7: Mocking every dependency.
// Fix: use the simplest realistic test boundary.
//
// Mistake 8: Ignoring flaky tests.
// Fix: investigate timing, state, environment, and randomness.

// ============================================================
// 67. DEBUGGING A FAILING TEST
// ============================================================
// Step 1: Read the assertion and actual value.
// Step 2: Reproduce only the failing case.
// Step 3: Check inputs and assumptions.
// Step 4: Trace the first incorrect value.
// Step 5: Decide whether the bug is in production code or the test.
// Step 6: Fix the root cause.
// Step 7: Run the focused test.
// Step 8: Run the broader suite for regression confidence.

// ============================================================
// 68. TEST FAILURE EXAMPLE
// ============================================================

function percentage(value, total) {
  return (value / total) * 100;
}

// Predict before reading the answer:
const percentageResult = percentage(25, 200);
console.log("Percentage output:", percentageResult); // 12.5
assertEqual(percentageResult, 12.5);

// ============================================================
// 69. OUTPUT PREDICTION
// ============================================================
// What should this produce?

const output = [1, 2, 3, 4]
  .filter((number) => number % 2 === 0)
  .map((number) => number * 10);

console.log("Output prediction:", output); // [20, 40]
assertDeepEqual(output, [20, 40]);

// ============================================================
// 70. MINI CHALLENGES — BEGINNER
// ============================================================
// 1. Write tests for a function that reverses a string.
// 2. Test an isPrime() function.
// 3. Test a function that finds the maximum array value.
// 4. Test empty-array behavior.
// 5. Test a function at its exact boundary values.
// 6. Test invalid input with assertThrows().
// 7. Create five table-driven test cases.
// 8. Write a test for an object transformation.
// 9. Write a spy that records calls.
// 10. Build an in-memory repository fake.

// ============================================================
// 71. MINI CHALLENGES — INTERMEDIATE
// ============================================================
// 11. Test a shopping-cart reducer.
// 12. Test a login service with a fake user repository.
// 13. Test a service with a stubbed payment gateway.
// 14. Test an async function that resolves.
// 15. Test an async function that rejects.
// 16. Inject a clock and test expiration logic.
// 17. Inject randomness and test deterministic results.
// 18. Build a tiny test runner around assert().
// 19. Write tests for every branch of a discount rule.
// 20. Identify implementation-coupled tests and rewrite them around behavior.

// ============================================================
// 72. MINI CHALLENGES — ADVANCED
// ============================================================
// 21. Build a test runner supporting describe()/it() style output.
// 22. Add beforeEach/afterEach hooks to your runner.
// 23. Add async test support to your runner.
// 24. Add expected-error assertions for error type and message.
// 25. Implement a simple spy with call count, arguments, and return values.
// 26. Build a fake database supporting transactions in memory.
// 27. Design contract tests for a REST API response.
// 28. Create property-based tests for sorting/search algorithms.
// 29. Build a deterministic scheduler for timer-based code.
// 30. Design a unit/integration/E2E test strategy for a full-stack Notes app.

// ============================================================
// 73. DEBUGGING CHALLENGES
// ============================================================
// Debug this test:
//
// async function getValue() {
//   return 42;
// }
//
// assertEqual(getValue(), 42);
//
// Why does it fail?
// Answer: getValue() returns a Promise, not 42. Await the Promise.
//
// Debug this:
//
// const expected = { id: 1 };
// const actual = { id: 1 };
// assertEqual(actual, expected);
//
// Why can strict equality fail?
// Answer: the objects have different identities.
//
// Debug this:
//
// const shared = [];
// testA(shared);
// testB(shared);
//
// Why can testB depend on testA?
// Answer: shared mutable state creates test coupling.

// ============================================================
// 74. INTERVIEW QUESTIONS
// ============================================================
// Beginner:
// - What is software testing?
// - Why do we test?
// - What is an assertion?
// - Explain Arrange-Act-Assert.
// - What is a unit test?
// - What is an edge case?
//
// Intermediate:
// - Unit vs integration vs E2E testing?
// - What is a test double?
// - Stub vs spy vs mock vs fake?
// - What is dependency injection and why does it help testing?
// - What causes flaky tests?
// - What does code coverage measure?
// - Why can high coverage still mean poor tests?
//
// Advanced:
// - How do you test asynchronous code correctly?
// - How would you design tests for a distributed system?
// - When should you mock a dependency versus use a real implementation?
// - How do you test time, randomness, and external services?
// - How do you avoid implementation-coupled tests?
// - What makes a test suite maintainable?
// - How would you test authorization rules?
// - How would you design contract tests between frontend and backend?

// ============================================================
// 75. TEACH-BACK QUESTIONS
// ============================================================
// Explain without reading notes:
// 1. What is a test case?
// 2. What is Arrange-Act-Assert?
// 3. Why test boundaries?
// 4. Why are async tests different?
// 5. What is a stub?
// 6. What is a spy?
// 7. What is a fake?
// 8. Why does dependency injection help testing?
// 9. Unit vs integration vs E2E?
// 10. What is test isolation?
// 11. What is a flaky test?
// 12. What does coverage tell you?
// 13. Why is testing behavior usually better than implementation details?
// 14. Why should security/authorization have negative tests?
// 15. How would you test a full-stack feature?

// ============================================================
// 76. PRACTICAL TESTING WORKFLOW
// ============================================================
// When building a feature:
//
// 1. Define the behavior/contract.
// 2. Identify happy paths.
// 3. Identify boundaries.
// 4. Identify invalid/error paths.
// 5. Write focused unit tests for pure business logic.
// 6. Add integration tests around important boundaries.
// 7. Add a small number of critical E2E flows.
// 8. Run tests during development.
// 9. Investigate failures rather than hiding them.
// 10. Refactor tests as the domain evolves.

// ============================================================
// 77. FINAL MENTAL MODEL
// ============================================================
// Think about testing as a feedback system:
//
// REQUIREMENT
//     |
//     v
// EXPECTED BEHAVIOR
//     |
//     v
// TEST CASES ------------------+
//     |                        |
//     v                        v
// RUN SOFTWARE              ASSERTIONS
//     |                        |
//     +-----------> EVIDENCE <-+
//                         |
//                  PASS / FAIL
//                         |
//                         v
//                    DEBUG / IMPROVE
//
// Practical rules:
// 1. Test behavior that matters.
// 2. Include happy, boundary, and failure cases.
// 3. Keep unit tests fast and focused.
// 4. Use integration tests for important interactions.
// 5. Keep E2E tests focused on critical user journeys.
// 6. Control external dependencies when isolation is useful.
// 7. Do not confuse coverage with correctness.
// 8. Make tests deterministic whenever practical.
// 9. Treat flaky tests as engineering problems.
// 10. A good test suite should increase confidence without becoming a second
//     application that is harder to maintain than the code itself.

console.log("=== Testing chapter loaded ===");
