"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "We Don’t Just Build.",
    desc: "We craft digital experiences that actually mean something.",
  },
  {
    title: "Design Meets Strategy.",
    desc: "Every pixel is backed by purpose, not guesswork.",
  },
  {
    title: "Built For Impact.",
    desc: "Performance, clarity, and identity — all in one place.",
  },
  {
    title: "This Is Huespire.",
    desc: "A creative partner for brands that want more than ordinary.",
  },
];

export default function AboutPinned() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ✅ LENIS
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".panel");

      panels.slice(0, -1).forEach((panel, i) => {
        const inner = panel.querySelector(".panel-inner") as HTMLElement;

        const panelHeight = inner.offsetHeight;
        const windowHeight = window.innerHeight;

        const difference = panelHeight - windowHeight;

        const fakeScrollRatio =
          difference > 0 ? difference / (difference + windowHeight) : 0;

        if (fakeScrollRatio) {
          panel.style.marginBottom = panelHeight * fakeScrollRatio + "px";
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "bottom bottom",
            end: () =>
              fakeScrollRatio ? `+=${inner.offsetHeight}` : "bottom top",
            scrub: true,
            pin: true,
            pinSpacing: false,
          },
        });

        // ✅ SCALE + FADE
        tl.fromTo(
          panel,
          { scale: 1, opacity: 1 },
          { scale: 0.7, opacity: 0.5, duration: 0.9 },
        ).to(panel, { opacity: 0, duration: 0.1 });

        // ✅ FIRST SECTION SPECIAL INTRO
        if (i === 0) {
          const heading = panel.querySelector(".about-heading");

          gsap.fromTo(
            heading,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              scrollTrigger: {
                trigger: panel,
                start: "top 80%",
              },
            },
          );

          gsap.fromTo(
            inner,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              delay: 0.2,
              scrollTrigger: {
                trigger: panel,
                start: "top 70%",
              },
            },
          );
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main
      ref={containerRef}
      className="bg-black text-white overflow-hidden font-sans"
    >
      <div className="mt-16 space-y-6">
        {sections.map((item, i) => (
          <section
            key={i}
            className="panel h-screen flex flex-col items-center justify-center px-6"
          >
            {/* ✅ ABOUT HEADING ONLY FIRST SECTION */}
            {i === 0 && (
              <h2 className="about-heading text-white  text-7xl  mb-4 tracking-widest font-bold">
                About Us
              </h2>
            )}

            <div className="panel-inner text-center max-w-5xl">
              <h1 className="text-[clamp(40px,8vw,120px)] font-extrabold leading-none mb-6">
                {item.title}
              </h1>

              <p className="text-[clamp(16px,2vw,24px)] text-zinc-400 max-w-xl mx-auto">
                {item.desc}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* ✅ FINAL SECTION (MATCHED FONT) */}
      <section className="min-h-screen flex items-center justify-center px-6 border-t border-white/10 font-sans">
        <div className="text-center max-w-3xl">
          <h2 className="text-[clamp(40px,8vw,120px)] font-extrabold leading-none mb-6">
            Ready to Work With Us?
          </h2>

          <p className="text-[clamp(16px,2vw,24px)] text-zinc-400 mb-8">
            Let’s build something meaningful together.
          </p>

          <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition">
            Get in Touch
          </button>
        </div>
      </section>
    </main>
  );
}
