(function installUrbitUmamiEventGuard(window, navigator) {
  "use strict";

  if (!window || window.__urbitUmamiEventGuardInstalled) {
    return;
  }

  window.__urbitUmamiEventGuardInstalled = true;

  const DEFAULT_CONFIG = {
    maxCustomEventsPerSession: 150,
    maxEventsPerName: 30,
    maxEventsPerNameDestination: 5,
    maxPageviewsPerSession: 300,
    maxPageviewsPerPath: 8,
    storageKey: "urbit:umami-event-guard:v1",
    logDrops: true,
    maxDropLogs: 20,
    capTriggeredEventName: "analytics-cap-triggered",
    maxCapTriggeredEventsPerSession: 8,
    notificationUrl: "",
  };

  const SCANNER_PATTERNS = [
    /__proto__/i,
    /constructor(?:\.|%2e|\[|%5b)prototype/i,
    /prototype(?:\.|%2e|\[|%5b)/i,
  ];

  const runtimeConfig = window.__URBIT_UMAMI_GUARD_CONFIG || {};
  const config = Object.assign({}, DEFAULT_CONFIG, runtimeConfig);
  const nativeFetch = typeof window.fetch === "function" ? window.fetch.bind(window) : null;
  const nativeSendBeacon = navigator && typeof navigator.sendBeacon === "function" ? navigator.sendBeacon.bind(navigator) : null;
  const memoryState = createEmptyState();
  const stats = {
    allowed: 0,
    blocked: 0,
    blockedByReason: {},
  };

  function createEmptyState() {
    return {
      customTotal: 0,
      pageviewTotal: 0,
      byName: {},
      byNameDestination: {},
      byPageviewPath: {},
      blockedByReason: {},
      capNotifications: {},
      capNotificationTotal: 0,
      startedAt: new Date().toISOString(),
    };
  }

  function readState() {
    try {
      if (!window.sessionStorage) {
        return memoryState;
      }
      const stored = window.sessionStorage.getItem(config.storageKey);
      if (!stored) {
        return createEmptyState();
      }
      const parsed = JSON.parse(stored);
      return Object.assign(createEmptyState(), parsed, {
        byName: Object.assign({}, parsed.byName),
        byNameDestination: Object.assign({}, parsed.byNameDestination),
        byPageviewPath: Object.assign({}, parsed.byPageviewPath),
        blockedByReason: Object.assign({}, parsed.blockedByReason),
        capNotifications: Object.assign({}, parsed.capNotifications),
      });
    } catch (error) {
      logInternalError("read-state", error);
      return memoryState;
    }
  }

  function writeState(state) {
    Object.assign(memoryState, state);
    try {
      if (window.sessionStorage) {
        window.sessionStorage.setItem(config.storageKey, JSON.stringify(state));
      }
    } catch (error) {
      logInternalError("write-state", error);
    }
  }

  function inspectPayload(payload, options) {
    const commit = !options || options.commit !== false;

    if (!payload || payload.type !== "event" || !payload.payload) {
      return { action: "allow", reason: "not-umami-event" };
    }

    if (containsScannerProbe(payload.payload) || containsScannerProbe(window.location && window.location.href)) {
      const state = readState();
      recordBlocked(state, "scanner-probe");
      return { action: "block", reason: "scanner-probe", state };
    }

    const eventName = normalizeString(payload.payload.name);
    if (eventName) {
      return inspectCustomEvent(payload.payload, eventName, commit);
    }

    return inspectPageview(payload.payload, commit);
  }

  function inspectCustomEvent(payload, eventName, commit) {
    const state = readState();
    const destination = normalizeString(payload.data && payload.data.destination) || "(none)";
    const nameDestinationKey = `${eventName}|${destination}`;

    if (state.customTotal >= config.maxCustomEventsPerSession) {
      recordBlocked(state, "custom-session-budget");
      return { action: "block", reason: "custom-session-budget", state };
    }

    if ((state.byName[eventName] || 0) >= config.maxEventsPerName) {
      recordBlocked(state, "event-name-budget");
      return { action: "block", reason: "event-name-budget", state };
    }

    if ((state.byNameDestination[nameDestinationKey] || 0) >= config.maxEventsPerNameDestination) {
      recordBlocked(state, "event-destination-budget");
      return { action: "block", reason: "event-destination-budget", state };
    }

    if (commit) {
      state.customTotal += 1;
      state.byName[eventName] = (state.byName[eventName] || 0) + 1;
      state.byNameDestination[nameDestinationKey] = (state.byNameDestination[nameDestinationKey] || 0) + 1;
      writeState(state);
    }
    return { action: "allow", reason: "custom-event", state };
  }

  function inspectPageview(payload, commit) {
    const state = readState();
    const path = normalizePath(payload.url || (window.location && window.location.pathname) || "/");

    if (state.pageviewTotal >= config.maxPageviewsPerSession) {
      recordBlocked(state, "pageview-session-budget");
      return { action: "block", reason: "pageview-session-budget", state };
    }

    if ((state.byPageviewPath[path] || 0) >= config.maxPageviewsPerPath) {
      recordBlocked(state, "pageview-path-budget");
      return { action: "block", reason: "pageview-path-budget", state };
    }

    if (commit) {
      state.pageviewTotal += 1;
      state.byPageviewPath[path] = (state.byPageviewPath[path] || 0) + 1;
      writeState(state);
    }
    return { action: "allow", reason: "pageview", state };
  }

  function recordBlocked(state, reason) {
    state.blockedByReason[reason] = (state.blockedByReason[reason] || 0) + 1;
    writeState(state);
  }

  function shouldBlockUmamiRequest(url, body) {
    if (!isUmamiSendUrl(url)) {
      return { block: false, reason: "not-umami-send" };
    }

    const payload = parseBody(body);
    if (!payload) {
      return { block: false, reason: "unparsed-body" };
    }

    const decision = inspectPayload(payload);
    if (decision.action === "block") {
      return { block: true, reason: decision.reason, payload, state: decision.state };
    }

    stats.allowed += 1;
    return { block: false, reason: decision.reason };
  }

  function isUmamiSendUrl(url) {
    const value = normalizeString(url);
    if (!value) {
      return false;
    }
    return /(?:^|\/)(?:api\/send|umami\/api\/send)(?:\?|$)/i.test(value) || /umami\.is\/api\/send(?:\?|$)/i.test(value);
  }

  function parseBody(body) {
    if (!body) {
      return null;
    }

    if (typeof body === "string") {
      return parseJson(body);
    }

    if (body instanceof URLSearchParams) {
      return parseJson(body.toString());
    }

    if (typeof body === "object" && typeof body.toString === "function" && body.constructor && body.constructor.name === "String") {
      return parseJson(body.toString());
    }

    return null;
  }

  function parseJson(value) {
    try {
      return JSON.parse(value);
    } catch (error) {
      logInternalError("parse-json", error);
      return null;
    }
  }

  function requestUrl(input) {
    if (typeof input === "string") {
      return input;
    }
    if (input && typeof input.url === "string") {
      return input.url;
    }
    return "";
  }

  function requestBody(input, init) {
    if (init && Object.prototype.hasOwnProperty.call(init, "body")) {
      return init.body;
    }
    if (input && Object.prototype.hasOwnProperty.call(input, "body")) {
      return input.body;
    }
    return null;
  }

  function droppedFetchResponse() {
    if (typeof window.Response === "function") {
      return Promise.resolve(new window.Response(null, { status: 204, statusText: "No Content" }));
    }
    return Promise.resolve({ ok: true, status: 204, statusText: "No Content" });
  }

  function handleBlockedUmamiRequest(url, decision, transport) {
    recordGlobalDrop(decision.reason, decision.payload);
    sendCapTriggeredEvent(url, decision, transport);
  }

  function sendCapTriggeredEvent(url, decision, transport) {
    const state = decision.state || readState();
    const reason = decision.reason || "unknown";
    const notificationKey = reason;

    if ((state.capNotificationTotal || 0) >= config.maxCapTriggeredEventsPerSession) {
      return;
    }

    if (state.capNotifications && state.capNotifications[notificationKey]) {
      return;
    }

    state.capNotifications = state.capNotifications || {};
    state.capNotifications[notificationKey] = new Date().toISOString();
    state.capNotificationTotal = (state.capNotificationTotal || 0) + 1;
    writeState(state);

    const endpoint = resolveNotificationUrl(url);
    const body = JSON.stringify(buildCapTriggeredPayload(decision.payload, reason, state));

    if (transport === "beacon" && nativeSendBeacon) {
      nativeSendBeacon(endpoint, body);
      return;
    }

    if (nativeFetch) {
      nativeFetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
        keepalive: true,
      }).catch((error) => logInternalError("send-cap-triggered-event", error));
      return;
    }

    if (nativeSendBeacon) {
      nativeSendBeacon(endpoint, body);
    }
  }

  function buildCapTriggeredPayload(originalPayload, reason, state) {
    const original = (originalPayload && originalPayload.payload) || {};
    const blockedEventName = normalizeString(original.name) || "(pageview)";
    const blockedPath = normalizePath(original.url || (window.location && window.location.pathname) || "/");
    const blockedDestination = sanitizeTelemetryValue(original.data && original.data.destination);

    const data = {
      source: "umami-event-guard",
      cap_reason: reason,
      blocked_event_name: blockedEventName,
      blocked_url_path: blockedPath,
      custom_total: toMetricValue(state.customTotal),
      pageview_total: toMetricValue(state.pageviewTotal),
      blocked_reason_total: toMetricValue(state.blockedByReason && state.blockedByReason[reason]),
    };

    if (blockedDestination) {
      data.blocked_destination = blockedDestination;
    }

    return {
      type: "event",
      payload: Object.assign({}, original, {
        name: config.capTriggeredEventName,
        url: blockedPath,
        title: config.capTriggeredEventName,
        data,
      }),
    };
  }

  function resolveNotificationUrl(url) {
    return normalizeString(url) || normalizeString(config.notificationUrl) || "/api/send";
  }

  function sanitizeTelemetryValue(value) {
    const text = normalizeString(value);
    if (!text) {
      return "";
    }

    if (containsScannerProbe(text)) {
      return "(scanner-probe)";
    }

    try {
      const parsed = new URL(text, window.location && window.location.origin ? window.location.origin : "https://urbit.org");
      const compact = parsed.origin === "null" ? parsed.pathname : `${parsed.origin}${parsed.pathname}`;
      return truncateTelemetryValue(compact);
    } catch (error) {
      logInternalError("sanitize-telemetry-value", error);
      return truncateTelemetryValue(text.split(/[?#]/)[0]);
    }
  }

  function truncateTelemetryValue(value) {
    const text = normalizeString(value);
    if (text.length <= 120) {
      return text;
    }
    return `${text.slice(0, 117)}...`;
  }

  function toMetricValue(value) {
    const number = Number(value || 0);
    return Number.isFinite(number) ? number : 0;
  }

  function installFetchGuard() {
    if (!nativeFetch) {
      return;
    }

    window.fetch = function guardedFetch(input, init) {
      const decision = shouldBlockUmamiRequest(requestUrl(input), requestBody(input, init));
      if (decision.block) {
        handleBlockedUmamiRequest(requestUrl(input), decision, "fetch");
        return droppedFetchResponse();
      }
      return nativeFetch(input, init);
    };
  }

  function installBeaconGuard() {
    if (!nativeSendBeacon || !navigator) {
      return;
    }

    navigator.sendBeacon = function guardedSendBeacon(url, data) {
      const decision = shouldBlockUmamiRequest(url, data);
      if (decision.block) {
        handleBlockedUmamiRequest(url, decision, "beacon");
        return true;
      }
      return nativeSendBeacon(url, data);
    };
  }

  function installTrackGuard() {
    let currentUmami = window.umami;

    function wrapUmami(value) {
      if (!value || typeof value.track !== "function" || value.track.__urbitGuarded) {
        return value;
      }

      const nativeTrack = value.track.bind(value);
      function guardedTrack(eventName, eventData) {
        const payload = {
          type: "event",
          payload: {
            name: eventName,
            data: eventData || {},
            url: window.location && window.location.pathname,
          },
        };
        const decision = inspectPayload(payload, { commit: false });
        if (decision.action === "block") {
          handleBlockedUmamiRequest(config.notificationUrl, { reason: decision.reason, payload, state: decision.state }, "track");
          return Promise.resolve();
        }
        return nativeTrack.apply(value, arguments);
      }
      guardedTrack.__urbitGuarded = true;
      value.track = guardedTrack;
      return value;
    }

    try {
      Object.defineProperty(window, "umami", {
        configurable: true,
        get() {
          return currentUmami;
        },
        set(value) {
          currentUmami = wrapUmami(value);
        },
      });
      currentUmami = wrapUmami(currentUmami);
    } catch (error) {
      logInternalError("install-track-guard", error);
      if (window.umami) {
        window.umami = wrapUmami(window.umami);
      }
    }
  }

  function recordGlobalDrop(reason, payload) {
    stats.blocked += 1;
    stats.blockedByReason[reason] = (stats.blockedByReason[reason] || 0) + 1;

    if (!config.logDrops || typeof window.console === "undefined" || typeof window.console.warn !== "function") {
      return;
    }

    if (stats.blocked <= config.maxDropLogs || stats.blocked % 50 === 0) {
      window.console.warn("Urbit Umami event guard dropped analytics event", {
        reason,
        blocked: stats.blocked,
        eventName: payload && payload.payload && payload.payload.name,
        url: payload && payload.payload && payload.payload.url,
      });
    }
  }

  function containsScannerProbe(value) {
    if (!value) {
      return false;
    }
    const haystack = typeof value === "string" ? value : JSON.stringify(value);
    return SCANNER_PATTERNS.some((pattern) => pattern.test(haystack));
  }

  function normalizeString(value) {
    if (value === null || value === undefined) {
      return "";
    }
    return String(value).trim();
  }

  function normalizePath(value) {
    const text = normalizeString(value) || "/";
    try {
      const parsed = new URL(text, window.location && window.location.origin ? window.location.origin : "https://urbit.org");
      return parsed.pathname || "/";
    } catch (error) {
      logInternalError("normalize-path", error);
      return text.split(/[?#]/)[0] || "/";
    }
  }

  function logInternalError(operation, error) {
    if (typeof window.console !== "undefined" && typeof window.console.warn === "function") {
      window.console.warn("Urbit Umami event guard internal error", {
        operation,
        error: error && error.message ? error.message : String(error),
      });
    }
  }

  installFetchGuard();
  installBeaconGuard();
  installTrackGuard();

  window.__urbitUmamiEventGuard = {
    config,
    stats,
    inspectPayload,
    readState,
    shouldBlockUmamiRequest,
  };
})(window, navigator);
