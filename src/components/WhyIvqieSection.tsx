import React from 'react';
import { Target, Compass, Network, MessageSquareQuote } from 'lucide-react';

export const WhyIvqieSection: React.FC = () => {
  const principles = [
    {
      number: '01',
      title: 'Automation With Purpose',
      description: 'Every workflow should solve a real operational problem. We do not automate for novelty; we automate to eliminate bottlenecks, cut manual delay, and free human teams for high-value strategic work.',
      icon: Target,
      highlight: 'Problem-First Engineering',
    },
    {
      number: '02',
      title: 'Strategy Before Tools',
      description: 'Choose technology according to business needs, not hype. An unnecessary enterprise stack costs more than it saves. We select the leanest, most reliable toolset that fits your existing workflow and budget.',
      icon: Compass,
      highlight: 'Pragmatic Architecture',
    },
    {
      number: '03',
      title: 'Connected Growth',
      description: 'Align automation, marketing, and social media around shared goals. Inbound marketing shouldn’t dump raw leads into an empty inbox; it should funnel directly into qualified CRM pipelines and timely follow-ups.',
      icon: Network,
      highlight: 'Unified Ecosystem',
    },
    {
      number: '04',
      title: 'Clear Communication',
      description: 'Set expectations, document workflows, and communicate progress honestly. We provide documented schemas, verified testing reports, and straightforward project roadmaps at every phase.',
      icon: MessageSquareQuote,
      highlight: 'Honest Accountability',
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-[#0B0F17] border-t border-neutral-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold tracking-widest uppercase text-rose-500">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>WHY WORK WITH US</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
            Technology Should Make Business Simpler.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            We avoid buzzword overload and unmaintainable complexity. Our operating principles focus on delivering systems that are transparent, resilient, and directly aligned with your commercial objectives.
          </p>
        </div>

        {/* 4 Principles Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <div
                key={principle.number}
                className="group relative bg-[#0F1420] rounded-2xl p-8 border border-neutral-800 hover:border-neutral-700 hover:bg-[#131929] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-800">
                    <span className="text-xs font-mono font-bold text-rose-500">
                      PRINCIPLE {principle.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 group-hover:bg-rose-950/50 text-neutral-300 group-hover:text-rose-400 flex items-center justify-center transition-colors border border-neutral-800">
                      <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit',sans-serif]">
                    {principle.title}
                  </h3>

                  <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-rose-400/90 font-mono">
                    {principle.highlight}
                  </div>

                  <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
                    {principle.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center gap-2 text-xs text-neutral-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>Integrated standard in every client engagement</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
