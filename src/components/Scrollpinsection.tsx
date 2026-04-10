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
    tag: "Analytics",
    accent: "rgba(99,179,237,0.18)",
    accentLine: "linear-gradient(90deg, #63b3ed, #9f7aea)",
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
    tag: "Strategy",
    accent: "rgba(154,230,180,0.15)",
    accentLine: "linear-gradient(90deg, #9ae6b4, #63b3ed)",
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
    tag: "Creative",
    accent: "rgba(252,176,176,0.13)",
    accentLine: "linear-gradient(90deg, #fc90b0, #f6ad55)",
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
    tag: "Performance",
    accent: "rgba(246,173,85,0.14)",
    accentLine: "linear-gradient(90deg, #f6ad55, #fc90b0)",
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

const LEFT_BULLETS = [
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
];

const STATS = [
  { value: "40+", label: "Brands" },
  { value: "3×", label: "Avg. ROI" },
  { value: "12", label: "Industries" },
];

export default function ScrollPinSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const bigNumRef = useRef<HTMLDivElement>(null);

  const levelFillRef = useRef<HTMLDivElement>(null);
  const levelGlowRef = useRef<HTMLDivElement>(null);
  const levelTickRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const animatingRef = useRef(false);
  const entryGraceRef = useRef(false);

  /* ─── Lenis ─── */
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

  /* ─── Level bar + big number ─── */
  const animateLevelBar = useCallback((progress: number, nextIdx: number) => {
    if (!levelFillRef.current || !levelGlowRef.current) return;
    const pct = `${progress * 100}%`;
    gsap.to(levelFillRef.current, {
      height: pct,
      duration: 0.55,
      ease: "power3.out",
    });
    gsap.to(levelGlowRef.current, {
      top: pct,
      duration: 0.55,
      ease: "power3.out",
    });
    gsap.fromTo(
      levelGlowRef.current,
      { scale: 1.8, opacity: 1 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" },
    );

    // Highlight active tick
    levelTickRefs.current.forEach((t, i) => {
      if (!t) return;
      gsap.to(t, { opacity: i === nextIdx ? 1 : 0.25, duration: 0.3 });
    });

    // Big background number
    if (bigNumRef.current) {
      gsap.to(bigNumRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (bigNumRef.current) {
            bigNumRef.current.textContent = `0${nextIdx + 1}`;
            gsap.fromTo(
              bigNumRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
            );
          }
        },
      });
    }
  }, []);

  /* ─── goTo ─── */
  const goTo = useCallback(
    (idx: number) => {
      if (animatingRef.current) return;
      const next = ((idx % items.length) + items.length) % items.length;
      if (next === currentRef.current) return;
      animatingRef.current = true;
      const prev = currentRef.current;
      const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];

      const tl = gsap.timeline({
        onComplete: () => {
          currentRef.current = next;
          setCurrent(next);
          setTimeout(() => {
            animatingRef.current = false;
          }, 120);
        },
      });

      tl.to(slides[prev], {
        opacity: 0,
        y: -24,
        duration: 0.35,
        ease: "power2.inOut",
      });
      tl.add(() => animateLevelBar((next + 1) / items.length, next));
      tl.fromTo(
        slides[next],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.48, ease: "power3.out" },
        "<0.05",
      );
    },
    [animateLevelBar],
  );

  /* ─── ScrollTrigger pin ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
      if (!slides.length) return;
      gsap.set(slides[0], { opacity: 1, y: 0 });
      slides.slice(1).forEach((s) => gsap.set(s, { opacity: 0, y: 28 }));
      if (levelFillRef.current)
        gsap.set(levelFillRef.current, {
          height: `${(1 / items.length) * 100}%`,
        });

      // Init tick highlights
      levelTickRefs.current.forEach((t, i) => {
        if (!t) return;
        gsap.set(t, { opacity: i === 0 ? 1 : 0.25 });
      });

      ScrollTrigger.create({
        trigger: ".pin-section",
        start: "top top",
        end: `+=${items.length * 100}%`,
        pin: true,
        anticipatePin: 1,
        onEnter: () => {
          entryGraceRef.current = true;
          setTimeout(() => {
            entryGraceRef.current = false;
          }, 800);
        },
        onEnterBack: () => {
          entryGraceRef.current = true;
          setTimeout(() => {
            entryGraceRef.current = false;
          }, 800);
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  /* ─── Wheel snap ─── */
  useEffect(() => {
    let cooldown = false;
    const onWheel = (e: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (!(rect.top <= 1 && rect.bottom >= window.innerHeight - 1)) return;
      e.preventDefault();
      e.stopPropagation();
      if (entryGraceRef.current || cooldown || animatingRef.current) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = currentRef.current + dir;
      if (next < 0 || next >= items.length) {
        cooldown = true;
        setTimeout(() => {
          cooldown = false;
        }, 700);
        return;
      }
      cooldown = true;
      setTimeout(() => {
        cooldown = false;
      }, 650);
      goTo(next);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goTo]);

  /* ─── Keyboard ─── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        const n = currentRef.current + 1;
        if (n < items.length) goTo(n);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        const n = currentRef.current - 1;
        if (n >= 0) goTo(n);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goTo]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

        .sp-wrap { font-family: 'Inter', sans-serif; }

        /* ── NOISE OVERLAY ── */
        .sp-noise {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 1; opacity: 0.4;
        }

        /* ── LEVEL BAR ── */
        .sp-track {
          position: absolute; left: 50%;
          top: 14%; bottom: 8%;
          transform: translateX(-50%);
          width: 1px;
          background: rgba(255,255,255,0.06);
          display: none; z-index: 10;
        }
        @media (min-width: 1024px) { .sp-track { display: block; } }

        .sp-fill {
          position: absolute; top: 0; left: 0; width: 100%;
          background: linear-gradient(to bottom, rgba(255,255,255,0.85), rgba(255,255,255,0.15));
          border-radius: 1px;
        }
        .sp-glow {
          position: absolute; left: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 8px; height: 8px; border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(255,255,255,0.12), 0 0 16px 4px rgba(255,255,255,0.4), 0 0 32px 10px rgba(255,255,255,0.1);
        }
        .sp-tick {
          position: absolute; left: 50%;
          transform: translateX(-50%);
          width: 4px; height: 1px;
          background: rgba(255,255,255,0.35);
          transition: all 0.3s;
        }
        .sp-tick-label {
          position: absolute; right: 9px;
          font-size: 8px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          transform: translateY(50%); white-space: nowrap;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s;
          text-align: right;
        }

        /* ── LEFT ── */
        .sp-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 14px 5px 8px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px;
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          width: fit-content;
          background: rgba(255,255,255,0.03);
        }
        .sp-left-h {
          font-size: clamp(2.4rem, 3.6vw, 4rem);
          font-weight: 800; line-height: 1.02;
          letter-spacing: -0.03em; color: #fff; margin: 0;
        }
        .sp-left-desc {
          font-size: 14px; line-height: 1.85;
          color: rgba(255,255,255,0.38);
          font-weight: 300; margin: 0;
        }
        .sp-stat-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          border: 1px solid rgba(255,255,255,0.07);
          
          background: rgba(255,255,255,0.07);
        }
        .sp-stat-cell {
          background: rgba(255,255,255,0.02);
          padding: 14px 16px;
          display: flex; flex-direction: column; align-items: flex-start; gap: 2px;
        }
        .sp-stat-val { font-size: 20px; font-weight: 700; color: #fff; letter-spacing: -0.03em; }
        .sp-stat-lbl { font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.3); letter-spacing: 0.08em; text-transform: uppercase; }

        .sp-bullet-row {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 14px 0;
        }
        .sp-bullet-row + .sp-bullet-row { border-top: 1px solid rgba(255,255,255,0.05); }
        .sp-bullet-idx {
          flex-shrink: 0; width: 22px; height: 22px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          display: flex; align-items: center; justify-content: center;
          font-size: 8px; font-weight: 700;
          color: rgba(255,255,255,0.3); letter-spacing: 0.05em;
          margin-top: 1px;
        }

        /* ── RIGHT CARD ── */
        .sp-card {
          position: absolute; inset: 0;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(12,12,12,0.8);
          backdrop-filter: blur(16px);
          display: flex; flex-direction: column; justify-content: space-between;
          overflow: hidden;
        }
        .sp-card-accent-bar {
          position: absolute; top: 0; left: 0; right: 0;
          height: 1px;
        }
        .sp-card-glow {
          position: absolute; top: -80px; right: -80px;
          width: 280px; height: 280px; border-radius: 50%;
          pointer-events: none; opacity: 0.35;
          filter: blur(60px);
        }
        .sp-card-inner { padding: 2.4rem 2.6rem; position: relative; z-index: 1; }
        .sp-card-footer { padding: 0 2.6rem 2.4rem; position: relative; z-index: 1; }

        .sp-card-hd {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .sp-card-num-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.16em; color: rgba(255,255,255,0.25);
          text-transform: uppercase;
        }
        .sp-card-num-badge::before {
          content: ''; width: 20px; height: 1px;
          background: rgba(255,255,255,0.18); display: block;
        }
        .sp-card-tag-pill {
          padding: 4px 11px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .sp-card-title {
          font-size: clamp(1.45rem, 2.2vw, 2.2rem);
          font-weight: 700; line-height: 1.2;
          color: #fff; margin: 0 0 0.9rem;
          letter-spacing: -0.025em;
        }
        .sp-card-desc {
          font-size: 13.5px; line-height: 1.85;
          color: rgba(255,255,255,0.4); margin: 0; font-weight: 300;
        }
        .sp-card-divider {
          height: 1px; background: rgba(255,255,255,0.06);
          margin: 0 2.6rem;
        }
        .sp-b-row {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 13px 0;
        }
        .sp-b-row + .sp-b-row { border-top: 1px solid rgba(255,255,255,0.05); }
        .sp-b-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255,255,255,0.45); flex-shrink: 0; margin-top: 7px;
        }
        .sp-b-title { font-size: 13px; font-weight: 600; color: #fff; }
        .sp-b-desc { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.38); line-height: 1.65; margin: 3px 0 0; }

        /* ── DOTS ── */
        .sp-seg {
          height: 2px; border-radius: 2px; border: none; padding: 0; cursor: pointer;
          background: rgba(255,255,255,0.1);
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .sp-seg.active { background: #fff; }
      `}</style>

      <div ref={containerRef} className="bg-black sp-wrap">
        <section
          ref={sectionRef}
          className="pin-section relative w-full h-screen bg-black flex flex-col justify-center overflow-hidden"
        >
          {/* Noise */}
          <div className="sp-noise" />

          {/* ── LEVEL BAR ── */}
          <div className="sp-track">
            {items.map((_, i) => {
              const topPct = `${((i + 1) / items.length) * 100}%`;
              return (
                <div
                  key={i}
                  className="sp-tick"
                  ref={(el) => {
                    levelTickRefs.current[i] = el;
                  }}
                  style={{ top: topPct }}
                >
                  <span className="sp-tick-label">0{i + 1}</span>
                </div>
              );
            })}
            <div className="sp-fill" ref={levelFillRef} />
            <div
              className="sp-glow"
              ref={levelGlowRef}
              style={{ top: `${(1 / items.length) * 100}%` }}
            />
          </div>

          {/* ── LAYOUT ── */}
          <div
            className="relative z-10 w-full mx-auto flex items-center"
            style={{ maxWidth: "1340px", padding: "0 4.5rem", gap: "6rem" }}
          >
            {/* ════ LEFT — static ════ */}
            <div
              className="hidden md:flex flex-col"
              style={{
                flex: "0 0 43%",
                minWidth: 0,
                gap: "1.8rem",
                position: "relative",
              }}
            >
              {/* Giant faded background number */}
              <div
                ref={bigNumRef}
                style={{
                  position: "absolute",
                  right: "-20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "clamp(12rem, 16vw, 18rem)",
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.025)",
                  letterSpacing: "-0.06em",
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              >
                01
              </div>

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.8rem",
                }}
              >
                {/* Eyebrow */}
                <span className="sp-eyebrow">
                  <span
                    style={{
                      width: 6,
                      height: 6,

                      background: "rgba(255,255,255,0.4)",
                      flexShrink: 0,
                    }}
                  />
                  Why we&apos;re different
                </span>

                {/* Heading */}
                <h2 className="sp-left-h">
                  Why we&apos;re
                  <br />
                  <span
                    style={{
                      backgroundImage:
                        "linear-gradient(120deg, #fff 0%, rgba(255,255,255,0.38) 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    different.
                  </span>
                </h2>

                {/* Description */}
                <p className="sp-left-desc">
                  We don't just make things look good; we make them perform.
                  Bridging the gap between high-end design and hard-hitting
                  performance marketing.
                </p>

                {/* Stats */}
                <div className="sp-stat-grid">
                  {STATS.map((s) => (
                    <div key={s.label} className="sp-stat-cell">
                      <span className="sp-stat-val">{s.value}</span>
                      <span className="sp-stat-lbl">{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Bullets */}
                <div>
                  {LEFT_BULLETS.map((b, i) => (
                    <div key={i} className="sp-bullet-row">
                      <div className="sp-bullet-idx">0{i + 1}</div>
                      <div>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#fff",
                            margin: "0 0 3px",
                          }}
                        >
                          {b.title}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.35)",
                            lineHeight: 1.65,
                            margin: 0,
                            fontWeight: 300,
                          }}
                        >
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ════ RIGHT CARDS ════ */}
            <div style={{ flex: "0 0 50%", minWidth: 0 }}>
              <div style={{ position: "relative", height: "510px" }}>
                {items.map((itm, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      slidesRef.current[i] = el;
                    }}
                    className="sp-card"
                  >
                    {/* Ambient glow */}
                    <div
                      className="sp-card-glow"
                      style={{ background: itm.accent }}
                    />

                    {/* Top content */}
                    <div className="sp-card-inner">
                      <div className="sp-card-hd">
                        <span className="sp-card-num-badge">0{i + 1}</span>
                        <span className="sp-card-tag-pill">{itm.tag}</span>
                      </div>
                      <h3 className="sp-card-title">{itm.title}</h3>
                      <p className="sp-card-desc">{itm.description}</p>
                    </div>

                    <div className="sp-card-divider" />

                    {/* Bullets */}
                    <div className="sp-card-footer">
                      {itm.bullets.map((b, j) => (
                        <div key={j} className="sp-b-row">
                          <div className="sp-b-dot" />
                          <div>
                            <p className="sp-b-title">{b.title}</p>
                            <p className="sp-b-desc">{b.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bar + counter */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "1.5rem",
                }}
              >
                {items.map((_, i) => (
                  <button
                    key={i}
                    className={`sp-seg${i === current ? " active" : ""}`}
                    style={{ width: i === current ? "36px" : "14px" }}
                    onClick={() => goTo(i)}
                  />
                ))}
                <span
                  style={{
                    marginLeft: "8px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.22)",
                    letterSpacing: "0.08em",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {String(current + 1).padStart(2, "0")}{" "}
                  <span style={{ color: "rgba(255,255,255,0.1)" }}>/</span>{" "}
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
