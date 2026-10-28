import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Mail,
  PhoneCall,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  Calculator,
  Calendar,
  Sparkles,
  Lock,
} from 'lucide-react';
import { InboundInquiry } from '../data/inquiriesData';

interface ContactPageProps {
  onInquirySubmitted: (inquiry: InboundInquiry) => void;
  onNavigateHome: () => void;
  onOpenBookingModal: (service?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onInquirySubmitted,
  onNavigateHome,
  onOpenBookingModal,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedService, setSelectedService] = useState('Autonomous AI Agents');
  const [budgetRange, setBudgetRange] = useState('$5,000 - $15,000');
  const [message, setMessage] = useState('');
  const [consentCheckbox, setConsentCheckbox] = useState(false);
  
  // Anti-Spam protection: Honeypot + Time gate
  const [honeypot, setHoneypot] = useState('');
  const [renderedTimestamp, setRenderedTimestamp] = useState<number>(0);

  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<InboundInquiry | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Interactive Scope Estimator State
  const [estimatorVolume, setEstimatorVolume] = useState<'low' | 'medium' | 'high'>('medium');
  const [estimatorTimeline, setEstimatorTimeline] = useState<'urgent' | 'standard' | 'flexible'>('standard');

  useEffect(() => {
    setRenderedTimestamp(Date.now());
  }, []);

  const serviceOptions = [
    'Autonomous AI Agents',
    'Enterprise Workflow Automation',
    'Conversational AI & WhatsApp Bot',
    'CRM & Pipeline Automation',
    'Ultra-Low Latency Voice AI',
    'Custom AI Models & Computer Vision',
    'Social Media Marketing & Video Automation',
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Honeypot check (Spam protection)
    if (honeypot) {
      console.warn('Spam submission detected via honeypot.');
      setErrorMessage('Submission rejected by automated security filters.');
      return;
    }

    // 2. Submission speed check (Spam bot protection: must take at least 1.8 seconds)
    const timeElapsed = Date.now() - renderedTimestamp;
    if (timeElapsed < 1800) {
      setErrorMessage('Please take a moment to review your message before submitting.');
      return;
    }

    // 3. Validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please provide your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please provide a valid business email address.');
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      setErrorMessage('Please provide a brief description of your project requirements (min 10 characters).');
      return;
    }

    if (!consentCheckbox) {
      setErrorMessage('Please accept the consent checkbox to process your project inquiry.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          businessEmail: email.trim(),
          companyName: companyName.trim() || undefined,
          serviceInterestedIn: selectedService,
          projectBudgetRange: budgetRange,
          projectDescription: message.trim(),
          consentCheckbox,
          website_url_check: honeypot,
          renderedTimestamp,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Server rejected the inquiry brief.');
      }

      const generatedId = data.submissionId || `IVQ-${Date.now().toString().slice(-6)}`;

      const newInquiry: InboundInquiry = {
        id: generatedId,
        name: fullName.trim(),
        email: email.trim(),
        company: companyName.trim() || undefined,
        service: selectedService,
        goals: `Company: ${companyName.trim() || 'N/A'}\nPhone: ${phone.trim() || 'N/A'}\nBudget: ${budgetRange}\n\nProject Scope:\n${message.trim()}`,
        budget: budgetRange,
        timeline: estimate.sprintWeeks,
        submittedAt: new Date().toLocaleString([], {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'New',
      };

      onInquirySubmitted(newInquiry);
      setSubmittedInquiry(newInquiry);
      setIsSubmitting(false);
    } catch (err: unknown) {
      console.error('Submission error:', err);
      const message = (err as Error)?.message || 'Network error while processing inquiry. Please try again or reach out on WhatsApp.';
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };

  const calculateEstimate = () => {
    let sprintWeeks = '3 - 4 Weeks';
    let archGrade = 'Clustered Cloud Architecture';
    if (estimatorVolume === 'high') {
      sprintWeeks = '4 - 6 Weeks';
      archGrade = 'High-Concurrency Redis + Kafka Bus';
    } else if (estimatorVolume === 'low') {
      sprintWeeks = '2 - 3 Weeks';
      archGrade = 'Lightweight Serverless Pipeline';
    }
    return { sprintWeeks, archGrade };
  };

  const estimate = calculateEstimate();

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button
          onClick={onNavigateHome}
          className="hover:text-rose-400 transition-colors focus:outline-none focus-visible:underline"
        >
          IVQIE
        </button>
        <span>/</span>
        <span className="text-neutral-200">Contact & Technical Scoping</span>
      </nav>

      {/* Hero Header */}
      <div className="max-w-4xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-mono mb-4 tracking-wider uppercase">
          <Mail className="w-3.5 h-3.5" />
          Technical Discovery Channel
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 font-display">
          Let’s Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-300 to-amber-300">Automated Pipeline.</span>
        </h1>
        <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-light max-w-3xl">
          Submit your project requirements for an engineering review, or connect directly with our founder on WhatsApp for immediate technical consultation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        
        {/* Left Column: Direct Communication Channels & Interactive Estimator */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Quick WhatsApp Card */}
          <div className="p-7 rounded-3xl bg-neutral-900/60 border border-emerald-500/30 relative overflow-hidden">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2">
              <PhoneCall className="w-4 h-4" />
              Fast-Track Channel
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Direct WhatsApp Consultation</h2>
            <p className="text-xs sm:text-sm text-neutral-300 mb-6 font-light">
              Connect directly with our founder and lead systems architect for rapid scoping. Typical response time under 15 minutes.
            </p>
            <a
              href="https://wa.me/+966509850428"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/25"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Message on WhatsApp (+966 50 985 0428)</span>
            </a>
          </div>

          {/* Schedule Video Strategy Call Card */}
          <div className="p-7 rounded-3xl bg-neutral-900/60 border border-neutral-800">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase tracking-wider mb-2">
              <Calendar className="w-4 h-4" />
              Virtual Architecture Session
            </div>
            <h2 className="text-xl font-bold text-white mb-2">30-Minute Video Consultation</h2>
            <p className="text-xs sm:text-sm text-neutral-300 mb-6 font-light">
              Book a live screen-share walkthrough to inspect your existing architecture, API constraints, and feasibility.
            </p>
            <button
              onClick={() => onOpenBookingModal()}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-rose-500/60 hover:text-rose-400 text-neutral-200 font-semibold text-sm transition-all cursor-pointer"
            >
              <Clock className="w-4 h-4" />
              <span>Select Date & Time Slot</span>
            </button>
          </div>

          {/* Interactive Project Scope Estimator */}
          <div className="p-7 rounded-3xl bg-neutral-950/80 border border-neutral-800">
            <div className="flex items-center gap-2 text-violet-400 text-xs font-mono uppercase tracking-wider mb-3">
              <Calculator className="w-4 h-4" />
              Interactive Scope Estimator
            </div>
            <h2 className="text-lg font-bold text-white mb-4">Delivery Timeline Benchmark</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                  Monthly Event / Request Volume
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as const).map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setEstimatorVolume(vol)}
                      className={`py-2 px-2 rounded-lg text-xs font-medium border text-center capitalize transition-colors ${
                        estimatorVolume === vol
                          ? 'border-violet-500 bg-violet-500/20 text-white'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                      }`}
                    >
                      {vol === 'low' ? '<10k/mo' : vol === 'medium' ? '10k-250k' : '250k+'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                  Target Deployment Urgency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['urgent', 'standard', 'flexible'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setEstimatorTimeline(t)}
                      className={`py-2 px-2 rounded-lg text-xs font-medium border text-center capitalize transition-colors ${
                        estimatorTimeline === t
                          ? 'border-violet-500 bg-violet-500/20 text-white'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800/80 text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-neutral-400">Estimated Delivery:</span>
                <span className="text-rose-400 font-bold">{estimate.sprintWeeks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Infrastructure Tier:</span>
                <span className="text-neutral-200">{estimate.archGrade}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Inbound Inquiry Form */}
        <div className="lg:col-span-7 bg-neutral-900/60 border border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
          
          {submittedInquiry ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Technical Inquiry Received</h2>
              <p className="text-sm text-neutral-300 max-w-md mx-auto mb-6">
                Thank you, <span className="text-white font-medium">{submittedInquiry.name}</span>. Your brief has been committed to our system queue (Ref: <span className="font-mono text-rose-400">{submittedInquiry.id}</span>). A principal systems architect will review your specifications within 24 hours.
              </p>
              
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 max-w-sm mx-auto text-xs font-mono text-neutral-400 mb-8 text-left space-y-1">
                <div>Status: <span className="text-emerald-400">Committed to Database</span></div>
                <div>Target Service: <span className="text-white">{submittedInquiry.service}</span></div>
                <div>Recorded: <span className="text-neutral-300">{submittedInquiry.submittedAt}</span></div>
              </div>

              <button
                onClick={() => {
                  setSubmittedInquiry(null);
                  setFullName('');
                  setEmail('');
                  setPhone('');
                  setCompanyName('');
                  setMessage('');
                }}
                className="px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors"
              >
                Submit Another Inquiry
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} noValidate>
              <div className="mb-8">
                <div className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-1">
                  Structured Specification
                </div>
                <h2 className="text-2xl font-bold text-white">Project Inquiry Brief</h2>
                <p className="text-xs text-neutral-400 mt-1">
                  All submissions are encrypted and strictly governed under Saudi PDPL & GDPR privacy protocols.
                </p>
              </div>

              {/* Error Message banner */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-400">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Honeypot hidden input for spam bots */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_url_check">Leave this field blank</label>
                <input
                  type="text"
                  id="website_url_check"
                  name="website_url_check"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tariq Al-Mansoor"
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                    Business Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tariq@company.com"
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+966 5X XXX XXXX"
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company Ltd."
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                    Target Automation System
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-neutral-900 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                    Estimated Project Budget
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                  >
                    <option value="$3,000 - $7,000">$3,000 - $7,000 (Sprint POC)</option>
                    <option value="$7,000 - $18,000">$7,000 - $18,000 (Standard Production)</option>
                    <option value="$18,000 - $40,000">$18,000 - $40,000 (Multi-System Architecture)</option>
                    <option value="$40,000+">$40,000+ (Enterprise Clustered Mesh)</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                  Architecture & Workflow Requirements *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your current bottleneck, existing software platforms (e.g. HubSpot, Salesforce, Salla, PostgreSQL), and target automation outcome..."
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 transition-colors leading-relaxed"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="mb-6 p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    id="consentCheckbox"
                    name="consentCheckbox"
                    checked={consentCheckbox}
                    onChange={(e) => setConsentCheckbox(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-rose-600 focus:ring-rose-500 focus:ring-offset-neutral-950 cursor-pointer shrink-0"
                    required
                  />
                  <span className="text-xs text-neutral-300 leading-relaxed font-light">
                    I consent to IVQIE processing my submitted information to evaluate this technical brief and connect with me regarding our automation services. <span className="text-rose-400 font-medium">*</span>
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Spam-protected & TLS 1.3 encrypted</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-semibold text-xs tracking-wide transition-all shadow-xl shadow-rose-600/30 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Validating & Dispatching...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Project Brief</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
