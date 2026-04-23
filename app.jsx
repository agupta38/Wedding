// Main app — mounts all scenes + handles nav dots, progress, tweaks
const App = () => {
  const [activeScene, setActiveScene] = React.useState('scene-hero');

  // Progress bar
  React.useEffect(() => {
    const fill = document.getElementById('progressFill');
    const handler = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      if (fill) fill.style.width = (scrolled * 100) + '%';

      // Active dot
      const scenes = document.querySelectorAll('.scene');
      let current = 'scene-hero';
      const vh = window.innerHeight;
      scenes.forEach(s => {
        const r = s.getBoundingClientRect();
        if (r.top < vh * 0.5 && r.bottom > vh * 0.5) current = s.id;
      });
      setActiveScene(current);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
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

  return (
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
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
