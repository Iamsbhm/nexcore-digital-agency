/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, ArrowUpRight, TrendingUp, Info } from 'lucide-react';

export default function ConversionGauge() {
  const [traffic, setTraffic] = useState<number>(50); // in thousands
  const [designPolish, setDesignPolish] = useState<number>(40); // 0 - 100
  const [aiIntegration, setAiIntegration] = useState<number>(30); // 0 - 100

  // Calculate simulated metrics
  const designMultiplier = 1 + (designPolish / 100) * 1.5; // Up to 2.5x conversion rate rise
  const aiMultiplier = 1 + (aiIntegration / 100) * 0.9;     // Up to 1.9x conversion rate rise
  const baseConversionRate = 1.2; // 1.2% base

  const conversionRate = Math.min(9.8, parseFloat((baseConversionRate * designMultiplier * aiMultiplier).toFixed(2)));
  const dailyLeads = Math.round((traffic * 1000 * (conversionRate / 100)) / 30);
  const revenueGain = Math.round(dailyLeads * 185); // assume $185 average value per lead

  // SVG parameters for the ring
  const sqSize = 180;
  const strokeWidth = 10;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * (conversionRate / 10)) / 1;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-1 min-h-[360px]">
      {/* Control sliders */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-4 h-4 text-pink-500" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Conversion Optimization Simulator</h4>
        </div>

        <p className="text-xs text-white/50 leading-relaxed">
          Manipulate design parameters and system integrations below to calculate conversions and revenue benchmarks.
        </p>

        <div className="space-y-4 pt-2">
          {/* Slider 1: Traffic */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-white/60 font-semibold">Monthly Traffic Volume:</span>
              <span className="text-white/9 text-mono font-bold">{traffic}K visitors</span>
            </div>
            <input
              type="range"
              min="10"
              max="250"
              value={traffic}
              onChange={(e) => setTraffic(parseInt(e.target.value))}
              id="gauge-traffic-slider"
              className="w-full accent-pink-500 h-1 bg-white/10 rounded-lg cursor-pointer"
            />
          </div>

          {/* Slider 2: Design Quality */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-white/60 font-semibold">Layout Fidelity & Branding Polish:</span>
              <span className="text-pink-400 font-mono font-bold">{designPolish}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={designPolish}
              onChange={(e) => setDesignPolish(parseInt(e.target.value))}
              id="gauge-design-slider"
              className="w-full accent-pink-500 h-1 bg-white/10 rounded-lg cursor-pointer"
            />
          </div>

          {/* Slider 3: AI Smart Routings */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-white/60 font-semibold">AI Automatons & Agent Integration:</span>
              <span className="text-indigo-400 font-mono font-bold">{aiIntegration}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={aiIntegration}
              onChange={(e) => setAiIntegration(parseInt(e.target.value))}
              id="gauge-ai-slider"
              className="w-full accent-indigo-500 h-1 bg-white/10 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Highlight Alert */}
        <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg flex items-start gap-2.5">
          <Info className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
          <p className="text-[10px] text-white/50 leading-relaxed">
            Every increase in Layout Polish boosts trust triggers. Adding AI agents saves response lag, reducing cart abandons. The simulated multipliers are based on real A/B case-studies.
          </p>
        </div>
      </div>

      {/* Circle Gauge Graphic Output */}
      <div className="w-full lg:w-72 bg-white/[0.01] border border-white/5 p-4 rounded-xl flex flex-col justify-between items-center relative">
        <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase mb-2">Simulated Outcome</span>

        {/* Ring & Percentage Indicator container */}
        <div className="relative flex items-center justify-center my-2">
          {/* Radial indicator SVG */}
          <svg width={sqSize} height={sqSize} viewBox={viewBox} className="transform -rotate-90">
            {/* Background Circle shadow track */}
            <circle
              className="stroke-white/5 fill-transparent"
              cx={sqSize / 2}
              cy={sqSize / 2}
              r={radius}
              strokeWidth={`${strokeWidth}px`}
            />
            {/* Active circle with glow parameters */}
            <circle
              className="stroke-pink-500 fill-transparent transition-all duration-300"
              cx={sqSize / 2}
              cy={sqSize / 2}
              r={radius}
              strokeWidth={`${strokeWidth}px`}
              style={{
                strokeDasharray: dashArray,
                strokeDashoffset: dashOffset,
                strokeLinecap: 'round'
              }}
            />
          </svg>

          {/* Central Values Display text */}
          <div className="absolute text-center">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">CONVERSION</span>
            <span className="text-3xl font-display font-extrabold text-white tracking-tight">{conversionRate}%</span>
            <div className="flex items-center gap-1 justify-center text-emerald-400 text-[10px] mt-0.5 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{parseFloat((conversionRate / 1.2).toFixed(1))}x baseline</span>
            </div>
          </div>
        </div>

        {/* Numerical Output metrics below */}
        <div className="w-full pt-3 border-t border-white/5 grid grid-cols-2 gap-3 mt-4 text-center">
          <div className="p-2 bg-white/[0.01] rounded border border-white/5">
            <span className="text-[9px] font-mono text-white/40 uppercase block">Daily New Leads</span>
            <span className="text-lg font-bold text-white mt-1 block">~{dailyLeads}</span>
            <span className="text-[8px] text-white/30 font-mono">leads/day</span>
          </div>

          <div className="p-2 bg-white/[0.01] rounded border border-white/5">
            <span className="text-[9px] font-mono text-white/40 uppercase block">Est Revenue Gain</span>
            <span className="text-lg font-bold text-emerald-400 mt-1 block">${revenueGain.toLocaleString()}</span>
            <span className="text-[8px] text-white/30 font-mono">monthly value</span>
          </div>
        </div>
      </div>
    </div>
  );
}
