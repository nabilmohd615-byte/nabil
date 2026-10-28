import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  FolderKanban,
  FileText,
  Mail,
  LogOut,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Eye,
  Sparkles,
  Layers,
  ArrowRight,
  RefreshCw,
  Video,
  Image as ImageIcon,
  Upload,
  Play,
  Film,
} from 'lucide-react';
import { ProjectConcept, saveStoredProjects } from '../data/portfolioData';
import { InboundInquiry, SiteAnnouncement, saveStoredInquiries, saveStoredAnnouncement } from '../data/inquiriesData';
import {
  saveProjectToFirestore,
  deleteProjectFromFirestore,
  saveAnnouncementToFirestore,
  saveInquiryToFirestore,
  deleteInquiryFromFirestore,
} from '../services/firebaseSyncService';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  projects: ProjectConcept[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectConcept[]>>;
  inquiries: InboundInquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<InboundInquiry[]>>;
  announcement: SiteAnnouncement;
  setAnnouncement: React.Dispatch<React.SetStateAction<SiteAnnouncement>>;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  onLogout,
  projects,
  setProjects,
  inquiries,
  setInquiries,
  announcement,
  setAnnouncement,
}) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'content' | 'inquiries'>('portfolio');

  // New Project Form State
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    category: 'Social Media Marketing' as 'AI Automation' | 'Digital Marketing' | 'Social Media Marketing',
    label: 'Live Client Project' as 'Concept Project' | 'Demo Workflow' | 'Live Client Project' | 'Case Study',
    headline: '',
    description: '',
    step1: '',
    step2: '',
    step3: '',
    step4: '',
    specPlatform: 'Meta & TikTok / Premiere Pro',
    specTurnaround: '48h per batch',
    imageUrl: '',
    videoUrl: '',
  });

  const [imageUploading, setImageUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      alert('Please select an image smaller than 8MB.');
      return;
    }
    setImageUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      setNewProject((prev) => ({ ...prev, imageUrl: event.target?.result as string }));
      setImageUploading(false);
    };
    reader.onerror = () => {
      alert('Error reading image file');
      setImageUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) {
      alert('Video file is larger than 25MB. For large videos, paste an external video link (MP4, YouTube, Vimeo, Cloudinary) below.');
      return;
    }
    setVideoUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      setNewProject((prev) => ({ ...prev, videoUrl: event.target?.result as string }));
      setVideoUploading(false);
    };
    reader.onerror = () => {
      alert('Error reading video file');
      setVideoUploading(false);
    };
    reader.readAsDataURL(file);
  };

  // Announcement edit form
  const [announcementText, setAnnouncementText] = useState(announcement.message);
  const [announcementEnabled, setAnnouncementEnabled] = useState(announcement.enabled);
  const [announcementUrl, setAnnouncementUrl] = useState(announcement.linkUrl || 'https://wa.me/+966509850428');
  const [announcementImage, setAnnouncementImage] = useState(announcement.imageUrl || '');
  const [announcementVideo, setAnnouncementVideo] = useState(announcement.videoUrl || '');
  const [contentSavedMsg, setContentSavedMsg] = useState(false);

  if (!isOpen) return null;

  // Handle Add Project
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name.trim() || !newProject.headline.trim()) {
      alert('Please fill out the project title and headline.');
      return;
    }

    const steps = [newProject.step1, newProject.step2, newProject.step3, newProject.step4]
      .filter((s) => s.trim().length > 0);

    let mediaType: 'image' | 'video' | 'both' | undefined = undefined;
    if (newProject.imageUrl && newProject.videoUrl) mediaType = 'both';
    else if (newProject.imageUrl) mediaType = 'image';
    else if (newProject.videoUrl) mediaType = 'video';

    const rawSlug = newProject.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug = `${rawSlug || 'project'}-${Date.now().toString().slice(-4)}`;

    const created: ProjectConcept = {
      id: 'proj-' + Date.now(),
      slug,
      name: newProject.name.trim(),
      category: newProject.category,
      label: newProject.label,
      clientIndustry: 'Commercial Enterprise (Global & Saudi Arabia)',
      headline: newProject.headline.trim(),
      description: newProject.description.trim() || 'Custom delivered solution by IVQIE for commercial growth and automation.',
      challenge: 'Manual operational processes and fragmented digital channels were causing lead drop-off and excessive administrative friction.',
      solution: newProject.description.trim() || 'IVQIE implemented tailored automation architecture with direct CRM integration and multi-channel telemetry.',
      architectureSteps: steps.length > 0 ? steps : [
        'Discovery & requirement specification',
        'System architecture & creative workflow setup',
        'Testing and client review sign-off',
        'Deployment and ongoing tracking'
      ],
      mockDataSummary: 'Active portfolio deployment verified by IVQIE engineering team.',
      specs: {
        'Tooling / Stack': newProject.specPlatform || 'Custom Node Pipeline',
        'Delivery Time': newProject.specTurnaround || '2–3 weeks',
        'Status': 'Live in Production',
      },
      technologies: ['AI Automation', 'Enterprise Cloud', 'WhatsApp Cloud API', 'TypeScript'],
      verifiedNotice: 'Verified Client Project Architecture',
      imageUrl: newProject.imageUrl.trim() || undefined,
      videoUrl: newProject.videoUrl.trim() || undefined,
      mediaType,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isCustom: true,
    };

    const updated = [created, ...projects];
    setProjects(updated);
    saveStoredProjects(updated);
    saveProjectToFirestore(created);

    // Reset Form
    setNewProject({
      name: '',
      category: 'Social Media Marketing',
      label: 'Live Client Project',
      headline: '',
      description: '',
      step1: '',
      step2: '',
      step3: '',
      step4: '',
      specPlatform: 'Meta & TikTok / Premiere Pro',
      specTurnaround: '48h per batch',
      imageUrl: '',
      videoUrl: '',
    });
    setShowAddProject(false);
  };

  // Handle Delete Project
  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to remove this project from your website portfolio?')) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      saveStoredProjects(updated);
      deleteProjectFromFirestore(id);
    }
  };

  // Handle Save Announcement Content
  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAnnouncement: SiteAnnouncement = {
      enabled: announcementEnabled,
      message: announcementText,
      linkText: 'WhatsApp Direct',
      linkUrl: announcementUrl,
      imageUrl: announcementImage.trim() || undefined,
      videoUrl: announcementVideo.trim() || undefined,
    };
    setAnnouncement(updatedAnnouncement);
    saveStoredAnnouncement(updatedAnnouncement);
    saveAnnouncementToFirestore(updatedAnnouncement);
    setContentSavedMsg(true);
    setTimeout(() => setContentSavedMsg(false), 3000);
  };

  // Handle Update Inquiry Status
  const handleUpdateInquiryStatus = (id: string, newStatus: InboundInquiry['status']) => {
    const target = inquiries.find((inq) => inq.id === id);
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status: newStatus } : inq
    );
    setInquiries(updated);
    saveStoredInquiries(updated);
    if (target) {
      saveInquiryToFirestore({ ...target, status: newStatus });
    }
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm('Delete this inquiry record?')) {
      const updated = inquiries.filter((inq) => inq.id !== id);
      setInquiries(updated);
      saveStoredInquiries(updated);
      deleteInquiryFromFirestore(id);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl relative text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 sm:px-8 sm:py-6 border-b border-neutral-800 flex items-center justify-between gap-4 bg-neutral-950/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-500 border border-rose-500/30 flex items-center justify-center font-extrabold text-sm font-mono">
              IV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-['Outfit',sans-serif]">
                  IVQIE Management Console
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  Live Admin
                </span>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Firebase Multi-Device Sync Active
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Direct control over portfolio projects, website announcements &amp; client inquiries.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/+966509850428"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-600/30 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-rose-600 text-neutral-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              title="Sign out of Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-5 sm:px-8 py-3 bg-neutral-950/40 border-b border-neutral-800 text-xs font-semibold shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'portfolio'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Portfolio &amp; Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'content'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Content &amp; Announcements</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Client Inquiries ({inquiries.length})</span>
          </button>
        </div>

        {/* Scrollable Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          
          {/* TAB 1: PORTFOLIO & PROJECTS */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h4 className="text-lg font-bold font-['Outfit',sans-serif]">
                    Live Portfolio &amp; Case Studies
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Add custom client engagements, video editing samples, or AI automation demos. Updates are reflected immediately on your live website.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddProject(!showAddProject)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-semibold uppercase tracking-wider text-white transition-all shadow-md cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showAddProject ? 'Cancel' : 'Add New Portfolio Item'}</span>
                </button>
              </div>

              {/* Add Project Form Drawer/Card */}
              {showAddProject && (
                <form
                  onSubmit={handleCreateProject}
                  className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <span className="text-xs font-mono font-bold text-rose-500 uppercase">
                      New Project Definition
                    </span>
                    <span className="text-[11px] text-neutral-400">Instant publish to site</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Project Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Saudi Retail AI Reels Pipeline"
                        value={newProject.name}
                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-rose-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Category
                      </label>
                      <select
                        value={newProject.category}
                        onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                      >
                        <option value="Social Media Marketing">Social Media Marketing &amp; Video Editing</option>
                        <option value="AI Automation">AI Automation &amp; Agents</option>
                        <option value="Digital Marketing">Digital Marketing &amp; Performance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Label
                      </label>
                      <select
                        value={newProject.label}
                        onChange={(e) => setNewProject({ ...newProject, label: e.target.value as any })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                      >
                        <option value="Live Client Project">Live Client Project</option>
                        <option value="Case Study">Case Study</option>
                        <option value="Demo Workflow">Demo Workflow</option>
                        <option value="Concept Project">Concept Project</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Headline / One-Liner *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AI-Generated TikTok & Reels Engine Generating 20+ High-Retention Assets Weekly"
                      value={newProject.headline}
                      onChange={(e) => setNewProject({ ...newProject, headline: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Full Description
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Describe what challenges this solved, what tools were used, and the impact..."
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>

                  {/* Steps */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Execution Steps / Workflow Highlights (Up to 4)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Step 1: AI script & viral hook ideation"
                        value={newProject.step1}
                        onChange={(e) => setNewProject({ ...newProject, step1: e.target.value })}
                        className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600"
                      />
                      <input
                        type="text"
                        placeholder="Step 2: AI avatar generation & voice synthesis"
                        value={newProject.step2}
                        onChange={(e) => setNewProject({ ...newProject, step2: e.target.value })}
                        className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600"
                      />
                      <input
                        type="text"
                        placeholder="Step 3: Fast-paced editing with sound effects & subtitles"
                        value={newProject.step3}
                        onChange={(e) => setNewProject({ ...newProject, step3: e.target.value })}
                        className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600"
                      />
                      <input
                        type="text"
                        placeholder="Step 4: Multi-channel scheduling across Instagram & TikTok"
                        value={newProject.step4}
                        onChange={(e) => setNewProject({ ...newProject, step4: e.target.value })}
                        className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Primary Stack / Tool
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. AI Video Gen + Premiere Pro / Make"
                        value={newProject.specPlatform}
                        onChange={(e) => setNewProject({ ...newProject, specPlatform: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Turnaround / Deliverable
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Weekly batch delivery"
                        value={newProject.specTurnaround}
                        onChange={(e) => setNewProject({ ...newProject, specTurnaround: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Media Uploads: Image & Video Options */}
                  <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                      <div className="flex items-center gap-2 text-xs font-semibold text-white">
                        <Sparkles className="w-4 h-4 text-rose-500" />
                        <span>Media Attachments (Image &amp; Video Upload)</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        Attach Image, Video, or Both
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* 1. Image Upload Option */}
                      <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                            <ImageIcon className="w-4 h-4 text-rose-400" />
                            <span>1. Image Upload (ছবি)</span>
                          </label>
                          {newProject.imageUrl && (
                            <button
                              type="button"
                              onClick={() => setNewProject({ ...newProject, imageUrl: '' })}
                              className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold"
                            >
                              Remove Image
                            </button>
                          )}
                        </div>

                        {/* File Picker Button */}
                        <div className="flex items-center gap-2">
                          <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-neutral-850 hover:bg-neutral-800 text-xs font-medium text-white cursor-pointer border border-neutral-700 transition-colors">
                            <Upload className="w-3.5 h-3.5 text-rose-400" />
                            <span>{imageUploading ? 'Loading...' : 'Upload Image File'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageFileChange}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {/* Image URL fallback */}
                        <input
                          type="text"
                          placeholder="Or paste Image URL (https://...)"
                          value={newProject.imageUrl}
                          onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono"
                        />

                        {/* Live Image Preview */}
                        {newProject.imageUrl && (
                          <div className="relative w-full h-24 rounded-lg overflow-hidden border border-neutral-800 bg-black">
                            <img
                              src={newProject.imageUrl}
                              alt="Upload preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-1 right-1 bg-neutral-900/90 px-1.5 py-0.5 rounded text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              Image Ready
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 2. Video Upload Option */}
                      <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                            <Video className="w-4 h-4 text-violet-400" />
                            <span>2. Video Upload (ভিডিও)</span>
                          </label>
                          {newProject.videoUrl && (
                            <button
                              type="button"
                              onClick={() => setNewProject({ ...newProject, videoUrl: '' })}
                              className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold"
                            >
                              Remove Video
                            </button>
                          )}
                        </div>

                        {/* File Picker Button */}
                        <div className="flex items-center gap-2">
                          <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-neutral-850 hover:bg-neutral-800 text-xs font-medium text-white cursor-pointer border border-neutral-700 transition-colors">
                            <Upload className="w-3.5 h-3.5 text-violet-400" />
                            <span>{videoUploading ? 'Loading...' : 'Upload Video File'}</span>
                            <input
                              type="file"
                              accept="video/*"
                              onChange={handleVideoFileChange}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {/* Video URL fallback */}
                        <input
                          type="text"
                          placeholder="Or paste Video URL (MP4 / WebM / Link)"
                          value={newProject.videoUrl}
                          onChange={(e) => setNewProject({ ...newProject, videoUrl: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-violet-500 font-mono"
                        />

                        {/* Live Video Preview */}
                        {newProject.videoUrl && (
                          <div className="relative w-full h-24 rounded-lg overflow-hidden border border-neutral-800 bg-black">
                            <video
                              src={newProject.videoUrl}
                              controls
                              className="w-full h-full object-contain"
                            />
                            <div className="absolute top-1 left-1 bg-neutral-900/90 px-1.5 py-0.5 rounded text-[9px] text-violet-400 font-mono flex items-center gap-1">
                              <Play className="w-2.5 h-2.5" />
                              Video Ready
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddProject(false)}
                      className="px-4 py-2 rounded-xl bg-neutral-800 text-xs font-medium text-neutral-300 hover:bg-neutral-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-semibold uppercase tracking-wider text-white"
                    >
                      Save &amp; Publish Project
                    </button>
                  </div>
                </form>
              )}

              {/* Projects List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-rose-400">
                            {project.category}
                          </span>
                          <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded font-mono">
                            {project.label}
                          </span>
                        </div>
                        {project.isCustom && (
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 rounded-lg transition-colors"
                            title="Delete custom project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <h5 className="text-base font-bold text-white font-['Outfit',sans-serif]">
                        {project.name}
                      </h5>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                        {project.headline}
                      </p>

                      {/* Media preview tag in Admin Panel */}
                      {(project.imageUrl || project.videoUrl) && (
                        <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex items-center gap-2">
                          {project.imageUrl && (
                            <img
                              src={project.imageUrl}
                              alt={project.name}
                              className="w-12 h-9 object-cover rounded-lg border border-neutral-800 shrink-0"
                            />
                          )}
                          <div className="flex flex-wrap items-center gap-1.5">
                            {project.imageUrl && (
                              <span className="text-[10px] text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                                <ImageIcon className="w-3 h-3" />
                                Image Attached
                              </span>
                            )}
                            {project.videoUrl && (
                              <span className="text-[10px] text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                                <Video className="w-3 h-3" />
                                Video Attached
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
                      <span>{project.architectureSteps.length} workflow steps</span>
                      <span className="text-neutral-400">{project.specs['Status'] || 'Active'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CONTENT & ANNOUNCEMENTS */}
          {activeTab === 'content' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h4 className="text-lg font-bold font-['Outfit',sans-serif]">
                  Website Announcement &amp; Content Bar
                </h4>
                <p className="text-xs text-neutral-400">
                  Update the global top ticker seen by visitors across desktop and mobile.
                </p>
              </div>

              {contentSavedMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Website content updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveContent} className="space-y-4 p-6 rounded-2xl bg-neutral-950 border border-neutral-800">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                  <div>
                    <span className="text-sm font-semibold text-white block">
                      Announcement Banner Status
                    </span>
                    <span className="text-xs text-neutral-400">
                      Show or hide the top announcement strip above the header
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={announcementEnabled}
                    onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                    className="w-5 h-5 accent-rose-600 rounded cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Announcement Message
                  </label>
                  <textarea
                    rows={3}
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    placeholder="Enter announcement text..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Direct Action Link URL
                  </label>
                  <input
                    type="text"
                    value={announcementUrl}
                    onChange={(e) => setAnnouncementUrl(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    placeholder="https://wa.me/+966509850428"
                  />
                </div>

                {/* Media Attachment for Announcement / Content */}
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                      Optional Media Attachment (Image &amp; Video Upload)
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      Highlights on announcement &amp; showcase
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Image Option */}
                    <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-semibold text-neutral-300 flex items-center gap-1">
                          <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
                          <span>Image Upload (ছবি)</span>
                        </label>
                        {announcementImage && (
                          <button
                            type="button"
                            onClick={() => setAnnouncementImage('')}
                            className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <label className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-white cursor-pointer border border-neutral-700 transition-colors">
                        <Upload className="w-3.5 h-3.5 text-rose-400" />
                        <span>Upload Image File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => setAnnouncementImage(ev.target?.result as string);
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Or Image URL (https://...)"
                        value={announcementImage}
                        onChange={(e) => setAnnouncementImage(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-white placeholder-neutral-600 font-mono"
                      />
                      {announcementImage && (
                        <img
                          src={announcementImage}
                          alt="Announcement preview"
                          className="w-full h-16 object-cover rounded border border-neutral-800"
                        />
                      )}
                    </div>

                    {/* Video Option */}
                    <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-semibold text-neutral-300 flex items-center gap-1">
                          <Video className="w-3.5 h-3.5 text-violet-400" />
                          <span>Video Upload (ভিডিও)</span>
                        </label>
                        {announcementVideo && (
                          <button
                            type="button"
                            onClick={() => setAnnouncementVideo('')}
                            className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <label className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-white cursor-pointer border border-neutral-700 transition-colors">
                        <Upload className="w-3.5 h-3.5 text-violet-400" />
                        <span>Upload Video File</span>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => setAnnouncementVideo(ev.target?.result as string);
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Or Video URL (MP4 / WebM / Link)"
                        value={announcementVideo}
                        onChange={(e) => setAnnouncementVideo(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-white placeholder-neutral-600 font-mono"
                      />
                      {announcementVideo && (
                        <video
                          src={announcementVideo}
                          controls
                          className="w-full h-16 object-contain rounded border border-neutral-800 bg-black"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-semibold uppercase tracking-wider text-white transition-colors cursor-pointer"
                  >
                    Save &amp; Update Website
                  </button>
                </div>
              </form>

              {/* Services Highlight Note */}
              <div className="p-5 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                <h5 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Video className="w-4 h-4 text-violet-400" />
                  Social Media &amp; AI Video Editing Highlights
                </h5>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Your website now prominently features AI-powered video editing, text-to-video reels, avatar production, and high-retention short-form video pipelines under the Social Media Marketing service.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CLIENT INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div>
                  <h4 className="text-lg font-bold font-['Outfit',sans-serif]">
                    Inbound Client Leads &amp; Strategy Calls
                  </h4>
                  <p className="text-xs text-neutral-400">
                    All inquiries submitted through your website form and scheduler are recorded here.
                  </p>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  Total Inquiries: {inquiries.length}
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="py-12 text-center text-neutral-500 text-xs">
                  No inquiries received yet. When visitors submit the consultation form, they will appear here.
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col md:flex-row md:items-start justify-between gap-5"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-bold text-white text-sm">{inq.name}</span>
                          <span className="text-neutral-500">·</span>
                          <span className="text-neutral-400 font-mono text-[11px]">{inq.email}</span>
                          {inq.company && (
                            <>
                              <span className="text-neutral-500">·</span>
                              <span className="text-rose-400">{inq.company}</span>
                            </>
                          )}
                        </div>

                        <div className="text-xs font-semibold text-neutral-300">
                          Focus: <span className="text-rose-400">{inq.service}</span>
                        </div>

                        <p className="text-xs text-neutral-400 bg-neutral-900/80 p-3 rounded-xl border border-neutral-800/80 leading-relaxed">
                          &ldquo;{inq.goals}&rdquo;
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-[11px] text-neutral-500 pt-1">
                          {inq.budget && <span>Budget: {inq.budget}</span>}
                          {inq.timeline && <span>Timeline: {inq.timeline}</span>}
                          {inq.slot && <span>Slot: {inq.slot}</span>}
                          <span>Received: {inq.submittedAt}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-row md:flex-col items-center md:items-end gap-2.5 shrink-0">
                        <select
                          value={inq.status}
                          onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border bg-neutral-900 ${
                            inq.status === 'New'
                              ? 'border-rose-500 text-rose-400'
                              : inq.status === 'Contacted'
                              ? 'border-blue-500 text-blue-400'
                              : 'border-emerald-500 text-emerald-400'
                          }`}
                        >
                          <option value="New">Status: New</option>
                          <option value="Contacted">Status: Contacted</option>
                          <option value="Proposal Sent">Status: Proposal Sent</option>
                          <option value="Closed">Status: Closed</option>
                        </select>

                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${inq.email}?subject=IVQIE Strategy Consultation regarding ${encodeURIComponent(inq.service)}`}
                            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs transition-colors"
                            title="Send Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={`https://wa.me/+966509850428?text=Hello%20${encodeURIComponent(inq.name)},%20this%20is%20IVQIE%20regarding%20your%20inquiry%20for%20${encodeURIComponent(inq.service)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-2 rounded-lg bg-neutral-800 hover:bg-rose-600/20 text-neutral-400 hover:text-rose-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
