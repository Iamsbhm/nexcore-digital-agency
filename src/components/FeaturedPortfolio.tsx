import React from 'react';
import { ExternalLink } from 'lucide-react';

interface FeaturedPortfolioProps {
  navigateTo: (path: string) => void;
}

const getSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export interface FeaturedProjectItem {
  title: string;
  category: string;
  tags: string[];
  desc: string;
  image: string;
  accent: string;
  liveUrl?: string;
}

export default function FeaturedPortfolio({ navigateTo }: FeaturedPortfolioProps) {
  const [activeDot, setActiveDot] = React.useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const projects: FeaturedProjectItem[] = [
    {
      title: 'WealthPath Financial Advisors',
      category: 'Web',
      tags: ['Figma', 'WordPress', 'Elementor Pro', 'Calendly', 'Local SEO'],
      desc: 'Financial Advisor Website Design & Development',
      image: '/images/wealthpath_presentation.jpg',
      accent: '#c5a059',
      liveUrl: 'https://wealthpathadvisors.com'
    },
    {
      title: 'JusticeEdge Law Group',
      category: 'Web',
      tags: ['Figma', 'WordPress', 'Elementor Pro', 'Calendly', 'Rank Math SEO'],
      desc: 'Law Firm Website Design & Development',
      image: '/images/justiceedge_presentation.jpg',
      accent: '#c5a059',
      liveUrl: 'https://justiceedgelaw.com'
    },
    {
      title: 'BrightSmile Dental Care',
      category: 'Web',
      tags: ['Figma', 'WordPress', 'Elementor Pro', 'Calendly', 'Rank Math SEO'],
      desc: 'Dental Clinic Website Redesign & Development',
      image: '/images/dental_presentation_v2.jpg',
      accent: '#0ea5e9',
      liveUrl: 'https://brightsmiledental.com'
    }
  ];

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth } = carouselRef.current;
      const cardWidth = scrollWidth / projects.length;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveDot(index);
    }
  };

  return (
    <section className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto" id="portfolio-featured-section">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
        <span className="text-[10px] font-mono tracking-widest text-[#c5a059] font-bold uppercase">
          — FEATURED SHOWCASE —
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-none">
          Custom Web Design That <span style={{ background: 'linear-gradient(135deg,#c5a059,#e8c97a,#c5a059)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Converts Visitors</span> Into Customers
        </h2>
        <p className="text-xs md:text-sm text-white/50 leading-relaxed">
          A curated glance at the high-fidelity web experiences, digital products, and brand systems we've designed and engineered.
        </p>
      </div>

      {/* 3-Card Grid/Carousel or Fallback */}
      {projects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
          <p className="text-sm text-white/40 font-mono tracking-widest uppercase">Portfolio showcase coming soon</p>
          <p className="text-xs text-white/20 font-mono mt-1">We are updating our gallery with new elite projects. Check back shortly!</p>
        </div>
      ) : (
        <div className="relative">
          {/* Custom Webkit scrollbar hiding rule */}
          <style>{`
            #portfolio-featured-carousel::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          <div 
            id="portfolio-featured-carousel"
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none md:grid-cols-3 gap-6 pb-6 md:pb-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project) => (
              <div
                key={project.title}
                onClick={() => {
                  navigateTo(`/portfolio/${getSlug(project.title)}`);
                }}
                className="w-[85vw] md:w-auto shrink-0 snap-center md:snap-align-none group bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-350 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Visual Image Header */}
                  <div className="aspect-[3/2] relative overflow-hidden flex items-end p-5 bg-[#07080c]">
                    {/* Ambient Blur Glow Background */}
                    <div className="absolute inset-0 filter blur-md opacity-20 scale-105 overflow-hidden pointer-events-none">
                      <img src={project.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent z-20 pointer-events-none" />
                    <div className="absolute inset-0 border-b border-white/[0.06] z-20 pointer-events-none" />
                    
                    <div className="relative z-10 flex items-center justify-between w-full">
                      <span className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border" style={{ color: project.accent, borderColor: `${project.accent}40`, backgroundColor: `${project.accent}20` }}>
                        {project.category}
                      </span>
                    </div>
                    
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                      <div className="px-4 py-2 rounded-xl border flex items-center gap-2 bg-black/60 shadow-lg text-[10px] font-mono tracking-widest uppercase" style={{ color: project.accent, borderColor: `${project.accent}50` }}>
                        <span>View Project</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="p-5 text-left space-y-2.5">
                    <h3 className="text-base font-display font-semibold text-white group-hover:text-[#c5a059] transition-colors">{project.title}</h3>
                    <p className="text-[11px] text-white/35 leading-relaxed">{project.desc}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 text-left">
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-mono text-white/30 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Pagination Slider Dots */}
          <div className="flex justify-center gap-1.5 mt-4 md:hidden">
            {projects.map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeDot === i ? 'bg-[#c5a059] w-3.5' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* View All Button */}
      <div className="text-center pt-8">
        <button
          onClick={() => {
            navigateTo('/portfolio');
          }}
          className="inline-flex items-center gap-2 py-3 px-8 bg-transparent hover:bg-white/[0.03] border border-white/10 hover:border-white/20 text-white text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer rounded-xl"
        >
          <span>View Full Portfolio</span>
        </button>
      </div>
    </section>
  );
}
