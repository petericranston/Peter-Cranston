import { useState, useEffect } from "react";
import { useScrollY } from "../hooks/useScrollY";

const ROTATING = ["developer", "designer", "builder"];

export function Hero() {
  const y = useScrollY();
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setWordIdx((i) => (i + 1) % ROTATING.length),
      2200,
    );
    return () => clearInterval(t);
  }, []);

  const nameTranslate = -y * 0.1;
  const opacity = Math.max(0, Math.min(1, 1 - y / 700));

  return (
    <section
      className="hero-section"
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "140px 0 100px",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 12,
            color: "var(--ink-soft)",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 40,
            letterSpacing: "0.02em",
            opacity,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "var(--slate)",
              animation: "pulse 2.2s infinite",
              flexShrink: 0,
            }}
          />
          Available for freelance · June 2026
        </div>

        <h1
          style={{
            fontFamily: "Bricolage Grotesque, serif",
            fontWeight: 500,
            fontSize: "clamp(56px, 10vw, 156px)",
            lineHeight: 0.92,
            letterSpacing: "-0.035em",
            color: "var(--ink)",
            transform: `translateY(${nameTranslate}px)`,
            opacity,
          }}
        >
          Peter
          <br />
          Cranston<span style={{ color: "var(--slate)" }}>.</span>
        </h1>

        <p
          style={{
            marginTop: 36,
            maxWidth: 580,
            fontSize: 19,
            lineHeight: 1.45,
            color: "var(--ink-soft)",
            fontWeight: 400,
            opacity,
          }}
        >
          Software{" "}
          <span
            key={wordIdx}
            style={{
              display: "inline-block",
              minWidth: 110,
              color: "var(--slate)",
              fontStyle: "italic",
              fontFamily: "Bricolage Grotesque, serif",
              fontWeight: 500,
              animation: "wordFadeIn 0.35s cubic-bezier(.2,.7,.2,1) forwards",
            }}
          >
            {ROTATING[wordIdx]}
          </span>{" "}
          building thoughtful, useful things at the seam of{" "}
          <span
            style={{
              fontStyle: "italic",
              fontFamily: "Bricolage Grotesque, serif",
              fontWeight: 500,
              color: "var(--ink)",
            }}
          >
            code
          </span>{" "}
          and{" "}
          <span
            style={{
              fontStyle: "italic",
              fontFamily: "Bricolage Grotesque, serif",
              fontWeight: 500,
              color: "var(--ink)",
            }}
          >
            design
          </span>
          .
        </p>

        <div
          style={{
            marginTop: 72,
            display: "flex",
            gap: 56,
            flexWrap: "wrap",
            opacity,
          }}
        >
          {[
            { label: "Based in", value: "Crowthorne, UK" },
            { label: "Currently", value: "Shipping side-projects" },
            { label: "Stack", value: "React · JS · Node · C++" },
          ].map(({ label, value }) => (
            <div key={label}>
              <span
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--muted)",
                }}
              >
                {label}
              </span>
              <span style={{ fontSize: 14, color: "var(--ink)" }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="scroll-cue"
        style={{
          position: "absolute",
          bottom: 32,
          left: 40,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 11,
          color: "var(--muted)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          letterSpacing: "0.1em",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 32,
            height: 1,
            background: "var(--ink-soft)",
            transformOrigin: "left",
            animation: "cueLine 2.4s ease-in-out infinite",
          }}
        />
        SCROLL
      </div>
    </section>
  );
}
