import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ExternalLink, X, ShieldCheck, Code, Sparkles, BarChart3, ArrowLeft } from 'lucide-react';

interface PortfolioPageProps {
  openBooking: (plan: string, price: string) => void;
}

const categories = ['All', 'Branding', 'Web', 'Mobile', 'UI/UX'];

export interface ProjectItem {
  title: string;
  category: string;
  tags: string[];
  desc: string;
  gradient: string;
  accent: string;
  year: string;
  image: string;
  challenge: string;
  solution: string;
  howItMade: string;
  results: { metric: string; label: string }[];
  gallery: string[];
  liveUrl?: string;
  clientOverview?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

const projects: ProjectItem[] = [
  {
    title: 'WealthPath Financial Advisors',
    category: 'Web',
    tags: ['Figma', 'WordPress', 'Elementor Pro', 'Calendly', 'Local SEO'],
    desc: 'Financial Advisor Website Design & Development',
    gradient: 'from-blue-900/40 via-[#c5a059]/15 to-transparent',
    accent: '#c5a059',
    year: '2026',
    image: '/images/wealthpath_presentation.jpg',
    challenge: 'The client faced an outdated website design with no online booking or lead generation system. Poor mobile responsiveness, low search engine visibility, and a lack of trust-building content caused visitors to leave without initiating contact.',
    solution: 'Designed and developed a trust-focused website with a professional blue & gold color scheme. Integrated Calendly and Zoom for scheduling, created conversion-oriented service landing pages, added local SEO targeting, and optimized for mobile performance.',
    howItMade: 'Crafted custom UI mockups in Figma. Developed the final platform on WordPress with Elementor Pro, structuring it for speed and local SEO using Rank Math. Built custom integrations for Calendly scheduling and Google Analytics tracking.',
    results: [
      { metric: '+500%', label: 'Monthly Visitors' },
      { metric: '5.6×', label: 'Consultations' },
      { metric: '-31%', label: 'Bounce Rate' },
      { metric: '4.8%', label: 'Mobile Conv. Rate' },
      { metric: '65', label: 'Google Keywords' }
    ],
    gallery: [
      '/images/wealthpath_hero.png',
      '/images/wealthpath_mobile.jpg',
      '/images/wealthpath_about.jpg',
      '/images/wealthpath_services.jpg'
    ],
    liveUrl: 'https://wealthpathadvisors.com',
    clientOverview: 'WealthPath Financial Advisors is an independent financial advisory firm in Dallas, Texas. They help individuals, families, and business owners with retirement planning, investment management, wealth preservation, estate planning, and tax-efficient investing.',
    testimonial: {
      quote: '“Pixel Vance Digital transformed our online presence. We now receive qualified consultation requests every week, and our website has become our primary lead generation channel.”',
      author: 'Michael Anderson',
      role: 'Founder, WealthPath Financial Advisors'
    }
  }
];

interface ProjectDetailsProps {
  key?: string;
  project: ProjectItem;
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
      className="space-y-12 relative"
    >
      {/* Background Decorative Drifting Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-[#c5a059]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Navigation & Back Button */}
      <div className="flex items-center justify-between relative z-10">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-white/50 hover:text-[#c5a059] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Portfolio
        </button>
        <span className="text-[9px] font-mono tracking-widest text-[#c5a059] uppercase px-3 py-1 rounded-full border border-[#c5a059]/20 bg-[#c5a059]/5">
          Case Study / {project.category}
        </span>
      </div>

      {/* Main Title Block - Large Headline Presentation */}
      <div className="space-y-4 text-center max-w-3xl mx-auto pt-6 relative z-10">
        <span className="text-[10px] font-mono tracking-[0.35em] text-[#c5a059] uppercase font-bold">
          — DETAILED CASE STUDY —
        </span>
        <h1 className="text-4xl md:text-6xl font-display font-light text-white leading-[1.15] tracking-tight">
          {project.title}
        </h1>
        <p className="text-xs md:text-sm text-white/45 max-w-xl mx-auto leading-relaxed font-sans font-light">
          {project.desc}
        </p>
      </div>

      {/* Hero Showcase Center Frame (mimicking the large central browser device mockup) */}
      <div className="h-[40vh] md:h-[58vh] w-full relative rounded-[32px] overflow-hidden border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#07080c] relative z-10 group flex items-center justify-center">
        {/* Ambient Blur Glow Background */}
        <div className="absolute inset-0 filter blur-xl opacity-25 scale-105 overflow-hidden pointer-events-none">
          <img src={project.image} alt="" className="w-full h-full object-cover" />
        </div>
        
        {/* Full Image Presentation */}
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-contain relative z-10 transition-transform duration-[1.5s] group-hover:scale-[1.02]" 
        />
        
        <div className="absolute inset-0 border border-white/[0.06] rounded-[32px] pointer-events-none z-20" />
      </div>

      {/* Stats Counter Row (mimicking the 4 pills row from the 1st reference image) */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 py-4 relative z-10">
        {project.results.map((r, ri) => (
          <div 
            key={ri} 
            className="flex items-center gap-3 px-5 py-3 bg-white/[0.01] hover:bg-white/[0.04] border border-white/[0.08] hover:border-[#c5a059]/30 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
          >
            <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{r.label}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] shrink-0" />
            <span className="text-xs font-mono font-bold text-[#c5a059]">{r.metric}</span>
          </div>
        ))}
      </div>

      {/* Asymmetric Grid Layout matching the 1st reference image */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        
        {/* Card 1: Client Overview & Tech Stack (corresponds to the dark blue vertical widget) */}
        <div className="lg:col-span-1 bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.07] rounded-[32px] p-6 space-y-6 flex flex-col justify-between relative overflow-hidden group shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a059]/5 rounded-full blur-2xl group-hover:bg-[#c5a059]/10 transition-colors duration-500" />
          
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-[#c5a059] tracking-widest uppercase px-3 py-1 rounded-full border border-[#c5a059]/20 bg-[#c5a059]/5">
                Client Brief
              </span>
              <span className="text-[9px] font-mono text-white/30">{project.year}</span>
            </div>
            <h3 className="text-xl font-display font-light text-white tracking-tight">
              WealthPath Advisors
            </h3>
            <p className="text-[11px] text-white/45 leading-relaxed font-sans font-light">
              {project.clientOverview || project.desc}
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/[0.06] text-left">
            <h4 className="text-[9px] font-mono text-white/30 uppercase tracking-[0.25em] font-bold">Technologies</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map(tag => (
                <span 
                  key={tag} 
                  className="text-[9px] font-mono text-white/60 bg-white/[0.03] border border-white/[0.08] px-2.5 py-1 rounded-lg hover:border-[#c5a059]/30 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: The Challenge (corresponds to the middle square portrait card) */}
        <div className="lg:col-span-1 bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.07] rounded-[28px] p-6 space-y-6 flex flex-col justify-between relative overflow-hidden group shadow-lg text-left">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors duration-500" />
          
          <div className="space-y-4">
            <span className="text-[9px] font-mono text-red-400 tracking-widest uppercase px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 inline-block">
              The Challenge
            </span>
            <h3 className="text-xl font-display font-light text-white tracking-tight">
              Outdated Presence
            </h3>
            <p className="text-[11px] text-white/45 leading-relaxed font-sans font-light">
              {project.challenge}
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/[0.08] shadow-md bg-white/[0.01]">
            <img 
              src={project.gallery && project.gallery[2] ? project.gallery[2] : project.image} 
              alt="Client Context" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute bottom-2.5 left-3 text-[9px] font-mono text-white/50">{project.title} Interface</span>
          </div>
        </div>

        {/* Card 3: Our Solution (corresponds to the right widget card) */}
        <div className="lg:col-span-1 bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.07] rounded-[28px] p-6 space-y-6 flex flex-col justify-between relative overflow-hidden group shadow-lg text-left">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
          
          <div className="space-y-4">
            <span className="text-[9px] font-mono text-emerald-400 tracking-widest uppercase px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 inline-block">
              Our Solution
            </span>
            <h3 className="text-xl font-display font-light text-white tracking-tight">
              Trust & Growth
            </h3>
            <p className="text-[11px] text-white/45 leading-relaxed font-sans font-light">
              {project.solution}
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-center justify-between hover:border-white/10 transition-colors">
              <span className="text-[10px] font-sans text-white/50">Modern UI/UX Design</span>
              <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/5">Blue & Gold</span>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-center justify-between hover:border-white/10 transition-colors">
              <span className="text-[10px] font-sans text-white/50">Consultation Booking</span>
              <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/5">Calendly API</span>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-center justify-between hover:border-white/10 transition-colors">
              <span className="text-[10px] font-sans text-white/50">Local SEO Optimization</span>
              <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/5">Rank Math</span>
            </div>
          </div>
        </div>

        {/* Card 4: Engineering Process & Process Steps (corresponds to the bottom-left wide card) */}
        <div className="lg:col-span-2 bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.07] rounded-[32px] p-8 space-y-6 relative overflow-hidden group shadow-lg text-left">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500" />
          
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-blue-400 tracking-widest uppercase px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5">
              Engineering Process
            </span>
            <span className="text-[9px] font-mono text-white/20">Figma to Elementor Pro</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-2">
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] font-bold">Process & Architecture</h4>
              <p className="text-[11px] text-white/45 leading-relaxed font-sans font-light">
                {project.howItMade}
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] font-bold">Scope of Work Delivered</h4>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Custom Wireframing & UI Style Guide in Figma',
                  'Online Scheduling & Calendly Consultation API',
                  'Local Dallas SEO Architecture & Metadata Mapping',
                  'Mobile-First Responsive Layout Engineering',
                  'Custom Regulatory Disclosures & Trust Badges'
                ].map((feature, fi) => (
                  <div key={fi} className="flex items-center gap-3 p-2 bg-white/[0.01] border border-white/[0.04] rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] shrink-0" />
                    <span className="text-[10px] text-white/50">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 5: Testimonial & Live Link Actions (corresponds to the bottom-right black card) */}
        <div className="lg:col-span-1 bg-gradient-to-b from-[#111219]/90 to-[#09090c]/90 border border-white/[0.08] rounded-[32px] p-6 flex flex-col justify-between relative overflow-hidden group shadow-2xl text-left">
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#c5a059]/10 rounded-full blur-2xl" />
          
          {project.testimonial ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-[#c5a059] tracking-widest uppercase px-3 py-1 rounded-full border border-[#c5a059]/20 bg-[#c5a059]/5">
                  Client Feedback
                </span>
                <span className="text-xs text-[#c5a059] font-serif">5★ Review</span>
              </div>
              <blockquote className="text-[11px] md:text-xs text-white/80 italic leading-relaxed font-serif relative pl-3 border-l border-[#c5a059]/30">
                {project.testimonial.quote}
              </blockquote>
              <div className="space-y-0.5 pt-2 pl-3">
                <p className="text-[11px] text-white font-semibold">{project.testimonial.author}</p>
                <p className="text-[9px] text-white/40 font-mono">{project.testimonial.role}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-[#c5a059] tracking-widest uppercase px-3 py-1 rounded-full border border-[#c5a059]/20 bg-[#c5a059]/5 inline-block">
                Project Actions
              </span>
              <h3 className="text-lg font-display font-light text-white">Let's Collaborate</h3>
              <p className="text-[11px] text-white/40 leading-relaxed font-sans font-light">
                Ready to achieve comparable growth metrics and transform your digital presence?
              </p>
            </div>
          )}

          <div className="space-y-2.5 pt-8 z-10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#c5a059] hover:bg-[#c5a059]/90 text-black text-[10px] font-mono tracking-widest uppercase font-bold transition-all rounded-xl cursor-pointer shadow-lg shadow-[#c5a059]/10"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={() => openBooking('GROWTH', '$2,999')}
              className="inline-flex items-center justify-center w-full py-3 px-4 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] text-white text-[10px] font-mono tracking-widest uppercase transition-all rounded-xl cursor-pointer"
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

  useEffect(() => {
    if (selectedProject) {
      document.title = `${selectedProject.title} Case Study | Pixel Vance Digital`;
      const slug = getSlug(selectedProject.title);
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', `https://www.pixelvancedigital.com/portfolio/${slug}`);
      }
    } else {
      document.title = 'Portfolio | Web Design & Branding Work | Pixel Vance Digital';
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', 'https://www.pixelvancedigital.com/portfolio');
      }
    }
  }, [selectedProject]);

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
            {filtered.length === 0 ? (
              <div className="text-center py-24 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                <p className="text-sm text-white/40 font-mono tracking-widest uppercase">No projects found in this category</p>
                <p className="text-xs text-white/20 font-mono mt-2">New projects are being added. Check back soon!</p>
              </div>
            ) : (
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
            )}

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
