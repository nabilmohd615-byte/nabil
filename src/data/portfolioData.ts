export interface ProjectConcept {
  id: string;
  name: string;
  category: 'AI Automation' | 'Digital Marketing' | 'Social Media Marketing';
  label: 'Concept Project' | 'Demo Workflow' | 'Live Client Project' | 'Case Study';
  headline: string;
  description: string;
  architectureSteps: string[];
  mockDataSummary: string;
  specs: { [key: string]: string };
  imageUrl?: string;
  createdAt?: string;
  isCustom?: boolean;
}

export const INITIAL_PROJECTS: ProjectConcept[] = [
  {
    id: 'leadflow',
    name: 'LeadFlow',
    category: 'AI Automation',
    label: 'Demo Workflow',
    headline: 'Automated Inbound Lead Qualification & CRM Dispatch Pipeline',
    description: 'A demonstration workflow showing how a lead submitted through an approved form can be validated, organized, recorded in a CRM, and routed for human follow-up.',
    architectureSteps: [
      'Inbound Webhook triggers on form submission with field validation.',
      'AI classification categorizes intent, estimated deal value, and priority score.',
      'HubSpot/Database record created with enriched contact metadata.',
      'Instant Slack or WhatsApp alert generated for internal sales triage.',
      'Human confirmation required for high-tier enterprise outreach.',
    ],
    mockDataSummary: 'Simulates 50+ lead variations across B2B SaaS, Real Estate, and Professional Services.',
    specs: {
      'Pipeline Type': 'Event-driven Webhook + LLM Agent',
      'Payload Handling': 'JSON schema validated',
      'Failover': 'Dead-letter queue with retry logic',
      'Status': 'Functional Blueprint Available',
    },
    isCustom: false,
  },
  {
    id: 'socialflow',
    name: 'SocialFlow & AI Video',
    category: 'Social Media Marketing',
    label: 'Concept Project',
    headline: 'AI Video Generation & High-Retention Content Pipeline',
    description: 'An end-to-end social media system integrating AI-generated video avatars, text-to-video reels, dynamic captions, sound design, and structured publishing schedules for maximum audience engagement.',
    architectureSteps: [
      'Scripting & hook generation powered by high-converting AI prompts.',
      'Text-to-Video generation and AI avatar voice synthesis (bilingual EN/AR).',
      'High-retention editing with kinetic typography, sound effects & B-roll inserts.',
      'Multi-platform optimization for Instagram Reels, TikTok, and YouTube Shorts.',
      'Automated publishing cadence and community inbox triage.',
    ],
    mockDataSummary: 'Standardized 30-day viral short-form calendar with AI video storyboards and metrics tracking.',
    specs: {
      'Video Engine': 'AI Text-to-Video + CapCut / Premiere Pro Workflow',
      'Output Formats': '9:16 Vertical Video (Reels, TikTok, Shorts)',
      'Review Loop': '48-hour client preview & sign-off milestones',
      'Status': 'Production Framework Available',
    },
    isCustom: false,
  },
  {
    id: 'growthpilot',
    name: 'GrowthPilot',
    category: 'Digital Marketing',
    label: 'Demo Workflow',
    headline: 'Full-Funnel Campaign Architecture & Audience Hypothesis Engine',
    description: 'A demonstration campaign-planning dashboard showing audience hypotheses, creative variations, funnel stages, and reporting structure.',
    architectureSteps: [
      'Target persona modeling (Geography: Gulf Region, South Asia, North America).',
      'Top-of-Funnel awareness angles vs. Bottom-of-Funnel intent offers.',
      'Tracking taxonomy: UTM conventions, Meta Conversions API & GA4 events.',
      'A/B creative test matrix across hooks, thumbnails, and copy length.',
      'Weekly decision review cadence based on real cost-per-qualified-inquiry.',
    ],
    mockDataSummary: 'Interactive campaign roadmap modeling 3 test budget tiers without fabricated ROAS.',
    specs: {
      'Platforms': 'Meta Ads Manager & Google Ads',
      'Attribution': 'Server-side Conversions API + GA4',
      'Optimization Loop': 'Bi-weekly creative iteration',
      'Status': 'Strategic Framework Available',
    },
    isCustom: false,
  },
];

const STORAGE_KEY = 'ivqie_portfolio_projects';

export function getStoredProjects(): ProjectConcept[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return INITIAL_PROJECTS;
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // fallback
  }
  return INITIAL_PROJECTS;
}

export function saveStoredProjects(projects: ProjectConcept[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save projects to localStorage', err);
  }
}
