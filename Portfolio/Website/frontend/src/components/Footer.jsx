const SOCIALS = ["GitHub", "LinkedIn", "Read.cv", "X / Twitter"];

export function Footer() {
  return (
    <footer
      id="contact"
      className="footer-section"
      style={{
        borderTop: "1px solid var(--rule)",
        padding: "160px 0 56px",
        marginTop: 80,
      }}
    >
      <div className="container">
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: 28,
          }}
        >
          · Let's talk
        </div>

        <div
          style={{
            fontFamily: "Bricolage Grotesque, serif",
            fontWeight: 500,
            lineHeight: 1,
            fontSize: "clamp(48px, 8vw, 124px)",
            letterSpacing: "-0.035em",
            color: "var(--ink)",
          }}
        >
          Got an idea
          <br />
          <span
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--slate)",
            }}
          >
            worth
          </span>{" "}
          building?
        </div>

        <a
          href="mailto:hi@petercranston.dev"
          style={{
            display: "inline-block",
            marginTop: 44,
            fontFamily: "Bricolage Grotesque, serif",
            fontSize: "clamp(22px, 3vw, 36px)",
            fontWeight: 400,
            letterSpacing: "-0.015em",
            color: "var(--ink)",
            borderBottom: "1px solid var(--ink)",
            paddingBottom: 3,
            transition: "color 0.25s, border-color 0.25s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--slate)";
            e.currentTarget.style.borderColor = "var(--slate)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--ink)";
            e.currentTarget.style.borderColor = "var(--ink)";
          }}
        >
          petericranston@gmail.com →
        </a>

        <div
          style={{
            marginTop: 96,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 24,
            paddingTop: 28,
            borderTop: "1px solid var(--rule)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 28,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              flexWrap: "wrap",
              color: "var(--ink-soft)",
            }}
          >
            {SOCIALS.map((name) => (
              <a
                key={name}
                href="#"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--ink)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--ink-soft)")
                }
              >
                {name} ↗
              </a>
            ))}
          </div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.04em",
            }}
          >
            © 2026 Peter Cranston · Edinburgh
          </div>
        </div>
      </div>
    </footer>
  );
}
