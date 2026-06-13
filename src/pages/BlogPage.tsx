import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
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
      { type: 'p', text: 'Largest Contentful Paint (LCP) is one of the three core metrics monitored in Google\'s Core Web Vitals. It measures the time taken to render the largest image or text block visible within the viewport. While a score below 2.5s is defined as "Good" by Google, target systems built for enterprise conversions must aim for a sub-second LCP (under 1000ms). Websites achieving sub-second LCP experience lower bounce rates, higher user engagement, and a distinct ranking boost in search engine result pages (SERPs).' },
      
      { type: 'h2', text: 'Understanding the LCP Breakdown' },
      { type: 'p', text: 'To optimize LCP, you must break down the loading sequence into four distinct phases: Time to First Byte (TTFB), Resource Load Delay, Resource Load Time, and Element Render Delay. Every optimization we implement acts directly on one of these phases. At Pixel Vance Digital, our benchmark for client deliverables is a sub-second LCP, which demands strict management of CSS, JavaScript, and asset assets.' },
      
      { type: 'h2', text: '1. Lazy Loading Non-Critical Components via Dynamic Imports' },
      { type: 'p', text: 'Next.js automatically code-splits pages, but large component libraries, interactive canvas components (such as WebGL), charts, or complex scheduling modals can still bloat the initial JavaScript bundle. When JavaScript is parsed by the browser, it blocks rendering. Utilizing next/dynamic allows you to lazy-load components so they are only fetched when required:' },
      { type: 'code', text: `import dynamic from 'next/dynamic';\n\n// Load heavy 3D rendering console only on demand, bypassing initial load\nconst SpatialConsole = dynamic(() => import('@/components/SpatialConsole'), {\n  ssr: false,\n  loading: () => <div className="h-96 animate-pulse bg-white/5 border border-white/10 rounded-2xl" />\n});` },
      { type: 'p', text: 'By offloading heavy interactive modules, you reduce the initial bundle size, allowing the browser to parse HTML and render primary LCP content significantly faster.' },
      
      { type: 'h2', text: '2. Implementing next/image for Responsive Asset Delivery' },
      { type: 'p', text: 'Unoptimized raster images are the most common source of high element render delays. Next.js provides the next/image wrapper, which converts images to optimized formats like WebP or AVIF on the fly, resizes assets to match device viewport layouts, and sets up layout dimensions to prevent Cumulative Layout Shift (CLS).' },
      { type: 'p', text: 'For primary hero banners or background images that represent the LCP element itself, never let the browser lazy-load. Set the priority property to instruct the bundler to preload the asset immediately:' },
      { type: 'code', text: `<Image\n  src="/images/nexcore_web_platform.png"\n  alt="Pixel Vance Dashboard Mockup"\n  width={1200}\n  height={630}\n  priority\n  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"\n  className="object-cover rounded-3xl"\n/>` },
      
      { type: 'h2', text: '3. Streaming Server Components via Suspense Boundary' },
      { type: 'p', text: 'When rendering server-side components (SSR), a slow database query can block the entire page response, increasing TTFB. The Next.js App Router leverages React Server Components and HTML streaming, allowing you to wrap slow data-fetching components inside React Suspense boundaries. The server delivers the static page shell immediately, and streams individual dynamic sections once queries resolve:' },
      { type: 'code', text: `import { Suspense } from 'react';\nimport { MetricsLoader } from './MetricsLoader';\nimport { SkeletonGrid } from './SkeletonGrid';\n\nexport default function DashboardPage() {\n  return (\n    <div className="space-y-8">\n      <h1 className="text-3xl font-display text-white">Analytics Overview</h1>\n      <Suspense fallback={<SkeletonGrid />}>\n        <MetricsLoader />\n      </Suspense>\n    </div>\n  );\n}` },
      
      { type: 'h2', text: '4. Prefetching & Font Optimization' },
      { type: 'p', text: 'Minimize font load delays by utilizing @next/font. This downloads web fonts at build time, hosts them locally, and inserts font declarations directly into the CSS bundle. Set font-display: swap to ensure fallback system fonts are rendered instantly while primary typography resolves, eliminating render-blocking layout flashes. Combining font declarations directly in Next.js reduces external domain requests to third-party services like Google Fonts, preventing critical delays.' },
      
      { type: 'quote', text: '"Page load speed is not just an engineering metric; it is a fundamental pillar of user experience and organic search engine discovery. Every 100ms of loading latency correlates directly with a drop in conversions. At Pixel Vance Digital, speed is our core feature."' },
      
      { type: 'h2', text: 'Sub-Second LCP Checklist for Developers' },
      { type: 'ul', text: [
        'Audit bundle weights using @next/bundle-analyzer regularly.',
        'Preconnect to external api domains to speed up DNS handshakes.',
        'Preload above-the-fold images and dynamic local fonts.',
        'Wrap database-fetching components in dynamic Suspense streams.',
        'Cache static files at the edge using a global CDN (e.g. Vercel, Cloudflare).'
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
      { type: 'p', text: 'Fintech dashboards are highly complex interfaces. Users frequently navigate vast quantities of dense information, such as real-time stock indexes, trade volume logs, cash flow metrics, and transaction ledgers. The primary goal of a UX designer is to organize this information to minimize cognitive fatigue, helping users make critical financial decisions quickly and without error.' },
      
      { type: 'h2', text: '1. The Golden Quad Scanning Pattern' },
      { type: 'p', text: 'Eyetracking studies confirm that users scan digital displays in an F-shaped pattern, concentrating focus on the top and left quadrants. Place high-level status widgets (e.g., Total Net Balance, Active Cash Flow, Alert Flags) in this golden zone. Middle areas are reserved for historical timeline line charts, and the lower rows or right sidebar components house search logs and transaction tables. By arranging layout hierarchies to match default scanning behaviors, users absorb critical stats in under 2 seconds.' },
      
      { type: 'h2', text: '2. Implementing Progressive Disclosure' },
      { type: 'p', text: 'Dumping all details on a single display creates immediate visual noise. Use progressive disclosure: show clean, high-level summaries first, and allow detailed exploration only when a user clicks. This preserves white space and maintains focus. Pixel Vance Digital applies this by defaulting panels to summarized cards while utilizing overlay modals or sub-pages to reveal expanded logs upon click.' },
      
      { type: 'quote', text: '"Designers often confuse density with complexity. A dashboard can be data-dense while remaining clean if you structure it so that detail is revealed only at the moment of need."' },
      
      { type: 'h2', text: '3. Designing Contextual Color Indicators' },
      { type: 'p', text: 'Color in fintech dashboards must carry meaning, not serve as generic decoration. Set up low-saturation palettes to avoid eye strain. Green should exclusively signify positive growth, while red highlights anomalies requiring immediate attention. Neutral colors like slate gray should be used for secondary text labels. By establishing strict semantic colors, users map visual changes to real-world performance instantly.' },
      { type: 'code', text: `/* Core Semantic Color Tokens */\n:root {\n  --color-status-success: #10b981;  /* Low-saturation Emerald Green */\n  --color-status-warning: #f59e0b;  /* Soft Amber Gold */\n  --color-status-error: #ef4444;    /* Alert Red */\n  --color-neutral-muted: #64748b;   /* Slate Gray for secondary info */\n}` },
      
      { type: 'h2', text: '4. Typography and Number Readability' },
      { type: 'p', text: 'When rendering numbers, always use monospaced numerals (tabular figures) like JetBrains Mono or tabular settings in Space Grotesk. Standard proportional numbers have variable widths (e.g., "1" is narrower than "8"), which causes numbers in tables to misalign vertically and flicker during real-time updates. Monospaced rendering ensures decimal points line up vertically, allowing immediate comparison.' },
      
      { type: 'h2', text: 'Key UX Dashboard Guidelines' },
      { type: 'ul', text: [
        'Utilize tabular monospaced numbers for all dynamic and static metrics.',
        'Keep visual focus balanced by placing key actions on the top right.',
        'Enforce progressive disclosure to keep layouts clean and breathable.',
        'Choose curated, low-saturation hues to limit visual eye strain over long sessions.',
        'Ensure critical alerts trigger screen-reader notifications for accessibility.'
      ]}
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
      { type: 'p', text: 'The organic search landscape has shifted dramatically. With Google introducing Search Generative Experience (SGE) and AI-driven direct answers, traditional keyword density stuffing is completely obsolete. Enterprise organic traffic growth now depends on establishing semantic authority, structuring pages cleanly, and publishing detailed, original technical content. Pixel Vance Digital leads enterprise search marketing projects by focusing on technical indexability, high-converting copy, and structured schema tags.' },
      
      { type: 'h2', text: '1. Structured Data Schema Markup (JSON-LD)' },
      { type: 'p', text: 'Search crawlers use structured schema scripts in your HTML head to index your pages. Adding JSON-LD schemas helps engines serve rich snippets (such as star ratings, site links, pricing tiers, and article details) directly in search pages, increasing click-through rates (CTR) by up to 30%:' },
      { type: 'code', text: `<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "The 2026 Blueprint for Enterprise Organic Traffic Growth",\n  "author": {\n    "@type": "Organization",\n    "name": "Pixel Vance Digital"\n  },\n  "datePublished": "2026-05-12",\n  "publisher": {\n    "@type": "Organization",\n    "name": "Pixel Vance Digital",\n    "logo": {\n      "@type": "ImageObject",\n      "url": "https://www.pixelvancedigital.com/logo.png"\n    }\n  }\n}\n</script>` },
      
      { type: 'h2', text: '2. Building Semantic Content Clusters' },
      { type: 'p', text: 'Search engines rank sites based on topical authority, not single articles. Instead of publishing disconnected posts, structure content in clusters around core pillars. For instance, link multiple specific articles on React rendering (SSR, static generation, dynamic hydration) back to a single parent page. This indicates comprehensive domain authority to web crawlers.' },
      
      { type: 'h2', text: '3. Technical UX and Page Load Signals' },
      { type: 'p', text: 'Google explicitly uses page speed and user interaction metrics as ranking factors. Slow, laggy pages drive users back to search results, signaling poor quality to search engine algorithms and ranking your site lower. Core Web Vitals are directly linked to your SEO performance. Optimizing largest contentful paint (LCP) and interaction to next paint (INP) are mandatory milestones.' },
      
      { type: 'quote', text: '"A website that loads in under 1 second will naturally convert more search visitors and maintain higher rankings than a slower site, even if their content is identical. Technical SEO is the foundation of digital growth. Working with Pixel Vance Digital gives businesses this unfair technical advantage."' },
      
      { type: 'h2', text: 'Core Enterprise SEO Strategy' },
      { type: 'ul', text: [
        'Deploy JSON-LD schemas for all articles, FAQs, and product pages.',
        'Structure site hierarchy using semantic elements like main, section, and article.',
        'Target long-tail, high-intent keywords to bypass generic domain competition.',
        'Verify XML sitemaps and robots.txt configurations weekly.',
        'Ensure 100% responsiveness and rapid loading on mobile viewports.'
      ]}
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
      { type: 'p', text: 'Scaling a design system requires strict rules. Without clear guidelines for variables and components, you end up with duplicate assets and fragmented designs. When Pixel Vance Digital constructs design systems for large organizations, we align visual assets in Figma directly with UI tokens inside code repositories.' },
      
      { type: 'h2', text: '1. Structuring Semantic Design Tokens' },
      { type: 'p', text: 'Design tokens map core visual elements (colors, spacing, typography) to variables. Organize them in three tiers: Global (raw color palettes), Alias (semantic values like color-background-primary), and Component (specific overrides). This hierarchy ensures that changing a color theme across a site requires editing just a single line in a JSON token directory.' },
      { type: 'code', text: `{\n  "global": {\n    "brand-gold": { "value": "#c5a059" }\n  },\n  "alias": {\n    "accent-color": { "value": "{global.brand-gold.value}" }\n  },\n  "component": {\n    "button-primary-bg": { "value": "{alias.accent-color.value}" }\n  }\n}` },
      
      { type: 'h2', text: '2. Component Taxonomy & Variant Properties' },
      { type: 'p', text: 'Rather than creating separate assets for minor variations, use Figma component properties to configure toggles (such as hasIcon) and text slots. This reduces catalog weight by 70%, keeping designs and codebases aligned. Ensure component naming schemes match React prop structures to streamline development handoff.' },
      
      { type: 'quote', text: '"A design system is not a project; it is a product that serves other product builders. The key to success is keeping design resources and engineering outputs locked in 1:1 synchronization."' },
      
      { type: 'h2', text: 'Design System Checklist' },
      { type: 'ul', text: [
        'Organize design tokens in Global, Alias, and Component structures.',
        'Implement strict naming conventions across both Figma and React repositories.',
        'Automate CSS variable outputs directly from design variables using Style Dictionary.',
        'Provide comprehensive code guidelines and use-case references for developers.',
        'Maintain a single source of truth for design assets to eliminate duplicates.'
      ]}
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
      { type: 'p', text: 'AI integration has shifted from simple chatbots to complex workflow automation. Having built 12 production-grade AI pipelines for various clients, Pixel Vance Digital has compiled the key architectural rules for stable, cost-effective deployments that increase operating efficiency.' },
      
      { type: 'h2', text: '1. Restricting LLM Output Structure' },
      { type: 'p', text: 'Raw string responses from LLMs are notoriously fragile to parse in code. Always enforce structured outputs (like JSON schemas) or use function-calling APIs to ensure outputs conform to your system requirements. This eliminates parsing errors and guarantees database compatibility.' },
      { type: 'code', text: `const chatCompletion = await openai.chat.completions.create({\n  model: "gpt-4o",\n  messages: [{ role: "user", content: "Extract customer data..." }],\n  response_format: { type: "json_object" }\n});` },
      
      { type: 'h2', text: '2. Implementing Fallbacks & Guardrails' },
      { type: 'p', text: 'LLMs can hallucinate or fail. Always configure fallback checks, timeout rules, and strict validation layers. If the structured response fails validation, retry with a correction prompt or route the task to a manual review queue. Implementing a retry loop with correction logs reduces structural failures to less than 0.5%.' },
      
      { type: 'quote', text: '"Automation should never introduce chaos. When integration with AI models occurs, you must build robust validation layers around prompt responses to shield customer databases from unstructured data."' },
      
      { type: 'h2', text: 'AI Integration Guidelines' },
      { type: 'ul', text: [
        'Force structured output JSON formats to guarantee database integrity.',
        'Build automatic validation layers to scan output structure on client APIs.',
        'Configure prompt chains and deterministic scripts instead of single prompts.',
        'Implement caching strategies for repeat questions to control API costs.',
        'Monitor token logs and model latencies using telemetry tools.'
      ]}
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
      { type: 'p', text: 'Traffic without conversion is just wasted budget. After designing and shipping 500+ landing pages, Pixel Vance Digital has identified 7 conversion rate optimization (CRO) elements that consistently yield the highest returns. Implementing these guarantees that you get the most out of your organic and paid marketing efforts.' },
      
      { type: 'h2', text: '1. Above-the-Fold Value Proposition' },
      { type: 'p', text: 'You have less than 5 seconds to capture a user\'s attention. State exactly what you solve, who you solve it for, and the immediate benefit. Keep paragraphs under 3 lines and CTA buttons highly visible. Eliminate visual clutter above the fold so the main action stands out immediately.' },
      
      { type: 'h2', text: '2. Social Proof & Micro-interactions' },
      { type: 'p', text: 'Show reviews, client logos, and numeric stats directly under your primary header. Use subtle interactive fade-ins to draw attention to metrics without distracting the user from the content. Social proof establishes trust before the user scroll begins.' },
      
      { type: 'quote', text: '"Conversion rate optimization is not about tricks; it is about reducing friction. Make it easy for the visitor to understand your offer and take the next step. Simple design converts best."' },
      
      { type: 'h2', text: '3. Form Fields & Action Triggers' },
      { type: 'p', text: 'Reducing form fields from 5 to 3 can boost form submission rates by up to 25%. Only ask for essential data initially. Enable automatic autofill tags to streamline input. Ensure CTA button copy is descriptive and action-oriented (e.g. "Start My Free Trial" instead of "Submit").' },
      
      { type: 'h2', text: 'Core CRO Elements to Test' },
      { type: 'ul', text: [
        'Headline clarity: Test explicit benefits versus creative hook copy.',
        'CTA button color and copy: Ensure high visual contrast.',
        'Logo placement: Place client badges directly below the main header.',
        'Form inputs: Limit fields to Name and Email to reduce friction.',
        'Page speed: Eliminate slow-loading scripts to reduce drop-offs.'
      ]}
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
      { type: 'p', text: 'Maintaining separate repositories for website code, server components, and design libraries creates massive overhead. Moving client builds to a monorepo setup saved Pixel Vance Digital over 40 hours of maintenance work every month, allowing us to ship features and updates much faster.' },
      
      { type: 'h2', text: '1. Shared Tools & Linters' },
      { type: 'p', text: 'With a monorepo (using Turborepo or pnpm workspaces), linting profiles, code formats, and tsconfig profiles are defined globally. When shared packages or utilities are updated, dependencies recompile instantly across all apps. This maintains code consistency across all developers on our team.' },
      { type: 'code', text: `// pnpm-workspace.yaml\npackages:\n  - 'apps/*'\n  - 'packages/*'\n  - 'shared-ui'` },
      
      { type: 'h2', text: '2. Faster Onboarding & Version Control' },
      { type: 'p', text: 'Onboarding new developers to a single repository takes minutes. They download one codebase, run a single pnpm install, and launch all servers simultaneously. Bug fixes are applied once in the shared core and immediately roll out to the web client, CMS, and admin console.' },
      
      { type: 'quote', text: '"Managing multiple repositories for a single product ecosystem is an anti-pattern. A monorepo synchronizes releases and tool configurations, allowing our engineers to focus on code rather than devops overhead."' },
      
      { type: 'h2', text: 'Benefits of a Monorepo' },
      { type: 'ul', text: [
        'Linting profiles and configs are updated in a single central folder.',
        'Package dependencies are shared to prevent version drift.',
        'Shared design system libraries update globally on build.',
        'Simplifies CI/CD pipelines to a single build script.',
        'Drastically reduces node_modules size on developer machines.'
      ]}
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
      { type: 'p', text: 'A great logo isn\'t a pretty illustration; it is a visual identifier. In a crowded digital market, the best brand marks prioritize clarity and adaptability across different platforms. Pixel Vance Digital designs visual identities that scale from physical billboards to tiny browser tab icons.' },
      
      { type: 'h2', text: '1. Designing for the App Icon Grid' },
      { type: 'p', text: 'Always test logo concepts in a 16x16 pixel grid. If the icon loses detail or becomes unreadable at small sizes, it will fail as a favicon, social avatar, or app icon. Keep geometry minimal and bold. Modern screens demand simplified geometry to remain visible in dark modes and dense dashboard layouts.' },
      
      { type: 'h2', text: '2. Responsive Logo Variations' },
      { type: 'p', text: 'Create variations of the mark to fit different spacing constraints: a horizontal version for headers, a stacked format for boxes, and a simplified icon for mobile screens. If a brand identity cannot scale down cleanly, it will feel clunky and inconsistent across the customer journey.' },
      
      { type: 'quote', text: '"Complexity is the enemy of visual recall. The most memorable brand marks in history can be sketched from memory in under 5 seconds. Design for immediate recognition, not artistic styling."' },
      
      { type: 'h2', text: 'Brand Mark Design Principles' },
      { type: 'ul', text: [
        'Test the brand icon in small sizes (16x16px) for visibility.',
        'Ensure the mark works in solid black or white versions.',
        'Limit brand palettes to 2-3 colors to prevent print alignment errors.',
        'Avoid thin fonts or complex lines that distort at high scales.',
        'Align visual geometry with the brand personality and values.'
      ]}
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
      { type: 'p', text: 'E-commerce conversion rates drop by 7% for every 100ms of latency. We audited a premium Shopify store for a luxury home decor brand and optimized its performance profile from a Lighthouse score of 28 to a perfect 100. This optimization resulted in a direct increase in conversion rates.' },
      
      { type: 'h2', text: '1. Eliminating App Code Bloat' },
      { type: 'p', text: 'Shopify extensions inject multiple blocking scripts into the document head. Audit app usage and lazy-load third-party tracking scripts until after the user first interacts with the page. Preconnect to external inventory nodes to speed up DNS handshakes before assets are fetched.' },
      { type: 'code', text: `// Delay tag manager execution until user scroll or tap\nwindow.addEventListener('scroll', () => {\n  initializeGoogleTagManager();\n}, { once: true });` },
      
      { type: 'h2', text: '2. Native CSS Layout Elements' },
      { type: 'p', text: 'Many store themes rely on heavy JavaScript packages to build simple interactive sliders and grids. We rebuilt these components using native CSS grid, flexbox, and modern CSS scroll-snap modules. This allowed us to delete over 180kb of blocking carousel libraries, reducing Page Interactive delay metrics.' },
      
      { type: 'quote', text: '"Speed is a conversion multiplier in e-commerce. A slow checkout flow represents direct revenue loss. Optimizing site speed is the highest leverage CRO investment any online business can make."' },
      
      { type: 'h2', text: 'Shopify Performance Steps' },
      { type: 'ul', text: [
        'Remove inactive app integrations and clear residual theme scripts.',
        'Decline theme slide libraries in favor of CSS scroll-snap containers.',
        'Optimise store images into WebP/AVIF formats.',
        'Delay marketing scripts (e.g. Hotjar, Facebook Pixel) until user interaction.',
        'Set explicit dimension heights on images to prevent layout shift.'
      ]}
    ]
  }
];

interface BlogArticleProps {
  key?: string;
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
          Our team at Pixel Vance Digital specializes in React, Next.js, and premium WebGL development to build speed-optimized, high-converting products.
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

  const getSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      if (path.startsWith('/blog/')) {
        const slug = path.replace('/blog/', '');
        const post = posts.find(p => getSlug(p.title) === slug);
        setSelectedPost(post || null);
      } else {
        setSelectedPost(null);
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  useEffect(() => {
    if (selectedPost) {
      document.title = `${selectedPost.title} | Pixel Vance Digital`;
      const slug = getSlug(selectedPost.title);
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', `https://www.pixelvancedigital.com/blog/${slug}`);
      }
    } else {
      document.title = 'Blog | Web Design & Digital Marketing Tips | Pixel Vance Digital';
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', 'https://www.pixelvancedigital.com/blog');
      }
    }
  }, [selectedPost]);

  const selectPost = (post: typeof posts[0]) => {
    const slug = getSlug(post.title);
    window.history.pushState(null, '', `/blog/${slug}`);
    setSelectedPost(post);
    window.scrollTo({ top: 0 });
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const deselectPost = () => {
    window.history.pushState(null, '', '/blog');
    setSelectedPost(null);
    window.scrollTo({ top: 0 });
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto pt-8 pb-24 space-y-16">
      <AnimatePresence mode="wait">
        {selectedPost ? (
          <BlogArticleView 
            key="article" 
            post={selectedPost} 
            onBack={deselectPost} 
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
              onClick={() => selectPost(posts[0])}
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
                  onClick={() => selectPost(post)}
                  className="group bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/12 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                >
                  <div>
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
                    </div>
                  </div>

                  <div className="p-6 pt-0 text-left">
                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
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
