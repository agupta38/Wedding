// Scene 5: Two States — North vs South playful comparison
const TwoStatesScene = () => {
  const ref = React.useRef(null);
  const progress = usePinnedProgress(ref);

  const splitProgress = remap(progress, 0.05, 0.35);
  const rowsProgress = remap(progress, 0.25, 0.95);

  const comparisons = [
    { topic: 'HER MORNING', north: 'Lassi and namkeen', south: 'Filter kaapi + idli' },
    { topic: 'THE LANGUAGE', north: 'Hindi / Punjabi', south: 'Tamil' },
    { topic: 'THE WEDDING STYLE', north: 'Shaadi, 5 days', south: 'Kalyanam, 3 days' },
    { topic: 'SPICE LEVEL', north: 'Spicy', south: 'SPICIER' },
    { topic: 'DANCE FLOOR', north: 'Bhangra at 2am', south: 'Carnatic beats' },
    { topic: 'COMMON GROUND', north: 'Aarushi & Hari', south: 'Aarushi & Hari', merged: true },
  ];

  return (
    <section ref={ref} id="scene-twostates" className="scene scene-tall animated-scene" data-screen-label="05 Two States" style={{ padding: 0, minHeight: '180vh' }}>
      <div className="sticky-wrap">
        <PinnedCanvas className="states-canvas" height={900} mobileHeight={740}>
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

          {/* Split panels */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
            <div style={{
              width: '50%', background: 'var(--rose)',
              transform: `translateX(${(1 - splitProgress) * -100}%)`,
              transition: 'transform 0.1s linear',
              position: 'relative', overflow: 'hidden',
            }}>
              <PaisleyCorner size={200} color="#fff" style={{ position: 'absolute', top: 20, left: 20, opacity: 0.18 }} />
              <PaisleyCorner size={200} color="#fff" style={{ position: 'absolute', bottom: 20, right: 20, opacity: 0.18, transform: 'scale(-1)' }} />
            </div>
            <div style={{
              width: '50%', background: 'var(--marigold)',
              transform: `translateX(${(1 - splitProgress) * 100}%)`,
              transition: 'transform 0.1s linear',
              position: 'relative', overflow: 'hidden',
            }}>
              <PaisleyCorner size={200} color="#fff" style={{ position: 'absolute', top: 20, right: 20, opacity: 0.18, transform: 'scaleX(-1)' }} />
              <PaisleyCorner size={200} color="#fff" style={{ position: 'absolute', bottom: 20, left: 20, opacity: 0.18, transform: 'scaleY(-1)' }} />
            </div>
          </div>

          {/* Dashed divider */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: 0, borderLeft: '2px dashed rgba(253, 251, 247, 0.5)',
            opacity: splitProgress,
          }} />

          {/* Content */}
          <div className="states-content" style={{ position: 'relative', width: '100%', height: '100%', color: 'var(--cream)', padding: '4vh 4vw', zIndex: 5 }}>

            {/* Header */}
            <div className="states-heading" style={{ textAlign: 'center', marginBottom: 20, opacity: splitProgress }}>
              <div className="font-mono" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.9 }}>Chapter Four</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(40px, 6.5vw, 80px)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1 }}>
                Two states, one love story
              </h2>
              <div className="font-hand" style={{ fontSize: 24, marginTop: 4, opacity: 0.9 }}>
                a very short guide to the happy couple
              </div>
            </div>

            {/* Column headers */}
            <div className="states-columns" style={{ display: 'flex', marginTop: 10, opacity: splitProgress }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontStyle: 'italic', fontWeight: 500 }}>Aarushi</div>
                <div className="font-mono" style={{ fontSize: 11, letterSpacing: '0.25em', opacity: 0.85 }}>DILLI · THE NORTH</div>
              </div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontStyle: 'italic', fontWeight: 500 }}>Hari</div>
                <div className="font-mono" style={{ fontSize: 11, letterSpacing: '0.25em', opacity: 0.85 }}>CHENNAI · THE SOUTH</div>
              </div>
            </div>

            {/* Comparison rows */}
            <div className="comparison-list" style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 1100, margin: '40px auto 0' }}>
              {comparisons.map((c, i) => {
                const rowP = remap(rowsProgress, i / comparisons.length * 0.85, (i + 1) / comparisons.length * 0.85);
                return (
                  <div className="comparison-row" key={i} style={{
                    display: 'flex', alignItems: 'center',
                    opacity: rowP,
                    transform: `translateY(${(1 - rowP) * 30}px)`,
                    transition: 'all 0.1s linear',
                  }}>
                    {c.merged ? (
                      <div style={{ flex: 1, textAlign: 'center', padding: '14px 20px' }}>
                        <div className="font-mono" style={{ fontSize: 10, letterSpacing: '0.3em', opacity: 0.8 }}>{c.topic}</div>
                        <div className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontStyle: 'italic', fontWeight: 500, marginTop: 4 }}>
                          <span style={{ color: '#FCE4B0' }}>Aarushi</span> <span style={{ opacity: 0.7 }}>&</span> <span style={{ color: '#FCE4B0' }}>Hari</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div style={{ flex: 1, textAlign: 'right', padding: '10px 30px 10px 10px' }}>
                          <div className="font-display" style={{ fontSize: 'clamp(18px, 2.4vw, 28px)', fontWeight: 500, fontStyle: 'italic' }}>
                            {c.north}
                          </div>
                        </div>
                        <div style={{
                          flex: '0 0 auto', padding: '4px 12px',
                          border: '1.5px solid rgba(253,251,247,0.8)',
                          borderRadius: 20,
                          fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                          background: 'rgba(44, 24, 16, 0.25)',
                        }}>
                          {c.topic}
                        </div>
                        <div style={{ flex: 1, textAlign: 'left', padding: '10px 10px 10px 30px' }}>
                          <div className="font-display" style={{ fontSize: 'clamp(18px, 2.4vw, 28px)', fontWeight: 500, fontStyle: 'italic' }}>
                            {c.south}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer note */}
            <div className="states-footer" style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', opacity: rowsProgress * 0.85 }}>
              <div className="font-hand" style={{ fontSize: 26 }}>
                opposites attract. spices stack. ✨
              </div>
            </div>
          </div>
        </div>
        </PinnedCanvas>
      </div>
    </section>
  );
};

window.TwoStatesScene = TwoStatesScene;
