/**
 * Spheres3D — Premium 3D floating spheres hero background
 * Uses pure CSS for maximum performance — zero canvas overhead
 * Brand colors: #3b82f6 (blue), #7c3aed (purple), #c5a059 (gold)
 */

export default function Spheres3D() {
  const spheres = [
    // Large center-right focal sphere
    {
      size: 340,
      x: 68,
      y: 52,
      colorA: '#5b21b6',
      colorB: '#7c3aed',
      colorC: '#3b82f6',
      highlight: 'rgba(147,107,246,0.55)',
      blur: 0,
      animDuration: 7,
      animDelay: 0,
      zIndex: 3,
      opacity: 1,
    },
    // Medium left sphere
    {
      size: 160,
      x: 14,
      y: 62,
      colorA: '#1d4ed8',
      colorB: '#3b82f6',
      colorC: '#7c3aed',
      highlight: 'rgba(96,165,250,0.50)',
      blur: 0,
      animDuration: 9,
      animDelay: 1.5,
      zIndex: 2,
      opacity: 0.9,
    },
    // Small top-right sphere
    {
      size: 100,
      x: 82,
      y: 18,
      colorA: '#4c1d95',
      colorB: '#6d28d9',
      colorC: '#3b82f6',
      highlight: 'rgba(167,139,250,0.55)',
      blur: 0,
      animDuration: 11,
      animDelay: 3,
      zIndex: 2,
      opacity: 0.85,
    },
    // Tiny far-right sphere
    {
      size: 60,
      x: 92,
      y: 45,
      colorA: '#7c3aed',
      colorB: '#a855f7',
      colorC: '#6366f1',
      highlight: 'rgba(192,132,252,0.55)',
      blur: 0,
      animDuration: 8,
      animDelay: 2,
      zIndex: 2,
      opacity: 0.75,
    },
    // Small bottom-left sphere
    {
      size: 80,
      x: 8,
      y: 82,
      colorA: '#312e81',
      colorB: '#4338ca',
      colorC: '#3b82f6',
      highlight: 'rgba(99,102,241,0.45)',
      blur: 0,
      animDuration: 13,
      animDelay: 0.8,
      zIndex: 1,
      opacity: 0.7,
    },
    // Medium bottom-right sphere
    {
      size: 180,
      x: 75,
      y: 80,
      colorA: '#2e1065',
      colorB: '#5b21b6',
      colorC: '#7c3aed',
      highlight: 'rgba(139,92,246,0.50)',
      blur: 0,
      animDuration: 10,
      animDelay: 4,
      zIndex: 2,
      opacity: 0.85,
    },
    // Gold accent tiny sphere
    {
      size: 44,
      x: 42,
      y: 20,
      colorA: '#78350f',
      colorB: '#b45309',
      colorC: '#c5a059',
      highlight: 'rgba(251,191,36,0.60)',
      blur: 0,
      animDuration: 12,
      animDelay: 1,
      zIndex: 2,
      opacity: 0.7,
    },
    // Ghost large left-top ambient
    {
      size: 280,
      x: -6,
      y: 10,
      colorA: '#1e1b4b',
      colorB: '#312e81',
      colorC: '#1d4ed8',
      highlight: 'rgba(99,102,241,0.25)',
      blur: 12,
      animDuration: 15,
      animDelay: 2.5,
      zIndex: 1,
      opacity: 0.35,
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>

      {/* Dark-to-blue deep background gradient — matches reference */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 55%, rgba(76,29,149,0.28) 0%, rgba(29,78,216,0.10) 40%, transparent 70%)',
        }}
      />
      {/* Secondary blue corner glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 15% 65%, rgba(37,99,235,0.18) 0%, transparent 55%)',
        }}
      />
      {/* Bottom warm purple gradient bleed */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(88,28,135,0.20) 0%, transparent 45%)',
        }}
      />

      {/* Grid lines — dashed perspective grid matching reference image */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at 65% 80%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 65% 80%, black 20%, transparent 75%)',
        }}
      />

      {/* Floating 3D Spheres */}
      {spheres.map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.x}%`,
            top: `${s.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: s.zIndex,
            opacity: s.opacity,
            filter: s.blur > 0 ? `blur(${s.blur}px)` : undefined,
            animation: `sphere-float-${i % 3} ${s.animDuration}s ease-in-out ${s.animDelay}s infinite`,
            borderRadius: '50%',
            background: `
              radial-gradient(
                circle at 35% 30%,
                ${s.highlight} 0%,
                ${s.colorC} 25%,
                ${s.colorB} 55%,
                ${s.colorA} 80%,
                #0a0010 100%
              )
            `,
            boxShadow: `
              inset -8px -8px 20px rgba(0,0,0,0.6),
              inset 4px 4px 14px rgba(255,255,255,0.08),
              0 0 ${s.size * 0.3}px ${s.colorB}55,
              0 0 ${s.size * 0.6}px ${s.colorA}22
            `,
          }}
        >
          {/* Specular highlight spot — gives the 3D glass effect */}
          <div
            style={{
              position: 'absolute',
              width: '38%',
              height: '28%',
              top: '12%',
              left: '18%',
              borderRadius: '50%',
              background: `radial-gradient(ellipse, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.0) 100%)`,
              transform: 'rotate(-25deg)',
              filter: 'blur(2px)',
            }}
          />
          {/* Secondary smaller specular dot */}
          <div
            style={{
              position: 'absolute',
              width: '12%',
              height: '8%',
              top: '16%',
              left: '22%',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.65)',
              filter: 'blur(1px)',
            }}
          />
        </div>
      ))}

      {/* Inject keyframe animations */}
      <style>{`
        @keyframes sphere-float-0 {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50%       { transform: translate(-50%, -50%) translateY(-22px); }
        }
        @keyframes sphere-float-1 {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50%       { transform: translate(-50%, -50%) translateY(-14px); }
        }
        @keyframes sphere-float-2 {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          33%       { transform: translate(-50%, -50%) translateY(-18px); }
          66%       { transform: translate(-50%, -50%) translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
