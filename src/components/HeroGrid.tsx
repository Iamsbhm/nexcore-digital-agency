import React from 'react';

interface HeroGridProps {
  activeHeroSlide: number;
  setActiveHeroSlide: (slide: number) => void;
}

export default function HeroGrid({ activeHeroSlide, setActiveHeroSlide }: HeroGridProps) {
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    
    const percentX = x / rect.width;
    const percentY = y / rect.height;
    const rotateX = (percentY - 0.5) * -12;
    const rotateY = (percentX - 0.5) * 12;
    
    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
    card.style.setProperty('--card-scale', '1.04');
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
    const isActive = card.getAttribute('data-active') === 'true';
    card.style.setProperty('--card-scale', isActive ? '1.04' : '1');
  };

  return (
    <div className="lg:col-span-6 bg-gradient-to-br from-[#0b0a16]/95 via-[#06050e]/98 to-[#030206]/98 backdrop-blur-md px-8 pb-8 pt-24 sm:px-12 sm:pb-12 sm:pt-28 lg:px-16 lg:pb-16 lg:pt-32 xl:px-20 xl:pb-20 xl:pt-36 flex flex-col justify-center items-center relative overflow-hidden text-white min-h-[460px] lg:min-h-0">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15),transparent_60%)]" />
      
      <div className="w-full max-w-xl xl:max-w-2xl aspect-[4/3] flex items-center justify-center">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
        
          {/* ── CARD 1: Web Design (Top-Left) ── */}
          <div
            data-active={activeHeroSlide === 0}
            onClick={() => setActiveHeroSlide(0)}
            className={`group/card relative rounded-[24px] overflow-hidden p-5 flex flex-col justify-between cursor-pointer border ${
              activeHeroSlide === 0
                ? 'shadow-[0_20px_50px_rgba(16,185,129,0.35)] border-[#34d399]/60 z-10 opacity-100'
                : 'border-white/10 opacity-60 hover:opacity-95'
            }`}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              background: activeHeroSlide === 0
                ? 'linear-gradient(135deg, #064e3b 0%, #059669 40%, #10b981 100%)'
                : 'linear-gradient(135deg, #022c22 0%, #065f46 60%, #0f766e 100%)',
              transform: `perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale(var(--card-scale, ${activeHeroSlide === 0 ? '1.04' : '1'}))`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s cubic-bezier(0.03, 0.98, 0.52, 0.99), box-shadow 0.3s ease, border-color 0.3s ease, opacity 0.3s ease',
            }}
          >
            {/* Dynamic Spotlight Shine */}
            <div 
              className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.18) 0%, transparent 60%)',
                mixBlendMode: 'overlay',
              }}
            />
            {/* Single-Sweep Gloss Sheen */}
            <div className="card-shimmer" />
            
            {/* Content/Illustration Area */}
            <div 
              className="w-full flex-1 flex items-center justify-center pointer-events-none transition-transform duration-500"
              style={{ transform: 'translateZ(32px)', transformStyle: 'preserve-3d' }}
            >
              <svg viewBox="0 0 240 160" className="w-full h-auto max-h-[120px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)"/>
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0)"/>
                  </linearGradient>
                  <linearGradient id="chart-line-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ffffff"/>
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)"/>
                  </linearGradient>
                </defs>
                <rect x="10" y="10" width="220" height="140" rx="10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="rgba(255,255,255,0.06)" />
                <line x1="10" y1="35" x2="230" y2="35" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <circle cx="24" cy="22" r="3.5" fill="rgba(255,255,255,0.5)" />
                <circle cx="34" cy="22" r="3.5" fill="rgba(255,255,255,0.3)" />
                <circle cx="44" cy="22" r="3.5" fill="rgba(255,255,255,0.3)" />
                <line x1="62" y1="35" x2="62" y2="150" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <rect x="20" y="48" width="32" height="7" rx="2" fill="rgba(255,255,255,0.3)" />
                <rect x="20" y="62" width="26" height="7" rx="2" fill="rgba(255,255,255,0.15)" />
                <rect x="20" y="76" width="30" height="7" rx="2" fill="rgba(255,255,255,0.15)" />
                <rect x="74" y="48" width="68" height="36" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <circle cx="90" cy="66" r="6" stroke="rgba(255,255,255,0.4)" />
                <line x1="102" y1="62" x2="132" y2="62" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                <line x1="102" y1="70" x2="122" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                <rect x="150" y="48" width="70" height="36" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <rect x="160" y="58" width="30" height="6" rx="2" fill="rgba(255,255,255,0.3)" />
                <rect x="160" y="70" width="50" height="4" rx="1" fill="rgba(255,255,255,0.15)" />
                <rect x="74" y="94" width="146" height="46" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <line x1="74" y1="108" x2="220" y2="108" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="74" y1="122" x2="220" y2="122" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 82 132 C 96 112, 102 118, 118 106 C 134 94, 146 126, 166 102 C 186 78, 196 122, 212 110 L 212 132 Z" fill="url(#chart-area-grad)" stroke="none" />
                <path className="animate-flow-line" d="M 82 132 C 96 112, 102 118, 118 106 C 134 94, 146 126, 166 102 C 186 78, 196 122, 212 110" fill="none" stroke="url(#chart-line-grad)" strokeWidth="2.5" />
                <circle cx="166" cy="102" r="4.5" fill="#ffffff" />
                <circle cx="166" cy="102" r="8" className="glow-pulse" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
                
                {/* Bouncing cursor pointing to active chart node */}
                <g transform="translate(162, 105)" className="animate-bounce">
                  <path d="M0 0 L0 10 L3 7 L7 7 Z" fill="#ffffff" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
                </g>
              </svg>
            </div>
           
            {/* Badge Bottom Left */}
            <div className="z-10 mt-3 self-start" style={{ transform: 'translateZ(20px)' }}>
              <span className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold shadow-sm transition-all duration-300 ${
                activeHeroSlide === 0
                  ? 'bg-white text-[#059669]'
                  : 'bg-white/10 text-white/90 backdrop-blur-md border border-white/15'
              }`}>
                Web Design
              </span>
            </div>
          </div>

          {/* ── CARD 2: React Systems (Top-Right) ── */}
          <div
            data-active={activeHeroSlide === 1}
            onClick={() => setActiveHeroSlide(1)}
            className={`group/card relative rounded-[24px] overflow-hidden p-5 flex flex-col justify-between cursor-pointer border ${
              activeHeroSlide === 1
                ? 'shadow-[0_20px_50px_rgba(99,102,241,0.35)] border-[#818cf8]/60 z-10 opacity-100'
                : 'border-white/10 opacity-60 hover:opacity-95'
            }`}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              background: activeHeroSlide === 1
                ? 'linear-gradient(135deg, #1e1b4b 0%, #4f46e5 40%, #6366f1 100%)'
                : 'linear-gradient(135deg, #0f172a 0%, #312e81 60%, #3730a3 100%)',
              transform: `perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale(var(--card-scale, ${activeHeroSlide === 1 ? '1.04' : '1'}))`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s cubic-bezier(0.03, 0.98, 0.52, 0.99), box-shadow 0.3s ease, border-color 0.3s ease, opacity 0.3s ease',
            }}
          >
            {/* Dynamic Spotlight Shine */}
            <div 
              className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.18) 0%, transparent 60%)',
                mixBlendMode: 'overlay',
              }}
            />
            {/* Single-Sweep Gloss Sheen */}
            <div className="card-shimmer" />
            
            {/* Badge Top Right */}
            <div className="z-10 self-end" style={{ transform: 'translateZ(25px)' }}>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[8px] font-mono font-black text-white uppercase tracking-wider">
                Growth +1424
              </span>
            </div>

            {/* Content/Illustration Area */}
            <div 
              className="w-full flex-1 flex items-center justify-center pointer-events-none transition-transform duration-500"
              style={{ transform: 'translateZ(32px)', transformStyle: 'preserve-3d' }}
            >
              <svg viewBox="0 0 240 160" className="w-full h-auto max-h-[120px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="react-orbit-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#61dafb"/>
                    <stop offset="100%" stopColor="#c084fc"/>
                  </linearGradient>
                </defs>
                <rect x="35" y="20" width="170" height="102" rx="8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="rgba(255,255,255,0.06)" />
                <rect x="40" y="25" width="160" height="84" rx="4" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <path d="M 20 122 L 220 122 C 220 122, 215 136, 205 136 L 35 136 C 25 136, 20 122, 20 122 Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                <rect x="105" y="127" width="30" height="6" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <line x1="68" y1="25" x2="68" y2="109" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <rect x="46" y="32" width="16" height="5" rx="1.5" fill="rgba(255,255,255,0.3)" />
                <rect x="46" y="42" width="12" height="5" rx="1.5" fill="rgba(255,255,255,0.15)" />
                <rect x="46" y="52" width="18" height="5" rx="1.5" fill="rgba(255,255,255,0.15)" />
                <rect x="74" y="32" width="36" height="6" rx="1.5" fill="rgba(255,255,255,0.4)" />
                <rect x="74" y="44" width="70" height="5" rx="1" fill="rgba(255,255,255,0.2)" />
                <rect x="86" y="54" width="50" height="5" rx="1" fill="rgba(255,255,255,0.2)" />
                <rect x="86" y="64" width="65" height="5" rx="1" fill="rgba(255,255,255,0.3)" />
                <g transform="translate(170, 52) scale(0.68)">
                  <g className="animate-spin-slow" style={{ transformOrigin: '0px 0px' }}>
                    <ellipse rx="24" ry="9" stroke="url(#react-orbit-grad)" strokeWidth="2" fill="none" transform="rotate(0)" />
                    <ellipse rx="24" ry="9" stroke="url(#react-orbit-grad)" strokeWidth="2" fill="none" transform="rotate(60)" />
                    <ellipse rx="24" ry="9" stroke="url(#react-orbit-grad)" strokeWidth="2" fill="none" transform="rotate(120)" />
                  </g>
                  <circle r="4.5" fill="#61dafb" className="animate-pulse" />
                </g>
              </svg>
            </div>

            {/* Badge Bottom Left */}
            <div className="z-10 mt-3 self-start" style={{ transform: 'translateZ(20px)' }}>
              <span className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold shadow-sm transition-all duration-300 ${
                activeHeroSlide === 1
                  ? 'bg-white text-[#6366f1]'
                  : 'bg-white/10 text-white/90 backdrop-blur-md border border-white/15'
              }`}>
                React Systems
              </span>
            </div>
          </div>

          {/* ── CARD 3: Shine together (Bottom-Left) ── */}
          <div
            data-active={activeHeroSlide === 2}
            onClick={() => setActiveHeroSlide(2)}
            className={`group/card relative rounded-[24px] overflow-hidden p-5 flex flex-col justify-between cursor-pointer border ${
              activeHeroSlide === 2
                ? 'shadow-[0_20px_50px_rgba(236,72,153,0.35)] border-[#f472b6]/60 z-10 opacity-100'
                : 'border-white/10 opacity-60 hover:opacity-95'
            }`}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              background: activeHeroSlide === 2
                ? 'linear-gradient(135deg, #500724 0%, #db2777 40%, #f472b6 100%)'
                : 'linear-gradient(135deg, #18000a 0%, #831843 60%, #9d174d 100%)',
              transform: `perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale(var(--card-scale, ${activeHeroSlide === 2 ? '1.04' : '1'}))`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s cubic-bezier(0.03, 0.98, 0.52, 0.99), box-shadow 0.3s ease, border-color 0.3s ease, opacity 0.3s ease',
            }}
          >
            {/* Dynamic Spotlight Shine */}
            <div 
              className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.18) 0%, transparent 60%)',
                mixBlendMode: 'overlay',
              }}
            />
            {/* Single-Sweep Gloss Sheen */}
            <div className="card-shimmer" />
            
            {/* Content/Illustration Area */}
            <div 
              className="w-full flex-1 flex items-center justify-center pointer-events-none transition-transform duration-500"
              style={{ transform: 'translateZ(32px)', transformStyle: 'preserve-3d' }}
            >
              <svg viewBox="0 0 240 160" className="w-full h-auto max-h-[120px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85"/>
                    <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                  </radialGradient>
                </defs>
                <g opacity="0.25" stroke="#ffffff" strokeWidth="1">
                  <line x1="20" y1="120" x2="120" y2="40" />
                  <line x1="60" y1="140" x2="180" y2="40" />
                  <line x1="120" y1="140" x2="220" y2="60" />
                  <line x1="20" y1="120" x2="120" y2="140" />
                  <line x1="60" y1="80" x2="180" y2="140" />
                  <line x1="120" y1="40" x2="220" y2="60" />
                </g>
                <g transform="translate(0, -8)">
                  <line x1="120" y1="90" x2="65" y2="125" stroke="#ffffff" strokeWidth="2.2" opacity="0.85" />
                  <line x1="120" y1="90" x2="175" y2="115" stroke="#ffffff" strokeWidth="2.2" opacity="0.85" />
                  <line x1="120" y1="90" x2="135" y2="45" stroke="#ffffff" strokeWidth="2.2" opacity="0.85" />
                  <line x1="65" y1="125" x2="135" y2="45" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                  <line x1="175" y1="115" x2="135" y2="45" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                  
                  <circle cx="120" cy="90" r="20" fill="url(#node-glow)" className="glow-pulse" />
                  <circle cx="65" cy="125" r="14" fill="url(#node-glow)" className="glow-pulse" style={{ animationDelay: '0.6s' }} />
                  <circle cx="175" cy="115" r="16" fill="url(#node-glow)" className="glow-pulse" style={{ animationDelay: '1.2s' }} />
                  
                  <circle cx="120" cy="90" r="10.5" fill="#ffffff" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  <circle cx="65" cy="125" r="7.5" fill="#ffffff" />
                  <circle cx="175" cy="115" r="9" fill="#ffffff" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  <circle cx="135" cy="45" r="6.5" fill="#ffffff" />
                  
                  <path d="M 115 96 A 5 5 0 0 1 125 96" stroke="#ec4899" strokeWidth="1.5" />
                  <circle cx="120" cy="88" r="3.2" fill="#ec4899" />
                  
                  {/* Data packets flowing along lines */}
                  <circle r="3" fill="#ffffff" className="animate-flow-dot-1" />
                  <circle r="3" fill="#ffffff" className="animate-flow-dot-2" />
                </g>
              </svg>
            </div>

            {/* Badge Bottom Center */}
            <div className={`z-10 mt-3 self-center flex items-center gap-1.5 px-3.5 py-1 rounded-full shadow-sm transition-all duration-300 ${
              activeHeroSlide === 2
                ? 'bg-white'
                : 'bg-white/10 backdrop-blur-md border border-white/15'
            }`}
            style={{ transform: 'translateZ(20px)' }}>
              {/* Overlapping profile avatars representation */}
              <div className="flex -space-x-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#7c3aed] border border-black/20" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#3b82f6] border border-black/20" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#ec4899] border border-black/20" />
              </div>
              <span className={`text-[10px] font-sans font-bold transition-all duration-300 ${
                activeHeroSlide === 2
                  ? 'text-[#ec4899]'
                  : 'text-white/80'
              }`}>
                Shine together
              </span>
            </div>
          </div>

          {/* ── CARD 4: Cloud & Scale (Bottom-Right) ── */}
          <div
            data-active={activeHeroSlide === 3}
            onClick={() => setActiveHeroSlide(3)}
            className={`group/card relative rounded-[24px] overflow-hidden p-5 flex flex-col justify-between cursor-pointer border ${
              activeHeroSlide === 3
                ? 'shadow-[0_20px_50px_rgba(245,158,11,0.35)] border-[#fbbf24]/60 z-10 opacity-100'
                : 'border-white/10 opacity-60 hover:opacity-95'
            }`}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              background: activeHeroSlide === 3
                ? 'linear-gradient(135deg, #451a03 0%, #d97706 40%, #fbbf24 100%)'
                : 'linear-gradient(135deg, #1c1917 0%, #78350f 60%, #92400e 100%)',
              transform: `perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale(var(--card-scale, ${activeHeroSlide === 3 ? '1.04' : '1'}))`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s cubic-bezier(0.03, 0.98, 0.52, 0.99), box-shadow 0.3s ease, border-color 0.3s ease, opacity 0.3s ease',
            }}
          >
            {/* Dynamic Spotlight Shine */}
            <div 
              className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.18) 0%, transparent 60%)',
                mixBlendMode: 'overlay',
              }}
            />
            {/* Single-Sweep Gloss Sheen */}
            <div className="card-shimmer" />
            
            {/* Badge Top Left */}
            <div className="z-10 self-start" style={{ transform: 'translateZ(25px)' }}>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[8px] font-mono font-black text-white uppercase tracking-wider">
                8K
              </span>
            </div>

            {/* Content/Illustration Area */}
            <div 
              className="w-full flex-1 flex items-center justify-center pointer-events-none transition-transform duration-500"
              style={{ transform: 'translateZ(32px)', transformStyle: 'preserve-3d' }}
            >
              <svg viewBox="0 0 240 160" className="w-full h-auto max-h-[120px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g className="bob-1">
                  <path d="M 0 -22 L 25 -34 L 50 -22 L 25 -10 Z" fill="rgba(255,255,255,0.35)" stroke="#ffffff" strokeWidth="1" />
                  <path d="M 0 -22 L 25 -10 L 25 20 L 0 8 Z" fill="rgba(255,255,255,0.15)" stroke="#ffffff" strokeWidth="1" />
                  <path d="M 25 -10 L 50 -22 L 50 8 L 25 20 Z" fill="rgba(255,255,255,0.22)" stroke="#ffffff" strokeWidth="1" />
                  <line x1="8" y1="-2" x2="20" y2="4" stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="8" y1="6" x2="20" y2="12" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="34" cy="-2" r="1.5" className="led-green" />
                </g>
                <g className="bob-2">
                  <path d="M 0 -22 L 25 -34 L 50 -22 L 25 -10 Z" fill="rgba(255,255,255,0.4)" stroke="#ffffff" strokeWidth="1" />
                  <path d="M 0 -22 L 25 -10 L 25 24 L 0 12 Z" fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeWidth="1" />
                  <path d="M 25 -10 L 50 -22 L 50 12 L 25 24 Z" fill="rgba(255,255,255,0.25)" stroke="#ffffff" strokeWidth="1" />
                  <line x1="8" y1="-2" x2="20" y2="4" stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="8" y1="6" x2="20" y2="12" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="34" cy="-2" r="1.5" className="led-blue" />
                </g>
                <g className="bob-3">
                  <path d="M 0 -22 L 25 -34 L 50 -22 Z" fill="rgba(255,255,255,0.3)" stroke="#ffffff" strokeWidth="1" />
                  <path d="M 25 -10 L 50 -22 L 50 8 L 25 20 Z" fill="rgba(255,255,255,0.22)" stroke="#ffffff" strokeWidth="1" />
                  <path d="M 0 -22 L 25 -10 L 25 20 L 0 8 Z" fill="rgba(255,255,255,0.15)" stroke="#ffffff" strokeWidth="1" />
                  <line x1="8" y1="-2" x2="20" y2="4" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="34" cy="-2" r="1.5" className="led-red" />
                </g>
                <g className="bob-4">
                  <ellipse cx="20" cy="10" rx="16" ry="6" fill="rgba(255,255,255,0.3)" stroke="#ffffff" strokeWidth="1" />
                  <path d="M 4 10 L 4 25 A 16 6 0 0 0 36 25 L 36 10 Z" fill="rgba(255,255,255,0.15)" stroke="#ffffff" strokeWidth="1" />
                  <path d="M 4 25 L 4 40 A 16 6 0 0 0 36 40 L 36 25 Z" fill="rgba(255,255,255,0.15)" stroke="#ffffff" strokeWidth="1" />
                  <line x1="20" y1="16" x2="20" y2="40" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="20" cy="16" r="2.5" className="animate-pulse" fill="#ffffff" />
                </g>
              </svg>
            </div>

            {/* Badge Bottom Left */}
            <div className="z-10 mt-3 self-start" style={{ transform: 'translateZ(20px)' }}>
              <span className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold shadow-sm transition-all duration-300 ${
                activeHeroSlide === 3
                  ? 'bg-white text-[#f59e0b]'
                  : 'bg-white/10 text-white/90 backdrop-blur-md border border-white/15'
              }`}>
                Cloud & Scale
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
