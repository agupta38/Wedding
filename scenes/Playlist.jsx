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
  const [selected, setSelected] = React.useState(null);
  const [status, setStatus] = React.useState('Choose a song for an audio preview.');
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audio = React.useRef(null);
  const selectedRef = React.useRef(null);
  const requestRef = React.useRef(0);

  React.useEffect(() => {
    const element = audio.current;
    return () => { requestRef.current += 1; element.pause(); };
  }, []);

  const chooseSong = async (index) => {
    const element = audio.current;
    if (selectedRef.current === index && !element.paused) {
      element.pause();
      return;
    }
    const request = ++requestRef.current;
    if (selectedRef.current !== index) {
      element.pause();
      selectedRef.current = index;
      setSelected(index);
      element.src = weddingSongs[index].preview;
      element.load();
    }
    setStatus('Loading audio preview…');
    try {
      await element.play();
    } catch (error) {
      if (request !== requestRef.current || error.name === 'AbortError') return;
      setIsPlaying(false);
      setStatus(error.name === 'NotAllowedError' ? 'Tap play in the audio controls to start.' : 'Audio could not load. Listen to the full song on YouTube below.');
    }
  };

  return (
    <section id="scene-playlist" className="scene" data-screen-label="09 Playlist" style={{ padding: '10vh 5vw', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <header className="scene-heading" style={{ textAlign: 'left', marginBottom: 32 }}>
          <div className="eyebrow">Chapter Six</div>
          <h2 className="font-display">The <span>soundtrack</span></h2>
          <p className="font-hand">a playlist, mostly curated by aarushi</p>
          <p className="playlist-help">Tap play for an audio preview. Open YouTube for the full song.</p>
        </header>
        <div className="playlist-list">
          {weddingSongs.map((song, i) => (
            <div className={`song-row ${selected === i && isPlaying ? 'is-playing' : ''}`} key={song.video}>
              <button className="song-play" onClick={() => chooseSong(i)} aria-label={`${selected === i && isPlaying ? 'Pause' : 'Play preview of'} ${song.title}`} aria-pressed={selected === i && isPlaying} aria-controls="wedding-audio">
                <span aria-hidden="true">{selected === i && isPlaying ? '❚❚' : '▶'}</span>
              </button>
              <div><div className="font-display song-title">{song.title}</div><div className="song-artist">{song.artist}</div><div className="font-hand song-note">{song.note}</div></div>
              <a className="song-link" href={`https://www.youtube.com/watch?v=${song.video}`} target="_blank" rel="noopener noreferrer" aria-label={`Listen to ${song.title} on YouTube`}>Full song on YouTube</a>
            </div>
          ))}
        </div>
        <div className="music-player" hidden={selected === null}>
          <p className="music-status" role="status" aria-live="polite">{selected !== null && <strong>{weddingSongs[selected].title} · </strong>}{status}</p>
          <audio id="wedding-audio" ref={audio} controls preload="none" aria-label={selected === null ? 'Wedding song preview player' : `${weddingSongs[selected].title} audio preview`}
            onPlaying={() => { setIsPlaying(true); setStatus('Playing audio preview'); }}
            onPause={() => { setIsPlaying(false); setStatus('Paused'); }}
            onWaiting={() => { setIsPlaying(false); setStatus('Loading audio preview…'); }}
            onEnded={() => { setIsPlaying(false); setStatus('Preview finished. Open YouTube for the full song.'); }}
            onError={() => { setIsPlaying(false); setStatus('Audio could not load. Listen to the full song on YouTube below.'); }} />
          {selected !== null && <p className="music-credit">Preview courtesy of <a href={weddingSongs[selected].apple} target="_blank" rel="noopener noreferrer">Apple Music</a> · <a href={`https://www.youtube.com/watch?v=${weddingSongs[selected].video}`} target="_blank" rel="noopener noreferrer">Full song on YouTube</a></p>}
        </div>
        <p className="font-hand" style={{ textAlign: 'center', marginTop: 24, fontSize: 24 }}>song requests? bring them to the sangeet.</p>
      </div>
    </section>
  );
};
window.PlaylistScene = PlaylistScene;
