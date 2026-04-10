import { useState, useEffect, useRef, useCallback } from "react";
import logo from "../../public/logo.png";

const NAV_ITEMS = ["Home", "About", "Services", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ctaHover, setCtaHover] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const pillRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);

  /* ── scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── mouse tracking for glow effects ── */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (navInnerRef.current) {
      const rect = navInnerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  /* ── sliding pill position ── */
  const target = hoverIdx ?? activeIdx;
  const el = itemRefs.current[target];
  const parent = pillRef.current;
  let pillStyle: React.CSSProperties = { opacity: 0 };
  if (el && parent) {
    const pRect = parent.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    pillStyle = {
      opacity: 1,
      width: eRect.width + 6,
      transform: `translateX(${eRect.left - pRect.left - 3}px)`,
      transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
    };
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        /* ── Root ── */
        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 18px 40px;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          font-family: 'Inter', sans-serif;
        }
        .nav-root.scrolled {
          padding: 10px 40px;
        }

        /* ── Inner container ── */
        .nav-inner {
          max-width: 1320px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          height: 68px;
          border-radius: 100px;
          position: relative;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-inner.scrolled {
          height: 58px;
          padding: 0 8px;
        }

        /* ── Mouse-follow glow on scrolled state ── */
        .nav-glow {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
          transition: opacity 0.4s ease;
          background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
          transform: translate(-50%, -50%);
        }
        .nav-inner.scrolled .nav-glow {
          opacity: 1;
        }

        /* ── Logo ── */
        .nav-logo {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          padding-left: 12px;
        }
        .nav-logo img {
          height: 44px;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          filter: brightness(1.1);
        }
        .scrolled .nav-logo img {
          height: 36px;
        }

        /* ── Center pill nav ── */
        .nav-center {
          position: relative;
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 5px 6px;
          overflow: hidden;
          border-radius: 100px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: all 0.4s ease;
        }
        .scrolled .nav-center {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.09);
        }

        /* sliding pill background */
        .nav-pill-bg {
          position: absolute;
          top: 5px;
          left: 0;
          height: calc(100% - 10px);
          border-radius: 100px;
          pointer-events: none;
          z-index: 0;
          background: rgba(255,255,255,0.09);
          border: 1px solid rgba(255,255,255,0.11);
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        /* nav link items */
        .nav-item {
          position: relative;
          z-index: 1;
          padding: 8px 22px;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          border-radius: 100px;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
          white-space: nowrap;
        }
        .nav-item:hover {
          color: rgba(255,255,255,0.88);
        }
        .nav-item.active {
          color: rgba(255,255,255,0.97);
          text-shadow: 0 0 20px rgba(255,255,255,0.15);
        }

        /* ── CTA Button — Animated gradient border ── */
        .nav-cta-wrap {
          position: relative;
          z-index: 2;
          margin-right: 6px;
          border-radius: 100px;
          padding: 1.5px;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.22) 0%,
            rgba(255,255,255,0.06) 40%,
            rgba(255,255,255,0.22) 100%
          );
          background-size: 250% 250%;
          animation: ctaBorderShift 4s ease-in-out infinite;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-cta-wrap:hover {
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.45) 0%,
            rgba(120,200,255,0.3) 30%,
            rgba(180,140,255,0.3) 60%,
            rgba(255,255,255,0.45) 100%
          );
          background-size: 300% 300%;
          animation: ctaBorderShift 2s ease-in-out infinite;
          box-shadow:
            0 0 30px rgba(140,180,255,0.12),
            0 0 60px rgba(140,180,255,0.06);
        }
        @keyframes ctaBorderShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .nav-cta {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 26px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.03em;
          color: #fff;
          background: rgba(12, 12, 14, 0.85);
          backdrop-filter: blur(12px);
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          overflow: hidden;
        }
        .nav-cta::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 200%; height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.06) 25%,
            rgba(255,255,255,0.12) 50%,
            rgba(255,255,255,0.06) 75%,
            transparent 100%
          );
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }
        .nav-cta:hover::before {
          transform: translateX(100%);
        }
        .nav-cta:hover {
          background: rgba(22, 22, 28, 0.9);
          transform: translateY(-1px);
          color: #fff;
        }

        /* CTA inner elements */
        .cta-dot-wrap {
          position: relative;
          width: 8px;
          height: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cta-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #34d399;
          position: relative;
          z-index: 1;
        }
        .cta-dot-ring {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1.5px solid rgba(52, 211, 153, 0.35);
          animation: ctaRingPulse 2.4s ease-in-out infinite;
        }
        @keyframes ctaRingPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.8); opacity: 0; }
        }

        .cta-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-cta:hover .cta-arrow {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.2);
          transform: translate(2px, -2px);
        }

        .cta-text {
          position: relative;
          z-index: 1;
        }

        /* ── Separator dots ── */
        .nav-sep {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          margin: 0 4px;
        }

        /* ── Mobile hamburger ── */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          z-index: 110;
          padding: 10px;
          background: none;
          border: none;
          position: relative;
        }
        .nav-hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: rgba(255,255,255,0.75);
          border-radius: 2px;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          transform-origin: center;
        }
        .nav-hamburger.open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
          background: #fff;
        }
        .nav-hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .nav-hamburger.open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
          background: #fff;
        }

        /* ── Mobile overlay ── */
        .nav-mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 99;
          background: rgba(6,6,8,0.92);
          backdrop-filter: blur(48px) saturate(1.2);
          -webkit-backdrop-filter: blur(48px) saturate(1.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-mobile-overlay.open {
          opacity: 1;
          pointer-events: all;
        }

        .nav-mobile-link {
          font-size: 32px;
          font-weight: 600;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          padding: 14px 40px;
          border-radius: 20px;
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.02em;
          transform: translateY(24px);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-mobile-overlay.open .nav-mobile-link {
          transform: translateY(0);
          opacity: 1;
        }
        .nav-mobile-link:nth-child(1) { transition-delay: 0.08s; }
        .nav-mobile-link:nth-child(2) { transition-delay: 0.14s; }
        .nav-mobile-link:nth-child(3) { transition-delay: 0.20s; }
        .nav-mobile-link:nth-child(4) { transition-delay: 0.26s; }
        .nav-mobile-link:hover,
        .nav-mobile-link.active {
          color: #fff;
          background: rgba(255,255,255,0.05);
        }

        .nav-mobile-cta-wrap {
          margin-top: 32px;
          transform: translateY(24px);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: 0.32s;
        }
        .nav-mobile-overlay.open .nav-mobile-cta-wrap {
          transform: translateY(0);
          opacity: 1;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .nav-root { padding: 10px 16px; }
          .nav-root.scrolled { padding: 6px 16px; }
          .nav-center { display: none; }
          .nav-cta-wrap { display: none; }
          .nav-hamburger { display: flex; }
        }
      `}</style>

      <header className={`nav-root${scrolled ? " scrolled" : ""}`}>
        <div
          className={`nav-inner${scrolled ? " scrolled" : ""}`}
          ref={navInnerRef}
          onMouseMove={handleMouseMove}
        >
          {/* Mouse-follow glow */}
          <div
            className="nav-glow"
            style={{ left: mousePos.x, top: mousePos.y }}
          />

          {/* ── LOGO ── */}
          <a href="#" className="nav-logo">
            <img src={logo} alt="Huespire" />
          </a>

          {/* ── CENTER NAV ── */}
          <div className="nav-center" ref={pillRef}>
            <div className="nav-pill-bg" style={pillStyle} />

            {NAV_ITEMS.map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={`nav-item${activeIdx === i ? " active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIdx(i);
                }}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
              >
                {item}
              </a>
            ))}
          </div>

          {/* ── CTA BUTTON ── */}
          <div
            className="nav-cta-wrap"
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
          >
            <button className="nav-cta" ref={ctaRef}>
              <span className="cta-dot-wrap">
                <span className="cta-dot" />
                <span className="cta-dot-ring" />
              </span>
              <span className="cta-text">Book a Call</span>
              <span className="cta-arrow">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                    transform: ctaHover ? "translate(1px, -1px)" : "none",
                  }}
                >
                  <line x1="2" y1="8" x2="8" y2="2" />
                  <polyline points="3.5,2 8,2 8,6.5" />
                </svg>
              </span>
            </button>
          </div>

          {/* ── HAMBURGER (mobile) ── */}
          <button
            className={`nav-hamburger${mobileOpen ? " open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* ── MOBILE OVERLAY ── */}
      <div className={`nav-mobile-overlay${mobileOpen ? " open" : ""}`}>
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={`nav-mobile-link${activeIdx === i ? " active" : ""}`}
            onClick={() => {
              setActiveIdx(i);
              setMobileOpen(false);
            }}
          >
            {item}
          </a>
        ))}
        <div className="nav-mobile-cta-wrap">
          <div className="nav-cta-wrap" style={{ animation: "none" }}>
            <button
              className="nav-cta"
              style={{ fontSize: "15px", padding: "14px 32px" }}
              onClick={() => setMobileOpen(false)}
            >
              <span className="cta-dot-wrap">
                <span className="cta-dot" />
                <span className="cta-dot-ring" />
              </span>
              <span className="cta-text">Book a Call</span>
              <span className="cta-arrow">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="2" y1="8" x2="8" y2="2" />
                  <polyline points="3.5,2 8,2 8,6.5" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
