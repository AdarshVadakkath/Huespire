import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    title: "Data backing every creative decision.",
    description:
      "We don't just make things look good; we make them perform. Our agency bridges the gap between high-end design and hard-hitting performance marketing.",
    bullets: [
      {
        title: "Transparent Reporting",
        desc: "Live dashboards so you always know your ROI.",
      },
      {
        title: "Conversion-Focused Approach",
        desc: "Every pixel is placed with conversion in mind.",
      },
      {
        title: "Dedicated Growth Team",
        desc: "Direct access to experts, no account manager buffers.",
      },
    ],
  },
  {
    title: "Strategy that scales with you.",
    description:
      "Whether you're a startup or an enterprise, our strategies are built to evolve with your business and deliver compounding returns over time.",
    bullets: [
      {
        title: "Scalable Systems",
        desc: "Infrastructure built for growth from day one.",
      },
      {
        title: "Market Intelligence",
        desc: "Real-time data informs every strategic pivot.",
      },
      { title: "Agile Execution", desc: "Fast iterations, faster results." },
    ],
  },
  {
    title: "Creative that converts.",
    description:
      "Stunning visuals paired with persuasive copy — we craft brand stories that turn prospects into loyal customers.",
    bullets: [
      {
        title: "Brand Identity",
        desc: "Distinctive aesthetics built for recognition.",
      },
      { title: "Copywriting", desc: "Words engineered to drive action." },
      {
        title: "Motion Design",
        desc: "Animation that elevates every touchpoint.",
      },
    ],
  },
  {
    title: "Results you can measure.",
    description:
      "Every campaign we run is tracked, tested, and optimised. We obsess over the numbers so you can focus on growing your business.",
    bullets: [
      {
        title: "A/B Testing",
        desc: "Continuous experimentation for peak performance.",
      },
      {
        title: "Attribution Modelling",
        desc: "Know exactly what's driving your revenue.",
      },
      {
        title: "Monthly Reviews",
        desc: "Full transparency on every metric that matters.",
      },
    ],
  },
];

// Static left panel content — fixed, never changes
const LEFT_STATIC = {
  title: "Why we're different.",
  description:
    "We don't just make things look good; we make them perform. Our agency bridges the gap between high-end design and hard-hitting performance marketing.",
  bullets: [
    {
      title: "Transparent Reporting",
      desc: "Live dashboards so you always know your ROI.",
    },
    {
      title: "Conversion-Focused Approach",
      desc: "Every pixel is placed with conversion in mind.",
    },
    {
      title: "Dedicated Growth Team",
      desc: "Direct access to experts, no account manager buffers.",
    },
  ],
};

export default function ScrollPinSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const accentLineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const levelTrackRef = useRef<HTMLDivElement>(null);
  const levelFillRef = useRef<HTMLDivElement>(null);
  const levelGlowRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  /* ─── Lenis smooth scroll ─── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  /* ─── animate level bar ─── */
  const animateLevelBar = useCallback((progress: number) => {
    if (!levelFillRef.current || !levelGlowRef.current) return;
    const pct = `${progress * 100}%`;

    gsap.to(levelFillRef.current, {
      height: pct,
      duration: 0.6,
      ease: "power3.out",
    });
    gsap.to(levelGlowRef.current, {
      top: pct,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.fromTo(
      levelGlowRef.current,
      { opacity: 1, scale: 1.5 },
      { opacity: 0.6, scale: 1, duration: 0.7, ease: "power3.out" },
    );
  }, []);

  // goTo only animates RIGHT cards — left panel is untouched
  const goTo = useCallback(
    (idx: number) => {
      if (animating) return;
      const next = ((idx % items.length) + items.length) % items.length;
      if (next === current) return;

      setAnimating(true);
      const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
      const tl = gsap.timeline({
        onComplete: () => {
          setCurrent(next);
          setAnimating(false);
        },
      });

      // Only animate RIGHT cards — no left panel animation at all
      tl.to(slides[current], {
        opacity: 0,
        y: -14,
        duration: 0.4,
        ease: "power2.inOut",
      });

      tl.add(() => {
        animateLevelBar((next + 1) / items.length);
      });

      tl.fromTo(
        slides[next],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "<",
      );

      if (accentLineRefs.current[next]) {
        tl.fromTo(
          accentLineRefs.current[next],
          { width: 0 },
          { width: 60, duration: 0.5, ease: "power3.out" },
          "<0.1",
        );
      }
    },
    [current, animating, animateLevelBar],
  );

  /* ─── GSAP ScrollTrigger pin ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
      if (!slides.length) return;

      slides.forEach((s) => {
        s.style.willChange = "opacity, transform";
      });

      gsap.set(slides[0], { opacity: 1, y: 0 });
      slides.slice(1).forEach((s) => gsap.set(s, { opacity: 0, y: 18 }));

      if (accentLineRefs.current[0]) {
        gsap.set(accentLineRefs.current[0], { width: 60 });
      }

      if (levelFillRef.current) {
        gsap.set(levelFillRef.current, {
          height: `${(1 / items.length) * 100}%`,
        });
      }

      let lastIdx = 0;

      // Only right-card slides animate — left panel is NOT touched here
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".pin-section",
          start: "top top",
          end: "+=" + items.length * 100 + "%",
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const idx = Math.min(
              Math.floor(self.progress * items.length),
              items.length - 1,
            );
            if (idx !== lastIdx) {
              lastIdx = idx;
              setCurrent(idx); // only drives dots + level bar
              animateLevelBar((idx + 1) / items.length);
            }
          },
        },
      });

      slides.forEach((slide, i) => {
        if (i === 0) return;
        tl.to(slides[i - 1], {
          opacity: 0,
          y: -14,
          duration: 0.35,
          ease: "power2.inOut",
        }).to(
          slide,
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
          "<0.05",
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ─── Keyboard nav ─── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(current + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(current - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');

        .level-track {
          position: absolute;
          left: 50%;
          top: 5%;
          bottom: 5%;
          transform: translateX(-50%);
          width: 2px;
          background: rgba(255,255,255,0.07);
          border-radius: 2px;
          overflow: visible;
          display: none;
        }
        @media (min-width: 1024px) {
          .level-track { display: block; }
        }

        .level-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.15));
          border-radius: 2px;
        }

        .level-glow {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 10px 3px rgba(255,255,255,0.55),
                      0 0 22px 6px rgba(255,255,255,0.2);
        }

        .level-tick {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 1px;
          background: rgba(255,255,255,0.18);
        }

        .level-label {
          position: absolute;
          left: 12px;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          transform: translateY(50%);
          white-space: nowrap;
        }

        .right-card {
          padding: 2.5rem 2.5rem 2rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 4px;
        }
      `}</style>

      <div
        ref={containerRef}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        className="bg-black"
      >
        <section className="pin-section relative w-full h-screen bg-black flex flex-col justify-center overflow-hidden">
          {/* ── LEVEL BAR ── */}
          <div className="level-track" ref={levelTrackRef}>
            {items.map((_, i) => {
              const topPct = `${(i / (items.length - 1)) * 100}%`;
              return (
                <div key={i} className="level-tick" style={{ top: topPct }}>
                  <span className="level-label">0{i + 1}</span>
                </div>
              );
            })}
            <div className="level-fill" ref={levelFillRef} />
            <div
              className="level-glow"
              ref={levelGlowRef}
              style={{ top: `${(1 / items.length) * 100}%` }}
            />
          </div>

          {/* ── MAIN LAYOUT ── */}
          <div
            className="w-full mx-auto flex items-start"
            style={{
              maxWidth: "1280px",
              padding: "0 3rem",
              gap: "5rem",
            }}
          >
            {/* ── LEFT PANEL — static, never changes ── */}
            <div
              className="hidden md:flex flex-col space-y-8"
              style={{ flex: "0 0 45%", minWidth: 0, paddingTop: "2.5rem" }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "5px 12px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.38)",
                  borderRadius: "2px",
                  width: "fit-content",
                }}
              >
                Why we&apos;re different
              </span>

              <h1
                style={{
                  fontSize: "clamp(2rem, 3.2vw, 3.6rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "#fff",
                  margin: 0,
                }}
              >
                {LEFT_STATIC.title}
              </h1>

              <p
                style={{
                  fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)",
                  lineHeight: 1.85,
                  color: "rgba(255,255,255,0.55)",
                  margin: 0,
                }}
              >
                {LEFT_STATIC.description}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {LEFT_STATIC.bullets.map((b, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: "22px",
                        height: "22px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "9px",
                        color: "rgba(255,255,255,0.38)",
                        borderRadius: "2px",
                        marginTop: "2px",
                      }}
                    >
                      0{i + 1}
                    </div>
                    <div>
                      <h4
                        style={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "#fff",
                          margin: "0 0 3px",
                        }}
                      >
                        {b.title}
                      </h4>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.42)",
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {b.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT CARDS — 50% — animates on scroll ── */}
            <div style={{ flex: "0 0 50%", minWidth: 0 }}>
              <div style={{ position: "relative", height: "580px" }}>
                {items.map((itm, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      slidesRef.current[i] = el;
                    }}
                    className="right-card"
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Card top */}
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.3)",
                          marginBottom: "1.5rem",
                        }}
                      >
                        0{i + 1}
                      </div>

                      <h2
                        style={{
                          fontSize: "clamp(1.5rem, 2.2vw, 2.4rem)",
                          fontWeight: 700,
                          lineHeight: 1.2,
                          color: "#fff",
                          marginBottom: "1.25rem",
                        }}
                      >
                        {itm.title}
                      </h2>

                      <p
                        style={{
                          fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
                          lineHeight: 1.9,
                          color: "rgba(255,255,255,0.48)",
                          margin: 0,
                        }}
                      >
                        {itm.description}
                      </p>
                    </div>

                    {/* Bullets */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        marginTop: "2rem",
                      }}
                    >
                      {itm.bullets.map((b, j) => (
                        <div
                          key={j}
                          style={{
                            display: "flex",
                            gap: "1rem",
                            alignItems: "flex-start",
                            paddingTop: "1.1rem",
                            borderTop: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          <div
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: "#fff",
                              flexShrink: 0,
                              marginTop: "6px",
                            }}
                          />
                          <div>
                            <span
                              style={{
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#fff",
                              }}
                            >
                              {b.title}
                            </span>
                            <p
                              style={{
                                fontSize: "13px",
                                color: "rgba(255,255,255,0.42)",
                                lineHeight: 1.7,
                                margin: "3px 0 0",
                              }}
                            >
                              {b.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* ── DOTS ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "2rem",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  {items.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      style={{
                        height: "2px",
                        width: i === current ? "36px" : "16px",
                        background:
                          i === current ? "#fff" : "rgba(255,255,255,0.15)",
                        borderRadius: "1px",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.35s ease",
                        padding: 0,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
