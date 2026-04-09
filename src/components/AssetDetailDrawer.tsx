import { AnimatePresence, motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MonitoredAsset } from "../lib/data";
import { riskColor } from "../lib/risk";
import { RiskBadge } from "./ui/RiskBadge";
import { RiskGauge } from "./ui/RiskGauge";
import { AlertTriangle, Building2, Link2, X } from "lucide-react";

const breakdownLabels: Record<keyof MonitoredAsset["riskBreakdown"], string> = {
  contract: "Contract logic",
  custodian: "Custodian drift",
  oracle: "Oracle / NAV feed",
  compliance: "Compliance",
};

export function AssetDetailDrawer({ asset, onClose }: { asset: MonitoredAsset | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {asset && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-[70] w-full max-w-xl overflow-y-auto border-l border-void-700 bg-void-900 shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-void-700 bg-void-900/95 px-6 py-4 backdrop-blur">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{asset.symbol}</span>
                  <span className="rounded border border-void-600 px-1.5 py-0.5 font-mono text-[10px] text-white/40">
                    {asset.chain}
                  </span>
                </div>
                <p className="text-sm text-white/50">{asset.name}</p>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-void-700 text-white/50 transition-colors hover:border-void-600 hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-8 px-6 py-6">
              <div className="flex items-center justify-between rounded-xl border border-void-700 bg-void-850/50 p-5">
                <div>
                  <p className="text-xs text-white/40">Composite risk score</p>
                  <div className="mt-2">
                    <RiskBadge level={asset.riskLevel} />
                  </div>
                </div>
                <RiskGauge score={asset.riskScore} level={asset.riskLevel} size={72} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <InfoRow icon={Building2} label="Custodian" value={asset.custodian} />
                <InfoRow icon={Link2} label="TVL" value={asset.tvl} />
              </div>

              <div>
                <h4 className="text-sm font-medium text-white/70">Risk breakdown</h4>
                <div className="mt-3 space-y-3">
                  {(Object.keys(asset.riskBreakdown) as (keyof typeof asset.riskBreakdown)[]).map((key) => {
                    const value = asset.riskBreakdown[key];
                    return (
                      <div key={key}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="text-white/50">{breakdownLabels[key]}</span>
                          <span className="font-mono text-white/60">{value}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-void-800">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${value}%`, backgroundColor: riskColor[asset.riskLevel] }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-white/70">On-chain supply vs. attested reserve</h4>
                <div className="mt-3 h-48 rounded-xl border border-void-700 bg-void-850/40 p-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={asset.attestationHistory} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                      <defs>
                        <linearGradient id="supplyFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4dd4a8" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="#4dd4a8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#ffffff0d" vertical={false} />
                      <XAxis dataKey="date" tick={{ fill: "#ffffff55", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#ffffff55", fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
                      <Tooltip
                        contentStyle={{ background: "#12151c", border: "1px solid #1d222b", borderRadius: 8, fontSize: 12 }}
                        labelStyle={{ color: "#ffffff99" }}
                      />
                      <Area type="monotone" dataKey="onChainSupply" name="On-chain supply" stroke="#4dd4a8" fill="url(#supplyFill)" strokeWidth={2} />
                      <Area
                        type="monotone"
                        dataKey="attestedReserve"
                        name="Attested reserve"
                        stroke="#e8b84b"
                        fill="none"
                        strokeWidth={2}
                        strokeDasharray="4 3"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {asset.flags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-white/70">Active flags</h4>
                  <div className="mt-3 space-y-2">
                    {asset.flags.map((flag) => (
                      <div key={flag} className="flex items-start gap-2 rounded-lg border border-risk-medium/20 bg-risk-medium/5 px-3 py-2.5 text-sm text-white/70">
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-risk-medium" />
                        {flag}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof Building2; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-void-700 bg-void-850/40 p-3.5">
      <div className="flex items-center gap-1.5 text-xs text-white/40">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-1 text-sm font-medium text-white/80">{value}</p>
    </div>
  );
}
