import React, { useState } from 'react';

/* ─── Brand icon SVGs (inline, no external dependency) ─── */
const icons: Record<string, { svg: React.ReactNode; color: string; bg: string }> = {
  'React': {
    color: '#61DAFB',
    bg: 'rgba(97,218,251,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
        <ellipse cx="12" cy="12" rx="10" ry="3.9" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
        <ellipse cx="12" cy="12" rx="10" ry="3.9" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="3.9" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
      </svg>
    ),
  },
  'Next.js': {
    color: '#ffffff',
    bg: 'rgba(255,255,255,0.06)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" fill="#000" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
        <path d="M7 16.5V7.5l9.5 11H14L7 9.5" fill="white"/>
        <line x1="14.5" y1="7.5" x2="14.5" y2="14.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  'TypeScript': {
    color: '#3178C6',
    bg: 'rgba(49,120,198,0.10)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178C6"/>
        <text x="4.5" y="16.5" fontSize="9" fontWeight="700" fontFamily="monospace" fill="white">TS</text>
      </svg>
    ),
  },
  'Tailwind CSS': {
    color: '#38BDF8',
    bg: 'rgba(56,189,248,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="#38BDF8" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M12 6C9 6 7.5 7.5 7 10.5c.75-1 1.625-1.375 2.625-1.125.57.143.978.558 1.43 1.02C11.944 11.34 13.043 12.5 15 12.5c3 0 4.5-1.5 5-4.5-.75 1-1.625 1.375-2.625 1.125-.57-.143-.978-.558-1.43-1.02C15.056 7.16 13.957 6 12 6zM7 12.5c-3 0-4.5 1.5-5 4.5.75-1 1.625-1.375 2.625-1.125.57.143.978.558 1.43 1.02C7.056 17.84 8.155 19 10.112 19c3 0 4.5-1.5 5-4.5-.75 1-1.625 1.375-2.625 1.125-.57-.143-.978-.558-1.43-1.02C10.057 13.66 8.958 12.5 7 12.5z"/>
      </svg>
    ),
  },
  'Framer Motion': {
    color: '#BB4AE8',
    bg: 'rgba(187,74,232,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="#BB4AE8" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M4 4h16v8H4z"/>
        <path d="M4 12h8l8 8H4z"/>
        <path d="M4 20h8l-8-8z" fill="rgba(187,74,232,0.5)"/>
      </svg>
    ),
  },
  'Webflow': {
    color: '#4353FF',
    bg: 'rgba(67,83,255,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M17.5 5.5L14 13l-2-5.5L9.5 13 6.5 5.5H4.5L9 18l3-7.5 2 5L18 5.5z" fill="#4353FF"/>
        <path d="M20 9c0 2.761-2.239 5-5 5L17.5 5.5C19 6.5 20 7.65 20 9z" fill="#4353FF" opacity="0.6"/>
      </svg>
    ),
  },
  'Node.js': {
    color: '#68A063',
    bg: 'rgba(104,160,99,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="rgba(104,160,99,0.2)" stroke="#68A063" strokeWidth="1.3"/>
        <text x="7.5" y="15" fontSize="7.5" fontWeight="800" fontFamily="monospace" fill="#68A063">JS</text>
      </svg>
    ),
  },
  'Python': {
    color: '#3572A5',
    bg: 'rgba(53,114,165,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M12 2C8.5 2 7 3.5 7 5v2h5v1H6C4 8 2 9.5 2 12s2 4 4 4h1v-2.5c0-2 1.5-3.5 5-3.5s5 1.5 5 3.5V16h1c2 0 4-1.5 4-4s-2-4-4-4h-1V5c0-1.5-1.5-3-5-3z" fill="#3572A5"/>
        <path d="M12 22c3.5 0 5-1.5 5-3v-2h-5v-1h6c2 0 4-1.5 4-4s-2-4-4-4h-1v2.5c0 2-1.5 3.5-5 3.5s-5-1.5-5-3.5V8H6C4 8 2 9.5 2 12s2 4 4 4h1v3c0 1.5 1.5 3 5 3z" fill="#FFD43B"/>
        <circle cx="9.5" cy="5.5" r="1" fill="white"/>
        <circle cx="14.5" cy="18.5" r="1" fill="white"/>
      </svg>
    ),
  },
  'GraphQL': {
    color: '#E535AB',
    bg: 'rgba(229,53,171,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="#E535AB" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" fill="none" stroke="#E535AB" strokeWidth="1.2"/>
        <circle cx="12" cy="2" r="1.5"/>
        <circle cx="20.66" cy="7" r="1.5"/>
        <circle cx="20.66" cy="17" r="1.5"/>
        <circle cx="12" cy="22" r="1.5"/>
        <circle cx="3.34" cy="17" r="1.5"/>
        <circle cx="3.34" cy="7" r="1.5"/>
        <circle cx="12" cy="12" r="2"/>
        <line x1="12" y1="2" x2="12" y2="12" stroke="#E535AB" strokeWidth="1"/>
        <line x1="20.66" y1="7" x2="12" y2="12" stroke="#E535AB" strokeWidth="1"/>
        <line x1="3.34" y1="7" x2="12" y2="12" stroke="#E535AB" strokeWidth="1"/>
      </svg>
    ),
  },
  'REST APIs': {
    color: '#94A3B8',
    bg: 'rgba(148,163,184,0.06)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <rect x="2" y="8" width="8" height="3" rx="1.5" fill="#94A3B8"/>
        <rect x="14" y="8" width="8" height="3" rx="1.5" fill="#94A3B8"/>
        <path d="M10 9.5h4M13 7l2 2.5-2 2.5" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round"/>
        <rect x="2" y="13" width="8" height="3" rx="1.5" fill="rgba(148,163,184,0.5)"/>
        <rect x="14" y="13" width="8" height="3" rx="1.5" fill="rgba(148,163,184,0.5)"/>
        <path d="M10 14.5h4M11 12.5l-2 2 2 2" stroke="rgba(148,163,184,0.7)" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  'Supabase': {
    color: '#3ECF8E',
    bg: 'rgba(62,207,142,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M13 3L4 14h8l-1 7 9-11h-8z" fill="#3ECF8E"/>
      </svg>
    ),
  },
  'Firebase': {
    color: '#FFCA28',
    bg: 'rgba(255,202,40,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M5.5 17.5L7 8.5l3.5 5.5L13 4l3 7-2 2.5L12 20z" fill="#FFCA28"/>
        <path d="M5.5 17.5L13 4l2.5 5.5L11 14z" fill="#FF8F00"/>
        <path d="M5.5 17.5L12 20l-4-3z" fill="#FFA000" opacity="0.6"/>
      </svg>
    ),
  },
  'WordPress': {
    color: '#21759B',
    bg: 'rgba(33,117,155,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="#21759B" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" fill="none" stroke="#21759B" strokeWidth="1.5"/>
        <path d="M2.2 12A9.8 9.8 0 0 0 8 20.8L3.2 9A9.8 9.8 0 0 0 2.2 12zM18.7 11.5c0-1.6-.6-2.6-1.1-3.5-.7-1.1-1.3-2-1.3-3.1 0-1.2.9-2.4 2.2-2.4.1 0 .1 0 .2.0A9.8 9.8 0 0 0 12 2.2a9.8 9.8 0 0 0-8.3 4.6c.2 0 .4.0.6.0 1.4 0 3.5-.2 3.5-.2.7 0 .8 1 .1 1.1 0 0-.7.1-1.5.1l4.8 14.2 2.9-8.6-2-5.6c-.7 0-1.4-.1-1.4-.1-.7 0-.6-1.1.1-1.1 0 0 2.2.2 3.4.2 1.4 0 3.5-.2 3.5-.2.7 0 .8 1 .1 1.1 0 0-.7.1-1.5.1l4.7 14.1 1.3-4.3c.6-1.8 1-3.1 1-4.2zM12.4 13l-3.9 11.4c1.2.3 2.4.5 3.7.5 1.5 0 2.9-.3 4.2-.7l-.1-.1zM20.8 7.3c0 .1.1.2.1.3A9.8 9.8 0 0 1 21.8 12c0 2.7-1.0 5.2-2.6 7.1L22 11c.3-.8.5-1.7.5-2.6a9.7 9.7 0 0 0-1.7-5.1z"/>
      </svg>
    ),
  },
  'Shopify': {
    color: '#96BF48',
    bg: 'rgba(150,191,72,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="#96BF48" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M15.34 3.5a.5.5 0 0 0-.44-.42c-.2-.02-3.72-.08-3.72-.08s-2.46-2.4-2.72-2.64a.9.9 0 0 0-.52-.14L7 21l7.98 1.73 4.33-1.04S15.34 3.72 15.34 3.5zm-4.5-.3L9.5 4.5c.3-1.14.88-1.7 1.34-2z"/>
        <path d="M18.34 5.5a.5.5 0 0 0-.44-.1c-.06.02-1.3.4-1.3.4s-.76-2.3-2.1-2.3c-.03 0-.06 0-.1.01-.04-.06-.1-.1-.17-.14C13.56 2.8 12.6 2.8 12 3.3c-1.6 1.3-2.4 4-2.6 6.1l-2.2.68L5.1 18.9l9.7 1.84 4.5-1.08L18 5.9a.5.5 0 0 0-.34-.4z" opacity="0.5"/>
      </svg>
    ),
  },
  'WooCommerce': {
    color: '#7F54B3',
    bg: 'rgba(127,84,179,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <rect x="1.5" y="4" width="21" height="14" rx="3" fill="rgba(127,84,179,0.15)" stroke="#7F54B3" strokeWidth="1.2"/>
        <text x="4" y="14" fontSize="7" fontWeight="800" fontFamily="sans-serif" fill="#7F54B3">Woo</text>
      </svg>
    ),
  },
  'Stripe': {
    color: '#6772E5',
    bg: 'rgba(103,114,229,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <rect x="2" y="5" width="20" height="14" rx="3" fill="rgba(103,114,229,0.15)" stroke="#6772E5" strokeWidth="1.2"/>
        <path d="M10 10c0-1 .8-1.5 2-1.5s2 .6 2 1.4c0 2-4 1.5-4 4 0 1 .8 1.6 2.1 1.6s2-.6 2-1.4" stroke="#6772E5" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  'Figma': {
    color: '#F24E1E',
    bg: 'rgba(242,78,30,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <rect x="8" y="2" width="8" height="6" rx="3" fill="#F24E1E"/>
        <rect x="8" y="9" width="8" height="6" rx="3" fill="#FF7262"/>
        <rect x="8" y="16" width="8" height="6" rx="3" fill="#0ACF83"/>
        <rect x="2" y="2" width="6" height="6" rx="3" fill="#A259FF"/>
        <circle cx="18" cy="12" r="3" fill="#1ABCFE"/>
      </svg>
    ),
  },
  'Contentful': {
    color: '#2478CC',
    bg: 'rgba(36,120,204,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <circle cx="12" cy="12" r="9.5" fill="none" stroke="#2478CC" strokeWidth="1.3"/>
        <circle cx="8.5" cy="8.5" r="2.5" fill="#2478CC"/>
        <path d="M15.5 8.5A7 7 0 0 1 15.5 15.5" stroke="#2478CC" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="8.5" cy="15.5" r="2.5" fill="#2478CC" opacity="0.5"/>
      </svg>
    ),
  },
  'AWS': {
    color: '#FF9900',
    bg: 'rgba(255,153,0,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M6.5 14.5C5 14.5 3 13 3 10.5 3 8 4.8 6.5 7 6.5c.3 0 .6.03.9.1C8.5 5 10 4 11.8 4c2.5 0 4.5 2 4.5 4.5 0 .17-.01.34-.03.5C17.5 9.5 19 11 19 13s-1.5 3-3.5 3H8" stroke="#FF9900" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
        <path d="M8.5 18.5l-2-1.5 2-1.5M15.5 18.5l2-1.5-2-1.5" stroke="#FF9900" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  'Vercel': {
    color: '#FFFFFF',
    bg: 'rgba(255,255,255,0.06)',
    svg: (
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M12 2L22 20H2L12 2z"/>
      </svg>
    ),
  },
  'Docker': {
    color: '#2496ED',
    bg: 'rgba(36,150,237,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <rect x="2" y="10" width="4" height="3" rx="0.5" fill="#2496ED"/>
        <rect x="7" y="10" width="4" height="3" rx="0.5" fill="#2496ED"/>
        <rect x="12" y="10" width="4" height="3" rx="0.5" fill="#2496ED"/>
        <rect x="7" y="6.5" width="4" height="3" rx="0.5" fill="#2496ED"/>
        <rect x="12" y="6.5" width="4" height="3" rx="0.5" fill="#2496ED"/>
        <rect x="12" y="3" width="4" height="3" rx="0.5" fill="#2496ED"/>
        <path d="M2 14.5C3 16.5 5 18 7.5 18h9c3 0 5.5-2.5 5.5-5.5 0-.17-.01-.34-.02-.5H22" stroke="#2496ED" strokeWidth="1.2"/>
        <path d="M19.5 13c0-1.5 1-2 2-2" stroke="#2496ED" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  'OpenAI GPT': {
    color: '#10A37F',
    bg: 'rgba(16,163,127,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M22 11.5a4.5 4.5 0 0 0-3-4.2 4.5 4.5 0 0 0-7.8-3.1 4.5 4.5 0 0 0-6.6 5.3A4.5 4.5 0 0 0 7 17.7a4.5 4.5 0 0 0 7.8 3.1 4.5 4.5 0 0 0 6.6-5.3A4.5 4.5 0 0 0 22 11.5z" stroke="#10A37F" strokeWidth="1.3" fill="none"/>
        <circle cx="12" cy="12" r="2.5" fill="#10A37F"/>
      </svg>
    ),
  },
  'React Native': {
    color: '#61DAFB',
    bg: 'rgba(97,218,251,0.07)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <rect x="6" y="2" width="12" height="20" rx="2" stroke="#61DAFB" strokeWidth="1.3"/>
        <circle cx="12" cy="18.5" r="1" fill="#61DAFB"/>
        <circle cx="12" cy="10" r="1.5" fill="#61DAFB"/>
        <ellipse cx="12" cy="10" rx="5.5" ry="2.2" stroke="#61DAFB" strokeWidth="1" fill="none"/>
        <ellipse cx="12" cy="10" rx="5.5" ry="2.2" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 12 10)"/>
        <ellipse cx="12" cy="10" rx="5.5" ry="2.2" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120 12 10)"/>
      </svg>
    ),
  },
  'Flutter': {
    color: '#54C5F8',
    bg: 'rgba(84,197,248,0.08)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M14 2L4 12l3 3 10-10z" fill="#54C5F8"/>
        <path d="M14 12l-3 3 3 3 7-7z" fill="#54C5F8"/>
        <path d="M11 15l3 3-3 3-3-3z" fill="#01579B"/>
      </svg>
    ),
  },
};

const techGroups = [
  {
    id: 'frontend',
    title: 'Frontend',
    desc: 'Pixel-perfect interfaces that delight users',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Webflow'],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    desc: 'Scalable server-side infrastructure',
    items: ['Node.js', 'Python', 'GraphQL', 'REST APIs', 'Supabase', 'Firebase'],
  },
  {
    id: 'cms',
    title: 'CMS & E-Commerce',
    desc: 'Content management & revenue platforms',
    items: ['WordPress', 'Shopify', 'WooCommerce', 'Stripe', 'Figma', 'Contentful'],
  },
  {
    id: 'cloud',
    title: 'Cloud & AI',
    desc: 'Modern infrastructure & intelligent automation',
    items: ['AWS', 'Vercel', 'Docker', 'OpenAI GPT', 'React Native', 'Flutter'],
  },
];

const GOLD = '#c5a059';

export default function TechStack() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  return (
    <section className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto" id="tech-stack-section">
      {/* ── HEADER ── */}
      <div className="text-center mb-12">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5"
          style={{ borderColor: 'rgba(197,160,89,0.2)', background: 'rgba(197,160,89,0.06)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD }} />
          <span className="text-[9px] font-mono tracking-[0.25em] uppercase" style={{ color: GOLD }}>
            Technologies We Master
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-tight">
          Our{' '}
          <span className="bg-gradient-to-r from-[#c5a059] via-[#e8c97a] to-[#a07840] bg-clip-text text-transparent">
            Tech Stack
          </span>
        </h2>
        <p className="mt-4 text-sm text-white/40 max-w-md mx-auto">
          Battle-tested technologies powering fast, scalable, and stunning digital products.
        </p>
      </div>

      {/* ── CATEGORY FILTER TABS ── */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveGroup(null)}
          className="px-4 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all duration-200 cursor-pointer"
          style={{
            background: activeGroup === null ? 'rgba(197,160,89,0.15)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${activeGroup === null ? 'rgba(197,160,89,0.4)' : 'rgba(255,255,255,0.07)'}`,
            color: activeGroup === null ? GOLD : 'rgba(255,255,255,0.4)',
          }}
        >
          All ({techGroups.flatMap(g => g.items).length})
        </button>
        {techGroups.map((g) => (
          <button
            key={g.id}
            onClick={() => setActiveGroup(activeGroup === g.id ? null : g.id)}
            className="px-4 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all duration-200 cursor-pointer"
            style={{
              background: activeGroup === g.id ? 'rgba(197,160,89,0.15)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${activeGroup === g.id ? 'rgba(197,160,89,0.4)' : 'rgba(255,255,255,0.07)'}`,
              color: activeGroup === g.id ? GOLD : 'rgba(255,255,255,0.4)',
            }}
          >
            {g.title}
          </button>
        ))}
      </div>

      {/* ── TECH CATEGORY CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {techGroups
          .filter((g) => activeGroup === null || activeGroup === g.id)
          .map((group) => (
            <div
              key={group.id}
              className="rounded-2xl border overflow-hidden transition-all duration-300 hover:border-[#c5a059]/25"
              style={{
                background: 'rgba(255,255,255,0.015)',
                borderColor: 'rgba(255,255,255,0.07)',
              }}
            >
              {/* Card header */}
              <div
                className="px-5 py-4 flex items-center justify-between border-b"
                style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}
              >
                <div>
                  <h3 className="text-sm font-display font-bold text-white">{group.title}</h3>
                  <p className="text-[10px] font-mono text-white/30 mt-0.5">{group.desc}</p>
                </div>
                <span
                  className="text-[9px] font-mono px-2 py-1 rounded-md"
                  style={{
                    color: GOLD,
                    background: 'rgba(197,160,89,0.08)',
                    border: '1px solid rgba(197,160,89,0.15)',
                  }}
                >
                  {group.items.length} tools
                </span>
              </div>

              {/* Icons grid */}
              <div className="p-4 grid grid-cols-3 gap-3">
                {group.items.map((name) => {
                  const icon = icons[name];
                  return (
                    <div
                      key={name}
                      className="group/card flex flex-col items-center gap-2.5 p-3 rounded-xl border border-transparent hover:border-white/[0.1] transition-all duration-200 cursor-default"
                      style={{ background: icon?.bg ?? 'rgba(255,255,255,0.03)' }}
                    >
                      {/* Icon */}
                      <div className="w-10 h-10 flex items-center justify-center">
                        {icon?.svg ?? (
                          <span
                            className="text-lg font-display font-black"
                            style={{ color: icon?.color ?? GOLD }}
                          >
                            {name.slice(0, 2)}
                          </span>
                        )}
                      </div>
                      {/* Name */}
                      <span
                        className="text-[9px] font-mono text-center leading-tight text-white/55 group-hover/card:text-white/80 transition-colors"
                      >
                        {name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>

      {/* ── BOTTOM METRICS BAR ── */}
      <div
        className="mt-4 rounded-xl border px-5 py-3 flex items-center justify-between flex-wrap gap-3"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}
      >
        <span className="text-[9px] font-mono text-white/25">
          {techGroups.flatMap(g => g.items).length} technologies · battle-tested across 500+ projects
        </span>
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5">
          {[
            ['97', 'Avg Perf Score'],
            ['<20s', 'Build Time'],
            ['~142kb', 'Bundle Size'],
          ].map(([v, l]) => (
            <div key={l} className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold" style={{ color: GOLD }}>{v}</span>
              <span className="text-[8px] font-mono text-white/25">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
