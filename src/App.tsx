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
  Linkedin,
  Dribbble,
  Share2
} from 'lucide-react';

import { PageName } from './types';
import { Analytics } from '@vercel/analytics/react';

// Lazy-loaded components (splits JS bundle, improves LCP & TTI)
const Particles3D        = lazy(() => import('./components/Particles3D'));
const Spheres3D          = lazy(() => import('./components/Spheres3D'));
const HeroGrid           = lazy(() => import('./components/HeroGrid'));
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

  const [isMobile, setIsMobile] = useState<boolean>(false);

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
        {/* 3D Floating Spheres — background */}
        {!isMobile && (
          <Suspense fallback={null}>
            <div className="absolute inset-0 pointer-events-none opacity-30 lg:opacity-100 transition-opacity duration-700">
              <Spheres3D />
            </div>
          </Suspense>
        )}

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

        {/* 3-Card Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Pixel Vance Web Platform',
              category: 'Web',
              tags: ['React', 'TypeScript', 'TailwindCSS', 'WebGL'],
              desc: 'Our own high-performance, next-generation agency website with interactive 3D elements.',
              image: '/images/nexcore_web_platform.png',
              accent: '#c5a059'
            },
            {
              title: 'Aether Finance',
              category: 'Web',
              tags: ['React', 'TailwindCSS', 'Framer Motion'],
              desc: 'High-converting SaaS dashboard for a fintech startup targeting the US market.',
              image: '/images/aether_finance.png',
              accent: '#3b82f6'
            },
            {
              title: 'PulseApp',
              category: 'Mobile',
              tags: ['iOS', 'Android', 'React Native'],
              desc: 'AI-powered health tracking app with 50K+ downloads on launch week.',
              image: '/images/pulseapp_mobile.png',
              accent: '#10b981'
            }
          ].map((project) => (
            <div
              key={project.title}
              onClick={() => {
                navigateTo(`/portfolio/${getSlug(project.title)}`);
              }}
              className="group bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-350 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Visual Image Header */}
                <div className="h-44 relative overflow-hidden flex items-end p-5">
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
      <section className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto animate-fade-in" id="why-us-section">

        {/* ── WHY CHOOSE US ── */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <span className="text-[10px] font-mono tracking-[0.4em] text-[#c5a059] font-bold uppercase">
            — OUR EDGE —
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white leading-none">
            Trusted Website Development <span style={{ background: 'linear-gradient(135deg,#c5a059,#e8c97a,#c5a059)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Agency Serving the USA</span>
          </h2>
          <h3 className="text-lg md:text-xl font-display font-bold text-[#c5a059] mt-3 uppercase tracking-wider">
            UI/UX Design Focused on User Experience
          </h3>
          <p className="text-sm text-white/40 max-w-xl mx-auto leading-relaxed mt-2">
            The top-rated US web design agency that crafts custom websites, fast WordPress platforms, and user experiences that convert and scale.
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
      <section className="relative z-10 px-4 md:px-8 max-w-5xl mx-auto pb-16">
        <div className="bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border border-white/[0.08] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden product-shadow">
          
          {/* Radial light behind call tracker */}
          <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4.5xl font-black tracking-tight text-white font-display">
              Get Your <span className="font-serif italic text-[#c5a059]">Free Website Audit</span> Today
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans font-medium">
              Not sure if your website is helping or hurting your business? Get a <span className="text-[#c5a059] font-bold">FREE Website Audit</span> and discover:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto text-xs text-white/70 font-mono py-4 border-y border-white/[0.05]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                Speed & Performance Issues
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                SEO Opportunities
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                Mobile Responsiveness Problems
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                User Experience Improvements
              </li>
              <li className="flex items-center gap-2 sm:col-span-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                Lead Generation Recommendations
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-xl mx-auto">
              <button
                onClick={() => openBooking('FREE AUDIT', 'Free')}
                id="booking-cta-bottom"
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-8 border border-[#c5a059] bg-[#c5a059] hover:bg-transparent text-black hover:text-white uppercase text-[10px] font-mono tracking-[0.2em] transition-all duration-300 cursor-pointer shadow-lg active:scale-95 font-bold"
              >
                <span>Claim Your Free Website Audit Today →</span>
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
                    { label: 'in', href: 'https://www.linkedin.com/company/pixel-vance-digital/', title: 'LinkedIn', icon: Linkedin },
                    { label: 'Dr', href: 'https://dribbble.com/pixelvancedigital', title: 'Dribbble', icon: Dribbble }
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target={s.href !== '#' ? '_blank' : undefined}
                        rel={s.href !== '#' ? 'noopener noreferrer' : undefined}
                        id={`footer-social-${s.label.toLowerCase()}`}
                        title={s.title}
                        className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/35 hover:text-[#c5a059] hover:border-[#c5a059]/40 hover:bg-[#c5a059]/5 transition-all duration-200"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
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
                    { label: 'About Us',           path: '/about' },
                    { label: 'Design Portfolio',    path: '/portfolio' },
                    { label: 'Client Case Studies', path: '/case-studies' },
                    { label: 'Engineering Blog',    path: '/blog' },
                  ]).map(({ label, path }) => (
                    <li key={label}>
                      <button
                        onClick={() => navigateTo(path)}
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
      <Analytics />
      </main>
    </div>
  );
}
