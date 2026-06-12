import { motion } from 'motion/react';
import { Clock, ArrowRight } from 'lucide-react';

const posts = [
  {
    category: 'Performance',
    title: 'How to Optimize Next.js Load Times for Sub-Second LCP',
    excerpt: 'A step-by-step technical guide on optimizing Next.js Core Web Vitals. Discover code-splitting, dynamic loading, server component streaming, and asset prefetching strategies.',
    readTime: '9 min read',
    date: 'June 2026',
    gradient: 'from-emerald-600/25 to-transparent',
    accent: '#10b981',
  },
  {
    category: 'UI/UX',
    title: 'Fintech Dashboard Design Best Practices: A UX Case Study',
    excerpt: 'Explore best practices for designing financial analytics dashboards that simplify cognitive complexity. Lessons on layout grids, dynamic sorting, and contextual alerts.',
    readTime: '11 min read',
    date: 'June 2026',
    gradient: 'from-[#c5a059]/25 to-transparent',
    accent: '#c5a059',
  },
  {
    category: 'SEO Strategy',
    title: 'The 2026 Blueprint for Enterprise Organic Traffic Growth',
    excerpt: 'How to structure content and indexation mapping to dominate search rankings. Learn our exact formula for keyword research, semantic styling, and structured JSON-LD schemas.',
    readTime: '8 min read',
    date: 'May 2026',
    gradient: 'from-blue-600/25 to-transparent',
    accent: '#3b82f6',
  },
  {
    category: 'Design Systems',
    title: 'How We Build Design Systems That Scale to 1000+ Components',
    excerpt: 'A behind-the-scenes look at the tokenisation strategy, naming conventions, and Figma architecture we use for enterprise-grade design systems.',
    readTime: '8 min read',
    date: 'May 2025',
    gradient: 'from-blue-600/25 to-transparent',
    accent: '#3b82f6',
  },
  {
    category: 'AI & Automation',
    title: 'Integrating GPT-4 into Client Workflows: Lessons from 12 Projects',
    excerpt: 'Real-world patterns, pitfalls, and results from building AI automation pipelines for clients across fintech, e-commerce, and SaaS.',
    readTime: '12 min read',
    date: 'Apr 2025',
    gradient: 'from-purple-600/25 to-transparent',
    accent: '#a855f7',
  },
  {
    category: 'CRO',
    title: 'The 7 Landing Page Elements We Test on Every Project',
    excerpt: 'After 500+ projects, these are the highest-leverage conversion rate optimisation experiments we run before anything else.',
    readTime: '6 min read',
    date: 'Mar 2025',
    gradient: 'from-[#c5a059]/25 to-transparent',
    accent: '#c5a059',
  },
  {
    category: 'Engineering',
    title: 'Why We Moved All Client Projects to a Monorepo Architecture',
    excerpt: 'The decision that saved our team 40+ hours per month — and how shared tooling made every project faster to ship.',
    readTime: '10 min read',
    date: 'Feb 2025',
    gradient: 'from-emerald-600/25 to-transparent',
    accent: '#10b981',
  },
  {
    category: 'Branding',
    title: 'Logo Design in 2025: What Actually Matters (And What Doesn\'t)',
    excerpt: 'Forget the trends. Here\'s the framework we use to build brand marks that stay relevant for 10+ years.',
    readTime: '7 min read',
    date: 'Jan 2025',
    gradient: 'from-rose-600/25 to-transparent',
    accent: '#f43f5e',
  },
  {
    category: 'Performance',
    title: 'How We Achieved 100/100 Lighthouse Scores on a Shopify Store',
    excerpt: 'Step-by-step breakdown of the image, JavaScript, and font optimisations that took a luxury store from 28 to 100.',
    readTime: '9 min read',
    date: 'Dec 2024',
    gradient: 'from-amber-600/25 to-transparent',
    accent: '#f59e0b',
  },
];

export default function BlogPage() {
  return (
    <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto pt-8 pb-24 space-y-16">

      {/* ── Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 py-20"
      >
        <span className="text-[9px] font-mono tracking-[0.35em] text-[#c5a059] uppercase">— Insights & Engineering —</span>
        <h1 className="text-5xl md:text-7xl font-display font-light text-white leading-[1.08]">
          Engineering <span className="font-serif italic text-[#c5a059]">Blog</span>
        </h1>
        <p className="text-sm text-white/40 max-w-xl mx-auto leading-relaxed">
          Deep dives into design, engineering, and the strategies behind high-performing digital products.
        </p>
      </motion.div>

      {/* ── Featured Post ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-[#c5a059]/25 transition-all duration-300 cursor-pointer"
      >
        <div className="h-2 w-full" style={{ background: 'linear-gradient(to right, #c5a059aa, transparent)' }} />
        <div className="p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-mono px-2.5 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/25 text-[#c5a059]">Featured · {posts[0].category}</span>
              <span className="text-[9px] font-mono text-white/25">{posts[0].date}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-white group-hover:text-[#c5a059] transition-colors leading-snug">
              {posts[0].title}
            </h2>
            <p className="text-sm text-white/40 leading-relaxed">{posts[0].excerpt}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-white/30">
                <Clock className="w-3 h-3" />
                <span className="text-[10px] font-mono">{posts[0].readTime}</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#c5a059] group-hover:gap-3 transition-all">
                Read Article <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
          {/* Visual */}
          <div className={`h-52 rounded-xl bg-gradient-to-br ${posts[0].gradient} border border-white/[0.06] relative overflow-hidden flex items-center justify-center`}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDBNIDAgMjAgTCA0MCAyMCBNIDIwIDAgTCAyMCA0MCBNIDAgMzAgTCA0MCAzMCBNIDMwIDAgTCAzMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-70" />
            <span className="font-mono text-5xl font-black text-white/10 select-none">01</span>
          </div>
        </div>
      </motion.div>

      {/* ── Posts Grid ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(1).map((post, i) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="group bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/12 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            {/* Top accent line */}
            <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${post.accent}80, transparent)` }} />

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className="text-[9px] font-mono px-2 py-0.5 rounded-full border"
                  style={{ color: post.accent, borderColor: `${post.accent}40`, backgroundColor: `${post.accent}10` }}
                >
                  {post.category}
                </span>
                <span className="text-[9px] font-mono text-white/25">{post.date}</span>
              </div>
              <h3 className="text-sm font-display font-semibold text-white leading-snug group-hover:text-[#c5a059] transition-colors">
                {post.title}
              </h3>
              <p className="text-[11px] text-white/35 leading-relaxed line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5 text-white/25">
                  <Clock className="w-3 h-3" />
                  <span className="text-[10px] font-mono">{post.readTime}</span>
                </div>
                <span className="text-[10px] font-mono text-white/30 group-hover:text-[#c5a059] transition-colors flex items-center gap-1">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
