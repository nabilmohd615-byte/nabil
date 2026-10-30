import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Video, 
  Image as ImageIcon,
  ExternalLink,
  PhoneCall,
  Clock,
  Sparkles,
  Server,
  Terminal,
  Activity,
  Briefcase
} from 'lucide-react';
import { ProjectConcept } from '../data/portfolioData';

interface PortfolioDetailProps {
  project: ProjectConcept;
  allProjects: ProjectConcept[];
  onBack: () => void;
  onDiscussProject: (projectName?: string) => void;
  onOpenProject: (slug: string) => void;
}

export const PortfolioDetail: React.FC<PortfolioDetailProps> = ({
  project,
  allProjects,
  onBack,
  onDiscussProject,
  onOpenProject,
}) => {
  const shouldReduceMotion = useReducedMotion();

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
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: smoothEase,
      },
    },
  };

  // Find other portfolio projects for the footer
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white selection:bg-rose-600 selection:text-white pt-24 pb-28 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 -left-40 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Navigation & Breadcrumbs */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-neutral-800/80"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Portfolio</span>
            </button>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-500 uppercase">{project.category}</span>
            <span className="text-neutral-600">/</span>
            <span className="text-rose-400 font-bold truncate max-w-[200px]">{project.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onDiscussProject(project.name)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-all shadow-md shadow-rose-600/20 cursor-pointer"
            >
              <span>Discuss This Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Hero Section */}
        <div className="mb-14">
          <div className="flex flex-wrap items-center gap-2.5 mb-4 text-xs font-mono">
            <span className="px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/25 text-rose-400 font-bold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-300">{project.clientIndustry}</span>
            <span className="text-neutral-600">•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Portfolio Asset
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif] leading-[1.1]">
            {project.name}: {project.headline}
          </h1>

          <p className="mt-6 text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-4xl">
            {project.description}
          </p>
        </div>

        {/* Media / Video Showcase Section */}
        {(project.videoUrl || project.imageUrl) && (
          <div className="mb-16">
            <div className="relative aspect-[16/9] w-full rounded-3xl bg-neutral-950 overflow-hidden border border-neutral-800 shadow-2xl">
              {project.videoUrl ? (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <video
                    src={project.videoUrl}
                    poster={project.imageUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-950/80 backdrop-blur-md text-xs font-mono text-white border border-neutral-700 pointer-events-none">
                    <Video className="w-4 h-4 text-rose-500" />
                    <span>Project Video Demonstration</span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent pointer-events-none" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Narrative Grid: Challenge & Architecture Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Challenge & Solution */}
          <div className="lg:col-span-8 space-y-8">
            {project.challenge && (
              <div className="p-8 rounded-3xl bg-[#0d121c]/80 border border-neutral-800/80 shadow-xl">
                <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  <Activity className="w-4 h-4" />
                  <span>The Operational Bottleneck</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 font-['Outfit',sans-serif]">
                  What Was Broken Before Deployment
                </h2>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                  {project.challenge}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="p-8 rounded-3xl bg-[#0d121c]/80 border border-neutral-800/80 shadow-xl">
                <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                  <Layers className="w-4 h-4" />
                  <span>The Engineering Architecture</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 font-['Outfit',sans-serif]">
                  How IVQIE Engineered the Solution
                </h2>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                  {project.solution}
                </p>
              </div>
            )}

            {/* Architecture Steps if available */}
            {project.architectureSteps && project.architectureSteps.length > 0 && (
              <div className="p-8 rounded-3xl bg-[#0d121c]/80 border border-neutral-800/80 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-4 font-['Outfit',sans-serif]">
                  Execution Steps &amp; Workflow Highlights
                </h3>
                <div className="space-y-3">
                  {project.architectureSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                      <div className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0 text-xs font-mono mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="leading-relaxed font-light">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Specifications & Tech Stack */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-[#0d121c]/90 border border-neutral-800/80 shadow-xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 font-mono flex items-center gap-2">
                <Terminal className="w-4 h-4 text-rose-500" />
                <span>System Specifications</span>
              </h3>

              <div className="space-y-3 text-xs font-mono">
                {project.specs && Object.entries(project.specs).map(([key, val]) => (
                  <div key={key} className="pb-2.5 border-b border-neutral-800/80 flex flex-col gap-1">
                    <span className="text-neutral-500">{key}:</span>
                    <span className="text-neutral-200 font-medium">{val}</span>
                  </div>
                ))}

                <div className="pt-2 flex flex-col gap-1">
                  <span className="text-neutral-500">Category:</span>
                  <span className="text-rose-400 font-semibold">{project.category}</span>
                </div>
              </div>
            </div>

            {/* Technologies Used */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="p-6 rounded-3xl bg-[#0d121c]/90 border border-neutral-800/80 shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 font-mono">
                  Technologies Deployed
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-neutral-900 text-neutral-300 border border-neutral-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-950/40 via-neutral-900 to-neutral-950 border border-rose-500/20 shadow-xl">
              <h4 className="text-base font-bold text-white mb-2 font-['Outfit',sans-serif]">
                Need a Similar Architecture?
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed font-light mb-4">
                Schedule a 25-minute discovery consultation with IVQIE leadership to scope your automation workflow.
              </p>
              <button
                onClick={() => onDiscussProject(project.name)}
                className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-['Outfit',sans-serif]"
              >
                <span>Discuss This Workflow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Related Next Projects */}
        {relatedProjects.length > 0 && (
          <div className="pt-12 border-t border-neutral-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-rose-500 font-bold uppercase">Explore More</span>
                <h3 className="text-2xl font-bold text-white font-['Outfit',sans-serif]">
                  Other Featured Portfolio Projects
                </h3>
              </div>
              <button
                onClick={onBack}
                className="text-xs text-neutral-400 hover:text-white transition-colors font-mono cursor-pointer"
              >
                View All Portfolio →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((rp) => (
                <div
                  key={rp.id}
                  onClick={() => onOpenProject(rp.slug || rp.id)}
                  className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-rose-400 uppercase">{rp.category}</span>
                    <h4 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors font-['Outfit',sans-serif] mt-1">
                      {rp.name}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{rp.headline}</p>
                  </div>
                  <span className="mt-4 text-xs font-bold text-neutral-300 group-hover:text-rose-400 flex items-center gap-1 font-['Outfit',sans-serif]">
                    <span>Inspect Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
