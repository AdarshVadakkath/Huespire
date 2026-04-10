import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type WordStyle = "solid" | "outlined" | "accent";

const words1 = [
  "GROWTH",
  "SCALE",
  "MOMENTUM",
  "ACCELERATION",
  "AMPLIFY",
  "EXPAND",
];
const words2 = [
  "ELEVATE",
  "DISRUPT",
  "DOMINATE",
  "INNOVATE",
  "LEAD",
  "TRANSFORM",
];

const wordStyles1: WordStyle[] = [
  "solid",
  "outlined",
  "solid",
  "accent",
  "outlined",
  "solid",
];
const wordStyles2: WordStyle[] = [
  "outlined",
  "solid",
  "outlined",
  "solid",
  "outlined",
  "solid",
];

// We duplicate 4 times for seamless infinite scroll on ultra-wide monitors
const track1 = [...words1, ...words1, ...words1, ...words1];
const track2 = [...words2, ...words2, ...words2, ...words2];

function MarqueeItem({
  word,
  style,
  sm,
}: {
  word: string;
  style: WordStyle;
  sm?: boolean;
}) {
  return (
    <div className="flex items-center gap-6 md:gap-12 mx-3 md:mx-6">
      <span
        className={`word whitespace-nowrap ${sm ? "sm" : ""} ${style}`}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: sm
            ? "clamp(3.5rem, 6vw, 5rem)"
            : "clamp(4.8rem, 9vw, 7.5rem)",
          lineHeight: 1,
          letterSpacing: "0.04em",
          color:
            style === "outlined"
              ? "transparent"
              : style === "accent"
                ? "#4DF0A0" // Mint green accent matching Hero
                : "rgba(255,255,255,0.9)",
          WebkitTextStroke:
            style === "outlined" ? "1.5px rgba(255,255,255,0.25)" : "none",
          textShadow:
            style === "accent" ? "0 0 45px rgba(77, 240, 160, 0.45)" : "none",
        }}
      >
        {word}
      </span>
      <span
        className="w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0"
        style={{
          background: style === "accent" ? "#4DF0A0" : "rgba(255,255,255,0.15)",
          boxShadow: style === "accent" ? "0 0 15px #4DF0A0" : "none",
        }}
      />
    </div>
  );
}

export default function TextSection() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We use GSAP for flawlessly smooth looping that syncs optimally with Lenis.
    const ctx = gsap.context(() => {
      // Create infinite looping tweens
      const t1 = gsap.to(row1Ref.current, {
        xPercent: -50,
        ease: "none",
        duration: 35,
        repeat: -1,
      });

      const t2 = gsap.fromTo(
        row2Ref.current,
        { xPercent: -50 },
        { xPercent: 0, ease: "none", duration: 40, repeat: -1 },
      );

      // Advanced trick: tie timescale to scroll velocity!
      // This means when you scroll down or up, the marquee dynamically speeds up smoothly.
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          // Normalize velocity so it's a pleasant boost factor
          const velocity = Math.abs(self.getVelocity() / 600);
          const timeScale = 1 + velocity;

          gsap.to([t1, t2], {
            timeScale: timeScale,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full bg-black py-28 overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
      {/* ── BACKGROUND AMBIENT GLOW ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)",
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500&display=swap');

        .word {
          /* Notice how we only transition transform and colors visually in CSS, 
             leaving the horizontal sliding completely untouched for GSAP to handle natively! */
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), 
                      color 0.5s cubic-bezier(0.22, 1, 0.36, 1), 
                      text-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
          will-change: transform, color, text-shadow;
        }
        
        .word:hover {
          color: #fff !important;
          -webkit-text-stroke: 0px transparent !important;
          text-shadow: 0 0 35px rgba(255,255,255,0.6) !important;
          transform: scale(1.08) rotate(-1.5deg);
        }
      `}</style>

      {/* ── LABEL ── */}
      <div className="relative z-10 text-center mb-16 px-4">
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "0.45em",
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
          }}
        >
          Powering Results
        </p>
        <div className="mt-5 w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent mx-auto" />
      </div>

      {/* ── HORIZONTAL MARQUEE CONTAINER ── */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {/* ROW 1 */}
        <div className="flex whitespace-nowrap mb-5 md:mb-7 max-w-full">
          <div className="flex w-max" ref={row1Ref}>
            {track1.map((word, i) => (
              <MarqueeItem
                key={`r1-${i}`}
                word={word}
                style={wordStyles1[i % words1.length]}
              />
            ))}
          </div>
        </div>

        {/* THIN DIVIDER */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5 md:mb-7" />

        {/* ROW 2 */}
        <div className="flex whitespace-nowrap mb-5 md:mb-7 max-w-full">
          <div className="flex w-max" ref={row2Ref}>
            {track2.map((word, i) => (
              <MarqueeItem
                key={`r2-${i}`}
                word={word}
                style={wordStyles2[i % words2.length]}
                sm
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── FADE MASKS (EDGES & TOP/BOTTOM) ── */}
      <div className="absolute top-0 bottom-0 left-0 w-[15vw] z-20 pointer-events-none bg-gradient-to-r from-black to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-[15vw] z-20 pointer-events-none bg-gradient-to-l from-black to-transparent" />

      <div className="absolute top-0 left-0 right-0 h-32 z-20 pointer-events-none bg-gradient-to-b from-black via-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none bg-gradient-to-t from-black via-black/80 to-transparent" />
    </section>
  );
}
