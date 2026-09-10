# 16 — Networking

> Deep JavaScript networking notes: HTTP, URLs, DNS, TCP/TLS, Fetch, requests/responses, headers, methods, status codes, JSON, REST, CORS, cookies, authentication, caching, HTTP/2 and HTTP/3 concepts, WebSocket, SSE, retries, timeouts, cancellation, pagination, uploads/downloads, streaming, performance, security, debugging, architecture, and production patterns.

## Learning Goal

By the end of this chapter you should understand what happens between a JavaScript `fetch()` call and a server response, and you should be able to design reliable, secure, observable network communication instead of treating APIs as magic functions.

## 1. What Is Networking?

Networking is the exchange of data between independent systems through communication protocols.

## 2. Why Developers Need Networking

Frontend applications use networking to load data, authenticate users, submit forms, upload files, consume live events, and communicate with backend services.

## 3. Client and Server

```text
Browser / Client
      │ request
      ▼
    Network
      │
      ▼
Backend / Server
      │ response
      ▼
Browser / Client
```

## 4. Network Is Not JavaScript

JavaScript defines language behavior. Networking is provided by the host environment through APIs such as Fetch and WebSocket.

## 5. Network Request Mental Model

```text
JS code
 ↓
Fetch / WebSocket API
 ↓
URL + DNS
 ↓
TCP or QUIC + TLS
 ↓
HTTP protocol
 ↓
Server
 ↓
HTTP response
 ↓
Browser API
 ↓
Application state
 ↓
UI
```

## 6. URL

A URL identifies a resource or endpoint using components such as scheme, host, port, path, query, and fragment.

## 7. URL Anatomy

```text
https://api.example.com:443/users?id=42#profile
│       │               │   │      │       │
│       │               │   │      │       └─ fragment
│       │               │   │      └───────── query
│       │               │   └──────────────── path
│       │               └──────────────────── port
│       └──────────────────────────────────── host
└──────────────────────────────────────────── scheme
```

## 8. Scheme

The scheme identifies the protocol context, such as `https`.

## 9. Host

The host identifies the server destination, usually a domain name or IP address.

## 10. Port

A port identifies a logical service endpoint on a host. HTTP commonly uses 80 and HTTPS commonly uses 443 by default.

## 11. Path

The path identifies a resource or routing location on the server.

## 12. Query String

The query component carries key/value parameters after `?`.

## 13. Fragment

The fragment follows `#` and is normally handled by the client rather than sent as part of an HTTP request.

## 14. URLSearchParams

Use `URLSearchParams` to construct and encode query parameters safely instead of manual string concatenation.

## 15. HTTP

HTTP is an application-layer protocol used to transfer resources and messages between clients and servers.

## 16. Request and Response

HTTP communication is commonly modeled as a request followed by a response.

## 17. HTTP Request Anatomy

```text
Request Line
Headers

Optional Body
```

## 18. HTTP Response Anatomy

```text
Status Line
Headers

Optional Body
```

## 19. Request Method

The method communicates the intended semantics of the request.

## 20. GET

GET requests representation data and is intended to be safe according to HTTP semantics.

## 21. POST

POST submits data or asks the server to perform processing that commonly changes state.

## 22. PUT

PUT commonly represents replacing the state of a target resource.

## 23. PATCH

PATCH commonly represents partial modification of a resource.

## 24. DELETE

DELETE requests removal of a target resource.

## 25. HEAD

HEAD is similar to GET but requests response metadata without the normal response body.

## 26. OPTIONS

OPTIONS can describe communication options and is important in CORS preflight scenarios.

## 27. Safe Methods

Safe HTTP methods are intended not to request state-changing actions as their primary semantics. GET, HEAD, and OPTIONS are examples.

## 28. Idempotent Methods

An idempotent method has the property that repeating the same request has the same intended effect as making it once, although responses can differ.

## 29. GET and Idempotency

GET is safe and idempotent under HTTP semantics when used correctly.

## 30. PUT and Idempotency

PUT is defined as idempotent under HTTP semantics, although server implementations must honor the intended contract.

## 31. DELETE and Idempotency

DELETE is idempotent by HTTP semantics, but the response to repeated requests can differ.

## 32. POST Is Not Generally Idempotent

Repeated POST requests can create multiple effects unless the application explicitly implements idempotency controls.

## 33. Request Headers

Headers provide metadata and control information about the request.

## 34. Response Headers

Response headers provide metadata and instructions from the server to the client.

## 35. Content-Type

`Content-Type` describes the media type of a message body.

## 36. Accept

`Accept` tells the server which response media types the client can process.

## 37. Authorization

`Authorization` commonly carries credentials such as bearer tokens, depending on the authentication scheme.

## 38. User-Agent

The User-Agent header identifies client software, but modern privacy practices reduce how much identifying detail should be assumed from it.

## 39. Cache-Control

`Cache-Control` controls caching behavior using HTTP caching directives.

## 40. ETag

An ETag identifies a particular representation version and supports conditional requests and cache validation.

## 41. Last-Modified

`Last-Modified` provides a server timestamp that can participate in conditional caching.

## 42. Conditional Request

Clients can send validators such as `If-None-Match` to ask whether a cached representation is still current.

## 43. 304 Not Modified

A 304 response tells a cache-aware client that its stored representation can be reused under the relevant HTTP caching rules.

## 44. HTTP Status Codes

Status codes communicate the broad outcome of a request.

## 45. 1xx

1xx responses are informational.

## 46. 2xx

2xx responses indicate successful processing.

## 47. 200 OK

200 indicates a successful request with a response representation or successful result as defined by the method.

## 48. 201 Created

201 indicates that a resource was successfully created.

## 49. 202 Accepted

202 indicates that a request was accepted for processing but processing may not yet be complete.

## 50. 204 No Content

204 indicates successful processing without a response body.

## 51. 3xx

3xx responses communicate redirection or cache-related conditions.

## 52. 301

301 indicates a permanent redirect in HTTP semantics.

## 53. 302

302 indicates a temporary redirection semantics defined by HTTP.

## 54. 304

304 indicates that a conditional request can use a cached representation.

## 55. 4xx

4xx responses indicate a client-side request problem or inability to fulfill the request as made.

## 56. 400 Bad Request

400 means the server considers the request malformed or invalid at a protocol/application boundary.

## 57. 401 Unauthorized

401 means authentication credentials are required or invalid for the requested resource. It does not literally mean authorization failure.

## 58. 403 Forbidden

403 indicates that the server understood the request but refuses to authorize it.

## 59. 404 Not Found

404 indicates that the target resource could not be found or the server does not wish to disclose its existence.

## 60. 405 Method Not Allowed

405 indicates that the method is known but not supported for the target resource.

## 61. 409 Conflict

409 is useful when a request conflicts with the current state of a resource, such as a version conflict.

## 62. 422 Unprocessable Content

422 can communicate that the request is syntactically valid but contains semantically invalid data, depending on the API contract.

## 63. 429 Too Many Requests

429 indicates rate limiting and may include guidance such as `Retry-After`.

## 64. 5xx

5xx responses indicate server-side failure or inability to fulfill the request.

## 65. 500 Internal Server Error

500 is a generic server failure response.

## 66. 502 Bad Gateway

502 indicates that a gateway/proxy received an invalid response from an upstream server.

## 67. 503 Service Unavailable

503 indicates temporary inability to handle the request, often due to overload or maintenance.

## 68. 504 Gateway Timeout

504 indicates that a gateway/proxy did not receive a timely upstream response.

## 69. HTTP Body

A request or response body carries application data when the selected method/status semantics allow it.

## 70. JSON

JSON is a text data format commonly used between JavaScript applications and APIs.

## 71. JSON.stringify

`JSON.stringify()` converts supported JavaScript values into a JSON string.

## 72. JSON.parse

`JSON.parse()` converts a valid JSON string into JavaScript data.

## 73. JSON Limitations

JSON does not preserve every JavaScript value or type. For example, functions and `undefined` do not serialize like ordinary JSON values.

## 74. Fetch Basics

```js
const response = await fetch("https://example.com/api/users");
const data = await response.json();
```

## 75. Fetch HTTP Errors

Fetch generally resolves when an HTTP response is received, including statuses such as 404. Check `response.ok` or `response.status` yourself.

## 76. Correct Fetch Pattern

```js
async function getUsers() {
  const response = await fetch("/api/users");
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}
```

## 77. Network Failure

A network-level failure can cause Fetch to reject, unlike an ordinary HTTP error response.

## 78. DNS Failure

If a hostname cannot be resolved, the client cannot establish communication with the intended host.

## 79. TCP

TCP is a reliable, ordered byte-stream transport protocol commonly associated with HTTP/1.1 and HTTP/2 connections.

## 80. QUIC

QUIC is a modern transport protocol built over UDP that provides reliable streams and is used by HTTP/3.

## 81. TLS

TLS provides encrypted and authenticated communication for HTTPS and secure variants of other protocols.

## 82. HTTPS

HTTPS is HTTP carried over a TLS-protected connection.

## 83. Certificate

TLS certificates help authenticate the server's identity within the browser's trust model.

## 84. DNS

DNS maps domain names to network addresses through a distributed naming system.

## 85. DNS Is Not HTTP

DNS resolves names before application communication can proceed; it is a separate protocol and subsystem.

## 86. DNS Caching

Browsers, operating systems, resolvers, and networks can cache DNS answers for periods controlled by DNS records and resolver policy.

## 87. Connection Reuse

Modern browsers can reuse network connections for compatible requests, reducing connection setup overhead.

## 88. HTTP/1.1

HTTP/1.1 commonly uses persistent TCP connections but has request/response characteristics that can create limitations compared with newer HTTP versions.

## 89. HTTP/2

HTTP/2 introduces multiplexed streams over a connection and binary framing, reducing some inefficiencies of HTTP/1.1.

## 90. HTTP/3

HTTP/3 uses HTTP semantics over QUIC and UDP, providing stream multiplexing without TCP's transport-level head-of-line blocking behavior.

## 91. Multiplexing

Multiplexing allows multiple logical streams to share a connection instead of requiring an independent connection for every resource.

## 92. Latency

Latency is the time involved in communication and processing before useful data becomes available.

## 93. Bandwidth

Bandwidth describes how much data can be transferred over a connection per unit time.

## 94. Throughput

Throughput is the actual useful transfer rate achieved by an application under current conditions.

## 95. Request Waterfall

A waterfall shows when requests start, wait, transfer data, and finish. It is essential for diagnosing slow applications.

## 96. Time to First Byte

TTFB describes the time from request initiation until the first byte of the response is received, depending on measurement definition.

## 97. Payload Size

Large payloads increase transfer, parsing, memory, and potentially rendering costs.

## 98. Compression

HTTP responses can use compression such as gzip or Brotli when supported and configured by client/server negotiation.

## 99. Content Negotiation

Clients and servers can negotiate representation characteristics such as media type and compression through HTTP headers.

## 100. REST

REST is an architectural style based on constraints such as resource-oriented interactions and stateless client-server communication.

## 101. REST Is Not CRUD

CRUD describes common data operations. REST is a broader architectural style and should not be reduced to four database verbs.

## 102. Resource

A resource is an identifiable conceptual entity exposed through an API, such as a user or note.

## 103. Resource URL

A resource-oriented API commonly uses URLs such as `/users/42` to identify a particular user resource.

## 104. Collection URL

`/users` can represent a user collection while `/users/42` represents one member.

## 105. Nested Resources

Nested URLs can express relationships, but excessive nesting can make APIs harder to use and evolve.

## 106. Statelessness

A stateless REST interaction means each request contains the information needed to process it rather than relying on hidden server-side client session state between requests.

## 107. Pagination

Pagination limits the amount of data returned by one request.

## 108. Offset Pagination

Offset pagination uses values such as `page` and `limit` or `offset` and `limit`.

## 109. Cursor Pagination

Cursor pagination uses a position token representing where the next page should continue and can behave better for changing large datasets.

## 110. Cursor Example

```text
GET /notes?limit=20
        ↓
nextCursor = abc123
        ↓
GET /notes?limit=20&cursor=abc123
```

## 111. Pagination Pitfall

Offset pagination can skip or duplicate records when the underlying collection changes between requests.

## 112. Filtering

Filtering narrows results using query parameters such as `?status=active`.

## 113. Sorting

Sorting lets clients request an ordering such as `?sort=-createdAt` when the API supports it.

## 114. Field Selection

Field selection can reduce payload size when an API allows clients to request only needed fields.

## 115. Versioning

APIs may evolve through URL versions, media-type negotiation, headers, compatibility layers, or other strategies.

## 116. Backward Compatibility

Network clients and servers often evolve independently, so API contracts should avoid unnecessary breaking changes.

## 117. API Contract

An API contract defines expected request shapes, response shapes, status codes, errors, authentication, and behavior.

## 118. Schema Validation

Validate untrusted API responses before treating them as trusted application state, especially across independent deployments.

## 119. CORS

Cross-Origin Resource Sharing is a browser security mechanism that uses server-provided headers to allow selected cross-origin access.

## 120. Same-Origin Policy

The Same-Origin Policy restricts scripts from freely reading resources across different origins.

## 121. Origin

An origin is generally the combination of scheme, host, and port.

## 122. Same-Origin Example

`https://example.com/a` and `https://example.com/b` have the same origin because their scheme, host, and port match.

## 123. Cross-Origin Example

`https://example.com` and `https://api.example.com` are different origins because their hosts differ.

## 124. CORS Response Headers

Headers such as `Access-Control-Allow-Origin` tell browsers which origins may access a response through browser APIs.

## 125. CORS Is Not Authentication

CORS controls browser read access. It does not replace authentication or authorization on the server.

## 126. CORS Is Not a Server Firewall

CORS does not prevent non-browser clients from sending requests. Server-side authorization remains mandatory.

## 127. Simple CORS Requests

Some cross-origin requests can proceed without a browser preflight depending on method, headers, and content type.

## 128. Preflight

A browser can send an OPTIONS preflight request before a cross-origin request that requires permission negotiation.

## 129. Preflight Mental Model

```text
Browser
  ↓ OPTIONS
Server
  ↓ allowed methods/headers/origin
Browser
  ↓ actual request
Server
```

## 130. Credentialed CORS

Credentialed cross-origin requests require careful server configuration and cannot simply use a wildcard origin with credentials.

## 131. Cookies

Cookies are browser-managed pieces of state associated with a domain/path and governed by attributes such as Secure, HttpOnly, and SameSite.

## 132. HttpOnly

An HttpOnly cookie cannot be read by ordinary JavaScript, reducing direct script access to that cookie value.

## 133. Secure Cookie

A Secure cookie is sent only over secure transport under applicable cookie rules.

## 134. SameSite

SameSite controls when cookies participate in cross-site requests and is an important CSRF defense layer.

## 135. Cookie Authentication

Cookie-based sessions can be a strong architecture when paired with correct CSRF and cookie security controls.

## 136. Bearer Token Authentication

Bearer tokens are sent as credentials, commonly through an Authorization header. Whoever possesses a bearer token can generally use it within its scope.

## 137. Authentication vs Authorization

Authentication answers “who are you?” Authorization answers “what are you allowed to do?”

## 138. Access Token

An access token is a credential used to access protected resources for a limited scope or lifetime.

## 139. Refresh Token

A refresh token can be used in some authentication architectures to obtain new access tokens without repeatedly collecting user credentials.

## 140. Token Storage

Choose token storage based on the threat model. Script-readable storage can increase the impact of XSS; HttpOnly cookies reduce direct JavaScript access but require CSRF-aware design.

## 141. CSRF

Cross-Site Request Forgery abuses ambient credentials such as cookies to cause unintended state-changing requests.

## 142. XSS

Cross-Site Scripting allows injected script to execute in an application's origin and can compromise sensitive client-side data and actions.

## 143. CSRF vs XSS

```text
CSRF → attacker causes authenticated action
XSS  → attacker executes script in trusted origin
```

## 144. HTTPS Does Not Prevent XSS

HTTPS protects transport confidentiality/integrity; it does not make unsafe DOM injection secure.

## 145. Fetch Credentials

Fetch supports credential modes such as `same-origin`, `include`, and `omit`, subject to browser and cookie rules.

## 146. Authorization Header Example

```js
fetch("/api/me", {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});
```

Do not expose sensitive tokens unnecessarily.

## 147. Timeout Problem

A network request can remain pending longer than the user should reasonably wait.

## 148. Abort Timeout

Use AbortController or AbortSignal timeout facilities where supported to enforce application-level cancellation.

## 149. Retry

Retry means attempting a failed operation again according to a deliberate policy.

## 150. Retry Only When Appropriate

Do not blindly retry every failure. Consider method semantics, status code, error type, server load, and user intent.

## 151. Exponential Backoff

Backoff increases delay between retries to reduce pressure on an unavailable service.

## 152. Jitter

Randomized jitter prevents many clients from retrying simultaneously after the same outage.

## 153. Retry-After

Servers can communicate a suggested retry delay through the `Retry-After` response header in applicable situations.

## 154. Idempotency Keys

For operations that may be retried but are not naturally idempotent, an idempotency key can allow the server to recognize duplicate attempts.

## 155. Retry Example Policy

```text
attempt 1 → immediate
attempt 2 → short backoff
attempt 3 → longer backoff
attempt 4 → stop
```

The exact policy should depend on the service and operation.

## 156. Race Condition

A race can occur when multiple requests finish in an order different from the order in which the user initiated them.

## 157. Search Race Example

```text
User types: r
  request A
User types: ra
  request B
User types: rav
  request C

If A finishes last, stale results can overwrite C.
```

## 158. Preventing Search Races

Use cancellation, request IDs, or state libraries that track the latest request.

## 159. Request ID Pattern

```js
let latest = 0;

async function search(query) {
  const id = ++latest;
  const data = await fetch(`/search?q=${encodeURIComponent(query)}`)
    .then(r => r.json());
  if (id !== latest) return;
  render(data);
}
```

## 160. Abort Pattern

Abort stale network work when cancellation is supported and no longer-needed data should not consume resources.

## 161. Debouncing Search

Debouncing delays a request until input has stopped changing for a configured period.

## 162. Throttling

Throttling limits how frequently an operation runs within a time window.

## 163. Debounce vs Throttle

```text
Debounce  → wait for quiet period
Throttle  → allow at controlled intervals
```

## 164. Network Concurrency

Too many simultaneous requests can increase server load, browser work, memory usage, and contention.

## 165. Concurrency Limit

A client can cap the number of simultaneous requests for expensive batch operations.

## 166. Request Deduplication

If multiple components request identical data simultaneously, a shared Promise/cache can prevent duplicate network calls.

## 167. Client Cache

A client cache stores useful previously fetched data to reduce latency and network usage.

## 168. Cache Invalidation

Caching introduces the problem of deciding when stored data is stale. There is no universal invalidation strategy.

## 169. Stale-While-Revalidate

A client can display cached data immediately and then fetch a newer version in the background.

## 170. Optimistic UI

Optimistic UI updates local state before server confirmation when the application can safely reconcile success and failure.

## 171. Optimistic UI Failure

If the server rejects the operation, rollback or reconcile the optimistic state with authoritative server state.

## 172. Pessimistic UI

Pessimistic UI waits for server confirmation before showing a state-changing result.

## 173. When Optimistic UI Fits

It works best for predictable, reversible, low-risk actions where latency matters.

## 174. When Pessimistic UI Fits

Use confirmation-first behavior when operations are high-risk, irreversible, or dependent on authoritative server decisions.

## 175. File Upload

Use multipart/form-data through FormData for common browser file-upload workflows.

## 176. Upload Example

```js
const form = new FormData();
form.append("avatar", file);

const response = await fetch("/api/avatar", {
  method: "POST",
  body: form
});
```

## 177. Do Not Manually Set Multipart Boundary

When Fetch sends FormData, let the browser generate the multipart content type and boundary.

## 178. Upload Validation

Validate file size, content, type, extension policy, authorization, and storage rules on the server.

## 179. Download

A download transfers resource bytes from a server to the client for display, storage, or processing.

## 180. Download Blob

```js
const response = await fetch("/report.pdf");
if (!response.ok) throw new Error("Download failed");
const blob = await response.blob();
```

## 181. Object URL Download

A Blob can be represented by an object URL for client-side preview or download, and that URL should be revoked when appropriate.

## 182. Streaming

Streaming allows data to be processed incrementally rather than waiting for the entire body.

## 183. ReadableStream

A `ReadableStream` exposes chunks that can be consumed asynchronously.

## 184. Backpressure

Backpressure allows consumers to influence the pace of producers in streaming pipelines.

## 185. TransformStream

A `TransformStream` represents a transformation pipeline from writable input to readable output.

## 186. WritableStream

A `WritableStream` represents an asynchronous destination for chunks.

## 187. NDJSON

Newline-delimited JSON can represent a sequence of independent JSON objects that can be processed incrementally.

## 188. Streaming UI

Streaming can improve perceived responsiveness when a server produces useful partial output over time.

## 189. WebSocket

WebSocket provides a persistent, bidirectional communication channel after connection establishment.

## 190. WebSocket Lifecycle

```text
CONNECTING
   ↓
 OPEN
 ↙   ↘
message error
   ↓
 CLOSING
   ↓
 CLOSED
```

## 191. WebSocket Events

Common events include `open`, `message`, `error`, and `close`.

## 192. WebSocket Send

```js
const socket = new WebSocket("wss://example.com/socket");
socket.addEventListener("open", () => {
  socket.send(JSON.stringify({ type: "hello" }));
});
```

## 193. WebSocket Close

Close sockets when the feature is no longer needed and handle remote closure correctly.

## 194. WebSocket Reconnect

Use bounded exponential backoff with jitter rather than reconnecting in a tight loop.

## 195. WebSocket Authentication

Authenticate connections and authorize every operation. A connected user is not automatically authorized for every resource.

## 196. SSE

Server-Sent Events provide a server-to-browser event stream over HTTP.

## 197. SSE vs WebSocket

```text
SSE       → server → client
WebSocket → server ↔ client
```

## 198. Choosing SSE

SSE is attractive for dashboards, notifications, progress updates, and other server-push cases where client-to-server messages can use normal HTTP.

## 199. Choosing WebSocket

Use WebSocket when low-latency bidirectional messaging is central to the application.

## 200. Polling

Polling periodically sends requests to check for changes.

## 201. Long Polling

Long polling keeps an HTTP request open until data is available or a timeout occurs, then the client reconnects.

## 202. Polling vs SSE

Polling is simple but can waste requests. SSE can provide continuous server push for supported one-way use cases.

## 203. WebRTC

WebRTC provides browser APIs for real-time peer-to-peer audio, video, and data communication.

## 204. WebRTC Signaling

Applications need a separate signaling mechanism to exchange connection setup information; WebRTC does not mandate one signaling protocol.

## 205. STUN and TURN

STUN helps discover network paths; TURN relays traffic when direct peer connectivity fails.

## 206. Network Errors

Common categories include DNS failure, connection failure, TLS failure, timeout, CORS denial, HTTP error, malformed data, and application-level error.

## 207. Error Normalization

A frontend API client should convert low-level failures into consistent application error shapes.

## 208. Error Shape

```js
{
  kind: "http",
  status: 422,
  message: "Validation failed",
  details: {}
}
```

Do not expose sensitive server internals directly to users.

## 209. HTTP Error vs Network Error

```text
HTTP error
→ server responded
→ status is 4xx/5xx

Network error
→ usable HTTP response was not obtained
```

## 210. Parse Error

A successful HTTP response can still contain invalid JSON or unexpected content.

## 211. Content-Type Validation

When important, inspect the response `Content-Type` before choosing how to parse the body.

## 212. Schema Validation

Runtime validation protects application state from malformed or unexpected server data.

## 213. Request Logging

In development, log request method, safe URL information, status, duration, and correlation IDs while avoiding credentials and sensitive payloads.

## 214. Correlation ID

A correlation/request ID lets frontend and backend logs refer to the same operation.

## 215. Trace Context

Distributed systems can propagate trace context so one user operation can be followed across services.

## 216. Browser Network Panel

Developer Tools can show requests, timing, headers, payloads, responses, initiators, and caching information.

## 217. Inspect Request

When debugging, inspect the exact URL, method, headers, query, body, credentials, and timing.

## 218. Inspect Response

Inspect status, headers, content type, body, redirects, and response timing.

## 219. Inspect Initiator

The Initiator/stack information can reveal which script or resource triggered a network request.

## 220. Disable Cache During Debugging

Developer tools can provide a development option to disable cache while DevTools is open; do not confuse this with normal production caching behavior.

## 221. Reproduce With curl

For suitable public/debug endpoints, reproducing an HTTP request with a CLI client can separate browser-specific behavior from server behavior.

## 222. Browser vs curl

A curl request does not reproduce all browser security behavior. In particular, browser CORS enforcement is a browser policy.

## 223. CORS Debugging

Check both the browser console and Network panel, then inspect server response headers and preflight behavior.

## 224. Preflight Debugging

Verify allowed origin, method, requested headers, credential rules, and whether the OPTIONS route responds correctly.

## 225. Cookie Debugging

Inspect cookie domain, path, Secure, HttpOnly, SameSite, expiration, and whether the request's credentials mode permits sending them.

## 226. Authentication Debugging

Check whether the client sends the intended credential, whether it is expired, whether the server validates it, and whether authorization rules allow the operation.

## 227. Retry Debugging

Log attempt count and reason, but avoid logging secret credentials or sensitive payloads.

## 228. Timeout Debugging

Measure where time is spent: DNS, connection, TLS, server processing, queueing, transfer, or client parsing.

## 229. Performance Budget

Set practical budgets for request count, payload size, latency, and client processing rather than optimizing blindly.

## 230. Avoid Request Waterfalls

Independent data requests can often start in parallel instead of waiting for one request to finish before starting another.

## 231. Promise.all

Use `Promise.all()` when independent requests must all succeed before continuing.

## 232. Promise.allSettled

Use `Promise.allSettled()` when independent results should be collected even if some operations fail.

## 233. Parallel vs Sequential

```text
Sequential: A → B → C
Parallel:   A ─┐
             B ─┼→ continue
             C ─┘
```

## 234. Do Not Parallelize Dependencies

If request B needs data from A, starting B before A is available may be impossible or incorrect.

## 235. HTTP Caching

HTTP caching can reduce network traffic and latency by reusing valid stored responses.

## 236. Cache-Control max-age

`max-age` can specify how long a response is considered fresh relative to caching rules.

## 237. no-store

`Cache-Control: no-store` tells caches not to store the response under the directive's semantics.

## 238. no-cache

`no-cache` does not necessarily mean “never store.” It generally means stored responses must be revalidated before reuse.

## 239. Private vs Public

`private` restricts a response from shared caches in ways appropriate for user-specific content; `public` permits shared caching when other rules allow it.

## 240. Cache Key

A cache uses request properties and HTTP caching rules to determine whether a stored response matches a request.

## 241. Vary

The `Vary` response header indicates which request headers affect representation selection and therefore caching.

## 242. CDN

A Content Delivery Network caches and serves content from geographically distributed edge locations.

## 243. CDN Benefits

CDNs can reduce latency, absorb traffic, improve availability, and offload origin servers for cacheable resources.

## 244. CDN Limitation

Dynamic personalized responses often have more limited caching opportunities and require careful cache-key and privacy design.

## 245. Rate Limiting

Rate limiting protects services from excessive traffic and helps enforce usage policies.

## 246. Client Response to 429

Honor server guidance such as Retry-After where appropriate and avoid aggressive retry loops.

## 247. Circuit Breaker Concept

A circuit breaker temporarily stops requests to a failing dependency so the application can recover and avoid wasting resources.

## 248. Bulkhead Concept

Bulkheads isolate resource pools so failure in one dependency or workload does not consume all available capacity.

## 249. Graceful Degradation

When a network dependency fails, provide cached data, partial functionality, retry options, or an informative fallback when possible.

## 250. Offline Awareness

Offline state is useful for UX, but `navigator.onLine` is only a hint and does not prove that an API server is reachable.

## 251. Service Worker Networking

Service workers can intercept fetch events within their scope and implement caching/offline strategies.

## 252. Cache API vs HTTP Cache

Application-managed Cache API storage is different from the browser's ordinary HTTP cache.

## 253. Offline Queue

Offline-capable applications can queue safe-to-retry operations and synchronize them later, but conflict and duplicate processing must be designed explicitly.

## 254. Conflict Resolution

When local and server state diverge, define authoritative sources, timestamps/versions, merge rules, and user-visible conflict behavior.

## 255. Optimistic Concurrency

Version fields or ETags can detect whether a resource changed between read and update.

## 256. If-Match

`If-Match` can require a request to apply only when the resource matches an expected ETag, supporting optimistic concurrency.

## 257. Lost Update

A lost update happens when one client's change unintentionally overwrites another client's newer change.

## 258. Preventing Lost Updates

Use server-side concurrency checks such as versions/ETags and reject or reconcile stale updates.

## 259. API Gateway

An API gateway can centralize routing, authentication integration, rate limiting, observability, and other cross-cutting concerns.

## 260. Reverse Proxy

A reverse proxy sits between clients and backend services and can terminate TLS, route requests, cache content, or apply policy.

## 261. Load Balancer

A load balancer distributes traffic across multiple backend instances or targets.

## 262. Horizontal Scaling

Horizontal scaling adds more service instances rather than making one instance indefinitely larger.

## 263. Sticky Sessions

Sticky sessions route a client repeatedly to the same backend, but they can reduce flexibility and complicate scaling. Stateless designs are often preferable.

## 264. Network Architecture

```text
Browser
  ↓ HTTPS
CDN / Reverse Proxy
  ↓
API Gateway / Load Balancer
  ↓
Application Service
  ↓
Database / Cache / Queue
```

## 265. Queue-Based Architecture

A queue can decouple request handling from long-running background processing.

## 266. 202 + Job Pattern

For long operations, an API may return 202 with a job identifier, then expose status through another endpoint.

## 267. Webhook

A webhook is a server-to-server callback where one service sends an HTTP request to another when an event occurs.

## 268. Webhook Security

Verify signatures, authenticate senders, prevent replay, validate payloads, and make handlers idempotent.

## 269. Polling a Job

A client can poll a job-status endpoint with controlled intervals and stop when the operation reaches a terminal state.

## 270. Long-Running Requests

Do not keep a browser request open indefinitely when a job architecture better matches the operation.

## 271. Request Cancellation

Cancellation saves bandwidth, CPU, memory, and server work when a result is no longer needed, although cancellation cannot guarantee that server-side work has stopped.

## 272. AbortController Example

```js
const controller = new AbortController();

const promise = fetch("/api/data", {
  signal: controller.signal
});

controller.abort();
```

## 273. Cancellation Is Not Rollback

Canceling a client request does not automatically undo a server-side mutation that already happened.

## 274. Duplicate Submission

Users can click Submit repeatedly or a client can retry after an uncertain network result. Server-side idempotency is essential for important mutations.

## 275. At-Least-Once Delivery

Retries and distributed messaging often mean an operation can be delivered more than once, so consumers should tolerate duplicates where necessary.

## 276. Exactly-Once Myth

“Exactly once” is difficult in distributed systems. Application-level idempotency and deduplication are usually more practical guarantees.

## 277. Security: Validate Server Input

Never trust data merely because it originated from your own frontend. Attackers can call APIs directly.

## 278. Security: Authorization Server-Side

A hidden button or disabled UI is not authorization. The server must enforce access control.

## 279. Security: SSRF

Server-side applications must prevent attackers from abusing server network access to reach internal resources.

## 280. Security: Request Smuggling

HTTP intermediaries must parse requests consistently. Misconfiguration can create request-smuggling vulnerabilities.

## 281. Security: TLS Validation

Never disable certificate validation merely to “fix” a TLS problem in production.

## 282. Security: Mixed Content

HTTPS pages should not load insecure HTTP resources in ways blocked by browser mixed-content policy.

## 283. Security: Sensitive Logs

Never log passwords, session cookies, authorization headers, refresh tokens, or other secrets.

## 284. Security: URL Secrets

Avoid putting sensitive credentials in URLs because URLs can leak through logs, history, analytics, referrers, and other systems.

## 285. Security: Open Redirects

Do not blindly redirect users to arbitrary URLs supplied by untrusted input.

## 286. Security: Redirect Credentials

Be careful about credential exposure across redirects and cross-origin requests.

## 287. Security: JSONP

JSONP is an old cross-origin technique based on script execution and should generally be replaced by modern CORS/fetch patterns.

## 288. Security: Content Security Policy

CSP can restrict script and resource sources and reduce the impact of some XSS classes when correctly configured.

## 289. Security: HSTS

HTTP Strict Transport Security instructs compatible browsers to prefer HTTPS for a domain for a configured period.

## 290. Security: Certificate Transparency

Modern public TLS certificates participate in certificate-transparency ecosystems that improve ecosystem visibility.

## 291. Architecture: API Client Layer

Keep repetitive network concerns such as base URLs, headers, parsing, errors, cancellation, and tracing in a reusable layer.

## 292. Architecture: Feature Layer

Feature code should express business intent rather than duplicate low-level HTTP mechanics everywhere.

## 293. Architecture: Repository Layer

A repository/service abstraction can isolate data-access details from UI code, although unnecessary abstraction should be avoided in small applications.

## 294. Architecture: Query Cache

A query/cache layer can manage server state, deduplication, stale data, retries, pagination, and invalidation more consistently than ad hoc component code.

## 295. Architecture: Server State vs UI State

Server state is remote, asynchronous, cacheable, and shared. UI state is local interaction state such as open dialogs or input values. They deserve different management strategies.

## 296. API Client Example

```js
async function api(path, options = {}) {
  const response = await fetch(path, options);
  const contentType = response.headers.get("content-type") ?? "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw { status: response.status, body };
  }

  return body;
}
```

## 297. API Client Improvement

Production clients should also consider cancellation, timeout, authentication, schema validation, retry policy, observability, and consistent error types.

## 298. Do Not Hide HTTP Semantics

An abstraction should simplify repetitive mechanics without making important status codes, headers, cancellation, or errors impossible to understand.

## 299. Wrong: Blind JSON Parsing

```js
const data = await fetch("/api/data").then(r => r.json());
```

This assumes both a successful status and JSON body.

## 300. Correct: Validate Response

```js
const response = await fetch("/api/data");
if (!response.ok) throw new Error(`HTTP ${response.status}`);

const type = response.headers.get("content-type") ?? "";
if (!type.includes("application/json")) {
  throw new Error("Expected JSON");
}

const data = await response.json();
```

## 301. Wrong: Retry Everything

```js
while (true) {
  try {
    await fetch("/api/payment", { method: "POST" });
    break;
  } catch {}
}
```

This can duplicate mutations and overload the server.

## 302. Correct: Deliberate Retry Policy

Retry only operations and failures that are safe to retry, use bounded attempts, backoff, jitter, and idempotency controls where necessary.

## 303. Wrong: Trust Frontend Authorization

```js
if (user.isAdmin) {
  showDeleteButton();
}
```

A UI check does not protect the API.

## 304. Correct: Server Authorization

The server must verify the authenticated identity and authorization for every protected mutation or resource.

## 305. Wrong: Expose Token in URL

```js
fetch(`/download?token=${accessToken}`);
```

Sensitive credentials can leak through URLs and surrounding infrastructure.

## 306. Correct: Use Appropriate Credential Transport

Use a security-reviewed authentication architecture such as HttpOnly cookies or appropriate authorization headers, depending on the application threat model.

## 307. Wrong: Unlimited WebSocket Reconnect

```js
socket.onclose = () => connect();
```

This can create a tight reconnect storm.

## 308. Correct: Backoff

Use bounded exponential backoff with jitter and stop reconnecting when the application no longer needs the connection.

## 309. Wrong: Ignore Stale Search Results

```js
const data = await fetch(`/search?q=${query}`).then(r => r.json());
render(data);
```

Earlier requests can finish after later requests.

## 310. Correct: Cancel or Track Requests

Use AbortController or a request sequence identifier so stale results cannot overwrite newer state.

## 311. Common Mistake: Treating CORS as Backend Security

CORS protects browser-based reads. It does not replace authentication, authorization, input validation, or network-layer access controls.

## 312. Common Mistake: Assuming 401 Means “No Permission”

401 is primarily about missing/invalid authentication; 403 is used when the server refuses authorization for an understood request.

## 313. Common Mistake: Sending Secrets to Logs

Network debugging should never become a reason to record authorization headers, cookies, passwords, or refresh tokens.

## 314. Common Mistake: No Loading State

Users need explicit UI feedback while network operations are pending, especially for actions that can take noticeable time.

## 315. Common Mistake: No Empty State

A successful request can return zero records. Empty data is not necessarily an error.

## 316. Common Mistake: No Error State

Every network-dependent feature needs a meaningful failure state and recovery path where possible.

## 317. Common Mistake: No Cancellation

Components or pages that initiate requests should consider whether work remains relevant after navigation or input changes.

## 318. Common Mistake: Sequential Independent Requests

Avoid unnecessary waterfalls when independent requests can run concurrently.

## 319. Common Mistake: Giant JSON

Do not return thousands of records when pagination, filtering, projection, or streaming can provide only the data needed.

## 320. Common Mistake: Client-Only Validation

Client validation improves UX but does not protect an API from malicious requests.

## 321. Testing Network Code

Use unit tests for request-building and error normalization, integration tests for API contracts, and end-to-end tests for critical user flows.

## 322. Mocking Network Calls

Mocking can isolate UI logic, but tests should also exercise real contract behavior to avoid false confidence.

## 323. Contract Testing

Contract tests verify that clients and servers agree on request and response shapes and semantics.

## 324. End-to-End Network Test

Test critical paths such as login, refresh, CRUD, upload, error recovery, and navigation cancellation against realistic environments.

## 325. Load Testing

Load testing measures system behavior under expected and stressful traffic patterns.

## 326. Stress Testing

Stress testing pushes a system beyond normal conditions to identify failure modes and recovery behavior.

## 327. Observability

A production network system should expose logs, metrics, traces, error rates, latency distributions, throughput, and dependency health.

## 328. Latency Percentiles

p50, p95, and p99 latency reveal tail behavior that averages can hide.

## 329. Error Rate

Monitor errors by endpoint, status class, dependency, client version, and relevant dimensions without collecting unnecessary personal data.

## 330. Availability

Availability measures how often a service is usable according to a defined success criterion.

## 331. SLO

A Service Level Objective defines a target reliability or performance level for a service.

## 332. Network Budget

Define practical limits for API latency, payload size, request count, and retry volume for important user flows.

## 333. Progressive Enhancement

Core application behavior should remain usable when optional networking features such as live updates or advanced offline support are unavailable.

## 334. Browser Compatibility

Check current support for advanced networking APIs and protocols and provide fallbacks where product requirements demand them.

## 335. Accessibility and Network State

Do not communicate loading or failure only through color. Use accessible status text, focus management, and appropriate live-region behavior where needed.

## 336. Network State UI

A robust data screen usually has at least these states:

```text
idle
 ↓
loading
 ├── success → data / empty
 └── failure → error + retry
```

## 337. Refreshing State

Distinguish initial loading from background refreshing so existing useful data does not unnecessarily disappear.

## 338. Optimistic Mutation State

Track pending mutations explicitly so users know whether an action is local-only, awaiting confirmation, succeeded, or failed.

## 339. Pagination UI

Disable or guard duplicate “load more” operations and stop when the server indicates there is no next page.

## 340. Network-Aware UX

Design for slow, fast, flaky, offline, and high-latency connections rather than testing only on localhost.

## 341. Mini Project: REST Client

Build a reusable client supporting GET, POST, PATCH, DELETE, JSON parsing, normalized errors, cancellation, and loading/error states.

## 342. Mini Project: Paginated Notes

Build a notes list with cursor pagination, search debounce, request cancellation, empty state, error retry, and optimistic favorite toggling.

## 343. Mini Project: File Upload

Build a file upload UI with FormData, preview, validation, progress-friendly UX, cancellation, retry policy, and server validation documentation.

## 344. Mini Project: API Cache

Implement a small cache with TTL, request deduplication, stale-while-revalidate behavior, and explicit invalidation.

## 345. Mini Project: Live Dashboard

Build a dashboard using SSE or WebSocket and handle connection state, reconnection, stale data, and cleanup.

## 346. Mini Project: Offline Queue

Build a small offline-capable mutation queue with IndexedDB, retry backoff, idempotency keys, and conflict handling.

## 347. Advanced Project: Production API Layer

Create a complete client layer with base configuration, authentication, refresh behavior, cancellation, timeout, retry rules, schema validation, correlation IDs, metrics hooks, and consistent error types.

## 348. Advanced Project: Real-Time Collaboration

Build a collaborative notes feature with WebSocket updates, optimistic UI, version checks, conflict handling, reconnection, and offline recovery.

## 349. Advanced Project: Large File Transfer

Design a resumable upload system with chunking, checksums, retryable chunks, cancellation, server-side validation, and finalization.

## 350. Advanced Project: Job Processing

Build a job API returning 202 + job ID, then implement status polling or SSE, cancellation where supported, progress display, retry, and terminal error handling.

## 351. Beginner Practice

1. Explain URL anatomy.
2. Write a GET Fetch request.
3. Check `response.ok`.
4. Parse JSON.
5. Send JSON with POST.
6. Build query parameters with URLSearchParams.
7. Explain 401 vs 403.
8. Explain 404 vs 500.
9. Abort a Fetch request.
10. Explain CORS.

## 352. Intermediate Practice

1. Build cursor pagination.
2. Implement debounce + cancellation.
3. Implement retry with backoff.
4. Add request deduplication.
5. Build a normalized API error.
6. Build an upload flow.
7. Add optimistic UI rollback.
8. Build SSE updates.
9. Build WebSocket reconnection.
10. Design offline recovery.

## 353. Advanced Practice

1. Design an idempotent payment submission flow.
2. Design cache invalidation.
3. Design a resumable upload protocol.
4. Design optimistic concurrency with ETags.
5. Threat-model cookie authentication.
6. Design an API gateway.
7. Design retry budgets.
8. Analyze a network waterfall.
9. Design real-time conflict resolution.
10. Build a production observability plan.

## 354. Interview: Fetch

**Question:** Does Fetch reject on 404?

**Answer:** Normally no. The Promise resolves with the HTTP response; application code checks `ok` or `status`.

## 355. Interview: CORS

**Question:** What is CORS?

**Answer:** A browser-enforced mechanism using server response headers to permit selected cross-origin access.

## 356. Interview: Preflight

**Question:** Why does a browser send OPTIONS?

**Answer:** Some cross-origin requests require a preflight so the browser can verify allowed origin, method, and headers before sending the actual request.

## 357. Interview: Cookies

**Question:** Why use HttpOnly?

**Answer:** It prevents ordinary JavaScript from directly reading the cookie value, reducing direct credential theft through script access.

## 358. Interview: CSRF

**Question:** How does SameSite help?

**Answer:** SameSite limits when cookies are sent in cross-site contexts, reducing some CSRF attack paths.

## 359. Interview: Retry

**Question:** Should every failed request be retried?

**Answer:** No. Retryability depends on failure type, method semantics, idempotency, server load, user intent, and backoff policy.

## 360. Interview: WebSocket

**Question:** Why use WebSocket instead of polling?

**Answer:** For ongoing bidirectional communication where maintaining a connection is more efficient and responsive than repeated requests.

## 361. Interview: SSE

**Question:** When is SSE preferable?

**Answer:** When the primary requirement is a server-to-browser event stream and normal HTTP is sufficient for client-to-server actions.

## 362. Interview: HTTP/2

**Question:** What problem does HTTP/2 multiplexing address?

**Answer:** It allows multiple logical streams over a connection, reducing some request/connection overhead and HTTP/1.1 limitations.

## 363. Interview: HTTP/3

**Question:** What transport does HTTP/3 use?

**Answer:** QUIC over UDP, with HTTP semantics mapped onto QUIC streams.

## 364. Interview: Idempotency

**Question:** Why are idempotency keys useful?

**Answer:** They let a server recognize repeated attempts for operations where network uncertainty could otherwise create duplicate effects.

## 365. Interview: Cancellation

**Question:** Does AbortController guarantee server-side rollback?

**Answer:** No. It cancels the client's supported operation; server-side work may already have happened.

## 366. Teach-Back: Complete Request

Draw the journey from `fetch()` through URL resolution, DNS, transport/TLS, HTTP, server processing, response, parsing, and UI state.

## 367. Teach-Back: CORS

Explain Same-Origin Policy, origin, simple requests, preflight, credentials, and why CORS is not server authorization.

## 368. Teach-Back: Authentication

Explain sessions/cookies, HttpOnly, Secure, SameSite, bearer tokens, CSRF, XSS, and server-side authorization.

## 369. Teach-Back: Reliability

Explain timeout, cancellation, retry, backoff, jitter, idempotency, duplicate submission, and stale requests.

## 370. Teach-Back: Performance

Explain latency, bandwidth, TTFB, payload size, caching, CDN, compression, request waterfalls, concurrency, and streaming.

## 371. Teach-Back: Real-Time

Choose between polling, long polling, SSE, WebSocket, and WebRTC for five real application requirements.

## 372. Mastery: Protocol Fundamentals

- [ ] I can explain URL anatomy.
- [ ] I understand HTTP request/response structure.
- [ ] I know major methods and status classes.
- [ ] I understand DNS, TCP/QUIC, and TLS at a high level.

## 373. Mastery: Fetch

- [ ] I check `response.ok`.
- [ ] I distinguish network errors from HTTP errors.
- [ ] I can parse JSON/text/blob correctly.
- [ ] I can cancel requests.

## 374. Mastery: API Design

- [ ] I understand resources and HTTP semantics.
- [ ] I can design pagination.
- [ ] I understand API contracts.
- [ ] I can explain idempotency.

## 375. Mastery: CORS and Security

- [ ] I understand Same-Origin Policy.
- [ ] I understand CORS and preflight.
- [ ] I can explain CSRF vs XSS.
- [ ] I understand server-side authorization.

## 376. Mastery: Authentication

- [ ] I understand cookie security attributes.
- [ ] I understand bearer tokens.
- [ ] I can reason about token storage.
- [ ] I do not put secrets in URLs or logs.

## 377. Mastery: Reliability

- [ ] I can design bounded retries.
- [ ] I understand backoff and jitter.
- [ ] I can handle stale requests.
- [ ] I understand cancellation is not rollback.

## 378. Mastery: Performance

- [ ] I can analyze a network waterfall.
- [ ] I understand caching.
- [ ] I can avoid unnecessary waterfalls.
- [ ] I understand payload and latency budgets.

## 379. Mastery: Real-Time

- [ ] I can compare polling, SSE, WebSocket, and WebRTC.
- [ ] I can design reconnect behavior.
- [ ] I understand duplicate and stale messages.

## 380. Mastery: Production Architecture

- [ ] I can design an API client layer.
- [ ] I can normalize errors.
- [ ] I can add observability without leaking secrets.
- [ ] I can design offline and degraded states.

# Final Networking Mental Model

```text
                 ┌──────────────┐
                 │ JavaScript UI│
                 └──────┬───────┘
                        │
                 Fetch / WS / SSE
                        │
                 ┌──────▼───────┐
                 │ Browser      │
                 │ security     │
                 │ cache        │
                 │ networking   │
                 └──────┬───────┘
                        │
              DNS → TLS → HTTP/QUIC
                        │
                 ┌──────▼───────┐
                 │ Server/API    │
                 └──────┬───────┘
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
       Database       Cache          Queue
          │             │             │
          └─────────────┴─────────────┘
```

# Final Networking Challenge

Build a **production-style Notes Networking Layer**.

Requirements:

1. Create a reusable Fetch client.
2. Support GET/POST/PATCH/DELETE.
3. Normalize HTTP and network errors.
4. Validate response content types.
5. Add request cancellation.
6. Add timeout behavior.
7. Implement cursor pagination.
8. Add debounced search.
9. Prevent stale search results.
10. Add bounded retry with exponential backoff and jitter.
11. Use idempotency for a mutation that may be retried.
12. Implement optimistic favorite updates with rollback.
13. Add client-side request deduplication.
14. Add a small cache with explicit invalidation.
15. Implement an offline/read-only fallback.
16. Add file upload using FormData.
17. Build a live update channel with SSE or WebSocket.
18. Implement reconnect behavior.
19. Add correlation IDs to requests/logging.
20. Inspect and optimize the complete Network-panel waterfall.
21. Document CORS, authentication, CSRF, XSS, and authorization decisions.
22. Never trust client-side authorization or validation.
23. Add loading, empty, success, refreshing, and failure UI states.
24. Write tests for success, HTTP errors, network failures, cancellation, retries, stale results, and malformed responses.
25. Explain every networking decision in your README.

**Mastery standard:** You are not finished when you can call an API. You are finished when you can reason about **protocols, HTTP semantics, browser security, authentication, caching, failure, cancellation, retries, concurrency, real-time communication, performance, observability, and API architecture** and can build a network layer that remains correct when the network is slow, unreliable, duplicated, unavailable, or under attack.
