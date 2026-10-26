import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0F1420] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-800 text-white max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-500">
            {type === 'privacy' ? <Shield className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            <span>IVQIE LEGAL · {type === 'privacy' ? 'PRIVACY POLICY' : 'TERMS OF SERVICE'}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {type === 'privacy' ? (
          <div className="mt-4 space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <h3 className="text-xl font-bold text-white font-['Outfit',sans-serif]">
              Privacy &amp; Data Protection Policy
            </h3>
            <p className="text-neutral-400">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
            <h4 className="font-bold text-white text-sm">1. Information We Collect</h4>
            <p>
              When you submit a consultation brief or contact IVQIE, we collect your name, business email, company details, and project objectives. This data is used solely to assess technical feasibility and respond with a tailored proposal.
            </p>
            <h4 className="font-bold text-white text-sm">2. System &amp; API Credentials</h4>
            <p>
              During automation buildouts, any client API tokens, webhook endpoints, and CRM keys are stored within client-controlled environments whenever feasible or encrypted using industry standard protocols. We never sell, share, or broker client data.
            </p>
            <h4 className="font-bold text-white text-sm">3. Contact</h4>
            <p>
              For privacy inquiries, contact our data coordinator directly at <strong className="text-rose-400">mnnabil170@gmail.com</strong>.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <h3 className="text-xl font-bold text-white font-['Outfit',sans-serif]">
              Terms of Service &amp; Project Engagements
            </h3>
            <p className="text-neutral-400">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
            <h4 className="font-bold text-white text-sm">1. Engagement &amp; Scope of Work</h4>
            <p>
              All IVQIE services are executed according to a mutually agreed, written Statement of Work (SOW). No automated systems or advertising campaigns are deployed without client review and sign-off.
            </p>
            <h4 className="font-bold text-white text-sm">2. No Guaranteed Results</h4>
            <p>
              Consistent with responsible professional practice, IVQIE makes no guarantees regarding exact follower growth, ad conversion multipliers, or specific sales figures. We commit to proven architectural methodologies, transparent metrics tracking, and data-backed iteration.
            </p>
            <h4 className="font-bold text-white text-sm">3. Intellectual Property Handover</h4>
            <p>
              Upon receipt of final payment, custom-engineered automation workflows, webhook logic, and custom creative assets are transferred to the client.
            </p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg border border-neutral-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
