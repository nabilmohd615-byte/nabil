import React, { useState } from 'react';
import { Compass, Lightbulb, Code2, Rocket, Check, ArrowRight } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      title: 'Discover',
      summary: 'Understand business goals, bottlenecks, audience, and requirements.',
      desc: 'We conduct a targeted audit of your current customer touchpoints, manual operations, and marketing assets to locate high-friction drop-offs.',
      milestones: [
        'Discovery conversation & operational intake',
        'Current tools & workflow bottleneck assessment',
        'Target audience & market focus clarification',
        'Technical feasibility and scope constraints review',
      ],
      icon: Compass,
      timeframe: 'Days 1–3',
    },
    {
      num: '02',
      title: 'Strategize',
      summary: 'Define the scope, recommended solution, timeline, and deliverables.',
      desc: 'You receive an exact architectural blueprint detailing tools, triggers, data formats, milestones, and success criteria before any development starts.',
      milestones: [
        'Architecture blueprint and toolstack recommendation',
        'Concrete deliverable matrix & timeline agreement',
        'Funnel & messaging framework sign-off',
        'Transparent fixed scope with no hidden extras',
      ],
      icon: Lightbulb,
      timeframe: 'Days 4–7',
    },
    {
      num: '03',
      title: 'Build & Test',
      summary: 'Implement the workflow or campaign, test important scenarios, and refine the experience.',
      desc: 'We build pipelines, connect webhooks, design campaign creative, and rigorously test edge cases to guarantee reliability before real traffic hits.',
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

  return (
    <section id="process" className="py-24 bg-white border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold tracking-widest uppercase text-rose-600">
            <span className="w-2 h-2 rounded-full bg-rose-600" />
            <span>HOW WE WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight font-['Outfit',sans-serif]">
            From First Conversation to a Working System.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            A disciplined, four-stage implementation methodology designed to eliminate surprises, protect timelines, and ensure predictable outcomes.
          </p>
        </div>

        {/* Desktop Connected Steps */}
        <div className="hidden lg:grid grid-cols-4 gap-6 relative">
          {/* Connecting Line across steps */}
          <div className="absolute top-12 left-10 right-10 h-0.5 bg-neutral-200 -z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`relative z-10 cursor-pointer flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 ${
                  isSelected
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-xl -translate-y-1'
                    : 'bg-white text-neutral-900 border-neutral-200/90 hover:border-neutral-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-xs font-mono font-bold tracking-wider ${
                        isSelected ? 'text-rose-400' : 'text-rose-600'
                      }`}
                    >
                      {step.num}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-neutral-800 text-white'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3
                    className={`text-xl font-bold font-['Outfit',sans-serif] ${
                      isSelected ? 'text-white' : 'text-neutral-900'
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`mt-2 text-xs leading-relaxed ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-600'
                    }`}
                  >
                    {step.summary}
                  </p>
                </div>

                <div
                  className={`mt-6 pt-4 border-t text-[11px] font-medium flex items-center justify-between ${
                    isSelected
                      ? 'border-neutral-800 text-neutral-400'
                      : 'border-neutral-100 text-neutral-600'
                  }`}
                >
                  <span>{step.timeframe}</span>
                  <span className={isSelected ? 'text-rose-400' : 'text-rose-600'}>
                    {isSelected ? 'Active' : 'Click to inspect'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Step Deep Dive (Desktop) */}
        <div className="hidden lg:block mt-8 p-6 bg-neutral-50 rounded-2xl border border-neutral-200/80">
          <div className="flex items-start justify-between gap-8">
            <div className="max-w-lg">
              <span className="text-xs font-mono font-bold text-rose-600 uppercase">
                Stage {steps[activeStep].num} Deep Dive
              </span>
              <h4 className="text-xl font-bold text-neutral-900 mt-1 font-['Outfit',sans-serif]">
                {steps[activeStep].title}: Detailed Implementation Protocol
              </h4>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                {steps[activeStep].desc}
              </p>
            </div>

            <div className="flex-1 bg-white p-5 rounded-xl border border-neutral-200">
              <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-3">
                Included Deliverables &amp; Milestones
              </h5>
              <div className="grid grid-cols-2 gap-2.5">
                {steps[activeStep].milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                    <Check className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline */}
        <div className="lg:hidden space-y-6">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.num}
                className="relative bg-neutral-50 rounded-2xl p-6 border border-neutral-200"
              >
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200/80">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-rose-600">
                      STEP {step.num}
                    </span>
                    <span className="text-xs text-neutral-600 font-medium">
                      {step.timeframe}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-rose-600">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 font-['Outfit',sans-serif]">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                  {step.summary}
                </p>

                <div className="mt-4 pt-4 border-t border-neutral-200/80">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
                    Key Milestones:
                  </span>
                  <ul className="space-y-1.5">
                    {step.milestones.map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                        <Check className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
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
