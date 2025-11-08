import { Reveal } from "@/components/reveal";

export function CTASection() {
  return (
    <Reveal className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(91,251,162,0.18),transparent_55%),radial-gradient(circle_at_bottom,_rgba(209,50,95,0.3),transparent_60%),linear-gradient(120deg,#050c1f,#0d1430)]" />
      <div className="section-shell relative z-10 rounded-[40px] border border-[var(--border-soft)] bg-[color-mix(in_srgb,var(--surface-strong)_80%,var(--accent-night)_20%)] p-10 text-center shadow-[0_30px_70px_rgba(2,4,18,0.6)]">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-muted)]">
          Call To Action
        </p>
        <h3 className="mt-4 font-display text-4xl text-[var(--text-primary)]">
          Join the Next Era of Transparent Finance
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--text-muted)]">
          Be among the first to experience tokenized transparency. Join our waitlist to receive updates,
          insights, and early access to AstraDAT’s live dashboard.
        </p>
        <form className="mx-auto mt-8 flex flex-col gap-4 text-left sm:flex-row sm:items-stretch sm:gap-3">
          <label className="sr-only" htmlFor="waitlist-email">
            Email address
          </label>
          <input
            id="waitlist-email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="h-14 flex-1 rounded-full border border-[var(--border-soft)] bg-[color-mix(in_srgb,var(--surface-strong)_85%,transparent)] px-6 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-mint)] focus:outline-none"
          />
          <button
            type="submit"
            className="h-14 rounded-full bg-gradient-to-r from-[#5bfba2] via-[#c96480] to-[#d1325f] px-8 text-base font-semibold text-[#0d1430] shadow-[0_20px_45px_rgba(209,50,95,0.45)] transition hover:opacity-95"
          >
            Join the Waitlist
          </button>
        </form>
        <p className="mt-6 text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">
          © 2025 AstraDAT · Digital Asset Treasury Inc. · Nasdaq-Listed (Pending)
        </p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">Transparency. Tokenized.</p>
      </div>
    </Reveal>
  );
}
