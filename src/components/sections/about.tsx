import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const pillars = [
  {
    title: "Institutional Discipline",
    copy: "Treasury policies mirror Wall Street-grade compliance with automated guardrails on capital efficiency.",
  },
  {
    title: "On-Chain Clarity",
    copy: "Every wallet, transaction, and strategy is verifiable in real time with immutable audit trails.",
  },
  {
    title: "Nasdaq Ready",
    copy: "Listing documentation, custody frameworks, and market-making infrastructure are in place for launch.",
  },
];

export function AboutSection() {
  return (
    <Reveal id="about" className="section-shell py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <SectionHeading
          eyebrow="About AstraDAT"
          title="Bridging Traditional Finance and Web3 Transparency"
          paragraph={
            <>
              AstraDAT manages digital assets with institutional discipline and on-chain clarity. Every
              holding, transaction, and strategy is verifiable in real time — empowering investors to see how
              digital capital moves, grows, and evolves.
            </>
          }
        />
        <div className="rounded-[32px] border border-[var(--border-soft)] bg-[var(--card)] p-6 shadow-[0_30px_65px_rgba(2,4,18,0.35)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-muted)]">
            Mission
          </p>
          <p className="mt-4 font-display text-2xl text-[var(--text-primary)]">
            Bring Wall Street trust to the blockchain era.
          </p>
          <p className="mt-3 text-base text-[var(--text-muted)]">
            Institutional investors, family offices, and innovators can trace AstraDAT&apos;s treasury in a single
            pane of glass.
          </p>
          <a
            href="#about"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.35em] text-[var(--text-primary)] transition hover:border-[var(--accent-mint)]"
          >
            Discover Our Mission
            <span className="text-lg">↗</span>
          </a>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="glass-panel relative overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1 hover:border-[var(--accent-mint)]/40"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(91,251,162,0.14),transparent_60%)] opacity-50" />
            <div className="relative">
              <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-muted)]">
                {pillar.title}
              </p>
              <p className="mt-4 text-base text-[var(--text-muted)]">{pillar.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
