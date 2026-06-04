/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, lazy, Suspense, MouseEvent } from 'react';
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
  HelpCircle,
  Facebook,
  Youtube,
  Twitter,
  Share2
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

  // Mouse tilt tracking state for 3D graphic interactivity
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 18, y: -y * 18 });
  };
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

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
                className="text-[10px] font-mono tracking-[0.2em] text-white hover:text-[#c5a059] pb-0.5 border-b border-transparent hover:border-[#c5a059] transition-all cursor-pointer relative py-1"
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
                  : 'text-white hover:text-[#c5a059] border-transparent hover:border-[#c5a059]'
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
              className="flex items-center gap-1 py-1.5 px-3 sm:py-2 sm:px-5 bg-[#c5a059] hover:bg-transparent border border-[#c5a059] text-black hover:text-white text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-300 cursor-pointer active:scale-95 shadow-[0_0_20px_rgba(197,160,89,0.15)]"
            >
              <Calendar className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span className="inline sm:hidden">Start Project</span>
              <span className="hidden sm:inline">Start a Project</span>
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
                  className="w-full text-left py-3.5 px-2 text-xs font-semibold text-white hover:text-[#c5a059] border-b border-white/[0.05] last:border-0 block font-mono tracking-widest cursor-pointer active:text-[#c5a059] transition-colors"
                >
                  ▶ {link.label.toUpperCase()}
                </button>
              ))}

              <button
                onClick={() => { setMobileMenuOpen(false); navigateTo('about'); }}
                id="mobile-nav-link-about"
                className={`w-full text-left py-3.5 px-2 text-xs font-semibold border-b border-white/[0.05] block font-mono tracking-widest cursor-pointer transition-colors ${
                  currentPage === 'about' ? 'text-[#c5a059]' : 'text-white hover:text-[#c5a059]'
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
                  ★ Start a Project
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

        {/* ── CENTRAL SPLIT VIEWPORT CARD ── */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex items-center justify-center min-h-[calc(100vh-140px)]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-[#080711]/60 border border-white/10 rounded-[32px] overflow-hidden shadow-[0_32px_90px_rgba(0,0,0,0.85)] backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 min-h-[600px] lg:min-h-[640px]"
          >
            {/* ── LEFT COLUMN — Dark Glassmorphic & Deep Indigo Gradient ── */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0e0c21]/95 via-[#0a0818]/98 to-[#05040a]/99 p-8 sm:p-10 md:p-12 flex flex-col justify-between text-slate-100 relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
              {/* Spacer where the mock header used to be */}
              <div className="h-6 w-full mb-8" />

              {/* Title Section */}
              <div className="flex flex-col text-left my-auto">
                <h1 className="sr-only">Innovative Web Design - Pixel Vance Digital</h1>
                <div aria-hidden="true" className="space-y-1">
                  <p className="font-display font-light text-[#c5a059] text-lg tracking-[0.2em] uppercase">
                    Premium Agency
                  </p>
                  <p className="font-display font-extrabold uppercase text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[0.95] tracking-[0.02em] text-white">
                    Innovative
                  </p>
                  <p className="font-display font-extrabold uppercase text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[0.95] tracking-[0.02em] text-[#c5a059] pb-2">
                    Web Design
                  </p>
                </div>

                {/* Gold Divider Bar */}
                <div className="w-24 h-[4px] bg-[#c5a059] my-6 rounded-full self-start" />

                {/* Glass Card Description */}
                <div className="bg-white/[0.02] border border-white/5 hover:border-[#c5a059]/20 rounded-2xl p-5 md:p-6 text-left relative overflow-hidden group transition-all duration-300 shadow-xl backdrop-blur-md">
                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#c5a059]/30 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#c5a059]/30 pointer-events-none" />
                  
                  <p className="font-mono text-xs sm:text-[13px] leading-relaxed text-white/90">
                    Innovation in its modern meaning is <span className="text-[#c5a059] font-bold">"a new idea, creative thoughts, new imaginations</span> in form of device or method".
                  </p>
                </div>

                {/* Left CTA: Start a Project */}
                <div className="mt-8 flex justify-start">
                  <button
                    onClick={() => openBooking('GROWTH', '$2,999')}
                    className="group relative flex items-center justify-center gap-2.5 py-3.5 px-9 border-2 border-[#c5a059]/80 text-[#c5a059] hover:text-black hover:bg-[#c5a059] uppercase text-[10px] font-mono tracking-[0.25em] transition-all duration-300 cursor-pointer rounded-full active:scale-95 font-black shadow-md shadow-gold-500/10 hover:shadow-gold-500/25"
                  >
                    Start a Project
                  </button>
                </div>
              </div>

              {/* Bottom Navigation and Indicators */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5 w-full">
                {/* Share Icon */}
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Pixel Vance Digital',
                        text: 'High-fidelity web design & bespoke development.',
                        url: window.location.href,
                      });
                    } else {
                      alert('Link copied to clipboard: ' + window.location.href);
                    }
                  }}
                  className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/10 hover:bg-white/10 text-[#c5a059] flex items-center justify-center shadow-sm hover:shadow transition-all cursor-pointer active:scale-90"
                  title="Share Website"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {/* Arrows */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => scrollToSection('infinite-marquee-section')}
                    className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/10 hover:bg-white/10 text-xs text-white hover:text-[#c5a059] hover:shadow transition-all flex items-center justify-center cursor-pointer active:scale-90"
                    title="Previous Slide"
                  >
                    ◀
                  </button>
                  <button
                    onClick={() => scrollToSection('services-explorer-section')}
                    className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/10 hover:bg-white/10 text-xs text-white hover:text-[#c5a059] hover:shadow transition-all flex items-center justify-center cursor-pointer active:scale-90"
                    title="Next Slide"
                  >
                    ▶
                  </button>
                </div>

                {/* Slide Number */}
                <span className="text-3xl font-serif italic text-[#c5a059]/35 select-none font-bold">01</span>
              </div>
            </div>

            {/* ── RIGHT COLUMN — Deep Rich Violet-to-Navy Gradient with Isometric 3D Laptop ── */}
            <div className="lg:col-span-7 bg-gradient-to-br from-[#1e133d] via-[#0b081c] to-[#06040a] p-8 sm:p-10 md:p-12 flex flex-col justify-between relative overflow-hidden text-white min-h-[420px] lg:min-h-0">
              {/* Floating Glow Background Elements for depth */}
              <div className="absolute -top-[10%] left-[-5%] w-[45%] h-[45%] rounded-full bg-[#c5a059]/10 blur-[120px] pointer-events-none" />
              <div className="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-[#7c3aed]/15 blur-[130px] pointer-events-none" />

              {/* Spacer where the mock header used to be */}
              <div className="h-6 w-full mb-6" />

              {/* 3D Isometric Laptop Showcase Scene */}
              <div className="relative w-full h-[260px] sm:h-[300px] md:h-[330px] lg:h-[350px] flex items-center justify-center overflow-visible my-auto z-10">
                {/* Responsive Scale Wrapper */}
                <div 
                  className="relative w-[340px] h-[340px] flex items-center justify-center origin-center transition-all duration-300 hero-graphic-container"
                  style={{
                    transform: `perspective(1000px) rotateX(${tilt.y * 0.4}deg) rotateY(${tilt.x * 0.4}deg) scale(var(--hero-scale))`,
                    transformStyle: 'preserve-3d',
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  
                  {/* BACKGROUND PLANT LEAVES SILHOUETTES */}
                  <motion.div
                    animate={{ y: [0, -4, 0], rotate: [0, 1.5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute z-0 pointer-events-none origin-bottom text-[#c5a059]/10"
                    style={{ transform: "translate3d(-10px, -70px, -20px)" }}
                  >
                    <svg width="220" height="220" viewBox="0 0 200 200" fill="currentColor">
                      {/* Left Leaf branch */}
                      <path d="M100 180 C 70 140, 20 120, 25 80 C 27 60, 45 70, 55 90 C 40 50, 60 40, 75 75 C 65 30, 85 20, 95 60 C 97 15, 110 30, 105 80 C 112 30, 125 15, 127 60 C 137 20, 157 30, 147 75 C 162 40, 182 50, 167 90 C 177 70, 195 60, 197 80 C 202 120, 152 140, 122 180 Z" />
                      {/* Right Leaf branch */}
                      <path d="M100 180 C 110 140, 140 120, 135 80 C 133 60, 120 70, 110 90 C 120 50, 105 40, 95 75 C 105 30, 85 20, 80 60 C 78 15, 68 30, 72 80 C 65 30, 55 15, 53 60 C 45 20, 30 30, 38 75 C 25 40, 10 50, 20 90 C 12 70, 2 60, 0 80 C -5 120, 35 140, 65 180 Z" opacity="0.6" transform="scale(-1, 1) translate(-200, 0)" />
                    </svg>
                  </motion.div>

                  {/* ISOMETRIC DECORATIVE GLOW ORB */}
                  <div
                    className="absolute pointer-events-none rounded-full blur-2xl opacity-40 z-1"
                    style={{
                      width: '240px',
                      height: '240px',
                      background: 'radial-gradient(circle, #c5a059 0%, #7c3aed 100%)',
                      transform: 'translate3d(0, 0, -40px) rotateX(60deg) rotateZ(-45deg)',
                    }}
                  />

                  {/* ── ISOMETRIC LAPTOP 3D ── */}
                  <div 
                    className="relative flex items-center justify-center"
                    style={{
                      transform: 'rotateX(60deg) rotateZ(-45deg)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    
                    {/* LAPTOP KEYBOARD BASE */}
                    <div 
                      className="w-[200px] h-[140px] bg-gradient-to-br from-[#1d1b2e] to-[#0f0a1c] rounded-xl shadow-2xl relative border border-white/5"
                      style={{
                        transformStyle: 'preserve-3d',
                        borderBottom: '6px solid #0b0714',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                      }}
                    >
                      {/* Keyboard Key Lines Mockup */}
                      <div className="absolute inset-x-3 top-4 bottom-8 flex flex-col gap-1.5 opacity-80">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="flex gap-1">
                            {[...Array(8)].map((_, j) => (
                              <div 
                                key={j} 
                                className="h-1.5 bg-gradient-to-r from-[#c5a059] to-[#8c6e3d] rounded-sm flex-1 opacity-70"
                                style={{
                                  boxShadow: '0 0 4px rgba(197,160,89,0.3)',
                                }}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                      
                      {/* Touchpad Mock */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-[#0a0712] rounded border border-white/5 opacity-55" />
                    </div>

                    {/* LAPTOP SCREEN (Tilted vertical rising back) */}
                    <div 
                      className="absolute w-[190px] h-[130px] bg-gradient-to-b from-[#1b152d] to-[#07050e] border-2 border-[#c5a059]/40 rounded-lg p-2 overflow-hidden"
                      style={{
                        transform: 'translate3d(-5px, -65px, 0px) rotateX(-80deg)',
                        transformOrigin: 'bottom center',
                        boxShadow: '0 0 30px rgba(197,160,89,0.15)',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Glowing Wireframe Graphics */}
                      <div className="w-full h-full bg-[#0a0712]/95 rounded-md p-1.5 flex flex-col justify-between border border-white/5">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
                          </div>
                          <span className="text-[6px] font-mono text-white/30">NEXCORE WIREFRAME</span>
                        </div>
                        <div className="flex-1 grid grid-cols-3 gap-1.5 mt-2">
                          <div className="col-span-2 border border-white/5 rounded p-1 bg-white/[0.01] flex flex-col justify-between">
                            <div className="w-full h-2 bg-[#c5a059]/20 rounded" />
                            <div className="w-[70%] h-1 bg-white/20 rounded mt-1" />
                            <div className="w-[90%] h-1 bg-white/20 rounded mt-0.5" />
                            <div className="grid grid-cols-2 gap-1 mt-1.5">
                              <div className="h-5 bg-[#c5a059]/10 border border-[#c5a059]/20 rounded" />
                              <div className="h-5 bg-white/5 rounded" />
                            </div>
                          </div>
                          <div className="border border-white/5 rounded p-1 bg-white/[0.01] flex flex-col gap-1 justify-center items-center">
                            <div className="w-6 h-6 rounded-full border border-[#c5a059]/20 flex items-center justify-center text-[7px] text-[#c5a059] font-mono font-bold">75%</div>
                            <div className="w-6 h-1 bg-white/20 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* ── FLOATING PANEL A: CODE SCREEN (Front Right) ── */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                    className="absolute z-10 w-[120px] h-[90px] bg-gradient-to-br from-[#1a0c2e]/98 to-[#0c051a]/99 border border-white/10 rounded-xl p-2.5 shadow-2xl flex flex-col justify-between"
                    style={{
                      transform: 'translate3d(65px, 20px, 60px)',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.5), 0 0 20px rgba(197,160,89,0.1)',
                    }}
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-1">
                      <span className="text-[6px] font-mono text-purple-300 font-bold">App.tsx</span>
                      <div className="w-3.5 h-3.5 rounded bg-[#c5a059]/10 flex items-center justify-center text-[8px] text-[#c5a059] font-bold">&lt;/&gt;</div>
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5 mt-2 font-mono text-[5px] text-white/55 leading-none">
                      <p><span className="text-[#c5a059]">const</span> Agency = () =&gt; &#123;</p>
                      <p className="pl-2"><span className="text-purple-300">return</span> (</p>
                      <p className="pl-4 text-green-300">&lt;<span className="text-[#c5a059]">InnovativeDesign</span> /&gt;</p>
                      <p className="pl-2">);</p>
                      <p>&#125;;</p>
                    </div>
                  </motion.div>

                  {/* ── FLOATING PANEL B: METRICS CHART (Front Left) ── */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="absolute z-10 w-[110px] h-[85px] bg-[#ffffff] rounded-xl p-2.5 shadow-2xl flex flex-col justify-between"
                    style={{
                      transform: 'translate3d(-85px, 35px, 50px)',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.35)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[7px] font-mono text-slate-400 font-semibold">CONVERSIONS</span>
                      <span className="text-[8px] font-mono text-[#c5a059] font-bold">+28%</span>
                    </div>
                    {/* Tiny Bar graph */}
                    <div className="flex items-end justify-between h-9 mt-1.5 border-b border-slate-100 pb-0.5">
                      <div className="w-2.5 h-[40%] bg-purple-200 rounded-sm" />
                      <div className="w-2.5 h-[65%] bg-purple-300 rounded-sm" />
                      <div className="w-2.5 h-[50%] bg-[#ebd9f1] rounded-sm" />
                      <div className="w-2.5 h-[80%] bg-gradient-to-t from-[#c5a059] to-[#7c3aed] rounded-sm" />
                      <div className="w-2.5 h-[95%] bg-[#c5a059]/80 rounded-sm" />
                    </div>
                    <div className="w-12 h-1.5 bg-slate-100 rounded-full mt-1.5 self-start" />
                  </motion.div>

                  {/* ── FLOATING SMILEY EMOJI (Left side middle) ── */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    className="absolute z-20 w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 border border-white/10 flex items-center justify-center shadow-lg text-sm"
                    style={{ transform: 'translate3d(-95px, -35px, 90px)' }}
                  >
                    😊
                  </motion.div>

                  {/* ── FLOATING KISS EMOJI (Right side middle) ── */}
                  <motion.div
                    animate={{ y: [0, -9, 0] }}
                    transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                    className="absolute z-20 w-9 h-9 rounded-full bg-gradient-to-br from-[#ebd9f1] to-purple-400 border border-white/10 flex items-center justify-center shadow-lg text-sm"
                    style={{ transform: 'translate3d(90px, -50px, 95px)' }}
                  >
                    😘
                  </motion.div>

                  {/* ── FLOATING CLOUD A (Back Left) ── */}
                  <motion.div
                    animate={{ y: [0, -5, 0], x: [0, 4, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute z-1 w-14 h-8 opacity-40"
                    style={{ transform: 'translate3d(-105px, -110px, 120px)' }}
                  >
                    <svg viewBox="0 0 100 60" fill="white" className="drop-shadow-md">
                      <path d="M 20 40 a 20 20 0 0 1 20 -20 a 25 25 0 0 1 45 5 a 15 15 0 0 1 10 15 a 15 15 0 0 1 -15 15 L 20 55 a 15 15 0 0 1 -0 -15 z" />
                    </svg>
                  </motion.div>

                  {/* ── FLOATING CLOUD B (Back Right) ── */}
                  <motion.div
                    animate={{ y: [0, -6, 0], x: [0, -3, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute z-1 w-12 h-7 opacity-35"
                    style={{ transform: 'translate3d(95px, -100px, 110px)' }}
                  >
                    <svg viewBox="0 0 100 60" fill="white" className="drop-shadow-md">
                      <path d="M 20 40 a 20 20 0 0 1 20 -20 a 25 25 0 0 1 45 5 a 15 15 0 0 1 10 15 a 15 15 0 0 1 -15 15 L 20 55 a 15 15 0 0 1 -0 -15 z" />
                    </svg>
                  </motion.div>

                  {/* ── FLOATING STAR BUBBLE (Center High) ── */}
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute z-20 w-8 h-8 rounded-full bg-gradient-to-br from-[#c5a059] to-[#8c6e3d] flex items-center justify-center shadow-lg text-[10px] text-white font-bold"
                    style={{
                      transform: 'translate3d(35px, -15px, 130px)',
                      boxShadow: '0 0 15px rgba(197,160,89,0.3)',
                    }}
                  >
                    ⭐
                  </motion.div>

                </div>
              </div>

              {/* Bottom Buttons and Dot Indicators */}
              <div className="flex flex-col items-center gap-4 z-10 w-full mt-6">
                <div className="flex flex-wrap items-center gap-4 w-full justify-center lg:justify-start">
                  <button
                    onClick={() => openBooking('STRATEGY', 'Free')}
                    className="py-3.5 px-7 sm:px-8 bg-[#c5a059] hover:bg-[#ebd095] text-black font-mono font-black uppercase text-[10px] tracking-widest transition-all duration-300 rounded-full active:scale-95 shadow-md shadow-gold-500/10 cursor-pointer"
                  >
                    Book Strategy Session
                  </button>
                  <button
                    onClick={() => scrollToSection('services-explorer-section')}
                    className="py-3.5 px-7 sm:px-8 border-2 border-[#c5a059]/60 hover:border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059]/5 font-mono font-bold uppercase text-[10px] tracking-widest transition-all duration-300 rounded-full active:scale-95 cursor-pointer"
                  >
                    Explore Services
                  </button>
                </div>

                {/* Dot Indicators */}
                <div className="flex items-center gap-2 justify-center lg:justify-start w-full">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059] shadow-glow-blue" />
                  <span className="w-2 h-2 rounded-full border border-white/40" />
                  <span className="w-2 h-2 rounded-full border border-white/40" />
                  <span className="w-2 h-2 rounded-full border border-white/40" />
                </div>
              </div>

              {/* Social Sidebar Icons (Desktop Only) */}
              <div className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 flex-col gap-5 z-20 bg-white/[0.02] border border-white/5 rounded-full p-2 backdrop-blur-sm">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full border border-[#c5a059]/30 hover:border-[#c5a059] text-white flex items-center justify-center transition-all hover:scale-115"
                >
                  <Facebook className="w-3.5 h-3.5 text-[#c5a059]" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full border border-[#c5a059]/30 hover:border-[#c5a059] text-white flex items-center justify-center transition-all hover:scale-115"
                >
                  <Youtube className="w-3.5 h-3.5 text-[#c5a059]" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full border border-[#c5a059]/30 hover:border-[#c5a059] text-white flex items-center justify-center transition-all hover:scale-115"
                >
                  <Twitter className="w-3.5 h-3.5 text-[#c5a059]" />
                </a>
              </div>

            </div>

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
