/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROCESS_STEPS } from '../data';
import { ChevronRight, Target, ClipboardCheck, Code2, Rocket } from 'lucide-react';

export default function InteractiveProcess() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = PROCESS_STEPS;

  const stepIcons = [
    <Target className="w-5 h-5 text-blue-400" />,
    <ClipboardCheck className="w-5 h-5 text-indigo-400" />,
    <Code2 className="w-5 h-5 text-pink-400" />,
    <Rocket className="w-5 h-5 text-emerald-400" />
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="agency-process">
      {/* Step Buttons Column */}
      <div className="lg:col-span-5 space-y-3.5 flex flex-col justify-center">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <motion.button
              key={step.number}
              onClick={() => setActiveStep(idx)}
              id={`process-step-tab-${step.number}`}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                isActive 
                  ? 'bg-white/[0.04] border-blue-500 shadow-glow-indigo' 
                  : 'bg-white/[0.012] border-white/5 hover:border-white/15'
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className={`font-mono text-xs font-bold leading-none px-2 py-1 rounded transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/40'
                }`}>
                  {step.number}
                </span>
                
                <div className="min-w-0">
                  <h4 className={`text-sm font-bold font-display tracking-wide ${isActive ? 'text-white' : 'text-white/60'}`}>
                    {step.title}
                  </h4>
                </div>
              </div>

              <div className={`p-1.5 rounded transition-all ${isActive ? 'bg-blue-500/10 text-blue-400' : 'text-white/20'}`}>
                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90' : ''}`} />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Dynamic Process details inspector right side */}
      <div className="lg:col-span-7 flex">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col justify-between p-6 bg-white/[0.01] border border-white/5 md:border-white/10 rounded-2xl relative overflow-hidden"
          >
            {/* Grid background effect */}
            <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Header Icon */}
              <div className="flex justify-between items-center">
                <div className="flex h-12 w-12 rounded-xl items-center justify-center bg-white/[0.03] border border-white/10">
                  {stepIcons[activeStep]}
                </div>
                <span className="font-mono text-5xl font-extrabold text-white/5 opacity-10">
                  {steps[activeStep].number}
                </span>
              </div>

              {/* Title & Descr */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold block">
                  Workflow Operation Level {steps[activeStep].number}
                </span>
                <h3 className="text-xl font-display font-extrabold text-white tracking-wide">
                  {steps[activeStep].title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed max-w-xl">
                  {steps[activeStep].description}
                </p>
              </div>

              {/* Incremental Sub-process Details Checklists */}
              <div className="space-y-3 pt-2">
                <h5 className="text-[10px] font-mono tracking-wider uppercase text-white/40">Division Deliverables:</h5>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-2.5">
                  {steps[activeStep].details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-3 bg-white/[0.015] border border-white/5 p-3 rounded-lg hover:border-white/10 transition-all">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span className="text-xs text-white/80 font-medium">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated timeline tracking indicators */}
            <div className="relative z-10 mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-white/35">
              <span>EST. COMPLETION TIMEFRAME</span>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((dotIdx) => (
                  <div 
                    key={dotIdx} 
                    className={`h-2 rounded-full transition-all ${
                      dotIdx === activeStep 
                        ? 'w-6 bg-blue-500 shadow-glow-blue' 
                        : dotIdx < activeStep 
                          ? 'w-2 bg-emerald-500' 
                          : 'w-2 bg-white/10'
                    }`} 
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
