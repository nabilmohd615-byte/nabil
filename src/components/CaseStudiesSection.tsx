import React, { useState } from 'react';
import {
  ArrowUpRight,
  Cpu,
  Sparkles,
  Filter,
  CheckCircle2,
  ArrowRight,
  Eye,
  X,
  Layers,
  Activity,
  Video,
  Image as ImageIcon,
  Play,
} from 'lucide-react';
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
    <section id="work" className="py-24 bg-[#0D111A] border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold tracking-widest uppercase text-rose-500">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
              Practical Systems. Thoughtful Execution.
            </h2>
            <p className="mt-4 text-base text-neutral-400 leading-relaxed font-normal">
              Explore our architectural concepts and demonstration workflows designed for scalable operations.
            </p>
          </div>

          {/* Filter Bar (Functional Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900/90 rounded-xl border border-neutral-800 self-start md:self-end">
            {(['All', 'AI Automation', 'Digital Marketing', 'Social Media Marketing'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeFilter === filter
                    ? 'bg-neutral-800 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
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
              className="group flex flex-col justify-between rounded-2xl border border-neutral-800 bg-[#0F1420] hover:bg-[#131929] hover:border-neutral-700 hover:shadow-xl transition-all duration-300 p-6"
            >
              <div>
                {/* Clean Unboxed Metadata with Typographic Separator */}
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4 pb-3 border-b border-neutral-800/80">
                  <span className="font-semibold text-rose-500 uppercase tracking-wider text-[11px]">
                    {concept.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-neutral-400 font-mono text-[11px]">
                    {concept.label}
                  </span>
                </div>

                {/* Visual Representation: Video, Image, or Architecture Schema */}
                <div className="relative w-full h-44 rounded-xl bg-neutral-950 mb-5 overflow-hidden border border-neutral-800/90 group/media">
                  {concept.videoUrl ? (
                    <div className="relative w-full h-full bg-black flex items-center justify-center">
                      <video
                        src={concept.videoUrl}
                        poster={concept.imageUrl}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        onMouseOver={(e) => {
                          const v = e.currentTarget;
                          v.play().catch(() => {});
                        }}
                        onMouseOut={(e) => {
                          const v = e.currentTarget;
                          v.pause();
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/40 pointer-events-none" />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-neutral-900/90 text-[10px] font-mono text-violet-400 border border-violet-500/30">
                        <Video className="w-3 h-3" />
                        <span>Interactive Video</span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover/media:scale-110 transition-transform">
                        <div className="w-10 h-10 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg shadow-rose-600/40">
                          <Play className="w-4 h-4 fill-white ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] text-neutral-300 font-mono pointer-events-none">
                        <span>Hover to preview · Click inspect</span>
                        <span className="text-rose-400">AI Video Reel</span>
                      </div>
                    </div>
                  ) : concept.imageUrl ? (
                    <div className="relative w-full h-full bg-neutral-950">
                      <img
                        src={concept.imageUrl}
                        alt={concept.name}
                        className="w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-neutral-950/40" />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-neutral-900/90 text-[10px] font-mono text-rose-400 border border-rose-500/30">
                        <ImageIcon className="w-3 h-3" />
                        <span>Visual Asset</span>
                      </div>
                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] text-neutral-300 font-mono">
                        <span className="truncate">{concept.headline}</span>
                        <span className="text-emerald-400">Verified</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full p-4 flex flex-col justify-between">
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

                      <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[10px] text-neutral-400">
                        <span>Verified logic blueprint</span>
                        <span className="text-rose-400 font-mono">Active Model</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Concept Title & Headline */}
                <h3 className="text-xl font-bold text-white font-['Outfit',sans-serif] group-hover:text-rose-400 transition-colors">
                  {concept.name}
                </h3>
                <p className="mt-1 text-xs font-medium text-neutral-300">
                  {concept.headline}
                </p>

                <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                  {concept.description}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveConceptModal(concept)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-rose-400 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Blueprint</span>
                </button>

                <button
                  onClick={() => onDiscussProjectClick(concept.name)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400 hover:text-rose-300 cursor-pointer"
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
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-rose-600 rounded-xl border border-neutral-800 hover:border-rose-600 transition-all shadow-xs cursor-pointer"
          >
            <span>Discuss a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Concept Architecture Inspection Modal */}
      {activeConceptModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveConceptModal(null)}
        >
          <div
            className="bg-[#0F1420] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-800 text-white max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-500">
                <span>{activeConceptModal.name}</span>
                <span>·</span>
                <span className="text-neutral-400 font-sans">{activeConceptModal.label}</span>
              </div>
              <button
                onClick={() => setActiveConceptModal(null)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-2xl font-extrabold text-white font-['Outfit',sans-serif]">
                {activeConceptModal.headline}
              </h3>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                {activeConceptModal.description}
              </p>
            </div>

            {/* Attached Media Display: Video & Image Player */}
            {(activeConceptModal.videoUrl || activeConceptModal.imageUrl) && (
              <div className="mt-5 space-y-3">
                {activeConceptModal.videoUrl && (
                  <div className="rounded-xl overflow-hidden border border-neutral-800 bg-black">
                    <div className="p-2.5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-semibold text-violet-400">
                        <Video className="w-3.5 h-3.5" />
                        Project Video Showcase
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">HD Interactive Player</span>
                    </div>
                    <video
                      src={activeConceptModal.videoUrl}
                      controls
                      autoPlay={false}
                      poster={activeConceptModal.imageUrl}
                      className="w-full max-h-72 object-contain bg-black"
                    />
                  </div>
                )}

                {activeConceptModal.imageUrl && !activeConceptModal.videoUrl && (
                  <div className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
                    <div className="p-2.5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-semibold text-rose-400">
                        <ImageIcon className="w-3.5 h-3.5" />
                        Project Visual Asset
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">Full Resolution</span>
                    </div>
                    <img
                      src={activeConceptModal.imageUrl}
                      alt={activeConceptModal.name}
                      className="w-full max-h-72 object-cover"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Architecture Steps Sequence */}
            <div className="mt-6">
              <h4 className="text-xs font-bold tracking-wider uppercase text-neutral-300 mb-3">
                Execution Workflow Sequence
              </h4>
              <div className="space-y-3">
                {activeConceptModal.architectureSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-neutral-900/80 border border-neutral-800"
                  >
                    <span className="w-6 h-6 rounded-lg bg-neutral-800 text-rose-400 text-[11px] font-mono font-bold flex items-center justify-center shrink-0 border border-neutral-700">
                      0{idx + 1}
                    </span>
                    <p className="text-xs text-neutral-300 leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="mt-6 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <h4 className="text-xs font-bold tracking-wider uppercase text-neutral-300 mb-2">
                Implementation Specifications
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {Object.entries(activeConceptModal.specs).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-neutral-400 block text-[11px]">{key}</span>
                    <span className="font-semibold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between gap-4">
              <p className="text-xs text-neutral-400">
                Blueprint can be customized to your specific tech stack.
              </p>
              <button
                onClick={() => {
                  const name = activeConceptModal.name;
                  setActiveConceptModal(null);
                  onDiscussProjectClick(name);
                }}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors cursor-pointer shrink-0"
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
