import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Video,
  Image as ImageIcon,
  ShieldCheck,
  Plus,
  Trash2,
  ExternalLink,
  Layers,
  Sparkles,
  Briefcase
} from 'lucide-react';
import { ProjectConcept, INITIAL_PROJECTS } from '../data/portfolioData';

interface PortfolioSectionProps {
  projects?: ProjectConcept[];
  onOpenProject: (slug: string) => void;
  onViewAllPortfolio: () => void;
  onDiscussProjectClick: (projectName?: string) => void;
  onAddPortfolioClick: () => void;
  isAdminLoggedIn?: boolean;
  onDeleteProject?: (projectId: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  projects = INITIAL_PROJECTS,
  onOpenProject,
  onViewAllPortfolio,
  onDiscussProjectClick,
  onAddPortfolioClick,
  isAdminLoggedIn = false,
  onDeleteProject,
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'AI Automation' | 'Digital Marketing' | 'Social Media Marketing'>('All');
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

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

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleConfirmDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (onDeleteProject) {
      onDeleteProject(id);
    }
    setConfirmDeleteId(null);
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-[#0A0E17] border-t border-neutral-800/80 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-rose-600/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-violet-600/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-subtle opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold tracking-widest uppercase text-rose-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#F43F5E]" />
              <span>PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
              Featured Client Portfolio
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
              Explore our autonomous AI workflows, high-retention video production matrices, and performance growth architectures deployed for ambitious global brands.
            </p>
          </div>

          {/* Action Bar: Filters + Add Portfolio Button */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-neutral-900/90 rounded-xl border border-neutral-800">
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

            {/* Prominent Add Portfolio Button */}
            <button
              onClick={onAddPortfolioClick}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md shadow-rose-600/25 hover:shadow-rose-600/40 hover:-translate-y-0.5 cursor-pointer font-['Outfit',sans-serif]"
              title="Add a new project to your live portfolio"
            >
              <Plus className="w-4 h-4" />
              <span>Add Portfolio</span>
            </button>
          </div>
        </div>

        {/* Portfolio Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 px-6 bg-neutral-900/40 border border-neutral-800 rounded-3xl">
            <Briefcase className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white font-['Outfit',sans-serif]">
              No portfolio projects found in this category
            </h3>
            <p className="mt-2 text-sm text-neutral-400 max-w-md mx-auto">
              You haven't added any projects under {activeFilter} yet. Click below to add your first project.
            </p>
            <button
              onClick={onAddPortfolioClick}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add First Portfolio Item</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="group rounded-3xl border border-neutral-800/90 bg-[#0d121c]/90 hover:border-neutral-700/80 hover:bg-[#101726] transition-all duration-300 shadow-2xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Subtle top ambient glow */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-500/0 via-rose-500/50 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  {/* Media Container */}
                  <div 
                    onClick={() => onOpenProject(project.slug || project.id)}
                    className="relative aspect-[16/9] w-full rounded-2xl bg-neutral-950 overflow-hidden border border-neutral-800 group/media cursor-pointer shadow-lg mb-6"
                  >
                    {project.videoUrl ? (
                      <div className="relative w-full h-full bg-black flex items-center justify-center">
                        <video
                          src={project.videoUrl}
                          poster={project.imageUrl}
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
                          <span>Video Asset</span>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-xl shadow-rose-600/40 group-hover/media:scale-110 transition-transform">
                            <ArrowRight className="w-5 h-5 ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-neutral-300 font-mono pointer-events-none">
                          <span>Hover to preview</span>
                          <span className="text-rose-400 font-bold">View details →</span>
                        </div>
                      </div>
                    ) : project.imageUrl ? (
                      <div className="relative w-full h-full">
                        <img
                          src={project.imageUrl}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/media:scale-103"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/20" />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900/90 text-[10px] font-mono text-rose-400 border border-rose-500/30">
                          <ImageIcon className="w-3 h-3" />
                          <span>Portfolio Visual</span>
                        </div>
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-neutral-300 font-mono">
                          <span className="truncate max-w-[220px]">{project.clientIndustry}</span>
                          <span className="text-emerald-400 font-bold">Verified Project</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full p-6 flex flex-col justify-between bg-neutral-900/50">
                        <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                          <span className="text-rose-400 font-bold flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            {project.name}
                          </span>
                          <span>Portfolio Item</span>
                        </div>
                        <p className="text-xs text-neutral-300 leading-relaxed font-light">
                          {project.description}
                        </p>
                        <span className="text-[11px] text-rose-400 font-mono">Click to inspect project details →</span>
                      </div>
                    )}
                  </div>

                  {/* Category & Tags Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-3 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-rose-400 uppercase tracking-wider text-[11px] bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                        {project.category}
                      </span>
                      <span className="text-neutral-500 text-[11px] truncate max-w-[180px]">
                        {project.clientIndustry}
                      </span>
                    </div>

                    {/* Admin Delete Action if logged in */}
                    {isAdminLoggedIn && onDeleteProject && (
                      confirmDeleteId === project.id ? (
                        <div className="flex items-center gap-1.5 bg-neutral-900 border border-rose-500/40 rounded-lg px-2 py-1" onClick={(e) => e.stopPropagation()}>
                          <span className="text-[10px] text-rose-400 font-mono">Delete?</span>
                          <button
                            onClick={(e) => handleConfirmDelete(e, project.id)}
                            className="px-1.5 py-0.5 text-[10px] bg-rose-600 hover:bg-rose-500 text-white font-bold rounded"
                          >
                            Yes
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmDeleteId(null);
                            }}
                            className="px-1.5 py-0.5 text-[10px] bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDeleteId(project.id);
                          }}
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-neutral-900 transition-colors"
                          title="Delete project from portfolio"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )
                    )}
                  </div>

                  {/* Title & Headline */}
                  <h3 
                    onClick={() => onOpenProject(project.slug || project.id)}
                    className="text-xl sm:text-2xl font-bold text-white font-['Outfit',sans-serif] tracking-tight hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    {project.name}: {project.headline}
                  </h3>

                  {/* Description Snippet */}
                  <p className="mt-2.5 text-xs sm:text-sm text-neutral-400 leading-relaxed font-light line-clamp-3">
                    {project.description || project.challenge}
                  </p>

                  {/* Technology Pills */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-1.5">
                      {project.technologies.slice(0, 4).map((tech, ti) => (
                        <span
                          key={ti}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900/90 text-neutral-300 border border-neutral-800"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[10px] font-mono text-neutral-500">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-4">
                  <button
                    onClick={() => onOpenProject(project.slug || project.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-rose-400 transition-colors cursor-pointer group/cta font-['Outfit',sans-serif]"
                  >
                    <span>View Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-1 text-rose-500" />
                  </button>

                  <button
                    onClick={() => onDiscussProjectClick(project.name)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg border border-neutral-800 transition-colors cursor-pointer font-['Outfit',sans-serif]"
                  >
                    <span>Discuss Workflow</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Bottom Directory Navigation Strip */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-2.5 sm:p-3 bg-neutral-900/90 rounded-2xl border border-neutral-800 shadow-xl">
            <span className="text-xs text-neutral-400 px-4 font-light">
              Looking for our complete catalogue of deployments and client workflows?
            </span>
            <button
              onClick={onViewAllPortfolio}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md shadow-rose-600/30 cursor-pointer font-['Outfit',sans-serif]"
            >
              <span>Explore Full Portfolio ({projects.length} Projects)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
