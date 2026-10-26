import React, { useState } from 'react';
import { X, Calendar, Clock, Globe, CheckCircle2, ArrowRight, Shield } from 'lucide-react';

import { InboundInquiry, addInboundInquiry } from '../data/inquiriesData';
import { saveInquiryToFirestore } from '../services/firebaseSyncService';

interface StrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  onBookingComplete?: (inquiry: InboundInquiry) => void;
}

export const StrategyModal: React.FC<StrategyModalProps> = ({
  isOpen,
  onClose,
  defaultService,
  onBookingComplete,
}) => {
  const [service, setService] = useState(defaultService || 'AI Automation & Intelligent Agents');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [timezone, setTimezone] = useState('Asia/Riyadh (UTC+3)');
  const [slot, setSlot] = useState('Tomorrow, 3:00 PM');
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError('Please provide a valid business email.');
      return;
    }

    setError('');
    
    // Save to Firestore and local state
    const saved = addInboundInquiry({
      name: name.trim(),
      email: email.trim(),
      service: service,
      goals: notes.trim() || 'Strategy Call Request via Reservation Modal',
      slot: slot,
      timezone: timezone,
    });
    saveInquiryToFirestore(saved);

    if (onBookingComplete) {
      onBookingComplete(saved);
    }

    setRefId(saved.id);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setNotes('');
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={handleResetAndClose}
    >
      <div
        className="bg-neutral-900 border border-neutral-800 text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-6 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4 border border-rose-500/30">
              <CheckCircle2 className="w-7 h-7 text-rose-400" />
            </div>

            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
              Strategy Session Booked · #{refId}
            </span>

            <h3 className="text-2xl font-bold font-['Outfit',sans-serif] mt-2">
              We Look Forward to Speaking, {name}
            </h3>

            <p className="mt-2 text-xs text-neutral-300 max-w-md leading-relaxed">
              Your 25-minute strategy consultation is scheduled for <strong className="text-white">{slot} ({timezone})</strong>. A calendar invitation with video bridge details has been sent to <strong className="text-white">{email}</strong>.
            </p>

            <div className="mt-6 w-full p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-left text-xs space-y-2">
              <div className="flex justify-between text-neutral-400">
                <span>Focus Topic:</span>
                <span className="text-white font-medium">{service}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Location:</span>
                <span className="text-white font-medium">Google Meet / Video Conference</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="mt-6 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleBook}>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4" />
              <span>Strategy Call Reservation</span>
            </div>

            <h3 className="text-2xl font-bold font-['Outfit',sans-serif] text-white">
              Schedule Your 25-Minute Discovery Call
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Direct consultation with IVQIE leadership. Review current bottlenecks and evaluate custom automation feasibility.
            </p>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs">
                {error}
              </div>
            )}

            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Primary Capability Focus
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                >
                  <option value="AI Automation & Intelligent Agents">AI Automation &amp; Intelligent Agents</option>
                  <option value="Digital Marketing & Performance">Digital Marketing &amp; Performance</option>
                  <option value="Social Media Marketing & Management">Social Media Marketing &amp; Management</option>
                  <option value="Full Architecture Discovery">Full Architecture Discovery</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Al-Mansoor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                  >
                    <option value="Asia/Riyadh (UTC+3)">Asia/Riyadh (UTC+3)</option>
                    <option value="Asia/Dhaka (UTC+6)">Asia/Dhaka (UTC+6)</option>
                    <option value="Europe/London (UTC+0)">Europe/London (UTC+0)</option>
                    <option value="America/New_York (UTC-5)">America/New_York (UTC-5)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Preferred Window
                  </label>
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                  >
                    <option value="Tomorrow, 11:00 AM">Tomorrow, 11:00 AM</option>
                    <option value="Tomorrow, 3:00 PM">Tomorrow, 3:00 PM</option>
                    <option value="Thursday, 1:00 PM">Thursday, 1:00 PM</option>
                    <option value="Thursday, 5:30 PM">Thursday, 5:30 PM</option>
                    <option value="Next Monday, 2:00 PM">Next Monday, 2:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Brief Context / Specific Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="What is your current top operational or marketing challenge?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                <Shield className="w-3.5 h-3.5 text-rose-500" />
                <span>Zero sales pressure guarantee</span>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all shadow-md cursor-pointer shrink-0"
              >
                Confirm Call
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
