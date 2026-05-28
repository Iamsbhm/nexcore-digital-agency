/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, CheckCircle2, ArrowRight, Layers, FileText, Send, BellDot } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  icon: any;
  status: 'idle' | 'running' | 'completed';
  description: string;
  output: string;
}

export default function AutomationSandbox() {
  const [stages, setStages] = useState<Stage[]>([
    {
      id: 'receive',
      name: 'Receive Customer Request',
      icon: Layers,
      status: 'idle',
      description: 'Incoming customer question from web chat or contact form is captured.',
      output: '💡 Request: "Can you build a high-performance web dashboard by next Monday?"'
    },
    {
      id: 'analyze',
      name: 'Analyze Intent with AI',
      icon: FileText,
      status: 'idle',
      description: 'Gemini cognitive framework classifies request scope, urgency, and mood parameters.',
      output: '📂 Intent: Service Purchase | Urgency: Critical (H) | Sentiment: Productive'
    },
    {
      id: 'draft',
      name: 'Draft Proposal Match',
      icon: Send,
      status: 'idle',
      description: 'Automatically query internal pricing tables to assemble a custom proposal drafted instantly.',
      output: '📝 Reply draft: "Hello! We would love to tackle this timeline. We propose our Growth Package..."'
    },
    {
      id: 'ping',
      name: 'Dispatch Coordinator Alerts',
      icon: BellDot,
      status: 'idle',
      description: 'The finalized document is posted to Slack, CRM profiles are updated, and tasks allocated.',
      output: '⚡ Status: Slack Alert Dispatched | CRM Database Locked | Strategy Brief Queued'
    }
  ]);

  const [activeStageIndex, setActiveStageIndex] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [triggerCount, setTriggerCount] = useState<number>(0);

  const startPipeline = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStageIndex(0);

    // Reset stages
    setStages(prev => prev.map(s => ({ ...s, status: 'idle' })));

    let index = 0;
    const runNextStage = () => {
      if (index >= stages.length) {
        setIsRunning(false);
        setTriggerCount(prev => prev + 1);
        return;
      }

      setStages(prev => prev.map((s, idx) => {
        if (idx === index) return { ...s, status: 'running' };
        if (idx < index) return { ...s, status: 'completed' };
        return s;
      }));
      setActiveStageIndex(index);

      setTimeout(() => {
        index++;
        runNextStage();
      }, 2200);
    };

    runNextStage();
  };

  const resetPipeline = () => {
    setIsRunning(false);
    setActiveStageIndex(-1);
    setStages(prev => prev.map(s => ({ ...s, status: 'idle' })));
  };

  const forceStageSelect = (idx: number) => {
    if (isRunning) return;
    setActiveStageIndex(idx);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-1">
      {/* Simulation Controls & Flow */}
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isRunning ? 'bg-emerald-400' : 'bg-blue-400'}`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isRunning ? 'bg-emerald-500' : 'bg-blue-500'}`} />
            </span>
            <span className="text-xs font-mono text-white/70 uppercase tracking-wider">
              AI Pipeline Engine: {isRunning ? 'RUNNING' : 'ONLINE'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isRunning ? (
              <button
                onClick={startPipeline}
                id="start-pipeline-btn"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded transition-all active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-white" /> Run Flow
              </button>
            ) : (
              <div className="px-3 py-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 rounded">
                Processing Step {activeStageIndex + 1}...
              </div>
            )}
            <button
              onClick={resetPipeline}
              id="reset-pipeline-btn"
              disabled={isRunning}
              className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 rounded transition-all disabled:opacity-30 disabled:hover:bg-transparent"
              title="Reset Sandbox"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Neural Timeline Stages */}
        <div className="space-y-3 relative">
          {/* Connector Line behind stages */}
          <div className="absolute top-6 bottom-6 left-6 w-[2px] bg-white/5 pointer-events-none z-0" />

          {stages.map((stage, idx) => {
            const IconComponent = stage.icon;
            const isSelected = activeStageIndex === idx;
            const isCompleted = idx < activeStageIndex || (stage.status === 'completed');
            const isActive = stage.status === 'running';

            return (
              <motion.div
                key={stage.id}
                onClick={() => forceStageSelect(idx)}
                className={`relative z-10 flex items-start gap-4 p-4 rounded-xl cursor-pointer border transition-all ${
                  isActive 
                    ? 'bg-blue-950/20 border-blue-500 shadow-[0_0_20px_-5px_rgba(59,130,246,0.15)]' 
                    : isSelected 
                      ? 'bg-white/[0.04] border-white/20' 
                      : 'bg-white/[0.01] hover:bg-white/[0.03] border-white/5'
                }`}
                whileHover={{ x: isRunning ? 0 : 4 }}
              >
                {/* Stage Index Icon */}
                <div className={`relative flex items-center justify-center w-12 h-12 rounded-lg shrink-0 border transition-all ${
                  isActive 
                    ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                    : isCompleted 
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400' 
                      : 'bg-white/[0.02] border-white/10 text-white/50'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <IconComponent className="w-5 h-5" />}

                  {/* Flow Pulse Packet Animation */}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-6 left-1/2 -ml-1 w-2 h-2 rounded-full bg-blue-500"
                      animate={{ y: [0, 48] }}
                      transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                    />
                  )}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-sm font-semibold truncate ${isActive ? 'text-blue-400' : 'text-white'}`}>
                      {stage.name}
                    </h4>
                    <span className="text-[10px] font-mono text-white/40">STEP 0{idx + 1}</span>
                  </div>
                  <p className="text-xs text-white/50 mt-1 line-clamp-2 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Simulator Terminal Output Inspector */}
      <div className="w-full lg:w-80 flex flex-col bg-black/40 border border-white/10 rounded-xl overflow-hidden min-h-[350px]">
        <div className="bg-white/[0.03] border-b border-white/10 p-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          </div>
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
            Inspector Node
          </span>
        </div>

        <div className="flex-1 p-4 font-mono text-xs text-white/80 space-y-4 overflow-y-auto max-h-[320px]">
          {activeStageIndex === -1 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-white/40">
              <Layers className="w-8 h-8 opacity-20 mb-2 animate-bounce" />
              <p className="text-xs">Select or execute a node stage to inspect data transmission properties.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <span className="text-blue-400 font-bold">▶ STAGE_ID:</span>
                <span className="text-white/90"> {stages[activeStageIndex].id.toUpperCase()}_DISPATCH</span>
              </div>
              
              <div>
                <span className="text-blue-400 font-bold">▶ SUB_SYSTEM_ROLE:</span>
                <p className="text-white/60 mt-1 leading-relaxed bg-white/5 p-2 rounded border border-white/5">
                  {stages[activeStageIndex].description}
                </p>
              </div>

              <div>
                <span className="text-blue-400 font-bold">▶ SIMULATED_DATA_PACKET:</span>
                <div className="mt-2 text-[11px] text-emerald-400/90 leading-relaxed bg-black/60 p-2.5 rounded-md border border-emerald-500/10">
                  {stages[activeStageIndex].output}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 text-[10px] text-white/40 border-t border-white/5">
                <span className="px-1.5 py-0.5 bg-white/5 rounded text-white/50">TRANSIT_MS: 122ms</span>
                <span className="px-1.5 py-0.5 bg-white/5 rounded text-white/50">STABILITY: 100%</span>
              </div>
            </div>
          )}

          {triggerCount > 0 && !isRunning && (
            <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-emerald-400 text-xs">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AUTOMATION SUITE SUCCEEDED
              </div>
              Auto-proposal sent to sandbox inbox. Total hours saved: ~4.5hrs computed.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
