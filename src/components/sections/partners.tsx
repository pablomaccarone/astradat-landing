import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { partnerList } from "@/lib/content";

export function PartnersSection() {
  return (
    <Reveal className="section-shell py-20">
      <div className="rounded-[36px] border border-[var(--border-soft)] bg-[var(--card)] p-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Nasdaq & Partners"
            title="Backed by Nasdaq. Powered by Ethereum."
            paragraph="AstraDAT combines the credibility of Nasdaq-listed assets with the innovation of decentralized finance. Strategic partners bring deep financial experience and blockchain-native infrastructure."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partnerList.map((partner) => (
              <div
                key={partner.name}
                className="group rounded-2xl border border-[var(--border-soft)] bg-[color-mix(in_srgb,var(--surface-strong)_70%,var(--accent-night)_30%)] px-4 py-6 text-center transition hover:-translate-y-1 hover:border-[var(--accent-mint)]/40"
              >
                <p className="font-display text-xl text-[var(--text-primary)]">{partner.name}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">
                  {partner.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
