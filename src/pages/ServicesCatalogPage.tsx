import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Cpu,
  Workflow,
  MessageSquareCode,
  DatabaseZap,
  PhoneCall,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { SERVICES_CATALOG } from '../data/servicesData';

interface ServicesCatalogPageProps {
  onSelectService: (slug: string) => void;
  onBookCall: (serviceName?: string) => void;
  onNavigateHome: () => void;
}

export const ServicesCatalogPage: React.FC<ServicesCatalogPageProps> = ({
  onSelectService,
  onBookCall,
  onNavigateHome,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const iconMap: { [key: string]: React.ReactNode } = {
    'ai-agents': <Cpu className="w-6 h-6 text-rose-400" />,
    'workflow-automation': <Workflow className="w-6 h-6 text-violet-400" />,
    'conversational-ai': <MessageSquareCode className="w-6 h-6 text-cyan-400" />,
    'crm-automation': <DatabaseZap className="w-6 h-6 text-emerald-400" />,
    'ai-voice-assistants': <PhoneCall className="w-6 h-6 text-amber-400" />,
    'custom-ai-integrations': <Sparkles className="w-6 h-6 text-rose-400" />,
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb & Navigation Back */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button
          onClick={onNavigateHome}
          className="hover:text-rose-400 transition-colors focus:outline-none focus-visible:underline"
        >
          IVQIE
        </button>
        <span>/</span>
        <span className="text-neutral-200">Services Catalog</span>
      </nav>

      {/* Hero Header */}
      <div className="max-w-4xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-mono mb-4 tracking-wider uppercase">
          <Zap className="w-3.5 h-3.5" />
          Production Engineering Disciplines
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 font-display">
          Enterprise AI Systems That <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-300 to-amber-300">Run Without Failure.</span>
        </h1>
        <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-3xl font-light">
          We do not sell prompt experiments or generic SaaS subscriptions. We architect, build, and deploy deterministic AI pipelines that integrate natively into your existing business infrastructure.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {SERVICES_CATALOG.map((svc, idx) => (
          <motion.article
            key={svc.slug}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35, delay: idx * 0.06 }}
            className="group relative flex flex-col justify-between bg-neutral-900/60 hover:bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-7 transition-all duration-300 shadow-xl"
          >
            <div>
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {iconMap[svc.slug] || <Cpu className="w-6 h-6 text-rose-400" />}
                </div>
                <span className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded-md bg-neutral-800/80 text-neutral-300 border border-neutral-700/60 uppercase">
                  {svc.badge}
                </span>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">
                {svc.name}
              </h2>
              <p className="text-sm text-neutral-400 mb-6 line-clamp-2">
                {svc.tagline}
              </p>

              {/* Highlights List */}
              <ul className="space-y-2 mb-8">
                {svc.highlights.slice(0, 3).map((hl, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Actions & Metrics */}
            <div className="pt-6 border-t border-neutral-800/80 flex items-center justify-between">
              <div>
                <span className="text-lg font-bold font-mono text-white">
                  {svc.benchmarks[0]?.metric || '99.9%'}
                </span>
                <span className="block text-[10px] uppercase font-mono text-neutral-400">
                  {svc.benchmarks[0]?.label || 'Reliability'}
                </span>
              </div>
              <button
                onClick={() => onSelectService(svc.slug)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800/80 hover:bg-rose-600 text-white text-xs font-semibold tracking-wide transition-all duration-200 group-hover:shadow-lg group-hover:shadow-rose-600/20"
              >
                <span>View Architecture</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Engineering SLA Guarantee Banner */}
      <div className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900/90 via-neutral-900/50 to-neutral-950 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            Deterministic 90-Day Production SLA
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Every deployment backed by source code ownership and SLA support.
          </h3>
          <p className="text-sm text-neutral-300">
            You retain 100% intellectual property ownership of your models, workflows, and custom connectors. We deploy directly to your isolated cloud perimeter with automated failover.
          </p>
        </div>
        <button
          onClick={() => onBookCall()}
          className="shrink-0 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-all duration-200 shadow-xl shadow-rose-600/25 cursor-pointer"
        >
          Request Technical Scoping
        </button>
      </div>
    </div>
  );
};
