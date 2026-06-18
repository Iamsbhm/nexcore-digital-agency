import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Clock, Globe, Users, Zap, Headphones, CheckCircle } from 'lucide-react';

/* ── Animated counter ── */
function useCounter(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return { count, ref };
}

const GOLD = '#c5a059';
const GOLD_DIM = 'rgba(197,160,89,0.12)';
const GOLD_BORDER = 'rgba(197,160,89,0.18)';

const edges = [
  { icon: Zap,          stat: '2–4 wk', sub: 'avg delivery',    title: 'Blazing Fast Delivery',    desc: 'Most projects ship in 2–4 weeks with zero quality compromise.' },
  { icon: ShieldCheck,  stat: '100%',   sub: 'secure builds',   title: 'Enterprise Security',      desc: 'SSL, WAF, pen-testing & best-in-class auth from day one.' },
  { icon: Globe,        stat: '25+',    sub: 'countries',       title: 'Global Portfolio',          desc: 'Premium digital solutions delivered across 5 continents.' },
  { icon: Users,        stat: '1:1',    sub: 'dedicated PM',    title: 'Personal Manager',          desc: 'One contact keeps you informed, on time, and on budget.' },
  { icon: Clock,        stat: '3.2×',   sub: 'avg ROI lift',    title: 'Conversion-First Design',  desc: 'Every element is engineered to guide visitors toward action.' },
  { icon: Headphones,   stat: '24/7',   sub: 'availability',    title: 'Post-Launch Support',      desc: 'Ongoing maintenance, updates, and priority support — always.' },
];



export default function WhyChooseUs() {
  const p500 = useCounter(500);
  const p98  = useCounter(98);
  const p7   = useCounter(7);
  const p200 = useCounter(200);

  return (
    <section className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto" id="why-us-section">

      {/* ── HEADER ── */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
          style={{ borderColor: GOLD_BORDER, background: GOLD_DIM }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD }} />
          <span className="text-[9px] font-mono tracking-[0.25em] uppercase" style={{ color: GOLD }}>
            Why 200+ US Businesses Choose Us
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white leading-[1.05]">
          Your Website Should Be{' '}
          <span className="bg-gradient-to-r from-[#c5a059] via-[#e8c97a] to-[#a07840] bg-clip-text text-transparent">
            Winning You Clients,
          </span>
          <br />
          <span className="text-white/65">Not Losing Them.</span>
        </h2>

        <p className="mt-5 text-sm md:text-[15px] text-white/40 max-w-lg mx-auto leading-relaxed">
          We craft <span className="text-white/65 font-medium">fast, high-converting websites</span> for US businesses
          tired of outdated designs and missed revenue.
        </p>

        {/* Proof strip */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-8">
          {[
            { val: '+43%',     lbl: 'Avg. Revenue Increase' },
            { val: '3× Speed', lbl: 'Faster than competitors' },
            { val: '98%',      lbl: 'On-time delivery rate' },
          ].map((b) => (
            <div key={b.lbl} className="flex flex-col items-center gap-0.5">
              <span className="text-xl font-display font-black" style={{ color: GOLD }}>{b.val}</span>
              <span className="text-[9px] font-mono text-white/30 tracking-wide">{b.lbl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { val: `${p500.count}+`, lbl: 'Projects Completed',    pct: p500.count / 500, ref: p500.ref },
          { val: `${p98.count}%`,  lbl: 'Client Retention Rate', pct: p98.count / 100,  ref: p98.ref  },
          { val: `${p7.count}+`,   lbl: 'Years of Experience',   pct: p7.count / 10,    ref: p7.ref   },
          { val: `${p200.count}+`, lbl: 'Happy USA Clients',     pct: p200.count / 200, ref: p200.ref },
        ].map((s, i) => (
          <div
            key={i}
            ref={s.ref}
            className="rounded-2xl border p-5 relative overflow-hidden group hover:border-[#c5a059]/30 transition-all duration-300"
            style={{ background: 'rgba(197,160,89,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="absolute top-0 inset-x-0 h-px"
              style={{ background: 'linear-gradient(to right, transparent, rgba(197,160,89,0.45), transparent)' }} />
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle, rgba(197,160,89,0.12) 0%, transparent 70%)' }} />
            <div className="text-4xl font-display font-black text-white mb-1">{s.val}</div>
            <div className="text-[11px] font-mono text-white/35 mb-4">{s.lbl}</div>
            <div className="h-0.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.min(s.pct * 100, 100)}%`,
                  background: 'linear-gradient(to right, #8c6e3d, #c5a059)',
                  boxShadow: '0 0 8px rgba(197,160,89,0.35)',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── EDGE CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
        {edges.map((e, i) => {
          const Icon = e.icon;
          return (
            <div
              key={i}
              className="rounded-2xl border p-5 relative overflow-hidden group hover:border-[#c5a059]/25 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.015)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(197,160,89,0.07) 0%, transparent 60%)' }} />
              {/* Top shine */}
              <div className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to right, transparent, rgba(197,160,89,0.4), transparent)' }} />

              <div className="relative">
                {/* Icon + Stat row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.15)' }}
                  >
                    <Icon className="w-4 h-4" style={{ color: GOLD }} />
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-display font-black" style={{ color: GOLD }}>{e.stat}</div>
                    <div className="text-[8px] font-mono text-white/25 mt-0.5">{e.sub}</div>
                  </div>
                </div>
                {/* Text */}
                <h3 className="text-sm font-display font-bold text-white mb-2">{e.title}</h3>
                <p className="text-[11px] text-white/35 leading-relaxed">{e.desc}</p>
              </div>
            </div>
          );
        })}
      </div>


      {/* ── BOTTOM CTA STRIP ── */}
      <div
        className="mt-5 rounded-2xl border p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ background: 'rgba(197,160,89,0.04)', borderColor: 'rgba(197,160,89,0.15)' }}
      >
        <div>
          <div className="text-white font-display font-bold text-base mb-1">Ready to grow your business online?</div>
          <div className="text-[11px] text-white/35 font-mono">Join 200+ US businesses that trust Pixel Vance Digital.</div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Trust marks */}
          <div className="hidden sm:flex items-center gap-3 mr-2">
            {['No contracts', 'Free audit', '7-day reply'].map((t) => (
              <div key={t} className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" style={{ color: GOLD }} />
                <span className="text-[9px] font-mono text-white/40">{t}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('pixelvance:openBooking', { detail: { plan: 'FREE AUDIT', price: 'Free' } }))}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider text-black transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #c5a059, #e8c97a)' }}
          >
            Get Free Audit
          </button>
        </div>
      </div>

    </section>
  );
}
