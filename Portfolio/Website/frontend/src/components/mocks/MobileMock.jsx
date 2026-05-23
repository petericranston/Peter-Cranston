const EXPIRING = [
  { name: 'Cherry tomatoes', days: 'today',  color: '#e05555' },
  { name: 'Greek yogurt',    days: '2 days', color: '#e07c35' },
  { name: 'Sourdough',       days: '3 days', color: '#e07c35' },
];

const PHONE_SHADOW = '0 24px 56px -20px rgba(31,31,36,0.25)';
const FRESH_GREEN = '#50863F';

export function MobileMock({ accent }) {
  return (
    <div className="mobile-phones" style={{ display: 'flex', gap: 18, justifyContent: 'flex-start' }}>

      {/* Phone 1 — Your Kitchen dashboard */}
      <div style={{
        width: 220, height: 440, background: '#1a1a1a', borderRadius: 30,
        padding: 7, boxShadow: PHONE_SHADOW, flexShrink: 0,
      }}>
        <div style={{
          background: '#F8F5EC', height: '100%', borderRadius: 24,
          padding: '18px 16px', position: 'relative', overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Header */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: '#aaa', letterSpacing: '0.08em', marginBottom: 4 }}>
              FRESHTRACK
            </div>
            <div style={{ fontFamily: 'Bricolage Grotesque, serif', fontWeight: 500, fontSize: 20, lineHeight: 1, color: '#1a1a1a' }}>
              Your Kitchen
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            {[
              { label: 'Items tracked', value: '24' },
              { label: 'Expiring soon', value: '3', urgent: true },
            ].map(stat => (
              <div key={stat.label} style={{
                background: stat.urgent ? `${FRESH_GREEN}15` : 'rgba(0,0,0,0.04)',
                borderRadius: 8, padding: '10px 10px 8px',
                border: stat.urgent ? `1px solid ${FRESH_GREEN}40` : '1px solid transparent',
              }}>
                <div style={{ fontSize: 7, color: '#aaa', letterSpacing: '0.06em', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: 22, fontWeight: 600, color: stat.urgent ? FRESH_GREEN : '#1a1a1a', lineHeight: 1.2, marginTop: 2, fontFamily: 'Bricolage Grotesque, serif' }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Needs attention */}
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: '#aaa', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
            Needs attention
          </div>
          {EXPIRING.map(item => (
            <div key={item.name} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '7px 0', borderBottom: '1px solid rgba(0,0,0,0.07)',
              fontSize: 11, color: '#1a1a1a',
            }}>
              <span style={{ fontFamily: 'Geist, system-ui, sans-serif' }}>{item.name}</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: item.color }}>
                {item.days}
              </span>
            </div>
          ))}

          {/* CTA */}
          <div style={{ marginTop: 'auto', paddingTop: 12 }}>
            <div style={{
              background: FRESH_GREEN, borderRadius: 999, padding: '9px 14px',
              textAlign: 'center', fontFamily: 'JetBrains Mono, monospace',
              fontSize: 9, color: '#fff', letterSpacing: '0.06em',
            }}>
              ADD ITEMS →
            </div>
          </div>
        </div>
      </div>

      {/* Phone 2 — Recipe suggestion */}
      <div className="mobile-phone-2" style={{
        width: 220, height: 440, background: '#1a1a1a', borderRadius: 30,
        padding: 7, transform: 'translateY(32px) rotate(2deg)',
        boxShadow: PHONE_SHADOW, flexShrink: 0,
      }}>
        <div style={{
          background: FRESH_GREEN, height: '100%', borderRadius: 24,
          padding: '18px 16px', color: '#fff',
          position: 'relative', overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, opacity: 0.65, marginBottom: 12, letterSpacing: '0.08em' }}>
            AI · 3 RECIPES GENERATED
          </div>

          {/* Recipe card */}
          <div style={{
            background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '12px 12px',
            backdropFilter: 'blur(4px)',
          }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>🍝</div>
            <div style={{ fontFamily: 'Bricolage Grotesque, serif', fontWeight: 500, fontSize: 16, lineHeight: 1.1, marginBottom: 6 }}>
              Tomato &<br /><i style={{ fontWeight: 400 }}>yogurt</i> pasta
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, opacity: 0.7, marginBottom: 10, lineHeight: 1.5 }}>
              Uses 3 expiring items · 25 min · serves 2
            </div>
            <div style={{
              display: 'flex', gap: 4, flexWrap: 'wrap',
            }}>
              {['tomatoes', 'yogurt', 'pasta'].map(t => (
                <span key={t} style={{
                  background: 'rgba(255,255,255,0.2)', borderRadius: 999,
                  padding: '3px 7px', fontSize: 8, fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '0.04em',
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Other recipe previews */}
          {['🥗  Summer salad · 10 min', '🍳  Frittata · 20 min'].map(r => (
            <div key={r} style={{
              marginTop: 8, background: 'rgba(255,255,255,0.1)',
              borderRadius: 8, padding: '9px 12px',
              fontFamily: 'Bricolage Grotesque, serif', fontSize: 12, opacity: 0.85,
            }}>
              {r}
            </div>
          ))}

          <div style={{ marginTop: 'auto', paddingTop: 12 }}>
            <div style={{
              background: '#F8F5EC', color: '#1a1a1a', padding: '10px 14px',
              borderRadius: 999, textAlign: 'center', fontFamily: 'JetBrains Mono, monospace',
              fontSize: 9, letterSpacing: '0.06em',
            }}>
              VIEW FULL RECIPE →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
