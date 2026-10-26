import React, { useState } from 'react';
import { ArrowRight, Sparkles, User, Network, Globe, CheckCircle2 } from 'lucide-react';
import { SystemVisualization } from './SystemVisualization';

interface HeroProps {
  onBookCallClick: () => void;
  onExploreWorkClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookCallClick, onExploreWorkClick }) => {
  const [stageView, setStageView] = useState<'system' | 'founder'>('system');

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial-glow">
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-grid-subtle opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Positioning & Headlines */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest uppercase text-rose-600">
              <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
              <span>AI AUTOMATION × DIGITAL GROWTH</span>
            </div>

            {/* Main Headline (Preserving exact wording from brief) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.08] font-['Outfit',sans-serif] text-balance">
              “We Build AI Systems That Work While You <span className="text-rose-600 underline decoration-rose-200 decoration-wavy underline-offset-8">Scale</span>.”
            </h1>

            {/* Supporting Text (Preserving exact wording) */}
            <p className="mt-7 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl text-pretty font-normal">
              From intelligent AI agents to end-to-end business automation, social media marketing, and performance-driven digital campaigns, we build systems that reduce repetitive work, strengthen your online presence, and help your business grow.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onBookCallClick}
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide text-white bg-rose-600 rounded-xl hover:bg-rose-700 transition-all shadow-md hover:shadow-lg hover:shadow-rose-600/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 cursor-pointer"
              >
                <span>Book a Strategy Call</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreWorkClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-800 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 hover:border-neutral-400 transition-colors shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 cursor-pointer"
              >
                <span>Explore Our Work</span>
              </button>
            </div>

            {/* Subtle Service Summary */}
            <div className="mt-8 pt-6 border-t border-neutral-200/80 w-full flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium text-neutral-500">
              <span className="text-neutral-700 font-semibold">Focus Areas</span>
              <span aria-hidden="true">·</span>
              <span>AI Automation</span>
              <span aria-hidden="true">·</span>
              <span>Digital Marketing</span>
              <span aria-hidden="true">·</span>
              <span>Social Media Growth</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-600">Saudi Arabia · Bangladesh · Global</span>
            </div>

          </div>

          {/* Right Column: Stage Visualization & Founder Integration */}
          <div className="lg:col-span-5 w-full">
            <div className="relative">
              {/* Interactive Stage Switcher */}
              <div className="mb-3 flex items-center justify-between p-1 bg-neutral-100 rounded-xl border border-neutral-200">
                <button
                  onClick={() => setStageView('system')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${
                    stageView === 'system'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Network className="w-3.5 h-3.5 text-rose-600" />
                  <span>Intelligent Systems</span>
                </button>
                <button
                  onClick={() => setStageView('founder')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${
                    stageView === 'founder'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-violet-600" />
                  <span>Leadership &amp; Founder</span>
                </button>
              </div>

              {/* View 1: Intelligent Systems Network Visualizer */}
              {stageView === 'system' && (
                <div className="transition-opacity duration-300">
                  <SystemVisualization />
                  
                  {/* Subtle Founder Peek Banner directly below visualizer */}
                  <div
                    onClick={() => setStageView('founder')}
                    className="mt-3 cursor-pointer group p-3 bg-white/90 hover:bg-white rounded-xl border border-neutral-200 flex items-center justify-between gap-3 shadow-2xs transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src="/assets/aistudio/603811916_122251205468180050_5460836446566182641_n_8486475e.jpg"
                        alt="Founder & Systems Director"
                        className="w-10 h-10 rounded-lg object-cover border border-neutral-200 shadow-2xs shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                          <span>Founder &amp; Systems Lead</span>
                          <span className="text-[10px] text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded font-medium">IVQIE</span>
                        </div>
                        <p className="text-[11px] text-neutral-500">
                          Direct strategic oversight for Saudi Arabia, Bangladesh &amp; Global B2B
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-rose-600 group-hover:translate-x-0.5 transition-transform">
                      View →
                    </span>
                  </div>
                </div>
              )}

              {/* View 2: Founder Stage with uploaded portrait photo */}
              {stageView === 'founder' && (
                <div className="bg-white rounded-2xl border border-neutral-200 shadow-md overflow-hidden transition-opacity duration-300">
                  <div className="relative aspect-[3/4] max-h-[380px] w-full overflow-hidden bg-neutral-900">
                    <img
                      src="/assets/aistudio/603811916_122251205468180050_5460836446566182641_n_8486475e.jpg"
                      alt="IVQIE Founder & Systems Director"
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <div className="flex items-center gap-2 mb-1.5 text-xs font-bold tracking-wider uppercase text-rose-400">
                        <Globe className="w-3.5 h-3.5" />
                        <span>Executive Leadership</span>
                      </div>
                      <h3 className="text-lg font-bold font-['Outfit',sans-serif]">
                        Founder &amp; Chief Systems Architect
                      </h3>
                      <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
                        Leading business automation architecture and digital performance strategies for ambitious brands.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-white flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-neutral-500 pb-2 border-b border-neutral-100">
                      <span className="font-semibold text-neutral-800">Global Focus</span>
                      <span>Saudi Arabia · Bangladesh · Worldwide</span>
                    </div>

                    <a
                      href="https://wa.me/+966509850428"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-emerald-600 rounded-lg transition-colors text-center inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Contact Me</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
