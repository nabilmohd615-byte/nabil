import React, { useState } from 'react';
import { Shield, FileCheck, CheckCircle2, MessageSquare, Terminal, RefreshCw, Star, Info } from 'lucide-react';

export const ExpectationsSection: React.FC = () => {
  const [showTestimonialFramework, setShowTestimonialFramework] = useState(false);

  const expectations = [
    {
      num: '01',
      title: 'Clear Project Scope',
      desc: 'You receive an exact itemized statement of work before signing. No scope creep, no ambiguous deliverables, and no hidden line items.',
      icon: FileCheck,
    },
    {
      num: '02',
      title: 'Transparent Communication',
      desc: 'Regular milestone updates via dedicated channel, direct access to the builder, and prompt answers to questions.',
      icon: MessageSquare,
    },
    {
      num: '03',
      title: 'Documented Deliverables',
      desc: 'Every automation scenario, webhook endpoint, campaign structure, and asset guideline is accompanied by clear written documentation.',
      icon: Terminal,
    },
    {
      num: '04',
      title: 'Testing Before Launch',
      desc: 'All chatbot edge cases, lead syncs, form fallbacks, and tracking pixels are tested and validated in a staging environment prior to go-live.',
      icon: RefreshCw,
    },
    {
      num: '05',
      title: 'A Practical Handover Process',
      desc: 'We conduct a live walkthrough with your team, provide video recordings, and ensure your staff is comfortable operating the system.',
      icon: Shield,
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold tracking-widest uppercase text-rose-600">
            <span className="w-2 h-2 rounded-full bg-rose-600" />
            <span>OUR COMMITMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight font-['Outfit',sans-serif]">
            Built on Clear Communication and Practical Solutions.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            We operate with complete honesty. Rather than presenting unverified customer testimonials, here is the exact operational standard you can count on when partnering with IVQIE.
          </p>
        </div>

        {/* What You Can Expect Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expectations.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="bg-neutral-50/70 rounded-2xl p-6 border border-neutral-200/90 hover:border-neutral-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200/70">
                    <span className="text-xs font-mono font-bold text-rose-600">
                      STANDARD {item.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-700">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 font-['Outfit',sans-serif]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-200/60 flex items-center gap-1.5 text-[11px] text-rose-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Guaranteed in every contract</span>
                </div>
              </div>
            );
          })}

          {/* Testimonial Placeholder & Transparency Box */}
          <div className="bg-neutral-900 text-white rounded-2xl p-6 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
                <span className="text-xs font-mono font-bold text-rose-400">
                  VERIFIED CLIENT FEEDBACK
                </span>
                <Info className="w-4 h-4 text-neutral-400" />
              </div>

              <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                Client Reviews Protocol
              </h3>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed">
                As a matter of international integrity, IVQIE publishes reviews only when authenticated by corporate client sign-off.
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-neutral-800">
              <button
                onClick={() => setShowTestimonialFramework(!showTestimonialFramework)}
                className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors text-center cursor-pointer"
              >
                {showTestimonialFramework ? 'Hide Verification Protocol' : 'View Verification Protocol'}
              </button>
            </div>
          </div>
        </div>

        {/* Verification Protocol Collapsible */}
        {showTestimonialFramework && (
          <div className="mt-8 p-6 bg-neutral-100/80 rounded-2xl border border-neutral-200 text-xs text-neutral-700">
            <h4 className="font-bold text-sm text-neutral-900 mb-2 font-['Outfit',sans-serif]">
              Testimonial Authentication Protocol
            </h4>
            <p className="leading-relaxed text-neutral-600 mb-4">
              All future case studies and reviews on this platform adhere to the following 3-step proof process:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3.5 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-900 block mb-1">1. Verified Identity</span>
                <span className="text-neutral-600">Company registration, direct contact person, and authenticated LinkedIn profile.</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-900 block mb-1">2. Concrete Baseline vs. Outcome</span>
                <span className="text-neutral-600">Audited starting problem, exact solution built, and real metrics achieved.</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-900 block mb-1">3. Written Release Approval</span>
                <span className="text-neutral-600">Explicit client permission to display logos, scope summaries, and quotes.</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
