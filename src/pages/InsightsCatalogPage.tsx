import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BookOpen, Search, ArrowRight, Clock, Calendar, Zap, Filter } from 'lucide-react';
import { INSIGHTS_CATALOG, InsightArticle } from '../data/insightsData';

interface InsightsCatalogPageProps {
  onOpenInsight: (slug: string) => void;
  onNavigateHome: () => void;
}

export const InsightsCatalogPage: React.FC<InsightsCatalogPageProps> = ({
  onOpenInsight,
  onNavigateHome,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Architecture', 'Enterprise AI', 'Compliance & Security', 'Performance Marketing'];

  const filteredArticles = INSIGHTS_CATALOG.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      art.title.toLowerCase().includes(query) ||
      art.subtitle.toLowerCase().includes(query) ||
      art.relatedTags.some((tag) => tag.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button
          onClick={onNavigateHome}
          className="hover:text-rose-400 transition-colors focus:outline-none focus-visible:underline"
        >
          IVQIE
        </button>
        <span>/</span>
        <span className="text-neutral-200">Engineering Insights & Research</span>
      </nav>

      {/* Hero Header */}
      <div className="max-w-4xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-mono mb-4 tracking-wider uppercase">
          <BookOpen className="w-3.5 h-3.5" />
          Technical Whitepapers & Field Notes
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 font-display">
          Insights from the <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-300 to-amber-300">Frontiers of Automation.</span>
        </h1>
        <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-light max-w-3xl">
          Deep technical architectural analyses, regulatory breakdowns, and low-latency benchmarks published directly by our engineering staff.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12 pb-6 border-b border-neutral-800">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers or tags..."
            className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 transition-colors"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 text-center border border-neutral-800 rounded-2xl bg-neutral-900/40">
          <p className="text-neutral-400 text-sm">No research papers matching your search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((art, idx) => (
            <motion.article
              key={art.slug}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3, delay: idx * 0.05 }}
              onClick={() => onOpenInsight(art.slug)}
              className="group cursor-pointer flex flex-col justify-between bg-neutral-900/60 hover:bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 rounded-3xl p-8 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Meta Bar */}
                <div className="flex items-center justify-between gap-2 mb-4 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 text-rose-400">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-3 text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {art.readTime}
                    </span>
                    <span>•</span>
                    <span>{art.publishedDate}</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-rose-400 transition-colors mb-3 leading-snug">
                  {art.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 line-clamp-3 leading-relaxed mb-6 font-light">
                  {art.subtitle}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {art.relatedTags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-950/80 border border-neutral-800 text-neutral-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Author & CTA */}
              <div className="pt-6 border-t border-neutral-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center font-mono text-xs font-bold text-rose-400">
                    {art.author.avatarInitials}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">{art.author.name}</div>
                    <div className="text-[10px] text-neutral-400">{art.author.role}</div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 group-hover:translate-x-1 transition-transform">
                  <span>Read Paper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
};
