import { useState } from "react";
import MagicBento from "./components/MagicBento";
import TextSection from "./components/Textsection";
import Navbar from "./components/Navbar";
import Client from "./components/Client";
import Intro from "./components/Intro";

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

  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}

      {introComplete && (
        <div className="app-enter bg-black text-white overflow-x-hidden font-sans relative">
          <Navbar />

          <main className="relative w-full  space-y-80">
            {/* HERO */}
            {/* HERO */}
            <section className="relative w-full min-h-screen flex items-center justify-start px-16 overflow-hidden bg-black">
              {/* VIDEO BACKGROUND */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
              >
                <source src={bg} type="video/mp4" />
              </video>

              {/* LEFT GRADIENT OVERLAY */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.5) 55%, transparent 80%)",
                }}
              />

              {/* BOTTOM FADE */}
              <div
                className="absolute bottom-0 left-0 w-full z-10 pointer-events-none"
                style={{
                  height: "200px",
                  background: "linear-gradient(to bottom, transparent, #000)",
                }}
              />

              {/* CONTENT */}
              <div className="relative z-20 max-w-xl flex flex-col">
                {/* Headline */}
                <h1
                  className="font-black leading-[1.0] tracking-wide text-white mb-3"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(3.2rem, 7vw, 5rem)",
                  }}
                >
                  EXPLORE THE EVENT
                  <br />
                  HORIZON OF CREATIVITY
                </h1>

                {/* Subtitle */}
                <p className="text-white/60 font-light text-[15px] tracking-wide mb-7">
                  The Next Era of Cinematic Generation. Realized.
                </p>

                {/* Icon row */}
                <div className="flex items-center gap-2 mb-8">
                  {/* Play */}
                  <button className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="white"
                    >
                      <polygon points="3,1 11,6 3,11" />
                    </svg>
                  </button>
                  {/* Wand */}
                  <button className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.3"
                    >
                      <line x1="2" y1="11" x2="10" y2="3" />
                      <line x1="8" y1="1" x2="10" y2="3" />
                      <line x1="10" y1="3" x2="12" y2="2" />
                    </svg>
                  </button>
                  {/* Loop */}
                  <button className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.3"
                    >
                      <path
                        d="M2 6.5 A4.5 4.5 0 1 1 6.5 11"
                        strokeLinecap="round"
                      />
                      <polyline
                        points="2,9 2,6.5 4.5,6.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <span className="text-white/40 text-xs ml-2">
                    Powered by RunwayML
                  </span>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-4 flex-wrap items-center">
                  {/* GLOWING BUTTON */}
                  <button
                    className="relative h-11 px-6 rounded-full text-white text-sm font-semibold tracking-wide flex items-center gap-2 transition-all duration-300 hover:scale-105"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.5)",
                      boxShadow:
                        "0 0 12px rgba(255,255,255,0.25), 0 0 30px rgba(255,255,255,0.1), inset 0 0 12px rgba(255,255,255,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(255,255,255,0.5), 0 0 50px rgba(255,255,255,0.2), inset 0 0 20px rgba(255,255,255,0.08)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.9)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 0 12px rgba(255,255,255,0.25), 0 0 30px rgba(255,255,255,0.1), inset 0 0 12px rgba(255,255,255,0.05)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.5)";
                    }}
                  >
                    TRY GEN-2 FOR FREE
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

                  {/* SECONDARY BUTTON */}
                  <button className="h-11 px-6 rounded-full border border-white/20 bg-transparent text-white text-sm font-medium tracking-wide hover:bg-white/10 transition-colors">
                    VIEW FEATURES
                  </button>
                </div>
              </div>

              {/* TRUST LINE */}
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
