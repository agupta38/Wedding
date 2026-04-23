// Scene 3: Toronto — first date, CN Tower, Bar Volo
const TorontoScene = () => {
  const ref = React.useRef(null);
  const progress = usePinnedProgress(ref);
  const inView = useInView(ref, { threshold: 0.1 });

  // Skyline parallax
  const skyOffset = progress * -200;
  const cloudOffset = progress * -400;
  const polaroid1 = remap(progress, 0.1, 0.35);
  const polaroid2 = remap(progress, 0.25, 0.5);
  const polaroid3 = remap(progress, 0.4, 0.65);
  const ticketReveal = remap(progress, 0.55, 0.8);

  return (
    <section ref={ref} id="scene-toronto" className="scene scene-tall" data-screen-label="03 Toronto" style={{ padding: 0, minHeight: '180vh', background: 'linear-gradient(180deg, #F5EFE6 0%, #EDE3D2 100%)' }}>
      <div className="sticky-wrap">
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

          {/* Sky gradient */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #FCE4B0 0%, #F5C79B 40%, #E8A787 70%, #C87A6E 100%)' }} />

          {/* Clouds */}
          <div style={{ position: 'absolute', top: '15%', left: `${-20 + cloudOffset * 0.1}px`, opacity: 0.4 }}>
            <svg width="180" height="40" viewBox="0 0 180 40"><ellipse cx="40" cy="25" rx="35" ry="12" fill="#FDFBF7"/><ellipse cx="80" cy="20" rx="40" ry="15" fill="#FDFBF7"/><ellipse cx="130" cy="25" rx="35" ry="12" fill="#FDFBF7"/></svg>
          </div>
          <div style={{ position: 'absolute', top: '8%', right: `${40 + cloudOffset * 0.05}px`, opacity: 0.35 }}>
            <svg width="140" height="32" viewBox="0 0 140 32"><ellipse cx="30" cy="20" rx="28" ry="10" fill="#FDFBF7"/><ellipse cx="70" cy="16" rx="35" ry="12" fill="#FDFBF7"/><ellipse cx="110" cy="20" rx="28" ry="10" fill="#FDFBF7"/></svg>
          </div>

          {/* Skyline silhouette at bottom */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', transform: `translateY(${skyOffset * 0.3}px)` }}>
            <svg viewBox="0 0 1400 400" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
              {/* Back skyline */}
              <g fill="#4A2E1C" opacity="0.5">
                <rect x="0" y="200" width="80" height="200"/>
                <rect x="85" y="160" width="60" height="240"/>
                <rect x="150" y="220" width="70" height="180"/>
                <rect x="1180" y="180" width="80" height="220"/>
                <rect x="1265" y="210" width="60" height="190"/>
                <rect x="1330" y="150" width="70" height="250"/>
              </g>
              {/* Mid skyline */}
              <g fill="#2C1810" opacity="0.75">
                <rect x="200" y="180" width="90" height="220"/>
                <rect x="295" y="140" width="70" height="260"/>
                <rect x="370" y="200" width="100" height="200"/>
                <rect x="800" y="190" width="90" height="210"/>
                <rect x="895" y="150" width="80" height="250"/>
                <rect x="980" y="210" width="100" height="190"/>
                <rect x="1085" y="170" width="80" height="230"/>
              </g>
              {/* Foreground buildings flanking CN Tower */}
              <g fill="#1A0E08">
                <rect x="480" y="160" width="90" height="240"/>
                <rect x="575" y="130" width="70" height="270"/>
                <g>
                  {Array.from({ length: 18 }).map((_, i) => (
                    <rect key={i} x={585 + (i%3)*18} y={145 + Math.floor(i/3)*40} width="8" height="18" fill="#E8833A" opacity="0.7"/>
                  ))}
                </g>
                <rect x="720" y="150" width="75" height="250"/>
              </g>
            </svg>
          </div>

          {/* CN Tower — centered */}
          <div style={{ position: 'absolute', left: '50%', bottom: '25%', transform: `translateX(-50%) translateY(${skyOffset * 0.2}px)`, zIndex: 2 }}>
            <CNTower h={320} color="#1A0E08" />
          </div>

          {/* Section header */}
          <div style={{ position: 'absolute', top: '6%', left: 0, right: 0, textAlign: 'center', zIndex: 5, color: 'var(--ink)' }}>
            <div className="font-mono" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.8 }}>Chapter Two</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(40px, 6.5vw, 80px)', fontStyle: 'italic', fontWeight: 400, marginTop: 6 }}>
              Toronto, the <span style={{ color: 'var(--rose)' }}>6ix</span>
            </h2>
          </div>

          {/* Polaroids scattered */}
          <div style={{
            position: 'absolute', left: '8%', top: '28%',
            opacity: polaroid1, transform: `translate(${(1-polaroid1)*-80}px, 0) rotate(-8deg)`,
            transition: 'all 0.1s linear', zIndex: 4,
          }}>
            <Polaroid w={200} h={230} rotate={0} caption="bar volo ♥" tape>
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #8B2635 0%, #C41E3A 100%)' }}>
                <div style={{ color: '#fff', fontFamily: 'Caveat', fontSize: 28, textAlign: 'center', padding: 8 }}>
                  first<br/>date<br/>🍷
                </div>
              </div>
            </Polaroid>
          </div>

          <div style={{
            position: 'absolute', right: '10%', top: '22%',
            opacity: polaroid2, transform: `translate(${(1-polaroid2)*80}px, 0) rotate(6deg)`,
            transition: 'all 0.1s linear', zIndex: 4,
          }}>
            <Polaroid w={220} h={260} rotate={0} caption="view from the 6ix" tape>
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, #2C1810 0%, #6B4226 60%, #E8833A 100%)', position: 'relative' }}>
                {/* tiny CN tower */}
                <div style={{ position: 'absolute', bottom: 10, left: '40%' }}>
                  <CNTower h={90} color="#FDFBF7" />
                </div>
                {/* lights */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} style={{ position: 'absolute', left: `${(i*13)%100}%`, bottom: `${(i*7)%40}%`, width: 2, height: 2, background: '#FFE4A1', boxShadow: '0 0 4px #FFE4A1' }} />
                ))}
              </div>
            </Polaroid>
          </div>

          <div style={{
            position: 'absolute', left: '38%', bottom: '18%',
            opacity: polaroid3, transform: `translate(0, ${(1-polaroid3)*60}px) rotate(-3deg)`,
            transition: 'all 0.1s linear', zIndex: 4,
          }}>
            <Polaroid w={180} h={210} rotate={0} caption="skating @ harbourfront">
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, #B8D4E3 0%, #5A8AA8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: '#fff', fontFamily: 'Caveat', fontSize: 38 }}>⛸</div>
              </div>
            </Polaroid>
          </div>

          {/* Hand-drawn arrow to Bar Volo polaroid */}
          {polaroid1 > 0.6 && (
            <svg style={{ position: 'absolute', left: '20%', top: '48%', width: 120, height: 80, overflow: 'visible', zIndex: 5 }}>
              <path d="M 0 80 Q 30 40, 80 20" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
              <path d="M80 20 L70 14 L74 22 L68 26 Z" fill="var(--ink)" />
              <text x="0" y="95" fontFamily="Caveat" fontSize="22" fill="var(--ink)">where it all began</text>
            </svg>
          )}

          {/* Ticket reveal at bottom */}
          <div style={{
            position: 'absolute', bottom: '4%', left: '50%',
            transform: `translateX(-50%) translateY(${(1-ticketReveal)*50}px) rotate(-2deg)`,
            opacity: ticketReveal,
            zIndex: 6,
          }}>
            <div className="ticket" style={{ display: 'flex', alignItems: 'center', gap: 20, background: 'var(--cream)' }}>
              <div>
                <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--ink-soft)' }}>DATE #001</div>
                <div className="font-display" style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 500 }}>Bar Volo</div>
                <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>College St · Toronto</div>
              </div>
              <div style={{ width: 1, height: 40, background: 'var(--ink)', opacity: 0.2 }} />
              <div>
                <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--ink-soft)' }}>VERDICT</div>
                <div className="font-hand" style={{ fontSize: 24, color: 'var(--rose)' }}>he's the one ♥</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

window.TorontoScene = TorontoScene;
