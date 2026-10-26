import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Clock, Globe, Calendar, Send, Sparkles, AlertCircle, RefreshCw, MessageCircle } from 'lucide-react';
import { addInboundInquiry, InboundInquiry } from '../data/inquiriesData';

interface ConsultationProps {
  preselectedService?: string;
  onClearPreselectedService?: () => void;
  onInquirySubmitted?: (inquiry: InboundInquiry) => void;
}

export const ConsultationCtaSection: React.FC<ConsultationProps> = ({
  preselectedService,
  onClearPreselectedService,
  onInquirySubmitted,
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'scheduler'>('form');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: preselectedService || 'AI Automation & Intelligent Agents',
    goals: '',
    budget: '$1,000 – $3,000',
    timeline: 'Within 2–4 weeks',
  });

  // Scheduler State
  const [selectedSlot, setSelectedSlot] = useState<string>('Tomorrow, 3:00 PM');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('Asia/Riyadh (UTC+3)');

  // Validation & Submission States
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionReference, setSubmissionReference] = useState<string>('');

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid business email.';
    }

    if (!formData.goals.trim() || formData.goals.trim().length < 10) {
      newErrors.goals = 'Please describe your project or operational bottlenecks (minimum 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const saved = addInboundInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || undefined,
        service: formData.service,
        goals: formData.goals.trim(),
        budget: formData.budget,
        timeline: formData.timeline,
        slot: activeTab === 'scheduler' ? selectedSlot : undefined,
        timezone: activeTab === 'scheduler' ? selectedTimezone : undefined,
      });

      if (onInquirySubmitted) {
        onInquirySubmitted(saved);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmissionReference(saved.id);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmissionReference('');
    setFormData({
      name: '',
      email: '',
      company: '',
      service: 'AI Automation & Intelligent Agents',
      goals: '',
      budget: '$1,000 – $3,000',
      timeline: 'Within 2–4 weeks',
    });
    if (onClearPreselectedService) onClearPreselectedService();
  };

  const availableSlots = [
    'Tomorrow, 11:00 AM',
    'Tomorrow, 3:00 PM',
    'Thursday, 1:00 PM',
    'Thursday, 5:30 PM',
    'Next Monday, 2:00 PM',
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-neutral-950 text-white">
      {/* Background network motif & restrained red/violet illumination */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Delicate grid overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Closing Callout Block */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold tracking-widest uppercase text-rose-500">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>START THE CONVERSATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif] leading-[1.1]">
            Ready to Make Your Next Move <span className="text-rose-500">Smarter?</span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-neutral-300 leading-relaxed font-normal max-w-2xl">
            “Tell us where your business is getting stuck. Let’s explore how automation and digital marketing can help.”
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab('scheduler')}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                activeTab === 'scheduler'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
              }`}
            >
              Book a Strategy Call
            </button>
            <button
              onClick={() => setActiveTab('form')}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                activeTab === 'form'
                  ? 'bg-white text-neutral-950 font-bold shadow-md'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
              }`}
            >
              Tell Us About Your Project
            </button>
          </div>
        </div>

        {/* Interactive Consultation Form & Strategy Call Scheduler */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Action Box */}
          <div className="lg:col-span-8 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
            
            {isSubmitted ? (
              /* Success Confirmation Card */
              <div className="py-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-6 border border-rose-500/30">
                  <CheckCircle2 className="w-8 h-8 text-rose-400" />
                </div>

                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                  Inquiry Logged · Ref #{submissionReference}
                </span>

                <h3 className="text-2xl sm:text-3xl font-bold font-['Outfit',sans-serif] mt-2 text-white">
                  Thank You, {formData.name}
                </h3>

                <p className="mt-3 text-sm text-neutral-300 max-w-md leading-relaxed">
                  We have received your project details for <strong className="text-white">{formData.service}</strong>. A senior systems specialist will review your operational requirements and respond within 24 business hours.
                </p>

                {/* Submitted parameters review */}
                <div className="mt-6 w-full max-w-lg p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-left text-xs space-y-2">
                  <div className="flex justify-between border-b border-neutral-800/80 pb-2 text-neutral-400">
                    <span>Contact:</span>
                    <span className="text-neutral-200 font-medium">{formData.email}</span>
                  </div>
                  {formData.company && (
                    <div className="flex justify-between border-b border-neutral-800/80 pb-2 text-neutral-400">
                      <span>Organization:</span>
                      <span className="text-neutral-200 font-medium">{formData.company}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-neutral-800/80 pb-2 text-neutral-400">
                    <span>Estimated Budget:</span>
                    <span className="text-neutral-200 font-medium">{formData.budget}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Preferred Timeline:</span>
                    <span className="text-neutral-200 font-medium">{formData.timeline}</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold uppercase tracking-wider text-neutral-200 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Submit Another Inquiry</span>
                  </button>
                  <a
                    href="mailto:mnnabil170@gmail.com"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-semibold uppercase tracking-wider text-white transition-colors"
                  >
                    <span>Direct Email Dispatch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : activeTab === 'form' ? (
              /* Inquiry Form */
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-800">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-white">
                      Tell Us About Your Project
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      No sales pressure. Detailed architectural assessment and direct scope recommendation.
                    </p>
                  </div>
                  <span className="hidden sm:inline-block text-[11px] font-mono text-rose-400 border border-rose-500/30 px-2.5 py-1 rounded-full bg-rose-500/10">
                    24h Response SLA
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tariq Al-Mansoor"
                      className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all ${
                        errors.name ? 'border-rose-500' : 'border-neutral-800'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Business Email */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                      Business Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all ${
                        errors.email ? 'border-rose-500' : 'border-neutral-800'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Company or Website */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                      Company or Website <span className="text-neutral-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="company.com or brand name"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                    />
                  </div>

                  {/* Service of Interest */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                      Service of Interest
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all cursor-pointer"
                    >
                      <option value="AI Automation & Intelligent Agents">AI Automation &amp; Intelligent Agents</option>
                      <option value="Digital Marketing & Performance">Digital Marketing &amp; Performance</option>
                      <option value="Social Media Marketing & Management">Social Media Marketing &amp; Management</option>
                      <option value="Full-Stack Growth & Automation">Full-Stack Growth &amp; Automation</option>
                    </select>
                  </div>
                </div>

                {/* Project Goals */}
                <div className="mt-6">
                  <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                    Project Goals &amp; Operational Bottlenecks <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    placeholder="Tell us what process you want to automate, where leads get delayed, or what growth channels you want to activate..."
                    className={`w-full bg-neutral-950 border rounded-xl p-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all ${
                      errors.goals ? 'border-rose-500' : 'border-neutral-800'
                    }`}
                  />
                  {errors.goals && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.goals}
                    </p>
                  )}
                </div>

                {/* Budget & Timeline Grid */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                      Estimated Project Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                    >
                      <option value="Under $1,000">Under $1,000 (Small sprint / audit)</option>
                      <option value="$1,000 – $3,000">$1,000 – $3,000 (Core automation pipeline)</option>
                      <option value="$3,000 – $10,000">$3,000 – $10,000 (Multi-channel growth &amp; agents)</option>
                      <option value="$10,000+">$10,000+ (Comprehensive enterprise system)</option>
                      <option value="To be scoped after discovery">To be scoped after discovery</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                      Preferred Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                    >
                      <option value="Immediate (1–2 weeks)">Immediate (1–2 weeks)</option>
                      <option value="Within 2–4 weeks">Within 2–4 weeks</option>
                      <option value="Within 2–3 months">Within 2–3 months</option>
                      <option value="Exploratory / Planning stage">Exploratory / Planning stage</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-[11px] text-neutral-400">
                    By submitting, your data is used exclusively to evaluate your project scope.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 rounded-xl transition-all shadow-lg shadow-rose-600/30 cursor-pointer shrink-0"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Validating Scope...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Strategy Call Slot Scheduler */
              <div>
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-800">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-white">
                      Book a 25-Min Strategic Video Call
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Direct consultation with IVQIE leadership. Live workflow scoping and feasibility check.
                    </p>
                  </div>
                  <Calendar className="w-6 h-6 text-rose-500 shrink-0" />
                </div>

                <div className="space-y-6">
                  {/* Timezone picker */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                      Select Your Timezone
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        'Asia/Riyadh (UTC+3)',
                        'Asia/Dhaka (UTC+6)',
                        'Europe/London (UTC+0)',
                      ].map((tz) => (
                        <button
                          key={tz}
                          type="button"
                          onClick={() => setSelectedTimezone(tz)}
                          className={`p-3 text-xs rounded-xl border text-left transition-all ${
                            selectedTimezone === tz
                              ? 'bg-rose-500/10 border-rose-500 text-white'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          <span className="font-semibold block">{tz.split(' ')[0]}</span>
                          <span className="text-[10px] text-neutral-500">{tz.split(' ')[1]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Available Time Slots */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                      Choose an Available Consultation Window
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-3 text-xs rounded-xl border flex items-center justify-between transition-all ${
                            selectedSlot === slot
                              ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{slot}</span>
                          </div>
                          {selectedSlot === slot && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Form to finalize strategy call */}
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs font-semibold uppercase text-neutral-400 block mb-3">
                      Selected Slot: <strong className="text-white">{selectedSlot} ({selectedTimezone})</strong>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-rose-500"
                      />
                      <input
                        type="email"
                        placeholder="Your Business Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-rose-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Confirm Strategy Call Reservation
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Direct Contact & International Focus Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Global Operations Card */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 mb-3">
                <Globe className="w-4 h-4" />
                <span>Global Operational Reach</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Operating remotely across key international business hubs with dedicated timezone support:
              </p>
              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
                  <span className="text-white font-medium">Saudi Arabia (KSA)</span>
                  <span className="text-neutral-400 font-mono text-[11px]">Riyadh Time</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
                  <span className="text-white font-medium">Bangladesh</span>
                  <span className="text-neutral-400 font-mono text-[11px]">Dhaka Time</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Worldwide &amp; US/EU</span>
                  <span className="text-neutral-400 font-mono text-[11px]">Async / UTC</span>
                </div>
              </div>
            </div>

            {/* Direct Channel Card */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 block mb-1">
                  Direct Communication Channels
                </span>
                <p className="text-xs text-neutral-400">
                  Instant response for active client scopes, automation audits, or urgent consultations:
                </p>
              </div>

              <a
                href="https://wa.me/+966509850428"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold uppercase tracking-wider text-white transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+966 50 985 0428)</span>
              </a>

              <a
                href="mailto:mnnabil170@gmail.com"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors"
              >
                <span>Email mnnabil170@gmail.com</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Verification & Privacy notice */}
            <div className="p-5 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 text-[11px] text-neutral-400 leading-relaxed">
              <span className="text-neutral-300 font-semibold block mb-1">Confidentiality Guarantee:</span>
              All project conversations, technical logic diagrams, and client credentials operate under strict mutual confidentiality protocols.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
