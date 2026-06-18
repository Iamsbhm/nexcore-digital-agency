import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CLIENT_REVIEWS } from '../data';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const GOLD = '#c5a059';

export default function TestimonialsSlider() {
  const reviews = CLIENT_REVIEWS;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  /* Auto-advance every 5s */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActive((p) => (p === reviews.length - 1 ? 0 : p + 1));
    }, 5000);
    return () => clearInterval(t);
  }, [paused, reviews.length]);

  const prev = () => setActive((p) => (p === 0 ? reviews.length - 1 : p - 1));
  const next = () => setActive((p) => (p === reviews.length - 1 ? 0 : p + 1));

  const platforms = [
    { name: 'Google',   rating: '5.0', reviews: '47+' },
    { name: 'Clutch',   rating: '4.9', reviews: '31+' },
    { name: 'Upwork',   rating: '5.0', reviews: '28+' },
  ];

  return (
    <section
      className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto"
      id="testimonials-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div className="max-w-xl">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5"
            style={{ borderColor: 'rgba(197,160,89,0.2)', background: 'rgba(197,160,89,0.06)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD }} />
            <span className="text-[9px] font-mono tracking-[0.25em] uppercase" style={{ color: GOLD }}>
              Client Stories
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-tight">
            Don't Take Our Word{' '}
            <span className="bg-gradient-to-r from-[#c5a059] via-[#e8c97a] to-[#a07840] bg-clip-text text-transparent">
              For It.
            </span>
          </h2>
          <p className="mt-4 text-sm text-white/40 max-w-md leading-relaxed">
            Real feedback from US business owners who scaled their revenue with our websites and digital solutions.
          </p>
        </div>

        {/* Platform ratings */}
        <div className="flex items-center gap-4 flex-wrap">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="flex flex-col items-center px-4 py-3 rounded-xl border"
              style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#c5a059] text-[#c5a059]" />
                ))}
              </div>
              <div className="text-base font-display font-black text-white">{p.rating}</div>
              <div className="text-[8px] font-mono text-white/30 mt-0.5">{p.name} · {p.reviews} reviews</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN TESTIMONIAL CARD ── */}
      <div
        className="relative rounded-2xl border overflow-hidden"
        style={{ borderColor: 'rgba(197,160,89,0.12)', background: 'rgba(197,160,89,0.03)' }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(197,160,89,0.5), transparent)' }}
        />

        {/* Decorative quote */}
        <Quote
          className="absolute right-8 top-6 w-24 h-24 pointer-events-none"
          style={{ color: 'rgba(197,160,89,0.06)' }}
        />

        <div className="p-8 md:p-10">
          <div className="grid md:grid-cols-12 gap-8 items-center">

            {/* Left — avatar stack + counter */}
            <div className="md:col-span-3 flex flex-col gap-5">
              {/* Avatar stack */}
              <div>
                <div className="flex -space-x-3 mb-3">
                  {reviews.map((rev, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`w-11 h-11 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white uppercase transition-all duration-200 cursor-pointer ${rev.avatarBg}`}
                      style={{
                        borderColor: active === i ? GOLD : '#06070e',
                        transform: active === i ? 'scale(1.15)' : 'scale(0.95)',
                        zIndex: active === i ? 10 : 5,
                        opacity: active === i ? 1 : 0.55,
                        boxShadow: active === i ? `0 0 0 2px ${GOLD}` : 'none',
                      }}
                    >
                      {rev.initials}
                    </button>
                  ))}
                </div>
                <p className="text-[9px] font-mono text-white/30">Click to switch reviews</p>
              </div>

              {/* Review count stat */}
              <div
                className="p-4 rounded-xl border"
                style={{ borderColor: 'rgba(197,160,89,0.12)', background: 'rgba(197,160,89,0.05)' }}
              >
                <div className="text-3xl font-display font-black" style={{ color: GOLD }}>106+</div>
                <div className="text-[10px] font-mono text-white/35 mt-1">Verified 5-star reviews</div>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#c5a059] text-[#c5a059]" />
                  ))}
                </div>
              </div>
            </div>

            {/* Right — quote content */}
            <div className="md:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(reviews[active].stars)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#c5a059] text-[#c5a059]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote
                    className="text-lg md:text-2xl font-display font-bold text-white leading-snug"
                  >
                    {reviews[active].comment}
                  </blockquote>

                  {/* Client info */}
                  <div
                    className="flex items-center gap-4 pt-4 border-t"
                    style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white uppercase flex-shrink-0 ${reviews[active].avatarBg}`}
                    >
                      {reviews[active].initials}
                    </div>
                    <div>
                      <div className="text-sm font-display font-bold text-white">{reviews[active].name}</div>
                      <div className="text-[11px] font-mono text-white/40 mt-0.5">
                        {reviews[active].role} · {reviews[active].company}
                      </div>
                    </div>

                    {/* Verified badge */}
                    <div
                      className="ml-auto flex-shrink-0 px-3 py-1.5 rounded-full text-[9px] font-mono tracking-wider hidden sm:block"
                      style={{
                        color: GOLD,
                        border: `1px solid rgba(197,160,89,0.2)`,
                        background: 'rgba(197,160,89,0.06)',
                      }}
                    >
                      ✓ Verified Client
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Bottom nav bar ── */}
        <div
          className="flex items-center justify-between px-8 py-4 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}
        >
          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: active === i ? '1.75rem' : '0.375rem',
                  background: active === i ? GOLD : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
            <span className="text-[9px] font-mono text-white/25 ml-2">
              {active + 1} / {reviews.length}
            </span>
          </div>

          {/* Arrow controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              id="testimonial-prev-arrow"
              className="w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-150 hover:border-[#c5a059]/30 cursor-pointer"
              style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              id="testimonial-next-arrow"
              className="w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-150 hover:border-[#c5a059]/30 cursor-pointer"
              style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── MINI REVIEW CARDS ROW (desktop) ── */}
      <div className="hidden md:grid grid-cols-3 gap-3 mt-3">
        {reviews.map((rev, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer group"
            style={{
              borderColor: active === i ? 'rgba(197,160,89,0.3)' : 'rgba(255,255,255,0.06)',
              background: active === i ? 'rgba(197,160,89,0.05)' : 'rgba(255,255,255,0.01)',
            }}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white uppercase flex-shrink-0 ${rev.avatarBg}`}
              />
              <div>
                <div className="text-[11px] font-display font-bold text-white">{rev.name}</div>
                <div className="text-[9px] font-mono text-white/35">{rev.company}</div>
              </div>
              <div className="ml-auto flex items-center gap-0.5">
                {[...Array(rev.stars)].map((_, s) => (
                  <Star key={s} className="w-2.5 h-2.5 fill-[#c5a059] text-[#c5a059]" />
                ))}
              </div>
            </div>
            <p className="text-[10px] text-white/40 leading-relaxed line-clamp-2 italic">
              {rev.comment.replace(/^"|"$/g, '')}
            </p>
          </button>
        ))}
      </div>

    </section>
  );
}
