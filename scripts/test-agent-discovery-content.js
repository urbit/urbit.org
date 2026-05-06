#!/usr/bin/env node

const assert = require("assert/strict");

const {
  loadAgentDiscoveryMarkdown,
  parseAgentDiscoveryMarkdown,
} = require("../app/lib/agentDiscoveryContent.cjs");

const data = loadAgentDiscoveryMarkdown();

assert.equal(data.homepage.title, "Instructions for Large Language Models");
assert.equal(data.homepage.footerTitle, "instructions for ai agents");
assert.equal(
  data.homepage.description,
  "Use these routes to discover urbit.org's machine-facing content without relying on the main navigation."
);
assert.ok(data.homepage.copyPrompt.includes("https://urbit.org/llms.txt"));

assert.equal(data.capabilityGuidance.length, 2);
assert.equal(data.primaryEntryPoints.length, 5);
assert.equal(data.humanMarkdownMirrors.length, 4);
assert.equal(data.agentSectionIndexes.length, 7);
assert.equal(data.usageNotes.length, 4);

assert.deepEqual(data.primaryEntryPoints[0], {
  href: "/llms.txt",
  label: "llms.txt",
  description: "Canonical plain-text instructions for automated readers.",
});
assert.equal(data.primaryEntryPoints[1].label, "For AI Agents");
assert.equal(data.agentSectionIndexes[6].href, "/.agents/skills/index.md");
assert.equal(data.usageNotes[3].title, "Well-known compatibility");

assert.throws(
  () =>
    parseAgentDiscoveryMarkdown(
      [
        "---",
        "title: Incomplete",
        "footer_title: incomplete",
        "---",
        "This file intentionally omits required sections.",
      ].join("\n"),
      "incomplete-agent-discovery.md"
    ),
  /Missing copyPrompt section/
);

console.log("✓ agent discovery markdown content parsed successfully");
