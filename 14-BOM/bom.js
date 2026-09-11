//* ============================================================
//* JAVASCRIPT BOM — BROWSER OBJECT MODEL — PRACTICAL COMPANION
//* ============================================================

//* Definition:
//* BOM = Browser Object Model.
//* It is the collection of browser-provided objects/APIs used to interact
//* with the browser environment outside the document's DOM tree.
//*
//* Important distinction:
//* - ECMAScript defines JavaScript language features.
//* - DOM APIs represent/manipulate the document.
//* - BOM/host APIs expose browser environment features such as window,
//*   location, history, navigator, storage, timers and viewport information.
//*
//* Run this file in a browser. Many examples are intentionally guarded so
//* the file is easier to study without breaking the page.


//* ------------------------------------------------------------
//* 1. WINDOW
//* ------------------------------------------------------------

console.log(window);
console.log(window.document);
console.log(window.location);

//* In a normal browser page, window represents the top-level browsing context.
//* Many browser globals are available as properties of window.


//* ------------------------------------------------------------
//* 2. GLOBAL VARIABLES AND WINDOW
//* ------------------------------------------------------------

var legacyGlobal = "hello";
console.log(window.legacyGlobal);

//* A top-level var in a classic browser script can become a window property.
//* Top-level let/const do not behave this way.

let modernGlobal = "hello";
const anotherModernGlobal = "world";

console.log(window.modernGlobal); // undefined in a classic script
console.log(window.anotherModernGlobal); // undefined in a classic script

//* Module scripts have their own module scope and do not create window globals
//* from top-level declarations either.


//* ------------------------------------------------------------
//* 3. WINDOW SIZE
//* ------------------------------------------------------------

console.log(window.innerWidth);
console.log(window.innerHeight);

//* innerWidth/innerHeight describe the viewport dimensions in CSS pixels.


//* ------------------------------------------------------------
//* 4. OUTER WINDOW SIZE
//* ------------------------------------------------------------

console.log(window.outerWidth);
console.log(window.outerHeight);

//* outer dimensions describe the browser window's outer area where supported.
//* They are not the same as the page viewport.


//* ------------------------------------------------------------
//* 5. DEVICE PIXEL RATIO
//* ------------------------------------------------------------

console.log(window.devicePixelRatio);

//* Indicates the ratio between physical device pixels and CSS pixels.


//* ------------------------------------------------------------
//* 6. SCREEN
//* ------------------------------------------------------------

console.log(screen.width);
console.log(screen.height);
console.log(screen.availWidth);
console.log(screen.availHeight);

//* screen describes the user's display environment.
//* It is different from the current page viewport.


//* ------------------------------------------------------------
//* 7. VIEWPORT VS SCREEN
//* ------------------------------------------------------------

//* Viewport:
//* window.innerWidth / window.innerHeight
//*
//* Screen:
//* screen.width / screen.height
//*
//* A browser window can occupy only part of a physical display, so these
//* values should not be treated as interchangeable.


//* ------------------------------------------------------------
//* 8. ALERT
//* ------------------------------------------------------------

//* alert("Hello");

//* Shows a modal browser dialog.
//* Avoid excessive use because it blocks interaction.


//* ------------------------------------------------------------
//* 9. CONFIRM
//* ------------------------------------------------------------

//* const accepted = confirm("Delete this item?");
//* console.log(accepted); // true or false


//* ------------------------------------------------------------
//* 10. PROMPT
//* ------------------------------------------------------------

//* const name = prompt("What is your name?");
//* console.log(name); // string or null

//* Never assume prompt input is already a number.


//* ------------------------------------------------------------
//* 11. OPEN
//* ------------------------------------------------------------

//* const newWindow = window.open("https://example.com", "_blank");
//* console.log(newWindow);

//* Modern browsers may block unsolicited popups.
//* window.open() can return null when blocked or unavailable.


//* ------------------------------------------------------------
//* 12. CLOSE
//* ------------------------------------------------------------

//* newWindow?.close();

//* A script generally cannot arbitrarily close a browser tab/window that the
//* user opened themselves. Restrictions are browser-controlled.


//* ------------------------------------------------------------
//* 13. MOVE / RESIZE WINDOW
//* ------------------------------------------------------------

//* window.moveTo(0, 0);
//* window.resizeTo(800, 600);

//* Modern browsers restrict these operations, especially for normal tabs.
//* Do not build application logic that depends on them.


//* ------------------------------------------------------------
//* 14. LOCATION OBJECT
//* ------------------------------------------------------------

console.log(location.href);
console.log(location.protocol);
console.log(location.host);
console.log(location.hostname);
console.log(location.port);
console.log(location.pathname);
console.log(location.search);
console.log(location.hash);

//* location describes the current URL and provides navigation methods.


//* ------------------------------------------------------------
//* 15. URL EXAMPLE
//* ------------------------------------------------------------

//* For:
//* https://example.com:443/products?id=10#reviews
//*
//* protocol  -> https:
//* hostname  -> example.com
//* port      -> 443
//* pathname  -> /products
//* search    -> ?id=10
//* hash      -> #reviews


//* ------------------------------------------------------------
//* 16. LOCATION HREF
//* ------------------------------------------------------------

//* location.href = "/dashboard";

//* Assigning href navigates the current browsing context.


//* ------------------------------------------------------------
//* 17. LOCATION ASSIGN
//* ------------------------------------------------------------

//* location.assign("/login");

//* Navigates to a new URL and creates a history entry.


//* ------------------------------------------------------------
//* 18. LOCATION REPLACE
//* ------------------------------------------------------------

//* location.replace("/login");

//* Navigates without keeping the current page as a normal history entry.
//* Useful after some redirects where going Back should not return to the page.


//* ------------------------------------------------------------
//* 19. LOCATION RELOAD
//* ------------------------------------------------------------

//* location.reload();

//* Reloads the current document.


//* ------------------------------------------------------------
//* 20. HISTORY
//* ------------------------------------------------------------

console.log(history.length);

//* history represents the session history associated with the browsing context.


//* ------------------------------------------------------------
//* 21. HISTORY BACK/FORWARD
//* ------------------------------------------------------------

//* history.back();
//* history.forward();

//* These behave similarly to browser Back/Forward navigation.


//* ------------------------------------------------------------
//* 22. HISTORY GO
//* ------------------------------------------------------------

//* history.go(-1); // back one entry
//* history.go(1);  // forward one entry


//* ------------------------------------------------------------
//* 23. PUSH STATE
//* ------------------------------------------------------------

history.pushState({ page: "profile" }, "", "/profile");
console.log(location.pathname);

//* pushState changes the URL/history state without loading the new URL.
//* The requested URL must obey same-origin restrictions.


//* ------------------------------------------------------------
//* 24. REPLACE STATE
//* ------------------------------------------------------------

history.replaceState({ page: "profile" }, "", "/profile?tab=posts");
console.log(location.href);

//* replaceState updates the current history entry instead of adding one.


//* ------------------------------------------------------------
//* 25. POPSTATE
//* ------------------------------------------------------------

window.addEventListener("popstate", (event) => {
  console.log("History state changed", event.state);
});

//* popstate fires when active history entry changes through browser history
//* navigation such as Back/Forward.


//* ------------------------------------------------------------
//* 26. SPA ROUTING IDEA
//* ------------------------------------------------------------

function renderRoute() {
  const path = location.pathname;
  console.log("Current route:", path);
}

renderRoute();

//* Basic SPA flow:
//* click link -> prevent default -> pushState -> renderRoute()
//* browser Back/Forward -> popstate -> renderRoute()


//* ------------------------------------------------------------
//* 27. HASH NAVIGATION
//* ------------------------------------------------------------

window.addEventListener("hashchange", () => {
  console.log("Hash changed:", location.hash);
});

//* hashchange fires when the URL fragment changes.


//* ------------------------------------------------------------
//* 28. HASH ROUTER IDEA
//* ------------------------------------------------------------

function getHashRoute() {
  return location.hash.slice(1) || "home";
}

console.log(getHashRoute());


//* ------------------------------------------------------------
//* 29. NAVIGATOR
//* ------------------------------------------------------------

console.log(navigator);
console.log(navigator.userAgent);
console.log(navigator.language);
console.log(navigator.languages);
console.log(navigator.onLine);

//* navigator exposes information and capabilities related to the browser/user agent.


//* ------------------------------------------------------------
//* 30. ONLINE/OFFLINE EVENTS
//* ------------------------------------------------------------

window.addEventListener("online", () => {
  console.log("Browser reports online");
});

window.addEventListener("offline", () => {
  console.log("Browser reports offline");
});

//* navigator.onLine is a browser connectivity hint, not proof that your API/server
//* is reachable.


//* ------------------------------------------------------------
//* 31. LANGUAGE
//* ------------------------------------------------------------

console.log(navigator.language);
console.log(navigator.languages);

//* Useful for selecting initial UI locale, but server/application preferences
//* should also be considered.


//* ------------------------------------------------------------
//* 32. USER AGENT
//* ------------------------------------------------------------

console.log(navigator.userAgent);

//* Do not build fragile browser detection from userAgent when feature detection
//* can solve the problem.


//* ------------------------------------------------------------
//* 33. FEATURE DETECTION
//* ------------------------------------------------------------

if ("geolocation" in navigator) {
  console.log("Geolocation API is exposed");
}

if ("serviceWorker" in navigator) {
  console.log("Service workers are exposed");
}

//* Prefer capability/feature detection over browser-name assumptions.


//* ------------------------------------------------------------
//* 34. TIMERS — SET TIMEOUT
//* ------------------------------------------------------------

const timeoutId = setTimeout(() => {
  console.log("Timeout callback executed");
}, 1000);

console.log(timeoutId);

//* setTimeout schedules a callback after a minimum delay.
//* It does not guarantee exact execution at that millisecond.


//* ------------------------------------------------------------
//* 35. CLEAR TIMEOUT
//* ------------------------------------------------------------

clearTimeout(timeoutId);

//* Cancels a pending timeout using its returned identifier.


//* ------------------------------------------------------------
//* 36. SET INTERVAL
//* ------------------------------------------------------------

let count = 0;

const intervalId = setInterval(() => {
  count++;
  console.log("Interval:", count);

  if (count === 3) {
    clearInterval(intervalId);
  }
}, 1000);

//* setInterval repeatedly schedules callbacks until cleared.


//* ------------------------------------------------------------
//* 37. CLEAR INTERVAL
//* ------------------------------------------------------------

//* clearInterval(intervalId);


//* ------------------------------------------------------------
//* 38. TIMER GOTCHA
//* ------------------------------------------------------------

console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");

//* Typical output:
//* A
//* C
//* B
//*
//* A zero-millisecond timeout still waits for the current JavaScript work to
//* finish before its callback can run.


//* ------------------------------------------------------------
//* 39. MICROTASK PREVIEW
//* ------------------------------------------------------------

console.log("1");

Promise.resolve().then(() => console.log("2 - microtask"));
setTimeout(() => console.log("3 - timer"), 0);

console.log("4");

//* Typical output:
//* 1
//* 4
//* 2 - microtask
//* 3 - timer


//* ------------------------------------------------------------
//* 40. REQUEST ANIMATION FRAME
//* ------------------------------------------------------------

const animationFrameId = requestAnimationFrame((timestamp) => {
  console.log("Animation frame:", timestamp);
});

console.log(animationFrameId);

//* requestAnimationFrame schedules work for a browser rendering opportunity.
//* It is appropriate for visual animation updates.


//* ------------------------------------------------------------
//* 41. CANCEL ANIMATION FRAME
//* ------------------------------------------------------------

cancelAnimationFrame(animationFrameId);


//* ------------------------------------------------------------
//* 42. ANIMATION LOOP
//* ------------------------------------------------------------

let animationStart = null;
let animationFrame;

function animate(timestamp) {
  if (animationStart === null) animationStart = timestamp;

  const elapsed = timestamp - animationStart;
  console.log("Elapsed:", elapsed);

  if (elapsed < 1000) {
    animationFrame = requestAnimationFrame(animate);
  }
}

animationFrame = requestAnimationFrame(animate);

//* The timestamp supplied by requestAnimationFrame lets animation logic use
//* elapsed time rather than assuming every frame takes the same duration.


//* ------------------------------------------------------------
//* 43. VISIBILITY STATE
//* ------------------------------------------------------------

console.log(document.visibilityState);

window.addEventListener("visibilitychange", () => {
  console.log("Visibility:", document.visibilityState);
});

//* Useful for pausing nonessential work when a tab is hidden.


//* ------------------------------------------------------------
//* 44. PAGE LIFECYCLE IDEA
//* ------------------------------------------------------------

//* Common browser lifecycle signals include:
//* DOMContentLoaded
//* load
//* visibilitychange
//* pageshow
//* pagehide
//* beforeunload
//*
//* Choose the event based on what you actually need.


//* ------------------------------------------------------------
//* 45. PAGESHOW / PAGEHIDE
//* ------------------------------------------------------------

window.addEventListener("pageshow", (event) => {
  console.log("pageshow", event.persisted);
});

window.addEventListener("pagehide", (event) => {
  console.log("pagehide", event.persisted);
});

//* pageshow/pagehide are useful for page lifecycle handling, including cases
//* involving the back-forward cache (bfcache).


//* ------------------------------------------------------------
//* 46. BEFOREUNLOAD
//* ------------------------------------------------------------

//* window.addEventListener("beforeunload", (event) => {
//*   if (hasUnsavedChanges()) {
//*     event.preventDefault();
//*   }
//* });

//* Use sparingly. Browsers control the exact confirmation UI.


//* ------------------------------------------------------------
//* 47. STORAGE — LOCAL STORAGE
//* ------------------------------------------------------------

localStorage.setItem("theme", "dark");
console.log(localStorage.getItem("theme"));

//* localStorage stores string key/value pairs that persist across browser sessions
//* for the relevant origin, subject to browser privacy/storage policies.


//* ------------------------------------------------------------
//* 48. REMOVE STORAGE
//* ------------------------------------------------------------

localStorage.removeItem("theme");


//* ------------------------------------------------------------
//* 49. CLEAR STORAGE
//* ------------------------------------------------------------

//* localStorage.clear();
//*
//* Be careful: this removes all localStorage entries for the current origin.


//* ------------------------------------------------------------
//* 50. SESSION STORAGE
//* ------------------------------------------------------------

sessionStorage.setItem("draft", "Hello");
console.log(sessionStorage.getItem("draft"));

//* sessionStorage is scoped to the page session/tab context and stores strings.


//* ------------------------------------------------------------
//* 51. STORE OBJECTS CORRECTLY
//* ------------------------------------------------------------

const settings = {
  theme: "dark",
  fontSize: 16,
};

localStorage.setItem("settings", JSON.stringify(settings));

const parsedSettings = JSON.parse(localStorage.getItem("settings") || "null");
console.log(parsedSettings);

//* Storage APIs store strings, so objects need serialization such as JSON.


//* ------------------------------------------------------------
//* 52. STORAGE EVENTS
//* ------------------------------------------------------------

window.addEventListener("storage", (event) => {
  console.log({
    key: event.key,
    oldValue: event.oldValue,
    newValue: event.newValue,
    url: event.url,
  });
});

//* A storage event can notify other same-origin browsing contexts about a
//* localStorage change. It is not generally fired in the same document that
//* performed the change.


//* ------------------------------------------------------------
//* 53. STORAGE SECURITY
//* ------------------------------------------------------------

//* Do not store sensitive authentication secrets in localStorage merely because
//* it is convenient. JavaScript running on the origin can read localStorage.
//* For authentication, evaluate HttpOnly Secure SameSite cookies and other
//* architecture choices based on the application's threat model.


//* ------------------------------------------------------------
//* 54. COOKIES — DOCUMENT API
//* ------------------------------------------------------------

console.log(document.cookie);

//* document.cookie exposes cookies available to JavaScript for the current document.
//* HttpOnly cookies are not accessible through document.cookie.


//* ------------------------------------------------------------
//* 55. SET COOKIE
//* ------------------------------------------------------------

//* document.cookie = "theme=dark; Max-Age=3600; Path=/; SameSite=Lax";

//* Cookie attributes control scope, lifetime and cross-site behavior.


//* ------------------------------------------------------------
//* 56. COOKIE SECURITY FLAGS
//* ------------------------------------------------------------

//* Secure  -> send cookie over HTTPS (with browser rules).
//* HttpOnly -> JavaScript cannot read it.
//* SameSite -> controls cross-site cookie sending behavior.
//* Path -> limits URL path scope.
//* Domain -> controls domain scope.


//* ------------------------------------------------------------
//* 57. MEDIA QUERY
//* ------------------------------------------------------------

const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
console.log(darkQuery.matches);

//* matchMedia returns a MediaQueryList describing whether a CSS media query matches.


//* ------------------------------------------------------------
//* 58. MEDIA QUERY CHANGE
//* ------------------------------------------------------------

function handleThemePreference(event) {
  console.log("Dark mode preferred:", event.matches);
}

darkQuery.addEventListener("change", handleThemePreference);

//* remove later if no longer needed:
//* darkQuery.removeEventListener("change", handleThemePreference);


//* ------------------------------------------------------------
//* 59. RESPONSIVE UI IDEA
//* ------------------------------------------------------------

const mobileQuery = matchMedia("(max-width: 768px)");

function updateLayout(event) {
  document.body.dataset.layout = event.matches ? "mobile" : "desktop";
}

updateLayout(mobileQuery);
mobileQuery.addEventListener("change", updateLayout);


//* ------------------------------------------------------------
//* 60. NAVIGATOR CLIPBOARD
//* ------------------------------------------------------------

async function copyText(text) {
  if (!navigator.clipboard) {
    throw new Error("Clipboard API is unavailable");
  }

  await navigator.clipboard.writeText(text);
}

//* Clipboard APIs are subject to secure-context and permission/user-activation
//* requirements depending on the operation and browser.


//* ------------------------------------------------------------
//* 61. GEOLOCATION
//* ------------------------------------------------------------

function requestLocation() {
  if (!("geolocation" in navigator)) {
    console.log("Geolocation unavailable");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
    },
    (error) => {
      console.log("Location error:", error.code, error.message);
    },
    {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 60_000,
    }
  );
}

//* Geolocation requires explicit user permission and should be requested only
//* when the feature genuinely needs it.


//* ------------------------------------------------------------
//* 62. WATCH POSITION
//* ------------------------------------------------------------

//* const watchId = navigator.geolocation.watchPosition(success, error, options);
//* navigator.geolocation.clearWatch(watchId);

//* watchPosition can receive location updates until cleared or otherwise stopped.


//* ------------------------------------------------------------
//* 63. NETWORK INFORMATION — FEATURE DETECTION
//* ------------------------------------------------------------

if ("connection" in navigator) {
  console.log(navigator.connection);
}

//* Some browsers expose Network Information APIs; support varies.
//* Always feature-detect optional browser APIs.


//* ------------------------------------------------------------
//* 64. HARDWARE CONCURRENCY
//* ------------------------------------------------------------

console.log(navigator.hardwareConcurrency);

//* Gives a browser-provided estimate of logical processor availability.
//* It should not be treated as an exact physical-core count.


//* ------------------------------------------------------------
//* 65. MAX TOUCH POINTS
//* ------------------------------------------------------------

console.log(navigator.maxTouchPoints);

//* Indicates the maximum number of simultaneous touch contacts the browser reports.


//* ------------------------------------------------------------
//* 66. PERMISSIONS API
//* ------------------------------------------------------------

async function checkNotificationPermission() {
  if (!("permissions" in navigator)) return;

  try {
    const status = await navigator.permissions.query({ name: "notifications" });
    console.log("Notification permission:", status.state);
  } catch (error) {
    console.log("Permissions query unsupported:", error.message);
  }
}

//* Permissions API support differs by browser and permission type.


//* ------------------------------------------------------------
//* 67. NOTIFICATIONS
//* ------------------------------------------------------------

async function showNotificationExample() {
  if (!("Notification" in window)) return;

  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    new Notification("Hello", {
      body: "Notification example",
    });
  }
}

//* Notification permission should be requested in an appropriate user flow,
//* not immediately on every page load.


//* ------------------------------------------------------------
//* 68. SERVICE WORKER PREVIEW
//* ------------------------------------------------------------

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.register("/sw.js");
    console.log("Service worker registered:", registration.scope);
  } catch (error) {
    console.error("Service worker registration failed:", error);
  }
}

//* Service workers require appropriate secure contexts in normal deployment
//* (localhost is generally treated as trustworthy for development).


//* ------------------------------------------------------------
//* 69. SERVICE WORKER IDEA
//* ------------------------------------------------------------

//* Page JavaScript
//*      |
//*      v
//* Service Worker
//*      |
//*      +--> Cache API
//*      +--> Network
//*      +--> Offline response
//*
//* A service worker runs separately from the page's normal JavaScript context.


//* ------------------------------------------------------------
//* 70. BROWSER CACHE API PREVIEW
//* ------------------------------------------------------------

async function cacheExample() {
  if (!("caches" in window)) return;

  const cache = await caches.open("demo-v1");
  await cache.put("/demo-data", new Response("cached data"));

  const response = await cache.match("/demo-data");
  console.log(await response?.text());
}

//* Cache API is a browser API and is not the same thing as HTTP cache semantics.


//* ------------------------------------------------------------
//* 71. BROADCAST CHANNEL
//* ------------------------------------------------------------

if ("BroadcastChannel" in window) {
  const channel = new BroadcastChannel("app-events");

  channel.onmessage = (event) => {
    console.log("Broadcast message:", event.data);
  };

  channel.postMessage({ type: "THEME_CHANGED", theme: "dark" });

  // channel.close(); // close when finished
}

//* BroadcastChannel allows same-origin browsing contexts to communicate.


//* ------------------------------------------------------------
//* 72. WINDOW MESSAGE
//* ------------------------------------------------------------

window.addEventListener("message", (event) => {
  console.log("Message received:", event.data);
});

//* For cross-window messaging, validate event.origin and message shape before
//* trusting received data.


//* ------------------------------------------------------------
//* 73. POST MESSAGE
//* ------------------------------------------------------------

//* otherWindow.postMessage({ type: "PING" }, "https://example.com");
//*
//* Prefer an exact target origin rather than "*" when the destination is known.


//* ------------------------------------------------------------
//* 74. CROSS-ORIGIN SECURITY
//* ------------------------------------------------------------

//* Same-origin policy restricts many interactions between different origins.
//* postMessage provides an intentional communication mechanism.
//*
//* Origin = scheme + host + port.


//* ------------------------------------------------------------
//* 75. BEFORE HISTORY NAVIGATION
//* ------------------------------------------------------------

function goBackSafely() {
  if (history.length > 1) {
    history.back();
  }
}

//* history.length alone does not tell you whether the previous entry belongs to
//* your application or another site. Do not use it as a security boundary.


//* ------------------------------------------------------------
//* 76. URL SEARCH PARAMS
//* ------------------------------------------------------------

const params = new URLSearchParams(location.search);
console.log(params.get("id"));
console.log(params.has("id"));

//* URLSearchParams is a web API useful for parsing and building query strings.


//* ------------------------------------------------------------
//* 77. BUILD QUERY STRING
//* ------------------------------------------------------------

const query = new URLSearchParams({
  search: "javascript",
  page: "2",
});

console.log(query.toString());


//* ------------------------------------------------------------
//* 78. SCROLL POSITION
//* ------------------------------------------------------------

console.log(window.scrollX);
console.log(window.scrollY);

//* These represent the page's horizontal/vertical scroll offsets.


//* ------------------------------------------------------------
//* 79. SCROLL TO
//* ------------------------------------------------------------

//* window.scrollTo({
//*   top: 0,
//*   behavior: "smooth",
//* });


//* ------------------------------------------------------------
//* 80. SCROLL BY
//* ------------------------------------------------------------

//* window.scrollBy({
//*   top: 300,
//*   behavior: "smooth",
//* });


//* ------------------------------------------------------------
//* 81. RESIZE EVENT
//* ------------------------------------------------------------

window.addEventListener("resize", () => {
  console.log("Viewport:", window.innerWidth, window.innerHeight);
});

//* Do not run expensive layout work directly on every resize event without
//* considering throttling/debouncing.


//* ------------------------------------------------------------
//* 82. SCROLL EVENT
//* ------------------------------------------------------------

window.addEventListener("scroll", () => {
  console.log("Scroll position:", window.scrollY);
}, { passive: true });

//* passive listeners tell the browser the handler will not call preventDefault()
//* for that event. This can help scrolling performance where appropriate.


//* ------------------------------------------------------------
//* 83. ONLINE STATUS UI
//* ------------------------------------------------------------

function updateConnectionStatus() {
  document.body.dataset.connection = navigator.onLine ? "online" : "offline";
}

updateConnectionStatus();
window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);


//* ------------------------------------------------------------
//* 84. SIMPLE THEME PREFERENCE
//* ------------------------------------------------------------

function getInitialTheme() {
  const saved = localStorage.getItem("theme");

  if (saved === "dark" || saved === "light") {
    return saved;
  }

  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

console.log("Initial theme:", getInitialTheme());


//* ------------------------------------------------------------
//* 85. SIMPLE ROUTER
//* ------------------------------------------------------------

const routes = {
  "/": "Home",
  "/about": "About",
  "/contact": "Contact",
};

function renderCurrentRoute() {
  const page = routes[location.pathname] || "404";
  console.log("Render:", page);
}

renderCurrentRoute();

window.addEventListener("popstate", renderCurrentRoute);

//* A real router must also handle link clicks, dynamic segments, nested routes,
//* scroll behavior and error handling.


//* ------------------------------------------------------------
//* 86. COMMON MISTAKE — ASSUMING navigator.onLine IS API HEALTH
//* ------------------------------------------------------------

//* Wrong mental model:
//* navigator.onLine === true -> my backend definitely works.
//*
//* Correct:
//* navigator.onLine is only a connectivity hint. Your API request can still fail.


//* ------------------------------------------------------------
//* 87. COMMON MISTAKE — USING USER AGENT FOR EVERYTHING
//* ------------------------------------------------------------

//* Wrong:
//* if (navigator.userAgent.includes("Chrome")) { ... }
//*
//* Better:
//* if ("serviceWorker" in navigator) { ... }


//* ------------------------------------------------------------
//* 88. COMMON MISTAKE — ZERO DELAY TIMER
//* ------------------------------------------------------------

console.log("start");
setTimeout(() => console.log("later"), 0);
console.log("end");

//* Output:
//* start
//* end
//* later


//* ------------------------------------------------------------
//* 89. COMMON MISTAKE — LOCAL STORAGE TYPES
//* ------------------------------------------------------------

localStorage.setItem("count", 10);
console.log(localStorage.getItem("count"));
console.log(typeof localStorage.getItem("count"));

//* Output is "10" and "string".
//* Convert explicitly when reading numeric data.


//* ------------------------------------------------------------
//* 90. COMMON MISTAKE — LOCATION REPLACE VS HREF
//* ------------------------------------------------------------

//* location.href = "/login" -> navigates and normally leaves current entry in history.
//* location.replace("/login") -> replaces current history entry.


//* ------------------------------------------------------------
//* 91. COMMON MISTAKE — HISTORY IS NOT SERVER ROUTING
//* ------------------------------------------------------------

//* pushState changes client-side history/URL without requesting that URL from
//* the server immediately. Your server must still be configured to serve the
//* application for direct navigation to SPA routes.


//* ------------------------------------------------------------
//* 92. COMMON MISTAKE — STORAGE AS SECRET VAULT
//* ------------------------------------------------------------

//* localStorage/sessionStorage are readable by JavaScript on the origin.
//* Never assume storage is inaccessible to an XSS payload.


//* ------------------------------------------------------------
//* 93. COMMON MISTAKE — IGNORING PERMISSIONS
//* ------------------------------------------------------------

//* Geolocation, notifications, clipboard and other capabilities can involve
//* permissions, secure-context requirements or user-activation requirements.
//* Design permission requests as part of a user-facing feature.


//* ------------------------------------------------------------
//* 94. COMMON MISTAKE — EXPENSIVE SCROLL/RESIZE HANDLERS
//* ------------------------------------------------------------

//* Scroll and resize can fire frequently.
//* Avoid expensive synchronous work in every event.
//* Consider requestAnimationFrame, throttling, debouncing, observers or CSS.


//* ------------------------------------------------------------
//* 95. DEBUGGING CHECKLIST
//* ------------------------------------------------------------

//* 1. Is this ECMAScript, DOM, or another browser API?
//* 2. Is the API supported in this browser?
//* 3. Did the browser block a popup or permission request?
//* 4. Is the page in a secure context when required?
//* 5. Is the current origin correct?
//* 6. Is the URL/history behavior intentional?
//* 7. Is storage returning strings?
//* 8. Are timers being cancelled correctly?
//* 9. Are scroll/resize handlers too expensive?
//* 10. Did a same-origin/cross-origin restriction block the operation?


//* ------------------------------------------------------------
//* 96. OUTPUT PREDICTION
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
//* 97. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1: Build a viewport-size display.
//* Challenge 2: Build an online/offline status indicator.
//* Challenge 3: Build a theme preference using localStorage.
//* Challenge 4: Build a hash-based mini router.
//* Challenge 5: Build a History API SPA router.
//* Challenge 6: Build a scroll-to-top button.
//* Challenge 7: Build a responsive layout using matchMedia.
//* Challenge 8: Build a countdown using setTimeout/setInterval.
//* Challenge 9: Build a requestAnimationFrame progress animation.
//* Challenge 10: Build a tab-state URL using pushState.
//* Challenge 11: Build a cross-tab theme synchronizer with storage events.
//* Challenge 12: Build a cross-tab notification channel with BroadcastChannel.
//* Challenge 13: Build a location permission UI.
//* Challenge 14: Build a clipboard copy button.
//* Challenge 15: Build a simple service-worker registration screen.


//* ------------------------------------------------------------
//* 98. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1: setTimeout seems to run immediately.
//* Debug 2: localStorage number becomes a string.
//* Debug 3: pushState changes URL but UI does not update.
//* Debug 4: Back button changes URL but application view stays unchanged.
//* Debug 5: popup works on click but not automatically on page load.
//* Debug 6: geolocation permission is denied.
//* Debug 7: clipboard API fails in an insecure context.
//* Debug 8: resize handler makes the page slow.
//* Debug 9: storage event is not firing in the same tab.
//* Debug 10: postMessage receives an unexpected origin.


//* ------------------------------------------------------------
//* 99. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is BOM?
//* 2. Is BOM part of ECMAScript?
//* 3. What does window represent?
//* 4. Viewport vs screen?
//* 5. What does location represent?
//* 6. href vs assign vs replace?
//* 7. What is session history?
//* 8. pushState vs replaceState?
//* 9. What is popstate?
//* 10. What is hashchange?
//* 11. What is navigator?
//* 12. Why is navigator.onLine only a hint?
//* 13. Why prefer feature detection?
//* 14. Why is setTimeout(0) not immediate?
//* 15. What is requestAnimationFrame used for?
//* 16. What is visibilitychange?
//* 17. localStorage vs sessionStorage?
//* 18. Why does storage turn values into strings?
//* 19. Why can localStorage be dangerous for secrets?
//* 20. What is a storage event?
//* 21. What does matchMedia do?
//* 22. What permissions can browser APIs require?
//* 23. What is postMessage used for?
//* 24. What is same-origin policy?
//* 25. Why should scroll/resize handlers be optimized?


//* ------------------------------------------------------------
//* 100. INTERVIEW QUESTIONS
//* ------------------------------------------------------------

//* Q1. Explain BOM and how it differs from DOM.
//* Q2. What is window?
//* Q3. What is the difference between viewport and screen dimensions?
//* Q4. Explain location.href, assign(), replace(), and reload().
//* Q5. Explain pushState(), replaceState(), and popstate.
//* Q6. How would you implement a simple SPA router without a library?
//* Q7. Why does a zero-delay timer execute later?
//* Q8. setTimeout vs setInterval vs requestAnimationFrame?
//* Q9. What is navigator.onLine and why is it not reliable for API health?
//* Q10. localStorage vs sessionStorage?
//* Q11. Why are storage values strings?
//* Q12. What is the storage event?
//* Q13. Why should sensitive tokens generally not be casually stored in localStorage?
//* Q14. What is matchMedia?
//* Q15. What is feature detection?
//* Q16. What is same-origin policy?
//* Q17. How does postMessage work securely?
//* Q18. What is BroadcastChannel?
//* Q19. What is service worker registration?
//* Q20. What is the difference between page JavaScript and a service worker?


//* ------------------------------------------------------------
//* 101. MASTERY CHECKLIST
//* ------------------------------------------------------------

//* [ ] I understand BOM vs DOM vs ECMAScript.
//* [ ] I understand window and viewport dimensions.
//* [ ] I can read and navigate URLs with location.
//* [ ] I understand browser history.
//* [ ] I can explain pushState/replaceState/popstate.
//* [ ] I understand hash navigation.
//* [ ] I can use navigator feature detection.
//* [ ] I understand timer scheduling.
//* [ ] I can use requestAnimationFrame appropriately.
//* [ ] I understand page visibility/lifecycle events.
//* [ ] I can use localStorage/sessionStorage correctly.
//* [ ] I understand storage security limitations.
//* [ ] I can use matchMedia for responsive behavior.
//* [ ] I understand browser permissions at a high level.
//* [ ] I understand same-origin restrictions.
//* [ ] I know how postMessage should validate origin.
//* [ ] I know what service workers and Cache API are for.
//* [ ] I can debug browser-environment problems systematically.

//* ============================================================
//* FINAL MENTAL MODEL
//* ============================================================

//* Think of BOM as the browser environment around your document:
//*
//*                 WINDOW
//*                    |
//*      +-------------+-------------+
//*      |             |             |
//*   LOCATION      HISTORY       NAVIGATOR
//*      |             |             |
//*   URL/route      SPA flow     capabilities
//*
//*      +-------------+-------------+
//*      |             |             |
//*   STORAGE       TIMERS        VIEWPORT
//*      |             |             |
//* local/session   timeout      size/scroll
//*
//* DOM handles the document itself; BOM/host APIs help your application interact
//* with the browser environment around that document.

//* END OF BOM
