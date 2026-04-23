// Scene 8: Countdown to the wedding
const CountdownScene = () => {
  const ref = React.useRef(null);
  const inView = useInView(ref);
  const [time, setTime] = React.useState({ d: 0, h: 0, m: 0, s: 0 });

  React.useEffect(() => {
    const target = new Date('2027-05-17T10:00:00').getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTime({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'DAYS', value: time.d },
    { label: 'HOURS', value: time.h },
    { label: 'MINUTES', value: time.m },
    { label: 'SECONDS', value: time.s },
  ];

  return (
    <section ref={ref} id="scene-countdown" className="scene scene-full" data-screen-label="08 Countdown" style={{ padding: '12vh 5vw', background: 'var(--ink)', color: 'var(--cream)' }}>
      <div style={{ textAlign: 'center', width: '100%', maxWidth: 1200 }}>
        <div className="font-mono" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>
          ✦ T-MINUS ✦
        </div>
        <h2 className="font-display" style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontStyle: 'italic', fontWeight: 400, marginTop: 6 }}>
          until we all get <span style={{ color: 'var(--marigold)' }}>jet-lagged</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(10px, 2vw, 30px)', marginTop: 50 }}>
          {units.map((u, i) => (
            <div key={u.label} style={{
              border: '1.5px solid var(--cream)',
              padding: 'clamp(20px, 3vw, 40px) 10px',
              position: 'relative',
              background: 'rgba(253, 251, 247, 0.03)',
              transform: inView ? 'translateY(0)' : 'translateY(40px)',
              opacity: inView ? 1 : 0,
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
            }}>
              <div className="font-display" style={{
                fontSize: 'clamp(48px, 9vw, 120px)',
                fontStyle: 'italic',
                fontWeight: 500,
                lineHeight: 1,
                color: i === 0 ? 'var(--marigold)' : 'var(--cream)',
              }}>
                {String(u.value).padStart(2, '0')}
              </div>
              <div className="font-mono" style={{ fontSize: 10, letterSpacing: '0.3em', marginTop: 10, opacity: 0.7 }}>
                {u.label}
              </div>
              {/* Corner ticks */}
              <div style={{ position: 'absolute', top: -1, left: -1, width: 10, height: 10, borderTop: '3px solid var(--gold)', borderLeft: '3px solid var(--gold)' }} />
              <div style={{ position: 'absolute', top: -1, right: -1, width: 10, height: 10, borderTop: '3px solid var(--gold)', borderRight: '3px solid var(--gold)' }} />
              <div style={{ position: 'absolute', bottom: -1, left: -1, width: 10, height: 10, borderBottom: '3px solid var(--gold)', borderLeft: '3px solid var(--gold)' }} />
              <div style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderBottom: '3px solid var(--gold)', borderRight: '3px solid var(--gold)' }} />
            </div>
          ))}
        </div>

        <div className="font-hand" style={{ fontSize: 28, marginTop: 50, color: 'var(--gold-soft)' }}>
          start stretching. the sangeet choreography is coming.
        </div>
      </div>
    </section>
  );
};

window.CountdownScene = CountdownScene;
