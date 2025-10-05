import { motion } from "framer-motion";
import { liveFeed } from "../lib/data";
import { riskDot } from "../lib/risk";
import { Activity } from "lucide-react";

export function LiveFeedPanel() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-void-700 bg-void-900/80 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="flex items-center justify-between border-b border-void-700 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-signal-500 shadow-glow-sm animate-pulse-slow" />
          <span className="font-mono text-xs text-white/50">live-monitor.custos.io</span>
        </div>
        <Activity className="h-3.5 w-3.5 text-white/30" />
      </div>
      <div className="relative h-[340px] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-void-900 to-transparent z-10 pointer-events-none" />
        <div className="flex flex-col gap-px p-3">
          {[...liveFeed, ...liveFeed].map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.06, duration: 0.4 }}
              className="flex items-start gap-3 rounded-lg px-3 py-2.5 text-xs hover:bg-white/[0.02]"
            >
              <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${riskDot[event.level]}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-white/35">{event.time}</span>
                  <span className="font-mono font-medium text-white/70">{event.asset}</span>
                </div>
                <p className="mt-0.5 truncate text-white/50">{event.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-void-900 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
