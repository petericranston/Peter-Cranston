export function About() {
  return (
    <section
      id="about"
      style={{
        borderTop: "1px solid var(--rule)",
        padding: "120px 0",
      }}
    >
      <div
        className="container about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "start",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--muted)",
              marginBottom: 32,
            }}
          >
            About
          </div>
          <h2
            style={{
              fontFamily: "Bricolage Grotesque, serif",
              fontWeight: 500,
              fontSize: "clamp(32px, 4vw, 54px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
            }}
          >
            I build things that feel good to use.
          </h2>
        </div>

        <div
          style={{
            paddingTop: 8,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            fontSize: 17,
            lineHeight: 1.65,
            color: "var(--ink-soft)",
          }}
        >
          <p>
            I'm a software developer based in Crowthorne, UK. I care about the
            space where engineering meets design — the part where the right
            decision isn't obvious and both disciplines have something to say.
          </p>
          <p>
            Most of my work lives in the React and Node ecosystem. I also write
            C++ for lower-level projects. I like shipping fast, building in the
            open, and working with people who care about the details.
          </p>
          <p>
            Currently shipping side-projects and available for freelance work
            from{" "}
            <span style={{ color: "var(--ink)", fontStyle: "italic" }}>
              June 2026
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
