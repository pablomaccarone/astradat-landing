"use client";

import Image from "next/image";

export function SplashLoader() {
  return (
    <div className="splash-overlay" role="status" aria-live="polite">
      <div className="splash-core">
        <div className="splash-ring">
          <div className="splash-ring__inner" />
        </div>
        <div className="flex flex-col items-center gap-3 text-center">
          <Image
            src="/assets/astradat_logo.png"
            alt="AstraDAT logo"
            width={64}
            height={64}
            className="h-12 w-12"
            priority
          />
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-[var(--text-muted)]">
              AstraDAT
            </p>
            <p className="font-display text-2xl text-[var(--text-primary)]">
              Calibrating Transparency
            </p>
          </div>
        </div>
        <div className="splash-meter">
          <span className="splash-meter__bar" />
          <span className="splash-meter__spark" />
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          Syncing on-chain telemetry · Nasdaq ready
        </p>
      </div>
    </div>
  );
}
