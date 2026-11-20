// Toronto: scroll-scrubbed clouds, skyline, memories and first-date ticket.
const TorontoScene = () => {
  const ref = React.useRef(null);
  const progress = usePinnedProgress(ref);
  const cards = [remap(progress, .12, .35), remap(progress, .28, .52), remap(progress, .43, .67)];
  const ticket = remap(progress, .65, .87);
  return (
    <section ref={ref} id="scene-toronto" className="scene scene-tall toronto-scene animated-scene" data-screen-label="03 Toronto" data-scroll-progress={progress}>
      <div className="sticky-wrap">
        <PinnedCanvas className="toronto-canvas">
          <div className="toronto-cloud cloud-one" style={{ transform: `translateX(${-progress * 120}px)` }} aria-hidden="true"><svg viewBox="0 0 180 40"><ellipse cx="40" cy="25" rx="35" ry="12"/><ellipse cx="80" cy="20" rx="40" ry="15"/><ellipse cx="130" cy="25" rx="35" ry="12"/></svg></div>
          <div className="toronto-cloud cloud-two" style={{ transform: `translateX(${progress * 80}px)` }} aria-hidden="true"><svg viewBox="0 0 180 40"><ellipse cx="40" cy="25" rx="35" ry="12"/><ellipse cx="80" cy="20" rx="40" ry="15"/><ellipse cx="130" cy="25" rx="35" ry="12"/></svg></div>
          <header className="scene-heading toronto-heading"><div className="eyebrow">Chapter Two</div><h2 className="font-display">Toronto, the <span>6ix</span></h2><p className="font-hand">our favourite city. our very first date.</p></header>
          <div className="toronto-panorama" style={{ transform: `translateY(${-progress * 35}px)` }}><TorontoSkyline /></div>
          <div className="toronto-memory memory-one" style={{ opacity: cards[0], transform: `translateX(${(1-cards[0]) * -90}px) rotate(-7deg)` }}>
            <Polaroid w={200} h={230} caption="bar volo ♥" tape><div className="memory-art memory-wine"><span className="font-hand">first<br/>date<br/>🍷</span></div></Polaroid>
          </div>
          <div className="toronto-memory memory-two" style={{ opacity: cards[1], transform: `translateX(${(1-cards[1]) * 90}px) rotate(6deg)` }}>
            <Polaroid w={200} h={230} caption="view from the 6ix" tape><div className="memory-art memory-night"><CNTower h={110} color="#fff2cf" /><span className="city-lights" aria-hidden="true">✦ · ✧ · ✦</span></div></Polaroid>
          </div>
          <div className="toronto-memory memory-three" style={{ opacity: cards[2], transform: `translateY(${(1-cards[2]) * 70}px) rotate(-4deg)` }}>
            <Polaroid w={180} h={210} caption="skating @ harbourfront"><div className="memory-art memory-skates"><span aria-label="ice skating">⛸</span></div></Polaroid>
          </div>
          <div className="toronto-ticket" style={{ opacity: ticket, transform: `translate(-50%, ${(1-ticket) * 60}px) rotate(-2deg)` }}><div className="ticket first-date-ticket"><div><div className="eyebrow">DATE #001</div><div className="font-display">Bar Volo</div><p>College St · Toronto</p></div><div className="font-hand">where it all began ♥</div></div></div>
        </PinnedCanvas>
      </div>
    </section>
  );
};
window.TorontoScene = TorontoScene;
