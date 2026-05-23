const PURPLE = '#a78bfa';
const DARK_BG = '#13131f';
const SIDEBAR_BG = '#1a1a2e';
const CARD_BORDER = 'rgba(255,255,255,0.06)';
const MUTED = 'rgba(255,255,255,0.35)';

const NAV_ITEMS = ['Settings', 'Overview', 'Contribution', 'Analysis'];
const CONTRIBUTOR_BARS = [72, 48, 88, 32, 56];
const CONTRIBUTOR_COLORS = ['#8884d8', '#82ca9d', '#a78bfa', '#ffc658', '#ff7f7f'];

export function DashboardMock() {
  const circumference = 2 * Math.PI * 18;

  return (
    <div style={{
      background: DARK_BG,
      borderRadius: 10,
      overflow: 'hidden',
      fontFamily: 'JetBrains Mono, monospace',
      border: '1px solid rgba(255,255,255,0.08)',
      display: 'flex',
      height: 300,
      fontSize: 11,
    }}>

      {/* ── Left sidebar ── */}
      <div style={{
        width: '28%', minWidth: 88,
        background: SIDEBAR_BG,
        borderRight: `1px solid ${CARD_BORDER}`,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Logo */}
        <div style={{
          padding: '14px 14px 12px',
          borderBottom: `1px solid ${CARD_BORDER}`,
        }}>
          <span style={{ fontFamily: 'Bricolage Grotesque, serif', fontWeight: 600, fontSize: 15, color: '#fff' }}>Git</span>
          <span style={{ fontFamily: 'Bricolage Grotesque, serif', fontWeight: 600, fontSize: 15, color: PURPLE }}>Vitals</span>
        </div>

        {/* Nav */}
        {NAV_ITEMS.map((item) => (
          <div key={item} style={{
            padding: '10px 14px',
            fontSize: 10,
            letterSpacing: '0.02em',
            color: item === 'Overview' ? PURPLE : MUTED,
            background: item === 'Overview' ? `${PURPLE}18` : 'transparent',
          }}>
            {item}
          </div>
        ))}
      </div>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top bar */}
        <div style={{
          padding: '9px 12px',
          borderBottom: `1px solid ${CARD_BORDER}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.02em' }}>Overview</span>
          <span style={{
            fontSize: 8, color: PURPLE,
            border: `1px solid ${PURPLE}55`, borderRadius: 4,
            padding: '2px 7px', letterSpacing: '0.04em',
          }}>
            anthropic/claude ▼
          </span>
        </div>

        {/* 2 × 2 card grid */}
        <div style={{
          flex: 1, display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 1,
          background: CARD_BORDER,
        }}>

          {/* Health Score */}
          <div style={{ background: DARK_BG, padding: '12px 14px' }}>
            <div style={{ fontSize: 8, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              Health Score
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="44" height="44" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4.5" />
                <circle cx="24" cy="24" r="18" fill="none" stroke={PURPLE} strokeWidth="4.5"
                  strokeDasharray={`${circumference * 0.82} ${circumference}`}
                  strokeLinecap="round" transform="rotate(-90 24 24)" />
              </svg>
              <div>
                <div style={{
                  fontFamily: 'Bricolage Grotesque, serif', fontSize: 30, fontWeight: 500,
                  color: '#fff', lineHeight: 1,
                  textShadow: `0 0 24px ${PURPLE}88`,
                }}>
                  82<span style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>%</span>
                </div>
                <div style={{ fontSize: 8, color: PURPLE, marginTop: 4, letterSpacing: '0.06em' }}>HEALTHY</div>
              </div>
            </div>
          </div>

          {/* Repo metadata */}
          <div style={{ background: DARK_BG, padding: '12px 14px' }}>
            <div style={{ fontSize: 8, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              Repository
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {[
                { k: 'Language', v: 'TypeScript' },
                { k: 'Stars',    v: '47.2k' },
                { k: 'Last push', v: '2h ago' },
              ].map(row => (
                <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9 }}>
                  <span style={{ color: MUTED }}>{row.k}</span>
                  <span style={{ color: 'rgba(255,255,255,0.75)' }}>{row.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Commits per Contributor */}
          <div style={{ background: DARK_BG, padding: '12px 14px' }}>
            <div style={{ fontSize: 8, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              Commits per Contributor
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 38 }}>
              {CONTRIBUTOR_BARS.map((h, i) => (
                <div key={i} style={{
                  flex: 1, height: `${h}%`, borderRadius: 2,
                  background: CONTRIBUTOR_COLORS[i] + 'bb',
                }} />
              ))}
            </div>
          </div>

          {/* Contributions Over Time */}
          <div style={{ background: DARK_BG, padding: '12px 14px' }}>
            <div style={{ fontSize: 8, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              Contributions Over Time
            </div>
            <svg width="100%" height="42" viewBox="0 0 120 42" preserveAspectRatio="none">
              <path
                d="M0 38 L20 30 L40 22 L60 28 L80 12 L100 16 L120 8"
                fill="none" stroke="#8884d8" strokeWidth="1.5"
              />
              <path
                d="M0 38 L20 30 L40 22 L60 28 L80 12 L100 16 L120 8 L120 42 L0 42 Z"
                fill="#8884d8" opacity="0.15"
              />
            </svg>
          </div>

        </div>
      </div>
    </div>
  );
}
