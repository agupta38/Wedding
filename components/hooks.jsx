// Scroll and intersection hooks

// Returns a progress value [0..1] for a given ref based on scroll position
// 0 when element top hits viewport bottom, 1 when element bottom hits viewport top
const useScrollProgress = (ref, { start = 'top-bottom', end = 'bottom-top' } = {}) => {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    if (!ref.current) return;
    const handler = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // start when top enters bottom of viewport → rect.top == vh
      // end when bottom leaves top of viewport → rect.bottom == 0
      const total = vh + rect.height;
      const passed = vh - rect.top;
      const p = Math.max(0, Math.min(1, passed / total));
      setProgress(p);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, []);
  return progress;
};

// Progress while element is pinned (sticky) — for scenes with inner animations
const usePinnedProgress = (ref) => {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    if (!ref.current) return;
    const handler = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      if (total <= 0) { setProgress(rect.top <= 0 ? 1 : 0); return; }
      const p = Math.max(0, Math.min(1, -rect.top / total));
      setProgress(p);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, []);
  return progress;
};

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

Object.assign(window, { useScrollProgress, usePinnedProgress, useInView, remap, easeOut, easeInOut });
