import React, { useState } from 'react';
import { Cpu, TrendingUp, Share2, ArrowRight, Check, X, Layers, Clock, ShieldCheck } from 'lucide-react';

interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  description: string;
  items: string[];
  ctaLabel: string;
  icon: typeof Cpu;
  accent: string;
  summary: string;
}

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceDetail | null>(null);

  const services: ServiceDetail[] = [
    {
      id: 'ai-automation',
      number: '01',
      title: 'AI Automation & Intelligent Agents',
      description: 'Reduce manual work and connect your business tools with intelligent, practical automation.',
      summary: 'Custom operational pipelines that connect messaging inboxes, CRMs, and decision logic.',
      icon: Cpu,
      accent: 'rose',
      ctaLabel: 'Explore AI Automation',
      items: [
        'AI chatbot and customer-support workflows.',
        'Website, Messenger, and social inbox automation.',
        'Lead capture, qualification, and routing.',
        'CRM and spreadsheet integrations.',
        'Appointment booking and follow-up workflows.',
        'AI-assisted email and business communication.',
        'Repetitive task and workflow automation.',
        'AI agent prototypes and integrations.',
      ],
    },
    {
      id: 'digital-marketing',
      number: '02',
      title: 'Digital Marketing & Performance',
      description: 'Build a clearer digital strategy that connects the right audience with the right offer.',
      summary: 'Data-driven customer acquisition engines built around tested messaging and clear funnel stages.',
      icon: TrendingUp,
      accent: 'neutral',
      ctaLabel: 'Explore Digital Marketing',
      items: [
        'Digital marketing strategy.',
        'Marketing funnel planning.',
        'Meta Ads campaign setup and management.',
        'Google Ads support.',
        'Lead-generation campaigns.',
        'Landing-page and conversion-flow improvements.',
        'SEO fundamentals and content strategy.',
        'Analytics, tracking, and campaign reporting.',
      ],
    },
    {
      id: 'social-media',
      number: '03',
      title: 'Social Media Marketing & AI Video Editing',
      description: 'Turn your social channels into consistent, high-converting brand engines with AI-generated video production, viral short-form editing, and full-spectrum channel management.',
      summary: 'AI text-to-video creation, high-retention Reels/Shorts editing, editorial planning, and community inbox workflows.',
      icon: Share2,
      accent: 'violet',
      ctaLabel: 'Explore Social & AI Video',
      items: [
        'AI-powered video generation & text-to-video creative workflows.',
        'High-retention short-form video editing (Reels, TikTok, YouTube Shorts).',
        'AI avatars, synthetic voiceovers & multilingual video dubbing (EN/AR).',
        'Viral hooks, dynamic kinetic captions & bespoke sound design.',
        'Long-form video repurposing into high-engagement short clips.',
        'Facebook and Instagram page setup and optimization.',
        'Social media strategy and content calendars.',
        'Creative direction, thumbnails and social graphic design.',
        'Community management, inbox automation and campaign optimization.',
      ],
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#0B0F17] relative text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold tracking-widest uppercase text-rose-500">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>WHAT WE DO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
            Three Capabilities. One Growth Partner.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            “We connect intelligent automation, digital strategy, and social media execution to help businesses operate more efficiently and communicate more effectively.”
          </p>
        </div>

        {/* 3 Premium Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            const isRose = service.accent === 'rose';
            const isViolet = service.accent === 'violet';

            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between bg-[#0F1420] rounded-2xl p-7 border border-neutral-800 hover:border-neutral-700 hover:bg-[#131929] hover:shadow-2xl transition-all duration-300"
              >
                <div>
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-800">
                    <span className="text-xs font-mono font-bold tracking-wider text-neutral-400">
                      SERVICE {service.number}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isRose
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:bg-rose-600 group-hover:text-white'
                          : isViolet
                          ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20 group-hover:bg-violet-600 group-hover:text-white'
                          : 'bg-neutral-800 text-neutral-300 border border-neutral-700 group-hover:bg-neutral-700 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit',sans-serif] group-hover:text-rose-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Itemized Deliverables */}
                  <div className="mt-6 pt-5 border-t border-neutral-800">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                      Core Scope &amp; Deliverables
                    </h4>
                    <ul className="space-y-2.5">
                      {service.items.slice(0, 5).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                    {service.items.length > 5 && (
                      <p className="mt-3 text-[11px] font-medium text-neutral-400">
                        + {service.items.length - 5} additional integration workflows
                      </p>
                    )}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-5 border-t border-neutral-800">
                  <button
                    onClick={() => setSelectedServiceModal(service)}
                    className="w-full inline-flex items-center justify-between py-2.5 px-4 text-xs font-semibold text-neutral-200 bg-neutral-900 hover:bg-rose-600 hover:text-white rounded-xl border border-neutral-800 hover:border-rose-600 transition-all cursor-pointer group/btn"
                  >
                    <span>{service.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ethical commitment footer */}
        <div className="mt-12 p-4 rounded-xl bg-[#0F1420] border border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0" />
            <span>
              <strong className="text-white">Responsible Scope:</strong> We focus on quantifiable operational improvements and verified workflows. No artificial guarantees or vanity follower inflation.
            </span>
          </div>
          <button
            onClick={() => onSelectService('Full-Stack Growth & Automation')}
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 underline underline-offset-4 cursor-pointer"
          >
            Need a combined solution? Request a custom scope →
          </button>
        </div>

      </div>

      {/* Detailed Modal for deep-dive into Service Scope */}
      {selectedServiceModal && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedServiceModal(null)}
        >
          <div
            className="bg-neutral-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-800 max-h-[90vh] overflow-y-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400">
                <span>SERVICE {selectedServiceModal.number}</span>
                <span>·</span>
                <span className="text-neutral-400 font-sans uppercase">Comprehensive Scope</span>
              </div>
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-2xl font-extrabold text-white font-['Outfit',sans-serif]">
                {selectedServiceModal.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                {selectedServiceModal.description}
              </p>
            </div>

            <div className="mt-6 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
              <h4 className="text-xs font-bold tracking-wider uppercase text-neutral-300 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-rose-500" />
                All Included Modules &amp; Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedServiceModal.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-800">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>Typical initial sprint: 2–3 weeks</span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setSelectedServiceModal(null);
                    onSelectService(selectedServiceModal.title);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors cursor-pointer"
                >
                  Inquire For This Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
