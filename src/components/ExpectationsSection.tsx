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
    <section className="py-24 bg-[#0D111A] border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold tracking-widest uppercase text-rose-500">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>OUR COMMITMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
            Built on Clear Communication and Practical Solutions.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
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
                className="bg-[#0F1420] rounded-2xl p-6 border border-neutral-800 hover:border-neutral-700 hover:bg-[#131929] hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
                    <span className="text-xs font-mono font-bold text-rose-500">
                      STANDARD {item.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-800 flex items-center gap-1.5 text-[11px] text-rose-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>Guaranteed in every contract</span>
                </div>
              </div>
            );
          })}

          {/* Testimonial Placeholder & Transparency Box */}
          <div className="bg-[#151C2C] text-white rounded-2xl p-6 border border-neutral-800 flex flex-col justify-between">
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
                className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/60 transition-colors text-center cursor-pointer"
              >
                {showTestimonialFramework ? 'Hide Verification Protocol' : 'View Verification Protocol'}
              </button>
            </div>
          </div>
        </div>

        {/* Verification Protocol Collapsible */}
        {showTestimonialFramework && (
          <div className="mt-8 p-6 bg-[#0F1420] rounded-2xl border border-neutral-800 text-xs text-neutral-300">
            <h4 className="font-bold text-sm text-white mb-2 font-['Outfit',sans-serif]">
              Testimonial Authentication Protocol
            </h4>
            <p className="leading-relaxed text-neutral-400 mb-4">
              All future case studies and reviews on this platform adhere to the following 3-step proof process:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-neutral-900/90 p-3.5 rounded-xl border border-neutral-800">
                <span className="font-bold text-white block mb-1">1. Verified Identity</span>
                <span className="text-neutral-400">Company registration, direct contact person, and authenticated LinkedIn profile.</span>
              </div>
              <div className="bg-neutral-900/90 p-3.5 rounded-xl border border-neutral-800">
                <span className="font-bold text-white block mb-1">2. Concrete Baseline vs. Outcome</span>
                <span className="text-neutral-400">Audited starting problem, exact solution built, and real metrics achieved.</span>
              </div>
              <div className="bg-neutral-900/90 p-3.5 rounded-xl border border-neutral-800">
                <span className="font-bold text-white block mb-1">3. Written Release Approval</span>
                <span className="text-neutral-400">Explicit client permission to display logos, scope summaries, and quotes.</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
