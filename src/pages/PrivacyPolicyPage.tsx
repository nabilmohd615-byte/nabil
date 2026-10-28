import React from 'react';
import { ShieldCheck, Lock, ArrowLeft, Mail, PhoneCall } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigateHome: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigateHome }) => {
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
        <span className="text-neutral-200">Privacy Policy</span>
      </nav>

      {/* Header */}
      <div className="mb-12 pb-6 border-b border-neutral-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-4 tracking-wider uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          Saudi PDPL & GDPR Compliant
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 font-display">
          Privacy Policy
        </h1>
        <p className="text-sm font-mono text-neutral-400">
          Last Updated: October 2025 // Effective for IVQIE Systems & Engineering Operations
        </p>
      </div>

      {/* Policy Content */}
      <div className="space-y-10 text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-3 font-display">1. Data Controller Identification</h2>
          <p>
            IVQIE ("we," "our," or "the Agency") operates as a specialized enterprise AI automation and systems engineering practice headquartered with operations in the Kingdom of Saudi Arabia and international engineering nodes. This Privacy Policy governs all personal data collected through our web applications, client discovery channels, WhatsApp Business integrations, and deployed enterprise software systems.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 font-display">2. Compliance with Saudi PDPL & International Standards</h2>
          <p>
            We strictly adhere to the Saudi Personal Data Protection Law (PDPL) enacted by Royal Decree No. M/19 and regulated by the Saudi Data and Artificial Intelligence Authority (SDAIA), alongside the General Data Protection Regulation (GDPR) for international enterprise partners.
          </p>
          <p className="mt-2">
            We operate under the fundamental principle of data minimization: we collect only information strictly necessary to scope, engineer, and maintain client automation infrastructure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 font-display">3. Zero Data Retention for Foundation Model Training</h2>
          <div className="p-4 rounded-xl bg-neutral-900 border-l-4 border-emerald-500 my-4 text-xs sm:text-sm text-neutral-200">
            <strong>Strict Guarantee:</strong> IVQIE enforces Zero-Data-Retention (ZDR) commercial agreements with all upstream LLM and cloud providers (including Google Cloud, Anthropic, and OpenAI). Under no circumstances are your proprietary business files, customer conversational logs, or operational database records ever retained or utilized to train public artificial intelligence models.
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 font-display">4. Categories of Data Collected</h2>
          <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm text-neutral-300">
            <li><strong>Inquiry & Lead Information:</strong> Full name, corporate email address, business telephone/WhatsApp number, organization name, and technical project specifications submitted via our discovery forms.</li>
            <li><strong>Technical Telemetry:</strong> Anonymized server logs, IP addresses, browser agent headers, and request timestamp metadata collected exclusively for system security, anti-DDoS, and spam protection.</li>
            <li><strong>Client Operational Data:</strong> Database credentials, API keys, and internal workflows provided during active engineering contracts are stored exclusively in isolated, customer-controlled cloud key vaults.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 font-display">5. Security Standards & Encryption</h2>
          <p>
            All information transmitted to IVQIE is encrypted in transit using Transport Layer Security (TLS 1.3) with HSTS enforcement. Data at rest is encrypted using AES-256 standard cryptographic suites. Access to production systems is governed by strict multi-factor authentication (MFA) and zero-trust network access controls.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 font-display">6. Your Rights Under Saudi PDPL & GDPR</h2>
          <p>Under applicable data protection frameworks, you maintain the following rights:</p>
          <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-neutral-300 mt-2">
            <li>Right to access and review your stored personal data.</li>
            <li>Right to request immediate correction or updating of inaccurate records.</li>
            <li>Right to request destruction/erasure of personal data ("Right to be Forgotten").</li>
            <li>Right to withdraw processing consent without retroactive penalty.</li>
          </ul>
        </section>

        <section className="pt-6 border-t border-neutral-800">
          <h2 className="text-xl font-bold text-white mb-3 font-display">7. Contact the Data Protection Officer</h2>
          <p className="text-xs sm:text-sm text-neutral-400 mb-4">
            For data inquiries, rights requests, or regulatory questions:
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 bg-neutral-900 px-3 py-2 rounded-lg border border-neutral-800 text-neutral-300">
              <Mail className="w-3.5 h-3.5 text-rose-400" />
              <span>privacy@ivqie.com</span>
            </div>
            <a
              href="https://wa.me/+966509850428"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 px-3 py-2 rounded-lg border border-neutral-800 text-emerald-400"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp DPO Office: +966 50 985 0428</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
