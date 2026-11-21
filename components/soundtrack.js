// One media element keeps Safari's playback permission across playlist changes.
window.createWeddingSoundtrack = ({ audio, songs, eventTarget, storage, onChange }) => {
  let disposed = false;
  let request = 0;
  let wantsPlayback = true;
  let loading = false;
  const failedTracks = new Set();
  let savedMute = false;
  try { savedMute = storage?.getItem('wedding-music-muted') === 'true'; } catch (_) {}
  audio.muted = savedMute;
  let state = { selected: 0, isPlaying: false, muted: savedMute, needsGesture: false, status: 'Loading audio preview…' };
  const update = patch => {
    if (disposed) return;
    state = { ...state, ...patch };
    onChange(state);
  };
  const saveMute = () => {
    try { storage?.setItem('wedding-music-muted', String(audio.muted)); } catch (_) {}
    update({ muted: audio.muted });
  };
  const setMuted = muted => { audio.muted = muted; saveMute(); };

  const failTrack = () => {
    if (disposed || !wantsPlayback || failedTracks.has(state.selected)) return;
    failedTracks.add(state.selected);
    if (failedTracks.size === songs.length) {
      wantsPlayback = false;
      loading = false;
      request++;
      audio.pause();
      update({ isPlaying: false, needsGesture: false, status: 'Audio previews are unavailable. Try play again or open a full song on YouTube.' });
      return;
    }
    let next = (state.selected + 1) % songs.length;
    while (failedTracks.has(next)) next = (next + 1) % songs.length;
    playIndex(next);
  };

  const playIndex = async index => {
    if (disposed) return;
    const attempt = ++request;
    wantsPlayback = true;
    loading = true;
    const changeSource = !audio.getAttribute || !audio.getAttribute('src') || state.selected !== index;
    update({ selected: index, isPlaying: false, needsGesture: false, status: 'Loading audio preview…' });
    if (changeSource) {
      audio.src = songs[index].preview;
      audio.load();
    } else if (audio.ended) audio.currentTime = 0;
    try {
      await audio.play();
    } catch (error) {
      if (disposed || attempt !== request || error.name === 'AbortError') return;
      loading = false;
      if (error.name === 'NotAllowedError') {
        update({ isPlaying: false, needsGesture: true, status: 'Tap anywhere on the page or Play music to start the soundtrack.' });
      } else failTrack();
    }
  };

  const events = {
    playing: () => { wantsPlayback = true; loading = false; update({ isPlaying: true, needsGesture: false, status: 'Playing audio preview · the next song starts automatically' }); },
    pause: () => {
      if (!audio.paused || audio.ended || loading) return;
      wantsPlayback = false;
      request++;
      update({ isPlaying: false, needsGesture: false, status: 'Paused' });
    },
    waiting: () => update({ isPlaying: false, status: 'Loading audio preview…' }),
    ended: () => {
      if (!wantsPlayback || disposed) return;
      failedTracks.clear();
      playIndex((state.selected + 1) % songs.length);
    },
    error: failTrack,
    volumechange: saveMute,
  };
  Object.entries(events).forEach(([name, handler]) => audio.addEventListener(name, handler));
  const onGesture = event => {
    if (!state.needsGesture || !wantsPlayback || disposed) return;
    if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) return;
    // Music controls handle their own tap; a second retry would undo a pause/mute.
    if (event.target?.closest?.('[data-soundtrack-control]')) return;
    playIndex(state.selected);
  };
  eventTarget.addEventListener('click', onGesture);
  eventTarget.addEventListener('keydown', onGesture);

  return {
    start() { update({}); playIndex(0); },
    choose(index) {
      if (disposed) return;
      if (index === state.selected && !audio.paused) {
        wantsPlayback = false;
        loading = false;
        request++;
        audio.pause();
        update({ isPlaying: false, needsGesture: false, status: 'Paused' });
      } else {
        failedTracks.clear();
        setMuted(false);
        playIndex(index);
      }
    },
    toggleMuted() {
      if (disposed) return;
      if (state.needsGesture || (!state.muted && !wantsPlayback)) {
        failedTracks.clear();
        setMuted(false);
        playIndex(state.selected);
      } else {
        setMuted(!audio.muted);
        if (!audio.muted && audio.paused) playIndex(state.selected);
      }
    },
    destroy() {
      disposed = true;
      request++;
      wantsPlayback = false;
      Object.entries(events).forEach(([name, handler]) => audio.removeEventListener(name, handler));
      eventTarget.removeEventListener('click', onGesture);
      eventTarget.removeEventListener('keydown', onGesture);
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    },
  };
};
