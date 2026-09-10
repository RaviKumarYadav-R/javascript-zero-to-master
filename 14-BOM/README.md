# 14 — Browser Object Model (BOM)

> A deep, teaching-first chapter about the browser environment around JavaScript: `window`, navigation, history, location, screen, viewport, storage, timers, dialogs, browser events, networking-adjacent browser APIs, permissions, online/offline state, media queries, observers, security, performance, debugging, and production patterns.

## Learning Goal

By the end of this chapter you should understand the **Browser Object Model (BOM)** as the collection of browser-provided interfaces around the document and JavaScript runtime. You should be able to explain `window`, use navigation APIs safely, work with storage and timers, react to browser lifecycle events, understand viewport/screen differences, and choose appropriate browser APIs without confusing BOM, DOM, and ECMAScript.

## 1. What Is the BOM?

The **Browser Object Model** is a commonly used term for browser-provided objects and APIs that let JavaScript interact with the browser environment beyond the document tree itself.

## 2. BOM Is Not an ECMAScript Standard

Unlike core JavaScript language features such as `Array`, `Promise`, or `Map`, BOM APIs are supplied by the host environment. Browser specifications define these APIs rather than ECMAScript itself.

## 3. BOM vs DOM

```text
Browser Environment
├── JavaScript engine / ECMAScript
├── BOM-like browser APIs
│   ├── window
│   ├── location
│   ├── history
│   ├── navigator
│   ├── screen
│   └── storage
└── DOM
    └── document tree
```

## 4. ECMAScript vs Browser APIs

ECMAScript defines the language and standard built-ins. The browser adds host APIs such as `window`, `document`, `fetch`, storage, observers, and many event sources.

## 5. The window Object

In a typical browser page, `window` represents the top-level browsing context's Window object and exposes many browser APIs.

## 6. Global Object Mental Model

Browser JavaScript has a global environment associated with the Window. `globalThis` provides a standard way to access the global object across JavaScript environments.

## 7. window and globalThis

In a normal browser window, `globalThis` and `window` refer to the same global object.

## 8. window.document

`window.document` references the current document, and in a normal page `window.document === document` is `true`.

## 9. Window Is Not the DOM

`window` is the browser window/global environment object. `document` is the DOM document. They are related but represent different things.

## 10. Window Properties

Browser environments expose many properties through `window`, including viewport dimensions, location, history, storage, timers, and event-related APIs.

## 11. Window Methods

Many familiar browser functions can be called as `window.setTimeout()`, `window.alert()`, or `window.requestAnimationFrame()`.

## 12. Global Name Lookup

Some Window properties are exposed as global names in classic browser scripts. Do not rely on this implicit behavior; explicit references are easier to understand and safer in larger applications.

## 13. Window Events

The Window is an event target and can receive events such as `resize`, `scroll`, `online`, `offline`, `load`, and lifecycle-related events.

## 14. resize Event

The `resize` event can notify code that the viewport or relevant window dimensions changed.

## 15. resize Example

```js
window.addEventListener("resize", () => {
  console.log(window.innerWidth);
});
```

## 16. Do Not Overuse resize

A resize handler can fire frequently. Expensive work should be avoided or scheduled/throttled appropriately.

## 17. scroll Event

The `scroll` event can fire frequently while a document or scrolling container moves. Avoid doing heavy synchronous work for every event.

## 18. Scroll Performance

For scroll-driven UI, consider CSS features, `IntersectionObserver`, passive listeners where appropriate, or scheduled work rather than repeatedly forcing layout calculations.

## 19. Visual Viewport

Modern browsers can expose the `VisualViewport` API, which helps account for the portion of the page currently visible, especially useful with mobile browser UI and virtual keyboards.

## 20. innerWidth

`window.innerWidth` represents the viewport width in CSS pixels for the Window's layout viewport in common browser usage.

## 21. innerHeight

`window.innerHeight` represents the viewport height in CSS pixels for the Window's layout viewport in common browser usage.

## 22. Viewport vs Screen

The viewport is the browser content area available to the page. The screen represents the user's display device. They are not interchangeable measurements.

## 23. screen.width

`screen.width` describes the screen's width in CSS pixels according to the browser's screen interface. It is not the same thing as viewport width.

## 24. screen.height

`screen.height` describes the screen's height in CSS pixels according to the browser's screen interface.

## 25. Why innerWidth and screen.width Differ

A browser window may occupy only part of the physical/display screen, so the page viewport can be smaller than the screen dimensions.

## 26. devicePixelRatio

`window.devicePixelRatio` relates CSS pixels to device pixels for the current display context. It can affect canvas rendering and high-resolution graphics.

## 27. CSS Pixels vs Device Pixels

CSS pixels are logical units used by web layout. Device pixels are physical display pixels. One CSS pixel does not necessarily equal one physical pixel.

## 28. Orientation

`screen.orientation` can expose information about the display's current orientation where supported.

## 29. matchMedia

`window.matchMedia()` evaluates a CSS media query from JavaScript and returns a `MediaQueryList`.

## 30. matchMedia Example

```js
const mobile = window.matchMedia("(max-width: 768px)");
console.log(mobile.matches);
```

## 31. MediaQueryList Changes

A `MediaQueryList` can notify JavaScript when the query's match state changes.

## 32. matchMedia Listener

```js
const query = matchMedia("(prefers-color-scheme: dark)");
query.addEventListener("change", event => {
  console.log(event.matches);
});
```

## 33. prefers-color-scheme

The media feature can expose a user's preferred light/dark color scheme. CSS should normally handle visual theming, while JavaScript should respond only when application logic needs the information.

## 34. prefers-reduced-motion

`matchMedia("(prefers-reduced-motion: reduce)")` can detect a user's reduced-motion preference. Respecting this preference improves accessibility.

## 35. Location Object

`window.location` represents the current document URL and provides navigation-related properties and methods.

## 36. location.href

`location.href` returns the current URL as a string and can also be assigned to navigate.

## 37. location.assign

`location.assign(url)` navigates to a new URL and creates a history entry.

## 38. location.replace

`location.replace(url)` navigates without creating a new history entry for the current page.

## 39. assign vs replace

```text
assign(url)   → navigate + keep current entry in history
replace(url)  → navigate + replace current entry
```

## 40. location.reload

`location.reload()` requests a reload of the current page.

## 41. URL Components

Useful `location` properties include `protocol`, `host`, `hostname`, `port`, `pathname`, `search`, `hash`, and `origin`.

## 42. protocol

`location.protocol` includes the URL scheme, such as `https:`.

## 43. host

`location.host` contains hostname plus port when a non-default port is present.

## 44. hostname

`location.hostname` contains the host name without the port.

## 45. port

`location.port` contains the explicit port string when present.

## 46. pathname

`location.pathname` identifies the path portion of the URL.

## 47. search

`location.search` contains the query string, including the leading `?` when one exists.

## 48. hash

`location.hash` contains the fragment identifier, including the leading `#` when one exists.

## 49. origin

`location.origin` represents the URL origin, generally scheme + host + port.

## 50. URL API

For parsing and constructing URLs, prefer the `URL` interface rather than manually splitting URL strings.

## 51. URL Example

```js
const url = new URL(location.href);
console.log(url.pathname);
console.log(url.searchParams.get("page"));
```

## 52. URLSearchParams

`URLSearchParams` provides methods for reading and constructing query parameters.

## 53. Reading Query Parameters

```js
const params = new URLSearchParams(location.search);
const page = params.get("page");
```

## 54. Query Values Are Strings

`URLSearchParams.get()` returns strings or `null`. Convert values explicitly when your application expects numbers or booleans.

## 55. Query Parameter Encoding

Use `URLSearchParams` to correctly encode and manipulate query parameters instead of manually concatenating arbitrary strings.

## 56. Hash Navigation

Changing `location.hash` can navigate to a fragment and may update browser history.

## 57. hashchange Event

The `hashchange` event fires when the URL fragment changes in ways covered by the event model.

## 58. History Object

`window.history` provides access to the session history associated with the current browsing context.

## 59. history.length

`history.length` reports the number of entries in the current session history list as exposed by the browser.

## 60. back

`history.back()` requests navigation to the previous history entry.

## 61. forward

`history.forward()` requests navigation to the next history entry.

## 62. go

`history.go(delta)` requests navigation relative to the current history position.

## 63. pushState

`history.pushState(state, unused, url)` adds a new history entry without performing a normal full-page navigation.

## 64. replaceState

`history.replaceState(state, unused, url)` modifies the current history entry without a full-page navigation.

## 65. pushState Does Not Fetch the Page

Changing the URL with `pushState()` does not automatically request the new document. Your application must update its UI and routing state.

## 66. popstate Event

The `popstate` event is fired when the active history entry changes through browser history navigation in situations defined by the History API.

## 67. SPA Routing Mental Model

```text
User clicks link
      ↓
Prevent default navigation
      ↓
history.pushState()
      ↓
Update application route
      ↓
Render new view
      ↓
Back button
      ↓
popstate
      ↓
Render previous route
```

## 68. History State

The first argument to `pushState()` and `replaceState()` stores serializable application state associated with the history entry.

## 69. Do Not Store Huge Objects

History state should contain compact routing state rather than large application caches or sensitive secrets.

## 70. Same-Origin Requirement

History URL changes are constrained by browser same-origin rules. A page cannot freely use `pushState()` to switch to an unrelated origin.

## 71. Navigation Security

Never assume a URL is safe merely because it came from a query parameter, hash, or history state. Validate application-controlled navigation destinations.

## 72. Navigator Object

`navigator` exposes information and APIs related to the browser and user's environment.

## 73. navigator.userAgent

`navigator.userAgent` exposes a browser user-agent string. It is not a reliable general-purpose way to identify every browser feature.

## 74. Feature Detection

Prefer detecting the API or behavior you need rather than guessing browser identity from a user-agent string.

## 75. navigator.language

`navigator.language` commonly reports the browser's preferred language setting.

## 76. navigator.languages

`navigator.languages` exposes an ordered list of preferred languages when supported.

## 77. navigator.onLine

`navigator.onLine` gives a coarse indication of network connectivity. It does not guarantee that a server is reachable or that the internet is usable.

## 78. online Event

The `online` event indicates the browser's online state has changed to online according to its connectivity model.

## 79. offline Event

The `offline` event indicates the browser's online state has changed to offline according to its connectivity model.

## 80. Online/Offline UI

Use online/offline events as hints for user experience, not as proof that an API request will succeed.

## 81. Clipboard API

The modern Clipboard API can read/write clipboard data under permission and security restrictions, usually in secure contexts.

## 82. Clipboard Write

```js
await navigator.clipboard.writeText("Hello");
```

Clipboard operations can require a user gesture and appropriate permissions/context.

## 83. Clipboard Read

Reading clipboard content is more sensitive than writing and is subject to stronger permission and browser restrictions.

## 84. Secure Context

Many powerful browser APIs require HTTPS or another secure context. `window.isSecureContext` can report whether the current context is considered secure.

## 85. Permissions API

`navigator.permissions` can expose permission state for supported browser capabilities.

## 86. Permission States

A permission can commonly be represented as `granted`, `denied`, or `prompt`, although individual APIs and browsers have their own behavior.

## 87. Geolocation

`navigator.geolocation` can request location information with explicit user permission.

## 88. Geolocation Security

Location is sensitive. Request it only when necessary, explain why it is needed, and design for denial or unavailable location.

## 89. Geolocation Example

```js
navigator.geolocation.getCurrentPosition(
  position => console.log(position.coords),
  error => console.error(error)
);
```

## 90. Geolocation Is Asynchronous

The result is delivered through callbacks because obtaining location may involve sensors, permissions, and external positioning systems.

## 91. Storage Overview

Browser storage APIs allow client-side persistence. Common mechanisms include `localStorage`, `sessionStorage`, IndexedDB, and cookies.

## 92. localStorage

`localStorage` provides persistent key/value storage associated with an origin.

## 93. localStorage Stores Strings

```js
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
```

Values are strings. Objects must be serialized explicitly.

## 94. JSON With localStorage

```js
localStorage.setItem("user", JSON.stringify({ name: "Ravi" }));
const user = JSON.parse(localStorage.getItem("user"));
```

Handle missing or malformed stored data in production code.

## 95. localStorage Lifetime

`localStorage` generally persists across browser sessions until data is removed or the relevant storage is cleared, subject to browser policies and privacy modes.

## 96. sessionStorage

`sessionStorage` provides storage scoped to a page session and browsing context behavior defined by the platform.

## 97. sessionStorage Example

```js
sessionStorage.setItem("step", "2");
```

## 98. localStorage vs sessionStorage

```text
localStorage   → persistent origin storage
sessionStorage → page-session storage
```

## 99. Storage Is Synchronous

Web Storage APIs such as `localStorage` are synchronous. Large or frequent operations can block the main thread.

## 100. Do Not Store Secrets in localStorage

Avoid treating Web Storage as a secure secret vault. Data accessible to JavaScript is exposed to any successful script execution in the origin, including an XSS attacker.

## 101. Storage Events

The `storage` event can notify another same-origin browsing context when Web Storage changes. It does not fire in the same document that performed the change.

## 102. IndexedDB

IndexedDB is a browser database API designed for larger structured client-side data and asynchronous transactions.

## 103. localStorage vs IndexedDB

Use Web Storage for small simple values. Consider IndexedDB for larger structured datasets, indexes, offline applications, and asynchronous storage needs.

## 104. Cookies

Cookies are HTTP-oriented state sent according to cookie rules and can be configured with security attributes such as `Secure`, `HttpOnly`, and `SameSite`.

## 105. localStorage vs Cookies

Cookies can participate in HTTP requests; localStorage does not automatically travel with every HTTP request. They solve different problems.

## 106. HttpOnly

An `HttpOnly` cookie cannot be read through JavaScript's `document.cookie`, reducing exposure to client-side script access.

## 107. Secure Cookie

The `Secure` attribute instructs the browser to send a cookie only over secure connections, subject to cookie processing rules.

## 108. SameSite

`SameSite` controls aspects of cross-site cookie sending and is an important defense and privacy mechanism in web authentication architecture.

## 109. Timers

Browsers expose timer APIs such as `setTimeout()` and `setInterval()` through the Window environment.

## 110. setTimeout

`setTimeout(callback, delay)` schedules a callback for execution after at least the requested delay has elapsed and when the event loop can run it.

## 111. setTimeout Is Not Exact

A delay is not a guarantee that the callback executes at exactly that time. Main-thread work, task queues, throttling, and browser scheduling can delay execution.

## 112. setInterval

`setInterval(callback, delay)` repeatedly schedules callbacks, but actual execution can be delayed and should not be treated as a real-time clock.

## 113. clearTimeout

`clearTimeout(id)` cancels a pending timeout represented by its timer identifier.

## 114. clearInterval

`clearInterval(id)` cancels a pending interval.

## 115. Timer IDs

Store timer IDs when you need to cancel or reset scheduled work.

## 116. Debouncing

Debouncing waits until activity stops for a specified period before executing a function. It is useful for search inputs, resize handling, and other bursty events.

## 117. Debounce Example

```js
function debounce(fn, delay) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
}
```

## 118. Throttling

Throttling limits how frequently a function executes during a stream of events.

## 119. Debounce vs Throttle

```text
Debounce → run after activity settles
Throttle → run at a controlled maximum frequency
```

## 120. requestAnimationFrame

`requestAnimationFrame()` schedules visual work before the browser's next repaint opportunity.

## 121. cancelAnimationFrame

`cancelAnimationFrame(id)` cancels a previously scheduled animation frame callback.

## 122. Animation Loop

```js
function frame(time) {
  // update visual state
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
```

## 123. Timers vs requestAnimationFrame

Use timers for general scheduling. Use `requestAnimationFrame()` for visual animation work that should align with rendering.

## 124. Dialog APIs

Browsers expose `alert()`, `confirm()`, and `prompt()` as synchronous modal dialogs.

## 125. alert

`alert()` displays a message and blocks interaction with the page until the dialog is dismissed.

## 126. confirm

`confirm()` asks for confirmation and returns a boolean indicating the user's choice.

## 127. prompt

`prompt()` asks for text input and returns a string or `null` if canceled.

## 128. Dialog APIs and UX

Synchronous dialogs are useful for simple demonstrations but are usually a poor fit for modern application UI because they block the page and offer limited customization.

## 129. print

`window.print()` opens the browser's print interface according to browser and platform behavior.

## 130. beforeprint / afterprint

These events can help adapt UI for printing, although CSS print styles are usually the primary solution.

## 131. visibilitychange

The document's `visibilitychange` event fires when the visibility state changes, such as switching tabs or minimizing the page.

## 132. document.visibilityState

The value is commonly `visible` or `hidden`, allowing applications to reduce nonessential work when the page is hidden.

## 133. Visibility-Aware Work

Pause expensive animations, polling, or background UI work when appropriate while the page is hidden.

## 134. Page Lifecycle Thinking

```text
Visible
  ↓
Hidden
  ↓
Freeze / resource pressure may occur
  ↓
Resume / visible
```

The exact lifecycle behavior depends on browser and platform.

## 135. beforeunload

`beforeunload` can be used for limited unsaved-data protection, but browsers restrict customization and discourage unnecessary use because it can hurt performance and user experience.

## 136. unload

Do not build critical application logic around `unload`. Modern web applications should use more reliable lifecycle and persistence strategies.

## 137. pagehide

`pagehide` can signal that a document is being hidden as part of navigation or page lifecycle changes and can be more appropriate than `unload` for some cases.

## 138. pageshow

`pageshow` fires when a document becomes visible, including cases involving the back-forward cache.

## 139. bfcache

The back-forward cache can restore a previous page quickly from a preserved state rather than performing a full reload. Code should tolerate pages being restored rather than assuming every navigation is a fresh load.

## 140. Storage + bfcache

Do not confuse restored page state with fresh server state. Revalidate or synchronize data according to application requirements when pages return from history.

## 141. beforeunload Wrong Use

Do not attach `beforeunload` merely to log analytics or run cleanup that can be done elsewhere. It can interfere with navigation performance and lifecycle optimizations.

## 142. Browser Focus

`document.hasFocus()` can indicate whether the document currently has focus according to browser behavior.

## 143. Window Focus Events

`focus` and `blur` events on Window can help applications react to browser focus changes, but they should not be treated as perfect visibility or lifecycle signals.

## 144. open

`window.open()` requests creation/navigation of a browsing context and is subject to popup blockers and security policies.

## 145. Popup Blockers

Browsers may block unsolicited windows. Calls triggered directly by user actions have better chances of being permitted.

## 146. noopener

When opening untrusted or external content in a new browsing context, use appropriate `noopener` behavior to prevent the opened page from gaining an unwanted `window.opener` relationship.

## 147. noreferrer

`noreferrer` can suppress the Referer header and also implies opener isolation in relevant link/navigation behavior.

## 148. window.opener

A newly opened page can potentially receive a reference to the opener depending on navigation context and security settings. Treat cross-origin opener relationships carefully.

## 149. postMessage

`window.postMessage()` enables controlled cross-window messaging, including between different origins.

## 150. postMessage Security

Always validate `event.origin` and, where appropriate, the source window before trusting incoming messages.

## 151. postMessage Example

```js
window.addEventListener("message", event => {
  if (event.origin !== "https://trusted.example") return;
  console.log(event.data);
});
```

## 152. targetOrigin

When sending a message, specify the expected recipient origin instead of using an unrestricted target when a known origin is available.

## 153. Message Data

Treat `event.data` as untrusted input unless the sender and message format have been validated.

## 154. BroadcastChannel

`BroadcastChannel` allows same-origin browsing contexts to communicate through named channels.

## 155. Web Workers

Workers can run JavaScript away from the main window execution context, reducing main-thread pressure for CPU-heavy work.

## 156. Worker Relationship to BOM

Workers have a different global environment and do not have the normal Window/document APIs. Browser APIs available to workers depend on the worker environment.

## 157. Main Thread

The main thread commonly handles DOM manipulation and much of the UI event processing. Long synchronous JavaScript can block interaction and rendering.

## 158. Long Task

A long main-thread task can delay user input, rendering, timers, and other work. Break up expensive work or move suitable computation to a worker.

## 159. requestIdleCallback

Where supported, `requestIdleCallback()` can schedule noncritical work during idle periods. It should not be used for user-visible deadlines or time-critical operations.

## 160. Performance Navigation APIs

The Performance APIs can expose timing and navigation information for measuring real application behavior.

## 161. performance.now

`performance.now()` provides a high-resolution monotonic timestamp suitable for measuring elapsed durations.

## 162. Date.now vs performance.now

`Date.now()` represents wall-clock time and can be adjusted. `performance.now()` is designed for elapsed-time measurement and is monotonic within its context.

## 163. Measuring DOM Work

```js
const start = performance.now();
render();
const duration = performance.now() - start;
console.log(duration);
```

## 164. Performance Observer

`PerformanceObserver` can observe selected performance entry types asynchronously, helping applications analyze browser performance data.

## 165. Resource Timing

Resource timing APIs can expose timing information about network resources subject to browser security and buffering rules.

## 166. Navigation Timing

Navigation timing provides measurements related to page navigation and loading performance.

## 167. Avoid Micro-Optimizing BOM APIs

Do not optimize an API call simply because it sounds expensive. Measure actual bottlenecks and optimize user-visible work first.

## 168. Security Model

The browser's security model isolates origins and restricts access between unrelated pages and resources.

## 169. Same-Origin Policy

The same-origin policy limits how documents and scripts from different origins can interact. An origin is defined by scheme, host, and port.

## 170. CORS Is Not the Same as SOP

CORS is a mechanism that lets servers explicitly permit certain cross-origin requests. It does not remove the browser's entire same-origin security model.

## 171. Mixed Content

Loading insecure resources from a secure page can be blocked or restricted by browsers. Prefer HTTPS for the entire application and its dependencies.

## 172. Secure Contexts

Many sensitive APIs require secure contexts, generally HTTPS except for defined trustworthy local-development contexts.

## 173. Permission Prompts

Do not repeatedly prompt users for sensitive capabilities. Explain the feature need first and handle denial gracefully.

## 174. Feature Detection Example

```js
if ("geolocation" in navigator) {
  // feature exists
}
```

Feature detection should check the API relevant to the operation rather than guessing browser brand.

## 175. Progressive Enhancement

Build a useful baseline experience and enhance it when browser capabilities are available.

## 176. Graceful Degradation

When a browser API is unavailable or permission is denied, provide a useful fallback rather than leaving the application unusable.

## 177. BOM Debugging Checklist

When a browser API fails, check browser support, secure-context requirements, permissions, user gestures, origin restrictions, lifecycle state, and console errors.

## 178. Debugging: innerWidth

If `innerWidth` does not match a monitor measurement, remember that it describes the page viewport, not the physical screen.

## 179. Debugging: localStorage

If stored data is `null`, verify the key, origin, browser privacy settings, and whether the data was cleared.

## 180. Debugging: JSON Storage

Wrap `JSON.parse()` of persisted user-controlled or potentially corrupted data in appropriate error handling.

## 181. Debugging: Timer

If a timeout runs later than expected, inspect main-thread work and browser scheduling. Do not assume the timer itself is broken.

## 182. Debugging: popstate

If SPA back navigation behaves incorrectly, log the current URL, history state, route transitions, and rendering sequence.

## 183. Debugging: postMessage

Log `event.origin`, validate the message shape, and confirm the expected sender before processing data.

## 184. Debugging: Clipboard

Check HTTPS/secure context, user activation requirements, permissions, and browser support when clipboard operations fail.

## 185. Debugging: Geolocation

Handle permission denial, unavailable position, timeout, and browser restrictions explicitly.

## 186. Wrong: Treat navigator.onLine as Internet Proof

```js
if (navigator.onLine) {
  fetch("/api/data");
}
```

Being `true` does not guarantee the server or internet is reachable.

## 187. Correct: Handle the Request

```js
try {
  const response = await fetch("/api/data");
  if (!response.ok) throw new Error("Request failed");
} catch (error) {
  console.error(error);
}
```

The actual request result is stronger evidence than the coarse online flag.

## 188. Wrong: Store Object Directly

```js
localStorage.setItem("user", { name: "Ravi" });
```

The object is converted to a string such as `[object Object]` rather than stored as structured JSON.

## 189. Correct: Serialize

```js
localStorage.setItem("user", JSON.stringify({ name: "Ravi" }));
```

## 190. Wrong: Exact Timer Assumption

```js
setTimeout(() => console.log("exactly 1000ms"), 1000);
```

The callback is eligible after the delay; it is not guaranteed to execute at exactly 1000ms.

## 191. Correct Timer Mental Model

```text
setTimeout
   ↓
minimum delay passes
   ↓
callback becomes eligible
   ↓
event loop / task scheduling
   ↓
callback executes when possible
```

## 192. Wrong: User-Agent Browser Detection

```js
if (navigator.userAgent.includes("Chrome")) {
  // assume every required API works
}
```

Browser identity does not prove feature support.

## 193. Correct: Feature Detection

```js
if ("clipboard" in navigator) {
  // capability exists
}
```

## 194. Wrong: Trust postMessage

```js
window.addEventListener("message", event => {
  runCommand(event.data);
});
```

This trusts arbitrary messages without validating the sender or data.

## 195. Correct: Validate Message

```js
window.addEventListener("message", event => {
  if (event.origin !== "https://trusted.example") return;
  if (!event.data || event.data.type !== "PING") return;
  console.log("trusted message");
});
```

## 196. Browser Example: Theme Preference

```js
const query = matchMedia("(prefers-color-scheme: dark)");
document.documentElement.dataset.theme = query.matches ? "dark" : "light";
```

Prefer CSS media queries for purely visual styling; use JavaScript when application behavior depends on the preference.

## 197. Browser Example: Responsive Behavior

Use `matchMedia()` for behavior that genuinely needs JavaScript. Do not duplicate every CSS breakpoint in JavaScript unnecessarily.

## 198. Browser Example: Query Parameter

```js
const params = new URLSearchParams(location.search);
const page = Number(params.get("page") ?? 1);
```

Validate ranges before using the value for application logic.

## 199. Browser Example: SPA Navigation

```js
function navigate(path) {
  history.pushState({ path }, "", path);
  renderRoute(path);
}
window.addEventListener("popstate", () => renderRoute(location.pathname));
```

## 200. Browser Example: Persistent Theme

```js
const saved = localStorage.getItem("theme");
if (saved) document.documentElement.dataset.theme = saved;
```

Use explicit allowed values rather than blindly trusting persisted input.

## 201. Browser Example: Debounced Search

Combine an `input` listener with debounce so rapid typing does not trigger unnecessary expensive work for every keystroke.

## 202. Browser Example: Visibility-Aware Polling

Pause nonessential polling when `document.visibilityState === "hidden"` and resume according to the application's data freshness requirements.

## 203. Browser Example: Online Indicator

Use `online` and `offline` events to update a connection hint, but still handle actual request failures.

## 204. Browser Example: Clipboard Button

Provide a visible button that calls the Clipboard API from a user action and show success/failure feedback.

## 205. Browser Example: Geolocation UI

Request location only after explaining the feature, show a loading state, handle denial, and avoid retaining unnecessary precise location data.

## 206. Browser Example: Cross-Window Messaging

Build a parent/iframe demo where both sides validate `origin`, message type, and expected data schema before acting.

## 207. Browser Example: Performance Measurement

Measure a rendering operation with `performance.now()` and compare versions using real representative data.

## 208. Mini Project: URL Inspector

Build a page that parses the current URL with `URL`, displays origin/path/query/hash, and lets the user safely construct a new query string.

## 209. Mini Project: SPA Router

Build a small router with `pushState`, `replaceState`, `popstate`, route matching, a 404 view, and refresh-safe navigation strategy.

## 210. Mini Project: Theme Manager

Build light/dark/system themes using CSS plus `matchMedia`, persist an explicit theme choice, and support reduced motion.

## 211. Mini Project: Offline Dashboard

Build an online/offline indicator, cached UI state, request retry behavior, and clear messaging that distinguishes offline mode from server failure.

## 212. Mini Project: Clipboard Notes

Build a notes UI with copy buttons, Clipboard API feature detection, success feedback, and graceful fallback behavior.

## 213. Mini Project: Responsive Dashboard

Use CSS for layout and `matchMedia` only for behavior that cannot reasonably remain in CSS.

## 214. Mini Project: Visibility-Aware Timer

Build a timer that handles page visibility changes and explains why wall-clock elapsed time should be calculated from timestamps instead of assuming every timer tick ran.

## 215. Intermediate Project: Browser Capability Detector

Create a feature-detection dashboard for selected APIs such as storage, clipboard, geolocation, observers, and secure context. Clearly distinguish API existence from permission/grant status.

## 216. Advanced Project: Production SPA Navigation Layer

Implement route state, query parameters, history restoration, scroll restoration strategy, focus management, analytics hooks, 404 handling, and safe external navigation.

## 217. Advanced Project: Cross-Window Collaboration Demo

Build a parent page and iframe that communicate using `postMessage`, strict origin validation, message schemas, request IDs, and timeout/error handling.

## 218. Practice: Beginner

1. Explain BOM vs DOM.
2. Explain `window`.
3. Read `innerWidth`.
4. Explain viewport vs screen.
5. Parse a query string.
6. Navigate with `location`.
7. Explain `pushState`.
8. Read localStorage.
9. Explain timer delays.
10. Detect a browser feature.

## 219. Practice: Intermediate

1. Build a hash router.
2. Build a `pushState` router.
3. Implement debounce.
4. Implement throttle.
5. Build theme persistence.
6. Build online/offline UI.
7. Use `matchMedia`.
8. Handle visibility changes.
9. Build safe clipboard UI.
10. Measure browser work with `performance.now()`.

## 220. Practice: Advanced

1. Design a production SPA history strategy.
2. Explain bfcache implications.
3. Secure a `postMessage` channel.
4. Compare storage technologies.
5. Design offline-first behavior.
6. Analyze main-thread blocking.
7. Design permission UX.
8. Build capability-based progressive enhancement.
9. Audit navigation security.
10. Build a browser API abstraction layer.

## 221. Interview: BOM

**Question:** What is the BOM?

**Answer target:** Explain it as a common term for browser host APIs surrounding the document and JavaScript runtime, not a single ECMAScript-standard object hierarchy.

## 222. Interview: window

**Question:** What is `window`?

**Answer:** In a typical browser page it represents the top-level browsing context's Window object and exposes many browser APIs.

## 223. Interview: window vs document

**Answer:** `window` represents the browser window/global environment; `document` represents the current DOM document.

## 224. Interview: innerWidth vs screen.width

**Answer:** `innerWidth` is viewport-related; `screen.width` describes the display screen in CSS pixels. They measure different things.

## 225. Interview: location.assign vs replace

**Answer:** `assign()` navigates while preserving the current history entry; `replace()` replaces the current entry.

## 226. Interview: pushState

**Question:** Does `pushState()` request a new page?

**Answer:** No. It changes the session history and URL without automatically performing a normal full-page navigation.

## 227. Interview: popstate

**Answer:** It lets an application respond when browser history navigation changes the active history entry in the applicable cases.

## 228. Interview: localStorage

**Question:** What does localStorage store?

**Answer:** String key/value data associated with an origin. Objects require serialization such as JSON.

## 229. Interview: Cookies vs localStorage

**Answer:** Cookies participate in HTTP cookie processing and may be sent with requests; localStorage is client-side storage and is not automatically sent with every request.

## 230. Interview: navigator.onLine

**Answer:** It is a coarse connectivity hint, not proof that a server or internet request will succeed.

## 231. Interview: debounce vs throttle

**Answer:** Debounce waits for activity to settle; throttle limits execution frequency during ongoing activity.

## 232. Interview: requestAnimationFrame

**Answer:** It schedules visual updates in coordination with the browser's rendering cycle and is generally preferred over timers for animation loops.

## 233. Interview: performance.now

**Answer:** It provides a high-resolution monotonic timestamp suitable for measuring elapsed durations.

## 234. Interview: postMessage

**Answer:** It enables controlled cross-window messaging, but receivers must validate origin, source where appropriate, and message data.

## 235. Interview: secure context

**Answer:** A secure context is a browser security environment in which APIs requiring trustworthy origins can operate, generally HTTPS with defined local exceptions.

## 236. Teach-Back: Browser Map

Draw the relationship between JavaScript, Window, Document, Navigator, Location, History, Screen, Storage, and browser events.

## 237. Teach-Back: Navigation

Explain `location`, `history`, `pushState`, `replaceState`, and `popstate` using an SPA example.

## 238. Teach-Back: Viewport

Explain why `innerWidth`, `screen.width`, CSS pixels, and `devicePixelRatio` answer different questions.

## 239. Teach-Back: Storage

Explain localStorage, sessionStorage, IndexedDB, and cookies and choose one for three real applications.

## 240. Teach-Back: Timers

Explain why `setTimeout(fn, 1000)` means a minimum delay rather than exact execution at one second.

## 241. Teach-Back: Security

Explain same-origin policy, secure contexts, `postMessage` validation, cookie security attributes, and XSS implications of JavaScript-accessible storage.

## 242. Teach-Back: Performance

Explain debounce, throttle, `requestAnimationFrame`, visibility-aware work, and main-thread blocking.

## 243. Mastery: Browser Model

- [ ] I can explain BOM vs DOM vs ECMAScript.
- [ ] I understand `window` and `globalThis`.
- [ ] I know which APIs are browser-provided.

## 244. Mastery: Viewport

- [ ] I can explain `innerWidth` and `innerHeight`.
- [ ] I understand viewport vs screen.
- [ ] I understand CSS pixels and `devicePixelRatio`.

## 245. Mastery: Navigation

- [ ] I can parse URLs with `URL`.
- [ ] I can use `URLSearchParams`.
- [ ] I understand `assign`, `replace`, and `reload`.
- [ ] I can build a basic History API router.

## 246. Mastery: History

- [ ] I understand `pushState`.
- [ ] I understand `replaceState`.
- [ ] I can respond to `popstate`.
- [ ] I understand that History API URL changes do not automatically fetch a new page.

## 247. Mastery: Storage

- [ ] I know localStorage stores strings.
- [ ] I can serialize JSON safely.
- [ ] I understand sessionStorage.
- [ ] I can explain when IndexedDB is more appropriate.
- [ ] I understand why JavaScript-accessible storage is not a secret vault.

## 248. Mastery: Timers

- [ ] I understand timer scheduling.
- [ ] I can cancel timers.
- [ ] I can implement debounce and throttle.
- [ ] I know when to use requestAnimationFrame.

## 249. Mastery: Browser Lifecycle

- [ ] I understand visibility changes.
- [ ] I know why `unload` should not carry critical logic.
- [ ] I understand the basic bfcache mental model.

## 250. Mastery: Security

- [ ] I understand same-origin policy.
- [ ] I understand secure contexts.
- [ ] I can validate postMessage origins.
- [ ] I can design safe navigation.
- [ ] I understand storage/XSS implications.

## 251. Mastery: Performance

- [ ] I can measure elapsed work with `performance.now()`.
- [ ] I understand main-thread blocking.
- [ ] I can choose debounce vs throttle.
- [ ] I can pause nonessential work when hidden.

## 252. Mastery: Progressive Enhancement

- [ ] I use feature detection.
- [ ] I provide fallbacks.
- [ ] I do not assume a browser brand implies a feature.

# Final BOM Mental Model

```text
Browser Environment
│
├── JavaScript / ECMAScript
│
├── Window
│   ├── Location ─────→ URL / Navigation
│   ├── History ──────→ SPA navigation
│   ├── Navigator ────→ capabilities / permissions
│   ├── Screen ───────→ display information
│   ├── Storage ──────→ client persistence
│   ├── Timers ───────→ scheduled tasks
│   └── Performance ──→ measurement
│
├── Document
│   └── DOM tree
│
└── Browser Security
    ├── Origin model
    ├── Secure contexts
    ├── Permissions
    └── Cross-window messaging
```

# Final BOM Challenge

Build a **production-style browser dashboard** using vanilla JavaScript.

Requirements:

1. Display viewport and screen information and explain why they differ.
2. Parse and edit query parameters with `URLSearchParams`.
3. Implement SPA navigation with `pushState` and `popstate`.
4. Persist a user-selected theme using safe, explicit storage values.
5. Respect `prefers-color-scheme` and `prefers-reduced-motion`.
6. Add online/offline status but verify actual requests independently.
7. Implement debounced search.
8. Add visibility-aware background work.
9. Add clipboard functionality with feature detection and graceful failure.
10. Measure at least one operation with `performance.now()`.
11. Explain localStorage vs IndexedDB vs cookies.
12. Add an optional geolocation feature with clear permission UX.
13. Create a secure `postMessage` demo with strict origin validation.
14. Handle browser back/forward navigation correctly.
15. Test behavior when storage is unavailable or corrupted.
16. Test the app at different viewport sizes.
17. Audit external navigation and cross-origin communication.
18. Avoid unnecessary `beforeunload`/`unload` logic.
19. Explain every browser API used and whether it belongs to ECMAScript, DOM, or browser host APIs.
20. Teach the complete BOM mental model to another beginner without notes.

**Mastery standard:** You are not finished when you can write `window.location.href`. You are finished when you can explain **the browser as a host environment, distinguish BOM from DOM and ECMAScript, design safe navigation and storage, handle lifecycle and permissions, and make browser APIs work with accessibility, security, reliability, and performance in mind.**
