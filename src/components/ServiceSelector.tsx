/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICE_CATEGORIES } from '../data';
import { ServiceItem, ServiceCategory } from '../types';
import {
  Compass, ArrowRight, ChevronRight, CheckCircle,
  // Design & Branding
  PenTool, Layers, LayoutTemplate, UserCheck, Image, Instagram, Presentation, Clapperboard,
  // Web Dev
  Globe, Globe2, MousePointerClick, AppWindow, Workflow, Plug2, Wifi, RefreshCw,
  // Mobile
  Apple, Smartphone, Tablets, Blend, Wrench,
  // E-commerce
  Store, ShoppingCart, ShoppingBag, Tag, CreditCard, Package,
  // Technical
  ShieldCheck, Zap, ClipboardList, Lock, Cloud, Database, GitBranch, Bot,
  // AI & Automation
  MessageSquare, FileText, Repeat2, Users, BarChart2, BrainCircuit,
  // Category icons
  Palette, Code, Cpu, Sparkles,
} from 'lucide-react';
import { SERVICE_DETAILS } from './ServiceModal';

interface SelectedService {
  item: ServiceItem;
  catTitle: string;
  catColor: string;
  catIcon: string;
}

const SERVICE_ICON_SM: Record<string, React.ReactNode> = {
  'Logo Design':              <PenTool className="w-4 h-4" />,
  'Brand Identity Packages':  <Layers className="w-4 h-4" />,
  'UI Design':                <LayoutTemplate className="w-4 h-4" />,
  'UX Design':                <UserCheck className="w-4 h-4" />,
  'Graphic Design':           <Image className="w-4 h-4" />,
  'Social Media Design':      <Instagram className="w-4 h-4" />,
  'Presentation Design':      <Presentation className="w-4 h-4" />,
  'Motion Graphics':          <Clapperboard className="w-4 h-4" />,
  'Website Development':      <Globe className="w-4 h-4" />,
  'Landing Page Development': <MousePointerClick className="w-4 h-4" />,
  'Web App Development':      <AppWindow className="w-4 h-4" />,
  'WordPress Development':    <Globe2 className="w-4 h-4" />,
  'Webflow Development':      <Workflow className="w-4 h-4" />,
  'API Development':          <Plug2 className="w-4 h-4" />,
  'Progressive Web Apps':     <Wifi className="w-4 h-4" />,
  'Website Redesign':         <RefreshCw className="w-4 h-4" />,
  'iOS App Development':      <Apple className="w-4 h-4" />,
  'Android App Development':  <Smartphone className="w-4 h-4" />,
  'Cross-Platform Apps':      <Tablets className="w-4 h-4" />,
  'App UI/UX Design':         <Blend className="w-4 h-4" />,
  'App Maintenance':          <Wrench className="w-4 h-4" />,
  'Shopify Store Setup':      <Store className="w-4 h-4" />,
  'E-commerce Website':       <ShoppingCart className="w-4 h-4" />,
  'WooCommerce Development':  <ShoppingBag className="w-4 h-4" />,
  'Product Listing Optimization': <Tag className="w-4 h-4" />,
  'Payment Gateway Integration':  <CreditCard className="w-4 h-4" />,
  'Dropshipping Store Setup': <Package className="w-4 h-4" />,
  'Website Maintenance':      <ShieldCheck className="w-4 h-4" />,
  'Speed Optimization':       <Zap className="w-4 h-4" />,
  'UX Audit':                 <ClipboardList className="w-4 h-4" />,
  'Website Security':         <Lock className="w-4 h-4" />,
  'Cloud Hosting Setup':      <Cloud className="w-4 h-4" />,
  'Database Design':          <Database className="w-4 h-4" />,
  'DevOps & CI/CD':           <GitBranch className="w-4 h-4" />,
  'Chatbot Development':      <Bot className="w-4 h-4" />,
  'AI Chatbot Integration':   <MessageSquare className="w-4 h-4" />,
  'AI Content Generation':    <FileText className="w-4 h-4" />,
  'Workflow Automation':      <Repeat2 className="w-4 h-4" />,
  'CRM Setup & Automation':   <Users className="w-4 h-4" />,
  'AI-Powered SEO Tools':     <BarChart2 className="w-4 h-4" />,
  'Custom GPT / AI Agents':   <BrainCircuit className="w-4 h-4" />,
};

const CATEGORY_ICON_LG: Record<string, React.ReactNode> = {
  'Palette':    <Palette     className="w-5 h-5" />,
  'Code':       <Code        className="w-5 h-5" />,
  'Smartphone': <Smartphone  className="w-5 h-5" />,
  'ShoppingBag':<ShoppingBag className="w-5 h-5" />,
  'Cpu':        <Cpu         className="w-5 h-5" />,
  'Sparkles':   <Sparkles    className="w-5 h-5" />,
};

const CATEGORY_SHORT: Record<string, string> = {
  'DESIGN & BRANDING':    'Design',
  'WEB DEVELOPMENT':      'Web Dev',
  'MOBILE APPS':          'Mobile',
  'E-COMMERCE SOLUTIONS': 'E-Commerce',
  'TECHNICAL & PERF.':    'Technical',
  'AI & AUTOMATION':      'AI & Auto',
};

const CATEGORY_TAGLINES: Record<string, string> = {
  'DESIGN & BRANDING':    'Conversion-focused brand identities that scale.',
  'WEB DEVELOPMENT':      'Scalable websites and apps built with modern tech.',
  'MOBILE APPS':          'Native and cross-platform apps optimized for any device.',
  'E-COMMERCE SOLUTIONS': 'Online stores designed to convert at every touchpoint.',
  'TECHNICAL & PERF.':    'Security, speed, and infrastructure that keeps you bulletproof.',
  'AI & AUTOMATION':      'Intelligent workflows that save time and scale your ops.',
};

export default function ServiceSelector() {
  const [activeCatIndex, setActiveCatIndex] = useState(1);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [hoveredServiceIndex, setHoveredServiceIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleSelectCategory = (e: Event) => {
      const { categoryIndex } = (e as CustomEvent).detail;
      if (typeof categoryIndex === 'number' && categoryIndex >= 0 && categoryIndex < SERVICE_CATEGORIES.length) {
        setActiveCatIndex(categoryIndex);
        setActiveServiceIndex(0);
      }
    };
    window.addEventListener('pixelvance:selectCategory', handleSelectCategory);
    return () => window.removeEventListener('pixelvance:selectCategory', handleSelectCategory);
  }, []);

  const categories = SERVICE_CATEGORIES;
  const activeCategory: ServiceCategory = categories[activeCatIndex];
  const activeService: ServiceItem = activeCategory.items[activeServiceIndex] || activeCategory.items[0];

  // Fetch detailed service metadata (bullets, tagline) dynamically
  const serviceDetails = SERVICE_DETAILS[activeService.name] ?? {
    tagline: 'Premium service tailored to your business.',
    bullets: ['Custom scope to your needs', 'Expert team assigned', 'Dedicated project manager', 'Quality guaranteed'],
    deliverables: ['Full project files', 'Documentation', 'Post-launch support'],
  };

  const openBooking = (plan: string, price: string) => {
    window.dispatchEvent(new CustomEvent('pixelvance:openBooking', { detail: { plan, price } }));
  };

  // Split items for left and right columns
  const midPoint = Math.ceil(activeCategory.items.length / 2);
  const leftItems = activeCategory.items.slice(0, midPoint);
  const rightItems = activeCategory.items.slice(midPoint);

  return (
    <>
      {/* ── CATEGORY TAB BAR (Common for Desktop & Mobile) ── */}
      <div className="w-full max-w-5xl mx-auto mb-12 px-4">
        <div className="flex flex-wrap justify-center gap-2.5 md:gap-3">
          {categories.map((cat, i) => {
            const isActive = i === activeCatIndex;
            const icon = CATEGORY_ICON_LG[cat.iconName] ?? <Compass className="w-4 h-4" />;
            return (
              <button
                key={cat.title}
                onClick={() => {
                  setActiveCatIndex(i);
                  setActiveServiceIndex(0);
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-[11px] md:text-xs font-display font-bold whitespace-nowrap transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? 'text-black bg-white border-white shadow-[0_0_24px_rgba(255,255,255,0.1)]'
                    : 'text-white/50 bg-[#0e0e0e]/40 border-white/[0.05] hover:text-white/80 hover:bg-[#0e0e0e]/60 hover:border-white/[0.1]'
                }`}
                style={isActive ? {
                  background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                } : {}}
              >
                <span className={isActive ? 'text-black/70' : 'text-white/30'}>{icon}</span>
                {CATEGORY_SHORT[cat.title] ?? cat.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE VIEW (< lg) ── */}
      <div className="lg:hidden flex flex-col gap-6 px-4">
        {/* Central Details Card (Shows currently active service details) */}
        <div 
          className="w-full bg-gradient-to-b from-[#0e0e0e]/95 to-[#050507]/90 border border-white/10 rounded-[24px] p-5 shadow-2xl flex flex-col gap-4 relative overflow-hidden"
        >
          {/* Subtle colored glow behind */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-[60px] opacity-15 pointer-events-none"
            style={{ backgroundColor: activeCategory.color }}
          />

          {/* Top Aspect ratio Header */}
          <div 
            className="w-full aspect-[16/9] rounded-xl overflow-hidden relative border border-white/[0.08] flex items-center justify-center bg-[#07070a]"
            style={{
              background: `linear-gradient(135deg, ${activeCategory.color}18 0%, #0c0a1f 60%, #060608 100%)`
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white relative shadow-xl backdrop-blur-sm"
              style={{ backgroundColor: `${activeCategory.color}25`, border: `1px solid ${activeCategory.color}44`, color: activeCategory.color }}>
              {SERVICE_ICON_SM[activeService.name] ?? CATEGORY_ICON_LG[activeCategory.iconName]}
            </div>
          </div>

          {/* Service Info */}
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-mono tracking-[0.2em] font-bold uppercase" style={{ color: activeCategory.color }}>
              {activeCategory.title}
            </span>
            <h3 className="text-lg font-display font-black text-white leading-tight">
              {activeService.name}
            </h3>
            <p className="text-[11px] text-white/50 italic leading-snug">
              {serviceDetails.tagline}
            </p>
            <p className="text-[11px] text-white/40 leading-relaxed mt-1">
              {activeService.description}
            </p>
          </div>

          {/* Bullets checklist */}
          <div className="space-y-2.5 bg-white/[0.02] border border-white/[0.05] p-4 rounded-xl">
            <p className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/30">What's Included</p>
            {serviceDetails.bullets.slice(0, 3).map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: activeCategory.color }} />
                <span className="text-[11px] text-white/60 leading-snug">{bullet}</span>
              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <button
            onClick={() => openBooking('GROWTH', '$2,999')}
            className="w-full py-3.5 bg-white hover:bg-opacity-95 text-black font-mono text-[10px] uppercase tracking-[0.2em] font-black rounded-xl active:scale-95 transition-all cursor-pointer"
          >
            Book Strategy Session
          </button>
        </div>

        {/* List of Services inside active category (Small cards) */}
        <div className="flex flex-col gap-2.5">
          <p className="text-[10px] font-mono tracking-[0.25em] text-white/35 uppercase pl-1">Select Service</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {activeCategory.items.map((item, idx) => {
              const isSelected = idx === activeServiceIndex;
              const icon = SERVICE_ICON_SM[item.name] ?? <Compass className="w-4 h-4" />;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveServiceIndex(idx)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-left border transition-all cursor-pointer group relative overflow-hidden ${
                    isSelected
                      ? 'bg-white/[0.03] shadow-lg'
                      : 'bg-[#0e0e0e]/30 border-white/[0.04] hover:border-white/[0.08]'
                  }`}
                  style={isSelected ? { borderColor: activeCategory.color } : {}}
                >
                  {/* Corner Accent Arc */}
                  <div 
                    className="absolute top-0 right-0 w-3 h-3 border-t border-r rounded-tr-[12px] pointer-events-none"
                    style={{ borderColor: isSelected ? activeCategory.color : 'transparent' }}
                  />

                  {/* Icon */}
                  <div 
                    className="w-8.5 h-8.5 rounded-lg flex items-center justify-center shrink-0 border transition-all"
                    style={{
                      backgroundColor: isSelected ? `${activeCategory.color}15` : 'rgba(255,255,255,0.03)',
                      borderColor: isSelected ? `${activeCategory.color}33` : 'rgba(255,255,255,0.06)',
                      color: isSelected ? activeCategory.color : 'rgba(255,255,255,0.4)'
                    }}
                  >
                    {icon}
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <p className={`text-[11px] font-display font-bold leading-tight ${isSelected ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
                      {item.name}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── DESKTOP VIEW (>= lg) ── */}
      <div
        className="hidden lg:block w-full max-w-5xl mx-auto relative h-[540px]"
        id="services-catalog"
      >
        {/* Dynamic Curved SVG Connector Wires */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1024 540" fill="none">
          {/* Left Wires */}
          {leftItems.map((item, i) => {
            const globalIdx = i;
            const isSelected = activeServiceIndex === globalIdx;
            const isHovered = hoveredServiceIndex === globalIdx;
            const cardTop = leftItems.length > 1
              ? 40 + i * ((540 - 80 - 68) / (leftItems.length - 1))
              : 236;
            const yConn = cardTop + 34;
            const curvePath = `M 280 ${yConn} C 306 ${yConn}, 306 270, 332 270`;

            const isWireActive = isSelected || isHovered;

            return (
              <g key={`left-wire-${i}`}>
                {/* Glow layer */}
                {isWireActive && (
                  <motion.path
                    d={curvePath}
                    stroke={activeCategory.color}
                    strokeWidth="3.5"
                    strokeOpacity="0.4"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ filter: 'blur(3px)' }}
                  />
                )}
                {/* Main Curve Wire */}
                <path
                  d={curvePath}
                  stroke={isWireActive ? activeCategory.color : 'rgba(255, 255, 255, 0.05)'}
                  strokeWidth={isWireActive ? '2.2' : '1'}
                  strokeDasharray={isWireActive ? 'none' : '4 4'}
                  fill="none"
                  className="transition-all duration-300"
                />
                {/* Active current pulse flow */}
                {isSelected && (
                  <motion.path
                    d={curvePath}
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ strokeDasharray: '4 44', strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -48 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                  />
                )}
              </g>
            );
          })}

          {/* Right Wires */}
          {rightItems.map((item, i) => {
            const globalIdx = i + leftItems.length;
            const isSelected = activeServiceIndex === globalIdx;
            const isHovered = hoveredServiceIndex === globalIdx;
            const cardTop = rightItems.length > 1
              ? 40 + i * ((540 - 80 - 68) / (rightItems.length - 1))
              : 236;
            const yConn = cardTop + 34;
            const curvePath = `M 744 ${yConn} C 718 ${yConn}, 718 270, 692 270`;

            const isWireActive = isSelected || isHovered;

            return (
              <g key={`right-wire-${i}`}>
                {/* Glow layer */}
                {isWireActive && (
                  <motion.path
                    d={curvePath}
                    stroke={activeCategory.color}
                    strokeWidth="3.5"
                    strokeOpacity="0.4"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ filter: 'blur(3px)' }}
                  />
                )}
                {/* Main Curve Wire */}
                <path
                  d={curvePath}
                  stroke={isWireActive ? activeCategory.color : 'rgba(255, 255, 255, 0.05)'}
                  strokeWidth={isWireActive ? '2.2' : '1'}
                  strokeDasharray={isWireActive ? 'none' : '4 4'}
                  fill="none"
                  className="transition-all duration-300"
                />
                {/* Active current pulse flow */}
                {isSelected && (
                  <motion.path
                    d={curvePath}
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ strokeDasharray: '4 44', strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: 48 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* LEFT COLUMN: First half of services */}
        <div className="absolute left-0 w-[280px] h-full z-10">
          {leftItems.map((item, i) => {
            const globalIdx = i;
            const isSelected = activeServiceIndex === globalIdx;
            const cardTop = leftItems.length > 1
              ? 40 + i * ((540 - 80 - 68) / (leftItems.length - 1))
              : 236;
            const icon = SERVICE_ICON_SM[item.name] ?? <Compass className="w-4 h-4" />;
            return (
              <motion.div
                key={item.name}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHoveredServiceIndex(globalIdx)}
                onMouseLeave={() => setHoveredServiceIndex(null)}
                onClick={() => setActiveServiceIndex(globalIdx)}
                className={`absolute left-0 w-[280px] h-[68px] rounded-2xl p-3 flex items-center gap-3.5 cursor-pointer border transition-all duration-300 ${
                  isSelected
                    ? 'shadow-[0_10px_25px_rgba(0,0,0,0.4)] opacity-100 bg-[#0c0c0e]/90'
                    : 'border-white/5 bg-[#0e0e0e]/20 opacity-60 hover:opacity-95 hover:bg-[#0e0e0e]/50'
                }`}
                style={{
                  top: `${cardTop}px`,
                  borderColor: isSelected ? activeCategory.color : 'rgba(255,255,255,0.05)',
                  boxShadow: isSelected ? `0 0 24px ${activeCategory.color}15, inset 0 0 0 1px ${activeCategory.color}22` : 'none',
                }}
              >
                {/* Decorative Accent Arc */}
                <div 
                  className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 rounded-tr-[16px] pointer-events-none transition-colors duration-300"
                  style={{ borderColor: isSelected ? activeCategory.color : 'transparent' }}
                />

                {/* Icon Container */}
                <div 
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all"
                  style={{
                    backgroundColor: isSelected ? `${activeCategory.color}18` : 'rgba(255,255,255,0.03)',
                    borderColor: isSelected ? `${activeCategory.color}33` : 'rgba(255,255,255,0.06)',
                    color: isSelected ? activeCategory.color : 'rgba(255,255,255,0.4)'
                  }}
                >
                  {icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-[11px] font-display font-bold text-white leading-tight tracking-wide">
                    {item.name}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CENTER COLUMN: Central Big details box */}
        <div 
          className="absolute left-[332px] w-[360px] h-[480px] top-[30px] bg-gradient-to-b from-[#0e0e0e]/95 to-[#060608]/90 border border-white/10 rounded-[30px] p-5 shadow-[0_30px_70px_rgba(0,0,0,0.8)] flex flex-col justify-between gap-4 z-10 overflow-hidden"
        >
          {/* Glowing halo behind */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[65px] opacity-10 pointer-events-none"
            style={{ backgroundColor: activeCategory.color }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.name}
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4 h-full w-full flex-1"
            >
              {/* Graphic/Gradient Panel */}
              <div 
                className="w-full aspect-[16/9] rounded-2xl overflow-hidden relative border border-white/[0.08] flex items-center justify-center bg-[#07070a]"
                style={{
                  background: `linear-gradient(135deg, ${activeCategory.color}15 0%, #0c0a1f 60%, #060608 100%)`
                }}
              >
                {/* Visual grid lines in mockup card */}
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Floating active icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white relative shadow-xl backdrop-blur-sm scale-110"
                  style={{ 
                    backgroundColor: `${activeCategory.color}25`, 
                    border: `1px solid ${activeCategory.color}44`,
                    color: activeCategory.color 
                  }}
                >
                  {SERVICE_ICON_SM[activeService.name] ?? CATEGORY_ICON_LG[activeCategory.iconName]}
                </div>
              </div>

              {/* Service Metadata */}
              <div className="flex flex-col gap-1 px-1">
                <span className="text-[8px] font-mono tracking-[0.3em] font-bold uppercase" style={{ color: activeCategory.color }}>
                  {activeCategory.title}
                </span>
                <h3 className="text-base font-display font-black text-white leading-tight tracking-wide mt-0.5">
                  {activeService.name}
                </h3>
                <p className="text-[10px] text-white/50 italic leading-snug">
                  {serviceDetails.tagline}
                </p>
                <p className="text-[10px] text-white/40 leading-relaxed mt-2.5">
                  {activeService.description}
                </p>
              </div>

              {/* checklist bullets */}
              <div className="space-y-2 bg-white/[0.015] border border-white/[0.05] p-3.5 rounded-2xl mt-1">
                <p className="text-[8px] font-mono tracking-[0.25em] uppercase text-white/30 mb-2">What's Included</p>
                {serviceDetails.bullets.slice(0, 3).map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: activeCategory.color }} />
                    <span className="text-[10px] text-white/60 leading-snug">{bullet}</span>
                  </div>
                ))}
              </div>

              {/* CTA Booking Button */}
              <button
                onClick={() => openBooking('GROWTH', '$2,999')}
                className="w-full py-3.5 bg-white hover:bg-opacity-95 text-black font-mono text-[10px] uppercase tracking-[0.2em] font-black rounded-xl shadow-lg transition-all duration-300 active:scale-95 cursor-pointer mt-auto flex items-center justify-center gap-1.5 hover:shadow-[0_0_24px_rgba(255,255,255,0.1)]"
              >
                Book Strategy Session
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Second half of services */}
        <div className="absolute right-0 w-[280px] h-full z-10">
          {rightItems.map((item, i) => {
            const globalIdx = i + leftItems.length;
            const isSelected = activeServiceIndex === globalIdx;
            const cardTop = rightItems.length > 1
              ? 40 + i * ((540 - 80 - 68) / (rightItems.length - 1))
              : 236;
            const icon = SERVICE_ICON_SM[item.name] ?? <Compass className="w-4 h-4" />;
            return (
              <motion.div
                key={item.name}
                whileHover={{ x: -6 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHoveredServiceIndex(globalIdx)}
                onMouseLeave={() => setHoveredServiceIndex(null)}
                onClick={() => setActiveServiceIndex(globalIdx)}
                className={`absolute right-0 w-[280px] h-[68px] rounded-2xl p-3 flex items-center gap-3.5 cursor-pointer border transition-all duration-300 ${
                  isSelected
                    ? 'shadow-[0_10px_25px_rgba(0,0,0,0.4)] opacity-100 bg-[#0c0c0e]/90'
                    : 'border-white/5 bg-[#0e0e0e]/20 opacity-60 hover:opacity-95 hover:bg-[#0e0e0e]/50'
                }`}
                style={{
                  top: `${cardTop}px`,
                  borderColor: isSelected ? activeCategory.color : 'rgba(255,255,255,0.05)',
                  boxShadow: isSelected ? `0 0 24px ${activeCategory.color}15, inset 0 0 0 1px ${activeCategory.color}22` : 'none',
                }}
              >
                {/* Decorative Accent Arc */}
                <div 
                  className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 rounded-tr-[16px] pointer-events-none transition-colors duration-300"
                  style={{ borderColor: isSelected ? activeCategory.color : 'transparent' }}
                />

                {/* Icon Container */}
                <div 
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all"
                  style={{
                    backgroundColor: isSelected ? `${activeCategory.color}18` : 'rgba(255,255,255,0.03)',
                    borderColor: isSelected ? `${activeCategory.color}33` : 'rgba(255,255,255,0.06)',
                    color: isSelected ? activeCategory.color : 'rgba(255,255,255,0.4)'
                  }}
                >
                  {icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-[11px] font-display font-bold text-white leading-tight tracking-wide">
                    {item.name}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}