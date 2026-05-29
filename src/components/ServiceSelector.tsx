/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICE_CATEGORIES } from '../data';
import { ServiceItem, ServiceCategory } from '../types';
import {
  Compass, CheckCircle2, ArrowRight, ChevronRight,
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
import ServiceModal from './ServiceModal';

interface SelectedService {
  item: ServiceItem;
  catTitle: string;
  catColor: string;
  catIcon: string;
}

// Per-service icon — small version for cards
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

// Category sidebar icon (larger)
const CATEGORY_ICON_LG: Record<string, React.ReactNode> = {
  'Palette':    <Palette     className="w-5 h-5" />,
  'Code':       <Code        className="w-5 h-5" />,
  'Smartphone': <Smartphone  className="w-5 h-5" />,
  'ShoppingBag':<ShoppingBag className="w-5 h-5" />,
  'Cpu':        <Cpu         className="w-5 h-5" />,
  'Sparkles':   <Sparkles    className="w-5 h-5" />,
};

// Short taglines per category for the panel header
const CATEGORY_TAGLINES: Record<string, string> = {
  'DESIGN & BRANDING':       'Form meets function. We craft beautiful, conversion-focused brand identities that scale.',
  'WEB DEVELOPMENT':         'High-performance, scalable websites and web apps built with modern, future-proof technologies.',
  'MOBILE APPS':             'Native and cross-platform apps engineered for seamless, hardware-optimized experiences.',
  'E-COMMERCE SOLUTIONS':    'End-to-end online stores designed to convert browsers into buyers at every touchpoint.',
  'TECHNICAL & PERF.':       'Infrastructure, security, and performance tuning that keeps your product fast and bulletproof.',
  'AI & AUTOMATION':         'Intelligent systems and automated workflows that save hours and scale your operations.',
};

export default function ServiceSelector() {
  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<SelectedService | null>(null);

  const categories = SERVICE_CATEGORIES;
  const activeCategory: ServiceCategory = categories[activeCatIndex];

  const openModal = (item: ServiceItem, cat: ServiceCategory) => {
    setSelected({ item, catTitle: cat.title, catColor: cat.color, catIcon: cat.iconName });
    setModalOpen(true);
  };

  return (
    <>
      <div
        className="flex flex-col lg:flex-row rounded-3xl overflow-hidden border border-white/[0.08] shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)' }}
        id="services-catalog"
      >
        {/* ── LEFT SIDEBAR ── */}
        <div
          className="w-full lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.06] p-4 lg:p-6 flex flex-col gap-1"
          style={{ background: 'rgba(0,0,0,0.25)' }}
        >
          <p className="text-[9px] font-mono tracking-[0.35em] uppercase text-white/30 mb-4 px-2">
            Service Categories
          </p>

          {/* Mobile: horizontal scroll */}
          <div className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-none -mx-1 px-1">
            {categories.map((cat, i) => {
              const isActive = i === activeCatIndex;
              const icon = CATEGORY_ICON_LG[cat.iconName] ?? <Compass className="w-5 h-5" />;
              return (
                <motion.button
                  key={cat.title}
                  id={`sidebar-cat-${cat.iconName.toLowerCase()}`}
                  onClick={() => setActiveCatIndex(i)}
                  whileTap={{ scale: 0.97 }}
                  className={`group relative flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-white/45 hover:text-white/75 hover:bg-white/[0.03]'
                  }`}
                  style={isActive ? {
                    background: 'linear-gradient(135deg, rgba(197,160,89,0.12) 0%, rgba(197,160,89,0.04) 100%)',
                    boxShadow: 'inset 0 0 0 1px rgba(197,160,89,0.25)',
                  } : {}}
                >
                  {/* Active left bar */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-bar"
                      className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-[#c5a059]"
                    />
                  )}

                  {/* Icon */}
                  <div className={`shrink-0 transition-colors duration-200 ${isActive ? 'text-[#c5a059]' : 'text-white/35 group-hover:text-white/55'}`}>
                    {icon}
                  </div>

                  {/* Label */}
                  <span className={`text-[12px] font-display font-semibold tracking-wide whitespace-nowrap leading-tight ${isActive ? 'text-white' : ''}`}>
                    {cat.title.split(' & ')[0].replace('TECHNICAL', 'Technical').replace('DESIGN', 'Design & Branding').replace('WEB DEVELOPMENT', 'Web Development').replace('MOBILE APPS', 'Mobile Apps').replace('E-COMMERCE SOLUTIONS', 'E-Commerce').replace('AI', 'AI & Automation').replace('PERF.', '')}
                  </span>

                  <ChevronRight className={`w-3.5 h-3.5 ml-auto shrink-0 transition-opacity ${isActive ? 'opacity-60 text-[#c5a059]' : 'opacity-0 group-hover:opacity-30'}`} />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex-1 min-w-0 p-5 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCatIndex}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {/* Panel header */}
              <div className="flex items-start gap-4 mb-8 pb-6 border-b border-white/[0.06]">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-[#c5a059]"
                  style={{ background: 'linear-gradient(135deg, rgba(197,160,89,0.18), rgba(197,160,89,0.06))', border: '1px solid rgba(197,160,89,0.25)' }}
                >
                  {CATEGORY_ICON_LG[activeCategory.iconName] ?? <Compass className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-display font-bold text-white mb-1 capitalize">
                    {activeCategory.title.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                  </h3>
                  <p className="text-[12px] text-white/45 leading-relaxed max-w-lg">
                    {CATEGORY_TAGLINES[activeCategory.title] ?? 'Premium services tailored to your needs.'}
                  </p>
                </div>
              </div>

              {/* Service cards — 2-column grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeCategory.items.map((item: ServiceItem) => {
                  const icon = SERVICE_ICON_SM[item.name] ?? <Compass className="w-4 h-4" />;
                  return (
                    <motion.div
                      key={item.name}
                      id={`service-card-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      onClick={() => openModal(item, activeCategory)}
                      className="group relative flex flex-col justify-between gap-4 p-5 rounded-2xl border border-white/[0.07] hover:border-[#c5a059]/35 cursor-pointer transition-all duration-250 overflow-hidden"
                      style={{ background: 'rgba(255,255,255,0.025)' }}
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                        style={{ background: 'radial-gradient(ellipse at top right, rgba(197,160,89,0.06) 0%, transparent 65%)' }} />

                      {/* Top: title + check */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-white/50 group-hover:text-[#c5a059] transition-colors duration-200`}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                            {icon}
                          </div>
                          <div>
                            <h4 className="text-[13px] font-display font-bold text-white group-hover:text-[#c5a059] transition-colors duration-200 leading-tight">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-white/45 leading-relaxed mt-1.5 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-[#c5a059]/40 group-hover:text-[#c5a059] transition-colors duration-200 mt-0.5" />
                      </div>

                      {/* Bottom: badge + CTA */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
                        <span className="text-[8px] font-mono tracking-[0.28em] uppercase text-white/25 group-hover:text-[#c5a059]/50 transition-colors">
                          Service Accredited
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.15em] uppercase text-[#c5a059]/60 group-hover:text-[#c5a059] transition-colors font-semibold">
                          Select Plan <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        service={selected?.item ?? null}
        categoryTitle={selected?.catTitle ?? ''}
        categoryColor={selected?.catColor ?? '#c5a059'}
        categoryIcon={selected?.catIcon ?? 'Compass'}
        onBooking={(plan, price) => {
          window.dispatchEvent(new CustomEvent('nexcore:openBooking', { detail: { plan, price } }));
        }}
      />
    </>
  );
}
