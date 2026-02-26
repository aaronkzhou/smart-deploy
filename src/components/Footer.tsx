import { ShieldCheck } from "lucide-react";

const columns = [
  {
    title: "Platform",
    links: ["Live monitoring", "Pre-deploy audit", "Detection library", "API & webhooks"],
  },
  {
    title: "Asset classes",
    links: ["Treasury bills", "Private credit", "Real estate", "Commodities", "Invoice financing"],
  },
  {
    title: "Company",
    links: ["About", "Security", "Docs", "Contact"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-void-800">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-signal-500/10 ring-1 ring-signal-500/30">
                <ShieldCheck className="h-3.5 w-3.5 text-signal-400" />
              </div>
              <span className="font-semibold text-white">Custos</span>
            </div>
            <p className="mt-3 max-w-[220px] text-sm text-white/40">
              Risk intelligence for tokenized real-world assets.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-medium text-white/70">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/40 transition-colors hover:text-white/70">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-void-800 pt-8 sm:flex-row">
          <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} Custos. All rights reserved.</p>
          <p className="text-xs text-white/30">Not investment advice. Audit results do not guarantee contract safety.</p>
        </div>
      </div>
    </footer>
  );
}
