// Main app — mounts all scenes + handles nav dots, progress, tweaks
const App = () => {
  const [activeScene, setActiveScene] = React.useState('scene-hero');

  // JSX loads asynchronously; honor direct chapter links after the scenes mount.
  React.useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    document.fonts.ready.then(() => {
      if (window.location.hash !== hash) return;
      const scene = document.getElementById(hash.slice(1));
      if (scene) scene.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
  }, []);

  // Progress bar
  React.useEffect(() => {
    const fill = document.getElementById('progressFill');
    let current = 'scene-hero';
    let previousProgress = -1;
    return subscribeScrollFrame({
      measure: frame => [...document.querySelectorAll('.scene')].map(scene => {
        const rect = scene.getBoundingClientRect();
        return { id: scene.id, top: rect.top + frame.scrollY, bottom: rect.bottom + frame.scrollY };
      }),
      update: (frame, scenes) => {
        const distance = frame.documentHeight - frame.viewportHeight;
        const progress = distance > 0 ? Math.max(0, Math.min(1, frame.scrollY / distance)) : 0;
        if (fill && progress !== previousProgress) {
          fill.style.transform = `scaleX(${progress})`;
          previousProgress = progress;
        }
        const center = frame.scrollY + frame.viewportHeight * .5;
        const scene = scenes.find(item => item.top <= center && item.bottom > center);
        const next = scene ? scene.id : 'scene-hero';
        if (next !== current) { current = next; setActiveScene(next); }
      },
    });
  }, []);

  // Nav dots active + click
  React.useEffect(() => {
    document.querySelectorAll('.nav-dot').forEach(d => {
      const target = d.dataset.target;
      d.classList.toggle('active', target === activeScene);
      d.onclick = () => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
    });
  }, [activeScene]);

  // Tweaks panel — register listener first, then announce
  React.useEffect(() => {
    const panel = document.getElementById('tweaks-panel');
    const toggle = document.getElementById('tweaksToggle');

    const msgHandler = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') {
        toggle.style.display = 'flex';
      } else if (e.data.type === '__deactivate_edit_mode') {
        toggle.style.display = 'none';
        panel.classList.remove('show');
      }
    };
    window.addEventListener('message', msgHandler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');

    if (toggle) toggle.onclick = () => panel.classList.toggle('show');

    // Palette swatches
    document.querySelectorAll('#paletteSwatches .tweak-swatch').forEach(s => {
      s.onclick = () => {
        document.querySelectorAll('#paletteSwatches .tweak-swatch').forEach(x => x.classList.remove('active'));
        s.classList.add('active');
        const p = s.dataset.palette;
        const root = document.documentElement;
        if (p === 'warm') {
          root.style.setProperty('--marigold', '#E8833A');
          root.style.setProperty('--rose', '#C41E3A');
          root.style.setProperty('--gold', '#DAA520');
        } else if (p === 'cool') {
          root.style.setProperty('--marigold', '#DAA520');
          root.style.setProperty('--rose', '#5B6B4A');
          root.style.setProperty('--gold', '#B8754F');
        } else if (p === 'rose') {
          root.style.setProperty('--marigold', '#DAA520');
          root.style.setProperty('--rose', '#C41E3A');
          root.style.setProperty('--gold', '#E8A568');
        }
        window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { accentPalette: p } }, '*');
      };
    });

    return () => window.removeEventListener('message', msgHandler);
  }, []);

  return <WeddingStory />;
};

// Updating the navigation must not rerender every illustrated scene.
const WeddingStory = React.memo(() => (
  <>
    <HeroScene />
    <BumbleScene />
    <TorontoScene />
    <FlightScene />
    <TwoStatesScene />
    <DehradunScene />
    <SaveDateScene />
    <CountdownScene />
    <PlaylistScene />
    <RSVPScene />
  </>
));

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
