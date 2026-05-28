/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CLIENT_REVIEWS } from '../data';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

export default function TestimonialsSlider() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const reviews = CLIENT_REVIEWS;

  const navigateReviews = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveIndex(prev => (prev === 0 ? reviews.length - 1 : prev - 1));
    } else {
      setActiveIndex(prev => (prev === reviews.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="relative border border-white/5 bg-white/[0.012] p-6 md:p-8 rounded-2xl overflow-hidden" id="testimonials">
      {/* Absolute giant quote indicator overlay */}
      <Quote className="absolute right-6 top-6 w-36 h-36 opacity-3 text-white pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Avatars listing static summary column (desktop only) */}
        <div className="hidden md:flex md:col-span-4 flex-col gap-3">
          <span className="text-[10px] font-mono tracking-widest text-blue-400 font-bold uppercase">
            ● Direct Testimonials
          </span>
          <h4 className="text-lg font-display font-extrabold text-white leading-tight">
            Loved by Elite Corporate Leaders.
          </h4>
          
          <div className="flex -space-x-2.5 mt-3">
            {reviews.map((rev, revIdx) => (
              <button
                key={revIdx}
                onClick={() => setActiveIndex(revIdx)}
                id={`testimonial-bullet-${revIdx}`}
                className={`w-9 h-9 rounded-full border-2 border-dark-bg flex items-center justify-center font-bold text-xs text-white uppercase shrink-0 transition-all ${
                  rev.avatarBg
                } ${activeIndex === revIdx ? 'scale-115 ring-2 ring-blue-500 z-20' : 'opacity-60 scale-95 z-10'}`}
              >
                {rev.initials}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-white/45 font-mono">Click avatars to inspect reviews.</span>
        </div>

        {/* Content Showcase Slide container */}
        <div className="md:col-span-8 space-y-6">
          <div className="min-h-[160px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {/* Visual Stars */}
                <div id={`stars-count-${activeIndex}`} className="flex items-center gap-0.5">
                  {Array.from({ length: reviews[activeIndex].stars }).map((_, sIdx) => (
                    <Star key={sIdx} className="w-4.5 h-4.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Comment quote text */}
                <p className="text-sm font-sans italic text-white/95 leading-relaxed font-medium md:text-base">
                  {reviews[activeIndex].comment}
                </p>

                {/* Client Profile details footer */}
                <div className="flex items-center gap-3 pt-3">
                  {/* Initials profile bubble for mobile or backup */}
                  <div className={`w-10 h-10 rounded-full font-bold text-xs uppercase flex items-center justify-center text-white shrink-0 ${
                    reviews[activeIndex].avatarBg
                  }`}>
                    {reviews[activeIndex].initials}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold font-display text-white">
                      {reviews[activeIndex].name}
                    </h5>
                    <span className="text-[11px] text-white/45 font-mono font-medium block">
                      {reviews[activeIndex].role}, {reviews[activeIndex].company}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls bullet rows */}
          <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
            {/* Visual Indicator steps */}
            <div className="flex gap-1.5">
              {reviews.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveIndex(dotIdx)}
                  id={`testimonial-bullet-bottom-${dotIdx}`}
                  className={`h-1.5 rounded-full transition-all ${
                    dotIdx === activeIndex ? 'w-6 bg-blue-500' : 'w-1.5 bg-white/20'
                  }`}
                  aria-label={`Show review ${dotIdx + 1}`}
                />
              ))}
            </div>

            {/* Slider back/forward arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => navigateReviews('prev')}
                id="testimonial-prev-arrow"
                className="p-1 px-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-all active:scale-95 border border-white/5"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateReviews('next')}
                id="testimonial-next-arrow"
                className="p-1 px-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-all active:scale-95 border border-white/5"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
