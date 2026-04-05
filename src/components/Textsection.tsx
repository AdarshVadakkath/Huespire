import React from "react";

type WordStyle = "solid" | "outlined" | "accent";

const words1 = [
  "Growth",
  "Scale",
  "Momentum",
  "Acceleration",
  "Amplify",
  "Expand",
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
  "solid",
  "outlined",
  "solid",
  "outlined",
  "solid",
  "outlined",
];

function Row1Item({ word, style }: { word: string; style: WordStyle }) {
  const isBright = style === "accent" || style === "solid";

  return (
    <>
      <span
        className={`word ${
          style === "outlined" ? "outlined" : style === "accent" ? "accent" : ""
        }`}
      >
        {word}
      </span>
      <span className={`sep ${isBright ? "bright" : ""}`} />
    </>
  );
}

function Row2Item({ word, style }: { word: string; style: WordStyle }) {
  const isBright = style === "outlined";

  return (
    <>
      <span className={`word sm ${style === "outlined" ? "outlined" : ""}`}>
        {word}
      </span>
      <span className={`sep ${isBright ? "bright" : ""}`} />
    </>
  );
}

export default function MarqueeSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        .marquee-section {
          background: #000;
          width: 100%;
          padding: 60px 0; /* 👈 more breathing space */
          overflow: hidden;
          position: relative;
        }

        /* ✅ TOP FADE (stronger & smoother) */
        .marquee-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.8) 40%, transparent 100%);
          z-index: 3;
          pointer-events: none;
        }

        /* ✅ BOTTOM FADE (enhanced, smoother) */
        .marquee-section::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 60%, #000 100%);
          z-index: 3;
          pointer-events: none;
        }

        .marquee-label {
          text-align: center;
          font-size: 12px;
          letter-spacing: 0.4em;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          margin-bottom: 30px;
        }

        .marquee-track-wrap {
          overflow: hidden;
          position: relative;
        }

        .marquee-track-wrap::before,
        .marquee-track-wrap::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }

        .marquee-track-wrap::before {
          left: 0;
          background: linear-gradient(to right, #000, transparent);
        }

        .marquee-track-wrap::after {
          right: 0;
          background: linear-gradient(to left, #000, transparent);
        }

        .marquee-track {
          display: flex;
          align-items: center;
          white-space: nowrap;
          animation: scroll-left 22s linear infinite;
        }

        .marquee-track.reverse {
          animation: scroll-right 26s linear infinite;
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        /* ✅ BIGGER TEXT */
        .word {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 90px; /* 👈 increased */
          letter-spacing: 0.05em;
          padding: 0 28px;
          display: inline-block;
          color: rgba(255,255,255,0.9);
          line-height: 1;
        }

        .word.sm {
          font-size: 60px; /* 👈 increased */
          color: rgba(255,255,255,0.4);
        }

        .word.outlined {
          -webkit-text-stroke: 2px rgba(255,255,255,0.25);
          color: transparent;
        }

        .word.sm.outlined {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.2);
          color: transparent;
        }

        .word.accent {
          color: #4fc3f7;
          text-shadow: 0 0 40px rgba(79,195,247,0.6);
        }

        .sep {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          flex-shrink: 0;
          vertical-align: middle;
        }

        .sep.bright {
          background: #4fc3f7;
          box-shadow: 0 0 8px #4fc3f7;
        }

        .divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255,255,255,0.1),
            transparent
          );
          margin: 20px 0;
        }
      `}</style>

      <section className="marquee-section">
        <p className="marquee-label">Powering results</p>

        {/* Row 1 */}
        <div className="marquee-track-wrap">
          <div className="marquee-track">
            {[...words1, ...words1].map((word, i) => (
              <Row1Item
                key={i}
                word={word}
                style={wordStyles1[i % words1.length]}
              />
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* Row 2 */}
        <div className="marquee-track-wrap">
          <div className="marquee-track reverse">
            {[...words2, ...words2].map((word, i) => (
              <Row2Item
                key={i}
                word={word}
                style={wordStyles2[i % words2.length]}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
