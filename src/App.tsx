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

  // Dynamic page title — updates document.title per route (SEO)
  useEffect(() => {
    const pageTitles: Record<PageName, string> = {
      home:           'Pixel Vance Digital — Premium Web Design & SEO Agency USA',
      about:          'About Us | Pixel Vance Digital — Web Design & Digital Marketing',
      portfolio:      'Portfolio | Web Design & Branding Work | Pixel Vance Digital',
      'case-studies': 'Case Studies | Client Success Stories | Pixel Vance Digital',
      blog:           'Blog | Web Design & Digital Marketing Tips | Pixel Vance Digital',
    };
    document.title = pageTitles[currentPage];
  }, [currentPage]);

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
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    } else {
      // Small delay so menu closes before scroll fires
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
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
    <div className="min-h-screen bg-[#06080e] text-slate-300 font-sans selection:bg-[#c5a059]/30 selection:text-[#f7eedb] relative">

      {/* ── Static premium background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
        {/* Base deep dark */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #080c14 0%, #06080e 40%, #090708 100%)' }} />
        {/* Fine dot grid overlay */}
        <div className="absolute inset-0 opacity-[0.18]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(197,160,89,0.35) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        {/* Vignette edges */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.7) 100%)'
        }} />
        {/* Single static gold glow top-left */}
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[180px]" style={{ background: 'rgba(197,160,89,0.04)' }} />
        {/* Single static glow bottom-right */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[160px]" style={{ background: 'rgba(100,120,180,0.03)' }} />
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
            aria-label="Pixel Vance Digital — Go to homepage"
          >
            {/* PV Logo Mark — inline SVG */}
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 group-hover:scale-105 transition-transform drop-shadow-[0_0_8px_rgba(197,160,89,0.4)]"
              role="img" aria-label="Pixel Vance Digital logo">
              <title>Pixel Vance Digital Logo</title>
              <defs>
                <linearGradient id="pv-nav-bg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#c5a059"/>
                  <stop offset="1" stopColor="#6b4e1e"/>
                </linearGradient>
                <linearGradient id="pv-nav-v" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffffff"/>
                  <stop offset="1" stopColor="rgba(255,255,255,0.85)"/>
                </linearGradient>
              </defs>
              {/* Background rounded square */}
              <rect width="32" height="32" rx="7" fill="url(#pv-nav-bg)"/>
              {/* Subtle inner border */}
              <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="6.25" stroke="white" strokeOpacity="0.15" strokeWidth="0.75"/>
              {/* Pixel dot — top left */}
              <rect x="7" y="7" width="4" height="4" rx="1" fill="white" fillOpacity="0.95"/>
              {/* Pixel dot — top right */}
              <rect x="21" y="7" width="4" height="4" rx="1" fill="white" fillOpacity="0.95"/>
              {/* Bold V shape */}
              <path d="M9 13 L16 24 L23 13" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <span className="text-sm font-display font-semibold tracking-[0.2em] text-white block">PIXEL VANCE</span>
              <span className="text-[8px] font-mono tracking-[0.25em] text-[#c5a059] block">DIGITAL</span>
            </div>
          </button>

          {/* Large Screen Navigation Nodes */}
          <div className="hidden lg:flex items-center gap-7">
            {([
              { label: 'SERVICES', target: 'services-explorer-section', scroll: true },
              { label: 'PROCESS',  target: 'process-section',           scroll: true },
              { label: 'WHY US',    target: 'why-us-section',             scroll: true },
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

        {/* Mobile dropdown — instant close so animation doesn't block taps */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden bg-[#06080e]/98 backdrop-blur-xl border-b border-white/5"
            id="mobile-navigation-dropdown"
          >
            <div className="px-4 py-4 space-y-1">
              {([
                { label: 'Capabilities Portfolio', target: 'services-explorer-section' },
                { label: 'Development Process',    target: 'process-section'           },
                { label: 'Why Pixel Vance',        target: 'why-us-section'             },
                { label: 'Success Testimonials',   target: 'testimonials-section'      },
              ]).map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.target)}
                  id={`mobile-nav-link-${link.label.replace(/\s+/g, '-').toLowerCase()}`}
                  className="w-full text-left py-3.5 px-2 text-xs font-semibold text-white/70 hover:text-[#c5a059] border-b border-white/[0.05] last:border-0 block font-mono tracking-widest cursor-pointer active:text-[#c5a059] transition-colors"
                >
                  ▶ {link.label.toUpperCase()}
                </button>
              ))}

              <button
                onClick={() => { setMobileMenuOpen(false); navigateTo('about'); }}
                id="mobile-nav-link-about"
                className={`w-full text-left py-3.5 px-2 text-xs font-semibold border-b border-white/[0.05] block font-mono tracking-widest cursor-pointer transition-colors ${
                  currentPage === 'about' ? 'text-[#c5a059]' : 'text-white/70 hover:text-[#c5a059]'
                }`}
              >
                ▶ ABOUT US
              </button>

              <div className="pt-3 pb-1">
                <button
                  onClick={() => { setMobileMenuOpen(false); openBooking('GROWTH', '$2,999'); }}
                  id="mobile-nav-book-btn"
                  className="w-full py-3.5 bg-[#c5a059] text-center font-bold font-mono tracking-wider text-xs rounded-lg uppercase text-black shadow-md cursor-pointer active:scale-95 transition-all"
                >
                  ★ Book Strategy Consultation
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="h-20 md:h-28" />

      {/* ── Inner Pages ── */}
      {currentPage === 'about'        && <AboutPage openBooking={openBooking} />}
      {currentPage === 'portfolio'    && <PortfolioPage openBooking={openBooking} />}
      {currentPage === 'case-studies' && <CaseStudiesPage openBooking={openBooking} />}
      {currentPage === 'blog'         && <BlogPage />}

      {/* ── Home Content ── */}
      {currentPage === 'home' && <>

      {/* 3. HERO SECTION — Premium 3D */}
      <section
        className="relative z-10 min-h-screen flex flex-col overflow-hidden"
        id="hero"
      >
        {/* 3D particles — scoped only to hero */}
        <div className="absolute inset-0 pointer-events-none">
          <Particles3D />
        </div>

        {/* Scanline overlay — ultra subtle */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)',
        }} />

        {/* Ambient gold orb — center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(197,160,89,0.04) 0%, transparent 65%)' }} />

        {/* Corner HUD brackets */}
        <div className="absolute top-20 left-6 md:left-10 w-6 h-6 border-t border-l border-[#c5a059]/30 pointer-events-none z-10" />
        <div className="absolute top-20 right-6 md:right-10 w-6 h-6 border-t border-r border-[#c5a059]/30 pointer-events-none z-10" />
        <div className="absolute bottom-16 left-6 md:left-10 w-6 h-6 border-b border-l border-[#c5a059]/30 pointer-events-none z-10" />
        <div className="absolute bottom-16 right-6 md:right-10 w-6 h-6 border-b border-r border-[#c5a059]/30 pointer-events-none z-10" />

        {/* Horizontal depth lines */}
        <div className="absolute top-[22%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none" />
        <div className="absolute bottom-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c5a059]/[0.06] to-transparent pointer-events-none" />

        {/* ── CENTER CONTENT — flex-1 pushes stats to bottom ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-start md:justify-center text-center px-4 max-w-5xl mx-auto w-full gap-6 pt-4 md:pt-0">

          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-[#c5a059]/20 bg-[#c5a059]/[0.05] backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-ping" />
            <span className="text-[9px] font-mono tracking-[0.38em] uppercase text-[#c5a059]/70">
              Premium Digital Agency
            </span>
          </motion.div>

          {/* 3D Perspective Headline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ perspective: '1600px' }}
            className="w-full"
          >
            {/* Line 1 — Single H1 for SEO (one H1 per page rule) */}
            <div style={{ transform: 'rotateX(8deg)', transformOrigin: 'center bottom' }}>
              <h1 className="text-[clamp(4rem,12vw,11rem)] font-display font-light text-white leading-[0.88] tracking-[-0.02em] hero-3d-white">
                We <span className="font-bold">Build</span>
              </h1>
            </div>

            {/* Line 2 — decorative (not H1, preserves visual hierarchy) */}
            <div style={{ transform: 'rotateX(3deg)', transformOrigin: 'center center' }}>
              <p className="text-[clamp(4rem,12vw,11rem)] font-serif italic leading-[0.88] tracking-[-0.01em] text-shimmer-gold hero-3d-text">
                Digital Legacies
              </p>
            </div>

            {/* Line 3 — decorative ghost fade */}
            <div style={{ transform: 'rotateX(-4deg)', transformOrigin: 'center top' }}>
              <p className="text-[clamp(2.5rem,7vw,7rem)] font-display font-extralight text-white/25 leading-[1.1] tracking-wide mt-1">
                That Never Settle.
              </p>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-base md:text-lg text-white/40 max-w-md mx-auto leading-relaxed font-light tracking-wide"
          >
            Premium <span className="text-[#c5a059]/80 font-medium">web design, SEO & AI automation</span> —{' '}
            crafted for <span className="text-white/60 font-medium">ambitious US businesses</span> ready to{' '}
            <span className="text-white/60 font-medium">dominate their market</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <button
              onClick={() => openBooking('GROWTH', '$2,999')}
              id="hero-book-btn"
              className="group relative flex items-center gap-2.5 py-3.5 px-9 bg-[#c5a059] hover:bg-transparent border border-[#c5a059] text-black hover:text-white uppercase text-[10px] font-mono tracking-[0.28em] transition-all duration-300 cursor-pointer shadow-[0_0_48px_rgba(197,160,89,0.22)] hover:shadow-[0_0_64px_rgba(197,160,89,0.14)] active:scale-95 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#f7e6b5]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">Book Strategy Session</span>
            </button>
            <button
              onClick={() => scrollToSection('services-explorer-section')}
              id="hero-demo-btn"
              className="flex items-center gap-2 py-3.5 px-9 border border-white/8 bg-white/[0.015] hover:bg-white/[0.05] hover:border-[#c5a059]/25 uppercase text-[10px] font-mono tracking-[0.28em] transition-all cursor-pointer active:scale-95 text-white/40 hover:text-white/80"
            >
              Explore Services
              <ArrowDownCircle className="w-3 h-3 text-[#c5a059]/60" />
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
            Web Design, SEO & Digital Marketing Services
          </h2>
          <p className="text-xs md:text-sm text-white/50 leading-relaxed">
            Full-spectrum web design, SEO, AI automation & digital marketing services for US businesses. Select a division to explore deliverables.
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
            Our 4-Step Web Design & Development Process
          </h2>
          <p className="text-xs md:text-sm text-white/50 leading-relaxed">
            Simple, transparent, and results-driven from day one. From strategy to launch — walk through our proven milestones.
          </p>
        </div>

        {/* Interactive timeline module */}
        <InteractiveProcess />
      </section>

      <div className="my-16 md:my-24" />

      {/* 7. WHY CHOOSE US + TECH STACK */}
      <section className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto animate-fade-in" id="why-us-section">

        {/* ── WHY CHOOSE US ── */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <span className="text-[10px] font-mono tracking-[0.4em] text-[#c5a059] font-bold uppercase">
            — OUR EDGE —
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white leading-none">
            Why Choose <span style={{ background: 'linear-gradient(135deg,#c5a059,#e8c97a,#c5a059)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Pixel Vance Digital</span>
          </h2>
          <p className="text-sm text-white/40 max-w-xl mx-auto leading-relaxed">
            The top-rated US web design agency that doesn't just build — we craft digital experiences that convert, scale, and dominate search rankings.
          </p>
        </div>

        {/* Why Us — premium numbered cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-28">
          {[
            { num: '01', icon: '⚡', title: 'Blazing Fast Delivery', desc: 'Tight sprints, most projects ship in 2–4 weeks without sacrificing a single pixel of quality.', stat: '2–4 Weeks', statLabel: 'Avg Delivery' },
            { num: '02', icon: '🎯', title: 'Conversion-First Design', desc: 'Every pixel is intentional — engineered to guide users toward action and maximize your ROI.', stat: '3.2×', statLabel: 'Avg ROI' },
            { num: '03', icon: '🔒', title: 'Enterprise Security', desc: 'SSL, firewalls, penetration testing, and best-in-class authentication baked in from day one.', stat: '100%', statLabel: 'Secure Builds' },
            { num: '04', icon: '🌍', title: 'Global Client Base', desc: "We've delivered premium digital solutions to clients across 25+ countries on 5 continents.", stat: '25+', statLabel: 'Countries' },
            { num: '05', icon: '🤝', title: 'Dedicated PM on Every Project', desc: 'A single point of contact who keeps you informed, on time, and on budget at every step.', stat: '1:1', statLabel: 'Dedicated PM' },
            { num: '06', icon: '♾️', title: 'Post-Launch Support', desc: "We don't disappear after launch. Ongoing maintenance, updates, and priority support always.", stat: '24/7', statLabel: 'Availability' },
          ].map((card, i) => (
            <div
              key={i}
              className="group relative rounded-3xl overflow-hidden cursor-default"
              style={{ background: 'linear-gradient(145deg, rgba(197,160,89,0.06) 0%, rgba(255,255,255,0.02) 100%)' }}
            >
              {/* Animated gold border */}
              <div className="absolute inset-0 rounded-3xl border border-white/[0.08] group-hover:border-[#c5a059]/50 transition-colors duration-500" />
              {/* Corner glow */}
              <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" style={{ background: 'rgba(197,160,89,0.2)' }} />

              <div className="relative p-7 flex flex-col gap-5">
                {/* Number + Icon row */}
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-mono text-[#c5a059]/50 font-bold tracking-widest">{card.num}</span>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, rgba(197,160,89,0.15), rgba(197,160,89,0.05))' }}
                  >
                    {card.icon}
                  </div>
                </div>

                {/* Stat */}
                <div>
                  <div className="text-3xl font-display font-black" style={{ background: 'linear-gradient(135deg,#c5a059,#e8c97a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {card.stat}
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/35 mt-0.5">{card.statLabel}</div>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-gradient-to-r from-[#c5a059]/30 to-transparent" />

                {/* Text */}
                <div>
                  <h3 className="text-sm font-display font-bold text-white mb-2 group-hover:text-[#c5a059] transition-colors duration-200">{card.title}</h3>
                  <p className="text-[11px] text-white/45 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── TECH STACK ── */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <span className="text-[10px] font-mono tracking-[0.4em] text-[#c5a059] font-bold uppercase">
            — TOOLS WE MASTER —
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white leading-none">
            Our <span style={{ background: 'linear-gradient(135deg,#c5a059,#e8c97a,#c5a059)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tech Stack</span>
          </h2>
          <p className="text-sm text-white/40 max-w-xl mx-auto leading-relaxed">
            Battle-tested technologies powering fast, scalable, and stunning digital products.
          </p>
        </div>

        {/* Tech grid — category panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              category: 'Frontend', icon: '🖥️', color: '#60a5fa', bg: 'rgba(96,165,250,0.06)',
              techs: [
                { name: 'React', icon: '⚛️', bg: 'rgba(96,165,250,0.12)' },
                { name: 'Next.js', icon: '▲', bg: 'rgba(255,255,255,0.07)' },
                { name: 'TypeScript', icon: '🔷', bg: 'rgba(59,130,246,0.12)' },
                { name: 'Tailwind', icon: '🌊', bg: 'rgba(56,189,248,0.12)' },
                { name: 'Framer', icon: '🎞️', bg: 'rgba(139,92,246,0.12)' },
                { name: 'Webflow', icon: '🌐', bg: 'rgba(75,85,99,0.18)' },
              ]
            },
            {
              category: 'Backend & APIs', icon: '⚙️', color: '#34d399', bg: 'rgba(52,211,153,0.06)',
              techs: [
                { name: 'Node.js', icon: '🟢', bg: 'rgba(52,211,153,0.12)' },
                { name: 'Python', icon: '🐍', bg: 'rgba(234,179,8,0.12)' },
                { name: 'GraphQL', icon: '◈', bg: 'rgba(232,95,161,0.12)' },
                { name: 'REST APIs', icon: '🔌', bg: 'rgba(148,163,184,0.10)' },
                { name: 'Firebase', icon: '🔥', bg: 'rgba(249,115,22,0.12)' },
                { name: 'Supabase', icon: '⚡', bg: 'rgba(52,211,153,0.12)' },
              ]
            },
            {
              category: 'Mobile & E-commerce', icon: '📱', color: '#f59e0b', bg: 'rgba(245,158,11,0.06)',
              techs: [
                { name: 'React Native', icon: '📱', bg: 'rgba(96,165,250,0.12)' },
                { name: 'Flutter', icon: '🐦', bg: 'rgba(56,189,248,0.12)' },
                { name: 'Swift', icon: '🍎', bg: 'rgba(239,68,68,0.12)' },
                { name: 'Shopify', icon: '🛍️', bg: 'rgba(52,211,153,0.12)' },
                { name: 'WooCommerce', icon: '🛒', bg: 'rgba(139,92,246,0.12)' },
                { name: 'Stripe', icon: '💳', bg: 'rgba(99,102,241,0.12)' },
              ]
            },
            {
              category: 'AI & Cloud', icon: '🤖', color: '#f43f5e', bg: 'rgba(244,63,94,0.06)',
              techs: [
                { name: 'OpenAI GPT', icon: '🤖', bg: 'rgba(255,255,255,0.07)' },
                { name: 'LangChain', icon: '⛓️', bg: 'rgba(16,185,129,0.12)' },
                { name: 'AWS', icon: '☁️', bg: 'rgba(249,115,22,0.12)' },
                { name: 'Google Cloud', icon: '🌥️', bg: 'rgba(59,130,246,0.12)' },
                { name: 'Docker', icon: '🐳', bg: 'rgba(56,189,248,0.12)' },
                { name: 'Vercel', icon: '▲', bg: 'rgba(255,255,255,0.07)' },
              ]
            },
          ].map((group) => (
            <div
              key={group.category}
              className="relative rounded-3xl p-6 overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-300"
              style={{ background: `linear-gradient(145deg, ${group.bg}, rgba(255,255,255,0.01))` }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: `linear-gradient(135deg, ${group.color}25, ${group.color}10)`, border: `1px solid ${group.color}30` }}>
                  {group.icon}
                </div>
                <div>
                  <h3 className="text-sm font-display font-bold" style={{ color: group.color }}>{group.category}</h3>
                  <div className="text-[9px] font-mono text-white/30 tracking-widest uppercase">{group.techs.length} Technologies</div>
                </div>
                {/* Decorative line */}
                <div className="flex-1 h-[1px] ml-2" style={{ background: `linear-gradient(to right, ${group.color}40, transparent)` }} />
              </div>

              {/* Tech cards grid */}
              <div className="grid grid-cols-3 gap-2.5">
                {group.techs.map((tech) => (
                  <div
                    key={tech.name}
                    className="group/tech relative flex flex-col items-center gap-2 p-3 rounded-2xl border border-white/[0.06] hover:border-[#c5a059]/40 transition-all duration-200 cursor-default overflow-hidden"
                    style={{ background: tech.bg }}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ background: 'radial-gradient(circle at center, rgba(197,160,89,0.08) 0%, transparent 70%)' }} />
                    <span className="text-xl leading-none relative">{tech.icon}</span>
                    <span className="text-[10px] font-mono font-semibold text-white/60 group-hover/tech:text-[#c5a059] transition-colors tracking-wide text-center leading-tight relative">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>


      <div className="my-16 md:my-24" />

      {/* 8. CLIENT SUCCESS SLIDER (Mirroring screenshot 5) */}
      <section className="relative z-10 px-4 md:px-8 max-w-4xl mx-auto" id="testimonials-section">
        <div className="text-center space-y-4 mb-10">
          <span className="text-[10px] font-mono tracking-widest text-blue-400 font-bold uppercase">
            — CLIENT STORIES —
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-none">
            What Our US Clients Say
          </h2>
          <p className="text-xs md:text-sm text-white/50 leading-relaxed">
            Real results from US businesses who partnered with Pixel Vance Digital for web design, SEO & digital marketing.
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
                  {/* PV Logo Mark — footer (slightly larger) */}
                  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 drop-shadow-[0_0_12px_rgba(197,160,89,0.3)]">
                    <defs>
                      <linearGradient id="pv-footer-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#c5a059"/>
                        <stop offset="1" stopColor="#6b4e1e"/>
                      </linearGradient>
                    </defs>
                    <rect width="36" height="36" rx="8" fill="url(#pv-footer-bg)"/>
                    <rect x="0.75" y="0.75" width="34.5" height="34.5" rx="7.25" stroke="white" strokeOpacity="0.15" strokeWidth="0.75"/>
                    <rect x="8" y="8" width="4.5" height="4.5" rx="1.2" fill="white" fillOpacity="0.95"/>
                    <rect x="23.5" y="8" width="4.5" height="4.5" rx="1.2" fill="white" fillOpacity="0.95"/>
                    <path d="M10 15 L18 27 L26 15" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <span className="text-base font-display font-bold tracking-[0.2em] text-white block">PIXEL VANCE</span>
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
                <p className="text-[9px] font-mono text-white/20">hello@pixelvance.digital</p>
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
                    <a href="mailto:hello@pixelvance.digital" className="text-[11px] text-white/45 hover:text-white transition-colors">hello@pixelvance.digital</a>
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
                © 2026 Pixel Vance Digital. All rights reserved.
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
