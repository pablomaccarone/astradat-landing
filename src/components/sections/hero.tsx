import Image from "next/image";
import { heroMetrics } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";

const constellationNodes = [
  { left: "12%", top: "20%", size: 12, delay: "0s" },
  { left: "28%", top: "66%", size: 10, delay: "0.4s" },
  { left: "52%", top: "32%", size: 14, delay: "0.8s" },
  { left: "74%", top: "60%", size: 11, delay: "1.2s" },
  { left: "64%", top: "14%", size: 9, delay: "1.6s" },
] as const;

const constellationLinks = [
  { left: "13%", top: "28%", width: "32%", rotation: "10deg", delay: "0s" },
  { left: "28%", top: "64%", width: "26%", rotation: "-16deg", delay: "0.4s" },
  { left: "44%", top: "38%", width: "34%", rotation: "42deg", delay: "0.8s" },
  { left: "52%", top: "30%", width: "30%", rotation: "-18deg", delay: "1.2s" },
] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-24 pt-16 sm:pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(91,251,162,0.12),transparent_45%),_radial-gradient(circle_at_bottom,_rgba(209,50,95,0.08),transparent_55%),_linear-gradient(120deg,#050c1f,#01030b)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(5,12,31,0)_0%,rgba(5,12,31,0.8)_65%,var(--surface)_100%)]" />
      <div className="aurora" />
      <div className="starfield" />
      <div className="section-shell relative z-10 flex flex-col gap-16">
        <header className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center gap-4">
              <Image
                src="/assets/astradat_logo.png"
                alt="AstraDAT"
                width={62}
                height={62}
                className="h-12 w-12 rounded-2xl border border-[var(--border-soft)] bg-[var(--card)] object-cover p-2"
                priority
              />
              <div>
                <p className="text-sm uppercase tracking-[0.6em] text-[var(--text-muted)]">
                  AstraDAT
                </p>
                <p className="font-display text-lg text-[var(--text-primary)]">
                  Transparency. Tokenized.
                </p>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="flex flex-col gap-10">
            <div className="space-y-6">
              <span className="tag">Nasdaq Launch · 30 Days Out</span>
              <h1 className="font-display text-4xl font-semibold leading-tight text-[var(--text-primary)] sm:text-5xl lg:text-[3.75rem]">
                Tokenized Transparency for a New Financial Era
              </h1>
              <p className="text-lg leading-relaxed text-[var(--text-muted)] lg:text-xl">
                AstraDAT is the first Digital Asset Treasury launching on Nasdaq —
                uniting Wall Street trust with blockchain transparency. Track every holding,
                yield strategy, and on-chain move in real time.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#dashboard"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-transparent bg-[linear-gradient(120deg,#d1325f_0%,#c96480_45%,#5bfba2_100%)] px-6 py-3 text-base font-semibold text-[#0d1430] shadow-[0_20px_45px_rgba(5,12,31,0.35)] transition-transform duration-300 hover:scale-[1.02]"
              >
                View Treasury Dashboard
                <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-6 py-3 text-base font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent-mint)]"
              >
                Learn More
                <span aria-hidden>↗</span>
              </a>
            </div>
            <div className="flex flex-wrap gap-6 border-t border-[var(--border-soft)] pt-6 text-sm text-[var(--text-muted)]">
              <div>
                <p className="font-semibold text-[var(--text-primary)]">Next milestone</p>
                <p>Nasdaq bell ringing • Q2 2025</p>
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">Live audit</p>
                <p>24/7 Deloitte x Chainlink proof</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass-panel relative overflow-hidden rounded-[32px] p-6">
              <div className="pulse-ring" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.5em] text-[var(--text-muted)]">
                    Treasury Health
                  </p>
                  <p className="font-display text-3xl text-[var(--text-primary)]">
                    Live Transparency Feed
                  </p>
                </div>
                <span className="rounded-full border border-[var(--border-soft)] px-3 py-1 text-[0.65rem] leading-none text-[var(--text-muted)] whitespace-nowrap">
                  Synced 2s ago
                </span>
              </div>
              <div className="mt-8 grid gap-4">
                {heroMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="live-card rounded-2xl border border-[var(--border-soft)]/60 bg-[color-mix(in_srgb,var(--surface-strong)_80%,var(--accent-night)_20%)] px-4 py-3"
                  >
                    <p className="text-xs uppercase tracking-[0.4em] text-[var(--text-muted)]">
                      {metric.label}
                    </p>
                    <p className="font-display text-2xl text-[var(--text-primary)]">
                      {metric.value}
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">{metric.detail}</p>
                    <div className="live-stream" aria-hidden>
                      <span />
                    </div>
                  </div>
                ))}
              </div>
              <div className="constellation-shell mt-8">
                <div className="constellation-canvas">
                  {constellationLinks.map((link, index) => (
                    <span
                      key={`${link.left}-${index}`}
                      className="constellation-link"
                      style={{
                        left: link.left,
                        top: link.top,
                        width: link.width,
                        transform: `rotate(${link.rotation})`,
                        animationDelay: link.delay,
                      }}
                    />
                  ))}
                  {constellationNodes.map((node, index) => (
                    <span
                      key={`${node.left}-${index}`}
                      className="constellation-node"
                      style={{
                        left: node.left,
                        top: node.top,
                        width: node.size,
                        height: node.size,
                        animationDelay: node.delay,
                      }}
                    />
                  ))}
                  <div className="constellation-core" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
