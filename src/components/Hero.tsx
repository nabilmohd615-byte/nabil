import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { 
  ArrowRight, 
  User, 
  Network, 
  Globe, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp,
  Cpu
} from 'lucide-react';
import { SystemVisualization } from './SystemVisualization';

interface HeroProps {
  onBookCallClick: () => void;
  onExploreWorkClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookCallClick, onExploreWorkClick }) => {
  const [stageView, setStageView] = useState<'system' | 'founder'>('system');
  const shouldReduceMotion = useReducedMotion();
  const glow1Ref = React.useRef<HTMLDivElement>(null);
  const glow2Ref = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 2;
    const y = ((clientY - top) / height - 0.5) * 2;
    if (glow1Ref.current) {
      glow1Ref.current.style.transform = `translate3d(${x * 24}px, ${y * 24}px, 0)`;
    }
    if (glow2Ref.current) {
      glow2Ref.current.style.transform = `translate3d(${-x * 30}px, ${-y * 30}px, 0)`;
    }
  };

  const smoothEase = [0.16, 1, 0.3, 1] as const;

  // Motion variants for orchestrating the initial cinematic reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const maskedLineVariants: Variants = {
    hidden: { 
      y: shouldReduceMotion ? '0%' : '110%', 
      opacity: shouldReduceMotion ? 1 : 0 
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.85,
        ease: smoothEase,
      },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 24 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.75,
        ease: smoothEase,
      },
    },
  };

  return (
    <section 
      id="home" 
      onMouseMove={handleMouseMove}
      className="relative pt-32 pb-20 md:pt-42 md:pb-28 overflow-hidden bg-[#0B0F17] text-white selection:bg-rose-600 selection:text-white"
    >
      {/* Dynamic Ambient Cinematic Glows with Parallax Shift */}
      <div 
        ref={glow1Ref}
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] bg-gradient-to-tr from-rose-600/15 via-rose-500/10 to-transparent rounded-full blur-[120px] pointer-events-none transition-transform duration-700 ease-out"
      />
      <div 
        ref={glow2Ref}
        className="absolute top-1/3 right-10 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-gradient-to-bl from-violet-600/12 via-purple-500/8 to-transparent rounded-full blur-[140px] pointer-events-none transition-transform duration-700 ease-out"
      />

      {/* Architectural subtle grid pattern with subtle hairline crosses */}
      <div className="absolute inset-0 bg-grid-subtle opacity-50 pointer-events-none" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Strategic Typography & Action Triggers */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start"
          >
            
            {/* Eyebrow / Category Indicator */}
            <motion.div 
              variants={fadeUpVariants}
              className="flex items-center gap-3 mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 shadow-[0_0_12px_#F43F5E]" />
              </span>
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-rose-500 font-['Space_Mono',monospace]">
                AI AUTOMATION × DIGITAL GROWTH
              </span>
              <div className="hidden sm:block h-[1px] w-12 bg-gradient-to-r from-rose-500/50 to-transparent" />
            </motion.div>

            {/* Display Headline with Masked Staggered Entrance */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.1rem] font-extrabold tracking-[-0.035em] leading-[1.04] font-['Outfit',sans-serif] text-balance">
              
              {/* Line 1 */}
              <span className="block overflow-hidden py-0.5">
                <motion.span 
                  variants={maskedLineVariants} 
                  className="block text-white"
                >
                  “We Build AI Systems
                </motion.span>
              </span>

              {/* Line 2 */}
              <span className="block overflow-hidden py-0.5">
                <motion.span 
                  variants={maskedLineVariants} 
                  className="block text-white"
                >
                  That Work While You
                </motion.span>
              </span>

              {/* Line 3 with luminous high-fashion glow */}
              <span className="block overflow-hidden py-0.5">
                <motion.span 
                  variants={maskedLineVariants} 
                  className="inline-flex items-center gap-2 text-white"
                >
                  <span className="relative inline-block text-white after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-rose-500 after:via-rose-400 after:to-violet-500 after:rounded-full after:shadow-[0_0_16px_rgba(244,63,94,0.7)]">
                    Scale
                  </span>
                  <span>.”</span>
                </motion.span>
              </span>
            </h1>

            {/* Supporting Text - Exact required wording, high readability */}
            <motion.p 
              variants={fadeUpVariants}
              className="mt-8 text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl text-pretty"
            >
              From intelligent AI agents to end-to-end business automation, social media marketing, and performance-driven digital campaigns, we build systems that reduce repetitive work, strengthen your online presence, and help your business grow.
            </motion.p>

            {/* Primary & Secondary Action Triggers */}
            <motion.div 
              variants={fadeUpVariants}
              className="mt-9 flex flex-wrap items-center gap-4 sm:gap-5"
            >
              {/* Primary: Book Strategy Call */}
              <button
                onClick={onBookCallClick}
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-bold tracking-wide text-white bg-rose-600 rounded-xl hover:bg-rose-500 transition-all duration-300 shadow-[0_10px_30px_rgba(225,29,72,0.35)] hover:shadow-[0_15px_35px_rgba(225,29,72,0.5)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 cursor-pointer overflow-hidden font-['Outfit',sans-serif]"
              >
                {/* Subtle sheen highlight */}
                <span className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
                <span className="relative z-10">Book a Strategy Call</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              {/* Secondary: Explore Our Work */}
              <button
                onClick={onExploreWorkClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-neutral-200 bg-neutral-900/90 border border-neutral-750/90 hover:border-neutral-600 rounded-xl hover:bg-neutral-800 transition-all duration-300 shadow-sm hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 cursor-pointer font-['Outfit',sans-serif]"
              >
                <span>Explore Our Work</span>
              </button>

              {/* Direct WhatsApp Contact Me Button */}
              <a
                href="https://wa.me/+966509850428"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 text-sm font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500/60 hover:bg-emerald-900/40 rounded-xl transition-all duration-300 shadow-sm hover:-translate-y-0.5 cursor-pointer font-['Outfit',sans-serif]"
                title="Direct WhatsApp link to Executive Leadership"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Contact Me</span>
              </a>
            </motion.div>

            {/* Subtle Service Summary Ticker & Geographic Reach */}
            <motion.div 
              variants={fadeUpVariants}
              className="mt-10 pt-7 border-t border-neutral-800/80 w-full"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-400 font-medium">
                <span className="text-white font-bold tracking-wider uppercase font-['Outfit',sans-serif]">
                  Capability Matrix
                </span>
                <span aria-hidden="true" className="text-neutral-700">|</span>
                <span className="text-neutral-300 font-normal">AI Automation</span>
                <span aria-hidden="true" className="text-neutral-700">·</span>
                <span className="text-neutral-300 font-normal">Digital Marketing</span>
                <span aria-hidden="true" className="text-neutral-700">·</span>
                <span className="text-neutral-300 font-normal">Social Media Growth</span>
              </div>

              {/* Territory & Operational SLA metrics */}
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-neutral-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>Saudi Arabia · Bangladesh · Global B2B</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>99.4% Workflow Reliability</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <Cpu className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                  <span>&lt;120ms Neural Latency</span>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Intelligent Systems Engine & Founder Stage */}
          <motion.div 
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.85, delay: 0.25, ease: smoothEase }}
            className="lg:col-span-5 w-full"
          >
            <div className="relative">
              
              {/* Architectural Stage Switcher Tabs */}
              <div className="mb-3.5 flex items-center justify-between p-1 bg-neutral-900/90 rounded-xl border border-neutral-800 shadow-md backdrop-blur-md">
                <button
                  onClick={() => setStageView('system')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    stageView === 'system'
                      ? 'bg-neutral-800 text-white shadow-xs border border-neutral-700/60'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Network className="w-3.5 h-3.5 text-rose-500" />
                  <span>Intelligent Systems</span>
                </button>
                <button
                  onClick={() => setStageView('founder')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    stageView === 'founder'
                      ? 'bg-neutral-800 text-white shadow-xs border border-neutral-700/60'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-violet-400" />
                  <span>Leadership &amp; Founder</span>
                </button>
              </div>

              {/* View 1: Cinematic Intelligent Systems Visualizer */}
              <AnimatePresence mode="wait">
                {stageView === 'system' && (
                  <motion.div 
                    key="system-view"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SystemVisualization />
                    
                    {/* Quick Founder Peek Banner */}
                    <div
                      onClick={() => setStageView('founder')}
                      className="mt-3 cursor-pointer group p-3.5 bg-[#0e131f]/90 hover:bg-[#121826] rounded-xl border border-neutral-800/90 hover:border-neutral-700 flex items-center justify-between gap-3 shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src="/assets/aistudio/603811916_122251205468180050_5460836446566182641_n_8486475e.jpg"
                          alt="Nabil - IVQIE Founder & Systems Director"
                          className="w-11 h-11 rounded-lg object-cover border border-neutral-700 shadow-sm shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5 font-['Outfit',sans-serif]">
                            <span>Nabil · Founder &amp; Systems Lead</span>
                            <span className="text-[10px] text-rose-400 bg-rose-500/15 px-1.5 py-0.5 rounded font-mono border border-rose-500/25">
                              IVQIE
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400 font-light">
                            Direct strategic oversight for Saudi Arabia, Bangladesh &amp; Global B2B
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-rose-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5 shrink-0">
                        View Profile →
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* View 2: Executive Leadership & Founder Stage */}
                {stageView === 'founder' && (
                  <motion.div 
                    key="founder-view"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#0e131f]/95 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden backdrop-blur-md"
                  >
                    <div className="relative aspect-[4/4.5] max-h-[380px] w-full overflow-hidden bg-neutral-950">
                      <img
                        src="/assets/aistudio/603811916_122251205468180050_5460836446566182641_n_8486475e.jpg"
                        alt="Nabil - IVQIE Founder & Chief Architect"
                        className="w-full h-full object-cover object-top filter contrast-[1.03]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-neutral-950/45 to-transparent" />
                      
                      {/* Portrait Overlay Header */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <div className="flex items-center gap-2 mb-1.5 text-xs font-bold tracking-wider uppercase text-rose-400 font-mono">
                          <Globe className="w-3.5 h-3.5" />
                          <span>Executive Leadership</span>
                        </div>
                        <h3 className="text-xl font-bold font-['Outfit',sans-serif] tracking-tight">
                          Nabil · Founder &amp; Chief Systems Architect
                        </h3>
                        <p className="text-xs text-neutral-300 mt-1 font-light leading-relaxed">
                          Spearheading autonomous AI systems, enterprise workflow automation, and high-impact digital growth for international clients.
                        </p>
                      </div>
                    </div>

                    <div className="p-4.5 bg-[#0e131f] flex flex-col gap-3">
                      <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800/80">
                        <span className="font-semibold text-white">Direct Markets</span>
                        <span className="font-mono text-neutral-300">Saudi Arabia · Bangladesh · Worldwide</span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800/80">
                        <span className="font-semibold text-white">Response SLA</span>
                        <span className="font-mono text-emerald-400">&lt;2 Hours Direct Priority</span>
                      </div>

                      {/* Direct WhatsApp Link to Founder */}
                      <a
                        href="https://wa.me/+966509850428"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all text-center inline-flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_12px_24px_rgba(16,185,129,0.45)] hover:-translate-y-0.5 font-['Outfit',sans-serif]"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Contact Me on WhatsApp</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
