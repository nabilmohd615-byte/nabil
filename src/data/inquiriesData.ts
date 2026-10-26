export interface InboundInquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  service: string;
  goals: string;
  budget?: string;
  timeline?: string;
  slot?: string;
  timezone?: string;
  submittedAt: string;
  status: 'New' | 'Contacted' | 'Proposal Sent' | 'Closed';
}

export interface SiteAnnouncement {
  enabled: boolean;
  message: string;
  linkText?: string;
  linkUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
}

const INQUIRIES_KEY = 'ivqie_inbound_inquiries';
const ANNOUNCEMENT_KEY = 'ivqie_site_announcement';

export const INITIAL_ANNOUNCEMENT: SiteAnnouncement = {
  enabled: true,
  message: 'Now onboarding client scopes for AI Automation, AI Video Creation & Growth Marketing worldwide.',
  linkText: 'WhatsApp Direct',
  linkUrl: 'https://wa.me/+966509850428',
};

export function getStoredInquiries(): InboundInquiry[] {
  try {
    const data = localStorage.getItem(INQUIRIES_KEY);
    if (!data) {
      // Seed a sample inquiry so the admin sees how it looks
      const sample: InboundInquiry[] = [
        {
          id: 'IVQ-921844',
          name: 'Ahmed Al-Shehri',
          email: 'ahmed@apexsaudi.com',
          company: 'Apex Logistics Riyadh',
          service: 'AI Automation & Intelligent Agents',
          goals: 'We need automated qualification for WhatsApp & website inquiries and direct CRM sync in HubSpot.',
          budget: '$3,000 – $10,000',
          timeline: 'Within 2–4 weeks',
          submittedAt: 'Today, 10:15 AM',
          status: 'New',
        },
      ];
      return sample;
    }
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // fallback
  }
  return [];
}

export function saveStoredInquiries(inquiries: InboundInquiry[]) {
  try {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
  } catch (err) {
    console.error('Failed to save inquiries to localStorage', err);
  }
}

export function addInboundInquiry(inquiry: Omit<InboundInquiry, 'id' | 'submittedAt' | 'status'>): InboundInquiry {
  const current = getStoredInquiries();
  const newEntry: InboundInquiry = {
    ...inquiry,
    id: 'IVQ-' + Math.floor(100000 + Math.random() * 900000),
    submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    status: 'New',
  };
  const updated = [newEntry, ...current];
  saveStoredInquiries(updated);
  return newEntry;
}

export function getStoredAnnouncement(): SiteAnnouncement {
  try {
    const data = localStorage.getItem(ANNOUNCEMENT_KEY);
    if (!data) return INITIAL_ANNOUNCEMENT;
    return JSON.parse(data);
  } catch {
    return INITIAL_ANNOUNCEMENT;
  }
}

export function saveStoredAnnouncement(announcement: SiteAnnouncement) {
  try {
    localStorage.setItem(ANNOUNCEMENT_KEY, JSON.stringify(announcement));
  } catch (err) {
    console.error('Failed to save announcement', err);
  }
}
