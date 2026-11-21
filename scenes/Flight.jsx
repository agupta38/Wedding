// Scene 4: Flight — animated globe with plane path from Toronto to India
const FlightScene = () => {
  const ref = React.useRef(null);
  const progress = usePinnedProgress(ref);

  // Globe rotation based on scroll
  const rotation = progress * 140; // rotate globe

  // Plane path — arc from Toronto (top-left) to India (bottom-right)
  // We'll place on a 800x500 viewBox
  const pathD = "M 180 180 Q 400 40, 620 260";
  const pathRef = React.useRef(null);
  const [pathLen, setPathLen] = React.useState(0);
  React.useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  // Plane position along path
  const planeProgress = remap(progress, 0.15, 0.85);
  const planePos = React.useMemo(() => {
    if (!pathRef.current || !pathLen) return { x: 180, y: 180, angle: -30 };
    const pt = pathRef.current.getPointAtLength(pathLen * planeProgress);
    const pt2 = pathRef.current.getPointAtLength(Math.min(pathLen, pathLen * planeProgress + 1));
    return { x: pt.x, y: pt.y, angle: Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180 / Math.PI };
  }, [planeProgress, pathLen]);

  return (
    <section ref={ref} id="scene-flight" className="scene scene-tall animated-scene" data-screen-label="04 Flight" style={{ padding: 0, minHeight: '170vh', background: 'linear-gradient(180deg, #F5EFE6 0%, #EDE3D2 100%)' }}>
      <div className="sticky-wrap">
        <PinnedCanvas className="flight-canvas" width={1000} height={800}>
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div className="font-mono" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>Chapter Three</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontStyle: 'italic', fontWeight: 400 }}>
              12,000 km <span style={{ color: 'var(--marigold-deep)' }}>home</span>
            </h2>
          </div>

          {/* Globe area */}
          <div className="flight-globe" style={{ position: 'relative', width: 'min(800px, 90vw)', height: 500 }}>
            <svg viewBox="0 0 800 500" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              {/* Globe circle */}
              <defs>
                <radialGradient id="globeGrad" cx="40%" cy="40%">
                  <stop offset="0%" stopColor="#F5EFE6" />
                  <stop offset="100%" stopColor="#E8D5B7" />
                </radialGradient>
                <clipPath id="globeClip">
                  <circle cx="400" cy="250" r="200" />
                </clipPath>
              </defs>
              <circle cx="400" cy="250" r="200" fill="url(#globeGrad)" stroke="var(--ink)" strokeWidth="1.5" />

              {/* Latitude lines */}
              <g stroke="var(--ink)" strokeWidth="0.6" fill="none" opacity="0.25" clipPath="url(#globeClip)">
                <ellipse cx="400" cy="250" rx="200" ry="40" />
                <ellipse cx="400" cy="250" rx="200" ry="90" />
                <ellipse cx="400" cy="250" rx="200" ry="140" />
                <ellipse cx="400" cy="250" rx="200" ry="180" />
                {/* Longitude lines - rotate based on scroll */}
                <g transform={`rotate(${rotation} 400 250)`}>
                  <ellipse cx="400" cy="250" rx="40" ry="200" />
                  <ellipse cx="400" cy="250" rx="90" ry="200" />
                  <ellipse cx="400" cy="250" rx="140" ry="200" />
                  <ellipse cx="400" cy="250" rx="180" ry="200" />
                </g>
              </g>

              {/* Simplified continent shapes - rotating */}
              <g clipPath="url(#globeClip)" transform={`rotate(${rotation} 400 250)`}>
                {/* Americas */}
                <path d="M 260 150 Q 280 130, 310 145 L 320 180 Q 310 210, 290 230 L 275 260 Q 280 290, 300 310 L 290 340 L 275 330 L 260 290 L 255 240 L 250 200 Z" fill="var(--sage)" opacity="0.7" />
                {/* Europe/Africa */}
                <path d="M 420 170 Q 445 155, 460 170 L 470 200 Q 465 225, 480 250 L 475 290 L 455 330 L 440 340 L 425 300 L 420 260 L 415 220 Z" fill="var(--marigold)" opacity="0.75" />
                {/* Asia */}
                <path d="M 475 160 Q 510 145, 545 160 L 560 190 Q 555 220, 540 240 L 530 270 L 510 280 L 490 270 L 485 230 L 480 195 Z" fill="var(--rose)" opacity="0.7" />
                {/* India subcontinent highlight */}
                <path d="M 515 215 Q 525 225, 528 245 L 520 260 L 510 250 Z" fill="var(--rose-deep)" />
              </g>

              {/* Outer glow */}
              <circle cx="400" cy="250" r="200" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.4" strokeDasharray="3 4" />

              {/* Flight path */}
              <path
                ref={pathRef}
                d={pathD}
                fill="none"
                stroke="var(--rose)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="8 6"
                strokeDashoffset={pathLen * (1 - planeProgress)}
                style={{ filter: 'drop-shadow(0 2px 3px rgba(196,30,58,0.2))' }}
              />

              {/* Toronto marker */}
              <g transform="translate(180, 180)">
                <circle r="6" fill="var(--rose)" />
                <circle r="12" fill="none" stroke="var(--rose)" strokeWidth="1.5" opacity="0.6" />
                <text x="-10" y="-20" fontFamily="JetBrains Mono" fontSize="11" fontWeight="700" fill="var(--ink)" textAnchor="end">TORONTO</text>
                <text x="-10" y="-8" fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-soft)" textAnchor="end">43.6°N · 79.3°W</text>
              </g>

              {/* India marker */}
              <g transform="translate(620, 260)">
                <circle r="6" fill="var(--marigold-deep)" />
                <circle r="12" fill="none" stroke="var(--marigold-deep)" strokeWidth="1.5" opacity="0.6" />
                <text x="18" y="-8" fontFamily="JetBrains Mono" fontSize="11" fontWeight="700" fill="var(--ink)">DEHRADUN</text>
                <text x="18" y="6" fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-soft)">30.3°N · 78.0°E</text>
              </g>

              {/* Plane */}
              <g transform={`translate(${planePos.x}, ${planePos.y}) rotate(${planePos.angle})`}>
                <g transform="translate(-20, -20)">
                  <Plane size={40} color="var(--ink)" />
                </g>
                {/* Little trail puffs */}
                <circle cx="-30" cy="0" r="3" fill="var(--cream-deep)" opacity="0.6" />
                <circle cx="-45" cy="2" r="2.5" fill="var(--cream-deep)" opacity="0.4" />
                <circle cx="-58" cy="-1" r="2" fill="var(--cream-deep)" opacity="0.3" />
              </g>

              {/* Distance label */}
              <g transform="translate(400, 130)" opacity={Math.min(1, planeProgress * 1.5)}>
                <rect x="-60" y="-15" width="120" height="26" fill="var(--cream)" stroke="var(--ink)" strokeWidth="1" rx="3" />
                <text y="4" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fontWeight="700" fill="var(--ink)">11,934 KM</text>
              </g>
            </svg>

            {/* Boarding pass card */}
            <div className="boarding-pass" style={{
              position: 'absolute',
              bottom: '-30px', left: '50%',
              transform: `translate(var(--boarding-x, -50%), ${(1-planeProgress)*40}px) rotate(-2deg)`,
              opacity: Math.min(1, planeProgress * 1.2),
              transition: 'all 0.1s linear',
            }}>
              <div className="ticket" style={{ display: 'flex', gap: 24, padding: '16px 28px', alignItems: 'center' }}>
                <div>
                  <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--ink-soft)' }}>FROM</div>
                  <div className="font-display" style={{ fontSize: 28, fontStyle: 'italic', fontWeight: 500, lineHeight: 1 }}>YYZ</div>
                </div>
                <div style={{ color: 'var(--marigold-deep)' }}>
                  <svg width="60" height="20" viewBox="0 0 60 20">
                    <path d="M 4 10 L 48 10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
                    <path d="M48 10 L 40 5 M 48 10 L 40 15" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <Plane size={14} color="currentColor" />
                  </svg>
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--ink-soft)' }}>TO</div>
                  <div className="font-display" style={{ fontSize: 28, fontStyle: 'italic', fontWeight: 500, lineHeight: 1 }}>DED</div>
                </div>
                <div style={{ width: 1, height: 40, background: 'var(--ink)', opacity: 0.2 }} />
                <div>
                  <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--ink-soft)' }}>DATE</div>
                  <div className="font-display" style={{ fontSize: 18, fontStyle: 'italic', fontWeight: 500, lineHeight: 1 }}>17 MAY '27</div>
                </div>
              </div>
            </div>
          </div>

        </div>
        </PinnedCanvas>
      </div>
    </section>
  );
};

window.FlightScene = FlightScene;
