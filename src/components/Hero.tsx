import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { LiveFeedPanel } from "./LiveFeedPanel";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-40 sm:pt-48">
      <div className="absolute inset-0 bg-grid mask-fade-b" />
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-signal-500/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-void-600 bg-void-850/60 px-3 py-1.5 text-xs text-white/60"
          >
            <Sparkles className="h-3 w-3 text-signal-400" />
            Purpose-built for RWA tokenization, not generic DeFi
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-gradient text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Catch the exploit before it touches real-world collateral.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/50"
          >
            Custos audits RWA tokenization contracts pre-deployment and watches live pools for flash loan attacks, oracle
            manipulation, and rug-pull signatures — plus the failure modes generic tools miss: custodian drift, NAV
            mismatch, and compliance bypass.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#cta"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-signal-500 px-6 py-3 text-sm font-medium text-void-950 transition-all hover:bg-signal-400 hover:shadow-glow"
            >
              Request platform access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#audit"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-void-600 bg-void-850/50 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-void-500 hover:text-white"
            >
              See a sample audit
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-14 flex items-center gap-8 border-t border-void-700 pt-8"
          >
            {[
              ["$198M", "RWA TVL monitored"],
              ["6", "asset classes covered"],
              ["<400ms", "median flag latency"],
            ].map(([stat, label]) => (
              <div key={label}>
                <div className="font-mono text-xl font-semibold text-white">{stat}</div>
                <div className="mt-1 text-xs text-white/40">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <LiveFeedPanel />
        </motion.div>
      </div>
    </section>
  );
}
