import React from 'react';
import { BrandLogo } from './BrandLogo';
import { ArrowUpRight, Mail, Globe, Shield, Lock, MessageCircle } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms') => void;
  onSelectService: (serviceName: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onSelectService, onOpenAdmin }) => {
  const currentYear = new Date().getFullYear();

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
                { label: 'Home', href: '#home' },
                { label: 'Services', href: '#services' },
                { label: 'Our Work', href: '#work' },
                { label: 'Process', href: '#process' },
                { label: 'Why IVQIE', href: '#why-us' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScroll(item.href);
                    }}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: AI Automation Capabilities */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4 font-mono">
              AI Automation
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => onSelectService('AI Automation & Intelligent Agents')}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  AI Chatbot Systems
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('AI Automation & Intelligent Agents')}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  CRM Lead Qualification
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('AI Automation & Intelligent Agents')}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  Inbox &amp; Message Routing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('AI Automation & Intelligent Agents')}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  Workflow Orchestration
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Digital Marketing & Social */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4 font-mono">
              Marketing &amp; Social
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] font-semibold text-neutral-300 block mb-2">Digital Strategy</span>
                <ul className="space-y-1.5 text-neutral-400">
                  <li>Meta &amp; Google Ads</li>
                  <li>Funnel Architecture</li>
                  <li>Tracking &amp; GA4 Setup</li>
                  <li>Landing Page Tuning</li>
                </ul>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-neutral-300 block mb-2">Social Growth</span>
                <ul className="space-y-1.5 text-neutral-400">
                  <li>Content Calendars</li>
                  <li>Creative Direction</li>
                  <li>Short-Form Planning</li>
                  <li>Community Triage</li>
                </ul>
              </div>
            </div>

            {/* Configured Destinations Note */}
            <div className="mt-5 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500">
              Official Social Profiles: In active rollout. Dedicated client communication channels provided upon proposal acceptance.
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
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-rose-400 transition-colors cursor-pointer font-mono text-[11px]"
              title="Restricted Administrator Portal"
            >
              <Lock className="w-3 h-3 text-neutral-500 hover:text-rose-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
