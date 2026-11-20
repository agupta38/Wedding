// Scene 7: Save the Date — big reveal
const SaveDateScene = () => {
  const ref = React.useRef(null);
  const progress = useScrollProgress(ref);

  const cardIn = remap(progress, 0.15, 0.55);
  const stampIn = remap(progress, 0.45, 0.75);

  return (
    <section ref={ref} id="scene-savedate" className="scene scene-full" data-screen-label="07 Save the Date" style={{ padding: '10vh 5vw', background: 'var(--cream-deep)', position: 'relative' }}>

      {/* Corner motifs */}
      <PaisleyCorner size={160} color="var(--rose)" style={{ position: 'absolute', top: 40, left: 40, opacity: 0.35 }} />
      <PaisleyCorner size={160} color="var(--marigold-deep)" style={{ position: 'absolute', bottom: 40, right: 40, opacity: 0.35, transform: 'scale(-1)' }} />

      <div style={{
        position: 'relative',
        transform: `translateY(${(1 - cardIn) * 60}px) rotate(${(1 - cardIn) * -3}deg)`,
        opacity: cardIn,
        transition: 'all 0.1s linear',
      }}>
        {/* Main save the date card */}
        <div className="save-date-card" style={{
          background: 'var(--cream)',
          border: '2px solid var(--ink)',
          padding: 'clamp(40px, 6vw, 80px) clamp(30px, 5vw, 70px)',
          maxWidth: 760,
          position: 'relative',
          boxShadow: '12px 12px 0 var(--ink), 12px 12px 0 2px var(--rose)',
        }}>
          {/* Decorative inner border */}
          <div style={{
            position: 'absolute', inset: 14,
            border: '1px solid var(--ink)', opacity: 0.3,
            pointerEvents: 'none',
          }} />

          <div style={{ textAlign: 'center', position: 'relative' }}>
            <div className="font-mono" style={{ fontSize: 11, letterSpacing: '0.4em', color: 'var(--rose)', fontWeight: 700 }}>
              ★ SAVE THE DATE ★
            </div>

            <div className="font-hand" style={{ fontSize: 28, marginTop: 20, color: 'var(--ink-soft)' }}>
              for the wedding of
            </div>

            <h1 className="font-display" style={{ fontSize: 'clamp(56px, 9vw, 120px)', fontStyle: 'italic', fontWeight: 500, lineHeight: 0.95, marginTop: 8 }}>
              Aarushi
            </h1>
            <div className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontStyle: 'italic', color: 'var(--marigold-deep)', lineHeight: 1, margin: '4px 0' }}>
              &
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(56px, 9vw, 120px)', fontStyle: 'italic', fontWeight: 500, lineHeight: 0.95 }}>
              Hari
            </h1>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, margin: '30px 0 24px' }}>
              <div style={{ width: 60, height: 1, background: 'var(--ink)' }} />
              <DoodleSparkle size={16} color="var(--gold)" />
              <DoodleHeart size={18} color="var(--rose)" />
              <DoodleSparkle size={16} color="var(--gold)" />
              <div style={{ width: 60, height: 1, background: 'var(--ink)' }} />
            </div>

            {/* Date */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(14px, 3vw, 40px)', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div className="font-mono" style={{ fontSize: 10, letterSpacing: '0.3em', opacity: 0.6 }}>MONDAY</div>
                <div className="font-display" style={{ fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 500, lineHeight: 1, fontStyle: 'italic' }}>17</div>
                <div className="font-mono" style={{ fontSize: 10, letterSpacing: '0.3em', opacity: 0.6 }}>MAY</div>
              </div>
              <div style={{ fontSize: 60, color: 'var(--ink)', opacity: 0.3, fontWeight: 300 }}>·</div>
              <div style={{ textAlign: 'center' }}>
                <div className="font-mono" style={{ fontSize: 10, letterSpacing: '0.3em', opacity: 0.6 }}>YEAR</div>
                <div className="font-display" style={{ fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 500, lineHeight: 1, fontStyle: 'italic' }}>2027</div>
                <div className="font-mono" style={{ fontSize: 10, letterSpacing: '0.3em', opacity: 0.6 }}>A.D.</div>
              </div>
            </div>

            <div style={{ marginTop: 34 }}>
              <div className="font-display" style={{ fontSize: 22, fontStyle: 'italic' }}>
                in the foothills of the Himalayas
              </div>
              <div className="font-mono" style={{ fontSize: 12, letterSpacing: '0.3em', marginTop: 8, color: 'var(--rose)' }}>
                DEHRADUN · UTTARAKHAND · INDIA
              </div>
            </div>

            <div style={{ marginTop: 30, padding: 14, background: 'var(--cream-deep)', borderTop: '1px dashed var(--ink)', borderBottom: '1px dashed var(--ink)', opacity: 0.85 }}>
              <div className="font-hand" style={{ fontSize: 22 }}>
                formal invitation + all the juicy details to follow
              </div>
            </div>
          </div>

          {/* Wax-seal-style stamp */}
          <div className="save-date-seal" style={{
            position: 'absolute',
            top: -30, right: -30,
            opacity: stampIn,
            transform: `scale(${0.3 + stampIn * 0.7}) rotate(${-20 + stampIn * 5}deg)`,
            transition: 'all 0.1s linear',
          }}>
            <Postmark text1="★ AARUSHI + HARI ★" text2="17 · MAY · 2027" size={130} color="var(--rose)" />
          </div>

          {/* Tape on top */}
          <div className="tape" style={{ top: -14, left: '20%', width: 90, height: 24, transform: 'rotate(-4deg)' }} />
          <div className="tape" style={{ top: -14, right: '20%', width: 90, height: 24, transform: 'rotate(3deg)' }} />
        </div>
      </div>
    </section>
  );
};

window.SaveDateScene = SaveDateScene;
