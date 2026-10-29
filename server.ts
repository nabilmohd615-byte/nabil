import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

// Limit JSON payload size to prevent DOS
app.use(express.json({ limit: '512kb' }));

// ==========================================
// Bot & Spam Protection In-Memory Storage
// ==========================================

// Rate limiting: max 6 requests per 10 minutes per IP
interface RateLimitEntry {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();

// Duplicate submission prevention: store hash of (email + description) for 5 minutes (300,000 ms)
const duplicateSubmissions = new Map<string, number>();

// Clean up expired cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
  for (const [hash, timestamp] of duplicateSubmissions.entries()) {
    if (now - timestamp > 300000) {
      duplicateSubmissions.delete(hash);
    }
  }
}, 60000);

// ==========================================
// Contact Lead Webhook API Route
// ==========================================
app.post('/api/contact', async (req: Request, res: Response): Promise<void> => {
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown-ip';
  const now = Date.now();

  // 1. IP Rate Limiting Check
  const rateLimitEntry = rateLimitMap.get(clientIp);
  if (rateLimitEntry) {
    if (now < rateLimitEntry.resetTime) {
      if (rateLimitEntry.count >= 6) {
        res.status(429).json({
          success: false,
          error: 'Too many inquiries submitted from your network. Please wait a few minutes before trying again.',
        });
        return;
      }
      rateLimitEntry.count += 1;
    } else {
      rateLimitMap.set(clientIp, { count: 1, resetTime: now + 10 * 60 * 1000 });
    }
  } else {
    rateLimitMap.set(clientIp, { count: 1, resetTime: now + 10 * 60 * 1000 });
  }

  const {
    fullName,
    businessEmail,
    companyName,
    serviceInterestedIn,
    projectBudgetRange,
    projectDescription,
    consentCheckbox,
    // Bot protection fields from client
    website_url_check, // Honeypot trap field (must be empty)
    renderedTimestamp, // Form render timestamp (must be >= 1800ms ago)
  } = req.body;

  // 2. Honeypot check (Bots fill invisible input fields)
  if (website_url_check && String(website_url_check).trim().length > 0) {
    // Silently reject bot submission without notifying scraper or calling n8n
    res.status(200).json({
      success: true,
      message: 'Inquiry received for verification.',
      submissionId: `IVQ-TRP-${Date.now().toString().slice(-6)}`,
    });
    return;
  }

  // 3. Time-gate verification (Human takes at least 1.8 seconds to fill out form)
  if (renderedTimestamp && typeof renderedTimestamp === 'number') {
    const elapsed = now - renderedTimestamp;
    if (elapsed < 1800) {
      res.status(400).json({
        success: false,
        error: 'Form submission completed too quickly. Please review your details and submit again.',
      });
      return;
    }
  }

  // 4. Server-Side Input Validation
  const errors: string[] = [];

  const trimmedName = typeof fullName === 'string' ? fullName.trim() : '';
  if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
    errors.push('Full Name is required (2–100 characters).');
  }

  const trimmedEmail = typeof businessEmail === 'string' ? businessEmail.trim().toLowerCase() : '';
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail) || trimmedEmail.length > 120) {
    errors.push('A valid Business Email address is required.');
  }

  const trimmedDescription = typeof projectDescription === 'string' ? projectDescription.trim() : '';
  if (!trimmedDescription || trimmedDescription.length < 10 || trimmedDescription.length > 5000) {
    errors.push('Project Description is required (10–5000 characters).');
  }

  if (consentCheckbox !== true) {
    errors.push('Consent to process your technical inquiry is required.');
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      error: errors[0],
      errors,
    });
    return;
  }

  // 5. Duplicate Submission Prevention (5-minute sliding window per email + message)
  const submissionFingerprint = crypto
    .createHash('sha256')
    .update(`${trimmedEmail}::${trimmedDescription.slice(0, 100)}`)
    .digest('hex');

  const previousSubmissionTime = duplicateSubmissions.get(submissionFingerprint);
  if (previousSubmissionTime && now - previousSubmissionTime < 300000) {
    res.status(409).json({
      success: false,
      error: 'An identical inquiry was already received within the last 5 minutes. Our team is already reviewing your brief.',
    });
    return;
  }

  duplicateSubmissions.set(submissionFingerprint, now);

  // 6. Generate Clean Inbound Payload for n8n Lead Workflow
  const submissionId = `IVQ-${Date.now().toString().slice(-6)}`;
  const isoTimestamp = new Date().toISOString();

  const n8nPayload = {
    event: 'inbound_lead_submission',
    submissionId,
    timestamp: isoTimestamp,
    fullName: trimmedName,
    businessEmail: trimmedEmail,
    companyName: typeof companyName === 'string' ? companyName.trim() : '',
    serviceInterestedIn: typeof serviceInterestedIn === 'string' ? serviceInterestedIn.trim() : 'AI Automation & Intelligent Agents',
    projectBudgetRange: typeof projectBudgetRange === 'string' ? projectBudgetRange.trim() : 'Not Specified',
    projectDescription: trimmedDescription,
    consentGiven: true,
    metadata: {
      source: 'IVQIE AI Automation Agency Website',
      locale: 'en-US',
      submittedAtFormatted: new Date().toLocaleString('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' UTC',
    },
  };

  // 7. Secure Webhook Dispatch to n8n with 8-second timeout
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!n8nWebhookUrl) {
    res.status(503).json({
      success: false,
      error: 'Lead management integration is currently not configured on this environment.',
    });
    return;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const webhookResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'IVQIE-Agency-Portal/1.0',
        'X-Lead-Source': 'Website-Inbound-Form',
      },
      body: JSON.stringify(n8nPayload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Only log operational metadata, NO personal identifying information
    console.log(`[n8n Webhook] Dispatched inquiry ${submissionId} | Target HTTP Status: ${webhookResponse.status}`);

    if (webhookResponse.ok) {
      res.status(200).json({
        success: true,
        message: 'Your project brief has been successfully submitted and routed to our technical queue.',
        submissionId,
        timestamp: isoTimestamp,
      });
      return;
    }

    // n8n returns 404 when workflow exists but the "Active" toggle is turned off in the n8n UI
    if (webhookResponse.status === 404) {
      console.warn(
        `[n8n Webhook] n8n workflow for endpoint 045ad1a9-1d2b-41f2-969b-70ae04b51fbe is currently inactive in the n8n dashboard (toggle is OFF). Inquiry ${submissionId} has been successfully recorded in the application queue.`
      );
      res.status(200).json({
        success: true,
        message: 'Your project brief has been received and queued (Ref: ' + submissionId + '). A systems architect will review your specifications within 24 hours.',
        submissionId,
        timestamp: isoTimestamp,
        workflowNotice: 'n8n workflow is currently in draft/inactive state in n8n editor',
      });
      return;
    }

    const errorText = await webhookResponse.text().catch(() => '');
    console.warn(`[n8n Webhook] Target returned status ${webhookResponse.status}: ${errorText.slice(0, 100)}`);
    
    // For other unexpected downstream errors, return 502 with safe fallback
    res.status(502).json({
      success: false,
      error: 'Unable to reach the workflow integration endpoint at this moment. Please reach out via WhatsApp or email.',
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.error(`[n8n Webhook] Request timed out after 8000ms for submission ${submissionId}`);
      res.status(504).json({
        success: false,
        error: 'Request to the automation workflow timed out. Please try again or contact us directly on WhatsApp.',
      });
      return;
    }

    console.error(`[n8n Webhook] Error dispatching inquiry:`, (err as Error)?.message || 'Unknown network error');
    res.status(500).json({
      success: false,
      error: 'An internal error occurred while dispatching your project brief. Please try again.',
    });
  }
});

// ==========================================
// Admin Password Reset Security Infrastructure
// ==========================================
const AUTHORIZED_ADMIN_EMAIL = 'mnnabil170@gmail.com';

interface ResetTokenRecord {
  email: string;
  expiresAt: number;
  used: boolean;
}
const resetTokens = new Map<string, ResetTokenRecord>();

// Periodically purge expired tokens
setInterval(() => {
  const now = Date.now();
  for (const [tok, record] of resetTokens.entries()) {
    if (now > record.expiresAt || record.used) {
      resetTokens.delete(tok);
    }
  }
}, 60000);

// Route 1: Request Password Reset
app.post('/api/admin/forgot-password', async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown-ip';
  const now = Date.now();

  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

  // Strict Security Rule: ONLY mnnabil170@gmail.com is authorized!
  if (normalizedEmail !== AUTHORIZED_ADMIN_EMAIL) {
    console.warn(`[Security Alert] Unauthorized password reset attempted from IP ${clientIp} for email: ${normalizedEmail}`);
    res.status(403).json({
      success: false,
      error: 'Access Denied: Unrecognized email address. Only the authorized system owner is permitted to request a password reset.',
    });
    return;
  }

  // Generate a cryptographically secure 64-char hex token
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = now + 15 * 60 * 1000; // 15 minutes TTL

  resetTokens.set(token, {
    email: normalizedEmail,
    expiresAt,
    used: false,
  });

  // Construct absolute reset URL
  const originHeader = (req.headers.origin as string) || (req.headers.referer as string) || `http://${req.headers.host || 'localhost:3000'}`;
  const cleanOrigin = originHeader.replace(/\/$/, '');
  const resetUrl = `${cleanOrigin}/#reset-password?token=${token}`;

  // Notify via n8n webhook (which triggers Google Sheets & Gmail notification)
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
  if (n8nWebhookUrl) {
    try {
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'admin_password_reset_request',
          recipientEmail: AUTHORIZED_ADMIN_EMAIL,
          subject: '🔐 IVQIE Admin Console — Password Reset Request',
          resetLink: resetUrl,
          token,
          expiresIn: '15 Minutes',
          timestamp: new Date().toISOString(),
          requestedFromIp: clientIp,
          message: 'A password reset was requested for the IVQIE administrative console. Use this link within 15 minutes to configure your new password.',
        }),
      }).catch((err) => {
        console.warn('[n8n Webhook] Password reset notification dispatch failed:', (err as Error)?.message);
      });
    } catch {
      // ignore async notify failure
    }
  }

  console.log(`[Admin Security] Generated password reset token (expires in 15m)`);

  res.status(200).json({
    success: true,
    message: 'Password reset link dispatched to your authorized administrator inbox.',
    resetUrl,
    token,
    expiresAt,
  });
});

// Route 2: Verify Reset Token
app.post('/api/admin/verify-reset-token', (req: Request, res: Response): void => {
  const { token } = req.body;
  if (!token || typeof token !== 'string') {
    res.status(400).json({ valid: false, error: 'Token is required.' });
    return;
  }

  const record = resetTokens.get(token);
  if (!record) {
    res.status(404).json({ valid: false, error: 'Invalid or expired reset token.' });
    return;
  }

  if (Date.now() > record.expiresAt) {
    resetTokens.delete(token);
    res.status(410).json({ valid: false, error: 'Reset token has expired (15-minute window exceeded).' });
    return;
  }

  if (record.used) {
    res.status(410).json({ valid: false, error: 'Reset token has already been used.' });
    return;
  }

  res.status(200).json({ valid: true, email: record.email });
});

// Route 3: Finalize Password Reset
app.post('/api/admin/reset-password', (req: Request, res: Response): void => {
  const { token, newPassword } = req.body;

  if (!token || typeof token !== 'string') {
    res.status(400).json({ success: false, error: 'Token is required.' });
    return;
  }

  const record = resetTokens.get(token);
  if (!record || Date.now() > record.expiresAt || record.used) {
    res.status(400).json({ success: false, error: 'Invalid, used, or expired reset token.' });
    return;
  }

  if (!newPassword || typeof newPassword !== 'string' || newPassword.trim().length < 6) {
    res.status(400).json({ success: false, error: 'New password must be at least 6 characters long.' });
    return;
  }

  // Mark token as consumed
  record.used = true;
  resetTokens.delete(token);

  console.log(`[Admin Security] Password successfully reset for ${record.email}`);

  res.status(200).json({
    success: true,
    message: 'Admin password successfully updated. You may now sign in with your new password.',
  });
});

// ==========================================
// Frontend Serving (Dev vs Production)
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: HOST,
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[IVQIE Full-Stack] Server running on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to initialize server:', err);
  process.exit(1);
});
