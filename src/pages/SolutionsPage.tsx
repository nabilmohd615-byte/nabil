import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Building2,
  HeartPulse,
  Landmark,
  ShoppingBag,
  Truck,
  Scale,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { INDUSTRY_SOLUTIONS } from '../data/solutionsData';

interface SolutionsPageProps {
  onBookCall: (industryName?: string) => void;
  onNavigateHome: () => void;
  onSelectService: (serviceSlug: string) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({
  onBookCall,
  onNavigateHome,
  onSelectService,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const industryIcons: { [key: string]: React.ReactNode } = {
    healthcare: <HeartPulse className="w-6 h-6 text-rose-400" />,
    fintech: <Landmark className="w-6 h-6 text-emerald-400" />,
    ecommerce: <ShoppingBag className="w-6 h-6 text-violet-400" />,
    logistics: <Truck className="w-6 h-6 text-amber-400" />,
    'real-estate': <Building2 className="w-6 h-6 text-cyan-400" />,
    'professional-services': <Scale className="w-6 h-6 text-rose-400" />,
  };

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
        <span className="text-neutral-200">Industry Solutions</span>
      </nav>

      {/* Hero Header */}
      <div className="max-w-4xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-mono mb-4 tracking-wider uppercase">
          <Zap className="w-3.5 h-3.5" />
          Domain-Specific Architectures
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 font-display">
          Engineered for the Exact Constraints of <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-300 to-amber-300">Your Industry.</span>
        </h1>
        <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-light max-w-3xl">
          Healthcare data cannot be handled like retail inventory; financial triage requires regulatory audit trails that generalist tools cannot provide. We build bespoke systems compliant with Saudi PDPL, SAMA, ZATCA, and international standards.
        </p>
      </div>

      {/* Solutions Stack */}
      <div className="space-y-16 mb-20">
        {INDUSTRY_SOLUTIONS.map((sol, idx) => (
          <motion.article
            key={sol.slug}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
            className="border border-neutral-800 bg-neutral-900/50 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl"
          >
            {/* Top Bar with Icon & Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                  {industryIcons[sol.slug] || <Building2 className="w-6 h-6 text-rose-400" />}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    {sol.industry}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400">{sol.tagline}</p>
                </div>
              </div>

              <span className="text-xs font-mono px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700/80 uppercase">
                {sol.badge}
              </span>
            </div>

            {/* Pain Points vs Solutions Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              
              {/* Left Column: Traditional Bottlenecks */}
              <div className="p-6 rounded-2xl bg-neutral-950/60 border border-neutral-800/80">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase tracking-wider mb-4">
                  <ShieldAlert className="w-4 h-4" />
                  Operational Vulnerabilities
                </div>
                <div className="space-y-4">
                  {sol.painPoints.map((pp, pIdx) => (
                    <div key={pIdx} className="border-b border-neutral-900 pb-3 last:border-b-0 last:pb-0">
                      <div className="text-sm font-semibold text-neutral-200 mb-1">{pp.issue}</div>
                      <p className="text-xs text-neutral-400">{pp.impact}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: IVQIE Autonomous Architecture */}
              <div className="p-6 rounded-2xl bg-neutral-950/60 border border-neutral-800/80">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
                  <ShieldCheck className="w-4 h-4" />
                  IVQIE Deployed Architecture
                </div>
                <div className="space-y-4">
                  {sol.systemSolutions.map((ss, sIdx) => (
                    <div key={sIdx} className="border-b border-neutral-900 pb-3 last:border-b-0 last:pb-0">
                      <div className="text-sm font-semibold text-white mb-1">{ss.title}</div>
                      <p className="text-xs text-neutral-300 mb-2">{ss.description}</p>
                      <ul className="flex flex-wrap gap-2">
                        {ss.features.map((feat, fIdx) => (
                          <li
                            key={fIdx}
                            className="inline-flex items-center gap-1.5 text-[11px] text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics & Compliance Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 pt-6 border-t border-neutral-800/80">
              {sol.metrics.map((m, mIdx) => (
                <div key={mIdx} className="p-4 rounded-xl bg-neutral-950/40 border border-neutral-800/60">
                  <div className="text-2xl font-mono font-bold text-rose-400 mb-1">{m.value}</div>
                  <div className="text-xs font-semibold text-white">{m.label}</div>
                  <div className="text-[11px] text-neutral-400">{m.subtext}</div>
                </div>
              ))}
            </div>

            {/* Bottom Actions & Recommended Services */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800/60">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-neutral-400 uppercase">Compliance:</span>
                {sol.regulatoryCompliance.map((reg, rIdx) => (
                  <span
                    key={rIdx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-300"
                  >
                    {reg}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onBookCall(`Industry Blueprint: ${sol.industry}`)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs tracking-wide transition-all shadow-lg shadow-rose-600/20 cursor-pointer"
              >
                <span>Request {sol.industry} Blueprint</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Global Blueprint Scoping Banner */}
      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 sm:p-12 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Need an Architecture for an Unlisted Industry?
        </h3>
        <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto mb-8 font-light">
          We have engineered custom systems for specialized manufacturing, heavy machinery leasing, sovereign wealth syndicates, and educational institutions.
        </p>
        <button
          onClick={() => onBookCall('Custom Industry Architecture')}
          className="px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-all duration-200 shadow-xl shadow-rose-600/25 cursor-pointer"
        >
          Consult on Custom Industry Architecture
        </button>
      </div>
    </div>
  );
};
