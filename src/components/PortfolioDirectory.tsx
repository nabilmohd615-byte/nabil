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
  Filter,
  Plus,
  Briefcase
} from 'lucide-react';
import { ProjectConcept } from '../data/portfolioData';

interface PortfolioDirectoryProps {
  projects: ProjectConcept[];
  onOpenProject: (slug: string) => void;
  onBackToHome: () => void;
  onDiscussProject: (projectName?: string) => void;
  onAddPortfolioClick?: () => void;
}

export const PortfolioDirectory: React.FC<PortfolioDirectoryProps> = ({
  projects,
  onOpenProject,
  onBackToHome,
  onDiscussProject,
  onAddPortfolioClick,
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
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-800">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </button>

            {onAddPortfolioClick && (
              <button
                onClick={onAddPortfolioClick}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md shadow-rose-600/25 cursor-pointer font-['Outfit',sans-serif]"
              >
                <Plus className="w-4 h-4" />
                <span>Add Portfolio Project</span>
              </button>
            )}
          </div>

          <div className="mt-8 max-w-3xl">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#F43F5E]" />
              <span className="text-rose-400 font-bold uppercase">Portfolio Directory</span>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-400">{projects.length} Verified Systems</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
              Client Portfolio &amp; Verified Work
            </h1>

            <p className="mt-4 text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
              Explore our full portfolio archive of autonomous AI systems, custom CRM pipelines, and video growth architectures.
            </p>
          </div>
        </motion.div>

        {/* Search & Category Filter Controls */}
        <div className="mb-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-md">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by system, tech, or industry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 transition-colors font-mono"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {cat === 'All' ? 'All Portfolio' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center bg-neutral-900/30 border border-neutral-800 rounded-3xl">
            <Briefcase className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">No matching projects found</h3>
            <p className="text-xs text-neutral-400 mt-1">Try adjusting your search terms or selecting a different category filter.</p>
            {onAddPortfolioClick && (
              <button
                onClick={onAddPortfolioClick}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider"
              >
                <Plus className="w-4 h-4" />
                <span>Add Portfolio Project</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onClick={() => onOpenProject(project.slug || project.id)}
                className="group rounded-2xl border border-neutral-800/80 bg-[#0d121c]/80 hover:border-neutral-700/80 hover:bg-[#101726] transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                {/* Visual Media Preview */}
                <div className="relative aspect-[16/10] w-full rounded-xl bg-neutral-950 overflow-hidden border border-neutral-800/80 mb-4">
                  {project.videoUrl ? (
                    <div className="relative w-full h-full">
                      <video
                        src={project.videoUrl}
                        poster={project.imageUrl}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        muted
                        loop
                        playsInline
                        onMouseOver={(e) => e.currentTarget.play().catch(() => {})}
                        onMouseOut={(e) => e.currentTarget.pause()}
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-neutral-900/90 text-[10px] font-mono text-violet-400 border border-violet-500/30 flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        <span>Video Asset</span>
                      </div>
                    </div>
                  ) : project.imageUrl ? (
                    <div className="relative w-full h-full">
                      <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-neutral-900/90 text-[10px] font-mono text-rose-400 border border-rose-500/30 flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" />
                        <span>Project Visual</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full p-4 flex flex-col justify-between bg-neutral-900/40">
                      <span className="text-[11px] font-mono text-rose-400">{project.category}</span>
                      <p className="text-xs text-neutral-400 line-clamp-2">{project.headline}</p>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-neutral-300">
                    <span className="truncate max-w-[180px]">{project.clientIndustry}</span>
                    <span className="text-emerald-400">Verified</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors font-['Outfit',sans-serif] tracking-tight">
                    {project.name}
                  </h3>

                  <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed font-light line-clamp-2">
                    {project.headline}
                  </p>

                  {/* Tech stack tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800"
                      >
                        {t}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] font-mono text-neutral-600">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer action */}
                <div className="mt-5 pt-3.5 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-300 group-hover:text-white flex items-center gap-1 font-['Outfit',sans-serif]">
                    <span>View Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-rose-500 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500">IVQIE</span>
                </div>
              </motion.article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
