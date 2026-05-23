export function WipMock({ accent }) {
  return (
    <div style={{
      background: 'var(--cream-2)', border: '1px dashed var(--rule)',
      borderRadius: 10, padding: '64px 40px', textAlign: 'center',
    }}>
      <svg width="48" height="48" viewBox="0 0 64 64" style={{ marginBottom: 18 }}>
        <rect
          x="6" y="6" width="52" height="52" rx="4"
          fill="none" stroke="var(--ink-soft)" strokeWidth="1.2"
          strokeDasharray="3 4" opacity="0.5"
        />
        <circle cx="32" cy="32" r="4" fill={accent}>
          <animate attributeName="r" values="4;7;4" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.3;1" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </svg>
      <div style={{
        fontFamily: 'Bricolage Grotesque, serif', fontSize: 26, fontWeight: 500,
        marginBottom: 6, color: 'var(--ink)',
      }}>
        in the kitchen
      </div>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
        color: 'var(--muted)', letterSpacing: '0.06em',
      }}>
        ETA · when it's ready
      </div>
    </div>
  );
}
