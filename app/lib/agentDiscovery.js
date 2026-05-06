import agentDiscoveryContent from "./agentDiscoveryContent.cjs";

export function getAgentDiscoveryData() {
  return agentDiscoveryContent.loadAgentDiscoveryMarkdown();
}
