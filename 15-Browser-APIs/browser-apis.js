//* ============================================================
//* JAVASCRIPT BROWSER APIs — PRACTICAL COMPANION
//* ============================================================

//* Definition:
//* Browser APIs are host-provided interfaces that let JavaScript interact with
//* capabilities supplied by a web browser and its environment.
//*
//* Important distinction:
//* - ECMAScript = JavaScript language specification.
//* - DOM = document/tree APIs.
//* - Browser APIs = host capabilities such as Fetch, Clipboard, Canvas,
//*   Web Storage, IndexedDB, Web Workers, Service Workers, Notifications,
//*   Media APIs, observers and more.
//*
//* Support varies by browser and context. Prefer feature detection.


//* ------------------------------------------------------------
//* 1. FEATURE DETECTION
//* ------------------------------------------------------------

if ("fetch" in window) {
  console.log("Fetch API is available");
}

if ("IntersectionObserver" in window) {
  console.log("IntersectionObserver is available");
}

//* Prefer capability checks instead of assuming every browser supports an API.


//* ------------------------------------------------------------
//* 2. FETCH API
//* ------------------------------------------------------------

async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const users = await response.json();
  console.log(users);
}

//* fetch() returns a Promise<Response>.
//* Important: HTTP 404/500 normally do NOT reject fetch by themselves.
//* Check response.ok or response.status.


//* ------------------------------------------------------------
//* 3. FETCH REQUEST OPTIONS
//* ------------------------------------------------------------

async function createUser(user) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}


//* ------------------------------------------------------------
//* 4. ABORTCONTROLLER
//* ------------------------------------------------------------

async function fetchWithTimeout(url, milliseconds = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), milliseconds);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

//* AbortController can cancel operations that support AbortSignal.


//* ------------------------------------------------------------
//* 5. URL API
//* ------------------------------------------------------------

const url = new URL("https://example.com/products?id=10#reviews");

console.log(url.hostname);
console.log(url.pathname);
console.log(url.searchParams.get("id"));
console.log(url.hash);

//* URL provides structured URL parsing/manipulation.


//* ------------------------------------------------------------
//* 6. URLSEARCHPARAMS
//* ------------------------------------------------------------

const params = new URLSearchParams();
params.set("search", "javascript");
params.set("page", "2");
params.append("tag", "web");
params.append("tag", "frontend");

console.log(params.toString());
console.log(params.getAll("tag"));


//* ------------------------------------------------------------
//* 7. FORM DATA
//* ------------------------------------------------------------

const formData = new FormData();
formData.append("username", "ravi");
formData.append("role", "developer");

console.log(formData.get("username"));

//* FormData represents key/value form data and can contain files.


//* ------------------------------------------------------------
//* 8. FETCH WITH FORMDATA
//* ------------------------------------------------------------

async function uploadFormData(data) {
  const response = await fetch("/api/profile", {
    method: "POST",
    body: data,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}

//* Do not manually set multipart/form-data Content-Type when sending FormData.
//* The browser needs to add the multipart boundary.


//* ------------------------------------------------------------
//* 9. BLOB
//* ------------------------------------------------------------

async function downloadBlob(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Download failed");

  const blob = await response.blob();
  console.log(blob.type, blob.size);
  return blob;
}

//* Blob represents immutable raw data.


//* ------------------------------------------------------------
//* 10. OBJECT URL
//* ------------------------------------------------------------

function previewBlob(blob, imageElement) {
  const objectUrl = URL.createObjectURL(blob);
  imageElement.src = objectUrl;

  imageElement.addEventListener("load", () => {
    URL.revokeObjectURL(objectUrl);
  }, { once: true });
}

//* Object URLs provide temporary browser references to Blob/File data.
//* Revoke them when they are no longer needed.


//* ------------------------------------------------------------
//* 11. FILE API
//* ------------------------------------------------------------

function inspectFile(file) {
  console.log(file.name);
  console.log(file.type);
  console.log(file.size);
  console.log(file.lastModified);
}

//* File extends Blob with metadata such as name and lastModified.


//* ------------------------------------------------------------
//* 12. FILE READER
//* ------------------------------------------------------------

function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);

    reader.readAsText(file);
  });
}

//* FileReader is useful for reading user-selected files in supported formats.


//* ------------------------------------------------------------
//* 13. DRAG AND DROP
//* ------------------------------------------------------------

function setupDropZone(dropZone) {
  dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    const files = [...event.dataTransfer.files];
    console.log(files);
  });
}

//* Preventing dragover default is commonly necessary to allow a drop.


//* ------------------------------------------------------------
//* 14. CLIPBOARD
//* ------------------------------------------------------------

async function copyToClipboard(text) {
  if (!navigator.clipboard) {
    throw new Error("Clipboard API unavailable");
  }

  await navigator.clipboard.writeText(text);
}

async function readClipboardText() {
  if (!navigator.clipboard) {
    throw new Error("Clipboard API unavailable");
  }

  return navigator.clipboard.readText();
}

//* Clipboard access can require a secure context and user permission/activation.


//* ------------------------------------------------------------
//* 15. NOTIFICATIONS
//* ------------------------------------------------------------

async function notifyUser(title, body) {
  if (!("Notification" in window)) return;

  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    new Notification(title, { body });
  }
}

//* Ask for notification permission in a meaningful user flow rather than
//* automatically on every page load.


//* ------------------------------------------------------------
//* 16. GEOLOCATION
//* ------------------------------------------------------------

function getUserPosition() {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation unavailable"));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 60_000,
    });
  });
}

//* Geolocation requires explicit permission and should be requested only when needed.


//* ------------------------------------------------------------
//* 17. WATCH POSITION
//* ------------------------------------------------------------

//* const watchId = navigator.geolocation.watchPosition(onSuccess, onError);
//* navigator.geolocation.clearWatch(watchId);

//* Use clearWatch when continuous tracking is no longer required.


//* ------------------------------------------------------------
//* 18. DEVICE ORIENTATION PREVIEW
//* ------------------------------------------------------------

function listenToOrientation() {
  window.addEventListener("deviceorientation", (event) => {
    console.log(event.alpha, event.beta, event.gamma);
  });
}

//* Availability and permission behavior varies by browser/device.


//* ------------------------------------------------------------
//* 19. MEDIA DEVICES
//* ------------------------------------------------------------

async function requestCameraAndMicrophone() {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("getUserMedia unavailable");
  }

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  return stream;
}

//* getUserMedia requests access to user media and requires permission.


//* ------------------------------------------------------------
//* 20. STOP MEDIA TRACKS
//* ------------------------------------------------------------

function stopStream(stream) {
  stream.getTracks().forEach((track) => track.stop());
}

//* Always stop media tracks when a camera/microphone stream is no longer needed.


//* ------------------------------------------------------------
//* 21. VIDEO PREVIEW
//* ------------------------------------------------------------

function attachStreamToVideo(stream, video) {
  video.srcObject = stream;
  video.play().catch(console.error);
}


//* ------------------------------------------------------------
//* 22. CANVAS
//* ------------------------------------------------------------

const canvas = document.createElement("canvas");
canvas.width = 300;
canvas.height = 150;

const ctx = canvas.getContext("2d");

if (ctx) {
  ctx.fillRect(20, 20, 100, 60);
  ctx.beginPath();
  ctx.arc(200, 70, 30, 0, Math.PI * 2);
  ctx.stroke();
}

//* Canvas provides a drawing surface controlled by JavaScript.


//* ------------------------------------------------------------
//* 23. CANVAS PIXEL COORDINATES
//* ------------------------------------------------------------

//* Canvas coordinates normally begin at the top-left:
//* x increases to the right.
//* y increases downward.


//* ------------------------------------------------------------
//* 24. CANVAS TEXT
//* ------------------------------------------------------------

if (ctx) {
  ctx.font = "20px sans-serif";
  ctx.fillText("JavaScript", 20, 130);
}


//* ------------------------------------------------------------
//* 25. CANVAS TO DATA URL
//* ------------------------------------------------------------

const imageDataUrl = canvas.toDataURL("image/png");
console.log(imageDataUrl.slice(0, 30));

//* toDataURL serializes the canvas into a data URL.
//* Cross-origin image content can make a canvas tainted and prevent pixel export.


//* ------------------------------------------------------------
//* 26. RESIZE OBSERVER
//* ------------------------------------------------------------

if ("ResizeObserver" in window) {
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      console.log("Element size:", entry.contentRect.width, entry.contentRect.height);
    }
  });

  // observer.observe(document.body);
  // observer.disconnect();
}

//* ResizeObserver reacts to element size changes, not just window resizing.


//* ------------------------------------------------------------
//* 27. INTERSECTION OBSERVER
//* ------------------------------------------------------------

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      console.log("Visible:", entry.isIntersecting);
    }
  }, {
    threshold: 0.2,
  });

  // observer.observe(document.querySelector(".card"));
  // observer.disconnect();
}

//* IntersectionObserver is useful for lazy loading, visibility tracking and
//* infinite-scroll triggers without manually checking scroll coordinates.


//* ------------------------------------------------------------
//* 28. MUTATION OBSERVER
//* ------------------------------------------------------------

const mutationObserver = new MutationObserver((mutations) => {
  console.log("Mutations:", mutations.length);
});

// mutationObserver.observe(document.body, {
//   childList: true,
//   subtree: true,
// });
// mutationObserver.disconnect();

//* MutationObserver watches DOM changes asynchronously.


//* ------------------------------------------------------------
//* 29. INTERSECTION OBSERVER LAZY IMAGE IDEA
//* ------------------------------------------------------------

function setupLazyImages(images) {
  const observer = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      const image = entry.target;
      const src = image.dataset.src;

      if (src) {
        image.src = src;
        image.removeAttribute("data-src");
      }

      obs.unobserve(image);
    }
  });

  images.forEach((image) => observer.observe(image));
}


//* ------------------------------------------------------------
//* 30. WEB WORKER
//* ------------------------------------------------------------

//* Main thread:
//* const worker = new Worker("worker.js");
//* worker.postMessage({ number: 40 });
//* worker.onmessage = (event) => console.log(event.data);
//* worker.terminate();

//* A dedicated worker runs JavaScript in a separate worker context and can move
//* CPU-heavy work away from the page's main thread.


//* ------------------------------------------------------------
//* 31. WORKER MESSAGE CONTRACT
//* ------------------------------------------------------------

//* worker.js
//* self.onmessage = (event) => {
//*   const result = expensiveCalculation(event.data.number);
//*   self.postMessage(result);
//* };

//* Data is exchanged through message passing rather than sharing ordinary page
//* JavaScript objects directly.


//* ------------------------------------------------------------
//* 32. STRUCTURED CLONE
//* ------------------------------------------------------------

const original = {
  name: "Ravi",
  skills: ["HTML", "CSS", "JavaScript"],
};

const copy = structuredClone(original);
copy.skills.push("React");

console.log(original.skills);
console.log(copy.skills);

//* structuredClone creates a deep clone for supported structured-clone types.


//* ------------------------------------------------------------
//* 33. TRANSFERABLE OBJECTS PREVIEW
//* ------------------------------------------------------------

const buffer = new ArrayBuffer(8);
const transferred = structuredClone(buffer, { transfer: [buffer] });

console.log(transferred.byteLength);
console.log(buffer.byteLength); // 0 after transfer

//* Transfer moves ownership for transferable objects rather than copying bytes.


//* ------------------------------------------------------------
//* 34. INDEXEDDB
//* ------------------------------------------------------------

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("NotesDB", 1);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("notes")) {
        db.createObjectStore("notes", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

//* IndexedDB is a transactional client-side database for structured data.


//* ------------------------------------------------------------
//* 35. INDEXEDDB WRITE
//* ------------------------------------------------------------

async function addNote(note) {
  const db = await openDatabase();
  const transaction = db.transaction("notes", "readwrite");
  const store = transaction.objectStore("notes");

  store.add(note);

  await new Promise((resolve, reject) => {
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(new Error("Transaction aborted"));
  });

  db.close();
}


//* ------------------------------------------------------------
//* 36. INDEXEDDB READ
//* ------------------------------------------------------------

async function getNote(id) {
  const db = await openDatabase();
  const transaction = db.transaction("notes", "readonly");
  const request = transaction.objectStore("notes").get(id);

  const result = await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  db.close();
  return result;
}


//* ------------------------------------------------------------
//* 37. CACHE API
//* ------------------------------------------------------------

async function cacheResponse() {
  if (!("caches" in window)) return;

  const cache = await caches.open("app-v1");
  await cache.put("/offline", new Response("Offline page"));

  const response = await cache.match("/offline");
  console.log(await response?.text());
}

//* Cache API stores Request/Response pairs and is commonly used with service workers.


//* ------------------------------------------------------------
//* 38. SERVICE WORKER
//* ------------------------------------------------------------

async function registerWorker() {
  if (!("serviceWorker" in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.register("/sw.js");
    console.log("Worker scope:", registration.scope);
  } catch (error) {
    console.error(error);
  }
}

//* Service workers operate separately from the page and can intercept supported
//* requests, coordinate caching and enable offline-oriented application behavior.


//* ------------------------------------------------------------
//* 39. BROADCAST CHANNEL
//* ------------------------------------------------------------

if ("BroadcastChannel" in window) {
  const channel = new BroadcastChannel("notes-app");

  channel.onmessage = (event) => {
    console.log("Received:", event.data);
  };

  channel.postMessage({ type: "NOTE_UPDATED", id: 10 });

  // channel.close();
}

//* Useful for same-origin tab/window communication.


//* ------------------------------------------------------------
//* 40. POST MESSAGE
//* ------------------------------------------------------------

window.addEventListener("message", (event) => {
  if (event.origin !== "https://trusted.example") return;

  console.log("Trusted message:", event.data);
});

//* Never blindly trust event.data from cross-window messages.
//* Validate origin and the message structure.


//* ------------------------------------------------------------
//* 41. WEB SHARE
//* ------------------------------------------------------------

async function sharePage() {
  if (!navigator.share) {
    console.log("Web Share API unavailable");
    return;
  }

  await navigator.share({
    title: document.title,
    text: "Check this page",
    url: location.href,
  });
}

//* Availability depends on browser/device and may require user activation.


//* ------------------------------------------------------------
//* 42. VIBRATION
//* ------------------------------------------------------------

function vibrate(pattern = 100) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

//* Support varies significantly by device/browser.


//* ------------------------------------------------------------
//* 43. FULLSCREEN
//* ------------------------------------------------------------

async function enterFullscreen(element) {
  if (!element.requestFullscreen) return;
  await element.requestFullscreen();
}

async function exitFullscreen() {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  }
}

//* Fullscreen behavior is permission/user-activation controlled by browsers.


//* ------------------------------------------------------------
//* 44. FULLSCREEN CHANGE
//* ------------------------------------------------------------

document.addEventListener("fullscreenchange", () => {
  console.log("Fullscreen element:", document.fullscreenElement);
});


//* ------------------------------------------------------------
//* 45. SCREEN WAKE LOCK
//* ------------------------------------------------------------

let wakeLock = null;

async function requestWakeLock() {
  if (!("wakeLock" in navigator)) return;

  try {
    wakeLock = await navigator.wakeLock.request("screen");
    console.log("Wake lock active");
  } catch (error) {
    console.error("Wake lock failed:", error);
  }
}

async function releaseWakeLock() {
  await wakeLock?.release();
  wakeLock = null;
}

//* Wake Lock prevents supported devices from dimming/sleeping the screen while
//* the page is active. Browser policies and permissions apply.


//* ------------------------------------------------------------
//* 46. PAGE VISIBILITY
//* ------------------------------------------------------------

function handleVisibility() {
  if (document.visibilityState === "hidden") {
    console.log("Pause nonessential work");
  } else {
    console.log("Resume page work");
  }
}

document.addEventListener("visibilitychange", handleVisibility);


//* ------------------------------------------------------------
//* 47. PERFORMANCE API
//* ------------------------------------------------------------

console.log(performance.now());
console.log(performance.timeOrigin);

//* performance.now() provides a high-resolution, monotonic time measurement
//* suitable for measuring durations.


//* ------------------------------------------------------------
//* 48. MEASURE A FUNCTION
//* ------------------------------------------------------------

function measure(fn) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();

  console.log(`Duration: ${(end - start).toFixed(2)}ms`);
  return result;
}

measure(() => {
  let total = 0;
  for (let i = 0; i < 1_000_000; i++) total += i;
  return total;
});

//* Measure real workloads and avoid drawing conclusions from one tiny benchmark.


//* ------------------------------------------------------------
//* 49. PERFORMANCE MARKS
//* ------------------------------------------------------------

performance.mark("operation-start");

for (let i = 0; i < 100_000; i++) {
  Math.sqrt(i);
}

performance.mark("operation-end");
performance.measure("operation", "operation-start", "operation-end");

console.log(performance.getEntriesByName("operation"));

//* User Timing APIs provide application-specific measurements.


//* ------------------------------------------------------------
//* 50. PERFORMANCE OBSERVER
//* ------------------------------------------------------------

if ("PerformanceObserver" in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log(entry.name, entry.duration);
    }
  });

  try {
    observer.observe({ entryTypes: ["measure"] });
  } catch (error) {
    console.log("Performance entry type unsupported:", error.message);
  }
}


//* ------------------------------------------------------------
//* 51. WEB CRYPTO
//* ------------------------------------------------------------

async function generateRandomBytes() {
  if (!crypto?.getRandomValues) {
    throw new Error("Web Crypto unavailable");
  }

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return bytes;
}

//* getRandomValues() provides cryptographically strong random values for supported
//* use cases. Math.random() is not a cryptographic random generator.


//* ------------------------------------------------------------
//* 52. HASH DATA WITH SUBTLE CRYPTO
//* ------------------------------------------------------------

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

//* Web Crypto provides cryptographic primitives. It is not a replacement for
//* correct authentication/password-storage architecture on the server.


//* ------------------------------------------------------------
//* 53. TEXT ENCODER
//* ------------------------------------------------------------

const encoder = new TextEncoder();
const encoded = encoder.encode("Hello JavaScript");
console.log(encoded);

//* TextEncoder converts a JavaScript string to UTF-8 bytes.


//* ------------------------------------------------------------
//* 54. TEXT DECODER
//* ------------------------------------------------------------

const decoder = new TextDecoder();
console.log(decoder.decode(encoded));

//* TextDecoder converts bytes back into text using an encoding, UTF-8 by default.


//* ------------------------------------------------------------
//* 55. REQUEST / RESPONSE
//* ------------------------------------------------------------

const request = new Request("/api/users", {
  method: "GET",
});

console.log(request.method, request.url);

const response = new Response(JSON.stringify({ ok: true }), {
  status: 200,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log(response.status);

//* Request and Response are foundational Fetch API objects.


//* ------------------------------------------------------------
//* 56. RESPONSE BODY CONSUMPTION
//* ------------------------------------------------------------

async function readResponseOnce(response) {
  const data = await response.json();
  console.log(data);

  //* A response body is generally consumable once.
  //* Use response.clone() when two independent consumers are required.
}


//* ------------------------------------------------------------
//* 57. RESPONSE CLONE
//* ------------------------------------------------------------

async function readResponseTwice(response) {
  const copy = response.clone();

  const first = await response.text();
  const second = await copy.text();

  return { first, second };
}


//* ------------------------------------------------------------
//* 58. ABORTABLE EVENT LISTENER
//* ------------------------------------------------------------

const controller = new AbortController();

window.addEventListener("click", () => {
  console.log("Clicked");
}, {
  signal: controller.signal,
});

//* controller.abort(); // removes the listener

//* AbortSignal is useful for lifecycle cleanup.


//* ------------------------------------------------------------
//* 59. EVENT TARGET
//* ------------------------------------------------------------

const target = new EventTarget();

function onCustomEvent(event) {
  console.log("Custom event:", event.detail);
}

target.addEventListener("app:update", onCustomEvent);
target.dispatchEvent(new CustomEvent("app:update", {
  detail: { id: 1 },
}));

target.removeEventListener("app:update", onCustomEvent);

//* EventTarget is a general event subscription mechanism used by many web APIs.


//* ------------------------------------------------------------
//* 60. CUSTOM EVENT
//* ------------------------------------------------------------

const event = new CustomEvent("cart:add", {
  detail: {
    productId: 101,
    quantity: 2,
  },
});

document.dispatchEvent(event);

//* CustomEvent lets application code communicate through the browser event model.


//* ------------------------------------------------------------
//* 61. BROADCAST VS CUSTOM EVENT
//* ------------------------------------------------------------

//* CustomEvent -> communication within the current JavaScript context/document.
//* BroadcastChannel -> communication between same-origin browsing contexts.


//* ------------------------------------------------------------
//* 62. WEB LOCKS PREVIEW
//* ------------------------------------------------------------

async function useExclusiveLock(task) {
  if (!("locks" in navigator)) {
    return task();
  }

  return navigator.locks.request("notes-sync", async () => {
    return task();
  });
}

//* Web Locks can coordinate work between same-origin contexts where supported.


//* ------------------------------------------------------------
//* 63. PAYMENT API — CONCEPT ONLY
//* ------------------------------------------------------------

//* The Payment Request API can provide a browser-mediated payment UI where
//* supported, but payment processing still requires a secure backend/payment
//* provider integration. Never treat browser code as the trust boundary.


//* ------------------------------------------------------------
//* 64. CREDENTIAL MANAGEMENT — CONCEPT
//* ------------------------------------------------------------

//* Credential Management APIs can integrate with browser-managed credentials.
//* Availability and credential types vary by browser and security context.


//* ------------------------------------------------------------
//* 65. WEB BLUETOOTH — CONCEPT
//* ------------------------------------------------------------

//* Web Bluetooth can communicate with supported Bluetooth Low Energy devices
//* where browser/device/security requirements permit it.
//* Feature-detect before offering the feature.


//* ------------------------------------------------------------
//* 66. WEB SERIAL — CONCEPT
//* ------------------------------------------------------------

//* Web Serial can communicate with serial devices in supporting browsers.
//* User permission and secure-context requirements apply.


//* ------------------------------------------------------------
//* 67. WEB HID — CONCEPT
//* ------------------------------------------------------------

//* WebHID can communicate with supported Human Interface Devices in browsers
//* that expose the API. It is permission-controlled and not universally supported.


//* ------------------------------------------------------------
//* 68. FILE SYSTEM ACCESS — CONCEPT
//* ------------------------------------------------------------

//* Some browsers expose File System Access APIs for user-selected local files.
//* The browser mediates access; a web page should not assume arbitrary filesystem access.


//* ------------------------------------------------------------
//* 69. FILE PICKER PREVIEW
//* ------------------------------------------------------------

async function chooseFile() {
  if (!window.showOpenFilePicker) {
    throw new Error("File System Access API unavailable");
  }

  const [handle] = await window.showOpenFilePicker({
    multiple: false,
  });

  const file = await handle.getFile();
  return file;
}

//* User interaction and browser support are required.


//* ------------------------------------------------------------
//* 70. FILE SYSTEM WRITE PREVIEW
//* ------------------------------------------------------------

async function saveTextFile() {
  if (!window.showSaveFilePicker) return;

  const handle = await window.showSaveFilePicker({
    suggestedName: "notes.txt",
    types: [
      {
        description: "Text file",
        accept: { "text/plain": [".txt"] },
      },
    ],
  });

  const writable = await handle.createWritable();
  await writable.write("Hello from browser JavaScript");
  await writable.close();
}


//* ------------------------------------------------------------
//* 71. WEB SHARE TARGET / PWA CONCEPT
//* ------------------------------------------------------------

//* Progressive Web Apps combine multiple browser capabilities:
//* - Web App Manifest
//* - Service Worker
//* - HTTPS/secure context
//* - responsive application UI
//* - installability criteria determined by browser/platform


//* ------------------------------------------------------------
//* 72. SERVICE WORKER MESSAGE
//* ------------------------------------------------------------

//* navigator.serviceWorker?.controller?.postMessage({
//*   type: "SYNC_NOTES",
//* });

//* Page and service worker contexts communicate through message passing.


//* ------------------------------------------------------------
//* 73. WORKER TYPES
//* ------------------------------------------------------------

//* Dedicated Worker -> normally communicates with one page/owner context.
//* Shared Worker -> can be shared by multiple same-origin contexts where supported.
//* Service Worker -> event-driven worker associated with an origin/scope and
//* designed for network/request and lifecycle-related capabilities.


//* ------------------------------------------------------------
//* 74. MAIN THREAD PERFORMANCE
//* ------------------------------------------------------------

function expensiveTask() {
  let result = 0;

  for (let i = 0; i < 10_000_000; i++) {
    result += Math.sqrt(i);
  }

  return result;
}

//* A large synchronous task blocks the main thread and can make UI input/rendering
//* unresponsive. Consider splitting work, using workers, or optimizing the algorithm.


//* ------------------------------------------------------------
//* 75. REQUEST IDLE CALLBACK — OPTIONAL API
//* ------------------------------------------------------------

if ("requestIdleCallback" in window) {
  requestIdleCallback((deadline) => {
    while (deadline.timeRemaining() > 0) {
      console.log("Do low-priority work");
      break;
    }
  });
}

//* Support varies. This API is for work that can wait; it is not a deadline guarantee.


//* ------------------------------------------------------------
//* 76. SCHEDULING MENTAL MODEL
//* ------------------------------------------------------------

//* Use:
//* - normal synchronous JS for small immediate work
//* - requestAnimationFrame for visual frame updates
//* - setTimeout for delayed scheduling
//* - requestIdleCallback where supported for low-priority work
//* - Web Workers for CPU-heavy work that can be moved off the main thread


//* ------------------------------------------------------------
//* 77. OBSERVER CLEANUP
//* ------------------------------------------------------------

function createObserver(element) {
  const observer = new IntersectionObserver((entries) => {
    console.log(entries.length);
  });

  observer.observe(element);

  return () => observer.disconnect();
}

//* Returning cleanup functions is a useful pattern in component/application code.


//* ------------------------------------------------------------
//* 78. API AVAILABILITY IS NOT API PERMISSION
//* ------------------------------------------------------------

//* "geolocation" in navigator
//* means the API is exposed.
//* It does NOT mean the user granted permission.
//*
//* Similarly, Notification may exist while permission is "denied" or "default".


//* ------------------------------------------------------------
//* 79. SECURE CONTEXTS
//* ------------------------------------------------------------

console.log(window.isSecureContext);

//* Some powerful APIs require a secure context, commonly HTTPS in production.
//* localhost is treated as trustworthy for many development scenarios.


//* ------------------------------------------------------------
//* 80. SAME-ORIGIN CONCEPT
//* ------------------------------------------------------------

//* Origin = scheme + hostname + port.
//*
//* https://example.com:443/a
//* and
//* https://example.com:443/b
//* have the same origin.
//*
//* https://api.example.com
//* is a different origin from https://example.com.


//* ------------------------------------------------------------
//* 81. CORS CONCEPT
//* ------------------------------------------------------------

//* CORS is a browser security mechanism controlling whether frontend JavaScript
//* may read cross-origin responses based on server-provided headers.
//* It does not make the server endpoint private from non-browser clients.


//* ------------------------------------------------------------
//* 82. CSP CONCEPT
//* ------------------------------------------------------------

//* Content Security Policy is a browser-enforced policy delivered primarily through
//* HTTP headers (and sometimes a meta element) that can restrict script/resource sources.
//* It is an important defense-in-depth measure against some classes of XSS.


//* ------------------------------------------------------------
//* 83. WEB STORAGE VS INDEXEDDB
//* ------------------------------------------------------------

//* localStorage/sessionStorage
//* -> simple string key/value storage
//* -> synchronous API
//* -> small/simple application preferences
//*
//* IndexedDB
//* -> structured client-side database
//* -> asynchronous/event-driven API
//* -> larger/more complex offline data


//* ------------------------------------------------------------
//* 84. CACHE API VS INDEXEDDB
//* ------------------------------------------------------------

//* Cache API -> Request/Response resources.
//* IndexedDB -> application data/records.
//*
//* They solve different storage problems and can be used together in offline apps.


//* ------------------------------------------------------------
//* 85. COMMON MISTAKE — FETCH
//* ------------------------------------------------------------

//* Wrong:
//* fetch("/api").then((response) => response.json());
//* assuming every HTTP status is success.
//*
//* Better:
//* Check response.ok/status before consuming the expected success payload.


//* ------------------------------------------------------------
//* 86. COMMON MISTAKE — OBJECT URL LEAK
//* ------------------------------------------------------------

//* Wrong:
//* const url = URL.createObjectURL(blob);
//* image.src = url;
//* and never revoke it.
//*
//* Better:
//* URL.revokeObjectURL(url) when the object URL is no longer needed.


//* ------------------------------------------------------------
//* 87. COMMON MISTAKE — CAMERA STREAM NEVER STOPPED
//* ------------------------------------------------------------

//* Wrong:
//* const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//* // forget about it
//*
//* Better:
//* stream.getTracks().forEach(track => track.stop());


//* ------------------------------------------------------------
//* 88. COMMON MISTAKE — TRUSTING POSTMESSAGE
//* ------------------------------------------------------------

//* Wrong:
//* window.addEventListener("message", (event) => use(event.data));
//*
//* Better:
//* validate event.origin and the message schema before acting.


//* ------------------------------------------------------------
//* 89. COMMON MISTAKE — LOCAL STORAGE FOR EVERYTHING
//* ------------------------------------------------------------

//* Do not use localStorage as a general database.
//* Use IndexedDB for structured/offline datasets and server-side storage for
//* authoritative application data.


//* ------------------------------------------------------------
//* 90. COMMON MISTAKE — BLOCKING MAIN THREAD
//* ------------------------------------------------------------

//* A loop that takes hundreds of milliseconds can block:
//* input -> rendering -> animations -> other page JavaScript.
//*
//* Measure first, then optimize or move suitable work to a Worker.


//* ------------------------------------------------------------
//* 91. COMMON MISTAKE — FEATURE DETECTION
//* ------------------------------------------------------------

//* Wrong:
//* if (isChrome) useAPI();
//*
//* Better:
//* if ("someApi" in navigator) useAPI();


//* ------------------------------------------------------------
//* 92. DEBUGGING CHECKLIST
//* ------------------------------------------------------------

//* 1. Is this API actually supported by the target browser?
//* 2. Is a secure context required?
//* 3. Is user permission required?
//* 4. Is user activation required?
//* 5. Is the origin/cross-origin policy involved?
//* 6. Did the server return a valid HTTP status/payload?
//* 7. Did I clean up streams, observers, workers and object URLs?
//* 8. Am I blocking the main thread?
//* 9. Is the API asynchronous?
//* 10. Is browser privacy mode affecting behavior?


//* ------------------------------------------------------------
//* 93. OUTPUT PREDICTION
//* ------------------------------------------------------------

console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");

//* Typical output:
//* A
//* D
//* C
//* B


//* ------------------------------------------------------------
//* 94. MINI PROJECT IDEAS
//* ------------------------------------------------------------

//* 1. Weather app using Fetch + AbortController.
//* 2. Image previewer using File API + Blob URL.
//* 3. Offline notes app using IndexedDB + Service Worker.
//* 4. Infinite image feed using IntersectionObserver.
//* 5. Responsive dashboard using ResizeObserver.
//* 6. Camera capture app using MediaDevices + Canvas.
//* 7. Clipboard-based code snippet manager.
//* 8. Cross-tab notes sync using BroadcastChannel.
//* 9. Background CPU calculator using Web Worker.
//* 10. PWA with Cache API and offline fallback.


//* ------------------------------------------------------------
//* 95. CODING CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1: Fetch users and render loading/error/success states.
//* Challenge 2: Add request timeout using AbortController.
//* Challenge 3: Upload an image and show a local preview.
//* Challenge 4: Store notes in IndexedDB.
//* Challenge 5: Lazy-load images using IntersectionObserver.
//* Challenge 6: Detect element resizing with ResizeObserver.
//* Challenge 7: Build a camera preview and capture a frame to Canvas.
//* Challenge 8: Move a large calculation into a Web Worker.
//* Challenge 9: Build a cross-tab notification system with BroadcastChannel.
//* Challenge 10: Measure an operation using Performance marks/measures.
//* Challenge 11: Create a clipboard copy component.
//* Challenge 12: Build an offline-first notes page.
//* Challenge 13: Build a file picker/editor using File System Access where supported.
//* Challenge 14: Build a geolocation permission UI.
//* Challenge 15: Build a secure postMessage communication demo.


//* ------------------------------------------------------------
//* 96. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1: fetch returns 404 but catch() did not execute.
//* Debug 2: image preview memory usage keeps increasing.
//* Debug 3: camera light remains active after leaving the page/component.
//* Debug 4: IndexedDB transaction unexpectedly aborts.
//* Debug 5: observer callback fires too often.
//* Debug 6: worker never responds.
//* Debug 7: cross-tab message never arrives.
//* Debug 8: clipboard works on desktop but fails in another context.
//* Debug 9: API works locally but CORS blocks browser access in production.
//* Debug 10: canvas export throws because the canvas is tainted.


//* ------------------------------------------------------------
//* 97. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is a browser API?
//* 2. ECMAScript vs browser APIs?
//* 3. What does fetch() resolve/reject on?
//* 4. Why check response.ok?
//* 5. What is AbortController?
//* 6. Blob vs File?
//* 7. Why revoke object URLs?
//* 8. What is FormData?
//* 9. Why should multipart boundaries not be manually set?
//* 10. What is IndexedDB?
//* 11. IndexedDB vs localStorage?
//* 12. Cache API vs IndexedDB?
//* 13. What is a Web Worker?
//* 14. Why use workers?
//* 15. What is structured cloning?
//* 16. What is IntersectionObserver?
//* 17. What is ResizeObserver?
//* 18. What is MutationObserver?
//* 19. What is Canvas?
//* 20. Why can a canvas become tainted?
//* 21. What is getUserMedia?
//* 22. Why must media tracks be stopped?
//* 23. What is postMessage?
//* 24. Why validate event.origin?
//* 25. What is BroadcastChannel?
//* 26. What is the Performance API used for?
//* 27. Why is Math.random() not cryptographic?
//* 28. What is a secure context?
//* 29. What is CORS?
//* 30. What does feature detection mean?


//* ------------------------------------------------------------
//* 98. INTERVIEW QUESTIONS
//* ------------------------------------------------------------

//* Q1. Explain the Fetch API and its error model.
//* Q2. How would you cancel a fetch request?
//* Q3. Blob vs File vs ArrayBuffer?
//* Q4. Explain URL.createObjectURL() and revokeObjectURL().
//* Q5. How does IndexedDB differ from localStorage?
//* Q6. What is a service worker?
//* Q7. Cache API vs HTTP cache?
//* Q8. What is a Web Worker and when should you use one?
//* Q9. Explain structured clone and transferable objects.
//* Q10. IntersectionObserver vs scroll event?
//* Q11. ResizeObserver vs window resize?
//* Q12. What is MutationObserver?
//* Q13. How do you safely handle camera/microphone streams?
//* Q14. How would you secure postMessage communication?
//* Q15. What is CORS and what does it not protect?
//* Q16. What is a secure context?
//* Q17. How would you debug a browser API unavailable error?
//* Q18. How would you prevent object URL/observer/worker leaks?
//* Q19. How can browser APIs affect Core Web Vitals?
//* Q20. Why should feature detection be preferred to browser sniffing?


//* ------------------------------------------------------------
//* 99. MASTERY CHECKLIST
//* ------------------------------------------------------------

//* [ ] I understand ECMAScript vs browser APIs.
//* [ ] I can use Fetch and inspect HTTP responses.
//* [ ] I can cancel async browser operations with AbortController.
//* [ ] I understand URL, URLSearchParams and FormData.
//* [ ] I understand Blob, File and object URLs.
//* [ ] I can work with Clipboard, Notifications and Geolocation safely.
//* [ ] I understand Canvas basics.
//* [ ] I understand IndexedDB at a practical level.
//* [ ] I understand Cache API and service workers.
//* [ ] I know when Web Workers are useful.
//* [ ] I understand observers and cleanup.
//* [ ] I understand postMessage and same-origin security.
//* [ ] I can measure performance with the Performance API.
//* [ ] I understand Web Crypto at a high level.
//* [ ] I know secure-context and permission requirements.
//* [ ] I use feature detection.
//* [ ] I can debug browser API failures systematically.

//* ============================================================
//* FINAL MENTAL MODEL
//* ============================================================

//* Think of browser APIs as capabilities supplied by the host environment:
//*
//* JavaScript
//*    |
//*    +--> DOM ------------> Document/UI
//*    +--> Fetch -----------> Network
//*    +--> Storage ----------> localStorage / IndexedDB
//*    +--> Media ------------> Camera / Microphone
//*    +--> Workers ----------> Background JS execution
//*    +--> Observers --------> Visibility / size / DOM changes
//*    +--> Canvas -----------> Graphics
//*    +--> Crypto -----------> Cryptographic primitives
//*    +--> Service Worker ---> Offline/network lifecycle
//*
//* The language gives you JavaScript itself; the browser supplies capabilities
//* around that language. Learn the API contract, permission model, security model,
//* lifecycle and cleanup requirements for every capability you use.

//* END OF BROWSER APIs
