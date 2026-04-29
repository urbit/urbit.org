export interface Env {
	ORIGIN_URL?: string;
	DEBUG_RESPONSES?: string;
	UMAMI_API_URL?: string;
	UMAMI_WEBSITE_ID?: string;
}

type EventName = "ai-entrypoint-hit" | "bot-page-hit";
type CaptureReason = "ai-entrypoint" | "verified-bot" | "known-agent" | "crawler-like";
type ResourceType = "ai-entrypoint" | "document-page" | "markdown-mirror" | "agent-index" | "other";
type KnownAgentLabel =
	| "ClaudeBot"
	| "Claude-User"
	| "GPTBot"
	| "ChatGPT-User"
	| "PerplexityBot"
	| "Google-Extended"
	| "GoogleOther"
	| "Bytespider"
	| "Meta-ExternalAgent"
	| "Amazonbot"
	| "CCBot";

type AgentLabel = KnownAgentLabel | "VerifiedBot-Other" | "Unknown-Crawler-Like" | "Unknown";

type RefererSummary = {
	present: boolean;
	sameOrigin: boolean;
	path?: string;
};

type RequestClassification = {
	pathRequested: string;
	pathCanonical: string;
	queryPresent: boolean;
	resourceType: ResourceType;
	isAiEntryPoint: boolean;
	isDocumentLike: boolean;
	ignore: boolean;
	verifiedBotCategory: string;
	uaLabel: AgentLabel;
	uaRaw: string;
	isKnownAgent: boolean;
	isCrawlerLike: boolean;
	referer: RefererSummary;
};

const DEFAULT_UMAMI_API_URL = "https://cloud.umami.is/api/send";

const DIRECT_AI_ENTRYPOINTS = new Set<string>([
	"/llms.txt",
	"/agents.md",
	"/content-index.json",
	"/for-agents",
	"/.well-known/llms.txt",
	"/.agents/index.md",
	"/.agents/overview.md",
	"/.agents/blog.md",
	"/.agents/ecosystem.md",
]);

const KNOWN_AGENT_MATCHERS: Array<{ label: KnownAgentLabel; pattern: RegExp }> = [
	{ label: "ClaudeBot", pattern: /\bclaudebot\b/i },
	{ label: "Claude-User", pattern: /\bclaude-user\b/i },
	{ label: "GPTBot", pattern: /\bgptbot\b/i },
	{ label: "ChatGPT-User", pattern: /\bchatgpt-user\b/i },
	{ label: "PerplexityBot", pattern: /\bperplexitybot\b/i },
	{ label: "Google-Extended", pattern: /\bgoogle-extended\b/i },
	{ label: "GoogleOther", pattern: /\bgoogleother\b/i },
	{ label: "Bytespider", pattern: /\bbytespider\b/i },
	{ label: "Meta-ExternalAgent", pattern: /\bmeta-externalagent\b/i },
	{ label: "Amazonbot", pattern: /\bamazonbot\b/i },
	{ label: "CCBot", pattern: /\bccbot\b/i },
];

const CRAWLER_LIKE_PATTERN = /\b(bot|crawl|crawler|spider|slurp|fetch|preview|scanner|archiver)\b/i;
const AI_ADJACENT_PATTERN = /\b(ai|agent|assistant|llm|gpt|claude|perplexity|gemini|openai|anthropic)\b/i;
const LOW_SIGNAL_PREFIXES = ["/_next/", "/fonts/", "/images/", "/icons/"];
const LOW_SIGNAL_EXACT_PATHS = new Set<string>(["/favicon.ico", "/umami-script.js", "/robots.txt", "/sitemap.xml"]);
const LOW_SIGNAL_EXTENSION_PATTERN = /\.(?:avif|bmp|css|gif|ico|jpeg|jpg|js|json|map|mp4|otf|pdf|png|svg|ttf|txt\.(?!$)|webm|webp|woff2?)$/i;

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const upstreamRequest = buildUpstreamRequest(request, env);
		const classification = classifyRequest(request);
		const response = await fetch(upstreamRequest, { redirect: "manual" });

		if (shouldSendUmamiEvent(request, classification, env)) {
			ctx.waitUntil(sendUmamiEvent(request, response, classification, env));
		}

		const headers = new Headers(response.headers);
		if (isEnabled(env.DEBUG_RESPONSES)) {
			headers.set("X-Urbit-Edge-Worker", "cloudflare");
		}

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers,
		});
	},
};

function shouldSendUmamiEvent(request: Request, classification: RequestClassification, env: Env): boolean {
	if (!resolveWebsiteID(env)) {
		return false;
	}

	const method = request.method.toUpperCase();
	if (method !== "GET" && method !== "HEAD") {
		return false;
	}

	if (classification.ignore) {
		return false;
	}

	if (classification.isAiEntryPoint) {
		return true;
	}

	return classification.isDocumentLike && (classification.verifiedBotCategory !== "" || classification.isKnownAgent || classification.isCrawlerLike);
}

function buildUpstreamRequest(request: Request, env: Env): Request {
	const method = request.method.toUpperCase();
	const body = method === "GET" || method === "HEAD" ? undefined : request.body;

	if (!env.ORIGIN_URL) {
		return new Request(request, {
			body,
			redirect: "manual",
		});
	}

	const incomingURL = new URL(request.url);
	const originURL = new URL(env.ORIGIN_URL);
	const upstreamURL = new URL(incomingURL.pathname + incomingURL.search, originURL);
	const headers = new Headers(request.headers);
	headers.set("X-Forwarded-Host", incomingURL.host);
	headers.set("X-Forwarded-Proto", incomingURL.protocol.replace(":", ""));

	return new Request(upstreamURL.toString(), {
		method: request.method,
		headers,
		body,
		redirect: "manual",
	});
}

function classifyRequest(request: Request): RequestClassification {
	const url = new URL(request.url);
	const pathRequested = url.pathname;
	const queryPresent = url.search.length > 1;
	const isAiEntryPoint = isAIEntrypoint(pathRequested);
	const ignore = isLowSignalAssetPath(pathRequested);
	const pathCanonical = deriveCanonicalPath(pathRequested);
	const resourceType = deriveResourceType(pathRequested, isAiEntryPoint, ignore);
	const normalizedUserAgent = normalizeStoredUserAgent(request.headers.get("user-agent"));
	const verifiedBotCategory = normalizeText((request as Request & { cf?: { verifiedBotCategory?: string } }).cf?.verifiedBotCategory);
	const matchedLabel = matchKnownAgentLabel(normalizedUserAgent);
	const isKnownAgent = matchedLabel !== null;
	const crawlerLike = !isKnownAgent && isCrawlerLikeRequest(pathRequested, normalizedUserAgent, ignore);
	const uaLabel = deriveAgentLabel({ matchedLabel, verifiedBotCategory, crawlerLike });

	return {
		pathRequested,
		pathCanonical,
		queryPresent,
		resourceType,
		isAiEntryPoint,
		isDocumentLike: isDocumentLikeRequest(url, request.headers.get("accept"), ignore),
		ignore,
		verifiedBotCategory,
		uaLabel,
		uaRaw: normalizedUserAgent,
		isKnownAgent,
		isCrawlerLike: crawlerLike,
		referer: summarizeReferer(url, request.headers.get("referer")),
	};
}

async function sendUmamiEvent(
	request: Request,
	response: Response,
	classification: RequestClassification,
	env: Env,
): Promise<void> {
	const websiteID = resolveWebsiteID(env);
	if (!websiteID) {
		return;
	}

	const url = new URL(request.url);
	const payload = {
		type: "event",
		payload: {
			website: websiteID,
			hostname: url.hostname,
			url: classification.pathCanonical,
			referrer: "",
			title: classification.pathCanonical,
			name: deriveEventName(classification),
			data: buildEventData(classification, request.method, response.status, url.hostname),
		},
	};

	const userAgentHeader = normalizeText(request.headers.get("user-agent")) || "urbit-org-cloudflare-worker/1.0";
	const umamiRequest = new Request(resolveUmamiAPIURL(env), {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"User-Agent": userAgentHeader,
		},
		body: JSON.stringify(payload),
	});

	try {
		const umamiResponse = await fetch(umamiRequest);
		if (!umamiResponse.ok) {
			console.error("Cloudflare Worker Umami send failed", {
				status: umamiResponse.status,
				pathRequested: classification.pathRequested,
				pathCanonical: classification.pathCanonical,
				eventName: deriveEventName(classification),
				captureReason: deriveCaptureReason(classification),
				uaLabel: classification.uaLabel,
			});
		}
	} catch (error) {
		console.error("Cloudflare Worker Umami send errored", {
			pathRequested: classification.pathRequested,
			pathCanonical: classification.pathCanonical,
			eventName: deriveEventName(classification),
			captureReason: deriveCaptureReason(classification),
			uaLabel: classification.uaLabel,
			error: error instanceof Error ? error.message : String(error),
		});
	}
}

function buildEventData(classification: RequestClassification, method: string, status: number, hostname: string) {
	const data: Record<string, string | boolean | number> = {
		path_requested: classification.pathRequested,
		path_canonical: classification.pathCanonical,
		hostname: hostname,
		method: method.toUpperCase(),
		status,
		resource_type: classification.resourceType,
		ua_raw: classification.uaRaw,
		ua_label: classification.uaLabel,
		capture_reason: deriveCaptureReason(classification),
		source: "cloudflare-worker",
		query_present: classification.queryPresent,
		referer_present: classification.referer.present,
		referer_same_origin: classification.referer.sameOrigin,
	};

	if (classification.verifiedBotCategory) {
		data.bot_category = classification.verifiedBotCategory;
	}

	if (classification.referer.path) {
		data.referer_path = classification.referer.path;
	}

	return data;
}

function deriveEventName(classification: RequestClassification): EventName {
	return classification.isAiEntryPoint ? "ai-entrypoint-hit" : "bot-page-hit";
}

function deriveCaptureReason(classification: RequestClassification): CaptureReason {
	if (classification.isAiEntryPoint) {
		return "ai-entrypoint";
	}
	if (classification.verifiedBotCategory) {
		return "verified-bot";
	}
	if (classification.isKnownAgent) {
		return "known-agent";
	}
	return "crawler-like";
}

function deriveResourceType(pathname: string, isAiEntryPoint: boolean, ignore: boolean): ResourceType {
	if (ignore) {
		return "other";
	}
	if (pathname.startsWith("/.agents/")) {
		return "agent-index";
	}
	if (pathname.endsWith(".md")) {
		return "markdown-mirror";
	}
	if (isAiEntryPoint) {
		return "ai-entrypoint";
	}
	if (pathname === "/" || !hasNonMarkdownExtension(pathname)) {
		return "document-page";
	}
	return "other";
}

function deriveCanonicalPath(pathname: string): string {
	if (pathname === "/index.md") {
		return "/";
	}

	const topLevelAgentMap: Record<string, string> = {
		"/.agents/overview.md": "/overview",
		"/.agents/blog.md": "/blog",
		"/.agents/ecosystem.md": "/ecosystem",
	};
	if (topLevelAgentMap[pathname]) {
		return topLevelAgentMap[pathname];
	}

	if (pathname.startsWith("/.agents/overview/") || pathname.startsWith("/.agents/blog/") || pathname.startsWith("/.agents/ecosystem/")) {
		return pathname.slice("/.agents".length).replace(/\.md$/i, "");
	}

	if (pathname.endsWith(".md") && !pathname.startsWith("/.agents/")) {
		return pathname.replace(/\.md$/i, "") || "/";
	}

	return pathname;
}

function summarizeReferer(requestURL: URL, refererHeader: string | null): RefererSummary {
	const referer = normalizeText(refererHeader);
	if (!referer) {
		return { present: false, sameOrigin: false };
	}

	let refererURL: URL;
	try {
		refererURL = new URL(referer);
	} catch {
		return { present: true, sameOrigin: false };
	}

	const sameOrigin = areEquivalentSiteHosts(requestURL.hostname, refererURL.hostname);
	if (!sameOrigin) {
		return { present: true, sameOrigin: false };
	}

	return {
		present: true,
		sameOrigin: true,
		path: refererURL.pathname,
	};
}

function areEquivalentSiteHosts(left: string, right: string): boolean {
	return normalizeSiteHost(left) === normalizeSiteHost(right);
}

function normalizeSiteHost(hostname: string): string {
	return normalizeText(hostname).replace(/^www\./i, "");
}

function normalizeStoredUserAgent(userAgent: string | null): string {
	return truncateString(normalizeText(userAgent), 500);
}

function normalizeText(value: string | null | undefined): string {
	return (value ?? "").trim().replace(/\s+/g, " ");
}

function truncateString(value: string, limit: number): string {
	if (value.length <= limit) {
		return value;
	}
	return value.slice(0, Math.max(0, limit - 1)) + "…";
}

function matchKnownAgentLabel(userAgent: string): KnownAgentLabel | null {
	for (const matcher of KNOWN_AGENT_MATCHERS) {
		if (matcher.pattern.test(userAgent)) {
			return matcher.label;
		}
	}
	return null;
}

function deriveAgentLabel(input: {
	matchedLabel: KnownAgentLabel | null;
	verifiedBotCategory: string;
	crawlerLike: boolean;
}): AgentLabel {
	if (input.matchedLabel) {
		return input.matchedLabel;
	}
	if (input.verifiedBotCategory) {
		return "VerifiedBot-Other";
	}
	if (input.crawlerLike) {
		return "Unknown-Crawler-Like";
	}
	return "Unknown";
}

function isCrawlerLikeRequest(pathname: string, userAgent: string, ignore: boolean): boolean {
	if (ignore || !isPotentialDocumentPath(pathname)) {
		return false;
	}
	return CRAWLER_LIKE_PATTERN.test(userAgent) || AI_ADJACENT_PATTERN.test(userAgent);
}

function isDocumentLikeRequest(url: URL, acceptHeader: string | null, ignore: boolean): boolean {
	if (ignore) {
		return false;
	}

	if (isPotentialDocumentPath(url.pathname)) {
		return true;
	}

	const accept = normalizeText(acceptHeader).toLowerCase();
	return accept.includes("text/html") || accept.includes("text/plain") || accept.includes("text/markdown") || accept.includes("application/xhtml+xml");
}

function isPotentialDocumentPath(pathname: string): boolean {
	if (pathname === "/") {
		return true;
	}
	if (pathname.endsWith(".md")) {
		return true;
	}
	if (pathname.startsWith("/.agents/")) {
		return true;
	}
	if (pathname.startsWith("/overview") || pathname.startsWith("/blog") || pathname.startsWith("/ecosystem") || pathname.startsWith("/events") || pathname.startsWith("/grants") || pathname.startsWith("/for-agents")) {
		return true;
	}
	return !hasNonMarkdownExtension(pathname);
}

function hasNonMarkdownExtension(pathname: string): boolean {
	const lastSegment = pathname.split("/").pop() ?? "";
	const match = lastSegment.match(/\.([a-z0-9]+)$/i);
	if (!match) {
		return false;
	}
	return match[1].toLowerCase() !== "md";
}

function isLowSignalAssetPath(pathname: string): boolean {
	if (LOW_SIGNAL_EXACT_PATHS.has(pathname)) {
		return true;
	}
	if (LOW_SIGNAL_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
		return true;
	}
	return LOW_SIGNAL_EXTENSION_PATTERN.test(pathname);
}

function isAIEntrypoint(pathname: string): boolean {
	return DIRECT_AI_ENTRYPOINTS.has(pathname) || pathname.startsWith("/.agents/");
}

function isEnabled(value: string | undefined): boolean {
	const normalized = normalizeText(value).toLowerCase();
	return normalized === "1" || normalized === "true" || normalized === "yes";
}

function resolveWebsiteID(env: Env): string {
	return normalizeText(env.UMAMI_WEBSITE_ID);
}

function resolveUmamiAPIURL(env: Env): string {
	return normalizeText(env.UMAMI_API_URL) || DEFAULT_UMAMI_API_URL;
}
