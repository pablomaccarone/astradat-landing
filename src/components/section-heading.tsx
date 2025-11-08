import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  paragraph?: ReactNode;
  align?: "start" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  paragraph,
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "text-center items-center" : "",
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs uppercase tracking-[0.4em] text-[var(--text-muted)]">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-semibold leading-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {paragraph && (
        <p className="text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
          {paragraph}
        </p>
      )}
    </div>
  );
}
