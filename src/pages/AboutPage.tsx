import { motion } from 'motion/react';
import { ArrowRight, Target, Zap, Users, Shield } from 'lucide-react';

interface AboutPageProps {
  openBooking: (plan: string, price: string) => void;
}

const values = [
  { icon: Target, title: 'Precision-First', desc: 'Every pixel, every line of code crafted with surgical precision for maximum impact and performance.' },
  { icon: Zap,    title: 'Speed & Scale',   desc: 'We build fast, deploy faster, and architect systems that scale to millions without breaking.' },
  { icon: Users,  title: 'Client-Centric',  desc: "Your vision drives every decision. We're partners in your digital legacy, not just vendors." },
  { icon: Shield, title: 'Built to Last',   desc: 'Architecture engineered for longevity — secure, maintainable, and ready for what comes next.' },
];

const team = [
  { name: 'Alex Carter',  role: 'Founder & Creative Director', exp: '12 yrs', color: 'from-[#c5a059]/30 to-[#8c6e3d]/10' },
  { name: 'Maya Patel',   role: 'Lead Engineer',               exp: '9 yrs',  color: 'from-blue-500/20 to-blue-800/10' },
  { name: 'Jordan Lee',   role: 'UX Strategy Director',        exp: '8 yrs',  color: 'from-emerald-500/20 to-emerald-800/10' },
  { name: 'Sam Rivera',   role: 'AI & Automation Lead',        exp: '7 yrs',  color: 'from-purple-500/20 to-purple-800/10' },
  { name: 'Claudine',     role: 'Web Solution Consultant',     exp: '6 yrs',  color: 'from-rose-500/20 to-rose-800/10' },
];

export default function AboutPage({ openBooking }: AboutPageProps) {
  return (
    <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto pt-8 pb-24 space-y-28">

      {/* ── Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 py-20"
      >
        <span className="text-[9px] font-mono tracking-[0.35em] text-[#c5a059] uppercase">— Our Story —</span>
        <h1 className="text-5xl md:text-7xl font-display font-light text-white leading-[1.08]">
          Built by Craftsmen,<br />
          <span className="font-serif italic text-[#c5a059]">Driven by Results.</span>
        </h1>
        <p className="text-sm text-white/40 max-w-xl mx-auto leading-relaxed">
          Pixel Vance Digital was founded with one belief: businesses deserve digital experiences as extraordinary as their ambitions.
        </p>
      </motion.div>

      {/* ── Stats ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { value: '7+',   label: 'Years in Market' },
          { value: '500+', label: 'Projects Delivered' },
          { value: '200+', label: 'Happy Clients' },
          { value: '98%',  label: 'Retention Rate' },
        ].map((s, i) => (
          <div key={i} className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl text-center hover:border-[#c5a059]/30 transition-colors duration-300 group">
            <span className="text-4xl font-display font-black text-white block group-hover:text-[#c5a059] transition-colors">{s.value}</span>
            <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block mt-2">{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* ── Story ── */}
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="text-[9px] font-mono tracking-[0.3em] text-[#c5a059] uppercase">Our Journey</span>
          <h2 className="text-3xl md:text-4xl font-display font-light text-white leading-snug">
            From a small studio to a<br />
            <span className="font-serif italic text-[#c5a059]">full-scale digital powerhouse.</span>
          </h2>
          <p className="text-sm text-white/40 leading-relaxed">
            Founded in 2018, Pixel Vance Digital started as a two-person design studio focused on brand identity. Over seven years, we've grown into a full-spectrum digital agency with specialists across design, engineering, AI automation, and growth strategy.
          </p>
          <p className="text-sm text-white/40 leading-relaxed">
            Today, we serve startups, scale-ups, and enterprise companies across the USA and internationally — delivering digital systems that don't just look extraordinary, but perform at the highest level.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          {['New York City HQ', 'Remote-First Team', 'USA & International', '24/7 Client Support'].map((item, i) => (
            <div key={i} className="p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-[#c5a059]/30 transition-all group cursor-default">
              <div className="w-2 h-2 rounded-full bg-[#c5a059] mb-3 group-hover:scale-125 transition-transform" />
              <span className="text-xs text-white/45 font-mono leading-relaxed">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Values ── */}
      <div className="space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[9px] font-mono tracking-[0.3em] text-[#c5a059] uppercase">What We Stand For</span>
          <h2 className="text-3xl md:text-4xl font-display font-light text-white">Our Core Values</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl space-y-4 hover:border-[#c5a059]/30 hover:bg-white/[0.04] transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#c5a059]/10 border border-[#c5a059]/15 flex items-center justify-center group-hover:bg-[#c5a059]/20 transition-colors">
                <v.icon className="w-5 h-5 text-[#c5a059]" />
              </div>
              <h3 className="text-sm font-display font-bold text-white">{v.title}</h3>
              <p className="text-xs text-white/35 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Team ── */}
      <div className="space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[9px] font-mono tracking-[0.3em] text-[#c5a059] uppercase">The People</span>
          <h2 className="text-3xl md:text-4xl font-display font-light text-white">Meet the Core Team</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl space-y-4 hover:border-[#c5a059]/30 transition-all group"
            >
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${member.color} border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                <span className="text-xl font-serif italic text-white/80">{member.name[0]}</span>
              </div>
              <div>
                <p className="text-sm font-display font-semibold text-white">{member.name}</p>
                <p className="text-[10px] text-white/35 font-mono mt-0.5">{member.role}</p>
              </div>
              <span className="text-[9px] font-mono text-[#c5a059]/70 bg-[#c5a059]/5 border border-[#c5a059]/10 px-2.5 py-1 rounded-full inline-block">
                {member.exp} experience
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 py-14 border border-white/[0.06] rounded-3xl bg-white/[0.01] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#c5a059]/[0.03] to-transparent pointer-events-none" />
        <div className="relative z-10 space-y-5">
          <span className="text-[9px] font-mono tracking-[0.3em] text-[#c5a059] uppercase">Let's Build Together</span>
          <h2 className="text-3xl md:text-4xl font-display font-light text-white">
            Ready to Start Your <span className="font-serif italic text-[#c5a059]">Digital Legacy?</span>
          </h2>
          <p className="text-sm text-white/35">Book a free 30-minute strategy session and let's explore your vision.</p>
          <button
            onClick={() => openBooking('GROWTH', '$2,999')}
            id="about-cta-btn"
            className="inline-flex items-center gap-2.5 py-3.5 px-8 bg-[#c5a059] hover:bg-transparent border border-[#c5a059] text-black hover:text-white text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
          >
            Book a Strategy Session <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
