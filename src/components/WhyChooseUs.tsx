import React from 'react';

export default function WhyChooseUs() {
  return (
    <section className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto animate-fade-in" id="why-us-section">
      {/* ── WHY CHOOSE US ── */}
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
        <span className="text-[10px] font-mono tracking-[0.4em] text-[#c5a059] font-bold uppercase">
          — OUR EDGE —
        </span>
        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white leading-none">
          Trusted Website Development <span style={{ background: 'linear-gradient(135deg,#c5a059,#e8c97a,#c5a059)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Agency Serving the USA</span>
        </h2>
        <h3 className="text-lg md:text-xl font-display font-bold text-[#c5a059] mt-3 uppercase tracking-wider">
          UI/UX Design Focused on User Experience
        </h3>
        <p className="text-sm text-white/40 max-w-xl mx-auto leading-relaxed mt-2">
          The top-rated US web design agency that crafts custom websites, fast WordPress platforms, and user experiences that convert and scale.
        </p>
      </div>

      {/* Why Us — premium numbered cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-28">
        {[
          { num: '01', icon: '⚡', title: 'Blazing Fast Delivery', desc: 'Tight sprints, most projects ship in 2–4 weeks without sacrificing a single pixel of quality.', stat: '2–4 Weeks', statLabel: 'Avg Delivery' },
          { num: '02', icon: '🎯', title: 'Conversion-First Design', desc: 'Every pixel is intentional — engineered to guide users toward action and maximize your ROI.', stat: '3.2×', statLabel: 'Avg ROI' },
          { num: '03', icon: '🔒', title: 'Enterprise Security', desc: 'SSL, firewalls, penetration testing, and best-in-class authentication baked in from day one.', stat: '100%', statLabel: 'Secure Builds' },
          { num: '04', icon: '🌍', title: 'Global Client Base', desc: "We've delivered premium digital solutions to clients across 25+ countries on 5 continents.", stat: '25+', statLabel: 'Countries' },
          { num: '05', icon: '🤝', title: 'Dedicated PM on Every Project', desc: 'A single point of contact who keeps you informed, on time, and on budget at every step.', stat: '1:1', statLabel: 'Dedicated PM' },
          { num: '06', icon: '♾️', title: 'Post-Launch Support', desc: "We don't disappear after launch. Ongoing maintenance, updates, and priority support always.", stat: '24/7', statLabel: 'Availability' },
        ].map((card, i) => (
          <div
            key={i}
            className="group relative rounded-3xl overflow-hidden cursor-default"
            style={{ background: 'linear-gradient(145deg, rgba(197,160,89,0.06) 0%, rgba(255,255,255,0.02) 100%)' }}
          >
            {/* Animated gold border */}
            <div className="absolute inset-0 rounded-3xl border border-white/[0.08] group-hover:border-[#c5a059]/50 transition-colors duration-500" />
            {/* Corner glow */}
            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" style={{ background: 'rgba(197,160,89,0.2)' }} />

            <div className="relative p-7 flex flex-col gap-5">
              {/* Number + Icon row */}
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-mono text-[#c5a059]/50 font-bold tracking-widest">{card.num}</span>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, rgba(197,160,89,0.15), rgba(197,160,89,0.05))' }}
                >
                  {card.icon}
                </div>
              </div>

              {/* Stat */}
              <div>
                <div className="text-3xl font-display font-black" style={{ background: 'linear-gradient(135deg,#c5a059,#e8c97a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {card.stat}
                </div>
                <div className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/35 mt-0.5">{card.statLabel}</div>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-gradient-to-r from-[#c5a059]/30 to-transparent" />

              {/* Text */}
              <div>
                <h3 className="text-sm font-display font-bold text-white mb-2 group-hover:text-[#c5a059] transition-colors duration-200">{card.title}</h3>
                <p className="text-[11px] text-white/45 leading-relaxed">{card.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── TECH STACK ── */}
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
        <span className="text-[10px] font-mono tracking-[0.4em] text-[#c5a059] font-bold uppercase">
          — TOOLS WE MASTER —
        </span>
        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white leading-none">
          Our <span style={{ background: 'linear-gradient(135deg,#c5a059,#e8c97a,#c5a059)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tech Stack</span>
        </h2>
        <p className="text-sm text-white/40 max-w-xl mx-auto leading-relaxed">
          Battle-tested technologies powering fast, scalable, and stunning digital products.
        </p>
      </div>

      {/* Tech grid — category panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          {
            category: 'Frontend', icon: '🖥️', color: '#60a5fa', bg: 'rgba(96,165,250,0.06)',
            techs: [
              { name: 'React', icon: '⚛️', bg: 'rgba(96,165,250,0.12)' },
              { name: 'Next.js', icon: '▲', bg: 'rgba(255,255,255,0.07)' },
              { name: 'TypeScript', icon: '🔷', bg: 'rgba(59,130,246,0.12)' },
              { name: 'Tailwind', icon: '🌊', bg: 'rgba(56,189,248,0.12)' },
              { name: 'Framer', icon: '🎞️', bg: 'rgba(139,92,246,0.12)' },
              { name: 'Webflow', icon: '🌐', bg: 'rgba(75,85,99,0.18)' },
            ]
          },
          {
            category: 'Backend & APIs', icon: '⚙️', color: '#34d399', bg: 'rgba(52,211,153,0.06)',
            techs: [
              { name: 'Node.js', icon: '🟢', bg: 'rgba(52,211,153,0.12)' },
              { name: 'Python', icon: '🐍', bg: 'rgba(234,179,8,0.12)' },
              { name: 'GraphQL', icon: '◈', bg: 'rgba(232,95,161,0.12)' },
              { name: 'REST APIs', icon: '🔌', bg: 'rgba(148,163,184,0.10)' },
              { name: 'Firebase', icon: '🔥', bg: 'rgba(249,115,22,0.12)' },
              { name: 'Supabase', icon: '⚡', bg: 'rgba(52,211,153,0.12)' },
            ]
          },
          {
            category: 'Mobile & E-commerce', icon: '📱', color: '#f59e0b', bg: 'rgba(245,158,11,0.06)',
            techs: [
              { name: 'React Native', icon: '📱', bg: 'rgba(96,165,250,0.12)' },
              { name: 'Flutter', icon: '🐦', bg: 'rgba(56,189,248,0.12)' },
              { name: 'Swift', icon: '🍎', bg: 'rgba(239,68,68,0.12)' },
              { name: 'Shopify', icon: '🛍️', bg: 'rgba(52,211,153,0.12)' },
              { name: 'WooCommerce', icon: '🛒', bg: 'rgba(139,92,246,0.12)' },
              { name: 'Stripe', icon: '💳', bg: 'rgba(99,102,241,0.12)' },
            ]
          },
          {
            category: 'AI & Cloud', icon: '🤖', color: '#f43f5e', bg: 'rgba(244,63,94,0.06)',
            techs: [
              { name: 'OpenAI GPT', icon: '🤖', bg: 'rgba(255,255,255,0.07)' },
              { name: 'LangChain', icon: '⛓️', bg: 'rgba(16,185,129,0.12)' },
              { name: 'AWS', icon: '☁️', bg: 'rgba(249,115,22,0.12)' },
              { name: 'Google Cloud', icon: '🌥️', bg: 'rgba(59,130,246,0.12)' },
              { name: 'Docker', icon: '🐳', bg: 'rgba(56,189,248,0.12)' },
              { name: 'Vercel', icon: '▲', bg: 'rgba(255,255,255,0.07)' },
            ]
          },
        ].map((group) => (
          <div
            key={group.category}
            className="relative rounded-3xl p-6 overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-300"
            style={{ background: `linear-gradient(145deg, ${group.bg}, rgba(255,255,255,0.01))` }}
          >
            {/* Category header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: `linear-gradient(135deg, ${group.color}25, ${group.color}10)`, border: `1px solid ${group.color}30` }}>
                {group.icon}
              </div>
              <div>
                <h3 className="text-sm font-display font-bold" style={{ color: group.color }}>{group.category}</h3>
                <div className="text-[9px] font-mono text-white/30 tracking-widest uppercase">{group.techs.length} Technologies</div>
              </div>
              {/* Decorative line */}
              <div className="flex-1 h-[1px] ml-2" style={{ background: `linear-gradient(to right, ${group.color}40, transparent)` }} />
            </div>

            {/* Tech cards grid */}
            <div className="grid grid-cols-3 gap-2.5">
              {group.techs.map((tech) => (
                <div
                  key={tech.name}
                  className="group/tech relative flex flex-col items-center gap-2 p-3 rounded-2xl border border-white/[0.06] hover:border-[#c5a059]/40 transition-all duration-200 cursor-default overflow-hidden"
                  style={{ background: tech.bg }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ background: 'radial-gradient(circle at center, rgba(197,160,89,0.08) 0%, transparent 70%)' }} />
                  <span className="text-xl leading-none relative">{tech.icon}</span>
                  <span className="text-[10px] font-mono font-semibold text-white/60 group-hover/tech:text-[#c5a059] transition-colors tracking-wide text-center leading-tight relative">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
