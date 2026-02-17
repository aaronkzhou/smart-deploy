import { Check, Minus, X } from "lucide-react";
import { SectionHeader } from "./LiveMonitor";

const rows: [string, "yes" | "partial" | "no", "yes" | "partial" | "no"][] = [
  ["On-chain reentrancy / flash loan simulation", "yes", "yes"],
  ["Owner-privilege / rug-pull pattern matching", "yes", "yes"],
  ["Custodian attestation reconciliation", "no", "yes"],
  ["Off-chain NAV vs. on-chain supply drift", "no", "yes"],
  ["Redemption queue race-condition modeling", "no", "yes"],
  ["Whitelist / transfer-restriction bypass detection", "partial", "yes"],
  ["Jurisdiction & sanctioned-address monitoring", "no", "yes"],
  ["Tuned false-positive rate for RWA contract shapes", "no", "yes"],
];

function Cell({ value }: { value: "yes" | "partial" | "no" }) {
  if (value === "yes") return <Check className="h-4 w-4 text-signal-400" />;
  if (value === "partial") return <Minus className="h-4 w-4 text-white/30" />;
  return <X className="h-4 w-4 text-white/15" />;
}

export function Comparison() {
  return (
    <section id="why-rwa" className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionHeader
        eyebrow="Why a vertical product"
        title="RWA tokenization doesn't fail like DeFi does."
        description="A lending pool's worst case is a bad price feed. An RWA platform's worst case is a custodian's books not matching the chain — and no generic scanner is looking there. Custos is built around that seam."
      />

      <div className="mt-14 overflow-x-auto rounded-2xl border border-void-700">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-void-700 bg-void-850/60">
              <th className="px-6 py-4 text-left font-medium text-white/60">Capability</th>
              <th className="px-6 py-4 text-center font-medium text-white/60">Generic contract scanners</th>
              <th className="px-6 py-4 text-center font-medium text-signal-400">Custos</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, generic, custos], i) => (
              <tr key={label} className={i % 2 === 0 ? "bg-void-900/30" : "bg-transparent"}>
                <td className="px-6 py-4 text-white/70">{label}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <Cell value={generic} />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <Cell value={custos} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
