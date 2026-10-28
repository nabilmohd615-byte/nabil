import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  Share2, 
  Sparkles, 
  Activity, 
  Lock, 
  Video, 
  Image as ImageIcon,
  ExternalLink,
  MessageCircle,
  Calendar,
  Building2,
  ChevronRight,
  Zap
} from 'lucide-react';
import { ProjectConcept } from '../data/portfolioData';

interface CaseStudyDetailProps {
  project: ProjectConcept;
  onBack: () => void;
  onDiscussProject: (projectName: string) => void;
  onOpenCaseStudy: (slug: string) => void;
  allProjects?: ProjectConcept[];
}

export const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({
  project,
  onBack,
  onDiscussProject,
  onOpenCaseStudy,
  allProjects = [],
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  }, [project.id, shouldReduceMotion]);

  const smoothEase = [0.16, 1, 0.3, 1] as const;

  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const fadeUpVariants: Variants = {
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

  // Find other case studies for the "Next Case Studies" footer
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
              <span>Back to Case Studies</span>
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
              <span>Discuss Similar Architecture</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>

        {/* Hero Section of the Case Study */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mb-12 sm:mb-16"
        >
          {/* Industry & Label metadata */}
          <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
              <Building2 className="w-3 h-3" />
              {project.clientIndustry}
            </span>
            <span className="text-neutral-600">|</span>
            <span className="text-xs font-mono text-neutral-400">
              {project.label}
            </span>
            {project.verifiedNotice && (
              <>
                <span className="text-neutral-600">|</span>
                <span className="text-[11px] text-neutral-400 font-mono flex items-center gap-1 text-emerald-400/90">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {project.verifiedNotice}
                </span>
              </>
            )}
          </motion.div>

          {/* Project Title */}
          <motion.h1 
            variants={fadeUpVariants}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] font-['Outfit',sans-serif]"
          >
            {project.headline}
          </motion.h1>

          {/* Executive Summary */}
          <motion.p 
            variants={fadeUpVariants}
            className="mt-6 text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-3xl font-['Plus_Jakarta_Sans',sans-serif]"
          >
            {project.description}
          </motion.p>
        </motion.div>

        {/* Hero Media Showcase: Video Player or Full-Bleed High-Res Visual */}
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="mb-16 rounded-2xl overflow-hidden border border-neutral-800 bg-[#0d121c] shadow-2xl relative"
        >
          {project.videoUrl ? (
            <div className="relative w-full aspect-video max-h-[580px] bg-black">
              <div className="p-3 bg-neutral-900/95 border-b border-neutral-800 flex items-center justify-between text-xs px-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="font-semibold text-white font-['Outfit',sans-serif]">
                    {project.name} • Interactive Video Showcase
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  HD Production Render
                </span>
              </div>
              <video
                src={project.videoUrl}
                poster={project.imageUrl}
                controls
                autoPlay={false}
                className="w-full h-[calc(100%-44px)] object-contain bg-black"
              />
            </div>
          ) : project.imageUrl ? (
            <div className="relative w-full aspect-[21/9] max-h-[520px] bg-neutral-950 overflow-hidden group">
              <img
                src={project.imageUrl}
                alt={project.headline}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-neutral-300 font-mono">
                <span className="flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
                  <span>Production Architecture Asset</span>
                </span>
                <span className="text-neutral-400">High-Resolution Blueprint</span>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-neutral-900/40">
              <Activity className="w-8 h-8 text-rose-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">Interactive Architecture Blueprint</h3>
              <p className="text-xs text-neutral-400 mt-1">Full technical specs detailed below</p>
            </div>
          )}
        </motion.div>

        {/* Section 1: Business Challenge vs. Our Solution (Alternating Editorial Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Challenge Card */}
          <div className="p-7 sm:p-8 rounded-2xl bg-[#0d121c]/90 border border-neutral-800/90 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/0 via-amber-500/50 to-amber-500/0" />
            <div className="flex items-center gap-2.5 mb-4 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>01. The Business Challenge</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-['Outfit',sans-serif] mb-3">
              Operational Friction &amp; Growth Bottlenecks
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light font-['Plus_Jakarta_Sans',sans-serif]">
              {project.challenge}
            </p>
          </div>

          {/* Solution Card */}
          <div className="p-7 sm:p-8 rounded-2xl bg-[#0d121c]/90 border border-neutral-800/90 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-500/0 via-rose-500/50 to-rose-500/0" />
            <div className="flex items-center gap-2.5 mb-4 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>02. The IVQIE Solution</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-['Outfit',sans-serif] mb-3">
              Autonomous Systems &amp; Algorithmic Execution
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light font-['Plus_Jakarta_Sans',sans-serif]">
              {project.solution}
            </p>
          </div>

        </div>

        {/* Section 2: Verified Business Outcomes / Results Grid */}
        {project.verifiedOutcomes && project.verifiedOutcomes.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2.5 mb-3 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>03. Verified Outcomes &amp; Impact Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit',sans-serif] mb-6">
              Measurable Business Progress
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {project.verifiedOutcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0d121c] border border-neutral-800/90 hover:border-neutral-700 transition-colors shadow-lg"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-rose-500 font-['Outfit',sans-serif] tracking-tight">
                    {outcome.metric}
                  </div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider font-mono mt-1">
                    {outcome.label}
                  </div>
                  <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-light">
                    {outcome.context}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 text-right">
              <span className="text-[11px] font-mono text-neutral-500">
                * Outcomes measured during verified production benchmark &amp; staging telemetry.
              </span>
            </div>
          </div>
        )}

        {/* Section 3: System Architecture & Technologies Used */}
        <div className="mb-16">
          <div className="flex items-center gap-2.5 mb-3 text-xs font-mono font-bold text-violet-400 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-violet-400" />
            <span>04. System Architecture &amp; Stack</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit',sans-serif] mb-6">
            Multi-Tier Technical Architecture
          </h2>

          {/* Architecture Layers Breakdown */}
          {project.systemArchitecture && (
            <div className="space-y-4 mb-8">
              {project.systemArchitecture.map((arch, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-xl bg-[#0d121c]/90 border border-neutral-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="md:max-w-md">
                    <h4 className="text-base font-bold text-white font-['Outfit',sans-serif]">
                      {arch.layer}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                      {arch.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {arch.tools.map((t, ti) => (
                      <span
                        key={ti}
                        className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-750 text-neutral-300 font-mono text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Technologies Used Badges */}
          <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono mb-3">
              Technologies &amp; Protocols Used
            </h4>
            <div className="flex flex-wrap items-center gap-2.5">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 text-xs font-medium text-neutral-200 border border-neutral-800 hover:border-neutral-700 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Workflow Visualization (Step-by-step logic map) */}
        {project.workflowNodes && project.workflowNodes.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2.5 mb-3 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
              <Zap className="w-4 h-4 text-rose-400" />
              <span>05. Workflow Logic Sequence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit',sans-serif] mb-6">
              Step-by-Step Data Flow
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              {project.workflowNodes.map((node, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#0d121c] border border-neutral-800/90 relative flex flex-col justify-between"
                >
                  <div>
                    <span className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 text-xs font-mono font-bold flex items-center justify-center border border-rose-500/25 mb-3">
                      {node.step}
                    </span>
                    <h4 className="text-sm font-bold text-white font-['Outfit',sans-serif]">
                      {node.title}
                    </h4>
                    <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-light">
                      {node.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 5: Implementation Process (Sprint Phases) */}
        {project.implementationPhases && (
          <div className="mb-16">
            <div className="flex items-center gap-2.5 mb-3 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>06. Implementation Methodology</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit',sans-serif] mb-6">
              Structured 4-Phase Delivery Sprint
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {project.implementationPhases.map((phase, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0d121c] border border-neutral-800"
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800 text-xs">
                    <span className="font-bold text-white font-['Outfit',sans-serif]">
                      {phase.phase}
                    </span>
                    <span className="font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                      {phase.duration}
                    </span>
                  </div>
                  <ul className="space-y-2 mt-3">
                    {phase.deliverables.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-2 text-xs text-neutral-300 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 6: Final Project Consultation CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-neutral-900 via-[#111726] to-neutral-900 border border-neutral-750 shadow-2xl relative overflow-hidden mb-16 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-wider">
              TAILORED ARCHITECTURE FOR YOUR TEAM
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit',sans-serif] mt-2 tracking-tight">
              Ready to implement a system like {project.name}?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              We design, build, and deploy production workflows customized to your exact CRM, internal APIs, and operational requirements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onDiscussProject(project.name)}
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-lg shadow-rose-600/30 cursor-pointer font-['Outfit',sans-serif] inline-flex items-center justify-center gap-2"
            >
              <span>Book Architecture Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/+966509850428"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 text-sm font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/40 rounded-xl transition-all cursor-pointer font-['Outfit',sans-serif] inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Contact Me</span>
            </a>
          </div>
        </div>

        {/* Related Next Case Studies */}
        {relatedProjects.length > 0 && (
          <div className="pt-10 border-t border-neutral-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-neutral-400">
                Explore Other Case Studies
              </h3>
              <button
                onClick={onBack}
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 cursor-pointer inline-flex items-center gap-1"
              >
                <span>View All Case Studies</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onOpenCaseStudy(rel.slug || rel.id)}
                  className="p-6 rounded-2xl bg-[#0d121c] border border-neutral-800/90 hover:border-neutral-700 hover:bg-[#101726] transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 font-mono">
                      <span className="text-rose-400 font-semibold">{rel.category}</span>
                      <span>{rel.clientIndustry}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white font-['Outfit',sans-serif] group-hover:text-rose-400 transition-colors">
                      {rel.name}
                    </h4>
                    <p className="mt-1 text-xs text-neutral-300 line-clamp-2">
                      {rel.headline}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 font-semibold">
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-rose-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
