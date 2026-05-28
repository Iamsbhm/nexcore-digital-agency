import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle, Palette, Code, Smartphone, ShoppingBag, Cpu, Sparkles, Compass } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceModalProps {
  open: boolean;
  onClose: () => void;
  service: ServiceItem | null;
  categoryTitle: string;
  categoryColor: string;
  categoryIcon: string;
  onBooking: (plan: string, price: string) => void;
}

// Rich detail map for every service
const SERVICE_DETAILS: Record<string, { tagline: string; bullets: string[]; deliverables: string[] }> = {
  'Logo Design':               { tagline: 'Iconic marks that outlast trends.', bullets: ['Unlimited concepts until perfected', 'Vector & all format files included', 'Full trademark-ready file package', 'Brand usage guidelines doc'], deliverables: ['AI / EPS / SVG / PNG / PDF', 'Dark & light variants', 'Favicon & app icon sizes'] },
  'Brand Identity Packages':   { tagline: 'A full visual language for your brand.', bullets: ['Logo suite & typography system', 'Colour palette with HEX/RGB/CMYK', 'Brand voice & personality guide', 'Social media kit included'], deliverables: ['Brand guidelines PDF', 'Canva / Figma template kit', 'Print-ready stationery files'] },
  'UI Design':                 { tagline: 'Pixel-perfect interfaces that convert.', bullets: ['Component-based design system', 'Desktop, tablet & mobile layouts', 'Interaction & hover state specs', 'Developer-ready Figma handoff'], deliverables: ['Figma source files', 'Design system library', 'Prototype with interactions'] },
  'UX Design':                 { tagline: 'User journeys built on real data.', bullets: ['Heatmap & session analysis', 'User persona development', 'Task-flow wireframe mapping', 'Accessibility compliance review'], deliverables: ['UX research report', 'Wireframe flows', 'Annotated prototype'] },
  'Graphic Design':            { tagline: 'Marketing collateral that commands attention.', bullets: ['Print & digital-ready files', 'On-brand with your style guide', 'Revisions included in package', 'Rush turnaround available'], deliverables: ['PDF / PNG / JPEG exports', 'Editable source files', 'Print-spec colour profiles'] },
  'Social Media Design':       { tagline: 'Scroll-stopping content, consistently.', bullets: ['Feed post, Story & Reel templates', 'Platform-native sizing & specs', 'Monthly content calendar option', '15+ custom templates per package'], deliverables: ['Canva / Figma templates', 'Brand-locked colour variants', 'Posting schedule guide'] },
  'Presentation Design':       { tagline: 'Decks that close deals.', bullets: ['Investor-grade slide hierarchy', 'Data visualisation & infographics', 'Animated transitions included', 'Speaker notes & print layout'], deliverables: ['PowerPoint & Keynote files', 'PDF export', 'Figma source slides'] },
  'Motion Graphics':           { tagline: 'Animated brand moments that stick.', bullets: ['Logo intro / outro animations', 'Micro-interaction libraries', 'After Effects + Lottie exports', 'Social-optimised video specs'], deliverables: ['MP4 / GIF / Lottie JSON', 'After Effects project file', 'Web-embed code snippets'] },
  'Website Development':       { tagline: 'Fast, secure sites that rank & convert.', bullets: ['Custom React / Next.js build', 'Core Web Vitals score 95+', 'SEO-structured semantic HTML', 'CMS integration available'], deliverables: ['Full source code on GitHub', 'Cloud deployment setup', '30-day post-launch support'] },
  'Landing Page Development':  { tagline: 'High-converting pages, engineered.', bullets: ['CRO-optimised layout structure', 'A/B test-ready architecture', 'Sub-1s load time guaranteed', 'Lead capture & analytics setup'], deliverables: ['Deployed live URL', 'Analytics dashboard', 'Heatmap integration'] },
  'Web App Development':       { tagline: 'Scalable apps built to handle real traffic.', bullets: ['Full-stack React + Node/Python', 'Auth, DB & API layer included', 'Responsive across all devices', 'CI/CD pipeline configured'], deliverables: ['Source code repo', 'API documentation', 'Staging + production environments'] },
  'WordPress Development':     { tagline: 'Power and flexibility without the bloat.', bullets: ['Custom theme from scratch', 'Page builder integration', 'Plugin audit & optimisation', 'Speed & security hardening'], deliverables: ['Theme files + child theme', 'Admin training video', 'Migration & backup setup'] },
  'Webflow Development':       { tagline: 'No-code power, bespoke results.', bullets: ['CMS collections configured', 'Responsive breakpoints tuned', 'Custom interactions & animations', 'SEO & meta tags setup'], deliverables: ['Webflow project transfer', 'CMS content structure', 'Training walkthrough'] },
  'API Development':           { tagline: 'Reliable endpoints your team can trust.', bullets: ['REST or GraphQL architecture', 'JWT / OAuth authentication', 'Rate limiting & error handling', 'Full Swagger documentation'], deliverables: ['Postman collection', 'API docs (Swagger/OpenAPI)', 'Hosted on AWS / Railway'] },
  'Progressive Web Apps':      { tagline: 'App-like experiences on any device.', bullets: ['Offline-first service worker', 'Push notification support', 'Add-to-homescreen install flow', 'Lighthouse PWA score 100'], deliverables: ['Deployed PWA', 'Manifest & service worker', 'App store submission guide'] },
  'Website Redesign':          { tagline: 'Your old site, transformed.', bullets: ['UX audit before redesign begins', 'Content migration included', '301 redirect strategy', 'Zero-downtime launch process'], deliverables: ['New deployed site', 'Redirect map document', '30-day monitoring period'] },
  'iOS App Development':       { tagline: 'Native Swift apps for premium experiences.', bullets: ['SwiftUI / UIKit architecture', 'App Store submission handled', 'Push notifications & in-app purchases', 'TestFlight beta testing'], deliverables: ['Xcode source project', 'App Store listing', '60-day bug-fix warranty'] },
  'Android App Development':   { tagline: 'Kotlin-powered apps for every device.', bullets: ['Jetpack Compose UI', 'Google Play submission included', 'Firebase integration available', 'Material Design 3 guidelines'], deliverables: ['Android Studio project', 'Play Store listing', 'APK + AAB builds'] },
  'Cross-Platform Apps':       { tagline: 'One codebase. Two stores.', bullets: ['React Native or Flutter build', 'Shared business logic layer', 'Native modules when needed', 'iOS & Android simultaneous release'], deliverables: ['Monorepo source code', 'Both store submissions', 'OTA update configuration'] },
  'App UI/UX Design':          { tagline: 'Mobile-first design, thumb-zone perfected.', bullets: ['iOS & Android design specs', 'Gesture navigation flows', 'Accessibility (WCAG) compliant', 'Prototype with realistic interactions'], deliverables: ['Figma source + components', 'Zeplin / handoff package', 'Clickable prototype'] },
  'App Maintenance':           { tagline: 'Keep your app healthy and up to date.', bullets: ['Monthly OS compatibility updates', 'Crash monitoring & fixes', 'Performance regression testing', 'Priority bug resolution SLA'], deliverables: ['Monthly health report', 'Version changelogs', 'Dedicated Slack support channel'] },
  'Shopify Store Setup':       { tagline: 'Launch-ready Shopify, done right.', bullets: ['Theme customisation to brand', 'Product & collection setup', 'Payment & shipping configured', 'App integrations (Klaviyo, etc.)'], deliverables: ['Live Shopify store', 'Admin training session', '14-day post-launch support'] },
  'E-commerce Website':        { tagline: 'Custom shopping experiences that convert.', bullets: ['Cart, checkout & wishlist flows', 'Product filtering & search', 'Multi-currency support', 'Inventory management integration'], deliverables: ['Full e-commerce site', 'Order management guide', 'Analytics & conversion tracking'] },
  'WooCommerce Development':   { tagline: 'WordPress commerce, fully customised.', bullets: ['Custom WooCommerce theme', 'Product variations & bundles', 'Payment gateway setup', 'SEO & schema optimisation'], deliverables: ['Deployed WooCommerce store', 'Plugin documentation', 'Admin guide'] },
  'Product Listing Optimization': { tagline: 'Make every product page earn its rank.', bullets: ['Keyword-rich title & description', 'Schema markup for rich snippets', 'Image alt-text & compression', 'Competitor gap analysis'], deliverables: ['Optimised listings', 'SEO report', 'Keyword tracking setup'] },
  'Payment Gateway Integration': { tagline: 'Frictionless checkout that builds trust.', bullets: ['Stripe, PayPal, Apple/Google Pay', 'Multi-currency & tax rules', '3D Secure & fraud protection', 'Subscription billing support'], deliverables: ['Integrated gateway', 'Test & live environment', 'Payment flow documentation'] },
  'Dropshipping Store Setup':  { tagline: 'Automated fulfilment from day one.', bullets: ['Supplier integration (DSers, Spocket)', 'Automated order routing', 'Product import & pricing rules', 'Brand packaging customisation'], deliverables: ['Live dropshipping store', 'Supplier connection guide', 'Profit margin calculator sheet'] },
  'Website Maintenance':       { tagline: 'Your site, always running at peak.', bullets: ['24/7 uptime monitoring', 'Weekly security scans & patches', 'Monthly performance reports', 'Plugin & CMS updates'], deliverables: ['Monthly report PDF', 'Uptime dashboard access', 'Priority support ticket'] },
  'Speed Optimization':        { tagline: 'Under 1 second. Every time.', bullets: ['Core Web Vitals audit & fix', 'Image CDN & lazy-load setup', 'CSS / JS bundle minification', 'Server-side caching layers'], deliverables: ['Before & after Lighthouse report', 'GTmetrix score card', 'Optimised deployment'] },
  'UX Audit':                  { tagline: 'Find where users drop off — and fix it.', bullets: ['Heatmap & click recording analysis', 'Funnel drop-off identification', 'Accessibility compliance check', 'Actionable improvement roadmap'], deliverables: ['UX audit report (PDF)', 'Prioritised fix list', 'Benchmark metrics'] },
  'Website Security':          { tagline: 'Enterprise-grade protection for your site.', bullets: ['SSL certificate management', 'Web application firewall (WAF)', 'Penetration test simulation', 'Malware removal & prevention'], deliverables: ['Security audit report', 'Firewall configuration', 'Monthly scan reports'] },
  'Cloud Hosting Setup':       { tagline: 'Infrastructure that scales with you.', bullets: ['AWS / GCP / DigitalOcean setup', 'Auto-scaling load balancers', 'CDN & global edge caching', 'Disaster recovery & backups'], deliverables: ['Live cloud environment', 'Architecture diagram', 'Runbook & access docs'] },
  'Database Design':           { tagline: 'Data models built for performance.', bullets: ['Relational (PostgreSQL/MySQL) or NoSQL', 'Query optimisation & indexing', 'Data migration from legacy systems', 'Backup & recovery strategy'], deliverables: ['ERD diagram', 'Migration scripts', 'Query performance report'] },
  'DevOps & CI/CD':            { tagline: 'Ship faster. Break nothing.', bullets: ['GitHub Actions / GitLab CI pipelines', 'Docker containerisation', 'Automated testing integration', 'Zero-downtime deployment strategy'], deliverables: ['Pipeline configuration files', 'Deployment runbook', 'Monitoring dashboard'] },
  'Chatbot Development':       { tagline: 'Smart assistants that handle the first line.', bullets: ['Rule-based or AI-hybrid flows', 'CRM & helpdesk integration', 'Multi-channel (web, WhatsApp, Slack)', 'Analytics & conversation logging'], deliverables: ['Live chatbot deployment', 'Admin dashboard access', 'Training & FAQ setup guide'] },
  'AI Chatbot Integration':    { tagline: 'GPT-powered support that never sleeps.', bullets: ['Custom GPT-4 knowledge base', 'Live chat handoff to humans', 'Tone-of-voice fine-tuning', 'Multi-language support'], deliverables: ['Deployed chatbot widget', 'Admin knowledge editor', 'Monthly usage analytics'] },
  'AI Content Generation':     { tagline: 'Scale content without scaling headcount.', bullets: ['Brand-voice prompt engineering', 'Bulk blog & ad copy generation', 'SEO-optimised output formatting', 'Human review pipeline included'], deliverables: ['Content generation pipeline', 'Prompt library', 'CMS integration'] },
  'Workflow Automation':       { tagline: 'Remove the manual. Automate the mundane.', bullets: ['Zapier / Make.com flows built', 'CRM, email & Slack triggers', 'Error handling & retry logic', 'Time-saving ROI report'], deliverables: ['Live automation flows', 'Workflow documentation', 'Monitoring alerts'] },
  'CRM Setup & Automation':    { tagline: 'Your pipeline, running on autopilot.', bullets: ['HubSpot or Salesforce configuration', 'Lead scoring & routing rules', 'Automated email sequences', 'Dashboard & reporting setup'], deliverables: ['Configured CRM environment', 'Sales pipeline template', 'Team training session'] },
  'AI-Powered SEO Tools':      { tagline: 'Rank higher with machine-speed optimisation.', bullets: ['Semantic keyword cluster mapping', 'Competitor gap analysis AI', 'Automated index health checks', 'Schema markup generation'], deliverables: ['SEO strategy report', 'Keyword cluster map', 'Monitoring dashboard'] },
  'Custom GPT / AI Agents':    { tagline: 'AI trained on your business knowledge.', bullets: ['Custom GPT with your data', 'Internal tool or customer-facing', 'API integration for any platform', 'Ongoing model refinement'], deliverables: ['Deployed AI agent', 'Admin configuration panel', 'Usage analytics'] },
};

const ICON_MAP: Record<string, React.ReactNode> = {
  Palette:    <Palette    className="w-7 h-7" />,
  Code:       <Code       className="w-7 h-7" />,
  Smartphone: <Smartphone className="w-7 h-7" />,
  ShoppingBag:<ShoppingBag className="w-7 h-7" />,
  Cpu:        <Cpu        className="w-7 h-7" />,
  Sparkles:   <Sparkles   className="w-7 h-7" />,
};

export default function ServiceModal({ open, onClose, service, categoryTitle, categoryColor, categoryIcon, onBooking }: ServiceModalProps) {
  const details = service ? (SERVICE_DETAILS[service.name] ?? {
    tagline: 'Premium service tailored to your business.',
    bullets: ['Custom scope to your needs', 'Expert team assigned', 'Dedicated project manager', 'Quality guaranteed'],
    deliverables: ['Full project files', 'Documentation', 'Post-launch support'],
  }) : null;

  return (
    <AnimatePresence>
      {open && service && details && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.93, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[91] flex items-center justify-center px-4 py-8 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-2xl bg-[#0d0d0d] border border-white/[0.08] rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Top accent bar ── */}
              <div className="h-[2px] w-full bg-gradient-to-r from-[#c5a059] to-transparent" />

              {/* ── Header ── */}
              <div className="px-8 pt-7 pb-6 flex items-start justify-between gap-4 border-b border-white/[0.05]">
                <div className="flex items-center gap-5">
                  {/* Icon orb */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-[#c5a059]/25 bg-[#c5a059]/10 text-[#c5a059]">
                    {ICON_MAP[categoryIcon] ?? <Compass className="w-7 h-7" />}
                  </div>
                  <div>
                    <p className="text-[9px] font-mono tracking-[0.3em] uppercase mb-1 text-[#c5a059]">
                      {categoryTitle}
                    </p>
                    <h2 className="text-xl md:text-2xl font-display font-semibold text-white leading-tight">
                      {service.name}
                    </h2>
                    <p className="text-xs text-white/40 mt-1 font-light italic">{details.tagline}</p>
                  </div>
                </div>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="shrink-0 w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-[#c5a059]/10 hover:border-[#c5a059]/30 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-white/50" />
                </button>
              </div>

              {/* ── Body ── */}
              <div className="px-8 py-6 space-y-6">
                {/* Description */}
                <p className="text-sm text-white/50 leading-relaxed">{service.description}</p>

                {/* Two-column: What's included / Deliverables */}
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Included */}
                  <div className="p-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl space-y-3">
                    <p className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#c5a059]/60">What's Included</p>
                    <ul className="space-y-2">
                      {details.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#c5a059]" />
                          <span className="text-xs text-white/55 leading-snug">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div className="p-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl space-y-3">
                    <p className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#c5a059]/60">Deliverables</p>
                    <ul className="space-y-2">
                      {details.deliverables.map((d, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#c5a059]" />
                          <span className="text-xs text-white/55">{d}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Turnaround badge */}
                    <div className="pt-2 flex items-center gap-2">
                      <span className="text-[9px] font-mono px-2.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/8 text-[#c5a059]">
                        ⚡ Fast Turnaround Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Footer CTA ── */}
              <div className="px-8 pb-7 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => { onBooking('GROWTH', '$2,999'); onClose(); }}
                  className="group w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-[#c5a059] text-black text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer active:scale-95 overflow-hidden relative hover:shadow-[0_0_24px_rgba(197,160,89,0.4)]"
                >
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                  <span className="relative font-bold">Get a Free Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 relative" />
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 border border-white/10 text-white/40 hover:text-[#c5a059] hover:border-[#c5a059]/30 text-[10px] font-mono tracking-[0.2em] uppercase transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
