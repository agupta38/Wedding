const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const vm = require('node:vm');

function setup({ blocked = false, muted = false } = {}) {
  class Audio extends EventTarget {
    constructor() { super(); this.src = ''; this.paused = true; this.muted = false; this.ended = false; this.currentTime = 0; this.plays = 0; }
    load() { this.ended = false; this.currentTime = 0; }
    play() {
      this.plays++;
      if (blocked) return Promise.reject(Object.assign(new Error('gesture required'), { name: 'NotAllowedError' }));
      this.paused = false; this.dispatchEvent(new Event('playing')); return Promise.resolve();
    }
    pause() { this.paused = true; this.dispatchEvent(new Event('pause')); }
    getAttribute() { return this.src; }
    removeAttribute() { this.src = ''; }
  }
  const audio = new Audio();
  const gestures = new EventTarget();
  const storage = new Map([['wedding-music-muted', String(muted)]]);
  const snapshots = [];
  const window = {};
  vm.runInNewContext(fs.readFileSync('components/soundtrack.js', 'utf8'), { window });
  const player = window.createWeddingSoundtrack({ audio, songs: Array.from({ length: 5 }, (_, i) => ({ preview: `song-${i}` })), eventTarget: gestures, storage: { getItem: k => storage.get(k), setItem: (k,v) => storage.set(k,v) }, onChange: s => snapshots.push(s) });
  return { audio, player, gestures, storage, snapshots, allow() { blocked = false; }, get state() { return snapshots.at(-1); } };
}
const tick = () => new Promise(resolve => setImmediate(resolve));

test('starts the first track and wraps through all five on one audio element', async () => {
  const app = setup(); app.player.start(); await tick();
  assert.equal(app.audio.src, 'song-0'); assert.equal(app.state.isPlaying, true);
  for (let i = 1; i <= 5; i++) { app.audio.ended = true; app.audio.dispatchEvent(new Event('ended')); await tick(); assert.equal(app.audio.src, `song-${i % 5}`); }
  app.player.destroy();
});

test('autoplay denial waits for a gesture, then starts once', async () => {
  const app = setup({ blocked: true }); app.player.start(); await tick();
  assert.equal(app.state.needsGesture, true); assert.equal(app.state.isPlaying, false);
  app.allow(); app.gestures.dispatchEvent(new Event('click')); await tick();
  assert.equal(app.state.isPlaying, true); assert.equal(app.state.needsGesture, false);
  const plays = app.audio.plays; app.gestures.dispatchEvent(new Event('click')); await tick(); assert.equal(app.audio.plays, plays);
  app.player.destroy();
});

test('mute persists through track changes and unrelated gestures', async () => {
  const app = setup(); app.player.start(); await tick(); app.player.toggleMuted();
  assert.equal(app.audio.muted, true); assert.equal(app.storage.get('wedding-music-muted'), 'true');
  app.audio.dispatchEvent(new Event('ended')); await tick(); app.gestures.dispatchEvent(new Event('click'));
  assert.equal(app.audio.muted, true); assert.equal(app.audio.src, 'song-1');
  app.player.toggleMuted(); assert.equal(app.audio.muted, false); app.player.destroy();
});

test('restores mute preference and explicit pause is not undone by page taps', async () => {
  const app = setup({ muted: true }); app.player.start(); await tick(); assert.equal(app.audio.muted, true);
  app.player.choose(0); app.gestures.dispatchEvent(new Event('click')); await tick(); assert.equal(app.audio.paused, true);
  app.player.choose(2); await tick(); assert.equal(app.audio.src, 'song-2'); assert.equal(app.audio.muted, false);
  app.player.destroy();
});

test('skips failed previews and stops after one failed pass instead of retrying forever', async () => {
  const app = setup(); app.player.start(); await tick();
  for (let i = 0; i < 5; i++) { app.audio.dispatchEvent(new Event('error')); await tick(); }
  assert.equal(app.audio.paused, true); assert.match(app.state.status, /unavailable/i);
  const plays = app.audio.plays; app.audio.dispatchEvent(new Event('error')); await tick(); assert.equal(app.audio.plays, plays);
  app.player.destroy();
});

test('cleanup stops playback, ignores pending denial, and removes gesture retries', async () => {
  const app = setup({ blocked: true }); app.player.start(); app.player.destroy(); await tick();
  const updates = app.snapshots.length; const plays = app.audio.plays; app.allow(); app.gestures.dispatchEvent(new Event('click')); await tick();
  assert.equal(app.audio.paused, true); assert.equal(app.audio.plays, plays); assert.equal(app.snapshots.length, updates);
});


test('resuming a paused song preserves its position and stale autoplay rejection cannot replace a manual selection', async () => {
  const app = setup(); app.player.start(); await tick();
  app.audio.currentTime = 12; app.player.choose(0); app.player.choose(0); await tick();
  assert.equal(app.audio.currentTime, 12);
  let rejectOld;
  app.audio.play = () => new Promise((_, reject) => { rejectOld = reject; });
  app.player.choose(1);
  app.audio.play = () => { app.audio.paused = false; app.audio.dispatchEvent(new Event('playing')); return Promise.resolve(); };
  app.player.choose(2); await tick();
  rejectOld(Object.assign(new Error('old request blocked'), { name: 'NotAllowedError' })); await tick();
  assert.equal(app.state.selected, 2); assert.equal(app.state.isPlaying, true); assert.equal(app.state.needsGesture, false);
  app.player.destroy();
});


test('a saved mute remains silent when autoplay also requires a gesture', async () => {
  const app = setup({ muted: true, blocked: true }); app.player.start(); await tick();
  app.allow(); app.gestures.dispatchEvent(new Event('click')); await tick();
  assert.equal(app.state.isPlaying, true); assert.equal(app.audio.muted, true);
  app.player.toggleMuted(); assert.equal(app.audio.muted, false); app.player.destroy();
});
