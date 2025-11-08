"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  delay?: number;
  children: ReactNode;
  className?: string;
} & HTMLMotionProps<"section">;

export function Reveal({ delay = 0, children, className, ...rest }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const animationProps = prefersReducedMotion
    ? { initial: false, animate: { opacity: 1, y: 0, scale: 1 } }
    : {
        initial: { opacity: 0, y: 40, scale: 0.98 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, amount: 0.35 },
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
      };

  return (
    <motion.section className={className} {...animationProps} {...rest}>
      {children}
    </motion.section>
  );
}
