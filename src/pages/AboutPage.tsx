import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ShieldCheck,
  Code2,
  Lock,
  Globe2,
  Terminal,
  Zap,
  ArrowRight,
  PhoneCall,
  Calendar,
  Users,
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

interface AboutPageProps {
  onBookCall: () => void;
  onNavigateHome: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBookCall, onNavigateHome }) => {
  const shouldReduceMotion = useReducedMotion();

  const principles = [
    {
      icon: <Code2 className="w-5 h-5 text-rose-400" />,
      title: 'Full Intellectual Property Ownership',
      description: 'You own 100% of the codebase, model weights, custom connectors, and documentation. No proprietary lock-in or recurring software tax.',
    },
    {
      icon: <Lock className="w-5 h-5 text-cyan-400" />,
      title: 'Strict Data Sovereignty (Saudi PDPL & GDPR)',
      description: 'We deploy to your private cloud perimeter (GCP Dammam, AWS Bahrain, or on-premise clusters). Zero customer data is retained for training.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: '90-Day Production Engineering Warranty',
      description: 'Every pipeline is backed by a 90-day comprehensive SLA warranty covering bug fixes, edge-case tuning, and system updates.',
    },
    {
      icon: <Terminal className="w-5 h-5 text-violet-400" />,
      title: 'Deterministic Guardrails Over Open Prompts',
      description: 'We build with state machines and schema proxies. High-risk operations require cryptographic supervisor sign-off.',
    },
  ];

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
        <span className="text-neutral-200">About the Agency</span>
      </nav>

      {/* Hero Header */}
      <div className="max-w-4xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-mono mb-4 tracking-wider uppercase">
          <Zap className="w-3.5 h-3.5" />
          Engineering Philosophy
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 font-display">
          Building the Intelligent Infrastructure of <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-300 to-amber-300">Modern Enterprise.</span>
        </h1>
        <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-light max-w-3xl">
          IVQIE was founded on a simple observation: while the world was inundated with fragile consumer AI prototypes, serious enterprises needed deterministic, fault-tolerant engineering that works while they sleep.
        </p>
      </div>

      {/* Founder & Leadership Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20 bg-neutral-900/40 border border-neutral-800 rounded-3xl p-8 sm:p-12">
        <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="relative mb-6">
            <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-rose-500/40 shadow-2xl relative">
              <img
                src="/assets/aistudio/603811916_122251205468180050_5460836446566182641_n_8486475e.jpg"
                alt="Nabil - Founder & Lead Systems Architect at IVQIE"
                className="w-full h-full object-cover object-top filter contrast-[1.03]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-md bg-rose-600 text-[10px] font-mono font-bold text-white uppercase tracking-wider shadow">
              Founder
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Nabil</h2>
          <div className="text-sm font-mono text-rose-400 mb-4">Founder &amp; Lead Systems Architect</div>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mb-6">
            Spearheading autonomous AI systems, enterprise workflow automation, and high-impact digital growth across Saudi Arabia, Bangladesh, and international enterprise markets.
          </p>
          <a
            href="https://wa.me/+966509850428"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1.5 rounded-lg"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Direct WhatsApp: +966 50 985 0428</span>
          </a>
        </div>

        <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
          <p>
            "We believe that technology should make business simpler, not more fragile. In 2025, any engineer can connect an API key to a model. The true challenge is building fault-tolerant pipelines that maintain strict compliance, handle sudden volume spikes, and recover autonomously from third-party outages."
          </p>
          <p>
            From our strategic footprint in Saudi Arabia and global technical nodes, IVQIE partners with clinics, financial institutions, logistics carriers, and high-growth retail brands. We operate with radical transparency: no fabricated statistics, no hidden subcontractor layers, and zero vendor lock-in.
          </p>
          <div className="pt-4 flex flex-wrap gap-4 font-mono text-xs text-neutral-400">
            <div className="flex items-center gap-1.5 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800">
              <Globe2 className="w-4 h-4 text-rose-400" />
              <span>Saudi Arabia & Global Node Network</span>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Dedicated Principal Engineers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Engineering Principles */}
      <section className="mb-20">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-2">
            Non-Negotiable Standards
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Our Engineering Principles</h2>
          <p className="text-sm text-neutral-400">
            The architectural guarantees we deliver to every enterprise partner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((pr, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-7 flex items-start gap-5 hover:border-neutral-700 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center shrink-0">
                {pr.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-2">{pr.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                  {pr.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="rounded-3xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-neutral-950 to-neutral-950 p-8 sm:p-12 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Partner with IVQIE on Your Next Initiative
        </h3>
        <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto mb-8 font-light">
          We take on a limited number of enterprise deployments per quarter to ensure principal-level oversight.
        </p>
        <button
          onClick={onBookCall}
          className="px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-all duration-200 shadow-xl shadow-rose-600/30 cursor-pointer"
        >
          Schedule Executive Architecture Call
        </button>
      </div>
    </div>
  );
};
