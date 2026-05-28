/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICE_CATEGORIES } from '../data';
import { ServiceItem, ServiceCategory } from '../types';
import {
  Search, Compass,
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

// Per-service icon map — unique relevant icon for every single service
const SERVICE_ICON_MAP: Record<string, React.ReactNode> = {
  // DESIGN & BRANDING
  'Logo Design':              <PenTool className="w-5 h-5" />,
  'Brand Identity Packages':  <Layers className="w-5 h-5" />,
  'UI Design':                <LayoutTemplate className="w-5 h-5" />,
  'UX Design':                <UserCheck className="w-5 h-5" />,
  'Graphic Design':           <Image className="w-5 h-5" />,
  'Social Media Design':      <Instagram className="w-5 h-5" />,
  'Presentation Design':      <Presentation className="w-5 h-5" />,
  'Motion Graphics':          <Clapperboard className="w-5 h-5" />,
  // WEB DEVELOPMENT
  'Website Development':      <Globe className="w-5 h-5" />,
  'Landing Page Development': <MousePointerClick className="w-5 h-5" />,
  'Web App Development':      <AppWindow className="w-5 h-5" />,
  'WordPress Development':    <Globe2 className="w-5 h-5" />,
  'Webflow Development':      <Workflow className="w-5 h-5" />,
  'API Development':          <Plug2 className="w-5 h-5" />,
  'Progressive Web Apps':     <Wifi className="w-5 h-5" />,
  'Website Redesign':         <RefreshCw className="w-5 h-5" />,
  // MOBILE APPS
  'iOS App Development':      <Apple className="w-5 h-5" />,
  'Android App Development':  <Smartphone className="w-5 h-5" />,
  'Cross-Platform Apps':      <Tablets className="w-5 h-5" />,
  'App UI/UX Design':         <Blend className="w-5 h-5" />,
  'App Maintenance':          <Wrench className="w-5 h-5" />,
  // E-COMMERCE
  'Shopify Store Setup':              <Store className="w-5 h-5" />,
  'E-commerce Website':               <ShoppingCart className="w-5 h-5" />,
  'WooCommerce Development':          <ShoppingBag className="w-5 h-5" />,
  'Product Listing Optimization':     <Tag className="w-5 h-5" />,
  'Payment Gateway Integration':      <CreditCard className="w-5 h-5" />,
  'Dropshipping Store Setup':         <Package className="w-5 h-5" />,
  // TECHNICAL & PERF.
  'Website Maintenance':   <ShieldCheck className="w-5 h-5" />,
  'Speed Optimization':    <Zap className="w-5 h-5" />,
  'UX Audit':              <ClipboardList className="w-5 h-5" />,
  'Website Security':      <Lock className="w-5 h-5" />,
  'Cloud Hosting Setup':   <Cloud className="w-5 h-5" />,
  'Database Design':       <Database className="w-5 h-5" />,
  'DevOps & CI/CD':        <GitBranch className="w-5 h-5" />,
  'Chatbot Development':   <Bot className="w-5 h-5" />,
  // AI & AUTOMATION
  'AI Chatbot Integration':  <MessageSquare className="w-5 h-5" />,
  'AI Content Generation':   <FileText className="w-5 h-5" />,
  'Workflow Automation':     <Repeat2 className="w-5 h-5" />,
  'CRM Setup & Automation':  <Users className="w-5 h-5" />,
  'AI-Powered SEO Tools':    <BarChart2 className="w-5 h-5" />,
  'Custom GPT / AI Agents':  <BrainCircuit className="w-5 h-5" />,
};

// Category header icon map
const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Palette':     return <Palette     className="w-5 h-5" />;
    case 'Code':        return <Code        className="w-5 h-5" />;
    case 'Smartphone':  return <Smartphone  className="w-5 h-5" />;
    case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
    case 'Cpu':         return <Cpu         className="w-5 h-5" />;
    case 'Sparkles':    return <Sparkles    className="w-5 h-5" />;
    default:            return <Compass     className="w-5 h-5" />;
  }
};

export default function ServiceSelector() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<SelectedService | null>(null);

  const categories = useMemo(() => SERVICE_CATEGORIES, []);
  const divisionPills = useMemo(() => ['ALL', ...categories.map(c => c.title)], [categories]);

  const filteredData = useMemo(() => {
    let result: { category: ServiceCategory; items: ServiceItem[] }[] = [];
    categories.forEach(cat => {
      if (selectedCategory !== 'ALL' && cat.title !== selectedCategory) return;
      const matchingItems = cat.items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchingItems.length > 0) result.push({ category: cat, items: matchingItems });
    });
    return result;
  }, [selectedCategory, searchTerm, categories]);

  const openModal = (item: ServiceItem, cat: ServiceCategory) => {
    setSelected({ item, catTitle: cat.title, catColor: cat.color, catIcon: cat.iconName });
    setModalOpen(true);
  };

  return (
    <>
      <div className="space-y-8" id="services-catalog">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none shrink-0 -mx-4 px-4 md:mx-0 md:px-0">
            {divisionPills.map((pill) => {
              const isActive = selectedCategory === pill;
              const titleLabel = pill === 'ALL' ? 'ALL DIVISIONS' : pill;
              return (
                <button
                  key={pill}
                  onClick={() => setSelectedCategory(pill)}
                  id={`pill-filter-${pill.replace(/\s+/g, '-').toLowerCase()}`}
                  className={`py-1.5 px-3.5 rounded-full text-[11px] font-mono tracking-wider font-bold uppercase transition-all shrink-0 ${
                    isActive
                      ? 'bg-[#c5a059] text-black shadow-[0_0_20px_rgba(197,160,89,0.3)]'
                      : 'bg-white/[0.02] text-white/50 border border-white/5 hover:border-[#c5a059]/30 hover:text-white'
                  }`}
                >
                  {titleLabel}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              className="w-full text-xs bg-white/[0.01] border border-white/5 md:border-white/10 focus:border-[#c5a059]/50 hover:border-white/25 rounded-md py-2.5 pl-9 pr-4 text-white placeholder-white/30 outline-none transition-all font-sans"
              placeholder="Search services or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="service-search-input"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredData.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-16 border border-white/5 rounded-2xl bg-white/[0.01]"
                id="services-no-results"
              >
                <Compass className="w-8 h-8 text-white/20 mx-auto mb-3 animate-spin" style={{ animationDuration: '6s' }} />
                <p className="text-white/60 font-medium">No services match your key filters.</p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('ALL'); }}
                  id="reset-search-btn"
                  className="mt-3 text-xs text-[#c5a059] hover:underline font-mono"
                >
                  Reset Search Filters
                </button>
              </motion.div>
            ) : (
              filteredData.map(({ category, items }) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                  id={`division-section-${category.title.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  {/* Section Header */}
                  <div className="flex items-center gap-3 pb-2 border-b border-white/[0.06]">
                    <div className="p-1.5 rounded bg-[#c5a059]/10 text-[#c5a059]">
                      {getCategoryIcon(category.iconName)}
                    </div>
                    <h3 className="text-xs font-mono font-bold uppercase text-white/70 tracking-widest">
                      {category.title}
                    </h3>
                    <div className="flex-1 h-[1px] bg-white/[0.05]" />
                    <span className="text-[10px] font-mono text-white/35">{items.length} Modules</span>
                  </div>

                  {/* Cards grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {items.map((item) => {
                      const isHovering = hoverItem === item.name;
                      const serviceIcon = SERVICE_ICON_MAP[item.name] ?? getCategoryIcon(category.iconName);
                      return (
                        <motion.div
                          key={item.name}
                          id={`service-card-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                          onClick={() => openModal(item, category)}
                          onMouseEnter={() => setHoverItem(item.name)}
                          onMouseLeave={() => setHoverItem(null)}
                          whileHover={{ y: -5, scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                          className={`group relative p-5 rounded-2xl cursor-pointer flex flex-col gap-4 overflow-hidden border transition-all duration-300 ${
                            isHovering
                              ? 'bg-gradient-to-br from-[#c5a059]/10 via-[#c5a059]/[0.05] to-transparent border-[#c5a059]/40 shadow-[0_12px_40px_rgba(197,160,89,0.15)]'
                              : 'bg-white/[0.04] border-white/[0.12] hover:border-white/25'
                          }`}
                        >
                          {/* Glow background on hover */}
                          <div
                            className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
                            style={{
                              background: 'radial-gradient(ellipse at top left, rgba(197,160,89,0.1) 0%, transparent 60%)',
                              opacity: isHovering ? 1 : 0,
                            }}
                          />

                          {/* Top gold bar */}
                          <div
                            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-opacity duration-300"
                            style={{
                              background: 'linear-gradient(to right, #c5a059, rgba(197,160,89,0.3), transparent)',
                              opacity: isHovering ? 1 : 0.3,
                            }}
                          />

                          {/* Icon + category badge row */}
                          <div className="flex items-start justify-between relative">
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              isHovering
                                ? 'bg-[#c5a059]/20 text-[#c5a059] shadow-[0_0_16px_rgba(197,160,89,0.25)]'
                                : 'bg-white/[0.07] text-white/60'
                            }`}>
                              {serviceIcon}
                            </div>

                            {/* Dot status */}
                            <div className={`w-2 h-2 rounded-full mt-1 transition-all duration-300 ${
                              isHovering ? 'bg-[#c5a059] shadow-[0_0_8px_rgba(197,160,89,0.8)]' : 'bg-white/20'
                            }`} />
                          </div>

                          {/* Title + description */}
                          <div className="space-y-2 relative flex-1">
                            <h4 className={`text-[13px] font-display font-bold leading-tight tracking-wide transition-colors duration-200 ${
                              isHovering ? 'text-[#c5a059]' : 'text-white'
                            }`}>
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-white/55 leading-relaxed line-clamp-2">
                              {item.description}
                            </p>
                          </div>

                          {/* Footer — View Details */}
                          <div className={`relative flex items-center gap-2 transition-all duration-200 ${
                            isHovering ? 'opacity-100' : 'opacity-0 translate-y-1'
                          }`}>
                            <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#c5a059] font-semibold">
                              View Details
                            </span>
                            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#c5a059]/50 to-transparent" />
                            <span className="text-[#c5a059] text-xs">→</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))
            )}
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
