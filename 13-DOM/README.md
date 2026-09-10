# 13 — Document Object Model (DOM)

> A deep, teaching-first chapter on the browser DOM: documents, nodes, elements, selectors, traversal, creation, insertion, attributes, classes, styles, events, forms, delegation, accessibility, performance, security, debugging, and real projects.

## Learning Goal

By the end of this chapter you should be able to inspect the DOM, select and traverse nodes, create and update UI safely, handle events correctly, build accessible forms and interactive interfaces, debug DOM problems, and explain how browser JavaScript turns data into a visible document.

## 1. What Is the DOM?

The **Document Object Model (DOM)** is a programming interface representing an HTML or XML document as objects connected in a tree structure.

## 2. Why Does the DOM Exist?

JavaScript needs a structured interface for reading and changing a document. The DOM provides objects, properties, methods, and events for interacting with the document.

## 3. HTML vs DOM

HTML is source markup. The DOM is the browser's in-memory representation of the parsed document. They are related, but changing the DOM does not necessarily rewrite the original HTML source file.

## 4. Browser Parsing

A simplified flow is:

```text
HTML bytes
   ↓
HTML parser
   ↓
DOM tree
   ↓
CSS/style processing
   ↓
Layout/paint/compositing
   ↓
Pixels
```

## 5. DOM Tree Mental Model

```text
Document
└── html
    ├── head
    └── body
        ├── header
        ├── main
        └── footer
```

## 6. Document Object

`document` represents the loaded document and provides APIs for finding, creating, and manipulating DOM nodes.

## 7. window vs document

In a normal browser page, `window` represents the browser's global object, while `document` represents the current DOM document.

## 8. document Is a DOM Interface

`document` is supplied by the browser environment. It is not part of core ECMAScript in the same way that `Array` or `Object` is.

## 9. Node

A **Node** is a general DOM object participating in the document tree. Elements, text nodes, comments, and the document itself are examples of node types.

## 10. Element

An **Element** is a DOM node representing an HTML/XML element such as `<div>`, `<button>`, or `<input>`.

## 11. Document Node

The document itself is a node and the root entry point for many DOM operations.

## 12. Text Node

Text inside an element is represented by a text node. Whitespace can also produce text nodes, which matters during traversal.

## 13. Comment Node

HTML comments such as `<!-- note -->` are represented as comment nodes.

## 14. Parent and Child

If node A directly contains node B in the DOM tree, A is B's parent and B is A's child.

## 15. Sibling

Nodes sharing the same parent are siblings. DOM APIs provide previous/next sibling relationships.

## 16. Descendant

A descendant is any node nested below another node at any depth.

## 17. Ancestor

An ancestor is any node above another node in the DOM tree.

## 18. childNodes

`element.childNodes` returns child nodes, including text and comment nodes.

## 19. children

`element.children` returns child elements only, excluding text and comment nodes.

## 20. Why childNodes and children Differ

Whitespace between HTML tags can become text nodes, so `childNodes` may contain more entries than `children`.

## 21. firstChild

`firstChild` returns the first child node, which may be a text node.

## 22. firstElementChild

`firstElementChild` returns the first child that is an element.

## 23. lastChild

`lastChild` returns the last child node, potentially including whitespace text.

## 24. lastElementChild

`lastElementChild` returns the last child element.

## 25. parentNode

`parentNode` returns the parent node or `null` when no parent exists.

## 26. parentElement

`parentElement` returns the parent element or `null` when the parent is not an element.

## 27. nextSibling

`nextSibling` returns the next node at the same tree level.

## 28. nextElementSibling

`nextElementSibling` skips non-element nodes and returns the next element sibling.

## 29. previousSibling

`previousSibling` returns the previous node sibling.

## 30. previousElementSibling

`previousElementSibling` returns the previous element sibling.

## 31. DOM Selectors

Selectors allow JavaScript to locate elements using IDs, classes, tags, attributes, and CSS selector syntax.

## 32. getElementById

`document.getElementById("app")` finds an element by its ID. Do not include `#` in the argument.

## 33. getElementById Example

```js
const app = document.getElementById("app");
console.log(app);
```

## 34. querySelector

`querySelector(selector)` returns the first element matching a CSS selector or `null` if no element matches.

## 35. querySelector ID

```js
const app = document.querySelector("#app");
```

Unlike `getElementById`, CSS selector syntax uses `#` for an ID.

## 36. querySelector Class

```js
const cards = document.querySelector(".card");
```

This returns only the first matching element.

## 37. querySelector Tag

```js
const heading = document.querySelector("h1");
```

## 38. querySelector Descendant

```js
const title = document.querySelector(".card h2");
```

## 39. querySelector Attribute

```js
const email = document.querySelector('input[type="email"]');
```

## 40. querySelectorAll

`querySelectorAll(selector)` returns a static `NodeList` containing all matching elements.

## 41. NodeList

A `NodeList` is a collection-like DOM object. A NodeList returned by `querySelectorAll()` is static, meaning later matching DOM changes do not automatically update that collection.

## 42. HTMLCollection

An `HTMLCollection` is a collection of elements. Some APIs return **live** HTMLCollections that update as the DOM changes.

## 43. getElementsByClassName

`getElementsByClassName()` returns a live `HTMLCollection` in standard browser DOM behavior.

## 44. getElementsByTagName

`getElementsByTagName()` also returns a live `HTMLCollection` in standard browser DOM behavior.

## 45. Selector Comparison

```text
getElementById        → one element
querySelector         → first CSS match
querySelectorAll      → static NodeList
getElementsByClassName→ live HTMLCollection
getElementsByTagName  → live HTMLCollection
```

## 46. CSS Selector Power

`querySelector` and `querySelectorAll` can use complex CSS selectors, making them useful for precise DOM selection.

## 47. Scoped Selection

```js
const card = document.querySelector(".card");
const button = card.querySelector("button");
```

The second query searches within `card` rather than the whole document.

## 48. Invalid Selector

Invalid CSS selector syntax can throw a `SyntaxError`. Validate dynamic selector construction carefully.

## 49. Missing Element

Selectors can return `null`. Always consider the possibility before accessing properties.

## 50. Optional Chaining With DOM

```js
const text = document.querySelector(".missing")?.textContent;
```

Optional chaining can safely handle an absent element when absence is acceptable.

## 51. matches

`element.matches(selector)` checks whether an element itself matches a CSS selector.

## 52. closest

`element.closest(selector)` searches the element and its ancestors for the nearest matching element.

## 53. closest Example

```js
const button = event.target.closest("button");
```

This is especially useful for event delegation.

## 54. contains

`parent.contains(node)` checks whether a node is the parent itself or a descendant of that parent.

## 55. Traversal Strategy

Use selectors when you know what you want to find. Use traversal APIs when the relationship between nodes is the important part of the algorithm.

## 56. Reading textContent

`textContent` gets or sets the text content of a node without interpreting the assigned string as HTML markup.

## 57. textContent and Safety

For untrusted plain text, `textContent` is generally safer than assigning that text through `innerHTML` because it does not parse HTML markup.

## 58. innerHTML

`innerHTML` represents the HTML markup contained inside an element.

```js
card.innerHTML = "<strong>Hello</strong>";
```

## 59. innerHTML Security Risk

Putting untrusted strings into `innerHTML` can create XSS vulnerabilities. Treat HTML injection as a security boundary.

## 60. outerHTML

`outerHTML` includes the element itself and its contents.

## 61. Setting outerHTML

Setting `element.outerHTML` replaces that element in its parent. Existing JavaScript references to the old element become detached references.

## 62. innerText

`innerText` reflects rendered text and can be affected by CSS/layout. It is different from the DOM-oriented `textContent` API.

## 63. textContent vs innerText

Use `textContent` when you need DOM text content. Use `innerText` when rendered-text behavior is specifically what you need.

## 64. Reading HTML Attributes

Attributes are markup-level name/value data associated with elements.

## 65. getAttribute

```js
const href = link.getAttribute("href");
```

It returns the attribute value or `null` if the attribute is absent.

## 66. setAttribute

```js
button.setAttribute("type", "button");
```

This creates or updates an attribute.

## 67. removeAttribute

```js
input.removeAttribute("disabled");
```

## 68. hasAttribute

```js
input.hasAttribute("required");
```

## 69. Attribute vs Property

An HTML attribute is part of an element's markup representation. A DOM property is an object-level value exposed by the element interface. They can reflect each other without being identical concepts.

## 70. id Property

```js
element.id = "main";
```

This is a convenient DOM property corresponding to the element's `id` attribute.

## 71. className

`element.className` can read or replace the element's class attribute value.

## 72. classList

`element.classList` provides a token-oriented API for manipulating CSS classes.

## 73. classList.add

```js
element.classList.add("active");
```

## 74. classList.remove

```js
element.classList.remove("active");
```

## 75. classList.toggle

```js
element.classList.toggle("active");
```

## 76. classList.contains

```js
element.classList.contains("active");
```

## 77. classList.replace

```js
element.classList.replace("old", "new");
```

## 78. Dataset

`element.dataset` exposes `data-*` attributes through a DOMStringMap.

## 79. data-* Example

```html
<button data-id="42" data-role="admin">Edit</button>
```

```js
button.dataset.id; // "42"
```

## 80. Dataset Values Are Strings

`dataset` values are strings. Convert them explicitly when the application needs numbers, booleans, or structured data.

## 81. Creating an Element

`document.createElement("div")` creates an element object but does **not** insert it into the document.

## 82. createElement Example

```js
const li = document.createElement("li");
li.textContent = "Learn DOM";
```

## 83. Creating Text Nodes

`document.createTextNode("Hello")` explicitly creates a text node. In many cases, assigning `textContent` is simpler.

## 84. append

`parent.append(node, "text")` can append nodes and strings and can append multiple arguments.

## 85. appendChild

`parent.appendChild(node)` appends one Node. It expects a Node rather than a raw string.

## 86. append vs appendChild

```text
append()     → nodes + strings, multiple values
appendChild()→ one Node
```

## 87. prepend

`prepend()` inserts nodes or strings at the beginning of a parent.

## 88. before

`element.before(...)` inserts content immediately before the element.

## 89. after

`element.after(...)` inserts content immediately after the element.

## 90. replaceWith

`element.replaceWith(...)` replaces an element with supplied nodes or strings.

## 91. remove

`element.remove()` removes the element from its parent tree.

## 92. removeChild

`parent.removeChild(child)` removes a specified child node from its parent.

## 93. Moving Nodes

Appending an existing node moves it rather than cloning it.

```js
const item = document.querySelector(".item");
list.append(item);
```

## 94. cloneNode

`node.cloneNode(true)` can clone a node and its descendants. Event listeners added with `addEventListener` are not copied by cloning.

## 95. DocumentFragment

A `DocumentFragment` is a lightweight container useful for assembling multiple nodes before inserting them into the document.

## 96. Fragment Example

```js
const fragment = document.createDocumentFragment();
for (const name of ["A", "B", "C"]) {
  const li = document.createElement("li");
  li.textContent = name;
  fragment.append(li);
}
list.append(fragment);
```

## 97. DOM Insertion Flow

```text
Create node
   ↓
Set data/properties
   ↓
Attach children
   ↓
Insert into document
   ↓
Browser may update rendering
```

## 98. Creating Lists Safely

For untrusted item names, create elements and assign `textContent` rather than interpolating untrusted values into `innerHTML`.

## 99. Template Element

The `<template>` element stores inert DOM content that can be cloned into the document later.

## 100. DocumentFragment vs Template

Fragments are useful for programmatic assembly. Templates are useful when reusable HTML structure is naturally represented as markup.

## 101. Style Property

`element.style` represents inline CSS declarations on an element.

## 102. Setting Inline Style

```js
element.style.display = "none";
```

## 103. camelCase CSS

JavaScript style properties commonly use camelCase, such as `backgroundColor` instead of `background-color`.

## 104. CSS Custom Properties

```js
element.style.setProperty("--accent", "orange");
```

## 105. Reading Computed Style

`getComputedStyle(element)` returns the resolved CSS style information used for the element.

## 106. Inline vs Class-Based Styling

For reusable UI states, CSS classes are usually clearer than creating many inline declarations from JavaScript. Use inline styles when dynamic values genuinely require them.

## 107. Event

An event represents something observable happening in the browser environment, such as a click, keyboard input, pointer action, or form submission.

## 108. Event Listener

`addEventListener(type, listener)` registers a function to run when the specified event occurs.

## 109. Basic Click Event

```js
button.addEventListener("click", () => {
  console.log("clicked");
});
```

## 110. Event Object

The browser supplies an event object containing information about the event and its context.

## 111. Event Type

`event.type` identifies the event type, such as `click`, `input`, or `submit`.

## 112. Event Target

`event.target` is the object on which the event originated. It may be a descendant of the element where the listener is registered.

## 113. currentTarget

`event.currentTarget` is the object whose listener is currently executing. It is often different from `event.target` during event bubbling.

## 114. target vs currentTarget

```text
User clicks <span>
      ↓
event.target        → span
listener on button
      ↓
event.currentTarget → button
```

## 115. Event Bubbling

Many DOM events propagate from the originating target upward through ancestor elements. This is called bubbling.

## 116. Event Capturing

Event propagation can also travel from ancestors toward the target during the capture phase before reaching the target phase.

## 117. Event Propagation Phases

```text
Capture:  document → ancestors → target
Target:   target
Bubble:   target → ancestors → document
```

## 118. Capture Option

```js
parent.addEventListener("click", handler, { capture: true });
```

This registers the listener for the capture phase.

## 119. Bubbling Default

For ordinary `addEventListener` calls, capture is `false` by default, so the listener participates in the bubbling phase when the event bubbles.

## 120. stopPropagation

`event.stopPropagation()` prevents further propagation to other nodes in the event path. It does not automatically stop every listener on the current node.

## 121. stopImmediatePropagation

`stopImmediatePropagation()` prevents later listeners from being invoked for the event and also stops further propagation.

## 122. preventDefault

`event.preventDefault()` asks the browser not to perform the event's default action when the event is cancelable.

## 123. preventDefault Is Not stopPropagation

`preventDefault()` controls the default browser action. `stopPropagation()` controls propagation. They solve different problems.

## 124. Form Submit

A form's `submit` event can be intercepted to implement client-side handling.

```js
form.addEventListener("submit", event => {
  event.preventDefault();
});
```

## 125. Event Listener Cleanup

`removeEventListener()` removes a listener only when the event type, callback identity, and relevant capture setting match the registration.

## 126. Named Listener

```js
function handleClick() {
  console.log("click");
}
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);
```

## 127. Anonymous Listener Cleanup Trap

Creating a new anonymous function for `removeEventListener()` does not match the original callback reference.

## 128. once Option

```js
button.addEventListener("click", handler, { once: true });
```

The browser automatically removes the listener after its first invocation.

## 129. passive Option

A passive listener tells the browser the handler will not call `preventDefault()`. This can help certain scrolling interactions.

## 130. Event Delegation

Event delegation attaches a listener to a common ancestor and uses bubbling to handle events from many descendants.

## 131. Delegation Example

```js
list.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  console.log(button.dataset.action);
});
```

## 132. Why Delegation Helps

Delegation can reduce the number of listeners and automatically handle dynamically inserted matching descendants.

## 133. Delegation Boundary

When using `closest()`, verify that the matched element belongs to the intended container. `container.contains(candidate)` can protect against matching an unrelated ancestor.

## 134. Event Listener on Dynamic Elements

If elements are created after initial page load, delegation can avoid repeatedly registering individual listeners for every new element.

## 135. Keyboard Events

`keydown` fires when a key is pressed. `keyup` fires when it is released. `keypress` is legacy and should generally not be the default choice for new code.

## 136. Keyboard Event Properties

Useful properties include `key`, `code`, modifier information, and repeat state. Prefer semantic key handling rather than relying only on numeric key codes.

## 137. Pointer Events

Pointer Events provide a unified event model for mouse, touch, and pen-like pointer input.

## 138. click vs pointerdown

Use `click` for activation semantics where appropriate. Use pointer events when you need lower-level pointer interaction across input types.

## 139. Input Event

The `input` event fires when the value of an editable control changes through user interaction or relevant value updates.

## 140. Change Event

The `change` event is useful when a control's committed value changes according to that control's behavior. Its timing differs from `input`.

## 141. Focus Event

`focus` occurs when an element receives focus. `focus` does not bubble in the ordinary event model.

## 142. Focusin

`focusin` is similar to `focus` but participates in bubbling, making it useful for delegated focus handling.

## 143. Blur Event

`blur` occurs when an element loses focus and does not bubble in the ordinary event model.

## 144. Focusout

`focusout` participates in bubbling and can be useful for delegated focus-loss handling.

## 145. Forms

The DOM provides APIs for reading controls, responding to submission, validating values, and constructing accessible form interactions.

## 146. Input Value

```js
const value = input.value;
```

Form control values are commonly strings unless the API specifies another type.

## 147. Checkbox Checked

```js
checkbox.checked;
```

This is a boolean property representing current checked state.

## 148. Select Value

```js
select.value;
```

For a normal single-select control, this gives the selected option value.

## 149. FormData

`FormData` can collect form control values into a structured key/value representation suitable for submission or processing.

## 150. FormData Example

```js
const data = new FormData(form);
console.log(data.get("email"));
```

## 151. Form Validation

HTML provides built-in constraints such as `required`, `minlength`, `maxlength`, `min`, `max`, `pattern`, and type-specific validation.

## 152. checkValidity

`form.checkValidity()` or `control.checkValidity()` checks whether constraints are currently satisfied.

## 153. reportValidity

`reportValidity()` checks validity and can trigger the browser's native validation UI when invalid.

## 154. Constraint Validation

Client-side validation improves user experience but is not a security boundary. The server must validate untrusted input independently.

## 155. DOMContentLoaded

`DOMContentLoaded` fires after the document has been parsed and the DOM is constructed, without waiting for all external resources such as images to finish loading.

## 156. load Event

The `load` event waits for the relevant page resources to finish loading according to browser loading behavior.

## 157. Script Placement

Putting a script at the end of `<body>` can ensure preceding DOM elements exist before the script executes. Modern module scripts and `defer` provide other loading strategies.

## 158. defer

A classic script with `defer` is downloaded without blocking HTML parsing and executes after parsing, before `DOMContentLoaded`, subject to the relevant loading rules.

## 159. async

A classic script with `async` executes as soon as it is available, potentially before parsing has completed. It is appropriate for independent scripts rather than scripts requiring a specific DOM/dependency order.

## 160. Module Scripts

Browser module scripts are deferred by default and have module scope. They can use `import` and `export`.

## 161. Creating a DOM App

A useful architecture is:

```text
State
  ↓
Render
  ↓
DOM
  ↓
User Event
  ↓
Event Handler
  ↓
State Update
  ↓
Render
```

## 162. State vs DOM

The DOM is a rendered document representation. Application state is the data your application reasons about. Keeping these concepts distinct makes larger interfaces easier to maintain.

## 163. Render Function

A render function transforms current state into the required DOM representation or DOM updates.

## 164. Avoid Scattered DOM Writes

When many unrelated functions mutate the same elements, UI state becomes difficult to reason about. Centralize related rendering responsibilities where practical.

## 165. Event Handler Responsibility

Event handlers should translate user actions into application operations rather than becoming giant functions containing all business logic.

## 166. Data Attributes for Behavior

`data-*` attributes can declaratively identify actions, IDs, or roles used by delegated event handlers.

## 167. DOM References

Store references when repeated access is useful, but remember that removed or replaced nodes can make old references detached from the current document.

## 168. Detached Nodes

A detached node is still a JavaScript object even after removal from the document. Retaining unnecessary references can keep memory alive longer than intended.

## 169. Memory Leak Pattern

Long-lived objects such as global arrays or application controllers should not retain references to obsolete DOM trees unnecessarily.

## 170. MutationObserver

`MutationObserver` watches DOM changes asynchronously and can notify code when configured mutations occur.

## 171. MutationObserver Use Cases

Useful cases include integrating with third-party DOM changes, custom elements, or observing specific dynamic containers. Avoid using it as a substitute for clear application state architecture.

## 172. ResizeObserver

`ResizeObserver` observes changes to an element's size without requiring constant polling.

## 173. IntersectionObserver

`IntersectionObserver` reports when elements intersect a root or viewport threshold and is useful for lazy loading, visibility tracking, and infinite scrolling.

## 174. Selection and Performance

Repeated complex global queries can be avoided by keeping stable references or scoping queries to smaller containers when that improves clarity and measurable performance.

## 175. Layout

Layout determines the geometry of rendered elements. Reading certain layout-related properties after writes can contribute to forced synchronous layout when the browser must calculate up-to-date geometry.

## 176. Reflow/Style/Layout Work

Changing DOM or style can invalidate rendering information. The browser may need style recalculation, layout, paint, and compositing depending on what changed.

## 177. Layout Thrashing

Repeatedly alternating DOM writes and layout reads in a loop can force expensive synchronous layout calculations.

```js
for (const box of boxes) {
  box.style.width = "100px";
  console.log(box.offsetWidth);
}
```

## 178. Better DOM Batching

Group writes together and reads together where practical, use fragments for bulk construction, and measure real bottlenecks before optimizing.

## 179. DocumentFragment Performance

Fragments can simplify bulk insertion and reduce repeated parent insertion operations, although modern browsers already optimize many DOM operations. Use them for clarity and appropriate batching rather than blindly assuming huge gains.

## 180. requestAnimationFrame

Use `requestAnimationFrame()` for visual updates synchronized with browser rendering, rather than using timers as a generic animation loop.

## 181. DOM Security Boundary

Treat HTML, attributes, URLs, and event-handler inputs as potentially dangerous when values originate outside trusted code.

## 182. XSS

Cross-site scripting can occur when attacker-controlled content becomes executable markup or script in a page's origin.

## 183. textContent Defense

For plain untrusted text, prefer `textContent` over `innerHTML` to avoid interpreting the value as markup.

## 184. Safe HTML Construction

If HTML markup is genuinely required, use trusted templates or a well-maintained sanitization strategy appropriate to the application's threat model.

## 185. Attribute Injection

Do not assume all attributes are harmless. Dynamic URLs, event-related attributes, and other browser-interpreted values require careful validation and safe APIs.

## 186. Avoid Inline Event Handlers

Prefer `addEventListener()` instead of HTML attributes such as `onclick="..."` for separation of concerns, maintainability, and security policy compatibility.

## 187. URL Validation

If user-controlled values become navigation URLs, validate and constrain allowed schemes and destinations. Never treat a URL string as harmless merely because it is displayed in the UI.

## 188. DOM Clobbering Awareness

Certain HTML names and IDs can interact unexpectedly with legacy DOM/global exposure behavior. Avoid relying on implicit globals and use explicit references.

## 189. Accessibility

DOM manipulation must preserve semantic HTML, labels, keyboard access, focus behavior, and appropriate ARIA usage.

## 190. Semantic HTML

Prefer `<button>`, `<a>`, `<label>`, `<nav>`, `<main>`, and other semantic elements when they represent the intended behavior instead of replacing everything with `<div>`.

## 191. Button vs Div

A `<button>` already provides keyboard and interaction semantics. A `<div>` requires substantial additional behavior to imitate a button and is usually the wrong default.

## 192. Labeling Inputs

Every form control should have an accessible label, usually through `<label for="...">` and a matching control `id`, or an equivalent semantic relationship.

## 193. Focus Management

When JavaScript opens dialogs, changes views, or removes focused elements, intentionally manage focus so keyboard and assistive-technology users are not stranded.

## 194. ARIA Rule

Use native HTML semantics first. ARIA should supplement semantics where necessary, not replace correct native elements by default.

## 195. Live Regions

ARIA live regions can announce dynamic content changes to assistive technologies. Use them carefully and avoid flooding users with unnecessary announcements.

## 196. Keyboard Accessibility

Every interactive feature should be usable through an appropriate keyboard interaction model. Do not make mouse-only UI unless the interaction is inherently pointer-specific.

## 197. Debugging: null

If `querySelector()` returns `null`, verify the selector, script timing, document, and whether the element actually exists when the query executes.

## 198. Debugging: Wrong Selector

Check CSS selector syntax. Remember `getElementById("id")` takes `id`, while `querySelector("#id")` takes CSS selector syntax.

## 199. Debugging: Wrong Node Type

If `firstChild` behaves unexpectedly, inspect whether whitespace text nodes exist. Use `firstElementChild` when you specifically need an element.

## 200. Debugging: Event Target

Log both `event.target` and `event.currentTarget` when delegated or bubbling events produce confusing results.

## 201. Debugging: Listener Not Removed

Confirm the same function reference and capture setting are supplied to `removeEventListener()`.

## 202. Debugging: DOM Not Updating

Verify that you are changing the currently attached node, that your code executes, and that CSS is not hiding or overriding the visual result.

## 203. Debugging: innerHTML Replaces Listeners

Replacing an element's `innerHTML` reconstructs descendant nodes, so listeners attached directly to replaced descendants can disappear.

## 204. Debugging: Detached Reference

If an element exists in a variable but not in the document, inspect `element.isConnected` to determine whether it is currently connected to a document tree.

## 205. Debugging: Form Reload

If a form causes an unexpected page navigation, inspect whether the `submit` handler runs and whether `preventDefault()` is appropriate.

## 206. Wrong: getElementById With #

```js
document.getElementById("#app"); // wrong
```

The correct argument is `"app"`.

## 207. Correct: getElementById

```js
document.getElementById("app");
```

## 208. Wrong: <= length

```js
for (let i = 0; i <= items.length; i++) {
  console.log(items[i]);
}
```

The last iteration reads an out-of-range index. Use `i < items.length`.

## 209. Correct Array DOM Loop

```js
for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}
```

## 210. Wrong: innerHTML for User Text

```js
title.innerHTML = userName;
```

This can interpret attacker-controlled markup.

## 211. Correct: textContent

```js
title.textContent = userName;
```

## 212. Wrong: Anonymous Removal

```js
button.addEventListener("click", () => console.log("x"));
button.removeEventListener("click", () => console.log("x"));
```

These are different function objects.

## 213. Correct: Same Reference

```js
function handleClick() {
  console.log("x");
}
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);
```

## 214. Wrong: appendChild String

```js
list.appendChild("Hello"); // TypeError
```

## 215. Correct: append String

```js
list.append("Hello");
```

## 216. Output Prediction: target

A button contains a `<span>`. A listener is on the button and the user clicks the span. `event.target` is the span; `event.currentTarget` is the button.

## 217. Output Prediction: children

If an element contains whitespace, a text node, and a `<span>`, `children.length` counts only the `<span>`, while `childNodes.length` can include the whitespace/text nodes.

## 218. Output Prediction: createElement

```js
const div = document.createElement("div");
console.log(div.isConnected);
```

**Answer:** `false` until the node is inserted into a connected document tree.

## 219. Output Prediction: classList

```js
div.classList.add("active");
console.log(div.classList.contains("active"));
```

**Answer:** `true`.

## 220. Browser Example: Counter

```js
const button = document.querySelector("#increment");
const output = document.querySelector("#count");
let count = 0;

button.addEventListener("click", () => {
  count += 1;
  output.textContent = String(count);
});
```

## 221. Browser Example: Todo Item

```js
function createTodo(text) {
  const li = document.createElement("li");
  li.textContent = text;
  return li;
}
```

The function creates a safe DOM node without inserting untrusted markup.

## 222. Browser Example: Delegated Todo Actions

```js
list.addEventListener("click", event => {
  const removeButton = event.target.closest("[data-remove]");
  if (!removeButton || !list.contains(removeButton)) return;
  removeButton.closest("li")?.remove();
});
```

## 223. Browser Example: Theme Toggle

```js
themeButton.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});
```

## 224. Browser Example: Modal

A modal should control visibility, manage focus, support keyboard interaction such as Escape where appropriate, and restore focus when closed.

## 225. Browser Example: Form

```js
form.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  console.log(Object.fromEntries(data));
});
```

## 226. Browser Example: Dynamic Search

Use `input` events for live filtering, debounce expensive work when appropriate, and render results with safe DOM APIs.

## 227. Browser Example: Event Delegation

A table can have one click listener on `<tbody>` and use `closest("button")` to identify which row action was triggered.

## 228. Browser Example: IntersectionObserver

Use `IntersectionObserver` to start loading an image when it approaches the viewport rather than eagerly loading every image.

## 229. Browser Example: MutationObserver

Observe a controlled container when integrating with an external library that inserts nodes you need to react to.

## 230. Browser Example: ResizeObserver

Observe a component's size and update layout-related state without continuously polling `getBoundingClientRect()`.

## 231. Mini Project: Counter

Build increment, decrement, reset, keyboard support, disabled states, and accessible output. Keep state separate from DOM rendering.

## 232. Mini Project: Todo App

Build add, complete, delete, filter, empty state, event delegation, local persistence, and accessible labels.

## 233. Mini Project: Quiz App

Build question rendering, answer selection, explanation display, score state, next-question flow, and keyboard-accessible controls.

## 234. Mini Project: Modal System

Build open/close methods, Escape handling, backdrop behavior, focus management, and cleanup.

## 235. Mini Project: Tabs

Build tab buttons, active state, panels, keyboard navigation, semantic relationships, and URL/state synchronization.

## 236. Mini Project: Accordion

Build expandable sections with buttons, `aria-expanded`, controlled panel visibility, and keyboard support.

## 237. Mini Project: Dropdown

Build click/keyboard behavior, outside-click handling, focus management, and safe dynamic options.

## 238. Intermediate Project: Expense Tracker

Build form validation, transactions, totals, filters, dynamic rendering, event delegation, and persistent state.

## 239. Intermediate Project: Notes App

Build create/edit/delete/search/filter, autosave, keyboard shortcuts, safe rendering, and empty/loading/error states.

## 240. Advanced Project: Component System

Build a small DOM component system with state, rendering, event binding, cleanup, and predictable ownership of DOM nodes.

## 241. Advanced Project: Virtualized List Concept

Render only the visible portion of a very large list. Study measurement, scrolling, item recycling, and accessibility tradeoffs.

## 242. Advanced Project: Accessible Form Engine

Build reusable validation rules, field messages, summary errors, focus-to-error behavior, and submission state.

## 243. Practice: Beginner

1. Select an element by ID.
2. Change its text.
3. Toggle a class.
4. Create a button.
5. Append a list item.
6. Remove a list item.
7. Read an input value.
8. Handle a click.
9. Handle form submission.
10. Explain `target` vs `currentTarget`.

## 244. Practice: Intermediate

1. Build delegated list actions.
2. Implement tabs.
3. Implement a modal.
4. Build live search.
5. Use `FormData`.
6. Use a `DocumentFragment`.
7. Implement outside-click handling.
8. Implement keyboard navigation.
9. Debug a detached DOM reference.
10. Explain live vs static collections.

## 245. Practice: Advanced

1. Build a component abstraction.
2. Implement a small state/render architecture.
3. Measure DOM performance.
4. Avoid layout thrashing.
5. Use observers appropriately.
6. Design an accessible modal.
7. Design a delegated event system.
8. Build safe HTML rendering.
9. Analyze a DOM memory leak.
10. Refactor a large DOM script into modules.

## 246. Interview: DOM

**Question:** What is the DOM?

**Answer target:** Explain the browser's object representation of the parsed document and its tree relationships.

## 247. Interview: Node vs Element

**Question:** What is the difference?

**Answer target:** Explain that elements are a type of node, while nodes also include text, comments, and document nodes.

## 248. Interview: querySelector vs querySelectorAll

**Answer:** `querySelector()` returns the first matching element or `null`; `querySelectorAll()` returns a static NodeList of all matching elements.

## 249. Interview: HTMLCollection

**Question:** What is special about some HTMLCollections?

**Answer:** APIs such as `getElementsByClassName()` and `getElementsByTagName()` return live HTMLCollections that update as the DOM changes.

## 250. Interview: innerHTML vs textContent

**Answer:** `innerHTML` parses/represents markup; `textContent` handles text content without interpreting assigned text as HTML. Untrusted plain text should generally use `textContent`.

## 251. Interview: createElement

**Question:** Does `createElement()` insert the element?

**Answer:** No. It creates the element object; you must attach it to the document tree.

## 252. Interview: append vs appendChild

**Answer:** `append()` accepts nodes and strings and multiple arguments; `appendChild()` expects a Node and appends one child.

## 253. Interview: Event Bubbling

**Question:** What is event bubbling?

**Answer target:** Explain propagation from the target through ancestor nodes during the bubble phase.

## 254. Interview: target vs currentTarget

**Answer:** `target` is where the event originated; `currentTarget` is the object whose listener is currently running.

## 255. Interview: preventDefault

**Question:** What does it do?

**Answer:** It prevents the browser's default action when the event is cancelable. It does not stop propagation.

## 256. Interview: stopPropagation

**Answer:** It stops further propagation through the event path but is different from preventing the browser's default action.

## 257. Interview: Delegation

**Question:** Why use event delegation?

**Answer target:** Explain bubbling, fewer listeners, and handling dynamically created descendants.

## 258. Interview: DOMContentLoaded

**Answer:** It fires after the document has been parsed into the DOM without waiting for all page resources such as images to finish loading.

## 259. Interview: defer vs async

**Answer target:** Explain that deferred classic scripts wait for parsing completion and preserve document order, while async scripts execute when ready and do not provide that same dependency ordering.

## 260. Interview: XSS

**Question:** How can DOM code create XSS?

**Answer target:** Explain unsafe interpretation of attacker-controlled content as HTML/script and safer text handling with `textContent` plus appropriate sanitization/trusted markup strategies.

## 261. Teach-Back: DOM Tree

Draw an HTML document as a tree and identify document, element, text, parent, child, sibling, ancestor, and descendant.

## 262. Teach-Back: Selectors

Explain `getElementById`, `querySelector`, `querySelectorAll`, live HTMLCollections, and static NodeLists with examples.

## 263. Teach-Back: Create and Insert

Explain `createElement()` → configure → append, and why creating an element does not automatically put it on the page.

## 264. Teach-Back: Events

Draw capture → target → bubble and explain `target`, `currentTarget`, `preventDefault()`, and `stopPropagation()`.

## 265. Teach-Back: Delegation

Build a list with dynamically created buttons and explain why one parent listener can handle all of them.

## 266. Teach-Back: Security

Explain why `textContent` is preferred for untrusted plain text and why `innerHTML` can be dangerous with attacker-controlled input.

## 267. Teach-Back: Accessibility

Explain why a native `<button>` is preferable to a clickable `<div>` and how labels, focus, keyboard support, and semantics affect DOM design.

## 268. Teach-Back: Performance

Explain DOM batching, layout thrashing, observers, and why performance decisions should be measured rather than based on folklore.

## 269. Mastery: DOM Fundamentals

- [ ] I can explain the DOM tree.
- [ ] I can distinguish Node and Element.
- [ ] I understand parent/child/sibling relationships.

## 270. Mastery: Selection

- [ ] I can use `getElementById()` correctly.
- [ ] I can write CSS selectors.
- [ ] I understand static NodeList vs live HTMLCollection.

## 271. Mastery: Manipulation

- [ ] I can create and insert elements.
- [ ] I can update text safely.
- [ ] I can manipulate classes and attributes.
- [ ] I understand node moving and cloning.

## 272. Mastery: Traversal

- [ ] I can use `children` vs `childNodes`.
- [ ] I understand element vs node traversal.
- [ ] I can use `closest`, `matches`, and `contains`.

## 273. Mastery: Events

- [ ] I understand event propagation.
- [ ] I can distinguish `target` and `currentTarget`.
- [ ] I can use `preventDefault()` correctly.
- [ ] I can clean up listeners.

## 274. Mastery: Event Delegation

- [ ] I can implement delegated actions.
- [ ] I can safely constrain `closest()` matches.
- [ ] I understand why delegation works through bubbling.

## 275. Mastery: Forms

- [ ] I can read control values.
- [ ] I can use `FormData`.
- [ ] I understand native constraint validation.
- [ ] I know client validation is not a server security boundary.

## 276. Mastery: Security

- [ ] I understand DOM-based XSS.
- [ ] I know when `textContent` is safer.
- [ ] I treat dynamic HTML and URLs as security-sensitive.

## 277. Mastery: Accessibility

- [ ] I use semantic HTML.
- [ ] I provide labels and keyboard support.
- [ ] I understand focus management.
- [ ] I use ARIA only when appropriate.

## 278. Mastery: Performance

- [ ] I understand layout/style/paint at a high level.
- [ ] I can identify layout thrashing.
- [ ] I know when observers or `requestAnimationFrame()` are useful.

## 279. Mastery: Architecture

- [ ] I can separate application state from DOM rendering.
- [ ] I can keep event handlers focused.
- [ ] I can structure a DOM application into maintainable modules.

# Final DOM Mental Model

```text
HTML Source
    ↓
Browser Parser
    ↓
DOM Tree
    │
    ├── Select
    │    ├── getElementById
    │    ├── querySelector
    │    └── querySelectorAll
    │
    ├── Traverse
    │    ├── parent/child
    │    ├── siblings
    │    └── closest/matches
    │
    ├── Manipulate
    │    ├── textContent
    │    ├── attributes
    │    ├── classList
    │    └── create/append/remove
    │
    └── Events
         ├── capture
         ├── target
         ├── bubble
         └── delegation
              ↓
        State / Application Logic
              ↓
           DOM Updates
              ↓
      Style → Layout → Paint
```

# Final DOM Challenge

Build a **production-style Todo + Notes Dashboard** using vanilla JavaScript and the DOM.

Requirements:

1. Render all UI through DOM APIs.
2. Keep application state separate from DOM rendering.
3. Use event delegation for dynamic list actions.
4. Use `textContent` for untrusted plain text.
5. Implement search, filters, sorting, editing, deletion, pinning, and empty states.
6. Build an accessible modal for editing.
7. Implement keyboard navigation where appropriate.
8. Validate forms on the client and explain why the server must still validate data.
9. Use `localStorage` only for serialized data and understand its string-based storage model.
10. Add loading, success, and error UI states.
11. Avoid unnecessary layout thrashing.
12. Use `DocumentFragment` where it improves rendering clarity.
13. Explain every event propagation path.
14. Identify and fix one intentional DOM memory-retention bug.
15. Perform an XSS review of every dynamic rendering path.
16. Test the application with keyboard-only interaction.
17. Test missing selectors and empty data.
18. Refactor the code into modules after the first working version.
19. Measure at least one real performance scenario.
20. Teach the complete DOM mental model to another beginner without opening your notes.

**Mastery standard:** You are not finished when you can change `innerHTML`. You are finished when you understand **the DOM as a tree, events as propagation, rendering as a browser pipeline, and DOM manipulation as a state-to-interface problem with accessibility, security, and performance constraints.**
