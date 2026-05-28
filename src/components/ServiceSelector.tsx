/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICE_CATEGORIES } from '../data';
import { ServiceItem, ServiceCategory } from '../types';
import { Search, Compass, Palette, Code, Smartphone, ShoppingBag, Cpu, Sparkles } from 'lucide-react';
import ServiceModal from './ServiceModal';

// Define what we track when a card is clicked
interface SelectedService {
  item: ServiceItem;
  catTitle: string;
  catColor: string;
  catIcon: string;
}

export default function ServiceSelector() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [hoverItem, setHoverItem] = useState<string | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<SelectedService | null>(null);

  // Booking callback wired in from App – we pass a no-op here;
  // the real openBooking is threaded via props below.
  const [onBooking, setOnBooking] = useState<(plan: string, price: string) => void>(() => () => {});

  const categories = useMemo(() => SERVICE_CATEGORIES, []);

  // Icon mapping helper
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {items.map((item) => {
                      const isHovering = hoverItem === item.name;
                      return (
                        <motion.div
                          key={item.name}
                          id={`service-card-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                          onClick={() => openModal(item, category)}
                          onMouseEnter={() => setHoverItem(item.name)}
                          onMouseLeave={() => setHoverItem(null)}
                          whileHover={{ y: -3 }}
                          className={`group p-4 bg-white/[0.012] border rounded-xl cursor-pointer flex flex-col gap-3 relative overflow-hidden transition-all duration-300 ${
                            isHovering
                              ? 'border-[#c5a059]/30 bg-white/[0.03] shadow-[0_8px_32px_rgba(197,160,89,0.08)]'
                              : 'border-white/[0.06] hover:border-white/15'
                          }`}
                        >
                          {/* Gold top accent bar */}
                          <div
                            className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
                            style={{ background: 'linear-gradient(to right,#c5a059,transparent)', opacity: isHovering ? 1 : 0 }}
                          />

                          {/* Dot indicator top-right */}
                          <div className="absolute top-3 right-3">
                            <span
                              className="w-2 h-2 rounded-full block transition-all duration-300"
                              style={{
                                backgroundColor: isHovering ? '#c5a059' : 'rgba(255,255,255,0.1)',
                                transform: isHovering ? 'scale(1.3)' : 'scale(1)'
                              }}
                            />
                          </div>

                          {/* Top: label + title */}
                          <div className="space-y-1 pr-5">
                            <span className="text-[9px] font-mono font-bold text-white/25 uppercase tracking-[0.2em]">● SERVICE</span>
                            <h4 className={`text-[13px] font-display font-bold tracking-wide transition-colors duration-200 leading-snug ${
                              isHovering ? 'text-[#c5a059]' : 'text-white'
                            }`}>
                              {item.name}
                            </h4>
                          </div>

                          {/* Description */}
                          <p className="text-[11px] text-white/40 leading-relaxed line-clamp-3 flex-1">{item.description}</p>

                          {/* View Details row — always in flow, fades in */}
                          <div className={`flex items-center gap-1.5 transition-opacity duration-200 ${
                            isHovering ? 'opacity-100' : 'opacity-0'
                          }`}>
                            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#c5a059]">
                              View Details →
                            </span>
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
          // Bubble up to App's openBooking via a custom event
          window.dispatchEvent(new CustomEvent('nexcore:openBooking', { detail: { plan, price } }));
        }}
      />
    </>
  );
}
