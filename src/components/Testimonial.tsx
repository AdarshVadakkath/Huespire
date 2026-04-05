"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  initials: string;
  quote: string;
  name: string;
  role: string;
  index: string;
}

const testimonials: Testimonial[] = [
  {
    initials: "MR",
    quote:
      "The AI automation workflows they built for us saved over 20 hours per week. Their team is responsive, innovative, and genuinely cares about our success.",
    name: "Michael Ross",
    role: "Founder, ScaleUp",
    index: "01 / 03",
  },
  {
    initials: "SK",
    quote:
      "Huespire transformed our online presence completely. Our website conversions increased by 340% within the first quarter. They truly understand performance marketing.",
    name: "Sarah Kim",
    role: "CEO, TechFlow",
    index: "02 / 03",
  },
  {
    initials: "EL",
    quote:
      "Best agency decision we ever made. Their paid ads strategy delivered 5x ROAS consistently. The reporting dashboard gives us real-time visibility into everything.",
    name: "Emma Liu",
    role: "CMO, Brandify",
    index: "03 / 03",
  },
];

const Stars = () => (
  <div className="flex gap-1 mb-5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className="w-3 h-3 opacity-60"
        viewBox="0 0 24 24"
        fill="white"
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))}
  </div>
);

interface CardProps {
  testimonial: Testimonial;
  isMain?: boolean;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

const TestimonialCard = ({
  testimonial,
  isMain = false,
  cardRef,
}: CardProps) => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const quoteMarkRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(quoteMarkRef.current, {
      y: -10,
      rotate: -5,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(avatarRef.current, {
      scale: 1.08,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(quoteMarkRef.current, {
      y: 0,
      rotate: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });
    gsap.to(avatarRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden border border-white/8 rounded-sm cursor-default
                 bg-white/[0.03] transition-colors duration-400
                 hover:bg-white/[0.05] hover:border-white/15 group"
      style={{ padding: isMain ? "52px 48px 48px" : "44px 40px 44px" }}
    >
      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Quote Icon (RIGHT SIDE) */}
      <div
        ref={quoteMarkRef}
        className="absolute top-6 right-8 pointer-events-none"
      >
        <Quote
          strokeWidth={1.2}
          className="text-white/[0.06]"
          style={{
            width: isMain ? "120px" : "90px",
            height: isMain ? "120px" : "90px",
          }}
        />
      </div>

      <Stars />

      <p
        className="relative z-10 font-light leading-relaxed text-white/80 mb-10"
        style={{
          fontSize: isMain ? "22px" : "17px",
          lineHeight: isMain ? "1.65" : "1.75",
          maxWidth: isMain ? "700px" : undefined,
        }}
      >
        {testimonial.quote}
      </p>

      <div className="relative z-10 flex items-center gap-4">
        <div
          ref={avatarRef}
          className="flex-shrink-0 rounded-full bg-white/10 border border-white/15 flex items-center justify-center"
          style={{
            width: isMain ? "52px" : "44px",
            height: isMain ? "52px" : "44px",
            fontSize: isMain ? "14px" : "13px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.8)",
            letterSpacing: "0.05em",
          }}
        >
          {testimonial.initials}
        </div>
        <div>
          <p className="text-sm font-medium text-white tracking-wide">
            {testimonial.name}
          </p>
          <p className="text-xs text-white/35 mt-0.5 tracking-widest">
            {testimonial.role}
          </p>
        </div>
      </div>

      {/* Corner index */}
      <span className="absolute bottom-5 right-6 text-[11px] text-white/[0.08] font-medium tracking-widest">
        {testimonial.index}
      </span>
    </div>
  );
};

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const preLabelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([preLabelRef.current, headingRef.current], {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(dividerRef.current, {
        scaleX: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(subheadingRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3,
      });

      gsap.from(mainCardRef.current, {
        opacity: 0,
        y: 80,
        duration: 1,
        delay: 0.5,
      });

      gsap.from([leftCardRef.current, rightCardRef.current], {
        opacity: 0,
        x: (i) => (i === 0 ? -60 : 60),
        duration: 1,
        stagger: 0.2,
        delay: 0.7,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-10 py-28 min-h-screen"
    >
      <div className="text-center mb-20">
        <span
          ref={preLabelRef}
          className="text-xs tracking-[0.3em] text-white/30"
        >
          TESTIMONIALS
        </span>

        <h2
          ref={headingRef}
          className="text-white font-black mt-6 mb-6"
          style={{ fontSize: "clamp(80px, 10vw, 128px)" }}
        >
          What Our Clients Say
        </h2>

        <div
          ref={dividerRef}
          className="mx-auto w-10 h-[2px] bg-white/20 mb-6"
        />

        <p ref={subheadingRef} className="text-white/40 max-w-md mx-auto">
          Don’t just take our word for it. Here’s what founders say.
        </p>
      </div>

      <div className="grid gap-5 max-w-5xl mx-auto grid-cols-2">
        <div className="col-span-2">
          <TestimonialCard
            testimonial={testimonials[0]}
            isMain
            cardRef={mainCardRef}
          />
        </div>

        <TestimonialCard testimonial={testimonials[1]} cardRef={leftCardRef} />
        <TestimonialCard testimonial={testimonials[2]} cardRef={rightCardRef} />
      </div>
    </section>
  );
}
