# AstraDAT Landing Page

A polished single-page experience for AstraDAT, the first tokenized DAT launching on Nasdaq. This repo pairs a cinematic hero, live dashboard preview, and branded CTA moments to showcase “Nasdaq meets DeFi.”

---

## ⚙️ Tech Stack
- **Next.js 14 (App Router) + React 19** with TypeScript for typed components and routing.
- **Tailwind CSS v4 + custom CSS variables** for the OD1430 foundation, gradients, glass panels, and theme toggle.
- **Framer Motion** powering the splash loader, hero micro-animations, scroll-triggered section reveals, and dashboard hover states.
- **next/font** loading Space Grotesk + Inter directly from Google.
- **AWS Amplify Hosting** for git-connected deployments, previews, and production hosting.

---

## 🧭 Design Notes
- Hero mixes starfield/aurora layers, a constellation motion card, and shimmering “Live Transparency Feed” metrics for a Wall Street-grade vibe.
- Every major section is wrapped in a reusable `Reveal` component for consistent, professional entrance animations.
- Dashboard preview blends a hoverable SVG NAV chart, KPI chips with staggered pulses, and animated token exposure cards to mimic a real-time terminal.
- Gradient CTAs (`#D1325F → #C96480 → #5BFBA2`) stay consistent across hero, dashboard, and footer so both light/dark themes feel cohesive.
- Splash loader simulates “Calibrating Transparency” with orbital rings + telemetry bar before fading into the page.

---
