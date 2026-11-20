// Shared decorative SVG components & icons
// Travel-journal style: stamps, arrows, hand-drawn doodles, polaroids

const Polaroid = ({ w = 220, h = 260, rotate = 0, caption = '', label = 'PHOTO', tape = false, children, style = {}, className = '' }) => {
  return (
    <div className={'polaroid ' + className} style={{ transform: `rotate(${rotate}deg)`, width: w, ...style }}>
      {tape && <div className="tape" style={{ top: -10, left: '50%', marginLeft: -40, transform: 'rotate(-2deg)' }} />}
      <div className="polaroid-inner" style={{ width: w - 28, height: h - 70 }}>
        {children || <div className="polaroid-label">{label}</div>}
      </div>
      {caption && <div className="polaroid-caption">{caption}</div>}
    </div>
  );
};

// Hand-drawn arrow SVG
const HandArrow = ({ d, strokeColor = '#2C1810', strokeWidth = 2, arrowhead = true, dashed = false, animate = false, progress = 1, style = {} }) => {
  // we draw arrow along path; using a static d-string
  const ref = React.useRef(null);
  const [len, setLen] = React.useState(0);
  React.useEffect(() => {
    if (ref.current) setLen(ref.current.getTotalLength());
  }, [d]);
  const dashOffset = animate ? len * (1 - progress) : 0;
  return (
    <svg style={{ overflow: 'visible', ...style }} xmlns="http://www.w3.org/2000/svg">
      <path
        ref={ref}
        d={d}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={animate ? `${len} ${len}` : (dashed ? '6 6' : 'none')}
        strokeDashoffset={dashOffset}
        style={{ transition: animate ? 'stroke-dashoffset 0.1s linear' : 'none' }}
      />
      {arrowhead && (
        <ArrowHead d={d} color={strokeColor} />
      )}
    </svg>
  );
};

const ArrowHead = ({ d, color = '#2C1810' }) => {
  // Extract last 2 points for arrowhead orientation
  const parts = d.match(/-?\d+(\.\d+)?/g);
  if (!parts || parts.length < 4) return null;
  const numbers = parts.map(Number);
  const ex = numbers[numbers.length - 2];
  const ey = numbers[numbers.length - 1];
  const bx = numbers[numbers.length - 4];
  const by = numbers[numbers.length - 3];
  const angle = Math.atan2(ey - by, ex - bx) * 180 / Math.PI;
  return (
    <g transform={`translate(${ex}, ${ey}) rotate(${angle})`}>
      <path d="M0 0 L-12 -6 L-9 0 L-12 6 Z" fill={color} />
    </g>
  );
};

// Small decorative doodles
const DoodleHeart = ({ size = 24, color = '#C41E3A', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <path d="M12 20 C 7 16 3 12 3 8 C 3 5 5 3 8 3 C 10 3 11 4 12 6 C 13 4 14 3 16 3 C 19 3 21 5 21 8 C 21 12 17 16 12 20 Z"
      fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const DoodleStar = ({ size = 22, color = '#DAA520', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <path d="M12 2 L12 22 M2 12 L22 12 M5 5 L19 19 M19 5 L5 19"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DoodleSun = ({ size = 50, color = '#E8833A', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" style={style}>
    <circle cx="25" cy="25" r="10" fill="none" stroke={color} strokeWidth="1.8" />
    {Array.from({ length: 12 }).map((_, i) => {
      const a = (i / 12) * Math.PI * 2;
      const x1 = 25 + Math.cos(a) * 14;
      const y1 = 25 + Math.sin(a) * 14;
      const x2 = 25 + Math.cos(a) * 20;
      const y2 = 25 + Math.sin(a) * 20;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.8" strokeLinecap="round" />;
    })}
  </svg>
);

const DoodleSparkle = ({ size = 20, color = '#DAA520', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" style={style}>
    <path d="M10 2 L11.5 8.5 L18 10 L11.5 11.5 L10 18 L8.5 11.5 L2 10 L8.5 8.5 Z" fill={color} />
  </svg>
);

const DoodleSquiggle = ({ w = 60, color = '#C41E3A', style = {} }) => (
  <svg width={w} height="12" viewBox={`0 0 ${w} 12`} style={style}>
    <path d={`M2 6 Q ${w*0.15} 1, ${w*0.3} 6 T ${w*0.6} 6 T ${w*0.9} 6`} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Mehendi / paisley corner motif
const PaisleyCorner = ({ size = 80, color = '#C41E3A', style = {}, flipX = false, flipY = false }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" style={{ ...style, transform: `${style.transform || ''} scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})` }}>
    <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
      <path d="M10 40 Q 10 10, 40 10 Q 35 25, 45 30 Q 55 32, 55 22 Q 55 15, 48 15" />
      <circle cx="40" cy="10" r="2" fill={color} />
      <circle cx="10" cy="40" r="2" fill={color} />
      <path d="M14 44 Q 20 20, 40 18" strokeDasharray="2 3" />
      <path d="M18 48 L 20 46 M22 52 L 24 50 M26 56 L 28 54" />
    </g>
  </svg>
);

// CN tower silhouette SVG
const CNTower = ({ h = 260, color = '#2C1810', style = {} }) => (
  <svg width={h * 0.25} height={h} viewBox="0 0 80 320" style={style}>
    <g fill={color}>
      <rect x="38" y="50" width="4" height="270" />
      <ellipse cx="40" cy="90" rx="16" ry="10" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 90 L 36 130 L 44 130 L 50 90 Z" />
      <rect x="34" y="130" width="12" height="180" />
      <path d="M38 0 L 40 50 L 42 0" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="40" cy="0" r="1.5" />
    </g>
  </svg>
);

// Mountain silhouettes (Himalayas)
const Mountains = ({ w = 800, h = 300, color1 = '#4A2E1C', color2 = '#2C1810', style = {} }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={style} preserveAspectRatio="none">
    <path d={`M0 ${h} L 100 ${h*0.4} L 180 ${h*0.6} L 280 ${h*0.25} L 380 ${h*0.55} L 480 ${h*0.15} L 580 ${h*0.45} L 680 ${h*0.3} L 780 ${h*0.5} L ${w} ${h*0.35} L ${w} ${h} Z`}
      fill={color2} opacity="0.85" />
    <path d={`M0 ${h} L 60 ${h*0.7} L 160 ${h*0.55} L 240 ${h*0.75} L 340 ${h*0.5} L 440 ${h*0.7} L 540 ${h*0.55} L 640 ${h*0.75} L 740 ${h*0.6} L ${w} ${h*0.7} L ${w} ${h} Z`}
      fill={color1} opacity="0.5" />
    {/* Snow caps */}
    <path d={`M 260 ${h*0.3} L 280 ${h*0.25} L 300 ${h*0.35}`} fill="#FDFBF7" opacity="0.9" />
    <path d={`M 460 ${h*0.2} L 480 ${h*0.15} L 500 ${h*0.28}`} fill="#FDFBF7" opacity="0.9" />
  </svg>
);

// Plane icon
const Plane = ({ size = 60, color = '#2C1810', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={style}>
    <g fill={color}>
      <path d="M32 6 L36 28 L58 34 L58 38 L36 36 L34 52 L42 56 L42 58 L32 56 L22 58 L22 56 L30 52 L28 36 L6 38 L6 34 L28 28 Z" />
    </g>
  </svg>
);

// Stamp badge
const Stamp = ({ text, color = '#C41E3A', rotate = -6, style = {} }) => (
  <div className="stamp" style={{ color, transform: `rotate(${rotate}deg)`, ...style }}>
    {text}
  </div>
);

// Postmark circular stamp
const Postmark = ({ text1 = 'PAR AVION', text2 = 'TORONTO → INDIA', size = 110, color = '#C41E3A', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={style}>
    <defs>
      <path id="pm-top" d="M 60 60 m -42 0 a 42 42 0 1 1 84 0" />
      <path id="pm-bot" d="M 60 60 m -42 0 a 42 42 0 1 0 84 0" />
    </defs>
    <circle cx="60" cy="60" r="52" fill="none" stroke={color} strokeWidth="1.5" />
    <circle cx="60" cy="60" r="42" fill="none" stroke={color} strokeWidth="1" />
    <text fontFamily="JetBrains Mono" fontSize="10" fontWeight="700" fill={color} letterSpacing="2">
      <textPath href="#pm-top" startOffset="50%" textAnchor="middle">{text1}</textPath>
    </text>
    <text fontFamily="JetBrains Mono" fontSize="10" fontWeight="700" fill={color} letterSpacing="2">
      <textPath href="#pm-bot" startOffset="50%" textAnchor="middle">{text2}</textPath>
    </text>
    <g stroke={color} strokeWidth="2" strokeLinecap="round">
      <line x1="45" y1="56" x2="75" y2="56" />
      <line x1="45" y1="64" x2="75" y2="64" />
    </g>
  </svg>
);

// Hand-drawn underline SVG
const HandUnderline = ({ color = '#C41E3A' }) => (
  <svg viewBox="0 0 200 14" preserveAspectRatio="none">
    <path d="M 4 8 Q 50 2, 100 7 T 196 6" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Dashed travel path
const DashedPath = ({ d, color = '#C41E3A', strokeWidth = 2, dash = '6 6', progress = 1, style = {} }) => {
  const ref = React.useRef(null);
  const [len, setLen] = React.useState(0);
  React.useEffect(() => { if (ref.current) setLen(ref.current.getTotalLength()); }, [d]);
  return (
    <path ref={ref} d={d} fill="none" stroke={color} strokeWidth={strokeWidth}
      strokeDasharray={dash}
      strokeDashoffset={len * (1 - progress)}
      style={{ ...style }} />
  );
};

Object.assign(window, {
  Polaroid, HandArrow, ArrowHead, DoodleHeart, DoodleStar, DoodleSun, DoodleSparkle, DoodleSquiggle,
  PaisleyCorner, CNTower, Mountains, Plane, Stamp, Postmark, HandUnderline, DashedPath
});

// View from Lake Ontario: SkyDome west of the tower, financial district east.
const TorontoSkyline = () => (
  <svg className="toronto-skyline" viewBox="0 0 1200 500" role="img" aria-labelledby="toronto-skyline-title" preserveAspectRatio="xMidYMid meet">
    <title id="toronto-skyline-title">Toronto waterfront skyline with the CN Tower, Rogers Centre stadium and downtown towers</title>
    <defs>
      <linearGradient id="toronto-sunset" x2="0" y2="1"><stop stopColor="#fce6ba"/><stop offset="1" stopColor="#d38b79"/></linearGradient>
      <linearGradient id="toronto-lake" x2="0" y2="1"><stop stopColor="#bd8877"/><stop offset="1" stopColor="#e2b59c"/></linearGradient>
    </defs>
    <rect width="1200" height="500" fill="url(#toronto-sunset)"/>
    <circle cx="470" cy="225" r="110" fill="#ffe7b2" opacity=".55"/>
    <g fill="#9b6c60" opacity=".65">
      <path d="M0 390V308h25v-35h28v117h12V282h35v108h15V248h28v142h17V290h44v100h15V263h32v127h20V297h42v93h18V325h50v65h30V286h38v104h30V310h31v80h35V278h32v112h30V294h45v96h32V264h34v126h30V300h44v90h34V267h30v123h24V293h40v97h24V310h38v80h24V280h40v110h24V322h36v68h18V300h55v90h20V283h40v107h24V315h50v75Z"/>
    </g>
    <g fill="#5b3d36" stroke="#e8b894" strokeWidth="1">
      <path d="M26 400V330h33v70h14V294h39v106h17V311h38v89h14V275h25v125h18V321h42v79h18V303h26v97Z"/>
      <path d="M604 400V245h38v155h15V210h48v190h18V271h36v129h13V188h52v212h16V229h48v171h14V177h48v223h20V245h48v155h16V285h35v115h15V317h45v83h18V280h37v120h20V320h50v80Z"/>
      <path d="M650 210l31-16 31 16Z M777 188v-10h42v10 M908 177v-13h36v13"/>
    </g>
    <g stroke="#d7a17e" strokeWidth="2" opacity=".65">
      {[620,672,688,786,804,852,872,917,933,978,998].map(x => <path key={x} d={`M${x} 280V395`}/>)}
      {[300,325,350,375].map(y => <path key={y} d={`M607 ${y}H1040`}/>)}
    </g>
    {/* CN Tower: antenna, SkyPod, main observation deck and tapered tripod base. */}
    <g fill="#392a26" stroke="#392a26" strokeLinejoin="round">
      <path d="M515 43l2 71 3 25-2 114 12 146h-27l10-146-1-114 2-25Z"/>
      <path d="M513 152h7l3 6-7 5-6-5Z"/>
      <path d="M494 200q22-14 44 0l-4 15q-18 12-36 0Z"/>
      <ellipse cx="516" cy="200" rx="23" ry="7" fill="#e7b58f"/>
      <path d="M494 204h44M500 214h32" fill="none" stroke="#e7b58f" strokeWidth="2"/>
      <path d="M512 257l-18 142h11l11-142 13 142h11l-20-142Z"/>
    </g>
    {/* Rogers Centre / SkyDome, unobscured to the left of the CN Tower. */}
    <g stroke="#5b3d36" strokeWidth="2">
      <path d="M295 379q4-65 91-69 86 3 93 69Z" fill="#efe4cd"/>
      <path d="M309 376q13-53 77-60 64 7 79 60M338 376q5-50 48-60 40 11 48 60M386 316v60" fill="none" stroke="#b3a18c"/>
      <path d="M289 377h197v26H289Z" fill="#ad8b76"/>
      <path d="M301 389h173" stroke="#ead1ac" strokeDasharray="5 4" strokeWidth="5"/>
    </g>
    <path d="M0 404H1200V500H0Z" fill="url(#toronto-lake)"/>
    <path d="M0 404H1200" stroke="#392a26" strokeWidth="5"/>
    <g stroke="#f5d6b0" strokeWidth="2" opacity=".65"><path d="M310 430h150m-100 18h110m15-16h80m-60 29h70m280-21h140m-65 25h100m-810-23h110m-50 26h85"/></g>
    <g fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#392a26" letterSpacing="1">
      <text x="385" y="463" textAnchor="middle">ROGERS CENTRE</text>
      <text x="570" y="95">CN TOWER</text><path d="M558 101l-27 35" fill="none" stroke="#392a26" strokeDasharray="3 3"/>
    </g>
  </svg>
);
window.TorontoSkyline = TorontoSkyline;

// The same animation canvas on every device; only its layout/scale adapts.
const PinnedCanvas = ({ children, className = '', width = 1200, height = 800, mobileWidth = null, mobileHeight = 740 }) => {
  const host = React.useRef(null);
  const [size, setSize] = React.useState({ width, height });
  React.useLayoutEffect(() => {
    const element = host.current;
    const measure = () => setSize({ width: element.clientWidth, height: element.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const compact = size.width <= 700;
  const minimumWidth = compact ? (mobileWidth || 320) : width;
  const minimumHeight = compact ? mobileHeight : height;
  const scale = Math.min(1, size.width / minimumWidth, size.height / minimumHeight);
  // Expand the logical canvas after fitting so the pinned scene stays full bleed.
  const canvasWidth = size.width / scale;
  const canvasHeight = size.height / scale;
  return (
    <div ref={host} className="pinned-canvas">
      <div className={`animation-canvas ${compact ? 'compact-canvas' : ''} ${className}`} data-canvas-scale={scale} style={{ width: canvasWidth, height: canvasHeight, '--canvas-scale': scale, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
};
window.PinnedCanvas = PinnedCanvas;
