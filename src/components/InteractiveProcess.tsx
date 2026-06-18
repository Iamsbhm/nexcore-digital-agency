import React from 'react';
import { Target, ClipboardCheck, Code2, Rocket } from 'lucide-react';
import { PROCESS_STEPS } from '../data';

export default function InteractiveProcess() {
  const steps = PROCESS_STEPS;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5" id="agency-process">
      {steps.map((step, idx) => {
        // Grid span configuration matching the asymmetrical layout:
        // Card 1: lg:col-span-7 (wider)
        // Card 2: lg:col-span-5 (narrower)
        // Card 3: lg:col-span-5 (narrower)
        // Card 4: lg:col-span-7 (wider)
        const isWider = idx === 0 || idx === 3;
        const colSpanClass = isWider ? 'lg:col-span-7' : 'lg:col-span-5';

        return (
          <div
            key={step.number}
            className={`group flex flex-col justify-between p-5 bg-white/[0.01] border border-white/[0.06] hover:border-[#ffffff]/40 rounded-3xl transition-all duration-300 ${colSpanClass} relative overflow-hidden`}
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.002) 100%)',
            }}
          >
            {/* 1. Header Illustration (Top of Card) */}
            <div className="w-full h-40 bg-[#07080c]/60 border border-white/[0.03] rounded-2xl overflow-hidden relative mb-5 flex flex-col justify-center items-center">
              {/* Ambient backdrop glow */}
              <div className="absolute inset-0 bg-dot-pattern opacity-10" />
              <div className="absolute w-24 h-24 rounded-full bg-[#ffffff]/[0.02] blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              {/* Step-specific custom premium UI mockup */}
              {idx === 0 && (
                /* Step 01 Mockup: Traffic Growth Discovery Audit Chart */
                <div className="w-full h-full px-6 py-4 flex flex-col justify-between relative">
                  {/* Top Stats bar */}
                  <div className="flex justify-between items-center text-[9px] font-mono text-white/30">
                    <span>ORGANIC SEARCH METRIC</span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">+280%</span>
                  </div>
                  {/* Chart representation */}
                  <div className="flex-1 flex items-end justify-between relative mt-2">
                    <svg className="w-full h-16 overflow-visible" viewBox="0 0 300 60">
                      <defs>
                        <linearGradient id="glow-grad" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 50 Q 50 20 100 45 T 200 15 T 300 5"
                        fill="none"
                        stroke="url(#glow-grad)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      {/* Node point */}
                      <circle cx="200" cy="15" r="4" fill="#ffffff" className="animate-ping" />
                      <circle cx="200" cy="15" r="4" fill="#ffffff" />
                    </svg>

                    {/* Pop-up Stat Tooltip */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#0c0d12]/90 border border-[#c5a059]/30 rounded-lg py-1 px-2.5 shadow-lg flex flex-col items-center gap-0.5">
                      <span className="text-[10px] font-display font-black text-white">4,850</span>
                      <span className="text-[7px] font-mono text-white/45 uppercase tracking-wider">MONTHLY REACH</span>
                    </div>

                    {/* Cursor with Name Badge */}
                    <div className="absolute top-1/2 left-[60%] flex items-start gap-1">
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white drop-shadow">
                        <path d="M0.5 0.5V10.2L2.9 7.8L5.7 10.5L6.9 9.3L4.1 6.6L7.3 6.6L0.5 0.5Z" fill="black" stroke="white" strokeWidth="0.8"/>
                      </svg>
                      <div className="bg-[#0f172a] text-white border border-white/10 text-[8px] font-mono py-0.5 px-1.5 rounded-md shadow-md">
                        Goal Audit
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {idx === 1 && (
                /* Step 02 Mockup: Strategy Roadmap & Proposal Checklist */
                <div className="w-full h-full px-5 py-4 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[9px] font-mono text-white/30">
                    <span>ROADMAP DELIVERABLES</span>
                    <span className="text-[#c5a059] font-bold">PHASE 1</span>
                  </div>
                  {/* Strategy Proposal Checklist Cards */}
                  <div className="space-y-2 mt-2">
                    {[
                      { label: "Sitemap & Scope", percent: "100%", done: true },
                      { label: "Pricing Packages", percent: "100%", done: true },
                      { label: "Architecture PDF", percent: "Approved", done: false }
                    ].map((row, rIdx) => (
                      <div key={rIdx} className="flex items-center justify-between bg-white/[0.02] border border-white/[0.05] p-2 rounded-lg text-[10px]">
                        <div className="flex items-center gap-2">
                          <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                            row.done ? 'bg-[#c5a059]/10 border-[#c5a059]/40 text-[#c5a059]' : 'border-white/20 text-white/20'
                          }`}>
                            ✓
                          </div>
                          <span className="text-white/60 font-semibold">{row.label}</span>
                        </div>
                        <span className={`text-[8px] font-mono uppercase ${row.done ? 'text-[#c5a059]' : 'text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded'}`}>
                          {row.percent}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {idx === 2 && (
                /* Step 03 Mockup: Design System Figma-like Avatars collaboration */
                <div className="w-full h-full px-5 py-4 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[9px] font-mono text-white/30">
                    <span>DESIGN SYSTEMS WORKSPACE</span>
                    <div className="flex -space-x-1.5">
                      <div className="w-4 h-4 rounded-full bg-blue-500 border border-[#07080c] flex items-center justify-center text-[7px] font-bold text-white">C</div>
                      <div className="w-4 h-4 rounded-full bg-[#c5a059] border border-[#07080c] flex items-center justify-center text-[7px] font-bold text-white">M</div>
                      <div className="w-4 h-4 rounded-full bg-[#0c0a1f] border border-[#07080c] flex items-center justify-center text-[7px] font-bold text-white/70 font-mono">+3</div>
                    </div>
                  </div>
                  {/* Visual design canvas mock elements */}
                  <div className="flex-1 flex items-center justify-center relative mt-2">
                    <div className="w-32 h-14 border border-dashed border-[#c5a059]/40 bg-[#c5a059]/[0.02] rounded-lg relative flex items-center justify-center">
                      {/* Canvas resize nodes */}
                      <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-[#c5a059]" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-[#c5a059]" />
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-[#c5a059]" />
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-[#c5a059]" />
                      
                      <span className="text-[10px] font-display font-black text-white/60 tracking-wider">UI DESIGN BLOCK</span>
                    </div>

                    {/* Figma active cursor */}
                    <div className="absolute top-[60%] left-[55%] flex items-start gap-1">
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white drop-shadow">
                        <path d="M0.5 0.5V10.2L2.9 7.8L5.7 10.5L6.9 9.3L4.1 6.6L7.3 6.6L0.5 0.5Z" fill="#7c3aed" stroke="white" strokeWidth="0.8"/>
                      </svg>
                      <div className="bg-[#7c3aed] text-white text-[8px] font-mono py-0.5 px-1.5 rounded-md shadow-md leading-none">
                        Design Canvas
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {idx === 3 && (
                /* Step 04 Mockup: Launch Speedometer & Global CDN Deployment */
                <div className="w-full h-full px-6 py-4 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[9px] font-mono text-white/30">
                    <span>HOSTING & PERFORMANCE AUDIT</span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">99/100 Core Web Vitals</span>
                  </div>
                  {/* Gauge metrics and CDN nodes */}
                  <div className="flex-1 flex items-center justify-around mt-2">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center relative">
                        <span className="text-[10px] font-mono font-bold text-white">0.8s</span>
                      </div>
                      <span className="text-[8px] font-mono text-white/40">LCP SPEED</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full border-2 border-[#c5a059]/20 border-t-[#c5a059] flex items-center justify-center relative">
                        <span className="text-[10px] font-mono font-bold text-white">100%</span>
                      </div>
                      <span className="text-[8px] font-mono text-white/40">GLOBAL CDN</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 flex items-center justify-center relative">
                        <span className="text-[10px] font-mono font-bold text-white">SECURE</span>
                      </div>
                      <span className="text-[8px] font-mono text-white/40">SSL CERT</span>
                    </div>

                    {/* Cursor pointing */}
                    <div className="absolute top-[40%] left-[80%] flex items-start gap-1">
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white drop-shadow">
                        <path d="M0.5 0.5V10.2L2.9 7.8L5.7 10.5L6.9 9.3L4.1 6.6L7.3 6.6L0.5 0.5Z" fill="#10b981" stroke="white" strokeWidth="0.8"/>
                      </svg>
                      <div className="bg-[#10b981] text-white text-[8px] font-mono py-0.5 px-1.5 rounded-md shadow-md leading-none">
                        Live Ship
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Text Content (Bottom of Card) */}
            <div className="space-y-4">
              <div className="space-y-2">
                {/* Step number + Title */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold leading-none px-2.5 py-1 rounded bg-[#ffffff]/10 text-[#ffffff] border border-[#c5a059]/20">
                    {step.number}
                  </span>
                  <h3 className="text-base md:text-lg font-display font-black text-white tracking-tight group-hover:text-[#c5a059] transition-colors duration-200">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-white/45 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Gold gradient line */}
              <div className="h-[1px] bg-gradient-to-r from-white/[0.08] to-transparent w-full" />

              {/* 3. Deliverables list */}
              <div className="space-y-2">
                <span className="text-[9px] font-mono tracking-widest text-[#c5a059]/60 font-bold uppercase block">
                  Deliverables & Milestones:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {step.details.map((detail, dIdx) => (
                    <span
                      key={dIdx}
                      className="text-[10px] bg-white/[0.012] border border-white/[0.06] text-white/50 px-2.5 py-1 rounded-lg hover:border-white/15 hover:text-white transition-colors duration-200"
                    >
                      ✓ {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
