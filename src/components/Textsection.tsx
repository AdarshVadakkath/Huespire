import React from "react";

type WordStyle = "solid" | "outlined" | "accent";

const words1: string[] = [
  "Growth",
  "Scale",
  "Momentum",
  "Acceleration",
  "Amplify",
  "Expand",
];

const words2: string[] = [
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
          padding: 20px 0;
          overflow: hidden;
          position: relative;
        }

        .marquee-section::before,
        .marquee-section::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          z-index: 3;
          pointer-events: none;
        }

        .marquee-section::before {
          top: 0;
          height: 60px;
          background: linear-gradient(to bottom, #000, transparent);
        }

        .marquee-section::after {
          bottom: 0;
          height: 80px;
          background: linear-gradient(to bottom, transparent, #000);
        }

        .marquee-label {
          text-align: center;
          font-size: 10px;
          letter-spacing: 0.3em;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          margin-bottom: 20px;
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
          width: 100px;
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

        .word {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 56px;
          letter-spacing: 0.04em;
          padding: 0 20px;
          display: inline-block;
          color: rgba(255,255,255,0.85);
          line-height: 1;
        }

        .word.sm {
          font-size: 36px;
          color: rgba(255,255,255,0.35);
        }

        .word.outlined {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.25);
          color: transparent;
        }

        .word.sm.outlined {
          -webkit-text-stroke: 1px rgba(255,255,255,0.15);
          color: transparent;
        }

        .word.accent {
          color: #4fc3f7;
          text-shadow: 0 0 30px rgba(79,195,247,0.5);
        }

        .sep {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          flex-shrink: 0;
          vertical-align: middle;
        }

        .sep.bright {
          background: #4fc3f7;
          box-shadow: 0 0 6px #4fc3f7;
        }

        .divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255,255,255,0.08),
            transparent
          );
          margin: 12px 0;
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
