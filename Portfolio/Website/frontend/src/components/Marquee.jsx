import { useEffect, useRef } from "react";

const WORDS = ["design", "engineering", "prototypes", "shipping", "systems"];

export function Marquee() {
  const trackRef = useRef(null);
  const firstRepeatRef = useRef(null);
  const offset = useRef(0);
  const speedBoost = useRef(0);
  const lastY = useRef(0);
  const loopWidth = useRef(0);
  const rafRef = useRef(null);
  const SPEED_BASE = 0.35;

  useEffect(() => {
    let cancelled = false;

    const measure = () => {
      if (!trackRef.current || !firstRepeatRef.current) return;
      loopWidth.current =
        firstRepeatRef.current.getBoundingClientRect().left -
        trackRef.current.getBoundingClientRect().left;
    };

    const tick = () => {
      if (!trackRef.current) return;
      offset.current -= SPEED_BASE + speedBoost.current;
      if (loopWidth.current > 0 && -offset.current >= loopWidth.current) {
        offset.current += loopWidth.current;
      }
      trackRef.current.style.transform = `translateX(${offset.current}px)`;
      speedBoost.current *= 0.92;
      rafRef.current = requestAnimationFrame(tick);
    };

    document.fonts.ready.then(() => {
      if (cancelled) return;
      measure();
      rafRef.current = requestAnimationFrame(tick);
    });

    const onScroll = () => {
      const y = window.scrollY;
      const dy = Math.abs(y - lastY.current);
      speedBoost.current = Math.min(3, speedBoost.current + dy * 0.02);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const items = Array.from({ length: 8 }, () => WORDS).flat();

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
            ref={i === WORDS.length ? firstRepeatRef : undefined}
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
