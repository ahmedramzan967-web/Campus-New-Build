import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import nodemailer, { SendMailOptions } from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Target Official Recipient (reads from EMAIL_TO or defaults to info@estimationcampusinc.com)
const getOfficialRecipient = () => {
  return process.env.EMAIL_TO?.trim() || 'info@estimationcampusinc.com';
};

// In-Memory Rate Limiter (Max 10 submissions per 10 minutes per IP)
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

function checkRateLimit(ip: string): boolean {
  // Relax rate limit in development or for localhost testing
  if (!isProduction || ip === '127.0.0.1' || ip === '::1' || ip === 'unknown') {
    return true;
  }

  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const limit = 10;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  return true;
}

// Allowed File Extensions & MIME Types for Construction Documents
const ALLOWED_EXTENSIONS = new Set([
  'pdf', 'dwg', 'dxf', 'xlsx', 'xls', 'docx', 'doc', 'jpg', 'jpeg', 'png', 'zip'
]);

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/vnd.dwg',
  'image/x-dwg',
  'application/acad',
  'application/x-acad',
  'application/autocad_dwg',
  'application/dxf',
  'image/vnd.dxf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'image/jpeg',
  'image/png',
  'application/zip',
  'application/x-zip-compressed',
  'application/octet-stream' // Many CAD DWG files are transmitted with octet-stream
]);

// Configure Multer for In-Memory Safe Buffer Handling (Max 15MB total)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB per file
    files: 5 // Max 5 files
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().replace(/^\./, '');
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return cb(new Error(`File type .${ext} is not supported. Please upload PDF, DWG, DXF, XLSX, DOCX, JPG, PNG, or ZIP.`));
    }
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      return cb(new Error(`Invalid file MIME type: ${file.mimetype}`));
    }
    cb(null, true);
  }
});

// JSON and URL-encoded parsers for non-file requests
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Helper: Sanitize string to prevent SMTP Header Injection
function sanitizeHeader(str: string): string {
  if (!str) return '';
  return str.replace(/[\r\n]/g, ' ').trim();
}

// Helper: Sanitize filename
function sanitizeFilename(filename: string): string {
  const base = path.basename(filename);
  return base.replace(/[^a-zA-Z0-9._-]/g, '_');
}

/**
 * Configure SMTP Transporter reading all 7 environment variables:
 * - SMTP_HOST (e.g. smtppro.zoho.com or smtp.zoho.com)
 * - SMTP_PORT (e.g. 465 or 587)
 * - SMTP_SECURE (true for 465, false for 587)
 * - SMTP_USER (e.g. info@estimationcampusinc.com)
 * - SMTP_PASSWORD (Zoho App Password)
 * - EMAIL_TO (e.g. info@estimationcampusinc.com)
 * - EMAIL_FROM (e.g. "Estimation Campus Inc." <info@estimationcampusinc.com>)
 */
function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtppro.zoho.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  // Determine secure: if explicit SMTP_SECURE provided use it, otherwise true if port 465
  const secure = process.env.SMTP_SECURE !== undefined
    ? process.env.SMTP_SECURE === 'true'
    : port === 465;

  if (user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }
  return null;
}

// Map service slug to readable title
const SERVICE_NAMES: Record<string, string> = {
  'permit-drawings': 'Permit Support, Design & Drawings',
  'construction-estimating': 'Construction Estimating & Takeoffs',
  'project-scheduling': 'Project Scheduling (CPM)',
  '3d-renderings': '3D Renderings & Walkthroughs',
  'shop-drawings': 'Shop Drawings & As-Builts',
  'multiple': 'Multiple Services / Comprehensive Scope'
};

// Health Check Endpoint - Allows auditing Hostinger environment configuration
app.get('/api/health', (_req: Request, res: Response) => {
  const hasHost = Boolean(process.env.SMTP_HOST);
  const hasPort = Boolean(process.env.SMTP_PORT);
  const hasSecure = Boolean(process.env.SMTP_SECURE);
  const hasUser = Boolean(process.env.SMTP_USER);
  const hasPass = Boolean(process.env.SMTP_PASSWORD);
  const hasTo = Boolean(process.env.EMAIL_TO);
  const hasFrom = Boolean(process.env.EMAIL_FROM);

  const recipient = getOfficialRecipient();
  const isSmtpReady = Boolean(process.env.SMTP_USER && process.env.SMTP_PASSWORD);

  res.json({
    status: 'ok',
    service: 'Estimation Campus Form API',
    runtime: process.version,
    recipient,
    smtpProvider: 'Zoho Mail / Custom SMTP',
    smtpConfigured: isSmtpReady,
    environmentAudit: {
      SMTP_HOST: hasHost ? process.env.SMTP_HOST : 'smtppro.zoho.com (default)',
      SMTP_PORT: hasPort ? process.env.SMTP_PORT : '465 (default)',
      SMTP_SECURE: hasSecure ? process.env.SMTP_SECURE : 'true (default)',
      SMTP_USER: hasUser ? process.env.SMTP_USER : 'NOT CONFIGURED (Required)',
      SMTP_PASSWORD: hasPass ? '****** [Configured]' : 'NOT CONFIGURED (Required)',
      EMAIL_TO: hasTo ? process.env.EMAIL_TO : 'info@estimationcampusinc.com (default)',
      EMAIL_FROM: hasFrom ? process.env.EMAIL_FROM : 'info@estimationcampusinc.com (default)'
    },
    timestamp: new Date().toISOString()
  });
});

// Primary Form Submission Handler: /api/quote & /api/contact
const handleFormSubmission = async (req: Request, res: Response) => {
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
  const recipient = getOfficialRecipient();

  // 1. Rate Limiting Check
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      message: "Too many submission attempts. Please wait a few minutes before trying again or email us directly at info@estimationcampusinc.com."
    });
  }

  // 2. Anti-Spam Honeypot Verification
  const honeypot = req.body.website_url || req.body._hp_check || req.body.company_url_confirm;
  if (honeypot) {
    console.warn(`[SPAM DETECTED] Honeypot triggered by IP ${clientIp}: ${honeypot}`);
    return res.json({
      success: true,
      referenceId: `EC-${new Date().getFullYear()}-SPAM`,
      message: "Thank you for contacting Estimation Campus Inc. Your inquiry has been submitted successfully."
    });
  }

  // 3. Extract and Validate Form Fields
  const fullName = sanitizeHeader(req.body.fullName || req.body.name || '');
  const companyName = sanitizeHeader(req.body.companyName || req.body.company || '');
  const email = sanitizeHeader(req.body.email || '');
  const phone = sanitizeHeader(req.body.phone || '');
  const serviceKey = sanitizeHeader(req.body.serviceRequired || req.body.service || 'permit-drawings');
  const serviceName = SERVICE_NAMES[serviceKey] || serviceKey;
  const projectLocation = sanitizeHeader(req.body.projectLocation || req.body.location || '');
  const projectType = sanitizeHeader(req.body.projectType || 'Commercial');
  const timeline = sanitizeHeader(req.body.timeline || 'Standard (1–2 weeks)');
  const projectDescription = (req.body.projectDescription || req.body.message || '').trim();
  const fileLink = sanitizeHeader(req.body.fileLink || '');
  const isGeneralInquiry = req.body.formType === 'contact' || req.originalUrl.includes('/contact');

  // Server-Side Field Validation
  if (!fullName || fullName.length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Please provide your full name.'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid work email address.'
    });
  }

  const phoneDigits = phone.replace(/\D/g, '');
  if (!phone || phoneDigits.length < 10) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid 10-digit phone number.'
    });
  }

  if (!projectLocation && !isGeneralInquiry) {
    return res.status(400).json({
      success: false,
      message: 'Please provide the project location (City, State).'
    });
  }

  if (!projectDescription || projectDescription.length < 15) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a description of your project scope (minimum 15 characters).'
    });
  }

  // 4. Reference Tracking ID & Timestamp
  const dateStr = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    dateStyle: 'full',
    timeStyle: 'long'
  });
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const referenceId = `EC-${new Date().getFullYear()}-${randomSuffix}`;

  // 5. Process File Attachments
  const files = (req.files as Express.Multer.File[]) || [];
  const attachments = files.map((file) => ({
    filename: sanitizeFilename(file.originalname),
    content: file.buffer,
    contentType: file.mimetype
  }));

  const attachmentListText = files.length > 0
    ? files.map((f, i) => `${i + 1}. ${sanitizeFilename(f.originalname)} (${(f.size / (1024 * 1024)).toFixed(2)} MB)`).join('\n')
    : 'None directly attached';

  const attachmentListHtml = files.length > 0
    ? `<ul style="margin: 0; padding-left: 20px; color: #1e293b;">
        ${files.map(f => `<li style="margin-bottom: 4px;"><strong>${sanitizeFilename(f.originalname)}</strong> (${(f.size / (1024 * 1024)).toFixed(2)} MB)</li>`).join('')}
       </ul>`
    : '<span style="color: #64748b;">No direct file attachments included</span>';

  // 6. Generate Formatted Email Subject & Bodies
  const subject = isGeneralInquiry
    ? `New Website Inquiry — Estimation Campus Inc. — ${fullName}`
    : `New Quote Request — ${serviceName} — ${fullName}`;

  const textBody = `
ESTIMATION CAMPUS INC. — NEW INQUIRY NOTIFICATION
=================================================
Reference ID: ${referenceId}
Submission Date: ${dateStr}
Client IP: ${clientIp}

CLIENT CONTACT DETAILS:
-----------------------
Full Name: ${fullName}
Company: ${companyName || 'Not specified'}
Email: ${email}
Phone: ${phone}

PROJECT SCOPE & SPECIFICATIONS:
-------------------------------
Requested Service: ${serviceName}
Project Location: ${projectLocation || 'Not specified'}
Project Type: ${projectType}
Target Timeline: ${timeline}
Online Plans / Link: ${fileLink || 'None provided'}

PROJECT SCOPE DESCRIPTION:
--------------------------
${projectDescription}

ATTACHMENTS (${files.length}):
------------------------------
${attachmentListText}

--
This message was submitted via the Estimation Campus Inc. official website portal.
Reply directly to this email to contact ${fullName} (${email}).
`.trim();

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 24px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
    <!-- Brand Header -->
    <tr>
      <td style="background-color: #0D47A1; padding: 28px 32px; text-align: left;">
        <h1 style="color: #ffffff; margin: 0 0 6px 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">ESTIMATION CAMPUS INC.</h1>
        <p style="color: #bfdbfe; margin: 0; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">
          ${isGeneralInquiry ? 'Official Website Inquiry' : 'New Scope Review & Proposal Request'}
        </p>
      </td>
    </tr>

    <!-- Reference Strip -->
    <tr>
      <td style="background-color: #f1f5f9; padding: 12px 32px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #475569;">
        <span style="font-weight: 600;">Reference Tracking ID:</span> <strong style="color: #0D47A1; font-family: monospace; font-size: 13px;">${referenceId}</strong>
        <span style="margin: 0 8px; color: #cbd5e1;">|</span>
        <span>${dateStr}</span>
      </td>
    </tr>

    <!-- Body Content -->
    <tr>
      <td style="padding: 32px;">
        <!-- Client Details -->
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 16px 0; border-bottom: 2px solid #0D47A1; padding-bottom: 6px;">
          Client Information
        </h2>
        <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 14px; margin-bottom: 24px;">
          <tr>
            <td width="30%" style="color: #64748b; font-weight: 600;">Full Name:</td>
            <td width="70%" style="color: #0f172a; font-weight: 700;">${fullName}</td>
          </tr>
          <tr>
            <td style="color: #64748b; font-weight: 600;">Company:</td>
            <td style="color: #0f172a;">${companyName || '<span style="color: #94a3b8;">Not specified</span>'}</td>
          </tr>
          <tr>
            <td style="color: #64748b; font-weight: 600;">Work Email:</td>
            <td><a href="mailto:${email}" style="color: #0D47A1; text-decoration: underline; font-weight: 600;">${email}</a></td>
          </tr>
          <tr>
            <td style="color: #64748b; font-weight: 600;">Phone Number:</td>
            <td><a href="tel:${phone.replace(/\D/g, '')}" style="color: #0f172a; text-decoration: none; font-weight: 600;">${phone}</a></td>
          </tr>
          <tr>
            <td style="color: #64748b; font-weight: 600;">Client IP:</td>
            <td style="color: #94a3b8; font-family: monospace; font-size: 12px;">${clientIp}</td>
          </tr>
        </table>

        <!-- Project Specifications -->
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 16px 0; border-bottom: 2px solid #0D47A1; padding-bottom: 6px;">
          Project Scope & Details
        </h2>
        <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 14px; margin-bottom: 24px;">
          <tr>
            <td width="30%" style="color: #64748b; font-weight: 600;">Selected Service:</td>
            <td width="70%" style="color: #0D47A1; font-weight: 700;">${serviceName}</td>
          </tr>
          <tr>
            <td style="color: #64748b; font-weight: 600;">Location:</td>
            <td style="color: #0f172a; font-weight: 600;">${projectLocation || '<span style="color: #94a3b8;">Not specified</span>'}</td>
          </tr>
          <tr>
            <td style="color: #64748b; font-weight: 600;">Project Type:</td>
            <td style="color: #0f172a;">${projectType}</td>
          </tr>
          <tr>
            <td style="color: #64748b; font-weight: 600;">Target Timeline:</td>
            <td style="color: #0f172a;">${timeline}</td>
          </tr>
          ${fileLink ? `
          <tr>
            <td style="color: #64748b; font-weight: 600;">Cloud Drawings Link:</td>
            <td><a href="${fileLink}" target="_blank" style="color: #0D47A1; font-weight: 600; text-decoration: underline;">${fileLink}</a></td>
          </tr>
          ` : ''}
        </table>

        <!-- Description Box -->
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0; border-bottom: 2px solid #0D47A1; padding-bottom: 6px;">
          Scope Description & Customer Notes
        </h2>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; margin-bottom: 24px;">
${projectDescription}
        </div>

        <!-- Attachments -->
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0; border-bottom: 2px solid #0D47A1; padding-bottom: 6px;">
          Attached Files (${files.length})
        </h2>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; font-size: 13px; margin-bottom: 28px;">
          ${attachmentListHtml}
        </div>

        <!-- Reply CTA -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="text-align: center; padding-top: 10px;">
              <a href="mailto:${email}?subject=RE:%20Estimation%20Campus%20Proposal%20${referenceId}" style="display: inline-block; background-color: #0D47A1; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 28px; border-radius: 6px;">
                Reply Directly to ${fullName}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 32px; text-align: center; font-size: 12px; color: #64748b;">
        <p style="margin: 0 0 4px 0;"><strong>Estimation Campus Inc.</strong> — Construction Design, Takeoffs & Preconstruction Services</p>
        <p style="margin: 0;">Houston, TX & Sheridan, WY | <a href="https://estimationcampusinc.com" style="color: #0D47A1; text-decoration: none;">estimationcampusinc.com</a></p>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  // 7. Dispatch Email via Authenticated SMTP (Zoho Mail)
  const transporter = getTransporter();

  // Strict check: If SMTP is not configured, NEVER return a fake success!
  if (!transporter) {
    console.error(`[SMTP CONFIGURATION ERROR] Inquiry ${referenceId} from ${fullName} cannot be sent. Required SMTP credentials (SMTP_USER, SMTP_PASSWORD) are missing.`);
    return res.status(500).json({
      success: false,
      message: "We couldn't submit your inquiry at this time. Please try again or email us directly at info@estimationcampusinc.com.",
      error: "SMTP email delivery service is not configured on the server. Please verify Hostinger environment variables."
    });
  }

  try {
    const smtpUser = process.env.SMTP_USER || recipient;
    // In Zoho Mail, From address must match the authenticated account or authorized alias
    const fromAddress = process.env.EMAIL_FROM || `"Estimation Campus Inc." <${smtpUser}>`;

    const mailOptions: SendMailOptions = {
      from: fromAddress,
      to: recipient,
      replyTo: `"${fullName}" <${email}>`,
      subject,
      text: textBody,
      html: htmlBody,
      attachments
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[EMAIL DELIVERED VIA ZOHO SMTP] Reference: ${referenceId} sent to ${recipient}. MessageId: ${info.messageId}`);

    return res.json({
      success: true,
      referenceId,
      message: "Thank you for contacting Estimation Campus Inc. Your inquiry has been submitted successfully. Our team will review your information and get back to you.",
      delivery: {
        accepted: true,
        recipient,
        messageId: info.messageId,
        attachmentsCount: files.length
      }
    });
  } catch (mailError: any) {
    console.error(`[EMAIL DELIVERY FAILED] Error dispatching to ${recipient}:`, mailError.message);
    return res.status(500).json({
      success: false,
      message: "We couldn't submit your inquiry at this time. Please try again or email us directly at info@estimationcampusinc.com.",
      errorDetail: isProduction ? undefined : mailError.message
    });
  }
};

// Diagnostic & Test Handler for GET /api/quote, /api/contact, and /api/test-email (Prevents 405 Method Not Allowed)
app.get(['/api/quote', '/api/contact', '/api/test-email'], async (req: Request, res: Response) => {
  const isTest = req.query.test === '1' || req.query.send_test === '1' || req.path === '/api/test-email';
  const recipient = getOfficialRecipient();
  const transporter = getTransporter();
  const hasUser = Boolean(process.env.SMTP_USER);
  const hasPass = Boolean(process.env.SMTP_PASSWORD);

  if (isTest) {
    if (!transporter) {
      return res.status(500).json({
        success: false,
        message: "Cannot run Zoho SMTP test: SMTP_USER or SMTP_PASSWORD is not configured in environment variables.",
        recipient,
        envStatus: {
          SMTP_HOST: process.env.SMTP_HOST || 'smtppro.zoho.com',
          SMTP_PORT: process.env.SMTP_PORT || '465',
          SMTP_USER: hasUser ? process.env.SMTP_USER : 'MISSING',
          SMTP_PASSWORD: hasPass ? '****** [Configured]' : 'MISSING'
        }
      });
    }

    try {
      const fromAddress = process.env.EMAIL_FROM || `"Estimation Campus System" <${process.env.SMTP_USER}>`;
      const testInfo = await transporter.sendMail({
        from: fromAddress,
        to: recipient,
        subject: `Zoho SMTP Verification Test — Estimation Campus Inc. [${new Date().toLocaleTimeString()}]`,
        text: `Zoho Mail SMTP connection is verified and functioning properly.\n\nAll website inquiries from estimationcampusinc.com will be delivered to: ${recipient}\n\nTimestamp: ${new Date().toISOString()}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 550px;">
            <div style="background: #0D47A1; color: white; padding: 15px; border-radius: 6px;">
              <h2 style="margin: 0; font-size: 18px;">Estimation Campus Inc.</h2>
              <p style="margin: 4px 0 0; font-size: 12px; color: #bfdbfe;">ZOHO SMTP VERIFICATION TEST</p>
            </div>
            <div style="padding: 20px 0;">
              <p style="color: #15803d; font-weight: bold; font-size: 16px;">✓ Zoho Mail SMTP Connection Successful!</p>
              <p style="color: #334155; font-size: 14px;">Your website forms on <strong>estimationcampusinc.com</strong> are now verified to deliver directly to <strong>${recipient}</strong>.</p>
              <p style="color: #64748b; font-size: 12px;">Sent via Zoho SMTP (smtppro.zoho.com:465) on ${new Date().toLocaleString('en-US')}.</p>
            </div>
          </div>
        `
      });

      return res.json({
        success: true,
        message: `Zoho SMTP test email successfully delivered to ${recipient}!`,
        messageId: testInfo.messageId,
        recipient,
        timestamp: new Date().toISOString()
      });
    } catch (testError: any) {
      return res.status(500).json({
        success: false,
        message: "Zoho SMTP test failed to send.",
        error: testError.message,
        hint: "Please ensure you are using a Zoho Application-Specific Password from Zoho Accounts -> Security -> App Passwords."
      });
    }
  }

  // Standard GET response - Never returns 405 Method Not Allowed!
  return res.json({
    success: true,
    status: "active",
    service: "Estimation Campus Form API",
    message: "Endpoint is active and ready to receive form inquiries via POST.",
    recipient,
    smtpConfigured: Boolean(transporter),
    smtpHost: process.env.SMTP_HOST || 'smtppro.zoho.com',
    smtpPort: Number(process.env.SMTP_PORT) || 465,
    smtpUser: process.env.SMTP_USER || 'info@estimationcampusinc.com',
    testInstructions: "To send a live test email to info@estimationcampusinc.com, add ?test=1 to this URL.",
    timestamp: new Date().toISOString()
  });
});

// Ensure .jfif files are served with image/jpeg Content-Type
express.static.mime.define({ 'image/jpeg': ['jfif'] });

// Serve images with 1-year immutable cache and backward-compatibility aliases
const candidateImageDirs = [
  path.resolve(__dirname, 'public/images'),
  path.resolve(__dirname, 'dist/images'),
  path.resolve(__dirname, 'src/assets/images'),
  path.resolve(__dirname, 'images'),
  path.resolve(__dirname, '../public/images'),
  path.resolve(__dirname, '../dist/images')
];

for (const dir of candidateImageDirs) {
  if (fs.existsSync(dir)) {
    app.use(['/images', '/src/assets/images'], express.static(dir, {
      maxAge: '1y',
      immutable: true
    }));
  }
}

// Serve public/assets directly with caching
const assetsPath = fs.existsSync(path.resolve(__dirname, 'public/assets'))
  ? path.resolve(__dirname, 'public/assets')
  : path.resolve(__dirname, 'assets');
if (fs.existsSync(assetsPath)) {
  app.use('/assets', express.static(assetsPath, {
    maxAge: '1y',
    immutable: true
  }));
}

// Serve official company logo directly with long-lived cache headers
app.get(['/logo.png', '/api/logo'], (_req: Request, res: Response) => {
  const possiblePaths = [
    path.resolve(__dirname, 'public/logo.png'),
    path.resolve(__dirname, 'dist/logo.png'),
    path.resolve(__dirname, 'logo.png'),
    path.resolve(process.cwd(), 'public/logo.png'),
    path.resolve(process.cwd(), 'dist/logo.png'),
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      return res.sendFile(p);
    }
  }
  res.redirect('https://drive.google.com/uc?export=view&id=1YS1PZ_yW04AsJaTtEJ_GsOW8eE4yXLbT');
});

// Form submission routes (handles multipart/form-data and urlencoded/json)
app.post('/api/quote', upload.array('attachments', 5), handleFormSubmission);
app.post('/api/contact', upload.array('attachments', 5), handleFormSubmission);

// Global Error Handler for Multer / Request Failures
app.use((err: any, _req: Request, res: Response, _next: express.NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: "Uploaded file exceeds the maximum 15MB limit. Please upload smaller files or provide a Google Drive / OneDrive link."
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: "You can attach a maximum of 5 files per submission. For larger plan sets, please provide a cloud link."
      });
    }
    return res.status(400).json({
      success: false,
      message: `File upload error: ${err.message}`
    });
  }

  if (err) {
    if (err.message && err.message.includes('not supported')) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    console.error('[UNHANDLED SERVER ERROR]', err);
    return res.status(500).json({
      success: false,
      message: "We couldn't submit your inquiry at this time. Please try again or email us directly at info@estimationcampusinc.com."
    });
  }
});

// Start Server with Vite Middleware in Development or Static Dist in Production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = fs.existsSync(path.resolve(__dirname, 'dist'))
      ? path.resolve(__dirname, 'dist')
      : (fs.existsSync(path.resolve(__dirname, 'index.html')) ? __dirname : path.resolve(__dirname, 'dist'));

    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    } else {
      console.warn('Production build dist/ not found. Run "npm run build" first.');
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ESTIMATION CAMPUS SERVER] Running on port ${PORT} (isProduction: ${isProduction})`);
    console.log(`[FORM RECIPIENT] Inquiries route to: ${getOfficialRecipient()}`);
  });
}

startServer();
