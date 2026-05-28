/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceCategory, PricingPlan, ClientReview, ProcessStep } from './types';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    title: 'DESIGN & BRANDING',
    color: '#3b82f6',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    iconName: 'Palette',
    items: [
      { name: 'Logo Design', description: 'Custom logos that create unforgettable brand impressions.' },
      { name: 'Brand Identity Packages', description: 'Complete brand guidelines, custom type scales, and graphic standards.' },
      { name: 'UI Design', description: 'Beautiful conversion-focused interfaces crafted with pixel-level precision for web & mobile.' },
      { name: 'UX Design', description: 'User-journey research, interactive wireframing, and usability blueprinting.' },
      { name: 'Graphic Design', description: 'Premium marketing collateral, beautiful banners, and high-resolution print-ready assets.' },
      { name: 'Social Media Design', description: 'Eye-catching vector posts, custom banners, and scroll-stopping template layouts.' },
      { name: 'Presentation Design', description: 'Elite investor pitch decks, corporate slide layouts, and stylized keynote decks.' },
      { name: 'Motion Graphics', description: 'Custom animated logotypes, micro-interactions, and premium high-fidelity physics transitions.' }
    ]
  },
  {
    title: 'WEB DEVELOPMENT',
    color: '#10b981',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    iconName: 'Code',
    items: [
      { name: 'Website Development', description: 'Custom high-performance sites — fast, secure, scalable, and optimized for SEO.' },
      { name: 'Landing Page Development', description: 'High-converting bespoke landing pages engineered with premium loading speeds.' },
      { name: 'Web App Development', description: 'Complex full-stack web applications built on modern, scalable React architectures.' },
      { name: 'WordPress Development', description: 'Custom performance-coded themes with intuitive page builders and configurations.' },
      { name: 'Webflow Development', description: 'No-code powered marketing sites with built-in CMS systems and immersive layouts.' },
      { name: 'API Development', description: 'Lightning-fast RESTful or GraphQL endpoints secured by professional key controls.' },
      { name: 'Progressive Web Apps', description: 'App-like responsive web experiences that operate offline and load with instant power.' },
      { name: 'Website Redesign', description: 'Transform aging websites into modern conversion assets with immediate positive business impacts.' }
    ]
  },
  {
    title: 'MOBILE APPS',
    color: '#f59e0b',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    iconName: 'Smartphone',
    items: [
      { name: 'iOS App Development', description: 'Native Swift applications with sleek, fluid, hardware-integrated UI layers.' },
      { name: 'Android App Development', description: 'Native Kotlin apps engineered for robust memory allocation and hardware versatility.' },
      { name: 'Cross-Platform Apps', description: 'React Native & Flutter solutions that run flawlessly across iOS & Android concurrently.' },
      { name: 'App UI/UX Design', description: 'Mobile-first modular layout designs calibrated for standard thumb reach and eye tracking.' },
      { name: 'App Maintenance', description: 'Continuous dependency patching, immediate bug resolution, and persistent performance audits.' }
    ]
  },
  {
    title: 'E-COMMERCE SOLUTIONS',
    color: '#ec4899',
    borderColor: 'border-pink-500/30',
    textColor: 'text-pink-400',
    iconName: 'ShoppingBag',
    items: [
      { name: 'Shopify Store Setup', description: 'Polished client-facing Shopify stores configured with fast templates & sales funnels.' },
      { name: 'E-commerce Website', description: 'Custom engineered shopping grids with rapid search capability and zero-friction checkout.' },
      { name: 'WooCommerce Development', description: 'Highly optimized WooCommerce setups layered over WordPress for full-stack custom autonomy.' },
      { name: 'Product Listing Optimization', description: 'High-visibility structured lists using optimized rich snippets and conversion paths.' },
      { name: 'Payment Gateway Integration', description: 'Multi-currency conversion checkouts backed by custom Stripe or PayPal integrations.' },
      { name: 'Dropshipping Store Setup', description: 'Fully synchronized drop-shipping stores connected seamlessly with automated suppliers.' }
    ]
  },
  {
    title: 'TECHNICAL & PERF.',
    color: '#8b5cf6',
    borderColor: 'border-violet-500/30',
    textColor: 'text-violet-400',
    iconName: 'Cpu',
    items: [
      { name: 'Website Maintenance', description: '24/7 security scanning, server backups, regular visual testing, and library updates.' },
      { name: 'Speed Optimization', description: 'Mastering Core Web Vitals to drop load times under 1 second, increasing SEO rank.' },
      { name: 'UX Audit', description: 'In-depth behavioral tracking and usability reviews designed to pinpoint conversion friction.' },
      { name: 'Website Security', description: 'Enforcing custom SSL parameters, custom web firewalls, and direct penetration tests.' },
      { name: 'Cloud Hosting Setup', description: 'AWS, GCP, or DigitalOcean cloud orchestration fine-tuned for load-balanced scaling.' },
      { name: 'Database Design', description: 'Secure relational and non-relational database models optimized for concurrent queries.' },
      { name: 'DevOps & CI/CD', description: 'Bespoke GitHub actions, Docker environment packages, and automated deployment grids.' },
      { name: 'Chatbot Development', description: 'Rule-based flows and system assistants programmed to resolve common client inquires.' }
    ]
  },
  {
    title: 'AI & AUTOMATION',
    color: '#ef4444',
    borderColor: 'border-red-500/30',
    textColor: 'text-red-400',
    iconName: 'Sparkles',
    items: [
      { name: 'AI Chatbot Integration', description: 'GPT-powered conversational systems configured to answer general support tickets 24/7.' },
      { name: 'AI Content Generation', description: 'Custom language generation pipelines calibrated directly for bulk copy editing.' },
      { name: 'Workflow Automation', description: 'Bespoke Zapier & Make recipes syncing cloud directories and saving hours weekly.' },
      { name: 'CRM Setup & Automation', description: 'Establishing HubSpot or Salesforce funnels with automated outreach sequences.' },
      { name: 'AI-Powered SEO Tools', description: 'Automated semantic clustering, index checks, and immediate competitor target reviews.' },
      { name: 'Custom GPT / AI Agents', description: 'Bespoke corporate knowledge models configured to parse custom spreadsheets.' }
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery Call',
    description: 'Free 30-min strategy session to understand your goals, target audience & project scope.',
    details: ['Goal alignment review', 'Competitive audit', 'Technology choice outline']
  },
  {
    number: '02',
    title: 'Strategy & Proposal',
    description: 'We craft a detailed, transparent plan complete with direct timelines, deliverables & pricing tiers.',
    details: ['Interactive sitemap design', 'Visual style prototypes', 'Detailed cost breakdown structure']
  },
  {
    number: '03',
    title: 'Design & Build',
    description: 'Our expert engineering team builds your project with pristine layout, custom 3D logic, and revisions.',
    details: ['Pixel-perfect wireframes', 'Responsive React programming', '3D motion graphic rendering']
  },
  {
    number: '04',
    title: 'Launch & Support',
    description: 'We run complete optimization tests, launch to robust Cloud container hosting, and support continually.',
    details: ['Pre-launch speed audit', 'SEO schema checking', 'Monthly code maintenance guarantees']
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'STARTER',
    price: '$999',
    pricingPeriod: '/project',
    features: [
      'Bespoke Logo Design',
      '5-Page High-Performance Website',
      'Fully Mobile Responsive Web Design',
      'Basic On-Page SEO Configuration',
      '1 Month Post-Launch Maintenance Support'
    ]
  },
  {
    name: 'GROWTH',
    price: '$2,999',
    pricingPeriod: '/project',
    isPopular: true,
    features: [
      'Full Brand Identity Guidelines',
      'Custom Engineered Multi-Page Web App',
      'E-commerce & Shopping Ready Platform',
      'Complete SEO & Conversion Funnel Setup',
      'A/B Conversion Rate Optimization (CRO)',
      '3 Months Premium Support & Priority Care'
    ]
  },
  {
    name: 'ENTERPRISE',
    price: 'Custom',
    pricingPeriod: '/ contact us',
    features: [
      'Everything featured inside Growth Tier',
      'Custom Native Mobile App Development',
      'Enterprise AI & Chatbot Automation Suite',
      'Dedicated Professional Project Manager',
      'Priority 24/7 Discord & Slack Support',
      'Flexible Monthly Retainer Billing Options'
    ]
  }
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    name: 'James Mitchell',
    role: 'CEO',
    company: 'FreshGoods USA',
    initials: 'JM',
    avatarBg: 'bg-blue-600',
    stars: 5,
    comment: '"NexCore delivered our Shopify store in 3 weeks. Sales doubled within the first month. Incredible work and communication throughout."'
  },
  {
    name: 'Sarah Reynolds',
    role: 'Founder',
    company: 'FitTrack App',
    initials: 'SR',
    avatarBg: 'bg-purple-600',
    stars: 5,
    comment: '"Our app went from concept to App Store in 12 weeks. The UI is stunning and our users love it. Best investment we made this year."'
  },
  {
    name: 'David Kim',
    role: 'Marketing Dir',
    company: 'TechVault',
    initials: 'DK',
    avatarBg: 'bg-emerald-600',
    stars: 5,
    comment: '"SEO results were insane — page 5 to page 1 on Google in 4 months. Revenue from organic traffic up 180%."'
  }
];
