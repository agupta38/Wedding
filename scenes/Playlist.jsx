// Licensed Apple Music previews; full songs open on their official YouTube pages.
const weddingSongs = [
  {
    "title": "Tum Se Hi",
    "artist": "Pritam & Mohit Chauhan",
    "note": "the one on the drive home",
    "video": "mt9xg0mmt28",
    "preview": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e7/39/b8/e739b870-54a1-8f33-57d5-3817108b8bd9/mzaf_16925921654959290990.plus.aac.p.m4a",
    "apple": "https://music.apple.com/in/album/tum-se-hi/1134725343?i=1134725347&uo=4"
  },
  {
    "title": "Why This Kolaveri Di",
    "artist": "Anirudh Ravichander & Dhanush",
    "note": "hari made it iconic",
    "video": "YR12Z8f1Dh8",
    "preview": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/1d/38/f4/1d38f427-0cd0-d96c-6f3d-af091bf795b7/mzaf_12602049532375607798.plus.aac.p.m4a",
    "apple": "https://music.apple.com/in/album/why-this-kolaveri-di-3/520548806?i=520549421&uo=4"
  },
  {
    "title": "Tum Hi Ho",
    "artist": "Mithoon & Arijit Singh",
    "note": "first dance contender",
    "video": "Umqb9KENgmk",
    "preview": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3a/8c/9b/3a8c9b0b-2def-750a-f615-1555bf941edf/mzaf_17229496441442805917.plus.aac.p.m4a",
    "apple": "https://music.apple.com/in/album/tum-hi-ho/1073359412?i=1073359419&uo=4"
  },
  {
    "title": "Chaiyya Chaiyya",
    "artist": "Sukhwinder Singh & Sapna Awasthi",
    "note": "baraat certified banger",
    "video": "PXacOfTi4uA",
    "preview": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/81/6c/e7/816ce721-3a37-0e57-3aa7-c3e180c4b38c/mzaf_10595670915474775723.plus.aac.p.m4a",
    "apple": "https://music.apple.com/in/album/chaiyya-chaiyya/1130322055?i=1130322151&uo=4"
  },
  {
    "title": "Levitating",
    "artist": "Dua Lipa",
    "note": "the toronto era",
    "video": "N000qglmmY0",
    "preview": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/59/dc/4d/59dc4dda-93ff-8f1c-c536-f005f6ea6af5/mzaf_3066686759813252385.plus.aac.p.m4a",
    "apple": "https://music.apple.com/in/album/levitating/1538003494?i=1538003843&uo=4"
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
