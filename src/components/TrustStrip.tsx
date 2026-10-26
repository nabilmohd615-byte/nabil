import React from 'react';
import { Workflow, Cpu, Database, BarChart3, Globe, Sparkles } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const tools = [
    { name: 'Make', category: 'Automation Engine', icon: Workflow },
    { name: 'n8n', category: 'Workflow Node Runner', icon: Cpu },
    { name: 'HubSpot', category: 'CRM & Pipeline', icon: Database },
    { name: 'Meta', category: 'Ads & Business Suite', icon: Globe },
    { name: 'Google Analytics', category: 'Measurement', icon: BarChart3 },
    { name: 'Google Ads', category: 'Search & Display', icon: BarChart3 },
    { name: 'OpenAI', category: 'Language Models & Agents', icon: Sparkles },
  ];

  return (
    <section className="relative border-y border-neutral-200/80 bg-white py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-xs font-bold tracking-widest uppercase text-neutral-500">
            BUILT AROUND THE TOOLS BUSINESSES USE
          </p>
        </div>

        {/* Clean, unpretentious tool grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-center justify-center">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.name}
                className="group flex flex-col items-center justify-center p-3.5 rounded-xl border border-neutral-100 bg-neutral-50/60 hover:bg-white hover:border-neutral-200 hover:shadow-2xs transition-all text-center"
              >
                <Icon className="w-5 h-5 text-neutral-600 group-hover:text-rose-600 transition-colors mb-1.5" />
                <span className="text-sm font-bold text-neutral-800 font-['Outfit',sans-serif]">
                  {tool.name}
                </span>
                <span className="text-[10px] text-neutral-600 truncate max-w-full">
                  {tool.category}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-[11px] text-neutral-500 max-w-2xl mx-auto">
          Technologies and developer APIs we integrate and configure to power custom business workflows. Not an endorsement or official partnership claim.
        </p>
      </div>
    </section>
  );
};
