import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  Building2,
  Layers,
  Sparkles,
  ShieldCheck,
  Eye,
  Activity
} from 'lucide-react';
import { ProjectConcept, INITIAL_PROJECTS } from '../data/portfolioData';

interface CaseStudiesProps {
  onDiscussProjectClick: (projectName?: string) => void;
  projects?: ProjectConcept[];
  onOpenCaseStudy: (slug: string) => void;
  onViewAllCaseStudies: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesProps> = ({
  onDiscussProjectClick,
  projects = INITIAL_PROJECTS,
  onOpenCaseStudy,
  onViewAllCaseStudies,
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'AI Automation' | 'Digital Marketing' | 'Social Media Marketing'>('All');
  const shouldReduceMotion = useReducedMotion();

  const concepts = projects;

  const filteredConcepts = activeFilter === 'All'
    ? concepts
    : concepts.filter((c) => c.category === activeFilter);

  const smoothEase = [0.16, 1, 0.3, 1] as const;

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 24 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: smoothEase,
      },
    },
  };

  return (
    <section id="work" className="py-24 md:py-32 bg-[#0A0E17] border-t border-neutral-800/80 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-rose-600/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-violet-600/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-subtle opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold tracking-widest uppercase text-rose-500 font-['Space_Mono',monospace]">
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#F43F5E]" />
              <span>SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
              Architectural Systems. Proven Execution.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-400 font-light leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
              A curated selection of autonomous AI workflows, high-retention video production matrices, and performance growth architectures engineered for ambitious global brands.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900/90 rounded-xl border border-neutral-800 self-start md:self-end">
            {(['All', 'AI Automation', 'Digital Marketing', 'Social Media Marketing'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeFilter === filter
                    ? 'bg-neutral-800 text-white shadow-xs border border-neutral-700/60'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {filter === 'All' ? 'All Works' : filter.replace(' Marketing', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Alternating Editorial Showcase Cards */}
        <div className="space-y-12 sm:space-y-16">
          {filteredConcepts.map((concept, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={concept.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="group rounded-3xl border border-neutral-800/90 bg-[#0d121c]/90 hover:border-neutral-700/80 hover:bg-[#101726] transition-all duration-300 shadow-2xl p-6 sm:p-9 relative overflow-hidden"
              >
                {/* Subtle top ambient glow */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-500/0 via-rose-500/50 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}>
                  
                  {/* Media Column (Span 6) */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div 
                      onClick={() => onOpenCaseStudy(concept.slug || concept.id)}
                      className="relative aspect-[16/10] w-full rounded-2xl bg-neutral-950 overflow-hidden border border-neutral-800 group/media cursor-pointer shadow-lg"
                    >
                      {concept.videoUrl ? (
                        <div className="relative w-full h-full bg-black flex items-center justify-center">
                          <video
                            src={concept.videoUrl}
                            poster={concept.imageUrl}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/media:scale-103"
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
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/30 pointer-events-none" />
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900/90 text-[10px] font-mono text-violet-400 border border-violet-500/30">
                            <Video className="w-3 h-3" />
                            <span>Interactive Video</span>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-xl shadow-rose-600/40 group-hover/media:scale-110 transition-transform">
                              <ArrowRight className="w-5 h-5 ml-0.5" />
                            </div>
                          </div>
                          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-neutral-300 font-mono pointer-events-none">
                            <span>Hover to preview video</span>
                            <span className="text-rose-400 font-bold">Click to view study →</span>
                          </div>
                        </div>
                      ) : concept.imageUrl ? (
                        <div className="relative w-full h-full">
                          <img
                            src={concept.imageUrl}
                            alt={concept.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/media:scale-103"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/20" />
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900/90 text-[10px] font-mono text-rose-400 border border-rose-500/30">
                            <ImageIcon className="w-3 h-3" />
                            <span>System Architecture</span>
                          </div>
                          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-neutral-300 font-mono">
                            <span className="truncate max-w-[220px]">{concept.clientIndustry}</span>
                            <span className="text-emerald-400 font-bold">Verified Blueprint</span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full p-6 flex flex-col justify-between bg-neutral-900/50">
                          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                            <span className="text-rose-400 font-bold flex items-center gap-1.5">
                              <Activity className="w-3.5 h-3.5" />
                              {concept.name}
                            </span>
                            <span>Architecture Blueprint</span>
                          </div>
                          <p className="text-xs text-neutral-300 leading-relaxed font-light">
                            {concept.description}
                          </p>
                          <span className="text-[11px] text-rose-400 font-mono">Click to inspect blueprint →</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Editorial Text Column (Span 6) */}
                  <div className={`lg:col-span-6 flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div>
                      {/* Category & Industry */}
                      <div className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-400 mb-3.5 font-mono">
                        <span className="font-bold text-rose-500 uppercase tracking-wider text-[11px]">
                          {concept.category}
                        </span>
                        <span className="text-neutral-700">|</span>
                        <span className="text-neutral-300 font-normal">
                          {concept.clientIndustry}
                        </span>
                        {concept.verifiedNotice && (
                          <>
                            <span className="text-neutral-700">|</span>
                            <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" />
                              Verified
                            </span>
                          </>
                        )}
                      </div>

                      {/* Title & Headline */}
                      <h3 
                        onClick={() => onOpenCaseStudy(concept.slug || concept.id)}
                        className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit',sans-serif] tracking-tight hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        {concept.name}: {concept.headline}
                      </h3>

                      {/* Challenge / Solution Narrative snippet */}
                      <p className="mt-3.5 text-sm sm:text-base text-neutral-300 leading-relaxed font-light font-['Plus_Jakarta_Sans',sans-serif]">
                        {concept.challenge || concept.description}
                      </p>

                      {/* Key Verified Outcomes Stat Badges */}
                      {concept.verifiedOutcomes && concept.verifiedOutcomes.length > 0 && (
                        <div className="mt-6 pt-5 border-t border-neutral-800/80 grid grid-cols-2 gap-4">
                          {concept.verifiedOutcomes.slice(0, 2).map((vo, i) => (
                            <div key={i} className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                              <div className="text-xl sm:text-2xl font-extrabold text-rose-500 font-['Outfit',sans-serif]">
                                {vo.metric}
                              </div>
                              <div className="text-[10px] uppercase font-mono text-neutral-400 mt-0.5">
                                {vo.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Technology Pills */}
                      <div className="mt-5 flex flex-wrap items-center gap-1.5">
                        {concept.technologies.slice(0, 5).map((tech, ti) => (
                          <span
                            key={ti}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800"
                          >
                            {tech}
                          </span>
                        ))}
                        {concept.technologies.length > 5 && (
                          <span className="text-[10px] font-mono text-neutral-500">
                            +{concept.technologies.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 pt-5 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-4">
                      <button
                        onClick={() => onOpenCaseStudy(concept.slug || concept.id)}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-rose-400 transition-colors cursor-pointer group/cta font-['Outfit',sans-serif]"
                      >
                        <span>View In-Depth Case Study</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1 text-rose-500" />
                      </button>

                      <button
                        onClick={() => onDiscussProjectClick(concept.name)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg border border-neutral-750 transition-colors cursor-pointer font-['Outfit',sans-serif]"
                      >
                        <span>Discuss This Workflow</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                      </button>
                    </div>

                  </div>

                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Global Directory CTA Strip */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-2 sm:p-2.5 bg-neutral-900/90 rounded-2xl border border-neutral-800 shadow-xl">
            <span className="text-xs text-neutral-400 px-4 font-light">
              Interested in reviewing our complete technical archive?
            </span>
            <button
              onClick={onViewAllCaseStudies}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md shadow-rose-600/30 cursor-pointer font-['Outfit',sans-serif]"
            >
              <span>Explore All Case Studies &amp; Blueprints</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
