import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FaqItem[] = [
    {
      question: "What geographic regions does Pixel Advance Digital serve?",
      answer: "We serve clients globally, including startups and enterprises throughout the United States (from New York to California) as well as international clients across Europe, the UK, Asia, and the Americas. To ensure sub-second loading speeds for all visitors, we deploy our builds using highly optimized, multi-region Content Delivery Networks (CDNs)."
    },
    {
      question: "How do you handle communication and time zones for international (foreign) clients?",
      answer: "We are structured for seamless global collaboration. We align our schedules to coordinate across different time zones, offering flexible meeting slots. Our workflow relies on transparent asynchronous communication using tools like Slack, Loom, and Figma, paired with weekly syncs so you can easily track project milestones from anywhere in the world."
    },
    {
      question: "Do your website designs support multi-language translation and international SEO?",
      answer: "Absolutely. We build localized, multi-lingual web platforms that allow users to toggle languages and view localized content seamlessly. We also implement international SEO best practices (such as hreflang tags, localized sitemaps, and region-specific metadata) to ensure your company ranks effectively across different country-specific Google search indexes."
    },
    {
      question: "Are your website builds secure and compliant with US and global regulations?",
      answer: "Yes, security and regulatory compliance are integrated from day one. Every website is custom-built to comply with US accessibility laws like the Americans with Disabilities Act (ADA) and Web Content Accessibility Guidelines (WCAG) to prevent legal risks. For our global clients, we ensure full compliance with GDPR, CCPA, and secure SSL/firewall configurations to safeguard user privacy."
    },
    {
      question: "Why should we choose a custom website development agency over a cheap template?",
      answer: "Cheap templates come with bloated code, slow loading times, and poor search engine rankings, which lead to high bounce rates. As a premier US web design agency, we build custom-coded React and WordPress websites optimized from the ground up for high speed (scoring 95+ on Google PageSpeed), custom UI/UX design, and superior SEO architecture that translates into higher conversion rates."
    },
    {
      question: "How long does it take to design, develop, and deploy a custom website?",
      answer: "Most custom corporate website designs and WordPress platforms ship within 2 to 4 weeks. Complex enterprise web applications or e-commerce platforms can take 4 to 8 weeks. We operate in rapid, agile development sprints to guarantee fast execution without sacrificing visual excellence or code quality."
    }
  ];

  return (
    <section className="relative z-10 px-4 md:px-8 max-w-4xl mx-auto mb-24" id="faq-section">
      <div className="text-center space-y-3 mb-12">
        <span className="text-[10px] font-mono tracking-[0.4em] text-[#c5a059] font-bold uppercase">
          — QUESTIONS —
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white">
          Frequently Asked <span style={{ background: 'linear-gradient(135deg,#c5a059,#e8c97a,#c5a059)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Questions</span>
        </h2>
      </div>

      <div className="space-y-4">
        {faqData.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-white/[0.06] overflow-hidden transition-all duration-300"
              style={{
                background: isOpen ? 'rgba(197, 160, 89, 0.03)' : 'rgba(255, 255, 255, 0.01)',
                borderColor: isOpen ? 'rgba(197, 160, 89, 0.25)' : 'rgba(255, 255, 255, 0.06)'
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 md:p-6 flex items-center justify-between text-left gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <HelpCircle className={`w-4 h-4 shrink-0 transition-colors duration-300 ${isOpen ? 'text-[#c5a059]' : 'text-white/30'}`} />
                  <span className="font-display font-bold text-sm md:text-base text-white tracking-wide">
                    {item.question}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 shrink-0 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#c5a059]' : ''}`} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0 text-xs md:text-sm text-white/50 leading-relaxed border-t border-white/[0.04]">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}