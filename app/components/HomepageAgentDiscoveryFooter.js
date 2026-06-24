import Image from "next/image";
import Link from "next/link";
import { getAgentDiscoveryData } from "../lib/agentDiscovery";
import AgentPromptCopyButton from "./AgentPromptCopyButton";

function CompactLinks({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.href}
          className="font-sans text-base leading-[1.2] tracking-[0.01em] text-primary md:text-lg"
        >
          <Link
            href={item.href}
            className="font-mono tracking-[-0.02em] text-contrast-2 underline decoration-1 underline-offset-4 transition-colors hover:text-primary"
          >
            {item.href}
          </Link>
          <span className="text-contrast-2"> — </span>
          <span>{item.description}</span>
        </li>
      ))}
    </ul>
  );
}

function CompactNotes({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.title}
          className="font-sans text-base leading-[1.2] tracking-[0.01em] text-primary md:text-lg"
        >
          <span className="font-mono tracking-[-0.02em] text-contrast-2">{item.title}</span>
          <span className="text-contrast-2"> — </span>
          <span>{item.description}</span>
        </li>
      ))}
    </ul>
  );
}

function DisclosureBlock({ title, children }) {
  return (
    <details className="agent-discovery-disclosure border-t border-contrast-2 py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-mono text-[0.78rem] tracking-[-0.02em] text-contrast-2 [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <Image
          src="/icons/toggle-karat.svg"
          alt=""
          width={9}
          height={7}
          className="agent-discovery-caret h-[7px] w-[9px] invert transition-transform duration-300"
        />
      </summary>
      <div className="pt-3">{children}</div>
    </details>
  );
}

export default function HomepageAgentDiscoveryFooter({ id, className = "" }) {
  const discoveryData = getAgentDiscoveryData();

  return (
    <section id={id} className={className} aria-labelledby={`${id}-title`}>
      <details className="agent-discovery-disclosure border-t border-contrast-2 py-4">
        <summary className="flex cursor-pointer list-none items-start justify-between gap-3 [&::-webkit-details-marker]:hidden">
          <div className="min-w-0 pt-[2px]">
            <h2
              id={`${id}-title`}
              className="font-mono text-[0.8rem] uppercase tracking-[0.08em] text-contrast-2"
            >
              {discoveryData.homepage.footerTitle}
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-2 pl-3">
            <AgentPromptCopyButton prompt={discoveryData.homepage.copyPrompt} />
            <Image
              src="/icons/toggle-karat.svg"
              alt=""
              width={9}
              height={7}
              className="agent-discovery-caret mt-[1px] h-[7px] w-[9px] invert transition-transform duration-300"
            />
          </div>
        </summary>

        <div className="pt-4">
          <p className="max-w-[52rem] font-sans text-base leading-[1.2] tracking-[0.01em] text-primary md:text-lg">
            {discoveryData.homepage.description}
          </p>

          <div className="mt-4 space-y-0">
            <DisclosureBlock title="capability guidance">
              <CompactNotes items={discoveryData.capabilityGuidance} />
            </DisclosureBlock>

            <DisclosureBlock title="primary entrypoints">
              <CompactLinks items={discoveryData.primaryEntryPoints} />
            </DisclosureBlock>

            <DisclosureBlock title="human markdown mirrors">
              <CompactLinks items={discoveryData.humanMarkdownMirrors} />
            </DisclosureBlock>

            <DisclosureBlock title="machine-oriented indexes">
              <CompactLinks items={discoveryData.agentSectionIndexes} />
            </DisclosureBlock>

            <DisclosureBlock title="retrieval notes">
              <CompactNotes items={discoveryData.usageNotes} />
            </DisclosureBlock>
          </div>
        </div>
      </details>
    </section>
  );
}
