// server.ts
import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
dotenv.config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = Number(process.env.PORT) || 3e3;
var isProduction = process.env.NODE_ENV === "production";
var getOfficialRecipient = () => {
  return process.env.EMAIL_TO?.trim() || "info@estimationcampusinc.com";
};
var rateLimitMap = /* @__PURE__ */ new Map();
function checkRateLimit(ip) {
  if (!isProduction || ip === "127.0.0.1" || ip === "::1" || ip === "unknown") {
    return true;
  }
  const now = Date.now();
  const windowMs = 10 * 60 * 1e3;
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
var ALLOWED_EXTENSIONS = /* @__PURE__ */ new Set([
  "pdf",
  "dwg",
  "dxf",
  "xlsx",
  "xls",
  "docx",
  "doc",
  "jpg",
  "jpeg",
  "png",
  "zip"
]);
var ALLOWED_MIME_TYPES = /* @__PURE__ */ new Set([
  "application/pdf",
  "image/vnd.dwg",
  "image/x-dwg",
  "application/acad",
  "application/x-acad",
  "application/autocad_dwg",
  "application/dxf",
  "image/vnd.dxf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "image/jpeg",
  "image/png",
  "application/zip",
  "application/x-zip-compressed",
  "application/octet-stream"
  // Many CAD DWG files are transmitted with octet-stream
]);
var upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024,
    // 15MB per file
    files: 5
    // Max 5 files
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().replace(/^\./, "");
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return cb(new Error(`File type .${ext} is not supported. Please upload PDF, DWG, DXF, XLSX, DOCX, JPG, PNG, or ZIP.`));
    }
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      return cb(new Error(`Invalid file MIME type: ${file.mimetype}`));
    }
    cb(null, true);
  }
});
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
function sanitizeHeader(str) {
  if (!str) return "";
  return str.replace(/[\r\n]/g, " ").trim();
}
function sanitizeFilename(filename) {
  const base = path.basename(filename);
  return base.replace(/[^a-zA-Z0-9._-]/g, "_");
}
function getTransporter() {
  const host = process.env.SMTP_HOST || "smtppro.zoho.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const secure = process.env.SMTP_SECURE !== void 0 ? process.env.SMTP_SECURE === "true" : port === 465;
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
var SERVICE_NAMES = {
  "permit-drawings": "Permit Support, Design & Drawings",
  "construction-estimating": "Construction Estimating & Takeoffs",
  "project-scheduling": "Project Scheduling (CPM)",
  "3d-renderings": "3D Renderings & Walkthroughs",
  "shop-drawings": "Shop Drawings & As-Builts",
  "multiple": "Multiple Services / Comprehensive Scope"
};
app.get("/api/health", (_req, res) => {
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
    status: "ok",
    service: "Estimation Campus Form API",
    runtime: process.version,
    recipient,
    smtpProvider: "Zoho Mail / Custom SMTP",
    smtpConfigured: isSmtpReady,
    environmentAudit: {
      SMTP_HOST: hasHost ? process.env.SMTP_HOST : "smtppro.zoho.com (default)",
      SMTP_PORT: hasPort ? process.env.SMTP_PORT : "465 (default)",
      SMTP_SECURE: hasSecure ? process.env.SMTP_SECURE : "true (default)",
      SMTP_USER: hasUser ? process.env.SMTP_USER : "NOT CONFIGURED (Required)",
      SMTP_PASSWORD: hasPass ? "****** [Configured]" : "NOT CONFIGURED (Required)",
      EMAIL_TO: hasTo ? process.env.EMAIL_TO : "info@estimationcampusinc.com (default)",
      EMAIL_FROM: hasFrom ? process.env.EMAIL_FROM : "info@estimationcampusinc.com (default)"
    },
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
var handleFormSubmission = async (req, res) => {
  const clientIp = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
  const recipient = getOfficialRecipient();
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      message: "Too many submission attempts. Please wait a few minutes before trying again or email us directly at info@estimationcampusinc.com."
    });
  }
  const honeypot = req.body.website_url || req.body._hp_check || req.body.company_url_confirm;
  if (honeypot) {
    console.warn(`[SPAM DETECTED] Honeypot triggered by IP ${clientIp}: ${honeypot}`);
    return res.json({
      success: true,
      referenceId: `EC-${(/* @__PURE__ */ new Date()).getFullYear()}-SPAM`,
      message: "Thank you for contacting Estimation Campus Inc. Your inquiry has been submitted successfully."
    });
  }
  const fullName = sanitizeHeader(req.body.fullName || req.body.name || "");
  const companyName = sanitizeHeader(req.body.companyName || req.body.company || "");
  const email = sanitizeHeader(req.body.email || "");
  const phone = sanitizeHeader(req.body.phone || "");
  const serviceKey = sanitizeHeader(req.body.serviceRequired || req.body.service || "permit-drawings");
  const serviceName = SERVICE_NAMES[serviceKey] || serviceKey;
  const projectLocation = sanitizeHeader(req.body.projectLocation || req.body.location || "");
  const projectType = sanitizeHeader(req.body.projectType || "Commercial");
  const timeline = sanitizeHeader(req.body.timeline || "Standard (1\u20132 weeks)");
  const projectDescription = (req.body.projectDescription || req.body.message || "").trim();
  const fileLink = sanitizeHeader(req.body.fileLink || "");
  const isGeneralInquiry = req.body.formType === "contact" || req.originalUrl.includes("/contact");
  if (!fullName || fullName.length < 2) {
    return res.status(400).json({
      success: false,
      message: "Please provide your full name."
    });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid work email address."
    });
  }
  const phoneDigits = phone.replace(/\D/g, "");
  if (!phone || phoneDigits.length < 10) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid 10-digit phone number."
    });
  }
  if (!projectLocation && !isGeneralInquiry) {
    return res.status(400).json({
      success: false,
      message: "Please provide the project location (City, State)."
    });
  }
  if (!projectDescription || projectDescription.length < 15) {
    return res.status(400).json({
      success: false,
      message: "Please provide a description of your project scope (minimum 15 characters)."
    });
  }
  const dateStr = (/* @__PURE__ */ new Date()).toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "full",
    timeStyle: "long"
  });
  const randomSuffix = Math.floor(1e4 + Math.random() * 9e4);
  const referenceId = `EC-${(/* @__PURE__ */ new Date()).getFullYear()}-${randomSuffix}`;
  const files = req.files || [];
  const attachments = files.map((file) => ({
    filename: sanitizeFilename(file.originalname),
    content: file.buffer,
    contentType: file.mimetype
  }));
  const attachmentListText = files.length > 0 ? files.map((f, i) => `${i + 1}. ${sanitizeFilename(f.originalname)} (${(f.size / (1024 * 1024)).toFixed(2)} MB)`).join("\n") : "None directly attached";
  const attachmentListHtml = files.length > 0 ? `<ul style="margin: 0; padding-left: 20px; color: #1e293b;">
        ${files.map((f) => `<li style="margin-bottom: 4px;"><strong>${sanitizeFilename(f.originalname)}</strong> (${(f.size / (1024 * 1024)).toFixed(2)} MB)</li>`).join("")}
       </ul>` : '<span style="color: #64748b;">No direct file attachments included</span>';
  const subject = isGeneralInquiry ? `New Website Inquiry \u2014 Estimation Campus Inc. \u2014 ${fullName}` : `New Quote Request \u2014 ${serviceName} \u2014 ${fullName}`;
  const textBody = `
ESTIMATION CAMPUS INC. \u2014 NEW INQUIRY NOTIFICATION
=================================================
Reference ID: ${referenceId}
Submission Date: ${dateStr}
Client IP: ${clientIp}

CLIENT CONTACT DETAILS:
-----------------------
Full Name: ${fullName}
Company: ${companyName || "Not specified"}
Email: ${email}
Phone: ${phone}

PROJECT SCOPE & SPECIFICATIONS:
-------------------------------
Requested Service: ${serviceName}
Project Location: ${projectLocation || "Not specified"}
Project Type: ${projectType}
Target Timeline: ${timeline}
Online Plans / Link: ${fileLink || "None provided"}

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
          ${isGeneralInquiry ? "Official Website Inquiry" : "New Scope Review & Proposal Request"}
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
            <td><a href="tel:${phone.replace(/\D/g, "")}" style="color: #0f172a; text-decoration: none; font-weight: 600;">${phone}</a></td>
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
          ` : ""}
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
        <p style="margin: 0 0 4px 0;"><strong>Estimation Campus Inc.</strong> \u2014 Construction Design, Takeoffs & Preconstruction Services</p>
        <p style="margin: 0;">Houston, TX & Sheridan, WY | <a href="https://estimationcampusinc.com" style="color: #0D47A1; text-decoration: none;">estimationcampusinc.com</a></p>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();
  const transporter = getTransporter();
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
    const fromAddress = process.env.EMAIL_FROM || `"Estimation Campus Inc." <${smtpUser}>`;
    const mailOptions = {
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
  } catch (mailError) {
    console.error(`[EMAIL DELIVERY FAILED] Error dispatching to ${recipient}:`, mailError.message);
    return res.status(500).json({
      success: false,
      message: "We couldn't submit your inquiry at this time. Please try again or email us directly at info@estimationcampusinc.com.",
      errorDetail: isProduction ? void 0 : mailError.message
    });
  }
};
app.get(["/api/quote", "/api/contact", "/api/test-email"], async (req, res) => {
  const isTest = req.query.test === "1" || req.query.send_test === "1" || req.path === "/api/test-email";
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
          SMTP_HOST: process.env.SMTP_HOST || "smtppro.zoho.com",
          SMTP_PORT: process.env.SMTP_PORT || "465",
          SMTP_USER: hasUser ? process.env.SMTP_USER : "MISSING",
          SMTP_PASSWORD: hasPass ? "****** [Configured]" : "MISSING"
        }
      });
    }
    try {
      const fromAddress = process.env.EMAIL_FROM || `"Estimation Campus System" <${process.env.SMTP_USER}>`;
      const testInfo = await transporter.sendMail({
        from: fromAddress,
        to: recipient,
        subject: `Zoho SMTP Verification Test \u2014 Estimation Campus Inc. [${(/* @__PURE__ */ new Date()).toLocaleTimeString()}]`,
        text: `Zoho Mail SMTP connection is verified and functioning properly.

All website inquiries from estimationcampusinc.com will be delivered to: ${recipient}

Timestamp: ${(/* @__PURE__ */ new Date()).toISOString()}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 550px;">
            <div style="background: #0D47A1; color: white; padding: 15px; border-radius: 6px;">
              <h2 style="margin: 0; font-size: 18px;">Estimation Campus Inc.</h2>
              <p style="margin: 4px 0 0; font-size: 12px; color: #bfdbfe;">ZOHO SMTP VERIFICATION TEST</p>
            </div>
            <div style="padding: 20px 0;">
              <p style="color: #15803d; font-weight: bold; font-size: 16px;">\u2713 Zoho Mail SMTP Connection Successful!</p>
              <p style="color: #334155; font-size: 14px;">Your website forms on <strong>estimationcampusinc.com</strong> are now verified to deliver directly to <strong>${recipient}</strong>.</p>
              <p style="color: #64748b; font-size: 12px;">Sent via Zoho SMTP (smtppro.zoho.com:465) on ${(/* @__PURE__ */ new Date()).toLocaleString("en-US")}.</p>
            </div>
          </div>
        `
      });
      return res.json({
        success: true,
        message: `Zoho SMTP test email successfully delivered to ${recipient}!`,
        messageId: testInfo.messageId,
        recipient,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (testError) {
      return res.status(500).json({
        success: false,
        message: "Zoho SMTP test failed to send.",
        error: testError.message,
        hint: "Please ensure you are using a Zoho Application-Specific Password from Zoho Accounts -> Security -> App Passwords."
      });
    }
  }
  return res.json({
    success: true,
    status: "active",
    service: "Estimation Campus Form API",
    message: "Endpoint is active and ready to receive form inquiries via POST.",
    recipient,
    smtpConfigured: Boolean(transporter),
    smtpHost: process.env.SMTP_HOST || "smtppro.zoho.com",
    smtpPort: Number(process.env.SMTP_PORT) || 465,
    smtpUser: process.env.SMTP_USER || "info@estimationcampusinc.com",
    testInstructions: "To send a live test email to info@estimationcampusinc.com, add ?test=1 to this URL.",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
express.static.mime.define({ "image/jpeg": ["jfif"] });
var candidateImageDirs = [
  path.resolve(__dirname, "public/images"),
  path.resolve(__dirname, "dist/images"),
  path.resolve(__dirname, "src/assets/images"),
  path.resolve(__dirname, "images"),
  path.resolve(__dirname, "../public/images"),
  path.resolve(__dirname, "../dist/images")
];
for (const dir of candidateImageDirs) {
  if (fs.existsSync(dir)) {
    app.use(["/images", "/src/assets/images"], express.static(dir, {
      maxAge: "1y",
      immutable: true
    }));
  }
}
var assetsPath = fs.existsSync(path.resolve(__dirname, "public/assets")) ? path.resolve(__dirname, "public/assets") : path.resolve(__dirname, "assets");
if (fs.existsSync(assetsPath)) {
  app.use("/assets", express.static(assetsPath, {
    maxAge: "1y",
    immutable: true
  }));
}
app.get(["/logo.png", "/api/logo"], (_req, res) => {
  const possiblePaths = [
    path.resolve(__dirname, "public/logo.png"),
    path.resolve(__dirname, "dist/logo.png"),
    path.resolve(__dirname, "logo.png"),
    path.resolve(process.cwd(), "public/logo.png"),
    path.resolve(process.cwd(), "dist/logo.png")
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      return res.sendFile(p);
    }
  }
  res.redirect("https://drive.google.com/uc?export=view&id=1YS1PZ_yW04AsJaTtEJ_GsOW8eE4yXLbT");
});
app.post("/api/quote", upload.array("attachments", 5), handleFormSubmission);
app.post("/api/contact", upload.array("attachments", 5), handleFormSubmission);
app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Uploaded file exceeds the maximum 15MB limit. Please upload smaller files or provide a Google Drive / OneDrive link."
      });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
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
    if (err.message && err.message.includes("not supported")) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    console.error("[UNHANDLED SERVER ERROR]", err);
    return res.status(500).json({
      success: false,
      message: "We couldn't submit your inquiry at this time. Please try again or email us directly at info@estimationcampusinc.com."
    });
  }
});
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = fs.existsSync(path.resolve(__dirname, "dist")) ? path.resolve(__dirname, "dist") : fs.existsSync(path.resolve(__dirname, "index.html")) ? __dirname : path.resolve(__dirname, "dist");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (_req, res) => {
        res.sendFile(path.resolve(distPath, "index.html"));
      });
    } else {
      console.warn('Production build dist/ not found. Run "npm run build" first.');
    }
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ESTIMATION CAMPUS SERVER] Running on port ${PORT} (isProduction: ${isProduction})`);
    console.log(`[FORM RECIPIENT] Inquiries route to: ${getOfficialRecipient()}`);
  });
}
startServer();
