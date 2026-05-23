export function Nav() {
  return (
    <nav className="nav-wrap" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '20px 40px', display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', fontFamily: 'JetBrains Mono, monospace',
      fontSize: 12, color: 'var(--ink)', letterSpacing: '0.02em',
      pointerEvents: 'none',
    }}>
      <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          display: 'inline-block', width: 6, height: 6, borderRadius: 999,
          background: 'var(--slate)',
        }} />
        <span>Peter Cranston</span>
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
