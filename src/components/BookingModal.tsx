/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Video, CheckCircle, Clipboard, Loader2 } from 'lucide-react';
import { useModalHistory } from '../hooks/useModalHistory';


// ─────────────────────────────────────────────────────────
// EmailJS credentials — fill these in after signing up at
// https://www.emailjs.com  (free: 200 emails/month)
//
// 1. Sign up → Email Services → Add Gmail/Outlook → copy SERVICE ID
// 2. Email Templates → Create template → copy TEMPLATE ID
// 3. Account → API Keys → copy PUBLIC KEY
// ─────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_pu7o8bg';    // ✅ set
const EMAILJS_TEMPLATE_ID = 'template_8dpysd6';   // ✅ set
const EMAILJS_PUBLIC_KEY  = '6mv9UpkMNWpDcjrUB';  // ✅ set

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
  calculatedPrice: string;
}

const PLANS = [
  { id: 'STARTER',    label: 'Starter',    price: '$999',   desc: 'Logo + 5-page site, basic SEO' },
  { id: 'GROWTH',     label: 'Growth',     price: '$2,999', desc: 'Full brand + web app + CRO', popular: true },
  { id: 'ENTERPRISE', label: 'Enterprise', price: 'Custom', desc: 'Mobile app + AI suite + retainer' },
];

export default function BookingModal({ isOpen, onClose, selectedPlan, calculatedPrice }: BookingModalProps) {
  // Back button closes modal on mobile instead of navigating away
  useModalHistory(isOpen, onClose);

  const [step, setStep] = useState<'details' | 'success'>('details');

  const [selectedDate, setSelectedDate] = useState<string>('Friday, May 29, 2026');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientNote, setClientNote] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [isCopingLink, setIsCopingLink] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sendError, setSendError] = useState<string>('');


  if (!isOpen) return null;

  const datesList = [
    { label: 'Fri, May 29', value: 'Friday, May 29, 2026' },
    { label: 'Mon, Jun 1',  value: 'Monday, June 1, 2026' },
    { label: 'Tue, Jun 2',  value: 'Tuesday, June 2, 2026' },
    { label: 'Wed, Jun 3',  value: 'Wednesday, June 3, 2026' },
  ];

  const timesList = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail || !clientName) return;

    setIsSending(true);
    setSendError('');

    const templateParams = {
      // These variable names must match your EmailJS template
      from_name:    clientName,
      from_email:   clientEmail,
      from_phone:   clientPhone,
      selected_date: selectedDate,
      selected_time: selectedTime,
      message:      clientNote || 'No additional notes.',
      to_name:      'NexCore Team',
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setStep('success');
    } catch (err) {
      console.error('EmailJS error:', err);
      setSendError('Could not send — please try again or email us directly.');
    } finally {
      setIsSending(false);
    }
  };


  // ── Build a Google Calendar URL that auto-attaches Google Meet ──
  const buildGoogleCalendarUrl = () => {
    // Map display date strings → YYYYMMDD
    const dateMap: Record<string, string> = {
      'Friday, May 29, 2026':    '20260529',
      'Monday, June 1, 2026':    '20260601',
      'Tuesday, June 2, 2026':   '20260602',
      'Wednesday, June 3, 2026': '20260603',
    };
    // Map display time strings → HHMM
    const timeMap: Record<string, { start: string; end: string }> = {
      '09:00 AM': { start: '0900', end: '0930' },
      '10:30 AM': { start: '1030', end: '1100' },
      '01:00 PM': { start: '1300', end: '1330' },
      '02:30 PM': { start: '1430', end: '1500' },
      '04:00 PM': { start: '1600', end: '1630' },
    };

    const dateStr  = dateMap[selectedDate]  ?? '20260529';
    const timeSlot = timeMap[selectedTime]  ?? { start: '0900', end: '0930' };
    const start    = `${dateStr}T${timeSlot.start}00`;
    const end      = `${dateStr}T${timeSlot.end}00`;

    const plan   = 'Strategy Session';
    const title  = encodeURIComponent(`NexCore Strategy Call — ${plan}`);
    const details = encodeURIComponent(
      `Strategy session booked via NexCore Digital Studio.\n\nClient: ${clientName}\nEmail: ${clientEmail}\nPhone: +${clientPhone}\n\nNotes: ${clientNote || 'None'}`,
    );
    const guests = encodeURIComponent(clientEmail);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&add=${guests}&sf=true&output=xml`;
  };

  const copyInviteToClipboard = () => {
    setIsCopingLink(true);
    navigator.clipboard.writeText(buildGoogleCalendarUrl());
    setTimeout(() => setIsCopingLink(false), 1200);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
        id="booking-modal-overlay"
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg bg-[#07090f] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(197,160,89,0.12)] z-10"
        id="booking-modal-content"
      >
        {/* ── Header ── */}
        <div className="sticky top-0 bg-[#07090f] border-b border-white/[0.06] px-5 py-3.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a059] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c5a059]" />
            </span>
            <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">
              Strategy Session Coordinator
            </span>
          </div>
          <button
            onClick={onClose}
            id="close-booking-modal-head-btn"
            className="p-1.5 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="max-h-[85vh] overflow-y-auto p-6 font-sans">
          <AnimatePresence mode="wait">
            {step === 'details' ? (
              <motion.div
                key="details-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  {/* 1. Date selection */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-white/45 uppercase tracking-widest block font-bold">
                      1. Select Calendar Date
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {datesList.map((dt) => (
                        <button
                          key={dt.value}
                          type="button"
                          onClick={() => setSelectedDate(dt.value)}
                          id={`date-pill-${dt.label.replace(/\s+/g, '-').replace(/,/g, '').toLowerCase()}`}
                          className={`py-2 px-2 border rounded-lg text-center text-xs font-semibold uppercase transition-all truncate cursor-pointer ${
                            selectedDate === dt.value
                              ? 'bg-[#c5a059] border-[#c5a059] text-black font-bold shadow-[0_0_16px_rgba(197,160,89,0.25)]'
                              : 'bg-white/[0.01] border-white/[0.06] text-white/45 hover:border-white/15 hover:text-white'
                          }`}
                        >
                          {dt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Time selection */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-white/45 uppercase tracking-widest block font-bold">
                      2. Choose Free Timeslot
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                      {timesList.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedTime(t)}
                          id={`time-pill-${t.replace(/\s+/g, '-').replace(/:/g, '').toLowerCase()}`}
                          className={`py-1.5 px-1 rounded-md text-center text-[10px] font-mono font-bold transition-all cursor-pointer ${
                            selectedTime === t
                              ? 'bg-[#c5a059] border border-[#c5a059] text-black font-bold'
                              : 'bg-white/[0.01] border border-white/[0.06] text-white/40 hover:border-white/15 hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Personal details */}
                  <div className="space-y-4 pt-1">
                    <span className="text-[11px] font-mono text-white/45 uppercase tracking-widest block font-bold">
                      3. Personal Details
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] text-white/50 font-semibold block">Full Name:</label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          id="booking-name-input"
                          className="w-full text-xs bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.08] rounded-lg p-2.5 outline-none focus:border-[#c5a059]/50 text-white placeholder-white/20 transition-all"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-white/50 font-semibold block">Email Address:</label>
                        <input
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          id="booking-email-input"
                          className="w-full text-xs bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.08] rounded-lg p-2.5 outline-none focus:border-[#c5a059]/50 text-white transition-all font-mono"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    {/* Mobile Number — full width */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-white/50 font-semibold block">Mobile Number:</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs font-mono select-none">+</span>
                        <input
                          type="tel"
                          required
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          id="booking-phone-input"
                          className="w-full text-xs bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.08] rounded-lg p-2.5 pl-6 outline-none focus:border-[#c5a059]/50 text-white placeholder-white/20 transition-all font-mono"
                          placeholder="1 234 567 8900"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-[11px] text-white/50 font-semibold block">Brief project description:</label>
                        <span className="text-[9px] font-mono text-white/25">(Optional)</span>
                      </div>
                      <textarea
                        value={clientNote}
                        onChange={(e) => setClientNote(e.target.value)}
                        id="booking-note-input"
                        rows={2}
                        className="w-full text-xs bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.08] rounded-lg p-2.5 outline-none focus:border-[#c5a059]/50 text-white placeholder-white/20 resize-none transition-all"
                        placeholder="Brief notes about your branding or web app goals..."
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  {sendError && (
                    <p className="text-[11px] text-red-400 font-mono text-center bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                      ⚠ {sendError}
                    </p>
                  )}
                  <button
                    type="submit"
                    id="submit-booking-btn"
                    disabled={isSending}
                    className="w-full py-3.5 bg-[#c5a059] hover:shadow-[0_0_24px_rgba(197,160,89,0.35)] text-black font-bold rounded-xl text-xs tracking-[0.2em] uppercase transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                    ) : (
                      <>🚀 Confirm Free Strategy Session</>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              /* Success screen */
              <motion.div
                key="success-ticket"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="text-center py-6 space-y-6"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] mb-4 animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-display font-extrabold text-white tracking-wide">
                    Strategy Call Confirmed!
                  </h3>
                  <p className="text-xs text-[#c5a059] mt-1 font-mono uppercase tracking-widest font-semibold">
                    DISPATCH_ID: #{Math.floor(100000 + Math.random() * 900000)}
                  </p>
                </div>

                <p className="text-xs text-white/50 max-w-sm mx-auto leading-relaxed">
                  Hi <span className="text-white font-bold">{clientName}</span>, your strategy session
                  has been confirmed. We'll reach you at{' '}
                  <span className="text-[#c5a059] font-mono font-bold">+{clientPhone}</span> and sent
                  meeting links to <span className="text-white font-mono font-bold">{clientEmail}</span>.
                </p>

                <div className="bg-white/[0.015] border border-white/[0.06] max-w-sm mx-auto rounded-xl p-4 space-y-3 text-left font-mono text-xs">
                  <div className="flex items-center gap-2 text-white/50 border-b border-white/5 pb-2">
                    <Calendar className="w-4 h-4 text-[#c5a059]" />
                    <span className="text-white font-bold">{selectedDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/50 border-b border-white/5 pb-2">
                    <Clock className="w-4 h-4 text-[#c5a059]" />
                    <span className="text-white font-bold">{selectedTime} (30 min session)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/50">
                    <Video className="w-4 h-4 text-[#c5a059]" />
                    <span className="text-[#c5a059] font-bold">Google Meet (auto-generated on add)</span>
                  </div>
                </div>

                <div className="space-y-2 max-w-sm mx-auto pt-3">
                  {/* Primary: Open Google Calendar + Meet */}
                  <a
                    href={buildGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="add-to-gcal-btn"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#c5a059] hover:shadow-[0_0_20px_rgba(197,160,89,0.3)] text-black font-bold rounded-lg text-xs font-mono tracking-wider uppercase transition-all active:scale-95"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.5 3h-2V1.5a.75.75 0 0 0-1.5 0V3h-8V1.5a.75.75 0 0 0-1.5 0V3h-2A2.503 2.503 0 0 0 2 5.5v14A2.503 2.503 0 0 0 4.5 22h15a2.503 2.503 0 0 0 2.5-2.5v-14A2.503 2.503 0 0 0 19.5 3Zm1 16.5a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1V9h17v10.5Zm0-12h-17V5.5a1 1 0 0 1 1-1h2V6a.75.75 0 0 0 1.5 0V4.5h8V6a.75.75 0 0 0 1.5 0V4.5h2a1 1 0 0 1 1 1V8Z"/>
                    </svg>
                    Add to Google Calendar + Meet
                  </a>

                  {/* Secondary: Copy calendar link */}
                  <button
                    onClick={copyInviteToClipboard}
                    id="copy-invite-link-btn"
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-white/[0.02] border border-white/10 hover:border-[#c5a059]/30 hover:text-[#c5a059] text-white/60 rounded-lg text-xs font-mono transition-all active:scale-95"
                  >
                    <Clipboard className="w-3.5 h-3.5" />
                    {isCopingLink ? 'LINK COPIED!' : 'COPY CALENDAR LINK'}
                  </button>

                  <button
                    onClick={onClose}
                    id="dismiss-booking-modal-btn"
                    className="w-full py-2.5 text-white/30 hover:text-white text-xs hover:underline"
                  >
                    Dismiss
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
