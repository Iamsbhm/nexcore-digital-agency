import React from 'react';

interface ConversionPortalProps {
  openBooking: (plan: string, price: string) => void;
}

export default function ConversionPortal({ openBooking }: ConversionPortalProps) {
  return (
    <section className="relative z-10 px-4 md:px-8 max-w-5xl mx-auto pb-16">
      <div className="bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border border-white/[0.08] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden product-shadow">
        
        {/* Radial light behind call tracker */}
        <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4.5xl font-black tracking-tight text-white font-display">
            Get Your <span className="font-serif italic text-[#c5a059]">Free Website Audit</span> Today
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans font-medium">
            Not sure if your website is helping or hurting your business? Get a <span className="text-[#c5a059] font-bold">FREE Website Audit</span> and discover:
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto text-xs text-white/70 font-mono py-4 border-y border-white/[0.05]">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              Speed & Performance Issues
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              SEO Opportunities
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              Mobile Responsiveness Problems
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              User Experience Improvements
            </li>
            <li className="flex items-center gap-2 sm:col-span-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              Lead Generation Recommendations
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-xl mx-auto">
            <button
              onClick={() => openBooking('FREE AUDIT', 'Free')}
              id="booking-cta-bottom"
              className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-8 border border-[#c5a059] bg-[#c5a059] hover:bg-transparent text-black hover:text-white uppercase text-[10px] font-mono tracking-[0.2em] transition-all duration-300 cursor-pointer shadow-lg active:scale-95 font-bold"
            >
              <span>Claim Your Free Website Audit Today →</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
