import { auditFindings } from "../lib/data";
import { SectionHeader } from "./LiveMonitor";
import { AlertOctagon, FileCode2 } from "lucide-react";

const severityStyle: Record<string, string> = {
  critical: "text-risk-critical border-risk-critical/30 bg-risk-critical/10",
  high: "text-risk-high border-risk-high/30 bg-risk-high/10",
  medium: "text-risk-medium border-risk-medium/30 bg-risk-medium/10",
  low: "text-risk-low border-risk-low/30 bg-risk-low/10",
  info: "text-white/50 border-void-600 bg-white/5",
};

const codeLines = [
  "function settleRedemption(uint256 requestId) external {",
  "    RedemptionRequest storage req = requests[requestId];",
  "    require(req.status == Status.Pending, \"not pending\");",
  "",
  "    uint256 nav = navOracle.getLatestNAV(); // ⚠ live read, not snapshot",
  "    uint256 payout = req.shares * nav / 1e18;",
  "",
  "    req.status = Status.Settled;",
  "    asset.transfer(req.owner, payout);",
  "    emit RedemptionSettled(requestId, payout);",
  "}",
];

export function AuditReport() {
  return (
    <section id="audit" className="relative border-t border-void-800 bg-void-900/30 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Pre-deployment audit"
          title="Findings before the contract ever sees mainnet."
          description="Static and symbolic analysis tuned to RWA contract shapes — redemption queues, attestation oracles, custodial hooks — surfaced as ranked findings tied to exact lines."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-void-700 bg-void-950">
            <div className="flex items-center gap-2 border-b border-void-700 bg-void-900/80 px-4 py-3">
              <FileCode2 className="h-3.5 w-3.5 text-white/40" />
              <span className="font-mono text-xs text-white/50">contracts/RedemptionManager.sol</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
              {codeLines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="mr-4 w-5 select-none text-right text-white/20">{i + 209}</span>
                  <span className={line.includes("⚠") ? "text-risk-critical" : "text-white/70"}>{line || " "}</span>
                </div>
              ))}
            </pre>
          </div>

          <div className="space-y-4">
            {auditFindings.map((f) => (
              <div key={f.title} className="rounded-2xl border border-void-700 bg-void-850/60 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <AlertOctagon className={`mt-0.5 h-4 w-4 shrink-0 ${severityStyle[f.severity].split(" ")[0]}`} />
                    <div>
                      <h4 className="font-medium text-white">{f.title}</h4>
                      <p className="mt-1 font-mono text-xs text-white/35">
                        {f.file}:{f.line}
                      </p>
                    </div>
                  </div>
                  <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${severityStyle[f.severity]}`}>
                    {f.severity}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
