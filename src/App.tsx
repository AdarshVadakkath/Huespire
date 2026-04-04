import MagicBento from "./components/MagicBento";
import TextSection from "./components/Textsection";
import Navbar from "./components/Navbar";

import bg from "./assets/bg.mp4";
import LaserFlow from "./components/LaserFlow";

export default function App() {
  // ─── BENTO Y-POSITION CONTROL ──────────────────────────────────────────────
  // Adjust this value (in pixels) to move the Bento section up or down
  // relative to the LaserFlow. Negative values move it UP (overlapping LaserFlow).
  // Example: -200 means Bento starts 200px above LaserFlow's natural position.
  const BENTO_Y_OFFSET = -480; // ← change this value to reposition
  // ────────────────────────────────────────────────────────────────────────────

  return (
    <div className="bg-black text-white overflow-x-hidden font-sans relative">
      <Navbar />

      <main className="relative w-full  space-y-80">
        {/* HERO */}
        <section className="relative w-full min-h-screen flex items-center justify-start px-8 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
          >
            <source src={bg} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/40 to-purple-900/30 z-0" />

          <div className="relative z-10 max-w-4xl w-full flex flex-col gap-16 text-left">
            <h1
              className="font-black leading-[0.85] tracking-tighter flex flex-col gap-2"
              style={{ fontSize: "clamp(5rem, 12vw, 10rem)" }}
            >
              <span>BUILD</span>
              <span>AUTOMATE</span>
              <span className="opacity-80">SCALE</span>
            </h1>

            <div className="flex flex-wrap gap-9 mt-4">
              <button className="h-14 text-white bg-cyan-500 hover:bg-cyan-400 font-bold rounded-full text-lg px-10">
                Book a Call
              </button>

              <button className="text-white border border-white/20 hover:bg-white/10 backdrop-blur-md font-bold rounded-full text-lg px-10 py-4">
                View Our Services
              </button>
            </div>
          </div>
        </section>
      </main>

      <TextSection />

      {/* ── STACKING LAYER: Bento sits above (in z-order) LaserFlow ── */}
      {/* Both are in a shared relative wrapper so they share the same flow */}
      <div className="relative">
        {/* LaserFlow — base layer, z-index 0 */}
        <div className="inset-0 z-0 pointer-events-none relative">
          {/* Top fade-in overlay */}
          <div
            className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            style={{
              height: "120px",
              background:
                "linear-gradient(to bottom, #000 0%, transparent 100%)",
            }}
          />
          <LaserFlow />
        </div>

        {/* ─── MagicBento Y-OFFSET LAYER ────────────────────────────────────
            - position: relative lets translateY shift it without breaking flow
            - translateY(BENTO_Y_OFFSET) nudges it up/down over LaserFlow
            - z-index: 10 ensures it renders on top of LaserFlow
            - Change BENTO_Y_OFFSET at the top of this file to reposition
        ──────────────────────────────────────────────────────────────────── */}
        <div
          className="relative z-10"
          style={{ transform: `translateY(${BENTO_Y_OFFSET}px)` }}
        >
          <MagicBento />
        </div>
      </div>
    </div>
  );
}
