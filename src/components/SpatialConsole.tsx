/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, Settings2, Sliders, Layers3, Smartphone, Compass, Maximize2 } from 'lucide-react';

interface PresetStyle {
  name: string;
  rx: number;
  ry: number;
  rz: number;
  pers: number;
  scale: number;
  glowId: 'slate' | 'sunset' | 'emerald' | 'crimson';
  glassPercent: number;
}

export default function SpatialConsole() {
  // 3D coordinate sliders
  const [rx, setRx] = useState<number>(18);
  const [ry, setRy] = useState<number>(-22);
  const [rz, setRz] = useState<number>(0);
  const [perspective, setPerspective] = useState<number>(750);
  const [scale, setScale] = useState<number>(95);
  const [glowId, setGlowId] = useState<'slate' | 'sunset' | 'emerald' | 'crimson'>('slate');
  const [glassStrength, setGlassStrength] = useState<number>(65);

  const presets: PresetStyle[] = [
    {
      name: 'Isometric Flight',
      rx: 24,
      ry: -32,
      rz: 8,
      pers: 800,
      scale: 90,
      glowId: 'slate',
      glassPercent: 75
    },
    {
      name: 'Cyberpunk Tilt',
      rx: 35,
      ry: 15,
      rz: -5,
      pers: 600,
      scale: 100,
      glowId: 'crimson',
      glassPercent: 45
    },
    {
      name: 'Pristine Floating',
      rx: 8,
      ry: -12,
      rz: 0,
      pers: 1000,
      scale: 105,
      glowId: 'sunset',
      glassPercent: 85
    },
    {
      name: 'Emerald Matrix',
      rx: 15,
      ry: -15,
      rz: 15,
      pers: 700,
      scale: 95,
      glowId: 'emerald',
      glassPercent: 55
    }
  ];

  const applyPreset = (preset: PresetStyle) => {
    setRx(preset.rx);
    setRy(preset.ry);
    setRz(preset.rz);
    setPerspective(preset.pers);
    setScale(preset.scale);
    setGlowId(preset.glowId);
    setGlassStrength(preset.glassPercent);
  };

  const glowStyles = {
    slate: {
      shadow: 'shadow-[0_0_50px_rgba(59,130,246,0.3)] border-blue-500/20 bg-blue-950/20',
      glowDot: 'bg-blue-400'
    },
    sunset: {
      shadow: 'shadow-[0_0_50px_rgba(244,117,96,0.25)] border-amber-500/20 bg-amber-950/15',
      glowDot: 'bg-amber-400'
    },
    emerald: {
      shadow: 'shadow-[0_0_50px_rgba(16,185,129,0.3)] border-emerald-500/25 bg-emerald-950/20',
      glowDot: 'bg-emerald-400'
    },
    crimson: {
      shadow: 'shadow-[0_0_50px_rgba(236,72,153,0.35)] border-pink-500/25 bg-pink-950/20',
      glowDot: 'bg-pink-400'
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 p-1 h-full">
      {/* Parameters Panel */}
      <div className="w-full xl:w-80 bg-white/[0.01] border border-white/5 rounded-xl p-4 space-y-4 shrink-0 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sliders className="w-4 h-4 text-blue-400" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">3D Transformation Matrix</h4>
          </div>

          <p className="text-[11px] text-white/50 leading-relaxed mb-4">
            Test the structural spatial render depth of the interactive canvas modules instantly below.
          </p>

          <div className="space-y-3.5">
            {/* Slider 1: Rotate X */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-white/60 font-mono">Pitch Rotation X:</span>
                <span className="text-blue-400 font-mono font-bold">{rx}°</span>
              </div>
              <input
                type="range"
                min="-60"
                max="60"
                value={rx}
                onChange={(e) => setRx(parseInt(e.target.value))}
                id="transform-rx-slider"
                className="w-full accent-blue-500 h-1 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 2: Rotate Y */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-white/60 font-mono">Yaw Rotation Y:</span>
                <span className="text-blue-400 font-mono font-bold">{ry}°</span>
              </div>
              <input
                type="range"
                min="-60"
                max="60"
                value={ry}
                onChange={(e) => setRy(parseInt(e.target.value))}
                id="transform-ry-slider"
                className="w-full accent-blue-500 h-1 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 3: Rotate Z */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-white/60 font-mono">Roll Rotation Z:</span>
                <span className="text-blue-400 font-mono font-bold">{rz}°</span>
              </div>
              <input
                type="range"
                min="-45"
                max="45"
                value={rz}
                onChange={(e) => setRz(parseInt(e.target.value))}
                id="transform-rz-slider"
                className="w-full accent-blue-500 h-1 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 4: Perspective */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-white/60 font-mono">Spatial Focal Depth:</span>
                <span className="text-blue-400 font-mono font-bold">{perspective}px</span>
              </div>
              <input
                type="range"
                min="300"
                max="1200"
                value={perspective}
                onChange={(e) => setPerspective(parseInt(e.target.value))}
                id="transform-perspective-slider"
                className="w-full accent-blue-500 h-1 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 5: Scale */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-white/60 font-mono">Console Scale Factor:</span>
                <span className="text-blue-400 font-mono font-bold">{scale}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="115"
                value={scale}
                onChange={(e) => setScale(parseInt(e.target.value))}
                id="transform-scale-slider"
                className="w-full accent-blue-500 h-1 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 6: Glass Strength */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-white/60 font-mono">Glass Opacity (Blur):</span>
                <span className="text-blue-400 font-mono font-bold">{glassStrength}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                value={glassStrength}
                onChange={(e) => setGlassStrength(parseInt(e.target.value))}
                id="transform-strength-slider"
                className="w-full accent-blue-500 h-1 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Style Presets Area */}
        <div className="pt-4 border-t border-white/5 space-y-2">
          <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider">Engine presets:</span>
          <div className="grid grid-cols-2 gap-1.5Packed">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(p)}
                id={`preset-btn-${idx}`}
                className="px-2 py-1.5 text-[10px] font-medium text-left text-white/70 hover:text-white bg-white/[0.02] border border-white/5 hover:border-white/15 rounded transition-all truncate"
              >
                ■ {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Render Stage Area with actual 3D Interactive elements */}
      <div className="flex-1 flex flex-col justify-between items-center rounded-xl p-4 bg-black/50 border border-white/5 overflow-hidden min-h-[380px] relative">
        
        {/* Helper Stage Labels */}
        <div className="absolute top-3 left-3 flex gap-2 items-center pointer-events-none z-10">
          <Maximize2 className="w-3.5 h-3.5 text-white/30" />
          <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest bg-white/[0.02] border border-white/5 px-2 py-1 rounded">
            Interactive Perspective Projection
          </span>
        </div>

        {/* Direct glow selection buttons */}
        <div className="absolute top-3 right-3 flex gap-1 z-10">
          {(['slate', 'sunset', 'emerald', 'crimson'] as const).map((id) => (
            <button
              key={id}
              onClick={() => setGlowId(id)}
              id={`color-glow-${id}`}
              className={`p-1.5 rounded border transition-all hover:bg-white/5 ${glowId === id ? 'border-white/40 bg-white/[0.03]' : 'border-white/5'}`}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${glowStyles[id].glowDot}`} />
            </button>
          ))}
        </div>

        {/* 3D Perspective Canvas bounding box */}
        <div 
          className="flex-1 w-full flex items-center justify-center p-6"
          style={{ perspective: `${perspective}px` }}
        >
          {/* Main Rotating Virtual Window Component */}
          <motion.div
            className={`w-full max-w-[280px] md:max-w-[420px] rounded-2xl border p-5 transition-shadow duration-300 relative ${glowStyles[glowId].shadow}`}
            style={{
              transform: `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${scale / 100})`,
              background: `rgba(6, 8, 14, ${glassStrength / 100})`,
              boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
              transformStyle: 'preserve-3d',
            }}
            layout
          >
            {/* Glossy sheen reflecting light on perspective rotate */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.04] to-white/0 pointer-events-none rounded-2xl" />

            {/* Inner Dashboard Wireframe Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5" style={{ transform: 'translateZ(20px)' }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-[10px] font-mono text-white/50 tracking-wider">PROJECT: SPACECORE.X</span>
              </div>
              <Compass className="w-3.5 h-3.5 text-white/40" />
            </div>

            {/* Main Content Showcase */}
            <div className="space-y-4" style={{ transform: 'translateZ(10px)' }}>
              {/* Fake Interactive Component Block inside 3D Card */}
              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h5 className="text-[12px] font-bold text-white uppercase tracking-wider">Spatial Wireframing</h5>
                  <p className="text-[10px] text-white/40">Responsive UI projection system.</p>
                </div>
              </div>

              {/* Multi-layered nested stack items (gives high-fidelity 3D layer feeling) */}
              <div className="relative h-16 bg-white/[0.01] border border-white/5 rounded-lg overflow-hidden flex items-end p-2.5">
                <div className="flex gap-1 items-end w-full justify-between">
                  {[23, 44, 15, 67, 34, 56, 89, 45, 60, 24, 76, 32].map((height, i) => (
                    <motion.div
                      key={i}
                      className="bg-sky-400/40 border-t border-sky-400/60 rounded-sm w-full"
                      style={{ height: `${height}%` }}
                      animate={{ height: [`${height}%`, `${height * 0.7}%`, `${height}%`] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </div>

              {/* Status details footer */}
              <div className="flex justify-between items-center text-[9px] font-mono text-white/40">
                <div className="flex gap-1 items-center">
                  <div className="w-1 h-1 rounded-full bg-emerald-500" />
                  <span>MATRIX: SUCCESS</span>
                </div>
                <span>FPS: 60.00 | CORE_LATENCY: 4.8ms</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info Legend */}
        <div className="text-[10px] text-white/40 text-center font-mono pt-2 border-t border-white/5 w-full flex justify-center gap-6">
          <span>Pitch: {rx}°</span>
          <span>Yaw: {ry}°</span>
          <span>Focal Depth: {perspective}px</span>
          <span>Opacity: {glassStrength}%</span>
        </div>
      </div>
    </div>
  );
}
