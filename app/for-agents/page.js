import Link from "next/link";
import AgentDiscoverySection from "../components/AgentDiscoverySection";

export function generateMetadata() {
  return {
    title: "For AI Agents • Urbit",
    description:
      "Browser-safe HTML landing page for agents that follow visible links more reliably than raw markdown or JSON.",
  };
}

export default function ForAgentsPage() {
  return (
    <div className="md:mx-4 md:mt-[55px]">
      <section className="mx-auto max-w-[1200px] px-4 pb-24 pt-8 md:px-0 md:pt-12">
        <Link
          href="/"
          className="font-mono text-[0.9rem] tracking-[-0.02em] text-contrast-2 transition-colors hover:text-primary"
        >
          ← back to urbit.org
        </Link>

        <div className="mt-6 border-t border-contrast-2 pt-6">
          <div className="font-mono text-[0.8rem] tracking-[-0.02em] text-contrast-2">
            browser-safe agent entrypoint
          </div>
          <h1 className="mt-2 font-serif text-[3.25rem] leading-[0.9] tracking-[-0.05em] text-accent-1 md:text-[5rem]">
            For AI Agents
          </h1>
          <p className="mt-4 max-w-[60rem] font-sans text-[1.125rem] leading-[1.2] tracking-[0.01em] text-primary md:text-[1.5rem]">
            This page is the browser-safe landing page for agents that follow visible HTML links more reliably than raw markdown or JSON. If you can fetch plain text directly, start with <Link className="underline decoration-1 underline-offset-4 hover:text-accent-1" href="/llms.txt">/llms.txt</Link>. If you want the structured inventory, use <Link className="underline decoration-1 underline-offset-4 hover:text-accent-1" href="/content-index.json">/content-index.json</Link>.
          </p>
        </div>

        <AgentDiscoverySection className="mt-10" showTitle={false} />
      </section>
    </div>
  );
}
