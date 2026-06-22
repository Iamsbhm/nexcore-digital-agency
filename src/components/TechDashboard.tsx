import React, { useState, useEffect } from 'react';
import { Code, Layers, Palette, Smartphone, Sparkles, ShoppingBag } from 'lucide-react';

const GOLD = '#c5a059';
const GOLD_GLOW = 'rgba(197, 160, 89, 0.45)';

interface TechDashboardProps {
  scrollToSection: (id: string) => void;
}

export default function TechDashboard({ scrollToSection }: TechDashboardProps) {
  // Real-time fluctuating uptime & response time simulations
  const [uptime, setUptime] = useState(99.98);
  const [perfScore, setPerfScore] = useState(97);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  // Fluctuations for a live feel
  useEffect(() => {
    const t = setInterval(() => {
      setUptime(+(99.9 + Math.random() * 0.09).toFixed(2));
      setPerfScore(Math.floor(96 + Math.random() * 4));
    }, 4000);
    return () => clearInterval(t);
  }, []);

  // Terminal Typing Animation Simulation
  const steps = [
    { text: '$ npm run build:prod', delay: 1000 },
    { text: '✔ TypeScript compiled (0 errors)', delay: 1200 },
    { text: '✔ Bundle optimized → 142kb gzip', delay: 1000 },
    { text: '→ Deploying to Vercel Edge...', delay: 1400 },
    { text: '✔ Deploy complete in 18s', delay: 800 },
    { text: '● Server live at CDN-East (24ms)', delay: 2000 },
  ];

  useEffect(() => {
    let currentStep = 0;
    const runTerminal = async () => {
      setTerminalLines([]);
      for (let i = 0; i < steps.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, steps[i].delay));
        setTerminalLines((prev) => [...prev, steps[i].text]);
        setActiveStep(i);
      }
      // Pause at end, then loop
      await new Promise((resolve) => setTimeout(resolve, 5000));
      runTerminal();
    };

    runTerminal();
  }, []);

  return (
    <div className="flex flex-col gap-3.5 relative">
      {/* Glow backgrounds */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#c5a059]/[0.02] blur-3xl pointer-events-none" />

      {/* ─── Top row: Metric cards ─── */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          {
            label: 'Uptime',
            value: `${uptime}%`,
            sub: '30-day avg',
            icon: '↑',
            pct: uptime,
          },
          {
            label: 'Perf Score',
            value: `${perfScore}/100`,
            sub: 'Core Web Vitals',
            icon: '⚡',
            pct: perfScore,
          },
          {
            label: 'Projects',
            value: '500+',
            sub: 'Delivered USA',
            icon: '✦',
            pct: 85,
          },
        ].map((m) => (
          <div
            key={m.label}
            className="bg-[#0a0b15] border border-white/[0.07] hover:border-[#c5a059]/30 rounded-xl p-3 flex flex-col gap-2 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono tracking-widest uppercase text-white/40 group-hover:text-[#c5a059] transition-colors">{m.label}</span>
              <span className="text-[10px]" style={{ color: GOLD }}>{m.icon}</span>
            </div>
            <span className="text-lg font-display font-black text-white leading-none">{m.value}</span>
            <div className="flex flex-col gap-1">
              <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${m.pct}%`,
                    background: `linear-gradient(90deg, #c5a059, #e8c97a)`,
                    boxShadow: `0 0 6px ${GOLD_GLOW}`,
                  }}
                />
              </div>
              <span className="text-[7px] font-mono text-white/30">{m.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Middle: Interactive Terminal ─── */}
      <div className="bg-[#080910] border border-white/[0.07] hover:border-white/15 rounded-xl overflow-hidden transition-all duration-300">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#0d0f1c] border-b border-white/[0.05]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]/30" />
          <span className="ml-2 text-[8px] font-mono text-white/25 tracking-wider">~/pixelvance/deploy.sh</span>
          <span className="ml-auto text-[7px] font-mono text-[#c5a059]/75 flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#c5a059] animate-ping" />
            running
          </span>
        </div>

        <div className="px-4 py-3 font-mono text-[9px] leading-[1.8] min-h-[125px] flex flex-col justify-end bg-black/40">
          <div className="space-y-0.5">
            {terminalLines.map((line, idx) => {
              const isCommand = line.startsWith('$');
              const isSuccess = line.startsWith('✔');
              const isInfo = line.startsWith('→');
              const isServer = line.startsWith('●');

              return (
                <div key={idx} className="flex items-start gap-1">
                  {isCommand && <span style={{ color: GOLD }} className="font-bold">pv</span>}
                  <span
                    style={{
                      color: isSuccess
                        ? '#e8c97a'
                        : isInfo
                        ? 'rgba(255,255,255,0.7)'
                        : isServer
                        ? '#c5a059'
                        : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {line}
                  </span>
                </div>
              );
            })}

            {/* Blinking cursor */}
            <div className="flex items-center gap-1 pt-0.5">
              <span className="text-white/30">$</span>
              <span className="inline-block w-1.5 h-3 bg-[#c5a059]/80 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom row: Service network nodes ─── */}
      <div className="bg-[#0a0b15] border border-white/[0.07] rounded-xl p-3.5 transition-all duration-300 hover:border-white/[0.12]">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[8px] font-mono tracking-widest text-white/40 uppercase">Service Stack</span>
          <span className="text-[7px] font-mono text-[#c5a059]/70 flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#c5a059] animate-pulse" />
            All systems operational
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Web Dev', icon: <Code className="w-3 h-3" />, status: '12 active' },
            { label: 'WordPress', icon: <Layers className="w-3 h-3" />, status: '8 active' },
            { label: 'UI/UX', icon: <Palette className="w-3 h-3" />, status: '6 active' },
            { label: 'Mobile', icon: <Smartphone className="w-3 h-3" />, status: '4 active' },
            { label: 'AI & Auto', icon: <Sparkles className="w-3 h-3" />, status: '3 active' },
            { label: 'E-Commerce', icon: <ShoppingBag className="w-3 h-3" />, status: '7 active' },
          ].map((svc) => (
            <div
              key={svc.label}
              onClick={() => scrollToSection('services-explorer-section')}
              className="flex items-center gap-2 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] hover:border-[#c5a059]/25 rounded-lg px-2 py-1.5 cursor-pointer transition-all duration-200 group"
            >
              <span style={{ color: GOLD }} className="group-hover:scale-110 transition-transform flex-shrink-0">
                {svc.icon}
              </span>
              <div className="overflow-hidden">
                <span className="text-[8px] font-mono text-white/70 block truncate group-hover:text-white transition-colors">
                  {svc.label}
                </span>
                <span className="text-[7px] font-mono block text-white/35 group-hover:text-[#c5a059]/80 transition-colors">
                  {svc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
