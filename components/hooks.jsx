// One frame-aligned scroll loop shared by all scenes and the navigation.
// Layout is measured together, only after geometry changes; writes follow reads.
const scrollFrames = (() => {
  const subscribers = new Set();
  let frameID = 0;
  let dirty = true;
  let viewport = null;
  let observer = null;
  let viewportHeight = 0;
  let documentHeight = 0;

  const schedule = () => {
    if (!frameID) frameID = requestAnimationFrame(tick);
  };
  const invalidate = () => { dirty = true; schedule(); };
  const tick = () => {
    frameID = 0;
    if (!subscribers.size) return;
    // Keep the signed Safari overscroll offset when measuring document positions.
    const scrollY = window.scrollY || 0;
    if (dirty) {
      viewportHeight = Math.max(1, viewport.clientHeight || document.documentElement.clientHeight);
      documentHeight = document.documentElement.scrollHeight;
      const measurement = { scrollY, viewportHeight, documentHeight };
      subscribers.forEach(item => { item.geometry = item.measure(measurement); });
      dirty = false;
    }
    const frame = { scrollY, viewportHeight, documentHeight };
    subscribers.forEach(item => item.update(frame, item.geometry));
  };
  const start = () => {
    // Safari's URL bar changes innerHeight while scrolling. Match the stable
    // 100svh used by the pinned scenes instead of retiming their animations.
    viewport = document.createElement('div');
    viewport.setAttribute('aria-hidden', 'true');
    viewport.style.cssText = 'position:fixed;top:0;left:0;width:0;height:100svh;visibility:hidden;pointer-events:none;contain:strict';
    document.body.appendChild(viewport);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', invalidate);
    window.addEventListener('pageshow', invalidate);
    observer = new ResizeObserver(invalidate);
    observer.observe(document.body);
    observer.observe(viewport);
    document.fonts.ready.then(() => { if (subscribers.size) invalidate(); });
    document.fonts.addEventListener('loadingdone', invalidate);
  };
  const stop = () => {
    cancelAnimationFrame(frameID);
    frameID = 0;
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', invalidate);
    window.removeEventListener('pageshow', invalidate);
    document.fonts.removeEventListener('loadingdone', invalidate);
    observer.disconnect();
    viewport.remove();
    viewport = null;
  };
  return {
    subscribe(item) {
      subscribers.add(item);
      if (subscribers.size === 1) start();
      if (item.element) observer.observe(item.element);
      invalidate();
      return () => {
        subscribers.delete(item);
        if (item.element) observer.unobserve(item.element);
        if (!subscribers.size) stop();
      };
    },
  };
})();
const subscribeScrollFrame = item => scrollFrames.subscribe(item);

const useSceneProgress = (ref, pinned) => {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let previous = -1;
    let active = false;
    const unsubscribe = subscribeScrollFrame({
      element,
      measure: frame => {
        const rect = element.getBoundingClientRect();
        const pin = pinned ? element.querySelector('.sticky-wrap') : null;
        return { top: rect.top + frame.scrollY, height: rect.height, pinHeight: pin ? pin.clientHeight : frame.viewportHeight };
      },
      update: (frame, geometry) => {
        const passed = frame.scrollY - geometry.top;
        const distance = geometry.height - geometry.pinHeight;
        const raw = pinned
          ? (distance > 0 ? passed / distance : (passed >= 0 ? 1 : 0))
          : (frame.viewportHeight + passed) / (frame.viewportHeight + geometry.height);
        const next = Math.max(0, Math.min(1, raw));
        const visible = passed + frame.viewportHeight >= 0 && passed <= geometry.height;
        if (visible !== active) {
          active = visible;
          element.classList.toggle('is-scroll-active', active);
        }
        if (Math.abs(next - previous) > .00001) { previous = next; setProgress(next); }
      },
    });
    return () => { unsubscribe(); element.classList.toggle('is-scroll-active', false); };
  }, [ref, pinned]);
  return progress;
};
const useScrollProgress = ref => useSceneProgress(ref, false);
const usePinnedProgress = ref => useSceneProgress(ref, true);

// True once element has been seen in viewport
const useInView = (ref, { threshold = 0.2, once = true } = {}) => {
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
};

// Helper: clamp and remap progress
const remap = (p, inA, inB, outA = 0, outB = 1) => {
  const t = Math.max(0, Math.min(1, (p - inA) / (inB - inA)));
  return outA + (outB - outA) * t;
};

const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2;

Object.assign(window, { subscribeScrollFrame, useScrollProgress, usePinnedProgress, useInView, remap, easeOut, easeInOut });
