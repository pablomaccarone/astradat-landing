"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import {
  tokenSnapshots as baseTokenSnapshots,
  transparencyKPIs as baseTransparencyKPIs,
  type KPIConfig,
  type TokenSnapshot,
} from "@/lib/content";
import { cn } from "@/lib/utils";

const initialSeries = [92, 96, 104, 112, 121, 129, 137, 146, 152, 158, 166, 174, 182, 189];

const clamp = (value: number, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) =>
  Math.min(Math.max(value, min), max);

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const buildChart = (values: number[]) => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const denominator = max - min || 1;

  const coordinates = values.map((value, index) => {
    const x = (index / (values.length - 1)) * 100;
    const y = 100 - ((value - min) / denominator) * 100;
    return { x, y };
  });

  const linePath = coordinates
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L100 100 L0 100 Z`;

  return { linePath, areaPath };
};

const formatNumber = (value: number, decimals = 1) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

type AnimatedKPI = KPIConfig & { pulse?: boolean };
type AnimatedToken = TokenSnapshot & { pulse?: boolean };

export function DashboardSection() {
  const [kpis, setKpis] = useState<AnimatedKPI[]>(() =>
    baseTransparencyKPIs.map((kpi) => ({ ...kpi }))
  );
  const [tokens, setTokens] = useState<AnimatedToken[]>(() =>
    baseTokenSnapshots.map((token) => ({ ...token }))
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeouts: number[] = [];
    const glowDuration = 1200;

    const scheduleKpiUpdate = (index: number) => {
      const timeout = window.setTimeout(() => {
        setKpis((prev) =>
          prev.map((kpi, i) => {
            if (i !== index) {
              return kpi;
            }

            const nextValue = clamp(
              kpi.value + randomBetween(-(kpi.variance ?? 0.4), kpi.variance ?? 0.4),
              kpi.min,
              kpi.max
            );

            const nextChange = clamp(
              kpi.change +
                randomBetween(-(kpi.changeVariance ?? 0.4), kpi.changeVariance ?? 0.4),
              kpi.changeMin,
              kpi.changeMax
            );

            return {
              ...kpi,
              value: parseFloat(nextValue.toFixed(kpi.decimals ?? 1)),
              change: parseFloat(nextChange.toFixed(kpi.changeDecimals ?? 1)),
              pulse: true,
            };
          })
        );

        const glowTimeout = window.setTimeout(() => {
          setKpis((prev) =>
            prev.map((kpi, i) => (i === index ? { ...kpi, pulse: false } : kpi))
          );
        }, glowDuration);
        timeouts.push(glowTimeout);

        scheduleKpiUpdate(index);
      }, randomBetween(2200, 5200));

      timeouts.push(timeout);
    };

    const scheduleTokenUpdate = (index: number) => {
      const timeout = window.setTimeout(() => {
        setTokens((prev) =>
          prev.map((token, i) => {
            if (i !== index) {
              return token;
            }

            const nextExposure = clamp(
              token.exposure + randomBetween(-(token.variance ?? 6), token.variance ?? 6),
              token.min,
              token.max
            );

            const nextChange = clamp(
              token.change +
                randomBetween(-(token.changeVariance ?? 1), token.changeVariance ?? 1),
              -8,
              8
            );

            return {
              ...token,
              exposure: parseFloat(nextExposure.toFixed(token.decimals ?? 0)),
              change: parseFloat(nextChange.toFixed(token.changeDecimals ?? 1)),
              pulse: true,
            };
          })
        );

        const glowTimeout = window.setTimeout(() => {
          setTokens((prev) =>
            prev.map((token, i) => (i === index ? { ...token, pulse: false } : token))
          );
        }, glowDuration);
        timeouts.push(glowTimeout);

        scheduleTokenUpdate(index);
      }, randomBetween(2600, 5800));

      timeouts.push(timeout);
    };

    baseTransparencyKPIs.forEach((_, index) => scheduleKpiUpdate(index));
    baseTokenSnapshots.forEach((_, index) => scheduleTokenUpdate(index));

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  const { linePath, areaPath } = useMemo(() => buildChart(initialSeries), []);
  const totalPoints = initialSeries.length;
  const chartMin = Math.min(...initialSeries);
  const chartMax = Math.max(...initialSeries);
  const yAxisLabels = [chartMax, (chartMax + chartMin) / 2, chartMin];
  const chartLabels = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
    });
    const today = new Date();
    const step = 90 / (totalPoints - 1);

    return initialSeries.map((_, index) => {
      const date = new Date(today);
      const daysBack = Math.round((totalPoints - 1 - index) * step);
      date.setDate(today.getDate() - daysBack);
      return formatter.format(date);
    });
  }, [totalPoints]);

  const currentIndex = activeIndex ?? totalPoints - 1;
  const navValue = initialSeries[currentIndex] ?? initialSeries[totalPoints - 1];
  const navPrev = initialSeries[Math.max(currentIndex - 1, 0)] ?? navValue;
  const navBillion = navValue / 100;
  const navChangePercent = ((navValue - navPrev) / Math.max(navPrev, 1)) * 100;
  const navPositive = navChangePercent >= 0;
  const activeLabel = chartLabels[currentIndex];

  const handlePointerMove = (clientX: number) => {
    const rect = chartRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relativeX = clamp((clientX - rect.left) / rect.width, 0, 1);
    const index = Math.round(relativeX * (totalPoints - 1));
    setActiveIndex(index);
  };

  const handlePointerLeave = () => setActiveIndex(null);

  return (
    <Reveal id="dashboard" className="section-shell py-20 lg:py-28">
      <div className="rounded-[40px] border border-[var(--border-soft)] bg-[var(--card-strong)] p-8 shadow-[0_30px_80px_rgba(2,4,18,0.55)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <SectionHeading
            eyebrow="Transparency Dashboard Preview"
            title="See Everything. In Real Time."
            paragraph={
              <>
                Our dashboard gives investors a live view into AstraDAT’s treasury performance — from token
                holdings to yield generation and market value. Built for full transparency, powered by
                blockchain data.
              </>
            }
          />
          <div className="flex flex-col justify-between gap-6 rounded-3xl border border-[var(--border-strong)] bg-[var(--surface-strong)] p-6">
            <div className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
              <span className="rounded-full border border-[var(--border-soft)] px-3 py-1">
                Streaming oracle secured
              </span>
              <span className="rounded-full border border-[var(--border-soft)] px-3 py-1">
                Proof-of-Reserves verified
              </span>
            </div>
            <p className="text-base text-[var(--text-muted)]">
              Live data pipelines merge on-chain telemetry, custodial attestations, and risk policy triggers.
              Investors can drill into every wallet, strategy, and cash flow in one immersive panel.
            </p>
            <a
              href="#"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-transparent bg-[linear-gradient(120deg,#d1325f_0%,#c96480_45%,#5bfba2_100%)] px-6 py-3 font-semibold text-[#0d1430] shadow-[0_15px_35px_rgba(5,12,31,0.25)] transition hover:translate-y-0.5 hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5bfba2]"
            >
              View Live Dashboard
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="relative overflow-hidden rounded-[32px] border border-[var(--border-soft)] bg-[var(--surface-strong)] p-6">
            <div className="absolute inset-0 grid-overlay" aria-hidden />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-muted)]">
                  Treasury NAV
                </p>
                <p className="font-display text-3xl text-[var(--text-primary)]">
                  ${formatNumber(navBillion, 2)}B
                </p>
                <p className="text-sm" style={{ color: navPositive ? "#5bfba2" : "#d1325f" }}>
                  {`${navPositive ? "+" : ""}${navChangePercent.toFixed(1)}% vs prior close`}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  Snapshot · {activeIndex !== null ? activeLabel : "Today"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[var(--text-muted)]">Last 90 days</p>
                <p className="text-xs text-[var(--text-muted)]">Streaming @ 2s cadence</p>
              </div>
            </div>
            <div className="relative mt-6 h-60 w-full">
              <div
                ref={chartRef}
                className="relative h-full w-full cursor-crosshair"
                onMouseMove={(event) => handlePointerMove(event.clientX)}
                onMouseLeave={handlePointerLeave}
                onTouchMove={(event) => handlePointerMove(event.touches[0].clientX)}
                onTouchEnd={handlePointerLeave}
                onTouchCancel={handlePointerLeave}
              >
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" role="presentation">
                  <defs>
                    <linearGradient id="navLine" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#5bfba2" />
                      <stop offset="100%" stopColor="#d1325f" />
                    </linearGradient>
                    <linearGradient id="navFill" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(91,251,162,0.18)" />
                      <stop offset="100%" stopColor="rgba(4,6,18,0.02)" />
                    </linearGradient>
                  </defs>
                  <path d={areaPath} fill="url(#navFill)" opacity={0.6} />
                  <path d={linePath} fill="none" stroke="url(#navLine)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                  <line x1="0" y1="100" x2="100" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <line x1="0" y1="0" x2="0" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                </svg>
                <div className="pointer-events-none absolute inset-0 border border-[var(--border-soft)]" />
                <div className="pointer-events-none absolute inset-y-4 left-0 flex flex-col justify-between text-xs text-[var(--text-muted)]">
                  {yAxisLabels.map((label) => (
                    <span key={label}>{formatNumber(label / 100, 2)}B</span>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-x-4 bottom-2 flex justify-between text-xs text-[var(--text-muted)]">
                  {[0, Math.floor(totalPoints / 2), totalPoints - 1].map((idx) => (
                    <span key={idx}>{chartLabels[idx]}</span>
                  ))}
                </div>
                {activeIndex !== null && (
                  <HoverIndicator
                    index={activeIndex}
                    total={totalPoints}
                    value={initialSeries[activeIndex]}
                    label={chartLabels[activeIndex]}
                    min={chartMin}
                    max={chartMax}
                  />
                )}
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {kpis.map((kpi) => {
                const formattedValue = `${kpi.prefix ?? ""}${formatNumber(
                  kpi.value,
                  kpi.decimals ?? 1
                )}${kpi.suffix ?? ""}`;
                const trendPositive = kpi.betterWhenLower ? kpi.change < 0 : kpi.change >= 0;
                const changeDisplay = `${kpi.change > 0 ? "+" : kpi.change < 0 ? "-" : ""}${
                  kpi.changePrefix ?? ""
                }${formatNumber(Math.abs(kpi.change), kpi.changeDecimals ?? 1)}${
                  kpi.changeSuffix ?? ""
                }`;

                return (
                  <div
                    key={kpi.label}
                    className={cn(
                      "data-card relative rounded-2xl border border-[var(--border-soft)] bg-[color-mix(in_srgb,var(--surface-strong)_75%,var(--accent-night)_25%)] p-4",
                      kpi.pulse && "attention-glow"
                    )}
                  >
                    <p className="text-xs uppercase tracking-[0.4em] text-[var(--text-muted)]">
                      {kpi.label}
                    </p>
                    <motion.p
                      key={`${kpi.label}-${formattedValue}`}
                      initial={{ opacity: 0.4, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="font-display text-2xl text-[var(--text-primary)]"
                    >
                      {formattedValue}
                    </motion.p>
                    <motion.p
                      key={`${kpi.label}-change-${kpi.change}`}
                      initial={{ opacity: 0.3, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-sm"
                      style={{ color: trendPositive ? "#5bfba2" : "#d1325f" }}
                    >
                      {changeDisplay}
                    </motion.p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="glass-panel rounded-[32px] p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-muted)]">
                Token Exposure
              </p>
              <div className="mt-4 space-y-4">
                {tokens.map((token) => {
                  const exposureDisplay = `${token.exposurePrefix ?? ""}${Number(
                    token.exposure
                  ).toLocaleString("en-US", {
                    minimumFractionDigits: token.decimals ?? 0,
                    maximumFractionDigits: token.decimals ?? 0,
                  })}${token.exposureSuffix ?? ""}`;
                  const changePositive = token.change >= 0;
                  const changeDisplay = `${changePositive ? "+" : ""}${token.change.toFixed(
                    token.changeDecimals ?? 1
                  )}%`;

                  return (
                    <div
                      key={token.symbol}
                      className={cn(
                        "data-card flex items-center justify-between rounded-2xl border border-[var(--border-soft)] px-4 py-3",
                        token.pulse && "attention-glow"
                      )}
                    >
                      <div>
                        <p className="font-display text-xl text-[var(--text-primary)]">
                          {token.symbol}
                        </p>
                        <p className="text-sm text-[var(--text-muted)]">{token.name}</p>
                      </div>
                      <div className="text-right">
                        <motion.p
                          key={`${token.symbol}-value-${token.exposure}`}
                          initial={{ opacity: 0.4, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="font-semibold text-[var(--text-primary)]"
                        >
                          {exposureDisplay}
                        </motion.p>
                        <motion.p
                          key={`${token.symbol}-change-${token.change}`}
                          initial={{ opacity: 0.4, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="text-sm"
                          style={{ color: changePositive ? "#5bfba2" : "#d1325f" }}
                        >
                          {changeDisplay}
                        </motion.p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="rounded-[32px] border border-[var(--border-soft)] bg-[radial-gradient(circle_at_top,_rgba(91,251,162,0.16),transparent_60%),var(--card)] p-6">
              <p className="text-sm uppercase tracking-[0.4em] text-[var(--text-muted)]">
                Live Compliance
              </p>
              <ul className="mt-4 space-y-3 text-sm text-[var(--text-muted)]">
                <li className="flex items-center justify-between">
                  <span>Chainlink Proof-of-Reserve</span>
                  <span className="text-[#5bfba2]">Passing</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>NASDAQ 19b-4 filing</span>
                  <span className="text-[#c96480]">Filed</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Deloitte real-time audit</span>
                  <span className="text-[#5bfba2]">No findings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

type HoverIndicatorProps = {
  index: number;
  total: number;
  value: number;
  label: string;
  min: number;
  max: number;
};

function HoverIndicator({ index, total, value, label, min, max }: HoverIndicatorProps) {
  const safeTotal = Math.max(total - 1, 1);
  const progress = (index / safeTotal) * 100;
  const span = Math.max(max - min, 1);
  const yPercent = 100 - ((value - min) / span) * 100;
  const displayValue = `${formatNumber(value / 100, 2)}B`;

  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-y-4 w-px bg-white/35"
        style={{ left: `calc(${progress}% - 0.5px)` }}
      />
      <div
        className="absolute h-3 w-3 -translate-y-1/2 rounded-full border border-white bg-[var(--accent-night)] shadow-[0_0_12px_rgba(91,251,162,0.4)]"
        style={{ left: `calc(${progress}% - 6px)`, top: `calc(${yPercent}% + 8px)` }}
      />
      <div
        className="absolute -translate-x-1/2 -translate-y-full rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2 text-xs text-[var(--text-primary)] shadow-lg"
        style={{ left: `${progress}%`, top: `calc(${yPercent}% - 6px)` }}
      >
        <p className="font-semibold">{label}</p>
        <p className="text-[var(--text-muted)]">{displayValue}</p>
      </div>
    </div>
  );
}
