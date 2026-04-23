// Scene 6: Dehradun — Himalayan arrival
const DehradunScene = () => {
  const ref = React.useRef(null);
  const progress = usePinnedProgress(ref);

  const sunRise = remap(progress, 0.0, 0.4);
  const mountainsRise = remap(progress, 0.1, 0.5);
  const contentReveal = remap(progress, 0.35, 0.7);
  const polaroidsIn = remap(progress, 0.5, 0.9);

  return (
    <section ref={ref} id="scene-dehradun" className="scene scene-tall" data-screen-label="06 Dehradun" style={{ padding: 0, minHeight: '180vh' }}>
      <div className="sticky-wrap">
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

          {/* Sky - sunrise gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(180deg,
              #2C1810 0%,
              #6B3B2A ${20 - sunRise*15}%,
              #C87A4A ${40 - sunRise*10}%,
              #E8A568 ${60 - sunRise*10}%,
              #F5C79B ${80 - sunRise*5}%,
              #FCE4B0 100%)`,
          }} />

          {/* Sun */}
          <div style={{
            position: 'absolute',
            left: '65%', top: `${50 - sunRise * 25}%`,
            transform: 'translate(-50%, -50%)',
            opacity: sunRise,
            width: 160, height: 160,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #FFE4A1 0%, #E8833A 60%, transparent 80%)',
            filter: 'blur(1px)',
          }} />
          <div style={{
            position: 'absolute',
            left: '65%', top: `${50 - sunRise * 25}%`,
            transform: 'translate(-50%, -50%)',
            opacity: sunRise,
            width: 90, height: 90,
            borderRadius: '50%',
            background: '#FFDD80',
            boxShadow: '0 0 60px 30px rgba(255, 221, 128, 0.5)',
          }} />

          {/* Himalayas layered */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, transform: `translateY(${(1 - mountainsRise) * 100}px)`, transition: 'transform 0.1s linear' }}>
            {/* Far layer */}
            <svg viewBox="0 0 1400 400" preserveAspectRatio="none" style={{ width: '100%', height: '360px', display: 'block', position: 'absolute', bottom: '10%' }}>
              <path d="M0 400 L 120 160 L 200 240 L 310 100 L 410 220 L 520 140 L 640 200 L 760 80 L 880 180 L 1000 120 L 1120 200 L 1240 130 L 1400 200 L 1400 400 Z" fill="#6B4A3C" opacity="0.6" />
              {/* snow caps */}
              <path d="M 290 120 L 310 100 L 335 135" fill="#FDFBF7" opacity="0.85" />
              <path d="M 740 100 L 760 80 L 785 115" fill="#FDFBF7" opacity="0.85" />
              <path d="M 1220 150 L 1240 130 L 1265 165" fill="#FDFBF7" opacity="0.85" />
            </svg>
            {/* Mid layer */}
            <svg viewBox="0 0 1400 400" preserveAspectRatio="none" style={{ width: '100%', height: '340px', display: 'block', position: 'absolute', bottom: '5%' }}>
              <path d="M0 400 L 80 200 L 180 280 L 280 180 L 400 260 L 520 190 L 640 280 L 760 200 L 880 270 L 1000 220 L 1120 290 L 1260 220 L 1400 280 L 1400 400 Z" fill="#4A2E1C" opacity="0.85" />
            </svg>
            {/* Front layer with pine trees */}
            <svg viewBox="0 0 1400 400" preserveAspectRatio="none" style={{ width: '100%', height: '280px', display: 'block' }}>
              <path d="M0 400 L 80 280 L 160 340 L 240 260 L 360 320 L 480 270 L 600 340 L 720 280 L 840 330 L 960 290 L 1080 340 L 1200 280 L 1320 330 L 1400 300 L 1400 400 Z" fill="#2C1810" />
            </svg>
            {/* Pine trees silhouettes */}
            <svg viewBox="0 0 1400 200" preserveAspectRatio="none" style={{ width: '100%', height: '120px', display: 'block', position: 'absolute', bottom: 0 }}>
              {Array.from({ length: 20 }).map((_, i) => {
                const x = i * 75 + (i % 2) * 20;
                const h = 40 + (i % 3) * 15;
                return (
                  <g key={i} fill="#1A0E08">
                    <path d={`M ${x} 200 L ${x-10} ${200-h} L ${x+10} ${200-h} Z M ${x-14} ${200-h+10} L ${x} ${200-h-5} L ${x+14} ${200-h+10} Z`} />
                    <rect x={x-1} y={200-h+10} width="2" height="10" />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Content */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6vh 4vw', color: 'var(--cream)' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', opacity: contentReveal, transform: `translateY(${(1-contentReveal)*-30}px)`, transition: 'all 0.1s linear' }}>
              <div className="font-mono" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.85 }}>Chapter Five</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(48px, 8vw, 120px)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1, marginTop: 8, textShadow: '0 2px 20px rgba(44,24,16,0.4)' }}>
                Welcome to <br/><span style={{ color: '#FCE4B0' }}>Dehradun</span>
              </h2>
              <div className="font-hand" style={{ fontSize: 30, marginTop: 8, color: '#FCE4B0' }}>
                at the foot of the Himalayas
              </div>
            </div>

            {/* Side labels */}
            <div style={{ position: 'absolute', left: '6%', top: '38%', opacity: contentReveal, color: '#FDFBF7' }}>
              <svg width="120" height="80" style={{ overflow: 'visible' }}>
                <path d="M 0 40 Q 40 20, 80 30" fill="none" stroke="#FDFBF7" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
                <path d="M 80 30 L 72 24 L 76 32 L 70 36 Z" fill="#FDFBF7" />
              </svg>
              <div className="font-hand" style={{ fontSize: 22, marginTop: -10, marginLeft: 10 }}>snow-dusted peaks</div>
            </div>
            <div style={{ position: 'absolute', right: '6%', top: '30%', opacity: contentReveal, color: '#FDFBF7', textAlign: 'right' }}>
              <div className="font-hand" style={{ fontSize: 22 }}>&lt; morning sun</div>
              <svg width="100" height="40" style={{ overflow: 'visible' }}>
                <path d="M 10 10 Q 40 30, 90 20" fill="none" stroke="#FDFBF7" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Bottom polaroids */}
            <div style={{ position: 'absolute', bottom: '6%', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 30, padding: '0 5%' }}>
              {[
                { tilt: -6, caption: 'Mussoorie hills', emoji: '🏔' },
                { tilt: 3, caption: 'Mindrolling Monastery', emoji: '☸' },
                { tilt: -3, caption: 'Valley of flowers', emoji: '🌸' },
              ].map((p, i) => {
                const pp = remap(polaroidsIn, i * 0.15, 0.6 + i * 0.15);
                return (
                  <div key={i} style={{
                    opacity: pp,
                    transform: `translateY(${(1 - pp) * 80}px) rotate(${p.tilt}deg)`,
                    transition: 'all 0.1s linear',
                  }}>
                    <Polaroid w={180} h={210} rotate={0} caption={p.caption}>
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: i === 0 ? 'linear-gradient(180deg, #FCE4B0 0%, #6B4A3C 100%)' : i === 1 ? 'linear-gradient(180deg, #E8A568 0%, #8B4513 100%)' : 'linear-gradient(180deg, #F5C79B 0%, #5B6B4A 100%)' }}>
                        <div style={{ fontSize: 48 }}>{p.emoji}</div>
                      </div>
                    </Polaroid>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

window.DehradunScene = DehradunScene;
