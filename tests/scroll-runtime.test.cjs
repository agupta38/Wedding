const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const vm = require('node:vm');

function setup() {
  const listeners = new Map();
  const frames = new Map();
  let frameID = 0;
  let current = 0;
  let updates = 0;
  let reads = 0;
  const cleanups = [];
  const pin = { clientHeight: 700 };
  const element = {
    classList: { toggle() {} },
    getBoundingClientRect() { reads++; return { top: 1000 - window.scrollY, height: 2100 }; },
    querySelector() { return pin; },
  };
  const window = {
    innerHeight: 700, innerWidth: 390, scrollY: 1700,
    addEventListener(type, cb) { if (!listeners.has(type)) listeners.set(type, new Set()); listeners.get(type).add(cb); },
    removeEventListener(type, cb) { listeners.get(type)?.delete(cb); },
  };
  const requestAnimationFrame = cb => { frames.set(++frameID, cb); return frameID; };
  const cancelAnimationFrame = id => frames.delete(id);
  const document = {
    documentElement: { clientWidth: 390, clientHeight: 700, scrollHeight: 10000 },
    body: { appendChild() {} },
    fonts: { ready: Promise.resolve(), addEventListener() {}, removeEventListener() {} },
    createElement: () => ({ style: {}, clientHeight: 700, setAttribute() {}, remove() {} }),
  };
  const React = {
    useState(initial) { current = initial; return [current, value => { current = typeof value === 'function' ? value(current) : value; updates++; }]; },
    useRef: value => ({ current: value }),
    useEffect(fn) { const cleanup = fn(); if (cleanup) cleanups.push(cleanup); },
  };
  class ResizeObserver { observe() {} unobserve() {} disconnect() {} }
  Object.assign(window, { requestAnimationFrame, cancelAnimationFrame });
  const context = vm.createContext({ window, document, React, ResizeObserver, IntersectionObserver: class {}, requestAnimationFrame, cancelAnimationFrame });
  vm.runInContext(fs.readFileSync('components/hooks.jsx', 'utf8'), context);
  window.usePinnedProgress({ current: element });
  const flush = () => { const queued = [...frames.values()]; frames.clear(); queued.forEach(cb => cb(16)); };
  const emit = type => [...(listeners.get(type) || [])].forEach(cb => cb());
  return { window, frames, flush, emit, cleanups, get progress() { return current; }, get updates() { return updates; }, get reads() { return reads; } };
}

test('Safari toolbar height changes do not move a pinned animation at the same scroll position', () => {
  const app = setup(); app.flush();
  assert.equal(app.progress, .5);
  app.window.innerHeight = 800;
  app.emit('resize'); app.flush();
  assert.equal(app.progress, .5);
});

test('a burst of scroll events commits at most once in an animation frame', () => {
  const app = setup(); app.flush();
  const before = app.updates;
  for (let i = 0; i < 30; i++) { app.window.scrollY = 1710 + i; app.emit('scroll'); }
  assert.equal(app.updates, before, 'scroll handlers should only schedule work');
  app.flush();
  assert.equal(app.updates, before + 1);
  assert.equal(app.progress, (1739 - 1000) / 1400);
});

test('steady scrolling reuses scene geometry and animations reverse', () => {
  const app = setup(); app.flush();
  const before = app.reads;
  app.window.scrollY = 2050; app.emit('scroll'); app.flush();
  assert.equal(app.progress, .75);
  app.window.scrollY = 1350; app.emit('scroll'); app.flush();
  assert.equal(app.progress, .25);
  assert.equal(app.reads, before, 'transforms must not force fresh layout measurements each frame');
});

test('unmount cancels scheduled work and detaches the scroll subscription', () => {
  const app = setup(); app.flush();
  app.window.scrollY = 2050; app.emit('scroll');
  app.cleanups.forEach(fn => fn());
  const before = app.updates;
  app.emit('scroll'); app.flush();
  assert.equal(app.updates, before);
  assert.equal(app.frames.size, 0);
});

test('Safari elastic overscroll does not corrupt the cached scene position', () => {
  const app = setup(); app.flush();
  app.window.scrollY = -20; app.emit('resize'); app.flush();
  app.window.scrollY = 1700; app.emit('scroll'); app.flush();
  assert.equal(app.progress, .5);
});
