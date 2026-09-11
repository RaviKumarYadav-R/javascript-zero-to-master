//* ============================================================
//* JAVASCRIPT DOM — PRACTICAL COMPANION
//* ============================================================

//* Definition:
//* DOM = Document Object Model.
//* It is the browser's object representation of an HTML document.
//* JavaScript can use DOM APIs to find nodes, read/change content and
//* attributes, create/remove elements, handle events and update the page.
//*
//* Run this file in a browser after loading it from an HTML page.


//* ------------------------------------------------------------
//* 1. BASIC HTML FOR PRACTICE
//* ------------------------------------------------------------

//* Example HTML:
//*
//* <main id="app">
//*   <h1 id="title">Hello</h1>
//*   <p class="message">Welcome</p>
//*   <button id="btn">Click</button>
//* </main>
//*
//* <script src="dom.js" defer></script>
//*
//* `defer` lets the browser parse HTML while the script is downloaded,
//* then executes the script after parsing is complete.


//* ------------------------------------------------------------
//* 2. DOCUMENT
//* ------------------------------------------------------------

console.log(document);
console.log(document.documentElement);
console.log(document.body);

//* document is the main DOM entry point for the current page.


//* ------------------------------------------------------------
//* 3. GET ELEMENT BY ID
//* ------------------------------------------------------------

const title = document.getElementById("title");
console.log(title);

//* Returns the element whose id matches the supplied string, or null.


//* ------------------------------------------------------------
//* 4. QUERY SELECTOR
//* ------------------------------------------------------------

const firstMessage = document.querySelector(".message");
console.log(firstMessage);

//* querySelector() returns the first element matching a CSS selector.


//* ------------------------------------------------------------
//* 5. QUERY SELECTOR ALL
//* ------------------------------------------------------------

const messages = document.querySelectorAll(".message");
console.log(messages);

//* Returns a static NodeList of matching elements.

messages.forEach((element) => {
  console.log(element.textContent);
});


//* ------------------------------------------------------------
//* 6. QUERY SELECTOR VS GET ELEMENT BY ID
//* ------------------------------------------------------------

//* getElementById("title") -> specialized ID lookup.
//* querySelector("#title") -> CSS selector lookup.
//*
//* Both can find the same element, but querySelector is more general.


//* ------------------------------------------------------------
//* 7. TEXT CONTENT
//* ------------------------------------------------------------

if (title) {
  console.log(title.textContent);
  title.textContent = "JavaScript DOM";
}

//* textContent reads/writes text without interpreting it as HTML.


//* ------------------------------------------------------------
//* 8. INNER HTML
//* ------------------------------------------------------------

const app = document.getElementById("app");

if (app) {
  app.insertAdjacentHTML("beforeend", "<p>Added safely as known markup</p>");
}

//* innerHTML reads/writes HTML markup.
//* Avoid inserting untrusted user input into innerHTML because it can create XSS.


//* ------------------------------------------------------------
//* 9. INNER HTML VS TEXT CONTENT
//* ------------------------------------------------------------

//* element.textContent = "<strong>Hello</strong>";
//* -> displays the tags as text.
//*
//* element.innerHTML = "<strong>Hello</strong>";
//* -> creates a strong element.
//*
//* Prefer textContent for plain user-controlled text.


//* ------------------------------------------------------------
//* 10. INNER TEXT
//* ------------------------------------------------------------

if (title) {
  console.log(title.innerText);
}

//* innerText reflects rendered/visible text and can trigger layout-related work.
//* textContent is generally preferred when rendered visibility is not important.


//* ------------------------------------------------------------
//* 11. STYLE
//* ------------------------------------------------------------

if (title) {
  title.style.fontSize = "2rem";
  title.style.marginBottom = "1rem";
}

//* style changes inline CSS declarations.


//* ------------------------------------------------------------
//* 12. CLASS LIST
//* ------------------------------------------------------------

if (title) {
  title.classList.add("active");
  title.classList.remove("old-class");
  title.classList.toggle("highlight");

  console.log(title.classList.contains("active"));
}

//* classList is the preferred API for manipulating individual classes.


//* ------------------------------------------------------------
//* 13. TOGGLE WITH CONDITION
//* ------------------------------------------------------------

if (title) {
  title.classList.toggle("dark", true);
  title.classList.toggle("dark", false);
}

//* The second argument can force add/remove behavior.


//* ------------------------------------------------------------
//* 14. ATTRIBUTES
//* ------------------------------------------------------------

const button = document.getElementById("btn");

if (button) {
  button.setAttribute("type", "button");
  console.log(button.getAttribute("type"));
  console.log(button.hasAttribute("disabled"));
}

//* getAttribute -> read
//* setAttribute -> write
//* hasAttribute -> check existence
//* removeAttribute -> remove


//* ------------------------------------------------------------
//* 15. DATA ATTRIBUTES
//* ------------------------------------------------------------

if (button) {
  button.setAttribute("data-user-id", "42");
  console.log(button.dataset.userId);
}

//* data-user-id becomes dataset.userId.


//* ------------------------------------------------------------
//* 16. PROPERTY VS ATTRIBUTE
//* ------------------------------------------------------------

if (button) {
  button.disabled = true; // DOM property
  console.log(button.disabled);
  console.log(button.getAttribute("disabled")); // attribute presence
}

//* HTML attributes are part of markup.
//* DOM properties are JavaScript-accessible object state.
//* They are related but are not universally identical.


//* ------------------------------------------------------------
//* 17. LINKS
//* ------------------------------------------------------------

const link = document.querySelector("a");

if (link) {
  console.log(link.href); // resolved DOM property value
  console.log(link.getAttribute("href")); // source attribute value
}


//* ------------------------------------------------------------
//* 18. FORM INPUT VALUE
//* ------------------------------------------------------------

const input = document.querySelector("input");

if (input) {
  console.log(input.value);
  input.value = "Ravi";
}

//* Form controls expose current state through properties such as value.


//* ------------------------------------------------------------
//* 19. CREATE ELEMENT
//* ------------------------------------------------------------

const newParagraph = document.createElement("p");
newParagraph.textContent = "Created with JavaScript";
console.log(newParagraph);


//* ------------------------------------------------------------
//* 20. APPEND
//* ------------------------------------------------------------

if (app) {
  app.append(newParagraph);
}

//* append() can add nodes and strings and can append multiple items.


//* ------------------------------------------------------------
//* 21. APPEND CHILD
//* ------------------------------------------------------------

const list = document.createElement("ul");
const item = document.createElement("li");
item.textContent = "First item";
list.appendChild(item);

if (app) app.appendChild(list);

//* appendChild() accepts a Node and returns the appended node.


//* ------------------------------------------------------------
//* 22. PREPEND
//* ------------------------------------------------------------

if (list) {
  const first = document.createElement("li");
  first.textContent = "Prepended item";
  list.prepend(first);
}


//* ------------------------------------------------------------
//* 23. BEFORE / AFTER
//* ------------------------------------------------------------

if (title) {
  const note = document.createElement("p");
  note.textContent = "Note";
  title.after(note);
}


//* ------------------------------------------------------------
//* 24. REMOVE
//* ------------------------------------------------------------

const temporary = document.createElement("div");
temporary.textContent = "Temporary";
app?.append(temporary);
temporary.remove();

//* remove() removes the element from its parent.


//* ------------------------------------------------------------
//* 25. REPLACE WITH
//* ------------------------------------------------------------

const oldElement = document.createElement("p");
oldElement.textContent = "Old";
const replacement = document.createElement("p");
replacement.textContent = "New";

app?.append(oldElement);
oldElement.replaceWith(replacement);


//* ------------------------------------------------------------
//* 26. CHILDREN VS CHILDNODES
//* ------------------------------------------------------------

if (app) {
  console.log(app.children); // element children only
  console.log(app.childNodes); // elements + text/comment nodes
}

//* Whitespace in HTML can produce text nodes.


//* ------------------------------------------------------------
//* 27. PARENT ELEMENT
//* ------------------------------------------------------------

if (title) {
  console.log(title.parentElement);
}


//* ------------------------------------------------------------
//* 28. SIBLINGS
//* ------------------------------------------------------------

if (title) {
  console.log(title.nextElementSibling);
  console.log(title.previousElementSibling);
}


//* ------------------------------------------------------------
//* 29. CLOSEST
//* ------------------------------------------------------------

if (button) {
  console.log(button.closest("main"));
}

//* closest() returns the nearest matching ancestor, including the element itself.


//* ------------------------------------------------------------
//* 30. MATCHES
//* ------------------------------------------------------------

if (button) {
  console.log(button.matches("button"));
}


//* ------------------------------------------------------------
//* 31. TRAVERSAL
//* ------------------------------------------------------------

if (app) {
  let node = app.firstElementChild;

  while (node) {
    console.log(node.tagName);
    node = node.nextElementSibling;
  }
}


//* ------------------------------------------------------------
//* 32. NODE TYPE
//* ------------------------------------------------------------

if (title) {
  console.log(title.nodeType);
  console.log(title.nodeName);
}

//* Element nodes have nodeType 1.


//* ------------------------------------------------------------
//* 33. EVENT
//* ------------------------------------------------------------

button?.addEventListener("click", () => {
  console.log("Button clicked");
});

//* addEventListener registers an event listener without replacing other listeners.


//* ------------------------------------------------------------
//* 34. EVENT OBJECT
//* ------------------------------------------------------------

button?.addEventListener("click", (event) => {
  console.log(event.type);
  console.log(event.target);
  console.log(event.currentTarget);
});

//* target -> original event target.
//* currentTarget -> element whose listener is currently running.


//* ------------------------------------------------------------
//* 35. REMOVE EVENT LISTENER
//* ------------------------------------------------------------

function handleClick(event) {
  console.log("Clicked", event.type);
}

button?.addEventListener("click", handleClick);
button?.removeEventListener("click", handleClick);

//* removeEventListener needs the same function reference used for registration.


//* ------------------------------------------------------------
//* 36. EVENT OPTIONS
//* ------------------------------------------------------------

function onceHandler() {
  console.log("Runs once");
}

button?.addEventListener("click", onceHandler, { once: true });

//* once removes the listener after its first invocation.


//* ------------------------------------------------------------
//* 37. PREVENT DEFAULT
//* ------------------------------------------------------------

const form = document.querySelector("form");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Form submission handled by JavaScript");
});

//* preventDefault() cancels the browser's default action when that action is cancelable.


//* ------------------------------------------------------------
//* 38. STOP PROPAGATION
//* ------------------------------------------------------------

button?.addEventListener("click", (event) => {
  event.stopPropagation();
});

//* stopPropagation prevents further propagation through the event path.
//* It does not automatically remove other listeners on the same element.


//* ------------------------------------------------------------
//* 39. CAPTURE AND BUBBLE
//* ------------------------------------------------------------

app?.addEventListener("click", () => {
  console.log("capture");
}, { capture: true });

app?.addEventListener("click", () => {
  console.log("bubble");
});

//* Simplified path: capture -> target -> bubble.


//* ------------------------------------------------------------
//* 40. EVENT DELEGATION
//* ------------------------------------------------------------

if (list) {
  list.addEventListener("click", (event) => {
    const target = event.target;

    if (target instanceof Element && target.matches("li")) {
      target.classList.toggle("selected");
    }
  });
}

//* Event delegation uses one ancestor listener to handle events from descendants.
//* It works well for dynamically created lists.


//* ------------------------------------------------------------
//* 41. KEYBOARD EVENTS
//* ------------------------------------------------------------

input?.addEventListener("keydown", (event) => {
  console.log(event.key);

  if (event.key === "Enter") {
    console.log("Enter pressed");
  }
});


//* ------------------------------------------------------------
//* 42. INPUT EVENT
//* ------------------------------------------------------------

input?.addEventListener("input", (event) => {
  const current = event.currentTarget;

  if (current instanceof HTMLInputElement) {
    console.log(current.value);
  }
});

//* input fires when the control's value changes through user interaction.


//* ------------------------------------------------------------
//* 43. CHANGE EVENT
//* ------------------------------------------------------------

const select = document.querySelector("select");

select?.addEventListener("change", (event) => {
  const current = event.currentTarget;

  if (current instanceof HTMLSelectElement) {
    console.log(current.value);
  }
});


//* ------------------------------------------------------------
//* 44. DOMCONTENTLOADED
//* ------------------------------------------------------------

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("HTML parsed");
  }, { once: true });
} else {
  console.log("DOM is already ready");
}

//* DOMContentLoaded fires after the HTML document has been completely parsed
//* and deferred/module scripts have executed, without waiting for images etc.


//* ------------------------------------------------------------
//* 45. DEFER SCRIPT
//* ------------------------------------------------------------

//* Preferred HTML:
//* <script src="dom.js" defer></script>
//*
//* This often avoids needing DOMContentLoaded simply to access elements because
//* the script runs after parsing.


//* ------------------------------------------------------------
//* 46. ASYNC SCRIPT
//* ------------------------------------------------------------

//* <script src="analytics.js" async></script>
//*
//* async scripts execute as soon as downloaded and can run before parsing finishes.
//* Do not use async when the script depends on DOM elements being parsed first.


//* ------------------------------------------------------------
//* 47. TEMPLATE ELEMENT
//* ------------------------------------------------------------

const template = document.createElement("template");
template.innerHTML = `<li class="item">Template item</li>`;

const templateClone = template.content.cloneNode(true);
list?.append(templateClone);

//* template.content is a DocumentFragment-like inert template subtree.


//* ------------------------------------------------------------
//* 48. DOCUMENT FRAGMENT
//* ------------------------------------------------------------

const fragment = document.createDocumentFragment();

for (let i = 1; i <= 3; i++) {
  const li = document.createElement("li");
  li.textContent = `Batch item ${i}`;
  fragment.append(li);
}

list?.append(fragment);

//* A fragment lets you assemble nodes before inserting them into the document.


//* ------------------------------------------------------------
//* 49. CLONE NODE
//* ------------------------------------------------------------

if (item) {
  const clone = item.cloneNode(true);
  clone.textContent = "Cloned item";
  list?.append(clone);
}

//* true means deep clone descendants too.
//* Event listeners added with addEventListener are not cloned.


//* ------------------------------------------------------------
//* 50. NODELIST VS HTMLCOLLECTION
//* ------------------------------------------------------------

const nodeList = document.querySelectorAll("li");
const liveCollection = document.getElementsByTagName("li");

console.log(nodeList);
console.log(liveCollection);

//* querySelectorAll returns a static NodeList.
//* getElementsByTagName returns a live HTMLCollection.


//* ------------------------------------------------------------
//* 51. CONVERT COLLECTION TO ARRAY
//* ------------------------------------------------------------

const liArray = Array.from(document.querySelectorAll("li"));
console.log(liArray.map((li) => li.textContent));


//* ------------------------------------------------------------
//* 52. FORM DATA
//* ------------------------------------------------------------

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  console.log(Object.fromEntries(data.entries()));
});

//* FormData reads named form controls and is useful for form submission.


//* ------------------------------------------------------------
//* 53. CHECKBOX
//* ------------------------------------------------------------

const checkbox = document.querySelector('input[type="checkbox"]');

if (checkbox instanceof HTMLInputElement) {
  console.log(checkbox.checked);
}


//* ------------------------------------------------------------
//* 54. SELECTED OPTION
//* ------------------------------------------------------------

if (select instanceof HTMLSelectElement) {
  console.log(select.value);
  console.log(select.selectedOptions);
}


//* ------------------------------------------------------------
//* 55. FOCUS
//* ------------------------------------------------------------

input?.focus();
input?.blur();

//* focus() gives keyboard focus; blur() removes focus.


//* ------------------------------------------------------------
//* 56. SCROLLING
//* ------------------------------------------------------------

const section = document.querySelector("section");
section?.scrollIntoView({ behavior: "smooth", block: "start" });


//* ------------------------------------------------------------
//* 57. ELEMENT DIMENSIONS
//* ------------------------------------------------------------

if (app) {
  console.log(app.getBoundingClientRect());
  console.log(app.clientWidth, app.clientHeight);
  console.log(app.scrollWidth, app.scrollHeight);
}

//* getBoundingClientRect() gives the element's current border-box geometry
//* relative to the viewport.
//* clientWidth/clientHeight include padding but not borders/scrollbar in common cases.
//* scrollWidth/scrollHeight describe scrollable content dimensions.


//* ------------------------------------------------------------
//* 58. COMPUTED STYLE
//* ------------------------------------------------------------

if (title) {
  console.log(getComputedStyle(title).fontSize);
}

//* getComputedStyle returns the resolved style information for an element.


//* ------------------------------------------------------------
//* 59. CREATE TEXT NODE
//* ------------------------------------------------------------

const textNode = document.createTextNode("Plain text node");
app?.append(textNode);


//* ------------------------------------------------------------
//* 60. ATTRIBUTE SELECTOR
//* ------------------------------------------------------------

const userElements = document.querySelectorAll('[data-user-id="42"]');
console.log(userElements);


//* ------------------------------------------------------------
//* 61. CSS SELECTORS IN DOM
//* ------------------------------------------------------------

//* Examples:
//* document.querySelector(".card")
//* document.querySelector("#title")
//* document.querySelector("button")
//* document.querySelector(".card button")
//* document.querySelector("input[type=email]")
//* document.querySelector("[data-id]")


//* ------------------------------------------------------------
//* 62. DOM MANIPULATION FUNCTION
//* ------------------------------------------------------------

function createTodo(titleText) {
  const li = document.createElement("li");
  li.className = "todo";
  li.textContent = titleText;
  return li;
}

const todo = createTodo("Learn DOM");
list?.append(todo);


//* ------------------------------------------------------------
//* 63. RENDERING DATA
//* ------------------------------------------------------------

const products = [
  { name: "Keyboard", price: 1500 },
  { name: "Mouse", price: 700 },
];

function renderProducts(productsToRender, container) {
  const fragment = document.createDocumentFragment();

  for (const product of productsToRender) {
    const card = document.createElement("article");
    const name = document.createElement("h2");
    const price = document.createElement("p");

    name.textContent = product.name;
    price.textContent = `₹${product.price}`;

    card.append(name, price);
    fragment.append(card);
  }

  container.replaceChildren(fragment);
}

const productContainer = document.querySelector("#products");

if (productContainer) {
  renderProducts(products, productContainer);
}

//* Build DOM nodes with textContent instead of injecting untrusted HTML.


//* ------------------------------------------------------------
//* 64. REPLACE CHILDREN
//* ------------------------------------------------------------

if (productContainer) {
  const message = document.createElement("p");
  message.textContent = "No products";
  productContainer.replaceChildren(message);
}

//* replaceChildren removes existing children and inserts the supplied nodes.


//* ------------------------------------------------------------
//* 65. CUSTOM DATA STATE
//* ------------------------------------------------------------

if (button) {
  button.dataset.state = "ready";
  console.log(button.dataset.state);
}


//* ------------------------------------------------------------
//* 66. DOM EVENT FLOW
//* ------------------------------------------------------------

//* Example:
//* document -> body -> main -> button
//*
//* A click travels through capture toward the target, reaches the target,
//* then normally propagates back through bubbling ancestors.


//* ------------------------------------------------------------
//* 67. EVENT DELEGATION WITH DATA ATTRIBUTES
//* ------------------------------------------------------------

const actions = document.querySelector("[data-actions]");

actions?.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof Element)) return;

  const actionButton = target.closest("[data-action]");
  if (!actionButton || !actions.contains(actionButton)) return;

  console.log(actionButton.dataset.action);
});


//* ------------------------------------------------------------
//* 68. MODAL PATTERN
//* ------------------------------------------------------------

const modal = document.querySelector("dialog");
const openModalButton = document.querySelector("[data-open-modal]");
const closeModalButton = document.querySelector("[data-close-modal]");

if (modal instanceof HTMLDialogElement) {
  openModalButton?.addEventListener("click", () => modal.showModal());
  closeModalButton?.addEventListener("click", () => modal.close());
}

//* dialog is a browser-provided HTML element with modal/non-modal APIs.


//* ------------------------------------------------------------
//* 69. DOMCONTENTLOADED VS LOAD
//* ------------------------------------------------------------

window.addEventListener("load", () => {
  console.log("Window load: dependent resources have finished loading");
});

//* DOMContentLoaded -> HTML parsing complete.
//* load -> page resources such as images/stylesheets have finished loading.


//* ------------------------------------------------------------
//* 70. COMMON MISTAKE — ELEMENT IS NULL
//* ------------------------------------------------------------

const missing = document.getElementById("does-not-exist");
console.log(missing); // null

//* Wrong:
//* missing.textContent = "Hello"; // TypeError
//*
//* Correct:
//* if (missing) missing.textContent = "Hello";


//* ------------------------------------------------------------
//* 71. COMMON MISTAKE — SCRIPT RUNS TOO EARLY
//* ------------------------------------------------------------

//* Wrong HTML:
//* <script src="dom.js"></script>
//* <button id="btn">Click</button>
//*
//* The script may execute before the button is parsed.
//*
//* Better:
//* <script src="dom.js" defer></script>
//*
//* Or place the script appropriately after the required markup.


//* ------------------------------------------------------------
//* 72. COMMON MISTAKE — USING INNERHTML WITH USER INPUT
//* ------------------------------------------------------------

function unsafeRender(username) {
  return `<p>${username}</p>`;
}

function safeRender(container, username) {
  const p = document.createElement("p");
  p.textContent = username;
  container.replaceChildren(p);
}

console.log(unsafeRender("<img src=x onerror=alert('XSS')>"));
//* Never treat the returned string as safe HTML when username is untrusted.
//* Use textContent or proper sanitization.


//* ------------------------------------------------------------
//* 73. COMMON MISTAKE — ASSIGNING innerHTML REPEATEDLY
//* ------------------------------------------------------------

//* Replacing innerHTML recreates descendant nodes and can discard state/listeners
//* attached directly to those replaced nodes.
//* Prefer targeted DOM operations when you need to preserve existing nodes.


//* ------------------------------------------------------------
//* 74. COMMON MISTAKE — WRONG EVENT TARGET
//* ------------------------------------------------------------

app?.addEventListener("click", (event) => {
  console.log("target:", event.target);
  console.log("currentTarget:", event.currentTarget);
});

//* target and currentTarget are often different with delegated events.


//* ------------------------------------------------------------
//* 75. COMMON MISTAKE — REMOVE EVENT LISTENER WITH NEW FUNCTION
//* ------------------------------------------------------------

//* Wrong:
//* button.addEventListener("click", () => console.log("hi"));
//* button.removeEventListener("click", () => console.log("hi"));
//*
//* These are two different function objects.
//*
//* Correct:
//* const handler = () => console.log("hi");
//* button.addEventListener("click", handler);
//* button.removeEventListener("click", handler);


//* ------------------------------------------------------------
//* 76. COMMON MISTAKE — FORGETTING FORM DEFAULT ACTION
//* ------------------------------------------------------------

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Validated before custom submission");
});


//* ------------------------------------------------------------
//* 77. COMMON MISTAKE — LOOPING LIVE COLLECTIONS WHILE MUTATING
//* ------------------------------------------------------------

//* Live collections update as the DOM changes.
//* If your loop removes/adds matching elements, the collection length/content
//* can change during iteration. Convert to an array when you need a stable snapshot.


//* ------------------------------------------------------------
//* 78. PERFORMANCE — BATCH DOM WORK
//* ------------------------------------------------------------

function renderNumbers(container, count) {
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= count; i++) {
    const span = document.createElement("span");
    span.textContent = `${i} `;
    fragment.append(span);
  }

  container.replaceChildren(fragment);
}

if (productContainer) renderNumbers(productContainer, 5);

//* Build a batch in memory, then update the document once when practical.


//* ------------------------------------------------------------
//* 79. LAYOUT AND STYLE READS
//* ------------------------------------------------------------

if (app) {
  app.style.width = "500px";
  console.log(app.getBoundingClientRect().width);
}

//* Reading layout after writes can force the browser to calculate layout.
//* Avoid unnecessary write-read-write cycles in performance-sensitive code.


//* ------------------------------------------------------------
//* 80. MUTATION OBSERVER
//* ------------------------------------------------------------

if (app) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      console.log(mutation.type);
    }
  });

  observer.observe(app, {
    childList: true,
    subtree: true,
    attributes: true,
  });

  setTimeout(() => observer.disconnect(), 1000);
}

//* MutationObserver observes DOM mutations asynchronously.


//* ------------------------------------------------------------
//* 81. INTERSECTION OBSERVER
//* ------------------------------------------------------------

const observedSection = document.querySelector("section");

if (observedSection) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      console.log("Visible:", entry.isIntersecting);
    }
  });

  observer.observe(observedSection);
}

//* Useful for visibility/lazy-loading patterns.


//* ------------------------------------------------------------
//* 82. CUSTOM EVENT
//* ------------------------------------------------------------

const todoAdded = new CustomEvent("todo:added", {
  detail: { id: 1, title: "Learn DOM" },
});

document.dispatchEvent(todoAdded);

document.addEventListener("todo:added", (event) => {
  console.log(event.detail);
});

//* CustomEvent lets application code communicate through DOM event mechanisms.


//* ------------------------------------------------------------
//* 83. DATA FLOW PATTERN
//* ------------------------------------------------------------

//* Recommended simple UI flow:
//*
//* User action
//*     -> event handler
//*     -> validate input
//*     -> update application state
//*     -> render/update DOM
//*
//* Avoid spreading business logic across dozens of unrelated event handlers.


//* ------------------------------------------------------------
//* 84. SMALL TODO APP ARCHITECTURE
//* ------------------------------------------------------------

const state = {
  todos: [],
};

function addTodo(titleText) {
  state.todos.push({
    id: crypto.randomUUID(),
    title: titleText,
    completed: false,
  });

  renderTodos();
}

function toggleTodo(id) {
  const todoItem = state.todos.find((todoItem) => todoItem.id === id);
  if (!todoItem) return;

  todoItem.completed = !todoItem.completed;
  renderTodos();
}

function renderTodos() {
  const container = document.querySelector("#todo-list");
  if (!container) return;

  const fragment = document.createDocumentFragment();

  for (const todoItem of state.todos) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const label = document.createElement("span");

    checkbox.type = "checkbox";
    checkbox.checked = todoItem.completed;
    checkbox.dataset.id = todoItem.id;
    label.textContent = todoItem.title;

    li.append(checkbox, label);
    fragment.append(li);
  }

  container.replaceChildren(fragment);
}

//* This separates state changes from DOM rendering.


//* ------------------------------------------------------------
//* 85. DEBUGGING CHECKLIST
//* ------------------------------------------------------------

//* 1. Is the script loaded?
//* 2. Is the selector correct?
//* 3. Is the returned element null?
//* 4. Is the script running before the DOM exists?
//* 5. Is the event listener attached?
//* 6. What are event.target and event.currentTarget?
//* 7. Is event propagation involved?
//* 8. Is preventDefault() needed?
//* 9. Is the element being replaced by innerHTML?
//* 10. Are you accidentally mutating a live collection?
//* 11. Is CSS hiding the element rather than DOM code failing?
//* 12. Inspect the Elements panel and Event Listeners panel in DevTools.


//* ------------------------------------------------------------
//* 86. OUTPUT / BEHAVIOR PREDICTION
//* ------------------------------------------------------------

const prediction = document.createElement("p");
prediction.textContent = "A";
prediction.append("B");
console.log(prediction.textContent);
//* Predict: AB


//* ------------------------------------------------------------
//* 87. OUTPUT / BEHAVIOR PREDICTION
//* ------------------------------------------------------------

const parent = document.createElement("div");
const child = document.createElement("span");
parent.append(child);

console.log(parent.children.length);
console.log(parent.childNodes.length);
//* Predict: 1 and 1 in this exact program.


//* ------------------------------------------------------------
//* 88. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1: Build a counter with + and - buttons.
//* Challenge 2: Build a dark/light theme toggle.
//* Challenge 3: Build a character counter for an input.
//* Challenge 4: Build a live search/filter list.
//* Challenge 5: Build a todo list with add/delete/complete.
//* Challenge 6: Build tabs using event delegation.
//* Challenge 7: Build an accordion.
//* Challenge 8: Build a modal.
//* Challenge 9: Build a form validator.
//* Challenge 10: Build a shopping-cart UI.
//* Challenge 11: Build a dynamic table from an array of objects.
//* Challenge 12: Build a dropdown menu with keyboard support.
//* Challenge 13: Build infinite-scroll-like loading using IntersectionObserver.
//* Challenge 14: Build a DOM inspector that displays tag names and attributes.
//* Challenge 15: Build a mini component renderer using createElement.


//* ------------------------------------------------------------
//* 89. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1: querySelector returns null.
//* Debug 2: click listener never runs.
//* Debug 3: form refreshes the page unexpectedly.
//* Debug 4: delegated click reads the wrong element.
//* Debug 5: removeEventListener does not work.
//* Debug 6: innerHTML destroys an input's state.
//* Debug 7: list items skip during deletion.
//* Debug 8: CSS class is added but appearance does not change.
//* Debug 9: script runs before required markup exists.
//* Debug 10: event fires twice because two listeners were attached.


//* ------------------------------------------------------------
//* 90. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is the DOM?
//* 2. What is document?
//* 3. querySelector vs querySelectorAll?
//* 4. textContent vs innerHTML?
//* 5. What is classList?
//* 6. Attribute vs DOM property?
//* 7. How do you create an element?
//* 8. append vs appendChild?
//* 9. children vs childNodes?
//* 10. What is event bubbling?
//* 11. What is event capturing?
//* 12. target vs currentTarget?
//* 13. What is event delegation?
//* 14. Why does removeEventListener need the same function reference?
//* 15. What does preventDefault do?
//* 16. What is DOMContentLoaded?
//* 17. defer vs async?
//* 18. What is a live HTMLCollection?
//* 19. What is DocumentFragment?
//* 20. What does MutationObserver do?
//* 21. How can DOM code create XSS vulnerabilities?
//* 22. How do you render an array of objects safely?
//* 23. How can excessive DOM work hurt performance?
//* 24. What is event delegation useful for?
//* 25. How would you debug a DOM event that does not fire?


//* ------------------------------------------------------------
//* 91. INTERVIEW QUESTIONS
//* ------------------------------------------------------------

//* Q1. Explain the DOM.
//* Q2. Is the DOM part of ECMAScript?
//* Q3. querySelector vs getElementById?
//* Q4. querySelectorAll returns what kind of collection?
//* Q5. What is event propagation?
//* Q6. Capturing vs bubbling?
//* Q7. target vs currentTarget?
//* Q8. Event delegation and its benefits?
//* Q9. preventDefault vs stopPropagation?
//* Q10. How do you prevent XSS when rendering user input?
//* Q11. textContent vs innerHTML?
//* Q12. Attribute vs property?
//* Q13. Live collection vs static NodeList?
//* Q14. Why can layout reads after DOM writes be expensive?
//* Q15. What does DocumentFragment do?
//* Q16. What does MutationObserver do?
//* Q17. What does IntersectionObserver do?
//* Q18. Why can replacing innerHTML remove event listeners?
//* Q19. Why is event delegation useful for dynamic elements?
//* Q20. defer vs async?


//* ------------------------------------------------------------
//* 92. MASTERY CHECKLIST
//* ------------------------------------------------------------

//* [ ] I can select elements.
//* [ ] I can traverse the DOM.
//* [ ] I can read/change text.
//* [ ] I can safely render user-controlled text.
//* [ ] I can manipulate classes and attributes.
//* [ ] I can create/remove/replace elements.
//* [ ] I understand nodes vs elements.
//* [ ] I understand properties vs attributes.
//* [ ] I can handle forms.
//* [ ] I can handle keyboard and pointer events.
//* [ ] I understand capture and bubbling.
//* [ ] I can use event delegation.
//* [ ] I understand DOMContentLoaded and script timing.
//* [ ] I can use DocumentFragment for batch rendering.
//* [ ] I can use MutationObserver and IntersectionObserver.
//* [ ] I can debug selectors and event problems.
//* [ ] I can build a small interactive application from state + DOM rendering.

//* ============================================================
//* FINAL RULE
//* ============================================================

//* Do not learn the DOM as a list of APIs only.
//* Think in this loop:
//*
//* SELECT -> READ -> DECIDE -> UPDATE -> LISTEN -> RENDER -> DEBUG
//*
//* Once this mental model is clear, DOM APIs become tools rather than memorized
//* magic methods.

//* END OF DOM
