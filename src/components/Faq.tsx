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
      question: "What regions in the USA does Pixel Vance Digital serve?",
      answer: "We serve brands nationwide across the USA—from New York to California. We offer local-specific strategies to ensure legal compliance (including WCAG/ADA accessibility standards), high-performance regional CDNs for sub-second page loads, and targeted local SEO structures."
    },
    {
      question: "How long does it take to deliver a custom website?",
      answer: "Most custom projects ship in 2 to 4 weeks. By employing rapid, tight development sprints and an agile workflow, we bypass the traditional months-long agency delays without sacrificing a single pixel of quality."
    },
    {
      question: "Why is a custom, conversion-first UI/UX design critical?",
      answer: "A generic template cannot capture your unique brand voice or rank effectively on search engines. We construct bespoke, premium visual interfaces engineered specifically to guide users toward high-converting actions, delivering an average 3.2x ROI boost for our partners."
    },
    {
      question: "Are your website builds secure and compliant with US standards?",
      answer: "Absolutely. Security is baked in from day one. Every build includes advanced SSL encryption, firewalls, penetration testing, and secure authentication mechanisms. We strictly follow WCAG/ADA accessibility compliance and CCPA/privacy guidelines."
    },
    {
      question: "Do we have a dedicated point of contact during the project?",
      answer: "Yes, you get a 1:1 dedicated Project Manager. This single point of contact keeps you informed, on time, and on budget at every step."
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