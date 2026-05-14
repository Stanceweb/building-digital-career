// === FILE: lib/mailer.ts ===
// Server-only Nodemailer SMTP transporter for Brevo.
// Never import this file in client components.

import nodemailer from "nodemailer";

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `[mailer] Missing required environment variable: ${key}. ` +
        `Add it to .env.local (dev) or your hosting environment (prod).`
    );
  }
  return value;
}

export interface SendEmailOptions {
  to: { name: string; email: string };
  subject: string;
  htmlContent: string;
  replyTo?: { name: string; email: string };
}

// ── Singleton transporter ────────────────────────────────────────────────────

let _transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (_transporter) return _transporter;

  // Validate all required vars at initialization time
  requireEnv("BREVO_SMTP_LOGIN");
  requireEnv("BREVO_SMTP_PASSWORD");
  requireEnv("BREVO_SENDER_NAME");
  requireEnv("BREVO_SENDER_EMAIL");
  requireEnv("ADMIN_NOTIFICATION_EMAIL");

  _transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // STARTTLS on port 587
    auth: {
      user: process.env.BREVO_SMTP_LOGIN,
      pass: process.env.BREVO_SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  return _transporter;
}

// ── Public helpers ───────────────────────────────────────────────────────────

/** Sends a single transactional email via Brevo SMTP. Throws on failure. */
export async function sendEmail(options: SendEmailOptions): Promise<void> {
  const transporter = getTransporter();

  const senderName = requireEnv("BREVO_SENDER_NAME");
  const senderEmail = requireEnv("BREVO_SENDER_EMAIL");

  const mailOptions: nodemailer.SendMailOptions = {
    from: `"${senderName}" <${senderEmail}>`,
    to: `"${options.to.name}" <${options.to.email}>`,
    subject: options.subject,
    html: options.htmlContent,
    ...(options.replyTo && {
      replyTo: `"${options.replyTo.name}" <${options.replyTo.email}>`,
    }),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("[mailer] Email sent to:", options.to.email);
  } catch (error) {
    console.error("[mailer] Email failed:", error);
    throw error;
  }
}

/** Returns the configured admin notification email address. */
export function getAdminEmail(): string {
  return requireEnv("ADMIN_NOTIFICATION_EMAIL");
}
