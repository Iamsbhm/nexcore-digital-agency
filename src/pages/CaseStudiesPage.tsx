import { motion } from 'motion/react';
import { TrendingUp, Clock, Users } from 'lucide-react';

interface CaseStudiesPageProps {
  openBooking: (plan: string, price: string) => void;
}

const cases = [
  {
    client: 'Apex SaaS Solutions',
    industry: 'SEO · Search Marketing',
    year: '2026',
    gradient: 'from-amber-600/20 to-amber-900/5',
    accent: '#f59e0b',
    challenge: 'Apex SaaS was struggling to capture high-intent Google search leads. Flatlining organic search traffic due to slow LCP loading speeds (4.2s), a lack of structured content clusters, and no schema validation led to high customer acquisition costs (CAC) via paid ads.',
    solution: 'Pixel Vance Digital executed a semantic keyword mapping audit, deployed an optimized Next.js content engine with sub-second LCP (0.8s), integrated structured JSON-LD schema markup, and built 15 high-authority search content clusters linking directly to product pages.',
    results: [
      { metric: '+412%', label: 'Organic Traffic' },
      { metric: '−54%', label: 'Lead Cost (CAC)' },
      { metric: '9.8×', label: 'Google Impressions' },
    ],
  },
  {
    client: 'Aether Finance',
    industry: 'FinTech · SaaS',
    year: '2025',
    gradient: 'from-blue-600/20 to-blue-900/5',
    accent: '#3b82f6',
    challenge: 'Low-converting landing page and poor onboarding UX resulting in 2.1% trial-to-paid rate.',
    solution: 'Full UX audit, redesigned onboarding flow, new pricing page, and speed optimisation from 8s → 1.2s LCP.',
    results: [
      { metric: '3.8×', label: 'Conversion Uplift' },
      { metric: '−62%', label: 'Churn Reduction' },
      { metric: '1.2s', label: 'Page Load Speed' },
    ],
  },
  {
    client: 'Luxe Maison',
    industry: 'E-Commerce · Luxury',
    year: '2024',
    gradient: 'from-[#c5a059]/20 to-[#8c6e3d]/5',
    accent: '#c5a059',
    challenge: 'Generic Shopify theme was misrepresenting a premium brand and causing cart abandonment above 80%.',
    solution: 'Bespoke Shopify theme, product configurator, and trust-building checkout flow redesign.',
    results: [
      { metric: '3×',   label: 'Revenue Growth' },
      { metric: '−23%', label: 'Cart Abandonment' },
      { metric: '$4.2M', label: 'Revenue in 6 Months' },
    ],
  },
  {
    client: 'PulseApp',
    industry: 'Health · Mobile',
    year: '2024',
    gradient: 'from-emerald-600/20 to-emerald-900/5',
    accent: '#10b981',
    challenge: 'Early prototype with confusing navigation and no clear value proposition causing poor App Store ratings.',
    solution: 'Zero-to-one mobile UI redesign with AI-driven personalisation flows and onboarding gamification.',
    results: [
      { metric: '4.8★', label: 'App Store Rating' },
      { metric: '50K+', label: 'Launch Week Downloads' },
      { metric: '+180%', label: 'Day-30 Retention' },
    ],
  },
  {
    client: 'Voss & Co.',
    industry: 'Real Estate · Luxury',
    year: '2023',
    gradient: 'from-purple-600/20 to-purple-900/5',
    accent: '#a855f7',
    challenge: 'Outdated brand identity failing to position the firm at the luxury end of the NYC real estate market.',
    solution: 'Complete rebrand — logo, brand guidelines, website, collateral, and social media visual system.',
    results: [
      { metric: '+240%', label: 'Inbound Leads' },
      { metric: '2×',    label: 'Avg. Deal Size' },
      { metric: '12',    label: 'Press Features' },
    ],
  },
];

export default function CaseStudiesPage({ openBooking }: CaseStudiesPageProps) {
  return (
    <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto pt-8 pb-24 space-y-20">

      {/* ── Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 py-20"
      >
        <span className="text-[9px] font-mono tracking-[0.35em] text-[#c5a059] uppercase">— Real Results —</span>
        <h1 className="text-5xl md:text-7xl font-display font-light text-white leading-[1.08]">
          Client Case <span className="font-serif italic text-[#c5a059]">Studies</span>
        </h1>
        <p className="text-sm text-white/40 max-w-xl mx-auto leading-relaxed">
          Deep dives into how we solve real business challenges with design, engineering, and strategy.
        </p>
      </motion.div>

      {/* ── Cases ── */}
      <div className="space-y-8">
        {cases.map((c, i) => (
          <motion.div
            key={c.client}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/12 transition-all duration-300 group"
          >
            {/* Top header bar */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${c.gradient} opacity-80`} style={{ background: `linear-gradient(to right, ${c.accent}60, transparent)` }} />

            <div className="p-7 md:p-10 grid md:grid-cols-3 gap-10">
              {/* Left: client info */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border" style={{ color: c.accent, borderColor: `${c.accent}40`, backgroundColor: `${c.accent}10` }}>
                      {c.industry}
                    </span>
                    <span className="text-[9px] font-mono text-white/25">{c.year}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-semibold text-white group-hover:text-[#c5a059] transition-colors">{c.client}</h2>
                </div>

                {/* Results metrics */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {c.results.map((r, ri) => (
                    <div key={ri} className="text-center p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                      <span className="text-base font-display font-black text-white block" style={{ color: c.accent }}>{r.metric}</span>
                      <span className="text-[8px] font-mono text-white/30 uppercase tracking-wide block mt-0.5 leading-tight">{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle: challenge */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-white/30" />
                  <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase">The Challenge</span>
                </div>
                <p className="text-sm text-white/45 leading-relaxed">{c.challenge}</p>
              </div>

              {/* Right: solution */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-white/30" />
                  <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase">Our Solution</span>
                </div>
                <p className="text-sm text-white/45 leading-relaxed">{c.solution}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="text-center space-y-5 py-14 border border-white/[0.06] rounded-3xl bg-white/[0.01]">
        <h2 className="text-2xl md:text-3xl font-display font-light text-white">
          Ready to become our <span className="font-serif italic text-[#c5a059]">next success story?</span>
        </h2>
        <button
          onClick={() => openBooking('GROWTH', '$2,999')}
          id="cases-cta-btn"
          className="inline-flex items-center gap-2 py-3 px-8 bg-[#c5a059] hover:bg-transparent border border-[#c5a059] text-black hover:text-white text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
        >
          Book a Strategy Call
        </button>
      </div>
    </div>
  );
}
