import { monitoredAssets } from "../lib/data";
import { riskColor } from "../lib/risk";
import { GlowCard } from "./ui/GlowCard";
import { RiskBadge } from "./ui/RiskBadge";
import { RiskGauge } from "./ui/RiskGauge";
import { Sparkline } from "./ui/Sparkline";
import { AlertTriangle, Building2 } from "lucide-react";

export function LiveMonitor() {
  return (
    <section id="platform" className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionHeader
        eyebrow="Live monitoring"
        title="Every tokenized pool, watched continuously."
        description="Custos re-scores each contract on every block and reconciles against custodian attestations on their reporting cadence — so drift shows up as a number, not a headline."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {monitoredAssets.map((asset) => (
          <GlowCard key={asset.id} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{asset.symbol}</span>
                  <span className="rounded border border-void-600 px-1.5 py-0.5 font-mono text-[10px] text-white/40">
                    {asset.chain}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-white/50">{asset.name}</p>
              </div>
              <RiskGauge score={asset.riskScore} level={asset.riskLevel} size={56} />
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg bg-void-800/60 px-3 py-2">
              <div className="flex items-center gap-1.5 text-xs text-white/45">
                <Building2 className="h-3.5 w-3.5" />
                {asset.custodian}
              </div>
              <span className="font-mono text-xs text-white/60">{asset.tvl}</span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <RiskBadge level={asset.riskLevel} />
              <Sparkline data={asset.trend} color={riskColor[asset.riskLevel]} />
            </div>

            {asset.flags.length > 0 && (
              <div className="mt-4 space-y-1.5 border-t border-void-700 pt-3">
                {asset.flags.map((flag) => (
                  <div key={flag} className="flex items-start gap-1.5 text-xs text-white/50">
                    <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-risk-medium" />
                    {flag}
                  </div>
                ))}
              </div>
            )}
          </GlowCard>
        ))}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="font-mono text-xs uppercase tracking-widest text-signal-400">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-white/50">{description}</p>
    </div>
  );
}
