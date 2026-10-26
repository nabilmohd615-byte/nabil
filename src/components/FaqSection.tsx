import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: 'What services does IVQIE provide?',
      a: 'IVQIE focuses on AI automation, intelligent business workflows, digital marketing, and social media marketing.',
    },
    {
      q: 'Can you automate our customer inquiries?',
      a: 'We can assess your current channels and design suitable chatbot, lead-routing, FAQ, or follow-up workflows based on the available platforms and requirements.',
    },
    {
      q: 'Do you work with small businesses?',
      a: 'Yes. Solutions can be scoped around a business’s needs, available tools, and budget.',
    },
    {
      q: 'Can you manage Facebook and Instagram marketing?',
      a: 'Services may include page optimization, content planning, creative support, campaign setup, and social media management, depending on the agreed scope.',
    },
    {
      q: 'Do you guarantee marketing results?',
      a: 'No responsible agency can guarantee specific results. We define objectives, monitor agreed metrics, and use data to guide improvements.',
    },
    {
      q: 'How much do your services cost?',
      a: 'Pricing depends on project complexity, deliverables, integrations, and ongoing support. We provide a tailored proposal after understanding the requirements.',
    },
    {
      q: 'How do we get started?',
      a: 'Book a strategy call or send a project inquiry with your goals, current challenges, and preferred timeline.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#FAFAFA] border-t border-neutral-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-bold tracking-widest uppercase text-rose-600">
            <span className="w-2 h-2 rounded-full bg-rose-600" />
            <span>CLARITY &amp; ANSWERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-['Outfit',sans-serif]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            Clear, straightforward answers about how we collaborate, scope projects, and deliver results.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? 'bg-white border-neutral-300 shadow-xs'
                    : 'bg-white/80 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-2xl cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-neutral-900 font-['Outfit',sans-serif]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-rose-50 text-rose-600 rotate-180' : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-neutral-100 mt-1">
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed pt-3">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center text-xs text-neutral-500">
          Have a specific operational question not covered here?{' '}
          <a
            href="#contact"
            className="text-rose-600 font-semibold hover:underline underline-offset-4"
          >
            Inquire directly with our team →
          </a>
        </div>

      </div>
    </section>
  );
};
