import type { RiskLevel } from "./data";

export const riskColor: Record<RiskLevel, string> = {
  low: "#4dd4a8",
  medium: "#e8b84b",
  high: "#e8763f",
  critical: "#e14a4a",
};

export const riskText: Record<RiskLevel, string> = {
  low: "text-risk-low",
  medium: "text-risk-medium",
  high: "text-risk-high",
  critical: "text-risk-critical",
};

export const riskBg: Record<RiskLevel, string> = {
  low: "bg-risk-low/10",
  medium: "bg-risk-medium/10",
  high: "bg-risk-high/10",
  critical: "bg-risk-critical/10",
};

export const riskBorder: Record<RiskLevel, string> = {
  low: "border-risk-low/30",
  medium: "border-risk-medium/30",
  high: "border-risk-high/30",
  critical: "border-risk-critical/30",
};

export const riskDot: Record<RiskLevel, string> = {
  low: "bg-risk-low",
  medium: "bg-risk-medium",
  high: "bg-risk-high",
  critical: "bg-risk-critical",
};

export const riskLabel: Record<RiskLevel, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};
