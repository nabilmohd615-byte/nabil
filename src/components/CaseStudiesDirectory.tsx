import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Search, 
  Building2, 
  CheckCircle2, 
  Video, 
  Image as ImageIcon, 
  ShieldCheck, 
  Layers,
  Filter
} from 'lucide-react';
import { ProjectConcept } from '../data/portfolioData';

interface CaseStudiesDirectoryProps {
  projects: ProjectConcept[];
  onOpenCaseStudy: (slug: string) => void;
  onBackToHome: () => void;
  onDiscussProject: (projectName?: string) => void;
}

export const CaseStudiesDirectory: React.FC<CaseStudiesDirectoryProps> = ({
  projects,
  onOpenCaseStudy,
  onBackToHome,
  onDiscussProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const shouldReduceMotion = useReducedMotion();

  const categories = ['All', 'AI Automation', 'Digital Marketing', 'Social Media Marketing'];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientIndustry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const smoothEase = [0.16, 1, 0.3, 1] as const;

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: smoothEase,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white selection:bg-rose-600 selection:text-white pt-24 pb-28 relative overflow-hidden">
      
      {/* Background subtle grids and glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Back navigation & Header */}
        <div className="pb-8 mb-10 border-b border-neutral-800/80">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-6">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </button>
            <span className="text-neutral-600">/</span>
            <span className="text-rose-400 font-bold uppercase">Case Studies &amp; Architecture Directory</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#F43F5E]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-rose-500 font-['Space_Mono',monospace]">
                  PORTFOLIO ARCHIVE
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
                Production Case Studies &amp; Verified Blueprints
              </h1>
              <p className="mt-4 text-base text-neutral-300 font-light leading-relaxed">
                Explore in-depth implementation breakdowns across autonomous AI agents, enterprise workflow automation, high-retention AI video pipelines, and predictive digital growth.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onDiscussProject()}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md shadow-rose-600/30 cursor-pointer"
              >
                <span>Request Custom Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1 bg-neutral-900/90 rounded-xl border border-neutral-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-neutral-800 text-white shadow-xs border border-neutral-700/60'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat === 'All' ? 'All Case Studies' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by technology, industry or problem..."
              className="w-full bg-[#0d121c] text-xs text-white placeholder-neutral-500 pl-9 pr-4 py-2.5 rounded-xl border border-neutral-800 focus:outline-none focus:border-rose-500/80 transition-colors"
            />
          </div>

        </div>

        {/* Case Studies Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0d121c] border border-neutral-800">
            <Layers className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No matching case studies found</h3>
            <p className="text-xs text-neutral-400 mt-1">Try adjusting your category filter or search query.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-rose-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                onClick={() => onOpenCaseStudy(project.slug || project.id)}
                className="group p-6 sm:p-7 rounded-2xl bg-[#0d121c]/90 border border-neutral-800/90 hover:border-neutral-700 hover:bg-[#101726] transition-all duration-300 shadow-xl flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                {/* Accent top line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-500/0 via-rose-500/60 to-rose-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  {/* Category and Client Industry */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400 pb-3 mb-4 border-b border-neutral-800/80 font-mono">
                    <span className="font-bold text-rose-500 uppercase">
                      {project.category}
                    </span>
                    <span className="text-neutral-400 truncate max-w-[240px]">
                      {project.clientIndustry}
                    </span>
                  </div>

                  {/* Media Preview Box */}
                  <div className="relative aspect-[16/9] w-full rounded-xl bg-neutral-950 mb-5 overflow-hidden border border-neutral-800">
                    {project.videoUrl ? (
                      <div className="w-full h-full relative">
                        <img
                          src={project.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-md">
                            <Video className="w-4 h-4 ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-neutral-900/90 border border-neutral-700 text-[10px] font-mono text-violet-400">
                          Video Showcase
                        </div>
                      </div>
                    ) : project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs font-mono">
                        Architecture Blueprint Available
                      </div>
                    )}
                  </div>

                  {/* Title & Headline */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit',sans-serif] group-hover:text-rose-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-neutral-300 line-clamp-1">
                    {project.headline}
                  </p>
                  <p className="mt-2.5 text-xs text-neutral-400 line-clamp-2 leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Key Outcome Highlights */}
                  {project.verifiedOutcomes && project.verifiedOutcomes.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-neutral-850 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-lg font-extrabold text-rose-500 font-['Outfit',sans-serif]">
                          {project.verifiedOutcomes[0].metric}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 ml-2">
                          {project.verifiedOutcomes[0].label}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-semibold">
                  <span className="text-neutral-400 group-hover:text-white transition-colors">
                    Read Detailed Case Study
                  </span>
                  <ArrowRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
