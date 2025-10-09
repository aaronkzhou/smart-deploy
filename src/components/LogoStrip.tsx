const names = ["Meridian Trust", "Halcyon Capital", "Solstice Holdings", "Ferrum Group", "Ledgerline", "Aurelia Bullion"];

export function LogoStrip() {
  return (
    <section className="border-y border-void-800 bg-void-900/40">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-widest text-white/30">
          Monitoring tokenized assets custodied by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {names.map((n) => (
            <span key={n} className="text-sm font-medium text-white/25 transition-colors hover:text-white/50">
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
