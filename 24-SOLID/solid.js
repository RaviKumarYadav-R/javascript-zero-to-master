/*
 * JavaScript Zero to Master
 * Chapter 24 — SOLID Principles
 * Companion JavaScript File
 *
 * SOLID is a set of object-oriented design principles that help software
 * remain understandable and changeable as requirements grow.
 *
 * Important:
 * SOLID is guidance, not a collection of laws. Good design depends on context.
 * In JavaScript, functions, closures, modules, composition, and dependency
 * injection often achieve SOLID goals without large class hierarchies.
 */

console.log("=== 24. SOLID Principles ===");

// ============================================================
// 1. THE FIVE SOLID PRINCIPLES
// ============================================================
// S — Single Responsibility Principle (SRP)
// O — Open/Closed Principle (OCP)
// L — Liskov Substitution Principle (LSP)
// I — Interface Segregation Principle (ISP)
// D — Dependency Inversion Principle (DIP)
//
// Memory trick:
// S = one responsibility
// O = extend without repeatedly modifying stable code
// L = subtype must remain substitutable
// I = small focused interfaces/contracts
// D = depend on abstractions/stable policies, not volatile details

// ============================================================
// 2. WHY SOLID EXISTS
// ============================================================
// As software grows, common problems appear:
// - one class does everything
// - every new feature requires editing old code
// - subclasses break parent assumptions
// - clients depend on methods they do not need
// - business logic directly creates databases/APIs
//
// SOLID gives us vocabulary for diagnosing these problems.

// ============================================================
// 3. S — SINGLE RESPONSIBILITY PRINCIPLE
// ============================================================
// Definition:
// A module/class should have one coherent responsibility and therefore one
// primary reason to change.
//
// It does NOT mean:
// "Every class must contain exactly one method."
//
// Think in terms of responsibility/cohesion and reasons for change.

// ============================================================
// 4. SRP — BAD EXAMPLE
// ============================================================

class BadUserService {
  createUser(user) {
    console.log("Validate user", user.name);
    console.log("Save user to database", user.name);
    console.log("Send welcome email", user.email);
    console.log("Write audit log", user.name);
  }
}

// This class has several unrelated responsibilities:
// validation, persistence, email, and auditing.

// ============================================================
// 5. SRP — BETTER DESIGN
// ============================================================

function validateUser(user) {
  if (!user.name?.trim()) {
    throw new Error("Name is required");
  }

  if (!user.email?.includes("@")) {
    throw new Error("Valid email is required");
  }

  return true;
}

class UserRepository {
  save(user) {
    console.log("Repository saved:", user.name);
    return user;
  }
}

class WelcomeMailer {
  send(user) {
    console.log("Welcome email:", user.email);
  }
}

class AuditLogger {
  log(event, data) {
    console.log("AUDIT:", event, data);
  }
}

class UserRegistrationService {
  constructor(repository, mailer, logger) {
    this.repository = repository;
    this.mailer = mailer;
    this.logger = logger;
  }

  register(user) {
    validateUser(user);
    const savedUser = this.repository.save(user);
    this.mailer.send(savedUser);
    this.logger.log("USER_CREATED", { id: savedUser.id });
    return savedUser;
  }
}

const registration = new UserRegistrationService(
  new UserRepository(),
  new WelcomeMailer(),
  new AuditLogger(),
);

console.log(
  "SRP:",
  registration.register({ id: "u1", name: "Ravi", email: "ravi@example.com" }),
);

// ============================================================
// 6. SRP IN FUNCTIONAL JAVASCRIPT
// ============================================================
// SRP does not require classes.

const normalizeEmail = (email) => email.trim().toLowerCase();
const isValidEmail = (email) => email.includes("@");
const formatUser = (user) => ({ ...user, email: normalizeEmail(user.email) });

console.log("Functional SRP:", formatUser({ name: "Ravi", email: " RAVI@EXAMPLE.COM " }));

// Small functions with clear jobs are often easier to compose and test.

// ============================================================
// 7. SRP — COMMON MISTAKE
// ============================================================
// "One responsibility" does not mean splitting every line into a new file.
// Excessive fragmentation creates navigation overhead and weak cohesion.
//
// Good question:
// "Do these pieces change for the same reason?"
//
// If yes, keeping them together may be reasonable.
// If no, separation may improve design.

// ============================================================
// 8. SRP — FULL-STACK EXAMPLE
// ============================================================
// Controller responsibility:
//   HTTP input/output.
//
// Service responsibility:
//   application/business operation.
//
// Repository responsibility:
//   persistence.
//
// Validator responsibility:
//   input validation.
//
// Mailer responsibility:
//   email delivery.
//
// These boundaries are useful because each can change independently.

// ============================================================
// 9. O — OPEN/CLOSED PRINCIPLE
// ============================================================
// Definition:
// Software entities should be open for extension but closed for modification.
//
// Meaning:
// Once stable behavior exists, new variations should ideally be added through
// new implementations/composition rather than repeatedly editing fragile core
// logic.
//
// OCP does NOT mean "never modify existing code."
// Requirements and bugs sometimes require modification.

// ============================================================
// 10. OCP — BAD DISCOUNT EXAMPLE
// ============================================================

function badDiscount(type, price) {
  if (type === "student") return price * 0.9;
  if (type === "festival") return price * 0.8;
  if (type === "vip") return price * 0.7;
  return price;
}

console.log("Bad OCP example:", badDiscount("student", 1000));

// Every new discount type requires editing this function.

// ============================================================
// 11. OCP — STRATEGY-BASED DESIGN
// ============================================================

const discountStrategies = {
  student: (price) => price * 0.9,
  festival: (price) => price * 0.8,
  vip: (price) => price * 0.7,
};

function calculateDiscountedPrice(price, strategy) {
  if (typeof strategy !== "function") {
    throw new TypeError("A discount strategy is required");
  }

  return strategy(price);
}

console.log(
  "OCP:",
  calculateDiscountedPrice(1000, discountStrategies.student),
);

const employeeDiscount = (price) => price * 0.85;
console.log(calculateDiscountedPrice(1000, employeeDiscount));

// New behavior can be added without changing calculateDiscountedPrice.

// ============================================================
// 12. OCP — PLUGIN REGISTRY
// ============================================================
// A registry is useful when implementations are selected dynamically.

class FormatterRegistry {
  constructor() {
    this.formatters = new Map();
  }

  register(name, formatter) {
    if (typeof formatter !== "function") {
      throw new TypeError("Formatter must be a function");
    }

    this.formatters.set(name, formatter);
  }

  format(name, value) {
    const formatter = this.formatters.get(name);

    if (!formatter) {
      throw new Error(`Unknown formatter: ${name}`);
    }

    return formatter(value);
  }
}

const formatters = new FormatterRegistry();
formatters.register("upper", (value) => String(value).toUpperCase());
formatters.register("lower", (value) => String(value).toLowerCase());
formatters.register("slug", (value) =>
  String(value).trim().toLowerCase().replaceAll(" ", "-"),
);

console.log("Registry OCP:", formatters.format("slug", "Design Patterns"));

// ============================================================
// 13. OCP — IMPORTANT TRADE-OFF
// ============================================================
// Abstraction itself has a cost.
//
// If there are only two stable cases, a simple conditional may be clearer.
// If variations are frequent and independently developed, Strategy/Registry
// may provide significant value.

// ============================================================
// 14. L — LISKOV SUBSTITUTION PRINCIPLE
// ============================================================
// Definition:
// If S is a subtype of T, objects of S should be usable where T is expected
// without breaking the correctness of the program.
//
// Practical questions:
// - Does the subtype honor the parent's contract?
// - Does it preserve expected return behavior?
// - Does it reject inputs the parent promised to support?
// - Does it introduce surprising side effects?
//
// LSP is about behavioral substitutability, not merely matching method names.

// ============================================================
// 15. LSP — GOOD EXAMPLE
// ============================================================

class Bird {
  move() {
    return "Bird moves";
  }
}

class Sparrow extends Bird {
  move() {
    return "Sparrow flies";
  }
}

function makeBirdMove(bird) {
  return bird.move();
}

console.log("LSP good:", makeBirdMove(new Sparrow()));

// Sparrow preserves the general contract: it can move.

// ============================================================
// 16. LSP — CLASSIC BAD INHERITANCE EXAMPLE
// ============================================================
// A penguin is biologically a bird, but if the software's Bird abstraction
// promises fly(), Penguin cannot safely substitute for every Bird.

class FlyingBird {
  fly() {
    return "Flying";
  }
}

class Eagle extends FlyingBird {}

// A Penguin extending FlyingBird would inherit a behavior it cannot provide.
// That is a design smell: the abstraction is too specific.

// ============================================================
// 17. LSP — BETTER ABSTRACTION
// ============================================================

class Animal {
  move() {
    return "Moving";
  }
}

class FlyingAnimal extends Animal {
  fly() {
    return "Flying";
  }
}

class Eagle2 extends FlyingAnimal {}
class Penguin extends Animal {}

console.log("LSP better:", new Eagle2().fly(), new Penguin().move());

// The base abstraction promises only what all valid subtypes can support.

// ============================================================
// 18. LSP — THROWING CAN ALSO BREAK A CONTRACT
// ============================================================
// Suppose a base method promises that every valid input is accepted.
// A subtype that unexpectedly throws for those same valid inputs may violate
// substitutability.
//
// Not every thrown error is an LSP violation; the question is whether the
// subtype breaks the established contract.

// ============================================================
// 19. LSP — POSTCONDITIONS
// ============================================================
// A useful mental model:
//
// Preconditions: what caller must provide.
// Postconditions: what implementation guarantees afterward.
// Invariants: what remains true about the object.
//
// A subtype should not arbitrarily strengthen required preconditions or weaken
// promised postconditions.

// ============================================================
// 20. LSP — PREFER CAPABILITY-BASED DESIGN
// ============================================================
// Instead of asking:
// "Is this object technically a subclass?"
// Ask:
// "What capability does the caller actually need?"

const movable = {
  move() {
    return "Moving";
  },
};

function moveThing(thing) {
  return thing.move();
}

console.log("Capability design:", moveThing(movable));

// ============================================================
// 21. I — INTERFACE SEGREGATION PRINCIPLE
// ============================================================
// Definition:
// Clients should not be forced to depend on methods they do not use.
//
// JavaScript does not have Java-style interfaces at runtime, but the principle
// still applies to object shapes, TypeScript interfaces, modules, and APIs.

// ============================================================
// 22. ISP — BAD INTERFACE
// ============================================================
// Imagine a giant device contract:
//
// interface Machine {
//   print();
//   scan();
//   fax();
//   staple();
// }
//
// A simple printer should not need fake implementations for scan/fax/staple.

// ============================================================
// 23. ISP — SMALL CAPABILITIES
// ============================================================

const printer = {
  print(document) {
    return `Printed: ${document}`;
  },
};

const scanner = {
  scan(document) {
    return `Scanned: ${document}`;
  },
};

function printDocument(device, document) {
  return device.print(document);
}

console.log("ISP:", printDocument(printer, "notes.pdf"));

// A print-only client depends only on print().

// ============================================================
// 24. ISP — FUNCTION PARAMETERS
// ============================================================
// Avoid passing huge configuration/dependency objects when a function needs
// only one small capability.

function sendWelcome(sendEmail) {
  return sendEmail("Welcome!");
}

const emailSender = (message) => `Email: ${message}`;
console.log("ISP function:", sendWelcome(emailSender));

// ============================================================
// 25. ISP — TYPESCRIPT CONNECTION
// ============================================================
// TypeScript can express focused interfaces:
//
// interface Reader<T> {
//   read(id: string): Promise<T | null>;
// }
//
// interface Writer<T> {
//   save(value: T): Promise<T>;
// }
//
// A read-only consumer can depend on Reader rather than Reader + Writer.
//
// The JavaScript runtime still sees objects/functions; the interface is a
// compile-time contract.

// ============================================================
// 26. D — DEPENDENCY INVERSION PRINCIPLE
// ============================================================
// Definition:
// High-level policy should not be tightly coupled to low-level implementation
// details. Both should depend on stable abstractions/contracts.
//
// Also:
// Abstractions should not depend on details; details should depend on the
// abstractions.
//
// In JavaScript, "abstraction" may be a function contract, object shape,
// module boundary, or TypeScript interface.

// ============================================================
// 27. DIP — BAD EXAMPLE
// ============================================================

class MongoUserRepository {
  findById(id) {
    return { id, name: "Ravi" };
  }
}

class BadUserService {
  constructor() {
    this.repository = new MongoUserRepository();
  }

  getUser(id) {
    return this.repository.findById(id);
  }
}

// BadUserService directly creates a concrete infrastructure dependency.
// Replacing MongoDB with PostgreSQL or a test fake requires changing the service.

// ============================================================
// 28. DIP — DEPENDENCY INJECTION
// ============================================================

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  getUser(id) {
    return this.repository.findById(id);
  }
}

const mongoRepository = new MongoUserRepository();
const productionUserService = new UserService(mongoRepository);

console.log("DIP production:", productionUserService.getUser("u1"));

// The service depends on the findById contract, not the MongoDB class itself.

// ============================================================
// 29. DIP — TEST FAKE
// ============================================================

const fakeRepository = {
  findById(id) {
    return { id, name: "Fake User" };
  },
};

const testUserService = new UserService(fakeRepository);
console.log("DIP test:", testUserService.getUser("test-1"));

// Same high-level service, different implementation.

// ============================================================
// 30. DEPENDENCY INJECTION VS DEPENDENCY INVERSION
// ============================================================
// Dependency Injection (DI) = a technique for supplying dependencies.
// Dependency Inversion Principle (DIP) = a design principle about coupling.
//
// DI can help implement DIP, but they are not identical terms.

// ============================================================
// 31. CONSTRUCTOR INJECTION
// ============================================================

class NoteService {
  constructor(noteRepository, clock) {
    this.noteRepository = noteRepository;
    this.clock = clock;
  }

  create(input) {
    if (!input.title?.trim()) {
      throw new Error("Title required");
    }

    return this.noteRepository.save({
      title: input.title.trim(),
      createdAt: this.clock.now(),
    });
  }
}

const noteService = new NoteService(
  {
    save(note) {
      return { id: "n1", ...note };
    },
  },
  {
    now() {
      return "2026-01-01T00:00:00.000Z";
    },
  },
);

console.log("Constructor injection:", noteService.create({ title: "SOLID" }));

// Injecting the clock also makes time-dependent logic deterministic in tests.

// ============================================================
// 32. FUNCTION INJECTION
// ============================================================
// JavaScript often needs no DI container.

function createId() {
  return "generated-id";
}

function createNoteService(repository, idGenerator = createId) {
  return {
    create(title) {
      const note = { id: idGenerator(), title };
      return repository.save(note);
    },
  };
}

const simpleRepo = {
  save(note) {
    return note;
  },
};

const simpleNoteService = createNoteService(simpleRepo, () => "test-id");
console.log("Function injection:", simpleNoteService.create("Hello"));

// ============================================================
// 33. SRP + OCP TOGETHER
// ============================================================
// Example: payment processing.
//
// SRP: payment service coordinates payment use-case.
// OCP: individual payment methods can be added as strategies.

const paymentMethods = {
  card: {
    pay(amount) {
      return `Card payment: ${amount}`;
    },
  },
  upi: {
    pay(amount) {
      return `UPI payment: ${amount}`;
    },
  },
};

function processPayment(method, amount) {
  const paymentMethod = paymentMethods[method];
  if (!paymentMethod) throw new Error("Unsupported payment method");
  return paymentMethod.pay(amount);
}

console.log("SRP + OCP:", processPayment("upi", 499));

// ============================================================
// 34. OCP + DIP WITH REGISTRY
// ============================================================

function createPaymentService(registry) {
  return {
    pay(method, amount) {
      const implementation = registry[method];
      if (!implementation) throw new Error("Unsupported payment method");
      return implementation.pay(amount);
    },
  };
}

const paymentRegistry = {
  card: {
    pay: (amount) => ({ method: "card", amount }),
  },
  upi: {
    pay: (amount) => ({ method: "upi", amount }),
  },
};

const paymentService = createPaymentService(paymentRegistry);
console.log("OCP + DIP:", paymentService.pay("card", 1000));

// ============================================================
// 35. LSP + ISP
// ============================================================
// If a client needs only `save()`, use a save-capability contract.
// Implementations that support it should behave consistently.

function saveEntity(writer, entity) {
  if (typeof writer.save !== "function") {
    throw new TypeError("Writer must provide save()");
  }

  return writer.save(entity);
}

const writerA = {
  save(entity) {
    return { ...entity, savedBy: "A" };
  },
};

const writerB = {
  save(entity) {
    return { ...entity, savedBy: "B" };
  },
};

console.log("LSP + ISP:", saveEntity(writerA, { id: 1 }));
console.log("LSP + ISP:", saveEntity(writerB, { id: 1 }));

// ============================================================
// 36. SOLID + COMPOSITION
// ============================================================
// Composition is often more natural in JavaScript than inheritance.

function withTimestamp(clock) {
  return (entity) => ({
    ...entity,
    createdAt: clock.now(),
  });
}

function withId(idGenerator) {
  return (entity) => ({
    ...entity,
    id: idGenerator(),
  });
}

const fixedClock = { now: () => "2026-01-01" };
const buildEntity = (entity) =>
  withTimestamp(fixedClock)(withId(() => "id-1")(entity));

console.log("Composition:", buildEntity({ title: "Note" }));

// Small behaviors can be composed without a deep inheritance tree.

// ============================================================
// 37. SOLID + PURE FUNCTIONS
// ============================================================
// Pure business rules are often naturally SRP-friendly and easy to test.

function isAdult(age) {
  return age >= 18;
}

function canCreateAccount(user) {
  return isAdult(user.age) && user.email.includes("@");
}

console.log("Pure business rule:", canCreateAccount({ age: 21, email: "a@b.com" }));

// ============================================================
// 38. SOLID + ERROR BOUNDARIES
// ============================================================
// Keep low-level error details away from high-level business rules when useful.

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

function getRequiredUser(repository, id) {
  const user = repository.findById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
}

const users = {
  findById(id) {
    return id === "1" ? { id, name: "Ravi" } : null;
  },
};

console.log("Error boundary:", getRequiredUser(users, "1"));

// ============================================================
// 39. SOLID + ASYNC CODE
// ============================================================
// Dependency contracts can be async too.

function createAsyncUserService(userRepository) {
  return {
    async getName(id) {
      const user = await userRepository.findById(id);
      return user?.name ?? null;
    },
  };
}

const asyncFakeRepository = {
  async findById(id) {
    return { id, name: "Async User" };
  },
};

const asyncUserService = createAsyncUserService(asyncFakeRepository);
console.log("Async DIP:", await asyncUserService.getName("u1"));

// ============================================================
// 40. SOLID + CONTROLLERS
// ============================================================
// A controller should generally translate transport concerns into application
// calls, rather than containing every business rule and database operation.

function createNoteController(noteService) {
  return {
    async create(request) {
      const note = await noteService.create(request.body);

      return {
        status: 201,
        body: note,
      };
    },
  };
}

const controller = createNoteController({
  async create(input) {
    return { id: "n1", title: input.title };
  },
});

console.log(
  "Controller boundary:",
  await controller.create({ body: { title: "SOLID" } }),
);

// ============================================================
// 41. FULL-STACK NOTES ARCHITECTURE
// ============================================================
// A practical dependency direction:
//
// HTTP request
//    ↓
// Controller
//    ↓
// Application Service
//    ↓
// Repository contract
//    ↓
// MongoDB/PostgreSQL implementation
//
// Supporting dependencies:
// validation, clock, ID generator, mailer, event publisher
//
// The important point is not the exact folder names. The important point is
// that business policy is not tightly coupled to infrastructure details.

// ============================================================
// 42. NOTES APP — REPOSITORY CONTRACT
// ============================================================

function createNoteRepositoryAdapter(database) {
  return {
    async save(note) {
      return database.insert("notes", note);
    },

    async findById(id) {
      return database.findOne("notes", { id });
    },
  };
}

const fakeDatabase = {
  async insert(collection, document) {
    return { collection, ...document };
  },

  async findOne(collection, query) {
    return { collection, ...query, title: "Example" };
  },
};

const repositoryAdapter = createNoteRepositoryAdapter(fakeDatabase);
console.log(
  "Repository adapter:",
  await repositoryAdapter.findById("n1"),
);

// Infrastructure can be replaced while the application contract remains stable.

// ============================================================
// 43. NOTES APP — APPLICATION SERVICE
// ============================================================

function createNotesApplication({ repository, idGenerator, clock }) {
  return {
    async createNote(input) {
      if (!input.title?.trim()) {
        throw new Error("Title is required");
      }

      const note = {
        id: idGenerator(),
        title: input.title.trim(),
        content: input.content ?? "",
        createdAt: clock.now(),
      };

      return repository.save(note);
    },
  };
}

const notesApplication = createNotesApplication({
  repository: {
    async save(note) {
      return note;
    },
  },
  idGenerator: () => "note-123",
  clock: { now: () => "2026-01-01T00:00:00.000Z" },
});

console.log(
  "Notes application:",
  await notesApplication.createNote({
    title: "SOLID Principles",
    content: "Build change-friendly software.",
  }),
);

// ============================================================
// 44. SOLID + EVENTS
// ============================================================
// Instead of making the Note service know every side effect, publish an event.

function createEventBus() {
  const listeners = new Map();

  return {
    subscribe(event, handler) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event).add(handler);
      return () => listeners.get(event)?.delete(handler);
    },

    publish(event, payload) {
      for (const handler of listeners.get(event) ?? []) {
        handler(payload);
      }
    },
  };
}

const eventBus = createEventBus();

eventBus.subscribe("NoteCreated", (note) => {
  console.log("Search index updated:", note.id);
});

eventBus.subscribe("NoteCreated", (note) => {
  console.log("Analytics recorded:", note.id);
});

eventBus.publish("NoteCreated", { id: "n1" });

// This can reduce direct coupling, but introduces event-driven trade-offs such
// as ordering, duplicate delivery, retries, and eventual consistency.

// ============================================================
// 45. SOLID + TESTABILITY
// ============================================================
// The easiest way to test business logic is often to inject deterministic
// dependencies rather than mock every internal detail.

function createPriceService(taxCalculator) {
  return {
    finalPrice(price) {
      return price + taxCalculator(price);
    },
  };
}

const fakeTax = (price) => price * 0.1;
const priceService = createPriceService(fakeTax);

console.log("Testable design:", priceService.finalPrice(100));

// ============================================================
// 46. SOLID + MOCKING WARNING
// ============================================================
// Too many mocks can indicate excessive coupling to implementation details.
// Prefer testing observable behavior and stable contracts.
//
// Good test:
// "Creating a valid note saves a note with normalized title."
//
// Fragile test:
// "Private helper A calls helper B exactly once before helper C."

// ============================================================
// 47. SRP DEBUGGING QUESTIONS
// ============================================================
// If a class feels too large, ask:
// 1. What are its responsibilities?
// 2. Which requirements make it change?
// 3. Which methods share data and purpose?
// 4. Which dependencies belong to infrastructure?
// 5. Can a focused module be extracted without creating awkward coupling?

// ============================================================
// 48. OCP DEBUGGING QUESTIONS
// ============================================================
// 1. What changes every time a new variant is added?
// 2. Is a growing switch a stable decision point?
// 3. Can a strategy/registry be injected?
// 4. Would extension actually be more complex than modification?
// 5. Is the abstraction premature?

// ============================================================
// 49. LSP DEBUGGING QUESTIONS
// ============================================================
// 1. Can every subtype be passed to existing callers?
// 2. Does the subtype require stronger preconditions?
// 3. Does it weaken promised results?
// 4. Does it throw unexpectedly?
// 5. Does inheritance model a real behavioral relationship?

// ============================================================
// 50. ISP DEBUGGING QUESTIONS
// ============================================================
// 1. Does a client use only a small fraction of an API?
// 2. Are implementations forced to provide meaningless methods?
// 3. Can the dependency be expressed as a smaller capability?
// 4. Are configuration objects becoming giant interfaces?

// ============================================================
// 51. DIP DEBUGGING QUESTIONS
// ============================================================
// 1. Does business logic instantiate infrastructure directly?
// 2. Can the dependency be passed in?
// 3. Could a fake implementation be used in a test?
// 4. Does the dependency direction point toward stable policy?
// 5. Are database/API details leaking into domain logic?

// ============================================================
// 52. SOLID DOES NOT MEAN MORE CLASSES
// ============================================================
// A common beginner mistake is:
//
// One requirement
// -> interface
// -> abstract class
// -> factory
// -> factory factory
// -> dependency container
//
// This can make a tiny program harder to understand.
//
// In JavaScript, this may be enough:

function createGreeting(name) {
  return `Hello, ${name}`;
}

console.log("Simple is good:", createGreeting("Ravi"));

// Use the simplest design that preserves clarity and changeability.

// ============================================================
// 53. SOLID VS DRY
// ============================================================
// DRY = avoid unnecessary duplication of knowledge.
// SOLID = principles for managing responsibilities, extension, substitution,
// interfaces, and dependencies.
//
// DRY can be misused to create premature abstractions.
// Repeated code is sometimes acceptable when the underlying reasons for change
// are different.

// ============================================================
// 54. SOLID VS KISS
// ============================================================
// KISS = Keep It Simple.
//
// SOLID should support simplicity, not fight it.
// If applying a principle creates more complexity than the problem warrants,
// reconsider the abstraction.

// ============================================================
// 55. SOLID VS YAGNI
// ============================================================
// YAGNI = You Aren't Gonna Need It.
//
// Do not build elaborate extension points for hypothetical requirements.
// Build for known change and reasonable future flexibility.

// ============================================================
// 56. SOLID + DESIGN PATTERNS
// ============================================================
// Patterns often help implement SOLID ideas:
//
// SRP -> Facade/Repository/Service can separate responsibilities
// OCP -> Strategy/Decorator/Factory/Plugin registry
// LSP -> carefully designed polymorphism
// ISP -> small capability interfaces
// DIP -> Dependency Injection/Repository
//
// But a pattern does not automatically make code SOLID.

// ============================================================
// 57. SOLID + CLEAN ARCHITECTURE
// ============================================================
// A common dependency direction is:
//
// Framework/UI/HTTP
//       ↓
// Application use cases
//       ↓
// Domain/business rules
//
// Infrastructure details sit at the outer boundary and implement contracts
// required by inner policy.
//
// Exact architecture varies by project; avoid turning a diagram into dogma.

// ============================================================
// 58. COHESION AND COUPLING
// ============================================================
// Cohesion = how closely related responsibilities inside a module are.
// Coupling = how strongly modules depend on each other.
//
// Good design generally seeks:
// - high cohesion
// - manageable/low unnecessary coupling
//
// SOLID is largely a vocabulary for improving these properties.

// ============================================================
// 59. STABLE DEPENDENCIES
// ============================================================
// Business rules often change differently from infrastructure details.
//
// Example:
// Business policy: "A user can archive only their own note."
// Infrastructure detail: "MongoDB stores ownerId."
//
// Keep the business rule from becoming inseparable from MongoDB query syntax.

// ============================================================
// 60. BOUNDARY TRANSLATION
// ============================================================
// Translate external data at boundaries.

function toNoteDomain(externalNote) {
  return {
    id: externalNote._id,
    title: externalNote.title,
    ownerId: externalNote.owner_id,
  };
}

console.log(
  "Boundary translation:",
  toNoteDomain({ _id: "n1", title: "SOLID", owner_id: "u1" }),
);

// This prevents external naming/shape conventions from leaking everywhere.

// ============================================================
// 61. SOLID + SECURITY
// ============================================================
// Separation helps security when authorization is explicit at the appropriate
// trusted boundary.

function createNoteAuthorizationPolicy() {
  return {
    canRead(user, note) {
      return user.id === note.ownerId || user.roles?.includes("admin");
    },
  };
}

const authorization = createNoteAuthorizationPolicy();
console.log(
  "Authorization policy:",
  authorization.canRead(
    { id: "u1", roles: [] },
    { id: "n1", ownerId: "u1" },
  ),
);

// Never rely on frontend-only checks for authorization.

// ============================================================
// 62. SOLID + CONFIGURATION
// ============================================================
// Inject configuration instead of reading global mutable configuration deep in
// every function.

function createApiClient({ baseUrl, fetchImpl }) {
  return {
    async get(path) {
      const response = await fetchImpl(`${baseUrl}${path}`);
      return response;
    },
  };
}

const fakeFetch = async (url) => ({ ok: true, url });
const apiClient = createApiClient({
  baseUrl: "https://api.example.com",
  fetchImpl: fakeFetch,
});

console.log("Config DI:", await apiClient.get("/notes"));

// ============================================================
// 63. SOLID + TIME
// ============================================================
// Time is an implicit dependency. Injecting a clock makes time-dependent rules
// deterministic.

function createSubscriptionPolicy(clock) {
  return {
    isExpired(subscription) {
      return clock.now() >= subscription.expiresAt;
    },
  };
}

const testClock = {
  now() {
    return 100;
  },
};

const subscriptionPolicy = createSubscriptionPolicy(testClock);
console.log(
  "Clock injection:",
  subscriptionPolicy.isExpired({ expiresAt: 90 }),
);

// ============================================================
// 64. SOLID + RANDOMNESS
// ============================================================
// Randomness is another dependency that can make tests nondeterministic.

function createTokenService(randomGenerator) {
  return {
    createToken() {
      return `token-${randomGenerator()}`;
    },
  };
}

const deterministicTokenService = createTokenService(() => "abc123");
console.log("Randomness injection:", deterministicTokenService.createToken());

// ============================================================
// 65. SOLID + LOGGING
// ============================================================
// Logging can be injected rather than hard-coded everywhere.

function createOrderService(logger) {
  return {
    createOrder(order) {
      logger.info("Creating order", { id: order.id });
      return order;
    },
  };
}

const testLogger = {
  info(message, data) {
    console.log(message, data);
  },
};

console.log(
  "Logger DI:",
  createOrderService(testLogger).createOrder({ id: "o1" }),
);

// ============================================================
// 66. SOLID + ASYNC RETRIES
// ============================================================
// Retry policy can be separated from the operation itself.

async function retry(operation, attempts) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt === attempts) break;
    }
  }

  throw lastError;
}

let attempts = 0;
const result = await retry(async () => {
  attempts += 1;
  if (attempts < 2) throw new Error("Temporary failure");
  return "success";
}, 3);

console.log("Retry policy:", result);

// In production, retry decisions must consider idempotency, status codes,
// rate limits, backoff, cancellation, and duplicate side effects.

// ============================================================
// 67. COMMON SOLID MISTAKES
// ============================================================
// 1. Treating SOLID as five rules that must always be applied.
// 2. Confusing SRP with "one method per class".
// 3. Creating abstractions before variation exists.
// 4. Using inheritance only to reuse code.
// 5. Calling any subclass substitution an LSP-compliant relationship.
// 6. Making interfaces enormous.
// 7. Confusing Dependency Injection with Dependency Inversion.
// 8. Creating a DI container for a small script.
// 9. Hiding business logic behind repositories.
// 10. Putting all logic in controllers.
// 11. Using global mutable state as a dependency.
// 12. Writing tests that depend on private implementation details.
// 13. Applying SOLID but increasing complexity dramatically.
// 14. Treating frontend authorization as sufficient security.
// 15. Creating dozens of tiny modules with no coherent boundaries.

// ============================================================
// 68. WRONG VS BETTER — CONTROLLER
// ============================================================
// Wrong idea:
// controller validates input, queries MongoDB, calculates pricing, sends email,
// and builds every HTTP response.
//
// Better direction:
// controller -> application service -> repository/mailer/payment dependencies.
//
// The exact split depends on project complexity.

// ============================================================
// 69. WRONG VS BETTER — DATABASE DEPENDENCY
// ============================================================
// Wrong:
//
// class Service {
//   constructor() {
//     this.db = new MongoClient(...);
//   }
// }
//
// Better:
//
// class Service {
//   constructor(repository) {
//     this.repository = repository;
//   }
// }
//
// Infrastructure wiring happens at the application composition root.

// ============================================================
// 70. COMPOSITION ROOT
// ============================================================
// The composition root is the place where concrete dependencies are assembled.
//
// Example:
//
// const repository = new MongoRepository(db);
// const mailer = new SmtpMailer(config);
// const service = new UserService(repository, mailer);
// const controller = new UserController(service);
//
// Business code receives dependencies; startup code wires implementations.

// ============================================================
// 71. SOLID IN JAVASCRIPT MODULES
// ============================================================
// Modules themselves can provide useful boundaries:
//
// validators.js
// repositories.js
// services.js
// policies.js
// controllers.js
//
// Do not choose folders solely because a textbook has them. Organize around
// responsibilities and change boundaries.

// ============================================================
// 72. SOLID + DOMAIN RULES
// ============================================================
// Domain rules should remain understandable without requiring a database.

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

// ============================================================
// 73. SOLID + USE CASE
// ============================================================

function createArchiveNoteUseCase({ repository, authorization }) {
  return {
    async execute({ user, noteId }) {
      const note = await repository.findById(noteId);

      if (!note) throw new NotFoundError("Note not found");
      if (!authorization.canArchive(user, note)) {
        throw new Error("Forbidden");
      }

      return repository.archive(noteId);
    },
  };
}

const archiveUseCase = createArchiveNoteUseCase({
  repository: {
    async findById(id) {
      return { id, ownerId: "u1", isArchived: false };
    },
    async archive(id) {
      return { id, isArchived: true };
    },
  },
  authorization: {
    canArchive(user, note) {
      return user.id === note.ownerId && !note.isArchived;
    },
  },
});

console.log(
  "Use case:",
  await archiveUseCase.execute({ user: { id: "u1" }, noteId: "n1" }),
);

// ============================================================
// 74. SOLID + API RESPONSE MAPPING
// ============================================================
// Keep transport representation at the edge.

function toNoteResponse(note) {
  return {
    id: note.id,
    title: note.title,
    content: note.content,
  };
}

console.log(
  "Response mapper:",
  toNoteResponse({ id: "n1", title: "SOLID", content: "...", internalFlag: true }),
);

// Internal fields need not automatically become public API fields.

// ============================================================
// 75. SOLID + VALIDATION BOUNDARY
// ============================================================
// External input is untrusted. Validate/normalize at a boundary, then pass a
// known shape inward.

function parseCreateNoteInput(input) {
  if (!input || typeof input !== "object") {
    throw new TypeError("Invalid input");
  }

  const title = String(input.title ?? "").trim();
  const content = String(input.content ?? "");

  if (!title) throw new Error("Title required");

  return { title, content };
}

console.log(
  "Input boundary:",
  parseCreateNoteInput({ title: "  SOLID  ", content: "Notes" }),
);

// Runtime validation remains necessary even in TypeScript applications because
// external JSON does not become trustworthy merely because a type says so.

// ============================================================
// 76. SOLID + EVENTS: COUPLING TRADE-OFF
// ============================================================
// Direct call:
// createNote() -> sendEmail()
//
// Event approach:
// createNote() -> publish(NoteCreated)
//                         -> email handler
//                         -> search handler
//                         -> analytics handler
//
// Events reduce direct coupling but increase operational complexity.
// Use them when decoupling/asynchrony is actually valuable.

// ============================================================
// 77. SOLID + CACHING
// ============================================================
// A cache can be an infrastructure detail behind a repository/service boundary.
//
// Do not spread cache checks through every business rule.

function createCachedRepository(repository) {
  const cache = new Map();

  return {
    async findById(id) {
      if (cache.has(id)) return cache.get(id);

      const value = await repository.findById(id);
      if (value) cache.set(id, value);
      return value;
    },

    async save(note) {
      const saved = await repository.save(note);
      cache.set(saved.id, saved);
      return saved;
    },
  };
}

const cachedRepo = createCachedRepository({
  async findById(id) {
    return { id, title: "Cached note" };
  },
  async save(note) {
    return note;
  },
});

console.log("Cached boundary:", await cachedRepo.findById("n1"));

// Real cache design also needs invalidation, TTL, size limits, and consistency
// decisions.

// ============================================================
// 78. OUTPUT PREDICTION
// ============================================================

const basePrice = 100;
const addTax = (price) => price * 1.18;
const addDiscount = (price) => price * 0.9;

const finalPrice = addDiscount(addTax(basePrice));
console.log("Output prediction:", finalPrice); // 106.2

// ============================================================
// 79. MINI CHALLENGES — BEGINNER
// ============================================================
// 1. Find SRP violations in a User class that validates, saves, emails, and logs.
// 2. Split it into focused responsibilities.
// 3. Replace a growing discount switch with Strategy.
// 4. Build a notification registry using OCP.
// 5. Create two implementations that satisfy a common capability contract.
// 6. Find an inheritance example that violates LSP.
// 7. Split a giant printer interface into small capabilities.
// 8. Inject a repository into a service.
// 9. Inject a clock into date-dependent business logic.
// 10. Inject a random ID generator into an entity creator.

// ============================================================
// 80. MINI CHALLENGES — INTERMEDIATE
// ============================================================
// 11. Refactor a 300-line controller using SRP.
// 12. Build a payment Strategy system.
// 13. Build an Adapter around a legacy repository.
// 14. Build a Repository contract with an in-memory implementation.
// 15. Create a service that depends only on a Reader capability.
// 16. Build a small plugin registry.
// 17. Refactor deep inheritance into composition.
// 18. Build a testable API client with injected fetch.
// 19. Build a testable scheduler with injected clock.
// 20. Design a Note service with repository + validator + event publisher.

// ============================================================
// 81. MINI CHALLENGES — ADVANCED
// ============================================================
// 21. Design the Notes app around use cases and explicit dependency direction.
// 22. Separate domain rules from MongoDB documents.
// 23. Add an event-driven NoteCreated workflow.
// 24. Add a cached repository without changing business logic.
// 25. Design idempotent command handling for note creation.
// 26. Introduce retries only around safe/transient operations.
// 27. Build a plugin-based notification architecture.
// 28. Analyze where SOLID creates unnecessary abstraction in your project.
// 29. Refactor a real feature from your app and document each SOLID decision.
// 30. Write tests that prove behavior rather than implementation details.

// ============================================================
// 82. DEBUGGING CHALLENGES
// ============================================================
// Challenge A:
// UserService contains MongoDB, email, validation, logging, and JWT logic.
// Question: Identify its reasons to change.
//
// Challenge B:
// A new payment method requires editing six switch statements.
// Question: Where could Strategy or a registry help?
//
// Challenge C:
// Penguin extends FlyingBird and throws from fly().
// Question: What contract is broken?
//
// Challenge D:
// Read-only analytics code receives a huge Repository with 40 methods.
// Question: How could ISP reduce coupling?
//
// Challenge E:
// Service constructs MongoRepository internally.
// Question: How would DI change the dependency direction?

// ============================================================
// 83. INTERVIEW QUESTIONS — BEGINNER
// ============================================================
// - What does SOLID stand for?
// - Explain SRP with a real example.
// - What does Open/Closed mean?
// - What is LSP?
// - What is Interface Segregation?
// - What is Dependency Inversion?
// - Is SOLID only for class-based languages?
// - Why is composition useful in JavaScript?

// ============================================================
// 84. INTERVIEW QUESTIONS — INTERMEDIATE
// ============================================================
// - SRP vs separation into too many classes?
// - How does Strategy help OCP?
// - Give an LSP violation example.
// - How can TypeScript interfaces help ISP?
// - DI vs DIP?
// - How does Repository support DIP?
// - Where should dependency wiring happen?
// - Why can global singletons hurt testability?

// ============================================================
// 85. INTERVIEW QUESTIONS — ADVANCED
// ============================================================
// - Is every switch statement an OCP violation?
// - How do you decide whether an abstraction is premature?
// - How do SOLID principles interact with functional programming?
// - How would you apply SOLID to a full-stack Notes application?
// - What trade-offs do event-driven boundaries introduce?
// - How can excessive mocking reveal bad design?
// - How do you preserve domain independence from infrastructure?
// - When would violating a SOLID guideline be reasonable?

// ============================================================
// 86. TEACH-BACK QUESTIONS
// ============================================================
// Explain each without notes:
// 1. What problem does SRP solve?
// 2. What does "reason to change" mean?
// 3. How does Strategy support OCP?
// 4. What does substitutable mean in LSP?
// 5. Why can inheritance violate LSP?
// 6. What does ISP protect clients from?
// 7. What is an abstraction in JavaScript?
// 8. What is Dependency Injection?
// 9. How is DI different from DIP?
// 10. Why should infrastructure details stay at boundaries?
// 11. Why does SOLID not mean "more classes"?
// 12. When would you deliberately keep code simple instead of applying a pattern?

// ============================================================
// 87. SOLID SELF-REVIEW CHECKLIST
// ============================================================
// Before merging a feature, ask:
//
// SRP
// [ ] Are responsibilities coherent?
// [ ] Are unrelated reasons to change separated?
//
// OCP
// [ ] Are frequent variations isolated?
// [ ] Would adding a variant require risky edits to stable code?
//
// LSP
// [ ] Are polymorphic implementations behaviorally compatible?
// [ ] Are contracts preserved?
//
// ISP
// [ ] Are dependencies focused on capabilities actually needed?
// [ ] Are there giant interfaces/config objects?
//
// DIP
// [ ] Does business logic depend on stable contracts?
// [ ] Are infrastructure details injected at boundaries?

// ============================================================
// 88. FINAL MENTAL MODEL
// ============================================================
// SOLID is not:
//   "Make everything abstract."
//
// SOLID is:
//   "Design boundaries so change stays localized and dependencies stay clear."
//
// Think:
//
// SRP -> What should change together?
// OCP -> What varies frequently?
// LSP -> Can this implementation safely replace that one?
// ISP -> What capability does this client actually need?
// DIP -> Who should own the dependency direction?
//
// Then choose the simplest implementation that solves the real problem.

console.log("=== SOLID chapter loaded ===");
