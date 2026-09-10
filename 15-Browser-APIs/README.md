# 15 — Browser APIs

> A deep, practical chapter on the browser APIs that turn JavaScript into an application platform: Fetch, Web Storage, IndexedDB, Clipboard, Media Devices, Notifications, Permissions, Web Workers, WebSockets, WebRTC, Intersection/Resize/Mutation Observers, File APIs, Canvas, Drag and Drop, Web Audio, Web Share, Fullscreen, Vibration, Speech, Web Locks, Service Workers, Cache API, Background Sync concepts, and progressive enhancement.

## Learning Goal

By the end of this chapter you should understand that **Browser APIs are host-provided capabilities**, not JavaScript language features. You should be able to identify an API's security model, permission requirements, asynchronous behavior, browser support, and appropriate fallback before using it in a real application.

## 1. What Is a Browser API?

A Browser API is an interface supplied by the browser that allows web code to interact with capabilities outside the ECMAScript language itself.

## 2. Why Browser APIs Exist

JavaScript alone does not define networking, files, camera access, notifications, DOM rendering, persistent browser databases, or device sensors. The browser exposes controlled APIs for those capabilities.

## 3. ECMAScript vs Browser APIs

```text
ECMAScript
├── variables
├── functions
├── objects
├── Promise
├── Map / Set
└── language + standard built-ins

Browser
├── fetch()
├── document
├── localStorage
├── IndexedDB
├── WebSocket
├── Workers
└── many device/application APIs
```

## 4. Browser APIs Are Host APIs

A browser is the host environment. It implements APIs around the JavaScript engine and applies security, permissions, lifecycle, and origin rules.

## 5. API Availability Is Not Guaranteed

An API may be missing, disabled, permission-gated, secure-context-only, or implemented differently across browsers.

## 6. Feature Detection

Prefer capability detection over browser-name detection.

```js
if ("geolocation" in navigator) {
  // capability exists
}
```

## 7. Secure Contexts

Many powerful APIs require a secure context. Use HTTPS in production and check `window.isSecureContext` when relevant.

## 8. Permission Model

Some APIs require user permission. A production application must handle `granted`, `denied`, unavailable, and prompt-like states gracefully.

## 9. User Gesture Requirements

Sensitive APIs may require a user activation such as a click. Do not assume a call from page startup will be allowed.

## 10. Origin

Browser capabilities are frequently scoped by origin. Remember: origin is generally scheme + host + port.

## 11. Same-Origin Policy

The browser restricts scripts from freely accessing data belonging to unrelated origins.

## 12. CORS

CORS is a server-controlled mechanism that allows selected cross-origin requests. It is not a replacement for the same-origin security model.

## 13. Browser API Mental Model

```text
Application code
      ↓
Browser API
      ↓
Security / permission checks
      ↓
Browser implementation
      ↓
OS / network / device / storage
      ↓
Result or error
```

## 14. Asynchronous APIs

Many browser operations are asynchronous because they involve networking, disk, devices, permissions, or browser scheduling.

## 15. Promise-Based APIs

Modern browser APIs frequently return Promises, making them work naturally with `async`/`await`.

## 16. Error Handling Is Mandatory

A rejected Promise or API error is normal control flow. Handle failure rather than assuming the happy path.

## 17. Fetch API

`fetch()` provides a Promise-based interface for HTTP requests and responses.

## 18. Basic Fetch

```js
const response = await fetch("/api/users");
console.log(response.status);
```

## 19. Fetch Does Not Reject on HTTP 404

A `fetch()` Promise generally rejects for network-level failures, not merely because the server returned an HTTP error status.

## 20. response.ok

`response.ok` is `true` for successful HTTP status ranges from 200 through 299.

## 21. Correct Fetch Error Handling

```js
const response = await fetch("/api/users");
if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
const data = await response.json();
```

## 22. response.status

`response.status` contains the HTTP status code.

## 23. response.headers

`response.headers` exposes response headers subject to browser visibility and CORS rules.

## 24. response.url

`response.url` exposes the final response URL according to Fetch processing.

## 25. response.type

`response.type` describes the response type, such as `basic`, `cors`, `opaque`, or related values.

## 26. Reading JSON

`response.json()` is asynchronous and returns a Promise that resolves to parsed JavaScript data.

## 27. Reading Text

Use `response.text()` when the response body should be interpreted as text.

## 28. Reading Blob

`response.blob()` reads a response into a `Blob`, useful for binary data such as images or downloadable files.

## 29. Reading ArrayBuffer

`response.arrayBuffer()` exposes raw binary data as an `ArrayBuffer`.

## 30. Request Methods

Fetch can perform GET, POST, PUT, PATCH, DELETE, HEAD, and other methods supported by the HTTP stack.

## 31. GET

GET commonly retrieves a resource and should generally be treated as safe and cacheable according to HTTP semantics.

## 32. POST

POST commonly submits data or requests creation/processing on a server.

## 33. PUT

PUT commonly represents replacement semantics for a target resource.

## 34. PATCH

PATCH commonly represents a partial modification.

## 35. DELETE

DELETE commonly requests deletion of a resource.

## 36. Fetch Options

```js
fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Ravi" })
});
```

## 37. Headers

The `Headers` interface provides structured request and response header handling.

## 38. Content-Type

Set `Content-Type: application/json` when sending a JSON request body and when the server expects JSON.

## 39. Authorization

Authentication schemes often use an `Authorization` header, but token storage and transport must be designed around the application's threat model.

## 40. Credentials

Fetch's `credentials` option controls whether credentials such as cookies are included according to Fetch and cookie policies.

## 41. include Credentials

```js
fetch("/api/me", { credentials: "include" });
```

Use this only when the application architecture actually requires cross-origin credentialed requests or explicit cookie behavior.

## 42. AbortController

`AbortController` lets application code signal cancellation to APIs such as Fetch.

## 43. AbortController Example

```js
const controller = new AbortController();
const request = fetch("/api/search", { signal: controller.signal });
controller.abort();
```

## 44. Why Abort Requests?

Cancel stale searches, route-changing requests, component cleanup, or work that is no longer relevant.

## 45. AbortError

Aborted operations commonly reject with an error whose name can be `AbortError`. Treat intentional cancellation differently from unexpected failures when useful.

## 46. Timeout With AbortSignal

Modern environments can provide timeout-related AbortSignal helpers. Feature-detect advanced helpers when browser compatibility matters.

## 47. Request Object

The `Request` interface represents an HTTP request and can be passed to `fetch()`.

## 48. Response Object

The `Response` interface represents the result of a Fetch operation.

## 49. Request Cloning

Request and response bodies are streams and generally can be consumed once. `clone()` can create a second consumable copy when supported by the object's state.

## 50. Response Body Is a Stream

The body can be exposed as a `ReadableStream`, allowing progressive processing rather than always buffering the entire response.

## 51. Streaming Response

Streaming is useful for large data, incremental rendering, logs, AI output, and other workloads where waiting for the complete body is unnecessary.

## 52. ReadableStream

`ReadableStream` represents asynchronously delivered chunks of data.

## 53. Stream Mental Model

```text
Network
  ↓
chunks
  ↓
ReadableStream
  ↓
reader / consumer
  ↓
incremental processing
```

## 54. Backpressure

Streams can coordinate production and consumption rates so a fast producer does not blindly overwhelm a slower consumer.

## 55. FormData

`FormData` represents form-like key/value data and can also carry `File` objects.

## 56. Sending FormData

```js
const body = new FormData();
body.append("name", "Ravi");
body.append("avatar", fileInput.files[0]);
await fetch("/upload", { method: "POST", body });
```

## 57. Do Not Manually Set Multipart Content-Type

When sending `FormData`, normally let the browser generate the appropriate multipart boundary rather than manually setting the `Content-Type` header.

## 58. URLSearchParams Request Body

`URLSearchParams` can represent application/x-www-form-urlencoded-style data when that format is appropriate.

## 59. Blob

A `Blob` represents immutable raw data with a MIME type.

## 60. File

A `File` extends Blob semantics with file metadata such as a name and last-modified information.

## 61. File Input

```js
const file = document.querySelector("input[type=file]").files[0];
```

Always handle the case where no file was selected.

## 62. FileReader

`FileReader` can asynchronously read user-selected Blob/File data into formats such as text, ArrayBuffer, or data URL.

## 63. Object URLs

`URL.createObjectURL(blob)` creates a temporary URL representing a Blob or File.

## 64. Revoke Object URLs

Call `URL.revokeObjectURL(url)` when a generated object URL is no longer needed to release associated browser resources.

## 65. File Upload Validation

Client-side file checks improve UX but are not a security boundary. The server must validate size, type, content, and authorization.

## 66. Drag and Drop API

The Drag and Drop API supports drag interactions and data transfer between draggable sources and drop targets.

## 67. dragover

A drop target commonly needs to handle `dragover` and prevent the default behavior to allow dropping.

## 68. drop

The `drop` event provides access to transferred data through `DataTransfer`.

## 69. DataTransfer

`DataTransfer` can expose dragged files and data formats.

## 70. Drag-and-Drop Security

Never trust dropped file names, MIME types, or text. Treat all transferred data as untrusted input.

## 71. Clipboard API

The Clipboard API supports programmatic clipboard operations under browser security and permission rules.

## 72. Clipboard Write Text

```js
await navigator.clipboard.writeText("Copied!");
```

## 73. Clipboard Read Text

Reading clipboard text is more sensitive and may require permission or user activation.

## 74. Clipboard Events

Clipboard-related DOM events such as `copy`, `cut`, and `paste` allow applications to customize supported interactions.

## 75. Clipboard Sanitization

Never blindly inject pasted HTML into the DOM. Treat clipboard content as untrusted input.

## 76. Web Storage

`localStorage` and `sessionStorage` provide simple synchronous string key/value storage.

## 77. localStorage Example

```js
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
```

## 78. Storage Serialization

Use `JSON.stringify()` and `JSON.parse()` when storing structured data, with validation and error handling for corrupted values.

## 79. Storage Event

The `storage` event can synchronize simple state between same-origin documents when one context modifies Web Storage.

## 80. IndexedDB

IndexedDB is an asynchronous browser database for structured client-side data.

## 81. IndexedDB Use Cases

Consider IndexedDB for offline applications, large structured data, client-side caches, and indexed records.

## 82. IndexedDB Transactions

IndexedDB operations occur through transactions that provide consistency rules around groups of database operations.

## 83. Cache API

The Cache API stores request/response pairs and is particularly important for service-worker-controlled offline architectures.

## 84. Cache API Is Not HTTP Cache

The Cache API is script-accessible storage. It is distinct from the browser's ordinary HTTP cache, even though both can affect resource reuse.

## 85. Service Workers

A service worker is a specialized worker that can intercept network-related requests for controlled scopes and enable offline/PWA patterns.

## 86. Service Worker Lifecycle

```text
register
   ↓
install
   ↓
waiting
   ↓
activate
   ↓
control pages
```

Exact lifecycle transitions depend on registrations and existing workers.

## 87. Registering a Service Worker

```js
if ("serviceWorker" in navigator) {
  await navigator.serviceWorker.register("/sw.js");
}
```

## 88. Service Workers Require Secure Contexts

Production service-worker use generally requires HTTPS, with localhost development treated specially by browsers.

## 89. Service Worker Fetch Event

A service worker can listen for `fetch` events and implement application-specific caching or network strategies.

## 90. Cache-First Strategy

```text
Request
  ↓
Cache hit? ── yes → cached response
  │
  no
  ↓
Network
  ↓
store + respond
```

## 91. Network-First Strategy

```text
Request
  ↓
Network
  ├── success → response + optional cache
  └── failure → cached fallback
```

## 92. Offline-First

Offline-first applications treat connectivity as variable and design useful behavior even when the network is unavailable.

## 93. Background Sync Concept

Background Sync can allow suitable deferred work to be retried by the browser when connectivity returns, where supported and appropriate.

## 94. Service Worker Limitations

Service workers have lifecycle, scope, storage, browser-support, and execution constraints. Do not treat them like permanent background processes.

## 95. WebSocket API

WebSocket provides a persistent, bidirectional communication channel between a browser and a WebSocket server.

## 96. Opening a WebSocket

```js
const socket = new WebSocket("wss://example.com/socket");
```

Use `wss:` for secure WebSocket communication on HTTPS applications.

## 97. WebSocket Events

Important events include `open`, `message`, `error`, and `close`.

## 98. Sending WebSocket Data

```js
socket.send(JSON.stringify({ type: "ping" }));
```

Validate both outgoing and incoming message schemas.

## 99. WebSocket Is Not HTTP Polling

WebSocket maintains a connection for bidirectional communication rather than requiring a new HTTP request for every message.

## 100. WebSocket Reconnection

Production clients should decide how to handle connection loss, backoff, duplicate subscriptions, and stale application state.

## 101. WebSocket Security

Use authentication, authorization, origin checks where appropriate, input validation, message limits, and server-side access control.

## 102. Server-Sent Events

Server-Sent Events use `EventSource` for a server-to-browser streaming channel over HTTP.

## 103. EventSource

```js
const source = new EventSource("/events");
source.onmessage = event => console.log(event.data);
```

## 104. SSE vs WebSocket

```text
SSE       → server → browser stream
WebSocket → browser ↔ server bidirectional channel
```

## 105. MediaDevices

`navigator.mediaDevices` provides APIs for accessing media input devices such as cameras and microphones, subject to permission and security rules.

## 106. getUserMedia

```js
const stream = await navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
});
```

## 107. getUserMedia Permission

Camera and microphone access requires explicit browser permission and normally a secure context.

## 108. MediaStream

A `MediaStream` represents a collection of media tracks.

## 109. MediaStreamTrack

Tracks represent individual media sources such as audio or video and can be stopped when no longer needed.

## 110. Stop Camera Tracks

```js
stream.getTracks().forEach(track => track.stop());
```

Release media resources when your feature no longer needs them.

## 111. enumerateDevices

`navigator.mediaDevices.enumerateDevices()` can list available media input/output devices subject to permission and privacy restrictions.

## 112. Device Labels

Device labels may be restricted or less informative until appropriate permissions are granted.

## 113. WebRTC

WebRTC enables real-time peer-to-peer audio, video, and data communication in supported browsers.

## 114. RTCPeerConnection

`RTCPeerConnection` coordinates WebRTC peer connections, ICE candidates, media tracks, and session negotiation.

## 115. WebRTC Signaling

WebRTC does not define one universal signaling server protocol. Applications commonly exchange SDP/candidate information through a separate signaling channel.

## 116. ICE

Interactive Connectivity Establishment helps peers discover usable network paths, often using STUN and sometimes TURN infrastructure.

## 117. STUN

STUN can help discover public-facing network information needed for peer connectivity.

## 118. TURN

TURN relays media/data through a server when direct peer-to-peer connectivity cannot be established.

## 119. WebRTC Security

Use HTTPS, explicit permissions, authenticated signaling, correct origin controls, and careful media handling.

## 120. Notifications API

The Notifications API allows web applications to request permission to display system notifications where supported.

## 121. Notification Permission

```js
const permission = await Notification.requestPermission();
```

Do not request notification permission before explaining the value to the user.

## 122. Notification Creation

```js
if (Notification.permission === "granted") {
  new Notification("Build completed");
}
```

Browser behavior and restrictions vary; use appropriate notification architecture for production apps.

## 123. Permissions API

`navigator.permissions.query()` can inspect permission states for APIs whose permission names are supported by the browser.

## 124. Permission Is Not Feature Support

An API can exist while permission is denied. Feature detection and permission state are separate checks.

## 125. Geolocation

Geolocation provides position information after user permission and under browser/OS privacy controls.

## 126. Geolocation Accuracy

Position accuracy depends on available sensors, network conditions, device capabilities, and environmental factors.

## 127. Geolocation Watch

`watchPosition()` can provide repeated location updates. Stop it with `clearWatch()` when no longer needed.

## 128. Battery Status

Battery-related APIs have limited support and privacy implications. Do not design core functionality around them without verifying current browser availability.

## 129. Vibration API

`navigator.vibrate()` can request device vibration on supported mobile contexts, but support and user settings vary.

## 130. SpeechSynthesis

The Web Speech API's `speechSynthesis` can provide text-to-speech capabilities where supported.

## 131. Speech Synthesis Example

```js
const utterance = new SpeechSynthesisUtterance("Hello");
speechSynthesis.speak(utterance);
```

## 132. Speech Recognition

Speech recognition support is more variable than speech synthesis. Feature-detect the implementation before using it.

## 133. Web Share API

`navigator.share()` can invoke supported operating-system sharing UI and normally requires a user action.

## 134. Share Example

```js
await navigator.share({
  title: "JavaScript",
  text: "Learning browser APIs"
});
```

## 135. Share Fallback

If Web Share is unavailable, provide a normal copy-link or shareable URL fallback.

## 136. Fullscreen API

The Fullscreen API allows an element to request fullscreen presentation subject to browser and user-activation rules.

## 137. requestFullscreen

```js
await document.documentElement.requestFullscreen();
```

## 138. Exit Fullscreen

`document.exitFullscreen()` exits fullscreen mode when the document is currently fullscreen.

## 139. Fullscreen Security

Fullscreen requests can be restricted to user activation and are intentionally controlled by the browser.

## 140. Picture-in-Picture

Picture-in-Picture APIs can allow compatible video content to remain visible while the user interacts elsewhere, subject to browser support and permissions.

## 141. Canvas API

The Canvas API provides a programmable drawing surface for graphics, visualization, games, image processing, and custom rendering.

## 142. Canvas Context

```js
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
```

## 143. Canvas Is Immediate Mode

Canvas generally stores pixels rather than a DOM element for every drawn shape. Your application maintains the logical scene state.

## 144. Canvas Coordinates

The 2D canvas coordinate origin normally begins at the top-left corner, with x increasing rightward and y increasing downward.

## 145. Canvas Device Pixel Ratio

For sharp high-DPI canvas output, consider the relationship between CSS size and backing-store size using `devicePixelRatio`.

## 146. Canvas Security

Canvas content involving cross-origin images can become restricted by origin-clean rules, preventing certain pixel-reading operations.

## 147. OffscreenCanvas

`OffscreenCanvas` can allow rendering work outside the normal DOM-associated canvas context and can be useful with workers where supported.

## 148. IntersectionObserver

`IntersectionObserver` asynchronously reports when a target intersects a root or viewport according to configured thresholds.

## 149. Why IntersectionObserver?

It is useful for lazy loading, infinite scrolling, visibility analytics, and reveal effects without manually calculating geometry on every scroll event.

## 150. IntersectionObserver Example

```js
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      console.log("visible");
    }
  }
});
observer.observe(document.querySelector(".card"));
```

## 151. Disconnect Observer

Call `observer.disconnect()` when an observer is no longer needed.

## 152. ResizeObserver

`ResizeObserver` reports changes to an observed element's box size.

## 153. ResizeObserver Use Case

It is useful when a component's behavior depends on its own size rather than the entire viewport.

## 154. MutationObserver

`MutationObserver` asynchronously reports selected DOM mutations.

## 155. MutationObserver Example

```js
const observer = new MutationObserver(records => {
  console.log(records);
});
observer.observe(document.body, { childList: true, subtree: true });
```

## 156. Avoid MutationObserver Abuse

Observing huge DOM trees with broad mutation rules can generate significant work. Observe the smallest useful scope.

## 157. AbortSignal as an Event Cleanup Tool

Modern event APIs can accept an AbortSignal so multiple listeners or operations can be canceled together where supported.

## 158. EventTarget

Many browser APIs use the `EventTarget` model with `addEventListener`, `removeEventListener`, and dispatched events.

## 159. CustomEvent

`CustomEvent` can carry application-specific event information between components or modules.

## 160. Event Delegation

Use DOM event delegation when a parent can efficiently handle events from many current or future descendants.

## 161. URL API

The `URL` API provides structured parsing and manipulation of URLs.

## 162. URLSearchParams

`URLSearchParams` is the preferred structured interface for query parameters instead of manual string splitting.

## 163. TextEncoder

`TextEncoder` converts JavaScript strings to UTF-8 encoded bytes.

## 164. TextDecoder

`TextDecoder` converts encoded bytes into strings using a specified character encoding.

## 165. ArrayBuffer

`ArrayBuffer` represents a fixed-length raw binary memory region.

## 166. Typed Arrays

Typed arrays such as `Uint8Array` provide structured views over binary data.

## 167. DataView

`DataView` allows flexible reading and writing of binary values with explicit endianness.

## 168. Web Crypto API

The Web Crypto API provides cryptographic primitives and secure random generation in supported secure contexts.

## 169. crypto.getRandomValues

Use `crypto.getRandomValues()` for cryptographically strong random bytes when security-sensitive randomness is required.

## 170. Math.random Is Not Cryptographic

Do not use `Math.random()` for password reset tokens, session secrets, authentication codes, or other security-sensitive random values.

## 171. SubtleCrypto

`crypto.subtle` exposes asynchronous cryptographic operations such as hashing, signing, verification, encryption, and key management, subject to algorithm/security constraints.

## 172. Password Hashing Warning

Do not invent password-hashing schemes in browser JavaScript. Password storage belongs to a properly designed server-side authentication system using appropriate password hashing algorithms.

## 173. Web Locks API

The Web Locks API can coordinate access to named resources between same-origin browser contexts where supported.

## 174. Web Locks Use Case

Use a lock when multiple tabs might otherwise perform conflicting work such as maintaining one leader or updating shared state.

## 175. Web Locks Caveat

Support and lifecycle behavior vary. Always design a fallback when the application depends on multi-tab coordination.

## 176. BroadcastChannel

`BroadcastChannel` allows same-origin contexts such as tabs and workers to exchange messages through a named channel.

## 177. BroadcastChannel Example

```js
const channel = new BroadcastChannel("app");
channel.postMessage({ type: "LOGOUT" });
```

## 178. Close BroadcastChannel

Call `channel.close()` when the channel is no longer needed.

## 179. Web Workers

Dedicated workers execute JavaScript in a worker global environment separate from the Window main thread.

## 180. Why Workers?

Move suitable CPU-heavy work away from the main thread so UI responsiveness can improve.

## 181. Worker Communication

Workers communicate with their owner through message events and structured cloning.

## 182. Worker Example

```js
const worker = new Worker("worker.js");
worker.postMessage({ numbers: [1, 2, 3] });
worker.onmessage = event => console.log(event.data);
```

## 183. Structured Clone

Many browser APIs transfer data using the structured clone algorithm rather than JSON serialization.

## 184. Structured Clone Limitations

Not every JavaScript value can be cloned, and functions and some host objects require special handling.

## 185. Transferable Objects

Some binary resources can be transferred rather than copied, which can reduce memory overhead in worker communication.

## 186. SharedArrayBuffer

`SharedArrayBuffer` allows shared memory between compatible execution contexts under stronger security isolation requirements.

## 187. Atomics

`Atomics` provides synchronization primitives for shared memory operations where SharedArrayBuffer is available.

## 188. Browser Isolation

Advanced shared-memory features can require cross-origin isolation because of security risks involving high-resolution timing and speculative execution.

## 189. File System Access API

Where supported, the File System Access API can allow user-mediated access to local files and directories.

## 190. File System Security

Browser applications should not assume arbitrary filesystem access. User choice, permission, origin, and browser policy constrain access.

## 191. File System Fallback

If advanced filesystem APIs are unavailable, use file inputs, downloads, or server upload/download flows as appropriate.

## 192. IndexedDB + Files

IndexedDB can store suitable Blob/File data for offline applications, subject to browser quotas and persistence policies.

## 193. Notifications + Service Workers

Production web notifications often involve a service worker and push architecture rather than only constructing a Notification from a page script.

## 194. Push API

The Push API can allow a service worker to receive push messages when supported and permission has been granted.

## 195. Push Security

Push subscriptions and payload handling must be authenticated and treated as security-sensitive application data.

## 196. Web App Manifest

A web app manifest describes installable web-app metadata such as name, icons, start URL, and display preferences. It works with broader PWA architecture but does not itself make an application offline.

## 197. PWA Mental Model

```text
Web App
├── HTTPS
├── responsive UI
├── manifest
├── service worker
├── caching strategy
└── optional push / install features
```

## 198. API Compatibility

Check current browser compatibility before depending on a newer API. Support is a moving target.

## 199. Progressive Enhancement

Build a working baseline first, then enhance with advanced APIs when available.

## 200. Graceful Fallback

For every nonessential browser API, answer: what happens if the API does not exist, permission is denied, or the browser refuses the operation?

## 201. Wrong: Assume Fetch Success

```js
const data = await fetch("/api/data").then(r => r.json());
```

This can incorrectly treat an HTTP error response as valid application data.

## 202. Correct: Check HTTP Status

```js
const response = await fetch("/api/data");
if (!response.ok) throw new Error("Request failed");
const data = await response.json();
```

## 203. Wrong: Ignore Cancellation

```js
searchInput.addEventListener("input", async event => {
  const response = await fetch(`/search?q=${event.target.value}`);
  render(await response.json());
});
```

Older responses can arrive after newer ones and overwrite correct results.

## 204. Correct: Abort Stale Requests

```js
let controller;

async function search(query) {
  controller?.abort();
  controller = new AbortController();

  const response = await fetch(`/search?q=${encodeURIComponent(query)}`, {
    signal: controller.signal
  });

  if (!response.ok) throw new Error("Search failed");
  return response.json();
}
```

## 205. Wrong: Trust File Metadata

```js
if (file.type === "image/png") upload(file);
```

A client-provided MIME type is not sufficient security validation.

## 206. Correct: Validate Server-Side

Client-side validation can improve UX, but the server must independently validate file size, type/content, authorization, and storage rules.

## 207. Wrong: Leak Object URLs

```js
const url = URL.createObjectURL(file);
img.src = url;
// create hundreds more and never release them
```

## 208. Correct: Revoke When Finished

```js
const url = URL.createObjectURL(file);
img.src = url;
img.addEventListener("load", () => URL.revokeObjectURL(url), { once: true });
```

## 209. Wrong: Use Math.random for Secrets

```js
const token = Math.random().toString(36).slice(2);
```

This is not an appropriate security token generator.

## 210. Correct: Secure Randomness

```js
const bytes = new Uint8Array(32);
crypto.getRandomValues(bytes);
```

Use server-side secret generation for server authentication tokens and sessions.

## 211. Wrong: Trust postMessage

```js
window.addEventListener("message", event => {
  process(event.data);
});
```

## 212. Correct: Validate Sender and Data

```js
window.addEventListener("message", event => {
  if (event.origin !== "https://trusted.example") return;
  if (event.data?.type !== "READY") return;
  process(event.data);
});
```

## 213. Wrong: Start Camera Without Explanation

```js
navigator.mediaDevices.getUserMedia({ video: true });
```

A permission prompt without context is poor UX and may be rejected or blocked.

## 214. Correct: User-Initiated Camera Flow

Explain the feature first, then request the camera after a user action and handle denial explicitly.

## 215. Wrong: Observe Everything

```js
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  characterData: true
});
```

Broad observation can create unnecessary processing.

## 216. Correct: Observe the Smallest Scope

Observe only the node and mutation types required for the feature.

## 217. Debugging Fetch

Check URL, method, request headers, credentials, CORS, network status, HTTP status, response content type, and server logs.

## 218. Debugging CORS

A CORS error does not necessarily mean the server request never occurred. Inspect the Network panel and server configuration separately from browser console messaging.

## 219. Debugging Permissions

Check whether the API exists, whether the context is secure, whether permission is granted/denied, and whether user activation is required.

## 220. Debugging Media

Verify camera/microphone permission, selected devices, constraints, browser support, and whether previous tracks were stopped.

## 221. Debugging WebSocket

Inspect connection state, close codes, authentication, proxy configuration, TLS, message format, and reconnection behavior.

## 222. Debugging Service Workers

Inspect registration scope, lifecycle state, controlled clients, cache contents, and stale cached assets.

## 223. Debugging IndexedDB

Use browser developer tools to inspect databases, object stores, transactions, and stored records.

## 224. Debugging Observers

Confirm the observed target exists, the observation options are correct, and callbacks are disconnected when no longer needed.

## 225. Performance: Network Waterfalls

Use the browser Network panel to identify request ordering, latency, payload size, blocking, caching, and duplicate requests.

## 226. Performance: Avoid Duplicate Requests

Cache stable data, deduplicate concurrent requests, cancel stale requests, and avoid refetching data without a reason.

## 227. Performance: Streaming

Use streaming when users benefit from incremental data instead of waiting for a complete large response.

## 228. Performance: Workers

Move CPU-heavy pure computation to a worker when the communication overhead and data-copy costs are justified.

## 229. Performance: Storage

Avoid frequent synchronous localStorage operations in hot paths because they can block the main thread.

## 230. Performance: Observers

Prefer browser observer APIs for supported visibility/size/mutation use cases instead of repeatedly polling or calculating layout in scroll loops.

## 231. Performance: Object URLs

Revoke object URLs that are no longer needed to avoid unnecessary retained resources.

## 232. Security: XSS

Never insert untrusted API, clipboard, URL, or file metadata into HTML without appropriate sanitization/encoding.

## 233. Security: CSRF

Cookie-based authentication requires CSRF-aware architecture. Use appropriate SameSite settings, CSRF defenses, and server-side validation where required.

## 234. Security: Tokens

Do not place sensitive authentication secrets in easily script-readable storage without understanding the XSS consequences.

## 235. Security: CORS

CORS should be configured deliberately. Do not blindly allow every origin with credentials.

## 236. Security: WebSockets

WebSocket authentication and authorization remain server responsibilities. A successful socket connection does not mean every message is authorized.

## 237. Security: Service Worker Scope

A service worker can influence requests within its scope, so deployment paths, cache strategy, update behavior, and script integrity deserve careful review.

## 238. Security: Permissions

Request the minimum capability required, at the moment it is useful, and provide a meaningful explanation.

## 239. Accessibility: Permission UX

Permission requests should be preceded by accessible UI explaining what the user gains and what will happen if permission is denied.

## 240. Accessibility: Notifications

Do not make notifications the only way a user can discover critical application state.

## 241. Accessibility: Media

Provide captions, labels, keyboard controls, and clear state indicators for audio/video features.

## 242. Accessibility: Drag and Drop

Provide keyboard-accessible alternatives to pointer-only drag interactions.

## 243. Accessibility: Fullscreen

Provide a visible way to enter and exit fullscreen and do not trap users in an unexpected presentation mode.

## 244. Real-World Architecture: API Client

Create one application-level HTTP client responsible for base URL rules, authentication strategy, error normalization, cancellation, and response parsing.

## 245. Real-World Architecture: Browser Capability Layer

Keep feature detection and browser-specific fallback logic near a capability layer rather than scattering it through every UI component.

## 246. Real-World Architecture: Media Service

Wrap camera/microphone setup, track lifecycle, permissions, device selection, and cleanup in a dedicated module.

## 247. Real-World Architecture: Storage Service

Wrap serialization, schema validation, migrations, quota errors, and storage selection in a storage abstraction.

## 248. Real-World Architecture: Worker Service

Wrap worker creation, message correlation, error handling, termination, and task cancellation in a reusable worker interface.

## 249. Real-World Architecture: Offline Layer

Separate network requests, caching, synchronization, conflict resolution, and UI state instead of mixing all offline behavior inside components.

## 250. Mini Project: Fetch API Client

Build a typed-by-convention API client with GET/POST helpers, JSON handling, HTTP errors, cancellation, timeout behavior, and normalized errors.

## 251. Mini Project: File Upload

Build a file uploader using File, FormData, progress-friendly UI, preview object URLs, client validation, cancellation, and server-side validation notes.

## 252. Mini Project: Infinite Scroll

Use IntersectionObserver to load the next page when a sentinel approaches the viewport.

## 253. Mini Project: Offline Notes

Build a notes application using IndexedDB for persistence and a service worker/cache strategy for the shell.

## 254. Mini Project: Live Chat

Build a WebSocket chat with authentication, reconnect backoff, message validation, connection state, and duplicate-message protection.

## 255. Mini Project: Camera Capture

Build a camera UI using getUserMedia, preview, capture, stop tracks, permission errors, and a download/upload flow.

## 256. Mini Project: Browser Notifications

Build opt-in notifications with permission UX and an in-page fallback.

## 257. Mini Project: Web Worker Calculator

Move an intentionally CPU-heavy calculation to a worker and compare main-thread responsiveness before and after.

## 258. Advanced Project: PWA

Build a progressive web app with manifest, service worker, cache versioning, offline fallback, update strategy, and explicit cache invalidation.

## 259. Advanced Project: Streaming Dashboard

Build a streaming UI that consumes incremental server data, handles cancellation, reconnects safely, and prevents stale results from replacing newer state.

## 260. Advanced Project: WebRTC Room

Build a small peer-to-peer video room with a separate signaling channel, permission UX, media-track lifecycle, connection state, and cleanup.

## 261. Practice: Beginner

1. Explain Browser API vs JavaScript feature.
2. Fetch JSON.
3. Handle `response.ok`.
4. Abort a fetch.
5. Store a string.
6. Parse JSON storage.
7. Read a selected File.
8. Create an object URL.
9. Detect an API.
10. Explain secure context.

## 262. Practice: Intermediate

1. Build a reusable Fetch client.
2. Implement request cancellation.
3. Build infinite scrolling with IntersectionObserver.
4. Build file upload with FormData.
5. Build an IndexedDB store.
6. Build a BroadcastChannel demo.
7. Build a worker.
8. Build a WebSocket client.
9. Build camera preview.
10. Build notification fallback.

## 263. Practice: Advanced

1. Design offline-first architecture.
2. Design a cache invalidation strategy.
3. Secure a WebSocket protocol.
4. Design a WebRTC signaling flow.
5. Build a streaming parser.
6. Design a worker task queue.
7. Design browser capability fallbacks.
8. Audit browser permissions.
9. Threat-model client storage.
10. Build a production-style PWA update strategy.

## 264. Interview: Browser APIs

**Question:** What is a Browser API?

**Answer target:** Explain that it is host-provided functionality exposed by the browser rather than an ECMAScript language feature.

## 265. Interview: Fetch

**Question:** Does Fetch reject on HTTP 404?

**Answer:** Normally no. It rejects for network-level failures; inspect `response.ok` or `response.status` for HTTP errors.

## 266. Interview: Response Body

**Question:** Why is `response.json()` asynchronous?

**Answer:** Reading and parsing the response body is asynchronous and returns a Promise.

## 267. Interview: AbortController

**Question:** Why use AbortController?

**Answer:** To signal cancellation of supported asynchronous operations such as Fetch, especially for stale or no-longer-needed work.

## 268. Interview: localStorage

**Question:** What type of values does Web Storage store?

**Answer:** String key/value data. Structured values require serialization.

## 269. Interview: IndexedDB

**Question:** When would you choose IndexedDB?

**Answer:** For larger structured client-side data, indexes, offline storage, and asynchronous database operations.

## 270. Interview: Service Worker

**Question:** What is a service worker?

**Answer:** A specialized worker that can control a scope and intercept relevant requests, enabling offline/PWA patterns and other background-capability features.

## 271. Interview: WebSocket

**Question:** How does WebSocket differ from normal Fetch?

**Answer:** Fetch is request/response oriented; WebSocket maintains a bidirectional connection for ongoing messages.

## 272. Interview: SSE

**Question:** When is SSE useful?

**Answer:** When the server needs to continuously stream events to the browser and client-to-server communication can remain ordinary HTTP.

## 273. Interview: Web Worker

**Question:** Why use a Worker?

**Answer:** To move suitable computation away from the main thread and improve UI responsiveness.

## 274. Interview: Structured Clone

**Question:** How does `postMessage` transfer many objects?

**Answer:** Through structured cloning, with special rules and some transferable types that can move ownership instead of copying data.

## 275. Interview: IntersectionObserver

**Question:** Why use IntersectionObserver instead of a scroll handler?

**Answer:** It lets the browser asynchronously report intersections and avoids repeatedly doing manual viewport calculations for common visibility use cases.

## 276. Interview: CORS

**Question:** Is CORS a server or browser feature?

**Answer:** CORS is a protocol implemented by browsers using server-provided response headers to permit selected cross-origin access.

## 277. Teach-Back: Fetch

Explain Fetch from request creation through HTTP status checking, body parsing, cancellation, and error handling.

## 278. Teach-Back: Storage

Explain localStorage, IndexedDB, Cache API, cookies, and why each solves a different problem.

## 279. Teach-Back: Offline

Draw a service-worker cache architecture and explain cache-first versus network-first.

## 280. Teach-Back: Real-Time

Explain Fetch, SSE, WebSocket, and WebRTC and choose the correct tool for four application scenarios.

## 281. Teach-Back: Media

Explain permission, MediaStream, MediaStreamTrack, device selection, cleanup, and security.

## 282. Teach-Back: Workers

Explain main thread, worker thread, structured clone, transferables, and when moving computation is worthwhile.

## 283. Teach-Back: Security

Explain CORS, SOP, XSS, CSRF, secure contexts, permissions, and untrusted browser data.

## 284. Mastery: Networking

- [ ] I can use Fetch correctly.
- [ ] I check HTTP status.
- [ ] I understand request/response bodies.
- [ ] I can cancel stale requests.
- [ ] I understand streaming at a high level.

## 285. Mastery: Storage

- [ ] I know localStorage limitations.
- [ ] I can explain IndexedDB.
- [ ] I understand Cache API vs HTTP cache.
- [ ] I understand cookies and JavaScript storage are different.

## 286. Mastery: Offline

- [ ] I understand service-worker lifecycle.
- [ ] I can explain cache-first and network-first.
- [ ] I can design an offline fallback.
- [ ] I understand cache invalidation is an application problem.

## 287. Mastery: Real-Time

- [ ] I can compare SSE and WebSocket.
- [ ] I understand WebRTC's high-level architecture.
- [ ] I know signaling is separate from the WebRTC media connection.

## 288. Mastery: Media

- [ ] I can request media permission responsibly.
- [ ] I understand MediaStream and tracks.
- [ ] I stop tracks when finished.
- [ ] I handle permission denial.

## 289. Mastery: Files

- [ ] I can use File and Blob.
- [ ] I understand object URLs.
- [ ] I revoke object URLs.
- [ ] I know client validation is not a security boundary.

## 290. Mastery: Workers

- [ ] I understand the main thread.
- [ ] I can communicate with a Worker.
- [ ] I understand structured clone.
- [ ] I know when worker overhead is worthwhile.

## 291. Mastery: Observers

- [ ] I can use IntersectionObserver.
- [ ] I can use ResizeObserver.
- [ ] I understand MutationObserver.
- [ ] I disconnect observers when finished.

## 292. Mastery: Security

- [ ] I understand secure contexts.
- [ ] I can threat-model browser permissions.
- [ ] I do not trust client file metadata.
- [ ] I understand CORS vs SOP.
- [ ] I understand XSS implications of client-readable data.

## 293. Mastery: Progressive Enhancement

- [ ] I feature-detect advanced APIs.
- [ ] I design useful fallbacks.
- [ ] I handle permission denial.
- [ ] I test unsupported-browser behavior.

# Final Browser API Mental Model

```text
JavaScript Application
        │
        ├── DOM APIs
        │
        ├── Browser APIs
        │   ├── Network → Fetch / WebSocket / SSE
        │   ├── Storage → Web Storage / IndexedDB / Cache
        │   ├── Device → Media / Geolocation / Clipboard
        │   ├── Compute → Workers / Web Crypto
        │   ├── Rendering → Canvas / Fullscreen
        │   ├── Observation → Intersection / Resize / Mutation
        │   └── PWA → Service Worker / Push / Manifest
        │
        └── Browser security
            ├── Origin
            ├── Permissions
            ├── Secure context
            ├── CORS
            └── User activation
```

# Final Browser APIs Challenge

Build a **production-style offline-capable real-time dashboard**.

Requirements:

1. Create a reusable Fetch client.
2. Normalize HTTP/network errors.
3. Cancel stale requests with AbortController.
4. Stream at least one large/incremental response.
5. Store structured offline data in IndexedDB.
6. Add a service worker and explicit cache versioning.
7. Implement an offline fallback.
8. Add an IntersectionObserver-driven lazy/infinite section.
9. Add a WebSocket real-time channel.
10. Handle reconnect backoff and stale state.
11. Add a file upload with FormData and preview object URLs.
12. Revoke object URLs when appropriate.
13. Add optional clipboard functionality.
14. Add an optional camera feature with explicit permission UX.
15. Add a Web Worker for CPU-heavy processing.
16. Add feature detection for every optional browser capability.
17. Add keyboard-accessible fallbacks for pointer-only features.
18. Threat-model XSS, CSRF, CORS, storage, WebSocket, and permission risks.
19. Measure network and main-thread performance.
20. Explain why every selected Browser API is appropriate.

**Mastery standard:** You are not finished when you can call `fetch()`. You are finished when you can choose browser capabilities based on **requirements, asynchronous behavior, security model, permissions, browser support, performance, accessibility, and graceful fallback**, then build the feature without treating the browser as a magical black box.
