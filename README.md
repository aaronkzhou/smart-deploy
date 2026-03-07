# Custos

Risk intelligence for tokenized real-world assets (RWA).

Custos audits RWA tokenization contracts pre-deployment and monitors live pools for exploit patterns — flash loan attacks, oracle manipulation, rug-pull signatures — plus failure modes generic contract scanners don't cover because they live partly off-chain: custodian attestation drift, NAV mismatch, redemption queue races, and compliance/whitelist bypass.

This repo is the frontend: a UI-first product mockup (dark, glassy, dashboard-style, inspired by [dgrid.ai](https://dgrid.ai/)) demonstrating the live monitoring dashboard, detection library, RWA-vs-generic-tooling comparison, and a sample pre-deployment audit report. All data is mocked in [`src/lib/data.ts`](src/lib/data.ts).

## Why RWA, specifically

A DeFi lending pool's worst case is a bad price feed. An RWA platform's worst case is the custodian's books not matching the chain — and generic contract scanners aren't looking there. Custos is built around that seam: attestation reconciliation, off-chain NAV vs. on-chain supply, redemption-queue integrity, and jurisdiction/compliance monitoring, alongside standard EVM exploit detection.

## Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for dev/build tooling
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for entrance/feed animations
- [Recharts](https://recharts.org/) for sparkline trends
- [Lucide](https://lucide.dev/) for icons

## Getting started

```bash
npm install
npm run dev       # start dev server at http://localhost:5173
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/        # page sections (Hero, LiveMonitor, DetectionGrid, Comparison, AuditReport, CTA, Footer, Nav)
  components/ui/      # shared primitives (GlowCard, RiskBadge, RiskGauge, Sparkline)
  lib/data.ts          # mock monitored assets, detection categories, audit findings, live feed events
  lib/risk.ts          # risk-level → color/label/style mappings
```

## Status

Frontend-only concept UI — no backend, no real chain data or contract analysis yet. Swap `src/lib/data.ts` for a real API/feed to wire it up.
