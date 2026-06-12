import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Clock, ArrowRight, ArrowLeft } from 'lucide-react';

interface PostContentBlock {
  type: 'p' | 'h2' | 'h3' | 'code' | 'ul' | 'quote';
  text: string | string[];
}

const posts = [
  {
    category: 'Performance',
    title: 'How to Optimize Next.js Load Times for Sub-Second LCP',
    excerpt: 'A step-by-step technical guide on optimizing Next.js Core Web Vitals. Discover code-splitting, dynamic loading, server component streaming, and asset prefetching strategies.',
    readTime: '9 min read',
    date: 'June 2026',
    gradient: 'from-emerald-600/25 to-transparent',
    accent: '#10b981',
    content: [
      { type: 'p', text: 'Largest Contentful Paint (LCP) is one of the most critical Core Web Vitals metrics monitored by Google. It tracks how quickly the main content of a page is rendered. While Google benchmarks 2.5 seconds as "Good", aiming for a sub-second LCP (under 1.0s) puts your website in the top tier, significantly improving organic search rankings and decreasing user bounce rates.' },
      { type: 'h2', text: '1. Lazy Loading Non-Critical Components' },
      { type: 'p', text: 'By default, Next.js packages all imports into the main page bundle. For heavy interactive widgets, maps, or modals, this is highly inefficient. You should load them dynamically on demand using next/dynamic:' },
      { type: 'code', text: `import dynamic from 'next/dynamic';\n\nconst InteractiveConsole = dynamic(() => import('@/components/SpatialConsole'), {\n  ssr: false,\n  loading: () => <div className="h-48 animate-pulse bg-white/5 rounded-2xl" />\n});` },
      { type: 'h2', text: '2. Optimizing the Image Delivery Pipeline' },
      { type: 'p', text: 'Unoptimized images are the primary cause of slow LCP. Utilize the next/image component to automatically serve WebP/AVIF formats, scale sizes dynamically, and prevent layout shifts. For primary hero graphics, always attach the priority property to prefetch them:' },
      { type: 'code', text: `<Image\n  src="/images/hero_visual.png"\n  alt="Hero Showcase"\n  width={1200}\n  height={630}\n  priority\n  className="object-cover"\n/>` },
      { type: 'h2', text: '3. Streaming Server Components' },
      { type: 'p', text: 'With Next.js App Router, you can stream slow data fetch actions. Wrap dynamic parts in React Suspense. This lets the server deliver the HTML shell instantly while the client streams and inflates components as their queries resolve:' },
      { type: 'code', text: `<Suspense fallback={<LoadingSkeleton />}>\n  <DynamicMetricsGrid />\n</Suspense>` },
      { type: 'h2', text: 'Summary Checklist' },
      { type: 'ul', text: [
        'Dynamic import for heavy third-party libs (charts, map components).',
        'Enable preconnect link elements in the document head for DNS resolution.',
        'Use priority on any above-the-fold image layout block.',
        'Configure local font-preloading to eliminate layout shifts (CLS).'
      ]}
    ]
  },
  {
    category: 'UI/UX',
    title: 'Fintech Dashboard Design Best Practices: A UX Case Study',
    excerpt: 'Explore best practices for designing financial analytics dashboards that simplify cognitive complexity. Lessons on layout grids, dynamic sorting, and contextual alerts.',
    readTime: '11 min read',
    date: 'June 2026',
    gradient: 'from-[#c5a059]/25 to-transparent',
    accent: '#c5a059',
    content: [
      { type: 'p', text: 'Financial software often fails because it overwhelms users. In fintech design, the core challenge is taking complex datasets—cash flow sheets, live stocks, asset transaction logs—and translating them into a visually digestible layout that minimizes cognitive load.' },
      { type: 'h2', text: '1. The Golden Quad Rule of Dashboard Grids' },
      { type: 'p', text: 'Users scan screens in an F-shaped pattern. Place the absolute high-level status numbers (e.g., Total Net Balance, Active Yields) in the top-left section. Historical charts should occupy the middle columns, while long detail lists are reserved for the bottom or side tables.' },
      { type: 'h2', text: '2. Progressive Disclosure vs. Over-Notification' },
      { type: 'p', text: 'Avoid listing everything on a single panel. Use progressive disclosure: display high-level summaries first, and allow detailed log drilling only when the user clicks a card. This keeps the default screen layout clean and focused.' },
      { type: 'quote', text: '"Complexity is fine; confusion is not. Progressive disclosure ensures that data is shown only at the moment of need, protecting the user from decision fatigue."' },
      { type: 'h2', text: '3. Designing Contextual Color Indicators' },
      { type: 'p', text: 'Every color in a financial dashboard must have a specific purpose. Use soft, non-saturated tones. Green should strictly denote upward growth, and red should highlight transactions requiring urgent attention. Neutral slate tones are best for default states and label styling.' }
    ]
  },
  {
    category: 'SEO Strategy',
    title: 'The 2026 Blueprint for Enterprise Organic Traffic Growth',
    excerpt: 'How to structure content and indexation mapping to dominate search rankings. Learn our exact formula for keyword research, semantic styling, and structured JSON-LD schemas.',
    readTime: '8 min read',
    date: 'May 2026',
    gradient: 'from-blue-600/25 to-transparent',
    accent: '#3b82f6',
    content: [
      { type: 'p', text: 'As AI search integrations (like Google SGE) take over, traditional keyword stuffing is completely dead. Enterprise organic traffic growth now depends on establishing semantic authority, structuring pages cleanly, and publishing detailed, original technical content.' },
      { type: 'h2', text: '1. Structured Data Rich Snippets (JSON-LD)' },
      { type: 'p', text: 'Search crawlers need programmatic structure to map who you are. Implementing structured schema scripts in your HTML head lets crawlers serve rich snippets (star ratings, site links, pricing tiers) directly in search pages, increasing click-through rates by up to 30%:' },
      { type: 'code', text: `<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "name": "Pixel Vance",\n  "url": "https://www.pixelvancedigital.com"\n}\n</script>` },
      { type: 'h2', text: '2. Core Web Vitals as a Ranking Vector' },
      { type: 'p', text: 'Google prioritizes user experience as a ranking factor. Slow, laggy pages drive users back to search results, signaling poor page quality. A fast, sub-second LCP and low Interaction to Next Paint (INP) directly boost your search rankings.' },
      { type: 'h2', text: '3. Semantic Content Hubs' },
      { type: 'p', text: 'Instead of scattershot articles, build clusters around core pillars. For instance, link multiple specific articles on React rendering (SSR, static generation, hydrate) back to a single parent page. This signals comprehensive domain authority to Google.' }
    ]
  },
  {
    category: 'Design Systems',
    title: 'How We Build Design Systems That Scale to 1000+ Components',
    excerpt: 'A behind-the-scenes look at the tokenisation strategy, naming conventions, and Figma architecture we use for enterprise-grade design systems.',
    readTime: '8 min read',
    date: 'May 2025',
    gradient: 'from-blue-600/25 to-transparent',
    accent: '#3b82f6',
    content: [
      { type: 'p', text: 'Scale is the ultimate test of a design system. Naming variables and components haphazardly leads to fragmentation, duplicate assets, and developers abandoning the design system. Here is our checklist for structuring enterprise systems.' },
      { type: 'h2', text: '1. Structuring Semantic Design Tokens' },
      { type: 'p', text: 'Design tokens map core visual assets (colors, padding, roundness) to variables. Organize them in three tiers: Global (raw color palettes), Alias (semantic meanings like color-background-primary), and Component (specific overrides).' },
      { type: 'h2', text: '2. Component Taxonomy & Variant Properties' },
      { type: 'p', text: 'Avoid creating separate assets for minor variations. Use Figma component properties to configure toggles (like hasIcon) and text slots. This cuts catalog weight by 70%, keeping both design files and codebases clean.' }
    ]
  },
  {
    category: 'AI & Automation',
    title: 'Integrating GPT-4 into Client Workflows: Lessons from 12 Projects',
    excerpt: 'Real-world patterns, pitfalls, and results from building AI automation pipelines for clients across fintech, e-commerce, and SaaS.',
    readTime: '12 min read',
    date: 'Apr 2025',
    gradient: 'from-purple-600/25 to-transparent',
    accent: '#a855f7',
    content: [
      { type: 'p', text: 'AI integration has shifted from simple chatbots to complex workflow automation. Having built 12 production-grade AI pipelines for various clients, we have compiled the key architectural rules for stable, cost-effective deployments.' },
      { type: 'h2', text: '1. Restricting LLM Output Structure' },
      { type: 'p', text: 'Raw string responses from LLMs are notoriously fragile to parse in code. Always enforce structured outputs (like JSON schemas) or use function-calling APIs to ensure outputs conform to your system requirements.' },
      { type: 'h2', text: '2. Implementing Fallbacks & Guardrails' },
      { type: 'p', text: 'LLMs can hallucinate or fail. Always configure fallback checks, timeout rules, and strict validation layers. If the structured response fails validation, retry with a correction prompt or route the task to a manual review queue.' }
    ]
  },
  {
    category: 'CRO',
    title: 'The 7 Landing Page Elements We Test on Every Project',
    excerpt: 'After 500+ projects, these are the highest-leverage conversion rate optimisation experiments we run before anything else.',
    readTime: '6 min read',
    date: 'Mar 2025',
    gradient: 'from-[#c5a059]/25 to-transparent',
    accent: '#c5a059',
    content: [
      { type: 'p', text: 'Traffic without conversion is just wasted budget. After designing and shipping 500+ landing pages, we have identified 7 conversion rate optimization (CRO) elements that consistently yield the highest returns.' },
      { type: 'h2', text: '1. Above-the-Fold Value Proposition' },
      { type: 'p', text: 'You have less than 5 seconds to capture a user\'s attention. State exactly what you solve, who you solve it for, and the immediate benefit. Keep paragraphs under 3 lines and CTA buttons highly visible.' },
      { type: 'h2', text: '2. Social Proof & Micro-interactions' },
      { type: 'p', text: 'Show reviews, client logos, and numeric stats directly under your primary header. Use subtle interactive fade-ins to draw attention to metrics without distracting the user from the content.' }
    ]
  },
  {
    category: 'Engineering',
    title: 'Why We Moved All Client Projects to a Monorepo Architecture',
    excerpt: 'The decision that saved our team 40+ hours per month — and how shared tooling made every project faster to ship.',
    readTime: '10 min read',
    date: 'Feb 2025',
    gradient: 'from-emerald-600/25 to-transparent',
    accent: '#10b981',
    content: [
      { type: 'p', text: 'Maintaining separate repositories for website code, server components, and design libraries creates massive overhead. Moving to a monorepo setup saved our team over 40 hours of maintenance work every month.' },
      { type: 'h2', text: '1. Shared Tools & Linters' },
      { type: 'p', text: 'With a monorepo (using Turborepo or pnpm workspaces), linting profiles, code formats, and tsconfig profiles are defined globally. When shared packages or utilities are updated, dependencies recompile instantly across all apps.' }
    ]
  },
  {
    category: 'Branding',
    title: 'Logo Design in 2025: What Actually Matters (And What Doesn\'t)',
    excerpt: 'Forget the trends. Here\'s the framework we use to build brand marks that stay relevant for 10+ years.',
    readTime: '7 min read',
    date: 'Jan 2025',
    gradient: 'from-rose-600/25 to-transparent',
    accent: '#f43f5e',
    content: [
      { type: 'p', text: 'A great logo isn\'t a pretty illustration; it is a visual identifier. In a crowded digital market, the best brand marks prioritize clarity and adaptability across different platforms.' },
      { type: 'h2', text: '1. Designing for the App Icon Grid' },
      { type: 'p', text: 'Always test logo concepts in a 16x16 pixel grid. If the icon loses detail or becomes unreadable at small sizes, it will fail as a favicon, social avatar, or app icon. Keep geometry minimal and bold.' }
    ]
  },
  {
    category: 'Performance',
    title: 'How We Achieved 100/100 Lighthouse Scores on a Shopify Store',
    excerpt: 'Step-by-step breakdown of the image, JavaScript, and font optimisations that took a luxury store from 28 to 100.',
    readTime: '9 min read',
    date: 'Dec 2024',
    gradient: 'from-amber-600/25 to-transparent',
    accent: '#f59e0b',
    content: [
      { type: 'p', text: 'E-commerce conversion rates drop by 7% for every 100ms of latency. We audited a premium Shopify store and optimized its performance profile from a Lighthouse score of 28 to a perfect 100.' },
      { type: 'h2', text: '1. Eliminating App Code Bloat' },
      { type: 'p', text: 'Shopify extensions inject multiple blocking scripts into the document head. Audit app usage and lazy-load third-party tracking scripts until after the user first interacts with the page.' }
    ]
  }
];

interface BlogArticleProps {
  post: typeof posts[0];
  onBack: () => void;
  openBooking: (plan: string, price: string) => void;
}

function BlogArticleView({ post, onBack, openBooking }: BlogArticleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8 max-w-3xl mx-auto text-left"
    >
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-white/50 hover:text-[#c5a059] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </button>
        <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase">
          Article / {post.category}
        </span>
      </div>

      {/* Article Header */}
      <div className="space-y-4 pt-4">
        <span 
          className="text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border inline-block" 
          style={{ color: post.accent, borderColor: `${post.accent}40`, backgroundColor: `${post.accent}15` }}
        >
          {post.category}
        </span>
        <h1 className="text-3xl md:text-5xl font-display font-semibold text-white leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-white/40 text-[10px] font-mono pt-2">
          <span>{post.date}</span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>
      </div>

      {/* Accent line divider */}
      <div className="h-[2px] w-full rounded-full" style={{ background: `linear-gradient(to right, ${post.accent}, transparent)` }} />

      {/* Article Content Render */}
      <div className="space-y-6 text-white/70 font-sans leading-relaxed text-sm md:text-base">
        {post.content.map((block, index) => {
          switch (block.type) {
            case 'p':
              return <p key={index} className="text-white/70">{block.text as string}</p>;
            case 'h2':
              return <h2 key={index} className="text-xl md:text-2xl font-display font-semibold text-white pt-4">{block.text as string}</h2>;
            case 'h3':
              return <h3 key={index} className="text-base md:text-lg font-display font-medium text-white/95 pt-2">{block.text as string}</h3>;
            case 'code':
              return (
                <pre key={index} className="p-4 bg-black/60 border border-white/[0.08] rounded-xl overflow-x-auto font-mono text-xs text-white/90 my-4">
                  <code>{block.text as string}</code>
                </pre>
              );
            case 'quote':
              return (
                <blockquote key={index} className="pl-4 border-l-2 border-[#c5a059] italic text-white/50 my-4">
                  {block.text as string}
                </blockquote>
              );
            case 'ul':
              return (
                <ul key={index} className="list-disc pl-6 space-y-2 text-white/75 my-4">
                  {(block.text as string[]).map((li, liIndex) => (
                    <li key={liIndex}>{li}</li>
                  ))}
                </ul>
              );
            default:
              return null;
          }
        })}
      </div>

      {/* CTA Box */}
      <div className="p-8 bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.06] rounded-3xl space-y-5 mt-12 text-center">
        <h3 className="text-lg md:text-xl font-display font-semibold text-white">
          Want to build speed-optimized, premium software?
        </h3>
        <p className="text-xs text-white/40 max-w-md mx-auto">
          Our team specializes in React, Next.js, and premium WebGL development to build speed-optimized, high-converting products.
        </p>
        <button
          onClick={() => openBooking('GROWTH', '$2,999')}
          className="px-6 py-3 bg-[#c5a059] hover:bg-[#c5a059]/90 text-black text-[10px] font-mono tracking-[0.2em] uppercase font-bold transition-all rounded-xl cursor-pointer"
        >
          Book a Growth Strategy Session
        </button>
      </div>

      {/* Bottom back link */}
      <div className="pt-8 text-center border-t border-white/[0.06]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[#c5a059] hover:underline transition-colors cursor-pointer"
        >
          ← Back to Blog list
        </button>
      </div>
    </motion.div>
  );
}

interface BlogPageProps {
  openBooking: (plan: string, price: string) => void;
}

export default function BlogPage({ openBooking }: BlogPageProps) {
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);

  return (
    <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto pt-8 pb-24 space-y-16">
      <AnimatePresence mode="wait">
        {selectedPost ? (
          <BlogArticleView 
            key="article" 
            post={selectedPost} 
            onBack={() => {
              setSelectedPost(null);
              window.scrollTo({ top: 0 });
            }} 
            openBooking={openBooking}
          />
        ) : (
          <motion.div
            key="catalog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-16"
          >
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
              onClick={() => setSelectedPost(posts[0])}
              className="group bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-[#c5a059]/25 transition-all duration-300 cursor-pointer"
            >
              <div className="h-2 w-full" style={{ background: 'linear-gradient(to right, #c5a059aa, transparent)' }} />
              <div className="p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
                <div className="space-y-5 text-left">
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
                  onClick={() => setSelectedPost(post)}
                  className="group bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/12 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  {/* Top accent line */}
                  <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${post.accent}80, transparent)` }} />

                  <div className="p-6 space-y-4 text-left">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
