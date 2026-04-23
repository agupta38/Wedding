// Scene 2: The Bumble (and Hinge) Match — the real story
const BumbleScene = () => {
  const ref = React.useRef(null);
  const progress = usePinnedProgress(ref);

  // ACT 1: Bumble match (0 - 0.20)
  const leftSwipe = remap(progress, 0.02, 0.12);
  const rightSwipe = remap(progress, 0.05, 0.15);
  const bumbleMatched = progress > 0.15;
  const bumbleMatchProgress = remap(progress, 0.15, 0.22);

  // ACT 2: Hari's "hey" message (0.22 - 0.36)
  const phonesShrink = remap(progress, 0.22, 0.28);
  const heyBubbleIn = remap(progress, 0.28, 0.34);
  const cringeReveal = remap(progress, 0.34, 0.40);

  // ACT 3: The unmatch (0.40 - 0.52)
  const unmatchIn = remap(progress, 0.40, 0.48);
  const unmatchStamp = remap(progress, 0.46, 0.54);

  // ACT 4: Time passes (0.54 - 0.62)
  const timePass = remap(progress, 0.54, 0.62);

  // ACT 5: Hinge re-match (0.62 - 0.80)
  const hingeIn = remap(progress, 0.62, 0.70);
  const hingeMatched = progress > 0.74;
  const hingeMatchProgress = remap(progress, 0.74, 0.82);

  // ACT 6: Settled / Bar Volo (0.82 - 1.0)
  const settleProgress = remap(progress, 0.84, 0.98);

  // What act are we in? Used to pick header text
  let chapter = "It started with a swipe";
  let chapterSub = "Toronto · December 2023";
  if (progress > 0.28 && progress <= 0.52) { chapter = "Then he said hey."; chapterSub = "just 'hey'. nothing else."; }
  else if (progress > 0.52 && progress <= 0.74) { chapter = "Plot twist."; chapterSub = "the universe tried again"; }
  else if (progress > 0.74) { chapter = "Hinge, do your thing."; chapterSub = "round two. the one that stuck."; }

  const act1Active = progress < 0.22;
  const act23Active = progress >= 0.22 && progress < 0.54;
  const act45Active = progress >= 0.54 && progress < 0.84;

  return (
    <section ref={ref} id="scene-bumble" className="scene scene-tall" data-screen-label="02 The Match" style={{ padding: 0, minHeight: '380vh' }}>
      <div className="sticky-wrap">
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          {/* Section header — swaps with progress */}
          <div style={{ position: 'absolute', top: '6%', left: 0, right: 0, textAlign: 'center', zIndex: 5 }}>
            <div className="font-mono" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 8 }}>Chapter One</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5.5vw, 64px)', fontStyle: 'italic', fontWeight: 400, transition: 'opacity 0.3s ease' }} key={chapter}>
              {chapter.split(' ').map((w, i) => <span key={i}>{w === 'swipe' || w === 'hey.' || w === 'twist.' || w === 'thing.' ? <span style={{ color: 'var(--marigold-deep)' }}>{w}</span> : w}{' '}</span>)}
            </h2>
            <p className="font-hand" style={{ fontSize: 22, color: 'var(--ink-soft)', marginTop: 4 }}>
              {chapterSub}
            </p>
          </div>

          {/* =============== ACT 1 + 2: Bumble phones =============== */}
          <div style={{
            position: 'absolute',
            left: '50%', top: '52%',
            transform: `translate(-50%, -50%) scale(${act1Active ? 1 : 0.58 - phonesShrink * 0.05})`,
            opacity: progress < 0.28 ? 1 : (progress < 0.52 ? 0.5 + (0.5 * (1 - remap(progress, 0.28, 0.52))) : 0),
            transition: 'transform 0.15s linear, opacity 0.15s linear',
            pointerEvents: 'none',
          }}>
            <div style={{ position: 'relative', width: 700, height: 480, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Hari phone (left) */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-100% - ${100 - bumbleMatchProgress * 80}px), -50%) rotate(${-8 + bumbleMatchProgress * 8}deg)`,
                transition: 'transform 0.1s linear',
              }}>
                <Phone name="Hari" age="28" tagline="South Indian. Loves filter coffee." accent="var(--marigold)" swipeRight={leftSwipe} matched={bumbleMatched} app="bumble" />
              </div>

              {/* Aarushi phone (right) */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(${100 - bumbleMatchProgress * 80}px, -50%) rotate(${8 - bumbleMatchProgress * 8}deg)`,
                transition: 'transform 0.1s linear',
              }}>
                <Phone name="Aarushi" age="26" tagline="Dilli girl in the 6ix." accent="var(--rose)" swipeRight={rightSwipe} matched={bumbleMatched} app="bumble" />
              </div>

              {/* Bumble match explosion */}
              {bumbleMatched && progress < 0.28 && (
                <div style={{
                  position: 'absolute', left: '50%', top: '50%',
                  transform: `translate(-50%, -50%) scale(${0.5 + Math.min(1, bumbleMatchProgress * 2) * 0.6})`,
                  opacity: Math.min(1, bumbleMatchProgress * 3) * (1 - remap(progress, 0.24, 0.28)),
                  pointerEvents: 'none',
                }}>
                  <div style={{ position: 'relative', width: 240, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {Array.from({ length: 10 }).map((_, i) => {
                      const angle = (i / 10) * Math.PI * 2;
                      const dist = 70 + bumbleMatchProgress * 40;
                      return (
                        <div key={i} style={{
                          position: 'absolute',
                          left: `calc(50% + ${Math.cos(angle) * dist}px)`,
                          top: `calc(50% + ${Math.sin(angle) * dist}px)`,
                          transform: 'translate(-50%, -50%)',
                        }}>
                          <DoodleHeart size={16 + (i % 3) * 6} color={i % 2 === 0 ? 'var(--rose)' : 'var(--marigold)'} />
                        </div>
                      );
                    })}
                    <div className="font-display" style={{
                      fontSize: 60, fontStyle: 'italic', color: 'var(--rose)',
                      fontWeight: 500, textShadow: '3px 3px 0 var(--cream)',
                    }}>
                      It's a match!
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* =============== ACT 2: the 'hey' chat =============== */}
          {progress >= 0.26 && progress < 0.56 && (
            <div style={{
              position: 'absolute',
              left: '50%', top: '52%',
              transform: `translate(-50%, -50%)`,
              opacity: heyBubbleIn * (1 - remap(progress, 0.50, 0.56)),
              zIndex: 3,
            }}>
              <ChatMock messages={[
                { from: 'hari', text: 'hey', delay: 0 },
              ]} show={heyBubbleIn} cringe={cringeReveal} />

              {/* Aarushi's reaction doodle */}
              <div style={{
                position: 'absolute',
                top: '50%', right: -240,
                transform: `translate(${(1 - cringeReveal) * -30}px, -50%)`,
                opacity: cringeReveal,
                textAlign: 'center',
              }}>
                <div className="font-hand" style={{ fontSize: 32, color: 'var(--rose)', lineHeight: 1 }}>
                  really??
                </div>
                <div className="font-hand" style={{ fontSize: 22, color: 'var(--ink-soft)', marginTop: 4 }}>
                  just "hey"?
                </div>
                <svg width="90" height="50" style={{ overflow: 'visible', marginTop: 4, transform: 'rotate(-10deg)' }}>
                  <path d="M 80 10 Q 40 20, 10 40" fill="none" stroke="var(--rose)" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
                  <path d="M10 40 L 22 36 L 18 44 Z" fill="var(--rose)" />
                </svg>
              </div>
            </div>
          )}

          {/* =============== ACT 3: UNMATCHED stamp =============== */}
          {progress >= 0.42 && progress < 0.58 && (
            <div style={{
              position: 'absolute',
              left: '50%', top: '52%',
              transform: `translate(-50%, -50%) scale(${0.4 + unmatchStamp * 0.9}) rotate(${-8 + unmatchStamp * 4}deg)`,
              opacity: unmatchIn * (1 - remap(progress, 0.54, 0.58)),
              zIndex: 10,
              pointerEvents: 'none',
            }}>
              <div style={{
                border: '5px solid var(--rose-deep)',
                color: 'var(--rose-deep)',
                padding: '14px 40px',
                fontFamily: 'JetBrains Mono',
                fontWeight: 800,
                fontSize: 52,
                letterSpacing: '0.1em',
                background: 'rgba(253,251,247,0.7)',
                boxShadow: '6px 6px 0 rgba(158,21,41,0.2)',
              }}>
                UNMATCHED
              </div>
              <div className="font-hand" style={{ fontSize: 26, color: 'var(--rose-deep)', marginTop: 10, textAlign: 'center' }}>
                next.
              </div>
            </div>
          )}

          {/* =============== ACT 4: Time passes =============== */}
          {progress >= 0.54 && progress < 0.68 && (
            <div style={{
              position: 'absolute',
              left: 0, right: 0, top: '50%',
              transform: `translateY(-50%)`,
              opacity: timePass * (1 - remap(progress, 0.66, 0.68)),
              textAlign: 'center',
              zIndex: 4,
            }}>
              <div className="font-mono" style={{ fontSize: 12, letterSpacing: '0.4em', color: 'var(--ink-soft)', marginBottom: 16 }}>
                ── A FEW MONTHS LATER ──
              </div>
              <div className="font-display" style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.1 }}>
                The universe wasn't done<br/>with them yet.
              </div>

              {/* Calendar pages flipping */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 30 }}>
                {['JAN', 'FEB', 'MAR'].map((m, i) => (
                  <div key={m} style={{
                    width: 60, height: 70, background: 'var(--cream)',
                    border: '1.5px solid var(--ink)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    transform: `rotate(${(i - 1) * 4}deg) translateY(${Math.sin(timePass * Math.PI * 2 + i) * 4}px)`,
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    <div className="font-mono" style={{ fontSize: 10, letterSpacing: '0.2em', background: 'var(--rose)', color: 'var(--cream)', padding: '2px 8px', alignSelf: 'stretch', textAlign: 'center' }}>{m}</div>
                    <div className="font-display" style={{ fontSize: 28, fontStyle: 'italic', fontWeight: 500, color: 'var(--ink)', marginTop: 4 }}>'24</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =============== ACT 5: Hinge re-match =============== */}
          {progress >= 0.66 && progress < 0.96 && (
            <div style={{
              position: 'absolute',
              left: '50%', top: '52%',
              transform: 'translate(-50%, -50%)',
              opacity: hingeIn,
              zIndex: 4,
            }}>
              <div style={{ position: 'relative', width: 700, height: 480, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Hari phone */}
                <div style={{
                  position: 'absolute', left: '50%', top: '50%',
                  transform: `translate(calc(-100% - ${100 - hingeMatchProgress * 80}px), -50%) rotate(${-6 + hingeMatchProgress * 6}deg)`,
                  transition: 'transform 0.1s linear',
                }}>
                  <Phone name="Hari" age="28" tagline="Giving it another shot 🎯" accent="var(--sage)" swipeRight={remap(progress, 0.68, 0.74)} matched={hingeMatched} app="hinge" />
                </div>

                {/* Aarushi phone */}
                <div style={{
                  position: 'absolute', left: '50%', top: '50%',
                  transform: `translate(${100 - hingeMatchProgress * 80}px, -50%) rotate(${6 - hingeMatchProgress * 6}deg)`,
                  transition: 'transform 0.1s linear',
                }}>
                  <Phone name="Aarushi" age="26" tagline="Okay fine, one more chance." accent="var(--rose)" swipeRight={remap(progress, 0.70, 0.76)} matched={hingeMatched} app="hinge" />
                </div>

                {/* Hinge match burst */}
                {hingeMatched && (
                  <div style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: `translate(-50%, -50%) scale(${0.4 + Math.min(1, hingeMatchProgress * 2)})`,
                    opacity: Math.min(1, hingeMatchProgress * 3),
                  }}>
                    <div style={{ position: 'relative', width: 260, height: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i / 12) * Math.PI * 2;
                        const dist = 80 + hingeMatchProgress * 60;
                        return (
                          <div key={i} style={{
                            position: 'absolute',
                            left: `calc(50% + ${Math.cos(angle) * dist}px)`,
                            top: `calc(50% + ${Math.sin(angle) * dist}px)`,
                            transform: 'translate(-50%, -50%)',
                          }}>
                            <DoodleSparkle size={14 + (i % 3) * 6} color={i % 2 === 0 ? 'var(--gold)' : 'var(--rose)'} />
                          </div>
                        );
                      })}
                      <div className="font-display" style={{
                        fontSize: 56, fontStyle: 'italic', color: 'var(--sage)',
                        fontWeight: 500, textShadow: '3px 3px 0 var(--cream)',
                        lineHeight: 1,
                      }}>
                        matched.
                      </div>
                      <div className="font-display" style={{
                        fontSize: 24, fontStyle: 'italic', color: 'var(--rose)',
                        marginTop: 2,
                      }}>
                        again.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =============== ACT 6: Settled — Bar Volo =============== */}
          <div style={{
            position: 'absolute',
            bottom: '8%', left: 0, right: 0,
            textAlign: 'center',
            opacity: settleProgress,
            transform: `translateY(${(1 - settleProgress) * 20}px)`,
            zIndex: 6,
          }}>
            <div className="font-hand" style={{ fontSize: 32, color: 'var(--ink)' }}>
              First date: <span style={{ color: 'var(--rose)', textDecoration: 'underline wavy var(--marigold)', textUnderlineOffset: 6 }}>Bar Volo</span>
            </div>
            <div className="font-mono" style={{ fontSize: 11, letterSpacing: '0.25em', color: 'var(--ink-soft)', marginTop: 6 }}>
              THE THIRD TIME'S THE CHARM. ACTUALLY, THE SECOND.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// ========== Chat bubble mock for the 'hey' moment ==========
const ChatMock = ({ show = 1, cringe = 0 }) => {
  return (
    <div style={{
      width: 320,
      background: 'var(--cream)',
      border: '1.5px solid var(--ink)',
      borderRadius: 20,
      padding: 16,
      boxShadow: 'var(--shadow-lg)',
      position: 'relative',
      transform: `scale(${0.8 + show * 0.2})`,
      transition: 'transform 0.15s linear',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 10, borderBottom: '1px dashed var(--paper-line)' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--marigold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cream)', fontFamily: 'Fraunces', fontSize: 18, fontWeight: 600, fontStyle: 'italic' }}>H</div>
        <div>
          <div className="font-display" style={{ fontSize: 16, fontStyle: 'italic', fontWeight: 500 }}>Hari</div>
          <div className="font-mono" style={{ fontSize: 9, color: 'var(--marigold)', letterSpacing: '0.15em' }}>● BUMBLE · ACTIVE NOW</div>
        </div>
      </div>

      {/* Typing indicator then message */}
      <div style={{ padding: '16px 4px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {show > 0.3 && (
          <div style={{
            alignSelf: 'flex-start',
            background: 'var(--cream-deep)',
            padding: '10px 16px',
            borderRadius: '18px 18px 18px 4px',
            fontSize: 18,
            fontFamily: 'DM Sans',
            color: 'var(--ink)',
            maxWidth: '75%',
            transform: `scale(${Math.min(1, (show - 0.3) * 3)})`,
            transformOrigin: 'bottom left',
          }}>
            hey
          </div>
        )}

        {/* Read receipt */}
        {show > 0.6 && (
          <div className="font-mono" style={{ fontSize: 9, color: 'var(--ink-soft)', letterSpacing: '0.15em', alignSelf: 'flex-start', paddingLeft: 4 }}>
            DELIVERED · 11:47 PM
          </div>
        )}

        {/* Cringe annotation */}
        {cringe > 0 && (
          <div style={{
            position: 'absolute',
            left: -20, top: 70,
            opacity: cringe,
            transform: `rotate(-4deg) scale(${0.8 + cringe * 0.2})`,
          }}>
            <div style={{
              border: '2px solid var(--rose)',
              color: 'var(--rose)',
              padding: '2px 10px',
              fontFamily: 'JetBrains Mono',
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: '0.15em',
              background: 'var(--cream)',
            }}>
              THAT'S IT? 💀
            </div>
          </div>
        )}
      </div>

      {/* Input area (disabled) */}
      <div style={{ marginTop: 6, padding: '8px 12px', background: 'var(--cream-deep)', borderRadius: 20, fontSize: 12, color: 'var(--ink-soft)', fontStyle: 'italic' }}>
        type a message...
      </div>
    </div>
  );
};

// Phone mock
const Phone = ({ name, age, tagline, accent, swipeRight = 0, matched = false, app = 'bumble' }) => {
  const swipeX = swipeRight * 180;
  const swipeRot = swipeRight * 25;
  const isHinge = app === 'hinge';
  return (
    <div style={{
      width: 240, height: 460,
      background: 'var(--ink)',
      borderRadius: 32,
      padding: 10,
      boxShadow: 'var(--shadow-lg)',
      position: 'relative',
    }}>
      <div style={{
        width: '100%', height: '100%',
        background: 'var(--cream)',
        borderRadius: 24,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', fontSize: 10, fontFamily: 'DM Sans', fontWeight: 600, color: 'var(--ink)' }}>
          <span>9:41</span>
          <span style={{
            background: isHinge ? 'var(--sage)' : 'var(--marigold)',
            color: isHinge ? 'var(--cream)' : 'var(--ink)',
            padding: '1px 8px', borderRadius: 10, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
          }}>
            {isHinge ? '◆ hinge' : '♥ bumble'}
          </span>
          <span>●●●</span>
        </div>

        {/* Card */}
        <div style={{ flex: 1, padding: 10, position: 'relative' }}>
          <div style={{
            width: '100%', height: '100%',
            background: accent,
            borderRadius: 16,
            position: 'relative',
            overflow: 'hidden',
            transform: `translateX(${swipeX}px) rotate(${swipeRot}deg)`,
            transition: 'transform 0.1s linear',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `repeating-linear-gradient(135deg, transparent 0 14px, rgba(255,255,255,0.12) 14px 15px)`,
            }} />
            <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.9)', padding: '3px 8px', borderRadius: 10, fontSize: 9, fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
              {age}
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14, color: '#fff', background: 'linear-gradient(transparent, rgba(0,0,0,0.5))' }}>
              <div className="font-display" style={{ fontSize: 24, fontWeight: 500, fontStyle: 'italic', lineHeight: 1 }}>{name}</div>
              <div style={{ fontSize: 10, opacity: 0.9, marginTop: 4, fontFamily: 'DM Sans' }}>{tagline}</div>
            </div>
            {swipeRight > 0.3 && (
              <div style={{
                position: 'absolute', top: 20, left: 20,
                border: '3px solid #fff', color: '#fff',
                padding: '4px 12px',
                fontFamily: 'JetBrains Mono', fontWeight: 800,
                transform: 'rotate(-20deg)',
                fontSize: 18, letterSpacing: '0.1em',
                opacity: swipeRight,
              }}>{isHinge ? 'ROSE' : 'LIKE'}</div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '14px 16px 20px' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--cream-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'var(--ink-soft)' }}>✕</div>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: matched ? (isHinge ? 'var(--sage)' : 'var(--rose)') : accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s ease',
            transform: matched ? 'scale(1.15)' : 'scale(1)',
          }}>
            {isHinge ? <DoodleSparkle size={22} color="#fff" /> : <DoodleHeart size={24} color="#fff" />}
          </div>
        </div>
      </div>
    </div>
  );
};

window.BumbleScene = BumbleScene;
