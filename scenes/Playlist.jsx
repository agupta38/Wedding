// Scene 9: Playlist — the songs of their story
const PlaylistScene = () => {
  const ref = React.useRef(null);
  const inView = useInView(ref);
  const [playing, setPlaying] = React.useState(null);

  const songs = [
    { title: 'Tum Se Hi', artist: 'Jab We Met', note: 'the one on the drive home', dur: '4:59' },
    { title: 'Why This Kolaveri Di', artist: 'Dhanush', note: 'hari made it iconic', dur: '4:12' },
    { title: 'Tum Hi Ho', artist: 'Arijit Singh', note: 'first dance contender', dur: '4:22' },
    { title: 'Chaiyya Chaiyya', artist: 'Sukhwinder Singh', note: 'baraat certified banger', dur: '6:51' },
    { title: 'Jasmine Flower', artist: 'A.R. Rahman', note: 'south vibes, always', dur: '3:30' },
    { title: 'Levitating', artist: 'Dua Lipa', note: 'the toronto era', dur: '3:24' },
  ];

  return (
    <section ref={ref} id="scene-playlist" className="scene" data-screen-label="09 Playlist" style={{ padding: '10vh 5vw', background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 40 }}>
          <div>
            <div className="font-mono" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>Chapter Six</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(40px, 6.5vw, 80px)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1, marginTop: 4 }}>
              The <span style={{ color: 'var(--rose)' }}>soundtrack</span>
            </h2>
            <div className="font-hand" style={{ fontSize: 24, marginTop: 4, color: 'var(--ink-soft)' }}>
              a playlist, mostly curated by aarushi
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--ink)', color: 'var(--cream)', padding: '8px 14px' }}>
            <div style={{ display: 'flex', gap: 3, alignItems: 'center', height: 18 }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{
                  width: 3,
                  background: 'var(--marigold)',
                  height: `${30 + Math.sin(Date.now() * 0.002 + i) * 30}%`,
                  animation: `eq ${0.6 + i * 0.15}s ease-in-out infinite alternate`,
                }} />
              ))}
            </div>
            <span className="font-mono" style={{ fontSize: 10, letterSpacing: '0.2em' }}>NOW PLAYING</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--cream-deep)', border: '1.5px solid var(--ink)' }}>
          {songs.map((s, i) => (
            <div
              key={i}
              onClick={() => setPlaying(playing === i ? null : i)}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 40px 1fr auto 60px',
                gap: 16,
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: i === songs.length - 1 ? 'none' : '1px dashed var(--paper-line)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                background: playing === i ? 'var(--marigold)' : 'transparent',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                transitionDelay: `${i * 60}ms`,
              }}
              onMouseEnter={e => { if (playing !== i) e.currentTarget.style.background = 'rgba(218, 165, 32, 0.15)'; }}
              onMouseLeave={e => { if (playing !== i) e.currentTarget.style.background = 'transparent'; }}
            >
              <div className="font-mono" style={{ fontSize: 12, color: 'var(--ink-soft)', textAlign: 'right' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{
                width: 32, height: 32,
                borderRadius: '50%',
                background: 'var(--ink)',
                color: 'var(--cream)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10,
              }}>
                {playing === i ? '❚❚' : '▶'}
              </div>
              <div>
                <div className="font-display" style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 500, lineHeight: 1.1 }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 2 }}>
                  {s.artist}
                </div>
              </div>
              <div className="font-hand" style={{ fontSize: 18, color: 'var(--rose)', textAlign: 'right' }}>
                {s.note}
              </div>
              <div className="font-mono" style={{ fontSize: 12, color: 'var(--ink-soft)', textAlign: 'right' }}>
                {s.dur}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <span className="font-hand" style={{ fontSize: 22, color: 'var(--ink-soft)' }}>
            song requests? bring them to the sangeet.
          </span>
        </div>
      </div>
      <style>{`
        @keyframes eq { from { height: 20%; } to { height: 90%; } }
      `}</style>
    </section>
  );
};

window.PlaylistScene = PlaylistScene;
