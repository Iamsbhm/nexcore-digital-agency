/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRICING_PLANS } from '../data';
import { Check, ShieldAlert, Sparkles, Sliders, Scale, CalendarDays } from 'lucide-react';

interface PricingCalculatorProps {
  onBookCall: (planName: string, calculatedPrice?: string) => void;
}

export default function PricingCalculator({ onBookCall }: PricingCalculatorProps) {
  const [calculatorActive, setCalculatorActive] = useState<boolean>(false);

  // Custom project scope parameters
  const [totalPages, setTotalPages] = useState<number>(5);
  const [brandAssets, setBrandAssets] = useState<boolean>(true);
  const [ecomProducts, setEcomProducts] = useState<number>(0);
  const [aiIntegration, setAiIntegration] = useState<'none' | 'simple' | 'complex'>('simple');
  const [supportMonths, setSupportMonths] = useState<number>(1);

  // Math estimator formulas
  const calculateEstimate = () => {
    let price = 500; // base code setup cost
    price += totalPages * 120; // $120 per page
    if (brandAssets) price += 600; // logo identity package flat fee
    if (ecomProducts > 0) {
      price += 400 + Math.min(25, ecomProducts) * 15; // products list design
    }
    if (aiIntegration === 'simple') price += 450;
    if (aiIntegration === 'complex') price += 1200;
    price += (supportMonths - 1) * 200; // $200 per extra support month

    return price;
  };

  const calculatedCost = calculateEstimate();

  return (
    <div className="space-y-12" id="pricing-calculator">
      {/* Selector Tabs: Structured packages vs Customizable Calculator */}
      <div className="flex justify-center">
        <div className="bg-white/[0.02] border border-white/5 p-1 rounded-full flex gap-1">
          <button
            onClick={() => setCalculatorActive(false)}
            id="tab-plans-standard"
            className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all ${
              !calculatorActive 
                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)]' 
                : 'text-white/40 hover:text-white'
            }`}
          >
            STANDARD PACKAGES
          </button>
          <button
            onClick={() => setCalculatorActive(true)}
            id="tab-plans-customizer"
            className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              calculatorActive 
                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)]' 
                : 'text-white/40 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" /> SCOPE ESTIMATOR
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!calculatorActive ? (
          /* Standard 3 packages from screenshots */
          <motion.div
            key="standard-plans"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {PRICING_PLANS.map((plan, idx) => {
              const isPopular = plan.isPopular;
              return (
                <div
                  key={plan.name}
                  id={`pricing-card-${plan.name.toLowerCase()}`}
                  className={`p-6 rounded-2xl flex flex-col justify-between border relative overflow-hidden transition-all duration-300 ${
                    isPopular 
                      ? 'bg-blue-950/10 border-blue-500 shadow-glow-indigo shadow-lg scale-[1.01]' 
                      : 'bg-white/[0.012] border-white/5 hover:border-white/10'
                  }`}
                >
                  {/* Decorative glow gradients for popular cards */}
                  {isPopular && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                  )}

                  <div className="space-y-6">
                    {/* Header Details */}
                    <div className="flex justify-between items-start">
                      <div>
                        {isPopular && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-blue-500/[0.12] text-blue-400 border border-blue-500/20 mb-3 uppercase tracking-wider">
                            ★ MOST POPULAR
                          </span>
                        )}
                        <h3 className="text-sm font-mono font-extrabold tracking-widest text-white/50 block">
                          {plan.name}
                        </h3>
                      </div>
                    </div>

                    {/* Cost Amount */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-display font-extrabold text-white tracking-tight">{plan.price}</span>
                      <span className="text-xs text-white/40 font-mono tracking-wider">{plan.pricingPeriod}</span>
                    </div>

                    <div className="h-px bg-white/5 w-full" />

                    {/* Core Checklists */}
                    <ul className="space-y-3">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-white/70">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Primary Call to Action */}
                  <div className="mt-8 pt-4">
                    <button
                      onClick={() => onBookCall(plan.name, plan.price)}
                      id={`book-${plan.name.toLowerCase()}-btn`}
                      className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5 ${
                        isPopular
                          ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/10'
                          : 'bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 text-white'
                      }`}
                    >
                      <CalendarDays className="w-4 h-4" /> Book Strategy Call
                    </button>
                    <span className="text-[10px] text-white/30 text-center block mt-2.5 font-mono">
                      No hidden fees. Free cancellation.
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          /* Custom Scope Estimator Workspace */
          <motion.div
            key="customizer-calculator"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="p-6 bg-white/[0.01] border border-white/5 md:border-white/10 rounded-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sliders Control area */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-blue-400" /> Adjust Project Scope Variables
                  </h3>
                  <p className="text-xs text-white/40 mt-1">Specify layout sizes, identity assets, and integration nodes below.</p>
                </div>

                <div className="space-y-4">
                  {/* Total Pages slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60 font-semibold">Total Pages/Routes Needed:</span>
                      <span className="text-blue-400 font-mono font-bold">{totalPages} Pages</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={totalPages}
                      onChange={(e) => setTotalPages(parseInt(e.target.value))}
                      id="estimate-pages-slider"
                      className="w-full accent-blue-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Brand Assets toggle */}
                  <div className="flex justify-between items-center bg-white/[0.015] border border-white/5 rounded-xl p-3">
                    <div>
                      <span className="text-xs text-white/80 font-semibold block">Brand Identity & Styleguides?</span>
                      <span className="text-[10px] text-white/40 font-mono">Includes custom vector logo, palette, typography</span>
                    </div>
                    <button
                      onClick={() => setBrandAssets(!brandAssets)}
                      id="toggle-brand-assets"
                      className={`w-12 h-6.5 rounded-full p-1 transition-all ${brandAssets ? 'bg-blue-600' : 'bg-white/10'}`}
                    >
                      <div className={`w-4.5 h-4.5 bg-white rounded-full transition-transform ${brandAssets ? 'translate-x-[22px]' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* E-commerce Catalog Size slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60 font-semibold">E-Commerce Products Count:</span>
                      <span className="text-pink-400 font-mono font-bold">
                        {ecomProducts === 0 ? 'Pure Informational (None)' : `${ecomProducts} active items`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={ecomProducts}
                      onChange={(e) => setEcomProducts(parseInt(e.target.value))}
                      id="estimate-products-slider"
                      className="w-full accent-pink-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* AI Smart Integration Scale checkboxes */}
                  <div className="space-y-2">
                    <span className="text-xs text-white/60 font-semibold block">Cognitive AI Automation Nodes:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {([
                        { id: 'none', label: 'None', desc: 'Sleek SPA' },
                        { id: 'simple', label: 'Assistant Chat', desc: 'GPT integration' },
                        { id: 'complex', label: 'Heavy Flows', desc: 'CRM + auto agents' }
                      ] as const).map((aiScale) => (
                        <button
                          key={aiScale.id}
                          onClick={() => setAiIntegration(aiScale.id)}
                          id={`select-ai-scale-${aiScale.id}`}
                          className={`p-3 text-left border rounded-xl rounded-b-xl transition-all ${
                            aiIntegration === aiScale.id
                              ? 'bg-indigo-950/20 border-indigo-500 text-indigo-400 font-bold'
                              : 'bg-white/[0.01] border-white/5 text-white/50 hover:border-white/10 hover:text-white'
                          }`}
                        >
                          <span className="text-xs block font-semibold">{aiScale.label}</span>
                          <span className="text-[9px] text-white/30 font-mono block mt-0.5">{aiScale.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Support duration slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60 font-semibold">Care & Support Period:</span>
                      <span className="text-emerald-400 font-mono font-bold">{supportMonths} Month{supportMonths > 1 ? 's' : ''}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={supportMonths}
                      onChange={(e) => setSupportMonths(parseInt(e.target.value))}
                      id="estimate-support-slider"
                      className="w-full accent-emerald-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Estimate Output summary right style */}
              <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 p-5 rounded-xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase block">
                    Compiled Custom Invoice Summary
                  </span>

                  {/* Custom invoice item list */}
                  <div className="space-y-2.5 text-xs text-white/65 pt-2 border-b border-white/5 pb-4 font-mono">
                    <div className="flex justify-between">
                      <span>✓ Base Framework Setup</span>
                      <span className="text-white font-bold">$500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>✓ Pages Deployment ({totalPages}x)</span>
                      <span className="text-white font-bold">${totalPages * 120}</span>
                    </div>
                    {brandAssets && (
                      <div className="flex justify-between text-blue-400">
                        <span>✓ Brand Identity Suite</span>
                        <span className="text-white font-bold">$600</span>
                      </div>
                    )}
                    {ecomProducts > 0 && (
                      <div className="flex justify-between text-pink-400">
                        <span>✓ Shopping Grid ({ecomProducts} items)</span>
                        <span className="text-white font-bold">${400 + Math.min(25, ecomProducts) * 15}</span>
                      </div>
                    )}
                    {aiIntegration !== 'none' && (
                      <div className="flex justify-between text-indigo-400">
                        <span>✓ AI System Nodes ({aiIntegration})</span>
                        <span className="text-white font-bold">
                          {aiIntegration === 'simple' ? '+$450' : '+$1,200'}
                        </span>
                      </div>
                    )}
                    {supportMonths > 1 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>✓ Premium Support (+{supportMonths - 1} mo)</span>
                        <span className="text-white font-bold">${(supportMonths - 1) * 200}</span>
                      </div>
                    )}
                  </div>

                  {/* Display value summary */}
                  <div className="pt-2">
                    <span className="text-[10px] text-white/40 uppercase block tracking-wider">PROJECT ESTIMATED VALUE:</span>
                    <span className="text-4xl font-display font-black text-white tracking-tight mt-1.5 block">
                      ${calculatedCost.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Confirm Dispatch Call */}
                <div className="relative z-10 mt-6 pt-4 border-t border-white/5">
                  <button
                    onClick={() => onBookCall('CUSTOM SCOPE ESTIMATE', `$${calculatedCost}`)}
                    id="book-custom-call-btn"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-blue-600/10"
                  >
                    <CalendarDays className="w-4.5 h-4.5" /> Book Project Strategy Call
                  </button>
                  <p className="text-[9px] text-white/35 font-mono text-center mt-2.5">
                    Our sales engineers will review this customized bill sheet and present sitemaps on the call.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
