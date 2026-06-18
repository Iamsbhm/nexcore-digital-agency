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
  Share2,
  Palette,
  Code,
  Smartphone,
  Cpu,
  ShoppingBag
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
const TechStack           = lazy(() => import('./components/TechStack'));
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

  const handleCategoryClick = (categoryIndex: number) => {
    scrollToSection('services-explorer-section');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('pixelvance:selectCategory', { detail: { categoryIndex } }));
    }, 450);
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

      {/* 3. HERO SECTION — Realistic Tech Split Layout */}
      <section
        className="relative z-10 overflow-hidden flex items-start lg:items-stretch justify-center min-h-screen lg:h-screen"
        id="hero"
      >
        {/* Particles subtle secondary layer */}
        {!isMobile && (
          <Suspense fallback={null}>
            <div className="absolute inset-0 pointer-events-none opacity-15">
              <Particles3D />
            </div>
          </Suspense>
        )}

        {/* Subtle scanline */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.015) 3px, rgba(0,0,0,0.015) 4px)',
        }} />

        {/* ── FULL VIEWPORT CONTAINER ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-8 lg:pt-[72px] lg:pb-0 flex items-start lg:items-center justify-center lg:h-screen h-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full h-full flex items-start lg:items-center"
          >
            {/* ═══ SPLIT LAYOUT: Left Content | Right Dashboard ═══ */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 xl:gap-6 items-start lg:items-center">

              {/* ─── LEFT PANEL: Main Content ─── */}
              <div className="flex flex-col gap-4 relative">

                {/* Terminal-style top bar */}
                <div className="flex items-center gap-2 bg-[#0d0f1a] border border-white/[0.07] rounded-xl px-3 py-2 w-fit">
                  <span className="w-2 h-2 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.8)]" />
                  <span className="w-2 h-2 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.8)]" />
                  <span className="w-2 h-2 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.8)]" />
                  <span className="ml-2 text-[9px] font-mono text-white/30 tracking-wider">pixelvance.dev — shell</span>
                  <span className="ml-auto flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                    <span className="text-[8px] font-mono text-[#10b981]">LIVE</span>
                  </span>
                </div>

                {/* Dynamic Service Tag */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`tag-${activeHeroSlide}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-mono tracking-[0.18em] font-bold uppercase w-fit ${heroSlides[activeHeroSlide].badgeClass}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: heroSlides[activeHeroSlide].dotColor }} />
                    {heroSlides[activeHeroSlide].tag}
                    <span className="ml-1 text-white/30">▸</span>
                  </motion.div>
                </AnimatePresence>

                {/* Main Headline */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`headline-${activeHeroSlide}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    <h1 className="font-display font-extrabold text-[clamp(1.75rem,3.8vw,3rem)] leading-[1.08] tracking-tight text-white">
                      {heroSlides[activeHeroSlide].titleLine1}
                      <br />
                      <span className={`bg-gradient-to-r ${heroSlides[activeHeroSlide].titleGrad} text-transparent bg-clip-text`}>
                        {heroSlides[activeHeroSlide].titleLine2}
                      </span>
                    </h1>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400 max-w-[420px]">
                      {heroSlides[activeHeroSlide].description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {[
                    { label: 'React', color: '#61dafb' },
                    { label: 'Next.js', color: '#ffffff' },
                    { label: 'TypeScript', color: '#3178c6' },
                    { label: 'WordPress', color: '#21759b' },
                    { label: 'Figma', color: '#a259ff' },
                    { label: 'AWS', color: '#ff9900' },
                  ].map((tech) => (
                    <span
                      key={tech.label}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.07] text-[9px] font-mono tracking-wider hover:bg-white/[0.08] transition-colors cursor-default"
                      style={{ color: tech.color }}
                    >
                      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: tech.color, boxShadow: `0 0 4px ${tech.color}` }} />
                      {tech.label}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={heroSlides[activeHeroSlide].onCtaClick}
                    className="group relative flex items-center gap-2 py-2.5 px-6 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white text-[10px] font-mono tracking-[0.18em] uppercase font-black rounded-lg shadow-lg shadow-[#7c3aed]/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-[#7c3aed]/40 active:scale-[0.98] cursor-pointer overflow-hidden"
                    id="hero-main-cta-btn"
                  >
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <ArrowRight className="w-3.5 h-3.5" />
                    {heroSlides[activeHeroSlide].ctaText}
                  </button>
                  <button
                    onClick={() => scrollToSection('services-explorer-section')}
                    className="flex items-center gap-2 py-2.5 px-5 border border-white/10 hover:border-white/25 text-white/70 hover:text-white text-[10px] font-mono tracking-[0.18em] uppercase transition-all duration-300 rounded-lg active:scale-[0.98] cursor-pointer"
                    id="hero-explore-btn"
                  >
                    Explore Services
                  </button>
                </div>

                {/* Slide Dots + Stats strip */}
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-2">
                    {heroSlides.map((slide, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveHeroSlide(idx)}
                        className="h-1 rounded-full transition-all duration-500 cursor-pointer"
                        style={{
                          width: activeHeroSlide === idx ? '20px' : '5px',
                          backgroundColor: activeHeroSlide === idx ? slide.dotColor : 'rgba(255,255,255,0.18)'
                        }}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <span className="text-white/20 text-[9px] font-mono">|</span>
                  {[
                    { val: '500+', lbl: 'Projects' },
                    { val: '98%', lbl: 'Retention' },
                    { val: '7+', lbl: 'Yrs Exp' },
                  ].map((s) => (
                    <div key={s.lbl} className="flex items-center gap-1">
                      <span className="text-[11px] font-display font-black text-white">{s.val}</span>
                      <span className="text-[8px] font-mono text-white/35 uppercase tracking-wider">{s.lbl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── RIGHT PANEL: Tech Dashboard ─── */}
              <div className="hidden lg:flex flex-col gap-3 relative">

                {/* Top row: Metric cards */}
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { label: 'Uptime', value: '99.9%', sub: '30-day avg', color: '#10b981', icon: '↑', bar: 99 },
                    { label: 'Perf Score', value: '97/100', sub: 'Core Web Vitals', color: '#3b82f6', icon: '⚡', bar: 97 },
                    { label: 'Projects', value: '500+', sub: 'Delivered USA', color: '#a855f7', icon: '✦', bar: 85 },
                  ].map((m) => (
                    <div key={m.label} className="bg-[#0a0b15] border border-white/[0.07] rounded-xl p-3 flex flex-col gap-2 hover:border-white/[0.14] transition-colors group">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-mono tracking-widest uppercase" style={{ color: m.color }}>{m.label}</span>
                        <span className="text-[10px]" style={{ color: m.color }}>{m.icon}</span>
                      </div>
                      <span className="text-lg font-display font-black text-white leading-none">{m.value}</span>
                      <div className="flex flex-col gap-1">
                        <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${m.bar}%`, backgroundColor: m.color, boxShadow: `0 0 6px ${m.color}` }} />
                        </div>
                        <span className="text-[7px] font-mono text-white/30">{m.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Middle: Mini Terminal */}
                <div className="bg-[#080910] border border-white/[0.07] rounded-xl overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#0d0f1c] border-b border-white/[0.05]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                    <span className="ml-2 text-[8px] font-mono text-white/25 tracking-wider">~/pixelvance/deploy.sh</span>
                    <span className="ml-auto text-[7px] font-mono text-[#10b981]/60">● running</span>
                  </div>
                  <div className="px-3 py-2.5 font-mono text-[9px] leading-[1.7] space-y-0.5">
                    <div><span className="text-[#7c3aed]">$ </span><span className="text-white/60">npm run build:prod</span></div>
                    <div className="text-[#10b981]">✔ TypeScript compiled (0 errors)</div>
                    <div className="text-[#10b981]">✔ Bundle optimized → 142kb gzip</div>
                    <div className="text-[#3b82f6]">→ Deploying to Vercel Edge...</div>
                    <div className="text-[#10b981]">✔ Deploy complete in 18s</div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/30">$</span>
                      <span className="inline-block w-1.5 h-3 bg-white/60 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Bottom row: Service network nodes */}
                <div className="bg-[#0a0b15] border border-white/[0.07] rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[8px] font-mono tracking-widest text-white/40 uppercase">Service Stack</span>
                    <span className="text-[7px] font-mono text-[#10b981]/70 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-[#10b981] animate-pulse" />
                      All systems operational
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Web Dev', icon: <Code className="w-3 h-3" />, color: '#10b981', status: '12 active' },
                      { label: 'WordPress', icon: <Layers className="w-3 h-3" />, color: '#6366f1', status: '8 active' },
                      { label: 'UI/UX', icon: <Palette className="w-3 h-3" />, color: '#a855f7', status: '6 active' },
                      { label: 'Mobile', icon: <Smartphone className="w-3 h-3" />, color: '#f59e0b', status: '4 active' },
                      { label: 'AI & Auto', icon: <Sparkles className="w-3 h-3" />, color: '#ef4444', status: '3 active' },
                      { label: 'E-Commerce', icon: <ShoppingBag className="w-3 h-3" />, color: '#ec4899', status: '7 active' },
                    ].map((svc) => (
                      <div
                        key={svc.label}
                        onClick={() => scrollToSection('services-explorer-section')}
                        className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05] hover:border-white/[0.14] rounded-lg px-2 py-1.5 cursor-pointer transition-all duration-200 group"
                      >
                        <span style={{ color: svc.color }} className="group-hover:scale-110 transition-transform flex-shrink-0">{svc.icon}</span>
                        <div className="overflow-hidden">
                          <span className="text-[8px] font-mono text-white/70 block truncate">{svc.label}</span>
                          <span className="text-[7px] font-mono block" style={{ color: svc.color }}>{svc.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FREE AUDIT CTA BANNER */}
      <section className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto" id="free-audit-section">
        <div
          className="relative rounded-3xl overflow-hidden border"
          style={{ borderColor: 'rgba(197,160,89,0.2)', background: 'rgba(6,7,14,0.97)' }}
        >
          {/* Glow blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(197,160,89,0.13) 0%, transparent 70%)' }} />
            <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(197,160,89,0.06) 0%, transparent 65%)' }} />
          </div>

          {/* Top accent line */}
          <div className="absolute top-0 inset-x-0 h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(197,160,89,0.6), transparent)' }} />

          <div className="relative px-8 md:px-14 py-10 md:py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">

              {/* Left text */}
              <div className="text-center md:text-left max-w-xl">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4"
                  style={{ borderColor: 'rgba(197,160,89,0.25)', background: 'rgba(197,160,89,0.07)' }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#c5a059]" />
                  <span className="text-[9px] font-mono tracking-[0.25em] text-[#c5a059] uppercase">
                    Limited — Only 5 Spots This Month
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-display font-black text-white leading-tight">
                  Claim Your{' '}
                  <span className="bg-gradient-to-r from-[#c5a059] via-[#e8c97a] to-[#a07840] bg-clip-text text-transparent">
                    Free Website Audit
                  </span>
                </h2>
                <p className="mt-3 text-sm text-white/45 leading-relaxed max-w-md">
                  Get a detailed report on your site's speed, SEO gaps, conversion leaks, and a clear action plan — completely free, delivered in 24 hours.
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center gap-4 mt-5">
                  {[
                    '✓ No credit card',
                    '✓ Delivered in 24hrs',
                    '✓ No obligation',
                    '✓ 100% free',
                  ].map((b) => (
                    <span key={b} className="text-[10px] font-mono text-white/40">{b}</span>
                  ))}
                </div>
              </div>

              {/* Right CTA block */}
              <div className="flex flex-col items-center gap-4 flex-shrink-0">
                {/* What you get */}
                <div className="rounded-2xl border p-5 w-full max-w-xs text-left"
                  style={{ borderColor: 'rgba(197,160,89,0.12)', background: 'rgba(197,160,89,0.04)' }}>
                  <p className="text-[9px] font-mono tracking-widest text-[#c5a059] uppercase mb-3">
                    Your free audit includes
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Page speed & Core Web Vitals',
                      'SEO & keyword gap analysis',
                      'Conversion rate review',
                      'Competitor comparison',
                      'Personalised action plan',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[11px] text-white/60">
                        <span className="w-1 h-1 rounded-full flex-shrink-0 bg-[#c5a059]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('pixelvance:openBooking', { detail: { plan: 'FREE AUDIT', price: 'Free' } }))}
                  className="w-full max-w-xs flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-display font-bold text-sm text-black transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #c5a059 0%, #e8c97a 50%, #c5a059 100%)', boxShadow: '0 0 24px rgba(197,160,89,0.25)' }}
                >
                  Claim Free Audit →
                </button>
                <p className="text-[8px] font-mono text-white/25 text-center">
                  No spam. No sales pressure. Just insights.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      <div className="my-12" />

      {/* Marquee continuous text scroll footer banner */}
      <div 
        className="w-full bg-white/[0.015] border-y border-white/5 py-4 overflow-hidden mt-6 relative z-10"
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5a059]/20 bg-[#c5a059]/05 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#c5a059] uppercase font-bold">How We Work</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-tight">
            How We Turn Your Website Into a{' '}
            <span className="bg-gradient-to-r from-[#c5a059] via-[#e8c97a] to-[#a07840] bg-clip-text text-transparent">
              Client-Generating Machine
            </span>
          </h2>
          <p className="text-xs md:text-sm text-white/45 leading-relaxed max-w-xl mx-auto">
            A transparent, 4-phase workflow that keeps you informed at every step — from initial discovery and design through development, testing, and go-live.
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

      {/* 7b. TECH STACK — Dedicated Section */}
      <Suspense fallback={
        <div className="w-full min-h-[300px] flex items-center justify-center animate-pulse">
          <span className="text-sm font-mono text-white/20">Loading tech stack...</span>
        </div>
      }>
        <TechStack />
      </Suspense>

      <div className="my-16 md:my-24" />

      {/* 8. TESTIMONIALS */}
      <Suspense fallback={
        <div className="w-full min-h-[300px] flex items-center justify-center animate-pulse">
          <span className="text-sm font-mono text-white/20">Loading reviews...</span>
        </div>
      }>
        <TestimonialsSlider />
      </Suspense>

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
