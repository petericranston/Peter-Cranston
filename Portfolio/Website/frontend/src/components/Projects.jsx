import { useRef } from "react";
import { useInView } from "../hooks/useInView";
import { useElementProgress } from "../hooks/useElementProgress";
import { DashboardMock } from "./mocks/DashboardMock";
import { MobileMock } from "./mocks/MobileMock";
import { WipMock } from "./mocks/WipMock";

const PROJECTS = [
  {
    num: "01",
    name: "GitVitals",
    tag: "Codebase health, at a glance.",
    blurb:
      "Scores any GitHub repo 0–100 across commit frequency, contributor spread, and code cleanliness — then layers in Claude-powered file analysis so you can see not just how active a repo is, but whether the code inside it is any good.",
    accent: "#6E7E92",
    stack: [
      "React",
      "JS",
      "GitHub API",
      "Node + Express",
      "ReCharts",
      "Claude API",
    ],
    year: "2026",
    role: "Solo · Design + Engineering",
    href: "https://gitvitals-ten-tau.vercel.app",
    placeholder: "dashboard",
  },
  {
    num: "02",
    name: "FreshTrack",
    tag: "Scan a receipt. Never waste food again.",
    blurb:
      "Point your camera at a grocery receipt and GPT-4o extracts every item, predicts expiry dates, and files it into your kitchen. When things are about to go off, it generates three recipes that use exactly what needs eating.",
    accent: "#919E89",
    stack: ["React Native", "Expo", "MongoDB", "OpenAI API"],
    year: "2026",
    role: "Small Team · Engineering",
    href: "https://freshtrack-virid.vercel.app",
    placeholder: "mobile-app",
  },
  {
    num: "03",
    name: "Currently building",
    tag: "A small thing, probably useful.",
    blurb:
      "Working on something new. Follow along on GitHub, or say hi if you'd like to be the first to try it.",
    accent: "#A78268",
    stack: ["stay", "tuned"],
    year: "2026",
    role: "In progress",
    href: "#",
    placeholder: "wip",
    teaser: true,
  },
];

function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
      <path
        d="M2 7 H 12 M 8 3 L 12 7 L 8 11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectMock({ placeholder, accent }) {
  if (placeholder === "dashboard") return <DashboardMock accent={accent} />;
  if (placeholder === "mobile-app") return <MobileMock accent={accent} />;
  return <WipMock accent={accent} />;
}

function ProjectScene({ project }) {
  const ref = useRef(null);
  const inView = useInView(ref, 0.12);
  const progress = useElementProgress(ref);
  const imgY = (progress - 0.5) * -40;

  return (
    <section
      ref={ref}
      className="project-section"
      style={{
        borderTop: "1px solid var(--rule)",
        padding: "80px 0",
        position: "relative",
      }}
    >
      <div
        className="container project-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
          gap: 80,
          alignItems: "start",
        }}
      >
        {/* Left — sticky info */}
        <div
          className="project-left-sticky"
          style={{
            position: "sticky",
            top: 120,
            alignSelf: "start",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--muted)",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: 2,
                background: project.accent,
              }}
            />
            <span>Project {project.num} / 03</span>
          </div>

          <h3
            style={{
              fontFamily: "Bricolage Grotesque, serif",
              fontWeight: 500,
              fontSize: "clamp(48px, 6.5vw, 92px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              transform: inView ? "translateY(0)" : "translateY(24px)",
              opacity: inView ? 1 : 0,
              transition:
                "opacity 0.7s cubic-bezier(.2,.7,.2,1), transform 0.8s cubic-bezier(.2,.7,.2,1)",
            }}
          >
            {project.name}
          </h3>

          <p
            style={{
              fontFamily: "Bricolage Grotesque, serif",
              fontStyle: "italic",
              fontSize: 19,
              fontWeight: 400,
              color: "var(--ink-soft)",
              maxWidth: 360,
              lineHeight: 1.35,
            }}
          >
            {project.tag}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              columnGap: 24,
              rowGap: 8,
              marginTop: 12,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
            }}
          >
            <span
              style={{
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontSize: 11,
              }}
            >
              Year
            </span>
            <span style={{ color: "var(--ink)" }}>{project.year}</span>
            <span
              style={{
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontSize: 11,
              }}
            >
              Role
            </span>
            <span style={{ color: "var(--ink)" }}>{project.role}</span>
          </div>

          <a
            href={project.href}
            target={project.teaser ? undefined : "_blank"}
            rel={project.teaser ? undefined : "noopener noreferrer"}
            style={{
              marginTop: 12,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "11px 18px",
              border: "1px solid var(--rule)",
              borderRadius: 999,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              color: "var(--ink)",
              width: "fit-content",
              cursor: "pointer",
              transition: "background 0.25s, color 0.25s, border-color 0.25s",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--ink)";
              e.currentTarget.style.color = "var(--cream)";
              e.currentTarget.style.borderColor = "var(--ink)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--ink)";
              e.currentTarget.style.borderColor = "var(--rule)";
            }}
          >
            {project.teaser ? "Notify me" : "View case study"}
            <ArrowRight />
          </a>
        </div>

        {/* Right — blurb + visual + stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 36,
            paddingTop: 4,
          }}
        >
          <p
            style={{
              fontSize: "clamp(16px, 4.5vw, 19px)",
              lineHeight: 1.55,
              color: "var(--ink-soft)",
              maxWidth: 520,
              fontWeight: 400,
            }}
          >
            {project.blurb}
          </p>

          <div
            style={{
              transform: `translateY(${imgY}px)`,
              willChange: "transform",
            }}
          >
            <ProjectMock
              placeholder={project.placeholder}
              accent={project.accent}
            />
          </div>

          <div
            style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}
          >
            {project.stack.map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "5px 11px",
                  border: "1px solid var(--rule)",
                  borderRadius: 999,
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "var(--ink-soft)",
                  letterSpacing: "0.02em",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <div>
      {/* Section header */}
      <div
        id="work"
        className="container projects-header"
        style={{
          paddingTop: 160,
          paddingBottom: 80,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        <h2
          style={{
            fontFamily: "Bricolage Grotesque, serif",
            fontWeight: 500,
            letterSpacing: "-0.025em",
            fontSize: "clamp(40px, 5.5vw, 84px)",
            lineHeight: 1.0,
            color: "var(--ink)",
          }}
        >
          Selected{" "}
          <span style={{ fontStyle: "italic", color: "var(--slate)" }}>
            work,
          </span>
          <br />
          recently shipped.
        </h2>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--muted)",
          }}
        >
          03 PROJECTS / 2025—2026
        </span>
      </div>

      {PROJECTS.map((p) => (
        <ProjectScene key={p.num} project={p} />
      ))}
    </div>
  );
}
