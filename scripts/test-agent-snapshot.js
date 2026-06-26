#!/usr/bin/env node

/**
 * Agent snapshot guard.
 *
 * This keeps the public `/.agents/skills` surface safe and predictable by
 * checking the committed skill snapshot and generated public artifacts for:
 *
 * - private/local path leakage
 * - nested `SKILL.md` files below `references/`
 * - bundle manifest references that do not resolve to published files
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SNAPSHOT_ROOT = path.join(ROOT, "snapshots", "agents", "skills");
const PUBLIC_SKILLS_ROOT = path.join(ROOT, "public", ".agents", "skills");

const LEAK_PATTERNS = [
  /vanta/i,
  /thelifeandtimes/i,
  /projects\/urbit-work/i,
  /\/home\//i,
  /checked-by/i,
  /sarlev/i,
];

const TEXT_EXTENSIONS = new Set([".md", ".yaml", ".yml", ".json"]);
const BUNDLE_EXTENSIONS = new Set([".yaml", ".yml", ".json"]);

const errors = [];

const walk = (dir) => {
  if (!fs.existsSync(dir)) {
    errors.push(`Missing directory: ${path.relative(ROOT, dir)}`);
    return [];
  }

  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(fullPath));
    } else if (entry.isFile()) {
      out.push(fullPath);
    }
  });
  return out;
};

const toPosix = (value) => value.split(path.sep).join("/");

const readText = (filePath) => fs.readFileSync(filePath, "utf8");

const checkLeakage = (rootDir) => {
  walk(rootDir)
    .filter((filePath) => TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase()))
    .forEach((filePath) => {
      const relativePath = toPosix(path.relative(ROOT, filePath));
      const text = readText(filePath);
      LEAK_PATTERNS.forEach((pattern) => {
        if (pattern.test(text)) {
          errors.push(`Private/local leak matched ${pattern} in ${relativePath}`);
        }
      });
    });
};

const checkNestedSkills = (rootDir) => {
  walk(rootDir).forEach((filePath) => {
    const relativePath = toPosix(path.relative(rootDir, filePath));
    if (path.basename(filePath) === "SKILL.md" && relativePath.split("/").includes("references")) {
      errors.push(`Nested SKILL.md is not allowed: ${toPosix(path.relative(ROOT, filePath))}`);
    }
  });
};

const extractBundlePaths = (text) => {
  const refs = [];
  const quotedOrBarePath = /(?:entrypoint|skill):\s*["']?(\/\.agents\/skills\/[^\s"']+)["']?/g;
  const listPath = /^\s*-\s+["']?(\/\.agents\/skills\/[^\s"']+)["']?\s*$/gm;

  let match;
  while ((match = quotedOrBarePath.exec(text)) !== null) {
    refs.push(match[1]);
  }
  while ((match = listPath.exec(text)) !== null) {
    refs.push(match[1]);
  }

  return refs.map((ref) => ref.replace(/["']$/, ""));
};

const publicPathForAgentRef = (agentRef) => path.join(ROOT, "public", agentRef.replace(/^\//, ""));

const checkBundleReferences = (rootDir) => {
  walk(path.join(rootDir, "bundles"))
    .filter((filePath) => BUNDLE_EXTENSIONS.has(path.extname(filePath).toLowerCase()))
    .forEach((filePath) => {
      const relativePath = toPosix(path.relative(ROOT, filePath));
      extractBundlePaths(readText(filePath)).forEach((agentRef) => {
        if (!fs.existsSync(publicPathForAgentRef(agentRef))) {
          errors.push(`${relativePath} references missing public artifact: ${agentRef}`);
        }
      });
    });
};

checkLeakage(SNAPSHOT_ROOT);
checkLeakage(PUBLIC_SKILLS_ROOT);
checkNestedSkills(SNAPSHOT_ROOT);
checkNestedSkills(PUBLIC_SKILLS_ROOT);
checkBundleReferences(SNAPSHOT_ROOT);
checkBundleReferences(PUBLIC_SKILLS_ROOT);

if (errors.length > 0) {
  console.error("agent-snapshot guard failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("agent-snapshot guard passed");
