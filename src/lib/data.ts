export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface MonitoredAsset {
  id: string;
  name: string;
  symbol: string;
  category: "Treasury Bills" | "Private Credit" | "Real Estate" | "Commodities" | "Invoice Financing";
  custodian: string;
  chain: string;
  tvl: string;
  riskScore: number;
  riskLevel: RiskLevel;
  trend: number[];
  flags: string[];
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
  },
];
