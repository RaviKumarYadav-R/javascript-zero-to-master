/*
 * JavaScript Zero to Master
 * Chapter 23 — Design Patterns
 * Companion JavaScript File
 *
 * A design pattern is a reusable solution structure for a recurring design
 * problem. A pattern is not a copy-paste library and is not mandatory.
 * Understand the problem first, then choose the smallest useful pattern.
 */

console.log("=== 23. Design Patterns ===");

// ============================================================
// 1. WHAT IS A DESIGN PATTERN?
// ============================================================
// Definition:
// A design pattern is a named, reusable design approach for a recurring
// software-design problem.
//
// Pattern != framework
// Pattern != algorithm
// Pattern != finished code
// Pattern = proven design idea + trade-offs + context.

// A good pattern should reduce accidental complexity, not add ceremony.

// ============================================================
// 2. CATEGORIES OF PATTERNS
// ============================================================
// Common categories:
//
// Creational:
//   Factory, Builder, Singleton, Prototype
//
// Structural:
//   Adapter, Decorator, Facade, Proxy, Composite
//
// Behavioral:
//   Strategy, Observer, Command, State, Iterator, Chain of Responsibility,
//   Template Method, Mediator
//
// JavaScript also naturally supports patterns such as module, closure,
// higher-order function, middleware, and event emitter.

// ============================================================
// 3. BEFORE USING A PATTERN
// ============================================================
// Ask:
// 1. What problem am I solving?
// 2. What changes frequently?
// 3. What dependency do I want to isolate?
// 4. Can a simple function solve it?
// 5. Does the pattern improve readability?
// 6. What complexity does the pattern introduce?

// ============================================================
// 4. FACTORY PATTERN
// ============================================================
// Factory centralizes object creation when callers should not depend on the
// exact construction details.

function createUser(role, name) {
  if (role === "admin") {
    return {
      role,
      name,
      permissions: ["read", "write", "delete"],
    };
  }

  return {
    role: "user",
    name,
    permissions: ["read"],
  };
}

const admin = createUser("admin", "Ravi");
const regularUser = createUser("user", "Amit");

console.log("Factory:", admin, regularUser);

// Why useful?
// The caller asks for an object instead of knowing every construction rule.

// ============================================================
// 5. FACTORY WITH STRATEGIES
// ============================================================
// A factory can select an implementation based on configuration.

const notificationFactories = {
  email: (message) => ({ type: "email", message }),
  sms: (message) => ({ type: "sms", message }),
  push: (message) => ({ type: "push", message }),
};

function createNotification(type, message) {
  const factory = notificationFactories[type];

  if (!factory) {
    throw new Error(`Unsupported notification type: ${type}`);
  }

  return factory(message);
}

console.log(createNotification("email", "Welcome!"));

// ============================================================
// 6. BUILDER PATTERN
// ============================================================
// Builder constructs a complex object step by step.

class RequestBuilder {
  constructor() {
    this.request = {
      method: "GET",
      headers: {},
    };
  }

  method(method) {
    this.request.method = method;
    return this;
  }

  url(url) {
    this.request.url = url;
    return this;
  }

  header(name, value) {
    this.request.headers[name] = value;
    return this;
  }

  body(body) {
    this.request.body = body;
    return this;
  }

  build() {
    if (!this.request.url) {
      throw new Error("URL is required");
    }

    return { ...this.request, headers: { ...this.request.headers } };
  }
}

const request = new RequestBuilder()
  .method("POST")
  .url("/api/notes")
  .header("Content-Type", "application/json")
  .body({ title: "Learn patterns" })
  .build();

console.log("Builder:", request);

// ============================================================
// 7. SINGLETON PATTERN
// ============================================================
// Singleton ensures one shared instance within a given module/runtime context.
// JavaScript modules already provide module-level singleton behavior naturally
// when a module exports one shared instance.

class AppConfig {
  static instance;

  constructor() {
    if (AppConfig.instance) return AppConfig.instance;

    this.environment = "development";
    AppConfig.instance = this;
  }
}

const configA = new AppConfig();
const configB = new AppConfig();

console.log("Singleton same instance:", configA === configB);

// Caution:
// Global mutable singletons can create hidden dependencies and make tests
// harder. Prefer dependency injection when shared state is not truly global.

// ============================================================
// 8. MODULE SINGLETON — PREFERRED JAVASCRIPT IDEA
// ============================================================
// In an ES module:
//
// const cache = new Map();
// export default cache;
//
// Importing that module normally shares the same module instance within the
// module graph. This is often simpler than implementing a Singleton class.

// ============================================================
// 9. PROTOTYPE PATTERN
// ============================================================
// Prototype creates objects by reusing another object's behavior/state shape.

const userPrototype = {
  greet() {
    return `Hello, ${this.name}`;
  },
};

const user1 = Object.create(userPrototype);
user1.name = "Ravi";

console.log("Prototype:", user1.greet());
console.log("Own greet property:", Object.hasOwn(user1, "greet"));

// ============================================================
// 10. ADAPTER PATTERN
// ============================================================
// Adapter converts one interface into another expected by the client.

function oldPaymentService(amountInPaise) {
  return { success: true, paise: amountInPaise };
}

function paymentAdapter(amountInRupees) {
  const result = oldPaymentService(Math.round(amountInRupees * 100));

  return {
    success: result.success,
    amount: result.paise / 100,
    currency: "INR",
  };
}

console.log("Adapter:", paymentAdapter(499.5));

// The rest of the application can use the new interface without knowing the
// legacy service's format.

// ============================================================
// 11. TWO-WAY ADAPTER MENTAL MODEL
// ============================================================
// Client -> Adapter -> Existing/External API
//
// The adapter should translate at the boundary rather than spreading external
// API quirks throughout the application.

// ============================================================
// 12. FACADE PATTERN
// ============================================================
// Facade provides a simpler interface over several subsystems.

const inventory = {
  reserve(productId) {
    console.log(`Inventory reserved: ${productId}`);
  },
};

const payment = {
  charge(amount) {
    console.log(`Payment charged: ${amount}`);
  },
};

const email = {
  send(message) {
    console.log(`Email sent: ${message}`);
  },
};

function placeOrder(productId, amount) {
  inventory.reserve(productId);
  payment.charge(amount);
  email.send(`Order confirmed for ${productId}`);
  return { success: true };
}

console.log("Facade:", placeOrder("keyboard", 1500));

// ============================================================
// 13. DECORATOR PATTERN
// ============================================================
// Decorator adds behavior without changing the original function/object.

function withLogging(fn) {
  return (...args) => {
    console.log("Calling:", fn.name || "anonymous");
    const result = fn(...args);
    console.log("Result:", result);
    return result;
  };
}

function multiply(a, b) {
  return a * b;
}

const loggedMultiply = withLogging(multiply);
console.log("Decorator:", loggedMultiply(4, 5));

// ============================================================
// 14. DECORATOR FOR AUTHORIZATION
// ============================================================

function requireRole(role, action) {
  return (user) => {
    if (!user.roles.includes(role)) {
      throw new Error("Forbidden");
    }
    return action(user);
  };
}

const deleteAccount = requireRole("admin", (user) => {
  return `${user.name} deleted the account`;
});

console.log(
  "Authorization decorator:",
  deleteAccount({ name: "Ravi", roles: ["admin"] }),
);

// Important:
// Client-side role checks are UX controls, not security. Authorization must be
// enforced by the trusted backend/resource owner.

// ============================================================
// 15. PROXY PATTERN
// ============================================================
// Proxy controls access to another object/function.

const account = {
  balance: 5000,
};

const protectedAccount = new Proxy(account, {
  get(target, property, receiver) {
    if (property === "balance") {
      return target[property];
    }
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    if (property === "balance" && value < 0) {
      throw new RangeError("Balance cannot be negative");
    }
    return Reflect.set(target, property, value, receiver);
  },
});

protectedAccount.balance = 6000;
console.log("Proxy:", protectedAccount.balance);

// Proxy can implement validation, logging, lazy access, access control, etc.
// It should not become invisible magic that makes debugging difficult.

// ============================================================
// 16. COMPOSITE PATTERN
// ============================================================
// Composite treats individual objects and groups of objects through a common
// interface.

class FileNode {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }

  getSize() {
    return this.size;
  }
}

class FolderNode {
  constructor(name) {
    this.name = name;
    this.children = [];
  }

  add(child) {
    this.children.push(child);
    return this;
  }

  getSize() {
    return this.children.reduce((total, child) => total + child.getSize(), 0);
  }
}

const src = new FolderNode("src")
  .add(new FileNode("app.js", 10))
  .add(new FileNode("utils.js", 5));

const project = new FolderNode("project").add(src).add(new FileNode("README", 2));

console.log("Composite size:", project.getSize());

// ============================================================
// 17. STRATEGY PATTERN
// ============================================================
// Strategy encapsulates interchangeable algorithms/behaviors behind a common
// calling contract.

const shippingStrategies = {
  standard: (weight) => weight * 50,
  express: (weight) => weight * 100,
  overnight: (weight) => weight * 200,
};

function calculateShipping(weight, strategy) {
  const calculate = shippingStrategies[strategy];

  if (!calculate) {
    throw new Error("Unknown shipping strategy");
  }

  return calculate(weight);
}

console.log("Strategy:", calculateShipping(3, "express"));

// Strategy is especially useful when conditional logic would otherwise become
// a large if/else or switch statement.

// ============================================================
// 18. STRATEGY WITH FUNCTIONS
// ============================================================
// In JavaScript, functions are first-class values, so a Strategy often needs no
// class hierarchy.

function checkout(total, discountStrategy) {
  return total - discountStrategy(total);
}

const studentDiscount = (total) => total * 0.1;
const festivalDiscount = (total) => total * 0.2;

console.log(checkout(1000, studentDiscount));
console.log(checkout(1000, festivalDiscount));

// ============================================================
// 19. OBSERVER PATTERN
// ============================================================
// Observer lets subscribers react when a subject publishes an event.

class EventEmitterLite {
  constructor() {
    this.listeners = new Map();
  }

  on(event, listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event).add(listener);
    return () => this.off(event, listener);
  }

  off(event, listener) {
    this.listeners.get(event)?.delete(listener);
  }

  emit(event, payload) {
    for (const listener of this.listeners.get(event) ?? []) {
      listener(payload);
    }
  }
}

const bus = new EventEmitterLite();
const unsubscribe = bus.on("noteCreated", (note) => {
  console.log("Observer received:", note.title);
});

bus.emit("noteCreated", { title: "Learn patterns" });
unsubscribe();
bus.emit("noteCreated", { title: "This one has no listener" });

// Always consider unsubscribe/lifecycle cleanup in observer systems.

// ============================================================
// 20. OBSERVER: ONE SUBJECT, MANY OBSERVERS
// ============================================================

const state = {
  observers: new Set(),
  value: 0,

  subscribe(observer) {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  },

  setValue(value) {
    this.value = value;
    for (const observer of this.observers) {
      observer(this.value);
    }
  },
};

const stopLogging = state.subscribe((value) => console.log("State:", value));
state.setValue(10);
stopLogging();
state.setValue(20);

// ============================================================
// 21. COMMAND PATTERN
// ============================================================
// Command turns an operation into an object/function that can be queued,
// logged, retried, undone, or delayed.

function createCommand(execute, undo) {
  return { execute, undo };
}

let documentText = "";

const appendCommand = createCommand(
  () => {
    documentText += "Hello ";
  },
  () => {
    documentText = documentText.slice(0, -6);
  },
);

appendCommand.execute();
console.log("Command after execute:", documentText);
appendCommand.undo();
console.log("Command after undo:", documentText);

// ============================================================
// 22. COMMAND QUEUE
// ============================================================

const commandQueue = [];

commandQueue.push(
  createCommand(
    () => console.log("Save note"),
    () => console.log("Undo save note"),
  ),
);

for (const command of commandQueue) {
  command.execute();
}

// ============================================================
// 23. STATE PATTERN
// ============================================================
// State changes an object's behavior based on its current state.

class Order {
  constructor() {
    this.status = "pending";
  }

  pay() {
    if (this.status !== "pending") {
      throw new Error(`Cannot pay from ${this.status}`);
    }

    this.status = "paid";
  }

  ship() {
    if (this.status !== "paid") {
      throw new Error(`Cannot ship from ${this.status}`);
    }

    this.status = "shipped";
  }
}

const order = new Order();
order.pay();
order.ship();
console.log("State pattern:", order.status);

// For larger state machines, model states/transitions explicitly rather than
// creating dozens of scattered boolean flags.

// ============================================================
// 24. STATE MACHINE WITH TRANSITION TABLE
// ============================================================

const transitions = {
  pending: { pay: "paid" },
  paid: { ship: "shipped", refund: "refunded" },
  shipped: {},
  refunded: {},
};

function transition(current, action) {
  const next = transitions[current]?.[action];

  if (!next) {
    throw new Error(`Invalid transition: ${current} -> ${action}`);
  }

  return next;
}

console.log("Transition:", transition("pending", "pay"));

// ============================================================
// 25. CHAIN OF RESPONSIBILITY
// ============================================================
// A request passes through a sequence of handlers. Each handler may handle it
// or forward it.

function createHandler(check, name) {
  return {
    handle(request, next) {
      if (check(request)) {
        return `${name} handled ${request.type}`;
      }
      return next(request);
    },
  };
}

const handlers = [
  createHandler((request) => request.type === "auth", "AuthHandler"),
  createHandler((request) => request.type === "cache", "CacheHandler"),
  createHandler((request) => request.type === "db", "DatabaseHandler"),
];

function runChain(request, index = 0) {
  const handler = handlers[index];

  if (!handler) {
    return "No handler handled request";
  }

  return handler.handle(request, (nextRequest) =>
    runChain(nextRequest, index + 1),
  );
}

console.log("Chain:", runChain({ type: "cache" }));

// ============================================================
// 26. MIDDLEWARE AS CHAIN OF RESPONSIBILITY
// ============================================================
// Express-style middleware is a practical form of chained processing.
//
// request
//   -> auth middleware
//   -> validation middleware
//   -> controller
//
// Each layer can continue, respond, or pass an error onward.

function composeMiddleware(middlewares) {
  return function run(context) {
    let index = -1;

    function dispatch(position) {
      if (position <= index) {
        return Promise.reject(new Error("next() called multiple times"));
      }

      index = position;
      const middleware = middlewares[position];

      if (!middleware) return Promise.resolve();

      return Promise.resolve(middleware(context, () => dispatch(position + 1)));
    }

    return dispatch(0);
  };
}

const middleware = composeMiddleware([
  async (ctx, next) => {
    ctx.steps.push("auth");
    await next();
  },
  async (ctx, next) => {
    ctx.steps.push("validation");
    await next();
  },
  async (ctx) => {
    ctx.steps.push("controller");
  },
]);

const middlewareContext = { steps: [] };
await middleware(middlewareContext);
console.log("Middleware chain:", middlewareContext.steps);

// ============================================================
// 27. TEMPLATE METHOD PATTERN
// ============================================================
// Template Method defines the overall algorithm while allowing selected steps
// to vary.

class DataImporter {
  import() {
    const raw = this.read();
    const parsed = this.parse(raw);
    return this.save(parsed);
  }

  read() {
    throw new Error("read() must be implemented");
  }

  parse(raw) {
    return raw;
  }

  save(data) {
    return { saved: true, data };
  }
}

class CsvImporter extends DataImporter {
  read() {
    return "Ravi,21";
  }

  parse(raw) {
    const [name, age] = raw.split(",");
    return { name, age: Number(age) };
  }
}

console.log("Template Method:", new CsvImporter().import());

// ============================================================
// 28. ITERATOR PATTERN
// ============================================================
// JavaScript's iteration protocol makes Iterator a native language feature.
// An iterator exposes next() returning { value, done }.

function createRangeIterator(start, end) {
  let current = start;

  return {
    next() {
      if (current > end) {
        return { value: undefined, done: true };
      }

      return { value: current++, done: false };
    },
  };
}

const iterator = createRangeIterator(1, 3);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

// ============================================================
// 29. CUSTOM ITERABLE
// ============================================================

const range = {
  start: 1,
  end: 3,

  *[Symbol.iterator]() {
    for (let value = this.start; value <= this.end; value += 1) {
      yield value;
    }
  },
};

console.log("Custom iterable:", [...range]);

// ============================================================
// 30. MEDIATOR PATTERN
// ============================================================
// Mediator centralizes communication between components so they do not all
// directly depend on one another.

class ChatMediator {
  constructor() {
    this.users = new Set();
  }

  register(user) {
    this.users.add(user);
    user.mediator = this;
  }

  send(sender, message) {
    for (const user of this.users) {
      if (user !== sender) {
        user.receive(sender.name, message);
      }
    }
  }
}

class ChatUser {
  constructor(name) {
    this.name = name;
    this.mediator = null;
  }

  send(message) {
    this.mediator?.send(this, message);
  }

  receive(sender, message) {
    console.log(`${this.name} received from ${sender}: ${message}`);
  }
}

const chat = new ChatMediator();
const ravi = new ChatUser("Ravi");
const amit = new ChatUser("Amit");
chat.register(ravi);
chat.register(amit);
ravi.send("Hello Amit");

// ============================================================
// 31. MEMENTO PATTERN
// ============================================================
// Memento captures state so it can later be restored, useful for undo/history.

class Editor {
  constructor() {
    this.text = "";
  }

  snapshot() {
    return { text: this.text };
  }

  restore(snapshot) {
    this.text = snapshot.text;
  }
}

const editor = new Editor();
editor.text = "Version 1";
const snapshot = editor.snapshot();
editor.text = "Version 2";
editor.restore(snapshot);

console.log("Memento:", editor.text);

// ============================================================
// 32. NULL OBJECT PATTERN
// ============================================================
// Null Object supplies a safe no-op object instead of repeated null checks.

const realLogger = {
  log(message) {
    console.log("LOG:", message);
  },
};

const nullLogger = {
  log() {},
};

function runJob(logger = nullLogger) {
  logger.log("Job started");
  return "done";
}

runJob(realLogger);
runJob();

// ============================================================
// 33. REPOSITORY PATTERN
// ============================================================
// Repository hides persistence details behind a domain-oriented interface.
// It is especially useful when business logic should not know whether data is
// stored in MongoDB, PostgreSQL, memory, a remote service, etc.

class InMemoryNoteRepository {
  constructor() {
    this.notes = new Map();
  }

  save(note) {
    this.notes.set(note.id, { ...note });
    return this.notes.get(note.id);
  }

  findById(id) {
    return this.notes.get(id) ?? null;
  }
}

const noteRepository = new InMemoryNoteRepository();
noteRepository.save({ id: "1", title: "Patterns" });
console.log("Repository:", noteRepository.findById("1"));

// ============================================================
// 34. SERVICE LAYER PATTERN
// ============================================================
// Service layer holds application/business operations that coordinate multiple
// dependencies.

function createNoteService(repository) {
  return {
    create(input) {
      if (!input.title?.trim()) {
        throw new Error("Title is required");
      }

      return repository.save({
        id: String(Date.now()),
        title: input.title.trim(),
      });
    },
  };
}

const noteService = createNoteService(noteRepository);
console.log("Service:", noteService.create({ title: "Design Patterns" }));

// This demonstrates Dependency Injection: the service receives its repository
// instead of constructing a database dependency internally.

// ============================================================
// 35. DEPENDENCY INJECTION
// ============================================================
// Dependency Injection means an object/function receives dependencies from the
// outside rather than creating them itself.

function createUserController(userRepository) {
  return {
    getUser(id) {
      return userRepository.findById(id);
    },
  };
}

const fakeUserRepository = {
  findById(id) {
    return { id, name: "Test User" };
  },
};

const userController = createUserController(fakeUserRepository);
console.log("Dependency injection:", userController.getUser("1"));

// Benefits:
// - easier testing
// - lower coupling
// - replaceable infrastructure
// - clearer dependencies

// ============================================================
// 36. DEPENDENCY INVERSION
// ============================================================
// High-level business logic should depend on stable abstractions/contracts,
// rather than concrete infrastructure details.
//
// Domain/service -> repository contract <- MongoRepository/PostgresRepository
//
// Dependency Injection is one technique for achieving this.

// ============================================================
// 37. MODULE PATTERN
// ============================================================
// ES modules provide module-level encapsulation naturally. A closure can also
// create private state.

const createCounterModule = (() => {
  let count = 0;

  return {
    increment() {
      count += 1;
      return count;
    },
    get() {
      return count;
    },
  };
})();

console.log("Module:", createCounterModule.increment());
console.log("Module private state:", createCounterModule.get());

// ============================================================
// 38. REVEALING MODULE PATTERN
// ============================================================
// Private functions are defined internally and selected public functions are
// returned/exported.

const userModule = (() => {
  const users = [];

  function addUser(name) {
    users.push({ name });
  }

  function getUsers() {
    return users.map((user) => ({ ...user }));
  }

  return { addUser, getUsers };
})();

userModule.addUser("Ravi");
console.log("Revealing module:", userModule.getUsers());

// ============================================================
// 39. COMMAND + UNDO MANAGER
// ============================================================

class CommandManager {
  constructor() {
    this.history = [];
  }

  execute(command) {
    command.execute();
    this.history.push(command);
  }

  undo() {
    const command = this.history.pop();
    command?.undo();
  }
}

let score = 0;
const manager = new CommandManager();

manager.execute(
  createCommand(
    () => {
      score += 10;
    },
    () => {
      score -= 10;
    },
  ),
);

console.log("Score:", score);
manager.undo();
console.log("After undo:", score);

// ============================================================
// 40. FACTORY + DI + STRATEGY
// ============================================================
// Patterns can cooperate, but combining patterns just because they can be
// combined is overengineering.

function createPricingService(strategy) {
  return {
    price(product) {
      return strategy(product);
    },
  };
}

const memberPricing = createPricingService((product) => product.price * 0.9);
console.log("Combined patterns:", memberPricing.price({ price: 1000 }));

// ============================================================
// 41. ANTI-PATTERN: GOD OBJECT
// ============================================================
// A God Object knows too much and does too much.
// Symptoms:
// - hundreds of methods
// - many unrelated responsibilities
// - difficult testing
// - changes in one area break another
//
// Prefer focused modules/services with explicit dependencies.

// ============================================================
// 42. ANTI-PATTERN: SINGLETON ABUSE
// ============================================================
// A singleton can become a global mutable variable in disguise.
//
// Problems:
// - hidden dependencies
// - order-dependent tests
// - difficult parallel execution
// - global state coupling
//
// Use module-level shared state deliberately, not automatically.

// ============================================================
// 43. ANTI-PATTERN: OVER-ABSTRACTION
// ============================================================
// Creating FactoryFactoryBuilderManager for one simple function is usually a
// sign that the abstraction cost is higher than its benefit.
//
// Start simple. Introduce a pattern when repeated change or complexity justifies
// it.

// ============================================================
// 44. ANTI-PATTERN: DEEP INHERITANCE
// ============================================================
// Deep inheritance creates strong coupling between parent and child classes.
// Composition often provides more flexible behavior reuse.

// ============================================================
// 45. COMPOSITION OVER INHERITANCE
// ============================================================
// Compose small behaviors instead of building large class hierarchies.

function canWalk(entity) {
  return {
    walk() {
      return `${entity.name} walks`;
    },
  };
}

function canEat(entity) {
  return {
    eat() {
      return `${entity.name} eats`;
    },
  };
}

function createAnimal(name) {
  const entity = { name };
  return {
    ...entity,
    ...canWalk(entity),
    ...canEat(entity),
  };
}

const dog = createAnimal("Dog");
console.log("Composition:", dog.walk(), dog.eat());

// ============================================================
// 46. PURE FUNCTION AS A DESIGN TOOL
// ============================================================
// A pure function is often the simplest reusable design unit.
// Before reaching for a class/pattern, ask whether a pure function is enough.

function calculateTax(price, rate) {
  return price * rate;
}

console.log("Simple function:", calculateTax(1000, 0.18));

// ============================================================
// 47. FUNCTIONAL STRATEGY
// ============================================================
// JavaScript's first-class functions make many classic OO patterns lightweight.

function runOperation(value, operation) {
  return operation(value);
}

console.log(runOperation(10, (value) => value * 2));

// ============================================================
// 48. DECORATOR CHAIN
// ============================================================

function withTiming(fn) {
  return (...args) => {
    const start = performance.now();
    const result = fn(...args);
    console.log(`Execution took ${(performance.now() - start).toFixed(2)}ms`);
    return result;
  };
}

function withValidation(fn) {
  return (value) => {
    if (typeof value !== "number") {
      throw new TypeError("Expected a number");
    }
    return fn(value);
  };
}

const decoratedDouble = withTiming(withValidation((value) => value * 2));
console.log("Decorator chain:", decoratedDouble(5));

// `performance` is available in modern Node/browser environments. For portable
// library code, inject a clock or use the runtime-specific performance API.

// ============================================================
// 49. LAZY PROXY / VIRTUAL ACCESS — CONCEPT
// ============================================================
// A Proxy can defer or intercept expensive operations. This is useful for lazy
// objects, but hidden work on property access can make code surprising.

// ============================================================
// 50. CACHE-ASIDE PATTERN
// ============================================================
// Cache-aside:
// 1. Check cache.
// 2. If present, return cached value.
// 3. Otherwise load from source.
// 4. Store result.
// 5. Return result.

function createCachedLoader(loader) {
  const cache = new Map();

  return async function load(key) {
    if (cache.has(key)) {
      return cache.get(key);
    }

    const value = await loader(key);
    cache.set(key, value);
    return value;
  };
}

const loadUser = createCachedLoader(async (id) => ({
  id,
  name: "Ravi",
}));

console.log("Cache-aside:", await loadUser("1"));
console.log("Cache hit:", await loadUser("1"));

// Real caches need invalidation/expiration policies and bounded memory.

// ============================================================
// 51. RETRY DECORATOR
// ============================================================
// A retry wrapper is useful for transient operations, but retry policy must be
// aware of idempotency, cancellation, server rate limits, and backoff.

function withRetry(fn, attempts = 3) {
  return async (...args) => {
    let lastError;

    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        return await fn(...args);
      } catch (error) {
        lastError = error;
        if (attempt === attempts) break;
      }
    }

    throw lastError;
  };
}

let unstableCalls = 0;
const reliableOperation = withRetry(async () => {
  unstableCalls += 1;

  if (unstableCalls < 2) {
    throw new Error("Temporary failure");
  }

  return "success";
});

console.log("Retry:", await reliableOperation());

// ============================================================
// 52. OBSERVER VS PUB/SUB
// ============================================================
// Observer:
//   subject commonly knows its observers/subscribers.
//
// Pub/Sub:
//   publisher and subscriber communicate through a broker/topic abstraction.
//
// Pub/Sub is useful for distributed systems because participants do not need a
// direct object reference to each other.

// ============================================================
// 53. EVENT-DRIVEN ARCHITECTURE
// ============================================================
// Example:
// NoteCreated event
//    -> notification handler
//    -> analytics handler
//    -> search-index handler
//
// Benefits:
// - decoupling
// - independent consumers
// - asynchronous processing
//
// Costs:
// - eventual consistency
// - retries/duplicates
// - ordering concerns
// - harder debugging

// ============================================================
// 54. IDEMPOTENT COMMANDS
// ============================================================
// An operation is idempotent when repeating it has the same intended effect as
// performing it once.
//
// Important for retries in networked systems. Not every command is idempotent.

function setUserName(user, name) {
  user.name = name;
  return user;
}

const retryableUser = { name: "Old" };
setUserName(retryableUser, "Ravi");
setUserName(retryableUser, "Ravi");
console.log("Idempotent-style command:", retryableUser);

// ============================================================
// 55. ADAPTER VS FACADE
// ============================================================
// Adapter:
//   changes one interface into another compatible interface.
//
// Facade:
//   simplifies access to a subsystem.
//
// Adapter answers: "How can I make this API fit?"
// Facade answers: "How can I make this complicated subsystem easier to use?"

// ============================================================
// 56. DECORATOR VS PROXY
// ============================================================
// Decorator:
//   adds behavior around an object/function.
//
// Proxy:
//   controls/intercepts operations on a target.
//
// They can overlap conceptually, but the mechanisms and intent differ.

// ============================================================
// 57. STRATEGY VS STATE
// ============================================================
// Strategy:
//   choose among interchangeable algorithms/behaviors.
//
// State:
//   behavior changes because an object's current state changes.

// ============================================================
// 58. FACTORY VS BUILDER
// ============================================================
// Factory:
//   decides which object/implementation to create.
//
// Builder:
//   constructs one complex object through controlled steps.

// ============================================================
// 59. COMMAND VS FUNCTION CALLBACK
// ============================================================
// A function can already be a command in JavaScript. A Command object becomes
// valuable when the operation needs metadata such as undo(), serialization,
// queueing, permissions, logging, or identity.

// ============================================================
// 60. PATTERN SELECTION TABLE
// ============================================================
// Problem -> likely pattern:
//
// Complex object creation       -> Builder
// Multiple creation variants    -> Factory
// Shared global instance        -> Singleton/module singleton
// Convert incompatible API      -> Adapter
// Simplify subsystem            -> Facade
// Add behavior dynamically      -> Decorator
// Intercept/control access      -> Proxy
// Interchangeable algorithm     -> Strategy
// React to published changes    -> Observer
// Encapsulate an operation      -> Command
// Behavior changes by state     -> State
// Sequential handlers           -> Chain of Responsibility
// Central communication         -> Mediator
// Save/restore state            -> Memento
// Tree-like part-whole structure-> Composite
// Iterate collection            -> Iterator
// Hide persistence              -> Repository
// Coordinate application logic  -> Service layer

// ============================================================
// 61. DESIGN PATTERNS + CLEAN CODE
// ============================================================
// Patterns work best with:
// - small functions
// - meaningful names
// - explicit dependencies
// - single responsibility
// - low coupling
// - high cohesion
// - predictable side effects
//
// A pattern cannot rescue fundamentally unclear code.

// ============================================================
// 62. DESIGN PATTERNS + SOLID
// ============================================================
// Common relationships:
// SRP -> focused classes/modules
// OCP -> Strategy/Decorator/Factory can help extension without modifying core
// LSP -> careful inheritance/contracts
// ISP -> small interfaces
// DIP -> Dependency Injection/Repository abstractions
//
// Patterns are implementation techniques; SOLID principles are design guidance.

// ============================================================
// 63. DESIGN PATTERNS + TESTING
// ============================================================
// Dependency Injection makes testing easier because dependencies can be
// replaced with fakes/mocks.

function createEmailService(mailer) {
  return {
    sendWelcome(user) {
      return mailer.send(user.email, "Welcome");
    },
  };
}

const fakeMailer = {
  sent: [],
  send(to, subject) {
    this.sent.push({ to, subject });
    return true;
  },
};

const emailService = createEmailService(fakeMailer);
emailService.sendWelcome({ email: "ravi@example.com" });
console.log("Testable DI:", fakeMailer.sent);

// ============================================================
// 64. DESIGN PATTERNS + ARCHITECTURE
// ============================================================
// A pattern is local design knowledge. Architecture describes larger system
// boundaries and relationships.
//
// Example full-stack Notes app:
//
// HTTP controller
//    -> application service
//    -> repository interface
//    -> MongoDB repository
//
// Observer/event bus can publish NoteCreated without tightly coupling every
// consumer to the controller.

// ============================================================
// 65. FULL-STACK NOTES EXAMPLE
// ============================================================

function createNoteApplication({ repository, idGenerator }) {
  return {
    create(input) {
      if (!input.title?.trim()) {
        throw new Error("Title is required");
      }

      const note = {
        id: idGenerator(),
        title: input.title.trim(),
        content: input.content ?? "",
      };

      return repository.save(note);
    },
  };
}

const fakeNoteRepo = {
  notes: [],
  save(note) {
    this.notes.push(note);
    return note;
  },
};

const app = createNoteApplication({
  repository: fakeNoteRepo,
  idGenerator: () => "note-1",
});

console.log(
  "Notes application:",
  app.create({ title: "Patterns", content: "Learn by building." }),
);

// This one example demonstrates Factory/DI/Repository/Service-style ideas
// without forcing every class into a pattern.

// ============================================================
// 66. REAL-WORLD FRONTEND EXAMPLE: STRATEGY
// ============================================================
// A UI may select a rendering strategy based on device/data state.

const renderStrategies = {
  empty: () => "No notes yet",
  compact: (notes) => notes.map((note) => note.title).join(" | "),
  detailed: (notes) => notes.map((note) => `${note.title}: ${note.content}`).join("\n"),
};

function renderNotes(notes, mode) {
  if (notes.length === 0) return renderStrategies.empty();

  const renderer = renderStrategies[mode];
  if (!renderer) throw new Error("Unknown render mode");

  return renderer(notes);
}

console.log(renderNotes([{ title: "JS", content: "Patterns" }], "detailed"));

// ============================================================
// 67. REAL-WORLD BACKEND EXAMPLE: CHAIN
// ============================================================
// Typical request pipeline:
//
// request
// -> authentication
// -> authorization
// -> validation
// -> rate limiting
// -> controller
// -> service
// -> repository
//
// Each layer should have a clear responsibility and failure behavior.

// ============================================================
// 68. REAL-WORLD CACHING EXAMPLE
// ============================================================
// Cache-aside can be combined with Repository:
//
// service -> cached repository -> database repository
//
// Be explicit about cache invalidation, TTL, stale data, and failure behavior.

// ============================================================
// 69. REAL-WORLD LOGGING DECORATOR
// ============================================================

function withAudit(actionName, action) {
  return (...args) => {
    console.log(`[AUDIT] ${actionName}`, { args });
    const result = action(...args);
    console.log(`[AUDIT] ${actionName} completed`);
    return result;
  };
}

const auditedDelete = withAudit("deleteNote", (id) => ({ deleted: id }));
console.log(auditedDelete("note-1"));

// Avoid logging secrets, passwords, tokens, or sensitive personal data.

// ============================================================
// 70. PATTERN COST MODEL
// ============================================================
// Every abstraction has a cost:
//
// Pattern benefit
//   - lower coupling
//   - reusable variation
//   - easier testing
//   - clearer boundaries
//
// Pattern cost
//   - more files/types/classes
//   - more indirection
//   - learning overhead
//   - debugging complexity
//
// Choose a pattern when benefit > cost.

// ============================================================
// 71. COMMON MISTAKES
// ============================================================
// 1. Memorizing names instead of problems.
// 2. Using patterns everywhere.
// 3. Treating design-pattern diagrams as mandatory architecture.
// 4. Creating abstract classes for simple functions.
// 5. Using Singleton for every shared dependency.
// 6. Deep inheritance instead of composition.
// 7. Hiding important behavior behind magic proxies.
// 8. Forgetting observer cleanup.
// 9. Retrying non-idempotent operations blindly.
// 10. Building a generic framework before understanding requirements.
// 11. Confusing Adapter with Facade.
// 12. Confusing Strategy with State.
// 13. Calling dependency injection a testing-only technique.
// 14. Exposing infrastructure details throughout business logic.
// 15. Using a pattern when a simple function is clearer.

// ============================================================
// 72. DEBUGGING CHECKLIST
// ============================================================
// When a pattern-based design is difficult to debug:
// 1. Trace the call chain.
// 2. Identify the concrete implementation being used.
// 3. Inspect dependency wiring.
// 4. Check event subscriptions/unsubscriptions.
// 5. Check state transitions.
// 6. Check cache invalidation.
// 7. Check retry behavior.
// 8. Remove abstractions temporarily to isolate the bug.
// 9. Write a focused test around the failing behavior.
// 10. Ask whether the pattern is creating unnecessary indirection.

// ============================================================
// 73. OUTPUT PREDICTION
// ============================================================

const strategy = (value) => value * 2;
const decorated = (value) => strategy(value) + 1;

console.log("Prediction:", decorated(4)); // 9

// ============================================================
// 74. MINI CHALLENGES — BEGINNER
// ============================================================
// 1. Build a user factory for admin/user/guest.
// 2. Build a notification factory.
// 3. Create a simple Builder for a URL.
// 4. Implement an Adapter around an old API.
// 5. Build a Facade for cart + payment + notification.
// 6. Write a logging decorator.
// 7. Implement a basic Strategy with functions.
// 8. Build a tiny Observer/EventEmitter.
// 9. Implement a Command with execute/undo.
// 10. Create a state machine for an order.

// ============================================================
// 75. MINI CHALLENGES — INTERMEDIATE
// ============================================================
// 11. Build middleware composition.
// 12. Build a repository abstraction with an in-memory implementation.
// 13. Inject a fake repository into a service.
// 14. Add a cache-aside decorator.
// 15. Build an undo manager using Command.
// 16. Create a Composite file/folder tree.
// 17. Build a Chain of Responsibility for validation.
// 18. Implement a Mediator for chat users.
// 19. Build a Memento-based text editor history.
// 20. Compare Adapter and Facade in your own words.

// ============================================================
// 76. MINI CHALLENGES — ADVANCED
// ============================================================
// 21. Design a Notes backend using Repository + Service + DI.
// 22. Add Observer-based domain events.
// 23. Add idempotency handling for retried commands.
// 24. Build a typed Strategy registry in TypeScript.
// 25. Implement a bounded cache with expiration.
// 26. Build a state machine for authentication.
// 27. Implement retry with exponential backoff and cancellation.
// 28. Build a middleware pipeline with error propagation.
// 29. Create a plugin architecture using a Factory + Registry.
// 30. Refactor a large switch into Strategy and explain the trade-off.

// ============================================================
// 77. DESIGN DEBUGGING CHALLENGES
// ============================================================
// Challenge A:
// A Singleton stores mutable request-specific data.
// Question: Why can concurrent requests interfere with one another?
//
// Challenge B:
// An Observer subscription is never removed.
// Question: What can happen after a component is destroyed?
//
// Challenge C:
// A retry wrapper retries every POST automatically.
// Question: What duplicate side effects can occur?
//
// Challenge D:
// A Facade contains 800 lines of business logic.
// Question: Has the Facade become a God Object?
//
// Challenge E:
// A Strategy map contains 30 strategies and requires complicated setup for every
// call. Question: Would a simpler function/conditional be clearer?

// ============================================================
// 78. INTERVIEW QUESTIONS
// ============================================================
// Beginner:
// - What is a design pattern?
// - Why are design patterns useful?
// - What are creational, structural, and behavioral patterns?
// - What is Factory?
// - What is Singleton?
// - What is Adapter?
// - What is Observer?
// - What is Strategy?
//
// Intermediate:
// - Factory vs Builder?
// - Adapter vs Facade?
// - Decorator vs Proxy?
// - Strategy vs State?
// - Command vs callback?
// - Why prefer composition over inheritance?
// - How does Dependency Injection improve design?
// - How does middleware relate to Chain of Responsibility?
//
// Advanced:
// - When should you NOT use a design pattern?
// - How can Singleton hurt testability?
// - How would you design a plugin architecture?
// - How would you handle duplicate events?
// - How do retries interact with idempotency?
// - How would you design a repository boundary?
// - How do patterns interact with SOLID?
// - How would you detect overengineering?

// ============================================================
// 79. TEACH-BACK QUESTIONS
// ============================================================
// Explain without notes:
// 1. What problem does Factory solve?
// 2. Why is Builder different from Factory?
// 3. Why can Singleton be dangerous?
// 4. What does Adapter do?
// 5. What does Facade do?
// 6. How does Decorator add behavior?
// 7. What does Proxy intercept?
// 8. Why is Strategy natural in JavaScript?
// 9. How does Observer work?
// 10. What makes Command useful?
// 11. What is a State machine?
// 12. How is middleware related to Chain of Responsibility?
// 13. Why use Dependency Injection?
// 14. What is Repository hiding?
// 15. When is a pattern unnecessary?

// ============================================================
// 80. FINAL MENTAL MODEL
// ============================================================
// Do NOT think:
//   "Which pattern should I use?"
//
// Think:
//   "What problem keeps changing or creating coupling?"
//
// Then:
//   Problem -> constraints -> simplest design -> pattern if justified
//
// Example:
//
// Many interchangeable algorithms
//       -> Strategy
//
// External API has incompatible shape
//       -> Adapter
//
// Complex subsystem is painful to call
//       -> Facade
//
// Many consumers react to events
//       -> Observer/Pub-Sub
//
// Business logic needs replaceable infrastructure
//       -> Dependency Injection + Repository
//
// Complex object construction
//       -> Builder/Factory
//
// Final rule:
// A good design pattern makes change easier. If the pattern makes simple code
// harder to understand, the pattern is probably the wrong tool.

console.log("=== Design Patterns chapter loaded ===");
