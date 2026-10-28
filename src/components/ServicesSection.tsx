import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { 
  Cpu, 
  Workflow, 
  MessageSquareText, 
  Database, 
  PhoneCall, 
  Boxes, 
  ArrowRight, 
  Check, 
  X, 
  Layers, 
  Clock, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  Radio, 
  Zap, 
  Lock,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  category: string;
  title: string;
  headline: string;
  benefit: string;
  deliverables: string[];
  metric: string;
  metricLabel: string;
  accent: 'rose' | 'violet' | 'cyan' | 'amber';
  icon: typeof Cpu;
  gridSpan: string; // Tailwind grid span classes
  interactiveType: 'agent-loop' | 'pipeline' | 'chat' | 'crm' | 'voice' | 'architecture';
}

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
  onNavigateToServiceDetail?: (slug: string) => void;
  onViewAllServices?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onNavigateToServiceDetail,
  onViewAllServices,
}) => {
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Active step for AI Agent demonstration
  const [activeAgentStep, setActiveAgentStep] = useState<number>(1);
  // Auto-cycle the agent reasoning loop
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveAgentStep((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 2800);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const services: ServiceItem[] = [
    {
      id: 'ai-agents',
      category: 'Autonomous Systems',
      title: 'AI Agents',
      headline: 'Autonomous Multi-Step Reasoning & Action Execution',
      benefit: 'Deploy autonomous agents that independently evaluate enterprise context, query live databases, execute multi-step tool calls, and complete complex business processes with continuous human-in-the-loop oversight.',
      deliverables: [
        'Multi-agent role hierarchy & orchestration',
        'Autonomous API tool-calling & database querying',
        'Real-time reasoning logs & exception escalation',
        'Long-term vector memory & enterprise knowledge retrieval',
        'Automated quality assurance & compliance guardrails',
      ],
      metric: '99.4%',
      metricLabel: 'Task Accuracy',
      accent: 'rose',
      icon: Cpu,
      gridSpan: 'lg:col-span-7',
      interactiveType: 'agent-loop',
    },
    {
      id: 'workflow-automation',
      category: 'Process Engineering',
      title: 'Workflow Automation',
      headline: 'Resilient End-to-End Pipeline Synchronization',
      benefit: 'Eliminate manual repetitive operations by connecting your internal business tools into fault-tolerant, event-driven pipelines that trigger instantaneously across webhooks, cloud functions, and enterprise APIs.',
      deliverables: [
        'Multi-platform webhook & API connectors',
        'Automated failover, retries & error handling',
        'Instant multi-channel notifications (WhatsApp, Slack, Email)',
        'Automated spreadsheet, invoice & PDF generation',
        'Complex conditional multi-branch decision trees',
      ],
      metric: '0 Manual Steps',
      metricLabel: 'Eliminated Busywork',
      accent: 'cyan',
      icon: Workflow,
      gridSpan: 'lg:col-span-5',
      interactiveType: 'pipeline',
    },
    {
      id: 'conversational-ai',
      category: 'Omnichannel Engagement',
      title: 'Conversational AI',
      headline: 'Human-Grade Bilingual Inbound Qualification',
      benefit: 'Engage, qualify, and convert prospects across WhatsApp, Website Chat, and Meta inboxes with fluent, context-aware natural language understanding natively optimized for Saudi Arabia (Arabic) and global English markets.',
      deliverables: [
        'Official WhatsApp Business Cloud API integration',
        'Native Arabic (Gulf/MSA) & English fluency',
        'Intent qualification & dynamic appointment scheduling',
        'Automated product catalog lookups & quote generation',
        'Seamless live human-agent escalation protocols',
      ],
      metric: '<1.2s',
      metricLabel: 'Instant Response',
      accent: 'rose',
      icon: MessageSquareText,
      gridSpan: 'lg:col-span-4',
      interactiveType: 'chat',
    },
    {
      id: 'crm-automation',
      category: 'Revenue Operations',
      title: 'CRM Automation',
      headline: 'Zero-Latency Lead Ingestion & Pipeline Sync',
      benefit: 'Capture every inbound interaction instantly into HubSpot, Salesforce, or Google Sheets with automated lead enrichment, predictive deal scoring, and instant personalized follow-up drip sequences.',
      deliverables: [
        'Instant bidirectional sync with HubSpot, Sheets & CRMs',
        'Automated lead deduplication & data enrichment',
        'Predictive deal scoring & intent prioritization',
        'Automated multi-touch follow-up scheduling',
        'Revenue pipeline velocity & attribution reporting',
      ],
      metric: '100%',
      metricLabel: 'Lead Capture Rate',
      accent: 'amber',
      icon: Database,
      gridSpan: 'lg:col-span-4',
      interactiveType: 'crm',
    },
    {
      id: 'ai-voice-assistants',
      category: 'Acoustic Intelligence',
      title: 'AI Voice Assistants',
      headline: 'Ultra-Low-Latency Conversational Voice Agents',
      benefit: 'Deploy lifelike voice agents capable of handling inbound customer support calls, qualifying outbound inquiries, and reserving calendar appointments with sub-500ms latency, natural interruption handling, and human inflection.',
      deliverables: [
        'Sub-500ms voice processing & round-trip latency',
        'Natural speech turn-taking & interruption resilience',
        'Bilingual conversational pacing (English & Arabic)',
        'Direct telephony & VoIP trunk integration (Twilio / SIP)',
        'Full call transcription, sentiment analysis & CRM logging',
      ],
      metric: '<450ms',
      metricLabel: 'Audio Latency',
      accent: 'violet',
      icon: PhoneCall,
      gridSpan: 'lg:col-span-4',
      interactiveType: 'voice',
    },
    {
      id: 'custom-ai-integrations',
      category: 'Enterprise Infrastructure',
      title: 'Custom AI Integrations',
      headline: 'Unified Intelligence Layer For Proprietary Enterprise Stacks',
      benefit: 'Unify your proprietary software, internal SQL/NoSQL databases, and private LLMs into a fortified, SOC2/PDPL-compliant intelligence layer engineered specifically for your organization’s unique operational requirements.',
      deliverables: [
        'Private LLM deployment & domain fine-tuning',
        'Secure Retrieval-Augmented Generation (RAG) knowledge vaults',
        'Enterprise RBAC, audit logging & data privacy compliance',
        'High-concurrency cloud infrastructure with scale-to-zero efficiency',
        'Custom webhook microservices & middleware orchestration',
      ],
      metric: 'Enterprise Ready',
      metricLabel: 'VPC & PDPL Compliant',
      accent: 'rose',
      icon: Boxes,
      gridSpan: 'lg:col-span-12',
      interactiveType: 'architecture',
    },
  ];

  // Motion animation presets
  const smoothEase = [0.16, 1, 0.3, 1] as const;

  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: smoothEase,
      },
    },
  };

  return (
    <section 
      id="services" 
      className="py-24 md:py-32 bg-[#0B0F17] relative text-white overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#F43F5E]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-rose-500 font-['Space_Mono',monospace]">
                CAPABILITIES &amp; ARCHITECTURE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
              Intelligent Systems Engineered To Scale.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed font-light font-['Plus_Jakarta_Sans',sans-serif]">
              From autonomous multi-step reasoning agents to zero-latency CRM pipelines, we architect resilient AI infrastructure designed to eliminate repetitive manual work and unlock exponential business velocity.
            </p>
          </div>

          {onViewAllServices && (
            <button
              onClick={onViewAllServices}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-rose-500 text-xs font-mono font-semibold text-neutral-300 hover:text-white transition-all shrink-0 cursor-pointer"
            >
              <span>Explore All 6 Architectures</span>
              <ArrowRight className="w-4 h-4 text-rose-500" />
            </button>
          )}
        </div>

        {/* Bento Grid Container */}
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6"
        >

          {/* Card 1: AI Agents (Featured Bento Hero - Span 7) */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-7 bg-[#0d121c]/90 rounded-2xl p-6 sm:p-7 border border-neutral-800/90 hover:border-neutral-700/80 hover:bg-[#101624] transition-all duration-300 shadow-xl flex flex-col justify-between group relative overflow-hidden focus-within:ring-2 focus-within:ring-rose-500/60"
          >
            {/* Subtle top ambient accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-500/0 via-rose-500/60 to-rose-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              {/* Header: Category & Metric */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                      {services[0].category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit',sans-serif]">
                      {services[0].title}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-rose-400 font-['Outfit',sans-serif]">
                    {services[0].metric}
                  </span>
                  <span className="text-[9px] font-mono uppercase text-neutral-400 block">
                    {services[0].metricLabel}
                  </span>
                </div>
              </div>

              {/* Headline & Benefit */}
              <h4 className="text-sm sm:text-base font-semibold text-neutral-200">
                {services[0].headline}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                {services[0].benefit}
              </p>

              {/* Interactive Mini-Demonstration: Autonomous Agent Thought Loop */}
              <div className="mt-5 p-3.5 sm:p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80">
                <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono mb-3">
                  <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                    <Activity className="w-3.5 h-3.5 animate-pulse" />
                    <span>AGENT REASONING CYCLE</span>
                  </div>
                  <span className="text-neutral-400">LATENCY: 92ms</span>
                </div>

                {/* 4 Sequential Agent Steps */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { step: 1, label: '1. Ingest Task', sub: 'Parse context' },
                    { step: 2, label: '2. Query Tools', sub: 'CRM & Vector DB' },
                    { step: 3, label: '3. Execute Logic', sub: 'Generate Output' },
                    { step: 4, label: '4. Verify & Log', sub: 'Dispatch Action' },
                  ].map((s) => {
                    const isActive = activeAgentStep === s.step;
                    return (
                      <button
                        key={s.step}
                        type="button"
                        onClick={() => setActiveAgentStep(s.step)}
                        className={`p-2 rounded-lg text-left transition-all cursor-pointer ${
                          isActive
                            ? 'bg-rose-950/50 border border-rose-500/50 shadow-xs'
                            : 'bg-neutral-900/60 border border-neutral-800/60 hover:border-neutral-700'
                        }`}
                      >
                        <div className={`text-[11px] font-bold ${isActive ? 'text-rose-400' : 'text-neutral-300'}`}>
                          {s.label}
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                          {s.sub}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-850">
                  <span className="text-neutral-400">Step {activeAgentStep} active • Continuous human-in-the-loop audit logs</span>
                  <span className="text-rose-400 font-mono font-medium">STATUS: READY</span>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedServiceModal(services[0])}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer group/link"
              >
                <span>View Full Scope</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover/link:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => onSelectService(services[0].title)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-all shadow-md shadow-rose-600/20 cursor-pointer"
              >
                <span>Inquire For Agents</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Workflow Automation (Span 5) */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-5 bg-[#0d121c]/90 rounded-2xl p-6 sm:p-7 border border-neutral-800/90 hover:border-neutral-700/80 hover:bg-[#101624] transition-all duration-300 shadow-xl flex flex-col justify-between group relative overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500/60"
          >
            {/* Ambient accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/60 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                      {services[1].category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit',sans-serif]">
                      {services[1].title}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-cyan-400 font-['Outfit',sans-serif]">
                    {services[1].metric}
                  </span>
                  <span className="text-[9px] font-mono uppercase text-neutral-400 block">
                    {services[1].metricLabel}
                  </span>
                </div>
              </div>

              <h4 className="text-sm sm:text-base font-semibold text-neutral-200">
                {services[1].headline}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                {services[1].benefit}
              </p>

              {/* Interactive Mini-Demonstration: Multi-Stage Flow Pipeline */}
              <div className="mt-5 p-3.5 sm:p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80">
                <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono mb-2.5">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    EVENT PIPELINE
                  </span>
                  <span>SYNC: 0.04s</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-neutral-900/80 border border-neutral-800">
                    <span className="text-neutral-300 font-mono text-[11px]">Inbound Webhook (Shopify/Form)</span>
                    <span className="text-[10px] font-mono text-cyan-400">Triggered ✓</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-neutral-900/80 border border-neutral-800">
                    <span className="text-neutral-300 font-mono text-[11px]">AI Validation &amp; Formatting</span>
                    <span className="text-[10px] font-mono text-emerald-400">Enriched ✓</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-neutral-900/80 border border-neutral-800">
                    <span className="text-neutral-300 font-mono text-[11px]">HubSpot + WhatsApp Notification</span>
                    <span className="text-[10px] font-mono text-cyan-400">Dispatched ✓</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedServiceModal(services[1])}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer group/link"
              >
                <span>View Full Scope</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover/link:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => onSelectService(services[1].title)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-all shadow-md shadow-cyan-600/20 cursor-pointer"
              >
                <span>Inquire For Workflows</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 3: Conversational AI (Span 4) */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-4 bg-[#0d121c]/90 rounded-2xl p-6 border border-neutral-800/90 hover:border-neutral-700/80 hover:bg-[#101624] transition-all duration-300 shadow-xl flex flex-col justify-between group relative overflow-hidden focus-within:ring-2 focus-within:ring-rose-500/60"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-500/0 via-rose-500/60 to-rose-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                    <MessageSquareText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                      {services[2].category}
                    </span>
                    <h3 className="text-xl font-bold text-white font-['Outfit',sans-serif]">
                      {services[2].title}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-rose-400 font-['Outfit',sans-serif]">
                    {services[2].metric}
                  </span>
                  <span className="text-[9px] font-mono uppercase text-neutral-400 block">
                    {services[2].metricLabel}
                  </span>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-neutral-200">
                {services[2].headline}
              </h4>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed font-light">
                {services[2].benefit}
              </p>

              {/* Interactive Mini-Demonstration: Simulated WhatsApp / Chat Bubble */}
              <div className="mt-5 p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/80 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pb-1 border-b border-neutral-850">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    WHATSAPP API
                  </span>
                  <span>EN / AR NATIVE</span>
                </div>
                
                {/* User message */}
                <div className="bg-neutral-900/90 text-neutral-200 text-[11px] p-2 rounded-lg rounded-tr-none ml-4 border border-neutral-800">
                  “Can you automate our Riyadh client inquiries?”
                </div>
                
                {/* AI Agent message */}
                <div className="bg-rose-950/40 text-neutral-100 text-[11px] p-2 rounded-lg rounded-tl-none mr-4 border border-rose-500/30">
                  “Yes. We deploy an intelligent WhatsApp agent with instant Arabic qualification &amp; calendar booking.”
                  <div className="text-[9px] text-rose-400/80 text-right mt-1 font-mono">0.8s • Resolved ✓✓</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedServiceModal(services[2])}
                className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                View Scope
              </button>

              <button
                type="button"
                onClick={() => onSelectService(services[2].title)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-all cursor-pointer shadow-sm"
              >
                <span>Inquire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 4: CRM Automation (Span 4) */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-4 bg-[#0d121c]/90 rounded-2xl p-6 border border-neutral-800/90 hover:border-neutral-700/80 hover:bg-[#101624] transition-all duration-300 shadow-xl flex flex-col justify-between group relative overflow-hidden focus-within:ring-2 focus-within:ring-amber-500/60"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/0 via-amber-500/60 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                      {services[3].category}
                    </span>
                    <h3 className="text-xl font-bold text-white font-['Outfit',sans-serif]">
                      {services[3].title}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-amber-400 font-['Outfit',sans-serif]">
                    {services[3].metric}
                  </span>
                  <span className="text-[9px] font-mono uppercase text-neutral-400 block">
                    {services[3].metricLabel}
                  </span>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-neutral-200">
                {services[3].headline}
              </h4>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed font-light">
                {services[3].benefit}
              </p>

              {/* Interactive Mini-Demonstration: Mini CRM Record Card */}
              <div className="mt-5 p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/80 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pb-1 border-b border-neutral-850">
                  <span className="text-amber-400 font-bold">PIPELINE RECORD</span>
                  <span className="text-emerald-400 font-mono">HUBSPOT SYNCED</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-200">
                  <span className="font-semibold text-white">Gulf Logistics KSA</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-mono">98/100 Intent</span>
                </div>
                <div className="text-[11px] text-neutral-400 flex items-center justify-between">
                  <span>Deal Stage: Strategy Brief</span>
                  <span className="text-neutral-300 font-mono">Auto-Drip Active</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedServiceModal(services[3])}
                className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                View Scope
              </button>

              <button
                type="button"
                onClick={() => onSelectService(services[3].title)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 rounded-lg transition-all cursor-pointer shadow-sm"
              >
                <span>Inquire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 5: AI Voice Assistants (Span 4) */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-4 bg-[#0d121c]/90 rounded-2xl p-6 border border-neutral-800/90 hover:border-neutral-700/80 hover:bg-[#101624] transition-all duration-300 shadow-xl flex flex-col justify-between group relative overflow-hidden focus-within:ring-2 focus-within:ring-violet-500/60"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500/0 via-violet-500/60 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                      {services[4].category}
                    </span>
                    <h3 className="text-xl font-bold text-white font-['Outfit',sans-serif]">
                      {services[4].title}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-violet-400 font-['Outfit',sans-serif]">
                    {services[4].metric}
                  </span>
                  <span className="text-[9px] font-mono uppercase text-neutral-400 block">
                    {services[4].metricLabel}
                  </span>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-neutral-200">
                {services[4].headline}
              </h4>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed font-light">
                {services[4].benefit}
              </p>

              {/* Interactive Mini-Demonstration: Animated Acoustic Audio Waveform */}
              <div className="mt-5 p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/80">
                <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pb-2 mb-2 border-b border-neutral-850">
                  <span className="flex items-center gap-1.5 text-violet-400 font-bold">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    LIVE VOICE CALL
                  </span>
                  <span className="text-neutral-400">SESSION: 01:24</span>
                </div>

                {/* 14 Audio Waveform Bars */}
                <div className="flex items-center justify-center gap-1.5 h-9">
                  {[40, 75, 55, 90, 65, 30, 85, 95, 60, 45, 80, 50, 70, 40].map((height, i) => (
                    <span
                      key={i}
                      className="w-1 bg-gradient-to-t from-violet-500 to-rose-400 rounded-full transition-all duration-300"
                      style={{
                        height: `${height}%`,
                        opacity: 0.6 + (i % 3) * 0.2,
                        animation: shouldReduceMotion ? 'none' : `pulse ${1.2 + (i % 5) * 0.3}s infinite ease-in-out`,
                      }}
                    />
                  ))}
                </div>

                <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                  <span>Natural turn-taking &amp; interruption</span>
                  <span className="text-emerald-400">LATENCY &lt;450ms</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedServiceModal(services[4])}
                className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                View Scope
              </button>

              <button
                type="button"
                onClick={() => onSelectService(services[4].title)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-all cursor-pointer shadow-sm"
              >
                <span>Inquire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 6: Custom AI Integrations (Span 12 - Full-Width Bento Hero) */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-12 bg-[#0d121c]/90 rounded-2xl p-6 sm:p-8 border border-neutral-800/90 hover:border-neutral-700/80 hover:bg-[#101624] transition-all duration-300 shadow-2xl group relative overflow-hidden focus-within:ring-2 focus-within:ring-rose-500/60"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-500/0 via-rose-500/60 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Scope & Enterprise Description */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                    <Boxes className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                      {services[5].category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit',sans-serif]">
                      {services[5].title}
                    </h3>
                  </div>
                </div>

                <h4 className="text-base sm:text-lg font-semibold text-neutral-200 mt-2">
                  {services[5].headline}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                  {services[5].benefit}
                </p>

                {/* Key enterprise badges */}
                <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-[11px]">
                    <Lock className="w-3.5 h-3.5 text-rose-400" />
                    SOC2 &amp; Saudi PDPL Compliant
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Zero Data Training on Private Models
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-[11px]">
                    <Zap className="w-3.5 h-3.5 text-violet-400" />
                    Private VPC &amp; Serverless Microservices
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive Enterprise Architecture Demonstration */}
              <div className="lg:col-span-5 bg-neutral-950/80 p-5 rounded-xl border border-neutral-800/90">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pb-3 mb-3 border-b border-neutral-850">
                  <span className="text-rose-400 font-bold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    ENTERPRISE AI BRIDGE
                  </span>
                  <span className="text-emerald-400">TLS 1.3 SECURE</span>
                </div>

                {/* Architecture Conduit Diagram */}
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-neutral-900/90 border border-neutral-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-white">1. Internal Databases &amp; ERP</div>
                      <div className="text-[10px] text-neutral-400 font-mono">PostgreSQL, SAP, REST APIs, Webhooks</div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400">SOURCE</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/40 flex items-center justify-between text-xs shadow-xs">
                    <div>
                      <div className="font-semibold text-rose-300">2. IVQIE Autonomous Intelligence Layer</div>
                      <div className="text-[10px] text-neutral-300 font-mono">Custom Vector RAG &amp; Multi-Agent Core</div>
                    </div>
                    <span className="text-[10px] font-mono text-rose-400">&lt;75ms</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-neutral-900/90 border border-neutral-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-white">3. Enterprise Execution &amp; Telemetry</div>
                      <div className="text-[10px] text-neutral-400 font-mono">Automated Operations, Inboxes &amp; Dashboards</div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">DISPATCH</span>
                  </div>
                </div>

                {/* Architecture CTA */}
                <div className="mt-4 pt-3 border-t border-neutral-850 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedServiceModal(services[5])}
                    className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Explore Architecture Specs →
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectService(services[5].title)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-all cursor-pointer shadow-sm"
                  >
                    <span>Inquire Custom Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>

        </motion.div>

        {/* Ethical commitment footer */}
        <div className="mt-12 p-4.5 rounded-xl bg-[#0d121c]/80 border border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-300">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0" />
            <span>
              <strong className="text-white">Responsible Scope:</strong> We architect measurable operational workflows with full data confidentiality. No vanity guarantees or inflated complexity.
            </span>
          </div>
          <button
            type="button"
            onClick={() => onSelectService('Full-Stack Enterprise AI Automation')}
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 underline underline-offset-4 cursor-pointer"
          >
            Need a bespoke enterprise solution? Request custom architecture consultation →
          </button>
        </div>

      </div>

      {/* Comprehensive Modal for deep-diving into individual Service Specs */}
      <AnimatePresence>
        {selectedServiceModal && (
          <div
            className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedServiceModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0e131f] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-800 max-h-[90vh] overflow-y-auto text-white relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400">
                  <span className="uppercase">{selectedServiceModal.category}</span>
                  <span>·</span>
                  <span className="text-neutral-400 font-sans uppercase">Comprehensive Scope</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedServiceModal(null)}
                  className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title & Description */}
              <div className="mt-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit',sans-serif]">
                  {selectedServiceModal.title}
                </h3>
                <p className="mt-1 text-sm text-rose-400 font-medium">
                  {selectedServiceModal.headline}
                </p>
                <p className="mt-3 text-sm text-neutral-300 leading-relaxed font-light">
                  {selectedServiceModal.benefit}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="mt-6 bg-neutral-950/80 p-5 rounded-xl border border-neutral-800/90">
                <h4 className="text-xs font-bold tracking-wider uppercase text-neutral-300 mb-3.5 flex items-center gap-2 font-mono">
                  <Layers className="w-4 h-4 text-rose-500" />
                  Included Deliverables &amp; Engineering Modules
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedServiceModal.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer with Sprint Timing & CTA */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-800">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Deployment sprint: 2–3 weeks</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  {onNavigateToServiceDetail && (
                    <button
                      type="button"
                      onClick={() => {
                        const id = selectedServiceModal.id;
                        setSelectedServiceModal(null);
                        onNavigateToServiceDetail(id);
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
                    >
                      <span>Full Architecture Spec</span>
                      <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      const title = selectedServiceModal.title;
                      setSelectedServiceModal(null);
                      onSelectService(title);
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md shadow-rose-600/30 cursor-pointer"
                  >
                    Inquire For This Service →
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
