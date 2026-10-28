# IVQIE — n8n Lead Management Workflow Integration Guide

## 1. Architecture Overview

```
┌─────────────────────────────────┐
│     Website Contact Forms       │
│  - /contact (Project Brief)     │
│  - Consultation CTA / Modal     │
└────────────────┬────────────────┘
                 │ (POST /api/contact)
                 ▼
┌─────────────────────────────────┐
│      Secure Server Proxy        │
│  - Input validation & sanitation│
│  - Honeypot bot trap            │
│  - Submission speed gate (>1.8s)│
│  - SHA-256 deduplication (5 min)│
│  - IP rate-limiting (6/10 min)  │
│  - Secrets hidden from browser  │
└────────────────┬────────────────┘
                 │ (Forward payload with 8s timeout)
                 ▼
┌─────────────────────────────────┐
│       n8n Webhook Trigger       │
│  Webhook ID:                    │
│  045ad1a9-1d2b-41f2-969b-...    │
└────────────────┬────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
┌──────────────┐   ┌──────────────┐
│Google Sheets │   │ Email Alert  │
│ (Append Row) │   │ (Gmail/SMTP) │
└──────────────┘   └──────────────┘
```

---

## 2. Payload Structure Emitted to n8n

Every validated submission sends a clean, structured JSON payload to the n8n webhook:

```json
{
  "event": "inbound_lead_submission",
  "submissionId": "IVQ-641050",
  "timestamp": "2026-10-28T20:34:01.050Z",
  "fullName": "Tariq Al-Mansoor",
  "businessEmail": "tariq@testcorp.com",
  "companyName": "Apex AI Labs",
  "serviceInterestedIn": "Autonomous AI Agents",
  "projectBudgetRange": "$7,000 - $18,000",
  "projectDescription": "We require an autonomous WhatsApp triage agent connected to PostgreSQL database.",
  "consentGiven": true,
  "metadata": {
    "source": "IVQIE AI Automation Agency Website",
    "locale": "en-US",
    "submittedAtFormatted": "Oct 28, 2026, 08:34 PM UTC"
  }
}
```

---

## 3. n8n Workflow Configuration (Step-by-Step)

### Step 1: Webhook Node
1. Add a **Webhook** node in your n8n canvas.
2. Configure settings:
   - **HTTP Method**: `POST`
   - **Path**: `045ad1a9-1d2b-41f2-969b-70ae04b51fbe`
   - **Authentication**: `None`
   - **Respond**: `Immediately` (HTTP 200) or `When Last Node Finishes`
3. **Important**:
   - To test directly in the n8n canvas: Click **"Listen for test event"** in the Webhook node, then submit the form on the website.
   - For live production traffic: Toggle the switch in the top-right corner of the n8n editor from **Inactive** to **Active**.

### Step 2: Google Sheets Node ("Append Row")
1. Add a **Google Sheets** node connected to the Webhook node.
2. Select **Resource**: `Document` -> **Operation**: `Append Row`.
3. Select your Google Drive credential and choose your spreadsheet (e.g. `IVQIE Inbound Leads`).
4. Map the columns using expressions:
   - `Reference ID` -> `{{ $json.body.submissionId }}`
   - `Date / Time` -> `{{ $json.body.metadata.submittedAtFormatted }}`
   - `Full Name` -> `{{ $json.body.fullName }}`
   - `Business Email` -> `{{ $json.body.businessEmail }}`
   - `Company` -> `{{ $json.body.companyName }}`
   - `Service` -> `{{ $json.body.serviceInterestedIn }}`
   - `Budget Range` -> `{{ $json.body.projectBudgetRange }}`
   - `Project Brief` -> `{{ $json.body.projectDescription }}`
   - `Consent Verified` -> `{{ $json.body.consentGiven }}`

### Step 3: Email Notification Node (Gmail / SMTP / Resend)
1. Add a **Gmail** or **Send Email (SMTP)** node connected after the Google Sheets node.
2. Set recipient: `mnnabil170@gmail.com`
3. Set Subject: `🔥 New Lead [{{ $json.body.submissionId }}]: {{ $json.body.fullName }} ({{ $json.body.companyName || 'Private' }})`
4. Set Email Body (HTML):
```html
<h2>New Technical Scoping Brief Received</h2>
<p><strong>Lead ID:</strong> {{ $json.body.submissionId }}</p>
<p><strong>Name:</strong> {{ $json.body.fullName }}</p>
<p><strong>Email:</strong> <a href="mailto:{{ $json.body.businessEmail }}">{{ $json.body.businessEmail }}</a></p>
<p><strong>Company:</strong> {{ $json.body.companyName || 'Not specified' }}</p>
<p><strong>Service Requested:</strong> {{ $json.body.serviceInterestedIn }}</p>
<p><strong>Estimated Budget:</strong> {{ $json.body.projectBudgetRange }}</p>
<p><strong>Project Requirements:</strong></p>
<blockquote style="background: #f4f4f5; padding: 12px; border-left: 4px solid #f43f5e;">
  {{ $json.body.projectDescription }}
</blockquote>
<p><small>Consent confirmed under Saudi PDPL &amp; GDPR compliance standards.</small></p>
```

---

## 4. Security & Privacy Safeguards Implemented

- **Webhook Secrecy**: The webhook URL is stored exclusively on the server in `.env` under `N8N_WEBHOOK_URL` and is never bundled in frontend code or visible to client network inspectors.
- **Honeypot Protection**: An invisible `website_url_check` trap field is deployed. Automated form scrapers that populate this field are immediately trapped and ignored.
- **Speed Limiting Gate**: Submissions completed under 1.8 seconds are rejected to block headless browser scripts.
- **Deduplication Engine**: A 5-minute sliding SHA-256 fingerprint hash prevents repeated clicks and duplicate leads.
- **Privacy Minimization**: Server logs record only metadata and status codes (`[n8n Webhook] Dispatched inquiry IVQ-641050 | Status: 200`), with zero personal PII dumped to console logs.
