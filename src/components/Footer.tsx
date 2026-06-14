import React from 'react';
import { Linkedin, Dribbble } from 'lucide-react';

interface FooterProps {
  openBooking: (plan: string, price: string) => void;
  scrollToSection: (id: string) => void;
  navigateTo: (path: string) => void;
}

export default function Footer({ openBooking, scrollToSection, navigateTo }: FooterProps) {
  return (
    <footer className="relative z-10 overflow-hidden" id="footer">
      {/* Gold gradient top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c5a059]/60 to-transparent" />

      <div className="bg-[#060608] relative">
        {/* Background ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[300px] bg-[#c5a059]/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10 relative z-10">

          {/* Top: brand + CTA */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14">
            {/* Logo + tagline + socials */}
            <div className="space-y-5 max-w-md">
              <div className="flex items-center gap-3">
                {/* Pixel Art Logo — footer version (slightly larger) */}
                <svg viewBox="0 0 28 32" width="36" height="41" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-[0_0_14px_rgba(124,58,237,0.5)] flex-shrink-0">
                  <defs>
                    <linearGradient id="pv-footer-pixel-grad" x1="0" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#3b82f6"/>
                      <stop offset="100%" stopColor="#7c3aed"/>
                    </linearGradient>
                  </defs>
                  <rect x="8" y="0" width="4" height="4" fill="url(#pv-footer-pixel-grad)"/>
                  <rect x="12" y="0" width="4" height="4" fill="url(#pv-footer-pixel-grad)"/>
                  <rect x="4" y="4" width="20" height="4" fill="url(#pv-footer-pixel-grad)"/>
                  <rect x="0" y="8" width="28" height="4" fill="url(#pv-footer-pixel-grad)"/>
                  <rect x="0" y="12" width="4" height="4" fill="url(#pv-footer-pixel-grad)"/>
                  <rect x="4" y="12" width="4" height="4" fill="white"/>
                  <rect x="8" y="12" width="8" height="4" fill="url(#pv-footer-pixel-grad)"/>
                  <rect x="16" y="12" width="4" height="4" fill="url(#pv-footer-pixel-grad)"/>
                  <rect x="20" y="12" width="4" height="4" fill="white"/>
                  <rect x="24" y="12" width="4" height="4" fill="url(#pv-footer-pixel-grad)"/>
                  <rect x="0" y="16" width="28" height="4" fill="url(#pv-footer-pixel-grad)"/>
                  <rect x="4" y="20" width="8" height="4" fill="url(#pv-footer-pixel-grad)"/>
                  <rect x="16" y="20" width="8" height="4" fill="url(#pv-footer-pixel-grad)"/>
                  <rect x="8" y="24" width="4" height="4" fill="url(#pv-footer-pixel-grad)"/>
                  <rect x="16" y="24" width="4" height="4" fill="url(#pv-footer-pixel-grad)"/>
                  <rect x="16" y="28" width="4" height="4" fill="url(#pv-footer-pixel-grad)"/>
                </svg>
                <div>
                  <span
                    className="text-base font-display font-bold tracking-[0.06em] block leading-tight"
                    style={{ background: 'linear-gradient(90deg, #3b82f6, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >Pixel Vance</span>
                  <span className="text-[9px] font-display font-bold tracking-[0.2em] text-white/70 block mt-0.5">DIGITAL AGENCY</span>
                </div>
              </div>
              <p className="text-sm text-white/35 leading-relaxed font-light">
                We craft high-fidelity digital experiences for ambitious brands — from bespoke UI design to AI-powered growth systems.
              </p>
              {/* Social links */}
              <div className="flex items-center gap-2.5">
                {[
                  { label: 'in', href: 'https://www.linkedin.com/company/pixel-vance-digital/', title: 'LinkedIn', icon: Linkedin },
                  { label: 'Dr', href: 'https://dribbble.com/pixelvancedigital', title: 'Dribbble', icon: Dribbble }
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href !== '#' ? '_blank' : undefined}
                      rel={s.href !== '#' ? 'noopener noreferrer' : undefined}
                      id={`footer-social-${s.label.toLowerCase()}`}
                      title={s.title}
                      className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/35 hover:text-[#c5a059] hover:border-[#c5a059]/40 hover:bg-[#c5a059]/5 transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right CTA */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <p className="text-[9px] font-mono tracking-widest text-white/25 uppercase">Ready to start a project?</p>
              <button
                onClick={() => openBooking('GROWTH', '$2,999')}
                id="footer-cta-btn"
                className="flex items-center gap-2.5 py-3 px-7 border border-[#c5a059]/50 text-[#c5a059] hover:bg-[#c5a059] hover:text-black text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
              >
                Book a Strategy Call →
              </button>
              <p className="text-[9px] font-mono text-white/20">info@pixelvancedigital.com</p>
            </div>
          </div>

          {/* Thin divider */}
          <div className="h-px w-full bg-white/[0.06] mb-12" />

          {/* 3-column links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">

            {/* Services */}
            <div className="space-y-5">
              <h5 className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#c5a059]">Services</h5>
              <ul className="space-y-3">
                {['Logo & Brand Design', 'Web Development', 'Mobile App Design', 'SEO & Growth Marketing', 'AI System Automation'].map((lnk) => (
                  <li key={lnk}>
                    <button
                      onClick={() => scrollToSection('services-explorer-section')}
                      id={`footer-service-${lnk.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-[11px] text-white/35 hover:text-white transition-colors duration-200 text-left group flex items-center gap-2"
                    >
                      <span className="w-0 group-hover:w-2.5 h-px bg-[#c5a059] transition-all duration-300 inline-block shrink-0" />
                      {lnk}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-5">
              <h5 className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#c5a059]">Company</h5>
              <ul className="space-y-3">
                {([
                  { label: 'About Us',           path: '/about' },
                  { label: 'Design Portfolio',    path: '/portfolio' },
                  { label: 'Client Case Studies', path: '/case-studies' },
                  { label: 'Engineering Blog',    path: '/blog' },
                ]).map(({ label, path }) => (
                  <li key={label}>
                    <button
                      onClick={() => navigateTo(path)}
                      id={`footer-company-${label.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-[11px] text-white/35 hover:text-white transition-colors duration-200 text-left group flex items-center gap-2"
                    >
                      <span className="w-0 group-hover:w-2.5 h-px bg-[#c5a059] transition-all duration-300 inline-block shrink-0" />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-5 col-span-2 md:col-span-1">
              <h5 className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#c5a059]">Contact</h5>
              <ul className="space-y-4">
                <li>
                  <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1">Email</p>
                  <a href="mailto:info@pixelvancedigital.com" className="text-[11px] text-white/45 hover:text-white transition-colors">info@pixelvancedigital.com</a>
                </li>
                <li>
                  <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1">Hours</p>
                  <p className="text-[11px] text-white/45">Mon – Fri &nbsp;·&nbsp; 9am – 6pm EST</p>
                </li>
                <li className="flex items-center gap-2 pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-400/70">WhatsApp Available</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[9px] font-mono text-white/20 tracking-wider">
              © 2026 Pixel Vance Digital. All rights reserved.
            </span>
            <div className="flex items-center gap-6">
              <span className="text-[9px] font-mono text-white/20 hover:text-white/50 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="text-white/10">·</span>
              <span className="text-[9px] font-mono text-white/20 hover:text-white/50 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
