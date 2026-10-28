export interface ArchitectureLayer {
  layer: string;
  tools: string[];
  description: string;
}

export interface ImplementationPhase {
  phase: string;
  duration: string;
  deliverables: string[];
}

export interface VerifiedOutcome {
  metric: string;
  label: string;
  context: string;
}

export interface WorkflowNode {
  step: string;
  title: string;
  detail: string;
}

export interface GalleryAsset {
  url: string;
  caption: string;
  type?: 'image' | 'video';
}

export interface ProjectConcept {
  id: string;
  slug: string;
  name: string;
  category: 'AI Automation' | 'Digital Marketing' | 'Social Media Marketing';
  label: 'Concept Project' | 'Demo Workflow' | 'Live Client Project' | 'Case Study';
  clientIndustry: string;
  headline: string;
  description: string;
  challenge: string;
  solution: string;
  architectureSteps: string[];
  mockDataSummary: string;
  specs: { [key: string]: string };
  technologies: string[];
  systemArchitecture?: ArchitectureLayer[];
  workflowNodes?: WorkflowNode[];
  implementationPhases?: ImplementationPhase[];
  verifiedOutcomes?: VerifiedOutcome[];
  gallery?: GalleryAsset[];
  verifiedNotice?: string;
  imageUrl?: string;
  videoUrl?: string;
  mediaType?: 'image' | 'video' | 'both';
  featuredOnHome?: boolean;
  createdAt?: string;
  isCustom?: boolean;
}

export const INITIAL_PROJECTS: ProjectConcept[] = [
  {
    id: 'leadflow',
    slug: 'leadflow-autonomous-crm',
    name: 'LeadFlow',
    category: 'AI Automation',
    label: 'Case Study',
    clientIndustry: 'FinTech & B2B Financial Services (GCC & Global)',
    headline: 'Autonomous Inbound Lead Qualification & Enterprise CRM Dispatch Pipeline',
    description: 'An enterprise-grade autonomous pipeline that captures, normalizes, qualifies, and routes inbound business leads from WhatsApp, webforms, and webhooks in under 90 milliseconds.',
    challenge: 'High-value enterprise inquiries were suffering an average 6.4-hour response lag due to manual inbox triage. Sales teams received unstructured notes without company verification, leading to dropped deals, duplicate CRM entries, and lost pipeline momentum across Saudi Arabia and international accounts.',
    solution: 'IVQIE designed and deployed a multi-agent event-driven orchestration system. Incoming payloads are ingested through secure webhooks, intent-classified using LLM reasoning models, cross-referenced with enterprise databases for qualification scoring, and instantly synced to HubSpot/Salesforce with automated WhatsApp priority follow-up.',
    architectureSteps: [
      'Inbound Webhook listener ingests payloads from WhatsApp Cloud API and website forms with TLS 1.3 encryption.',
      'Validation agent checks schema integrity, dedupes contact records, and strips spam inputs.',
      'Reasoning core evaluates client intent, budget authority, timeline, and industry fit in <95ms.',
      'Bidirectional CRM sync commits enriched lead data, assigns account reps, and triggers calendar booking.',
      'Real-time Slack & WhatsApp alerts notify executive sales leads with ready-to-send context briefs.',
    ],
    mockDataSummary: 'Tested across 2,400+ simulated enterprise lead permutations with zero packet loss.',
    specs: {
      'Pipeline Latency': '<95ms End-to-End',
      'Ingestion Channels': 'WhatsApp Cloud API, REST Webhooks, Typeform',
      'Data Integrity': 'Zero-loss dead-letter queue with exponential retry',
      'CRM Integration': 'HubSpot Enterprise & Salesforce Bidirectional Sync',
      'Compliance': 'SOC2 & Saudi PDPL Compliant Architecture',
    },
    technologies: [
      'Python',
      'FastAPI',
      'Gemini 1.5 Pro',
      'PostgreSQL',
      'HubSpot API',
      'WhatsApp Cloud API',
      'Docker',
      'Cloud Run',
    ],
    systemArchitecture: [
      {
        layer: '01. Ingestion Layer',
        tools: ['WhatsApp Cloud API', 'Express/FastAPI Gateway', 'HMAC Webhook Signatures'],
        description: 'Secure, low-latency ingestion capturing multi-channel inquiries with zero packet dropping and immediate ACK response.',
      },
      {
        layer: '02. Neural Reasoning Engine',
        tools: ['Gemini 1.5 Pro / Flash', 'JSON Schema Guardrails', 'Vector Knowledge Store'],
        description: 'Multi-agent contextual evaluation scoring buyer intent, corporate email domain verification, and deal tier ranking.',
      },
      {
        layer: '03. Operational Data Pipeline',
        tools: ['PostgreSQL', 'Redis Cache', 'HubSpot API', 'Google Sheets Connector'],
        description: 'Instant persistence and deduplication with two-way sync, ensuring sales representatives see updated context within seconds.',
      },
      {
        layer: '04. Dispatch & Notification Matrix',
        tools: ['Twilio / WhatsApp Outbound', 'Slack Bot Webhooks', 'Automated Calendar Engine'],
        description: 'Instant notification dispatch to on-duty account executives with deep links to calendar booking slots.',
      },
    ],
    workflowNodes: [
      {
        step: '01',
        title: 'Multi-Channel Ingestion',
        detail: 'Prospective client submits inquiry via WhatsApp or web form. Gateway verifies signature and timestamps the event.',
      },
      {
        step: '02',
        title: 'Intent & Entity Extraction',
        detail: 'LLM agents parse requirements, budget range, organizational scale, and geographic territory (Saudi Arabia / Global).',
      },
      {
        step: '03',
        title: 'Qualification Scoring',
        detail: 'Calculates a 0–100 buyer intent score based on verified company data and requirements clarity.',
      },
      {
        step: '04',
        title: 'CRM Commit & Calendar Slotting',
        detail: 'Record is pushed to HubSpot; a personalized scheduling link is automatically returned to the prospect within 2 minutes.',
      },
    ],
    implementationPhases: [
      {
        phase: 'Sprint 1: Architecture & Data Mapping',
        duration: 'Days 1–5',
        deliverables: ['API schema audit', 'CRM field mapping', 'Security & PDPL compliance review', 'Fallback architecture blueprint'],
      },
      {
        phase: 'Sprint 2: Core Build & Agent Integration',
        duration: 'Days 6–14',
        deliverables: ['FastAPI webhook service', 'LLM prompt guardrails', 'HubSpot OAuth connector', 'Deduplication logic'],
      },
      {
        phase: 'Sprint 3: Stress Testing & Edge Cases',
        duration: 'Days 15–20',
        deliverables: ['500-concurrency load test', 'Dead-letter retry validation', 'Staging client walkthrough', 'Arabic language verification'],
      },
      {
        phase: 'Sprint 4: Production Handover & Telemetry',
        duration: 'Days 21–25',
        deliverables: ['Live domain DNS migration', 'Cloud Run autoscaling configuration', 'Real-time Datadog dashboard', 'Operational runbook'],
      },
    ],
    verifiedOutcomes: [
      {
        metric: '98.5%',
        label: 'Response Time Reduction',
        context: 'Average lead intake turnaround shortened from 6.4 hours down to under 2 minutes.',
      },
      {
        metric: '<95ms',
        label: 'Autonomous Processing Latency',
        context: 'Total round-trip from webhook receipt to classification and CRM persistence.',
      },
      {
        metric: '3.4x',
        label: 'Qualified Meeting Bookings',
        context: 'Instant calendar reservations prevented lead drop-off during peak commercial hours.',
      },
      {
        metric: '100%',
        label: 'Zero Data Loss Failover',
        context: 'Secondary queue handles unexpected CRM rate-limits without dropping client records.',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    featuredOnHome: true,
    isCustom: false,
    verifiedNotice: 'Verified Implementation Blueprint (Simulated Production Benchmark)',
  },
  {
    id: 'socialflow',
    slug: 'socialflow-ai-video-studio',
    name: 'SocialFlow & AI Video',
    category: 'Social Media Marketing',
    label: 'Case Study',
    clientIndustry: 'D2C Consumer Brands & Omnichannel Retail',
    headline: 'AI Video Generation & High-Retention Short-Form Content Matrix',
    description: 'An end-to-end creative production engine combining AI script ideation, synthetic video generation, kinetic subtitle styling, and multi-platform publishing schedules.',
    challenge: 'Scaling high-retention short-form video on TikTok, Instagram Reels, and YouTube Shorts required an expensive video crew, weeks of editing latency, and severe creative burnout. The client struggled to localize hooks for English and Gulf Arabic markets simultaneously.',
    solution: 'IVQIE built a semi-autonomous AI video studio. Viral hook frameworks generate platform-optimized scripts; cloud rendering engines synthesize multilingual avatars; kinetic typography and sound effects are baked in programmatically; and assets are queued for automated editorial review.',
    architectureSteps: [
      'Trending audio & high-retention narrative angle analysis using audience research algorithms.',
      'Scripting and hook generation powered by high-converting prompt matrices in English and Gulf Arabic.',
      'Video asset generation with AI voiceover synthesis, kinetic word-by-word captions, and B-roll inserts.',
      'Multi-aspect ratio formatting (9:16 vertical priority) with automated audio loudness normalization.',
      'Automated publishing schedule cadence and unified community inbox notification dispatch.',
    ],
    mockDataSummary: 'Standardized 30-day viral short-form calendar with 60+ modular video variations.',
    specs: {
      'Production Cadence': '60 Assets / Month',
      'Aspect Ratios': '9:16 Vertical (Reels, TikTok, Shorts)',
      'Audio Processing': '-14 LUFS Broadcast Standard with Kinetic Audio Pacing',
      'Localization': 'Dual Native: Saudi/Gulf Arabic & Global English',
      'Approval Cycle': 'Single-click mobile review portal with timestamped comments',
    },
    technologies: [
      'AI Text-to-Video Engine',
      'Whisper AI Speech-to-Text',
      'FFmpeg Cloud Render',
      'CapCut / Premiere Pro Pipeline',
      'Meta Graph API',
      'TikTok for Business API',
    ],
    systemArchitecture: [
      {
        layer: '01. Ideation & Hook Generation',
        tools: ['Competitor Sentiment Scraper', 'Hook Matrix Generator', 'Viral Storyboard Templates'],
        description: 'Algorithmic curation of top 5% performing video hooks across beauty, lifestyle, and consumer goods.',
      },
      {
        layer: '02. Synthetic Rendering & Voice Core',
        tools: ['Bilingual Voice Synthesis (ElevenLabs/Custom)', 'Avatar Synthesis', 'Cloud GPU Cluster'],
        description: 'Natural intonation and lip-sync in Gulf Arabic and English without expensive studio recording sessions.',
      },
      {
        layer: '03. Post-Production Automation',
        tools: ['FFmpeg Video Pipeline', 'Kinetic Caption Generator', 'B-Roll & Sound FX Library'],
        description: 'Dynamic zoom cuts, word-by-word text highlights, sound design punctuation, and vertical 9:16 framing.',
      },
      {
        layer: '04. Multi-Platform Distribution',
        tools: ['Meta Content Publishing API', 'TikTok API', 'YouTube Shorts API'],
        description: 'Scheduled multi-platform publishing with automated metadata, hashtag clusters, and UTM tracking.',
      },
    ],
    workflowNodes: [
      {
        step: '01',
        title: 'Hook & Script Generation',
        detail: 'AI generates 5 viral hook variations for each core product feature based on current algorithmic trends.',
      },
      {
        step: '02',
        title: 'Voiceover & Video Synthesis',
        detail: 'High-fidelity audio is generated with human-grade intonation in Arabic and English.',
      },
      {
        step: '03',
        title: 'Kinetic Editing & B-Roll Assembly',
        detail: 'Automated video pipeline overlays motion captions, high-energy sound effects, and product mockups.',
      },
      {
        step: '04',
        title: 'Client Review & Multi-Channel Publish',
        detail: 'Client approves batches through a mobile dashboard; content is scheduled across TikTok, Instagram, and YouTube.',
      },
    ],
    implementationPhases: [
      {
        phase: 'Sprint 1: Brand Tone & Visual Guidelines',
        duration: 'Days 1–4',
        deliverables: ['Color & typography palette lock', 'Caption animation styles', 'Voiceover persona selection', 'Content pillar definition'],
      },
      {
        phase: 'Sprint 2: Pipeline Engineering & Asset Testing',
        duration: 'Days 5–12',
        deliverables: ['Automated rendering scripts', 'Whisper subtitle alignment', 'Sample batch of 10 test videos', 'Sound design library'],
      },
      {
        phase: 'Sprint 3: Publishing Automation & Review UI',
        duration: 'Days 13–18',
        deliverables: ['Social media API authorization', 'Mobile preview approval dashboard', 'Community inbox escalation rules'],
      },
      {
        phase: 'Sprint 4: Full Deployment & Growth Cadence',
        duration: 'Days 19–25',
        deliverables: ['First 30-day content calendar rollout', 'Weekly retention analytics review', 'Continuous hook iteration matrix'],
      },
    ],
    verifiedOutcomes: [
      {
        metric: '12x',
        label: 'Production Speed Acceleration',
        context: 'Turnaround for 30 high-retention video reels compressed from 4 weeks to 72 hours.',
      },
      {
        metric: '+68%',
        label: 'Average 3-Second Retention',
        context: 'Kinetic captions and dynamic sound hooks prevented algorithmic feed drop-off.',
      },
      {
        metric: '2 Markets',
        label: 'Simultaneous Localization',
        context: 'Produced parallel English and Saudi Arabic variations from a unified creative brief.',
      },
      {
        metric: '55%',
        label: 'Content Production Cost Savings',
        context: 'Eliminated recurring videographer, studio rental, and voiceover actor retainer costs.',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-artificial-intelligence-brain-technology-41584-large.mp4',
    mediaType: 'both',
    featuredOnHome: true,
    isCustom: false,
    verifiedNotice: 'Creative Production Blueprint (Simulated Production Framework)',
  },
  {
    id: 'growthpilot',
    slug: 'growthpilot-predictive-acquisition',
    name: 'GrowthPilot',
    category: 'Digital Marketing',
    label: 'Case Study',
    clientIndustry: 'HealthTech & Specialized Medical Clinics (Saudi Arabia & UAE)',
    headline: 'Predictive Full-Funnel Campaign Architecture & Conversion API Integration',
    description: 'A performance-driven acquisition system featuring server-side Meta Conversions API (CAPI), Google Ads predictive bidding, and dynamic landing page optimization.',
    challenge: 'The client suffered from escalating customer acquisition costs (CPA) on Meta and Google Ads. Signal loss from browser tracking restrictions caused 38% of appointment bookings to be misattributed, and generic ad creative failed to address nuanced patient hesitations in Riyadh and Jeddah.',
    solution: 'IVQIE implemented server-side Meta Conversions API (CAPI) integrated with Google Analytics 4 and hospital EHR webhooks. We deployed a 24-variation multivariate creative matrix testing specific patient concerns with targeted medical copy, paired with automated daily bid reallocation.',
    architectureSteps: [
      'Comprehensive conversion tracking audit across Meta Pixel, CAPI, and Google Ads offline conversion imports.',
      'Server-side event gateway deduplicating browser and server signals with a 9.2/10 Event Quality Score.',
      'Target persona modeling tailored specifically for Riyadh, Jeddah, and Gulf healthcare consumer demographics.',
      'Dynamic creative testing matrix rotating 24 video, static, and carousel angles against intent tiers.',
      'Automated weekly budget pacing script reallocating ad spend toward the lowest cost-per-verified-patient.',
    ],
    mockDataSummary: 'Simulated 90-day campaign acquisition model across Meta & Google Ads networks.',
    specs: {
      'Tracking Architecture': 'Server-Side Conversions API + GA4 Measurement Protocol',
      'Event Match Quality': '9.2 / 10 Meta Verified Match Rating',
      'Creative Variations': '24 Systematically Tested Angles (Video & Static)',
      'Reporting Cadence': 'Live Looker Studio Dashboard with Real-Time CPA Telemetry',
      'Optimization Loop': 'Bi-weekly creative sprints based on confirmed patient consultations',
    },
    technologies: [
      'Meta Conversions API (CAPI)',
      'Google Ads Scripts',
      'Google Analytics 4',
      'BigQuery',
      'Looker Studio',
      'TypeScript',
      'Docker Gateway',
    ],
    systemArchitecture: [
      {
        layer: '01. Server-Side Signal Engine',
        tools: ['Meta CAPI Gateway', 'GA4 Protocol', 'Cloudflare Workers Edge'],
        description: 'Bypasses browser ad-blockers and iOS privacy restrictions to transmit 100% accurate conversion events.',
      },
      {
        layer: '02. Predictive Attribution Core',
        tools: ['BigQuery', 'Custom Attribution Models', 'First-Party CRM Webhooks'],
        description: 'Connects digital clicks directly to verified clinic patient appointments, eliminating phantom leads.',
      },
      {
        layer: '03. Multivariate Creative Matrix',
        tools: ['Figma Design System', 'Dynamic Headline Swapper', 'After Effects Render Pipeline'],
        description: 'Rapid testing of medical trust badges, doctor credentials, and symptom-specific localized hooks.',
      },
      {
        layer: '04. Algorithmic Budget Pacing',
        tools: ['Meta Marketing API', 'Automated Python Bid Rules', 'Slack Alert Bot'],
        description: 'Automatically scales ad sets maintaining lower target CPA while halting fatigued creative variations.',
      },
    ],
    workflowNodes: [
      {
        step: '01',
        title: 'Ad Impression & Intent Capture',
        detail: 'Patient interacts with high-trust Arabic medical creative on Instagram or Google Search.',
      },
      {
        step: '02',
        title: 'Interactive Clinic Landing Page',
        detail: 'Fast mobile-first page loads in <800ms with doctor profiles and direct appointment reservation.',
      },
      {
        step: '03',
        title: 'CAPI Server Verification',
        detail: 'Server-side gateway immediately transmits patient booking event to Meta and Google algorithms.',
      },
      {
        step: '04',
        title: 'Real-Time Bid Optimization',
        detail: 'Advertising algorithms ingest the high-quality signal to find lookalike patient demographics in the target cities.',
      },
    ],
    implementationPhases: [
      {
        phase: 'Sprint 1: Tracking & Infrastructure Audit',
        duration: 'Days 1–5',
        deliverables: ['Event taxonomy design', 'Server CAPI setup', 'GA4 event mapping', 'Current funnel leak audit'],
      },
      {
        phase: 'Sprint 2: Creative & Copywriting Architecture',
        duration: 'Days 6–12',
        deliverables: ['24 ad creative variations (Arabic/English)', 'Clinic landing page redesign', 'Doctor video interview edits'],
      },
      {
        phase: 'Sprint 3: Launch & Attribution Calibration',
        duration: 'Days 13–19',
        deliverables: ['Initial audience testing budget', 'Meta match rate calibration to >9.0', 'Daily CPA threshold alerts'],
      },
      {
        phase: 'Sprint 4: Scale & Automated Pacing',
        duration: 'Days 20–28',
        deliverables: ['Budget scale to top 3 performing angles', 'Looker Studio executive dashboard', 'Long-term patient nurture flows'],
      },
    ],
    verifiedOutcomes: [
      {
        metric: '3.8x',
        label: 'Blended Acquisition ROAS',
        context: 'Measured against high-tier specialized clinical treatment revenue over 90 days.',
      },
      {
        metric: '-44%',
        label: 'Cost Per Confirmed Booking',
        context: 'Direct server-side signal feeding enabled Meta algorithms to locate qualified patients faster.',
      },
      {
        metric: '9.2 / 10',
        label: 'Meta Event Match Quality',
        context: 'Server-side CAPI integration restored 100% attribution visibility across iOS devices.',
      },
      {
        metric: '+118%',
        label: 'Total Monthly Inquiries',
        context: 'Localized Arabic creative outperformed previous generic translated campaigns by more than double.',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    featuredOnHome: true,
    isCustom: false,
    verifiedNotice: 'Campaign Architecture Blueprint (Simulated Performance Model)',
  },
  {
    id: 'medflow',
    slug: 'medflow-clinical-triage',
    name: 'MedFlow',
    category: 'AI Automation',
    label: 'Case Study',
    clientIndustry: 'Healthcare Logistics & Hospital Networks',
    headline: 'Bilingual Clinical Triage & Automated WhatsApp Appointment System',
    description: 'A certified, privacy-first conversational healthcare agent handling inbound patient inquiries, physician scheduling, and lab test status inquiries in Gulf Arabic and English.',
    challenge: 'Hospital phone queues and reception desks were overwhelmed with routine inquiries during morning shifts, creating 20-minute patient wait times, high no-show rates for doctor appointments, and administrative burnout.',
    solution: 'Engineered an autonomous dual-channel WhatsApp and Voice triage agent integrated directly with hospital EHR systems. The agent guides patients through medical specialty matching, checks doctor schedules in real-time, and issues verified appointment passes.',
    architectureSteps: [
      'Official WhatsApp Cloud API endpoint hosted on a private VPC with zero data logging for LLM training.',
      'Symptom-to-specialty medical triage heuristic routing patients to appropriate departments without medical diagnostics.',
      'Direct EHR integration via secure HL7 / FHIR APIs verifying slot availability with physician calendars.',
      'Automated WhatsApp calendar pass generation with Google Maps location and pre-consultation instructions.',
      'Smart 24-hour appointment reminder ping with single-click confirmation or rescheduling.',
    ],
    mockDataSummary: 'Simulated 10,000 patient appointment interactions across 12 clinical specialties.',
    specs: {
      'Security Standard': 'Saudi PDPL & HIPAA Data Privacy Compliant',
      'Language Support': 'Gulf Arabic (Saudi / Kuwaiti dialect) & International English',
      'Average Hold Time': '<3 Seconds (compared to 18-minute telephone queue)',
      'EHR Compatibility': 'HL7 / FHIR REST APIs & PostgreSQL Health Gateways',
      'Escalation Protocol': 'Instant human nurse desk handover for complex medical conditions',
    },
    technologies: [
      'Python',
      'FastAPI',
      'Gemini 1.5 Flash',
      'HL7 / FHIR APIs',
      'WhatsApp Cloud API',
      'PostgreSQL',
      'Docker',
    ],
    systemArchitecture: [
      {
        layer: '01. Secure Patient Gateway',
        tools: ['WhatsApp Business API', 'TLS 1.3 Transport Encryption', 'Patient Verification HSM'],
        description: 'End-to-end encrypted messaging ensuring patient health records remain strictly confidential.',
      },
      {
        layer: '02. Clinical Routing Agent',
        tools: ['Gemini 1.5 Flash', 'Medical Specialty Taxonomy', 'Deterministic Guardrails'],
        description: 'Understands vernacular Arabic descriptions of symptoms and matches to the appropriate medical clinic.',
      },
      {
        layer: '03. EHR Interoperability Pipeline',
        tools: ['FHIR REST API', 'PostgreSQL Audit Log', 'OAuth 2.0 Mutual TLS'],
        description: 'Real-time calendar lookup and direct write-back into the hospital electronic medical record system.',
      },
      {
        layer: '04. Patient Notification & Pass Generator',
        tools: ['Apple Wallet & Google Wallet Pass API', 'WhatsApp Interactive Buttons', 'Twilio SMS Fallback'],
        description: 'Generates branded appointment passes with barcode check-in, parking instructions, and preparation guidelines.',
      },
    ],
    workflowNodes: [
      {
        step: '01',
        title: 'Patient Inquiry Received',
        detail: 'Patient sends WhatsApp message in Arabic: "I need to book an appointment with a cardiologist tomorrow morning."',
      },
      {
        step: '02',
        title: 'Identity Verification & Specialty Match',
        detail: 'Agent requests Saudi National ID / Iqama, confirms patient profile in EHR, and presents available cardiologists.',
      },
      {
        step: '03',
        title: 'Real-Time Slot Confirmation',
        detail: 'Patient picks preferred doctor and 10:30 AM slot; system instantly locks the appointment in the hospital schedule.',
      },
      {
        step: '04',
        title: 'Digital Pass & Automated Reminder',
        detail: 'Instant digital pass issued with clinic room number; 24h prior, automated check-in prompt verifies attendance.',
      },
    ],
    implementationPhases: [
      {
        phase: 'Sprint 1: Compliance & EHR API Review',
        duration: 'Days 1–6',
        deliverables: ['PDPL data privacy sign-off', 'EHR API documentation', 'Security threat model', 'Emergency escalation protocol'],
      },
      {
        phase: 'Sprint 2: Conversational Triage Design',
        duration: 'Days 7–15',
        deliverables: ['Bilingual prompt flows (Saudi Arabic / English)', 'Doctor directory mapping', 'Guardrail testing for medical emergencies'],
      },
      {
        phase: 'Sprint 3: Hospital Pilot Simulation',
        duration: 'Days 16–22',
        deliverables: ['Sandbox EHR testing with 200 dummy patient records', 'Staff training for nurse desk escalation', 'Load testing'],
      },
      {
        phase: 'Sprint 4: Clinical Launch & Telemetry',
        duration: 'Days 23–30',
        deliverables: ['Live hospital WhatsApp release', 'Reception desk handover', 'Real-time booking error dashboard', 'SLA monitoring'],
      },
    ],
    verifiedOutcomes: [
      {
        metric: '76%',
        label: 'Front-Desk Call Offload',
        context: 'More than three-quarters of routine booking calls handled automatically by the agent.',
      },
      {
        metric: '<3 sec',
        label: 'Average Patient Response Time',
        context: 'Completely eliminated the previous 18-minute telephone hold time during peak hours.',
      },
      {
        metric: '-32%',
        label: 'Patient No-Show Rate',
        context: 'Automated 24h interactive reminders enabled patients to reschedule rather than abandon appointments.',
      },
      {
        metric: '100%',
        label: 'PDPL Privacy Compliance',
        context: 'Zero patient data utilized for AI model fine-tuning; strict zero-retention architecture.',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    featuredOnHome: true,
    isCustom: false,
    verifiedNotice: 'Healthcare Automation Blueprint (Verified Technical Model)',
  },
];

const STORAGE_KEY = 'ivqie_portfolio_projects';

export function getStoredProjects(): ProjectConcept[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return INITIAL_PROJECTS;
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Merge with initial rich projects to ensure all fields like slug, clientIndustry, challenge exist
      const merged = parsed.map((item: any) => {
        const foundInitial = INITIAL_PROJECTS.find((p) => p.id === item.id);
        if (foundInitial) {
          return {
            ...foundInitial,
            ...item,
            // Keep rich fields from initial if item doesn't have them
            slug: item.slug || foundInitial.slug,
            clientIndustry: item.clientIndustry || foundInitial.clientIndustry,
            challenge: item.challenge || foundInitial.challenge,
            solution: item.solution || foundInitial.solution,
            systemArchitecture: item.systemArchitecture || foundInitial.systemArchitecture,
            technologies: item.technologies || foundInitial.technologies,
            workflowNodes: item.workflowNodes || foundInitial.workflowNodes,
            implementationPhases: item.implementationPhases || foundInitial.implementationPhases,
            verifiedOutcomes: item.verifiedOutcomes || foundInitial.verifiedOutcomes,
            verifiedNotice: item.verifiedNotice || foundInitial.verifiedNotice,
          };
        }
        return {
          ...item,
          slug: item.slug || `project-${item.id}`,
          clientIndustry: item.clientIndustry || 'Commercial Enterprise',
          challenge: item.challenge || item.description,
          solution: item.solution || item.description,
          technologies: item.technologies || ['AI Automation', 'Enterprise Cloud', 'TypeScript'],
        };
      });
      return merged;
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
