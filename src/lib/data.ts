export type RiskLevel = "low" | "medium" | "high" | "critical";

export type AssetCategory = "Treasury Bills" | "Private Credit" | "Real Estate" | "Commodities" | "Invoice Financing";

export interface RiskBreakdown {
  contract: number;
  custodian: number;
  oracle: number;
  compliance: number;
}

export interface AttestationPoint {
  date: string;
  onChainSupply: number;
  attestedReserve: number;
}

export interface MonitoredAsset {
  id: string;
  name: string;
  symbol: string;
  category: AssetCategory;
  custodian: string;
  chain: string;
  tvl: string;
  riskScore: number;
  riskLevel: RiskLevel;
  trend: number[];
  flags: string[];
  riskBreakdown: RiskBreakdown;
  attestationHistory: AttestationPoint[];
}

export const monitoredAssets: MonitoredAsset[] = [
  {
    id: "rwa-01",
    name: "Meridian T-Bill Vault",
    symbol: "mTBL",
    category: "Treasury Bills",
    custodian: "Meridian Trust Co.",
    chain: "Ethereum",
    tvl: "$84.2M",
    riskScore: 12,
    riskLevel: "low",
    trend: [10, 11, 9, 12, 13, 11, 12],
    flags: [],
    riskBreakdown: { contract: 8, custodian: 5, oracle: 10, compliance: 4 },
    attestationHistory: [
      { date: "07/15", onChainSupply: 84.0, attestedReserve: 84.0 },
      { date: "07/16", onChainSupply: 84.0, attestedReserve: 84.0 },
      { date: "07/17", onChainSupply: 84.1, attestedReserve: 84.1 },
      { date: "07/18", onChainSupply: 84.1, attestedReserve: 84.1 },
      { date: "07/19", onChainSupply: 84.2, attestedReserve: 84.2 },
      { date: "07/20", onChainSupply: 84.2, attestedReserve: 84.2 },
      { date: "07/21", onChainSupply: 84.2, attestedReserve: 84.2 },
    ],
  },
  {
    id: "rwa-02",
    name: "Halcyon Private Credit Pool",
    symbol: "hPCP",
    category: "Private Credit",
    custodian: "Halcyon Capital SPV",
    chain: "Base",
    tvl: "$31.7M",
    riskScore: 47,
    riskLevel: "medium",
    trend: [18, 22, 25, 30, 38, 44, 47],
    flags: ["NAV drift vs. attestation: 2.1%"],
    riskBreakdown: { contract: 30, custodian: 55, oracle: 40, compliance: 20 },
    attestationHistory: [
      { date: "07/15", onChainSupply: 30.0, attestedReserve: 30.0 },
      { date: "07/16", onChainSupply: 30.3, attestedReserve: 30.2 },
      { date: "07/17", onChainSupply: 30.6, attestedReserve: 30.3 },
      { date: "07/18", onChainSupply: 30.9, attestedReserve: 30.4 },
      { date: "07/19", onChainSupply: 31.2, attestedReserve: 30.6 },
      { date: "07/20", onChainSupply: 31.5, attestedReserve: 30.7 },
      { date: "07/21", onChainSupply: 31.7, attestedReserve: 31.0 },
    ],
  },
  {
    id: "rwa-03",
    name: "Solstice Real Estate Fund",
    symbol: "SREF",
    category: "Real Estate",
    custodian: "Solstice Property Holdings",
    chain: "Polygon",
    tvl: "$12.4M",
    riskScore: 78,
    riskLevel: "high",
    trend: [20, 24, 33, 41, 55, 68, 78],
    flags: ["Oracle price stale 6h+", "Redemption queue depth spike"],
    riskBreakdown: { contract: 45, custodian: 60, oracle: 88, compliance: 35 },
    attestationHistory: [
      { date: "07/15", onChainSupply: 11.0, attestedReserve: 11.0 },
      { date: "07/16", onChainSupply: 11.2, attestedReserve: 11.0 },
      { date: "07/17", onChainSupply: 11.5, attestedReserve: 11.0 },
      { date: "07/18", onChainSupply: 11.8, attestedReserve: 11.0 },
      { date: "07/19", onChainSupply: 12.0, attestedReserve: 11.0 },
      { date: "07/20", onChainSupply: 12.2, attestedReserve: 11.0 },
      { date: "07/21", onChainSupply: 12.4, attestedReserve: 11.0 },
    ],
  },
  {
    id: "rwa-04",
    name: "Ferrum Commodities Token",
    symbol: "FeCT",
    category: "Commodities",
    custodian: "Ferrum Warehouse Group",
    chain: "Arbitrum",
    tvl: "$6.1M",
    riskScore: 94,
    riskLevel: "critical",
    trend: [15, 19, 26, 45, 61, 82, 94],
    flags: ["Mint exceeds attested collateral", "Owner-only LP withdrawal detected"],
    riskBreakdown: { contract: 96, custodian: 90, oracle: 70, compliance: 55 },
    attestationHistory: [
      { date: "07/15", onChainSupply: 5.2, attestedReserve: 5.2 },
      { date: "07/16", onChainSupply: 5.4, attestedReserve: 5.2 },
      { date: "07/17", onChainSupply: 5.6, attestedReserve: 5.2 },
      { date: "07/18", onChainSupply: 5.8, attestedReserve: 5.2 },
      { date: "07/19", onChainSupply: 5.9, attestedReserve: 5.2 },
      { date: "07/20", onChainSupply: 6.0, attestedReserve: 5.2 },
      { date: "07/21", onChainSupply: 6.1, attestedReserve: 5.2 },
    ],
  },
  {
    id: "rwa-05",
    name: "Ledgerline Invoice Pool",
    symbol: "LINV",
    category: "Invoice Financing",
    custodian: "Ledgerline Finance Ltd.",
    chain: "Ethereum",
    tvl: "$19.8M",
    riskScore: 29,
    riskLevel: "low",
    trend: [30, 28, 31, 27, 26, 28, 29],
    flags: [],
    riskBreakdown: { contract: 25, custodian: 20, oracle: 30, compliance: 15 },
    attestationHistory: [
      { date: "07/15", onChainSupply: 19.5, attestedReserve: 19.5 },
      { date: "07/16", onChainSupply: 19.6, attestedReserve: 19.6 },
      { date: "07/17", onChainSupply: 19.7, attestedReserve: 19.6 },
      { date: "07/18", onChainSupply: 19.7, attestedReserve: 19.7 },
      { date: "07/19", onChainSupply: 19.8, attestedReserve: 19.7 },
      { date: "07/20", onChainSupply: 19.8, attestedReserve: 19.8 },
      { date: "07/21", onChainSupply: 19.8, attestedReserve: 19.8 },
    ],
  },
  {
    id: "rwa-06",
    name: "Aurelia Gold-Backed Token",
    symbol: "AUGT",
    category: "Commodities",
    custodian: "Aurelia Bullion Custody",
    chain: "Base",
    tvl: "$44.9M",
    riskScore: 36,
    riskLevel: "medium",
    flags: ["Whitelist bypass attempt (blocked)"],
    trend: [12, 14, 20, 24, 30, 33, 36],
    riskBreakdown: { contract: 20, custodian: 25, oracle: 22, compliance: 58 },
    attestationHistory: [
      { date: "07/15", onChainSupply: 44.0, attestedReserve: 44.0 },
      { date: "07/16", onChainSupply: 44.2, attestedReserve: 44.1 },
      { date: "07/17", onChainSupply: 44.4, attestedReserve: 44.2 },
      { date: "07/18", onChainSupply: 44.5, attestedReserve: 44.3 },
      { date: "07/19", onChainSupply: 44.6, attestedReserve: 44.4 },
      { date: "07/20", onChainSupply: 44.8, attestedReserve: 44.5 },
      { date: "07/21", onChainSupply: 44.9, attestedReserve: 44.6 },
    ],
  },
];

export interface DetectionCategory {
  title: string;
  description: string;
  examples: string[];
  icon: string;
}

export const detectionCategories: DetectionCategory[] = [
  {
    title: "Flash Loan Attacks",
    description:
      "Simulates flash-loan-funded exploit paths against pooled liquidity wrapping tokenized assets before they're exploitable on mainnet.",
    examples: ["Single-block collateral inflation", "Reentrancy via callback hooks", "Cross-pool price impact abuse"],
    icon: "zap",
  },
  {
    title: "Oracle Manipulation",
    description:
      "RWA price feeds blend on-chain and attested off-chain NAV — Custos flags staleness, deviation, and single-source dependency specific to that hybrid model.",
    examples: ["Stale NAV attestation windows", "Single-custodian price dependency", "Feed deviation vs. reference basket"],
    icon: "gauge",
  },
  {
    title: "Rug-Pull Signatures",
    description:
      "Pattern-matches owner privilege combinations — mint rights, LP control, pausability — against known exit patterns before liquidity is deep.",
    examples: ["Unrestricted owner mint", "LP withdrawal without timelock", "Hidden proxy admin upgrade path"],
    icon: "shield-alert",
  },
  {
    title: "Custodian Drift",
    description:
      "RWA-specific: continuously reconciles on-chain supply against custodian attestations and redemption records, catching under-collateralization early.",
    examples: ["Supply vs. attested reserve mismatch", "Missed attestation cadence", "Redemption/NAV divergence"],
    icon: "building-2",
  },
  {
    title: "Compliance Drift",
    description:
      "Monitors whitelist, transfer-restriction, and jurisdiction logic for silent bypasses that would break the platform's regulatory wrapper.",
    examples: ["KYC allowlist bypass", "Transfer-restriction circumvention", "Sanctioned-address interaction"],
    icon: "scale",
  },
  {
    title: "Pre-Deploy Contract Audit",
    description:
      "Static + symbolic analysis tuned to RWA contract patterns (redemption queues, attestation oracles, custodial hooks) before you ship to mainnet.",
    examples: ["Redemption queue race conditions", "Attestation oracle trust assumptions", "Upgrade path integrity"],
    icon: "file-search",
  },
];

export interface AuditFinding {
  severity: "critical" | "high" | "medium" | "low" | "info";
  title: string;
  file: string;
  line: number;
  description: string;
}

export const auditFindings: AuditFinding[] = [
  {
    severity: "critical",
    title: "Redemption queue allows NAV recalculation mid-settlement",
    file: "RedemptionManager.sol",
    line: 214,
    description:
      "settleRedemption() reads live NAV instead of the NAV snapshot at request time, enabling value extraction during high volatility windows.",
  },
  {
    severity: "high",
    title: "Custodian attestation has no staleness check",
    file: "AttestationOracle.sol",
    line: 88,
    description: "getLatestAttestation() does not revert on stale timestamps — a 30-day-old attestation is treated as current.",
  },
  {
    severity: "medium",
    title: "mint() lacks per-epoch supply cap tied to attested collateral",
    file: "RWAToken.sol",
    line: 142,
    description: "Owner can mint beyond the last attested collateral figure with no on-chain guard rail.",
  },
  {
    severity: "low",
    title: "Whitelist removal does not force-transfer or freeze existing balance",
    file: "ComplianceRegistry.sol",
    line: 61,
    description: "Removed addresses retain transfer ability until their next attempted transfer is checked.",
  },
];

export interface FeedEvent {
  time: string;
  asset: string;
  message: string;
  level: RiskLevel;
}

export const liveFeed: FeedEvent[] = [
  { time: "14:02:11", asset: "FeCT", message: "Mint tx exceeds attested reserve by 8.4% — auto-flagged", level: "critical" },
  { time: "14:01:47", asset: "SREF", message: "Oracle feed stale 6h 12m, deviation threshold breached", level: "high" },
  { time: "13:58:03", asset: "AUGT", message: "Blocked transfer from non-whitelisted address", level: "medium" },
  { time: "13:55:20", asset: "hPCP", message: "NAV drift vs. custodian attestation: 2.1%", level: "medium" },
  { time: "13:49:12", asset: "mTBL", message: "Daily attestation reconciled, 0.0% drift", level: "low" },
  { time: "13:44:58", asset: "LINV", message: "Redemption queue cleared, 0 pending", level: "low" },
];
