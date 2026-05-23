import { useEffect, useRef } from "react";

const WORDS = ["design", "engineering", "prototypes", "shipping", "systems"];

export function Marquee() {
  const trackRef = useRef(null);
  const offset = useRef(0);
  const speedBoost = useRef(0);
  const lastY = useRef(0);
  const SPEED_BASE = 0.35;

  useEffect(() => {
    let raf;
    const tick = () => {
      offset.current -= SPEED_BASE + speedBoost.current;
      if (trackRef.current) {
        const w = trackRef.current.scrollWidth / 2;
        if (-offset.current >= w) offset.current += w;
        trackRef.current.style.transform = `translateX(${offset.current}px)`;
      }
      speedBoost.current *= 0.92;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onScroll = () => {
      const y = window.scrollY;
      const dy = Math.abs(y - lastY.current);
      speedBoost.current = Math.min(3, speedBoost.current + dy * 0.02);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const items = [...WORDS, ...WORDS];

  return (
    <div
      style={{
        padding: "36px 0",
        overflow: "hidden",
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
        background: "var(--cream-2)",
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: 56,
          whiteSpace: "nowrap",
          fontFamily: "Bricolage Grotesque, serif",
          fontWeight: 400,
          fontSize: "clamp(22px, 3vw, 38px)",
          letterSpacing: "-0.015em",
          color: "var(--ink-soft)",
          willChange: "transform",
        }}
      >
        {items.map((word, i) => (
          <span
            key={i}
            style={{ display: "inline-flex", alignItems: "center", gap: 56 }}
          >
            <span
              style={
                i % 3 === 1
                  ? { fontStyle: "italic", color: "var(--ink)" }
                  : undefined
              }
            >
              {word}
            </span>
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "var(--slate)",
                opacity: 0.7,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
