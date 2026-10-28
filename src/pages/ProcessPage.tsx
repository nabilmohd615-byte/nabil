import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Compass,
  Code2,
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MessageSquare,
  AlertTriangle,
  Zap,
} from 'lucide-react';

interface ProcessPageProps {
  onBookCall: () => void;
  onNavigateHome: () => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onBookCall, onNavigateHome }) => {
  const shouldReduceMotion = useReducedMotion();

  const phases = [
    {
      number: '01',
      title: 'Architectural Audit & Feasibility Prototyping',
      timeline: 'Days 1 – 7',
      objective: 'Eliminate technical risk before committing production code.',
      details: [
        'Complete audit of existing API endpoints, CRM schemas, database rate limits, and compliance boundaries.',
        'Creation of a working proof-of-concept proving latency, token expenditure, and data integrity.',
        'Delivery of a comprehensive System Architecture Document (SAD) with fixed delivery milestones.',
      ],
      deliverable: 'Approved System Architecture Document & Functional Sandbox Prototype',
    },
    {
      number: '02',
      title: 'Core Engineering & Guardrail Hardening',
      timeline: 'Days 8 – 21',
      objective: 'Build resilient pipelines with deterministic safety layers.',
      details: [
        'Construction of finite state machines, tool execution proxies, and validation schemas.',
        'Dialectal tuning for bilingual Arabic/English prompts with negative-constraint guardrails.',
        'Integration with your private cloud perimeter (GCP, AWS, or local on-premise clusters).',
      ],
      deliverable: 'Containerized microservices and automated CI/CD pipeline',
    },
    {
      number: '03',
      title: 'Shadow Execution & Golden Test Validation',
      timeline: 'Days 22 – 30',
      objective: 'Validate edge-case reliability against real operational traffic without customer exposure.',
      details: [
        'System runs in parallel ("shadow mode"), ingesting real leads and tickets without executing external writes.',
        'Human staff evaluate AI outputs against historical ground truth to calibrate confidence cutoffs.',
        'Stress testing under 5x peak traffic to verify rate limits and dead-letter queue behavior.',
      ],
      deliverable: 'Benchmarked Golden Test Suite with >98% accuracy confirmation',
    },
    {
      number: '04',
      title: 'Production Cutover & 90-Day Engineering SLA',
      timeline: 'Day 31+',
      objective: 'Seamless live switch with dedicated engineering coverage.',
      details: [
        'Zero-downtime DNS/webhook cutover with automated instant rollback capability.',
        'Real-time OpenTelemetry trace monitoring and supervisor alert channels configured.',
        '90-day comprehensive warranty covering model drift, edge cases, and performance tuning.',
      ],
      deliverable: 'Live Production System, Complete Source Code IP Transfer & SLA Coverage',
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
        <span className="text-neutral-200">Engineering Methodology</span>
      </nav>

      {/* Hero Header */}
      <div className="max-w-4xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-mono mb-4 tracking-wider uppercase">
          <Zap className="w-3.5 h-3.5" />
          Rigorous Delivery Protocol
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 font-display">
          How We Ship Production Systems in <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-300 to-amber-300">30 Days.</span>
        </h1>
        <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-light max-w-3xl">
          We operate with disciplined software engineering standards. Every client engagement follows an immutable 4-phase delivery protocol designed to eliminate surprises, verify compliance, and guarantee operational uptime.
        </p>
      </div>

      {/* 4-Phase Timeline Breakdown */}
      <div className="space-y-8 mb-20">
        {phases.map((ph, idx) => (
          <motion.div
            key={ph.number}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
            className="border border-neutral-800 bg-neutral-900/50 rounded-3xl p-8 sm:p-10 relative overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center font-mono text-xl font-bold text-rose-400 shrink-0">
                  {ph.number}
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-white font-display">{ph.title}</h2>
                  <div className="text-xs font-mono text-rose-400 flex items-center gap-2 mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{ph.timeline}</span>
                  </div>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300">
                Objective: <span className="text-white font-medium">{ph.objective}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6 pl-0 lg:pl-16">
              {ph.details.map((det, dIdx) => (
                <div key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{det}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between pl-0 lg:pl-16 text-xs font-mono">
              <span className="text-neutral-400">Phase Deliverable:</span>
              <span className="text-rose-400 font-semibold">{ph.deliverable}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cadence & Guarantees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        <div className="border border-neutral-800 bg-neutral-900/40 rounded-2xl p-7">
          <div className="flex items-center gap-3 text-rose-400 text-sm font-bold mb-3">
            <MessageSquare className="w-5 h-5" />
            <span>Direct Principal Communication Cadence</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light mb-4">
            You will never be handed off to a junior account manager. You communicate directly with the principal software engineers building your system via a shared private Slack / WhatsApp bridge.
          </p>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li>• Bi-weekly screen-share engineering demos with recorded walkthroughs.</li>
            <li>• Same-day asynchronous response time across all business days.</li>
            <li>• Clear sprint backlogs with transparent GitHub commit transparency.</li>
          </ul>
        </div>

        <div className="border border-neutral-800 bg-neutral-900/40 rounded-2xl p-7">
          <div className="flex items-center gap-3 text-amber-400 text-sm font-bold mb-3">
            <AlertTriangle className="w-5 h-5" />
            <span>Fault-Tolerance & Failover Protocol</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light mb-4">
            If an external service (OpenAI, Anthropic, Meta WhatsApp API) experiences an outage, our pipelines automatically divert traffic to secondary models or queue payloads safely in dead-letter storage.
          </p>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li>• Zero-loss payload retention with automatic exponential backoff.</li>
            <li>• Human supervisor kill-switches accessible directly via mobile.</li>
            <li>• Comprehensive OpenTelemetry trace logs for instant root-cause analysis.</li>
          </ul>
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-3xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-neutral-950 to-neutral-950 p-8 sm:p-12 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Have an Automation Initiative in Mind?
        </h3>
        <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto mb-8 font-light">
          Let us evaluate your tech stack and present an initial feasibility assessment within 48 hours.
        </p>
        <button
          onClick={onBookCall}
          className="px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-all duration-200 shadow-xl shadow-rose-600/30 cursor-pointer"
        >
          Book 30-Minute Architecture Audit
        </button>
      </div>
    </div>
  );
};
