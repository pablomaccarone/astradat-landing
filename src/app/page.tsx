"use client";

import { useEffect, useState } from "react";

import { SplashLoader } from "@/components/splash-loader";
import { AboutSection } from "@/components/sections/about";
import { CTASection } from "@/components/sections/cta-footer";
import { DashboardSection } from "@/components/sections/dashboard-preview";
import { Hero } from "@/components/sections/hero";
import { PartnersSection } from "@/components/sections/partners";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <SplashLoader />}
      <main
        className={`relative min-h-screen overflow-hidden bg-[var(--surface)] pb-16 text-[var(--text-primary)] transition-opacity duration-700 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        aria-busy={isLoading}
      >
        <div className="absolute inset-x-0 top-0 -z-10 h-[60vh] bg-[radial-gradient(circle_at_top,_rgba(91,251,162,0.25),transparent_55%)] blur-[80px]" />
        <Hero />
        <AboutSection />
        <DashboardSection />
        <PartnersSection />
        <CTASection />
      </main>
    </>
  );
}
