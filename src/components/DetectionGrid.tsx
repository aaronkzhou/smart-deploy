import { detectionCategories } from "../lib/data";
import { GlowCard } from "./ui/GlowCard";
import { SectionHeader } from "./LiveMonitor";
import { Zap, Gauge, ShieldAlert, Building2, Scale, FileSearch, type LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  zap: Zap,
  gauge: Gauge,
  "shield-alert": ShieldAlert,
  "building-2": Building2,
  scale: Scale,
  "file-search": FileSearch,
};

export function DetectionGrid() {
  return (
    <section id="detection" className="relative border-t border-void-800 bg-void-900/30 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Detection surface"
          title="DeFi exploit patterns, plus the ones only RWA platforms face."
          description="General-purpose contract security tools stop at the EVM boundary. RWA risk lives partly off-chain — in custodian attestations, NAV calculations, and compliance registries — so Custos models that boundary directly."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {detectionCategories.map((cat) => {
            const Icon = icons[cat.icon];
            return (
              <GlowCard key={cat.title} className="flex flex-col p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-signal-500/10 ring-1 ring-signal-500/20">
                  <Icon className="h-5 w-5 text-signal-400" strokeWidth={2} />
                </div>
                <h3 className="mt-4 font-semibold text-white">{cat.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{cat.description}</p>
                <ul className="mt-4 space-y-1.5 border-t border-void-700 pt-4">
                  {cat.examples.map((ex) => (
                    <li key={ex} className="flex items-start gap-2 text-xs text-white/45">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-signal-500/70" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
