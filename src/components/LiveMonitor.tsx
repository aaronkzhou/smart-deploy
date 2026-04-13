import { useEffect, useMemo, useState } from "react";
import { monitoredAssets, type AssetCategory, type MonitoredAsset, type RiskLevel } from "../lib/data";
import { riskColor } from "../lib/risk";
import { GlowCard } from "./ui/GlowCard";
import { RiskBadge } from "./ui/RiskBadge";
import { RiskGauge } from "./ui/RiskGauge";
import { Sparkline } from "./ui/Sparkline";
import { AssetDetailDrawer } from "./AssetDetailDrawer";
import { AlertTriangle, Building2, Search, X } from "lucide-react";

const categories: AssetCategory[] = ["Treasury Bills", "Private Credit", "Real Estate", "Commodities", "Invoice Financing"];
const riskLevels: RiskLevel[] = ["low", "medium", "high", "critical"];

export function LiveMonitor() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<AssetCategory | null>(null);
  const [risk, setRisk] = useState<RiskLevel | null>(null);
  const [selected, setSelected] = useState<MonitoredAsset | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return monitoredAssets.filter((a) => {
      if (category && a.category !== category) return false;
      if (risk && a.riskLevel !== risk) return false;
      if (q && !a.name.toLowerCase().includes(q) && !a.symbol.toLowerCase().includes(q) && !a.custodian.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, category, risk]);

  const hasActiveFilters = query !== "" || category !== null || risk !== null;

  return (
    <section id="platform" className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionHeader
        eyebrow="Live monitoring"
        title="Every tokenized pool, watched continuously."
        description="Custos re-scores each contract on every block and reconciles against custodian attestations on their reporting cadence — so drift shows up as a number, not a headline. Click any asset for the full breakdown."
      />

      <div className="mt-10 flex flex-col gap-4">
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, symbol, custodian…"
            className="w-full rounded-lg border border-void-700 bg-void-850/50 py-2.5 pl-9 pr-9 text-sm text-white placeholder:text-white/30 outline-none focus:border-signal-500/50"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[10px] uppercase tracking-widest text-white/30">Category</span>
          {categories.map((c) => (
            <Chip key={c} active={category === c} onClick={() => setCategory(category === c ? null : c)}>
              {c}
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[10px] uppercase tracking-widest text-white/30">Risk</span>
          {riskLevels.map((r) => (
            <Chip key={r} active={risk === r} onClick={() => setRisk(risk === r ? null : r)} dotColor={riskColor[r]}>
              {r}
            </Chip>
          ))}
          {hasActiveFilters && (
            <button
              onClick={() => {
                setQuery("");
                setCategory(null);
                setRisk(null);
              }}
              className="ml-1 text-xs text-white/40 underline decoration-dotted underline-offset-2 hover:text-white/70"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 font-mono text-xs text-white/30">
        {filtered.length} of {monitoredAssets.length} assets
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-void-700 py-16 text-center text-sm text-white/40">
          No assets match those filters.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((asset) => (
            <button key={asset.id} onClick={() => setSelected(asset)} className="text-left">
              <GlowCard className="cursor-pointer p-5 hover:shadow-glow-sm">
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
            </button>
          ))}
        </div>
      )}

      <AssetDetailDrawer asset={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function Chip({
  children,
  active,
  onClick,
  dotColor,
}: {
  children: string;
  active: boolean;
  onClick: () => void;
  dotColor?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs capitalize transition-colors ${
        active ? "border-signal-500/40 bg-signal-500/10 text-signal-400" : "border-void-700 bg-void-850/40 text-white/50 hover:border-void-600 hover:text-white/70"
      }`}
    >
      {dotColor && <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dotColor }} />}
      {children}
    </button>
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
