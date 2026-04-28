import { useEffect, useState } from "react";
import { ShieldCheck, Menu, X } from "lucide-react";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Detection", href: "#detection" },
  { label: "Why RWA", href: "#why-rwa" },
  { label: "Audit", href: "#audit" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "border-b border-void-700 bg-void-950/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal-500/10 ring-1 ring-signal-500/30">
            <ShieldCheck className="h-4 w-4 text-signal-400" strokeWidth={2.25} />
          </div>
          <span className="font-semibold tracking-tight text-white">Custos</span>
          <span className="ml-1 hidden rounded-full border border-void-600 px-2 py-0.5 font-mono text-[10px] text-white/40 sm:inline">
            RWA-NATIVE
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${active === l.href ? "text-signal-400" : "text-white/60 hover:text-white"}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="#" className="text-sm text-white/60 transition-colors hover:text-white">
            Sign in
          </a>
          <a
            href="#cta"
            className="rounded-lg bg-signal-500 px-4 py-2 text-sm font-medium text-void-950 transition-all hover:bg-signal-400 hover:shadow-glow-sm"
          >
            Request access
          </a>
        </div>

        <button className="text-white/70 md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-void-700 bg-void-950/95 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-white/70" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="#cta" className="rounded-lg bg-signal-500 px-4 py-2 text-center text-sm font-medium text-void-950">
              Request access
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
