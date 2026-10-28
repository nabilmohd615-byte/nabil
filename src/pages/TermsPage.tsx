import React from 'react';
import { Scale, ArrowLeft, ShieldCheck, Mail, PhoneCall } from 'lucide-react';

interface TermsPageProps {
  onNavigateHome: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="pt-28 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button
          onClick={onNavigateHome}
          className="hover:text-rose-400 transition-colors focus:outline-none focus-visible:underline"
        >
          IVQIE
        </button>
        <span>/</span>
        <span className="text-neutral-200">Terms of Service</span>
      </nav>

      {/* Header */}
      <div className="mb-12 pb-6 border-b border-neutral-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-mono mb-4 tracking-wider uppercase">
          <Scale className="w-3.5 h-3.5" />
          Enterprise Contractual Standards
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 font-display">
          Terms of Service & Engagement
        </h1>
        <p className="text-sm font-mono text-neutral-400">
          Last Updated: October 2025 // Standard Commercial Agreement for IVQIE Engineering Deployments
        </p>
      </div>

      {/* Terms Content */}
      <div className="space-y-10 text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-3 font-display">1. Engagement Overview</h2>
          <p>
            These Terms of Service ("Agreement") govern all software engineering, artificial intelligence system design, workflow automation, and technical advisory services delivered by IVQIE ("the Agency") to commercial clients ("the Client"). By submitting an inquiry brief, signing a Statement of Work (SOW), or deploying software provided by IVQIE, the Client agrees to be bound by these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 font-display">2. Intellectual Property & Code Ownership</h2>
          <div className="p-4 rounded-xl bg-neutral-900 border-l-4 border-rose-500 my-4 text-xs sm:text-sm text-neutral-200">
            <strong>Full IP Transfer:</strong> Upon receipt of full payment for contracted milestones, IVQIE grants and assigns to the Client 100% of the proprietary rights, title, copyright, and intellectual property in all custom software, bespoke model fine-tuning weights, workflow scripts, and system architectures authored specifically for the Client. IVQIE retains no backdoors or licensing royalties.
          </div>
          <p className="text-xs sm:text-sm text-neutral-400">
            IVQIE retains rights only to its pre-existing general scaffolding libraries and open-source foundation templates utilized to accelerate development.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 font-display">3. 90-Day Production SLA Warranty</h2>
          <p>
            Every custom system deployment shipped by IVQIE is accompanied by a non-cancelable 90-day comprehensive engineering warranty. During this 90-day period:
          </p>
          <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-neutral-300 mt-2">
            <li>IVQIE patches and resolves any software defects, runtime errors, or connector failures at zero additional fee.</li>
            <li>Our team recalibrates model prompt parameters if unexpected edge-case hallucinations occur.</li>
            <li>Critical system outage tickets receive response coverage within 2 business hours.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 font-display">4. Third-Party Services & API Accounts</h2>
          <p>
            The Client maintains direct commercial ownership of their respective cloud accounts (AWS, Google Cloud, Meta Developer, OpenAI, Anthropic, Twilio, HubSpot, etc.). The Client is directly responsible for third-party consumption fees incurred through API calls or cloud hosting. IVQIE implements token-cost throttles and monitoring alerts to prevent unintended billing overruns.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 font-display">5. Confidentiality & Non-Disclosure</h2>
          <p>
            Both parties agree that all proprietary business data, system credentials, trade secrets, customer records, and architectural schematics shared during discovery or active sprints remain strictly confidential. Non-disclosure obligations survive indefinitely beyond the termination of any individual engagement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 font-display">6. Limitation of Liability</h2>
          <p>
            Except in instances of gross negligence or willful misconduct, neither party shall be liable for indirect, incidental, or consequential damages resulting from upstream third-party API disruptions (e.g. Meta WhatsApp global outages or AWS network failures). IVQIE's aggregate liability under any Statement of Work is capped at the total professional fees paid by Client under that specific SOW.
          </p>
        </section>

        <section className="pt-6 border-t border-neutral-800">
          <h2 className="text-xl font-bold text-white mb-3 font-display">7. Governing Law & Dispute Resolution</h2>
          <p className="text-xs sm:text-sm text-neutral-400 mb-4">
            These terms and subsequent Statements of Work are governed by and construed in accordance with the laws and commercial regulations of the Kingdom of Saudi Arabia, with arbitration handled via the Saudi Center for Commercial Arbitration (SCCA), or in an agreed international commercial arbitration forum for foreign entities.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 bg-neutral-900 px-3 py-2 rounded-lg border border-neutral-800 text-neutral-300">
              <Mail className="w-3.5 h-3.5 text-rose-400" />
              <span>legal@ivqie.com</span>
            </div>
            <a
              href="https://wa.me/+966509850428"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 px-3 py-2 rounded-lg border border-neutral-800 text-emerald-400"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Executive Office: +966 50 985 0428</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
