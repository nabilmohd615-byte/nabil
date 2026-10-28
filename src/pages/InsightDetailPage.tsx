import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  BookmarkCheck,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  PhoneCall,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { INSIGHTS_CATALOG } from '../data/insightsData';

interface InsightDetailPageProps {
  slug: string;
  onBack: () => void;
  onBookCall: (topic?: string) => void;
  onOpenInsight: (slug: string) => void;
}

export const InsightDetailPage: React.FC<InsightDetailPageProps> = ({
  slug,
  onBack,
  onBookCall,
  onOpenInsight,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const article = INSIGHTS_CATALOG.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="pt-36 pb-24 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Research Paper Not Found</h1>
        <p className="text-neutral-400 mb-8">
          The requested engineering publication could not be located in our research archive.
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 text-white font-semibold text-sm hover:bg-rose-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Insights Archive
        </button>
      </div>
    );
  }

  const otherArticles = INSIGHTS_CATALOG.filter((a) => a.slug !== slug).slice(0, 2);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <div className="pt-28 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Back & Breadcrumb Bar */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-800/80">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors focus:outline-none focus-visible:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Insights</span>
        </button>

        <div className="text-xs font-mono text-neutral-500">
          IVQIE // INSIGHTS // <span className="text-rose-400 uppercase">{article.category}</span>
        </div>
      </div>

      {/* Article Header */}
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-mono mb-4 tracking-wider uppercase">
          {article.category}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 font-display leading-tight">
          {article.title}
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-6">
          {article.subtitle}
        </p>

        {/* Author & Publishing Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800/80 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center font-bold text-rose-400">
              {article.author.avatarInitials}
            </div>
            <div>
              <div className="font-semibold text-white">{article.author.name}</div>
              <div className="text-[11px] text-neutral-400">{article.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedDate}
            </span>
          </div>
        </div>
      </header>

      {/* Executive Summary Card */}
      <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-rose-500/30 relative">
        <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase tracking-wider mb-3">
          <BookmarkCheck className="w-4 h-4" />
          Executive Architecture Abstract
        </div>
        <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-light">
          {article.executiveSummary}
        </p>
      </div>

      {/* Table of Contents Navigation */}
      <div className="mb-12 p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800">
        <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
          Index of Sections
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {article.tableOfContents.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left py-1 text-neutral-300 hover:text-rose-400 transition-colors focus:outline-none"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-12 mb-16 text-neutral-300 leading-relaxed font-light">
        {article.sections.map((sec) => (
          <section key={sec.id} id={sec.id} className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 font-display">
              {sec.heading}
            </h2>
            <div className="text-sm sm:text-base text-neutral-300 leading-relaxed space-y-4 whitespace-pre-line mb-6">
              {sec.bodyMarkdown}
            </div>

            {/* Key Takeaway Box */}
            {sec.keyTakeaway && (
              <div className="p-4 rounded-xl bg-neutral-900/80 border-l-4 border-rose-500 flex items-start gap-3 my-4">
                <Lightbulb className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-neutral-200 font-medium">
                  <span className="text-rose-400 font-bold uppercase tracking-wider text-[11px] block mb-0.5">
                    Architectural Takeaway:
                  </span>
                  {sec.keyTakeaway}
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-14 pt-6 border-t border-neutral-800">
        <span className="text-xs font-mono text-neutral-400">Related Disciplines:</span>
        {article.relatedTags.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs font-mono px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Discussion Call Box */}
      <div className="mb-16 rounded-3xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-neutral-950 to-neutral-950 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Discuss This Architecture With Our Team
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg">
            Looking to apply these concepts inside your enterprise environment? Connect with our systems team for a technical discussion.
          </p>
        </div>
        <button
          onClick={() => onBookCall(`Discuss Paper: ${article.title}`)}
          className="shrink-0 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs tracking-wide transition-all shadow-xl shadow-rose-600/30 cursor-pointer"
        >
          Book Technical Review
        </button>
      </div>

      {/* Related Articles */}
      {otherArticles.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Further Engineering Reading</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherArticles.map((oa) => (
              <div
                key={oa.slug}
                onClick={() => onOpenInsight(oa.slug)}
                className="cursor-pointer bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 transition-all"
              >
                <div className="text-[11px] font-mono text-rose-400 mb-2">{oa.category}</div>
                <h4 className="text-base font-bold text-white mb-2 line-clamp-2">{oa.title}</h4>
                <div className="inline-flex items-center gap-1.5 text-xs text-rose-400">
                  <span>Read paper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
