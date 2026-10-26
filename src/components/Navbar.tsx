import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Lock, MessageCircle } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SiteAnnouncement } from '../data/inquiriesData';

interface NavbarProps {
  onBookCallClick: () => void;
  announcement?: SiteAnnouncement;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBookCallClick,
  announcement,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'services', 'work', 'why-us', 'process', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Our Work', href: '#work', id: 'work' },
    { label: 'Process', href: '#process', id: 'process' },
    { label: 'Why IVQIE', href: '#why-us', id: 'why-us' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs'
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
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark & Monogram */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#home');
              }}
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg whitespace-nowrap shrink-0"
              aria-label="IVQIE Home"
            >
              <BrandLogo size="md" />
            </a>

            {/* Zone 2: Navigation Links (single line, subtle hover states) */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                      isActive
                        ? 'text-neutral-900 border-rose-600 font-semibold'
                        : 'border-transparent hover:text-neutral-900 hover:border-neutral-300'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: 1 Primary Action + Discreet Admin Trigger */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="p-2 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
                  title="Admin Portal (Ctrl+Shift+A)"
                  aria-label="Admin Portal"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={onBookCallClick}
                className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 rounded-lg hover:bg-rose-600 transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Book a Strategy Call</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="p-1.5 text-neutral-500 hover:text-rose-600 rounded-lg"
                  aria-label="Admin Portal"
                >
                  <Lock className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-700 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 sm:hidden bg-neutral-900/60 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                <BrandLogo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-neutral-500 hover:text-neutral-900 focus:outline-none"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="pt-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className={`text-base font-medium py-2 px-3 rounded-md transition-colors ${
                      activeSection === link.id
                        ? 'bg-rose-50 text-rose-700 font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookCallClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors shadow-xs"
              >
                <span>Book a Strategy Call</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <p className="text-center text-xs text-neutral-400">
                AI Systems · Marketing · Growth
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
