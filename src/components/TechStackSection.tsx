import React, { useState } from 'react';
import { Workflow, Sparkles, Database, Share2, BarChart2, Palette, CheckCircle2, Search } from 'lucide-react';

interface TechCategory {
  id: string;
  name: string;
  icon: typeof Workflow;
  tools: {
    name: string;
    status: 'Core Implementation Stack' | 'Integration Candidate' | 'Exploratory Integration';
    purpose: string;
  }[];
}

export const TechStackSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: TechCategory[] = [
    {
      id: 'automation',
      name: 'Automation',
      icon: Workflow,
      tools: [
        { name: 'Make (Integromat)', status: 'Core Implementation Stack', purpose: 'Multi-step visual workflow routing & data mapping' },
        { name: 'n8n', status: 'Core Implementation Stack', purpose: 'Self-hosted privacy-conscious node orchestration' },
        { name: 'REST Webhooks & APIs', status: 'Core Implementation Stack', purpose: 'Direct low-latency event synchronization' },
        { name: 'Custom Scripts (Node.js/Python)', status: 'Integration Candidate', purpose: 'Custom data normalization & transformation' },
      ],
    },
    {
      id: 'ai',
      name: 'AI & Language Models',
      icon: Sparkles,
      tools: [
        { name: 'OpenAI API (GPT-4o)', status: 'Core Implementation Stack', purpose: 'Semantic text parsing, categorization & intent scoring' },
        { name: 'Claude & Gemini API', status: 'Integration Candidate', purpose: 'Multimodal document processing & context evaluation' },
        { name: 'Custom Vector Storage', status: 'Exploratory Integration', purpose: 'Domain-specific knowledge retrieval for customer support' },
      ],
    },
    {
      id: 'crm',
      name: 'CRM & Data',
      icon: Database,
      tools: [
        { name: 'HubSpot CRM', status: 'Core Implementation Stack', purpose: 'Lead pipeline stages, contact properties & sales routing' },
        { name: 'Google Sheets / Airtable', status: 'Core Implementation Stack', purpose: 'Lightweight operational databases & rapid tracking' },
        { name: 'PostgreSQL / Supabase', status: 'Integration Candidate', purpose: 'Structured custom relational records' },
      ],
    },
    {
      id: 'social',
      name: 'Social Media',
      icon: Share2,
      tools: [
        { name: 'Meta Business Suite', status: 'Core Implementation Stack', purpose: 'Centralized page management, asset libraries & roles' },
        { name: 'Facebook & Instagram APIs', status: 'Core Implementation Stack', purpose: 'Approved messaging automations & comment routing' },
        { name: 'LinkedIn Company Pages', status: 'Integration Candidate', purpose: 'B2B executive presence & article publishing' },
      ],
    },
    {
      id: 'marketing',
      name: 'Marketing & Analytics',
      icon: BarChart2,
      tools: [
        { name: 'Google Analytics 4 (GA4)', status: 'Core Implementation Stack', purpose: 'Event tracking, attribution & funnel conversion analysis' },
        { name: 'Google Ads Manager', status: 'Core Implementation Stack', purpose: 'High-intent search keyword campaigns & conversion bidding' },
        { name: 'Meta Ads Manager', status: 'Core Implementation Stack', purpose: 'Audience testing, lookalikes & creative testing' },
      ],
    },
    {
      id: 'creative',
      name: 'Creative & Content',
      icon: Palette,
      tools: [
        { name: 'Canva Pro & Figma', status: 'Core Implementation Stack', purpose: 'High-volume social templates, carousels & video storyboards' },
        { name: 'CapCut / Premiere Pro', status: 'Integration Candidate', purpose: 'Short-form Reels & TikTok narrative editing' },
      ],
    },
  ];

  const allTools = categories.flatMap((c) =>
    c.tools.map((t) => ({ ...t, categoryName: c.name }))
  );

  const displayedTools = selectedCategory === 'all'
    ? allTools
    : categories
        .find((c) => c.id === selectedCategory)
        ?.tools.map((t) => ({ ...t, categoryName: categories.find((c) => c.id === selectedCategory)!.name })) || [];

  return (
    <section className="py-24 bg-[#0B0F17] border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold tracking-widest uppercase text-rose-500">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>INFRASTRUCTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
            The Right Tools for the Right Job.
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed font-normal">
            We deliberately deploy battle-tested tools with high uptime, comprehensive documentation, and secure API boundaries.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-neutral-900/90 rounded-xl border border-neutral-800 w-fit">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-neutral-800 text-white shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-neutral-800 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedTools.map((tool, idx) => {
            const isCore = tool.status === 'Core Implementation Stack';
            const isCandidate = tool.status === 'Integration Candidate';

            return (
              <div
                key={idx}
                className="bg-[#0F1420] rounded-xl p-5 border border-neutral-800 hover:border-neutral-700 hover:bg-[#131929] hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800">
                    <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                      {tool.categoryName}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded ${
                        isCore
                          ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/60'
                          : isCandidate
                          ? 'bg-blue-950/70 text-blue-400 border border-blue-800/60'
                          : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                      }`}
                    >
                      {tool.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-['Outfit',sans-serif]">
                    {tool.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed">
                    {tool.purpose}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center gap-1.5 text-[11px] text-neutral-400">
                  <CheckCircle2 className="w-3 h-3 text-rose-500" />
                  <span>Configurable per business requirements</span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-neutral-400">
          * Tools are integrated via standard customer-owned API keys, webhooks, or approved platform accounts. No fake partnership claims or unauthorized certifications.
        </p>

      </div>
    </section>
  );
};
