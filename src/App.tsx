/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
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

// Critical above-fold components — loaded eagerly for best LCP
import Particles3D from './components/Particles3D';
import Spheres3D from './components/Spheres3D';

// Lazy-loaded below-fold components (splits JS bundle, improves LCP & TTI)
const AutomationSandbox  = lazy(() => import('./components/AutomationSandbox'));
const SpatialConsole     = lazy(() => import('./components/SpatialConsole'));
const ConversionGauge    = lazy(() => import('./components/ConversionGauge'));
const ServiceSelector    = lazy(() => import('./components/ServiceSelector'));
const InteractiveProcess = lazy(() => import('./components/InteractiveProcess'));
const PricingCalculator  = lazy(() => import('./components/PricingCalculator'));
const TestimonialsSlider = lazy(() => import('./components/TestimonialsSlider'));
const BookingModal       = lazy(() => import('./components/BookingModal'));

// Lazy-loaded inner pages (not needed on first paint)
const AboutPage       = lazy(() => import('./pages/AboutPage'));
const PortfolioPage   = lazy(() => import('./pages/PortfolioPage'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const BlogPage        = lazy(() => import('./pages/BlogPage'));

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

      {/* Skip to main content — accessibility & screen reader */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-[#c5a059] focus:text-black focus:font-bold focus:rounded"
      >
        Skip to main content
      </a>

      {/* ── Static premium background — deep navy-purple gradient matching 3D sphere style ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
        {/* Base deep dark navy */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #080c1a 0%, #06080e 40%, #0c0618 100%)' }} />
        {/* Subtle dot grid overlay */}
        <div className="absolute inset-0 opacity-[0.10]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.50) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />
        {/* Vignette edges */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.75) 100%)'
        }} />
        {/* Blue-purple ambient glow top-right */}
        <div className="absolute -top-[15%] right-[-5%] w-[55%] h-[55%] rounded-full blur-[200px]" style={{ background: 'rgba(76,29,149,0.25)' }} />
        {/* Blue ambient glow left */}
        <div className="absolute top-[20%] -left-[10%] w-[45%] h-[45%] rounded-full blur-[180px]" style={{ background: 'rgba(29,78,216,0.12)' }} />
        {/* Bottom purple bleed */}
        <div className="absolute bottom-[-5%] right-[20%] w-[50%] h-[40%] rounded-full blur-[160px]" style={{ background: 'rgba(88,28,135,0.18)' }} />
      </div>

      {/* 2. PERSISTENT NAVIGATION BAR */}
      <nav 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 py-3' 
            : 'bg-transparent py-5'
        }`}
        id="main-navigation"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Brand Signature */}
          <button 
            onClick={() => currentPage === 'home' ? scrollToSection('hero') : navigateTo('home')} 
            className="flex items-center gap-3 group text-left cursor-pointer transition-all"
            id="brand-logo-btn"
            aria-label="Pixel Vance Digital — Go to homepage"
          >
            {/* Pixel Art Logo Icon — matches brand reference image */}
            <svg viewBox="0 0 28 32" width="28" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"
              className="group-hover:scale-105 transition-transform drop-shadow-[0_0_12px_rgba(124,58,237,0.6)] flex-shrink-0"
              role="img" aria-label="Pixel Vance Digital logo">
              <title>Pixel Vance Digital Logo</title>
              <defs>
                <linearGradient id="pv-pixel-grad" x1="0" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#3b82f6"/>
                  <stop offset="100%" stopColor="#7c3aed"/>
                </linearGradient>
              </defs>
              {/* Row 0: top accent pixels */}
              <rect x="8" y="0" width="4" height="4" fill="url(#pv-pixel-grad)"/>
              <rect x="12" y="0" width="4" height="4" fill="url(#pv-pixel-grad)"/>
              {/* Row 1: upper head */}
              <rect x="4" y="4" width="20" height="4" fill="url(#pv-pixel-grad)"/>
              {/* Row 2: full width */}
              <rect x="0" y="8" width="28" height="4" fill="url(#pv-pixel-grad)"/>
              {/* Row 3: eyes row — white squares = eyes */}
              <rect x="0" y="12" width="4" height="4" fill="url(#pv-pixel-grad)"/>
              <rect x="4" y="12" width="4" height="4" fill="white"/>
              <rect x="8" y="12" width="8" height="4" fill="url(#pv-pixel-grad)"/>
              <rect x="16" y="12" width="4" height="4" fill="url(#pv-pixel-grad)"/>
              <rect x="20" y="12" width="4" height="4" fill="white"/>
              <rect x="24" y="12" width="4" height="4" fill="url(#pv-pixel-grad)"/>
              {/* Row 4: full */}
              <rect x="0" y="16" width="28" height="4" fill="url(#pv-pixel-grad)"/>
              {/* Row 5: lower body split */}
              <rect x="4" y="20" width="8" height="4" fill="url(#pv-pixel-grad)"/>
              <rect x="16" y="20" width="8" height="4" fill="url(#pv-pixel-grad)"/>
              {/* Row 6: legs */}
              <rect x="8" y="24" width="4" height="4" fill="url(#pv-pixel-grad)"/>
              <rect x="16" y="24" width="4" height="4" fill="url(#pv-pixel-grad)"/>
              {/* Row 7: right foot */}
              <rect x="16" y="28" width="4" height="4" fill="url(#pv-pixel-grad)"/>
            </svg>
            <div>
              <span
                className="text-sm font-display font-bold tracking-[0.06em] block leading-tight"
                style={{ background: 'linear-gradient(90deg, #3b82f6, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >Pixel Vance</span>
              <span className="text-[9px] font-display font-bold tracking-[0.18em] text-white block mt-0.5">Digital</span>
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

      <div className="h-[72px]" />

      {/* Main content landmark for accessibility & skip-nav */}
      <main id="main-content">

      {/* —— Inner Pages —— lazy loaded, shown only when navigated to */}
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <span className="w-8 h-8 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        {currentPage === 'about'        && <AboutPage openBooking={openBooking} />}
        {currentPage === 'portfolio'    && <PortfolioPage openBooking={openBooking} />}
        {currentPage === 'case-studies' && <CaseStudiesPage openBooking={openBooking} />}
        {currentPage === 'blog'         && <BlogPage />}
      </Suspense>

      {/* ── Home Content ── */}
      {currentPage === 'home' && <>

      {/* 3. HERO SECTION — Premium 3D Split Layout */}
      <section
        className="relative z-10 overflow-hidden"
        style={{ minHeight: 'calc(100vh - 72px)' }}
        id="hero"
      >
        {/* 3D Floating Spheres — background */}
        <div className="absolute inset-0 pointer-events-none opacity-30 lg:opacity-100 transition-opacity duration-700">
          <Spheres3D />
        </div>

        {/* Particles subtle secondary layer */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <Particles3D />
        </div>

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.02) 3px, rgba(0,0,0,0.02) 4px)',
        }} />

        {/* Corner HUD brackets */}
        <div className="absolute top-6 md:top-8 left-6 md:left-10 w-6 h-6 border-t border-l border-[#c5a059]/30 pointer-events-none z-10" />
        <div className="absolute top-6 md:top-8 right-6 md:right-10 w-6 h-6 border-t border-r border-[#c5a059]/30 pointer-events-none z-10" />
        <div className="absolute bottom-16 left-6 md:left-10 w-6 h-6 border-b border-l border-[#c5a059]/30 pointer-events-none z-10" />
        <div className="absolute bottom-16 right-6 md:right-10 w-6 h-6 border-b border-r border-[#c5a059]/30 pointer-events-none z-10" />

        {/* ── TWO-COLUMN HERO CONTENT ── */}
        <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:pl-40 lg:pr-16" style={{ paddingTop: '20px', minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'flex-start' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">

            {/* ── LEFT COLUMN — Text Content ── */}
            <div className="flex flex-col gap-5 lg:gap-7 text-center lg:text-left items-center lg:items-start pt-4 lg:pt-0">

              {/* Status pill */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-[#c5a059]/20 bg-[#c5a059]/[0.05] backdrop-blur-sm w-fit"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-ping" />
                <span className="text-[9px] font-mono tracking-[0.38em] uppercase text-[#c5a059]/70">
                  Premium Digital Agency
                </span>
              </motion.div>

              {/* Headline — left-aligned, 3D perspective */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                style={{ perspective: '1400px' }}
              >
                <div style={{ transform: 'rotateX(6deg)', transformOrigin: 'left bottom' }}>
                  <h1 className="text-[clamp(2.6rem,10vw,6.5rem)] font-display font-light text-white leading-[0.9] tracking-[-0.02em]">
                    We <span className="font-bold">Build</span>
                  </h1>
                </div>
                <div style={{ transform: 'rotateX(2deg)', transformOrigin: 'left center' }}>
                  <p className="text-[clamp(2.6rem,10vw,6.5rem)] font-serif italic leading-[0.9] tracking-[-0.01em] text-shimmer-gold">
                    Digital Legacies
                  </p>
                </div>
                <div style={{ transform: 'rotateX(-3deg)', transformOrigin: 'left top' }}>
                  <p className="text-[clamp(1.2rem,5vw,3.2rem)] font-display font-extralight text-white/85 lg:text-white/55 leading-[1.2] tracking-wide mt-1">
                    That Never Settle.
                  </p>
                </div>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="text-sm md:text-base lg:text-lg text-white/90 lg:text-white/55 max-w-md leading-relaxed font-light tracking-wide mx-auto lg:mx-0 bg-black/40 backdrop-blur-md border border-white/5 px-5 py-4 rounded-xl lg:bg-transparent lg:backdrop-blur-none lg:border-0 lg:p-0 shadow-lg lg:shadow-none"
              >
                High-fidelity <span className="text-[#c5a059] font-semibold">web design, bespoke development</span>, and{' '}
                <span className="text-white font-medium">conversion systems</span> —{' '}
                built for <span className="text-white font-medium">brands that demand perfection</span>.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 w-full lg:w-auto"
              >
                <button
                  onClick={() => openBooking('GROWTH', '$2,999')}
                  id="hero-book-btn"
                  className="group relative flex items-center justify-center gap-2.5 py-3.5 px-8 bg-[#c5a059] hover:bg-transparent border border-[#c5a059] text-black hover:text-white uppercase text-[10px] font-mono tracking-[0.28em] transition-all duration-300 cursor-pointer shadow-[0_0_48px_rgba(197,160,89,0.22)] hover:shadow-[0_0_64px_rgba(197,160,89,0.14)] active:scale-95 overflow-hidden w-full sm:w-auto"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#f7e6b5]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative">Book Strategy Session</span>
                </button>
                <button
                  onClick={() => scrollToSection('services-explorer-section')}
                  id="hero-demo-btn"
                  className="flex items-center justify-center gap-2 py-3.5 px-8 border border-white/8 bg-white/[0.015] hover:bg-white/[0.05] hover:border-[#c5a059]/25 uppercase text-[10px] font-mono tracking-[0.28em] transition-all cursor-pointer active:scale-95 text-white/40 hover:text-white/80 w-full sm:w-auto"
                >
                  Explore Services
                  <ArrowDownCircle className="w-3 h-3 text-[#c5a059]/60" />
                </button>
              </motion.div>

            </div>


            {/* ── RIGHT COLUMN — 3D Web Design Objects ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="hidden lg:flex items-center justify-center relative h-[520px]"
              aria-hidden
            >

              {/* ── 3D BROWSER WINDOW — main focal object ── */}
              <div
                className="absolute"
                style={{
                  width: 360,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-58%, -52%) perspective(900px) rotateY(-12deg) rotateX(4deg)',
                  transformOrigin: 'center center',
                  animation: 'hero-float-a 7s ease-in-out infinite',
                  zIndex: 4,
                }}
              >
                {/* Browser chrome bar */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(30,27,60,0.95) 0%, rgba(15,12,35,0.98) 100%)',
                  borderRadius: '12px 12px 0 0',
                  padding: '10px 14px',
                  border: '1px solid rgba(124,58,237,0.35)',
                  borderBottom: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  backdropFilter: 'blur(20px)',
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', opacity: 0.8 }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', opacity: 0.8 }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', opacity: 0.8 }} />
                  <div style={{ flex: 1, height: 18, borderRadius: 4, background: 'rgba(255,255,255,0.05)', marginLeft: 8, display: 'flex', alignItems: 'center', padding: '0 8px' }}>
                    <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>pixelvancedigital.com</span>
                  </div>
                </div>
                {/* Browser body */}
                <div style={{
                  background: 'linear-gradient(160deg, rgba(15,10,40,0.97) 0%, rgba(8,6,20,0.99) 100%)',
                  borderRadius: '0 0 12px 12px',
                  border: '1px solid rgba(124,58,237,0.35)',
                  borderTop: 'none',
                  overflow: 'hidden',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(124,58,237,0.12)',
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}>
                  {/* Hero mockup inside browser */}
                  <div style={{ height: 8, width: 140, borderRadius: 4, background: 'linear-gradient(90deg,#3b82f6,#7c3aed)', marginBottom: 4 }} />
                  <div style={{ height: 5, width: 200, borderRadius: 3, background: 'rgba(255,255,255,0.08)' }} />
                  <div style={{ height: 5, width: 170, borderRadius: 3, background: 'rgba(255,255,255,0.05)' }} />
                  <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    <div style={{ height: 26, width: 90, borderRadius: 4, background: 'linear-gradient(90deg,#c5a059,#f7e6b5)', opacity: 0.9 }} />
                    <div style={{ height: 26, width: 76, borderRadius: 4, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent' }} />
                  </div>
                  {/* Website mockup grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 8 }}>
                    {[...Array(6)].map((_, i) => (
                      <div key={i} style={{
                        height: 50,
                        borderRadius: 6,
                        background: i === 0
                          ? 'linear-gradient(135deg,rgba(59,130,246,0.25),rgba(124,58,237,0.25))'
                          : 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(124,58,237,0.15)',
                      }} />
                    ))}
                  </div>
                  {/* Glow bar */}
                  <div style={{ height: 1, width: '100%', background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.5), rgba(59,130,246,0.5), transparent)', marginTop: 6 }} />
                </div>
              </div>

              {/* ── FLOATING CODE EDITOR CARD — top right ── */}
              <div
                style={{
                  position: 'absolute',
                  width: 210,
                  right: '2%',
                  top: '6%',
                  background: 'linear-gradient(135deg, rgba(10,8,28,0.95) 0%, rgba(20,15,50,0.97) 100%)',
                  border: '1px solid rgba(59,130,246,0.25)',
                  borderRadius: 10,
                  padding: '10px 14px',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.6), 0 0 30px rgba(59,130,246,0.08)',
                  zIndex: 5,
                  animation: 'hero-float-b 9s ease-in-out 1s infinite',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6' }} />
                  <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>index.tsx</span>
                </div>
                {[
                  { color: '#7c3aed', w: 60, text: 'function' },
                  { color: '#3b82f6', w: 90, text: 'HeroSection' },
                  { color: 'rgba(255,255,255,0.15)', w: 50, text: '() {' },
                ].map((l, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                    <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.12)', fontFamily: 'monospace', width: 12 }}>{i + 1}</span>
                    <div style={{ height: 6, borderRadius: 3, background: l.color, width: l.w, opacity: 0.8 }} />
                  </div>
                ))}
                {[45, 80, 60, 35, 70].map((w, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.08)', fontFamily: 'monospace', width: 12 }}>{i + 4}</span>
                    <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.07)', width: w, marginLeft: i < 3 ? 10 : 0 }} />
                  </div>
                ))}
              </div>

              {/* ── METRIC CARD — SEO Score ── */}
              <div
                style={{
                  position: 'absolute',
                  width: 150,
                  right: '4%',
                  bottom: '22%',
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(6,8,14,0.96) 100%)',
                  border: '1px solid rgba(16,185,129,0.25)',
                  borderRadius: 10,
                  padding: '12px 14px',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.6), 0 0 24px rgba(16,185,129,0.08)',
                  zIndex: 5,
                  animation: 'hero-float-c 8s ease-in-out 2s infinite',
                }}
              >
                <span style={{ fontSize: 7, color: 'rgba(16,185,129,0.7)', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.2em' }}>SEO Score</span>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginTop: 4 }}>100</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
                  <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: 2, background: 'linear-gradient(90deg,#10b981,#34d399)' }} />
                  </div>
                  <span style={{ fontSize: 7, color: 'rgba(16,185,129,0.7)', fontFamily: 'monospace' }}>✓</span>
                </div>
              </div>

              {/* ── METRIC CARD — Performance ── */}
              <div
                style={{
                  position: 'absolute',
                  width: 150,
                  left: '0%',
                  bottom: '14%',
                  background: 'linear-gradient(135deg, rgba(197,160,89,0.08) 0%, rgba(6,8,14,0.96) 100%)',
                  border: '1px solid rgba(197,160,89,0.22)',
                  borderRadius: 10,
                  padding: '12px 14px',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.6), 0 0 24px rgba(197,160,89,0.06)',
                  zIndex: 5,
                  animation: 'hero-float-a 10s ease-in-out 0.5s infinite',
                }}
              >
                <span style={{ fontSize: 7, color: 'rgba(197,160,89,0.7)', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Performance</span>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginTop: 4 }}>98<span style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>%</span></div>
                <div style={{ display: 'flex', gap: 3, marginTop: 6 }}>
                  {[85, 100, 90, 98, 95, 100, 88].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: 18, borderRadius: 2, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'flex-end' }}>
                      <div style={{ width: '100%', height: `${h}%`, borderRadius: 2, background: `rgba(197,160,89,${0.3 + i * 0.1})` }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* ── FLOATING TAG — "UI/UX Design" ── */}
              <div
                style={{
                  position: 'absolute',
                  left: '2%',
                  top: '8%',
                  background: 'rgba(124,58,237,0.12)',
                  border: '1px solid rgba(124,58,237,0.30)',
                  borderRadius: 20,
                  padding: '6px 14px',
                  backdropFilter: 'blur(12px)',
                  zIndex: 6,
                  animation: 'hero-float-b 11s ease-in-out 1.5s infinite',
                }}
              >
                <span style={{ fontSize: 9, color: 'rgba(167,139,250,0.85)', fontFamily: 'monospace', letterSpacing: '0.12em' }}>✦ UI / UX Design</span>
              </div>

              {/* ── FLOATING TAG — "AI Automation" ── */}
              <div
                style={{
                  position: 'absolute',
                  right: '6%',
                  bottom: '5%',
                  background: 'rgba(59,130,246,0.10)',
                  border: '1px solid rgba(59,130,246,0.28)',
                  borderRadius: 20,
                  padding: '6px 14px',
                  backdropFilter: 'blur(12px)',
                  zIndex: 6,
                  animation: 'hero-float-c 12s ease-in-out 3s infinite',
                }}
              >
                <span style={{ fontSize: 9, color: 'rgba(96,165,250,0.85)', fontFamily: 'monospace', letterSpacing: '0.12em' }}>⚡ AI Automation</span>
              </div>

              {/* Keyframes */}
              <style>{`
                @keyframes hero-float-a {
                  0%,100% { transform: translate(-58%,-52%) perspective(900px) rotateY(-12deg) rotateX(4deg) translateY(0px); }
                  50%     { transform: translate(-58%,-52%) perspective(900px) rotateY(-12deg) rotateX(4deg) translateY(-18px); }
                }
                @keyframes hero-float-b {
                  0%,100% { transform: translateY(0px); }
                  50%     { transform: translateY(-12px); }
                }
                @keyframes hero-float-c {
                  0%,100% { transform: translateY(0px); }
                  50%     { transform: translateY(-8px); }
                }
              `}</style>
            </motion.div>
          </div>
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
                  {/* Pixel Art Logo — footer version (slightly larger) */}
                  <svg viewBox="0 0 28 32" width="36" height="41" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-[0_0_14px_rgba(124,58,237,0.5)] flex-shrink-0">
                    <defs>
                      <linearGradient id="pv-footer-pixel-grad" x1="0" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#3b82f6"/>
                        <stop offset="100%" stopColor="#7c3aed"/>
                      </linearGradient>
                    </defs>
                    <rect x="8" y="0" width="4" height="4" fill="url(#pv-footer-pixel-grad)"/>
                    <rect x="12" y="0" width="4" height="4" fill="url(#pv-footer-pixel-grad)"/>
                    <rect x="4" y="4" width="20" height="4" fill="url(#pv-footer-pixel-grad)"/>
                    <rect x="0" y="8" width="28" height="4" fill="url(#pv-footer-pixel-grad)"/>
                    <rect x="0" y="12" width="4" height="4" fill="url(#pv-footer-pixel-grad)"/>
                    <rect x="4" y="12" width="4" height="4" fill="white"/>
                    <rect x="8" y="12" width="8" height="4" fill="url(#pv-footer-pixel-grad)"/>
                    <rect x="16" y="12" width="4" height="4" fill="url(#pv-footer-pixel-grad)"/>
                    <rect x="20" y="12" width="4" height="4" fill="white"/>
                    <rect x="24" y="12" width="4" height="4" fill="url(#pv-footer-pixel-grad)"/>
                    <rect x="0" y="16" width="28" height="4" fill="url(#pv-footer-pixel-grad)"/>
                    <rect x="4" y="20" width="8" height="4" fill="url(#pv-footer-pixel-grad)"/>
                    <rect x="16" y="20" width="8" height="4" fill="url(#pv-footer-pixel-grad)"/>
                    <rect x="8" y="24" width="4" height="4" fill="url(#pv-footer-pixel-grad)"/>
                    <rect x="16" y="24" width="4" height="4" fill="url(#pv-footer-pixel-grad)"/>
                    <rect x="16" y="28" width="4" height="4" fill="url(#pv-footer-pixel-grad)"/>
                  </svg>
                  <div>
                    <span
                      className="text-base font-display font-bold tracking-[0.06em] block leading-tight"
                      style={{ background: 'linear-gradient(90deg, #3b82f6, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >Pixel Vance</span>
                    <span className="text-[9px] font-display font-bold tracking-[0.2em] text-white/70 block mt-0.5">DIGITAL AGENCY</span>
                  </div>
                </div>
                <p className="text-sm text-white/35 leading-relaxed font-light">
                  We craft high-fidelity digital experiences for ambitious brands — from bespoke UI design to AI-powered growth systems.
                </p>
                {/* Social links */}
                <div className="flex items-center gap-2.5">
                  {[
                    { label: 'in', href: 'https://www.linkedin.com/company/pixel-vance-digital/', title: 'LinkedIn' },
                    { label: 'Dr', href: '#', title: 'Dribbble' }
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href !== '#' ? '_blank' : undefined}
                      rel={s.href !== '#' ? 'noopener noreferrer' : undefined}
                      id={`footer-social-${s.label.toLowerCase()}`}
                      title={s.title}
                      className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-[10px] font-bold font-mono text-white/35 hover:text-[#c5a059] hover:border-[#c5a059]/40 hover:bg-[#c5a059]/5 transition-all duration-200"
                    >
                      {s.label}
                    </a>
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
                <p className="text-[9px] font-mono text-white/20">info@pixelvancedigital.com</p>
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
                    <a href="mailto:info@pixelvancedigital.com" className="text-[11px] text-white/45 hover:text-white transition-colors">info@pixelvancedigital.com</a>
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

      {/* 11. GLOBAL BOOKING SCHEDULER MODAL — lazy loaded, only fetched on first open */}
      <Suspense fallback={null}>
        <BookingModal 
          isOpen={bookingOpen} 
          onClose={() => setBookingOpen(false)} 
          selectedPlan={selectedPlan}
          calculatedPrice={calculatedPrice}
        />
      </Suspense>
      </main>
    </div>
  );
}
