import type { ReactNode } from "react";

export function GlowCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative rounded-2xl border border-void-700 bg-void-850/60 backdrop-blur-sm transition-colors hover:border-void-600 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      {children}
    </div>
  );
}
