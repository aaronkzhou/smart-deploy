import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section id="cta" className="relative mx-auto max-w-7xl px-6 py-28">
      <div className="relative overflow-hidden rounded-3xl border border-void-700 bg-gradient-to-b from-void-850 to-void-900 p-12 text-center sm:p-20">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-500/10 blur-[100px]" />
        <div className="relative">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Bring your RWA platform's risk surface into view.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/50">
            Get a pre-deployment audit and a live monitoring dashboard scoped to your asset class — treasuries, private
            credit, real estate, or commodities.
          </p>
          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="you@platform.io"
              className="w-full rounded-lg border border-void-600 bg-void-950/60 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-signal-500/50"
            />
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-signal-500 px-5 py-3 text-sm font-medium text-void-950 transition-all hover:bg-signal-400 hover:shadow-glow"
            >
              Request access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
          <p className="mt-4 text-xs text-white/30">No spam. We'll follow up to scope an audit for your contracts.</p>
        </div>
      </div>
    </section>
  );
}
