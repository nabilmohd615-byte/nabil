import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Menu, X, ArrowUpRight, Lock, MessageCircle } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SiteAnnouncement } from '../data/inquiriesData';

interface NavbarProps {
  onBookCallClick: () => void;
  announcement?: SiteAnnouncement;
  onOpenAdmin?: () => void;
  currentRouteType: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBookCallClick,
  announcement,
  onOpenAdmin,
  currentRouteType,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and handle ESC key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/', routeKey: 'home' },
    { label: 'Services', path: '/services', routeKey: 'services' },
    { label: 'Solutions', path: '/solutions', routeKey: 'solutions' },
    { label: 'Case Studies', path: '/case-studies', routeKey: 'case-studies' },
    { label: 'Process', path: '/process', routeKey: 'process' },
    { label: 'Insights', path: '/insights', routeKey: 'insights' },
    { label: 'About', path: '/about', routeKey: 'about' },
    { label: 'Contact', path: '/contact', routeKey: 'contact' },
  ];

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B0F17]/95 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        {/* Top Announcement Strip if enabled */}
        {announcement?.enabled && (
          <div className="bg-neutral-950 text-white text-[11px] py-1.5 px-4 text-center border-b border-neutral-800 flex items-center justify-center gap-2">
            <span className="truncate max-w-xl text-neutral-300 font-medium">
              {announcement.message}
            </span>
            {announcement.linkUrl && (
              <a
                href={announcement.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-400 font-bold hover:underline shrink-0 inline-flex items-center gap-1"
              >
                <span>{announcement.linkText || 'Learn More'}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-6">
            
            {/* Brand Wordmark & Monogram */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/');
              }}
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg whitespace-nowrap shrink-0 transition-transform duration-200 hover:scale-[1.02]"
              aria-label="IVQIE Home"
            >
              <BrandLogo size="md" />
            </a>

            {/* Navigation Links with Active Indicator */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-neutral-300">
              {navLinks.map((link) => {
                const isActive =
                  currentRouteType === link.routeKey ||
                  (link.routeKey === 'services' && currentRouteType === 'service-detail') ||
                  (link.routeKey === 'case-studies' && currentRouteType === 'case-study-detail') ||
                  (link.routeKey === 'insights' && currentRouteType === 'insight-detail');

                return (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.path);
                    }}
                    className={`relative py-1 text-xs xl:text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 group/nav ${
                      isActive ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {/* Animated link underline */}
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-rose-500 transition-transform duration-250 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Direct WhatsApp / Strategy CTA + Discreet Admin Trigger */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="p-2 text-neutral-400 hover:text-rose-400 rounded-lg hover:bg-neutral-900 transition-colors duration-200 cursor-pointer"
                  title="Admin Portal (Ctrl+Shift+A)"
                  aria-label="Admin Portal"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              )}

              <a
                href="https://wa.me/+966509850428"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/30 hover:bg-emerald-900/30 border border-emerald-500/25 rounded-lg transition-all duration-200 cursor-pointer"
                title="Direct WhatsApp link"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Contact Me</span>
              </a>

              <button
                onClick={onBookCallClick}
                className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-white rounded-lg hover:bg-rose-600 hover:text-white transition-all duration-250 shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 whitespace-nowrap shrink-0 cursor-pointer font-['Outfit',sans-serif]"
              >
                <span>Book Strategy Call</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="p-1.5 text-neutral-400 hover:text-rose-400 rounded-lg"
                  aria-label="Admin Portal"
                >
                  <Lock className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with Motion Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 lg:hidden bg-neutral-950/85 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#0F1420] border-l border-neutral-800 shadow-2xl p-6 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
                  <BrandLogo size="sm" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-neutral-400 hover:text-white focus:outline-none cursor-pointer"
                    aria-label="Close Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="pt-6 flex flex-col gap-1.5">
                  {navLinks.map((link) => {
                    const isActive =
                      currentRouteType === link.routeKey ||
                      (link.routeKey === 'services' && currentRouteType === 'service-detail') ||
                      (link.routeKey === 'case-studies' && currentRouteType === 'case-study-detail') ||
                      (link.routeKey === 'insights' && currentRouteType === 'insight-detail');

                    return (
                      <button
                        key={link.path}
                        type="button"
                        onClick={() => handleLinkClick(link.path)}
                        className={`text-left text-sm font-medium py-2.5 px-3 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                          isActive
                            ? 'bg-neutral-800 text-rose-400 font-semibold'
                            : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Drawer Bottom Actions */}
              <div className="pt-6 border-t border-neutral-800 flex flex-col gap-3">
                <a
                  href="https://wa.me/+966509850428"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-center inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contact Me on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookCallClick();
                  }}
                  className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md text-center inline-flex items-center justify-center gap-2 cursor-pointer font-['Outfit',sans-serif]"
                >
                  <span>Book Strategy Call</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
