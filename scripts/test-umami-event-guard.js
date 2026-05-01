const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const guardSource = fs.readFileSync(path.join(__dirname, "../public/umami-event-guard.js"), "utf8");
const CAP_EVENT_NAME = "analytics-cap-triggered";

function createSessionStorage() {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
  };
}

function createHarness(config = {}) {
  const fetchCalls = [];
  const beaconCalls = [];
  const warnings = [];

  class Response {
    constructor(body, init = {}) {
      this.body = body;
      this.status = init.status || 200;
      this.statusText = init.statusText || "OK";
      this.ok = this.status >= 200 && this.status < 300;
    }
  }

  const window = {
    __URBIT_UMAMI_GUARD_CONFIG: Object.assign(
      {
        maxCustomEventsPerSession: 2,
        maxEventsPerName: 2,
        maxEventsPerNameDestination: 1,
        maxPageviewsPerSession: 1,
        maxPageviewsPerPath: 1,
        logDrops: false,
        notificationUrl: "https://cloud.umami.is/api/send",
      },
      config,
    ),
    location: {
      href: "https://urbit.org/",
      origin: "https://urbit.org",
      pathname: "/",
    },
    sessionStorage: createSessionStorage(),
    console: {
      warn(message, context) {
        warnings.push({ message, context });
      },
    },
    Response,
    fetch(input, init) {
      fetchCalls.push({ input, init });
      return Promise.resolve(new Response("ok", { status: 200, statusText: "OK" }));
    },
  };
  const navigator = {
    sendBeacon(url, data) {
      beaconCalls.push({ url, data });
      return true;
    },
  };
  const sandbox = {
    window,
    navigator,
    URL,
    URLSearchParams,
  };

  vm.runInNewContext(guardSource, sandbox, { filename: "umami-event-guard.js" });
  return { window, navigator, fetchCalls, beaconCalls, warnings };
}

function customEvent(name = "link-external", data = {}) {
  return JSON.stringify({
    type: "event",
    payload: {
      website: "test",
      hostname: "urbit.org",
      url: "/",
      title: "Urbit",
      name,
      data: Object.assign({ destination: "https://example.com" }, data),
    },
  });
}

function pageview(url = "/") {
  return JSON.stringify({
    type: "event",
    payload: {
      website: "test",
      hostname: "urbit.org",
      url,
      title: "Urbit",
    },
  });
}

function parseCallBody(call) {
  const body = call?.init?.body || call?.data;
  assert.equal(typeof body, "string", "test harness expected analytics body to be a JSON string");
  return JSON.parse(body);
}

function callEventNames(calls) {
  return calls.map((call) => parseCallBody(call).payload.name || "(pageview)");
}

function findCapEvent(calls) {
  const parsed = calls.map(parseCallBody);
  return parsed.find((body) => body.payload.name === CAP_EVENT_NAME);
}

async function testBlocksRepeatedEventDestination() {
  const harness = createHarness();
  await harness.window.fetch("https://cloud.umami.is/api/send", { method: "POST", body: customEvent() });
  await harness.window.fetch("https://cloud.umami.is/api/send", { method: "POST", body: customEvent() });
  await harness.window.fetch("https://cloud.umami.is/api/send", { method: "POST", body: customEvent() });

  assert.deepEqual(callEventNames(harness.fetchCalls), ["link-external", CAP_EVENT_NAME]);
  assert.equal(harness.window.__urbitUmamiEventGuard.stats.blocked, 2);
  assert.equal(harness.window.__urbitUmamiEventGuard.stats.blockedByReason["event-destination-budget"], 2);

  const capEvent = findCapEvent(harness.fetchCalls);
  assert.equal(capEvent.payload.data.source, "umami-event-guard");
  assert.equal(capEvent.payload.data.cap_reason, "event-destination-budget");
  assert.equal(capEvent.payload.data.blocked_event_name, "link-external");
}

async function testBlocksCustomSessionBudget() {
  const harness = createHarness({ maxEventsPerNameDestination: 10 });
  await harness.window.fetch("https://cloud.umami.is/api/send", { method: "POST", body: customEvent("event-a", { destination: "a" }) });
  await harness.window.fetch("https://cloud.umami.is/api/send", { method: "POST", body: customEvent("event-b", { destination: "b" }) });
  await harness.window.fetch("https://cloud.umami.is/api/send", { method: "POST", body: customEvent("event-c", { destination: "c" }) });

  assert.deepEqual(callEventNames(harness.fetchCalls), ["event-a", "event-b", CAP_EVENT_NAME]);
  assert.equal(harness.window.__urbitUmamiEventGuard.stats.blockedByReason["custom-session-budget"], 1);
}

async function testBlocksScannerProbePayload() {
  const harness = createHarness();
  await harness.window.fetch("https://cloud.umami.is/api/send", {
    method: "POST",
    body: pageview("/blog/what-is-urbit-for#__proto__[x]=y"),
  });

  assert.deepEqual(callEventNames(harness.fetchCalls), [CAP_EVENT_NAME], "scanner probe pageviews should only send a sanitized cap event");
  assert.equal(harness.window.__urbitUmamiEventGuard.stats.blockedByReason["scanner-probe"], 1);

  const capEvent = findCapEvent(harness.fetchCalls);
  assert.equal(capEvent.payload.data.cap_reason, "scanner-probe");
  assert.equal(capEvent.payload.data.blocked_url_path, "/blog/what-is-urbit-for");
}

async function testBlocksPageviewBudgetViaBeacon() {
  const harness = createHarness();
  const first = harness.navigator.sendBeacon("/api/send", pageview("/blog/one"));
  const second = harness.navigator.sendBeacon("/api/send", pageview("/blog/two"));

  assert.equal(first, true);
  assert.equal(second, true, "blocked beacons should still report accepted to avoid retry loops");
  assert.deepEqual(callEventNames(harness.beaconCalls), ["(pageview)", CAP_EVENT_NAME]);
  assert.equal(harness.window.__urbitUmamiEventGuard.stats.blockedByReason["pageview-session-budget"], 1);
}

async function testWrapsWindowUmamiTrack() {
  const harness = createHarness({ maxEventsPerNameDestination: 10 });
  let nativeTrackCalls = 0;
  harness.window.umami = {
    track(eventName, eventData) {
      nativeTrackCalls += 1;
      return harness.window.fetch("https://cloud.umami.is/api/send", {
        method: "POST",
        body: customEvent(eventName, eventData),
      });
    },
  };

  await harness.window.umami.track("programmatic-a", { destination: "a" });
  await harness.window.umami.track("programmatic-b", { destination: "b" });
  await harness.window.umami.track("programmatic-c", { destination: "c" });

  assert.equal(nativeTrackCalls, 2, "window.umami.track should also honor the custom session budget");
  assert.deepEqual(callEventNames(harness.fetchCalls), ["programmatic-a", "programmatic-b", CAP_EVENT_NAME]);
  assert.equal(harness.window.__urbitUmamiEventGuard.stats.blockedByReason["custom-session-budget"], 1);
}

async function main() {
  await testBlocksRepeatedEventDestination();
  await testBlocksCustomSessionBudget();
  await testBlocksScannerProbePayload();
  await testBlocksPageviewBudgetViaBeacon();
  await testWrapsWindowUmamiTrack();
  console.log("umami-event-guard tests passed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
