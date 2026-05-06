import Link from "next/link";
import { getAgentDiscoveryData } from "../lib/agentDiscovery";

function DiscoveryLinkCard({ href, label, description }) {
  return (
    <Link
      href={href}
      className="group block rounded-[6px] border border-contrast-2 bg-contrast-1/60 p-4 transition-colors duration-200 hover:border-primary md:p-5"
    >
      <div className="font-mono text-[0.8rem] tracking-[-0.02em] text-contrast-2 group-hover:text-primary">
        {href}
      </div>
      <h3 className="mt-2 font-serif text-[1.8rem] leading-[0.95] tracking-[-0.03em] text-accent-1 md:text-[2rem]">
        {label}
      </h3>
      <p className="mt-3 font-sans text-[1rem] leading-[1.25] tracking-[0.01em] text-primary md:text-[1.125rem]">
        {description}
      </p>
    </Link>
  );
}

function GuidanceCard({ title, description }) {
  return (
    <div className="rounded-[6px] border border-contrast-2 bg-contrast-1/40 p-4 md:p-5">
      <h3 className="font-serif text-[1.8rem] leading-[0.95] tracking-[-0.03em] text-accent-1 md:text-[2rem]">
        {title}
      </h3>
      <p className="mt-3 font-sans text-[1rem] leading-[1.25] tracking-[0.01em] text-primary md:text-[1.125rem]">
        {description}
      </p>
    </div>
  );
}

function SectionHeading({ title, description, className = "", headingId }) {
  return (
    <div className={className}>
      <h2
        id={headingId}
        className="font-serif text-[2.5rem] leading-[0.92] tracking-[-0.04em] text-accent-1 md:text-[3.5rem]"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-[60rem] font-sans text-[1.125rem] leading-[1.2] tracking-[0.01em] text-primary md:text-[1.5rem]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function LinkSection({ title, items, className = "" }) {
  return (
    <section className={className}>
      <h3 className="font-serif text-[2rem] leading-[0.95] tracking-[-0.03em] text-accent-1 md:text-[2.5rem]">
        {title}
      </h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <DiscoveryLinkCard key={item.href} {...item} />
        ))}
      </div>
    </section>
  );
}

export default function AgentDiscoverySection({
  compact = false,
  showTitle = true,
  id,
  className = "",
}) {
  const discoveryData = getAgentDiscoveryData();
  const headingId = `${id || "agent-discovery"}-title`;
  const primaryEntryPoints = compact
    ? discoveryData.primaryEntryPoints.slice(0, 4)
    : discoveryData.primaryEntryPoints;

  return (
    <section id={id} className={className} aria-labelledby={showTitle ? headingId : undefined}>
      {showTitle ? (
        <SectionHeading
          title={discoveryData.homepage.title}
          description={discoveryData.homepage.description}
          className="mb-6"
          headingId={headingId}
        />
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        {discoveryData.capabilityGuidance.map((item) => (
          <GuidanceCard key={item.title} {...item} />
        ))}
      </div>

      <LinkSection title="Primary entrypoints" items={primaryEntryPoints} className="mt-8" />

      {compact ? (
        <p className="mt-6 font-sans text-[1rem] leading-[1.25] tracking-[0.01em] text-primary md:text-[1.125rem]">
          Need the browser-safe landing page? Visit <Link className="underline decoration-1 underline-offset-4 hover:text-accent-1" href="/for-agents">/for-agents</Link>. Need the markdown explanation of the conventions? Read <Link className="underline decoration-1 underline-offset-4 hover:text-accent-1" href="/agents.md">/agents.md</Link>.
        </p>
      ) : (
        <>
          <LinkSection
            title="Top-level human markdown mirrors"
            items={discoveryData.humanMarkdownMirrors}
            className="mt-10"
          />

          <LinkSection
            title="Machine-oriented section indexes"
            items={discoveryData.agentSectionIndexes}
            className="mt-10"
          />

          <section className="mt-10">
            <h3 className="font-serif text-[2rem] leading-[0.95] tracking-[-0.03em] text-accent-1 md:text-[2.5rem]">
              Retrieval notes
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {discoveryData.usageNotes.map((note) => (
                <div
                  key={note.title}
                  className="rounded-[6px] border border-contrast-2 bg-contrast-1/40 p-4 md:p-5"
                >
                  <div className="font-mono text-[0.8rem] tracking-[-0.02em] text-contrast-2">
                    note
                  </div>
                  <h4 className="mt-2 font-serif text-[1.6rem] leading-[0.95] tracking-[-0.03em] text-accent-1 md:text-[1.9rem]">
                    {note.title}
                  </h4>
                  <p className="mt-3 font-sans text-[1rem] leading-[1.25] tracking-[0.01em] text-primary md:text-[1.125rem]">
                    {note.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </section>
  );
}
