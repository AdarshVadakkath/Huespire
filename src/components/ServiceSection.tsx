import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const SLIDES = [
  {
    label: "Performance",
    num: "01",
    title: "Data backing every",
    titleEm: "creative decision.",
    stats: [
      { val: "3.2×", unit: "Avg ROAS", desc: "Return on ad spend" },
      { val: "94%", unit: "Retention", desc: "Year-over-year" },
    ],
    cards: [
      {
        num: "04",
        title: "Transparent reporting",
        desc: "Live dashboards so you always know where your budget goes.",
      },
      {
        num: "05",
        title: "Conversion focus",
        desc: "Every pixel placed with one goal in mind.",
      },
      {
        num: "06",
        title: "Direct access",
        desc: "No account manager layers between you and results.",
      },
    ],
    nodeLabel: "ROI",
    left: [
      {
        type: "stat" as const,
        val: "$12M+",
        unit: "Revenue Driven",
        detail: "Across all active client accounts in 2024 alone.",
      },
      {
        type: "stat" as const,
        val: "48hr",
        unit: "Avg. Onboarding",
        detail: "From signed contract to live campaign in two days.",
      },
      {
        type: "tag" as const,
        content: "Verified performance figures from client audits.",
      },
    ],
    right: [
      {
        type: "metric" as const,
        val: "↑ 218%",
        label: "Pipeline growth",
        detail: "Median increase across B2B clients Q1–Q4.",
      },
      {
        type: "quote" as const,
        text: "The results speak for themselves. No fluff, just numbers.",
      },
      {
        type: "metric" as const,
        val: "22 days",
        label: "Avg. payback period",
        detail: "From first spend to recovered investment.",
      },
    ],
  },
  {
    label: "Strategy",
    num: "02",
    title: "Strategy that",
    titleEm: "scales with you.",
    stats: [
      { val: "140+", unit: "Clients Scaled", desc: "Across 20 industries" },
      { val: "12yr", unit: "Experience", desc: "Building scalable systems" },
    ],
    cards: [
      {
        num: "04",
        title: "Scalable systems",
        desc: "Infrastructure built for growth from day one.",
      },
      {
        num: "05",
        title: "Market intelligence",
        desc: "Real-time data informs every strategic pivot.",
      },
      {
        num: "06",
        title: "Agile execution",
        desc: "Fast iterations deliver compounding results.",
      },
    ],
    nodeLabel: "GROW",
    left: [
      {
        type: "stat" as const,
        val: "6wk",
        unit: "Strategy Sprint",
        detail: "Full go-to-market plan delivered in six weeks.",
      },
      {
        type: "stat" as const,
        val: "3.8×",
        unit: "LTV Growth",
        detail: "Average customer lifetime value uplift.",
      },
      {
        type: "tag" as const,
        content: "Strategy underpins every execution decision we make.",
      },
    ],
    right: [
      {
        type: "metric" as const,
        val: "20+",
        label: "Industries served",
        detail: "SaaS, e-com, fintech, health, and more.",
      },
      {
        type: "quote" as const,
        text: "Strategy without execution is hallucination. We do both.",
      },
      {
        type: "metric" as const,
        val: "91%",
        label: "Goal attainment",
        detail: "Of quarterly KPIs met or exceeded.",
      },
    ],
  },
  {
    label: "Creative",
    num: "03",
    title: "Creative that",
    titleEm: "truly converts.",
    stats: [
      { val: "500+", unit: "Campaigns", desc: "Launched and optimised" },
      { val: "4.8★", unit: "Client rating", desc: "Consistently top-rated" },
    ],
    cards: [
      {
        num: "03",
        title: "Brand identity",
        desc: "Distinctive aesthetics built for lasting recognition.",
      },
      {
        num: "05",
        title: "Copywriting",
        desc: "Words engineered to drive real action.",
      },
      {
        num: "06",
        title: "Motion design",
        desc: "Animation that elevates every brand touchpoint.",
      },
    ],
    nodeLabel: "ART",
    left: [
      {
        type: "stat" as const,
        val: "72hr",
        unit: "Creative Turnaround",
        detail: "Full ad suite delivered in three business days.",
      },
      {
        type: "stat" as const,
        val: "×4.1",
        unit: "CTR Lift",
        detail: "vs. client's previous creative baseline.",
      },
      {
        type: "tag" as const,
        content: "Award-shortlisted work across three consecutive years.",
      },
    ],
    right: [
      {
        type: "metric" as const,
        val: "A/B+",
        label: "Every asset tested",
        detail: "Minimum two creative variants per campaign.",
      },
      {
        type: "quote" as const,
        text: "Beauty that doesn't convert is just expensive decoration.",
      },
      {
        type: "metric" as const,
        val: "98%",
        label: "On-brand delivery",
        detail: "Brand guideline adherence across all outputs.",
      },
    ],
  },
  {
    label: "Analytics",
    num: "04",
    title: "Results you",
    titleEm: "can measure.",
    stats: [
      { val: "2.1B", unit: "Impressions", desc: "Delivered last year" },
      { val: "0 BS", unit: "Guaranteed", desc: "Pure performance only" },
    ],
    cards: [
      {
        num: "01",
        title: "A/B testing",
        desc: "Continuous experimentation for peak performance.",
      },
      {
        num: "02",
        title: "Attribution model",
        desc: "Know exactly what revenue every channel drives.",
      },
      {
        num: "04",
        title: "Monthly reviews",
        desc: "Full transparency on every metric that matters.",
      },
    ],
    nodeLabel: "DATA",
    left: [
      {
        type: "stat" as const,
        val: "100%",
        unit: "Data Ownership",
        detail: "You own your data. Always. No exceptions.",
      },
      {
        type: "stat" as const,
        val: "< 1h",
        unit: "Report Latency",
        detail: "Dashboards refresh within the hour.",
      },
      {
        type: "tag" as const,
        content: "Integrated with GA4, Segment, Snowflake, and more.",
      },
    ],
    right: [
      {
        type: "metric" as const,
        val: "14+",
        label: "Data sources unified",
        detail: "Single source of truth across your stack.",
      },
      {
        type: "quote" as const,
        text: "If you can't measure it, you can't improve it. We measure everything.",
      },
      {
        type: "metric" as const,
        val: "Real-time",
        label: "Dashboard updates",
        detail: "No waiting for Monday morning reports.",
      },
    ],
  },
] as const;

const N = SLIDES.length;

// ─────────────────────────────────────────────────────────────────────────────
// TINY PRESENTATIONAL SUB-COMPONENTS (pure, no hooks, no gsap)
// ─────────────────────────────────────────────────────────────────────────────

type StatItem = { type: "stat"; val: string; unit: string; detail: string };
type TagItem = { type: "tag"; content: string };
type MetricItem = {
  type: "metric";
  val: string;
  label: string;
  detail: string;
};
type QuoteItem = { type: "quote"; text: string };

function LeftCell({ item }: { item: StatItem | TagItem }) {
  if (item.type === "tag") {
    return (
      <div className="flex-1 min-h-0 flex items-center justify-center p-[18px] bg-[#050505] border border-[#181818]">
        <p
          style={{
            fontSize: 9,
            letterSpacing: "0.05em",
            color: "rgba(255,255,255,0.22)",
            lineHeight: 1.9,
          }}
        >
          {item.content}
        </p>
      </div>
    );
  }
  return (
    <div className="flex-1 min-h-0 relative flex flex-col justify-end p-[18px] bg-[#080808] border border-[#181818] overflow-hidden">
      <span
        className="absolute bottom-1 right-3 select-none pointer-events-none leading-none"
        style={{
          fontSize: "3.5rem",
          fontWeight: 700,
          color: "rgba(255,255,255,0.03)",
        }}
      >
        {item.val.replace(/[^0-9]/g, "") || "★"}
      </span>
      <div
        style={{
          fontSize: "clamp(1.2rem,1.7vw,1.6rem)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "#fff",
          lineHeight: 1,
        }}
      >
        {item.val}
      </div>
      <div
        style={{
          fontSize: 9,
          letterSpacing: "0.07em",
          color: "rgba(255,255,255,0.3)",
          marginTop: 4,
        }}
      >
        {item.unit}
      </div>
      <div
        style={{
          fontSize: 9,
          color: "rgba(255,255,255,0.15)",
          lineHeight: 1.65,
          marginTop: 6,
        }}
      >
        {item.detail}
      </div>
    </div>
  );
}

function RightCell({ item }: { item: MetricItem | QuoteItem }) {
  if (item.type === "quote") {
    return (
      <div className="flex-1 min-h-0 flex flex-col justify-center p-[18px] bg-[#050505] border border-[#181818]">
        <div
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.15)",
            marginBottom: 8,
          }}
        >
          —
        </div>
        <div
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.28)",
            lineHeight: 1.9,
            fontStyle: "italic",
            letterSpacing: "0.02em",
          }}
        >
          "{item.text}"
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 min-h-0 flex flex-col justify-end p-[18px] bg-[#080808] border border-[#181818] overflow-hidden">
      <div
        style={{
          fontSize: "clamp(1.2rem,1.7vw,1.6rem)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "#fff",
          lineHeight: 1,
        }}
      >
        {item.val}
      </div>
      <div
        style={{
          fontSize: 9,
          letterSpacing: "0.07em",
          color: "rgba(255,255,255,0.3)",
          marginTop: 4,
        }}
      >
        {item.label}
      </div>
      <div
        style={{
          fontSize: 9,
          color: "rgba(255,255,255,0.15)",
          lineHeight: 1.65,
          marginTop: 6,
        }}
      >
        {item.detail}
      </div>
    </div>
  );
}

function BentoSlide({ slide }: { slide: (typeof SLIDES)[number] }) {
  return (
    <div
      className="bento-slide absolute inset-0 w-full h-full"
      style={{ willChange: "opacity, transform" }}
    >
      {/* 3-column grid */}
      <div
        className="w-full h-full grid"
        style={{ gridTemplateColumns: "200px 1fr 200px", gap: 3 }}
      >
        {/* ── LEFT SIDEBAR ── */}
        <div className="flex flex-col" style={{ gap: 3 }}>
          {slide.left.map((item, i) => (
            <LeftCell key={i} item={item} />
          ))}
        </div>

        {/* ── CENTER BENTO GRID ── */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(3,1fr)",
            gridTemplateRows: "repeat(3,1fr)",
            gap: 3,
          }}
        >
          {/* Featured — 2×2 */}
          <div className="col-span-2 row-span-2 relative flex flex-col justify-between p-6 bg-[#050505] border border-[#181818] overflow-hidden">
            {/* Ghost number */}
            <span
              className="absolute bottom-2 right-3 select-none pointer-events-none leading-none"
              style={{
                fontSize: "clamp(4rem,8vw,7rem)",
                fontWeight: 700,
                color: "rgba(255,255,255,0.03)",
                letterSpacing: "-0.02em",
              }}
            >
              {slide.num}
            </span>
            {/* Label tag */}
            <div>
              <span
                className="inline-block px-2 py-1 border border-white/10"
                style={{
                  fontSize: 8,
                  letterSpacing: "0.22em",
                  color: "rgba(255,255,255,0.2)",
                }}
              >
                {slide.label.toUpperCase()}
              </span>
            </div>
            {/* Title */}
            <div>
              <p
                style={{
                  fontSize: 9,
                  letterSpacing: "0.16em",
                  color: "rgba(255,255,255,0.2)",
                  marginBottom: 10,
                }}
              >
                {slide.num}
              </p>
              <h2
                className="text-white leading-[1.18]"
                style={{
                  fontSize: "clamp(1.4rem,2.2vw,2.1rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.01em",
                }}
              >
                {slide.title}
                <br />
                <span style={{ fontWeight: 600 }}>{slide.titleEm}</span>
              </h2>
            </div>
            {/* Accent line — animated by GSAP on enter */}
            <div
              className="featured-accent absolute bottom-0 left-0 h-[2px] bg-white"
              style={{ width: 0 }}
            />
          </div>

          {/* Stat 1 */}
          <div className="relative flex flex-col justify-end p-5 bg-[#080808] border border-[#181818] overflow-hidden group">
            <p
              style={{
                fontSize: 9,
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.18)",
                marginBottom: 6,
              }}
            >
              02
            </p>
            <p
              style={{
                fontSize: "clamp(1.7rem,2.5vw,2.2rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "#fff",
                lineHeight: 1,
              }}
            >
              {slide.stats[0].val}
            </p>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.07em",
                color: "rgba(255,255,255,0.3)",
                margin: "4px 0 2px",
              }}
            >
              {slide.stats[0].unit}
            </p>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.18)" }}>
              {slide.stats[0].desc}
            </p>
            <div className="absolute bottom-0 left-0 h-px bg-white/20 w-0 group-hover:w-full transition-all duration-500" />
          </div>

          {/* Stat 2 */}
          <div className="relative flex flex-col justify-end p-5 bg-[#080808] border border-[#181818] overflow-hidden group">
            <p
              style={{
                fontSize: 9,
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.18)",
                marginBottom: 6,
              }}
            >
              03
            </p>
            <p
              style={{
                fontSize: "clamp(1.7rem,2.5vw,2.2rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "#fff",
                lineHeight: 1,
              }}
            >
              {slide.stats[1].val}
            </p>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.07em",
                color: "rgba(255,255,255,0.3)",
                margin: "4px 0 2px",
              }}
            >
              {slide.stats[1].unit}
            </p>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.18)" }}>
              {slide.stats[1].desc}
            </p>
            <div className="absolute bottom-0 left-0 h-px bg-white/20 w-0 group-hover:w-full transition-all duration-500" />
          </div>

          {/* Node */}
          <div className="flex items-center justify-center bg-white border border-white">
            <div
              className="w-11 h-11 rounded-full bg-black flex items-center justify-center text-white transition-transform duration-300 hover:scale-110"
              style={{ fontSize: 9, letterSpacing: "0.14em" }}
            >
              {slide.nodeLabel}
            </div>
          </div>

          {/* Cards */}
          {slide.cards.map((card, i) => (
            <div
              key={i}
              className="relative flex flex-col justify-end p-5 bg-[#080808] border border-[#181818] overflow-hidden group"
            >
              <p
                style={{
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.18)",
                  marginBottom: 6,
                }}
              >
                {card.num}
              </p>
              <h4
                style={{
                  fontSize: "clamp(0.8rem,1.1vw,0.95rem)",
                  fontWeight: 400,
                  color: "#fff",
                  marginBottom: 4,
                  lineHeight: 1.35,
                }}
              >
                {card.title}
              </h4>
              <p
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.35)",
                  lineHeight: 1.7,
                }}
              >
                {card.desc}
              </p>
              <div className="absolute bottom-0 left-0 h-px bg-white/20 w-0 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div className="flex flex-col" style={{ gap: 3 }}>
          {slide.right.map((item, i) => (
            <RightCell key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ServiceSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Header refs — updated imperatively, never via React state
  const labelRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  // Dot refs
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(".bento-slide");
      if (!slides.length) return;

      // ── Initial state: first slide visible, rest invisible ──
      gsap.set(slides, { opacity: 0, y: 20 });
      gsap.set(slides[0], { opacity: 1, y: 0 });

      // ── Animate accent line on first slide ──
      const firstAccent = slides[0].querySelector(".featured-accent");
      if (firstAccent) {
        gsap.fromTo(
          firstAccent,
          { width: 0 },
          { width: "100%", duration: 1, ease: "power3.out", delay: 0.3 },
        );
      }

      let lastIdx = 0;

      // Update header / dots / progress imperatively (no React state)
      const updateUI = (idx: number) => {
        if (idx === lastIdx) return;
        lastIdx = idx;

        // Label
        if (labelRef.current) {
          gsap.to(labelRef.current, {
            opacity: 0,
            y: -6,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
              if (labelRef.current)
                labelRef.current.textContent = SLIDES[idx].label.toUpperCase();
              gsap.to(labelRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.25,
                ease: "power2.out",
              });
            },
          });
        }
        // Counter
        if (counterRef.current) {
          counterRef.current.textContent = `0${idx + 1} / 0${N}`;
        }
        // Dots
        dotRefs.current.forEach((dot, i) => {
          if (!dot) return;
          gsap.to(dot, {
            width: i === idx ? 36 : 16,
            backgroundColor: i === idx ? "#fff" : "rgba(255,255,255,0.15)",
            duration: 0.35,
            ease: "power2.out",
          });
        });
        // Progress bar
        if (progressRef.current) {
          gsap.to(progressRef.current, {
            width: `${((idx + 1) / N) * 100}%`,
            duration: 0.5,
            ease: "power2.out",
          });
        }
        // Accent bar on incoming slide
        const accent = slides[idx]?.querySelector(".featured-accent");
        if (accent) {
          gsap.fromTo(
            accent,
            { width: 0 },
            { width: "100%", duration: 0.8, ease: "power3.out", delay: 0.15 },
          );
        }
      };

      // ── Build per-slide ScrollTriggers ──
      // Each slide occupies 1/N of the total scroll range
      const totalH = N * 100; // vh units (in px this becomes N * window.innerHeight)

      slides.forEach((slide, i) => {
        const startPct = i / N;
        const endPct = (i + 1) / N;

        // Enter: fade in when this slide's range starts
        ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: () =>
            `top+=${startPct * (wrapperRef.current!.offsetHeight - window.innerHeight)} top`,
          end: () =>
            `top+=${endPct * (wrapperRef.current!.offsetHeight - window.innerHeight)} top`,
          onEnter: () => {
            gsap.to(slide, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            });
            if (i > 0)
              gsap.to(slides[i - 1], {
                opacity: 0,
                y: -18,
                duration: 0.4,
                ease: "power2.in",
              });
            updateUI(i);
          },
          onEnterBack: () => {
            gsap.to(slide, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            });
            if (i < N - 1)
              gsap.to(slides[i + 1], {
                opacity: 0,
                y: 20,
                duration: 0.4,
                ease: "power2.in",
              });
            updateUI(i);
          },
        });
      });

      // ── Master ScrollTrigger just for pinning ──
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${(N - 1) * 100}%`,
        pin: stickyRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        scrub: 1,
        snap: {
          snapTo: 1 / (N - 1),
          duration: { min: 0.4, max: 0.8 },
          ease: "power2.inOut",
          delay: 0.05,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${N * 100}vh` }}
      className="relative bg-black"
    >
      {/* ── STICKY VIEWPORT ── */}
      <div
        ref={stickyRef}
        className="w-full h-screen bg-black flex flex-col overflow-hidden"
        style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}
      >
        <div className="flex-1 flex flex-col min-h-0 max-w-[1440px] mx-auto w-full px-4">
          {/* ── HEADER ── */}
          <div className="flex items-center justify-between py-[14px] border-b border-white/[0.06] shrink-0">
            <div className="flex items-center gap-[10px]">
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  color: "rgba(255,255,255,0.2)",
                }}
              >
                WHY WE'RE DIFFERENT
              </span>
              <span className="w-8 h-px bg-white/10 inline-block" />
              <span
                ref={labelRef}
                style={{
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.42)",
                }}
              >
                {SLIDES[0].label.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-[6px] items-center">
                {SLIDES.map((_, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      dotRefs.current[i] = el;
                    }}
                    style={{
                      height: 2,
                      width: i === 0 ? 36 : 16,
                      borderRadius: 1,
                      backgroundColor:
                        i === 0 ? "#fff" : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>
              <span
                ref={counterRef}
                style={{
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.22)",
                }}
                className="tabular-nums"
              >
                01 / 0{N}
              </span>
            </div>
          </div>

          {/* ── SLIDE CONTAINER ── */}
          <div
            ref={slidesRef}
            className="relative flex-1 min-h-0"
            style={{ paddingTop: 3, paddingBottom: 3 }}
          >
            {SLIDES.map((slide, i) => (
              <BentoSlide key={i} slide={slide} />
            ))}
          </div>

          {/* ── PROGRESS BAR ── */}
          <div className="h-[2px] bg-white/[0.05] relative shrink-0">
            <div
              ref={progressRef}
              className="absolute left-0 top-0 h-full bg-white"
              style={{ width: `${(1 / N) * 100}%` }}
            />
          </div>

          {/* ── FOOTER ── */}
          <div className="flex items-center justify-between py-[10px] shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-white/20 rounded-sm flex items-center justify-center">
                <div className="w-[3px] h-[3px] bg-white/40 rounded-sm" />
              </div>
              <span
                style={{
                  fontSize: 9,
                  color: "rgba(255,255,255,0.18)",
                  letterSpacing: "0.14em",
                }}
              >
                SCROLL TO EXPLORE
              </span>
            </div>
            <span
              style={{
                fontSize: 9,
                color: "rgba(255,255,255,0.18)",
                letterSpacing: "0.14em",
              }}
            >
              SERVICES — HUESPIRE AGENCY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
