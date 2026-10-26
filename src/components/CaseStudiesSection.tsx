import React, { useState } from 'react';
import { ArrowUpRight, Cpu, Sparkles, Filter, CheckCircle2, ArrowRight, Eye, X, Layers, Activity } from 'lucide-react';
import { ProjectConcept, INITIAL_PROJECTS } from '../data/portfolioData';

interface CaseStudiesProps {
  onDiscussProjectClick: (projectName?: string) => void;
  projects?: ProjectConcept[];
}

export const CaseStudiesSection: React.FC<CaseStudiesProps> = ({
  onDiscussProjectClick,
  projects = INITIAL_PROJECTS,
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'AI Automation' | 'Digital Marketing' | 'Social Media Marketing'>('All');
  const [activeConceptModal, setActiveConceptModal] = useState<ProjectConcept | null>(null);

  const concepts = projects;

  const filteredConcepts = activeFilter === 'All'
    ? concepts
    : concepts.filter((c) => c.category === activeFilter);

  return (
    <section id="work" className="py-24 bg-white border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold tracking-widest uppercase text-rose-600">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <span>SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight font-['Outfit',sans-serif]">
              Practical Systems. Thoughtful Execution.
            </h2>
            <p className="mt-4 text-base text-neutral-600 leading-relaxed font-normal">
              Explore our architectural concepts and demonstration workflows designed for scalable operations.
            </p>
          </div>

          {/* Filter Bar (Functional Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 rounded-xl border border-neutral-200/80 self-start md:self-end">
            {(['All', 'AI Automation', 'Digital Marketing', 'Social Media Marketing'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeFilter === filter
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {filter === 'All' ? 'All Concepts' : filter.replace(' Marketing', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Project Concepts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredConcepts.map((concept) => (
            <div
              key={concept.id}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-neutral-50/50 hover:bg-white hover:border-neutral-300 hover:shadow-lg transition-all duration-300 p-6"
            >
              <div>
                {/* Clean Unboxed Metadata with Typographic Separator */}
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-4 pb-3 border-b border-neutral-200/70">
                  <span className="font-semibold text-rose-600 uppercase tracking-wider text-[11px]">
                    {concept.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-neutral-500 font-mono text-[11px]">
                    {concept.label}
                  </span>
                </div>

                {/* Abstract Visual Schema representation */}
                <div className="relative w-full h-44 rounded-xl bg-neutral-900 p-4 mb-5 overflow-hidden flex flex-col justify-between border border-neutral-800">
                  <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-rose-600/20 rounded-full blur-2xl" />
                  
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                    <span className="flex items-center gap-1.5 text-rose-400">
                      <Activity className="w-3.5 h-3.5 text-rose-500" />
                      {concept.name} Architecture
                    </span>
                    <span className="text-neutral-400">Step 1 of 5</span>
                  </div>

                  {/* Flow representation inside preview */}
                  <div className="space-y-2 py-1">
                    <div className="flex items-center gap-2 text-xs text-neutral-200">
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                      <span className="font-medium truncate">{concept.architectureSteps[0]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <span className="w-2 h-2 rounded-full bg-violet-500 shrink-0" />
                      <span className="font-medium truncate">{concept.architectureSteps[1]}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-400">
                    <span>Verified logic blueprint</span>
                    <span className="text-rose-400 font-mono">Active Model</span>
                  </div>
                </div>

                {/* Concept Title & Headline */}
                <h3 className="text-xl font-bold text-neutral-900 font-['Outfit',sans-serif] group-hover:text-rose-600 transition-colors">
                  {concept.name}
                </h3>
                <p className="mt-1 text-xs font-medium text-neutral-700">
                  {concept.headline}
                </p>

                <p className="mt-3 text-xs text-neutral-600 leading-relaxed">
                  {concept.description}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-neutral-200/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveConceptModal(concept)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Blueprint</span>
                </button>

                <button
                  onClick={() => onDiscussProjectClick(concept.name)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
                >
                  <span>Discuss Project</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA Strip for Work */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onDiscussProjectClick()}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-rose-600 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <span>Discuss a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Concept Architecture Inspection Modal */}
      {activeConceptModal && (
        <div
          className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveConceptModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-600">
                <span>{activeConceptModal.name}</span>
                <span>·</span>
                <span className="text-neutral-500 font-sans">{activeConceptModal.label}</span>
              </div>
              <button
                onClick={() => setActiveConceptModal(null)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-2xl font-extrabold text-neutral-900 font-['Outfit',sans-serif]">
                {activeConceptModal.headline}
              </h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                {activeConceptModal.description}
              </p>
            </div>

            {/* Architecture Steps Sequence */}
            <div className="mt-6">
              <h4 className="text-xs font-bold tracking-wider uppercase text-neutral-700 mb-3">
                Execution Workflow Sequence
              </h4>
              <div className="space-y-3">
                {activeConceptModal.architectureSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200/80"
                  >
                    <span className="w-6 h-6 rounded-lg bg-neutral-900 text-white text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <p className="text-xs text-neutral-700 leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="mt-6 p-4 rounded-xl bg-neutral-100/70 border border-neutral-200">
              <h4 className="text-xs font-bold tracking-wider uppercase text-neutral-700 mb-2">
                Implementation Specifications
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {Object.entries(activeConceptModal.specs).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-neutral-500 block text-[11px]">{key}</span>
                    <span className="font-semibold text-neutral-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between gap-4">
              <p className="text-xs text-neutral-500">
                Blueprint can be customized to your specific tech stack.
              </p>
              <button
                onClick={() => {
                  const name = activeConceptModal.name;
                  setActiveConceptModal(null);
                  onDiscussProjectClick(name);
                }}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Discuss This Workflow
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
