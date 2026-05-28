import { motion } from 'motion/react';
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface PortfolioPageProps {
  openBooking: (plan: string, price: string) => void;
}

const categories = ['All', 'Branding', 'Web', 'Mobile', 'UI/UX'];

const projects = [
  {
    title: 'Aether Finance',
    category: 'Web',
    tags: ['React', 'TailwindCSS', 'Framer Motion'],
    desc: 'High-converting SaaS dashboard for a fintech startup targeting the US market.',
    gradient: 'from-blue-600/30 via-blue-900/20 to-transparent',
    accent: '#3b82f6',
    year: '2025',
  },
  {
    title: 'Voss & Co. Rebrand',
    category: 'Branding',
    tags: ['Logo', 'Identity', 'Print'],
    desc: 'Full brand overhaul for a luxury real estate firm — identity, stationery, signage.',
    gradient: 'from-[#c5a059]/30 via-[#8c6e3d]/15 to-transparent',
    accent: '#c5a059',
    year: '2025',
  },
  {
    title: 'PulseApp',
    category: 'Mobile',
    tags: ['iOS', 'Android', 'React Native'],
    desc: 'AI-powered health tracking app with 50K+ downloads on launch week.',
    gradient: 'from-emerald-600/30 via-emerald-900/15 to-transparent',
    accent: '#10b981',
    year: '2024',
  },
  {
    title: 'Orbit SaaS Platform',
    category: 'UI/UX',
    tags: ['Figma', 'Design System', 'Prototyping'],
    desc: 'End-to-end design for a B2B project management SaaS — 120+ screens.',
    gradient: 'from-purple-600/30 via-purple-900/15 to-transparent',
    accent: '#a855f7',
    year: '2024',
  },
  {
    title: 'Luxe Maison',
    category: 'Web',
    tags: ['Next.js', 'Shopify', 'CRO'],
    desc: 'Premium e-commerce experience for a luxury home goods brand. 3× conversion uplift.',
    gradient: 'from-rose-600/25 via-rose-900/15 to-transparent',
    accent: '#f43f5e',
    year: '2024',
  },
  {
    title: 'NovaMark Agency',
    category: 'Branding',
    tags: ['Brand Strategy', 'Logo', 'Guidelines'],
    desc: 'Complete visual identity for a performance marketing agency in Austin, TX.',
    gradient: 'from-amber-600/25 via-amber-900/15 to-transparent',
    accent: '#f59e0b',
    year: '2023',
  },
];

export default function PortfolioPage({ openBooking }: PortfolioPageProps) {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto pt-8 pb-24 space-y-16">

      {/* ── Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 py-20"
      >
        <span className="text-[9px] font-mono tracking-[0.35em] text-[#c5a059] uppercase">— Our Work —</span>
        <h1 className="text-5xl md:text-7xl font-display font-light text-white leading-[1.08]">
          Design Portfolio
        </h1>
        <p className="text-sm text-white/40 max-w-xl mx-auto leading-relaxed">
          A curated selection of projects where creativity meets engineering precision.
        </p>
      </motion.div>

      {/* ── Filter Tabs ── */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer border ${
              active === cat
                ? 'bg-[#c5a059] border-[#c5a059] text-black'
                : 'border-white/10 text-white/40 hover:border-[#c5a059]/40 hover:text-[#c5a059]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, i) => (
          <motion.div
            key={project.title}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="group bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Visual placeholder */}
            <div className={`h-44 bg-gradient-to-br ${project.gradient} relative flex items-end p-5`}>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDBNIDAgMjAgTCA0MCAyMCBNIDIwIDAgTCAyMCA0MCBNIDAgMzAgTCA0MCAzMCBNIDMwIDAgTCAzMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDQiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-60" />
              <div className="relative z-10 flex items-center justify-between w-full">
                <span className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border" style={{ color: project.accent, borderColor: `${project.accent}40`, backgroundColor: `${project.accent}10` }}>
                  {project.category}
                </span>
                <span className="text-[9px] font-mono text-white/30">{project.year}</span>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl border flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity" style={{ borderColor: project.accent }}>
                <ExternalLink className="w-6 h-6" style={{ color: project.accent }} />
              </div>
            </div>

            {/* Info */}
            <div className="p-5 space-y-3">
              <h3 className="text-base font-display font-semibold text-white group-hover:text-[#c5a059] transition-colors">{project.title}</h3>
              <p className="text-[11px] text-white/35 leading-relaxed">{project.desc}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-mono text-white/30 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── CTA ── */}
      <div className="text-center space-y-5 py-14 border border-white/[0.06] rounded-3xl bg-white/[0.01]">
        <h2 className="text-2xl md:text-3xl font-display font-light text-white">
          Want us to build something <span className="font-serif italic text-[#c5a059]">extraordinary?</span>
        </h2>
        <button
          onClick={() => openBooking('GROWTH', '$2,999')}
          id="portfolio-cta-btn"
          className="inline-flex items-center gap-2 py-3 px-8 bg-[#c5a059] hover:bg-transparent border border-[#c5a059] text-black hover:text-white text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
        >
          Start Your Project
        </button>
      </div>
    </div>
  );
}
