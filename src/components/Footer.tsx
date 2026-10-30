import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Mail, Globe, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-12 border-t border-neutral-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <BrandLogo size="md" />
              <p className="mt-4 text-xs text-neutral-400 leading-relaxed max-w-sm">
                IVQIE designs and builds intelligent AI automation systems, performance digital marketing funnels, and business-focused social media engines for global enterprises and ambitious startups.
              </p>
              
              <div className="mt-6 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-neutral-300">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <a
                    href="https://wa.me/+966509850428"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors font-medium"
                  >
                    WhatsApp: +966 50 985 0428
                  </a>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Mail className="w-3.5 h-3.5 text-rose-500" />
                  <a
                    href="mailto:mnnabil170@gmail.com"
                    className="hover:text-white transition-colors underline underline-offset-4"
                  >
                    mnnabil170@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Globe className="w-3.5 h-3.5 text-violet-400" />
                  <span>Saudi Arabia · Bangladesh · Global Client Base</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-[11px] text-neutral-500">
              Tagline: <span className="text-neutral-400">Automate Smarter. Market Better. Grow Faster.</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4 font-mono">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', path: '/' },
                { label: 'Services Catalog', path: '/services' },
                { label: 'Industry Solutions', path: '/solutions' },
                { label: 'Portfolio', path: '/portfolio' },
                { label: 'About Agency', path: '/about' },
                { label: 'Contact & Scoping', path: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => onNavigate(item.path)}
                    className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: AI Automation Disciplines */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4 font-mono">
              AI Disciplines
            </h4>
            <ul className="space-y-2 text-neutral-400">
              {[
                { label: 'Autonomous AI Agents', path: '/services/ai-agents' },
                { label: 'Enterprise Workflow Automation', path: '/services/workflow-automation' },
                { label: 'Conversational AI & WhatsApp', path: '/services/conversational-ai' },
                { label: 'CRM & Pipeline Automation', path: '/services/crm-automation' },
                { label: 'Ultra-Low Latency Voice AI', path: '/services/ai-voice-assistants' },
                { label: 'Custom AI Models & Vision', path: '/services/custom-ai-integrations' },
              ].map((svc) => (
                <li key={svc.path}>
                  <button
                    onClick={() => onNavigate(svc.path)}
                    className="hover:text-rose-400 transition-colors text-left"
                  >
                    {svc.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Industry Solutions */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4 font-mono">
              Industry Solutions
            </h4>
            <ul className="space-y-2 text-neutral-400">
              {[
                { label: 'Healthcare & Specialized Clinics', path: '/solutions' },
                { label: 'FinTech & Wealth Management', path: '/solutions' },
                { label: 'D2C E-Commerce & Retail', path: '/solutions' },
                { label: 'Logistics, Freight & Customs', path: '/solutions' },
                { label: 'Real Estate & Property Development', path: '/solutions' },
                { label: 'Professional Services & Advisory', path: '/solutions' },
              ].map((sol) => (
                <li key={sol.label}>
                  <button
                    onClick={() => onNavigate(sol.path)}
                    className="hover:text-cyan-400 transition-colors text-left"
                  >
                    {sol.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500">
              Regulatory compliance: Saudi PDPL, SAMA, ZATCA Phase 2, SOC 2 Type II ready.
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {currentYear} IVQIE. All rights reserved. Intelligent systems. Creative marketing. Measurable progress.
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => onNavigate('/privacy-policy')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate('/terms')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={onOpenAdmin}
              className="text-neutral-600 hover:text-neutral-400 transition-colors cursor-pointer font-mono"
            >
              Admin
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
