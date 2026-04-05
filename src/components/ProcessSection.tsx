import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";

import type { ReactElement, ReactNode, RefObject } from "react";

import gsap from "gsap";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

// ─── Card ────────────────────────────────────────────────────────────────────

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, children, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={[
        "absolute top-1/2 left-1/2 rounded-3xl",
        "border border-white/10",
        "[transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden]",
        customClass ?? "",
        rest.className ?? "",
      ]
        .join(" ")
        .trim()}
    >
      {children}
    </div>
  ),
);
Card.displayName = "Card";

// ─── CardSwap internals ───────────────────────────────────────────────────────

type CardRef = RefObject<HTMLDivElement>;

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number,
): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) => {
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });
};

// ─── CardSwap ────────────────────────────────────────────────────────────────

const CardSwap: React.FC<CardSwapProps> = ({
  width = 680,
  height = 420,
  cardDistance = 70,
  verticalDistance = 70,
  delay = 4000,
  pauseOnHover = true,
  onCardClick,
  skewAmount = 4,
  easing = "elastic",
  children,
}) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children],
  );

  const refs = useMemo<CardRef[]>(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr.length],
  );

  const order = useRef<number[]>(
    Array.from({ length: childArr.length }, (_, i) => i),
  );

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | null>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;

    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(
          r.current,
          makeSlot(i, cardDistance, verticalDistance, total),
          skewAmount,
        );
      }
    });

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=700",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);

      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;

        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);

        tl.set(el, { zIndex: slot.zIndex }, "promote");

        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`,
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length,
      );

      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);

      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return",
      );

      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return",
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover && container.current) {
      const node = container.current;

      const pause = () => {
        tlRef.current?.pause();
        if (intervalRef.current) clearInterval(intervalRef.current);
      };

      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };

      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);

      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e: React.MouseEvent<HTMLDivElement>) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          },
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child,
  );

  return (
    <div
      ref={container}
      className="relative [perspective:1200px] overflow-visible"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

// ─── Data ────────────────────────────────────────────────────────────────────
const cardData = [
  {
    icon: "📊",
    label: "Step 01",
    title: "Data-Driven Audit",
    body: "We analyse every touchpoint — traffic, conversion funnels, and revenue leaks — to build a complete picture of where growth is being left on the table.",
    metric: "2.4×",
    metricLabel: "avg. conversion lift",
  },
  {
    icon: "🎯",
    label: "Step 02",
    title: "Precision Targeting",
    body: "Hyper-segmented campaigns reach the exact audience at the exact moment — eliminating wasted spend and maximising every dollar of ad budget.",
    metric: "89%",
    metricLabel: "audience accuracy",
  },
  {
    icon: "🚀",
    label: "Step 03",
    title: "Compounding Growth",
    body: "Each iteration feeds the next — creating a self-reinforcing loop of data, optimisation, and compounding revenue that accelerates month over month.",
    metric: "3.1×",
    metricLabel: "YoY revenue growth",
  },
];

// ─── Section ─────────────────────────────────────────────────────────────────

const ProcessSection: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      {/* Extra wide wrapper to give stacked cards visual room */}
      <div className="flex flex-col lg:flex-row items-center gap-20 max-w-6xl w-full">
        {/* Left copy */}
        <div className="flex-1 space-y-6 max-w-md">
          <span
            style={{
              display: "inline-block",
              padding: "5px 12px",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.38)",
              borderRadius: "2px",
              width: "fit-content",
            }}
          >
            Our Process
          </span>
          <h2 className="text-5xl font-bold leading-tight">
            Built for
            <br />
            exponential
            <br />
            results.
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Three compounding steps that turn raw data into unstoppable growth
            engines for ambitious brands.
          </p>
          <div className="flex gap-6 pt-2">
            {cardData.map((c, i) => (
              <div key={i} className="flex flex-col gap-2 w-full">
                {/* Metric */}
                <span className="text-2xl font-bold text-white">
                  {c.metric}
                </span>

                {/* Label */}
                <span className="text-white/60 text-xs">{c.metricLabel}</span>

                {/* Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{
                      width: i === 0 ? "80%" : i === 1 ? "65%" : "90%", // adjust per metric
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right card stack — extra offset so back cards peek prominently */}
        <div
          className="flex-1 flex justify-center items-center"
          style={{ minHeight: 520 }}
        >
          <CardSwap
            width={560}
            height={380}
            cardDistance={72}
            verticalDistance={72}
            skewAmount={4}
            delay={3500}
            easing="elastic"
          >
            {cardData.map((c, i) => (
              <Card
                key={i}
                customClass={`bg-gradient-to-br ${c.accent} backdrop-blur-xl border ${c.border} overflow-hidden`}
              >
                {/* Subtle noise texture overlay */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: "200px 200px",
                  }}
                />

                <div className="relative z-10 flex flex-col h-full p-9 gap-6">
                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full ${c.tag}`}
                    >
                      {c.label}
                    </span>
                    <span className="text-4xl">{c.icon}</span>
                  </div>

                  {/* Middle content */}
                  <div className="flex-1 flex flex-col justify-center gap-3">
                    <h3
                      className="text-3xl font-bold leading-tight text-white"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {c.title}
                    </h3>
                    <p className="text-white/55 text-base leading-relaxed">
                      {c.body}
                    </p>
                  </div>

                  {/* Bottom metric bar */}
                  <div className="flex items-end justify-between border-t border-white/10 pt-5">
                    <div>
                      <p className="text-3xl font-bold text-white">
                        {c.metric}
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">
                        {c.metricLabel}
                      </p>
                    </div>
                    <button className="text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1 group">
                      Learn more
                      <span className="group-hover:translate-x-0.5 transition-transform inline-block">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>

      {/* Google Font for Syne */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');`}</style>
    </section>
  );
};

export default ProcessSection;
