import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Layers,
  Terminal,
  Zap,
  PhoneCall,
  Calendar,
} from 'lucide-react';
import { SERVICES_CATALOG, ServiceDetail } from '../data/servicesData';
import { ProjectConcept } from '../data/portfolioData';

interface ServiceDetailPageProps {
  slug: string;
  onBack: () => void;
  onBookCall: (serviceName?: string) => void;
  onOpenCaseStudy: (caseStudySlug: string) => void;
  allProjects?: ProjectConcept[];
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  slug,
  onBack,
  onBookCall,
  onOpenCaseStudy,
  allProjects = [],
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const service = SERVICES_CATALOG.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="pt-36 pb-24 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Service Architecture Not Found</h1>
        <p className="text-neutral-400 mb-8">
          The requested service specification could not be located in our production catalog.
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 text-white font-semibold text-sm hover:bg-rose-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services Catalog
        </button>
      </div>
    );
  }

  // Find related case study objects
  const relatedProjects = allProjects.filter((p) =>
    service.relatedCaseStudySlugs.includes(p.slug) || service.relatedCaseStudySlugs.includes(p.id)
  );

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Back & Breadcrumb Bar */}
      <div className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-neutral-800/80">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors focus:outline-none focus-visible:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Services</span>
        </button>

        <div className="text-xs font-mono text-neutral-500">
          IVQIE // SERVICES // <span className="text-rose-400 uppercase">{service.slug}</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="max-w-4xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-mono mb-4 tracking-wider uppercase">
          <Zap className="w-3.5 h-3.5" />
          {service.badge}
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 font-display">
          {service.name}
        </h1>
        <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-light mb-6">
          {service.heroDescription}
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={() => onBookCall(service.name)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm tracking-wide transition-all duration-200 shadow-xl shadow-rose-600/25 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Scope {service.name}</span>
          </button>
          <a
            href="https://wa.me/+966509850428"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900 border border-neutral-700/80 hover:border-emerald-500/60 hover:text-emerald-400 text-neutral-200 text-sm font-semibold transition-all duration-200"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Direct WhatsApp Inquiry</span>
          </a>
        </div>
      </div>

      {/* Benchmark Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {service.benchmarks.map((bm, idx) => (
          <div
            key={idx}
            className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="text-3xl sm:text-4xl font-mono font-bold text-rose-400 mb-2">
              {bm.metric}
            </div>
            <div className="text-sm font-bold text-white mb-1">{bm.label}</div>
            <div className="text-xs text-neutral-400">{bm.note}</div>
          </div>
        ))}
      </div>

      {/* Capabilities Section */}
      <section className="mb-20">
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-2">
            Engineered Capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Core Architectural Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-7 flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-xs font-mono text-rose-400 font-bold mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{cap.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                  {cap.description}
                </p>
              </div>

              <ul className="space-y-2 pt-4 border-t border-neutral-800/80">
                {cap.bulletPoints.map((bp, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 text-xs text-neutral-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Topology Layers */}
      <section className="mb-20">
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-2">
            System Topology
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            4-Tier Enterprise Architecture
          </h2>
        </div>

        <div className="space-y-4">
          {service.architectureLayers.map((layer) => (
            <div
              key={layer.number}
              className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-xl font-bold text-rose-500/80 shrink-0">
                  {layer.number}
                </span>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{layer.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">{layer.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 shrink-0">
                {layer.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deliverables & Scope Grid */}
      <section className="mb-20 rounded-2xl border border-neutral-800 bg-neutral-900/30 p-8 sm:p-10">
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-2">
            Scope & Ownership
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Included Project Deliverables
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {service.deliverables.map((deliv, dIdx) => (
            <div
              key={dIdx}
              className="flex items-start gap-3 p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-xs sm:text-sm text-neutral-200"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{deliv}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Related Case Studies if any */}
      {relatedProjects.length > 0 && (
        <section className="mb-20">
          <div className="mb-8">
            <div className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-2">
              Verified Production Deployments
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Related Case Studies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-rose-400 mb-2">{proj.clientIndustry}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{proj.name}</h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mb-6">{proj.headline}</p>
                </div>
                <button
                  onClick={() => onOpenCaseStudy(proj.slug || proj.id)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                >
                  <span>Read Full Technical Architecture</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical FAQ Accordion */}
      <section className="mb-20">
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-2">
            Engineering Answers
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Frequently Asked Technical Questions
          </h2>
        </div>

        <div className="space-y-3">
          {service.faqs.map((faq, fIdx) => {
            const isOpen = openFaqIdx === fIdx;
            return (
              <div
                key={fIdx}
                className="border border-neutral-800 rounded-xl bg-neutral-900/40 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : fIdx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-neutral-900/70 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-rose-400' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 border-t border-neutral-800/60 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Consultation CTA */}
      <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-neutral-950 to-neutral-950 p-8 sm:p-12 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Ready to Deploy {service.name}?
        </h3>
        <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto mb-8 font-light">
          Book a 30-minute confidential technical architecture review with our principal systems engineers.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onBookCall(service.name)}
            className="px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-all duration-200 shadow-xl shadow-rose-600/30 cursor-pointer"
          >
            Schedule Discovery Consultation
          </button>
          <button
            onClick={onBack}
            className="px-6 py-3.5 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white text-sm font-semibold transition-colors"
          >
            Explore Other Services
          </button>
        </div>
      </div>
    </div>
  );
};
