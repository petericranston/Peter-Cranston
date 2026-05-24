import { useTheme } from "../hooks/useTheme";

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <circle cx="7" cy="7" r="2.5" />
      <line x1="7" y1="0.5" x2="7" y2="2.5" />
      <line x1="7" y1="11.5" x2="7" y2="13.5" />
      <line x1="0.5" y1="7" x2="2.5" y2="7" />
      <line x1="11.5" y1="7" x2="13.5" y2="7" />
      <line x1="2.4" y1="2.4" x2="3.8" y2="3.8" />
      <line x1="10.2" y1="10.2" x2="11.6" y2="11.6" />
      <line x1="11.6" y1="2.4" x2="10.2" y2="3.8" />
      <line x1="3.8" y1="10.2" x2="2.4" y2="11.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 11.5 9 A 5.5 5.5 0 1 1 5 2.5 A 4 4 0 0 0 11.5 9 Z" />
    </svg>
  );
}

export function Nav() {
  const { dark, toggle } = useTheme();

  return (
    <nav className="nav-wrap" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '20px 40px', display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', fontFamily: 'JetBrains Mono, monospace',
      fontSize: 12, color: 'var(--ink)', letterSpacing: '0.02em',
      pointerEvents: 'none',
    }}>
      <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{
          display: 'inline-block', width: 6, height: 6, borderRadius: 999,
          background: 'var(--slate)',
        }} />
        <span>Peter Cranston</span>
        <button
          onClick={toggle}
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--ink-soft)', padding: 4, display: 'flex',
            alignItems: 'center', transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-soft)'}
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
      <div style={{ display: 'flex', gap: 24, pointerEvents: 'auto' }}>
        <a
          href="#work"
          style={{ opacity: 0.7, transition: 'opacity 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
        >
          work
        </a>
        <a
          href="#contact"
          style={{ opacity: 0.7, transition: 'opacity 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
        >
          contact ↗
        </a>
      </div>
    </nav>
  );
}
