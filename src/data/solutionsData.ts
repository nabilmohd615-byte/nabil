export interface IndustrySolution {
  slug: string;
  industry: string;
  headline: string;
  tagline: string;
  badge: string;
  painPoints: {
    issue: string;
    impact: string;
  }[];
  systemSolutions: {
    title: string;
    description: string;
    features: string[];
  }[];
  metrics: {
    value: string;
    label: string;
    subtext: string;
  }[];
  regulatoryCompliance: string[];
  recommendedServices: string[];
}

export const INDUSTRY_SOLUTIONS: IndustrySolution[] = [
  {
    slug: 'healthcare',
    industry: 'Healthcare & Specialized Medical Clinics',
    badge: 'Clinical Grade Systems',
    tagline: 'Autonomous patient intake, intelligent appointment triage, and bilingual voice coordination.',
    headline: 'Eliminate patient phone queues, reduce missed appointments, and safeguard patient data.',
    painPoints: [
      {
        issue: 'Overloaded Reception Desks',
        impact: 'Up to 34% of inbound patient calls go to voicemail during peak clinic hours, resulting in lost bookings.',
      },
      {
        issue: 'High Appointment No-Show Rates',
        impact: 'Clinics lose up to 18-25% of specialist consultation slots due to unconfirmed or forgotten bookings.',
      },
      {
        issue: 'Strict Data Privacy (Saudi PDPL & HIPAA)',
        impact: 'Staff informally messaging patients on personal WhatsApp accounts risks catastrophic regulatory penalties.',
      },
    ],
    systemSolutions: [
      {
        title: 'Bilingual Clinical Voice & WhatsApp Receptionist',
        description: 'Answers patient inquiries in fluent Gulf/Najdi Arabic and English, verifying doctor availability, clinic procedures, and booking appointments directly into EHR/EMR systems.',
        features: [
          'Automatic doctor schedule synchronization',
          'Symptom intake triage without prescribing medical advice',
          'Instant WhatsApp booking confirmation with clinic location pins',
        ],
      },
      {
        title: 'Automated 3-Stage Patient Confirmation Loop',
        description: 'Automated WhatsApp interactive reminders at 48h, 24h, and 2h with one-tap reschedule or cancellation buttons that immediately backfill freed slots.',
        features: [
          'Waitlist auto-backfill filling cancelled appointments in <4 minutes',
          'Pre-appointment medical history questionnaire capture',
          'Automated driving directions and parking instructions',
        ],
      },
      {
        title: 'PDPL-Compliant Medical Records Vault',
        description: 'End-to-end encrypted messaging gateway that masks patient PII and logs every patient interaction to institutional medical records.',
        features: [
          'Encrypted audit trails compliant with Saudi Ministry of Health standards',
          'Role-based access ensuring only authorized medical practitioners view intake notes',
          'Zero training on private clinical records',
        ],
      },
    ],
    metrics: [
      { value: '98%', label: 'Inbound Call Capture', subtext: 'Zero patients placed on hold' },
      { value: '-65%', label: 'No-Show Reduction', subtext: 'Via proactive 3-stage WhatsApp loop' },
      { value: '100%', label: 'Saudi PDPL Compliance', subtext: 'Local cloud residency and zero PII leakage' },
    ],
    regulatoryCompliance: ['Saudi PDPL', 'MOH KSA Health Standards', 'HIPAA Ready', 'ISO 27001'],
    recommendedServices: ['ai-voice-assistants', 'conversational-ai', 'workflow-automation'],
  },
  {
    slug: 'fintech',
    industry: 'FinTech, Wealth Management & Banking',
    badge: 'Mission-Critical Reliability',
    tagline: 'Sub-second inbound lead qualification, real-time KYC triage, and secure client communication.',
    headline: 'Accelerate high-net-worth deal onboarding while enforcing deterministic regulatory compliance.',
    painPoints: [
      {
        issue: 'Slow High-Ticket Inbound Triage',
        impact: 'Ultra-high-net-worth inquiries take hours to reach senior relationship managers, eroding client trust.',
      },
      {
        issue: 'Manual AML/KYC Pre-Screening Bottlenecks',
        impact: 'Onboarding analysts spend 40% of their day manually copying registry data and tax numbers into compliance software.',
      },
      {
        issue: 'Disjointed Communication Records',
        impact: 'Advisors communicating across unlogged phone calls and personal messaging creates severe compliance vulnerabilities.',
      },
    ],
    systemSolutions: [
      {
        title: 'Instant Enterprise Lead Routing (<95ms)',
        description: 'Event-driven pipeline that qualifies accredited investors, checks company registries, and alerts the designated wealth manager on Slack & WhatsApp instantly.',
        features: [
          'Immediate verification against national corporate registries',
          'High-value priority routing directly to executive sales desks',
          'Automated NDA delivery and biometric e-signature dispatch',
        ],
      },
      {
        title: 'Automated KYC Document Verification Agent',
        description: 'AI vision pipeline that validates national IDs, commercial registrations (CR), and proof of address, cross-referencing watchlists in seconds.',
        features: [
          'Sub-3 second document integrity & tamper detection',
          'Instant tax and CR registry lookup (Wathq / ZATCA compliant)',
          'Automated discrepancy alerts for compliance officers',
        ],
      },
      {
        title: 'Institutional Audit & Archival Mesh',
        description: 'Captures and cryptographically signs every client conversation, WhatsApp thread, and lead event into an immutable compliance vault.',
        features: [
          'WORM (Write Once Read Many) compliant audit logging',
          'Automated SAR (Suspicious Activity Report) flagging',
          'Encrypted SAMA compliance reporting exports',
        ],
      },
    ],
    metrics: [
      { value: '<95ms', label: 'Lead Triage Latency', subtext: 'From form submission to advisor alert' },
      { value: '4.2x', label: 'Faster KYC Cycle', subtext: 'From initial document submission to account approval' },
      { value: 'Zero', label: 'Compliance Infractions', subtext: 'Across all automated investor audit trails' },
    ],
    regulatoryCompliance: ['SAMA Guidelines', 'Saudi PDPL', 'SOC 2 Type II', 'PCI-DSS'],
    recommendedServices: ['ai-agents', 'crm-automation', 'workflow-automation'],
  },
  {
    slug: 'ecommerce',
    industry: 'D2C E-Commerce & Retail Brands',
    badge: 'Omnichannel Conversion',
    tagline: 'Automated WhatsApp commerce, AI product catalog enrichment, and 24/7 post-purchase support.',
    headline: 'Turn customer support from a cost center into a high-converting repeat revenue generator.',
    painPoints: [
      {
        issue: 'Cart Abandonment & Post-Purchase Anxiety',
        impact: '68% of shoppers abandon carts or flood support channels with "Where is my order?" (WISMO) tickets.',
      },
      {
        issue: 'Catalog Operations Scaling Limits',
        impact: 'Adding hundreds of new SKUs requires weeks of manual copy, localized translations, and manual tagging.',
      },
      {
        issue: 'High COD (Cash on Delivery) Return Rates',
        impact: 'In GCC markets, unconfirmed COD orders result in a 25-35% return-to-origin (RTO) rate.',
      },
    ],
    systemSolutions: [
      {
        title: 'Autonomous WhatsApp Order & WISMO Concierge',
        description: 'Direct integration with Shopify, Salla, and Zid that handles tracking queries, returns, and address changes instantly via conversational WhatsApp.',
        features: [
          'Instant courier tracking lookup with live package status updates',
          'Automated COD confirmation bot verifying phone and address before shipping',
          'Self-service 1-click return and exchange processing',
        ],
      },
      {
        title: 'AI Smart Catalog & Creative Engine',
        description: 'Ingests supplier spec sheets and photos to generate high-converting Arabic & English product copy, SEO metadata, and localized social video scripts.',
        features: [
          'Bulk SKU copy generation aligned with brand tone of voice',
          'Automated feature extraction and comparison matrix synthesis',
          'Dynamic video ad storyboard generation for TikTok and Meta',
        ],
      },
      {
        title: 'Conversational Upsell & Reorder Engine',
        description: 'Analyzes past purchasing behavior to trigger personalized replenishment suggestions and exclusive VIP offers on WhatsApp at the exact moment of need.',
        features: [
          'Predictive replenishment timing based on consumption cycles',
          'Native WhatsApp payment links with zero checkout friction',
          'VIP loyalty tier rewards automation',
        ],
      },
    ],
    metrics: [
      { value: '-48%', label: 'RTO Return Rate Reduction', subtext: 'Achieved through automated COD verification' },
      { value: '89%', label: 'Automated Ticket Resolution', subtext: 'Handling WISMO and order updates with zero human touch' },
      { value: '+24%', label: 'WhatsApp Cart Recovery', subtext: 'Via conversational abandoned cart sequences' },
    ],
    regulatoryCompliance: ['E-Commerce Council KSA', 'Saudi PDPL', 'GDPR', 'ZATCA Phase 2'],
    recommendedServices: ['conversational-ai', 'custom-ai-integrations', 'workflow-automation'],
  },
  {
    slug: 'logistics',
    industry: 'Logistics, Freight & Supply Chain',
    badge: 'Operational Telemetry',
    tagline: 'Autonomous customs documentation, fleet exception handling, and real-time dispatcher copilots.',
    headline: 'Eliminate freight document errors, accelerate port clearance, and automate carrier communications.',
    painPoints: [
      {
        issue: 'Customs & Waybill Documentation Errors',
        impact: 'Manual keying of bills of lading and commercial invoices causes costly demurrage and port holds.',
      },
      {
        issue: 'Driver & Dispatcher Communication Chaos',
        impact: 'Dispatchers spend 5+ hours daily fielding phone calls about dock availability and pickup delays.',
      },
      {
        issue: 'Carrier Invoice Discrepancies',
        impact: 'Accessorial charges, fuel surcharges, and detention fees take weeks to audit and reconcile.',
      },
    ],
    systemSolutions: [
      {
        title: 'Intelligent Bill of Lading & Waybill Extractor',
        description: 'Computer vision and document AI that parses multilingual shipping manifests, commercial invoices, and packing lists with zero manual transcription.',
        features: [
          'Extracts container numbers, HS codes, and customs tariffs instantly',
          'Validates weights and declarations against booking manifests',
          'Direct integration into customs clearance portals (FASAH KSA compliant)',
        ],
      },
      {
        title: 'Autonomous Driver & Delivery WhatsApp Hub',
        description: 'Interactive voice and WhatsApp bot that guides truck drivers with dock arrival instructions, electronic proof-of-delivery (ePOD) capture, and gate passes.',
        features: [
          'Real-time WhatsApp location sharing and ETA updates',
          'Automated ePOD photo upload and barcode scanning',
          'Automated detention time tracking and timestamps',
        ],
      },
      {
        title: 'Carrier Freight Audit & Auto-Reconciliation',
        description: 'Compares carrier invoices against contract rate cards and actual GPS track logs, flagging discrepancies for immediate claim filing.',
        features: [
          'Automated spot rate vs contract rate variance detection',
          'Instant detection of unauthorized detention or fuel charges',
          'Direct synchronization into SAP Transportation Management and Oracle ERP',
        ],
      },
    ],
    metrics: [
      { value: '99.4%', label: 'Customs Document Accuracy', subtext: 'Eliminating manual keying demurrage fees' },
      { value: '-72%', label: 'Dispatcher Phone Inquiries', subtext: 'Shifted to automated WhatsApp driver portal' },
      { value: '4.8x', label: 'Faster Carrier Invoice Audit', subtext: 'Reconciling thousands of freight bills weekly' },
    ],
    regulatoryCompliance: ['FASAH Platform Standards', 'Zakat, Tax and Customs Authority (ZATCA)', 'IATA Cargo Standards'],
    recommendedServices: ['workflow-automation', 'ai-agents', 'custom-ai-integrations'],
  },
  {
    slug: 'real-estate',
    industry: 'Real Estate & Property Development',
    badge: 'High-Value Conversion',
    tagline: 'Ultra-fast buyer qualification, automated brochure delivery, and VIP viewing coordination.',
    headline: 'Never lose a million-dollar real estate buyer to a delayed response or missed phone call.',
    painPoints: [
      {
        issue: 'Slow Inbound Response to Ad Campaigns',
        impact: 'Real estate leads go cold within 15 minutes of submitting an inquiry on Meta, TikTok, or Google Ads.',
      },
      {
        issue: 'Unqualified Viewing Appointments',
        impact: 'Brokers waste up to 60% of their viewing days touring buyers who lack purchasing power or mortgage pre-approval.',
      },
      {
        issue: 'Disorganized Property Inventory Sharing',
        impact: 'Brokers manually email PDF brochures and floorplans, losing track of which units are already reserved.',
      },
    ],
    systemSolutions: [
      {
        title: 'Sub-60-Second WhatsApp Qualification Concierge',
        description: 'Instant conversational engagement on WhatsApp immediately upon lead capture, confirming budget, desired bedrooms, payment terms, and residency status.',
        features: [
          'Interactive WhatsApp floorplan and video tour delivery',
          'Automated buyer qualification scoring (Cash vs Mortgage, Investor vs End-User)',
          'Direct calendar booking with senior portfolio directors',
        ],
      },
      {
        title: 'Live Inventory & Unit Reservation Bridge',
        description: 'Connects your CRM directly to property inventory master sheets, showing brokers and buyers real-time unit availability and payment schedules.',
        features: [
          'Instant unit hold locks preventing double booking',
          'Dynamic payment schedule generation (Off-Plan & Post-Handover)',
          'Automated booking deposit link generation',
        ],
      },
      {
        title: 'AI Voice Receptionist for Developer Inbound Calls',
        description: 'Answers project hotline calls 24/7, explaining masterplan features, handover dates, and qualifying callers before transferring to top agents.',
        features: [
          'Sub-600ms conversational phone responses in Arabic and English',
          'Instant SMS/WhatsApp with developer project brochure sent while on the phone',
          'Automated call summary committed directly to Salesforce / HubSpot',
        ],
      },
    ],
    metrics: [
      { value: '<45s', label: 'Average Lead Response Time', subtext: 'From online ad click to personalized WhatsApp interaction' },
      { value: '3.8x', label: 'Increase in Qualified Viewings', subtext: 'Brokers meet exclusively pre-vetted buyers' },
      { value: '+55%', label: 'Brochure Open & Engagement Rate', subtext: 'Delivered via native WhatsApp interactive cards' },
    ],
    regulatoryCompliance: ['REGA (Real Estate General Authority KSA)', 'Saudi PDPL', 'Wafi Off-Plan Regulations'],
    recommendedServices: ['ai-voice-assistants', 'crm-automation', 'conversational-ai'],
  },
  {
    slug: 'professional-services',
    industry: 'Professional Services, Law & Consulting',
    badge: 'Client Advisory Systems',
    tagline: 'Autonomous conflict checking, intelligent retainer billing, and client copilot systems.',
    headline: 'Scale client advisory capacity and eliminate billable hour leakage without adding headcount.',
    painPoints: [
      {
        issue: 'Unbillable Administrative Time Sinks',
        impact: 'Partners and associates spend 28% of their billable hours drafting routine client memos and logging timesheets.',
      },
      {
        issue: 'Complex Conflict of Interest Verification',
        impact: 'Onboarding new corporate clients takes days of manual searches across historical engagements.',
      },
      {
        issue: 'Delayed Retainer Collections & Scoping',
        impact: 'Ambiguous scope descriptions lead to client disputes and delayed milestone payments.',
      },
    ],
    systemSolutions: [
      {
        title: 'Automated Client Intake & Conflict Screener',
        description: 'Secure, encrypted client intake portal that runs automated conflict-of-interest checks across historical matters and registries in seconds.',
        features: [
          'Instant entity and shareholder cross-referencing',
          'Automated engagement letter synthesis with customizable fee schedules',
          'Encrypted client document collection portal',
        ],
      },
      {
        title: 'Internal Legal & Advisory Knowledge Copilot',
        description: 'Enterprise RAG copilot grounded strictly in your firm’s historical advisory memos, precedent clauses, and regulatory gazettes.',
        features: [
          'Rapid clause retrieval with verifiable citations and risk markers',
          'Bilingual legal document comparison and markup analysis',
          'Strict client-matter isolation preventing cross-client data exposure',
        ],
      },
      {
        title: 'Autonomous Retainer & Timesheet Reconciler',
        description: 'Monitors project milestone deliverables, calculates billable activity, and drafts client invoices with detailed activity breakdowns.',
        features: [
          'Automated retainer balance alerts before scope overruns occur',
          'One-click client invoice generation with ZATCA compliant e-invoicing',
          'Seamless sync to QuickBooks, Xero, and Clio',
        ],
      },
    ],
    metrics: [
      { value: '+32%', label: 'Reclaimed Billable Capacity', subtext: 'Hours shifted from administrative tasks to client strategy' },
      { value: '<5min', label: 'Conflict Check Turnaround', subtext: 'Down from 2 business days of manual cross-referencing' },
      { value: 'Zero', label: 'Scope Dispute Incidents', subtext: 'Enforced via automated milestone tracking' },
    ],
    regulatoryCompliance: ['Saudi Bar Association Standards', 'Saudi PDPL', 'SOC 2 Type II', 'ISO 27701'],
    recommendedServices: ['ai-agents', 'workflow-automation', 'crm-automation'],
  },
];
