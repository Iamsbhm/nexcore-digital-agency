import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ExternalLink, X, ShieldCheck, Code, Sparkles, BarChart3, ArrowLeft, ArrowUpRight } from 'lucide-react';

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
    title: 'PrimeNest Realty',
    category: 'Web',
    tags: ['Figma', 'WordPress', 'Elementor Pro', 'Rank Math SEO', 'WP Rocket', 'Calendly'],
    desc: 'Real Estate Agency Website Design & Development',
    gradient: 'from-blue-950/40 via-[#c5a059]/15 to-transparent',
    accent: '#c5a059',
    year: '2026',
    image: '/images/primenest_presentation.jpg',
    challenge: 'The agency had a slow, generic real estate website that failed to showcase property listings dynamically, had poor mobile search capability, and generated low-quality leads. They needed a local SEO-optimized, highly interactive platform that simplified listing discovery and agent-client connection.',
    solution: 'Designed and built a premium, responsive real estate platform with advanced MLS-style custom search filters, interactive map integration, custom agent profiles, mortgage calculator, and automated lead routing systems, achieving a 98+ PageSpeed score.',
    howItMade: 'Crafted high-fidelity UI designs in Figma. Developed the responsive website on WordPress with Elementor Pro. Optimized loading speed using WP Rocket and structured properties schemas using Rank Math SEO. Integrated Calendly for agent appointment bookings.',
    results: [
      { metric: '+230%', label: 'Organic Traffic' },
      { metric: '+65%', label: 'More Leads' },
      { metric: '98+', label: 'PageSpeed Score' },
      { metric: '100%', label: 'Mobile Friendly' },
      { metric: '4.9★', label: 'Client Rating' }
    ],
    gallery: [
      '/images/primenest_presentation.jpg'
    ],
    liveUrl: 'https://primenestrealty.com',
    clientOverview: 'PrimeNest Realty is a modern boutique real estate brokerage providing premium residential buying, selling, and leasing services in Dallas, Austin, and Houston, Texas.',
    testimonial: {
      quote: '“Pixel Advance Digital designed a beautiful, high-converting platform. Our agents love the custom profiles, and property inquiries have surged since launch. The mortgage calculator is a client favorite.”',
      author: 'Jessica Miller',
      role: 'Founder & Broker, PrimeNest Realty'
    }
  },
  {
    title: 'Apex Roofing Solutions',
    category: 'Web',
    tags: ['Figma', 'WordPress', 'Elementor Pro', 'Rank Math SEO', 'WP Rocket', 'Calendly'],
    desc: 'Roofing Company Website Design & Development',
    gradient: 'from-yellow-950/40 via-[#c5a059]/15 to-transparent',
    accent: '#c5a059',
    year: '2026',
    image: '/images/apex_roofing_presentation.jpg',
    challenge: 'The client, a premier roofing contractor in the USA, was losing high-value storm damage claims and roof inspection leads to local competitors. Their outdated visual presence lacked local SEO architecture, conversion-focused forms, before/after showcases, and mobile booking capabilities.',
    solution: 'Designed and engineered a high-converting web platform utilizing a custom gold-accented theme. Built a dedicated storm damage claims flow, integrated Google Reviews for trust-syncing, set up Calendly for instant inspection bookings, and optimized performance to achieve a 95+ PageSpeed score.',
    howItMade: 'Designed a high-fidelity visual layout in Figma. Built the platform on WordPress using Elementor Pro for custom styling. Set up WP Rocket for performance optimization and Rank Math SEO for structured local schema markup. Wired custom scheduling integrations with Calendly.',
    results: [
      { metric: '+215%', label: 'Organic Traffic' },
      { metric: '+47%', label: 'More Leads' },
      { metric: '95+', label: 'PageSpeed Score' },
      { metric: '100%', label: 'Mobile Friendly' },
      { metric: 'Top 3', label: 'Local Maps Rank' }
    ],
    gallery: [
      '/images/apex_roofing_presentation.jpg'
    ],
    liveUrl: 'https://apexroofingsolutions.com',
    clientOverview: 'Apex Roofing Solutions is a leading residential and commercial roofing contractor specializing in roof replacements, leak repairs, storm damage restoration, and insurance claim assistance across major USA markets.',
    testimonial: {
      quote: '“Pixel Advance Digital did an amazing job! The inspection booking flow and the localized SEO pages have dramatically increased our organic leads. Homeowners trust us more because of our professional online image.”',
      author: 'Marcus Vance',
      role: 'Founder & CEO, Apex Roofing Solutions'
    }
  },
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
      quote: '“Pixel Advance Digital transformed our online presence. We now receive qualified consultation requests every week, and our website has become our primary lead generation channel.”',
      author: 'Michael Anderson',
      role: 'Founder, WealthPath Financial Advisors'
    }
  },
  {
    title: 'JusticeEdge Law Group',
    category: 'Web',
    tags: ['Figma', 'WordPress', 'Elementor Pro', 'Calendly', 'Rank Math SEO'],
    desc: 'Law Firm Website Design & Development',
    gradient: 'from-slate-950/40 via-[#c5a059]/15 to-transparent',
    accent: '#c5a059',
    year: '2026',
    image: '/images/justiceedge_presentation.jpg',
    challenge: 'The firm\'s existing website was outdated, difficult to navigate, and failed to convert visitors into consultation requests. Potential clients were choosing competing law firms due to poor search engine rankings, no online consultation booking, and a poor mobile experience.',
    solution: 'Designed and developed a premium, trustworthy website featuring professional attorney profiles, service-specific practice area landing pages, Calendly integration for consultations, and local SEO optimizations targeting high-value legal search terms in Chicago.',
    howItMade: 'Designed initial layouts in Figma. Developed the final responsive site on WordPress using Elementor Pro, setting up Rank Math for local SEO architecture. Integrated Calendly booking flows, Google Search Console, and Google Analytics to track consultation lead conversions.',
    results: [
      { metric: '+740%', label: 'Website Traffic' },
      { metric: '5.6×', label: 'Consultations' },
      { metric: '7.7×', label: 'Keywords Ranked' },
      { metric: '-45%', label: 'Bounce Rate' },
      { metric: '4.1×', label: 'Mobile Conv. Rate' }
    ],
    gallery: [
      '/images/justiceedge_presentation.jpg'
    ],
    liveUrl: 'https://justiceedgelaw.com',
    clientOverview: 'JusticeEdge Law Group is a prominent legal services firm in Chicago, Illinois. They specialize in Personal Injury Law, Family Law, Criminal Defense, Business Litigation, Real Estate Law, and Estate Planning, seeking to establish attorney credibility and build local client trust online.',
    testimonial: {
      quote: '“The new website completely transformed our online presence. We are now receiving consistent consultation requests every week, and our local search visibility has improved dramatically.”',
      author: 'Robert Mitchell',
      role: 'Managing Partner, JusticeEdge Law Group'
    }
  },
  {
    title: 'Elite Home Renovations',
    category: 'Web',
    tags: ['Figma', 'WordPress', 'Elementor Pro', 'WP Rocket', 'Rank Math SEO'],
    desc: 'Home Renovation & Remodeling Website Design & Development',
    gradient: 'from-blue-950/40 via-orange-500/10 to-transparent',
    accent: '#ea580c',
    year: '2026',
    image: '/images/elite_presentation_v2.jpg',
    challenge: 'The client faced an outdated website design with no project portfolio showcase, low Google rankings, and a poor mobile experience. Homeowners were choosing competing contractors due to a lack of professional galleries and a weak local SEO presence in Houston.',
    solution: 'Designed and developed a premium, conversion-focused website featuring a dark blue and orange accent theme, high-quality project before-and-after galleries, a free estimate request system, and service-specific local SEO targeting for kitchen, bath, and additions.',
    howItMade: 'Designed layouts in Figma. Developed the responsive site on WordPress using Elementor Pro, setting up Rank Math for local SEO. Integrated speed optimizations using WP Rocket, and configured conversion tracking with Google Analytics and Search Console.',
    results: [
      { metric: '+622%', label: 'Traffic Growth' },
      { metric: '95+', label: 'Quote Requests' },
      { metric: '9.5×', label: 'Ranking Keywords' },
      { metric: '-48%', label: 'Bounce Rate' },
      { metric: '3.9×', label: 'Mobile Conv. Rate' }
    ],
    gallery: [
      '/images/elite_presentation_v2.jpg'
    ],
    liveUrl: 'https://elitehomeremodels.com',
    clientOverview: 'Elite Home Renovations is a leading home renovation and remodeling company in Houston, Texas. They specialize in high-end kitchen remodeling, bathroom renovations, basement finishing, and home additions, seeking to showcase their craftsmanship and capture high-value homeowner leads.',
    testimonial: {
      quote: '“Since launching our new website, we have seen a significant increase in qualified remodeling inquiries. The project gallery and quote request system have become our strongest lead-generation tools.”',
      author: 'David Carter',
      role: 'Owner, Elite Home Renovations'
    }
  },
  {
    title: 'BrightSmile Dental Care',
    category: 'Web',
    tags: ['Figma', 'WordPress', 'Elementor Pro', 'Calendly', 'Rank Math SEO'],
    desc: 'Dental Clinic Website Redesign & Development',
    gradient: 'from-blue-900/30 via-sky-500/10 to-transparent',
    accent: '#0ea5e9',
    year: '2026',
    image: '/images/dental_presentation_v2.jpg',
    challenge: 'The dental clinic\'s existing website was outdated, difficult to navigate, and failed to convert visitors into appointment bookings. Potential patients were choosing competing clinics due to a poor mobile experience, a lack of local SEO, and a weak patient credibility presentation.',
    solution: 'Designed and developed a premium, trustworthy dental clinic website featuring a clean blue theme, high-quality patient-focused photography, service landing pages for general and cosmetic dentistry, a Calendly integration for online appointments, and local SEO optimizations.',
    howItMade: 'Designed UI layouts in Figma. Developed the final platform on WordPress with Elementor Pro. Configured Rank Math for local SEO, and integrated Calendly scheduling. Installed Google Analytics and Google Search Console to track bookings and search traffic.',
    results: [
      { metric: '+85%', label: 'Appointment Bookings' },
      { metric: '+62%', label: 'Organic Traffic' },
      { metric: '-40%', label: 'Bounce Rate' }
    ],
    gallery: [
      '/images/dental_presentation_v2.jpg'
    ],
    liveUrl: 'https://brightsmiledental.com',
    clientOverview: 'BrightSmile Dental Care is a modern dental clinic offering general and cosmetic dentistry, teeth whitening, and dental implants. They wanted a trust-building digital presence that would establish patient credibility, streamline online bookings, and capture local patient search interest.',
    testimonial: {
      quote: '“The new website completely transformed our patient booking experience. We have seen a significant increase in online appointments, and our patients love the clean, easy-to-use design.”',
      author: 'Dr. Sarah Jenkins',
      role: 'Clinical Director, BrightSmile Dental Care'
    }
  }
];

interface ProjectDetailsProps {
  key?: string;
  project: ProjectItem;
  onBack: () => void;
  openBooking: (plan: string, price: string) => void;
}

// ── High-Fidelity Tech Stack SVG Helpers ──
function getTechIcon(tag: string) {
  const t = tag.toLowerCase();
  if (t.includes('figma')) {
    return (
      <div className="w-12 h-12 rounded-full bg-[#f24e1e]/10 border border-[#f24e1e]/20 flex items-center justify-center text-[#f24e1e] group-hover:scale-110 transition-transform duration-300 shadow-md">
        <svg viewBox="0 0 38 57" className="w-4.5 h-6.5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 0C13.75 0 9.5 4.25 9.5 9.5C9.5 14.75 13.75 19 19 19H28.5V9.5C28.5 4.25 24.25 0 19 0Z" fill="currentColor"/>
          <path d="M9.5 28.5C9.5 23.25 13.75 19 19 19H28.5V38H19C13.75 38 9.5 33.75 9.5 28.5Z" fill="#A259FF"/>
          <path d="M19 38C13.75 38 9.5 42.25 9.5 47.5C9.5 52.75 13.75 57 19 57C24.25 57 28.5 52.75 28.5 47.5V38H19Z" fill="#0ACF83"/>
          <path d="M0 28.5C0 23.25 4.25 19 9.5 19V38C9.5 33.75 4.25 28.5 0 28.5Z" fill="#1ABCFE"/>
          <path d="M9.5 9.5C9.5 14.75 5.25 19 0 19V0H9.5C5.25 0 9.5 4.25 9.5 9.5Z" fill="#FF7262"/>
        </svg>
      </div>
    );
  }
  if (t.includes('wordpress')) {
    return (
      <div className="w-12 h-12 rounded-full bg-[#21759b]/10 border border-[#21759b]/20 flex items-center justify-center text-[#21759b] group-hover:scale-110 transition-transform duration-300 shadow-md">
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.158 12.786l-2.698 7.83c1.782.527 3.666.505 5.433-.067l-2.735-7.763zm.937-2.696l2.378 6.945c.983-1.42 1.543-3.11 1.543-4.935 0-1.228-.24-2.398-.675-3.468l-3.246 9.458-2.613-7.585zm-2.88 7.375L7.29 8.243C6.772 9.39 6.474 10.66 6.474 12c0 2.01.693 3.864 1.848 5.342l1.893-5.494zm.82-10.218c-.382 0-.743.048-1.096.14l.012.012c.704.143 1.228.76 1.228 1.488 0 .614-.37 1.157-.905 1.4l1.242 3.61c.42-.423.674-.997.674-1.63 0-1.516-1.155-3.618-1.155-5.02zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18.583a8.557 8.557 0 0 1-4.717-1.408l.056-.026 3.013-8.736 3.04 8.64.032.09c-1.272.937-2.83 1.44-4.424 1.44z"/>
        </svg>
      </div>
    );
  }
  if (t.includes('elementor')) {
    return (
      <div className="w-12 h-12 rounded-full bg-[#92003B]/10 border border-[#92003B]/20 flex items-center justify-center text-[#92003B] group-hover:scale-110 transition-transform duration-300 shadow-md">
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 17h-11v-1.95h11V17zm0-3.665h-11v-1.95h11v1.95zm0-3.67h-11V7.71h11v1.955z"/>
        </svg>
      </div>
    );
  }
  if (t.includes('calendly')) {
    return (
      <div className="w-12 h-12 rounded-full bg-[#006BFF]/10 border border-[#006BFF]/20 flex items-center justify-center text-[#006BFF] group-hover:scale-110 transition-transform duration-300 shadow-md">
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
        </svg>
      </div>
    );
  }
  if (t.includes('seo') || t.includes('rank math')) {
    return (
      <div className="w-12 h-12 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center text-[#c5a059] group-hover:scale-110 transition-transform duration-300 shadow-md">
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </div>
    );
  }
  if (t.includes('rocket') || t.includes('wp rocket')) {
    return (
      <div className="w-12 h-12 rounded-full bg-[#f34a23]/10 border border-[#f34a23]/20 flex items-center justify-center text-[#f34a23] group-hover:scale-110 transition-transform duration-300 shadow-md">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5M12 2C6.5 2 2 6.5 2 12c0 3 1.5 5.5 4 7l2-2M12 2c5.5 0 10 4.5 10 10 0 3-1.5 5.5-4 7l-2-2M12 2l-6 6 6-3 6 3-6-6z" />
          <circle cx="12" cy="10" r="2" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:scale-110 transition-transform duration-300 shadow-md">
      <Code className="w-5 h-5" />
    </div>
  );
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
      <div className="h-[40vh] md:h-[58vh] w-full relative rounded-[32px] overflow-hidden border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#07080c] z-10 group flex items-center justify-center">
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

      {/* ── Bento Grid Layout (Inspired by GridX reference layout) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        
        {/* Card 1: Client Brief & Context (David Henderson Profile Style - col-span-2) */}
        <div className="lg:col-span-2 md:col-span-2 relative group bg-gradient-to-br from-[#121319] to-[#0c0d12] border border-white/[0.05] rounded-[32px] p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-stretch justify-between overflow-hidden shadow-xl transition-all duration-300 hover:border-white/10 hover:shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/5 rounded-full blur-3xl group-hover:bg-[#c5a059]/10 transition-colors duration-500" />
          
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start flex-1 text-center sm:text-left">
            {/* Left Visual Image Frame */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[30px] overflow-hidden border border-white/[0.08] shrink-0 bg-[#07080c] relative group-hover:border-[#c5a059]/30 transition-colors duration-300">
              <img 
                src={project.gallery && project.gallery[0] ? project.gallery[0] : project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
            </div>

            {/* Right Text Content */}
            <div className="flex flex-col justify-between py-1 text-left">
              <div>
                <p className="text-[9px] font-mono text-[#c5a059] uppercase tracking-[0.2em]">Client Brief & Context</p>
                <h2 className="text-2xl font-display font-light text-white leading-tight mt-2">
                  {project.title}
                </h2>
                <p className="text-[11px] text-white/45 leading-relaxed font-sans font-light mt-3 max-w-lg">
                  {project.clientOverview || project.desc}
                </p>
              </div>
            </div>
          </div>

          <div className="self-end sm:absolute sm:bottom-8 sm:right-8 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:text-[#c5a059] group-hover:border-[#c5a059]/40 group-hover:bg-[#c5a059]/5 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 2: Tech Stack (Credentials signature style - col-span-1) with custom circular badges */}
        <div className="relative group bg-gradient-to-br from-[#121319] to-[#0c0d12] border border-white/[0.05] rounded-[32px] p-6 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 hover:border-white/10 hover:shadow-2xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a059]/5 rounded-full blur-2xl group-hover:bg-[#c5a059]/10 transition-colors duration-500" />
          
          {/* Tech stack icons container */}
          <div className="grid grid-cols-3 gap-y-4 gap-x-2 py-4 justify-items-center items-center max-w-[220px] mx-auto w-full">
            {project.tags.map((tag) => (
              <div key={tag} className="flex flex-col items-center gap-1.5 group/tech cursor-default">
                {getTechIcon(tag)}
                <span className="text-[8px] font-mono text-white/40 group-hover/tech:text-white transition-colors text-center w-16 truncate">{tag}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-end justify-between text-left">
            <div>
              <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">Technologies</p>
              <h3 className="text-lg font-display text-white mt-1">Tech Stack</h3>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:text-[#c5a059] group-hover:border-[#c5a059]/40 group-hover:bg-[#c5a059]/5 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 3: Specifications (Projects Showcase style - col-span-1) with wireframe SVG */}
        <div className="relative group bg-gradient-to-br from-[#121319] to-[#0c0d12] border border-white/[0.05] rounded-[32px] p-6 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 hover:border-white/10 hover:shadow-2xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a059]/5 rounded-full blur-2xl group-hover:bg-[#c5a059]/10 transition-colors duration-500" />
          
          {/* Abstract Graphic representing a browser frame/wireframe */}
          <div className="w-full aspect-[4/3] rounded-2xl bg-white/[0.01] border border-white/[0.06] p-3 flex flex-col gap-2 relative overflow-hidden group-hover:border-white/10 transition-colors duration-300">
            <div className="flex gap-1.5 border-b border-white/[0.06] pb-1.5 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>
            <div className="flex-1 flex flex-col gap-2 justify-center text-left">
              <div className="h-2 w-2/3 bg-white/15 rounded" />
              <div className="h-2 w-1/2 bg-white/10 rounded" />
              <div className="grid grid-cols-3 gap-1.5 mt-1">
                <div className="h-6 bg-[#07080c] border border-white/[0.06] rounded flex items-center justify-center text-[7px] font-mono text-[#c5a059]">{project.year}</div>
                <div className="h-6 bg-[#07080c] border border-white/[0.06] rounded flex items-center justify-center text-[7px] font-mono text-[#c5a059]">{project.category.toUpperCase()}</div>
                <div className="h-6 bg-[#07080c] border border-white/[0.06] rounded flex items-center justify-center text-[7px] font-mono text-[#c5a059]">USA</div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between text-left">
            <div>
              <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">Specifications</p>
              <h3 className="text-lg font-display text-white mt-1">Overview</h3>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:text-[#c5a059] group-hover:border-[#c5a059]/40 group-hover:bg-[#c5a059]/5 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 4: The Challenge (Blog style - col-span-1) with warning badge */}
        <div className="relative group bg-gradient-to-br from-[#121319] to-[#0c0d12] border border-white/[0.05] rounded-[32px] p-6 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 hover:border-white/10 hover:shadow-2xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors duration-500" />
          
          <div className="space-y-4 text-left">
            <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform duration-300">
              <ShieldCheck className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-[11px] text-white/45 leading-relaxed font-sans font-light">
              {project.challenge}
            </p>
          </div>

          <div className="mt-4 flex items-end justify-between text-left">
            <div>
              <p className="text-[9px] font-mono text-red-400/60 uppercase tracking-[0.2em]">The Problem</p>
              <h3 className="text-lg font-display text-white mt-1">Challenge</h3>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:text-red-400 group-hover:border-red-400/40 group-hover:bg-red-500/5 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 5: Our Solution (Specialization style - col-span-2) with three icons */}
        <div className="lg:col-span-2 md:col-span-2 relative group bg-gradient-to-br from-[#121319] to-[#0c0d12] border border-white/[0.05] rounded-[32px] p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 hover:border-white/10 hover:shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
          
          <div className="flex flex-col gap-5 text-left">
            {/* Icons representing solution pillars */}
            <div className="flex items-center gap-4 justify-start">
              <div className="w-12 h-12 rounded-full bg-emerald-500/5 border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 hover:scale-105 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-500/5 border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 hover:scale-105 shadow-sm">
                <Code className="w-5 h-5" />
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-500/5 border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 hover:scale-105 shadow-sm">
                <BarChart3 className="w-5 h-5" />
              </div>
            </div>
            
            <p className="text-[11px] text-white/45 leading-relaxed font-sans font-light">
              {project.solution}
            </p>
          </div>

          <div className="mt-6 flex items-end justify-between text-left">
            <div>
              <p className="text-[9px] font-mono text-emerald-400/60 uppercase tracking-[0.2em]">The Methodology</p>
              <h3 className="text-lg font-display text-white mt-1">Our Solution</h3>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:text-emerald-400 group-hover:border-[#0ac97a]/40 group-hover:bg-[#0ac97a]/5 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 6: Live Website & Session Booking (Profiles style - col-span-1) */}
        <div className="relative group bg-gradient-to-br from-[#121319] to-[#0c0d12] border border-white/[0.05] rounded-[32px] p-6 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 hover:border-white/10 hover:shadow-2xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a059]/5 rounded-full blur-2xl group-hover:bg-[#c5a059]/10 transition-colors duration-500" />
          
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#c5a059] hover:border-[#c5a059]/40 hover:bg-[#c5a059]/5 transition-all duration-300 hover:scale-110 shadow-lg"
                title="Visit Live Site"
              >
                <ExternalLink className="w-6 h-6" />
              </a>
            )}
            <button 
              onClick={() => openBooking('GROWTH', '$2,999')}
              className="w-full py-2.5 px-4 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] text-[9.5px] font-mono tracking-wider uppercase text-white/70 hover:text-white rounded-xl transition-colors cursor-pointer"
            >
              Book Session
            </button>
          </div>

          <div className="mt-4 flex items-end justify-between text-left">
            <div>
              <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">Project Actions</p>
              <h3 className="text-lg font-display text-white mt-1">Live Website</h3>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:text-[#c5a059] group-hover:border-[#c5a059]/40 group-hover:bg-[#c5a059]/5 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 7: Impact KPIs results counters grid (Stats Counter style - col-span-1) */}
        <div className="relative group bg-gradient-to-br from-[#121319] to-[#0c0d12] border border-white/[0.05] rounded-[32px] p-6 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 hover:border-white/10 hover:shadow-2xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a059]/5 rounded-full blur-2xl group-hover:bg-[#c5a059]/10 transition-colors duration-500" />
          
          <div className="grid grid-cols-2 gap-2 text-left py-1">
            {project.results.map((res, idx) => (
              <div key={idx} className={`p-2 bg-[#07080c] border border-white/[0.04] rounded-2xl flex flex-col hover:border-[#c5a059]/25 transition-colors ${idx === 4 ? 'col-span-2 items-center' : ''}`}>
                <span className="text-[15px] font-display font-light text-[#c5a059] leading-tight">{res.metric}</span>
                <span className="text-[8px] font-mono text-white/40 uppercase tracking-wider mt-1 truncate w-full text-center sm:text-left">{res.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 text-left">
            <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">KPI Results</p>
            <h3 className="text-lg font-display text-white mt-1">Impact</h3>
          </div>
        </div>

        {/* Card 8: Testimonial / Collaboration Pitch (Let's work together style - col-span-3) */}
        <div className="lg:col-span-3 md:col-span-2 relative group bg-gradient-to-br from-[#121319] to-[#0c0d12] border border-white/[0.05] rounded-[32px] p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 hover:border-white/10 hover:shadow-2xl text-left">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#c5a059]/5 rounded-full blur-3xl group-hover:bg-[#c5a059]/10 transition-colors duration-500" />
          
          <div className="relative">
            {/* Sparkle/Star Icon */}
            <Sparkles className="w-8 h-8 text-[#c5a059]/40 mb-5 group-hover:text-[#c5a059] transition-colors duration-300 animate-pulse-subtle" />
            
            {project.testimonial ? (
              <div className="space-y-4">
                <p className="text-base md:text-xl font-display font-light text-white leading-relaxed tracking-tight">
                  {project.testimonial.quote}
                </p>
                <div className="pt-1">
                  <p className="text-xs font-mono text-[#c5a059] uppercase tracking-widest">{project.testimonial.author}</p>
                  <p className="text-[10px] font-sans text-white/45 mt-0.5">{project.testimonial.role}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <h2 className="text-2xl md:text-4xl font-display font-light text-white leading-tight">
                  Let's work <span className="text-[#c5a059] font-serif italic">together.</span>
                </h2>
                <p className="text-xs text-white/45 max-w-md mt-1 font-light">
                  Ready to scale your digital metrics? Let's design and engineer your custom platform today.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 z-10">
            <button
              onClick={() => openBooking('GROWTH', '$2,999')}
              className="inline-flex items-center gap-2 py-2.5 px-5 bg-[#c5a059] hover:bg-transparent border border-[#c5a059] text-black hover:text-white text-[10px] font-mono tracking-widest uppercase font-bold transition-all duration-300 rounded-xl cursor-pointer"
            >
              Start Your Project
            </button>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:text-[#c5a059] group-hover:border-[#c5a059]/40 group-hover:bg-[#c5a059]/5 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

      </div>

      {/* Gallery Showcase */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="space-y-5 text-left pt-8 border-t border-white/[0.06]">
          <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] font-bold text-white/30">Project Gallery</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.gallery.map((imgUrl, index) => (
              <div key={index} className="aspect-video relative rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#c5a059]/40 transition-all duration-300 group shadow-lg bg-[#07080c] flex items-center justify-center">
                {/* Ambient Blur Glow Background */}
                <div className="absolute inset-0 filter blur-md opacity-25 scale-105 overflow-hidden pointer-events-none">
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </div>
                
                {/* Full Image Presentation */}
                <img 
                  src={imgUrl} 
                  alt={`${project.title} screenshot ${index + 1}`} 
                  className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-[1.03]" 
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/0 transition-colors duration-300 z-20 pointer-events-none" />
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
      document.title = `${selectedProject.title} Case Study | Pixel Advance Digital`;
      const slug = getSlug(selectedProject.title);
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', `https://www.pixeladvancedigital.com/portfolio/${slug}`);
      }
    } else {
      document.title = 'Portfolio | Web Design & Branding Work | Pixel Advance Digital';
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', 'https://www.pixeladvancedigital.com/portfolio');
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
                      <div className="aspect-[3/2] relative flex items-end p-5 overflow-hidden bg-[#07080c]">
                        {/* Ambient Blur Glow Background */}
                        <div className="absolute inset-0 filter blur-md opacity-20 scale-105 overflow-hidden pointer-events-none">
                          <img src={project.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="absolute inset-0 w-full h-full object-contain z-10 transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent z-20 pointer-events-none" />
                        <div className="absolute inset-0 border-b border-white/[0.06] z-20 pointer-events-none" />
                        
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
