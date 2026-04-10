import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const handleHover = () => {
      gsap.to(cursor, { scale: 1.8, backgroundColor: "rgba(255,255,255,0.1)", duration: 0.3 });
    };

    const handleLeave = () => {
      gsap.to(cursor, { scale: 1, backgroundColor: "transparent", duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Re-attach hover listeners periodically for dynamically added elements
    const interval = setInterval(() => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleHover, { once: true });
        el.addEventListener("mouseleave", handleLeave, { once: true });
      });
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
        #custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 36px;
          height: 36px;
          border: 1.5px solid rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          pointer-events: none;
          z-index: 999999;
          transition: width 0.3s, height 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #custom-cursor::after {
          content: '';
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
        }
      `}</style>
      <div id="custom-cursor" ref={cursorRef} />
    </>
  );
};

export default Cursor;
