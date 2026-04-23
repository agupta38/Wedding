// Scene 1: Hero — Names reveal with animated letters
const HeroScene = () => {
  const ref = React.useRef(null);
  const progress = useScrollProgress(ref);

  // Letters animate in staggered
  const brideLetters = 'Aarushi'.split('');
  const groomLetters = 'Hari'.split('');

  return (
    <section ref={ref} id="scene-hero" className="scene scene-full" data-screen-label="01 Hero" style={{ paddingTop: '6vh', paddingBottom: '6vh' }}>
      {/* Background corner motifs */}
      <PaisleyCorner size={140} color="var(--marigold)" style={{ position: 'absolute', top: 30, left: 30, opacity: 0.3 }} />
      <PaisleyCorner size={140} color="var(--rose)" style={{ position: 'absolute', top: 30, right: 30, opacity: 0.3, transform: 'scaleX(-1)' }} />
      <PaisleyCorner size={140} color="var(--rose)" style={{ position: 'absolute', bottom: 30, left: 30, opacity: 0.3, transform: 'scaleY(-1)' }} />
      <PaisleyCorner size={140} color="var(--marigold)" style={{ position: 'absolute', bottom: 30, right: 30, opacity: 0.3, transform: 'scale(-1, -1)' }} />

      {/* Floating doodles */}
      <DoodleSparkle size={28} color="var(--gold)" style={{ position: 'absolute', top: '15%', left: '15%', animation: 'bob 3s ease-in-out infinite' }} />
      <DoodleSparkle size={20} color="var(--rose)" style={{ position: 'absolute', top: '28%', right: '18%', animation: 'bob 4s ease-in-out infinite reverse' }} />
      <DoodleSparkle size={24} color="var(--marigold)" style={{ position: 'absolute', bottom: '25%', left: '20%', animation: 'bob 3.5s ease-in-out infinite' }} />
      <DoodleStar size={26} color="var(--rose)" style={{ position: 'absolute', bottom: '18%', right: '14%', animation: 'bob 4.5s ease-in-out infinite' }} />

      <div style={{ position: 'relative', width: '100%', maxWidth: 1100, textAlign: 'center' }}>

        {/* Top meta row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginBottom: 40, opacity: 0.75 }}>
          <div style={{ width: 60, height: 1, background: 'var(--ink)' }} />
          <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase' }}>SAVE THE DATE · 17 MAY 2027</span>
          <div style={{ width: 60, height: 1, background: 'var(--ink)' }} />
        </div>

        {/* Bride name */}
        <h1 className="font-display" style={{ fontSize: 'clamp(72px, 14vw, 220px)', lineHeight: 0.9, fontStyle: 'italic', fontWeight: 500 }}>
          {brideLetters.map((l, i) => (
            <span key={i} style={{
              display: 'inline-block',
              opacity: Math.max(0, Math.min(1, (progress * 8) - i * 0.3)),
              transform: `translateY(${Math.max(0, 30 - progress * 80 + i * 8)}px) rotate(${(i % 2 === 0 ? -1 : 1) * 2}deg)`,
              transition: 'all 0.1s linear',
              color: i % 2 === 0 ? 'var(--ink)' : 'var(--rose)',
            }}>{l}</span>
          ))}
        </h1>

        {/* Ampersand with sparkles */}
        <div style={{ margin: '20px 0', position: 'relative', display: 'inline-block' }}>
          <div className="font-display" style={{ fontSize: 'clamp(64px, 10vw, 140px)', color: 'var(--marigold)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1 }}>&</div>
          <DoodleSparkle size={22} color="var(--gold)" style={{ position: 'absolute', top: -5, right: -18 }} />
          <DoodleSparkle size={16} color="var(--rose)" style={{ position: 'absolute', bottom: 8, left: -18 }} />
        </div>

        {/* Groom name */}
        <h1 className="font-display" style={{ fontSize: 'clamp(72px, 14vw, 220px)', lineHeight: 0.9, fontStyle: 'italic', fontWeight: 500 }}>
          {groomLetters.map((l, i) => (
            <span key={i} style={{
              display: 'inline-block',
              opacity: Math.max(0, Math.min(1, (progress * 8) - (i + brideLetters.length) * 0.25)),
              transform: `translateY(${Math.max(0, 30 - progress * 80 + i * 8)}px) rotate(${(i % 2 === 0 ? 1 : -1) * 2}deg)`,
              transition: 'all 0.1s linear',
              color: i % 2 === 0 ? 'var(--ink)' : 'var(--marigold-deep)',
            }}>{l}</span>
          ))}
        </h1>

        {/* Subtitle */}
        <div style={{ marginTop: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <p className="font-hand" style={{ fontSize: 34, color: 'var(--ink-soft)', lineHeight: 1 }}>
            are finally tying the knot
          </p>
          <p className="font-mono" style={{ fontSize: 11, letterSpacing: '0.25em', color: 'var(--ink-soft)', textTransform: 'uppercase', marginTop: 10 }}>
            Dehradun · India · Summer '27
          </p>
        </div>

        {/* Stamp */}
        <div style={{ position: 'absolute', top: -20, right: '8%', transform: 'rotate(12deg)' }}>
          <Postmark text1="★ A + H ★" text2="EST. DEC 2023" size={120} color="var(--rose)" />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint">
        <span>scroll for the story</span>
        <svg width="14" height="20" viewBox="0 0 14 20"><path d="M7 2 L7 16 M2 11 L7 16 L12 11" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </section>
  );
};

window.HeroScene = HeroScene;
