<?php
/**
 * Estimation Campus Inc. — Zoho SMTP Configuration for Hostinger PHP Environments
 *
 * If your Hostinger plan runs PHP/Apache rather than Node.js, you can configure
 * your Zoho Mail credentials here or in your .env file.
 *
 * IMPORTANT FOR ZOHO MAIL:
 * - If Two-Factor Authentication (2FA) is enabled on your Zoho account, you MUST
 *   generate an "App Password" in Zoho Accounts (Security -> App Passwords).
 * - Standard login passwords will be rejected by Zoho SMTP with 535 Authentication Failed.
 */

return [
    'SMTP_HOST'     => getenv('SMTP_HOST') ?: 'smtppro.zoho.com',
    'SMTP_PORT'     => (int)(getenv('SMTP_PORT') ?: 465),
    'SMTP_SECURE'   => getenv('SMTP_SECURE') ?: 'true',
    'SMTP_USER'     => getenv('SMTP_USER') ?: 'info@estimationcampusinc.com',
    'SMTP_PASSWORD' => getenv('SMTP_PASSWORD') ?: '', // Paste your Zoho App Password here if not set in server env
    'EMAIL_TO'      => getenv('EMAIL_TO') ?: 'info@estimationcampusinc.com',
    'EMAIL_FROM'    => getenv('EMAIL_FROM') ?: 'Estimation Campus Inc. <info@estimationcampusinc.com>',
];
