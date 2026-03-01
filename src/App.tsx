import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { LogoStrip } from "./components/LogoStrip";
import { LiveMonitor } from "./components/LiveMonitor";
import { DetectionGrid } from "./components/DetectionGrid";
import { Comparison } from "./components/Comparison";
import { AuditReport } from "./components/AuditReport";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-void-950">
      <Nav />
      <main>
        <Hero />
        <LogoStrip />
        <LiveMonitor />
        <DetectionGrid />
        <Comparison />
        <AuditReport />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
