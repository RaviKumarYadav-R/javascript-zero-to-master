//* ============================================================
//* JAVASCRIPT NETWORKING — PRACTICAL COMPANION
//* ============================================================

//* Definition:
//* Networking is how applications exchange data across processes, devices,
//* networks and servers. In browser JavaScript, networking commonly means
//* using HTTP-based APIs through Fetch and related Web Platform interfaces.
//*
//* Mental model:
//* Browser -> DNS -> connection -> TLS (HTTPS) -> HTTP request -> server
//*        <- HTTP response <---------------------------------------------
//*
//* JavaScript does not itself define HTTP, TCP, DNS or TLS. These are platform
//* and networking technologies that browser APIs expose to application code.


//* ------------------------------------------------------------
//* 1. REQUEST / RESPONSE
//* ------------------------------------------------------------

//* Request usually contains:
//* - method
//* - URL
//* - headers
//* - optional body
//*
//* Response usually contains:
//* - status
//* - headers
//* - body

async function getProfile() {
  const response = await fetch("/api/profile");

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}


//* ------------------------------------------------------------
//* 2. COMMON HTTP METHODS
//* ------------------------------------------------------------

//* GET    -> retrieve a representation/resource
//* POST   -> submit data, often create or trigger an operation
//* PUT    -> replace a resource representation
//* PATCH  -> partially modify a resource
//* DELETE -> remove a resource
//* HEAD   -> headers without a response body
//* OPTIONS-> discover communication options / CORS preflight use


//* ------------------------------------------------------------
//* 3. HTTP STATUS CATEGORIES
//* ------------------------------------------------------------

//* 1xx -> informational
//* 2xx -> successful
//* 3xx -> redirection
//* 4xx -> client/request-related error
//* 5xx -> server-side error

function classifyStatus(status) {
  if (status >= 200 && status < 300) return "success";
  if (status >= 300 && status < 400) return "redirect";
  if (status >= 400 && status < 500) return "client error";
  if (status >= 500) return "server error";
  return "informational/unknown";
}

console.log(classifyStatus(201));
console.log(classifyStatus(404));


//* ------------------------------------------------------------
//* 4. REQUEST HEADERS
//* ------------------------------------------------------------

async function getPrivateData(token) {
  const response = await fetch("/api/private", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Request failed");
  return response.json();
}

//* Headers communicate metadata such as accepted formats, authorization,
//* content type, caching directives and more.


//* ------------------------------------------------------------
//* 5. JSON REQUEST
//* ------------------------------------------------------------

async function createPost(post) {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error(`Create failed: ${response.status}`);
  }

  return response.json();
}


//* ------------------------------------------------------------
//* 6. CONTENT-TYPE
//* ------------------------------------------------------------

//* Content-Type describes the media type of a request/response body.
//* Examples:
//* application/json
//* text/plain
//* text/html
//* multipart/form-data
//* application/octet-stream


//* ------------------------------------------------------------
//* 7. ACCEPT
//* ------------------------------------------------------------

//* Accept tells a server which response media types the client can process.
//* It is different from Content-Type.


//* ------------------------------------------------------------
//* 8. FETCH DOES NOT REJECT FOR 404/500
//* ------------------------------------------------------------

async function safeFetch(url) {
  const response = await fetch(url);

  //* fetch() rejects for failures such as network errors or aborts,
  //* but HTTP error statuses normally still produce a Response.
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  return response;
}


//* ------------------------------------------------------------
//* 9. RESPONSE BODY TYPES
//* ------------------------------------------------------------

async function readDifferentBodies(response) {
  //* A body is normally consumed once.
  //* Common methods include:
  //* await response.json()
  //* await response.text()
  //* await response.blob()
  //* await response.arrayBuffer()

  return response;
}


//* ------------------------------------------------------------
//* 10. RESPONSE CLONE
//* ------------------------------------------------------------

async function consumeTwice(response) {
  const copy = response.clone();
  const first = await response.text();
  const second = await copy.text();

  return { first, second };
}


//* ------------------------------------------------------------
//* 11. QUERY PARAMETERS
//* ------------------------------------------------------------

function buildSearchUrl(search, page = 1) {
  const url = new URL("https://example.com/api/search");
  url.searchParams.set("q", search);
  url.searchParams.set("page", String(page));
  return url.toString();
}

console.log(buildSearchUrl("javascript", 2));


//* ------------------------------------------------------------
//* 12. URL ENCODING
//* ------------------------------------------------------------

const userInput = "JavaScript & APIs";
console.log(encodeURIComponent(userInput));

//* Prefer URLSearchParams/URL for query-string construction when possible.


//* ------------------------------------------------------------
//* 13. HTTP CACHE CONCEPT
//* ------------------------------------------------------------

//* Browsers can cache HTTP responses according to response/request cache directives.
//* Application code can also use Cache API for explicit Request/Response storage.
//* These are related but not the same caching mechanism.


//* ------------------------------------------------------------
//* 14. CACHE-CONTROL CONCEPT
//* ------------------------------------------------------------

//* Cache-Control can communicate caching rules such as max-age, no-cache,
//* no-store and public/private behavior.
//* Exact behavior depends on the complete HTTP caching model.


//* ------------------------------------------------------------
//* 15. ETAG / CONDITIONAL REQUEST CONCEPT
//* ------------------------------------------------------------

//* A server can send an ETag representing a selected representation version.
//* A client may later send If-None-Match to ask whether the representation changed.
//* A matching validator can allow a 304 Not Modified response.


//* ------------------------------------------------------------
//* 16. LAST-MODIFIED CONCEPT
//* ------------------------------------------------------------

//* Last-Modified can describe when a representation was last modified.
//* If-Modified-Since can be used for conditional requests.


//* ------------------------------------------------------------
//* 17. IDEMPOTENCY
//* ------------------------------------------------------------

//* An operation is idempotent when repeating the same request has the same intended
//* effect as making it once, although responses may differ.
//*
//* PUT and DELETE are defined as idempotent by HTTP semantics.
//* POST is not generally idempotent.


//* ------------------------------------------------------------
//* 18. SAFE HTTP METHODS
//* ------------------------------------------------------------

//* GET, HEAD and OPTIONS are defined as safe methods by HTTP semantics.
//* Safe means the client does not request a state-changing operation as its intended effect.


//* ------------------------------------------------------------
//* 19. REST CONCEPT
//* ------------------------------------------------------------

//* REST is an architectural style, not a JavaScript API.
//* A practical REST-like API often models resources with URLs and HTTP methods.
//*
//* GET    /users/10
//* PATCH  /users/10
//* DELETE /users/10
//* POST   /users


//* ------------------------------------------------------------
//* 20. API RESPONSE SHAPE
//* ------------------------------------------------------------

async function loadDashboard() {
  const response = await fetch("/api/dashboard");
  if (!response.ok) throw new Error("Dashboard request failed");

  const data = await response.json();

  //* Validate important fields before assuming the server payload is correct.
  if (!Array.isArray(data.items)) {
    throw new Error("Invalid dashboard payload");
  }

  return data;
}


//* ------------------------------------------------------------
//* 21. NETWORK ERROR HANDLING
//* ------------------------------------------------------------

async function requestJson(url, options) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
}

//* Separate transport errors, HTTP errors and payload/application errors in
//* production systems when that distinction is useful.


//* ------------------------------------------------------------
//* 22. ABORTCONTROLLER
//* ------------------------------------------------------------

async function requestWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}


//* ------------------------------------------------------------
//* 23. CANCEL A SEARCH REQUEST
//* ------------------------------------------------------------

let searchController = null;

async function searchProducts(query) {
  searchController?.abort();
  searchController = new AbortController();

  const response = await fetch(
    `/api/products?q=${encodeURIComponent(query)}`,
    { signal: searchController.signal },
  );

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

//* This pattern prevents stale searches from continuing after a newer query begins.


//* ------------------------------------------------------------
//* 24. RETRY — BASIC POLICY
//* ------------------------------------------------------------

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function retryRequest(request, attempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await request();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await sleep(200 * attempt);
      }
    }
  }

  throw lastError;
}

//* Retries should be selective. Blindly retrying every error can amplify failures.


//* ------------------------------------------------------------
//* 25. EXPONENTIAL BACKOFF
//* ------------------------------------------------------------

function backoffDelay(attempt, base = 250, max = 10_000) {
  return Math.min(max, base * 2 ** (attempt - 1));
}

console.log(backoffDelay(1));
console.log(backoffDelay(4));

//* Production systems commonly add jitter to reduce synchronized retry bursts.


//* ------------------------------------------------------------
//* 26. RETRY WITH JITTER
//* ------------------------------------------------------------

function jitteredBackoff(attempt, base = 250, max = 10_000) {
  const exponential = Math.min(max, base * 2 ** (attempt - 1));
  return Math.random() * exponential;
}

//* This is one simple jitter strategy; production policies should match the API's needs.


//* ------------------------------------------------------------
//* 27. CONCURRENCY LIMIT
//* ------------------------------------------------------------

async function mapWithConcurrency(items, worker, limit = 3) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function run() {
    while (true) {
      const index = nextIndex++;
      if (index >= items.length) return;

      results[index] = await worker(items[index], index);
    }
  }

  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    () => run(),
  );

  await Promise.all(workers);
  return results;
}

//* Concurrency limiting prevents an application from starting hundreds/thousands
//* of requests simultaneously.


//* ------------------------------------------------------------
//* 28. REQUEST QUEUE IDEA
//* ------------------------------------------------------------

class RequestQueue {
  constructor(limit = 2) {
    this.limit = limit;
    this.active = 0;
    this.queue = [];
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.next();
    });
  }

  next() {
    if (this.active >= this.limit || this.queue.length === 0) return;

    const item = this.queue.shift();
    this.active++;

    Promise.resolve()
      .then(item.task)
      .then(item.resolve, item.reject)
      .finally(() => {
        this.active--;
        this.next();
      });
  }
}


//* ------------------------------------------------------------
//* 29. DEBOUNCE NETWORK SEARCH
//* ------------------------------------------------------------

function debounce(fn, delay = 300) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const searchLater = debounce((query) => {
  console.log("Would request:", query);
}, 300);

//* Debouncing reduces request frequency while the user is typing.


//* ------------------------------------------------------------
//* 30. THROTTLE IDEA
//* ------------------------------------------------------------

function throttle(fn, delay = 100) {
  let waiting = false;

  return (...args) => {
    if (waiting) return;

    fn(...args);
    waiting = true;
    setTimeout(() => {
      waiting = false;
    }, delay);
  };
}

//* Throttling limits how often an action can run during a continuous stream of events.


//* ------------------------------------------------------------
//* 31. CORS
//* ------------------------------------------------------------

//* CORS = Cross-Origin Resource Sharing.
//* It is a browser-enforced mechanism controlling whether frontend JavaScript
//* may read cross-origin responses according to server-provided CORS headers.
//*
//* Important:
//* CORS is not an authentication system and does not make an API unreachable
//* from non-browser clients.


//* ------------------------------------------------------------
//* 32. SAME-ORIGIN
//* ------------------------------------------------------------

function sameOriginExample() {
  const current = new URL(location.href);
  console.log(current.origin);
}

//* Origin consists of scheme + host + port.
//* Different subdomains are different origins.


//* ------------------------------------------------------------
//* 33. SIMPLE CROSS-ORIGIN REQUEST CONCEPT
//* ------------------------------------------------------------

//* Some cross-origin requests can be sent without a CORS preflight, depending
//* on method/headers/content-type and the Fetch/CORS rules.
//* The browser can still enforce whether frontend code may read the response.


//* ------------------------------------------------------------
//* 34. PREFLIGHT CONCEPT
//* ------------------------------------------------------------

//* For requests requiring a CORS preflight, the browser sends an OPTIONS request
//* to ask whether the cross-origin operation is permitted.
//* The server responds with appropriate Access-Control-* headers.


//* ------------------------------------------------------------
//* 35. CORS ERROR LOCATION
//* ------------------------------------------------------------

//* A CORS failure is often experienced as a browser-side access failure even when
//* the server itself received the request. Diagnose both browser console output and
//* server logs rather than assuming the endpoint is down.


//* ------------------------------------------------------------
//* 36. CREDENTIALS
//* ------------------------------------------------------------

async function requestWithCookies(url) {
  const response = await fetch(url, {
    credentials: "include",
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

//* credentials controls whether browser credentials such as cookies may be included
//* according to Fetch/CORS rules. Server CORS policy must also permit the setup.


//* ------------------------------------------------------------
//* 37. COOKIES
//* ------------------------------------------------------------

//* Important cookie attributes:
//* HttpOnly -> JavaScript cannot read the cookie through document.cookie.
//* Secure   -> send only over secure transport under cookie rules.
//* SameSite -> controls cross-site cookie sending behavior.
//* Path/Domain -> scope cookie availability.


//* ------------------------------------------------------------
//* 38. COOKIE SECURITY MODEL
//* ------------------------------------------------------------

//* Cookies are automatically attached by the browser when their rules match.
//* That makes them useful for sessions but also relevant to CSRF.
//* HttpOnly can reduce direct JavaScript access to a session cookie but does not
//* eliminate all XSS consequences.


//* ------------------------------------------------------------
//* 39. CSRF CONCEPT
//* ------------------------------------------------------------

//* CSRF abuses ambient browser credentials to cause an unwanted state-changing request.
//* Common defenses include SameSite cookies, CSRF tokens and appropriate origin checks.


//* ------------------------------------------------------------
//* 40. BEARER TOKEN CONCEPT
//* ------------------------------------------------------------

async function bearerRequest(token) {
  return fetch("/api/data", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

//* Bearer tokens are credentials: whoever possesses a valid token can generally use it
//* within its permitted scope. Storage and XSS decisions therefore matter.


//* ------------------------------------------------------------
//* 41. HTTPS
//* ------------------------------------------------------------

//* HTTPS = HTTP over TLS.
//* TLS provides cryptographic protection for the connection, including confidentiality
//* and integrity, plus server authentication through certificates.


//* ------------------------------------------------------------
//* 42. TCP VS TLS
//* ------------------------------------------------------------

//* For traditional HTTP/1.1 and HTTP/2 over TLS, TCP provides the transport and TLS
//* provides cryptographic protection above it.
//* They are separate protocol layers.


//* ------------------------------------------------------------
//* 43. HTTP/3 AND QUIC
//* ------------------------------------------------------------

//* HTTP/3 uses QUIC as its transport protocol.
//* QUIC runs over UDP and integrates TLS 1.3 into the protocol design.
//* Do not describe HTTP/3 as simply "HTTP over TCP".


//* ------------------------------------------------------------
//* 44. DNS CONCEPT
//* ------------------------------------------------------------

//* DNS maps names such as example.com to network addressing information.
//* Browser/application behavior can involve caching and multiple DNS mechanisms,
//* but JavaScript normally consumes the result indirectly through network APIs.


//* ------------------------------------------------------------
//* 45. CONNECTION REUSE
//* ------------------------------------------------------------

//* Modern browsers can reuse connections and use protocol-specific multiplexing.
//* Avoid assuming every fetch creates a brand-new TCP/TLS connection.


//* ------------------------------------------------------------
//* 46. HTTP/1.1
//* ------------------------------------------------------------

//* HTTP/1.1 is text-based and supports persistent connections.
//* Multiple independent requests can still experience application/network limitations
//* that newer protocols address more efficiently.


//* ------------------------------------------------------------
//* 47. HTTP/2
//* ------------------------------------------------------------

//* HTTP/2 uses binary framing and multiplexes multiple streams over a connection.
//* Header compression and stream multiplexing can reduce overhead.


//* ------------------------------------------------------------
//* 48. HTTP/3
//* ------------------------------------------------------------

//* HTTP/3 uses QUIC and can avoid some TCP head-of-line blocking characteristics
//* by using independent QUIC streams.


//* ------------------------------------------------------------
//* 49. WEBSOCKET
//* ------------------------------------------------------------

function connectWebSocket() {
  const socket = new WebSocket("wss://example.com/socket");

  socket.addEventListener("open", () => {
    socket.send(JSON.stringify({ type: "PING" }));
  });

  socket.addEventListener("message", (event) => {
    console.log("Message:", event.data);
  });

  socket.addEventListener("error", (event) => {
    console.error("WebSocket error", event);
  });

  socket.addEventListener("close", (event) => {
    console.log("Closed:", event.code);
  });

  return socket;
}

//* WebSocket provides persistent, bidirectional communication after connection setup.


//* ------------------------------------------------------------
//* 50. WEBSOCKET CLEANUP
//* ------------------------------------------------------------

function closeSocket(socket) {
  if (socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING) {
    socket.close(1000, "Normal closure");
  }
}


//* ------------------------------------------------------------
//* 51. SERVER-SENT EVENTS
//* ------------------------------------------------------------

function connectSSE() {
  const source = new EventSource("/api/events");

  source.addEventListener("message", (event) => {
    console.log("SSE:", event.data);
  });

  source.addEventListener("error", () => {
    console.log("SSE connection state:", source.readyState);
  });

  return source;
}

//* EventSource provides a server-to-client streaming model over HTTP.
//* The browser can automatically reconnect according to the API's behavior.


//* ------------------------------------------------------------
//* 52. SSE CLEANUP
//* ------------------------------------------------------------

function closeSSE(source) {
  source.close();
}


//* ------------------------------------------------------------
//* 53. WEBSOCKET VS SSE
//* ------------------------------------------------------------

//* WebSocket:
//* - bidirectional
//* - client and server can send messages
//* - useful for interactive real-time systems
//*
//* SSE/EventSource:
//* - server -> client event stream
//* - simpler for one-way updates
//* - useful for notifications, progress and feeds


//* ------------------------------------------------------------
//* 54. LONG POLLING CONCEPT
//* ------------------------------------------------------------

//* Long polling keeps an HTTP request open until data is available or a timeout occurs,
//* then the client requests again. It can approximate real-time updates but has more
//* request lifecycle overhead than a persistent streaming protocol.


//* ------------------------------------------------------------
//* 55. POLLING
//* ------------------------------------------------------------

function startPolling(fetchData, interval = 5000) {
  let stopped = false;

  async function run() {
    while (!stopped) {
      try {
        await fetchData();
      } catch (error) {
        console.error(error);
      }

      if (!stopped) await sleep(interval);
    }
  }

  run();
  return () => {
    stopped = true;
  };
}

//* Always provide cleanup for polling loops.


//* ------------------------------------------------------------
//* 56. STREAMING RESPONSE
//* ------------------------------------------------------------

async function readStream(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  if (!response.body) throw new Error("ReadableStream unavailable");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    text += decoder.decode(value, { stream: true });
  }

  text += decoder.decode();
  return text;
}

//* Streaming lets an application process data incrementally instead of waiting for
//* the complete body before reading anything.


//* ------------------------------------------------------------
//* 57. STREAM CANCELLATION
//* ------------------------------------------------------------

async function readStreamWithAbort(url) {
  const controller = new AbortController();

  const response = await fetch(url, {
    signal: controller.signal,
  });

  //* controller.abort() can cancel the fetch and its supported stream consumption.
  return response;
}


//* ------------------------------------------------------------
//* 58. BACKPRESSURE CONCEPT
//* ------------------------------------------------------------

//* Backpressure occurs when a producer can generate data faster than the consumer
//* can process it. Streams provide mechanisms for coordinating production and consumption.


//* ------------------------------------------------------------
//* 59. READABLESTREAM CONCEPT
//* ------------------------------------------------------------

function createNumberStream() {
  return new ReadableStream({
    start(controller) {
      for (let i = 1; i <= 3; i++) {
        controller.enqueue(String(i));
      }
      controller.close();
    },
  });
}


//* ------------------------------------------------------------
//* 60. TRANSFORMSTREAM CONCEPT
//* ------------------------------------------------------------

function uppercaseStream() {
  return new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(String(chunk).toUpperCase());
    },
  });
}


//* ------------------------------------------------------------
//* 61. REQUEST BODY STREAMING — CONCEPT
//* ------------------------------------------------------------

//* Fetch can support streaming request bodies in environments/features that allow it,
//* but exact requirements vary. Consult the target browser/server contract before relying on it.


//* ------------------------------------------------------------
//* 62. KEEP-ALIVE CONCEPT
//* ------------------------------------------------------------

//* The Fetch API exposes a keepalive option for requests that may need to continue
//* while a document is unloading, subject to browser constraints and payload limits.


//* ------------------------------------------------------------
//* 63. PRIORITY CONCEPT
//* ------------------------------------------------------------

//* Browsers have resource scheduling strategies. Application APIs may expose hints,
//* but developers should measure real performance instead of assuming a request's
//* priority always maps directly to network execution order.


//* ------------------------------------------------------------
//* 64. RESOURCE TIMING
//* ------------------------------------------------------------

const resources = performance.getEntriesByType("resource");
console.log(resources.slice(0, 5));

//* Resource Timing can help inspect browser-observed network resource timings where
//* timing information is available and permitted.


//* ------------------------------------------------------------
//* 65. NAVIGATION TIMING
//* ------------------------------------------------------------

const navigation = performance.getEntriesByType("navigation")[0];
console.log(navigation);

//* Navigation Timing exposes measurements for document navigation.


//* ------------------------------------------------------------
//* 66. NETWORK INFORMATION API
//* ------------------------------------------------------------

const connection = navigator.connection;

if (connection) {
  console.log("Effective type:", connection.effectiveType);
  console.log("Downlink:", connection.downlink);
}

//* Network Information API support varies and values are estimates/hints.


//* ------------------------------------------------------------
//* 67. ONLINE/OFFLINE EVENTS
//* ------------------------------------------------------------

window.addEventListener("online", () => {
  console.log("Browser reports online");
});

window.addEventListener("offline", () => {
  console.log("Browser reports offline");
});

//* navigator.onLine is useful as a hint, not proof that a specific server is reachable.


//* ------------------------------------------------------------
//* 68. OFFLINE-FIRST MENTAL MODEL
//* ------------------------------------------------------------

//* UI -> local state/cache -> sync queue -> server
//*                         <- updates/errors <-
//*
//* A robust offline-first app treats connectivity as intermittent rather than assuming
//* every operation has immediate server access.


//* ------------------------------------------------------------
//* 69. REQUEST DEDUPLICATION
//* ------------------------------------------------------------

const inFlight = new Map();

function deduplicatedRequest(key, request) {
  if (inFlight.has(key)) return inFlight.get(key);

  const promise = Promise.resolve()
    .then(request)
    .finally(() => inFlight.delete(key));

  inFlight.set(key, promise);
  return promise;
}

//* Multiple callers requesting the same resource can share one in-flight Promise.


//* ------------------------------------------------------------
//* 70. SIMPLE CLIENT CACHE
//* ------------------------------------------------------------

const memoryCache = new Map();

async function cachedRequest(key, request) {
  if (memoryCache.has(key)) {
    return memoryCache.get(key);
  }

  const value = await request();
  memoryCache.set(key, value);
  return value;
}

//* Real caches need invalidation, expiration and memory considerations.


//* ------------------------------------------------------------
//* 71. CACHE INVALIDATION
//* ------------------------------------------------------------

function invalidateCache(key) {
  memoryCache.delete(key);
}

//* "There are only two hard things in Computer Science: cache invalidation and naming things"
//* is a joke, not a technical law—but invalidation is genuinely difficult.


//* ------------------------------------------------------------
//* 72. OPTIMISTIC UI
//* ------------------------------------------------------------

async function toggleLike(post) {
  const previous = post.liked;
  post.liked = !previous;

  try {
    await requestJson(`/api/posts/${post.id}/like`, {
      method: "POST",
    });
  } catch (error) {
    post.liked = previous;
    throw error;
  }
}

//* Optimistic UI updates the interface before server confirmation and rolls back on failure.


//* ------------------------------------------------------------
//* 73. PAGINATION — OFFSET
//* ------------------------------------------------------------

async function getPage(page, limit = 20) {
  const url = `/api/posts?page=${page}&limit=${limit}`;
  return requestJson(url);
}

//* Offset/page pagination is simple but can become inefficient or unstable for changing data.


//* ------------------------------------------------------------
//* 74. PAGINATION — CURSOR
//* ------------------------------------------------------------

async function getNextPage(cursor) {
  const url = `/api/posts?cursor=${encodeURIComponent(cursor)}`;
  return requestJson(url);
}

//* Cursor pagination can provide more stable traversal for frequently changing datasets.


//* ------------------------------------------------------------
//* 75. INFINITE SCROLL
//* ------------------------------------------------------------

function setupInfiniteScroll(loadMore) {
  const sentinel = document.createElement("div");
  sentinel.setAttribute("aria-hidden", "true");
  document.body.append(sentinel);

  const observer = new IntersectionObserver(async (entries) => {
    if (!entries[0].isIntersecting) return;
    await loadMore();
  });

  observer.observe(sentinel);
  return () => observer.disconnect();
}


//* ------------------------------------------------------------
//* 76. FILE UPLOAD
//* ------------------------------------------------------------

async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error(`Upload failed: ${response.status}`);
  return response.json();
}

//* Do not manually set Content-Type for FormData; the browser adds the multipart boundary.


//* ------------------------------------------------------------
//* 77. DOWNLOAD FILE
//* ------------------------------------------------------------

async function downloadFile(url, filename) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed: ${response.status}`);

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = objectUrl;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(objectUrl);
}

//* Revoke object URLs when they are no longer needed.


//* ------------------------------------------------------------
//* 78. MULTIPART UPLOAD CONCEPT
//* ------------------------------------------------------------

//* multipart/form-data can carry multiple fields/files in one request.
//* FormData is the convenient browser-side representation for this use case.


//* ------------------------------------------------------------
//* 79. HTTP RANGE REQUEST CONCEPT
//* ------------------------------------------------------------

//* Range requests can ask a server for part of a resource, useful for resumable/partial
//* transfers when the server and resource support them.


//* ------------------------------------------------------------
//* 80. CDN CONCEPT
//* ------------------------------------------------------------

//* A CDN distributes/cache-serves content from locations closer to users.
//* It can reduce latency and origin load for cacheable assets.


//* ------------------------------------------------------------
//* 81. REVERSE PROXY CONCEPT
//* ------------------------------------------------------------

//* A reverse proxy sits in front of backend services and can handle routing, TLS
//* termination, caching, compression, load balancing and security controls.


//* ------------------------------------------------------------
//* 82. LOAD BALANCER CONCEPT
//* ------------------------------------------------------------

//* A load balancer distributes traffic across available backend instances.
//* Health checks and session/state architecture matter when scaling horizontally.


//* ------------------------------------------------------------
//* 83. RATE LIMITING CONCEPT
//* ------------------------------------------------------------

//* Rate limiting restricts request frequency to protect resources and enforce usage policies.
//* It is normally enforced server-side; client-side throttling is only a UX/network optimization.


//* ------------------------------------------------------------
//* 84. RETRYABLE VS NON-RETRYABLE ERRORS
//* ------------------------------------------------------------

function shouldRetry(status) {
  return status === 408 || status === 429 || status >= 500;
}

//* This is a simplified example, not a universal policy.
//* 429 often includes Retry-After guidance that clients should respect.


//* ------------------------------------------------------------
//* 85. RETRY-AFTER CONCEPT
//* ------------------------------------------------------------

//* Servers may send Retry-After to indicate when a client should retry a request.
//* Parse and honor server guidance where appropriate.


//* ------------------------------------------------------------
//* 86. TIMEOUT IS NOT AUTOMATIC
//* ------------------------------------------------------------

//* fetch() does not automatically mean "fail after five seconds".
//* Build explicit timeout/cancellation behavior when your application needs it.


//* ------------------------------------------------------------
//* 87. NETWORK REQUEST STATE MACHINE
//* ------------------------------------------------------------

function describeRequestState(state) {
  const states = {
    idle: "No request started",
    loading: "Request in progress",
    success: "Request completed successfully",
    error: "Request failed",
    cancelled: "Request was cancelled",
  };

  return states[state] ?? "Unknown state";
}

console.log(describeRequestState("loading"));


//* ------------------------------------------------------------
//* 88. RACE CONDITION
//* ------------------------------------------------------------

let latestRequestId = 0;

async function loadUser(id) {
  const requestId = ++latestRequestId;
  const user = await requestJson(`/api/users/${id}`);

  if (requestId !== latestRequestId) {
    return null; // stale response
  }

  return user;
}

//* AbortController can cancel obsolete requests; request IDs can also guard against
//* stale results when cancellation is unavailable or insufficient.


//* ------------------------------------------------------------
//* 89. WATERFALL REQUESTS
//* ------------------------------------------------------------

async function waterfall() {
  const user = await requestJson("/api/user");
  const posts = await requestJson(`/api/users/${user.id}/posts`);
  return { user, posts };
}

//* Some dependencies require sequential requests. Avoid accidental waterfalls when
//* requests are independent.


//* ------------------------------------------------------------
//* 90. PARALLEL REQUESTS
//* ------------------------------------------------------------

async function parallel() {
  const [profile, notifications] = await Promise.all([
    requestJson("/api/profile"),
    requestJson("/api/notifications"),
  ]);

  return { profile, notifications };
}

//* Promise.all reduces waiting when independent operations can run concurrently.


//* ------------------------------------------------------------
//* 91. PARTIAL SUCCESS
//* ------------------------------------------------------------

async function loadWidgets() {
  const results = await Promise.allSettled([
    requestJson("/api/weather"),
    requestJson("/api/news"),
    requestJson("/api/stats"),
  ]);

  return results;
}

//* allSettled is useful when one failure should not cancel all independent work.


//* ------------------------------------------------------------
//* 92. FIRST RESPONSE
//* ------------------------------------------------------------

async function firstAvailable(urls) {
  return Promise.any(
    urls.map((url) => requestJson(url)),
  );
}

//* Promise.any resolves with the first fulfilled operation and rejects if all reject.


//* ------------------------------------------------------------
//* 93. REQUEST CANCELLATION AND UI LIFECYCLE
//* ------------------------------------------------------------

function createRequestController() {
  const controller = new AbortController();

  return {
    signal: controller.signal,
    cleanup() {
      controller.abort();
    },
  };
}

//* Tie network work to component/page lifecycle so abandoned work does not keep running.


//* ------------------------------------------------------------
//* 94. AUTHENTICATION VS AUTHORIZATION
//* ------------------------------------------------------------

//* Authentication = who are you?
//* Authorization = what are you allowed to do?
//*
//* A frontend can hide UI based on permissions, but the server must enforce authorization.


//* ------------------------------------------------------------
//* 95. NEVER TRUST THE CLIENT
//* ------------------------------------------------------------

function pretendAdminCheck(user) {
  return user.role === "admin";
}

//* This can control UI but cannot secure an endpoint.
//* The backend must independently validate identity and authorization.


//* ------------------------------------------------------------
//* 96. INPUT VALIDATION
//* ------------------------------------------------------------

function validateUsername(username) {
  if (typeof username !== "string") return false;
  if (username.length < 3 || username.length > 30) return false;
  return true;
}

//* Client validation improves UX. Server validation remains mandatory for security/data integrity.


//* ------------------------------------------------------------
//* 97. XSS AND NETWORKING
//* ------------------------------------------------------------

//* Network responses are untrusted input unless your security model establishes otherwise.
//* Do not inject arbitrary response strings into innerHTML.
//* Prefer textContent or a properly designed rendering/sanitization strategy.


//* ------------------------------------------------------------
//* 98. API VERSIONING
//* ------------------------------------------------------------

//* Common approaches:
//* /api/v1/users
//* Accept headers/media types
//* query/version strategies
//*
//* Choose a consistent strategy and define compatibility/deprecation rules.


//* ------------------------------------------------------------
//* 99. ERROR RESPONSE DESIGN
//* ------------------------------------------------------------

//* A useful API error can include a stable machine-readable code plus safe human-readable
//* information. Do not expose secrets, stack traces or sensitive internal details to clients.

const exampleError = {
  code: "VALIDATION_ERROR",
  message: "Invalid input",
  fields: {
    email: "Invalid email format",
  },
};

console.log(exampleError);


//* ------------------------------------------------------------
//* 100. NETWORKING DEBUGGING CHECKLIST
//* ------------------------------------------------------------

//* 1. Is the URL correct?
//* 2. Is DNS resolving?
//* 3. Is the server reachable?
//* 4. Is HTTPS/TLS valid?
//* 5. What HTTP method was sent?
//* 6. Are request headers correct?
//* 7. Is Content-Type correct?
//* 8. Is the request body valid?
//* 9. What status code returned?
//* 10. What response headers returned?
//* 11. What response body returned?
//* 12. Is CORS involved?
//* 13. Are cookies/credentials involved?
//* 14. Was the request aborted or timed out?
//* 15. Is there a race condition/stale response?
//* 16. Is the backend returning valid JSON?
//* 17. Are retries creating duplicate writes?
//* 18. Is the client sending too many requests?
//* 19. Is caching returning stale data?
//* 20. Does the server log explain the failure?


//* ------------------------------------------------------------
//* 101. COMMON MISTAKES
//* ------------------------------------------------------------

//* Mistake 1: Assuming fetch rejects for 404/500.
//* Fix: check response.ok/status.
//*
//* Mistake 2: Sending JSON without Content-Type.
//* Fix: send application/json when the server expects JSON.
//*
//* Mistake 3: Manually setting multipart boundary for FormData.
//* Fix: let the browser set Content-Type and boundary.
//*
//* Mistake 4: Retrying every POST blindly.
//* Fix: understand idempotency and server/API retry semantics.
//*
//* Mistake 5: Treating CORS as backend security.
//* Fix: secure and authorize the endpoint server-side.
//*
//* Mistake 6: Forgetting request cancellation.
//* Fix: use AbortController/lifecycle cleanup.
//*
//* Mistake 7: Updating UI with stale responses.
//* Fix: abort or guard with request IDs.
//*
//* Mistake 8: Starting unlimited concurrent requests.
//* Fix: use bounded concurrency.


//* ------------------------------------------------------------
//* 102. OUTPUT PREDICTION
//* ------------------------------------------------------------

console.log("request:start");
Promise.resolve().then(() => console.log("microtask"));
setTimeout(() => console.log("timer"), 0);
console.log("request:end");

//* Typical browser ordering:
//* request:start
//* request:end
//* microtask
//* timer


//* ------------------------------------------------------------
//* 103. MINI PROJECTS
//* ------------------------------------------------------------

//* 1. REST API client dashboard.
//* 2. Search autocomplete with debounce + cancellation.
//* 3. Paginated product browser.
//* 4. Infinite-scroll feed.
//* 5. File upload/download manager.
//* 6. WebSocket chat application.
//* 7. SSE notification dashboard.
//* 8. Offline-first notes sync system.
//* 9. API client with retry/backoff/concurrency limits.
//* 10. Network performance monitoring dashboard.


//* ------------------------------------------------------------
//* 104. CODING CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1: Build GET/POST/PATCH/DELETE helper functions.
//* Challenge 2: Create a fetch wrapper with HTTP error handling.
//* Challenge 3: Add timeout cancellation.
//* Challenge 4: Build debounced search with AbortController.
//* Challenge 5: Implement retry with exponential backoff and jitter.
//* Challenge 6: Build a concurrency-limited request pool.
//* Challenge 7: Implement request deduplication.
//* Challenge 8: Build page and cursor pagination.
//* Challenge 9: Create a WebSocket reconnect strategy.
//* Challenge 10: Build an SSE notification client.
//* Challenge 11: Stream a large response and process chunks.
//* Challenge 12: Build optimistic UI with rollback.
//* Challenge 13: Build offline queue + retry synchronization.
//* Challenge 14: Inspect Resource Timing for API calls.
//* Challenge 15: Build a secure API error display.


//* ------------------------------------------------------------
//* 105. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1: 404 response enters the success path.
//* Debug 2: POST body arrives empty on the server.
//* Debug 3: Browser reports a CORS error.
//* Debug 4: Search results appear in the wrong order.
//* Debug 5: Five identical API requests happen on one page.
//* Debug 6: Upload fails because of an incorrect Content-Type header.
//* Debug 7: Polling continues after leaving the page.
//* Debug 8: WebSocket reconnect creates duplicate listeners.
//* Debug 9: Retry logic duplicates a state-changing operation.
//* Debug 10: UI freezes while many network results are processed.


//* ------------------------------------------------------------
//* 106. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is a request/response cycle?
//* 2. What does fetch() return?
//* 3. Why check response.ok?
//* 4. What is Content-Type?
//* 5. What is Accept?
//* 6. What is idempotency?
//* 7. What is CORS?
//* 8. What is a preflight request?
//* 9. What is HTTPS?
//* 10. TCP vs TLS?
//* 11. What changed conceptually with HTTP/3 and QUIC?
//* 12. WebSocket vs SSE?
//* 13. What is streaming?
//* 14. What is backpressure?
//* 15. Why use AbortController?
//* 16. What is exponential backoff?
//* 17. Why add jitter?
//* 18. What is request deduplication?
//* 19. Why limit concurrency?
//* 20. Why can stale responses cause UI bugs?
//* 21. Authentication vs authorization?
//* 22. Why is frontend authorization not enough?
//* 23. What are cookies and SameSite?
//* 24. What is CSRF?
//* 25. How would you debug a failed request?


//* ------------------------------------------------------------
//* 107. INTERVIEW QUESTIONS
//* ------------------------------------------------------------

//* Q1. Explain the browser fetch lifecycle.
//* Q2. Why doesn't fetch reject for HTTP 404?
//* Q3. How does CORS work?
//* Q4. Explain CORS preflight.
//* Q5. Same-origin vs same-site?
//* Q6. Explain cookies with HttpOnly, Secure and SameSite.
//* Q7. Explain CSRF and common defenses.
//* Q8. Explain bearer-token risks.
//* Q9. TCP vs UDP vs QUIC?
//* Q10. What is TLS?
//* Q11. HTTP/1.1 vs HTTP/2 vs HTTP/3?
//* Q12. What is connection reuse?
//* Q13. WebSocket vs SSE?
//* Q14. How would you implement reconnect with backoff?
//* Q15. How would you prevent duplicate requests?
//* Q16. How would you cancel stale searches?
//* Q17. How would you limit concurrent API calls?
//* Q18. How would you design an offline-first sync queue?
//* Q19. How do HTTP caching and Cache API differ?
//* Q20. How do you diagnose a slow API request?


//* ============================================================
//* FINAL MENTAL MODEL
//* ============================================================

//* Think in layers:
//*
//* Application
//*    |
//* HTTP API / WebSocket / SSE
//*    |
//* Fetch / browser networking APIs
//*    |
//* Security: origin, CORS, cookies, credentials, TLS
//*    |
//* Transport: TCP / QUIC / UDP concepts
//*    |
//* Name resolution: DNS
//*    |
//* Network
//*
//* A strong JavaScript developer does not only know fetch().
//* You should understand what happens before the request, what happens after it,
//* how errors are represented, how browsers enforce security, how data streams,
//* how retries/caching/concurrency affect systems, and how the backend participates.

//* END OF NETWORKING
