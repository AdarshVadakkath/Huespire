"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const infoItemsRef = useRef<HTMLDivElement>(null);
  const marqueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading split animation
      const chars = headingRef.current?.querySelectorAll(".char");
      if (chars) {
        gsap.fromTo(
          chars,
          { y: 120, opacity: 0, skewY: 8 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 1,
            stagger: 0.04,
            ease: "expo.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          },
        );
      }

      // Line expand
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 90%",
          },
        },
      );

      // Left panel
      gsap.fromTo(
        leftRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 80%",
          },
        },
      );

      // Right panel
      gsap.fromTo(
        rightRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: rightRef.current,
            start: "top 80%",
          },
        },
      );

      // Info items stagger
      const items = infoItemsRef.current?.querySelectorAll(".info-item");
      if (items) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: {
              trigger: infoItemsRef.current,
              start: "top 80%",
            },
          },
        );
      }

      // Marquee infinite scroll
      if (marqueRef.current) {
        gsap.to(marqueRef.current.querySelector(".marquee-track"), {
          x: "-50%",
          duration: 18,
          ease: "none",
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingText = "Let's Work Together";
  const words = headingText.split(" ");

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Google Fonts */}
      <style>{`
        .mono { font-family: 'Inter', sans-serif; }

        input::placeholder,
        textarea::placeholder {
          color: rgba(255,255,255,0.2);
        }

        input, textarea, select {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
        }

        .field-wrap input:focus ~ .field-border,
        .field-wrap textarea:focus ~ .field-border,
        .field-wrap select:focus ~ .field-border {
          transform: scaleX(1);
        }

        .field-border {
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }

        .submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: white;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
          z-index: 0;
        }

        .submit-btn:hover::after {
          transform: scaleX(1);
        }

        .submit-btn span {
          position: relative;
          z-index: 1;
          transition: color 0.5s ease;
        }

        .submit-btn:hover span {
          color: black;
        }

        .info-link {
          position: relative;
          display: inline-block;
        }

        .info-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background: white;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }

        .info-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .char {
          display: inline-block;
          overflow: hidden;
        }

        select option {
          background: black;
          color: white;
        }

        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-size: 256px 256px;
        }
      `}</style>

      {/* Noise texture overlay */}
      <div
        className="noise-overlay pointer-events-none fixed inset-0 opacity-[0.025] z-50"
        aria-hidden
      />

      {/* Top marquee */}
      <div
        ref={marqueRef}
        className="border-b border-white/10 overflow-hidden py-3"
      >
        <div
          className="marquee-track flex gap-0 whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="mono text-[11px] tracking-[0.3em] uppercase text-white/20 px-10"
            >
              Contact Us&nbsp;&nbsp;✦&nbsp;&nbsp;Let's
              Talk&nbsp;&nbsp;✦&nbsp;&nbsp;Start a
              Project&nbsp;&nbsp;✦&nbsp;&nbsp;Get in Touch&nbsp;&nbsp;✦
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 pt-20 pb-32">
        {/* Big heading */}
        <div className="mb-4">
          <p className="mono text-[11px] tracking-[0.4em] uppercase text-white/30 mb-6">
            — 04 / Contact
          </p>
          <h2
            ref={headingRef}
            className="text-[clamp(52px,9vw,140px)] font-normal leading-[0.9] tracking-tight mb-0"
            style={{ overflow: "hidden" }}
          >
            {words.map((word, wi) => (
              <span
                key={wi}
                className="inline-block mr-[0.25em] last:mr-0"
                style={{ overflow: "hidden", verticalAlign: "bottom" }}
              >
                {word.split("").map((ch, ci) => (
                  <span
                    key={ci}
                    className="char"
                    style={{ display: "inline-block" }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>

        {/* Divider */}
        <div
          ref={lineRef}
          className="w-full h-px bg-white/20 mb-20 origin-left"
        />

        {/* Two column layout */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-20 xl:gap-32 items-start">
          {/* LEFT */}
          <div ref={leftRef}>
            <p className="mono text-white/40 text-[13px] leading-relaxed mb-16 max-w-xs">
              Have a project in mind? We turn ambitions into extraordinary
              digital realities. Reach out — we respond within 24 hours.
            </p>

            {/* Contact info */}
            <div ref={infoItemsRef} className="space-y-0">
              {[
                {
                  label: "Email",
                  value: "hello@huespire.com",
                  href: "mailto:hello@huespire.com",
                },
                {
                  label: "Phone",
                  value: "+1 (234) 567-890",
                  href: "tel:+1234567890",
                },
                { label: "Location", value: "Global — Remote", href: null },
              ].map((item) => (
                <div
                  key={item.label}
                  className="info-item border-t border-white/10 py-6 flex justify-between items-center group"
                >
                  <span className="mono text-[11px] tracking-[0.3em] uppercase text-white/30">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="info-link text-white text-[15px] tracking-tight"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span
                      className="text-white text-[15px] tracking-tight"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
              <div className="info-item border-t border-b border-white/10 py-6" />
            </div>

            {/* Strategy call */}
            <div className="mt-14">
              <p className="mono text-[11px] tracking-[0.3em] uppercase text-white/30 mb-4">
                Prefer to talk?
              </p>
              <p
                className="text-white/70 text-2xl mb-6 leading-snug"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Book a free 30-minute
                <br />
                <em>strategy call.</em>
              </p>
              <button className="group relative mono text-[12px] tracking-[0.25em] uppercase border border-white/30 px-7 py-4 overflow-hidden hover:border-white transition-colors duration-500">
                <span className="relative z-10 text-white group-hover:text-black transition-colors duration-500">
                  Schedule Now →
                </span>
                <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-0" />
              </button>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div ref={rightRef}>
            {/* Form border frame */}
            <div className="relative border border-white/10 p-10 md:p-12">
              {/* Corner decorations */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white" />

              <p className="mono text-[11px] tracking-[0.3em] uppercase text-white/30 mb-8">
                Send a Message
              </p>

              <form className="space-y-8">
                {/* Row: Name + Email */}
                <div className="grid sm:grid-cols-2 gap-8">
                  {[
                    {
                      label: "Your Name *",
                      type: "text",
                      placeholder: "John Doe",
                    },
                    {
                      label: "Email Address *",
                      type: "email",
                      placeholder: "john@company.com",
                    },
                  ].map((f) => (
                    <div key={f.label} className="field-wrap relative">
                      <label className="mono text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-3">
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        className="w-full bg-transparent border-b border-white/15 pb-3 text-white focus:outline-none focus:border-white transition-colors duration-300"
                      />
                      <div className="field-border absolute bottom-0 left-0 right-0 h-px bg-white" />
                    </div>
                  ))}
                </div>

                {/* Company */}
                <div className="field-wrap relative">
                  <label className="mono text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-3">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Company"
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white focus:outline-none focus:border-white transition-colors duration-300"
                  />
                  <div className="field-border absolute bottom-0 left-0 right-0 h-px bg-white" />
                </div>

                {/* Row: Service + Budget */}
                <div className="grid sm:grid-cols-2 gap-8">
                  {[
                    {
                      label: "Service *",
                      options: [
                        "Select a service",
                        "Web Design",
                        "Branding",
                        "Development",
                        "Marketing",
                      ],
                    },
                    {
                      label: "Budget",
                      options: [
                        "Select budget",
                        "$1k – $5k",
                        "$5k – $10k",
                        "$10k+",
                      ],
                    },
                  ].map((f) => (
                    <div key={f.label} className="field-wrap relative">
                      <label className="mono text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-3">
                        {f.label}
                      </label>
                      <select className="w-full bg-transparent border-b border-white/15 pb-3 text-white/60 focus:outline-none focus:text-white focus:border-white transition-colors duration-300 appearance-none cursor-pointer">
                        {f.options.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                      <div className="field-border absolute bottom-0 left-0 right-0 h-px bg-white" />
                    </div>
                  ))}
                </div>

                {/* Message */}
                <div className="field-wrap relative">
                  <label className="mono text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-3">
                    Project Details *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project, goals, and timeline..."
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white focus:outline-none focus:border-white transition-colors duration-300 resize-none"
                  />
                  <div className="field-border absolute bottom-0 left-0 right-0 h-px bg-white" />
                </div>

                {/* Submit */}
                <div className="pt-2 flex items-center justify-between gap-6">
                  <p className="mono text-[10px] text-white/20 leading-relaxed max-w-[200px]">
                    By submitting you agree to our privacy policy.
                  </p>
                  <button
                    type="submit"
                    className="submit-btn relative border border-white px-10 py-4 overflow-hidden"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <span className="mono text-[11px] tracking-[0.3em] uppercase text-white">
                      Send →
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/10 px-8 md:px-16 py-5 flex justify-between items-center">
        <p className="mono text-[10px] tracking-[0.3em] uppercase text-white/20">
          © 2025 Huespire
        </p>
        <p className="mono text-[10px] tracking-[0.3em] uppercase text-white/20">
          All rights reserved
        </p>
      </div>
    </section>
  );
}
