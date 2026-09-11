/*
 * JavaScript Zero to Master
 * Chapter 25 — Software Architecture
 * Companion JavaScript File
 *
 * Architecture is about important structural decisions: responsibilities,
 * boundaries, dependencies, data flow, communication, reliability, security,
 * deployment, and the constraints that connect them.
 *
 * These examples use plain JavaScript and are intentionally framework-neutral.
 * Architecture is guidance, not a rigid folder template.
 */

console.log("=== 25. Software Architecture ===");

// ============================================================
// 1. WHAT IS SOFTWARE ARCHITECTURE?
// ============================================================
// Definition:
// Software architecture describes the important structure and behavior of a
// system: its components, boundaries, dependencies, data flow, communication,
// persistence, deployment, and quality attributes.
//
// Architecture answers:
// - Where does business logic live?
// - Which module owns a responsibility?
// - Which direction may dependencies flow?
// - How do components communicate?
// - Where are security boundaries?
// - What happens when infrastructure fails?
// - How will the system scale and be observed?
//
// Architecture is more than folders.

// ============================================================
// 2. ARCHITECTURE VS DESIGN VS CODE
// ============================================================
// Architecture -> major system boundaries and decisions.
// Design       -> detailed structure within those boundaries.
// Code         -> concrete implementation.
//
// Example:
// Architecture: REST API + relational database.
// Design: service layer + repository abstraction.
// Code: actual JavaScript functions/classes implementing them.

// ============================================================
// 3. ARCHITECTURAL QUALITY ATTRIBUTES
// ============================================================
// Functional requirement:
//   "Users can create notes."
//
// Quality attributes / non-functional concerns:
// - reliability
// - performance
// - scalability
// - security
// - maintainability
// - testability
// - observability
// - availability
// - accessibility
// - operability
//
// Architecture often exists to balance these qualities under constraints.

// ============================================================
// 4. SIMPLE ARCHITECTURE
// ============================================================
// For a small application, this can be enough:
//
// UI -> API -> Database
//
// Do not introduce distributed systems when a simple process solves the problem.

function createSimpleNote(title) {
  return {
    id: 1,
    title,
  };
}

console.log("Simple architecture:", createSimpleNote("Hello Architecture"));

// ============================================================
// 5. LAYERED ARCHITECTURE
// ============================================================
// A common layered model:
//
// Presentation
//      ↓
// Application
//      ↓
// Domain
//      ↓
// Infrastructure
//
// Layers are useful when their dependency direction is intentional.

// Presentation: HTTP/controller concerns.
function createNoteController(noteService) {
  return {
    async create(request) {
      const result = await noteService.create(request.body);
      return { status: 201, body: result };
    },
  };
}

// Application: use-case orchestration.
function createNoteService(noteRepository) {
  return {
    async create(input) {
      if (!input.title?.trim()) throw new Error("Title is required");
      return noteRepository.save({
        id: "n1",
        title: input.title.trim(),
        content: input.content ?? "",
      });
    },
  };
}

const inMemoryNoteRepository = {
  async save(note) {
    return note;
  },
};

const noteService = createNoteService(inMemoryNoteRepository);
const noteController = createNoteController(noteService);

console.log(
  "Layered flow:",
  await noteController.create({ body: { title: "Layered Architecture" } }),
);

// ============================================================
// 6. CONTROLLER RESPONSIBILITY
// ============================================================
// A controller commonly translates transport input/output.
// It should not become the home for every business rule, database query,
// email operation, and external API call.
//
// Controller -> validate transport shape -> call use case -> map response.

// ============================================================
// 7. SERVICE / USE-CASE RESPONSIBILITY
// ============================================================
// Application services coordinate a business operation.
//
// Example:
// CreateNote
// 1. validate application input
// 2. generate ID
// 3. apply business rules
// 4. persist
// 5. publish required event
// 6. return result
//
// Exact boundaries depend on domain complexity.

// ============================================================
// 8. REPOSITORY RESPONSIBILITY
// ============================================================
// A repository provides persistence-oriented operations to application code.
// It can hide database-specific details.

function createRepository(database) {
  return {
    async findById(id) {
      return database.findOne("notes", { id });
    },

    async save(note) {
      return database.insert("notes", note);
    },
  };
}

const fakeDatabase = {
  async findOne(collection, query) {
    return { collection, ...query, title: "Example" };
  },
  async insert(collection, document) {
    return { collection, ...document };
  },
};

const repository = createRepository(fakeDatabase);
console.log("Repository:", await repository.findById("n1"));

// ============================================================
// 9. DOMAIN LOGIC
// ============================================================
// Domain logic represents rules that matter to the business.
//
// Example: only the owner may archive an unarchived note.

function canArchiveNote(user, note) {
  return user.id === note.ownerId && !note.isArchived;
}

console.log(
  "Domain rule:",
  canArchiveNote(
    { id: "u1" },
    { ownerId: "u1", isArchived: false },
  ),
);

// Keep important rules understandable without requiring MongoDB syntax.

// ============================================================
// 10. DEPENDENCY DIRECTION
// ============================================================
// A useful rule:
//
// High-level policy should not become tightly coupled to low-level details.
//
// Example:
//
// NoteService -> NoteRepository contract
// MongoNoteRepository -> MongoDB
//
// The service should not need to know every MongoDB driver detail.

function createApplication(repository) {
  return {
    async getNote(id) {
      return repository.findById(id);
    },
  };
}

const application = createApplication({
  async findById(id) {
    return { id, title: "Application boundary" };
  },
});

console.log("Dependency direction:", await application.getNote("n1"));

// ============================================================
// 11. COMPOSITION ROOT
// ============================================================
// Concrete dependencies should be assembled at a boundary/startup location.
//
// Example mental model:
//
// database -> repository -> service -> controller -> HTTP server
//
// Business code receives dependencies instead of constructing infrastructure
// internally.

function buildApplication() {
  const database = fakeDatabase;
  const repo = createRepository(database);
  const service = createNoteService(repo);
  const controller = createNoteController(service);

  return { controller };
}

console.log("Composition root created:", Boolean(buildApplication().controller));

// ============================================================
// 12. MODULAR MONOLITH
// ============================================================
// A modular monolith is one deployable application with explicit internal
// module boundaries.
//
// Example modules:
// users
// notes
// folders
// tags
// sharing
// notifications
//
// Each module can own its business rules and public API.

function createNotesModule({ repository }) {
  return {
    async create(input) {
      if (!input.title?.trim()) throw new Error("Title required");
      return repository.save({ title: input.title.trim() });
    },
  };
}

const notesModule = createNotesModule({
  repository: { async save(note) { return note; } },
});

console.log("Modular monolith:", await notesModule.create({ title: "Notes" }));

// ============================================================
// 13. MODULE BOUNDARIES
// ============================================================
// A module should expose a small public surface.
//
// Bad:
// notes module exports every database model/helper/internal function.
//
// Better:
// notes module exposes use cases such as:
// createNote, getNote, updateNote, archiveNote.
//
// Internal implementation can change without forcing every consumer to change.

// ============================================================
// 14. FEATURE-BASED ORGANIZATION
// ============================================================
// Instead of organizing only by technical type:
//
// controllers/
// services/
// repositories/
//
// a feature-oriented system may use:
//
// notes/
//   controller.js
//   service.js
//   repository.js
//   validation.js
// users/
//   controller.js
//   service.js
//
// Neither structure is universally correct. Optimize for discoverability and
// boundaries in the actual project.

// ============================================================
// 15. CLEAN ARCHITECTURE — CORE IDEA
// ============================================================
// Clean Architecture emphasizes keeping core business rules independent from
// frameworks and infrastructure.
//
// A simplified dependency picture:
//
// Framework/UI -> adapters -> use cases -> domain
//
// Outer layers may know inner layers; inner business rules should not require
// concrete outer frameworks.

// ============================================================
// 16. HEXAGONAL ARCHITECTURE / PORTS AND ADAPTERS
// ============================================================
// Port = contract needed by the application.
// Adapter = concrete implementation of that contract.
//
// Example port:
// repository.findById(id)
//
// Adapters:
// MongoRepository
// PostgresRepository
// InMemoryRepository
//
// This makes infrastructure replaceable when the abstraction is useful.

function createUserLookup(userRepository) {
  return async function lookupUser(id) {
    return userRepository.findById(id);
  };
}

const memoryAdapter = {
  async findById(id) {
    return { id, source: "memory" };
  },
};

console.log("Port/adapter:", await createUserLookup(memoryAdapter)("u1"));

// ============================================================
// 17. ONION ARCHITECTURE
// ============================================================
// Onion Architecture also emphasizes inward dependency direction.
//
// Center: domain model/rules
// Next: application services
// Outer: infrastructure/frameworks
//
// Different architecture names overlap conceptually. Learn the principles,
// not just the labels.

// ============================================================
// 18. DOMAIN-DRIVEN DESIGN — DOMAIN
// ============================================================
// DDD focuses architecture around the business domain.
//
// Useful concepts include:
// - entity
// - value object
// - aggregate
// - repository
// - domain service
// - domain event
// - bounded context
//
// Use these where domain complexity justifies them.

// ============================================================
// 19. ENTITY VS VALUE OBJECT
// ============================================================
// Entity identity matters over time.
// Value object is defined by its values and is commonly immutable.

function createMoney(amount, currency) {
  if (!Number.isFinite(amount)) throw new TypeError("Invalid amount");
  if (!currency) throw new Error("Currency required");

  return Object.freeze({ amount, currency });
}

console.log("Value object:", createMoney(499, "INR"));

// ============================================================
// 20. AGGREGATE
// ============================================================
// An aggregate is a consistency boundary around related domain objects.
//
// The aggregate root controls important changes to the aggregate.
//
// Do not interpret "aggregate" as "put all related tables into one object".

function createNoteAggregate(note) {
  let state = { ...note };

  return {
    get() {
      return { ...state };
    },

    archive() {
      if (state.isArchived) throw new Error("Already archived");
      state = { ...state, isArchived: true };
    },
  };
}

const noteAggregate = createNoteAggregate({ id: "n1", isArchived: false });
noteAggregate.archive();
console.log("Aggregate:", noteAggregate.get());

// ============================================================
// 21. BOUNDED CONTEXT
// ============================================================
// A bounded context is a boundary within which a domain model and its terms
// have a specific meaning.
//
// Example:
// "User" in Identity may mean authentication credentials.
// "User" in Billing may mean a customer account.
//
// Avoid forcing one giant universal model across unrelated contexts.

// ============================================================
// 22. API BOUNDARY
// ============================================================
// APIs are contracts between components.
//
// A good API considers:
// - request shape
// - response shape
// - errors
// - authentication
// - authorization
// - versioning
// - idempotency
// - pagination
// - compatibility

function toPublicNote(note) {
  return {
    id: note.id,
    title: note.title,
    content: note.content,
  };
}

console.log(
  "API boundary:",
  toPublicNote({ id: "n1", title: "Note", content: "...", internalFlag: true }),
);

// ============================================================
// 23. DTO — DATA TRANSFER OBJECT
// ============================================================
// A DTO is a representation used to transfer data across a boundary.
// It need not be identical to the domain model or database document.

function toCreateNoteCommand(requestBody) {
  return {
    title: String(requestBody.title ?? "").trim(),
    content: String(requestBody.content ?? ""),
  };
}

console.log(
  "DTO:",
  toCreateNoteCommand({ title: "  Hello  ", content: "World" }),
);

// ============================================================
// 24. DATABASE DOCUMENT != DOMAIN MODEL
// ============================================================
// Database schema often contains storage concerns.
// Domain model contains business meaning.
//
// Mapping at boundaries can prevent persistence details from leaking everywhere.

function fromDatabaseNote(document) {
  return {
    id: document._id,
    ownerId: document.owner_id,
    title: document.title,
  };
}

console.log(
  "DB mapping:",
  fromDatabaseNote({ _id: "n1", owner_id: "u1", title: "Architecture" }),
);

// ============================================================
// 25. TRANSACTION BOUNDARY
// ============================================================
// A transaction groups changes that must satisfy a consistency requirement.
//
// Example:
// create note + write required metadata
//
// Do not use transactions automatically for every operation. They have costs
// and database-specific constraints.

async function runTransaction(transactionManager, operation) {
  return transactionManager.transaction(operation);
}

const fakeTransactionManager = {
  async transaction(operation) {
    console.log("Transaction started");
    try {
      const result = await operation();
      console.log("Transaction committed");
      return result;
    } catch (error) {
      console.log("Transaction rolled back:", error.message);
      throw error;
    }
  },
};

console.log(
  "Transaction:",
  await runTransaction(fakeTransactionManager, async () => ({ saved: true })),
);

// ============================================================
// 26. EVENT-DRIVEN ARCHITECTURE
// ============================================================
// Components communicate by publishing and consuming events.
//
// Producer -> Event -> Consumers
//
// Benefits:
// - reduced direct coupling
// - asynchronous workflows
// - independent consumers
//
// Costs:
// - eventual consistency
// - ordering questions
// - duplicate delivery
// - retries/dead letters
// - harder debugging

function createEventBus() {
  const subscribers = new Map();

  return {
    subscribe(eventName, handler) {
      if (!subscribers.has(eventName)) subscribers.set(eventName, new Set());
      subscribers.get(eventName).add(handler);
      return () => subscribers.get(eventName)?.delete(handler);
    },

    publish(eventName, payload) {
      for (const handler of subscribers.get(eventName) ?? []) {
        handler(payload);
      }
    },
  };
}

const eventBus = createEventBus();
eventBus.subscribe("NoteCreated", (note) => {
  console.log("Search consumer:", note.id);
});
eventBus.subscribe("NoteCreated", (note) => {
  console.log("Analytics consumer:", note.id);
});
eventBus.publish("NoteCreated", { id: "n1" });

// ============================================================
// 27. DOMAIN EVENT
// ============================================================
// A domain event describes something meaningful that happened in the domain.
//
// Example:
// NoteCreated
// NoteArchived
// UserRegistered
// ShareAccepted
//
// It should represent business meaning rather than an arbitrary database event.

// ============================================================
// 28. OUTBOX PATTERN
// ============================================================
// Problem:
// You save a database record and publish an external event.
// What if database save succeeds but event publishing fails?
//
// Outbox idea:
// 1. Write business change + outbox event in one transaction.
// 2. Separate worker reads outbox.
// 3. Worker publishes event.
// 4. Mark event processed.
//
// This improves reliability for many event-driven systems.

function createOutboxRecord(event) {
  return {
    id: `outbox-${event.id}`,
    type: event.type,
    payload: event.payload,
    status: "pending",
  };
}

console.log(
  "Outbox record:",
  createOutboxRecord({ id: "e1", type: "NoteCreated", payload: { noteId: "n1" } }),
);

// ============================================================
// 29. QUEUES
// ============================================================
// A queue separates producers from workers.
//
// API -> Queue -> Worker -> Email provider
//
// Useful for slow/non-critical work:
// - email
// - image processing
// - report generation
// - indexing
// - notifications
//
// Queue architecture introduces retry, ordering, visibility timeout, and
// dead-letter decisions.

// ============================================================
// 30. CACHE ARCHITECTURE
// ============================================================
// Cache stores reusable results closer to the consumer.
//
// Request -> Cache
//             ↓ miss
//          Database
//
// Common strategies:
// - cache-aside
// - read-through
// - write-through
// - write-behind
//
// Cache invalidation and stale data are architectural concerns.

function createCacheAside(repository) {
  const cache = new Map();

  return {
    async get(id) {
      if (cache.has(id)) return cache.get(id);
      const value = await repository.findById(id);
      if (value) cache.set(id, value);
      return value;
    },
  };
}

const cachedRepository = createCacheAside({
  async findById(id) {
    console.log("Database read:", id);
    return { id, title: "Cached" };
  },
});

console.log("Cache 1:", await cachedRepository.get("n1"));
console.log("Cache 2:", await cachedRepository.get("n1"));

// ============================================================
// 31. DISTRIBUTED SYSTEMS
// ============================================================
// A distributed system has multiple independently executing components that
// communicate over a network.
//
// New failure modes appear:
// - network timeout
// - partial failure
// - duplicate requests
// - stale data
// - clock differences
// - service unavailable
// - message duplication
//
// Distribution should solve a real requirement, not merely look advanced.

// ============================================================
// 32. MONOLITH VS MICROSERVICES
// ============================================================
// Monolith:
// - one deployable unit
// - simpler local development/deployment
// - easier transactions and debugging in many cases
//
// Microservices:
// - multiple independently deployable services
// - independent scaling/team ownership can be valuable
// - network and operational complexity increases
//
// A modular monolith is often a strong intermediate architecture.

// ============================================================
// 33. SERVICE BOUNDARIES
// ============================================================
// Do not split services merely by database tables.
// Prefer boundaries based on:
// - business capabilities
// - ownership
// - change rate
// - team boundaries
// - data consistency needs
//
// Example:
// Identity, Billing, Notes, Search may have different reasons to change.

// ============================================================
// 34. API GATEWAY
// ============================================================
// An API gateway can provide a single edge entry point for multiple services.
// Possible responsibilities:
// - routing
// - authentication integration
// - rate limiting
// - request shaping
// - observability
//
// Avoid turning the gateway into a giant business-logic service.

// ============================================================
// 35. REVERSE PROXY / LOAD BALANCER
// ============================================================
// Reverse proxy:
// client -> proxy -> application
//
// Load balancer distributes traffic across instances.
//
// Architecture may use:
// CDN -> reverse proxy/load balancer -> app instances -> database/cache.

// ============================================================
// 36. SCALING
// ============================================================
// Vertical scaling:
// make one machine stronger.
//
// Horizontal scaling:
// add more application instances.
//
// Stateless application servers are often easier to scale horizontally because
// requests can be handled by different instances.

// ============================================================
// 37. STATEFUL VS STATELESS
// ============================================================
// Stateless server:
// request contains/references enough information for any suitable instance to
// handle it.
//
// Stateful server:
// important session state lives in a particular server/process.
//
// Stateful designs can work, but scaling/failover may require extra machinery.

// ============================================================
// 38. DATABASE ARCHITECTURE
// ============================================================
// Database decisions include:
// - relational vs document
// - indexes
// - transactions
// - consistency
// - read/write patterns
// - partitioning/sharding
// - replication
// - backup/recovery
//
// Choose based on access patterns and requirements, not hype.

// ============================================================
// 39. INDEXING
// ============================================================
// An index accelerates certain queries by maintaining additional data
// structures, at the cost of storage and write/update overhead.
//
// Example Notes queries:
// find by ownerId
// find by folderId
// sort by createdAt
// search by title
//
// Indexes should match actual query patterns.

// ============================================================
// 40. PAGINATION
// ============================================================
// Offset pagination:
// page=3&limit=20
//
// Cursor pagination:
// after=<cursor>&limit=20
//
// Cursor approaches can behave better for large/changing datasets when designed
// around suitable indexed ordering.

function paginateArray(items, page, limit) {
  const start = (page - 1) * limit;
  return items.slice(start, start + limit);
}

console.log(
  "Offset pagination:",
  paginateArray([1, 2, 3, 4, 5, 6], 2, 2),
);

// ============================================================
// 41. CONSISTENCY
// ============================================================
// Strong consistency:
// reads reflect the latest committed state according to the system's model.
//
// Eventual consistency:
// replicas/components may temporarily disagree but converge if updates settle.
//
// Event-driven/distributed architectures frequently require explicit decisions
// about which data may be stale.

// ============================================================
// 42. IDEMPOTENCY
// ============================================================
// An operation is idempotent when repeating the same operation has the same
// intended effect as performing it once.
//
// Useful for retrying network operations safely.
//
// Example:
// PUT /users/123/profile may replace a known resource state.
// Payment creation is different: blindly retrying can create duplicate charges.

function createIdempotencyKey(userId, requestId) {
  return `${userId}:${requestId}`;
}

console.log("Idempotency key:", createIdempotencyKey("u1", "req-42"));

// ============================================================
// 43. RELIABILITY
// ============================================================
// Reliability design asks:
// - What happens on failure?
// - Can the operation be retried?
// - Is it safe to retry?
// - What happens after timeout?
// - Can work be duplicated?
// - Is there a fallback?
// - Can the system recover?

// ============================================================
// 44. TIMEOUTS
// ============================================================
// Never assume network calls finish quickly.
// A timeout prevents a caller from waiting forever.

async function withTimeout(operation, milliseconds) {
  let timer;

  const timeout = new Promise((_, reject) => {
    timer = setTimeout(
      () => reject(new Error("Operation timed out")),
      milliseconds,
    );
  });

  try {
    return await Promise.race([operation(), timeout]);
  } finally {
    clearTimeout(timer);
  }
}

console.log(
  "Timeout:",
  await withTimeout(async () => "fast result", 100),
);

// Note: Promise.race itself does not cancel the underlying operation.
// Production cancellation may require AbortController or another mechanism.

// ============================================================
// 45. RETRY + BACKOFF
// ============================================================
// Retry transient failures carefully.
//
// Common strategy:
// attempt 1 -> short delay
// attempt 2 -> longer delay
// attempt 3 -> longer delay
//
// Add jitter in distributed systems to reduce synchronized retries.

async function retryOperation(operation, attempts) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt === attempts) throw error;
    }
  }

  throw lastError;
}

let attemptCount = 0;
console.log(
  "Retry:",
  await retryOperation(async () => {
    attemptCount += 1;
    if (attemptCount < 2) throw new Error("Transient");
    return "success";
  }, 3),
);

// ============================================================
// 46. CIRCUIT BREAKER CONCEPT
// ============================================================
// If a dependency repeatedly fails, stop sending requests temporarily.
//
// Closed -> normal requests
// Open -> fail fast
// Half-open -> test recovery
//
// This protects systems from cascading failures.

// ============================================================
// 47. RATE LIMITING
// ============================================================
// Rate limiting controls how much work a caller may perform over time.
//
// Useful for:
// - abuse prevention
// - fair resource allocation
// - protecting databases/APIs
// - cost control
//
// Common algorithms: token bucket, leaky bucket, fixed/sliding windows.

// ============================================================
// 48. BACKPRESSURE
// ============================================================
// Backpressure occurs when a producer can generate work faster than a consumer
// can process it.
//
// Solutions:
// - bounded queues
// - rate limiting
// - batching
// - dropping/coalescing work where acceptable
// - stream backpressure
//
// Unbounded queues can become memory/reliability problems.

// ============================================================
// 49. OBSERVABILITY
// ============================================================
// Three common pillars:
// - logs
// - metrics
// - traces
//
// Observability helps answer:
// "What happened, where, and why?"

function logRequest(requestId, message, data = {}) {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    requestId,
    message,
    ...data,
  }));
}

logRequest("req-1", "Creating note", { noteId: "n1" });

// Do not log passwords, tokens, secrets, or unnecessary personal data.

// ============================================================
// 50. CORRELATION / REQUEST IDs
// ============================================================
// A request ID can travel through:
// client -> API -> service -> database logs -> queue -> worker
//
// This makes one operation easier to trace across components.

// ============================================================
// 51. HEALTH CHECKS
// ============================================================
// Liveness:
// "Is the process alive?"
//
// Readiness:
// "Can this instance currently accept traffic?"
//
// They answer different operational questions.

function healthCheck() {
  return { status: "ok" };
}

console.log("Health:", healthCheck());

// ============================================================
// 52. GRACEFUL SHUTDOWN
// ============================================================
// A service should stop accepting new work, finish/abort appropriate active
// work, close resources, and exit within an operational deadline.
//
// Resources may include:
// - HTTP server
// - database pool
// - queue consumer
// - timers
// - WebSocket connections

// ============================================================
// 53. SECURITY ARCHITECTURE
// ============================================================
// Security boundaries include:
// - authentication
// - authorization
// - input validation
// - output encoding
// - secret management
// - encryption in transit/at rest where appropriate
// - rate limiting
// - audit logging
// - dependency/supply-chain controls
//
// Security must be designed into boundaries, not added only at the UI.

// ============================================================
// 54. AUTHENTICATION VS AUTHORIZATION
// ============================================================
// Authentication = Who are you?
// Authorization  = What are you allowed to do?

function canEditNote(user, note) {
  return user.id === note.ownerId || user.roles?.includes("admin");
}

console.log(
  "Authorization:",
  canEditNote({ id: "u1", roles: [] }, { ownerId: "u1" }),
);

// Backend authorization is mandatory for protected resources.

// ============================================================
// 55. ZERO TRUST MENTAL MODEL
// ============================================================
// Do not automatically trust a component simply because it is "inside" a
// network boundary.
// Verify identity, permissions, and input at appropriate boundaries.

// ============================================================
// 56. SECRETS MANAGEMENT
// ============================================================
// Secrets include:
// - database passwords
// - API keys
// - signing keys
// - service credentials
//
// Do not hard-code secrets in source control.
// Prefer an environment/secret-management mechanism appropriate to deployment.

// ============================================================
// 57. CONFIGURATION
// ============================================================
// Separate configuration from code where practical.

function createConfig(env) {
  const port = Number(env.PORT ?? 3000);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("Invalid PORT");
  }

  return Object.freeze({
    port,
    environment: env.NODE_ENV ?? "development",
  });
}

console.log("Config:", createConfig({ PORT: "4000", NODE_ENV: "test" }));

// ============================================================
// 58. ARCHITECTURE DECISION RECORD (ADR)
// ============================================================
// ADR documents an important decision:
//
// Title: Use modular monolith for Notes MVP
// Context: One team, moderate traffic, fast iteration needed
// Decision: Keep one deployment with explicit feature boundaries
// Consequences: simpler operations; later extraction remains possible
//
// Architecture decisions should capture context, not just conclusions.

// ============================================================
// 59. ARCHITECTURE DIAGRAM MENTAL MODEL
// ============================================================
// Example Notes system:
//
// Browser
//   ↓ HTTPS
// API / Controllers
//   ↓
// Use Cases / Services
//   ↓
// Domain Rules
//   ↓
// Repository Ports
//   ↓
// MongoDB/PostgreSQL
//
// Side paths:
// Service -> Event Bus -> Search/Notifications
// API -> Cache -> Database
// Worker -> Queue
// All components -> Logs/Metrics/Traces

// ============================================================
// 60. NOTES APP — COMPLETE COMPOSITION
// ============================================================

function buildNotesSystem() {
  const repository = {
    async save(note) {
      return note;
    },
    async findById(id) {
      return { id, title: "Stored note", ownerId: "u1", isArchived: false };
    },
    async archive(id) {
      return { id, isArchived: true };
    },
  };

  const authorization = {
    canArchive(user, note) {
      return user.id === note.ownerId && !note.isArchived;
    },
  };

  const useCases = {
    async createNote(input) {
      if (!input.title?.trim()) throw new Error("Title required");
      return repository.save({
        id: "n-created",
        title: input.title.trim(),
        content: input.content ?? "",
        ownerId: input.ownerId,
        isArchived: false,
      });
    },

    async archiveNote({ user, noteId }) {
      const note = await repository.findById(noteId);
      if (!note) throw new Error("Note not found");
      if (!authorization.canArchive(user, note)) throw new Error("Forbidden");
      return repository.archive(noteId);
    },
  };

  return Object.freeze({ useCases });
}

const notesSystem = buildNotesSystem();
console.log(
  "Full-stack Notes create:",
  await notesSystem.useCases.createNote({
    title: "Architecture",
    content: "Boundaries matter.",
    ownerId: "u1",
  }),
);
console.log(
  "Full-stack Notes archive:",
  await notesSystem.useCases.archiveNote({
    user: { id: "u1" },
    noteId: "n1",
  }),
);

// ============================================================
// 61. ARCHITECTURE SMELLS
// ============================================================
// Warning signs:
// - giant controller
// - giant service
// - shared global mutable state
// - circular dependencies everywhere
// - every module can access every database table
// - duplicated business rules
// - infrastructure leaking into domain logic
// - unclear ownership of data
// - impossible-to-test code
// - synchronous chains for independent slow work
// - too many microservices for a tiny team
// - event-driven architecture with no observability
//
// A smell is a signal to investigate, not automatic proof of bad code.

// ============================================================
// 62. CIRCULAR DEPENDENCY
// ============================================================
// A -> B -> A can make initialization and reasoning difficult.
//
// Possible solutions:
// - extract shared abstraction
// - invert dependency
// - introduce an event boundary
// - merge modules if they are actually one responsibility
//
// Do not break every cycle mechanically without understanding the domain.

// ============================================================
// 63. SHARED DATABASE WARNING
// ============================================================
// Multiple services directly modifying the same tables can create hidden
// coupling even if the services are technically separate.
//
// Service boundaries are stronger when ownership and write authority are clear.

// ============================================================
// 64. DISTRIBUTED TRANSACTIONS
// ============================================================
// Coordinating one atomic transaction across multiple independently deployed
// services is difficult.
//
// Alternatives may include:
// - local transactions + events
// - outbox
// - sagas/workflows
// - compensating actions
//
// These introduce their own complexity.

// ============================================================
// 65. SAGA CONCEPT
// ============================================================
// A saga coordinates a long-running business operation as a sequence of local
// transactions, with compensating actions when later steps fail.
//
// Example:
// Reserve inventory -> charge payment -> create shipment
//
// If payment fails, release inventory.
//
// Saga is not a magic replacement for every transaction.

// ============================================================
// 66. EVENTUAL CONSISTENCY UX
// ============================================================
// If search indexing happens asynchronously after note creation, the note may
// appear in the main list before it appears in search.
//
// Architecture and UI should communicate this state honestly.

// ============================================================
// 67. PERFORMANCE BUDGET
// ============================================================
// Define measurable limits rather than saying "make it fast".
//
// Examples:
// - API p95 latency target
// - maximum payload size
// - database query budget
// - page performance budget
// - queue processing latency
//
// Architecture decisions should connect to measurable requirements.

// ============================================================
// 68. CAPACITY PLANNING
// ============================================================
// Estimate:
// requests/second
// concurrent users
// data growth
// storage growth
// queue throughput
// bandwidth
//
// Then identify bottlenecks and safety margins.
//
// Do not use guessed numbers as facts; measure production behavior.

// ============================================================
// 69. BOTTLENECK THINKING
// ============================================================
// End-to-end latency may include:
// client -> CDN -> API -> cache -> database -> external API.
//
// Optimizing the wrong component gives little benefit.
// Measure before optimizing.

// ============================================================
// 70. CACHING TRADE-OFF
// ============================================================
// Cache can reduce latency/load but adds:
// - invalidation complexity
// - stale reads
// - memory/storage cost
// - consistency questions
//
// "Just add Redis" is not an architecture strategy.

// ============================================================
// 71. READ MODEL / CQRS CONCEPT
// ============================================================
// CQRS separates command models from query models when different read/write
// requirements justify it.
//
// Command -> changes state
// Query   -> reads optimized representation
//
// CQRS can be powerful but adds synchronization and model complexity.

// ============================================================
// 72. EVENT SOURCING CONCEPT
// ============================================================
// Instead of storing only current state, store a sequence of domain events and
// derive state from them.
//
// Benefits:
// - historical event record
// - replay possibilities
//
// Costs:
// - event schema evolution
// - storage
// - projection complexity
// - operational difficulty
//
// Do not adopt it merely because it is advanced.

// ============================================================
// 73. DEPLOYMENT ARCHITECTURE
// ============================================================
// Typical deployment concerns:
// - build artifacts
// - environment configuration
// - migrations
// - health checks
// - rolling/blue-green/canary deployments
// - rollback strategy
// - logs/metrics/traces
// - secret management
//
// Deployment is part of architecture because it affects reliability.

// ============================================================
// 74. DATABASE MIGRATIONS
// ============================================================
// Schema changes should be versioned and repeatable.
//
// Safe migration thinking:
// 1. introduce compatible schema
// 2. deploy code that can use old/new form
// 3. backfill if necessary
// 4. switch reads/writes
// 5. remove old schema later
//
// Exact strategy depends on database and deployment model.

// ============================================================
// 75. BACKUP AND DISASTER RECOVERY
// ============================================================
// Backups are not enough. Test restoration.
//
// Important concepts:
// RPO = acceptable amount of data loss measured in time.
// RTO = acceptable recovery time.
//
// Architecture should define realistic recovery objectives.

// ============================================================
// 76. FAIL FAST VS FALLBACK
// ============================================================
// Some failures should fail quickly.
// Others can use a fallback.
//
// Example:
// - optional analytics unavailable -> continue main operation
// - authorization service unavailable -> usually do not silently allow access
//
// Failure policy depends on business criticality.

// ============================================================
// 77. BULKHEAD PATTERN
// ============================================================
// Isolate resources so one overloaded dependency does not consume everything.
//
// Example:
// separate worker pools/limits for email and critical user operations.
//
// The idea is to contain failure.

// ============================================================
// 78. STRANGLER FIG PATTERN
// ============================================================
// Incrementally replace a legacy system by routing selected functionality to a
// new implementation while the old system continues serving remaining areas.
//
// Useful for large migrations.

// ============================================================
// 79. ANTI-CORRUPTION LAYER
// ============================================================
// When integrating with an external/legacy model, translate it at a boundary so
// its concepts do not contaminate your internal domain model.

function legacyUserToDomainUser(legacy) {
  return {
    id: legacy.USER_ID,
    name: legacy.USER_NAME,
  };
}

console.log(
  "Anti-corruption mapping:",
  legacyUserToDomainUser({ USER_ID: "u1", USER_NAME: "Ravi" }),
);

// ============================================================
// 80. ARCHITECTURE TESTING
// ============================================================
// Architecture can be tested with rules such as:
// - domain module cannot import HTTP adapter
// - notes module cannot directly modify users' tables
// - controllers cannot import database driver
//
// These are often called architecture tests/dependency rules.

// ============================================================
// 81. CONTRACT TESTING
// ============================================================
// Contract tests verify that a provider and consumer agree on an API contract.
// Useful when independently deployed components communicate.

function validateNoteResponseContract(response) {
  return (
    typeof response.id === "string" &&
    typeof response.title === "string"
  );
}

console.log(
  "Contract check:",
  validateNoteResponseContract({ id: "n1", title: "Note" }),
);

// ============================================================
// 82. FEATURE FLAGS
// ============================================================
// Feature flags separate deployment from feature exposure.

function createFeatureGate(flags) {
  return {
    enabled(name) {
      return Boolean(flags[name]);
    },
  };
}

const features = createFeatureGate({ newEditor: true });
console.log("Feature flag:", features.enabled("newEditor"));

// Feature flags require lifecycle management; abandoned flags become debt.

// ============================================================
// 83. STRATEGIC VS TACTICAL ARCHITECTURE
// ============================================================
// Strategic:
// boundaries, ownership, system decomposition, deployment topology.
//
// Tactical:
// classes, functions, database queries, algorithms.
//
// Do not solve a strategic problem only by renaming classes.

// ============================================================
// 84. ARCHITECTURE EVOLUTION
// ============================================================
// Good architecture accepts change.
//
// Evolution loop:
// observe -> identify constraint -> make small decision -> measure -> adapt.
//
// Avoid treating today's architecture as permanent.

// ============================================================
// 85. TECHNICAL DEBT
// ============================================================
// Technical debt is the future cost created by shortcuts, outdated design, or
// intentional trade-offs.
//
// Not all debt is bad. Sometimes taking a deliberate shortcut is rational if
// the cost and payoff are understood.

// ============================================================
// 86. ARCHITECTURE REVIEW CHECKLIST
// ============================================================
// Before shipping a major feature ask:
// [ ] What is the business capability?
// [ ] Who owns the data?
// [ ] What is the public boundary?
// [ ] What dependencies exist?
// [ ] Where is validation performed?
// [ ] Where is authorization enforced?
// [ ] What happens on failure?
// [ ] Can slow work be asynchronous?
// [ ] What is cached and why?
// [ ] What consistency is required?
// [ ] How will we observe it?
// [ ] How will we deploy/rollback it?
// [ ] How will the schema evolve?
// [ ] What is the simplest architecture that satisfies requirements?

// ============================================================
// 87. DEBUGGING ARCHITECTURE PROBLEMS
// ============================================================
// When debugging a production issue:
// 1. identify request/correlation ID
// 2. inspect logs
// 3. inspect metrics
// 4. trace cross-service calls if available
// 5. identify dependency failure/latency
// 6. check recent deployment/config/schema changes
// 7. determine blast radius
// 8. mitigate first when necessary
// 9. fix root cause
// 10. record an architectural lesson if appropriate

// ============================================================
// 88. ARCHITECTURE CHALLENGES — BEGINNER
// ============================================================
// 1. Draw UI -> API -> DB for a Notes app.
// 2. Split controller/service/repository responsibilities.
// 3. Design a feature-based Notes module.
// 4. Explain modular monolith in your own words.
// 5. Identify domain rules in a note-sharing feature.
// 6. Build a repository adapter around an in-memory store.
// 7. Add an API response mapper.
// 8. Add validation at the boundary.
// 9. Inject a clock into a use case.
// 10. Write an ADR for your project structure.

// ============================================================
// 89. ARCHITECTURE CHALLENGES — INTERMEDIATE
// ============================================================
// 11. Add cache-aside to note reads.
// 12. Add pagination.
// 13. Add an event bus for NoteCreated.
// 14. Design an outbox record.
// 15. Add a queue worker concept for emails.
// 16. Design authorization as a policy boundary.
// 17. Add request IDs to logs.
// 18. Design graceful shutdown steps.
// 19. Compare offset vs cursor pagination.
// 20. Design a modular monolith with users/notes/tags/sharing.

// ============================================================
// 90. ARCHITECTURE CHALLENGES — ADVANCED
// ============================================================
// 21. Design a Notes app for 1 million daily active users.
// 22. Identify likely bottlenecks before adding infrastructure.
// 23. Design an event-driven search indexing workflow.
// 24. Handle duplicate NoteCreated events.
// 25. Design an outbox worker with retries and dead-letter handling.
// 26. Design idempotent write operations.
// 27. Design a migration from a monolith to services incrementally.
// 28. Define service boundaries from business capabilities.
// 29. Define RPO/RTO for a Notes application.
// 30. Write ADRs explaining why you rejected microservices, CQRS, or event sourcing
//     when they are not justified.

// ============================================================
// 91. TEACH-BACK QUESTIONS
// ============================================================
// Explain without notes:
// - What is architecture?
// - Architecture vs design?
// - Why are boundaries important?
// - What is layered architecture?
// - What is a modular monolith?
// - What is Hexagonal Architecture?
// - What is a port? What is an adapter?
// - What is DDD?
// - Entity vs value object?
// - What is an aggregate?
// - What is eventual consistency?
// - What is an outbox?
// - Why use a queue?
// - Why can caching hurt?
// - What is idempotency?
// - What are logs, metrics, and traces?
// - What is RPO/RTO?
// - Why should architecture evolve?

// ============================================================
// 92. INTERVIEW QUESTIONS
// ============================================================
// Beginner:
// - What is software architecture?
// - Explain monolith vs microservices.
// - What is layered architecture?
// - Why separate controller and service?
// - What is dependency inversion in architecture?
//
// Intermediate:
// - Explain modular monolith.
// - Clean vs Hexagonal architecture?
// - What is a repository boundary?
// - When would you introduce a queue?
// - How does cache-aside work?
// - Why is idempotency important?
//
// Advanced:
// - How would you design a high-scale Notes system?
// - Where would you put authorization?
// - How would you guarantee reliable event publication?
// - When would you choose eventual consistency?
// - How would you migrate a monolith gradually?
// - What architecture trade-offs would you document in ADRs?

// ============================================================
// 93. FINAL MENTAL MODEL
// ============================================================
// Architecture is not:
//   "Use Clean Architecture because it is professional."
//
// Architecture is:
//   "Choose boundaries and dependencies that make the important requirements
//    achievable, understandable, secure, observable, and changeable."
//
// Think in this order:
//
// 1. Business capability
// 2. Requirements + constraints
// 3. Data ownership
// 4. Boundaries
// 5. Dependency direction
// 6. Communication
// 7. Failure/reliability
// 8. Security
// 9. Performance/scaling
// 10. Observability
// 11. Deployment/recovery
// 12. Evolution
//
// Then choose the simplest architecture that satisfies the real problem.

console.log("=== Architecture chapter loaded ===");
