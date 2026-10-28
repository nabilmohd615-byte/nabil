export interface ServiceDetail {
  slug: string;
  name: string;
  badge: string;
  tagline: string;
  heroDescription: string;
  category: string;
  highlights: string[];
  capabilities: {
    title: string;
    description: string;
    bulletPoints: string[];
  }[];
  architectureLayers: {
    number: string;
    title: string;
    tech: string[];
    description: string;
  }[];
  deliverables: string[];
  benchmarks: {
    metric: string;
    label: string;
    note: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedCaseStudySlugs: string[];
}

export const SERVICES_CATALOG: ServiceDetail[] = [
  {
    slug: 'ai-agents',
    name: 'Autonomous AI Agents',
    badge: 'Enterprise Reasoning',
    tagline: 'Self-governing intelligent workers operating multi-step business logic 24/7.',
    heroDescription:
      'We engineer autonomous AI agents with chain-of-thought verification, tool-use execution, and deterministic guardrails. Our agents autonomously triage client tickets, manage inventory anomalies, reconcile accounts, and supervise enterprise pipelines without constant human intervention.',
    category: 'Agentic Infrastructure',
    highlights: [
      'Multi-agent state machines with fallback safety supervisors',
      'Direct tool invocation (SQL, REST APIs, Webhooks, CRM, ERP)',
      'Human-in-the-loop escalation gates for sensitive transactions',
      'Audit logging and deterministic token cost throttling',
    ],
    capabilities: [
      {
        title: 'Multi-Step Goal Decomposition',
        description: 'Agents take high-level business objectives, break them into discrete executable tasks, prioritize steps, and self-correct on exceptions.',
        bulletPoints: [
          'Dynamic task graph generation and dependency mapping',
          'Self-healing error recovery and alternative execution paths',
          'Structured memory retention across conversational turns',
        ],
      },
      {
        title: 'Tool & Database Orchestration',
        description: 'Secure execution sandbox allowing agents to interact directly with internal APIs, SQL databases, and cloud services under strict permission controls.',
        bulletPoints: [
          'Read/Write access bounded by granular role-based permissions',
          'Sanitized SQL query synthesis with injection prevention',
          'Automated webhook triggers and callback validation',
        ],
      },
      {
        title: 'Supervised Safety & Human Escalation',
        description: 'When an agent detects ambiguous context or high financial risk, execution halts and presents a structured review card to authorized human personnel.',
        bulletPoints: [
          'Configurable confidence score cutoffs for automated execution',
          'Slack/WhatsApp supervisor alert channels with 1-click approvals',
          'Comprehensive audit trails with execution step playback',
        ],
      },
    ],
    architectureLayers: [
      {
        number: '01',
        title: 'Perception & Ingestion',
        tech: ['FastAPI Gateway', 'Webhook Handlers', 'Message Queues'],
        description: 'Ingests inbound events, normalizes payloads, and attaches identity metadata.',
      },
      {
        number: '02',
        title: 'Reasoning & Planning Core',
        tech: ['Gemini 1.5 Pro', 'LangGraph', 'State Machine Engine'],
        description: 'Decomposes business goals, tracks intermediate state, and selects appropriate sub-agents.',
      },
      {
        number: '03',
        title: 'Deterministic Tool Sandboxes',
        tech: ['PostgreSQL Vector', 'REST Connectors', 'Secure Docker Sandbox'],
        description: 'Safely executes approved commands against enterprise APIs with strict parameter validation.',
      },
      {
        number: '04',
        title: 'Governance & Audit Mesh',
        tech: ['OpenTelemetry', 'Structured JSON Logs', 'Saudi PDPL Shield'],
        description: 'Captures full trace logs, model prompt/response hashes, and compliance tokens.',
      },
    ],
    deliverables: [
      'Custom Agentic State Machine codebase (TypeScript / Python)',
      'Deterministic safety guardrails and moderation layers',
      'Integration connectors for your ERP, CRM, and communication channels',
      'Supervisor dashboard with real-time kill-switch and human approval gates',
      'Full CI/CD deployment to your isolated cloud infrastructure (GCP / AWS)',
      'Comprehensive architecture documentation & 90-day production warranty',
    ],
    benchmarks: [
      { metric: '94%', label: 'Routine Ticket Autonomy', note: 'Resolved without human staff touchpoints' },
      { metric: '<350ms', label: 'Step Planning Latency', note: 'Mean tool call decision time across state loops' },
      { metric: '0%', label: 'Data Leakage Incidents', note: 'Strict tenant isolation and zero retention training' },
    ],
    faqs: [
      {
        question: 'How do you prevent agents from hallucinating or taking unauthorized actions?',
        answer: 'We employ dual-layer validation: a schema validator that strictly limits what parameters can be passed to tools, combined with confidence score thresholds. Any action involving financial transactions or customer-facing writes exceeding safety parameters triggers a human-in-the-loop approval card.',
      },
      {
        question: 'Does this deploy on our own cloud infrastructure?',
        answer: 'Yes. IVQIE adheres to strict enterprise data sovereignty. We deploy directly to your GCP, AWS, or local on-premise Kubernetes clusters so your proprietary data never leaves your perimeter.',
      },
      {
        question: 'What models do your autonomous agents utilize?',
        answer: 'We architect model-agnostic solutions primarily leveraging Google Gemini 1.5 Pro/Flash, Claude 3.5 Sonnet, and custom fine-tuned open weights depending on latency and regulatory requirements.',
      },
    ],
    relatedCaseStudySlugs: ['leadflow-autonomous-crm', 'omnichannel-support-copilot'],
  },
  {
    slug: 'workflow-automation',
    name: 'Enterprise Workflow Automation',
    badge: 'Zero-Friction Operations',
    tagline: 'End-to-end operational automation eliminating manual data transfers and repetitive labor.',
    heroDescription:
      'We replace fragile manual handoffs with resilient, event-driven integration architectures. From order ingestion and automated invoice reconciliation to multi-department approval flows, we connect your fragmented software ecosystem into an synchronized digital machine.',
    category: 'System Integration',
    highlights: [
      'Resilient webhook orchestration with exponential backoff and dead-letter queues',
      'Multi-system data normalization (HubSpot, Salesforce, SAP, QuickBooks)',
      'Automated document extraction, OCR parsing, and ledger entry',
      'Real-time Slack, WhatsApp, and email notification conduits',
    ],
    capabilities: [
      {
        title: 'Event-Driven Pipeline Architecture',
        description: 'Real-time pub/sub messaging patterns that instantly react to customer actions, inventory updates, and payment triggers.',
        bulletPoints: [
          'Decoupled microservice architecture with guaranteed delivery',
          'Deduplication filters preventing double charges or redundant tasks',
          'Sub-second synchronization across all connected enterprise platforms',
        ],
      },
      {
        title: 'Intelligent Document Processing (IDP)',
        description: 'Extract structured tables, VAT numbers, line items, and totals from PDF invoices, customs declarations, and supplier receipts with 99.4% accuracy.',
        bulletPoints: [
          'Automated VAT and invoice compliance check (ZATCA compliant for KSA)',
          'Automated reconciliation against bank feeds and purchase orders',
          'Instant alerting on price discrepancies or unauthorized charges',
        ],
      },
      {
        title: 'Cross-Department Approval Workflows',
        description: 'Eliminate email threads with interactive approval buttons in Slack and WhatsApp for finance, procurement, and legal departments.',
        bulletPoints: [
          'Hierarchical escalation tiers based on monetary thresholds',
          'One-click biometric or OTP-verified approvals',
          'Immutable audit logging for SOX and external auditors',
        ],
      },
    ],
    architectureLayers: [
      {
        number: '01',
        title: 'Event Gateway',
        tech: ['Google Cloud Pub/Sub', 'Kafka', 'REST Webhooks'],
        description: 'Central ingestion bus receiving millions of transactional events with zero loss.',
      },
      {
        number: '02',
        title: 'Transformation & Normalization',
        tech: ['Node.js Worker Mesh', 'Zod Schemas', 'Custom Parsers'],
        description: 'Cleans, validates, and standardizes data structures between legacy and modern APIs.',
      },
      {
        number: '03',
        title: 'Intelligent Routing Engine',
        tech: ['Rule Evaluators', 'Lightweight LLM Extractors', 'Redis Cache'],
        description: 'Determines dispatch paths, flags anomalies, and enriches context before destination delivery.',
      },
      {
        number: '04',
        title: 'Destination Adapters',
        tech: ['SAP BAPI', 'Salesforce REST', 'QuickBooks API', 'WhatsApp API'],
        description: 'Fault-tolerant sync adapters with retry logic and idempotency protection.',
      },
    ],
    deliverables: [
      'Complete workflow engine architecture and source code',
      'Custom webhook listener and event broker infrastructure',
      'ZATCA / VAT compliant automated invoice parsing pipelines',
      'Interactive Slack / WhatsApp approval bots for operational leadership',
      'Centralized monitoring dashboard with latency & failure alerts',
      'Full SLA support and infrastructure maintenance protocol',
    ],
    benchmarks: [
      { metric: '82%', label: 'Reduction in Manual Data Entry', note: 'Observed across back-office operations' },
      { metric: '99.99%', label: 'Pipeline Uptime SLA', note: 'Enterprise clustered failover configurations' },
      { metric: '<90ms', label: 'Event Dispatch Latency', note: 'From inbound webhook to downstream sync' },
    ],
    faqs: [
      {
        question: 'Can you integrate with our legacy on-premise ERP or custom software?',
        answer: 'Yes. We specialize in hybrid architectures, deploying secure lightweight API proxies or database connectors inside your VPC to bridge legacy software with modern automation pipelines.',
      },
      {
        question: 'What happens if a third-party service (like Salesforce or Stripe) goes down?',
        answer: 'Our pipelines are built with durable message queues and dead-letter storage. If a downstream target experiences an outage, payloads are safely held and retried with exponential backoff once the service returns.',
      },
    ],
    relatedCaseStudySlugs: ['leadflow-autonomous-crm', 'smart-catalog-content-engine'],
  },
  {
    slug: 'conversational-ai',
    name: 'Conversational AI & Copilots',
    badge: 'Natural Interaction',
    tagline: 'Hyper-responsive, contextual brand communicators across WhatsApp, Web, and Messenger.',
    heroDescription:
      'We build domain-specific conversational systems and internal copilots that understand customer nuances, colloquial Arabic & English, and enterprise knowledge bases with surgical accuracy.',
    category: 'Conversational Systems',
    highlights: [
      'Bilingual Arabic (Najdi, Hijazi, Gulf, MSA) and English understanding',
      'Advanced Retrieval-Augmented Generation (RAG) over verified company documents',
      'Seamless human agent warm-handoff with complete chat summaries',
      'WhatsApp Business Cloud API certified integration',
    ],
    capabilities: [
      {
        title: 'Domain-Grounded RAG Architecture',
        description: 'Connects to your company policies, catalogs, warranties, and technical manuals with hybrid vector and keyword search to eliminate hallucinations.',
        bulletPoints: [
          'Chunking and reranking optimized for technical and legal documentation',
          'Deterministic source citation so users can verify references',
          'Strict out-of-domain rejection guardrails',
        ],
      },
      {
        title: 'Bilingual Dialectal Mastery',
        description: 'Custom fine-tuned system prompts and vocabulary mappings that effortlessly handle colloquial Arabic expressions alongside English technical terms.',
        bulletPoints: [
          'Automatic language and dialect detection within the first prompt',
          'Natural conversational flow preserving executive brand prestige',
          'Cultural etiquette and localized polite closing conventions',
        ],
      },
      {
        title: 'Actionable In-Chat Transactions',
        description: 'Conversational bots that do not merely give text answers, but actually book consultations, check order statuses, process cancellations, and update accounts.',
        bulletPoints: [
          'Interactive WhatsApp buttons, list pickers, and payment links',
          'Real-time CRM and ERP lookups during conversation',
          'Pre-filled calendar invites sent directly to WhatsApp & email',
        ],
      },
    ],
    architectureLayers: [
      {
        number: '01',
        title: 'Omnichannel Ingestion',
        tech: ['WhatsApp Cloud API', 'WebChat React SDK', 'Instagram Graph API'],
        description: 'Unified conversational gateway receiving customer messages across all touchpoints.',
      },
      {
        number: '02',
        title: 'Context & Knowledge Core',
        tech: ['Chroma / Pinecone', 'Cohere Rerank', 'Hybrid Search'],
        description: 'Extracts relevant institutional knowledge chunks based on query semantics.',
      },
      {
        number: '03',
        title: 'Dialect Reasoning Engine',
        tech: ['Gemini 1.5 Flash', 'Dialect Fine-Tuning', 'NeMo Guardrails'],
        description: 'Generates helpful, polite, and brand-accurate answers grounded strictly in context.',
      },
      {
        number: '04',
        title: 'Live Agent Hand-off Bridge',
        tech: ['Zendesk API', 'Intercom API', 'Custom Support Console'],
        description: 'Transfers high-sentiment or complex conversations to human agents with an instant AI summary.',
      },
    ],
    deliverables: [
      'Production-ready WhatsApp Cloud API verified conversational engine',
      'Embeddable Webchat React widget matching your design system',
      'Custom vector database index containing your company knowledge base',
      'Dialectal localization prompt system for Saudi & GCC markets',
      'Live agent desk integration (Zendesk, Intercom, Freshdesk, or custom)',
      'Analytics suite tracking resolution rate, sentiment, and drop-off points',
    ],
    benchmarks: [
      { metric: '<1.2s', label: 'Average Response Time', note: 'Real-time streaming to WhatsApp and Web chat' },
      { metric: '91%', label: 'First-Contact Resolution', note: 'Customer issues resolved without live agent queue' },
      { metric: '4.8/5', label: 'Customer CSAT Score', note: 'Measured across 45,000+ benchmark sessions' },
    ],
    faqs: [
      {
        question: 'Does the WhatsApp bot require our team to keep a physical phone connected?',
        answer: 'No. We integrate via the official cloud-hosted WhatsApp Business Cloud API provided by Meta. It operates on cloud servers with 99.99% uptime and supports unlimited concurrent conversations.',
      },
      {
        question: 'Can the bot identify when a customer is angry and transfer them immediately?',
        answer: 'Yes. Our sentiment analysis layer continuously scores user frustration or urgency. High negative sentiment triggers an immediate live agent escalation with an automated executive briefing card.',
      },
    ],
    relatedCaseStudySlugs: ['omnichannel-support-copilot', 'leadflow-autonomous-crm'],
  },
  {
    slug: 'crm-automation',
    name: 'Autonomous CRM & Pipeline Architecture',
    badge: 'Revenue Velocity',
    tagline: 'Self-organizing customer databases that eliminate pipeline leakage and accelerate deals.',
    heroDescription:
      'We turn stagnant sales databases into autonomous revenue engines. By syncing real-time customer behavior, website intent, and conversation history directly into your CRM, your sales reps focus solely on closing qualified opportunities.',
    category: 'Sales Systems',
    highlights: [
      'Instant enrichment of new leads with company size, funding, and tech stack',
      'Dynamic lead scoring based on cross-channel engagement signals',
      'Automated deal stage transitions with executive milestone alerts',
      'Bidirectional WhatsApp & email pipeline history tracking',
    ],
    capabilities: [
      {
        title: 'Autonomous Lead Enrichment',
        description: 'When a new lead submits a form or chats on WhatsApp, background workers instantly query public data sources and registry records to enrich the contact card.',
        bulletPoints: [
          'Company headquarters, employee headcount, and verified domain',
          'LinkedIn profiles and decision-maker hierarchy mapping',
          'Estimated buying power and industry classification',
        ],
      },
      {
        title: 'Algorithmic Deal Velocity Scoring',
        description: 'AI model evaluates lead intent based on time spent on case studies, quote requests, and conversation velocity to flag hottest deals.',
        bulletPoints: [
          'High-intent priority routing directly to top closers',
          'Stale deal alerts with pre-drafted re-engagement angles',
          'Predictive pipeline forecasting for executive quarterly planning',
        ],
      },
      {
        title: 'Automated Sales Cadence Delivery',
        description: 'Dynamic follow-up emails and WhatsApp follow-ups that automatically adjust tone and references based on previous conversation topics.',
        bulletPoints: [
          'Personalized case study recommendations matching prospect industry',
          'Automated meeting rescheduling when conflicts arise',
          'Instant notification when key prospects open quotes or decks',
        ],
      },
    ],
    architectureLayers: [
      {
        number: '01',
        title: 'Capture & Deduplication',
        tech: ['HubSpot SDK', 'Salesforce REST', 'PostgreSQL Trigger Mesh'],
        description: 'Normalizes inbound leads from ads, website, and WhatsApp into unified master records.',
      },
      {
        number: '02',
        title: 'Enrichment Workers',
        tech: ['Clearbit API', 'Crunchbase API', 'Google Cloud Functions'],
        description: 'Appends verified corporate intel and decision maker profiles in <4 seconds.',
      },
      {
        number: '03',
        title: 'Scoring & Allocation Engine',
        tech: ['Scoring Algorithms', 'Round-Robin Dispatcher', 'Timezone Calculator'],
        description: 'Assigns deals to the most qualified available account executive according to geography and quota.',
      },
      {
        number: '04',
        title: 'Automated Follow-up Conduits',
        tech: ['SendGrid Enterprise', 'WhatsApp Cloud API', 'Calendly API'],
        description: 'Dispatches contextual follow-ups and books discovery sessions automatically.',
      },
    ],
    deliverables: [
      'HubSpot / Salesforce custom pipeline schema optimization',
      'Automated lead qualification & data enrichment connectors',
      'Automated meeting scheduler connected to rep calendars',
      'Executive pipeline analytics & deal health dashboard',
      'Complete sales rep operating manual and playbook training',
      'Ongoing quarterly optimization reviews',
    ],
    benchmarks: [
      { metric: '3.4x', label: 'Faster Discovery Call Booking', note: 'From initial contact to confirmed calendar event' },
      { metric: '100%', label: 'CRM Record Completeness', note: 'No missing email, title, or company headcount' },
      { metric: '+42%', label: 'Sales Rep Closing Capacity', note: 'Hours reclaimed from manual admin data entry' },
    ],
    faqs: [
      {
        question: 'Which CRMs do you support?',
        answer: 'We deploy deep integrations with HubSpot Enterprise, Salesforce, Zoho CRM, Pipedrive, and bespoke custom PostgreSQL CRM architectures.',
      },
      {
        question: 'Will our existing lead records be modified or disrupted?',
        answer: 'No. We perform non-destructive audit and shadow staging first, validating data normalization rules before deploying production automated writes.',
      },
    ],
    relatedCaseStudySlugs: ['leadflow-autonomous-crm', 'smart-catalog-content-engine'],
  },
  {
    slug: 'ai-voice-assistants',
    name: 'Ultra-Low Latency AI Voice Agents',
    badge: 'Voice Infrastructure',
    tagline: 'Conversational voice agents answering inbound calls and booking appointments in real time.',
    heroDescription:
      'We design ultra-low latency voice AI infrastructure running over SIP and WebRTC. Answering inbound phone inquiries with natural cadence, zero awkward pauses, and full CRM integration, our voice systems represent your brand with distinction.',
    category: 'Voice Infrastructure',
    highlights: [
      'Sub-600ms speech-to-speech round-trip latency over standard phone lines',
      'Crystal-clear accents with regional dialect support (Saudi Arabic & International English)',
      'Direct integration with cloud PBX systems (Twilio, FreePBX, Asterisk, Vonage)',
      'Live call transfer to human receptionists with caller context screen-pop',
    ],
    capabilities: [
      {
        title: 'Real-Time Conversational Turn-Taking',
        description: 'Natural interruption handling and turn-taking so callers can speak naturally, pause to think, or interrupt the agent without awkward overlapping.',
        bulletPoints: [
          'Instant speech endpoint detection and background noise filtering',
          'Graceful barge-in handling that stops voice playback immediately',
          'Emotion-adaptive modulation maintaining composed professionalism',
        ],
      },
      {
        title: 'Telephony & PBX Bridge',
        description: 'Direct SIP trunking into your existing business phone numbers, enabling immediate deployment without changing your published numbers.',
        bulletPoints: [
          'High-availability SIP gateways with carrier redundancy',
          'Direct integration with Twilio, Vonage, Telnyx, and private PBX',
          'Call recording and cryptographic audit storage',
        ],
      },
      {
        title: 'Instant Action Execution While on Call',
        description: 'While speaking with the caller, the agent checks calendar availability, verifies customer account status, and locks in appointments in real time.',
        bulletPoints: [
          'Live database queries executed in parallel with speech synthesis',
          'Automated SMS / WhatsApp confirmation sent before caller hangs up',
          'Automated post-call summary and action items committed to CRM',
        ],
      },
    ],
    architectureLayers: [
      {
        number: '01',
        title: 'Telephony & Audio Streaming',
        tech: ['SIP Trunking', 'WebRTC Audio Stream', 'Twilio Voice'],
        description: 'Bi-directional audio streaming with 16kHz PCM audio buffers for studio-clear clarity.',
      },
      {
        number: '02',
        title: 'Streaming Speech-to-Text (STT)',
        tech: ['Deepgram Nova-2', 'Google Cloud Speech v2', 'Whisper Live'],
        description: 'Sub-150ms transcript generation with dialectal Arabic and regional English models.',
      },
      {
        number: '03',
        title: 'Ultra-Fast Reasoning Core',
        tech: ['Gemini 1.5 Flash', 'Groq LPU Engine', 'Streaming Tokens'],
        description: 'Generates conversational replies token-by-token with zero buffering lag.',
      },
      {
        number: '04',
        title: 'Expressive Neural Voice Synthesis',
        tech: ['ElevenLabs Streaming API', 'Cartesia Sonic', 'Azure Neural Voice'],
        description: 'Synthesizes warm, authoritative voice audio streamed directly back to the caller.',
      },
    ],
    deliverables: [
      'SIP trunk provisioning and phone number routing setup',
      'Ultra-low latency streaming voice orchestration engine',
      'Custom voice persona cloned or selected to match your brand identity',
      'Calendar booking and live CRM lookup integration',
      'Warm transfer bridge to your human front-desk team',
      'Post-call transcription, sentiment scoring, and CRM sync pipeline',
    ],
    benchmarks: [
      { metric: '580ms', label: 'End-to-End Latency', note: 'Mean voice-in to voice-out acoustic turnaround' },
      { metric: '100%', label: 'Inbound Call Answering Rate', note: 'Zero callers ever sent to voicemail queues' },
      { metric: '76%', label: 'Call-to-Appointment Rate', note: 'For qualified clinic and service inquiries' },
    ],
    faqs: [
      {
        question: 'Do callers know they are speaking to an AI?',
        answer: 'We recommend transparent agency disclosure: "Welcome to [Company], I am the automated assistant, how can I direct your call today?" Callers appreciate the immediate zero-wait assistance and fluent natural speech.',
      },
      {
        question: 'Can the voice agent transfer to a live human agent during the call?',
        answer: 'Yes. If the caller requests a human manager, or if the conversation exceeds the agent scope, the system dials your front-desk line and announces caller details via whisper transfer before bridging.',
      },
    ],
    relatedCaseStudySlugs: ['omnichannel-support-copilot', 'leadflow-autonomous-crm'],
  },
  {
    slug: 'custom-ai-integrations',
    name: 'Custom AI Models & Computer Vision',
    badge: 'Bespoke Engineering',
    tagline: 'Tailored machine learning architectures, automated visual QA, and proprietary AI tools.',
    heroDescription:
      'When off-the-shelf software falls short, we engineer bespoke AI systems tailored to your proprietary processes. From custom fine-tuned domain models and automated visual quality inspection to automated video and marketing creative engines, we build your enterprise moat.',
    category: 'Custom Engineering',
    highlights: [
      'Bespoke model fine-tuning with proprietary internal datasets',
      'High-throughput computer vision for inventory and quality inspection',
      'Automated marketing content, localized video, and dynamic creative generation',
      'Edge deployment to on-premise hardware or private cloud clusters',
    ],
    capabilities: [
      {
        title: 'Domain Model Fine-Tuning & Distillation',
        description: 'Train smaller, ultra-efficient open-source models on your internal data to achieve domain supremacy while cutting token costs by up to 85%.',
        bulletPoints: [
          'Strict proprietary dataset curation with automated PII masking',
          'Quantized deployment for ultra-low inference costs',
          'Continuous evaluation against benchmark golden test suites',
        ],
      },
      {
        title: 'Computer Vision & Visual Inspection',
        description: 'Deploy real-time object detection, defect inspection, and barcode tracking in manufacturing plants, warehouses, and logistics centers.',
        bulletPoints: [
          'Defect identification on rapid assembly lines',
          'Automated vehicle license plate and container code recognition',
          'Real-time retail shelf compliance and stockout tracking',
        ],
      },
      {
        title: 'Automated Content & Media Generation Engines',
        description: 'Programmatically generate marketing copy, localized video creatives, product graphics, and social posts aligned with strict brand guidelines.',
        bulletPoints: [
          'Bulk product catalog description generation with SEO optimization',
          'Automated short-form video generation with dynamic audio and captions',
          'Multi-channel social media marketing automation pipeline',
        ],
      },
    ],
    architectureLayers: [
      {
        number: '01',
        title: 'Data Ingestion & Labeling Pipeline',
        tech: ['Apache Arrow', 'LabelStudio', 'Automated Anonymizers'],
        description: 'Prepares, scrubs, and normalizes proprietary training and inference payloads.',
      },
      {
        number: '02',
        title: 'Model Training & Quantization',
        tech: ['PyTorch', 'vLLM', 'Hugging Face', 'NVIDIA TensorRT'],
        description: 'Fine-tunes and quantizes models for sub-millisecond inference velocity.',
      },
      {
        number: '03',
        title: 'Inference Orchestration API',
        tech: ['FastAPI', 'gRPC Services', 'Redis Queue Mesh'],
        description: 'High-throughput microservices handling concurrent prediction requests with auto-scaling.',
      },
      {
        number: '04',
        title: 'Observability & Drift Monitoring',
        tech: ['Evidently AI', 'Prometheus', 'Grafana Enterprise'],
        description: 'Detects data drift, monitors latency percentiles, and triggers automated model retraining.',
      },
    ],
    deliverables: [
      'Full model weights, training scripts, and containerized Docker images',
      'High-concurrency gRPC & REST inference server deployment',
      'Interactive testing sandbox for internal team validation',
      'Complete proprietary IP ownership transferred to your company',
      'Comprehensive monitoring dashboard for inference accuracy & drift',
      'Enterprise SLA support and scheduled model performance reviews',
    ],
    benchmarks: [
      { metric: '<45ms', label: 'Computer Vision Inference', note: 'Per frame processing on standard GPU instances' },
      { metric: '85%', label: 'Inference Cost Reduction', note: 'Achieved through model distillation vs public APIs' },
      { metric: '100%', label: 'Intellectual Property Ownership', note: 'Complete code, weights, and pipeline IP transfer' },
    ],
    faqs: [
      {
        question: 'Who owns the intellectual property and model weights?',
        answer: 'You own 100% of all trained weights, training scripts, architecture documentation, and codebase. IVQIE signs full IP assignment agreements before kickoff.',
      },
      {
        question: 'Can this run in environments with strict air-gapped security?',
        answer: 'Yes. We package our custom models as self-contained Docker containers and Helm charts capable of running completely offline on air-gapped on-premise hardware.',
      },
    ],
    relatedCaseStudySlugs: ['smart-catalog-content-engine', 'omnichannel-support-copilot'],
  },
];
