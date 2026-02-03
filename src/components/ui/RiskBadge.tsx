import type { RiskLevel } from "../../lib/data";
import { riskBg, riskBorder, riskDot, riskLabel, riskText } from "../../lib/risk";

export function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${riskBg[level]} ${riskBorder[level]} ${riskText[level]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${riskDot[level]}`} />
      {riskLabel[level]}
    </span>
  );
}
