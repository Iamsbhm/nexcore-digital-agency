import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ExternalLink, X, ShieldCheck, Code, Sparkles, BarChart3, ArrowLeft } from 'lucide-react';

interface PortfolioPageProps {
  openBooking: (plan: string, price: string) => void;
}

const categories = ['All', 'Branding', 'Web', 'Mobile', 'UI/UX'];

const projects = [
  {
    title: 'Pixel Vance Web Platform',
    category: 'Web',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'WebGL', 'Framer Motion'],
    desc: 'Our own high-performance, next-generation agency website with interactive 3D elements.',
    gradient: 'from-[#c5a059]/30 via-purple-900/20 to-transparent',
    accent: '#c5a059',
    year: '2026',
    image: '/images/nexcore_web_platform.png',
    challenge: 'Creating an agency website that stands out in a crowded market while maintaining extreme performance (sub-second loading times) and high accessibility.',
    solution: 'Implemented a custom Vite + React + Framer Motion structure with optimized 3D particle elements, dynamic code watermarks, and smooth layout transitions.',
    howItMade: 'Built using Vite for instant dev server starts, Tailwind CSS for fluid utilities, and WebGL for canvas particle effects. Performance optimized via eager assets prefetching and component lazy-loading.',
    results: [
      { metric: '0.4s', label: 'LCP Paint Time' },
      { metric: '99/100', label: 'Performance score' },
      { metric: '4.8×', label: 'Lead Conversions' }
    ],
    gallery: [
      '/images/nexcore_web_platform.png',
      '/images/hero_web_design.png',
      '/images/hero_tech_development.png',
      '/images/hero_seo_rankings.png'
    ]
  },
  {
    title: 'Aether Finance',
    category: 'Web',
    tags: ['React', 'TailwindCSS', 'Framer Motion'],
    desc: 'High-converting SaaS dashboard for a fintech startup targeting the US market.',
    gradient: 'from-blue-600/30 via-blue-900/20 to-transparent',
    accent: '#3b82f6',
    year: '2025',
    image: '/images/aether_finance.png',
    challenge: 'Aether Finance struggled with high drop-offs on their core onboarding flow, leading to a trial-to-paid conversion rate stuck at 2.1%.',
    solution: 'A complete UX overhaul of the user journey, simplified chart interactions, custom analytics widgets, and optimizing LCP to 1.2s.',
    howItMade: 'Constructed using modern React hooks, Chart.js for data visualization, and Tailwind CSS for standard responsive UI elements.',
    results: [
      { metric: '3.8×', label: 'Conversion Uplift' },
      { metric: '−62%', label: 'Churn Reduction' },
      { metric: '1.2s', label: 'Page Load Speed' },
    ],
    gallery: [
      '/images/aether_finance.png',
      '/images/hero_web_design.png',
      '/images/hero_cloud_infrastructure.png',
      '/images/hero_seo_rankings.png'
    ]
  },
  {
    title: 'Voss & Co. Rebrand',
    category: 'Branding',
    tags: ['Logo', 'Identity', 'Print'],
    desc: 'Full brand overhaul for a luxury real estate firm — identity, stationery, signage.',
    gradient: 'from-[#c5a059]/30 via-[#8c6e3d]/15 to-transparent',
    accent: '#c5a059',
    year: '2025',
    image: '/images/voss_rebrand.png',
    challenge: 'Voss & Co. needed to position their real estate portfolio for high-net-worth clients, but their old identity felt dated and dry.',
    solution: 'Re-imagined the brand with a premium serif layout, luxury golden tones, custom stationery, and a sleek web showcase.',
    howItMade: 'Designed in Illustrator & Figma. Web properties built on Astro for lightning-fast HTML delivery and SEO presence.',
    results: [
      { metric: '+240%', label: 'Inbound Leads' },
      { metric: '2×', label: 'Avg. Deal Size' },
      { metric: '12', label: 'Press Features' },
    ],
    gallery: [
      '/images/voss_rebrand.png',
      '/images/hero_web_design.png',
      '/images/hero_seo_rankings.png',
      '/images/hero_tech_development.png'
    ]
  },
  {
    title: 'PulseApp',
    category: 'Mobile',
    tags: ['iOS', 'Android', 'React Native'],
    desc: 'AI-powered health tracking app with 50K+ downloads on launch week.',
    gradient: 'from-emerald-600/30 via-emerald-900/15 to-transparent',
    accent: '#10b981',
    year: '2024',
    image: '/images/pulseapp_mobile.png',
    challenge: 'Confusing user interface navigation and no clear onboarding path was leading to low app store reviews and high day-1 churn.',
    solution: 'Designed a minimal mobile UI flow, implementing AI-driven personal health dashboards and subtle gamified streaks.',
    howItMade: 'Developed with React Native and Expo, incorporating React Native Reanimated for native-feeling transitions and micro-interactions.',
    results: [
      { metric: '4.8★', label: 'App Store Rating' },
      { metric: '50K+', label: 'Launch Downloads' },
      { metric: '+180%', label: 'Day-30 Retention' },
    ],
    gallery: [
      '/images/pulseapp_mobile.png',
      '/images/hero_tech_development.png',
      '/images/hero_cloud_infrastructure.png',
      '/images/hero_seo_rankings.png'
    ]
  },
  {
    title: 'Orbit SaaS Platform',
    category: 'UI/UX',
    tags: ['Figma', 'Design System', 'Prototyping'],
    desc: 'End-to-end design for a B2B project management SaaS — 120+ screens.',
    gradient: 'from-purple-600/30 via-purple-900/15 to-transparent',
    accent: '#a855f7',
    year: '2024',
    image: '/images/orbit_saas.png',
    challenge: 'Enterprise users faced cognitive fatigue, leading to drop-offs during complex multi-tenant setup steps.',
    solution: 'Built a modular layout with clear visual hierarchy, contextual help tooltips, and simplified wizard workflows.',
    howItMade: 'Engineered as a comprehensive, variable-driven Figma design system. Handoff was compiled into interactive prototypes and documented in Storybook.',
    results: [
      { metric: '−45%', label: 'Setup Time' },
      { metric: '94%', label: 'User Satisfaction' },
      { metric: '85%', label: 'Feature Adoption' },
    ],
    gallery: [
      '/images/orbit_saas.png',
      '/images/hero_web_design.png',
      '/images/hero_cloud_infrastructure.png',
      '/images/hero_tech_development.png'
    ]
  },
  {
    title: 'Luxe Maison',
    category: 'Web',
    tags: ['Next.js', 'Shopify', 'CRO'],
    desc: 'Premium e-commerce experience for a luxury home goods brand. 3× conversion uplift.',
    gradient: 'from-rose-600/25 via-rose-900/15 to-transparent',
    accent: '#f43f5e',
    year: '2024',
    image: '/images/luxe_maison.png',
    challenge: 'A standard Shopify theme felt generic, failing to reflect luxury craftsmanship and causing cart abandonment of 82%.',
    solution: 'Crafted a headless Shopify store with bespoke transitions, high-definition interactive images, and simplified payment systems.',
    howItMade: 'Constructed using Next.js for SSR, Tailwind CSS for design systems, and Shopify Storefront GraphQL API.',
    results: [
      { metric: '3×', label: 'Revenue Growth' },
      { metric: '−23%', label: 'Cart Abandonment' },
      { metric: '$4.2M', label: 'Revenue (6mo)' },
    ],
    gallery: [
      '/images/luxe_maison.png',
      '/images/hero_web_design.png',
      '/images/hero_seo_rankings.png',
      '/images/hero_cloud_infrastructure.png'
    ]
  },
  {
    title: 'NovaMark Agency',
    category: 'Branding',
    tags: ['Brand Strategy', 'Logo', 'Guidelines'],
    desc: 'Complete visual identity for a performance marketing agency in Austin, TX.',
    gradient: 'from-amber-600/25 via-amber-900/15 to-transparent',
    accent: '#f59e0b',
    year: '2023',
    image: '/images/novamark_agency.png',
    challenge: 'The agency was trying to attract high-ticket B2B enterprise clients but possessed a logo and strategy that looked like a freelancer.',
    solution: 'Created a cohesive, bold corporate branding system including professional sales decks, web style guides, and stationery.',
    howItMade: 'Researched B2B design patterns, crafted custom typography in Adobe Illustrator, and designed responsive pitch deck assets.',
    results: [
      { metric: '5', label: 'Enterprise Wins' },
      { metric: '+130%', label: 'Client Retention' },
      { metric: '4.9★', label: 'Client Reviews' },
    ],
    gallery: [
      '/images/novamark_agency.png',
      '/images/hero_seo_rankings.png',
      '/images/hero_web_design.png',
      '/images/hero_tech_development.png'
    ]
  },
];

interface ProjectDetailsProps {
  project: typeof projects[0];
  onBack: () => void;
  openBooking: (plan: string, price: string) => void;
}

function ProjectDetailsView({ project, onBack, openBooking }: ProjectDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-10"
    >
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-white/50 hover:text-[#c5a059] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Portfolio
        </button>
        <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase">
          Case Study / {project.category}
        </span>
      </div>

      {/* Hero Showcase Frame */}
      <div className="h-[40vh] md:h-[55vh] w-full relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl flex items-center justify-center">
        <img 
          src={project.image} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/20 to-transparent" />
        
        {/* Title Content Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
          <div className="space-y-3 text-left">
            <span 
              className="text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border inline-block" 
              style={{ color: project.accent, borderColor: `${project.accent}40`, backgroundColor: `${project.accent}15` }}
            >
              {project.category}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-semibold text-white leading-tight">
              {project.title}
            </h1>
          </div>
          <div className="text-[10px] font-mono text-white/50 bg-black/40 backdrop-blur-sm border border-white/[0.08] px-4 py-2 rounded-full shrink-0 self-start md:self-end">
            ESTABLISHED: {project.year}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Challenge & Solution Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Challenge Card */}
            <div className="p-6 md:p-8 bg-white/[0.01] border border-white/[0.06] rounded-2xl space-y-4 text-left">
              <div className="flex items-center gap-2.5" style={{ color: project.accent }}>
                <ShieldCheck className="w-5 h-5" />
                <h3 className="text-xs font-mono uppercase tracking-[0.25em] font-bold">The Challenge</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed font-sans">
                {project.challenge}
              </p>
            </div>

            {/* Solution Card */}
            <div className="p-6 md:p-8 bg-white/[0.01] border border-white/[0.06] rounded-2xl space-y-4 text-left">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-xs font-mono uppercase tracking-[0.25em] font-bold">Our Solution</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed font-sans">
                {project.solution}
              </p>
            </div>
          </div>

          {/* How It Was Made (Full Width details) */}
          <div className="p-6 md:p-8 bg-white/[0.01] border border-white/[0.06] rounded-2xl space-y-5 text-left">
            <div className="flex items-center gap-2.5 text-blue-400">
              <Code className="w-5 h-5" />
              <h3 className="text-xs font-mono uppercase tracking-[0.25em] font-bold">Engineering Process</h3>
            </div>
            <p className="text-sm text-white/70 leading-relaxed font-sans">
              {project.howItMade}
            </p>
          </div>
        </div>

        {/* Right 1 Column: Tech Stack & CTA */}
        <div className="space-y-6 text-left">
          
          {/* Technologies Used Card */}
          <div className="p-6 bg-white/[0.01] border border-white/[0.06] rounded-2xl space-y-4">
            <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] font-bold">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] font-mono text-white/60 bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Results Metric Card */}
          <div className="p-6 bg-white/[0.01] border border-white/[0.06] rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <BarChart3 className="w-4 h-4" />
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">Performance Results</h4>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {project.results.map((r, ri) => (
                <div key={ri} className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white/35 uppercase tracking-wide">
                    {r.label}
                  </span>
                  <span className="text-xl font-display font-black" style={{ color: project.accent }}>
                    {r.metric}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="p-6 bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.06] rounded-2xl space-y-4">
            <p className="text-xs text-white/40 leading-relaxed">
              Want us to deliver similar performance metrics and brand experience for your project?
            </p>
            <button
              onClick={() => openBooking('GROWTH', '$2,999')}
              className="w-full py-3 bg-[#c5a059] hover:bg-[#c5a059]/90 text-black text-[10px] font-mono tracking-[0.2em] uppercase font-bold transition-all rounded-xl cursor-pointer"
            >
              Book Strategy Session
            </button>
          </div>

        </div>
      </div>

      {/* Gallery Showcase */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="space-y-5 text-left pt-8 border-t border-white/[0.06]">
          <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] font-bold text-white/30">Project Gallery</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.gallery.map((imgUrl, index) => (
              <div key={index} className="aspect-video relative rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#c5a059]/40 transition-all duration-300 group shadow-lg bg-white/[0.01]">
                <img 
                  src={imgUrl} 
                  alt={`${project.title} screenshot ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back button at the bottom of page for nice flow */}
      <div className="pt-4 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[#c5a059] hover:underline transition-colors cursor-pointer"
        >
          ← Back to Portfolio Catalog
        </button>
      </div>

    </motion.div>
  );
}

// ── Portfolio Page Main ──

export default function PortfolioPage({ openBooking }: PortfolioPageProps) {
  const [active, setActive] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const getSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      if (path.startsWith('/portfolio/')) {
        const slug = path.replace('/portfolio/', '');
        const proj = projects.find(p => getSlug(p.title) === slug);
        setSelectedProject(proj || null);
      } else {
        setSelectedProject(null);
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const selectProject = (proj: typeof projects[0]) => {
    const slug = getSlug(proj.title);
    window.history.pushState(null, '', `/portfolio/${slug}`);
    setSelectedProject(proj);
    window.scrollTo({ top: 0 });
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const deselectProject = () => {
    window.history.pushState(null, '', '/portfolio');
    setSelectedProject(null);
    window.scrollTo({ top: 0 });
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto pt-8 pb-24 space-y-16">
      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectDetailsView 
            key="details"
            project={selectedProject} 
            onBack={deselectProject} 
            openBooking={openBooking} 
          />
        ) : (
          <motion.div
            key="catalog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-16"
          >
            {/* ── Hero ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6 py-20"
            >
              <span className="text-[9px] font-mono tracking-[0.35em] text-[#c5a059] uppercase">— Our Work —</span>
              <h1 className="text-5xl md:text-7xl font-display font-light text-white leading-[1.08]">
                Design Portfolio
              </h1>
              <p className="text-sm text-white/40 max-w-xl mx-auto leading-relaxed">
                A curated selection of projects where creativity meets engineering precision. Click any card to explore the deep-dive case study.
              </p>
            </motion.div>

            {/* ── Filter Tabs ── */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer border ${
                    active === cat
                      ? 'bg-[#c5a059] border-[#c5a059] text-black'
                      : 'border-white/10 text-white/40 hover:border-[#c5a059]/40 hover:text-[#c5a059]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* ── Grid ── */}
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  onClick={() => selectProject(project)}
                  className="group bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Visual placeholder */}
                    <div className="h-44 relative flex items-end p-5 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />
                      <div className="absolute inset-0 border-b border-white/[0.06]" />
                      
                      <div className="relative z-10 flex items-center justify-between w-full">
                        <span className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border" style={{ color: project.accent, borderColor: `${project.accent}40`, backgroundColor: `${project.accent}20` }}>
                          {project.category}
                        </span>
                        <span className="text-[9px] font-mono text-white/50">{project.year}</span>
                      </div>
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                        <div className="px-4 py-2 rounded-xl border flex items-center gap-2 bg-black/60 shadow-lg text-[10px] font-mono tracking-widest uppercase" style={{ color: project.accent, borderColor: `${project.accent}50` }}>
                          <span>Case Study</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5 space-y-3 text-left">
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
                </motion.div>
              ))}
            </motion.div>

            {/* ── CTA ── */}
            <div className="text-center space-y-5 py-14 border border-white/[0.06] rounded-3xl bg-white/[0.01]">
              <h2 className="text-2xl md:text-3xl font-display font-light text-white">
                Want us to build something <span className="font-serif italic text-[#c5a059]">extraordinary?</span>
              </h2>
              <button
                onClick={() => openBooking('GROWTH', '$2,999')}
                id="portfolio-cta-btn"
                className="inline-flex items-center gap-2 py-3 px-8 bg-[#c5a059] hover:bg-transparent border border-[#c5a059] text-black hover:text-white text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
              >
                Start Your Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
