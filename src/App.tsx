import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ServicesSection } from './components/ServicesSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { WhyIvqieSection } from './components/WhyIvqieSection';
import { ProcessSection } from './components/ProcessSection';
import { TechStackSection } from './components/TechStackSection';
import { ExpectationsSection } from './components/ExpectationsSection';
import { FaqSection } from './components/FaqSection';
import { ConsultationCtaSection } from './components/ConsultationCtaSection';
import { Footer } from './components/Footer';
import { StrategyModal } from './components/StrategyModal';
import { LegalModal } from './components/LegalModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanel } from './components/AdminPanel';

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

  // Initialize Firebase Real-Time Synchronization across all devices
  useEffect(() => {
    testConnection();

    // 1. Real-time projects sync
    const unsubProjects = subscribeToProjects((updatedProjects) => {
      setProjects(updatedProjects);
    });

    // 2. Real-time inquiries & bookings sync
    const unsubInquiries = subscribeToInquiries((updatedInquiries) => {
      setInquiries(updatedInquiries);
    });

    // 3. Real-time site announcement banner sync
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
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromSection = (serviceName: string) => {
    setPreselectedConsultationService(serviceName);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDiscussProject = (projectName?: string) => {
    if (projectName) {
      setPreselectedConsultationService(`Workflow: ${projectName}`);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquirySubmitted = (newInquiry: InboundInquiry) => {
    setInquiries((prev) => [newInquiry, ...prev]);
    saveInquiryToFirestore(newInquiry);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-neutral-900 selection:bg-rose-600 selection:text-white">
      {/* Sticky Navigation with Announcement Bar and Admin Access */}
      <Navbar
        onBookCallClick={() => handleOpenStrategyCall()}
        announcement={announcement}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Cinematic Hero Section with System Visualizer & First-Stage Founder Photo */}
        <Hero
          onBookCallClick={() => handleOpenStrategyCall()}
          onExploreWorkClick={handleExploreWork}
        />

        {/* 2. Trust and Technology Strip */}
        <TrustStrip />

        {/* 3. Services Overview (3 Capabilities + AI Video Editing) */}
        <ServicesSection onSelectService={handleSelectServiceFromSection} />

        {/* 4. Selected Work / Case Studies (Dynamic from Portfolio Data & Admin) */}
        <CaseStudiesSection
          projects={projects}
          onDiscussProjectClick={handleDiscussProject}
        />

        {/* 5. Why IVQIE (Technology Should Make Business Simpler.) */}
        <WhyIvqieSection />

        {/* 6. Our Process (From First Conversation to a Working System.) */}
        <ProcessSection />

        {/* 7. Technology Stack (The Right Tools for the Right Job.) */}
        <TechStackSection />

        {/* 8. What You Can Expect (Replacing fabricated reviews with real commitments) */}
        <ExpectationsSection />

        {/* 9. FAQ (Accordion with exact prompt Q&As) */}
        <FaqSection />

        {/* 10. Final Consultation CTA & Working Lead Form / Scheduler */}
        <ConsultationCtaSection
          preselectedService={preselectedConsultationService}
          onClearPreselectedService={() => setPreselectedConsultationService(undefined)}
          onInquirySubmitted={handleInquirySubmitted}
        />
      </main>

      {/* Footer with WhatsApp, Legal & Admin Trigger */}
      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onSelectService={handleSelectServiceFromSection}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Global Interactive Modals */}
      <StrategyModal
        isOpen={strategyModalOpen}
        onClose={() => setStrategyModalOpen(false)}
        defaultService={selectedServiceForCall}
        onBookingComplete={handleInquirySubmitted}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Admin Security & Management Modals */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
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
