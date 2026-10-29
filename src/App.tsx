import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ServicesSection } from './components/ServicesSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { CaseStudiesDirectory } from './components/CaseStudiesDirectory';
import { CaseStudyDetail } from './components/CaseStudyDetail';
import { WhyIvqieSection } from './components/WhyIvqieSection';
import { ProcessSection } from './components/ProcessSection';
import { FaqSection } from './components/FaqSection';
import { ConsultationCtaSection } from './components/ConsultationCtaSection';
import { Footer } from './components/Footer';
import { StrategyModal } from './components/StrategyModal';
import { LegalModal } from './components/LegalModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanel } from './components/AdminPanel';

// Dedicated New Route Pages
import { ServicesCatalogPage } from './pages/ServicesCatalogPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { AboutPage } from './pages/AboutPage';
import { ProcessPage } from './pages/ProcessPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

import { getStoredProjects, ProjectConcept } from './data/portfolioData';
import {
  getStoredInquiries,
  getStoredAnnouncement,
  InboundInquiry,
  SiteAnnouncement,
} from './data/inquiriesData';
import { testConnection } from './lib/firebase';
import {
  subscribeToProjects,
  subscribeToInquiries,
  subscribeToAnnouncement,
  saveInquiryToFirestore,
} from './services/firebaseSyncService';
import { SERVICES_CATALOG } from './data/servicesData';

export type AppRoute =
  | { type: 'home' }
  | { type: 'services' }
  | { type: 'service-detail'; slug: string }
  | { type: 'solutions' }
  | { type: 'case-studies' }
  | { type: 'case-study-detail'; slug: string }
  | { type: 'about' }
  | { type: 'process' }
  | { type: 'contact' }
  | { type: 'privacy-policy' }
  | { type: 'terms' };

function parseRouteFromLocation(): AppRoute {
  // Check hash first (for backward compatibility and iframe links)
  const hash = window.location.hash.replace(/^#\/?/, '');
  const pathname = window.location.pathname.replace(/^\//, '');

  const path = hash || pathname;

  if (!path || path === 'home') return { type: 'home' };

  if (path === 'services') return { type: 'services' };
  if (path.startsWith('services/')) {
    const slug = path.replace('services/', '');
    return { type: 'service-detail', slug };
  }
  if (path === 'solutions') return { type: 'solutions' };
  if (path === 'case-studies') return { type: 'case-studies' };
  if (path.startsWith('case-studies/') || path.startsWith('case-study/')) {
    const slug = path.replace(/^(case-studies|case-study)\//, '');
    return { type: 'case-study-detail', slug };
  }
  if (path === 'about') return { type: 'about' };
  if (path === 'process') return { type: 'process' };
  if (path === 'insights' || path.startsWith('insights/')) return { type: 'services' };
  if (path === 'contact') return { type: 'contact' };
  if (path === 'privacy-policy' || path === 'privacy') return { type: 'privacy-policy' };
  if (path === 'terms') return { type: 'terms' };

  return { type: 'home' };
}

export default function App() {
  const [strategyModalOpen, setStrategyModalOpen] = useState(false);
  const [selectedServiceForCall, setSelectedServiceForCall] = useState<string | undefined>(undefined);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [preselectedConsultationService, setPreselectedConsultationService] = useState<string | undefined>(undefined);

  // Dynamic Content & Admin States
  const [projects, setProjects] = useState<ProjectConcept[]>(getStoredProjects);
  const [inquiries, setInquiries] = useState<InboundInquiry[]>(getStoredInquiries);
  const [announcement, setAnnouncement] = useState<SiteAnnouncement>(getStoredAnnouncement);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('ivqie_admin_auth') === 'true';
  });
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [resetPasswordToken, setResetPasswordToken] = useState<string | undefined>(undefined);

  // Check URL query parameters and hash for reset password token
  useEffect(() => {
    const handleUrlCheck = () => {
      const fullUrl = window.location.href;
      if (fullUrl.includes('token=') || fullUrl.includes('reset-password')) {
        const match = fullUrl.match(/[?&#]token=([a-zA-Z0-9]+)/);
        if (match && match[1]) {
          setResetPasswordToken(match[1]);
          setAdminLoginOpen(true);
        } else if (fullUrl.includes('reset-password')) {
          setAdminLoginOpen(true);
        }
      }
    };

    handleUrlCheck();
    window.addEventListener('hashchange', handleUrlCheck);
    return () => window.removeEventListener('hashchange', handleUrlCheck);
  }, []);

  // App Route State
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(parseRouteFromLocation);
  const shouldReduceMotion = useReducedMotion();

  // Navigation controller with SEO metadata updating
  const navigateTo = (path: string) => {
    // Format hash / pushState appropriately
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    window.history.pushState({}, '', cleanPath);
    window.location.hash = cleanPath.replace(/^\//, '');

    const nextRoute = parseRouteFromLocation();
    setCurrentRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  };

  // Sync SEO metadata whenever route changes
  useEffect(() => {
    let title = 'IVQIE | Enterprise AI Automation & Performance Systems';
    let description =
      'IVQIE designs and deploys deterministic autonomous AI agents, enterprise workflow pipelines, and bilingual conversational infrastructure.';

    switch (currentRoute.type) {
      case 'services':
        title = 'Services Catalog | IVQIE Autonomous AI & Systems';
        description = 'Explore our 6 production AI architecture disciplines: Autonomous Agents, Workflows, Conversational AI, CRM, Voice, and Custom Models.';
        break;
      case 'service-detail': {
        const svc = SERVICES_CATALOG.find((s) => s.slug === currentRoute.slug);
        if (svc) {
          title = `${svc.name} | IVQIE Enterprise Architecture`;
          description = svc.tagline;
        }
        break;
      }
      case 'solutions':
        title = 'Industry Solutions | IVQIE AI Automation Systems';
        description = 'Domain-specific AI automation architectures for Healthcare, FinTech, E-Commerce, Logistics, Real Estate, and Advisory.';
        break;
      case 'case-studies':
        title = 'Production Case Studies | IVQIE Verified Work';
        description = 'Architectural teardowns, workflow node graphs, and verified business outcomes from deployed IVQIE client systems.';
        break;
      case 'case-study-detail': {
        const proj = projects.find((p) => p.slug === currentRoute.slug || p.id === currentRoute.slug);
        if (proj) {
          title = `${proj.name} | IVQIE Case Study`;
          description = proj.headline;
        }
        break;
      }
      case 'about':
        title = 'About IVQIE | Systems Architecture & Leadership';
        description = 'Our engineering philosophy, founder background, Saudi & global footprint, and deterministic SLA standards.';
        break;
      case 'process':
        title = 'Our 4-Phase Delivery Protocol | IVQIE Methodology';
        description = 'How we ship production-grade AI systems in 30 days with shadow execution, golden test suites, and 90-day warranties.';
        break;
      case 'contact':
        title = 'Contact & Technical Scoping | IVQIE AI Agency';
        description = 'Schedule a 30-minute architecture consultation or connect directly on WhatsApp with our lead systems engineers.';
        break;
      case 'privacy-policy':
        title = 'Privacy Policy | IVQIE Saudi PDPL & GDPR';
        description = 'Our data protection protocols, zero-data-retention guarantees, and Saudi PDPL compliance policies.';
        break;
      case 'terms':
        title = 'Terms of Service & SLA | IVQIE Commercial Agreement';
        description = 'Terms of service, intellectual property ownership transfers, and 90-day production warranty terms.';
        break;
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [currentRoute, projects]);

  // Listen for browser popstate and hashchange (handling back/forward browser buttons)
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(parseRouteFromLocation());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Find currently active project if on case study detail view
  const currentProject =
    currentRoute.type === 'case-study-detail'
      ? projects.find((p) => p.slug === currentRoute.slug || p.id === currentRoute.slug) || projects[0]
      : null;

  // Initialize Firebase Real-Time Synchronization across all devices
  useEffect(() => {
    testConnection();

    const unsubProjects = subscribeToProjects((updatedProjects) => {
      setProjects(updatedProjects);
    });

    const unsubInquiries = subscribeToInquiries((updatedInquiries) => {
      setInquiries(updatedInquiries);
    });

    const unsubAnnouncement = subscribeToAnnouncement((updatedAnnouncement) => {
      setAnnouncement(updatedAnnouncement);
    });

    return () => {
      unsubProjects();
      unsubInquiries();
      unsubAnnouncement();
    };
  }, []);

  // Keyboard shortcut listener: Ctrl+Shift+A or Cmd+Shift+A for Admin Access
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        handleOpenAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn]);

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setAdminPanelOpen(true);
    } else {
      setAdminLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setAdminLoginOpen(false);
    setAdminPanelOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('ivqie_admin_auth');
    localStorage.removeItem('ivqie_admin_session_time');
    setIsAdminLoggedIn(false);
    setAdminPanelOpen(false);
  };

  const handleOpenStrategyCall = (serviceName?: string) => {
    setSelectedServiceForCall(serviceName);
    setStrategyModalOpen(true);
  };

  const handleExploreWork = () => {
    navigateTo('/case-studies');
  };

  const handleSelectServiceFromSection = (serviceName: string) => {
    setPreselectedConsultationService(serviceName);
    navigateTo('/contact');
  };

  const handleDiscussProject = (projectName?: string) => {
    if (projectName) {
      setPreselectedConsultationService(`Workflow: ${projectName}`);
    }
    navigateTo('/contact');
  };

  const handleInquirySubmitted = (newInquiry: InboundInquiry) => {
    setInquiries((prev) => [newInquiry, ...prev]);
    saveInquiryToFirestore(newInquiry);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-neutral-100 selection:bg-rose-600 selection:text-white">
      {/* Sticky Global Navigation with Announcement Bar and Route Support */}
      <Navbar
        onBookCallClick={() => handleOpenStrategyCall()}
        announcement={announcement}
        onOpenAdmin={handleOpenAdmin}
        currentRouteType={currentRoute.type}
        onNavigate={navigateTo}
      />

      {/* Main Animated View Routing across all 13 routes */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          
          {/* Route 1: / (Home) */}
          {currentRoute.type === 'home' && (
            <motion.div
              key="route-home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
            >
              {/* 1. Cinematic Hero Section with System Visualizer & Founder Photo */}
              <Hero
                onBookCallClick={() => handleOpenStrategyCall()}
                onExploreWorkClick={handleExploreWork}
              />

              {/* 2. Trust and Technology Strip */}
              <TrustStrip />

              {/* 3. Services Overview (Bento Grid Architecture) */}
              <ServicesSection
                onSelectService={handleSelectServiceFromSection}
                onNavigateToServiceDetail={(slug) => navigateTo(`/services/${slug}`)}
                onViewAllServices={() => navigateTo('/services')}
              />

              {/* 4. Selected Work (Editorial Alternating Case Studies) */}
              <CaseStudiesSection
                projects={projects}
                onDiscussProjectClick={handleDiscussProject}
                onOpenCaseStudy={(slug) => navigateTo(`/case-studies/${slug}`)}
                onViewAllCaseStudies={() => navigateTo('/case-studies')}
              />

              {/* 5. Why IVQIE (Deterministic SLA & Engineering Guarantees) */}
              <WhyIvqieSection />

              {/* 6. Our Process (4-Phase Deployment Protocol) */}
              <ProcessSection />

              {/* 7. FAQ */}
              <FaqSection />

              {/* 8. Final Consultation CTA & Working Lead Form / Scheduler */}
              <ConsultationCtaSection
                preselectedService={preselectedConsultationService}
                onClearPreselectedService={() => setPreselectedConsultationService(undefined)}
                onInquirySubmitted={handleInquirySubmitted}
              />
            </motion.div>
          )}

          {/* Route 2: /services */}
          {currentRoute.type === 'services' && (
            <motion.div
              key="route-services"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            >
              <ServicesCatalogPage
                onSelectService={(slug) => navigateTo(`/services/${slug}`)}
                onBookCall={handleOpenStrategyCall}
                onNavigateHome={() => navigateTo('/')}
              />
            </motion.div>
          )}

          {/* Route 3: /services/[slug] */}
          {currentRoute.type === 'service-detail' && (
            <motion.div
              key={`route-service-${currentRoute.slug}`}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            >
              <ServiceDetailPage
                slug={currentRoute.slug}
                onBack={() => navigateTo('/services')}
                onBookCall={handleOpenStrategyCall}
                onOpenCaseStudy={(csSlug) => navigateTo(`/case-studies/${csSlug}`)}
                allProjects={projects}
              />
            </motion.div>
          )}

          {/* Route 4: /solutions */}
          {currentRoute.type === 'solutions' && (
            <motion.div
              key="route-solutions"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            >
              <SolutionsPage
                onBookCall={handleOpenStrategyCall}
                onNavigateHome={() => navigateTo('/')}
                onSelectService={(slug) => navigateTo(`/services/${slug}`)}
              />
            </motion.div>
          )}

          {/* Route 5: /case-studies */}
          {currentRoute.type === 'case-studies' && (
            <motion.div
              key="route-case-studies"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            >
              <CaseStudiesDirectory
                projects={projects}
                onOpenCaseStudy={(slug) => navigateTo(`/case-studies/${slug}`)}
                onBackToHome={() => navigateTo('/')}
                onDiscussProject={handleDiscussProject}
              />
            </motion.div>
          )}

          {/* Route 6: /case-studies/[slug] */}
          {currentRoute.type === 'case-study-detail' && currentProject && (
            <motion.div
              key={`route-case-study-${currentProject.id}`}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            >
              <CaseStudyDetail
                project={currentProject}
                allProjects={projects}
                onBack={() => navigateTo('/case-studies')}
                onDiscussProject={handleDiscussProject}
                onOpenCaseStudy={(slug) => navigateTo(`/case-studies/${slug}`)}
              />
            </motion.div>
          )}

          {/* Route 7: /about */}
          {currentRoute.type === 'about' && (
            <motion.div
              key="route-about"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            >
              <AboutPage
                onBookCall={() => handleOpenStrategyCall()}
                onNavigateHome={() => navigateTo('/')}
              />
            </motion.div>
          )}

          {/* Route 8: /process */}
          {currentRoute.type === 'process' && (
            <motion.div
              key="route-process"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            >
              <ProcessPage
                onBookCall={() => handleOpenStrategyCall()}
                onNavigateHome={() => navigateTo('/')}
              />
            </motion.div>
          )}

          {/* Route: /contact */}
          {currentRoute.type === 'contact' && (
            <motion.div
              key="route-contact"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            >
              <ContactPage
                onInquirySubmitted={handleInquirySubmitted}
                onNavigateHome={() => navigateTo('/')}
                onOpenBookingModal={handleOpenStrategyCall}
              />
            </motion.div>
          )}

          {/* Route 12: /privacy-policy */}
          {currentRoute.type === 'privacy-policy' && (
            <motion.div
              key="route-privacy"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            >
              <PrivacyPolicyPage onNavigateHome={() => navigateTo('/')} />
            </motion.div>
          )}

          {/* Route 13: /terms */}
          {currentRoute.type === 'terms' && (
            <motion.div
              key="route-terms"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            >
              <TermsPage onNavigateHome={() => navigateTo('/')} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Reusable Global Footer with WhatsApp, Navigation & Admin Trigger */}
      <Footer
        onNavigate={navigateTo}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Global Interactive Strategy Booking Modal */}
      <StrategyModal
        isOpen={strategyModalOpen}
        onClose={() => setStrategyModalOpen(false)}
        defaultService={selectedServiceForCall}
        onBookingComplete={handleInquirySubmitted}
      />

      {/* Global Legal Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Admin Security & Management Modals */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => {
          setAdminLoginOpen(false);
          setResetPasswordToken(undefined);
        }}
        onLoginSuccess={handleLoginSuccess}
        initialToken={resetPasswordToken}
      />

      <AdminPanel
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
        onLogout={handleLogout}
        projects={projects}
        setProjects={setProjects}
        inquiries={inquiries}
        setInquiries={setInquiries}
        announcement={announcement}
        setAnnouncement={setAnnouncement}
      />
    </div>
  );
}
