import { useState } from "react";
import MagicBento from "./components/MagicBento";
import TextSection from "./components/Textsection";
import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";

import Intro from "./components/Intro";
import useLenis from "./hooks/useLenis";

import bg from "./assets/bg4.mp4";

import LaserFlow from "./components/LaserFlow";
import ScrollPinSection from "./components/Scrollpinsection";
import Testimonials from "./components/Testimonial";
import ProcessSection from "./components/ProcessSection";
import Footer from "./components/Footer";
import ServiceSection from "./components/ServiceSection";
import About from "./components/About";
import ContactSection from "./components/ContactSection";

export default function App() {
  const BENTO_Y_OFFSET = 0;
  const LASER_Y_OFFSET = 50;

  useLenis();

  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <Cursor />
      {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}

      {introComplete && (
        <div className="app-enter bg-black text-white overflow-x-hidden font-sans relative">
          <Navbar />

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bebas+Neue&display=swap');
            @keyframes badge-pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.6; transform: scale(0.85); }
            }
            @keyframes hero-fade-up {
              from { opacity: 0; transform: translateY(28px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes glow-breathe {
              0%, 100% { opacity: 0.25; transform: scale(1); }
              50% { opacity: 0.45; transform: scale(1.08); }
            }
            .hero-animate { animation: hero-fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both; }
            .hero-a1 { animation-delay: 0.05s; }
            .hero-a2 { animation-delay: 0.18s; }
            .hero-a3 { animation-delay: 0.32s; }
            .hero-a4 { animation-delay: 0.48s; }
            .hero-a5 { animation-delay: 0.62s; }
            .hero-cta-primary {
              background: rgba(255,255,255,0.10);
              border: 1px solid rgba(255,255,255,0.38);
              backdrop-filter: blur(12px);
              transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
            }
            .hero-cta-primary:hover {
              background: rgba(255,255,255,0.18);
              border-color: rgba(255,255,255,0.65);
              transform: translateY(-2px);
              box-shadow: 0 16px 48px rgba(255,255,255,0.12), 0 0 32px rgba(255,255,255,0.1);
            }
            .hero-cta-secondary {
              border: 1px solid rgba(255,255,255,0.18);
              background: transparent;
              transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
            }
            .hero-cta-secondary:hover {
              border-color: rgba(255,255,255,0.38);
              background: rgba(255,255,255,0.05);
              transform: translateY(-2px);
            }
            .hero-tool-pill {
              display: flex; align-items: center; gap: 7px;
              padding: 7px 14px 7px 10px;
              border-radius: 100px;
              border: 1px solid rgba(255,255,255,0.12);
              background: rgba(255,255,255,0.05);
              backdrop-filter: blur(8px);
              font-size: 12px; font-weight: 500;
              color: rgba(255,255,255,0.65);
              transition: all 0.25s ease;
              cursor: default;
            }
            .hero-tool-pill:hover {
              border-color: rgba(255,255,255,0.28);
              background: rgba(255,255,255,0.09);
              color: rgba(255,255,255,0.9);
            }
            .hero-divider { width: 1px; height: 16px; background: rgba(255,255,255,0.15); }
          `}</style>

          <main className="relative w-full space-y-80">
            {/* ─── HERO ─── */}
            <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-black">
              {/* ── VIDEO BG ── */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
                style={{ opacity: 0.85 }}
              >
                <source src={bg} type="video/mp4" />
              </video>

              {/* ── MULTI-LAYER GRADIENT ── */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: [
                    "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 38%, rgba(0,0,0,0.25) 65%, transparent 85%)",
                    "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 18%, transparent 40%)",
                    "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 15%)",
                  ].join(", "),
                }}
              />

              {/* ── AMBIENT GLOW ── */}
              <div
                className="absolute z-10 pointer-events-none"
                style={{
                  left: "30%",
                  top: "20%",
                  width: "600px",
                  height: "600px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
                  animation: "glow-breathe 6s ease-in-out infinite",
                }}
              />

              {/* ── CONTENT ── */}
              <div className="relative z-20 w-full px-10 md:px-20 flex flex-col max-w-[660px]">
                {/* Eyebrow badge */}
                <div
                  className="hero-animate hero-a1 flex items-center gap-2 mb-6"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "5px 13px 5px 8px",
                      borderRadius: "100px",
                      border: "1px solid rgba(255,255,255,0.18)",
                      background: "rgba(255,255,255,0.06)",
                      backdropFilter: "blur(12px)",
                      fontSize: "11px",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.7)",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#4DF0A0",
                        boxShadow: "0 0 8px #4DF0A0",
                        animation: "badge-pulse 2.2s ease-in-out infinite",
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    Now accepting new clients for Q2 2025
                  </span>
                </div>

                {/* Headline */}
                <h1
                  className="hero-animate hero-a2 font-black leading-[0.95] tracking-tight text-white mb-5"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(3.4rem, 7.5vw, 5.8rem)",
                  }}
                >
                  <span style={{ color: "#fff" }}>WHERE BRANDS</span>
                  <br />
                  <span
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.55) 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    BECOME LEGENDS.
                  </span>
                </h1>

                {/* Subtitle */}
                <p
                  className="hero-animate hero-a3 mb-8 leading-relaxed"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(14px, 1.1vw, 16px)",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.48)",
                    maxWidth: "420px",
                  }}
                >
                  We build high-performance brands that don't just look great —
                  they{" "}
                  <em
                    style={{
                      color: "rgba(255,255,255,0.72)",
                      fontStyle: "normal",
                    }}
                  >
                    convert, scale, and dominate
                  </em>{" "}
                  their market.
                </p>

                {/* Tool pills row */}
                <div
                  className="hero-animate hero-a4 flex flex-wrap items-center gap-2 mb-9"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {[
                    { icon: "✦", label: "Strategy" },
                    { icon: "◈", label: "Design" },
                    { icon: "⬡", label: "Automation" },
                    { icon: "▲", label: "Paid Ads" },
                  ].map((t) => (
                    <span key={t.label} className="hero-tool-pill">
                      <span style={{ fontSize: "10px", opacity: 0.7 }}>
                        {t.icon}
                      </span>
                      {t.label}
                    </span>
                  ))}
                </div>

                {/* CTA row */}
                <div
                  className="hero-animate hero-a5 flex flex-wrap gap-3 items-center mb-10"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <button className="hero-cta-primary h-[46px] px-7 rounded-full text-white text-[13px] font-semibold tracking-wide flex items-center gap-2">
                    Book a Free Strategy Call
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.8"
                    >
                      <line x1="1" y1="10" x2="10" y2="1" />
                      <polyline points="4,1 10,1 10,7" />
                    </svg>
                  </button>

                  <button className="hero-cta-secondary h-[46px] px-7 rounded-full text-white text-[13px] font-medium tracking-wide">
                    See Our Work
                  </button>
                </div>

                {/* Social proof */}
              </div>
            </section>
          </main>

          <TextSection />

          {/* ── STACKING LAYER ── */}
          <div className="relative">
            {/* LaserFlow — behind */}
            <div
              className="absolute left-0 right-0 z-10 pointer-events-none"
              style={{ top: `${LASER_Y_OFFSET}px` }}
            >
              {/* top fade */}
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

            {/* MagicBento — front */}
            <div
              className="relative z-20"
              style={{ transform: `translateY(${BENTO_Y_OFFSET}px)` }}
            >
              <MagicBento />
            </div>
          </div>

          <ScrollPinSection />
          <ServiceSection />
          <Testimonials />
          <ProcessSection />
          <About />
          <ContactSection />
          <Footer />
        </div>
      )}
    </>
  );
}
