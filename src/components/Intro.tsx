import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// ── Words that cycle before the brand reveal ──────────────────────────────────
const CYCLE_WORDS = ["BUILD.", "AUTOMATE.", "SCALE."];

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  // Overlay + elements
  // Overlay + elements
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null); // top logo
  const labelRef = useRef<HTMLDivElement>(null); // top label
  const subRef = useRef<HTMLDivElement>(null); // "Making Brands" line
  const wordBoxRef = useRef<HTMLDivElement>(null); // clipping container
  const wordRef = useRef<HTMLDivElement>(null); // the sliding big word

  useEffect(() => {
    // Lock scroll while intro runs
    document.body.style.overflow = "hidden";

    // Initial visibility
    gsap.set(
      [logoRef.current, labelRef.current, subRef.current, wordBoxRef.current],
      { opacity: 0 },
    );

    // ── PHASE 1 : cycling words → HUESPIRE reveal ──────────────────────────
    const tl = gsap.timeline();

    // Logo fades in first
    tl.to(logoRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" });

    // Top label fades in
    tl.to(labelRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" });

    // Sub-label slides up
    tl.to(
      subRef.current,
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.2",
    );

    // Show word clip box
    tl.to(wordBoxRef.current, { opacity: 1, duration: 0.01 });

    // Cycle each word
    CYCLE_WORDS.forEach((word, i) => {
      // Set content and reset position inside the timeline
      tl.call(() => {
        if (wordRef.current) {
          wordRef.current.textContent = word;
          gsap.set(wordRef.current, { y: "100%" });
        }
      });

      // Slide in from bottom
      tl.to(wordRef.current, {
        y: "0%",
        duration: 0.55,
        ease: "power3.out",
      });

      // Hold
      tl.to({}, { duration: i === CYCLE_WORDS.length - 1 ? 0.35 : 0.55 });

      // Slide out to top
      tl.to(wordRef.current, {
        y: "-100%",
        duration: 0.4,
        ease: "power3.in",
      });
    });

    // Fade out supporting text AND logo
    tl.to(
      [labelRef.current, subRef.current, wordBoxRef.current, logoRef.current],
      {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      },
    );

    // ── TRANSITION TO LANDING SECTION ──────────────────
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power1.inOut",
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete();
      },
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  // ── Shared style tokens ────────────────────────────────────────────────────
  const BIG: React.CSSProperties = {
    fontSize: "clamp(4rem, 13vw, 11rem)",
    fontWeight: 900,
    letterSpacing: "-0.04em",
    lineHeight: 1,
    color: "#fff",
    userSelect: "none",
  };

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#000",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── LOGO ────────────────────────────────────────────────────── */}
      <div
        ref={logoRef}
        style={{
          position: "absolute",
          top: "36px",
          left: "50%",
          transform: "translateX(-50%)",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <img
          src="/logo.png"
          alt="HUESPIRE"
          style={{
            height: "100px",
            width: "auto",
            objectFit: "contain",
            filter: "brightness(1.1)",
            display: "block",
          }}
        />
      </div>

      {/* ── TOP LABEL ─────────────────────────────────────────────────── */}
      <div
        ref={labelRef}
        style={{
          position: "absolute",
          top: "130px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "9px",
          letterSpacing: "5px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)",
          whiteSpace: "nowrap",
        }}
      >
        Emerging Creative Studio · Est. 2024
      </div>

      {/* ── CYCLING PHRASE ────────────────────────────────────────────── */}
      {/* Sub-label "We" */}
      <div
        ref={subRef}
        style={{
          fontSize: "clamp(1rem, 2.2vw, 1.5rem)",
          fontWeight: 400,
          fontStyle: "italic",
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.01em",
          marginBottom: "0.15em",
          transform: "translateY(10px)",
        }}
      >
        We Help You
      </div>

      {/* Clipping box for sliding words */}
      <div
        ref={wordBoxRef}
        style={{
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          lineHeight: 1.05,
          marginBottom: "2.5rem",
        }}
      >
        <div ref={wordRef} style={{ ...BIG, willChange: "transform" }}>
          {/* content injected by GSAP .call() */}
        </div>
      </div>
    </div>
  );
}
