import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { Compass, Lightbulb, Code2, Rocket, Check, ArrowRight, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    {
      num: '01',
      title: 'Discover',
      summary: 'Understand business goals, bottlenecks, audience, and requirements.',
      desc: 'We conduct a targeted audit of your current customer touchpoints, manual operations, and marketing assets to locate high-friction drop-offs and high-leverage automation opportunities.',
      milestones: [
        'Discovery intake & operational process mapping',
        'Current software stack & webhook audit',
        'Target audience & market focus clarification (Saudi Arabia & Global)',
        'Technical feasibility & security constraint review',
      ],
      icon: Compass,
      timeframe: 'Days 1–3',
    },
    {
      num: '02',
      title: 'Strategize',
      summary: 'Define the scope, recommended solution, timeline, and deliverables.',
      desc: 'You receive an exact architectural blueprint detailing tools, triggers, data formats, milestones, and success criteria before any development starts—with zero surprise costs.',
      milestones: [
        'Architecture blueprint and toolstack recommendation',
        'Concrete deliverable matrix & milestone sign-off',
        'Funnel & messaging framework approval',
        'Transparent fixed scope with guaranteed delivery SLA',
      ],
      icon: Lightbulb,
      timeframe: 'Days 4–7',
    },
    {
      num: '03',
      title: 'Build & Test',
      summary: 'Implement the workflow or campaign, test important scenarios, and refine the experience.',
      desc: 'We build pipelines, connect webhooks, design campaign creative, and rigorously test edge cases to guarantee reliability before real traffic hits production.',
      milestones: [
        'Workflow buildout and API integration',
        'Campaign creative and copywriting execution',
        'Edge-case testing & failure recovery verification',
        'Pre-launch staging preview with client walkthrough',
      ],
      icon: Code2,
      timeframe: 'Weeks 2–3',
    },
    {
      num: '04',
      title: 'Launch & Improve',
      summary: 'Deploy with client approval, provide documentation, and agree on future monitoring or optimization.',
      desc: 'We deploy to production with your written approval, supply complete documentation, and set up clear telemetry for ongoing iterative refinement.',
      milestones: [
        'Client-approved production deployment',
        'Full operating documentation and admin handover',
        'Tracking validation across GA4, Meta & CRM',
        'Ongoing performance monitoring & optimization review',
      ],
      icon: Rocket,
      timeframe: 'Week 4 & Ongoing',
    },
  ];

  const smoothEase = [0.16, 1, 0.3, 1] as const;

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.55, ease: smoothEase },
    },
  };

  return (
    <section id="process" className="py-24 md:py-32 bg-[#0B0F17] border-t border-neutral-800/80 relative overflow-hidden text-white">
      
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-subtle opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2.5 mb-3 text-xs font-bold tracking-[0.2em] uppercase text-rose-500 font-['Space_Mono',monospace]">
            <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#F43F5E]" />
            <span>HOW WE WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
            From First Conversation to a Working System.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 font-light leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
            A disciplined, four-stage implementation methodology designed to eliminate surprises, protect timelines, and ensure predictable outcomes.
          </p>
        </div>

        {/* Desktop Connected Steps with Animated Timeline Connector */}
        <div className="hidden lg:grid grid-cols-4 gap-6 relative">
          
          {/* Connecting Line Track */}
          <div className="absolute top-12 left-12 right-12 h-[2px] bg-neutral-800 -z-0" />
          
          {/* Dynamic Progress Indicator Line */}
          <motion.div 
            className="absolute top-12 left-12 h-[2px] bg-gradient-to-r from-rose-500 to-rose-400 -z-0"
            initial={false}
            animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: smoothEase }}
          />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            const isPassed = idx <= activeStep;

            return (
              <motion.div
                key={step.num}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onClick={() => setActiveStep(idx)}
                className={`relative z-10 cursor-pointer flex flex-col justify-between p-6 rounded-2xl border transition-all duration-250 select-none ${
                  isSelected
                    ? 'bg-[#121927] text-white border-rose-500/80 shadow-2xl -translate-y-1.5'
                    : 'bg-[#0d121c] text-white border-neutral-800 hover:border-neutral-700 hover:bg-[#101624] hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-xs font-mono font-bold tracking-wider ${
                        isSelected ? 'text-rose-400' : 'text-neutral-500'
                      }`}
                    >
                      STAGE {step.num}
                    </span>
                    
                    {/* Glowing Step Indicator Circle */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 border ${
                        isSelected
                          ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/30 scale-105'
                          : isPassed
                          ? 'bg-neutral-900 text-rose-400 border-rose-500/30'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-['Outfit',sans-serif] text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-neutral-400 font-light">
                    {step.summary}
                  </p>
                </div>

                <div
                  className={`mt-6 pt-4 border-t text-[11px] font-mono flex items-center justify-between ${
                    isSelected
                      ? 'border-neutral-700/80 text-neutral-300'
                      : 'border-neutral-800 text-neutral-500'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    {step.timeframe}
                  </span>
                  <span className={isSelected ? 'text-rose-400 font-bold' : 'text-neutral-400'}>
                    {isSelected ? 'Active Phase' : 'Inspect →'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Step Deep Dive (Desktop) */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeStep}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
            transition={{ duration: 0.25 }}
            className="hidden lg:block mt-8 p-7 bg-[#0d121c] rounded-2xl border border-neutral-800/90 shadow-xl"
          >
            <div className="flex items-start justify-between gap-8">
              <div className="max-w-lg">
                <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-wider">
                  Stage {steps[activeStep].num} Deep Dive
                </span>
                <h4 className="text-2xl font-bold text-white mt-1.5 font-['Outfit',sans-serif]">
                  {steps[activeStep].title}: Implementation Protocol
                </h4>
                <p className="mt-3 text-sm text-neutral-300 font-light leading-relaxed">
                  {steps[activeStep].desc}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400 font-mono">
                  <span className="text-emerald-400 font-bold">Standard SLA:</span>
                  <span>{steps[activeStep].timeframe} delivery window with daily async progress updates.</span>
                </div>
              </div>

              <div className="flex-1 bg-neutral-950/70 p-6 rounded-xl border border-neutral-800">
                <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3.5 flex items-center gap-2 font-mono">
                  <ShieldCheck className="w-4 h-4 text-rose-500" />
                  Included Deliverables &amp; Milestones
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  {steps[activeStep].milestones.map((m, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 font-light">
                      <Check className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile / Tablet Vertical Timeline */}
        <div className="lg:hidden space-y-6">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.num}
                className="relative bg-[#0d121c] rounded-2xl p-6 border border-neutral-800 shadow-md"
              >
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-rose-500">
                      STAGE {step.num}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      {step.timeframe}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-rose-500">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white font-['Outfit',sans-serif]">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs text-neutral-400 font-light leading-relaxed">
                  {step.summary}
                </p>

                <div className="mt-4 pt-4 border-t border-neutral-800">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block mb-2 font-mono">
                    Key Milestones:
                  </span>
                  <ul className="space-y-2">
                    {step.milestones.map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-300 font-light">
                        <Check className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
