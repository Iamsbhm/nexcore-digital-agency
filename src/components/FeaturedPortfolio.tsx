import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface FeaturedPortfolioProps {
  navigateTo: (path: string) => void;
}

const getSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export interface FeaturedProjectItem {
  title: string;
  category: string;
  tags: string[];
  desc: string;
  image: string;
  accent: string;
  liveUrl?: string;
  result?: { val: string; label: string }[];
}

const GOLD = '#c5a059';

export default function FeaturedPortfolio({ navigateTo }: FeaturedPortfolioProps) {
  const [activeDot, setActiveDot] = React.useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const projects: FeaturedProjectItem[] = [
    {
      title: 'PrimeNest Realty',
      category: 'Real Estate',
      tags: ['Figma', 'WordPress', 'Elementor Pro', 'Rank Math SEO', 'WP Rocket', 'Calendly'],
      desc: 'Real Estate Agency Website Design & Development',
      image: '/images/primenest_presentation.jpg',
      accent: '#c5a059',
      liveUrl: 'https://primenestrealty.com',
      result: [
        { val: '+230%', label: 'Organic Traffic' },
        { val: '+65%',  label: 'More Leads' },
        { val: '98+',   label: 'PageSpeed' },
      ],
    },
    {
      title: 'Apex Roofing Solutions',
      category: 'Home Services',
      tags: ['Figma', 'WordPress', 'Elementor Pro', 'Rank Math SEO', 'WP Rocket', 'Calendly'],
      desc: 'Roofing Company Website Design & Development',
      image: '/images/apex_roofing_presentation.jpg',
      accent: '#c5a059',
      liveUrl: 'https://apexroofingsolutions.com',
      result: [
        { val: '+215%', label: 'Organic Traffic' },
        { val: '+47%',  label: 'More Leads' },
        { val: '95+',   label: 'PageSpeed' },
      ],
    },
    {
      title: 'WealthPath Financial Advisors',
      category: 'Finance',
      tags: ['Figma', 'WordPress', 'Elementor Pro', 'Calendly', 'Local SEO'],
      desc: 'Financial Advisor Website Design & Development',
      image: '/images/wealthpath_presentation.jpg',
      accent: '#c5a059',
      liveUrl: 'https://wealthpathadvisors.com',
      result: [
        { val: '+210%', label: 'Lead increase' },
        { val: '1.8s',  label: 'Load time' },
        { val: '98',    label: 'Perf score' },
      ],
    },
    {
      title: 'JusticeEdge Law Group',
      category: 'Legal',
      tags: ['Figma', 'WordPress', 'Elementor Pro', 'Calendly', 'Rank Math SEO'],
      desc: 'Law Firm Website Design & Development',
      image: '/images/justiceedge_presentation.jpg',
      accent: '#c5a059',
      liveUrl: 'https://justiceedgelaw.com',
      result: [
        { val: '+175%', label: 'Consultations' },
        { val: 'Pg 1',  label: 'Google rank' },
        { val: '96',    label: 'Perf score' },
      ],
    },
    {
      title: 'BrightSmile Dental Care',
      category: 'Healthcare',
      tags: ['Figma', 'WordPress', 'Elementor Pro', 'Calendly', 'Rank Math SEO'],
      desc: 'Dental Clinic Website Redesign & Development',
      image: '/images/dental_presentation_v2.jpg',
      accent: '#c5a059',
      liveUrl: 'https://brightsmiledental.com',
      result: [
        { val: '+320%', label: 'Bookings' },
        { val: '2.1s',  label: 'Load time' },
        { val: '97',    label: 'Perf score' },
      ],
    },
  ];

  const displayedProjects = projects.slice(0, 3);

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth } = carouselRef.current;
      const cardWidth = scrollWidth / displayedProjects.length;
      setActiveDot(Math.round(scrollLeft / cardWidth));
    }
  };

  return (
    <section className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto" id="portfolio-featured-section">

      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5"
            style={{ borderColor: 'rgba(197,160,89,0.2)', background: 'rgba(197,160,89,0.06)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD }} />
            <span className="text-[9px] font-mono tracking-[0.25em] uppercase" style={{ color: GOLD }}>
              Featured Work
            </span>
          </div>

          <h2 className="text-xl xs:text-2xl md:text-4xl font-display font-black tracking-tight text-white leading-tight md:whitespace-nowrap">
            Real Projects.{' '}
            <span className="bg-gradient-to-r from-[#c5a059] via-[#e8c97a] to-[#a07840] bg-clip-text text-transparent">
              Real Results.
            </span>{' '}
            <span className="text-white/70">Real Growth.</span>
          </h2>
          <p className="mt-4 text-sm text-white/40 max-w-lg leading-relaxed">
            Every project we ship is engineered to rank on Google, load in under 2 seconds, and convert visitors into paying customers.
          </p>
        </div>

        {/* Desktop CTA */}
        <button
          onClick={() => navigateTo('/portfolio')}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-[10px] font-mono tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex-shrink-0 cursor-pointer"
          style={{ 
            borderColor: 'rgba(197, 160, 89, 0.35)', 
            color: '#c5a059', 
            background: 'rgba(197, 160, 89, 0.06)',
            boxShadow: '0 4px 20px rgba(197, 160, 89, 0.03)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#c5a059';
            e.currentTarget.style.background = 'rgba(197, 160, 89, 0.12)';
            e.currentTarget.style.color = '#e8c97a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.35)';
            e.currentTarget.style.background = 'rgba(197, 160, 89, 0.06)';
            e.currentTarget.style.color = '#c5a059';
          }}
        >
          View All Projects <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── PROJECT CARDS ── */}
      {displayedProjects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
          <p className="text-sm text-white/40 font-mono uppercase tracking-widest">Portfolio coming soon</p>
        </div>
      ) : (
        <div className="relative">
          <style>{`#pf-carousel::-webkit-scrollbar { display: none; }`}</style>

          <div
            id="pf-carousel"
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-3 gap-5 pb-4 md:pb-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayedProjects.map((project) => (
              <div
                key={project.title}
                onClick={() => navigateTo(`/portfolio/${getSlug(project.title)}`)}
                className="w-[85vw] md:w-auto shrink-0 snap-center md:snap-align-none group cursor-pointer flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:border-[#c5a059]/25 hover:-translate-y-1"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}
              >
                {/* Image area */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#06070e]">
                  {/* Blurred bg */}
                  <div className="absolute inset-0 scale-110 blur-lg opacity-20 pointer-events-none">
                    <img src={project.image} alt="" className="w-full h-full object-cover" />
                  </div>

                  {/* Main image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-contain z-10 transition-transform duration-500 group-hover:scale-[1.04]"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06070e] via-transparent to-transparent z-20 pointer-events-none" />

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 z-30">
                    <span
                      className="text-[8px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full"
                      style={{
                        color: GOLD,
                        borderColor: `${GOLD}40`,
                        backgroundColor: `${GOLD}15`,
                        border: `1px solid ${GOLD}35`,
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]"
                    style={{ background: 'rgba(6,7,14,0.65)' }}>
                    <div
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-mono tracking-widest uppercase"
                      style={{
                        color: GOLD,
                        border: `1px solid ${GOLD}50`,
                        background: 'rgba(6,7,14,0.7)',
                      }}
                    >
                      View Case Study <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Title + desc */}
                  <div>
                    <h3
                      className="text-sm font-display font-bold text-white group-hover:text-[#c5a059] transition-colors duration-200 mb-1"
                    >
                      {project.title}
                    </h3>
                    <p className="text-[10px] text-white/35 leading-relaxed">{project.desc}</p>
                  </div>

                  {/* Result metrics */}
                  {project.result && (
                    <div
                      className="grid grid-cols-3 gap-2 p-3 rounded-xl"
                      style={{ background: 'rgba(197,160,89,0.04)', border: '1px solid rgba(197,160,89,0.1)' }}
                    >
                      {project.result.map((r) => (
                        <div key={r.label} className="text-center">
                          <div className="text-sm font-display font-black" style={{ color: GOLD }}>{r.val}</div>
                          <div className="text-[8px] font-mono text-white/30 mt-0.5">{r.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[8px] font-mono text-white/30 px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile dots */}
          <div className="flex justify-center gap-1.5 mt-5 md:hidden">
            {displayedProjects.map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: activeDot === i ? '1.75rem' : '0.375rem',
                  background: activeDot === i ? GOLD : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── BOTTOM CTA STRIP ── */}
      <div
        className="mt-8 rounded-2xl border p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ background: 'rgba(197,160,89,0.03)', borderColor: 'rgba(197,160,89,0.12)' }}
      >
        <div>
          <div className="text-white font-display font-bold text-base mb-1">
            Want results like these for your business?
          </div>
          <div className="text-[11px] text-white/35 font-mono">
            500+ projects delivered · 98% client retention · Free strategy call
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => navigateTo('/portfolio')}
            className="px-5 py-2.5 rounded-xl border text-[10px] font-mono tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            style={{ 
              borderColor: 'rgba(197, 160, 89, 0.35)', 
              color: '#c5a059', 
              background: 'rgba(197, 160, 89, 0.06)' 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#c5a059';
              e.currentTarget.style.background = 'rgba(197, 160, 89, 0.12)';
              e.currentTarget.style.color = '#e8c97a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.35)';
              e.currentTarget.style.background = 'rgba(197, 160, 89, 0.06)';
              e.currentTarget.style.color = '#c5a059';
            }}
          >
            View All Work
          </button>
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent('pixeladvance:openBooking', { detail: { plan: 'FREE AUDIT', price: 'Free' } }))
            }
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider text-black transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #c5a059, #e8c97a)' }}
          >
            Start My Project <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </section>
  );
}
