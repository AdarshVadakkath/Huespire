import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Types ────────────────────────────────────────────────────────────────────

type SidebarStatItem = {
  type: "stat";
  val: string;
  unit: string;
  detail: string;
};
type SidebarTagItem = { type: "tag"; content: string };
type SidebarMetricItem = {
  type: "metric";
  val: string;
  label: string;
  detail: string;
};
type SidebarQuoteItem = { type: "quote"; text: string };
type LeftSidebarItem = SidebarStatItem | SidebarTagItem;
type RightSidebarItem = SidebarMetricItem | SidebarQuoteItem;

interface Slide {
  label: string;
  featured: { num: string; title: string; titleEm: string };
  stats: { val: string; unit: string; desc: string }[];
  cards: { num: string; title: string; desc: string }[];
  nodeLabel: string;
  leftSidebar: LeftSidebarItem[];
  rightSidebar: RightSidebarItem[];
}

// ── Data ─────────────────────────────────────────────────────────────────────

const slides: Slide[] = [
  {
    label: "Performance",
    featured: {
      num: "01",
      title: "Data backing every",
      titleEm: "creative decision.",
    },
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
    leftSidebar: [
      {
        type: "stat",
        val: "$12M+",
        unit: "Revenue Driven",
        detail: "Across all active client accounts in 2024 alone.",
      },
      {
        type: "stat",
        val: "48hr",
        unit: "Avg. Onboarding",
        detail: "From signed contract to live campaign in two days.",
      },
      {
        type: "tag",
        content: "Verified performance figures from client audits.",
      },
    ],
    rightSidebar: [
      {
        type: "metric",
        val: "↑ 218%",
        label: "Pipeline growth",
        detail: "Median increase across B2B clients Q1–Q4.",
      },
      {
        type: "quote",
        text: "The results speak for themselves. No fluff, just numbers.",
      },
      {
        type: "metric",
        val: "22 days",
        label: "Avg. payback period",
        detail: "From first spend to recovered investment.",
      },
    ],
  },
  {
    label: "Strategy",
    featured: {
      num: "02",
      title: "Strategy that",
      titleEm: "scales with you.",
    },
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
    leftSidebar: [
      {
        type: "stat",
        val: "6wk",
        unit: "Strategy Sprint",
        detail: "Full go-to-market plan delivered in six weeks.",
      },
      {
        type: "stat",
        val: "3.8×",
        unit: "LTV Growth",
        detail: "Average customer lifetime value uplift.",
      },
      {
        type: "tag",
        content: "Strategy underpins every execution decision we make.",
      },
    ],
    rightSidebar: [
      {
        type: "metric",
        val: "20+",
        label: "Industries served",
        detail: "SaaS, e-com, fintech, health, and more.",
      },
      {
        type: "quote",
        text: "Strategy without execution is hallucination. We do both.",
      },
      {
        type: "metric",
        val: "91%",
        label: "Goal attainment",
        detail: "Of quarterly KPIs met or exceeded.",
      },
    ],
  },
  {
    label: "Creative",
    featured: { num: "03", title: "Creative that", titleEm: "truly converts." },
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
    leftSidebar: [
      {
        type: "stat",
        val: "72hr",
        unit: "Creative Turnaround",
        detail: "Full ad suite delivered in three business days.",
      },
      {
        type: "stat",
        val: "×4.1",
        unit: "CTR Lift",
        detail: "vs. client's previous creative baseline.",
      },
      {
        type: "tag",
        content: "Award-shortlisted work across three consecutive years.",
      },
    ],
    rightSidebar: [
      {
        type: "metric",
        val: "A/B+",
        label: "Every asset tested",
        detail: "Minimum two creative variants per campaign.",
      },
      {
        type: "quote",
        text: "Beauty that doesn't convert is just expensive decoration.",
      },
      {
        type: "metric",
        val: "98%",
        label: "On-brand delivery",
        detail: "Brand guideline adherence across all outputs.",
      },
    ],
  },
  {
    label: "Analytics",
    featured: { num: "04", title: "Results you", titleEm: "can measure." },
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
    leftSidebar: [
      {
        type: "stat",
        val: "100%",
        unit: "Data Ownership",
        detail: "You own your data. Always. No exceptions.",
      },
      {
        type: "stat",
        val: "< 1h",
        unit: "Report Latency",
        detail: "Dashboards refresh within the hour.",
      },
      {
        type: "tag",
        content: "Integrated with GA4, Segment, Snowflake, and more.",
      },
    ],
    rightSidebar: [
      {
        type: "metric",
        val: "14+",
        label: "Data sources unified",
        detail: "Single source of truth across your stack.",
      },
      {
        type: "quote",
        text: "If you can't measure it, you can't improve it. We measure everything.",
      },
      {
        type: "metric",
        val: "Real-time",
        label: "Dashboard updates",
        detail: "No waiting for Monday morning reports.",
      },
    ],
  },
];

// ── Center Cell Components ───────────────────────────────────────────────────

function FeaturedCell({ slide }: { slide: Slide }) {
  const accentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!accentRef.current) return;
    gsap.fromTo(
      accentRef.current,
      { width: 0 },
      { width: "100%", duration: 0.8, ease: "power3.out", delay: 0.3 },
    );
  }, [slide]);

  return (
    <div className="relative h-full flex flex-col justify-between p-6 bg-[#050505] border border-[#181818] overflow-hidden">
      <span
        className="absolute bottom-2 right-4 select-none pointer-events-none leading-none text-white/[0.035]"
        style={{
          fontSize: "clamp(4rem,8vw,7rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        {slide.featured.num}
      </span>

      <div className="mb-auto">
        <span
          className="inline-block px-2 py-1 border border-white/10 text-white/20"
          style={{ fontSize: 8, letterSpacing: "0.22em" }}
        >
          {slide.label.toUpperCase()}
        </span>
      </div>

      <div>
        <p
          className="text-white/20 mb-2"
          style={{ fontSize: 9, letterSpacing: "0.16em" }}
        >
          {slide.featured.num}
        </p>
        <h2
          className="text-white leading-[1.18]"
          style={{
            fontSize: "clamp(1.5rem,2.4vw,2.2rem)",
            fontWeight: 300,
            letterSpacing: "-0.01em",
          }}
        >
          {slide.featured.title}
          <br />
          <span style={{ fontWeight: 600 }}>{slide.featured.titleEm}</span>
        </h2>
      </div>

      <div
        ref={accentRef}
        className="absolute bottom-0 left-0 h-[2px] bg-white"
        style={{ width: 0 }}
      />
    </div>
  );
}

function StatCell({
  stat,
  num,
}: {
  stat: { val: string; unit: string; desc: string };
  num: string;
}) {
  return (
    <div className="relative h-full flex flex-col justify-end p-5 bg-[#080808] border border-[#181818] overflow-hidden group">
      <p
        className="mb-2 text-white/[0.18]"
        style={{ fontSize: 9, letterSpacing: "0.18em" }}
      >
        {num}
      </p>
      <p
        className="text-white leading-none mb-1"
        style={{
          fontSize: "clamp(1.8rem,2.8vw,2.4rem)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }}
      >
        {stat.val}
      </p>
      <p
        className="text-white/30 mb-1"
        style={{ fontSize: 10, letterSpacing: "0.07em" }}
      >
        {stat.unit}
      </p>
      <p className="text-white/[0.18]" style={{ fontSize: 10 }}>
        {stat.desc}
      </p>
      <div className="absolute bottom-0 left-0 h-px bg-white/20 w-0 group-hover:w-full transition-all duration-500" />
    </div>
  );
}

function NodeCell({ label }: { label: string }) {
  return (
    <div className="h-full flex items-center justify-center bg-white border border-white">
      <div
        className="w-11 h-11 rounded-full bg-black flex items-center justify-center transition-transform duration-300 hover:scale-110 text-white"
        style={{ fontSize: 9, letterSpacing: "0.14em" }}
      >
        {label}
      </div>
    </div>
  );
}

function CardCell({
  card,
}: {
  card: { num: string; title: string; desc: string };
}) {
  return (
    <div className="relative h-full flex flex-col justify-end p-5 bg-[#080808] border border-[#181818] overflow-hidden group">
      <p
        className="mb-2 text-white/[0.18]"
        style={{ fontSize: 9, letterSpacing: "0.18em" }}
      >
        {card.num}
      </p>
      <h4
        className="text-white mb-1 leading-snug"
        style={{ fontSize: "clamp(0.85rem,1.2vw,1rem)", fontWeight: 400 }}
      >
        {card.title}
      </h4>
      <p className="text-white/35 leading-[1.7]" style={{ fontSize: 10 }}>
        {card.desc}
      </p>
      <div className="absolute bottom-0 left-0 h-px bg-white/20 w-0 group-hover:w-full transition-all duration-500" />
    </div>
  );
}

// ── Sidebar Cell Components ──────────────────────────────────────────────────

function SidebarStatCell({ item }: { item: SidebarStatItem }) {
  return (
    <div className="h-full relative flex flex-col justify-end p-[18px] bg-[#080808] border border-[#181818] overflow-hidden">
      <span
        className="absolute bottom-1 right-3 select-none pointer-events-none leading-none text-white/[0.04]"
        style={{ fontSize: "3.5rem", fontWeight: 700 }}
      >
        {item.val.replace(/[^0-9]/g, "") || "0"}
      </span>
      <div
        className="text-white leading-none mb-1"
        style={{
          fontSize: "clamp(1.3rem,1.8vw,1.7rem)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }}
      >
        {item.val}
      </div>
      <div
        className="text-white/30 mb-1"
        style={{ fontSize: 9, letterSpacing: "0.07em" }}
      >
        {item.unit}
      </div>
      <div
        className="text-white/[0.15] leading-[1.6] mt-1"
        style={{ fontSize: 9 }}
      >
        {item.detail}
      </div>
    </div>
  );
}

function SidebarTagCell({ item }: { item: SidebarTagItem }) {
  return (
    <div className="h-full flex items-center justify-center p-[18px] bg-[#050505] border border-[#181818]">
      <div
        className="text-white/25 leading-[1.8] text-center"
        style={{ fontSize: 9, letterSpacing: "0.04em" }}
      >
        {item.content}
      </div>
    </div>
  );
}

function SidebarMetricCell({ item }: { item: SidebarMetricItem }) {
  return (
    <div className="h-full relative flex flex-col justify-end p-[18px] bg-[#080808] border border-[#181818] overflow-hidden">
      <div
        className="text-white leading-none mb-1"
        style={{
          fontSize: "clamp(1.3rem,1.8vw,1.7rem)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }}
      >
        {item.val}
      </div>
      <div
        className="text-white/30 mb-1"
        style={{ fontSize: 9, letterSpacing: "0.07em" }}
      >
        {item.label}
      </div>
      <div
        className="text-white/[0.15] leading-[1.6] mt-1"
        style={{ fontSize: 9 }}
      >
        {item.detail}
      </div>
    </div>
  );
}

function SidebarQuoteCell({ item }: { item: SidebarQuoteItem }) {
  return (
    <div className="h-full flex flex-col items-start justify-center p-[18px] bg-[#050505] border border-[#181818]">
      <div className="text-white/[0.15] mb-2" style={{ fontSize: 9 }}>
        —
      </div>
      <div
        className="text-white/30 leading-[1.9] italic"
        style={{ fontSize: 10, letterSpacing: "0.02em" }}
      >
        "{item.text}"
      </div>
    </div>
  );
}

// ── Center Grid ──────────────────────────────────────────────────────────────

function CenterGrid({
  slide,
  slideIndex,
}: {
  slide: Slide;
  slideIndex: number;
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cells = gridRef.current.querySelectorAll(".bento-cell");
    gsap.fromTo(
      cells,
      { opacity: 0, y: 16, scale: 0.975 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.05,
        ease: "power3.out",
        clearProps: "transform",
      },
    );
  }, [slideIndex]);

  return (
    <div
      ref={gridRef}
      className="grid gap-[3px] h-full"
      style={{
        gridTemplateColumns: "repeat(3,1fr)",
        gridTemplateRows: "repeat(3,1fr)",
      }}
    >
      <div className="bento-cell col-span-2 row-span-2 min-h-0">
        <FeaturedCell slide={slide} />
      </div>
      <div className="bento-cell min-h-0">
        <StatCell stat={slide.stats[0]} num="02" />
      </div>
      <div className="bento-cell min-h-0">
        <StatCell stat={slide.stats[1]} num="03" />
      </div>
      <div className="bento-cell min-h-0">
        <NodeCell label={slide.nodeLabel} />
      </div>
      <div className="bento-cell min-h-0">
        <CardCell card={slide.cards[0]} />
      </div>
      <div className="bento-cell min-h-0">
        <CardCell card={slide.cards[1]} />
      </div>
      <div className="bento-cell min-h-0">
        <CardCell card={slide.cards[2]} />
      </div>
    </div>
  );
}

// ── Main Export ──────────────────────────────────────────────────────────────

export default function BentoScrollSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);

  // ScrollTrigger — pin & drive slide index
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${slides.length * 100}%`,
        pin: stickyRef.current,
        scrub: false,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * slides.length),
            slides.length - 1,
          );
          setCurrent(idx);
          if (progressRef.current) {
            gsap.to(progressRef.current, {
              width: `${((idx + 1) / slides.length) * 100}%`,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        },
      });
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  // Animate out → swap → animate in
  useEffect(() => {
    if (current === displayIndex) return;
    if (stickyRef.current) {
      const cells = stickyRef.current.querySelectorAll(
        ".bento-cell, .sidebar-cell",
      );
      gsap.to(cells, {
        opacity: 0,
        y: -12,
        scale: 0.97,
        duration: 0.25,
        stagger: 0.02,
        ease: "power2.in",
        onComplete: () => setDisplayIndex(current),
      });
    }
  }, [current, displayIndex]);

  const slide = slides[displayIndex];

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${slides.length * 100}vh` }}
      className="relative bg-black"
    >
      <div
        ref={stickyRef}
        className="w-full h-screen bg-black flex flex-col overflow-hidden"
        style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}
      >
        {/* max-w-8xl centered shell */}
        <div className="flex-1 flex flex-col min-h-0 max-w-[1440px] mx-auto w-full px-4">
          {/* Header */}
          <div className="flex items-center justify-between py-[14px] border-b border-white/[0.06] shrink-0">
            <div className="flex items-center gap-[10px]">
              <span
                className="text-white/20"
                style={{ fontSize: 9, letterSpacing: "0.22em" }}
              >
                WHY WE'RE DIFFERENT
              </span>
              <span className="w-8 h-px bg-white/10 inline-block" />
              <span
                className="text-white/40 transition-all duration-500"
                style={{ fontSize: 9, letterSpacing: "0.18em" }}
              >
                {slide.label.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-[6px] items-center">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className="h-px rounded-sm transition-all duration-500"
                    style={{
                      width: i === displayIndex ? 36 : 16,
                      background:
                        i === displayIndex ? "#fff" : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>
              <span
                className="text-white/20 tabular-nums"
                style={{ fontSize: 10, letterSpacing: "0.12em" }}
              >
                0{displayIndex + 1} / 0{slides.length}
              </span>
            </div>
          </div>

          {/* 3-column bento layout */}
          <div
            className="flex-1 grid gap-[3px] py-[3px] min-h-0"
            style={{ gridTemplateColumns: "200px 1fr 200px" }}
          >
            {/* Left sidebar */}
            <div className="flex flex-col gap-[3px] min-h-0">
              {slide.leftSidebar.map((item, i) => (
                <div
                  key={`${displayIndex}-l-${i}`}
                  className="sidebar-cell flex-1 min-h-0"
                >
                  {item.type === "stat" && <SidebarStatCell item={item} />}
                  {item.type === "tag" && <SidebarTagCell item={item} />}
                </div>
              ))}
            </div>

            {/* Center grid */}
            <div className="min-h-0">
              <CenterGrid
                key={displayIndex}
                slide={slide}
                slideIndex={displayIndex}
              />
            </div>

            {/* Right sidebar */}
            <div className="flex flex-col gap-[3px] min-h-0">
              {slide.rightSidebar.map((item, i) => (
                <div
                  key={`${displayIndex}-r-${i}`}
                  className="sidebar-cell flex-1 min-h-0"
                >
                  {item.type === "metric" && <SidebarMetricCell item={item} />}
                  {item.type === "quote" && <SidebarQuoteCell item={item} />}
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-[2px] bg-white/5 relative shrink-0">
            <div
              ref={progressRef}
              className="absolute left-0 top-0 h-full bg-white"
              style={{ width: "25%" }}
            />
          </div>

          {/* Footer */}
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
              {slide.label.toUpperCase()} —{" "}
              {slide.featured.titleEm.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
