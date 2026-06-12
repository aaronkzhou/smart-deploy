import { useEffect, useRef, useState } from "react";
import { deployChains, type AuditContract } from "../lib/data";
import { CheckCircle2, Circle, Loader2, Rocket, ShieldAlert, ShieldCheck } from "lucide-react";

type Stage = "idle" | "queued" | "compiling" | "deploying" | "verifying" | "live";

const stageOrder: Stage[] = ["queued", "compiling", "deploying", "verifying", "live"];
const stageLabel: Record<Stage, string> = {
  idle: "Idle",
  queued: "Queued",
  compiling: "Compiling",
  deploying: "Deploying",
  verifying: "Verifying source",
  live: "Live",
};

function mockAddress(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  const hex = hash.toString(16).padStart(8, "0").repeat(5).slice(0, 40);
  return `0x${hex}`;
}

function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

// Contracts below this severity are cleared for one-click multi-chain deployment.
const BLOCKING_SEVERITIES: AuditContract["overallSeverity"][] = ["critical", "high"];

export function DeployPanel({ contract }: { contract: AuditContract }) {
  const blocked = BLOCKING_SEVERITIES.includes(contract.overallSeverity);
  const blockingFindings = contract.findings.filter((f) => f.severity === "critical" || f.severity === "high");

  const [selected, setSelected] = useState<string[]>(["ethereum", "base"]);
  const [statuses, setStatuses] = useState<Record<string, Stage>>({});
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    setStatuses({});
  }, [contract.id]);

  useEffect(() => () => timeouts.current.forEach(clearTimeout), []);

  const isDeploying = Object.values(statuses).some((s) => s !== "live" && s !== "idle");
  const allLive = selected.length > 0 && selected.every((id) => statuses[id] === "live");

  const toggleChain = (id: string) => {
    if (isDeploying) return;
    setSelected((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  };

  const runDeploy = () => {
    if (blocked || selected.length === 0 || isDeploying) return;
    const initial: Record<string, Stage> = {};
    selected.forEach((id) => (initial[id] = "queued"));
    setStatuses(initial);

    selected.forEach((chainId, chainIndex) => {
      let elapsed = 200 + chainIndex * 180;
      stageOrder.slice(1).forEach((stage, i) => {
        elapsed += 450 + i * 250 + Math.random() * 300;
        const t = setTimeout(() => {
          setStatuses((prev) => ({ ...prev, [chainId]: stage }));
        }, elapsed);
        timeouts.current.push(t);
      });
    });
  };

  const reset = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    setStatuses({});
  };

  return (
    <div className="mt-6 rounded-2xl border border-void-700 bg-void-850/50 p-6">
      <div className="flex items-center gap-2">
        <Rocket className="h-4 w-4 text-signal-400" />
        <h4 className="font-medium text-white">Multi-chain auto-deploy</h4>
      </div>

      <div
        className={`mt-4 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
          blocked ? "border-risk-critical/30 bg-risk-critical/5 text-risk-critical" : "border-risk-low/30 bg-risk-low/5 text-risk-low"
        }`}
      >
        {blocked ? <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" /> : <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />}
        <div>
          {blocked ? (
            <>
              <p className="font-medium">Deployment blocked</p>
              <p className="mt-0.5 text-white/50">
                {blockingFindings.length} unresolved {blockingFindings.length === 1 ? "finding" : "findings"} at critical/high
                severity must be fixed before {contract.file} can be auto-deployed.
              </p>
            </>
          ) : (
            <>
              <p className="font-medium">Cleared for deployment</p>
              <p className="mt-0.5 text-white/50">No critical or high severity findings remain for {contract.file}.</p>
            </>
          )}
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-white/30">Target chains</p>
        <div className="flex flex-wrap gap-2">
          {deployChains.map((chain) => {
            const isSelected = selected.includes(chain.id);
            const stage = statuses[chain.id];
            return (
              <button
                key={chain.id}
                onClick={() => toggleChain(chain.id)}
                disabled={isDeploying}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed ${
                  isSelected ? "border-void-500 bg-void-800 text-white" : "border-void-700 bg-void-850/40 text-white/40 hover:border-void-600 hover:text-white/70"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: chain.color }} />
                {chain.name}
                {stage === "live" && <CheckCircle2 className="h-3 w-3 text-signal-400" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={runDeploy}
          disabled={blocked || selected.length === 0 || isDeploying}
          className="inline-flex items-center gap-2 rounded-lg bg-signal-500 px-5 py-2.5 text-sm font-medium text-void-950 transition-all hover:bg-signal-400 hover:shadow-glow-sm disabled:cursor-not-allowed disabled:bg-void-700 disabled:text-white/30 disabled:shadow-none"
        >
          {isDeploying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />}
          {isDeploying ? "Deploying…" : `Auto-deploy to ${selected.length || 0} chain${selected.length === 1 ? "" : "s"}`}
        </button>
        {(isDeploying || allLive) && (
          <button onClick={reset} className="text-xs text-white/40 underline decoration-dotted underline-offset-2 hover:text-white/70">
            Reset
          </button>
        )}
      </div>

      {Object.keys(statuses).length > 0 && (
        <div className="mt-5 space-y-2 border-t border-void-700 pt-5">
          {selected.map((chainId) => {
            const chain = deployChains.find((c) => c.id === chainId)!;
            const stage = statuses[chainId] ?? "idle";
            const address = mockAddress(`${contract.id}-${chainId}`);
            return (
              <div key={chainId} className="flex items-center justify-between rounded-lg bg-void-900/60 px-3.5 py-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: chain.color }} />
                  <span className="text-sm text-white/80">{chain.name}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {stage === "live" ? (
                    <>
                      <span className="font-mono text-white/40">{shortAddress(address)}</span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-risk-low/30 bg-risk-low/10 px-2 py-0.5 text-risk-low">
                        <CheckCircle2 className="h-3 w-3" />
                        Live
                      </span>
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-white/45">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      {stageLabel[stage]}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          {!allLive && (
            <div className="flex items-center gap-1.5 pt-1 text-[11px] text-white/25">
              <Circle className="h-2.5 w-2.5" />
              Deployments run through compile → deploy → source verification before going live.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
