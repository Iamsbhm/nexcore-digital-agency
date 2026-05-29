/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  ArrowRight, 
  Calendar, 
  MessageSquare, 
  Menu, 
  X, 
  Layers, 
  Sliders, 
  Activity, 
  PhoneCall, 
  ArrowDownCircle, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

// Subcomponents
import Particles3D from './components/Particles3D';
import AutomationSandbox from './components/AutomationSandbox';
import SpatialConsole from './components/SpatialConsole';
import ConversionGauge from './components/ConversionGauge';
import ServiceSelector from './components/ServiceSelector';
import InteractiveProcess from './components/InteractiveProcess';
import PricingCalculator from './components/PricingCalculator';
import TestimonialsSlider from './components/TestimonialsSlider';
import BookingModal from './components/BookingModal';

// Pages
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import BlogPage from './pages/BlogPage';

type PageName = 'home' | 'about' | 'portfolio' | 'case-studies' | 'blog';

export default function App() {
  // Navigation
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Page routing
  const [currentPage, setCurrentPage] = useState<PageName>('home');

  // Booking Modal State
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('GROWTH');
  const [calculatedPrice, setCalculatedPrice] = useState<string>('$2,999');

  // Interactive sandbox tabs
  const [activeSandboxTab, setActiveSandboxTab] = useState<'automation' | 'spatial' | 'conversion'>('spatial');

  // Live clock tracking for premium feel
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Scroll event observer
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Dynamic clock updater
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Keep a stable ref to openBooking so the event listener never goes stale
  const openBookingRef = useRef<(plan: string, price: string) => void>(() => {});

  // Listen for booking requests bubbled up from ServiceModal
  useEffect(() => {
    const handler = (e: Event) => {
      const { plan, price } = (e as CustomEvent).detail;
      // Small delay so service modal close animation finishes first
      setTimeout(() => openBookingRef.current(plan, price), 80);
    };
    window.addEventListener('nexcore:openBooking', handler);
    return () => window.removeEventListener('nexcore:openBooking', handler);
  }, []);

  const openBooking = (planName: string, price: string = 'Custom') => {
    setSelectedPlan(planName);
    setCalculatedPrice(price);
    setBookingOpen(true);
  };

  // Keep ref always pointing to latest openBooking
  openBookingRef.current = openBooking;

  // Smooth scroll helper — navigates home first if on an inner page
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      // Switch to home, then scroll after render settles
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 350);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Page navigation helper
  const navigateTo = (page: PageName) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper lists
  const statsList = [
    { value: '500+', label: 'Projects Completed' },
    { value: '200+', label: 'Happy USA Clients' },
    { value: '98%', label: 'Client Retention' },
    { value: '7+', label: 'Years Experience' }
  ];

  const marqueeItems = [
    'Logo Design', 'Web Development', 'Mobile Apps', 'SEO Optimization', 
    'E-commerce', 'UI/UX Design', 'Brand Identity', 'AI Automation', 
    'CRO', 'Speed Optimization', 'AWS Cloud Scaling', 'TypeScript Security'
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-300 font-sans selection:bg-[#c5a059]/30 selection:text-[#f7eedb] relative">

      {/* ── Background decoration (fixed, pointer-events-none, non-scrolling) ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Particles3D />
        {/* Grid line layout patterns */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.25]" />
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.5]" />
        {/* Giant radial gold atmosphere glows */}
        <div className="absolute top-[-10%] left-[-20%] w-[90%] h-[80%] bg-[#c5a059]/5 rounded-full blur-[160px]" />
        <div className="absolute top-[40%] right-[-10%] w-[70%] h-[70%] bg-[#8c6e3d]/4 rounded-full blur-[140px]" />
        <div className="absolute bottom-[2%] left-[-15%] w-[80%] h-[50%] bg-[#c5a059]/3 rounded-full blur-[160px]" />
      </div>

      {/* 2. PERSISTENT NAVIGATION BAR */}
      <nav 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 py-3' 
            : 'bg-transparent py-5'
        }`}
        id="main-navigation"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Brand Signature */}
          <button 
            onClick={() => currentPage === 'home' ? scrollToSection('hero') : navigateTo('home')} 
            className="flex items-center gap-3 group text-left cursor-pointer transition-all"
            id="brand-logo-btn"
          >
            <div className="w-7 h-7 bg-gradient-to-tr from-[#c5a059] to-[#8c6e3d] rounded-sm rotate-45 flex items-center justify-center shadow-md shadow-[#c5a059]/10 group-hover:scale-105 transition-transform">
              <span className="-rotate-45 block font-serif font-light italic text-white text-[11px]">n</span>
            </div>
            <div>
              <span className="text-sm font-display font-semibold tracking-[0.2em] text-white block">NEXCORE</span>
              <span className="text-[8px] font-mono tracking-[0.25em] text-[#c5a059] block">DIGITAL STUDIO</span>
            </div>
          </button>

          {/* Large Screen Navigation Nodes */}
          <div className="hidden lg:flex items-center gap-7">
            {([
              { label: 'SERVICES', target: 'services-explorer-section', scroll: true },
              { label: 'PROCESS',  target: 'process-section',           scroll: true },
              { label: 'PRICING',  target: 'pricing-section',           scroll: true },
              { label: 'REVIEWS',  target: 'testimonials-section',      scroll: true },
            ]).map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.target)}
                id={`nav-link-${link.label.toLowerCase()}`}
                className="text-[10px] font-mono tracking-[0.2em] text-slate-400 hover:text-[#c5a059] pb-0.5 border-b border-transparent hover:border-[#c5a059] transition-all cursor-pointer relative py-1"
              >
                {link.label}
              </button>
            ))}
            {/* About Us — page navigation */}
            <button
              onClick={() => navigateTo('about')}
              id="nav-link-about"
              className={`text-[10px] font-mono tracking-[0.2em] pb-0.5 border-b transition-all cursor-pointer relative py-1 ${
                currentPage === 'about'
                  ? 'text-[#c5a059] border-[#c5a059]'
                  : 'text-slate-400 hover:text-[#c5a059] border-transparent hover:border-[#c5a059]'
              }`}
            >
              ABOUT US
            </button>
          </div>

          {/* Right Header Status, Clock & Actions */}
          <div className="flex items-center gap-4">

            {/* Quick Action Button */}
            <button
              onClick={() => openBooking('GROWTH', '$2,999')}
              id="nav-quick-consult-btn"
              className="hidden sm:flex items-center gap-1.5 py-2 px-5 border border-slate-700 text-[9px] font-mono uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" /> Book Call
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="lg:hidden p-1.5 text-white/70 hover:text-white hover:bg-white/5 rounded transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown draw */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#06080e]/95 backdrop-blur-lg border-b border-white/5 overflow-hidden"
              id="mobile-navigation-dropdown"
            >
              <div className="px-4 py-6 space-y-4">
                {([
                  { label: 'Capabilities Portfolio', target: 'services-explorer-section', scroll: true },
                  { label: 'Development Process',    target: 'process-section',           scroll: true },
                  { label: 'Transparent Packages',   target: 'pricing-section',           scroll: true },
                  { label: 'Success Testimonials',   target: 'testimonials-section',      scroll: true },
                ]).map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.target)}
                    id={`mobile-nav-link-${link.label.replace(/\s+/g, '-').toLowerCase()}`}
                    className="w-full text-left py-2 text-xs font-semibold text-white/70 hover:text-white border-b border-white/5 hover:border-white/10 block font-mono"
                  >
                    ▶ {link.label.toUpperCase()}
                  </button>
                ))}

                {/* About Us */}
                <button
                  onClick={() => navigateTo('about')}
                  id="mobile-nav-link-about"
                  className={`w-full text-left py-2 text-xs font-semibold border-b border-white/5 block font-mono ${
                    currentPage === 'about' ? 'text-[#c5a059]' : 'text-white/70 hover:text-[#c5a059]'
                  }`}
                >
                  ▶ ABOUT US
                </button>

                <div className="pt-2">
                  <button
                    onClick={() => { setMobileMenuOpen(false); openBooking('GROWTH', '$2,999'); }}
                    id="mobile-nav-book-btn"
                    className="w-full py-3 bg-[#c5a059] text-center font-bold font-mono tracking-wider text-xs rounded-lg uppercase text-black shadow-md cursor-pointer hover:shadow-[0_0_20px_rgba(197,160,89,0.3)] transition-all"
                  >
                    ★ Book Strategy Consultation
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="pt-20 md:pt-28" />

      {/* ── Inner Pages ── */}
      {currentPage === 'about'        && <AboutPage openBooking={openBooking} />}
      {currentPage === 'portfolio'    && <PortfolioPage openBooking={openBooking} />}
      {currentPage === 'case-studies' && <CaseStudiesPage openBooking={openBooking} />}
      {currentPage === 'blog'         && <BlogPage />}

      {/* ── Home Content ── */}
      {currentPage === 'home' && <>

      {/* 3. HERO SECTION — Premium 3D */}
      <section className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden" id="hero">

        {/* ── Ambient drifting orbs ── */}
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#c5a059]/[0.06] blur-[100px] orb-drift pointer-events-none" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#8c6e3d]/[0.05] blur-[120px] orb-drift pointer-events-none" style={{ animationDelay: '4s' }} />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full bg-white/[0.015] blur-[80px] orb-drift pointer-events-none" style={{ animationDelay: '8s' }} />

        {/* ── Horizontal rule lines for depth ── */}
        <div className="absolute top-[18%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />
        <div className="absolute bottom-[18%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c5a059]/[0.08] to-transparent pointer-events-none" />

        <div className="relative z-10 text-center max-w-6xl mx-auto w-full space-y-12 pb-12 pt-2">


          {/* ── 3D Perspective Headline ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
            style={{ perspective: '1200px' }}
            className="space-y-2"
          >
            {/* Line 1 */}
            <div
              style={{ transform: 'rotateX(6deg)', transformOrigin: 'center bottom' }}
              className="overflow-hidden"
            >
              <h1 className="text-[clamp(3.5rem,10vw,9rem)] font-display font-light text-white leading-[0.95] tracking-tight hero-3d-white">
                We <span className="font-semibold">Build</span>
              </h1>
            </div>

            {/* Line 2 – gold shimmer italic */}
            <div
              style={{ transform: 'rotateX(3deg)', transformOrigin: 'center bottom' }}
            >
              <h1 className="text-[clamp(3.5rem,10vw,9rem)] font-serif italic leading-[0.95] tracking-tight text-shimmer-gold hero-3d-text">
                Digital Legacies
              </h1>
            </div>

            {/* Gold rule */}
            <div className="flex items-center justify-center gap-4 py-3">
              <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#c5a059]/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#c5a059]/50" />
            </div>

            {/* Line 3 */}
            <div
              style={{ transform: 'rotateX(-3deg)', transformOrigin: 'center top' }}
            >
              <h1 className="text-[clamp(2.5rem,7vw,7rem)] font-display font-light text-white/70 leading-[1] tracking-tight">
                That <span className="font-serif italic text-white/40">Settle</span>{' '}
                <span className="font-serif italic text-white/60">Perfected.</span>
              </h1>
            </div>
          </motion.div>

          {/* ── Sub-copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="space-y-3"
          >
            <p className="text-lg md:text-xl text-white/60 font-display font-light tracking-wide">
              Not just an agency. A <span className="text-[#c5a059] font-medium">growth engine</span> for ambitious brands.
            </p>
            <p className="text-sm text-white/30 max-w-lg mx-auto leading-relaxed font-light">
              We design, engineer, and launch digital products that outperform — across branding, web, mobile, and AI.
            </p>
          </motion.div>

          {/* ── Stats row ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            id="hero-stats-board"
          >
            {statsList.map((stat, sIdx) => (
              <div
                key={sIdx}
                className="relative p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm text-center group hover:border-[#c5a059]/40 hover:bg-[#c5a059]/[0.04] transition-all duration-300 overflow-hidden"
              >
                {/* Inner glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#c5a059]/0 to-[#c5a059]/0 group-hover:from-[#c5a059]/[0.03] group-hover:to-transparent transition-all duration-300 rounded-2xl" />
                <div className="absolute top-1.5 right-2.5 text-white/10 text-[9px] font-mono">0{sIdx + 1}</div>
                <span className="text-3xl md:text-4xl font-display font-black text-white block tracking-tight group-hover:text-[#c5a059] transition-colors duration-300">
                  {stat.value}
                </span>
                <span className="text-[9px] text-white/30 block mt-1.5 uppercase font-mono tracking-widest leading-none">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* ── CTAs ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => openBooking('GROWTH', '$2,999')}
              id="hero-book-btn"
              className="group relative flex items-center justify-center gap-2.5 py-4 px-9 bg-[#c5a059] hover:bg-transparent border border-[#c5a059] text-black hover:text-white uppercase text-[10px] font-mono tracking-[0.25em] transition-all duration-300 cursor-pointer shadow-[0_0_40px_rgba(197,160,89,0.25)] hover:shadow-[0_0_60px_rgba(197,160,89,0.15)] active:scale-95 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#f7e6b5]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">Book Strategy Session</span>
            </button>

            <button
              onClick={() => scrollToSection('services-explorer-section')}
              id="hero-demo-btn"
              className="flex items-center justify-center gap-2 py-4 px-9 border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 uppercase text-[10px] font-mono tracking-[0.25em] transition-all cursor-pointer active:scale-95 text-white/50 hover:text-white"
            >
              <span>View Services</span>
              <ArrowDownCircle className="w-3.5 h-3.5 text-[#c5a059] animate-bounce" />
            </button>
          </motion.div>
        </div>
      </section>


      {/* Marquee continuous text scroll footer banner */}
      <div 
        className="w-full bg-white/[0.015] border-y border-white/5 py-4 overflow-hidden mt-12 relative z-10"
        id="infinite-marquee-section"
      >
        {/* Soft fading left & right filters client-side */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030407] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030407] to-transparent z-10 pointer-events-none" />

        <div className="flex w-[200%] overflow-hidden">
          <div className="flex gap-16 item-center shrink-0 animate-slide">
            {/* Run twice for unified looping track */}
            {marqueeItems.concat(marqueeItems).map((itm, mIdx) => (
              <span 
                key={mIdx} 
                className="text-xs font-mono text-white/45 hover:text-white transition-colors tracking-widest uppercase flex items-center gap-3.5 shrink-0"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full inline-block" />
                {itm}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="my-16 md:my-24" />



      {/* 5. SERVICES AND DIVISION EXPERTISES (Mirroring screenshots 2 & 3) */}
      <section className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto" id="services-explorer-section">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-[10px] font-mono tracking-widest text-[#10b981] font-black uppercase">
            — WHAT WE DO —
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-none">
            Our High-Demand Services
          </h2>
          <p className="text-xs md:text-sm text-white/50 leading-relaxed">
            Full-spectrum digital services crafted for the competitive USA market. Select different divisions to search specific deliverables.
          </p>
        </div>

        {/* Interactive Services catalog list selector */}
        <ServiceSelector />
      </section>

      <div className="my-16 md:my-24" />

      {/* 6. CHRONOLOGICAL PROCESS GANTT (Mirroring screenshot 4) */}
      <section className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto" id="process-section">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-[10px] font-mono tracking-widest text-indigo-400 font-semibold uppercase">
            — HOW WE WORK —
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-none">
            Our 4-Step Process
          </h2>
          <p className="text-xs md:text-sm text-white/50 leading-relaxed">
            Simple, transparent, and results-driven from day one. Walk through our milestones below.
          </p>
        </div>

        {/* Interactive timeline module */}
        <InteractiveProcess />
      </section>

      <div className="my-16 md:my-24" />

      {/* 7. TRANSPARENT PACKAGES & SCOPE CALCULATOR */}
      <section className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto animate-fade-in" id="pricing-section">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-[10px] font-mono tracking-widest text-pink-400 font-black uppercase">
            — TRANSPARENT PRICING —
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-none">
            Simple Packages
          </h2>
          <p className="text-xs md:text-sm text-white/50 leading-relaxed">
            No hidden fees. Choose the plan that fits your business, or configure scopes custom-wise.
          </p>
        </div>

        {/* Combined Pricing card blocks & Custom estimator sliders */}
        <PricingCalculator onBookCall={openBooking} />
      </section>

      <div className="my-16 md:my-24" />

      {/* 8. CLIENT SUCCESS SLIDER (Mirroring screenshot 5) */}
      <section className="relative z-10 px-4 md:px-8 max-w-4xl mx-auto" id="testimonials-section">
        <div className="text-center space-y-4 mb-10">
          <span className="text-[10px] font-mono tracking-widest text-blue-400 font-bold uppercase">
            — CLIENT STORIES —
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-none">
            What Our Clients Say
          </h2>
          <p className="text-xs md:text-sm text-white/50 leading-relaxed">
            Read direct verifications from partners scaling corporate operations across the world.
          </p>
        </div>

        {/* Testimonials Slider */}
        <TestimonialsSlider />
      </section>

      <div className="my-16 md:my-24" />

      {/* 9. BOTTOM CONVERSION PORTAL */}
      <section className="relative z-10 px-4 md:px-8 max-w-5xl mx-auto pb-16">
        <div className="bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border border-white/[0.08] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden product-shadow">
          
          {/* Radial light behind call tracker */}
          <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4.5xl font-light tracking-tight text-white font-display">
              Ready to Build a <span className="font-serif italic text-[#c5a059]">Digital Legacy?</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-sans">
              Book a bespoke 30-minute high-fidelity strategy session. No commitment — just absolute architectural clarity on your digital scaling roadmap.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-xl mx-auto">
              <button
                onClick={() => openBooking('GROWTH', '$2,999')}
                id="booking-cta-bottom"
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-7 border border-[#c5a059] bg-[#c5a059] hover:bg-transparent text-black hover:text-white uppercase text-[10px] font-mono tracking-[0.2em] transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
              >
                <span>Book Strategy Session</span>
              </button>

              <button
                onClick={() => openBooking('ENTERPRISE', 'Custom')}
                id="booking-whatsapp-cta"
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-7 border border-slate-800 bg-white/[0.02] hover:bg-[#c5a059]/10 uppercase text-[10px] font-mono tracking-[0.2em] transition-all cursor-pointer active:scale-95 text-slate-300"
              >
                <span>CONTACT US // WHATSAPP →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      </> /* end home */}

      {/* 10. PREMIUM CORPORATE FOOTER */}
      <footer className="relative z-10 overflow-hidden">
        {/* Gold gradient top border */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c5a059]/60 to-transparent" />

        <div className="bg-[#060608] relative">
          {/* Background ambient glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[300px] bg-[#c5a059]/[0.03] rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10 relative z-10">

            {/* Top: brand + CTA */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14">
              {/* Logo + tagline + socials */}
              <div className="space-y-5 max-w-md">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-tr from-[#c5a059] to-[#8c6e3d] rounded-md rotate-45 flex items-center justify-center shadow-lg shadow-[#c5a059]/20">
                    <span className="-rotate-45 block font-serif font-light italic text-white text-[13px]">n</span>
                  </div>
                  <div>
                    <span className="text-base font-display font-bold tracking-[0.2em] text-white block">NEXCORE</span>
                    <span className="text-[8px] font-mono tracking-[0.3em] text-[#c5a059]/70 block">DIGITAL AGENCY</span>
                  </div>
                </div>
                <p className="text-sm text-white/35 leading-relaxed font-light">
                  We craft high-fidelity digital experiences for ambitious brands — from bespoke UI design to AI-powered growth systems.
                </p>
                {/* Social pills */}
                <div className="flex items-center gap-2.5">
                  {[{ label: 'X' }, { label: 'in' }, { label: 'Be' }, { label: 'Dr' }].map((s) => (
                    <button
                      key={s.label}
                      id={`footer-social-${s.label.toLowerCase()}`}
                      className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-[10px] font-bold font-mono text-white/35 hover:text-[#c5a059] hover:border-[#c5a059]/40 hover:bg-[#c5a059]/5 transition-all duration-200 cursor-pointer"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right CTA */}
              <div className="flex flex-col items-start md:items-end gap-3">
                <p className="text-[9px] font-mono tracking-widest text-white/25 uppercase">Ready to start a project?</p>
                <button
                  onClick={() => openBooking('GROWTH', '$2,999')}
                  id="footer-cta-btn"
                  className="flex items-center gap-2.5 py-3 px-7 border border-[#c5a059]/50 text-[#c5a059] hover:bg-[#c5a059] hover:text-black text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
                >
                  Book a Strategy Call →
                </button>
                <p className="text-[9px] font-mono text-white/20">hello@nexcore.agency</p>
              </div>
            </div>

            {/* Thin divider */}
            <div className="h-px w-full bg-white/[0.06] mb-12" />

            {/* 3-column links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">

              {/* Services */}
              <div className="space-y-5">
                <h5 className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#c5a059]">Services</h5>
                <ul className="space-y-3">
                  {['Logo & Brand Design', 'Web Development', 'Mobile App Design', 'SEO & Growth Marketing', 'AI System Automation'].map((lnk) => (
                    <li key={lnk}>
                      <button
                        onClick={() => scrollToSection('services-explorer-section')}
                        id={`footer-service-${lnk.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-[11px] text-white/35 hover:text-white transition-colors duration-200 text-left group flex items-center gap-2"
                      >
                        <span className="w-0 group-hover:w-2.5 h-px bg-[#c5a059] transition-all duration-300 inline-block shrink-0" />
                        {lnk}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-5">
                <h5 className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#c5a059]">Company</h5>
                <ul className="space-y-3">
                  {([
                    { label: 'About Us',           page: 'about'        as PageName },
                    { label: 'Design Portfolio',    page: 'portfolio'    as PageName },
                    { label: 'Client Case Studies', page: 'case-studies' as PageName },
                    { label: 'Engineering Blog',    page: 'blog'         as PageName },
                  ]).map(({ label, page }) => (
                    <li key={label}>
                      <button
                        onClick={() => navigateTo(page)}
                        id={`footer-company-${label.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-[11px] text-white/35 hover:text-white transition-colors duration-200 text-left group flex items-center gap-2"
                      >
                        <span className="w-0 group-hover:w-2.5 h-px bg-[#c5a059] transition-all duration-300 inline-block shrink-0" />
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="space-y-5 col-span-2 md:col-span-1">
                <h5 className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#c5a059]">Contact</h5>
                <ul className="space-y-4">
                  <li>
                    <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1">Email</p>
                    <a href="mailto:hello@nexcore.agency" className="text-[11px] text-white/45 hover:text-white transition-colors">hello@nexcore.agency</a>
                  </li>
                  <li>
                    <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1">Phone</p>
                    <a href="tel:+15551234567" className="text-[11px] text-white/45 hover:text-white transition-colors">+1 (555) 123-4567</a>
                  </li>
                  <li>
                    <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1">Hours</p>
                    <p className="text-[11px] text-white/45">Mon – Fri &nbsp;·&nbsp; 9am – 6pm EST</p>
                  </li>
                  <li className="flex items-center gap-2 pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400/70">WhatsApp Available</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-14 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[9px] font-mono text-white/20 tracking-wider">
                © 2026 NexCore Digital Agency LLC. All rights reserved.
              </span>
              <div className="flex items-center gap-6">
                <span className="text-[9px] font-mono text-white/20 hover:text-white/50 cursor-pointer transition-colors">Privacy Policy</span>
                <span className="text-white/10">·</span>
                <span className="text-[9px] font-mono text-white/20 hover:text-white/50 cursor-pointer transition-colors">Terms of Service</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* 11. GLOBAL BOOKING SCHEDULER MODAL */}
      <BookingModal 
        isOpen={bookingOpen} 
        onClose={() => setBookingOpen(false)} 
        selectedPlan={selectedPlan}
        calculatedPrice={calculatedPrice}
      />
    </div>
  );
}
