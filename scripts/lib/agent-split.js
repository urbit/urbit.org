const AGENT_DELIMITER_PATTERN = /^\s*---agent---\s*$/m;

const splitAgentContent = (content = "") => {
  const normalized = String(content || "");
  const parts = normalized.split(AGENT_DELIMITER_PATTERN);

  if (parts.length < 2) {
    const fallback = normalized.trim();
    return {
      hasDedicatedAgentContent: false,
      humanContent: fallback,
      agentContent: fallback,
    };
  }

  const [humanContent, ...agentContentParts] = parts;
  return {
    hasDedicatedAgentContent: true,
    humanContent: humanContent.trim(),
    agentContent: agentContentParts.join("\n\n").trim(),
  };
};

module.exports = {
  AGENT_DELIMITER_PATTERN,
  splitAgentContent,
};
