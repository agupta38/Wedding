// Scene 10: RSVP / details to follow + footer
const RSVPScene = () => {
  const ref = React.useRef(null);
  const inView = useInView(ref);
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) setSubmitted(true);
  };

  return (
    <section ref={ref} id="scene-rsvp" className="scene" data-screen-label="10 Details" style={{ padding: 0, background: 'var(--cream-deep)' }}>

      {/* Marquee banner */}
      <div className="marquee">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <React.Fragment key={k}>
              <span>Aarushi & Hari</span><span className="dot">✦</span>
              <span><i>17 May 2027</i></span><span className="dot">✦</span>
              <span>Dehradun</span><span className="dot">✦</span>
              <span><i>Save the Date</i></span><span className="dot">✦</span>
              <span>Bring your dancing shoes</span><span className="dot">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ padding: '10vh 5vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 720 }}>
          <div className="font-mono" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>The Last Word</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(40px, 6.5vw, 80px)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1, marginTop: 6 }}>
            Details <span style={{ color: 'var(--rose)' }}>to follow</span>
          </h2>
          <div className="font-hand" style={{ fontSize: 26, marginTop: 16, color: 'var(--ink-soft)', maxWidth: 540, margin: '16px auto 0' }}>
            a formal invitation with venue, timings, dress code, and all the chaos is on its way. drop your email and we'll keep you in the loop.
          </div>
        </div>

        {/* Email form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ marginTop: 40, display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="email"
              placeholder="your.best@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                padding: '14px 18px',
                border: '1.5px solid var(--ink)',
                background: 'var(--cream)',
                fontFamily: 'DM Sans',
                fontSize: 14,
                minWidth: 280,
                outline: 'none',
              }}
            />
            <button type="submit" className="btn">
              Keep me in the loop
              <span>→</span>
            </button>
          </form>
        ) : (
          <div style={{ marginTop: 40, padding: 24, background: 'var(--marigold)', border: '1.5px solid var(--ink)', textAlign: 'center', position: 'relative' }}>
            <div className="font-display" style={{ fontSize: 28, fontStyle: 'italic', fontWeight: 500 }}>
              you're on the list ✦
            </div>
            <div className="font-hand" style={{ fontSize: 20, marginTop: 4 }}>
              see you in dehradun
            </div>
          </div>
        )}

        {/* Three info cards */}
        <div style={{ marginTop: 60, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, width: '100%', maxWidth: 900 }}>
          {[
            { title: 'Getting There', body: 'Nearest airport: Jolly Grant (DED). Delhi is a scenic 5-hr drive.', icon: '✈' },
            { title: 'Stay', body: 'Room blocks at nearby hotels — details will arrive with the formal invite.', icon: '☾' },
            { title: 'Dress Code', body: 'Bring your brightest. Indian festive attire encouraged, not required.', icon: '✿' },
          ].map((c, i) => (
            <div key={i} style={{
              background: 'var(--cream)',
              border: '1.5px solid var(--ink)',
              padding: 24,
              position: 'relative',
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              opacity: inView ? 1 : 0,
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
            }}>
              <div style={{ fontSize: 28, color: 'var(--rose)', marginBottom: 8 }}>{c.icon}</div>
              <div className="font-display" style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 500 }}>
                {c.title}
              </div>
              <div style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.5 }}>
                {c.body}
              </div>
            </div>
          ))}
        </div>

        {/* Signoff */}
        <div style={{ marginTop: 80, textAlign: 'center' }}>
          <div className="font-display" style={{ fontSize: 'clamp(40px, 7vw, 84px)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1 }}>
            See you in <span style={{ color: 'var(--marigold-deep)' }}>Dehradun</span>.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 18 }}>
            <DoodleSparkle size={18} color="var(--gold)" />
            <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.3em' }}>LOVE, A + H</span>
            <DoodleSparkle size={18} color="var(--gold)" />
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 80, width: '100%', borderTop: '1px solid var(--paper-line)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, color: 'var(--ink-soft)' }}>
          <div className="font-mono" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
            AARUSHI + HARI · ESTD. DEC 2023
          </div>
          <div className="font-mono" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
            TORONTO → DEHRADUN · 11,934 KM
          </div>
          <div className="font-mono" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
            #AARUSHIxHARI27
          </div>
        </div>
      </div>
    </section>
  );
};

window.RSVPScene = RSVPScene;
