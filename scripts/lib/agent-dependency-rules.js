const { routeToHumanMarkdownUrl, stripHash } = require("./route-utils");
const { uniqueStrings } = require("./content-parse");

const EXACT_DEPENDENCIES = {
  "/": [
    "/.agents/overview.md",
    "/.agents/blog.md",
    "/.agents/blurbs.md",
    "/.agents/ecosystem.md",
    "/.agents/wiki/index.md",
    "/.agents/skills/index.md",
  ],
  "/overview": [
    "/.agents/overview/urbit-explained.md",
    "/.agents/overview/running-urbit.md",
  ],
  "/overview/running-urbit/common-commands": [
    "/overview/running-urbit.md",
    "/overview/running-urbit/run-urbit-os.md",
  ],
  "blurb:get-the-urbit-runtime": [
    "/overview/running-urbit/common-commands.md",
    "/overview/running-urbit/run-urbit-os.md",
  ],
  "/blog/llms-on-urbit": [
    "/overview/running-urbit.md",
    "/overview/running-urbit/common-commands.md",
  ],
};

const deriveDependencies = ({ artifact, inferredLinks = [] }) => {
  const dependencies = new Set();
  const exactKey = artifact.canonicalPath || artifact.sourceKey;

  (EXACT_DEPENDENCIES[exactKey] || []).forEach((dependency) => dependencies.add(dependency));

  if (
    artifact.sourceKind === "overview" &&
    artifact.canonicalPath &&
    artifact.canonicalPath.startsWith("/overview/running-urbit/")
  ) {
    dependencies.add("/overview/running-urbit.md");
  }

  if (
    artifact.sourceKind === "blurb" &&
    artifact.contextPath &&
    stripHash(artifact.contextPath).startsWith("/overview/running-urbit")
  ) {
    const relatedMirror = routeToHumanMarkdownUrl(stripHash(artifact.contextPath));
    if (relatedMirror) {
      dependencies.add(relatedMirror);
    }
  }

  inferredLinks.forEach((link) => {
    if (typeof link === "string" && link.trim()) {
      dependencies.add(link.trim());
    }
  });

  const ownHumanUrl = artifact.humanMdPath;
  const ownAgentUrl = artifact.agentPath;

  return uniqueStrings(Array.from(dependencies)).filter(
    (dependency) => dependency !== ownHumanUrl && dependency !== ownAgentUrl
  );
};

module.exports = {
  deriveDependencies,
};
