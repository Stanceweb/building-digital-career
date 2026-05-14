// === FILE: lib/email-templates.ts ===
// Pure HTML email template functions — no API calls, no side effects.
// All CSS is inline; layout is table-based for maximum email client compatibility.

import type { RegistrationFormData } from "@/lib/registration-schema";
import { getTrackDisplayName } from "@/lib/types";

export const VERIFY_BASE_URL = "https://bdc.stanceweb.us/verify";
export const QR_BASE_URL = "https://bdc.stanceweb.us/api/qr";

// ── Helpers ──────────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getTrackName(data: RegistrationFormData): string {
  if (data.selectedTrack === "other") {
    return data.customTrack ? escapeHtml(data.customTrack) : "Other (Suggested)";
  }
  return escapeHtml(getTrackDisplayName(data.selectedTrack));
}

function getFirstName(fullName: string): string {
  return escapeHtml(fullName.split(" ")[0] ?? fullName);
}

// ── Shared layout wrappers ───────────────────────────────────────────────────

function emailWrapper(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Building a Digital Career</title>
</head>
<body style="margin:0;padding:0;background-color:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8FAFC;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          ${body}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Email 1: Registrant Confirmation ────────────────────────────────────────

/** Generates the full HTML for the registrant confirmation email. */
export function getConfirmationEmailHtml(
  data: RegistrationFormData,
  accessId: string
): string {
  const firstName = getFirstName(data.fullName);
  const trackName = getTrackName(data);
  const fullName = escapeHtml(data.fullName);
  const email = escapeHtml(data.email);
  const safeAccessId = escapeHtml(accessId);
  const verifyUrl = `${VERIFY_BASE_URL}/${encodeURIComponent(accessId)}`;
  const qrImageUrl = `${QR_BASE_URL}/${encodeURIComponent(accessId)}`;

  const body = `
    <!-- Header -->
    <tr>
      <td style="background-color:#2563EB;border-radius:12px 12px 0 0;padding:32px;text-align:center;">
        <h1 style="font-size:22px;font-weight:700;color:#ffffff;margin:0 0 8px 0;letter-spacing:-0.3px;">
          Building a Digital Career
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.85);margin:0;">
          18th – 20th June 2025 &middot; CGMI Ihiagwa, Imo State
        </p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="background-color:#ffffff;padding:32px;">

        <p style="font-size:15px;line-height:1.6;color:#0F172A;margin:0 0 16px 0;">
          Hi ${firstName},
        </p>

        <p style="font-size:15px;line-height:1.6;color:#475569;margin:0 0 24px 0;">
          Thank you for registering for <strong style="color:#0F172A;">Building a Digital Career</strong> —
          a free digital skills workshop taking place from <strong style="color:#0F172A;">18th to 20th June 2025</strong>
          at CGMI Ihiagwa, Imo State. We&rsquo;re excited to have you join us!
        </p>

        <!-- Registration details card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
               style="background-color:#EFF6FF;border:1px solid #BFDBFE;border-radius:8px;margin:0 0 24px 0;">
          <tr>
            <td style="padding:20px;">
              <p style="font-size:11px;font-weight:600;color:#2563EB;text-transform:uppercase;
                         letter-spacing:0.08em;margin:0 0 16px 0;">
                Your Registration Details
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:12px;font-weight:600;color:#6B7280;text-transform:uppercase;
                              letter-spacing:0.05em;padding:6px 12px 6px 0;width:120px;vertical-align:top;">
                    Name
                  </td>
                  <td style="font-size:14px;color:#0F172A;font-weight:500;padding:6px 0;vertical-align:top;">
                    ${fullName}
                  </td>
                </tr>
                <tr>
                  <td style="font-size:12px;font-weight:600;color:#6B7280;text-transform:uppercase;
                              letter-spacing:0.05em;padding:6px 12px 6px 0;width:120px;vertical-align:top;">
                    Email
                  </td>
                  <td style="font-size:14px;color:#0F172A;font-weight:500;padding:6px 0;vertical-align:top;">
                    ${email}
                  </td>
                </tr>
                <tr>
                  <td style="font-size:12px;font-weight:600;color:#6B7280;text-transform:uppercase;
                              letter-spacing:0.05em;padding:6px 12px 6px 0;width:120px;vertical-align:top;">
                    Track
                  </td>
                  <td style="font-size:14px;color:#2563EB;font-weight:600;padding:6px 0;vertical-align:top;">
                    ${trackName}
                  </td>
                </tr>
                <tr>
                  <td style="font-size:12px;font-weight:600;color:#6B7280;text-transform:uppercase;
                              letter-spacing:0.05em;padding:6px 12px 6px 0;width:120px;vertical-align:top;">
                    Date
                  </td>
                  <td style="font-size:14px;color:#0F172A;font-weight:500;padding:6px 0;vertical-align:top;">
                    18th &ndash; 20th June 2025
                  </td>
                </tr>
                <tr>
                  <td style="font-size:12px;font-weight:600;color:#6B7280;text-transform:uppercase;
                              letter-spacing:0.05em;padding:6px 12px 6px 0;width:120px;vertical-align:top;">
                    Location
                  </td>
                  <td style="font-size:14px;color:#0F172A;font-weight:500;padding:6px 0;vertical-align:top;">
                    CGMI Ihiagwa, Imo State
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- What to expect -->
        <h2 style="font-size:16px;font-weight:600;color:#0F172A;margin:0 0 12px 0;">
          What to Expect
        </h2>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px 0;">
          <tr>
            <td style="font-size:15px;line-height:1.7;color:#475569;padding:0;">
              &bull;&nbsp; Hands-on practical sessions in your chosen track<br />
              &bull;&nbsp; Access to experienced mentors and industry practitioners<br />
              &bull;&nbsp; Certificate of participation
            </td>
          </tr>
        </table>

        <!-- Important notice -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
               style="background-color:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;margin:0 0 28px 0;">
          <tr>
            <td style="padding:16px 20px;">
              <p style="font-size:13px;font-weight:600;color:#92400E;margin:0 0 6px 0;text-transform:uppercase;letter-spacing:0.05em;">
                Important Notice
              </p>
              <p style="font-size:14px;line-height:1.6;color:#78350F;margin:0;">
                Please arrive early on the first day. Bring a valid ID card.
                If you have a laptop, please bring it along.
              </p>
            </td>
          </tr>
        </table>

        <!-- Entrance Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
               style="border:2px solid #BFDBFE;border-radius:12px;margin:28px 0 0 0;overflow:hidden;">
          <!-- Card header -->
          <tr>
            <td colspan="2" style="background-color:#2563EB;padding:14px 20px;">
              <p style="font-size:11px;font-weight:700;color:#ffffff;
                         text-transform:uppercase;letter-spacing:0.15em;margin:0;">
                Your Entrance Card — Present at the Door
              </p>
            </td>
          </tr>
          <!-- Card body: info left, QR right -->
          <tr>
            <td style="background-color:#EFF6FF;padding:20px;vertical-align:top;width:60%;">
              <p style="font-size:10px;font-weight:700;color:#2563EB;
                         text-transform:uppercase;letter-spacing:0.1em;margin:0 0 10px 0;">
                Participant
              </p>
              <p style="font-size:17px;font-weight:800;color:#0F172A;
                         margin:0 0 14px 0;line-height:1.2;">
                ${fullName}
              </p>
              <p style="font-size:10px;font-weight:700;color:#2563EB;
                         text-transform:uppercase;letter-spacing:0.1em;margin:0 0 4px 0;">
                Track
              </p>
              <p style="font-size:13px;font-weight:600;color:#1D4ED8;margin:0 0 14px 0;">
                ${trackName}
              </p>
              <p style="font-size:10px;font-weight:700;color:#6B7280;
                         text-transform:uppercase;letter-spacing:0.1em;margin:0 0 4px 0;">
                Access ID
              </p>
              <p style="font-family:'Courier New',Courier,monospace;font-size:13px;
                         font-weight:700;color:#0F172A;letter-spacing:0.1em;margin:0;">
                ${safeAccessId}
              </p>
            </td>
            <td style="background-color:#EFF6FF;padding:20px;vertical-align:middle;text-align:center;">
              <a href="${verifyUrl}" style="display:inline-block;text-decoration:none;">
                <img src="${qrImageUrl}"
                     width="110" height="110"
                     alt="Scan QR code at entrance"
                     style="display:block;border:6px solid #ffffff;
                             border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);" />
              </a>
              <p style="font-size:10px;color:#6B7280;margin:6px 0 0 0;">
                Scan at entrance
              </p>
            </td>
          </tr>
          <!-- Card footer -->
          <tr>
            <td colspan="2" style="background-color:#DBEAFE;padding:10px 20px;text-align:center;">
              <p style="font-size:11px;color:#1E40AF;margin:0;">
                18th – 20th June 2025 &nbsp;&middot;&nbsp; CGMI Ihiagwa, Imo State
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color:#F8FAFC;border-top:1px solid #E2E8F0;
                  border-radius:0 0 12px 12px;padding:24px;text-align:center;">
        <p style="font-size:13px;color:#64748B;margin:0 0 6px 0;">
          Questions? Reply to this email and we&rsquo;ll get back to you.
        </p>
        <p style="font-size:12px;color:#94A3B8;margin:0;">
          &copy; 2025 Building a Digital Career &middot; CGMI Ihiagwa, Imo State
        </p>
      </td>
    </tr>
  `;

  return emailWrapper(body);
}

// ── Email 2: Admin Notification ──────────────────────────────────────────────

/** Generates the full HTML for the admin new-registration notification email. */
export function getAdminNotificationEmailHtml(data: RegistrationFormData): string {
  const trackName = getTrackName(data);
  const timestamp = new Date().toLocaleString("en-NG", {
    timeZone: "Africa/Lagos",
    dateStyle: "full",
    timeStyle: "short",
  });

  const rows: [string, string][] = [
    ["Full Name",       escapeHtml(data.fullName)],
    ["Email",           escapeHtml(data.email)],
    ["Phone",           escapeHtml(data.phone)],
    ["Age Range",       escapeHtml(data.ageRange)],
    ["Gender",          escapeHtml(data.gender)],
    ["State of Origin", escapeHtml(data.stateOfOrigin)],
    ["Education",       escapeHtml(data.education)],
    ["Current Status",  escapeHtml(data.currentStatus)],
    ["Has Laptop",      escapeHtml(data.hasLaptop)],
    ["How They Heard",  escapeHtml(data.hearAboutUs)],
    ["Selected Track",  trackName],
    ["Motivation",      data.motivation ? escapeHtml(data.motivation) : "<em style='color:#9CA3AF;'>Not provided</em>"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="font-size:12px;font-weight:600;color:#6B7280;text-transform:uppercase;
                      letter-spacing:0.05em;padding:10px 12px;width:160px;
                      border-bottom:1px solid #F1F5F9;vertical-align:top;
                      background-color:#F8FAFC;">
            ${label}
          </td>
          <td style="font-size:14px;color:#0F172A;padding:10px 12px;
                      border-bottom:1px solid #F1F5F9;vertical-align:top;">
            ${value}
          </td>
        </tr>`
    )
    .join("");

  const body = `
    <!-- Header -->
    <tr>
      <td style="background-color:#0F172A;border-radius:12px 12px 0 0;padding:24px 32px;">
        <h1 style="font-size:18px;font-weight:700;color:#ffffff;margin:0 0 4px 0;">
          New Registration Received
        </h1>
        <p style="font-size:13px;color:#94A3B8;margin:0;">
          ${escapeHtml(timestamp)}
        </p>
      </td>
    </tr>

    <!-- Data table -->
    <tr>
      <td style="background-color:#ffffff;padding:0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
               style="border-collapse:collapse;">
          ${tableRows}
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color:#F8FAFC;border-top:1px solid #E2E8F0;
                  border-radius:0 0 12px 12px;padding:20px 32px;">
        <p style="font-size:12px;color:#94A3B8;margin:0;text-align:center;">
          Automated notification &mdash; Building a Digital Career Registration System
        </p>
      </td>
    </tr>
  `;

  return emailWrapper(body);
}
