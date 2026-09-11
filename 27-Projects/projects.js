/*
 * JavaScript Zero to Master — Chapter 27: Projects
 *
 * This file is the practical companion to README.md.
 * Goal: stop consuming tutorials and start building complete software.
 *
 * Run with:
 *   node 27-Projects/projects.js
 *
 * No top-level await is used, so the file is friendly to normal Node.js execution.
 */

console.log("=== JavaScript Projects: Practical Companion ===");

// -----------------------------------------------------------------------------
// 1. WHAT IS A PROJECT?
// -----------------------------------------------------------------------------
// Definition:
// A project is a complete problem-solving exercise where multiple concepts work
// together to create something useful for a user.
//
// Learning a method such as map() is knowledge.
// Building a search/filter application that uses map(), filter(), events,
// validation, API calls and state is project skill.
//
// Project skill = understand the problem + design the solution + implement it
// + debug it + test it + explain it + ship it.

// -----------------------------------------------------------------------------
// 2. THE PROJECT LOOP
// -----------------------------------------------------------------------------
// Use this loop for every project:
//
// Problem → Requirements → User flow → Data model → UI/API design →
// Implementation → Test → Debug → Refactor → Deploy → Document → Review
//
// Do not start by opening the code editor and randomly writing components.

// -----------------------------------------------------------------------------
// 3. PROJECT BRIEF TEMPLATE
// -----------------------------------------------------------------------------
const projectBrief = {
  name: "TaskFlow",
  problem: "Users need a simple way to track tasks.",
  targetUser: "A student or developer managing daily work.",
  coreFeatures: [
    "Create a task",
    "List tasks",
    "Mark a task complete",
    "Delete a task",
    "Filter tasks"
  ],
  laterFeatures: ["Authentication", "Database", "Sharing", "Analytics"]
};

console.log("Project brief:", projectBrief.name);

// -----------------------------------------------------------------------------
// 4. MVP: MINIMUM VIABLE PRODUCT
// -----------------------------------------------------------------------------
// Definition:
// MVP is the smallest useful version that proves the core problem can be solved.
//
// Bad approach:
// Build authentication, payments, notifications, AI and analytics before the
// basic feature works.
//
// Better approach:
// 1. Make the core feature work.
// 2. Test it.
// 3. Improve it.
// 4. Add one valuable feature at a time.

const mvp = [
  "Create",
  "Read",
  "Update",
  "Delete"
];
console.log("MVP features:", mvp.join(", "));

// -----------------------------------------------------------------------------
// 5. REQUIREMENTS: FUNCTIONAL VS NON-FUNCTIONAL
// -----------------------------------------------------------------------------
// Functional requirement = what the system does.
// Example: "A user can create a note."
//
// Non-functional requirement = quality constraint.
// Example: "The note list should load quickly."

const requirements = {
  functional: [
    "User can create a note",
    "User can edit a note",
    "User can delete a note"
  ],
  nonFunctional: [
    "Works on mobile",
    "Accessible keyboard navigation",
    "Useful error messages",
    "Fast initial load"
  ]
};
console.log("Functional requirements:", requirements.functional.length);

// -----------------------------------------------------------------------------
// 6. USER STORIES
// -----------------------------------------------------------------------------
// Format:
// As a [user], I want [action], so that [benefit].

const userStory =
  "As a user, I want to archive a note so that my active list stays clean.";
console.log(userStory);

// -----------------------------------------------------------------------------
// 7. ACCEPTANCE CRITERIA
// -----------------------------------------------------------------------------
// Acceptance criteria turn vague requirements into testable behavior.

const acceptanceCriteria = [
  "Given a visible note, when Archive is clicked, the note leaves the active list.",
  "The archived note remains stored.",
  "The user receives visible feedback when the action succeeds."
];
console.log("Acceptance criteria:", acceptanceCriteria.length);

// -----------------------------------------------------------------------------
// 8. DATA FIRST: DESIGN THE SHAPE
// -----------------------------------------------------------------------------
// Before building a UI, decide what your data looks like.

const note = {
  id: "note-101",
  title: "Learn closures",
  content: "A closure remembers variables from its lexical environment.",
  tags: ["javascript", "functions"],
  isPinned: false,
  isArchived: false,
  createdAt: "2026-09-10T10:00:00.000Z"
};

console.log("Example note:", note.title);

// -----------------------------------------------------------------------------
// 9. STATE VS DERIVED STATE
// -----------------------------------------------------------------------------
// State = data that must be stored because it can change independently.
// Derived state = value calculated from existing state.

const tasks = [
  { id: 1, title: "Study arrays", completed: true },
  { id: 2, title: "Build a project", completed: false },
  { id: 3, title: "Write tests", completed: false }
];

const completedCount = tasks.filter((task) => task.completed).length;
console.log("Completed count (derived):", completedCount);

// Avoid storing both `tasks` and `completedCount` unless there is a real reason.
// Two independent copies can become inconsistent.

// -----------------------------------------------------------------------------
// 10. CRUD: THE CORE OF MANY PROJECTS
// -----------------------------------------------------------------------------
// CRUD = Create, Read, Update, Delete.

function createTask(list, title) {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    throw new Error("Task title is required");
  }

  return [
    ...list,
    {
      id: Date.now(),
      title: trimmedTitle,
      completed: false
    }
  ];
}

function getTaskById(list, id) {
  return list.find((task) => task.id === id);
}

function updateTask(list, id, changes) {
  return list.map((task) =>
    task.id === id ? { ...task, ...changes } : task
  );
}

function deleteTask(list, id) {
  return list.filter((task) => task.id !== id);
}

let taskStore = [];
taskStore = createTask(taskStore, "Learn project architecture");
const firstTask = taskStore[0];
taskStore = updateTask(taskStore, firstTask.id, { completed: true });
console.log("CRUD read:", getTaskById(taskStore, firstTask.id));
taskStore = deleteTask(taskStore, firstTask.id);
console.log("CRUD after delete:", taskStore);

// -----------------------------------------------------------------------------
// 11. VALIDATION
// -----------------------------------------------------------------------------
// Definition:
// Validation checks whether data satisfies the rules required by the system.
//
// Client validation improves UX.
// Server validation protects the system.
// Never trust browser input.

function validateTaskInput(input) {
  const errors = {};

  if (typeof input.title !== "string" || input.title.trim().length < 3) {
    errors.title = "Title must contain at least 3 characters.";
  }

  if (input.priority && !["low", "medium", "high"].includes(input.priority)) {
    errors.priority = "Priority must be low, medium or high.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

console.log(validateTaskInput({ title: "JS", priority: "high" }));
console.log(validateTaskInput({ title: "", priority: "urgent" }));

// -----------------------------------------------------------------------------
// 12. LOCAL STORAGE PROJECT PATTERN
// -----------------------------------------------------------------------------
// Browser-only APIs such as localStorage are not available in normal Node.js.
// This adapter shows the architecture without requiring a browser.

function createMemoryStorage() {
  const data = new Map();

  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, String(value));
    },
    removeItem(key) {
      data.delete(key);
    }
  };
}

const storage = createMemoryStorage();
storage.setItem("tasks", JSON.stringify([{ id: 1, title: "Practice" }]));
const storedTasks = JSON.parse(storage.getItem("tasks"));
console.log("Persisted data:", storedTasks);

// Real browser equivalent:
// localStorage.setItem("tasks", JSON.stringify(tasks));
// const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

// -----------------------------------------------------------------------------
// 13. SEPARATE BUSINESS LOGIC FROM UI
// -----------------------------------------------------------------------------
// A strong project does not put all logic inside click handlers/components.
//
// UI layer:
// - reads user interaction
// - displays state
//
// Business/domain layer:
// - applies rules
//
// Data layer:
// - talks to storage/API/database

function calculateCartTotal(items, discountPercent = 0) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = subtotal * (discountPercent / 100);
  return Number((subtotal - discount).toFixed(2));
}

const cart = [
  { name: "Keyboard", price: 1500, quantity: 1 },
  { name: "Mouse", price: 800, quantity: 2 }
];

console.log("Cart total:", calculateCartTotal(cart, 10));

// -----------------------------------------------------------------------------
// 14. REPOSITORY-STYLE DATA ACCESS
// -----------------------------------------------------------------------------
// The repository hides storage details from the rest of the application.

function createTaskRepository(storageAdapter, key = "tasks") {
  function readAll() {
    const raw = storageAdapter.getItem(key);
    return raw ? JSON.parse(raw) : [];
  }

  function saveAll(items) {
    storageAdapter.setItem(key, JSON.stringify(items));
  }

  return {
    findAll: readAll,
    saveAll
  };
}

const repository = createTaskRepository(storage, "repository-tasks");
repository.saveAll([{ id: 1, title: "Repository practice" }]);
console.log("Repository:", repository.findAll());

// -----------------------------------------------------------------------------
// 15. API LAYER MENTAL MODEL
// -----------------------------------------------------------------------------
// Frontend → HTTP request → Backend route → Controller → Service → Repository
// → Database → response → Frontend state → UI
//
// Keep responsibilities explicit.

function mapTaskFromApi(data) {
  return {
    id: data.id,
    title: data.title,
    completed: Boolean(data.completed)
  };
}

const apiResponse = {
  id: 7,
  title: "Understand APIs",
  completed: 1
};
console.log("Mapped API model:", mapTaskFromApi(apiResponse));

// -----------------------------------------------------------------------------
// 16. HTTP STATUS MENTAL MODEL
// -----------------------------------------------------------------------------
// 2xx = success
// 3xx = redirection/cache-related behavior
// 4xx = client/request problem
// 5xx = server-side problem
//
// fetch() does not reject merely because a server returns 404 or 500.
// Check response.ok/status yourself.

async function fakeFetch(url, options = {}) {
  if (options.signal?.aborted) {
    throw new Error("Request aborted");
  }

  if (url.endsWith("/missing")) {
    return { ok: false, status: 404, async json() { return { message: "Not found" }; } };
  }

  return {
    ok: true,
    status: 200,
    async json() {
      return { message: "Success" };
    }
  };
}

async function requestJson(url, options = {}) {
  const response = await fakeFetch(url, options);

  if (!response.ok) {
    let body = {};
    try {
      body = await response.json();
    } catch {
      // Ignore malformed error bodies in this demo.
    }

    throw new Error(body.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// -----------------------------------------------------------------------------
// 17. AUTHENTICATION VS AUTHORIZATION
// -----------------------------------------------------------------------------
// Authentication = Who are you?
// Authorization = What are you allowed to do?
//
// Example:
// Logged-in user is authenticated.
// Checking whether that user can edit note #10 is authorization.

function canEditNote(user, targetNote) {
  return Boolean(user && targetNote && user.id === targetNote.ownerId);
}

console.log(
  "Authorization example:",
  canEditNote({ id: 10 }, { id: 20, ownerId: 10 })
);

// Never treat a frontend-only `canEdit` check as security.
// The backend must enforce authorization too.

// -----------------------------------------------------------------------------
// 18. FULL-STACK FOLDER STRUCTURE
// -----------------------------------------------------------------------------
// Example:
//
// notes-app/
// ├── client/
// │   ├── src/
// │   │   ├── components/
// │   │   ├── pages/
// │   │   ├── features/
// │   │   ├── hooks/
// │   │   ├── services/
// │   │   └── lib/
// │   └── package.json
// ├── server/
// │   ├── src/
// │   │   ├── routes/
// │   │   ├── controllers/
// │   │   ├── services/
// │   │   ├── repositories/
// │   │   ├── models/
// │   │   ├── middleware/
// │   │   ├── validators/
// │   │   └── lib/
// │   └── package.json
// ├── README.md
// └── .env.example
//
// The exact structure can change with project complexity.

// -----------------------------------------------------------------------------
// 19. ENVIRONMENT VARIABLES
// -----------------------------------------------------------------------------
// Never commit secrets such as database passwords or private API keys.
// Commit `.env.example` with names, not values.

const envExample = {
  PORT: "5000",
  DATABASE_URL: "<set locally>",
  ACCESS_TOKEN_SECRET: "<set locally>"
};
console.log("Environment variable names:", Object.keys(envExample));

// -----------------------------------------------------------------------------
// 20. ERROR HANDLING AT PROJECT BOUNDARIES
// -----------------------------------------------------------------------------
// Convert low-level failures into useful application-level errors.

class AppError extends Error {
  constructor(message, statusCode = 500, cause) {
    super(message, { cause });
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}

async function safeLoadUser() {
  try {
    return await requestJson("/api/user");
  } catch (error) {
    throw new AppError("Unable to load user", 502, error);
  }
}

async function demonstrateErrors() {
  try {
    await requestJson("/api/missing");
  } catch (error) {
    console.log("Handled API error:", error.message);
  }

  try {
    await safeLoadUser();
  } catch (error) {
    console.log("Mapped application error:", error.name, error.statusCode);
  }
}

// -----------------------------------------------------------------------------
// 21. LOADING / SUCCESS / EMPTY / ERROR STATES
// -----------------------------------------------------------------------------
// A production UI should not assume only the success state exists.

const uiStates = [
  "idle",
  "loading",
  "success",
  "empty",
  "error"
];
console.log("UI states:", uiStates.join(" → "));

// Example mental model:
// idle → loading → success
//                 ↘ empty
// loading → error
//
// This prevents confusing "no data" with "request failed".

// -----------------------------------------------------------------------------
// 22. SEARCH / FILTER / SORT
// -----------------------------------------------------------------------------

function searchTasks(list, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return list;

  return list.filter((task) =>
    task.title.toLowerCase().includes(normalized)
  );
}

function sortTasksByTitle(list) {
  return [...list].sort((a, b) => a.title.localeCompare(b.title));
}

const searchableTasks = [
  { id: 1, title: "Learn JavaScript" },
  { id: 2, title: "Build React app" },
  { id: 3, title: "Learn Node.js" }
];

console.log("Search:", searchTasks(searchableTasks, "learn"));
console.log("Sorted:", sortTasksByTitle(searchableTasks));

// -----------------------------------------------------------------------------
// 23. DEBOUNCE: SEARCH INPUT PATTERN
// -----------------------------------------------------------------------------
// Debounce waits until calls stop for the chosen delay.

function debounce(fn, delay) {
  let timer;

  return function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const logSearch = debounce((query) => {
  console.log("Searching for:", query);
}, 100);

logSearch("j");
logSearch("ja");
logSearch("javascript");

// In a real browser application, this can reduce unnecessary API requests.

// -----------------------------------------------------------------------------
// 24. PAGINATION
// -----------------------------------------------------------------------------
// Pagination divides a large dataset into smaller result sets.

function paginate(items, page, limit) {
  if (!Number.isInteger(page) || page < 1) {
    throw new Error("Page must be >= 1");
  }
  if (!Number.isInteger(limit) || limit < 1) {
    throw new Error("Limit must be >= 1");
  }

  const start = (page - 1) * limit;
  return {
    data: items.slice(start, start + limit),
    page,
    limit,
    total: items.length,
    totalPages: Math.ceil(items.length / limit)
  };
}

console.log("Pagination:", paginate([1, 2, 3, 4, 5], 2, 2));

// -----------------------------------------------------------------------------
// 25. OPTIMISTIC UI
// -----------------------------------------------------------------------------
// Optimistic UI updates the interface before the server confirms success.
// If the request fails, revert the state and show feedback.
//
// Good for interactions where failure is recoverable and latency matters.
// Be careful with writes, authorization and conflicting updates.

function optimisticToggle(task) {
  return { ...task, completed: !task.completed };
}

console.log("Optimistic update:", optimisticToggle({ id: 1, completed: false }));

// -----------------------------------------------------------------------------
// 26. CONCURRENCY: DO NOT OVERLOAD AN API
// -----------------------------------------------------------------------------

async function mapWithConcurrency(items, worker, limit = 2) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function runWorker() {
    while (true) {
      const index = nextIndex++;
      if (index >= items.length) return;
      results[index] = await worker(items[index], index);
    }
  }

  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    () => runWorker()
  );

  await Promise.all(workers);
  return results;
}

// -----------------------------------------------------------------------------
// 27. TESTING A PROJECT
// -----------------------------------------------------------------------------
// Test the behavior, not implementation details.

function calculateTax(price, rate) {
  if (price < 0 || rate < 0) {
    throw new Error("Price and rate must be non-negative");
  }
  return Number((price * rate).toFixed(2));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function testCalculateTax() {
  assert(calculateTax(100, 0.18) === 18, "18% of 100 should be 18");
  assert(calculateTax(0, 0.18) === 0, "tax on zero should be zero");

  let threw = false;
  try {
    calculateTax(-1, 0.18);
  } catch {
    threw = true;
  }
  assert(threw, "negative price should throw");

  return "calculateTax tests passed";
}

console.log(testCalculateTax());

// -----------------------------------------------------------------------------
// 28. UNIT / INTEGRATION / E2E
// -----------------------------------------------------------------------------
// Unit test: one small unit in isolation.
// Integration test: multiple parts working together.
// E2E test: real user journey through the application.
//
// Example E2E journey:
// Register → login → create note → search note → edit note → logout.

// -----------------------------------------------------------------------------
// 29. DEBUGGING METHOD
// -----------------------------------------------------------------------------
// When a feature fails:
// 1. Reproduce the problem.
// 2. Write the expected behavior.
// 3. Write the actual behavior.
// 4. Find the smallest failing boundary.
// 5. Inspect inputs.
// 6. Inspect state transitions.
// 7. Inspect network/database responses.
// 8. Fix the root cause.
// 9. Add a regression test.
//
// Do not randomly change code until the bug disappears.

function debugExample(items) {
  // Intentionally safe implementation for comparison.
  return items.filter((item) => item.price > 0);
}

console.log("Debug example:", debugExample([{ price: 10 }, { price: 0 }]));

// -----------------------------------------------------------------------------
// 30. SECURITY CHECKLIST
// -----------------------------------------------------------------------------
// Every full-stack project should consider:
// - Authentication
// - Authorization
// - Input validation
// - Output encoding / XSS prevention
// - CSRF strategy when using cookie-based auth
// - Secure cookie settings where applicable
// - Password hashing on the server
// - Rate limiting for sensitive endpoints
// - Secret management
// - HTTPS in production
// - Safe error messages
// - Dependency updates
// - File upload validation if uploads exist
//
// Never put a private API secret in frontend source code.

// -----------------------------------------------------------------------------
// 31. PERFORMANCE CHECKLIST
// -----------------------------------------------------------------------------
// Measure before optimizing.
//
// Frontend:
// - Avoid unnecessary renders/work.
// - Optimize large lists.
// - Lazy-load expensive features.
// - Compress and appropriately size assets.
// - Avoid layout thrashing.
// - Keep main-thread work bounded.
//
// Backend:
// - Index important database queries.
// - Avoid N+1 queries.
// - Paginate large results.
// - Cache carefully.
// - Bound concurrency.
// - Use timeouts.

// -----------------------------------------------------------------------------
// 32. ACCESSIBILITY CHECKLIST
// -----------------------------------------------------------------------------
// - Semantic HTML
// - Keyboard navigation
// - Visible focus
// - Labels for form controls
// - Meaningful button names
// - Correct heading hierarchy
// - Accessible error messages
// - Sufficient contrast
// - Don't rely on color alone
// - Test without a mouse
//
// Accessibility is a product requirement, not a final decoration.

// -----------------------------------------------------------------------------
// 33. PROJECT PROGRESSION: LEVEL 1
// -----------------------------------------------------------------------------
// Beginner projects should force you to combine fundamentals.
//
// 1. Counter
// 2. Digital clock
// 3. Color generator
// 4. Random quote generator
// 5. Tip calculator
// 6. BMI calculator
// 7. Quiz app
// 8. Stopwatch
// 9. Expense calculator
// 10. Password generator
//
// Required skills:
// variables, conditions, loops, functions, arrays, objects, DOM, events.

// -----------------------------------------------------------------------------
// 34. PROJECT PROGRESSION: LEVEL 2
// -----------------------------------------------------------------------------
// Intermediate projects:
//
// 1. Todo app
// 2. Notes app
// 3. Expense tracker
// 4. Weather dashboard
// 5. GitHub profile explorer
// 6. Recipe finder
// 7. Movie search app
// 8. Pagination table
// 9. Kanban board
// 10. Markdown previewer
//
// Required skills:
// APIs, async/await, fetch, storage, modular code, validation, state.

// -----------------------------------------------------------------------------
// 35. PROJECT PROGRESSION: LEVEL 3
// -----------------------------------------------------------------------------
// Advanced projects:
//
// 1. Authentication system
// 2. Full-stack notes application
// 3. Real-time chat
// 4. URL shortener
// 5. Learning management system
// 6. E-commerce backend/frontend
// 7. Project management tool
// 8. Code snippet manager
// 9. Notification service
// 10. Analytics dashboard
//
// Required skills:
// architecture, database design, auth, authorization, testing, security,
// deployment, observability, caching and reliability.

// -----------------------------------------------------------------------------
// 36. PROJECT PROGRESSION: MASTER LEVEL
// -----------------------------------------------------------------------------
// Build systems where the hard part is architecture and trade-offs:
//
// - Multi-user SaaS
// - Offline-first application
// - Real-time collaborative editor
// - Event-driven notification platform
// - Search service
// - Job queue system
// - Feature flag platform
// - API gateway prototype
// - Distributed rate limiter prototype
// - Production-style developer platform

// At this level, ask not only "Can I code it?" but also:
// "Can I operate it, secure it, test it and evolve it?"

// -----------------------------------------------------------------------------
// 37. PROJECT MILESTONE SYSTEM
// -----------------------------------------------------------------------------
// Milestone 1: Problem + requirements
// Milestone 2: Data model
// Milestone 3: Static UI / domain model
// Milestone 4: Core CRUD
// Milestone 5: Validation + errors
// Milestone 6: Persistence
// Milestone 7: API integration
// Milestone 8: Authentication/authorization
// Milestone 9: Tests
// Milestone 10: Accessibility/performance/security review
// Milestone 11: Deployment
// Milestone 12: Documentation + portfolio

const milestoneStatus = {
  requirements: "done",
  dataModel: "done",
  coreFeature: "in-progress",
  testing: "not-started",
  deployment: "not-started"
};
console.log("Milestone status:", milestoneStatus);

// -----------------------------------------------------------------------------
// 38. FULL-STACK NOTES APP: REQUIREMENTS
// -----------------------------------------------------------------------------
// Suggested MVP:
// - Register/login
// - Create folders
// - Nested folders
// - Create/edit/delete notes
// - Pin/archive/trash
// - Search
// - Tags
// - Private/public notes
// - Share notes
//
// Advanced:
// - Refresh-token rotation
// - Real-time updates
// - Version history
// - Conflict handling
// - Full-text search
// - Audit logs
// - Rate limiting
// - Background jobs

// -----------------------------------------------------------------------------
// 39. NOTES APP DATA MODEL
// -----------------------------------------------------------------------------
// Users
//   id, email, passwordHash, createdAt
//
// Folders
//   id, ownerId, parentFolderId, name
//
// Notes
//   id, ownerId, folderId, title, content, isPinned, isArchived, createdAt
//
// Tags
//   id, ownerId, name
//
// NoteTags
//   noteId, tagId
//
// NoteShares
//   noteId, userId, permission
//
// Important relationship:
// Folder.parentFolderId → Folder.id creates a tree.

// -----------------------------------------------------------------------------
// 40. NOTES APP API BLUEPRINT
// -----------------------------------------------------------------------------
// POST   /api/auth/register
// POST   /api/auth/login
// POST   /api/auth/refresh
// POST   /api/auth/logout
// GET    /api/folders
// POST   /api/folders
// PATCH  /api/folders/:id
// DELETE /api/folders/:id
// GET    /api/notes
// POST   /api/notes
// GET    /api/notes/:id
// PATCH  /api/notes/:id
// DELETE /api/notes/:id
// POST   /api/notes/:id/archive
// POST   /api/notes/:id/pin
// GET    /api/tags
// POST   /api/notes/:id/share
//
// Exact endpoints are a design decision; consistency matters more than a
// particular naming convention.

// -----------------------------------------------------------------------------
// 41. NOTES APP REQUEST FLOW
// -----------------------------------------------------------------------------
// Browser
//   ↓
// Route handler
//   ↓
// Authentication middleware
//   ↓
// Validation
//   ↓
// Controller
//   ↓
// Service / business rules
//   ↓
// Repository
//   ↓
// Database
//   ↓
// Repository
//   ↓
// Service
//   ↓
// Controller
//   ↓
// JSON response
//   ↓
// Frontend state/UI

// -----------------------------------------------------------------------------
// 42. PROJECT README CHECKLIST
// -----------------------------------------------------------------------------
// Every serious project should document:
// - What it does
// - Why it exists
// - Screenshots/demo
// - Features
// - Tech stack
// - Architecture
// - Folder structure
// - Environment variables
// - Installation
// - Running locally
// - API documentation if applicable
// - Database setup if applicable
// - Testing
// - Deployment
// - Known limitations
// - Future improvements
// - License

// -----------------------------------------------------------------------------
// 43. GIT WORKFLOW
// -----------------------------------------------------------------------------
// Keep commits focused.
//
// Example:
// feat: add note creation
// feat: add note validation
// fix: prevent duplicate note titles
// test: add note service tests
// refactor: extract note repository
// docs: add local setup instructions
//
// Avoid one giant "final project" commit.

// -----------------------------------------------------------------------------
// 44. PROJECT REFACTORING
// -----------------------------------------------------------------------------
// Refactoring = changing internal structure without intentionally changing
// externally observable behavior.
//
// Refactor when you identify a real problem:
// - duplicated business logic
// - huge functions
// - unclear dependencies
// - difficult tests
// - repeated API mapping
// - tangled UI and data access
//
// Do not create abstractions only because a tutorial says they are "clean".

// -----------------------------------------------------------------------------
// 45. PROJECT QUALITY SCORECARD
// -----------------------------------------------------------------------------
function scoreProject(project) {
  const categories = {
    functionality: project.functionality,
    codeQuality: project.codeQuality,
    testing: project.testing,
    accessibility: project.accessibility,
    performance: project.performance,
    security: project.security,
    documentation: project.documentation,
    deployment: project.deployment
  };

  const scores = Object.values(categories);
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;

  return {
    categories,
    average: Number(average.toFixed(2))
  };
}

console.log(
  "Project score:",
  scoreProject({
    functionality: 9,
    codeQuality: 8,
    testing: 7,
    accessibility: 8,
    performance: 7,
    security: 8,
    documentation: 9,
    deployment: 6
  })
);

// -----------------------------------------------------------------------------
// 46. COMMON PROJECT MISTAKES
// -----------------------------------------------------------------------------
// 1. Starting without requirements.
// 2. Building too many features.
// 3. Copying tutorial code without understanding it.
// 4. Mixing UI, business logic and persistence everywhere.
// 5. No loading/error/empty states.
// 6. Trusting client-side validation as security.
// 7. Ignoring accessibility.
// 8. No tests for important business rules.
// 9. No environment-variable strategy.
// 10. No deployment practice.
// 11. Refactoring endlessly instead of shipping.
// 12. Adding libraries before understanding the problem.

// -----------------------------------------------------------------------------
// 47. PROJECT DEBUGGING CHALLENGES
// -----------------------------------------------------------------------------
// Challenge A:
// Search works for "JavaScript" but not "javascript".
// Question: where should normalization happen?
//
// Challenge B:
// UI says "No notes" when the API returned 500.
// Question: what state distinction is missing?
//
// Challenge C:
// User edits someone else's note by changing the URL ID.
// Question: where must authorization be enforced?
//
// Challenge D:
// Search sends one request for every keystroke.
// Question: what technique can reduce request frequency?
//
// Challenge E:
// Two tabs overwrite each other's local changes.
// Question: what synchronization/conflict strategy is needed?

// -----------------------------------------------------------------------------
// 48. OUTPUT PREDICTION
// -----------------------------------------------------------------------------
const projectValues = [1, 2, 3, 4];
const projectResult = projectValues
  .filter((value) => value % 2 === 0)
  .map((value) => value * 10)
  .reduce((sum, value) => sum + value, 0);

console.log("Output prediction result:", projectResult);
// Expected: 60
// Why: [2, 4] → [20, 40] → 60

// -----------------------------------------------------------------------------
// 49. MINI PROJECT: IN-MEMORY TASK MANAGER
// -----------------------------------------------------------------------------
// This is a small runnable project. It demonstrates how a project grows from
// pure functions before a UI/database is introduced.

function createTaskManager() {
  let tasks = [];
  let nextId = 1;

  function add(title) {
    const validation = validateTaskInput({ title });
    if (!validation.valid) {
      throw new Error(validation.errors.title);
    }

    const task = {
      id: nextId++,
      title: title.trim(),
      completed: false
    };

    tasks = [...tasks, task];
    return task;
  }

  function complete(id) {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: true } : task
    );
  }

  function list() {
    return [...tasks];
  }

  return { add, complete, list };
}

const manager = createTaskManager();
const taskA = manager.add("Build my first serious project");
manager.add("Write project README");
manager.complete(taskA.id);
console.log("Mini project state:", manager.list());

// -----------------------------------------------------------------------------
// 50. ASYNC PROJECT DEMO
// -----------------------------------------------------------------------------
async function loadDashboard() {
  const [profile, tasks] = await Promise.all([
    requestJson("/api/profile"),
    requestJson("/api/tasks")
  ]);

  return { profile, tasks };
}

// `loadDashboard()` is defined but not called here to keep this chapter output
// short and deterministic.

// -----------------------------------------------------------------------------
// 51. PROJECT BUILDING RULE: VERTICAL SLICES
// -----------------------------------------------------------------------------
// Instead of building:
// all UI → all backend → all database → integration at the end,
// build one complete feature vertically.
//
// Example:
// "Create note"
// UI form → POST route → validation → service → repository → DB → response →
// UI update → test.
//
// This exposes integration problems early.

// -----------------------------------------------------------------------------
// 52. FEATURE SLICE TEMPLATE
// -----------------------------------------------------------------------------
const featureSlice = {
  requirement: "User can pin a note",
  ui: ["Pin button", "Pinned visual state"],
  api: ["POST /api/notes/:id/pin"],
  validation: ["Valid note ID", "Authenticated user"],
  businessRule: "Only an owner or permitted collaborator can pin",
  persistence: ["Update isPinned"],
  tests: ["owner can pin", "unauthorized user cannot pin"]
};

console.log("Feature slice:", featureSlice.requirement);

// -----------------------------------------------------------------------------
// 53. DEPLOYMENT MENTAL MODEL
// -----------------------------------------------------------------------------
// Local development:
// Browser → local frontend → local backend → local DB
//
// Production:
// Browser → CDN/hosting → frontend
// Browser → HTTPS API → backend → database/cache/queue/storage
//
// Deployment checklist:
// - Production environment variables
// - Database migrations
// - HTTPS
// - CORS configuration
// - Secure cookies/auth configuration
// - Logs
// - Health checks
// - Error monitoring
// - Backups where required
// - Rollback plan

// -----------------------------------------------------------------------------
// 54. HEALTH CHECK
// -----------------------------------------------------------------------------
// A health endpoint should answer whether the service is alive.
// A deeper readiness check may verify dependencies.

function healthCheck() {
  return {
    status: "ok",
    timestamp: new Date().toISOString()
  };
}

console.log("Health check:", healthCheck());

// -----------------------------------------------------------------------------
// 55. OBSERVABILITY
// -----------------------------------------------------------------------------
// Logs tell you events.
// Metrics tell you quantities/trends.
// Traces connect work across service boundaries.
//
// Useful project signals:
// - request count
// - latency
// - error rate
// - failed login attempts
// - queue depth
// - database latency
//
// Never log passwords, access tokens or other secrets.

// -----------------------------------------------------------------------------
// 56. PORTFOLIO PROJECT STANDARD
// -----------------------------------------------------------------------------
// A portfolio project should answer in under a minute:
// 1. What problem does it solve?
// 2. Who is it for?
// 3. What did you build?
// 4. What technical decisions did you make?
// 5. What difficult problem did you solve?
// 6. What would you improve next?
//
// A deployed project + source code + strong README is much more useful than
// a folder full of unfinished tutorial clones.

// -----------------------------------------------------------------------------
// 57. PROJECT TEACH-BACK
// -----------------------------------------------------------------------------
// Before calling a project "mastered", explain without notes:
// - Why did you choose this data model?
// - Where is validation performed?
// - Where is authorization enforced?
// - How does data move from UI to database?
// - What happens when the API fails?
// - How would you test the hardest rule?
// - What happens if two users edit the same resource?
// - What would break at 100,000 records?
// - What would you monitor in production?

// -----------------------------------------------------------------------------
// 58. 30 PROJECT CHALLENGES
// -----------------------------------------------------------------------------
const projectChallenges = [
  "Build a counter without a framework.",
  "Build a quiz with score tracking.",
  "Build a color palette generator.",
  "Build an expense tracker with local persistence.",
  "Build a searchable contacts app.",
  "Build a notes app with folders.",
  "Build a weather dashboard with loading/error states.",
  "Build a paginated data table.",
  "Build a GitHub profile explorer.",
  "Build a movie search application.",
  "Build a Kanban board with drag and drop.",
  "Build a markdown previewer.",
  "Build a URL shortener API.",
  "Build a JWT authentication API.",
  "Build a role-based authorization system.",
  "Build a full-stack notes application.",
  "Add refresh-token authentication to the notes app.",
  "Add note sharing with permissions.",
  "Add tags and search.",
  "Add pagination and sorting.",
  "Add automated API tests.",
  "Add frontend component tests.",
  "Add E2E authentication tests.",
  "Add rate limiting to sensitive routes.",
  "Add an email notification queue.",
  "Add real-time updates with WebSocket or SSE.",
  "Add optimistic UI with rollback.",
  "Add offline-first support.",
  "Deploy the full-stack application.",
  "Write an architecture decision record for one major trade-off."
];

console.log("Project challenges:", projectChallenges.length);

// -----------------------------------------------------------------------------
// 59. INTERVIEW QUESTIONS
// -----------------------------------------------------------------------------
// 1. How do you decide what belongs in an MVP?
// 2. How do you separate UI and business logic?
// 3. What is the difference between client and server validation?
// 4. Why is frontend authorization not sufficient?
// 5. How would you design CRUD APIs?
// 6. How do you handle loading, empty and error states?
// 7. How would you paginate a large dataset?
// 8. When would you use debounce?
// 9. What makes a project testable?
// 10. How would you debug a production-only API failure?
// 11. What belongs in environment variables?
// 12. How would you prevent secrets from reaching the browser?
// 13. How would you handle duplicate requests?
// 14. How would you prevent N+1 database queries?
// 15. When is caching useful, and what makes invalidation difficult?
// 16. What is optimistic UI?
// 17. How do authentication and authorization differ?
// 18. How would you design note sharing permissions?
// 19. What would you monitor after deployment?
// 20. How do you know when an abstraction is justified?

// -----------------------------------------------------------------------------
// 60. MASTER PROJECT RULES
// -----------------------------------------------------------------------------
// Rule 1: Build before watching another tutorial.
// Rule 2: Start with a small MVP.
// Rule 3: Write requirements before implementation.
// Rule 4: Design data before complicated UI state.
// Rule 5: Build vertical slices.
// Rule 6: Keep business rules testable.
// Rule 7: Validate external input.
// Rule 8: Enforce authorization on the server.
// Rule 9: Handle loading, empty and error states.
// Rule 10: Debug systematically.
// Rule 11: Measure performance before optimizing.
// Rule 12: Treat accessibility and security as first-class requirements.
// Rule 13: Commit work in small logical steps.
// Rule 14: Deploy projects instead of keeping everything local.
// Rule 15: Explain your own code without the tutorial open.

// -----------------------------------------------------------------------------
// 61. FINAL PROJECT MASTER CHECKLIST
// -----------------------------------------------------------------------------
const masterChecklist = [
  "Problem clearly defined",
  "MVP completed",
  "Requirements written",
  "Data model designed",
  "Core feature implemented",
  "Validation added",
  "Error states handled",
  "Persistence implemented",
  "Authentication added if needed",
  "Authorization enforced server-side",
  "Tests added",
  "Accessibility reviewed",
  "Security reviewed",
  "Performance measured",
  "Deployment completed",
  "README completed",
  "Architecture explained",
  "Known limitations documented",
  "Project demo available",
  "Project can be explained without copying a tutorial"
];

console.log("Master checklist items:", masterChecklist.length);

// -----------------------------------------------------------------------------
// 62. TEACH-BACK EXERCISE
// -----------------------------------------------------------------------------
// Explain this entire chapter to another beginner using one project.
//
// Required explanation order:
// 1. Problem
// 2. Requirements
// 3. MVP
// 4. Data model
// 5. UI
// 6. State
// 7. API
// 8. Validation
// 9. Authentication
// 10. Authorization
// 11. Database
// 12. Testing
// 13. Security
// 14. Performance
// 15. Deployment
// 16. Documentation
//
// If you can build and explain those layers, you are no longer just learning
// JavaScript syntax—you are practicing software engineering.

async function main() {
  await demonstrateErrors();

  const dashboard = await loadDashboard();
  console.log("Async dashboard:", dashboard);

  const processed = await mapWithConcurrency(
    [1, 2, 3, 4],
    async (value) => value * 2,
    2
  );
  console.log("Bounded concurrency result:", processed);

  console.log("=== Projects companion completed ===");
}

main().catch((error) => {
  console.error("Unexpected chapter error:", error);
  process.exitCode = 1;
});
