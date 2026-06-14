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
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Share2
} from 'lucide-react';

import { PageName } from './types';
import { Analytics } from '@vercel/analytics/react';

// Lazy-loaded components (splits JS bundle, improves LCP & TTI)
const Particles3D        = lazy(() => import('./components/Particles3D'));
const HeroGrid           = lazy(() => import('./components/HeroGrid'));
const AutomationSandbox  = lazy(() => import('./components/AutomationSandbox'));
const SpatialConsole     = lazy(() => import('./components/SpatialConsole'));
const ConversionGauge    = lazy(() => import('./components/ConversionGauge'));
const ServiceSelector    = lazy(() => import('./components/ServiceSelector'));
const InteractiveProcess = lazy(() => import('./components/InteractiveProcess'));
const PricingCalculator  = lazy(() => import('./components/PricingCalculator'));
const TestimonialsSlider = lazy(() => import('./components/TestimonialsSlider'));
const BookingModal       = lazy(() => import('./components/BookingModal'));
const FeaturedPortfolio  = lazy(() => import('./components/FeaturedPortfolio'));
const WhyChooseUs        = lazy(() => import('./components/WhyChooseUs'));
const ConversionPortal   = lazy(() => import('./components/ConversionPortal'));
const Footer             = lazy(() => import('./components/Footer'));

// Lazy-loaded inner pages (not needed on first paint)
const AboutPage       = lazy(() => import('./pages/AboutPage'));
const PortfolioPage   = lazy(() => import('./pages/PortfolioPage'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const BlogPage        = lazy(() => import('./pages/BlogPage'));

const getSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const getPageFromPath = (): PageName => {
  const path = window.location.pathname;
  if (path === '/about') return 'about';
  if (path === '/portfolio' || path.startsWith('/portfolio/')) return 'portfolio';
  if (path === '/case-studies') return 'case-studies';
  if (path === '/blog' || path.startsWith('/blog/')) return 'blog';
  if (path === '/website-development') return 'web-development';
  if (path === '/web-design') return 'web-design';
  if (path === '/wordpress') return 'wordpress';
  if (path === '/ui-ux') return 'ui-ux';
  if (path === '/contact') return 'contact';
  return 'home';
};

export default function App() {
  // Navigation
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Page routing
  const [currentPage, setCurrentPage] = useState<PageName>(getPageFromPath());

  const isHomepageGroup = currentPage === 'home' || currentPage === 'web-development' || currentPage === 'web-design' || currentPage === 'wordpress' || currentPage === 'ui-ux' || currentPage === 'contact';

  const [isMobile, setIsMobile] = useState<boolean>(() => 
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentPage(getPageFromPath());
    };
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

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
  const [activeHeroSlide, setActiveHeroSlide] = useState<number>(0);
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 18, y: -y * 18 });
  };
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Card hover events removed — encapsulated inside HeroGrid component

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

  // Dynamic page title, meta description & canonical tag — updates per route (SEO)
  useEffect(() => {
    const pageTitles: Record<PageName, string> = {
      home:              'Website Development Company USA | PixelVance Digital',
      about:             'About Us – Website Development Experts for US Businesses | PixelVance',
      portfolio:         'Portfolio | Web Design & Branding Work | Pixel Vance Digital',
      'case-studies':    'Case Studies | Client Success Stories | Pixel Vance Digital',
      blog:              'Blog | Web Design & Digital Marketing Tips | Pixel Vance Digital',
      'web-development': 'Custom Website Development Services USA | PixelVance Digital',
      'web-design':      'Web Design Agency for Small Businesses USA | PixelVance',
      wordpress:         'WordPress Development Company USA | PixelVance',
      'ui-ux':           'UI UX Design Agency USA | PixelVance Digital',
      contact:           'Contact PixelVance Digital – Serving Clients Across the USA',
    };
    document.title = pageTitles[currentPage] || 'PixelVance Digital';

    // Update meta description dynamically
    const metaDescriptions: Record<PageName, string> = {
      home:              'Struggling with an outdated website? PixelVance Digital builds modern, high-converting websites for US businesses. Get a free website consultation today!',
      about:             'Learn more about PixelVance Digital, a leading website development company in the USA. We are experts in custom web design, WordPress, and UI/UX services.',
      portfolio:         'Check out our portfolio of high-converting web design, custom website development, and branding work for businesses across the USA.',
      'case-studies':    'Explore our website development and design case studies showing real conversion and organic search growth for clients across the USA.',
      blog:              'Read the latest guides on web development, WordPress customization, Core Web Vitals optimization, and UI/UX design from PixelVance Digital.',
      'web-development': 'Custom website development services for US businesses. Fast, responsive, SEO-friendly websites designed to generate more leads and sales. Request a free quote.',
      'web-design':      'Professional web design services for small businesses across the USA. Modern designs, mobile optimization, and conversion-focused websites. Get started today!',
      wordpress:         'Need a powerful WordPress website? PixelVance Digital develops secure, scalable WordPress websites for US businesses. Free consultation available.',
      'ui-ux':           'Improve user experience and increase conversions with expert UI/UX design services. Trusted by businesses looking to create better digital experiences.',
      contact:           'Ready to grow your business online? Contact PixelVance Digital for a free website strategy call. Serving clients across all 50 US states.',
    };

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', metaDescriptions[currentPage] || 'Premium website design, custom WordPress development, and UI/UX services in the USA.');

    // Update canonical tag dynamically
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    const path = window.location.pathname;
    canonicalLink.setAttribute('href', `https://www.pixelvancedigital.com${path}`);
  }, [currentPage]);

  // Handle landing page route side-effects (scrolling or opening modals)
  useEffect(() => {
    if (currentPage === 'contact') {
      setTimeout(() => {
        setBookingOpen(true);
        setSelectedPlan('FREE AUDIT');
        setCalculatedPrice('Free');
      }, 100);
    } else if (currentPage === 'web-design') {
      setTimeout(() => {
        const el = document.getElementById('services-explorer-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    } else if (currentPage === 'web-development') {
      setTimeout(() => {
        const el = document.getElementById('services-explorer-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    } else if (currentPage === 'wordpress') {
      setTimeout(() => {
        const el = document.getElementById('process-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    } else if (currentPage === 'ui-ux') {
      setTimeout(() => {
        const el = document.getElementById('why-us-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }
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
    window.addEventListener('pixelvance:openBooking', handler);
    return () => window.removeEventListener('pixelvance:openBooking', handler);
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
    if (!isHomepageGroup) {
      navigateTo('/');
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

  // Hero carousel slides configurations
  const heroSlides = [
    {
      tag: "WEB DEVELOPMENT",
      titleLine1: "Custom Website Development &",
      titleLine2: "Web Design Services for US Businesses",
      titleGrad: "from-[#34d399] to-[#059669]",
      dotColor: "#10b981",
      badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      description: <>PixelVance Digital builds <span className="text-[#10b981] font-semibold">modern, high-converting websites</span> designed to generate more leads and sales for your business.</>,
      ctaText: "Get Free Consultation",
      activeBadgeText: "Web Dev & Design",
      activeBadgeColor: "bg-[#10b981] text-white",
      onCtaClick: () => openBooking('GROWTH', '$2,999')
    },
    {
      tag: "WORDPRESS DEVELOPMENT",
      titleLine1: "WordPress Development",
      titleLine2: "for Modern Businesses",
      titleGrad: "from-[#818cf8] to-[#6366f1]",
      dotColor: "#6366f1",
      badgeClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      description: <>Secure, scalable, and custom-coded <span className="text-[#818cf8] font-semibold">WordPress themes and systems</span> built to load in milliseconds.</>,
      ctaText: "Request WordPress Quote",
      activeBadgeText: "WordPress Company",
      activeBadgeColor: "bg-[#6366f1] text-white",
      onCtaClick: () => openBooking('GROWTH', '$2,999')
    },
    {
      tag: "UI UX DESIGN",
      titleLine1: "UI/UX Design Focused on",
      titleLine2: "User Experience",
      titleGrad: "from-[#7c3aed] to-[#3b82f6]",
      dotColor: "#7c3aed",
      badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      description: <>Improve conversion rates and <span className="text-[#c5a059] font-semibold">user interaction dynamics</span> with bespoke wireframing and user journey planning.</>,
      ctaText: "Start UI/UX Project",
      activeBadgeText: "UI/UX Agency",
      activeBadgeColor: "bg-[#7c3aed] text-white",
      onCtaClick: () => openBooking('GROWTH', '$2,999')
    },
    {
      tag: "WEBSITE MAINTENANCE",
      titleLine1: "Website Maintenance &",
      titleLine2: "Core Web Vitals Optimization",
      titleGrad: "from-[#fbbf24] to-[#f59e0b]",
      dotColor: "#fbbf24",
      badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      description: <>Keep your platform <span className="text-[#fbbf24] font-semibold">secure, updated, and blazing fast</span>. Continuous uptime tracking and backup systems.</>,
      ctaText: "Check Performance",
      activeBadgeText: "Maintenance & Speed",
      activeBadgeColor: "bg-[#fbbf24] text-black",
      onCtaClick: () => openBooking('SCALE', '$4,999')
    }
  ];

  // Autoplay hero carousel
  useEffect(() => {
    if (!isHomepageGroup) return;
    const interval = setInterval(() => {
      setActiveHeroSlide((prev) => (prev === 3 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(interval);
  }, [currentPage]);

  // Page navigation helper
  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Trigger URL change handlers
    const event = new PopStateEvent('popstate');
    window.dispatchEvent(event);
  };

  // Helper lists
  const statsList = [
    { value: '500+', label: 'Projects Completed' },
    { value: '200+', label: 'Happy USA & Canada Clients' },
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

      {/* ── Static premium background — deep navy-purple gradient ── */}
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
      <header className="relative z-40">
        {/* Visually hidden but SEO-indexable list of agency capabilities in the header */}
        <div className="sr-only">
          <h2>Trusted Website Development Agency Serving the USA</h2>
          {heroSlides.map((slide, index) => (
            <article key={index}>
              <h3>{slide.tag}: {slide.titleLine1} {slide.titleLine2}</h3>
              <p>{slide.description}</p>
            </article>
          ))}
        </div>

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
            onClick={() => isHomepageGroup ? scrollToSection('hero') : navigateTo('/')} 
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
              onClick={() => navigateTo('/about')}
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
                onClick={() => { setMobileMenuOpen(false); navigateTo('/about'); }}
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
      </header>

      {!isHomepageGroup && <div className="h-[72px]" />}

      {/* Main content landmark for accessibility & skip-nav */}
      <main id="main-content">

      {/* —— Inner Pages —— lazy loaded, shown only when navigated to */}
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <span className="w-8 h-8 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        {currentPage === 'about'        && <AboutPage openBooking={openBooking} />}
        {currentPage === 'portfolio'    && (
          <PortfolioPage 
            openBooking={openBooking} 
          />
        )}
        {currentPage === 'case-studies' && <CaseStudiesPage openBooking={openBooking} />}
        {currentPage === 'blog'         && <BlogPage openBooking={openBooking} />}
      </Suspense>

      {/* ── Home Content ── */}
      {isHomepageGroup && <>

      {/* 3. HERO SECTION — Premium 3D Split Layout */}
      <section
        className="relative z-10 overflow-hidden flex items-stretch justify-center min-h-screen"
        id="hero"
      >


        {/* Particles subtle secondary layer */}
        {!isMobile && (
          <Suspense fallback={null}>
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <Particles3D />
            </div>
          </Suspense>
        )}

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.02) 3px, rgba(0,0,0,0.02) 4px)',
        }} />

        {/* ── FULL SCREEN SPLIT VIEWPORT ── */}
        <div className="relative z-10 w-full min-h-screen flex items-stretch">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch"
          >
            {/* ── LEFT COLUMN — Premium Translucent Dark Navy/Violet Brand Styling ── */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#0b0c16]/95 via-[#06070d]/98 to-[#030306]/98 backdrop-blur-md px-8 pb-8 pt-24 sm:px-12 sm:pb-12 sm:pt-28 lg:px-16 lg:pb-16 lg:pt-32 xl:px-20 xl:pb-20 xl:pt-36 flex flex-col justify-between text-slate-100 relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
              {/* Floating background gradient glow inside left panel */}
              <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#7c3aed]/10 blur-[80px] pointer-events-none" />
              
              {/* Top Badge: Dynamic based on active slide */}
              <div className="flex items-center justify-between mb-6 z-10">
                <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] font-mono tracking-widest font-bold uppercase transition-all duration-300 ${heroSlides[activeHeroSlide].badgeClass}`}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: heroSlides[activeHeroSlide].dotColor }} />
                  {heroSlides[activeHeroSlide].tag}
                </div>
              </div>

              {/* Title, Description & CTA Section */}
              <div className="my-auto min-h-[280px] flex flex-col justify-center z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHeroSlide}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="flex flex-col text-left w-full"
                  >
                    {/* Dynamic Highlight Title */}
                    <h1 className="font-display font-extrabold text-[clamp(2.0rem,4.5vw,3.0rem)] leading-[1.05] tracking-tight text-white mb-4">
                      {heroSlides[activeHeroSlide].titleLine1}{' '}
                      <span className={`bg-gradient-to-r ${heroSlides[activeHeroSlide].titleGrad} text-transparent bg-clip-text`}>
                        {heroSlides[activeHeroSlide].titleLine2}
                      </span>
                    </h1>

                    {/* Description Block */}
                    <p className="font-sans text-sm sm:text-base leading-relaxed text-slate-300/90 max-w-md">
                      {heroSlides[activeHeroSlide].description}
                    </p>

                    {/* CTA Button */}
                    <div className="mt-8 flex justify-start">
                      <button
                        onClick={heroSlides[activeHeroSlide].onCtaClick}
                        className="group relative flex items-center justify-center gap-2 py-3 px-8 bg-black text-white hover:text-black hover:bg-[#c5a059] border border-white/10 hover:border-[#c5a059] uppercase text-[10px] font-mono tracking-[0.25em] transition-all duration-300 cursor-pointer rounded-full active:scale-95 font-black shadow-lg shadow-black/20"
                      >
                        {heroSlides[activeHeroSlide].ctaText}
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Slider tags row */}
              <div className="mt-8 pt-6 border-t border-white/5 z-10">
                <div className="flex flex-wrap gap-2 mb-6">
                  {/* Web Design Badge */}
                  <button
                    onClick={() => setActiveHeroSlide(0)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all duration-300 cursor-pointer border ${
                      activeHeroSlide === 0
                        ? 'bg-[#10b981]/15 text-[#34d399] border-[#10b981]/30 font-bold'
                        : 'border-white/5 text-white/50 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {activeHeroSlide === 0 && <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />}
                    Web Design {activeHeroSlide === 0 ? '' : '+'}
                  </button>

                  {/* React Systems Badge */}
                  <button
                    onClick={() => setActiveHeroSlide(1)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all duration-300 cursor-pointer border ${
                      activeHeroSlide === 1
                        ? 'bg-[#6366f1]/15 text-[#818cf8] border-[#6366f1]/30 font-bold'
                        : 'border-white/5 text-white/50 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {activeHeroSlide === 1 && <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" />}
                    React Systems {activeHeroSlide === 1 ? '' : '+'}
                  </button>

                  {/* SEO & Growth Badge */}
                  <button
                    onClick={() => setActiveHeroSlide(2)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all duration-300 cursor-pointer border ${
                      activeHeroSlide === 2
                        ? 'bg-[#7c3aed]/15 text-[#a78bfa] border-[#7c3aed]/30 font-bold'
                        : 'border-white/5 text-white/50 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {activeHeroSlide === 2 && <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />}
                    SEO & Growth
                  </button>

                  {/* Cloud & Scale Badge */}
                  <button
                    onClick={() => setActiveHeroSlide(3)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all duration-300 cursor-pointer border ${
                      activeHeroSlide === 3
                        ? 'bg-[#c5a059]/15 text-[#ebd095] border-[#c5a059]/30 font-bold'
                        : 'border-white/5 text-white/50 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {activeHeroSlide === 3 && <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />}
                    Cloud & Scale {activeHeroSlide === 3 ? '' : '+'}
                  </button>

                  {/* Brand Identity Tag (Static) */}
                  <button
                    onClick={() => scrollToSection('services-explorer-section')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider border border-white/5 text-white/50 hover:text-white hover:border-white/20 transition-all duration-300 cursor-pointer"
                  >
                    Brand Identity
                  </button>

                  {/* AI Automation Tag (Static) */}
                  <button
                    onClick={() => scrollToSection('services-explorer-section')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider border border-white/5 text-white/50 hover:text-white hover:border-white/20 transition-all duration-300 cursor-pointer"
                  >
                    AI Automation
                  </button>
                </div>

                {/* Pagination Controls & Arrows */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                  {/* Pagination Dots */}
                  <div className="flex items-center gap-2">
                    {heroSlides.map((slide, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveHeroSlide(idx)}
                        className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                        style={{
                          width: activeHeroSlide === idx ? '24px' : '8px',
                          backgroundColor: activeHeroSlide === idx ? slide.dotColor : 'rgba(255, 255, 255, 0.2)'
                        }}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveHeroSlide((prev) => (prev === 0 ? 3 : prev - 1))}
                      className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 text-white hover:text-[#c5a059] flex items-center justify-center transition-all cursor-pointer active:scale-90"
                      title="Previous Slide"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setActiveHeroSlide((prev) => (prev === 3 ? 0 : prev + 1))}
                      className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 text-white hover:text-[#c5a059] flex items-center justify-center transition-all cursor-pointer active:scale-90"
                      title="Next Slide"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN — 2x2 Interactive Gradients Grid ── */}
            {!isMobile && (
              <Suspense fallback={null}>
                <HeroGrid activeHeroSlide={activeHeroSlide} setActiveHeroSlide={setActiveHeroSlide} />
              </Suspense>
            )}

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
            Website Development Services Built for Growth
          </h2>
          <p className="text-xs md:text-sm text-white/50 leading-relaxed">
            Custom website development, WordPress solutions, UI/UX design, and website maintenance built for US businesses. Select a division to explore deliverables.
          </p>
        </div>

        {/* Interactive Services catalog list selector */}
        <Suspense fallback={
          <div className="w-full min-h-[400px] flex items-center justify-center bg-white/[0.02] border border-white/[0.05] rounded-3xl animate-pulse">
            <span className="text-sm font-mono text-white/30">Loading services...</span>
          </div>
        }>
          <ServiceSelector />
        </Suspense>
      </section>

      <div className="my-16 md:my-24" />

      {/* ── FEATURED PORTFOLIO SHOWCASE ── */}
      <Suspense fallback={
        <div className="w-full min-h-[400px] flex items-center justify-center bg-white/[0.02] border border-white/[0.05] rounded-3xl animate-pulse">
          <span className="text-sm font-mono text-white/30">Loading showcase...</span>
        </div>
      }>
        <FeaturedPortfolio navigateTo={navigateTo} />
      </Suspense>

      <div className="my-16 md:my-24" />

      {/* 6. CHRONOLOGICAL PROCESS GANTT (Mirroring screenshot 4) */}
      <section className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto" id="process-section">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-[10px] font-mono tracking-widest text-indigo-400 font-semibold uppercase">
            — HOW WE WORK —
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-none">
            WordPress Development for Modern Businesses
          </h2>
          <p className="text-xs md:text-sm text-white/50 leading-relaxed">
            Our 4-step custom WordPress theme design and website development workflow designed for speed, security, and scalability.
          </p>
        </div>

        {/* Interactive timeline module */}
        <Suspense fallback={
          <div className="w-full min-h-[350px] flex items-center justify-center bg-white/[0.02] border border-white/[0.05] rounded-3xl animate-pulse">
            <span className="text-sm font-mono text-white/30">Loading process timeline...</span>
          </div>
        }>
          <InteractiveProcess />
        </Suspense>
      </section>

      <div className="my-16 md:my-24" />

      {/* 7. WHY CHOOSE US + TECH STACK */}
      <Suspense fallback={
        <div className="w-full min-h-[400px] flex items-center justify-center bg-white/[0.02] border border-white/[0.05] rounded-3xl animate-pulse">
          <span className="text-sm font-mono text-white/30">Loading edge & stack...</span>
        </div>
      }>
        <WhyChooseUs />
      </Suspense>


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
        <Suspense fallback={
          <div className="w-full min-h-[300px] flex items-center justify-center bg-white/[0.02] border border-white/[0.05] rounded-3xl animate-pulse">
            <span className="text-sm font-mono text-white/30">Loading reviews...</span>
          </div>
        }>
          <TestimonialsSlider />
        </Suspense>
      </section>

      <div className="my-16 md:my-24" />

      {/* 9. BOTTOM CONVERSION PORTAL */}
      <Suspense fallback={
        <div className="w-full min-h-[250px] flex items-center justify-center bg-white/[0.02] border border-white/[0.05] rounded-2xl animate-pulse">
          <span className="text-sm font-mono text-white/30">Loading audit dashboard...</span>
        </div>
      }>
        <ConversionPortal openBooking={openBooking} />
      </Suspense>

      </> /* end home */}

      {/* 10. PREMIUM CORPORATE FOOTER */}
      <Suspense fallback={null}>
        <Footer openBooking={openBooking} scrollToSection={scrollToSection} navigateTo={navigateTo} />
      </Suspense>

      {/* 11. GLOBAL BOOKING SCHEDULER MODAL — lazy loaded, only fetched on first open */}
      <Suspense fallback={null}>
        <BookingModal 
          isOpen={bookingOpen} 
          onClose={() => setBookingOpen(false)} 
          selectedPlan={selectedPlan}
          calculatedPrice={calculatedPrice}
        />
      </Suspense>
      <Analytics />
      </main>
    </div>
  );
}
