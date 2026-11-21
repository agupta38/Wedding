// Licensed Apple Music previews; full songs open on the selected YouTube videos.
const weddingSongs = [
  {
    "title": "Gallan Goodiyaan",
    "artist": "Yashita Sharma, Manish Kumar Tipu, Farhan Akhtar, Shankar Mahadevan & Sukhwinder Singh",
    "note": "everyone on the dance floor",
    "video": "6Em4WhOh7uc",
    "preview": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/0a/b1/65/0ab165c2-5461-139b-3361-43d39f4f7f77/mzaf_13810064433892693288.plus.aac.p.m4a",
    "apple": "https://music.apple.com/in/album/gallan-goodiyaan/1071191851?i=1071192712&uo=4"
  },
  {
    "title": "London Thumakda",
    "artist": "Labh Janjua, Sonu Kakkar & Neha Kakkar",
    "note": "the sangeet starts here",
    "video": "udra3Mfw2oo",
    "preview": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/04/f2/15/04f2159c-f378-3323-d3a0-c055474ec688/mzaf_11306147181651969029.plus.aac.p.m4a",
    "apple": "https://music.apple.com/in/album/london-thumakda/1116194763?i=1116194835&uo=4"
  },
  {
    "title": "Poopol Poopol (Instrumental)",
    "artist": "Harris Jayaraj, Tippu & Karthik",
    "note": "a little minnale magic",
    "video": "HTpJXEM-nmM",
    "preview": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/02/77/f0/0277f0dd-ab1a-36c8-24f6-6ad13f9e2ec4/mzaf_3423349995641888146.plus.aac.p.m4a",
    "apple": "https://music.apple.com/in/album/poopol-poopol/1564309477?i=1564309488&uo=4"
  },
  {
    "title": "Morni",
    "artist": "Diljit Dosanjh, Chani Nattan & Tru-Skool",
    "note": "turn it up",
    "video": "hRV1b4v1fso",
    "preview": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f5/6e/e4/f56ee414-2027-b605-7455-a24fbc433373/mzaf_3937962578481238111.plus.aac.p.m4a",
    "apple": "https://music.apple.com/in/album/morni/1894792752?i=1894792753&uo=4"
  },
  {
    "title": "SLICK (Remix)",
    "artist": "Victony, Don Toliver & Summer Walker",
    "note": "the after-party mood",
    "video": "ksnN8PMf30I",
    "preview": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f8/d4/10/f8d410ee-fb9f-e548-429b-c8833ce90623/mzaf_12877011975889179812.plus.aac.p.m4a",
    "apple": "https://music.apple.com/us/album/slick-feat-don-toliver-remix/6821146861?i=6821146865&uo=4"
  }
];

const PlaylistScene = () => {
  const [playback, setPlayback] = React.useState({ selected: 0, status: 'Loading audio preview…', isPlaying: false, muted: false, needsGesture: false });
  const { selected, status, isPlaying, muted, needsGesture } = playback;
  const audio = React.useRef(null);
  const player = React.useRef(null);

  React.useEffect(() => {
    let storage;
    try { storage = window.localStorage; } catch (_) {}
    const soundtrack = createWeddingSoundtrack({ audio: audio.current, songs: weddingSongs, eventTarget: document, storage, onChange: setPlayback });
    player.current = soundtrack;
    soundtrack.start();
    return () => { soundtrack.destroy(); player.current = null; };
  }, []);

  const needsPlay = needsGesture || status === 'Paused' || status.startsWith('Audio previews are unavailable');
  const musicAction = muted ? 'Unmute music' : needsPlay ? 'Play music' : 'Mute music';

  return (
    <>
    <button type="button" className="soundtrack-toggle" data-soundtrack-control aria-label={musicAction} aria-pressed={muted} aria-controls="wedding-audio" title={musicAction} onClick={() => player.current?.toggleMuted()}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {musicAction === 'Play music' ? <path d="m8 5 11 7-11 7V5Z" /> : <>
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          {muted ? <path d="m17 9 5 6m0-6-5 6" /> : <><path d="M15 8a6 6 0 0 1 0 8" /><path d="M18 5a10 10 0 0 1 0 14" /></>}
        </>}
      </svg>
      <span>{musicAction === 'Play music' ? 'Play music' : muted ? 'Muted' : 'Music on'}</span>
    </button>
    <section id="scene-playlist" className="scene" data-screen-label="09 Playlist" style={{ padding: '10vh 5vw', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <header className="scene-heading" style={{ textAlign: 'left', marginBottom: 32 }}>
          <div className="eyebrow">Chapter Six</div>
          <h2 className="font-display">The <span>soundtrack</span></h2>
          <p className="font-hand">a playlist, mostly curated by aarushi</p>
          <p className="playlist-help">The previews play in a loop. Use the side button to mute, or open YouTube for a full song.</p>
        </header>
        <div className="playlist-list">
          {weddingSongs.map((song, i) => (
            <div className={`song-row ${selected === i && isPlaying ? 'is-playing' : ''}`} key={song.video}>
              <button className="song-play" data-soundtrack-control onClick={() => player.current?.choose(i)} aria-label={`${selected === i && isPlaying ? 'Pause' : 'Play preview of'} ${song.title}`} aria-pressed={selected === i && isPlaying} aria-controls="wedding-audio">
                <span aria-hidden="true">{selected === i && isPlaying ? '❚❚' : '▶'}</span>
              </button>
              <div><div className="font-display song-title">{song.title}</div><div className="song-artist">{song.artist}</div><div className="font-hand song-note">{song.note}</div></div>
              <a className="song-link" href={`https://www.youtube.com/watch?v=${song.video}`} target="_blank" rel="noopener noreferrer" aria-label={`Listen to ${song.title} on YouTube`}>Full song on YouTube</a>
            </div>
          ))}
        </div>
        <div className="music-player">
          <p className="music-status" role="status" aria-live="polite"><strong>{weddingSongs[selected].title} · </strong>{status}</p>
          <audio id="wedding-audio" ref={audio} controls playsInline preload="auto" data-soundtrack-control aria-label={`${weddingSongs[selected].title} audio preview`} />
          <p className="music-credit">Preview courtesy of <a href={weddingSongs[selected].apple} target="_blank" rel="noopener noreferrer">Apple Music</a> · <a href={`https://www.youtube.com/watch?v=${weddingSongs[selected].video}`} target="_blank" rel="noopener noreferrer">Full song on YouTube</a></p>
        </div>
        <p className="font-hand" style={{ textAlign: 'center', marginTop: 24, fontSize: 24 }}>song requests? bring them to the sangeet.</p>
      </div>
    </section>
    </>
  );
};
window.PlaylistScene = PlaylistScene;
